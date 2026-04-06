import { describe, it, expect } from 'vitest'
import { weightedSelect } from '../utils/exam-selection.js'

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
})
