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

    expect(screen.getByRole('heading', { name: 'Lets talk about Privacy' })).toBeTruthy()
    expect(screen.getByText(/When you study anonymously/i)).toBeTruthy()
    expect(screen.getByText(/If you create an account/i)).toBeTruthy()
    expect(screen.getByText(/Signed-in question reports store/i)).toBeTruthy()
    expect(screen.getByText(/download a complete account-data export/i)).toBeTruthy()
    expect(screen.getByText(/reporter link is removed/i)).toBeTruthy()
    expect(screen.getByText(/does not sell personal information/i)).toBeTruthy()
  })
})
