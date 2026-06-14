import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { COMPTIA_OBJECTIVES } from './data/comptia-objectives.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const banks = [
  ['comptia-net-plus', 'src/data/comptia-net-plus-questions.json'],
  ['comptia-sec-plus', 'src/data/comptia-sec-plus-questions.json'],
]

let failed = false

for (const [certId, relativePath] of banks) {
  const questions = JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
  const objectives = COMPTIA_OBJECTIVES[certId]
  console.log(`\n${certId}`)
  console.log('| Objective | Scope | Questions | Concepts | Fallback |')
  console.log('| --- | --- | ---: | ---: | ---: |')

  for (const [objectiveId, [domain, title]] of Object.entries(objectives)) {
    const matches = questions.filter(question => question.objectiveId === objectiveId)
    const concepts = new Set(matches.map(question => question.conceptId))
    const fallbacks = matches.filter(question => question.conceptId.includes('domain-fallback')).length
    console.log(`| ${objectiveId} | ${title} | ${matches.length} | ${concepts.size} | ${fallbacks} |`)
    if (matches.length < 3 || concepts.size < 1) failed = true
    if (matches.some(question => question.domain !== domain)) failed = true
  }

  const invalid = questions.filter(question => !objectives[question.objectiveId])
  const missing = questions.filter(question => !question.objectiveTitle || !question.conceptId)
  const fallbackCount = questions.filter(question => question.conceptId.includes('domain-fallback')).length
  const fallbackRate = fallbackCount / questions.length
  const practicalTypes = new Set(['pbq-matching', 'cli-output', 'topology-scenario', 'config-repair', 'subnetting-drill'])
  const practical = questions.filter(question => practicalTypes.has(question.type))
  const weakPracticalExplanations = practical.filter(question => question.explanation.length < 140)
  console.log(`Questions: ${questions.length}`)
  console.log(`Invalid objectives: ${invalid.length}`)
  console.log(`Missing metadata: ${missing.length}`)
  console.log(`Domain fallbacks: ${fallbackCount} (${(fallbackRate * 100).toFixed(1)}%)`)
  console.log(`Practical questions: ${practical.length}`)
  console.log(`Practical explanations under 140 characters: ${weakPracticalExplanations.length}`)
  if (invalid.length || missing.length || fallbackRate > 0.2 || weakPracticalExplanations.length) failed = true
}

if (failed) process.exitCode = 1
