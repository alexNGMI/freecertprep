// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../pages/Home.jsx'

describe('homepage career-path layout', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ count: 123 }),
      }),
    ))
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('presents the IT career paths while keeping the full catalog visible', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Choose a direction. Build confidence.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Find the lane that fits next.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Start with A+ if you are brand new' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Networking Career Path' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Cybersecurity with tooling' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Deployable cloud skill' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'NVIDIA fluency' })).toBeTruthy()
    expect(screen.getByRole('link', { name: /View A\+ path/ }).getAttribute('href')).toBe('/comptia/a-plus')
    expect(screen.getAllByRole('link', { name: /Open path/ })[0].getAttribute('href')).toBe('/paths/networking')
    expect(screen.getAllByRole('link', { name: /Open path/ })[1].getAttribute('href')).toBe('/paths/cybersecurity')
    expect(screen.getAllByRole('link', { name: /Open path/ })[2].getAttribute('href')).toBe('/paths/cloud')
    expect(screen.getAllByRole('link', { name: /Open path/ })[3].getAttribute('href')).toBe('/paths/nvidia')
    expect(screen.queryByRole('link', { name: /A\+ Core Selector/ })).toBeNull()
    expect(screen.getByRole('heading', { name: 'Every active certification.' })).toBeTruthy()
    expect(screen.getAllByRole('link', { name: /Network\+/ })[0].getAttribute('href')).toBe('/comptia-net-plus')
    expect(screen.getAllByRole('link', { name: /Security\+/ })[0].getAttribute('href')).toBe('/comptia-sec-plus')
    expect(screen.getAllByRole('link', { name: /AWS Cloud Practitioner/ })[0].getAttribute('href')).toBe('/clf-c02')
    expect(screen.getAllByRole('link', { name: /AWS Solutions Architect - Associate/ })[0].getAttribute('href')).toBe('/aws-saa-c03')
    expect(screen.getAllByRole('link', { name: /HashiCorp Terraform Associate/ })[0].getAttribute('href')).toBe('/terraform-associate')
    expect(screen.getAllByRole('link', { name: /CompTIA A\+ Core 1/ })[0].getAttribute('href')).toBe('/comptia-a-plus-core-1')
    expect(screen.getAllByRole('link', { name: /CompTIA A\+ Core 2/ })[0].getAttribute('href')).toBe('/comptia-a-plus-core-2')
    expect(screen.getByRole('link', { name: /Looking for something completely different/ }).getAttribute('href')).toBe('/real-estate')
  })
})
