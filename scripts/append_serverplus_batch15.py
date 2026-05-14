import json, pathlib

Q = pathlib.Path("src/data/comptia-server-plus-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── SC 701-740 ───────────────────────────────────────────────────────────
  # 701 D1 ca:0
  {"id":"serverplus-701","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A data center wants short, low-cost 10/25 GbE links between a top-of-rack switch and servers, with passive copper twinax instead of optics. Which cable type fits?",
   "choices":["Direct Attach Cable (DAC) — passive twinax","Cat3 patch cord","Coax RG-58","Single-mode fiber 10 km transceiver"],"correctAnswer":0},
  # 702 D1 ca:1
  {"id":"serverplus-702","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A storage row uses cables that contain integrated electro-optical transceivers and require less power/heat handling at the host than swapping individual transceivers and patch cords. Which cable type is this?",
   "choices":["Cat6","Active Optical Cable (AOC)","Coax","DAC"],"correctAnswer":1},
  # 703 D1 ca:2
  {"id":"serverplus-703","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A blade server's onboard NIC is supplemented by a small daughter board that adds additional Ethernet ports to that blade. What is this daughter board called?",
   "choices":["Drive backplane","Riser card","Mezzanine NIC (a.k.a. LOM mezzanine)","SFP+ cage"],"correctAnswer":2},
  # 704 D1 ca:3
  {"id":"serverplus-704","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A 1U server cannot accept full-height PCIe cards directly. Which physical accessory enables it to host full-height cards by tilting them horizontally?",
   "choices":["NIC mezzanine","Drive sled","Front bezel","PCIe riser card (and its accompanying cage)"],"correctAnswer":3},
  # 705 D1 ca:0
  {"id":"serverplus-705","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A facilities technician must lift a raised floor tile to access plenum cabling beneath. Which tool is purpose-built and safest for this task?",
   "choices":["A floor tile lifter (suction cup or screw-pull lifter)","A screwdriver","A hammer","Fingertips"],"correctAnswer":0},
  # 706 D1 ca:1
  {"id":"serverplus-706","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A field technician needs portable keyboard, monitor, and mouse to service servers throughout a data center. Which physical tool is commonly used to bring this hardware to each rack?",
   "choices":["A custom-built bicycle","A KVM cart (or crash cart)","A rolling whiteboard","A network analyzer suitcase only"],"correctAnswer":1},
  # 707 D1 ca:2
  {"id":"serverplus-707","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A 2.5-inch SAS drive is installed in a hot-swap bay. Which front-facing component on the drive caddy is typically tied to drive activity and fault state?",
   "choices":["BIOS chip","Battery","Activity / status LED on the drive carrier","TPM module"],"correctAnswer":2},
  # 708 D1 ca:3
  {"id":"serverplus-708","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"A storage admin doubles a server's drive capacity by connecting an external enclosure of drives to the server's HBA. What is this external chassis commonly called?",
   "choices":["Riser bay","Bezel","Cabinet PDU","Storage shelf / drive expansion enclosure"],"correctAnswer":3},
  # 709 D1 ca:0
  {"id":"serverplus-709","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"After commissioning a new server, an admin updates a document that lists firmware versions, BMC IP, OS build, network configuration, RAID layout, and contact owner. What is this document commonly called?",
   "choices":["As-built / build documentation for the server","Marketing collateral","Office floor plan","Acceptable use policy"],"correctAnswer":0},
  # 710 D1 ca:1
  {"id":"serverplus-710","domain":"Server Hardware Installation and Management","type":"single-choice",
   "question":"An operations team documents step-by-step procedures for routine tasks like reboots, certificate renewals, and patching for each platform. What is this document commonly called?",
   "choices":["Vendor contract","Runbook","Asset register","Org chart"],"correctAnswer":1},
  # 711 D2 ca:2
  {"id":"serverplus-711","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin must grant a non-owner user write access to a file without changing the existing UNIX rwx permissions for owner/group/other. Which feature provides this granularity?",
   "choices":["chmod 755 only","chown only","Filesystem ACLs via setfacl / getfacl","Setting the sticky bit"],"correctAnswer":2},
  # 712 D2 ca:3
  {"id":"serverplus-712","domain":"Server Administration","type":"single-choice",
   "question":"A Linux user connects to a new server via SSH. Which client-side file records server fingerprints so future connections can detect a changed key?",
   "choices":["/etc/ssh/sshd_config","/etc/hosts","~/.ssh/authorized_keys","~/.ssh/known_hosts"],"correctAnswer":3},
  # 713 D2 ca:0
  {"id":"serverplus-713","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs to install their local SSH public key into a remote user's authorized_keys file. Which convenience tool automates this?",
   "choices":["ssh-copy-id","scp -rf","sshfs","ssh-keygen -t rsa"],"correctAnswer":0},
  # 714 D2 ca:1
  {"id":"serverplus-714","domain":"Server Administration","type":"single-choice",
   "question":"A Linux admin needs to add an extra step (e.g., require MFA) for SSH logins to a specific server. Which subsystem can be configured to stack additional authentication checks?",
   "choices":["systemd-resolved","PAM (Pluggable Authentication Modules)","logrotate","cron"],"correctAnswer":1},
  # 715 D2 ca:2
  {"id":"serverplus-715","domain":"Server Administration","type":"single-choice",
   "question":"A DNS admin compares record types for a host. Which difference distinguishes an A record from an AAAA record?",
   "choices":["A returns the next mail server; AAAA returns the host's port","Both records return only TLS certificates","An A record maps a hostname to an IPv4 address; an AAAA record maps a hostname to an IPv6 address","AAAA is an alias for SOA"],"correctAnswer":2},
  # 716 D2 ca:3
  {"id":"serverplus-716","domain":"Server Administration","type":"single-choice",
   "question":"A Windows admin wants to publish RDP through HTTPS so users do not need a VPN to connect to internal desktops. Which role provides this gateway functionality?",
   "choices":["IIS only","Distributed File System Namespace","Hyper-V Replica","Remote Desktop Gateway (RD Gateway)"],"correctAnswer":3},
  # 717 D2 ca:0
  {"id":"serverplus-717","domain":"Server Administration","type":"single-choice",
   "question":"A networking team evaluates a modern, simpler VPN protocol that uses fast public-key cryptography, runs in the kernel on Linux, and uses UDP. Which protocol fits this description?",
   "choices":["WireGuard","L2TP/IPSec only","PPTP","SSL VPN over TCP/443 only"],"correctAnswer":0},
  # 718 D2 ca:1
  {"id":"serverplus-718","domain":"Server Administration","type":"single-choice",
   "question":"An NTP admin needs to ensure that downstream servers only accept signed time updates from a trusted upstream source. Which NTP feature provides this?",
   "choices":["NTP authoritative-only mode","NTP authentication keys (symmetric keys, or NTS for modern deployments)","Reverse DNS only","NTP DiffServ markings"],"correctAnswer":1},
  # 719 D2 ca:2
  {"id":"serverplus-719","domain":"Server Administration","type":"single-choice",
   "question":"A Linux user wants to add a cron job for their own account using the safe, recommended interface that respects ownership and syntax checks. Which command should they run?",
   "choices":["Edit /var/spool/cron directly","Modify /etc/cron.daily by hand","crontab -e","systemctl enable crond only"],"correctAnswer":2},
  # 720 D3 ca:3
  {"id":"serverplus-720","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An organization implements a discipline that ensures the right people have the right access at the right time, including provisioning, recertification, and separation-of-duties enforcement. Which discipline is this?",
   "choices":["DLP","SIEM operations","Bastion management","Identity Governance and Administration (IGA)"],"correctAnswer":3},
  # 721 D3 ca:0
  {"id":"serverplus-721","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A platform team manages service accounts used by applications. Which TWO practices most directly reduce the security risk of long-lived service-account credentials?",
   "choices":["Standardize naming and routinely rotate or replace service-account credentials with managed identities/secrets","Hard-code credentials in source control","Share one service account across all apps for convenience","Disable monitoring of service accounts"],"correctAnswer":0},
  # 722 D3 ca:1
  {"id":"serverplus-722","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A security policy requires that privileged administrative tasks be performed from a separate, dedicated account rather than the admin's daily-driver account. Which principle does this implement?",
   "choices":["Defense in depth only","Separation of privileged from non-privileged accounts (privileged account hygiene)","Implicit allow","Trust by default"],"correctAnswer":1},
  # 723 D3 ca:2
  {"id":"serverplus-723","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A privileged access management platform grants administrators elevated rights only when an approved request is active and revokes them automatically when the task completes. Which model is this?",
   "choices":["Standing super-user","Always-on root","Just-In-Time (JIT) elevation","Distributed admin"],"correctAnswer":2},
  # 724 D3 ca:3
  {"id":"serverplus-724","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A modern PAM/cloud-IAM model removes day-to-day standing administrative rights, granting them only through request/approval workflows. What is this design philosophy called?",
   "choices":["Always-on admin","Persistent root","Open access","Zero Standing Privileges"],"correctAnswer":3},
  # 725 D3 ca:0
  {"id":"serverplus-725","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"An authorization model evaluates an access request based on the user's attributes, the resource's attributes, the action, and contextual signals like time and device posture. Which model is this?",
   "choices":["Attribute-Based Access Control (ABAC)","Discretionary Access Control (DAC)","MAC label-only","Rule-based only"],"correctAnswer":0},
  # 726 D3 ca:1
  {"id":"serverplus-726","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A cloud security review finds an IAM role with 'AdministratorAccess' attached to an EC2 instance whose application only needs S3 read access. Which principle is most clearly violated?",
   "choices":["Defense in depth","Least privilege","Implicit deny","Separation of duties"],"correctAnswer":1},
  # 727 D3 ca:2
  {"id":"serverplus-727","domain":"Security and Disaster Recovery","type":"single-choice",
   "question":"A cloud customer encrypts S3 objects with keys whose lifecycle (rotation, deletion, access policy) they manage in the cloud KMS. Which encryption-key type is this?",
   "choices":["Customer-controlled hardware only","Provider-default keys with no customer control","Customer-Managed Key (CMK) in cloud KMS","Shared symmetric key with the provider"],"correctAnswer":2},
  # 728 D4 ca:3
  {"id":"serverplus-728","domain":"Troubleshooting","type":"single-choice",
   "question":"A Linux server drops to an emergency 'initramfs' (or dracut) shell at boot. Which root cause is the MOST common?",
   "choices":["NTP drift","Domain replication failure","Disabled SELinux","The kernel could not mount the root filesystem (e.g., wrong root= parameter, missing modules, or corrupted /boot)"],"correctAnswer":3},
  # 729 D4 ca:0
  {"id":"serverplus-729","domain":"Troubleshooting","type":"single-choice",
   "question":"A systemd service fails to start with a clear 'unit file syntax error' message. Which command is the MOST direct next step?",
   "choices":["Validate the unit file syntax (systemctl status / journalctl, systemd-analyze verify) and correct the offending directive","Reformat /var","Reboot to single user","Reinstall the OS"],"correctAnswer":0},
  # 730 D4 ca:1
  {"id":"serverplus-730","domain":"Troubleshooting","type":"single-choice",
   "question":"A Windows admin updates a storage driver, and the server begins to crash. Which Windows Device Manager action reverts to the previously installed version of the driver?",
   "choices":["Disable Device","Roll Back Driver","Uninstall Device","Scan for Hardware Changes"],"correctAnswer":1},
  # 731 D4 ca:2
  {"id":"serverplus-731","domain":"Troubleshooting","type":"single-choice",
   "question":"A production VM has had a snapshot in place for several weeks. Performance has been steadily degrading. Which mechanism most directly explains this performance impact?",
   "choices":["Spanning Tree recalculation","NTP drift","Long delta-disk chain causing additional I/O hops on every read/write","Disabled MFA"],"correctAnswer":2},
  # 732 D4 ca:3
  {"id":"serverplus-732","domain":"Troubleshooting","type":"single-choice",
   "question":"A technician inserts a replacement drive into a hot-swap bay, but the OS does not see the new device. Which action is the MOST direct next step?",
   "choices":["Reformat the BIOS","Replace the motherboard","Reset the BMC","Trigger a controller rescan (via the RAID controller UI/CLI or echo to /sys/class/scsi_host/*/scan on Linux)"],"correctAnswer":3},
  # 733 D4 ca:0
  {"id":"serverplus-733","domain":"Troubleshooting","type":"single-choice",
   "question":"A site-to-site VPN drops connections only for traffic carrying large payloads (e.g., file transfers), while small interactive traffic works. Which condition is the MOST likely cause?",
   "choices":["Path MTU Discovery is being blocked by an upstream device dropping the required ICMP messages","DNS replication failure","Time zone mismatch","Disabled MFA"],"correctAnswer":0},
  # 734 D4 ca:1
  {"id":"serverplus-734","domain":"Troubleshooting","type":"single-choice",
   "question":"A new IPSec VPN tunnel is shown as 'established' in both peers, but no user traffic crosses it. Which configuration item is the MOST direct candidate for first investigation?",
   "choices":["BIOS RTC battery","Routing, traffic selectors / proxy IDs, and NAT rules on each peer for the protected subnets","Group Policy refresh interval","Domain replication health"],"correctAnswer":1},
  # 735 D4 ca:2
  {"id":"serverplus-735","domain":"Troubleshooting","type":"single-choice",
   "question":"A new web server returns a TLS error on some clients but not others. Investigation shows the server is sending only its leaf certificate. Which corrective action is appropriate?",
   "choices":["Disable HTTPS","Self-sign and ignore the warnings","Install the intermediate (and where required, root) certificates on the server to complete the chain","Issue a new root certificate locally"],"correctAnswer":2},
  # 736 D4 ca:3
  {"id":"serverplus-736","domain":"Troubleshooting","type":"single-choice",
   "question":"A storage admin notices that a RAID controller has automatically disabled write-back cache. Which root cause is the MOST common?",
   "choices":["NTP drift","Group Policy filter","NTFS junction corruption","Failed or degraded BBU/capacitor on the controller — controller falls back to write-through to protect data"],"correctAnswer":3},
  # 737 D4 ca:0
  {"id":"serverplus-737","domain":"Troubleshooting","type":"single-choice",
   "question":"An on-call team is overwhelmed by alerts; many alerts are repeatedly snoozed without action. Which corrective practice MOST directly reduces alert fatigue?",
   "choices":["Tune thresholds, deduplicate, and prioritize alerts so only actionable, owner-bearing alerts page a human","Disable all alerts","Page every team for every alert","Remove the on-call rotation"],"correctAnswer":0},
  # 738 D4 ca:1
  {"id":"serverplus-738","domain":"Troubleshooting","type":"single-choice",
   "question":"An incident timeline is reconstructed from logs across servers in different time zones. Which best practice helps simplify cross-server correlation?",
   "choices":["Disable logging on systems that drift","Configure all servers to log in UTC (or include offset info), and normalize timestamps in the SIEM","Hand-translate every timestamp during triage","Rebuild affected servers"],"correctAnswer":1},
  # 739 D4 ca:2
  {"id":"serverplus-739","domain":"Troubleshooting","type":"single-choice",
   "question":"A critical application service stops responding after midnight on the 31st of the month. Investigation reveals its commercial license expired. Which corrective action is the MOST appropriate?",
   "choices":["Reinstall the OS","Disable the firewall","Renew the license (or apply a permanent fix per the vendor) and restart the service after applying the new license","Reformat the data volume"],"correctAnswer":2},
  # 740 D4 ca:3
  {"id":"serverplus-740","domain":"Troubleshooting","type":"single-choice",
   "question":"A major incident is delayed because operators cannot find current as-built docs, network diagrams, or change history for the affected server. Which preventive practice MOST directly addresses this?",
   "choices":["Disable change management","Lower the priority of documentation forever","Keep notes only in personal notebooks","Maintain current, version-controlled as-built documentation, network diagrams, and runbooks linked from the CMDB"],"correctAnswer":3},

  # ── MR 741-743 ───────────────────────────────────────────────────────────
  # 741 D2 [0,2]
  {"id":"serverplus-741","domain":"Server Administration","type":"multiple-response",
   "question":"Which TWO mechanisms are commonly used to harden SSH and the underlying authentication stack on Linux servers? (Select 2)",
   "choices":["Layered PAM modules adding checks (e.g., MFA) on top of SSH","Public allowlist of every root password in /etc/motd","Public-key authentication with PasswordAuthentication no","Shared admin accounts for ease of use"],"correctAnswers":[0,2]},
  # 742 D3 [1,3]
  {"id":"serverplus-742","domain":"Security and Disaster Recovery","type":"multiple-response",
   "question":"Which TWO activities are core to an Identity Governance and Administration program? (Select 2)",
   "choices":["Removing all logging from identity systems","Identity lifecycle management (joiner-mover-leaver) automation","Sharing one service account across every workload for simplicity","Periodic access reviews and certifications by business owners"],"correctAnswers":[1,3]},
  # 743 D4 [0,3]
  {"id":"serverplus-743","domain":"Troubleshooting","type":"multiple-response",
   "question":"A user reports a TLS error on a public website while other users do not. Which TWO conditions are common causes? (Select 2)",
   "choices":["The server presents an incomplete certificate chain (missing intermediate)","NTP is healthy on the server","DHCP renewals on the LAN are slow","The user's device has an expired or removed root CA in its trust store"],"correctAnswers":[0,3]},

  # ── Matching 744-745 ─────────────────────────────────────────────────────
  # 744 D1 correctMatches:[2,3,1,0]
  {"id":"serverplus-744","domain":"Server Hardware Installation and Management","type":"matching",
   "question":"Match each cabling or chassis component with its description.",
   "itemsLeft":["DAC","AOC","PCIe riser card","Drive caddy"],
   "itemsRight":["Mechanical carrier with LEDs that secures a drive in a hot-swap bay","Daughter board that redirects PCIe slots to accept larger cards in low-profile chassis","Passive copper twinax cable used for short-distance, in-rack server-to-switch links","Active optical fiber cable suitable for moderate in-rack distances"],
   "correctMatches":[2,3,1,0]},
  # 745 D4 correctMatches:[1,2,3,0]
  {"id":"serverplus-745","domain":"Troubleshooting","type":"matching",
   "question":"Match each observed symptom with the most likely root cause.",
   "itemsLeft":["Server drops to initramfs/dracut prompt at boot","RAID controller has disabled write-back cache","IPSec VPN tunnel is 'up' but no user traffic flows","TLS error on some clients but not others"],
   "itemsRight":["Missing intermediate certificate in the server's TLS chain","Kernel could not mount the root filesystem at boot","Failing/missing BBU or capacitor — controller fell back to write-through to protect data","Routing, traffic selectors, or NAT rules do not allow user traffic over the tunnel"],
   "correctMatches":[1,2,3,0]},

  # ── Ordering 746-747 ─────────────────────────────────────────────────────
  # 746 D3 correctOrder:[1,3,2,0,4]
  {"id":"serverplus-746","domain":"Security and Disaster Recovery","type":"ordering",
   "question":"Arrange the steps for rolling out an Identity Governance and Administration program in the most logical order.",
   "items":["Continuously review and recertify user access",
            "Define identity governance policy (lifecycle, separation of duties, access reviews)",
            "Implement governance tooling to enforce the defined policies",
            "Onboard sources of identity and target resources into the governance tool",
            "Report on access risk and exceptions to leadership"],
   "correctOrder":[1,3,2,0,4]},
  # 747 D4 correctOrder:[2,3,1,0,4]
  {"id":"serverplus-747","domain":"Troubleshooting","type":"ordering",
   "question":"Arrange the steps for resolving an application service that is failing due to a configuration error in the most logical order.",
   "items":["Run the application again to confirm the fix",
            "Reload the application via systemctl / Service Manager to apply the new configuration",
            "Identify the exact error message in the application's log",
            "Back up the configuration and edit it to address the error",
            "Document the change in the runbook and the incident ticket"],
   "correctOrder":[2,3,1,0,4]},

  # ── SB 748-750 ────────────────────────────────────────────────────────────
  # 748 D2 [T,F,T,T]
  {"id":"serverplus-748","domain":"Server Administration","type":"statement-block",
   "question":"Evaluate each statement about Linux authentication and admin tooling and indicate whether it is True or False.",
   "statements":["PAM allows administrators to stack multiple authentication and account-management modules per service.",
                 "The SSH 'known_hosts' file is used by SSH servers to authenticate connecting clients.",
                 "'ssh-copy-id' is a convenience tool for installing a local SSH public key into a remote user's authorized_keys file.",
                 "Per-user cron jobs are typically edited with 'crontab -e' rather than by hand-editing /var/spool/cron files."],
   "correctAnswers":[True,False,True,True]},
  # 749 D3 [T,T,F,T]
  {"id":"serverplus-749","domain":"Security and Disaster Recovery","type":"statement-block",
   "question":"Evaluate each statement about modern identity and access controls and indicate whether it is True or False.",
   "statements":["Just-In-Time (JIT) elevation grants administrative rights only for the duration of an approved task.",
                 "Attribute-Based Access Control (ABAC) makes decisions based on attributes of the user, resource, action, and context.",
                 "Service accounts should always be human user accounts shared by the operations team.",
                 "Customer-Managed Keys (CMK) let cloud customers control the encryption-key lifecycle and access within a cloud KMS service."],
   "correctAnswers":[True,True,False,True]},
  # 750 D4 [F,T,T,T]
  {"id":"serverplus-750","domain":"Troubleshooting","type":"statement-block",
   "question":"Evaluate each statement about operations hygiene and indicate whether it is True or False.",
   "statements":["Service-affecting alerts should never be tuned, because the correct response is to wake operators every time the threshold is reached.",
                 "Time-zone mismatches between systems can complicate cross-server log analysis and incident timelines.",
                 "License expiration can stop or restrict a server service if no offline grace mechanism exists.",
                 "Lack of up-to-date as-built and runbook documentation directly slows incident triage and recovery."],
   "correctAnswers":[False,True,True,True]},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
