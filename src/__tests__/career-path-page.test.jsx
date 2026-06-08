// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CareerPath from '../pages/CareerPath.jsx'

function renderPath(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/paths/:pathId" element={<CareerPath />} />
        <Route path="/" element={<div>Home Redirect</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('career path pages', () => {
  afterEach(() => {
    cleanup()
  })

  it('guides cloud learners through AWS foundation, SAA, and Terraform', () => {
    const { container } = renderPath('/paths/cloud')

    expect(screen.getByRole('heading', { name: 'From cloud concepts to deployable skill.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Start with AWS foundation' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Then move into architecture' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Then add infrastructure as code' })).toBeTruthy()
    expect(screen.getByText('AWS is the default role-focused lane.')).toBeTruthy()
    expect(screen.getByText('SAA comes before Terraform so architecture tradeoffs have context.')).toBeTruthy()
    expect(screen.getByText('Step 03 / Automation Layer')).toBeTruthy()
    expect(screen.getByRole('link', { name: /AWS Cloud Practitioner/ }).getAttribute('href')).toBe('/clf-c02')
    expect(screen.getByRole('link', { name: /HashiCorp Terraform Associate/ }).getAttribute('href')).toBe('/terraform-associate')
    expect(screen.getByRole('link', { name: /AWS Solutions Architect - Associate/ }).getAttribute('href')).toBe('/aws-saa-c03')
    const pageText = container.textContent
    expect(pageText.indexOf('AWS Cloud Practitioner')).toBeLessThan(pageText.indexOf('AWS Solutions Architect - Associate'))
    expect(pageText.indexOf('AWS Solutions Architect - Associate')).toBeLessThan(pageText.indexOf('HashiCorp Terraform Associate'))
    expect(screen.queryByText('Azure Solutions Architect Expert')).toBeNull()
    expect(screen.queryByText('Google Professional Cloud Architect')).toBeNull()
  })

  it('keeps Network+ and CCNA live while holding CCST as coming soon', () => {
    renderPath('/paths/networking')

    expect(screen.getByRole('heading', { name: 'Networking Career Path' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Choose your level-one foundation' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Then move toward CCNA' })).toBeTruthy()
    expect(screen.getByText('Network+ and CCST both work as level-one networking foundations.')).toBeTruthy()
    expect(screen.getByText('CCNA is the career-defining milestone.')).toBeTruthy()
    expect(screen.getByText('Each step builds toward real network troubleshooting and operations skill.')).toBeTruthy()
    expect(screen.getByText('Step 01 / Option A / Vendor-neutral foundation')).toBeTruthy()
    expect(screen.getByText('Step 01 / Option B / Cisco foundation')).toBeTruthy()
    expect(screen.getByText('Step 02 / Advanced networking')).toBeTruthy()
    expect(screen.getByRole('link', { name: /CompTIA Network\+/ }).getAttribute('href')).toBe('/comptia-net-plus')
    expect(screen.getByText('Cisco CCST Networking')).toBeTruthy()
    expect(screen.queryByRole('link', { name: /Cisco CCST Networking/ })).toBeNull()
    expect(screen.getByText('Coming soon')).toBeTruthy()
    expect(screen.getByRole('link', { name: /Cisco CCNA/ }).getAttribute('href')).toBe('/ccna-200-301')
  })

  it('keeps the hidden Data Center route intact while pausing Server+ and DCCA', () => {
    renderPath('/paths/data-center-technician')

    expect(screen.getByRole('heading', { name: 'Build toward data center operations.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Start with server operations' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Then add data center physical infrastructure' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Then move toward the network layer' })).toBeTruthy()
    expect(screen.getByText('Server+ gives the IT hardware and systems support baseline.')).toBeTruthy()
    expect(screen.getByText('Schneider DCCA adds power, cooling, racks, cabling, physical security, and facility awareness.')).toBeTruthy()
    expect(screen.getByText('Step 01 / Level 1')).toBeTruthy()
    expect(screen.getByText('Step 02 / Level 2')).toBeTruthy()
    expect(screen.getByText('CCNA adds the network layer technicians troubleshoot around every day.')).toBeTruthy()
    expect(screen.getByText('Step 03 / Level 3')).toBeTruthy()
    expect(screen.queryByRole('link', { name: /CompTIA Server\+/ })).toBeNull()
    expect(screen.queryByRole('link', { name: /Schneider Data Center Certified Associate/ })).toBeNull()
    expect(screen.getByRole('link', { name: /Cisco CCNA/ }).getAttribute('href')).toBe('/ccna-200-301')
  })

  it('frames Cybersecurity as Network+ to Security+ to live Splunk practice', () => {
    renderPath('/paths/cybersecurity')

    expect(screen.getByRole('heading', { name: 'Cybersecurity with a practical tool layer.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Start with network fluency' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Then build the security baseline' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Then add SOC tooling' })).toBeTruthy()
    expect(screen.getByText('Splunk Core Certified User adds the practical SIEM search and alerting layer.')).toBeTruthy()
    expect(screen.getByText('Step 01 / Level 1')).toBeTruthy()
    expect(screen.getByText('Step 02 / Level 2')).toBeTruthy()
    expect(screen.getByText('Step 03 / Level 3')).toBeTruthy()
    expect(screen.getByRole('link', { name: /CompTIA Network\+/ }).getAttribute('href')).toBe('/comptia-net-plus')
    expect(screen.getByRole('link', { name: /CompTIA Security\+/ }).getAttribute('href')).toBe('/comptia-sec-plus')
    expect(screen.getByText('Splunk Core Certified User')).toBeTruthy()
    expect(screen.getByText('SPLK-1001')).toBeTruthy()
    expect(screen.getByRole('link', { name: /Splunk Core Certified User/ }).getAttribute('href')).toBe('/splunk-core-certified-user')
  })

  it('keeps the hidden NVIDIA route intact with all modules paused', () => {
    renderPath('/paths/nvidia')

    expect(screen.getByRole('heading', { name: 'Build NVIDIA fluency.' })).toBeTruthy()
    expect(screen.getByText('Step 01 / Systems foundation')).toBeTruthy()
    expect(screen.getByText('CompTIA Linux+')).toBeTruthy()
    expect(screen.getByText('XK0-006')).toBeTruthy()
    expect(screen.queryByRole('link', { name: /CompTIA Linux\+/ })).toBeNull()
    expect(screen.getByText('Step 02 / AI Infrastructure')).toBeTruthy()
    expect(screen.getByText('Step 03 / Generative AI')).toBeTruthy()
    expect(screen.queryByRole('link', { name: /NVIDIA AI Infrastructure & Operations/ })).toBeNull()
    expect(screen.queryByRole('link', { name: /NVIDIA Generative AI LLMs/ })).toBeNull()
  })

  it('redirects unknown path ids home', () => {
    renderPath('/paths/missing')

    expect(screen.getByText('Home Redirect')).toBeTruthy()
  })
})
