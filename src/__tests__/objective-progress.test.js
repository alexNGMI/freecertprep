import { describe, expect, it } from 'vitest'
import {
  getDueReviewQuestions,
  getRecentMissQuestions,
  rankWeakObjectives,
  summarizeObjectiveProgress,
} from '../utils/objective-progress'
import {
  APLUS_CORE_1_OBJECTIVES,
  APLUS_CORE_2_OBJECTIVES,
} from '../data/objectiveCatalog'

const questions = [
  { id: 'q1', objectiveId: '1.1' },
  { id: 'q2', objectiveId: '1.1' },
  { id: 'q3', objectiveId: '1.2' },
]
const objectives = [
  { id: '1.1', domain: 'One', title: 'First skill' },
  { id: '1.2', domain: 'One', title: 'Second skill' },
]

describe('objective progress', () => {
  it('registers every A+ objective with a learner-facing label', () => {
    expect(APLUS_CORE_1_OBJECTIVES).toHaveLength(27)
    expect(APLUS_CORE_2_OBJECTIVES).toHaveLength(36)

    for (const catalog of [APLUS_CORE_1_OBJECTIVES, APLUS_CORE_2_OBJECTIVES]) {
      expect(new Set(catalog.map(objective => objective.id)).size).toBe(catalog.length)
      for (const objective of catalog) {
        expect(objective.domain).not.toBe('')
        expect(objective.title.length).toBeGreaterThan(8)
      }
    }
  })

  it('separates accuracy from question coverage', () => {
    const summaries = summarizeObjectiveProgress(questions, {
      q1: { attempts: 2, correct: 1, lastSeen: 100 },
    }, objectives)

    expect(summaries[0]).toMatchObject({
      id: '1.1',
      totalQuestions: 2,
      attemptedQuestions: 1,
      attempts: 2,
      correct: 1,
      accuracy: 50,
      coverage: 50,
    })
    expect(summaries[1].accuracy).toBeNull()
  })

  it('ranks attempted weak objectives ahead of stronger ones', () => {
    const ranked = rankWeakObjectives([
      { id: '1.1', attempts: 3, accuracy: 33, coverage: 20 },
      { id: '1.2', attempts: 3, accuracy: 100, coverage: 10 },
      { id: '1.3', attempts: 0, accuracy: null, coverage: 0 },
    ])
    expect(ranked.map(item => item.id)).toEqual(['1.1', '1.2'])
  })

  it('builds recent-miss and spaced review queues', () => {
    const now = 10 * 24 * 60 * 60 * 1000
    const stats = {
      q1: { attempts: 2, correct: 0, lastSeen: now - 2 * 24 * 60 * 60 * 1000 },
      q2: { attempts: 4, correct: 3, lastSeen: now - 4 * 24 * 60 * 60 * 1000 },
      q3: { attempts: 2, correct: 2, lastSeen: now - 2 * 24 * 60 * 60 * 1000 },
    }

    expect(getRecentMissQuestions(questions, stats).map(question => question.id)).toEqual(['q1', 'q2'])
    expect(getDueReviewQuestions(questions, stats, now).map(question => question.id)).toEqual(['q1', 'q2'])
  })
})
