import { describe, it, expect } from 'vitest'
import { computeQuestionWeight, buildWeightedPool } from '../utils/smart-practice.js'

describe('computeQuestionWeight', () => {
  it('returns 1.0 for a question never seen (null stats)', () => {
    expect(computeQuestionWeight(null)).toBe(1.0)
  })

  it('returns 1.0 for a question never seen (undefined stats)', () => {
    expect(computeQuestionWeight(undefined)).toBe(1.0)
  })

  it('returns 1.0 for a question with 0 attempts', () => {
    expect(computeQuestionWeight({ attempts: 0, correct: 0 })).toBe(1.0)
  })

  it('returns 1.0 for a question always answered wrong', () => {
    expect(computeQuestionWeight({ attempts: 5, correct: 0 })).toBe(1.0)
  })

  it('returns 0.5 for a question answered half correctly', () => {
    expect(computeQuestionWeight({ attempts: 4, correct: 2 })).toBe(0.5)
  })

  it('returns 0.4 for a question answered 3/5 correct', () => {
    expect(computeQuestionWeight({ attempts: 5, correct: 3 })).toBeCloseTo(0.4)
  })

  it('clamps mastered questions (100% correct) to 0.05, not 0', () => {
    // This guarantees mastered questions still appear occasionally
    expect(computeQuestionWeight({ attempts: 10, correct: 10 })).toBe(0.05)
  })

  it('clamps near-mastered questions above the floor', () => {
    // 19/20 correct = 1 - 0.95 = ~0.05 (float imprecision) → at/near floor
    expect(computeQuestionWeight({ attempts: 20, correct: 19 })).toBeCloseTo(0.05)
    // 18/20 correct = 1 - 0.9 = 0.10 → above floor
    expect(computeQuestionWeight({ attempts: 20, correct: 18 })).toBeCloseTo(0.1)
  })

  it('returns a number between 0.05 and 1.0 for any valid stats', () => {
    // Fuzz the input — the weight should always be in range
    for (let attempts = 1; attempts <= 10; attempts++) {
      for (let correct = 0; correct <= attempts; correct++) {
        const w = computeQuestionWeight({ attempts, correct })
        expect(w).toBeGreaterThanOrEqual(0.05)
        expect(w).toBeLessThanOrEqual(1.0)
      }
    }
  })
})

describe('buildWeightedPool', () => {
  it('returns one entry per question', () => {
    const questions = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const pool = buildWeightedPool(questions, {})
    expect(pool).toHaveLength(3)
  })

  it('wraps each question in { q, weight }', () => {
    const questions = [{ id: 1, text: 'hello' }]
    const pool = buildWeightedPool(questions, {})
    expect(pool[0]).toHaveProperty('q')
    expect(pool[0]).toHaveProperty('weight')
    expect(pool[0].q).toEqual({ id: 1, text: 'hello' })
  })

  it('assigns weight 1.0 to unseen questions', () => {
    const questions = [{ id: 1 }, { id: 2 }]
    const pool = buildWeightedPool(questions, {})
    expect(pool.every(p => p.weight === 1.0)).toBe(true)
  })

  it('assigns the correct weight based on stats', () => {
    const questions = [
      { id: 1 }, // unseen → 1.0
      { id: 2 }, // 2/4 correct → 0.5
      { id: 3 }, // 10/10 correct → 0.05 (clamped)
    ]
    const statsMap = {
      2: { attempts: 4, correct: 2, lastSeen: 123 },
      3: { attempts: 10, correct: 10, lastSeen: 456 },
    }
    const pool = buildWeightedPool(questions, statsMap)
    expect(pool[0].weight).toBe(1.0)
    expect(pool[1].weight).toBe(0.5)
    expect(pool[2].weight).toBe(0.05)
  })

  it('handles null/undefined statsMap as all-unseen', () => {
    const questions = [{ id: 1 }, { id: 2 }]
    expect(buildWeightedPool(questions, null).every(p => p.weight === 1.0)).toBe(true)
    expect(buildWeightedPool(questions, undefined).every(p => p.weight === 1.0)).toBe(true)
  })

  it('handles an empty question list', () => {
    expect(buildWeightedPool([], {})).toEqual([])
  })

  it('preserves question order', () => {
    const questions = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    const pool = buildWeightedPool(questions, {})
    expect(pool.map(p => p.q.id)).toEqual(['a', 'b', 'c'])
  })
})
