import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 401-440 ───────────────────────────────────────────────────────────
  # 401 D1 ca:0
  {"id":"serverplus-401","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A storage shelf presents drives directly to the host without any RAID logic and is sometimes called a JBOD. What does JBOD mean in this context?",
   "choices":["A shelf of independent drives presented individually (Just a Bunch Of Disks), with no built-in RAID","An advanced RAID 6+1 mode","A hot-swap enclosure for tape media","An NVMe-only storage class"],"correctAnswer":0},
  # 402 D1 ca:1
  {"id":"serverplus-402","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A modern enterprise storage array provides two redundant controllers with failover. What does this design primarily protect against?",
   "choices":["NTP drift on hosts","Single controller hardware or firmware failure causing total loss of storage access","Power-supply phase imbalance","DNS poisoning"],"correctAnswer":1},
  # 403 D1 ca:2
  {"id":"serverplus-403","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A technician must replace one of two redundant power supplies in a running server. What is the proper procedure?",
   "choices":["Power down the entire server first","Shut down only the failed PSU's host blade","Verify the failed PSU and that the surviving PSU has full load capacity, then hot-swap the failed unit","Disconnect both PSUs simultaneously"],"correctAnswer":2},
  # 404 D1 ca:3
  {"id":"serverplus-404","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A 4U server weighs over 75 lbs (~34 kg) fully populated. What is the BEST practice for installing it into a high rack position?",
   "choices":["Lift it solo to save time","Use one person and a milk crate as a step","Drop it onto the rails from the top","Use a server lift or a two-person carry, following OSHA/local safety guidance"],"correctAnswer":3},
  # 405 D1 ca:0
  {"id":"serverplus-405","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A technician needs to open a vendor support case for a failed server motherboard. Which piece of information is MOST commonly required to validate entitlement?",
   "choices":["The chassis service tag / serial number","The MAC address of NIC1","The current OS build number","The RAID stripe size"],"correctAnswer":0},
  # 406 D1 ca:1
  {"id":"serverplus-406","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"An ops team labels every server in a rack with a unique inventory identifier. Which value does this practice most directly support?",
   "choices":["BIOS boot order","Asset management — tracking which server is which during incidents, audits, and refresh planning","Improved CPU clock frequency","Lower DNS query latency"],"correctAnswer":1},
  # 407 D1 ca:2
  {"id":"serverplus-407","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A hypervisor is installed on a dual-SD-card boot module rather than the spinning disks reserved for VMs. Which TWO-word phrase BEST describes the durability concern that vendors address with this design?",
   "choices":["Cache contention","SD card flash wear (write endurance) over time","Cable length limit","Fan-curve mismatch"],"correctAnswer":2},
  # 408 D1 ca:3
  {"id":"serverplus-408","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A facilities engineer is sizing a UPS and PDUs for a new rack of servers. Which calculation is most directly important to avoid tripping breakers and overloading the UPS?",
   "choices":["Average network throughput per server","Number of fans per chassis","Sum of CPU frequencies","Sum of measured real power draw (in watts) plus appropriate safety headroom, against the circuit and UPS rating"],"correctAnswer":3},
  # 409 D2 ca:0
  {"id":"serverplus-409","domain":"Server Administration","type":"single-choice",
   "question":"An IIS admin wants two sites on the same server to crash-isolate from each other, run under different identities, and recycle independently. Which IIS feature provides this?",
   "choices":["Separate application pools","Separate IP bindings only","FastCGI handler","WebDAV publishing"],"correctAnswer":0},
  # 410 D2 ca:1
  {"id":"serverplus-410","domain":"Server Administration","type":"single-choice",
   "question":"An Apache HTTP Server admin needs to enable URL rewriting. Which Apache concept is loaded to provide this functionality?",
   "choices":["A SQL trigger","A loadable Apache module (e.g., mod_rewrite)","A kernel module","A systemd unit"],"correctAnswer":1},
  # 411 D2 ca:2
  {"id":"serverplus-411","domain":"Server Administration","type":"single-choice",
   "question":"A team uses Nginx as a reverse proxy in front of two app servers and wants to distribute requests across them. Which Nginx configuration construct is used?",
   "choices":["server_name only","listen 80 default","An upstream block referenced by proxy_pass","auth_basic"],"correctAnswer":2},
  # 412 D2 ca:3
  {"id":"serverplus-412","domain":"Server Administration","type":"single-choice",
   "question":"A MariaDB admin configures one server to receive all writes and another to receive a continuous stream of changes for reads and DR. Which feature is being configured?",
   "choices":["Sharding","Federation","Foreign keys","Primary / replica (source / replica) replication"],"correctAnswer":3},
  # 413 D2 ca:0
  {"id":"serverplus-413","domain":"Server Administration","type":"single-choice",
   "question":"A backup admin in a VMware-heavy environment wants image-level VM backups, application-aware processing, and instant VM recovery. Which commercial product is commonly chosen for this?",
   "choices":["Veeam Backup & Replication","Microsoft Word","Wireshark","HAProxy"],"correctAnswer":0},
  # 414 D2 ca:1
  {"id":"serverplus-414","domain":"Server Administration","type":"single-choice",
   "question":"An enterprise data center evaluates a centralized backup platform with broad agent coverage across many OS, hypervisor, and application types. Which of the following is a well-known example of such a platform?",
   "choices":["IIS","Commvault (or similar enterprise backup suites like NetBackup)","Notepad++","Postfix"],"correctAnswer":1},
  # 415 D2 ca:2
  {"id":"serverplus-415","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin needs to safely remove a domain controller from a domain so the server can be repurposed. Which procedure is appropriate?",
   "choices":["Power off the DC permanently","Delete the DC's computer object from AD directly","Demote the server (formerly dcpromo) so AD DS is properly removed and metadata is cleaned","Reformat the disk and rejoin as a member server without demotion"],"correctAnswer":2},
  # 416 D2 ca:3
  {"id":"serverplus-416","domain":"Server Administration","type":"single-choice",
   "question":"A Group Policy admin needs a GPO to apply only to members of a specific security group, even though it is linked at the domain level. Which mechanism accomplishes this?",
   "choices":["WMI Filtering only","Loopback processing","Enforced GPO","Security filtering on the GPO"],"correctAnswer":3},
  # 417 D2 ca:0
  {"id":"serverplus-417","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin needs a browser-based GUI to manage roles, services, performance, and the registry on multiple Windows Servers. Which Microsoft tool fits this role?",
   "choices":["Windows Admin Center","Notepad","Internet Explorer 6","Hyper-V Manager only"],"correctAnswer":0},
  # 418 D2 ca:1
  {"id":"serverplus-418","domain":"Server Administration","type":"single-choice",
   "question":"A bash script needs to take action only when a certain command returns success. Which control flow is the correct shell idiom?",
   "choices":["match { ... }","if cmd; then ...; fi","switch (cmd) { ... }","try { cmd } catch { ... }"],"correctAnswer":1},
  # 419 D2 ca:2
  {"id":"serverplus-419","domain":"Server Administration","type":"single-choice",
   "question":"A bash admin needs to iterate over each file in a directory and run a command per file. Which control structure is correct?",
   "choices":["foreach FILE (*.log) do ...","async for FILE in *.log","for FILE in *.log; do command \"$FILE\"; done","while FILE in *.log loop ... end"],"correctAnswer":2},
  # 420 D2 ca:3
  {"id":"serverplus-420","domain":"Server Administration","type":"single-choice",
   "question":"A Python developer installs project-specific packages on a server WITHOUT polluting the system Python. Which built-in tool isolates dependencies?",
   "choices":["sudo pip install --global","apt install python3-pip","yum reinstall python3","python -m venv (virtual environment)"],"correctAnswer":3},
  # 421 D2 ca:0
  {"id":"serverplus-421","domain":"Server Administration","type":"single-choice",
   "question":"A PowerShell admin needs to perform an action for each item in a pipeline (e.g., for each AD user returned). Which cmdlet is most idiomatic?",
   "choices":["ForEach-Object","Select-Object only","Group-Object","Sort-Object"],"correctAnswer":0},
  # 422 D3 ca:1
  {"id":"serverplus-422","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A Linux admin hardens an internet-facing Bastion. Which sshd_config change has the LARGEST direct effect on reducing brute-force risk against the root account?",
   "choices":["Enable X11 forwarding","Set PermitRootLogin no (and require named admin accounts to su/sudo)","Change Port to 23","Disable HostKey verification on clients"],"correctAnswer":1},
  # 423 D3 ca:2
  {"id":"serverplus-423","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A remote-access VPN is configured with split tunneling so that only corporate traffic uses the tunnel and other traffic goes directly out to the internet. Which trade-off MOST applies?",
   "choices":["It always reduces user latency to corporate resources","Improves perceived performance but reduces corporate visibility into the user's other internet traffic","Split tunneling encrypts more traffic than full-tunnel mode","Split tunneling forces all DNS through the corporate resolver"],"correctAnswer":2},
  # 424 D3 ca:3
  {"id":"serverplus-424","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security team wants to protect DNS query content in transit on a corporate workstation. Which protocol pair encrypts DNS over the wire?",
   "choices":["plain DNS over UDP/53","DNS over IPSec only","Clear text on TCP/53","DNS over HTTPS (DoH) or DNS over TLS (DoT)"],"correctAnswer":3},
  # 425 D3 ca:0
  {"id":"serverplus-425","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A modern application stores user passwords using a slow hash function. Why is each user's password also stored with a unique salt?",
   "choices":["To defeat precomputed (rainbow-table) attacks and ensure identical passwords have different hashes","To reduce CPU load on the auth server","To allow the password to be reversed when needed","To shorten the storage size of each password"],"correctAnswer":0},
  # 426 D3 ca:1
  {"id":"serverplus-426","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A US-listed public company must demonstrate that financial reporting controls have not been tampered with. Which regulation is most relevant?",
   "choices":["HIPAA","SOX (Sarbanes-Oxley)","FERPA","PCI DSS"],"correctAnswer":1},
  # 427 D3 ca:2
  {"id":"serverplus-427","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An organization's change management process routes proposed production changes through a cross-functional approval body that weighs risk, impact, and timing. Which body is this?",
   "choices":["Help Desk","Compliance team","Change Advisory Board (CAB)","Procurement"],"correctAnswer":2},
  # 428 D3 ca:3
  {"id":"serverplus-428","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A documented plan describes how a business will continue critical operations during and after a major disruption, including communications, alternate sites, and recovery teams. Which plan is this?",
   "choices":["Penetration test report","Incident response runbook","Patch management plan","Business Continuity / Contingency Plan"],"correctAnswer":3},
  # 429 D3 ca:0
  {"id":"serverplus-429","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An organization implements SSO so users authenticate once and gain access to multiple internal applications. Which benefit is MOST commonly cited?",
   "choices":["Reduced password fatigue and fewer authentication prompts, with centralized auth policy enforcement","Eliminates the need for any user authentication","Reduces TLS handshakes to zero","Removes the need for MFA"],"correctAnswer":0},
  # 430 D3 ca:1
  {"id":"serverplus-430","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"Two companies want users in Company A to use Company A's identities to access shared services in Company B. Which architecture supports this without copying user accounts between companies?",
   "choices":["Cross-domain trust via shared local Administrator passwords","Identity federation (e.g., SAML or OIDC) with established trust between the two identity domains","Replicating Active Directory between the companies","Disabling MFA at Company B"],"correctAnswer":1},
  # 431 D3 ca:2
  {"id":"serverplus-431","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"In a federated authentication flow, which component is responsible for authenticating the user and issuing authentication assertions to applications?",
   "choices":["The end user's browser","The service provider","The Identity Provider (IdP)","The web application server"],"correctAnswer":2},
  # 432 D4 ca:3
  {"id":"serverplus-432","domain":"Troubleshooting","type":"single-choice",
   "question":"An admin cannot reach a server's iDRAC/iLO web UI after a network change. Which item should be checked FIRST?",
   "choices":["Domain controller replication","Disk SMART status","NTFS share permissions","BMC IP / VLAN, dedicated management NIC vs. shared NIC, and DHCP/static configuration"],"correctAnswer":3},
  # 433 D4 ca:0
  {"id":"serverplus-433","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux server boots without errors, but 'free -h' shows zero swap available. Which file should be inspected to verify swap is configured to activate at boot?",
   "choices":["/etc/fstab (and the swap line / device or swapfile referenced there)","/etc/hostname","/etc/resolv.conf","/etc/shadow"],"correctAnswer":0},
  # 434 D4 ca:1
  {"id":"serverplus-434","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux server fails to boot to a normal login prompt after editing /etc/fstab. The boot drops to an emergency shell. Which recovery step is MOST appropriate?",
   "choices":["Reinstall the OS","Boot to a rescue/single-user mode, remount the root rw, correct the bad fstab line, and reboot","Reformat /var","Recreate all users"],"correctAnswer":1},
  # 435 D4 ca:2
  {"id":"serverplus-435","domain":"Troubleshooting","type":"single-choice",
   "question":"A RAID controller is detected at boot but the previously configured virtual disks are missing. Which condition is a common cause?",
   "choices":["Domain replication failure","NTP drift","Controller firmware change or NVRAM reset cleared the configuration; physical disks may still hold the array data","Group Policy refresh"],"correctAnswer":2},
  # 436 D4 ca:3
  {"id":"serverplus-436","domain":"Troubleshooting","type":"single-choice",
   "question":"A systemd service repeatedly restarts and never reaches active status. Which diagnostic command should be run FIRST?",
   "choices":["arp -a","ipconfig /flushdns","Defragment the disk","journalctl -u <service> -xe and systemctl status <service>"],"correctAnswer":3},
  # 437 D4 ca:0
  {"id":"serverplus-437","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows server reports 'a restart is required to complete installation' and subsequent updates and some services fail to start. What is the MOST appropriate next action?",
   "choices":["Schedule and perform a clean reboot, then retry the affected operations","Disable Windows Update entirely","Format the system drive","Disable the firewall"],"correctAnswer":0},
  # 438 D4 ca:1
  {"id":"serverplus-438","domain":"Troubleshooting","type":"single-choice",
   "question":"An iSCSI initiator on a Linux host cannot see its expected LUN after a SAN team change. Which item is the MOST direct candidate for first investigation?",
   "choices":["NTFS permissions on the SAN","Target portal IP, IQN, CHAP credentials, and target ACL / masking on the SAN","BIOS POST beep code","BIOS RTC battery"],"correctAnswer":1},
  # 439 D4 ca:2
  {"id":"serverplus-439","domain":"Troubleshooting","type":"single-choice",
   "question":"A monitoring tool reports growing replication latency between two AD domain controllers in different sites. Which command surfaces a fast summary of replication health?",
   "choices":["ipconfig /all","arp -a","repadmin /replsummary","route print"],"correctAnswer":2},
  # 440 D4 ca:3
  {"id":"serverplus-440","domain":"Troubleshooting","type":"single-choice",
   "question":"A failover cluster reports that nodes are losing heartbeat with each other while the production network is fine. Which item should be inspected FIRST?",
   "choices":["NTFS share permissions","DNS suffix order","Disk SMART status","Health and configuration of the dedicated cluster heartbeat / private network and its NICs"],"correctAnswer":3},

  # ── MR 441-443 ───────────────────────────────────────────────────────────
  # 441 D2 [0,2]
  {"id":"serverplus-441","domain":"Server Administration","type":"multiple-response",
   "question":"Which TWO of the following are commercial enterprise backup platforms used to protect physical and virtual servers? (Select 2)",
   "choices":["Veeam Backup & Replication","Notepad++","Commvault","HAProxy"],"correctAnswers":[0,2]},
  # 442 D3 [1,2]
  {"id":"serverplus-442","domain":"Security and Disaster Recovery","type":"multiple-response",
   "question":"Which TWO sshd_config changes most directly harden a Linux SSH service against credential-based attacks? (Select 2)",
   "choices":["Enable X11 forwarding","Disable root login","Require key-based authentication (PasswordAuthentication no)","Enable GSSAPIAuthentication on the public interface"],"correctAnswers":[1,2]},
  # 443 D4 [0,3]
  {"id":"serverplus-443","domain":"Troubleshooting","type":"multiple-response",
   "question":"Which TWO indicators most directly suggest a failure or significant lag in Active Directory replication? (Select 2)",
   "choices":["Repadmin /replsummary reports failing partner links","Increased DHCP lease renewals on the LAN","DNS resolution of public sites is slower","Domain-joined clients see stale or inconsistent objects depending on which DC authenticates them"],"correctAnswers":[0,3]},

  # ── Matching 444-445 ─────────────────────────────────────────────────────
  # 444 D3 correctMatches:[1,2,3,0]
  {"id":"serverplus-444","domain":"Security and Disaster Recovery","type":"matching",
   "question":"Match each identity / SSO concept with its definition.",
   "itemsLeft":["SSO (Single Sign-On)","Federation","Identity Provider (IdP)","Service Provider (SP)"],
   "itemsRight":["Application that consumes identity assertions from an IdP to grant access","Authentication once that allows access to many applications within one administrative boundary","Established trust between two separate identity domains so users from one can access services in the other","Issues authentication assertions for users and is the authoritative source of identity"],
   "correctMatches":[1,2,3,0]},
  # 445 D4 correctMatches:[2,3,1,0]
  {"id":"serverplus-445","domain":"Troubleshooting","type":"matching",
   "question":"Match each network protocol with its primary purpose.",
   "itemsLeft":["ARP","ICMP","DNS","DHCP"],
   "itemsRight":["Distributes IP address, subnet mask, gateway, and DNS to clients","Resolves a hostname to an IP address","Resolves an IP address to a MAC address on the same broadcast domain","Used by ping and traceroute and to signal Layer 3 errors"],
   "correctMatches":[2,3,1,0]},

  # ── Ordering 446-447 ─────────────────────────────────────────────────────
  # 446 D2 correctOrder:[1,2,3,0,4]
  {"id":"serverplus-446","domain":"Server Administration","type":"ordering",
   "question":"Arrange the steps for configuring MySQL/MariaDB primary-replica replication in the correct order.",
   "items":["Configure the replica to start replicating from the recorded position",
            "Enable binary logging and assign a unique server-id on the primary",
            "Create a dedicated replication user on the primary",
            "Take a consistent snapshot of the primary and note the binary-log position",
            "Verify replication status with SHOW REPLICA STATUS"],
   "correctOrder":[1,2,3,0,4]},
  # 447 D4 correctOrder:[1,3,2,0,4]
  {"id":"serverplus-447","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the troubleshooting steps for failing Active Directory replication in the most logical order.",
   "items":["Promote a known-good DC or seize FSMO roles if absolutely required",
            "Run repadmin /replsummary and review DC event logs to find the failing partner(s)",
            "Verify time synchronization across the affected DCs",
            "Check DNS resolution and network reachability between the affected DCs",
            "Document the failure mode and confirm replication has stabilized"],
   "correctOrder":[1,3,2,0,4]},

  # ── SB 448-450 ────────────────────────────────────────────────────────────
  # 448 D2 [T,T,F,T]
  {"id":"serverplus-448","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about Windows and web server administration and indicate whether it is True or False.",
   "statements":["IIS application pools isolate worker processes so a crash in one pool does not directly affect sites running in other pools.",
                 "Apache modules can be loaded dynamically to add functionality without recompiling the server.",
                 "MySQL primary-replica replication is a substitute for backups because replicas always retain deleted rows.",
                 "Windows Admin Center provides a browser-based UI for managing Windows Server roles and features."],
   "correctAnswers":[True,True,False,True]},
  # 449 D3 [T,F,T,T]
  {"id":"serverplus-449","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about access, federation, and DNS privacy and indicate whether it is True or False.",
   "statements":["Disabling SSH password authentication in favor of key-based authentication reduces brute-force risk.",
                 "DNS over HTTPS (DoH) provides the same privacy properties as plain unencrypted DNS over UDP/53.",
                 "Identity federation establishes trust between separate identity domains so users can SSO across organizations.",
                 "SSO within one organization reduces password fatigue and the number of credential prompts users see."],
   "correctAnswers":[True,False,True,True]},
  # 450 D4 [F,T,T,T]
  {"id":"serverplus-450","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about Linux, AD, and storage troubleshooting and indicate whether it is True or False.",
   "statements":["A bad swap entry in /etc/fstab pointing at a non-existent device will have no impact on Linux boot behavior.",
                 "Active Directory replication is sensitive to DNS resolution and time synchronization between domain controllers.",
                 "A pending Windows reboot can block subsequent updates from installing and may prevent some services from starting.",
                 "An iSCSI initiator that cannot see its expected LUN may indicate a target ACL, portal IP, or CHAP credential change."],
   "correctAnswers":[False,True,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
