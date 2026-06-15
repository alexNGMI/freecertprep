import { fisherYates } from './shuffle'

export const MASTERY_LEVELS = {
  strong: { label: 'Strong', color: '#34d399' },
  developing: { label: 'Developing', color: '#fbbf24' },
  weak: { label: 'Weak', color: '#fb7185' },
  unmeasured: { label: 'Not measured', color: '#71717a' },
}

export function selectDiagnosticQuestions(questions, objectives, count = 35) {
  if (!questions?.length || !objectives?.length) return []

  const selected = []
  const selectedIds = new Set()

  for (const objective of objectives) {
    const candidates = fisherYates(
      questions.filter(question => question.objectiveId === objective.id),
    )
    const question = candidates[0]
    if (!question) continue
    selected.push(question)
    selectedIds.add(question.id)
  }

  const remaining = fisherYates(
    questions.filter(question => !selectedIds.has(question.id)),
  )

  return fisherYates([...selected, ...remaining.slice(0, Math.max(0, count - selected.length))])
    .slice(0, count)
}

export function buildMasteryMap(questions, statsMap, objectives, now = Date.now()) {
  const questionsByObjective = new Map()
  for (const question of questions || []) {
    if (!questionsByObjective.has(question.objectiveId)) questionsByObjective.set(question.objectiveId, [])
    questionsByObjective.get(question.objectiveId).push(question)
  }

  return (objectives || []).map(objective => {
    const objectiveQuestions = questionsByObjective.get(objective.id) || []
    let attemptedQuestions = 0
    let attempts = 0
    let correct = 0
    let lastSeen = null

    for (const question of objectiveQuestions) {
      const stats = statsMap?.[question.id]
      if (!stats?.attempts) continue
      attemptedQuestions += 1
      attempts += stats.attempts
      correct += stats.correct
      lastSeen = Math.max(lastSeen || 0, stats.lastSeen || 0)
    }

    const accuracy = attempts ? Math.round((correct / attempts) * 100) : null
    const coverage = objectiveQuestions.length
      ? Math.round((attemptedQuestions / objectiveQuestions.length) * 100)
      : 0
    const recencyDays = lastSeen ? Math.floor((now - lastSeen) / (24 * 60 * 60 * 1000)) : null
    const confidence = Math.min(100, Math.round((attemptedQuestions / 3) * 100))
    const level = getMasteryLevel({ accuracy, attemptedQuestions, recencyDays })

    return {
      ...objective,
      totalQuestions: objectiveQuestions.length,
      attemptedQuestions,
      attempts,
      correct,
      accuracy,
      coverage,
      confidence,
      lastSeen,
      recencyDays,
      level,
    }
  })
}

export function getMasteryLevel({ accuracy, attemptedQuestions, recencyDays }) {
  if (!attemptedQuestions || accuracy === null) return 'unmeasured'
  const stalePenalty = recencyDays !== null && recencyDays > 30 ? 10 : 0
  const adjusted = accuracy - stalePenalty
  if (attemptedQuestions >= 3 && adjusted >= 80) return 'strong'
  if (adjusted >= 60) return 'developing'
  return 'weak'
}

export function buildStudyPlan(masteryMap, days = 14) {
  const candidates = [...(masteryMap || [])].sort((a, b) => {
    const levelPriority = { weak: 0, developing: 1, unmeasured: 2, strong: 3 }
    return levelPriority[a.level] - levelPriority[b.level]
      || (a.accuracy ?? -1) - (b.accuracy ?? -1)
      || a.coverage - b.coverage
  })

  const focus = candidates.filter(item => item.level !== 'strong')
  if (!focus.length) return []

  const blockCount = days <= 7 ? 7 : days <= 14 ? 10 : 15
  return Array.from({ length: blockCount }, (_, index) => {
    const objective = focus[index % focus.length]
    const practical = index % 4 === 3
    const reassessment = index === blockCount - 1
    return {
      day: Math.max(1, Math.round((index * (days - 1)) / Math.max(blockCount - 1, 1)) + 1),
      objectiveId: objective.id,
      objectiveTitle: objective.title,
      domain: objective.domain,
      level: objective.level,
      activity: reassessment
        ? 'Readiness checkpoint'
        : practical
          ? 'Case-based practice'
          : objective.level === 'unmeasured'
            ? 'Measure this objective'
            : 'Repair and review',
      questionTarget: reassessment ? 20 : practical ? 5 : 10,
      route: reassessment
        ? 'diagnostic'
        : practical
          ? 'cases'
          : `quiz?objective=${objective.id}`,
    }
  })
}

export function buildExamDebrief(answers, questions, objectives) {
  const byId = new Map((questions || []).map(question => [question.id, question]))
  const objectiveMap = new Map((objectives || []).map(objective => [
    objective.id,
    { ...objective, correct: 0, total: 0, practicalMisses: 0 },
  ]))
  const practicalTypes = new Set(['cli-output', 'topology-scenario', 'config-repair', 'subnetting-drill', 'matching', 'pbq-matching'])

  for (const answer of answers || []) {
    const question = byId.get(answer.questionId)
    const result = objectiveMap.get(question?.objectiveId)
    if (!result) continue
    result.total += 1
    if (answer.correct) result.correct += 1
    else if (practicalTypes.has(question.type)) result.practicalMisses += 1
  }

  const measured = [...objectiveMap.values()]
    .filter(result => result.total > 0)
    .map(result => ({
      ...result,
      accuracy: Math.round((result.correct / result.total) * 100),
      misses: result.total - result.correct,
    }))
    .sort((a, b) => b.misses - a.misses || a.accuracy - b.accuracy)

  return {
    priorities: measured.filter(result => result.misses > 0).slice(0, 3),
    practicalMisses: measured.reduce((sum, result) => sum + result.practicalMisses, 0),
    measuredObjectives: measured.length,
  }
}

export function selectCaseQuestions(questions, count = 10) {
  const practicalTypes = new Set(['cli-output', 'topology-scenario', 'config-repair', 'subnetting-drill', 'matching', 'pbq-matching'])
  const practical = questions.filter(question =>
    practicalTypes.has(question.type) || question.practicalCategory,
  )
  return fisherYates(practical).slice(0, count)
}
