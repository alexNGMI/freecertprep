import { describe, expect, it } from 'vitest'
import certs from '../data/certs.js'
import questions from '../data/terraform-associate-questions.json'
import { weightedSelect } from '../utils/exam-selection.js'

const typeOf = question => question.type || 'single-choice'
const normalizeStem = stem => stem
  .toLowerCase()
  .replace(/`[^`]+`/g, '<code>')
  .replace(/\d+/g, '#')
  .replace(/[^a-z#<>]+/g, ' ')
  .trim()

describe('Terraform Associate 004 learning-value bank', () => {
  it('preserves the 647-question allocation and published format mix', () => {
    expect(questions).toHaveLength(647)

    const byDomain = questions.reduce((counts, question) => {
      counts[question.domain] = (counts[question.domain] || 0) + 1
      return counts
    }, {})
    expect(byDomain).toEqual({
      'Infrastructure as Code (IaC) with Terraform': 98,
      'Terraform fundamentals': 78,
      'Core Terraform workflow': 97,
      'Terraform configuration': 103,
      'Terraform modules': 71,
      'Terraform state management': 87,
      'Maintain infrastructure with Terraform': 63,
      'HCP Terraform': 50,
    })

    const byType = questions.reduce((counts, question) => {
      const type = typeOf(question)
      counts[type] = (counts[type] || 0) + 1
      return counts
    }, {})
    expect(byType).toEqual({
      'true-false': 24,
      'multiple-response': 32,
      'single-choice': 591,
    })
  })

  it('keeps unique stems and review-quality operational explanations', () => {
    expect(new Set(questions.map(question => question.question)).size).toBe(647)
    expect(new Set(questions.map(question => normalizeStem(question.question))).size).toBe(647)

    for (const question of questions) {
      expect(question.question, `${question.id} retains a generic command opening`).not.toMatch(
        /^(Which|What) command\b/i,
      )
      expect(question.explanation, `${question.id} needs structured review coaching`).toMatch(
        /^Why this is right:.*Why the alternatives are wrong:.*Operational takeaway:/,
      )
      expect(question.explanation.length, `${question.id} explanation is too short`).toBeGreaterThanOrEqual(240)
    }

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
    expect(questions.some(question =>
      question.choices?.some(choice => retiredWeakDistractors.includes(choice))
    )).toBe(false)
  })

  it('includes valid plan, state, configuration, diagnostic, or HCP evidence where useful', () => {
    const evidenceQuestions = questions.filter(question => question.evidenceArtifacts?.length === 1)
    expect(evidenceQuestions.length).toBeGreaterThanOrEqual(300)

    for (const question of evidenceQuestions) {
      const artifact = question.evidenceArtifacts[0]
      expect(['console', 'table']).toContain(artifact.type)
      expect(artifact.title.length).toBeGreaterThan(5)
      if (artifact.type === 'console') {
        expect(artifact.lines.length).toBeGreaterThanOrEqual(3)
      } else {
        expect(artifact.columns.length).toBeGreaterThanOrEqual(2)
        expect(artifact.rows.length).toBeGreaterThanOrEqual(2)
      }
    }
  })

  it('builds stable 57-question forms across repeated randomized selections', () => {
    const cert = certs['terraform-associate']
    const expectedDomains = {
      'Infrastructure as Code (IaC) with Terraform': 9,
      'Terraform fundamentals': 7,
      'Core Terraform workflow': 9,
      'Terraform configuration': 8,
      'Terraform modules': 7,
      'Terraform state management': 8,
      'Maintain infrastructure with Terraform': 6,
      'HCP Terraform': 3,
    }

    for (let run = 0; run < 500; run += 1) {
      const form = weightedSelect(questions, cert.examQuestions, cert.domains, {
        requiredTypeCounts: cert.requiredTypeCounts,
      })
      const byDomain = form.reduce((counts, question) => {
        counts[question.domain] = (counts[question.domain] || 0) + 1
        return counts
      }, {})
      const byType = form.reduce((counts, question) => {
        const type = typeOf(question)
        counts[type] = (counts[type] || 0) + 1
        return counts
      }, {})

      expect(form).toHaveLength(57)
      expect(new Set(form.map(question => question.id)).size).toBe(57)
      expect(byDomain).toEqual(expectedDomains)
      expect(byType['true-false']).toBeGreaterThanOrEqual(3)
      expect(byType['multiple-response']).toBeGreaterThanOrEqual(4)
    }
  })

  it('exposes all Terraform subobjectives for guided learning loops', () => {
    const cert = certs['terraform-associate']
    const registeredObjectiveIds = new Set(cert.objectives.map(objective => objective.id))
    const questionObjectiveIds = new Set(questions.map(question => question.objectiveId))

    expect(cert.objectives).toHaveLength(37)
    expect(registeredObjectiveIds).toEqual(questionObjectiveIds)
    expect(cert.objectives.every(objective => objective.domain && objective.title)).toBe(true)
  })
})
