import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { APLUS_OBJECTIVES } from './data/aplus-objectives.mjs'
import { weightedSelect } from '../src/utils/exam-selection.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const banks = [
  [
    'Core 1',
    'core1',
    'src/data/comptia-a-plus-core-1-questions.json',
    [
      { name: 'Mobile Devices', weight: 13 },
      { name: 'Networking', weight: 23 },
      { name: 'Hardware', weight: 25 },
      { name: 'Virtualization and Cloud Computing', weight: 11 },
      { name: 'Hardware and Network Troubleshooting', weight: 28 },
    ],
    ['hardware-diagnostics', 'network-connectivity', 'mobile-peripherals', 'storage-configuration', 'virtualization-cloud'],
  ],
  [
    'Core 2',
    'core2',
    'src/data/comptia-a-plus-core-2-questions.json',
    [
      { name: 'Operating Systems', weight: 28 },
      { name: 'Security', weight: 28 },
      { name: 'Software Troubleshooting', weight: 23 },
      { name: 'Operational Procedures', weight: 21 },
    ],
    ['os-tools', 'security-response', 'software-mobile', 'operational-workflow'],
  ],
]

let failed = false

for (const [label, coreKey, relativePath, domains, requiredPracticalCategories] of banks) {
  const questions = JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
  const required = Object.entries(APLUS_OBJECTIVES[coreKey])
    .flatMap(([domain, objectiveIds]) => objectiveIds.map(objectiveId => ({ domain, objectiveId })))

  console.log(`\n${label} objective coverage`)
  console.log('| Objective | Domain | Questions | Concepts |')
  console.log('| --- | --- | ---: | ---: |')

  for (const { domain, objectiveId } of required) {
    const matches = questions.filter(question => question.objectiveId === objectiveId)
    const concepts = new Set(matches.map(question => question.conceptId))
    console.log(`| ${objectiveId} | ${domain} | ${matches.length} | ${concepts.size} |`)
    if (matches.length === 0 || concepts.size < 2) failed = true
  }

  const invalid = questions.filter(question =>
    !required.some(objective => objective.objectiveId === question.objectiveId)
  )
  const domainMismatches = questions.filter(question =>
    !required.some(objective =>
      objective.objectiveId === question.objectiveId && objective.domain === question.domain
    )
  )
  const missingConceptIds = questions.filter(question => !question.conceptId)
  const retiredGenericAnswers = questions.filter(question =>
    question.type === 'multiple-response'
    && question.choices?.includes('Verify the change after implementation and document the result')
  )
  const practicalQuestions = questions.filter(question => question.type === 'pbq-matching')
  const incompletePracticals = practicalQuestions.filter(question =>
    !question.practicalCategory
    || !question.pbq?.task
    || question.pbq?.artifacts?.length !== 1
    || question.componentFeedback?.length !== question.itemsLeft?.length
  )
  let invalidForms = 0
  for (let formIndex = 0; formIndex < 500; formIndex++) {
    const form = weightedSelect(questions, 90, domains, {
      practicalQuestionTarget: 6,
      requiredPracticalCategories,
      allowedQuestionTypes: ['single-choice', 'multiple-response', 'matching', 'ordering', 'pbq-matching'],
    })
    const categories = new Set(form.map(question => question.practicalCategory).filter(Boolean))
    if (
      form.filter(question => question.type === 'pbq-matching').length < 6
      || requiredPracticalCategories.some(category => !categories.has(category))
    ) {
      invalidForms += 1
    }
  }

  console.log(`\n${label}: ${questions.length} questions, ${required.length} objectives, ${new Set(questions.map(question => question.conceptId)).size} concepts`)
  console.log(`${label}: ${practicalQuestions.length} enriched practicals, 500 balanced forms checked`)
  if (invalid.length || domainMismatches.length || missingConceptIds.length || retiredGenericAnswers.length || incompletePracticals.length || invalidForms) {
    failed = true
    console.error(`${label} invalid objectives: ${invalid.length}`)
    console.error(`${label} objective/domain mismatches: ${domainMismatches.length}`)
    console.error(`${label} missing concept IDs: ${missingConceptIds.length}`)
    console.error(`${label} retired generic MR answers: ${retiredGenericAnswers.length}`)
    console.error(`${label} incomplete enriched practicals: ${incompletePracticals.length}`)
    console.error(`${label} invalid balanced forms: ${invalidForms}`)
  }
}

if (failed) process.exitCode = 1
