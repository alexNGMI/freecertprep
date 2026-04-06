import { fisherYates } from './shuffle.js'

/**
 * Select questions proportional to domain weights (largest-remainder rounding).
 * Falls back to uniform random if cert has no domain config.
 * Guarantees at least 1 question per type that exists in the pool.
 */
export function weightedSelect(questions, count, domains) {
  if (!domains?.length) {
    return fisherYates(questions).slice(0, count)
  }

  // Group questions by domain name
  const byDomain = {}
  for (const q of questions) {
    if (!byDomain[q.domain]) byDomain[q.domain] = []
    byDomain[q.domain].push(q)
  }

  // Largest-remainder allocation so totals always equal count
  const exact = domains.map(d => ({ name: d.name, exact: (d.weight / 100) * count }))
  const floors = exact.map(d => ({ ...d, alloc: Math.floor(d.exact), remainder: d.exact - Math.floor(d.exact) }))
  let remainder = count - floors.reduce((s, d) => s + d.alloc, 0)
  floors.sort((a, b) => b.remainder - a.remainder)
  for (let i = 0; i < remainder; i++) floors[i].alloc += 1

  // Pick allocated questions from each domain (shuffle pool first)
  const picked = []
  let leftover = 0
  for (const { name, alloc } of floors) {
    const pool = fisherYates(byDomain[name] || [])
    const take = Math.min(alloc, pool.length)
    picked.push(...pool.slice(0, take))
    leftover += alloc - take   // track shortfall if domain has fewer questions than allocated
  }

  // Fill any shortfall with random questions not already picked
  if (leftover > 0) {
    const pickedIds = new Set(picked.map(q => q.id))
    const extra = fisherYates(questions.filter(q => !pickedIds.has(q.id)))
    picked.push(...extra.slice(0, leftover))
  }

  // Guarantee at least 1 question per type that exists in the pool.
  const poolTypes = [...new Set(questions.map(q => q.type || 'single-choice'))]
  const pickedTypes = new Set(picked.map(q => q.type || 'single-choice'))
  const missingTypes = poolTypes.filter(t => !pickedTypes.has(t))

  if (missingTypes.length > 0) {
    const pickedIds = new Set(picked.map(q => q.id))
    for (const missing of missingTypes) {
      const candidates = fisherYates(questions.filter(q => !pickedIds.has(q.id) && (q.type || 'single-choice') === missing))
      if (candidates.length === 0) continue
      const swapIdx = picked.findIndex(q => (q.type || 'single-choice') === 'single-choice')
      if (swapIdx === -1) continue
      pickedIds.delete(picked[swapIdx].id)
      picked[swapIdx] = candidates[0]
      pickedIds.add(candidates[0].id)
    }
  }

  // Final shuffle so domain blocks aren't visible in question order
  return fisherYates(picked)
}
