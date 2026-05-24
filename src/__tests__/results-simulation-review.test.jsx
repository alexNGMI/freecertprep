// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Results from '../pages/Results.jsx'

vi.mock('../hooks/useCert', () => ({
  useCert: () => ({
    id: 'ccna-200-301',
    title: 'Cisco CCNA',
    passingScore: 70,
    domainColors: {
      'Network Fundamentals': { hex: '#1d4ed8' },
      'Network Access': { hex: '#0284c7' },
      'IP Connectivity': { hex: '#0f766e' },
      'IP Services': { hex: '#16a34a' },
    },
  }),
}))

const questions = [
  {
    id: 'ccna-review-cli',
    domain: 'Network Access',
    type: 'cli-output',
    prompt: 'Review the switch output.',
    commands: [{ device: 'SW1', command: 'show interfaces trunk', output: 'Gi0/1 trunking native vlan 99' }],
    question: 'What should be verified on the neighbor?',
    choices: ['OSPF process ID', 'Native VLAN consistency', 'DHCP lease time', 'NAT ACL'],
    correctAnswer: 1,
    explanation: 'The trunk native VLAN should match on both sides.',
  },
  {
    id: 'ccna-review-topology',
    domain: 'IP Connectivity',
    type: 'topology-scenario',
    prompt: 'Review the topology.',
    topology: {
      label: 'Missing return route',
      nodes: [
        { id: 'LAN', label: 'LAN', kind: 'subnet', x: 90, y: 150 },
        { id: 'R1', label: 'R1', kind: 'router', x: 320, y: 150 },
        { id: 'WAN', label: 'WAN', kind: 'cloud', x: 540, y: 150 },
      ],
      links: [
        { from: 'LAN', to: 'R1', label: '10.20.0.0/24' },
        { from: 'R1', to: 'WAN', label: 'default' },
      ],
    },
    tables: [{ title: 'Route State', columns: ['Prefix', 'Status'], rows: [['10.20.0.0/24', 'missing on peer']] }],
    question: 'What should be checked first?',
    choices: ['Return route', 'Native VLAN', 'DNS suffix', 'NTP source'],
    correctAnswer: 0,
    explanation: 'The peer needs a route back to the LAN prefix.',
  },
  {
    id: 'ccna-review-config',
    domain: 'IP Services',
    type: 'config-repair',
    scenario: 'PAT is configured but the WAN interface lacks its NAT role.',
    device: 'R1',
    configTitle: 'Running configuration excerpt',
    config: ['interface Gi0/0', ' ip nat inside', 'interface Gi0/1', ' ip address 203.0.113.2 255.255.255.252'],
    question: 'Which command is missing?',
    choices: ['ip nat outside', 'ip helper-address 192.168.1.10', 'switchport mode trunk', 'transport input ssh'],
    correctAnswer: 0,
    explanation: 'The WAN-facing interface needs ip nat outside.',
  },
  {
    id: 'ccna-review-subnet',
    domain: 'Network Fundamentals',
    type: 'subnetting-drill',
    question: 'Calculate the requested subnet values for 192.168.10.64/27.',
    given: '192.168.10.64/27',
    asks: ['network', 'broadcast', 'hostCount'],
    correct: {
      network: '192.168.10.64',
      broadcast: '192.168.10.95',
      hostCount: 30,
    },
    explanation: 'A /27 has a block size of 32 and 30 usable hosts.',
  },
]

const answers = [
  { questionId: 'ccna-review-cli', domain: 'Network Access', selected: 1, correct: true },
  { questionId: 'ccna-review-topology', domain: 'IP Connectivity', selected: 0, correct: true },
  { questionId: 'ccna-review-config', domain: 'IP Services', selected: 2, correct: false },
  {
    questionId: 'ccna-review-subnet',
    domain: 'Network Fundamentals',
    selected: { network: '192.168.10.64', broadcast: '192.168.10.94', hostCount: '30' },
    correct: false,
  },
]

function renderResults() {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/ccna-200-301/results', state: { answers, questions } }]}>
      <Routes>
        <Route path="/ccna-200-301/results" element={<Results />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Results simulation review', () => {
  afterEach(() => {
    cleanup()
  })

  it('preserves CCNA simulation context and subnet field feedback in review mode', () => {
    renderResults()

    fireEvent.click(screen.getByRole('button', { name: 'Review All Questions' }))

    expect(screen.getByText('show interfaces trunk')).toBeTruthy()
    expect(screen.getByRole('img', { name: 'Missing return route' })).toBeTruthy()
    expect(screen.getByText('Running configuration excerpt')).toBeTruthy()
    expect(screen.getByText('192.168.10.64/27')).toBeTruthy()
    expect(screen.getByText('Correct: 192.168.10.95')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Incorrect (2)' })).toBeTruthy()
  })
})
