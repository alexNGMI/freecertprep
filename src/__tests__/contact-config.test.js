import { describe, expect, it } from 'vitest'
import { buildMailto, normalizePublicEmail } from '../config/contact'

describe('public contact configuration', () => {
  it('normalizes valid public email addresses', () => {
    expect(normalizePublicEmail(' Support@Example.COM ')).toBe('support@example.com')
  })

  it('rejects missing and malformed addresses', () => {
    expect(normalizePublicEmail('')).toBeNull()
    expect(normalizePublicEmail('support.example.com')).toBeNull()
    expect(normalizePublicEmail('support@localhost')).toBeNull()
  })

  it('builds a subject-safe mailto link', () => {
    expect(buildMailto('support@example.com', 'Account sync help')).toBe(
      'mailto:support@example.com?subject=Account%20sync%20help',
    )
  })
})
