import json, pathlib

Q = pathlib.Path("src/data/comptia-net-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 651-690 ──────────────────────────────────────────────────────────────

  # 651 D1 correctAnswer:2
  {"id":"netplus-651","domain":"Networking Concepts","type":"single-choice",
   "question":"A technician needs to find the broadcast address for the 192.168.5.0/25 network. What is the broadcast address?",
   "choices":["192.168.5.255","192.168.5.128","192.168.5.127","192.168.5.126"],"correctAnswer":2},

  # 652 D1 correctAnswer:0
  {"id":"netplus-652","domain":"Networking Concepts","type":"single-choice",
   "question":"A host is assigned the IP address 10.10.20.145/28. What is the network address of this subnet?",
   "choices":["10.10.20.144","10.10.20.128","10.10.20.160","10.10.20.136"],"correctAnswer":0},

  # 653 D1 correctAnswer:1
  {"id":"netplus-653","domain":"Networking Concepts","type":"single-choice",
   "question":"A router receives multicast traffic but needs to know which hosts on attached segments want to receive the multicast stream. Which protocol do hosts use to join and leave multicast groups?",
   "choices":["OSPF","IGMP","PIM","MSDP"],"correctAnswer":1},

  # 654 D1 correctAnswer:3
  {"id":"netplus-654","domain":"Networking Concepts","type":"single-choice",
   "question":"A network engineer is reviewing a packet capture and sees frames addressed to 224.0.0.5. What type of address is this?",
   "choices":["Public unicast","Private broadcast","APIPA","IPv4 multicast"],"correctAnswer":3},

  # 655 D1 correctAnswer:2
  {"id":"netplus-655","domain":"Networking Concepts","type":"single-choice",
   "question":"A firewall must permit DNS query traffic. Which port number must be opened for DNS queries using both UDP and TCP?",
   "choices":["161","389","53","443"],"correctAnswer":2},

  # 656 D1 correctAnswer:0
  {"id":"netplus-656","domain":"Networking Concepts","type":"single-choice",
   "question":"A network engineer is troubleshooting DHCP. DHCP servers listen on one port and clients send requests from another. Which UDP ports does DHCP use (server port / client port)?",
   "choices":["67 / 68","68 / 67","69 / 68","67 / 69"],"correctAnswer":0},

  # 657 D1 correctAnswer:1
  {"id":"netplus-657","domain":"Networking Concepts","type":"single-choice",
   "question":"A network monitoring system polls managed devices using SNMP GET requests. Which UDP port do SNMP agents listen on for these requests?",
   "choices":["162","161","514","123"],"correctAnswer":1},

  # 658 D1 correctAnswer:3
  {"id":"netplus-658","domain":"Networking Concepts","type":"single-choice",
   "question":"A managed switch is configured to send unsolicited SNMP notifications to the management station when an interface goes down. Which UDP port does the SNMP manager listen on to receive these messages?",
   "choices":["161","514","123","162"],"correctAnswer":3},

  # 659 D2 correctAnswer:2
  {"id":"netplus-659","domain":"Network Implementation","type":"single-choice",
   "question":"A home user subscribes to ADSL broadband service. Which characteristic is specific to ADSL?",
   "choices":["Provides equal upload and download speeds","Requires fiber optic cable to the premises","Download speed is faster than upload speed","Uses shared coaxial infrastructure with neighbors"],"correctAnswer":2},

  # 660 D2 correctAnswer:0
  {"id":"netplus-660","domain":"Network Implementation","type":"single-choice",
   "question":"A business needs a DSL technology that provides significantly higher speeds than ADSL. The building is located very close to the telephone company's central office. Which DSL variant would best meet this requirement?",
   "choices":["VDSL (Very High Bitrate DSL)","ADSL2+","SDSL","HDSL"],"correctAnswer":0},

  # 661 D2 correctAnswer:1
  {"id":"netplus-661","domain":"Network Implementation","type":"single-choice",
   "question":"A cable internet subscriber notices speeds vary significantly depending on time of day. What characteristic of cable internet causes this variation?",
   "choices":["DSL distance limitations","The coaxial infrastructure is shared among multiple subscribers in a neighborhood","Fiber attenuation over long distances","The CMTS applies QoS throttling during business hours"],"correctAnswer":1},

  # 662 D2 correctAnswer:3
  {"id":"netplus-662","domain":"Network Implementation","type":"single-choice",
   "question":"A telecom company delivers fiber optic internet directly to homes using a technology where a single fiber strand from the central office is split into multiple passive branches serving many customers. What is this technology called?",
   "choices":["SONET","Metro Ethernet","DSL","GPON (Gigabit Passive Optical Network)"],"correctAnswer":3},

  # 663 D2 correctAnswer:2
  {"id":"netplus-663","domain":"Network Implementation","type":"single-choice",
   "question":"A company leases a T1 line from the phone company for WAN connectivity. What is the total bandwidth of a T1 circuit?",
   "choices":["768 Kbps","44.736 Mbps","1.544 Mbps","45 Mbps"],"correctAnswer":2},

  # 664 D2 correctAnswer:0
  {"id":"netplus-664","domain":"Network Implementation","type":"single-choice",
   "question":"A large enterprise leases a T3 circuit for high-bandwidth WAN connectivity. What is the approximate bandwidth of a T3 line?",
   "choices":["44.736 Mbps","1.544 Mbps","100 Mbps","10 Mbps"],"correctAnswer":0},

  # 665 D2 correctAnswer:1
  {"id":"netplus-665","domain":"Network Implementation","type":"single-choice",
   "question":"An organization needs to connect two office buildings in the same city using a high-speed WAN service that delivers Ethernet handoff points and leverages the carrier's fiber network. Which WAN technology provides this carrier-grade Ethernet connectivity?",
   "choices":["DSL bonding","Metro Ethernet","Frame Relay","ISDN"],"correctAnswer":1},

  # 666 D2 correctAnswer:3
  {"id":"netplus-666","domain":"Network Implementation","type":"single-choice",
   "question":"A remote branch office needs WAN connectivity as a backup when the primary MPLS circuit fails. The organization wants to use existing cellular infrastructure. Which technology provides this cellular WAN failover?",
   "choices":["DSL failover","Dial-up modem","Satellite internet","LTE/5G cellular WAN"],"correctAnswer":3},

  # 667 D2 correctAnswer:2
  {"id":"netplus-667","domain":"Network Implementation","type":"single-choice",
   "question":"A carrier's long-haul fiber backbone uses a technology that carries multiple OC-level circuits in a synchronous frame structure with built-in redundancy and ring protection. What is this optical transport standard?",
   "choices":["GPON","DWDM","SONET/SDH","Metro Ethernet"],"correctAnswer":2},

  # 668 D2 correctAnswer:0
  {"id":"netplus-668","domain":"Network Implementation","type":"single-choice",
   "question":"A remote site uses satellite internet as its only WAN connection. What is the most significant disadvantage of satellite internet compared to terrestrial broadband?",
   "choices":["Very high latency (500-700 ms round trip) due to the long signal path to geostationary orbit","Low maximum bandwidth (below 1 Mbps)","Requires a fiber optic cable to the rooftop dish","Weather immunity — satellite is not affected by weather conditions"],"correctAnswer":0},

  # 669 D3 correctAnswer:1
  {"id":"netplus-669","domain":"Network Operations","type":"single-choice",
   "question":"A technician is replacing a NIC in a server and must protect sensitive components from electrostatic discharge. Which precaution should be taken?",
   "choices":["Work in a room with low humidity","Wear an antistatic wrist strap connected to ground","Use rubber gloves to insulate the components","Power up the server before installing the card"],"correctAnswer":1},

  # 670 D3 correctAnswer:3
  {"id":"netplus-670","domain":"Network Operations","type":"single-choice",
   "question":"A data center manager implements a system that continuously tracks temperature and humidity levels in each row of server racks and sends alerts if thresholds are exceeded. What type of monitoring is this?",
   "choices":["NetFlow monitoring","SNMP polling","Out-of-band management","Environmental monitoring"],"correctAnswer":3},

  # 671 D3 correctAnswer:2
  {"id":"netplus-671","domain":"Network Operations","type":"single-choice",
   "question":"A network operations center installs a device between the utility power feed and critical network equipment that provides filtered power and switches to battery backup instantly when utility power fails. What device provides this protection?",
   "choices":["Power distribution unit (PDU)","Generator","UPS (Uninterruptible Power Supply)","Surge protector"],"correctAnswer":2},

  # 672 D3 correctAnswer:0
  {"id":"netplus-672","domain":"Network Operations","type":"single-choice",
   "question":"A mission-critical server is equipped with two power supplies connected to independent power circuits. What availability benefit does this dual power supply configuration provide?",
   "choices":["Eliminates single point of failure from a PSU or power feed failure","Doubles the server's total power consumption for better performance","Enables hot-swapping of hard drives without downtime","Provides automatic CPU throttling during power surges"],"correctAnswer":0},

  # 673 D3 correctAnswer:1
  {"id":"netplus-673","domain":"Network Operations","type":"single-choice",
   "question":"A data center uses servers with hot-swappable hard drives. What does hot-swappable mean in this context?",
   "choices":["The drive can only be replaced after a complete system backup","The component can be removed and replaced while the system is powered on and operational","The drive must be swapped within 30 seconds to avoid data loss","Hot-swap requires special tools provided by the manufacturer"],"correctAnswer":1},

  # 674 D3 correctAnswer:3
  {"id":"netplus-674","domain":"Network Operations","type":"single-choice",
   "question":"Proper HVAC (Heating, Ventilation, and Air Conditioning) is critical in a data center. What two environmental factors does a data center HVAC system primarily control?",
   "choices":["Lighting levels and noise reduction","Fire suppression and flood prevention","Static electricity and electromagnetic interference","Temperature and humidity"],"correctAnswer":3},

  # 675 D3 correctAnswer:2
  {"id":"netplus-675","domain":"Network Operations","type":"single-choice",
   "question":"A data center installs a fire suppression system that uses a non-conductive, non-corrosive gas to suppress fires without damaging electronic equipment or leaving residue. Which type of system is this?",
   "choices":["Wet pipe sprinkler system","Dry pipe sprinkler system","Clean-agent gas suppression (e.g., FM-200 / Novec 1230)","CO2 flooding system"],"correctAnswer":2},

  # 676 D3 correctAnswer:0
  {"id":"netplus-676","domain":"Network Operations","type":"single-choice",
   "question":"A technician is called to troubleshoot a cable run in a large office. Without proper labeling, the technician cannot determine which cables go where. Which documentation practice prevents this issue?",
   "choices":["Labeling all cables at both ends with consistent identifiers","Using only a single cable color for all connections","Installing only wireless connections to avoid cable confusion","Relying on switch MAC address tables to trace cables"],"correctAnswer":0},

  # 677 D4 correctAnswer:1
  {"id":"netplus-677","domain":"Network Security","type":"single-choice",
   "question":"Two branch offices are connected with an always-up encrypted tunnel. Traffic between the two sites traverses this tunnel transparently, as if the offices were on the same LAN. Which VPN type is this?",
   "choices":["Remote access VPN","Site-to-site VPN","Client VPN","SSL VPN portal"],"correctAnswer":1},

  # 678 D4 correctAnswer:3
  {"id":"netplus-678","domain":"Network Security","type":"single-choice",
   "question":"A field technician travels and needs to securely connect a laptop to corporate resources from hotels, coffee shops, and airports. Which VPN type is designed for this individual-user use case?",
   "choices":["Site-to-site VPN","IPSec tunnel mode between two routers","GRE tunnel","Remote access VPN"],"correctAnswer":3},

  # 679 D4 correctAnswer:2
  {"id":"netplus-679","domain":"Network Security","type":"single-choice",
   "question":"An organization deploys a VPN solution where the client software automatically establishes a VPN tunnel whenever the laptop is connected to a non-corporate network, without requiring the user to manually connect. What is this VPN configuration called?",
   "choices":["Site-to-site VPN","Split tunnel VPN","Always-on VPN","SSL portal VPN"],"correctAnswer":2},

  # 680 D4 correctAnswer:0
  {"id":"netplus-680","domain":"Network Security","type":"single-choice",
   "question":"An organization wants to consolidate WAN connectivity, SD-WAN, firewall, CASB, and zero-trust network access into a single cloud-delivered service framework. Which security architecture model describes this convergence?",
   "choices":["SASE (Secure Access Service Edge)","MPLS with integrated firewall","Traditional perimeter security","Zero-trust network segmentation"],"correctAnswer":0},

  # 681 D4 correctAnswer:1
  {"id":"netplus-681","domain":"Network Security","type":"single-choice",
   "question":"Attackers discover and exploit a vulnerability in a popular firewall OS before the vendor is aware of it and before any patch exists. What type of vulnerability is this?",
   "choices":["Known vulnerability","Zero-day vulnerability","CVE-patched exploit","Misconfiguration"],"correctAnswer":1},

  # 682 D4 correctAnswer:3
  {"id":"netplus-682","domain":"Network Security","type":"single-choice",
   "question":"An organization requires all network devices and servers to receive security updates within 30 days of release. What security practice ensures known vulnerabilities are closed in a timely manner?",
   "choices":["Vulnerability scanning","Penetration testing","Change freeze","Patch management"],"correctAnswer":3},

  # 683 D4 correctAnswer:2
  {"id":"netplus-683","domain":"Network Security","type":"single-choice",
   "question":"A security architect designs a network with a perimeter firewall, internal IPS, network segmentation, endpoint detection and response (EDR), and SIEM monitoring. What security philosophy does this layered approach represent?",
   "choices":["Zero-day prevention","Least privilege","Defense in depth","Security by obscurity"],"correctAnswer":2},

  # 684 D4 correctAnswer:0
  {"id":"netplus-684","domain":"Network Security","type":"single-choice",
   "question":"A cloud security team divides workloads into small isolated segments with granular firewall policies between them, so that even if one workload is compromised, lateral movement to others is prevented. What technique is this?",
   "choices":["Micro-segmentation","VLAN segmentation","DMZ design","Network access control"],"correctAnswer":0},

  # 685 D5 correctAnswer:1
  {"id":"netplus-685","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A network switch is experiencing intermittent unusual behavior that a configuration review cannot explain. As a last resort, a technician power cycles the switch. Which troubleshooting action is this?",
   "choices":["Factory reset","Reboot/power cycle to clear transient errors","Firmware downgrade","Replacing the switch"],"correctAnswer":1},

  # 686 D5 correctAnswer:3
  {"id":"netplus-686","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician needs to verify the Cisco IOS version and the amount of installed RAM on a router before upgrading firmware. Which command provides this hardware and software inventory information?",
   "choices":["show ip route","show interfaces","show ip arp","show version"],"correctAnswer":3},

  # 687 D5 correctAnswer:2
  {"id":"netplus-687","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A technician suspects a switch port's transmit or receive path is faulty. A special plug is connected to the port that connects Tx to Rx, and a test is run. What type of test is this?",
   "choices":["TDR test","Cable continuity test","Loopback test","BERT (Bit Error Rate Test)"],"correctAnswer":2},

  # 688 D5 correctAnswer:0
  {"id":"netplus-688","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A switch interface shows a high count of CRC errors in the interface statistics. What is the most likely cause of CRC errors on a copper Ethernet interface?",
   "choices":["Physical layer issues such as damaged cable, poor termination, or electrical interference","An IP routing misconfiguration","An incorrect VLAN assignment","A duplex mismatch causing late collisions"],"correctAnswer":0},

  # 689 D5 correctAnswer:1
  {"id":"netplus-689","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A switch interface counter shows a high number of 'giants'. What does a giant frame indicate?",
   "choices":["A frame smaller than the 64-byte minimum Ethernet frame size","A frame larger than the maximum allowed Ethernet frame size (1518 bytes for standard frames)","A frame with an incorrect VLAN tag","A frame with a corrupted FCS checksum"],"correctAnswer":1},

  # 690 D5 correctAnswer:3
  {"id":"netplus-690","domain":"Network Troubleshooting","type":"single-choice",
   "question":"A wireless user reports intermittent disconnections occurring every few minutes at a consistent interval. Signal strength appears good. What should the technician investigate first?",
   "choices":["DHCP lease duration","DNS server configuration","WPA2 passphrase mismatch","RF interference sources such as microwave ovens or nearby APs on the same channel"],"correctAnswer":3},

  # ── MR 691-693 ──────────────────────────────────────────────────────────────

  # 691 D2 correctAnswers:[0,2]
  {"id":"netplus-691","domain":"Network Implementation","type":"multiple-response",
   "question":"Which TWO statements correctly describe DSL (Digital Subscriber Line) broadband technologies? (Select 2)",
   "choices":["ADSL provides faster download speeds than upload speeds","DSL uses dedicated fiber from the CO to each subscriber's premises","VDSL supports higher speeds than ADSL but requires the subscriber to be closer to the central office","DSL cannot be deployed in areas served by telephone copper infrastructure"],"correctAnswers":[0,2]},

  # 692 D4 correctAnswers:[1,2]
  {"id":"netplus-692","domain":"Network Security","type":"multiple-response",
   "question":"Which TWO statements correctly describe VPN deployment types? (Select 2)",
   "choices":["A site-to-site VPN is initiated manually by individual users each time they need corporate access","Remote access VPN allows individual remote users to securely connect to corporate resources over the internet","A site-to-site VPN creates a persistent encrypted tunnel between two entire network locations","Always-on VPN requires the user to manually click connect before accessing the internet"],"correctAnswers":[1,2]},

  # 693 D3 correctAnswers:[0,3]
  {"id":"netplus-693","domain":"Network Operations","type":"multiple-response",
   "question":"Which TWO physical infrastructure controls are critical for maintaining data center availability? (Select 2)",
   "choices":["Temperature and humidity monitoring and alerting","VLAN segmentation across server racks","BGP route redundancy","UPS (Uninterruptible Power Supply) for battery backup during power outages"],"correctAnswers":[0,3]},

  # ── Matching 694-695 ──────────────────────────────────────────────────────

  # 694 D1 correctMatches:[1,2,3,0]
  {"id":"netplus-694","domain":"Networking Concepts","type":"matching",
   "question":"Match each well-known port number to its associated protocol.",
   "itemsLeft":["Port 53","Port 67","Port 161","Port 162"],
   "itemsRight":["SNMP trap (manager listener)","DNS (query and response)","DHCP server (receives client discover/request)","SNMP agent (receives GET/SET)"],
   "correctMatches":[1,2,3,0]},

  # 695 D2 correctMatches:[3,1,2,0]
  {"id":"netplus-695","domain":"Network Implementation","type":"matching",
   "question":"Match each WAN technology to its primary characteristic.",
   "itemsLeft":["ADSL","Cable (DOCSIS)","T1","T3"],
   "itemsRight":["44.736 Mbps dedicated circuit aggregating 28 T1 channels","Shared coaxial medium; speeds vary with neighborhood utilization","1.544 Mbps dedicated TDM circuit with 24 DS0 channels","Uses telephone copper pairs; download faster than upload; speed decreases with distance"],
   "correctMatches":[3,1,2,0]},

  # ── Ordering 696-697 ──────────────────────────────────────────────────────

  # 696 D5 correctOrder:[2,3,0,1,4]
  {"id":"netplus-696","domain":"Network Troubleshooting","type":"ordering",
   "question":"Arrange the following steps for troubleshooting a suspected network hardware failure in the correct order.",
   "items":["Check device logs and configuration for software errors",
            "Replace the suspected faulty hardware component",
            "Identify the symptoms and determine which devices are affected",
            "Verify physical layer: power indicator, cables, and link LEDs",
            "Document the resolution and update the asset inventory"],
   "correctOrder":[2,3,0,1,4]},

  # 697 D4 correctOrder:[0,3,1,2,4]
  {"id":"netplus-697","domain":"Network Security","type":"ordering",
   "question":"Arrange the following elements of a defense-in-depth security implementation from the outermost perimeter to the inner monitoring layer.",
   "items":["Deploy NGFW at the internet perimeter",
            "Implement network segmentation with VLANs and ACLs",
            "Enable EDR (Endpoint Detection and Response) on all workstations",
            "Enforce MFA for all remote and privileged access",
            "Configure SIEM for centralized log correlation and alerting"],
   "correctOrder":[0,3,1,2,4]},

  # ── SB 698-700 ────────────────────────────────────────────────────────────

  # 698 D2 correctAnswers:[True,False,True,True]
  {"id":"netplus-698","domain":"Network Implementation","type":"statement-block",
   "question":"Evaluate each statement about WAN technologies and indicate whether it is True or False.",
   "statements":["ADSL provides faster download speeds than upload speeds because the downstream channel uses more bandwidth.",
                 "Cable internet (DOCSIS) gives each subscriber a dedicated, unshared connection to the CMTS.",
                 "A T1 line provides 1.544 Mbps of dedicated bandwidth across 24 DS0 channels.",
                 "DSL performance degrades as subscriber distance from the telephone company's central office increases."],
   "correctAnswers":[True,False,True,True]},

  # 699 D4 correctAnswers:[True,True,False,True]
  {"id":"netplus-699","domain":"Network Security","type":"statement-block",
   "question":"Evaluate each statement about VPN types and network security models and indicate whether it is True or False.",
   "statements":["A site-to-site VPN creates a persistent encrypted tunnel that connects two entire office networks.",
                 "Remote access VPN is designed for individual users to connect securely from any internet-connected location.",
                 "Split tunneling forces all user internet traffic through the corporate VPN tunnel.",
                 "SASE (Secure Access Service Edge) converges SD-WAN with cloud-delivered security services into a single framework."],
   "correctAnswers":[True,True,False,True]},

  # 700 D3 correctAnswers:[False,True,True,False]
  {"id":"netplus-700","domain":"Network Operations","type":"statement-block",
   "question":"Evaluate each statement about data center physical infrastructure and indicate whether it is True or False.",
   "statements":["ESD (Electrostatic Discharge) is harmless to modern network equipment and requires no protective measures.",
                 "A UPS provides immediate battery-backed power to critical equipment when utility power fails or fluctuates.",
                 "Clean-agent fire suppression systems (such as FM-200 or Novec 1230) suppress fires without damaging electronic equipment.",
                 "Hot-swappable components must be installed or removed only while the device is powered off."],
   "correctAnswers":[False,True,True,False]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
