import { describe, expect, it } from 'vitest'
import {
  mergeBookmarkState,
  mergeProgress,
  mergeQuestionStats,
  mergeStudySnapshots,
} from '../utils/account-sync-merge'

describe('merge-aware account sync', () => {
  it('unions session history without duplicating a session present on both devices', () => {
    const shared = {
      timestamp: 100,
      kind: 'quiz',
      answers: [{ questionId: 'q1', correct: true, selected: 1 }],
    }
    const localOnly = { timestamp: 300, answers: [{ questionId: 'q3', correct: false }] }
    const remoteOnly = { timestamp: 200, answers: [{ questionId: 'q2', correct: true }] }

    const merged = mergeProgress(
      { net: { quizHistory: [shared, localOnly], examHistory: [] } },
      { net: { quizHistory: [shared, remoteOnly], examHistory: [] } },
    )

    expect(merged.net.quizHistory).toEqual([shared, remoteOnly, localOnly])
  })

  it('adds independent question-stat deltas to the last common base', () => {
    const base = { net: { q1: { attempts: 4, correct: 3, lastSeen: 100 } } }
    const local = { net: { q1: { attempts: 6, correct: 4, lastSeen: 300 } } }
    const remote = { net: { q1: { attempts: 7, correct: 5, lastSeen: 200 } } }

    expect(mergeQuestionStats(local, remote, base)).toEqual({
      net: { q1: { attempts: 9, correct: 6, lastSeen: 300 } },
    })
  })

  it('is stable when an already merged snapshot is synced again', () => {
    const base = { net: { q1: { attempts: 4, correct: 3, lastSeen: 100 } } }
    const first = mergeQuestionStats(
      { net: { q1: { attempts: 6, correct: 4, lastSeen: 300 } } },
      { net: { q1: { attempts: 7, correct: 5, lastSeen: 200 } } },
      base,
    )

    expect(mergeQuestionStats(first, first, first)).toEqual(first)
  })

  it('propagates the newest bookmark removal instead of resurrecting it', () => {
    const local = {
      bookmarks: {},
      bookmarkState: { net: { q1: { present: false, changedAt: 300 } } },
    }
    const remote = {
      bookmarks: { net: ['q1'] },
      bookmarkState: { net: { q1: { present: true, changedAt: 200 } } },
    }

    expect(mergeBookmarkState(local, remote)).toEqual({
      bookmarks: { net: [] },
      bookmarkState: { net: { q1: { present: false, changedAt: 300 } } },
    })
  })

  it('combines progress, statistics, and bookmark state into schema version 2', () => {
    const merged = mergeStudySnapshots(
      {
        progress: { net: { quizHistory: [{ timestamp: 1 }], examHistory: [] } },
        questionStats: { net: { q1: { attempts: 2, correct: 1 } } },
        bookmarks: { net: ['q1'] },
        bookmarkState: { net: { q1: { present: true, changedAt: 10 } } },
      },
      {
        progress: { sec: { quizHistory: [], examHistory: [{ timestamp: 2 }] } },
        questionStats: { sec: { q2: { attempts: 1, correct: 1 } } },
        bookmarks: {},
      },
    )

    expect(merged.schemaVersion).toBe(2)
    expect(merged.progress).toMatchObject({
      net: { quizHistory: [{ timestamp: 1 }] },
      sec: { examHistory: [{ timestamp: 2 }] },
    })
    expect(merged.questionStats).toMatchObject({
      net: { q1: { attempts: 2, correct: 1 } },
      sec: { q2: { attempts: 1, correct: 1 } },
    })
    expect(merged.bookmarks.net).toEqual(['q1'])
  })
})
