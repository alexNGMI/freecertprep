import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const questionPath = path.join(root, 'src/data/comptia-net-plus-questions.json')

const enrichment = {
  'netplus-pbq-001': {
    category: 'wireless-survey',
    task: 'Correlate RF health, authentication, and wired-uplink evidence to choose the most direct corrective action for each affected wireless service.',
    artifacts: [
      {
        type: 'table',
        title: 'Wireless survey snapshot',
        columns: ['Area', 'Band / channel', 'RSSI', 'SNR', 'Retry rate'],
        rows: [
          ['Warehouse', '2.4 GHz / 6', '-67 dBm', '13 dB', '38%'],
          ['Contractor lobby', '5 GHz / 44', '-51 dBm', '31 dB', '4%'],
          ['Conference room', '5 GHz / 149', '-48 dBm', '35 dB', '3%'],
        ],
      },
      {
        type: 'console',
        title: 'Controller and switch evidence',
        lines: [
          'AP-01 radio 2.4 GHz: high channel utilization | retries 38%',
          'AP-02 Contractor SSID: RADIUS Access-Reject | EAP-TLS trust failure',
          'SW-BR1 Gi1/0/18: up | 100/full | PoE+ 18.2 W | input errors 0',
        ],
      },
    ],
  },
  'netplus-pbq-002': {
    category: 'multi-artifact-troubleshooting',
    task: 'Use interface counters, utilization timing, and clock evidence to select a focused validation step for each post-change monitoring alert.',
    artifacts: [
      {
        type: 'console',
        title: 'Monitoring alerts',
        lines: [
          'CORE-1 Te1/1: CRC errors +284 after fiber move',
          'WAN-1 utilization: 96% from 01:00-02:00 during replication',
          'SW-14 clock offset: +247 seconds from NTP-1',
        ],
      },
      {
        type: 'table',
        title: 'Change record',
        columns: ['Asset', 'Approved work', 'Baseline before change'],
        rows: [
          ['CORE-1 Te1/1', 'Move LC patch to new panel', '0 CRC errors'],
          ['WAN-1', 'No circuit change', '42% peak utilization'],
          ['SW-14', 'Firmware update', 'NTP synchronized'],
        ],
      },
    ],
  },
  'netplus-pbq-003': {
    category: 'cable-mapping',
    task: 'Map each endpoint symptom to the switchport or uplink correction supported by the VLAN, voice, and multi-SSID port evidence.',
    artifacts: [
      {
        type: 'table',
        title: 'Endpoint-to-port map',
        columns: ['Endpoint', 'Switchport', 'Expected service', 'Observed address'],
        rows: [
          ['HR-PC', 'Gi1/0/12', 'Data VLAN 20', '10.30.10.84/24'],
          ['Phone + PC', 'Gi1/0/18', 'Voice 30 / Data 20', 'Phone online; PC no lease'],
          ['AP-03', 'Gi1/0/22', 'SSIDs on VLANs 40, 50, 60', 'Management VLAN 40 only'],
        ],
      },
      {
        type: 'console',
        title: 'Switchport summary',
        lines: [
          'Gi1/0/12  mode access | access vlan 10',
          'Gi1/0/18  mode access | voice vlan 30 | access vlan 999',
          'Gi1/0/22  mode access | access vlan 40',
        ],
      },
    ],
    objectiveId: '5.3',
    objectiveTitle: 'Troubleshoot network services',
    conceptId: 'comptia-net-plus-5.3-vlan-service-failures',
  },
  'netplus-pbq-004': {
    category: 'multi-artifact-troubleshooting',
    task: 'Translate each approved service requirement into the narrowest firewall rule that permits the required traffic without unnecessary exposure.',
    artifacts: [
      {
        type: 'table',
        title: 'Approved flows',
        columns: ['Service', 'Source', 'Destination', 'Requirement'],
        rows: [
          ['Customer portal', 'Internet', '203.0.113.25', 'HTTPS only'],
          ['Device administration', '10.10.99.0/24', 'Network devices', 'SSH only'],
          ['Name resolution', 'Client VLANs', '10.10.20.53', 'Recursive DNS'],
        ],
      },
      {
        type: 'checklist',
        title: 'Policy constraints',
        items: [
          'Inbound services use default deny after approved rules.',
          'Administrative access must be source restricted.',
          'Clients may query only the approved internal resolver.',
        ],
      },
    ],
  },
  'netplus-pbq-005': {
    category: 'routing-analysis',
    task: 'Inspect each host address, prefix, and gateway state to identify the addressing correction that restores local or routed connectivity.',
    artifacts: [
      {
        type: 'console',
        title: 'Host configuration',
        lines: [
          'HOST-A IPv4 192.168.10.25/24 | gateway 192.168.11.1',
          'HOST-B IPv4 169.254.44.8/16 | gateway none | DHCP enabled',
          'HOST-C IPv4 10.40.8.22/24 | duplicate address detected',
        ],
      },
      {
        type: 'table',
        title: 'Network services',
        columns: ['Segment', 'Expected subnet', 'Gateway', 'DHCP scope'],
        rows: [
          ['User A', '192.168.10.0/24', '192.168.10.1', 'Active'],
          ['User B', '172.20.44.0/24', '172.20.44.1', 'Active'],
          ['User C', '10.40.8.0/24', '10.40.8.1', 'Active'],
        ],
      },
    ],
  },
  'netplus-pbq-006': {
    category: 'cable-mapping',
    task: 'Use wire-map, certification, and optical-loss measurements to choose the least invasive repair for each failed permanent link.',
    artifacts: [
      {
        type: 'table',
        title: 'Cable tester results',
        columns: ['Run', 'Media', 'Length', 'Wire map / loss', 'Certification result'],
        rows: [
          ['A-17', 'Cat 6 UTP', '62 m', 'Pins 1-2 open at 61.8 m', 'Fail'],
          ['B-04', 'Cat 6A UTP', '88 m', 'Map pass; NEXT 2.1 dB below limit', 'Fail'],
          ['F-09', 'OM4 fiber', '74 m', '3.8 dB insertion loss', 'Fail'],
        ],
      },
      {
        type: 'checklist',
        title: 'Installation observations',
        items: [
          'A-17 terminates at a recently replaced patch panel.',
          'B-04 has 38 mm of pair untwist at the work-area jack.',
          'F-09 connectors were patched without inspection or cleaning.',
        ],
      },
    ],
    objectiveId: '2.4',
    objectiveTitle: 'Apply physical installation factors',
    conceptId: 'comptia-net-plus-2.4-cable-certification',
  },
  'netplus-pbq-007': {
    category: 'multi-artifact-troubleshooting',
    task: 'Connect each baseline deviation to the operational response that best protects capacity, service quality, or change accountability.',
    artifacts: [
      {
        type: 'table',
        title: 'Thirty-day baseline comparison',
        columns: ['Signal', 'Baseline', 'Current', 'Time pattern'],
        rows: [
          ['WAN utilization', '48% peak', '91% peak', 'Daily 09:00-11:00'],
          ['Voice packet loss', '<0.2%', '3.4%', 'Business hours'],
          ['Core config hash', 'Approved v42', 'Unknown v43', 'Changed 02:14'],
        ],
      },
      {
        type: 'console',
        title: 'Event correlation',
        lines: [
          '09:07 WAN queue drops begin as utilization exceeds 88%',
          '09:08 RTP quality alert: loss 3.4% | jitter 41 ms',
          '02:14 CONFIG_CHANGE user=local-admin ticket=none',
        ],
      },
    ],
  },
  'netplus-pbq-008': {
    category: 'wireless-survey',
    task: 'Use AP placement, channel reuse, signal overlap, and roaming timing to select the corrective wireless design check for each area.',
    artifacts: [
      {
        type: 'table',
        title: 'Post-change wireless survey',
        columns: ['Area', 'Serving AP', 'RSSI', 'Neighbor AP', 'Channel / overlap'],
        rows: [
          ['Area A', 'AP-1 at -76 dBm', '-76 dBm', 'AP-2 at -54 dBm', '5 GHz / adequate'],
          ['Area B', 'AP-3 at -67 dBm', '-67 dBm', 'AP-4 at -65 dBm', '5 GHz / 8%'],
          ['Area C', 'AP-5', '-49 dBm', 'AP-6 and AP-7', '2.4 GHz / all channel 6'],
        ],
      },
      {
        type: 'console',
        title: 'Roaming telemetry',
        lines: [
          'AREA-A client remained on AP-1 for 94 seconds after AP-2 became stronger',
          'AREA-B reassociation 82 ms | 802.1X authentication 1180 ms | voice gap 1.4 s',
          'AREA-C channel utilization 87% | co-channel contenders 3',
        ],
      },
    ],
  },
  'netplus-pbq-009': {
    category: 'multi-artifact-troubleshooting',
    task: 'Match each remote-access use case to a control set that limits scope, verifies identity and device state, and preserves auditability.',
    artifacts: [
      {
        type: 'table',
        title: 'Access requirements',
        columns: ['Identity', 'Managed device', 'Needed resource', 'Duration'],
        rows: [
          ['Vendor', 'No', 'One maintenance portal', '14 days'],
          ['Employee', 'Yes', 'Several internal applications', 'Ongoing'],
          ['Administrator', 'Yes', 'Privileged network console', 'Emergency only'],
        ],
      },
      {
        type: 'checklist',
        title: 'Security requirements',
        items: [
          'MFA is mandatory for every remote-access method.',
          'Third parties receive only application-level access.',
          'Privileged sessions require approval, recording, and automatic expiration.',
        ],
      },
    ],
  },
  'netplus-pbq-010': {
    category: 'routing-analysis',
    task: 'Read the route and neighbor evidence for each branch, then select the smallest routing correction that restores the intended path.',
    artifacts: [
      {
        type: 'table',
        title: 'Routing table excerpts',
        columns: ['Branch', 'Destination', 'Next hop / state', 'Interface'],
        rows: [
          ['A', '0.0.0.0/0', 'No route', '-'],
          ['B', '10.80.0.0/16', '192.0.2.5 (retired)', 'WAN0'],
          ['C', 'OSPF neighbor 192.0.2.14', 'INIT', 'WAN1'],
        ],
      },
      {
        type: 'console',
        title: 'Reachability and adjacency checks',
        lines: [
          'BR-A ping 198.51.100.1: success | internet destinations: unreachable',
          'BR-B ping 192.0.2.5: timeout | new peer 192.0.2.9: success',
          'BR-C received hello from 192.0.2.14 | local neighbor list: INIT',
        ],
      },
    ],
  },
}

const categoryGuidance = {
  'cable-mapping': 'The correct action follows the endpoint-to-port, wire-map, certification, or optical-loss evidence and repairs the failing physical path without changing unrelated network services.',
  'routing-analysis': 'The correct action follows the address, prefix, gateway, route, next-hop, and adjacency evidence and changes only the routing or addressing element that breaks the intended path.',
  'wireless-survey': 'The correct action distinguishes RF coverage and contention from authentication and wired-uplink faults by using measured signal, noise, retry, channel, and roaming evidence.',
  'multi-artifact-troubleshooting': 'The correct action correlates the supplied configuration, baseline, event, and policy evidence instead of treating one isolated symptom as sufficient proof.',
}

const questions = JSON.parse(fs.readFileSync(questionPath, 'utf8'))

for (const question of questions) {
  const update = enrichment[question.id]
  if (!update) continue

  question.practicalCategory = update.category
  question.pbq = {
    ...question.pbq,
    category: update.category,
    task: update.task,
    artifacts: update.artifacts,
  }
  question.componentFeedback = question.itemsLeft.map((leftItem, index) => ({
    label: leftItem,
    action: question.itemsRight[question.correctMatches[index]],
    why: categoryGuidance[update.category],
  }))

  for (const field of ['objectiveId', 'objectiveTitle', 'conceptId']) {
    if (update[field]) question[field] = update[field]
  }

  if (question.explanation.length < 180) {
    question.explanation = `${question.explanation} ${categoryGuidance[update.category]}`
  }
}

fs.writeFileSync(questionPath, `${JSON.stringify(questions, null, 2)}\n`)
console.log(`Enriched ${Object.keys(enrichment).length} Network+ practical scenarios.`)
