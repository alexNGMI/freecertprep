import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const enrichment = {
  'aplus-core1-pbq-001': {
    category: 'hardware-diagnostics',
    task: 'Use the POST, temperature, and port evidence to choose the least invasive next hardware check for each workstation.',
    artifact: {
      type: 'console',
      title: 'Bench diagnostics',
      lines: [
        'PC-A  POST: no display | GPU reseated | onboard video available',
        'PC-B  CPU: 96 C under load | fan: 780 RPM | intake: obstructed',
        'PC-C  POST: keyboard error | rear USB: normal | front USB: intermittent',
      ],
    },
  },
  'aplus-core1-pbq-002': {
    category: 'network-connectivity',
    task: 'Correlate link, addressing, and name-resolution evidence before changing network infrastructure.',
    artifact: {
      type: 'console',
      title: 'Client checks',
      lines: [
        'User 1  Ethernet: Media disconnected | switch LED: off',
        'User 2  IPv4: 169.254.44.18/16 | gateway: none',
        'User 3  ping 10.20.0.1: success | nslookup intranet: timeout',
      ],
    },
  },
  'aplus-core1-pbq-003': {
    category: 'mobile-peripherals',
    task: 'Choose the accessory, profile, or display-path correction supported by each observed symptom.',
    artifact: {
      type: 'table',
      title: 'Accessory status',
      columns: ['Device', 'Detected state', 'Observed limit'],
      rows: [
        ['Tablet USB-C', 'Power reconnects when moved', 'Charging intermittent'],
        ['Bluetooth headset', 'Paired', 'Speaker remains active output'],
        ['USB-C display adapter', 'Detected', '1920x1080 maximum'],
      ],
    },
  },
  'aplus-core1-pbq-004': {
    category: 'mobile-peripherals',
    task: 'Separate OS configuration faults from cable and battery hardware faults.',
    artifact: {
      type: 'table',
      title: 'Laptop comparison',
      columns: ['Unit', 'Pre-boot test', 'OS or hardware clue'],
      rows: [
        ['A', 'Trackpad works in firmware', 'Fails after Windows loads'],
        ['B', 'Panel image changes with lid angle', 'External display stable'],
        ['C', 'Battery health: 31%', 'AC operation stable'],
      ],
    },
  },
  'aplus-core1-pbq-005': {
    category: 'hardware-diagnostics',
    task: 'Use the print pattern and device technology to select the correct maintenance action.',
    artifact: {
      type: 'table',
      title: 'Print inspection',
      columns: ['Printer', 'Technology', 'Test-page result'],
      rows: [
        ['Laser A', 'Laser', 'Spot repeats every 94 mm'],
        ['Inkjet B', 'Inkjet', 'Faded cyan and magenta'],
        ['Thermal C', 'Direct thermal', 'Feeds labels with no image'],
      ],
    },
  },
  'aplus-core1-pbq-006': {
    category: 'storage-configuration',
    task: 'Match interface, performance, and resilience requirements to a compatible storage design.',
    artifact: {
      type: 'table',
      title: 'Storage inventory',
      columns: ['System', 'Available interface', 'Priority'],
      rows: [
        ['Workstation', 'M.2 PCIe 4.0 x4', 'Fast local boot and applications'],
        ['NAS', 'Four SATA bays', 'Continue after one drive failure'],
        ['Old laptop', '2.5-inch SATA III bay', 'Replace mechanical disk'],
      ],
    },
  },
  'aplus-core1-pbq-007': {
    category: 'virtualization-cloud',
    task: 'Apply the isolation, recovery, or delivery feature that directly meets each virtual-workload requirement.',
    artifact: {
      type: 'checklist',
      title: 'Lab requirements',
      items: [
        'Developer traffic must not reach the production LAN.',
        'Training machines must return to baseline between classes.',
        'Remote users cannot install the application locally.',
      ],
    },
  },
  'aplus-core1-pbq-008': {
    category: 'hardware-diagnostics',
    task: 'Interpret startup behavior and begin with the component or firmware check most directly supported by the evidence.',
    artifact: {
      type: 'console',
      title: 'Startup evidence',
      lines: [
        'Desktop A  AC outlet: PASS | standby LED: OFF | fans: OFF',
        'Desktop B  POST code: memory initialization failure',
        'Desktop C  NVMe device: detected | boot entry: missing',
      ],
    },
  },
  'aplus-core1-pbq-009': {
    category: 'network-connectivity',
    task: 'Select a wireless configuration that fits the client capability, isolation, and density evidence.',
    artifact: {
      type: 'table',
      title: 'Wireless survey',
      columns: ['Area', 'Client capability', 'Requirement'],
      rows: [
        ['Lobby', 'Mixed visitor devices', 'Internet only'],
        ['Warehouse', '2.4 GHz 802.11n scanners', 'Reliable broad coverage'],
        ['Conference room', 'Wi-Fi 6/6E laptops', 'High-density video'],
      ],
    },
  },
  'aplus-core1-pbq-010': {
    category: 'mobile-peripherals',
    task: 'Use driver, firmware, and privacy evidence to restore each peripheral without replacing working hardware.',
    artifact: {
      type: 'table',
      title: 'Device Manager and settings',
      columns: ['Peripheral', 'Hardware state', 'Software clue'],
      rows: [
        ['Scanner', 'Detected', 'TWAIN source unavailable'],
        ['Dock', 'USB device present', 'Firmware revision below baseline'],
        ['Webcam', 'Test utility passes', 'Camera permission denied'],
      ],
    },
  },
  'aplus-core2-pbq-001': {
    category: 'software-mobile',
    task: 'Use profile, recovery, and endpoint evidence to choose the safest next software-repair action.',
    artifact: {
      type: 'table',
      title: 'Support console',
      columns: ['Ticket', 'Comparison test', 'Relevant evidence'],
      rows: [
        ['A', 'New user profile: app works', 'Original profile only'],
        ['B', 'WinRE available', 'Three failed starts'],
        ['C', 'PUP alert active', 'Unknown browser extension'],
      ],
    },
  },
  'aplus-core2-pbq-002': {
    category: 'security-response',
    task: 'Contain the active risk first, then protect the affected account, endpoint, or managed data.',
    artifact: {
      type: 'console',
      title: 'Security alerts',
      lines: [
        'Laptop A  Identity alert: sign-in from new country after phishing report',
        'Laptop B  EDR: rapid file rename activity | process still active',
        'Laptop C  MDM: last check-in 42 minutes ago | disk encryption enabled',
      ],
    },
  },
  'aplus-core2-pbq-003': {
    category: 'os-tools',
    task: 'Apply the approved identity or profile-management action for each Windows access condition.',
    artifact: {
      type: 'table',
      title: 'Account state',
      columns: ['User', 'Account type', 'System message'],
      rows: [
        ['A', 'Domain', 'Password rejected'],
        ['B', 'Standard user', 'Approved installer requires elevation'],
        ['C', 'Domain', 'Signed in with a temporary profile'],
      ],
    },
  },
  'aplus-core2-pbq-004': {
    category: 'os-tools',
    task: 'Choose the Windows storage tool that matches cleanup, file-system repair, or partition work.',
    artifact: {
      type: 'console',
      title: 'Disk status',
      lines: [
        'PC-A  C: 3.1 GB free | Temporary files: 18.4 GB',
        'PC-B  NTFS event: volume marked dirty after unexpected shutdown',
        'PC-C  C: healthy 380 GB | 120 GB unallocated | BitLocker: off',
      ],
    },
  },
  'aplus-core2-pbq-005': {
    category: 'security-response',
    task: 'Match each malware or account-compromise clue to the containment and remediation step that addresses it.',
    artifact: {
      type: 'console',
      title: 'Endpoint findings',
      lines: [
        'Host A  Defender service: stopped | unknownsvc: automatic',
        'Host B  Browser notification source: untrusted-security.example',
        'Host C  Active sessions: 5 | unfamiliar device: 1',
      ],
    },
  },
  'aplus-core2-pbq-006': {
    category: 'software-mobile',
    task: 'Use application, credential, and storage evidence to select a focused mobile-support action.',
    artifact: {
      type: 'table',
      title: 'Mobile management status',
      columns: ['Phone', 'Managed state', 'Observed condition'],
      rows: [
        ['A', 'Compliant', 'One app crashes after version update'],
        ['B', 'Compliant', 'Mail auth failed after password reset'],
        ['C', 'Compliant', 'Storage 98% used'],
      ],
    },
  },
  'aplus-core2-pbq-007': {
    category: 'operational-workflow',
    task: 'Apply change control, privacy, and validation requirements before the work begins.',
    artifact: {
      type: 'checklist',
      title: 'Maintenance review',
      items: [
        'Business-hours restart affects a shared service.',
        'A repair session may expose customer records.',
        'The proposed software will enter the standard workstation image.',
      ],
    },
  },
  'aplus-core2-pbq-008': {
    category: 'security-response',
    task: 'Choose the identity control that reduces the stated risk while preserving individual accountability.',
    artifact: {
      type: 'table',
      title: 'Authentication review',
      columns: ['Use case', 'Current state', 'Risk'],
      rows: [
        ['Remote access', 'Password only', 'Credential reuse'],
        ['Shared workstation', 'Shared account', 'No attribution'],
        ['Privileged install', 'Permanent local admin', 'Excess privilege'],
      ],
    },
  },
  'aplus-core2-pbq-009': {
    category: 'software-mobile',
    task: 'Use service and change evidence to reverse the smallest likely software fault first.',
    artifact: {
      type: 'console',
      title: 'Service status',
      lines: [
        'Spooler       Running -> Stopped after error | queue: 14 jobs',
        'LOB plugin    Version 6.4 installed immediately before crashes',
        'SyncService   Startup type: Disabled | application dependency: Yes',
      ],
    },
  },
  'aplus-core2-pbq-010': {
    category: 'operational-workflow',
    task: 'Update the record that preserves configuration, asset, or incident history for each completed task.',
    artifact: {
      type: 'checklist',
      title: 'Closure requirements',
      items: [
        'Record the new shared-printer address and affected users.',
        'Preserve replacement serial, warranty, and RMA information.',
        'Record containment, credential reset, and notifications.',
      ],
    },
  },
}

const categoryGuidance = {
  'hardware-diagnostics': 'The action follows the observed hardware symptom and verifies the direct power, thermal, POST, print, or connection path before replacing unrelated parts.',
  'network-connectivity': 'The action stays at the failing network layer shown by the link, addressing, DNS, wireless, or segmentation evidence.',
  'mobile-peripherals': 'The action separates working hardware from accessory, driver, firmware, profile, permission, or cable limitations.',
  'storage-configuration': 'The action matches the available interface and required performance or resilience instead of assuming every storage technology is interchangeable.',
  'virtualization-cloud': 'The action applies the virtualization feature that directly provides isolation, rollback, or remote delivery.',
  'os-tools': 'The action uses the native operating-system or identity tool suited to the evidence while preserving data and approved access.',
  'security-response': 'The action contains active risk and restores control without destroying evidence or weakening authentication and data protection.',
  'software-mobile': 'The action isolates the smallest likely software, profile, service, credential, or capacity fault before broader recovery.',
  'operational-workflow': 'The action preserves approval, privacy, validation, documentation, and accountability around the technical work.',
}

for (const relativePath of [
  'src/data/comptia-a-plus-core-1-questions.json',
  'src/data/comptia-a-plus-core-2-questions.json',
]) {
  const absolutePath = path.join(root, relativePath)
  const questions = JSON.parse(fs.readFileSync(absolutePath, 'utf8'))

  for (const question of questions) {
    const update = enrichment[question.id]
    if (!update) continue

    question.practicalCategory = update.category
    question.pbq = {
      ...question.pbq,
      category: update.category,
      task: update.task,
      artifacts: [update.artifact],
    }
    question.componentFeedback = question.itemsLeft.map((leftItem, index) => ({
      label: leftItem,
      action: question.itemsRight[question.correctMatches[index]],
      why: categoryGuidance[update.category],
    }))
  }

  fs.writeFileSync(absolutePath, `${JSON.stringify(questions, null, 2)}\n`)
}

console.log(`Enriched ${Object.keys(enrichment).length} A+ PBQ-lite questions.`)
