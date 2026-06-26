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
  getSyncInfo,
  restoreLatestStudyData,
  summarizeStudyData,
  syncStudyData,
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
      schema_version: 2,
      snapshot: expect.objectContaining({
        progress: expect.any(Object),
        questionStats: expect.any(Object),
        bookmarks: expect.any(Object),
      }),
    }))
  })

  it('can back up when browser storage blocks the device identifier', async () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage blocked')
    })
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage blocked')
    })
    const insert = vi.fn().mockResolvedValue({ error: null })
    from.mockReturnValue({ insert })

    await expect(backupStudyData()).resolves.toEqual(expect.any(String))
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({
      user_id: 'user-1',
      source_device_id: expect.stringMatching(/^device-|^[0-9a-f-]{36}$/i),
    }))

    getItem.mockRestore()
    setItem.mockRestore()
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
    expect(JSON.parse(localStorage.getItem(KEYS.syncState))).toMatchObject({
      userId: 'user-1',
      lastSyncedAt: '2026-06-23T20:00:00Z',
      baseSnapshot: snapshot,
    })
  })

  it('merges the latest cloud snapshot with new local work and saves the new baseline', async () => {
    const baseSnapshot = {
      progress: { net: { quizHistory: [{ timestamp: 1 }], examHistory: [] } },
      questionStats: { net: { q1: { attempts: 2, correct: 1, lastSeen: 10 } } },
      bookmarks: { net: ['q1'] },
      bookmarkState: { net: { q1: { present: true, changedAt: 10 } } },
    }
    localStorage.setItem(KEYS.progress, JSON.stringify({
      net: { quizHistory: [{ timestamp: 1 }, { timestamp: 2 }], examHistory: [] },
    }))
    localStorage.setItem(KEYS.questionStats, JSON.stringify({
      net: { q1: { attempts: 3, correct: 2, lastSeen: 20 } },
    }))
    localStorage.setItem(KEYS.bookmarks, JSON.stringify({ net: ['q1'] }))
    localStorage.setItem(KEYS.bookmarkSyncState, JSON.stringify(baseSnapshot.bookmarkState))
    localStorage.setItem(KEYS.syncState, JSON.stringify({
      userId: 'user-1',
      lastSyncedAt: '2026-06-23T19:00:00Z',
      baseSnapshot,
    }))

    const remoteSnapshot = {
      ...baseSnapshot,
      progress: { net: { quizHistory: [{ timestamp: 1 }], examHistory: [{ timestamp: 3 }] } },
      questionStats: { net: { q1: { attempts: 4, correct: 2, lastSeen: 30 } } },
    }
    const maybeSingle = vi.fn().mockResolvedValue({
      data: {
        snapshot: remoteSnapshot,
        created_at: '2026-06-23T20:00:00Z',
        source_device_id: 'other-device',
      },
      error: null,
    })
    const remoteSelect = vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockReturnValue({ maybeSingle }),
        }),
      }),
    })
    const single = vi.fn().mockResolvedValue({
      data: { created_at: '2026-06-23T21:00:00Z' },
      error: null,
    })
    const insertSelect = vi.fn().mockReturnValue({ single })
    const insert = vi.fn().mockReturnValue({ select: insertSelect })
    from
      .mockReturnValueOnce({ select: remoteSelect })
      .mockReturnValueOnce({ insert })

    await expect(syncStudyData()).resolves.toMatchObject({
      syncedAt: '2026-06-23T21:00:00Z',
      summary: { sessions: 3, trackedQuestions: 1 },
    })

    const savedStats = JSON.parse(localStorage.getItem(KEYS.questionStats))
    expect(savedStats.net.q1).toMatchObject({ attempts: 5, correct: 3, lastSeen: 30 })
    const savedProgress = JSON.parse(localStorage.getItem(KEYS.progress))
    expect(savedProgress.net.quizHistory).toHaveLength(2)
    expect(savedProgress.net.examHistory).toHaveLength(1)
    expect(JSON.parse(localStorage.getItem(KEYS.syncState))).toMatchObject({
      userId: 'user-1',
      lastSyncedAt: '2026-06-23T21:00:00Z',
      baseSnapshot: { schemaVersion: 2 },
    })
  })

  it('reports the locally recorded last successful sync', async () => {
    localStorage.setItem(KEYS.syncState, JSON.stringify({
      userId: 'user-1',
      lastSyncedAt: '2026-06-23T21:00:00Z',
      baseSnapshot: {
        progress: { net: { quizHistory: [], examHistory: [] } },
        questionStats: {},
        bookmarks: {},
      },
    }))

    await expect(getSyncInfo()).resolves.toEqual({
      lastSyncedAt: '2026-06-23T21:00:00Z',
      summary: {
        certifications: 1,
        sessions: 0,
        trackedQuestions: 0,
        bookmarks: 0,
      },
    })
  })

  it('ignores a sync baseline created by a different signed-in account', async () => {
    localStorage.setItem(KEYS.syncState, JSON.stringify({
      userId: 'user-2',
      lastSyncedAt: '2026-06-23T21:00:00Z',
      baseSnapshot: {
        progress: { net: { quizHistory: [{ timestamp: 1 }], examHistory: [] } },
        questionStats: {},
        bookmarks: {},
      },
    }))

    await expect(getSyncInfo()).resolves.toBeNull()
  })
})
