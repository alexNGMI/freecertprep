import { retainExamHistory, retainQuizHistory } from './storage.js'

function normalizeSnapshot(snapshot = {}) {
  return {
    schemaVersion: 2,
    capturedAt: snapshot.capturedAt || null,
    progress: snapshot.progress || {},
    questionStats: snapshot.questionStats || {},
    bookmarks: snapshot.bookmarks || {},
    bookmarkState: snapshot.bookmarkState || {},
  }
}

function sessionFingerprint(session = {}) {
  const answers = Array.isArray(session.answers)
    ? session.answers.map(answer => [
      answer.questionId || '',
      answer.correct ? 1 : 0,
      JSON.stringify(answer.selected ?? null),
    ])
    : []
  return JSON.stringify([
    Number(session.timestamp) || 0,
    session.kind || '',
    session.domain || '',
    session.score ?? null,
    session.total ?? null,
    session.percentage ?? null,
    session.timeSpent ?? session.duration ?? null,
    answers,
  ])
}

function mergeHistory(local = [], remote = []) {
  const sessions = new Map()
  ;[...remote, ...local].forEach(session => {
    sessions.set(sessionFingerprint(session), session)
  })
  return [...sessions.values()].sort((a, b) => (Number(a.timestamp) || 0) - (Number(b.timestamp) || 0))
}

export function mergeProgress(local = {}, remote = {}) {
  const certIds = new Set([...Object.keys(local), ...Object.keys(remote)])
  const merged = {}

  certIds.forEach(certId => {
    merged[certId] = {
      quizHistory: retainQuizHistory(mergeHistory(local[certId]?.quizHistory, remote[certId]?.quizHistory)),
      examHistory: retainExamHistory(mergeHistory(local[certId]?.examHistory, remote[certId]?.examHistory)),
    }
  })

  return merged
}

function statDelta(current = {}, base = {}) {
  return {
    attempts: Math.max(0, (current.attempts || 0) - (base.attempts || 0)),
    correct: Math.max(0, (current.correct || 0) - (base.correct || 0)),
  }
}

export function mergeQuestionStats(local = {}, remote = {}, base = {}) {
  const certIds = new Set([...Object.keys(local), ...Object.keys(remote), ...Object.keys(base)])
  const merged = {}

  certIds.forEach(certId => {
    const questionIds = new Set([
      ...Object.keys(local[certId] || {}),
      ...Object.keys(remote[certId] || {}),
      ...Object.keys(base[certId] || {}),
    ])
    if (!questionIds.size) return

    merged[certId] = {}
    questionIds.forEach(questionId => {
      const localStat = local[certId]?.[questionId] || {}
      const remoteStat = remote[certId]?.[questionId] || {}
      const baseStat = base[certId]?.[questionId] || {}
      const localDelta = statDelta(localStat, baseStat)
      const remoteDelta = statDelta(remoteStat, baseStat)
      const attempts = (baseStat.attempts || 0) + localDelta.attempts + remoteDelta.attempts
      const correct = Math.min(
        attempts,
        (baseStat.correct || 0) + localDelta.correct + remoteDelta.correct,
      )

      if (attempts > 0) {
        merged[certId][questionId] = {
          attempts,
          correct,
          lastSeen: Math.max(localStat.lastSeen || 0, remoteStat.lastSeen || 0, baseStat.lastSeen || 0) || null,
        }
      }
    })
  })

  return merged
}

function legacyBookmarkState(bookmarks = {}, capturedAt = 0) {
  const changedAt = Date.parse(capturedAt) || Number(capturedAt) || 0
  return Object.fromEntries(
    Object.entries(bookmarks).map(([certId, questionIds]) => [
      certId,
      Object.fromEntries((questionIds || []).map(questionId => [
        questionId,
        { present: true, changedAt },
      ])),
    ]),
  )
}

export function mergeBookmarkState(localSnapshot, remoteSnapshot) {
  const local = normalizeSnapshot(localSnapshot)
  const remote = normalizeSnapshot(remoteSnapshot)
  const combineState = (legacy, current) => {
    const certIds = new Set([...Object.keys(legacy), ...Object.keys(current)])
    return Object.fromEntries([...certIds].map(certId => [
      certId,
      { ...(legacy[certId] || {}), ...(current[certId] || {}) },
    ]))
  }
  const localState = combineState(
    legacyBookmarkState(local.bookmarks, local.capturedAt),
    local.bookmarkState,
  )
  const remoteState = combineState(
    legacyBookmarkState(remote.bookmarks, remote.capturedAt),
    remote.bookmarkState,
  )
  const certIds = new Set([...Object.keys(localState), ...Object.keys(remoteState)])
  const state = {}
  const bookmarks = {}

  certIds.forEach(certId => {
    const questionIds = new Set([
      ...Object.keys(localState[certId] || {}),
      ...Object.keys(remoteState[certId] || {}),
    ])
    state[certId] = {}
    bookmarks[certId] = []

    questionIds.forEach(questionId => {
      const localChange = localState[certId]?.[questionId]
      const remoteChange = remoteState[certId]?.[questionId]
      const winner = !localChange
        ? remoteChange
        : !remoteChange
          ? localChange
          : (localChange.changedAt || 0) >= (remoteChange.changedAt || 0)
            ? localChange
            : remoteChange

      if (!winner) return
      state[certId][questionId] = winner
      if (winner.present) bookmarks[certId].push(questionId)
    })
  })

  return { bookmarks, bookmarkState: state }
}

export function mergeStudySnapshots(localSnapshot, remoteSnapshot, baseSnapshot = {}) {
  const local = normalizeSnapshot(localSnapshot)
  const remote = normalizeSnapshot(remoteSnapshot)
  const base = normalizeSnapshot(baseSnapshot)
  const bookmarkMerge = mergeBookmarkState(local, remote)

  return {
    schemaVersion: 2,
    capturedAt: new Date().toISOString(),
    progress: mergeProgress(local.progress, remote.progress),
    questionStats: mergeQuestionStats(local.questionStats, remote.questionStats, base.questionStats),
    bookmarks: bookmarkMerge.bookmarks,
    bookmarkState: bookmarkMerge.bookmarkState,
  }
}
