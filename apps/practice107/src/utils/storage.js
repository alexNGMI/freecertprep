function storage() {
  try {
    return globalThis.localStorage ?? null
  } catch {
    return null
  }
}

export function readStoredFlag(key) {
  const target = storage()
  if (!target) return false
  try {
    return target.getItem(key) === 'true'
  } catch {
    return false
  }
}

export function writeStoredFlag(key, value) {
  const target = storage()
  if (!target) return false
  try {
    target.setItem(key, value ? 'true' : 'false')
    return true
  } catch {
    return false
  }
}

export function readStoredJSON(key, fallback) {
  const target = storage()
  if (!target) return fallback
  try {
    const value = target.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function writeStoredJSON(key, value) {
  const target = storage()
  if (!target) return false
  try {
    target.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
