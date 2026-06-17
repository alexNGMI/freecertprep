import fs from 'node:fs'
import { weightedSelect } from '../src/utils/exam-selection.js'

const questions = JSON.parse(fs.readFileSync(new URL('../src/data/questions.json', import.meta.url), 'utf8'))

const domains = [
  { name: 'Cloud Concepts', weight: 24 },
  { name: 'Security and Compliance', weight: 30 },
  { name: 'Cloud Technology and Services', weight: 34 },
  { name: 'Billing, Pricing and Support', weight: 12 },
]

const expectedDomainCounts = {
  'Cloud Concepts': 159,
  'Security and Compliance': 212,
  'Cloud Technology and Services': 273,
  'Billing, Pricing and Support': 87,
}

const expectedFormDomainCounts = {
  'Cloud Concepts': 16,
  'Security and Compliance': 19,
  'Cloud Technology and Services': 22,
  'Billing, Pricing and Support': 8,
}

const expectedTypeCounts = {
  'single-choice': 657,
  'multiple-response': 30,
  'statement-block': 4,
  ordering: 20,
  matching: 20,
}

const officialItemTypes = new Set(['single-choice', 'multiple-response'])
const expectedDomains = new Set(domains.map((domain) => domain.name))
const expectedTypes = new Set(Object.keys(expectedTypeCounts))
const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }
const typeOf = (question) => question.type || 'single-choice'
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const canonicalize = (value) => normalize(value)
  .replace(/\b(?:company|organization|team|business|startup|developer|customer)\b/g, 'org')
  .replace(/\b(?:application|workload|website|web app|platform|system)\b/g, 'workload')
  .replace(/\b\d+\b/g, '#')
const wordCount = (value) => normalize(value || '').split(/\s+/).filter(Boolean).length
const groupBy = (items, key) => {
  const groups = new Map()
  for (const item of items) {
    const value = key(item)
    groups.set(value, [...(groups.get(value) || []), item.id])
  }
  return groups
}
const countBy = (items, key) => items.reduce((counts, item) => {
  const value = key(item)
  counts[value] = (counts[value] || 0) + 1
  return counts
}, {})
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

function hasValidAnswerShape(question) {
  const type = typeOf(question)
  if (type === 'single-choice') {
    return Array.isArray(question.choices)
      && question.choices.length >= 4
      && Number.isInteger(question.correctAnswer)
      && question.correctAnswer >= 0
      && question.correctAnswer < question.choices.length
  }
  if (type === 'multiple-response') {
    return Array.isArray(question.choices)
      && question.choices.length >= 5
      && isUniqueIndexArray(question.correctAnswers, question.choices.length, 2)
  }
  if (type === 'statement-block') {
    return Array.isArray(question.statements)
      && question.statements.length >= 3
      && Array.isArray(question.correctAnswers)
      && question.correctAnswers.length === question.statements.length
      && question.correctAnswers.every((answer) => typeof answer === 'boolean')
  }
  if (type === 'ordering') {
    return Array.isArray(question.items)
      && question.items.length >= 4
      && isPermutation(question.correctOrder, question.items.length)
  }
  if (type === 'matching') {
    return Array.isArray(question.itemsLeft)
      && Array.isArray(question.itemsRight)
      && question.itemsLeft.length >= 4
      && question.itemsLeft.length === question.itemsRight.length
      && isPermutation(question.correctMatches, question.itemsLeft.length)
  }
  return false
}

const exactGroups = [...groupBy(questions, (question) => normalize(question.question)).values()].filter((ids) => ids.length > 1)
const templateGroups = [...groupBy(questions, (question) => canonicalize(question.question)).values()].filter((ids) => ids.length > 1)
const templateQuestions = templateGroups.reduce((sum, ids) => sum + ids.length, 0)
const domainCounts = Object.fromEntries(Object.keys(expectedDomainCounts).map((domain) => [
  domain,
  questions.filter((question) => question.domain === domain).length,
]))
const typeCounts = Object.fromEntries(Object.keys(expectedTypeCounts).map((type) => [
  type,
  questions.filter((question) => typeOf(question) === type).length,
]))
const officialFormatQuestions = questions.filter((question) => officialItemTypes.has(typeOf(question)))
const learningFormatQuestions = questions.filter((question) => !officialItemTypes.has(typeOf(question)))
const scenarioLikeQuestions = questions.filter((question) =>
  /\b(company|organization|team|customer|business|startup|developer|application|workload|needs|wants|requires|should|must|cost|budget|security|service)\b/i
    .test(`${question.question} ${question.explanation}`)
)
const shortExplanations = questions.filter((question) => wordCount(question.explanation) < 20)
const invalidDomains = questions.filter((question) => !expectedDomains.has(question.domain))
const invalidTypes = questions.filter((question) => !expectedTypes.has(typeOf(question)))
const invalidAnswers = questions.filter((question) => !hasValidAnswerShape(question))
const weakDistractors = questions.filter((question) =>
  question.choices?.some((choice) => /\b(all aws services are free|aws manages everything|no security needed|unlimited at no cost)\b/i.test(choice))
)
const mojibake = questions.filter((question) => /Ã|â€|â€™|â€œ|â€/.test(JSON.stringify(question)))

assert(questions.length === 731, `expected 731 CLF-C02 questions, found ${questions.length}`)
assert(exactGroups.length === 0, `found ${exactGroups.length} normalized duplicate-stem groups`)
assert(templateQuestions === 0, `found ${templateQuestions} questions in repeated scenario-template groups`)
assert(invalidDomains.length === 0, `found ${invalidDomains.length} questions outside the CLF-C02 domains`)
assert(invalidTypes.length === 0, `found ${invalidTypes.length} questions with unsupported local item types`)
assert(invalidAnswers.length === 0, `found ${invalidAnswers.length} questions with invalid answer metadata`)
assert(shortExplanations.length === 0, `found ${shortExplanations.length} explanations under 20 words`)
assert(weakDistractors.length === 0, `found ${weakDistractors.length} retired weak distractors`)
assert(mojibake.length === 0, `found ${mojibake.length} visible mojibake artifacts`)
assert(JSON.stringify(domainCounts) === JSON.stringify(expectedDomainCounts), 'CLF-C02 domain counts changed unexpectedly')
assert(JSON.stringify(typeCounts) === JSON.stringify(expectedTypeCounts), 'CLF-C02 format counts changed unexpectedly')
assert(officialFormatQuestions.length >= 680, `expected at least 680 official-style selected-response questions, found ${officialFormatQuestions.length}`)
assert(learningFormatQuestions.length === 44, `expected 44 supplemental learning-format questions, found ${learningFormatQuestions.length}`)
assert(scenarioLikeQuestions.length >= 500, `expected at least 500 scenario/context-led questions, found ${scenarioLikeQuestions.length}`)

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
console.log(`Official-style selected-response questions: ${officialFormatQuestions.length}`)
console.log(`Supplemental learning-format questions: ${learningFormatQuestions.length}`)
console.log(`Scenario/context-led questions: ${scenarioLikeQuestions.length}`)
console.log(`Exact duplicate groups: ${exactGroups.length}`)
console.log(`Repeated template groups: ${templateGroups.length} (${templateQuestions} questions)`)
console.log(`Explanations under 20 words: ${shortExplanations.length}`)
console.log(`Invalid answer metadata: ${invalidAnswers.length}`)
console.log(`Domain allocation: ${JSON.stringify(domainCounts)}`)
console.log(`Format allocation: ${JSON.stringify(typeCounts)}`)
console.log('Validated randomized 65-question forms: 500')

if (failures.length) {
  console.error('\nFailures:')
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`)
  process.exitCode = 1
}
