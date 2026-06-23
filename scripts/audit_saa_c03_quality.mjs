import fs from 'node:fs'
import { weightedSelect } from '../src/utils/exam-selection.js'

const questions = JSON.parse(fs.readFileSync(new URL('../src/data/aws-saa-c03-questions.json', import.meta.url), 'utf8'))

const domains = [
  { name: 'Design Secure Architectures', weight: 30 },
  { name: 'Design Resilient Architectures', weight: 26 },
  { name: 'Design High-Performing Architectures', weight: 24 },
  { name: 'Design Cost-Optimized Architectures', weight: 20 },
]
const expectedDomainCounts = {
  'Design Secure Architectures': 225,
  'Design Resilient Architectures': 195,
  'Design High-Performing Architectures': 180,
  'Design Cost-Optimized Architectures': 150,
}
const expectedFormDomainCounts = {
  'Design Secure Architectures': 19,
  'Design Resilient Architectures': 17,
  'Design High-Performing Architectures': 16,
  'Design Cost-Optimized Architectures': 13,
}
const expectedTypeCounts = {
  'single-choice': 600,
  'multiple-response': 150,
}

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }
const typeOf = (question) => question.type || 'single-choice'
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const canonicalize = (value) => normalize(value)
  .replace(/\b(company|organization|team|customer|business|startup|application|workload)\b/g, 'org')
  .replace(/\b\d+\b/g, '#')
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
const isUniqueIndexArray = (values, maxLength, minLength = 1) => (
  Array.isArray(values)
  && values.length >= minLength
  && new Set(values).size === values.length
  && values.every((value) => Number.isInteger(value) && value >= 0 && value < maxLength)
)

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
      && question.choices.length === 5
      && isUniqueIndexArray(question.correctAnswers, question.choices.length, 2)
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
const templateGroups = duplicateGroups(questions, (question) => canonicalize(question.question))
const invalidAnswers = questions.filter((question) => !hasValidAnswerShape(question))
const shortExplanations = questions.filter((question) => wordCount(question.explanation) < 80)
const structuredExplanations = questions.filter((question) =>
  /^Why this is right:.*Why distractors fail:.*Architecture takeaway:/s.test(question.explanation || '')
)

assert(questions.length === 750, `expected 750 SAA-C03 questions, found ${questions.length}`)
assert(exactGroups.length === 0, `found ${exactGroups.length} exact duplicate-stem groups`)
assert(invalidAnswers.length === 0, `found ${invalidAnswers.length} questions with invalid answer metadata`)
assert(shortExplanations.length === 0, `found ${shortExplanations.length} explanations under 80 words`)
assert(structuredExplanations.length === 750, `expected 750 structured architecture explanations, found ${structuredExplanations.length}`)
assert(templateGroups.length <= 175, `found ${templateGroups.length} repeated architecture-template groups; keep this at or below 175`)
assert(JSON.stringify(domainCounts) === JSON.stringify(expectedDomainCounts), 'SAA-C03 domain counts changed unexpectedly')
assert(JSON.stringify(typeCounts) === JSON.stringify(expectedTypeCounts), 'SAA-C03 format counts changed unexpectedly')

for (let run = 0; run < 500; run += 1) {
  const form = weightedSelect(questions, 65, domains)
  const ids = new Set(form.map((question) => question.id))
  const formDomains = countBy(form, (question) => question.domain)
  assert(form.length === 65, `form ${run + 1} has ${form.length} questions`)
  assert(ids.size === 65, `form ${run + 1} contains duplicate questions`)
  for (const [domain, expected] of Object.entries(expectedFormDomainCounts)) {
    assert(formDomains[domain] === expected, `form ${run + 1} has wrong ${domain} allocation`)
  }
}

console.log(`Questions: ${questions.length}`)
console.log(`Exact duplicate groups: ${exactGroups.length}`)
console.log(`Repeated architecture-template groups tracked: ${templateGroups.length}`)
console.log(`Structured architecture explanations: ${structuredExplanations.length}`)
console.log(`Explanations under 80 words: ${shortExplanations.length}`)
console.log(`Invalid answer metadata: ${invalidAnswers.length}`)
console.log(`Domain allocation: ${JSON.stringify(domainCounts)}`)
console.log(`Format allocation: ${JSON.stringify(typeCounts)}`)
console.log('Validated randomized 65-question forms: 500')

if (failures.length) {
  console.error('\nFailures:')
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`)
  process.exitCode = 1
}
