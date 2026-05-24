// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard.jsx'

const configQuestion = {
  id: 'ccna-config-repair-001',
  domain: 'IP Services',
  type: 'config-repair',
  scenario: 'PAT should allow inside hosts to reach the internet, but translations are not being created.',
  device: 'R1',
  configTitle: 'Running configuration excerpt',
  config: [
    'interface GigabitEthernet0/0',
    ' ip address 192.168.10.1 255.255.255.0',
    ' ip nat inside',
    'interface GigabitEthernet0/1',
    ' ip address 203.0.113.2 255.255.255.252',
    'access-list 1 permit 192.168.10.0 0.0.0.255',
    'ip nat inside source list 1 interface GigabitEthernet0/1 overload',
  ],
  notes: [
    'Inside LAN: 192.168.10.0/24',
    'ISP link: GigabitEthernet0/1',
  ],
  question: 'Which command is missing from the configuration?',
  choices: [
    'ip nat outside under GigabitEthernet0/1',
    'ip nat inside under GigabitEthernet0/1',
    'access-list 1 deny any',
    'no ip classless',
  ],
  correctAnswer: 0,
  explanation: 'The outside interface is not marked with ip nat outside, so PAT cannot classify the egress interface for translations.',
}

describe('QuestionCard config-repair questions', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders config context and submits answers through the single-choice flow', () => {
    const onAnswer = vi.fn()

    render(
      <QuestionCard
        question={configQuestion}
        onAnswer={onAnswer}
        answered={false}
        selectedChoice={null}
        reviewMode
      />,
    )

    expect(screen.getByText('Repair the config')).toBeTruthy()
    expect(screen.getByText(/PAT should allow inside hosts/)).toBeTruthy()
    expect(screen.getByText('Running configuration excerpt')).toBeTruthy()
    expect(screen.getByText('R1')).toBeTruthy()
    expect(screen.getByText('ip nat inside source list 1 interface GigabitEthernet0/1 overload')).toBeTruthy()
    expect(screen.getByText('Inside LAN: 192.168.10.0/24')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /ip nat outside under GigabitEthernet0\/1/i }))

    expect(onAnswer).toHaveBeenCalledWith(0)
  })

  it('keeps the config visible in review state', () => {
    render(
      <QuestionCard
        question={configQuestion}
        onAnswer={() => {}}
        answered
        selectedChoice={0}
        reviewMode
      />,
    )

    expect(screen.getByText('Correct!')).toBeTruthy()
    expect(screen.getByText(/outside interface is not marked/)).toBeTruthy()
    expect(screen.getByText('access-list 1 permit 192.168.10.0 0.0.0.255')).toBeTruthy()
  })
})
