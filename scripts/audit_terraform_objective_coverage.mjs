import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TERRAFORM_OBJECTIVES } from './data/terraform-objectives.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = path.join(root, 'src/data/terraform-associate-questions.json')
const questions = JSON.parse(fs.readFileSync(target, 'utf8'))
const EXPECTED_DOMAIN_COUNTS = {
  'Infrastructure as Code (IaC) with Terraform': 98,
  'Terraform fundamentals': 80,
  'Core Terraform workflow': 97,
  'Terraform configuration': 103,
  'Terraform modules': 71,
  'Terraform state management': 87,
  'Maintain infrastructure with Terraform': 63,
  'HCP Terraform': 52,
}
const EXPECTED_TYPE_COUNTS = {
  'single-choice': 595,
  'true-false': 24,
  'multiple-response': 32,
}

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
const typeOf = question => question.type || 'single-choice'
const normalizeStem = stem => stem
  .toLowerCase()
  .replace(/`[^`]+`/g, '<code>')
  .replace(/\d+/g, '#')
  .replace(/[^a-z#<>]+/g, ' ')
  .trim()
const domainCounts = Object.fromEntries(Object.keys(EXPECTED_DOMAIN_COUNTS).map(domain => [
  domain,
  questions.filter(question => question.domain === domain).length,
]))
const typeCounts = Object.fromEntries(Object.keys(EXPECTED_TYPE_COUNTS).map(type => [
  type,
  questions.filter(question => typeOf(question) === type).length,
]))
const exactUnique = new Set(questions.map(question => question.question)).size
const normalizedUnique = new Set(questions.map(question => normalizeStem(question.question))).size
const structuredExplanations = questions.filter(question =>
  /^Why this is right:.*Why the alternatives are wrong:.*Operational takeaway:/.test(question.explanation)
)
const evidenceQuestions = questions.filter(question => question.evidenceArtifacts?.length === 1)
const genericCommandStems = questions.filter(question => /^(Which|What) command\b/i.test(question.question))
const shortExplanations = questions.filter(question => question.explanation.length < 240)
const invalidEvidence = evidenceQuestions.filter(question => {
  const artifact = question.evidenceArtifacts[0]
  if (!['console', 'table'].includes(artifact.type) || !artifact.title) return true
  if (artifact.type === 'console') return !Array.isArray(artifact.lines) || artifact.lines.length < 3
  return !Array.isArray(artifact.columns)
    || artifact.columns.length < 2
    || !Array.isArray(artifact.rows)
    || artifact.rows.length < 2
})
const retiredWeakDistractors = [
  'No need for provider credentials',
  'Guaranteed zero-cost infrastructure',
  'Automatic removal of every operational risk',
  'Terraform supports public cloud only',
  'State is never required',
  'Terraform always rolls back every resource',
  'No need for access controls',
  'Pipelines cannot run Terraform',
  'Terraform never needs credentials',
  'Always use -target',
  'Guaranteed safety',
  'CI never needs locking',
]
const weakDistractorQuestions = questions.filter(question =>
  question.choices?.some(choice => retiredWeakDistractors.includes(choice))
)
const requiredEvidenceTerms = {
  'tf-81': ['TF_VAR_region', 'terraform.tfvars', '-var='],
  'tf-161': ['Variable declaration excerpt', 'type    = string', 'default ='],
  'tf-321': ['lifecycle', 'create_before_destroy = true'],
  'tf-561': ['Data source excerpt', 'aws_ami', 'most_recent = true'],
}
const knownEvidenceDefects = Object.entries(requiredEvidenceTerms).filter(([id, terms]) => {
  const question = questions.find(item => item.id === id)
  const evidence = JSON.stringify(question?.evidenceArtifacts || [])
  return !question || terms.some(term => !evidence.includes(term))
})

console.log(`\nQuestions: ${questions.length}`)
console.log(`Invalid objectives: ${invalid.length}`)
console.log(`Objective/domain mismatches: ${domainMismatches.length}`)
console.log(`Legacy Terraform Cloud references: ${legacyCloud.length}`)
console.log(`Unqualified terraform refresh questions: ${deprecatedRefresh.length}`)
console.log(`Questions treating terraform taint as correct: ${taintAsCorrect.length}`)
console.log(`Blueprint-meta questions: ${blueprintMeta.length}`)
console.log(`Exact unique stems: ${exactUnique}`)
console.log(`Normalized unique stems: ${normalizedUnique}`)
console.log(`Structured explanations: ${structuredExplanations.length}`)
console.log(`Evidence-led questions: ${evidenceQuestions.length}`)
console.log(`Generic command-choice stems: ${genericCommandStems.length}`)
console.log(`Explanations under 240 characters: ${shortExplanations.length}`)
console.log(`Invalid evidence artifacts: ${invalidEvidence.length}`)
console.log(`Retired weak distractors: ${weakDistractorQuestions.length}`)
console.log(`Known evidence context defects: ${knownEvidenceDefects.length}`)
console.log(`Domain allocation: ${JSON.stringify(domainCounts)}`)
console.log(`Format allocation: ${JSON.stringify(typeCounts)}`)

if (
  questions.length !== 651
  || invalid.length
  || domainMismatches.length
  || legacyCloud.length
  || deprecatedRefresh.length
  || taintAsCorrect.length
  || blueprintMeta.length
  || exactUnique !== 651
  || normalizedUnique !== 651
  || structuredExplanations.length !== 651
  || evidenceQuestions.length < 300
  || genericCommandStems.length
  || shortExplanations.length
  || invalidEvidence.length
  || weakDistractorQuestions.length
  || knownEvidenceDefects.length
  || JSON.stringify(domainCounts) !== JSON.stringify(EXPECTED_DOMAIN_COUNTS)
  || JSON.stringify(typeCounts) !== JSON.stringify(EXPECTED_TYPE_COUNTS)
) {
  failed = true
}

if (failed) process.exitCode = 1
