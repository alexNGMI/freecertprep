import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 601-640 ───────────────────────────────────────────────────────────
  # 601 D1 ca:0
  {"id":"serverplus-601","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A 2U server uses an articulating cable management arm at the rear of the chassis. What is the primary benefit of this arm?",
   "choices":["Lets the server be slid out of the rack for service without disconnecting cables","Provides additional PoE power","Acts as a structural support for the rack","Doubles airflow"],"correctAnswer":0},
  # 602 D1 ca:1
  {"id":"serverplus-602","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A new 10GBASE-T copper link must run between top-of-rack and a server NIC. Which structured cabling category is the minimum recommendation for full 10 Gbps over 100 m?",
   "choices":["Cat5e","Cat6A","Cat3","Cat6 (without A)"],"correctAnswer":1},
  # 603 D1 ca:2
  {"id":"serverplus-603","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A high-performance fiber link uses connectors with an angled (8°) polish to minimize back-reflection. Which polish style is this?",
   "choices":["PC","UPC","APC (angled physical contact)","Bare polish"],"correctAnswer":2},
  # 604 D1 ca:3
  {"id":"serverplus-604","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A network technician is troubleshooting a fiber link with high attenuation. Which routine practice should be standard whenever fiber jumpers are handled?",
   "choices":["Wipe with a soft shirt","Use isopropyl alcohol on a paper towel only","Bend the cable sharply to test continuity","Inspect and clean fiber connectors with approved cleaning tools before mating"],"correctAnswer":3},
  # 605 D1 ca:0
  {"id":"serverplus-605","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A field engineer arrives at a remote data center to service a specific server. Which physical marker is MOST useful for quickly and accurately identifying the correct chassis in a row?",
   "choices":["A clear front-bezel asset/inventory label tied to the CMDB record","Color of the front bezel","Number of NICs visible from the front","Chassis weight"],"correctAnswer":0},
  # 606 D1 ca:1
  {"id":"serverplus-606","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A storage admin labels each front drive bay with its physical slot number. What is the primary operational benefit?",
   "choices":["Improves cooling","Avoids replacing the wrong drive during a failure event by giving each bay an unambiguous reference","Reduces NIC errors","Increases IOPS"],"correctAnswer":1},
  # 607 D1 ca:2
  {"id":"serverplus-607","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center publishes a sustained acoustic noise level above 85 dBA in some rack rows. Which best practice applies for technicians working there?",
   "choices":["No PPE is needed","Disable cooling fans","Use approved hearing protection and limit exposure time per OSHA / local guidance","Run only when the AC compressors are off"],"correctAnswer":2},
  # 608 D1 ca:3
  {"id":"serverplus-608","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A technician is bringing up a newly installed server for the first time. Which sequence of actions is the recommended first-boot procedure?",
   "choices":["Power up and immediately install the OS without verifying hardware health","Skip POST and boot directly from the network","Unplug all NICs and start the OS","Verify cabling, confirm POST completes cleanly, validate firmware and BMC reachability, then proceed with installation"],"correctAnswer":3},
  # 609 D1 ca:0
  {"id":"serverplus-609","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A rack PDU provides per-outlet current and energy monitoring. What is the primary operational benefit of these metrics?",
   "choices":["Allows engineers to identify circuits at risk of overload and to bill or chargeback by actual power use","Eliminates the need for grounded outlets","Replaces the role of the UPS","Reduces network latency in the rack"],"correctAnswer":0},
  # 610 D2 ca:1
  {"id":"serverplus-610","domain":"Server Administration","type":"single-choice",
   "question":"Users report that a shared Windows print queue is 'stuck' — jobs queue but never print. Which Windows service is most directly responsible for managing the print queue and is commonly restarted as a first step?",
   "choices":["Print Server Role","Print Spooler service","RPC service","WMI service"],"correctAnswer":1},
  # 611 D2 ca:2
  {"id":"serverplus-611","domain":"Server Administration","type":"single-choice",
   "question":"A new explicit ACL is applied to a shared folder, and admins want to ensure subfolders and files inherit it correctly. Which NTFS concept governs this behavior?",
   "choices":["RAID parity","ACL inheritance (with explicit-vs-inherited precedence rules)","FSMO roles","DNS recursion"],"correctAnswer":2},
  # 612 D2 ca:3
  {"id":"serverplus-612","domain":"Server Administration","type":"single-choice",
   "question":"An AD admin wants domain-joined Windows computers to automatically request and renew internal TLS certificates from AD CS. Which mechanism is used?",
   "choices":["Manual certreq runs scheduled hourly","NTP polling","WSUS","Group Policy-driven certificate auto-enrollment"],"correctAnswer":3},
  # 613 D2 ca:0
  {"id":"serverplus-613","domain":"Server Administration","type":"single-choice",
   "question":"A Windows file server admin wants to enforce per-folder quotas and file-type screening (e.g., block .exe in user shares). Which built-in feature provides this?",
   "choices":["File Server Resource Manager (FSRM)","Performance Monitor","Windows Defender","WSUS"],"correctAnswer":0},
  # 614 D2 ca:1
  {"id":"serverplus-614","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin needs to limit each user's home directory to 5 GB and warn at 80%. Which feature directly implements this?",
   "choices":["Distributed File System","FSRM quota with notification thresholds","RAID stripe size","Storage Spaces tiering"],"correctAnswer":1},
  # 615 D2 ca:2
  {"id":"serverplus-615","domain":"Server Administration","type":"single-choice",
   "question":"A failover cluster uses a configuration in which a majority of nodes' votes determines whether the cluster has quorum. Which quorum model is this?",
   "choices":["Disk Only","Mirrored Cluster","Node Majority","No Quorum"],"correctAnswer":2},
  # 616 D2 ca:3
  {"id":"serverplus-616","domain":"Server Administration","type":"single-choice",
   "question":"A two-node failover cluster across two sites cannot achieve quorum with nodes alone if one site goes offline. Which tie-breaker witness type is hosted entirely outside both sites in Azure Storage?",
   "choices":["Disk Witness","File Share Witness","No witness — increase node count","Cloud Witness"],"correctAnswer":3},
  # 617 D2 ca:0
  {"id":"serverplus-617","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin needs to run a command remotely against a list of 50 servers in parallel from a single management workstation. Which PowerShell capability fits BEST?",
   "choices":["Invoke-Command -ComputerName <list> -ScriptBlock { ... }","start /B per-host","Telnet scripts","SMB null sessions"],"correctAnswer":0},
  # 618 D2 ca:1
  {"id":"serverplus-618","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs to harden SSH server-side settings such as PermitRootLogin, PasswordAuthentication, and Port. Which configuration file is edited?",
   "choices":["/etc/passwd","/etc/ssh/sshd_config","/etc/hosts","/etc/resolv.conf"],"correctAnswer":1},
  # 619 D2 ca:2
  {"id":"serverplus-619","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin wants members of a particular group to be allowed to run any command via sudo. Which traditional group is commonly granted this privilege via sudoers?",
   "choices":["nogroup","kmem","wheel (or sudo on Debian/Ubuntu)","tty"],"correctAnswer":2},
  # 620 D2 ca:3
  {"id":"serverplus-620","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs to raise the maximum number of open files allowed per user for a database service. Which file commonly defines per-user resource limits in addition to systemd unit settings?",
   "choices":["/etc/profile","/etc/hostname","/etc/resolv.conf","/etc/security/limits.conf"],"correctAnswer":3},
  # 621 D3 ca:0
  {"id":"serverplus-621","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security policy requires that captured TLS traffic stay unreadable even if a server's long-term key is compromised in the future. Which TLS property satisfies this requirement?",
   "choices":["Perfect Forward Secrecy (e.g., ECDHE key exchange)","Static RSA key exchange","TLS 1.0 only","RC4 cipher"],"correctAnswer":0},
  # 622 D3 ca:1
  {"id":"serverplus-622","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A modern web server is configured to negotiate only AEAD cipher suites and the latest TLS versions. Which combination is preferred?",
   "choices":["TLS 1.0 with RC4","TLS 1.2/1.3 with AES-GCM or ChaCha20-Poly1305","TLS 1.1 with 3DES","SSL 3.0 with DES"],"correctAnswer":1},
  # 623 D3 ca:2
  {"id":"serverplus-623","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A web admin enables HSTS on their site. What is the primary effect on browser behavior?",
   "choices":["Disables TLS","Forces the browser to always use HTTPS for the domain for a stated duration, preventing downgrade attacks","Disables certificate validation","Pins a specific certificate fingerprint forever"],"correctAnswer":2},
  # 624 D3 ca:3
  {"id":"serverplus-624","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A domain owner wants to audit which certificates have been issued for their domain by any CA. Which public mechanism enables this?",
   "choices":["CRL signing","OCSP only","CA private databases","Certificate Transparency (CT) logs"],"correctAnswer":3},
  # 625 D3 ca:0
  {"id":"serverplus-625","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A network architect compares network IDS and network IPS. Which statement is accurate?",
   "choices":["IDS typically monitors out-of-band and alerts on suspicious traffic; IPS sits inline and can drop or modify traffic in real time","IDS and IPS are identical","IDS sits inline; IPS is out-of-band","IPS is for log retention only"],"correctAnswer":0},
  # 626 D3 ca:1
  {"id":"serverplus-626","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security architect places an IPS at the network edge between the internet and the DMZ. What is the primary purpose of that placement?",
   "choices":["To eliminate the need for firewalls","To inspect inbound and outbound traffic before it reaches internal services and to block malicious traffic","To replace TLS encryption","To act as a primary DNS server"],"correctAnswer":1},
  # 627 D3 ca:2
  {"id":"serverplus-627","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team deploys an intentionally vulnerable-looking system isolated from production data, designed to attract and log attacker activity. Which mechanism is this?",
   "choices":["DLP","Honeypot","Reverse proxy","WSUS"],"correctAnswer":2},
  # 628 D3 ca:3
  {"id":"serverplus-628","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An industrial control network is physically and logically disconnected from corporate IT and the internet to limit exposure of critical OT systems. What is this design called?",
   "choices":["NAT-only segmentation","Public-cloud isolation","Layered DMZ","Air-gapped network"],"correctAnswer":3},
  # 629 D4 ca:0
  {"id":"serverplus-629","domain":"Troubleshooting","type":"single-choice",
   "question":"A server's OS becomes completely unresponsive at the keyboard, mouse, and over the network, but the front-panel power LED is on. Which initial diagnostic step is MOST useful?",
   "choices":["Use the BMC remote console to view the actual OS screen state and capture any kernel/PSOD/BSOD output","Power off the rack immediately","Reformat the system drive","Replace the motherboard"],"correctAnswer":0},
  # 630 D4 ca:1
  {"id":"serverplus-630","domain":"Troubleshooting","type":"single-choice",
   "question":"An HDD in a production server is emitting an audible repetitive clicking sound and read errors are spiking in the OS log. Which conclusion is BEST supported?",
   "choices":["The drive is fine; the noise is normal","The drive is exhibiting signs of imminent mechanical failure and should be replaced ASAP with the array rebuilt from redundancy","Reformat the drive to fix the noise","Increase the network MTU"],"correctAnswer":1},
  # 631 D4 ca:2
  {"id":"serverplus-631","domain":"Troubleshooting","type":"single-choice",
   "question":"A flash storage admin wants to monitor SSD endurance over time. Which SMART attribute family is most directly relevant?",
   "choices":["Network input errors","Fan RPM","Media wearout indicator / percentage used","Power-on hours only"],"correctAnswer":2},
  # 632 D4 ca:3
  {"id":"serverplus-632","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin needs to enable kernel and user-process core dumps for post-mortem analysis. Which item should be configured?",
   "choices":["DHCP leases","DNS forwarders","NTP stratum","ulimit -c (core file size), kernel.core_pattern, and (for kernel dumps) kdump"],"correctAnswer":3},
  # 633 D4 ca:0
  {"id":"serverplus-633","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows server BSODs intermittently. The admin needs to investigate the MEMORY.DMP file to identify the offending driver. Which Microsoft tool is most commonly used for this analysis?",
   "choices":["WinDbg (Debugging Tools for Windows / Windows SDK)","Notepad","Telnet","Hyper-V Manager"],"correctAnswer":0},
  # 634 D4 ca:1
  {"id":"serverplus-634","domain":"Troubleshooting","type":"single-choice",
   "question":"A NIC is set to autonegotiate but the switch port is hard-coded to 1000/full. Which condition commonly results?",
   "choices":["Both sides will negotiate to 10000/full automatically","Speed will negotiate to 1 Gbps but the NIC will default to half-duplex, causing a duplex mismatch with elevated CRC errors and collisions on the half-duplex side","No effect — duplex always negotiates separately","The link will not come up at all"],"correctAnswer":1},
  # 635 D4 ca:2
  {"id":"serverplus-635","domain":"Troubleshooting","type":"single-choice",
   "question":"A server with dual PSUs reports PS1 drawing all the current while PS2 remains idle. The BMC also shows PS2 alarms. What is the most likely condition?",
   "choices":["Designed behavior","Normal load balancing","PS2 has failed silently or its feed is disconnected; PS1 is carrying full load and is now a single point of failure","Both PSUs are healthy"],"correctAnswer":2},
  # 636 D4 ca:3
  {"id":"serverplus-636","domain":"Troubleshooting","type":"single-choice",
   "question":"A failover cluster experiences a partition where both halves believe they own a clustered resource. Which design choice is intended to PREVENT this 'split-brain' condition?",
   "choices":["Disable cluster heartbeats","Run every node as standalone","Allow concurrent writes from both partitions","Quorum and witness configuration (so only one partition can host the resource)"],"correctAnswer":3},
  # 637 D4 ca:0
  {"id":"serverplus-637","domain":"Troubleshooting","type":"single-choice",
   "question":"A hypervisor's guest VMs are exhibiting heavy in-guest swapping. Inspection on the ESXi/Hyper-V host shows the HOST is paging memory to swap files. Which root condition is MOST consistent?",
   "choices":["The hypervisor host is under sustained memory pressure and is overcommitting RAM","The guest CPU is too fast","NTP drift","Disabled MFA"],"correctAnswer":0},
  # 638 D4 ca:1
  {"id":"serverplus-638","domain":"Troubleshooting","type":"single-choice",
   "question":"A VMware admin notices that the vCenter inventory does not reflect the current state of an ESXi host (e.g., powered-on VMs shown as off). Which step often resolves an inventory drift on the host?",
   "choices":["Reformat the host","Restart the affected ESXi host's management agents (e.g., vpxa/hostd) and verify communication with vCenter","Power off all VMs","Reinstall vCenter"],"correctAnswer":1},
  # 639 D4 ca:2
  {"id":"serverplus-639","domain":"Troubleshooting","type":"single-choice",
   "question":"A server takes far longer than peers to boot through POST when many storage and PCIe devices are installed. Which step BEST isolates which device is responsible?",
   "choices":["Reformat each disk","Reinstall the OS","Temporarily remove non-essential expansion cards and disconnect non-boot storage, then add back one device at a time to identify the offender","Replace the motherboard immediately"],"correctAnswer":2},
  # 640 D4 ca:3
  {"id":"serverplus-640","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin compares a kernel oops and a kernel panic. Which statement is accurate?",
   "choices":["They are identical","Oops always crashes the kernel; panic continues running","Both leave the kernel running normally","An oops indicates a recoverable kernel anomaly that may leave the system unstable, while a panic indicates a fatal error and typically halts the kernel"],"correctAnswer":3},

  # ── MR 641-643 ───────────────────────────────────────────────────────────
  # 641 D2 [0,2]
  {"id":"serverplus-641","domain":"Server Administration","type":"multiple-response",
   "question":"Which TWO mechanisms are commonly used by a Windows failover cluster to prevent split-brain in a multi-site or two-node deployment? (Select 2)",
   "choices":["A quorum model based on a majority of votes","Running every node as standalone","A witness (Disk, File Share, or Cloud) to break ties","Removing all heartbeat networks"],"correctAnswers":[0,2]},
  # 642 D3 [1,3]
  {"id":"serverplus-642","domain":"Security and Disaster Recovery","type":"multiple-response",
   "question":"Which TWO configuration choices most directly improve TLS security on a modern public-facing web server? (Select 2)",
   "choices":["Allow SSL 3.0 and RC4 for compatibility","Restrict negotiation to TLS 1.2/1.3","Prefer 3DES for performance","Prefer AEAD cipher suites (e.g., AES-GCM, ChaCha20-Poly1305) with forward-secret key exchange"],"correctAnswers":[1,3]},
  # 643 D4 [0,2]
  {"id":"serverplus-643","domain":"Troubleshooting","type":"multiple-response",
   "question":"Which TWO indicators most strongly suggest a hard drive is approaching mechanical failure and should be replaced proactively? (Select 2)",
   "choices":["SMART pending and reallocated sector counts increasing over time","DHCP lease renewals occurring on schedule","Audible mechanical clicking, grinding, or repetitive spin-up/spin-down","DNS resolver latency increasing on the LAN"],"correctAnswers":[0,2]},

  # ── Matching 644-645 ─────────────────────────────────────────────────────
  # 644 D2 correctMatches:[1,0,3,2]
  {"id":"serverplus-644","domain":"Server Administration","type":"matching",
   "question":"Match each Windows failover cluster quorum or witness construct with its description.",
   "itemsLeft":["Node Majority quorum","Node and Disk Majority quorum","File Share Witness","Cloud Witness"],
   "itemsRight":["Quorum that includes a tie-breaker disk hosted in cluster-shared storage","Quorum based purely on a majority of voting nodes","An Azure Storage account / blob acting as the tie-breaker","An SMB file share acting as the tie-breaker"],
   "correctMatches":[1,0,3,2]},
  # 645 D3 correctMatches:[3,2,1,0]
  {"id":"serverplus-645","domain":"Security and Disaster Recovery","type":"matching",
   "question":"Match each TLS-related concept with its description.",
   "itemsLeft":["TLS handshake","Perfect Forward Secrecy (PFS)","HSTS","Certificate Transparency (CT)"],
   "itemsRight":["Public append-only logs of issued certificates that browsers and domain owners can audit","Tells browsers to enforce HTTPS for a domain for a stated duration","Ensures past TLS sessions cannot be decrypted later if a server's long-term key is compromised","Negotiates symmetric session keys and authenticates parties at the start of a TLS connection"],
   "correctMatches":[3,2,1,0]},

  # ── Ordering 646-647 ─────────────────────────────────────────────────────
  # 646 D4 correctOrder:[1,2,0,3,4]
  {"id":"serverplus-646","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the steps for diagnosing a hung production server in the most logical order.",
   "items":["Capture an OS-level memory dump for post-mortem analysis",
            "Observe that the server is unresponsive at the console and over the network",
            "Use the BMC remote console to confirm the OS state (hang, kernel panic, or PSOD)",
            "Restart the server through the BMC and review event logs once it is back up",
            "Engage vendor support if the root cause is hardware-related"],
   "correctOrder":[1,2,0,3,4]},
  # 647 D2 correctOrder:[2,1,0,3,4]
  {"id":"serverplus-647","domain":"Server Administration","type":"ordering",
   "question":"Arrange the steps for adding a new node to an existing Windows failover cluster in the correct order.",
   "items":["Add the new node to the cluster and verify the cluster service starts on it",
            "Run the cluster validation wizard against the new and existing nodes",
            "Verify networking, storage access, and Active Directory prerequisites on the new node",
            "Run failover tests to confirm the new node can host clustered roles",
            "Update documentation, monitoring, and capacity-planning artifacts"],
   "correctOrder":[2,1,0,3,4]},

  # ── SB 648-650 ────────────────────────────────────────────────────────────
  # 648 D2 [T,F,T,T]
  {"id":"serverplus-648","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about Windows clustering and server administration and indicate whether it is True or False.",
   "statements":["A cluster's quorum mechanism prevents split-brain by requiring a majority of votes among nodes (and optional witness).",
                 "A Disk Witness is mandatory for every Windows failover cluster regardless of node count.",
                 "File Server Resource Manager (FSRM) can enforce per-folder quotas and file-type screening.",
                 "PowerShell Invoke-Command can target many remote computers concurrently from a single management station."],
   "correctAnswers":[True,False,True,True]},
  # 649 D3 [T,T,F,T]
  {"id":"serverplus-649","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about TLS and web security and indicate whether it is True or False.",
   "statements":["Perfect Forward Secrecy ensures past TLS sessions are not retroactively decryptable if the server's long-term key is later exposed.",
                 "Modern TLS deployments should generally negotiate TLS 1.2 or TLS 1.3 with AEAD cipher suites.",
                 "HSTS instructs browsers to downgrade HTTPS to plain HTTP whenever a certificate error occurs.",
                 "Certificate Transparency logs allow domain owners and the public to discover unauthorized certificates issued for a domain."],
   "correctAnswers":[True,True,False,True]},
  # 650 D4 [F,T,T,T]
  {"id":"serverplus-650","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about server fault analysis and indicate whether it is True or False.",
   "statements":["A duplex mismatch (full on one side, half on the other) typically improves throughput and lowers errors.",
                 "A persistent clicking or grinding sound from an HDD is a strong indicator of imminent mechanical failure.",
                 "SSD endurance and wear can be tracked through SMART attributes such as Media Wearout / Percentage Used.",
                 "A Linux kernel panic typically halts the kernel and requires a reboot, while a kernel oops may leave the system running but unstable."],
   "correctAnswers":[False,True,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
