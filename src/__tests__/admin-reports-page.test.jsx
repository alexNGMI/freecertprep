// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AdminReports from '../pages/AdminReports.jsx'

const { adminApi, auth } = vi.hoisted(() => ({
  adminApi: {
    getAdminAccess: vi.fn(),
    listCorrectionEvents: vi.fn(),
    listIssueReports: vi.fn(),
    reviewIssueReport: vi.fn(),
  },
  auth: {
    onAuthStateChange: vi.fn(),
    signInWithOtp: vi.fn(),
  },
}))

vi.mock('../lib/adminReports', () => ({
  ...adminApi,
  REPORT_CATEGORIES: ['wrong_answer', 'typo'],
  REPORT_STATUSES: ['open', 'reviewing', 'fixed', 'rejected', 'duplicate'],
}))

vi.mock('../lib/supabase', () => ({
  supabase: { auth },
}))

vi.mock('../data/certs', () => ({
  getCert: () => ({
    loadQuestions: vi.fn().mockResolvedValue([{
      id: 'net-1',
      question: 'Which protocol is used?',
      choices: ['HTTP', 'DNS', 'SSH', 'NTP'],
      correctAnswer: 1,
      explanation: 'DNS resolves names.',
    }]),
  }),
}))

function renderPage() {
  return render(
    <MemoryRouter>
      <AdminReports />
    </MemoryRouter>,
  )
}

describe('admin report review page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    })
    auth.signInWithOtp.mockResolvedValue({ error: null })
    adminApi.listIssueReports.mockResolvedValue([])
    adminApi.listCorrectionEvents.mockResolvedValue([])
    adminApi.reviewIssueReport.mockResolvedValue({})
  })

  afterEach(cleanup)

  it('offers administrator sign-in without exposing reports', async () => {
    adminApi.getAdminAccess.mockResolvedValue({ configured: true, signedIn: false, isAdmin: false })

    renderPage()

    expect(await screen.findByRole('heading', { name: 'Administrator sign in' })).toBeTruthy()
    expect(adminApi.listIssueReports).not.toHaveBeenCalled()
  })

  it('blocks a signed-in account that is not an administrator', async () => {
    adminApi.getAdminAccess.mockResolvedValue({ configured: true, signedIn: true, isAdmin: false })

    renderPage()

    expect(await screen.findByRole('heading', { name: 'Administrator access required' })).toBeTruthy()
    expect(adminApi.listIssueReports).not.toHaveBeenCalled()
  })

  it('keeps deployment details out of administrator access errors', async () => {
    adminApi.getAdminAccess.mockRejectedValue(new Error('Apply the database migration before deployment.'))

    renderPage()

    expect(await screen.findByRole('heading', { name: 'Admin setup needs attention' })).toBeTruthy()
    expect(screen.getByText(/administrator access check is temporarily unavailable/i)).toBeTruthy()
    expect(screen.queryByText(/migration|deployment/i)).toBeNull()
  })

  it('shows the protected queue and records an admin decision', async () => {
    adminApi.getAdminAccess.mockResolvedValue({ configured: true, signedIn: true, isAdmin: true })
    adminApi.listIssueReports
      .mockResolvedValueOnce([{
        id: 'report-1',
        reporter_user_id: 'user-1',
        cert_id: 'comptia-net-plus',
        question_id: 'net-1',
        category: 'wrong_answer',
        message: 'Answer seems wrong: Please verify DNS.',
        status: 'open',
        created_at: '2026-06-24T12:00:00Z',
        updated_at: '2026-06-24T12:00:00Z',
      }])
      .mockResolvedValueOnce([])

    renderPage()

    expect(await screen.findByRole('heading', { name: 'Question report review' })).toBeTruthy()
    expect(await screen.findByText('Which protocol is used?')).toBeTruthy()
    fireEvent.change(screen.getByLabelText('Internal note'), { target: { value: 'Verified against the source.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Mark Fixed' }))

    await waitFor(() => expect(adminApi.reviewIssueReport).toHaveBeenCalledWith(
      'report-1',
      'fixed',
      'Verified against the source.',
    ))
    expect(await screen.findByRole('status')).toHaveProperty('textContent', 'Report marked fixed.')
  })
})
