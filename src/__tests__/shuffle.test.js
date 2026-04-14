import { describe, it, expect } from 'vitest'
import { fisherYates, weightedSample } from '../utils/shuffle.js'

describe('fisherYates', () => {
  it('returns an array of the same length', () => {
    const input = [1, 2, 3, 4, 5]
    const result = fisherYates(input)
    expect(result).toHaveLength(input.length)
  })

  it('contains all original elements', () => {
    const input = [10, 20, 30, 40, 50]
    const result = fisherYates(input)
    expect(result.sort((a, b) => a - b)).toEqual(input.sort((a, b) => a - b))
  })

  it('does not mutate the input array', () => {
    const input = [1, 2, 3, 4, 5]
    const copy = [...input]
    fisherYates(input)
    expect(input).toEqual(copy)
  })

  it('returns a single-element array unchanged', () => {
    expect(fisherYates([42])).toEqual([42])
  })

  it('returns an empty array for empty input', () => {
    expect(fisherYates([])).toEqual([])
  })

  it('produces different orderings across multiple runs (statistical)', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const results = new Set()
    for (let i = 0; i < 20; i++) {
      results.add(JSON.stringify(fisherYates(input)))
    }
    // With 10 elements and 20 runs, getting the same order every time is ~impossible
    expect(results.size).toBeGreaterThan(1)
  })
})

describe('weightedSample', () => {
  // Helper to build a pool of { q, weight } items
  function makePool(weights) {
    return weights.map((weight, i) => ({ q: { id: i }, weight }))
  }

  it('returns the requested number of items', () => {
    const pool = makePool([1, 1, 1, 1, 1])
    expect(weightedSample(pool, 3)).toHaveLength(3)
  })

  it('returns at most pool.length items when n exceeds pool size', () => {
    const pool = makePool([1, 1, 1])
    expect(weightedSample(pool, 10)).toHaveLength(3)
  })

  it('returns an empty array when n is 0', () => {
    const pool = makePool([1, 1, 1])
    expect(weightedSample(pool, 0)).toEqual([])
  })

  it('returns an empty array for an empty pool', () => {
    expect(weightedSample([], 5)).toEqual([])
  })

  it('unwraps items back to bare question objects', () => {
    const pool = [{ q: { id: 'a' }, weight: 1 }]
    const result = weightedSample(pool, 1)
    expect(result[0]).toEqual({ id: 'a' })
  })

  it('does not return duplicates', () => {
    const pool = makePool([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    const result = weightedSample(pool, 5)
    const ids = result.map(q => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('favors high-weight items over low-weight items (statistical)', () => {
    // Pool: 10 items weight 1.0, 10 items weight 0.05
    // When sampling 5, expect the bulk to be high-weight.
    const pool = [
      ...Array.from({ length: 10 }, (_, i) => ({ q: { id: `hi-${i}` }, weight: 1.0 })),
      ...Array.from({ length: 10 }, (_, i) => ({ q: { id: `lo-${i}` }, weight: 0.05 })),
    ]
    let highPicks = 0
    const runs = 200
    for (let i = 0; i < runs; i++) {
      const result = weightedSample(pool, 5)
      highPicks += result.filter(q => q.id.startsWith('hi-')).length
    }
    // In 200 runs × 5 picks = 1000 total picks, expect > 80% to be high-weight
    expect(highPicks).toBeGreaterThan(runs * 5 * 0.8)
  })

  it('handles zero weights without crashing', () => {
    // weightedSample guards with Math.max(weight, 0.001)
    const pool = [
      { q: { id: 'a' }, weight: 0 },
      { q: { id: 'b' }, weight: 0 },
      { q: { id: 'c' }, weight: 1 },
    ]
    const result = weightedSample(pool, 2)
    expect(result).toHaveLength(2)
    expect(result.every(q => ['a', 'b', 'c'].includes(q.id))).toBe(true)
  })

  it('produces different orderings across multiple runs (statistical)', () => {
    const pool = makePool([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    const results = new Set()
    for (let i = 0; i < 20; i++) {
      results.add(JSON.stringify(weightedSample(pool, 5).map(q => q.id)))
    }
    // With equal weights, top-5 will vary across runs
    expect(results.size).toBeGreaterThan(1)
  })
})
