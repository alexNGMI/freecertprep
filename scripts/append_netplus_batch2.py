import json

with open('src/data/comptia-net-plus-questions.json') as f:
    data = json.load(f)

batch2 = [
  {
    "id": "netplus-51",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the primary purpose of CIDR (Classless Inter-Domain Routing)?",
    "choices": [
      "Encrypts routing table entries to prevent eavesdropping",
      "Assigns MAC addresses dynamically to network interfaces",
      "Provides NAT translation between private and public addresses",
      "Allows flexible allocation of IP address blocks beyond classful boundaries"
    ],
    "correctAnswer": 3,
    "explanation": "CIDR replaced the rigid classful (A/B/C) system, enabling variable-length subnet masks (VLSM) and arbitrary prefix lengths like /22 or /27, which dramatically improved address space efficiency and reduced routing table growth."
  },
  {
    "id": "netplus-52",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "A host has the IP address 192.168.10.50/27. Which network address represents its subnet?",
    "choices": [
      "192.168.10.32",
      "192.168.10.0",
      "192.168.10.48",
      "192.168.10.64"
    ],
    "correctAnswer": 0,
    "explanation": "A /27 mask (255.255.255.224) creates subnets every 32 addresses: .0, .32, .64, .96, etc. Host .50 falls in the .32 block (range .32–.63), so the network address is 192.168.10.32."
  },
  {
    "id": "netplus-53",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which IPv6 address type is routable within an organization but not on the global internet, making it the IPv6 equivalent of RFC 1918 private addresses?",
    "choices": [
      "Global unicast (2000::/3)",
      "Link-local (FE80::/10)",
      "Multicast (FF00::/8)",
      "Unique local (FC00::/7)"
    ],
    "correctAnswer": 3,
    "explanation": "Unique local addresses (FC00::/7, typically FD00::/8) are meant for internal site use only and are not routable on the internet, analogous to IPv4 private ranges. Link-local addresses are limited to a single link; global unicast addresses are publicly routable."
  },
  {
    "id": "netplus-54",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the primary function of BGP (Border Gateway Protocol)?",
    "choices": [
      "Dynamically assigns IP addresses to hosts within a site",
      "Encrypts inter-domain routing updates between ISPs",
      "Routes traffic between autonomous systems on the internet",
      "Resolves fully qualified domain names to IP addresses"
    ],
    "correctAnswer": 2,
    "explanation": "BGP is the path-vector EGP (Exterior Gateway Protocol) that exchanges routing information between autonomous systems (AS), making it the backbone routing protocol of the internet. Interior protocols like OSPF and EIGRP handle routing within an AS."
  },
  {
    "id": "netplus-55",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which field in an IPv4 packet header prevents packets from circulating indefinitely through the network?",
    "choices": [
      "Fragment Offset",
      "Differentiated Services (DSCP)",
      "Time to Live (TTL)",
      "Protocol"
    ],
    "correctAnswer": 2,
    "explanation": "The TTL field is decremented by 1 at each router hop. When it reaches zero, the packet is discarded and an ICMP Time Exceeded message is sent to the source, preventing routing loops from causing infinite packet circulation."
  },
  {
    "id": "netplus-56",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "A router has entries for 10.0.0.0/8, 10.5.0.0/16, and a default route (0.0.0.0/0). A packet destined for 10.5.1.20 arrives. Which route is selected?",
    "choices": [
      "10.0.0.0/8",
      "Default route (0.0.0.0/0)",
      "The packet is dropped — multiple matches are treated as a conflict",
      "10.5.0.0/16"
    ],
    "correctAnswer": 3,
    "explanation": "Routers use longest prefix match: the most specific route (longest mask) wins. 10.5.0.0/16 matches more bits of the destination address than 10.0.0.0/8, so it is selected. The default route is only used when no other route matches."
  },
  {
    "id": "netplus-57",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What problem does the split horizon rule solve in distance-vector routing protocols?",
    "choices": [
      "Routing loops caused by re-advertising a route back on the same interface it was received from",
      "Unauthorized access to routing updates via unauthenticated neighbors",
      "Broadcast storms on flat Layer 2 networks",
      "Duplicate IP address assignment by competing DHCP servers"
    ],
    "correctAnswer": 0,
    "explanation": "Split horizon prevents a router from advertising a route back out the same interface through which it was learned. This breaks the feedback loop that causes counting-to-infinity in protocols like RIP."
  },
  {
    "id": "netplus-58",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "An 802.1Q trunk port carries traffic for multiple VLANs. What information is inserted into the Ethernet frame by 802.1Q tagging?",
    "choices": [
      "The IP address of the originating host",
      "The spanning tree port cost for load balancing",
      "The MAC address of the upstream router",
      "A 4-byte tag containing the VLAN identifier (VID) and priority bits (PCP)"
    ],
    "correctAnswer": 3,
    "explanation": "802.1Q inserts a 4-byte tag after the source MAC address containing: a 2-byte TPID (0x8100), a 3-bit PCP (priority), a 1-bit DEI, and a 12-bit VID. This allows a single trunk link to carry frames from up to 4094 VLANs."
  },
  {
    "id": "netplus-59",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "Which spanning tree variant provides the fastest convergence by negotiating port states directly with neighboring switches rather than relying on fixed timers?",
    "choices": [
      "Rapid PVST+ (802.1w RSTP)",
      "802.1D STP (Classic)",
      "Common Spanning Tree (CST)",
      "MSTP with a single region"
    ],
    "correctAnswer": 0,
    "explanation": "Rapid PVST+ (based on IEEE 802.1w RSTP) converges in seconds by using proposal/agreement handshakes and edge ports (PortFast), rather than waiting through the 30–50 second listening/learning timers of classic 802.1D STP."
  },
  {
    "id": "netplus-60",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "What is EtherChannel used for in a switched network?",
    "choices": [
      "Extending VLANs across a WAN link to remote sites",
      "Bundling multiple physical links into one logical link for increased bandwidth and redundancy",
      "Assigning IP addresses dynamically to switch ports",
      "Encrypting inter-switch traffic between distribution layer switches"
    ],
    "correctAnswer": 1,
    "explanation": "EtherChannel (IEEE 802.3ad LACP or Cisco PAgP) logically combines 2–8 physical links into one high-bandwidth channel. STP sees the bundle as a single link (preventing blocking), while traffic is load-balanced across the member ports."
  },
  {
    "id": "netplus-61",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "Which wireless standard introduced OFDMA and BSS Coloring to improve efficiency and reduce interference in high-density deployments?",
    "choices": [
      "802.11ax (Wi-Fi 6)",
      "802.11n (Wi-Fi 4)",
      "802.11ac (Wi-Fi 5)",
      "802.11g"
    ],
    "correctAnswer": 0,
    "explanation": "802.11ax (Wi-Fi 6) introduced OFDMA, which lets multiple clients share a channel simultaneously, and BSS Coloring, which reduces co-channel interference by tagging frames from overlapping networks. Both features significantly improve throughput and latency in dense environments."
  },
  {
    "id": "netplus-62",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "A network engineer needs to connect two switches 300 meters apart. Which cable medium is appropriate for this distance?",
    "choices": [
      "Cat6 UTP copper",
      "Cat6a STP copper",
      "Single-mode fiber",
      "Coaxial cable"
    ],
    "correctAnswer": 2,
    "explanation": "Copper Ethernet (Cat5e/6/6a) is limited to 100 meters per segment. Single-mode fiber supports distances of several kilometers, making it the correct choice for a 300-meter inter-switch link. Multimode fiber also exceeds 100 m but single-mode is the preferred long-distance option."
  },
  {
    "id": "netplus-63",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "What is the maximum recommended cable run length for a standard horizontal Cat5e/Cat6 copper Ethernet segment per TIA-568?",
    "choices": [
      "55 meters",
      "100 meters",
      "185 meters",
      "500 meters"
    ],
    "correctAnswer": 1,
    "explanation": "TIA-568 specifies a 100-meter maximum for horizontal copper cabling: 90 m for the permanent link (jack to patch panel) plus 10 m for patch cords at both ends. Exceeding this limit causes signal attenuation and potential link failures."
  },
  {
    "id": "netplus-64",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "Which PoE standard delivers up to 30 watts per port and is commonly used to power IP phones and wireless access points?",
    "choices": [
      "802.3af (PoE) — max 15.4 W",
      "802.3bt (PoE++) — max 60–100 W",
      "802.3at (PoE+) — max 30 W",
      "802.3ab — Gigabit Ethernet signaling standard"
    ],
    "correctAnswer": 2,
    "explanation": "802.3at (PoE+) delivers up to 30 W at the PSE and guarantees at least 25.5 W at the powered device. It is the most common standard for powering modern APs and IP phones. 802.3af (PoE) is limited to 15.4 W; 802.3bt handles higher-power devices like PTZ cameras."
  },
  {
    "id": "netplus-65",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "A wireless access point is configured in bridge mode. What describes this configuration?",
    "choices": [
      "It acts as a DHCP server distributing addresses to wireless clients",
      "It connects two separate network segments at Layer 2, extending the LAN wirelessly",
      "It filters traffic with an ACL before forwarding to the wired network",
      "It translates between 2.4 GHz and 5 GHz bands for legacy device support"
    ],
    "correctAnswer": 1,
    "explanation": "In wireless bridge mode, the AP connects two network segments at Layer 2 — for example, linking a remote building to the main network over a point-to-point wireless link — without performing NAT or routing."
  },
  {
    "id": "netplus-66",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "Which version of SNMP adds authentication (MD5/SHA) and encryption (DES/AES) to secure network management traffic?",
    "choices": [
      "SNMPv1",
      "SNMPv2c",
      "SNMPv3",
      "SNMPv2u"
    ],
    "correctAnswer": 2,
    "explanation": "SNMPv3 introduced the User Security Model (USM) providing authentication (ensuring messages are from a trusted source) and privacy (encrypting the payload). Earlier versions use community strings sent in cleartext, offering no real security."
  },
  {
    "id": "netplus-67",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "A syslog message arrives with severity level 3. How should a network administrator interpret this?",
    "choices": [
      "Error — the device encountered an error condition requiring attention",
      "Debug — detailed informational messages for troubleshooting",
      "Warning — conditions that may indicate a future problem",
      "Informational — normal operational messages"
    ],
    "correctAnswer": 0,
    "explanation": "Syslog severity levels: 0=Emergency, 1=Alert, 2=Critical, 3=Error, 4=Warning, 5=Notice, 6=Informational, 7=Debug. Level 3 (Error) indicates a significant error that should be investigated but has not caused a complete outage."
  },
  {
    "id": "netplus-68",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What type of data does NetFlow (or IPFIX) collect and export to a collector?",
    "choices": [
      "Full packet payloads for use in deep packet inspection",
      "Encrypted VPN tunnel keys for traffic decryption",
      "SNMP trap messages forwarded from managed devices",
      "IP flow metadata: source/destination IP, ports, protocol, byte/packet counts, and timestamps"
    ],
    "correctAnswer": 3,
    "explanation": "NetFlow exports flow records — not packet content — containing metadata about each conversation: endpoints, protocol/port, data volume, and timing. This enables traffic analysis, capacity planning, and security anomaly detection without capturing payloads."
  },
  {
    "id": "netplus-69",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "An administrator wants immediate notification when a network device goes down, rather than waiting for the next polling cycle. Which SNMP mechanism should be configured on the managed devices?",
    "choices": [
      "SNMP traps (or Informs) sent to the NMS when an event occurs",
      "SNMP GET requests from the NMS at 60-second intervals",
      "SNMP MIB walk initiated hourly by the NMS",
      "SNMP community string rotation on all devices"
    ],
    "correctAnswer": 0,
    "explanation": "SNMP traps are asynchronous notifications sent by an agent to the NMS when a significant event occurs — such as a link going down — without waiting to be polled. SNMP Informs add acknowledgment, ensuring the NMS received the notification."
  },
  {
    "id": "netplus-70",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "Which type of network documentation maps the IP addressing scheme, device hostnames, subnet boundaries, and logical interconnections used for IP planning and troubleshooting?",
    "choices": [
      "Physical network diagram",
      "Wiring schedule (port inventory)",
      "Logical network diagram",
      "Change management log"
    ],
    "correctAnswer": 2,
    "explanation": "A logical network diagram shows Layer 3 information: IP addresses, subnets, routing domains, and device relationships — without depicting physical cable paths or rack locations. Physical diagrams show cable runs, ports, and equipment placement."
  },
  {
    "id": "netplus-71",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "After restoring service following a network outage, which formal step is most important in a mature network operations process?",
    "choices": [
      "Immediately decommission all hardware involved in the outage",
      "Conduct a post-incident review (PIR) to document root cause and implement preventive measures",
      "Reset all user passwords on devices connected during the outage",
      "Replace the NOC monitoring platform with a newer system"
    ],
    "correctAnswer": 1,
    "explanation": "A post-incident review (PIR) determines root cause, assesses impact, documents the timeline, and identifies changes to prevent recurrence. This closes the incident management loop and improves future resilience. The other options are disproportionate or irrelevant responses."
  },
  {
    "id": "netplus-72",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What is the primary purpose of establishing a network performance baseline?",
    "choices": [
      "To document normal traffic patterns and performance metrics for comparison during troubleshooting and capacity planning",
      "To encrypt all data traversing the network to a known standard",
      "To reset routing protocols to factory default configurations",
      "To systematically assign IP addresses across all network subnets"
    ],
    "correctAnswer": 0,
    "explanation": "A baseline captures normal utilization, latency, error rates, and traffic patterns during regular operation. When performance degrades or anomalies occur, comparing current readings to the baseline quickly highlights what has changed."
  },
  {
    "id": "netplus-73",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "A technician needs to back up a router running-config to a network server. Which lightweight, connectionless protocol is most commonly used for this task on network devices?",
    "choices": [
      "FTP",
      "TFTP",
      "SMTP",
      "SCP"
    ],
    "correctAnswer": 1,
    "explanation": "TFTP (Trivial File Transfer Protocol, UDP port 69) is widely supported by network OSes for transferring configuration files and firmware images. Its minimal overhead and simple implementation make it a standard tool in managed network environments."
  },
  {
    "id": "netplus-74",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "Which AAA protocol uses TCP for transport, encrypts the entire packet payload, and separates authentication, authorization, and accounting into independent processes?",
    "choices": [
      "RADIUS (UDP, encrypts only the password field)",
      "Kerberos (ticket-based LAN authentication)",
      "TACACS+ (TCP, full payload encryption, separated AAA)",
      "LDAP (directory access, not an AAA protocol)"
    ],
    "correctAnswer": 2,
    "explanation": "TACACS+ uses TCP port 49 and encrypts the entire body of every packet, making it more secure than RADIUS, which uses UDP and encrypts only the password field. TACACS+ also separates authentication, authorization, and accounting, enabling granular per-command authorization for device management."
  },
  {
    "id": "netplus-75",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "A switch port is configured with port security, maximum MAC addresses = 1. What occurs when a second MAC address is detected on the port?",
    "choices": [
      "The switch automatically moves the second device to a quarantine VLAN",
      "The switch logs a notice and permits both MAC addresses",
      "The switch takes the configured violation action: shutdown, restrict, or protect",
      "The switch sends a gratuitous ARP to alert administrators of the new device"
    ],
    "correctAnswer": 2,
    "explanation": "When a port security violation is triggered, the switch enforces the configured violation mode: Shutdown (err-disables the port and sends an SNMP trap), Restrict (drops violating frames and increments a counter), or Protect (silently drops violating frames). Shutdown is the default."
  },
  {
    "id": "netplus-76",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "Which Layer 2 access control standard authenticates devices or users before allowing LAN access, using EAP over a RADIUS server for credential validation?",
    "choices": [
      "802.1X (Port-Based Network Access Control)",
      "Port security with sticky MAC learning",
      "VLAN segmentation and private VLANs",
      "MAC address filtering on the switch"
    ],
    "correctAnswer": 0,
    "explanation": "802.1X uses EAP (Extensible Authentication Protocol) over LAN to authenticate supplicants (clients) through an authenticator (switch or AP) to an authentication server (RADIUS). Until authenticated, the port only passes EAPOL frames, blocking all other traffic."
  },
  {
    "id": "netplus-77",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "An attacker sends thousands of frames with random source MAC addresses to a switch, filling its CAM table. What is the intended result of this MAC flooding attack?",
    "choices": [
      "The switch begins dropping all ARP replies, preventing address resolution for legitimate hosts",
      "The switch crashes due to memory exhaustion and reboots, causing a denial of service",
      "The switch forwards all subsequent unknown traffic out all ports like a hub, enabling sniffing",
      "The switch generates a spanning tree topology change, isolating the attacker on a separate segment"
    ],
    "correctAnswer": 2,
    "explanation": "A MAC flooding attack fills the switch CAM table with fake entries. When the table is full, the switch cannot look up legitimate destination MACs and floods unknown frames out all ports, allowing the attacker to capture traffic intended for other hosts (like a hub)."
  },
  {
    "id": "netplus-78",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "Which wireless attack deploys a rogue access point broadcasting the same SSID as a legitimate network to intercept or manipulate client traffic?",
    "choices": [
      "Deauthentication (disassociation) flood attack",
      "WPS PIN brute-force attack",
      "Evil twin access point attack",
      "Beacon flooding (virtual AP) attack"
    ],
    "correctAnswer": 2,
    "explanation": "An evil twin attack creates a rogue AP that mimics a legitimate SSID. Clients that associate with it route their traffic through the attacker, enabling credential theft and session hijacking. It is often combined with a deauthentication attack to force clients off the legitimate AP."
  },
  {
    "id": "netplus-79",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "A router ACL contains the entry: deny tcp any host 10.1.1.10 eq 23. What traffic does this rule block?",
    "choices": [
      "Telnet (TCP port 23) traffic from any source destined for host 10.1.1.10",
      "All TCP traffic originating from host 10.1.1.10 to any destination",
      "All UDP traffic to any host on port 23",
      "SSH (TCP port 22) traffic from any source to host 10.1.1.10"
    ],
    "correctAnswer": 0,
    "explanation": "The ACE matches: protocol TCP, source any, destination 10.1.1.10, destination port 23 (Telnet). This drops all Telnet connection attempts to that specific host from any source IP. Port 23 is Telnet; port 22 is SSH."
  },
  {
    "id": "netplus-80",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What is DHCP snooping designed to prevent?",
    "choices": [
      "Unauthorized routing protocol updates injected by rogue routers",
      "MAC flooding attacks that overflow the switch CAM table",
      "Spanning tree topology changes triggered by unauthorized switches",
      "Rogue DHCP servers from assigning malicious gateway and DNS configurations to clients"
    ],
    "correctAnswer": 3,
    "explanation": "DHCP snooping classifies switch ports as trusted (uplinks to legitimate DHCP servers) or untrusted (access ports). DHCP OFFER and ACK messages arriving on untrusted ports are dropped, preventing rogue DHCP servers from redirecting client traffic to an attacker-controlled gateway."
  },
  {
    "id": "netplus-81",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A user can successfully ping their default gateway but cannot reach any internet sites by IP address. What is the most probable cause?",
    "choices": [
      "The user's NIC has a hardware fault",
      "The default gateway IP address is misconfigured on the workstation",
      "A routing or firewall issue beyond the gateway is blocking outbound traffic",
      "The workstation has an incorrect subnet mask"
    ],
    "correctAnswer": 2,
    "explanation": "Reaching the default gateway proves the NIC, local cabling, switch port, and gateway are functional, and the subnet mask is correct. Failure beyond the gateway points to a WAN-side issue: a missing or incorrect upstream route, an ISP problem, or a firewall policy blocking outbound traffic."
  },
  {
    "id": "netplus-82",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A technician runs traceroute to a remote server and sees hop 4 consistently shows * * * while later hops respond normally. What does this most likely indicate?",
    "choices": [
      "The remote destination server is offline",
      "The router at hop 4 filters ICMP TTL-exceeded replies but still forwards traffic",
      "The traceroute probes are taking a different path on each attempt",
      "The technician's DNS server is not resolving intermediate hop names"
    ],
    "correctAnswer": 1,
    "explanation": "When a router forwards traffic normally but does not generate ICMP Time Exceeded replies (due to a firewall ACL blocking ICMP), it appears as * * * in traceroute output. Since subsequent hops respond, the path is not broken — that router simply discards ICMP responses."
  },
  {
    "id": "netplus-83",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A workstation communicates successfully with all hosts on its local subnet but cannot reach hosts on any other subnet. What is the most likely cause?",
    "choices": [
      "Incorrect or missing default gateway configuration on the workstation",
      "A duplex mismatch on the connecting switch port",
      "A faulty physical switch port",
      "A DNS resolution failure on the workstation"
    ],
    "correctAnswer": 0,
    "explanation": "The default gateway is the router interface on the local subnet that forwards packets to remote networks. Without a correct default gateway, the host has no path off its local segment. DNS failure prevents name resolution but does not block IP-level communication to known addresses."
  },
  {
    "id": "netplus-84",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "Two directly connected switch ports show excessive CRC errors and poor throughput. One port is hard-coded to full-duplex 100 Mbps; the other is set to auto-negotiate. What is the most likely cause?",
    "choices": [
      "A VLAN mismatch between the two ports",
      "STP has placed one port in the blocking state",
      "A duplex mismatch — the auto-negotiating port settled at half-duplex",
      "The cable connecting the ports has a damaged pair"
    ],
    "correctAnswer": 2,
    "explanation": "When one side is hard-coded full-duplex and the other auto-negotiates, the auto side detects no duplex signal and falls back to half-duplex. The full-duplex side does not implement CSMA/CD; when it transmits during the half-duplex side's transmission, collisions and CRC errors result."
  },
  {
    "id": "netplus-85",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A cable tester reports an open fault on wire pair 3. What does this diagnosis indicate?",
    "choices": [
      "The pair wires are shorted together at a crimp termination",
      "The cable exhibits excessive near-end crosstalk (NEXT) from adjacent pairs",
      "The cable run exceeds the maximum rated length for the installed category",
      "There is a break in one or both wires of that pair — no electrical continuity"
    ],
    "correctAnswer": 3,
    "explanation": "An open on a cable tester means the circuit is broken: a wire is cut, a crimp pin is not making contact, or a conductor has snapped. The tester sends a signal and detects no return, indicating no continuity. A short means two conductors are touching unintentionally."
  },
  {
    "id": "netplus-86",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "Which CompTIA troubleshooting methodology approach starts by verifying physical connectivity and Layer 1 components before examining higher OSI layers?",
    "choices": [
      "Top-down (starting at the Application layer and working down)",
      "Bottom-up (starting at the Physical layer and working up)",
      "Divide and conquer (starting in the middle of the OSI stack)",
      "Follow-the-path (tracing the route the traffic takes end-to-end)"
    ],
    "correctAnswer": 1,
    "explanation": "The bottom-up approach begins at OSI Layer 1 (Physical): check cables, link lights, and NIC status, then moves to Layer 2 (MAC/VLAN), Layer 3 (IP), and so on. It is thorough but time-consuming; divide and conquer starts wherever symptoms suggest the problem layer."
  },
  {
    "id": "netplus-87",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A workstation's DHCP lease expires and it self-assigns a 169.254.x.x address. What does this APIPA address indicate?",
    "choices": [
      "The DNS server is unreachable, so the device used a cached lease address",
      "The NIC driver has become corrupted and requires reinstallation",
      "The DHCP server is unreachable or did not respond within the timeout period",
      "The default gateway has been removed from the routing table"
    ],
    "correctAnswer": 2,
    "explanation": "APIPA (Automatic Private IP Addressing) assigns an address in 169.254.0.0/16 when a Windows device cannot contact a DHCP server. The device broadcasts four DHCPDISCOVER messages; if none are answered, it self-configures with APIPA, which only allows link-local communication."
  },
  {
    "id": "netplus-88",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "Which tool measures real-world wireless signal strength, noise floor, channel utilization, and interference across a physical space?",
    "choices": [
      "Wireless site survey tool (spectrum analyzer / survey software)",
      "Protocol analyzer (e.g., Wireshark)",
      "Cable certifier (TDR-based copper tester)",
      "OTDR (Optical Time Domain Reflectometer)"
    ],
    "correctAnswer": 0,
    "explanation": "A wireless site survey tool (hardware spectrum analyzer or software like Ekahau) measures RSSI, SNR, channel overlap, and AP coverage area. It is used during design to position APs optimally and during troubleshooting to identify RF interference or dead zones."
  },
  {
    "id": "netplus-89",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the purpose of the IPv4 loopback address 127.0.0.1?",
    "choices": [
      "To represent the host's default gateway for routing decisions",
      "To represent all IP addresses assigned to a host (wildcard bind address)",
      "To broadcast to all hosts on the local subnet",
      "To test the local TCP/IP stack without sending traffic on the physical network"
    ],
    "correctAnswer": 3,
    "explanation": "The loopback address (127.0.0.1, or the entire 127.0.0.0/8 block) routes packets back to the originating host's TCP/IP stack without engaging the NIC or network. Pinging 127.0.0.1 confirms the IP stack is initialized and functioning correctly."
  },
  {
    "id": "netplus-90",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "A network design document describes a collapsed core architecture. What does this term mean?",
    "choices": [
      "All access switches connect directly to the internet edge router, bypassing distribution",
      "The core and distribution layers are merged into a single tier of high-performance switches",
      "The core layer is fully redundant with two physically separate core switches",
      "Layer 2 switching is eliminated entirely in favor of a fully routed access design"
    ],
    "correctAnswer": 1,
    "explanation": "A collapsed core (two-tier) design merges the core and distribution layers into a single pair of switches. It simplifies the design and reduces cost for small-to-medium networks, at the expense of the dedicated high-speed core layer used in three-tier (access/distribution/core) enterprise architectures."
  },
  {
    "id": "netplus-91",
    "domain": "Network Troubleshooting",
    "type": "multiple-response",
    "question": "Which TWO tools would a technician use to verify physical layer connectivity and locate a specific cable run within a copper Ethernet installation? (Select two)",
    "choices": [
      "Cable tester (continuity and wire map)",
      "Protocol analyzer (e.g., Wireshark)",
      "OTDR (Optical Time Domain Reflectometer)",
      "Toner probe with tone generator"
    ],
    "correctAnswers": [0, 3],
    "explanation": "A cable tester verifies continuity, wire mapping, and basic link health on copper cabling. A toner probe (inductive amplifier) with a tone generator traces a specific cable run through walls and patch panels. OTDR is for fiber; protocol analyzers work at Layer 2 and above."
  },
  {
    "id": "netplus-92",
    "domain": "Network Security",
    "type": "multiple-response",
    "question": "Which TWO statements accurately describe WPA3 compared to WPA2? (Select two)",
    "choices": [
      "WPA3 replaces PSK with SAE (Simultaneous Authentication of Equals), resisting offline dictionary attacks",
      "WPA3 requires a minimum SSID length of 16 characters",
      "WPA3 provides perfect forward secrecy so capturing current traffic cannot decrypt past sessions",
      "WPA3 is fully backward compatible with all WPA and WEP devices without configuration changes"
    ],
    "correctAnswers": [0, 2],
    "explanation": "WPA3-Personal uses SAE (Dragonfly key exchange) instead of the 4-way handshake PSK, preventing offline brute-force attacks. WPA3 also mandates perfect forward secrecy: each session uses a unique key, so one compromised session key cannot expose past or future sessions."
  },
  {
    "id": "netplus-93",
    "domain": "Network Implementation",
    "type": "multiple-response",
    "question": "Which TWO are direct benefits of implementing VLANs on a switched network? (Select two)",
    "choices": [
      "Reduces the size of each broadcast domain, limiting unnecessary broadcast propagation",
      "Eliminates the need for a router or Layer 3 switch to route traffic between segments",
      "Provides logical traffic segmentation for security and administrative boundaries",
      "Automatically encrypts inter-VLAN traffic without additional configuration"
    ],
    "correctAnswers": [0, 2],
    "explanation": "VLANs divide a physical switch into multiple logical broadcast domains (reducing unnecessary broadcasts) and group users by function or security zone. A Layer 3 device is still required to route between VLANs; VLANs do not provide encryption."
  },
  {
    "id": "netplus-94",
    "domain": "Networking Concepts",
    "type": "matching",
    "question": "Match each routing protocol to its correct classification.",
    "itemsLeft": ["OSPF", "BGP", "RIP", "EIGRP"],
    "itemsRight": [
      "Link-state IGP",
      "Distance-vector IGP",
      "Path-vector EGP",
      "Hybrid (advanced distance-vector) IGP"
    ],
    "correctMatches": [0, 2, 1, 3],
    "explanation": "OSPF is a link-state IGP using Dijkstra's SPF algorithm. BGP is the internet's path-vector EGP exchanging routes between ASes. RIP is a distance-vector IGP using hop count as its metric. EIGRP is Cisco's hybrid IGP (DUAL algorithm) combining characteristics of both link-state and distance-vector."
  },
  {
    "id": "netplus-95",
    "domain": "Network Operations",
    "type": "matching",
    "question": "Match each network management protocol or tool to its primary function.",
    "itemsLeft": ["SNMP", "Syslog", "NetFlow", "TFTP"],
    "itemsRight": [
      "Transfer configuration files and firmware to/from network devices",
      "Poll device health via OID queries and receive asynchronous trap notifications",
      "Aggregate and store device event and error log messages centrally",
      "Collect and export IP traffic flow metadata for analysis"
    ],
    "correctMatches": [1, 2, 3, 0],
    "explanation": "SNMP monitors device health via polling and traps (index 1). Syslog collects device-generated event messages at a central server (index 2). NetFlow exports per-flow traffic statistics for capacity planning and security analysis (index 3). TFTP transfers config files and OS images (index 0)."
  },
  {
    "id": "netplus-96",
    "domain": "Network Troubleshooting",
    "type": "ordering",
    "question": "Order the CompTIA network troubleshooting methodology steps from first to last.",
    "items": [
      "Document findings, actions, and outcomes",
      "Identify the problem",
      "Test the theory to determine the cause",
      "Establish a plan of action and implement the solution",
      "Establish a theory of probable cause",
      "Verify full system functionality and implement preventive measures"
    ],
    "correctOrder": [1, 4, 2, 3, 5, 0],
    "explanation": "CompTIA's six-step process: (1) Identify the problem; (2) Establish a theory of probable cause; (3) Test the theory; (4) Establish a plan of action and implement it; (5) Verify full functionality and apply preventive measures; (6) Document everything. This structured approach prevents random trial-and-error."
  },
  {
    "id": "netplus-97",
    "domain": "Networking Concepts",
    "type": "ordering",
    "question": "Order the steps for calculating a subnet from a host count requirement in the correct sequence.",
    "items": [
      "Determine the required subnet mask (CIDR prefix) based on the host count",
      "Identify the number of hosts required per subnet",
      "Calculate the number of usable host addresses (2^n − 2)",
      "Assign host IP addresses within the valid range of the subnet"
    ],
    "correctOrder": [1, 0, 2, 3],
    "explanation": "First identify how many hosts are needed per subnet. Then choose the mask providing enough host bits (2^n − 2 >= required hosts). Calculate the actual usable count to verify. Finally, assign individual addresses within the valid range (network+1 to broadcast−1)."
  },
  {
    "id": "netplus-98",
    "domain": "Network Implementation",
    "type": "statement-block",
    "question": "For each statement about 802.11 wireless standards, indicate whether it is True or False.",
    "statements": [
      "802.11ac (Wi-Fi 5) operates exclusively on the 5 GHz band",
      "802.11n (Wi-Fi 4) introduced MIMO (Multiple Input Multiple Output) antenna technology to Wi-Fi",
      "802.11g is backward compatible with 802.11b devices on the 2.4 GHz band",
      "Wi-Fi 6 (802.11ax) operates only on the 2.4 GHz band"
    ],
    "correctAnswers": [True, True, True, False],
    "explanation": "802.11ac is 5 GHz only (true). 802.11n introduced MIMO to Wi-Fi (true). 802.11g is backward compatible with 802.11b at 2.4 GHz (true). Wi-Fi 6 (802.11ax) operates on both 2.4 GHz and 5 GHz — not exclusively 2.4 GHz (false)."
  },
  {
    "id": "netplus-99",
    "domain": "Network Security",
    "type": "statement-block",
    "question": "For each statement about firewall types, indicate whether it is True or False.",
    "statements": [
      "A stateful firewall tracks the state of active connections to allow return traffic automatically",
      "A packet-filtering firewall inspects application-layer content to detect malware signatures",
      "A next-generation firewall (NGFW) can perform application-layer (Layer 7) inspection",
      "A stateless firewall maintains a connection state table for each active session"
    ],
    "correctAnswers": [True, False, True, False],
    "explanation": "Stateful firewalls track connection state, allowing return traffic without explicit rules (true). Packet-filtering firewalls examine headers only (L3/L4) — not application content (false). NGFWs add deep packet inspection and app-layer awareness (true). Stateless firewalls evaluate each packet independently with no state table (false — state tables are the hallmark of stateful, not stateless, firewalls)."
  },
  {
    "id": "netplus-100",
    "domain": "Network Operations",
    "type": "statement-block",
    "question": "For each statement about high-availability and disaster recovery concepts, indicate whether it is True or False.",
    "statements": [
      "HSRP (Hot Standby Router Protocol) provides first-hop default gateway redundancy for LAN hosts",
      "VRRP (Virtual Router Redundancy Protocol) is a Cisco-proprietary protocol",
      "A warm standby disaster recovery site has systems installed but not fully operational, requiring time to bring online",
      "RTO (Recovery Time Objective) defines the maximum acceptable amount of data loss measured in time"
    ],
    "correctAnswers": [True, False, True, False],
    "explanation": "HSRP provides virtual gateway redundancy (true). VRRP is an open IETF standard (RFC 5798) — HSRP is Cisco-proprietary (false). A warm standby has hardware pre-staged but requires setup time to go live (true). RTO is the maximum acceptable downtime to restore service; RPO (Recovery Point Objective) defines acceptable data loss (false)."
  }
]

data.extend(batch2)
with open('src/data/comptia-net-plus-questions.json', 'w') as f:
    json.dump(data, f, indent=2)
print(f'Written: {len(data)} questions')
