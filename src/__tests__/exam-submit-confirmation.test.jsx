// @vitest-environment jsdom

import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Exam from '../pages/Exam'

const finishExam = vi.fn()

vi.mock('../hooks/useCert', () => ({
  useCert: () => ({
    id: 'test-cert',
    title: 'Test Certification',
    code: 'TEST-1',
    color: '#22c55e',
    examQuestions: 3,
    examTime: 60,
    passingScore: 70,
    domains: [{ name: 'Domain A', weight: 100 }],
    domainColors: { 'Domain A': { hex: '#22c55e' } },
    questions: [],
  }),
}))

vi.mock('../hooks/useExamSession', () => ({
  useExamSession: () => ({
    answeredCount: 1,
    currentIndex: 0,
    currentQuestion: {
      id: 'q-1',
      domain: 'Domain A',
      question: 'Which answer is correct?',
      choices: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
    },
    examQuestionCount: 3,
    examQuestions: [{ id: 'q-1' }, { id: 'q-2' }, { id: 'q-3' }],
    finishExam,
    goNext: vi.fn(),
    goPrevious: vi.fn(),
    goToQuestion: vi.fn(),
    selectAnswer: vi.fn(),
    selectedAnswers: { 0: 0 },
    setStarted: vi.fn(),
    started: true,
    timeLeft: 3000,
  }),
}))

describe('exam submission confirmation', () => {
  beforeEach(() => {
    finishExam.mockClear()
  })

  it('warns before submitting an incomplete exam', () => {
    render(<Exam />)

    fireEvent.click(screen.getByRole('button', { name: 'Submit Exam' }))

    expect(finishExam).not.toHaveBeenCalled()
    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Submit with 2 unanswered?' })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Keep Working' }))
    expect(screen.queryByRole('dialog')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Submit Exam' }))
    fireEvent.click(screen.getByRole('button', { name: 'Submit Anyway' }))
    expect(finishExam).toHaveBeenCalledTimes(1)
  })
})
