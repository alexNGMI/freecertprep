import { useCallback, useEffect, useState } from 'react'
import { readStoredJSON, writeStoredJSON } from '../utils/storage.js'

const STORAGE_KEY = 'practice107-progress'
const EMPTY_CERT_PROGRESS = { quizHistory: [], examHistory: [] }
const HISTORY_LIMIT = 100

function certProgress(progress, certId) {
  return progress[certId] || EMPTY_CERT_PROGRESS
}

function retain(history) {
  return history.slice(-HISTORY_LIMIT)
}

export function useProgress(certId) {
  const [progress, setProgress] = useState(() => readStoredJSON(STORAGE_KEY, {}))

  useEffect(() => {
    writeStoredJSON(STORAGE_KEY, progress)
  }, [progress])

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === STORAGE_KEY) setProgress(readStoredJSON(STORAGE_KEY, {}))
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const addQuizResult = useCallback((result) => {
    setProgress((current) => {
      const existing = certProgress(current, certId)
      return {
        ...current,
        [certId]: {
          ...existing,
          quizHistory: retain([...existing.quizHistory, { ...result, timestamp: Date.now() }]),
        },
      }
    })
  }, [certId])

  const addExamResult = useCallback((result) => {
    setProgress((current) => {
      const existing = certProgress(current, certId)
      return {
        ...current,
        [certId]: {
          ...existing,
          examHistory: retain([...existing.examHistory, { ...result, timestamp: Date.now() }]),
        },
      }
    })
  }, [certId])

  return {
    progress: certProgress(progress, certId),
    addQuizResult,
    addExamResult,
  }
}
