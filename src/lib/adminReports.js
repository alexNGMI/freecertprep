import { isSupabaseConfigured, supabase } from './supabase'
import {
  ADMIN_REPORT_STATUSES,
  isActionableAdminReportStatus,
} from '../config/adminReportStatuses'

export const REPORT_STATUSES = ADMIN_REPORT_STATUSES
export const REPORT_CATEGORIES = [
  'wrong_answer',
  'outdated_source',
  'typo',
  'unclear_explanation',
  'broken_ui',
  'other',
]

export async function getAdminAccess() {
  if (!isSupabaseConfigured || !supabase) return { configured: false, signedIn: false, isAdmin: false }

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  if (sessionError) throw sessionError
  if (!sessionData.session) return { configured: true, signedIn: false, isAdmin: false }

  const { data, error } = await supabase.rpc('is_current_user_admin')
  if (error) throw error

  return {
    configured: true,
    signedIn: true,
    isAdmin: Boolean(data),
    user: sessionData.session.user,
  }
}

export async function listIssueReports(filters = {}) {
  if (!supabase) throw new Error('The account service is unavailable.')

  let query = supabase
    .from('question_issue_reports')
    .select('id, reporter_user_id, cert_id, question_id, category, message, status, created_at, updated_at')
    .order('created_at', { ascending: false })
    .limit(200)

  if (filters.status && filters.status !== 'all') query = query.eq('status', filters.status)
  if (filters.category && filters.category !== 'all') query = query.eq('category', filters.category)
  if (filters.certId?.trim()) query = query.ilike('cert_id', `%${filters.certId.trim()}%`)

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function listCorrectionEvents(reportId) {
  if (!supabase) throw new Error('The account service is unavailable.')

  const { data, error } = await supabase
    .from('question_correction_events')
    .select('id, status, editor_note, created_at, created_by')
    .eq('issue_report_id', reportId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function reviewIssueReport(reportId, status, editorNote = '') {
  if (!supabase) throw new Error('The account service is unavailable.')
  if (!isActionableAdminReportStatus(status)) {
    throw new Error('Choose a valid review status.')
  }

  const { data, error } = await supabase.rpc('review_question_issue_report', {
    report_id: reportId,
    next_status: status,
    editor_note: editorNote.trim() || null,
  })

  if (error) throw error
  return data
}
