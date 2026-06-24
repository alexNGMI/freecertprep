// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import StorageWriteWarning from '../components/StorageWriteWarning'
import { writeJSON } from '../utils/storage'

describe('StorageWriteWarning', () => {
  afterEach(() => {
    cleanup()
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('shows an actionable alert when browser storage rejects a write', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota')
    })

    render(
      <MemoryRouter>
        <StorageWriteWarning />
      </MemoryRouter>,
    )
    act(() => {
      writeJSON('test-key', { value: true })
    })

    expect(screen.getByRole('alert').textContent).toContain('could not save')
    expect(screen.getByRole('link', { name: /account and export tools/i }).getAttribute('href')).toBe('/account')

    fireEvent.click(screen.getByRole('button', { name: /Dismiss storage warning/i }))
    expect(screen.queryByRole('alert')).toBeNull()
  })
})
