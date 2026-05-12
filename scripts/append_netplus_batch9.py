import json, pathlib

Q = pathlib.Path("src/data/comptia-net-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 401-440 ──────────────────────────────────────────────────────────────

  # 401 D1 correctAnswer:2
  {"id":"netplus-401","domain":"Networking Concepts","type":"single-choice",
   "question":"A legacy system requires unencrypted remote terminal access. Which protocol provides this, and on which TCP port does it listen?",
   "choices":["SSH on port 22","SSH on port 23","Telnet on port 23","Telnet on port 22"],"correctAnswer":2},

  # 402 D1 correctAnswer:0
  {"id":"netplus-402","domain":"Networking Concepts","type":"single-choice",
   "question":"An administrator needs encrypted remote access to a Linux server. Which protocol and port provides encrypted terminal sessions?",
   "choices":["SSH on TCP port 22","Telnet on TCP port 23","RDP on TCP port 3389","SFTP on TCP port 21"],"correctAnswer":0},

  # 403 D1 correctAnswer:1
  {"id":"netplus-403","domain":"Networking Concepts","type":"single-choice",
   "question":"A web server must accept encrypted browser connections. Which port must be open on the firewall for HTTPS traffic?",
   "choices":["80","443","8080","8443"],"correctAnswer":1},

  # 404 D1 correctAnswer:3
  {"id":"netplus-404","domain":"Networking Concepts","type":"single-choice",
   "question":"A Windows administrator needs to remotely control a desktop using the Remote Desktop Protocol. Which TCP port does RDP use by default?",
   "choices":["22","23","443","3389"],"correctAnswer":3},

  # 405 D1 correctAnswer:2
  {"id":"netplus-405","domain":"Networking Concepts","type":"single-choice",
   "question":"An application needs to query an Active Directory server for user authentication over the standard unencrypted LDAP port. Which port should be used?",
   "choices":["636","88","443","389"],"correctAnswer":2},

  # 406 D1 correctAnswer:0
  {"id":"netplus-406","domain":"Networking Concepts","type":"single-choice",
   "question":"A security administrator requires all LDAP queries to be encrypted using TLS. Which port is used for LDAPS (LDAP over TLS)?",
   "choices":["636","389","443","88"],"correctAnswer":0},

  # 407 D1 correctAnswer:1
  {"id":"netplus-407","domain":"Networking Concepts","type":"single-choice",
   "question":"Kerberos is the default authentication protocol in Windows Active Directory environments. Which port does Kerberos use?",
   "choices":["389","88","636","464"],"correctAnswer":1},

  # 408 D1 correctAnswer:3
  {"id":"netplus-408","domain":"Networking Concepts","type":"single-choice",
   "question":"Network devices must synchronize their clocks with an NTP server. On which UDP port does NTP operate?",
   "choices":["161","162","514","123"],"correctAnswer":3},

  # 409 D1 correctAnswer:2
  {"id":"netplus-409","domain":"Networking Concepts","type":"single-choice",
   "question":"OSPF is a link-state routing protocol. How does a link-state routing protocol differ from a distance-vector protocol like RIP?",
   "choices":["Link-state routers share their full routing table with neighbors periodically","Distance-vector protocols use SPF (Dijkstra) to calculate best paths","Link-state routers build a complete map of the network topology and run SPF to calculate best paths","Distance-vector protocols exchange LSAs to maintain a topological database"],"correctAnswer":2},

  # 410 D1 correctAnswer:0
  {"id":"netplus-410","domain":"Networking Concepts","type":"single-choice",
   "question":"RIP (Routing Information Protocol) is limited to small networks. What is the maximum hop count allowed by RIP before a route is considered unreachable?",
   "choices":["15","16","30","255"],"correctAnswer":0},

  # 411 D1 correctAnswer:1
  {"id":"netplus-411","domain":"Networking Concepts","type":"single-choice",
   "question":"In an OSPF multi-area deployment, all areas must connect to a central area that acts as the transit backbone. What is this backbone area called?",
   "choices":["Area 1","Area 0","Area 255","The stub area"],"correctAnswer":1},

  # 412 D1 correctAnswer:3
  {"id":"netplus-412","domain":"Networking Concepts","type":"single-choice",
   "question":"An administrator needs to isolate voice traffic from data traffic on the same physical switches without running separate cabling. Which technology achieves this logical separation at Layer 2?",
   "choices":["QoS DSCP marking","Subnetting","NAT","VLANs"],"correctAnswer":3},

  # 413 D2 correctAnswer:0
  {"id":"netplus-413","domain":"Network Implementation","type":"single-choice",
   "question":"A switch port is configured as a trunk to carry traffic for VLANs 10, 20, and 30 between switches. Which protocol adds a 4-byte tag to Ethernet frames to identify which VLAN a frame belongs to?",
   "choices":["IEEE 802.1Q","IEEE 802.1D","ISL (Inter-Switch Link)","IEEE 802.3ad"],"correctAnswer":0},

  # 414 D2 correctAnswer:2
  {"id":"netplus-414","domain":"Network Implementation","type":"single-choice",
   "question":"A security engineer notices that untagged frames arriving on an 802.1Q trunk link are being forwarded into a sensitive VLAN. Which trunk configuration item determines which VLAN receives untagged traffic?",
   "choices":["Access VLAN","Management VLAN","Native VLAN","Voice VLAN"],"correctAnswer":2},

  # 415 D2 correctAnswer:1
  {"id":"netplus-415","domain":"Network Implementation","type":"single-choice",
   "question":"During STP convergence, all switches participate in a root bridge election. How is the root bridge determined?",
   "choices":["The switch with the highest MAC address","The switch with the lowest Bridge ID (priority + MAC address)","The switch with the most ports","The switch configured as a Layer 3 switch"],"correctAnswer":1},

  # 416 D2 correctAnswer:3
  {"id":"netplus-416","domain":"Network Implementation","type":"single-choice",
   "question":"How many port states does classic IEEE 802.1D STP define?",
   "choices":["2","3","4","5"],"correctAnswer":3},

  # 417 D2 correctAnswer:0
  {"id":"netplus-417","domain":"Network Implementation","type":"single-choice",
   "question":"A network engineer replaces STP with RSTP (IEEE 802.1w) on all switches. What is the primary advantage of RSTP over classic STP?",
   "choices":["RSTP converges significantly faster (seconds vs. 30–50 seconds for STP)","RSTP eliminates the need for BPDUs","RSTP supports more than 4094 VLANs","RSTP uses a distributed algorithm instead of a root bridge"],"correctAnswer":0},

  # 418 D2 correctAnswer:2
  {"id":"netplus-418","domain":"Network Implementation","type":"single-choice",
   "question":"Four Gigabit Ethernet links between two core switches are combined using EtherChannel. What are the two primary benefits of EtherChannel?",
   "choices":["Eliminates the need for STP and provides 10 Gbps per link","Increases the MTU and reduces latency per frame","Increases aggregate bandwidth and provides link redundancy","Provides automatic failover to a backup switch path"],"correctAnswer":2},

  # 419 D2 correctAnswer:1
  {"id":"netplus-419","domain":"Network Implementation","type":"single-choice",
   "question":"LACP (IEEE 802.3ad) is configured on a switch to form an EtherChannel with a neighbor. Which LACP mode causes the port to actively send LACP PDUs to initiate negotiation?",
   "choices":["Passive","Active","On","Auto"],"correctAnswer":1},

  # 420 D2 correctAnswer:3
  {"id":"netplus-420","domain":"Network Implementation","type":"single-choice",
   "question":"An organization replaces their routers with Layer 3 switches to reduce inter-VLAN routing latency. What capability distinguishes a Layer 3 switch from a Layer 2 switch?",
   "choices":["Layer 3 switches support 802.1Q trunking","Layer 3 switches can perform PoE","Layer 3 switches eliminate STP from the network","Layer 3 switches can route IP traffic between VLANs using SVIs or routed ports"],"correctAnswer":3},

  # 421 D2 correctAnswer:0
  {"id":"netplus-421","domain":"Network Implementation","type":"single-choice",
   "question":"A network engineer assigns a loopback address to a router. Why is a loopback interface preferred over a physical interface for router ID assignment and management access?",
   "choices":["A loopback interface is always up regardless of physical link status","A loopback interface supports higher throughput than physical interfaces","A loopback interface provides PoE capability","A loopback interface operates at Layer 2"],"correctAnswer":0},

  # 422 D2 correctAnswer:2
  {"id":"netplus-422","domain":"Network Implementation","type":"single-choice",
   "question":"A single router port is divided into multiple logical subinterfaces, each with 802.1Q encapsulation for a different VLAN. What is this configuration called?",
   "choices":["EtherChannel","VLAN trunking protocol (VTP)","Router-on-a-stick","Inter-VLAN bridging"],"correctAnswer":2},

  # 423 D3 correctAnswer:1
  {"id":"netplus-423","domain":"Network Operations","type":"single-choice",
   "question":"An NTP hierarchy is used to synchronize clocks across a network. What is an NTP Stratum 0 device?",
   "choices":["A router that receives time from an ISP","A highly accurate reference clock such as a GPS or atomic clock","A switch that distributes time to end devices","A client that syncs from a Stratum 1 server"],"correctAnswer":1},

  # 424 D3 correctAnswer:3
  {"id":"netplus-424","domain":"Network Operations","type":"single-choice",
   "question":"NTP servers are organized in a stratum hierarchy. Which stratum level describes a server that is directly connected to a Stratum 0 time source?",
   "choices":["Stratum 0","Stratum 3","Stratum 2","Stratum 1"],"correctAnswer":3},

  # 425 D3 correctAnswer:0
  {"id":"netplus-425","domain":"Network Operations","type":"single-choice",
   "question":"A syslog message is received with a severity level of 3. According to the standard syslog severity scale, what does severity 3 indicate?",
   "choices":["Error","Warning","Critical","Notice"],"correctAnswer":0},

  # 426 D3 correctAnswer:2
  {"id":"netplus-426","domain":"Network Operations","type":"single-choice",
   "question":"An SNMP manager needs reliable delivery of alert notifications from a managed device, with confirmation that the notification was received. Which SNMP notification type satisfies this requirement?",
   "choices":["SNMP trap","SNMP get","SNMP inform","SNMP set"],"correctAnswer":2},

  # 427 D3 correctAnswer:1
  {"id":"netplus-427","domain":"Network Operations","type":"single-choice",
   "question":"NetFlow is configured on border routers. Which component receives the exported flow records and provides analysis, reporting, and storage?",
   "choices":["NetFlow exporter","NetFlow collector","Flow probe","RMON agent"],"correctAnswer":1},

  # 428 D3 correctAnswer:3
  {"id":"netplus-428","domain":"Network Operations","type":"single-choice",
   "question":"A network operations team is creating procedures that define who must be notified and in what order when an outage exceeds a defined threshold. What type of procedure is this?",
   "choices":["Change management procedure","Disaster recovery plan","Business continuity plan","Escalation procedure"],"correctAnswer":3},

  # 429 D3 correctAnswer:0
  {"id":"netplus-429","domain":"Network Operations","type":"single-choice",
   "question":"A network team schedules all non-emergency changes to occur between 2:00 AM and 4:00 AM on weekends. What is the primary purpose of this practice?",
   "choices":["To minimize business disruption during periods of low network usage","To avoid NTP synchronization issues during business hours","To allow new firmware to download without impacting QoS","To comply with change management audit schedules"],"correctAnswer":0},

  # 430 D3 correctAnswer:2
  {"id":"netplus-430","domain":"Network Operations","type":"single-choice",
   "question":"An auditor asks the network team for a complete list of all switches, routers, firewalls, and their software versions. Which IT management practice produces and maintains this information?",
   "choices":["Baselining","Capacity planning","Asset management","Change management"],"correctAnswer":2},

  # 431 D4 correctAnswer:1
  {"id":"netplus-431","domain":"Network Security","type":"single-choice",
   "question":"An organization places its web servers, email gateway, and public DNS servers in a network segment that is accessible from the internet but isolated from the internal corporate LAN. What is this network segment called?",
   "choices":["Internal trust zone","DMZ (Demilitarized Zone)","Management VLAN","Guest network"],"correctAnswer":1},

  # 432 D4 correctAnswer:3
  {"id":"netplus-432","domain":"Network Security","type":"single-choice",
   "question":"A firewall administrator adds specific permit rules to an ACL. A packet that does not match any rule reaches the end of the ACL. What happens by default?",
   "choices":["The packet is forwarded to the next hop","The packet is sent to the SIEM for analysis","The packet is queued for manual review","The packet is dropped by the implicit deny-all rule"],"correctAnswer":3},

  # 433 D4 correctAnswer:0
  {"id":"netplus-433","domain":"Network Security","type":"single-choice",
   "question":"A security team deploys a system on the network that appears to be a vulnerable server but actually monitors and logs any interaction with it. What is this system called?",
   "choices":["Honeypot","SIEM","IPS","Vulnerability scanner"],"correctAnswer":0},

  # 434 D4 correctAnswer:2
  {"id":"netplus-434","domain":"Network Security","type":"single-choice",
   "question":"A healthcare company needs to prevent employees from emailing patient records or uploading them to personal cloud storage. Which security technology monitors and blocks unauthorized data transfers?",
   "choices":["IDS","Firewall","DLP (Data Loss Prevention)","SIEM"],"correctAnswer":2},

  # 435 D4 correctAnswer:1
  {"id":"netplus-435","domain":"Network Security","type":"single-choice",
   "question":"Employees receive emails that appear to come from their company's IT department, asking them to click a link and enter their credentials to 'verify their account.' What type of attack is this?",
   "choices":["Vishing","Phishing","Smishing","Whaling"],"correctAnswer":1},

  # 436 D4 correctAnswer:3
  {"id":"netplus-436","domain":"Network Security","type":"single-choice",
   "question":"A database administrator with legitimate access to customer data copies thousands of records to a personal USB drive and removes them from the building. Which threat category does this represent?",
   "choices":["External attacker","APT (Advanced Persistent Threat)","Zero-day exploit","Insider threat"],"correctAnswer":3},

  # 437 D4 correctAnswer:0
  {"id":"netplus-437","domain":"Network Security","type":"single-choice",
   "question":"An organization conducts a formal review to determine whether network configurations, access controls, and security procedures comply with policy and regulatory requirements. What type of assessment is this?",
   "choices":["Security audit","Penetration test","Vulnerability scan","Risk assessment"],"correctAnswer":0},

  # 438 D5 correctAnswer:2
  {"id":"netplus-438","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician wants to continuously ping a remote host to monitor for intermittent packet loss over an extended period. Which ping option (on Windows) sends continuous pings without stopping?",
   "choices":["ping -n 1000","ping -l 65500","ping -t","ping -a"],"correctAnswer":2},

  # 439 D5 correctAnswer:1
  {"id":"netplus-439","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician needs to identify where in the network path packets are being delayed or dropped between a workstation and a remote server. Which command reveals each hop along the route and its latency?",
   "choices":["nslookup","tracert / traceroute","netstat","arp -a"],"correctAnswer":1},

  # 440 D5 correctAnswer:3
  {"id":"netplus-440","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician suspects a service is not listening on the expected port after a restart. Which command shows currently active TCP/UDP connections and listening ports on a local machine?",
   "choices":["ipconfig /all","arp -a","tracert","netstat -an"],"correctAnswer":3},

  # ── MR 441-443 ──────────────────────────────────────────────────────────────

  # 441 D1 correctAnswers:[0,2]
  {"id":"netplus-441","domain":"Networking Concepts","type":"multiple-response",
   "question":"Which TWO statements correctly describe OSPF as a routing protocol? (Select 2)",
   "choices":["OSPF uses Dijkstra's SPF algorithm to calculate loop-free shortest paths","OSPF has a maximum hop count of 15, limiting it to small networks","OSPF organizes routers into areas to limit LSA flooding","OSPF is a distance-vector protocol that uses hop count as its metric"],"correctAnswers":[0,2]},

  # 442 D2 correctAnswers:[1,3]
  {"id":"netplus-442","domain":"Network Implementation","type":"multiple-response",
   "question":"Which TWO benefits does VLAN implementation provide on a switched network? (Select 2)",
   "choices":["Eliminates the need for routing between network segments","Reduces the size of broadcast domains, limiting unnecessary traffic","Automatically encrypts traffic between VLAN members","Provides logical segmentation that improves security between groups"],"correctAnswers":[1,3]},

  # 443 D5 correctAnswers:[0,3]
  {"id":"netplus-443","domain":"Network Troubleshooting","type":"multiple-response",
   "question":"A Windows network technician is troubleshooting connectivity from a workstation to a remote server. Which TWO built-in Windows commands are most directly useful for path analysis and port/connection verification? (Select 2)",
   "choices":["tracert","nslookup","ipconfig","netstat"],"correctAnswers":[0,3]},

  # ── Matching 444-445 ──────────────────────────────────────────────────────

  # 444 D2 correctMatches:[1,2,3,0]
  {"id":"netplus-444","domain":"Network Implementation","type":"matching",
   "question":"Match each STP port state to its correct description.",
   "itemsLeft":["Blocking","Listening","Learning","Forwarding"],
   "itemsRight":["Actively forwards user frames and populates MAC table","Discards user frames; receives BPDUs only to prevent loops","Receives and sends BPDUs; no MAC learning; no forwarding","Populates MAC address table but does not forward user frames"],
   "correctMatches":[1,2,3,0]},

  # 445 D3 correctMatches:[2,1,0,3]
  {"id":"netplus-445","domain":"Network Operations","type":"matching",
   "question":"Match each network monitoring technology to its primary function.",
   "itemsLeft":["NetFlow","SNMP","Syslog","RMON"],
   "itemsRight":["Device-generated event and error message collection","Device metric polling via OIDs and MIBs","IP traffic flow export and analysis","Remote traffic statistics via embedded hardware agents"],
   "correctMatches":[2,1,0,3]},

  # ── Ordering 446-447 ──────────────────────────────────────────────────────

  # 446 D5 correctOrder:[1,3,2,0,4]
  {"id":"netplus-446","domain":"Network Troubleshooting","type":"ordering",
   "question":"Arrange the CompTIA Network+ troubleshooting methodology steps in the correct order.",
   "items":["Implement the solution or escalate",
            "Identify the problem",
            "Test the theory to determine the cause",
            "Establish a theory of probable cause",
            "Verify full system functionality and document findings"],
   "correctOrder":[1,3,2,0,4]},

  # 447 D4 correctOrder:[1,0,2,3,4]
  {"id":"netplus-447","domain":"Network Security","type":"ordering",
   "question":"Arrange the following security incident response phases in the correct order (NIST/PICERL framework).",
   "items":["Containment — isolate affected systems to prevent further spread",
            "Identification — detect and confirm that a security incident has occurred",
            "Eradication — remove the root cause and any malicious artifacts",
            "Recovery — restore systems and verify normal operations",
            "Lessons learned — document findings and improve defenses"],
   "correctOrder":[1,0,2,3,4]},

  # ── SB 448-450 ────────────────────────────────────────────────────────────

  # 448 D1 correctAnswers:[True,False,True,True]
  {"id":"netplus-448","domain":"Networking Concepts","type":"statement-block",
   "question":"Evaluate each statement about routing protocols and indicate whether it is True or False.",
   "statements":["OSPF is a link-state protocol that uses Dijkstra's shortest path first algorithm.",
                 "RIP supports a maximum of 30 hops, making it suitable for large enterprise networks.",
                 "BGP is the exterior gateway protocol used to exchange routing information between autonomous systems on the internet.",
                 "EIGRP is often described as a hybrid routing protocol because it combines characteristics of both distance-vector and link-state protocols."],
   "correctAnswers":[True,False,True,True]},

  # 449 D2 correctAnswers:[True,True,False,True]
  {"id":"netplus-449","domain":"Network Implementation","type":"statement-block",
   "question":"Evaluate each statement about VLANs and 802.1Q trunking and indicate whether it is True or False.",
   "statements":["VLANs logically segment a switched network at Layer 2, reducing broadcast domain size.",
                 "IEEE 802.1Q inserts a 4-byte tag into the Ethernet frame header to identify VLAN membership.",
                 "The native VLAN on an 802.1Q trunk is permanently fixed to VLAN 1 and cannot be changed.",
                 "Frames belonging to the native VLAN are transmitted untagged across an 802.1Q trunk link."],
   "correctAnswers":[True,True,False,True]},

  # 450 D4 correctAnswers:[True,False,True,False]
  {"id":"netplus-450","domain":"Network Security","type":"statement-block",
   "question":"Evaluate each statement about DMZ design and network security and indicate whether it is True or False.",
   "statements":["A DMZ is a network segment between an untrusted external network and the trusted internal LAN.",
                 "Servers placed in a DMZ should have unrestricted access to internal LAN resources for seamless operation.",
                 "Web servers, email gateways, and public DNS servers are commonly placed in a DMZ.",
                 "A single firewall with only two interfaces (one external, one internal) is sufficient to create a true three-zone DMZ."],
   "correctAnswers":[True,False,True,False]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
