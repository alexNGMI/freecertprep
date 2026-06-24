export const LIVE_CERT_IDS = new Set([
  'clf-c02',
  'aws-saa-c03',
  'ccst-networking',
  'comptia-a-plus-core-1',
  'comptia-a-plus-core-2',
  'comptia-net-plus',
  'comptia-sec-plus',
  'splunk-core-certified-user',
  'terraform-associate',
])

export const COMING_SOON_CERT_IDS = new Set([
  'az-900',
  'cdl',
  'nca-aiio',
  'nca-genl',
  'comptia-server-plus',
  'comptia-linux-plus',
  'schneider-dcca',
  'ccna-200-301',
])

export function isCertLive(certId) {
  return LIVE_CERT_IDS.has(certId)
}

export function isCertComingSoon(certId) {
  return COMING_SOON_CERT_IDS.has(certId)
}

export const CATALOG_VISIBILITY_COUNTS = Object.freeze({
  live: LIVE_CERT_IDS.size,
  comingSoon: COMING_SOON_CERT_IDS.size,
  total: LIVE_CERT_IDS.size + COMING_SOON_CERT_IDS.size,
})

export function selectLiveCerts(certs) {
  return certs.filter(cert => isCertLive(cert.id))
}

export function selectComingSoonCerts(certs) {
  return certs.filter(cert => isCertComingSoon(cert.id))
}
