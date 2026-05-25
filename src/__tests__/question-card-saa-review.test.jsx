// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard.jsx'

const saaQuestion = {
  id: 'saa-review-polish-001',
  domain: 'Design Secure Architectures',
  type: 'single-choice',
  question: 'A company needs private administrator access to EC2 instances. Which design is best?',
  choices: [
    'Open SSH from the internet',
    'Use AWS Systems Manager Session Manager',
    'Place a bastion host in every subnet',
    'Store SSH keys in application code',
  ],
  correctAnswer: 1,
  explanation: [
    'Why this is right: Session Manager removes inbound SSH and supports IAM-controlled, auditable access.',
    'Why distractors fail: Public SSH and unmanaged keys increase exposure or operational burden.',
    'Architecture takeaway: Favor managed access paths that reduce public attack surface and preserve auditability.',
  ].join(' '),
}

describe('QuestionCard SAA review explanations', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders SAA explanation anchors as separate review sections', () => {
    render(
      <QuestionCard
        question={saaQuestion}
        onAnswer={() => {}}
        answered
        selectedChoice={1}
        reviewMode
      />,
    )

    expect(screen.getByText('Why this is right')).toBeTruthy()
    expect(screen.getByText('Why distractors fail')).toBeTruthy()
    expect(screen.getByText('Architecture takeaway')).toBeTruthy()
    expect(screen.getByText(/Session Manager removes inbound SSH/)).toBeTruthy()
    expect(screen.getByText(/Public SSH and unmanaged keys increase exposure/)).toBeTruthy()
    expect(screen.getByText(/reduce public attack surface/)).toBeTruthy()
  })
})
