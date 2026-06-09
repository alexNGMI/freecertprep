import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { APLUS_OBJECTIVES } from './data/aplus-objectives.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const banks = [
  ['Core 1', 'core1', 'src/data/comptia-a-plus-core-1-questions.json'],
  ['Core 2', 'core2', 'src/data/comptia-a-plus-core-2-questions.json'],
]

let failed = false

for (const [label, coreKey, relativePath] of banks) {
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

  console.log(`\n${label}: ${questions.length} questions, ${required.length} objectives, ${new Set(questions.map(question => question.conceptId)).size} concepts`)
  if (invalid.length || domainMismatches.length || missingConceptIds.length || retiredGenericAnswers.length) {
    failed = true
    console.error(`${label} invalid objectives: ${invalid.length}`)
    console.error(`${label} objective/domain mismatches: ${domainMismatches.length}`)
    console.error(`${label} missing concept IDs: ${missingConceptIds.length}`)
    console.error(`${label} retired generic MR answers: ${retiredGenericAnswers.length}`)
  }
}

if (failed) process.exitCode = 1
