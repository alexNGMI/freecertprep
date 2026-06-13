import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const questionPath = path.join(root, 'src/data/comptia-sec-plus-questions.json')

const enrichment = {
  'secplus-pbq-001': {
    category: 'log-triage',
    task: 'Correlate endpoint, identity, and network telemetry to choose the safest initial containment and evidence-preservation action for each alert.',
    artifacts: [
      {
        type: 'console',
        title: 'Correlated event timeline',
        lines: [
          '09:14:02 EDR host=FIN-22 parent=winword.exe child=powershell.exe args="-enc SQBFAFgA..."',
          '09:16:31 IAM user=aramos result=success source=198.51.100.91 geo=DE session=new',
          '09:18:07 FW host=FIN-22 dst=203.0.113.77 reputation=known-c2 sessions=14 action=allow',
        ],
      },
      {
        type: 'table',
        title: 'Analyst context',
        columns: ['Signal', 'Known baseline', 'Current deviation'],
        rows: [
          ['PowerShell', 'Signed admin scripts from management path', 'Encoded command from user temp path'],
          ['User location', 'New York office', 'Germany eight minutes after New York login'],
          ['Outbound traffic', 'Approved finance APIs', 'Known command-and-control address'],
        ],
      },
    ],
    objectiveId: '4.4',
    objectiveTitle: 'Use security alerting and monitoring concepts',
    conceptId: 'comptia-sec-plus-4.4-cross-source-triage',
  },
  'secplus-pbq-002': {
    category: 'control-placement',
    task: 'Place the least-privilege cloud control at the storage, network, or secrets boundary directly responsible for each production finding.',
    artifacts: [
      {
        type: 'table',
        title: 'Cloud exposure review',
        columns: ['Resource', 'Exposure', 'Current control', 'Business requirement'],
        rows: [
          ['Object bucket', 'Anonymous internet read', 'Public ACL', 'Application service account only'],
          ['Database', 'Public IPv4 and 0.0.0.0/0 ingress', 'Password authentication', 'Application subnet only'],
          ['API credential', 'Committed to repository', 'No rotation record', 'Runtime application access'],
        ],
      },
      {
        type: 'checklist',
        title: 'Release gate',
        items: [
          'Remove public access that is not explicitly required.',
          'Keep data services on private network paths.',
          'Rotate exposed credentials before approving release.',
        ],
      },
    ],
  },
  'secplus-pbq-003': {
    category: 'control-placement',
    task: 'Match each vulnerability to the remediation or compensating control that addresses its exploit path while preserving change and validation requirements.',
    artifacts: [
      {
        type: 'table',
        title: 'Vulnerability queue',
        columns: ['Asset', 'Finding', 'Exploitability', 'Constraint'],
        rows: [
          ['Customer portal', 'Reflected script executes in browser', 'Reproduced externally', 'Code release available'],
          ['Payroll server', 'Critical remote-code CVE', 'Known exploit', 'Emergency patch window approved'],
          ['Packaging controller', 'Unsupported operating system', 'No vendor patch', 'Replacement scheduled in 60 days'],
        ],
      },
      {
        type: 'console',
        title: 'Validation notes',
        lines: [
          'WEB: payload <script>alert(1)</script> reflected without encoding',
          'PAYROLL: installed version 8.4.1 | fixed version 8.4.6',
          'PACK-CTRL: legacy protocol required | isolation ACL currently absent',
        ],
      },
    ],
  },
  'secplus-pbq-004': {
    category: 'control-placement',
    task: 'Classify each control by what it primarily does and where it operates, using the observed enforcement or detection behavior rather than its product name.',
    artifacts: [
      {
        type: 'table',
        title: 'Control test results',
        columns: ['Control', 'Test action', 'Observed result'],
        rows: [
          ['Badge reader', 'Unregistered badge presented', 'Door remains locked'],
          ['SIEM rule', 'Impossible-travel event injected', 'Analyst alert created'],
          ['Acceptable-use policy', 'Annual review completed', 'Required conduct documented'],
        ],
      },
      {
        type: 'checklist',
        title: 'Classification dimensions',
        items: [
          'Control function: preventive, detective, corrective, deterrent, compensating, or directive.',
          'Control class: technical, managerial, operational, or physical.',
        ],
      },
    ],
  },
  'secplus-pbq-005': {
    category: 'log-triage',
    task: 'Use proxy, authentication, and DNS evidence to identify the most likely investigation hypothesis without treating one log line as final proof.',
    artifacts: [
      {
        type: 'console',
        title: 'Security log excerpts',
        lines: [
          'PROXY 11:42 user=jchen dst=fileshare-example.net method=POST bytes_out=2147483648 category=newly-registered',
          'AUTH 11:47 user=svc_backup failures=57 sources=24 result=fail',
          'AUTH 11:49 user=svc_backup source=10.44.8.19 result=success',
          'DNS 11:53 host=ENG-17 query=a8f91c2d.chunk1.data-example.org type=TXT',
          'DNS 11:53 host=ENG-17 query=b41e77aa.chunk2.data-example.org type=TXT',
        ],
      },
      {
        type: 'table',
        title: 'Baseline comparison',
        columns: ['Source', 'Normal pattern', 'Observed pattern'],
        rows: [
          ['jchen', '<50 MB uploads to approved collaboration', '2 GB to unknown file-sharing domain'],
          ['svc_backup', 'One management host', 'Failures from 24 sources, then success'],
          ['ENG-17 DNS', 'A/AAAA business lookups', 'High-entropy TXT subdomains'],
        ],
      },
    ],
    objectiveId: '4.9',
    objectiveTitle: 'Use data sources to support an investigation',
    conceptId: 'comptia-sec-plus-4.9-log-source-correlation',
  },
  'secplus-pbq-006': {
    category: 'firewall-policy',
    task: 'Evaluate the ordered segmentation policy from top to bottom and choose the rule correction that gives each zone only its required reachability.',
    artifacts: [
      {
        type: 'table',
        title: 'Ordered firewall policy',
        columns: ['Order', 'Source', 'Destination', 'Service', 'Action'],
        rows: [
          ['10', 'Guest VLAN 90', 'Internal RFC1918', 'Any', 'Deny'],
          ['20', 'Guest VLAN 90', 'Internet', 'HTTP/HTTPS/DNS', 'Allow'],
          ['30', 'Admin VLAN 99', 'Management interfaces', 'SSH/HTTPS', 'Allow'],
          ['40', 'User VLANs', 'Cardholder VLAN 40', 'Any', 'Deny'],
          ['50', 'Any', 'Any', 'Any', 'Deny'],
        ],
      },
      {
        type: 'console',
        title: 'Policy validation log',
        lines: [
          'TEST guest -> 10.20.8.15:445 expected=deny observed=deny matched_rule=10',
          'TEST guest -> 198.51.100.20:443 expected=allow observed=allow matched_rule=20',
          'TEST admin -> 10.10.0.14:443 expected=allow observed=deny matched_rule=50',
          'OBJECT admin-vlan configured=10.10.98.0/24 expected=10.10.99.0/24',
        ],
      },
    ],
  },
  'secplus-pbq-007': {
    category: 'control-placement',
    task: 'Choose the risk response demonstrated by each decision and distinguish reducing, avoiding, or transferring impact from merely acknowledging risk.',
    artifacts: [
      {
        type: 'table',
        title: 'Risk register decisions',
        columns: ['Risk', 'Decision', 'Residual-risk owner'],
        rows: [
          ['Legacy application exploit', 'Deploy managed WAF and isolate backend', 'Application owner'],
          ['Unused cloud file service', 'Terminate service and remove data', 'Business owner'],
          ['Cyber incident cost', 'Purchase policy with defined coverage', 'CFO'],
        ],
      },
      {
        type: 'checklist',
        title: 'Treatment review',
        items: [
          'Compensating controls reduce likelihood or impact but leave residual risk.',
          'Stopping the risky activity removes that activity from scope.',
          'Insurance shifts specified financial impact but not security accountability.',
        ],
      },
    ],
  },
  'secplus-pbq-008': {
    category: 'incident-correlation',
    task: 'Correlate the communication channel, requested action, and physical behavior to identify the social-engineering technique and immediate defensive response.',
    artifacts: [
      {
        type: 'table',
        title: 'User reports',
        columns: ['Channel', 'Pretext', 'Requested action', 'Additional clue'],
        rows: [
          ['Phone', 'Help desk password reset', 'Read back MFA code', 'Caller ID spoofed'],
          ['Email', 'Overdue supplier invoice', 'Open login link', 'Look-alike domain'],
          ['Lobby', 'Forgotten badge', 'Hold secure door', 'No visitor escort'],
        ],
      },
      {
        type: 'checklist',
        title: 'Response constraints',
        items: [
          'Do not disclose passwords, recovery codes, or MFA approvals.',
          'Report suspicious messages through the approved channel.',
          'Require visitors to use reception and escort procedures.',
        ],
      },
    ],
  },
  'secplus-pbq-009': {
    category: 'incident-correlation',
    task: 'Place each action in the incident-response phase where it belongs, using system state and business-restoration evidence to avoid restoring before containment.',
    artifacts: [
      {
        type: 'console',
        title: 'Incident timeline',
        lines: [
          '13:06 EDR confirms active ransomware process on WS-44',
          '13:08 Network access control isolates WS-44',
          '15:42 Forensic image and indicators preserved; malware removed',
          '17:10 Clean image restored; monitoring increased',
          'NEXT DAY Review identifies delayed isolation decision',
        ],
      },
      {
        type: 'table',
        title: 'Recovery gate',
        columns: ['Requirement', 'Status'],
        rows: [
          ['Threat contained', 'Complete'],
          ['Evidence preserved', 'Complete'],
          ['Clean backup validated', 'Complete'],
          ['Lessons-learned action assigned', 'Pending'],
        ],
      },
    ],
  },
  'secplus-pbq-010': {
    category: 'firewall-policy',
    title: 'Ordered data-egress policy review',
    scenario: 'A data loss prevention gateway evaluates outbound transfers from top to bottom. Determine the first applicable rule for each transfer.',
    task: 'Evaluate the ordered data-egress policy and select the data-protection control that permits approved business flows while blocking unapproved disclosure.',
    artifacts: [
      {
        type: 'table',
        title: 'Ordered egress policy',
        columns: ['Order', 'Data label', 'Destination', 'Condition', 'Action'],
        rows: [
          ['10', 'Restricted', 'Approved payroll processor', 'TLS and managed service identity', 'Allow'],
          ['20', 'Restricted', 'Any other external destination', 'Any', 'Block and alert'],
          ['30', 'Confidential', 'Approved collaboration tenant', 'Managed device', 'Allow'],
          ['40', 'Confidential', 'Personal storage', 'Any', 'Block and alert'],
          ['50', 'Public', 'External destination', 'Malware scan passed', 'Allow'],
        ],
      },
      {
        type: 'console',
        title: 'Egress evaluation log',
        lines: [
          'payroll.csv label=Restricted dst=approved-payroll.example tls=yes identity=svc-payroll',
          'hr-roster.xlsx label=Confidential dst=personal-drive.example device=managed',
          'brochure.pdf label=Public dst=partner.example malware_scan=pass',
        ],
      },
    ],
    question: 'Match each transfer to the result of the first applicable policy rule.',
    itemsLeft: [
      'Restricted payroll export uses TLS and the approved service identity',
      'Confidential HR roster is uploaded to a personal cloud drive',
      'Public product brochure passes malware scanning before partner upload',
    ],
    itemsRight: [
      'Allow under the approved restricted-data processor rule',
      'Block and alert under the confidential-data personal-storage rule',
      'Allow under the public-data malware-scan rule',
    ],
    correctMatches: [0, 1, 2],
    explanation: 'The payroll flow satisfies the narrow approved-processor rule. The HR roster is confidential and personal storage is explicitly blocked even from a managed device. The public brochure may leave after the required malware scan. Ordered policy evaluation stops at the first applicable rule, so labels, destinations, and conditions must all be checked.',
    objectiveId: '3.3',
    objectiveTitle: 'Select strategies to protect data',
    conceptId: 'comptia-sec-plus-3.3-data-egress-policy',
  },
}

const categoryGuidance = {
  'log-triage': 'The correct response uses multiple log sources and baseline context to form a defensible hypothesis, contain immediate risk, and preserve the evidence needed to confirm or reject that hypothesis.',
  'firewall-policy': 'The correct response evaluates rules in order and applies least privilege to the specific source, destination, service, data label, and condition instead of broadly opening access.',
  'incident-correlation': 'The correct response connects events across time, identity, endpoint, network, and business state so containment, recovery, and follow-up occur in the right sequence.',
  'control-placement': 'The correct response places the control at the boundary that actually enforces, detects, or reduces the stated risk and then validates that the control changed the intended condition.',
}

const questions = JSON.parse(fs.readFileSync(questionPath, 'utf8'))

for (const question of questions) {
  const update = enrichment[question.id]
  if (!update) continue

  question.practicalCategory = update.category
  question.pbq = {
    ...question.pbq,
    title: update.title || question.pbq?.title,
    scenario: update.scenario || question.pbq?.scenario,
    category: update.category,
    task: update.task,
    artifacts: update.artifacts,
  }

  for (const field of [
    'question',
    'itemsLeft',
    'itemsRight',
    'correctMatches',
    'explanation',
    'objectiveId',
    'objectiveTitle',
    'conceptId',
  ]) {
    if (update[field] !== undefined) question[field] = update[field]
  }

  question.componentFeedback = question.itemsLeft.map((leftItem, index) => ({
    label: leftItem,
    action: question.itemsRight[question.correctMatches[index]],
    why: categoryGuidance[update.category],
  }))

  if (question.explanation.length < 190) {
    question.explanation = `${question.explanation} ${categoryGuidance[update.category]}`
  }
}

fs.writeFileSync(questionPath, `${JSON.stringify(questions, null, 2)}\n`)
console.log(`Enriched ${Object.keys(enrichment).length} Security+ practical scenarios.`)
