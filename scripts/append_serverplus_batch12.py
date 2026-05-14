import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 551-590 ───────────────────────────────────────────────────────────
  # 551 D1 ca:0
  {"id":"serverplus-551","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A facility uses badge readers, logged entries, and visitor escorts to control who enters the server room. Which control category does this represent?",
   "choices":["Physical access controls","Network ACLs","File-system permissions","TLS cipher suites"],"correctAnswer":0},
  # 552 D1 ca:1
  {"id":"serverplus-552","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A server-room entrance has a two-door vestibule where the inner door cannot open until the outer door is closed and the user re-authenticates. What is this construct called?",
   "choices":["Tailgate","Mantrap (access control vestibule)","Bollard","Airlock cage"],"correctAnswer":1},
  # 553 D1 ca:2
  {"id":"serverplus-553","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center entrance requires a fingerprint scan in addition to a badge. Which security factor does the fingerphint provide?",
   "choices":["Something you have","Something you know","Something you are (biometric)","Somewhere you are"],"correctAnswer":2},
  # 554 D1 ca:3
  {"id":"serverplus-554","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A facility records every entry, exit, and aisle activity for forensic review. Which control category does CCTV with retention fall under?",
   "choices":["Preventive only","Compensating","Recovery","Detective / deterrent physical control"],"correctAnswer":3},
  # 555 D1 ca:0
  {"id":"serverplus-555","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A new data center is being designed under raised flooring used for CRAC air delivery. Which environmental control should be installed beneath the floor to detect coolant leaks early?",
   "choices":["Water leak detection cabling/sensors","UPS battery monitor","NIC teaming","Network IDS sensors"],"correctAnswer":0},
  # 556 D1 ca:1
  {"id":"serverplus-556","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A facility installs a clean-agent gaseous fire suppression system rather than water sprinklers in the server room. Which gas family is commonly used for this purpose?",
   "choices":["Halon (CFC)","FM-200 (HFC-227ea) or Inergen / Novec 1230 type clean agents","Carbon dioxide only (not used in occupied rooms)","Foam concentrate"],"correctAnswer":1},
  # 557 D1 ca:2
  {"id":"serverplus-557","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center deploys multiple computer room air conditioner (CRAC) units in N+1 configuration. What does N+1 cooling redundancy mean?",
   "choices":["Doubles the cooling capacity required","Eliminates the need for raised floors","One CRAC unit can fail and the remaining capacity will still meet the load","Cooling can be cut by 50% with no impact"],"correctAnswer":2},
  # 558 D1 ca:3
  {"id":"serverplus-558","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A shared colocation facility provides individual locking front and rear doors on each customer's cabinet, with audit-logged key access. Which control does this primarily implement?",
   "choices":["TLS termination","Data-at-rest encryption","Confidentiality of DNS queries","Physical access control at the cabinet level"],"correctAnswer":3},
  # 559 D1 ca:0
  {"id":"serverplus-559","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A technician is mounting four servers of different weights into a single rack. Which installation order is BEST?",
   "choices":["Install the heaviest server in the lowest position and work upward to keep the rack's center of gravity low","Install the heaviest server in the highest position for cooling","Order by hostname alphabetically","Order by purchase date"],"correctAnswer":0},
  # 560 D2 ca:1
  {"id":"serverplus-560","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin uses a built-in PowerShell-based configuration management system that defines node configurations and converges them to a desired state. Which technology is this?",
   "choices":["Windows Update","PowerShell Desired State Configuration (DSC)","Group Policy only","WSUS"],"correctAnswer":1},
  # 561 D2 ca:2
  {"id":"serverplus-561","domain":"Server Administration","type":"single-choice",
   "question":"A platform team adopts a configuration management tool whose units of code are called 'recipes' grouped into 'cookbooks' executed by an agent on each node. Which tool fits?",
   "choices":["Puppet","Ansible","Chef","Terraform"],"correctAnswer":2},
  # 562 D2 ca:3
  {"id":"serverplus-562","domain":"Server Administration","type":"single-choice",
   "question":"A team wants a configuration management framework with a publish/subscribe message bus to push commands and state to many nodes quickly. Which tool best fits this description?",
   "choices":["Chef","Ansible","Puppet","SaltStack"],"correctAnswer":3},
  # 563 D2 ca:0
  {"id":"serverplus-563","domain":"Server Administration","type":"single-choice",
   "question":"An infrastructure team declares VMs, networks, and storage as code in .tf files and applies them to AWS and Azure. Which tool is being used?",
   "choices":["Terraform","Notepad++","WSUS","Hyper-V Manager"],"correctAnswer":0},
  # 564 D2 ca:1
  {"id":"serverplus-564","domain":"Server Administration","type":"single-choice",
   "question":"A cloud VM image consumes user-data on first boot to set hostname, install packages, add SSH keys, and run initial scripts. Which framework provides this?",
   "choices":["sysprep","cloud-init","unattend.xml only","preseed only"],"correctAnswer":1},
  # 565 D2 ca:2
  {"id":"serverplus-565","domain":"Server Administration","type":"single-choice",
   "question":"A RHEL admin automates unattended OS installations across dozens of physical servers using a structured answer file format. Which method is this?",
   "choices":["AutoUnattend.xml","preseed","Kickstart","cloud-init only"],"correctAnswer":2},
  # 566 D2 ca:3
  {"id":"serverplus-566","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin captures a customized Windows image to be deployed to many servers. Which utility generalizes the source image so that machine-specific IDs (SID, hostname) are regenerated on first boot?",
   "choices":["DISM only","Robocopy","WSUS","sysprep"],"correctAnswer":3},
  # 567 D2 ca:0
  {"id":"serverplus-567","domain":"Server Administration","type":"single-choice",
   "question":"A virtualization admin clones new VMs from a hardened, patched VM template. Which advantage does this provide over installing each VM manually?",
   "choices":["Faster, consistent provisioning with a uniform baseline and reduced configuration drift","Lower disk usage in every case","Eliminates the need for backups","Removes the need for licensing"],"correctAnswer":0},
  # 568 D2 ca:1
  {"id":"serverplus-568","domain":"Server Administration","type":"single-choice",
   "question":"A cloud workload automatically scales out the number of identical VMs when CPU utilization rises and scales in when it falls. Which construct enables this?",
   "choices":["A single static VM","An auto-scaling group / VM Scale Set","An IaC repository only","A NAT gateway"],"correctAnswer":1},
  # 569 D2 ca:2
  {"id":"serverplus-569","domain":"Server Administration","type":"single-choice",
   "question":"An on-prem workload bursts into a public cloud to handle peak demand and returns to running on-prem during normal periods. What is this pattern called?",
   "choices":["Lift and shift","Cold standby","Cloud bursting","Multi-tenant SaaS"],"correctAnswer":2},
  # 570 D2 ca:3
  {"id":"serverplus-570","domain":"Server Administration","type":"single-choice",
   "question":"An enterprise needs private, high-bandwidth, lower-latency connectivity between its on-prem data center and a public cloud provider, bypassing the public internet. Which service category provides this?",
   "choices":["Standard site-to-site VPN over the internet only","Public NAT gateway","Cloud-managed DNS","Dedicated/private cloud interconnect (e.g., AWS Direct Connect, Azure ExpressRoute, Google Cloud Interconnect)"],"correctAnswer":3},
  # 571 D3 ca:0
  {"id":"serverplus-571","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A new server needs a TLS certificate trusted by both browsers and mobile clients. Which PKI design choice is fundamental to that trust?",
   "choices":["The certificate must chain to a CA trusted by the client's trust store","Use only self-signed certificates","Disable hostname validation in clients","Pin SHA-1 hashes everywhere"],"correctAnswer":0},
  # 572 D3 ca:1
  {"id":"serverplus-572","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A PKI design keeps the Root CA offline and uses an issuing/Subordinate CA online to sign end-entity certificates. What is the primary security advantage?",
   "choices":["Faster certificate enrollment","Limits exposure of the root CA's private key — only the issuing CA is online and can be revoked if compromised","Eliminates the need for OCSP","Removes the need to validate certificate chains"],"correctAnswer":1},
  # 573 D3 ca:2
  {"id":"serverplus-573","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A web admin compares a wildcard certificate (*.example.com) and a SAN certificate. Which statement is accurate?",
   "choices":["Wildcards work for any depth of subdomain (sub.sub.example.com), SAN certs do not","Both are identical","Wildcard certificates cover all hostnames at one subdomain level under the domain; SAN certificates cover a specific list of explicit hostnames in the Subject Alternative Name extension","SAN certificates are deprecated in modern TLS"],"correctAnswer":2},
  # 574 D3 ca:3
  {"id":"serverplus-574","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A development team requires peer code review before any change is merged to main. Which benefit is MOST directly produced?",
   "choices":["Faster CI/CD pipelines","Improved type checking","Lower license costs","Catches defects, security issues, and design problems earlier — before they reach production"],"correctAnswer":3},
  # 575 D3 ca:0
  {"id":"serverplus-575","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"Before a penetration test, the testing firm and the customer sign a document detailing scope, methods, and emergency contacts. What is this document commonly called?",
   "choices":["Rules of Engagement","Acceptable use policy","Disaster recovery runbook","Service catalog"],"correctAnswer":0},
  # 576 D3 ca:1
  {"id":"serverplus-576","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A vendor invites external security researchers to find and responsibly disclose vulnerabilities in their products in exchange for monetary rewards. Which program is this?",
   "choices":["Red team","Bug bounty","Threat hunting","Vendor risk assessment"],"correctAnswer":1},
  # 577 D3 ca:2
  {"id":"serverplus-577","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"Two security teams collaborate during an exercise — one simulates real attacker tradecraft while the other defends and improves detections in real time. Which exercise type is this?",
   "choices":["Tabletop only","Pure red team engagement","Purple-team exercise","Blue-team-only drill"],"correctAnswer":2},
  # 578 D3 ca:3
  {"id":"serverplus-578","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A SOC analyst forms hypotheses about possible attacker footholds and actively investigates rather than waiting for alerts to fire. Which activity is this?",
   "choices":["Patch management","Penetration test","Vulnerability scan","Threat hunting"],"correctAnswer":3},
  # 579 D4 ca:0
  {"id":"serverplus-579","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin wants a quick human-readable view of total memory, used, free, and swap. Which command provides this?",
   "choices":["free -h","ls -lh","ps aux","ipconfig"],"correctAnswer":0},
  # 580 D4 ca:1
  {"id":"serverplus-580","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin needs a sampled, unified view of memory, processes, paging, block I/O, and CPU usage in a single tool. Which command fits BEST?",
   "choices":["uname -a","vmstat 1","route -n","arp -a"],"correctAnswer":1},
  # 581 D4 ca:2
  {"id":"serverplus-581","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin needs per-device disk I/O statistics, including IOPS, throughput, and queue depth. Which command provides this?",
   "choices":["uname -r","route print","iostat -x 1","ps -ef"],"correctAnswer":2},
  # 582 D4 ca:3
  {"id":"serverplus-582","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin needs to review HISTORICAL performance data collected over the past 24 hours by the sysstat package. Which command is purpose-built to query this stored data?",
   "choices":["uname -r","systemctl status","ls -lh","sar -A"],"correctAnswer":3},
  # 583 D4 ca:0
  {"id":"serverplus-583","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows admin wants to record CPU, memory, disk, and network counters over time for trend analysis and capacity planning. Which built-in tool fits BEST?",
   "choices":["Performance Monitor (perfmon) with a Data Collector Set","Task Manager","Event Viewer","Notepad"],"correctAnswer":0},
  # 584 D4 ca:1
  {"id":"serverplus-584","domain":"Troubleshooting","type":"single-choice",
   "question":"A VMware admin needs a real-time, ESXi-host-level CPU, memory, disk, and network view directly on the host. Which utility provides this on ESXi?",
   "choices":["Windows perfmon","esxtop","Linux top only","RDP session manager"],"correctAnswer":1},
  # 585 D4 ca:2
  {"id":"serverplus-585","domain":"Troubleshooting","type":"single-choice",
   "question":"A Hyper-V admin needs to monitor 'Hyper-V Hypervisor Logical Processor' performance counters to understand CPU consumption. Which tool exposes these counters on the host?",
   "choices":["DNS Manager","Group Policy Editor","Performance Monitor (perfmon)","Notepad"],"correctAnswer":2},
  # 586 D4 ca:3
  {"id":"serverplus-586","domain":"Troubleshooting","type":"single-choice",
   "question":"A storage admin is asked to choose 'high throughput' vs. 'low latency' tier for a workload. Which workload is MOST sensitive to per-operation latency rather than aggregate throughput?",
   "choices":["Sequential video archive","Nightly bulk-copy backup","Cold object archive","OLTP database transaction (small random reads/writes with strict response times)"],"correctAnswer":3},
  # 587 D4 ca:0
  {"id":"serverplus-587","domain":"Troubleshooting","type":"single-choice",
   "question":"A SAN admin sees that a host has consistently high disk queue depth and increasing await latency. Which tuning lever should be considered FIRST?",
   "choices":["Reduce concurrency or scale up storage performance (e.g., faster tier, more spindles); validate path/queue depth settings","Disable encryption at rest","Disable NTP","Disable SMART"],"correctAnswer":0},
  # 588 D4 ca:1
  {"id":"serverplus-588","domain":"Troubleshooting","type":"single-choice",
   "question":"A monitoring system shows that the server's 10 GbE NIC is averaging 9 Gbps utilization during business hours. Which conclusion is BEST supported?",
   "choices":["The disk is the only bottleneck","The NIC is near saturation; sustained spikes will introduce queuing/latency and may be a planning trigger","CPU is bottlenecked","There is no risk regardless of bursts"],"correctAnswer":1},
  # 589 D4 ca:2
  {"id":"serverplus-589","domain":"Troubleshooting","type":"single-choice",
   "question":"A capture shows a high TCP retransmission rate between two hosts on the same VLAN. Which physical-layer item should be checked FIRST?",
   "choices":["BIOS RTC battery","NTP source","Switch port error counters and cable/SFP integrity for the affected interfaces","DNS forwarders"],"correctAnswer":2},
  # 590 D4 ca:3
  {"id":"serverplus-590","domain":"Troubleshooting","type":"single-choice",
   "question":"A user complains that a public website 'feels slow' even though pings to its IP are fast. Tracing the request shows DNS lookups consistently taking over 2 seconds. Which subsystem should be inspected NEXT?",
   "choices":["The application's HTML markup","BIOS Secure Boot policy","Disk write-back cache","The configured DNS resolvers — reachability, response time, and whether they are forwarding to a slow upstream"],"correctAnswer":3},

  # ── MR 591-593 ───────────────────────────────────────────────────────────
  # 591 D4 [0,2]
  {"id":"serverplus-591","domain":"Troubleshooting","type":"multiple-response",
   "question":"A Linux SRE is investigating a slowdown and needs to inspect both kernel/CPU/memory paging activity and per-device disk I/O. Which TWO tools, used together, BEST cover this need? (Select 2)",
   "choices":["vmstat","route","iostat","arp"],"correctAnswers":[0,2]},
  # 592 D2 [0,1]
  {"id":"serverplus-592","domain":"Server Administration","type":"multiple-response",
   "question":"Which TWO of the following are Infrastructure-as-Code or configuration-management tools that can declaratively manage server fleets and cloud resources? (Select 2)",
   "choices":["Terraform","Ansible","Postfix","HAProxy"],"correctAnswers":[0,1]},
  # 593 D3 [1,3]
  {"id":"serverplus-593","domain":"Security and Disaster Recovery","type":"multiple-response",
   "question":"Which TWO practices most directly reduce the number and severity of security defects introduced during development? (Select 2)",
   "choices":["Deploying directly to production without staging","Mandatory peer code review on every change","Disabling MFA for developers","Formal secure SDLC activities (threat modeling, security testing)"],"correctAnswers":[1,3]},

  # ── Matching 594-595 ─────────────────────────────────────────────────────
  # 594 D4 correctMatches:[3,1,2,0]
  {"id":"serverplus-594","domain":"Troubleshooting","type":"matching",
   "question":"Match each performance tool with its primary role.",
   "itemsLeft":["vmstat","iostat","sar","perfmon"],
   "itemsRight":["Windows tool for live and historical performance counters and data collector sets","Linux per-device disk I/O statistics","Linux historical performance data captured by sysstat","Linux unified live view of memory, processes, paging, block I/O, and CPU"],
   "correctMatches":[3,1,2,0]},
  # 595 D2 correctMatches:[1,3,2,0]
  {"id":"serverplus-595","domain":"Server Administration","type":"matching",
   "question":"Match each IaC/configuration-management tool with its defining characteristic.",
   "itemsLeft":["Terraform","Ansible","Chef","Puppet"],
   "itemsRight":["Pull-based agent that periodically applies catalogs to converge state","Push-based declarative resource provisioning across many cloud and on-prem providers","Recipes/cookbooks evaluated by an agent on each managed node","Agentless YAML playbooks executed over SSH/WinRM"],
   "correctMatches":[1,3,2,0]},

  # ── Ordering 596-597 ─────────────────────────────────────────────────────
  # 596 D2 correctOrder:[2,1,0,3,4]
  {"id":"serverplus-596","domain":"Server Administration","type":"ordering",
   "question":"Arrange the steps for provisioning a new server fleet using Infrastructure-as-Code and configuration management in the most logical order.",
   "items":["Apply post-provision configuration with a config-management tool (Ansible/Chef/Puppet)",
            "Bake required customizations into a golden image / VM template",
            "Use Infrastructure-as-Code (e.g., Terraform) to declare the desired infrastructure",
            "Capture and validate the resulting state in source control",
            "Promote the change to production through staging and review"],
   "correctOrder":[2,1,0,3,4]},
  # 597 D4 correctOrder:[2,0,3,1,4]
  {"id":"serverplus-597","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the steps for diagnosing a 'server feels slow' complaint in the most logical order.",
   "items":["Decide which subsystem (CPU, RAM, storage, network) is the suspect",
            "Trend the relevant metric over hours/days to identify a baseline and the deviation",
            "Confirm the user-visible symptom (slow app, slow DB query, slow login)",
            "Use the appropriate native tool (vmstat/iostat/sar/perfmon) to capture detailed metrics",
            "Engage the application or DB team if the bottleneck is application-side"],
   "correctOrder":[2,0,3,1,4]},

  # ── SB 598-600 ────────────────────────────────────────────────────────────
  # 598 D4 [T,F,T,T]
  {"id":"serverplus-598","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about performance tooling and indicate whether it is True or False.",
   "statements":["vmstat shows a unified view of memory, processes, paging, block I/O, and CPU statistics on Linux.",
                 "iostat is the standard built-in Windows tool for collecting performance counters and trend data.",
                 "The sar utility (from the sysstat package) can report historical performance data captured by sa1/sa2.",
                 "Windows Performance Monitor (perfmon) can record metrics to Data Collector Sets for later analysis."],
   "correctAnswers":[True,False,True,True]},
  # 599 D2 [T,T,F,T]
  {"id":"serverplus-599","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about IaC and configuration management and indicate whether it is True or False.",
   "statements":["Terraform is a declarative IaC tool that manages resources across many cloud and on-prem providers.",
                 "Ansible playbooks are typically executed over SSH or WinRM without persistent agents on managed nodes.",
                 "Puppet is purely push-based and never uses agents on managed nodes.",
                 "Golden VM images and templates reduce per-server configuration drift versus ad-hoc installs."],
   "correctAnswers":[True,True,False,True]},
  # 600 D3 [F,T,T,T]
  {"id":"serverplus-600","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about PKI design and security operations and indicate whether it is True or False.",
   "statements":["A root CA's private key should be kept online and exposed to internet-facing services for convenience.",
                 "A subordinate (issuing) CA signed by an offline root limits the impact of a compromised issuing CA.",
                 "A SAN certificate can secure multiple specific hostnames listed in its Subject Alternative Name extension.",
                 "Threat hunting is the proactive search for adversary activity rather than waiting for an alert to fire."],
   "correctAnswers":[False,True,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
