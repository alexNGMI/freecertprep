// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import ThemeToggle from '../components/ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
    document.documentElement.style.colorScheme = ''
  })

  it('defaults new visitors to night mode', async () => {
    render(<ThemeToggle />)

    expect(screen.getByRole('button', { name: 'Switch to day mode' })).toBeTruthy()
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('night'))
    expect(window.localStorage.getItem('freecertprep-theme')).toBe('night')
  })

  it('respects a saved day-mode preference and can switch back to night', async () => {
    window.localStorage.setItem('freecertprep-theme', 'day')
    render(<ThemeToggle />)

    const toggle = screen.getByRole('button', { name: 'Switch to night mode' })
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('day'))
    fireEvent.click(toggle)

    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('night'))
    expect(window.localStorage.getItem('freecertprep-theme')).toBe('night')
  })
})
