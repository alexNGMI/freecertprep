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

export const LIVE_CATALOG_ORDER = [
  'comptia-a-plus-core-1',
  'comptia-a-plus-core-2',
  'comptia-net-plus',
  'ccst-networking',
  'comptia-sec-plus',
  'splunk-core-certified-user',
  'clf-c02',
  'aws-saa-c03',
  'terraform-associate',
]

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

export const COMING_SOON_CATALOG_ORDER = [
  'az-900',
  'cdl',
  'nca-aiio',
  'nca-genl',
  'ccna-200-301',
  'schneider-dcca',
  'comptia-server-plus',
  'comptia-linux-plus',
]

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

function sortByCatalogOrder(certs, order) {
  const rank = new Map(order.map((id, index) => [id, index]))

  return [...certs].sort((a, b) => {
    const aRank = rank.get(a.id) ?? Number.MAX_SAFE_INTEGER
    const bRank = rank.get(b.id) ?? Number.MAX_SAFE_INTEGER

    if (aRank !== bRank) {
      return aRank - bRank
    }

    return a.id.localeCompare(b.id)
  })
}

export function selectLiveCerts(certs) {
  return sortByCatalogOrder(
    certs.filter(cert => isCertLive(cert.id)),
    LIVE_CATALOG_ORDER,
  )
}

export function selectComingSoonCerts(certs) {
  return sortByCatalogOrder(
    certs.filter(cert => isCertComingSoon(cert.id)),
    COMING_SOON_CATALOG_ORDER,
  )
}
