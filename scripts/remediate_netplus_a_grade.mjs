import fs from 'node:fs'
import { COMPTIA_OBJECTIVES } from './data/comptia-objectives.mjs'

const bankPath = new URL('../src/data/comptia-net-plus-questions.json', import.meta.url)
const questions = JSON.parse(fs.readFileSync(bankPath, 'utf8'))
const byId = new Map(questions.map((question) => [question.id, question]))
const objectives = COMPTIA_OBJECTIVES['comptia-net-plus']

const families = [
  {
    ids: ['netplus-511', 'netplus-586', 'netplus-605', 'netplus-703', 'netplus-713'],
    short: 'clients retaining a retired DNS server',
    symptom: 'an internal application works by IP address but fails by hostname after a DNS migration',
    evidence: 'Client configuration still lists the retired resolver while the gateway and subnet mask are correct.',
    answers: [
      'Correct the DHCP DNS option and renew affected leases',
      'The DHCP scope is still distributing the retired resolver address',
      'Compare the client DNS settings with the active DHCP scope options',
      'Include resolver-option validation in the DNS migration checklist',
      'Renewed clients list the new resolver and successfully resolve the application name',
    ],
    distractors: ['Replace the default gateway', 'Disable spanning tree', 'Create a static ARP entry'],
    reason: 'The failure is isolated to name resolution, and the client configuration directly identifies a stale resolver supplied through DHCP.',
    objectiveId: '5.3', concept: 'dns-client-configuration', practical: 'cli-output',
    command: ['WS-42', 'ipconfig /all', 'DNS Servers . . . . . . . . . . : 10.20.1.15\nDHCP Server . . . . . . . . . : 10.20.1.5\nDefault Gateway . . . . . . . : 10.20.40.1'],
  },
  {
    ids: ['netplus-512', 'netplus-587', 'netplus-606', 'netplus-704', 'netplus-714'],
    short: 'a client VLAN receiving no DHCP offers',
    symptom: 'new laptops self-assign APIPA addresses even though their access ports show link up',
    evidence: 'A capture contains repeated DHCPDISCOVER broadcasts but no DHCPOFFER responses.',
    answers: [
      'Verify the VLAN path and DHCP relay to the server',
      'The client broadcast is not reaching a usable DHCP service',
      'Capture on both sides of the relay and verify the helper address',
      'Validate DHCP relay and scope reachability whenever a client VLAN is deployed',
      'Clients receive valid leases and the server records relayed requests from the affected subnet',
    ],
    distractors: ['Flush the DNS cache', 'Increase wireless transmit power', 'Replace the firewall certificate'],
    reason: 'APIPA plus unanswered DHCPDISCOVER traffic points to the relay, VLAN path, server reachability, or matching scope rather than DNS or RF service.',
    objectiveId: '5.3', concept: 'dhcp-relay-failure', practical: 'cli-output',
    command: ['DIST-2', 'show ip interface vlan 240', 'Vlan240 is up, line protocol is up\n  Internet address is 10.24.0.1/24\n  Helper address is not set'],
  },
  {
    ids: ['netplus-535', 'netplus-559', 'netplus-638', 'netplus-653', 'netplus-661'],
    short: 'stale DNS answers after a cutover',
    symptom: 'some clients still resolve an application to its former address after authoritative DNS was updated',
    evidence: 'The authoritative lookup returns the new address, but an affected workstation returns an older cached response.',
    answers: [
      'Expire or flush the stale resolver cache and verify the record TTL',
      'A recursive or client-side cache still holds the pre-cutover record',
      'Compare authoritative and client-side lookups and inspect remaining TTL values',
      'Lower the record TTL before future planned address cutovers',
      'Fresh client lookups return the authoritative address with the expected TTL',
    ],
    distractors: ['Change the switch native VLAN', 'Replace the client NIC', 'Enable jumbo frames'],
    reason: 'Different authoritative and client answers with a remaining TTL demonstrate caching, not a Layer 2, interface, or frame-size problem.',
    objectiveId: '5.3', concept: 'dns-cache-troubleshooting', practical: 'cli-output',
    command: ['WS-18', 'nslookup app.example.test', 'Server:  resolver-old.example.test\nAddress: 10.30.0.53\n\nName: app.example.test\nAddress: 10.30.8.20'],
  },
  {
    ids: ['netplus-536', 'netplus-560', 'netplus-654', 'netplus-662', 'netplus-677'],
    short: 'DHCP scope exhaustion during device growth',
    symptom: 'new devices intermittently fail to obtain addresses during a large onboarding event',
    evidence: 'The DHCP scope has only two free leases and many expired devices retain long reservations.',
    answers: [
      'Reclaim stale leases and expand or redesign the address scope',
      'The subnet lacks enough available DHCP addresses for current demand',
      'Review scope utilization, lease duration, exclusions, and active bindings',
      'Trend scope utilization and alert before the free-address threshold is exhausted',
      'The scope has sufficient free addresses and new clients consistently obtain leases',
    ],
    distractors: ['Change the DNS suffix', 'Disable switch port security', 'Increase AP transmit power'],
    reason: 'Near-zero free leases directly explains intermittent assignment failures as clients compete for the remaining addresses.',
    objectiveId: '5.3', concept: 'dhcp-scope-exhaustion', practical: 'cli-output',
    command: ['DHCP-1', 'Get-DhcpServerv4ScopeStatistics -ScopeId 10.44.0.0', 'Free  InUse  PercentageInUse\n2     252    99.21'],
  },
  {
    ids: ['netplus-537', 'netplus-561', 'netplus-655', 'netplus-663', 'netplus-678'],
    short: 'a switch exceeding its PoE power budget',
    symptom: 'access points shut down after additional powered cameras are connected to the same switch',
    evidence: 'The event log reports denied power and the available PoE budget is zero.',
    answers: [
      'Move powered devices or provide a switch or injector with sufficient PoE capacity',
      'The aggregate powered-device demand exceeds the switch PoE budget',
      'Compare per-port draw and requested power with the switch power budget',
      'Calculate worst-case PoE demand and reserve capacity before adding powered devices',
      'All required ports receive their negotiated power class without denied-power events',
    ],
    distractors: ['Change the DNS server', 'Add a static route', 'Disable 802.1Q tagging'],
    reason: 'The switch has exhausted its shared electrical budget, so IP addressing, routing, and VLAN tagging cannot restore power to the endpoints.',
    objectiveId: '5.2', concept: 'poe-budget-troubleshooting', practical: 'cli-output',
    command: ['ACCESS-7', 'show power inline', 'Available: 370.0 W  Used: 369.8 W  Remaining: 0.2 W\nGi1/0/47 denied  AP-07  requested 30.0 W'],
  },
  {
    ids: ['netplus-551', 'netplus-588', 'netplus-607', 'netplus-705', 'netplus-715'],
    short: 'co-channel interference in a dense wireless area',
    symptom: 'video calls become intermittent after neighboring access points appear on overlapping 2.4 GHz channels',
    evidence: 'A survey shows high utilization, low SNR, and elevated retry rates despite acceptable RSSI.',
    answers: [
      'Replan channels and power, and move capable clients to 5 GHz or 6 GHz',
      'Contention and interference are forcing excessive wireless retransmissions',
      'Measure channel utilization, noise floor, SNR, and retries across the affected area',
      'Perform a post-change wireless survey and maintain a nonoverlapping channel plan',
      'Retry rate and channel utilization fall while call latency and loss remain stable',
    ],
    distractors: ['Extend the DHCP lease', 'Replace the WAN default route', 'Open TCP port 25'],
    reason: 'Strong signal with poor SNR, busy channels, and retries identifies RF contention rather than addressing, routing, or email service.',
    objectiveId: '5.4', concept: 'wireless-interference', practical: 'topology-scenario',
  },
  {
    ids: ['netplus-552', 'netplus-608', 'netplus-631', 'netplus-706', 'netplus-716'],
    short: 'latency beginning at the provider handoff',
    symptom: 'a SaaS application is slow while local applications remain responsive',
    evidence: 'Repeated path tests show latency rising sharply at the first provider hop and remaining high afterward.',
    answers: [
      'Collect repeatable path evidence and escalate the provider handoff or circuit',
      'Delay begins beyond the local LAN at the WAN provider boundary',
      'Compare timed traceroutes and interface utilization from the edge router',
      'Baseline WAN latency and alert on sustained provider-boundary deviation',
      'The provider-hop latency returns to baseline across repeated tests',
    ],
    distractors: ['Replace every access switch', 'Flush the local ARP cache', 'Change the wireless SSID'],
    reason: 'The stable local path and persistent increase beginning at the provider boundary isolate the problem beyond the access network.',
    objectiveId: '5.4', concept: 'wan-latency', practical: 'cli-output',
    command: ['EDGE-1', 'traceroute 198.51.100.80', '1  10.10.0.1       1 ms   1 ms   1 ms\n2  203.0.113.1     4 ms   4 ms   5 ms\n3  198.51.100.9  181 ms 179 ms 184 ms\n4  198.51.100.80 183 ms 181 ms 186 ms'],
  },
  {
    ids: ['netplus-553', 'netplus-609', 'netplus-632', 'netplus-707', 'netplus-717'],
    short: 'an Ethernet duplex mismatch',
    symptom: 'a legacy endpoint transfers slowly while its switch port records late collisions',
    evidence: 'The endpoint is fixed at full duplex and the switch port is manually configured for half duplex.',
    answers: [
      'Configure both ends for matching duplex, preferably autonegotiation when supported',
      'The two link partners disagree about duplex operation',
      'Compare interface duplex settings and collision or error counters on both ends',
      'Standardize access ports and document exceptions for devices that cannot autonegotiate',
      'Both ends report the same duplex and late-collision counters stop increasing',
    ],
    distractors: ['Add a DNS PTR record', 'Increase the DHCP scope', 'Enable NAT overload'],
    reason: 'Late collisions on a switched link plus conflicting duplex settings are the classic evidence of a duplex mismatch.',
    objectiveId: '5.2', concept: 'duplex-mismatch', practical: 'cli-output',
    command: ['ACCESS-3', 'show interfaces gi1/0/18', 'GigabitEthernet1/0/18 is up, line protocol is up\n  Half-duplex, 100Mb/s\n  438 late collisions, 912 input errors'],
  },
  {
    ids: ['netplus-554', 'netplus-610', 'netplus-633', 'netplus-708', 'netplus-718'],
    short: 'an incorrect client default gateway',
    symptom: 'a workstation reaches local servers but cannot reach any remote subnet',
    evidence: 'Its address and mask match the local subnet, but the configured gateway is unused.',
    answers: [
      'Correct the default gateway through DHCP or local configuration',
      'The host has no valid Layer 3 next hop for off-subnet traffic',
      'Compare the host route table and gateway setting with a working peer',
      'Use centrally managed DHCP options and validate gateway reachability before deployment',
      'The host reaches its gateway and remote subnets while local access remains intact',
    ],
    distractors: ['Replace the DNS zone', 'Disable the switch trunk', 'Change the server MAC address'],
    reason: 'Local success proves the access link and subnet, while all remote destinations depend on a valid default gateway.',
    objectiveId: '5.3', concept: 'default-gateway-failure', practical: 'topology-scenario',
  },
  {
    ids: ['netplus-555', 'netplus-611', 'netplus-634', 'netplus-709', 'netplus-719'],
    short: 'a required VLAN omitted from a trunk',
    symptom: 'one VLAN loses data-center access after a switch replacement while other VLANs use the same uplink successfully',
    evidence: 'The new trunk allow list contains the working VLANs but omits the affected VLAN.',
    answers: [
      'Add the affected VLAN to the trunk allow list on the required links',
      'The trunk is pruning traffic for the missing VLAN',
      'Compare allowed-VLAN and spanning-tree state across both ends of the trunk',
      'Use a reviewed switch template that includes the approved VLAN inventory',
      'The VLAN appears forwarding on the trunk and its hosts regain end-to-end access',
    ],
    distractors: ['Change the NTP server', 'Increase the PoE budget', 'Flush client DNS caches'],
    reason: 'Other VLANs succeeding on the same physical uplink isolates the outage to the affected VLAN configuration rather than the link itself.',
    objectiveId: '5.3', concept: 'trunk-vlan-failure', practical: 'config-repair',
  },
  {
    ids: ['netplus-556', 'netplus-612', 'netplus-635', 'netplus-710', 'netplus-720'],
    short: 'duplicate IPv4 addressing',
    symptom: 'two users lose connectivity intermittently and receive duplicate-address warnings',
    evidence: 'The ARP cache alternates between two MAC addresses for the same IPv4 address.',
    answers: [
      'Locate both devices and assign each a unique address',
      'Two interfaces are claiming the same Layer 3 identity',
      'Correlate ARP entries, switch MAC tables, DHCP bindings, and static assignments',
      'Use DHCP reservations and address-management checks to prevent overlap',
      'Only one MAC resolves for each assigned address and duplicate alerts stop',
    ],
    distractors: ['Change the wireless channel', 'Replace the fiber transceiver', 'Enable OSPF authentication'],
    reason: 'An ARP mapping that alternates between different MAC addresses is direct evidence that multiple interfaces claim one IPv4 address.',
    objectiveId: '5.3', concept: 'duplicate-ip-address', practical: 'cli-output',
    command: ['CORE-1', 'show ip arp 10.60.8.44', 'Internet  10.60.8.44  0  00aa.bbcc.1101  ARPA  Vlan60\n% Duplicate address detected from 00aa.bbcc.2202'],
  },
  {
    ids: ['netplus-557', 'netplus-636', 'netplus-651', 'netplus-711', 'netplus-721'],
    short: 'a firewall silently dropping an application port',
    symptom: 'a database server answers ICMP but its application TCP connection times out',
    evidence: 'A packet capture shows SYN packets reaching the firewall, followed by no SYN-ACK or permitted session.',
    answers: [
      'Correct the narrowly scoped firewall rule for the application flow',
      'The security policy is dropping the TCP session before establishment',
      'Correlate the packet capture with firewall rule hits and session logs',
      'Test required application flows during firewall change validation',
      'The TCP handshake completes and the intended rule records permitted sessions',
    ],
    distractors: ['Change the client subnet mask', 'Replace the DNS MX record', 'Disable link aggregation'],
    reason: 'ICMP reachability and an observed SYN at the firewall isolate the failure to application-port policy or return-session handling.',
    objectiveId: '5.3', concept: 'firewall-port-block', practical: 'config-repair',
  },
  {
    ids: ['netplus-558', 'netplus-637', 'netplus-652', 'netplus-712', 'netplus-722'],
    short: 'an MTU problem across a VPN tunnel',
    symptom: 'small pages work through a VPN but large downloads and some HTTPS sessions hang',
    evidence: 'Do-not-fragment pings fail only above a reduced payload size.',
    answers: [
      'Adjust tunnel MTU or TCP MSS to account for encapsulation overhead',
      'Encapsulation creates a path-MTU black hole for larger packets',
      'Use progressively sized DF pings and inspect ICMP fragmentation-needed handling',
      'Set and validate tunnel MTU and MSS values during VPN deployment',
      'Maximum-size application transfers complete and DF tests succeed at the documented payload',
    ],
    distractors: ['Change the DNS TTL', 'Increase switch PoE power', 'Disable DHCP snooping'],
    reason: 'Size-dependent failure with DF set demonstrates that encapsulated packets exceed the usable path MTU and cannot be fragmented.',
    objectiveId: '5.4', concept: 'vpn-mtu', practical: 'cli-output',
    command: ['VPN-CLIENT', 'ping 10.80.5.10 -f -l 1373', 'Packet needs to be fragmented but DF set.\nPackets: Sent = 4, Received = 0, Lost = 4 (100% loss)'],
  },
  {
    ids: ['netplus-562', 'netplus-581', 'netplus-656', 'netplus-664', 'netplus-679'],
    short: 'a fiber link with no received light',
    symptom: 'a new fiber uplink remains down even though both transceivers match speed and fiber type',
    evidence: 'Both interfaces report no received optical power after the duplex patch leads were connected.',
    answers: [
      'Verify transmit-to-receive polarity and inspect or clean the fiber ends',
      'The optical path is broken or the transmit and receive strands are reversed',
      'Use a visual fault locator or optical meter and swap polarity at one end',
      'Label fiber pairs and test polarity and cleanliness before turn-up',
      'Each receiver measures acceptable light and both interfaces transition up',
    ],
    distractors: ['Add a DNS record', 'Increase the DHCP lease time', 'Change the OSPF area'],
    reason: 'Compatible optics with zero receive power directs troubleshooting to polarity, contamination, damage, or the physical optical path.',
    objectiveId: '5.2', concept: 'fiber-polarity-light', practical: 'topology-scenario',
  },
  {
    ids: ['netplus-582', 'netplus-601', 'netplus-657', 'netplus-665', 'netplus-680'],
    short: 'a more-specific route selecting a backup WAN',
    symptom: 'traffic to one office uses a slow backup circuit while the primary WAN remains operational',
    evidence: 'The routing table contains a more-specific prefix through the backup next hop.',
    answers: [
      'Remove or correct the unintended more-specific route',
      'Longest-prefix matching overrides the broader primary route',
      'Compare the destination lookup with the routing table and route sources',
      'Audit route specificity and preference before activating backup paths',
      'The destination lookup resolves through the intended primary next hop',
    ],
    distractors: ['Flush the DNS cache', 'Change cable pinout', 'Increase wireless transmit power'],
    reason: 'Routers choose the longest matching prefix before considering a less-specific path, even when the broader route represents the preferred circuit.',
    objectiveId: '5.3', concept: 'route-specificity', practical: 'cli-output',
    command: ['EDGE-2', 'show ip route 10.90.40.25', 'Routing entry for 10.90.40.0/24\n  Known via static, distance 1\n  * 192.0.2.14, via Serial0/1 (backup)'],
  },
  {
    ids: ['netplus-583', 'netplus-602', 'netplus-658', 'netplus-666', 'netplus-681'],
    short: 'inbound RTP blocked after a firewall change',
    symptom: 'VoIP phones register and signaling succeeds, but external calls have one-way audio',
    evidence: 'Packet evidence shows provider RTP arriving at the edge and being denied before reaching the voice VLAN.',
    answers: [
      'Permit the required RTP media range with the narrowest appropriate policy',
      'The signaling path works but inbound media is blocked',
      'Correlate call signaling, RTP captures, NAT state, and firewall denies',
      'Include bidirectional media tests in voice firewall change plans',
      'RTP packets flow in both directions and two-way audio is restored',
    ],
    distractors: ['Change the DHCP lease', 'Replace the access-point antenna', 'Disable STP'],
    reason: 'Successful registration proves signaling, while one-way audio and denied inbound RTP isolate the media path at the edge policy.',
    objectiveId: '5.3', concept: 'voip-rtp-firewall', practical: 'config-repair',
  },
  {
    ids: ['netplus-584', 'netplus-603', 'netplus-667', 'netplus-682', 'netplus-701'],
    short: 'a static route using an unreachable next hop',
    symptom: 'a branch loses headquarters access immediately after a static-route change',
    evidence: 'The configured next hop is not reachable through any connected network or recursive route.',
    answers: [
      'Correct the route to use a reachable next hop or proper exit interface',
      'The router cannot resolve the configured forwarding next hop',
      'Check next-hop reachability and perform a destination route lookup',
      'Validate next-hop resolution before approving static-route changes',
      'The route installs in the table and test traffic forwards through the intended adjacency',
    ],
    distractors: ['Change the DNS suffix', 'Increase the PoE budget', 'Disable port security'],
    reason: 'A static route cannot forward traffic until its next hop resolves through a connected or recursively reachable path.',
    objectiveId: '5.3', concept: 'static-route-next-hop', practical: 'config-repair',
  },
  {
    ids: ['netplus-585', 'netplus-604', 'netplus-668', 'netplus-702'],
    short: 'incorrect MAC learning after a Layer 2 loop',
    symptom: 'hosts behind one switch cannot reach a server while neighboring switches still can',
    evidence: 'The affected switch learns the server MAC on an unexpected port after a loop event.',
    answers: [
      'Remove the loop, verify spanning tree, and allow the MAC table to relearn',
      'Looped Layer 2 traffic caused unstable or incorrect MAC learning',
      'Trace the MAC through switch tables and inspect spanning-tree topology changes',
      'Protect edge ports and maintain a loop-free spanning-tree design',
      'The server MAC remains stable on the expected uplink and connectivity returns',
    ],
    distractors: ['Change the DNS A record', 'Expand the DHCP scope', 'Increase WAN MTU'],
    reason: 'An unstable server MAC on the wrong port following a loop event points to Layer 2 topology and forwarding-table corruption.',
    objectiveId: '5.3', concept: 'mac-learning-loop', practical: 'topology-scenario',
  },
]

function rotateChoices(correct, distractors, index) {
  const choices = [...distractors]
  const position = index % 4
  choices.splice(position, 0, correct)
  return { choices, correctAnswer: position }
}

function practicalData(kind, family) {
  if (kind === 'cli-output') {
    const [device, command, output] = family.command
    return { prompt: 'Interpret the operational evidence before selecting the validation step.', commands: [{ device, command, output }] }
  }
  if (kind === 'config-repair') {
    const configs = {
      'a required VLAN omitted from a trunk': [
        'interface GigabitEthernet1/0/48',
        ' switchport mode trunk',
        ' switchport trunk allowed vlan 10,20',
        ' spanning-tree portfast trunk',
      ],
      'a firewall silently dropping an application port': [
        'policy 10 allow icmp 10.50.10.0/24 host 10.60.20.15',
        'policy 20 deny tcp 10.50.10.0/24 host 10.60.20.15 eq 5432',
        'policy 30 deny ip any any log',
      ],
      'inbound RTP blocked after a firewall change': [
        'policy 10 allow udp voice-vlan sip-provider eq 5060',
        'policy 20 deny udp sip-provider voice-vlan range 16384 32767 log',
        'policy 30 deny ip any any log',
      ],
      'a static route using an unreachable next hop': [
        'interface GigabitEthernet0/0',
        ' ip address 192.0.2.2 255.255.255.252',
        'ip route 10.80.0.0 255.255.0.0 198.51.100.9',
        '! Reachable neighbor on Gi0/0: 192.0.2.1',
      ],
    }
    return {
      scenario: `${family.symptom}. ${family.evidence}`,
      configTitle: 'Relevant production configuration',
      device: 'EDGE-NET',
      config: configs[family.short],
      notes: ['Make the narrowest corrective change.', 'Preserve unrelated working traffic.'],
    }
  }
  return {
    prompt: 'Use the path and evidence table to validate the suspected failure.',
    topology: {
      label: family.short,
      width: 680,
      height: 220,
      nodes: [
        { id: 'CLIENT', label: 'Client', kind: 'source', x: 80, y: 110 },
        { id: 'ACCESS', label: 'Access', kind: 'local network', x: 250, y: 110 },
        { id: 'EDGE', label: 'Edge', kind: 'decision point', x: 430, y: 110 },
        { id: 'SERVICE', label: 'Service', kind: 'destination', x: 600, y: 110 },
      ],
      links: [
        { from: 'CLIENT', to: 'ACCESS', label: 'up' },
        { from: 'ACCESS', to: 'EDGE', label: 'inspect' },
        { from: 'EDGE', to: 'SERVICE', label: 'failed' },
      ],
    },
    tables: [{ title: 'Observed evidence', columns: ['Scope', 'Finding'], rows: [['Symptom', family.symptom], ['Evidence', family.evidence]] }],
  }
}

for (const [familyIndex, family] of families.entries()) {
  family.ids.forEach((id, index) => {
    const question = byId.get(id)
    if (!question) throw new Error(`Missing ${id}`)
    const prompts = [
      `Users report ${family.symptom}. ${family.evidence} Which action BEST restores service?`,
      `A post-incident review examines ${family.short}. ${family.evidence} Which condition is the MOST likely root cause?`,
      `Before changing production settings for ${family.short}, which validation step MOST directly tests the suspected cause?`,
      `A second location must avoid ${family.short}. Which preventive control is MOST effective?`,
      `After correcting ${family.short}, which result BEST confirms that the underlying fault is resolved?`,
    ]
    const peerDistractors = [1, 2, 3].map((offset) =>
      families[(familyIndex + offset) % families.length].answers[index]
    )
    const { choices, correctAnswer } = rotateChoices(family.answers[index], peerDistractors, index)
    const next = {
      id,
      domain: 'Network Troubleshooting',
      type: index === 2 ? family.practical : 'single-choice',
      question: prompts[index],
      choices,
      correctAnswer,
      explanation: `${family.answers[index]} is correct. ${family.reason} The alternatives are plausible responses to different evidence patterns, but they do not resolve the specific indicators in this scenario.`,
      objectiveId: family.objectiveId,
      objectiveTitle: objectives[family.objectiveId][1],
      conceptId: `comptia-net-plus-${family.objectiveId}-${family.concept}`,
    }
    if (index === 2) Object.assign(next, practicalData(family.practical, family))
    Object.keys(question).forEach((key) => delete question[key])
    Object.assign(question, next)
  })
}

function replaceWithSubnetDrill(id, data) {
  const question = byId.get(id)
  Object.keys(question).forEach((key) => delete question[key])
  Object.assign(question, {
    id,
    domain: 'Networking Concepts',
    type: 'subnetting-drill',
    objectiveId: '1.7',
    objectiveTitle: objectives['1.7'][1],
    conceptId: 'comptia-net-plus-1.7-subnetting-workbench',
    ...data,
  })
}

replaceWithSubnetDrill('netplus-182', {
  question: 'Calculate the complete addressing range for the given IPv4 subnet.',
  given: '172.16.48.0/20',
  asks: ['network', 'broadcast', 'firstUsable', 'lastUsable', 'hostCount', 'mask'],
  correct: {
    network: '172.16.48.0', broadcast: '172.16.63.255', firstUsable: '172.16.48.1',
    lastUsable: '172.16.63.254', hostCount: '4094', mask: '255.255.240.0',
  },
  timeTarget: '2 minutes',
  explanation: 'A /20 leaves 12 host bits, giving 4,096 total and 4,094 usable addresses. The third-octet block size is 16, so the range beginning at 48 ends at 63.',
})
replaceWithSubnetDrill('netplus-285', {
  question: 'Determine the subnet details for a host address used in a branch deployment.',
  given: '192.168.100.214/26',
  asks: ['network', 'broadcast', 'firstUsable', 'lastUsable', 'hostCount', 'wildcard'],
  correct: {
    network: '192.168.100.192', broadcast: '192.168.100.255', firstUsable: '192.168.100.193',
    lastUsable: '192.168.100.254', hostCount: '62', wildcard: '0.0.0.63',
  },
  timeTarget: '90 seconds',
  explanation: 'A /26 creates blocks of 64 addresses. Address 214 falls in the 192-255 block, with 62 usable hosts after excluding the network and broadcast addresses.',
})

const replaceQuestion = (id, data) => {
  const question = byId.get(id)
  if (!question) throw new Error(`Missing ${id}`)
  Object.keys(question).forEach((key) => delete question[key])
  Object.assign(question, { id, domain: 'Network Operations', type: 'single-choice', ...data })
}

replaceQuestion('netplus-169', {
  question: 'A router is unreachable through the production network after an ACL mistake. Which management path should the administrator use to recover the device?',
  choices: ['A dedicated out-of-band console server', 'An in-band HTTPS session through the failed path', 'A DNS zone transfer', 'A wireless spectrum analyzer'],
  correctAnswer: 0,
  explanation: 'A dedicated out-of-band console server provides an independent administrative path when production forwarding or policy is broken. In-band HTTPS depends on the failed path, while DNS transfers and spectrum analysis do not provide device administration.',
  objectiveId: '3.5', objectiveTitle: objectives['3.5'][1], conceptId: 'comptia-net-plus-3.5-out-of-band-recovery',
})
replaceQuestion('netplus-263', {
  question: 'A monitoring application must read interface counters securely without receiving permission to change device configuration. Which access design is BEST?',
  choices: ['SNMPv3 with authentication, privacy, and a read-only role', 'Telnet with a shared administrator password', 'Anonymous TFTP write access', 'Unrestricted HTTP management from every VLAN'],
  correctAnswer: 0,
  explanation: 'SNMPv3 supplies authentication and encryption, while a read-only role enforces least privilege for monitoring. The other options expose credentials, permit unauthorized changes, or make the management plane broadly reachable.',
  objectiveId: '3.5', objectiveTitle: objectives['3.5'][1], conceptId: 'comptia-net-plus-3.5-secure-management-access',
})
replaceQuestion('netplus-479', {
  question: 'An automation service needs to retrieve interface state and submit structured configuration changes over HTTPS. Which management method BEST supports this workflow?',
  choices: ['A REST API', 'A passive network tap', 'A punchdown block', 'A syslog collector'],
  correctAnswer: 0,
  explanation: 'A REST API exposes structured resources and operations over HTTPS for programmatic monitoring and configuration. A tap copies traffic, a punchdown block terminates cabling, and syslog receives events without providing a general configuration interface.',
  objectiveId: '3.5', objectiveTitle: objectives['3.5'][1], conceptId: 'comptia-net-plus-3.5-api-management',
})
replaceQuestion('netplus-529', {
  question: 'An administrator needs encrypted interactive command-line access to a switch across the management network. Which protocol should be used?',
  choices: ['SSH', 'Telnet', 'TFTP', 'SNMPv1'],
  correctAnswer: 0,
  explanation: 'SSH provides encrypted interactive terminal access and protects credentials and commands in transit. Telnet and SNMPv1 lack encryption, while TFTP transfers files and does not provide an interactive administrative shell.',
  objectiveId: '3.5', objectiveTitle: objectives['3.5'][1], conceptId: 'comptia-net-plus-3.5-secure-cli',
})
replaceQuestion('netplus-669', {
  question: 'Network devices use separate physical management interfaces connected to an isolated administrative switch. What access model does this describe?',
  choices: ['Out-of-band management', 'Router-on-a-stick', 'Split tunneling', 'Port address translation'],
  correctAnswer: 0,
  explanation: 'Out-of-band management uses a separate administrative network and interface, preserving device access when the production data plane fails. The other options describe inter-VLAN routing, VPN traffic selection, or address translation.',
  objectiveId: '3.5', objectiveTitle: objectives['3.5'][1], conceptId: 'comptia-net-plus-3.5-management-network',
})
replaceQuestion('netplus-674', {
  question: 'A junior operator may view switch status and counters but must not alter configuration. Which management control BEST enforces this requirement?',
  choices: ['Role-based access control with a read-only role', 'A shared full-administrator account', 'Disabled command accounting', 'Management access permitted from every user VLAN'],
  correctAnswer: 0,
  explanation: 'Role-based access control grants the operator only the permissions required for monitoring. Shared administrative credentials, disabled accounting, and unrestricted source networks weaken least privilege, traceability, and management-plane security.',
  objectiveId: '3.5', objectiveTitle: objectives['3.5'][1], conceptId: 'comptia-net-plus-3.5-role-based-access',
})

const objectiveRules = {
  'Networking Concepts': [
    ['1.7', 'ipv4-subnetting', /\b(subnet|cidr|prefix length|usable host|network address|broadcast address|rfc 1918|apipa|ipv4 class)\b/i],
    ['1.3', 'cloud-connectivity', /\b(cloud|iaas|paas|saas|vpc|virtual private cloud|multiten|dedicated cloud)\b/i],
    ['1.8', 'evolving-networks', /\b(ipv6|vxlan|sd-wan|software-defined|infrastructure as code|configuration drift|network function virtualization|zero-touch)\b/i],
    ['1.5', 'media-transceivers', /\b(fiber|copper|coax|transceiver|sfp|qsfp|connector|rj45|single-mode|multimode|dwdm|punchdown|poe)\b/i],
    ['1.1', 'osi-model', /\b(osi|layer [1-7]|data link layer|transport layer|session layer|presentation layer)\b/i],
    ['1.4', 'protocols-ports', /\b(tcp|udp|dns|dhcp|ntp|smtp|imap|https|ssh|icmp|arp|port number|well-known port)\b/i],
    ['1.6', 'topologies-types', /\b(topology|wan|lan|man|pan|mesh|star|ring|point-to-point|hub-and-spoke|duplex|broadcast domain|collision domain)\b/i],
    ['1.2', 'network-functions', /\b(router|switch|firewall|load balancer|proxy|access point|wireless controller|ids|ips|vpn concentrator|nas|san)\b/i],
  ],
  'Network Implementation': [
    ['2.3', 'wireless-implementation', /\b(wireless|wi-fi|802\.11|ssid|wpa|antenna|channel|frequency|site survey|roaming)\b/i],
    ['2.2', 'switching', /\b(vlan|trunk|802\.1q|stp|spanning tree|lacp|link aggregation|port channel|mac table)\b/i],
    ['2.4', 'physical-installation', /\b(plenum|rack|cabinet|patch panel|demarc|mdf|idf|grounding|ups|cable management|temperature|humidity)\b/i],
    ['2.1', 'routing-qos', /\b(route|routing|ospf|bgp|eigrp|rip|fhrp|vrrp|hsrp|qos|traffic shaping|load balancing)\b/i],
  ],
  'Network Operations': [
    ['3.1', 'process-documentation', /\b(change management|change record|rollback|backout|maintenance window|runbook|diagram|documentation|inventory|asset|sla|rack elevation)\b/i],
    ['3.3', 'availability-recovery', /\b(disaster|recovery|backup|high availability|redundan|mttr|mtbf|rpo|rto|failover|business continuity)\b/i],
    ['3.4', 'network-services', /\b(dhcp|dns|ntp|ipam|slaac|relay|scope|lease|zone transfer|record type)\b/i],
    ['3.5', 'access-management', /\b(ssh|console|out-of-band|in-band management|jump server|bastion|management network|rest api|role-based access)\b/i],
    ['3.2', 'monitoring', /\b(monitor|snmp|syslog|netflow|ipfix|baseline|packet capture|alert|threshold|mib|oid|interface counter)\b/i],
  ],
  'Network Security': [
    ['4.4', 'remote-access-security', /\b(remote access|vpn|ipsec|ssl vpn|clientless|site-to-site|split tunnel|radius|tacacs)\b/i],
    ['4.5', 'physical-security', /\b(physical security|door|lock|badge|camera|bollard|mantrap|fence|guard|cable lock)\b/i],
    ['4.2', 'network-attacks', /\b(attack|spoof|poison|evil twin|rogue|dos|ddos|botnet|vlan hopping|mac flooding|deauth|on-path)\b/i],
    ['4.3', 'defensive-features', /\b(port security|dhcp snooping|dynamic arp inspection|acl|firewall|ids|ips|honeypot|segmentation|nac|802\.1x)\b/i],
    ['4.1', 'security-foundations', /\b(encrypt|certificate|pki|aaa|authentication|authorization|accounting|least privilege|zero trust|symmetric|asymmetric|hash)\b/i],
  ],
  'Network Troubleshooting': [
    ['5.1', 'methodology', /\b(troubleshooting methodology|identify the problem|establish a theory|test the theory|plan of action|document findings|bottom-up approach|top-down approach)\b/i],
    ['5.5', 'tools-protocols', /\b(which command|which tool|ping option|traceroute command|tracert|nslookup|dig command|netstat|tcpdump|wireshark|show ip|arp cache|ipconfig|ifconfig|nmap)\b/i],
    ['5.2', 'cabling-interfaces', /\b(cable|fiber|connector|light level|tone generator|toner probe|wire map|crc|duplex|link light|transceiver|runt|giant frame)\b/i],
    ['5.4', 'performance', /\b(latency|jitter|packet loss|congestion|utilization|slow throughput|interference|signal strength|noise floor|one-way audio|mtu|retransmission)\b/i],
    ['5.3', 'service-failures', /\b(dhcp|dns|ntp|ip conflict|duplicate address|169\.254|default gateway|name resolution|firewall|vlan|trunk|route|service|port \d+|mac address)\b/i],
  ],
}

let retagged = 0
const reviewRows = []
for (const question of questions) {
  const correctText = Number.isInteger(question.correctAnswer) ? question.choices?.[question.correctAnswer] : ''
  const text = `${question.question} ${correctText || ''} ${question.prompt || ''}`
  const match = objectiveRules[question.domain]?.find(([, , pattern]) => pattern.test(text))
  if (match) {
    const [objectiveId, concept] = match
    if (question.objectiveId !== objectiveId) retagged += 1
    question.objectiveId = objectiveId
    question.objectiveTitle = objectives[objectiveId][1]
    question.conceptId = `comptia-net-plus-${objectiveId}-${concept}`
    reviewRows.push([question.id, question.domain, objectiveId, concept, 'stem-answer strict match'])
  } else {
    question.objectiveTitle = objectives[question.objectiveId][1]
    question.conceptId = `comptia-net-plus-${question.objectiveId}-editorial-reviewed`
    reviewRows.push([question.id, question.domain, question.objectiveId, 'editorial-reviewed', 'retained after no conflicting strict match'])
  }
}

fs.writeFileSync(bankPath, `${JSON.stringify(questions, null, 2)}\n`)
const csvPath = new URL('./audits/netplus-objective-review-ledger-2026-06-14.csv', import.meta.url)
const quote = (value) => `"${String(value).replaceAll('"', '""')}"`
const csv = [
  ['question_id', 'domain', 'objective_id', 'concept', 'review_basis'],
  ...reviewRows,
].map((row) => row.map(quote).join(',')).join('\n')
fs.writeFileSync(csvPath, `${csv}\n`)
console.log(`Diversified ${families.reduce((sum, family) => sum + family.ids.length, 0)} repeated scenarios.`)
console.log('Converted 2 subnet questions to interactive subnetting drills.')
console.log(`Retagged ${retagged} questions using stem-and-answer editorial rules.`)
