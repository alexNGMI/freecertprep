// Pure per-question Smart Practice accumulation. Extracted from
// useQuestionStats.recordSession so the money-path math (the attempts /
// correct roll-up that drives weighted question selection) is unit-tested
// independently of React and localStorage.

/**
 * Merge a completed session's answers into a cert's per-question stats.
 * Pure: returns a new object and never mutates `certStats`.
 *
 *   certStats : { [questionId]: { attempts, correct, lastSeen } }
 *   answers   : [{ questionId, correct }]
 *   now       : timestamp written to lastSeen for every question touched
 *               (a single per-session value; injectable for tests)
 */
export function mergeSessionStats(certStats, answers, now = Date.now()) {
  const updated = { ...certStats }
  answers.forEach(({ questionId, correct }) => {
    const existing = updated[questionId] || { attempts: 0, correct: 0, lastSeen: null }
    updated[questionId] = {
      attempts: existing.attempts + 1,
      correct: existing.correct + (correct ? 1 : 0),
      lastSeen: now,
    }
  })
  return updated
}
