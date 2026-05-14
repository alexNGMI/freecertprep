import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 51-90 ────────────────────────────────────────────────────────────
  # 51 D1 ca:0
  {"id":"serverplus-51","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A storage admin is comparing SAS and SATA drives for a database tier. Which characteristic favors SAS over SATA for enterprise workloads?",
   "choices":["Higher IOPS and dual-port connectivity for redundancy","Lower cost per GB","Larger physical capacity per drive","Wider client desktop compatibility"],"correctAnswer":0},
  # 52 D1 ca:1
  {"id":"serverplus-52","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A new database server requires very low storage latency. The admin selects drives that connect directly to the PCIe bus. Which drive interface is being used?",
   "choices":["SATA","NVMe","SAS","SCSI"],"correctAnswer":1},
  # 53 D1 ca:2
  {"id":"serverplus-53","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A server is configured with ECC memory. What is the primary purpose of ECC RAM in a production server?",
   "choices":["Increases raw memory bandwidth versus non-ECC RAM","Reduces memory power consumption","Detects and corrects single-bit memory errors at runtime","Provides additional cache for the CPU"],"correctAnswer":2},
  # 54 D1 ca:3
  {"id":"serverplus-54","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A server must connect to an external SAS storage array. Which expansion card is required?",
   "choices":["GPU","NIC","Sound card","Host Bus Adapter (HBA)"],"correctAnswer":3},
  # 55 D1 ca:0
  {"id":"serverplus-55","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"An admin needs to power-cycle and reconfigure a remote server even when the operating system is unresponsive. Which technology category provides this capability?",
   "choices":["Out-of-band management (IPMI/BMC)","Domain Controller","Remote Desktop","RDP over VPN"],"correctAnswer":0},
  # 56 D1 ca:1
  {"id":"serverplus-56","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center deploys Dell PowerEdge servers. Which proprietary out-of-band management interface ships with these servers?",
   "choices":["HPE iLO","Dell iDRAC","Lenovo XCC","Fujitsu iRMC"],"correctAnswer":1},
  # 57 D1 ca:2
  {"id":"serverplus-57","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center deploys HPE ProLiant servers. Which proprietary out-of-band management interface ships with these servers?",
   "choices":["Dell iDRAC","Lenovo XCC","HPE iLO","Cisco CIMC"],"correctAnswer":2},
  # 58 D1 ca:3
  {"id":"serverplus-58","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A technician installs a 4 TB boot volume on a new server. Which firmware/partitioning combination is required to boot from a volume larger than 2 TB?",
   "choices":["Legacy BIOS with MBR","Legacy BIOS with GPT","UEFI with MBR","UEFI with GPT"],"correctAnswer":3},
  # 59 D1 ca:0
  {"id":"serverplus-59","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A security policy requires that only digitally signed bootloaders and kernels be allowed to execute at boot. Which UEFI feature enforces this?",
   "choices":["Secure Boot","Fast Boot","TPM clearing","CSM (Compatibility Support Module)"],"correctAnswer":0},
  # 60 D2 ca:1
  {"id":"serverplus-60","domain":"Server Administration","type":"single-choice",
   "question":"On a current Red Hat Enterprise Linux server, which init system manages services and dependencies by default?",
   "choices":["upstart","systemd","SysVinit","launchd"],"correctAnswer":1},
  # 61 D2 ca:2
  {"id":"serverplus-61","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs to schedule a recurring backup script to run nightly at 02:00. Which tool/file defines this schedule?",
   "choices":["systemd journal","Task Scheduler","crontab","logrotate.conf"],"correctAnswer":2},
  # 62 D2 ca:3
  {"id":"serverplus-62","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin needs to schedule a script to run at server startup. Which built-in Windows tool is used?",
   "choices":["systemd timers","cron","launchd","Task Scheduler"],"correctAnswer":3},
  # 63 D2 ca:0
  {"id":"serverplus-63","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin wants to list all running processes from PowerShell. Which cmdlet should be used?",
   "choices":["Get-Process","List-Tasks","Show-Processes","Query-PS"],"correctAnswer":0},
  # 64 D2 ca:1
  {"id":"serverplus-64","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs a one-shot snapshot of currently running processes in a terminal. Which command provides this?",
   "choices":["top","ps","htop","lsof"],"correctAnswer":1},
  # 65 D2 ca:2
  {"id":"serverplus-65","domain":"Server Administration","type":"single-choice",
   "question":"On an NTFS share, a user is in two groups: one with Allow Read and one with Deny Read on the same folder. What is the effective permission?",
   "choices":["Allow — Allow always overrides Deny","Depends on the order of ACE evaluation","Deny — an explicit Deny overrides an explicit Allow","Deny is ignored for group-derived permissions"],"correctAnswer":2},
  # 66 D2 ca:3
  {"id":"serverplus-66","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs to grant the owner full access and deny all access to group and others on a file. Which chmod value accomplishes this?",
   "choices":["chmod 644","chmod 755","chmod 770","chmod 700"],"correctAnswer":3},
  # 67 D2 ca:0
  {"id":"serverplus-67","domain":"Server Administration","type":"single-choice",
   "question":"A network admin needs to share files between Windows clients and a Windows file server using the native Microsoft file-sharing protocol. Which protocol is used?",
   "choices":["SMB/CIFS","NFS","FTP","AFP"],"correctAnswer":0},
  # 68 D2 ca:1
  {"id":"serverplus-68","domain":"Server Administration","type":"single-choice",
   "question":"A Linux file server needs to export a directory for mounting by Linux clients using the traditional Unix file-sharing protocol. Which protocol fits?",
   "choices":["SMB","NFS","AFP","WebDAV"],"correctAnswer":1},
  # 69 D2 ca:2
  {"id":"serverplus-69","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin presents shared file resources from multiple servers under a single, unified namespace and replicates content between targets for availability. Which Windows feature provides this?",
   "choices":["Storage Spaces","Failover Clustering","DFS (Distributed File System)","BranchCache"],"correctAnswer":2},
  # 70 D2 ca:3
  {"id":"serverplus-70","domain":"Server Administration","type":"single-choice",
   "question":"A server administrator must keep server clocks accurate to avoid Kerberos failures and log correlation problems. Which protocol synchronizes time across networked systems?",
   "choices":["NNTP","SNMP","PTP only","NTP"],"correctAnswer":3},
  # 71 D2 ca:0
  {"id":"serverplus-71","domain":"Server Administration","type":"single-choice",
   "question":"A DevOps engineer wants a configuration-management tool that does not require an agent on managed Linux hosts and uses SSH to apply playbooks. Which tool fits?",
   "choices":["Ansible","Puppet","Chef","CFEngine"],"correctAnswer":0},
  # 72 D3 ca:1
  {"id":"serverplus-72","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team adopts a recognized, vendor-neutral hardening baseline that includes specific settings for Windows Server and major Linux distributions. Which baseline is most commonly referenced?",
   "choices":["RFC 1918","CIS Benchmarks","ISO 9001","PCI DSS"],"correctAnswer":1},
  # 73 D3 ca:2
  {"id":"serverplus-73","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A web admin enables HTTPS on a public-facing site. Which protocol secures the data in transit between client and server?",
   "choices":["IPSec","SSH","TLS","Kerberos"],"correctAnswer":2},
  # 74 D3 ca:3
  {"id":"serverplus-74","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An admin configures an IPSec VPN that fully encrypts both the original IP header and payload and adds a new outer IP header. Which IPSec mode is being used?",
   "choices":["Transport mode","Authentication-only (AH-only)","No-encapsulation mode","Tunnel mode"],"correctAnswer":3},
  # 75 D3 ca:0
  {"id":"serverplus-75","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"In a PKI deployment, which entity is responsible for issuing and digitally signing the certificates used by servers and users?",
   "choices":["Certificate Authority (CA)","Certificate Revocation Authority","Registration Authority only","Token Service"],"correctAnswer":0},
  # 76 D3 ca:1
  {"id":"serverplus-76","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team needs to ensure that compromised TLS certificates are no longer trusted by clients before their natural expiration. Which mechanisms support certificate revocation?",
   "choices":["DNS TXT records only","CRL and OCSP","TLS session tickets","Group Policy SPN records"],"correctAnswer":1},
  # 77 D3 ca:2
  {"id":"serverplus-77","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A storage admin configures replication so each write is committed on both the primary and remote sites before the client receives an acknowledgment. Which replication type is this?",
   "choices":["Asynchronous","Snapshot-based","Synchronous","Periodic"],"correctAnswer":2},
  # 78 D3 ca:3
  {"id":"serverplus-78","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A pair of database servers is configured to automatically fail one node's services over to the other if the primary becomes unavailable. Which technology pattern is in use?",
   "choices":["Round-robin DNS only","Cold standby","Backup rotation","High-availability (HA) clustering"],"correctAnswer":3},
  # 79 D3 ca:0
  {"id":"serverplus-79","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An organization keeps a fully operational alternate site with continuously synchronized data, ready to take over operations within minutes. Which DR site type is this?",
   "choices":["Hot site","Warm site","Cold site","Bunker site"],"correctAnswer":0},
  # 80 D4 ca:1
  {"id":"serverplus-80","domain":"Troubleshooting","type":"single-choice",
   "question":"A server is performing poorly and the admin observes constant heavy paging activity (high page-file/swap I/O) while CPU is moderate. What is the most likely root cause?",
   "choices":["Failed NIC","Memory pressure — physical RAM is insufficient for workload","Disk firmware issue","DNS misconfiguration"],"correctAnswer":1},
  # 81 D4 ca:2
  {"id":"serverplus-81","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin sees one process consistently pegging a single CPU core at 100% while overall load remains otherwise normal. What is the most likely cause to investigate first?",
   "choices":["Misconfigured DNS resolver","Network duplex mismatch","A runaway or stuck single-threaded process","RAID array rebuild"],"correctAnswer":2},
  # 82 D4 ca:3
  {"id":"serverplus-82","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin runs top and consistently sees very high iowait percentages while CPU user time stays low. Which subsystem is the most likely bottleneck?",
   "choices":["Network stack","CPU pipeline","Kernel scheduler","Storage / disk subsystem"],"correctAnswer":3},
  # 83 D4 ca:0
  {"id":"serverplus-83","domain":"Troubleshooting","type":"single-choice",
   "question":"A server is dropping connections intermittently. Which TWO indicators on the switch port and NIC are most useful to check FIRST?",
   "choices":["Increasing CRC/input error counters on the switch port and NIC","Domain controller replication health","Time-zone configuration mismatches","Group Policy refresh interval"],"correctAnswer":0},
  # 84 D4 ca:1
  {"id":"serverplus-84","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows admin suspects system file corruption causing intermittent crashes. Which built-in command scans and repairs protected system files?",
   "choices":["chkdsk /f","sfc /scannow","DISM /Online /Cleanup-Image /CheckHealth","wevtutil cl System"],"correctAnswer":1},
  # 85 D4 ca:2
  {"id":"serverplus-85","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows server's component store appears corrupted and sfc cannot fully repair it. Which tool can restore the component store from a known-good source?",
   "choices":["chkdsk /r","wmic","DISM /Online /Cleanup-Image /RestoreHealth","robocopy /mir"],"correctAnswer":2},
  # 86 D4 ca:3
  {"id":"serverplus-86","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin starts a service manually and it runs fine, but the service does NOT come up after the next reboot. Which command should be run to fix this?",
   "choices":["systemctl restart","systemctl status","systemctl mask","systemctl enable"],"correctAnswer":3},
  # 87 D4 ca:0
  {"id":"serverplus-87","domain":"Troubleshooting","type":"single-choice",
   "question":"After adding new RAM, a server fails to POST — there is no video output and a single repeating beep code. What is the BEST first action?",
   "choices":["Power off, reseat the new RAM, and verify it is on the QVL for the server","Reinstall the operating system","Replace the CPU","Reflash the BIOS over the network"],"correctAnswer":0},
  # 88 D4 ca:1
  {"id":"serverplus-88","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows admin notices that a critical service is missing entirely from services.msc after a failed update. Which next step is MOST appropriate?",
   "choices":["Reformat the system drive","Restore from a known-good system state or reinstall the affected role/feature","Disable Windows Defender","Disable the firewall"],"correctAnswer":1},
  # 89 D4 ca:2
  {"id":"serverplus-89","domain":"Troubleshooting","type":"single-choice",
   "question":"A new application fails to bind to TCP/8080 with a 'port already in use' error. Which Windows command identifies the PID currently holding port 8080?",
   "choices":["tasklist /svc","route print","netstat -ano | findstr :8080","ipconfig /all"],"correctAnswer":2},
  # 90 D4 ca:3
  {"id":"serverplus-90","domain":"Troubleshooting","type":"single-choice",
   "question":"After updating a network driver, a server loses connectivity. Which Windows Device Manager feature can revert to the previously installed driver?",
   "choices":["Disable device","Update driver","Uninstall device","Roll Back Driver"],"correctAnswer":3},

  # ── MR 91-93 ────────────────────────────────────────────────────────────
  # 91 D1 [0,1]
  {"id":"serverplus-91","domain":"Server Hardware Installation and Management","type":"multiple-response",
   "question":"Which TWO of the following are vendor-specific out-of-band server management interfaces? (Select 2)",
   "choices":["Dell iDRAC","HPE iLO","Windows Task Manager","Linux journalctl"],"correctAnswers":[0,1]},
  # 92 D2 [0,2]
  {"id":"serverplus-92","domain":"Server Administration","type":"multiple-response",
   "question":"Which TWO of the following are configuration-management/automation platforms commonly used to manage server fleets? (Select 2)",
   "choices":["Ansible","systemd","Puppet","DHCP"],"correctAnswers":[0,2]},
  # 93 D4 [1,3]
  {"id":"serverplus-93","domain":"Troubleshooting","type":"multiple-response",
   "question":"A server is suspected to have a failing drive. Which TWO indicators are most strongly associated with imminent drive failure? (Select 2)",
   "choices":["Default gateway change","Increasing SMART reallocated-sector and pending-sector counts","DNS cache entries expiring","Repeated read/write errors logged in the OS event/syslog"],"correctAnswers":[1,3]},

  # ── Matching 94-95 ──────────────────────────────────────────────────────
  # 94 D1 correctMatches:[2,1,0,3]
  {"id":"serverplus-94","domain":"Server Hardware Installation and Management","type":"matching",
   "question":"Match each server out-of-band management interface with its origin.",
   "itemsLeft":["iDRAC","iLO","IPMI","OPMA"],
   "itemsRight":["Industry-neutral baseboard management standard","HPE proprietary out-of-band management","Dell proprietary out-of-band management","Largely deprecated AMD/Intel management spec"],
   "correctMatches":[2,1,0,3]},
  # 95 D3 correctMatches:[3,2,0,1]
  {"id":"serverplus-95","domain":"Security and Disaster Recovery","type":"matching",
   "question":"Match each disaster-recovery site type with its defining characteristic.",
   "itemsLeft":["Hot site","Warm site","Cold site","Mirrored site"],
   "itemsRight":["Empty facility with power and cooling but no staged production equipment","Continuously synchronized duplicate of production","Pre-installed hardware with staged data, requiring final cutover work","Fully operational alternate facility with near real-time data replication"],
   "correctMatches":[3,2,0,1]},

  # ── Ordering 96-97 ──────────────────────────────────────────────────────
  # 96 D2 correctOrder:[2,0,4,1,3]
  {"id":"serverplus-96","domain":"Server Administration","type":"ordering",
   "question":"Arrange the steps for applying a critical security patch to a production server in the correct order.",
   "items":["Test the patch in a staging environment",
            "Apply the patch during the approved maintenance window",
            "Identify and triage the vulnerability the patch addresses",
            "Verify service health and functionality after patching",
            "Create a backup or snapshot prior to applying the patch"],
   "correctOrder":[2,0,4,1,3]},
  # 97 D4 correctOrder:[4,2,0,1,3]
  {"id":"serverplus-97","domain":"Troubleshooting","type":"ordering",
   "question":"A new server fails to complete POST. Arrange the diagnostic steps in the most logical order.",
   "items":["Inspect PSU connections and verify input power",
            "Reseat RAM modules one bank at a time",
            "Listen for and decode POST beep codes",
            "Isolate by removing non-essential expansion cards",
            "Power on the system and observe symptoms"],
   "correctOrder":[4,2,0,1,3]},

  # ── SB 98-100 ────────────────────────────────────────────────────────────
  # 98 D2 [T,F,T,F]
  {"id":"serverplus-98","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about server administration tooling and indicate whether it is True or False.",
   "statements":["systemd is the default init and service manager on modern major Linux distributions.",
                 "cron jobs are defined using a JSON configuration file in /etc/cron.json.",
                 "PowerShell cmdlets follow a Verb-Noun naming convention (e.g., Get-Process).",
                 "On NTFS, an explicit Allow always overrides an explicit Deny on the same object."],
   "correctAnswers":[True,False,True,False]},
  # 99 D3 [F,T,T,T]
  {"id":"serverplus-99","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about PKI and security operations and indicate whether it is True or False.",
   "statements":["A self-signed TLS certificate is automatically trusted by every major web browser.",
                 "A certificate authority can revoke a certificate via a CRL or OCSP responder.",
                 "TLS protects data in transit between a client and a server.",
                 "A SIEM platform aggregates and correlates security-relevant logs from many sources."],
   "correctAnswers":[False,True,True,True]},
  # 100 D4 [T,F,T,T]
  {"id":"serverplus-100","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about Windows and Linux troubleshooting tools and indicate whether it is True or False.",
   "statements":["sfc /scannow scans and repairs Windows protected system file integrity.",
                 "chkdsk is the standard tool for repairing Linux ext4 file systems.",
                 "DISM /Online /Cleanup-Image /RestoreHealth can repair the Windows component store from a known-good source.",
                 "systemctl enable configures a Linux service to start automatically at boot."],
   "correctAnswers":[True,False,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
