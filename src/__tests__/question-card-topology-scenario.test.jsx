// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard.jsx'

const topologyQuestion = {
  id: 'ccna-topology-001',
  domain: 'IP Connectivity',
  type: 'topology-scenario',
  prompt: 'Review the topology and interface table.',
  topology: {
    label: 'Router on a stick topology',
    width: 640,
    height: 300,
    nodes: [
      { id: 'R1', label: 'R1', kind: 'router', x: 120, y: 140 },
      { id: 'SW1', label: 'SW1', kind: 'switch', x: 320, y: 140 },
      { id: 'PC1', label: 'PC1', kind: 'host', x: 520, y: 80 },
      { id: 'PC2', label: 'PC2', kind: 'host', x: 520, y: 210 },
    ],
    links: [
      { from: 'R1', to: 'SW1', label: 'G0/0 - G0/1' },
      { from: 'SW1', to: 'PC1', label: 'VLAN 10' },
      { from: 'SW1', to: 'PC2', label: 'VLAN 20' },
    ],
  },
  tables: [
    {
      title: 'Switchport Summary',
      columns: ['Interface', 'Mode', 'Access VLAN', 'Allowed VLANs'],
      rows: [
        ['Gi0/1', 'trunk', '-', '10'],
        ['Gi0/2', 'access', '10', '-'],
        ['Gi0/3', 'access', '20', '-'],
      ],
    },
  ],
  question: 'PC2 in VLAN 20 cannot reach its default gateway on R1. What should be fixed first?',
  choices: [
    'Add VLAN 20 to the trunk allowed VLAN list',
    'Move PC2 to VLAN 10',
    'Change Gi0/2 to routed mode',
    'Disable trunking between R1 and SW1',
  ],
  correctAnswer: 0,
  explanation: 'The trunk only allows VLAN 10, so VLAN 20 traffic cannot cross from SW1 to R1 until VLAN 20 is allowed on the trunk.',
}

describe('QuestionCard topology-scenario questions', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders the topology, table, and single-choice answer flow', () => {
    const onAnswer = vi.fn()

    render(
      <QuestionCard
        question={topologyQuestion}
        onAnswer={onAnswer}
        answered={false}
        selectedChoice={null}
        reviewMode
      />,
    )

    expect(screen.getByText('Read the topology')).toBeTruthy()
    expect(screen.getByText('Review the topology and interface table.')).toBeTruthy()
    expect(screen.getByRole('img', { name: 'Router on a stick topology' })).toBeTruthy()
    expect(screen.getByText('Switchport Summary')).toBeTruthy()
    expect(screen.getByText('Allowed VLANs')).toBeTruthy()
    expect(screen.getByText('Gi0/1')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /Add VLAN 20 to the trunk allowed VLAN list/i }))

    expect(onAnswer).toHaveBeenCalledWith(0)
  })

  it('keeps topology context visible in review state', () => {
    render(
      <QuestionCard
        question={topologyQuestion}
        onAnswer={() => {}}
        answered
        selectedChoice={0}
        reviewMode
      />,
    )

    expect(screen.getByText('Correct!')).toBeTruthy()
    expect(screen.getByText(/The trunk only allows VLAN 10/)).toBeTruthy()
    expect(screen.getByRole('img', { name: 'Router on a stick topology' })).toBeTruthy()
  })
})
