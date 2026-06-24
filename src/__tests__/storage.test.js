import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  SCHEMA_VERSION,
  KEYS,
  readJSON,
  writeJSON,
  removeKey,
  migrate,
  subscribe,
  exportProgress,
  importProgressRaw,
  addQuestionIssueReport,
  readQuestionIssueReports,
  exportQuestionIssueReports,
} from '../utils/storage.js'

// Vitest runs in the node environment (no DOM), so we install a minimal
// in-memory localStorage and a tiny window event target. This keeps the
// test dependency-free and matches the existing pure-util test style.

function makeLS() {
  const map = new Map()
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => { map.set(k, String(v)) },
    removeItem: (k) => { map.delete(k) },
    clear: () => map.clear(),
    _map: map,
  }
}

function makeWindow() {
  const listeners = {}
  return {
    addEventListener: (type, fn) => { (listeners[type] ||= []).push(fn) },
    removeEventListener: (type, fn) => {
      listeners[type] = (listeners[type] || []).filter((f) => f !== fn)
    },
    _dispatch: (type, event) => (listeners[type] || []).forEach((fn) => fn(event)),
    _count: (type) => (listeners[type] || []).length,
  }
}

afterEach(() => {
  delete globalThis.localStorage
  delete globalThis.window
  vi.restoreAllMocks()
})

describe('storage: KEYS / version', () => {
  it('exposes the historical keys so existing data is preserved', () => {
    expect(KEYS.progress).toBe('freecertprep-progress')
    expect(KEYS.questionStats).toBe('freecertprep-question-stats-local')
    expect(KEYS.bookmarks).toBe('freecertprep-bookmarks')
    expect(KEYS.bookmarkSyncState).toBe('freecertprep-bookmark-sync-state')
    expect(KEYS.syncState).toBe('freecertprep-account-sync-state')
    expect(KEYS.issueReports).toBe('freecertprep-question-issue-reports-local')
    expect(SCHEMA_VERSION).toBeGreaterThanOrEqual(1)
  })
})

describe('storage: readJSON', () => {
  beforeEach(() => { globalThis.localStorage = makeLS() })

  it('returns the fallback when the key is missing', () => {
    expect(readJSON('absent', { a: 1 })).toEqual({ a: 1 })
  })

  it('parses and returns stored JSON', () => {
    globalThis.localStorage.setItem('k', JSON.stringify({ x: 2 }))
    expect(readJSON('k', null)).toEqual({ x: 2 })
  })

  it('returns the fallback on corrupt JSON instead of throwing', () => {
    globalThis.localStorage.setItem('k', '{not json')
    expect(readJSON('k', 'fb')).toBe('fb')
  })

  it('returns the fallback when localStorage is unavailable', () => {
    delete globalThis.localStorage
    expect(readJSON('k', 'fb')).toBe('fb')
  })
})

describe('storage: writeJSON', () => {
  beforeEach(() => { globalThis.localStorage = makeLS() })

  it('persists a value and returns true', () => {
    expect(writeJSON('k', { ok: true })).toBe(true)
    expect(JSON.parse(globalThis.localStorage.getItem('k'))).toEqual({ ok: true })
  })

  it('round-trips with readJSON', () => {
    writeJSON('k', [1, 2, 3])
    expect(readJSON('k', null)).toEqual([1, 2, 3])
  })

  it('returns false on QuotaExceededError without throwing', () => {
    globalThis.localStorage.setItem = () => {
      const e = new Error('quota')
      e.name = 'QuotaExceededError'
      throw e
    }
    expect(writeJSON('k', { big: 'x' })).toBe(false)
  })

  it('returns false when localStorage is unavailable', () => {
    delete globalThis.localStorage
    expect(writeJSON('k', 1)).toBe(false)
  })
})

describe('storage: removeKey', () => {
  beforeEach(() => { globalThis.localStorage = makeLS() })

  it('removes a key and never throws when absent', () => {
    writeJSON('k', 1)
    removeKey('k')
    expect(readJSON('k', 'gone')).toBe('gone')
    expect(() => removeKey('still-absent')).not.toThrow()
  })
})

describe('storage: migrate', () => {
  beforeEach(() => { globalThis.localStorage = makeLS() })

  it('stamps the schema version on first run', () => {
    migrate()
    expect(readJSON('freecertprep-schema-version', 0)).toBe(SCHEMA_VERSION)
  })

  it('is idempotent (second run is a no-op)', () => {
    migrate()
    const spy = vi.spyOn(globalThis.localStorage, 'setItem')
    migrate()
    expect(spy).not.toHaveBeenCalled()
  })

  it('does not downgrade a higher stored version', () => {
    globalThis.localStorage.setItem(
      'freecertprep-schema-version',
      JSON.stringify(SCHEMA_VERSION + 5),
    )
    migrate()
    expect(readJSON('freecertprep-schema-version', 0)).toBe(SCHEMA_VERSION + 5)
  })

  it('does nothing when storage is unavailable', () => {
    delete globalThis.localStorage
    expect(() => migrate()).not.toThrow()
  })
})

describe('storage: importProgressRaw', () => {
  beforeEach(() => { globalThis.localStorage = makeLS() })

  it('writes the raw string verbatim and returns ok', () => {
    const raw = '{"cert":{"quizHistory":[],"examHistory":[]}}'
    expect(importProgressRaw(raw)).toBe('ok')
    // Verbatim — not re-serialized.
    expect(globalThis.localStorage.getItem(KEYS.progress)).toBe(raw)
  })

  it('returns invalid for non-JSON without writing', () => {
    expect(importProgressRaw('{not json')).toBe('invalid')
    expect(globalThis.localStorage.getItem(KEYS.progress)).toBeNull()
  })

  it.each([
    ['null', null],
    ['an array', []],
    ['a primitive', 'progress'],
    ['a cert without history arrays', { cert: {} }],
    ['a history containing null', { cert: { quizHistory: [null], examHistory: [] } }],
    ['an answers field that is not an array', { cert: { quizHistory: [{ answers: {} }], examHistory: [] } }],
  ])('returns invalid for %s even though it is valid JSON', (_, value) => {
    expect(importProgressRaw(JSON.stringify(value))).toBe('invalid')
    expect(globalThis.localStorage.getItem(KEYS.progress)).toBeNull()
  })

  it('returns error when the write fails (quota)', () => {
    globalThis.localStorage.setItem = () => {
      const e = new Error('quota')
      e.name = 'QuotaExceededError'
      throw e
    }
    expect(importProgressRaw('{}')).toBe('error')
  })

  it('returns error when storage is unavailable', () => {
    delete globalThis.localStorage
    expect(importProgressRaw('{}')).toBe('error')
  })
})

describe('storage: exportProgress', () => {
  beforeEach(() => { globalThis.localStorage = makeLS() })

  it('returns false when document is unavailable (node)', () => {
    globalThis.localStorage.setItem(KEYS.progress, '{}')
    expect(exportProgress()).toBe(false)
  })

  it('builds a prefixed filename and triggers a download on success', () => {
    globalThis.localStorage.setItem(KEYS.progress, '{"a":1}')
    const click = vi.fn()
    const anchor = {}
    Object.defineProperty(anchor, 'click', { value: click })
    globalThis.document = { createElement: () => anchor }
    globalThis.Blob = class { constructor(parts) { this.parts = parts } }
    globalThis.URL = { createObjectURL: () => 'blob:x', revokeObjectURL: vi.fn() }
    try {
      expect(exportProgress('realestateprep')).toBe(true)
      expect(click).toHaveBeenCalledTimes(1)
      expect(anchor.download).toMatch(/^realestateprep-progress-\d{4}-\d{2}-\d{2}\.json$/)
    } finally {
      delete globalThis.document
      delete globalThis.Blob
      delete globalThis.URL
    }
  })
})

describe('storage: question issue reports', () => {
  beforeEach(() => { globalThis.localStorage = makeLS() })

  it('appends local question reports with workflow metadata', () => {
    expect(addQuestionIssueReport({
      certId: 'comptia-net-plus',
      questionId: 'net-1',
      domain: 'Troubleshooting',
      issueType: 'Answer seems wrong',
      notes: 'Please recheck the explanation.',
    })).toBe(true)

    const reports = readQuestionIssueReports()
    expect(reports).toHaveLength(1)
    expect(reports[0]).toMatchObject({
      certId: 'comptia-net-plus',
      questionId: 'net-1',
      status: 'local-new',
    })
    expect(reports[0].id).toMatch(/^issue-/)
    expect(reports[0].createdAt).toBeTruthy()
  })

  it('exports the local report queue as JSON', () => {
    addQuestionIssueReport({ certId: 'clf-c02', questionId: 'aws-1', domain: 'Cloud Concepts', issueType: 'Typo' })
    const click = vi.fn()
    const anchor = {}
    Object.defineProperty(anchor, 'click', { value: click })
    globalThis.document = { createElement: () => anchor }
    globalThis.Blob = class { constructor(parts) { this.parts = parts } }
    globalThis.URL = { createObjectURL: () => 'blob:x', revokeObjectURL: vi.fn() }
    try {
      expect(exportQuestionIssueReports()).toBe(true)
      expect(anchor.download).toMatch(/^freecertprep-question-issue-reports-\d{4}-\d{2}-\d{2}\.json$/)
      expect(click).toHaveBeenCalledTimes(1)
    } finally {
      delete globalThis.document
      delete globalThis.Blob
      delete globalThis.URL
    }
  })
})

describe('storage: subscribe (cross-tab)', () => {
  beforeEach(() => {
    globalThis.localStorage = makeLS()
    globalThis.window = makeWindow()
  })

  it('invokes the handler when the watched key changes in another tab', () => {
    const handler = vi.fn()
    subscribe(KEYS.progress, handler)
    globalThis.window._dispatch('storage', { key: KEYS.progress })
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('invokes the handler on storage clear (key === null)', () => {
    const handler = vi.fn()
    subscribe(KEYS.progress, handler)
    globalThis.window._dispatch('storage', { key: null })
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('ignores changes to unrelated keys', () => {
    const handler = vi.fn()
    subscribe(KEYS.progress, handler)
    globalThis.window._dispatch('storage', { key: 'some-other-key' })
    expect(handler).not.toHaveBeenCalled()
  })

  it('invokes the handler after a same-tab account sync', () => {
    const handler = vi.fn()
    subscribe(KEYS.progress, handler)
    globalThis.window._dispatch('freecertprep-storage-sync', {
      detail: { keys: [KEYS.progress, KEYS.bookmarks] },
    })
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('unsubscribe removes the listener', () => {
    const handler = vi.fn()
    const unsubscribe = subscribe(KEYS.progress, handler)
    expect(globalThis.window._count('storage')).toBe(1)
    unsubscribe()
    expect(globalThis.window._count('storage')).toBe(0)
    globalThis.window._dispatch('storage', { key: KEYS.progress })
    expect(handler).not.toHaveBeenCalled()
  })

  it('returns a no-op unsubscribe when there is no window', () => {
    delete globalThis.window
    const unsubscribe = subscribe(KEYS.progress, vi.fn())
    expect(typeof unsubscribe).toBe('function')
    expect(() => unsubscribe()).not.toThrow()
  })
})
