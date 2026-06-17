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
    caseTitle: 'Practice security decisions from evidence.',
    caseSubtitle: 'Work logs, firewall-policy order, control placement, incident correlation, and response decisions before another full simulation.',
    caseModeTitle: 'Security+ Case Practice',
    caseModeLabel: 'Security operations',
    caseCategories: ['Log triage', 'Control placement', 'Incident correlation', 'Firewall policy'],
    caseBody: 'Read the security evidence, choose the safest control or response, and verify why the distractors miss the signal or increase risk.',
    measuredLabel: 'official objectives',
    objectiveLabel: 'Objective',
  },
  'clf-c02': {
    eyebrow: 'Cloud foundation loop',
    title: 'Turn AWS fundamentals into a cloud plan.',
    subtitle: 'Measure each CLF-C02 domain, separate weak AWS concepts from unmeasured areas, and work service, security, billing, and support gaps in order.',
    diagnosticTitle: 'Baseline your AWS cloud fluency.',
    diagnosticSubtitle: 'This samples the four official CLF-C02 domains without immediate feedback, so the plan can separate cloud concepts, security, services, and billing gaps.',
    diagnosticModeTitle: 'Cloud Practitioner Diagnostic',
    diagnosticSize: 24,
    caseTitle: 'Practice AWS decisions from scenarios.',
    caseSubtitle: 'Work service selection, shared responsibility, pricing, support, migration, and cloud value decisions before another readiness simulation.',
    caseModeTitle: 'Cloud Practitioner Case Practice',
    caseModeLabel: 'AWS scenario decisions',
    caseCategories: ['Cloud value', 'Security responsibility', 'AWS services', 'Billing and support'],
    caseBody: 'Read the business need, choose the AWS concept or service, and verify why the distractors do not fit the customer outcome.',
    measuredLabel: 'exam domains',
    objectiveLabel: 'Domain',
    useDomainObjectives: true,
  },
  'aws-saa-c03': {
    eyebrow: 'SAA architecture loop',
    title: 'Turn AWS practice into architecture decisions.',
    subtitle: 'Measure the four SAA-C03 domains, separate weak tradeoffs from unmeasured areas, and work secure, resilient, high-performing, and cost-optimized designs in order.',
    diagnosticTitle: 'Baseline your architecture readiness.',
    diagnosticSubtitle: 'This samples the SAA-C03 domains without immediate feedback, so the study plan reflects how well you choose AWS designs under exam constraints.',
    diagnosticModeTitle: 'SAA-C03 Diagnostic',
    diagnosticSize: 40,
    caseTitle: 'Practice AWS architecture tradeoffs.',
    caseSubtitle: 'Work service-selection and design scenarios around identity, network boundaries, data durability, decoupling, performance, and cost before another full simulation.',
    caseModeTitle: 'SAA-C03 Case Practice',
    caseModeLabel: 'Architecture scenarios',
    caseCategories: ['Secure design', 'Resilient workloads', 'Performance tradeoffs', 'Cost optimization'],
    caseBody: 'Read the business constraint, choose the managed AWS pattern, and verify why the distractors fail the architecture tradeoff.',
    measuredLabel: 'exam domains',
    objectiveLabel: 'Domain',
    useDomainObjectives: true,
  },
  'splunk-core-certified-user': {
    eyebrow: 'Splunk search loop',
    title: 'Turn Splunk practice into search fluency.',
    subtitle: 'Measure the eight Core User blueprint domains, separate weak SPL and knowledge-object gaps from unmeasured areas, and work search, fields, transforming commands, reports, dashboards, lookups, and alerts in order.',
    diagnosticTitle: 'Baseline your Splunk readiness.',
    diagnosticSubtitle: 'This samples the Core Certified User domains without immediate feedback, so the study plan reflects what you can reason through from SPL, fields, reports, and search evidence.',
    diagnosticModeTitle: 'Splunk Core User Diagnostic',
    diagnosticSize: 32,
    caseTitle: 'Practice Splunk work from evidence.',
    caseSubtitle: 'Read SPL, event/result tables, field behavior, lookup/report/dashboard context, and alert requirements before another 60-question simulation.',
    caseModeTitle: 'Splunk Case Practice',
    caseModeLabel: 'Search evidence scenarios',
    caseCategories: ['Search and SPL evidence', 'Field and result reasoning', 'Transforming commands', 'Reports, dashboards, lookups, and alerts'],
    caseBody: 'Read the SPL, table, field, or knowledge-object evidence; choose the best Splunk action; and verify why the alternatives do not fit.',
    measuredLabel: 'exam domains',
    objectiveLabel: 'Domain',
    useDomainObjectives: true,
  },
  'terraform-associate': {
    eyebrow: 'Terraform learning loop',
    title: 'Turn Terraform practice into an infrastructure plan.',
    subtitle: 'Measure Terraform subobjectives, separate weak operational evidence from unmeasured areas, and work provider, workflow, configuration, module, state, and HCP Terraform gaps in order.',
    diagnosticTitle: 'Baseline your Terraform readiness.',
    diagnosticSubtitle: 'This samples the Terraform Associate 004 subobjectives without immediate feedback, so the study plan reflects what you can reason through cold.',
    diagnosticModeTitle: 'Terraform Associate Diagnostic',
    diagnosticSize: 40,
    caseTitle: 'Practice Terraform decisions in context.',
    caseSubtitle: 'Work HCL, plan output, state, module, provider, CLI, and HCP Terraform scenarios before another readiness simulation.',
    caseModeTitle: 'Terraform Case Practice',
    caseModeLabel: 'Infrastructure scenarios',
    caseCategories: ['Plan and apply review', 'State and drift repair', 'HCL configuration', 'HCP Terraform operations'],
    caseBody: 'Read the configuration, state, plan, or run evidence; choose the safest Terraform action; and verify why the alternatives do not fit.',
    measuredLabel: 'Terraform subobjectives',
    objectiveLabel: 'Objective',
  },
  'ccst-networking': {
    eyebrow: 'CCST networking loop',
    title: 'Turn Cisco foundations into support decisions.',
    subtitle: 'Measure the six CCST Networking domains, separate weak Cisco-first fundamentals from unmeasured areas, and work standards, addressing, endpoints, infrastructure, diagnostics, and security in order.',
    diagnosticTitle: 'Baseline your CCST Networking readiness.',
    diagnosticSubtitle: 'This samples the 100-150 domains without immediate feedback, so the study plan reflects what you can recognize and troubleshoot cold.',
    diagnosticModeTitle: 'CCST Networking Diagnostic',
    diagnosticSize: 30,
    caseTitle: 'Practice Cisco support scenarios.',
    caseSubtitle: 'Work addressing, media, infrastructure, troubleshooting, and security decisions before another 50-minute simulation.',
    caseModeTitle: 'CCST Case Practice',
    caseModeLabel: 'Networking support scenarios',
    caseCategories: ['Addressing decisions', 'Endpoint and media checks', 'Infrastructure roles', 'Troubleshooting path'],
    caseBody: 'Read the support evidence, choose the best networking decision, and verify why the alternatives do not match the symptom or domain.',
    measuredLabel: 'exam domains',
    objectiveLabel: 'Domain',
    useDomainObjectives: true,
  },
  'ccna-200-301': {
    eyebrow: 'CCNA preview loop',
    title: 'Turn Cisco practice into troubleshooting evidence.',
    subtitle: 'Measure the CCNA v2.0 preview objectives, separate weak CLI/topology/config/subnetting evidence from unmeasured areas, and work the highest-value Cisco gaps in order.',
    diagnosticTitle: 'Baseline your CCNA preview readiness.',
    diagnosticSubtitle: 'This samples the preserved 200-301 v2.0 preview bank without feedback until the end. It is a study tool for the future v2.0 target, not current v1.1 exam positioning.',
    diagnosticModeTitle: 'CCNA Preview Diagnostic',
    diagnosticSize: 40,
    caseTitle: 'Practice CCNA work from evidence.',
    caseSubtitle: 'Read command output, inspect topology evidence, repair configurations, and calculate subnets before another preview simulation.',
    caseModeTitle: 'CCNA Case Practice',
    caseModeLabel: 'Cisco troubleshooting scenarios',
    caseCategories: ['CLI interpretation', 'Topology reasoning', 'Configuration repair', 'Subnetting drills'],
    caseBody: 'Read the network evidence, choose the least risky Cisco action, and verify why the alternatives solve the wrong layer or ignore the symptom.',
    measuredLabel: 'preview objective families',
    objectiveLabel: 'Objective',
    useQuestionObjectives: true,
  },
  'comptia-a-plus-core-1': {
    eyebrow: 'A+ Core 1 learning loop',
    title: 'Turn hardware practice into a support plan.',
    subtitle: 'Measure the Core 1 objectives, separate true troubleshooting gaps from unmeasured topics, and work hardware, networking, mobile, storage, printer, and cloud basics in order.',
    diagnosticTitle: 'Baseline your Core 1 readiness.',
    diagnosticSubtitle: 'This samples the 220-1201 objectives without feedback until the end, so the study plan reflects what you can troubleshoot cold.',
    diagnosticModeTitle: 'A+ Core 1 Diagnostic',
    diagnosticSize: 35,
    caseTitle: 'Practice Core 1 support calls.',
    caseSubtitle: 'Work hardware diagnostics, network connectivity, mobile/peripheral, storage, printer, and virtualization/cloud scenarios before another full simulation.',
    caseModeTitle: 'A+ Core 1 Case Practice',
    caseModeLabel: 'Support troubleshooting',
    caseCategories: ['Hardware diagnostics', 'Network connectivity', 'Mobile and peripherals', 'Storage and virtualization'],
    caseBody: 'Read the symptom and evidence, choose the least invasive fix, and verify why unrelated replacements or settings do not fit.',
    measuredLabel: 'official objectives',
    objectiveLabel: 'Objective',
  },
  'comptia-a-plus-core-2': {
    eyebrow: 'A+ Core 2 learning loop',
    title: 'Turn OS and security practice into a support plan.',
    subtitle: 'Measure the Core 2 objectives, separate weak evidence from unmeasured material, and work operating systems, security, software troubleshooting, and operational procedures in order.',
    diagnosticTitle: 'Baseline your Core 2 readiness.',
    diagnosticSubtitle: 'This samples the 220-1202 objectives without feedback until the end, so the study plan reflects what you can support safely and consistently.',
    diagnosticModeTitle: 'A+ Core 2 Diagnostic',
    diagnosticSize: 40,
    caseTitle: 'Practice Core 2 support calls.',
    caseSubtitle: 'Work OS tools, security response, software/mobile troubleshooting, backup, change, privacy, and operational workflow scenarios before another full simulation.',
    caseModeTitle: 'A+ Core 2 Case Practice',
    caseModeLabel: 'Support troubleshooting',
    caseCategories: ['OS tools', 'Security response', 'Software and mobile', 'Operational workflow'],
    caseBody: 'Read the user impact and evidence, choose the safest next support action, and verify the setting, command, log, or policy behind it.',
    measuredLabel: 'official objectives',
    objectiveLabel: 'Objective',
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

  if (config.useQuestionObjectives && cert.questions?.length) {
    const objectiveMap = new Map()
    for (const question of cert.questions) {
      if (!question.objectiveId) continue
      if (!objectiveMap.has(question.objectiveId)) {
        objectiveMap.set(question.objectiveId, {
          id: question.objectiveId,
          domain: question.domain,
          title: question.objectiveTitle || question.conceptId || question.objectiveId,
        })
      }
    }
    return [...objectiveMap.values()]
  }

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
