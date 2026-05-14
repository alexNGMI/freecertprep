import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 301-340 ───────────────────────────────────────────────────────────
  # 301 D1 ca:0
  {"id":"serverplus-301","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A 2U server chassis presents twelve front-accessible drive bays that plug directly into a board behind the bays. What is this board called?",
   "choices":["Drive backplane","Riser card","RAID controller daughter card","Midplane bus"],"correctAnswer":0},
  # 302 D1 ca:1
  {"id":"serverplus-302","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A technician installs a PCIe x16 GPU into a physical x16 slot that is electrically only x8. What is the most likely performance impact?",
   "choices":["No effect; PCIe always negotiates to x16","Reduced PCIe bandwidth, which may bottleneck very high-throughput workloads","The slot will refuse to power the card","Server will fail to POST"],"correctAnswer":1},
  # 303 D1 ca:2
  {"id":"serverplus-303","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"An admin compares two M.2 SSDs of the same physical size. One is M.2 SATA, the other is M.2 NVMe. What is the primary difference for typical performance?",
   "choices":["M.2 SATA performs better for sequential reads","Both are identical in performance","M.2 NVMe uses PCIe lanes and typically delivers substantially higher throughput and IOPS than M.2 SATA","Both use the SATA protocol with the same theoretical bandwidth"],"correctAnswer":2},
  # 304 D1 ca:3
  {"id":"serverplus-304","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A virtualization admin wants a guest VM to access a physical GPU directly with near-native performance, bypassing the hypervisor's virtual GPU layer. Which technology is being used?",
   "choices":["NIC teaming","Storage live migration","Hyper-V quick check","PCIe passthrough (VT-d / IOMMU / VFIO)"],"correctAnswer":3},
  # 305 D1 ca:0
  {"id":"serverplus-305","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"Before flashing new firmware to the BMC/iDRAC/iLO on a production server, what should the admin do FIRST?",
   "choices":["Back up the existing firmware and current configuration, and verify a maintenance window with rollback plan","Disable all network access to the server","Format the boot drive","Disable RAID controller cache permanently"],"correctAnswer":0},
  # 306 D1 ca:1
  {"id":"serverplus-306","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A drive is being decommissioned and returned to the manufacturer for warranty. Which sanitization method ensures stored data cannot be recovered while preserving the drive's electronics for return?",
   "choices":["Quick format only","ATA Secure Erase or cryptographic erase","Bending the drive in half","Renaming all partitions"],"correctAnswer":1},
  # 307 D1 ca:2
  {"id":"serverplus-307","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A SAS-based storage shelf connects 24 drives to a single SAS HBA port. Which component multiplexes those drives onto the HBA link?",
   "choices":["NVMe controller","Fibre Channel director","SAS expander","SATA bridge"],"correctAnswer":2},
  # 308 D1 ca:3
  {"id":"serverplus-308","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"An admin compares internal cable length limits. Which statement is correct about practical SATA versus SAS cabling within a chassis?",
   "choices":["SATA supports much longer cable runs than SAS","SATA and SAS have identical practical cable lengths","SAS requires fiber for any length","SAS practical cable lengths are typically longer than internal SATA, and SAS supports longer external runs via dedicated cabling"],"correctAnswer":3},
  # 309 D2 ca:0
  {"id":"serverplus-309","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs to grow a volume across multiple physical disks and resize logical volumes online. Which native Linux subsystem provides this?",
   "choices":["LVM (Logical Volume Manager)","fdisk","ext4 only","ZFS only"],"correctAnswer":0},
  # 310 D2 ca:1
  {"id":"serverplus-310","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs to build a software RAID 5 array from individual disks without buying a hardware RAID card. Which utility creates and manages this array?",
   "choices":["fdisk","mdadm","parted","lvm"],"correctAnswer":1},
  # 311 D2 ca:2
  {"id":"serverplus-311","domain":"Server Administration","type":"single-choice",
   "question":"On a Hyper-V host, an admin needs VM-to-VM traffic on the host only — with NO communication to the host OS and NO physical network connectivity. Which virtual switch type fits?",
   "choices":["External","Internal","Private","Distributed"],"correctAnswer":2},
  # 312 D2 ca:3
  {"id":"serverplus-312","domain":"Server Administration","type":"single-choice",
   "question":"A VMware admin wants centralized, vCenter-managed networking configuration spanning many ESXi hosts. Which switch type provides this?",
   "choices":["Standard vSwitch (per-host)","NIC teaming","Hyper-V Internal switch","Distributed vSwitch (vDS)"],"correctAnswer":3},
  # 313 D2 ca:0
  {"id":"serverplus-313","domain":"Server Administration","type":"single-choice",
   "question":"A platform team needs an internal store for container images that supports image scanning, RBAC, and replication. Which component is this?",
   "choices":["Container registry","Container runtime","Kubernetes scheduler","CNI plugin"],"correctAnswer":0},
  # 314 D2 ca:1
  {"id":"serverplus-314","domain":"Server Administration","type":"single-choice",
   "question":"A Kubernetes operator needs to install, version, and parameterize complex applications consisting of many manifests. Which tool is most commonly used for this?",
   "choices":["kubeadm","Helm","kubectl rollout","kubelet"],"correctAnswer":1},
  # 315 D2 ca:2
  {"id":"serverplus-315","domain":"Server Administration","type":"single-choice",
   "question":"An automation engineer maintains a list of managed hosts and groups for Ansible. Which file or source describes these hosts?",
   "choices":["playbook.yml","roles directory","Ansible inventory (e.g., /etc/ansible/hosts or a dynamic inventory)","ansible.cfg"],"correctAnswer":2},
  # 316 D2 ca:3
  {"id":"serverplus-316","domain":"Server Administration","type":"single-choice",
   "question":"An organization compares Ansible and Puppet for configuration management. Which statement BEST describes a primary architectural difference?",
   "choices":["Both require an agent installed on every managed node","Both use INI files for all definitions","Puppet is push-only and cannot run agentless","Ansible is typically agentless (push over SSH/WinRM), while Puppet typically uses an agent on each managed node"],"correctAnswer":3},
  # 317 D2 ca:0
  {"id":"serverplus-317","domain":"Server Administration","type":"single-choice",
   "question":"An SRE adopts Google's 'four golden signals' for service monitoring. Which set of metrics does this refer to?",
   "choices":["Latency, traffic, errors, saturation","CPU, RAM, disk, network","Logs, metrics, traces, events","Uptime, throughput, ping, jitter"],"correctAnswer":0},
  # 318 D3 ca:1
  {"id":"serverplus-318","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An organization labels data sets so each receives the correct level of protection and access controls. Which practice is this?",
   "choices":["Tokenization","Data classification","Anonymization only","Hashing"],"correctAnswer":1},
  # 319 D3 ca:2
  {"id":"serverplus-319","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A compliance officer needs to know how long different types of records must be kept and when they should be securely destroyed. Which document defines this?",
   "choices":["Acceptable use policy","Incident response plan","Data retention policy","Vendor contract"],"correctAnswer":2},
  # 320 D3 ca:3
  {"id":"serverplus-320","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"Legal counsel notifies IT that pending litigation requires certain mailboxes and files to be preserved indefinitely, overriding normal retention. What is this instruction called?",
   "choices":["Tabletop","Backup verification","Audit","Legal hold"],"correctAnswer":3},
  # 321 D3 ca:0
  {"id":"serverplus-321","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A multinational company processes personal data of European Union residents. Which regulation primarily governs this processing?",
   "choices":["GDPR","HIPAA","SOX","PCI DSS"],"correctAnswer":0},
  # 322 D3 ca:1
  {"id":"serverplus-322","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security analyst compares two IDS approaches. Which statement BEST distinguishes signature-based from anomaly-based detection?",
   "choices":["Signature-based detection has no false positives","Signature-based matches known attack patterns; anomaly-based flags deviations from a learned baseline","Anomaly-based detection cannot detect novel attacks","Both methods are identical when feeds are up to date"],"correctAnswer":1},
  # 323 D3 ca:2
  {"id":"serverplus-323","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team formalizes a continuous process of identifying, prioritizing, remediating, and verifying vulnerabilities. What is this commonly called?",
   "choices":["Penetration testing","Tabletop exercise","Vulnerability management lifecycle","Change management"],"correctAnswer":2},
  # 324 D3 ca:3
  {"id":"serverplus-324","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A vendor security advisory references the unique identifier 'CVE-2024-1234' for a vulnerability. What does the CVE identifier represent?",
   "choices":["A vendor-specific patch identifier","A CVSS severity score","A vulnerability scanner rule ID","A standardized public identifier for a publicly disclosed vulnerability"],"correctAnswer":3},
  # 325 D3 ca:0
  {"id":"serverplus-325","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A vulnerability report lists a finding with a CVSS v3 base score of 9.8. What is this score conveying?",
   "choices":["Severity on a 0.0–10.0 scale (9.8 is Critical) considering exploitability and impact","Number of affected hosts","CPU usage required to exploit","Number of days since disclosure"],"correctAnswer":0},
  # 326 D3 ca:1
  {"id":"serverplus-326","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security policy categorizes controls into administrative, technical, and physical families. To which family does a written acceptable use policy belong?",
   "choices":["Technical","Administrative","Physical","Compensating"],"correctAnswer":1},
  # 327 D4 ca:2
  {"id":"serverplus-327","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin needs to view kernel-level messages emitted since boot, including driver and hardware events. Which command displays the kernel ring buffer?",
   "choices":["systemctl list-units","top","dmesg (or journalctl -k)","ps auxf"],"correctAnswer":2},
  # 328 D4 ca:3
  {"id":"serverplus-328","domain":"Troubleshooting","type":"single-choice",
   "question":"After a Linux kernel update, a custom out-of-tree driver fails to load with 'unknown symbol' errors. What is the most likely cause?",
   "choices":["The driver is signed with the wrong key only","The kernel package is corrupted","Disk space is too low","The driver module was built against a different kernel version and must be rebuilt for the running kernel"],"correctAnswer":3},
  # 329 D4 ca:0
  {"id":"serverplus-329","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows server fails to boot and shows STOP 0x7B (INACCESSIBLE_BOOT_DEVICE). Which root cause should be investigated FIRST?",
   "choices":["Storage controller driver, RAID/boot device visibility, or storage hardware change since the last successful boot","Mouse driver corruption","Active Directory replication failure","Time-zone misconfiguration"],"correctAnswer":0},
  # 330 D4 ca:1
  {"id":"serverplus-330","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows server crashes intermittently with stop codes pointing at memory management (e.g., 0x1A MEMORY_MANAGEMENT). Which physical-layer test should be performed?",
   "choices":["Run a chkdsk pass","Run an extended memory diagnostic (Windows Memory Diagnostic or MemTest86) against the installed DIMMs","Update BIOS only","Replace the power supply"],"correctAnswer":1},
  # 331 D4 ca:2
  {"id":"serverplus-331","domain":"Troubleshooting","type":"single-choice",
   "question":"A RAID controller is reported as offline after a power event. Which items should be checked FIRST?",
   "choices":["DNS resolver configuration","Hostname and time zone","Battery / capacitor state, controller firmware version, and slot seating","RAID stripe size value"],"correctAnswer":2},
  # 332 D4 ca:3
  {"id":"serverplus-332","domain":"Troubleshooting","type":"single-choice",
   "question":"A VMware host shows an iSCSI datastore as disconnected. Which item is the MOST direct candidate for first investigation?",
   "choices":["DNS suffix order on the host","Group Policy on the host","BIOS Secure Boot setting","iSCSI target reachability, portal IPs, and any recent changes to the SAN network or target ACLs"],"correctAnswer":3},
  # 333 D4 ca:0
  {"id":"serverplus-333","domain":"Troubleshooting","type":"single-choice",
   "question":"After applying a NIC firmware update, a server loses all network connectivity at boot. Which step should be tried FIRST?",
   "choices":["Roll back the NIC firmware/driver using the BMC console or vendor recovery image","Reformat the OS","Replace the motherboard","Disable Secure Boot permanently"],"correctAnswer":0},
  # 334 D4 ca:1
  {"id":"serverplus-334","domain":"Troubleshooting","type":"single-choice",
   "question":"A server in a hot aisle is experiencing intermittent reboots and reduced CPU clock under load. Health logs show high inlet temperature. What is the most direct corrective action?",
   "choices":["Disable ECC memory","Restore proper airflow and address failed/blocked fans or hot aisle containment","Update the BIOS","Disable hyper-threading"],"correctAnswer":1},
  # 335 D4 ca:2
  {"id":"serverplus-335","domain":"Troubleshooting","type":"single-choice",
   "question":"A server's NIC repeatedly transitions up/down (port flapping) on the switch side. Which items should be checked FIRST?",
   "choices":["AD replication health","NTP stratum","Patch cable integrity, SFP cleanliness/seating, and switch port error counters","BIOS RTC battery"],"correctAnswer":2},
  # 336 D4 ca:3
  {"id":"serverplus-336","domain":"Troubleshooting","type":"single-choice",
   "question":"A server can ping local hosts on its subnet but cannot reach the default gateway. Which item is the MOST direct cause to verify?",
   "choices":["NTP configuration","Windows Update history","DNS forwarders","Subnet mask, VLAN/access-port configuration, and ARP entry for the gateway"],"correctAnswer":3},
  # 337 D4 ca:0
  {"id":"serverplus-337","domain":"Troubleshooting","type":"single-choice",
   "question":"A server feels 'slow' but the admin lacks a specific symptom. Which approach is the MOST appropriate first step in performance troubleshooting?",
   "choices":["Identify which subsystem (CPU, memory, disk, or network) is the actual bottleneck before making changes","Increase RAM immediately","Reformat and reinstall the OS","Replace the motherboard"],"correctAnswer":0},
  # 338 D4 ca:1
  {"id":"serverplus-338","domain":"Troubleshooting","type":"single-choice",
   "question":"A backup admin sees nightly jobs failing to complete within the backup window. Which two factors are MOST commonly responsible?",
   "choices":["BIOS RTC drift only","An undersized backup window for the data volume and/or insufficient backup-target storage performance","Group Policy filtering","DNS conditional forwarders"],"correctAnswer":1},
  # 339 D4 ca:2
  {"id":"serverplus-339","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux server's /var fills up repeatedly because log files are not being rotated. Which subsystem should be inspected and tuned to prevent recurrence?",
   "choices":["NTP","Auditd only","logrotate configuration (and any service-specific rotation, e.g., journald, nginx, application)","cron only — there is no log rotation framework"],"correctAnswer":2},
  # 340 D4 ca:3
  {"id":"serverplus-340","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows admin needs to capture long-duration performance data including CPU, memory, disk, and network counters for trend analysis. Which built-in tool fits this requirement?",
   "choices":["Task Manager","Event Viewer","sysinternals procmon only","Performance Monitor (perfmon) with Data Collector Sets"],"correctAnswer":3},

  # ── MR 341-343 ───────────────────────────────────────────────────────────
  # 341 D1 [0,2]
  {"id":"serverplus-341","domain":"Server Hardware Installation and Management","type":"multiple-response",
   "question":"Which TWO of the following are advantages of SAS over SATA for enterprise drive deployments? (Select 2)",
   "choices":["Dual-port connectivity for redundant data paths","Lower cost per terabyte","Designed for sustained 24x7 enterprise workloads with higher reliability ratings","Native compatibility with consumer-class controllers"],"correctAnswers":[0,2]},
  # 342 D2 [1,3]
  {"id":"serverplus-342","domain":"Server Administration","type":"multiple-response",
   "question":"Which TWO capabilities are core to a container-orchestration platform such as Kubernetes? (Select 2)",
   "choices":["Acts as a relational database engine","Schedules workloads (pods) across a cluster of nodes","Hosts an SMTP mail server by default","Self-heals workloads by restarting or rescheduling failed pods"],"correctAnswers":[1,3]},
  # 343 D4 [0,2]
  {"id":"serverplus-343","domain":"Troubleshooting","type":"multiple-response",
   "question":"A server is suspected to be overheating. Which TWO observations most strongly support that suspicion? (Select 2)",
   "choices":["An amber/red temperature warning on the front-panel status LED","Increased DNS query latency","Sustained CPU clock speeds well below the rated frequency under load","Increased DHCP lease renewals"],"correctAnswers":[0,2]},

  # ── Matching 344-345 ─────────────────────────────────────────────────────
  # 344 D2 correctMatches:[2,1,3,0]
  {"id":"serverplus-344","domain":"Server Administration","type":"matching",
   "question":"Match each Hyper-V networking construct with its primary behavior.",
   "itemsLeft":["External vSwitch","Internal vSwitch","Private vSwitch","NIC Teaming"],
   "itemsRight":["Bonds multiple physical NICs for redundancy and/or aggregated bandwidth","Connects VMs to the host operating system but not to any physical NIC","Bridges VMs to the physical network through a host's physical NIC","VM-to-VM communication only on the same host; no host or physical NIC connectivity"],
   "correctMatches":[2,1,3,0]},
  # 345 D3 correctMatches:[2,3,1,0]
  {"id":"serverplus-345","domain":"Security and Disaster Recovery","type":"matching",
   "question":"Match each data classification level with a representative example.",
   "itemsLeft":["Public","Internal","Confidential","Restricted"],
   "itemsRight":["Highly sensitive — unauthorized exposure would cause severe harm","Important business information with limited distribution within the company","Marketing material, public website content, press releases","Sensitive non-public information intended only for employees"],
   "correctMatches":[2,3,1,0]},

  # ── Ordering 346-347 ─────────────────────────────────────────────────────
  # 346 D3 correctOrder:[2,1,0,3,4]
  {"id":"serverplus-346","domain":"Security and Disaster Recovery","type":"ordering",
   "question":"Arrange the steps of a vulnerability-management lifecycle in the correct order.",
   "items":["Apply remediation or compensating controls",
            "Prioritize findings based on CVSS, asset value, and exposure",
            "Discover and inventory assets and known vulnerabilities",
            "Verify successful remediation through rescans",
            "Continuously monitor and repeat the cycle"],
   "correctOrder":[2,1,0,3,4]},
  # 347 D4 correctOrder:[1,3,0,2,4]
  {"id":"serverplus-347","domain":"Troubleshooting","type":"ordering",
   "question":"After a NIC firmware update, a remote server has lost all network connectivity. Arrange the recovery steps in the most logical order.",
   "items":["Verify in the OS that the NIC is enumerated (Device Manager / ip link)",
            "Access the server through the BMC out-of-band console",
            "Roll back the offending NIC firmware/driver using a recovery image",
            "Reboot the server cleanly into the operating system",
            "Document the change and review vendor compatibility for the future"],
   "correctOrder":[1,3,0,2,4]},

  # ── SB 348-350 ────────────────────────────────────────────────────────────
  # 348 D2 [T,F,T,T]
  {"id":"serverplus-348","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about Linux storage and orchestration tooling and indicate whether it is True or False.",
   "statements":["LVM can grow a logical volume across multiple physical disks and resize file systems online.",
                 "A Hyper-V 'Internal' virtual switch connects VMs to the physical network through a host NIC.",
                 "Helm is a package manager for Kubernetes applications.",
                 "Google's four golden signals of service monitoring are latency, traffic, errors, and saturation."],
   "correctAnswers":[True,False,True,True]},
  # 349 D3 [T,T,F,T]
  {"id":"serverplus-349","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about vulnerability management and regulation and indicate whether it is True or False.",
   "statements":["GDPR applies to organizations that process personal data of EU data subjects, regardless of where the organization is based.",
                 "CVSS scores range from 0.0 to 10.0 and represent vulnerability severity.",
                 "A CVE identifier includes the vendor-supplied remediation patch for that vulnerability.",
                 "Anomaly-based detection can flag previously unseen attacks more readily than purely signature-based detection."],
   "correctAnswers":[True,True,False,True]},
  # 350 D4 [F,T,T,T]
  {"id":"serverplus-350","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about hardware and OS troubleshooting and indicate whether it is True or False.",
   "statements":["A failed chassis fan in a server has no impact on CPU clock speed under load.",
                 "The Windows STOP code 0x7B (INACCESSIBLE_BOOT_DEVICE) typically indicates storage controller or boot device issues.",
                 "Linux 'dmesg' or 'journalctl -k' surfaces kernel ring-buffer messages useful for diagnosing hardware and driver issues.",
                 "Identifying the actual bottleneck subsystem (CPU, RAM, disk, or network) is a critical step before tuning a slow server."],
   "correctAnswers":[False,True,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
