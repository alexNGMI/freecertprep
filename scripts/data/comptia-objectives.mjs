export const COMPTIA_OBJECTIVES = {
  'comptia-net-plus': {
    '1.1': ['Networking Concepts', 'Explain concepts related to the OSI reference model'],
    '1.2': ['Networking Concepts', 'Compare networking appliances, applications, and functions'],
    '1.3': ['Networking Concepts', 'Summarize cloud concepts and connectivity options'],
    '1.4': ['Networking Concepts', 'Explain common networking protocols'],
    '1.5': ['Networking Concepts', 'Compare transmission media and transceivers'],
    '1.6': ['Networking Concepts', 'Compare network topologies, architectures, and types'],
    '1.7': ['Networking Concepts', 'Use IPv4 addressing and subnetting'],
    '1.8': ['Networking Concepts', 'Summarize evolving network environments'],
    '2.1': ['Network Implementation', 'Use routing technologies and bandwidth management'],
    '2.2': ['Network Implementation', 'Configure switching technologies and features'],
    '2.3': ['Network Implementation', 'Select and configure wireless technologies'],
    '2.4': ['Network Implementation', 'Apply physical installation factors'],
    '3.1': ['Network Operations', 'Use organizational processes and procedures'],
    '3.2': ['Network Operations', 'Use network monitoring technologies'],
    '3.3': ['Network Operations', 'Explain disaster recovery and high availability'],
    '3.4': ['Network Operations', 'Configure IPv4 and IPv6 network services'],
    '3.5': ['Network Operations', 'Use network access and management methods'],
    '4.1': ['Network Security', 'Explain basic network security concepts'],
    '4.2': ['Network Security', 'Summarize network attack types'],
    '4.3': ['Network Security', 'Apply network security features and defenses'],
    '4.4': ['Network Security', 'Compare remote access methods and security implications'],
    '4.5': ['Network Security', 'Use physical security controls'],
    '5.1': ['Network Troubleshooting', 'Apply the network troubleshooting methodology'],
    '5.2': ['Network Troubleshooting', 'Troubleshoot cabling and physical interfaces'],
    '5.3': ['Network Troubleshooting', 'Troubleshoot network services'],
    '5.4': ['Network Troubleshooting', 'Troubleshoot network performance'],
    '5.5': ['Network Troubleshooting', 'Use network troubleshooting tools and protocols'],
  },
  'comptia-sec-plus': {
    '1.1': ['General Security Concepts', 'Compare categories and types of security controls'],
    '1.2': ['General Security Concepts', 'Summarize fundamental security concepts'],
    '1.3': ['General Security Concepts', 'Explain change management security impact'],
    '1.4': ['General Security Concepts', 'Use cryptographic solutions'],
    '2.1': ['Threats, Vulnerabilities, and Mitigations', 'Compare threat actors and motivations'],
    '2.2': ['Threats, Vulnerabilities, and Mitigations', 'Explain threat vectors and attack surfaces'],
    '2.3': ['Threats, Vulnerabilities, and Mitigations', 'Explain vulnerability types'],
    '2.4': ['Threats, Vulnerabilities, and Mitigations', 'Analyze indicators of malicious activity'],
    '2.5': ['Threats, Vulnerabilities, and Mitigations', 'Explain mitigation techniques'],
    '3.1': ['Security Architecture', 'Compare security implications of architecture models'],
    '3.2': ['Security Architecture', 'Apply security principles to enterprise infrastructure'],
    '3.3': ['Security Architecture', 'Select strategies to protect data'],
    '3.4': ['Security Architecture', 'Explain resilience and recovery'],
    '4.1': ['Security Operations', 'Apply secure techniques to computing resources'],
    '4.2': ['Security Operations', 'Explain hardware, software, and data asset management'],
    '4.3': ['Security Operations', 'Explain vulnerability management'],
    '4.4': ['Security Operations', 'Use security alerting and monitoring concepts'],
    '4.5': ['Security Operations', 'Modify enterprise capabilities to improve security'],
    '4.6': ['Security Operations', 'Implement identity and access management'],
    '4.7': ['Security Operations', 'Explain automation and orchestration'],
    '4.8': ['Security Operations', 'Apply incident response activities'],
    '4.9': ['Security Operations', 'Use data sources to support investigations'],
    '5.1': ['Security Program Management and Oversight', 'Summarize security governance'],
    '5.2': ['Security Program Management and Oversight', 'Explain risk management'],
    '5.3': ['Security Program Management and Oversight', 'Explain third-party risk management'],
    '5.4': ['Security Program Management and Oversight', 'Summarize compliance and privacy'],
    '5.5': ['Security Program Management and Oversight', 'Explain audits and assessments'],
    '5.6': ['Security Program Management and Oversight', 'Implement security awareness practices'],
  },
}

const RULES = {
  'comptia-net-plus': {
    'Networking Concepts': [
      ['1.1', 'osi-model', /\bOSI\b|\blayer [1-7]\b|\bphysical layer\b|\bdata link\b|\btransport layer\b|\bsession layer\b/i],
      ['1.7', 'ipv4-subnetting', /\bsubnet|CIDR|usable host|network address|broadcast address|RFC 1918|APIPA|169\.254|IPv4 address block/i],
      ['1.5', 'media-connectors', /\bfiber|copper|coax|transceiver|SFP|QSFP|connector|RJ-45|LC\b|SC\b|MPO|single-mode|multimode|attenuation/i],
      ['1.2', 'network-functions', /\brouter|switch|firewall|load balancer|proxy|access point|wireless controller|IDS|IPS|VPN concentrator|NAS\b|SAN\b/i],
      ['1.6', 'topologies-architectures', /\btopolog|WAN|LAN\b|MAN\b|PAN\b|mesh|star|ring|point-to-point|hub-and-spoke|duplex|broadcast domain|collision domain/i],
      ['1.3', 'cloud-connectivity', /\bcloud|VPC|virtual private cloud|direct connect|expressroute|SaaS|PaaS|IaaS|multiten/i],
      ['1.8', 'modern-networks', /\bIPv6|VXLAN|SD-WAN|SDN\b|software-defined|infrastructure as code|IoT|zero-touch/i],
      ['1.4', 'protocols-ports', /\bTCP\b|\bUDP\b|\bport \d+|protocol|DNS|DHCP|NTP|SNMP|SMTP|IMAP|HTTPS|SSH|ICMP|ARP\b/i],
    ],
    'Network Implementation': [
      ['2.3', 'wireless-implementation', /\bwireless|Wi-Fi|802\.11|SSID|WPA|antenna|channel|frequency|site survey|roaming|dBi/i],
      ['2.2', 'switching', /\bVLAN|trunk|802\.1Q|STP|spanning tree|LACP|link aggregation|port channel|switch port|MAC table/i],
      ['2.1', 'routing-qos', /\brouting|route\b|OSPF|BGP|EIGRP|RIP\b|FHRP|VRRP|HSRP|QoS|traffic shaping|load balancing/i],
      ['2.4', 'physical-installation', /\bplenum|rack|cabinet|patch panel|demarc|MDF|IDF|grounding|power|UPS|environment|cable management/i],
    ],
    'Network Operations': [
      ['3.2', 'monitoring', /\bmonitor|SNMP|syslog|flow data|NetFlow|baseline|packet capture|alert|threshold|MIB\b|OID\b/i],
      ['3.3', 'availability-recovery', /\bdisaster|recovery|backup|high availability|redundan|MTTR|MTBF|RPO|RTO|failover|business continuity/i],
      ['3.4', 'network-services', /\bDHCP|DNS|NTP|IPAM|SLAAC|relay|scope|lease|zone transfer|record type/i],
      ['3.5', 'access-management', /\bSSH|console|out-of-band|jump server|bastion|remote access|VPN|management network|API access/i],
      ['3.1', 'process-documentation', /\bdocument|diagram|runbook|procedure|change management|inventory|asset|SLA\b|policy|configuration management|rack elevation/i],
    ],
    'Network Security': [
      ['4.4', 'remote-access-security', /\bremote access|VPN|IPsec|SSL VPN|clientless|site-to-site|split tunnel|RADIUS|TACACS/i],
      ['4.5', 'physical-security', /\bphysical security|door|lock|badge|camera|bollard|mantrap|fence|guard|cable lock|switch port.*public/i],
      ['4.2', 'network-attacks', /\battack|spoof|poison|evil twin|rogue|DoS|DDoS|botnet|VLAN hopping|MAC flooding|deauth|on-path|ARP repl/i],
      ['4.3', 'defensive-features', /\bport security|DHCP snooping|dynamic ARP inspection|ACL\b|firewall|IDS|IPS|honeypot|segmentation|NAC\b|802\.1X|disable unused/i],
      ['4.1', 'security-foundations', /\bencrypt|certificate|PKI|AAA\b|authentication|authorization|accounting|least privilege|zero trust|symmetric|asymmetric|hash/i],
    ],
    'Network Troubleshooting': [
      ['5.1', 'methodology', /\bFIRST step|NEXT step|troubleshooting methodology|identify the problem|establish a theory|plan of action|document findings/i],
      ['5.2', 'cabling-interfaces', /\bcable|fiber|connector|light level|tone generator|toner probe|wire map|interface error|CRC|duplex|link light|transceiver/i],
      ['5.3', 'service-failures', /\bDHCP|DNS|NTP|IP conflict|169\.254|default gateway|name resolution|port \d+|service unavailable/i],
      ['5.4', 'performance', /\blatency|jitter|packet loss|congestion|utilization|slow|interference|signal strength|noise floor|one-way audio|MTU/i],
      ['5.5', 'tools-protocols', /\bping|traceroute|tracert|nslookup|dig\b|netstat|tcpdump|Wireshark|show ip|arp -|ipconfig|ifconfig|nmap|protocol analyzer/i],
    ],
  },
  'comptia-sec-plus': {
    'General Security Concepts': [
      ['1.1', 'security-controls', /\bcontrol (category|type)|preventive|detective|corrective|deterrent|compensating|directive|managerial|operational|physical control/i],
      ['1.3', 'change-management', /\bchange management|change request|rollback|maintenance window|version control|impact analysis|approval|backout/i],
      ['1.4', 'cryptography', /\bencrypt|cryptograph|hash|certificate|PKI|OCSP|CRL\b|symmetric|asymmetric|digital signature|key exchange|PFS\b|TLS\b/i],
      ['1.2', 'security-principles', /\bCIA triad|least privilege|zero trust|defense in depth|non-repudiation|authentication factor|allowlist|denylist|gap analysis/i],
    ],
    'Threats, Vulnerabilities, and Mitigations': [
      ['2.1', 'threat-actors', /\bthreat actor|nation-state|hacktivist|insider|organized crime|script kiddie|motivation|shadow IT/i],
      ['2.2', 'vectors-surfaces', /\bphishing|smishing|vishing|social engineering|USB|removable|wireless|supply chain|attack surface|threat vector|watering hole/i],
      ['2.3', 'vulnerabilities', /\bvulnerabilit|zero-day|injection|overflow|race condition|misconfiguration|deserialization|CVE\b|unpatched|legacy|EOL\b/i],
      ['2.4', 'malicious-indicators', /\bindicator|malware|ransomware|rootkit|trojan|worm|C2\b|command and control|data exfiltration|beacon|unexpected traffic|log entry/i],
      ['2.5', 'mitigations', /\bmitigat|hardening|segmentation|isolation|patch|allowlist|least functionality|sandbox|disable|access control|DLP\b/i],
    ],
    'Security Architecture': [
      ['3.1', 'architecture-models', /\bcloud|IaaS|PaaS|SaaS|container|serverless|microservice|on-prem|hybrid|shared responsibility|virtualization/i],
      ['3.2', 'enterprise-infrastructure', /\bDMZ|zero trust|segmentation|firewall|WAF\b|load balancer|jump server|air gap|VLAN|SDN\b|enterprise infrastructure/i],
      ['3.3', 'data-protection', /\bdata at rest|data in transit|data in use|classification|tokenization|masking|encryption|DLP|sanitization|retention/i],
      ['3.4', 'resilience-recovery', /\bbackup|recovery|resilien|RPO|RTO|hot site|warm site|cold site|redundan|failover|business continuity/i],
    ],
    'Security Operations': [
      ['4.8', 'incident-response', /\bincident response|containment|eradication|recovery|lessons learned|forensic|chain of custody|ransomware incident|playbook/i],
      ['4.9', 'investigation-data', /\blog source|packet capture|NetFlow|metadata|DNS log|firewall log|authentication log|evidence source|SIEM data/i],
      ['4.4', 'monitoring-alerting', /\bSIEM|alert|monitor|IDS|IPS|EDR|XDR|anomaly|baseline|scan result|dashboard|correlation/i],
      ['4.3', 'vulnerability-management', /\bvulnerability scan|penetration test|remediation|CVE|CVSS|patch management|false positive|rescan|vulnerability management/i],
      ['4.6', 'identity-access', /\bIAM\b|identity|authentication|authorization|MFA|SSO|federation|provision|deprovision|privileged access|PAM\b|RBAC|ABAC/i],
      ['4.7', 'automation-orchestration', /\bautomation|orchestration|SOAR|script|API|playbook automation|infrastructure as code/i],
      ['4.2', 'asset-management', /\basset|inventory|ownership|classification|disposal|EOL\b|license|hardware lifecycle|software lifecycle/i],
      ['4.5', 'enterprise-capabilities', /\bfirewall|DNS filtering|email security|DLP|NAC\b|EDR|WAF\b|proxy|secure web gateway|capability/i],
      ['4.1', 'secure-resources', /\bharden|secure baseline|mobile device|endpoint|server|cloud resource|application security|host firewall|disable service/i],
    ],
    'Security Program Management and Oversight': [
      ['5.3', 'third-party-risk', /\bthird-party|vendor|supplier|subcontractor|SLA\b|MSA\b|NDA\b|due diligence|right-to-audit|supply chain risk/i],
      ['5.4', 'compliance-privacy', /\bcompliance|privacy|GDPR|HIPAA|PCI DSS|SOX|data sovereignty|regulation|legal hold|CFAA/i],
      ['5.5', 'audits-assessments', /\baudit|assessment|attestation|SOC 2|penetration test|internal audit|external audit|evidence collection/i],
      ['5.6', 'security-awareness', /\bawareness|training|phishing simulation|security culture|user education|insider reporting|microlearning/i],
      ['5.2', 'risk-management', /\brisk register|risk appetite|risk tolerance|likelihood|impact|inherent risk|residual risk|accept|transfer|avoid|mitigate|BIA\b/i],
      ['5.1', 'governance', /\bgovernance|policy|standard|procedure|guideline|framework|COBIT|COSO|NIST|ISO 27001|committee|roles and responsibilities/i],
    ],
  },
}

export function classifyCompTIAQuestion(certId, question) {
  const catalog = COMPTIA_OBJECTIVES[certId]
  const domainRules = RULES[certId]?.[question.domain] || []
  const text = [
    question.question,
    ...(question.choices || []),
    question.explanation,
    JSON.stringify(question.pbq || {}),
    JSON.stringify(question.topology || {}),
    JSON.stringify(question.commandOutput || {}),
  ].join(' ')
  const numericId = Number(String(question.id).match(/\d+$/)?.[0] || 0)

  for (const [objectiveId, concept, pattern] of domainRules) {
    if (pattern.test(text)) {
      return {
        objectiveId,
        objectiveTitle: catalog[objectiveId][1],
        conceptId: `${certId}-${objectiveId}-${concept}`,
        classifiedBy: concept,
      }
    }
  }

  const domainObjectives = Object.entries(catalog)
    .filter(([, [domain]]) => domain === question.domain)
    .map(([objectiveId]) => objectiveId)
  const objectiveId = domainObjectives[numericId % domainObjectives.length]
  return {
    objectiveId,
    objectiveTitle: catalog[objectiveId][1],
    conceptId: `${certId}-${objectiveId}-domain-fallback-${numericId % 3}`,
    classifiedBy: 'domain-fallback',
  }
}
