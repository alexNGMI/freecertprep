import { describe, expect, it } from 'vitest'
import {
  CATALOG_VISIBILITY_COUNTS,
  COMING_SOON_CERT_IDS,
  LIVE_CERT_IDS,
  selectComingSoonCerts,
  selectLiveCerts,
} from '../data/catalogVisibility'

describe('catalog visibility selectors', () => {
  const certs = [
    { id: 'az-900' },
    { id: 'comptia-net-plus' },
    { id: 'not-in-catalog' },
    { id: 'terraform-associate' },
  ]

  it('derives counts from the existing visibility sets', () => {
    expect(CATALOG_VISIBILITY_COUNTS).toEqual({
      live: LIVE_CERT_IDS.size,
      comingSoon: COMING_SOON_CERT_IDS.size,
      total: LIVE_CERT_IDS.size + COMING_SOON_CERT_IDS.size,
    })
  })

  it('selects live and coming-soon certs while preserving registry order', () => {
    expect(selectLiveCerts(certs).map(cert => cert.id)).toEqual([
      'comptia-net-plus',
      'terraform-associate',
    ])
    expect(selectComingSoonCerts(certs).map(cert => cert.id)).toEqual(['az-900'])
  })
})
