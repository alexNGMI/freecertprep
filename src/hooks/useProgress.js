import { useState, useEffect, useMemo, useCallback } from 'react'

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
    const allResults = [...certProgress.quizHistory, ...certProgress.examHistory]

    return domains.map(({ name: domain }) => {
      const domainResults = allResults.flatMap((r) =>
        (r.answers || []).filter((a) => a.domain === domain)
      )
      const total = domainResults.length
      const correct = domainResults.filter((a) => a.correct).length
      return {
        domain,
        total,
        correct,
        percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
      }
    })
  }, [certProgress.quizHistory, certProgress.examHistory])

  const getOverallStats = useMemo(() => {
    const allResults = [...certProgress.quizHistory, ...certProgress.examHistory]
    const allAnswers = allResults.flatMap((r) => r.answers || [])
    const total = allAnswers.length
    const correct = allAnswers.filter((a) => a.correct).length
    return {
      totalQuestions: total,
      correctAnswers: correct,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
      quizzesTaken: certProgress.quizHistory.length,
      examsTaken: certProgress.examHistory.length,
    }
  }, [certProgress.quizHistory, certProgress.examHistory])

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
