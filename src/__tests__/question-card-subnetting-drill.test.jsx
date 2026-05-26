// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard.jsx'

const subnetQuestion = {
  id: 'ccna-subnetting-001',
  domain: 'Network Infrastructure and Connectivity',
  type: 'subnetting-drill',
  given: '192.168.10.64/27',
  asks: ['network', 'broadcast', 'firstUsable', 'lastUsable', 'hostCount'],
  correct: {
    network: '192.168.10.64',
    broadcast: '192.168.10.95',
    firstUsable: '192.168.10.65',
    lastUsable: '192.168.10.94',
    hostCount: 30,
  },
  question: 'Calculate the requested values for the subnet.',
  explanation: 'A /27 has a block size of 32. The subnet beginning at .64 spans .64 through .95, with .65 through .94 usable for hosts.',
}

describe('QuestionCard subnetting-drill questions', () => {
  afterEach(() => {
    cleanup()
  })

  it('collects subnet fields and submits an answer object', () => {
    const onAnswer = vi.fn()

    render(
      <QuestionCard
        question={subnetQuestion}
        onAnswer={onAnswer}
        answered={false}
        selectedChoice={null}
      />,
    )

    expect(screen.getByText('Subnetting drill')).toBeTruthy()
    expect(screen.getByText('192.168.10.64/27')).toBeTruthy()

    fireEvent.change(screen.getByLabelText('Network address'), { target: { value: '192.168.10.64' } })
    fireEvent.change(screen.getByLabelText('Broadcast address'), { target: { value: '192.168.10.95' } })
    fireEvent.change(screen.getByLabelText('First usable host'), { target: { value: '192.168.10.65' } })
    fireEvent.change(screen.getByLabelText('Last usable host'), { target: { value: '192.168.10.94' } })
    fireEvent.change(screen.getByLabelText('Usable host count'), { target: { value: '30' } })
    fireEvent.click(screen.getByRole('button', { name: 'Submit Answer' }))

    expect(onAnswer).toHaveBeenCalledWith({
      network: '192.168.10.64',
      broadcast: '192.168.10.95',
      firstUsable: '192.168.10.65',
      lastUsable: '192.168.10.94',
      hostCount: '30',
    })
  })

  it('shows field-level feedback in review state', () => {
    render(
      <QuestionCard
        question={subnetQuestion}
        onAnswer={() => {}}
        answered
        selectedChoice={{
          network: '192.168.10.64',
          broadcast: '192.168.10.94',
          firstUsable: '192.168.10.65',
          lastUsable: '192.168.10.94',
          hostCount: '30',
        }}
      />,
    )

    expect(screen.getByText('Incorrect')).toBeTruthy()
    expect(screen.getByText('Correct: 192.168.10.95')).toBeTruthy()
    expect(screen.getByText(/A \/27 has a block size of 32/)).toBeTruthy()
  })
})
