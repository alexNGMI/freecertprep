// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Privacy from '../pages/Privacy.jsx'

describe('Privacy page', () => {
  afterEach(cleanup)

  it('explains local study, optional accounts, reports, export, and deletion', () => {
    render(
      <MemoryRouter>
        <Privacy />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Study without an account. Control your account data.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Anonymous study' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Optional account' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Question reports' })).toBeTruthy()
    expect(screen.getByText(/download a complete account-data export/i)).toBeTruthy()
    expect(screen.getByText(/reporter link is removed/i)).toBeTruthy()
  })
})
