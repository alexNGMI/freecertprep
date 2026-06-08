import { fisherYates } from './shuffle.js'

export const PRACTICAL_QUESTION_TYPES = new Set([
  'pbq-matching',
  'cli-output',
  'topology-scenario',
  'config-repair',
  'subnetting-drill',
])

/**
 * Select questions proportional to domain weights (largest-remainder rounding).
 * Falls back to uniform random if cert has no domain config.
 * Guarantees at least 1 question per type that exists in the pool.
 */
export function weightedSelect(questions, count, domains, options = {}) {
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
      // Build current type counts so we swap from the most over-represented type
      // (never reducing any type below 1 occurrence).
      const typeCounts = {}
      for (const q of picked) {
        const t = q.type || 'single-choice'
        typeCounts[t] = (typeCounts[t] || 0) + 1
      }
      const swapSourceType = Object.entries(typeCounts)
        .filter(([, count]) => count > 1)
        .sort((a, b) => b[1] - a[1])[0]?.[0]
      if (!swapSourceType) continue  // every type has exactly 1 representative — cannot swap safely
      const sameDomainCandidate = candidates.find((candidate) =>
        picked.some((question) =>
          question.domain === candidate.domain
          && (question.type || 'single-choice') === swapSourceType
        )
      )
      const candidate = sameDomainCandidate || candidates[0]
      const swapIdx = picked.findIndex(q =>
        (q.type || 'single-choice') === swapSourceType
        && (!sameDomainCandidate || q.domain === candidate.domain)
      )
      if (swapIdx === -1) continue
      pickedIds.delete(picked[swapIdx].id)
      picked[swapIdx] = candidate
      pickedIds.add(candidate.id)
    }
  }

  guaranteePracticalQuestions(picked, questions, options.practicalQuestionTarget)
  guaranteeQuestionTypes(picked, questions, options.requiredTypeCounts)

  // Final shuffle so domain blocks aren't visible in question order
  return fisherYates(picked)
}

function guaranteeQuestionTypes(picked, questions, requiredTypeCounts = {}) {
  const pickedIds = new Set(picked.map((question) => question.id))

  for (const [type, requestedCount] of Object.entries(requiredTypeCounts || {})) {
    const target = Math.min(
      Math.max(0, requestedCount || 0),
      questions.filter((question) => (question.type || 'single-choice') === type).length,
      picked.length,
    )

    while (countType(picked, type) < target) {
      const candidates = fisherYates(questions.filter((question) =>
        !pickedIds.has(question.id)
        && (question.type || 'single-choice') === type
      ))
      const candidate = candidates.find((item) =>
        picked.some((question) =>
          question.domain === item.domain
          && (question.type || 'single-choice') !== type
          && canSwapType(picked, question.type || 'single-choice', requiredTypeCounts)
        )
      )
      if (!candidate) break

      const swapIndex = picked.findIndex((question) =>
        question.domain === candidate.domain
        && (question.type || 'single-choice') !== type
        && canSwapType(picked, question.type || 'single-choice', requiredTypeCounts)
      )
      if (swapIndex === -1) break

      pickedIds.delete(picked[swapIndex].id)
      picked[swapIndex] = candidate
      pickedIds.add(candidate.id)
    }
  }
}

function canSwapType(questions, type, requiredTypeCounts) {
  const protectedMinimum = Math.max(1, requiredTypeCounts?.[type] || 0)
  return countType(questions, type) > protectedMinimum
}

function guaranteePracticalQuestions(picked, questions, requestedTarget = 0) {
  const target = Math.min(
    Math.max(0, requestedTarget || 0),
    questions.filter(isPracticalQuestion).length,
    picked.length,
  )
  let practicalCount = picked.filter(isPracticalQuestion).length
  if (practicalCount >= target) return

  const pickedIds = new Set(picked.map((question) => question.id))
  const candidates = fisherYates(
    questions.filter((question) => isPracticalQuestion(question) && !pickedIds.has(question.id)),
  )

  for (const candidate of candidates) {
    if (practicalCount >= target) break

    // Prefer an in-domain replacement so official blueprint allocation remains exact.
    let swapIndex = picked.findIndex((question) =>
      question.domain === candidate.domain
      && !isPracticalQuestion(question)
      && countType(picked, question.type || 'single-choice') > 1
    )

    if (swapIndex === -1) {
      swapIndex = picked.findIndex((question) =>
        !isPracticalQuestion(question)
        && countType(picked, question.type || 'single-choice') > 1
      )
    }
    if (swapIndex === -1) break

    pickedIds.delete(picked[swapIndex].id)
    picked[swapIndex] = candidate
    pickedIds.add(candidate.id)
    practicalCount += 1
  }
}

function isPracticalQuestion(question) {
  return PRACTICAL_QUESTION_TYPES.has(question.type || 'single-choice')
}

function countType(questions, type) {
  return questions.filter((question) => (question.type || 'single-choice') === type).length
}

/**
 * Compose a state-licensing exam from a merged pool that contains both
 * national and state-law questions, mirroring the real exam's two-section
 * split (e.g. Texas Sales Agent = 85 national + 40 state). Each portion is
 * selected independently against its own domain blueprint via
 * weightedSelect, then the combined set is shuffled so the two sections
 * are interleaved.
 *
 * questions: merged pool; a question's portion is `q.portion` or, if
 *            absent, 'national' (the national pool omits the tag).
 * composite: { national: { count, domains }, state: { count, domains } }
 *
 * Degrades gracefully: if a portion has no questions yet (e.g. a state
 * pool still being authored), that portion contributes what it can and
 * the exam is still returned rather than throwing.
 */
export function selectLicensingExam(questions, composite) {
  const portionOf = (q) => q.portion || 'national'
  const national = questions.filter((q) => portionOf(q) === 'national')
  const state = questions.filter((q) => portionOf(q) === 'state')

  const picked = [
    ...weightedSelect(national, composite.national.count, composite.national.domains),
    ...weightedSelect(state, composite.state.count, composite.state.domains),
  ]

  return fisherYates(picked)
}
