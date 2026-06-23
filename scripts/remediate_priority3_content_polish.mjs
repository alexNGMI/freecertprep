import fs from 'node:fs'

const read = (path) => JSON.parse(fs.readFileSync(path, 'utf8'))
const write = (path, data) => fs.writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`)
const byId = (questions) => new Map(questions.map((question) => [question.id, question]))

const secPath = 'src/data/comptia-sec-plus-questions.json'
const netPath = 'src/data/comptia-net-plus-questions.json'
const saaPath = 'src/data/aws-saa-c03-questions.json'

const sec = read(secPath)
const net = read(netPath)
const saa = read(saaPath)

const secById = byId(sec)
const setEvidence = (id, artifacts) => {
  const question = secById.get(id)
  if (!question) throw new Error(`Missing Security+ question ${id}`)
  question.evidenceArtifacts = artifacts
}

setEvidence('secplus-91', [
  {
    type: 'table',
    title: 'Threat intelligence correlation',
    columns: ['Signal', 'Observed evidence'],
    rows: [
      ['Actor profile', 'ORCHID JACKAL is assessed as state-sponsored'],
      ['Objective', 'Long-term intelligence collection'],
      ['Endpoint chain', 'Signed-driver abuse, credential memory access, persistence'],
      ['Network indicator', 'Outbound TLS session to known infrastructure'],
    ],
  },
])
setEvidence('secplus-94', [
  {
    type: 'table',
    title: 'Insider-risk evidence',
    columns: ['Source', 'Finding'],
    rows: [
      ['DLP', '6.9 GB moved to USB and personal storage after hours'],
      ['HR', 'Employee submitted notice the same afternoon'],
      ['Baseline', 'Normal transfers were small and to approved shares'],
      ['Risk read', 'Volume, destination, timing, and departure context align'],
    ],
  },
])
setEvidence('secplus-96', [
  {
    type: 'table',
    title: 'CASB discovery snapshot',
    columns: ['Control', 'State'],
    rows: [
      ['Managed SSO', 'Not integrated'],
      ['DLP policy', 'No policy attached'],
      ['Vendor review', 'No security review found'],
      ['Finance uploads', '91 GB in 30 days'],
    ],
  },
])
setEvidence('secplus-391', [
  {
    type: 'console',
    title: 'EDR containment context',
    lines: [
      'alert_id=8821 host=ACCT-17 severity=high',
      'parent=WINWORD.EXE child=powershell.exe args="-enc SQBFAFgA..."',
      'rundll32.exe C:\\Users\\Public\\stage.dll,Start',
      'network=198.51.100.51:443 action=allowed',
      'recommended_response=isolate_host preserve_artifacts=true',
    ],
  },
])
setEvidence('secplus-393', [
  {
    type: 'table',
    title: 'Host vs network visibility',
    columns: ['Sensor', 'Evidence'],
    rows: [
      ['HIDS', '/usr/bin/ssh hash changed by root pid 1844'],
      ['NIDS', 'No matching network flows for DB01'],
      ['Likely scope', 'Local file integrity event'],
      ['Investigation cue', 'Host telemetry can see activity no packet sensor observes'],
    ],
  },
])
setEvidence('secplus-395', [
  {
    type: 'table',
    title: 'SIEM correlation evidence',
    columns: ['Source', 'Event'],
    rows: [
      ['VPN', 'Successful session from expected country'],
      ['IdP', 'MFA reset by temporary helpdesk account'],
      ['Cloud IAM', 'CloudAdmin role assigned to user'],
      ['Storage', '48 GB export started shortly after privilege change'],
    ],
  },
])
setEvidence('secplus-396', [
  {
    type: 'table',
    title: 'Retention policy gap',
    columns: ['Log source', 'Current state'],
    rows: [
      ['Identity logs', '30 days hot retention'],
      ['Proxy logs', '30 days hot retention'],
      ['Detection window', 'Commonly 60 to 90 days'],
      ['Evidence risk', 'Initial access logs expire before discovery'],
    ],
  },
])
setEvidence('secplus-397', [
  {
    type: 'console',
    title: 'Flow record excerpt',
    lines: [
      'src=10.20.8.44 dst=198.51.100.90 proto=tcp',
      'sport=51544 dport=443 bytes=2147483648 packets=1519023',
      'payload_captured=false',
      'investigation_use=volume_and_endpoint_pattern',
    ],
  },
])
setEvidence('secplus-399', [
  {
    type: 'table',
    title: 'IPS rule requirement',
    columns: ['Setting', 'Required behavior'],
    rows: [
      ['Deployment', 'Inline sensor can block traffic'],
      ['Detection', 'Horizontal port scan threshold reached'],
      ['Containment', 'Block source for 60 minutes'],
      ['Forensics', 'Retain alert and log record'],
    ],
  },
])

for (const id of ['secplus-pbq-005', 'secplus-pbq-006', 'secplus-pbq-009']) {
  const question = secById.get(id)
  if (!question?.pbq) continue
  question.pbq.title = question.pbq.title.replace('ticket', 'review')
  question.pbq.scenario = question.pbq.scenario.replace('ticket', 'review')
}

const netById = byId(net)
const netExplanations = {
  'netplus-83': 'The configured default gateway is outside the host subnet, so the workstation cannot ARP for its next hop. First compare the host IP, mask, and gateway: a gateway must be reachable on the local Layer 2 segment. Changing DNS, routing protocols, or remote ACLs would not fix a host whose own next hop is invalid.',
  'netplus-84': 'The output points to a duplex mismatch: one side is operating full duplex while the other negotiated half duplex. That produces late collisions, FCS errors, and poor throughput even when the link is physically up. The repair is to set both ends consistently, preferably with supported autonegotiation or matching fixed speed and duplex.',
  'netplus-131': 'Runts are Ethernet frames shorter than the minimum valid frame size. In troubleshooting, rising runt counters usually push you toward duplex mismatch, collisions, bad NICs, or cabling faults rather than Layer 3 routing. Check interface errors on both sides and verify speed/duplex before chasing DNS or application causes.',
  'netplus-338': 'Late collisions after the first 64 bytes are most consistent with a duplex mismatch or an old shared-media condition, not normal switched full-duplex behavior. With good cabling assumed, compare negotiated speed and duplex on the workstation and switch port, then correct the mismatch and clear counters before retesting.',
  'netplus-388': 'Good RSSI only means the client hears the AP strongly; it does not prove a clean RF environment. High loss and retransmissions with adequate signal point to low SNR, interference, or channel contention. A spectrum or Wi-Fi analyzer should confirm noise, utilization, and co-channel overlap before changing IP settings.',
  'netplus-390': 'A high runt count means the switch is receiving undersized Ethernet frames. Treat that as a Layer 1 or Layer 2 error-counter clue: look for collisions, duplex mismatch, faulty NICs, or bad cabling. It is not a DNS, DHCP, or routing symptom because the frame is malformed before upper-layer processing matters.',
  'netplus-397': 'For intermittent wireless drops, first collect enough timing and RF evidence to avoid guessing. Confirm the client and AP state, review logs around the failure window, check RSSI/SNR/channel utilization, then adjust channel or power only after the evidence points to interference, roaming, or capacity.',
  'netplus-543': 'A duplicate IP address creates ARP instability because two devices claim the same Layer 3 address with different MAC addresses. The practical clue is intermittent reachability or rapidly changing ARP entries. Remove or correct the conflicting assignment, then clear stale ARP/DHCP state and verify stable ownership.',
  'netplus-547': 'Association troubleshooting should move from simple client/AP availability toward authentication and RF causes. Confirm the adapter is enabled, the SSID is visible, the AP is healthy, and credentials/security settings match before escalating to RADIUS, roaming, channel interference, or controller policy.',
  'netplus-551': 'Strong signal does not guarantee throughput when the channel is busy or overlapping APs create contention. Replanning channels and transmit power reduces co-channel and adjacent-channel interference; moving capable clients to 5 GHz or 6 GHz can also reduce congestion. DHCP or DNS changes would not address RF airtime loss.',
  'netplus-552': 'Because local applications remain responsive and repeated tests show the slowdown beyond the provider handoff, the next useful action is evidence-based escalation. Preserve traceroute/path, latency, packet-loss, and timestamp data. Randomly changing LAN switches or DNS without provider-path evidence risks creating a second problem.',
  'netplus-20': 'The successful ping proves only basic IP reachability and round-trip timing for small ICMP packets during the sample. It does not prove that DNS, TCP ports, MTU, authentication, or application services are healthy. Use it as an early signal, then test the specific layer matching the reported symptom.',
  'netplus-21': 'The trace reaches the local gateway and internal transit path before responses stop at the WAN side, so the first useful check is the edge path, upstream route, or filtering near that handoff. Do not start by replacing access cabling when multiple routed hops already responded.',
  'netplus-82': 'A single traceroute hop showing asterisks does not automatically mean traffic is blocked there. If later hops answer, the router probably forwarded traffic but did not send ICMP Time Exceeded replies. Interpret traceroute by the full path, not one silent hop in isolation.',
  'netplus-87': 'A 169.254.0.0/16 APIPA address means the host failed to obtain a DHCP lease and self-assigned a link-local IPv4 address. Troubleshoot DHCP reachability: client VLAN, DHCP relay/helper, server scope availability, and access-layer connectivity. Static DNS changes will not restore a missing lease.',
  'netplus-136': 'Strong RSSI with very slow throughput points away from distance and toward airtime contention, co-channel interference, or low SNR. Confirm with channel utilization and retransmission data. The fix is channel/power planning or band steering, not increasing transmit power blindly.',
  'netplus-176': 'When DNS resolution works but HTTP/HTTPS does not, narrow the test to the application path: TCP 80/443 reachability, proxy settings, host firewall, and upstream filtering. ICMP success alone cannot prove web access, and replacing cabling is unlikely if other services on the same host still work.',
  'netplus-180': 'One-way VoIP audio usually means signaling succeeded but the RTP media path is asymmetric, blocked, or translated incorrectly. Check NAT, firewall rules, voice VLAN routing, and SIP/RTP helpers if used. Rebooting phones may hide the symptom briefly without fixing the return media path.',
  'netplus-221': 'OSPF EXSTART is where neighbors negotiate database description exchange. An MTU mismatch is a classic reason they fail to progress because DBD packets cannot be exchanged as expected. Compare interface MTU, adjacency parameters, and logs before changing unrelated route metrics.',
  'netplus-250': 'Wireless DHCP failures after association often come from VLAN mapping, trunk tagging, DHCP relay, or isolation policy rather than RF signal. Roaming issues involve handoff behavior between APs, while captive portals can block user traffic until authorization. Separate association, addressing, authentication, and forwarding before choosing a fix.',
}
for (const [id, explanation] of Object.entries(netExplanations)) {
  const question = netById.get(id)
  if (!question) throw new Error(`Missing Network+ question ${id}`)
  question.explanation = explanation
}

const saaById = byId(saa)
const saaStemUpdates = {
  'saa-c03-design-cost-optimized-architectures-101': 'A fintech platform tags every workload by product team, but monthly spend still appears as one blended bill. Which approach gives owners actionable cost visibility and right-sizing recommendations without weakening production controls?',
  'saa-c03-design-cost-optimized-architectures-102': 'A travel-booking API has a steady baseline every day and unpredictable promotional spikes twice a month. Which purchasing model should cover the known baseline while leaving burst traffic flexible?',
  'saa-c03-design-cost-optimized-architectures-103': 'A private analytics subnet downloads large objects from S3 through a NAT gateway during nightly jobs. The architect must reduce NAT data-processing charges without making the subnet public. What should be recommended?',
  'saa-c03-design-cost-optimized-architectures-104': 'A research data lake stores daily experiment output in S3 and analysts query only recent partitions. Athena costs are climbing because every query scans the full raw dataset. What storage layout change best reduces query cost?',
  'saa-c03-design-cost-optimized-architectures-105': 'A genomics batch pipeline can checkpoint work and tolerate interruption. The team wants lower EC2 cost while keeping enough capacity across Availability Zones. Which compute strategy fits best?',
  'saa-c03-design-cost-optimized-architectures-106': 'A game studio keeps compliance archives for seven years, with most retrievals expected only during audits. Which two recommendations reduce storage cost while preserving retrieval requirements?',
  'saa-c03-design-cost-optimized-architectures-107': 'An insurance reporting database is quiet most of the month but scales during quarterly close. The team currently provisions for peak all month. What database capacity approach should the architect choose?',
  'saa-c03-design-cost-optimized-architectures-108': 'A public web application serves the same images, CSS, and JavaScript globally. Origin load and data-transfer cost rise during every launch. What should the architect do first?',
  'saa-c03-design-cost-optimized-architectures-109': 'A central cloud team needs to show each application owner where idle EC2, EBS, and load-balancer spend is occurring. Which AWS cost-management approach is most appropriate?',
  'saa-c03-design-cost-optimized-architectures-110': 'A streaming service runs a minimum number of encoding workers all day and adds more workers for live events. Which option discounts the predictable portion while preserving elasticity?',
  'saa-c03-design-cost-optimized-architectures-111': 'A regulated workload in private subnets sends frequent requests to S3 and DynamoDB. Which two design choices reduce NAT traversal while keeping service access private?',
  'saa-c03-design-cost-optimized-architectures-112': 'A public-sector analytics team stores CSV logs in one S3 prefix and runs Athena reports by date and region. Queries scan too much data. What change should be made?',
  'saa-c03-design-cost-optimized-architectures-113': 'A SaaS vendor processes asynchronous image conversions. Jobs are idempotent and can resume from S3 checkpoints if an instance disappears. Which compute choice reduces cost?',
  'saa-c03-design-cost-optimized-architectures-114': 'A gaming company must retain old match telemetry for possible disputes, but most records are rarely read after 90 days. What storage lifecycle design best controls cost?',
  'saa-c03-design-cost-optimized-architectures-115': 'A logistics application has an RDS workload with large swings between business hours and overnight idle periods. Which recommendation avoids paying for fixed peak capacity all day?',
  'saa-c03-design-cost-optimized-architectures-116': 'An energy-monitoring site serves firmware files repeatedly to devices in many regions. Which two recommendations reduce repeated origin retrieval and transfer while keeping updates controllable?',
  'saa-c03-design-cost-optimized-architectures-117': 'A school district has many AWS accounts and wants department-level chargeback plus recommendations for overprovisioned resources. Which service combination should be used?',
  'saa-c03-design-cost-optimized-architectures-118': 'A booking platform has predictable always-on application servers and separate unpredictable analytics jobs. Which purchasing recommendation best balances discount and flexibility?',
  'saa-c03-design-cost-optimized-architectures-119': 'A media archive in private subnets retrieves S3 objects through NAT gateways. Security will not approve public IPs for the workers. What network change reduces cost?',
  'saa-c03-design-cost-optimized-architectures-120': 'A biotech team runs Athena against raw JSON stored by month, but most reports need only a few columns and days. What data layout reduces scanned bytes?',
  'saa-c03-design-cost-optimized-architectures-121': 'A healthcare image-processing queue can retry failed jobs and stores progress outside the instance. Which two compute practices reduce cost without losing work?',
  'saa-c03-design-cost-optimized-architectures-122': 'A retail company keeps historical order exports for legal retention but accesses them only during rare audits. Which archive approach is most cost-effective?',
  'saa-c03-design-cost-optimized-architectures-123': 'An analytics database has unpredictable bursts and long idle windows. Which AWS database capacity option best matches spend to measured demand?',
  'saa-c03-design-cost-optimized-architectures-124': 'A university publishes static course videos and assets to students worldwide. Which delivery pattern lowers origin load and improves repeated access latency?',
  'saa-c03-design-cost-optimized-architectures-125': 'A financial-services platform has good tagging hygiene but no routine process for finding idle and oversized resources. Which option gives the clearest right-sizing workflow?',
  'saa-c03-design-cost-optimized-architectures-126': 'A media transcoding fleet has a stable minimum load and unpredictable spikes after new releases. Which two purchasing decisions fit the mixed demand pattern?',
  'saa-c03-design-cost-optimized-architectures-127': 'A manufacturing workload in private subnets calls AWS APIs heavily. NAT gateway processing costs are now a material line item. Which architecture reduces those charges?',
  'saa-c03-design-cost-optimized-architectures-128': 'A government reporting bucket stores uncompressed event data that Athena scans in full for every query. What change lowers per-query cost most directly?',
  'saa-c03-design-cost-optimized-architectures-129': 'A SaaS batch worker fleet handles jobs that can be restarted safely from a queue. The architect must lower compute spend. What is the best fit?',
  'saa-c03-design-cost-optimized-architectures-130': 'A studio stores completed project files that must be retained but are unlikely to be read quickly. Which S3 lifecycle strategy should be used?',
  'saa-c03-design-cost-optimized-architectures-131': 'A delivery-planning database sees unpredictable spikes during weather events. Which two actions help avoid paying for maximum provisioned capacity all month?',
  'saa-c03-design-cost-optimized-architectures-132': 'An IoT dashboard serves the same static JavaScript bundle and images to devices across continents. What pattern reduces repeated origin requests?',
  'saa-c03-design-cost-optimized-architectures-133': 'An education platform wants to tie AWS spend to product owners and identify wasted capacity every month. Which cost tools are most useful?',
  'saa-c03-design-cost-optimized-architectures-134': 'A travel company runs a steady reservation service plus short seasonal campaigns. What should be discounted with commitments, and what should remain flexible?',
  'saa-c03-design-cost-optimized-architectures-135': 'A compliance archive worker in a private subnet reads from S3 through a NAT gateway. Which private connectivity option reduces recurring network cost?',
  'saa-c03-design-cost-optimized-architectures-136': 'A lab analytics workload needs two recommendations to reduce Athena scanned data while preserving query flexibility. Which pair is best?',
  'saa-c03-design-cost-optimized-architectures-137': 'A hospital batch-conversion workload can withstand interruption if jobs are retried from a durable queue. What compute option should be evaluated first?',
  'saa-c03-design-cost-optimized-architectures-138': 'A commerce platform has old order exports that must remain durable for years but rarely need immediate retrieval. Which storage policy lowers cost?',
  'saa-c03-design-cost-optimized-architectures-139': 'An actuarial model database runs intensely for a few days and idles afterward. Which capacity model best reduces waste?',
  'saa-c03-design-cost-optimized-architectures-140': 'A research portal repeatedly serves identical public assets after each publication. Which architecture should absorb repeat requests closest to users?',
  'saa-c03-design-cost-optimized-architectures-141': 'A finance platform needs two recommendations for owner-level cost visibility and right-sizing. Which pair should the architect choose?',
  'saa-c03-design-cost-optimized-architectures-142': 'A streaming platform has a predictable floor of EC2 usage but uncertain launch-day demand. What pricing strategy should be applied?',
  'saa-c03-design-cost-optimized-architectures-143': 'A factory data collector in private subnets sends frequent telemetry to AWS managed services. Which option avoids unnecessary NAT gateway data processing?',
  'saa-c03-design-cost-optimized-architectures-144': 'A public agency wants Athena reports to read only the needed columns and partitions. What S3 data organization should be used?',
  'saa-c03-design-cost-optimized-architectures-145': 'A SaaS export job is stateless, queue-driven, and safe to interrupt. Which compute purchasing option best lowers cost?',
  'saa-c03-design-cost-optimized-architectures-146': 'A gaming studio must keep cold project archives for compliance and choose retrieval behavior by business need. Which two lifecycle choices are appropriate?',
  'saa-c03-design-cost-optimized-architectures-147': 'A logistics database has measured utilization far below provisioned capacity except during rare peaks. What is the best cost-optimization recommendation?',
  'saa-c03-design-cost-optimized-architectures-148': 'An energy dashboard sends the same static files to field devices every hour. Which delivery design reduces origin bandwidth?',
  'saa-c03-design-cost-optimized-architectures-149': 'An education company needs recurring reports that identify untagged spend, idle resources, and owner accountability. Which AWS cost approach fits?',
  'saa-c03-design-cost-optimized-architectures-150': 'A travel search platform has baseline EC2 workers plus unpredictable spikes from fare sales. Which commitment strategy keeps the architecture cost-efficient?',
}
for (const [id, questionText] of Object.entries(saaStemUpdates)) {
  const question = saaById.get(id)
  if (!question) throw new Error(`Missing SAA-C03 question ${id}`)
  question.question = questionText
}

write(secPath, sec)
write(netPath, net)
write(saaPath, saa)

console.log('Applied priority 3 content polish: Security+ evidence, Network+ coaching, SAA stem diversity.')
