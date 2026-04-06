import { describe, it, expect } from 'vitest'
import { fisherYates } from '../utils/shuffle.js'

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
