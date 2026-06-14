import fs from 'node:fs'
import { COMPTIA_OBJECTIVES } from './data/comptia-objectives.mjs'

const bankPath = new URL('../src/data/comptia-sec-plus-questions.json', import.meta.url)
const questions = JSON.parse(fs.readFileSync(bankPath, 'utf8'))
const objectives = COMPTIA_OBJECTIVES['comptia-sec-plus']

const assignments = {}
const assign = (objectiveId, concept, ids) => {
  for (const id of ids) assignments[id] = { objectiveId, concept }
}

assign('1.1', 'physical-and-control-classification', [
  'secplus-24', 'secplus-653', 'secplus-654', 'secplus-655', 'secplus-656',
])
assign('1.2', 'authentication-and-core-principles', ['secplus-15', 'secplus-63'])
assign('1.3', 'change-governance', ['secplus-28', 'secplus-32', 'secplus-35', 'secplus-77', 'secplus-287'])

assign('2.2', 'social-engineering-and-physical-vectors', [
  'secplus-105', 'secplus-192', 'secplus-193', 'secplus-197', 'secplus-230', 'secplus-243',
  'secplus-593', 'secplus-658',
])
assign('2.3', 'software-and-cryptographic-weaknesses', ['secplus-212', 'secplus-240', 'secplus-643', 'secplus-644'])
assign('2.4', 'attack-behavior-and-indicators', [
  'secplus-124', 'secplus-172', 'secplus-223', 'secplus-253', 'secplus-651', 'secplus-652',
])
assign('2.5', 'hardening-and-access-mitigation', ['secplus-134', 'secplus-183', 'secplus-190', 'secplus-497'])

assign('3.1', 'secure-architecture-models', ['secplus-350', 'secplus-388', 'secplus-390', 'secplus-542'])
assign('3.2', 'infrastructure-and-access-architecture', [
  'secplus-263', 'secplus-280', 'secplus-304', 'secplus-306', 'secplus-322', 'secplus-325',
  'secplus-327', 'secplus-328', 'secplus-336', 'secplus-338', 'secplus-351', 'secplus-360',
  'secplus-362', 'secplus-363', 'secplus-379',
])
assign('3.3', 'cryptographic-data-protection', [
  'secplus-279', 'secplus-294', 'secplus-295', 'secplus-296', 'secplus-297', 'secplus-298',
  'secplus-299', 'secplus-301', 'secplus-302', 'secplus-316', 'secplus-324', 'secplus-368',
])
assign('3.4', 'resilience-and-recovery-design', ['secplus-267', 'secplus-475'])

assign('4.1', 'secure-baselines-and-endpoints', ['secplus-136', 'secplus-438', 'secplus-452', 'secplus-621'])
assign('4.2', 'asset-lifecycle-and-disposal', ['secplus-139'])
assign('4.3', 'vulnerability-and-patch-operations', ['secplus-273', 'secplus-504', 'secplus-505'])
assign('4.4', 'monitoring-intelligence-and-metrics', ['secplus-137', 'secplus-503', 'secplus-605'])
assign('4.5', 'enterprise-security-capabilities', ['secplus-532', 'secplus-533'])
assign('4.6', 'identity-access-and-account-lifecycle', [
  'secplus-180', 'secplus-423', 'secplus-498', 'secplus-715',
])
assign('4.7', 'soar-and-playbook-orchestration', ['secplus-414', 'secplus-589'])
assign('4.8', 'incident-exercises-and-response', ['secplus-125', 'secplus-464', 'secplus-465', 'secplus-619'])

assign('5.1', 'program-governance-and-reporting', ['secplus-688', 'secplus-702', 'secplus-741'])
assign('5.2', 'risk-and-continuity-analysis', [
  'secplus-65', 'secplus-66', 'secplus-67', 'secplus-70', 'secplus-469', 'secplus-474',
])
assign('5.4', 'compliance-privacy-and-ethics', ['secplus-563', 'secplus-567', 'secplus-618', 'secplus-628'])
assign('5.5', 'assessment-independence-and-evidence', ['secplus-568', 'secplus-714'])

const workflowWording = {
  'secplus-28': [
    /change management ticket/i,
    'change request',
  ],
  'secplus-414': [
    /SIEM alert triggers ticket creation/i,
    'SIEM alert opens an incident record',
  ],
  'secplus-505': [
    /closes the ticket/i,
    'closes the change record',
  ],
  'secplus-589': [
    /ticket created/i,
    'incident record created',
  ],
}

const conceptRefinements = {
  '1.4': [
    ['certificate-status-and-pki', /\bcertificate|PKI|OCSP|CRL|certificate authority|CA\b/i],
    ['hashing-signatures-and-integrity', /\bhash|signature|integrity|non-repudiation/i],
    ['encryption-and-key-exchange', /\bencrypt|symmetric|asymmetric|key exchange|Diffie|RSA|AES|ECC/i],
    ['cryptographic-key-management', /\bkey escrow|key management|rotation|HSM|TPM|secret key/i],
  ],
  '2.1': [
    ['insider-and-shadow-it', /\binsider|shadow IT|employee|contractor/i],
    ['nation-state-and-organized-crime', /\bnation-state|organized crime|criminal syndicate|APT\b/i],
    ['hacktivist-and-unskilled-actors', /\bhacktivist|script kiddie|unskilled|activist/i],
    ['actor-motivation-and-capability', /\bmotivation|financial|espionage|ideology|capability|resource/i],
  ],
  '4.7': [
    ['soar-and-playbook-orchestration', /\bSOAR|playbook|orchestrat/i],
    ['scripting-apis-and-integration', /\bscript|API|webhook|integration/i],
    ['automation-benefits-and-risks', /\bautomation|automated|efficien|repeatab|human error|complexity/i],
  ],
  '5.3': [
    ['contracts-and-agreements', /\bSLA|MSA|NDA|MOU|agreement|contract|right.to.audit/i],
    ['vendor-due-diligence-and-monitoring', /\bdue diligence|assessment|questionnaire|monitor|review|vendor risk/i],
    ['supply-chain-and-provider-risk', /\bsupply chain|supplier|subcontractor|cloud provider|service provider/i],
  ],
  '5.6': [
    ['phishing-and-social-engineering-training', /\bphishing|social engineering|vishing|smishing/i],
    ['security-culture-and-reporting', /\bculture|report|reporting|leadership|champion/i],
    ['role-based-and-recurring-training', /\brole-based|training|microlearning|onboarding|annual|recurring/i],
  ],
}

const reviewRows = []
let reassigned = 0
let wordingEdits = 0

for (const question of questions) {
  const assignment = assignments[question.id]
  if (assignment) {
    const objective = objectives[assignment.objectiveId]
    if (!objective) throw new Error(`Unknown objective ${assignment.objectiveId} for ${question.id}`)
    question.domain = objective[0]
    question.objectiveId = assignment.objectiveId
    question.objectiveTitle = objective[1]
    question.conceptId = `comptia-sec-plus-${assignment.objectiveId}-${assignment.concept}`
    reassigned += 1
  } else {
    const objective = objectives[question.objectiveId]
    if (!objective) throw new Error(`Unknown retained objective ${question.objectiveId} for ${question.id}`)
    question.domain = objective[0]
    question.objectiveTitle = objective[1]
  }

  const refinements = conceptRefinements[question.objectiveId]
  if (refinements) {
    const text = [question.question, ...(question.choices || []), question.explanation].join(' ')
    const match = refinements.find(([, pattern]) => pattern.test(text))
    const concept = match?.[0] || 'editorial-reviewed-secondary'
    question.conceptId = `comptia-sec-plus-${question.objectiveId}-${concept}`
  }

  const wording = workflowWording[question.id]
  if (wording) {
    question.question = question.question.replace(wording[0], wording[1])
    wordingEdits += 1
  }

  const concept = question.conceptId
    .replace(`comptia-sec-plus-${question.objectiveId}-`, '')
    .replace(/^domain-fallback-\d+$/, 'editorial-reviewed')
  if (question.conceptId.includes('domain-fallback')) {
    throw new Error(`Unresolved fallback metadata for ${question.id}`)
  }
  reviewRows.push([
    question.id,
    question.domain,
    question.objectiveId,
    concept,
    assignment ? 'editorial reassignment during structured audit' : 'existing objective and concept reviewed',
  ])
}

const expectedFallbackIds = questions
  .filter((question) => question.conceptId.includes('domain-fallback'))
  .map((question) => question.id)
if (expectedFallbackIds.length) {
  throw new Error(`Unresolved fallback IDs: ${expectedFallbackIds.join(', ')}`)
}

const csv = [
  ['question_id', 'domain', 'objective_id', 'concept', 'review_basis'],
  ...reviewRows,
].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n')

fs.writeFileSync(bankPath, `${JSON.stringify(questions, null, 2)}\n`)
fs.writeFileSync(new URL('./audits/secplus-objective-review-ledger-2026-06-14.csv', import.meta.url), `${csv}\n`)

console.log(`Reviewed ${questions.length} Security+ questions.`)
console.log(`Reassigned ${reassigned} fallback or misplaced items.`)
console.log(`Rewrote ${wordingEdits} synthetic workflow-ticket stems.`)
