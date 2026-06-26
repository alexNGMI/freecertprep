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
    { id: 'clf-c02' },
    { id: 'comptia-net-plus' },
    { id: 'comptia-a-plus-core-1' },
    { id: 'not-in-catalog' },
    { id: 'terraform-associate' },
    { id: 'ccna-200-301' },
  ]

  it('derives counts from the existing visibility sets', () => {
    expect(CATALOG_VISIBILITY_COUNTS).toEqual({
      live: LIVE_CERT_IDS.size,
      comingSoon: COMING_SOON_CERT_IDS.size,
      total: LIVE_CERT_IDS.size + COMING_SOON_CERT_IDS.size,
    })
  })

  it('selects live and coming-soon certs by the explicit catalog order', () => {
    expect(selectLiveCerts(certs).map(cert => cert.id)).toEqual([
      'comptia-a-plus-core-1',
      'comptia-net-plus',
      'clf-c02',
      'terraform-associate',
    ])
    expect(selectComingSoonCerts(certs).map(cert => cert.id)).toEqual(['az-900', 'ccna-200-301'])
  })
})
