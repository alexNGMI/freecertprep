// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Account from '../pages/Account.jsx'

const { auth } = vi.hoisted(() => ({
  auth: {
    getSession: vi.fn(),
    onAuthStateChange: vi.fn(),
    signInWithOtp: vi.fn(),
    signOut: vi.fn(),
  },
}))

vi.mock('../lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: { auth },
}))

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
})
