export const LIVE_CERT_IDS = new Set([
  'clf-c02',
  'aws-saa-c03',
  'comptia-a-plus-core-1',
  'comptia-a-plus-core-2',
  'comptia-net-plus',
  'comptia-sec-plus',
  'splunk-core-certified-user',
  'ccna-200-301',
  'terraform-associate',
])

export const COMING_SOON_CERT_IDS = new Set([
  'az-900',
  'cdl',
  'ccst-networking',
  'nca-aiio',
  'nca-genl',
  'comptia-server-plus',
  'comptia-linux-plus',
  'schneider-dcca',
])

export function isCertLive(certId) {
  return LIVE_CERT_IDS.has(certId)
}

export function isCertComingSoon(certId) {
  return COMING_SOON_CERT_IDS.has(certId)
}
