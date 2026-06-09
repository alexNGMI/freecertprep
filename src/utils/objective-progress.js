const DAY = 24 * 60 * 60 * 1000

export function summarizeObjectiveProgress(questions, statsMap, objectives) {
  if (!objectives?.length) return []

  const byObjective = new Map(objectives.map(objective => [
    objective.id,
    { ...objective, totalQuestions: 0, attemptedQuestions: 0, attempts: 0, correct: 0 },
  ]))

  for (const question of questions) {
    const summary = byObjective.get(question.objectiveId)
    if (!summary) continue
    summary.totalQuestions += 1
    const stats = statsMap?.[question.id]
    if (!stats?.attempts) continue
    summary.attemptedQuestions += 1
    summary.attempts += stats.attempts
    summary.correct += stats.correct
  }

  return [...byObjective.values()].map(summary => ({
    ...summary,
    accuracy: summary.attempts ? Math.round((summary.correct / summary.attempts) * 100) : null,
    coverage: summary.totalQuestions
      ? Math.round((summary.attemptedQuestions / summary.totalQuestions) * 100)
      : 0,
  }))
}

export function rankWeakObjectives(summaries) {
  return summaries
    .filter(summary => summary.attempts > 0)
    .sort((a, b) =>
      a.accuracy - b.accuracy
      || a.coverage - b.coverage
      || b.attempts - a.attempts
    )
}

export function getRecentMissQuestions(questions, statsMap, limit = 50) {
  return questions
    .filter(question => {
      const stats = statsMap?.[question.id]
      return stats?.attempts > stats?.correct
    })
    .sort((a, b) => (statsMap[b.id]?.lastSeen || 0) - (statsMap[a.id]?.lastSeen || 0))
    .slice(0, limit)
}

export function getDueReviewQuestions(questions, statsMap, now = Date.now()) {
  return questions.filter(question => {
    const stats = statsMap?.[question.id]
    if (!stats?.attempts || !stats.lastSeen) return false
    const accuracy = stats.correct / stats.attempts
    const reviewAfter = accuracy < 0.5 ? DAY : accuracy < 0.8 ? 3 * DAY : 7 * DAY
    return now - stats.lastSeen >= reviewAfter
  })
}
