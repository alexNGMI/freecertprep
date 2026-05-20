import { describe, it, expect } from 'vitest'
import certs from '../data/certs.js'
import { RE_STUDY_CERTS, reCertBySlug } from '../pages/realestate/reCerts.js'

const EXPECTED_STUDY_SLUGS = ['national', 'tx', 'me', 'ga', 'az', 'nc', 'in']

describe('real estate study registry', () => {
  it('shows every live real estate study module in the picker order', () => {
    expect(RE_STUDY_CERTS.map((c) => c.slug)).toEqual(EXPECTED_STUDY_SLUGS)
  })

  it('every picker entry maps to a registered cert', () => {
    for (const entry of RE_STUDY_CERTS) {
      expect(certs[entry.certId], `${entry.slug} points to missing cert ${entry.certId}`).toBeTruthy()
      expect(reCertBySlug(entry.slug)).toEqual(entry)
    }
  })

  it('every real estate state cert is reachable from the front end picker', () => {
    const pickerCertIds = new Set(RE_STUDY_CERTS.map((c) => c.certId))
    const stateCertIds = Object.keys(certs).filter((id) =>
      id.startsWith('real-estate-') && id !== 'real-estate-national'
    )

    expect([...pickerCertIds].sort()).toEqual(['real-estate-national', ...stateCertIds].sort())
  })

  it('live state modules have composite national/state exam specs', () => {
    for (const entry of RE_STUDY_CERTS.filter((c) => c.slug !== 'national')) {
      const cert = certs[entry.certId]
      expect(cert.composite, `${entry.slug} missing composite exam`).toBeTruthy()
      expect(cert.composite.national.count, `${entry.slug} national count`).toBeGreaterThan(0)
      expect(cert.composite.state.count, `${entry.slug} state count`).toBeGreaterThan(0)
      expect(cert.examQuestions).toBe(cert.composite.national.count + cert.composite.state.count)
      expect(entry.examLine).toContain(String(cert.composite.national.count))
      expect(entry.examLine).toContain(String(cert.composite.state.count))
    }
  })
})
