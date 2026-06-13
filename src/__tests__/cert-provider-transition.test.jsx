// @vitest-environment jsdom

import { act, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CertProvider, useCert } from '../hooks/useCert'

const pendingLoads = vi.hoisted(() => ({}))

vi.mock('../data/certs', () => ({
  getCert: (id) => ({
    id,
    title: id === 'alpha' ? 'Alpha Certification' : 'Beta Certification',
    loadQuestions: () => new Promise((resolve) => {
      pendingLoads[id] = resolve
    }),
  }),
}))

function CertTitle() {
  const cert = useCert()
  return <div>{cert?.title}</div>
}

describe('CertProvider route transitions', () => {
  it('shows loading instead of stale cert content while the next bank loads', async () => {
    const view = render(
      <CertProvider certId="alpha">
        <CertTitle />
      </CertProvider>,
    )

    act(() => pendingLoads.alpha([]))
    await waitFor(() => expect(screen.getByText('Alpha Certification')).toBeTruthy())

    view.rerender(
      <CertProvider certId="beta">
        <CertTitle />
      </CertProvider>,
    )

    expect(screen.queryByText('Alpha Certification')).toBeNull()
    expect(screen.getByText(/Loading questions/)).toBeTruthy()

    act(() => pendingLoads.beta([]))
    await waitFor(() => expect(screen.getByText('Beta Certification')).toBeTruthy())
  })
})
