import { describe, it, expect } from 'vitest'
import { aggregateDomainStats, aggregateOverallStats } from '../utils/progress-stats.js'

// ─── aggregateDomainStats ───────────────────────────────────────────────────

describe('aggregateDomainStats', () => {
  const domains = [
    { name: 'D1', weight: 50 },
    { name: 'D2', weight: 50 },
  ]

  it('returns zeros for all domains when there are no sessions', () => {
    const result = aggregateDomainStats([], domains)
    expect(result).toEqual([
      { domain: 'D1', total: 0, correct: 0, percentage: 0 },
      { domain: 'D2', total: 0, correct: 0, percentage: 0 },
    ])
  })

  it('returns zeros when sessions exist but have no answers in the target domains', () => {
    const sessions = [
      { answers: [{ questionId: 1, domain: 'Other', correct: true }] },
    ]
    const result = aggregateDomainStats(sessions, domains)
    expect(result[0]).toEqual({ domain: 'D1', total: 0, correct: 0, percentage: 0 })
    expect(result[1]).toEqual({ domain: 'D2', total: 0, correct: 0, percentage: 0 })
  })

  it('counts correct and incorrect answers per domain', () => {
    const sessions = [
      {
        answers: [
          { questionId: 1, domain: 'D1', correct: true },
          { questionId: 2, domain: 'D1', correct: false },
          { questionId: 3, domain: 'D2', correct: true },
        ],
      },
    ]
    const result = aggregateDomainStats(sessions, domains)
    expect(result[0]).toEqual({ domain: 'D1', total: 2, correct: 1, percentage: 50 })
    expect(result[1]).toEqual({ domain: 'D2', total: 1, correct: 1, percentage: 100 })
  })

  it('rolls up across multiple sessions', () => {
    const sessions = [
      { answers: [{ questionId: 1, domain: 'D1', correct: true }] },
      { answers: [{ questionId: 2, domain: 'D1', correct: false }] },
      { answers: [{ questionId: 3, domain: 'D1', correct: true }] },
    ]
    const result = aggregateDomainStats(sessions, [{ name: 'D1', weight: 100 }])
    expect(result[0]).toEqual({ domain: 'D1', total: 3, correct: 2, percentage: 67 })
  })

  it('rounds percentages to the nearest whole number', () => {
    const sessions = [
      {
        answers: [
          { questionId: 1, domain: 'D1', correct: true },
          { questionId: 2, domain: 'D1', correct: true },
          { questionId: 3, domain: 'D1', correct: false },
        ],
      },
    ]
    // 2/3 = 66.66..., should round to 67
    const result = aggregateDomainStats(sessions, [{ name: 'D1', weight: 100 }])
    expect(result[0].percentage).toBe(67)
  })

  it('tolerates sessions with missing answers array', () => {
    const sessions = [
      { answers: [{ questionId: 1, domain: 'D1', correct: true }] },
      {}, // no answers field
      { answers: [] }, // empty
    ]
    const result = aggregateDomainStats(sessions, [{ name: 'D1', weight: 100 }])
    expect(result[0]).toEqual({ domain: 'D1', total: 1, correct: 1, percentage: 100 })
  })

  it('returns results in the order domains were passed in', () => {
    const sessions = [
      { answers: [{ questionId: 1, domain: 'D2', correct: true }] },
    ]
    const result = aggregateDomainStats(sessions, [
      { name: 'D1', weight: 50 },
      { name: 'D2', weight: 50 },
    ])
    expect(result[0].domain).toBe('D1')
    expect(result[1].domain).toBe('D2')
  })
})

// ─── aggregateOverallStats ──────────────────────────────────────────────────

describe('aggregateOverallStats', () => {
  it('returns all zeros when both histories are empty', () => {
    const result = aggregateOverallStats([], [])
    expect(result).toEqual({
      totalQuestions: 0,
      correctAnswers: 0,
      percentage: 0,
      quizzesTaken: 0,
      examsTaken: 0,
    })
  })

  it('counts quiz and exam sessions separately', () => {
    const quiz = [
      { answers: [{ questionId: 1, domain: 'D1', correct: true }] },
      { answers: [{ questionId: 2, domain: 'D1', correct: false }] },
    ]
    const exam = [
      { answers: [{ questionId: 3, domain: 'D1', correct: true }] },
    ]
    const result = aggregateOverallStats(quiz, exam)
    expect(result.quizzesTaken).toBe(2)
    expect(result.examsTaken).toBe(1)
  })

  it('aggregates answers across quiz and exam histories', () => {
    const quiz = [
      {
        answers: [
          { questionId: 1, domain: 'D1', correct: true },
          { questionId: 2, domain: 'D1', correct: true },
        ],
      },
    ]
    const exam = [
      {
        answers: [
          { questionId: 3, domain: 'D1', correct: false },
          { questionId: 4, domain: 'D1', correct: true },
        ],
      },
    ]
    const result = aggregateOverallStats(quiz, exam)
    expect(result.totalQuestions).toBe(4)
    expect(result.correctAnswers).toBe(3)
    expect(result.percentage).toBe(75)
  })

  it('reports 0% when all answers are wrong', () => {
    const quiz = [
      {
        answers: [
          { questionId: 1, domain: 'D1', correct: false },
          { questionId: 2, domain: 'D1', correct: false },
        ],
      },
    ]
    const result = aggregateOverallStats(quiz, [])
    expect(result.percentage).toBe(0)
    expect(result.correctAnswers).toBe(0)
    expect(result.totalQuestions).toBe(2)
  })

  it('reports 100% when all answers are right', () => {
    const exam = [
      {
        answers: [
          { questionId: 1, domain: 'D1', correct: true },
          { questionId: 2, domain: 'D1', correct: true },
        ],
      },
    ]
    const result = aggregateOverallStats([], exam)
    expect(result.percentage).toBe(100)
  })

  it('tolerates sessions with missing answers field', () => {
    const quiz = [
      { answers: [{ questionId: 1, domain: 'D1', correct: true }] },
      {}, // malformed but shouldn't crash
    ]
    const result = aggregateOverallStats(quiz, [])
    // The malformed session still counts toward quizzesTaken — matches useProgress behavior
    expect(result.quizzesTaken).toBe(2)
    expect(result.totalQuestions).toBe(1)
    expect(result.correctAnswers).toBe(1)
  })
})
