import json, pathlib

Q = pathlib.Path("src/data/comptia-net-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 351-390 ──────────────────────────────────────────────────────────────

  # 351 D1 correctAnswer:2
  {"id":"netplus-351","domain":"Networking Concepts","type":"single-choice",
   "question":"A workstation is unable to reach the DHCP server and automatically configures itself with a 169.254.x.x address. Which term describes this self-assigned addressing mechanism?",
   "choices":["SLAAC","Static assignment","APIPA","DHCPv6"],"correctAnswer":2},

  # 352 D1 correctAnswer:0
  {"id":"netplus-352","domain":"Networking Concepts","type":"single-choice",
   "question":"A content delivery network (CDN) routes each client's request to the nearest edge server without the client knowing which physical server will respond. Which addressing type is this?",
   "choices":["Anycast","Broadcast","Unicast","Multicast"],"correctAnswer":0},

  # 353 D1 correctAnswer:1
  {"id":"netplus-353","domain":"Networking Concepts","type":"single-choice",
   "question":"A host on 192.168.10.0/24 needs to communicate with a server on 10.0.0.0/8. What must be configured on the host for it to reach the remote network?",
   "choices":["A static ARP entry","A default gateway","A secondary IP address","A loopback interface"],"correctAnswer":1},

  # 354 D1 correctAnswer:3
  {"id":"netplus-354","domain":"Networking Concepts","type":"single-choice",
   "question":"An administrator summarizes a group of networks using CIDR notation /22. How many total IP addresses (including network and broadcast) are represented by a single /22 block?",
   "choices":["256","512","2048","1024"],"correctAnswer":3},

  # 355 D1 correctAnswer:2
  {"id":"netplus-355","domain":"Networking Concepts","type":"single-choice",
   "question":"A developer runs a local web server and accesses it via http://127.0.0.1. Which address type is 127.0.0.1?",
   "choices":["APIPA address","Multicast address","Loopback address","Private RFC 1918 address"],"correctAnswer":2},

  # 356 D1 correctAnswer:0
  {"id":"netplus-356","domain":"Networking Concepts","type":"single-choice",
   "question":"The private IPv4 address range defined by RFC 1918 for the 172.x.x.x space spans from 172.16.0.0 through which ending address?",
   "choices":["172.31.255.255","172.24.255.255","172.15.255.255","172.32.255.255"],"correctAnswer":0},

  # 357 D1 correctAnswer:1
  {"id":"netplus-357","domain":"Networking Concepts","type":"single-choice",
   "question":"IPv6 link-local addresses are automatically configured on every IPv6-enabled interface and are used for on-link communication. Which prefix identifies IPv6 link-local addresses?",
   "choices":["2001::/16","fe80::/10","fc00::/7","ff00::/8"],"correctAnswer":1},

  # 358 D1 correctAnswer:3
  {"id":"netplus-358","domain":"Networking Concepts","type":"single-choice",
   "question":"Which OSI layer is responsible for end-to-end communication, flow control, and segmentation of data into segments, and includes protocols such as TCP and UDP?",
   "choices":["Layer 2 – Data Link","Layer 3 – Network","Layer 5 – Session","Layer 4 – Transport"],"correctAnswer":3},

  # 359 D1 correctAnswer:2
  {"id":"netplus-359","domain":"Networking Concepts","type":"single-choice",
   "question":"SIP (Session Initiation Protocol) is used to set up, manage, and tear down VoIP calls. At which OSI layer does SIP primarily operate?",
   "choices":["Layer 2","Layer 4","Layer 6","Layer 7"],"correctAnswer":2},

  # Wait - Layer 7 is index 3 if choices are [L2, L4, L6, L7]. correctAnswer for L7 = 3.
  # Let me fix this - the choices are [Layer 2, Layer 4, Layer 6, Layer 7] and L7 is at index 3.
  # But I assigned correctAnswer:2 (Layer 6). That's wrong. Let me fix the choices.
  # Actually wait - SIP operates at Layer 7. With choices [Layer 2, Layer 4, Layer 6, Layer 7]:
  # index 0=L2, 1=L4, 2=L6, 3=L7. Layer 7 = index 3, not 2.
  # I need to fix this. Let me make choices so that correctAnswer=2 gets Layer 7.
  # choices:["Layer 4","Layer 5","Layer 7","Layer 3"] → correctAnswer:2 = Layer 7 ✓

  # 360 D1 correctAnswer:0
  {"id":"netplus-360","domain":"Networking Concepts","type":"single-choice",
   "question":"Which protocol is specifically designed to transport real-time audio and video streams over IP networks and provides timing, sequencing, and payload identification?",
   "choices":["RTP","SIP","H.323","RTSP"],"correctAnswer":0},

  # 361 D1 correctAnswer:1
  {"id":"netplus-361","domain":"Networking Concepts","type":"single-choice",
   "question":"A router running OSPF learns a route to 10.10.0.0/16. What is the default administrative distance for OSPF-learned routes?",
   "choices":["90","110","120","170"],"correctAnswer":1},

  # 362 D1 correctAnswer:3
  {"id":"netplus-362","domain":"Networking Concepts","type":"single-choice",
   "question":"An engineer is comparing routing protocol administrative distances. Which value represents the default administrative distance for EIGRP internal routes?",
   "choices":["110","120","100","90"],"correctAnswer":3},

  # 363 D2 correctAnswer:0
  {"id":"netplus-363","domain":"Network Implementation","type":"single-choice",
   "question":"WPA3-Personal replaces the PSK handshake used in WPA2-Personal with a more secure key exchange method that protects against offline dictionary attacks. What is this method called?",
   "choices":["SAE (Simultaneous Authentication of Equals)","PEAP","EAP-TLS","TKIP"],"correctAnswer":0},

  # 364 D2 correctAnswer:2
  {"id":"netplus-364","domain":"Network Implementation","type":"single-choice",
   "question":"Which feature introduced in 802.11ax (Wi-Fi 6) allows an access point to simultaneously transmit data to multiple clients in different frequency sub-bands, improving efficiency in dense environments?",
   "choices":["MIMO","Beamforming","OFDMA","Band steering"],"correctAnswer":2},

  # 365 D2 correctAnswer:1
  {"id":"netplus-365","domain":"Network Implementation","type":"single-choice",
   "question":"A wireless access point supports MU-MIMO. What is the primary benefit of Multi-User MIMO compared to Single-User MIMO?",
   "choices":["Increases range by focusing signal toward the client","Allows simultaneous data transmission to multiple clients","Doubles the maximum bandwidth of each individual client","Eliminates the need for 5 GHz band operation"],"correctAnswer":1},

  # 366 D2 correctAnswer:3
  {"id":"netplus-366","domain":"Network Implementation","type":"single-choice",
   "question":"A network engineer is advising on deploying a wireless network in an office building with many neighboring networks. Which frequency band provides more non-overlapping channels and less interference from neighboring networks?",
   "choices":["900 MHz","2.4 GHz","6 GHz (Wi-Fi 6E only)","5 GHz"],"correctAnswer":3},

  # Wait - 6 GHz (Wi-Fi 6E) is technically correct but 5 GHz is also a good answer.
  # The question asks which provides "more non-overlapping channels and less interference" and 5 GHz has 23+ non-overlapping 20 MHz channels vs 2.4 GHz's 3. 6 GHz is Wi-Fi 6E only.
  # Let me keep 5 GHz as correctAnswer:3 since the question is about standard deployment.
  # Actually with choices [900 MHz, 2.4 GHz, 6 GHz (Wi-Fi 6E only), 5 GHz], 5 GHz is at index 3. Good.

  # 367 D2 correctAnswer:0
  {"id":"netplus-367","domain":"Network Implementation","type":"single-choice",
   "question":"An administrator hides the SSID on all access points hoping to improve wireless security. What is the actual security value of SSID hiding?",
   "choices":["Minimal — the SSID can still be discovered by passive sniffing of probe responses","Significant — clients cannot connect without manually entering the SSID","High — SSID is encrypted and cannot be intercepted","Complete — unauthorized devices cannot detect the network exists"],"correctAnswer":0},

  # 368 D2 correctAnswer:2
  {"id":"netplus-368","domain":"Network Implementation","type":"single-choice",
   "question":"A company deploys multiple access points throughout a building, all broadcasting the same SSID. Clients roam between APs seamlessly. What wireless architecture is this?",
   "choices":["IBSS (ad hoc)","BSS (basic service set)","ESS (extended service set)","Mesh network"],"correctAnswer":2},

  # 369 D2 correctAnswer:1
  {"id":"netplus-369","domain":"Network Implementation","type":"single-choice",
   "question":"802.11 wireless networks use CSMA/CA to avoid collisions. What does CA stand for, and how does it differ from the CD used in Ethernet?",
   "choices":["Collision avoidance — wireless NICs listen before transmitting but cannot detect collisions in real time, so they avoid them proactively","Collision avoidance — wireless uses token passing to prevent simultaneous transmissions","Channel allocation — each client is assigned a dedicated frequency channel","Carrier acknowledgment — every frame is acknowledged at Layer 2 before the next is sent"],"correctAnswer":1},

  # Actually: the best answer is A (index 0), not B (index 1). Let me reconsider.
  # CSMA/CA: CA = Collision Avoidance. Nodes listen before transmitting and use random backoff + RTS/CTS.
  # The correct explanation is that wireless cannot detect collisions (no CSMA/CD) so it avoids them proactively.
  # With my choices: index 0 = correct description. Let me fix correctAnswer to 0... but that ruins my balance.
  # Let me rewrite the question with different choices so that correctAnswer:1 is the right answer.

  # Actually I already fixed 359 above to have different choices. Let me also fix 369.
  # Let me make 369 a different question about CSMA/CA to avoid this issue.

  # 370 D2 correctAnswer:3
  {"id":"netplus-370","domain":"Network Implementation","type":"single-choice",
   "question":"A hospital is deploying powered medical devices requiring up to 71 W over PoE. Which IEEE standard is capable of delivering this power level?",
   "choices":["802.3af","802.3at","802.3bz","802.3bt (Type 4)"],"correctAnswer":3},

  # 371 D2 correctAnswer:0
  {"id":"netplus-371","domain":"Network Implementation","type":"single-choice",
   "question":"During a building renovation, a network technician must run cable through a ceiling space used as a return air plenum for the HVAC system. Which type of cable is required by fire code?",
   "choices":["Plenum-rated (CMP)","Riser-rated (CMR)","General-purpose (CM)","Direct-burial"],"correctAnswer":0},

  # 372 D2 correctAnswer:2
  {"id":"netplus-372","domain":"Network Implementation","type":"single-choice",
   "question":"A technician is punching down Cat6 cable to an RJ-45 keystone jack using T568B wiring. Which color goes on pin 1 (pair 3, tip) according to T568B?",
   "choices":["White/Green","White/Blue","White/Orange","White/Brown"],"correctAnswer":2},

  # 373 D3 correctAnswer:1
  {"id":"netplus-373","domain":"Network Operations","type":"single-choice",
   "question":"A company's disaster recovery plan states that the organization cannot lose more than 4 hours of transaction data after a failure. Which recovery metric defines this maximum acceptable data loss?",
   "choices":["RTO","RPO","MTTR","MTBF"],"correctAnswer":1},

  # 374 D3 correctAnswer:3
  {"id":"netplus-374","domain":"Network Operations","type":"single-choice",
   "question":"After a major network failure, management asks how long the IT team has to restore service before the business impact becomes unacceptable. Which disaster recovery metric defines this maximum tolerable downtime?",
   "choices":["RPO","MTBF","MTTR","RTO"],"correctAnswer":3},

  # 375 D3 correctAnswer:0
  {"id":"netplus-375","domain":"Network Operations","type":"single-choice",
   "question":"An organization needs a disaster recovery site where all infrastructure is preconfigured, data is replicated in real time, and failover can occur within minutes. Which DR site type meets this requirement?",
   "choices":["Hot site","Warm site","Cold site","Virtual DR site"],"correctAnswer":0},

  # 376 D3 correctAnswer:2
  {"id":"netplus-376","domain":"Network Operations","type":"single-choice",
   "question":"A network diagram shows routers labeled with IP addresses, subnet masks, and routing protocol areas, but does not show physical cable paths or equipment locations. Which type of diagram is this?",
   "choices":["Physical diagram","Floor plan diagram","Logical diagram","Rack diagram"],"correctAnswer":2},

  # 377 D3 correctAnswer:1
  {"id":"netplus-377","domain":"Network Operations","type":"single-choice",
   "question":"An SNMPv2c community string is configured on a network switch. What function does the community string serve?",
   "choices":["It encrypts SNMP traffic between manager and agent","It acts as a shared password controlling read or write access","It specifies the OID tree the manager can query","It identifies the SNMP version used for trap messages"],"correctAnswer":1},

  # 378 D3 correctAnswer:3
  {"id":"netplus-378","domain":"Network Operations","type":"single-choice",
   "question":"Network devices are configured to forward syslog messages to a central log server. Which UDP port does syslog use by default?",
   "choices":["161","162","123","514"],"correctAnswer":3},

  # 379 D3 correctAnswer:0
  {"id":"netplus-379","domain":"Network Operations","type":"single-choice",
   "question":"An organization activates a disaster recovery site that has the necessary building and power infrastructure, but requires equipment to be procured and data to be restored before it can be used. Which DR site type is this?",
   "choices":["Cold site","Warm site","Hot site","Mirrored site"],"correctAnswer":0},

  # 380 D3 correctAnswer:2
  {"id":"netplus-380","domain":"Network Operations","type":"single-choice",
   "question":"A network administrator stores configuration backup files only on the same devices being backed up. After a device failure, the backups are also lost. Which best practice was violated?",
   "choices":["Encryption of backup files","Incremental backup scheduling","Off-site or geographically separate backup storage","Automated backup verification"],"correctAnswer":2},

  # 381 D4 correctAnswer:1
  {"id":"netplus-381","domain":"Network Security","type":"single-choice",
   "question":"An IPSec VPN tunnel is configured using ESP (Encapsulating Security Payload). Which security services does ESP provide?",
   "choices":["Authentication only — no encryption","Encryption, authentication, and integrity protection","Integrity only — no encryption or authentication","Key exchange and certificate management"],"correctAnswer":1},

  # 382 D4 correctAnswer:3
  {"id":"netplus-382","domain":"Network Security","type":"single-choice",
   "question":"An IPSec implementation uses AH (Authentication Header). What does AH provide that distinguishes it from ESP?",
   "choices":["Data confidentiality through symmetric encryption","Both encryption and authentication","Encryption of the payload only","Data integrity and authentication without encryption"],"correctAnswer":3},

  # 383 D4 correctAnswer:0
  {"id":"netplus-383","domain":"Network Security","type":"single-choice",
   "question":"A security team is upgrading remote access VPN from IKEv1 to IKEv2. Which improvement does IKEv2 offer over IKEv1?",
   "choices":["Built-in MOBIKE support for mobile clients and faster initial negotiation","Backward compatibility with SSL/TLS endpoints","Elimination of the need for pre-shared keys","Support for GRE tunneling without additional configuration"],"correctAnswer":0},

  # 384 D4 correctAnswer:2
  {"id":"netplus-384","domain":"Network Security","type":"single-choice",
   "question":"Remote workers need VPN access without installing a dedicated VPN client. They should be able to connect from any HTTPS-capable browser through firewalls that block IPSec. Which VPN type is best suited?",
   "choices":["IPSec site-to-site VPN","GRE tunnel","SSL/TLS VPN (clientless)","L2TP/IPSec"],"correctAnswer":2},

  # 385 D4 correctAnswer:1
  {"id":"netplus-385","domain":"Network Security","type":"single-choice",
   "question":"An attacker calls an employee, claims to be from the IT helpdesk, and convinces them to reveal their network password. Which social engineering technique is this?",
   "choices":["Phishing","Vishing","Smishing","Spear phishing"],"correctAnswer":1},

  # 386 D4 correctAnswer:3
  {"id":"netplus-386","domain":"Network Security","type":"single-choice",
   "question":"An attacker on a LAN sends forged ARP replies associating their MAC address with the default gateway's IP. What attack is being performed, and what is the goal?",
   "choices":["MAC flooding — to overflow the switch's CAM table","DNS poisoning — to redirect web traffic to a fake server","Replay attack — to resend captured authentication packets","ARP spoofing — to intercept traffic destined for the gateway (MITM)"],"correctAnswer":3},

  # 387 D4 correctAnswer:0
  {"id":"netplus-387","domain":"Network Security","type":"single-choice",
   "question":"An organization is implementing a zero-trust security architecture. Which foundational principle defines zero trust?",
   "choices":["Never trust, always verify — every access request must be authenticated and authorized regardless of network location","Trust internal network traffic implicitly; verify only external connections","Block all incoming traffic by default; allow only traffic matching explicit rules","Segment the network into zones and trust traffic within the same zone"],"correctAnswer":0},

  # 388 D5 correctAnswer:2
  {"id":"netplus-388","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A laptop connected to wireless is experiencing high packet loss and retransmissions, but the signal strength appears adequate. Which condition is most likely causing this?",
   "choices":["DNS server failure","Incorrect subnet mask","Low signal-to-noise ratio (SNR) due to RF interference","DHCP lease exhaustion"],"correctAnswer":2},

  # 389 D5 correctAnswer:1
  {"id":"netplus-389","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A network switch shows CPU utilization spiking to 100% and all connected devices lose connectivity simultaneously. A traffic capture shows millions of broadcast frames per second. What is the most likely cause?",
   "choices":["Rogue DHCP server on the network","Broadcast storm caused by a switching loop","MAC address table overflow attack","Spanning tree port stuck in forwarding state"],"correctAnswer":1},

  # 390 D5 correctAnswer:3
  {"id":"netplus-390","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician runs 'show interfaces' on a switch and notices a high count of runt frames. What does a high runt count indicate?",
   "choices":["Frames exceeding the MTU of 1518 bytes","CRC errors from cable damage","An incorrect duplex configuration","Frames smaller than the minimum 64-byte Ethernet frame size"],"correctAnswer":3},

  # ── MR 391-393 ──────────────────────────────────────────────────────────────

  # 391 D2 correctAnswers:[0,3]
  {"id":"netplus-391","domain":"Network Implementation","type":"multiple-response",
   "question":"Which TWO features were introduced in 802.11ax (Wi-Fi 6) that were NOT present in 802.11ac (Wi-Fi 5)? (Select 2)",
   "choices":["OFDMA (Orthogonal Frequency Division Multiple Access)","MU-MIMO downlink support","256-QAM modulation","BSS Coloring to reduce inter-BSS interference"],"correctAnswers":[0,3]},

  # 392 D4 correctAnswers:[1,2]
  {"id":"netplus-392","domain":"Network Security","type":"multiple-response",
   "question":"When IPSec is deployed in tunnel mode rather than transport mode, which TWO statements are true? (Select 2)",
   "choices":["Only the payload is encrypted; the original IP header remains intact","The entire original IP packet (header + payload) is encapsulated","A new outer IP header is added to route the encrypted packet","Transport mode and tunnel mode provide identical protection"],"correctAnswers":[1,2]},

  # 393 D5 correctAnswers:[0,2]
  {"id":"netplus-393","domain":"Network Troubleshooting","type":"multiple-response",
   "question":"A wireless technician is investigating intermittent connectivity issues in a 2.4 GHz network. Which TWO sources are common causes of RF interference on the 2.4 GHz band? (Select 2)",
   "choices":["Microwave ovens","5 GHz 802.11ax access points","Overlapping channels from neighboring 2.4 GHz networks","Ethernet switches on the same VLAN"],"correctAnswers":[0,2]},

  # ── Matching 394-395 ──────────────────────────────────────────────────────

  # 394 D1 correctMatches:[1,2,3,0]
  {"id":"netplus-394","domain":"Networking Concepts","type":"matching",
   "question":"Match each IPv4 address class to its correct address range.",
   "itemsLeft":["Class A","Class B","Class C","Class D"],
   "itemsRight":["224.0.0.0 – 239.255.255.255","1.0.0.0 – 126.255.255.255","128.0.0.0 – 191.255.255.255","192.0.0.0 – 223.255.255.255"],
   "correctMatches":[1,2,3,0]},

  # 395 D4 correctMatches:[2,0,3,1]
  {"id":"netplus-395","domain":"Network Security","type":"matching",
   "question":"Match each VPN or tunneling protocol to its primary characteristic.",
   "itemsLeft":["IPSec ESP","IPSec AH","SSL/TLS VPN","GRE"],
   "itemsRight":["Provides data integrity and authentication without encryption","Encapsulates any Layer 3 protocol; provides no built-in encryption","Provides both encryption and authentication for the payload","Operates at the application layer and traverses firewalls via HTTPS (port 443)"],
   "correctMatches":[2,0,3,1]},

  # ── Ordering 396-397 ──────────────────────────────────────────────────────

  # 396 D3 correctOrder:[0,2,1,3,4]
  {"id":"netplus-396","domain":"Network Operations","type":"ordering",
   "question":"Arrange the following steps in the correct sequence for a formal network change management process.",
   "items":["Submit a change request documenting scope, risk, and rollback plan",
            "Obtain approval from the Change Advisory Board (CAB)",
            "Test and validate the change in a staging or lab environment",
            "Implement the change during the approved maintenance window",
            "Document outcomes and update configuration records"],
   "correctOrder":[0,2,1,3,4]},

  # 397 D5 correctOrder:[1,0,2,3,4]
  {"id":"netplus-397","domain":"Network Troubleshooting","type":"ordering",
   "question":"A user reports intermittent wireless drops. Arrange the following troubleshooting actions in the most logical order.",
   "items":["Check client signal strength, SNR, and observed data rates",
            "Confirm the client is associated to the correct SSID with valid credentials",
            "Use a spectrum analyzer or Wi-Fi scanner to identify RF interference sources",
            "Reboot the AP and test client connectivity after reconnection",
            "Escalate to the wireless vendor or perform a full site survey if issue persists"],
   "correctOrder":[1,0,2,3,4]},

  # ── SB 398-400 ────────────────────────────────────────────────────────────

  # 398 D3 correctAnswers:[True,True,False,True]
  {"id":"netplus-398","domain":"Network Operations","type":"statement-block",
   "question":"Evaluate each statement about disaster recovery (DR) site types and metrics, and indicate whether it is True or False.",
   "statements":["A hot site maintains real-time or near-real-time data replication and can fail over within minutes.",
                 "RPO (Recovery Point Objective) defines the maximum acceptable amount of data loss measured in time.",
                 "A cold site has all production servers pre-installed, configured, and ready to power on immediately.",
                 "RTO (Recovery Time Objective) defines the maximum tolerable time to restore normal operations after a failure."],
   "correctAnswers":[True,True,False,True]},

  # 399 D4 correctAnswers:[False,True,True,False]
  {"id":"netplus-399","domain":"Network Security","type":"statement-block",
   "question":"Evaluate each statement about IPSec and indicate whether it is True or False.",
   "statements":["IPSec AH (Authentication Header) provides data confidentiality through encryption.",
                 "IPSec ESP (Encapsulating Security Payload) can provide both encryption and data integrity.",
                 "IPSec can operate in either transport mode or tunnel mode depending on the deployment.",
                 "IKE (Internet Key Exchange) uses TCP port 500 for key negotiation."],
   "correctAnswers":[False,True,True,False]},

  # 400 D1 correctAnswers:[True,False,True,False]
  {"id":"netplus-400","domain":"Networking Concepts","type":"statement-block",
   "question":"Evaluate each statement about IPv6 and indicate whether it is True or False.",
   "statements":["IPv6 uses 128-bit addresses, providing approximately 3.4 × 10³⁸ possible addresses.",
                 "IPv6 networks require NAT because the global address space is insufficient for all devices.",
                 "IPv6 uses NDP (Neighbor Discovery Protocol) to perform functions equivalent to ARP in IPv4.",
                 "IPv6 link-local addresses (fe80::/10) are routable across the public internet."],
   "correctAnswers":[True,False,True,False]},
]

# Fix question 359 choices to ensure correctAnswer:2 is Layer 7
for q in new_qs:
    if q["id"] == "netplus-359":
        q["choices"] = ["Layer 4","Layer 5","Layer 7","Layer 3"]
        break

# Fix question 369 choices to ensure correctAnswer:1 is the correct CSMA/CA description
for q in new_qs:
    if q["id"] == "netplus-369":
        q["question"] = "The 802.11 wireless medium access method is CSMA/CA. What is the primary reason wireless uses Collision Avoidance instead of the Collision Detection used by wired Ethernet?"
        q["choices"] = [
            "Wireless uses full-duplex transmission, so collisions cannot occur",
            "Wireless NICs cannot detect collisions while transmitting because the transmitted signal overwhelms any received signal",
            "Wireless uses token passing, which eliminates the need for collision detection",
            "Wireless operates at Layer 1 only and does not require media access control"
        ]
        break

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
