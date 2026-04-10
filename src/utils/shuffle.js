/**
 * Fisher-Yates shuffle — returns a new shuffled array, does not mutate input.
 */
export function fisherYates(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Weighted random sample without replacement (Efraimidis-Spirakis algorithm).
 *
 * weightedItems: [{ q: question, weight: number }]
 *   weight = 1.0  → full probability (never seen, or always wrong)
 *   weight = 0.05 → low probability (consistently correct)
 *
 * Each item gets a random key = random() ** (1 / weight).
 * Higher weight → higher expected key → more likely to be selected.
 * Returns up to n question objects in random order.
 */
export function weightedSample(weightedItems, n) {
  return weightedItems
    .map(({ q, weight }) => ({
      q,
      key: Math.random() ** (1 / Math.max(weight, 0.001)),
    }))
    .sort((a, b) => b.key - a.key)
    .slice(0, n)
    .map(({ q }) => q)
}
