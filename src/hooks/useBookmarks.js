import { useState, useCallback, useMemo } from 'react'

const STORAGE_KEY = 'freecertprep-bookmarks'

function loadBookmarks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function saveBookmarks(bookmarks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
}

export function useBookmarks(certId) {
  const [bookmarks, setBookmarks] = useState(loadBookmarks)

  const certBookmarks = useMemo(() => bookmarks[certId] || [], [bookmarks, certId])

  const toggle = useCallback((questionId) => {
    setBookmarks(prev => {
      const current = prev[certId] || []
      const next = current.includes(questionId)
        ? current.filter(id => id !== questionId)
        : [...current, questionId]
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
      const updated = { ...prev, [certId]: [] }
      saveBookmarks(updated)
      return updated
    })
  }, [certId])

  return { bookmarkedIds: certBookmarks, toggle, isBookmarked, clearBookmarks }
}
