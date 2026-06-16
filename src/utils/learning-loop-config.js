export const LEARNING_LOOP_CONFIGS = {
  'comptia-net-plus': {
    eyebrow: 'Personal learning loop',
    title: 'Turn practice into a study plan.',
    subtitle: 'Measure the official objectives, see what the evidence actually supports, and work the highest-value gaps before another exam simulation.',
    diagnosticTitle: 'Find the gaps before you study.',
    diagnosticSubtitle: 'This is a measurement tool, not a pass/fail exam. It samples every official Network+ objective and withholds feedback until the end.',
    diagnosticModeTitle: 'Network+ Diagnostic',
    diagnosticSize: 35,
    caseTitle: 'Work the network, not the vocabulary.',
    caseSubtitle: 'Interpret command output, inspect topologies, repair configuration, and calculate subnet values in applied troubleshooting scenarios.',
    caseModeTitle: 'Network+ Case Practice',
    caseModeLabel: 'Applied troubleshooting',
    caseCategories: ['CLI evidence', 'Topology reasoning', 'Configuration repair', 'Subnetting'],
    caseBody: 'Explain the evidence, choose the action, and verify the result.',
    measuredLabel: 'official objectives',
    objectiveLabel: 'Objective',
  },
  'comptia-sec-plus': {
    eyebrow: 'Security+ learning loop',
    title: 'Turn security practice into a repair plan.',
    subtitle: 'Measure every Security+ objective, separate weak evidence from unmeasured material, and work the controls, threats, operations, and governance gaps in order.',
    diagnosticTitle: 'Baseline the security blueprint.',
    diagnosticSubtitle: 'This samples the official Security+ objectives without feedback until the end, so the study plan reflects what you can recognize cold.',
    diagnosticModeTitle: 'Security+ Diagnostic',
    diagnosticSize: 35,
    caseTitle: 'Practice security decisions in context.',
    caseSubtitle: 'Work log triage, policy decisions, architecture controls, vulnerability findings, and incident response scenarios before another full simulation.',
    caseModeTitle: 'Security+ Case Practice',
    caseModeLabel: 'Security operations',
    caseCategories: ['Log triage', 'Control placement', 'Incident response', 'Policy repair'],
    caseBody: 'Read the evidence, choose the control or response, and use the explanation to name the safer security decision.',
    measuredLabel: 'official objectives',
    objectiveLabel: 'Objective',
  },
  'clf-c02': {
    eyebrow: 'Cloud foundation loop',
    title: 'Build cloud confidence by domain.',
    subtitle: 'Measure each CLF-C02 domain, turn missed service and billing decisions into a short plan, and practice cloud scenarios before another readiness simulation.',
    diagnosticTitle: 'Baseline your cloud fluency.',
    diagnosticSubtitle: 'This checks the four official CLF-C02 domains without immediate feedback, so the plan can separate cloud concepts, security, services, and billing gaps.',
    diagnosticModeTitle: 'Cloud Practitioner Diagnostic',
    diagnosticSize: 24,
    caseTitle: 'Practice AWS decisions in context.',
    caseSubtitle: 'Work service selection, shared responsibility, pricing, resilience, support, and billing scenarios as short applied cases.',
    caseModeTitle: 'Cloud Practitioner Case Practice',
    caseModeLabel: 'Cloud scenarios',
    caseCategories: ['Service selection', 'Shared responsibility', 'Pricing and support', 'Architecture basics'],
    caseBody: 'Read the business need, choose the AWS concept or service, and verify why the alternatives do not fit.',
    measuredLabel: 'exam domains',
    objectiveLabel: 'Domain',
    useDomainObjectives: true,
  },
}

export function getLearningLoopConfig(certId) {
  return LEARNING_LOOP_CONFIGS[certId] || null
}

export function hasLearningLoop(certId) {
  return Boolean(getLearningLoopConfig(certId))
}

export function getLearningObjectives(cert) {
  const config = getLearningLoopConfig(cert?.id)
  if (!config) return []
  if (cert.objectives?.length) return cert.objectives

  return (cert.domains || []).map((domain, index) => ({
    id: `domain-${index + 1}`,
    domain: domain.name,
    title: domain.name,
    weight: domain.weight,
    domainBacked: true,
  }))
}

export function formatLearningTarget(config, id) {
  if (config?.useDomainObjectives && typeof id === 'string' && id.startsWith('domain-')) {
    return `Domain ${id.slice('domain-'.length)}`
  }
  return `${config?.objectiveLabel || 'Objective'} ${id}`
}
