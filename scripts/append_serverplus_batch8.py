import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 351-390 ───────────────────────────────────────────────────────────
  # 351 D1 ca:0
  {"id":"serverplus-351","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A 4U chassis routes both power and data between front-accessible drives and rear-accessible I/O modules through a single shared board. What is the difference between a backplane and a midplane in this context?",
   "choices":["A backplane sits on one side of the chassis; a midplane sits between two sides so modules plug in from both","Both terms refer to the rear power module","Backplane is for SAS only; midplane is for SATA only","Only blade chassis can use a midplane"],"correctAnswer":0},
  # 352 D1 ca:1
  {"id":"serverplus-352","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A facilities engineer is loading dense servers into a 42U rack. Which physical specification of the rack must be checked to avoid overloading?",
   "choices":["Cabinet color","Rated dynamic load capacity (lbs/kg) of the cabinet","Number of side panels","Door perforation percentage"],"correctAnswer":1},
  # 353 D1 ca:2
  {"id":"serverplus-353","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center uses a raised floor with perforated tiles in cold aisles. What is the primary purpose of the raised floor in this design?",
   "choices":["To support fiber patch panels","To run network cabling only","To deliver pressurized cold air up through perforated tiles in front of server intakes","To provide additional rack mounting space"],"correctAnswer":2},
  # 354 D1 ca:3
  {"id":"serverplus-354","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A server vendor lists a server's depth as 28 in. (~711 mm). Why must a deployment engineer verify rack depth and cabinet depth before installing this server?",
   "choices":["Rack depth has no impact on server fit","Server depth only matters in blade chassis","Server depth limits which RAID levels can be configured","Modern dense servers can exceed standard cabinet depths, blocking cable arms or doors if the cabinet is too shallow"],"correctAnswer":3},
  # 355 D1 ca:0
  {"id":"serverplus-355","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A vendor ships rail kits described as 'tool-less.' What is the main benefit of tool-less rails in a production data center?",
   "choices":["Faster, safer installation and removal of servers without screwdrivers or special tools","They are required for PoE delivery","They eliminate the need for the rear panel","They double the cabinet weight capacity"],"correctAnswer":0},
  # 356 D1 ca:1
  {"id":"serverplus-356","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A cabinet's interior depth is 1070 mm but cable management arms add 100 mm behind the server. Which value should the deployment engineer compare against the server's overall depth + cable arm?",
   "choices":["Cabinet door height","Total usable depth between the front and rear mounting rails","Front bezel thickness only","Width of the cabinet"],"correctAnswer":1},
  # 357 D1 ca:2
  {"id":"serverplus-357","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A UPS is rated for 10 kVA and 8 kW. The technician must size it for the total load. Which value represents real power that must NOT be exceeded?",
   "choices":["VA only","Lumens","kW (kilowatts)","Amps only"],"correctAnswer":2},
  # 358 D1 ca:3
  {"id":"serverplus-358","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A standby generator is connected to a critical load via a device that automatically connects the load to the generator when utility power fails. What is this device called?",
   "choices":["PDU","Inline filter","UPS only","Automatic Transfer Switch (ATS)"],"correctAnswer":3},
  # 359 D1 ca:0
  {"id":"serverplus-359","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"During an after-hours rack install, the technician verifies the cabinet is bonded to ground. Why is proper grounding/bonding essential in a server cabinet?",
   "choices":["Safely diverts fault currents and reduces ESD risk to people and equipment","Required for PoE to function","Reduces the cabinet's BTU rating","Enables IPMI over Ethernet"],"correctAnswer":0},
  # 360 D2 ca:1
  {"id":"serverplus-360","domain":"Server Administration","type":"single-choice",
   "question":"A traditional monitoring platform uses active checks executed by the master against a list of hosts and services, with plugins for each check type. Which platform is best described this way?",
   "choices":["Prometheus","Nagios (and similar Nagios-family tools)","Grafana","Elasticsearch"],"correctAnswer":1},
  # 361 D2 ca:2
  {"id":"serverplus-361","domain":"Server Administration","type":"single-choice",
   "question":"An open-source monitoring platform uses lightweight agents on each host, supports auto-discovery, and stores metrics centrally with built-in dashboards and alerting. Which platform fits this description?",
   "choices":["Helm","Splunk","Zabbix","Kubernetes"],"correctAnswer":2},
  # 362 D2 ca:3
  {"id":"serverplus-362","domain":"Server Administration","type":"single-choice",
   "question":"An SRE team adopts a pull-based monitoring system where the server scrapes metric endpoints exposed by each target and queries them with a domain-specific query language. Which system is this?",
   "choices":["Nagios","Zabbix","Splunk","Prometheus (with PromQL)"],"correctAnswer":3},
  # 363 D2 ca:0
  {"id":"serverplus-363","domain":"Server Administration","type":"single-choice",
   "question":"A dashboard tool is used to visualize metrics from multiple backends (Prometheus, InfluxDB, Elasticsearch, etc.) on a single pane of glass. Which tool is most commonly used for this?",
   "choices":["Grafana","Apache","Kibana only","HAProxy"],"correctAnswer":0},
  # 364 D2 ca:1
  {"id":"serverplus-364","domain":"Server Administration","type":"single-choice",
   "question":"A team aggregates logs centrally for search and analysis using a popular open-source stack that includes a search engine, a data shipper/processor, and a visualization layer. What is this stack called?",
   "choices":["LAMP","ELK (Elasticsearch / Logstash / Kibana)","MEAN","WAMP"],"correctAnswer":1},
  # 365 D2 ca:2
  {"id":"serverplus-365","domain":"Server Administration","type":"single-choice",
   "question":"A SOC team uses an enterprise log platform with its own search language to investigate events across servers, applications, and network devices. Which commercial product is described?",
   "choices":["Kibana","Grafana","Splunk (with SPL)","Postfix"],"correctAnswer":2},
  # 366 D2 ca:3
  {"id":"serverplus-366","domain":"Server Administration","type":"single-choice",
   "question":"A development team adds tooling that traces individual requests through application code, correlates them with infrastructure metrics, and pinpoints slow methods and DB queries. Which category of tool is this?",
   "choices":["IDS","SIEM","Configuration management","APM (Application Performance Monitoring)"],"correctAnswer":3},
  # 367 D2 ca:0
  {"id":"serverplus-367","domain":"Server Administration","type":"single-choice",
   "question":"An IT manager uses historical utilization trends to forecast when more storage and compute will be needed for upcoming business growth. Which discipline is this?",
   "choices":["Capacity planning","Penetration testing","Patch management","Incident response"],"correctAnswer":0},
  # 368 D2 ca:1
  {"id":"serverplus-368","domain":"Server Administration","type":"single-choice",
   "question":"A team builds new VMs from a hardened, patched OS image with standard agents and configuration pre-installed. What is this image commonly called?",
   "choices":["Snapshot","Golden image / server template","Differential disk","ISO mirror"],"correctAnswer":1},
  # 369 D2 ca:2
  {"id":"serverplus-369","domain":"Server Administration","type":"single-choice",
   "question":"A virtualization admin clarifies snapshots vs. backups for management. Which statement is accurate?",
   "choices":["A snapshot is a complete independent copy that can be restored even if the original disk is destroyed","Snapshots are slower than backups and less efficient","A snapshot captures state at a point in time and depends on the original disk chain; it is NOT a substitute for a real backup","Snapshots and backups are functionally identical"],"correctAnswer":2},
  # 370 D2 ca:3
  {"id":"serverplus-370","domain":"Server Administration","type":"single-choice",
   "question":"A bash script needs to assign the value 'prod' to a variable named ENV. Which line is correct?",
   "choices":["set ENV = 'prod'","ENV := 'prod'","let ENV 'prod'","ENV='prod'"],"correctAnswer":3},
  # 371 D2 ca:0
  {"id":"serverplus-371","domain":"Server Administration","type":"single-choice",
   "question":"A bash admin sets a variable that must be visible to all child processes (e.g., to pass configuration into a Python script). Which keyword is used?",
   "choices":["export","global","let","unset"],"correctAnswer":0},
  # 372 D3 ca:1
  {"id":"serverplus-372","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A mobile application is configured so that it will accept only a specific certificate (or its public key fingerprint) for its API endpoint, rejecting any other otherwise-valid certificate. Which control is this?",
   "choices":["OCSP stapling","Certificate pinning","Certificate transparency only","Cross-signing"],"correctAnswer":1},
  # 373 D3 ca:2
  {"id":"serverplus-373","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A web server is configured to attach a recent signed OCSP response to its TLS handshake so the client does not need to query the CA itself. Which feature is this?",
   "choices":["Certificate pinning","Forward secrecy","OCSP stapling","HSTS"],"correctAnswer":2},
  # 374 D3 ca:3
  {"id":"serverplus-374","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"Two services communicate over TLS and both present and validate each other's certificates as part of the handshake. Which configuration is this?",
   "choices":["Standard one-way TLS","Mutual TLS terminated in clear text","TLS 1.0","Mutual TLS (mTLS)"],"correctAnswer":3},
  # 375 D3 ca:0
  {"id":"serverplus-375","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team installs tooling that hashes critical system files at install time and alerts whenever those hashes change unexpectedly. Which control category is this?",
   "choices":["File Integrity Monitoring (e.g., Tripwire, AIDE, Wazuh FIM)","Antivirus only","DLP","RBAC"],"correctAnswer":0},
  # 376 D3 ca:1
  {"id":"serverplus-376","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A compliance program requires that USB mass-storage devices NOT be usable on production servers, while still allowing keyboards and mice. Which approach satisfies this requirement?",
   "choices":["Physically remove USB ports from all servers","Use endpoint policy / Group Policy / udev rules to block USB mass-storage class while allowing HID","Disable RAID controllers","Disable IPv6"],"correctAnswer":1},
  # 377 D3 ca:2
  {"id":"serverplus-377","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A networking team isolates server traffic into different broadcast domains and applies inter-VLAN ACLs to control which segments can talk to each other. Which technique is being used?",
   "choices":["Internet-edge NAT","Single-VLAN flat network","VLAN-based network segmentation","DNS forwarders"],"correctAnswer":2},
  # 378 D3 ca:3
  {"id":"serverplus-378","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A switch is configured to allow only a specific MAC address (or a limited number of MACs) per access port and to err-disable the port if violated. Which feature is this?",
   "choices":["802.1Q trunking","DHCP snooping","Spanning Tree","Switch port security"],"correctAnswer":3},
  # 379 D3 ca:0
  {"id":"serverplus-379","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A jump host (bastion) is the only path to production. Which control set is MOST important to apply to the jump host itself?",
   "choices":["MFA, full session logging, restricted outbound access, hardening baseline, and patching","Disabling all logging to reduce noise","Permitting direct internet egress for ease of admin","Sharing a single local account among admins"],"correctAnswer":0},
  # 380 D3 ca:1
  {"id":"serverplus-380","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An attacker spams a user with MFA push notifications until the user approves one out of frustration or by mistake. What is this technique called?",
   "choices":["Pretexting","MFA push-bombing / push fatigue","Watering-hole attack","Replay attack"],"correctAnswer":1},
  # 381 D3 ca:2
  {"id":"serverplus-381","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An identity team compares SAML 2.0 and OpenID Connect (OIDC). Which statement is accurate?",
   "choices":["SAML and OIDC are exactly identical wire protocols","SAML uses XML assertions; OIDC is built on OAuth 2.0 with JSON (JWT) ID tokens, often easier for modern web/mobile apps","Only SAML supports SSO","OIDC always replaces Kerberos in a domain"],"correctAnswer":2},
  # 382 D3 ca:3
  {"id":"serverplus-382","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security architecture introduces a system that stores and rotates privileged account credentials, brokers privileged sessions, and records them. Which class of tool is this?",
   "choices":["SIEM","DLP","IPS","Privileged Access Management (PAM)"],"correctAnswer":3},
  # 383 D4 ca:0
  {"id":"serverplus-383","domain":"Troubleshooting","type":"single-choice",
   "question":"A network engineer needs to inspect TLS handshakes and TCP retransmissions at the packet level for a specific server. Which tool is most appropriate to capture and decode this traffic with a GUI?",
   "choices":["Wireshark","top","route print","ps -ef"],"correctAnswer":0},
  # 384 D4 ca:1
  {"id":"serverplus-384","domain":"Troubleshooting","type":"single-choice",
   "question":"On a headless Linux server, an admin needs to capture TCP packets to a file for later analysis. Which CLI tool is most commonly used for this?",
   "choices":["traceroute","tcpdump","netstat","arp"],"correctAnswer":1},
  # 385 D4 ca:2
  {"id":"serverplus-385","domain":"Troubleshooting","type":"single-choice",
   "question":"A network admin wants a continuous trace that combines per-hop ping statistics with traceroute-style path discovery to localize intermittent packet loss. Which tool fits BEST?",
   "choices":["arp","nc (netcat) only","mtr (My Traceroute)","ipconfig"],"correctAnswer":2},
  # 386 D4 ca:3
  {"id":"serverplus-386","domain":"Troubleshooting","type":"single-choice",
   "question":"A team wants to measure available TCP throughput between two specific servers under controlled conditions. Which tool is purpose-built for this measurement?",
   "choices":["dig","nslookup","ipconfig","iperf / iperf3"],"correctAnswer":3},
  # 387 D4 ca:0
  {"id":"serverplus-387","domain":"Troubleshooting","type":"single-choice",
   "question":"A web application is throwing 500-class errors but Windows Event Viewer shows nothing obvious. Where should the admin look NEXT for relevant error messages?",
   "choices":["The application's own logs (e.g., IIS w3svc logs, application-specific log directories) for stack traces and request context","BIOS POST log","DHCP server scope statistics","NTFS file system journal"],"correctAnswer":0},
  # 388 D4 ca:1
  {"id":"serverplus-388","domain":"Troubleshooting","type":"single-choice",
   "question":"A security team wants all syslog messages from Linux servers forwarded to a central collector. Which configuration component on each server forwards messages off-host?",
   "choices":["systemctl enable forwarder.service","An rsyslog (or syslog-ng) forwarding rule to the collector's address/port","cron job that emails logs each hour","NTP forwarder"],"correctAnswer":1},
  # 389 D4 ca:2
  {"id":"serverplus-389","domain":"Troubleshooting","type":"single-choice",
   "question":"Users complain that they suddenly cannot log into a recently joined Linux server using AD credentials. The server was reimaged yesterday. Which issue is the most likely cause to verify FIRST?",
   "choices":["NTFS permissions on /home","Filesystem journal corruption","Clock skew with the domain controller greater than the configured Kerberos tolerance","Disabled BIOS Secure Boot"],"correctAnswer":2},
  # 390 D4 ca:3
  {"id":"serverplus-390","domain":"Troubleshooting","type":"single-choice",
   "question":"A vMotion / live migration attempt fails between two hosts in the same cluster. Which precondition is the most common root cause for the failure?",
   "choices":["Different RAID stripe sizes","Different OS time zones","Different CPU manufacturers' fonts","The destination host does not have access to the source VM's datastore or required port groups"],"correctAnswer":3},

  # ── MR 391-393 ───────────────────────────────────────────────────────────
  # 391 D2 [0,2]
  {"id":"serverplus-391","domain":"Server Administration","type":"multiple-response",
   "question":"A modern observability stack is being designed. Which TWO components below are most commonly paired together to store and visualize time-series metrics? (Select 2)",
   "choices":["Prometheus","HAProxy","Grafana","Postfix"],"correctAnswers":[0,2]},
  # 392 D3 [1,3]
  {"id":"serverplus-392","domain":"Security and Disaster Recovery","type":"multiple-response",
   "question":"Which TWO practices most directly improve the security posture of a PKI deployment over time? (Select 2)",
   "choices":["Permanently disabling certificate revocation checks","Using shorter certificate lifetimes","Hard-coding private keys into git repositories","Automating certificate renewal and rotation"],"correctAnswers":[1,3]},
  # 393 D4 [0,3]
  {"id":"serverplus-393","domain":"Troubleshooting","type":"multiple-response",
   "question":"A server admin needs to capture packet-level traffic on a Linux host for offline analysis. Which TWO tools are most directly suited to this task? (Select 2)",
   "choices":["tcpdump","fdisk","systemctl","Wireshark / tshark"],"correctAnswers":[0,3]},

  # ── Matching 394-395 ─────────────────────────────────────────────────────
  # 394 D2 correctMatches:[1,3,2,0]
  {"id":"serverplus-394","domain":"Server Administration","type":"matching",
   "question":"Match each monitoring/observability tool with its primary role.",
   "itemsLeft":["Nagios","Prometheus","ELK Stack","Grafana"],
   "itemsRight":["Visualization and dashboarding layer for many backends","Traditional active-check monitoring with plugins","Centralized log aggregation, search, and visualization","Pull-based time-series metrics with PromQL"],
   "correctMatches":[1,3,2,0]},
  # 395 D3 correctMatches:[3,2,1,0]
  {"id":"serverplus-395","domain":"Security and Disaster Recovery","type":"matching",
   "question":"Match each security design principle with its definition.",
   "itemsLeft":["Defense in depth","Least privilege","Network segmentation","Zero trust"],
   "itemsRight":["Never trust by default; continuously verify every access request","Divide the network into zones to limit the blast radius of a compromise","Grant the minimum access necessary for a role to perform its function","Use multiple overlapping security controls so the failure of one is not catastrophic"],
   "correctMatches":[3,2,1,0]},

  # ── Ordering 396-397 ─────────────────────────────────────────────────────
  # 396 D2 correctOrder:[0,1,2,4,3]
  {"id":"serverplus-396","domain":"Server Administration","type":"ordering",
   "question":"Arrange the steps for rolling out a new monitoring platform across a server fleet in the correct order.",
   "items":["Identify systems and metrics worth monitoring",
            "Install and configure monitoring agents/exporters on hosts",
            "Define alerting thresholds and notification channels",
            "Build dashboards for operations and management",
            "Validate the alerting flow end-to-end with synthetic events"],
   "correctOrder":[0,1,2,4,3]},
  # 397 D4 correctOrder:[1,0,2,3,4]
  {"id":"serverplus-397","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the troubleshooting steps for an intermittent network problem in the most logical order.",
   "items":["Capture traffic on the suspect interface with tcpdump or Wireshark",
            "Confirm the problem reproduces on demand or at predictable times",
            "Filter the capture to the relevant 5-tuple (src/dst IP, src/dst port, protocol)",
            "Compare against a known-good baseline capture if one exists",
            "Share findings and packet capture with the right team for remediation"],
   "correctOrder":[1,0,2,3,4]},

  # ── SB 398-400 ────────────────────────────────────────────────────────────
  # 398 D2 [T,F,T,T]
  {"id":"serverplus-398","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about monitoring and operations tooling and indicate whether it is True or False.",
   "statements":["Grafana is a visualization layer that can render data from multiple time-series and log backends.",
                 "A VM snapshot is a complete independent backup that can be restored even if the original virtual disk chain is destroyed.",
                 "Capacity planning forecasts when current compute, memory, storage, or network resources will be insufficient for projected workloads.",
                 "The ELK stack is composed of Elasticsearch, Logstash, and Kibana."],
   "correctAnswers":[True,False,True,True]},
  # 399 D3 [T,T,F,T]
  {"id":"serverplus-399","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about TLS, segmentation, and identity controls and indicate whether it is True or False.",
   "statements":["Mutual TLS authenticates BOTH the client and the server using their certificates during the handshake.",
                 "File Integrity Monitoring tools alert when watched files or hashes change unexpectedly.",
                 "OCSP stapling requires every client to contact the issuing CA directly for revocation information on every connection.",
                 "VLAN-based network segmentation can reduce the blast radius of a compromised host versus a flat LAN."],
   "correctAnswers":[True,True,False,True]},
  # 400 D4 [T,F,T,T]
  {"id":"serverplus-400","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about network and AD troubleshooting and indicate whether it is True or False.",
   "statements":["tcpdump can write captures directly to a PCAP file for later analysis in Wireshark / tshark.",
                 "mtr only collects a single round-trip's data and cannot produce continuous per-hop statistics.",
                 "iperf measures TCP/UDP throughput between two hosts and is well suited to identifying bandwidth bottlenecks.",
                 "Kerberos authentication failures frequently correlate with clock skew exceeding the configured tolerance between client and KDC."],
   "correctAnswers":[True,False,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
