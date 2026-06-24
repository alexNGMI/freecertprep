// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard.jsx'

describe('QuestionCard accessibility', () => {
  afterEach(cleanup)

  it('exposes single-choice answers as a named button group without changing answer values', () => {
    const onAnswer = vi.fn()
    const question = {
      id: 'single-a11y',
      domain: 'Security',
      question: 'Which control is preventive?',
      choices: ['Firewall rule', 'Audit report'],
      correctAnswer: 0,
      explanation: 'A firewall rule can prevent traffic.',
    }

    render(
      <QuestionCard
        question={question}
        onAnswer={onAnswer}
        answered={false}
        selectedChoice={1}
      />,
    )

    const group = screen.getByRole('group', { name: question.question })
    const selectedButton = screen.getByRole('button', { name: /Audit report/ })
    const preventiveButton = screen.getByRole('button', { name: /Firewall rule/ })
    expect(group).toBeTruthy()
    expect(selectedButton.getAttribute('aria-pressed')).toBe('true')

    fireEvent.click(preventiveButton)
    expect(onAnswer).toHaveBeenCalledWith(0)
  })

  it('exposes multiple-response selections as pressed toggle buttons', () => {
    const question = {
      id: 'multi-a11y',
      domain: 'Networking',
      type: 'multiple-response',
      question: 'Select two private addresses.',
      choices: ['10.0.0.1', '8.8.8.8', '192.168.1.1'],
      correctAnswers: [0, 2],
      explanation: 'RFC 1918 defines private ranges.',
    }

    render(
      <QuestionCard
        question={question}
        onAnswer={() => {}}
        answered={false}
        selectedChoice={[0]}
        examMode
      />,
    )

    expect(screen.getByRole('group', { name: question.question })).toBeTruthy()
    expect(screen.getByRole('button', { name: /10.0.0.1/ }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('button', { name: /8.8.8.8/ }).getAttribute('aria-pressed')).toBe('false')
  })

  it('announces answer feedback as a live status', () => {
    const question = {
      id: 'feedback-a11y',
      domain: 'Cloud',
      question: 'Choose the correct answer.',
      choices: ['Correct choice', 'Wrong choice'],
      correctAnswer: 0,
      explanation: 'The first choice is correct.',
    }

    render(
      <QuestionCard
        question={question}
        onAnswer={() => {}}
        answered
        selectedChoice={0}
      />,
    )

    expect(screen.getByRole('status').textContent).toBe('Correct answer.')
    expect(screen.getByText('The first choice is correct.')).toBeTruthy()
  })
})
