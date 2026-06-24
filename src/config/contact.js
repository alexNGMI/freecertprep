const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizePublicEmail(value) {
  const email = typeof value === 'string' ? value.trim().toLowerCase() : ''
  return EMAIL_PATTERN.test(email) ? email : null
}

export function buildMailto(email, subject = 'freecertprep support request') {
  const normalized = normalizePublicEmail(email)
  if (!normalized) return null
  return `mailto:${normalized}?subject=${encodeURIComponent(subject)}`
}

export const supportEmail = normalizePublicEmail(import.meta.env.VITE_SUPPORT_EMAIL)
export const supportMailto = buildMailto(supportEmail)
