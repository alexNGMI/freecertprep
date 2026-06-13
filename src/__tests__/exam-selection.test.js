import { describe, it, expect } from 'vitest'
import { weightedSelect, selectLicensingExam } from '../utils/exam-selection.js'

// Helper: generate a pool of mock questions
function makePool(domains, countPerDomain, types = ['single-choice']) {
  const questions = []
  let id = 1
  for (const domain of domains) {
    for (let i = 0; i < countPerDomain; i++) {
      questions.push({
        id: `q-${id++}`,
        domain,
        type: types[i % types.length],
        choices: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
      })
    }
  }
  return questions
}

describe('weightedSelect', () => {
  it('returns the requested number of questions', () => {
    const pool = makePool(['D1', 'D2'], 50)
    const domains = [
      { name: 'D1', weight: 60 },
      { name: 'D2', weight: 40 },
    ]
    const result = weightedSelect(pool, 20, domains)
    expect(result).toHaveLength(20)
  })

  it('returns no duplicates', () => {
    const pool = makePool(['D1', 'D2', 'D3'], 40)
    const domains = [
      { name: 'D1', weight: 50 },
      { name: 'D2', weight: 30 },
      { name: 'D3', weight: 20 },
    ]
    const result = weightedSelect(pool, 30, domains)
    const ids = result.map(q => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('respects domain weight proportions (within tolerance)', () => {
    const pool = makePool(['D1', 'D2'], 100)
    const domains = [
      { name: 'D1', weight: 70 },
      { name: 'D2', weight: 30 },
    ]
    // Run multiple times and average to reduce randomness effects
    let d1Total = 0
    const runs = 50
    for (let i = 0; i < runs; i++) {
      const result = weightedSelect(pool, 40, domains)
      d1Total += result.filter(q => q.domain === 'D1').length
    }
    const avgD1 = d1Total / runs
    // Expected: 28 (70% of 40). Allow +/- 3 for type-guarantee swaps
    expect(avgD1).toBeGreaterThanOrEqual(25)
    expect(avgD1).toBeLessThanOrEqual(31)
  })

  it('falls back to uniform random when no domains provided', () => {
    const pool = makePool(['D1'], 50)
    const result = weightedSelect(pool, 10, null)
    expect(result).toHaveLength(10)
  })

  it('falls back to uniform random with empty domains array', () => {
    const pool = makePool(['D1'], 50)
    const result = weightedSelect(pool, 10, [])
    expect(result).toHaveLength(10)
  })

  it('handles requesting more questions than available', () => {
    const pool = makePool(['D1'], 5)
    const domains = [{ name: 'D1', weight: 100 }]
    const result = weightedSelect(pool, 10, domains)
    // Can only return what exists
    expect(result.length).toBeLessThanOrEqual(10)
    expect(result.length).toBeGreaterThanOrEqual(5)
  })

  it('guarantees type coverage when pool has multiple types', () => {
    const types = ['single-choice', 'multiple-response', 'ordering', 'matching']
    // Use enough questions so single-choice isn't fully swapped out
    const pool = makePool(['D1'], 200, types)
    const domains = [{ name: 'D1', weight: 100 }]
    // Run multiple times — type guarantee should always hold
    for (let i = 0; i < 20; i++) {
      const result = weightedSelect(pool, 20, domains)
      const resultTypes = new Set(result.map(q => q.type))
      for (const t of types) {
        expect(resultTypes.has(t), `missing type: ${t}`).toBe(true)
      }
    }
  })

  it('handles domain with zero questions gracefully', () => {
    const pool = makePool(['D1'], 50)
    const domains = [
      { name: 'D1', weight: 70 },
      { name: 'D2', weight: 30 }, // D2 has no questions in pool
    ]
    const result = weightedSelect(pool, 20, domains)
    expect(result).toHaveLength(20)
    // All should come from D1 since D2 has nothing
    expect(result.every(q => q.domain === 'D1')).toBe(true)
  })

  it('guarantees the requested practical-question count while preserving domain allocation', () => {
    const domains = [
      { name: 'D1', weight: 60 },
      { name: 'D2', weight: 40 },
    ]
    const pool = makePool(['D1', 'D2'], 100).map((question, index) => ({
      ...question,
      type: index % 8 === 0 ? 'cli-output' : 'single-choice',
    }))

    for (let i = 0; i < 20; i++) {
      const result = weightedSelect(pool, 20, domains, { practicalQuestionTarget: 6 })
      const practical = result.filter((question) => question.type === 'cli-output')

      expect(practical.length).toBeGreaterThanOrEqual(6)
      expect(result.filter((question) => question.domain === 'D1')).toHaveLength(12)
      expect(result.filter((question) => question.domain === 'D2')).toHaveLength(8)
    }
  })

  it('guarantees required practical categories while preserving domain allocation', () => {
    const domains = [
      { name: 'Hardware', weight: 50 },
      { name: 'Networking', weight: 50 },
    ]
    const pool = [
      ...makePool(['Hardware', 'Networking'], 80, ['single-choice']),
      { id: 'hw-diag', domain: 'Hardware', type: 'pbq-matching', practicalCategory: 'hardware-diagnostics' },
      { id: 'hw-storage', domain: 'Hardware', type: 'pbq-matching', practicalCategory: 'storage-configuration' },
      { id: 'net-link', domain: 'Networking', type: 'pbq-matching', practicalCategory: 'network-connectivity' },
    ]
    const requiredPracticalCategories = [
      'hardware-diagnostics',
      'storage-configuration',
      'network-connectivity',
    ]

    for (let i = 0; i < 50; i++) {
      const result = weightedSelect(pool, 20, domains, {
        practicalQuestionTarget: 3,
        requiredPracticalCategories,
      })
      const categories = new Set(result.map(question => question.practicalCategory).filter(Boolean))

      expect(result.filter(question => question.domain === 'Hardware')).toHaveLength(10)
      expect(result.filter(question => question.domain === 'Networking')).toHaveLength(10)
      for (const category of requiredPracticalCategories) {
        expect(categories.has(category), `missing practical category: ${category}`).toBe(true)
      }
    }
  })

  it('guarantees certification-specific question type counts', () => {
    const domains = [{ name: 'D1', weight: 100 }]
    const pool = [
      ...makePool(['D1'], 80, ['single-choice']),
      ...makePool(['D1'], 20, ['true-false']).map((q) => ({ ...q, id: `tf-${q.id}` })),
      ...makePool(['D1'], 20, ['multiple-response']).map((q) => ({ ...q, id: `mr-${q.id}` })),
    ]

    for (let i = 0; i < 20; i++) {
      const result = weightedSelect(pool, 30, domains, {
        requiredTypeCounts: { 'true-false': 3, 'multiple-response': 4 },
      })
      const byType = result.reduce((acc, question) => {
        acc[question.type] = (acc[question.type] || 0) + 1
        return acc
      }, {})

      expect(byType['true-false']).toBeGreaterThanOrEqual(3)
      expect(byType['multiple-response']).toBeGreaterThanOrEqual(4)
    }
  })

  it('limits an exam form to certification-approved question types', () => {
    const types = ['single-choice', 'multiple-response', 'matching', 'ordering']
    const pool = makePool(['D1', 'D2'], 100, types)
    const domains = [
      { name: 'D1', weight: 60 },
      { name: 'D2', weight: 40 },
    ]

    for (let i = 0; i < 20; i++) {
      const result = weightedSelect(pool, 60, domains, {
        allowedQuestionTypes: ['single-choice', 'multiple-response'],
      })

      expect(result).toHaveLength(60)
      expect(result.every(question =>
        ['single-choice', 'multiple-response'].includes(question.type)
      )).toBe(true)
      expect(result.filter(question => question.domain === 'D1')).toHaveLength(36)
      expect(result.filter(question => question.domain === 'D2')).toHaveLength(24)
    }
  })
})

describe('selectLicensingExam', () => {
  const NAT_DOMAINS = [{ name: 'N1', weight: 60 }, { name: 'N2', weight: 40 }]
  const STATE_DOMAINS = [{ name: 'S1', weight: 50 }, { name: 'S2', weight: 50 }]

  function makeMergedPool() {
    const nat = makePool(['N1', 'N2'], 80).map(q => ({ ...q, portion: 'national' }))
    const st = makePool(['S1', 'S2'], 60).map(q => ({ ...q, id: `s-${q.id}`, portion: 'state' }))
    return [...nat, ...st]
  }

  const composite = {
    national: { count: 85, domains: NAT_DOMAINS },
    state: { count: 40, domains: STATE_DOMAINS },
  }

  it('returns the combined national + state count with no duplicates', () => {
    const result = selectLicensingExam(makeMergedPool(), composite)
    expect(result).toHaveLength(125)
    const ids = result.map(q => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('draws the requested number from each portion', () => {
    const result = selectLicensingExam(makeMergedPool(), composite)
    const nat = result.filter(q => (q.portion || 'national') === 'national')
    const st = result.filter(q => q.portion === 'state')
    expect(nat).toHaveLength(85)
    expect(st).toHaveLength(40)
  })

  it('treats untagged questions as national', () => {
    const pool = makePool(['N1', 'N2'], 80) // no portion tag
    const result = selectLicensingExam(pool, {
      national: { count: 50, domains: NAT_DOMAINS },
      state: { count: 40, domains: STATE_DOMAINS },
    })
    expect(result).toHaveLength(50) // state portion empty -> contributes nothing
    expect(result.every(q => (q.portion || 'national') === 'national')).toBe(true)
  })

  it('degrades gracefully when the state pool is empty (still returns national)', () => {
    const natOnly = makePool(['N1', 'N2'], 80).map(q => ({ ...q, portion: 'national' }))
    const result = selectLicensingExam(natOnly, composite)
    expect(result).toHaveLength(85)
    expect(result.every(q => q.portion === 'national')).toBe(true)
  })
})
