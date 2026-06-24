// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'

const { auth, rpc } = vi.hoisted(() => ({
  auth: { getSession: vi.fn() },
  rpc: vi.fn(),
}))

vi.mock('../lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: { auth, rpc },
}))

import { getAdminAccess, reviewIssueReport } from '../lib/adminReports'

describe('admin report service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('checks the signed-in user against the database admin function', async () => {
    auth.getSession.mockResolvedValue({
      data: { session: { user: { id: 'admin-1', email: 'admin@example.com' } } },
      error: null,
    })
    rpc.mockResolvedValue({ data: true, error: null })

    await expect(getAdminAccess()).resolves.toMatchObject({
      configured: true,
      signedIn: true,
      isAdmin: true,
      user: { id: 'admin-1' },
    })
    expect(rpc).toHaveBeenCalledWith('is_current_user_admin')
  })

  it('records a review through the transactional database function', async () => {
    rpc.mockResolvedValue({ data: { id: 'report-1', status: 'fixed' }, error: null })

    await expect(reviewIssueReport('report-1', 'fixed', 'Corrected the answer key.')).resolves.toEqual({
      id: 'report-1',
      status: 'fixed',
    })
    expect(rpc).toHaveBeenCalledWith('review_question_issue_report', {
      report_id: 'report-1',
      next_status: 'fixed',
      editor_note: 'Corrected the answer key.',
    })
  })

  it('rejects unsupported status changes before calling Supabase', async () => {
    await expect(reviewIssueReport('report-1', 'open')).rejects.toThrow('Choose a valid review status.')
    expect(rpc).not.toHaveBeenCalled()
  })
})
