import { describe, expect, it } from 'vitest'
import {
  PART107_BANK_BLUEPRINT,
  PART107_CONTENT_CERTIFICATION,
  PART107_DOMAINS,
  PART107_EXAM_MINUTES,
  PART107_EXAM_SIZE,
  PART107_PASSING_PERCENT,
  PART107_QUESTIONS,
} from '../data/part107.js'
import { weightedSelect } from '../utils/exam-selection.js'

function countBy(items, key) {
  return items.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1
    return acc
  }, {})
}

function normalizedText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

describe('Part 107 certified UAG content bank', () => {
  it('uses only the source-reviewed 360-question certified pool', () => {
    expect(PART107_QUESTIONS).toHaveLength(PART107_BANK_BLUEPRINT.totalQuestions)
    expect(PART107_EXAM_SIZE).toBe(60)
    expect(PART107_EXAM_MINUTES).toBe(120)
    expect(PART107_PASSING_PERCENT).toBe(70)
    expect(countBy(PART107_QUESTIONS, 'domain')).toEqual(PART107_BANK_BLUEPRINT.domainAllocation)
    expect(new Set(PART107_QUESTIONS.map(question => question.id)).size).toBe(360)
    expect(PART107_QUESTIONS.every(question => question.id.startsWith('p107-cert-'))).toBe(true)
  })

  it('uses the current UAG full-exam weighting from the 2025 applicant bulletin', () => {
    expect(PART107_DOMAINS).toEqual([
      { name: 'Regulations', weight: 48 },
      { name: 'Airspace and requirements', weight: 20 },
      { name: 'Weather', weight: 5 },
      { name: 'Loading and performance', weight: 2 },
      { name: 'Operations', weight: 25 },
    ])
    expect(PART107_BANK_BLUEPRINT.examAllocation).toEqual({
      Regulations: 29,
      'Airspace and requirements': 12,
      Weather: 3,
      'Loading and performance': 1,
      Operations: 15,
    })
  })

  it('marks the six-form certified bank as premium-ready', () => {
    expect(PART107_CONTENT_CERTIFICATION.premiumExamReady).toBe(true)
    expect(PART107_CONTENT_CERTIFICATION.certifiedQuestionCount).toBe(360)
    expect(PART107_CONTENT_CERTIFICATION.certifiedFormCount).toBe(6)
    expect(PART107_CONTENT_CERTIFICATION.requiredStandard.join(' ')).toMatch(
      /September 29, 2025 UAG Applicant Information Bulletin/,
    )
    expect(PART107_CONTENT_CERTIFICATION.requiredStandard.join(' ')).toMatch(/removed/)
  })

  it('keeps each certified form aligned to the real 60-question UAG allocation', () => {
    const formIds = [...new Set(PART107_QUESTIONS.map(question => question.formId))].sort()

    expect(formIds).toEqual([
      'part107-form-a',
      'part107-form-b',
      'part107-form-c',
      'part107-form-d',
      'part107-form-e',
      'part107-form-f',
    ])

    for (const formId of formIds) {
      const form = PART107_QUESTIONS.filter(question => question.formId === formId)
      expect(form, `${formId} size`).toHaveLength(60)
      expect(countBy(form, 'domain'), `${formId} allocation`).toEqual(
        PART107_BANK_BLUEPRINT.examAllocation,
      )
      expect(new Set(form.map(question => question.question)).size, `${formId} unique stems`).toBe(60)
    }
  })

  it('keeps the formal simulator faithful to UAG single-choice format', () => {
    expect(PART107_QUESTIONS.every(question => question.type === 'single-choice')).toBe(true)
    expect(PART107_QUESTIONS.every(question => question.choices.length === 3)).toBe(true)
    expect(PART107_QUESTIONS.every(question => new Set(question.choices).size === 3)).toBe(true)
    expect(PART107_QUESTIONS.every(question => question.correctAnswer === 0)).toBe(true)
  })

  it('requires source-reviewed metadata for every premium item', () => {
    for (const question of PART107_QUESTIONS) {
      expect(question.premiumEligible, `${question.id} premium flag`).toBe(true)
      expect(question.reviewStatus, `${question.id} review status`).toBe('source-reviewed')
      expect(question.reviewedAt, `${question.id} reviewed date`).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(question.formId, `${question.id} missing formId`).toMatch(/^part107-form-[a-f]$/)
      expect(question.acsTask, `${question.id} missing acsTask`).toMatch(/^UA\./)
      expect(question.acsCode, `${question.id} missing acsCode`).toMatch(/^UA\./)
      expect(question.sourceRefs?.length, `${question.id} missing source refs`).toBeGreaterThan(0)
      expect(question.itemStyle, `${question.id} missing itemStyle`).toBeTruthy()
      expect(question.evidenceType, `${question.id} missing evidenceType`).toBeTruthy()
      expect(question.sourceRefs.join(' '), `${question.id} relies on Udemy`).not.toMatch(/Udemy/i)
      expect(question.explanation, `${question.id} explanation too thin`).toMatch(/[.?!]\s+[A-Z0-9]/)
      expect(question.explanation.length, `${question.id} explanation too short`).toBeGreaterThan(100)
    }
  })

  it('meets the declared item-style coverage minimums', () => {
    const styleCounts = countBy(PART107_QUESTIONS, 'itemStyle')

    for (const [style, minimum] of Object.entries(PART107_BANK_BLUEPRINT.itemStyleMinimums)) {
      expect(styleCounts[style] || 0, `${style} coverage`).toBeGreaterThanOrEqual(minimum)
    }
  })

  it('keeps learner-facing prose polished and free of canned explanation labels', () => {
    for (const question of PART107_QUESTIONS) {
      const fields = [
        ['question', question.question],
        ...question.choices.map((choice, index) => [`choice ${index + 1}`, choice]),
        ['explanation', question.explanation],
      ]

      for (const [field, text] of fields) {
        expect(text, `${question.id} ${field} has duplicate punctuation`).not.toMatch(/\.{2,}|,,|;;|::/)
        expect(text, `${question.id} ${field} has repeated whitespace`).not.toMatch(/\s{2,}/)
        expect(text, `${question.id} ${field} has article typo`).not.toMatch(
          /\ba (?:aircraft|airport|operation|unmanned|online|approved|applicable|emergency|inspection|unmarked)\b/i,
        )
        expect(text, `${question.id} ${field} uses canned label`).not.toMatch(
          /Why this is right|Why the alternatives are wrong|Review takeaway|sample-test answer|sample-test style|sample question/i,
        )
        expect(text, `${question.id} ${field} uses rough source wording`).not.toMatch(
          /1800WXBrief|Method of Compliance/,
        )
        expect(text, `${question.id} ${field} uses generated-sounding exam phrasing`).not.toMatch(
          /asks whether|asks which|What is correct\?|Which statement is correct\?|Which is correct\?|What is the correct answer\?|correct answer|declaration pathway|best matches|Which response|What should happen\?|dramatic video/i,
        )
        expect(text, `${question.id} ${field} overuses generic requester framing`).not.toMatch(
          /\b(client|customer)\b/i,
        )
      }
    }
  })

  it('renders real FAA supplement image stimuli for figure-reference questions', () => {
    const figureQuestions = PART107_QUESTIONS.filter(question =>
      question.question.includes('FAA-CT-8080-2H')
      || question.sourceRefs?.includes('FAA-CT-8080-2H'),
    )
    const imageStimuli = figureQuestions.filter(question => question.stimulus?.type === 'image')

    expect(figureQuestions.length).toBeGreaterThanOrEqual(60)
    expect(imageStimuli).toHaveLength(figureQuestions.length)
    for (const question of imageStimuli) {
      expect(question.stimulus.src, `${question.id} image src`).toMatch(
        /^\/part107\/stimuli\/faa-ct-8080-2h-fig\d+\.png$/,
      )
      expect(question.stimulus.alt, `${question.id} image alt`).toMatch(/FAA-CT-8080-2H Figure/)
    }
  })

  it('keeps legacy generated phrasing out of the live pool', () => {
    const allText = PART107_QUESTIONS
      .flatMap(question => [question.question, ...question.choices, question.explanation])
      .join(' ')

    expect(allText).not.toMatch(
      /Cooperstown roof inspection|Shelbyville|Riverton|Fairmont|Oak Valley|Mill Creek|Canyon Junction|Prairie City|Newport Field|Granite Falls|Bay Point/i,
    )
    expect(allText).not.toMatch(
      /client accepts|customer is waiting|video feed remains clear|crew will improvise|below rooftop|people are looking at the aircraft/i,
    )
    expect(allText).not.toMatch(/\ba airport\b|\ba operation\b/i)
    expect(new Set(PART107_QUESTIONS.map(question => normalizedText(question.question))).size).toBe(360)
  })

  it('samples official 60-question forms using the approved allocation', () => {
    for (let run = 0; run < 20; run += 1) {
      const form = weightedSelect(PART107_QUESTIONS, PART107_EXAM_SIZE, PART107_DOMAINS, {
        allowedQuestionTypes: ['single-choice'],
        uniqueKey: question => question.question,
      })
      expect(form).toHaveLength(60)
      expect(countBy(form, 'domain')).toEqual(PART107_BANK_BLUEPRINT.examAllocation)
      expect(new Set(form.map(question => question.id)).size).toBe(60)
      expect(new Set(form.map(question => question.question)).size).toBe(60)
      expect(form.every(question => question.premiumEligible)).toBe(true)
    }
  })
})
