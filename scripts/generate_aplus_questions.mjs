import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  APLUS_OBJECTIVES,
  EXISTING_OBJECTIVE_ASSIGNMENTS,
  PRACTICAL_OBJECTIVE_MAP,
  SUPPLEMENTAL_CONCEPTS,
} from './data/aplus-objectives.mjs'
import { EXTRA_APLUS_PRACTICALS } from './data/aplus-practicals.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const core1Domains = [
  ['Mobile Devices', 96],
  ['Networking', 171],
  ['Hardware', 186],
  ['Virtualization and Cloud Computing', 81],
  ['Hardware and Network Troubleshooting', 206],
]

const core2Domains = [
  ['Operating Systems', 207],
  ['Security', 207],
  ['Software Troubleshooting', 171],
  ['Operational Procedures', 155],
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
  'while investigating a recurring issue',
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

const supportEvidence = {
  'Mobile Devices': {
    assets: ['a managed Windows laptop', 'an Android tablet', 'an iOS phone', 'a USB-C ultrabook', 'a field-service tablet', 'a shared conference-room laptop'],
    scope: ['only the replacement device is affected', 'the same accessory works on another device', 'the issue follows the user to a loaner device', 'the behavior began after a mobile-device refresh', 'the device passes its built-in hardware check', 'the problem appears only when the user is away from the office'],
    constraints: ['corporate data must remain protected', 'the repair must use an approved compatible part', 'the user needs a supported configuration rather than a workaround', 'the device is enrolled in company management', 'the technician must avoid damaging a sealed component', 'the solution must preserve the user profile'],
    impact: ['the user cannot complete remote work', 'battery runtime is below the required shift length', 'the external accessory is unavailable during meetings', 'corporate messaging cannot synchronize', 'the device is unsafe to keep in service', 'the user is blocked from a customer appointment'],
  },
  Networking: {
    assets: ['a wired office workstation', 'a SOHO router', 'a ceiling-mounted access point', 'a VoIP phone', 'a conference-room laptop', 'a newly patched switchport'],
    scope: ['nearby users remain connected', 'the failure occurs on both wired and wireless tests', 'the link light changes when a known-good cable is used', 'IP connectivity works while name resolution fails', 'the client receives different settings on a known-good port', 'only the guest network is affected'],
    constraints: ['internal systems must remain isolated from visitors', 'the fix must preserve secure wireless encryption', 'the technician may change client settings but not the upstream provider', 'the device must receive both data and power over one cable', 'the change must avoid disrupting working users', 'the solution must use the existing Ethernet run'],
    impact: ['the user cannot reach a business application', 'voice calls drop when the device loses network access', 'visitors must have internet access without reaching internal hosts', 'the access point cannot be mounted near an outlet', 'the workstation cannot obtain valid network settings', 'the team cannot identify where traffic stops'],
  },
  Hardware: {
    assets: ['a small-form-factor desktop', 'a graphics workstation', 'a laser printer', 'a virtualization lab host', 'a front-desk workstation', 'a desktop being upgraded'],
    scope: ['the symptom began immediately after component work', 'a known-good external device produces the same result', 'firmware detects the old component but not the replacement', 'the system passes POST before the workload starts', 'the problem appears only under sustained load', 'the replacement must fit the existing chassis and motherboard'],
    constraints: ['the technician must follow ESD precautions', 'the replacement must meet motherboard compatibility limits', 'the system cannot be taken out of service for a full rebuild', 'the upgrade must support the requested workload', 'the fix must not risk socket or connector damage', 'the component must meet the required bandwidth'],
    impact: ['the system cannot boot reliably', 'the workstation misses its performance target', 'printed output cannot be used by customers', 'the computer shuts down during production work', 'the upgrade is not detected by firmware', 'data must remain available during short power interruptions'],
  },
  'Virtualization and Cloud Computing': {
    assets: ['a developer workstation', 'a classroom virtualization host', 'a browser-based business application', 'a test VM', 'a remote training environment', 'a small private-cloud lab'],
    scope: ['the physical host has sufficient CPU and memory', 'the guest must be isolated from production traffic', 'students need to restore a known-good state repeatedly', 'users should not install the application locally', 'the VM needs controlled access to the host network', 'the workload must run independently from the host operating system'],
    constraints: ['snapshots cannot replace the backup policy', 'the virtual network must not expose test services', 'the selected service model must match who manages the application', 'the host must support hardware-assisted virtualization', 'the design must allow quick rollback after risky changes', 'the configuration must preserve network separation'],
    impact: ['a failed exercise must be reset quickly', 'the application must be available from unmanaged endpoints', 'test traffic could disrupt production systems', 'several operating systems must share one physical computer', 'the guest currently has no external connectivity', 'the team needs infrastructure without purchasing physical servers'],
  },
  'Hardware and Network Troubleshooting': {
    assets: ['a recently moved workstation', 'a laptop under load', 'a laser printer', 'a newly upgraded desktop', 'a wired office endpoint', 'a user workstation with intermittent faults'],
    scope: ['the symptom can be reproduced consistently', 'a known-good cable or peripheral has already been tested', 'the issue began after a recent hardware change', 'other devices on the same network work normally', 'the failure appears only when temperature or load increases', 'the firmware and operating system report different device states'],
    constraints: ['the technician should test the least invasive cause first', 'user data must be preserved', 'working infrastructure should not be changed without evidence', 'the repair window is limited', 'the next step must isolate one layer of the problem', 'the technician has one known-good replacement part'],
    impact: ['the endpoint cannot complete startup', 'the user loses connectivity intermittently', 'output quality makes the printer unusable', 'the computer shuts down during demanding work', 'the user can reach IP addresses but not named services', 'the newly installed component is unavailable'],
  },
  'Operating Systems': {
    assets: ['a Windows 11 Pro workstation', 'a Linux support terminal', 'a managed macOS laptop', 'a domain-joined Windows laptop', 'a newly imaged workstation', 'a shared administrative computer'],
    scope: ['the user data is backed up', 'the same account works on another managed device', 'the problem began after an operating-system or driver change', 'the technician has approved administrative credentials', 'the required edition and network connectivity are available', 'the command must change the local system rather than a network service'],
    constraints: ['the technician must use a native supported tool', 'the action must preserve the existing user profile where possible', 'the user should receive only the required privilege', 'the system must remain compatible with organizational policy', 'the change must be repeatable and documented', 'the repair should occur before considering reinstallation'],
    impact: ['the user cannot access required applications', 'the system cannot start normally', 'a routine administrative task takes too long manually', 'the workstation cannot join centralized management', 'protected system files may be damaged', 'the current disk layout does not meet deployment requirements'],
  },
  Security: {
    assets: ['a managed laptop', 'a shared workstation', 'a SOHO wireless router', 'a company phone', 'a remote-access account', 'an endpoint showing suspicious behavior'],
    scope: ['the device contains business data', 'the user reports a suspicious message before opening its attachment', 'the account has access beyond the user’s daily needs', 'the system is still connected to the corporate network', 'the device is enrolled in MDM', 'the current control relies on a password alone'],
    constraints: ['evidence and business data must be protected', 'the response must limit spread before remediation', 'the control must support individual accountability', 'the solution must follow least privilege', 'the device may be permanently lost', 'the technician must not trust unknown removable media'],
    impact: ['an attacker could access cached company information', 'malware could spread to shared resources', 'stolen credentials could permit remote access', 'unauthorized users could reach internal systems', 'the organization cannot attribute activity to one person', 'the user may disclose credentials to an impersonator'],
  },
  'Software Troubleshooting': {
    assets: ['a Windows 11 workstation', 'a managed mobile phone', 'a desktop mail client', 'a browser profile', 'a mapped network drive', 'a line-of-business application'],
    scope: ['the problem affects one application while others work', 'the same account works through a web interface', 'the issue began immediately after an update', 'a newly created user profile does not show the symptom', 'network connectivity to other services is normal', 'the behavior persists after a normal restart'],
    constraints: ['user data and settings should be preserved', 'the technician should capture the error before making broad changes', 'security controls must not be disabled as a permanent fix', 'the repair should isolate profile, application, and system causes', 'the user needs the least disruptive recovery option', 'the fix must be verified under the original user account'],
    impact: ['the application closes before work can be saved', 'the user is redirected away from expected sites', 'the system repeatedly enters recovery', 'a required share is unavailable after sign-in', 'mail works in the browser but not locally', 'startup performance prevents the user from beginning work'],
  },
  'Operational Procedures': {
    assets: ['a production workstation', 'a device containing customer records', 'a warranty replacement laptop', 'a shared workstation image', 'a failed storage device', 'a support case being escalated'],
    scope: ['the technical repair has been verified', 'the action could interrupt other users', 'another technician may need to continue the work', 'the device contains confidential information', 'the change affects a standard configuration', 'the equipment is leaving organizational control'],
    constraints: ['the work must follow change approval', 'documentation must not expose credentials', 'the technician must follow ESD and electrical safety', 'privacy rules limit who may view the data', 'a rollback path must exist before implementation', 'disposal must follow media-sanitization policy'],
    impact: ['future technicians need an accurate repair history', 'an unapproved change could cause an outage', 'improper handling could expose customer data', 'the next support tier could repeat completed work', 'a failed restore would make the backup useless', 'unsafe handling could damage equipment or injure staff'],
  },
}

function buildObjectiveBanks(coreKey) {
  return Object.fromEntries(Object.entries(EXISTING_OBJECTIVE_ASSIGNMENTS[coreKey]).map(([domain, assignments]) => {
    const topics = banks[domain]
    if (!assignments || assignments.length !== topics.length) {
      throw new Error(`${coreKey} ${domain} objective assignments do not match the existing concept count`)
    }
    const tagged = topics.map((topic, index) => [...topic, assignments[index]])
    const supplemental = SUPPLEMENTAL_CONCEPTS[coreKey][domain]
    const allTopics = [...tagged, ...supplemental]
    const objectiveCorrectAnswers = new Map()
    for (const topic of allTopics) {
      const objectiveId = topic[4]
      if (!objectiveCorrectAnswers.has(objectiveId)) objectiveCorrectAnswers.set(objectiveId, [])
      objectiveCorrectAnswers.get(objectiveId).push(topic[1])
    }
    const strengthenedTopics = allTopics.map((topic) => {
      const [task, correct, authoredDistractors, why, objectiveId] = topic
      const candidates = [
        ...authoredDistractors,
        ...objectiveCorrectAnswers.get(objectiveId),
        ...allTopics.filter(candidate => candidate[4] !== objectiveId).map(candidate => candidate[1]),
      ].filter((answer, candidateIndex, answers) =>
        answer !== correct && answers.indexOf(answer) === candidateIndex
      )
      return [task, correct, candidates, why, objectiveId, authoredDistractors]
    })
    return [domain, strengthenedTopics]
  }))
}

const prompts = [
  'Which action is BEST?',
  'What should the technician do FIRST?',
  'Which choice is the MOST appropriate fix?',
  'Which option best matches the requirement?',
  'What is the most likely correct next step?',
]

const neutralObservations = [
  'The technician has documented when the behavior or requirement began',
  'A known-good comparison device or configuration is available',
  'The current configuration and recent changes have been recorded',
  'The symptom or requirement has been confirmed with the user',
  'The technician has the vendor documentation and approved tools',
  'Unrelated systems are working normally and should not be changed',
  'The technician must verify the result under the original conditions',
  'The existing user data and approved configuration must be preserved',
  'The team needs the smallest supported change that satisfies the requirement',
  'The technician has ruled out a simple user-interface misunderstanding',
]

const neutralConstraints = [
  'The action must use a supported, documented method',
  'Working systems and unrelated settings should remain unchanged',
  'The technician should choose the option that directly satisfies the requirement',
  'The result must be verified under the original conditions',
  'The change must preserve user data and approved security controls',
  'The least disruptive effective action is preferred',
  'The technician should avoid replacing unrelated components',
  'The final configuration must remain supportable',
  'The next action should narrow the cause or complete the stated task',
  'The technician must follow vendor guidance and organizational policy',
]

function sentenceCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function inferAsset(task, domain) {
  const text = task.toLowerCase()
  const rules = [
    [/printer|fuser|toner|print/, 'the affected printer'],
    [/phone|smartphone|mobile|tap-to-pay|nfc|hotspot|headset/, 'the managed mobile device'],
    [/laptop|sodimm|battery|trackpad/, 'the affected laptop'],
    [/wi-fi|wireless|access point|soho|guest/, 'the office wireless network'],
    [/patch panel|ethernet|switch port|link light|cable/, 'the affected Ethernet connection'],
    [/dhcp|dns|host names|remote host|traffic takes|network segment/, 'the affected network client'],
    [/cpu|processor|heat sink|thermal paste|memory|motherboard|desktop|workstation|pc /, 'the affected desktop workstation'],
    [/storage|nvme|drive|ssd|file system|partition/, 'the affected computer'],
    [/virtual|hypervisor|saas|iaas|snapshot|vm /, 'the virtualization environment'],
    [/windows|task manager|domain|powershell|system files|blue screen|profile/, 'the Windows workstation'],
    [/linux|sudo|package manager/, 'the Linux workstation'],
    [/macos/, 'the managed Mac'],
    [/browser/, 'the affected browser profile'],
    [/email|mapped drive|application|app /, 'the affected user endpoint'],
    [/malware|phishing|least privilege|mfa|encryption|social engineering|usb/, 'the managed endpoint'],
    [/make a production configuration change/, 'the production environment'],
    [/document a completed repair|escalate an issue/, 'the support record'],
    [/dispose of an old drive/, 'the retired storage device'],
    [/communicate|confidential|backup/, 'the support workflow'],
  ]
  return rules.find(([pattern]) => pattern.test(text))?.[1]
    || supportEvidence[domain].assets[0]
}

function targetPhrase(asset) {
  return /environment|network|workflow|record/.test(asset)
    ? `within ${asset}`
    : `on ${asset}`
}

const domainGuidance = {
  'Mobile Devices': 'Prefer an approved, compatible mobile component or managed setting; unrelated desktop and network changes do not correct the stated mobile requirement.',
  Networking: 'Work from the relevant network layer and preserve segmentation and security; operating-system disk tools do not diagnose network reachability.',
  Hardware: 'Verify compatibility, power, seating, cooling, and interface requirements before replacing unrelated components.',
  'Virtualization and Cloud Computing': 'Match the hypervisor, virtual network, snapshot, or service model to the stated ownership and isolation requirement.',
  'Hardware and Network Troubleshooting': 'Use the symptom and prior checks to isolate the smallest likely fault before replacing unrelated hardware or changing working infrastructure.',
  'Operating Systems': 'Choose the supported native operating-system tool and least disruptive recovery path before reinstalling or changing unrelated network hardware.',
  Security: 'Contain active risk and apply least privilege, encryption, strong authentication, and approved policy instead of weakening controls for convenience.',
  'Software Troubleshooting': 'Use the scope and recent change to distinguish application, profile, operating-system, and network causes before making broad changes.',
  'Operational Procedures': 'Protect people, data, and service continuity through approval, documentation, privacy, safety, rollback, and verified completion.',
}

const domainChecks = {
  'Mobile Devices': [
    'the approved part, accessory, account, or managed setting works on the affected mobile device',
    'charging, synchronization, display, wireless, and peripheral behavior meet the original requirement',
  ],
  Networking: [
    'link, addressing, gateway, name-resolution, service, and segmentation tests match the intended network design',
    'the affected client reaches the required service without disrupting working users or weakening security',
  ],
  Hardware: [
    'firmware detects the compatible component and the system passes a functional test under the intended workload',
    'power, cooling, interface, capacity, and device-status evidence remain normal after the change',
  ],
  'Virtualization and Cloud Computing': [
    'the workload has the required isolation, connectivity, rollback, and service-management behavior',
    'the guest or cloud application meets the requirement without exposing unrelated systems or replacing backup controls',
  ],
  'Hardware and Network Troubleshooting': [
    'the original symptom is absent and a direct power, POST, thermal, storage, display, print, or network test now passes',
    'the repair resolves the failing layer without changing unrelated working components or infrastructure',
  ],
  'Operating Systems': [
    'the native tool, command, log, account, file-system, or operating-system setting shows the intended state',
    'the original user workflow succeeds while data, permissions, and supported configuration remain intact',
  ],
  Security: [
    'the active risk is contained and logs, policy, encryption, authentication, or endpoint status show the intended protection',
    'authorized access still works while unapproved access, malware activity, or data exposure is blocked',
  ],
  'Software Troubleshooting': [
    'the application, profile, service, browser, mobile app, or account works under the original conditions',
    'logs and comparison tests confirm the focused repair without permanently disabling security controls',
  ],
  'Operational Procedures': [
    'approval, implementation, validation, rollback, safety, privacy, asset, and closure records are complete where required',
    'the work is supportable by the next technician without exposing credentials or confidential data',
  ],
}

function rotateChoices(correct, distractors, offset) {
  const choices = [...distractors]
  const index = offset % 4
  choices.splice(index, 0, correct)
  return { choices, correctAnswer: index }
}

function greatestCommonDivisor(a, b) {
  let x = a
  let y = b
  while (y !== 0) {
    const remainder = x % y
    x = y
    y = remainder
  }
  return x
}

function contextStepFor(topicCount) {
  for (let step = 1; step < contexts.length; step += 1) {
    if (greatestCommonDivisor(step + topicCount, contexts.length) === 1) return step
  }
  return 1
}

function isSymptom(task) {
  return /^(a|an|users|windows|email)\b/i.test(task)
}

function scenarioStem(task, variant, prompt) {
  const evidence = `${variant.observation}. ${variant.constraint}.`
  if (isSymptom(task)) {
    return `${sentenceCase(variant.context)}, ${variant.asset} shows this symptom: ${task}. ${evidence} ${prompt}`
  }
  return `${sentenceCase(variant.context)}, a technician needs to ${task} ${targetPhrase(variant.asset)}. ${evidence} ${prompt}`
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

function distractorReview(distractors, domain) {
  return distractors
    .map((distractor) => `"${distractor}" is unsafe, unrelated, or does not directly satisfy the stated requirement.`)
    .join(' ')
    + ` ${domainGuidance[domain]}`
}

function explanationFor(correct, distractors, why, check, domain) {
  return `Why this is right: ${why} The best answer is "${correct}" because it directly addresses the observed requirement. `
    + `Why the other choices are wrong: ${distractorReview(distractors, domain)} `
    + `Verification: ${sentenceCase(check)}.`
}

function selectDistractors(topic, occurrence) {
  const candidates = topic[2]
  const authored = topic[5]
  if (candidates.length < 3) throw new Error(`Concept "${topic[0]}" has fewer than three distractors`)
  const selected = [authored[occurrence % authored.length]]
  const combination = Math.floor(occurrence / authored.length)
  const preferredIndices = [
    combination % candidates.length,
    Math.floor(combination / candidates.length) % candidates.length,
  ]
  for (const index of preferredIndices) {
    const candidate = candidates[index]
    if (!selected.includes(candidate)) selected.push(candidate)
  }
  let index = combination + 1
  while (selected.length < 3) {
    const candidate = candidates[index % candidates.length]
    if (!selected.includes(candidate)) selected.push(candidate)
    index += 1
  }
  return selected
}

function answerInteractionSignature(question) {
  if (question.type === 'multiple-response') {
    return `multiple-response|${[...question.choices].sort().join('|')}`
  }
  return `single-choice|${[...question.choices].sort().join('|')}`
}

function singleQuestion(prefix, idNum, domain, topic, variant) {
  const [task, correct, distractors, why, objectiveId] = topic
  const { choices, correctAnswer } = rotateChoices(correct, distractors, idNum)
  const checks = domainChecks[domain]
  const check = checks[(variant.occurrence + variant.conceptIndex) % checks.length]
  return {
    id: `${prefix}-${String(idNum).padStart(3, '0')}`,
    domain,
    objectiveId,
    conceptId: `${prefix}-${objectiveId}-${String(variant.conceptIndex + 1).padStart(2, '0')}`,
    question: scenarioStem(task, variant, prompts[idNum % prompts.length]),
    choices,
    correctAnswer,
    explanation: explanationFor(correct, distractors, why, check, domain),
  }
}

function multipleResponse(prefix, idNum, domain, topic, variant) {
  const [task, correct, distractors, why, objectiveId] = topic
  const checks = domainChecks[domain]
  const companion = sentenceCase(checks[idNum % checks.length])
  const answerChoices = [correct, companion, ...distractors.slice(0, 2)]
  const rotation = idNum % answerChoices.length
  const choices = [...answerChoices.slice(rotation), ...answerChoices.slice(0, rotation)]
  const correctAnswers = [correct, companion].map(answer => choices.indexOf(answer)).sort((a, b) => a - b)
  return {
    id: `${prefix}-${String(idNum).padStart(3, '0')}`,
    domain,
    objectiveId,
    conceptId: `${prefix}-${objectiveId}-${String(variant.conceptIndex + 1).padStart(2, '0')}`,
    type: 'multiple-response',
    question: isSymptom(task)
      ? `${sentenceCase(variant.context)}, ${variant.asset} shows this symptom: ${task}. Which TWO choices best support the response?`
      : `${sentenceCase(variant.context)}, a technician is asked to ${task} ${targetPhrase(variant.asset)}. Which TWO choices best support the requirement?`,
    choices,
    correctAnswers,
    explanation: explanationFor(
      correct,
      distractors.slice(0, 2),
      `${why} A complete response also confirms that ${checks[idNum % checks.length]}.`,
      checks[(idNum + 1) % checks.length],
      domain,
    ),
  }
}

function statementBlock(prefix, idNum, domain, topic, variant) {
  const [task, correct, distractors, why, objectiveId] = topic
  return {
    id: `${prefix}-${String(idNum).padStart(3, '0')}`,
    domain,
    objectiveId,
    conceptId: `${prefix}-${objectiveId}-${String(variant.conceptIndex + 1).padStart(2, '0')}`,
    type: 'statement-block',
    question: isSymptom(task)
      ? `${sentenceCase(variant.context)}, ${variant.asset} shows this symptom: ${task}. ${variant.observation}. Review the statements against the observed evidence.`
      : `${sentenceCase(variant.context)}, a technician must ${task} ${targetPhrase(variant.asset)}. ${variant.constraint}. Review the statements against the requirement.`,
    statements: [
      correct,
      distractors[0],
      'Documenting the final outcome helps future support work',
    ],
    correctAnswers: [true, false, true],
    explanation: `${why} The incorrect statement describes an unsafe, unrelated, or ineffective action. ${domainGuidance[domain]}`,
  }
}

function matchingQuestion(prefix, idNum, domain, topic, variant) {
  const sets = matchSets[domain]
  if (!sets) return null
  const objectiveId = topic[4]
  const [question, itemsLeft, itemsRight, correctMatches] = sets[idNum % sets.length]
  const shuffled = shuffleWithMatches(itemsRight, idNum)
  return {
    id: `${prefix}-${String(idNum).padStart(3, '0')}`,
    domain,
    objectiveId,
    conceptId: `${prefix}-${objectiveId}-${String(variant.conceptIndex + 1).padStart(2, '0')}`,
    type: 'matching',
    question: `${question} The work involves ${variant.asset} ${variant.context}; ${variant.constraint.toLowerCase()}.`,
    itemsLeft,
    itemsRight: shuffled.itemsRight,
    correctMatches: correctMatches.map(match => shuffled.correctMatches[match]),
    explanation: `Each item maps to the function or tool most commonly associated with that support task. ${domainGuidance[domain]}`,
  }
}

function orderingQuestion(prefix, idNum, domain, topic, variant) {
  const sets = orderSets[domain]
  if (!sets) return null
  const objectiveId = topic[4]
  const [question, items, correctOrder] = sets[idNum % sets.length]
  return {
    id: `${prefix}-${String(idNum).padStart(3, '0')}`,
    domain,
    objectiveId,
    conceptId: `${prefix}-${objectiveId}-${String(variant.conceptIndex + 1).padStart(2, '0')}`,
    type: 'ordering',
    question: `${question} The technician is working on ${variant.asset} ${variant.context}; ${variant.constraint.toLowerCase()}.`,
    items,
    correctOrder,
    explanation: `The safest support workflow starts with scoping, proceeds through controlled action, and ends with verification and documentation. ${domainGuidance[domain]}`,
  }
}

function generate(prefix, domains, coreKey) {
  const questions = []
  const interactionSignatures = new Set()
  const objectiveBanks = buildObjectiveBanks(coreKey)
  let idNum = 1
  for (const [domain, count] of domains) {
    const topics = objectiveBanks[domain]
    const topicOccurrences = new Map()
    const contextStep = contextStepFor(topics.length)
    for (let i = 0; i < count; i += 1) {
      const topic = topics[i % topics.length]
      const task = topic[0]
      const occurrence = topicOccurrences.get(task) || 0
      topicOccurrences.set(task, occurrence + 1)
      const variant = {
        asset: inferAsset(task, domain),
        conceptIndex: i % topics.length,
        occurrence,
        observation: neutralObservations[(occurrence * 3 + i) % neutralObservations.length],
        constraint: neutralConstraints[(occurrence * 5 + i) % neutralConstraints.length],
        context: contexts[(occurrence * contextStep + i) % contexts.length],
      }
      const absolute = questions.length + 1
      let q = null
      for (let attempt = 0; attempt < 100; attempt += 1) {
        const variedTopic = [
          topic[0],
          topic[1],
          selectDistractors(topic, occurrence + attempt),
          topic[3],
          topic[4],
        ]
        q = absolute % 7 === 0
          ? multipleResponse(prefix, idNum, domain, variedTopic, variant)
          : singleQuestion(prefix, idNum, domain, variedTopic, variant)
        if (!interactionSignatures.has(answerInteractionSignature(q))) break
      }
      const signature = answerInteractionSignature(q)
      if (interactionSignatures.has(signature)) {
        throw new Error(`${prefix} could not create a unique answer interaction for ${q.id}`)
      }
      interactionSignatures.add(signature)
      questions.push(q)
      idNum += 1
    }
  }
  return questions
}

const outputs = [
  ['core1', 'src/data/comptia-a-plus-core-1-questions.json', generate('aplus-core1', core1Domains, 'core1')],
  ['core2', 'src/data/comptia-a-plus-core-2-questions.json', generate('aplus-core2', core2Domains, 'core2')],
]

for (const [coreKey, target, questions] of outputs) {
  const targetPath = path.join(root, target)
  const existing = JSON.parse(fs.readFileSync(targetPath, 'utf8'))
  const preservedPracticals = existing.filter(question =>
    question.type === 'pbq-matching' && PRACTICAL_OBJECTIVE_MAP[question.id]
  )
  const practicalQuestions = [
    ...preservedPracticals,
    ...EXTRA_APLUS_PRACTICALS[coreKey],
  ].map((question, index) => {
    const [domain, objectiveId] = PRACTICAL_OBJECTIVE_MAP[question.id] || []
    return {
      ...question,
      domain: domain || question.domain,
      objectiveId: objectiveId || question.objectiveId,
      conceptId: `${question.id}-practical-${String(index + 1).padStart(2, '0')}`,
    }
  })
  const completeBank = [...questions, ...practicalQuestions]
  const normalizedStems = new Set(completeBank.map(question =>
    question.question
      .toLowerCase()
      .replace(/`[^`]+`/g, '<code>')
      .replace(/\d+/g, '#')
      .replace(/[^a-z#<>]+/g, ' ')
      .trim()
  ))
  if (completeBank.length !== 760) throw new Error(`${target} expected 760 questions`)
  if (practicalQuestions.length !== 20) throw new Error(`${target} expected 20 PBQ-lite questions`)
  if (normalizedStems.size !== completeBank.length) {
    throw new Error(`${target} contains normalized duplicate stems`)
  }
  if (questions.some(question => /\bticket\b/i.test(question.question))) {
    throw new Error(`${target} generated questions contain ticket framing`)
  }
  const requiredObjectives = Object.values(APLUS_OBJECTIVES[coreKey]).flat()
  const objectiveCounts = new Map(requiredObjectives.map(objectiveId => [objectiveId, 0]))
  const conceptCounts = new Map(requiredObjectives.map(objectiveId => [objectiveId, new Set()]))
  for (const question of completeBank) {
    if (!objectiveCounts.has(question.objectiveId)) {
      throw new Error(`${target} has invalid objective ${question.objectiveId} on ${question.id}`)
    }
    objectiveCounts.set(question.objectiveId, objectiveCounts.get(question.objectiveId) + 1)
    conceptCounts.get(question.objectiveId).add(question.conceptId)
  }
  const uncovered = requiredObjectives.filter(objectiveId => objectiveCounts.get(objectiveId) === 0)
  const thin = requiredObjectives.filter(objectiveId => conceptCounts.get(objectiveId).size < 2)
  if (uncovered.length) throw new Error(`${target} uncovered objectives: ${uncovered.join(', ')}`)
  if (thin.length) throw new Error(`${target} objectives with fewer than two concepts: ${thin.join(', ')}`)
  if (completeBank.some(question => question.type === 'multiple-response'
    && question.choices.some(choice => choice === 'Verify the change after implementation and document the result'))) {
    throw new Error(`${target} contains the retired generic multiple-response answer`)
  }
  fs.writeFileSync(targetPath, `${JSON.stringify(completeBank, null, 2)}\n`)
  console.log(`${target}: ${completeBank.length} (${practicalQuestions.length} preserved PBQs)`)
}
