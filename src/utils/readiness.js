export function readinessTarget(cert) {
  return `${cert.passingScore}%`
}

export function readinessResult(passed) {
  return passed ? 'Readiness target met' : 'Readiness target not met'
}
