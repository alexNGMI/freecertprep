// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CareerPath from '../pages/CareerPath.jsx'

function renderPath(path) {
  render(
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

  it('guides cloud learners through vendor choice before Terraform', () => {
    renderPath('/paths/cloud')

    expect(screen.getByRole('heading', { name: 'Pick a cloud vendor, then automate the stack.' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Choose one vendor foundation' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Then add infrastructure as code' })).toBeTruthy()
    expect(screen.getByRole('link', { name: /AWS Cloud Practitioner/ }).getAttribute('href')).toBe('/clf-c02')
    expect(screen.getByRole('link', { name: /Microsoft Azure Fundamentals/ }).getAttribute('href')).toBe('/az-900')
    expect(screen.getByRole('link', { name: /Google Cloud Digital Leader/ }).getAttribute('href')).toBe('/cdl')
    expect(screen.getByRole('link', { name: /HashiCorp Terraform Associate/ }).getAttribute('href')).toBe('/terraform-associate')
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
