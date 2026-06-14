import fs from 'node:fs'
import { weightedSelect } from '../src/utils/exam-selection.js'

const questions = JSON.parse(fs.readFileSync(new URL('../src/data/comptia-net-plus-questions.json', import.meta.url), 'utf8'))
const domains = [
  { name: 'Networking Concepts', weight: 23 },
  { name: 'Network Implementation', weight: 20 },
  { name: 'Network Operations', weight: 19 },
  { name: 'Network Security', weight: 14 },
  { name: 'Network Troubleshooting', weight: 24 },
]
const objectiveIds = [
  '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8',
  '2.1', '2.2', '2.3', '2.4', '3.1', '3.2', '3.3', '3.4',
  '3.5', '4.1', '4.2', '4.3', '4.4', '4.5', '5.1', '5.2',
  '5.3', '5.4', '5.5',
]
const practicalTypes = new Set(['pbq-matching', 'cli-output', 'topology-scenario', 'config-repair'])
const requiredCategories = ['cable-mapping', 'routing-analysis', 'wireless-survey', 'multi-artifact-troubleshooting']
const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const canonicalize = (value) => normalize(value)
  .replace(/\b(?:branch|site|office|review|phase|wave)\s+\d+\b/g, 'location #')
  .replace(/\b(?:\d{1,3}\.){3}\d{1,3}(?:\/\d{1,2})?\b/g, '<ip>')
  .replace(/\b\d+\b/g, '#')
const wordCount = (value) => normalize(value).split(/\s+/).filter(Boolean).length
const groupBy = (key) => {
  const groups = new Map()
  for (const question of questions) {
    const value = key(question)
    groups.set(value, [...(groups.get(value) || []), question.id])
  }
  return groups
}

const exactGroups = [...groupBy((question) => normalize(question.question)).values()].filter((ids) => ids.length > 1)
const templateGroups = [...groupBy((question) => canonicalize(question.question)).values()].filter((ids) => ids.length > 1)
const templateQuestions = templateGroups.reduce((sum, ids) => sum + ids.length, 0)
const objectiveCounts = Object.fromEntries(objectiveIds.map((id) => [id, questions.filter((q) => q.objectiveId === id).length]))
const typeCounts = questions.reduce((counts, question) => {
  const type = question.type || 'single-choice'
  counts[type] = (counts[type] || 0) + 1
  return counts
}, {})
const correctPositions = questions.reduce((counts, question) => {
  if (Number.isInteger(question.correctAnswer)) counts[question.correctAnswer] = (counts[question.correctAnswer] || 0) + 1
  return counts
}, {})

assert(questions.length === 760, `expected 760 questions, found ${questions.length}`)
assert(exactGroups.length === 0, `found ${exactGroups.length} normalized duplicate-stem groups`)
assert(templateQuestions <= 91, `found ${templateQuestions} questions in repeated scenario-template groups (baseline maximum 91)`)
assert(!questions.some((q) => /â€”|â†’|âˆ’|Ã¢/.test(JSON.stringify(q))), 'found visible mojibake')
assert(!questions.some((q) => /\bticket\b/i.test(q.question)), 'found ticket-driven question wording')
assert(Object.values(objectiveCounts).every((count) => count >= 3), 'one or more official objectives have fewer than three questions')
assert(questions.every((q) => wordCount(q.explanation) >= 20), 'one or more explanations have fewer than 20 words')

const bankText = JSON.stringify(questions).toLowerCase()
for (const topic of ['infrastructure as code', 'configuration drift', 'network function virtualization', 'virtual private cloud']) {
  assert(bankText.includes(topic), `missing current N10-009 topic: ${topic}`)
}

const formTypeMinimums = { 'multiple-response': 1, matching: 1, ordering: 1, 'statement-block': 1 }
for (let run = 0; run < 500; run += 1) {
  const form = weightedSelect(questions, 90, domains, {
    practicalQuestionTarget: 6,
    requiredPracticalCategories: requiredCategories,
  })
  const byDomain = form.reduce((counts, q) => ({ ...counts, [q.domain]: (counts[q.domain] || 0) + 1 }), {})
  const byType = form.reduce((counts, q) => ({ ...counts, [q.type || 'single-choice']: (counts[q.type || 'single-choice'] || 0) + 1 }), {})
  const categories = new Set(form.map((q) => q.practicalCategory).filter(Boolean))
  assert(form.length === 90, `form ${run + 1} has ${form.length} questions`)
  for (const [domain, expected] of Object.entries({
    'Networking Concepts': 21, 'Network Implementation': 18, 'Network Operations': 17,
    'Network Security': 13, 'Network Troubleshooting': 21,
  })) assert(byDomain[domain] === expected, `form ${run + 1} has wrong ${domain} allocation`)
  assert(form.filter((q) => practicalTypes.has(q.type)).length >= 6, `form ${run + 1} has fewer than six practicals`)
  for (const category of requiredCategories) assert(categories.has(category), `form ${run + 1} is missing ${category}`)
  for (const [type, minimum] of Object.entries(formTypeMinimums)) assert((byType[type] || 0) >= minimum, `form ${run + 1} is missing ${type}`)
}

console.log(`Questions: ${questions.length}`)
console.log(`Exact duplicate groups: ${exactGroups.length}`)
console.log(`Repeated template groups: ${templateGroups.length} (${templateQuestions} questions)`)
console.log(`Practical questions: ${questions.filter((q) => practicalTypes.has(q.type)).length}`)
console.log(`Types: ${JSON.stringify(typeCounts)}`)
console.log(`Objectives: ${JSON.stringify(objectiveCounts)}`)
console.log(`Correct positions: ${JSON.stringify(correctPositions)}`)
console.log('Validated randomized forms: 500')

if (failures.length) {
  console.error('\nFailures:')
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`)
  process.exitCode = 1
}
