import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { classifyCompTIAQuestion } from './data/comptia-objectives.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const banks = [
  ['comptia-net-plus', 'src/data/comptia-net-plus-questions.json'],
  ['comptia-sec-plus', 'src/data/comptia-sec-plus-questions.json'],
]
const explanationRepairs = {
  'secplus-pbq-004': 'Badge readers are preventive physical controls because they block unauthorized entry. SIEM alerts are detective technical controls because they identify events for investigation. Policies are managerial controls that direct behavior but do not themselves enforce a door or network decision.',
  'secplus-pbq-007': 'A compensating control reduces risk when the preferred control is not feasible. Discontinuing the risky activity is avoidance. Purchasing insurance transfers part of the financial impact, but it does not remove operational responsibility or the underlying threat.',
  'secplus-pbq-009': 'Isolation is a containment action because it limits further damage. Restoring clean systems and data belongs to recovery. Updating playbooks after the team reviews what happened is a lessons-learned improvement, not an immediate containment step.',
  'secplus-pbq-010': 'Privileged access should require stronger verification and accountable sessions. Secrets belong in an approved secrets-management system rather than source code. RBAC maps permissions to job functions, while broad shared access would violate least privilege and attribution.',
}

for (const [certId, relativePath] of banks) {
  const target = path.join(root, relativePath)
  const questions = JSON.parse(fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, ''))
  let fallbackCount = 0
  const migrated = questions.map(question => {
    const classification = classifyCompTIAQuestion(certId, question)
    if (classification.classifiedBy === 'domain-fallback') fallbackCount += 1
    const updated = {
      ...question,
      objectiveId: classification.objectiveId,
      objectiveTitle: classification.objectiveTitle,
      conceptId: classification.conceptId,
    }
    if (explanationRepairs[question.id]) updated.explanation = explanationRepairs[question.id]
    return updated
  })
  fs.writeFileSync(target, `${JSON.stringify(migrated, null, 2)}\n`)
  console.log(`${certId}: ${migrated.length} questions, ${fallbackCount} domain fallbacks`)
}
