import { describe, it, expect } from 'vitest'
import certs from '../data/certs.js'
import az900 from '../data/az-900-questions.json'
import clfc02 from '../data/questions.json'
import cdl from '../data/cdl-questions.json'
import ncaAiio from '../data/nca-aiio-questions.json'
import ncaGenl from '../data/nca-genl-questions.json'

// Map each cert to the JSON we statically imported.
// When adding a new cert, add it here too — the "registry fully mapped" test
// below will catch the omission.
const CERT_QUESTIONS = {
  'az-900': az900,
  'clf-c02': clfc02,
  'cdl': cdl,
  'nca-aiio': ncaAiio,
  'nca-genl': ncaGenl,
}

const VALID_TYPES = new Set([
  'single-choice',
  'multiple-response',
  'statement-block',
  'ordering',
  'matching',
])

function typeOf(q) {
  return q.type || 'single-choice'
}

// ─── Registry wiring ────────────────────────────────────────────────────────

describe('cert registry', () => {
  it('every cert in certs.js has a matching question file in this test', () => {
    const registered = Object.keys(certs)
    const tested = Object.keys(CERT_QUESTIONS)
    expect(tested.sort()).toEqual(registered.sort())
  })

  it('every cert has a non-empty question list', () => {
    for (const [id, questions] of Object.entries(CERT_QUESTIONS)) {
      expect(Array.isArray(questions), `${id} must be an array`).toBe(true)
      expect(questions.length, `${id} must have at least 1 question`).toBeGreaterThan(0)
    }
  })

  it('every cert reports the same questionCount in the registry as its JSON', () => {
    for (const [id, questions] of Object.entries(CERT_QUESTIONS)) {
      const declared = certs[id].questionCount
      expect(questions.length, `${id} declared ${declared} but JSON has ${questions.length}`).toBe(declared)
    }
  })

  it('every cert has domain weights summing to 100', () => {
    for (const [id, cert] of Object.entries(certs)) {
      const sum = cert.domains.reduce((s, d) => s + d.weight, 0)
      expect(sum, `${id} domain weights sum to ${sum}, expected 100`).toBe(100)
    }
  })
})

// ─── Per-cert sanity ────────────────────────────────────────────────────────

describe.each(Object.entries(CERT_QUESTIONS))('%s questions', (certId, questions) => {
  const cert = certs[certId]
  const validDomains = new Set(cert.domains.map(d => d.name))

  it('every question has a unique id', () => {
    const ids = questions.map(q => q.id)
    const unique = new Set(ids)
    expect(unique.size, `${certId} has ${ids.length - unique.size} duplicate id(s)`).toBe(ids.length)
  })

  it('every question has an id, domain, and question text', () => {
    for (const q of questions) {
      expect(q.id, `${certId} question missing id: ${JSON.stringify(q).slice(0, 100)}`).toBeDefined()
      expect(q.domain, `${certId} q${q.id} missing domain`).toBeTypeOf('string')
      expect(q.question, `${certId} q${q.id} missing question text`).toBeTypeOf('string')
    }
  })

  it('every question uses a domain that exists in the cert config', () => {
    for (const q of questions) {
      expect(
        validDomains.has(q.domain),
        `${certId} q${q.id} uses unknown domain "${q.domain}" (valid: ${[...validDomains].join(', ')})`
      ).toBe(true)
    }
  })

  it('every question has a recognized type', () => {
    for (const q of questions) {
      const t = typeOf(q)
      expect(VALID_TYPES.has(t), `${certId} q${q.id} has invalid type "${t}"`).toBe(true)
    }
  })

  it('single-choice questions have choices and a valid correctAnswer index', () => {
    const scs = questions.filter(q => typeOf(q) === 'single-choice')
    for (const q of scs) {
      expect(Array.isArray(q.choices), `${certId} q${q.id} missing choices`).toBe(true)
      expect(q.choices.length, `${certId} q${q.id} has <2 choices`).toBeGreaterThanOrEqual(2)
      expect(typeof q.correctAnswer, `${certId} q${q.id} correctAnswer must be a number`).toBe('number')
      expect(
        q.correctAnswer >= 0 && q.correctAnswer < q.choices.length,
        `${certId} q${q.id} correctAnswer ${q.correctAnswer} out of range [0, ${q.choices.length})`
      ).toBe(true)
    }
  })

  it('multiple-response questions have choices and valid correctAnswers indices', () => {
    const mrs = questions.filter(q => typeOf(q) === 'multiple-response')
    for (const q of mrs) {
      expect(Array.isArray(q.choices), `${certId} q${q.id} missing choices`).toBe(true)
      expect(Array.isArray(q.correctAnswers), `${certId} q${q.id} missing correctAnswers`).toBe(true)
      expect(q.correctAnswers.length, `${certId} q${q.id} needs ≥1 correct answer`).toBeGreaterThanOrEqual(1)
      // All indices in range
      for (const idx of q.correctAnswers) {
        expect(
          idx >= 0 && idx < q.choices.length,
          `${certId} q${q.id} correctAnswers has out-of-range index ${idx}`
        ).toBe(true)
      }
      // No duplicates
      expect(
        new Set(q.correctAnswers).size,
        `${certId} q${q.id} correctAnswers has duplicates`
      ).toBe(q.correctAnswers.length)
      // Sorted ascending (required by scoring.js which uses JSON.stringify comparison)
      const sorted = [...q.correctAnswers].sort((a, b) => a - b)
      expect(
        JSON.stringify(q.correctAnswers),
        `${certId} q${q.id} correctAnswers must be sorted ascending for scoring to match`
      ).toBe(JSON.stringify(sorted))
    }
  })

  it('ordering questions have items and a correctOrder that is a permutation', () => {
    const ords = questions.filter(q => typeOf(q) === 'ordering')
    for (const q of ords) {
      expect(Array.isArray(q.items), `${certId} q${q.id} missing items`).toBe(true)
      expect(Array.isArray(q.correctOrder), `${certId} q${q.id} missing correctOrder`).toBe(true)
      expect(
        q.correctOrder.length,
        `${certId} q${q.id} correctOrder length must match items`
      ).toBe(q.items.length)
      // Must be a permutation of [0..n)
      const expected = [...Array(q.items.length).keys()]
      const sorted = [...q.correctOrder].sort((a, b) => a - b)
      expect(
        sorted,
        `${certId} q${q.id} correctOrder must be a permutation of 0..${q.items.length - 1}`
      ).toEqual(expected)
    }
  })

  it('matching questions have valid itemsLeft/itemsRight and correctMatches', () => {
    // NOTE: itemsLeft.length need NOT equal itemsRight.length. Many-to-one
    // matches are valid (e.g., 4 services → 3 categories). The real contract:
    //   - correctMatches.length === itemsLeft.length (one answer per left item)
    //   - each value is a valid index into itemsRight
    const matches = questions.filter(q => typeOf(q) === 'matching')
    for (const q of matches) {
      expect(Array.isArray(q.itemsLeft), `${certId} q${q.id} missing itemsLeft`).toBe(true)
      expect(Array.isArray(q.itemsRight), `${certId} q${q.id} missing itemsRight`).toBe(true)
      expect(Array.isArray(q.correctMatches), `${certId} q${q.id} missing correctMatches`).toBe(true)
      expect(q.itemsLeft.length, `${certId} q${q.id} itemsLeft empty`).toBeGreaterThan(0)
      expect(q.itemsRight.length, `${certId} q${q.id} itemsRight empty`).toBeGreaterThan(0)
      expect(
        q.correctMatches.length,
        `${certId} q${q.id} correctMatches length must match itemsLeft`
      ).toBe(q.itemsLeft.length)
      // Each index must point into itemsRight
      for (const idx of q.correctMatches) {
        expect(
          idx >= 0 && idx < q.itemsRight.length,
          `${certId} q${q.id} correctMatches has out-of-range index ${idx}`
        ).toBe(true)
      }
    }
  })

  it('statement-block questions have statements and a matching boolean answer array', () => {
    const sbs = questions.filter(q => typeOf(q) === 'statement-block')
    for (const q of sbs) {
      expect(Array.isArray(q.statements), `${certId} q${q.id} missing statements`).toBe(true)
      expect(Array.isArray(q.correctAnswers), `${certId} q${q.id} missing correctAnswers`).toBe(true)
      expect(
        q.correctAnswers.length,
        `${certId} q${q.id} correctAnswers length must match statements`
      ).toBe(q.statements.length)
      for (const a of q.correctAnswers) {
        expect(
          typeof a === 'boolean',
          `${certId} q${q.id} correctAnswers must be all booleans`
        ).toBe(true)
      }
    }
  })
})
