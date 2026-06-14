import fs from 'node:fs'

const bankPath = new URL('../src/data/comptia-net-plus-questions.json', import.meta.url)
const questions = JSON.parse(fs.readFileSync(bankPath, 'utf8'))
const byId = new Map(questions.map((question) => [question.id, question]))

const replace = (id, data) => {
  const question = byId.get(id)
  if (!question) throw new Error(`Missing Network+ question ${id}`)
  for (const key of Object.keys(question)) delete question[key]
  Object.assign(question, { id, ...data })
}

replace('netplus-9', {
  domain: 'Networking Concepts', type: 'single-choice',
  question: 'A network team stores switch and router configurations as version-controlled templates and uses a pipeline to apply approved changes. Which practice does this BEST demonstrate?',
  choices: ['Infrastructure as code', 'Port mirroring', 'Dynamic routing', 'Network address translation'],
  correctAnswer: 0,
  explanation: 'Infrastructure as code defines network state in version-controlled files and applies it through repeatable automation. Port mirroring copies traffic for analysis, dynamic routing exchanges routes, and NAT translates addresses; none provides the same reviewable and reproducible configuration workflow.',
  objectiveId: '1.8', objectiveTitle: 'Summarize evolving network environments',
  conceptId: 'comptia-net-plus-1.8-infrastructure-as-code',
})

replace('netplus-107', {
  domain: 'Networking Concepts', type: 'single-choice',
  question: 'A provider replaces dedicated firewall and load-balancer appliances with software functions running on standard virtualization hosts. Which technology is being used?',
  choices: ['Network function virtualization', 'Spanning Tree Protocol', 'Power over Ethernet', 'Link aggregation'],
  correctAnswer: 0,
  explanation: 'Network function virtualization runs services such as firewalls, routers, and load balancers as software on general-purpose compute platforms. STP prevents switching loops, PoE supplies endpoint power, and link aggregation combines physical links.',
  objectiveId: '1.8', objectiveTitle: 'Summarize evolving network environments',
  conceptId: 'comptia-net-plus-1.8-network-function-virtualization',
})

replace('netplus-109', {
  domain: 'Networking Concepts', type: 'single-choice',
  question: 'A technician must connect two switches across 8 km of single-mode fiber at 10 Gbps. Which transceiver is the BEST choice?',
  choices: ['10GBASE-SR', '10GBASE-LR', '1000BASE-T', '10GBASE-T'],
  correctAnswer: 1,
  explanation: '10GBASE-LR is designed for 10-Gigabit Ethernet over single-mode fiber and commonly supports distances up to 10 km. 10GBASE-SR is intended for shorter multimode runs, while the T variants use copper twisted-pair cabling.',
  objectiveId: '1.5', objectiveTitle: 'Compare transmission media and transceivers',
  conceptId: 'comptia-net-plus-1.5-fiber-transceivers',
})

replace('netplus-241', {
  domain: 'Networking Concepts', type: 'multiple-response',
  question: 'Which TWO characteristics make single-mode fiber preferable to multimode fiber for a long-distance campus backbone? (Select two)',
  choices: ['It supports longer transmission distances', 'Its smaller core reduces modal dispersion', 'It always uses inexpensive LED transmitters', 'It terminates directly in an RJ45 connector'],
  correctAnswers: [0, 1],
  explanation: 'Single-mode fiber has a small core and carries one light path, limiting modal dispersion and supporting much longer distances. It typically uses laser optics rather than inexpensive LEDs, and fiber transceivers use optical connectors rather than RJ45 copper connectors.',
  objectiveId: '1.5', objectiveTitle: 'Compare transmission media and transceivers',
  conceptId: 'comptia-net-plus-1.5-single-mode-fiber',
})

replace('netplus-252', {
  domain: 'Networking Concepts', type: 'single-choice',
  question: 'A new access point requires 25 W, but the existing switch port supports only the original IEEE 802.3af power level. What is the BEST resolution?',
  choices: ['Replace the patch cable with single-mode fiber', 'Use an 802.3at-capable port or compatible PoE injector', 'Configure half-duplex operation', 'Assign a static IPv6 address'],
  correctAnswer: 1,
  explanation: 'IEEE 802.3at PoE+ provides more power than 802.3af and can support a 25 W access point when the device and cabling are compatible. Fiber, duplex settings, and IP addressing do not increase the electrical power available to the endpoint.',
  objectiveId: '1.5', objectiveTitle: 'Compare transmission media and transceivers',
  conceptId: 'comptia-net-plus-1.5-power-over-ethernet',
})

replace('netplus-301', {
  domain: 'Networking Concepts', type: 'single-choice',
  question: 'After a manual switch change, the running configuration no longer matches the version-controlled network template. What condition should an infrastructure-as-code validation job report?',
  choices: ['Configuration drift', 'Route poisoning', 'Broadcast amplification', 'Frequency overlap'],
  correctAnswer: 0,
  explanation: 'Configuration drift occurs when deployed device state differs from the approved declarative template. IaC validation can detect that mismatch and trigger review or remediation. The other choices describe routing, traffic-amplification, or wireless-channel problems rather than automation state.',
  objectiveId: '1.8', objectiveTitle: 'Summarize evolving network environments',
  conceptId: 'comptia-net-plus-1.8-configuration-drift',
})

replace('netplus-303', {
  domain: 'Networking Concepts', type: 'single-choice',
  question: 'A company needs an isolated private network in a public cloud where it can define subnets, route tables, and gateways. Which cloud component BEST meets this requirement?',
  choices: ['Virtual private cloud', 'Content delivery network', 'Software-defined WAN edge', 'Network access control appliance'],
  correctAnswer: 0,
  explanation: 'A virtual private cloud provides a logically isolated cloud network with administrator-defined address ranges, subnets, routes, and gateways. A CDN distributes content, SD-WAN selects WAN paths, and NAC controls endpoint access rather than creating the cloud network.',
  objectiveId: '1.3', objectiveTitle: 'Summarize cloud concepts and connectivity options',
  conceptId: 'comptia-net-plus-1.3-virtual-private-cloud',
})

replace('netplus-394', {
  domain: 'Networking Concepts', type: 'matching',
  question: 'Match each cloud networking component to its primary function.',
  itemsLeft: ['Virtual private cloud', 'Internet gateway', 'Security group', 'Dedicated cloud connection'],
  itemsRight: ['Provides private provider connectivity that avoids the public internet', 'Defines stateful traffic rules for cloud resources', 'Creates an isolated network with subnets and route tables', 'Connects eligible cloud subnets to the public internet'],
  correctMatches: [2, 3, 1, 0],
  explanation: 'A VPC is the isolated cloud network, an internet gateway provides public connectivity, a security group supplies stateful resource-level traffic rules, and a dedicated cloud connection gives predictable private connectivity from an organization to the provider.',
  objectiveId: '1.3', objectiveTitle: 'Summarize cloud concepts and connectivity options',
  conceptId: 'comptia-net-plus-1.3-cloud-network-components',
})

replace('netplus-408', {
  domain: 'Networking Concepts', type: 'single-choice',
  question: 'A copper Ethernet run passes through an area with heavy electromagnetic interference. Which medium is the BEST replacement?',
  choices: ['Unshielded Cat 5 cable', 'Fiber-optic cable', 'RG-6 coaxial cable', 'A longer unshielded twisted-pair cable'],
  correctAnswer: 1,
  explanation: 'Fiber carries light rather than electrical signals and is immune to electromagnetic interference, making it the best choice in a noisy environment. Unshielded copper remains susceptible, and longer copper or consumer coax does not solve the underlying risk as effectively.',
  objectiveId: '1.5', objectiveTitle: 'Compare transmission media and transceivers',
  conceptId: 'comptia-net-plus-1.5-electromagnetic-interference',
})

replace('netplus-461', {
  domain: 'Networking Concepts', type: 'single-choice',
  question: 'A technician must terminate a Cat 6 horizontal cable at a patch panel. Which tool is required to seat and trim each conductor?',
  choices: ['Punchdown tool', 'Loopback plug', 'Optical power meter', 'Tone generator'],
  correctAnswer: 0,
  explanation: 'A punchdown tool seats each twisted-pair conductor into the patch panel insulation-displacement contacts and trims excess wire. A loopback plug tests interfaces, an optical meter measures fiber signal power, and a tone generator traces copper cabling.',
  objectiveId: '1.5', objectiveTitle: 'Compare transmission media and transceivers',
  conceptId: 'comptia-net-plus-1.5-copper-termination',
})

replace('netplus-734', {
  domain: 'Network Operations', type: 'single-choice',
  question: 'A planned firewall update caused an outage because the team had no agreed rollback trigger. The change record includes implementation commands but no validation plan or backout steps. What is the BEST corrective action?',
  choices: ['Apply future changes without review', 'Require validation checks, rollback steps, an approved window, and responsible owners', 'Erase monitoring baselines after each change', 'Disable administrative logging during maintenance'],
  correctAnswer: 1,
  explanation: 'Formal change management defines scope, risk, validation, ownership, maintenance timing, rollback criteria, and backout steps before implementation. Skipping review, deleting baselines, or disabling logs would reduce control and make future failures harder to prevent or investigate.',
  objectiveId: '3.1', objectiveTitle: 'Use organizational processes and procedures',
  conceptId: 'comptia-net-plus-3.1-change-management',
})

byId.get('netplus-544').explanation = 'IPv6 global unicast uses 2000::/3, link-local uses fe80::/10, unique local uses fc00::/7, and multicast uses ff00::/8. Recognizing these prefixes helps identify address scope before troubleshooting routing or reachability.'
byId.get('netplus-596').explanation = 'A penetration test proceeds from reconnaissance to scanning and enumeration, exploitation, post-exploitation and cleanup, and finally reporting. Authorization and scope govern every phase, while the report preserves evidence and turns findings into prioritized remediation.'

const output = JSON.stringify(questions, null, 2)
  .replaceAll('â€”', '—')
  .replaceAll('â†’', '→')
  .replaceAll('âˆ’', '−')

fs.writeFileSync(bankPath, `${output}\n`)
console.log('Applied the targeted Network+ structured-audit remediation.')
