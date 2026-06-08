import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import certs, { getAllCerts, getAllCertsIncludingUnpublished } from '../data/certs.js'
import { COMING_SOON_CERT_IDS, LIVE_CERT_IDS } from '../data/catalogVisibility.js'
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
    expect(LIVE_CERT_IDS.has('ccna-200-301')).toBe(true)
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
    const scs = questions.filter(q => ['single-choice', 'cli-output', 'topology-scenario', 'config-repair'].includes(typeOf(q)))
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
    expect(new Set(questions.map(q => q.question)).size).toBe(questions.length)
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
      /^At branch \d{2},/.test(q.question)
      && /best next step/i.test(q.question)
      && /address|ARP|DHCP|DNS|duplex|firewall|latency|light|logs|MTU|RTP|route|traceroute|trunk|VLAN|wireless/i.test(q.question)
    ).length

    expect(evidenceBasedCount).toBeGreaterThanOrEqual(75)
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

describe('CCNA 200-301 production pool', () => {
  it('is published while covering the 750-item v2.0 simulation mix', () => {
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

  it('keeps the CCNA audit plan aligned with the live 750-item v2.0 target', () => {
    const audit = readFileSync('scripts/audits/ccna-prod-readiness-audit.md', 'utf8')

    expect(audit).toContain('Status: `ccna-200-301` is published')
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
