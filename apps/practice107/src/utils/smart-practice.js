export function computeQuestionWeight(stats) {
  if (!stats || stats.attempts === 0) return 1
  return Math.max(0.05, 1 - stats.correct / stats.attempts)
}

export function buildWeightedPool(questions, statsMap) {
  return questions.map((question) => ({
    q: question,
    weight: computeQuestionWeight(statsMap?.[question.id]),
  }))
}
