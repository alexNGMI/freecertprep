import { fisherYates } from './shuffle.js'

export function weightedSelect(questions, count, domains, options = {}) {
  const allowedTypes = options.allowedQuestionTypes?.length
    ? new Set(options.allowedQuestionTypes)
    : null
  const eligible = allowedTypes
    ? questions.filter((question) => allowedTypes.has(question.type || 'single-choice'))
    : questions

  if (!domains?.length) return fisherYates(eligible).slice(0, count)

  const allocations = allocateByLargestRemainder(count, domains)
  const uniqueKey = typeof options.uniqueKey === 'function' ? options.uniqueKey : null
  const usedUniqueKeys = new Set()
  const picked = []

  for (const { name, alloc } of allocations) {
    const pool = fisherYates(eligible.filter((question) => question.domain === name))
    picked.push(...takeUnique(pool, alloc, usedUniqueKeys, uniqueKey))
  }

  if (picked.length < count) {
    const pickedIds = new Set(picked.map((question) => question.id))
    const remaining = fisherYates(eligible.filter((question) => !pickedIds.has(question.id)))
    picked.push(...takeUnique(remaining, count - picked.length, usedUniqueKeys, uniqueKey))
  }

  return fisherYates(picked).slice(0, count)
}

function allocateByLargestRemainder(count, domains) {
  const rows = domains.map((domain) => {
    const exact = (domain.weight / 100) * count
    const alloc = Math.floor(exact)
    return {
      name: domain.name,
      alloc,
      remainder: exact - alloc,
    }
  })

  let remaining = count - rows.reduce((sum, row) => sum + row.alloc, 0)
  for (const row of [...rows].sort((a, b) => b.remainder - a.remainder)) {
    if (remaining <= 0) break
    row.alloc += 1
    remaining -= 1
  }

  return rows
}

function takeUnique(pool, count, usedUniqueKeys, uniqueKey) {
  const selected = []
  const selectedIds = new Set()

  for (const question of pool) {
    if (selected.length >= count) break
    const key = uniqueKey?.(question)
    if (key && usedUniqueKeys.has(key)) continue
    selected.push(question)
    selectedIds.add(question.id)
    if (key) usedUniqueKeys.add(key)
  }

  for (const question of pool) {
    if (selected.length >= count) break
    if (selectedIds.has(question.id)) continue
    selected.push(question)
    selectedIds.add(question.id)
    const key = uniqueKey?.(question)
    if (key) usedUniqueKeys.add(key)
  }

  return selected
}
