import fs from 'node:fs'

const banks = [
  ['CompTIA A+ Core 1', '../src/data/comptia-a-plus-core-1-questions.json'],
  ['CompTIA A+ Core 2', '../src/data/comptia-a-plus-core-2-questions.json'],
  ['CompTIA Network+', '../src/data/comptia-net-plus-questions.json'],
  ['CompTIA Security+', '../src/data/comptia-sec-plus-questions.json'],
  ['AWS Cloud Practitioner', '../src/data/questions.json'],
  ['AWS SAA-C03', '../src/data/aws-saa-c03-questions.json'],
  ['Cisco CCST Networking', '../src/data/ccst-networking-questions.json'],
  ['Splunk Core Certified User', '../src/data/splunk-core-certified-user-questions.json'],
  ['HashiCorp Terraform Associate', '../src/data/terraform-associate-questions.json'],
]

const stopWords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'before', 'by', 'for', 'from', 'if',
  'in', 'into', 'is', 'it', 'of', 'on', 'or', 'that', 'the', 'then', 'this', 'to',
  'use', 'uses', 'using', 'with', 'without',
])

const processBestPracticeClusters = [
  [
    /follow change-management approval, testing, rollback, and documentation steps/i,
    /document scope, risk, approvals, implementation, validation, and rollback before the maintenance window/i,
  ],
  [
    /record symptoms, actions taken, parts used, and final verification/i,
    /provide clear notes, impact, steps tried, and current status/i,
    /record impact, scope, evidence, actions attempted, results, and the requested next step/i,
  ],
  [
    /listen, acknowledge the issue, set expectations, and provide updates/i,
    /acknowledge the impact, avoid jargon, set a realistic expectation, and provide updates/i,
  ],
]

function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9+/_=.-]+/g, ' ')
    .trim()
}

function tokens(value) {
  return normalize(value)
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stopWords.has(token))
}

function jaccard(a, b) {
  const left = new Set(tokens(a))
  const right = new Set(tokens(b))
  if (!left.size || !right.size) return 0
  const intersection = [...left].filter((token) => right.has(token)).length
  const union = new Set([...left, ...right]).size
  return intersection / union
}

function correctChoiceIndexes(question) {
  if (Array.isArray(question.correctAnswers)) return new Set(question.correctAnswers)
  if (Number.isInteger(question.correctAnswer)) return new Set([question.correctAnswer])
  return new Set()
}

function clusterIndex(choice) {
  return processBestPracticeClusters.findIndex((cluster) => cluster.some((pattern) => pattern.test(choice)))
}

const failures = []
const summaries = []

for (const [label, relativePath] of banks) {
  const questions = JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), 'utf8'))
  let exactChoiceDuplicates = 0
  let nearDuplicateChoices = 0
  let processAmbiguities = 0

  for (const question of questions) {
    if (!Array.isArray(question.choices)) continue

    const normalizedChoices = question.choices.map(normalize)
    const duplicateChoiceCount = normalizedChoices.length - new Set(normalizedChoices).size
    if (duplicateChoiceCount > 0) {
      exactChoiceDuplicates += duplicateChoiceCount
      failures.push(`${label} ${question.id}: duplicate answer choice text`)
    }

    const correct = correctChoiceIndexes(question)
    const correctTexts = [...correct].map((index) => question.choices[index]).filter(Boolean)
    const distractorTexts = question.choices.filter((_, index) => !correct.has(index))

    for (const correctText of correctTexts) {
      for (const distractorText of distractorTexts) {
        const similarity = jaccard(correctText, distractorText)
        if (
          similarity >= 0.72
          && tokens(correctText).length >= 5
          && tokens(distractorText).length >= 5
        ) {
          nearDuplicateChoices += 1
        }

        const correctCluster = clusterIndex(correctText)
        if (correctCluster >= 0 && correctCluster === clusterIndex(distractorText)) {
          processAmbiguities += 1
          failures.push(`${label} ${question.id}: process-best-practice distractor overlaps the correct answer`)
        }
      }
    }
  }

  summaries.push({ label, exactChoiceDuplicates, nearDuplicateChoices, processAmbiguities })
}

for (const summary of summaries) {
  console.log(`${summary.label}: duplicate choices ${summary.exactChoiceDuplicates}, near-duplicate choices ${summary.nearDuplicateChoices}, process ambiguities ${summary.processAmbiguities}`)
}

if (failures.length) {
  console.error('\nFailures:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
}
