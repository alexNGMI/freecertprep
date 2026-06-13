// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { useExamSession } from '../hooks/useExamSession'
import { KEYS } from '../utils/storage'

const cert = {
  id: 'exam-cert',
  examTime: 60,
  examQuestions: 2,
  domains: [{ name: 'Domain A', weight: 100 }],
}

const questions = Array.from({ length: 4 }, (_, index) => ({
  id: `q-${index + 1}`,
  domain: 'Domain A',
  question: `Question ${index + 1}`,
  choices: ['Correct', 'Wrong'],
  correctAnswer: 0,
}))

describe('exam session hardening', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('records only once when finish is triggered twice', () => {
    const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    const { result } = renderHook(() => useExamSession({
      cert,
      questions,
      resultsPath: '/exam-cert/results',
    }), { wrapper })

    act(() => {
      result.current.finishExam()
      result.current.finishExam()
    })

    const progress = JSON.parse(localStorage.getItem(KEYS.progress))
    expect(progress[cert.id].examHistory).toHaveLength(1)
  })
})
