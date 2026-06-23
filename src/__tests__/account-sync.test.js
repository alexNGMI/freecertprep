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

import { backupStudyData, restoreLatestStudyData } from '../lib/accountSync'

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

    await backupStudyData()

    expect(from).toHaveBeenCalledWith('study_snapshots')
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
