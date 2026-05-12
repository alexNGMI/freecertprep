import json, pathlib

Q = pathlib.Path("src/data/comptia-net-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 701-740 ──────────────────────────────────────────────────────────────

  # 701 D1 correctAnswer:2
  {"id":"netplus-701","domain":"Networking Concepts","type":"single-choice",
   "question":"An engineer reviewing an IP address sees 247.10.5.1. What class and purpose does this address belong to?",
   "choices":["Class D — multicast","Class B — private use","Class E — reserved for experimental/research use","Class A — public internet"],"correctAnswer":2},

  # 702 D1 correctAnswer:0
  {"id":"netplus-702","domain":"Networking Concepts","type":"single-choice",
   "question":"Under classless inter-domain routing (CIDR), which statement about the all-zeros subnet (e.g., 192.168.1.0/24) is correct?",
   "choices":["CIDR permits its use; the all-zeros subnet is a valid network like any other","The all-zeros subnet is always reserved and cannot be used under any standard","The all-zeros subnet is only valid in IPv6","The all-zeros subnet is automatically assigned to the router's loopback interface"],"correctAnswer":0},

  # 703 D1 correctAnswer:1
  {"id":"netplus-703","domain":"Networking Concepts","type":"single-choice",
   "question":"A static route is configured on a router as 192.168.50.25/32. What does the /32 prefix length indicate?",
   "choices":["The address is a summary of all 192.168.50.x hosts","A host route referencing exactly one specific IP address","A multicast group address","A network address for a /25 subnet"],"correctAnswer":1},

  # 704 D1 correctAnswer:3
  {"id":"netplus-704","domain":"Networking Concepts","type":"single-choice",
   "question":"A network engineer subnets point-to-point WAN links to conserve address space. Which subnet mask provides exactly 2 usable host addresses and is ideal for point-to-point links?",
   "choices":["/29 — 6 usable hosts","/28 — 14 usable hosts","/31 — 0 usable hosts (unnumbered)","/ 30 — 2 usable hosts"],"correctAnswer":3},

  # 705 D1 correctAnswer:2
  {"id":"netplus-705","domain":"Networking Concepts","type":"single-choice",
   "question":"The RFC 1918 private address space includes three ranges. Which statement correctly identifies the 10.x.x.x private range?",
   "choices":["10.0.0.0 through 10.0.0.255 (/24)","10.0.0.0 through 10.254.255.255 (/9)","10.0.0.0 through 10.255.255.255 (/8)","10.0.0.0 through 10.127.255.255 (/9)"],"correctAnswer":2},

  # 706 D1 correctAnswer:0
  {"id":"netplus-706","domain":"Networking Concepts","type":"single-choice",
   "question":"Every IPv4 packet contains a TTL (Time to Live) field. What happens to this field as the packet travels through routers, and what is its purpose?",
   "choices":["Each router decrements TTL by 1; when it reaches 0, the packet is discarded — preventing packets from looping indefinitely","Each router increments TTL by 1 to track the number of hops","TTL sets the maximum packet size in bytes","TTL is only used by ICMP and has no effect on normal IP routing"],"correctAnswer":0},

  # 707 D1 correctAnswer:1
  {"id":"netplus-707","domain":"Networking Concepts","type":"single-choice",
   "question":"A network team is troubleshooting application performance. Packets larger than a certain size are being fragmented. What term describes the largest IP packet size (including header) that can be transmitted on a given network link without fragmentation?",
   "choices":["Segment size","MTU (Maximum Transmission Unit)","Window size","Frame check sequence"],"correctAnswer":1},

  # 708 D1 correctAnswer:3
  {"id":"netplus-708","domain":"Networking Concepts","type":"single-choice",
   "question":"A storage area network requires high-throughput iSCSI traffic. The network team enables a feature on switches and NICs that allows Ethernet frames much larger than the standard 1518-byte limit. What are these large frames called?",
   "choices":["Giants","Superframes","Concatenated frames","Jumbo frames"],"correctAnswer":3},

  # 709 D1 correctAnswer:2
  {"id":"netplus-709","domain":"Networking Concepts","type":"single-choice",
   "question":"Before a TCP application can exchange data, the client and server perform a connection establishment process. What is the correct sequence of messages in the TCP three-way handshake?",
   "choices":["ACK → SYN → SYN-ACK","SYN-ACK → SYN → ACK","SYN → SYN-ACK → ACK","SYN → ACK → SYN-ACK"],"correctAnswer":2},

  # 710 D1 correctAnswer:0
  {"id":"netplus-710","domain":"Networking Concepts","type":"single-choice",
   "question":"How does TCP perform an orderly connection termination to ensure all data is received before the connection closes?",
   "choices":["Four-way handshake: FIN → ACK → FIN → ACK (each side independently closes its half of the connection)","Two-way handshake: FIN → FIN-ACK","Three-way handshake: FIN → SYN → FIN-ACK","RST flag is set by both sides simultaneously"],"correctAnswer":0},

  # 711 D1 correctAnswer:1
  {"id":"netplus-711","domain":"Networking Concepts","type":"single-choice",
   "question":"A DNS query and DHCP discovery are both sent using which transport protocol, and why is this protocol preferred for these use cases?",
   "choices":["TCP — because guaranteed delivery is required","UDP — because low overhead is prioritized and the applications handle retransmission if needed","TCP — because DNS and DHCP require ordered delivery","IP directly — DNS and DHCP bypass the transport layer"],"correctAnswer":1},

  # 712 D1 correctAnswer:3
  {"id":"netplus-712","domain":"Networking Concepts","type":"single-choice",
   "question":"A ping from Host A returns an ICMP 'Destination Host Unreachable' message. Which scenario does this message indicate?",
   "choices":["The destination host rejected the connection on the target port","The TTL expired before reaching the destination","Host A's NIC is disconnected","A router on the path cannot forward the packet to the destination host"],"correctAnswer":3},

  # 713 D2 correctAnswer:0
  {"id":"netplus-713","domain":"Network Implementation","type":"single-choice",
   "question":"A wireless LAN controller is configured to support fast roaming so that VoIP calls are not dropped as users move between access points. Which 802.11 amendment enables Fast BSS Transition by caching keys at neighboring APs before roaming occurs?",
   "choices":["802.11r","802.11k","802.11v","802.11w"],"correctAnswer":0},

  # 714 D2 correctAnswer:2
  {"id":"netplus-714","domain":"Network Implementation","type":"single-choice",
   "question":"A wireless client is connected to a distant AP with a weak signal while a closer AP with better signal is available. Which 802.11 amendment provides the AP with information about neighboring APs (signal strength, channel, load) that it can share with the client to facilitate better roaming decisions?",
   "choices":["802.11r","802.11v","802.11k","802.11ac"],"correctAnswer":2},

  # 715 D2 correctAnswer:1
  {"id":"netplus-715","domain":"Network Implementation","type":"single-choice",
   "question":"An access point detects that a connected client has a poor signal and would benefit from connecting to a neighboring AP. Which 802.11 amendment allows the AP to send a BSS Transition Management Request, suggesting the client roam to a better AP?",
   "choices":["802.11r","802.11v","802.11k","802.11i"],"correctAnswer":1},

  # 716 D2 correctAnswer:3
  {"id":"netplus-716","domain":"Network Implementation","type":"single-choice",
   "question":"A wireless engineer notices that APs at the edge of the building are causing co-channel interference with neighboring APs because their transmit power is too high. What setting should be adjusted to reduce this interference?",
   "choices":["Channel width (from 40 MHz to 20 MHz)","SSID broadcast interval","QoS DSCP markings for wireless","Transmit power level (reduce AP power)"],"correctAnswer":3},

  # 717 D2 correctAnswer:0
  {"id":"netplus-717","domain":"Network Implementation","type":"single-choice",
   "question":"A PoE switch has a total PoE budget of 370 W and 24 ports. If 20 ports each power a 802.3at (30W) PoE+ device, how much PoE power budget remains for additional devices?",
   "choices":["370 W − 600 W = overbudget by 230 W; switch would throttle","370 − (20 × 30) = 370 − 600 = negative","The switch would shut down all PoE ports","370 W − (20 × 15.4 W) = 62 W remaining"],"correctAnswer":0},

  # Hmm, this question has a trick - 20 x 30W = 600W exceeds the 370W budget. But my correctAnswer:0 says "overbudget."
  # Let me redo with a realistic scenario:
  # 717 D2 - PoE budget: 24-port switch, 740W budget, 20 devices at 30W each. How much remains?
  # 20 x 30 = 600W. 740 - 600 = 140W remaining. → correctAnswer:0

  # 718 D2 correctAnswer:2
  {"id":"netplus-718","domain":"Network Implementation","type":"single-choice",
   "question":"A Cisco switch port is set to 'dynamic desirable' mode. What does this DTP (Dynamic Trunking Protocol) mode do?",
   "choices":["The port permanently operates as an access port","The port permanently operates as a trunk","The port actively sends DTP frames to negotiate trunking with the neighbor","The port never initiates DTP negotiation but will trunk if the neighbor requests it"],"correctAnswer":2},

  # 719 D2 correctAnswer:1
  {"id":"netplus-719","domain":"Network Implementation","type":"single-choice",
   "question":"A network administrator adds a new VLAN to the core switch. VTP (VLAN Trunking Protocol) is configured in server mode on the core. What happens to this new VLAN?",
   "choices":["The VLAN must be manually configured on every switch in the campus","The VLAN is automatically propagated to all VTP client switches across trunk links","The VLAN is only visible on Layer 3 switches","The VLAN is pruned from all trunk ports until manually allowed"],"correctAnswer":1},

  # 720 D2 correctAnswer:3
  {"id":"netplus-720","domain":"Network Implementation","type":"single-choice",
   "question":"PortFast is enabled on switch access ports connected to workstations. What does PortFast do to improve connectivity for end devices?",
   "choices":["Permanently disables STP on access ports","Disables BPDU transmission on the port","Forces the port into half-duplex mode","Skips STP listening and learning states, bringing the port immediately to forwarding"],"correctAnswer":3},

  # 721 D2 correctAnswer:0
  {"id":"netplus-721","domain":"Network Implementation","type":"single-choice",
   "question":"A PortFast-enabled switch port accidentally receives a BPDU from a hub connected to a switch. What does BPDU Guard do in response to this BPDU?",
   "choices":["Immediately places the port into err-disabled state to prevent a potential STP loop","Ignores the BPDU and continues forwarding","Promotes the port to a designated port","Sends a topology change notification to the root bridge"],"correctAnswer":0},

  # 722 D2 correctAnswer:2
  {"id":"netplus-722","domain":"Network Implementation","type":"single-choice",
   "question":"A network engineer wants to prevent an unauthorized switch connected to a specific port from winning the STP root bridge election and disrupting the spanning tree. Which STP feature prevents this?",
   "choices":["BPDU Guard","Loop Guard","PortFast","Root Guard"],"correctAnswer":2},

  # 723 D3 correctAnswer:1
  {"id":"netplus-723","domain":"Network Operations","type":"single-choice",
   "question":"After completing a network upgrade that added new VLANs, subnets, and changed routing paths, what documentation must be updated to accurately reflect the current network state?",
   "choices":["Only the physical diagram needs updating after hardware changes","Network topology diagrams and IP address management records","Only the change request ticket needs to be closed","Only the vendor support portal needs to reflect the new configuration"],"correctAnswer":1},

  # 724 D3 correctAnswer:3
  {"id":"netplus-724","domain":"Network Operations","type":"single-choice",
   "question":"How often should a network baseline be recaptured to remain a useful reference for detecting anomalies?",
   "choices":["Only once during initial network deployment","Weekly during business hours only","Never — the initial baseline is permanent","Periodically and after any significant network change"],"correctAnswer":3},

  # 725 D3 correctAnswer:0
  {"id":"netplus-725","domain":"Network Operations","type":"single-choice",
   "question":"A disaster recovery manager wants to validate the DR plan by gathering the response team in a conference room to verbally walk through the recovery steps without actually failing over any systems. Which type of DR test is this?",
   "choices":["Tabletop exercise","Full failover test","Parallel test","Simulation drill"],"correctAnswer":0},

  # 726 D3 correctAnswer:2
  {"id":"netplus-726","domain":"Network Operations","type":"single-choice",
   "question":"An organization wants to verify their DR site can support production workloads by actually failing over operations to the DR site while keeping the primary site in a ready state. Which DR test type provides the most comprehensive validation?",
   "choices":["Tabletop exercise","Checklist review","Full cutover test","Parallel operation test"],"correctAnswer":2},

  # 727 D3 correctAnswer:1
  {"id":"netplus-727","domain":"Network Operations","type":"single-choice",
   "question":"A network operations manager analyzes availability metrics. Which combination of MTBF and MTTR values results in the highest system availability?",
   "choices":["Low MTBF and low MTTR","High MTBF and low MTTR","Low MTBF and high MTTR","High MTBF and high MTTR"],"correctAnswer":1},

  # 728 D3 correctAnswer:3
  {"id":"netplus-728","domain":"Network Operations","type":"single-choice",
   "question":"A service was available for 8,736 hours in a year and experienced 24 hours of total downtime. Using these values, what is the correct formula to calculate availability percentage?",
   "choices":["MTBF / MTTR × 100","(MTTR / MTBF) × 100","Downtime / Total time × 100","Uptime / (Uptime + Downtime) × 100"],"correctAnswer":3},

  # 729 D3 correctAnswer:0
  {"id":"netplus-729","domain":"Network Operations","type":"single-choice",
   "question":"A network team analyzes utilization trends showing 15% annual bandwidth growth. They plan WAN upgrades 18 months in advance to ensure infrastructure keeps pace with demand. What proactive practice is this?",
   "choices":["Capacity planning","Change management","Asset management","Incident management"],"correctAnswer":0},

  # 730 D3 correctAnswer:2
  {"id":"netplus-730","domain":"Network Operations","type":"single-choice",
   "question":"An auditor discovers that multiple network diagrams do not match the actual device configurations in production. What should the network team do to correct this discrepancy?",
   "choices":["Reconfigure the network to match the old diagrams","Archive the diagrams and create all-new documentation from scratch","Conduct a documentation audit and update all diagrams to reflect the current configuration","Ignore the discrepancy if the network is functioning correctly"],"correctAnswer":2},

  # 731 D4 correctAnswer:1
  {"id":"netplus-731","domain":"Network Security","type":"single-choice",
   "question":"A browser connects to a web server and checks whether the server's SSL certificate has been revoked. It downloads a periodically updated list from the CA. Which certificate revocation mechanism is used?",
   "choices":["OCSP stapling","CRL (Certificate Revocation List)","PKCS#12 validation","Certificate pinning"],"correctAnswer":1},

  # 732 D4 correctAnswer:3
  {"id":"netplus-732","domain":"Network Security","type":"single-choice",
   "question":"A browser needs to check certificate revocation status in real time without downloading a potentially large list. It queries the CA's server directly during the TLS handshake. Which protocol provides this real-time revocation check?",
   "choices":["CRL","LDAPS","Certificate transparency","OCSP (Online Certificate Status Protocol)"],"correctAnswer":3},

  # 733 D4 correctAnswer:0
  {"id":"netplus-733","domain":"Network Security","type":"single-choice",
   "question":"An attacker captures a valid authentication token during a user's login session and later resends that same token to gain unauthorized access. Which type of attack is this?",
   "choices":["Replay attack","Brute-force attack","ARP spoofing","Password spraying"],"correctAnswer":0},

  # 734 D4 correctAnswer:2
  {"id":"netplus-734","domain":"Network Security","type":"single-choice",
   "question":"A web application uses cookies to maintain user sessions. An attacker injects malicious JavaScript that steals the session cookie from a victim's browser, allowing the attacker to impersonate the user. What type of attack enables this cookie theft?",
   "choices":["Replay attack","SQL injection","Session hijacking via XSS (Cross-Site Scripting)","Brute-force attack"],"correctAnswer":2},

  # 735 D4 correctAnswer:1
  {"id":"netplus-735","domain":"Network Security","type":"single-choice",
   "question":"An attacker sets up a wireless access point with the same SSID as a legitimate corporate AP, placing it in a location where users connect to it instead of the real AP. What type of wireless attack is this?",
   "choices":["Deauthentication flood","Evil twin attack","WPS brute force","Bluejacking"],"correctAnswer":1},

  # 736 D4 correctAnswer:3
  {"id":"netplus-736","domain":"Network Security","type":"single-choice",
   "question":"A hotel guest connects to the hotel Wi-Fi. Before gaining internet access, their browser is automatically redirected to a page requiring acceptance of terms of service and possibly payment. What security/network feature causes this redirect?",
   "choices":["Stateful firewall inspection","DNSSEC enforcement","802.1X port authentication","Captive portal"],"correctAnswer":3},

  # 737 D4 correctAnswer:0
  {"id":"netplus-737","domain":"Network Security","type":"single-choice",
   "question":"An organization requires that all devices accessing the internal network be checked for current antivirus definitions and OS patch level before being granted access. Noncompliant devices are quarantined. What technology enforces this?",
   "choices":["NAC (Network Admission Control)","SIEM","DLP","Content filtering"],"correctAnswer":0},

  # 738 D4 correctAnswer:2
  {"id":"netplus-738","domain":"Network Security","type":"single-choice",
   "question":"A switch port is configured with port security. The 'sticky' MAC address feature is enabled. What does sticky MAC learning do?",
   "choices":["Dynamically assigns VLANs based on connected device MAC address","Allows unlimited devices but logs all MAC addresses","Automatically converts dynamically learned MAC addresses into permanent entries saved to the running configuration","Broadcasts the MAC table to all neighboring switches"],"correctAnswer":2},

  # 739 D5 correctAnswer:1
  {"id":"netplus-739","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician runs traceroute and notices one hop shows 300 ms latency while all subsequent hops show 5 ms. What is the most likely explanation for this single high-latency hop?",
   "choices":["The hop represents a completely congested link with 100% packet loss","The router at that hop deprioritizes or rate-limits ICMP packets; actual data traffic experiences normal latency","The link is physically broken but still forwarding some packets","A firewall is blocking ICMP beyond that hop"],"correctAnswer":1},

  # 740 D5 correctAnswer:3
  {"id":"netplus-740","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A host pings a remote server and receives 'ICMP Destination Net Unreachable'. What does this specific ICMP message indicate?",
   "choices":["The destination host's firewall blocked the ICMP request","The TTL expired and the packet was discarded","The destination port is closed","A router has no route to the destination network and cannot forward the packet"],"correctAnswer":3},

  # ── MR 741-743 ──────────────────────────────────────────────────────────────

  # 741 D2 correctAnswers:[0,2]
  {"id":"netplus-741","domain":"Network Implementation","type":"multiple-response",
   "question":"Which TWO 802.11 amendments specifically improve the wireless roaming experience for clients moving between access points? (Select 2)",
   "choices":["802.11r — enables Fast BSS Transition by pre-caching security keys at neighboring APs","802.11w — provides management frame protection","802.11k — provides radio resource information to help clients identify better APs","802.11i — defines WPA2 security mechanisms"],"correctAnswers":[0,2]},

  # 742 D4 correctAnswers:[1,3]
  {"id":"netplus-742","domain":"Network Security","type":"multiple-response",
   "question":"A PKI administrator needs to ensure that revoked certificates cannot be trusted. Which TWO mechanisms allow clients to check whether a certificate has been revoked? (Select 2)",
   "choices":["Wildcard certificate","CRL (Certificate Revocation List)","SAN (Subject Alternative Name) certificate","OCSP (Online Certificate Status Protocol)"],"correctAnswers":[1,3]},

  # 743 D5 correctAnswers:[0,2]
  {"id":"netplus-743","domain":"Network Troubleshooting","type":"multiple-response",
   "question":"A wireless user cannot authenticate to the corporate network. Which TWO steps are most directly relevant to diagnosing a wireless authentication failure? (Select 2)",
   "choices":["Verify the SSID name and security passphrase on the client","Adjust the AP's antenna to improve signal strength","Confirm the RADIUS server address and shared secret configured on the AP for 802.1X","Check the PoE power budget on the switch"],"correctAnswers":[0,2]},

  # ── Matching 744-745 ──────────────────────────────────────────────────────

  # 744 D2 correctMatches:[3,0,1,2]
  {"id":"netplus-744","domain":"Network Implementation","type":"matching",
   "question":"Match each STP enhancement feature to its primary function.",
   "itemsLeft":["PortFast","BPDU Guard","Root Guard","Loop Guard"],
   "itemsRight":["Places port in err-disabled state if any BPDU is received","Prevents a port from transitioning to forwarding state if BPDUs stop being received","Prevents a connected switch from becoming root bridge by discarding superior BPDUs","Skips STP listening and learning; transitions access port directly to forwarding"],
   "correctMatches":[3,0,1,2]},

  # 745 D4 correctMatches:[2,3,1,0]
  {"id":"netplus-745","domain":"Network Security","type":"matching",
   "question":"Match each security term to its correct definition.",
   "itemsLeft":["Replay attack","Session hijacking","Evil twin","OCSP"],
   "itemsRight":["Real-time protocol used to check if a digital certificate has been revoked","A rogue wireless AP using the same SSID as a legitimate network to capture client traffic","Capturing and retransmitting valid authentication credentials or tokens to gain unauthorized access","Stealing an active authenticated user's session identifier to impersonate them"],
   "correctMatches":[2,3,1,0]},

  # ── Ordering 746-747 ──────────────────────────────────────────────────────

  # 746 D3 correctOrder:[2,1,3,0,4]
  {"id":"netplus-746","domain":"Network Operations","type":"ordering",
   "question":"Arrange the following disaster recovery (DR) planning and testing activities in the correct sequence.",
   "items":["Conduct a full cutover test to validate the DR site under real conditions",
            "Perform a tabletop walkthrough with the response team to identify gaps",
            "Develop and document the DR plan based on RPO/RTO requirements",
            "Execute a parallel test by running both sites simultaneously",
            "Update the DR plan with lessons learned and retest on a defined schedule"],
   "correctOrder":[2,1,3,0,4]},

  # 747 D5 correctOrder:[2,0,1,3,4]
  {"id":"netplus-747","domain":"Network Troubleshooting","type":"ordering",
   "question":"A workstation is receiving a 'duplicate IP address' alert. Arrange the following troubleshooting steps in the correct order.",
   "items":["Identify which two devices share the conflicting IP using arp -a or DHCP server logs",
            "Determine whether a rogue DHCP server or static IP misconfiguration is the root cause",
            "Receive the duplicate IP alert and confirm symptoms on the affected workstation",
            "Resolve the conflict by assigning a unique IP or correcting the DHCP reservation",
            "Verify normal operation and document the resolution"],
   "correctOrder":[2,0,1,3,4]},

  # ── SB 748-750 ────────────────────────────────────────────────────────────

  # 748 D2 correctAnswers:[True,False,True,True]
  {"id":"netplus-748","domain":"Network Implementation","type":"statement-block",
   "question":"Evaluate each statement about STP port security features and indicate whether it is True or False.",
   "statements":["PortFast enables an access port to skip STP listening and learning states and go directly to forwarding.",
                 "BPDU Guard is only required on trunk ports between switches and should not be enabled on access ports.",
                 "Root Guard prevents a port from accepting a superior BPDU that would change the root bridge.",
                 "BPDU Guard places a port into err-disabled state if any BPDU is received on that port."],
   "correctAnswers":[True,False,True,True]},

  # 749 D1 correctAnswers:[True,False,True,False]
  {"id":"netplus-749","domain":"Networking Concepts","type":"statement-block",
   "question":"Evaluate each statement about TCP and indicate whether it is True or False.",
   "statements":["TCP uses a three-way handshake (SYN → SYN-ACK → ACK) to establish a connection before data transfer.",
                 "TCP uses a two-step process (FIN → FIN-ACK) to close a connection, ensuring both sides stop simultaneously.",
                 "TCP provides reliable, ordered delivery through sequence numbers, acknowledgments, and retransmission.",
                 "The TTL (Time to Live) field that prevents routing loops is located in the TCP segment header."],
   "correctAnswers":[True,False,True,False]},

  # 750 D4 correctAnswers:[True,True,False,True]
  {"id":"netplus-750","domain":"Network Security","type":"statement-block",
   "question":"Evaluate each statement about modern security architecture and indicate whether it is True or False.",
   "statements":["Zero-trust architecture treats every access request as untrusted and requires authentication and authorization regardless of network location.",
                 "SASE (Secure Access Service Edge) converges SD-WAN with cloud-delivered security services into a unified framework.",
                 "Micro-segmentation can only be applied in physical server environments and is not available in virtualized or cloud infrastructure.",
                 "Defense in depth uses multiple overlapping security controls so that no single point of failure results in total compromise."],
   "correctAnswers":[True,True,False,True]},
]

# Fix question 717 to use a valid scenario
for q in new_qs:
    if q["id"] == "netplus-717":
        q["question"] = "A PoE switch has a total PoE budget of 740 W. An engineer connects 20 devices that each require 802.3at (PoE+) power of 30 W per port. How much PoE power budget remains available for additional devices?"
        q["choices"] = ["140 W remaining (740 − 600 W)", "0 W — budget fully exhausted", "370 W remaining", "740 W — PoE budget is per-port, not shared"]
        q["correctAnswer"] = 0
        break

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
