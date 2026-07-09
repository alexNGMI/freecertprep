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
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Choose a direction. Build confidence.' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Find your next step.' }).getAttribute('href')).toBe('#paths')
    expect(screen.getByRole('heading', { name: 'Pick a path.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Networking' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Cybersecurity' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Cloud' })).toBeTruthy()
    expect(screen.getByText('Connect, route, troubleshoot')).toBeTruthy()
    expect(screen.getByText('Detect, protect, respond')).toBeTruthy()
    expect(screen.getByText('Build, scale, automate')).toBeTruthy()
    expect(screen.getByText('Choose Network+ or Cisco-first CCST, then grow toward CCNA.')).toBeTruthy()
    expect(screen.getByText('Build the security baseline, then practice SOC investigation with Splunk.')).toBeTruthy()
    expect(screen.getByText('Start with AWS fundamentals, design resilient systems, then deploy with Terraform.')).toBeTruthy()
    expect(container.querySelector('img[src="/hero-network-engineer.jpg"]')).toBeTruthy()
    expect(container.querySelector('img[src="/home-a-plus.jpg"]')).toBeNull()
    expect(container.querySelector('img[src="/home-networking.jpg"]')).toBeTruthy()
    expect(container.querySelector('img[src="/home-cybersecurity.jpg"]')).toBeTruthy()
    expect(container.querySelector('img[src="/home-cloud.jpg"]')).toBeTruthy()
    expect(screen.queryByRole('heading', { name: 'Data center operations' })).toBeNull()
    expect(screen.queryByRole('heading', { name: 'NVIDIA fluency' })).toBeNull()
    expect(screen.queryByRole('link', { name: 'Career Paths' })).toBeNull()
    expect(screen.getByRole('link', { name: /Brand new to IT\? Start with A\+ before choosing a path\./ }).getAttribute('href')).toBe('/comptia/a-plus')
    expect(screen.getByRole('link', { name: /Networking/ }).getAttribute('href')).toBe('/paths/networking')
    expect(screen.getByRole('link', { name: /Cybersecurity/ }).getAttribute('href')).toBe('/paths/cybersecurity')
    expect(screen.getByRole('link', { name: /Cloud/ }).getAttribute('href')).toBe('/paths/cloud')
    expect(screen.queryByRole('link', { name: /A\+ Core Selector/ })).toBeNull()
    expect(screen.getByRole('link', { name: 'Catalog' }).getAttribute('href')).toBe('/catalog')
    expect(screen.getByRole('link', { name: 'Full Catalog' }).getAttribute('href')).toBe('/catalog')
    expect(screen.queryByRole('link', { name: 'Start with A+' })).toBeNull()
    expect(screen.queryByRole('link', { name: 'Browse All Certs' })).toBeNull()
    expect(screen.queryByRole('link', { name: 'Browse Catalog' })).toBeNull()
    expect(screen.getByRole('link', { name: 'Account' }).getAttribute('href')).toBe('/account')
    expect(screen.queryByRole('heading', { name: 'Go deeper.' })).toBeNull()
    expect(screen.queryByRole('link', { name: 'Docs' })).toBeNull()
    expect(screen.queryByRole('link', { name: 'All exams' })).toBeNull()
    expect(screen.queryByRole('link', { name: 'Sync progress' })).toBeNull()
    expect(screen.queryByText('NOC Technician')).toBeNull()
    expect(screen.queryByText('SOC Analyst')).toBeNull()
    expect(screen.queryByText('New to IT? Start with A+. Know your goal? Pick a path.')).toBeNull()
    expect(screen.queryByRole('heading', { name: 'Build your foundation with A+.' })).toBeNull()
    expect(screen.queryByRole('heading', { name: 'Foundation. Networks. Security. Cloud.' })).toBeNull()
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
    const aPlusCore1Link = screen.getAllByRole('link', { name: /CompTIA A\+ Core 1/ })[0]
    const networkPlusLink = screen.getAllByRole('link', { name: /Network\+/ })[0]
    const cloudPractitionerLink = screen.getAllByRole('link', { name: /AWS Cloud Practitioner/ })[0]
    const terraformLink = screen.getAllByRole('link', { name: /HashiCorp Terraform Associate/ })[0]
    expect(aPlusCore1Link.compareDocumentPosition(networkPlusLink) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(networkPlusLink.compareDocumentPosition(cloudPractitionerLink) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(cloudPractitionerLink.compareDocumentPosition(terraformLink) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.getAllByRole('link', { name: /Network\+/ })[0].getAttribute('href')).toBe('/comptia-net-plus')
    expect(screen.getAllByRole('link', { name: /Security\+/ })[0].getAttribute('href')).toBe('/comptia-sec-plus')
    expect(screen.getAllByRole('link', { name: /Splunk Core Certified User/ })[0].getAttribute('href')).toBe('/splunk-core-certified-user')
    expect(screen.getAllByRole('link', { name: /AWS Cloud Practitioner/ })[0].getAttribute('href')).toBe('/clf-c02')
    expect(screen.getAllByRole('link', { name: /AWS Solutions Architect - Associate/ })[0].getAttribute('href')).toBe('/aws-saa-c03')
    expect(screen.getAllByRole('link', { name: /HashiCorp Terraform Associate/ })[0].getAttribute('href')).toBe('/terraform-associate')
    expect(screen.getAllByRole('link', { name: /CompTIA A\+ Core 1/ })[0].getAttribute('href')).toBe('/comptia-a-plus-core-1')
    expect(screen.getAllByRole('link', { name: /CompTIA A\+ Core 2/ })[0].getAttribute('href')).toBe('/comptia-a-plus-core-2')
    expect(screen.getAllByRole('link', { name: /Cisco CCST Networking/ })[0].getAttribute('href')).toBe('/ccst-networking')
    expect(screen.getByLabelText('Google Cloud Digital Leader coming soon')).toBeTruthy()
    expect(screen.getByLabelText('Cisco CCNA coming soon')).toBeTruthy()
    expect(screen.getByLabelText('Schneider Data Center Certified Associate coming soon')).toBeTruthy()
    expect(screen.queryByLabelText('CompTIA Linux+ coming soon')).toBeNull()
    expect(screen.queryByLabelText('CompTIA Server+ coming soon')).toBeNull()
    expect(screen.queryByRole('link', { name: /CompTIA Linux\+/ })).toBeNull()
    expect(screen.queryByRole('link', { name: /CompTIA Server\+/ })).toBeNull()
    expect(screen.queryByRole('link', { name: /Cisco CCNA/ })).toBeNull()
    expect(screen.queryByRole('link', { name: /Google Cloud Digital Leader/ })).toBeNull()
    expect(screen.queryByRole('link', { name: /Looking for something completely different/ })).toBeNull()
  })
})
