import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import certs, { getAllCerts, getAllCertsIncludingUnpublished } from '../data/certs.js'
import { COMING_SOON_CERT_IDS, LIVE_CERT_IDS } from '../data/catalogVisibility.js'
import { PRACTICAL_QUESTION_TYPES, weightedSelect } from '../utils/exam-selection.js'
import az900 from '../data/az-900-questions.json'
import clfc02 from '../data/questions.json'
import awsSaaC03 from '../data/aws-saa-c03-questions.json'
import cdl from '../data/cdl-questions.json'
import ncaAiio from '../data/nca-aiio-questions.json'
import ncaGenl from '../data/nca-genl-questions.json'
import ccstNetworking from '../data/ccst-networking-questions.json'
import ccna200301 from '../data/ccna-200-301-questions.json'
import comptiaNetPlus from '../data/comptia-net-plus-questions.json'
import comptiaSecPlus from '../data/comptia-sec-plus-questions.json'
import comptiaServerPlus from '../data/comptia-server-plus-questions.json'
import comptiaLinuxPlus from '../data/comptia-linux-plus-questions.json'
import schneiderDcca from '../data/schneider-dcca-questions.json'
import splunkCoreCertifiedUser from '../data/splunk-core-certified-user-questions.json'
import comptiaAPlusCore1 from '../data/comptia-a-plus-core-1-questions.json'
import comptiaAPlusCore2 from '../data/comptia-a-plus-core-2-questions.json'
import terraformAssoc from '../data/terraform-associate-questions.json'
import reNational from '../data/real-estate-national-questions.json'
import reTxState from '../data/real-estate-tx-state-questions.json'
import reMeState from '../data/real-estate-me-state-questions.json'
import reGaState from '../data/real-estate-ga-state-questions.json'
import reAzState from '../data/real-estate-az-state-questions.json'
import reNcState from '../data/real-estate-nc-state-questions.json'
import reInState from '../data/real-estate-in-state-questions.json'

// Map each cert to the JSON we statically imported.
// When adding a new cert, add it here too — the "registry fully mapped" test
// below will catch the omission.
const CERT_QUESTIONS = {
  'az-900': az900,
  'clf-c02': clfc02,
  'aws-saa-c03': awsSaaC03,
  'cdl': cdl,
  'nca-aiio': ncaAiio,
  'nca-genl': ncaGenl,
  'ccst-networking': ccstNetworking,
  'ccna-200-301': ccna200301,
  'comptia-net-plus': comptiaNetPlus,
  'comptia-sec-plus': comptiaSecPlus,
  'comptia-server-plus': comptiaServerPlus,
  'comptia-linux-plus': comptiaLinuxPlus,
  'schneider-dcca': schneiderDcca,
  'splunk-core-certified-user': splunkCoreCertifiedUser,
  'comptia-a-plus-core-1': comptiaAPlusCore1,
  'comptia-a-plus-core-2': comptiaAPlusCore2,
  'terraform-associate': terraformAssoc,
  'real-estate-national': reNational,
  'real-estate-tx': reTxState,
  'real-estate-me': reMeState,
  'real-estate-ga': reGaState,
  'real-estate-az': reAzState,
  'real-estate-nc': reNcState,
  'real-estate-in': reInState,
}

// Run per-question sanity checks on every cert that has content — including
// unpublished certs that are mid-authoring. Empty unpublished certs get
// dedicated registry-level checks below instead.
const NON_EMPTY_CERT_QUESTIONS = Object.fromEntries(
  Object.entries(CERT_QUESTIONS).filter(([, q]) => q.length > 0)
)

const VALID_TYPES = new Set([
  'single-choice',
  'true-false',
  'multiple-response',
  'statement-block',
  'ordering',
  'matching',
  'pbq-matching',
  'cli-output',
  'topology-scenario',
  'config-repair',
  'subnetting-drill',
])

function typeOf(q) {
  return q.type || 'single-choice'
}

// State-module questions carry an optional `portion` tag so the licensing-
// exam composer can split a merged pool into the national vs. state halves.
// National-pool questions omit it (treated as 'national').
const VALID_PORTIONS = new Set(['national', 'state'])

// ─── Registry wiring ────────────────────────────────────────────────────────

describe('cert registry', () => {
  it('every cert in certs.js has a matching question file in this test', () => {
    const registered = Object.keys(certs)
    const tested = Object.keys(CERT_QUESTIONS)
    expect(tested.sort()).toEqual(registered.sort())
  })

  it('every published cert has a non-empty question list', () => {
    const publishedEntries = Object.entries(certs).filter(([, c]) => c.published !== false)
    for (const [id] of publishedEntries) {
      const questions = CERT_QUESTIONS[id]
      expect(Array.isArray(questions), `${id} must be an array`).toBe(true)
      expect(questions.length, `${id} must have at least 1 question`).toBeGreaterThan(0)
    }
  })

  it('every cert has current source and simulation metadata', () => {
    for (const [id, cert] of Object.entries(certs)) {
      expect(cert.source, `${id} missing source metadata`).toBeTruthy()
      expect(cert.source.officialUrl, `${id} missing official source URL`).toMatch(/^https:\/\//)
      expect(cert.source.sourceLabel, `${id} missing source label`).toBeTruthy()
      expect(cert.source.checkedAt, `${id} missing source check date`).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(cert.source.examFormat, `${id} missing exam format note`).toBeTruthy()
      expect(cert.source.scoreModel, `${id} missing score model note`).toBeTruthy()
      expect(cert.source.editorialStatus, `${id} missing editorial status`).toBeTruthy()
    }
  })

  it('keeps audited live-bank readiness grades explicit', () => {
    expect(certs['comptia-a-plus-core-1'].source.readinessGrade).toBe('A+')
    expect(certs['comptia-a-plus-core-2'].source.readinessGrade).toBe('A+')
    expect(certs['splunk-core-certified-user'].source.readinessGrade).toBe('B+')
    expect(certs['terraform-associate'].source.readinessGrade).toBe('B+')
    expect(certs['ccst-networking'].source.readinessGrade).toBe('B+')
    expect(certs['comptia-net-plus'].source.readinessGrade).toBe('A-')
    expect(certs['comptia-sec-plus'].source.readinessGrade).toBe('A-')
    expect(certs['comptia-a-plus-core-1'].source.editorialStatus).toMatch(/full-bank interaction rewrite/i)
    expect(certs['comptia-a-plus-core-2'].source.editorialStatus).toMatch(/full-bank interaction rewrite/i)
  })

  it('every cert reports the same questionCount in the registry as its JSON (published or not)', () => {
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

  it('keeps unpublished authoring pools out of the public catalog list', () => {
    const publicIds = getAllCerts().map(c => c.id)
    const allIds = getAllCertsIncludingUnpublished().map(c => c.id)
    expect(publicIds).not.toContain('real-estate-tx')
    expect(allIds).toContain('real-estate-tx')
  })

  it('assigns every public IT cert to exactly one frontend visibility bucket', () => {
    const publicIds = getAllCerts().map((cert) => cert.id).sort()
    const visibleIds = [...LIVE_CERT_IDS, ...COMING_SOON_CERT_IDS].sort()
    const overlap = [...LIVE_CERT_IDS].filter((id) => COMING_SOON_CERT_IDS.has(id))

    expect(overlap).toEqual([])
    expect(visibleIds).toEqual(publicIds)
    expect(LIVE_CERT_IDS.has('comptia-a-plus-core-1')).toBe(true)
    expect(LIVE_CERT_IDS.has('comptia-a-plus-core-2')).toBe(true)
    expect(COMING_SOON_CERT_IDS.has('ccna-200-301')).toBe(true)
    expect(LIVE_CERT_IDS.has('terraform-associate')).toBe(true)
  })

})

// ─── Per-cert sanity ────────────────────────────────────────────────────────

describe.each(Object.entries(NON_EMPTY_CERT_QUESTIONS))('%s questions', (certId, questions) => {
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

  it('question text, every choice, and explanation are non-empty strings', () => {
    for (const q of questions) {
      expect(
        typeof q.question === 'string' && q.question.trim().length > 0,
        `${certId} q${q.id} has empty question text`
      ).toBe(true)
      expect(
        typeof q.explanation === 'string' && q.explanation.trim().length > 0,
        `${certId} q${q.id} has missing/empty explanation`
      ).toBe(true)
      if (Array.isArray(q.choices)) {
        q.choices.forEach((c, i) => {
          expect(
            typeof c === 'string' && c.trim().length > 0,
            `${certId} q${q.id} choice ${i} is empty`
          ).toBe(true)
        })
      }
    }
  })

  it('any question with a portion tag uses a recognized value', () => {
    for (const q of questions) {
      if (q.portion === undefined) continue
      expect(
        VALID_PORTIONS.has(q.portion),
        `${certId} q${q.id} has invalid portion "${q.portion}" (valid: national, state)`
      ).toBe(true)
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
    const scs = questions.filter(q => ['single-choice', 'true-false', 'cli-output', 'topology-scenario', 'config-repair'].includes(typeOf(q)))
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

  it('cli-output questions include command output blocks', () => {
    const cliQuestions = questions.filter(q => typeOf(q) === 'cli-output')
    for (const q of cliQuestions) {
      expect(Array.isArray(q.commands), `${certId} q${q.id} missing commands`).toBe(true)
      expect(q.commands.length, `${certId} q${q.id} needs at least one command`).toBeGreaterThan(0)
      for (const [index, command] of q.commands.entries()) {
        expect(typeof command.command === 'string' && command.command.trim().length > 0, `${certId} q${q.id} command ${index} missing command text`).toBe(true)
        expect(typeof command.output === 'string' && command.output.trim().length > 0, `${certId} q${q.id} command ${index} missing output`).toBe(true)
        if (command.device !== undefined) {
          expect(typeof command.device === 'string' && command.device.trim().length > 0, `${certId} q${q.id} command ${index} has invalid device`).toBe(true)
        }
      }
    }
  })

  it('topology-scenario questions include valid topology data', () => {
    const topologyQuestions = questions.filter(q => typeOf(q) === 'topology-scenario')
    for (const q of topologyQuestions) {
      expect(q.topology && typeof q.topology === 'object', `${certId} q${q.id} missing topology`).toBe(true)
      expect(Array.isArray(q.topology.nodes), `${certId} q${q.id} missing topology nodes`).toBe(true)
      expect(q.topology.nodes.length, `${certId} q${q.id} needs at least two nodes`).toBeGreaterThanOrEqual(2)
      expect(Array.isArray(q.topology.links), `${certId} q${q.id} missing topology links`).toBe(true)

      const nodeIds = new Set()
      for (const [index, node] of q.topology.nodes.entries()) {
        expect(typeof node.id === 'string' && node.id.trim().length > 0, `${certId} q${q.id} node ${index} missing id`).toBe(true)
        expect(typeof node.x === 'number', `${certId} q${q.id} node ${node.id} missing numeric x`).toBe(true)
        expect(typeof node.y === 'number', `${certId} q${q.id} node ${node.id} missing numeric y`).toBe(true)
        nodeIds.add(node.id)
      }

      for (const [index, link] of q.topology.links.entries()) {
        expect(nodeIds.has(link.from), `${certId} q${q.id} link ${index} references missing from node "${link.from}"`).toBe(true)
        expect(nodeIds.has(link.to), `${certId} q${q.id} link ${index} references missing to node "${link.to}"`).toBe(true)
      }

      if (Array.isArray(q.tables)) {
        for (const [index, table] of q.tables.entries()) {
          expect(typeof table.title === 'string' && table.title.trim().length > 0, `${certId} q${q.id} table ${index} missing title`).toBe(true)
          expect(Array.isArray(table.columns) && table.columns.length > 0, `${certId} q${q.id} table ${index} missing columns`).toBe(true)
          expect(Array.isArray(table.rows), `${certId} q${q.id} table ${index} missing rows`).toBe(true)
          for (const [rowIndex, row] of table.rows.entries()) {
            expect(row.length, `${certId} q${q.id} table ${index} row ${rowIndex} length must match columns`).toBe(table.columns.length)
          }
        }
      }
    }
  })

  it('config-repair questions include valid configuration blocks', () => {
    const configQuestions = questions.filter(q => typeOf(q) === 'config-repair')
    for (const q of configQuestions) {
      expect(Array.isArray(q.config), `${certId} q${q.id} missing config lines`).toBe(true)
      expect(q.config.length, `${certId} q${q.id} needs at least one config line`).toBeGreaterThan(0)
      for (const [index, line] of q.config.entries()) {
        expect(typeof line === 'string', `${certId} q${q.id} config line ${index} must be a string`).toBe(true)
      }
      if (q.scenario !== undefined) {
        expect(typeof q.scenario === 'string' && q.scenario.trim().length > 0, `${certId} q${q.id} has invalid scenario`).toBe(true)
      }
      if (q.device !== undefined) {
        expect(typeof q.device === 'string' && q.device.trim().length > 0, `${certId} q${q.id} has invalid device`).toBe(true)
      }
      if (q.configTitle !== undefined) {
        expect(typeof q.configTitle === 'string' && q.configTitle.trim().length > 0, `${certId} q${q.id} has invalid configTitle`).toBe(true)
      }
      if (q.notes !== undefined) {
        expect(Array.isArray(q.notes), `${certId} q${q.id} notes must be an array`).toBe(true)
        for (const [index, note] of q.notes.entries()) {
          expect(typeof note === 'string' && note.trim().length > 0, `${certId} q${q.id} note ${index} must be non-empty`).toBe(true)
        }
      }
    }
  })

  it('subnetting-drill questions include requested fields and correct values', () => {
    const subnetQuestions = questions.filter(q => typeOf(q) === 'subnetting-drill')
    for (const q of subnetQuestions) {
      expect(typeof q.given === 'string' && q.given.trim().length > 0, `${certId} q${q.id} missing subnet prompt`).toBe(true)
      expect(Array.isArray(q.asks), `${certId} q${q.id} missing asks`).toBe(true)
      expect(q.asks.length, `${certId} q${q.id} needs at least one requested field`).toBeGreaterThan(0)
      expect(q.correct && typeof q.correct === 'object' && !Array.isArray(q.correct), `${certId} q${q.id} missing correct answer object`).toBe(true)
      for (const field of q.asks) {
        expect(typeof field === 'string' && field.trim().length > 0, `${certId} q${q.id} has invalid ask field`).toBe(true)
        expect(q.correct[field] !== undefined, `${certId} q${q.id} missing correct value for ${field}`).toBe(true)
        expect(String(q.correct[field]).trim().length > 0, `${certId} q${q.id} correct value for ${field} is empty`).toBe(true)
      }
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

  it('SAA-C03 multiple-response questions use exam-like option counts', () => {
    if (certId !== 'aws-saa-c03') return

    const mrs = questions.filter(q => typeOf(q) === 'multiple-response')
    for (const q of mrs) {
      expect(q.choices.length, `${certId} q${q.id} should have at least five options`).toBeGreaterThanOrEqual(5)
      expect(q.correctAnswers.length, `${certId} q${q.id} should have at least two correct answers`).toBeGreaterThanOrEqual(2)
    }
  })

  it('SAA-C03 stems and explanations avoid generated editorial placeholders', () => {
    if (certId !== 'aws-saa-c03') return

    for (const q of questions) {
      expect(q.question, `${certId} q${q.id} still contains generated case phrasing`).not.toMatch(/case SAA-\d+/i)
      expect(q.explanation, `${certId} q${q.id} still contains generic explanation filler`).not.toContain(
        'The other options either add operational risk, weaken the design goal, or use a service for a purpose it does not provide.'
      )
    }
  })

  it('Schneider DCCA follows the official development-path course areas', () => {
    if (certId !== 'schneider-dcca') return

    const expectedCounts = {
      'Fundamentals of Availability': 54,
      'Fire Protection Methods': 54,
      'Cabling Strategies for Data Centers': 54,
      'Fundamentals of Cooling': 54,
      'Humidity in the Data Center': 54,
      'Physical Security': 54,
      'Fundamentals of Power': 54,
      'Generator Fundamentals': 54,
      'Optimizing Cooling Layouts': 54,
      'Power Redundancy': 54,
      'Power Distribution': 54,
      'Rack Fundamentals': 54,
      'Room, Row, and Rack Cooling': 51,
      'Physical Infrastructure Management': 51,
    }

    const counts = Object.fromEntries(Object.keys(expectedCounts).map(domain => [domain, 0]))
    for (const q of questions) counts[q.domain] += 1

    expect(counts).toEqual(expectedCounts)
    expect(new Set(questions.map(q => q.question)).size).toBe(questions.length)
  })

  it('Splunk Core Certified User follows the official blueprint weights', () => {
    if (certId !== 'splunk-core-certified-user') return

    const byDomain = questions.reduce((acc, q) => {
      acc[q.domain] = (acc[q.domain] || 0) + 1
      return acc
    }, {})

    expect(byDomain).toEqual({
      'Splunk Basics': 38,
      'Basic Searching': 165,
      'Using Fields in Searches': 150,
      'Search Language Fundamentals': 113,
      'Using Basic Transforming Commands': 112,
      'Creating Reports and Dashboards': 90,
      'Creating and Using Lookups': 45,
      'Creating Scheduled Reports and Alerts': 37,
    })

    const byType = questions.reduce((acc, q) => {
      acc[typeOf(q)] = (acc[typeOf(q)] || 0) + 1
      return acc
    }, {})

    expect(byType['single-choice']).toBeGreaterThan(500)
    expect(byType['multiple-response']).toBeGreaterThanOrEqual(90)
    expect(byType['matching']).toBeGreaterThanOrEqual(35)
    expect(byType['ordering']).toBeGreaterThanOrEqual(15)
    expect(new Set(questions.map(q => q.question)).size).toBe(750)

    const structuralStems = new Set(questions.map(q =>
      q.question
        .toLowerCase()
        .replace(/`[^`]+`/g, '<code>')
        .replace(/\d+/g, '#')
        .replace(/[^a-z#<>]+/g, ' ')
        .trim()
    ))
    expect(structuralStems.size).toBeGreaterThanOrEqual(500)
  })

  it('Splunk Core Certified User keeps the concise evidence-led editorial pass', () => {
    if (certId !== 'splunk-core-certified-user') return

    const stemLengths = questions.map(question => question.question.length).sort((a, b) => a - b)
    const median = stemLengths[Math.floor(stemLengths.length / 2)]
    const p90 = stemLengths[Math.floor(stemLengths.length * 0.9)]
    const examStyle = questions.filter(question =>
      ['single-choice', 'multiple-response'].includes(typeOf(question))
    )

    expect(median).toBeLessThanOrEqual(230)
    expect(p90).toBeLessThanOrEqual(270)
    expect(questions.filter(question => question.question.length > 320).length).toBeLessThanOrEqual(20)
    expect(questions.filter(question => question.question.length > 420)).toHaveLength(0)
    expect(questions.every(question =>
      /Why this is right:.*Why the alternatives are wrong:.*Review takeaway:/.test(question.explanation)
    )).toBe(true)

    expect(examStyle.length).toBe(690)
    expect(examStyle.every(question => question.evidenceArtifacts?.length === 1)).toBe(true)
    const retiredWeakDistractors = [
      'Splunk is used only to draw network cabling diagrams',
      'Splunk is only a packet capture appliance',
      'The browser cache is where SPL searches run',
      'The license page is the primary place to run SPL',
      'Lookups are only dashboard color palettes',
      'A lookup definition controls physical disk RAID',
      'The lookup file must always be empty before use',
      'A scheduled report deletes old lookup rows',
      'An alert is only a dashboard color theme',
    ]
    for (const question of examStyle) {
      expect(question.choices.some(choice => retiredWeakDistractors.includes(choice))).toBe(false)
    }

    for (const question of examStyle) {
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

  it('Cisco CCST Networking follows the official 100-150 domain shape and quality gate', () => {
    if (certId !== 'ccst-networking') return

    const byDomain = questions.reduce((acc, q) => {
      acc[q.domain] = (acc[q.domain] || 0) + 1
      return acc
    }, {})
    expect(byDomain).toEqual({
      'Standards and Concepts': 113,
      'Addressing and Subnet Formats': 150,
      'Endpoints and Media Types': 150,
      Infrastructure: 150,
      'Diagnosing Problems': 112,
      Security: 75,
    })

    const byType = questions.reduce((acc, question) => {
      const type = typeOf(question)
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})
    expect(byType).toEqual({
      'single-choice': 450,
      'multiple-response': 150,
      matching: 75,
      ordering: 75,
    })

    const normalized = new Set(questions.map(question =>
      question.question
        .toLowerCase()
        .replace(/`[^`]+`/g, '<code>')
        .replace(/\d+/g, '#')
        .replace(/[^a-z#<>]+/g, ' ')
        .trim()
    ))
    expect(new Set(questions.map(question => question.question)).size).toBe(750)
    expect(normalized.size).toBe(750)

    const selectedResponse = questions.filter(question =>
      ['single-choice', 'multiple-response'].includes(typeOf(question))
    )
    expect(selectedResponse).toHaveLength(600)
    expect(selectedResponse.every(question => question.evidenceArtifacts?.length === 1)).toBe(true)
    expect(questions.every(question => question.evidenceArtifacts?.length === 1)).toBe(true)
    expect(questions.every(question =>
      /Why this is right:.*Why the alternatives are wrong:.*Review takeaway:/.test(question.explanation)
    )).toBe(true)

    for (const question of questions) {
      expect(question.question, `${question.id} contains old generated case phrasing`).not.toMatch(
        /case \d+|learner|review sheet|CCNA study plan|support ticket|ticket handoff/i,
      )
      expect(question.explanation.length, `${question.id} needs review-quality rationale`).toBeGreaterThanOrEqual(220)
    }
  })

  it('live A+, Splunk, and CCST banks avoid synthetic ticket framing', () => {
    if (![
      'comptia-a-plus-core-1',
      'comptia-a-plus-core-2',
      'splunk-core-certified-user',
      'ccst-networking',
    ].includes(certId)) return

    for (const q of questions) {
      expect(q.question, `${certId} q${q.id} contains a synthetic ticket ID`).not.toMatch(
        /\b(?:ticket|case)\s+[A-Z]{2,}-\d+\b/i
      )
      expect(q.question, `${certId} q${q.id} contains generated scenario filler`).not.toMatch(
        /\bscenario includes\b/i
      )
    }
  })

  it('tracks the exposed live-bank stem diversity baseline', () => {
    const minimumUniqueStems = {
      'comptia-a-plus-core-1': 760,
      'comptia-a-plus-core-2': 760,
      'splunk-core-certified-user': 750,
      'ccst-networking': 750,
    }
    if (!minimumUniqueStems[certId]) return

    const uniqueStems = new Set(questions.map(q =>
      q.question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
    )).size

    expect(uniqueStems).toBeGreaterThanOrEqual(minimumUniqueStems[certId])
  })

  it('A+ banks keep the evidence rewrite and practical-item baseline', () => {
    if (!['comptia-a-plus-core-1', 'comptia-a-plus-core-2'].includes(certId)) return

    const expectedObjectiveIds = certId === 'comptia-a-plus-core-1'
      ? [
          '1.1', '1.2', '1.3',
          '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8',
          '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8',
          '4.1', '4.2',
          '5.1', '5.2', '5.3', '5.4', '5.5', '5.6',
        ]
      : [
          '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '1.10', '1.11',
          '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9', '2.10', '2.11',
          '3.1', '3.2', '3.3', '3.4',
          '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9', '4.10',
        ]
    const expectedDomains = certId === 'comptia-a-plus-core-1'
      ? {
          1: 'Mobile Devices',
          2: 'Networking',
          3: 'Hardware',
          4: 'Virtualization and Cloud Computing',
          5: 'Hardware and Network Troubleshooting',
        }
      : {
          1: 'Operating Systems',
          2: 'Security',
          3: 'Software Troubleshooting',
          4: 'Operational Procedures',
        }

    expect(questions).toHaveLength(760)
    const practicalQuestions = questions.filter(q => typeOf(q) === 'pbq-matching')
    expect(practicalQuestions).toHaveLength(20)
    expect(new Set(questions.map(q => q.objectiveId))).toEqual(new Set(expectedObjectiveIds))

    const requiredPracticalCategories = certId === 'comptia-a-plus-core-1'
      ? ['hardware-diagnostics', 'network-connectivity', 'mobile-peripherals', 'storage-configuration', 'virtualization-cloud']
      : ['os-tools', 'security-response', 'software-mobile', 'operational-workflow']
    expect(new Set(practicalQuestions.map(q => q.practicalCategory))).toEqual(new Set(requiredPracticalCategories))

    for (const q of practicalQuestions) {
      expect(q.pbq.category).toBe(q.practicalCategory)
      expect(q.pbq.task.length, `${certId} ${q.id} needs a task brief`).toBeGreaterThanOrEqual(60)
      expect(q.pbq.artifacts, `${certId} ${q.id} needs practical artifacts`).toHaveLength(1)
      expect(['console', 'table', 'checklist']).toContain(q.pbq.artifacts[0].type)
      expect(q.componentFeedback, `${certId} ${q.id} needs component feedback`).toHaveLength(q.itemsLeft.length)
      for (const component of q.componentFeedback) {
        expect(component.action.length).toBeGreaterThan(20)
        expect(component.why.length).toBeGreaterThanOrEqual(100)
      }
    }

    const normalizedStems = new Set(questions.map(q =>
      q.question
        .toLowerCase()
        .replace(/`[^`]+`/g, '<code>')
        .replace(/\d+/g, '#')
        .replace(/[^a-z#<>]+/g, ' ')
        .trim()
    ))
    expect(normalizedStems.size).toBe(760)

    for (const objectiveId of expectedObjectiveIds) {
      const objectiveQuestions = questions.filter(q => q.objectiveId === objectiveId)
      expect(objectiveQuestions.length, `${certId} objective ${objectiveId} has no questions`).toBeGreaterThan(0)
      expect(
        new Set(objectiveQuestions.map(q => q.conceptId)).size,
        `${certId} objective ${objectiveId} needs at least two concepts`
      ).toBeGreaterThanOrEqual(2)
    }

    for (const q of questions) {
      expect(q.domain, `${certId} q${q.id} objective/domain mismatch`).toBe(
        expectedDomains[Number(q.objectiveId.split('.')[0])]
      )
    }

    for (const q of questions.filter(q => typeOf(q) !== 'pbq-matching')) {
      expect(q.question, `${certId} q${q.id} uses generated ticket framing`).not.toMatch(/\bticket\b/i)
      expect(q.explanation.length, `${certId} q${q.id} explanation is too short`).toBeGreaterThanOrEqual(120)
    }

    for (const q of questions.filter(q => typeOf(q) === 'multiple-response')) {
      expect(q.choices, `${certId} q${q.id} still uses the retired generic answer`).not.toContain(
        'Verify the change after implementation and document the result'
      )
    }
  })

  it('CompTIA Linux+ follows the XK0-006 domain-weight target and PBQ-style mix', () => {
    if (certId !== 'comptia-linux-plus') return

    const byDomain = questions.reduce((acc, q) => {
      acc[q.domain] = (acc[q.domain] || 0) + 1
      return acc
    }, {})

    expect(byDomain).toEqual({
      'System Management': 173,
      'Services and User Management': 150,
      Security: 135,
      'Automation, Orchestration, and Scripting': 127,
      Troubleshooting: 165,
    })

    const byType = questions.reduce((acc, q) => {
      acc[typeOf(q)] = (acc[typeOf(q)] || 0) + 1
      return acc
    }, {})

    expect(byType['cli-output']).toBeGreaterThanOrEqual(50)
    expect(byType['config-repair']).toBeGreaterThanOrEqual(40)
    expect(byType['multiple-response']).toBeGreaterThanOrEqual(80)
    expect(new Set(questions.map(q => q.question)).size).toBe(questions.length)
  })

  it('SAA-C03 explanations teach the review-mode decision path', () => {
    if (certId !== 'aws-saa-c03') return

    for (const q of questions) {
      expect(q.explanation, `${certId} q${q.id} should explain why the answer is right`).toContain('Why this is right:')
      expect(q.explanation, `${certId} q${q.id} should explain why distractors fail`).toContain('Why distractors fail:')
      expect(q.explanation, `${certId} q${q.id} should include architecture guidance`).toContain('Architecture takeaway:')
    }
  })

  it('SAA-C03 stems remain unique enough for realistic review sessions', () => {
    if (certId !== 'aws-saa-c03') return

    const stems = questions.map(q => q.question)
    expect(new Set(stems).size, `${certId} should not contain exact duplicate stems`).toBe(stems.length)
  })

  it('SAA-C03 stems avoid generic or mismatched architecture framing', () => {
    if (certId !== 'aws-saa-c03') return

    for (const q of questions) {
      expect(q.question, `${certId} q${q.id} should not use fallback service-selection wording`).not.toMatch(
        /best-fit managed service|service selection tradeoff|recommended AWS managed service pattern/i
      )

      const correctText = Array.isArray(q.correctAnswers)
        ? q.correctAnswers.map(i => q.choices[i]).join(' ')
        : q.choices[q.correctAnswer]

      if (/Savings Plans|Reserved Instances/.test(correctText)) {
        expect(q.question, `${certId} q${q.id} should frame commitments as steady-state usage, not Spot batch work`).not.toMatch(
          /batch processing fleet|batch compute spend/i
        )
      }
    }
  })

  it('CompTIA Network+ follows the N10-009 domain-weight target for the current pool', () => {
    if (certId !== 'comptia-net-plus') return

    const byDomain = questions.reduce((acc, q) => {
      acc[q.domain] = (acc[q.domain] || 0) + 1
      return acc
    }, {})

    expect(byDomain).toEqual({
      'Networking Concepts': 174,
      'Network Implementation': 152,
      'Network Operations': 145,
      'Network Security': 107,
      'Network Troubleshooting': 182,
    })
  })

  it('CompTIA Network+ troubleshooting coverage stays scenario-forward', () => {
    if (certId !== 'comptia-net-plus') return

    const troubleshootingQuestions = questions.filter(q => q.domain === 'Network Troubleshooting')
    expect(troubleshootingQuestions).toHaveLength(182)

    const evidenceBasedCount = troubleshootingQuestions.filter(q =>
      /^(Users report|A post-incident review|Before changing production settings|A second location|After correcting)/.test(q.question)
        && q.question.length >= 100
        && /address|ARP|DHCP|DNS|duplex|firewall|latency|light|MTU|RTP|route|trunk|VLAN|wireless|PoE|MAC/i.test(q.question)
        && q.explanation.length >= 180
    ).length

    expect(evidenceBasedCount).toBeGreaterThanOrEqual(80)
  })

  it('Terraform Associate 004 uses the official direct question formats across every objective', () => {
    if (certId !== 'terraform-associate') return

    const byType = questions.reduce((acc, q) => {
      acc[typeOf(q)] = (acc[typeOf(q)] || 0) + 1
      return acc
    }, {})

    expect(byType).toEqual({
      'single-choice': 591,
      'true-false': 24,
      'multiple-response': 32,
    })

    const expectedObjectives = [
      '1a', '1b', '1c',
      '2a', '2b', '2c', '2d',
      '3a', '3b', '3c', '3d', '3e', '3f', '3g',
      '4a', '4b', '4c', '4d', '4e', '4f', '4g', '4h',
      '5a', '5b', '5c', '5d',
      '6a', '6b', '6c', '6d',
      '7a', '7b', '7c',
      '8a', '8b', '8c', '8d',
    ]
    expect(new Set(questions.map(q => q.objectiveId))).toEqual(new Set(expectedObjectives))

    for (const objectiveId of expectedObjectives) {
      const objectiveQuestions = questions.filter(q => q.objectiveId === objectiveId)
      expect(objectiveQuestions.length, `Terraform objective ${objectiveId} is thin`).toBeGreaterThanOrEqual(3)
      expect(
        new Set(objectiveQuestions.map(q => q.conceptId)).size,
        `Terraform objective ${objectiveId} needs at least two concepts`,
      ).toBeGreaterThanOrEqual(2)
    }

    expect(cert.domainWeightSource).toBe('editorial-practice')

    for (const domain of cert.domains) {
      const domainQuestions = questions.filter(q => q.domain === domain.name)
      expect(
        domainQuestions.filter(q => typeOf(q) === 'true-false').length,
        `${domain.name} missing true/false coverage`,
      ).toBe(3)
      expect(
        domainQuestions.filter(q => typeOf(q) === 'multiple-response').length,
        `${domain.name} missing multiple-answer coverage`,
      ).toBe(4)
    }
  })

  it('true-false questions use exactly True and False choices', () => {
    const trueFalse = questions.filter(q => typeOf(q) === 'true-false')
    for (const q of trueFalse) {
      expect(q.choices, `${certId} q${q.id} must use True/False choices`).toEqual(['True', 'False'])
      expect([0, 1], `${certId} q${q.id} has invalid true/false answer`).toContain(q.correctAnswer)
    }
  })

  it('CompTIA Network+ retains practical PBQ-style evidence coverage', () => {
    if (certId !== 'comptia-net-plus') return

    const byType = questions.reduce((acc, q) => {
      acc[typeOf(q)] = (acc[typeOf(q)] || 0) + 1
      return acc
    }, {})

    expect(byType['cli-output']).toBeGreaterThanOrEqual(5)
    expect(byType['topology-scenario']).toBeGreaterThanOrEqual(5)
    expect(byType['config-repair']).toBeGreaterThanOrEqual(2)
    expect(byType['pbq-matching']).toBeGreaterThanOrEqual(20)
    expect(
      (byType['pbq-matching'] || 0)
      + (byType['cli-output'] || 0)
      + (byType['topology-scenario'] || 0)
      + (byType['config-repair'] || 0)
    ).toBeGreaterThanOrEqual(32)
  })

  it('CompTIA Network+ keeps the enriched practical interaction set', () => {
    if (certId !== 'comptia-net-plus') return

    const enriched = questions.filter(question => /^netplus-pbq-\d{3}$/.test(question.id))
    const expectedCategories = [
      'cable-mapping',
      'routing-analysis',
      'wireless-survey',
      'multi-artifact-troubleshooting',
    ]

    expect(enriched).toHaveLength(10)
    expect(new Set(enriched.map(question => question.practicalCategory))).toEqual(new Set(expectedCategories))

    for (const category of expectedCategories) {
      expect(
        enriched.filter(question => question.practicalCategory === category).length,
        `Network+ practical category ${category} needs multiple scenarios`,
      ).toBeGreaterThanOrEqual(2)
    }

    for (const question of enriched) {
      expect(question.pbq.category).toBe(question.practicalCategory)
      expect(question.pbq.task.length, `${question.id} needs an operational task brief`).toBeGreaterThanOrEqual(80)
      expect(question.pbq.artifacts, `${question.id} needs correlated artifacts`).toHaveLength(2)
      expect(new Set(question.pbq.artifacts.map(artifact => artifact.type)).size).toBeGreaterThanOrEqual(2)
      expect(question.componentFeedback, `${question.id} needs component coaching`).toHaveLength(question.itemsLeft.length)
      expect(question.explanation.length, `${question.id} needs review-quality rationale`).toBeGreaterThanOrEqual(180)

      for (const component of question.componentFeedback) {
        expect(component.label.length).toBeGreaterThan(15)
        expect(component.action.length).toBeGreaterThan(20)
        expect(component.why.length).toBeGreaterThan(120)
      }
    }

    const cableValidation = questions.find(question => question.id === 'netplus-pbq-006')
    expect(cableValidation.objectiveId).toBe('2.4')
    expect(cableValidation.objectiveTitle).toMatch(/physical installation/i)
  })

  it('CompTIA Security+ retains practical log, segmentation, and control-repair coverage', () => {
    if (certId !== 'comptia-sec-plus') return

    const byType = questions.reduce((acc, q) => {
      acc[typeOf(q)] = (acc[typeOf(q)] || 0) + 1
      return acc
    }, {})

    expect(byType['cli-output']).toBeGreaterThanOrEqual(6)
    expect(byType['topology-scenario']).toBeGreaterThanOrEqual(3)
    expect(byType['config-repair']).toBeGreaterThanOrEqual(3)
    expect(byType['pbq-matching']).toBeGreaterThanOrEqual(20)
    expect(
      (byType['pbq-matching'] || 0)
      + (byType['cli-output'] || 0)
      + (byType['topology-scenario'] || 0)
      + (byType['config-repair'] || 0)
    ).toBeGreaterThanOrEqual(33)
  })

  it('CompTIA Security+ keeps the enriched practical interaction set', () => {
    if (certId !== 'comptia-sec-plus') return

    const enriched = questions.filter(question => /^secplus-pbq-\d{3}$/.test(question.id))
    const expectedCategories = [
      'log-triage',
      'firewall-policy',
      'incident-correlation',
      'control-placement',
    ]

    expect(enriched).toHaveLength(10)
    expect(new Set(enriched.map(question => question.practicalCategory))).toEqual(new Set(expectedCategories))

    for (const category of expectedCategories) {
      expect(
        enriched.filter(question => question.practicalCategory === category).length,
        `Security+ practical category ${category} needs multiple scenarios`,
      ).toBeGreaterThanOrEqual(2)
    }

    for (const question of enriched) {
      expect(question.pbq.category).toBe(question.practicalCategory)
      expect(question.pbq.task.length, `${question.id} needs an operational task brief`).toBeGreaterThanOrEqual(85)
      expect(question.pbq.artifacts, `${question.id} needs correlated artifacts`).toHaveLength(2)
      expect(new Set(question.pbq.artifacts.map(artifact => artifact.type)).size).toBeGreaterThanOrEqual(2)
      expect(question.componentFeedback, `${question.id} needs component coaching`).toHaveLength(question.itemsLeft.length)
      expect(question.explanation.length, `${question.id} needs review-quality rationale`).toBeGreaterThanOrEqual(190)

      for (const component of question.componentFeedback) {
        expect(component.label.length).toBeGreaterThan(15)
        expect(component.action.length).toBeGreaterThan(4)
        expect(component.why.length).toBeGreaterThan(130)
      }
    }

    const logInvestigation = questions.find(question => question.id === 'secplus-pbq-005')
    expect(logInvestigation.objectiveId).toBe('4.9')
    expect(logInvestigation.objectiveTitle).toMatch(/data sources/i)

    const orderedPolicy = questions.find(question => question.id === 'secplus-pbq-010')
    expect(orderedPolicy.objectiveId).toBe('3.3')
    expect(orderedPolicy.pbq.title).toMatch(/ordered data-egress policy/i)
    expect(orderedPolicy.pbq.artifacts[0].rows.map(row => row[0])).toEqual(['10', '20', '30', '40', '50'])
  })

  it('Network+ and Security+ carry complete objective learning metadata', () => {
    if (!['comptia-net-plus', 'comptia-sec-plus'].includes(certId)) return

    expect(cert.objectives.length).toBe(certId === 'comptia-net-plus' ? 27 : 28)
    const expectedIds = new Set(cert.objectives.map(objective => objective.id))
    expect(new Set(questions.map(question => question.objectiveId))).toEqual(expectedIds)

    for (const objective of cert.objectives) {
      const matches = questions.filter(question => question.objectiveId === objective.id)
      expect(matches.length, `${certId} objective ${objective.id} is thin`).toBeGreaterThanOrEqual(3)
      expect(
        new Set(matches.map(question => question.conceptId)).size,
        `${certId} objective ${objective.id} needs a classified concept family`,
      ).toBeGreaterThanOrEqual(1)
      expect(matches.every(question => question.domain === objective.domain)).toBe(true)
      expect(matches.every(question => question.objectiveTitle)).toBe(true)
    }
  })

  it('Network+ and Security+ practical scenarios retain review-quality explanations', () => {
    if (!['comptia-net-plus', 'comptia-sec-plus'].includes(certId)) return
    const practicalTypes = new Set(['pbq-matching', 'cli-output', 'topology-scenario', 'config-repair'])
    const practical = questions.filter(question => practicalTypes.has(typeOf(question)))

    expect(practical.length).toBeGreaterThanOrEqual(certId === 'comptia-net-plus' ? 32 : 33)
    expect(practical.every(question => question.objectiveId && question.conceptId)).toBe(true)
    expect(practical.every(question => question.explanation.length >= 140)).toBe(true)
  })

  it('Google Cloud Digital Leader follows the current six-section guide', () => {
    if (certId !== 'cdl') return

    const byDomain = questions.reduce((acc, q) => {
      acc[q.domain] = (acc[q.domain] || 0) + 1
      return acc
    }, {})

    expect(byDomain).toEqual({
      'Digital Transformation with Google Cloud': 128,
      'Exploring Data Transformation with Google Cloud': 120,
      'Innovating with Google Cloud Artificial Intelligence': 120,
      'Modernizing Infrastructure and Applications with Google Cloud': 127,
      'Trust and Security with Google Cloud': 127,
      'Scaling with Google Cloud Operations': 127,
    })
  })

  it('NVIDIA AIIO source pool follows the official domain weights', () => {
    if (certId !== 'nca-aiio') return

    const byDomain = questions.reduce((acc, q) => {
      acc[q.domain] = (acc[q.domain] || 0) + 1
      return acc
    }, {})

    expect(byDomain).toEqual({
      'AI Infrastructure': 134,
      'Essential AI Knowledge': 128,
      'AI Operations': 74,
    })
  })

  it('AZ-900 source pool stays inside Microsoft ranged domain weights', () => {
    if (certId !== 'az-900') return

    const byDomain = questions.reduce((acc, q) => {
      acc[q.domain] = (acc[q.domain] || 0) + 1
      return acc
    }, {})

    expect(byDomain).toEqual({
      'Describe cloud concepts': 162,
      'Describe Azure architecture and services': 228,
      'Describe Azure management and governance': 210,
    })
  })

  it('Texas state-law pool follows the listed 2026 TREC/Pearson VUE outline', () => {
    if (certId !== 'real-estate-tx') return

    const byDomain = questions.reduce((acc, q) => {
      acc[q.domain] = (acc[q.domain] || 0) + 1
      return acc
    }, {})

    expect(byDomain).toEqual({
      'Commission Duties & Powers': 24,
      Licensing: 32,
      'Standards of Conduct': 72,
      'Agency & Brokerage': 80,
      'Contracts (TREC Forms & Disclosures)': 64,
      'Special Topics (TX)': 48,
      'Case Studies (TX)': 81,
    })

    const caseStudies = questions.filter(q => q.domain === 'Case Studies (TX)')
    expect(caseStudies).toHaveLength(81)
    expect(caseStudies.filter(q => /^Case TX-\d{2}:/.test(q.question)).length).toBeGreaterThanOrEqual(75)
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
    const matches = questions.filter(q => typeOf(q) === 'matching' || typeOf(q) === 'pbq-matching')
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

  it('pbq-matching questions include scenario evidence', () => {
    const pbqs = questions.filter(q => typeOf(q) === 'pbq-matching')
    for (const q of pbqs) {
      expect(q.pbq && typeof q.pbq === 'object' && !Array.isArray(q.pbq), `${certId} q${q.id} missing pbq context`).toBe(true)
      expect(typeof q.pbq.title === 'string' && q.pbq.title.trim().length > 0, `${certId} q${q.id} missing pbq title`).toBe(true)
      expect(typeof q.pbq.scenario === 'string' && q.pbq.scenario.trim().length > 0, `${certId} q${q.id} missing pbq scenario`).toBe(true)
      expect(Array.isArray(q.pbq.evidence), `${certId} q${q.id} pbq evidence must be an array`).toBe(true)
      expect(q.pbq.evidence.length, `${certId} q${q.id} needs at least one evidence group`).toBeGreaterThan(0)

      for (const [groupIndex, group] of q.pbq.evidence.entries()) {
        expect(typeof group.title === 'string' && group.title.trim().length > 0, `${certId} q${q.id} evidence group ${groupIndex} missing title`).toBe(true)
        expect(Array.isArray(group.items), `${certId} q${q.id} evidence group ${groupIndex} missing items`).toBe(true)
        expect(group.items.length, `${certId} q${q.id} evidence group ${groupIndex} needs at least one item`).toBeGreaterThan(0)
        for (const [itemIndex, item] of group.items.entries()) {
          expect(typeof item.label === 'string' && item.label.trim().length > 0, `${certId} q${q.id} evidence ${groupIndex}.${itemIndex} missing label`).toBe(true)
          expect(typeof item.value === 'string' && item.value.trim().length > 0, `${certId} q${q.id} evidence ${groupIndex}.${itemIndex} missing value`).toBe(true)
        }
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

describe('CCNA 200-301 v2.0 preview pool', () => {
  it('is preserved while covering the 750-item v2.0 simulation mix', () => {
    expect(certs['ccna-200-301'].published).not.toBe(false)
    expect(ccna200301).toHaveLength(750)

    const byDomain = ccna200301.reduce((acc, q) => {
      acc[q.domain] = (acc[q.domain] || 0) + 1
      return acc
    }, {})
    expect(byDomain).toEqual({
      'Network Infrastructure and Connectivity': 188,
      'Switching and Network Access': 187,
      'IP Routing': 150,
      'Network Services and Security': 150,
      'AI, Network Operations, and Management': 75,
    })

    const byType = ccna200301.reduce((acc, q) => {
      acc[typeOf(q)] = (acc[typeOf(q)] || 0) + 1
      return acc
    }, {})
    expect(byType['single-choice']).toBe(250)
    expect(byType['multiple-response']).toBe(60)
    expect(byType['cli-output']).toBe(170)
    expect(byType['topology-scenario']).toBe(120)
    expect(byType['config-repair']).toBe(100)
    expect(byType['subnetting-drill']).toBe(50)
  })

  it('keeps the preview pool varied enough for editorial QA', () => {
    const stems = ccna200301.map(q => q.question)
    expect(new Set(stems).size).toBe(stems.length)

    const answerPositions = ccna200301.reduce((acc, q) => {
      if (Number.isInteger(q.correctAnswer)) {
        acc[q.correctAnswer] = (acc[q.correctAnswer] || 0) + 1
      }
      return acc
    }, {})
    const counts = Object.values(answerPositions)
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(6)

    const explanationPrefixes = ccna200301.map(q => q.explanation.slice(0, 100))
    const repeatedPrefixCount = explanationPrefixes.length - new Set(explanationPrefixes).size
    expect(repeatedPrefixCount).toBeLessThanOrEqual(2)
  })

  it('keeps simulation scenarios aligned to their CCNA domain', () => {
    const operationsSims = ccna200301.filter(q =>
      q.domain === 'AI, Network Operations, and Management'
      && ['topology-scenario', 'config-repair'].includes(typeOf(q))
    )
    for (const q of operationsSims) {
      const text = JSON.stringify(q).toLowerCase()
      expect(text, `${q.id} should be operations, AI, or controller focused`).toMatch(/ai|prompt|syslog|snmp|ansible|controller|api|rest|json|management/)
      expect(text, `${q.id} should not reuse VLAN trunk repair content`).not.toMatch(/trunk allowed vlan|vlan 20 users cannot cross/)
    }

    const serviceSims = ccna200301.filter(q =>
      q.domain === 'Network Services and Security'
      && ['topology-scenario', 'config-repair'].includes(typeOf(q))
    )
    for (const q of serviceSims) {
      const text = JSON.stringify(q).toLowerCase()
      expect(text, `${q.id} should stay focused on services or security controls`).toMatch(/nat|pat|dhcp|helper|dns|acl|ssh|sftp|scp|snooping|arp|permit|deny/)
    }
  })

  it('keeps the CCNA audit plan aligned with the preserved 750-item v2.0 preview', () => {
    const audit = readFileSync('scripts/audits/ccna-prod-readiness-audit.md', 'utf8')

    expect(audit).toContain('Status: `ccna-200-301` is preserved as Coming Soon')
    expect(audit).toContain('| Network Infrastructure and Connectivity | 188 |')
    expect(audit).toContain('| Switching and Network Access | 187 |')
    expect(audit).toContain('| IP Routing | 150 |')
    expect(audit).toContain('| Network Services and Security | 150 |')
    expect(audit).toContain('| AI, Network Operations, and Management | 75 |')
    expect(audit).toContain('| CLI output | 170 |')
    expect(audit).toContain('| Subnetting drill | 50 |')
    expect(audit).toContain('Cisco 200-301 v2.0')
    expect(audit).toContain('## Production Gate')
  })

})

describe('CompTIA practical exam forms', () => {
  it.each([
    [
      'comptia-a-plus-core-1',
      comptiaAPlusCore1,
      {
        'Mobile Devices': 12,
        'Networking': 21,
        'Hardware': 22,
        'Virtualization and Cloud Computing': 10,
        'Hardware and Network Troubleshooting': 25,
      },
    ],
    [
      'comptia-a-plus-core-2',
      comptiaAPlusCore2,
      {
        'Operating Systems': 25,
        'Security': 25,
        'Software Troubleshooting': 21,
        'Operational Procedures': 19,
      },
    ],
    [
      'comptia-net-plus',
      comptiaNetPlus,
      {
        'Networking Concepts': 21,
        'Network Implementation': 18,
        'Network Operations': 17,
        'Network Security': 13,
        'Network Troubleshooting': 21,
      },
    ],
    [
      'comptia-sec-plus',
      comptiaSecPlus,
      {
        'General Security Concepts': 11,
        'Threats, Vulnerabilities, and Mitigations': 20,
        'Security Architecture': 16,
        'Security Operations': 25,
        'Security Program Management and Oversight': 18,
      },
    ],
  ])('%s forms preserve blueprint allocation and practical coverage', (certId, questions, expectedDomains) => {
    const cert = certs[certId]
    const auditRuns = ['comptia-net-plus', 'comptia-sec-plus'].includes(certId) ? 500 : 50

    for (let run = 0; run < auditRuns; run++) {
      const form = weightedSelect(questions, cert.examQuestions, cert.domains, {
        practicalQuestionTarget: cert.practicalQuestionTarget,
        requiredPracticalCategories: cert.requiredPracticalCategories,
        requiredTypeCounts: cert.requiredTypeCounts,
        allowedQuestionTypes: cert.examAllowedTypes,
      })
      const byDomain = form.reduce((acc, question) => {
        acc[question.domain] = (acc[question.domain] || 0) + 1
        return acc
      }, {})
      const practicalCount = form.filter((question) =>
        PRACTICAL_QUESTION_TYPES.has(typeOf(question))
      ).length

      expect(form).toHaveLength(90)
      expect(byDomain).toEqual(expectedDomains)
      expect(practicalCount).toBeGreaterThanOrEqual(6)
      for (const category of cert.requiredPracticalCategories || []) {
        expect(form.some(question => question.practicalCategory === category)).toBe(true)
      }
      for (const [type, minimum] of Object.entries(cert.requiredTypeCounts || {})) {
        expect(
          form.filter(question => typeOf(question) === type).length,
          `${certId} form is missing required ${type} coverage`,
        ).toBeGreaterThanOrEqual(minimum)
      }
      if (certId.startsWith('comptia-a-plus')) {
        expect(form.some(question => ['matching', 'statement-block'].includes(typeOf(question)))).toBe(false)
      }
    }
  })
})

describe('Terraform Associate 004 exam forms', () => {
  it('preserves the editorial practice allocation and guarantees official question formats', () => {
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

    for (let run = 0; run < 50; run++) {
      const form = weightedSelect(terraformAssoc, cert.examQuestions, cert.domains, {
        requiredTypeCounts: cert.requiredTypeCounts,
      })
      const byDomain = form.reduce((acc, question) => {
        acc[question.domain] = (acc[question.domain] || 0) + 1
        return acc
      }, {})
      const byType = form.reduce((acc, question) => {
        acc[typeOf(question)] = (acc[typeOf(question)] || 0) + 1
        return acc
      }, {})

      expect(form).toHaveLength(57)
      expect(byDomain).toEqual(expectedDomains)
      expect(byType['true-false']).toBeGreaterThanOrEqual(3)
      expect(byType['multiple-response']).toBeGreaterThanOrEqual(4)
    }
  })
})
