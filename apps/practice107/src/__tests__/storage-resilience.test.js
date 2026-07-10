import { afterEach, describe, expect, it } from 'vitest'
import {
  readStoredFlag,
  readStoredJSON,
  writeStoredFlag,
  writeStoredJSON,
} from '../utils/storage.js'

const originalStorage = globalThis.localStorage

afterEach(() => {
  if (originalStorage === undefined) delete globalThis.localStorage
  else globalThis.localStorage = originalStorage
})

describe('Practice107 local storage resilience', () => {
  it('reads and writes flags and JSON when storage is available', () => {
    const values = new Map()
    globalThis.localStorage = {
      getItem: key => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    }

    expect(writeStoredFlag('flag', true)).toBe(true)
    expect(readStoredFlag('flag')).toBe(true)
    expect(writeStoredJSON('data', { ok: true })).toBe(true)
    expect(readStoredJSON('data', {})).toEqual({ ok: true })
  })

  it('fails softly when browser storage is blocked', () => {
    globalThis.localStorage = {
      getItem: () => { throw new Error('blocked') },
      setItem: () => { throw new Error('blocked') },
    }

    expect(readStoredFlag('flag')).toBe(false)
    expect(readStoredJSON('data', { fallback: true })).toEqual({ fallback: true })
    expect(writeStoredFlag('flag', true)).toBe(false)
    expect(writeStoredJSON('data', { ok: true })).toBe(false)
  })
})
