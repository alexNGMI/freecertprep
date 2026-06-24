import fs from 'node:fs'

const bankPath = new URL('../src/data/ccst-networking-questions.json', import.meta.url)
const questions = JSON.parse(fs.readFileSync(bankPath, 'utf8'))

const genericTail = 'Which choice best identifies the relevant network condition, component, protocol, or control?'
const domainPrompts = {
  'Standards and Concepts': 'Which protocol or networking concept best matches this evidence?',
  'Addressing and Subnet Formats': 'Which addressing concept best matches this evidence?',
  'Endpoints and Media Types': 'Which endpoint or media concept best matches this evidence?',
  Infrastructure: 'Which infrastructure component or service best matches this evidence?',
  'Diagnosing Problems': 'Which diagnostic tool or fault best matches this evidence?',
  Security: 'Which security concept or control best matches this evidence?',
}

const diagnosticScenarios = {
  ping: {
    prompt: 'The technician needs to verify basic IP reachability to the local gateway before testing higher-layer services. Which tool should be used first?',
    evidence: ['Target: local default gateway', 'Needed result: an ICMP echo reply', 'Application testing has not started'],
  },
  traceroute: {
    prompt: 'Traffic to a remote site fails beyond the local network. Which tool should the technician use to identify the hop where the path stops?',
    evidence: ['Local gateway responds', 'Remote destination does not respond', 'A hop-by-hop Layer 3 path is needed'],
  },
  ipconfig: {
    prompt: 'Before changing a switch port, the technician needs to verify the workstation address, mask, gateway, and DNS settings. Which tool should be used?',
    evidence: ['Host settings have not been recorded', 'Address, mask, gateway, and resolver values are required', 'No configuration change has been made'],
  },
  nslookup: {
    prompt: 'A workstation reaches a server by IP address but not by hostname. Which tool should the technician use to query name resolution directly?',
    evidence: ['IP reachability succeeds', 'Hostname access fails', 'The configured resolver must be tested'],
  },
  'cable tester': {
    prompt: 'A newly terminated copper wall drop has no connectivity. Which tool should the technician use to check continuity, pinout, and pair faults?',
    evidence: ['Copper wall drop', 'No negotiated connection', 'Continuity and pinout have not been verified'],
  },
  'link lights': {
    prompt: 'A workstation reports no network connection. Which observation provides the quickest first check of physical connectivity and negotiated activity?',
    evidence: ['NIC indicator: dark', 'Switch-port indicator: dark', 'No logical settings have been changed'],
  },
  'DHCP failure': {
    prompt: 'A workstation assigns itself a 169.254.x.x address and has no valid lease. Which condition best explains the symptom?',
    evidence: ['IPv4 address: 169.254.44.18', 'Lease obtained: no', 'Default gateway: blank'],
  },
  'DNS failure': {
    prompt: 'A workstation reaches an internal server by IP address, but the same server name does not resolve. Which fault best explains the evidence?',
    evidence: ['Direct IP connection: successful', 'Hostname connection: failed', 'Other local network traffic: successful'],
  },
  'VLAN mismatch': {
    prompt: 'After a desk move, a workstation receives an address from the wrong subnet and cannot reach its department resources. Which fault is most likely?',
    evidence: ['Expected access segment: 20', 'Configured access segment: 30', 'Physical connection: up'],
  },
  'wireless interference': {
    prompt: 'Several wireless clients have fluctuating signal quality and poor throughput near overlapping access points. Which condition is most likely?',
    evidence: ['Signal quality: 31%', 'Neighboring radios share the same channel', 'Wired clients are unaffected'],
  },
  'gateway issue': {
    prompt: 'A workstation reaches local devices but cannot reach any remote network. Which fault should the technician investigate first?',
    evidence: ['Local subnet traffic: successful', 'Remote subnet traffic: failed', 'Default route value: blank'],
  },
  'duplicate IP': {
    prompt: 'Two devices lose connectivity intermittently and the operating system reports an address conflict. Which fault best explains the behavior?',
    evidence: ['Connectivity alternates between two hosts', 'Address conflict warning recorded', 'Both hosts claim the same IPv4 value'],
  },
}

function cleanObservation(text) {
  return text
    .replace(/\bThe the observed\b/g, 'The observed')
    .replace(/An IPv4 the observed addressing value reaches all hosts on the subnet and is not assigned to a\./g, 'The observed IPv4 value reaches all hosts on the subnet and is not assigned to a host.')
    .replace(/The observed service 169\.254\.0\.0\/16 addresses are self-assigned when DHCP fails\./g, 'The observed 169.254.0.0/16 address is self-assigned when DHCP fails.')
    .replace(/The observed service or ifconfig displays local IP configuration\./g, 'The observed command displays local IP configuration.')
    .replace(/The observed connection indicate physical connectivity and negotiated activity\./g, 'The observed indicators show physical connectivity and negotiated activity.')
    .replace(/The observed fault addresses cause intermittent or conflicting connectivity\./g, 'The observed condition causes intermittent or conflicting connectivity.')
    .replace(/The observed service maps IPv4 addresses to MAC addresses on the local network\./g, 'The observed process maps IPv4 addresses to MAC addresses on the local network.')
    .replace(/The observed service uses ICMP echo to test basic IP reachability\./g, 'The observed diagnostic uses ICMP echo to test basic IP reachability.')
    .replace(/The observed service shows the Layer 3 path toward a destination hop by hop\./g, 'The observed diagnostic shows the Layer 3 path toward a destination hop by hop.')
    .replace(/The observed service tests DNS name resolution\./g, 'The observed diagnostic tests DNS name resolution.')
    .replace(/The observed connection checks copper wiring continuity, pinout, and faults\./g, 'The observed tool checks copper wiring continuity, pinout, and faults.')
}

function diagnosticEvidence(question, scenario) {
  const workstation = `WS-${question.id.slice(-3)}`
  return [{
    type: 'table',
    title: 'Troubleshooting evidence',
    columns: ['Check', 'Observation'],
    rows: [
      ['Affected endpoint', workstation],
      ['Observation 1', scenario.evidence[0]],
      ['Observation 2', scenario.evidence[1]],
      ['Observation 3', scenario.evidence[2]],
    ],
  }]
}

function supportEvidence(question, observation) {
  return [{
    type: 'table',
    title: 'Captured support evidence',
    columns: ['Review item', 'Recorded observation'],
    rows: [
      ['Observed behavior', observation],
      ['Review scope', question.domain],
      ['Change status', 'Evidence recorded before any configuration change'],
    ],
  }]
}

function lowerFirst(value) {
  return `${value.charAt(0).toLowerCase()}${value.slice(1)}`
}

let rewrittenStems = 0
let repairedDiagnosticItems = 0

for (const question of questions) {
  if (question.type !== 'single-choice') continue

  const correctResponse = question.choices[question.correctAnswer]
  const diagnosticScenario = question.domain === 'Diagnosing Problems'
    ? diagnosticScenarios[correctResponse]
    : null

  if (diagnosticScenario) {
    const location = question.question.match(/^At the (.+?),/)?.[1]
      || 'branch office'
    question.question = `At the ${location}, ${lowerFirst(diagnosticScenario.prompt)}`
    question.evidenceArtifacts = diagnosticEvidence(question, diagnosticScenario)
    repairedDiagnosticItems += 1
    continue
  }

  const quotedObservation = question.question.match(/"([^"]+)"/)?.[1]
  if (quotedObservation) {
    question.evidenceArtifacts = supportEvidence(question, cleanObservation(quotedObservation))
  }

  if (!question.question.includes(genericTail)) continue
  question.question = cleanObservation(question.question)
    .replace(genericTail, domainPrompts[question.domain])
  rewrittenStems += 1
}

fs.writeFileSync(bankPath, `${JSON.stringify(questions, null, 2)}\n`)
console.log(`Rewrote ${rewrittenStems} generic CCST stems.`)
console.log(`Repaired ${repairedDiagnosticItems} diagnostic single-choice scenarios.`)
