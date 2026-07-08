import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'practice107-progress'
const EMPTY_CERT_PROGRESS = { quizHistory: [], examHistory: [] }
const HISTORY_LIMIT = 100

function readJSON(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function certProgress(progress, certId) {
  return progress[certId] || EMPTY_CERT_PROGRESS
}

function retain(history) {
  return history.slice(-HISTORY_LIMIT)
}

export function useProgress(certId) {
  const [progress, setProgress] = useState(() => readJSON(STORAGE_KEY, {}))

  useEffect(() => {
    writeJSON(STORAGE_KEY, progress)
  }, [progress])

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === STORAGE_KEY) setProgress(readJSON(STORAGE_KEY, {}))
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
