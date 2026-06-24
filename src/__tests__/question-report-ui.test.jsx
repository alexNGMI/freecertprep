// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ReportIssueButton from '../components/ReportIssueButton.jsx'
import { KEYS } from '../utils/storage.js'

const { submitQuestionIssueReport } = vi.hoisted(() => ({
  submitQuestionIssueReport: vi.fn(),
}))

vi.mock('../lib/accountSync', () => ({
  submitQuestionIssueReport,
}))

const question = {
  id: 'net-report-1',
  domain: 'Network Troubleshooting',
  objectiveId: '5.3',
  type: 'cli-output',
}

describe('ReportIssueButton', () => {
  beforeEach(() => {
    submitQuestionIssueReport.mockReset()
    submitQuestionIssueReport.mockResolvedValue(false)
  })

  afterEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('opens a local report modal and stores the report', async () => {
    render(<ReportIssueButton certId="comptia-net-plus" question={question} context="review" />)

    fireEvent.click(screen.getByRole('button', { name: /Report issue/i }))
    expect(document.activeElement).toBe(screen.getByLabelText(/Issue type/i))
    expect(screen.getByText(/If you are signed out, this saves only on this device/i)).toBeTruthy()
    fireEvent.change(screen.getByLabelText(/Issue type/i), { target: { value: 'Explanation is unclear' } })
    fireEvent.change(screen.getByLabelText(/Notes/i), { target: { value: 'The command output needs a clearer reason.' } })
    fireEvent.click(screen.getByRole('button', { name: /Save report/i }))

    expect((await screen.findByRole('status')).textContent).toMatch(/Report saved locally/i)
    const reports = JSON.parse(localStorage.getItem(KEYS.issueReports))
    expect(reports).toHaveLength(1)
    expect(reports[0]).toMatchObject({
      certId: 'comptia-net-plus',
      questionId: 'net-report-1',
      objectiveId: '5.3',
      questionType: 'cli-output',
      issueType: 'Explanation is unclear',
      notes: 'The command output needs a clearer reason.',
      context: 'review',
      status: 'local-new',
    })
  })

  it('closes with Escape and restores focus to the report trigger', () => {
    render(<ReportIssueButton certId="comptia-net-plus" question={question} context="review" />)

    const trigger = screen.getByRole('button', { name: /Report issue/i })
    fireEvent.click(trigger)
    fireEvent.keyDown(document, { key: 'Escape' })

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })

  it('prevents duplicate reports while a submission is still pending', async () => {
    let resolveSubmission
    submitQuestionIssueReport.mockReturnValue(new Promise(resolve => {
      resolveSubmission = resolve
    }))
    render(<ReportIssueButton certId="comptia-net-plus" question={question} context="review" />)

    fireEvent.click(screen.getByRole('button', { name: /Report issue/i }))
    fireEvent.click(screen.getByRole('button', { name: /Save report/i }))

    const savingButton = screen.getByRole('button', { name: /Saving/i })
    expect(savingButton.disabled).toBe(true)
    fireEvent.click(savingButton)
    expect(JSON.parse(localStorage.getItem(KEYS.issueReports))).toHaveLength(1)

    resolveSubmission(false)
    expect((await screen.findByRole('status')).textContent).toMatch(/saved locally/i)
  })
})
