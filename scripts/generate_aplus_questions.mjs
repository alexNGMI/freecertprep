import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const core1Domains = [
  ['Mobile Devices', 98],
  ['Networking', 173],
  ['Hardware', 188],
  ['Virtualization and Cloud Computing', 82],
  ['Hardware and Network Troubleshooting', 209],
]

const core2Domains = [
  ['Operating Systems', 210],
  ['Security', 210],
  ['Software Troubleshooting', 173],
  ['Operational Procedures', 157],
]

const banks = {
  'Mobile Devices': [
    ['replace a swelling laptop battery', 'Shut the laptop down, remove power, follow ESD precautions, and replace the battery with an approved part', ['Puncture the battery pack to relieve pressure', 'Keep using the battery until it fully discharges', 'Replace the system board before inspecting the battery'], 'Swollen lithium-ion batteries are safety hazards. Power must be removed, ESD controls used, and the pack replaced with a compatible approved battery.'],
    ['configure a phone for corporate email', 'Use the organization-approved MDM enrollment and require screen lock before syncing mail', ['Disable device encryption to improve sync speed', 'Share the mailbox password through SMS', 'Install any third-party mail client without approval'], 'MDM enrollment applies policy, remote wipe, certificates, and screen-lock requirements before business data is synchronized.'],
    ['connect a laptop to multiple monitors at a desk', 'Use a docking station that supports the required display count and bandwidth', ['Use NFC pairing for external displays', 'Replace the laptop battery', 'Disable USB-C alternate mode'], 'Docking stations provide power, peripheral, network, and display expansion for mobile users at a workstation.'],
    ['pair a headset to a tablet', 'Enable Bluetooth, put the headset in pairing mode, and select it from discovered devices', ['Configure a static IP address', 'Enable cellular roaming', 'Install a printer driver'], 'Bluetooth pairing requires discovery/pairing mode on the accessory and selection from the mobile device Bluetooth menu.'],
    ['use tap-to-pay on a smartphone', 'Confirm NFC is enabled and a supported wallet is configured', ['Enable WPA3 personal mode', 'Install a SOHO router', 'Set the APN manually'], 'Near-field communication is used for short-range contactless payments, badges, and device pairing.'],
    ['improve mobile hotspot stability', 'Move to a location with stronger cellular signal and verify hotspot data is allowed', ['Change the laptop SATA mode', 'Disable DHCP on the phone', 'Replace the printer fuser'], 'Hotspot reliability depends on cellular coverage, carrier plan support, and device battery/power conditions.'],
    ['replace laptop memory', 'Check the service manual for supported SODIMM type, speed, and capacity', ['Install desktop DIMMs if the notch matches', 'Use ECC memory in every consumer laptop', 'Replace the LCD panel first'], 'Laptops use SODIMMs and have strict compatibility limits for generation, speed, voltage, and maximum capacity.'],
    ['secure a lost company phone', 'Use MDM to locate, lock, or wipe the device according to policy', ['Wait until the battery dies', 'Delete the user account from payroll only', 'Disable the office wireless SSID'], 'MDM gives administrators remote lock, locate, and wipe controls to protect corporate data on mobile devices.'],
  ],
  Networking: [
    ['identify HTTPS traffic', 'TCP port 443', ['TCP port 25', 'UDP port 53', 'TCP port 3389'], 'HTTPS normally uses TCP 443 to provide encrypted web traffic.'],
    ['provide automatic IP settings on a LAN', 'DHCP', ['DNS', 'NTP', 'SNMP'], 'DHCP leases IP address, subnet mask, gateway, and DNS settings to clients.'],
    ['resolve host names to IP addresses', 'DNS', ['RDP', 'SSH', 'PoE'], 'DNS maps host names to IP addresses so users do not need to remember numeric addresses.'],
    ['connect network segments at layer 3', 'Router', ['Patch panel', 'Unmanaged switch', 'Toner probe'], 'Routers forward traffic between IP networks and act as the default gateway for clients.'],
    ['power a ceiling-mounted access point through Ethernet', 'Use a PoE-capable switch or injector', ['Use a crossover cable only', 'Disable VLAN tagging', 'Install a modem at the AP'], 'Power over Ethernet can deliver data and electrical power to supported devices such as APs and VoIP phones.'],
    ['separate guest Wi-Fi from employee systems', 'Place guests on a separate VLAN or guest network', ['Put all clients in the same broadcast domain', 'Disable WPA on both SSIDs', 'Use a hub for guest users'], 'Guest networks should be segmented from internal systems, commonly with separate VLANs and firewall rules.'],
    ['test whether a remote host responds', 'Use ping if ICMP is allowed', ['Use diskpart', 'Use gpupdate', 'Use dxdiag'], 'Ping sends ICMP echo requests to check basic reachability, although firewalls may block it.'],
    ['find the path traffic takes to a destination', 'Use tracert or traceroute', ['Use format', 'Use msconfig', 'Use winver'], 'Traceroute tools show hops between the client and destination, helping locate routing failures.'],
    ['connect a cable to a patch panel', 'Use a punchdown tool with the correct wiring standard', ['Use thermal paste', 'Use a loopback plug on the switch', 'Use a fuser kit'], 'Punchdown tools seat twisted-pair conductors into IDC terminals on patch panels and keystone jacks.'],
    ['choose secure wireless encryption for a new SOHO router', 'WPA3-Personal where supported', ['WEP', 'Open authentication', 'MAC filtering only'], 'WPA3 is the preferred modern personal wireless security mode when all client devices support it.'],
  ],
  Hardware: [
    ['choose storage for fastest boot times', 'NVMe SSD', ['5400 RPM HDD', 'DVD-RW drive', 'Tape cartridge'], 'NVMe SSDs use PCIe and provide much lower latency and higher throughput than spinning disks.'],
    ['install a CPU safely', 'Align the CPU marker with the socket marker and lock the retention mechanism', ['Force the CPU into place if it resists', 'Apply thermal paste to the socket pins', 'Touch the contacts to verify orientation'], 'Processors must be aligned with socket markings and installed without force to avoid bent pins or damaged contacts.'],
    ['cool a processor after replacing the heat sink', 'Apply an appropriate amount of thermal paste before installing the heat sink', ['Clean the fan with water while powered', 'Leave the old dried compound in place', 'Disable all case fans'], 'Thermal paste fills microscopic gaps between the CPU heat spreader and heat sink for efficient heat transfer.'],
    ['select memory for a desktop motherboard', 'Match the motherboard-supported DDR generation, speed, and capacity', ['Mix any DDR generation if capacity matches', 'Use SODIMM memory in all desktops', 'Install only printer memory'], 'Motherboards support specific memory generations and capacities; incompatible modules will not fit or operate correctly.'],
    ['protect a workstation from brief power loss', 'Install a UPS sized for the load', ['Install a passive heat sink', 'Use a toner probe', 'Replace the CMOS battery'], 'A UPS provides battery-backed power long enough to ride through short outages or shut down safely.'],
    ['build a workstation for virtualization labs', 'Prioritize CPU cores, RAM capacity, and fast SSD storage', ['Prioritize a fax modem', 'Use the smallest possible SSD', 'Disable hardware virtualization'], 'Virtualization workloads need CPU virtualization support, memory for guest VMs, and fast storage for virtual disks.'],
    ['replace a failed laser printer maintenance component', 'Replace the fuser if toner smears and does not bond to paper', ['Replace the NIC', 'Replace the CMOS battery', 'Replace the Wi-Fi antenna'], 'The fuser uses heat and pressure to bond toner to paper; failure often causes smearing or poorly fused output.'],
    ['identify the purpose of TPM', 'Store cryptographic keys for features such as BitLocker', ['Increase CPU clock speed', 'Convert AC to DC power', 'Terminate coaxial cable'], 'A Trusted Platform Module securely stores keys and supports measured boot and disk encryption features.'],
    ['select the correct display cable for high bandwidth monitors', 'Use DisplayPort or HDMI versions that support the required resolution and refresh rate', ['Use RJ-11', 'Use SATA data cable', 'Use a Molex power splitter'], 'Modern high-resolution displays require display standards and cable versions with enough bandwidth.'],
    ['install expansion storage in a desktop', 'Use an available M.2 slot or SATA data and power connections as supported', ['Connect the drive to an RJ-45 port', 'Install it in a RAM slot', 'Attach it to a printer fuser'], 'Storage devices connect through supported motherboard interfaces such as M.2 NVMe or SATA.'],
  ],
  'Virtualization and Cloud Computing': [
    ['run several test operating systems on one workstation', 'Use virtual machines on a hypervisor', ['Use a KVM switch only', 'Use a toner probe', 'Use print spooling'], 'A hypervisor lets multiple guest operating systems share one physical host.'],
    ['identify a bare-metal hypervisor', 'Type 1 hypervisor', ['Type 2 hypervisor', 'Container registry', 'Print server'], 'Type 1 hypervisors install directly on hardware, while Type 2 hypervisors run on a host OS.'],
    ['describe SaaS', 'A provider-hosted application consumed through a browser or client', ['Raw virtual machines only', 'Customer-owned data center power', 'A local-only BIOS feature'], 'Software as a Service delivers complete applications managed by the provider.'],
    ['describe IaaS', 'Provider-hosted compute, storage, and networking that customers configure', ['A finished email application only', 'A printer maintenance kit', 'A mobile pairing protocol'], 'Infrastructure as a Service gives customers virtual infrastructure while the provider manages physical facilities.'],
    ['use snapshots safely', 'Take snapshots before risky changes and avoid keeping them as long-term backups', ['Use snapshots as the only backup forever', 'Snapshot a powered-off printer', 'Disable storage before snapshotting'], 'Snapshots capture VM state for short-term rollback, but they are not a replacement for proper backups.'],
    ['give a VM network access through the host', 'Configure the VM virtual NIC for NAT or bridged networking as needed', ['Install more thermal paste', 'Change the monitor refresh rate', 'Replace the keyboard'], 'Virtual NIC mode controls how a VM communicates with the host network and external systems.'],
  ],
  'Hardware and Network Troubleshooting': [
    ['a PC powers on but no display appears after RAM replacement', 'Reseat compatible RAM and verify it is in the correct slots', ['Reinstall the printer driver first', 'Change the DNS server', 'Replace the mouse'], 'No-display conditions after memory work often come from incompatible or improperly seated RAM.'],
    ['a laptop works on AC power but not battery', 'Check battery health and replace the battery if it no longer holds charge', ['Replace the wireless router', 'Flush DNS', 'Install a print fuser'], 'A system that runs on AC but fails on battery points to battery, charging, or power-management issues.'],
    ['users report slow Wi-Fi in one corner of the office', 'Check signal strength, interference, AP placement, and channel overlap', ['Replace every SSD', 'Run chkdsk on the file server only', 'Disable all encryption'], 'Wireless performance depends on signal quality, interference, channel planning, and access point placement.'],
    ['a workstation has an APIPA address', 'Verify DHCP reachability and network connectivity', ['Replace the monitor cable', 'Install more printer toner', 'Change the CPU cooler'], 'APIPA addresses indicate the client could not obtain a DHCP lease.'],
    ['a laser printer leaves repeated marks down the page', 'Inspect rollers, drum, and fuser for defects or contamination', ['Replace the default gateway', 'Disable Bluetooth', 'Clear browser cookies only'], 'Repeating defects usually map to rotating printer components such as rollers, drums, or fusers.'],
    ['a PC randomly shuts down under load', 'Check temperatures, fans, heat sink contact, and power supply capacity', ['Rename the computer', 'Disable DNS recursion', 'Replace the keyboard'], 'Thermal or power problems often appear when load increases.'],
    ['a switch port has no link light', 'Test the cable, port, and endpoint NIC', ['Run Disk Cleanup', 'Rebuild the Windows profile', 'Replace the printer tray'], 'No link light points to physical layer issues such as cable, port, or NIC failure.'],
    ['a new NVMe drive is not detected', 'Check BIOS/UEFI settings, slot compatibility, and seating', ['Change the email password', 'Use WPA3', 'Replace the toner'], 'Drive detection problems often involve seating, firmware settings, lane sharing, or unsupported form factors.'],
    ['a user cannot reach websites but can ping public IP addresses', 'Troubleshoot DNS configuration', ['Replace the CPU', 'Clean the scanner glass', 'Disable the touchpad'], 'IP reachability with name-resolution failure indicates DNS is the likely problem.'],
    ['a display image is dim or flickering', 'Check brightness, cable seating, display settings, and external monitor behavior', ['Replace DHCP', 'Install a domain controller', 'Reset the print queue'], 'Display symptoms should be isolated between panel, cable, GPU, settings, and power conditions.'],
  ],
  'Operating Systems': [
    ['create disk partitions in Windows', 'Use Disk Management or diskpart', ['Use nslookup', 'Use netstat only', 'Use Device Manager exclusively'], 'Disk Management and diskpart manage partitions, volumes, and drive letters in Windows.'],
    ['view running processes and startup impact', 'Use Task Manager', ['Use ping', 'Use BitLocker Recovery', 'Use printui only'], 'Task Manager shows processes, performance, startup impact, and user sessions.'],
    ['join a Windows Pro computer to a domain', 'Use System properties or Settings with domain credentials', ['Use Windows Home edition without upgrade', 'Use a printer share wizard', 'Use AirDrop'], 'Domain join requires an edition that supports it plus valid domain credentials and network connectivity.'],
    ['install software on Linux from repositories', 'Use the distribution package manager', ['Edit the BIOS clock only', 'Use Windows Update Catalog', 'Format the EFI partition'], 'Linux package managers install and update software from trusted repositories.'],
    ['manage macOS application permissions', 'Use Privacy and Security settings', ['Use regedit', 'Use Group Policy Editor on macOS', 'Use diskpart'], 'macOS centralizes privacy permissions such as camera, microphone, and full disk access in system settings.'],
    ['recover a Windows system that fails after a driver update', 'Boot to recovery options and roll back or remove the driver', ['Replace the monitor stand', 'Change DHCP scope size', 'Rebuild the toner cartridge'], 'Recovery options and Safe Mode help remove bad drivers or updates that prevent normal startup.'],
    ['choose a file system for modern Windows system volume', 'NTFS', ['ext4', 'APFS', 'exFAT only'], 'NTFS supports Windows permissions, journaling, compression, encryption, and large system volumes.'],
    ['run a command as another user in Linux', 'sudo', ['robocopy', 'gpupdate', 'sfc'], 'sudo allows authorized users to run commands with elevated privileges and creates an audit trail.'],
    ['automate a simple Windows administrative task', 'Use PowerShell or a batch script', ['Use BIOS beep codes', 'Use a toner probe', 'Use NFC tags only'], 'PowerShell and batch files are common Windows scripting options for repeatable administrative tasks.'],
    ['verify Windows system files', 'Run sfc /scannow', ['Run ipconfig /release only', 'Run chmod 777', 'Run traceroute'], 'System File Checker scans protected Windows system files and attempts repair.'],
  ],
  Security: [
    ['protect a lost laptop drive', 'Use full-disk encryption such as BitLocker', ['Use an open guest Wi-Fi network', 'Disable screen lock', 'Store the password in a text file'], 'Full-disk encryption protects data at rest if a device is lost or stolen.'],
    ['reduce risk from phishing', 'Train users, filter mail, and verify suspicious links before entering credentials', ['Disable MFA', 'Share passwords verbally', 'Allow all attachments'], 'Phishing defense combines user awareness, filtering, MFA, and verification habits.'],
    ['apply least privilege', 'Give users only the permissions required for their work', ['Make all users local administrators', 'Share one admin account', 'Disable audit logs'], 'Least privilege limits damage from mistakes, malware, or compromised accounts.'],
    ['secure a SOHO wireless network', 'Use WPA3 or WPA2 with a strong passphrase and updated firmware', ['Use WEP', 'Hide SSID as the only control', 'Leave the default admin password'], 'Modern encryption, strong credentials, and firmware updates are basic SOHO security controls.'],
    ['remove malware safely', 'Isolate the system, identify symptoms, remediate, update, and educate the user', ['Ignore symptoms after reboot', 'Disable anti-malware permanently', 'Copy suspected malware to shared drives'], 'Malware response should prevent spread, remove the infection, patch/update, and document lessons learned.'],
    ['harden a workstation login', 'Require MFA where supported and strong password or PIN policy', ['Use blank local passwords', 'Disable lock screen timeout', 'Use shared credentials'], 'MFA and strong authentication reduce the chance that stolen passwords lead to compromise.'],
    ['handle a suspicious USB drive found in a parking lot', 'Do not plug it into a production machine; follow security policy', ['Open every file to identify the owner', 'Format it on the file server', 'Copy contents to a shared drive'], 'Unknown removable media can contain malware or malicious firmware and should be handled according to policy.'],
    ['physically secure a public workstation', 'Use cable locks, privacy screens, and restricted access as appropriate', ['Disable all updates', 'Use open Wi-Fi', 'Leave admin sessions unlocked'], 'Physical controls reduce theft, shoulder surfing, and unauthorized access.'],
    ['protect mobile devices from unauthorized access', 'Require screen lock, encryption, and remote wipe through MDM', ['Disable passcodes for convenience', 'Use one shared Apple ID for all users', 'Turn off app updates forever'], 'MDM and baseline mobile policies protect business data on phones and tablets.'],
    ['identify social engineering', 'An attacker impersonates trusted staff to persuade a user to reveal information', ['A CPU fan fails', 'A switch negotiates speed', 'A printer runs out of toner'], 'Social engineering manipulates people rather than exploiting only technical vulnerabilities.'],
  ],
  'Software Troubleshooting': [
    ['an application crashes after an update', 'Check logs, repair or reinstall the app, and verify compatibility', ['Replace the CPU immediately', 'Disable the firewall permanently', 'Change the monitor cable'], 'Application crashes after updates often involve compatibility, corrupt install files, dependencies, or profiles.'],
    ['a browser redirects to unwanted sites', 'Check extensions, proxy settings, malware, and browser reset options', ['Replace the SSD first', 'Change the power supply', 'Clean the printer rollers'], 'Unexpected redirects often come from malicious extensions, proxy changes, or browser hijacking malware.'],
    ['Windows displays a blue screen repeatedly', 'Record the stop code and check drivers, hardware, and recent changes', ['Ignore the stop code', 'Change the Wi-Fi SSID', 'Replace the keyboard first'], 'Stop codes and recent changes help isolate driver, memory, storage, and hardware failures.'],
    ['a user profile loads with a temporary profile', 'Check profile corruption, permissions, and profile registry entries', ['Replace the router antenna', 'Run toner calibration', 'Disable DNS'], 'Temporary profiles usually indicate Windows could not load the normal profile correctly.'],
    ['a phone app will not open after an OS update', 'Update or reinstall the app and verify OS compatibility', ['Replace the SIM tray first', 'Disable all network security', 'Format the company file server'], 'Mobile apps may need updates or reinstall after OS changes.'],
    ['a system is slow after login', 'Review startup apps, resource usage, malware, and disk health', ['Replace the monitor', 'Change the printer paper', 'Disable DHCP'], 'Slow login can come from startup load, malware, storage problems, or profile and network delays.'],
    ['a mapped drive does not reconnect', 'Verify network connectivity, credentials, share permissions, and path', ['Install more thermal paste', 'Replace the mouse pad', 'Disable antivirus without testing'], 'Mapped-drive failures involve network, authentication, share path, or permission issues.'],
    ['email works on webmail but not in the desktop app', 'Check app profile, server settings, credentials, and cached data', ['Replace RAM immediately', 'Change the wall outlet', 'Rebuild the switch stack'], 'When webmail works, the account is likely active; the local client profile or settings are likely at fault.'],
  ],
  'Operational Procedures': [
    ['document a completed repair', 'Record symptoms, actions taken, parts used, and final verification', ['Rely only on memory', 'Delete ticket notes after closure', 'Share passwords in the ticket'], 'Documentation preserves history, supports audits, and helps future troubleshooting.'],
    ['work inside a desktop safely', 'Disconnect power and use ESD protection before handling components', ['Wear wool gloves and keep power connected', 'Vacuum the motherboard directly', 'Stack parts on carpet'], 'Power removal and ESD protection reduce shock and component damage risk.'],
    ['communicate with an upset user', 'Listen, acknowledge the issue, set expectations, and provide updates', ['Blame the user immediately', 'Use unexplained jargon', 'Close the ticket without response'], 'Professional communication is part of effective technical support.'],
    ['make a production configuration change', 'Follow change-management approval, testing, rollback, and documentation steps', ['Change it immediately without record', 'Skip backups to save time', 'Tell no one until users complain'], 'Change management reduces risk through review, testing, communication, and rollback planning.'],
    ['dispose of an old drive containing business data', 'Sanitize or destroy it according to data-handling policy', ['Throw it in regular trash', 'Sell it without wiping', 'Leave it in a public area'], 'Storage media must be sanitized or destroyed to prevent data disclosure.'],
    ['handle customer confidential information', 'Follow privacy policy and share only with authorized parties', ['Discuss it in public areas', 'Copy it to personal email', 'Post it in chat for convenience'], 'Privacy and confidentiality obligations apply during support work.'],
    ['choose a backup approach for critical workstations', 'Use scheduled backups and verify restore capability', ['Assume RAID is a backup', 'Keep one copy on the same disk', 'Never test restores'], 'Backups must be scheduled, protected, and tested through restoration.'],
    ['escalate an issue properly', 'Provide clear notes, impact, steps tried, and current status', ['Escalate with no details', 'Delete troubleshooting notes', 'Restart from scratch without context'], 'Good escalation gives the next tier enough context to continue efficiently.'],
  ],
}

const matchSets = {
  Networking: [
    ['Match each protocol to its usual purpose.', ['DNS', 'DHCP', 'HTTPS', 'SSH'], ['Name resolution', 'Automatic IP addressing', 'Encrypted web traffic', 'Secure remote shell'], [0, 1, 2, 3]],
    ['Match each network tool to its purpose.', ['Toner probe', 'Cable tester', 'Loopback plug', 'Wi-Fi analyzer'], ['Trace cable runs', 'Verify wire map', 'Test a port or adapter', 'Review signal and channels'], [0, 1, 2, 3]],
  ],
  Hardware: [
    ['Match each component to its role.', ['PSU', 'RAM', 'TPM', 'Fuser'], ['Converts AC to DC power', 'Volatile working memory', 'Stores cryptographic keys', 'Bonds toner to paper'], [0, 1, 2, 3]],
  ],
  Security: [
    ['Match each control to its security goal.', ['MFA', 'Full-disk encryption', 'Least privilege', 'MDM remote wipe'], ['Stronger authentication', 'Data-at-rest protection', 'Reduced permission exposure', 'Lost-device data protection'], [0, 1, 2, 3]],
  ],
  'Operating Systems': [
    ['Match each command or tool to its purpose.', ['sfc', 'diskpart', 'sudo', 'Task Manager'], ['Verify protected Windows files', 'Manage disks and partitions', 'Run authorized Linux commands as elevated user', 'View running processes'], [0, 1, 2, 3]],
  ],
}

const orderSets = {
  'Hardware and Network Troubleshooting': [
    ['Place the troubleshooting flow in the best order for a failed network connection.', ['Identify symptoms and scope', 'Check physical link and IP settings', 'Test name resolution and routing', 'Implement the fix and verify connectivity'], [0, 1, 2, 3]],
  ],
  'Software Troubleshooting': [
    ['Place the malware response actions in the best order.', ['Isolate the affected system', 'Identify symptoms and likely malware', 'Remediate and update defenses', 'Verify normal operation and educate the user'], [0, 1, 2, 3]],
  ],
  'Operational Procedures': [
    ['Place the change process in the best order.', ['Document the proposed change', 'Get approval and schedule a window', 'Implement with a rollback plan ready', 'Verify results and close the record'], [0, 1, 2, 3]],
  ],
}

const contexts = [
  'for a remote employee',
  'during a help desk escalation',
  'while preparing a replacement workstation',
  'after a department move',
  'for a small office rollout',
  'during a field-service visit',
  'while resolving a recurring ticket',
  'during a new-hire setup',
  'after a recent configuration change',
  'while supporting a hybrid worker',
  'during an executive device refresh',
  'while onboarding a contractor',
  'for a classroom lab environment',
  'during a warranty repair intake',
  'while validating a spare device',
  'after a power outage',
  'during a branch-office visit',
  'while documenting a repeat failure',
  'for a shared workstation area',
  'while replacing an aging endpoint',
  'during a mobile-device enrollment',
  'after a failed self-service setup',
  'while preparing loaner equipment',
  'for a secure work-from-home kit',
  'during a printer and workstation refresh',
  'while checking a newly imaged system',
  'after a user reports intermittent behavior',
  'during a network closet inspection',
  'while supporting a conference room device',
  'for a technician training scenario',
]

const prompts = [
  'Which action is BEST?',
  'What should the technician do FIRST?',
  'Which choice is the MOST appropriate fix?',
  'Which option best matches the requirement?',
  'What is the most likely correct next step?',
]

function rotateChoices(correct, distractors, offset) {
  const choices = [...distractors]
  const index = offset % 4
  choices.splice(index, 0, correct)
  return { choices, correctAnswer: index }
}

function singleQuestion(prefix, idNum, domain, topic, variant) {
  const [task, correct, distractors, why] = topic
  const { choices, correctAnswer } = rotateChoices(correct, distractors, idNum)
  return {
    id: `${prefix}-${String(idNum).padStart(3, '0')}`,
    domain,
    question: `A technician needs to ${task} ${variant}. ${prompts[idNum % prompts.length]}`,
    choices,
    correctAnswer,
    explanation: why,
  }
}

function multipleResponse(prefix, idNum, domain, topic, variant) {
  const [task, correct, distractors, why] = topic
  return {
    id: `${prefix}-${String(idNum).padStart(3, '0')}`,
    domain,
    type: 'multiple-response',
    question: `A technician is asked to ${task} ${variant}. Which TWO choices best support the requirement?`,
    choices: [correct, `Verify the change after implementation and document the result`, ...distractors.slice(0, 2)],
    correctAnswers: [0, 1],
    explanation: `${why} Verification and documentation confirm the fix and preserve support history.`,
  }
}

function statementBlock(prefix, idNum, domain, topic, variant) {
  const [task, correct, distractors, why] = topic
  return {
    id: `${prefix}-${String(idNum).padStart(3, '0')}`,
    domain,
    type: 'statement-block',
    question: `Review these statements about how to ${task} ${variant}.`,
    statements: [
      correct,
      distractors[0],
      'Documenting the final outcome helps future support work',
    ],
    correctAnswers: [true, false, true],
    explanation: `${why} The incorrect statement describes an unsafe, unrelated, or ineffective action.`,
  }
}

function matchingQuestion(prefix, idNum, domain, variant) {
  const sets = matchSets[domain]
  if (!sets) return null
  const [question, itemsLeft, itemsRight, correctMatches] = sets[idNum % sets.length]
  return {
    id: `${prefix}-${String(idNum).padStart(3, '0')}`,
    domain,
    type: 'matching',
    question: `${question} Use the situation ${variant}.`,
    itemsLeft,
    itemsRight,
    correctMatches,
    explanation: 'Each item maps to the function or tool most commonly associated with that support task.',
  }
}

function orderingQuestion(prefix, idNum, domain, variant) {
  const sets = orderSets[domain]
  if (!sets) return null
  const [question, items, correctOrder] = sets[idNum % sets.length]
  return {
    id: `${prefix}-${String(idNum).padStart(3, '0')}`,
    domain,
    type: 'ordering',
    question: `${question} Use the situation ${variant}.`,
    items,
    correctOrder,
    explanation: 'The safest support workflow starts with scoping, proceeds through controlled action, and ends with verification and documentation.',
  }
}

function generate(prefix, domains) {
  const questions = []
  let idNum = 1
  for (const [domain, count] of domains) {
    const topics = banks[domain]
    for (let i = 0; i < count; i += 1) {
      const topic = topics[i % topics.length]
      const ticket = domain.replace(/[^A-Z]/gi, '').slice(0, 3).toUpperCase()
      const variant = `${contexts[i % contexts.length]} on ticket ${ticket}-${String(i + 1).padStart(3, '0')}`
      const absolute = questions.length + 1
      let q = null
      if (absolute % 17 === 0) q = matchingQuestion(prefix, idNum, domain, variant)
      if (!q && absolute % 19 === 0) q = orderingQuestion(prefix, idNum, domain, variant)
      if (!q && absolute % 11 === 0) q = statementBlock(prefix, idNum, domain, topic, variant)
      if (!q && absolute % 7 === 0) q = multipleResponse(prefix, idNum, domain, topic, variant)
      if (!q) q = singleQuestion(prefix, idNum, domain, topic, variant)
      questions.push(q)
      idNum += 1
    }
  }
  return questions
}

const outputs = [
  ['src/data/comptia-a-plus-core-1-questions.json', generate('aplus-core1', core1Domains)],
  ['src/data/comptia-a-plus-core-2-questions.json', generate('aplus-core2', core2Domains)],
]

for (const [target, questions] of outputs) {
  fs.writeFileSync(path.join(root, target), `${JSON.stringify(questions, null, 2)}\n`)
  console.log(`${target}: ${questions.length}`)
}
