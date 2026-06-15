import { describe, expect, it } from 'vitest'
import {
  buildExamDebrief,
  buildMasteryMap,
  buildStudyPlan,
  getMasteryLevel,
  selectCaseQuestions,
  selectDiagnosticQuestions,
} from '../utils/learning-loop'

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
    expect(plan.some(item => item.activity === 'Case-based practice')).toBe(true)
    expect(plan.at(-1).activity).toBe('Readiness checkpoint')
  })

  it('selects only applied question formats for case practice', () => {
    const selected = selectCaseQuestions(questions, 4)
    expect(selected).toHaveLength(4)
    expect(selected.every(question => question.type !== 'single-choice')).toBe(true)
  })

  it('turns exam misses into objective priorities', () => {
    const debrief = buildExamDebrief([
      { questionId: 'q2', correct: false },
      { questionId: 'q3', correct: true },
      { questionId: 'q5', correct: false },
    ], questions, objectives)

    expect(debrief.priorities.map(item => item.id)).toEqual(['1.1', '5.1'])
    expect(debrief.practicalMisses).toBe(2)
    expect(debrief.measuredObjectives).toBe(3)
  })
})
