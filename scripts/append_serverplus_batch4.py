import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 151-190 ───────────────────────────────────────────────────────────
  # 151 D1 ca:0
  {"id":"serverplus-151","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A facility loses utility power for several minutes during a storm. Critical servers stay online and shut down cleanly thanks to a device that supplies battery-backed power. Which device is this?",
   "choices":["UPS (Uninterruptible Power Supply)","KVM switch","PDU","RAID controller"],"correctAnswer":0},
  # 152 D1 ca:1
  {"id":"serverplus-152","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A new bare-metal server is configured to boot from a network image and run an automated OS install. Which boot technology fits this requirement?",
   "choices":["Local USB boot","PXE boot","Secure Boot only","Wake-on-LAN"],"correctAnswer":1},
  # 153 D1 ca:2
  {"id":"serverplus-153","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A two-socket server runs a workload that suffers latency when threads access memory across socket boundaries. Which architectural concept causes this behavior?",
   "choices":["Hyper-threading","SMT only","NUMA (Non-Uniform Memory Access)","TLB shootdown"],"correctAnswer":2},
  # 154 D1 ca:3
  {"id":"serverplus-154","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A storage architect needs to present raw block-level LUNs to servers so they appear as locally attached disks. Which storage architecture is this?",
   "choices":["NAS","Object storage","File share over SMB","SAN"],"correctAnswer":3},
  # 155 D1 ca:0
  {"id":"serverplus-155","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A budget-conscious deployment needs SAN-style block storage using existing Ethernet infrastructure. Which protocol fits this requirement?",
   "choices":["iSCSI","NFS","SMB","HTTP"],"correctAnswer":0},
  # 156 D1 ca:1
  {"id":"serverplus-156","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A high-performance SAN uses a dedicated lossless fabric with HBAs and switches that operate at 16/32 Gbps speeds. Which storage protocol is this?",
   "choices":["iSCSI","Fiber Channel","NFS","FTP"],"correctAnswer":1},
  # 157 D1 ca:2
  {"id":"serverplus-157","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center wants to consolidate storage and IP traffic onto the same converged Ethernet fabric while still using Fiber Channel framing for block storage. Which protocol enables this?",
   "choices":["iSCSI","NVMe-oF only","FCoE (Fibre Channel over Ethernet)","SMB Direct"],"correctAnswer":2},
  # 158 D1 ca:3
  {"id":"serverplus-158","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A RAID controller is configured for write-back caching. Which component protects in-flight cached writes against power loss?",
   "choices":["TPM module","UPS only","Spare RAM DIMM","Battery-backed cache (BBU) or flash-backed write cache (FBWC)"],"correctAnswer":3},
  # 159 D1 ca:0
  {"id":"serverplus-159","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A storage admin must choose between write-back and write-through caching on a RAID controller. Which statement best describes write-back caching?",
   "choices":["Acknowledges writes once they are in controller cache, improving performance but requiring power-loss protection","Always writes synchronously to disk before acknowledging","Disables all caching to maximize data integrity","Is identical in behavior to write-through caching"],"correctAnswer":0},
  # 160 D2 ca:1
  {"id":"serverplus-160","domain":"Server Administration","type":"single-choice",
   "question":"In an Active Directory forest, which FSMO role acts as the master time source for the domain and processes legacy password change replication?",
   "choices":["RID Master","PDC Emulator","Infrastructure Master","Schema Master"],"correctAnswer":1},
  # 161 D2 ca:2
  {"id":"serverplus-161","domain":"Server Administration","type":"single-choice",
   "question":"Which Active Directory FSMO role issues blocks of relative identifiers (RIDs) to domain controllers in a single domain?",
   "choices":["PDC Emulator","Schema Master","RID Master","Domain Naming Master"],"correctAnswer":2},
  # 162 D2 ca:3
  {"id":"serverplus-162","domain":"Server Administration","type":"single-choice",
   "question":"Which forest-wide Active Directory FSMO role controls modifications to the AD schema?",
   "choices":["RID Master","Infrastructure Master","Domain Naming Master","Schema Master"],"correctAnswer":3},
  # 163 D2 ca:0
  {"id":"serverplus-163","domain":"Server Administration","type":"single-choice",
   "question":"An AD admin follows the AGDLP best practice when assigning resource permissions. Which sequence does AGDLP describe?",
   "choices":["Accounts go into Global groups, Globals into Domain Local groups, and Permissions are applied to the Domain Local","Accounts go directly onto every resource ACL","Permissions are assigned to individual user accounts, never groups","Domain Local groups go into Global groups, which go into Universal groups"],"correctAnswer":0},
  # 164 D2 ca:1
  {"id":"serverplus-164","domain":"Server Administration","type":"single-choice",
   "question":"Two AD forests need users in Forest A to access resources in Forest B without merging the directories. Which AD construct should be configured?",
   "choices":["Site link","Forest trust","DFS namespace","GPO replication"],"correctAnswer":1},
  # 165 D2 ca:2
  {"id":"serverplus-165","domain":"Server Administration","type":"single-choice",
   "question":"An AD admin needs to control replication between geographically separated branch offices and to ensure clients authenticate against nearby domain controllers. Which AD construct should be configured?",
   "choices":["Universal Group","Organizational Unit","AD Sites and Subnets","Trust relationship"],"correctAnswer":2},
  # 166 D2 ca:3
  {"id":"serverplus-166","domain":"Server Administration","type":"single-choice",
   "question":"A Group Policy admin needs computer-side GPO settings to apply based on the user logging in rather than the computer being logged into. Which GPO feature provides this behavior?",
   "choices":["Block Inheritance","Enforced GPO","Security Filtering","Loopback Processing (Merge/Replace)"],"correctAnswer":3},
  # 167 D2 ca:0
  {"id":"serverplus-167","domain":"Server Administration","type":"single-choice",
   "question":"A server admin must allow remote file transfers that ride over an encrypted SSH connection. Which protocol fits?",
   "choices":["SFTP","FTP","TFTP","HTTP"],"correctAnswer":0},
  # 168 D2 ca:1
  {"id":"serverplus-168","domain":"Server Administration","type":"single-choice",
   "question":"A legacy application requires plain unencrypted file transfer. Which TCP port does standard FTP control connections use by default?",
   "choices":["20","21","22","23"],"correctAnswer":1},
  # 169 D2 ca:2
  {"id":"serverplus-169","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin deploys a role that lets multiple remote users concurrently log into and run sessions on a server, sharing the OS. Which role is this?",
   "choices":["File Server","Hyper-V","Remote Desktop Services (RDS) / Terminal Services","DNS Server"],"correctAnswer":2},
  # 170 D2 ca:3
  {"id":"serverplus-170","domain":"Server Administration","type":"single-choice",
   "question":"A Hyper-V admin wants to keep a replica of a VM on a second host that is automatically updated on a schedule, ready for failover if the primary host fails. Which feature provides this?",
   "choices":["Live Migration","Storage Migration","Quick Migration","Hyper-V Replica"],"correctAnswer":3},
  # 171 D2 ca:0
  {"id":"serverplus-171","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin wants centralized management of printer drivers and queues for shared office printers. Which server role provides this?",
   "choices":["Print Server","DHCP Server","DNS Server","File Server"],"correctAnswer":0},
  # 172 D3 ca:1
  {"id":"serverplus-172","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A Windows admin troubleshoots Active Directory authentication issues. Which authentication protocol is used by AD by default and relies on ticket-granting tickets issued by a KDC?",
   "choices":["NTLM","Kerberos","CHAP","PAP"],"correctAnswer":1},
  # 173 D3 ca:2
  {"id":"serverplus-173","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An application needs to query and bind to a directory service to authenticate users by reading directory entries over a standardized protocol. Which protocol is most appropriate?",
   "choices":["SNMP","SMB","LDAP (port 389) or LDAPS (port 636)","RADIUS"],"correctAnswer":2},
  # 174 D3 ca:3
  {"id":"serverplus-174","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A network team wants to centralize authentication, authorization, and accounting for remote VPN and 802.1X wireless users. Which protocol/service is the most common choice?",
   "choices":["SNMP","SMTP","LDAP only","RADIUS"],"correctAnswer":3},
  # 175 D3 ca:0
  {"id":"serverplus-175","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An organization implements browser-based single sign-on between an internal identity provider and a third-party SaaS application using XML-based authentication assertions. Which protocol is being used?",
   "choices":["SAML","OAuth 2.0","Kerberos","RADIUS"],"correctAnswer":0},
  # 176 D3 ca:1
  {"id":"serverplus-176","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A developer integrates with an external API that uses a token-based delegation protocol primarily designed to grant resource access on behalf of a user. Which protocol is this?",
   "choices":["SAML","OAuth 2.0","TLS PSK","Kerberos"],"correctAnswer":1},
  # 177 D3 ca:2
  {"id":"serverplus-177","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A high-security environment requires users to insert a physical token containing a private key and enter a PIN to log into the workstation. Which authentication factor combination is this?",
   "choices":["Single-factor — knowledge only","Single-factor — possession only","Multi-factor authentication — something you have plus something you know","Multi-factor — two something-you-know factors"],"correctAnswer":2},
  # 178 D3 ca:3
  {"id":"serverplus-178","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security policy locks accounts after 5 failed logon attempts within 15 minutes. Which security control is this?",
   "choices":["Password complexity","Password aging","Account expiration","Account lockout policy"],"correctAnswer":3},
  # 179 D3 ca:0
  {"id":"serverplus-179","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security architect divides the network into multiple zones (DMZ, internal services, sensitive data) separated by firewalls so that a breach in one zone cannot directly reach the others. What is this practice called?",
   "choices":["Network segmentation","Implicit allow","Flat-network design","Defense by obscurity"],"correctAnswer":0},
  # 180 D4 ca:1
  {"id":"serverplus-180","domain":"Troubleshooting","type":"single-choice",
   "question":"A storage admin replaces a single failed drive in a 6-drive RAID 5 array. While the array rebuilds, which state best describes the array?",
   "choices":["Failed — data inaccessible until rebuild completes","Degraded — operational with reduced fault tolerance","Optimal — no impact","Initializing — array does not exist yet"],"correctAnswer":1},
  # 181 D4 ca:2
  {"id":"serverplus-181","domain":"Troubleshooting","type":"single-choice",
   "question":"A 6-drive RAID 5 array loses a second drive while the first failed drive's rebuild is still in progress. What is the most likely outcome?",
   "choices":["The array continues to serve data with reduced performance","Rebuild restarts automatically with no impact","The array fails and data must be restored from backup","RAID 5 transparently tolerates two simultaneous drive losses"],"correctAnswer":2},
  # 182 D4 ca:3
  {"id":"serverplus-182","domain":"Troubleshooting","type":"single-choice",
   "question":"A server displays 'Operating System Not Found' immediately after POST. Which item should be checked FIRST?",
   "choices":["Domain trust health","Memory timings","CPU microcode version","Boot order in firmware and that the boot disk is enumerated and healthy"],"correctAnswer":3},
  # 183 D4 ca:0
  {"id":"serverplus-183","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows admin needs to boot the server with only essential drivers and services to troubleshoot a faulty third-party driver. Which boot option provides this?",
   "choices":["Safe Mode","Hibernation","Sleep","Hyper-V boot"],"correctAnswer":0},
  # 184 D4 ca:1
  {"id":"serverplus-184","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux admin needs to boot directly to a minimal root shell to repair a misconfigured fstab. Which boot target/mode provides this?",
   "choices":["Multi-user with graphical","Single-user (rescue/emergency) mode","Network boot only","Hibernation"],"correctAnswer":1},
  # 185 D4 ca:2
  {"id":"serverplus-185","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux server's kernel panics on boot. The admin needs to temporarily change kernel parameters for a one-time boot. Which bootloader's edit mode is used?",
   "choices":["systemd-boot only","LILO","GRUB","NTLDR"],"correctAnswer":2},
  # 186 D4 ca:3
  {"id":"serverplus-186","domain":"Troubleshooting","type":"single-choice",
   "question":"Domain-joined Windows clients suddenly fail Kerberos authentication after a DC change. Which configuration mismatch most commonly causes this?",
   "choices":["NIC MAC address mismatch","BIOS revision difference","NTFS permissions difference","Time skew greater than the configured tolerance between client and DC"],"correctAnswer":3},
  # 187 D4 ca:0
  {"id":"serverplus-187","domain":"Troubleshooting","type":"single-choice",
   "question":"A technician plugs a server NIC into a switch but the link LED never illuminates. Which item should be checked FIRST?",
   "choices":["Physical layer — cable, NIC, and switch port health","Active Directory replication","DNS suffix order","Group Policy refresh interval"],"correctAnswer":0},
  # 188 D4 ca:1
  {"id":"serverplus-188","domain":"Troubleshooting","type":"single-choice",
   "question":"Two servers on the same VLAN show very slow file transfers between each other while normal-sized pings work fine. Which condition is a common cause?",
   "choices":["DNS resolution failure","MTU mismatch (e.g., jumbo frames on one side, standard MTU on the other)","Out-of-date BIOS","Stuck NIC link LED"],"correctAnswer":1},
  # 189 D4 ca:2
  {"id":"serverplus-189","domain":"Troubleshooting","type":"single-choice",
   "question":"A server loses one of two physical paths to its SAN LUN. The OS continues to read and write without interruption. Which technology enables this transparent failover?",
   "choices":["Storage replication","LACP NIC teaming","Multipath I/O (MPIO)","RAID 0 striping"],"correctAnswer":2},
  # 190 D4 ca:3
  {"id":"serverplus-190","domain":"Troubleshooting","type":"single-choice",
   "question":"A VMware admin discovers a production VM has had a snapshot left in place for many weeks and the datastore is now nearly full. What is the correct corrective action?",
   "choices":["Disable the datastore","Reformat the LUN","Reduce VM RAM","Consolidate or delete the snapshot to release space, then verify free space"],"correctAnswer":3},

  # ── MR 191-193 ───────────────────────────────────────────────────────────
  # 191 D1 [1,2]
  {"id":"serverplus-191","domain":"Server Hardware Installation and Management","type":"multiple-response",
   "question":"Which TWO of the following are block-level SAN storage protocols? (Select 2)",
   "choices":["NFS","Fiber Channel","FCoE","SMB"],"correctAnswers":[1,2]},
  # 192 D2 [0,1]
  {"id":"serverplus-192","domain":"Server Administration","type":"multiple-response",
   "question":"Which TWO Active Directory FSMO roles are forest-wide (one per forest) rather than per-domain? (Select 2)",
   "choices":["Schema Master","Domain Naming Master","RID Master","PDC Emulator"],"correctAnswers":[0,1]},
  # 193 D4 [0,2]
  {"id":"serverplus-193","domain":"Troubleshooting","type":"multiple-response",
   "question":"A Windows server fails to boot after a recent update. Which TWO recovery actions are MOST appropriate to try FIRST before more invasive steps? (Select 2)",
   "choices":["Boot the server from recovery media or WinRE","Reformat the system drive immediately","Use Startup Repair or rebuild the bootloader from WinRE","Perform a clean OS reinstall and rebuild from scratch"],"correctAnswers":[0,2]},

  # ── Matching 194-195 ─────────────────────────────────────────────────────
  # 194 D3 correctMatches:[1,2,3,0]
  {"id":"serverplus-194","domain":"Security and Disaster Recovery","type":"matching",
   "question":"Match each authentication or SSO protocol with its defining characteristic.",
   "itemsLeft":["Kerberos","LDAP","RADIUS","SAML"],
   "itemsRight":["XML-based assertions enabling web SSO between IdP and SP","Ticket-based authentication protocol used by Active Directory","Directory-access protocol typically on TCP 389/636","Centralized AAA service typically used for VPN and 802.1X"],
   "correctMatches":[1,2,3,0]},
  # 195 D2 correctMatches:[2,3,1,0]
  {"id":"serverplus-195","domain":"Server Administration","type":"matching",
   "question":"Match each Active Directory FSMO role with its primary responsibility.",
   "itemsLeft":["Schema Master","Domain Naming Master","RID Master","PDC Emulator"],
   "itemsRight":["Primary time source and legacy password change replication for a domain","Issues blocks of relative identifiers (RIDs) to DCs in a single domain","Forest-wide role that controls modifications to the AD schema","Forest-wide role managing addition and removal of domains in the forest"],
   "correctMatches":[2,3,1,0]},

  # ── Ordering 196-197 ─────────────────────────────────────────────────────
  # 196 D2 correctOrder:[1,0,2,4,3]
  {"id":"serverplus-196","domain":"Server Administration","type":"ordering",
   "question":"Arrange the steps for promoting a Windows Server to an Active Directory Domain Controller in the correct order.",
   "items":["Install the AD DS server role and management tools",
            "Verify network connectivity, DNS, and time synchronization",
            "Promote the server to a Domain Controller using Server Manager / dcpromo",
            "Verify replication and FSMO role placement after the promotion",
            "Reboot and confirm the server is functioning as a DC"],
   "correctOrder":[1,0,2,4,3]},
  # 197 D4 correctOrder:[2,1,3,0,4]
  {"id":"serverplus-197","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the steps for diagnosing a server that fails to boot in the most logical order.",
   "items":["Run startup repair or rebuild the bootloader from recovery media",
            "Boot into WinRE or a Linux live/recovery environment",
            "Note the exact error message displayed during the failed boot",
            "Verify boot order in firmware and confirm the boot disk is detected and healthy",
            "If failure persists, restore the system from a known-good backup"],
   "correctOrder":[2,1,3,0,4]},

  # ── SB 198-200 ────────────────────────────────────────────────────────────
  # 198 D2 [T,F,T,T]
  {"id":"serverplus-198","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about Active Directory and indicate whether it is True or False.",
   "statements":["Schema Master and Domain Naming Master are forest-wide FSMO roles.",
                 "The PDC Emulator FSMO role is forest-wide and exists only in the root domain.",
                 "AGDLP best practice places accounts into global groups, globals into domain locals, and assigns permissions to the domain local groups.",
                 "Excessive time skew between a client and the domain controller (default tolerance ~5 minutes) breaks Kerberos authentication."],
   "correctAnswers":[True,False,True,True]},
  # 199 D3 [F,T,T,T]
  {"id":"serverplus-199","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about authentication and federation protocols and indicate whether it is True or False.",
   "statements":["OAuth 2.0 is primarily an authentication protocol designed to prove a user's identity.",
                 "SAML uses XML assertions to enable web SSO between an identity provider and a service provider.",
                 "RADIUS is commonly used to centralize AAA for VPN and 802.1X wireless authentication.",
                 "A smart card with a PIN is considered multi-factor authentication (something you have + something you know)."],
   "correctAnswers":[False,True,True,True]},
  # 200 D4 [T,T,F,T]
  {"id":"serverplus-200","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about RAID and storage troubleshooting and indicate whether it is True or False.",
   "statements":["A RAID 5 array with one failed disk continues to serve data in a degraded state.",
                 "Losing a second disk in a degraded RAID 5 array typically results in catastrophic data loss without intervention.",
                 "An MTU mismatch between two servers on the same VLAN typically has no impact on bulk data transfer performance.",
                 "A stale VM snapshot left in place can grow until it consumes all free space on its datastore."],
   "correctAnswers":[True,True,False,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
