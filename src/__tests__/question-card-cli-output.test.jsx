// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard.jsx'

const cliQuestion = {
  id: 'ccna-cli-output-001',
  domain: 'Network Access',
  type: 'cli-output',
  prompt: 'Review the switch output.',
  commands: [
    {
      device: 'SW1',
      command: 'show interfaces trunk',
      output: [
        'Port        Mode         Encapsulation  Status        Native vlan',
        'Gi0/1       on           802.1q         trunking      99',
        '',
        'Port        Vlans allowed on trunk',
        'Gi0/1       10,20,30',
      ].join('\n'),
    },
  ],
  question: 'Users in VLAN 20 cannot reach resources across this trunk. Which issue should the technician investigate first?',
  choices: [
    'The switch is using access mode on Gi0/1',
    'The native VLAN may not match the neighboring switch',
    'VLAN 20 is missing from the allowed VLAN list',
    'The interface is administratively down',
  ],
  correctAnswer: 1,
  explanation: 'The trunk is up and VLAN 20 is allowed, so the unusual native VLAN is the first mismatch to verify on the neighbor.',
}

describe('QuestionCard cli-output questions', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders command output and submits answers through the single-choice flow', () => {
    const onAnswer = vi.fn()

    render(
      <QuestionCard
        question={cliQuestion}
        onAnswer={onAnswer}
        answered={false}
        selectedChoice={null}
        reviewMode
      />,
    )

    expect(screen.getByText('Interpret command output')).toBeTruthy()
    expect(screen.getByText('Review the switch output.')).toBeTruthy()
    expect(screen.getByText('SW1')).toBeTruthy()
    expect(screen.getByText('show interfaces trunk')).toBeTruthy()
    expect(screen.getByText(/Gi0\/1\s+on\s+802\.1q\s+trunking\s+99/)).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /native VLAN may not match/i }))

    expect(onAnswer).toHaveBeenCalledWith(1)
  })

  it('shows command output and explanation in answered review state', () => {
    render(
      <QuestionCard
        question={cliQuestion}
        onAnswer={() => {}}
        answered
        selectedChoice={1}
        reviewMode
      />,
    )

    expect(screen.getByText('Correct!')).toBeTruthy()
    expect(screen.getByText(/The trunk is up and VLAN 20 is allowed/)).toBeTruthy()
    expect(screen.getByText(/Vlans allowed on trunk/)).toBeTruthy()
  })
})
