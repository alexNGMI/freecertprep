// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../config/contact', () => ({
  supportEmail: 'support@example.com',
  supportMailto: 'mailto:support@example.com?subject=freecertprep%20support%20request',
}))

import Support from '../pages/Support.jsx'

describe('Support page', () => {
  afterEach(cleanup)

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
})
