import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 101-140 ───────────────────────────────────────────────────────────
  # 101 D1 ca:0
  {"id":"serverplus-101","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center is being redesigned for efficient cooling. Servers are arranged so that intake fans face one corridor and exhaust fans face the opposite corridor. What is this layout called?",
   "choices":["Hot aisle / cold aisle containment","Random orientation","Edge-to-core orientation","Single-aisle layout"],"correctAnswer":0},
  # 102 D1 ca:1
  {"id":"serverplus-102","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A facility engineer wants per-outlet power usage data plus the ability to remotely cycle individual outlets. Which PDU type provides this?",
   "choices":["Basic PDU","Switched (intelligent) PDU","Inline strip","Static transfer switch"],"correctAnswer":1},
  # 103 D1 ca:2
  {"id":"serverplus-103","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A research team's new server is configured with multiple high-end GPUs. What is the typical purpose of GPUs in a server deployment?",
   "choices":["Replace ECC memory","Provide hardware RAID parity","Accelerate parallel workloads such as machine learning and HPC","Convert SAS signals to SATA"],"correctAnswer":2},
  # 104 D1 ca:3
  {"id":"serverplus-104","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"BitLocker is enabled on a server's system volume and is configured to seal the encryption key to the system's measured boot state. Which hardware component stores and protects this key?",
   "choices":["BMC chip","RAID controller cache","DIMM register","TPM (Trusted Platform Module)"],"correctAnswer":3},
  # 105 D1 ca:0
  {"id":"serverplus-105","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A storage admin is comparing two SSD models for a transactional database workload. Which metric is the BEST primary indicator of how well a drive will handle many small random reads and writes?",
   "choices":["IOPS","Sequential throughput (MB/s)","Rotational speed (RPM)","MTBF in hours"],"correctAnswer":0},
  # 106 D1 ca:1
  {"id":"serverplus-106","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A backup-target volume is evaluated for large sequential writes from nightly full backups. Which drive metric is most relevant for this workload?",
   "choices":["Random IOPS","Sequential throughput in MB/s","ECC bit-flip count","Cache hit ratio"],"correctAnswer":1},
  # 107 D1 ca:2
  {"id":"serverplus-107","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A network engineer needs a small form-factor transceiver to provide a 10 Gbps short-range fiber link between top-of-rack switches. Which transceiver fits this requirement?",
   "choices":["SFP","QSFP+","SFP+ (e.g., 10GBASE-SR)","XFP only"],"correctAnswer":2},
  # 108 D1 ca:3
  {"id":"serverplus-108","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"An engineer needs to provision 100 Gbps inter-switch links inside a modern data center. Which transceiver form factor is most commonly used?",
   "choices":["SFP","XFP","SFP+","QSFP28"],"correctAnswer":3},
  # 109 D1 ca:0
  {"id":"serverplus-109","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"Many new server NICs ship with 25 Gbps ports instead of 10 Gbps. Which statement best explains why 25 GbE has become a common server-side standard?",
   "choices":["25 GbE reuses the same physical lane technology as 100 GbE, making it cost-effective per Gbps","25 GbE replaces Ethernet entirely with InfiniBand framing","25 GbE always requires single-mode fiber to function","25 GbE is incompatible with QSFP-based 100 GbE switches"],"correctAnswer":0},
  # 110 D2 ca:1
  {"id":"serverplus-110","domain":"Server Administration","type":"single-choice",
   "question":"A sysadmin needs to install a new package on a Red Hat Enterprise Linux 9 server. Which package manager command is most appropriate?",
   "choices":["apt install","dnf install","zypper install","pacman -S"],"correctAnswer":1},
  # 111 D2 ca:2
  {"id":"serverplus-111","domain":"Server Administration","type":"single-choice",
   "question":"A sysadmin needs to install a new package on an Ubuntu Server LTS host. Which package manager command is most appropriate?",
   "choices":["dnf install","zypper install","apt install","yum install"],"correctAnswer":2},
  # 112 D2 ca:3
  {"id":"serverplus-112","domain":"Server Administration","type":"single-choice",
   "question":"A sysadmin needs to install a new package on an openSUSE Leap server. Which package manager is native to that distribution?",
   "choices":["apt","dnf","emerge","zypper"],"correctAnswer":3},
  # 113 D2 ca:0
  {"id":"serverplus-113","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin needs to host a public-facing web application using a native Microsoft web server. Which server role should be installed?",
   "choices":["IIS (Internet Information Services)","Apache HTTP Server","Nginx Plus","HAProxy"],"correctAnswer":0},
  # 114 D2 ca:1
  {"id":"serverplus-114","domain":"Server Administration","type":"single-choice",
   "question":"A team wants to deploy a widely used open-source web server on Linux for a traditional LAMP application stack. Which software fits this description?",
   "choices":["IIS","Apache HTTP Server","Tomcat","JBoss"],"correctAnswer":1},
  # 115 D2 ca:2
  {"id":"serverplus-115","domain":"Server Administration","type":"single-choice",
   "question":"A web team needs a high-performance HTTP server that is also frequently deployed as a reverse proxy and TLS terminator in front of application backends. Which software is most commonly chosen for this role?",
   "choices":["IIS","Apache Tomcat","Nginx","sendmail"],"correctAnswer":2},
  # 116 D2 ca:3
  {"id":"serverplus-116","domain":"Server Administration","type":"single-choice",
   "question":"A development team wants an open-source, fully relational SQL database server with strong support for advanced data types and JSON. Which database engine fits?",
   "choices":["Redis","Microsoft Access","MongoDB","PostgreSQL"],"correctAnswer":3},
  # 117 D2 ca:0
  {"id":"serverplus-117","domain":"Server Administration","type":"single-choice",
   "question":"A small e-commerce site uses the traditional LAMP stack on Linux. Which database engine is the 'M' in LAMP typically referring to?",
   "choices":["MySQL (or its MariaDB fork)","Microsoft SQL Server","MongoDB","DB2"],"correctAnswer":0},
  # 118 D2 ca:1
  {"id":"serverplus-118","domain":"Server Administration","type":"single-choice",
   "question":"An organization standardizes its Windows-native relational database tier on a Microsoft product that integrates tightly with Active Directory and SSMS. Which database is this?",
   "choices":["PostgreSQL","Microsoft SQL Server","Oracle DB","SQLite"],"correctAnswer":1},
  # 119 D2 ca:2
  {"id":"serverplus-119","domain":"Server Administration","type":"single-choice",
   "question":"A network admin wants a network printer to always receive the same IP address from DHCP without configuring a static address on the device. Which DHCP feature accomplishes this?",
   "choices":["Address pool exclusion","Class options","DHCP reservation (by MAC)","Lease renewal threshold"],"correctAnswer":2},
  # 120 D2 ca:3
  {"id":"serverplus-120","domain":"Server Administration","type":"single-choice",
   "question":"A DHCP server is configured to lease addresses in the range 10.10.10.50–10.10.10.200 with a 24-hour lease. What does this configuration represent?",
   "choices":["A DHCP relay","A DHCP reservation","A DHCP exclusion","A DHCP scope"],"correctAnswer":3},
  # 121 D2 ca:0
  {"id":"serverplus-121","domain":"Server Administration","type":"single-choice",
   "question":"An Active Directory admin wants to delegate management of a subset of users to a help desk team and apply distinct Group Policies to that subset. Which AD object should be used?",
   "choices":["Organizational Unit (OU)","Security Group","Domain Trust","Site"],"correctAnswer":0},
  # 122 D2 ca:1
  {"id":"serverplus-122","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin wants to enforce password policy and desktop lockout settings across all domain-joined Windows clients. Which tool applies these settings centrally?",
   "choices":["Registry Editor on each client","Group Policy (GPO)","Local Security Policy on each client","Windows Defender Firewall"],"correctAnswer":1},
  # 123 D3 ca:2
  {"id":"serverplus-123","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security framework that verifies who a user is, controls what they can do, and records what they did is referred to as which model?",
   "choices":["CIA triad","PKI","AAA (Authentication, Authorization, Accounting)","SSO"],"correctAnswer":2},
  # 124 D3 ca:3
  {"id":"serverplus-124","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An organization requires that private keys for high-value certificates never leave dedicated, tamper-resistant hardware. Which device meets this requirement?",
   "choices":["TPM in the laptop","Smart card reader","USB security key","HSM (Hardware Security Module)"],"correctAnswer":3},
  # 125 D3 ca:0
  {"id":"serverplus-125","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security policy disables password-based SSH on all Linux production servers in favor of public-key authentication. Why is this generally considered more secure?",
   "choices":["Private keys are not transmitted to the server and resist brute-force more effectively than passwords","Public keys cannot be copied between systems","SSH always uses TLS 1.3 when key authentication is enabled","Password hashes are never stored when keys are used"],"correctAnswer":0},
  # 126 D3 ca:1
  {"id":"serverplus-126","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A Windows admin wants per-file or per-folder encryption tied to the user's account on an NTFS volume, without encrypting the whole disk. Which feature is most appropriate?",
   "choices":["BitLocker","EFS (Encrypting File System)","LUKS","NTFS compression"],"correctAnswer":1},
  # 127 D3 ca:2
  {"id":"serverplus-127","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team wants to detect malicious activity AND automatically drop offending traffic inline. Which technology actively blocks attacks rather than only alerting on them?",
   "choices":["IDS","Honeypot","IPS","SIEM"],"correctAnswer":2},
  # 128 D3 ca:3
  {"id":"serverplus-128","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A compliance team needs to prevent employees from emailing or uploading sensitive customer records to unauthorized destinations. Which security technology category best fits?",
   "choices":["NAC","SIEM","HIDS","DLP (Data Loss Prevention)"],"correctAnswer":3},
  # 129 D3 ca:0
  {"id":"serverplus-129","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A backup strategy stores three copies of important data on two different media types, with at least one copy off-site. Which best practice is this?",
   "choices":["3-2-1 backup rule","RAID 6 rule","High-availability triangle","GFS rotation"],"correctAnswer":0},
  # 130 D3 ca:1
  {"id":"serverplus-130","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A backup admin maintains daily, weekly, and monthly retention tiers, where daily backups age into weekly and weekly into monthly. Which rotation scheme is this?",
   "choices":["Tower of Hanoi","Grandfather-Father-Son (GFS)","First-In-First-Out","Round-Robin"],"correctAnswer":1},
  # 131 D4 ca:2
  {"id":"serverplus-131","domain":"Troubleshooting","type":"single-choice",
   "question":"A storage admin enables jumbo frames on a SAN network. Which MTU value is most commonly associated with jumbo frames?",
   "choices":["1500 bytes","1518 bytes","Approximately 9000 bytes","65535 bytes"],"correctAnswer":2},
  # 132 D4 ca:3
  {"id":"serverplus-132","domain":"Troubleshooting","type":"single-choice",
   "question":"A server is configured for NIC teaming using LACP. Which switch-side requirement MUST be met for this teaming mode to negotiate correctly?",
   "choices":["The switch ports must be in different VLANs","The switch must disable spanning tree on those ports","The switch ports must be access ports only","The partner switch ports must be configured for an LACP (802.3ad) port channel"],"correctAnswer":3},
  # 133 D4 ca:0
  {"id":"serverplus-133","domain":"Troubleshooting","type":"single-choice",
   "question":"Users report that they can reach internal resources by IP but not by hostname. Which subsystem should be investigated FIRST?",
   "choices":["DNS resolution","NTP synchronization","Drive SMART status","RAID controller health"],"correctAnswer":0},
  # 134 D4 ca:1
  {"id":"serverplus-134","domain":"Troubleshooting","type":"single-choice",
   "question":"A technician suspects a stale ARP entry is causing intermittent connectivity to a server that recently had its NIC replaced. Which command displays and can clear the local ARP cache on Windows?",
   "choices":["netstat -an","arp -a / arp -d","route print","tracert"],"correctAnswer":1},
  # 135 D4 ca:2
  {"id":"serverplus-135","domain":"Troubleshooting","type":"single-choice",
   "question":"A switch shows CPU utilization spiking to 100% and ALL ports on a VLAN lose connectivity simultaneously, with port utilization saturated with broadcast frames. What is the most likely cause?",
   "choices":["DNS poisoning attack","Failed PSU","Layer 2 broadcast storm caused by a loop","Memory leak in the OS"],"correctAnswer":2},
  # 136 D4 ca:3
  {"id":"serverplus-136","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows server is taking far longer than normal to boot. Which built-in tool helps identify and disable services or startup tasks contributing to the delay?",
   "choices":["Task Manager only","Disk Cleanup","Performance Monitor","msconfig / Task Manager Startup tab / services.msc"],"correctAnswer":3},
  # 137 D4 ca:0
  {"id":"serverplus-137","domain":"Troubleshooting","type":"single-choice",
   "question":"A service is confirmed to be running and listening on the expected port locally, but remote clients cannot connect. Which configuration should be checked FIRST?",
   "choices":["Host- and network-firewall rules for that port","Disk SMART status","RAID controller battery","NTP stratum"],"correctAnswer":0},
  # 138 D4 ca:1
  {"id":"serverplus-138","domain":"Troubleshooting","type":"single-choice",
   "question":"An admin sees TLS handshake failures on a web service after a certificate's expiration date passed. What is the correct corrective action?",
   "choices":["Disable TLS entirely","Renew or reissue and install a valid certificate, then restart the service","Switch the service to plaintext HTTP","Add the expired certificate to the local trust store"],"correctAnswer":1},
  # 139 D4 ca:2
  {"id":"serverplus-139","domain":"Troubleshooting","type":"single-choice",
   "question":"A monitoring tool flags time drift on a server's clock, causing Kerberos failures. Which configuration should be verified FIRST?",
   "choices":["NIC duplex","BIOS RTC battery only","NTP configuration and the reachability of configured time sources","DNS suffix order"],"correctAnswer":2},
  # 140 D4 ca:3
  {"id":"serverplus-140","domain":"Troubleshooting","type":"single-choice",
   "question":"A team is asked to determine whether a server's response times have degraded over the past week. Which troubleshooting practice provides the reference data needed to answer this?",
   "choices":["Snapshot-based recovery","Hardening","Patch management","Maintaining a documented performance baseline"],"correctAnswer":3},

  # ── MR 141-143 ───────────────────────────────────────────────────────────
  # 141 D1 [0,2]
  {"id":"serverplus-141","domain":"Server Hardware Installation and Management","type":"multiple-response",
   "question":"A data-center designer is selecting server-side Ethernet speeds for a refresh project. Which TWO speeds are most commonly used on modern server NICs and switch fabrics? (Select 2)",
   "choices":["25 GbE","100 Mbps","100 GbE","10 Mbps"],"correctAnswers":[0,2]},
  # 142 D3 [0,2]
  {"id":"serverplus-142","domain":"Security and Disaster Recovery","type":"multiple-response",
   "question":"Which TWO of the following are core characteristics of a strong password policy? (Select 2)",
   "choices":["Adequate minimum length","Allowing reuse of the last password","Complexity that prohibits common dictionary words","Storing passwords in plaintext for recovery"],"correctAnswers":[0,2]},
  # 143 D4 [1,3]
  {"id":"serverplus-143","domain":"Troubleshooting","type":"multiple-response",
   "question":"Users on one floor cannot resolve internal hostnames, while other floors are unaffected. Which TWO actions are most appropriate next steps for a technician on the affected floor? (Select 2)",
   "choices":["Replace the user's monitor","Verify the affected clients' configured DNS servers via ipconfig /all or systemd-resolve","Reformat the affected workstations","Test resolution with nslookup/dig against the configured resolver and a known-good resolver"],"correctAnswers":[1,3]},

  # ── Matching 144-145 ─────────────────────────────────────────────────────
  # 144 D2 correctMatches:[1,2,0,3]
  {"id":"serverplus-144","domain":"Server Administration","type":"matching",
   "question":"Match each Linux distribution family with its native package manager.",
   "itemsLeft":["Ubuntu","RHEL","openSUSE","Alpine"],
   "itemsRight":["zypper","apt","dnf","apk"],
   "correctMatches":[1,2,0,3]},
  # 145 D3 correctMatches:[2,0,1,3]
  {"id":"serverplus-145","domain":"Security and Disaster Recovery","type":"matching",
   "question":"Match each security control category with a representative example.",
   "itemsLeft":["Preventive","Detective","Corrective","Compensating"],
   "itemsRight":["SIEM alert when a failed-login threshold is exceeded","Restoring data from backup after a ransomware event","Encryption of sensitive data at rest","Heightened logging and review when a primary control cannot be fully implemented"],
   "correctMatches":[2,0,1,3]},

  # ── Ordering 146-147 ─────────────────────────────────────────────────────
  # 146 D2 correctOrder:[1,0,3,2,4]
  {"id":"serverplus-146","domain":"Server Administration","type":"ordering",
   "question":"Arrange the steps for deploying a new public-facing Linux web server in the correct order.",
   "items":["Apply OS patches and update package repositories",
            "Install the Linux operating system from official media",
            "Open required firewall ports and harden exposed services",
            "Install the web server software and configure the site",
            "Test the site, then place it into production rotation"],
   "correctOrder":[1,0,3,2,4]},
  # 147 D4 correctOrder:[1,2,0,4,3]
  {"id":"serverplus-147","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the troubleshooting steps for a client that cannot resolve DNS in the most logical order.",
   "items":["Test against a different known-good resolver to isolate the problem",
            "Verify the client's IP, mask, gateway, and DNS server settings",
            "Test resolution with nslookup or dig against the configured resolver",
            "Escalate to the DNS team if root cause cannot be identified",
            "If failure is consistent across resolvers, query an authoritative server directly"],
   "correctOrder":[1,2,0,4,3]},

  # ── SB 148-150 ────────────────────────────────────────────────────────────
  # 148 D1 [T,F,T,T]
  {"id":"serverplus-148","domain":"Server Hardware Installation and Management","type":"statement-block",
   "question":"Evaluate each statement about server hardware and indicate whether it is True or False.",
   "statements":["A 1U rack server is denser per rack unit than a 4U server.",
                 "A hot aisle / cold aisle layout intentionally routes server exhaust air back into the server intakes.",
                 "ECC memory can detect and correct single-bit memory errors at runtime.",
                 "SAS supports dual-port connectivity for redundant data paths between host and drive."],
   "correctAnswers":[True,False,True,True]},
  # 149 D3 [F,T,T,F]
  {"id":"serverplus-149","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about backup strategy and indicate whether it is True or False.",
   "statements":["The 3-2-1 backup rule requires that all copies be kept on a single storage tier.",
                 "An air-gapped or immutable backup helps protect against ransomware encrypting backup data.",
                 "Grandfather-Father-Son (GFS) rotation uses daily, weekly, and monthly retention tiers.",
                 "LTO tape is generally unsuitable for long-term archival and offline retention."],
   "correctAnswers":[False,True,True,False]},
  # 150 D4 [T,T,F,T]
  {"id":"serverplus-150","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about network-related server troubleshooting and indicate whether it is True or False.",
   "statements":["Jumbo frames typically use an MTU of around 9000 bytes.",
                 "NIC teaming using LACP requires the partner switch ports to be configured for an LACP (802.3ad) port channel.",
                 "Layer 2 broadcast storms primarily affect routed (Layer 3) traffic and have no effect on switched traffic.",
                 "Establishing a documented performance baseline makes future deviations easier to identify and quantify."],
   "correctAnswers":[True,True,False,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
