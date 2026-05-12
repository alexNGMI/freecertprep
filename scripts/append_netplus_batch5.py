import json

with open('src/data/comptia-net-plus-questions.json') as f:
    data = json.load(f)

batch5 = [
  {
    "id": "netplus-201",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which WAN technology uses label-switching at Layer 2.5 to forward traffic, enabling traffic engineering, QoS, and Layer 3 VPN services across a provider backbone?",
    "choices": [
      "MPLS (Multiprotocol Label Switching)",
      "DSL (Digital Subscriber Line) over copper local loop",
      "Cable broadband over hybrid fiber-coaxial (HFC)",
      "T1 dedicated 1.544 Mbps leased line"
    ],
    "correctAnswer": 0,
    "explanation": "MPLS operates between Layers 2 and 3, using short fixed-length labels to forward packets at high speed. It enables traffic engineering (directing traffic along specific paths), QoS differentiation, and Layer 3 VPNs (L3VPN using BGP/VRFs) across a single provider infrastructure."
  },
  {
    "id": "netplus-202",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "A company needs a WAN connection with guaranteed symmetric bandwidth and an SLA for latency and uptime. Which WAN technology best meets this requirement?",
    "choices": [
      "DSL (best-effort, asymmetric, no guaranteed speed)",
      "Cable broadband (shared medium, asymmetric, variable speed)",
      "Satellite (high latency, variable bandwidth based on atmospheric conditions)",
      "Dedicated Ethernet circuit / leased line (guaranteed committed bandwidth and SLA)"
    ],
    "correctAnswer": 3,
    "explanation": "Dedicated circuits (Metro Ethernet, point-to-point T1/E1, or MPLS with guaranteed CIR) provide symmetric bandwidth and carrier SLAs covering uptime, latency, and jitter. DSL and cable are shared, best-effort services unsuitable for applications requiring strict performance guarantees."
  },
  {
    "id": "netplus-203",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which tunneling protocol encapsulates any Layer 3 protocol inside an IP tunnel without providing encryption, making it commonly used in combination with IPsec for secure GRE/IPsec VPNs?",
    "choices": [
      "L2TP — tunnels Layer 2 PPP frames with optional IPsec encryption",
      "PPTP — tunnels PPP with MPPE encryption (deprecated)",
      "VXLAN — encapsulates Ethernet frames inside UDP for data center overlays",
      "GRE (Generic Routing Encapsulation) — encapsulates any L3 protocol without encryption"
    ],
    "correctAnswer": 3,
    "explanation": "GRE (RFC 2784) wraps any routable protocol inside a GRE header and an IP header. It provides no encryption or authentication — IPsec is paired with GRE to add security. GRE tunnels allow routing protocols (OSPF, EIGRP) to run between sites over an IP WAN, which IPsec-only tunnels do not support natively."
  },
  {
    "id": "netplus-204",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the default administrative distance (AD) of OSPF on a Cisco router?",
    "choices": [
      "90 (EIGRP internal routes)",
      "110",
      "120 (RIP routes)",
      "170 (EIGRP external routes)"
    ],
    "correctAnswer": 1,
    "explanation": "Administrative distance ranks routing information sources: lower AD is preferred. Cisco defaults: Connected=0, Static=1, EIGRP internal=90, OSPF=110, RIP=120. When multiple protocols advertise the same destination, the lowest-AD route is installed. OSPF's AD of 110 makes it preferred over RIP (120) but not over EIGRP internal (90)."
  },
  {
    "id": "netplus-205",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which type of DNS server stores the official records for a domain and provides definitive (non-cached) answers about that domain's hostnames?",
    "choices": [
      "Authoritative nameserver — holds the zone file and provides canonical answers",
      "Recursive resolver (caching server) — queries other servers on behalf of clients",
      "Root nameserver — knows only which servers handle each TLD",
      "TLD nameserver — knows which authoritative servers handle each domain under its TLD"
    ],
    "correctAnswer": 0,
    "explanation": "The authoritative nameserver holds the zone file for a domain and is the definitive source for records like A, AAAA, MX, CNAME, and TXT. It answers with the AA (Authoritative Answer) bit set. Recursive resolvers cache answers from authoritative servers and serve cached results to clients."
  },
  {
    "id": "netplus-206",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which storage networking protocol provides block-level storage access over a standard IP/Ethernet network, making it a cost-effective alternative to native Fibre Channel SANs?",
    "choices": [
      "NFS (Network File System) — provides file-level access, not block-level",
      "iSCSI (Internet Small Computer Systems Interface) — block-level SCSI over IP",
      "CIFS/SMB — file-level Windows file sharing protocol",
      "FTP — file transfer protocol, not a block storage protocol"
    ],
    "correctAnswer": 1,
    "explanation": "iSCSI encapsulates SCSI commands and data blocks inside TCP/IP packets, enabling servers to access remote block storage over standard Ethernet. It is far less expensive than native Fibre Channel (which requires dedicated HBAs, switches, and cabling) while providing similar block-level storage functionality."
  },
  {
    "id": "netplus-207",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the IPv4 multicast address range?",
    "choices": [
      "100.64.0.0/10 — Carrier-Grade NAT shared address space",
      "169.254.0.0/16 — APIPA link-local addresses",
      "240.0.0.0/4 — Class E, reserved for future use and experimentation",
      "224.0.0.0/4 — Class D, reserved for multicast group addresses"
    ],
    "correctAnswer": 3,
    "explanation": "IPv4 multicast uses the 224.0.0.0/4 (Class D) range: 224.0.0.0 to 239.255.255.255. Within this range, 224.0.0.0/24 is reserved for link-local multicast (OSPF uses 224.0.0.5/6; RIP uses 224.0.0.9); 239.0.0.0/8 is reserved for administratively scoped (private) multicast."
  },
  {
    "id": "netplus-208",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "Which antenna type radiates RF energy equally in all horizontal directions (360°), making it the standard choice for providing general wireless coverage in an open office environment?",
    "choices": [
      "Omnidirectional antenna — uniform 360° horizontal radiation pattern",
      "Yagi (directional) — narrow beam for long-range point-to-point links",
      "Parabolic dish — highly directional for very long-range point-to-point",
      "Patch/panel (sector) antenna — directional, covers a specific sector"
    ],
    "correctAnswer": 0,
    "explanation": "Omnidirectional antennas radiate equally in all horizontal directions (though not vertically — coverage is more of a torus shape). They are ideal for indoor APs providing coverage to surrounding devices in all directions. Directional antennas (Yagi, parabolic, patch) focus energy in a specific direction for longer range but narrower coverage."
  },
  {
    "id": "netplus-209",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "A network technician is running Ethernet cable through a ceiling space that serves as the HVAC return air plenum. Which cable jacket rating is required?",
    "choices": [
      "Riser (CMR) — rated for vertical runs in riser shafts between building floors",
      "Plenum (CMP) — low smoke, low flame-spread rating for air-handling spaces",
      "General purpose (CMG) — basic indoor rating for walls and conduit",
      "Direct burial (OSP) — rated for outdoor underground installation"
    ],
    "correctAnswer": 1,
    "explanation": "Plenum-rated (CMP) cable uses a special jacket material (FEP or low-smoke PVC) that produces minimal toxic smoke and has a low flame-spread rate. This is required by building codes in air-handling plenums because combustion products would be distributed throughout the building by the HVAC system. Riser cable (CMR) is acceptable for vertical runs in riser shafts but NOT in plenums."
  },
  {
    "id": "netplus-210",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "Which fiber optic connector type uses a small push-pull latch mechanism and is the standard connector for SFP and SFP+ modules in enterprise switching?",
    "choices": [
      "ST (Straight Tip) — bayonet quarter-turn lock",
      "SC (Subscriber Connector) — push-pull with a larger square body",
      "LC (Lucent Connector) — compact push-pull, half the size of SC",
      "FC (Ferrule Connector) — threaded coupling for high-vibration environments"
    ],
    "correctAnswer": 2,
    "explanation": "LC connectors use a compact RJ-45-style latch mechanism and a 1.25mm ferrule. Their small form factor makes them the standard for SFP/SFP+ transceivers in switches and routers. SC connectors (2.5mm ferrule, larger body) are common in older installations and patch panels. ST uses a bayonet twist-lock."
  },
  {
    "id": "netplus-211",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "What is the key technical difference between UPC (Ultra Physical Contact) and APC (Angled Physical Contact) fiber optic connector end-face polishing?",
    "choices": [
      "UPC connectors are designed for multimode fiber; APC connectors are designed for single-mode fiber only",
      "APC connectors have an 8-degree angled end face that reflects back-reflection away from the fiber core, achieving lower return loss than UPC",
      "UPC polishing supports longer transmission distances than APC at the same wavelength and power",
      "APC (green) and UPC (blue) connectors use the same ferrule angle and are physically interoperable"
    ],
    "correctAnswer": 1,
    "explanation": "APC connectors have an 8° angled end face (green body). The angle causes back-reflections to exit at an angle away from the fiber core rather than traveling back toward the source, achieving return loss >60 dB vs ~50 dB for UPC. APC and UPC are NOT interoperable — connecting them causes high insertion loss. APC is preferred for CATV and PON; UPC for data center."
  },
  {
    "id": "netplus-212",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "A PoE+ (802.3at) switch port is configured and a connected IP phone draws 25 watts. What occurs?",
    "choices": [
      "The switch err-disables the port after detecting sustained draw above the negotiated 15.4 W baseline",
      "The phone receives up to 30 W available from the port — the 25 W draw is within 802.3at spec and operates normally",
      "The switch falls back to 802.3af (PoE) and limits power to 15.4 W, reducing phone functionality",
      "The phone must send LLDP-MED power negotiation frames requesting power above the 802.3at default"
    ],
    "correctAnswer": 1,
    "explanation": "802.3at (PoE+) provides up to 30 W at the PSE (switch port). A device drawing 25 W is within the 802.3at power budget and operates normally. The switch does not limit or err-disable the port. PoE classification occurs via LLDP-MED or hardware detection, but a device drawing within spec requires no special negotiation."
  },
  {
    "id": "netplus-213",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "Which tool actively sweeps a range of IP addresses by sending ICMP echo requests to identify which hosts are currently online?",
    "choices": [
      "Ping sweep (fping, nmap -sn, Advanced IP Scanner)",
      "SNMP polling — retrieves OID values from managed devices",
      "NetFlow collector — analyzes exported flow records from routers",
      "Syslog server — aggregates log messages from network devices"
    ],
    "correctAnswer": 0,
    "explanation": "A ping sweep rapidly probes an IP address range with ICMP echo requests to determine host availability without logging in to any device. Tools like fping (parallel pings) or nmap -sn (host discovery without port scanning) are common. This is a fundamental network discovery and inventory technique."
  },
  {
    "id": "netplus-214",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What is the primary function of a port scanner such as Nmap?",
    "choices": [
      "Identifies which TCP and UDP ports are open on a target host, revealing the services running on it",
      "Tests optical signal attenuation (dB loss) along a fiber cable run",
      "Polls SNMP OIDs on managed devices to collect performance counters",
      "Captures and decodes packet-level network traffic for protocol analysis"
    ],
    "correctAnswer": 0,
    "explanation": "Port scanners probe TCP/UDP ports on target hosts (SYN scan, connect scan, UDP scan) to determine which are open (service listening), closed (no service), or filtered (firewall blocking). Nmap is the most widely used tool, supporting OS fingerprinting, service version detection, and scripted vulnerability checks."
  },
  {
    "id": "netplus-215",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "Which SNMP operation is initiated by the network management system (NMS) to request the current value of a specific object identifier (OID) from a managed device's agent?",
    "choices": [
      "SNMP TRAP — agent-initiated asynchronous notification to the NMS",
      "SNMP SET — NMS writes a new value to an OID on the agent",
      "SNMP WALK — NMS iteratively retrieves an entire MIB subtree",
      "SNMP GET — NMS requests the current value of one specific OID from the agent"
    ],
    "correctAnswer": 3,
    "explanation": "SNMP GET is a poll-based operation: the NMS sends a GET request specifying an OID; the agent responds with the current value. SNMP GETBULK retrieves multiple OIDs efficiently. SNMP WALK uses GETNEXT to traverse an OID subtree. SNMP SET writes a value. SNMP TRAP/INFORM are agent-initiated notifications."
  },
  {
    "id": "netplus-216",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What is the purpose of RMON (Remote Network Monitoring)?",
    "choices": [
      "Provides encrypted out-of-band remote command-line access to network devices",
      "Embeds monitoring capability in a network device's SNMP agent so it can collect traffic statistics locally and proactively report them to the NMS",
      "Routes management traffic through an isolated OOB management network",
      "Generates synthetic probe traffic to measure path performance metrics like jitter and packet loss"
    ],
    "correctAnswer": 1,
    "explanation": "RMON (RFC 2819/3577) extends SNMP by embedding monitoring probes directly in devices. The probe collects statistics locally (packet counts, error rates, top talkers, conversations) without continuous NMS polling, reducing management traffic. Results are stored in RMON MIBs and retrieved by the NMS on demand or via alarms."
  },
  {
    "id": "netplus-217",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "Which wireless security vulnerability allows an attacker to recover the WPS PIN in under 24 hours due to a design flaw that verifies the 8-digit PIN in two independent halves?",
    "choices": [
      "WPA2 KRACK (Key Reinstallation Attack) — replays cryptographic handshake messages",
      "PMKID attack — extracts the PMKID from a single EAPOL frame without capturing a full handshake",
      "WPS (Wi-Fi Protected Setup) PIN brute-force — the split validation reduces the keyspace from 10^8 to ~10^4 + 10^3",
      "Beacon frame injection — forges management frames to deauthenticate legitimate clients"
    ],
    "correctAnswer": 2,
    "explanation": "WPS PIN validation has a critical flaw: the 8-digit PIN is verified in two halves (first 4 and last 4 digits), with the router confirming the first half before the second. This reduces the search space from 100,000,000 combinations to 10,000 + 1,000 = 11,000. Tools like Reaver can recover most WPS PINs in hours. Disable WPS on all APs."
  },
  {
    "id": "netplus-218",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What is the primary security benefit of implementing micro-segmentation in a zero trust network architecture?",
    "choices": [
      "It eliminates the need for encryption by keeping traffic within physically isolated segments",
      "It enforces granular east-west traffic controls between workloads — even within the same subnet — limiting lateral movement after a breach",
      "It replaces traditional VLANs with a flat network design, simplifying management",
      "It allows all internal workloads to communicate without firewall inspection to maximize performance"
    ],
    "correctAnswer": 1,
    "explanation": "Micro-segmentation applies identity-based and workload-level policies to east-west (server-to-server) traffic, not just north-south (client-to-internet) traffic. If an attacker compromises one workload, micro-segmentation prevents lateral movement to adjacent systems by enforcing least-privilege communication policies between individual workloads."
  },
  {
    "id": "netplus-219",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "A security team deploys a server that appears to be a legitimate production system containing fake data, designed solely to detect and analyze unauthorized access attempts. What is this system called?",
    "choices": [
      "A honeypot — a decoy system designed to lure and observe attacker activity",
      "A DMZ server — a publicly accessible server in the perimeter network",
      "A network intrusion prevention system (NIPS) — inline traffic blocking device",
      "A bastion host — a hardened jump server providing controlled access to internal systems"
    ],
    "correctAnswer": 0,
    "explanation": "A honeypot is a deliberately vulnerable or realistic-looking decoy system with no production value. Any interaction with it is suspicious by definition, generating high-fidelity alerts. A honeynet is a collection of honeypots forming a fake network. They help defenders learn attacker TTPs and detect compromised systems on the network."
  },
  {
    "id": "netplus-220",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "Which security model requires continuous verification of every user and device regardless of network location, rejecting the assumption that anything inside the perimeter can be trusted?",
    "choices": [
      "Defense in depth — layering multiple security controls",
      "Role-based access control (RBAC) — assigning permissions by job function",
      "Zero trust — never trust, always verify; assume breach is possible anywhere",
      "Network segmentation — dividing the network into trust zones using VLANs"
    ],
    "correctAnswer": 2,
    "explanation": "Zero trust (NIST SP 800-207) treats every access request as potentially hostile, regardless of whether it originates inside or outside the network perimeter. It requires strong identity verification, device health posture checks, least-privilege access, and continuous session monitoring — eliminating the concept of a trusted internal network."
  },
  {
    "id": "netplus-221",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "An OSPF neighbor relationship is stuck in the EXSTART state. What is the most likely cause?",
    "choices": [
      "The two routers have different OSPF process IDs configured",
      "An MTU mismatch is preventing successful Database Description (DBD) packet exchange",
      "The OSPF hello interval or dead timer values do not match between the neighbors",
      "The routers are in different OSPF areas and cannot establish adjacency"
    ],
    "correctAnswer": 1,
    "explanation": "EXSTART is the state where master/slave negotiation begins and DBD packets are exchanged. If one router's interface MTU is larger than the other's, its DBD packets are too large to be accepted, and the adjacency stalls in EXSTART/EXCHANGE. Use ip ospf mtu-ignore to override, or fix the MTU mismatch. Hello/dead timer mismatches prevent reaching the INIT state."
  },
  {
    "id": "netplus-222",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A fiber optic link shows no light (Rx power = 0) after replacing the SFP transceiver on both ends. What should the technician check next?",
    "choices": [
      "The spanning tree port state — STP may be blocking the port",
      "The VLAN assignment configured on the switch port",
      "Fiber cable polarity and connector cleanliness — dirty or reversed connectors are the leading cause of fiber link failures",
      "The IP address configuration on the connected devices"
    ],
    "correctAnswer": 2,
    "explanation": "After ruling out faulty SFPs, the most common cause of no-light fiber issues is a dirty or damaged connector (dust caps left off, oil from fingerprints, scratches). Use a fiber inspection microscope to check the end face and a fiber cleaner to clean. Also verify polarity — TX on one end must connect to RX on the other; some fiber cables are crossed incorrectly."
  },
  {
    "id": "netplus-223",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A wireless client authenticates and associates to an AP successfully but receives no DHCP address, while wired clients on the same VLAN obtain addresses normally. What is the most likely cause?",
    "choices": [
      "The wireless client has an incompatible NIC driver that corrupts DHCP packets",
      "Wireless client isolation is enabled on the AP, preventing the client's DHCP broadcast from being forwarded",
      "The AP has insufficient PoE power budget to handle both association and DHCP processing simultaneously",
      "The DHCP server has no scopes defined for wireless client IP addresses"
    ],
    "correctAnswer": 1,
    "explanation": "Client isolation (AP isolation) blocks unicast and broadcast traffic between wireless clients and, in some implementations, between wireless clients and the wired network. This can prevent DHCP DISCOVER broadcasts from reaching the server. Since wired clients work, the DHCP server and scope are fine — the issue is the AP's client isolation or VLAN forwarding configuration."
  },
  {
    "id": "netplus-224",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "Which interface counter on a router indicates that outbound packets were discarded because the transmit queue was full — signaling link congestion?",
    "choices": [
      "Input errors — inbound frames that failed FCS or were too small/large",
      "CRC errors — frames with checksum errors indicating physical layer corruption",
      "Runts — frames below the minimum 64-byte Ethernet size",
      "Output drops — packets discarded when the output queue overflowed"
    ],
    "correctAnswer": 3,
    "explanation": "Output drops (output queue drops) indicate that packets arrived for transmission faster than the interface could send them, filling the queue to capacity. Excess packets are dropped. This is a congestion indicator — the interface is over-subscribed. QoS, traffic shaping, or bandwidth upgrades are the remedies."
  },
  {
    "id": "netplus-225",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What problem is SD-WAN (Software-Defined Wide Area Network) primarily designed to solve?",
    "choices": [
      "Encrypting wireless traffic between branch offices and headquarters over Wi-Fi",
      "Extending Layer 2 VLAN segments across WAN links between branch offices",
      "Replacing all private WAN circuits with satellite broadband connections",
      "Abstracting the WAN transport (MPLS, broadband, LTE) and applying centralized traffic policies to simplify branch WAN management"
    ],
    "correctAnswer": 3,
    "explanation": "SD-WAN decouples WAN policy from the underlying transport, allowing a central controller to dynamically route traffic over the best available path (MPLS for critical apps, broadband for general traffic, LTE for failover) based on application-aware policies. It reduces WAN costs by leveraging cheaper internet circuits alongside or replacing expensive MPLS."
  },
  {
    "id": "netplus-226",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "A packet arrives at a router with a TTL value of 1. The router needs to forward it to the next hop. What happens?",
    "choices": [
      "The router forwards the packet without decrementing the TTL, since 1 is the minimum allowed",
      "The router decrements the TTL to 0, discards the packet, and sends an ICMP Time Exceeded (Type 11) message to the original source",
      "The router resets the TTL to 64 and forwards the packet normally",
      "The router drops the packet silently without generating any notification"
    ],
    "correctAnswer": 1,
    "explanation": "Every router decrements the TTL by 1 before forwarding. When the TTL reaches 0, the router discards the packet and sends an ICMP Type 11 (Time Exceeded) message to the source IP. Traceroute exploits this by sending probes with TTL=1, 2, 3... to map each hop."
  },
  {
    "id": "netplus-227",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "What is the purpose of a patch panel in a structured cabling system?",
    "choices": [
      "Amplifies Ethernet signals on long cable runs to maintain signal integrity",
      "Converts optical fiber signals to electrical signals for connection to copper-based switches",
      "Provides a centralized, organized termination point for horizontal cable runs, enabling flexible port assignment via short patch cords",
      "Filters broadcast traffic between floors to reduce broadcast domain size"
    ],
    "correctAnswer": 2,
    "explanation": "Patch panels terminate horizontal cable runs (from wall jacks) in a central location (IDF/MDF). Patch cords then connect patch panel ports to switch ports, enabling any wall jack to be connected to any switch port without rewiring. This makes moves, adds, and changes (MACs) fast and organized."
  },
  {
    "id": "netplus-228",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "A building's network requires 10 Gbps inter-floor uplinks between distribution switches located 80 meters apart. Which cabling option is appropriate?",
    "choices": [
      "Cat5e UTP — supports 1 Gbps at 100 m, not 10 Gbps",
      "Cat6 UTP — supports 10 Gbps only up to 55 m, insufficient for 80 m",
      "Cat6a UTP or multimode fiber — both support 10 Gbps at the full 100-meter distance",
      "Coaxial cable — used for legacy Ethernet and cable TV, not modern structured cabling"
    ],
    "correctAnswer": 2,
    "explanation": "Cat6a (augmented Category 6) extends 10GBASE-T to the full 100-meter horizontal segment. Multimode fiber (OM3/OM4) supports 10 Gbps at up to 300–400 meters. Both are appropriate for 80-meter inter-floor uplinks. Cat6 supports 10 Gbps only up to 55 m, making it unsuitable for this run."
  },
  {
    "id": "netplus-229",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What is an out-of-band (OOB) management network, and why is it important?",
    "choices": [
      "A physically separate network path for device management that remains accessible even when the production data network has failed",
      "A dedicated VLAN on the production network used to carry SNMP polling traffic to all managed devices",
      "An encrypted VPN overlay for secure remote management of devices over the internet",
      "A secondary internet connection used when the primary WAN link goes down"
    ],
    "correctAnswer": 0,
    "explanation": "OOB management uses a dedicated physical or logical path (console servers, dedicated management ports, OOBM network) separate from the production data path. When a misconfigured device or network failure blocks in-band access, OOB provides a lifeline for administrators to reach and remediate the device without physical presence."
  },
  {
    "id": "netplus-230",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "Which SNMP operation allows the NMS to write a new configuration value to an OID on a managed device, enabling remote configuration changes?",
    "choices": [
      "SNMP GET — reads a single OID value from the agent",
      "SNMP GETBULK — efficiently retrieves multiple OID values in one request",
      "SNMP INFORM — a trap with acknowledgment requiring the NMS to confirm receipt",
      "SNMP SET — writes a new value to an OID, modifying the device configuration"
    ],
    "correctAnswer": 3,
    "explanation": "SNMP SET allows the NMS to modify writable OIDs on a managed device — for example, changing an interface description, toggling an interface state, or updating a contact string. SNMP SET requires write community string access (v1/v2c) or write-enabled credentials (v3). It is often restricted for security."
  },
  {
    "id": "netplus-231",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "A router ACL ends with the statement 'deny ip any any'. What is the purpose and significance of this explicit rule?",
    "choices": [
      "An implicit permit — it allows all traffic not matched by earlier permit rules",
      "A catch-all logging rule — it logs unmatched traffic without blocking it",
      "An explicit deny-all that blocks unmatched traffic and can be configured with the 'log' keyword to audit dropped traffic",
      "A default route override that drops packets with no matching route entry"
    ],
    "correctAnswer": 2,
    "explanation": "Most platforms have an implicit deny-all at the end of every ACL, but adding an explicit 'deny ip any any log' makes this behavior visible in the configuration, aids documentation, and enables logging of dropped traffic for security auditing. Without the 'log' keyword on the explicit or implicit deny, dropped packets leave no trace."
  },
  {
    "id": "netplus-232",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What is the most effective physical security control to prevent unauthorized devices from being connected to unused switch ports in public or visitor areas?",
    "choices": [
      "DHCP snooping — prevents rogue DHCP servers but does not block device connectivity",
      "Inbound ACLs on the router uplink — filters traffic after the device has already connected",
      "Administratively shutting down all unused switch ports and placing them in an unused VLAN",
      "Storm control — limits broadcast/multicast traffic from unauthorized devices"
    ],
    "correctAnswer": 2,
    "explanation": "Shutting down unused ports (interface shutdown) and assigning them to an isolated, unused VLAN ensures that plugging in a device to an unused port produces no connectivity. This is the primary port hardening recommendation. 802.1X adds authentication but requires a more complex infrastructure; a shutdown port provides immediate protection with no additional dependencies."
  },
  {
    "id": "netplus-233",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What type of volumetric denial-of-service attack floods a target with a large volume of connectionless packets sent to random destination ports, exhausting server resources and potentially overwhelming network links?",
    "choices": [
      "SYN flood — exploits TCP three-way handshake, filling the half-open connection table",
      "ICMP flood — overwhelms the target with ping requests (Ping of Death / Smurf attack)",
      "UDP flood — sends high-volume UDP datagrams to random ports, exhausting CPU and bandwidth",
      "ARP poisoning — corrupts ARP caches to redirect traffic rather than exhaust bandwidth"
    ],
    "correctAnswer": 2,
    "explanation": "A UDP flood sends large volumes of UDP packets to random ports on a target. The target must process each packet to determine if a service is listening (and send ICMP Port Unreachable if not), consuming CPU and bandwidth. UDP floods are commonly amplified using misconfigured UDP-based services (DNS, NTP, memcached) in DRDoS attacks."
  },
  {
    "id": "netplus-234",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A technician runs 'show ip ospf neighbor' and sees a neighbor listed in the FULL state. What does FULL indicate?",
    "choices": [
      "The two OSPF routers have fully synchronized their Link-State Databases and are exchanging LSAs normally — healthy adjacency",
      "The OSPF neighbor relationship has failed and the session needs to be manually reset",
      "The routers are still in the process of exchanging LSAs and have not yet converged",
      "The neighbor is a stub router that receives only a default route and no full LSA updates"
    ],
    "correctAnswer": 0,
    "explanation": "OSPF FULL is the desired, stable state indicating that the two routers have completed LSDB synchronization and are operating as full OSPF neighbors. The progression is: Down → Init → 2-Way → ExStart → Exchange → Loading → Full. Any state other than Full (or 2-Way on DR/BDR non-adjacencies) indicates a problem."
  },
  {
    "id": "netplus-235",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A switch port is showing as err-disabled. What should the technician do first before attempting to re-enable the port?",
    "choices": [
      "Immediately re-enable the port using 'no shutdown' to restore connectivity as quickly as possible",
      "Reload the switch to clear all err-disabled states across all interfaces",
      "Replace the physical cable and transceiver connected to the port",
      "Run 'show interfaces status err-disabled' or 'show errdisable recovery' to identify the specific cause before taking action"
    ],
    "correctAnswer": 3,
    "explanation": "Err-disable is a safety mechanism triggered by specific events: BPDU Guard violation (unauthorized switch), port security violation (too many MACs), UDLD (unidirectional link), etc. Re-enabling without investigation causes the port to immediately err-disable again. Identify the cause first, fix the root issue, then re-enable or configure errdisable recovery."
  },
  {
    "id": "netplus-236",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A user's laptop connects to the corporate Wi-Fi SSID but cannot browse the internet while all other wireless users on the same SSID work fine. What should the technician check first?",
    "choices": [
      "Whether the AP serving that user is rebooting frequently due to a PoE power issue",
      "Whether the wireless LAN controller is processing too many client associations",
      "Whether the corporate internet circuit is experiencing an outage",
      "The laptop's IP configuration — it may have an APIPA address, a static IP conflict, or incorrect DNS server settings"
    ],
    "correctAnswer": 3,
    "explanation": "Since only this one laptop is affected, the issue is almost certainly local to the device. The first step is checking the IP configuration (ipconfig /all): look for an APIPA address (169.254.x.x) indicating DHCP failure, a static IP conflicting with another device, or wrong DNS server settings. If other users work fine, the network infrastructure is not the issue."
  },
  {
    "id": "netplus-237",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the key distinction between a public IP address and a private IP address?",
    "choices": [
      "Private IP addresses can only be assigned to networks with fewer than 254 host devices",
      "Public IP addresses are encrypted in transit by default; private addresses transmit in cleartext",
      "Public IP addresses are assigned by DHCP; private IP addresses must always be statically configured",
      "Public IP addresses are globally routable on the internet; private IP addresses (RFC 1918) are not internet-routable and require NAT for internet access"
    ],
    "correctAnswer": 3,
    "explanation": "RFC 1918 defines three private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) that internet routers are required to drop. Private addresses are free to use internally without registration but require NAT (PAT) to communicate with internet hosts. Public addresses are assigned by RIRs (ARIN, RIPE, APNIC) and are globally unique and routable."
  },
  {
    "id": "netplus-238",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "What is a network demarcation point (demarc), and why is it significant?",
    "choices": [
      "The physical point where the ISP's responsibility for the network ends and the customer's (CPE) responsibility begins",
      "The logical boundary between two routing domains, defined in the BGP configuration",
      "The internal interface between Layer 2 switching and Layer 3 routing within a distribution switch",
      "The firewall policy boundary separating the DMZ from the internal corporate network"
    ],
    "correctAnswer": 0,
    "explanation": "The demarc (demarcation point) is the physical location — typically an NID (Network Interface Device) or demarc block — where the service provider's infrastructure ends and the customer's premises equipment (CPE) begins. It defines ownership and support responsibility: the ISP troubleshoots problems on their side; the customer is responsible for everything beyond the demarc."
  },
  {
    "id": "netplus-239",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "A technician needs to review bandwidth utilization trends on a core switch uplink over the past 30 days. Which tool provides this historical data?",
    "choices": [
      "Wireshark packet capture on the uplink — captures real-time traffic but does not store historical statistics",
      "Ping — measures current round-trip latency but not bandwidth utilization history",
      "netstat -an on the switch — shows current connections, not historical bandwidth data",
      "SNMP-based graphing tool (MRTG, PRTG, Cacti) polling the interface OIDs and storing historical counters"
    ],
    "correctAnswer": 3,
    "explanation": "SNMP-based graphing tools poll interface OIDs (ifInOctets, ifOutOctets) at regular intervals (5 minutes), compute utilization percentages, and store the data for trend analysis. They provide historical graphs over days, weeks, or months — essential for capacity planning, SLA reporting, and identifying recurring congestion patterns."
  },
  {
    "id": "netplus-240",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What is the purpose of defining network security zones in a firewall policy?",
    "choices": [
      "Groups network interfaces with similar trust levels so that consistent policies govern traffic flowing between zones (e.g., untrusted → DMZ → trusted)",
      "Automatically creates encrypted IPsec tunnels between all subnets within the same zone",
      "Restricts the maximum number of VLANs that can be configured on the core switch",
      "Defines which routing protocols are permitted to advertise routes across zone boundaries"
    ],
    "correctAnswer": 0,
    "explanation": "Zone-based firewall policies (Cisco ZBF, Palo Alto security zones, pfSense zones) group interfaces by trust level and apply policies to traffic flowing between zones. Common zones: Untrusted (internet), DMZ (public servers), Trusted (internal LAN), Management. Inter-zone traffic is blocked by default unless explicitly permitted, following least-privilege principles."
  },
  {
    "id": "netplus-241",
    "domain": "Networking Concepts",
    "type": "multiple-response",
    "question": "Which TWO WAN connection types use a shared infrastructure where bandwidth is not dedicated and may vary based on other users' activity? (Select two)",
    "choices": [
      "DSL (Digital Subscriber Line over the local copper loop)",
      "Dedicated point-to-point leased line (T1/E1) with guaranteed CIR",
      "Cable broadband over HFC (Hybrid Fiber-Coaxial) shared plant",
      "MPLS private WAN with a guaranteed Committed Information Rate (CIR)"
    ],
    "correctAnswers": [0, 2],
    "explanation": "DSL uses shared DSLAM infrastructure, and cable broadband uses a shared coaxial plant within a neighborhood — both are best-effort services where actual throughput varies with congestion. Dedicated leased lines and MPLS circuits with CIR guarantee committed bandwidth regardless of other users' activity."
  },
  {
    "id": "netplus-242",
    "domain": "Network Operations",
    "type": "multiple-response",
    "question": "Which TWO items should be included in a network device hardening checklist? (Select two)",
    "choices": [
      "Change all default usernames and passwords before connecting devices to the network",
      "Enable Telnet alongside SSH to ensure management access if SSH fails",
      "Configure NTP on all devices to synchronize clocks for accurate log correlation",
      "Enable all switch ports, including unused ones, to ensure full network coverage"
    ],
    "correctAnswers": [0, 2],
    "explanation": "Device hardening requires changing default credentials (attackers know factory defaults) and synchronizing clocks via NTP (essential for correlating log timestamps across devices during incident investigation). Telnet is insecure and should be disabled; unused ports should be shut down and assigned to an isolated VLAN, not enabled."
  },
  {
    "id": "netplus-243",
    "domain": "Network Troubleshooting",
    "type": "multiple-response",
    "question": "A BGP session to an upstream ISP has dropped. Which TWO items should the network administrator check first? (Select two)",
    "choices": [
      "Verify that the WAN interface is in an 'up/up' state and that physical connectivity is intact",
      "Check that the local OSPF process is running correctly and all area adjacencies are healthy",
      "Confirm the BGP neighbor's IP address, remote AS number, and MD5 authentication key match the ISP's expected configuration",
      "Verify that all access layer switches are running a consistent IOS version"
    ],
    "correctAnswers": [0, 2],
    "explanation": "BGP sessions require: (1) reachable peer IP address — verify physical link and WAN interface status; (2) correct neighbor statement — mismatched peer IP, remote AS, or MD5 authentication key are the most common BGP configuration errors. OSPF and access layer switches are internal LAN issues unrelated to the ISP BGP session."
  },
  {
    "id": "netplus-244",
    "domain": "Network Implementation",
    "type": "matching",
    "question": "Match each fiber optic connector to its distinguishing physical characteristic.",
    "itemsLeft": ["LC", "SC", "ST", "FC"],
    "itemsRight": [
      "Threaded ferrule coupling for high-vibration environments",
      "Bayonet quarter-turn lock, square body, common in older LAN installations",
      "Compact push-pull latch, 1.25mm ferrule, standard for SFP modules",
      "Push-pull latch, 2.5mm ferrule, large square body"
    ],
    "correctMatches": [2, 3, 1, 0],
    "explanation": "LC (Lucent Connector): compact push-pull, 1.25mm ferrule, SFP standard (index 2). SC (Subscriber Connector): push-pull, 2.5mm ferrule, large square body (index 3). ST (Straight Tip): bayonet quarter-turn, square body, older campus LANs (index 1). FC (Ferrule Connector): threaded coupling for vibration resistance in industrial/telecom (index 0)."
  },
  {
    "id": "netplus-245",
    "domain": "Networking Concepts",
    "type": "matching",
    "question": "Match each IP address to its correct classification.",
    "itemsLeft": ["10.0.0.1", "172.32.0.1", "192.168.1.1", "8.8.8.8"],
    "itemsRight": [
      "Private RFC 1918 — 192.168.0.0/16 range",
      "Public — globally routable",
      "Private RFC 1918 — 10.0.0.0/8 range",
      "Public — 172.32.x.x is outside the private 172.16.0.0/12 range"
    ],
    "correctMatches": [2, 3, 0, 1],
    "explanation": "10.0.0.1 is in 10.0.0.0/8 (RFC 1918 private, index 2). 172.32.0.1 is NOT private — the RFC 1918 private range is only 172.16.0.0 to 172.31.255.255 (/12); 172.32.x.x is public (index 3). 192.168.1.1 is in 192.168.0.0/16 (RFC 1918 private, index 0). 8.8.8.8 is Google's public DNS (index 1)."
  },
  {
    "id": "netplus-246",
    "domain": "Network Implementation",
    "type": "ordering",
    "question": "Order the steps for properly terminating a Cat6 cable with an RJ-45 connector from first to last.",
    "items": [
      "Crimp the RJ-45 connector firmly with a crimping tool",
      "Strip the outer cable jacket approximately 1 inch to expose the twisted pairs",
      "Verify the termination with a cable tester for wire map and continuity",
      "Untwist the pairs and arrange the individual wires in T568B (or T568A) pin order",
      "Slide the arranged wires fully into the RJ-45 connector ensuring each wire reaches its pin"
    ],
    "correctOrder": [1, 3, 4, 0, 2],
    "explanation": "Termination steps: (1) Strip the jacket to expose pairs; (2) Untwist and arrange wires in the correct T568A or T568B color order; (3) Insert wires into the RJ-45 ensuring each wire reaches the correct pin; (4) Crimp firmly; (5) Test with a cable tester to verify wire map, continuity, and no opens/shorts/miswires."
  },
  {
    "id": "netplus-247",
    "domain": "Network Security",
    "type": "ordering",
    "question": "Order the steps of the 802.1X port authentication process from first to last.",
    "items": [
      "RADIUS server validates credentials and sends an Accept or Reject to the authenticator",
      "Client (supplicant) connects to the switch port and sends an EAPOL-Start frame",
      "Switch (authenticator) grants network access or keeps the port in unauthorized state based on the RADIUS response",
      "Switch forwards the client's EAP identity response to the RADIUS authentication server",
      "Client provides identity credentials (username/password or certificate) in an EAP Identity Response"
    ],
    "correctOrder": [1, 4, 3, 0, 2],
    "explanation": "802.1X flow: (1) Client sends EAPOL-Start on connect; (2) Switch requests EAP Identity; client responds with credentials; (3) Switch encapsulates EAP in RADIUS and forwards to the authentication server; (4) RADIUS validates credentials and sends Access-Accept or Access-Reject; (5) Switch opens or blocks the port based on the decision."
  },
  {
    "id": "netplus-248",
    "domain": "Network Operations",
    "type": "statement-block",
    "question": "For each statement about SNMP components and operations, indicate whether it is True or False.",
    "statements": [
      "An SNMP agent runs on the managed device and responds to GET requests from the NMS",
      "SNMPv3 community strings provide authentication equivalent to username and password protection",
      "The MIB (Management Information Base) is a hierarchical database defining the OIDs that a device exposes for management",
      "SNMP traps are sent by the NMS to instruct agents to report their current status"
    ],
    "correctAnswers": [True, False, True, False],
    "explanation": "SNMP agents on managed devices respond to NMS polls (true). SNMPv3 uses the User Security Model (USM) with explicit authentication — community strings are a v1/v2c feature and provide no real security (false). The MIB defines the OID hierarchy of manageable objects (true). Traps are sent BY agents to the NMS when events occur — not the other way around (false)."
  },
  {
    "id": "netplus-249",
    "domain": "Networking Concepts",
    "type": "statement-block",
    "question": "For each statement about IPv6 addressing, indicate whether it is True or False.",
    "statements": [
      "The IPv6 loopback address is ::1/128",
      "Link-local IPv6 addresses in the FE80::/10 range are routable across the internet",
      "An EUI-64 interface identifier is derived from the 48-bit MAC address by inserting FF:FE in the middle and flipping the seventh bit",
      "The IPv6 all-routers link-local multicast address is FF02::2"
    ],
    "correctAnswers": [True, False, True, True],
    "explanation": "::1/128 is the IPv6 loopback (true). Link-local addresses (FE80::/10) are scoped to a single link and are NOT routable — routers must not forward them (false). EUI-64 splits the 48-bit MAC (AABBCC-DDEEFF) into two 24-bit halves, inserts FF:FE between them, and flips the universal/local (U/L) bit (true). FF02::2 is the all-routers multicast group; FF02::1 is all-nodes (true)."
  },
  {
    "id": "netplus-250",
    "domain": "Network Troubleshooting",
    "type": "statement-block",
    "question": "For each statement about common wireless network issues, indicate whether it is True or False.",
    "statements": [
      "A wireless client that associates successfully but receives no DHCP address may have a VLAN misconfiguration on the AP or switch port",
      "Wireless roaming issues between APs are always caused by the client device having an outdated wireless driver",
      "A hidden SSID (broadcast disabled) effectively prevents unauthorized users from discovering and connecting to the network",
      "Co-channel interference occurs when multiple APs on the same channel compete for airtime, degrading throughput even when signal strength is strong"
    ],
    "correctAnswers": [True, False, False, True],
    "explanation": "VLAN mismatch on AP/switch port can isolate wireless clients from the DHCP server (true). Roaming issues can also result from AP placement, sticky client behavior, mismatched security configs, or band steering — not always the driver (false). Hidden SSIDs don't prevent discovery — the SSID is visible in probe request frames captured with tools like Wireshark or Kismet (false). Co-channel interference from APs sharing a channel reduces effective throughput despite strong RSSI (true)."
  }
]

data.extend(batch5)
with open('src/data/comptia-net-plus-questions.json', 'w') as f:
    json.dump(data, f, indent=2)
print(f'Written: {len(data)} questions')
