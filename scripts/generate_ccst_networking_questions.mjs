import fs from 'node:fs'

const OUT = 'src/data/ccst-networking-questions.json'

const domains = [
  { name: 'Standards and Concepts', count: 113 },
  { name: 'Addressing and Subnet Formats', count: 150 },
  { name: 'Endpoints and Media Types', count: 150 },
  { name: 'Infrastructure', count: 150 },
  { name: 'Diagnosing Problems', count: 112 },
  { name: 'Security', count: 75 },
]

const concepts = {
  'Standards and Concepts': [
    ['OSI physical layer', 'Layer 1 moves raw bits over media and includes signaling, cabling, radio, and connector concerns.', 'Troubleshooting a damaged copper cable belongs at OSI Layer 1 because the medium itself is failing.'],
    ['OSI data link layer', 'Layer 2 handles local frames, MAC addressing, switching, and VLAN tagging.', 'A switch forwarding Ethernet frames by MAC address is operating primarily at the data link layer.'],
    ['OSI network layer', 'Layer 3 handles logical addressing and routing between networks.', 'Routers make forwarding decisions with IP addresses, so routing belongs to the network layer.'],
    ['OSI transport layer', 'Layer 4 provides TCP/UDP transport behavior such as ports, sessions, reliability, and flow control.', 'TCP acknowledgments and port numbers are transport-layer concepts.'],
    ['TCP reliability', 'TCP is connection-oriented and uses sequencing, acknowledgments, and retransmission.', 'Use TCP when ordered, reliable delivery matters more than minimizing overhead.'],
    ['UDP behavior', 'UDP is connectionless and avoids reliability overhead for latency-sensitive traffic.', 'Voice, video, DNS lookups, and other low-latency flows often use UDP.'],
    ['DNS', 'DNS resolves names to IP addresses so people can use hostnames instead of numeric addresses.', 'If users can ping an IP but not browse by name, DNS should be checked early.'],
    ['DHCP', 'DHCP automatically leases IP settings such as address, mask, gateway, and DNS servers.', 'An APIPA 169.254.x.x address often means DHCP did not answer.'],
    ['HTTPS', 'HTTPS protects web sessions with TLS, normally on TCP port 443.', 'HTTPS is the secure default for browser-based administrative portals and web apps.'],
    ['SSH', 'SSH provides encrypted remote command-line administration, normally on TCP port 22.', 'SSH is preferred over Telnet because credentials and session traffic are encrypted.'],
    ['SNMP', 'SNMP is commonly used to monitor network device status, counters, and alerts.', 'A monitoring system polling switch interface counters is using SNMP-style operations.'],
    ['NTP', 'NTP synchronizes clocks across devices for accurate logs, certificates, and authentication.', 'Time drift can break certificates and make event correlation unreliable.'],
  ],
  'Addressing and Subnet Formats': [
    ['IPv4 address', 'IPv4 uses 32-bit dotted-decimal addresses such as 192.168.1.25.', 'IPv4 addresses identify hosts at Layer 3 and are paired with a subnet mask.'],
    ['IPv6 address', 'IPv6 uses 128-bit hexadecimal addresses and supports abbreviation with double colons.', 'IPv6 was created to provide a much larger address space than IPv4.'],
    ['MAC address', 'A MAC address is a Layer 2 hardware address used on the local network segment.', 'Switches forward Ethernet frames using destination MAC addresses.'],
    ['subnet mask', 'A subnet mask or prefix length identifies which part of an IP address is the network portion.', 'The mask tells a host whether a destination is local or must be sent to the gateway.'],
    ['default gateway', 'The default gateway is the router a host uses to reach remote networks.', 'A wrong gateway can allow local communication while blocking off-subnet traffic.'],
    ['private IPv4 ranges', 'RFC 1918 private ranges include 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.', 'Private addresses are not routed directly across the public internet.'],
    ['APIPA', 'APIPA 169.254.0.0/16 addresses are self-assigned when DHCP fails.', 'Seeing 169.254.x.x is a strong clue to investigate DHCP reachability.'],
    ['CIDR /24', 'A /24 prefix is equivalent to 255.255.255.0 and provides 256 total IPv4 addresses.', 'Most small LAN examples use /24 because the host portion is one octet.'],
    ['CIDR /30', 'A /30 prefix provides four total addresses and two usable host addresses.', 'Point-to-point IPv4 links historically used /30 because only two endpoints needed addresses.'],
    ['ARP', 'ARP maps IPv4 addresses to MAC addresses on the local network.', 'Before sending a local IPv4 frame, a host needs the destination MAC address.'],
    ['network ID', 'The network ID identifies the subnet itself and is not assigned to a host.', 'In 192.168.10.0/24, 192.168.10.0 is the network address.'],
    ['broadcast address', 'An IPv4 broadcast address reaches all hosts on the subnet and is not assigned to a host.', 'In 192.168.10.0/24, 192.168.10.255 is the directed broadcast address.'],
  ],
  'Endpoints and Media Types': [
    ['workstation', 'A workstation is an end-user endpoint that consumes network services.', 'Laptops and desktops are common client endpoints.'],
    ['server', 'A server provides shared services such as files, web apps, DNS, DHCP, or authentication.', 'Servers are endpoints too, but they usually provide resources to clients.'],
    ['IP phone', 'An IP phone uses the data network for voice and often depends on PoE and voice VLANs.', 'Voice devices need low latency and may receive power through the Ethernet cable.'],
    ['IoT endpoint', 'IoT devices are network-connected sensors, cameras, controllers, and appliances.', 'IoT devices often need segmentation because they may be harder to patch.'],
    ['copper Ethernet', 'Twisted-pair copper Ethernet is common for access-layer cabling.', 'Copper is inexpensive and supports PoE, but distance is normally limited to 100 meters.'],
    ['fiber optic cable', 'Fiber uses light over glass or plastic strands for longer distances and EMI resistance.', 'Fiber is preferred for uplinks, buildings, and noisy electrical environments.'],
    ['wireless media', 'Wireless uses radio frequencies and is affected by interference, distance, and obstacles.', 'Wi-Fi performance can drop because of channel congestion or weak signal.'],
    ['PoE', 'Power over Ethernet delivers electrical power and data over the same Ethernet cable.', 'PoE is common for access points, IP phones, and security cameras.'],
    ['RJ-45 connector', 'RJ-45 connectors terminate common twisted-pair Ethernet patch cables.', 'Most copper Ethernet patch cables use RJ-45 connectors.'],
    ['SFP transceiver', 'SFP modules provide modular fiber or copper uplink interfaces.', 'A switch may use an SFP optic to connect a fiber uplink.'],
    ['half duplex', 'Half duplex allows communication in only one direction at a time.', 'Duplex mismatches can cause collisions and poor performance.'],
    ['full duplex', 'Full duplex allows simultaneous send and receive on a link.', 'Modern switched Ethernet links normally negotiate full duplex.'],
  ],
  Infrastructure: [
    ['switch', 'A switch connects devices inside a LAN and forwards frames by MAC address.', 'Switches are the access-layer devices most endpoints plug into.'],
    ['router', 'A router connects different IP networks and forwards packets by IP address.', 'Traffic leaving a subnet normally goes to a router or Layer 3 switch.'],
    ['wireless access point', 'An access point bridges wireless clients onto the wired network.', 'AP placement and channel planning affect roaming and signal quality.'],
    ['firewall', 'A firewall filters traffic according to security policy.', 'Firewalls commonly enforce rules between networks or between a LAN and the internet.'],
    ['VLAN', 'A VLAN is a logical Layer 2 segment used to separate broadcast domains.', 'VLANs let one physical switch support multiple separated networks.'],
    ['trunk port', 'A trunk carries traffic for multiple VLANs, usually with 802.1Q tags.', 'Switch-to-switch links often use trunks so several VLANs can cross one link.'],
    ['access port', 'An access port carries traffic for one VLAN and usually connects to an endpoint.', 'A normal workstation port is typically configured as an access port.'],
    ['NAT', 'NAT translates addresses, often allowing private hosts to share a public IP.', 'Home and small-office routers commonly use NAT for internet access.'],
    ['DHCP server', 'A DHCP server leases addressing information to clients.', 'Central DHCP reduces manual addressing errors.'],
    ['DNS server', 'A DNS server answers name-resolution queries.', 'Clients need DNS server settings to resolve hostnames.'],
    ['patch panel', 'A patch panel terminates building cabling and organizes connections to switches.', 'Patch panels make cable management easier in wiring closets.'],
    ['WAN link', 'A WAN link connects networks across a provider or long-distance connection.', 'Branch offices commonly reach headquarters through WAN services or VPNs.'],
  ],
  'Diagnosing Problems': [
    ['ping', 'Ping uses ICMP echo to test basic IP reachability.', 'A successful ping confirms some Layer 3 connectivity, but not every application service.'],
    ['traceroute', 'Traceroute shows the Layer 3 path toward a destination hop by hop.', 'Use traceroute when traffic fails beyond the local network and you need to see where it stops.'],
    ['ipconfig', 'ipconfig or ifconfig displays local IP configuration.', 'The first troubleshooting step is often verifying the host address, mask, gateway, and DNS settings.'],
    ['nslookup', 'nslookup tests DNS name resolution.', 'If IP access works but names fail, nslookup helps confirm DNS behavior.'],
    ['cable tester', 'A cable tester checks copper wiring continuity, pinout, and faults.', 'Use a cable tester for suspected bad patch cables or wall drops.'],
    ['link lights', 'Link lights indicate physical connectivity and negotiated activity.', 'No link light often points to cable, port, power, or NIC issues.'],
    ['DHCP failure', 'DHCP failure commonly leaves a host with no valid lease or an APIPA address.', 'Check DHCP server availability, VLAN helper configuration, and cabling.'],
    ['DNS failure', 'DNS failure lets IP traffic work while hostname-based access fails.', 'DNS symptoms often look like web failures even when the network path is fine.'],
    ['VLAN mismatch', 'A VLAN mismatch places a device in the wrong broadcast domain.', 'Wrong VLAN assignment can block access to expected DHCP scopes and resources.'],
    ['wireless interference', 'Wireless interference reduces throughput and reliability.', 'Crowded channels, distance, walls, and competing RF sources can degrade Wi-Fi.'],
    ['gateway issue', 'A bad default gateway breaks access to remote networks.', 'Local subnet traffic may still work when the gateway is wrong.'],
    ['duplicate IP', 'Duplicate IP addresses cause intermittent or conflicting connectivity.', 'Address conflicts often appear as unstable access for one or both hosts.'],
  ],
  Security: [
    ['CIA triad', 'Confidentiality, integrity, and availability are core security goals.', 'Network controls should protect data secrecy, correctness, and uptime.'],
    ['MFA', 'Multi-factor authentication requires more than one factor to prove identity.', 'MFA reduces risk when passwords are stolen.'],
    ['strong passwords', 'Strong password policy reduces guessing and credential-stuffing risk.', 'Length, uniqueness, and password managers matter more than simple complexity tricks.'],
    ['WPA3', 'WPA3 is a modern Wi-Fi security standard that improves wireless authentication and encryption.', 'Use WPA2/WPA3 rather than open or obsolete wireless security.'],
    ['guest network', 'Guest networks isolate visitor devices from internal resources.', 'Guest Wi-Fi should not place unmanaged devices on the production LAN.'],
    ['least privilege', 'Least privilege gives users and systems only the access required.', 'Restricting permissions limits blast radius if an account is compromised.'],
    ['physical security', 'Physical access to network gear can become logical access.', 'Locked closets and controlled console access protect infrastructure.'],
    ['phishing', 'Phishing attempts to trick users into revealing credentials or running malicious actions.', 'Security awareness and MFA help reduce phishing impact.'],
    ['patching', 'Patching fixes known vulnerabilities in operating systems, applications, and firmware.', 'Unpatched network devices and endpoints are common attack paths.'],
    ['ACL', 'An access control list permits or denies traffic based on policy.', 'ACLs can limit which sources reach sensitive services.'],
  ],
}

const distractors = {
  'Standards and Concepts': ['NAT', 'VLAN pruning', 'PoE budgeting', 'MAC filtering'],
  'Addressing and Subnet Formats': ['fiber attenuation', 'SSID roaming', 'port mirroring', 'duplex mismatch'],
  'Endpoints and Media Types': ['DNS recursion', 'CIDR summarization', 'route redistribution', 'NAT overload'],
  Infrastructure: ['APIPA addressing', 'malware quarantine', 'password rotation', 'certificate renewal'],
  'Diagnosing Problems': ['software licensing', 'data classification', 'vendor renewal', 'acceptable use policy'],
  Security: ['cable category rating', 'subnet broadcast math', 'interface speed negotiation', 'routing metric'],
}

const typePlan = [
  'single',
  'single',
  'single',
  'single',
  'single',
  'single',
  'mr',
  'mr',
  'matching',
  'ordering',
]

const ccstContexts = [
  'while checking a small-office outage',
  'during a new switch deployment',
  'while reviewing a help desk escalation',
  'during a classroom lab',
  'while documenting a branch-office issue',
  'during a wireless support call',
  'while preparing a CCNA study plan',
  'during a ticket handoff',
]

function idFor(domain, n) {
  return `ccst-${domain.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${String(n).padStart(3, '0')}`
}

function rotate(arr, n) {
  return arr[n % arr.length]
}

function context(n) {
  return `${ccstContexts[n % ccstContexts.length]} on case ${String(n + 1).padStart(3, '0')}`
}

function shuffleWithMatches(itemsRight, offset) {
  const decorated = itemsRight.map((item, original) => ({ item, original }))
  const rotations = itemsRight.length > 1 ? (offset % (itemsRight.length - 1)) + 1 : 0
  const shuffled = [...decorated.slice(rotations), ...decorated.slice(0, rotations)]
  return {
    itemsRight: shuffled.map(({ item }) => item),
    correctMatches: decorated.map((_, original) => shuffled.findIndex(item => item.original === original)),
  }
}

function single(domain, fact, n) {
  const [term, definition, explanation] = fact
  const wrong = distractors[domain].slice(0, 3)
  const choices = [term, ...wrong]
  const offset = n % choices.length
  const rotated = [...choices.slice(offset), ...choices.slice(0, offset)]
  const prompts = [
    `A junior technician is reviewing a support ticket ${context(n)}. The clue says: "${definition}" Which networking concept is being described?`,
    `A help desk technician sees this description in a knowledge-base note ${context(n)}: "${definition}" Which term best matches it?`,
    `A learner is mapping Cisco CCST Networking concepts to support tasks ${context(n)}. Which option matches this description: "${definition}"?`,
    `A network support ticket includes this finding ${context(n)}: "${definition}" What should the technician identify it as?`,
  ]
  return {
    type: 'single-choice',
    domain,
    question: prompts[n % prompts.length],
    choices: rotated,
    correctAnswer: rotated.indexOf(term),
    explanation,
  }
}

function multipleResponse(domain, facts, n) {
  const a = rotate(facts, n)
  const b = rotate(facts, n + 3)
  const wrong = distractors[domain].slice(0, 2)
  const choices = [a[0], wrong[0], b[0], wrong[1]]
  const prompts = [
    `A learner is building a Cisco CCST review sheet ${context(n)}. Which two choices belong to ${domain}? (Select two.)`,
    `A technician is sorting ticket notes by objective area ${context(n)}. Which two entries match ${domain}? (Select two.)`,
    `A mentor asks a trainee to identify concepts from ${domain} ${context(n)}. Which two should the trainee choose? (Select two.)`,
  ]
  return {
    type: 'multiple-response',
    domain,
    question: prompts[n % prompts.length],
    choices,
    correctAnswers: [0, 2],
    explanation: `${a[0]} and ${b[0]} are both tested within ${domain}. ${a[2]} ${b[2]}`,
  }
}

function statementBlock(domain, fact, n) {
  const [term, definition, explanation] = fact
  const wrong = rotate(distractors[domain], n)
  return {
    type: 'statement-block',
    domain,
    question: `Evaluate these statements about ${term}.`,
    statements: [
      `${term}: ${definition}`,
      `${wrong} is the best description of ${term}.`,
      `${term} is relevant to entry-level network support tasks.`,
    ],
    correctAnswers: [true, false, true],
    explanation: `${explanation} The second statement confuses ${term} with ${wrong}, which belongs to a different troubleshooting or design context.`,
  }
}

function matching(domain, facts, n) {
  const selected = [rotate(facts, n), rotate(facts, n + 1), rotate(facts, n + 2)]
  const shuffled = shuffleWithMatches(selected.map(f => f[1]), n)
  return {
    type: 'matching',
    domain,
    question: `Match each ${domain.toLowerCase()} term to the best description ${context(n)}.`,
    itemsLeft: selected.map(f => f[0]),
    itemsRight: shuffled.itemsRight,
    correctMatches: shuffled.correctMatches,
    explanation: selected.map(f => `${f[0]}: ${f[2]}`).join(' '),
  }
}

function ordering(domain, facts, n) {
  const workflowSets = {
    'Standards and Concepts': [
      ['Identify the affected OSI layer', 'Start by mapping the symptom to the likely layer.'],
      ['Choose the matching protocol or device behavior', 'Tie the layer to the relevant networking concept.'],
      ['Verify with a simple observation or command', 'Use link lights, address output, or reachability checks.'],
      ['Document the concept and evidence', 'Record why the concept explains the symptom.'],
    ],
    'Addressing and Subnet Formats': [
      ['Record the IP address and prefix', 'Capture the current addressing details first.'],
      ['Determine the network and host portions', 'Use the mask or prefix to identify subnet membership.'],
      ['Compare gateway and destination subnet', 'Decide whether traffic should stay local or route away.'],
      ['Document the valid addressing fix', 'Record the corrected address, mask, or gateway.'],
    ],
    'Endpoints and Media Types': [
      ['Identify the endpoint and media type', 'Know whether the issue involves copper, fiber, wireless, or a device.'],
      ['Check power, link, and connector status', 'Physical media and endpoint power are common first failures.'],
      ['Validate negotiated speed or wireless signal', 'Confirm the endpoint is connected at an expected quality.'],
      ['Document replacement or escalation needs', 'Record faulty media, transceivers, or endpoint behavior.'],
    ],
    Infrastructure: [
      ['Identify the infrastructure device role', 'Determine whether the device switches, routes, filters, or provides services.'],
      ['Check the connected VLAN or network path', 'Confirm the device is attached to the expected logical segment.'],
      ['Validate the service or forwarding behavior', 'Test DHCP, DNS, NAT, routing, or switching as appropriate.'],
      ['Record the change or escalation path', 'Document the verified behavior and next owner if needed.'],
    ],
    'Diagnosing Problems': [
      ['Verify physical link and power', 'Check link lights, cable seating, and device power before changing logical settings.'],
      ['Check local IP configuration', 'Confirm address, mask, gateway, and DNS settings.'],
      ['Test local and remote reachability', 'Use ping or similar tests to isolate where communication stops.'],
      ['Escalate or change configuration', 'Apply the targeted fix only after the failing layer is identified.'],
    ],
    Security: [
      ['Identify the asset or access risk', 'Start with what needs protection and who should have access.'],
      ['Choose the appropriate control', 'Map the risk to MFA, segmentation, ACLs, patching, or wireless security.'],
      ['Verify the control is applied', 'Confirm the policy actually changes access or exposure.'],
      ['Document the security outcome', 'Record what was protected and any remaining risk.'],
    ],
  }
  const steps = workflowSets[domain]
  const order = [0, 1, 2, 3]
  const display = n % 2 === 0 ? [2, 0, 3, 1] : [1, 3, 0, 2]
  return {
    type: 'ordering',
    domain,
    question: `Place the support workflow steps in the best order for a task in ${domain.toLowerCase()} ${context(n)}.`,
    items: display.map(i => steps[i][0]),
    correctOrder: order.map(i => display.indexOf(i)),
    explanation: steps.map(([, why], i) => `Step ${i + 1}: ${why}`).join(' '),
  }
}

function buildQuestion(domain, type, domainIndex, globalIndex) {
  const facts = concepts[domain]
  const fact = rotate(facts, domainIndex)
  const q = type === 'single'
    ? single(domain, fact, domainIndex)
    : type === 'mr'
      ? multipleResponse(domain, facts, domainIndex)
      : type === 'statement'
        ? statementBlock(domain, fact, domainIndex)
        : type === 'matching'
          ? matching(domain, facts, domainIndex)
          : ordering(domain, facts, domainIndex)

  return {
    id: idFor(domain, domainIndex + 1),
    domain,
    ...q,
  }
}

const questions = []
for (const domain of domains) {
  for (let i = 0; i < domain.count; i += 1) {
    const type = typePlan[questions.length % typePlan.length]
    questions.push(buildQuestion(domain.name, type, i, questions.length))
  }
}

fs.writeFileSync(OUT, `${JSON.stringify(questions, null, 2)}\n`)
console.log(`Wrote ${questions.length} questions to ${OUT}`)
