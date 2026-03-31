import { useState, useEffect } from 'react'

const STORAGE_KEY = 'freecertprep-progress'

const defaultProgress = {
  quizHistory: [],
  examHistory: [],
}

export function useProgress() {
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

  const addQuizResult = (result) => {
    setProgress((prev) => ({
      ...prev,
      quizHistory: [...prev.quizHistory, { ...result, timestamp: Date.now() }],
    }))
  }

  const addExamResult = (result) => {
    setProgress((prev) => ({
      ...prev,
      examHistory: [...prev.examHistory, { ...result, timestamp: Date.now() }],
    }))
  }

  const getDomainStats = () => {
    const domains = [
      'Cloud Concepts',
      'Security and Compliance',
      'Cloud Technology and Services',
      'Billing, Pricing and Support',
    ]

    const allResults = [...progress.quizHistory, ...progress.examHistory]

    return domains.map((domain) => {
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
  }

  const getOverallStats = () => {
    const allResults = [...progress.quizHistory, ...progress.examHistory]
    const allAnswers = allResults.flatMap((r) => r.answers || [])
    const total = allAnswers.length
    const correct = allAnswers.filter((a) => a.correct).length
    return {
      totalQuestions: total,
      correctAnswers: correct,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
      quizzesTaken: progress.quizHistory.length,
      examsTaken: progress.examHistory.length,
    }
  }

  const resetProgress = () => {
    setProgress(defaultProgress)
  }

  return {
    progress,
    addQuizResult,
    addExamResult,
    getDomainStats,
    getOverallStats,
    resetProgress,
  }
}
