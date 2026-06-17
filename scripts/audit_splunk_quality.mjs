import fs from 'node:fs'
import { weightedSelect } from '../src/utils/exam-selection.js'

const questions = JSON.parse(fs.readFileSync(new URL('../src/data/splunk-core-certified-user-questions.json', import.meta.url), 'utf8'))

const domains = [
  { name: 'Splunk Basics', weight: 5 },
  { name: 'Basic Searching', weight: 22 },
  { name: 'Using Fields in Searches', weight: 20 },
  { name: 'Search Language Fundamentals', weight: 15 },
  { name: 'Using Basic Transforming Commands', weight: 15 },
  { name: 'Creating Reports and Dashboards', weight: 12 },
  { name: 'Creating and Using Lookups', weight: 6 },
  { name: 'Creating Scheduled Reports and Alerts', weight: 5 },
]
const expectedDomainCounts = {
  'Splunk Basics': 38,
  'Basic Searching': 165,
  'Using Fields in Searches': 150,
  'Search Language Fundamentals': 113,
  'Using Basic Transforming Commands': 112,
  'Creating Reports and Dashboards': 90,
  'Creating and Using Lookups': 45,
  'Creating Scheduled Reports and Alerts': 37,
}
const expectedFormDomainCounts = {
  'Splunk Basics': 3,
  'Basic Searching': 13,
  'Using Fields in Searches': 12,
  'Search Language Fundamentals': 9,
  'Using Basic Transforming Commands': 9,
  'Creating Reports and Dashboards': 7,
  'Creating and Using Lookups': 4,
  'Creating Scheduled Reports and Alerts': 3,
}
const expectedTypeCounts = {
  'single-choice': 592,
  'multiple-response': 98,
  matching: 41,
  ordering: 19,
}

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }
const typeOf = (question) => question.type || 'single-choice'
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const wordCount = (value) => normalize(value || '').split(/\s+/).filter(Boolean).length
const countBy = (items, key) => items.reduce((counts, item) => {
  const value = key(item)
  counts[value] = (counts[value] || 0) + 1
  return counts
}, {})
const duplicateGroups = (items, key) => {
  const groups = new Map()
  for (const item of items) {
    const value = key(item)
    groups.set(value, [...(groups.get(value) || []), item.id])
  }
  return [...groups.values()].filter((ids) => ids.length > 1)
}
const isPermutation = (values, length) => (
  Array.isArray(values)
  && values.length === length
  && new Set(values).size === length
  && values.every((value) => Number.isInteger(value) && value >= 0 && value < length)
)
const isUniqueIndexArray = (values, maxLength, minLength = 1) => (
  Array.isArray(values)
  && values.length >= minLength
  && new Set(values).size === values.length
  && values.every((value) => Number.isInteger(value) && value >= 0 && value < maxLength)
)

function hasValidEvidence(question) {
  if (!question.evidenceArtifacts?.length) return false
  return question.evidenceArtifacts.every((artifact) => {
    if (!artifact.title || !['console', 'table'].includes(artifact.type)) return false
    if (artifact.type === 'console') return Array.isArray(artifact.lines) && artifact.lines.length >= 2
    return Array.isArray(artifact.columns)
      && artifact.columns.length >= 2
      && Array.isArray(artifact.rows)
      && artifact.rows.length >= 1
  })
}

function hasValidAnswerShape(question) {
  const type = typeOf(question)
  if (type === 'single-choice') {
    return Array.isArray(question.choices)
      && question.choices.length === 4
      && Number.isInteger(question.correctAnswer)
      && question.correctAnswer >= 0
      && question.correctAnswer < question.choices.length
  }
  if (type === 'multiple-response') {
    return Array.isArray(question.choices)
      && question.choices.length >= 4
      && isUniqueIndexArray(question.correctAnswers, question.choices.length, 2)
  }
  if (type === 'matching') {
    return Array.isArray(question.itemsLeft)
      && Array.isArray(question.itemsRight)
      && question.itemsLeft.length === question.itemsRight.length
      && question.itemsLeft.length >= 3
      && isPermutation(question.correctMatches, question.itemsLeft.length)
  }
  if (type === 'ordering') {
    return Array.isArray(question.items)
      && question.items.length >= 4
      && isPermutation(question.correctOrder, question.items.length)
  }
  return false
}

const domainCounts = Object.fromEntries(Object.keys(expectedDomainCounts).map((domain) => [
  domain,
  questions.filter((question) => question.domain === domain).length,
]))
const typeCounts = Object.fromEntries(Object.keys(expectedTypeCounts).map((type) => [
  type,
  questions.filter((question) => typeOf(question) === type).length,
]))
const exactGroups = duplicateGroups(questions, (question) => normalize(question.question))
const officialStyleQuestions = questions.filter((question) => ['single-choice', 'multiple-response'].includes(typeOf(question)))
const learningDrills = questions.filter((question) => ['matching', 'ordering'].includes(typeOf(question)))
const structuredExplanations = questions.filter((question) =>
  /^Why this is right:.*Why the alternatives are wrong:.*Review takeaway:/s.test(question.explanation || '')
)
const evidenceQuestions = questions.filter(hasValidEvidence)
const shortExplanations = questions.filter((question) => wordCount(question.explanation) < 45)
const invalidAnswers = questions.filter((question) => !hasValidAnswerShape(question))

assert(questions.length === 750, `expected 750 Splunk questions, found ${questions.length}`)
assert(exactGroups.length === 0, `found ${exactGroups.length} exact duplicate-stem groups`)
assert(officialStyleQuestions.length === 690, `expected 690 official-style selected-response questions, found ${officialStyleQuestions.length}`)
assert(learningDrills.length === 60, `expected 60 supplemental matching/ordering drills, found ${learningDrills.length}`)
assert(structuredExplanations.length === 750, `expected 750 structured explanations, found ${structuredExplanations.length}`)
assert(evidenceQuestions.length === 690, `expected 690 evidence-led selected-response questions, found ${evidenceQuestions.length}`)
assert(shortExplanations.length === 0, `found ${shortExplanations.length} explanations under 45 words`)
assert(invalidAnswers.length === 0, `found ${invalidAnswers.length} questions with invalid answer metadata`)
assert(JSON.stringify(domainCounts) === JSON.stringify(expectedDomainCounts), 'Splunk domain counts changed unexpectedly')
assert(JSON.stringify(typeCounts) === JSON.stringify(expectedTypeCounts), 'Splunk format counts changed unexpectedly')

for (let run = 0; run < 500; run += 1) {
  const form = weightedSelect(questions, 60, domains, {
    allowedQuestionTypes: ['single-choice', 'multiple-response'],
  })
  const ids = new Set(form.map((question) => question.id))
  const formDomains = countBy(form, (question) => question.domain)
  const formTypes = countBy(form, (question) => typeOf(question))
  assert(form.length === 60, `form ${run + 1} has ${form.length} questions`)
  assert(ids.size === 60, `form ${run + 1} contains duplicate questions`)
  assert(!formTypes.matching && !formTypes.ordering, `form ${run + 1} includes supplemental learning drills`)
  for (const [domain, expected] of Object.entries(expectedFormDomainCounts)) {
    assert(formDomains[domain] === expected, `form ${run + 1} has wrong ${domain} allocation`)
  }
}

console.log(`Questions: ${questions.length}`)
console.log(`Official-style selected-response questions: ${officialStyleQuestions.length}`)
console.log(`Supplemental learning drills: ${learningDrills.length}`)
console.log(`Exact duplicate groups: ${exactGroups.length}`)
console.log(`Structured explanations: ${structuredExplanations.length}`)
console.log(`Evidence-led selected-response questions: ${evidenceQuestions.length}`)
console.log(`Explanations under 45 words: ${shortExplanations.length}`)
console.log(`Invalid answer metadata: ${invalidAnswers.length}`)
console.log(`Domain allocation: ${JSON.stringify(domainCounts)}`)
console.log(`Format allocation: ${JSON.stringify(typeCounts)}`)
console.log('Validated randomized 60-question selected-response forms: 500')

if (failures.length) {
  console.error('\nFailures:')
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`)
  process.exitCode = 1
}
