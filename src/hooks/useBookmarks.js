import { useState, useEffect, useCallback, useMemo } from 'react'
import { KEYS, readJSON, writeJSON, subscribe } from '../utils/storage.js'

const STORAGE_KEY = KEYS.bookmarks
const SYNC_STATE_KEY = KEYS.bookmarkSyncState

function loadBookmarks() {
  return readJSON(STORAGE_KEY, {})
}

function saveBookmarks(bookmarks) {
  writeJSON(STORAGE_KEY, bookmarks)
}

function recordBookmarkChange(certId, questionId, present) {
  const state = readJSON(SYNC_STATE_KEY, {})
  writeJSON(SYNC_STATE_KEY, {
    ...state,
    [certId]: {
      ...(state[certId] || {}),
      [questionId]: { present, changedAt: Date.now() },
    },
  })
}

export function useBookmarks(certId) {
  const [bookmarks, setBookmarks] = useState(loadBookmarks)

  // Keep this tab in sync if another tab toggles bookmarks (or clears storage).
  useEffect(
    () => subscribe(STORAGE_KEY, () => setBookmarks(loadBookmarks())),
    [],
  )

  const certBookmarks = useMemo(() => bookmarks[certId] || [], [bookmarks, certId])

  const toggle = useCallback((questionId) => {
    setBookmarks(prev => {
      const current = prev[certId] || []
      const next = current.includes(questionId)
        ? current.filter(id => id !== questionId)
        : [...current, questionId]
      recordBookmarkChange(certId, questionId, !current.includes(questionId))
      const updated = { ...prev, [certId]: next }
      saveBookmarks(updated)
      return updated
    })
  }, [certId])

  const isBookmarked = useCallback((questionId) => {
    return certBookmarks.includes(questionId)
  }, [certBookmarks])

  const clearBookmarks = useCallback(() => {
    setBookmarks(prev => {
      const current = prev[certId] || []
      current.forEach(questionId => recordBookmarkChange(certId, questionId, false))
      const updated = { ...prev, [certId]: [] }
      saveBookmarks(updated)
      return updated
    })
  }, [certId])

  return { bookmarkedIds: certBookmarks, toggle, isBookmarked, clearBookmarks }
}
