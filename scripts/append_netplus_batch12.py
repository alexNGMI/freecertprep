import json, pathlib

Q = pathlib.Path("src/data/comptia-net-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 551-590 ──────────────────────────────────────────────────────────────

  # 551 D1 correctAnswer:2
  {"id":"netplus-551","domain":"Networking Concepts","type":"single-choice",
   "question":"A network uses the 10.10.10.0/24 subnet. How many usable host IP addresses are available in this subnet?",
   "choices":["256","252","254","255"],"correctAnswer":2},

  # 552 D1 correctAnswer:0
  {"id":"netplus-552","domain":"Networking Concepts","type":"single-choice",
   "question":"An engineer needs to verify whether an IP address is publicly routable. Which statement correctly defines a public IP address?",
   "choices":["Any IP address not within the RFC 1918 private ranges (10.x.x.x, 172.16-31.x.x, 192.168.x.x)","Any IP address assigned by IANA","Any IP address in the 1.0.0.0/8 range","Any IP address assigned by a DHCP server"],"correctAnswer":0},

  # 553 D1 correctAnswer:1
  {"id":"netplus-553","domain":"Networking Concepts","type":"single-choice",
   "question":"A Class C IPv4 network uses a default subnet mask. What is the default CIDR prefix length for a Class C network?",
   "choices":["/16","/24","/8","/32"],"correctAnswer":1},

  # 554 D1 correctAnswer:3
  {"id":"netplus-554","domain":"Networking Concepts","type":"single-choice",
   "question":"A branch office is assigned the network 192.168.1.0/28. How many usable host addresses are available in this subnet?",
   "choices":["30","16","32","14"],"correctAnswer":3},

  # 555 D1 correctAnswer:2
  {"id":"netplus-555","domain":"Networking Concepts","type":"single-choice",
   "question":"In FTP active mode, the client sends a PORT command. How does the server initiate the data connection?",
   "choices":["The client opens a data channel from port 21 to the server","The server sends data to the client on port 21","The server initiates a connection from port 20 back to the client's specified port","The client opens two separate connections to port 20 and port 21"],"correctAnswer":2},

  # 556 D1 correctAnswer:0
  {"id":"netplus-556","domain":"Networking Concepts","type":"single-choice",
   "question":"FTP passive mode is preferred when clients are behind NAT firewalls. Why does passive mode solve this problem?",
   "choices":["In passive mode, the client makes both the control and data connections to the server, avoiding inbound connections through NAT","In passive mode, the server connects to the client without using port 20","In passive mode, FTP uses a single connection instead of separate control and data channels","In passive mode, FTP runs over UDP instead of TCP"],"correctAnswer":0},

  # 557 D1 correctAnswer:1
  {"id":"netplus-557","domain":"Networking Concepts","type":"single-choice",
   "question":"A network device needs to download a firmware update using a simple, connectionless file transfer protocol that requires minimal resources. Which protocol and port does TFTP use?",
   "choices":["TCP port 21","UDP port 69","TCP port 69","UDP port 21"],"correctAnswer":1},

  # 558 D1 correctAnswer:3
  {"id":"netplus-558","domain":"Networking Concepts","type":"single-choice",
   "question":"A security team requires all file transfers to use encryption. Two options are SFTP and FTPS. Which statement correctly distinguishes these protocols?",
   "choices":["SFTP runs FTP over TLS; FTPS uses SSH as its transport","SFTP and FTPS are identical protocols with different vendor names","SFTP uses port 990 and FTPS uses port 22","SFTP tunnels file transfer over SSH (port 22); FTPS adds TLS to FTP (ports 990/21/989)"],"correctAnswer":3},

  # 559 D1 correctAnswer:2
  {"id":"netplus-559","domain":"Networking Concepts","type":"single-choice",
   "question":"An email client is configured to download messages from a mail server and delete them from the server after download. Which protocol and port does this legacy email retrieval protocol use?",
   "choices":["IMAP on port 993","SMTP on port 25","POP3 on port 110","IMAP on port 143"],"correctAnswer":2},

  # 560 D1 correctAnswer:0
  {"id":"netplus-560","domain":"Networking Concepts","type":"single-choice",
   "question":"An email client is configured to synchronize messages with the server, keeping messages stored server-side and accessible from multiple devices. Which protocol provides this capability on port 143?",
   "choices":["IMAP","POP3","SMTP","MAPI"],"correctAnswer":0},

  # 561 D1 correctAnswer:1
  {"id":"netplus-561","domain":"Networking Concepts","type":"single-choice",
   "question":"A mail client needs to submit outgoing email to a mail server using an authenticated, encrypted connection. Which port is defined by RFC 6409 specifically for email message submission?",
   "choices":["25","587","465","993"],"correctAnswer":1},

  # 562 D1 correctAnswer:3
  {"id":"netplus-562","domain":"Networking Concepts","type":"single-choice",
   "question":"A web server must serve both HTTP and HTTPS. What is the primary security difference between HTTP and HTTPS?",
   "choices":["HTTP uses TCP; HTTPS uses UDP for faster performance","HTTP is faster; HTTPS adds authentication but not encryption","HTTP only works on port 80; HTTPS only works on port 8443","HTTPS uses TLS to encrypt data in transit; HTTP transmits data in cleartext"],"correctAnswer":3},

  # 563 D2 correctAnswer:0
  {"id":"netplus-563","domain":"Network Implementation","type":"single-choice",
   "question":"An office network uses a star physical topology with all workstations connected to a central switch. What is the primary advantage of this topology?",
   "choices":["A single cable or device failure is isolated and does not disrupt other devices","Uses less cabling than any other topology","Provides full redundancy without additional equipment","Performs better than mesh topology under heavy load"],"correctAnswer":0},

  # 564 D2 correctAnswer:2
  {"id":"netplus-564","domain":"Network Implementation","type":"single-choice",
   "question":"A legacy network uses a bus topology where all devices share a single coaxial cable. What is the primary disadvantage of a bus topology?",
   "choices":["It requires the most cabling of all topology types","It cannot support more than 10 devices","A break in the shared cable segment disrupts communication for all connected devices","It requires a dedicated switch for each network segment"],"correctAnswer":2},

  # 565 D2 correctAnswer:1
  {"id":"netplus-565","domain":"Network Implementation","type":"single-choice",
   "question":"A financial institution requires that every data center has redundant paths to every other data center so that no single link failure causes a loss of connectivity. Which topology provides this level of redundancy?",
   "choices":["Star topology","Full mesh topology","Ring topology","Bus topology"],"correctAnswer":1},

  # 566 D2 correctAnswer:3
  {"id":"netplus-566","domain":"Network Implementation","type":"single-choice",
   "question":"Token Ring networks historically used a topology where each device is connected to exactly two other devices, forming a continuous closed loop. Which network topology is this?",
   "choices":["Bus","Star","Full mesh","Ring"],"correctAnswer":3},

  # 567 D2 correctAnswer:0
  {"id":"netplus-567","domain":"Network Implementation","type":"single-choice",
   "question":"A WAN designer must connect six branch offices. A full mesh would require 15 dedicated links. To reduce cost while maintaining some redundancy, some links are removed. What is this reduced-redundancy design called?",
   "choices":["Partial mesh","Star topology","Hub and spoke","Ring topology"],"correctAnswer":0},

  # 568 D2 correctAnswer:2
  {"id":"netplus-568","domain":"Network Implementation","type":"single-choice",
   "question":"A building has a central equipment room that aggregates cabling from all floors and connects to the ISP. What is this central room called in structured cabling terminology?",
   "choices":["IDF","Satellite closet","MDF (Main Distribution Frame)","Demarcation point"],"correctAnswer":2},

  # 569 D2 correctAnswer:1
  {"id":"netplus-569","domain":"Network Implementation","type":"single-choice",
   "question":"ANSI/TIA-568 defines the maximum length for horizontal cabling runs from the patch panel in an IDF to a workstation outlet. What is this maximum distance?",
   "choices":["100 meters","90 meters","55 meters","150 meters"],"correctAnswer":1},

  # 570 D2 correctAnswer:3
  {"id":"netplus-570","domain":"Network Implementation","type":"single-choice",
   "question":"In a structured cabling system, which type of cabling connects the MDF to IDFs or connects IDFs on different floors, providing the network backbone?",
   "choices":["Horizontal cabling","Zone cabling","Work area cabling","Backbone (vertical) cabling"],"correctAnswer":3},

  # 571 D2 correctAnswer:0
  {"id":"netplus-571","domain":"Network Implementation","type":"single-choice",
   "question":"Which standards body publishes the ANSI/TIA-568 series, which defines the standards for structured cabling in commercial buildings?",
   "choices":["TIA (Telecommunications Industry Association)","IEEE","IETF","ISO/IEC"],"correctAnswer":0},

  # 572 D2 correctAnswer:2
  {"id":"netplus-572","domain":"Network Implementation","type":"single-choice",
   "question":"A technician arrives at a new job and cannot determine where ISP responsibility ends and customer equipment begins. Where is the demarcation point typically located?",
   "choices":["At the MDF patch panel","At the first router in the network","At the building entrance or the ISP-provided equipment","At the IDF serving the main office floor"],"correctAnswer":2},

  # 573 D3 correctAnswer:1
  {"id":"netplus-573","domain":"Network Operations","type":"single-choice",
   "question":"A customer's SLA guarantees 99.9% network uptime per year. Approximately how much total downtime is permitted under this SLA?",
   "choices":["52.6 minutes","8.76 hours","17.5 hours","1 hour"],"correctAnswer":1},

  # 574 D3 correctAnswer:3
  {"id":"netplus-574","domain":"Network Operations","type":"single-choice",
   "question":"A tier-1 ISP advertises five nines (99.999%) availability for its backbone service. Approximately how many minutes of downtime per year does this SLA allow?",
   "choices":["52.6 minutes","8.76 hours","1 hour","5.26 minutes"],"correctAnswer":3},

  # 575 D3 correctAnswer:0
  {"id":"netplus-575","domain":"Network Operations","type":"single-choice",
   "question":"A network team maintains two types of diagrams: one that shows IP address assignments, subnets, and routing domains, and another that shows physical equipment locations, cable paths, and rack positions. Which diagram type shows IP addressing and routing without physical cable detail?",
   "choices":["Logical diagram","Floor plan diagram","Physical diagram","Rack elevation diagram"],"correctAnswer":0},

  # 576 D3 correctAnswer:2
  {"id":"netplus-576","domain":"Network Operations","type":"single-choice",
   "question":"A new technician needs to trace cable runs throughout a building to understand the physical infrastructure. Which type of network documentation shows actual cable paths, wall outlets, and equipment room locations on a floor plan?",
   "choices":["Logical diagram","Rack diagram","Wiring/physical diagram","Network baseline report"],"correctAnswer":2},

  # 577 D3 correctAnswer:1
  {"id":"netplus-577","domain":"Network Operations","type":"single-choice",
   "question":"A data center manager needs documentation that shows exactly which equipment occupies which U positions in each cabinet, including server names, IP addresses, and power draw. Which diagram type provides this view?",
   "choices":["Logical diagram","Rack elevation diagram","Physical floor plan","Network topology map"],"correctAnswer":1},

  # 578 D3 correctAnswer:3
  {"id":"netplus-578","domain":"Network Operations","type":"single-choice",
   "question":"A network team creates detailed step-by-step instructions for common tasks such as adding a new VLAN, provisioning a user account, or replacing a failed switch. What type of document is this?",
   "choices":["Change request","Incident report","Risk assessment","Standard Operating Procedure (SOP)"],"correctAnswer":3},

  # 579 D3 correctAnswer:0
  {"id":"netplus-579","domain":"Network Operations","type":"single-choice",
   "question":"An organization tracks every configuration change made to routers, switches, and firewalls, comparing current configs against approved baselines to detect unauthorized changes. What IT management discipline is this?",
   "choices":["Configuration management","Capacity planning","Change management","Asset management"],"correctAnswer":0},

  # 580 D3 correctAnswer:2
  {"id":"netplus-580","domain":"Network Operations","type":"single-choice",
   "question":"A technician is preparing to configure a new firewall model for the first time. Before proceeding, which document should the technician consult to understand the hardware specifications, interface types, and supported feature set?",
   "choices":["Network logical diagram","Change management request","Vendor product data sheet","Standard Operating Procedure"],"correctAnswer":2},

  # 581 D4 correctAnswer:1
  {"id":"netplus-581","domain":"Network Security","type":"single-choice",
   "question":"A security team runs automated scans that identify open ports, missing patches, and misconfigured services on network hosts, producing a prioritized list of weaknesses without attempting to exploit them. What type of assessment is this?",
   "choices":["Penetration test","Vulnerability scan","Red team exercise","Security audit"],"correctAnswer":1},

  # 582 D4 correctAnswer:3
  {"id":"netplus-582","domain":"Network Security","type":"single-choice",
   "question":"A penetration tester is engaged to simulate an external attacker who has no inside knowledge of the target organization. The tester starts with only the company name and public IP ranges. Which testing approach is this?",
   "choices":["White box","Gray box","Crystal box","Black box"],"correctAnswer":3},

  # 583 D4 correctAnswer:0
  {"id":"netplus-583","domain":"Network Security","type":"single-choice",
   "question":"A security team conducts an internal penetration test where the testers are given full network diagrams, credentials, and source code. Which testing approach provides this level of visibility?",
   "choices":["White box","Black box","Gray box","Passive reconnaissance"],"correctAnswer":0},

  # 584 D4 correctAnswer:2
  {"id":"netplus-584","domain":"Network Security","type":"single-choice",
   "question":"A pen tester is given some information about the target environment — including subnet ranges and a standard user account — but not full architectural details. Which testing approach does this describe?",
   "choices":["Black box","White box","Gray box","Red team"],"correctAnswer":2},

  # 585 D4 correctAnswer:1
  {"id":"netplus-585","domain":"Network Security","type":"single-choice",
   "question":"In a firewall security zone model, the internet-facing zone containing untrusted traffic from external sources is typically called what?",
   "choices":["Trust zone","Untrust (outside) zone","DMZ","Management zone"],"correctAnswer":1},

  # 586 D4 correctAnswer:3
  {"id":"netplus-586","domain":"Network Security","type":"single-choice",
   "question":"A network administrator provides a contractor with access only to the specific VLANs and systems required for their project, nothing more. Which security principle is being applied?",
   "choices":["Defense in depth","Separation of duties","Need to know","Principle of least privilege"],"correctAnswer":3},

  # 587 D4 correctAnswer:0
  {"id":"netplus-587","domain":"Network Security","type":"single-choice",
   "question":"A security architect places the finance servers in a dedicated VLAN with strict ACLs, separate from the general office VLAN. If malware infects a general office workstation, the finance servers remain protected. Which security benefit does this describe?",
   "choices":["Limiting the blast radius of a security incident through network segmentation","Providing redundancy for critical servers","Enabling faster routing between segments","Simplifying firewall rule management"],"correctAnswer":0},

  # 588 D4 correctAnswer:2
  {"id":"netplus-588","domain":"Network Security","type":"single-choice",
   "question":"A company requires employees to authenticate using both a password and a hardware token that generates a time-based code. What type of authentication is this?",
   "choices":["Single-factor authentication","Certificate-based authentication","Multi-factor authentication (MFA)","Biometric authentication"],"correctAnswer":2},

  # 589 D5 correctAnswer:1
  {"id":"netplus-589","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician needs to verify the routes a Cisco router knows and confirm that the correct next-hop is being used for a specific destination. Which command displays the complete IP routing table?",
   "choices":["show ip interface brief","show ip route","show arp","show interfaces"],"correctAnswer":1},

  # 590 D5 correctAnswer:3
  {"id":"netplus-590","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A network engineer suspects a spanning tree loop is occurring on a specific VLAN. Which command on a Cisco switch shows the STP state (blocking, forwarding, etc.) for each port in a given VLAN?",
   "choices":["show vlan brief","show interfaces trunk","show mac address-table","show spanning-tree vlan"],"correctAnswer":3},

  # ── MR 591-593 ──────────────────────────────────────────────────────────────

  # 591 D2 correctAnswers:[0,2]
  {"id":"netplus-591","domain":"Network Implementation","type":"multiple-response",
   "question":"Which TWO statements correctly describe the advantages of a star physical topology compared to a bus topology? (Select 2)",
   "choices":["A failure of one device or its cable does not affect other devices on the network","A break anywhere in the shared cable segment disrupts the entire network","The failure of the central switch only affects devices connected to that switch","Each device is connected to exactly two neighbors"],"correctAnswers":[0,2]},

  # 592 D4 correctAnswers:[1,3]
  {"id":"netplus-592","domain":"Network Security","type":"multiple-response",
   "question":"Which TWO statements correctly differentiate a vulnerability scan from a penetration test? (Select 2)",
   "choices":["A vulnerability scan actively exploits identified weaknesses to demonstrate impact","A vulnerability scan identifies and reports potential weaknesses without exploiting them","A penetration test only uses automated tools and requires no manual effort","A penetration test actively attempts to exploit vulnerabilities to assess real-world impact"],"correctAnswers":[1,3]},

  # 593 D3 correctAnswers:[0,2]
  {"id":"netplus-593","domain":"Network Operations","type":"multiple-response",
   "question":"A network operations team maintains several types of documentation for their infrastructure. Which TWO documentation types are essential for both initial deployment planning and ongoing troubleshooting? (Select 2)",
   "choices":["Logical network diagram showing IP addressing, VLANs, and routing","Employee onboarding handbook","Physical network diagram showing cable paths and equipment locations","Monthly expense reports"],"correctAnswers":[0,2]},

  # ── Matching 594-595 ──────────────────────────────────────────────────────

  # 594 D1 correctMatches:[1,0,3,2]
  {"id":"netplus-594","domain":"Networking Concepts","type":"matching",
   "question":"Match each email protocol to its default unencrypted port number.",
   "itemsLeft":["SMTP","POP3","IMAP","Submission (SMTPS)"],
   "itemsRight":["110","25","587","143"],
   "correctMatches":[1,0,3,2]},

  # 595 D2 correctMatches:[2,1,3,0]
  {"id":"netplus-595","domain":"Network Implementation","type":"matching",
   "question":"Match each network physical topology to its defining characteristic.",
   "itemsLeft":["Bus","Star","Ring","Full mesh"],
   "itemsRight":["Every node has a dedicated connection to every other node","All devices connect to a central hub or switch","All devices share a single cable segment; a break disrupts all","Each device connects to exactly two neighbors in a closed loop"],
   "correctMatches":[2,1,3,0]},

  # ── Ordering 596-597 ──────────────────────────────────────────────────────

  # 596 D4 correctOrder:[1,3,0,4,2]
  {"id":"netplus-596","domain":"Network Security","type":"ordering",
   "question":"Arrange the phases of a penetration testing engagement in the correct sequential order.",
   "items":["Exploitation — actively exploit vulnerabilities to gain access",
            "Reconnaissance — gather information about the target",
            "Reporting — document findings, evidence, and remediation recommendations",
            "Scanning and enumeration — identify open ports, services, and vulnerabilities",
            "Post-exploitation and cleanup — assess impact and restore original state"],
   "correctOrder":[1,3,0,4,2]},

  # 597 D5 correctOrder:[4,1,3,0,2]
  {"id":"netplus-597","domain":"Network Troubleshooting","type":"ordering",
   "question":"A host cannot reach a remote subnet. Arrange the following troubleshooting steps in the most logical bottom-up order.",
   "items":["Check the routing table on the router for the destination subnet",
            "Verify the host's IP address, subnet mask, and default gateway are correct",
            "Verify Layer 1 and Layer 2 connectivity (cable, link LED, switch port)"],
   "correctOrder":[4,1,3,0,2]},

  # Hmm, that ordering only has 3 items but correctOrder references indices 0-4.
  # Let me fix this - I need 5 items:

  # ── SB 598-600 ────────────────────────────────────────────────────────────

  # 598 D3 correctAnswers:[True,False,True,False]
  {"id":"netplus-598","domain":"Network Operations","type":"statement-block",
   "question":"Evaluate each statement about SLAs and uptime metrics and indicate whether it is True or False.",
   "statements":["99.9% annual uptime allows approximately 8.76 hours of total downtime per year.",
                 "Five nines (99.999%) uptime permits approximately 1 hour of downtime per year.",
                 "An SLA (Service Level Agreement) typically defines metrics such as uptime, response time, and escalation procedures.",
                 "SLAs are informal guidelines that cannot be used as a basis for contractual penalties."],
   "correctAnswers":[True,False,True,False]},

  # 599 D2 correctAnswers:[True,True,False,True]
  {"id":"netplus-599","domain":"Network Implementation","type":"statement-block",
   "question":"Evaluate each statement about structured cabling standards and indicate whether it is True or False.",
   "statements":["The ANSI/TIA-568 standard defines requirements for structured cabling in commercial buildings.",
                 "Horizontal cabling runs from the IDF patch panel to the workstation outlet, with a maximum channel length of 100 meters (90m permanent link + 10m patch cables).",
                 "Backbone cabling refers to the cable run from a wall outlet to a workstation's NIC.",
                 "The demarcation point marks the boundary between the service provider's network and the customer's premises equipment."],
   "correctAnswers":[True,True,False,True]},

  # 600 D4 correctAnswers:[False,True,True,False]
  {"id":"netplus-600","domain":"Network Security","type":"statement-block",
   "question":"Evaluate each statement about multi-factor authentication (MFA) and indicate whether it is True or False.",
   "statements":["Multi-factor authentication is satisfied by providing two different passwords (two instances of 'something you know').",
                 "The three standard authentication factor categories are: something you know, something you have, and something you are.",
                 "A hardware OTP token is an example of the 'something you have' authentication factor.",
                 "MFA is less secure than single-factor authentication because each additional factor introduces an additional attack vector."],
   "correctAnswers":[False,True,True,False]},
]

# Fix question 597 ordering — needs exactly 5 items
for q in new_qs:
    if q["id"] == "netplus-597":
        q["items"] = [
            "Check the routing table on the router for the destination subnet",
            "Verify the host's IP address, subnet mask, and default gateway are correct",
            "Use traceroute from the host to identify where packets stop forwarding",
            "Ping from the router toward the destination subnet to test routing",
            "Verify Layer 1 and Layer 2 connectivity (link LED, switch port status)"
        ]
        q["correctOrder"] = [4,1,2,0,3]
        break

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
