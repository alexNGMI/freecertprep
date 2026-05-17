// @vitest-environment jsdom
//
// The money path: completing a session must update BOTH per-question
// Smart Practice stats and quiz/exam progress, and the dashboard-facing
// aggregates must reflect it. This is the integration safety net for the
// Phase B3 session-hook extraction — the headless hooks must produce
// identical end state to today's per-page logic.

import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useProgress } from '../hooks/useProgress.js'
import { useQuestionStats } from '../hooks/useQuestionStats.js'

const CERT = 'cert-money'
const DOMAINS = [{ name: 'Networking' }, { name: 'Security' }]

// What a finished quiz hands to the two hooks today.
const session = {
  answers: [
    { questionId: 'n1', domain: 'Networking', correct: true },
    { questionId: 'n2', domain: 'Networking', correct: false },
    { questionId: 's1', domain: 'Security', correct: true },
    { questionId: 's2', domain: 'Security', correct: true },
  ],
}
const perQuestion = session.answers.map(a => ({ questionId: a.questionId, correct: a.correct }))

beforeEach(() => {
  localStorage.clear()
})

describe('money path: session → progress + stats → dashboard aggregates', () => {
  it('records a quiz into both stores and reflects it in the aggregates', () => {
    const progress = renderHook(() => useProgress(CERT))
    const stats = renderHook(() => useQuestionStats(CERT))

    act(() => {
      progress.result.current.addQuizResult(session)
      stats.result.current.recordSession(perQuestion)
    })

    // Dashboard "overall" tiles.
    expect(progress.result.current.getOverallStats).toEqual({
      totalQuestions: 4,
      correctAnswers: 3,
      percentage: 75,
      quizzesTaken: 1,
      examsTaken: 0,
    })

    // Dashboard per-domain readiness bars.
    expect(progress.result.current.getDomainStats(DOMAINS)).toEqual([
      { domain: 'Networking', total: 2, correct: 1, percentage: 50 },
      { domain: 'Security', total: 2, correct: 2, percentage: 100 },
    ])

    // Smart Practice now tracks every answered question.
    expect(stats.result.current.trackedCount).toBe(4)
  })

  it('accumulates across an exam after a quiz', () => {
    const progress = renderHook(() => useProgress(CERT))
    const stats = renderHook(() => useQuestionStats(CERT))

    act(() => {
      progress.result.current.addQuizResult(session)
      stats.result.current.recordSession(perQuestion)
    })
    act(() => {
      progress.result.current.addExamResult({
        answers: [{ questionId: 'n1', domain: 'Networking', correct: false }],
      })
      stats.result.current.recordSession([{ questionId: 'n1', correct: false }])
    })

    const overall = progress.result.current.getOverallStats
    expect(overall.totalQuestions).toBe(5)
    expect(overall.correctAnswers).toBe(3)
    expect(overall.quizzesTaken).toBe(1)
    expect(overall.examsTaken).toBe(1)

    // n1 attempted twice (quiz correct, exam wrong) → 2 attempts / 1 correct.
    expect(stats.result.current.certStats.n1).toMatchObject({ attempts: 2, correct: 1 })
  })

  it('survives a reload (persisted end state is stable)', () => {
    const progress = renderHook(() => useProgress(CERT))
    const stats = renderHook(() => useQuestionStats(CERT))
    act(() => {
      progress.result.current.addQuizResult(session)
      stats.result.current.recordSession(perQuestion)
    })

    // Fresh mounts read persisted localStorage — what the user sees on
    // returning to the dashboard.
    const reloadedProgress = renderHook(() => useProgress(CERT))
    const reloadedStats = renderHook(() => useQuestionStats(CERT))

    expect(reloadedProgress.result.current.getOverallStats.totalQuestions).toBe(4)
    expect(reloadedStats.result.current.trackedCount).toBe(4)
  })
})
