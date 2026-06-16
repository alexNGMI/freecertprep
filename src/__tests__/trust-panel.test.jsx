// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import TrustPanel from '../components/TrustPanel'

const cert = {
  id: 'example-cert',
  code: 'EX-100',
  title: 'Example Certification',
  source: {
    officialUrl: 'https://example.com/official',
    sourceLabel: 'Official exam guide',
    checkedAt: '2026-06-08',
    examFormat: 'Selected-response practice format.',
    scoreModel: 'Readiness target only.',
    readinessGrade: 'B+',
    editorialStatus: 'Current blueprint verified',
  },
}

describe('TrustPanel', () => {
  afterEach(cleanup)

  it('links learners to the official source without an external report link', () => {
    render(<TrustPanel cert={cert} />)

    expect(screen.getByRole('heading', { name: 'Source and simulation status' })).toBeTruthy()
    expect(screen.getByText('Simulation readiness B+')).toBeTruthy()
    expect(screen.getByRole('link', { name: /Official source/ }).getAttribute('href')).toBe(cert.source.officialUrl)
    expect(screen.queryByRole('link', { name: /Report an issue/ })).toBeNull()
  })
})
