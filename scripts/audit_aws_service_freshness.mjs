import fs from 'node:fs'

const banks = [
  ['AWS Cloud Practitioner', '../src/data/questions.json'],
  ['AWS SAA-C03', '../src/data/aws-saa-c03-questions.json'],
]

const blockedServicePatterns = [
  {
    pattern: /\bAWS OpsWorks\b/i,
    reason: 'AWS OpsWorks Stacks reached end of life in 2024 and should not appear in live AWS prep.',
  },
  {
    pattern: /\bAWS Cloud9\b/i,
    reason: 'AWS Cloud9 is no longer available to new customers and should not be presented as a current exam answer.',
  },
  {
    pattern: /\bAmazon SimpleDB\b/i,
    reason: 'Amazon SimpleDB is not appropriate for current foundational AWS exam prep.',
  },
  {
    pattern: /\bAmazon CloudSearch\b/i,
    reason: 'Amazon CloudSearch is not appropriate for current foundational AWS exam prep.',
  },
  {
    pattern: /\bElastic Transcoder\b|\bAmazon Elastic Transcoder\b/i,
    reason: 'Amazon Elastic Transcoder is superseded by newer media services and should not appear in live AWS prep.',
  },
]

const failures = []

for (const [label, relativePath] of banks) {
  const questions = JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), 'utf8'))
  for (const question of questions) {
    const searchable = JSON.stringify(question)
    for (const { pattern, reason } of blockedServicePatterns) {
      if (pattern.test(searchable)) {
        failures.push(`${label} ${question.id}: ${reason}`)
      }
    }
  }
}

if (failures.length) {
  console.error('AWS service freshness failures:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log('AWS service freshness audit passed.')
}
