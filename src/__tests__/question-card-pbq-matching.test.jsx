// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard.jsx'

const pbqQuestion = {
  id: 'netplus-pbq-test-001',
  domain: 'Network Troubleshooting',
  type: 'pbq-matching',
  pbq: {
    title: 'Branch wireless outage ticket',
    scenario: 'Three users report different wireless symptoms after an access point refresh.',
    evidence: [
      {
        title: 'Controller alerts',
        items: [
          { label: 'AP-01', value: 'High retries on 2.4 GHz' },
          { label: 'AP-02', value: 'RADIUS rejects for contractor SSID' },
        ],
      },
    ],
  },
  question: 'Match each observation to the most likely next action.',
  itemsLeft: [
    '2.4 GHz clients connect but experience low throughput near a microwave',
    'Contractors enter valid passwords but receive authentication failures',
  ],
  itemsRight: [
    'Review RADIUS policy and certificate trust for the SSID',
    'Move clients to 5 GHz or adjust channel/power to reduce interference',
  ],
  correctMatches: [1, 0],
  explanation: 'RF interference explains the retries and throughput issue; authentication failures point first to RADIUS policy or trust.',
}

describe('QuestionCard pbq-matching questions', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders PBQ scenario evidence and submits matched answers', () => {
    const onAnswer = vi.fn()

    render(
      <QuestionCard
        question={pbqQuestion}
        onAnswer={onAnswer}
        answered={false}
        selectedChoice={null}
        reviewMode
      />,
    )

    expect(screen.getByText('PBQ-lite matching')).toBeTruthy()
    expect(screen.getByText('Branch wireless outage ticket')).toBeTruthy()
    expect(screen.getByText(/Three users report different wireless symptoms/)).toBeTruthy()
    expect(screen.getByText('Controller alerts')).toBeTruthy()
    expect(screen.getByText('AP-01')).toBeTruthy()
    expect(screen.getByText('High retries on 2.4 GHz')).toBeTruthy()

    const selects = screen.getAllByRole('combobox')
    fireEvent.change(selects[0], { target: { value: '1' } })
    fireEvent.change(selects[1], { target: { value: '0' } })
    fireEvent.click(screen.getByRole('button', { name: 'Submit Answer' }))

    expect(onAnswer).toHaveBeenCalledWith([1, 0])
  })

  it('keeps PBQ evidence visible in review state', () => {
    render(
      <QuestionCard
        question={pbqQuestion}
        onAnswer={() => {}}
        answered
        selectedChoice={[1, 0]}
        reviewMode
      />,
    )

    expect(screen.getByText('Correct!')).toBeTruthy()
    expect(screen.getByText(/RF interference explains/)).toBeTruthy()
    expect(screen.getByText('RADIUS rejects for contractor SSID')).toBeTruthy()
  })

  it('shows component-level progress for a partially correct PBQ review', () => {
    render(
      <QuestionCard
        question={pbqQuestion}
        onAnswer={() => {}}
        answered
        selectedChoice={[1, 1]}
        reviewMode
      />,
    )

    expect(screen.getByText('Incorrect')).toBeTruthy()
    expect(screen.getByText('Component check: 1/2 correct')).toBeTruthy()
  })
})
