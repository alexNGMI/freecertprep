// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { KEYS } from '../utils/storage'

const { auth, from } = vi.hoisted(() => ({
  auth: { getUser: vi.fn() },
  from: vi.fn(),
}))

vi.mock('../lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: { auth, from },
}))

import {
  backupStudyData,
  getLatestBackupInfo,
  restoreLatestStudyData,
  summarizeStudyData,
} from '../lib/accountSync'

describe('account study-data sync', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    auth.getUser.mockResolvedValue({ data: { user: { id: 'user-1' } }, error: null })
  })

  it('backs up all local study data in one snapshot', async () => {
    localStorage.setItem(KEYS.progress, JSON.stringify({
      'comptia-net-plus': { quizHistory: [], examHistory: [] },
    }))
    localStorage.setItem(KEYS.questionStats, JSON.stringify({ 'comptia-net-plus': { q1: { attempts: 1 } } }))
    localStorage.setItem(KEYS.bookmarks, JSON.stringify({ 'comptia-net-plus': ['q1'] }))
    const insert = vi.fn().mockResolvedValue({ error: null })
    from.mockReturnValue({ insert })

    const createdAt = await backupStudyData()

    expect(from).toHaveBeenCalledWith('study_snapshots')
    expect(new Date(createdAt).toString()).not.toBe('Invalid Date')
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({
      user_id: 'user-1',
      schema_version: 1,
      snapshot: expect.objectContaining({
        progress: expect.any(Object),
        questionStats: expect.any(Object),
        bookmarks: expect.any(Object),
      }),
    }))
  })

  it('summarizes the study data included in a snapshot', () => {
    expect(summarizeStudyData({
      progress: {
        'comptia-net-plus': { quizHistory: [{ id: 1 }], examHistory: [{ id: 2 }] },
      },
      questionStats: {
        'comptia-net-plus': { q1: {}, q2: {} },
        'comptia-sec-plus': { q3: {} },
      },
      bookmarks: {
        'comptia-net-plus': ['q1'],
      },
    })).toEqual({
      certifications: 2,
      sessions: 2,
      trackedQuestions: 3,
      bookmarks: 1,
    })
  })

  it('reads the latest cloud backup metadata', async () => {
    const maybeSingle = vi.fn().mockResolvedValue({
      data: {
        created_at: '2026-06-23T20:00:00Z',
        snapshot: {
          progress: { 'comptia-net-plus': { quizHistory: [], examHistory: [] } },
          questionStats: { 'comptia-net-plus': { q1: {} } },
          bookmarks: {},
        },
      },
      error: null,
    })
    const limit = vi.fn().mockReturnValue({ maybeSingle })
    const order = vi.fn().mockReturnValue({ limit })
    const eq = vi.fn().mockReturnValue({ order })
    const select = vi.fn().mockReturnValue({ eq })
    from.mockReturnValue({ select })

    await expect(getLatestBackupInfo()).resolves.toEqual({
      createdAt: '2026-06-23T20:00:00Z',
      summary: {
        certifications: 1,
        sessions: 0,
        trackedQuestions: 1,
        bookmarks: 0,
      },
    })
  })

  it('restores the latest valid snapshot into local storage', async () => {
    const snapshot = {
      progress: { 'comptia-net-plus': { quizHistory: [], examHistory: [] } },
      questionStats: { 'comptia-net-plus': { q1: { attempts: 2 } } },
      bookmarks: { 'comptia-net-plus': ['q1'] },
    }
    const maybeSingle = vi.fn().mockResolvedValue({
      data: { snapshot, created_at: '2026-06-23T20:00:00Z' },
      error: null,
    })
    const limit = vi.fn().mockReturnValue({ maybeSingle })
    const order = vi.fn().mockReturnValue({ limit })
    const eq = vi.fn().mockReturnValue({ order })
    const select = vi.fn().mockReturnValue({ eq })
    from.mockReturnValue({ select })

    const restoredAt = await restoreLatestStudyData()

    expect(restoredAt).toBe('2026-06-23T20:00:00Z')
    expect(JSON.parse(localStorage.getItem(KEYS.progress))).toEqual(snapshot.progress)
    expect(JSON.parse(localStorage.getItem(KEYS.questionStats))).toEqual(snapshot.questionStats)
    expect(JSON.parse(localStorage.getItem(KEYS.bookmarks))).toEqual(snapshot.bookmarks)
  })
})
