// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Account from '../pages/Account.jsx'

const { auth, accountSync, accountPrivacy } = vi.hoisted(() => ({
  auth: {
    getSession: vi.fn(),
    onAuthStateChange: vi.fn(),
    signInWithOtp: vi.fn(),
    signOut: vi.fn(),
  },
  accountSync: {
    backupStudyData: vi.fn(),
    getLatestBackupInfo: vi.fn(),
    getSyncInfo: vi.fn(),
    restoreLatestStudyData: vi.fn(),
    summarizeStudyData: vi.fn(),
    syncStudyData: vi.fn(),
  },
  accountPrivacy: {
    deleteAccount: vi.fn(),
    exportAccountData: vi.fn(),
  },
}))

vi.mock('../lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: { auth },
}))

vi.mock('../lib/accountSync', () => accountSync)
vi.mock('../lib/accountPrivacy', () => accountPrivacy)

function renderAccount() {
  return render(
    <MemoryRouter>
      <Account />
    </MemoryRouter>,
  )
}

describe('Account authentication', () => {
  beforeEach(() => {
    auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
    auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    })
    auth.signInWithOtp.mockResolvedValue({ error: null })
    auth.signOut.mockResolvedValue({ error: null })
    accountSync.getLatestBackupInfo.mockResolvedValue(null)
    accountSync.getSyncInfo.mockResolvedValue(null)
    accountSync.summarizeStudyData.mockReturnValue({
      certifications: 0,
      sessions: 0,
      trackedQuestions: 0,
      bookmarks: 0,
    })
    accountSync.backupStudyData.mockResolvedValue('2026-06-23T20:00:00Z')
    accountSync.restoreLatestStudyData.mockResolvedValue('2026-06-23T20:00:00Z')
    accountSync.syncStudyData.mockResolvedValue({
      syncedAt: '2026-06-23T20:00:00Z',
      summary: {
        certifications: 2,
        sessions: 4,
        trackedQuestions: 30,
        bookmarks: 3,
      },
    })
    accountPrivacy.exportAccountData.mockResolvedValue({})
    accountPrivacy.deleteAccount.mockResolvedValue(true)
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('sends a real Supabase magic-link request', async () => {
    renderAccount()

    await screen.findByRole('heading', { name: /Sign in with email/i })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'learner@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /Send magic link/i }))

    await waitFor(() => {
      expect(auth.signInWithOtp).toHaveBeenCalledWith({
        email: 'learner@example.com',
        options: {
          emailRedirectTo: 'http://localhost:3000/account',
          shouldCreateUser: true,
        },
      })
    })
    expect(await screen.findByText(/Check learner@example.com/i)).toBeTruthy()
  })

  it('shows the active user and signs out', async () => {
    auth.getSession.mockResolvedValue({
      data: { session: { user: { email: 'learner@example.com' } } },
      error: null,
    })

    renderAccount()

    expect(await screen.findByText('learner@example.com')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Sign out/i }))

    await waitFor(() => expect(auth.signOut).toHaveBeenCalled())
    expect(await screen.findByText(/You are signed out/i)).toBeTruthy()
  })

  it('shows the latest backup and confirms before restoring local data', async () => {
    auth.getSession.mockResolvedValue({
      data: { session: { user: { email: 'learner@example.com' } } },
      error: null,
    })
    accountSync.getLatestBackupInfo.mockResolvedValue({
      createdAt: '2026-06-23T20:00:00Z',
      summary: {
        certifications: 2,
        sessions: 4,
        trackedQuestions: 30,
        bookmarks: 3,
      },
    })
    accountSync.getSyncInfo.mockResolvedValue({
      lastSyncedAt: '2026-06-23T20:00:00Z',
      summary: {
        certifications: 2,
        sessions: 4,
        trackedQuestions: 30,
        bookmarks: 3,
      },
    })

    renderAccount()

    expect(await screen.findByText('2 certs, 4 sessions, 30 tracked questions, 3 bookmarks')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Restore latest backup' }))

    expect(screen.getByText(/Replace this browser's study data/i)).toBeTruthy()
    expect(accountSync.restoreLatestStudyData).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Restore backup' }))
    await waitFor(() => expect(accountSync.restoreLatestStudyData).toHaveBeenCalled())
  })

  it('merges local and cloud study data when the learner syncs', async () => {
    auth.getSession.mockResolvedValue({
      data: { session: { user: { email: 'learner@example.com' } } },
      error: null,
    })

    renderAccount()

    await screen.findByText('learner@example.com')
    fireEvent.click(screen.getByRole('button', { name: 'Sync now' }))

    await waitFor(() => expect(accountSync.syncStudyData).toHaveBeenCalled())
    expect(await screen.findByText(/Sync complete/i)).toBeTruthy()
    expect(screen.getByText('2 certs, 4 sessions, 30 tracked questions, 3 bookmarks')).toBeTruthy()
  })

  it('exports account data and requires DELETE before permanent deletion', async () => {
    auth.getSession.mockResolvedValue({
      data: { session: { user: { email: 'learner@example.com' } } },
      error: null,
    })

    renderAccount()

    await screen.findByText('learner@example.com')
    fireEvent.click(screen.getByRole('button', { name: 'Download account data' }))
    await waitFor(() => expect(accountPrivacy.exportAccountData).toHaveBeenCalled())

    fireEvent.click(screen.getByRole('button', { name: 'Delete account' }))
    const deleteButton = screen.getByRole('button', { name: 'Delete permanently' })
    expect(deleteButton.disabled).toBe(true)

    fireEvent.change(screen.getByLabelText('Type DELETE to confirm'), { target: { value: 'DELETE' } })
    expect(deleteButton.disabled).toBe(false)
    fireEvent.click(deleteButton)

    await waitFor(() => expect(accountPrivacy.deleteAccount).toHaveBeenCalled())
    expect(await screen.findByText(/Account deleted/i)).toBeTruthy()
  })
})
