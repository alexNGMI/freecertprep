// @vitest-environment jsdom
//
// Characterization tests: they pin the CURRENT public behavior of
// useProgress so the upcoming session-hook extraction (Phase B3) is a
// provably behavior-preserving refactor. If B3 changes any assertion
// here, that is a real behavior change to review — not a test to "fix".

import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useProgress } from '../hooks/useProgress.js'
import { KEYS, SESSION_RETENTION } from '../utils/storage.js'

const DOMAINS = [{ name: 'Alpha' }, { name: 'Beta' }]

function quizSession() {
  return {
    answers: [
      { questionId: 'q1', domain: 'Alpha', correct: true },
      { questionId: 'q2', domain: 'Alpha', correct: false },
      { questionId: 'q3', domain: 'Beta', correct: true },
    ],
  }
}

beforeEach(() => {
  localStorage.clear()
})

describe('useProgress — initial state', () => {
  it('starts with empty quiz and exam history for a cert', () => {
    const { result } = renderHook(() => useProgress('cert-a'))
    expect(result.current.progress).toEqual({ quizHistory: [], examHistory: [] })
    expect(result.current.getOverallStats).toEqual({
      totalQuestions: 0,
      correctAnswers: 0,
      percentage: 0,
      quizzesTaken: 0,
      examsTaken: 0,
    })
  })

  it('falls back safely when storage contains valid JSON with the wrong shape', () => {
    localStorage.setItem(KEYS.progress, 'null')
    const { result } = renderHook(() => useProgress('cert-a'))

    expect(result.current.progress).toEqual({ quizHistory: [], examHistory: [] })
    expect(result.current.getOverallStats.totalQuestions).toBe(0)
  })
})

describe('useProgress — recording results', () => {
  it('addQuizResult appends to quizHistory with a numeric timestamp', () => {
    const { result } = renderHook(() => useProgress('cert-a'))
    act(() => result.current.addQuizResult(quizSession()))

    expect(result.current.progress.quizHistory).toHaveLength(1)
    expect(typeof result.current.progress.quizHistory[0].timestamp).toBe('number')
    expect(result.current.progress.examHistory).toHaveLength(0)
  })

  it('addExamResult appends to examHistory only', () => {
    const { result } = renderHook(() => useProgress('cert-a'))
    act(() => result.current.addExamResult(quizSession()))

    expect(result.current.progress.examHistory).toHaveLength(1)
    expect(result.current.progress.quizHistory).toHaveLength(0)
  })

  it('getOverallStats reflects recorded answers', () => {
    const { result } = renderHook(() => useProgress('cert-a'))
    act(() => result.current.addQuizResult(quizSession()))

    expect(result.current.getOverallStats).toEqual({
      totalQuestions: 3,
      correctAnswers: 2,
      percentage: 67, // round(2/3*100)
      quizzesTaken: 1,
      examsTaken: 0,
    })
  })

  it('getDomainStats rolls up per domain in the given order', () => {
    const { result } = renderHook(() => useProgress('cert-a'))
    act(() => result.current.addQuizResult(quizSession()))

    const stats = result.current.getDomainStats(DOMAINS)
    expect(stats).toEqual([
      { domain: 'Alpha', total: 2, correct: 1, percentage: 50 },
      { domain: 'Beta', total: 1, correct: 1, percentage: 100 },
    ])
  })

  it('resetProgress clears only the active cert history', () => {
    const { result } = renderHook(() => useProgress('cert-a'))
    act(() => result.current.addQuizResult(quizSession()))
    act(() => result.current.resetProgress())

    expect(result.current.progress).toEqual({ quizHistory: [], examHistory: [] })
    expect(result.current.getOverallStats.totalQuestions).toBe(0)
  })
})

describe('useProgress — persistence & isolation', () => {
  it('persists to the canonical localStorage key and reloads', () => {
    const first = renderHook(() => useProgress('cert-a'))
    act(() => first.result.current.addQuizResult(quizSession()))

    // Written under the shared progress key.
    expect(localStorage.getItem(KEYS.progress)).toBeTruthy()

    // A fresh mount reads the persisted state back.
    const second = renderHook(() => useProgress('cert-a'))
    expect(second.result.current.progress.quizHistory).toHaveLength(1)
    expect(second.result.current.getOverallStats.totalQuestions).toBe(3)
  })

  it('keeps separate certs independent', () => {
    const { result } = renderHook(() => useProgress('cert-a'))
    act(() => result.current.addQuizResult(quizSession()))

    const other = renderHook(() => useProgress('cert-b'))
    expect(other.result.current.progress).toEqual({ quizHistory: [], examHistory: [] })
  })

  it('compacts an oversized stored history while preserving the latest diagnostic', () => {
    const diagnostic = { kind: 'diagnostic', timestamp: 1, answers: [] }
    const quizHistory = [
      diagnostic,
      ...Array.from({ length: SESSION_RETENTION.quizHistory + 4 }, (_, index) => ({
        kind: 'quiz',
        timestamp: index + 2,
        answers: [],
      })),
    ]
    localStorage.setItem(KEYS.progress, JSON.stringify({
      'cert-a': { quizHistory, examHistory: [] },
    }))

    const { result } = renderHook(() => useProgress('cert-a'))

    expect(result.current.progress.quizHistory).toHaveLength(SESSION_RETENTION.quizHistory + 1)
    expect(result.current.progress.quizHistory[0]).toEqual(diagnostic)
  })
})
