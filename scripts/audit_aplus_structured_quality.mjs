import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { weightedSelect } from '../src/utils/exam-selection.js'
import { APLUS_OBJECTIVES } from './data/aplus-objectives.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const writeLedgers = process.argv.includes('--write-ledgers')

const banks = [
  {
    label: 'Core 1',
    key: 'core1',
    file: 'src/data/comptia-a-plus-core-1-questions.json',
    ledger: 'scripts/audits/aplus-core1-objective-review-ledger-2026-06-14.csv',
    expectedRepeatedSignatureQuestions: 0,
    expectedCrossObjectiveQuestions: 0,
    domains: [
      { name: 'Mobile Devices', weight: 13 },
      { name: 'Networking', weight: 23 },
      { name: 'Hardware', weight: 25 },
      { name: 'Virtualization and Cloud Computing', weight: 11 },
      { name: 'Hardware and Network Troubleshooting', weight: 28 },
    ],
    expectedDomainCounts: {
      'Mobile Devices': 12,
      Networking: 21,
      Hardware: 22,
      'Virtualization and Cloud Computing': 10,
      'Hardware and Network Troubleshooting': 25,
    },
    requiredPracticalCategories: [
      'hardware-diagnostics',
      'network-connectivity',
      'mobile-peripherals',
      'storage-configuration',
      'virtualization-cloud',
    ],
  },
  {
    label: 'Core 2',
    key: 'core2',
    file: 'src/data/comptia-a-plus-core-2-questions.json',
    ledger: 'scripts/audits/aplus-core2-objective-review-ledger-2026-06-14.csv',
    expectedRepeatedSignatureQuestions: 0,
    expectedCrossObjectiveQuestions: 0,
    domains: [
      { name: 'Operating Systems', weight: 28 },
      { name: 'Security', weight: 28 },
      { name: 'Software Troubleshooting', weight: 23 },
      { name: 'Operational Procedures', weight: 21 },
    ],
    expectedDomainCounts: {
      'Operating Systems': 25,
      Security: 25,
      'Software Troubleshooting': 21,
      'Operational Procedures': 19,
    },
    requiredPracticalCategories: [
      'os-tools',
      'security-response',
      'software-mobile',
      'operational-workflow',
    ],
  },
]

const failures = []
const assert = (condition, message) => {
  if (!condition) failures.push(message)
}
const normalize = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const canonicalize = (value) => normalize(value)
  .replace(/\b(?:branch|site|office|review|phase|wave)\s+\d+\b/g, 'location #')
  .replace(/\b(?:\d{1,3}\.){3}\d{1,3}(?:\/\d{1,2})?\b/g, '<ip>')
  .replace(/\b\d+\b/g, '#')
const typeOf = (question) => question.type || 'single-choice'
const repairedContextStarts = {
  'aplus-core1-024': 'During a managed-device onboarding,',
  'aplus-core1-139': 'During a wireless access point installation,',
  'aplus-core1-191': 'After terminating a new office Ethernet run,',
  'aplus-core1-366': 'While configuring a multifunction printer,',
  'aplus-core2-431': 'After a Windows user reports a sign-in problem,',
  'aplus-core2-438': 'During a managed-phone security review,',
  'aplus-core2-530': 'During a managed-phone security review,',
  'aplus-core2-663': 'During scheduled laser-printer maintenance,',
}

function contentSignature(question) {
  const type = typeOf(question)
  if (type === 'matching' || type === 'pbq-matching') {
    return [
      type,
      [...(question.itemsLeft || [])].map(normalize).sort().join('~'),
      [...(question.itemsRight || [])].map(normalize).sort().join('~'),
    ].join('|')
  }
  if (type === 'ordering') {
    return [type, [...(question.items || question.choices || [])].map(normalize).sort().join('~')].join('|')
  }
  if (type === 'statement-block') {
    return [
      type,
      (question.statements || []).map((item) => normalize(item.text || item.statement || item)).sort().join('~'),
    ].join('|')
  }
  return [type, [...(question.choices || [])].map(normalize).sort().join('~')].join('|')
}

function groupBy(questions, keyFor) {
  const groups = new Map()
  for (const question of questions) {
    const key = keyFor(question)
    groups.set(key, [...(groups.get(key) || []), question])
  }
  return groups
}

function csvCell(value) {
  const text = String(value ?? '')
  return `"${text.replaceAll('"', '""')}"`
}

function buildLedger(questions, signatureGroups) {
  const headers = [
    'questionId',
    'domain',
    'objectiveId',
    'conceptId',
    'type',
    'contentSignatureGroupSize',
    'signatureObjectiveCount',
    'reviewStatus',
    'reviewRationale',
  ]
  const rows = questions.map((question) => {
    const group = signatureGroups.get(contentSignature(question)) || []
    const objectiveCount = new Set(group.map((item) => item.objectiveId)).size
    let status = 'reviewed'
    let rationale = 'Unique answer interaction; objective and domain metadata pass structural checks.'
    if (group.length > 1 && objectiveCount > 1) {
      status = 'rewrite-priority'
      rationale = 'Answer interaction is reused across multiple objectives; verify or rewrite before a readiness upgrade.'
    } else if (group.length > 1) {
      status = 'rewrite-family'
      rationale = 'Answer interaction repeats within one objective; retain only if each scenario tests materially different evidence.'
    } else if (typeOf(question) === 'pbq-matching') {
      rationale = 'Handcrafted PBQ-lite interaction with task evidence, category metadata, and component feedback.'
    }
    return [
      question.id,
      question.domain,
      question.objectiveId,
      question.conceptId,
      typeOf(question),
      group.length,
      objectiveCount,
      status,
      rationale,
    ]
  })
  return [headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\n') + '\n'
}

for (const bank of banks) {
  const questions = JSON.parse(fs.readFileSync(path.join(root, bank.file), 'utf8'))
  const objectives = Object.values(APLUS_OBJECTIVES[bank.key]).flat()
  const exactStemGroups = [...groupBy(questions, (question) => normalize(question.question)).values()]
    .filter((group) => group.length > 1)
  const canonicalStemGroups = [...groupBy(questions, (question) => canonicalize(question.question)).values()]
    .filter((group) => group.length > 1)
  const signatureGroups = groupBy(questions, contentSignature)
  const repeatedSignatureGroups = [...signatureGroups.values()].filter((group) => group.length > 1)
  const repeatedSignatureQuestions = repeatedSignatureGroups.flat().length
  const crossObjectiveGroups = repeatedSignatureGroups.filter(
    (group) => new Set(group.map((question) => question.objectiveId)).size > 1,
  )
  const crossObjectiveQuestions = crossObjectiveGroups.flat().length
  const practicals = questions.filter((question) => typeOf(question) === 'pbq-matching')
  const types = questions.reduce((counts, question) => {
    const type = typeOf(question)
    counts[type] = (counts[type] || 0) + 1
    return counts
  }, {})
  const correctPositions = questions.reduce((counts, question) => {
    if (Number.isInteger(question.correctAnswer)) {
      counts[question.correctAnswer] = (counts[question.correctAnswer] || 0) + 1
    }
    return counts
  }, {})

  assert(questions.length === 760, `${bank.label}: expected 760 questions, found ${questions.length}`)
  assert(exactStemGroups.length === 0, `${bank.label}: found normalized duplicate stems`)
  assert(canonicalStemGroups.length === 0, `${bank.label}: found canonical duplicate stems`)
  assert(
    repeatedSignatureQuestions <= bank.expectedRepeatedSignatureQuestions,
    `${bank.label}: repeated answer-signature debt increased to ${repeatedSignatureQuestions}`,
  )
  assert(
    crossObjectiveQuestions <= bank.expectedCrossObjectiveQuestions,
    `${bank.label}: cross-objective signature debt increased to ${crossObjectiveQuestions}`,
  )
  assert(
    questions.every((question) => objectives.includes(question.objectiveId)),
    `${bank.label}: found an unknown objective ID`,
  )
  assert(
    questions.every((question) => question.domain === Object.entries(APLUS_OBJECTIVES[bank.key])
      .find(([, ids]) => ids.includes(question.objectiveId))?.[0]),
    `${bank.label}: found an objective/domain mismatch`,
  )
  for (const objectiveId of objectives) {
    const objectiveQuestions = questions.filter((question) => question.objectiveId === objectiveId)
    assert(objectiveQuestions.length > 0, `${bank.label}: objective ${objectiveId} has no questions`)
    assert(
      new Set(objectiveQuestions.map((question) => question.conceptId)).size >= 2,
      `${bank.label}: objective ${objectiveId} has fewer than two concepts`,
    )
  }
  assert(
    questions.filter((question) => typeOf(question) !== 'pbq-matching')
      .every((question) => !/\bticket\b/i.test(question.question)),
    `${bank.label}: found synthetic ticket framing outside a PBQ`,
  )
  assert(
    questions.filter((question) => typeOf(question) !== 'pbq-matching')
      .every((question) => question.explanation.length >= 120),
    `${bank.label}: found a short selected-response explanation`,
  )
  assert(
    questions.filter((question) => typeOf(question) !== 'pbq-matching')
      .every((question) => (
        question.explanation.includes('Why this is right:')
        && question.explanation.includes('Why the other choices are wrong:')
        && question.explanation.includes('Verification:')
      )),
    `${bank.label}: found a selected-response explanation without the complete review structure`,
  )
  assert(
    questions.every((question) => ['single-choice', 'multiple-response', 'pbq-matching'].includes(typeOf(question))),
    `${bank.label}: found a generic learning-drill type in the production pool`,
  )
  for (const [id, expectedStart] of Object.entries(repairedContextStarts)) {
    const question = questions.find((item) => item.id === id)
    if (question) {
      assert(
        question.question.startsWith(expectedStart),
        `${bank.label}: ${id} regressed to a mismatched scenario context`,
      )
    }
  }
  assert(practicals.length === 20, `${bank.label}: expected 20 handcrafted PBQ-lite questions`)
  assert(
    practicals.every((question) => (
      question.practicalCategory
      && question.pbq?.task?.length >= 60
      && question.pbq?.artifacts?.length === 1
      && question.componentFeedback?.length === question.itemsLeft?.length
    )),
    `${bank.label}: found an incomplete PBQ-lite interaction`,
  )

  for (let run = 0; run < 500; run += 1) {
    const form = weightedSelect(questions, 90, bank.domains, {
      practicalQuestionTarget: 6,
      requiredPracticalCategories: bank.requiredPracticalCategories,
      allowedQuestionTypes: ['single-choice', 'multiple-response', 'pbq-matching'],
    })
    const byDomain = form.reduce((counts, question) => {
      counts[question.domain] = (counts[question.domain] || 0) + 1
      return counts
    }, {})
    const categories = new Set(form.map((question) => question.practicalCategory).filter(Boolean))
    assert(form.length === 90, `${bank.label}: randomized form ${run + 1} has ${form.length} questions`)
    for (const [domain, expected] of Object.entries(bank.expectedDomainCounts)) {
      assert(byDomain[domain] === expected, `${bank.label}: randomized form ${run + 1} has wrong ${domain} allocation`)
    }
    assert(
      form.filter((question) => typeOf(question) === 'pbq-matching').length >= 6,
      `${bank.label}: randomized form ${run + 1} has fewer than six PBQ-lite questions`,
    )
    for (const category of bank.requiredPracticalCategories) {
      assert(categories.has(category), `${bank.label}: randomized form ${run + 1} is missing ${category}`)
    }
    assert(
      !form.some((question) => ['matching', 'statement-block'].includes(typeOf(question))),
      `${bank.label}: randomized form ${run + 1} contains a learning-drill-only type`,
    )
  }

  if (writeLedgers) {
    fs.writeFileSync(path.join(root, bank.ledger), buildLedger(questions, signatureGroups))
  }

  console.log(`\n${bank.label}`)
  console.log(`Questions: ${questions.length}`)
  console.log(`Types: ${JSON.stringify(types)}`)
  console.log(`Correct positions: ${JSON.stringify(correctPositions)}`)
  console.log(`Exact duplicate stem groups: ${exactStemGroups.length}`)
  console.log(`Canonical duplicate stem groups: ${canonicalStemGroups.length}`)
  console.log(`Unique answer interactions: ${signatureGroups.size}`)
  console.log(`Questions in repeated answer interactions: ${repeatedSignatureQuestions}`)
  console.log(`Cross-objective repeated interaction groups: ${crossObjectiveGroups.length}`)
  console.log(`Questions in cross-objective interactions: ${crossObjectiveQuestions}`)
  console.log(`PBQ-lite questions: ${practicals.length}`)
  console.log('Validated randomized forms: 500')
  if (writeLedgers) console.log(`Ledger: ${bank.ledger}`)
}

if (failures.length) {
  console.error('\nFailures:')
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`)
  process.exitCode = 1
}
