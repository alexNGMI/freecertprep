import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 1-40 ────────────────────────────────────────────────────────────
  # 1 D1 ca:0
  {"id":"serverplus-1","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A technician is planning a new rack deployment. What is the height of one rack unit (1U) in inches?",
   "choices":["1.75","2.0","1.5","3.5"],"correctAnswer":0},
  # 2 D1 ca:1
  {"id":"serverplus-2","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"An organization needs to maximize compute density inside a single rack chassis with shared power and cooling. Which server form factor best meets this requirement?",
   "choices":["Tower","Blade","Rack-mounted 4U","Mini-tower"],"correctAnswer":1},
  # 3 D1 ca:2
  {"id":"serverplus-3","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A server is configured with N+1 power supply redundancy. What does N+1 mean in this context?",
   "choices":["The server has exactly the number of PSUs required, no extras","Each PSU is rated for double the server's power draw","One additional PSU is installed beyond the minimum required to power the system","Two redundant PSUs share load 50/50 with no spare"],"correctAnswer":2},
  # 4 D1 ca:3
  {"id":"serverplus-4","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A new server requires fault tolerance with the simplest two-disk configuration. Which RAID level provides redundancy by writing identical data to both drives?",
   "choices":["RAID 0","RAID 5","RAID 6","RAID 1"],"correctAnswer":3},
  # 5 D1 ca:0
  {"id":"serverplus-5","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A storage admin wants striping with distributed parity across at least three drives to tolerate a single drive failure. Which RAID level fits?",
   "choices":["RAID 5","RAID 1","RAID 0","RAID 10"],"correctAnswer":0},
  # 6 D1 ca:1
  {"id":"serverplus-6","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A finance application demands an array that can survive two simultaneous drive failures using distributed parity. Which RAID level should be configured?",
   "choices":["RAID 5","RAID 6","RAID 10","RAID 1"],"correctAnswer":1},
  # 7 D1 ca:2
  {"id":"serverplus-7","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A database server needs both performance and redundancy. The admin configures a stripe of mirrored pairs. Which RAID level is this?",
   "choices":["RAID 5","RAID 6","RAID 10","RAID 50"],"correctAnswer":2},
  # 8 D1 ca:3
  {"id":"serverplus-8","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A technician needs to replace a failed drive in a production server without powering it down. Which drive feature enables this?",
   "choices":["Cold spare","Warm spare","JBOD","Hot-swap"],"correctAnswer":3},
  # 9 D2 ca:0
  {"id":"serverplus-9","domain":"Server Administration","type":"single-choice",
   "question":"A data center deploys a Type 1 hypervisor on a new server. Which statement best describes a Type 1 (bare-metal) hypervisor?",
   "choices":["It runs directly on the host hardware without requiring an underlying operating system","It runs as an application inside a host operating system","It is limited to single-VM execution","It cannot run more than one guest OS at a time"],"correctAnswer":0},
  # 10 D2 ca:1
  {"id":"serverplus-10","domain":"Server Administration","type":"single-choice",
   "question":"A developer installs VirtualBox on a Windows 11 laptop to run test VMs. Which hypervisor category is VirtualBox?",
   "choices":["Type 1","Type 2","Type 3","Para-virtualized only"],"correctAnswer":1},
  # 11 D2 ca:2
  {"id":"serverplus-11","domain":"Server Administration","type":"single-choice",
   "question":"An organization standardizes on a hypervisor that runs directly on the hardware and is part of the vSphere product family. Which hypervisor is this?",
   "choices":["Hyper-V","KVM","ESXi","Xen"],"correctAnswer":2},
  # 12 D2 ca:3
  {"id":"serverplus-12","domain":"Server Administration","type":"single-choice",
   "question":"A Windows-centric shop wants a Type 1 hypervisor that is integrated with Windows Server. Which hypervisor should the admin choose?",
   "choices":["ESXi","KVM","Xen","Hyper-V"],"correctAnswer":3},
  # 13 D2 ca:0
  {"id":"serverplus-13","domain":"Server Administration","type":"single-choice",
   "question":"An admin wants a hypervisor that is built directly into the Linux kernel as a module. Which technology fits?",
   "choices":["KVM","ESXi","Hyper-V","VMware Workstation"],"correctAnswer":0},
  # 14 D2 ca:1
  {"id":"serverplus-14","domain":"Server Administration","type":"single-choice",
   "question":"A VMware admin needs to move a running VM from one ESXi host to another with no downtime. Which feature provides this capability?",
   "choices":["Cold migration","vMotion","Snapshot rollback","Storage VMotion"],"correctAnswer":1},
  # 15 D2 ca:2
  {"id":"serverplus-15","domain":"Server Administration","type":"single-choice",
   "question":"A development team needs lightweight, OS-level isolation that packages applications with their dependencies and shares the host kernel. Which technology should they adopt?",
   "choices":["Type 1 hypervisor","Bare-metal install","Docker containers","Full virtual machines"],"correctAnswer":2},
  # 16 D2 ca:3
  {"id":"serverplus-16","domain":"Server Administration","type":"single-choice",
   "question":"A platform team wants to orchestrate, scale, and self-heal hundreds of containerized microservices across a cluster of nodes. Which tool should they use?",
   "choices":["Docker Compose","systemd","Ansible","Kubernetes"],"correctAnswer":3},
  # 17 D2 ca:0
  {"id":"serverplus-17","domain":"Server Administration","type":"single-choice",
   "question":"An admin installs Windows Server with no graphical desktop, using only the command line and remote management. Which installation option is this?",
   "choices":["Server Core","Desktop Experience","Nano Server (deprecated)","WinPE"],"correctAnswer":0},
  # 18 D2 ca:1
  {"id":"serverplus-18","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin needs a centralized directory service that stores user accounts, groups, and computer objects and supports Kerberos authentication and Group Policy. Which Microsoft service provides this?",
   "choices":["DNS","Active Directory Domain Services","Windows Update","File and Storage Services"],"correctAnswer":1},
  # 19 D2 ca:2
  {"id":"serverplus-19","domain":"Server Administration","type":"single-choice",
   "question":"A network admin wants client devices to automatically receive IP address, default gateway, and DNS server information when they connect to the LAN. Which server role should be deployed?",
   "choices":["DNS server","WINS server","DHCP server","TFTP server"],"correctAnswer":2},
  # 20 D2 ca:3
  {"id":"serverplus-20","domain":"Server Administration","type":"single-choice",
   "question":"A user types www.example.com into a browser and the resulting connection reaches the correct server. Which server role made that translation possible?",
   "choices":["DHCP","WINS","Proxy","DNS"],"correctAnswer":3},
  # 21 D3 ca:0
  {"id":"serverplus-21","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A Windows administrator needs full-disk encryption on a server's system volume, using TPM-backed key storage. Which Microsoft technology should be enabled?",
   "choices":["BitLocker","EFS","DPAPI","Credential Guard"],"correctAnswer":0},
  # 22 D3 ca:1
  {"id":"serverplus-22","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A Linux administrator must encrypt a server's local data volume at rest. Which native Linux disk encryption technology is most appropriate?",
   "choices":["BitLocker","LUKS","NTFS EFS","S/MIME"],"correctAnswer":1},
  # 23 D3 ca:2
  {"id":"serverplus-23","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team needs to grant permissions based on a user's job function rather than assigning rights to individuals. Which access control model fits this requirement?",
   "choices":["DAC","MAC","RBAC","Rule-based"],"correctAnswer":2},
  # 24 D3 ca:3
  {"id":"serverplus-24","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A server admin wants to require a password plus a one-time code from an authenticator app for all administrative logins. Which security control is this?",
   "choices":["Single sign-on","Federated identity","Password rotation policy","Multi-factor authentication"],"correctAnswer":3},
  # 25 D3 ca:0
  {"id":"serverplus-25","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security policy states that user accounts should be granted only the access necessary to perform their job duties. Which principle does this enforce?",
   "choices":["Least privilege","Defense in depth","Separation of duties","Implicit deny"],"correctAnswer":0},
  # 26 D3 ca:1
  {"id":"serverplus-26","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A business sets a maximum tolerable downtime of 4 hours for a critical application after a failure. Which DR metric is being defined?",
   "choices":["RPO","RTO","MTBF","MTTR"],"correctAnswer":1},
  # 27 D3 ca:2
  {"id":"serverplus-27","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A business sets a maximum acceptable data loss window of 1 hour for transaction data. Which DR metric is being defined?",
   "choices":["RTO","MTBF","RPO","SLA"],"correctAnswer":2},
  # 28 D3 ca:3
  {"id":"serverplus-28","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A backup admin runs a weekly Sunday job that captures every selected file regardless of prior backups. Which backup type is this?",
   "choices":["Incremental","Differential","Synthetic","Full"],"correctAnswer":3},
  # 29 D3 ca:0
  {"id":"serverplus-29","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"After Sunday's full backup, the admin runs a job each weekday that captures only files changed since the previous day's backup. Which backup type is this?",
   "choices":["Incremental","Differential","Full","Synthetic full"],"correctAnswer":0},
  # 30 D3 ca:1
  {"id":"serverplus-30","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"After Sunday's full backup, the admin runs a job each weekday that captures every file changed since the last full backup. Which backup type is this?",
   "choices":["Incremental","Differential","Full","Synthetic full"],"correctAnswer":1},
  # 31 D4 ca:2
  {"id":"serverplus-31","domain":"Troubleshooting","type":"single-choice",
   "question":"A technician powers on a server and observes diagnostic beep codes before any operating system loads. Which firmware-level process is generating these codes?",
   "choices":["Kernel boot","UEFI Secure Boot policy","POST (Power-On Self-Test)","ACPI handoff"],"correctAnswer":2},
  # 32 D4 ca:3
  {"id":"serverplus-32","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows server crashes with a STOP error displaying a blue screen and a memory dump file. What is this commonly called?",
   "choices":["Kernel panic","Stack overflow","Segmentation fault","Blue Screen of Death (BSOD)"],"correctAnswer":3},
  # 33 D4 ca:0
  {"id":"serverplus-33","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux server abruptly halts and prints a stack trace to the console, after which the system becomes unresponsive. What is this condition called?",
   "choices":["Kernel panic","BSOD","ACPI shutdown","Soft lockup recovery"],"correctAnswer":0},
  # 34 D4 ca:1
  {"id":"serverplus-34","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows admin suspects a corrupted file system on a volume after a power loss. Which built-in command should be run to scan and repair the volume?",
   "choices":["sfc","chkdsk","fsck","DISM"],"correctAnswer":1},
  # 35 D4 ca:2
  {"id":"serverplus-35","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin needs to check and repair a corrupted ext4 file system on an unmounted volume. Which command is used?",
   "choices":["chkdsk","sfc","fsck","dumpe2fs"],"correctAnswer":2},
  # 36 D4 ca:3
  {"id":"serverplus-36","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin needs a quick real-time view of CPU usage and the top resource-consuming processes. Which command provides this?",
   "choices":["ls","ps","df","top"],"correctAnswer":3},
  # 37 D4 ca:0
  {"id":"serverplus-37","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows admin needs to review system, security, and application logs after a server reboot. Which built-in tool should be opened?",
   "choices":["Event Viewer","Task Manager","Resource Monitor","Performance Monitor"],"correctAnswer":0},
  # 38 D4 ca:1
  {"id":"serverplus-38","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin needs to view logs collected by systemd's journal, filtered by service and time range. Which command should be used?",
   "choices":["syslog","journalctl","dmesg","logger"],"correctAnswer":1},
  # 39 D4 ca:2
  {"id":"serverplus-39","domain":"Troubleshooting","type":"single-choice",
   "question":"A server admin wants to quickly verify whether a remote server is reachable over the network at the IP layer. Which command should be used first?",
   "choices":["tracert","arp","ping","nslookup"],"correctAnswer":2},
  # 40 D4 ca:3
  {"id":"serverplus-40","domain":"Troubleshooting","type":"single-choice",
   "question":"A server admin wants to see all listening TCP ports and active connections on a Windows server. Which command provides this view?",
   "choices":["ipconfig","route print","arp -a","netstat -an"],"correctAnswer":3},

  # ── MR 41-43 ────────────────────────────────────────────────────────────
  # 41 D1 [1,3]
  {"id":"serverplus-41","domain":"Server Hardware Installation and Management","type":"multiple-response",
   "question":"Which TWO RAID levels provide fault tolerance through striping with parity? (Select 2)",
   "choices":["RAID 0","RAID 5","RAID 1","RAID 6"],"correctAnswers":[1,3]},
  # 42 D2 [0,2]
  {"id":"serverplus-42","domain":"Server Administration","type":"multiple-response",
   "question":"Which TWO statements correctly describe Type 1 (bare-metal) hypervisors? (Select 2)",
   "choices":["Run directly on the underlying server hardware","Require a general-purpose host operating system to function","Generally have lower overhead and better performance than Type 2","Examples include VirtualBox and VMware Workstation"],"correctAnswers":[0,2]},
  # 43 D4 [0,2]
  {"id":"serverplus-43","domain":"Troubleshooting","type":"multiple-response",
   "question":"A Linux administrator needs to monitor real-time CPU and memory utilization on a busy server. Which TWO commands display continuously updating process and resource information? (Select 2)",
   "choices":["top","ls","htop","cat"],"correctAnswers":[0,2]},

  # ── Matching 44-45 ──────────────────────────────────────────────────────
  # 44 D1 correctMatches:[1,0,3,2]
  {"id":"serverplus-44","domain":"Server Hardware Installation and Management","type":"matching",
   "question":"Match each RAID level with its defining characteristic.",
   "itemsLeft":["RAID 0","RAID 1","RAID 5","RAID 10"],
   "itemsRight":["Mirroring with no parity","Striping with no redundancy","Striped set of mirrored pairs","Striping with single distributed parity"],
   "correctMatches":[1,0,3,2]},
  # 45 D3 correctMatches:[1,0,2,3]
  {"id":"serverplus-45","domain":"Security and Disaster Recovery","type":"matching",
   "question":"Match each backup type with its defining behavior.",
   "itemsLeft":["Full","Incremental","Differential","Synthetic full"],
   "itemsRight":["Captures only data that has changed since the last backup of any type","Captures every selected file each run, regardless of prior backups","Captures every file changed since the last full backup","Constructed by combining a prior full backup with subsequent increments"],
   "correctMatches":[1,0,2,3]},

  # ── Ordering 46-47 ──────────────────────────────────────────────────────
  # 46 D4 correctOrder:[1,4,0,2,3]
  {"id":"serverplus-46","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the CompTIA troubleshooting methodology in the correct order.",
   "items":["Test the theory to determine cause",
            "Identify the problem",
            "Establish a plan of action and implement the solution",
            "Verify full system functionality and document findings",
            "Establish a theory of probable cause"],
   "correctOrder":[1,4,0,2,3]},
  # 47 D3 correctOrder:[1,2,0,3,4]
  {"id":"serverplus-47","domain":"Security and Disaster Recovery","type":"ordering",
   "question":"A server failed Wednesday morning. Sunday's full backup plus Monday, Tuesday, and Wednesday-morning incremental backups exist. Arrange the steps to restore the server to its most recent state.",
   "items":["Restore Tuesday's incremental backup",
            "Restore Sunday's full backup",
            "Restore Monday's incremental backup",
            "Restore Wednesday-morning incremental backup",
            "Verify data integrity and bring services online"],
   "correctOrder":[1,2,0,3,4]},

  # ── SB 48-50 ────────────────────────────────────────────────────────────
  # 48 D1 [F,T,F,T]
  {"id":"serverplus-48","domain":"Server Hardware Installation and Management","type":"statement-block",
   "question":"Evaluate each statement about RAID levels and indicate whether it is True or False.",
   "statements":["RAID 0 provides fault tolerance by mirroring data across drives.",
                 "RAID 1 requires a minimum of two drives.",
                 "RAID 5 can sustain the simultaneous loss of two member drives without data loss.",
                 "RAID 6 uses double distributed parity and can tolerate two drive failures."],
   "correctAnswers":[False,True,False,True]},
  # 49 D3 [T,T,F,T]
  {"id":"serverplus-49","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about backup and disaster recovery concepts and indicate whether it is True or False.",
   "statements":["RPO defines the maximum acceptable amount of data loss measured in time.",
                 "A hot site keeps full infrastructure online with near real-time data replication.",
                 "A cold site has pre-staged production hardware and current data ready for immediate cutover.",
                 "Periodic restore testing is required to consider a backup strategy reliable."],
   "correctAnswers":[True,True,False,True]},
  # 50 D4 [F,T,T,T]
  {"id":"serverplus-50","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about server troubleshooting and indicate whether it is True or False.",
   "statements":["POST runs after the operating system bootloader has finished loading.",
                 "A degraded RAID array can continue serving data while a replacement drive rebuilds.",
                 "A kernel panic on Linux is functionally analogous to a Windows BSOD.",
                 "Both top and htop display real-time CPU and memory utilization."],
   "correctAnswers":[False,True,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
