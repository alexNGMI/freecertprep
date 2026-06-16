// @vitest-environment jsdom

import { afterEach, describe, it, expect, vi } from 'vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CertLayout from '../components/CertLayout.jsx'
import { QuestionNavigator, StudyWorkspace } from '../components/StudyWorkspace.jsx'

vi.mock('../hooks/useCert', () => ({
  useCert: () => ({
    id: 'clf-c02',
    code: 'CLF-C02',
    title: 'AWS Cloud Practitioner',
    color: '#f1be32',
    questionCount: 731,
    examQuestions: 65,
  }),
}))

describe('cert study UI', () => {
  afterEach(() => {
    cleanup()
  })

  it('gives icon-only navigation links stable accessible names', () => {
    render(
      <MemoryRouter initialEntries={['/clf-c02']}>
        <Routes>
          <Route path="/clf-c02/*" element={<CertLayout />}>
            <Route index element={<div>Dashboard content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Dashboard' }).getAttribute('href')).toBe('/clf-c02')
    expect(screen.getByRole('link', { name: 'Study Plan' }).getAttribute('href')).toBe('/clf-c02/learning')
    expect(screen.getByRole('link', { name: 'Quiz' }).getAttribute('href')).toBe('/clf-c02/quiz')
    expect(screen.getByRole('link', { name: 'Timed Drill' }).getAttribute('href')).toBe('/clf-c02/drill')
    expect(screen.getByRole('link', { name: 'Exam Simulator' }).getAttribute('href')).toBe('/clf-c02/exam')
  })

  it('renders workspace progress, timer, and session counts', () => {
    const { container } = render(
      <StudyWorkspace
        cert={{ color: '#f1be32' }}
        title="Practice Quiz"
        subtitle="Cloud Concepts"
        modeLabel="Smart Practice"
        currentIndex={2}
        total={10}
        answeredCount={4}
        timer="09:31"
        timerColor="#f1be32"
      >
        <div>Question body</div>
      </StudyWorkspace>,
    )

    expect(screen.getByRole('heading', { name: 'Practice Quiz' })).toBeTruthy()
    expect(container.textContent).toContain('Smart Practice')
    expect(container.textContent).toContain('Cloud Concepts')
    expect(container.textContent).toContain('09:31')
    expect(container.textContent).toContain('3/10')
    expect(container.textContent).toContain('4 answered')
    expect(container.textContent).toContain('6 remaining')
    expect(container.querySelector('[style*="width: 30%"]')).toBeTruthy()
    expect(container.querySelector('[style*="width: 40%"]')).toBeTruthy()
  })

  it('marks answered questions in the navigator label and routes clicks', () => {
    const onGoToQuestion = vi.fn()

    render(
      <QuestionNavigator
        items={['q1', 'q2', 'q3']}
        currentIndex={1}
        selectedAnswers={{ 1: 'B' }}
        onGoToQuestion={onGoToQuestion}
        accentColor="#f1be32"
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Go to question 2 answered' }))

    expect(onGoToQuestion).toHaveBeenCalledWith(1)
    expect(screen.getByRole('button', { name: 'Go to question 1' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Go to question 3' })).toBeTruthy()
  })

  it('does not mark subnetting questions answered until every field has a value', () => {
    render(
      <QuestionNavigator
        items={[
          {
            id: 'subnet-1',
            type: 'subnetting-drill',
            asks: ['network', 'broadcast', 'hostCount'],
          },
          {
            id: 'subnet-2',
            type: 'subnetting-drill',
            asks: ['network', 'broadcast', 'hostCount'],
          },
        ]}
        currentIndex={0}
        selectedAnswers={{
          0: { network: '192.168.10.64' },
          1: { network: '192.168.10.64', broadcast: '192.168.10.95', hostCount: '30' },
        }}
        onGoToQuestion={() => {}}
        accentColor="#f1be32"
      />,
    )

    expect(screen.getByRole('button', { name: 'Go to question 1' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Go to question 2 answered' })).toBeTruthy()
  })
})
