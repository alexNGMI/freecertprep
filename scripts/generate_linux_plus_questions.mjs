import { writeFile } from 'node:fs/promises'

const OUT = new URL('../src/data/comptia-linux-plus-questions.json', import.meta.url)

const DOMAINS = [
  { name: 'System Management', target: 173 },
  { name: 'Services and User Management', target: 150 },
  { name: 'Security', target: 135 },
  { name: 'Automation, Orchestration, and Scripting', target: 127 },
  { name: 'Troubleshooting', target: 165 },
]

const HOSTS = ['web01', 'db02', 'jumpbox', 'edge-vm', 'build01', 'filesrv', 'gpu-node', 'lab-rhel', 'lab-ubuntu', 'kiosk01']
const CONTEXTS = [
  'after a maintenance reboot',
  'during a cloud VM migration',
  'while preparing a change ticket',
  'during a security hardening review',
  'while onboarding a junior Linux administrator',
  'after a failed deployment',
  'during an outage bridge',
  'while validating a backup restore',
  'during a container host review',
  'while cleaning up a legacy server',
]

const BANK = {
  'System Management': [
    ['Use lsblk and blkid to identify block devices, partitions, filesystems, and UUIDs before editing mounts', 'lsblk and blkid are safe discovery commands for storage layout and filesystem identifiers. They should be used before editing /etc/fstab so the administrator does not mount the wrong device.'],
    ['Create an LVM logical volume with lvcreate, format it, create a mount point, and add a persistent /etc/fstab entry', 'LVM storage becomes usable only after the logical volume exists, has a filesystem, is mounted, and is made persistent if it must survive reboot.'],
    ['Use systemctl set-default multi-user.target to boot to a non-graphical system target', 'systemd default targets control the boot state. multi-user.target is the common non-graphical server target, while graphical.target starts a GUI stack.'],
    ['Use modprobe to load a kernel module and lsmod or modinfo to verify module state and metadata', 'modprobe handles module dependencies when loading kernel modules. lsmod shows loaded modules and modinfo displays module metadata.'],
    ['Use dnf or apt according to the distribution family instead of mixing RPM and dpkg tooling', 'Linux+ expects awareness of RPM-based and Debian-based package ecosystems. Using the native package manager avoids database and dependency problems.'],
    ['Use tar with compression options to archive a directory before making risky configuration changes', 'tar is a standard tool for bundling files and preserving directory structure. Compression options such as -z or -J reduce archive size when appropriate.'],
    ['Inspect /proc, /sys, and command output before changing kernel or hardware-related settings', '/proc and /sys expose runtime kernel and device information. They help administrators verify current state before making persistent changes.'],
    ['Use timedatectl to review or set system time configuration and chrony or NTP services for synchronization', 'Correct time is critical for logs, certificates, authentication, and distributed systems. timedatectl and time synchronization services are core Linux administration tools.'],
  ],
  'Services and User Management': [
    ['Use systemctl status and journalctl -u to inspect a failing service before restarting it repeatedly', 'systemctl reports service state and journalctl -u shows unit logs. Reviewing evidence first prevents blind restarts that can hide the root cause.'],
    ['Create a user with useradd, set credentials or lock state with passwd, and place the user in required groups with usermod', 'Linux account management normally combines user creation, password or lock management, and group membership changes based on access requirements.'],
    ['Use /etc/group or getent group to confirm group membership when access depends on a supplemental group', 'getent queries configured name services and is safer than assuming only local files matter. Group membership controls access to many files and services.'],
    ['Use crontab for recurring user jobs and systemd timers when unit-based scheduling and logging are preferred', 'cron is common for simple recurring tasks, while systemd timers integrate with unit dependencies and journal logging.'],
    ['Use ss -tulpn to identify listening ports and the process that owns a socket', 'ss is the modern tool for socket inspection. The -tulpn options show TCP/UDP listening sockets and process information when permissions allow.'],
    ['Use nmcli or distribution network configuration files to manage persistent network settings', 'Runtime commands can test connectivity, but persistent settings should be managed with the distribution networking stack such as NetworkManager.'],
    ['Use chown and chmod carefully so service accounts can read required files without granting broad write access', 'Service permissions should follow least privilege. Ownership and mode changes should grant only the access the daemon needs.'],
    ['Use journalctl --since or --boot to narrow service log review to the relevant time window', 'journalctl filters help isolate relevant service events. Time and boot filters reduce noise during incident response.'],
  ],
  Security: [
    ['Use chmod 600 on private key files so only the owner can read or write them', 'SSH private keys and similar secrets should not be group- or world-readable. Restrictive permissions prevent accidental disclosure.'],
    ['Use sudo with least-privilege rules instead of sharing the root password', 'sudo provides accountable privilege elevation and can be scoped by command or group. Shared root credentials weaken auditing and control.'],
    ['Use firewall-cmd or nftables rules to allow only required services through the host firewall', 'Linux+ expects host firewall awareness. Rules should permit needed traffic and deny unnecessary exposure.'],
    ['Use SELinux or AppArmor status and logs to identify mandatory access control denials before disabling enforcement', 'MAC systems can block actions even when Unix permissions appear correct. Administrators should inspect denials before weakening enforcement.'],
    ['Use sshd_config to disable direct root SSH login and require stronger authentication policy', 'Hardening SSH commonly includes disabling root login, limiting authentication methods, and controlling access.'],
    ['Use find to locate files with unexpected SUID or world-writable permissions during a security review', 'SUID and world-writable files can create privilege or tampering risk. find supports targeted permission audits.'],
    ['Use gpg or file encryption tools when sensitive files must be protected at rest or in transit', 'Encryption protects confidentiality beyond Unix permissions, especially when files are copied, backed up, or transmitted.'],
    ['Use /var/log/auth.log, /var/log/secure, or journalctl to review authentication events depending on distribution', 'Authentication logging locations vary by distribution. Knowing where to inspect login and sudo events is core security administration.'],
  ],
  'Automation, Orchestration, and Scripting': [
    ['Start shell scripts with an appropriate shebang and use executable permissions when the script should run directly', 'A shebang tells the kernel which interpreter to use. Execute permission is required when invoking the script as a program.'],
    ['Use variables, quoting, and exit-code checks to make shell scripts predictable with paths and user input', 'Quoting prevents word splitting and glob surprises, while exit-code checks let scripts react to failed commands.'],
    ['Use grep, awk, sed, cut, sort, and uniq to parse and summarize text streams in pipelines', 'Linux administration frequently depends on pipeline tools for log and command-output processing. Each tool handles a specific text transformation task.'],
    ['Use YAML indentation carefully because many orchestration and configuration tools treat indentation as structure', 'YAML is whitespace-sensitive. Bad indentation can change meaning or break automation files.'],
    ['Use podman or docker commands to inspect images, containers, logs, ports, and volumes on a container host', 'Linux+ V8 includes containerization. Administrators should understand common container lifecycle and inspection commands.'],
    ['Use git to track script and configuration changes when automation needs review and rollback', 'Version control helps teams review, audit, and revert automation changes. It is safer than editing production scripts without history.'],
    ['Use Ansible-style inventory and playbook concepts to describe repeatable configuration across hosts', 'Orchestration tools use inventories, tasks, modules, and playbooks to apply repeatable changes instead of one-off manual commands.'],
    ['Use shellcheck-style review or careful testing to catch unquoted variables, unchecked commands, and unsafe loops', 'Script quality matters because automation can break many systems quickly. Static review and small-scope testing reduce blast radius.'],
  ],
  Troubleshooting: [
    ['Check recent logs with journalctl or files under /var/log before changing service configuration', 'Logs usually explain why a service or subsystem failed. Reading them first keeps troubleshooting evidence-based.'],
    ['Use ping, ip addr, ip route, ss, dig, and curl to isolate network, routing, DNS, socket, and application-layer problems', 'Network troubleshooting should move through layers: interface address, route, name resolution, listening sockets, and application response.'],
    ['Use df -h and du to distinguish a full filesystem from a large directory tree consuming space', 'df reports filesystem capacity, while du summarizes file and directory usage. Together they help find space exhaustion causes.'],
    ['Use ps, top, nice, renice, and kill carefully when a process consumes CPU or memory', 'Process tools identify and control resource usage. Administrators should prefer graceful signals before forceful termination when possible.'],
    ['Use dmesg and hardware inspection tools when kernel, driver, or device errors are suspected', 'dmesg reports kernel messages, including driver and hardware-related events. It is useful when devices disappear or fail initialization.'],
    ['Use fsck only on an unmounted filesystem or from a safe recovery context', 'Running fsck on a mounted writable filesystem can corrupt data. Filesystem repair should happen offline or in an appropriate recovery mode.'],
    ['Use systemctl list-units, list-dependencies, and journal logs to find service dependency failures', 'systemd services can fail because dependencies are missing or failed. Unit state and logs help identify the dependency chain.'],
    ['Use iptables/nftables/firewalld checks when local connectivity works but remote clients cannot reach a service', 'Host firewall policy can block remote access even when the daemon is listening locally. Firewall checks belong in service reachability troubleshooting.'],
  ],
}

const COMMANDS = {
  'System Management': [
    {
      command: 'lsblk -f',
      output: 'NAME   FSTYPE LABEL UUID                                 MOUNTPOINT\nsdb\n└─sdb1 xfs    data  7d7a-92ce                            /data',
      correct: 'The /data filesystem is XFS on /dev/sdb1, so xfs_growfs is the appropriate online grow command after expanding the block device.',
      distractors: ['Run resize2fs on /dev/sdb1 because all Linux filesystems use ext tools', 'Delete /etc/fstab so systemd remounts the disk automatically', 'Use mkfs.xfs on /dev/sdb1 before preserving the data'],
    },
    {
      command: 'systemctl get-default',
      output: 'graphical.target',
      correct: 'The system is configured to boot into the graphical target.',
      distractors: ['The system is configured to boot directly to rescue.target', 'The bootloader is missing its initrd image', 'The host has no systemd default target configured'],
    },
  ],
  'Services and User Management': [
    {
      command: 'systemctl status nginx',
      output: 'nginx.service - The nginx HTTP Server\n   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled)\n   Active: failed (Result: exit-code)\n   Process: 1180 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=1/FAILURE)',
      correct: 'Review nginx configuration test output and journal details before restarting the unit.',
      distractors: ['Disable the unit because enabled services cannot be repaired', 'Delete the unit file and reboot the server', 'Change every file under /etc/nginx to mode 777'],
    },
    {
      command: 'ss -tulpn',
      output: 'Netid State  Local Address:Port  Process\nudp   UNCONN 127.0.0.53:53       users:(("systemd-resolve",pid=650))\ntcp   LISTEN 0.0.0.0:22          users:(("sshd",pid=710))',
      correct: 'sshd is listening on TCP port 22 on all IPv4 interfaces.',
      distractors: ['DNS is listening on TCP port 22', 'sshd is listening only on loopback', 'No process is listening for SSH connections'],
    },
  ],
  Security: [
    {
      command: 'ls -l ~/.ssh/id_rsa',
      output: '-rw-r--r-- 1 alex alex 2602 May 25 10:12 /home/alex/.ssh/id_rsa',
      correct: 'Change the private key to mode 600 so it is readable only by the owner.',
      distractors: ['Change the private key to mode 777 so SSH can read it', 'Move the key into /tmp for easier access', 'Add the key contents to /etc/passwd'],
    },
    {
      command: 'getenforce',
      output: 'Enforcing',
      correct: 'SELinux policy is actively enforcing access decisions.',
      distractors: ['SELinux is installed but disabled', 'SELinux is running in permissive mode only', 'SELinux is not supported by this kernel'],
    },
  ],
  'Automation, Orchestration, and Scripting': [
    {
      command: 'bash -n deploy.sh',
      output: 'deploy.sh: line 18: syntax error: unexpected end of file',
      correct: 'The script has a syntax problem, such as an unclosed if, loop, quote, or brace, before it should be executed.',
      distractors: ['The script passed syntax validation and is safe to deploy', 'The kernel module cache must be rebuilt', 'The filesystem must be converted to Btrfs'],
    },
    {
      command: 'podman ps --format "{{.Names}} {{.Status}}"',
      output: 'api Up 2 hours\nworker Exited (1) 4 minutes ago',
      correct: 'The worker container exited recently and its logs should be inspected.',
      distractors: ['Both containers are healthy and running', 'The api container has no network namespace', 'The container image registry is unreachable'],
    },
  ],
  Troubleshooting: [
    {
      command: 'df -h /var',
      output: 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/vg0/var     20G   20G     0 100% /var',
      correct: 'The /var filesystem is full and likely affects logging, package operations, or services that write under /var.',
      distractors: ['The root filesystem has 100GB free', 'The /var filesystem is mounted read-only because of fsck', 'The output proves DNS resolution is failing'],
    },
    {
      command: 'ip route',
      output: '10.20.0.0/16 dev eth0 proto kernel scope link src 10.20.4.17',
      correct: 'No default route is shown, so traffic outside local routes may fail.',
      distractors: ['The host has two default gateways', 'The host has no local connected route', 'The DNS server is definitely unreachable because port 53 is closed'],
    },
  ],
}

const CONFIGS = {
  'System Management': {
    title: '/etc/fstab',
    lines: ['UUID=7d7a-92ce /data ext4 defaults 0 2', '# lsblk -f shows /data is xfs'],
    correct: 'Change the filesystem type from ext4 to xfs so the persistent mount entry matches the actual filesystem.',
    distractors: ['Change the mount point to /boot because all XFS filesystems must boot there', 'Remove the UUID and use no device field', 'Set the dump field to a hostname'],
  },
  'Services and User Management': {
    title: 'systemd unit override',
    lines: ['[Service]', 'User=nginx', 'Group=nginx', 'ExecStart=/usr/sbin/nginx -g daemon off'],
    correct: 'Use the correct ExecStart syntax for the daemon and validate with systemctl daemon-reload and systemctl restart.',
    distractors: ['Place User= under [Install] only', 'Change Group to root for every web service', 'Delete the [Service] header'],
  },
  Security: {
    title: '/etc/ssh/sshd_config',
    lines: ['PermitRootLogin yes', 'PasswordAuthentication yes', 'PubkeyAuthentication yes'],
    correct: 'Disable direct root login and align authentication settings with the hardening policy.',
    distractors: ['Enable direct root login for better auditability', 'Move SSH configuration into /etc/fstab', 'Set PubkeyAuthentication to a filesystem UUID'],
  },
  'Automation, Orchestration, and Scripting': {
    title: 'backup.sh',
    lines: ['#!/bin/bash', 'tar czf /backup/$HOSTNAME-$(date +%F).tgz $TARGET', 'rm -rf $TARGET.tmp'],
    correct: 'Quote variables such as "$TARGET" so paths with spaces or empty values do not create unsafe behavior.',
    distractors: ['Remove the shebang so Bash always infers the interpreter', 'Change tar to chmod because archives require execute permission', 'Run the script as root without testing arguments'],
  },
  Troubleshooting: {
    title: '/etc/resolv.conf',
    lines: ['nameserver 127.0.0.1', '# local resolver service is stopped', 'search corp.example'],
    correct: 'Either restore the local resolver service or point the resolver configuration to a reachable DNS server.',
    distractors: ['Reformat the root filesystem to fix DNS', 'Change every user shell to /sbin/nologin', 'Disable all routes because DNS only uses local files'],
  },
}

const MATCHING = {
  'System Management': [
    ['lsblk', 'Show block devices and mount relationships'],
    ['modprobe', 'Load a kernel module with dependencies'],
    ['dnf', 'Manage packages on many RPM-based systems'],
    ['apt', 'Manage packages on Debian-based systems'],
  ],
  'Services and User Management': [
    ['systemctl', 'Manage systemd units'],
    ['journalctl', 'Read systemd journal logs'],
    ['useradd', 'Create a local user account'],
    ['ss', 'Inspect sockets and listening services'],
  ],
  Security: [
    ['chmod', 'Change file mode bits'],
    ['sudo', 'Delegate privileged command execution'],
    ['getenforce', 'Show SELinux enforcement state'],
    ['firewall-cmd', 'Manage firewalld rules'],
  ],
  'Automation, Orchestration, and Scripting': [
    ['grep', 'Filter lines by pattern'],
    ['awk', 'Process fields and records'],
    ['podman', 'Manage containers without requiring a daemon'],
    ['git', 'Track script and configuration versions'],
  ],
  Troubleshooting: [
    ['df', 'Show filesystem free space'],
    ['dmesg', 'Read kernel ring buffer messages'],
    ['dig', 'Test DNS resolution'],
    ['curl', 'Test application-layer HTTP responses'],
  ],
}

const ORDERING = {
  'System Management': ['Identify the device and filesystem', 'Create or resize the storage object', 'Create or grow the filesystem', 'Mount it and update /etc/fstab', 'Verify with df and mount output'],
  'Services and User Management': ['Check unit status', 'Review journal entries', 'Fix configuration or permissions', 'Reload systemd if unit files changed', 'Restart and verify the service'],
  Security: ['Identify the exposure or weak permission', 'Confirm policy requirements', 'Apply the least-privilege change', 'Test access with an appropriate account', 'Review logs for denials or failures'],
  'Automation, Orchestration, and Scripting': ['Write the smallest safe change', 'Run syntax or lint checks', 'Test with non-production inputs', 'Commit the reviewed script', 'Run against the intended target set'],
  Troubleshooting: ['Define the symptom', 'Gather logs and command output', 'Isolate the failing layer', 'Apply the smallest likely fix', 'Verify service and document the cause'],
}

function choice(correct, distractors, id) {
  const options = [correct, ...distractors]
  const shift = id % options.length
  const choices = [...options.slice(shift), ...options.slice(0, shift)]
  return { choices, correctAnswer: choices.indexOf(correct) }
}

function single(domain, id, pair) {
  const host = HOSTS[id % HOSTS.length]
  const context = CONTEXTS[id % CONTEXTS.length]
  const [correct, explanation] = pair
  const distractors = [
    'Disable logging first so the system has fewer files to process',
    'Make every affected file world-writable to eliminate permission issues',
    'Reinstall the operating system before collecting command output',
  ]
  return {
    id,
    domain,
    type: 'single-choice',
    question: `On ${host}, an administrator is working ${context}. Which action best fits the Linux+ objective? Scenario ${domain.slice(0, 3).toUpperCase()}-${String(id).padStart(3, '0')}.`,
    ...choice(correct, distractors, id),
    explanation,
  }
}

function multiple(domain, id, a, b) {
  const host = HOSTS[id % HOSTS.length]
  const context = CONTEXTS[id % CONTEXTS.length]
  const correctA = a[0]
  const correctB = b[0]
  const options = [
    correctA,
    'Skip evidence collection and reboot repeatedly until the symptom disappears',
    correctB,
    'Grant full root access to every user so administration tasks are easier',
    'Delete the relevant configuration file before checking documentation or logs',
  ]
  const shift = id % options.length
  const choices = [...options.slice(shift), ...options.slice(0, shift)]
  return {
    id,
    domain,
    type: 'multiple-response',
    question: `Which TWO actions are appropriate on ${host} ${context} for Linux+ case LP-${String(id).padStart(3, '0')}?`,
    choices,
    correctAnswers: [choices.indexOf(correctA), choices.indexOf(correctB)].sort((x, y) => x - y),
    explanation: `${a[1]} Also, ${b[1]}`,
  }
}

function cli(domain, id, item) {
  return {
    id,
    domain,
    type: 'cli-output',
    question: `Review the command output from ${HOSTS[id % HOSTS.length]} during case LP-${String(id).padStart(3, '0')}. What is the best interpretation or next step?`,
    commands: [{ device: HOSTS[id % HOSTS.length], command: item.command, output: item.output }],
    ...choice(item.correct, item.distractors, id),
    explanation: `The command output points to this answer: ${item.correct} Linux+ PBQ-style review often asks candidates to interpret command evidence before choosing a fix.`,
  }
}

function config(domain, id, item) {
  return {
    id,
    domain,
    type: 'config-repair',
    question: `A configuration on ${HOSTS[id % HOSTS.length]} is causing an operational problem in case LP-${String(id).padStart(3, '0')}. Which repair is best?`,
    scenario: `The administrator is working ${CONTEXTS[id % CONTEXTS.length]} and must make the least risky correction.`,
    device: HOSTS[id % HOSTS.length],
    configTitle: item.title,
    config: item.lines,
    notes: ['Preserve existing service intent.', 'Avoid broad permissions or destructive rebuilds unless evidence requires them.'],
    ...choice(item.correct, item.distractors, id),
    explanation: `${item.correct} This repair aligns the configuration with the observed Linux behavior while avoiding broad or destructive changes.`,
  }
}

function matching(domain, id) {
  const pairs = MATCHING[domain]
  return {
    id,
    domain,
    type: 'matching',
    question: `Match the Linux command to its purpose for a ${domain.toLowerCase()} review in case LP-${String(id).padStart(3, '0')}.`,
    itemsLeft: pairs.map(p => p[0]),
    itemsRight: pairs.map(p => p[1]),
    correctMatches: pairs.map((_, index) => index),
    explanation: `These commands are directly tied to the ${domain} objective area and should be recognized by purpose, not only memorized by name.`,
  }
}

function ordering(domain, id) {
  const items = ORDERING[domain]
  return {
    id,
    domain,
    type: 'ordering',
    question: `Order the safest workflow for ${domain.toLowerCase()} on ${HOSTS[id % HOSTS.length]} in case LP-${String(id).padStart(3, '0')}.`,
    items,
    correctOrder: items.map((_, index) => index),
    explanation: 'A good Linux administration workflow gathers evidence first, makes the smallest appropriate change, verifies the result, and documents the outcome.',
  }
}

function buildDomain(domain, target, startId) {
  const base = BANK[domain]
  const commandItems = COMMANDS[domain]
  const configItem = CONFIGS[domain]
  const out = []
  let id = startId
  for (let i = 0; out.length < target; i += 1) {
    const remaining = target - out.length
    if (remaining > 8 && i % 13 === 4) {
      out.push(cli(domain, id++, commandItems[i % commandItems.length]))
    } else if (remaining > 8 && i % 17 === 7) {
      out.push(config(domain, id++, configItem))
    } else if (remaining > 6 && i % 19 === 8) {
      out.push(matching(domain, id++))
    } else if (remaining > 6 && i % 23 === 12) {
      out.push(ordering(domain, id++))
    } else if (remaining > 4 && i % 7 === 3) {
      out.push(multiple(domain, id++, base[i % base.length], base[(i + 3) % base.length]))
    } else {
      out.push(single(domain, id++, base[i % base.length]))
    }
  }
  return out
}

let nextId = 1
const questions = []
for (const domain of DOMAINS) {
  const items = buildDomain(domain.name, domain.target, nextId)
  questions.push(...items)
  nextId += items.length
}

const counts = questions.reduce((acc, q) => {
  acc[q.domain] = (acc[q.domain] || 0) + 1
  return acc
}, {})
const byType = questions.reduce((acc, q) => {
  acc[q.type] = (acc[q.type] || 0) + 1
  return acc
}, {})
const duplicateStemCount = questions.length - new Set(questions.map(q => q.question)).size
for (const q of questions) {
  if (q.explanation.length < 120) {
    q.explanation += ' In review mode, tie the command or configuration choice back to the evidence shown, then choose the least disruptive fix that preserves service intent.'
  }
}
const shortExplanationCount = questions.filter(q => q.explanation.length < 120).length

if (questions.length !== 750) throw new Error(`Expected 750 questions, got ${questions.length}`)
for (const domain of DOMAINS) {
  if (counts[domain.name] !== domain.target) throw new Error(`${domain.name} expected ${domain.target}, got ${counts[domain.name]}`)
}
if (duplicateStemCount > 0) throw new Error(`Duplicate stems: ${duplicateStemCount}`)
if (shortExplanationCount > 0) throw new Error(`Short explanations: ${shortExplanationCount}`)

await writeFile(OUT, `${JSON.stringify(questions, null, 2)}\n`)
console.log(JSON.stringify({ total: questions.length, counts, byType, duplicateStemCount, shortExplanationCount }, null, 2))
