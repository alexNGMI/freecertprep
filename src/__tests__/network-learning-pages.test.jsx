// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Diagnostic from '../pages/Diagnostic'
import LearningPlan from '../pages/LearningPlan'

const addQuizResult = vi.fn()
const recordSession = vi.fn()
let mockCertStats = {
  q1: { attempts: 2, correct: 2, lastSeen: Date.now() },
  q2: { attempts: 1, correct: 1, lastSeen: Date.now() },
  q3: { attempts: 1, correct: 1, lastSeen: Date.now() },
}

const networkCert = {
  id: 'comptia-net-plus',
  code: 'N10-009',
  color: '#c8202f',
  objectives: [
    { id: '1.1', domain: 'Networking Concepts', title: 'OSI reference model' },
    { id: '5.1', domain: 'Network Troubleshooting', title: 'Troubleshooting methodology' },
  ],
  questions: [
    {
      id: 'q1',
      domain: 'Networking Concepts',
      objectiveId: '1.1',
      question: 'Which model is used to organize network functions into layers?',
      choices: ['OSI reference model', 'RAID model', 'CIA triad', 'Zero trust model'],
      correctAnswer: 0,
      explanation: 'The OSI reference model organizes network functions into layers.',
    },
    {
      id: 'q2',
      domain: 'Networking Concepts',
      objectiveId: '1.1',
      question: 'Which layer handles physical signaling?',
      choices: ['Application', 'Transport', 'Physical', 'Session'],
      correctAnswer: 2,
      explanation: 'The Physical layer handles signaling.',
    },
    {
      id: 'q3',
      domain: 'Networking Concepts',
      objectiveId: '1.1',
      question: 'Which address is used at layer 2?',
      choices: ['IP address', 'MAC address', 'FQDN', 'Port number'],
      correctAnswer: 1,
      explanation: 'MAC addresses are used at layer 2.',
    },
    {
      id: 'q4',
      domain: 'Network Troubleshooting',
      objectiveId: '5.1',
      question: 'What is the first step in a structured troubleshooting process?',
      choices: ['Escalate', 'Identify the problem', 'Replace hardware', 'Document findings'],
      correctAnswer: 1,
      explanation: 'Troubleshooting starts by identifying the problem.',
    },
  ],
}

const securityCert = {
  id: 'comptia-sec-plus',
  code: 'SY0-701',
  color: '#ef4444',
  objectives: [
    { id: '1.1', domain: 'General Security Concepts', title: 'Compare categories and types of security controls' },
    { id: '4.8', domain: 'Security Operations', title: 'Apply incident response activities' },
  ],
  questions: [
    {
      id: 's1',
      domain: 'General Security Concepts',
      objectiveId: '1.1',
      question: 'Which control category uses a documented acceptable use policy?',
      choices: ['Physical', 'Managerial', 'Technical', 'Compensating'],
      correctAnswer: 1,
      explanation: 'A policy is a managerial control.',
    },
    {
      id: 's2',
      domain: 'General Security Concepts',
      objectiveId: '1.1',
      question: 'Which control type restores operations after an event?',
      choices: ['Detective', 'Corrective', 'Deterrent', 'Directive'],
      correctAnswer: 1,
      explanation: 'Corrective controls restore normal operations.',
    },
    {
      id: 's3',
      domain: 'Security Operations',
      objectiveId: '4.8',
      practicalCategory: 'incident-correlation',
      question: 'An analyst correlates EDR and firewall alerts during an investigation. What is the BEST next action?',
      choices: ['Erase the host', 'Contain the host', 'Disable backups', 'Ignore the alert'],
      correctAnswer: 1,
      explanation: 'Containment limits spread while evidence is preserved.',
    },
    {
      id: 's4',
      domain: 'Security Operations',
      objectiveId: '4.8',
      practicalCategory: 'log-triage',
      question: 'A log shows repeated failed sign-ins followed by one success from a new country. What should be investigated first?',
      choices: ['Account compromise', 'Patch failure', 'Storage capacity', 'Printer outage'],
      correctAnswer: 0,
      explanation: 'The pattern suggests credential attack and possible compromise.',
    },
  ],
}

const cloudPractitionerCert = {
  id: 'clf-c02',
  code: 'CLF-C02',
  color: '#f1be32',
  domains: [
    { name: 'Cloud Concepts', weight: 24 },
    { name: 'Security and Compliance', weight: 30 },
    { name: 'Cloud Technology and Services', weight: 34 },
    { name: 'Billing, Pricing and Support', weight: 12 },
  ],
  questions: [
    {
      id: 'c1',
      domain: 'Cloud Concepts',
      question: 'A company wants to avoid buying servers before it knows demand. Which cloud value applies?',
      choices: ['Variable expense', 'Reserved hardware', 'Manual patching', 'Single-AZ design'],
      correctAnswer: 0,
      explanation: 'Cloud lets customers trade capital expense for variable expense.',
    },
    {
      id: 'c2',
      domain: 'Security and Compliance',
      question: 'A team needs to know who patches the physical facilities. Who is responsible?',
      choices: ['The customer', 'AWS', 'The auditor', 'The developer'],
      correctAnswer: 1,
      explanation: 'AWS is responsible for security of the cloud, including facilities.',
    },
    {
      id: 'c3',
      domain: 'Cloud Technology and Services',
      question: 'A business needs object storage for static assets. Which AWS service fits?',
      choices: ['Amazon S3', 'Amazon RDS', 'AWS IAM', 'AWS Budgets'],
      correctAnswer: 0,
      explanation: 'Amazon S3 is AWS object storage.',
    },
    {
      id: 'c4',
      domain: 'Billing, Pricing and Support',
      question: 'A customer wants alerts before monthly spend exceeds a threshold. Which tool helps?',
      choices: ['AWS Budgets', 'Amazon VPC', 'Amazon EC2', 'AWS Shield'],
      correctAnswer: 0,
      explanation: 'AWS Budgets can alert on cost and usage thresholds.',
    },
  ],
}

let mockCert = networkCert

vi.mock('../hooks/useCert', () => ({ useCert: () => mockCert }))
vi.mock('../hooks/useProgress', () => ({
  useProgress: () => ({ addQuizResult }),
}))
vi.mock('../hooks/useQuestionStats', () => ({
  useQuestionStats: () => ({
    certStats: mockCertStats,
    recordSession,
  }),
}))

describe('Network+ learning pages', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
    mockCertStats = {
      q1: { attempts: 2, correct: 2, lastSeen: Date.now() },
      q2: { attempts: 1, correct: 1, lastSeen: Date.now() },
      q3: { attempts: 1, correct: 1, lastSeen: Date.now() },
    }
    mockCert = networkCert
  })

  it('shows a simple diagnostic-first state before any mastery evidence exists', () => {
    mockCertStats = {}

    render(
      <MemoryRouter>
        <LearningPlan />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Get one honest baseline.' })).toBeTruthy()
    expect(screen.getByRole('navigation', { name: 'Study workflow' })).toBeTruthy()
    expect(screen.getAllByRole('link', { name: 'Start diagnostic' })).toHaveLength(1)
    expect(screen.getByText('The study plan is intentionally quiet until you have evidence. Take the diagnostic cold, skip what you do not know, then this page turns into a ranked repair plan instead of a list of every possible topic.')).toBeTruthy()
    expect(screen.queryByText('OSI reference model')).toBeNull()
  })

  it('renders mastery states and an evidence-driven study plan', () => {
    render(
      <MemoryRouter>
        <LearningPlan />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Turn practice into a study plan.' })).toBeTruthy()
    expect(screen.getAllByText('Study Plan').some(node => node.closest('[aria-current="step"]'))).toBe(true)
    expect(screen.getByText('OSI reference model')).toBeTruthy()
    expect(screen.getAllByText('Troubleshooting methodology').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Strong').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Not measured').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Retake diagnostic' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Your next work, in order' })).toBeTruthy()
    expect(screen.getAllByText('Evidence strength').length).toBeGreaterThan(0)
  })

  it('does not record skipped diagnostic questions as mastery attempts', () => {
    render(
      <MemoryRouter>
        <Diagnostic />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Start diagnostic' }))
    fireEvent.click(screen.getAllByRole('button').find(button => button.className.includes('w-full')))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Submit diagnostic' }))

    expect(recordSession).toHaveBeenCalledTimes(1)
    expect(addQuizResult).toHaveBeenCalledTimes(1)
    expect(recordSession.mock.calls[0][0]).toHaveLength(1)
    expect(addQuizResult.mock.calls[0][0].answers).toHaveLength(1)
    expect(recordSession.mock.calls[0][0][0].questionId).toMatch(/^q[1-4]$/)
    expect(screen.getByText('1/4')).toBeTruthy()
    expect(screen.getByText('Best next move')).toBeTruthy()
    expect(screen.getByRole('link', { name: /Practice this target/ })).toBeTruthy()
  })

  it('warns that diagnostic answers are not saved before submission', () => {
    render(
      <MemoryRouter>
        <Diagnostic />
      </MemoryRouter>,
    )

    expect(screen.getByText('About 35 min')).toBeTruthy()
    expect(screen.getByText(/Diagnostic answers are not saved until you submit/i)).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Study Plan' })).toBeTruthy()
  })

  it('gives Security+ the same evidence-driven next action flow', () => {
    mockCert = securityCert
    mockCertStats = {
      s1: { attempts: 1, correct: 0, lastSeen: Date.now() },
      s3: { attempts: 1, correct: 0, lastSeen: Date.now() },
    }

    render(
      <MemoryRouter>
        <LearningPlan />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Turn security practice into a repair plan.' })).toBeTruthy()
    expect(screen.getByText('Best next block')).toBeTruthy()
    expect(screen.getAllByText('Compare categories and types of security controls').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Lowest evidence first: repair misses before widening scope.').length).toBeGreaterThan(0)
  })

  it('gives Cloud Practitioner the same domain-backed next action flow', () => {
    mockCert = cloudPractitionerCert
    mockCertStats = {
      c1: { attempts: 1, correct: 0, lastSeen: Date.now() },
      c3: { attempts: 1, correct: 1, lastSeen: Date.now() },
    }

    render(
      <MemoryRouter>
        <LearningPlan />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Turn AWS fundamentals into a cloud plan.' })).toBeTruthy()
    expect(screen.getByText('Best next block')).toBeTruthy()
    expect(screen.getAllByText('Cloud Concepts').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Lowest evidence first: repair misses before widening scope.').length).toBeGreaterThan(0)
  })
})
