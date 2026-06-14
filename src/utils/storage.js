// Centralized localStorage access.
//
// Every piece of persisted progress (quiz/exam history, per-question Smart
// Practice stats, bookmarks) goes through this module so that:
//   1. Quota failures, unavailable storage, and corrupt JSON are handled in
//      ONE guarded path instead of three bespoke try/catch blocks.
//   2. There is a schema version + idempotent migration seam. This is also
//      the contained swap point for a future accounts/sync backend: replace
//      readJSON/writeJSON/subscribe with a remote adapter and the hooks
//      (whose public APIs are unchanged) don't care.
//   3. Multiple browser tabs stay in sync via the `storage` event.
//
// Import-safe: nothing here touches localStorage at module load, so node
// tests can import it freely. migrate() is called explicitly from main.jsx.

export const SCHEMA_VERSION = 1

const VERSION_KEY = 'freecertprep-schema-version'

// The canonical storage keys. Keeping the historical names means existing
// users' data is preserved with no migration needed for v1.
export const KEYS = {
  progress: 'freecertprep-progress',
  questionStats: 'freecertprep-question-stats-local',
  bookmarks: 'freecertprep-bookmarks',
}

// Accessing localStorage can itself throw (Safari private mode, disabled
// storage), so even obtaining the handle is guarded.
function getLS() {
  try {
    return globalThis.localStorage ?? null
  } catch {
    return null
  }
}

/** Read and JSON-parse a key. Returns `fallback` on missing/corrupt/unavailable. */
export function readJSON(key, fallback) {
  const ls = getLS()
  if (!ls) return fallback
  try {
    const raw = ls.getItem(key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

/**
 * JSON-serialize and write a key. Fails soft: returns `true` on success and
 * `false` on any failure (QuotaExceededError, storage unavailable, cyclic
 * value) so callers never crash on a write.
 */
export function writeJSON(key, value) {
  const ls = getLS()
  if (!ls) return false
  try {
    ls.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/** Remove a key. Never throws. */
export function removeKey(key) {
  const ls = getLS()
  if (!ls) return
  try {
    ls.removeItem(key)
  } catch {
    /* ignore */
  }
}

/**
 * Idempotent schema migration. Call once at app startup (main.jsx), never at
 * import. Current persisted data is unversioned and IS the v1 baseline, so v1
 * just stamps the version. When the stored shape changes later, bump
 * SCHEMA_VERSION and add a step:
 *
 *   for (let v = current; v < SCHEMA_VERSION; v++) applyStep(v)
 */
export function migrate() {
  const ls = getLS()
  if (!ls) return
  const current = Number(readJSON(VERSION_KEY, 0)) || 0
  if (current >= SCHEMA_VERSION) return
  // No structural migrations yet — existing data already matches v1.
  writeJSON(VERSION_KEY, SCHEMA_VERSION)
}

/**
 * Trigger a browser download of the raw persisted progress as a JSON file.
 * Browser-only (Blob/URL/document); returns false when unavailable or on any
 * failure. `filenamePrefix` distinguishes the two surfaces (freecertprep vs
 * realestateprep). Shared by Dashboard and REDashboard.
 */
export function exportProgress(filenamePrefix = 'freecertprep') {
  const ls = getLS()
  if (!ls || typeof document === 'undefined' || typeof URL === 'undefined') return false
  try {
    const data = ls.getItem(KEYS.progress) || '{}'
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filenamePrefix}-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    return true
  } catch {
    return false
  }
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function isValidProgressData(value) {
  if (!isPlainObject(value)) return false

  return Object.values(value).every((certProgress) => {
    if (!isPlainObject(certProgress)) return false
    if (!Array.isArray(certProgress.quizHistory) || !Array.isArray(certProgress.examHistory)) return false

    return [...certProgress.quizHistory, ...certProgress.examHistory].every((session) => {
      if (!isPlainObject(session)) return false
      if (session.answers === undefined) return true
      return Array.isArray(session.answers) && session.answers.every(isPlainObject)
    })
  })
}

/**
 * Validate and persist a raw progress-JSON string from an imported file.
 * Writes the raw string verbatim (not re-serialized) to preserve exact
 * round-trip behavior. Returns:
 *   'ok'      — written
 *   'invalid' — not parseable JSON
 *   'error'   — storage unavailable or write failed (e.g. quota)
 * Shared by Dashboard and REDashboard.
 */
export function importProgressRaw(raw) {
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    return 'invalid'
  }
  if (!isValidProgressData(parsed)) return 'invalid'
  const ls = getLS()
  if (!ls) return 'error'
  try {
    ls.setItem(KEYS.progress, raw)
    return 'ok'
  } catch {
    return 'error'
  }
}

/**
 * Cross-tab sync. Invokes `handler` (with no arguments — the caller re-reads
 * its own slice) when another tab writes `key`, or when storage is cleared
 * (the `storage` event reports key === null for clear()).
 *
 * The browser only dispatches `storage` in OTHER documents, never the tab
 * that performed the write, so this cannot feedback-loop. Returns an
 * unsubscribe function; a no-op when there is no window (tests/SSR).
 */
export function subscribe(key, handler) {
  const w = globalThis.window
  if (!w || typeof w.addEventListener !== 'function') return () => {}
  const listener = (e) => {
    if (e.key === key || e.key === null) handler()
  }
  w.addEventListener('storage', listener)
  return () => w.removeEventListener('storage', listener)
}
