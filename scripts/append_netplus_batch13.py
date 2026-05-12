import json, pathlib

Q = pathlib.Path("src/data/comptia-net-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 601-640 ──────────────────────────────────────────────────────────────

  # 601 D1 correctAnswer:2
  {"id":"netplus-601","domain":"Networking Concepts","type":"single-choice",
   "question":"A company hosts a public web server with a fixed public IP address that always maps to the same internal private IP. Which NAT type creates this permanent one-to-one mapping?",
   "choices":["PAT (Port Address Translation)","Dynamic NAT","Static NAT","NAT overload"],"correctAnswer":2},

  # 602 D1 correctAnswer:0
  {"id":"netplus-602","domain":"Networking Concepts","type":"single-choice",
   "question":"A company has a pool of 10 public IP addresses and 50 internal hosts. The firewall assigns a public IP from the pool to each internal host when they initiate a connection, releasing it when done. Which NAT type is this?",
   "choices":["Dynamic NAT","Static NAT","NAT overload","PAT"],"correctAnswer":0},

  # 603 D1 correctAnswer:1
  {"id":"netplus-603","domain":"Networking Concepts","type":"single-choice",
   "question":"An organization has only one public IP address but needs 500 internal hosts to access the internet simultaneously. Which NAT technique allows all hosts to share a single public IP by differentiating sessions using port numbers?",
   "choices":["Static NAT","PAT (Port Address Translation)","Dynamic NAT","1:1 NAT"],"correctAnswer":1},

  # 604 D1 correctAnswer:3
  {"id":"netplus-604","domain":"Networking Concepts","type":"single-choice",
   "question":"A firewall is configured for NAT where many internal hosts share a single public IP address with unique source port numbers tracking each session. This configuration is also referred to as what?",
   "choices":["Static NAT","Dynamic NAT","Proxy NAT","NAT overload"],"correctAnswer":3},

  # 605 D1 correctAnswer:2
  {"id":"netplus-605","domain":"Networking Concepts","type":"single-choice",
   "question":"A startup needs to deploy servers quickly without purchasing physical hardware. They subscribe to a cloud service that provides raw virtualized compute, storage, and networking. The team installs and manages their own OS and applications. Which cloud service model does this represent?",
   "choices":["SaaS","PaaS","IaaS","FaaS"],"correctAnswer":2},

  # 606 D1 correctAnswer:0
  {"id":"netplus-606","domain":"Networking Concepts","type":"single-choice",
   "question":"A development team needs a managed environment to build, deploy, and scale their application without managing the underlying servers or OS. The cloud provider handles infrastructure, OS, and runtime. Which cloud model is this?",
   "choices":["PaaS","IaaS","SaaS","CaaS"],"correctAnswer":0},

  # 607 D1 correctAnswer:1
  {"id":"netplus-607","domain":"Networking Concepts","type":"single-choice",
   "question":"Employees access a company's CRM application through a web browser. The application, data, and infrastructure are all managed by the vendor. No software is installed on client machines. Which cloud delivery model is this?",
   "choices":["IaaS","SaaS","PaaS","Hybrid cloud"],"correctAnswer":1},

  # 608 D1 correctAnswer:3
  {"id":"netplus-608","domain":"Networking Concepts","type":"single-choice",
   "question":"An organization evaluates cloud deployment models. Which model describes a cloud infrastructure operated exclusively for a single organization, either on-premises or hosted by a provider?",
   "choices":["Public cloud","Community cloud","Hybrid cloud","Private cloud"],"correctAnswer":3},

  # 609 D1 correctAnswer:2
  {"id":"netplus-609","domain":"Networking Concepts","type":"single-choice",
   "question":"A retailer keeps sensitive customer data on a private on-premises cloud but uses public cloud resources to handle seasonal traffic spikes. Which cloud deployment model describes this combination?",
   "choices":["Community cloud","Private cloud","Hybrid cloud","Multi-cloud"],"correctAnswer":2},

  # 610 D1 correctAnswer:0
  {"id":"netplus-610","domain":"Networking Concepts","type":"single-choice",
   "question":"A network administrator wants to migrate to IPv6 while maintaining IPv4 connectivity for legacy systems. Which IPv6 transition strategy runs both IPv4 and IPv6 simultaneously on all devices, allowing them to communicate using either protocol?",
   "choices":["Dual stack","6to4 tunneling","NAT64","Teredo"],"correctAnswer":0},

  # 611 D1 correctAnswer:1
  {"id":"netplus-611","domain":"Networking Concepts","type":"single-choice",
   "question":"An ISP offers only IPv4 connectivity, but an enterprise needs to transport IPv6 traffic across this IPv4 network between two IPv6-only sites. Which mechanism encapsulates IPv6 packets inside IPv4 packets for this purpose?",
   "choices":["Dual stack","6to4 tunneling","NAT64","ISATAP"],"correctAnswer":1},

  # 612 D1 correctAnswer:3
  {"id":"netplus-612","domain":"Networking Concepts","type":"single-choice",
   "question":"A host on an IPv4-only network behind a NAT firewall needs to communicate with IPv6 services. Which tunneling mechanism was specifically designed to traverse NAT devices by encapsulating IPv6 in UDP?",
   "choices":["6to4","ISATAP","Dual stack","Teredo"],"correctAnswer":3},

  # 613 D2 correctAnswer:0
  {"id":"netplus-613","domain":"Network Implementation","type":"single-choice",
   "question":"A wireless engineer compares antenna specifications. Antenna gain is expressed in dBi. What does dBi represent?",
   "choices":["Gain relative to a theoretical isotropic radiator that transmits equally in all directions","Gain relative to a dipole antenna","The effective transmit power in milliwatts","The receive sensitivity of the antenna"],"correctAnswer":0},

  # 614 D2 correctAnswer:2
  {"id":"netplus-614","domain":"Network Implementation","type":"single-choice",
   "question":"A wireless engineer measures the signal level at a client location using a Wi-Fi analyzer. The reading shows -65 dBm. What does dBm represent?",
   "choices":["Antenna gain relative to an isotropic radiator","Signal-to-noise ratio in decibels","Power level in decibels relative to 1 milliwatt","Frequency channel width in megahertz"],"correctAnswer":2},

  # 615 D2 correctAnswer:1
  {"id":"netplus-615","domain":"Network Implementation","type":"single-choice",
   "question":"A wireless network is experiencing high packet loss and retransmissions despite adequate signal strength. The engineer checks the SNR value. What does SNR measure in a wireless context?",
   "choices":["The number of spatial streams supported by the AP","The ratio of signal power to background noise power, indicating link quality","The channel width used by the AP","The distance between the client and AP"],"correctAnswer":1},

  # 616 D2 correctAnswer:3
  {"id":"netplus-616","domain":"Network Implementation","type":"single-choice",
   "question":"A Wi-Fi analyzer app reports an RSSI of -72 dBm for a nearby access point. What does RSSI measure?",
   "choices":["The antenna gain in the current direction","The noise floor of the RF environment","The channel utilization percentage","The strength of the received RF signal at the measurement point"],"correctAnswer":3},

  # 617 D2 correctAnswer:0
  {"id":"netplus-617","domain":"Network Implementation","type":"single-choice",
   "question":"Before installing wireless access points in a new multi-floor office building, an engineer walks the premises with a laptop running a spectrum analyzer and Wi-Fi scanner. What is the primary purpose of this pre-deployment wireless site survey?",
   "choices":["To identify optimal AP locations, detect interference sources, and plan channel assignments","To configure each AP's SSID and security settings","To measure cable lengths for PoE budgeting","To determine the number of VLANs required for wireless segmentation"],"correctAnswer":0},

  # 618 D2 correctAnswer:2
  {"id":"netplus-618","domain":"Network Implementation","type":"single-choice",
   "question":"A wireless client stays associated with a distant, weak AP even when a closer AP with better signal is available. What setting on the client or AP causes the client to disconnect from the weak AP and seek a better one?",
   "choices":["Transmit power adjustment","Band steering configuration","Roaming threshold (signal level trigger for reassociation)","SSID broadcast interval"],"correctAnswer":2},

  # 619 D2 correctAnswer:1
  {"id":"netplus-619","domain":"Network Implementation","type":"single-choice",
   "question":"A network engineer is designing a 2.4 GHz wireless deployment for an open office. To minimize co-channel interference between adjacent APs, which set of channels should be used exclusively?",
   "choices":["1, 4, 8, 11","1, 6, 11","3, 6, 9","2, 5, 10"],"correctAnswer":1},

  # 620 D2 correctAnswer:3
  {"id":"netplus-620","domain":"Network Implementation","type":"single-choice",
   "question":"Many modern wireless clients support both 2.4 GHz and 5 GHz. A wireless LAN controller is configured to steer capable dual-band clients away from the congested 2.4 GHz band toward the less congested 5 GHz band. What is this feature called?",
   "choices":["Channel bonding","Load balancing","MU-MIMO","Band steering"],"correctAnswer":3},

  # 621 D2 correctAnswer:0
  {"id":"netplus-621","domain":"Network Implementation","type":"single-choice",
   "question":"A network engineer applies QoS markings to ensure VoIP packets are treated with the absolute minimum latency and jitter. Which DSCP Per-Hop Behavior (PHB) is specifically designed for real-time voice traffic?",
   "choices":["EF (Expedited Forwarding)","AF41 (Assured Forwarding)","CS0 (Best Effort)","CS3"],"correctAnswer":0},

  # 622 D2 correctAnswer:2
  {"id":"netplus-622","domain":"Network Implementation","type":"single-choice",
   "question":"A QoS policy uses DSCP Assured Forwarding (AF) markings for video conferencing traffic. What does AF provide compared to best-effort traffic?",
   "choices":["Absolute priority with no queuing delay","Lower maximum throughput than best-effort","Guaranteed minimum bandwidth with drop precedence levels","No quality guarantees; treated identically to best-effort"],"correctAnswer":2},

  # 623 D3 correctAnswer:1
  {"id":"netplus-623","domain":"Network Operations","type":"single-choice",
   "question":"An organization prohibits non-emergency network changes during the December holiday season and fiscal quarter-end periods. What is this practice called?",
   "choices":["Emergency change procedure","Change freeze (maintenance blackout period)","Standard change approval","Scheduled maintenance window"],"correctAnswer":1},

  # 624 D3 correctAnswer:3
  {"id":"netplus-624","domain":"Network Operations","type":"single-choice",
   "question":"Before implementing a complex router configuration change, a network engineer documents the current configuration and defines the exact steps needed to undo the change if it causes problems. What is this contingency plan called?",
   "choices":["Change request form","Post-implementation review","Approval workflow","Rollback plan"],"correctAnswer":3},

  # 625 D3 correctAnswer:0
  {"id":"netplus-625","domain":"Network Operations","type":"single-choice",
   "question":"A network analyst uses Wireshark to capture packets and wants to view only traffic on TCP port 443. Which Wireshark feature allows filtering the captured data to show only packets matching specific criteria?",
   "choices":["Display filter","Capture filter","Protocol dissector","Stream follow"],"correctAnswer":0},

  # 626 D3 correctAnswer:2
  {"id":"netplus-626","domain":"Network Operations","type":"single-choice",
   "question":"A network monitoring system sends an alert showing WAN utilization is 95% — far above the historical average of 40%. What does this significant deviation from normal traffic patterns indicate?",
   "choices":["NTP synchronization failure","DNS resolution timeout","A potential network problem such as congestion, a loop, or a DDoS attack","SNMP community string mismatch"],"correctAnswer":2},

  # 627 D3 correctAnswer:1
  {"id":"netplus-627","domain":"Network Operations","type":"single-choice",
   "question":"A syslog message has severity level 4. According to the standard syslog severity scale, what does severity level 4 indicate?",
   "choices":["Error","Warning","Notice","Informational"],"correctAnswer":1},

  # 628 D3 correctAnswer:3
  {"id":"netplus-628","domain":"Network Operations","type":"single-choice",
   "question":"An RMON (Remote Monitoring) probe is embedded in a managed switch. What type of function does the RMON probe provide?",
   "choices":["Sends SNMP traps for interface errors","Manages device configuration remotely","Provides encrypted out-of-band management","Captures and analyzes local traffic statistics without requiring constant polling by a management station"],"correctAnswer":3},

  # 629 D3 correctAnswer:0
  {"id":"netplus-629","domain":"Network Operations","type":"single-choice",
   "question":"A network administrator needs to graphically control a Windows server remotely, including seeing the full desktop and running applications. Which remote access protocol is built into Windows for this purpose?",
   "choices":["RDP (Remote Desktop Protocol)","VNC","SSH","Telnet"],"correctAnswer":0},

  # 630 D3 correctAnswer:2
  {"id":"netplus-630","domain":"Network Operations","type":"single-choice",
   "question":"An administrator needs to forward a local TCP port to a remote server port securely over an existing SSH connection, allowing encrypted access to a service that is not directly reachable. What technique does this describe?",
   "choices":["VPN split tunneling","SSH tunneling (port forwarding)","Reverse proxy","VXLAN overlay"],"correctAnswer":2},

  # 631 D4 correctAnswer:1
  {"id":"netplus-631","domain":"Network Security","type":"single-choice",
   "question":"An unauthorized person waits near a secured building entrance and slips in behind an employee as they use their access badge. Which physical security attack is this?",
   "choices":["Shoulder surfing","Tailgating (piggybacking)","Badge cloning","Dumpster diving"],"correctAnswer":1},

  # 632 D4 correctAnswer:3
  {"id":"netplus-632","domain":"Network Security","type":"single-choice",
   "question":"A data center uses a physical security control where a person must pass through an outer door that locks before an inner door opens, ensuring only one person can enter at a time. What is this physical control called?",
   "choices":["Badge reader","CCTV monitoring","Biometric scanner","Mantrap"],"correctAnswer":3},

  # 633 D4 correctAnswer:0
  {"id":"netplus-633","domain":"Network Security","type":"single-choice",
   "question":"Employees must present an RFID badge to enter the server room. The access control system logs every entry with the employee's identity and timestamp. Which physical security control is this?",
   "choices":["Proximity card/badge reader access control","Mantrap","Biometric retinal scan","Security guard patrol"],"correctAnswer":0},

  # 634 D4 correctAnswer:2
  {"id":"netplus-634","domain":"Network Security","type":"single-choice",
   "question":"An attacker stands behind a helpdesk employee and watches them type their password. Which social engineering or physical attack technique is this?",
   "choices":["Tailgating","Vishing","Shoulder surfing","Dumpster diving"],"correctAnswer":2},

  # 635 D4 correctAnswer:1
  {"id":"netplus-635","domain":"Network Security","type":"single-choice",
   "question":"An attacker retrieves discarded documents from a company's trash bins to find network diagrams, usernames, and server names that can be used in a later attack. Which technique is this?",
   "choices":["Tailgating","Dumpster diving","Shoulder surfing","Baiting"],"correctAnswer":1},

  # 636 D4 correctAnswer:3
  {"id":"netplus-636","domain":"Network Security","type":"single-choice",
   "question":"A web server suddenly becomes unreachable. A traffic analysis shows millions of ICMP packets per second arriving from thousands of different source IP addresses around the world. What type of attack is this?",
   "choices":["ARP poisoning","Man-in-the-middle attack","Denial of Service (DoS)","Distributed Denial of Service (DDoS)"],"correctAnswer":3},

  # 637 D4 correctAnswer:0
  {"id":"netplus-637","domain":"Network Security","type":"single-choice",
   "question":"Thousands of internet-connected devices — including routers, security cameras, and smart TVs — have been compromised by malware and are now remotely controlled by an attacker to send spam and launch attacks. What is this collection of compromised devices called?",
   "choices":["Botnet","Honeynet","Demilitarized Zone","Zombie farm"],"correctAnswer":0},

  # 638 D4 correctAnswer:2
  {"id":"netplus-638","domain":"Network Security","type":"single-choice",
   "question":"A hospital's files are encrypted by malware and become inaccessible. A ransom note demands cryptocurrency payment in exchange for the decryption key. Which type of malware is this?",
   "choices":["Spyware","Adware","Ransomware","Rootkit"],"correctAnswer":2},

  # 639 D5 correctAnswer:1
  {"id":"netplus-639","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A cable tester checks a newly terminated patch cable and shows that pin 1 has no continuity to the other end. Which cable fault does this indicate?",
   "choices":["Short circuit between pins","Open circuit on pin 1","Split pair fault","Cross-connect wiring error"],"correctAnswer":1},

  # 640 D5 correctAnswer:3
  {"id":"netplus-640","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A fiber technician uses a specialized instrument to measure signal loss (in dB) at each splice and connector along a single-mode fiber run. Which tool produces this distance-vs-loss trace?",
   "choices":["Visual fault locator","Fiber light source and power meter","TDR","OTDR"],"correctAnswer":3},

  # ── MR 641-643 ──────────────────────────────────────────────────────────────

  # 641 D1 correctAnswers:[0,3]
  {"id":"netplus-641","domain":"Networking Concepts","type":"multiple-response",
   "question":"Which TWO statements correctly describe IaaS (Infrastructure as a Service)? (Select 2)",
   "choices":["The customer is responsible for managing the OS, applications, and data","The cloud provider manages everything including the application layer","Customers deploy applications without managing underlying servers","The provider supplies virtualized compute, storage, and networking resources"],"correctAnswers":[0,3]},

  # 642 D2 correctAnswers:[1,2]
  {"id":"netplus-642","domain":"Network Implementation","type":"multiple-response",
   "question":"A wireless engineer is conducting a pre-deployment site survey. Which TWO are primary goals of the site survey? (Select 2)",
   "choices":["Configure each AP's security settings remotely","Identify optimal AP placement for complete coverage","Detect existing RF interference sources and neighboring networks","Automatically assign IP addresses to APs"],"correctAnswers":[1,2]},

  # 643 D4 correctAnswers:[0,3]
  {"id":"netplus-643","domain":"Network Security","type":"multiple-response",
   "question":"Which TWO of the following are examples of physical security controls that restrict unauthorized access to facilities? (Select 2)",
   "choices":["Mantrap double-door entry system","Firewall access control list (ACL)","IDS signature update","Proximity badge reader"],"correctAnswers":[0,3]},

  # ── Matching 644-645 ──────────────────────────────────────────────────────

  # 644 D1 correctMatches:[3,1,2,0]
  {"id":"netplus-644","domain":"Networking Concepts","type":"matching",
   "question":"Match each cloud service model to the description of what the cloud provider manages.",
   "itemsLeft":["IaaS","PaaS","SaaS","On-premises"],
   "itemsRight":["Customer owns and manages all hardware and software","Provider manages infrastructure, OS, and platform; customer manages application","Provider manages the complete application stack; customer only manages data","Provider manages virtualized compute, storage, and networking only"],
   "correctMatches":[3,1,2,0]},

  # 645 D4 correctMatches:[2,1,3,0]
  {"id":"netplus-645","domain":"Network Security","type":"matching",
   "question":"Match each social engineering or physical security attack to its description.",
   "itemsLeft":["Phishing","Vishing","Smishing","Tailgating"],
   "itemsRight":["Unauthorized person follows an authorized employee through a secure entry","Phone call impersonating IT support to extract credentials","Fraudulent email appearing to come from a legitimate organization","Malicious SMS text luring the victim to click a link or provide information"],
   "correctMatches":[2,1,3,0]},

  # ── Ordering 646-647 ──────────────────────────────────────────────────────

  # 646 D3 correctOrder:[1,0,2,3,4]
  {"id":"netplus-646","domain":"Network Operations","type":"ordering",
   "question":"Arrange the following post-incident review (lessons learned) activities in the correct sequence.",
   "items":["Identify the root cause and contributing factors",
            "Document a complete timeline of events from detection to resolution",
            "Determine what was done effectively and what needs improvement",
            "Create a remediation action plan with assigned owners and deadlines",
            "Share findings with stakeholders and update runbooks or SOPs"],
   "correctOrder":[1,0,2,3,4]},

  # 647 D5 correctOrder:[1,2,4,0,3]
  {"id":"netplus-647","domain":"Network Troubleshooting","type":"ordering",
   "question":"Arrange the following steps for a pre-deployment wireless site survey in the correct order.",
   "items":["Place APs at candidate locations and measure actual coverage with a client",
            "Obtain building floor plans and define coverage and capacity requirements",
            "Identify RF interference sources using a spectrum analyzer",
            "Document final AP placement, channel assignments, and power levels",
            "Walk the facility with a Wi-Fi analyzer to measure baseline signal levels"],
   "correctOrder":[1,2,4,0,3]},

  # ── SB 648-650 ────────────────────────────────────────────────────────────

  # 648 D1 correctAnswers:[True,False,True,True]
  {"id":"netplus-648","domain":"Networking Concepts","type":"statement-block",
   "question":"Evaluate each statement about NAT types and indicate whether it is True or False.",
   "statements":["Static NAT creates a permanent one-to-one mapping between a private IP and a specific public IP.",
                 "Dynamic NAT can translate many private IPs to a single public IP address simultaneously by using port numbers.",
                 "PAT (Port Address Translation / NAT overload) allows multiple internal hosts to share one public IP using unique source ports.",
                 "NAT hides internal IP addressing from external hosts, providing a degree of addressing obscurity."],
   "correctAnswers":[True,False,True,True]},

  # 649 D2 correctAnswers:[True,True,False,True]
  {"id":"netplus-649","domain":"Network Implementation","type":"statement-block",
   "question":"Evaluate each statement about wireless signal measurements and indicate whether it is True or False.",
   "statements":["A higher SNR (Signal-to-Noise Ratio) indicates better wireless link quality with fewer retransmissions.",
                 "RSSI is a measurement of received signal strength; values closer to 0 dBm indicate a stronger signal.",
                 "On the 2.4 GHz band, channels 1, 6, 11, and 14 are all non-overlapping and available in the United States.",
                 "A wireless site survey is used to determine optimal AP placement and identify interference sources."],
   "correctAnswers":[True,True,False,True]},

  # 650 D4 correctAnswers:[False,True,True,False]
  {"id":"netplus-650","domain":"Network Security","type":"statement-block",
   "question":"Evaluate each statement about DoS, DDoS, and botnets and indicate whether it is True or False.",
   "statements":["A DoS (Denial of Service) attack uses thousands of compromised hosts from around the world to overwhelm a target.",
                 "A DDoS attack is difficult to mitigate because attack traffic originates from many different sources simultaneously.",
                 "A botnet is a network of compromised devices (bots) remotely controlled by an attacker.",
                 "Ransomware is a type of denial-of-service attack because it temporarily disrupts network routing."],
   "correctAnswers":[False,True,True,False]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
