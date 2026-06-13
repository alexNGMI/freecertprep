// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard.jsx'

const question = {
  id: 501,
  domain: 'Using Basic Transforming Commands',
  type: 'single-choice',
  question: 'Which command produces the displayed grouped counts?',
  choices: ['stats', 'rename', 'fields', 'dedup'],
  correctAnswer: 0,
  evidenceArtifacts: [
    {
      type: 'table',
      title: 'Statistical result',
      columns: ['status', 'count'],
      rows: [
        ['500', '42'],
        ['404', '17'],
      ],
    },
  ],
  explanation: 'Why this is right: stats creates grouped counts. Why the alternatives are wrong: The other commands do not aggregate. Review takeaway: Match the command to the requested result shape.',
}

describe('QuestionCard search evidence', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders compact result evidence before a selected-response question', () => {
    render(
      <QuestionCard
        question={question}
        onAnswer={() => {}}
        answered={false}
        selectedChoice={null}
        reviewMode
      />,
    )

    expect(screen.getByText('Search evidence')).toBeTruthy()
    expect(screen.getByText('Statistical result')).toBeTruthy()
    expect(screen.getByText('status')).toBeTruthy()
    expect(screen.getByText('42')).toBeTruthy()
  })
})
