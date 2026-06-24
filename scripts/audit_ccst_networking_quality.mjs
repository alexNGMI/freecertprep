import fs from 'node:fs'
import { weightedSelect } from '../src/utils/exam-selection.js'
import { LIVE_CERT_IDS } from '../src/data/catalogVisibility.js'

const questions = JSON.parse(fs.readFileSync(new URL('../src/data/ccst-networking-questions.json', import.meta.url), 'utf8'))

const domains = [
  { name: 'Standards and Concepts', weight: 15 },
  { name: 'Addressing and Subnet Formats', weight: 20 },
  { name: 'Endpoints and Media Types', weight: 20 },
  { name: 'Infrastructure', weight: 20 },
  { name: 'Diagnosing Problems', weight: 15 },
  { name: 'Security', weight: 10 },
]
const expectedDomainCounts = {
  'Standards and Concepts': 113,
  'Addressing and Subnet Formats': 150,
  'Endpoints and Media Types': 150,
  Infrastructure: 150,
  'Diagnosing Problems': 112,
  Security: 75,
}
const expectedFormDomainCounts = {
  'Standards and Concepts': 8,
  'Addressing and Subnet Formats': 10,
  'Endpoints and Media Types': 10,
  Infrastructure: 10,
  'Diagnosing Problems': 7,
  Security: 5,
}
const expectedTypeCounts = {
  'single-choice': 450,
  'multiple-response': 150,
  matching: 75,
  ordering: 75,
}
const formTypeMinimums = {
  'multiple-response': 1,
  matching: 1,
  ordering: 1,
}

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }
const typeOf = (question) => question.type || 'single-choice'
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const containsNormalizedPhrase = (text, phrase) => (
  ` ${normalize(text)} `.includes(` ${normalize(phrase)} `)
)
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

function correctResponseText(question) {
  const type = typeOf(question)
  if (type === 'single-choice') return [question.choices[question.correctAnswer]]
  if (type === 'multiple-response') return question.correctAnswers.map((index) => question.choices[index])
  if (type === 'matching') {
    return question.itemsLeft.flatMap((left, index) => [
      left,
      question.itemsRight[question.correctMatches[index]],
    ])
  }
  return []
}

function evidenceLeaksCorrectResponse(question) {
  const evidence = JSON.stringify(question.evidenceArtifacts || [])
  return correctResponseText(question).some((response) => {
    const normalizedResponse = normalize(response)
    return normalizedResponse.length >= 3 && containsNormalizedPhrase(evidence, response)
  })
}

function stemLeaksCorrectResponse(question) {
  if (typeOf(question) !== 'single-choice') return false
  const response = normalize(question.choices[question.correctAnswer])
  return response.length >= 3 && containsNormalizedPhrase(question.question, response)
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
const structuredExplanations = questions.filter((question) =>
  /^Why this is right:.*Why the alternatives are wrong:.*Review takeaway:/s.test(question.explanation || '')
)
const evidenceQuestions = questions.filter(hasValidEvidence)
const shortExplanations = questions.filter((question) => wordCount(question.explanation) < 45)
const invalidAnswers = questions.filter((question) => !hasValidAnswerShape(question))
const evidenceLeakQuestions = questions.filter(evidenceLeaksCorrectResponse)
const stemLeakQuestions = questions.filter(stemLeaksCorrectResponse)
const genericEvidenceQuestions = questions.filter((question) =>
  /compare the observation with the available responses|classification pending technician analysis/i
    .test(JSON.stringify(question.evidenceArtifacts || []))
)
const malformedStemQuestions = questions.filter((question) =>
  /\bthe the\b|An IPv4 the observed|observed service 169\.254|observed service or ifconfig|observed connection indicate|not assigned to a\."/i
    .test(question.question)
)
const catchAllPromptQuestions = questions.filter((question) =>
  /Which choice best identifies the relevant network condition, component, protocol, or control\?/i
    .test(question.question)
)
const unsupportedSingleChoiceEvidence = questions.filter((question) => {
  if (typeOf(question) !== 'single-choice') return false
  const evidence = normalize(JSON.stringify(question.evidenceArtifacts || []))
  if (question.domain === 'Diagnosing Problems') {
    return !/observation 1|observation 2|observation 3/.test(evidence)
  }
  const quotedObservation = question.question.match(/"([^"]+)"/)?.[1]
  return quotedObservation && !containsNormalizedPhrase(evidence, quotedObservation)
})
const ticketLanguage = questions.filter((question) => /\bticket\b/i.test(question.question))
const clueToTermQuestions = questions.filter((question) =>
  /which networking concept is being described|which term best matches this evidence|needs the Cisco CCST term|which term should the technician choose|term to identify/i
    .test(`${question.question} ${JSON.stringify(question.evidenceArtifacts || [])}`)
)

assert(LIVE_CERT_IDS.has('ccst-networking'), 'ccst-networking is not marked live')
assert(questions.length === 750, `expected 750 CCST questions, found ${questions.length}`)
assert(exactGroups.length === 0, `found ${exactGroups.length} exact duplicate-stem groups`)
assert(structuredExplanations.length === 750, `expected 750 structured explanations, found ${structuredExplanations.length}`)
assert(evidenceQuestions.length === 750, `expected 750 evidence-led questions, found ${evidenceQuestions.length}`)
assert(shortExplanations.length === 0, `found ${shortExplanations.length} explanations under 45 words`)
assert(invalidAnswers.length === 0, `found ${invalidAnswers.length} questions with invalid answer metadata`)
assert(
  evidenceLeakQuestions.length === 0,
  `found correct-response text in pre-answer evidence for ${evidenceLeakQuestions.map((question) => question.id).join(', ')}`,
)
assert(
  stemLeakQuestions.length === 0,
  `found correct-response text directly named in single-choice stems for ${stemLeakQuestions.map((question) => question.id).join(', ')}`,
)
assert(
  genericEvidenceQuestions.length === 0,
  `found generic placeholder evidence for ${genericEvidenceQuestions.map((question) => question.id).join(', ')}`,
)
assert(
  malformedStemQuestions.length === 0,
  `found malformed CCST stems for ${malformedStemQuestions.map((question) => question.id).join(', ')}`,
)
assert(
  catchAllPromptQuestions.length === 0,
  `found ${catchAllPromptQuestions.length} over-generic catch-all prompts`,
)
assert(
  unsupportedSingleChoiceEvidence.length === 0,
  `found single-choice evidence that does not support the stem for ${unsupportedSingleChoiceEvidence.map((question) => question.id).join(', ')}`,
)
assert(ticketLanguage.length === 0, `found ${ticketLanguage.length} ticket-framed questions`)
assert(clueToTermQuestions.length <= 125, `found ${clueToTermQuestions.length} clue-to-term questions; keep first-response wording at or below 125`)
assert(JSON.stringify(domainCounts) === JSON.stringify(expectedDomainCounts), 'CCST domain counts changed unexpectedly')
assert(JSON.stringify(typeCounts) === JSON.stringify(expectedTypeCounts), 'CCST format counts changed unexpectedly')

for (let run = 0; run < 500; run += 1) {
  const form = weightedSelect(questions, 50, domains, {
    requiredTypeCounts: formTypeMinimums,
  })
  const ids = new Set(form.map((question) => question.id))
  const formDomains = countBy(form, (question) => question.domain)
  const formTypes = countBy(form, (question) => typeOf(question))
  assert(form.length === 50, `form ${run + 1} has ${form.length} questions`)
  assert(ids.size === 50, `form ${run + 1} contains duplicate questions`)
  for (const [domain, expected] of Object.entries(expectedFormDomainCounts)) {
    assert(formDomains[domain] === expected, `form ${run + 1} has wrong ${domain} allocation`)
  }
  for (const [type, minimum] of Object.entries(formTypeMinimums)) {
    assert((formTypes[type] || 0) >= minimum, `form ${run + 1} is missing ${type}`)
  }
}

console.log(`Questions: ${questions.length}`)
console.log(`Marked live: ${LIVE_CERT_IDS.has('ccst-networking')}`)
console.log(`Exact duplicate groups: ${exactGroups.length}`)
console.log(`Structured explanations: ${structuredExplanations.length}`)
console.log(`Evidence-led questions: ${evidenceQuestions.length}`)
console.log(`Explanations under 45 words: ${shortExplanations.length}`)
console.log(`Invalid answer metadata: ${invalidAnswers.length}`)
console.log(`Pre-answer evidence leaks: ${evidenceLeakQuestions.length}`)
console.log(`Direct single-choice stem leaks: ${stemLeakQuestions.length}`)
console.log(`Generic evidence placeholders: ${genericEvidenceQuestions.length}`)
console.log(`Malformed stems: ${malformedStemQuestions.length}`)
console.log(`Over-generic catch-all prompts: ${catchAllPromptQuestions.length}`)
console.log(`Unsupported single-choice evidence: ${unsupportedSingleChoiceEvidence.length}`)
console.log(`Ticket-framed questions: ${ticketLanguage.length}`)
console.log(`Clue-to-term questions: ${clueToTermQuestions.length}`)
console.log(`Domain allocation: ${JSON.stringify(domainCounts)}`)
console.log(`Format allocation: ${JSON.stringify(typeCounts)}`)
console.log('Validated randomized 50-question forms: 500')

if (failures.length) {
  console.error('\nFailures:')
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`)
  process.exitCode = 1
}
