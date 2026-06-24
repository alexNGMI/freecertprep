import fs from 'node:fs'
import { weightedSelect } from '../src/utils/exam-selection.js'
import { COMPTIA_OBJECTIVES } from './data/comptia-objectives.mjs'

const questions = JSON.parse(fs.readFileSync(new URL('../src/data/comptia-sec-plus-questions.json', import.meta.url), 'utf8'))
const ledgerLines = fs.readFileSync(
  new URL('./audits/secplus-objective-review-ledger-2026-06-14.csv', import.meta.url),
  'utf8',
).trim().split(/\r?\n/)
const objectives = COMPTIA_OBJECTIVES['comptia-sec-plus']
const domains = [
  { name: 'General Security Concepts', weight: 12 },
  { name: 'Threats, Vulnerabilities, and Mitigations', weight: 22 },
  { name: 'Security Architecture', weight: 18 },
  { name: 'Security Operations', weight: 28 },
  { name: 'Security Program Management and Oversight', weight: 20 },
]
const practicalTypes = new Set(['pbq-matching', 'cli-output', 'topology-scenario', 'config-repair'])
const requiredCategories = ['log-triage', 'firewall-policy', 'incident-correlation', 'control-placement']
const requiredTypeCounts = {
  'multiple-response': 1,
  matching: 1,
  ordering: 1,
  'statement-block': 1,
  'pbq-matching': 2,
  'cli-output': 1,
  'topology-scenario': 1,
  'config-repair': 1,
}
const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const canonicalize = (value) => normalize(value)
  .replace(/\b(?:incident|alert|host|user|server|workstation|branch|site|office|review|phase|wave)\s*[a-z]*[-#]?\d+\b/g, '<entity>')
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
const objectiveCounts = Object.fromEntries(
  Object.keys(objectives).map((id) => [id, questions.filter((question) => question.objectiveId === id).length]),
)
const conceptCounts = Object.fromEntries(
  Object.keys(objectives).map((id) => [
    id,
    new Set(questions.filter((question) => question.objectiveId === id).map((question) => question.conceptId)).size,
  ]),
)
const typeCounts = questions.reduce((counts, question) => {
  const type = question.type || 'single-choice'
  counts[type] = (counts[type] || 0) + 1
  return counts
}, {})
const operationalTicketQuestions = questions.filter((question) =>
  /\bticket\b/i.test(question.question)
  && !/\b(?:Kerberos|ticket-granting ticket|service ticket|pass-the-ticket)\b/i.test(question.question),
)
const evidenceLedPracticalQuestions = questions.filter((question) =>
  practicalTypes.has(question.type)
  && (
    question.evidenceArtifacts?.length > 0
    || question.pbq?.artifacts?.length > 0
    || question.pbq?.evidence?.length > 0
    || question.commands?.length > 0
    || question.topology
    || question.config?.length > 0
  ),
)
const practicalEvidenceText = JSON.stringify(
  questions.filter((question) => practicalTypes.has(question.type)),
).toLowerCase()
const hipaaThresholdQuestion = questions.find((question) => question.id === 'secplus-539')

assert(questions.length === 760, `expected 760 questions, found ${questions.length}`)
assert(ledgerLines.length === 761, `expected a 760-row objective review ledger, found ${ledgerLines.length - 1} rows`)
const ledgerRecords = ledgerLines.slice(1).map((line) => {
  const match = line.match(/^"([^"]+)","([^"]+)","([^"]+)"/)
  return match ? { id: match[1], domain: match[2], objectiveId: match[3] } : null
}).filter(Boolean)
const ledgerIds = new Set(ledgerRecords.map((record) => record.id))
const ledgerById = new Map(ledgerRecords.map((record) => [record.id, record]))
assert(questions.every((question) => ledgerIds.has(question.id)), 'objective review ledger is missing one or more question IDs')
assert(questions.every((question) => {
  const record = ledgerById.get(question.id)
  return record?.domain === question.domain && record?.objectiveId === question.objectiveId
}), 'one or more question objective decisions differ from the review ledger')
assert(exactGroups.length === 0, `found ${exactGroups.length} normalized duplicate-stem groups`)
assert(templateQuestions === 0, `found ${templateQuestions} questions in repeated scenario-template groups`)
assert(!questions.some((question) => /Ã¢â‚¬â€|Ã¢â€ â€™|Ã¢Ë†â€™|ÃƒÂ¢/.test(JSON.stringify(question))), 'found visible mojibake')
assert(operationalTicketQuestions.length === 0, `found synthetic workflow-ticket wording in ${operationalTicketQuestions.map((question) => question.id).join(', ')}`)
assert(Object.values(objectiveCounts).every((count) => count >= 3), 'one or more official objectives have fewer than three questions')
assert(Object.values(conceptCounts).every((count) => count >= 2), 'one or more official objectives have fewer than two reviewed concept families')
assert(questions.every((question) => wordCount(question.explanation) >= 20), 'one or more explanations have fewer than 20 words')
assert(!questions.some((question) => question.conceptId.includes('domain-fallback')), 'found unreviewed objective fallback metadata')
assert(questions.every((question) => objectives[question.objectiveId]), 'found an invalid Security+ objective ID')
assert(questions.every((question) => objectives[question.objectiveId][0] === question.domain), 'found an objective/domain mismatch')
assert(
  hipaaThresholdQuestion
    && /\b400 patient records\b/i.test(hipaaThresholdQuestion.question)
    && /fewer than 500 individuals/i.test(hipaaThresholdQuestion.question)
    && hipaaThresholdQuestion.correctAnswer === 2
    && /60 days from (?:the )?end of the calendar year/i.test(hipaaThresholdQuestion.choices[2]),
  'secplus-539 must describe a breach below 500 individuals and retain the annual HHS reporting answer',
)
assert(questions.filter((question) => practicalTypes.has(question.type)).length >= 33, 'expected at least 33 practical questions')
assert(evidenceLedPracticalQuestions.length >= 33, 'expected every Security+ practical question to include evidence or an interactive artifact')
for (const topic of ['iam', 'firewall', 'alert', 'incident', 'flow', 'retention']) {
  assert(practicalEvidenceText.includes(topic), `Security+ practical evidence is missing ${topic} coverage`)
}

for (let run = 0; run < 500; run += 1) {
  const form = weightedSelect(questions, 90, domains, {
    practicalQuestionTarget: 6,
    requiredTypeCounts,
    requiredPracticalCategories: requiredCategories,
  })
  const byDomain = form.reduce((counts, question) => ({ ...counts, [question.domain]: (counts[question.domain] || 0) + 1 }), {})
  const byType = form.reduce((counts, question) => {
    const type = question.type || 'single-choice'
    return { ...counts, [type]: (counts[type] || 0) + 1 }
  }, {})
  const categories = new Set(form.map((question) => question.practicalCategory).filter(Boolean))

  assert(form.length === 90, `form ${run + 1} has ${form.length} questions`)
  for (const [domain, expected] of Object.entries({
    'General Security Concepts': 11,
    'Threats, Vulnerabilities, and Mitigations': 20,
    'Security Architecture': 16,
    'Security Operations': 25,
    'Security Program Management and Oversight': 18,
  })) assert(byDomain[domain] === expected, `form ${run + 1} has wrong ${domain} allocation`)
  assert(form.filter((question) => practicalTypes.has(question.type)).length >= 6, `form ${run + 1} has fewer than six practicals`)
  for (const category of requiredCategories) assert(categories.has(category), `form ${run + 1} is missing ${category}`)
  for (const [type, minimum] of Object.entries(requiredTypeCounts)) {
    assert((byType[type] || 0) >= minimum, `form ${run + 1} is missing required ${type} coverage`)
  }
}

console.log(`Questions: ${questions.length}`)
console.log(`Objective review ledger rows: ${ledgerLines.length - 1}`)
console.log(`Exact duplicate groups: ${exactGroups.length}`)
console.log(`Repeated template groups: ${templateGroups.length} (${templateQuestions} questions)`)
console.log(`Operational ticket stems: ${operationalTicketQuestions.length}`)
console.log(`Objective fallbacks: ${questions.filter((question) => question.conceptId.includes('domain-fallback')).length}`)
console.log(`Practical questions: ${questions.filter((question) => practicalTypes.has(question.type)).length}`)
console.log(`Evidence-led practical questions: ${evidenceLedPracticalQuestions.length}`)
console.log(`Types: ${JSON.stringify(typeCounts)}`)
console.log(`Objectives: ${JSON.stringify(objectiveCounts)}`)
console.log(`Concepts: ${JSON.stringify(conceptCounts)}`)
console.log('Validated randomized forms: 500')

if (failures.length) {
  console.error('\nFailures:')
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`)
  process.exitCode = 1
}
