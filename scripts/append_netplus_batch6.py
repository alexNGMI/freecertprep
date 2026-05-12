import json

with open('src/data/comptia-net-plus-questions.json') as f:
    data = json.load(f)

batch6 = [
  {
    "id": "netplus-251",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the purpose of route summarization (also called supernetting or route aggregation)?",
    "choices": [
      "Reduces the number of routing table entries by advertising multiple contiguous subnets as a single summary route",
      "Fragments large packets into smaller pieces to fit the path MTU of WAN links",
      "Encrypts routing updates to prevent eavesdropping on routing protocol exchanges",
      "Assigns a single IP address to multiple hosts using a shared address pool"
    ],
    "correctAnswer": 0,
    "explanation": "Route summarization advertises a single aggregate prefix that encompasses a block of more-specific subnets. This reduces routing table size on upstream routers, decreases routing protocol traffic, speeds up route lookups, and hides internal topology changes from external routers — an essential scalability technique in large networks."
  },
  {
    "id": "netplus-252",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "In NAT terminology, the 'inside global' address refers to which of the following?",
    "choices": [
      "The private IP address of an internal host as seen from inside the network before NAT",
      "The IP address of an external internet server as seen from inside the network",
      "The private IP address of an external server as seen by the NAT device",
      "The public IP address of an internal host as it appears on the internet after NAT translation"
    ],
    "correctAnswer": 3,
    "explanation": "NAT uses four address types: Inside Local (private IP of internal host, pre-NAT), Inside Global (public IP representing the internal host on the internet, post-NAT), Outside Global (public IP of the external server), Outside Local (IP of the external server as seen from inside, usually same as outside global). 'Inside Global' is the routable, post-NAT address seen by the internet."
  },
  {
    "id": "netplus-253",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which protocol replaces ARP in IPv6 networks for resolving link-layer (MAC) addresses from IPv6 addresses?",
    "choices": [
      "DHCPv6 — provides addressing and optional link-layer mapping",
      "ICMPv4 — predecessor of ICMPv6 used in IPv4 networks only",
      "IGMP — manages IPv4 multicast group membership",
      "NDP (Neighbor Discovery Protocol) using ICMPv6 Neighbor Solicitation and Neighbor Advertisement messages"
    ],
    "correctAnswer": 3,
    "explanation": "NDP (RFC 4861) uses ICMPv6 messages to discover neighbors and their link-layer addresses. Neighbor Solicitation (Type 135) is sent to the solicited-node multicast address of the target; the target responds with a Neighbor Advertisement (Type 136) containing its MAC. NDP also handles router discovery, prefix announcements, and duplicate address detection."
  },
  {
    "id": "netplus-254",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "In FTP, which TCP port is used for the active-mode data connection from the server to the client?",
    "choices": [
      "TCP port 20 — FTP data channel (active mode, server-initiated)",
      "TCP port 21 — FTP control channel for commands and responses",
      "TCP port 22 — SSH and SFTP (secure file transfer)",
      "TCP port 69 — TFTP (Trivial File Transfer Protocol)"
    ],
    "correctAnswer": 0,
    "explanation": "FTP uses two TCP connections: port 21 for the control channel (commands like LIST, RETR, STOR) and port 20 for the data channel in active mode (where the server initiates a connection from port 20 to the client's data port). In passive mode, the server opens a dynamic port and the client connects to it, avoiding firewall issues."
  },
  {
    "id": "netplus-255",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "A company has the network 10.10.0.0/16 and needs to create subnets of 1000, 500, 250, and 100 hosts. Which IP addressing approach should be used?",
    "choices": [
      "Classful subnetting — divide the network into equal-sized subnets ignoring actual host counts",
      "Route summarization — advertise all requirements as a single aggregate prefix",
      "Static NAT — assign one public IP per requirement to avoid subnetting",
      "VLSM (Variable Length Subnet Masking) — create differently-sized subnets sized precisely to each requirement"
    ],
    "correctAnswer": 3,
    "explanation": "VLSM allows each subnet to use a different prefix length tailored to its host count, conserving address space. For 1000 hosts use /22, for 500 hosts use /23, for 250 hosts use /24, for 100 hosts use /25. Classful subnetting would require equal-sized subnets, wasting addresses in smaller segments."
  },
  {
    "id": "netplus-256",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which EtherChannel negotiation protocol is the IEEE 802.3ad open standard, enabling link aggregation between switches from different vendors?",
    "choices": [
      "PAgP (Port Aggregation Protocol) — Cisco proprietary, not supported by non-Cisco equipment",
      "DTP (Dynamic Trunking Protocol) — Cisco proprietary for VLAN trunk negotiation",
      "LACP (Link Aggregation Control Protocol) — IEEE 802.3ad open standard for multi-vendor interoperability",
      "STP (Spanning Tree Protocol) — IEEE 802.1D loop prevention, not link aggregation"
    ],
    "correctAnswer": 2,
    "explanation": "LACP (IEEE 802.3ad, later folded into IEEE 802.1AX) is the vendor-neutral link aggregation protocol. Both sides exchange LACPDUs to negotiate and maintain the bundle. PAgP is Cisco-only. For multi-vendor deployments or future-proofing, LACP is always preferred. Both protocols support modes: active/passive (LACP) or desirable/auto (PAgP)."
  },
  {
    "id": "netplus-257",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which optical networking technology multiplexes many different wavelengths (channels) of light over a single fiber strand to dramatically increase total fiber capacity?",
    "choices": [
      "SONET/SDH — synchronous optical hierarchy defining framing and rates (OC-3, OC-12, STM-1)",
      "DOCSIS — Data Over Cable Service Interface Specification for cable modem connections",
      "T-carrier — copper-based digital multiplexing hierarchy (T1, T3)",
      "DWDM (Dense Wavelength Division Multiplexing) — multiplexes 40–160+ channels per fiber"
    ],
    "correctAnswer": 3,
    "explanation": "DWDM combines multiple optical carrier wavelengths (channels) spaced 0.8 nm or 0.4 nm apart onto a single fiber using the ITU-T grid. Each channel operates at line rate (10G, 100G, 400G), enabling total fiber capacity of multiple terabits per second on existing fiber infrastructure. CWDM (Coarse WDM) uses fewer, more widely spaced channels."
  },
  {
    "id": "netplus-258",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the subnet mask in dotted-decimal notation for a /20 CIDR prefix length?",
    "choices": [
      "255.255.255.0 — a /24 mask",
      "255.255.248.0 — a /21 mask",
      "255.255.0.0 — a /16 mask",
      "255.255.240.0 — a /20 mask"
    ],
    "correctAnswer": 3,
    "explanation": "/20 means 20 bits of network mask: the first two octets are all 1s (255.255), the third octet has 4 bits of network (11110000 = 240), and the fourth is all zeros. So the mask is 255.255.240.0. A /20 provides 4096 total addresses (2^12) with 4094 usable hosts."
  },
  {
    "id": "netplus-259",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "What is a 'router-on-a-stick' configuration used for in a switched network?",
    "choices": [
      "A single router physical interface divided into 802.1Q subinterfaces, each handling inter-VLAN routing for a different VLAN over a single trunk uplink to the switch",
      "A router with dual redundant physical WAN interfaces configured for active/standby failover",
      "A router performing NAT on a single interface shared between the LAN and WAN without VLAN separation",
      "An edge router with a single default route to the ISP and no internal routing configuration"
    ],
    "correctAnswer": 0,
    "explanation": "Router-on-a-stick uses one physical router interface connected to a switch trunk port. The interface is logically divided into subinterfaces (e.g., Gi0/0.10, Gi0/0.20), each with an 802.1Q encapsulation tag and an IP address serving as the default gateway for its VLAN. This allows inter-VLAN routing without a Layer 3 switch but introduces a potential bandwidth bottleneck."
  },
  {
    "id": "netplus-260",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "Which load balancing algorithm distributes incoming client requests sequentially to each server in turn, cycling through the server pool regardless of each server's current load?",
    "choices": [
      "Least connections — sends each new request to the server with the fewest active sessions",
      "IP hash — maps requests to servers based on source IP for session persistence",
      "Weighted round-robin — distributes requests proportionally based on server capacity ratios",
      "Round-robin — distributes requests evenly in sequence across all servers"
    ],
    "correctAnswer": 3,
    "explanation": "Round-robin assigns request 1 to server A, request 2 to server B, request 3 to server C, then cycles back to server A. It is simple and works well when servers are identical and requests have similar processing time. Weighted round-robin adds capacity ratios; least-connections adapts to varying request duration."
  },
  {
    "id": "netplus-261",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "In a VMware vSphere environment, what provides Layer 2 switching functionality between virtual machines running on the same physical ESXi host?",
    "choices": [
      "A physical switch connected to each VM via dedicated pass-through NIC",
      "A vSwitch (virtual switch) — a software-based Layer 2 switch embedded in the hypervisor",
      "A dedicated physical NIC per VM to create isolated broadcast domains",
      "VMware NSX-T is required for any VM-to-VM communication within the same host"
    ],
    "correctAnswer": 1,
    "explanation": "VMware vSwitch (vSS) is a software switch inside the ESXi hypervisor. It forwards frames between VMs on the same host without traffic leaving the physical server, and uplinks to physical switches for external connectivity. NSX-T adds overlay networking (GENEVE/VXLAN) for multi-host, multi-site virtual networking."
  },
  {
    "id": "netplus-262",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "What is the primary purpose of a Content Delivery Network (CDN)?",
    "choices": [
      "Provides encrypted VPN tunnels for remote workers to access corporate resources securely",
      "Monitors website availability and alerts administrators when response times exceed SLAs",
      "Provides cloud-based DHCP and DNS services for branch office networks",
      "Distributes cached content across geographically dispersed edge servers so users load resources from the nearest node, reducing latency"
    ],
    "correctAnswer": 3,
    "explanation": "CDNs cache static content (images, CSS, JavaScript, videos) at edge nodes close to users worldwide. When a user requests content, the CDN routes the request to the nearest edge node rather than the origin server, reducing round-trip latency, improving load times, and absorbing traffic spikes. Akamai, Cloudflare, and AWS CloudFront are major CDN providers."
  },
  {
    "id": "netplus-263",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "Which network automation tool uses agentless, SSH-based communication and human-readable YAML playbooks to configure network devices?",
    "choices": [
      "Ansible — agentless (SSH/API-based), YAML playbooks, works with most network vendors",
      "Puppet — requires an agent installed on each managed device, uses Ruby DSL",
      "Chef — requires agent and Chef server, uses Ruby-based cookbooks",
      "SCCM — Microsoft endpoint management for Windows systems, not network devices"
    ],
    "correctAnswer": 0,
    "explanation": "Ansible is agentless — it connects to devices via SSH (or APIs using vendor modules) and executes tasks defined in YAML playbooks. No software needs to be pre-installed on network devices. Ansible network modules support Cisco IOS/NX-OS, Arista EOS, Juniper Junos, and many others, making it the dominant tool for network automation."
  },
  {
    "id": "netplus-264",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What is the primary function of a SIEM (Security Information and Event Management) system?",
    "choices": [
      "Provides encrypted CLI access for administrators to securely manage network devices",
      "Generates synthetic test traffic to proactively measure network path performance",
      "Collects, normalizes, correlates, and analyzes log and event data from multiple sources to detect security incidents and support forensics",
      "Automatically applies OS patches to network devices based on published vulnerability advisories"
    ],
    "correctAnswer": 2,
    "explanation": "A SIEM (IBM QRadar, Splunk, Microsoft Sentinel) ingests logs from firewalls, IDS/IPS, endpoints, and applications. It normalizes disparate formats, applies correlation rules to identify attack patterns, and generates prioritized alerts. SIEMs also support compliance reporting and forensic investigation with long-term log storage."
  },
  {
    "id": "netplus-265",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What is 'configuration drift' in the context of network operations?",
    "choices": [
      "Unintended deviations from the approved baseline configuration caused by unauthorized or undocumented changes accumulating over time",
      "A gradual degradation in network throughput as traffic volumes increase over months",
      "The deliberate process of incrementally migrating from one network architecture to another",
      "An increase in packet loss that occurs as traffic travels over longer distances"
    ],
    "correctAnswer": 0,
    "explanation": "Configuration drift occurs when devices gradually diverge from their approved baseline through undocumented manual changes, emergency fixes applied without change management, or vendor updates. Drift can cause unexpected behavior and security gaps. Version-controlled configuration management and automated compliance checking (Cisco NSO, Batfish) detect and remediate drift."
  },
  {
    "id": "netplus-266",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "A network team reviews 12 months of WAN bandwidth utilization and finds the primary link exceeds 80% utilization for 4+ hours daily. What is the appropriate recommendation?",
    "choices": [
      "Apply QoS traffic shaping to artificially cap all traffic below 80% to prevent congestion",
      "Replace all routers on the WAN path with newer hardware rated for higher throughput",
      "Initiate a WAN bandwidth upgrade procurement process before the link reaches saturation and causes user-impacting congestion",
      "Add a second internet circuit for failover only, maintaining the primary link at its current capacity"
    ],
    "correctAnswer": 2,
    "explanation": "Sustained utilization above 70–80% causes queuing delays and packet loss during bursts. Capacity planning requires ordering upgrades before saturation — WAN circuit lead times can be weeks to months. QoS can reduce non-critical traffic's impact but does not add capacity. Failover circuits help with availability, not congestion on the primary link."
  },
  {
    "id": "netplus-267",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What is the fundamental operational difference between a network IDS and a network IPS?",
    "choices": [
      "An IDS uses only signature-based detection; an IPS uses only anomaly-based detection",
      "An IPS is deployed inline in the traffic path and can actively drop malicious packets; an IDS monitors traffic out-of-band and generates alerts without modifying traffic flow",
      "An IDS protects individual host systems; an IPS protects the entire network perimeter",
      "An IPS requires integration with a SIEM to block traffic; an IDS operates as a standalone blocking device"
    ],
    "correctAnswer": 1,
    "explanation": "Deployment mode is the key difference: an IPS sits inline (all traffic flows through it), enabling it to drop, reset, or modify malicious traffic in real time. An IDS receives traffic copies via a SPAN port or network tap and can only alert — never block. Both can use signature-based and anomaly-based detection methods."
  },
  {
    "id": "netplus-268",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What is 'pretexting' in the context of social engineering attacks targeting network security?",
    "choices": [
      "Sending bulk fraudulent emails impersonating a trusted entity to trick users into revealing credentials",
      "Creating a fabricated scenario or false identity to manipulate a target into divulging sensitive information or taking a specific action",
      "Physically following an authorized employee through a secured door to gain unauthorized building access",
      "Deploying a rogue wireless access point to capture authentication credentials from unsuspecting users"
    ],
    "correctAnswer": 1,
    "explanation": "Pretexting involves constructing a plausible but false scenario (pretext) — for example, impersonating IT support, a vendor, or an auditor — to manipulate a target. The attacker establishes false credibility before making their request, making the target less likely to question the interaction. Security awareness training is the primary defense."
  },
  {
    "id": "netplus-269",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What is SSL/TLS inspection (HTTPS inspection), and why is it used?",
    "choices": [
      "A VPN technology that wraps all outbound web traffic in an SSL tunnel for endpoint privacy",
      "An automated process for renewing expiring TLS certificates on web servers",
      "A security control where a firewall or proxy terminates and re-encrypts TLS sessions to inspect encrypted traffic for malware, data exfiltration, and policy violations",
      "A wireless authentication mechanism using TLS-based EAP methods (EAP-TLS) for certificate-based authentication"
    ],
    "correctAnswer": 2,
    "explanation": "TLS inspection (also called SSL decryption or man-in-the-middle inspection) has the firewall or proxy act as the TLS endpoint: it decrypts inbound/outbound HTTPS traffic, inspects the plaintext for threats or policy violations, then re-encrypts it before forwarding. The organization's own CA signs the re-encrypted traffic. Without inspection, encrypted traffic bypasses all content security controls."
  },
  {
    "id": "netplus-270",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What is the most effective technical control for automatically detecting rogue access points operating on the corporate wireless network?",
    "choices": [
      "Physically walking the building with a wireless-enabled smartphone to visually identify unknown SSIDs",
      "Configuring all corporate APs to broadcast hidden SSIDs, preventing rogue APs from knowing the SSID to impersonate",
      "Deploying a Wireless Intrusion Prevention System (WIPS) that continuously monitors the RF environment and classifies unauthorized APs in real time",
      "Requiring WPA3 encryption on all corporate SSIDs to prevent client association with unencrypted rogue APs"
    ],
    "correctAnswer": 2,
    "explanation": "A WIPS (like Cisco Adaptive WIPS or Fortinet WIDS) uses dedicated monitoring radios or time-sliced AP radios to scan all channels continuously. It identifies APs by BSSID, matches them against an authorized AP database, and automatically classifies any unrecognized AP as rogue — triggering alerts and optionally sending deauthentication frames to isolate it."
  },
  {
    "id": "netplus-271",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "After successfully pinging the loopback address 127.0.0.1, what should a technician ping next in a systematic bottom-up Layer 3 diagnostic sequence?",
    "choices": [
      "The final destination server to check end-to-end connectivity immediately",
      "The DNS server to verify name resolution is functioning",
      "The ISP's router to verify WAN-side connectivity",
      "The workstation's own assigned IP address to verify the NIC and IP stack are configured correctly"
    ],
    "correctAnswer": 3,
    "explanation": "The systematic ping sequence for IP troubleshooting: (1) 127.0.0.1 — verifies the local TCP/IP stack; (2) own IP address — verifies NIC driver and IP configuration; (3) default gateway — verifies local segment connectivity; (4) remote IP — verifies routing; (5) remote hostname — verifies DNS resolution. Each step eliminates a potential failure point."
  },
  {
    "id": "netplus-272",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "Which cable test metric measures the loss of signal power (in decibels) as it travels from one end of the cable to the other?",
    "choices": [
      "Wire map — verifies correct pin-to-pin continuity at both cable ends",
      "Return loss — measures signal energy reflected back from impedance discontinuities",
      "NEXT (Near-End Crosstalk) — measures interference between adjacent pairs near the transmit end",
      "Attenuation / insertion loss — measures the reduction in signal strength from one end of the cable to the other"
    ],
    "correctAnswer": 3,
    "explanation": "Attenuation (insertion loss) measures how much signal is lost as it propagates through the cable. Higher attenuation means weaker signal at the far end. TIA-568 specifies maximum insertion loss values per category and cable length. Exceeding these limits causes bit errors and link failures. The test is performed by sending a known signal at one end and measuring the received power at the other."
  },
  {
    "id": "netplus-273",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A switch's MAC address table does not contain an entry for a specific host. What is the most likely reason?",
    "choices": [
      "The host is powered off or its NIC is disabled — no frames have been received with that source MAC",
      "The host's IP address conflicts with another device, blocking MAC table entry creation",
      "The switch's VLAN database does not include the VLAN assigned to that port",
      "The switch has a faulty ASIC that is randomly dropping MAC table entries"
    ],
    "correctAnswer": 0,
    "explanation": "Switch CAM tables are populated dynamically by inspecting the source MAC of received frames. If a host has never sent any frames (powered off, NIC disabled, or link down), the switch never learns its MAC. MAC entries also age out (default 300 seconds of inactivity). Check the port link status first: if the link is down, no frames can be received."
  },
  {
    "id": "netplus-274",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A user can access web services by typing IP addresses but gets 'server not found' errors when typing hostnames. Which tool directly tests DNS resolution and shows which server is responding?",
    "choices": [
      "Wireshark — captures raw DNS query and response packets for protocol-level analysis",
      "traceroute — shows the hop-by-hop path to the DNS server but not the DNS response content",
      "nslookup or dig — directly queries a DNS server and displays the returned records and responding server",
      "netstat — shows active TCP/UDP connections but does not test DNS name resolution"
    ],
    "correctAnswer": 2,
    "explanation": "nslookup and dig are purpose-built DNS diagnostic tools. They query a specified DNS server (or the system default) for a given hostname and display the response: resolved IP, record type, TTL, and which DNS server answered. This immediately shows whether DNS is working and identifies resolver misconfigurations or incorrect records."
  },
  {
    "id": "netplus-275",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A remote VPN user connects successfully and can reach internal servers by IP address but cannot access them by hostname. What is the most likely cause?",
    "choices": [
      "The VPN tunnel is blocking SMB/CIFS protocol traffic on port 445",
      "The user's workstation is not configured to use the internal DNS servers via the VPN, so hostname queries go to external resolvers that don't know internal hostnames",
      "The file server does not accept inbound connections from the VPN client subnet",
      "The VPN is using IPsec transport mode, which does not support DNS traffic"
    ],
    "correctAnswer": 1,
    "explanation": "VPN clients must be configured to push internal DNS server IP addresses (via DHCP option 6 or VPN DNS settings) so hostname queries are resolved by the corporate DNS server. If the DNS push is misconfigured, the client uses its local ISP DNS, which has no knowledge of internal hostnames — causing name resolution failures while IP access works fine."
  },
  {
    "id": "netplus-276",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the IPv4 limited broadcast address, and when is it used?",
    "choices": [
      "127.0.0.1 — the loopback address used for local TCP/IP stack testing",
      "255.255.255.255 — sent to all hosts on the local network segment when the sender has no network address",
      "0.0.0.0 — used as the source address before DHCP assigns an IP (DHCP DISCOVER packets)",
      "224.0.0.1 — the all-hosts IPv4 multicast address for link-local multicast"
    ],
    "correctAnswer": 1,
    "explanation": "The limited broadcast address 255.255.255.255 is used to send a packet to all hosts on the local segment without knowing the network address. It is not forwarded by routers. DHCP clients use it as the destination in DHCPDISCOVER messages because they have no assigned IP yet. Directed broadcasts (e.g., 192.168.1.255) are forwarded by routers to the target subnet."
  },
  {
    "id": "netplus-277",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "In the context of load balancing, what is a Virtual IP (VIP) address?",
    "choices": [
      "A temporary IP address leased by DHCP that expires when the lease period ends",
      "A private IP address used exclusively within a virtualization platform for inter-VM communication",
      "The single IP address clients connect to; the load balancer translates it to one of the real server IPs behind the pool",
      "An IPv6 link-local address used for communication between hypervisors on the same physical host"
    ],
    "correctAnswer": 2,
    "explanation": "A VIP (Virtual IP) is the externally advertised address that clients connect to. The load balancer listens on the VIP and performs DNAT (Destination NAT) to forward each connection to a real server in the pool. From the client's perspective, they only see the VIP — the individual server IPs are hidden, enabling transparent failover and scalability."
  },
  {
    "id": "netplus-278",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What distinguishes proactive network monitoring from reactive monitoring?",
    "choices": [
      "Proactive monitoring detects issues only after users report them; reactive monitoring generates alerts before problems occur",
      "Proactive monitoring uses artificial intelligence exclusively; reactive monitoring relies on human observation",
      "Proactive monitoring uses baselines, threshold alerts, and trend analysis to identify developing problems before users are impacted; reactive monitoring addresses issues after a failure has already occurred",
      "Proactive monitoring is performed manually by network engineers reviewing logs; reactive monitoring is fully automated"
    ],
    "correctAnswer": 2,
    "explanation": "Proactive monitoring establishes normal baselines and alerts when metrics trend toward problematic levels (e.g., disk filling, bandwidth approaching saturation, error rate rising) — enabling intervention before users experience impact. Reactive monitoring addresses issues only after they cause outages or user complaints, resulting in longer MTTR."
  },
  {
    "id": "netplus-279",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What is the primary purpose of a network topology map in day-to-day network operations?",
    "choices": [
      "Archives packet captures from historical network incidents for forensic analysis",
      "Automatically pushes approved configuration updates to all managed network devices",
      "Logs and timestamps every configuration change applied to each managed device",
      "Provides a visual reference of device interconnections, IP addressing, and physical locations for troubleshooting, capacity planning, and documentation"
    ],
    "correctAnswer": 3,
    "explanation": "Network topology maps show how devices are connected, their IP addresses, interface assignments, and physical/logical relationships. During troubleshooting, engineers use topology maps to identify the affected segment, trace the traffic path, and understand the impact of a failure. They must be kept current — stale maps cause troubleshooting delays."
  },
  {
    "id": "netplus-280",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "Which firewall type tracks the state of each network connection — source/destination IP, port, and TCP handshake state — to make context-aware forwarding decisions?",
    "choices": [
      "Packet-filtering firewall (stateless) — evaluates each packet independently with no memory of prior packets",
      "Stateful inspection firewall — maintains a connection state table, allowing return traffic automatically based on established sessions",
      "Application-layer gateway (proxy firewall) — terminates and re-originates connections at Layer 7",
      "Next-generation firewall (NGFW) — adds application identification, user-based policies, and IPS to stateful inspection"
    ],
    "correctAnswer": 1,
    "explanation": "A stateful firewall maintains a state table tracking each active TCP/UDP connection (source IP:port, dest IP:port, state). When a new outbound connection is permitted, the state table automatically allows the reply traffic without requiring an explicit inbound permit rule. Stateless firewalls evaluate each packet independently — simpler but less intelligent."
  },
  {
    "id": "netplus-281",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What is the primary security benefit of network segmentation?",
    "choices": [
      "Improves network throughput by distributing traffic loads across multiple physical links",
      "Simplifies network management by reducing the total number of VLANs required",
      "Increases complexity and creates additional failure points between network segments",
      "Limits the blast radius of security incidents by containing threats within smaller zones, preventing lateral movement across the entire network"
    ],
    "correctAnswer": 3,
    "explanation": "Segmentation (via VLANs, subnets, ACLs, or firewalls between zones) ensures that a compromised device in one segment cannot freely communicate with all other segments. An attacker who compromises a guest Wi-Fi client, for example, is contained to that segment and cannot reach production servers without traversing a firewall — reducing the impact of a breach."
  },
  {
    "id": "netplus-282",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A technician confirms physical connectivity — the switch port link LED is on. The host still cannot ping anything. Which OSI layer should be investigated next?",
    "choices": [
      "Layer 2 — check ARP table, VLAN assignment, switch port configuration, and MAC address learning",
      "Layer 7 — verify the application is correctly configured for the target service",
      "Layer 5 — verify session establishment parameters between the communicating hosts",
      "Layer 6 — verify data format encoding compatibility between the source and destination"
    ],
    "correctAnswer": 0,
    "explanation": "With Layer 1 (physical) confirmed by the active link LED, the next step in bottom-up troubleshooting is Layer 2: verify the port is assigned to the correct VLAN, that the switch has learned the host's MAC address, that no port security is blocking it, and that ARP is resolving correctly. Jumping to upper layers before eliminating Layer 2 wastes time."
  },
  {
    "id": "netplus-283",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A user reports intermittent connectivity drops that occur every 2–4 hours and last for about 30 seconds each time. What troubleshooting approach is most appropriate?",
    "choices": [
      "Replace all network cables in the affected segment immediately to eliminate physical layer issues",
      "Collect interface error counters, syslog messages, and NMS graphs over multiple cycles to identify the pattern and correlate with specific events before making any changes",
      "Reload all switches and routers in the network path to clear transient state and counters",
      "Immediately escalate to the ISP — intermittent issues always originate with the WAN provider"
    ],
    "correctAnswer": 1,
    "explanation": "Intermittent issues require pattern identification before any changes. Collect data: interface counters before and after the drop, syslog entries during the failure window, SNMP interface graphs, and any scheduled events (backup jobs, spanning tree changes, DHCP lease renewals). Changing things randomly can mask the real cause and make correlation impossible."
  },
  {
    "id": "netplus-284",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the difference between a 'routing protocol' and a 'routed protocol'?",
    "choices": [
      "A routing protocol carries end-user application data; a routed protocol carries routing information between routers",
      "A routed protocol (such as IP) carries user data and is forwarded by routers; a routing protocol (such as OSPF or BGP) is used by routers to build and maintain their routing tables",
      "Routing protocols encrypt the data they carry; routed protocols forward traffic in cleartext",
      "Routing protocols operate at Layer 2 using MAC addresses; routed protocols operate at Layer 3 using IP addresses"
    ],
    "correctAnswer": 1,
    "explanation": "A routed protocol (IP, IPv6, IPX) is the protocol whose packets are forwarded (routed) between networks. A routing protocol (OSPF, EIGRP, BGP, RIP) runs between routers to exchange reachability information and build the routing tables used to forward routed protocol packets. Routing protocols are a tool; routed protocols carry the actual payload."
  },
  {
    "id": "netplus-285",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the subnet broadcast address for the network 192.168.100.192/26?",
    "choices": [
      "192.168.100.255",
      "192.168.100.223",
      "192.168.100.254",
      "192.168.100.191"
    ],
    "correctAnswer": 0,
    "explanation": "/26 creates subnets every 64 addresses: .0, .64, .128, .192. The subnet 192.168.100.192/26 spans .192 to .255 (the next subnet would be .256, which overflows). The broadcast address is the last in the range: 192.168.100.255. The valid host range is .193 to .254."
  },
  {
    "id": "netplus-286",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What does the principle of 'least privilege' require in a network security context?",
    "choices": [
      "Users, accounts, and systems should be granted only the minimum access permissions necessary to perform their specific job functions",
      "Network administrators should use unprivileged user accounts for all activities, including device configuration and maintenance",
      "Security monitoring tools should run at the lowest possible CPU priority to avoid impacting production system performance",
      "Firewall rules should deny the minimum possible number of connections to maximize business operational flexibility"
    ],
    "correctAnswer": 0,
    "explanation": "Least privilege limits the damage from compromised accounts by ensuring that accounts have access only to what they need. An administrator's daily account should not have domain admin rights; a service account should not have write access to unrelated file shares; a router's SNMP community should be read-only unless write access is specifically required."
  },
  {
    "id": "netplus-287",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "Which wireless attack involves sending forged 802.11 management frames to forcibly disconnect clients from a legitimate access point?",
    "choices": [
      "Deauthentication (disassociation) flood attack — exploits the unauthenticated 802.11 management frame vulnerability",
      "WPS PIN brute-force attack — exploits the split-PIN verification flaw in Wi-Fi Protected Setup",
      "PMKID offline cracking attack — captures the PMKID from a single frame without a full handshake",
      "BSS Coloring bypass attack — exploits the 802.11ax BSS Color field to cause channel collisions"
    ],
    "correctAnswer": 0,
    "explanation": "In 802.11 (prior to 802.11w Protected Management Frames), deauthentication and disassociation management frames are unauthenticated — any device can send them. An attacker can broadcast forged deauth frames, forcibly disconnecting clients. This is used as a precursor to evil twin attacks or WPS PIN attacks (forcing the client to reconnect through the attacker). 802.11w (PMF) mitigates this by cryptographically protecting management frames."
  },
  {
    "id": "netplus-288",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A technician uses a tone generator attached to one end of a cable to trace it. The toner probe detects a strong tone at patch panel port 24 but no tone at port 12, which was previously documented as the cable's termination. What does this confirm?",
    "choices": [
      "The cable has a physical break (open) between the tone generator and the patch panel",
      "The cable actually terminates at port 24 — the documentation is incorrect or the cable was re-terminated",
      "The cable has a cross-pair wiring fault that is redirecting the tone to port 24",
      "The tone generator signal is too weak and must be replaced with a higher-power generator"
    ],
    "correctAnswer": 1,
    "explanation": "The toner probe detects the tone wherever the cable physically terminates. Tone at port 24 and no tone at port 12 means the cable connects to port 24 — the documentation is wrong. This is a common scenario after moves, adds, and changes (MACs) where cables were re-terminated but documentation was not updated. Update the records to reflect the actual cable path."
  },
  {
    "id": "netplus-289",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "What is the purpose of a media converter in a network infrastructure?",
    "choices": [
      "Translates between different network protocols at Layer 3 (e.g., Ethernet to MPLS at the WAN edge)",
      "Converts between different electrical signaling levels on the same copper medium",
      "Amplifies optical signals on long single-mode fiber runs to extend the maximum transmission distance",
      "Converts signals between different physical media types — for example, from copper Ethernet to fiber optic"
    ],
    "correctAnswer": 3,
    "explanation": "Media converters operate at Layer 1, converting the physical medium without changing the Layer 2 or higher protocols. A common use case is connecting a device with only an RJ-45 copper port to a fiber-optic infrastructure (fiber media converter). They are transparent to the network protocol and allow mixing of media types without replacing equipment."
  },
  {
    "id": "netplus-290",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What is a 'golden configuration' (or gold standard) in network configuration management?",
    "choices": [
      "The most recently deployed production configuration, automatically pushed to all new devices during provisioning",
      "An encrypted backup of the current running configuration stored in a secure offsite vault",
      "A pre-approved, tested, and documented baseline configuration template for a specific device role or model",
      "The factory-default configuration for a device before any organization-specific customization is applied"
    ],
    "correctAnswer": 2,
    "explanation": "A golden configuration is the authoritative, approved baseline for a device type (e.g., access switch, edge router, firewall). It includes all required security hardening, standard SNMP settings, logging configuration, and feature set. New devices are provisioned from this template, and existing devices are periodically compared against it to detect configuration drift."
  },
  {
    "id": "netplus-291",
    "domain": "Network Security",
    "type": "multiple-response",
    "question": "Which TWO statements accurately describe the difference between IDS and IPS deployment? (Select two)",
    "choices": [
      "An IPS is deployed inline in the data path and can actively drop or modify malicious traffic in real time",
      "An IDS requires integration with a SIEM system to generate any security alerts",
      "An IDS can be deployed out-of-band using a SPAN or mirror port, analyzing copies of traffic without impacting the production flow",
      "An IPS always uses anomaly-based detection; an IDS always uses signature-based detection exclusively"
    ],
    "correctAnswers": [0, 2],
    "explanation": "IPS deployment: inline in the traffic path, capable of blocking traffic in real time (true). IDS deployment: out-of-band via SPAN/tap, generates alerts without modifying traffic (true). IDS can generate alerts independently without a SIEM. Both IDS and IPS can use signature-based AND anomaly-based detection — the detection method is not tied to deployment mode."
  },
  {
    "id": "netplus-292",
    "domain": "Network Operations",
    "type": "multiple-response",
    "question": "Which TWO are direct benefits of using network automation tools such as Ansible or Python/Netmiko for device configuration management? (Select two)",
    "choices": [
      "Eliminates human configuration errors by applying consistent, pre-tested templates across all devices simultaneously",
      "Requires no knowledge of networking concepts — the automation tool makes all technical decisions autonomously",
      "Enables rapid, repeatable deployment of configuration changes across hundreds of devices in minutes",
      "Automatically detects and resolves all network security incidents without requiring manual review or approval"
    ],
    "correctAnswers": [0, 2],
    "explanation": "Automation eliminates typos and inconsistencies by applying the same tested template to all devices (true). It also enables mass deployment — configuring 500 switches takes minutes, not days (true). Automation tools require skilled engineers to write correct playbooks and verify results. They do not autonomously handle security incidents or replace network expertise."
  },
  {
    "id": "netplus-293",
    "domain": "Networking Concepts",
    "type": "multiple-response",
    "question": "Which TWO TCP port numbers are associated with email retrieval protocols used by clients to access their mailboxes? (Select two)",
    "choices": [
      "TCP 25 — SMTP used for server-to-server mail transfer and client submission",
      "TCP 110 — POP3 (Post Office Protocol 3) for downloading messages from a mail server",
      "TCP 143 — IMAP (Internet Message Access Protocol) for accessing mail while leaving it on the server",
      "TCP 587 — SMTP submission port used by clients to send outgoing mail"
    ],
    "correctAnswers": [1, 2],
    "explanation": "POP3 (TCP 110) downloads and typically deletes messages from the server after retrieval — simple but lacks synchronization across devices. IMAP (TCP 143) synchronizes the mailbox state between the server and multiple clients, leaving messages on the server. SMTP (ports 25 and 587) is for sending/transferring mail, not client retrieval."
  },
  {
    "id": "netplus-294",
    "domain": "Networking Concepts",
    "type": "matching",
    "question": "Match each NAT terminology term to its correct definition.",
    "itemsLeft": ["Inside Local", "Inside Global", "Outside Local", "Outside Global"],
    "itemsRight": [
      "The public IP address of an external server as it appears on the internet",
      "The private IP address of an internal host as seen from within the private network",
      "The public IP address assigned to an internal host as it appears on the internet after NAT",
      "The IP address of an external server as it appears to devices inside the network"
    ],
    "correctMatches": [1, 2, 3, 0],
    "explanation": "Inside Local: the real private IP of the internal host before NAT (index 1). Inside Global: the public IP the internal host presents to the internet after NAT translation (index 2). Outside Local: how the external server's IP appears to internal devices — typically the same as its public IP unless NAT is applied to the destination (index 3). Outside Global: the external server's actual public IP on the internet (index 0)."
  },
  {
    "id": "netplus-295",
    "domain": "Network Troubleshooting",
    "type": "matching",
    "question": "Match each cable tester result to its correct meaning.",
    "itemsLeft": ["Open", "Short", "Crossed pair", "Split pair"],
    "itemsRight": [
      "Wires from different pairs are connected at opposite ends, creating apparent continuity but causing high crosstalk",
      "A break in one or both conductors of a wire pair — no electrical continuity",
      "Two conductors are in unintended electrical contact with each other",
      "The transmit wires at one end connect to the receive wires at the other — indicates a crossover wiring pattern"
    ],
    "correctMatches": [1, 2, 3, 0],
    "explanation": "Open (index 1): broken wire, no continuity. Short (index 2): unintended contact between conductors. Crossed pair (index 3): TX pins map to RX pins — may indicate an intentional crossover cable or a miswire. Split pair (index 0): wires from different pairs are mixed (e.g., pin 1 and pin 2 use one wire from pair 2 and one from pair 3), passing continuity tests but causing severe NEXT crosstalk."
  },
  {
    "id": "netplus-296",
    "domain": "Networking Concepts",
    "type": "ordering",
    "question": "Order the steps for designing a VLSM addressing scheme for multiple subnets from first to last.",
    "items": [
      "Assign host IP addresses to individual devices within each allocated subnet",
      "Sort the subnet requirements from largest host count to smallest",
      "Identify the starting network address of the allocated IP block",
      "Allocate the largest required subnet first from the available address space",
      "Verify that all subnet allocations fit within the IP block without address overlap"
    ],
    "correctOrder": [1, 2, 3, 4, 0],
    "explanation": "VLSM design process: (1) Sort requirements largest to smallest to minimize fragmentation; (2) Identify the starting address of the available block; (3) Carve out the largest subnet first from the start of the block; (4) Verify no subnets overlap; (5) Assign individual host addresses within each subnet. Allocating largest first ensures efficient packing of the address space."
  },
  {
    "id": "netplus-297",
    "domain": "Network Security",
    "type": "ordering",
    "question": "Order the steps of a stateful firewall's packet inspection process from first to last.",
    "items": [
      "If the packet matches an existing session table entry, allow it without further policy evaluation",
      "Check the packet against ACL/firewall rules to determine if a new session should be permitted",
      "Drop the packet and optionally send a TCP reset or ICMP Unreachable to notify the source",
      "Packet arrives at the firewall interface and is processed",
      "Create a new session table entry and forward the packet to the destination"
    ],
    "correctOrder": [3, 0, 1, 4, 2],
    "explanation": "Stateful inspection flow: (1) Packet arrives at the interface; (2) Check the state table — if it's an established session, forward immediately without policy re-evaluation; (3) For new packets, evaluate against the firewall policy/ACL; (4) If permitted, create a state table entry and forward; (5) If denied, drop (and optionally reset or notify). This process ensures that return traffic for permitted sessions is allowed automatically."
  },
  {
    "id": "netplus-298",
    "domain": "Networking Concepts",
    "type": "statement-block",
    "question": "For each statement about IPv4 subnetting, indicate whether it is True or False.",
    "statements": [
      "A /24 subnet provides exactly 254 usable host IP addresses",
      "A /30 subnet is commonly used for point-to-point WAN links because it provides exactly 2 usable host addresses",
      "The broadcast address of a subnet is the first IP address in the subnet range",
      "VLSM allows subnets of different sizes to be created from a single parent address block"
    ],
    "correctAnswers": [True, True, False, True],
    "explanation": "/24 provides 2^8 - 2 = 254 usable hosts (true). /30 provides 2^2 - 2 = 2 usable hosts, perfect for point-to-point links (true). The broadcast is the LAST address in the subnet range; the first address is the network (subnet) address (false). VLSM allows different prefix lengths within the same parent block (true)."
  },
  {
    "id": "netplus-299",
    "domain": "Network Security",
    "type": "statement-block",
    "question": "For each statement about firewall and DMZ concepts, indicate whether it is True or False.",
    "statements": [
      "A DMZ server should be permitted to initiate connections to the internal LAN without firewall restriction",
      "An implicit deny-all rule exists at the end of most firewall rule sets and ACLs",
      "A stateful firewall automatically allows return traffic for established outbound sessions without requiring explicit inbound permit rules",
      "An IPS deployed inline can actively drop malicious traffic in real time before it reaches the destination"
    ],
    "correctAnswers": [False, True, True, True],
    "explanation": "DMZ servers hosting public services (web, email) should NOT have unrestricted access to the internal LAN — a compromised DMZ server must not freely reach internal systems (false). Implicit deny-all is standard; traffic not explicitly permitted is blocked (true). Stateful firewalls track session state and permit return traffic automatically (true). Inline IPS can drop traffic in real time — unlike out-of-band IDS which can only alert (true)."
  },
  {
    "id": "netplus-300",
    "domain": "Network Operations",
    "type": "statement-block",
    "question": "For each statement about network documentation types, indicate whether it is True or False.",
    "statements": [
      "A logical network diagram shows physical cable runs, rack locations, and patch panel port assignments",
      "An IPAM system tracks IP address allocations, subnet assignments, VLAN IDs, and DNS records across the organization",
      "A network runbook provides step-by-step procedures for performing common operational tasks and responding to specific incident types",
      "A change log records all configuration modifications applied to network devices, including who made the change and when"
    ],
    "correctAnswers": [False, True, True, True],
    "explanation": "Logical diagrams show Layer 3 relationships (IP addressing, routing, device names) — physical diagrams show cable paths, rack placement, and port mappings (false). IPAM systems are the authoritative inventory for all IP resources (true). Runbooks document operational procedures for repeatability and consistency (true). Change logs provide accountability, auditability, and a troubleshooting timeline (true)."
  }
]

data.extend(batch6)
with open('src/data/comptia-net-plus-questions.json', 'w') as f:
    json.dump(data, f, indent=2)
print(f'Written: {len(data)} questions')
