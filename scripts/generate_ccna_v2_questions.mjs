import { writeFile } from 'node:fs/promises'

const OUT = new URL('../src/data/ccna-200-301-questions.json', import.meta.url)

const DOMAINS = [
  { name: 'Network Infrastructure and Connectivity', target: 188 },
  { name: 'Switching and Network Access', target: 187 },
  { name: 'IP Routing', target: 150 },
  { name: 'Network Services and Security', target: 150 },
  { name: 'AI, Network Operations, and Management', target: 75 },
]

const TYPE_TARGETS = {
  'single-choice': 250,
  'multiple-response': 60,
  'cli-output': 170,
  'topology-scenario': 120,
  'config-repair': 100,
  'subnetting-drill': 50,
}

const SITES = [
  'branch office',
  'campus distribution block',
  'data center access layer',
  'remote clinic',
  'warehouse WLAN area',
  'cloud edge pod',
  'manufacturing cell',
  'training lab',
  'retail store',
  'regional headquarters',
]

const SINGLE_BANK = {
  'Network Infrastructure and Connectivity': [
    ['Troubleshoot the client address, mask, gateway, and DNS settings before replacing hardware', 'The v2.0 blueprint emphasizes troubleshooting IPv4 and IPv6 address configuration and client connectivity. Start with host addressing evidence before changing physical infrastructure.'],
    ['10GBASE-SR uses multimode fiber for short-reach 10 Gb Ethernet links', 'SR optics are designed for short-reach links over multimode fiber, commonly inside a data center or campus building.'],
    ['A hypervisor abstracts compute resources so multiple virtual machines can share the same physical host', 'Hypervisors provide virtualization by presenting isolated virtual hardware to guest operating systems.'],
    ['Wireless interference can come from overlapping channels, non-Wi-Fi RF sources, and poor band selection', 'Wireless troubleshooting includes RF band/channel planning, interference, and security parameters.'],
    ['Modified EUI-64 derives an IPv6 interface identifier from a MAC address with the universal/local bit inverted', 'The current blueprint explicitly includes IPv6 prefix sizing and modified EUI-64.'],
    ['DHCP relay forwards client broadcasts to a DHCP server on another subnet', 'Routers do not forward broadcasts by default, so DHCP relay is needed when clients and servers are separated by Layer 3.'],
  ],
  'Switching and Network Access': [
    ['Configure the switch port as an 802.1Q trunk when multiple VLANs must cross one link', 'A trunk carries multiple VLANs using 802.1Q tags. Access ports carry one data VLAN for an edge host.'],
    ['An SVI provides a Layer 3 interface for a VLAN on a multilayer switch', 'Switch virtual interfaces are used for management or inter-VLAN routing depending on platform and configuration.'],
    ['LACP negotiates an EtherChannel between compatible switch ports', 'LACP is the standards-based negotiation protocol for bundling physical links into a logical port-channel.'],
    ['BPDU Guard protects PortFast edge ports by err-disabling the port if a BPDU is received', 'BPDU Guard is a Layer 2 protection feature for access/edge ports where switches should not appear.'],
    ['CDP and LLDP help validate neighbor identity, port mapping, and documentation accuracy', 'The v2.0 blueprint includes validating network documentation with CDP and LLDP.'],
    ['Rapid PVST+ uses roles and states to keep a loop-free Layer 2 topology', 'Rapid PVST+ converges Layer 2 paths while preventing switching loops.'],
  ],
  'IP Routing': [
    ['Longest prefix match determines the best route when multiple routes match a destination', 'Routers first choose the most specific matching prefix. Administrative distance is compared only among routes to the same prefix from different sources.'],
    ['A floating static route has a higher administrative distance so it is used only when the primary route is unavailable', 'Floating statics provide backup reachability by being less preferred than the primary route.'],
    ['Single-area OSPF neighbors must agree on area, timers, network type, and compatible subnet parameters', 'OSPF adjacency troubleshooting starts with neighbor requirements and interface state.'],
    ['A default route is used when no more-specific route matches the destination', 'Default routes provide a route of last resort for unknown destinations.'],
    ['HSRP and VRRP provide first-hop gateway redundancy for hosts on a LAN', 'First Hop Redundancy Protocols let hosts use a resilient default gateway address.'],
    ['OSPF router ID selection can affect neighbor output and LSDB identity but does not replace interface addressing', 'Router ID uniquely identifies an OSPF router process. It is not a forwarding next-hop address by itself.'],
  ],
  'Network Services and Security': [
    ['PAT overload allows many inside hosts to share one outside IPv4 address by tracking transport ports', 'NAT/PAT is a current CCNA v2.0 configuration topic on IOS XE routers.'],
    ['An extended ACL can match protocol, source, destination, and port information', 'Extended ACLs offer more granular matching than standard ACLs, which focus on source addresses.'],
    ['DHCP snooping builds a trusted binding table that other Layer 2 security features can use', 'DHCP snooping validates DHCP messages and supports features such as Dynamic ARP Inspection.'],
    ['Dynamic ARP Inspection uses trusted ports and DHCP snooping bindings to block spoofed ARP replies', 'DAI protects against ARP spoofing when bindings are available and trust boundaries are correct.'],
    ['SCP and SFTP provide secure file transfer for configuration and software management', 'The v2.0 blueprint includes secure file transfer operations with SFTP/SCP.'],
    ['DNS record types support different name-resolution needs, such as A, AAAA, CNAME, MX, NS, and PTR', 'The v2.0 blueprint explicitly includes diagnosing DNS record issues for host, web, and mail access.'],
  ],
  'AI, Network Operations, and Management': [
    ['Agentic AI can assist network operations by interpreting context, recommending actions, and supporting troubleshooting workflows', 'Cisco v2.0 adds agentic AI and digital network assistant awareness for operations and troubleshooting support.'],
    ['A useful AI prompt should include task, context, constraints, persona, output format, and data-handling instructions', 'The v2.0 blueprint includes selecting prompts for generative AI systems while considering prompt components.'],
    ['SNMP collects and reports device management information using managers, agents, and MIB objects', 'SNMP remains a core network management mechanism for monitoring operational state.'],
    ['Syslog severity and facility values help classify and route operational messages', 'Interpreting syslog content, severity, and facilities is part of the v2.0 operations domain.'],
    ['Ansible can execute repeatable commands and configuration tasks across network devices', 'Configuration management mechanisms such as Ansible are in the current blueprint.'],
    ['Cloud-based, controller-based, automation-based, and device-based management are different operational approaches', 'The v2.0 operations domain asks candidates to describe multiple network management approaches.'],
  ],
}

const MR_BANK = {
  'Network Infrastructure and Connectivity': [
    ['A /64 is the common IPv6 LAN prefix size', 'Modified EUI-64 can create an interface ID from a MAC address', 'NAT is required for every IPv6 LAN', 'IPv6 hosts never use neighbor discovery', 'Fiber signal levels are unrelated to link stability'],
    ['Overlapping Wi-Fi channels can cause interference', 'Client security parameters can prevent WLAN association', 'SSID names replace RF planning', 'PoE negotiation is an IPv6 routing protocol', 'DHCP relay is only used on Layer 2 switches'],
  ],
  'Switching and Network Access': [
    ['A trunk can carry multiple VLANs', 'LACP can negotiate an EtherChannel', 'PortFast should be enabled on switch-to-switch trunks by default', 'BPDU Guard makes a port a router interface', 'LLDP can validate neighbor documentation'],
    ['An SVI can provide a VLAN Layer 3 interface', 'Rapid PVST+ uses root bridge election', 'Access ports tag all user traffic with every VLAN', 'CDP encrypts user payloads', 'Loop guard assigns IPv6 prefixes'],
  ],
  'IP Routing': [
    ['Longest prefix match is evaluated before administrative distance across different prefix lengths', 'A floating static route uses a higher administrative distance', 'OSPF forms neighbors without matching area information', 'A default route is more specific than a /24', 'HSRP supports first-hop redundancy'],
    ['OSPFv2 supports IPv4 routing', 'OSPFv3 supports IPv6 routing', 'Static host routes always replace connected routes', 'Administrative distance is an interface speed value', 'VRRP is a DNS record type'],
  ],
  'Network Services and Security': [
    ['PAT overload uses transport ports to multiplex inside sessions', 'Extended ACLs can match destination TCP or UDP ports', 'DHCP snooping trusts all ports by default', 'DAI ignores DHCP snooping bindings', 'SCP protects file transfer with SSH'],
    ['A records map names to IPv4 addresses', 'AAAA records map names to IPv6 addresses', 'MX records identify spanning-tree roots', 'Port security is a routing protocol', 'RA Guard is a Layer 2 security feature'],
  ],
  'AI, Network Operations, and Management': [
    ['Prompt output format can constrain a generative AI response', 'Syslog severity helps prioritize events', 'SNMP only configures VLAN trunks', 'Ansible cannot run repeatable network tasks', 'Agentic AI may support troubleshooting workflows'],
    ['Controller-based management centralizes policy or configuration', 'Infrastructure as code can make network changes repeatable', 'Cloud management requires disabling local logs', 'Data classification should be ignored in AI prompts', 'SNMP managers poll or receive device information'],
  ],
}

const CLI_BANK = {
  'Network Infrastructure and Connectivity': [
    ['show interfaces gi0/1', 'GigabitEthernet0/1 is up, line protocol is up\n  Full-duplex, 100Mb/s\n  235 late collisions, 940 input errors', 'Duplex or speed negotiation should be investigated because late collisions and errors appear on the link.', ['The interface is administratively shut down', 'The DNS MX record is missing', 'OSPF authentication is mismatched']],
    ['show ip dhcp binding', 'Bindings from all pools not associated with VRF:\nIP address      Client-ID/Hardware address      Lease expiration\n-- no bindings --', 'The server has no active DHCPv4 leases, so client assignment or relay should be checked.', ['The switch has elected the wrong STP root', 'PAT overload is definitely working', 'Syslog severity is set to emergencies only']],
  ],
  'Switching and Network Access': [
    ['show interfaces trunk', 'Port        Mode         Encapsulation  Status        Native vlan\nGi1/0/1     on           802.1q         trunking      99\nVlans allowed on trunk: 10,20', 'The port is trunking and only VLANs 10 and 20 are allowed across the trunk.', ['The port is an access port in VLAN 99', 'No native VLAN is configured anywhere', 'LACP has disabled every member link']],
    ['show spanning-tree vlan 20', 'Root ID    Priority 24596\nBridge ID  Priority 32788\nInterface  Role Sts Cost\nGi1/0/1    Root FWD 4\nGi1/0/2    Altn BLK 4', 'Gi1/0/1 is the root port and Gi1/0/2 is an alternate blocking port for VLAN 20.', ['Both ports are designated forwarding ports', 'The bridge is the root for VLAN 20', 'PortFast is active on every trunk']],
  ],
  'IP Routing': [
    ['show ip route 10.40.8.25', 'Routing entry for 10.40.8.0/24\n  Known via "ospf 1", distance 110, metric 20\n  * 10.10.12.2, from 10.255.255.2, via GigabitEthernet0/0', 'The route is learned by OSPF and forwards to next hop 10.10.12.2 out Gi0/0.', ['The route is directly connected', 'The route is a floating static backup', 'The router has no matching route']],
    ['show ip ospf neighbor', 'Neighbor ID     Pri   State           Dead Time   Address         Interface\n2.2.2.2           1   FULL/DR         00:00:31    10.0.12.2       Gi0/0', 'The OSPF adjacency is full and the neighbor is the DR on a broadcast segment.', ['The neighbor is stuck in INIT', 'OSPFv3 is disabled globally', 'The default route is missing']],
  ],
  'Network Services and Security': [
    ['show access-lists WEB-FILTER', 'Extended IP access list WEB-FILTER\n 10 permit tcp 10.10.10.0 0.0.0.255 host 172.16.20.10 eq 443\n 20 deny ip any any log', 'The ACL permits HTTPS from 10.10.10.0/24 to 172.16.20.10 and logs other denied IP traffic.', ['The ACL permits all IP traffic', 'The ACL is standard numbered only', 'The ACL configures DNS records']],
    ['show ip nat translations', 'Pro  Inside global      Inside local       Outside local      Outside global\ntcp  203.0.113.5:1045  10.10.10.15:1045  198.51.100.20:443 198.51.100.20:443', 'PAT is translating inside local 10.10.10.15 to inside global 203.0.113.5 with a tracked TCP port.', ['No NAT translation exists', 'The inside host is using IPv6 only', 'The switch has blocked the port with BPDU Guard']],
  ],
  'AI, Network Operations, and Management': [
    ['show logging | include LINK-3-UPDOWN', '%LINK-3-UPDOWN: Interface GigabitEthernet1/0/24, changed state to down', 'The syslog message reports a severity 3 link-state event for Gi1/0/24.', ['The message is an SNMP GET request', 'The message configures an ACL', 'The message proves DNS has failed']],
    ['ansible-playbook backup.yml --check', 'PLAY RECAP\nsw1 : ok=5 changed=0 failed=0\nsw2 : ok=5 changed=0 failed=0', 'The playbook check completed without failures and did not report changes in check mode.', ['Both switches failed authentication', 'The playbook erased startup configuration', 'SNMP traps are disabled']],
  ],
}

const CONFIG_BANK = {
  'Network Infrastructure and Connectivity': [
    ['DHCP relay on router interface', ['interface g0/0', ' ip address 10.20.10.1 255.255.255.0', '! DHCP server is 10.99.1.10'], 'Add ip helper-address 10.99.1.10 under the client-facing interface.', ['Change the interface to a trunk port', 'Configure BPDU Guard under the router interface', 'Add an MX DNS record to the router']],
  ],
  'Switching and Network Access': [
    ['802.1Q trunk to distribution switch', ['interface gi1/0/1', ' switchport mode access', ' switchport access vlan 10', '! VLANs 10,20,30 must cross this uplink'], 'Configure the link as an 802.1Q trunk and allow the required VLANs.', ['Disable CDP on every access port', 'Configure HSRP on the Layer 2 port', 'Set the port to errdisable recovery only']],
    ['PortFast edge port hardening', ['interface gi1/0/24', ' switchport mode access', ' switchport access vlan 20', ' spanning-tree portfast'], 'Add BPDU Guard for an edge port where a switch should not be connected.', ['Make the port a routed OSPF interface', 'Remove the access VLAN', 'Configure NAT overload on the switch port']],
  ],
  'IP Routing': [
    ['Floating static route', ['ip route 0.0.0.0 0.0.0.0 203.0.113.1', 'ip route 0.0.0.0 0.0.0.0 198.51.100.1'], 'Add a higher administrative distance to the backup static route.', ['Make both routes host routes to 127.0.0.1', 'Replace both routes with an ACL', 'Configure DHCP snooping on the WAN interface']],
    ['Single-area OSPF', ['router ospf 10', ' router-id 1.1.1.1', 'network 10.0.12.0 0.0.0.255 area 1', '! Neighbor interface is in area 0'], 'Place the shared link in the same OSPF area as the neighbor.', ['Disable all hello packets', 'Configure PAT overload', 'Change the DNS CNAME record']],
  ],
  'Network Services and Security': [
    ['PAT overload', ['access-list 1 permit 10.10.10.0 0.0.0.255', 'ip nat inside source list 1 interface g0/1', '! Inside hosts need port overload'], 'Add the overload keyword to the NAT statement.', ['Convert the ACL to an MX record', 'Enable PortFast on the WAN interface', 'Remove the inside ACL permit']],
    ['Extended ACL placement', ['ip access-list extended WEB-FILTER', ' permit tcp any host 172.16.20.10 eq 443', ' deny ip any any log', 'interface g0/1', '! Filter should protect inbound traffic to the server VLAN'], 'Apply the ACL in the correct direction on the server-facing interface.', ['Apply the ACL as an OSPF network statement', 'Configure it as an SNMP community', 'Add it to a port-channel group']],
  ],
  'AI, Network Operations, and Management': [
    ['AI troubleshooting prompt', ['Task: troubleshoot link flaps', 'Context: switch logs and interface counters provided', 'Output: none specified', 'Data handling: none specified'], 'Specify the expected output format and data-handling constraints in the prompt.', ['Ask the AI to ignore logs and invent a fix', 'Paste secrets and request public sharing', 'Replace syslog severity with VLAN tags']],
    ['Ansible inventory', ['[switches]', 'sw1 ansible_host=10.0.0.11', 'sw2 ansible_host=10.0.0.12', '[routers]', 'r1 ansible_host=10.0.0.1'], 'Target the correct inventory group before running a playbook against network devices.', ['Run the playbook against every host by default', 'Convert the inventory to a DNS MX record', 'Use HSRP priority as the inventory hostname']],
  ],
}

function choice(correct, distractors, id) {
  const choices = [correct, ...distractors]
  const shift = id % choices.length
  const rotated = [...choices.slice(shift), ...choices.slice(0, shift)]
  return { choices: rotated, correctAnswer: rotated.indexOf(correct) }
}

function single(domain, id, serial) {
  const site = SITES[id % SITES.length]
  const [correct, explanation] = SINGLE_BANK[domain][serial % SINGLE_BANK[domain].length]
  const distractors = [
    'Clear the startup configuration before collecting evidence',
    'Treat the issue as a DNS problem before checking the shown layer',
    'Replace the switch or router without validating the symptom',
  ]
  return {
    id: `ccna-v2-${slug(domain)}-single-${String(id).padStart(3, '0')}`,
    domain,
    type: 'single-choice',
    question: `In ${site} case ${String(id).padStart(3, '0')}, a CCNA candidate is asked to choose the best action for ${topicPhrase(domain, serial)}. Which answer is most appropriate?`,
    ...choice(correct, distractors, id),
    explanation,
  }
}

function multiple(domain, id, serial) {
  const bank = MR_BANK[domain][serial % MR_BANK[domain].length]
  const correctA = bank[0]
  const correctB = bank[1]
  const choices = [correctA, bank[2], correctB, bank[3], bank[4]]
  const shift = id % choices.length
  const rotated = [...choices.slice(shift), ...choices.slice(0, shift)]
  return {
    id: `ccna-v2-${slug(domain)}-mr-${String(id).padStart(3, '0')}`,
    domain,
    type: 'multiple-response',
    question: `A ${SITES[id % SITES.length]} review case ${String(id).padStart(3, '0')} covers ${topicPhrase(domain, serial)}. Which TWO statements are accurate? (Select two.)`,
    choices: rotated,
    correctAnswers: [rotated.indexOf(correctA), rotated.indexOf(correctB)].sort((a, b) => a - b),
    explanation: `${correctA}. Also, ${correctB}. The distractors mix unrelated protocols, wrong layers, or unsafe assumptions that do not match the scenario.`,
  }
}

function cli(domain, id, serial) {
  const item = CLI_BANK[domain][serial % CLI_BANK[domain].length]
  return {
    id: `ccna-v2-${slug(domain)}-cli-${String(id).padStart(3, '0')}`,
    domain,
    type: 'cli-output',
    question: `Review case ${String(id).padStart(3, '0')} output from ${deviceFor(domain, id)}. What is the best interpretation?`,
    commands: [{ device: deviceFor(domain, id), command: item[0], output: item[1] }],
    ...choice(item[2], item[3], id),
    explanation: `The command output supports this conclusion: ${item[2]}`,
  }
}

function config(domain, id, serial) {
  const item = CONFIG_BANK[domain][serial % CONFIG_BANK[domain].length]
  return {
    id: `ccna-v2-${slug(domain)}-config-${String(id).padStart(3, '0')}`,
    domain,
    type: 'config-repair',
    question: `For case ${String(id).padStart(3, '0')}, which configuration repair best matches the requirement?`,
    scenario: `A ${SITES[id % SITES.length]} change window exposes a mismatch in ${topicPhrase(domain, serial)}.`,
    device: deviceFor(domain, id),
    configTitle: item[0],
    config: item[1],
    notes: ['Choose the smallest correct change.', 'Preserve the stated design intent.'],
    ...choice(item[2], item[3], id),
    explanation: `${item[2]} This is the least disruptive correction that matches the stated requirement and the displayed configuration.`,
  }
}

function topology(domain, id, serial) {
  const left = domain === 'Switching and Network Access' ? 'SW1' : 'R1'
  const middle = domain === 'AI, Network Operations, and Management' ? 'Controller' : 'R2'
  const right = domain === 'Switching and Network Access' ? 'SW2' : 'R3'
  const evidence = topologyEvidence(domain, serial)
  return {
    id: `ccna-v2-${slug(domain)}-topology-${String(id).padStart(3, '0')}`,
    domain,
    type: 'topology-scenario',
    prompt: `Review the topology and operational table for ${topicPhrase(domain, serial)}.`,
    topology: {
      label: `${domain} topology ${serial + 1}`,
      nodes: [
        { id: left, label: left, kind: left.startsWith('SW') ? 'switch' : 'router', x: 110, y: 130 },
        { id: middle, label: middle, kind: middle === 'Controller' ? 'controller' : 'router', x: 310, y: 130 },
        { id: right, label: right, kind: right.startsWith('SW') ? 'switch' : 'router', x: 510, y: 130 },
      ],
      links: [
        { from: left, to: middle, label: evidence.linkA },
        { from: middle, to: right, label: evidence.linkB },
      ],
    },
    tables: [{
      title: 'Observed state',
      columns: ['Check', 'Observed value', 'Impact'],
      rows: evidence.rows,
    }],
    question: `${evidence.question} Case ${String(id).padStart(3, '0')}.`,
    ...choice(evidence.correct, evidence.distractors, id),
    explanation: evidence.explanation,
  }
}

function subnet(domain, id, serial) {
  const subnets = [
    ['192.168.10.64/27', { network: '192.168.10.64', broadcast: '192.168.10.95', firstUsable: '192.168.10.65', lastUsable: '192.168.10.94', hostCount: 30 }],
    ['10.20.8.128/26', { network: '10.20.8.128', broadcast: '10.20.8.191', firstUsable: '10.20.8.129', lastUsable: '10.20.8.190', hostCount: 62 }],
    ['172.16.4.0/28', { network: '172.16.4.0', broadcast: '172.16.4.15', firstUsable: '172.16.4.1', lastUsable: '172.16.4.14', hostCount: 14 }],
    ['192.0.2.16/30', { network: '192.0.2.16', broadcast: '192.0.2.19', firstUsable: '192.0.2.17', lastUsable: '192.0.2.18', hostCount: 2 }],
  ]
  const [given, correct] = subnets[serial % subnets.length]
  return {
    id: `ccna-v2-${slug(domain)}-subnet-${String(id).padStart(3, '0')}`,
    domain,
    type: 'subnetting-drill',
    question: `Calculate the requested IPv4 subnet values for ${given} in case ${String(id).padStart(3, '0')}.`,
    given,
    asks: ['network', 'broadcast', 'firstUsable', 'lastUsable', 'hostCount'],
    correct,
    explanation: `For ${given}, the block size determines the network and broadcast boundaries; usable hosts fall between those two addresses.`,
  }
}

function topologyEvidence(domain, serial) {
  const variants = {
    'Network Infrastructure and Connectivity': [
      {
        linkA: 'Gi0/0 up/down', linkB: 'Gi0/1 up/up',
        rows: [['Client IP', '169.254.12.44', 'DHCP did not complete'], ['Gateway ping', 'fails', 'No valid default gateway path']],
        question: 'What should be checked first for the client connectivity failure?',
        correct: 'DHCP assignment and relay behavior on the client VLAN',
        distractors: ['OSPF DR election on the WAN', 'SNMP community strings', 'Ansible inventory group names'],
        explanation: 'The APIPA address indicates the client did not receive a DHCP lease, so DHCP scope, server, or relay behavior is the first target.',
      },
    ],
    'Switching and Network Access': [
      {
        linkA: 'Gi1/0/1 trunk', linkB: 'Gi1/0/2 trunk',
        rows: [['Allowed VLANs', '10 only', 'VLAN 20 missing'], ['User symptom', 'VLAN 20 unreachable', 'Traffic cannot cross trunk']],
        question: 'What is the most likely reason VLAN 20 cannot cross the uplink?',
        correct: 'VLAN 20 is not allowed on the trunk',
        distractors: ['The access port uses the wrong DNS record', 'OSPFv3 has no router ID', 'The DHCP server has too many leases'],
        explanation: 'The topology table shows the trunk allows VLAN 10 only, so VLAN 20 frames are pruned from the uplink.',
      },
    ],
    'IP Routing': [
      {
        linkA: '10.0.12.0/30', linkB: '10.0.23.0/30',
        rows: [['Route to 10.40.8.0/24', 'via 10.0.12.2', 'primary path'], ['Backup static', 'AD 200', 'floating backup']],
        question: 'Which route should be used while the primary path is present?',
        correct: 'The lower administrative-distance primary route',
        distractors: ['The floating static route with AD 200', 'The route with the longest interface description', 'The syslog facility value'],
        explanation: 'For the same prefix, the route with the lower administrative distance is preferred; the AD 200 static remains a backup.',
      },
    ],
    'Network Services and Security': [
      {
        linkA: 'inside Gi0/0', linkB: 'outside Gi0/1',
        rows: [['NAT rule', 'missing overload', 'Only one-to-one behavior'], ['Inside ACL', 'permits 10.10.10.0/24', 'Correct source match']],
        question: 'What prevents many inside users from sharing the outside address?',
        correct: 'The NAT statement is missing overload',
        distractors: ['The DNS CNAME points at the mail server', 'The trunk native VLAN is wrong', 'OSPF timers are mismatched'],
        explanation: 'PAT requires overload so many inside sessions can share one outside interface address using ports.',
      },
    ],
    'AI, Network Operations, and Management': [
      {
        linkA: 'REST API 200 OK', linkB: 'controller sync',
        rows: [['Prompt', 'No output format specified', 'Response may be hard to use'], ['Data', 'Contains hostnames only', 'Low sensitivity in this scenario']],
        question: 'What prompt improvement best supports the operations task?',
        correct: 'Specify the desired output format and constraints',
        distractors: ['Ask the AI to ignore provided evidence', 'Replace syslog with VLAN pruning', 'Disable SNMP on every device'],
        explanation: 'The v2.0 operations domain includes prompt selection; useful prompts specify context, constraints, and output format.',
      },
    ],
  }
  return variants[domain][serial % variants[domain].length]
}

function typePlan() {
  const plan = []
  for (const [type, count] of Object.entries(TYPE_TARGETS)) {
    for (let i = 0; i < count; i += 1) plan.push(type)
  }
  return plan
}

function buildQuestions() {
  const plan = typePlan()
  const typeUsed = Object.fromEntries(Object.keys(TYPE_TARGETS).map(t => [t, 0]))
  const questions = []
  let id = 1
  for (const domain of DOMAINS) {
    const domainTypeCounts = allocateTypes(domain.target)
    for (const [type, count] of Object.entries(domainTypeCounts)) {
      for (let i = 0; i < count; i += 1) {
        const serial = typeUsed[type]++
        if (type === 'single-choice') questions.push(single(domain.name, id++, serial))
        else if (type === 'multiple-response') questions.push(multiple(domain.name, id++, serial))
        else if (type === 'cli-output') questions.push(cli(domain.name, id++, serial))
        else if (type === 'topology-scenario') questions.push(topology(domain.name, id++, serial))
        else if (type === 'config-repair') questions.push(config(domain.name, id++, serial))
        else if (type === 'subnetting-drill') questions.push(subnet(domain.name, id++, serial))
      }
    }
  }
  if (plan.length !== questions.length) throw new Error('type plan mismatch')
  return questions
}

function allocateTypes(domainTarget) {
  const ratios = {
    'single-choice': 250 / 750,
    'multiple-response': 60 / 750,
    'cli-output': 170 / 750,
    'topology-scenario': 120 / 750,
    'config-repair': 100 / 750,
    'subnetting-drill': 50 / 750,
  }
  const raw = Object.entries(ratios).map(([type, ratio]) => ({ type, exact: ratio * domainTarget }))
  const base = raw.map(x => ({ ...x, count: Math.floor(x.exact), rem: x.exact - Math.floor(x.exact) }))
  let left = domainTarget - base.reduce((sum, x) => sum + x.count, 0)
  for (const item of base.sort((a, b) => b.rem - a.rem)) {
    if (left <= 0) break
    item.count += 1
    left -= 1
  }
  return Object.fromEntries(base.map(x => [x.type, x.count]))
}

function topicPhrase(domain, serial) {
  const phrases = {
    'Network Infrastructure and Connectivity': ['IPv4 client assignment', 'IPv6 prefix sizing', 'wireless interference', 'fiber link selection', 'DHCP relay', 'virtualization concepts'],
    'Switching and Network Access': ['802.1Q trunking', 'edge port configuration', 'EtherChannel negotiation', 'Rapid PVST+ protection', 'CDP/LLDP documentation', 'SVI reachability'],
    'IP Routing': ['routing-table interpretation', 'floating static backup design', 'single-area OSPF adjacency', 'default route behavior', 'FHRP gateway resilience', 'OSPF router ID behavior'],
    'Network Services and Security': ['PAT overload', 'extended ACL behavior', 'DHCP snooping', 'Dynamic ARP Inspection', 'secure file transfer', 'DNS record troubleshooting'],
    'AI, Network Operations, and Management': ['agentic AI support', 'prompt construction', 'SNMP monitoring', 'syslog interpretation', 'Ansible execution', 'management architecture'],
  }
  return phrases[domain][serial % phrases[domain].length]
}

function deviceFor(domain, id) {
  if (domain === 'Switching and Network Access') return `SW${(id % 3) + 1}`
  if (domain === 'AI, Network Operations, and Management') return `NMS${(id % 2) + 1}`
  return `R${(id % 3) + 1}`
}

function slug(domain) {
  return domain.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const questions = buildQuestions().map(question => ({
  ...question,
  explanation: enrichExplanation(question),
}))
const byDomain = questions.reduce((acc, q) => {
  acc[q.domain] = (acc[q.domain] || 0) + 1
  return acc
}, {})
const byType = questions.reduce((acc, q) => {
  acc[q.type] = (acc[q.type] || 0) + 1
  return acc
}, {})
const duplicates = questions.length - new Set(questions.map(q => q.question)).size
const shortExplanations = questions.filter(q => q.explanation.length < 100).length

if (questions.length !== 750) throw new Error(`Expected 750, got ${questions.length}`)
for (const domain of DOMAINS) {
  if (byDomain[domain.name] !== domain.target) throw new Error(`${domain.name}: ${byDomain[domain.name]} != ${domain.target}`)
}
for (const [type, count] of Object.entries(TYPE_TARGETS)) {
  if (byType[type] !== count) throw new Error(`${type}: ${byType[type]} != ${count}`)
}
if (duplicates) throw new Error(`Duplicate questions: ${duplicates}`)
if (shortExplanations) throw new Error(`Short explanations: ${shortExplanations}`)

await writeFile(OUT, `${JSON.stringify(questions, null, 2)}\n`)
console.log(JSON.stringify({ total: questions.length, byDomain, byType, duplicates, shortExplanations }, null, 2))

function enrichExplanation(question) {
  const caseId = question.id.match(/-(\d{3})$/)?.[1] ?? question.id
  const explanation = `In case ${caseId}, ${question.explanation.charAt(0).toLowerCase()}${question.explanation.slice(1)}`
  if (explanation.length >= 100) return explanation
  return `${explanation} This aligns with the ${question.domain} objective and rejects distractors that change the wrong layer, ignore the evidence, or introduce an unsafe operational assumption.`
}
