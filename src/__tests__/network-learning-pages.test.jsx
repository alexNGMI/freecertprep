// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LearningPlan from '../pages/LearningPlan'

const cert = {
  id: 'comptia-net-plus',
  code: 'N10-009',
  color: '#c8202f',
  objectives: [
    { id: '1.1', domain: 'Networking Concepts', title: 'OSI reference model' },
    { id: '5.1', domain: 'Network Troubleshooting', title: 'Troubleshooting methodology' },
  ],
  questions: [
    { id: 'q1', objectiveId: '1.1' },
    { id: 'q2', objectiveId: '1.1' },
    { id: 'q3', objectiveId: '1.1' },
    { id: 'q4', objectiveId: '5.1' },
  ],
}

vi.mock('../hooks/useCert', () => ({ useCert: () => cert }))
vi.mock('../hooks/useQuestionStats', () => ({
  useQuestionStats: () => ({
    certStats: {
      q1: { attempts: 2, correct: 2, lastSeen: Date.now() },
      q2: { attempts: 1, correct: 1, lastSeen: Date.now() },
      q3: { attempts: 1, correct: 1, lastSeen: Date.now() },
    },
  }),
}))

describe('Network+ learning pages', () => {
  afterEach(cleanup)

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
})
