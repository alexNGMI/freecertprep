import fs from 'node:fs'

const OUT = 'src/data/ccna-200-301-questions.json'

const domains = [
  { name: 'Network Infrastructure and Connectivity', count: 188, types: { single: 63, mr: 15, cli: 43, topology: 30, config: 25, subnet: 12 } },
  { name: 'Switching and Network Access', count: 187, types: { single: 62, mr: 15, cli: 43, topology: 30, config: 25, subnet: 12 } },
  { name: 'IP Routing', count: 150, types: { single: 50, mr: 12, cli: 34, topology: 24, config: 20, subnet: 10 } },
  { name: 'Network Services and Security', count: 150, types: { single: 50, mr: 12, cli: 34, topology: 24, config: 20, subnet: 10 } },
  { name: 'AI, Network Operations, and Management', count: 75, types: { single: 25, mr: 6, cli: 16, topology: 12, config: 10, subnet: 6 } },
]

const sites = [
  'campus distribution block', 'data center access layer', 'remote clinic', 'warehouse WLAN area',
  'cloud edge pod', 'manufacturing cell', 'training lab', 'retail store', 'regional headquarters',
  'branch office', 'service desk lab', 'research floor', 'support center', 'logistics hub',
  'medical records wing', 'engineering annex',
]

const workAreas = [
  'after a maintenance handoff', 'during a failed change review', 'while validating a new access closet',
  'during an outage bridge', 'after a monitoring alert', 'while checking a migration window',
  'during a post-upgrade smoke test', 'after a cabling move', 'while onboarding a new subnet',
  'during a wireless density review', 'after a route-policy cleanup', 'while auditing a WAN failover',
  'during a controller health check', 'after a help desk escalation', 'while preparing a rollback plan',
  'during a segmented guest-network rollout', 'after a power event', 'while reviewing a branch cutover',
  'during a secure-management audit', 'after a firewall rule change', 'while tuning an RF profile',
  'during a subnet expansion', 'after a DHCP scope migration', 'while reviewing a topology diagram',
  'during an automation dry run', 'after a log correlation alert', 'while validating redundant uplinks',
  'during a campus refresh', 'after a virtualization host move', 'while isolating a slow-app report',
  'during a technician peer review',
]

const evidenceAngles = [
  'the first clue comes from endpoint behavior',
  'the decisive evidence is in the device state',
  'the risk is changing the wrong layer',
  'the safest fix is the narrowest matching change',
  'the symptom appears only beyond the local segment',
  'the output should be read before changing policy',
  'the design goal is availability without masking the fault',
  'the issue follows one path rather than every user',
  'the operations note points to a control-plane check',
  'the troubleshooting record shows a recent configuration change',
  'the service dependency is more likely than cabling',
  'the topology narrows the likely failure domain',
  'the management-plane signal needs verification',
]

const concepts = {
  'Network Infrastructure and Connectivity': [
    {
      id: 'ipv4-host-config',
      label: 'IPv4 client assignment',
      question: 'A Windows client can reach devices in its own subnet but cannot reach remote networks. Which setting should be checked first?',
      correct: 'Verify the host has the correct default gateway for its subnet.',
      distractors: ['Replace the access switch before checking addressing.', 'Clear the router configuration and reload.', 'Change the DNS suffix before checking Layer 3 settings.'],
      why: 'A missing or incorrect default gateway breaks off-subnet reachability while local subnet traffic can still work.',
      takeaway: 'For host connectivity, prove address, mask, gateway, and DNS before replacing infrastructure.',
      cli: { command: 'ipconfig /all', output: 'IPv4 Address . . . . . . . . . . : 192.168.24.55\nSubnet Mask . . . . . . . . . . : 255.255.255.0\nDefault Gateway . . . . . . . . : 192.168.24.254\nDNS Servers . . . . . . . . . . : 10.10.10.10' },
    },
    {
      id: 'ipv6-eui64',
      label: 'IPv6 prefix sizing and interface IDs',
      question: 'Which IPv6 behavior is described by an interface identifier derived from the MAC address with the universal/local bit inverted?',
      correct: 'Modified EUI-64',
      distractors: ['DHCP relay', 'PAT overload', 'OSPF passive interface'],
      why: 'Modified EUI-64 derives the interface ID from the MAC address and flips the universal/local bit.',
      takeaway: 'Know IPv6 address formation separately from routing, NAT, and DHCP services.',
      cli: { command: 'show ipv6 interface gigabitEthernet0/0', output: 'GigabitEthernet0/0 is up\n  IPv6 is enabled, link-local address is FE80::A8BB:CCFF:FE00:101\n  Joined group address(es): FF02::1 FF02::2' },
    },
    {
      id: 'wireless-interference',
      label: 'wireless interference',
      question: 'Users report strong signal but poor throughput in a dense 2.4 GHz office. Which cause is most likely?',
      correct: 'Co-channel or adjacent-channel interference from overlapping RF channels.',
      distractors: ['A missing IPv6 default route on the WAN edge.', 'An incorrect OSPF process ID on a router.', 'A failed DHCP relay on a routed interface.'],
      why: 'Strong received signal does not guarantee clean airtime; overlapping channels and RF contention reduce throughput.',
      takeaway: 'Wireless troubleshooting must check channel use, band selection, and RF noise, not only signal strength.',
      cli: { command: 'show wireless client summary', output: 'Band  Clients  Avg RSSI  Retry%\n2.4G  84       -48       37\n5G    19       -56       4' },
    },
    {
      id: 'fiber-media',
      label: 'fiber link selection',
      question: 'A short 10 Gb building uplink uses multimode fiber. Which optic type is the best match?',
      correct: '10GBASE-SR',
      distractors: ['10GBASE-LR for long single-mode spans.', '1000BASE-T over twisted pair.', 'Console rollover cable.'],
      why: '10GBASE-SR is designed for short-reach 10 Gb Ethernet over multimode fiber.',
      takeaway: 'Match Ethernet media to distance, fiber type, and transceiver support.',
      cli: { command: 'show interfaces transceiver detail', output: 'Port Te1/1/1\nType: 10Gbase-SR\nMedia: MMF\nTx Power: -2.1 dBm\nRx Power: -2.4 dBm' },
    },
    {
      id: 'virtualization',
      label: 'virtualization concepts',
      question: 'What does a hypervisor provide in a virtualized network services environment?',
      correct: 'It abstracts compute resources so multiple virtual machines can share one physical host.',
      distractors: ['It replaces the need for VLANs on a campus switch.', 'It encrypts all wireless client traffic by itself.', 'It turns a Layer 2 switch into an OSPF router.'],
      why: 'A hypervisor presents virtual hardware to guest systems and schedules shared CPU, memory, storage, and network access.',
      takeaway: 'Separate virtualization foundations from switching, routing, and security controls.',
      cli: { command: 'show virtual-service list', output: 'Name           Status     Package\napp-hosting    Activated  guestshell\ntelemetry      Running    container' },
    },
  ],
  'Switching and Network Access': [
    {
      id: 'vlan-access-port',
      label: 'access VLAN placement',
      question: 'A user was moved to a new desk and now receives the wrong subnet. Which switchport setting should be checked first?',
      correct: 'The access VLAN assigned to the user-facing switchport.',
      distractors: ['The OSPF router ID on the WAN router.', 'The NAT overload interface on the firewall.', 'The NTP source interface on the core switch.'],
      why: 'An access port in the wrong VLAN places the endpoint in the wrong Layer 2 broadcast domain and DHCP scope.',
      takeaway: 'When only one access user lands in the wrong subnet, verify the port VLAN before changing routing.',
      cli: { command: 'show interfaces gi1/0/12 switchport', output: 'Administrative Mode: static access\nOperational Mode: static access\nAccess Mode VLAN: 30 (GUEST)\nVoice VLAN: none' },
    },
    {
      id: 'trunk-allowed-vlan',
      label: 'trunk VLAN allowance',
      question: 'A VLAN exists on both switches, but traffic fails across the uplink. What should be checked first?',
      correct: 'Whether the VLAN is allowed on the trunk between the switches.',
      distractors: ['Whether PAT overload is enabled on the internet router.', 'Whether the DHCP lease time is too long.', 'Whether the DNS server supports recursion.'],
      why: 'A trunk can be operational while still filtering a VLAN that is missing from the allowed list.',
      takeaway: 'For VLAN reachability across switches, check VLAN existence, trunk state, and allowed VLANs together.',
      cli: { command: 'show interfaces trunk', output: 'Port      Mode  Status       Native vlan\nGi1/0/48  on    trunking     99\n\nPort      Vlans allowed on trunk\nGi1/0/48  10,20' },
    },
    {
      id: 'stp-root',
      label: 'STP root bridge control',
      question: 'Which action makes the distribution switch more likely to become the STP root bridge for a VLAN?',
      correct: 'Lower the bridge priority for that VLAN.',
      distractors: ['Increase the interface MTU on host ports.', 'Disable CDP globally.', 'Change the DHCP helper address.'],
      why: 'STP elects the lowest bridge ID; priority is the administrative field used to influence the root election.',
      takeaway: 'STP root placement is controlled with bridge priority, not unrelated access-layer settings.',
      cli: { command: 'show spanning-tree vlan 20 root', output: 'Root ID    Priority    32788\n           Address     001d.a1aa.0200\n           Cost        4\n           Port        Gi1/0/48' },
    },
    {
      id: 'etherchannel',
      label: 'EtherChannel negotiation',
      question: 'Two links should bundle with LACP but remain individual links. Which mismatch is most likely?',
      correct: 'One side is configured for LACP active/passive while the other uses a static mode.',
      distractors: ['The DHCP pool has an excluded address.', 'The WLAN SSID uses WPA3.', 'The router has a floating static route.'],
      why: 'LACP requires compatible negotiation modes and matching Layer 2 parameters before links join a port channel.',
      takeaway: 'EtherChannel troubleshooting starts with protocol mode, member consistency, and physical link state.',
      cli: { command: 'show etherchannel summary', output: 'Group  Port-channel  Protocol  Ports\n1      Po1(SD)       LACP      Gi1/0/47(I) Gi1/0/48(I)' },
    },
    {
      id: 'wlan-auth',
      label: 'WLAN authentication',
      question: 'Corporate wireless users can see the SSID but fail authentication. Which component should be checked for 802.1X WLAN access?',
      correct: 'The RADIUS server reachability and policy used by the WLAN.',
      distractors: ['The OSPF passive-interface setting on the WAN link.', 'The NAT pool prefix length on the firewall.', 'The switchport voice VLAN on a desk phone port.'],
      why: 'Enterprise WLAN authentication commonly depends on 802.1X and RADIUS policy decisions.',
      takeaway: 'Separate RF association problems from authentication and authorization problems.',
      cli: { command: 'show wlan summary', output: 'WLAN  Profile       SSID          Security\n2     CORP-DOT1X    CorpWiFi      WPA2/WPA3 802.1X\nRADIUS server 10.20.1.25 state: dead' },
    },
  ],
  'IP Routing': [
    {
      id: 'static-default-route',
      label: 'default route selection',
      question: 'A branch router has no route for internet destinations. What is the most direct fix?',
      correct: 'Install a default route toward the provider next hop.',
      distractors: ['Change all access ports to trunk mode.', 'Disable OSPF on every interface.', 'Remove the management ACL from VTY lines.'],
      why: 'A default route matches destinations that are not in the routing table and points traffic toward the upstream router.',
      takeaway: 'When specific routes are absent, validate the routing table before changing Layer 2 or management settings.',
      cli: { command: 'show ip route 8.8.8.8', output: '% Network not in table' },
    },
    {
      id: 'ospf-neighbor',
      label: 'OSPF adjacency',
      question: 'Two OSPF routers on the same segment do not become neighbors. Which mismatch should be checked first?',
      correct: 'Area ID, hello/dead timers, authentication, and subnet compatibility.',
      distractors: ['DNS record type and recursive lookup settings.', 'WLAN channel width and transmit power.', 'NAT inside source ACL sequence numbers only.'],
      why: 'OSPF neighbors require compatible area, timers, network type, authentication, and Layer 3 addressing.',
      takeaway: 'OSPF troubleshooting starts with neighbor prerequisites before route redistribution or policy changes.',
      cli: { command: 'show ip ospf neighbor', output: 'Neighbor ID     Pri   State      Dead Time   Address      Interface\n\n% No OSPF neighbors found' },
    },
    {
      id: 'longest-prefix',
      label: 'longest prefix match',
      question: 'A router has routes for 10.10.0.0/16 and 10.10.20.0/24. Which route is used for 10.10.20.55?',
      correct: '10.10.20.0/24 because it is the most specific matching prefix.',
      distractors: ['10.10.0.0/16 because it was learned first.', 'The default route because both routes overlap.', 'No route because overlapping routes are invalid.'],
      why: 'Routers choose the longest matching prefix before comparing administrative distance or metric.',
      takeaway: 'Route selection starts with prefix specificity, then administrative distance, then metric.',
      cli: { command: 'show ip route 10.10.20.55', output: 'Routing entry for 10.10.20.0/24\n  Known via "ospf 1", distance 110, metric 20' },
    },
    {
      id: 'floating-static',
      label: 'floating static route',
      question: 'Which static route design provides backup only when the dynamic route disappears?',
      correct: 'A static route with a higher administrative distance than the dynamic route.',
      distractors: ['A static route with the same next hop and lower administrative distance.', 'A trunk allowed VLAN list on the uplink.', 'A DHCP exclusion range covering the gateway.'],
      why: 'A floating static route stays inactive while a better route exists and enters the table only when that route is lost.',
      takeaway: 'Administrative distance controls whether backup static routes float or override dynamic routes.',
      cli: { command: 'show running-config | include ^ip route', output: 'ip route 10.40.0.0 255.255.0.0 203.0.113.2 200' },
    },
    {
      id: 'first-hop',
      label: 'first-hop redundancy',
      question: 'Which feature provides a shared default gateway address for hosts when two routers serve the same subnet?',
      correct: 'First-hop redundancy such as HSRP.',
      distractors: ['PortFast on the access switch.', 'DNS round-robin records.', 'A local username privilege level.'],
      why: 'First-hop redundancy protocols let hosts use a virtual gateway that survives a router failure.',
      takeaway: 'Gateway resiliency for a subnet is a first-hop redundancy problem, not a DNS or STP feature.',
      cli: { command: 'show standby brief', output: 'Interface   Grp  Pri  State   Active          Standby         Virtual IP\nGi0/0       10   110  Active  local           10.10.10.3      10.10.10.1' },
    },
  ],
  'Network Services and Security': [
    {
      id: 'dhcp-relay',
      label: 'DHCP relay',
      question: 'Clients in a remote VLAN fail to receive DHCP leases from a centralized server. What should be configured on the routed VLAN interface?',
      correct: 'An IP helper address pointing to the DHCP server.',
      distractors: ['A lower STP bridge priority.', 'A local username on the switch console.', 'A static ARP entry for every client.'],
      why: 'DHCP relay forwards client broadcasts as unicast traffic to a DHCP server on another subnet.',
      takeaway: 'Centralized DHCP across routed boundaries requires relay on the client-facing Layer 3 interface.',
      cli: { command: 'show running-config interface vlan 40', output: 'interface Vlan40\n ip address 10.40.0.1 255.255.255.0\n no shutdown' },
    },
    {
      id: 'nat-pat',
      label: 'PAT overload',
      question: 'Inside users cannot reach the internet and no translations appear. Which NAT role is commonly missing?',
      correct: 'The outside interface must be marked with ip nat outside.',
      distractors: ['The access switch must become the STP root.', 'The WLAN must use a different RF channel.', 'The DNS server must be configured as an OSPF neighbor.'],
      why: 'PAT needs inside and outside interface roles so the router can classify and translate traffic.',
      takeaway: 'For NAT failures, verify ACL match, inside/outside roles, and the overload statement.',
      cli: { command: 'show ip nat translations', output: 'Pro  Inside global     Inside local      Outside local     Outside global\n---  ---               ---               ---               ---\nTotal active translations: 0' },
    },
    {
      id: 'acl-order',
      label: 'ACL rule order',
      question: 'An ACL should allow HTTPS to a server but deny other inbound traffic. Why does rule order matter?',
      correct: 'ACLs are processed top down until the first match, with an implicit deny at the end.',
      distractors: ['ACLs always process the most specific port first regardless of order.', 'ACLs only affect traffic generated by the router itself.', 'ACLs require OSPF to be enabled before they can filter packets.'],
      why: 'A deny placed before the intended permit can block traffic before later lines are evaluated.',
      takeaway: 'Read ACLs from top to bottom and remember the implicit deny.',
      cli: { command: 'show access-lists WEB-IN', output: '10 deny tcp any host 10.10.50.20 eq 443\n20 permit tcp any host 10.10.50.20 eq 443\n30 deny ip any any' },
    },
    {
      id: 'ssh-management',
      label: 'SSH management',
      question: 'Which management access choice protects credentials in transit?',
      correct: 'SSH with local or AAA-backed authentication.',
      distractors: ['Telnet over the production VLAN.', 'HTTP on TCP port 80.', 'An unauthenticated console server.'],
      why: 'SSH encrypts the management session; Telnet and HTTP expose credentials and commands in clear text.',
      takeaway: 'Secure device management should use encrypted access, restricted sources, and accountable authentication.',
      cli: { command: 'show ip ssh', output: 'SSH Enabled - version 2.0\nAuthentication timeout: 60 secs; Authentication retries: 3' },
    },
    {
      id: 'dhcp-snooping',
      label: 'DHCP snooping',
      question: 'Which control helps stop a rogue DHCP server on an access port?',
      correct: 'Enable DHCP snooping and trust only legitimate uplink/server-facing ports.',
      distractors: ['Configure every access port as a trunk.', 'Disable all syslog messages.', 'Use a floating static route to the client subnet.'],
      why: 'DHCP snooping blocks server messages from untrusted ports and builds a binding table for additional protections.',
      takeaway: 'Layer 2 security controls should distinguish trusted infrastructure ports from untrusted edge ports.',
      cli: { command: 'show ip dhcp snooping', output: 'Switch DHCP snooping is enabled\nDHCP snooping is configured on VLANs: 10,20,40\nInterface Gi1/0/48 trusted\nInterface Gi1/0/12 untrusted' },
    },
  ],
  'AI, Network Operations, and Management': [
    {
      id: 'syslog-severity',
      label: 'syslog interpretation',
      question: 'Which syslog severity indicates an error condition that should be investigated but is not the most severe emergency level?',
      correct: 'Severity 3, Error.',
      distractors: ['Severity 7, Debug.', 'Severity 0, Emergency.', 'Severity 6, Informational.'],
      why: 'Syslog severity 3 is Error; lower numbers are more severe, while 6 and 7 are routine informational/debug levels.',
      takeaway: 'Operations questions often require interpreting monitoring output before choosing an escalation.',
      cli: { command: 'show logging | include %LINK|%SYS', output: 'Jun 16 10:14:21.331: %LINK-3-UPDOWN: Interface Gi1/0/24, changed state to down\nJun 16 10:14:24.912: %SYS-5-CONFIG_I: Configured from console by admin' },
    },
    {
      id: 'snmp-telemetry',
      label: 'SNMP monitoring',
      question: 'What does SNMP commonly provide to a network monitoring system?',
      correct: 'Polled or trapped device status, counters, and operational metrics.',
      distractors: ['Packet forwarding between VLANs.', '802.1X user authentication by itself.', 'Translation of private addresses to public addresses.'],
      why: 'SNMP exposes management information such as interface counters, device health, and alerts.',
      takeaway: 'Management protocols observe and report state; they do not replace forwarding, authentication, or NAT.',
      cli: { command: 'show snmp', output: 'Chassis: FOC1234ABCD\n0 SNMP packets input queue drops\nSNMP logging: enabled\nSNMP agent enabled' },
    },
    {
      id: 'rest-json',
      label: 'REST API and JSON',
      question: 'A controller returns structured data to an automation script. Which format is commonly used with REST APIs?',
      correct: 'JSON payloads over HTTP-based API calls.',
      distractors: ['STP bridge protocol data units only.', 'Analog modem tones.', 'Raw console rollover pinouts.'],
      why: 'Modern network APIs commonly exchange JSON objects through RESTful HTTP requests and responses.',
      takeaway: 'Controller and automation topics require recognizing data formats as well as CLI output.',
      cli: { command: 'curl -s https://controller/api/interfaces/Gi1/0/1', output: '{\n  "interface": "GigabitEthernet1/0/1",\n  "adminStatus": "up",\n  "operStatus": "down"\n}' },
    },
    {
      id: 'ansible-idempotence',
      label: 'Ansible execution',
      question: 'Why is idempotence useful in a network automation playbook?',
      correct: 'The same playbook can be rerun without repeatedly applying unnecessary changes.',
      distractors: ['It disables configuration backups.', 'It prevents the need for authentication.', 'It converts all routers into wireless controllers.'],
      why: 'Idempotent automation checks desired state and changes only what is necessary.',
      takeaway: 'Good automation is repeatable, reviewable, and state-aware.',
      cli: { command: 'ansible-playbook campus.yml --check', output: 'TASK [Ensure NTP servers]\nok: [dist-sw1]\nchanged: [access-sw2]\nPLAY RECAP changed=1 failed=0' },
    },
    {
      id: 'ai-assist',
      label: 'AI-assisted operations',
      question: 'How should an AI assistant be used when reviewing a proposed network change?',
      correct: 'As a helper that summarizes evidence and risks while an engineer validates the final change.',
      distractors: ['As an authority that replaces change control and testing.', 'As a reason to ignore device logs.', 'As a substitute for least-privilege access.'],
      why: 'AI can speed analysis, but network operators still need to validate evidence, scope, rollback, and risk.',
      takeaway: 'AI operations topics should reinforce verification and governance, not blind automation.',
      cli: { command: 'show archive config differences', output: '+interface GigabitEthernet1/0/24\n+ description Camera-Uplink\n+ switchport access vlan 80\n+ spanning-tree portfast' },
    },
  ],
}

const typeLabels = {
  single: 'single-choice',
  mr: 'multiple-response',
  cli: 'cli-output',
  topology: 'topology-scenario',
  config: 'config-repair',
  subnet: 'subnetting-drill',
}

const domainSlugs = Object.fromEntries(domains.map(d => [d.name, slug(d.name)]))

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function site(index) {
  return sites[index % sites.length]
}

function context(index) {
  return `At the ${site(index)} ${rotate(workAreas, index)}, ${rotate(evidenceAngles, index)}`
}

function device(index, domain) {
  if (domain === 'Switching and Network Access') return `SW${(index % 4) + 1}`
  if (domain === 'IP Routing') return `R${(index % 4) + 1}`
  if (domain === 'Network Services and Security') return index % 2 ? 'EDGE1' : 'FW-RTR1'
  if (domain === 'AI, Network Operations, and Management') return index % 2 ? 'CTRL1' : 'NMS1'
  return index % 2 ? 'DIST1' : 'ACCESS1'
}

function rotate(arr, index) {
  return arr[index % arr.length]
}

function orderedChoices(correct, distractors, index) {
  const choices = [correct, ...distractors]
  const target = index % choices.length
  const rotated = [...choices.slice(1), choices[0]]
  while (rotated.indexOf(correct) !== target) {
    rotated.push(rotated.shift())
  }
  return { choices: rotated, correctAnswer: target }
}

function explanation(concept, index, extra = '') {
  return `Why this is right: At the ${site(index)} ${rotate(workAreas, index)}, ${rotate(evidenceAngles, index)}. The evidence supports this: ${concept.why} Why the alternatives are wrong: The distractors either change the wrong layer, ignore the shown evidence, weaken the design goal, or use a feature for a purpose it does not provide. CCNA takeaway: ${concept.takeaway}${extra ? ` ${extra}` : ''}`
}

function base(domain, type, concept, index) {
  return {
    id: `ccna-v2-${domainSlugs[domain]}-${type}-${String(index).padStart(3, '0')}`,
    domain,
    objectiveId: `${domainSlugs[domain]}:${concept.id}`,
    objectiveTitle: concept.label,
    conceptId: concept.id,
  }
}

function single(domain, concept, index) {
  const { choices, correctAnswer } = orderedChoices(concept.correct, concept.distractors, index)
  return {
    ...base(domain, 'single', concept, index),
    type: 'single-choice',
    question: `${context(index)}. A network technician is validating ${concept.label}. ${concept.question}`,
    choices,
    correctAnswer,
    explanation: explanation(concept, index),
  }
}

function multipleResponse(domain, concept, nextConcept, index) {
  const choices = [
    concept.correct,
    concept.distractors[0],
    nextConcept.correct,
    nextConcept.distractors[1],
    concept.distractors[2],
  ]
  return {
    ...base(domain, 'mr', concept, index),
    type: 'multiple-response',
    question: `${context(index)}. The team is reviewing ${domain.toLowerCase()} evidence. Which two statements are valid for ${concept.label} and ${nextConcept.label}? (Select two.)`,
    choices,
    correctAnswers: [0, 2],
    explanation: `Why this is right: At the ${site(index)} ${rotate(workAreas, index)}, ${rotate(evidenceAngles, index)}. The evidence supports this: ${concept.why} ${nextConcept.why} Why the alternatives are wrong: The other options apply unrelated features or skip the evidence that identifies the affected layer. CCNA takeaway: Compare each option to the shown technology and reject answers that solve a different problem.`,
  }
}

function cli(domain, concept, index) {
  const { choices, correctAnswer } = orderedChoices(concept.correct, concept.distractors, index)
  return {
    ...base(domain, 'cli', concept, index),
    type: 'cli-output',
    practicalCategory: cliCategory(domain),
    prompt: 'Interpret the command output before choosing the fix.',
    commands: [
      {
        device: device(index, domain),
        command: concept.cli.command,
        output: concept.cli.output,
      },
      {
        device: device(index + 1, domain),
        command: supportingCommand(domain, concept, index).command,
        output: supportingCommand(domain, concept, index).output,
      },
    ],
    question: `${context(index)}. Which conclusion best fits the command output for ${concept.label}?`,
    choices,
    correctAnswer,
    explanation: explanation(concept, index, 'The command output is the primary evidence; avoid changing unrelated features until the observed state is explained.'),
  }
}

function topology(domain, concept, index) {
  const { choices, correctAnswer } = orderedChoices(concept.correct, concept.distractors, index)
  const vlanA = 10 + (index % 5) * 10
  const vlanB = vlanA + 10
  return {
    ...base(domain, 'topology', concept, index),
    type: 'topology-scenario',
    practicalCategory: topologyCategory(domain),
    prompt: `Review the topology and evidence for ${concept.label}.`,
    topology: {
      label: `${concept.label} topology`,
      width: 680,
      height: 320,
      nodes: [
        { id: 'R1', label: 'R1', kind: 'router', x: 110, y: 160 },
        { id: 'SW1', label: 'SW1', kind: 'switch', x: 300, y: 160 },
        { id: 'SW2', label: 'SW2', kind: 'switch', x: 470, y: 160 },
        { id: 'PC1', label: 'PC1', kind: 'host', x: 610, y: 95 },
        { id: 'PC2', label: 'PC2', kind: 'host', x: 610, y: 235 },
      ],
      links: [
        { from: 'R1', to: 'SW1', label: domain === 'IP Routing' ? 'routed link' : '802.1Q' },
        { from: 'SW1', to: 'SW2', label: domain === 'Switching and Network Access' ? `trunk VLAN ${vlanA}` : 'uplink' },
        { from: 'SW2', to: 'PC1', label: `VLAN ${vlanA}` },
        { from: 'SW2', to: 'PC2', label: `VLAN ${vlanB}` },
      ],
    },
    tables: topologyTables(domain, concept, index, vlanA, vlanB),
    question: `${context(index)}. Based on the topology, what is the best next action for ${concept.label}?`,
    choices,
    correctAnswer,
    explanation: explanation(concept, index, 'Topology items require tying the symptom to the affected link, VLAN, route, service, or control plane before choosing a fix.'),
  }
}

function configRepair(domain, concept, index) {
  const { choices, correctAnswer } = orderedChoices(concept.correct, concept.distractors, index)
  return {
    ...base(domain, 'config', concept, index),
    type: 'config-repair',
    practicalCategory: configCategory(domain),
    scenario: `The ${site(index)} has a configuration related to ${concept.label}. Review the excerpt and choose the least risky correction.`,
    device: device(index, domain),
    configTitle: 'Running configuration excerpt',
    config: configFor(domain, concept, index),
    notes: notesFor(domain, concept, index),
    question: `${context(index)}. Which change best repairs or validates ${concept.label}?`,
    choices,
    correctAnswer,
    explanation: explanation(concept, index, 'Configuration repair should make the smallest targeted change that matches the symptom and evidence.'),
  }
}

function subnet(domain, concept, index) {
  const prefix = [25, 26, 27, 28, 29, 30][index % 6]
  const third = 10 + (index % 40)
  const block = 2 ** (32 - prefix)
  const subnetStart = Math.floor(((index * 7) % 250) / block) * block
  const network = `192.168.${third}.${subnetStart}`
  const broadcast = `192.168.${third}.${subnetStart + block - 1}`
  const firstUsable = `192.168.${third}.${subnetStart + 1}`
  const lastUsable = `192.168.${third}.${subnetStart + block - 2}`
  const hostCount = Math.max(0, block - 2)
  return {
    ...base(domain, 'subnet', concept, index),
    type: 'subnetting-drill',
    practicalCategory: 'subnetting',
    given: `${network}/${prefix}`,
    asks: ['network', 'broadcast', 'firstUsable', 'lastUsable', 'hostCount', 'mask', 'wildcard'],
    correct: {
      network,
      broadcast,
      firstUsable,
      lastUsable,
      hostCount,
      mask: maskFor(prefix),
      wildcard: wildcardFor(prefix),
    },
    question: `${context(index)}. Calculate the subnet values needed to validate ${concept.label}.`,
    explanation: `Why this is right: At the ${site(index)} ${rotate(workAreas, index)}, ${rotate(evidenceAngles, index)}, and a /${prefix} has a block size of ${block} in the final octet, so this subnet spans ${network} through ${broadcast}. Why the alternatives are wrong: Off-by-one host ranges, wrong masks, or wildcard values from a different prefix would break ACLs, routing, or host assignment. CCNA takeaway: Subnetting drills should verify the exact network, broadcast, usable range, mask, wildcard, and host count before applying an addressing or ACL change.`,
  }
}

function supportingCommand(domain, concept, index) {
  if (domain === 'Switching and Network Access') {
    return { command: 'show vlan brief', output: `VLAN Name                             Status    Ports\n10   USERS                            active    Gi1/0/10, Gi1/0/11\n20   VOICE                            active    Gi1/0/12\n30   GUEST                            active    Gi1/0/13` }
  }
  if (domain === 'IP Routing') {
    return { command: 'show ip route | begin Gateway', output: 'Gateway of last resort is not set\n\nO    10.10.20.0/24 [110/20] via 10.0.12.2, 00:00:12, Gi0/0' }
  }
  if (domain === 'Network Services and Security') {
    return { command: 'show access-lists', output: 'Extended IP access list WEB-IN\n10 permit tcp any host 10.10.50.20 eq 443\n20 deny ip any any log' }
  }
  if (domain === 'AI, Network Operations, and Management') {
    return { command: 'show clock detail', output: '15:22:10.331 EDT Tue Jun 16 2026\nTime source is NTP' }
  }
  return { command: 'show interfaces status', output: 'Port      Name        Status       Vlan  Duplex Speed Type\nGi1/0/12  user-drop   connected    30    full   1000  10/100/1000BaseTX' }
}

function topologyTables(domain, concept, index, vlanA, vlanB) {
  if (domain === 'Switching and Network Access') {
    return [{ title: 'Switchport Summary', columns: ['Interface', 'Mode', 'Access VLAN', 'Allowed VLANs'], rows: [['Gi1/0/48', 'trunk', '-', `${vlanA}`], ['Gi1/0/10', 'access', `${vlanA}`, '-'], ['Gi1/0/12', 'access', `${vlanB}`, '-']] }]
  }
  if (domain === 'IP Routing') {
    return [{ title: 'Routing Evidence', columns: ['Device', 'Route or Neighbor', 'State'], rows: [['R1', concept.label, 'Needs validation'], ['R2', 'OSPF adjacency', index % 2 ? 'FULL' : 'DOWN'], ['R1', 'Default route', index % 3 ? 'Present' : 'Missing']] }]
  }
  if (domain === 'Network Services and Security') {
    return [{ title: 'Service and Security Evidence', columns: ['Feature', 'Observed state', 'Impact'], rows: [['DHCP/NAT/ACL', concept.label, 'Traffic affected'], ['Trusted uplink', 'Gi1/0/48', 'Infrastructure'], ['Client port', 'Gi1/0/12', 'Untrusted edge']] }]
  }
  if (domain === 'AI, Network Operations, and Management') {
    return [{ title: 'Operations Evidence', columns: ['System', 'Signal', 'Meaning'], rows: [['NMS', concept.label, 'Needs operator review'], ['Controller', 'API reachable', 'Automation possible'], ['Device logs', 'Recent event', 'Correlate before change']] }]
  }
  return [{ title: 'Infrastructure Evidence', columns: ['Item', 'Observed value', 'Concern'], rows: [['Host', `192.168.${index % 40}.55/24`, 'Validate gateway'], ['Uplink', '10G SR optic', 'Short MMF span'], ['Wireless cell', 'Retry rate high', 'Check RF']] }]
}

function configFor(domain, concept, index) {
  if (domain === 'Switching and Network Access') {
    return ['interface GigabitEthernet1/0/12', ' description User drop', ' switchport mode access', ' switchport access vlan 30', ' spanning-tree portfast', 'interface GigabitEthernet1/0/48', ' switchport mode trunk', ' switchport trunk allowed vlan 10,20']
  }
  if (domain === 'IP Routing') {
    return ['router ospf 10', ' router-id 1.1.1.1', ' network 10.0.12.0 0.0.0.3 area 0', ' passive-interface default', ' no passive-interface GigabitEthernet0/0', 'ip route 0.0.0.0 0.0.0.0 203.0.113.1']
  }
  if (domain === 'Network Services and Security') {
    return ['interface GigabitEthernet0/0', ' ip address 10.40.0.1 255.255.255.0', ' ip nat inside', 'interface GigabitEthernet0/1', ' ip address 203.0.113.2 255.255.255.252', 'access-list 1 permit 10.40.0.0 0.0.0.255', 'ip nat inside source list 1 interface GigabitEthernet0/1 overload']
  }
  if (domain === 'AI, Network Operations, and Management') {
    return ['logging host 10.10.10.50', 'snmp-server community MONITOR RO', 'ntp server 10.10.10.20', 'restconf', 'ip http secure-server', 'username automation privilege 15 secret 9 $9$example']
  }
  return ['interface GigabitEthernet1/0/24', ' description Clinic uplink', ' switchport mode trunk', ' switchport trunk allowed vlan 10,20', 'interface Vlan20', ' ip address 192.168.20.1 255.255.255.0', ' no shutdown']
}

function notesFor(domain, concept, index) {
  return [
    `Site: ${site(index)}`,
    `Focus: ${concept.label}`,
    `Validate the evidence before changing unrelated ${domain.toLowerCase()} settings.`,
  ]
}

function maskFor(prefix) {
  const mask = (0xffffffff << (32 - prefix)) >>> 0
  return [24, 16, 8, 0].map(shift => (mask >>> shift) & 255).join('.')
}

function wildcardFor(prefix) {
  return maskFor(prefix).split('.').map(octet => 255 - Number(octet)).join('.')
}

function cliCategory(domain) {
  if (domain === 'Switching and Network Access') return 'switching-cli'
  if (domain === 'IP Routing') return 'routing-cli'
  if (domain === 'Network Services and Security') return 'services-security-cli'
  if (domain === 'AI, Network Operations, and Management') return 'operations-cli'
  return 'infrastructure-cli'
}

function topologyCategory(domain) {
  if (domain === 'Switching and Network Access') return 'switching-topology'
  if (domain === 'IP Routing') return 'routing-topology'
  if (domain === 'Network Services and Security') return 'services-security-topology'
  if (domain === 'AI, Network Operations, and Management') return 'operations-topology'
  return 'infrastructure-topology'
}

function configCategory(domain) {
  if (domain === 'Switching and Network Access') return 'switching-config'
  if (domain === 'IP Routing') return 'routing-config'
  if (domain === 'Network Services and Security') return 'services-security-config'
  if (domain === 'AI, Network Operations, and Management') return 'operations-config'
  return 'infrastructure-config'
}

function buildQuestions() {
  const questions = []
  let globalIndex = 1

  for (const domain of domains) {
    const domainConcepts = concepts[domain.name]
    for (const [type, count] of Object.entries(domain.types)) {
      for (let i = 0; i < count; i += 1) {
        const concept = rotate(domainConcepts, i)
        const nextConcept = rotate(domainConcepts, i + 1)
        const builders = { single, mr: multipleResponse, cli, topology, config: configRepair, subnet }
        const question = type === 'mr'
          ? builders[type](domain.name, concept, nextConcept, globalIndex)
          : builders[type](domain.name, concept, globalIndex)
        questions.push(question)
        globalIndex += 1
      }
    }
  }

  return questions
}

const questions = buildQuestions()
fs.writeFileSync(OUT, `${JSON.stringify(questions, null, 2)}\n`)
console.log(`Wrote ${questions.length} questions to ${OUT}`)
console.log(Object.entries(questions.reduce((acc, q) => {
  acc[q.type || 'single-choice'] = (acc[q.type || 'single-choice'] || 0) + 1
  return acc
}, {})).map(([type, count]) => `${type}:${count}`).join(' '))
