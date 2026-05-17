import { describe, it, expect } from 'vitest'
import { mergeSessionStats } from '../utils/question-stats.js'

describe('question-stats: mergeSessionStats', () => {
  it('creates fresh entries for first-seen questions', () => {
    const result = mergeSessionStats({}, [
      { questionId: 'q1', correct: true },
      { questionId: 'q2', correct: false },
    ], 1000)
    expect(result).toEqual({
      q1: { attempts: 1, correct: 1, lastSeen: 1000 },
      q2: { attempts: 1, correct: 0, lastSeen: 1000 },
    })
  })

  it('accumulates onto existing stats', () => {
    const prev = { q1: { attempts: 2, correct: 1, lastSeen: 500 } }
    const result = mergeSessionStats(prev, [{ questionId: 'q1', correct: true }], 2000)
    expect(result.q1).toEqual({ attempts: 3, correct: 2, lastSeen: 2000 })
  })

  it('does not mutate the input stats object', () => {
    const prev = { q1: { attempts: 1, correct: 1, lastSeen: 500 } }
    const snapshot = JSON.parse(JSON.stringify(prev))
    mergeSessionStats(prev, [{ questionId: 'q1', correct: false }], 999)
    expect(prev).toEqual(snapshot)
  })

  it('counts a wrong answer as an attempt but not a correct', () => {
    const result = mergeSessionStats({}, [{ questionId: 'q1', correct: false }], 1)
    expect(result.q1).toEqual({ attempts: 1, correct: 0, lastSeen: 1 })
  })

  it('handles the same question appearing twice in one session', () => {
    const result = mergeSessionStats({}, [
      { questionId: 'q1', correct: true },
      { questionId: 'q1', correct: false },
    ], 42)
    expect(result.q1).toEqual({ attempts: 2, correct: 1, lastSeen: 42 })
  })

  it('returns an unchanged copy for an empty session', () => {
    const prev = { q1: { attempts: 1, correct: 1, lastSeen: 5 } }
    const result = mergeSessionStats(prev, [], 100)
    expect(result).toEqual(prev)
    expect(result).not.toBe(prev)
  })
})
