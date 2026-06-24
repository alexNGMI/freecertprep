import { useState, useEffect, useMemo, useCallback } from 'react'
import { aggregateDomainStats, aggregateOverallStats } from '../utils/progress-stats.js'
import {
  applySessionRetention,
  KEYS,
  isValidProgressData,
  readJSON,
  retainExamHistory,
  retainQuizHistory,
  subscribe,
  writeJSON,
} from '../utils/storage.js'

const STORAGE_KEY = KEYS.progress

const defaultProgress = {}

function getCertProgress(progress, certId) {
  return progress[certId] || { quizHistory: [], examHistory: [] }
}

function loadProgress() {
  const stored = readJSON(STORAGE_KEY, defaultProgress)
  return isValidProgressData(stored) ? applySessionRetention(stored) : defaultProgress
}

export function useProgress(certId) {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    writeJSON(STORAGE_KEY, progress)
  }, [progress])

  // Keep this tab in sync if another tab writes progress (or clears storage).
  useEffect(
    () => subscribe(STORAGE_KEY, () => setProgress(loadProgress())),
    [],
  )

  const certProgress = getCertProgress(progress, certId)

  const addQuizResult = useCallback((result) => {
    setProgress((prev) => {
      const cert = getCertProgress(prev, certId)
      return {
        ...prev,
        [certId]: {
          ...cert,
          quizHistory: retainQuizHistory([
            ...cert.quizHistory,
            { ...result, timestamp: Date.now() },
          ]),
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
          examHistory: retainExamHistory([
            ...cert.examHistory,
            { ...result, timestamp: Date.now() },
          ]),
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
