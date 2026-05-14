import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 501-540 ───────────────────────────────────────────────────────────
  # 501 D1 ca:0
  {"id":"serverplus-501","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A dense AI cluster experiences thermal hot spots that conventional air cooling cannot remove fast enough. Which cooling technology removes heat closest to high-power CPU/GPU components?",
   "choices":["Direct-to-chip / cold-plate liquid cooling","Standard front-to-back air with 1U servers","Single perforated tile per rack","Passive convection only"],"correctAnswer":0},
  # 502 D1 ca:1
  {"id":"serverplus-502","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center adds environmental sensors throughout the rack rows. What is the primary purpose of monitoring temperature and humidity at the row level?",
   "choices":["To verify lighting levels","Early detection of cooling failures and to keep conditions within manufacturer-recommended ranges","To improve TLS handshake performance","To drive Active Directory replication"],"correctAnswer":1},
  # 503 D1 ca:2
  {"id":"serverplus-503","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A technician installs solid panels in all unused rack U positions in front of equipment. What is the primary purpose of these blanking panels?",
   "choices":["Reserve space for future devices","Improve the rack's aesthetics","Prevent recirculation of hot exhaust air back into the cold aisle through unused slots","Increase rack weight capacity"],"correctAnswer":2},
  # 504 D1 ca:3
  {"id":"serverplus-504","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A rack uses brush grommets in the cable entry holes between the raised floor and the top of the cabinet. What is their main purpose?",
   "choices":["Decoration","Increase rack height","Provide PoE","Limit air leakage through the cable pass-through to preserve hot/cold aisle pressure"],"correctAnswer":3},
  # 505 D1 ca:0
  {"id":"serverplus-505","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A facility loses utility power. Which device automatically and quickly switches the critical load from utility power to a generator (or a different feed) without manual intervention?",
   "choices":["Automatic Transfer Switch (ATS)","Manual breaker only","Generic surge protector","Power-over-Ethernet injector"],"correctAnswer":0},
  # 506 D1 ca:1
  {"id":"serverplus-506","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A facilities engineer is sizing diesel storage for a standby generator. Which factor MOST directly determines required fuel-tank capacity?",
   "choices":["Generator paint color","Expected outage duration multiplied by fuel consumption rate at the projected load","Number of NIC ports per server","Rack U count"],"correctAnswer":1},
  # 507 D1 ca:2
  {"id":"serverplus-507","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center selects an online double-conversion UPS for its critical load. Which characteristic distinguishes online double-conversion from line-interactive UPS topology?",
   "choices":["Online double-conversion uses higher-voltage outlets","They are identical","Line-interactive is faster than online double-conversion under all conditions","Online double-conversion always delivers regenerated, conditioned power and provides essentially zero transfer time on input failure"],"correctAnswer":2},
  # 508 D1 ca:3
  {"id":"serverplus-508","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center adopts a tool that tracks power, cooling, and space utilization across racks and equipment to optimize operations. What category of tool is this?",
   "choices":["SIEM","Hypervisor","Configuration management database alone","DCIM (Data Center Infrastructure Management)"],"correctAnswer":3},
  # 509 D2 ca:0
  {"id":"serverplus-509","domain":"Server Administration","type":"single-choice",
   "question":"A backup target stores immutable, versioned objects retrieved via S3-compatible HTTP APIs. Which storage category fits this description?",
   "choices":["Object storage","Block storage SAN","NTFS SMB share","FAT32 USB"],"correctAnswer":0},
  # 510 D2 ca:1
  {"id":"serverplus-510","domain":"Server Administration","type":"single-choice",
   "question":"A Hyper-V admin enables a feature that allows a VM's memory allocation to expand and contract within configured min/max bounds based on demand. Which feature is this?",
   "choices":["Memory deduplication","Dynamic Memory","NUMA pinning","Memory ballooning only"],"correctAnswer":1},
  # 511 D2 ca:2
  {"id":"serverplus-511","domain":"Server Administration","type":"single-choice",
   "question":"A VMware admin sees that an old snapshot exists on a production VM, causing a chain of delta files. After verifying a recent backup, what is the appropriate operation to collapse the deltas back into the base disk?",
   "choices":["Delete the parent disk","Power off and restore from backup only","Snapshot consolidation","Re-create the VM from scratch"],"correctAnswer":2},
  # 512 D2 ca:3
  {"id":"serverplus-512","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin shares /data via NFS but is concerned about clients writing as root with elevated privileges. Which NFS export option restricts root mapping on the server?",
   "choices":["no_subtree_check","async","insecure","root_squash (and avoid no_root_squash unless necessary)"],"correctAnswer":3},
  # 513 D2 ca:0
  {"id":"serverplus-513","domain":"Server Administration","type":"single-choice",
   "question":"A Windows file server is upgraded so that all SMB connections use SMB 3.x. Which feature pair is associated with SMB 3.x?",
   "choices":["SMB encryption and SMB Multichannel","NetBIOS over UDP only","Mandatory plaintext authentication","Single-stream connections only"],"correctAnswer":0},
  # 514 D2 ca:1
  {"id":"serverplus-514","domain":"Server Administration","type":"single-choice",
   "question":"A security review identifies that legacy SMB 1.0 is enabled on a file server. What is the recommended action?",
   "choices":["Keep it enabled for backward compatibility","Disable SMB 1.x; it is deprecated and has known security weaknesses","Enable SMB 1.x on all servers for performance","Replace SMB with FTP"],"correctAnswer":1},
  # 515 D2 ca:2
  {"id":"serverplus-515","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin compares DFS Namespace and DFS Replication. Which statement is accurate?",
   "choices":["DFS Replication provides a single namespace; DFS Namespace synchronizes folder content between servers","Both perform identical functions and are interchangeable","DFS Namespace provides a virtualized share path; DFS Replication synchronizes folder content between servers","Neither feature exists in Windows Server 2019+"],"correctAnswer":2},
  # 516 D2 ca:3
  {"id":"serverplus-516","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin formats a new volume with a mature, widely-used journaling filesystem that is the default on many distributions. Which filesystem fits?",
   "choices":["FAT32","NTFS","ReiserFS","ext4"],"correctAnswer":3},
  # 517 D2 ca:0
  {"id":"serverplus-517","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs a high-performance journaling filesystem that supports online growth and large-volume use cases on RHEL. Which filesystem is the default in RHEL 8+ for this purpose?",
   "choices":["XFS","FAT32","exFAT","HFS+"],"correctAnswer":0},
  # 518 D2 ca:1
  {"id":"serverplus-518","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs a copy-on-write filesystem with native snapshots, subvolumes, and integrated data checksums. Which filesystem fits?",
   "choices":["FAT32","Btrfs","UFS","HFS+"],"correctAnswer":1},
  # 519 D2 ca:2
  {"id":"serverplus-519","domain":"Server Administration","type":"single-choice",
   "question":"A storage admin builds a ZFS storage pool. Which ZFS-specific concept is the basic unit of redundancy within a pool?",
   "choices":["Inode","Extent","vdev (virtual device, e.g., mirror or raidz1)","sector"],"correctAnswer":2},
  # 520 D2 ca:3
  {"id":"serverplus-520","domain":"Server Administration","type":"single-choice",
   "question":"A Hyper-V admin creates new virtual disks for production VMs. Which file format should be selected for higher capacity and resiliency compared with the legacy format?",
   "choices":["VHD (legacy)","VMDK","RAW","VHDX"],"correctAnswer":3},
  # 521 D3 ca:0
  {"id":"serverplus-521","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An audit requirement states that no administrator should be able to silently modify or delete production audit logs. Which technique is most appropriate?",
   "choices":["Forward logs in near-real-time to an append-only/SIEM tier outside the audited host's admin scope","Compress logs on each server and overwrite weekly","Store logs only in /tmp","Email logs to all administrators"],"correctAnswer":0},
  # 522 D3 ca:1
  {"id":"serverplus-522","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A SOC wants all server syslog events forwarded to a centralized analysis platform. Which protocol/service is most commonly used to relay these events?",
   "choices":["SMTP","syslog (over UDP/514 or TLS) or rsyslog/syslog-ng to a central collector","NTP","DHCP"],"correctAnswer":1},
  # 523 D3 ca:2
  {"id":"serverplus-523","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security framework organizes cybersecurity activities into five high-level functions: Identify, Protect, Detect, Respond, and Recover. Which framework is this?",
   "choices":["PCI DSS","ISO 27001","NIST Cybersecurity Framework (CSF)","HIPAA"],"correctAnswer":2},
  # 524 D3 ca:3
  {"id":"serverplus-524","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A US federal information system follows a catalog of detailed security and privacy controls organized into families such as AC, AU, IA, and SC. Which document publishes this catalog?",
   "choices":["NIST CSF","PCI DSS","HIPAA","NIST SP 800-53"],"correctAnswer":3},
  # 525 D3 ca:0
  {"id":"serverplus-525","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An organization implements an Information Security Management System (ISMS) and pursues third-party certification against the relevant standard. Which standard fits?",
   "choices":["ISO/IEC 27001","RFC 1918","NIST CSF only","Sarbanes-Oxley"],"correctAnswer":0},
  # 526 D3 ca:1
  {"id":"serverplus-526","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"Before sharing sensitive technical details with a prospective vendor, the company has them sign a legal agreement restricting use and disclosure. What is this agreement called?",
   "choices":["SLA","NDA (Non-Disclosure Agreement)","RFC","SOW"],"correctAnswer":1},
  # 527 D3 ca:2
  {"id":"serverplus-527","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A company allows employees to access corporate email and files from personal phones and tablets. Which policy area governs the rules and security requirements for this access?",
   "choices":["Acceptable use only","SLA","BYOD (Bring Your Own Device) policy","Vendor management"],"correctAnswer":2},
  # 528 D3 ca:3
  {"id":"serverplus-528","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team enrolls corporate-managed phones into a system that pushes configuration, enforces PIN/encryption, and can remote-wipe lost devices. Which technology category is this?",
   "choices":["Network DLP","IDS","SIEM","Mobile Device Management (MDM) / UEM"],"correctAnswer":3},
  # 529 D3 ca:0
  {"id":"serverplus-529","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A company mandates full-disk encryption on all laptops. Which control does this MOST directly implement?",
   "choices":["Protect data at rest in case the device is lost or stolen","Improve disk performance","Eliminate the need for backups","Bypass MFA"],"correctAnswer":0},
  # 530 D3 ca:1
  {"id":"serverplus-530","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A user reports a stolen company phone. Which MDM action MOST directly protects corporate data on the device?",
   "choices":["Send a postal letter","Issue a remote wipe (or selective wipe of corporate data)","Disable Bluetooth on every other device","Change the AD password only"],"correctAnswer":1},
  # 531 D4 ca:2
  {"id":"serverplus-531","domain":"Troubleshooting","type":"single-choice",
   "question":"A SAN-attached server has two physical paths to its LUNs through separate fabrics. One fabric goes offline but the server continues to read/write. Which technology preserves availability?",
   "choices":["LACP NIC teaming","RAID 0 striping","Multipath I/O (MPIO) with active/passive or active/active paths","DRS rule"],"correctAnswer":2},
  # 532 D4 ca:3
  {"id":"serverplus-532","domain":"Troubleshooting","type":"single-choice",
   "question":"A server admin notices odd TCP behavior and slow throughput after enabling certain NIC offload features. Which class of offload, when buggy on a given driver/firmware combo, can sometimes cause TCP retransmissions and degraded throughput?",
   "choices":["Power-management offload","RGB LED control","Audio codec","TCP/UDP segmentation offload (TSO/USO) and Large Receive Offload (LRO)"],"correctAnswer":3},
  # 533 D4 ca:0
  {"id":"serverplus-533","domain":"Troubleshooting","type":"single-choice",
   "question":"A GPU compute server has begun crashing applications with CUDA/driver errors after a recent OS update. What is the FIRST corrective action to consider?",
   "choices":["Verify and update the GPU driver/firmware to a version supported on the current kernel/OS build","Reformat all data volumes","Disable ECC RAM","Reset the network switch"],"correctAnswer":0},
  # 534 D4 ca:1
  {"id":"serverplus-534","domain":"Troubleshooting","type":"single-choice",
   "question":"A server enters a reboot loop. POST completes, the OS begins to boot, then the system resets and starts again. Which step BEST separates hardware causes from OS/driver causes?",
   "choices":["Reformat the OS volume","Boot from a known-good live USB / recovery image; if the system stays up there, the issue is OS/driver-related","Disable ECC memory","Change the rack location"],"correctAnswer":1},
  # 535 D4 ca:2
  {"id":"serverplus-535","domain":"Troubleshooting","type":"single-choice",
   "question":"A server periodically logs SAS link errors against the same drive bay. Which troubleshooting step MOST directly isolates the bay/cable vs. the drive?",
   "choices":["Replace the motherboard immediately","Reflash the BIOS","Move the suspect drive to a different bay (or replace it with a known-good drive in the same bay) and see whether the errors follow the drive or the bay","Disable SMART monitoring"],"correctAnswer":2},
  # 536 D4 ca:3
  {"id":"serverplus-536","domain":"Troubleshooting","type":"single-choice",
   "question":"A RAID array is rebuilding onto a new hot spare. Which item should the admin actively monitor during this process to catch a secondary failure early?",
   "choices":["DNS query latency","NTP stratum","Page-file size","SMART pending-sector counts and rebuild progress percentage of the surviving member drives"],"correctAnswer":3},
  # 537 D4 ca:0
  {"id":"serverplus-537","domain":"Troubleshooting","type":"single-choice",
   "question":"A server's BIOS settings (boot order, time, etc.) revert to defaults after every full power loss. Which hardware component is the MOST likely culprit?",
   "choices":["CMOS / RTC coin-cell battery","DIMM 0","RAID controller cache battery","UPS battery only"],"correctAnswer":0},
  # 538 D4 ca:1
  {"id":"serverplus-538","domain":"Troubleshooting","type":"single-choice",
   "question":"A server experiences sporadic crashes under heavy CPU load while BMC voltage history shows brief out-of-range readings on the CPU rail. Which subsystem is the prime suspect?",
   "choices":["NIC driver only","CPU VRM (voltage regulator module) on the motherboard","NTP source","Active Directory time service"],"correctAnswer":1},
  # 539 D4 ca:2
  {"id":"serverplus-539","domain":"Troubleshooting","type":"single-choice",
   "question":"The BMC reports a fan as 0 RPM while the chassis is running. Which immediate consequence is the BMC's thermal management most likely to apply?",
   "choices":["Promote a new DC","Update Group Policy","Spin up remaining fans to higher RPM and/or apply CPU thermal throttling to keep temperatures within limits","Reset the RAID controller"],"correctAnswer":2},
  # 540 D4 ca:3
  {"id":"serverplus-540","domain":"Troubleshooting","type":"single-choice",
   "question":"A VM is migrated to a different host and immediately loses network connectivity. Which check is the MOST direct next step?",
   "choices":["Reformat the VM","Reinstall the OS","Disable ECC on the destination host","Verify the destination host has the same vSwitch / port group / VLAN configuration as the source"],"correctAnswer":3},

  # ── MR 541-543 ───────────────────────────────────────────────────────────
  # 541 D2 [1,3]
  {"id":"serverplus-541","domain":"Server Administration","type":"multiple-response",
   "question":"Which TWO capabilities were introduced or significantly enhanced in SMB 3.x compared with SMB 1.x? (Select 2)",
   "choices":["Mandatory plaintext authentication","SMB encryption","NetBIOS over UDP","SMB Multichannel"],"correctAnswers":[1,3]},
  # 542 D3 [0,2]
  {"id":"serverplus-542","domain":"Security and Disaster Recovery","type":"multiple-response",
   "question":"Which TWO controls most directly reduce risk when a corporate-managed mobile device is lost or stolen? (Select 2)",
   "choices":["Full-device encryption at rest","Disabling auto-lock","Remote wipe via MDM","Shared user accounts across all devices"],"correctAnswers":[0,2]},
  # 543 D4 [0,3]
  {"id":"serverplus-543","domain":"Troubleshooting","type":"multiple-response",
   "question":"Which TWO observations most strongly suggest a failing motherboard or VRM rather than a software problem? (Select 2)",
   "choices":["Random POST failures that occur even before any OS code runs","Slow web app TTFB on a single tenant","DHCP renewals failing on the network","Recurring out-of-range voltage warnings in the BMC system event log"],"correctAnswers":[0,3]},

  # ── Matching 544-545 ─────────────────────────────────────────────────────
  # 544 D2 correctMatches:[3,2,1,0]
  {"id":"serverplus-544","domain":"Server Administration","type":"matching",
   "question":"Match each Linux filesystem with its defining characteristic.",
   "itemsLeft":["ext4","XFS","Btrfs","ZFS"],
   "itemsRight":["Pool-based volume management with copy-on-write semantics and built-in redundancy","Copy-on-write filesystem with native snapshots, subvolumes, and integrated checksums","Highly parallel journaling filesystem that supports online growth (default on RHEL 8+)","Mature default journaling filesystem on many Linux distributions"],
   "correctMatches":[3,2,1,0]},
  # 545 D3 correctMatches:[3,1,2,0]
  {"id":"serverplus-545","domain":"Security and Disaster Recovery","type":"matching",
   "question":"Match each security framework or standard with its primary characterization.",
   "itemsLeft":["NIST CSF","NIST SP 800-53","ISO/IEC 27001","PCI DSS"],
   "itemsRight":["Compliance standard for organizations that store, process, or transmit cardholder data","Catalog of detailed security and privacy controls used by US federal systems","ISMS standard for managing information security at the program level","Five-function high-level cybersecurity framework: Identify, Protect, Detect, Respond, Recover"],
   "correctMatches":[3,1,2,0]},

  # ── Ordering 546-547 ─────────────────────────────────────────────────────
  # 546 D2 correctOrder:[2,3,1,4,0]
  {"id":"serverplus-546","domain":"Server Administration","type":"ordering",
   "question":"Arrange the steps for deploying a new ZFS pool on a Linux server in the correct order.",
   "items":["Add the pool to fstab or configure automatic mount at boot",
            "Tune dataset properties (compression, recordsize, atime, etc.)",
            "Identify usable disks and partition appropriately",
            "Create a zpool with the desired redundancy level (mirror, raidz1/2/3)",
            "Create datasets / zvols and assign them to consumers"],
   "correctOrder":[2,3,1,4,0]},
  # 547 D4 correctOrder:[1,0,2,3,4]
  {"id":"serverplus-547","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the steps for diagnosing intermittent unexpected server reboots in the most logical order.",
   "items":["Cross-reference reboots with OS event logs and the BMC system event log (SEL)",
            "Note the exact time and any user actions correlated with each reboot",
            "Examine voltage and temperature trends from BMC sensor history",
            "Reproduce after isolating one variable (recent firmware, new workload, etc.)",
            "Engage the vendor's support if a hardware fault is suspected"],
   "correctOrder":[1,0,2,3,4]},

  # ── SB 548-550 ────────────────────────────────────────────────────────────
  # 548 D2 [T,F,T,T]
  {"id":"serverplus-548","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about file-server protocols and virtualization formats and indicate whether it is True or False.",
   "statements":["SMB 3.x supports message encryption and SMB Multichannel for higher throughput.",
                 "SMB 1.0 is the recommended default protocol for new file shares because it offers the strongest security.",
                 "Hyper-V VHDX provides higher capacity and improved resiliency compared with the older VHD format.",
                 "DFS Namespace presents a single logical share path that can point to physical folder targets on different servers."],
   "correctAnswers":[True,False,True,True]},
  # 549 D3 [T,T,F,T]
  {"id":"serverplus-549","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about security frameworks, mobile device management, and audit logging and indicate whether it is True or False.",
   "statements":["The NIST Cybersecurity Framework organizes activities into five functions: Identify, Protect, Detect, Respond, Recover.",
                 "Mobile Device Management can enforce screen-lock and full-device encryption policies on enrolled devices.",
                 "A Non-Disclosure Agreement (NDA) is primarily a technical control that encrypts data in transit.",
                 "Audit logs should be protected for integrity so they cannot be silently altered by users with access to the systems they describe."],
   "correctAnswers":[True,True,False,True]},
  # 550 D4 [F,T,T,T]
  {"id":"serverplus-550","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about server hardware troubleshooting and indicate whether it is True or False.",
   "statements":["A failed fan reading 0 RPM has no effect on the BMC's thermal management decisions.",
                 "Multipath I/O can preserve LUN availability when one SAN path fails.",
                 "A failing VRM (voltage regulator module) can cause unstable voltages and result in random POST failures and reboots.",
                 "Correlating the time of an unexpected reboot against OS event logs and the BMC SEL is a useful step in isolating the cause."],
   "correctAnswers":[False,True,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
