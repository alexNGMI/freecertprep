import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 451-490 ───────────────────────────────────────────────────────────
  # 451 D1 ca:0
  {"id":"serverplus-451","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A server uses drive sleds (carriers) in its front bays. What is the primary function of a drive sled?",
   "choices":["Mechanically secures the drive in the bay and provides activity/status LEDs and tool-less insertion/removal","Acts as a RAID controller","Provides PCIe lanes to the drive","Provides PoE to the drive"],"correctAnswer":0},
  # 452 D1 ca:1
  {"id":"serverplus-452","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A 1U server uses small daughter boards to redirect PCIe slots from horizontal to vertical mounting so that full-height add-in cards can be installed. What are these daughter boards called?",
   "choices":["Drive backplanes","PCIe riser cards","BMC modules","Mezzanine NICs"],"correctAnswer":1},
  # 453 D1 ca:2
  {"id":"serverplus-453","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A database server uses NVDIMMs in addition to standard DRAM DIMMs. What capability do NVDIMMs add over standard DRAM?",
   "choices":["More memory channels","Higher clock speed","Persistence across power loss (data is retained without continuous power)","Lower power consumption only"],"correctAnswer":2},
  # 454 D1 ca:3
  {"id":"serverplus-454","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A backup admin replaces an LTO-7 tape library with LTO-9. What is the most significant practical difference between these LTO generations?",
   "choices":["LTO-9 uses optical media instead of magnetic tape","LTO-9 tapes are physically smaller and incompatible with all libraries","LTO-9 eliminates the need for any backup software","LTO-9 offers significantly higher native capacity and transfer rates per cartridge versus LTO-7"],"correctAnswer":3},
  # 455 D1 ca:0
  {"id":"serverplus-455","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A team uses a Grandfather-Father-Son tape rotation. What does this scheme provide compared with always reusing the same tape?",
   "choices":["Multiple historical recovery points (daily, weekly, monthly) on different tapes, supporting recovery to older time points","Higher tape throughput","Smaller tape footprint","Continuous data protection without backup software"],"correctAnswer":0},
  # 456 D1 ca:1
  {"id":"serverplus-456","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A remote admin needs to install an OS on a headless server in another city. The BMC supports attaching an ISO from the admin's laptop as a virtual optical drive. What is this BMC capability called?",
   "choices":["RDP redirection","Virtual media / virtual CD/USB redirection","Wake-on-LAN","DHCP relay"],"correctAnswer":1},
  # 457 D1 ca:2
  {"id":"serverplus-457","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A technician uses a BMC console session and plugs a USB key into their laptop to install drivers on a remote server during install. Which BMC capability is being used?",
   "choices":["DRBD","WSUS","USB redirection through the BMC virtual KVM session","SCSI tape passthrough"],"correctAnswer":2},
  # 458 D1 ca:3
  {"id":"serverplus-458","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A graphics workstation server uses a discrete GPU only for compute workloads. Which capability is the GPU typically NOT relied on to provide in that role?",
   "choices":["CUDA / parallel compute kernels","Tensor / matrix acceleration","Encoding/decoding multimedia","Driving the system console output during normal headless operation"],"correctAnswer":3},
  # 459 D2 ca:0
  {"id":"serverplus-459","domain":"Server Administration","type":"single-choice",
   "question":"A VMware admin enables a feature that automatically restarts VMs on a surviving host if an ESXi host fails. Which feature is this?",
   "choices":["VMware HA (High Availability)","DRS","vMotion","Storage vMotion"],"correctAnswer":0},
  # 460 D2 ca:1
  {"id":"serverplus-460","domain":"Server Administration","type":"single-choice",
   "question":"Which VMware product provides centralized management of multiple ESXi hosts, clusters, vMotion, HA, DRS, and inventory?",
   "choices":["vSphere Client only","vCenter Server","ESXi Embedded","VMware Workstation Pro"],"correctAnswer":1},
  # 461 D2 ca:2
  {"id":"serverplus-461","domain":"Server Administration","type":"single-choice",
   "question":"An admin configures a DRS rule so that two specific VMs ALWAYS run on the same ESXi host (e.g., for low-latency communication). Which rule type is this?",
   "choices":["Anti-affinity (separate hosts)","VM-Host required","VM-VM affinity (keep together)","Storage anti-affinity"],"correctAnswer":2},
  # 462 D2 ca:3
  {"id":"serverplus-462","domain":"Server Administration","type":"single-choice",
   "question":"A DRS rule states that two redundant domain controller VMs must NEVER run on the same physical ESXi host. Which rule type is this?",
   "choices":["VM-VM affinity (keep together)","Required HA isolation","Snapshot consolidation rule","VM-VM anti-affinity (keep separate)"],"correctAnswer":3},
  # 463 D2 ca:0
  {"id":"serverplus-463","domain":"Server Administration","type":"single-choice",
   "question":"A RHEL admin registers a freshly built server to receive vendor updates and entitlements. Which command-line tool is used?",
   "choices":["subscription-manager register / attach","yum repolist only","dnf update only","apt update"],"correctAnswer":0},
  # 464 D2 ca:1
  {"id":"serverplus-464","domain":"Server Administration","type":"single-choice",
   "question":"An engineer compares Docker and LXC. Which statement BEST captures the typical difference in scope?",
   "choices":["Docker and LXC are identical platforms","Docker primarily packages and runs single application processes; LXC focuses on full-system containers that resemble a small VM","LXC requires a Type 1 hypervisor","Docker cannot use Linux kernel namespaces"],"correctAnswer":1},
  # 465 D2 ca:2
  {"id":"serverplus-465","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs to create a single compressed archive of a directory using gzip compression. Which command accomplishes this?",
   "choices":["zip -r dir.zip /etc","cp -r /etc /backup","tar -czvf etc.tar.gz /etc","dd if=/etc of=etc.gz"],"correctAnswer":2},
  # 466 D2 ca:3
  {"id":"serverplus-466","domain":"Server Administration","type":"single-choice",
   "question":"A backup script copies only changed files between two Linux servers each night, over SSH, using delta-transfer. Which tool fits BEST?",
   "choices":["scp","ftp","tar over netcat","rsync -az -e ssh src/ user@host:dst/"],"correctAnswer":3},
  # 467 D2 ca:0
  {"id":"serverplus-467","domain":"Server Administration","type":"single-choice",
   "question":"An admin needs to copy a single small file from a remote Linux server to a local workstation over SSH. Which command is most appropriate?",
   "choices":["scp user@server:/path/file ./","wget user@server:/path/file","ftp user@server","rsync --remove-source-files"],"correctAnswer":0},
  # 468 D2 ca:1
  {"id":"serverplus-468","domain":"Server Administration","type":"single-choice",
   "question":"A DBA adds an index on a frequently filtered column in a large table. Which performance impact is MOST likely?",
   "choices":["Slower writes only with no impact on reads","Faster lookups/range scans on that column, possibly at the cost of slightly slower writes and additional disk space","Identical read and write performance to no index","Lower memory usage in every case"],"correctAnswer":1},
  # 469 D2 ca:2
  {"id":"serverplus-469","domain":"Server Administration","type":"single-choice",
   "question":"An Active Directory admin needs to assign permissions on a file share. Which group type is appropriate for granting permissions?",
   "choices":["Distribution group","Mail-enabled group only","Security group","Contact"],"correctAnswer":2},
  # 470 D2 ca:3
  {"id":"serverplus-470","domain":"Server Administration","type":"single-choice",
   "question":"An AD admin must choose between Universal, Global, and Domain Local group scopes. Which group scope is intended primarily to be granted permissions on resources within a SINGLE domain?",
   "choices":["Global","Universal","Distribution","Domain Local"],"correctAnswer":3},
  # 471 D3 ca:0
  {"id":"serverplus-471","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An incident report lists 'IOCs' for a recently identified threat. Which examples are typical Indicators of Compromise?",
   "choices":["File hashes, suspicious IP addresses, malicious domain names, and registry artifacts","Cabinet temperatures","UPS battery age","RAID stripe sizes"],"correctAnswer":0},
  # 472 D3 ca:1
  {"id":"serverplus-472","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security analyst maps an observed attacker behavior to a published catalog of adversary tactics and techniques. Which framework provides this catalog?",
   "choices":["NIST SP 800-53","MITRE ATT&CK","ISO 27001","PCI DSS"],"correctAnswer":1},
  # 473 D3 ca:2
  {"id":"serverplus-473","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A storage team enforces a retention lock so that backup data cannot be modified or deleted before its retention period expires, even by administrators. Which property is being added?",
   "choices":["Compression","Deduplication","Immutability","Asynchronous replication"],"correctAnswer":2},
  # 474 D3 ca:3
  {"id":"serverplus-474","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A vendor distributes installers with a digital signature that the OS verifies before allowing the installer to run. Which protection does this provide?",
   "choices":["Encryption of network traffic","Performance acceleration","Disk-level encryption","Authenticity and integrity of the installer — confirms the binary came from the publisher and has not been altered"],"correctAnswer":3},
  # 475 D3 ca:0
  {"id":"serverplus-475","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A SIEM is configured to alert when a single account experiences more than 50 failed logons in 5 minutes. Which class of detection is this?",
   "choices":["Threshold-based correlation rule on authentication failures","Anti-spam content filter","DLP fingerprint","File integrity monitoring"],"correctAnswer":0},
  # 476 D3 ca:1
  {"id":"serverplus-476","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A SOC subscribes to a service that publishes regularly updated lists of malicious IPs, domains, and hashes for ingestion into firewalls and the SIEM. Which service category is this?",
   "choices":["Antivirus scanner","Threat intelligence feed","NTP source","Cloud-managed DNS"],"correctAnswer":1},
  # 477 D3 ca:2
  {"id":"serverplus-477","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A cryptographic policy mandates that long-lived signing keys be replaced on a defined schedule. Which practice is this?",
   "choices":["Hash collision testing","Salting","Key rotation","Key escrow"],"correctAnswer":2},
  # 478 D3 ca:3
  {"id":"serverplus-478","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A development organization formalizes activities like threat modeling, secure coding standards, code review, and security testing throughout product development. Which discipline is this?",
   "choices":["Penetration testing only","Incident response","Procurement","Secure Development Lifecycle (SDLC)"],"correctAnswer":3},
  # 479 D4 ca:0
  {"id":"serverplus-479","domain":"Troubleshooting","type":"single-choice",
   "question":"A VMware ESXi host displays a Purple Screen of Death (PSOD). What does a PSOD indicate?",
   "choices":["A kernel-level fault in the ESXi VMkernel similar in severity to a Linux kernel panic or Windows BSOD","A normal informational message","A configuration warning that can be dismissed","Hardware is fully healthy"],"correctAnswer":0},
  # 480 D4 ca:1
  {"id":"serverplus-480","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux server begins killing application processes under memory pressure. Which kernel mechanism is responsible?",
   "choices":["systemd reaper","The Out-Of-Memory (OOM) killer","cgroups freeze","SELinux denial"],"correctAnswer":1},
  # 481 D4 ca:2
  {"id":"serverplus-481","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows admin investigates excessive paging activity on a server with sufficient physical RAM. Which configuration item should be reviewed?",
   "choices":["WSUS approval list","RAID stripe size","Page file (virtual memory) location, size, and whether it has been disabled on a drive low on free space","NTP stratum"],"correctAnswer":2},
  # 482 D4 ca:3
  {"id":"serverplus-482","domain":"Troubleshooting","type":"single-choice",
   "question":"A web application's container restarts daily after consuming progressively more memory each time. Which troubleshooting practice MOST directly identifies a memory leak?",
   "choices":["Run a vulnerability scan against the container image","Reformat the underlying host","Apply Windows updates to the container host","Trend the process's RSS / working set over time and compare across restarts"],"correctAnswer":3},
  # 483 D4 ca:0
  {"id":"serverplus-483","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin must read SMART health attributes and run a long self-test on a SATA drive. Which tool provides this?",
   "choices":["smartctl (from smartmontools)","ifconfig","dmidecode only","lsof"],"correctAnswer":0},
  # 484 D4 ca:1
  {"id":"serverplus-484","domain":"Troubleshooting","type":"single-choice",
   "question":"A BIOS flash failed mid-update and the server now fails to POST. Which recovery mechanism is most commonly used to recover the BIOS image?",
   "choices":["Reinstall the OS","Vendor BIOS recovery (e.g., dual-BIOS / BIOS recovery jumper / USB Flashback / iDRAC/iLO BIOS recovery)","Defragment the boot drive","Reset the RAID controller"],"correctAnswer":1},
  # 485 D4 ca:2
  {"id":"serverplus-485","domain":"Troubleshooting","type":"single-choice",
   "question":"A RAID 5 array is rebuilding very slowly under heavy production I/O. Which controller setting most directly trades user I/O performance for faster rebuild completion?",
   "choices":["Stripe size","Write-back vs write-through","Rebuild priority (rate)","Read-ahead size"],"correctAnswer":2},
  # 486 D4 ca:3
  {"id":"serverplus-486","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux server admin sees that NIC bonding mode 'active-backup' was configured but the upstream switch ports are in an LACP port channel. What is the consequence?",
   "choices":["Link will negotiate at the highest speed automatically","No impact — modes are interchangeable","Active-backup is identical to LACP","Mismatch: traffic may blackhole or flap because the switch expects LACP and the host does not negotiate it"],"correctAnswer":3},
  # 487 D4 ca:0
  {"id":"serverplus-487","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows Server fails to start normally. The admin needs to access an environment that includes Startup Repair, Command Prompt, and System Restore. Which feature provides this?",
   "choices":["Windows Recovery Environment (WinRE)","Safe Mode with Networking only","Task Manager","SFC scan"],"correctAnswer":0},
  # 488 D4 ca:1
  {"id":"serverplus-488","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows admin uses three repair tools — chkdsk, sfc, and DISM — to address a corrupted Windows installation. In what typical order are they used?",
   "choices":["DISM, then sfc, then chkdsk — always","chkdsk for disk integrity → sfc for system files → DISM /RestoreHealth if sfc cannot fully repair","sfc first, then chkdsk, then nothing else","Only chkdsk is needed in all cases"],"correctAnswer":1},
  # 489 D4 ca:2
  {"id":"serverplus-489","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin wants to benchmark random-read IOPS on a new storage array under controlled conditions. Which tool is purpose-built for this?",
   "choices":["du","ping","fio (Flexible IO Tester)","awk"],"correctAnswer":2},
  # 490 D4 ca:3
  {"id":"serverplus-490","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux process is hung consuming CPU but not responsive to SIGTERM. Which signal should be tried NEXT to forcibly terminate it?",
   "choices":["SIGHUP (1)","SIGINT (2)","SIGSTOP (19)","SIGKILL (9)"],"correctAnswer":3},

  # ── MR 491-493 ───────────────────────────────────────────────────────────
  # 491 D1 [0,2]
  {"id":"serverplus-491","domain":"Server Hardware Installation and Management","type":"multiple-response",
   "question":"Which TWO statements correctly describe LTO tape as a backup medium? (Select 2)",
   "choices":["Provides cost-effective long-term offline storage for cold archives","Is the highest-IOPS storage option for transactional databases","Supports air-gapped, offline retention of older recovery points","Has lower native capacity per cartridge than typical USB thumb drives"],"correctAnswers":[0,2]},
  # 492 D3 [1,3]
  {"id":"serverplus-492","domain":"Security and Disaster Recovery","type":"multiple-response",
   "question":"Which TWO backup design properties most directly mitigate the risk that ransomware encrypts or deletes the backup data itself? (Select 2)",
   "choices":["Always-online deduplicated repository accessible from production credentials","Immutability (object-lock / WORM retention)","Cloud backup that uses the same admin credentials as production","Air-gapped / offline copies"],"correctAnswers":[1,3]},
  # 493 D4 [0,2]
  {"id":"serverplus-493","domain":"Troubleshooting","type":"multiple-response",
   "question":"Which TWO observations most strongly suggest a memory leak in a long-running process? (Select 2)",
   "choices":["Process resident set size (RSS) increases monotonically over hours/days without releasing memory","DHCP renewals occur at the expected interval","Eventually the process triggers the OOM killer or restarts due to memory exhaustion","DNS query latency increases on the LAN"],"correctAnswers":[0,2]},

  # ── Matching 494-495 ─────────────────────────────────────────────────────
  # 494 D2 correctMatches:[3,1,2,0]
  {"id":"serverplus-494","domain":"Server Administration","type":"matching",
   "question":"Match each VMware vSphere feature with its primary behavior.",
   "itemsLeft":["VMware HA","VMware DRS","vMotion","Storage vMotion"],
   "itemsRight":["Migrates VM virtual disks between datastores without VM downtime","Automatically balances VM compute load across hosts in a cluster","Migrates a running VM between ESXi hosts with no service interruption","Restarts powered-off VMs on surviving hosts after an ESXi host failure"],
   "correctMatches":[3,1,2,0]},
  # 495 D4 correctMatches:[3,2,1,0]
  {"id":"serverplus-495","domain":"Troubleshooting","type":"matching",
   "question":"Match each system-fault condition with its description.",
   "itemsLeft":["PSOD","BSOD","Kernel panic","OOM kill"],
   "itemsRight":["Linux OOM killer terminates a process to recover memory","Linux kernel halts on a fatal error and prints a diagnostic trace","Windows STOP error displaying a blue screen and dump","VMware ESXi VMkernel fatal error showing a purple diagnostic screen"],
   "correctMatches":[3,2,1,0]},

  # ── Ordering 496-497 ─────────────────────────────────────────────────────
  # 496 D3 correctOrder:[1,2,0,3,4]
  {"id":"serverplus-496","domain":"Security and Disaster Recovery","type":"ordering",
   "question":"Arrange the response actions to a confirmed ransomware incident in the correct order.",
   "items":["Eradicate threat from affected systems and rotate exposed credentials",
            "Activate the incident-response team and begin documenting actions",
            "Identify scope and contain — isolate affected systems and accounts",
            "Restore from clean, verified, ideally immutable backups",
            "Conduct lessons-learned review and update playbooks/controls"],
   "correctOrder":[1,2,0,3,4]},
  # 497 D4 correctOrder:[1,0,2,3,4]
  {"id":"serverplus-497","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the steps for investigating a suspected memory leak on a production server in the most logical order.",
   "items":["Use top/Task Manager/Performance Monitor to find the process whose memory footprint is growing",
            "Notice that available memory on the server is steadily declining over time",
            "Capture process memory metrics over time for trend analysis",
            "Mitigate by restarting the offending process and engaging the application owner",
            "Document the leak's signature and add monitoring to detect recurrence early"],
   "correctOrder":[1,0,2,3,4]},

  # ── SB 498-500 ────────────────────────────────────────────────────────────
  # 498 D2 [T,T,F,T]
  {"id":"serverplus-498","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about virtualization and Linux server tooling and indicate whether it is True or False.",
   "statements":["VMware HA restarts VMs on surviving hosts after an ESXi host failure.",
                 "vCenter Server is the centralized management plane for ESXi hosts and clusters.",
                 "rsync always transfers the entire content of every file each run, regardless of changes.",
                 "tar with the -z option uses gzip compression on the archive."],
   "correctAnswers":[True,True,False,True]},
  # 499 D3 [T,F,T,T]
  {"id":"serverplus-499","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about modern security operations and indicate whether it is True or False.",
   "statements":["The MITRE ATT&CK framework catalogs adversary tactics and techniques organized by attack phase.",
                 "Backup immutability can be defeated by an attacker who simply compromises the backup server's admin account.",
                 "Code signing helps verify that an executable or package came from a specific publisher and has not been altered.",
                 "Typical IOCs include file hashes, suspicious IP addresses, and malicious domain names."],
   "correctAnswers":[True,False,True,True]},
  # 500 D4 [F,T,T,T]
  {"id":"serverplus-500","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about server fault handling and indicate whether it is True or False.",
   "statements":["A VMware PSOD indicates a healthy ESXi host that has booted successfully.",
                 "The Linux OOM killer terminates processes to recover memory when the kernel can no longer allocate.",
                 "A monotonically growing process RSS over time is a classic memory-leak signature.",
                 "smartctl can read SMART attributes and initiate self-tests on supported drives."],
   "correctAnswers":[False,True,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
