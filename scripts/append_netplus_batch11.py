import json, pathlib

Q = pathlib.Path("src/data/comptia-net-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 501-540 ──────────────────────────────────────────────────────────────

  # 501 D1 correctAnswer:2
  {"id":"netplus-501","domain":"Networking Concepts","type":"single-choice",
   "question":"In SNMP, each manageable resource on a device (such as interface bandwidth or CPU utilization) is identified by a unique numerical identifier in a hierarchical tree. What is this identifier called?",
   "choices":["Community string","Trap OID","OID (Object Identifier)","MIB module"],"correctAnswer":2},

  # 502 D1 correctAnswer:0
  {"id":"netplus-502","domain":"Networking Concepts","type":"single-choice",
   "question":"An SNMP manager queries a switch for interface statistics. The switch references an internal database that defines the structure and meaning of all queryable objects. What is this database called?",
   "choices":["MIB (Management Information Base)","SNMP community","OID tree","Trap receiver"],"correctAnswer":0},

  # 503 D1 correctAnswer:1
  {"id":"netplus-503","domain":"Networking Concepts","type":"single-choice",
   "question":"A host is assigned the IPv6 address 2001:db8::1/64. Which address type does the prefix 2000::/3 identify?",
   "choices":["Link-local","Global unicast","Unique local","Multicast"],"correctAnswer":1},

  # 504 D1 correctAnswer:3
  {"id":"netplus-504","domain":"Networking Concepts","type":"single-choice",
   "question":"An enterprise uses IPv6 addresses starting with fd00:: for internal routing that should not be routed on the public internet. Which IPv6 address type does the fc00::/7 prefix represent?",
   "choices":["Global unicast","Link-local","Anycast","Unique local (ULA)"],"correctAnswer":3},

  # 505 D1 correctAnswer:2
  {"id":"netplus-505","domain":"Networking Concepts","type":"single-choice",
   "question":"An IPv6 router sends Neighbor Discovery messages to all routers on the segment. These messages are addressed to the all-routers multicast group. Which prefix identifies all IPv6 multicast addresses?",
   "choices":["fe80::/10","fc00::/7","ff00::/8","2000::/3"],"correctAnswer":2},

  # 506 D1 correctAnswer:0
  {"id":"netplus-506","domain":"Networking Concepts","type":"single-choice",
   "question":"What is the IPv6 loopback address, equivalent to 127.0.0.1 in IPv4?",
   "choices":["::1","fe80::1","::ffff:127.0.0.1","fc00::1"],"correctAnswer":0},

  # 507 D1 correctAnswer:1
  {"id":"netplus-507","domain":"Networking Concepts","type":"single-choice",
   "question":"A cloud provider needs to extend Layer 2 network segments across a Layer 3 data center fabric to support VM migration between racks. Which overlay protocol encapsulates Layer 2 Ethernet frames in UDP packets for this purpose?",
   "choices":["GRE","VXLAN","L2TP","MPLS"],"correctAnswer":1},

  # 508 D1 correctAnswer:3
  {"id":"netplus-508","domain":"Networking Concepts","type":"single-choice",
   "question":"A network engineer needs to tunnel non-IP protocols (such as IPX) or multicast traffic across an IP-only WAN that does not support these natively. Which tunneling protocol encapsulates any Layer 3 protocol inside IP packets?",
   "choices":["VXLAN","L2TP","IPSec","GRE"],"correctAnswer":3},

  # 509 D1 correctAnswer:2
  {"id":"netplus-509","domain":"Networking Concepts","type":"single-choice",
   "question":"A service provider uses a technology where routers attach short fixed-length labels to packets at the network edge and forward them based on labels rather than IP lookups, improving WAN routing speed. What is this technology?",
   "choices":["VXLAN","SD-WAN","MPLS","GRE"],"correctAnswer":2},

  # 510 D1 correctAnswer:0
  {"id":"netplus-510","domain":"Networking Concepts","type":"single-choice",
   "question":"An organization is replacing its fixed MPLS WAN with a solution that uses broadband, LTE, and MPLS simultaneously, selecting the best path per application based on real-time link quality. Which WAN technology provides this capability?",
   "choices":["SD-WAN","VXLAN","MPLS","GRE"],"correctAnswer":0},

  # 511 D1 correctAnswer:1
  {"id":"netplus-511","domain":"Networking Concepts","type":"single-choice",
   "question":"A data center builds virtual tenant networks on top of shared physical infrastructure, with each tenant's traffic logically separated but running over the same underlying switches and routers. What term describes this virtual network built on top of a physical network?",
   "choices":["Underlay network","Overlay network","Transit network","Fabric network"],"correctAnswer":1},

  # 512 D1 correctAnswer:3
  {"id":"netplus-512","domain":"Networking Concepts","type":"single-choice",
   "question":"A remote worker's VPN client is configured so that only traffic destined for the corporate network goes through the VPN tunnel, while all other internet traffic flows directly through the local ISP connection. What is this configuration called?",
   "choices":["Full tunnel VPN","Site-to-site VPN","Always-on VPN","Split tunneling"],"correctAnswer":3},

  # 513 D2 correctAnswer:0
  {"id":"netplus-513","domain":"Network Implementation","type":"single-choice",
   "question":"A large enterprise has hundreds of access points deployed campus-wide. All APs receive their configuration, firmware, and policy from a central device, eliminating the need to individually configure each AP. Which AP deployment model is this?",
   "choices":["Controller-based (thin/lightweight) APs","Autonomous (fat) APs","Mesh APs","Cloud-managed APs"],"correctAnswer":0},

  # 514 D2 correctAnswer:2
  {"id":"netplus-514","domain":"Network Implementation","type":"single-choice",
   "question":"Lightweight access points communicate with a wireless LAN controller using a tunneling protocol that carries both control and data traffic. Which protocol is the IETF standard for this WLC-AP communication?",
   "choices":["LWAPP","TACACS+","CAPWAP","RADIUS"],"correctAnswer":2},

  # 515 D2 correctAnswer:1
  {"id":"netplus-515","domain":"Network Implementation","type":"single-choice",
   "question":"A wireless LAN controller (WLC) is deployed in a large enterprise network. Which THREE primary functions does the WLC perform?",
   "choices":["Provides internet routing for all wireless clients","Centrally manages AP configuration, firmware, and RF settings","Handles authentication and applies wireless security policies","Aggregates roaming decisions to maintain client sessions across APs"],"correctAnswer":1},

  # 516 D2 correctAnswer:3
  {"id":"netplus-516","domain":"Network Implementation","type":"single-choice",
   "question":"A warehouse needs wireless coverage in all directions throughout a large open floor. Which antenna type radiates RF energy equally in all horizontal directions, making it ideal for central placement?",
   "choices":["Yagi directional","Parabolic dish","Panel antenna","Omnidirectional"],"correctAnswer":3},

  # 517 D2 correctAnswer:0
  {"id":"netplus-517","domain":"Network Implementation","type":"single-choice",
   "question":"A building-to-building wireless link requires maximum gain focused in a single direction to bridge two structures 500 meters apart. Which antenna type provides high gain in one narrow direction?",
   "choices":["Yagi (directional)","Omnidirectional","Dipole","Rubber duck"],"correctAnswer":0},

  # 518 D2 correctAnswer:2
  {"id":"netplus-518","domain":"Network Implementation","type":"single-choice",
   "question":"An 802.11n access point achieves higher throughput by combining two adjacent 20 MHz channels into a single wider channel. What is this technique called?",
   "choices":["Spatial multiplexing","OFDMA","Channel bonding (40 MHz)","MIMO aggregation"],"correctAnswer":2},

  # 519 D2 correctAnswer:1
  {"id":"netplus-519","domain":"Network Implementation","type":"single-choice",
   "question":"An 802.11ac (Wi-Fi 5) access point supports multiple channel widths. Which channel widths does 802.11ac support on the 5 GHz band? (Select the most complete correct list)",
   "choices":["20 MHz and 40 MHz only","20, 40, 80, and 160 MHz","40, 80, and 160 MHz only","80 and 160 MHz only"],"correctAnswer":1},

  # 520 D2 correctAnswer:3
  {"id":"netplus-520","domain":"Network Implementation","type":"single-choice",
   "question":"In an SDN architecture, the component responsible for network-wide intelligence — computing routing tables, enforcing policies, and instructing forwarding devices — is called what?",
   "choices":["Data plane","Forwarding plane","Southbound API","Control plane (SDN controller)"],"correctAnswer":3},

  # 521 D2 correctAnswer:0
  {"id":"netplus-521","domain":"Network Implementation","type":"single-choice",
   "question":"In SDN, which plane handles the actual forwarding of packets based on flow tables installed by the controller, without making its own routing decisions?",
   "choices":["Data plane (forwarding plane)","Control plane","Management plane","Application plane"],"correctAnswer":0},

  # 522 D2 correctAnswer:2
  {"id":"netplus-522","domain":"Network Implementation","type":"single-choice",
   "question":"In a virtualized server environment, multiple virtual machines on the same physical host need to communicate with each other and with the physical network. Which component provides network switching between VMs at the hypervisor level?",
   "choices":["Physical access switch","NIC teaming adapter","Virtual switch (vSwitch)","SDN controller"],"correctAnswer":2},

  # 523 D3 correctAnswer:1
  {"id":"netplus-523","domain":"Network Operations","type":"single-choice",
   "question":"Two firewalls are deployed in a high-availability pair. One firewall actively passes traffic while the other stays synchronized and ready to take over instantly if the primary fails. Which HA mode is this?",
   "choices":["Active-active clustering","Active-passive (standby) failover","Load balancing cluster","N+1 redundancy"],"correctAnswer":1},

  # 524 D3 correctAnswer:3
  {"id":"netplus-524","domain":"Network Operations","type":"single-choice",
   "question":"Hosts on a subnet are configured with a single default gateway IP address. To avoid that gateway being a single point of failure, a protocol is used to present a virtual gateway IP shared by multiple physical routers. Which category of protocols provides this first-hop redundancy?",
   "choices":["STP","LACP","OSPF","FHRP (First Hop Redundancy Protocol)"],"correctAnswer":3},

  # 525 D3 correctAnswer:0
  {"id":"netplus-525","domain":"Network Operations","type":"single-choice",
   "question":"Two routers are running HSRP (Hot Standby Router Protocol) sharing a virtual IP. How is the active HSRP router determined?",
   "choices":["The router with the highest HSRP priority (default 100) becomes active","The router with the lowest IP address becomes active","The router that powers on first always becomes active","The router with the most interfaces becomes active"],"correctAnswer":0},

  # 526 D3 correctAnswer:2
  {"id":"netplus-526","domain":"Network Operations","type":"single-choice",
   "question":"A network engineer prefers an FHRP that is not proprietary to a single vendor. Which first-hop redundancy protocol is defined by an open IETF standard?",
   "choices":["HSRP","GLBP","VRRP","CARP"],"correctAnswer":2},

  # 527 D3 correctAnswer:1
  {"id":"netplus-527","domain":"Network Operations","type":"single-choice",
   "question":"A security team needs to discover all open ports and running services on hosts in a subnet as part of a vulnerability assessment. Which tool is the industry standard for network port scanning and service enumeration?",
   "choices":["Wireshark","Nmap","iPerf","Netflow Analyzer"],"correctAnswer":1},

  # 528 D3 correctAnswer:3
  {"id":"netplus-528","domain":"Network Operations","type":"single-choice",
   "question":"A network engineer needs to capture and decode live packets on a switch interface to analyze malformed frames and diagnose a VoIP issue. Which tool provides a graphical packet capture and protocol analysis capability?",
   "choices":["Nmap","iPerf","Solarwinds NPM","Wireshark"],"correctAnswer":3},

  # 529 D3 correctAnswer:0
  {"id":"netplus-529","domain":"Network Operations","type":"single-choice",
   "question":"A network engineer needs to measure the maximum achievable TCP throughput between two endpoints across a WAN link. Which free, open-source tool generates traffic and measures bandwidth between a client and server?",
   "choices":["iPerf","Wireshark","Nmap","tcpdump"],"correctAnswer":0},

  # 530 D3 correctAnswer:2
  {"id":"netplus-530","domain":"Network Operations","type":"single-choice",
   "question":"A wireless engineer walks through a building with a laptop to measure signal strength, identify channel overlap, and detect rogue APs. Which type of tool is used for this purpose?",
   "choices":["OTDR","Cable certifier","Wi-Fi analyzer","Spectrum analyzer"],"correctAnswer":2},

  # 531 D4 correctAnswer:1
  {"id":"netplus-531","domain":"Network Security","type":"single-choice",
   "question":"A packet filter firewall examines each packet independently, making permit/deny decisions based solely on source IP, destination IP, port, and protocol in the header — without tracking connection state. Which type of firewall is this?",
   "choices":["Stateful firewall","Stateless (packet filtering) firewall","NGFW","WAF"],"correctAnswer":1},

  # 532 D4 correctAnswer:3
  {"id":"netplus-532","domain":"Network Security","type":"single-choice",
   "question":"A firewall tracks the state of active TCP connections and only permits return traffic that belongs to an established session originating from the trusted network. Which type of firewall behavior is described?",
   "choices":["Stateless packet filtering","Application proxy","Deep packet inspection","Stateful inspection"],"correctAnswer":3},

  # 533 D4 correctAnswer:0
  {"id":"netplus-533","domain":"Network Security","type":"single-choice",
   "question":"An organization deploys a firewall that can identify and control applications regardless of port (e.g., blocking Facebook even on port 443), and integrates with threat intelligence to block known malicious IPs. Which type of firewall provides these capabilities?",
   "choices":["Next-Generation Firewall (NGFW)","Stateless ACL firewall","Traditional stateful firewall","Proxy firewall"],"correctAnswer":0},

  # 534 D4 correctAnswer:2
  {"id":"netplus-534","domain":"Network Security","type":"single-choice",
   "question":"A company's e-commerce site is being targeted by SQL injection and cross-site scripting (XSS) attacks against its web application. Which security appliance specifically inspects and filters HTTP/HTTPS traffic to protect web applications from Layer 7 attacks?",
   "choices":["Network IPS","Stateful firewall","WAF (Web Application Firewall)","SIEM"],"correctAnswer":2},

  # 535 D4 correctAnswer:1
  {"id":"netplus-535","domain":"Network Security","type":"single-choice",
   "question":"A security engineer is deploying an IDS to monitor traffic on a core switch. The IDS must not interrupt traffic flow under any circumstances. How should the IDS be connected?",
   "choices":["Inline between the internet router and core switch","Connected to a SPAN/mirror port to receive copies of traffic passively","As an out-of-band management device","In series with the firewall in bridge mode"],"correctAnswer":1},

  # 536 D4 correctAnswer:3
  {"id":"netplus-536","domain":"Network Security","type":"single-choice",
   "question":"An organization needs a security device that can automatically block malicious traffic in real time — dropping packets from a detected attack without waiting for an administrator. Which device must be deployed inline to provide this capability?",
   "choices":["SIEM","IDS","Honeypot","IPS"],"correctAnswer":3},

  # 537 D4 correctAnswer:0
  {"id":"netplus-537","domain":"Network Security","type":"single-choice",
   "question":"A school district must prevent students from accessing social media, gaming, and adult content websites during school hours. Which security technology filters web traffic by category or URL?",
   "choices":["Content/URL filtering","Stateful firewall","IDS","NAC"],"correctAnswer":0},

  # 538 D5 correctAnswer:2
  {"id":"netplus-538","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A laptop connects to a wireless network but shows 'Limited Connectivity' or 'No Internet Access.' The IP address assigned is 169.254.x.x. What is the most likely cause?",
   "choices":["Incorrect WPA2 passphrase preventing association","DNS server is unreachable","DHCP server is unreachable or unavailable","Wireless channel conflict causing packet loss"],"correctAnswer":2},

  # 539 D5 correctAnswer:1
  {"id":"netplus-539","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A cable certifier tests a Cat6 patch cable and reports a 'split pair' fault. What does a split pair fault indicate?",
   "choices":["One wire pair is completely open with no continuity","Wires from different pairs are crossed at the pins, causing crosstalk","A short circuit between two conductors","The cable exceeds the maximum length specification"],"correctAnswer":1},

  # 540 D5 correctAnswer:3
  {"id":"netplus-540","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician suspects a device is communicating through the wrong switch port after a recent desk move. Which command on a Cisco switch displays the learned MAC addresses and their associated ports and VLANs?",
   "choices":["show ip arp","show interfaces","show vlan brief","show mac address-table"],"correctAnswer":3},

  # ── MR 541-543 ──────────────────────────────────────────────────────────────

  # 541 D1 correctAnswers:[0,3]
  {"id":"netplus-541","domain":"Networking Concepts","type":"multiple-response",
   "question":"Which TWO protocols or technologies are used to create overlay networks by tunneling or encapsulating frames/packets over an existing IP infrastructure? (Select 2)",
   "choices":["GRE","OSPF","BGP","VXLAN"],"correctAnswers":[0,3]},

  # 542 D2 correctAnswers:[1,2]
  {"id":"netplus-542","domain":"Network Implementation","type":"multiple-response",
   "question":"An enterprise is deploying controller-based (thin AP) wireless infrastructure. Which TWO are key advantages of controller-based APs over autonomous APs? (Select 2)",
   "choices":["Each AP independently manages its own security and RF settings","Centralized configuration and policy management across all APs","Seamless client roaming handled centrally by the controller","APs function normally without any network connectivity to the controller"],"correctAnswers":[1,2]},

  # 543 D4 correctAnswers:[0,3]
  {"id":"netplus-543","domain":"Network Security","type":"multiple-response",
   "question":"A security architect is evaluating Next-Generation Firewalls (NGFWs) versus traditional stateful firewalls. Which TWO capabilities are found in NGFWs but NOT in traditional stateful firewalls? (Select 2)",
   "choices":["Deep packet inspection (DPI) of application-layer content","Network address translation (NAT)","Stateful connection tracking","Application-aware traffic control regardless of port number"],"correctAnswers":[0,3]},

  # ── Matching 544-545 ──────────────────────────────────────────────────────

  # 544 D1 correctMatches:[2,3,1,0]
  {"id":"netplus-544","domain":"Networking Concepts","type":"matching",
   "question":"Match each IPv6 address type to its correct prefix.",
   "itemsLeft":["Global unicast","Link-local","Unique local (ULA)","Multicast"],
   "itemsRight":["ff00::/8","fc00::/7","2000::/3","fe80::/10"],
   "correctMatches":[2,3,1,0]},

  # 545 D4 correctMatches:[1,0,3,2]
  {"id":"netplus-545","domain":"Network Security","type":"matching",
   "question":"Match each firewall or security appliance type to its defining characteristic.",
   "itemsLeft":["Stateless firewall","Stateful firewall","NGFW","WAF"],
   "itemsRight":["Tracks TCP session state; permits return traffic for established connections","Inspects header fields only; no session tracking","Inspects HTTP/HTTPS to protect against SQLi, XSS, and web app attacks","Identifies and controls applications at Layer 7; integrates threat intelligence"],
   "correctMatches":[1,0,3,2]},

  # ── Ordering 546-547 ──────────────────────────────────────────────────────

  # 546 D2 correctOrder:[1,2,0,3,4]
  {"id":"netplus-546","domain":"Network Implementation","type":"ordering",
   "question":"Arrange the following steps to correctly configure a new VLAN on a Cisco switch.",
   "items":["Assign switch ports to the new VLAN as access ports",
            "Create the VLAN in the switch's VLAN database",
            "Configure a descriptive name for the VLAN",
            "Allow the new VLAN on trunk ports connecting to other switches",
            "Verify VLAN connectivity using ping between hosts in the VLAN"],
   "correctOrder":[1,2,0,3,4]},

  # 547 D5 correctOrder:[0,2,1,3,4]
  {"id":"netplus-547","domain":"Network Troubleshooting","type":"ordering",
   "question":"A wireless client cannot associate with an access point. Arrange these troubleshooting steps in the most logical order.",
   "items":["Verify the client's wireless adapter is enabled and not in airplane mode",
            "Check the SSID name, security type, and passphrase on the client",
            "Confirm the AP is powered on and broadcasting the expected SSID",
            "Review AP logs and event viewer for authentication failure messages",
            "Test with a different client device to determine if the issue is client-specific"],
   "correctOrder":[0,2,1,3,4]},

  # ── SB 548-550 ────────────────────────────────────────────────────────────

  # 548 D2 correctAnswers:[True,False,True,True]
  {"id":"netplus-548","domain":"Network Implementation","type":"statement-block",
   "question":"Evaluate each statement about controller-based wireless infrastructure and indicate whether it is True or False.",
   "statements":["CAPWAP is the IETF-standard protocol used for communication between lightweight APs and a wireless LAN controller.",
                 "Autonomous (fat) APs require a wireless LAN controller to operate and cannot function independently.",
                 "A wireless LAN controller can push configuration and firmware updates to all managed APs simultaneously.",
                 "In controller-based deployments, the WLC centrally manages client roaming between APs to maintain session continuity."],
   "correctAnswers":[True,False,True,True]},

  # 549 D4 correctAnswers:[True,True,False,True]
  {"id":"netplus-549","domain":"Network Security","type":"statement-block",
   "question":"Evaluate each statement about IDS and IPS deployment and indicate whether it is True or False.",
   "statements":["An IDS operates passively and generates alerts without blocking or dropping traffic.",
                 "An IPS is deployed inline and can actively drop or block malicious traffic in real time.",
                 "An IDS must be placed inline between network segments to monitor traffic effectively.",
                 "Both IDS and IPS support signature-based detection that compares traffic against known attack patterns."],
   "correctAnswers":[True,True,False,True]},

  # 550 D1 correctAnswers:[False,True,True,False]
  {"id":"netplus-550","domain":"Networking Concepts","type":"statement-block",
   "question":"Evaluate each statement about SD-WAN and indicate whether it is True or False.",
   "statements":["SD-WAN requires dedicated MPLS circuits and cannot utilize broadband internet or LTE links.",
                 "SD-WAN uses a centralized controller or orchestrator to manage WAN policies across all branch sites.",
                 "SD-WAN can dynamically route application traffic over the best available link based on real-time quality metrics.",
                 "Deploying SD-WAN eliminates the need for encryption on WAN tunnels between branch sites."],
   "correctAnswers":[False,True,True,False]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
