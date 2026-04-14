import { useState, useEffect, useMemo, useCallback } from 'react'
import { aggregateDomainStats, aggregateOverallStats } from '../utils/progress-stats.js'

const STORAGE_KEY = 'freecertprep-progress'

const defaultProgress = {}

function getCertProgress(progress, certId) {
  return progress[certId] || { quizHistory: [], examHistory: [] }
}

export function useProgress(certId) {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : defaultProgress
    } catch {
      return defaultProgress
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const certProgress = getCertProgress(progress, certId)

  const addQuizResult = useCallback((result) => {
    setProgress((prev) => {
      const cert = getCertProgress(prev, certId)
      return {
        ...prev,
        [certId]: {
          ...cert,
          quizHistory: [...cert.quizHistory, { ...result, timestamp: Date.now() }],
        },
      }
    })
  }, [certId])

  const addExamResult = useCallback((result) => {
    setProgress((prev) => {
      const cert = getCertProgress(prev, certId)
      return {
        ...prev,
        [certId]: {
          ...cert,
          examHistory: [...cert.examHistory, { ...result, timestamp: Date.now() }],
        },
      }
    })
  }, [certId])

  const getDomainStats = useCallback((domains) => {
    const allSessions = [...certProgress.quizHistory, ...certProgress.examHistory]
    return aggregateDomainStats(allSessions, domains)
  }, [certProgress.quizHistory, certProgress.examHistory])

  const getOverallStats = useMemo(
    () => aggregateOverallStats(certProgress.quizHistory, certProgress.examHistory),
    [certProgress.quizHistory, certProgress.examHistory]
  )

  const resetProgress = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      [certId]: { quizHistory: [], examHistory: [] },
    }))
  }, [certId])

  return {
    progress: certProgress,
    addQuizResult,
    addExamResult,
    getDomainStats,
    getOverallStats,
    resetProgress,
  }
}
