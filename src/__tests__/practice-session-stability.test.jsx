// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { SMART_PRACTICE, usePracticeSession } from '../hooks/usePracticeSession'
import { KEYS } from '../utils/storage'

const cert = {
  id: 'test-cert',
  domains: [{ name: 'Domain A', weight: 100 }],
}

const questions = Array.from({ length: 6 }, (_, index) => ({
  id: `q-${index + 1}`,
  domain: 'Domain A',
  question: `Question ${index + 1}`,
  choices: ['Correct', 'Wrong'],
  correctAnswer: 0,
  objectiveId: `1.${index + 1}`,
}))

describe('practice session stability', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('keeps the selected question block stable after recording Smart Practice stats', () => {
    const { result } = renderHook(() => usePracticeSession({
      cert,
      questions,
      bookmarkedIds: [],
      blockSize: 3,
      initialSelection: SMART_PRACTICE,
    }))

    act(() => result.current.startQuiz())
    const selectedIds = result.current.sessionQuestions.map(question => question.id)

    for (let index = 0; index < 3; index += 1) {
      act(() => result.current.handleAnswer(index === 0 ? 0 : 1))
      act(() => result.current.handleNext())
    }

    expect(result.current.showResult).toBe(true)
    expect(result.current.sessionQuestions.map(question => question.id)).toEqual(selectedIds)
  })

  it('records a completed practice block only once when completion is triggered twice', () => {
    const { result } = renderHook(() => usePracticeSession({
      cert,
      questions,
      bookmarkedIds: [],
      blockSize: 1,
      initialSelection: SMART_PRACTICE,
    }))

    act(() => result.current.startQuiz())
    act(() => result.current.handleAnswer(0))
    act(() => {
      result.current.handleNext()
      result.current.handleNext()
    })

    const progress = JSON.parse(localStorage.getItem(KEYS.progress))
    const stats = JSON.parse(localStorage.getItem(KEYS.questionStats))
    const questionId = result.current.sessionQuestions[0].id

    expect(progress[cert.id].quizHistory).toHaveLength(1)
    expect(stats[cert.id][questionId].attempts).toBe(1)
  })
})
