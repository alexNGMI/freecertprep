export function fisherYates(items) {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]]
  }
  return shuffled
}

export function weightedSample(weightedItems, count) {
  return weightedItems
    .map(({ q, weight }) => ({
      q,
      key: Math.random() ** (1 / Math.max(weight, 0.001)),
    }))
    .sort((a, b) => b.key - a.key)
    .slice(0, count)
    .map(({ q }) => q)
}
