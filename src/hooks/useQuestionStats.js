import { useState, useEffect, useCallback, useMemo } from 'react'

// Separate key from quiz/exam history so the two can evolve independently.
// Suffix "-local" reserves space for a future userId-keyed version when
// accounts are added — migration can merge local stats into the account on
// first login without touching this key.
const STORAGE_KEY = 'freecertprep-question-stats-local'

export function useQuestionStats(certId) {
  const [stats, setStats] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  }, [stats])

  // Stable per-cert slice — only changes when stats state changes
  const certStats = useMemo(() => stats[certId] || {}, [stats, certId])

  /**
   * Save a completed session's answers to per-question stats.
   * Called once at session end (not per-answer) to avoid mid-quiz state churn.
   * answers: [{ questionId, correct }]
   */
  const recordSession = useCallback((answers) => {
    setStats(prev => {
      const cert = prev[certId] || {}
      const updated = { ...cert }
      answers.forEach(({ questionId, correct }) => {
        const existing = updated[questionId] || { attempts: 0, correct: 0, lastSeen: null }
        updated[questionId] = {
          attempts: existing.attempts + 1,
          correct: existing.correct + (correct ? 1 : 0),
          lastSeen: Date.now(),
        }
      })
      return { ...prev, [certId]: updated }
    })
  }, [certId])

  /**
   * Returns weighted items ready for weightedSample().
   * Weight formula:
   *   - Never seen (0 attempts) → 1.0  (neutral, treated same as "wrong")
   *   - Seen → 1 - (correct / attempts), clamped to min 0.05
   *     so mastered questions still occasionally appear
   */
  const getWeightedPool = useCallback((questions) => {
    return questions.map(q => {
      const s = certStats[q.id]
      const weight = s
        ? Math.max(0.05, 1 - s.correct / s.attempts)
        : 1.0
      return { q, weight }
    })
  }, [certStats])

  /**
   * Number of questions that have been seen at least once — useful for UI.
   */
  const trackedCount = useMemo(() => Object.keys(certStats).length, [certStats])

  /**
   * Reset all per-question stats for this cert only.
   * Does not affect quiz/exam session history (useProgress).
   */
  const resetStats = useCallback(() => {
    setStats(prev => {
      const next = { ...prev }
      delete next[certId]
      return next
    })
  }, [certId])

  return { certStats, recordSession, getWeightedPool, trackedCount, resetStats }
}
