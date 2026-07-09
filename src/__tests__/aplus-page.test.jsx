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
    const { container } = render(
      <MemoryRouter>
        <APlus />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Start here if IT feels new.' })).toBeTruthy()
    expect(screen.getByText(/CompTIA A\+ certification is the industry standard to start your IT career/i)).toBeTruthy()
    expect(screen.getByText(/which you can take in any order/i)).toBeTruthy()
    expect(container.querySelector('img[src="/comptia-a-plus-certification.png"]')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Start Core 1' }).getAttribute('href')).toBe('/comptia-a-plus-core-1')
    expect(screen.getByRole('link', { name: 'Compare both cores' }).getAttribute('href')).toBe('#choose-core')
    expect(screen.getByText('Most beginners should choose Core 1.')).toBeTruthy()
    expect(screen.queryByText('Simple path')).toBeNull()
    expect(screen.queryByText('Practice exams')).toBeNull()
    expect(screen.getByText('Start here')).toBeTruthy()
    expect(screen.getByRole('button', { name: /Core 1[\s\S]*220-1201/ })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Core 2[\s\S]*220-1202/ })).toBeTruthy()
    expect(screen.getByText('Fix a slow laptop')).toBeTruthy()
    expect(screen.getByText('Use Windows tools')).toBeTruthy()
    expect(screen.getByText('Available now')).toBeTruthy()
    expect(screen.getByText(/do not start by memorizing percentages/i)).toBeTruthy()
    expect(screen.getByText(/Each question is tied to an exam topic/i)).toBeTruthy()
    expect(screen.queryByRole('link', { name: 'Exam Simulator' })).toBeNull()
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
    expect(screen.getByRole('link', { name: 'Open Core 1 practice' }).getAttribute('href')).toBe('/comptia-a-plus-core-1')

    fireEvent.click(screen.getByRole('button', { name: /Core 2[\s\S]*220-1202/ }))

    expect(screen.getByRole('heading', { name: 'Core 2 220-1202' })).toBeTruthy()
    expect(screen.getByText('Operational Procedures')).toBeTruthy()
    expect(screen.getByText('Available now')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Open Core 2 practice' }).getAttribute('href')).toBe('/comptia-a-plus-core-2')
  })
})
