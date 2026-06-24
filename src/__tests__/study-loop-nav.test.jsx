// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import StudyLoopNav from '../components/StudyLoopNav.jsx'

const cert = {
  id: 'comptia-net-plus',
  color: '#c8202f',
}

describe('StudyLoopNav', () => {
  afterEach(cleanup)

  it('shows the connected learning sequence and marks the current step', () => {
    render(
      <MemoryRouter>
        <StudyLoopNav cert={cert} current="plan" />
      </MemoryRouter>,
    )

    expect(screen.getByRole('navigation', { name: 'Study workflow' })).toBeTruthy()
    expect(screen.getByText('Study Plan').closest('[aria-current="step"]')).toBeTruthy()
    expect(screen.getByRole('link', { name: /Diagnostic/ }).getAttribute('href')).toBe('/comptia-net-plus/learning/diagnostic')
    expect(screen.getByRole('link', { name: /Practice/ }).getAttribute('href')).toBe('/comptia-net-plus/quiz')
    expect(screen.getByRole('link', { name: /Cases/ }).getAttribute('href')).toBe('/comptia-net-plus/learning/cases')
    expect(screen.getByRole('link', { name: /Simulate/ }).getAttribute('href')).toBe('/comptia-net-plus/exam')
    expect(screen.queryByRole('link', { name: /Debrief/ })).toBeNull()
  })
})
