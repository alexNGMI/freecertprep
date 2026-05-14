import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 201-240 ───────────────────────────────────────────────────────────
  # 201 D1 ca:0
  {"id":"serverplus-201","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A monitoring system alerts that a server's chassis cooling has degraded. Which indicator is MOST commonly used by servers to signal a failed fan?",
   "choices":["A front-panel amber/red status LED and a BMC alert","A red Active Directory replication icon","A flashing keyboard CapsLock LED","A SMART error on the boot SSD"],"correctAnswer":0},
  # 202 D1 ca:1
  {"id":"serverplus-202","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"An admin needs to attach a virtual keyboard, video, and mouse session to a server in a remote data center, even before the OS has booted. Which technology provides this?",
   "choices":["RDP","KVM-over-IP through the BMC","SSH","VNC over the internet"],"correctAnswer":1},
  # 203 D1 ca:2
  {"id":"serverplus-203","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A RAID 5 array is configured with a dedicated standby drive that automatically replaces a failed array member without administrator intervention. What is this standby drive called?",
   "choices":["Cold spare","Warm spare","Hot spare","Mirror copy"],"correctAnswer":2},
  # 204 D1 ca:3
  {"id":"serverplus-204","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A storage array advertises NVRAM-backed write cache. What does NVRAM provide in this design?",
   "choices":["Volatile cache that empties on power loss","Read-only firmware storage","Battery-charging capability for the BBU","Non-volatile memory that retains cached writes across power events"],"correctAnswer":3},
  # 205 D1 ca:0
  {"id":"serverplus-205","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A vendor offers a dual-SD-card or M.2 boot module specifically to host the hypervisor on small boot media separate from data drives. What is the primary motivation for this design?",
   "choices":["Separates the small hypervisor install from production data disks and provides redundancy for the boot device","Allows the hypervisor to run from RAM only","Eliminates the need for power supply redundancy","Provides storage for VM virtual disks"],"correctAnswer":0},
  # 206 D1 ca:1
  {"id":"serverplus-206","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A 2U server is sold with six chassis fans and is rated for N+1 fan redundancy. What does N+1 fan redundancy mean for this design?",
   "choices":["All six fans must be functional or the server shuts down","One fan can fail and the server continues to operate within thermal limits","The chassis can run with only one fan installed","Fans are not required when the data center is cold-aisle cooled"],"correctAnswer":1},
  # 207 D1 ca:2
  {"id":"serverplus-207","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A server has two redundant power supplies. What is the most appropriate way to wire them for maximum availability?",
   "choices":["Both PSUs to the same outlet on the same PDU","Both PSUs to a single UPS","Each PSU to a separate PDU served by an independent circuit","Both PSUs through a single power strip"],"correctAnswer":2},
  # 208 D2 ca:3
  {"id":"serverplus-208","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin wants to approve and stage Microsoft updates internally before distributing them to client servers. Which on-prem service provides this?",
   "choices":["Group Policy","SCCM (now MEM)","Windows Defender","WSUS (Windows Server Update Services)"],"correctAnswer":3},
  # 209 D2 ca:0
  {"id":"serverplus-209","domain":"Server Administration","type":"single-choice",
   "question":"An enterprise needs a single platform to inventory, deploy software, push OS images, and patch a large fleet of Windows endpoints. Which Microsoft product is most commonly used for this?",
   "choices":["Microsoft Configuration Manager (MEM / SCCM)","Notepad","Windows Sandbox","Windows Defender Firewall"],"correctAnswer":0},
  # 210 D2 ca:1
  {"id":"serverplus-210","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin needs to run PowerShell commands remotely against many Windows Servers using the WS-Management protocol. Which Windows feature provides this?",
   "choices":["Telnet client","PowerShell Remoting (WinRM)","SMB shares","Remote Desktop"],"correctAnswer":1},
  # 211 D2 ca:2
  {"id":"serverplus-211","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs to grant a developer the ability to run a specific privileged command without giving full root access. Which mechanism should be used?",
   "choices":["chmod 4777 the binary","Add the user to the wheel group with full root","Configure a precise rule in /etc/sudoers (or a sudoers.d drop-in)","Hand out the root password"],"correctAnswer":2},
  # 212 D2 ca:3
  {"id":"serverplus-212","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin troubleshoots a service blocked by SELinux. Which command shows whether SELinux is currently enforcing, permissive, or disabled?",
   "choices":["uname -r","cat /etc/passwd","systemctl status sshd","getenforce / sestatus"],"correctAnswer":3},
  # 213 D2 ca:0
  {"id":"serverplus-213","domain":"Server Administration","type":"single-choice",
   "question":"An Ubuntu admin needs a kernel-level mandatory-access-control framework that is profile-based and ships enabled by default on Ubuntu. Which framework is this?",
   "choices":["AppArmor","SELinux","TOMOYO","Smack only"],"correctAnswer":0},
  # 214 D2 ca:1
  {"id":"serverplus-214","domain":"Server Administration","type":"single-choice",
   "question":"On a freshly installed Linux server with no GUI, an admin must edit a configuration file. Which editor is available on virtually every standard Linux installation?",
   "choices":["Notepad++","vi / vim","TextMate","BBEdit"],"correctAnswer":1},
  # 215 D2 ca:2
  {"id":"serverplus-215","domain":"Server Administration","type":"single-choice",
   "question":"A shell script must declare which interpreter to use on its first line. Which line is the correct shebang for a Bash script?",
   "choices":["// !/bin/bash","; !/bin/bash","#!/bin/bash","REM !/bin/bash"],"correctAnswer":2},
  # 216 D2 ca:3
  {"id":"serverplus-216","domain":"Server Administration","type":"single-choice",
   "question":"An automation engineer is writing an Ansible playbook. Which file format does an Ansible playbook use?",
   "choices":["JSON","INI","XML","YAML"],"correctAnswer":3},
  # 217 D2 ca:0
  {"id":"serverplus-217","domain":"Server Administration","type":"single-choice",
   "question":"A team places an HAProxy server in front of multiple application backends to spread requests and terminate TLS. Which role is HAProxy filling?",
   "choices":["Reverse-proxy load balancer","Authoritative DNS server","Time server","Database server"],"correctAnswer":0},
  # 218 D2 ca:1
  {"id":"serverplus-218","domain":"Server Administration","type":"single-choice",
   "question":"A load balancer is configured with a health check that pulls /health every 5 seconds. What does this health check primarily accomplish?",
   "choices":["Encrypts traffic between the LB and the backend","Removes unhealthy backends from rotation automatically","Replaces the need for backend logs","Provides centralized AAA"],"correctAnswer":1},
  # 219 D2 ca:2
  {"id":"serverplus-219","domain":"Server Administration","type":"single-choice",
   "question":"An application stores user sessions in local memory rather than a shared cache. The load balancer must keep a given client connected to the same backend. Which feature provides this?",
   "choices":["Round-robin DNS","Weighted random","Session affinity (sticky sessions)","TLS passthrough"],"correctAnswer":2},
  # 220 D2 ca:3
  {"id":"serverplus-220","domain":"Server Administration","type":"single-choice",
   "question":"A load balancer is configured to send new requests to the backend with the fewest active sessions. Which load-balancing algorithm is this?",
   "choices":["Round-robin","Weighted round-robin","Source IP hash","Least connections"],"correctAnswer":3},
  # 221 D3 ca:0
  {"id":"serverplus-221","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security architect deploys host firewalls, network ACLs, IDS, EDR, and least-privilege ACLs across every server. Which security principle is being applied?",
   "choices":["Defense in depth","Implicit allow","Security through obscurity","Single point of trust"],"correctAnswer":0},
  # 222 D3 ca:1
  {"id":"serverplus-222","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A finance system requires that the person who initiates a payment cannot also approve it. Which administrative control is being enforced?",
   "choices":["Least privilege","Separation of duties","Mandatory vacation","Job rotation"],"correctAnswer":1},
  # 223 D3 ca:2
  {"id":"serverplus-223","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An employee receives an email that appears to be from the company CFO requesting an urgent wire transfer to a new vendor. The reply address subtly differs from the real one. Which attack is this?",
   "choices":["Vishing","Smishing","Phishing (and possibly BEC/whaling)","Tailgating"],"correctAnswer":2},
  # 224 D3 ca:3
  {"id":"serverplus-224","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"Several user workstations begin encrypting files and displaying ransom notes. What should be the FIRST containment action by the response team?",
   "choices":["Pay the ransom immediately","Reformat the affected drives","Email all users a status update","Isolate the affected systems from the network to stop lateral spread"],"correctAnswer":3},
  # 225 D3 ca:0
  {"id":"serverplus-225","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security awareness program encourages employees to use a vetted password manager. Which is the strongest justification for this practice?",
   "choices":["Enables unique, high-complexity passwords per site without users having to memorize them","Removes the need for multi-factor authentication","Eliminates the need to ever change passwords","Makes passwords visible in plaintext on every workstation"],"correctAnswer":0},
  # 226 D3 ca:1
  {"id":"serverplus-226","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A regulated industry requires controls over the storage and transmission of patient health information. Which regulation primarily governs this?",
   "choices":["PCI DSS","HIPAA","SOX","GDPR only"],"correctAnswer":1},
  # 227 D3 ca:2
  {"id":"serverplus-227","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A merchant that stores, processes, or transmits cardholder data must comply with which standard?",
   "choices":["HIPAA","SOX","PCI DSS","FERPA"],"correctAnswer":2},
  # 228 D3 ca:3
  {"id":"serverplus-228","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security engineer evaluates AES for encrypting data at rest. Which classification correctly describes AES?",
   "choices":["Asymmetric key-exchange algorithm","Hash function","Stream cipher only","Symmetric block cipher"],"correctAnswer":3},
  # 229 D3 ca:0
  {"id":"serverplus-229","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A storage admin needs to verify that a downloaded firmware image has not been altered in transit. Which cryptographic primitive is best suited for this verification?",
   "choices":["SHA-256 cryptographic hash compared to the vendor-published value","DES with a shared key","Plain CRC32","Base64 encoding"],"correctAnswer":0},
  # 230 D3 ca:1
  {"id":"serverplus-230","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A remote employee accesses internal corporate servers over an encrypted IPSec tunnel from a hotel network. Which technology category is this?",
   "choices":["RADIUS","VPN (remote-access)","SIEM","DLP only"],"correctAnswer":1},
  # 231 D4 ca:2
  {"id":"serverplus-231","domain":"Troubleshooting","type":"single-choice",
   "question":"A storage admin needs to apply a critical RAID controller firmware update on a production server. What is the BEST practice for performing this update?",
   "choices":["Apply during peak business hours to validate against live load","Skip the firmware update if the array is healthy","Schedule and apply during an approved maintenance window with current backups","Hot-swap each drive to force a rolling firmware update"],"correctAnswer":2},
  # 232 D4 ca:3
  {"id":"serverplus-232","domain":"Troubleshooting","type":"single-choice",
   "question":"A database server's queries have grown progressively slower. Performance counters show high disk queue depth and high latency on the data volume. Which subsystem is the most likely bottleneck?",
   "choices":["DNS","Time synchronization","Domain controllers","Storage I/O — the data volume cannot service the workload's IOPS"],"correctAnswer":3},
  # 233 D4 ca:0
  {"id":"serverplus-233","domain":"Troubleshooting","type":"single-choice",
   "question":"A virtualization admin observes a VM exhibiting high 'CPU ready' time and very slow response despite light internal CPU usage. What is the most likely root cause?",
   "choices":["vCPU oversubscription on the host is starving the VM of scheduler time","The guest OS has too much RAM allocated","The VM has too few NICs","The VM's snapshot file is missing"],"correctAnswer":0},
  # 234 D4 ca:1
  {"id":"serverplus-234","domain":"Troubleshooting","type":"single-choice",
   "question":"A VMware admin sees the host actively reclaiming memory from a guest VM via the balloon driver. What does heavy memory ballooning typically indicate about the host?",
   "choices":["The host has abundant free RAM","The host is under memory pressure and trying to reclaim from VMs","The host is over-provisioned with storage","The guest OS has no swap configured"],"correctAnswer":1},
  # 235 D4 ca:2
  {"id":"serverplus-235","domain":"Troubleshooting","type":"single-choice",
   "question":"A server NIC shows increasing 'rx_dropped' or input drops in its counters while the link is otherwise up. Which condition is a common cause?",
   "choices":["BIOS battery failure","NTP drift","The host cannot process received frames fast enough (ring buffer or interrupt limits)","Network cable being too short"],"correctAnswer":2},
  # 236 D4 ca:3
  {"id":"serverplus-236","domain":"Troubleshooting","type":"single-choice",
   "question":"Application response times to a cloud-hosted database have suddenly spiked. Round-trip pings show high, variable latency to the cloud region. Which next step is MOST appropriate?",
   "choices":["Reformat the application server","Disable Windows Update on the application server","Switch the database to read-only mode permanently","Investigate the network path (ISP/route, MPLS/SD-WAN, cloud transit) for congestion or routing changes"],"correctAnswer":3},
  # 237 D4 ca:0
  {"id":"serverplus-237","domain":"Troubleshooting","type":"single-choice",
   "question":"A web application's Time-To-First-Byte (TTFB) is consistently high while static asset times are fine. Which layer is the most likely bottleneck?",
   "choices":["Server-side processing — application or database response","Local browser cache","Client-side JavaScript bundling","Image compression on the CDN"],"correctAnswer":0},
  # 238 D4 ca:1
  {"id":"serverplus-238","domain":"Troubleshooting","type":"single-choice",
   "question":"A VMware VM boots noticeably more slowly than peers on the same host. Which configuration item is a common contributor?",
   "choices":["The VM is running an unsupported keyboard layout","Missing or outdated VMware Tools / paravirt drivers in the guest","Excessive number of NICs","Use of UEFI firmware instead of BIOS"],"correctAnswer":1},
  # 239 D4 ca:2
  {"id":"serverplus-239","domain":"Troubleshooting","type":"single-choice",
   "question":"A datastore is filling up unexpectedly. The admin discovers a critical VM has 12 stacked snapshots from the past month. What is the MOST appropriate action?",
   "choices":["Power off the VM permanently","Reformat the datastore","Consolidate or remove the snapshots after a verified backup, and tune snapshot retention","Disable the VM's NICs"],"correctAnswer":2},
  # 240 D4 ca:3
  {"id":"serverplus-240","domain":"Troubleshooting","type":"single-choice",
   "question":"A server with two FC HBAs loses connectivity to its SAN LUN entirely. The OS reports no usable paths. Which subsystem is the most direct candidate for investigation?",
   "choices":["NTP drift","Domain trust state","BIOS battery","SAN fabric / zoning / both HBA ports' link state"],"correctAnswer":3},

  # ── MR 241-243 ───────────────────────────────────────────────────────────
  # 241 D3 [0,2]
  {"id":"serverplus-241","domain":"Security and Disaster Recovery","type":"multiple-response",
   "question":"Which TWO of the following are common social-engineering techniques? (Select 2)",
   "choices":["Phishing email impersonating a trusted brand","SQL injection against a public web form","Pretexting — fabricating a scenario to extract information","Cross-site scripting through a malicious URL"],"correctAnswers":[0,2]},
  # 242 D2 [1,2]
  {"id":"serverplus-242","domain":"Server Administration","type":"multiple-response",
   "question":"Which TWO of the following are Linux mandatory access control (MAC) frameworks? (Select 2)",
   "choices":["iptables","SELinux","AppArmor","systemd"],"correctAnswers":[1,2]},
  # 243 D4 [0,3]
  {"id":"serverplus-243","domain":"Troubleshooting","type":"multiple-response",
   "question":"A Linux server is sluggish and unresponsive during nightly batch jobs. Which TWO observations most directly point to a storage I/O bottleneck? (Select 2)",
   "choices":["Sustained high iowait reported by top","Frequent kernel module loads logged via dmesg","CPU user time near 0% during the slowdown","Sustained high average disk queue length and high await values reported by iostat"],"correctAnswers":[0,3]},

  # ── Matching 244-245 ─────────────────────────────────────────────────────
  # 244 D3 correctMatches:[1,2,3,0]
  {"id":"serverplus-244","domain":"Security and Disaster Recovery","type":"matching",
   "question":"Match each cryptographic primitive with its correct classification.",
   "itemsLeft":["AES","RSA","SHA-256","HMAC"],
   "itemsRight":["Message authentication code constructed from a key and a hash function","Symmetric block cipher used to encrypt data at rest and in transit","Asymmetric algorithm widely used for digital signatures and key exchange","One-way cryptographic hash function"],
   "correctMatches":[1,2,3,0]},
  # 245 D2 correctMatches:[3,1,2,0]
  {"id":"serverplus-245","domain":"Server Administration","type":"matching",
   "question":"Match each management technology with its primary purpose.",
   "itemsLeft":["WSUS","Group Policy","SCCM / Microsoft Endpoint Manager","Ansible"],
   "itemsRight":["Agentless configuration management over SSH using YAML playbooks","Centralized policy enforcement for AD-joined Windows systems","Enterprise endpoint management — software deployment, OS imaging, and inventory","On-prem caching and approval point for Windows Update content"],
   "correctMatches":[3,1,2,0]},

  # ── Ordering 246-247 ─────────────────────────────────────────────────────
  # 246 D3 correctOrder:[2,1,0,3,4]
  {"id":"serverplus-246","domain":"Security and Disaster Recovery","type":"ordering",
   "question":"A ransomware infection has been detected on multiple production servers. Arrange the response actions in the correct order.",
   "items":["Eradicate the threat from affected systems",
            "Isolate affected systems from the network to stop lateral spread",
            "Identify the scope of the incident and the initial entry vector",
            "Restore from clean backups and verify data integrity",
            "Conduct a lessons-learned review and update controls"],
   "correctOrder":[2,1,0,3,4]},
  # 247 D4 correctOrder:[2,0,1,4,3]
  {"id":"serverplus-247","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the troubleshooting steps for a slow web application in the most logical order.",
   "items":["Check CPU, RAM, and disk utilization on the application server",
            "Test the application from a different network and location to isolate client-side factors",
            "Use browser developer tools to measure TTFB and individual asset load times",
            "Review application and web-server logs for errors and slow requests",
            "Engage DBAs or downstream service owners if backend latency is implicated"],
   "correctOrder":[2,0,1,4,3]},

  # ── SB 248-250 ────────────────────────────────────────────────────────────
  # 248 D3 [T,T,F,T]
  {"id":"serverplus-248","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about administrative and regulatory controls and indicate whether it is True or False.",
   "statements":["Defense in depth uses multiple layered controls so that the failure of any single control does not result in a breach.",
                 "Separation of duties splits a sensitive process across multiple people to reduce fraud and error risk.",
                 "HIPAA primarily regulates the storage and processing of payment card data.",
                 "PCI DSS applies to organizations that store, process, or transmit cardholder data."],
   "correctAnswers":[True,True,False,True]},
  # 249 D2 [T,F,T,T]
  {"id":"serverplus-249","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about server administration tooling and indicate whether it is True or False.",
   "statements":["Load balancer health checks automatically remove unhealthy backends from the active rotation.",
                 "Sticky sessions guarantee identical performance compared to a fully stateless load-balancing model.",
                 "Ansible playbooks are typically written in YAML.",
                 "WSUS allows an administrator to approve which Microsoft updates are deployed to managed Windows servers."],
   "correctAnswers":[True,False,True,True]},
  # 250 D4 [F,T,T,T]
  {"id":"serverplus-250","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about virtualization and storage troubleshooting and indicate whether it is True or False.",
   "statements":["Heavy memory ballooning by the host is a sign that the host has abundant free physical RAM.",
                 "vCPU oversubscription can lead to high 'CPU ready' time and degraded VM performance.",
                 "Updating RAID controller firmware should generally be performed during an approved maintenance window with current backups.",
                 "Sustained high input drops on a server NIC can indicate the host is unable to keep up with incoming traffic."],
   "correctAnswers":[False,True,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
