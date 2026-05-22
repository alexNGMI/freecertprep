// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import APlus from '../pages/APlus.jsx'

describe('A+ selection page', () => {
  afterEach(() => {
    cleanup()
  })

  it('keeps Core 1 and Core 2 separate from the catalog grid', () => {
    render(
      <MemoryRouter>
        <APlus />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Pick your A+ core.' })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Core 1[\s\S]*220-1201/ })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Core 2[\s\S]*220-1202/ })).toBeTruthy()
    expect(screen.getByText('270')).toBeTruthy()
    expect(screen.getByText('750')).toBeTruthy()
    expect(screen.getByText('live questions per core')).toBeTruthy()
    expect(screen.getByText('target per core')).toBeTruthy()
    expect(screen.getAllByText('90')).toHaveLength(2)
    expect(screen.queryByText('Choose your next step')).toBeNull()
  })

  it('switches the visible blueprint when a core is selected', () => {
    render(
      <MemoryRouter>
        <APlus />
      </MemoryRouter>,
    )

    expect(screen.getAllByRole('heading', { name: 'Core 1 220-1201' })).toHaveLength(1)
    expect(screen.getByText('Hardware and Network Troubleshooting')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Start Core 1' }).getAttribute('href')).toBe('/comptia-a-plus-core-1')

    fireEvent.click(screen.getByRole('button', { name: /Core 2[\s\S]*220-1202/ }))

    expect(screen.getByRole('heading', { name: 'Core 2 220-1202' })).toBeTruthy()
    expect(screen.getByText('Operational Procedures')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Start Core 2' }).getAttribute('href')).toBe('/comptia-a-plus-core-2')
  })
})
