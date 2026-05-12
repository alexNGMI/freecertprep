import json

with open('src/data/comptia-net-plus-questions.json') as f:
    data = json.load(f)

batch4 = [
  {
    "id": "netplus-151",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the purpose of the IEEE 802.3 standard?",
    "choices": [
      "Defines wireless LAN (Wi-Fi) protocols and physical layer specifications",
      "Specifies Ethernet standards including framing, media access control, and physical layer requirements",
      "Governs spanning tree operation to prevent Layer 2 loops in switched networks",
      "Defines the port-based network access control (NAC) authentication framework"
    ],
    "correctAnswer": 1,
    "explanation": "IEEE 802.3 is the Ethernet standard covering CSMA/CD media access, frame format (destination/source MAC, EtherType, FCS), and a wide range of physical layer specifications (10BASE-T, 100BASE-TX, 1000BASE-T, 10GBASE-SR, etc.). 802.11 is Wi-Fi; 802.1D is STP; 802.1X is NAC."
  },
  {
    "id": "netplus-152",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "A network uses the address 10.0.0.0/22. How many usable host addresses does this subnet provide?",
    "choices": [
      "510 usable hosts",
      "1022 usable hosts",
      "2046 usable hosts",
      "4094 usable hosts"
    ],
    "correctAnswer": 1,
    "explanation": "/22 leaves 10 host bits: 2^10 = 1024 total addresses minus 2 (network and broadcast) = 1022 usable host addresses. The subnet spans 10.0.0.0 to 10.0.3.255 with broadcast at 10.0.3.255."
  },
  {
    "id": "netplus-153",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the well-known port number for HTTPS?",
    "choices": [
      "Port 80",
      "Port 8080",
      "Port 443",
      "Port 8443"
    ],
    "correctAnswer": 2,
    "explanation": "HTTPS (HTTP over TLS) uses TCP port 443. HTTP uses port 80. Ports 8080 and 8443 are common alternate ports for HTTP and HTTPS respectively, often used for development or proxy servers, but not the IANA-assigned well-known ports."
  },
  {
    "id": "netplus-154",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which protocol automatically assigns an IPv6 address to a host based on the router's advertised prefix, without requiring a DHCPv6 server?",
    "choices": [
      "DHCPv6 stateful address assignment",
      "IGMP group membership registration",
      "SLAAC (Stateless Address Autoconfiguration) using ICMPv6 Router Advertisements",
      "ARP-based address negotiation on the local link"
    ],
    "correctAnswer": 2,
    "explanation": "SLAAC (RFC 4862) allows a host to build its own IPv6 address by combining the /64 prefix from a Router Advertisement (RA) with a 64-bit interface identifier (derived from the MAC or randomly generated). No DHCP server is required, though a DNS server address still needs to be obtained via RA options or DHCPv6."
  },
  {
    "id": "netplus-155",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What does the term 'half-duplex' mean in the context of Ethernet communications?",
    "choices": [
      "The device can transmit at half the maximum rated link speed",
      "The device can only receive data, never transmit",
      "The device can both transmit and receive, but not simultaneously — it must take turns",
      "The link operates using two separate physical channels, one for each direction"
    ],
    "correctAnswer": 2,
    "explanation": "Half-duplex devices share the medium and use CSMA/CD to detect and recover from collisions. Only one device may transmit at a time. Full-duplex uses separate transmit and receive paths (e.g., twisted pairs in an Ethernet cable), eliminating collisions and doubling effective throughput."
  },
  {
    "id": "netplus-156",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which well-known port is used by SMTP for sending email between mail servers?",
    "choices": [
      "Port 25",
      "Port 110",
      "Port 143",
      "Port 587"
    ],
    "correctAnswer": 0,
    "explanation": "SMTP (Simple Mail Transfer Protocol) uses TCP port 25 for server-to-server mail relay. Port 110 is POP3, port 143 is IMAP (both for client mailbox retrieval). Port 587 is the SMTP submission port used by mail clients to send to their outgoing mail server with authentication."
  },
  {
    "id": "netplus-157",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the function of the ARP (Address Resolution Protocol) in IPv4 networks?",
    "choices": [
      "Resolves domain names to IP addresses for client applications",
      "Resolves IP addresses to MAC addresses so frames can be delivered on the local segment",
      "Assigns IP addresses to hosts dynamically from a configured pool",
      "Encrypts address mappings to prevent man-in-the-middle interception"
    ],
    "correctAnswer": 1,
    "explanation": "ARP broadcasts a request on the local segment asking 'Who has IP X.X.X.X? Tell MAC Y.' The host with that IP unicasts its MAC address back. The sender then uses that MAC to encapsulate the packet in an Ethernet frame for local delivery. ARP operates at the boundary of Layers 2 and 3."
  },
  {
    "id": "netplus-158",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "A company uses the network 192.168.1.0/24 and needs to create 6 subnets, each supporting at least 25 hosts. Which subnet mask meets this requirement?",
    "choices": [
      "/25 — 126 usable hosts per subnet, 2 subnets",
      "/26 — 62 usable hosts per subnet, 4 subnets",
      "/27 — 30 usable hosts per subnet, 8 subnets",
      "/28 — 14 usable hosts per subnet, 16 subnets"
    ],
    "correctAnswer": 2,
    "explanation": "/27 (255.255.255.224) provides 2^5−2 = 30 usable hosts per subnet and 2^3 = 8 subnets from a /24 — meeting both requirements (≥25 hosts and ≥6 subnets). /26 provides only 4 subnets from a /24 (insufficient). /28 provides only 14 hosts (insufficient)."
  },
  {
    "id": "netplus-159",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which routing protocol uses the concept of 'areas' to limit the size of the link-state database and reduce routing update traffic in large networks?",
    "choices": [
      "RIP v2",
      "EIGRP",
      "BGP",
      "OSPF"
    ],
    "correctAnswer": 3,
    "explanation": "OSPF divides a network into areas. Routers within an area maintain a full LSDB only for their area; inter-area routing is summarized by Area Border Routers (ABRs). Area 0 (backbone) connects all other areas. This hierarchy dramatically reduces LSDB size and SPF computation overhead in large networks."
  },
  {
    "id": "netplus-160",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the primary purpose of ICMP in IP networking?",
    "choices": [
      "Provides reliable, connection-oriented data delivery for application traffic",
      "Sends control and error messages about network conditions — such as unreachable destinations or TTL expiry — back to the source",
      "Resolves hostnames to IP addresses for client applications",
      "Encrypts IP packet headers to prevent interception during transit"
    ],
    "correctAnswer": 1,
    "explanation": "ICMP (RFC 792) is the 'error reporting and diagnostic' protocol for IP. It carries messages like Destination Unreachable, Time Exceeded (used by traceroute), Echo Request/Reply (ping), and Redirect. ICMP does not carry application data and is not a reliable transport."
  },
  {
    "id": "netplus-161",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "What is the native VLAN on an 802.1Q trunk port, and why does its configuration matter?",
    "choices": [
      "The VLAN with the highest ID on the trunk; it determines STP root bridge election",
      "The management VLAN used exclusively for switch administration traffic",
      "The VLAN whose frames are sent untagged on the trunk; it must match on both ends or traffic is misdelivered",
      "The VLAN reserved for VoIP traffic to ensure QoS priority across the trunk"
    ],
    "correctAnswer": 2,
    "explanation": "The native VLAN is the one VLAN that traverses a trunk port without an 802.1Q tag. If the native VLAN differs between the two ends of a trunk, frames from one end's native VLAN arrive on the other end's native VLAN — a VLAN mismatch that misroutes traffic and is a VLAN hopping risk. Native VLAN should be consistent and should not be VLAN 1."
  },
  {
    "id": "netplus-162",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "A network administrator enables BPDU Guard on an access port with PortFast. What happens if a switch is connected to that port?",
    "choices": [
      "The port is immediately placed in STP forwarding state to handle the new switch",
      "The port transitions to STP listening/learning to negotiate the topology",
      "The port is err-disabled immediately upon receiving a BPDU from the connected switch",
      "The port is moved to the native VLAN to isolate the unauthorized switch"
    ],
    "correctAnswer": 2,
    "explanation": "BPDU Guard protects PortFast-enabled access ports from unauthorized switches. PortFast bypasses STP states for end devices; if a BPDU is received (indicating a switch is connected), BPDU Guard immediately err-disables the port to prevent topology disruption. The port must be manually re-enabled after investigation."
  },
  {
    "id": "netplus-163",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "Which wireless frequency band provides more non-overlapping channels but shorter range compared to 2.4 GHz?",
    "choices": [
      "900 MHz",
      "2.4 GHz",
      "5 GHz",
      "60 GHz (802.11ad/ay)"
    ],
    "correctAnswer": 2,
    "explanation": "The 5 GHz band offers 23 non-overlapping 20 MHz channels (in North America) compared to only 3 in the 2.4 GHz band, dramatically reducing co-channel interference in dense deployments. However, higher frequencies attenuate more quickly through walls and over distance, reducing coverage range compared to 2.4 GHz."
  },
  {
    "id": "netplus-164",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "What is the function of a wireless LAN controller (WLC) in an enterprise wireless deployment?",
    "choices": [
      "Acts as a standalone access point providing wireless access to a single floor",
      "Centrally manages lightweight APs: pushing configuration, coordinating roaming, and performing RF management",
      "Provides DHCP and DNS services to wireless clients on behalf of the wired infrastructure",
      "Encrypts wireless traffic end-to-end between client devices and the internet"
    ],
    "correctAnswer": 1,
    "explanation": "A WLC centralizes management of lightweight (thin) APs using CAPWAP tunnels. It pushes uniform configuration to all APs, handles seamless Layer 2 and Layer 3 roaming, performs RF optimization (channel and power adjustment), and aggregates statistics. This enables consistent policy enforcement at scale."
  },
  {
    "id": "netplus-165",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "Which type of network topology connects every node directly to every other node, providing maximum redundancy at the cost of the highest cable count?",
    "choices": [
      "Star topology",
      "Ring topology",
      "Bus topology",
      "Full mesh topology"
    ],
    "correctAnswer": 3,
    "explanation": "In a full mesh topology, every node has a direct link to every other node. With n nodes, the number of links = n(n-1)/2. This provides maximum redundancy and eliminates single points of failure, but the cabling cost grows quadratically — making it practical only for small groups of critical nodes (like WAN core routers)."
  },
  {
    "id": "netplus-166",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "Which network management protocol operates over UDP port 514 and is used to collect log messages from network devices at a central server?",
    "choices": [
      "SNMP (Simple Network Management Protocol)",
      "NetFlow (IP Flow Information Export)",
      "Syslog",
      "TFTP (Trivial File Transfer Protocol)"
    ],
    "correctAnswer": 2,
    "explanation": "Syslog (RFC 5424) uses UDP port 514 (or TCP 514/6514 for reliable/encrypted delivery). Network devices send log messages categorized by facility and severity to a central syslog server, enabling centralized log aggregation, storage, and analysis for troubleshooting and compliance."
  },
  {
    "id": "netplus-167",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What is the purpose of an IP SLA (Service Level Agreement) probe configured on a Cisco router?",
    "choices": [
      "To enforce contractual bandwidth limits between the ISP and customer",
      "To actively generate test traffic (ping, UDP jitter, HTTP) and measure latency, jitter, and packet loss on a network path",
      "To monitor SNMP community strings for unauthorized access attempts",
      "To back up router configurations automatically when changes are detected"
    ],
    "correctAnswer": 1,
    "explanation": "Cisco IP SLA generates synthetic traffic and measures network performance metrics (RTT, jitter, packet loss, MOS for VoIP) proactively. Results can trigger SNMP traps, drive floating static routes (policy-based routing), and be exported to an NMS for SLA compliance reporting."
  },
  {
    "id": "netplus-168",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "A network administrator wants to verify which services are currently listening on open TCP/UDP ports on a local Windows workstation. Which built-in tool is most appropriate?",
    "choices": [
      "ipconfig /all",
      "nslookup",
      "tracert",
      "netstat -an"
    ],
    "correctAnswer": 3,
    "explanation": "netstat -an displays all active TCP connections and listening UDP/TCP ports, along with their local/foreign addresses and state. The -a flag shows all connections and listening ports; -n displays addresses and ports numerically rather than resolving them to names."
  },
  {
    "id": "netplus-169",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What does the 'show interface' command output field 'output drops' indicate on a Cisco router?",
    "choices": [
      "Packets dropped because the destination MAC address was not in the CAM table",
      "Packets arriving with CRC errors that were discarded before processing",
      "Packets that could not be queued for transmission because the output queue was full",
      "Packets blocked by an outbound ACL applied to the interface"
    ],
    "correctAnswer": 2,
    "explanation": "Output drops (also called output queue drops) occur when packets arrive for transmission faster than the interface can send them, filling the transmit queue to capacity. Excess packets are discarded. This indicates link congestion or a speed mismatch between input and output interfaces — a QoS or capacity problem."
  },
  {
    "id": "netplus-170",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "Which network documentation type records all IP address assignments, subnet allocations, and VLAN IDs in use across the organization?",
    "choices": [
      "IP Address Management (IPAM) database or spreadsheet",
      "Physical network diagram",
      "Incident response runbook",
      "Change management log"
    ],
    "correctAnswer": 0,
    "explanation": "An IPAM (IP Address Management) system tracks the allocation of every IP address, subnet, VLAN, and DNS record across the organization. It prevents duplicate address assignment, simplifies troubleshooting, and supports audit and compliance requirements. Tools range from Excel spreadsheets to dedicated solutions like InfoBlox or BlueCat."
  },
  {
    "id": "netplus-171",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What is the primary purpose of a network-based intrusion detection system (NIDS)?",
    "choices": [
      "Actively blocks malicious traffic by dropping packets at the network perimeter",
      "Monitors network traffic passively, detecting suspicious patterns and generating alerts without modifying traffic flow",
      "Encrypts all inbound traffic to prevent inspection by external attackers",
      "Applies application-layer content filtering to block unauthorized websites"
    ],
    "correctAnswer": 1,
    "explanation": "A NIDS (like Snort or Suricata in IDS mode) operates out-of-band or in a tap/SPAN configuration, analyzing traffic copies without being in the data path. It generates alerts when traffic matches known attack signatures or anomalous patterns but does not actively drop traffic. A NIPS (inline) can actively block."
  },
  {
    "id": "netplus-172",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "Which protocol provides encrypted, authenticated remote command-line access to network devices, replacing the insecure Telnet protocol?",
    "choices": [
      "SSH (Secure Shell) on TCP port 22",
      "HTTPS on TCP port 443",
      "IPsec in transport mode",
      "TLS/SSL on TCP port 636"
    ],
    "correctAnswer": 0,
    "explanation": "SSH provides encrypted, authenticated CLI sessions using public-key or password authentication. It replaces Telnet (port 23, cleartext) and rlogin. SSH also supports tunneling (port forwarding) and secure file transfer (SCP/SFTP). Port 22 is the IANA-assigned well-known port for SSH."
  },
  {
    "id": "netplus-173",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "A security team wants to prevent users from accessing known malicious websites by domain name. Which security control should be implemented?",
    "choices": [
      "Static routing with null routes for malicious IP prefixes",
      "Port security to limit MAC addresses on user switch ports",
      "DNS sinkholing or DNS filtering (redirecting malicious domain queries to a safe IP)",
      "802.1X authentication on all user access ports"
    ],
    "correctAnswer": 2,
    "explanation": "DNS sinkholing intercepts DNS queries for known malicious domains and returns a non-routable or internal IP, preventing clients from reaching C2 servers or phishing sites. DNS filtering services (Cisco Umbrella, Cloudflare Gateway) operate at the DNS layer without requiring per-endpoint agent installation."
  },
  {
    "id": "netplus-174",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "Which network access control approach checks a connecting device's security posture (OS patch level, AV status, disk encryption) before granting full network access?",
    "choices": [
      "Port security with sticky MAC learning",
      "NAC (Network Access Control) with posture assessment and quarantine VLAN",
      "VLAN segmentation based on user department",
      "Static ACLs applied to the router uplink interface"
    ],
    "correctAnswer": 1,
    "explanation": "NAC platforms (Cisco ISE, Aruba ClearPass) evaluate device health during the authentication process. Endpoints that fail posture checks (missing patches, disabled AV) are quarantined in a remediation VLAN where they can download updates before being granted access to the production network."
  },
  {
    "id": "netplus-175",
    "domain": "Network Security",
    "type": "single-choice",
    "question": "What does a demilitarized zone (DMZ) in a network architecture provide?",
    "choices": [
      "A fully trusted internal segment where servers can communicate without firewall inspection",
      "A separate network segment for publicly accessible servers that is isolated from both the internet and the internal LAN",
      "An encrypted tunnel connecting two remote offices over the public internet",
      "A VLAN exclusively used for network management traffic between administrators and devices"
    ],
    "correctAnswer": 1,
    "explanation": "A DMZ (perimeter network) hosts internet-facing servers (web, email, DNS) between two firewalls or firewall rule sets. External users can access DMZ servers; DMZ servers cannot initiate connections to the internal LAN. This limits the blast radius if a DMZ server is compromised."
  },
  {
    "id": "netplus-176",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A user reports that email works but web browsing does not. DNS resolution is confirmed working. Which tool would best help the technician determine if port 80/443 is blocked?",
    "choices": [
      "ping — test ICMP reachability to web servers",
      "nslookup — verify DNS name resolution for web addresses",
      "telnet or netcat to port 80/443 — test TCP connectivity to the web server port",
      "traceroute — trace the route to the web server"
    ],
    "correctAnswer": 2,
    "explanation": "When DNS works and ICMP ping succeeds, but a specific application (HTTP/HTTPS) fails, the issue is likely a firewall blocking TCP port 80 or 443. Using telnet or netcat to manually attempt a TCP connection to that port reveals whether the port is open, filtered, or refused — narrowing the problem to the specific protocol."
  },
  {
    "id": "netplus-177",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A network technician observes that a switch's CPU utilization is near 100% and the device is responding slowly to management access. Which scenario is the most likely cause?",
    "choices": [
      "The switch has too many VLANs configured in its VLAN database",
      "A spanning tree topology change is flooding the network with BPDUs, or a broadcast storm is overwhelming the CPU",
      "The switch's firmware is outdated and requires an update to fix a memory leak",
      "Too many SSH sessions are open simultaneously to the switch management interface"
    ],
    "correctAnswer": 1,
    "explanation": "Switch CPUs process control plane traffic (BPDUs, ARP, DHCP, routing protocol hellos). A broadcast storm or rapid STP topology changes flood the CPU with frames it must process. The solution involves finding the storm source, enabling storm control, or addressing the STP instability. High CPU from management sessions is less common and would affect only the management plane."
  },
  {
    "id": "netplus-178",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A ping test between two hosts succeeds, but file transfers between them fail. Which troubleshooting step should the technician perform next?",
    "choices": [
      "Replace both NICs and all connecting cables",
      "Check for MTU mismatch or firewall rules blocking the specific application port used for file transfer",
      "Reconfigure the default gateway on both hosts",
      "Reset the DHCP lease on both hosts to obtain fresh IP addresses"
    ],
    "correctAnswer": 1,
    "explanation": "Ping (small ICMP packets) succeeds, confirming Layer 1–3 connectivity and routing. File transfer failure with ICMP success suggests either an MTU issue (large file-transfer packets fragmented or dropped) or a firewall ACL blocking the specific TCP port (SMB port 445, FTP port 21, etc.). MTU and firewall/ACL checks are the logical next steps."
  },
  {
    "id": "netplus-179",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "Which command displays the current IP routing table on a Cisco router, showing all learned and directly connected routes?",
    "choices": [
      "show arp",
      "show ip interface brief",
      "show running-config",
      "show ip route"
    ],
    "correctAnswer": 3,
    "explanation": "show ip route displays the complete routing table, including directly connected (C), static (S), OSPF-learned (O), EIGRP-learned (D), BGP-learned (B), and default routes (*). Each entry shows the network, subnet mask, administrative distance, metric, next-hop IP, and outgoing interface."
  },
  {
    "id": "netplus-180",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A newly installed IP phone receives an IP address but has one-way audio — the far end can hear the caller but the caller cannot hear the far end. What is the most likely cause?",
    "choices": [
      "The phone's firmware is incompatible with the call manager version",
      "The phone's VLAN is not configured correctly on the switch access port",
      "An asymmetric routing or firewall/NAT issue is preventing the return RTP audio stream from reaching the caller",
      "The DHCP lease time is too short, causing the phone to re-register frequently"
    ],
    "correctAnswer": 2,
    "explanation": "One-way audio in VoIP is a classic symptom of asymmetric routing, NAT, or firewall issues. The outbound RTP stream reaches the remote party, but the return stream cannot reach the originating phone — typically because a firewall is blocking inbound UDP, NAT is incorrectly translating the media IP, or return traffic is routed differently. Check firewall rules for RTP ports (typically UDP 16384–32767 or 10000–20000)."
  },
  {
    "id": "netplus-181",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the difference between a layer 2 switch and a layer 3 switch?",
    "choices": [
      "A Layer 3 switch can only route between directly connected subnets; a Layer 2 switch can route between any subnet",
      "A Layer 2 switch forwards frames based on MAC addresses; a Layer 3 switch can also route packets based on IP addresses",
      "A Layer 2 switch supports VLANs; a Layer 3 switch does not support VLAN configuration",
      "A Layer 3 switch operates at wire speed only on copper; a Layer 2 switch supports both copper and fiber"
    ],
    "correctAnswer": 1,
    "explanation": "A Layer 2 switch builds a MAC address table (CAM) and forwards Ethernet frames within a VLAN. A Layer 3 (multilayer) switch adds hardware-based IP routing capability, allowing it to route between VLANs (inter-VLAN routing) at near wire speed without a separate router."
  },
  {
    "id": "netplus-182",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "What is the subnet broadcast address for the network 172.16.48.0/20?",
    "choices": [
      "172.16.48.255",
      "172.16.63.255",
      "172.16.55.255",
      "172.16.64.0"
    ],
    "correctAnswer": 1,
    "explanation": "/20 means 20 network bits and 12 host bits. The block size in the third octet is 16 (256−240=16). Subnet 172.16.48.0/20 spans 172.16.48.0 to 172.16.63.255 (next subnet starts at 172.16.64.0). The broadcast is the last address: 172.16.63.255."
  },
  {
    "id": "netplus-183",
    "domain": "Networking Concepts",
    "type": "single-choice",
    "question": "Which protocol provides automatic failover of the default gateway by using a virtual IP address shared between two routers in an active/standby pair?",
    "choices": [
      "OSPF with equal-cost multipath",
      "EIGRP with feasible successor routes",
      "HSRP (Hot Standby Router Protocol)",
      "LACP (Link Aggregation Control Protocol)"
    ],
    "correctAnswer": 2,
    "explanation": "HSRP (Cisco-proprietary, RFC 2281) creates a virtual IP address shared between an active and one or more standby routers. Hosts use the virtual IP as their default gateway. If the active router fails, the standby takes over the virtual IP within seconds, providing transparent gateway redundancy."
  },
  {
    "id": "netplus-184",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "A wireless AP is configured with a hidden SSID (SSID broadcast disabled). What is the primary security implication of this configuration?",
    "choices": [
      "The AP cannot be discovered by any wireless client, providing strong protection against unauthorized access",
      "Hidden SSIDs provide minimal real security since passive scanners and driver-level tools still reveal the SSID from client probe requests",
      "Disabling SSID broadcast prevents evil twin attacks entirely",
      "Hidden SSIDs automatically enable WPA3 encryption to compensate for the reduced visibility"
    ],
    "correctAnswer": 1,
    "explanation": "Disabling SSID broadcast is security through obscurity — the SSID is still transmitted in probe request/response frames when legitimate clients connect. Tools like Wireshark or Kismet can capture these frames and reveal the SSID in seconds. Strong encryption (WPA2/WPA3) and authentication are the real security controls."
  },
  {
    "id": "netplus-185",
    "domain": "Network Implementation",
    "type": "single-choice",
    "question": "Which concept describes the practice of placing network equipment in dedicated, lockable racks within a controlled-access room to protect it from physical tampering?",
    "choices": [
      "Environmental monitoring",
      "Cable management",
      "Physical security controls for network infrastructure",
      "Hot/cold aisle containment"
    ],
    "correctAnswer": 2,
    "explanation": "Physical security of network gear includes locking equipment in racks, securing MDF/IDF rooms with badge or key access, installing surveillance cameras, and tracking visitor access. Physical access to a network device bypasses all logical security controls — an attacker with console access can reset any password."
  },
  {
    "id": "netplus-186",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "What is the purpose of a network topology diagram that includes power feeds, cooling units, and PDU connections?",
    "choices": [
      "Logical network diagram — shows IP addressing and routing relationships",
      "Physical network diagram — shows cable runs and port mappings",
      "Data center infrastructure diagram — documents power, cooling, and physical device placement for capacity and resilience planning",
      "Change management log — records modifications to power and cooling systems"
    ],
    "correctAnswer": 2,
    "explanation": "A data center infrastructure diagram (or facility diagram) includes rack layouts, power distribution units (PDUs), UPS systems, cooling airflow, and generator connections. This is essential for capacity planning, redundancy validation (ensuring A and B power feeds to critical devices), and disaster recovery planning."
  },
  {
    "id": "netplus-187",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "A network team uses configuration management software to store device configurations in a version-controlled repository. What is the primary benefit of this practice?",
    "choices": [
      "It automatically pushes configuration changes to all devices without manual intervention",
      "It enables rollback to a previous known-good configuration and auditing of who changed what and when",
      "It monitors device performance metrics and generates capacity planning reports",
      "It replaces the need for change management approval processes"
    ],
    "correctAnswer": 1,
    "explanation": "Version-controlled configuration management (using Git, RANCID, or Cisco NSO) provides a complete audit trail of configuration changes with timestamps and author information. When a change causes an outage, the team can immediately identify what changed and revert to the last known-good configuration."
  },
  {
    "id": "netplus-188",
    "domain": "Network Operations",
    "type": "single-choice",
    "question": "Which metric is used to quantify network availability, expressed as a percentage such as '99.999%' (five nines)?",
    "choices": [
      "Recovery Time Objective (RTO)",
      "Mean Time Between Failures (MTBF)",
      "Uptime percentage = MTBF / (MTBF + MTTR) × 100",
      "Mean Time To Repair (MTTR)"
    ],
    "correctAnswer": 2,
    "explanation": "Availability (%) = MTBF / (MTBF + MTTR) × 100. Five nines (99.999%) means less than 5.26 minutes of unplanned downtime per year. Improving availability requires either increasing MTBF (more reliable hardware/redundancy) or decreasing MTTR (faster detection and repair)."
  },
  {
    "id": "netplus-189",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "A technician cannot reach a remote host with ping but can reach other hosts on the same remote subnet. What should be checked first?",
    "choices": [
      "The remote host may have a host-based firewall blocking ICMP echo requests",
      "The local router's routing table has a missing default route",
      "The local switch has a VLAN mismatch on the technician's port",
      "The DNS server is returning the wrong IP address for the remote hostname"
    ],
    "correctAnswer": 0,
    "explanation": "If other hosts on the same remote subnet are reachable, routing and switching are working correctly. The most likely cause is that the specific target host has a firewall rule (Windows Firewall, iptables, or a host ACL) blocking ICMP. The technician should attempt a TCP connection to a known open port on that host to confirm it is online."
  },
  {
    "id": "netplus-190",
    "domain": "Network Troubleshooting",
    "type": "single-choice",
    "question": "Which command on a Windows workstation releases the current DHCP lease and requests a new one, useful when a host has an incorrect or conflicting IP address?",
    "choices": [
      "ipconfig /flushdns",
      "ipconfig /renew",
      "netsh int ip reset",
      "ipconfig /release followed by ipconfig /renew"
    ],
    "correctAnswer": 3,
    "explanation": "ipconfig /release sends a DHCP Release message to the server, giving up the current lease. ipconfig /renew then broadcasts a new DHCPDISCOVER to obtain a fresh IP address. Using only /renew without /release first may return the same address. /flushdns clears the DNS resolver cache but does not affect IP assignment."
  },
  {
    "id": "netplus-191",
    "domain": "Network Implementation",
    "type": "multiple-response",
    "question": "Which TWO features are required on a switch port to properly support a VoIP phone that connects a PC behind it using a single cable run? (Select two)",
    "choices": [
      "Voice VLAN (auxiliary VLAN) configured on the access port to tag VoIP traffic separately",
      "STP root guard enabled to prevent the phone from becoming the STP root bridge",
      "PoE (Power over Ethernet) enabled to power the phone without a separate power adapter",
      "EtherChannel configured between the phone and the switch port"
    ],
    "correctAnswers": [0, 2],
    "explanation": "A VoIP phone port typically needs: (1) a Voice VLAN (auxiliary VLAN) so voice frames are tagged differently from data frames from the PC behind the phone, enabling separate QoS treatment; and (2) PoE so the phone draws power from the switch without requiring an AC adapter. Root Guard and EtherChannel are not applicable to edge access ports."
  },
  {
    "id": "netplus-192",
    "domain": "Networking Concepts",
    "type": "multiple-response",
    "question": "Which TWO of the following are TRUE about the differences between TCP and UDP? (Select two)",
    "choices": [
      "TCP performs error checking and retransmits lost segments; UDP relies on upper-layer protocols for error recovery if needed",
      "UDP is connection-oriented and performs a three-way handshake before sending data",
      "TCP uses sequence numbers and acknowledgments to ensure in-order delivery",
      "UDP and TCP use the same port number space but different protocol headers"
    ],
    "correctAnswers": [0, 2],
    "explanation": "TCP performs reliable delivery via retransmission of lost segments and uses sequence/acknowledgment numbers to guarantee in-order delivery (true for both A and C). UDP is connectionless — no handshake — and does not guarantee delivery or order. While both share the same port number range (0–65535), this is not a meaningful difference between the protocols."
  },
  {
    "id": "netplus-193",
    "domain": "Network Security",
    "type": "multiple-response",
    "question": "Which TWO practices are recommended to harden a network device's management plane? (Select two)",
    "choices": [
      "Disable unused management protocols such as Telnet, HTTP, and SNMP v1/v2c",
      "Enable CDP (Cisco Discovery Protocol) on all external-facing interfaces for easier troubleshooting",
      "Restrict management access using an ACL that only permits connections from trusted management IP addresses",
      "Configure all switch ports as trunk ports to ensure management VLAN traffic reaches all switches"
    ],
    "correctAnswers": [0, 2],
    "explanation": "Management plane hardening: disable insecure/unused protocols (Telnet, HTTP, SNMPv1/v2c) and replace with secure equivalents (SSH, HTTPS, SNMPv3); restrict management access with an ACL limiting which source IPs may reach vty lines or the management interface. CDP on external interfaces leaks device model and IOS version to potential attackers; trunk ports on all ports creates security risks."
  },
  {
    "id": "netplus-194",
    "domain": "Networking Concepts",
    "type": "matching",
    "question": "Match each well-known service to its default port number.",
    "itemsLeft": ["DNS", "DHCP (server)", "SNMP", "RDP"],
    "itemsRight": [
      "UDP 67",
      "UDP/TCP 53",
      "TCP 3389",
      "UDP 161"
    ],
    "correctMatches": [1, 0, 3, 2],
    "explanation": "DNS uses UDP/TCP port 53. DHCP server listens on UDP port 67 (clients use 68). SNMP agents listen on UDP port 161 (SNMP traps go to UDP 162). RDP (Remote Desktop Protocol) uses TCP port 3389."
  },
  {
    "id": "netplus-195",
    "domain": "Network Troubleshooting",
    "type": "matching",
    "question": "Match each network symptom to its most likely root cause.",
    "itemsLeft": ["APIPA address (169.254.x.x)", "Duplicate IP address conflict", "One-way audio on VoIP", "Slow throughput with strong Wi-Fi signal"],
    "itemsRight": [
      "Co-channel interference from overlapping APs on the same channel",
      "DHCP server unreachable — client self-assigned an address",
      "Asymmetric routing or firewall blocking the return RTP stream",
      "Two devices assigned the same IP, causing ARP conflicts"
    ],
    "correctMatches": [1, 3, 2, 0],
    "explanation": "APIPA → DHCP unreachable (index 1). Duplicate IP → ARP conflicts (index 3). One-way VoIP audio → asymmetric routing/firewall blocking return RTP (index 2). Strong Wi-Fi signal with slow throughput → co-channel interference (index 0)."
  },
  {
    "id": "netplus-196",
    "domain": "Network Operations",
    "type": "ordering",
    "question": "Order the following actions a technician should take when responding to a reported network outage, from first to last.",
    "items": [
      "Restore service by implementing the fix or failover procedure",
      "Gather information from users and monitoring systems to identify the scope",
      "Document the outage timeline, actions taken, and root cause",
      "Identify the probable root cause through testing and log review",
      "Notify affected stakeholders of the outage and estimated resolution time"
    ],
    "correctOrder": [1, 4, 3, 0, 2],
    "explanation": "Outage response: (1) Gather scope information from users and alerts; (2) Notify stakeholders immediately so they can manage business impact; (3) Investigate logs and test to identify root cause; (4) Implement the fix or failover; (5) Document everything including timeline and root cause for post-incident review."
  },
  {
    "id": "netplus-197",
    "domain": "Network Security",
    "type": "ordering",
    "question": "Order the steps in a penetration testing engagement from first to last.",
    "items": [
      "Exploit identified vulnerabilities to demonstrate actual impact",
      "Obtain written authorization (Rules of Engagement) from the target organization",
      "Deliver a report detailing findings, evidence, and remediation recommendations",
      "Perform reconnaissance to map the target network and identify attack surfaces",
      "Scan for vulnerabilities using tools such as Nessus or OpenVAS"
    ],
    "correctOrder": [1, 3, 4, 0, 2],
    "explanation": "Penetration testing phases: (1) Authorization — get written ROE before anything; (2) Reconnaissance — passive and active information gathering; (3) Vulnerability scanning — identify weaknesses; (4) Exploitation — demonstrate real-world impact; (5) Reporting — document findings and recommend remediations."
  },
  {
    "id": "netplus-198",
    "domain": "Networking Concepts",
    "type": "statement-block",
    "question": "For each statement about the OSI model's Transport layer (Layer 4), indicate whether it is True or False.",
    "statements": [
      "TCP uses a three-way handshake (SYN, SYN-ACK, ACK) to establish a connection before data transfer",
      "UDP provides guaranteed delivery by retransmitting lost datagrams automatically",
      "TCP flow control uses a sliding window to match the send rate to the receiver's buffer capacity",
      "Transport layer protocols such as TCP and UDP use port numbers to identify specific application services"
    ],
    "correctAnswers": [True, False, True, True],
    "explanation": "TCP three-way handshake: SYN → SYN-ACK → ACK (true). UDP is connectionless with no retransmission guarantee (false). TCP sliding window throttles the sender to match receiver capacity (true). Both TCP and UDP use port numbers (0–65535) to multiplex multiple applications on a single IP address (true)."
  },
  {
    "id": "netplus-199",
    "domain": "Network Implementation",
    "type": "statement-block",
    "question": "For each statement about STP (Spanning Tree Protocol), indicate whether it is True or False.",
    "statements": [
      "STP prevents Layer 2 loops by placing redundant ports in a blocking state",
      "The STP root bridge is selected based on the highest bridge priority, with MAC address as a tiebreaker",
      "PortFast should be configured on ports connecting to end devices to bypass the listening/learning states",
      "BPDU Guard immediately err-disables a PortFast port if a BPDU is received on it"
    ],
    "correctAnswers": [True, False, True, True],
    "explanation": "STP blocks redundant ports to prevent loops (true). Root bridge is the LOWEST bridge priority (default 32768), with lowest MAC as tiebreaker — not highest (false). PortFast skips the 30-second listening/learning delay for end devices (true). BPDU Guard err-disables the port if a BPDU arrives, protecting against unauthorized switches on PortFast ports (true)."
  },
  {
    "id": "netplus-200",
    "domain": "Network Security",
    "type": "statement-block",
    "question": "For each statement about VPN technologies, indicate whether it is True or False.",
    "statements": [
      "IPsec can operate in transport mode (encrypts payload only) or tunnel mode (encrypts entire original packet)",
      "SSL/TLS VPNs require a pre-installed VPN client application and cannot work through a standard web browser",
      "A split-tunnel VPN configuration routes only corporate-destined traffic through the VPN; other traffic goes directly to the internet",
      "IKE (Internet Key Exchange) is used in IPsec to negotiate encryption algorithms and exchange keys"
    ],
    "correctAnswers": [True, False, True, True],
    "explanation": "IPsec transport encrypts the payload; tunnel mode encapsulates the entire original packet (true). SSL/TLS VPNs (like clientless mode on Cisco ASA) can operate via a web browser — a full client is not always required (false). Split tunneling sends only corporate traffic through the VPN (true). IKE negotiates the Security Association (SA) parameters and performs key exchange for IPsec (true)."
  }
]

data.extend(batch4)
with open('src/data/comptia-net-plus-questions.json', 'w') as f:
    json.dump(data, f, indent=2)
print(f'Written: {len(data)} questions')
