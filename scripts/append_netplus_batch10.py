import json, pathlib

Q = pathlib.Path("src/data/comptia-net-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 451-490 ──────────────────────────────────────────────────────────────

  # 451 D1 correctAnswer:2
  {"id":"netplus-451","domain":"Networking Concepts","type":"single-choice",
   "question":"A workstation boots and sends a broadcast frame to find a DHCP server. Which message initiates the DHCP DORA process?",
   "choices":["DHCPACK","DHCPOFFER","DHCPDISCOVER","DHCPREQUEST"],"correctAnswer":2},

  # 452 D1 correctAnswer:0
  {"id":"netplus-452","domain":"Networking Concepts","type":"single-choice",
   "question":"After receiving a DHCPDISCOVER, a DHCP server responds with an available IP address, subnet mask, lease time, and gateway. What is this response message called?",
   "choices":["DHCPOFFER","DHCPACK","DHCPREQUEST","DHCPNAK"],"correctAnswer":0},

  # 453 D1 correctAnswer:1
  {"id":"netplus-453","domain":"Networking Concepts","type":"single-choice",
   "question":"A DHCP client receives offers from two servers and must formally accept one. Which broadcast message does the client send to accept the chosen offer?",
   "choices":["DHCPDISCOVER","DHCPREQUEST","DHCPOFFER","DHCPACK"],"correctAnswer":1},

  # 454 D1 correctAnswer:3
  {"id":"netplus-454","domain":"Networking Concepts","type":"single-choice",
   "question":"The DHCP server receives the client's DHCPREQUEST and finalizes the address assignment. Which message confirms the lease to the client?",
   "choices":["DHCPOFFER","DHCPREQUEST","DHCPNAK","DHCPACK"],"correctAnswer":3},

  # 455 D1 correctAnswer:2
  {"id":"netplus-455","domain":"Networking Concepts","type":"single-choice",
   "question":"A host needs the MAC address of another device on the same subnet. It sends an ARP request. How is the ARP request transmitted on the local network?",
   "choices":["Unicast to the target IP","Anycast to the nearest gateway","Broadcast to all devices on the subnet","Multicast to the ARP multicast group"],"correctAnswer":2},

  # 456 D1 correctAnswer:0
  {"id":"netplus-456","domain":"Networking Concepts","type":"single-choice",
   "question":"A host sends an ARP message announcing its own IP-to-MAC binding to update neighbor ARP caches after a NIC replacement. What is this called?",
   "choices":["Gratuitous ARP","Proxy ARP","ARP poisoning","Reverse ARP"],"correctAnswer":0},

  # 457 D1 correctAnswer:1
  {"id":"netplus-457","domain":"Networking Concepts","type":"single-choice",
   "question":"In IPv6 SLAAC, a host automatically configures its own global unicast address. Which ICMPv6 message does the host listen for to obtain the network prefix and default gateway?",
   "choices":["Neighbor Solicitation","Router Advertisement","Router Solicitation","Redirect"],"correctAnswer":1},

  # 458 D1 correctAnswer:3
  {"id":"netplus-458","domain":"Networking Concepts","type":"single-choice",
   "question":"A host using SLAAC generates its IPv6 interface identifier from its 48-bit MAC address by inserting FF:FE in the middle and flipping the 7th bit. What is this process called?",
   "choices":["DAD (Duplicate Address Detection)","DHCPv6 stateful assignment","Privacy extension addressing","EUI-64"],"correctAnswer":3},

  # 459 D1 correctAnswer:2
  {"id":"netplus-459","domain":"Networking Concepts","type":"single-choice",
   "question":"A client's stub resolver sends a DNS query to its configured DNS server and expects a complete answer. The DNS server queries other servers on the client's behalf. What type of query did the client send?",
   "choices":["Iterative query","Authoritative query","Recursive query","Reverse query"],"correctAnswer":2},

  # 460 D1 correctAnswer:0
  {"id":"netplus-460","domain":"Networking Concepts","type":"single-choice",
   "question":"A DNS server receives a query it cannot answer authoritatively. Instead of resolving it fully, it returns a referral to another DNS server. What type of query response is this?",
   "choices":["Iterative response","Recursive response","Authoritative response","Negative response"],"correctAnswer":0},

  # 461 D1 correctAnswer:1
  {"id":"netplus-461","domain":"Networking Concepts","type":"single-choice",
   "question":"Modern switched networks operate in full-duplex mode. What is the primary advantage of full-duplex over half-duplex Ethernet?",
   "choices":["Full-duplex doubles the collision domain size","Full-duplex allows simultaneous transmission and reception, eliminating collisions","Full-duplex reduces the number of required switch ports","Full-duplex only works with fiber cabling"],"correctAnswer":1},

  # 462 D1 correctAnswer:3
  {"id":"netplus-462","domain":"Networking Concepts","type":"single-choice",
   "question":"CSMA/CD is the media access method used by which network technology to detect and recover from collisions on a shared medium?",
   "choices":["802.11 Wi-Fi","Token Ring","Bluetooth","Traditional half-duplex Ethernet"],"correctAnswer":3},

  # 463 D2 correctAnswer:0
  {"id":"netplus-463","domain":"Network Implementation","type":"single-choice",
   "question":"A network technician is verifying cable compatibility for a 1000BASE-T (Gigabit Ethernet) installation. Which is the minimum cable category required to support 1 Gbps at 100 meters?",
   "choices":["Cat5e","Cat6","Cat6A","Cat7"],"correctAnswer":0},

  # 464 D2 correctAnswer:2
  {"id":"netplus-464","domain":"Network Implementation","type":"single-choice",
   "question":"A data center requires 10 Gbps connections to server racks over runs up to 100 meters. Which cable category is specifically rated for 10GBASE-T at that full distance?",
   "choices":["Cat5e","Cat6","Cat6A","Cat7A"],"correctAnswer":2},

  # 465 D2 correctAnswer:1
  {"id":"netplus-465","domain":"Network Implementation","type":"single-choice",
   "question":"A data center technician is connecting SFP+ transceivers to fiber patch panels. Which small form-factor fiber connector uses a latch mechanism and is the most commonly deployed connector in modern data centers?",
   "choices":["SC","LC","ST","MPO"],"correctAnswer":1},

  # 466 D2 correctAnswer:3
  {"id":"netplus-466","domain":"Network Implementation","type":"single-choice",
   "question":"A telecom technician terminates a fiber run to a patch panel using a connector with a square-shaped ferrule and a push-pull coupling mechanism. Which connector type is this?",
   "choices":["LC","ST","MPO","SC"],"correctAnswer":3},

  # 467 D2 correctAnswer:0
  {"id":"netplus-467","domain":"Network Implementation","type":"single-choice",
   "question":"An older campus network uses fiber patch cables with a round connector and a twist-lock bayonet coupling. Which fiber connector type is this?",
   "choices":["ST","SC","LC","FC"],"correctAnswer":0},

  # 468 D2 correctAnswer:2
  {"id":"netplus-468","domain":"Network Implementation","type":"single-choice",
   "question":"A data center engineer is installing a high-density fiber backbone between MDF and IDF panels using 12-fiber trunk cables. Which connector type terminates these multi-fiber trunk assemblies?",
   "choices":["LC duplex","SC duplex","MPO/MTP","ST"],"correctAnswer":2},

  # 469 D2 correctAnswer:1
  {"id":"netplus-469","domain":"Network Implementation","type":"single-choice",
   "question":"A broadband technician installs coaxial cable from a distribution amplifier to a home for internet service. Which coaxial cable type is standard for DOCSIS cable internet and satellite TV installations?",
   "choices":["RG-58","RG-6","RG-59","RG-8"],"correctAnswer":1},

  # 470 D2 correctAnswer:3
  {"id":"netplus-470","domain":"Network Implementation","type":"single-choice",
   "question":"A network engineer is configuring WPA2-Personal on access points. Which encryption protocol does WPA2 use that replaced the vulnerable TKIP used in WPA?",
   "choices":["WEP","TKIP","RC4","AES-CCMP"],"correctAnswer":3},

  # 471 D2 correctAnswer:0
  {"id":"netplus-471","domain":"Network Implementation","type":"single-choice",
   "question":"A wireless administrator is decommissioning older access points that only supported WPA with TKIP. Why was TKIP replaced?",
   "choices":["TKIP was found to be cryptographically weak and vulnerable to attacks including the KRACK vulnerability","TKIP required dedicated hardware accelerators unavailable in older APs","TKIP increased overhead and reduced throughput below 1 Mbps","TKIP only supported 40-bit key lengths"],"correctAnswer":0},

  # 472 D2 correctAnswer:2
  {"id":"netplus-472","domain":"Network Implementation","type":"single-choice",
   "question":"WPA3-Personal introduces a new handshake to replace the four-way handshake used in WPA2. What specific threat does this WPA3 improvement protect against?",
   "choices":["Rogue AP impersonation attacks","WPS PIN brute-force attacks","Offline dictionary attacks against the pre-shared key","Deauthentication flood attacks"],"correctAnswer":2},

  # 473 D3 correctAnswer:1
  {"id":"netplus-473","domain":"Network Operations","type":"single-choice",
   "question":"A network engineer accesses routers via a dedicated management network that is physically separate from the production data network. What type of management access is this?",
   "choices":["In-band management","Out-of-band management","Remote desktop management","SNMP management"],"correctAnswer":1},

  # 474 D3 correctAnswer:3
  {"id":"netplus-474","domain":"Network Operations","type":"single-choice",
   "question":"An administrator SSHs into a router using the same network interfaces that carry production user traffic. What type of management access describes this?",
   "choices":["Out-of-band management","Console management","OOBM","In-band management"],"correctAnswer":3},

  # 475 D3 correctAnswer:0
  {"id":"netplus-475","domain":"Network Operations","type":"single-choice",
   "question":"A security team requires that all SSH sessions to production servers must pass through a hardened, audited intermediate server that logs all commands. What is this intermediary called?",
   "choices":["Jump server (bastion host)","Proxy server","Reverse proxy","Load balancer"],"correctAnswer":0},

  # 476 D3 correctAnswer:2
  {"id":"netplus-476","domain":"Network Operations","type":"single-choice",
   "question":"VoIP call quality is degraded even though the average one-way delay is acceptable. Users report choppy audio. Which metric specifically measures the inconsistency in packet arrival times that causes this symptom?",
   "choices":["Latency","Packet loss","Jitter","Bandwidth utilization"],"correctAnswer":2},

  # 477 D3 correctAnswer:1
  {"id":"netplus-477","domain":"Network Operations","type":"single-choice",
   "question":"A network engineer measures the time it takes for a single packet to travel from a source host to a destination host. Which network performance metric is being measured?",
   "choices":["Throughput","Latency","Jitter","Bandwidth"],"correctAnswer":1},

  # 478 D3 correctAnswer:3
  {"id":"netplus-478","domain":"Network Operations","type":"single-choice",
   "question":"A WAN link is rated at 100 Mbps, but a technician running iPerf measures only 60 Mbps of usable data transfer. Which term describes the 60 Mbps actual measured rate?",
   "choices":["Bandwidth","Goodput","Latency","Throughput"],"correctAnswer":3},

  # 479 D3 correctAnswer:0
  {"id":"netplus-479","domain":"Network Operations","type":"single-choice",
   "question":"A network engineer configures DSCP markings on switches and routers to ensure that voice traffic receives lower latency and video traffic gets guaranteed bandwidth. What technology enables this traffic prioritization?",
   "choices":["QoS (Quality of Service)","VLAN segmentation","Traffic shaping only","NAT"],"correctAnswer":0},

  # 480 D3 correctAnswer:2
  {"id":"netplus-480","domain":"Network Operations","type":"single-choice",
   "question":"A VoIP administrator notices call quality degrades when the WAN link exceeds 80% utilization. Users report audio drop-outs. Which network condition is most directly causing this VoIP quality issue?",
   "choices":["DNS resolution failures","Incorrect subnet mask","Excessive packet loss and queuing delay under congestion","DHCP lease exhaustion"],"correctAnswer":2},

  # 481 D4 correctAnswer:1
  {"id":"netplus-481","domain":"Network Security","type":"single-choice",
   "question":"A security architect needs to select an encryption algorithm for encrypting large volumes of data at rest. Which algorithm is a symmetric block cipher standardized by NIST, supporting 128-, 192-, and 256-bit key lengths?",
   "choices":["RSA","AES","ECC","Diffie-Hellman"],"correctAnswer":1},

  # 482 D4 correctAnswer:3
  {"id":"netplus-482","domain":"Network Security","type":"single-choice",
   "question":"A TLS session setup requires securely exchanging encryption keys between a client and server that have never communicated before. Which algorithm is commonly used for this asymmetric key exchange?",
   "choices":["AES","3DES","MD5","RSA"],"correctAnswer":3},

  # 483 D4 correctAnswer:0
  {"id":"netplus-483","domain":"Network Security","type":"single-choice",
   "question":"A developer must choose between symmetric and asymmetric encryption for encrypting large files efficiently. Which statement correctly explains why symmetric encryption is preferred for bulk data?",
   "choices":["Symmetric encryption is significantly faster because it uses the same key for both encryption and decryption","Symmetric encryption uses a public/private key pair which reduces processing overhead","Asymmetric encryption is faster but requires more storage space","Symmetric encryption does not require a shared secret between parties"],"correctAnswer":0},

  # 484 D4 correctAnswer:2
  {"id":"netplus-484","domain":"Network Security","type":"single-choice",
   "question":"In a PKI, which entity is responsible for issuing, signing, and revoking digital certificates that bind a public key to an identity?",
   "choices":["Registration Authority (RA)","OCSP responder","Certificate Authority (CA)","CRL server"],"correctAnswer":2},

  # 485 D4 correctAnswer:1
  {"id":"netplus-485","domain":"Network Security","type":"single-choice",
   "question":"A developer creates an SSL certificate for an internal test server without using a trusted CA. When users browse to the site, they receive a certificate warning. What type of certificate was used?",
   "choices":["Wildcard certificate","Self-signed certificate","EV certificate","SAN certificate"],"correctAnswer":1},

  # 486 D4 correctAnswer:3
  {"id":"netplus-486","domain":"Network Security","type":"single-choice",
   "question":"A company hosts multiple subdomains (shop.example.com, mail.example.com, api.example.com) and wants a single certificate to secure all of them. Which certificate type uses the *.example.com format?",
   "choices":["SAN certificate","EV certificate","Self-signed certificate","Wildcard certificate"],"correctAnswer":3},

  # 487 D4 correctAnswer:0
  {"id":"netplus-487","domain":"Network Security","type":"single-choice",
   "question":"A company needs a single certificate that covers example.com, api.example.com, and example.net — three distinct names that a wildcard cannot cover. Which certificate type lists multiple FQDNs in a single certificate?",
   "choices":["SAN (Subject Alternative Name) certificate","Wildcard certificate","Root certificate","Self-signed certificate"],"correctAnswer":0},

  # 488 D5 correctAnswer:2
  {"id":"netplus-488","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician pings a remote server and receives replies, but the round-trip time is 350 ms and varies between 280 and 420 ms. There is no packet loss. What network condition is most likely indicated?",
   "choices":["DNS resolution failure","Cable fault causing intermittent signal loss","Network congestion or long path causing high latency and jitter","Duplex mismatch on local switch port"],"correctAnswer":2},

  # 489 D5 correctAnswer:1
  {"id":"netplus-489","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A wireless client associates with the access point and receives a valid IP address via DHCP, but cannot reach any internet resources. Pinging the default gateway succeeds. What should be investigated next?",
   "choices":["DHCP server availability","Routing or NAT configuration beyond the gateway","Wireless channel interference","802.1X authentication failure"],"correctAnswer":1},

  # 490 D5 correctAnswer:3
  {"id":"netplus-490","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician suspects a stale ARP entry is causing a connectivity issue after a server's NIC was replaced. Which command displays the current ARP cache on a Windows or Linux workstation?",
   "choices":["netstat -an","nslookup","ipconfig /all","arp -a"],"correctAnswer":3},

  # ── MR 491-493 ──────────────────────────────────────────────────────────────

  # 491 D1 correctAnswers:[0,2]
  {"id":"netplus-491","domain":"Networking Concepts","type":"multiple-response",
   "question":"The DHCP DORA process involves four messages. Which TWO messages are sent as broadcasts by the DHCP client? (Select 2)",
   "choices":["DHCPDISCOVER","DHCPOFFER","DHCPREQUEST","DHCPACK"],"correctAnswers":[0,2]},

  # 492 D2 correctAnswers:[0,3]
  {"id":"netplus-492","domain":"Network Implementation","type":"multiple-response",
   "question":"A data center engineer is selecting fiber connectors for a high-density backbone installation. Which TWO connector types are most commonly used in high-density data center fiber deployments? (Select 2)",
   "choices":["MPO/MTP","ST","SC","LC"],"correctAnswers":[0,3]},

  # 493 D4 correctAnswers:[1,2]
  {"id":"netplus-493","domain":"Network Security","type":"multiple-response",
   "question":"Which TWO statements correctly describe asymmetric encryption? (Select 2)",
   "choices":["Uses a single shared key for both encryption and decryption","Uses a mathematically related public and private key pair","Is generally slower than symmetric encryption for bulk data encryption","Is the preferred algorithm for encrypting large files due to speed"],"correctAnswers":[1,2]},

  # ── Matching 494-495 ──────────────────────────────────────────────────────

  # 494 D1 correctMatches:[1,2,3,0]
  {"id":"netplus-494","domain":"Networking Concepts","type":"matching",
   "question":"Match each DHCP message to its correct description.",
   "itemsLeft":["DHCPDISCOVER","DHCPOFFER","DHCPREQUEST","DHCPACK"],
   "itemsRight":["Server finalizes the IP lease and confirms assignment to the client","Client broadcasts to locate available DHCP servers","Server proposes an available IP address and configuration to the client","Client broadcasts to formally accept the offered IP address"],
   "correctMatches":[1,2,3,0]},

  # 495 D2 correctMatches:[3,2,0,1]
  {"id":"netplus-495","domain":"Network Implementation","type":"matching",
   "question":"Match each fiber optic connector type to its primary characteristic.",
   "itemsLeft":["LC","SC","ST","MPO/MTP"],
   "itemsRight":["Bayonet-style twist-lock coupling; common in older multimode installations","Multi-fiber push-on connector used for high-density trunk cables","Push-pull square-body connector common in telecom and FTTH","Small form-factor latch connector widely deployed in modern data centers"],
   "correctMatches":[3,2,0,1]},

  # ── Ordering 496-497 ──────────────────────────────────────────────────────

  # 496 D1 correctOrder:[1,3,2,0]
  {"id":"netplus-496","domain":"Networking Concepts","type":"ordering",
   "question":"Arrange the four DHCP messages in the correct order of the DORA process.",
   "items":["DHCPACK","DHCPDISCOVER","DHCPREQUEST","DHCPOFFER"],
   "correctOrder":[1,3,2,0]},

  # 497 D5 correctOrder:[1,0,3,2,4]
  {"id":"netplus-497","domain":"Network Troubleshooting","type":"ordering",
   "question":"A workstation has LAN connectivity but cannot reach the internet. Arrange these troubleshooting steps in the most logical order.",
   "items":["Verify the default gateway is reachable using ping",
            "Confirm IP address, subnet mask, and gateway with ipconfig/ifconfig",
            "Test DNS resolution using nslookup or dig",
            "Ping a public IP address (e.g., 8.8.8.8) to test internet routing",
            "Ping a remote hostname to confirm end-to-end DNS and routing"],
   "correctOrder":[1,0,3,2,4]},

  # ── SB 498-500 ────────────────────────────────────────────────────────────

  # 498 D1 correctAnswers:[True,True,False,True]
  {"id":"netplus-498","domain":"Networking Concepts","type":"statement-block",
   "question":"Evaluate each statement about ARP and indicate whether it is True or False.",
   "statements":["ARP resolves Layer 3 IP addresses to Layer 2 MAC addresses on a local network.",
                 "ARP requests are sent as Ethernet broadcast frames to all devices on the subnet.",
                 "ARP replies are also sent as broadcast frames so all hosts update their ARP caches.",
                 "ARP cache poisoning exploits ARP's lack of authentication to redirect traffic in a MITM attack."],
   "correctAnswers":[True,True,False,True]},

  # 499 D2 correctAnswers:[True,False,True,True]
  {"id":"netplus-499","domain":"Network Implementation","type":"statement-block",
   "question":"Evaluate each statement about Ethernet cabling standards and indicate whether it is True or False.",
   "statements":["Cat6A supports 10 Gbps (10GBASE-T) at distances up to 100 meters.",
                 "Cat5e supports 10 Gbps for runs up to 55 meters in low-crosstalk environments.",
                 "Plenum-rated (CMP) cables are required in air-handling spaces per fire safety codes.",
                 "A straight-through cable is used to connect a workstation to a switch port."],
   "correctAnswers":[True,False,True,True]},

  # 500 D4 correctAnswers:[False,True,True,False]
  {"id":"netplus-500","domain":"Network Security","type":"statement-block",
   "question":"Evaluate each statement about encryption and indicate whether it is True or False.",
   "statements":["Symmetric encryption uses a mathematically related public and private key pair.",
                 "AES (Advanced Encryption Standard) is a widely used symmetric block cipher.",
                 "RSA is an asymmetric algorithm commonly used for key exchange and digital signatures.",
                 "Asymmetric encryption is faster than symmetric encryption for encrypting large volumes of data."],
   "correctAnswers":[False,True,True,False]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
