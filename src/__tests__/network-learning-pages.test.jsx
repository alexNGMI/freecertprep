// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Diagnostic from '../pages/Diagnostic'
import LearningPlan from '../pages/LearningPlan'

const addQuizResult = vi.fn()
const recordSession = vi.fn()

const cert = {
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

vi.mock('../hooks/useCert', () => ({ useCert: () => cert }))
vi.mock('../hooks/useProgress', () => ({
  useProgress: () => ({ addQuizResult }),
}))
vi.mock('../hooks/useQuestionStats', () => ({
  useQuestionStats: () => ({
    certStats: {
      q1: { attempts: 2, correct: 2, lastSeen: Date.now() },
      q2: { attempts: 1, correct: 1, lastSeen: Date.now() },
      q3: { attempts: 1, correct: 1, lastSeen: Date.now() },
    },
    recordSession,
  }),
}))

describe('Network+ learning pages', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders mastery states and an evidence-driven study plan', () => {
    render(
      <MemoryRouter>
        <LearningPlan />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Turn practice into a study plan.' })).toBeTruthy()
    expect(screen.getByText('OSI reference model')).toBeTruthy()
    expect(screen.getAllByText('Troubleshooting methodology').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Strong').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Not measured').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Retake diagnostic' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Your next work, in order' })).toBeTruthy()
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
  })
})
