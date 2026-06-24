// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import LoadingState from '../components/LoadingState.jsx'

describe('LoadingState', () => {
  afterEach(cleanup)

  it('announces useful loading context without exposing the spinner', () => {
    render(<LoadingState label="Loading questions" detail="Preparing this certification workspace." />)

    const status = screen.getByRole('status')
    expect(status.textContent).toContain('Loading questions')
    expect(status.textContent).toContain('Preparing this certification workspace.')
    expect(status.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
  })
})
