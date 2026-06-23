// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ReportIssueButton from '../components/ReportIssueButton.jsx'
import { KEYS } from '../utils/storage.js'

const question = {
  id: 'net-report-1',
  domain: 'Network Troubleshooting',
  objectiveId: '5.3',
  type: 'cli-output',
}

describe('ReportIssueButton', () => {
  afterEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('opens a local report modal and stores the report', async () => {
    render(<ReportIssueButton certId="comptia-net-plus" question={question} context="review" />)

    fireEvent.click(screen.getByRole('button', { name: /Report issue/i }))
    fireEvent.change(screen.getByLabelText(/Issue type/i), { target: { value: 'Explanation is unclear' } })
    fireEvent.change(screen.getByLabelText(/Notes/i), { target: { value: 'The command output needs a clearer reason.' } })
    fireEvent.click(screen.getByRole('button', { name: /Save report/i }))

    expect(await screen.findByText(/Report saved locally/i)).toBeTruthy()
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
})
