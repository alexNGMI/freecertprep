import { fisherYates } from './shuffle'

export const MASTERY_LEVELS = {
  strong: { label: 'Strong', color: '#34d399' },
  developing: { label: 'Developing', color: '#fbbf24' },
  weak: { label: 'Weak', color: '#fb7185' },
  unmeasured: { label: 'Not measured', color: '#71717a' },
}

export const PRACTICAL_TYPES = new Set(['cli-output', 'topology-scenario', 'config-repair', 'subnetting-drill', 'matching', 'pbq-matching'])

export function hasStudyBaseline(progress) {
  return Boolean(
    progress?.examHistory?.length
    || progress?.quizHistory?.some(session => session.kind === 'diagnostic'),
  )
}

export function selectDiagnosticQuestions(questions, objectives, count = 35) {
  if (!questions?.length || !objectives?.length) return []

  const selected = []
  const selectedIds = new Set()

  for (const objective of objectives) {
    const candidates = fisherYates(
      questions.filter(question => getQuestionObjectiveId(question, objectives) === objective.id),
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
    const objectiveId = getQuestionObjectiveId(question, objectives)
    if (!objectiveId) continue
    if (!questionsByObjective.has(objectiveId)) questionsByObjective.set(objectiveId, [])
    questionsByObjective.get(objectiveId).push(question)
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
    const evidenceStrength = Math.min(100, Math.round((attemptedQuestions / 3) * 100))
    const level = getMasteryLevel({ accuracy, attemptedQuestions, recencyDays })

    return {
      ...objective,
      totalQuestions: objectiveQuestions.length,
      attemptedQuestions,
      attempts,
      correct,
      accuracy,
      coverage,
      evidenceStrength,
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
              ? `Measure this ${objective.domainBacked ? 'domain' : 'objective'}`
              : 'Repair and review',
      questionTarget: reassessment ? 20 : practical ? 5 : 10,
      route: reassessment
        ? 'diagnostic'
        : practical
          ? 'cases'
          : `quiz?objective=${objective.id}`,
      reason: getStudyReason(objective, practical, reassessment),
    }
  })
}

export function buildExamDebrief(answers, questions, objectives) {
  const byId = new Map((questions || []).map(question => [question.id, question]))
  const objectiveMap = new Map((objectives || []).map(objective => [
    objective.id,
    { ...objective, correct: 0, total: 0, practicalMisses: 0 },
  ]))
  const answered = (answers || []).filter(isAnsweredResult)
  const appliedSummary = summarizeAppliedPerformance(answered, questions)

  for (const answer of answered) {
    const question = byId.get(answer.questionId)
    const result = objectiveMap.get(getQuestionObjectiveId(question, objectives))
    if (!result) continue
    result.total += 1
    if (answer.correct) result.correct += 1
    else if (isAppliedQuestion(question)) result.practicalMisses += 1
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
    practicalMisses: appliedSummary.missed,
    appliedSummary,
    measuredObjectives: measured.length,
    bestNext: measured.find(result => result.misses > 0) || null,
  }
}

export function selectCaseQuestions(questions, count = 10, objectives = []) {
  const practical = questions.filter(question => PRACTICAL_TYPES.has(question.type) || question.practicalCategory)
  const balancedPractical = selectBalancedAppliedQuestions(practical, count)
  const appliedCandidates = questions.filter(isAppliedQuestion)
  if (balancedPractical.length >= count) {
    return fisherYates(improveDomainCoverage(balancedPractical, appliedCandidates, count)).slice(0, count)
  }

  const selected = [...balancedPractical]
  const selectedIds = new Set(selected.map(question => question.id))
  const scenarioCandidates = fisherYates(
    questions.filter(question => !selectedIds.has(question.id) && isScenarioLike(question)),
  )

  for (const objective of objectives || []) {
    if (selected.length >= count) break
    const candidate = scenarioCandidates.find(question =>
      !selectedIds.has(question.id) && getQuestionObjectiveId(question, objectives) === objective.id
    )
    if (!candidate) continue
    selected.push(candidate)
    selectedIds.add(candidate.id)
  }

  if (selected.length < count) {
    for (const candidate of scenarioCandidates) {
      if (selected.length >= count) break
      if (selectedIds.has(candidate.id)) continue
      selected.push(candidate)
      selectedIds.add(candidate.id)
    }
  }

  if (selected.length < count) {
    for (const candidate of fisherYates(questions.filter(question => !selectedIds.has(question.id)))) {
      if (selected.length >= count) break
      selected.push(candidate)
      selectedIds.add(candidate.id)
    }
  }

  return fisherYates(improveDomainCoverage(selected, appliedCandidates, count)).slice(0, count)
}

export function summarizeAppliedPerformance(answers, questions) {
  const byId = new Map((questions || []).map(question => [question.id, question]))
  const categories = {}
  let total = 0
  let missed = 0

  for (const answer of answers || []) {
    const question = byId.get(answer.questionId)
    if (!isAppliedQuestion(question)) continue
    const category = getAppliedCategory(question)
    if (!categories[category]) categories[category] = { total: 0, missed: 0, correct: 0 }
    total += 1
    categories[category].total += 1
    if (answer.correct) {
      categories[category].correct += 1
    } else {
      missed += 1
      categories[category].missed += 1
    }
  }

  return {
    total,
    missed,
    categories: Object.entries(categories)
      .map(([category, stats]) => ({
        category,
        ...stats,
        accuracy: stats.total ? Math.round((stats.correct / stats.total) * 100) : null,
      }))
      .sort((a, b) => b.missed - a.missed || b.total - a.total || a.category.localeCompare(b.category)),
  }
}

export function isAppliedQuestion(question) {
  return !!question && (PRACTICAL_TYPES.has(question.type) || !!question.practicalCategory || isScenarioLike(question))
}

export function getAppliedCategory(question) {
  if (!question) return 'Applied reasoning'
  if (question.practicalCategory) return humanize(question.practicalCategory)
  if (question.type === 'cli-output') return 'CLI output'
  if (question.type === 'topology-scenario') return 'Topology scenario'
  if (question.type === 'config-repair') return 'Config repair'
  if (question.type === 'subnetting-drill') return 'Subnetting drill'
  if (question.type === 'matching' || question.type === 'pbq-matching') return 'Matching simulation'
  return 'Scenario reasoning'
}

export function getQuestionObjectiveId(question, objectives = []) {
  if (!question) return null
  if (question.objectiveId) return question.objectiveId
  return objectives.find(objective => objective.domainBacked && objective.domain === question.domain)?.id || null
}

function selectBalancedAppliedQuestions(questions, count) {
  const buckets = new Map()
  for (const question of fisherYates(questions || [])) {
    const category = getAppliedCategory(question)
    if (!buckets.has(category)) buckets.set(category, [])
    buckets.get(category).push(question)
  }

  const selected = []
  while (selected.length < count && [...buckets.values()].some(bucket => bucket.length)) {
    for (const bucket of buckets.values()) {
      if (selected.length >= count) break
      const question = bucket.shift()
      if (question) selected.push(question)
    }
  }
  return selected
}

function improveDomainCoverage(selected, candidates, count) {
  const targetDomainCount = Math.min(3, new Set(candidates.map(question => question.domain).filter(Boolean)).size, count)
  if (targetDomainCount <= 1) return selected

  const result = selected.slice(0, count)
  const selectedIds = new Set(result.map(question => question.id))

  while (new Set(result.map(question => question.domain).filter(Boolean)).size < targetDomainCount) {
    const currentDomains = new Set(result.map(question => question.domain).filter(Boolean))
    const missingDomain = [...new Set(candidates.map(question => question.domain).filter(Boolean))]
      .find(domain => !currentDomains.has(domain))
    if (!missingDomain) break

    const candidate = fisherYates(candidates)
      .find(question => question.domain === missingDomain && !selectedIds.has(question.id))
    if (!candidate) break

    const domainCounts = result.reduce((counts, question) => {
      counts[question.domain] = (counts[question.domain] || 0) + 1
      return counts
    }, {})
    const swapIndex = result.findIndex(question => domainCounts[question.domain] > 1)
    if (swapIndex === -1) break

    selectedIds.delete(result[swapIndex].id)
    result[swapIndex] = candidate
    selectedIds.add(candidate.id)
  }

  return result
}

function getStudyReason(objective, practical, reassessment) {
  if (reassessment) return 'Check whether the repair work held under mixed objectives.'
  if (practical) return 'Convert topic recall into troubleshooting and decision practice.'
  if (objective.level === 'weak') return 'Lowest evidence first: repair misses before widening scope.'
  if (objective.level === 'developing') return 'Strengthen the evidence with another focused pass.'
  if (objective.level === 'unmeasured') return 'Collect evidence so this target is no longer a blind spot.'
  return 'Keep the target warm with a short review block.'
}

function isAnsweredResult(answer) {
  return answer?.complete !== false && answer?.selected !== -1
}

function humanize(value) {
  return String(value)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

function isScenarioLike(question) {
  const text = `${question?.question || ''} ${question?.explanation || ''}`.toLowerCase()
  return /\b(company|organization|team|user|customer|workload|application|needs|wants|must|should|requires|scenario|investigation|analyst|administrator)\b/.test(text)
}
