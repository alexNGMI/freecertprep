import json, pathlib

Q = pathlib.Path("src/data/comptia-net-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 301-340 ──────────────────────────────────────────────────────────────

  # 301 D1 correctAnswer:2
  {"id":"netplus-301","domain":"Networking Concepts","type":"single-choice",
   "question":"Which DNS record type is used to resolve an IP address back to a hostname (reverse DNS lookup)?",
   "choices":["CNAME","MX","PTR","AAAA"],"correctAnswer":2},

  # 302 D1 correctAnswer:0
  {"id":"netplus-302","domain":"Networking Concepts","type":"single-choice",
   "question":"A mail administrator needs to specify which servers are responsible for accepting email for a domain. Which DNS record type should be configured?",
   "choices":["MX","CNAME","SOA","PTR"],"correctAnswer":0},

  # 303 D1 correctAnswer:1
  {"id":"netplus-303","domain":"Networking Concepts","type":"single-choice",
   "question":"A host record that maps a hostname to an IPv6 address is represented by which DNS record type?",
   "choices":["A","AAAA","CNAME","PTR"],"correctAnswer":1},

  # 304 D1 correctAnswer:3
  {"id":"netplus-304","domain":"Networking Concepts","type":"single-choice",
   "question":"Which DNS record contains the authoritative information about a zone, including the primary name server and the zone serial number?",
   "choices":["NS","MX","CNAME","SOA"],"correctAnswer":3},

  # 305 D1 correctAnswer:2
  {"id":"netplus-305","domain":"Networking Concepts","type":"single-choice",
   "question":"A DHCP administrator wants to automatically push a vendor-specific configuration string to IP phones during lease assignment. Which DHCP option is commonly used for this?",
   "choices":["Option 3","Option 6","Option 43","Option 82"],"correctAnswer":2},

  # 306 D1 correctAnswer:0
  {"id":"netplus-306","domain":"Networking Concepts","type":"single-choice",
   "question":"Which DHCP option carries relay agent information, allowing a DHCP server to identify the circuit and remote ID from which a request originated?",
   "choices":["Option 82","Option 43","Option 15","Option 3"],"correctAnswer":0},

  # 307 D1 correctAnswer:1
  {"id":"netplus-307","domain":"Networking Concepts","type":"single-choice",
   "question":"A network administrator divides the 192.168.10.0/24 network into /25 subnets. How many usable host addresses are available per subnet?",
   "choices":["64","126","254","62"],"correctAnswer":1},

  # 308 D1 correctAnswer:3
  {"id":"netplus-308","domain":"Networking Concepts","type":"single-choice",
   "question":"Which well-known TCP port does SMTP use for transferring email between mail servers?",
   "choices":["110","143","465","25"],"correctAnswer":3},

  # 309 D1 correctAnswer:2
  {"id":"netplus-309","domain":"Networking Concepts","type":"single-choice",
   "question":"An ICMP message with Type 0 is sent in response to a ping request. What does ICMP Type 0 represent?",
   "choices":["Echo Request","Time Exceeded","Echo Reply","Destination Unreachable"],"correctAnswer":2},

  # 310 D1 correctAnswer:0
  {"id":"netplus-310","domain":"Networking Concepts","type":"single-choice",
   "question":"Which characteristic differentiates TCP from UDP?",
   "choices":["TCP establishes a connection using a three-way handshake before data transfer","UDP guarantees packet delivery","TCP has lower overhead than UDP","UDP uses sequence numbers to reorder packets"],"correctAnswer":0},

  # 311 D1 correctAnswer:1
  {"id":"netplus-311","domain":"Networking Concepts","type":"single-choice",
   "question":"Which IPv4 address range is reserved for multicast traffic?",
   "choices":["192.168.0.0/16","224.0.0.0/4","169.254.0.0/16","240.0.0.0/4"],"correctAnswer":1},

  # 312 D1 correctAnswer:3
  {"id":"netplus-312","domain":"Networking Concepts","type":"single-choice",
   "question":"In BGP, which attribute lists the sequence of autonomous systems a route has traversed and is used to prevent routing loops?",
   "choices":["Local Preference","Weight","MED","AS-Path"],"correctAnswer":3},

  # 313 D2 correctAnswer:0
  {"id":"netplus-313","domain":"Network Implementation","type":"single-choice",
   "question":"A technician is deploying VoIP phones using IEEE 802.3af Power over Ethernet. What is the maximum wattage that 802.3af can deliver per port?",
   "choices":["15.4 W","30 W","60 W","100 W"],"correctAnswer":0},

  # 314 D2 correctAnswer:2
  {"id":"netplus-314","domain":"Network Implementation","type":"single-choice",
   "question":"A network engineer needs to power PTZ security cameras that require up to 25 W each. Which PoE standard is the minimum required to support these cameras?",
   "choices":["802.3af","802.3bt Type 3","802.3at","802.3bt Type 4"],"correctAnswer":2},

  # 315 D2 correctAnswer:1
  {"id":"netplus-315","domain":"Network Implementation","type":"single-choice",
   "question":"A campus network requires fiber links spanning 10 km between buildings. Which fiber type is most appropriate for this distance?",
   "choices":["Multimode OM4","Single-mode OS2","Multimode OM3","Multimode OM1"],"correctAnswer":1},

  # 316 D2 correctAnswer:3
  {"id":"netplus-316","domain":"Network Implementation","type":"single-choice",
   "question":"A 10GbE transceiver labeled 10GBASE-SR is installed in a switch. What does SR indicate about this transceiver?",
   "choices":["Single-mode, long reach","Single-mode, short reach","Multimode, long reach","Multimode, short reach"],"correctAnswer":3},

  # 317 D2 correctAnswer:0
  {"id":"netplus-317","domain":"Network Implementation","type":"single-choice",
   "question":"An engineer needs to connect multiple 40 Gbps uplinks between core switches. Which transceiver form factor supports 40 Gbps and above?",
   "choices":["QSFP+","SFP","SFP+","XFP"],"correctAnswer":0},

  # 318 D2 correctAnswer:2
  {"id":"netplus-318","domain":"Network Implementation","type":"single-choice",
   "question":"A security team wants to capture all traffic traversing a core switch interface and forward copies to an IDS appliance without interrupting normal traffic flow. Which switch feature accomplishes this?",
   "choices":["Port security","Broadcast storm control","Port mirroring (SPAN)","DHCP snooping"],"correctAnswer":2},

  # 319 D2 correctAnswer:1
  {"id":"netplus-319","domain":"Network Implementation","type":"single-choice",
   "question":"In a structured cabling installation, what is the primary purpose of a patch panel?",
   "choices":["To amplify signals over long cable runs","To provide an organized termination point for horizontal cabling","To convert fiber signals to copper","To supply PoE power to endpoints"],"correctAnswer":1},

  # 320 D2 correctAnswer:3
  {"id":"netplus-320","domain":"Network Implementation","type":"single-choice",
   "question":"A network technician is terminating Cat6 cabling to a punch-down block. Which block type is recommended for modern data networks as opposed to legacy telephone installations?",
   "choices":["66 block","BIX block","Krone block","110 block"],"correctAnswer":3},

  # 321 D2 correctAnswer:0
  {"id":"netplus-321","domain":"Network Implementation","type":"single-choice",
   "question":"What is the height in inches of 1U (one rack unit) in a standard EIA 19-inch equipment rack?",
   "choices":["1.75 inches","1.5 inches","2.0 inches","3.5 inches"],"correctAnswer":0},

  # 322 D2 correctAnswer:2
  {"id":"netplus-322","domain":"Network Implementation","type":"single-choice",
   "question":"A technician notices a switch port is operating at full-duplex while the connected workstation NIC has autonegotiation disabled and defaults to half-duplex. What is the most likely symptom?",
   "choices":["The link LED will not illuminate","The port will be disabled by STP","Excessive late collisions and reduced throughput","The port will be placed in err-disabled state"],"correctAnswer":2},

  # 323 D3 correctAnswer:1
  {"id":"netplus-323","domain":"Network Operations","type":"single-choice",
   "question":"In syslog, which severity level (0–7) indicates an Emergency — a condition that makes the system unusable?",
   "choices":["7","0","1","3"],"correctAnswer":1},

  # 324 D3 correctAnswer:3
  {"id":"netplus-324","domain":"Network Operations","type":"single-choice",
   "question":"A network operations team wants to analyze traffic flows to understand bandwidth consumption by application and source IP. Which technology exports flow records from routers and switches for this analysis?",
   "choices":["SNMP traps","Syslog","RMON","NetFlow"],"correctAnswer":3},

  # 325 D3 correctAnswer:0
  {"id":"netplus-325","domain":"Network Operations","type":"single-choice",
   "question":"Which IETF-standardized protocol is considered the vendor-neutral successor to Cisco NetFlow for exporting IP flow information?",
   "choices":["IPFIX","sFlow","RMON","NetStream"],"correctAnswer":0},

  # 326 D3 correctAnswer:2
  {"id":"netplus-326","domain":"Network Operations","type":"single-choice",
   "question":"A service desk manager tracks how quickly the network team restores service after an outage. Which availability metric measures the average time required to restore a failed component?",
   "choices":["MTBF","RPO","RTO","MTTR"],"correctAnswer":2},

  # 327 D3 correctAnswer:1
  {"id":"netplus-327","domain":"Network Operations","type":"single-choice",
   "question":"Which metric represents the average elapsed time between repairable system failures, indicating the expected operational life between outages?",
   "choices":["MTTR","MTBF","RTO","RPO"],"correctAnswer":1},

  # 328 D3 correctAnswer:3
  {"id":"netplus-328","domain":"Network Operations","type":"single-choice",
   "question":"Before deploying a new network monitoring tool, an engineer captures traffic statistics during a normal business day to establish a reference. What is this process called?",
   "choices":["Capacity planning","Trending analysis","Protocol analysis","Baselining"],"correctAnswer":3},

  # 329 D3 correctAnswer:0
  {"id":"netplus-329","domain":"Network Operations","type":"single-choice",
   "question":"In a formal ITIL-aligned change management process, which body reviews and approves or rejects proposed changes before implementation?",
   "choices":["Change Advisory Board (CAB)","Network Operations Center (NOC)","Security Operations Center (SOC)","Help Desk"],"correctAnswer":0},

  # 330 D3 correctAnswer:2
  {"id":"netplus-330","domain":"Network Operations","type":"single-choice",
   "question":"An organization maintains a database that stores information about all hardware assets, software, relationships, and configurations in their network. What is this repository called?",
   "choices":["Asset register","Service catalog","CMDB","Knowledge base"],"correctAnswer":2},

  # 331 D3 correctAnswer:1
  {"id":"netplus-331","domain":"Network Operations","type":"single-choice",
   "question":"Which version of SNMP added support for both authentication (MD5/SHA) and encryption (DES/AES) of SNMP messages, addressing the security weaknesses of earlier versions?",
   "choices":["SNMPv1","SNMPv3","SNMPv2c","SNMPv2"],"correctAnswer":1},

  # 332 D4 correctAnswer:3
  {"id":"netplus-332","domain":"Network Security","type":"single-choice",
   "question":"In the 802.1X framework, which device is responsible for controlling physical access to the network, forwarding credentials from the supplicant to the authentication server?",
   "choices":["Supplicant","RADIUS server","TACACS+ server","Authenticator"],"correctAnswer":3},

  # 333 D4 correctAnswer:0
  {"id":"netplus-333","domain":"Network Security","type":"single-choice",
   "question":"A security engineer is comparing RADIUS and TACACS+. Which statement correctly differentiates TACACS+ from RADIUS?",
   "choices":["TACACS+ encrypts the entire packet payload; RADIUS encrypts only the password","TACACS+ uses UDP; RADIUS uses TCP","RADIUS provides command authorization; TACACS+ does not","RADIUS separates authentication, authorization, and accounting; TACACS+ combines them"],"correctAnswer":0},

  # 334 D4 correctAnswer:2
  {"id":"netplus-334","domain":"Network Security","type":"single-choice",
   "question":"Which EAP method requires both the client and the server to present digital certificates, providing mutual authentication?",
   "choices":["EAP-MD5","PEAP","EAP-TLS","LEAP"],"correctAnswer":2},

  # 335 D4 correctAnswer:1
  {"id":"netplus-335","domain":"Network Security","type":"single-choice",
   "question":"A security administrator has implemented MAC address filtering on all wireless access points. Which attack technique can bypass this control?",
   "choices":["Evil twin attack","MAC spoofing","Deauthentication flood","Brute-force of PSK"],"correctAnswer":1},

  # 336 D4 correctAnswer:3
  {"id":"netplus-336","domain":"Network Security","type":"single-choice",
   "question":"An organization requires that devices be verified for up-to-date antivirus and OS patches before being granted LAN access. Which technology enforces this endpoint posture check?",
   "choices":["SIEM","SASE","IPS","NAC"],"correctAnswer":3},

  # 337 D4 correctAnswer:0
  {"id":"netplus-337","domain":"Network Security","type":"single-choice",
   "question":"In a PKI environment, what is the primary role of a digital certificate issued to a web server?",
   "choices":["To bind the server's public key to its identity and enable encrypted TLS sessions","To store the server's private key in a trusted repository","To act as a firewall rule authorizing HTTPS traffic","To replace username/password authentication for all users"],"correctAnswer":0},

  # 338 D5 correctAnswer:2
  {"id":"netplus-338","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician observes a high rate of late collisions on a switch port connected to a workstation. Assuming proper cable quality, what is the most likely cause?",
   "choices":["CRC errors from a damaged cable","Broadcast storm on the VLAN","Duplex mismatch between the switch and workstation","Spanning tree port in blocking state"],"correctAnswer":2},

  # 339 D5 correctAnswer:1
  {"id":"netplus-339","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician suspects a break in a copper cable run inside a wall. Which tool can determine the exact distance to the fault?",
   "choices":["Multimeter","TDR (Time Domain Reflectometer)","Tone generator","OTDR"],"correctAnswer":1},

  # 340 D5 correctAnswer:3
  {"id":"netplus-340","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A field technician needs to identify a break in a single-mode fiber run spanning 8 km. Which tool is most appropriate for locating the fault and measuring splice loss at that distance?",
   "choices":["TDR","Fiber light injector","Visual fault locator","OTDR"],"correctAnswer":3},

  # ── MR 341-343 ──────────────────────────────────────────────────────────────

  # 341 D1 correctAnswers:[0,2]
  {"id":"netplus-341","domain":"Networking Concepts","type":"multiple-response",
   "question":"Which TWO characteristics apply to UDP but NOT to TCP? (Select 2)",
   "choices":["No connection establishment required","Guaranteed delivery via acknowledgments","Lower protocol overhead","Flow control using sliding window"],"correctAnswers":[0,2]},

  # 342 D2 correctAnswers:[1,3]
  {"id":"netplus-342","domain":"Network Implementation","type":"multiple-response",
   "question":"A network engineer is justifying the use of fiber optic cabling instead of copper for a new backbone installation. Which TWO advantages of fiber optic cable support this decision? (Select 2)",
   "choices":["Easier field termination than copper","Supports longer transmission distances without repeaters","Lower cost per meter than Cat6A","Immune to electromagnetic interference (EMI)"],"correctAnswers":[1,3]},

  # 343 D4 correctAnswers:[0,2]
  {"id":"netplus-343","domain":"Network Security","type":"multiple-response",
   "question":"A network security architect is comparing TACACS+ to RADIUS for device administration. Which TWO statements are true of TACACS+? (Select 2)",
   "choices":["Encrypts the entire packet body","Uses UDP port 1812 for authentication","Uses TCP port 49","Combines authentication and authorization into one step"],"correctAnswers":[0,2]},

  # ── Matching 344-345 ──────────────────────────────────────────────────────

  # 344 D1 correctMatches:[3,2,0,1]
  {"id":"netplus-344","domain":"Networking Concepts","type":"matching",
   "question":"Match each DNS record type with its primary function.",
   "itemsLeft":["A record","MX record","PTR record","CNAME record"],
   "itemsRight":["Maps hostname to reverse lookup","Maps name to an alias (canonical name)","Routes email to the correct mail server","Maps hostname to an IPv4 address"],
   "correctMatches":[3,2,0,1]},

  # 345 D5 correctMatches:[2,0,1,3]
  {"id":"netplus-345","domain":"Network Troubleshooting","type":"matching",
   "question":"Match each copper cable fault type with its characteristic symptom.",
   "itemsLeft":["Split pair","Open circuit","Short circuit","Crossed pair"],
   "itemsRight":["No continuity detected on one or more conductors","Conductors from two different pairs wired to incorrect pins","Current leaking between two conductors","Transmit and receive pairs are reversed"],"correctMatches":[1,0,2,3]},

  # ── Ordering 346-347 ──────────────────────────────────────────────────────

  # 346 D3 correctOrder:[0,2,1,3,4]
  {"id":"netplus-346","domain":"Network Operations","type":"ordering",
   "question":"Arrange the following steps in the correct order for a formal change management process.",
   "items":["Submit a change request with scope and risk assessment",
            "Obtain approval from the Change Advisory Board",
            "Test the change in a lab or staging environment",
            "Implement the approved change during the maintenance window",
            "Document the results and update configuration records"],
   "correctOrder":[0,2,1,3,4]},

  # 347 D5 correctOrder:[1,2,0,3,4]
  {"id":"netplus-347","domain":"Network Troubleshooting","type":"ordering",
   "question":"A technician is performing bottom-up OSI model troubleshooting. Arrange the layers in the order they should be checked, starting from the lowest layer.",
   "items":["Network Layer (Layer 3)",
            "Physical Layer (Layer 1)",
            "Data Link Layer (Layer 2)",
            "Transport Layer (Layer 4)",
            "Application Layer (Layer 7)"],
   "correctOrder":[1,2,0,3,4]},

  # ── SB 348-350 ────────────────────────────────────────────────────────────

  # 348 D1 correctAnswers:[True,False,True,True]
  {"id":"netplus-348","domain":"Networking Concepts","type":"statement-block",
   "question":"Evaluate each statement about DNS and indicate whether it is True or False.",
   "statements":["A CNAME record can point to another CNAME record (CNAME chaining).",
                 "An MX record must always contain the direct IP address of the mail server.",
                 "TTL values in DNS responses control how long resolvers cache the record.",
                 "A domain can have multiple MX records, each with a different priority value."],
   "correctAnswers":[True,False,True,True]},

  # 349 D2 correctAnswers:[True,False,True,True]
  {"id":"netplus-349","domain":"Network Implementation","type":"statement-block",
   "question":"Evaluate each statement about Power over Ethernet (PoE) standards and indicate whether it is True or False.",
   "statements":["IEEE 802.3af delivers a maximum of 15.4 W per port at the power sourcing equipment.",
                 "IEEE 802.3at (PoE+) can deliver up to 60 W per port.",
                 "PoE can supply power to IP cameras over standard Cat5e or Cat6 cabling.",
                 "A PoE injector allows a non-PoE switch port to power PoE-capable devices."],
   "correctAnswers":[True,False,True,True]},

  # 350 D4 correctAnswers:[True,False,True,True]
  {"id":"netplus-350","domain":"Network Security","type":"statement-block",
   "question":"Evaluate each statement about IEEE 802.1X port-based authentication and indicate whether it is True or False.",
   "statements":["The supplicant is the end device (e.g., laptop or IP phone) requesting network access.",
                 "In 802.1X, the authentication server is typically the network switch or wireless AP.",
                 "EAP (Extensible Authentication Protocol) is used to carry credentials between the supplicant and the authenticator.",
                 "Without 802.1X enforcement, any device physically connected to a switch port may gain network access."],
   "correctAnswers":[True,False,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
