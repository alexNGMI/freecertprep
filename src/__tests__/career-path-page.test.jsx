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

    expect(screen.getByRole('heading', { name: 'Build around the AWS cloud lane.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Start with AWS foundation' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Then move into architecture' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Then add infrastructure as code' })).toBeTruthy()
    expect(screen.getByRole('link', { name: /AWS Cloud Practitioner/ }).getAttribute('href')).toBe('/clf-c02')
    expect(screen.getByRole('link', { name: /HashiCorp Terraform Associate/ }).getAttribute('href')).toBe('/terraform-associate')
    expect(screen.getByRole('link', { name: /AWS Solutions Architect - Associate/ }).getAttribute('href')).toBe('/aws-saa-c03')
    const pageText = container.textContent
    expect(pageText.indexOf('AWS Cloud Practitioner')).toBeLessThan(pageText.indexOf('AWS Solutions Architect - Associate'))
    expect(pageText.indexOf('AWS Solutions Architect - Associate')).toBeLessThan(pageText.indexOf('HashiCorp Terraform Associate'))
    expect(screen.queryByText('Azure Solutions Architect Expert')).toBeNull()
    expect(screen.queryByText('Google Professional Cloud Architect')).toBeNull()
  })

  it('offers CCST Networking as the Cisco-oriented Network+ alternative', () => {
    renderPath('/paths/networking')

    expect(screen.getByRole('heading', { name: 'Build the network and systems layer.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Choose your networking foundation' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Then add systems context' })).toBeTruthy()
    expect(screen.getByRole('link', { name: /CompTIA Network\+/ }).getAttribute('href')).toBe('/comptia-net-plus')
    expect(screen.getByRole('link', { name: /Cisco CCST Networking/ }).getAttribute('href')).toBe('/ccst-networking')
    expect(screen.getByRole('link', { name: /CompTIA Server\+/ }).getAttribute('href')).toBe('/comptia-server-plus')
  })

  it('redirects unknown path ids home', () => {
    renderPath('/paths/missing')

    expect(screen.getByText('Home Redirect')).toBeTruthy()
  })
})
