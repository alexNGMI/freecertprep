// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Catalog from '../pages/Catalog.jsx'
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

  it('presents the IT career paths while routing the full catalog to its own page', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Choose a direction. Build confidence.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Build your foundation with A+.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Foundation. Networks. Security. Cloud.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Build and troubleshoot networks.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Protect systems and investigate threats.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Design and automate cloud infrastructure.' })).toBeTruthy()
    expect(screen.getByText('NOC Technician')).toBeTruthy()
    expect(screen.getByText('SOC Analyst')).toBeTruthy()
    expect(screen.getByText('Cloud Support')).toBeTruthy()
    expect(screen.getByText('CCST Networking')).toBeTruthy()
    expect(screen.getByText('CCNA')).toBeTruthy()
    expect(screen.getByText('01 · IT foundation')).toBeTruthy()
    expect(screen.getByText('02 · Networking')).toBeTruthy()
    expect(screen.getByText('03 · Cybersecurity')).toBeTruthy()
    expect(screen.getByText('04 · Cloud')).toBeTruthy()
    expect(screen.getAllByText('Network+')).toHaveLength(1)
    expect(screen.getAllByText('CCST Networking').length).toBeGreaterThanOrEqual(1)
    expect(screen.queryByRole('heading', { name: 'Data center operations' })).toBeNull()
    expect(screen.queryByRole('heading', { name: 'NVIDIA fluency' })).toBeNull()
    expect(screen.getByRole('link', { name: 'Start with A+' }).getAttribute('href')).toBe('/comptia/a-plus')
    expect(screen.getByRole('link', { name: "I'm new to IT" }).getAttribute('href')).toBe('/comptia/a-plus')
    expect(screen.getByRole('link', { name: 'Choose a career path' }).getAttribute('href')).toBe('#career-paths')
    expect(screen.getByText('Brand new to IT? Begin with A+. Already know your goal? Choose a career path.')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Explore Networking' }).getAttribute('href')).toBe('/paths/networking')
    expect(screen.getByRole('link', { name: 'Explore Cybersecurity' }).getAttribute('href')).toBe('/paths/cybersecurity')
    expect(screen.getByRole('link', { name: 'Explore Cloud' }).getAttribute('href')).toBe('/paths/cloud')
    expect(screen.queryByRole('link', { name: /A\+ Core Selector/ })).toBeNull()
    expect(screen.getByRole('link', { name: 'Catalog' }).getAttribute('href')).toBe('/catalog')
    expect(screen.getByRole('link', { name: 'Browse All Certs' }).getAttribute('href')).toBe('/catalog')
    expect(screen.queryByRole('heading', { name: 'Every active certification.' })).toBeNull()
    expect(screen.queryByRole('link', { name: /Looking for something completely different/ })).toBeNull()
  })

  it('separates production certs from coming-soon modules and hides Real Estate', () => {
    render(
      <MemoryRouter>
        <Catalog />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Live certs first.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Available practice' })).toBeTruthy()
    expect(screen.getByText(/Available exams are ready to practice now/i)).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Still being prepared' })).toBeTruthy()
    expect(screen.getAllByRole('link', { name: /Network\+/ })[0].getAttribute('href')).toBe('/comptia-net-plus')
    expect(screen.getAllByRole('link', { name: /Security\+/ })[0].getAttribute('href')).toBe('/comptia-sec-plus')
    expect(screen.getAllByRole('link', { name: /Splunk Core Certified User/ })[0].getAttribute('href')).toBe('/splunk-core-certified-user')
    expect(screen.getAllByRole('link', { name: /AWS Cloud Practitioner/ })[0].getAttribute('href')).toBe('/clf-c02')
    expect(screen.getAllByRole('link', { name: /AWS Solutions Architect - Associate/ })[0].getAttribute('href')).toBe('/aws-saa-c03')
    expect(screen.getAllByRole('link', { name: /HashiCorp Terraform Associate/ })[0].getAttribute('href')).toBe('/terraform-associate')
    expect(screen.getAllByRole('link', { name: /CompTIA A\+ Core 1/ })[0].getAttribute('href')).toBe('/comptia-a-plus-core-1')
    expect(screen.getAllByRole('link', { name: /CompTIA A\+ Core 2/ })[0].getAttribute('href')).toBe('/comptia-a-plus-core-2')
    expect(screen.getAllByRole('link', { name: /Cisco CCST Networking/ })[0].getAttribute('href')).toBe('/ccst-networking')
    expect(screen.getByLabelText('CompTIA Linux+ coming soon')).toBeTruthy()
    expect(screen.getByLabelText('Google Cloud Digital Leader coming soon')).toBeTruthy()
    expect(screen.getByLabelText('Cisco CCNA coming soon')).toBeTruthy()
    expect(screen.getByLabelText('Schneider Data Center Certified Associate coming soon')).toBeTruthy()
    expect(screen.queryByRole('link', { name: /CompTIA Linux\+/ })).toBeNull()
    expect(screen.queryByRole('link', { name: /Cisco CCNA/ })).toBeNull()
    expect(screen.queryByRole('link', { name: /Google Cloud Digital Leader/ })).toBeNull()
    expect(screen.queryByRole('link', { name: /Looking for something completely different/ })).toBeNull()
  })
})
