// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard.jsx'

const question = {
  id: 'terraform-true-false-test',
  domain: 'Terraform state management',
  type: 'true-false',
  question: 'State locking helps prevent concurrent state writes.',
  choices: ['True', 'False'],
  correctAnswer: 0,
  explanation: 'Locking protects supported backends from conflicting writers.',
}

describe('QuestionCard true-false questions', () => {
  afterEach(cleanup)

  it('labels and scores the true-false interaction', () => {
    const onAnswer = vi.fn()
    render(
      <QuestionCard
        question={question}
        onAnswer={onAnswer}
        answered={false}
        selectedChoice={null}
      />,
    )

    expect(screen.getByText('True or false')).toBeTruthy()
    fireEvent.click(screen.getByText('True').closest('button'))
    expect(onAnswer).toHaveBeenCalledWith(0)
  })
})
