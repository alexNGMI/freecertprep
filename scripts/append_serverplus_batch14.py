import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 651-690 ───────────────────────────────────────────────────────────
  # 651 D1 ca:0
  {"id":"serverplus-651","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data-center facility advertises a 'Tier III' rating per the Uptime Institute. What is the primary characteristic of a Tier III data center?",
   "choices":["Concurrently maintainable: any single component can be serviced without taking down production","Fault tolerant with no single point of failure during a major event","Basic single-path power and cooling with no redundancy","Bare-bones tier with no commitment to uptime"],"correctAnswer":0},
  # 652 D1 ca:1
  {"id":"serverplus-652","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A facility reports a PUE of 1.4. What does PUE describe?",
   "choices":["Average storage IOPS per rack","Power Usage Effectiveness — ratio of total facility energy to IT-equipment energy","Per-rack U capacity utilization","Personnel utilization efficiency"],"correctAnswer":1},
  # 653 D1 ca:2
  {"id":"serverplus-653","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"An IT planner considers when to replace existing servers. Which factor MOST commonly drives server end-of-life and refresh decisions?",
   "choices":["Server paint color fading","Improved power efficiency in newer models only","A combination of warranty/EOL support status, performance per watt, repair costs, and workload growth","Vendor logo redesigns"],"correctAnswer":2},
  # 654 D1 ca:3
  {"id":"serverplus-654","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A retired drive contained sensitive data and cannot be returned to a vendor. Which destruction method provides the highest assurance the data cannot be recovered?",
   "choices":["File deletion","Quick format","Single-pass overwrite with zeros only","Physical shredding or degaussing (for magnetic media) following an approved sanitization standard"],"correctAnswer":3},
  # 655 D1 ca:0
  {"id":"serverplus-655","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center retires obsolete servers. Which practice is the correct way to dispose of the hardware?",
   "choices":["Use an approved e-waste recycler that documents responsible disposal and certifies data destruction","Donate the servers without wiping","Place them in the office dumpster","Resell drives still containing customer data"],"correctAnswer":0},
  # 656 D1 ca:1
  {"id":"serverplus-656","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"An ops manager establishes a multi-year process for procurement, deployment, operation, refresh, and disposal of server hardware. What is this practice called?",
   "choices":["Capacity planning only","IT asset lifecycle management","Penetration testing","SLA management"],"correctAnswer":1},
  # 657 D1 ca:2
  {"id":"serverplus-657","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A 24x7 production environment relies on rapid replacement of failed hardware. Which logistics practice MOST directly supports this?",
   "choices":["Disable spare parts inventory","Order replacement parts only after failures","Maintain an on-site/colocated spare-parts kit for high-criticality components, with vendor SLAs for the rest","Use only the cheapest available parts"],"correctAnswer":2},
  # 658 D1 ca:3
  {"id":"serverplus-658","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A standard server commissioning checklist is used for every new install. Which item would NOT belong on a basic commissioning checklist?",
   "choices":["Rack and stack with proper labeling","Firmware and OS hardening","BMC setup with non-default credentials","Manually overwriting random sectors of the boot disk for 'good luck'"],"correctAnswer":3},
  # 659 D2 ca:0
  {"id":"serverplus-659","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin describes the boot sequence to a new hire. Which sequence is correct?",
   "choices":["Firmware (BIOS/UEFI) → Bootloader (GRUB) → Linux kernel → init / systemd","UEFI → systemd → kernel → GRUB","Kernel → GRUB → systemd → firmware","GRUB → kernel → firmware → systemd"],"correctAnswer":0},
  # 660 D2 ca:1
  {"id":"serverplus-660","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin describes the boot sequence of Windows Server. Which sequence is correct?",
   "choices":["Wininit → smss → kernel → bootmgr → firmware","Firmware → bootmgr → winload.exe / winload.efi → ntoskrnl (kernel) → smss / wininit","ntoskrnl → bootmgr → firmware → winload","bootmgr → firmware → kernel → wininit"],"correctAnswer":1},
  # 661 D2 ca:2
  {"id":"serverplus-661","domain":"Server Administration","type":"single-choice",
   "question":"A systemd unit must always start AFTER the network is online but does NOT strictly require the network unit. Which directive expresses an ordering preference without a hard dependency?",
   "choices":["Requires=","Wants= only","After=","BindsTo="],"correctAnswer":2},
  # 662 D2 ca:3
  {"id":"serverplus-662","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs to see only error-level (priority 3) messages for nginx.service over the past hour. Which command is most appropriate?",
   "choices":["dmesg","cat /var/log/messages","systemctl status nginx -l","journalctl -u nginx.service -p err --since '1 hour ago'"],"correctAnswer":3},
  # 663 D2 ca:3
  {"id":"serverplus-663","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin tunes syslog routing. Which concept categorizes a log message by its originating subsystem, e.g., auth, daemon, mail, cron?",
   "choices":["Severity only","Priority value (numeric)","Tag","Facility"],"correctAnswer":3},
  # 664 D2 ca:1
  {"id":"serverplus-664","domain":"Server Administration","type":"single-choice",
   "question":"A web application is throwing intermittent HTTP 500 errors. Which log set is MOST directly useful to investigate the root cause?",
   "choices":["NTFS file system journal only","The application's own logs (and the web server / app server access and error logs)","NTP statistics","ARP table"],"correctAnswer":1},
  # 665 D2 ca:2
  {"id":"serverplus-665","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin needs to enable an optional Server feature from PowerShell or the command line. Which tool is appropriate?",
   "choices":["fdisk","Notepad","DISM /Online /Enable-Feature (or Install-WindowsFeature in PowerShell)","route print"],"correctAnswer":2},
  # 666 D2 ca:3
  {"id":"serverplus-666","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin scripts the management of optional features on Windows clients. Which PowerShell cmdlet specifically targets Windows client optional features?",
   "choices":["Install-WindowsFeature","Add-WindowsCapability","Get-WindowsFeature","Enable-WindowsOptionalFeature"],"correctAnswer":3},
  # 667 D2 ca:0
  {"id":"serverplus-667","domain":"Server Administration","type":"single-choice",
   "question":"An AD admin creates pre-configured user objects (with standard group memberships, password policy, and profile attributes) to speed onboarding. What is this construct commonly called?",
   "choices":["User account template","Group Policy Object","FSMO role","Trust relationship"],"correctAnswer":0},
  # 668 D2 ca:1
  {"id":"serverplus-668","domain":"Server Administration","type":"single-choice",
   "question":"An organization wants stricter password requirements for privileged accounts than for regular user accounts within the same domain. Which AD feature provides this?",
   "choices":["Per-OU GPO password policy (legacy)","Fine-grained password policies via Password Settings Objects (PSOs)","Multiple domains, one per password policy","Forest-wide AD recycle bin"],"correctAnswer":1},
  # 669 D2 ca:2
  {"id":"serverplus-669","domain":"Server Administration","type":"single-choice",
   "question":"A standard AD password policy GPO controls which of the following settings out of the box?",
   "choices":["Office locations of users","NIC duplex settings","Minimum password length, complexity requirements, password history, and maximum age","Group Policy precedence order"],"correctAnswer":2},
  # 670 D3 ca:0
  {"id":"serverplus-670","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"Under GDPR, which set of rights are granted to EU data subjects?",
   "choices":["Rights such as access, rectification, erasure, restriction, portability, and objection","No rights regarding their own personal data","Right to mandatory CCTV in their home","Right to enter any data center"],"correctAnswer":0},
  # 671 D3 ca:1
  {"id":"serverplus-671","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"Under GDPR, what is the general timeframe within which a personal-data breach must be notified to the supervisory authority (where feasible)?",
   "choices":["Within 30 days","Within 72 hours of becoming aware of the breach (where feasible)","Within 12 months","Notification is optional"],"correctAnswer":1},
  # 672 D3 ca:2
  {"id":"serverplus-672","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A SaaS vendor publishes a SOC 2 Type II report. Which scope does this report describe?",
   "choices":["A one-time design assessment","A penetration test","Independent audit of the design AND operating effectiveness of internal controls over a period of time","A vulnerability scan summary"],"correctAnswer":2},
  # 673 D3 ca:3
  {"id":"serverplus-673","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A US federal agency needs a cloud service that has gone through a standardized security assessment, authorization, and continuous monitoring process. Which program is this?",
   "choices":["PCI DSS","HIPAA","ISO 27001","FedRAMP"],"correctAnswer":3},
  # 674 D3 ca:0
  {"id":"serverplus-674","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A US healthcare-related covered entity experiences a breach of unsecured protected health information. Which rule applies to required notification?",
   "choices":["HIPAA Breach Notification Rule","PCI DSS only","GDPR only","SOX only"],"correctAnswer":0},
  # 675 D3 ca:1
  {"id":"serverplus-675","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"Which European Union directive expands cybersecurity requirements across critical and important sectors and updates the original Network and Information Security framework?",
   "choices":["GDPR","NIS2","ePrivacy Regulation","PSD2"],"correctAnswer":1},
  # 676 D3 ca:2
  {"id":"serverplus-676","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A vendor publishes a Vulnerability Disclosure Policy (VDP). What is its primary purpose?",
   "choices":["To prevent any external party from reporting bugs","To replace all internal security testing","Provides a safe, legal channel for external researchers to report vulnerabilities and describes how the vendor will respond","To eliminate the need for patching"],"correctAnswer":2},
  # 677 D3 ca:3
  {"id":"serverplus-677","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team runs simulated phishing emails against employees to measure and improve detection. Which program is this part of?",
   "choices":["Penetration test","Tabletop exercise","Vulnerability scan","Phishing simulation / security awareness program"],"correctAnswer":3},
  # 678 D3 ca:0
  {"id":"serverplus-678","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security architect builds a formal insider-threat program. Which control set is MOST core to detecting insider misuse early?",
   "choices":["User and entity behavior analytics, separation of duties, mandatory leave, and access reviews","TLS upgrades only","DNS caching tuning","Removing all access logging"],"correctAnswer":0},
  # 679 D4 ca:1
  {"id":"serverplus-679","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin needs to expand an LVM logical volume that hosts /data. Which sequence is correct?",
   "choices":["resize2fs first, then lvextend","Add disk → pvcreate → vgextend → lvextend → resize2fs/xfs_growfs","mkfs.ext4 directly on the new disk","Reboot to single-user mode and run fdisk only"],"correctAnswer":1},
  # 680 D4 ca:2
  {"id":"serverplus-680","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows admin needs to extend the E: drive into adjacent unallocated space. Which built-in tool is appropriate?",
   "choices":["Notepad","Wireshark","Disk Management (or diskpart with 'extend')","Hyper-V Manager"],"correctAnswer":2},
  # 681 D4 ca:3
  {"id":"serverplus-681","domain":"Troubleshooting","type":"single-choice",
   "question":"A team needs to make an exact block-level copy of a Linux boot drive to migrate to new hardware. Which approach is appropriate (with proper precautions)?",
   "choices":["mv /dev/sda1 /dev/sdb1","cp -r everything from / to new drive","Clonezilla or 'dd if=/dev/sda of=/dev/sdb' (with proper safety checks and offline source)","Format /dev/sda and reinstall the OS from scratch"],"correctAnswer":3},
  # 682 D4 ca:0
  {"id":"serverplus-682","domain":"Troubleshooting","type":"single-choice",
   "question":"A company migrates on-prem VMs to AWS while keeping the application running. Which AWS service category is purpose-built for this 'lift and shift' migration with continuous replication?",
   "choices":["AWS Application Migration Service / Database Migration Service","S3 only","Route 53 only","CloudFront only"],"correctAnswer":0},
  # 683 D4 ca:1
  {"id":"serverplus-683","domain":"Troubleshooting","type":"single-choice",
   "question":"A SaaS application is hosted in a single cloud region and must continue running if that region fails. Which design pattern fits this requirement?",
   "choices":["Single-AZ deployment in one region","Multi-region active/passive (or active/active) with tested DR failover","All compute in one zone with no replication","No DR strategy"],"correctAnswer":1},
  # 684 D4 ca:2
  {"id":"serverplus-684","domain":"Troubleshooting","type":"single-choice",
   "question":"A security review finds that a private S3 bucket is exposing files to the public internet. Which common misconfiguration is the MOST likely cause?",
   "choices":["MFA is enabled on the account","TLS 1.3 is in use","An overly permissive bucket policy or ACL granted 'AllUsers' read access","KMS keys were rotated"],"correctAnswer":2},
  # 685 D4 ca:3
  {"id":"serverplus-685","domain":"Troubleshooting","type":"single-choice",
   "question":"A user reports that traffic from a specific EC2 instance to an RDS database is being dropped, but identical traffic from another instance works. Which configuration is the MOST direct first check?",
   "choices":["Cabinet temperature in the data center","BMC fan curve","NTP source","The Security Group (or NACL) rules attached to the failing instance/RDS and any subnet route differences"],"correctAnswer":3},
  # 686 D4 ca:0
  {"id":"serverplus-686","domain":"Troubleshooting","type":"single-choice",
   "question":"A remote office connects over a satellite link with high round-trip latency. Which protocol/application is MOST sensitive to this latency?",
   "choices":["Interactive SSH sessions and synchronous TCP request/response workloads","Bulk file transfers using parallel streams","DNS queries","Streaming media that buffers heavily"],"correctAnswer":0},
  # 687 D4 ca:1
  {"id":"serverplus-687","domain":"Troubleshooting","type":"single-choice",
   "question":"A team suspects an ISP is rate-limiting (throttling) certain traffic types. Which test is MOST useful to characterize this?",
   "choices":["Reformatting the server","Run controlled iperf/iperf3 tests for different protocols, ports, and times of day and compare against the contracted bandwidth","Replacing the rack","Reflashing the BIOS"],"correctAnswer":1},
  # 688 D4 ca:2
  {"id":"serverplus-688","domain":"Troubleshooting","type":"single-choice",
   "question":"A VMware admin uses thin-provisioned VMDKs and the underlying datastore unexpectedly fills up. Which immediate operational impact is MOST common?",
   "choices":["No effect on running VMs","All VMs run faster due to caching","Affected VMs are paused/stunned by the host until space is reclaimed or added","All snapshots auto-delete"],"correctAnswer":2},
  # 689 D4 ca:3
  {"id":"serverplus-689","domain":"Troubleshooting","type":"single-choice",
   "question":"A DNS record for a public site was changed an hour ago, and some users still see the old IP. What is the MOST likely cause?",
   "choices":["The site is offline","The DNS resolvers are broken","Search engines need to reindex","DNS caching at recursive resolvers and clients — the record's TTL has not yet expired everywhere"],"correctAnswer":3},
  # 690 D4 ca:0
  {"id":"serverplus-690","domain":"Troubleshooting","type":"single-choice",
   "question":"A VMware datastore reaches 90% utilization and triggers a high-priority alarm. Which immediate corrective action is MOST appropriate?",
   "choices":["Identify and reclaim space (delete stale snapshots, evacuate or thin-reclaim VMs, or add capacity) and re-trigger the alarm","Power off all VMs immediately","Disable the alarm","Reformat the datastore"],"correctAnswer":0},

  # ── MR 691-693 ───────────────────────────────────────────────────────────
  # 691 D3 [1,3]
  {"id":"serverplus-691","domain":"Security and Disaster Recovery","type":"multiple-response",
   "question":"Which TWO regulations explicitly require timely notification of certain data breaches to regulators and/or affected individuals? (Select 2)",
   "choices":["RFC 1918","GDPR","ISO/IEC 27001 only","HIPAA Breach Notification Rule"],"correctAnswers":[1,3]},
  # 692 D2 [0,2]
  {"id":"serverplus-692","domain":"Server Administration","type":"multiple-response",
   "question":"Which TWO components are part of the Windows Server boot sequence? (Select 2)",
   "choices":["bootmgr (Windows Boot Manager)","fdisk","winload.exe / winload.efi","systemd"],"correctAnswers":[0,2]},
  # 693 D4 [0,2]
  {"id":"serverplus-693","domain":"Troubleshooting","type":"multiple-response",
   "question":"Which TWO practices most directly support rapid failover to a different cloud region during an outage? (Select 2)",
   "choices":["Multi-region data replication","Hard-coding a single region's IPs throughout the application","A tested DR runbook with documented RTO/RPO","No backups outside the primary region"],"correctAnswers":[0,2]},

  # ── Matching 694-695 ─────────────────────────────────────────────────────
  # 694 D2 correctMatches:[3,2,0,1]
  {"id":"serverplus-694","domain":"Server Administration","type":"matching",
   "question":"Match each Linux boot stage with its primary responsibility.",
   "itemsLeft":["UEFI/BIOS firmware","Bootloader (GRUB)","Linux kernel","init / systemd"],
   "itemsRight":["Mounts the root filesystem and initializes drivers and core subsystems","Starts user-space services in dependency order","Locates and loads the operating system kernel and initrd","Performs firmware self-test and chooses the boot device"],
   "correctMatches":[3,2,0,1]},
  # 695 D3 correctMatches:[3,1,2,0]
  {"id":"serverplus-695","domain":"Security and Disaster Recovery","type":"matching",
   "question":"Match each regulation with the area it primarily governs.",
   "itemsLeft":["GDPR","HIPAA","PCI DSS","SOX"],
   "itemsRight":["US public-company financial reporting controls","US healthcare information privacy and security","Payment card data security","EU data subjects' personal data and breach notification"],
   "correctMatches":[3,1,2,0]},

  # ── Ordering 696-697 ─────────────────────────────────────────────────────
  # 696 D2 correctOrder:[1,2,3,0,4]
  {"id":"serverplus-696","domain":"Server Administration","type":"ordering",
   "question":"Arrange the Linux boot phases in the correct order.",
   "items":["init / systemd starts user-space services in dependency order",
            "Firmware (BIOS/UEFI) completes POST and selects the boot device",
            "Bootloader (e.g., GRUB) loads the kernel and initrd into memory",
            "Kernel mounts the root filesystem and starts PID 1 (init/systemd)",
            "Login prompt becomes available on console or SSH"],
   "correctOrder":[1,2,3,0,4]},
  # 697 D4 correctOrder:[3,2,1,0,4]
  {"id":"serverplus-697","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the LVM steps for growing /data online in the correct order.",
   "items":["Resize the file system on the logical volume (resize2fs for ext4, xfs_growfs for XFS)",
            "Grow the logical volume to use the new space",
            "Add the new physical volume to the volume group",
            "Add a new physical disk to the server and initialize it as a physical volume (pvcreate)",
            "Verify the resized file system reports the new capacity to users"],
   "correctOrder":[3,2,1,0,4]},

  # ── SB 698-700 ────────────────────────────────────────────────────────────
  # 698 D2 [T,T,F,T]
  {"id":"serverplus-698","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about server boot and service management and indicate whether it is True or False.",
   "statements":["On UEFI Linux, the firmware completes POST and selects the boot loader / EFI binary before the kernel is loaded.",
                 "systemd's After= and Requires= directives express ordering and dependency between units.",
                 "'journalctl -u <service>' shows only system-wide kernel messages with no per-service filtering.",
                 "Windows bootmgr typically locates and loads winload.exe / winload.efi to start the kernel."],
   "correctAnswers":[True,True,False,True]},
  # 699 D3 [T,T,F,T]
  {"id":"serverplus-699","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about regulatory and audit programs and indicate whether it is True or False.",
   "statements":["GDPR generally requires that personal-data breaches be notified to the supervisory authority within 72 hours of awareness, where feasible.",
                 "SOC 2 Type II reports cover both the design AND operating effectiveness of controls over an audit period.",
                 "FedRAMP authorization is irrelevant for cloud services serving US federal agencies.",
                 "HIPAA's Breach Notification Rule requires covered entities to notify affected individuals of certain breaches of unsecured PHI."],
   "correctAnswers":[True,True,False,True]},
  # 700 D4 [T,F,T,T]
  {"id":"serverplus-700","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about storage expansion and cloud operations and indicate whether it is True or False.",
   "statements":["To grow an LVM logical volume online, the underlying volume group must have free physical extents available.",
                 "Any logical volume can always be shrunk online with no risk of file-system corruption, regardless of file-system type.",
                 "An overly permissive S3 bucket policy or ACL can expose objects publicly to the internet.",
                 "Multi-region data replication and a tested DR runbook are common prerequisites for rapid cloud region failover."],
   "correctAnswers":[True,False,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
