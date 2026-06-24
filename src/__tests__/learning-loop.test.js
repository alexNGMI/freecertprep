import { describe, expect, it } from 'vitest'
import {
  buildExamDebrief,
  buildMasteryMap,
  buildStudyPlan,
  getQuestionObjectiveId,
  hasStudyBaseline,
  isAppliedQuestion,
  getMasteryLevel,
  summarizeAppliedPerformance,
  selectCaseQuestions,
  selectDiagnosticQuestions,
} from '../utils/learning-loop'
import { getLearningLoopConfig, getLearningObjectives, hasLearningLoop } from '../utils/learning-loop-config'
import ccna200301 from '../data/ccna-200-301-questions.json'
import comptiaSecPlus from '../data/comptia-sec-plus-questions.json'
import clfc02 from '../data/questions.json'

const objectives = [
  { id: '1.1', domain: 'Concepts', title: 'Models' },
  { id: '2.1', domain: 'Implementation', title: 'Routing' },
  { id: '5.1', domain: 'Troubleshooting', title: 'Methodology' },
]

const questions = [
  { id: 'q1', objectiveId: '1.1', domain: 'Concepts', type: 'single-choice' },
  { id: 'q2', objectiveId: '1.1', domain: 'Concepts', type: 'cli-output' },
  { id: 'q3', objectiveId: '2.1', domain: 'Implementation', type: 'topology-scenario' },
  { id: 'q4', objectiveId: '2.1', domain: 'Implementation', type: 'single-choice' },
  { id: 'q5', objectiveId: '5.1', domain: 'Troubleshooting', type: 'config-repair' },
  { id: 'q6', objectiveId: '5.1', domain: 'Troubleshooting', type: 'subnetting-drill' },
]

describe('Network+ learning loop', () => {
  it('selects a diagnostic that covers every available objective', () => {
    const selected = selectDiagnosticQuestions(questions, objectives, 5)
    expect(selected).toHaveLength(5)
    expect(new Set(selected.map(question => question.objectiveId))).toEqual(new Set(['1.1', '2.1', '5.1']))
  })

  it('does not label unmeasured objectives as weak', () => {
    const map = buildMasteryMap(questions, {
      q1: { attempts: 3, correct: 3, lastSeen: 1000 },
      q2: { attempts: 1, correct: 1, lastSeen: 1000 },
      q3: { attempts: 2, correct: 1, lastSeen: 1000 },
    }, objectives, 1000)

    expect(map.find(item => item.id === '1.1').level).toBe('developing')
    expect(map.find(item => item.id === '2.1').level).toBe('weak')
    expect(map.find(item => item.id === '5.1').level).toBe('unmeasured')
  })

  it('requires repeated evidence before assigning strong mastery', () => {
    expect(getMasteryLevel({ accuracy: 100, attemptedQuestions: 1, recencyDays: 0 })).toBe('developing')
    expect(getMasteryLevel({ accuracy: 85, attemptedQuestions: 3, recencyDays: 0 })).toBe('strong')
  })

  it('builds plans with repair, measurement, cases, and a checkpoint', () => {
    const plan = buildStudyPlan([
      { ...objectives[0], level: 'weak', accuracy: 30, coverage: 10 },
      { ...objectives[1], level: 'developing', accuracy: 70, coverage: 20 },
      { ...objectives[2], level: 'unmeasured', accuracy: null, coverage: 0 },
    ], 14)

    expect(plan).toHaveLength(10)
    expect(plan[0].objectiveId).toBe('1.1')
    expect(plan[0].reason).toContain('Lowest evidence first')
    expect(plan.some(item => item.activity === 'Case-based practice')).toBe(true)
    expect(plan.at(-1).activity).toBe('Readiness checkpoint')
    expect(plan.at(-1).reason).toContain('mixed objectives')
  })

  it('does not treat incidental practice as a completed study baseline', () => {
    expect(hasStudyBaseline({
      quizHistory: [{ kind: 'quiz', answers: [{ questionId: 'q1', correct: true }] }],
      examHistory: [],
    })).toBe(false)
    expect(hasStudyBaseline({
      quizHistory: [{ kind: 'diagnostic', answers: [] }],
      examHistory: [],
    })).toBe(true)
    expect(hasStudyBaseline({ quizHistory: [], examHistory: [{ answers: [] }] })).toBe(true)
  })

  it('selects only applied question formats for case practice', () => {
    const selected = selectCaseQuestions(questions, 4)
    expect(selected).toHaveLength(4)
    expect(selected.every(question => question.type !== 'single-choice')).toBe(true)
  })

  it('balances case practice across applied question categories', () => {
    const appliedPool = [
      { id: 'cli1', type: 'cli-output' },
      { id: 'cli2', type: 'cli-output' },
      { id: 'cli3', type: 'cli-output' },
      { id: 'topo1', type: 'topology-scenario' },
      { id: 'repair1', type: 'config-repair' },
      { id: 'subnet1', type: 'subnetting-drill' },
    ]

    const selected = selectCaseQuestions(appliedPool, 4)

    expect(new Set(selected.map(question => question.type)).size).toBe(4)
  })

  it('turns exam misses into objective priorities', () => {
    const debrief = buildExamDebrief([
      { questionId: 'q2', correct: false },
      { questionId: 'q3', correct: true },
      { questionId: 'q5', correct: false },
    ], questions, objectives)

    expect(debrief.priorities.map(item => item.id)).toEqual(['1.1', '5.1'])
    expect(debrief.practicalMisses).toBe(2)
    expect(debrief.bestNext.id).toBe('1.1')
    expect(debrief.measuredObjectives).toBe(3)
  })

  it('excludes unanswered questions from debrief priorities and applied misses', () => {
    const debrief = buildExamDebrief([
      { questionId: 'q2', selected: -1, correct: false },
      { questionId: 'q3', selected: 0, correct: true },
      { questionId: 'q5', selected: -1, correct: false, complete: false },
    ], questions, objectives)

    expect(debrief.priorities).toEqual([])
    expect(debrief.practicalMisses).toBe(0)
    expect(debrief.bestNext).toBeNull()
    expect(debrief.measuredObjectives).toBe(1)
  })

  it('summarizes applied performance by practical category', () => {
    const summary = summarizeAppliedPerformance([
      { questionId: 'q2', correct: false },
      { questionId: 'q3', correct: true },
      { questionId: 'q5', correct: false },
    ], questions)

    expect(summary.total).toBe(3)
    expect(summary.missed).toBe(2)
    expect(summary.categories.map(item => item.category)).toEqual([
      'CLI output',
      'Config repair',
      'Topology scenario',
    ])
  })

  it('supports domain-backed learning targets for Cloud Practitioner', () => {
    const cert = {
      id: 'clf-c02',
      domains: [
        { name: 'Cloud Concepts', weight: 24 },
        { name: 'Security and Compliance', weight: 30 },
      ],
    }
    const domainObjectives = getLearningObjectives(cert)
    const cloudQuestions = [
      { id: 'c1', domain: 'Cloud Concepts', question: 'A company wants elasticity. What should it use?' },
      { id: 'c4', domain: 'Cloud Concepts', question: 'A startup needs to scale quickly. Which AWS benefit fits?' },
      { id: 'c5', domain: 'Cloud Concepts', question: 'An organization wants variable expense. Which model helps?' },
      { id: 'c2', domain: 'Security and Compliance', question: 'A team needs to identify shared responsibility.' },
      { id: 'c3', domain: 'Security and Compliance', question: 'Which control belongs to AWS?' },
    ]

    expect(getQuestionObjectiveId(cloudQuestions[0], domainObjectives)).toBe('domain-1')
    expect(selectDiagnosticQuestions(cloudQuestions, domainObjectives, 2).map(question => question.domain).sort())
      .toEqual(['Cloud Concepts', 'Security and Compliance'])

    const mastery = buildMasteryMap(cloudQuestions, {
      c1: { attempts: 3, correct: 3, lastSeen: 1000 },
      c4: { attempts: 1, correct: 1, lastSeen: 1000 },
      c5: { attempts: 1, correct: 1, lastSeen: 1000 },
    }, domainObjectives, 1000)

    expect(mastery.find(item => item.id === 'domain-1').level).toBe('strong')
    expect(mastery.find(item => item.id === 'domain-2').level).toBe('unmeasured')

    expect(buildStudyPlan(mastery, 7).some(item => item.activity === 'Measure this domain')).toBe(true)
  })

  it('selects Cloud Practitioner cases across the real CLF-C02 domains', () => {
    const config = getLearningLoopConfig('clf-c02')
    const cert = {
      id: 'clf-c02',
      questions: clfc02,
      domains: [
        { name: 'Cloud Concepts', weight: 24 },
        { name: 'Security and Compliance', weight: 30 },
        { name: 'Cloud Technology and Services', weight: 34 },
        { name: 'Billing, Pricing and Support', weight: 12 },
      ],
    }
    const objectives = getLearningObjectives(cert)
    const diagnostic = selectDiagnosticQuestions(clfc02, objectives, config.diagnosticSize)
    const cases = selectCaseQuestions(clfc02, 8, objectives)

    expect(config.caseCategories).toEqual([
      'Cloud value',
      'Security responsibility',
      'AWS services',
      'Billing and support',
    ])
    expect(diagnostic).toHaveLength(24)
    expect(new Set(diagnostic.map(question => question.domain))).toEqual(new Set(cert.domains.map(domain => domain.name)))
    expect(cases).toHaveLength(8)
    expect(new Set(cases.map(question => question.domain)).size).toBeGreaterThanOrEqual(3)
    expect(cases.every(question => isAppliedQuestion(question))).toBe(true)
  })

  it('falls back to scenario-like questions for case practice when PBQ formats are absent', () => {
    const domainObjectives = [
      { id: 'domain-1', domain: 'Cloud Concepts', title: 'Cloud Concepts', domainBacked: true },
      { id: 'domain-2', domain: 'Billing', title: 'Billing', domainBacked: true },
    ]
    const cloudQuestions = [
      { id: 'c1', domain: 'Cloud Concepts', question: 'A company wants to avoid upfront hardware costs. What helps?' },
      { id: 'c2', domain: 'Billing', question: 'An organization needs budget alerts. What should it use?' },
      { id: 'c3', domain: 'Billing', question: 'Define reserved capacity.' },
    ]

    const selected = selectCaseQuestions(cloudQuestions, 2, domainObjectives)

    expect(selected).toHaveLength(2)
    expect(selected.every(question => ['c1', 'c2'].includes(question.id))).toBe(true)
  })

  it('registers A+ cores as guided learning-loop modules', () => {
    expect(hasLearningLoop('comptia-a-plus-core-1')).toBe(true)
    expect(hasLearningLoop('comptia-a-plus-core-2')).toBe(true)
    expect(getLearningLoopConfig('comptia-a-plus-core-1').caseCategories).toContain('Hardware diagnostics')
    expect(getLearningLoopConfig('comptia-a-plus-core-2').caseCategories).toContain('Security response')
  })

  it('registers SAA-C03 as an architecture learning-loop module', () => {
    const config = getLearningLoopConfig('aws-saa-c03')

    expect(hasLearningLoop('aws-saa-c03')).toBe(true)
    expect(config.useDomainObjectives).toBe(true)
    expect(config.diagnosticSize).toBe(40)
    expect(config.caseCategories).toEqual([
      'Secure design',
      'Resilient workloads',
      'Performance tradeoffs',
      'Cost optimization',
    ])
  })

  it('registers Splunk as a domain-backed search learning-loop module', () => {
    const config = getLearningLoopConfig('splunk-core-certified-user')

    expect(hasLearningLoop('splunk-core-certified-user')).toBe(true)
    expect(config.useDomainObjectives).toBe(true)
    expect(config.diagnosticSize).toBe(32)
    expect(config.caseCategories).toEqual([
      'Search and SPL evidence',
      'Field and result reasoning',
      'Transforming commands',
      'Reports, dashboards, lookups, and alerts',
    ])
  })

  it('registers Terraform as an objective-backed infrastructure learning-loop module', () => {
    const config = getLearningLoopConfig('terraform-associate')

    expect(hasLearningLoop('terraform-associate')).toBe(true)
    expect(config.useDomainObjectives).toBeUndefined()
    expect(config.diagnosticSize).toBe(40)
    expect(config.caseCategories).toEqual([
      'Plan and apply review',
      'State and drift repair',
      'HCL configuration',
      'HCP Terraform operations',
    ])
  })

  it('registers CCST Networking as a domain-backed Cisco foundation loop', () => {
    const config = getLearningLoopConfig('ccst-networking')

    expect(hasLearningLoop('ccst-networking')).toBe(true)
    expect(config.useDomainObjectives).toBe(true)
    expect(config.diagnosticSize).toBe(30)
    expect(config.caseCategories).toEqual([
      'Addressing decisions',
      'Endpoint and media checks',
      'Infrastructure roles',
      'Troubleshooting path',
    ])
  })

  it('selects Security+ case practice from the real applied evidence set', () => {
    const secPlusConfig = getLearningLoopConfig('comptia-sec-plus')
    const secPlusCert = {
      id: 'comptia-sec-plus',
      questions: comptiaSecPlus,
      objectives: getSecurityObjectives(comptiaSecPlus),
    }
    const cases = selectCaseQuestions(comptiaSecPlus, 10, getLearningObjectives(secPlusCert))
    const categories = new Set(cases.map(question => question.practicalCategory).filter(Boolean))

    expect(secPlusConfig.caseCategories).toEqual([
      'Log triage',
      'Control placement',
      'Incident correlation',
      'Firewall policy',
    ])
    expect(cases).toHaveLength(10)
    expect(categories).toEqual(new Set(['log-triage', 'control-placement', 'incident-correlation', 'firewall-policy']))
  })

  it('registers CCNA as an objective-backed preview learning-loop module', () => {
    const config = getLearningLoopConfig('ccna-200-301')
    const cert = {
      id: 'ccna-200-301',
      questions: ccna200301,
      domains: [
        { name: 'Network Infrastructure and Connectivity', weight: 25 },
        { name: 'Switching and Network Access', weight: 25 },
        { name: 'IP Routing', weight: 20 },
        { name: 'Network Services and Security', weight: 20 },
        { name: 'AI, Network Operations, and Management', weight: 10 },
      ],
    }
    const objectives = getLearningObjectives(cert)
    const diagnostic = selectDiagnosticQuestions(ccna200301, objectives, config.diagnosticSize)
    const cases = selectCaseQuestions(ccna200301, 10, objectives)

    expect(hasLearningLoop('ccna-200-301')).toBe(true)
    expect(config.useQuestionObjectives).toBe(true)
    expect(config.diagnosticSize).toBe(40)
    expect(objectives).toHaveLength(25)
    expect(new Set(objectives.map(objective => objective.domain)).size).toBe(5)
    expect(new Set(diagnostic.map(question => question.objectiveId)).size).toBeGreaterThanOrEqual(25)
    expect(cases).toHaveLength(10)
    expect(cases.every(question => ['cli-output', 'topology-scenario', 'config-repair', 'subnetting-drill'].includes(question.type))).toBe(true)
    expect(config.caseCategories).toEqual([
      'CLI interpretation',
      'Topology reasoning',
      'Configuration repair',
      'Subnetting drills',
    ])
  })
})

function getSecurityObjectives(questions) {
  const objectivesById = new Map()
  for (const question of questions) {
    if (!question.objectiveId || objectivesById.has(question.objectiveId)) continue
    objectivesById.set(question.objectiveId, {
      id: question.objectiveId,
      domain: question.domain,
      title: question.objectiveTitle,
    })
  }
  return [...objectivesById.values()]
}
