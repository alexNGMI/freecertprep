/**
 * Smart Practice weight math — pure helpers, no React state.
 * Extracted from useQuestionStats so the formula is testable in isolation.
 */

/**
 * Compute the selection weight for a single question, given its stats.
 *
 *   - Never seen (null / 0 attempts) → 1.0  (treated same as "always wrong")
 *   - Seen → 1 - (correct / attempts), clamped to min 0.05 so even mastered
 *     questions still occasionally appear in Smart Practice sessions.
 *
 * stats: { attempts, correct } | null | undefined
 */
export function computeQuestionWeight(stats) {
  if (!stats || stats.attempts === 0) return 1.0
  return Math.max(0.05, 1 - stats.correct / stats.attempts)
}

/**
 * Build a weighted pool ready for weightedSample().
 *
 * questions: [{ id, ... }]
 * statsMap:  { [questionId]: { attempts, correct, lastSeen } }
 *
 * Returns: [{ q, weight }]
 */
export function buildWeightedPool(questions, statsMap) {
  return questions.map(q => ({
    q,
    weight: computeQuestionWeight(statsMap?.[q.id]),
  }))
}
