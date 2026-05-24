import { describe, expect, it } from 'vitest'
import certs from '../data/certs.js'
import awsSaaC03 from '../data/aws-saa-c03-questions.json'

describe('SAA-C03 premium polish', () => {
  it('adds study guidance without changing the 750-question pool', () => {
    const saa = certs['aws-saa-c03']

    expect(awsSaaC03).toHaveLength(750)
    expect(saa.questionCount).toBe(750)
    expect(saa.studyPlan.headline).toBe('Architecture-first SAA prep')
    expect(saa.studyPlan.checkpoints).toHaveLength(4)
    expect(saa.practiceGuidance).toHaveLength(3)
    expect(saa.studyPlan.summary).toContain('design lab')
    expect(saa.practiceGuidance.join(' ')).toContain('Smart Practice')
  })
})
