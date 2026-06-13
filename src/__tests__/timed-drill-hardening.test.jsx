// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTimedDrillSession } from '../hooks/useTimedDrillSession'
import { KEYS } from '../utils/storage'

const cert = {
  id: 'drill-cert',
  domains: [{ name: 'Domain A', weight: 100 }],
}

const questions = Array.from({ length: 4 }, (_, index) => ({
  id: `q-${index + 1}`,
  domain: 'Domain A',
  question: `Question ${index + 1}`,
  choices: ['Correct', 'Wrong'],
  correctAnswer: 0,
}))

describe('timed drill hardening', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('keeps its selected form stable after Smart Practice stats are recorded', () => {
    const { result } = renderHook(() => useTimedDrillSession({
      cert,
      questions,
      questionCount: 2,
      duration: 600,
    }))

    act(() => result.current.startDrill())
    const selectedIds = result.current.drillQuestions.map(question => question.id)

    act(() => result.current.handleAnswer(0))
    act(() => result.current.handleNext())
    act(() => result.current.handleAnswer(1))
    act(() => result.current.handleNext())

    expect(result.current.showResult).toBe(true)
    expect(result.current.drillQuestions.map(question => question.id)).toEqual(selectedIds)
  })

  it('records a completed drill only once when completion is triggered twice', () => {
    const { result } = renderHook(() => useTimedDrillSession({
      cert,
      questions,
      questionCount: 1,
      duration: 600,
    }))

    act(() => result.current.startDrill())
    act(() => result.current.handleAnswer(0))
    act(() => {
      result.current.handleNext()
      result.current.handleNext()
    })

    const progress = JSON.parse(localStorage.getItem(KEYS.progress))
    const stats = JSON.parse(localStorage.getItem(KEYS.questionStats))
    const questionId = result.current.drillQuestions[0].id

    expect(progress[cert.id].quizHistory).toHaveLength(1)
    expect(stats[cert.id][questionId].attempts).toBe(1)
  })
})
