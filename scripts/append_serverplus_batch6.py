import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 251-290 ───────────────────────────────────────────────────────────
  # 251 D1 ca:0
  {"id":"serverplus-251","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A blade chassis hosts multiple blade servers that share centralized power, cooling, and shared switch modules for networking and storage. What is the primary advantage of these shared chassis interconnects?",
   "choices":["They consolidate cabling and management, reducing per-blade cable count and centralizing fabric configuration","They make each blade independently reachable without the chassis","They eliminate the need for an out-of-band management interface","They prevent blades from sharing chassis power"],"correctAnswer":0},
  # 252 D1 ca:1
  {"id":"serverplus-252","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A technician must access a server's firmware menus when both the GUI and out-of-band management are unreachable. Which physical port is the traditional last-resort access path?",
   "choices":["DisplayPort","Serial console (RS-232 / RJ-45 console)","USB-A","HDMI"],"correctAnswer":1},
  # 253 D1 ca:2
  {"id":"serverplus-253","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A blade enclosure provides centralized management for all blades, power supplies, and shared interconnect modules in the chassis. Which component performs this chassis-level management role?",
   "choices":["Per-blade BMC","Storage HBA","Chassis Management Controller (CMC)","Switch supervisor module"],"correctAnswer":2},
  # 254 D1 ca:3
  {"id":"serverplus-254","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A new server has just been racked. Which configuration change should the technician make to the BMC/iDRAC/iLO BEFORE production use?",
   "choices":["Disable hardware monitoring","Set BMC IP to DHCP only","Disable Secure Boot","Change the default administrator account password and apply firmware updates"],"correctAnswer":3},
  # 255 D1 ca:0
  {"id":"serverplus-255","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A media archive workload performs very long sequential reads and writes of multi-GB files. Which drive characteristic is MOST important for this workload?",
   "choices":["High sustained sequential throughput in MB/s","High random 4K IOPS","Lowest possible cache size","Smallest physical capacity per drive"],"correctAnswer":0},
  # 256 D1 ca:1
  {"id":"serverplus-256","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A new server boots quickly after power loss but loses all of its RAM contents while disk contents remain intact. Which memory characteristic explains this?",
   "choices":["SSDs are also volatile","DRAM is volatile while typical SSDs/HDDs are non-volatile","HDDs lose contents on power loss while RAM persists","ECC memory persists across power loss"],"correctAnswer":1},
  # 257 D2 ca:2
  {"id":"serverplus-257","domain":"Server Administration","type":"single-choice",
   "question":"A Windows-centric environment hosts internal mail using a Microsoft product that integrates tightly with Active Directory, Outlook, and MAPI. Which product is this?",
   "choices":["Postfix","Sendmail","Microsoft Exchange Server","Dovecot"],"correctAnswer":2},
  # 258 D2 ca:3
  {"id":"serverplus-258","domain":"Server Administration","type":"single-choice",
   "question":"A mail relay must accept outbound email from authenticated clients over an encrypted submission port. Which TCP port is most commonly used for authenticated mail submission?",
   "choices":["110","143","465 (legacy)","587"],"correctAnswer":3},
  # 259 D2 ca:0
  {"id":"serverplus-259","domain":"Server Administration","type":"single-choice",
   "question":"A user accesses email from a phone, laptop, and webmail interface and expects identical read/unread state and folders across all devices. Which mailbox protocol BEST supports this?",
   "choices":["IMAP (or IMAPS on 993)","POP3","SMTP","NNTP"],"correctAnswer":0},
  # 260 D2 ca:1
  {"id":"serverplus-260","domain":"Server Administration","type":"single-choice",
   "question":"A legacy mail client downloads messages from the server and removes them after retrieval. Which retrieval protocol is being used?",
   "choices":["IMAP","POP3 (or POP3S on 995)","MAPI","SMTP"],"correctAnswer":1},
  # 261 D2 ca:2
  {"id":"serverplus-261","domain":"Server Administration","type":"single-choice",
   "question":"A corporate network forces all outbound web traffic through a server that filters URLs and caches responses. Which server role is this?",
   "choices":["Reverse proxy","RADIUS server","Forward proxy server","DHCP server"],"correctAnswer":2},
  # 262 D2 ca:3
  {"id":"serverplus-262","domain":"Server Administration","type":"single-choice",
   "question":"All administrative SSH and RDP sessions to production servers are funneled through a hardened intermediate host that requires MFA, logs sessions, and disallows direct internet access for admins. What is this intermediate host commonly called?",
   "choices":["Reverse proxy","Print server","Update server","Jump host (bastion host)"],"correctAnswer":3},
  # 263 D2 ca:0
  {"id":"serverplus-263","domain":"Server Administration","type":"single-choice",
   "question":"A company replaces user desktops with thin clients that stream a Windows desktop from data-center servers. Which architecture is this?",
   "choices":["VDI (Virtual Desktop Infrastructure)","Active Directory","DFS namespace","RDP printing only"],"correctAnswer":0},
  # 264 D2 ca:1
  {"id":"serverplus-264","domain":"Server Administration","type":"single-choice",
   "question":"An enterprise needs to issue internal TLS certificates to its servers without depending on a public CA. Which Microsoft role provides this?",
   "choices":["IIS","Active Directory Certificate Services (AD CS)","Routing and Remote Access","Hyper-V"],"correctAnswer":1},
  # 265 D2 ca:2
  {"id":"serverplus-265","domain":"Server Administration","type":"single-choice",
   "question":"A Windows DNS server is configured to send all unknown queries to a specific upstream DNS server rather than performing full recursion from root hints. Which configuration is this?",
   "choices":["Zone delegation","Glue records","Conditional or 'forwarders'","Reverse lookup zone"],"correctAnswer":2},
  # 266 D2 ca:3
  {"id":"serverplus-266","domain":"Server Administration","type":"single-choice",
   "question":"A DHCP server is centralized but clients on other subnets cannot reach it directly with broadcasts. Which feature on the router/switch allows clients on remote subnets to obtain a lease?",
   "choices":["Static ARP","Proxy ARP","Dynamic NAT","DHCP relay agent (ip helper-address)"],"correctAnswer":3},
  # 267 D2 ca:0
  {"id":"serverplus-267","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin creates a custom systemd service for an application. Which directory is the standard location for administrator-installed unit files that override package defaults?",
   "choices":["/etc/systemd/system/","/lib/systemd/system/","/var/log/systemd/","/proc/systemd/"],"correctAnswer":0},
  # 268 D2 ca:1
  {"id":"serverplus-268","domain":"Server Administration","type":"single-choice",
   "question":"A bash admin needs to append the output of a command to an existing log file without overwriting it. Which redirection operator should be used?",
   "choices":[">",">>","2>","<"],"correctAnswer":1},
  # 269 D2 ca:2
  {"id":"serverplus-269","domain":"Server Administration","type":"single-choice",
   "question":"A sysadmin needs to extract and reformat specific columns from a structured log file. Which command is best suited?",
   "choices":["grep","sed only","awk","head"],"correctAnswer":2},
  # 270 D2 ca:3
  {"id":"serverplus-270","domain":"Server Administration","type":"single-choice",
   "question":"A Linux cron entry contains the fields '30 2 * * 0 /usr/local/bin/weekly.sh'. When does this job run?",
   "choices":["Every minute","Every weekday at 02:30","On the 30th of every month","At 02:30 every Sunday"],"correctAnswer":3},
  # 271 D2 ca:0
  {"id":"serverplus-271","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs to drop into a full interactive root shell from their normal account. Which command is most appropriate?",
   "choices":["sudo -i","sudo cd","sudo logout","sudo bash --login --no-rc"],"correctAnswer":0},
  # 272 D3 ca:1
  {"id":"serverplus-272","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team must distinguish between a vulnerability scan and a penetration test. Which statement BEST captures the difference?",
   "choices":["A penetration test is automated and a vulnerability scan is manual","A vulnerability scan inventories known weaknesses; a penetration test attempts to actively exploit them within a defined scope","Both produce identical output and serve the same purpose","Only penetration tests require authorization"],"correctAnswer":1},
  # 273 D3 ca:2
  {"id":"serverplus-273","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A change-management policy requires that critical patches be validated before being applied to production. Which practice satisfies this requirement?",
   "choices":["Applying patches directly to production with rollback only on failure","Skipping patches whenever staging environments are unavailable","Applying patches in a staging or test environment that mirrors production","Letting end users opt-in to patches individually"],"correctAnswer":2},
  # 274 D3 ca:3
  {"id":"serverplus-274","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An application needs to retrieve database credentials and API keys at runtime instead of storing them in code or config files in git. Which technology category solves this?",
   "choices":["Antivirus","SIEM","SAML federation only","Secrets management (e.g., HashiCorp Vault, AWS Secrets Manager)"],"correctAnswer":3},
  # 275 D3 ca:0
  {"id":"serverplus-275","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A compliance auditor asks how long the company retains security and access logs. Which document should define this?",
   "choices":["A documented log retention policy","Daily standup meeting notes","Personal admin notebooks","Whatever each server is configured to do by default"],"correctAnswer":0},
  # 276 D3 ca:1
  {"id":"serverplus-276","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team applies a standardized set of hardening settings to every newly built Linux server using a recognized framework. What is this practice called?",
   "choices":["Penetration testing","Establishing and enforcing a security baseline (e.g., CIS Benchmarks)","Vulnerability management only","Ad-hoc tuning"],"correctAnswer":1},
  # 277 D3 ca:2
  {"id":"serverplus-277","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"Before signing on a new managed service provider, the security team reviews the vendor's controls, certifications, and breach history. Which practice is this?",
   "choices":["Tabletop exercise","Incident response","Vendor / third-party risk assessment","Penetration testing of the vendor"],"correctAnswer":2},
  # 278 D3 ca:3
  {"id":"serverplus-278","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A login flow requires a password, a one-time code from an authenticator app, and a fingerprint. Which combination of MFA factor categories is this?",
   "choices":["Three 'something you know' factors","Three 'something you have' factors","One factor only — repeated three times","Something you know, something you have, and something you are"],"correctAnswer":3},
  # 279 D3 ca:0
  {"id":"serverplus-279","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team is reviewing modern guidance on password management. Which statement BEST reflects current NIST guidance for end-user passwords?",
   "choices":["Do not require periodic rotation unless there is evidence of compromise; favor longer, memorable passphrases","Force password rotation every 30 days regardless of compromise","Disable MFA whenever passwords are 16+ characters","Always require special characters at the cost of length"],"correctAnswer":0},
  # 280 D3 ca:1
  {"id":"serverplus-280","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A PKI policy mandates that long-lived cryptographic keys be replaced on a regular schedule. What is this practice called?",
   "choices":["Re-issuance only","Key rotation","Key escrow","Hashing"],"correctAnswer":1},
  # 281 D3 ca:2
  {"id":"serverplus-281","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"Which team is primarily responsible for monitoring security events, triaging alerts, and coordinating incident response?",
   "choices":["Procurement","Help Desk","Security Operations Center (SOC)","Compliance"],"correctAnswer":2},
  # 282 D3 ca:3
  {"id":"serverplus-282","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A SIEM correlates a failed VPN auth, followed by a successful login from a different country, followed by a privileged group change, and raises a high-severity alert. What core SIEM capability is being demonstrated?",
   "choices":["File integrity monitoring","Asset inventory","Patch deployment","Event correlation across multiple sources"],"correctAnswer":3},
  # 283 D3 ca:0
  {"id":"serverplus-283","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A response team walks through a simulated ransomware incident in a conference room — discussing decisions and roles — without touching production. What type of exercise is this?",
   "choices":["Tabletop exercise","Live-fire / full-scale drill","Penetration test","Compliance audit"],"correctAnswer":0},
  # 284 D4 ca:1
  {"id":"serverplus-284","domain":"Troubleshooting","type":"single-choice",
   "question":"A server is reporting reduced CPU clock frequency under load and the chassis is noticeably warm. Which condition is the most likely cause?",
   "choices":["Misconfigured DNS","Thermal throttling due to inadequate cooling or a failed fan","Stale ARP cache","Improper RAID stripe size"],"correctAnswer":1},
  # 285 D4 ca:2
  {"id":"serverplus-285","domain":"Troubleshooting","type":"single-choice",
   "question":"A server fails to complete POST and emits a specific sequence of beeps. Where should the technician look NEXT to interpret this fault?",
   "choices":["Domain controller event log","systemd journal","The vendor's POST beep-code documentation for that motherboard or BIOS","RAID controller cache"],"correctAnswer":2},
  # 286 D4 ca:3
  {"id":"serverplus-286","domain":"Troubleshooting","type":"single-choice",
   "question":"A storage admin sees an FC port repeatedly going up and down on a server's HBA. Which subsystem is the LEAST likely cause and should NOT be the first place to look?",
   "choices":["A bad/dirty SFP or fiber patch cord","HBA driver or firmware issue","FC switch port misconfiguration or partner port issue","The server's CPU clock speed"],"correctAnswer":3},
  # 287 D4 ca:0
  {"id":"serverplus-287","domain":"Troubleshooting","type":"single-choice",
   "question":"A LACP bundle between a server and a switch fails to form, and each member port instead behaves as an independent link. Which configuration mismatch is a common cause?",
   "choices":["LACP rate or active/passive mode mismatch between the server and switch","Mismatched chassis serial numbers","Disabled BIOS Secure Boot","Different brand of SFP modules at each end"],"correctAnswer":0},
  # 288 D4 ca:1
  {"id":"serverplus-288","domain":"Troubleshooting","type":"single-choice",
   "question":"An IPv6-only Linux server is not autoconfiguring an address via SLAAC. Which condition is the most likely root cause to check FIRST?",
   "choices":["IPv4 DHCP scope is exhausted","The upstream router is not sending IPv6 Router Advertisements on that segment","The kernel does not support IPv6","TLS certificates have expired"],"correctAnswer":1},
  # 289 D4 ca:2
  {"id":"serverplus-289","domain":"Troubleshooting","type":"single-choice",
   "question":"Users complain that a site-to-site VPN's bulk file transfers run noticeably slower than equivalent unencrypted LAN transfers. Which factors most directly explain this gap?",
   "choices":["NTP drift only","DNS suffix order","Encryption overhead and reduced effective MTU due to tunnel encapsulation","Lack of antivirus on the file server"],"correctAnswer":2},
  # 290 D4 ca:3
  {"id":"serverplus-290","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux server fails to start critical services after reboot. Investigation reveals that /var is at 100% capacity. What is the MOST appropriate corrective action?",
   "choices":["Reformat the entire system","Disable swap","Increase RAM","Free or relocate /var data, then tune log rotation and quotas to prevent recurrence"],"correctAnswer":3},

  # ── MR 291-293 ───────────────────────────────────────────────────────────
  # 291 D2 [0,2]
  {"id":"serverplus-291","domain":"Server Administration","type":"multiple-response",
   "question":"Which TWO of the following are mailbox-retrieval protocols used by email clients to read messages from a mail server? (Select 2)",
   "choices":["IMAP","SMTP","POP3","SNMP"],"correctAnswers":[0,2]},
  # 292 D3 [1,3]
  {"id":"serverplus-292","domain":"Security and Disaster Recovery","type":"multiple-response",
   "question":"To qualify as true multi-factor authentication, an authentication flow must use factors from at least TWO different categories. Which TWO of the following pairs satisfy that requirement? (Select 2)",
   "choices":["A password and a security question (both 'something you know')","A password and a one-time code from an authenticator app","Two different passwords entered in sequence","A fingerprint scan combined with a smart card"],"correctAnswers":[1,3]},
  # 293 D4 [0,2]
  {"id":"serverplus-293","domain":"Troubleshooting","type":"multiple-response",
   "question":"A server's internal temperature has risen above its normal operating range. Which TWO indicators most strongly suggest thermal stress that warrants immediate investigation? (Select 2)",
   "choices":["CPU clock speed has dropped well below its rated frequency","Increased number of TLS handshakes","Front-panel temperature warning LED is amber or red","Increased number of DHCP lease renewals"],"correctAnswers":[0,2]},

  # ── Matching 294-295 ─────────────────────────────────────────────────────
  # 294 D2 correctMatches:[3,2,1,0]
  {"id":"serverplus-294","domain":"Server Administration","type":"matching",
   "question":"Match each email protocol with its primary role.",
   "itemsLeft":["SMTP","IMAP","POP3","MAPI"],
   "itemsRight":["Proprietary Microsoft messaging protocol primarily used by Outlook with Exchange","Downloads messages from the server to the client and typically removes them","Synchronizes folder and message state between the server and multiple clients","Used by mail servers to send and relay messages between servers and from clients to servers"],
   "correctMatches":[3,2,1,0]},
  # 295 D3 correctMatches:[1,2,3,0]
  {"id":"serverplus-295","domain":"Security and Disaster Recovery","type":"matching",
   "question":"Match each multi-factor authentication category with a representative example.",
   "itemsLeft":["Something you know","Something you have","Something you are","Somewhere you are"],
   "itemsRight":["Geolocation- or trusted-network-based factor","Password or PIN","Smart card, hardware security key, or TOTP token","Fingerprint, face, or other biometric"],
   "correctMatches":[1,2,3,0]},

  # ── Ordering 296-297 ─────────────────────────────────────────────────────
  # 296 D2 correctOrder:[1,3,2,0,4]
  {"id":"serverplus-296","domain":"Server Administration","type":"ordering",
   "question":"Arrange the steps for deploying a new Microsoft Exchange Server in the correct order.",
   "items":["Migrate or create user mailboxes",
            "Plan the namespace, certificates, and storage layout",
            "Configure connectors, accepted domains, and mail flow",
            "Install Exchange and accept the EULA",
            "Test mail flow end-to-end and validate"],
   "correctOrder":[1,3,2,0,4]},
  # 297 D4 correctOrder:[1,2,0,3,4]
  {"id":"serverplus-297","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the troubleshooting steps for an unexpected sustained high-CPU condition on a Linux server in the most logical order.",
   "items":["Inspect the top offending processes' threads, file handles, and recent activity",
            "Identify the top CPU-consuming processes (top, htop, ps)",
            "Capture a process snapshot for later comparison",
            "Mitigate by adjusting priority, restarting the service, or scaling resources",
            "Document findings and add monitoring/alerts for early detection"],
   "correctOrder":[1,2,0,3,4]},

  # ── SB 298-300 ────────────────────────────────────────────────────────────
  # 298 D2 [T,F,T,T]
  {"id":"serverplus-298","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about email protocols and indicate whether it is True or False.",
   "statements":["IMAP keeps the authoritative copy of messages on the mail server and synchronizes state across clients.",
                 "POP3 by default synchronizes read/unread state across multiple devices in real time.",
                 "SMTP is the protocol used between mail servers to relay and deliver messages.",
                 "SMTP submission over port 587 with STARTTLS encrypts the message channel between client and server."],
   "correctAnswers":[True,False,True,True]},
  # 299 D3 [T,T,F,T]
  {"id":"serverplus-299","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about security operations and indicate whether it is True or False.",
   "statements":["True multi-factor authentication requires the factors to come from different categories (know/have/are).",
                 "A SOC analyst's role typically includes monitoring, triaging, and responding to security alerts.",
                 "Current NIST guidance recommends forcing periodic password rotation for all end-user accounts regardless of compromise.",
                 "Tabletop exercises walk teams through incident scenarios without making production changes."],
   "correctAnswers":[True,True,False,True]},
  # 300 D4 [T,T,F,T]
  {"id":"serverplus-300","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about server hardware and network troubleshooting and indicate whether it is True or False.",
   "statements":["Sustained CPU thermal throttling reduces measured clock speed below the rated operating frequency.",
                 "LACP requires both ends of the bundle to negotiate matching parameters before any member link forwards user traffic.",
                 "A 100% full /var partition typically has no effect on a Linux server's ability to boot or write logs.",
                 "VPN encryption overhead and reduced effective MTU can lower throughput compared with unencrypted LAN transfers."],
   "correctAnswers":[True,True,False,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
