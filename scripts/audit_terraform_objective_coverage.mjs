import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TERRAFORM_OBJECTIVES } from './data/terraform-objectives.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = path.join(root, 'src/data/terraform-associate-questions.json')
const questions = JSON.parse(fs.readFileSync(target, 'utf8'))

let failed = false
console.log('| Objective | Official scope | Questions | Concepts |')
console.log('| --- | --- | ---: | ---: |')

for (const [objectiveId, objective] of Object.entries(TERRAFORM_OBJECTIVES)) {
  const matches = questions.filter(question => question.objectiveId === objectiveId)
  const concepts = new Set(matches.map(question => question.conceptId))
  console.log(`| ${objectiveId} | ${objective.title} | ${matches.length} | ${concepts.size} |`)
  if (matches.length < 3 || concepts.size < 2) failed = true
}

const invalid = questions.filter(question => !TERRAFORM_OBJECTIVES[question.objectiveId])
const domainMismatches = questions.filter(question =>
  TERRAFORM_OBJECTIVES[question.objectiveId]?.domain !== question.objectiveGroup
)
const legacyCloud = questions.filter(question => /\bTerraform Cloud\b/.test(JSON.stringify(question)))
const deprecatedRefresh = questions.filter(question =>
  /\bterraform refresh\b/i.test(question.question)
  && !/deprecated/i.test(`${question.question} ${question.explanation}`)
)
const blueprintMeta = questions.filter(question =>
  /Terraform (Associate )?004 explicitly tests|Which (Terraform )?004 (topic|objective area)|Which Terraform Associate 004 objective|current HashiCorp Certified: Terraform Associate/i.test(question.question)
)
const taintAsCorrect = questions.filter(question => {
  if (!/\bterraform taint\b/i.test(JSON.stringify(question))) return false
  if (question.type === 'multiple-response') {
    return question.correctAnswers.some(index => /\bterraform taint\b/i.test(question.choices[index]))
  }
  return /\bterraform taint\b/i.test(question.choices?.[question.correctAnswer] || '')
})

console.log(`\nQuestions: ${questions.length}`)
console.log(`Invalid objectives: ${invalid.length}`)
console.log(`Objective/domain mismatches: ${domainMismatches.length}`)
console.log(`Legacy Terraform Cloud references: ${legacyCloud.length}`)
console.log(`Unqualified terraform refresh questions: ${deprecatedRefresh.length}`)
console.log(`Questions treating terraform taint as correct: ${taintAsCorrect.length}`)
console.log(`Blueprint-meta questions: ${blueprintMeta.length}`)

if (invalid.length || domainMismatches.length || legacyCloud.length || deprecatedRefresh.length || taintAsCorrect.length || blueprintMeta.length) {
  failed = true
}

if (failed) process.exitCode = 1
