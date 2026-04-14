/**
 * Pure aggregation helpers for useProgress — no React state, easy to test.
 *
 * A "session" is { domain?, answers: [{ questionId, domain, correct }], timestamp? }.
 * The aggregator walks all answers across sessions and rolls them up.
 */

/**
 * Roll up per-domain totals from a flat list of sessions.
 *
 * sessions: Array<{ answers: [{ domain, correct }] }>
 * domains:  Array<{ name: string }>
 *
 * Returns one entry per domain in the same order as `domains`:
 *   { domain, total, correct, percentage }
 *
 * Percentage is rounded to a whole number; domains with zero answers report 0%.
 */
export function aggregateDomainStats(sessions, domains) {
  const allAnswers = sessions.flatMap(s => s.answers || [])

  return domains.map(({ name: domain }) => {
    const domainAnswers = allAnswers.filter(a => a.domain === domain)
    const total = domainAnswers.length
    const correct = domainAnswers.filter(a => a.correct).length
    return {
      domain,
      total,
      correct,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
    }
  })
}

/**
 * Roll up overall totals from quiz and exam histories.
 *
 * quizHistory: Array<session>
 * examHistory: Array<session>
 *
 * Returns:
 *   { totalQuestions, correctAnswers, percentage, quizzesTaken, examsTaken }
 */
export function aggregateOverallStats(quizHistory, examHistory) {
  const allSessions = [...quizHistory, ...examHistory]
  const allAnswers = allSessions.flatMap(r => r.answers || [])
  const total = allAnswers.length
  const correct = allAnswers.filter(a => a.correct).length
  return {
    totalQuestions: total,
    correctAnswers: correct,
    percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
    quizzesTaken: quizHistory.length,
    examsTaken: examHistory.length,
  }
}
