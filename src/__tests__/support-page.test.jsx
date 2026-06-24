// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const contact = vi.hoisted(() => ({
  email: 'support@example.com',
  mailto: 'mailto:support@example.com?subject=freecertprep%20support%20request',
}))

vi.mock('../config/contact', () => ({
  get supportEmail() {
    return contact.email
  },
  get supportMailto() {
    return contact.mailto
  },
}))

import Support from '../pages/Support.jsx'

describe('Support page', () => {
  afterEach(() => {
    cleanup()
    contact.email = 'support@example.com'
    contact.mailto = 'mailto:support@example.com?subject=freecertprep%20support%20request'
  })

  it('routes learners to email, question reporting, docs, and account controls', () => {
    render(
      <MemoryRouter>
        <Support />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Get unstuck without sending sensitive information.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Question looks wrong' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Email support@example.com' }).getAttribute('href')).toBe(
      'mailto:support@example.com?subject=freecertprep%20support%20request',
    )
    expect(screen.getByRole('link', { name: 'Open learner docs' }).getAttribute('href')).toBe('/docs')
    expect(screen.getByRole('link', { name: 'Open account controls' }).getAttribute('href')).toBe('/account')
    expect(screen.getByText(/Never send passwords, magic-link codes, or payment information/i)).toBeTruthy()
  })

  it('honestly explains the fallback when no direct support inbox is available', () => {
    contact.email = ''
    contact.mailto = ''

    render(
      <MemoryRouter>
        <Support />
      </MemoryRouter>,
    )

    expect(screen.getByText('Direct email support is not available right now.')).toBeTruthy()
    expect(screen.getByText(/No support inbox is being monitored/i)).toBeTruthy()
    expect(screen.queryByRole('link', { name: /Email/i })).toBeNull()
  })
})
