import { isSupabaseConfigured, supabase } from './supabase'
import { isValidProgressData, KEYS, readJSON, writeJSON } from '../utils/storage'

const DEVICE_KEY = 'freecertprep-device-id'

function getDeviceId() {
  const existing = globalThis.localStorage?.getItem(DEVICE_KEY)
  if (existing) return existing
  const id = globalThis.crypto?.randomUUID?.() || `device-${Date.now()}`
  globalThis.localStorage?.setItem(DEVICE_KEY, id)
  return id
}

async function getUser() {
  if (!isSupabaseConfigured || !supabase) return null
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}

export function buildLocalSnapshot() {
  return {
    schemaVersion: 1,
    capturedAt: new Date().toISOString(),
    progress: readJSON(KEYS.progress, {}),
    questionStats: readJSON(KEYS.questionStats, {}),
    bookmarks: readJSON(KEYS.bookmarks, {}),
  }
}

export function summarizeStudyData(snapshot = buildLocalSnapshot()) {
  const progress = snapshot.progress || {}
  const questionStats = snapshot.questionStats || {}
  const bookmarks = snapshot.bookmarks || {}
  const certIds = new Set([
    ...Object.keys(progress),
    ...Object.keys(questionStats),
    ...Object.keys(bookmarks),
  ])
  const sessions = Object.values(progress).reduce(
    (total, cert) => total + (cert?.quizHistory?.length || 0) + (cert?.examHistory?.length || 0),
    0,
  )
  const trackedQuestions = Object.values(questionStats).reduce(
    (total, cert) => total + Object.keys(cert || {}).length,
    0,
  )
  const bookmarkCount = Object.values(bookmarks).reduce(
    (total, cert) => total + (Array.isArray(cert) ? cert.length : 0),
    0,
  )

  return {
    certifications: certIds.size,
    sessions,
    trackedQuestions,
    bookmarks: bookmarkCount,
  }
}

export async function backupStudyData() {
  const user = await getUser()
  if (!user) throw new Error('Sign in before backing up progress.')

  const snapshot = buildLocalSnapshot()
  const { error } = await supabase.from('study_snapshots').insert({
    user_id: user.id,
    schema_version: 1,
    snapshot,
    source_device_id: getDeviceId(),
  })
  if (error) throw error
  return snapshot.capturedAt
}

export async function getLatestBackupInfo() {
  const user = await getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('study_snapshots')
    .select('snapshot, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return {
    createdAt: data.created_at,
    summary: summarizeStudyData(data.snapshot),
  }
}

export async function restoreLatestStudyData() {
  const user = await getUser()
  if (!user) throw new Error('Sign in before restoring progress.')

  const { data, error } = await supabase
    .from('study_snapshots')
    .select('snapshot, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  const snapshot = data.snapshot
  if (!snapshot || !isValidProgressData(snapshot.progress)) {
    throw new Error('The saved progress backup is not valid.')
  }

  const writes = [
    writeJSON(KEYS.progress, snapshot.progress),
    writeJSON(KEYS.questionStats, snapshot.questionStats || {}),
    writeJSON(KEYS.bookmarks, snapshot.bookmarks || {}),
  ]
  if (writes.some((saved) => !saved)) {
    throw new Error('The backup was downloaded, but this browser could not save all restored data.')
  }
  return data.created_at
}

const REPORT_CATEGORIES = {
  'Answer seems wrong': 'wrong_answer',
  'Explanation is unclear': 'unclear_explanation',
  'Typo or wording issue': 'typo',
  'Not exam-like': 'other',
  'Outdated content': 'outdated_source',
}

export async function submitQuestionIssueReport(report) {
  const user = await getUser()
  if (!user) return false

  const detail = report.notes?.trim()
  const message = detail
    ? `${report.issueType}: ${detail}`
    : `${report.issueType} reported for review.`

  const { error } = await supabase.from('question_issue_reports').insert({
    reporter_user_id: user.id,
    cert_id: report.certId,
    question_id: report.questionId,
    category: REPORT_CATEGORIES[report.issueType] || 'other',
    message,
  })
  if (error) throw error
  return true
}
