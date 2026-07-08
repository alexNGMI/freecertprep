import { useCallback, useEffect, useMemo, useState } from 'react'
import { buildWeightedPool } from '../utils/smart-practice.js'

const STORAGE_KEY = 'practice107-question-stats'

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

function mergeSessionStats(stats, answers) {
  const next = { ...stats }
  for (const answer of answers || []) {
    if (!answer?.questionId) continue
    const previous = next[answer.questionId] || { attempts: 0, correct: 0 }
    next[answer.questionId] = {
      attempts: previous.attempts + 1,
      correct: previous.correct + (answer.correct ? 1 : 0),
      lastSeen: Date.now(),
    }
  }
  return next
}

export function useQuestionStats(certId) {
  const [stats, setStats] = useState(() => readJSON(STORAGE_KEY, {}))

  useEffect(() => {
    writeJSON(STORAGE_KEY, stats)
  }, [stats])

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === STORAGE_KEY) setStats(readJSON(STORAGE_KEY, {}))
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const certStats = useMemo(() => stats[certId] || {}, [stats, certId])

  const recordSession = useCallback((answers) => {
    setStats((current) => ({
      ...current,
      [certId]: mergeSessionStats(current[certId] || {}, answers),
    }))
  }, [certId])

  const getWeightedPool = useCallback((questions) => {
    return buildWeightedPool(questions, certStats)
  }, [certStats])

  const trackedCount = useMemo(() => Object.keys(certStats).length, [certStats])

  return { certStats, recordSession, getWeightedPool, trackedCount }
}
