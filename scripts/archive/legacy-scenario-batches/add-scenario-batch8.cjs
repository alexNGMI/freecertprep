const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 457,
    domain: "Cloud Concepts",
    question: "A company's architect is designing a new order processing system on AWS. She deliberately places the payment service, inventory service, and shipping service in separate components that don't call each other directly. Instead, each service publishes events to a shared message bus. If the shipping service crashes, orders still process and payments still succeed. Which architectural principle does this demonstrate?",
    choices: [
      "Monolithic architecture with redundancy",
      "Vertical scaling for high availability",
      "Microservices with loose coupling and failure isolation",
      "Active-passive failover clustering"
    ],
    correctAnswer: 2,
    explanation: "Microservices with loose coupling means each service operates independently — communicating via events rather than direct calls. When the shipping service crashes, the failure is isolated: payment and inventory continue functioning normally. Events queue up and shipping processes them when it recovers. This is a fundamental cloud-native design pattern."
  },
  {
    id: 458,
    domain: "Cloud Concepts",
    question: "A startup wants to adopt cloud computing. Their CTO lists the key characteristics they need: (1) access resources immediately without calling a sales rep, (2) pay only for what they use measured per hour or per GB, (3) access from anywhere via internet, and (4) the provider manages the physical infrastructure. Which cloud computing model are they describing?",
    choices: [
      "Private cloud with managed hosting",
      "Public cloud with on-demand self-service and pay-as-you-go pricing",
      "Colocation with managed services",
      "Hybrid cloud with VPN connectivity"
    ],
    correctAnswer: 1,
    explanation: "The CTO is describing the defining characteristics of public cloud computing: on-demand self-service (provision without human interaction), measured service (pay per use), broad network access (access via internet), and resource pooling (provider manages physical infrastructure). AWS is a public cloud offering all these characteristics."
  },
  {
    id: 459,
    domain: "Cloud Concepts",
    question: "A company architect is reviewing their application and identifies that their database tier is a single point of failure. They propose adding an RDS Multi-AZ standby, making S3 the storage layer (which has built-in redundancy), and deploying web servers across 3 AZs. Which Well-Architected design principle are they applying?",
    choices: [
      "Optimize for cost by reducing instance count",
      "Eliminate single points of failure to improve reliability",
      "Increase performance by using larger instances",
      "Improve security by encrypting all data"
    ],
    correctAnswer: 1,
    explanation: "Eliminating single points of failure is a core reliability principle. A single-AZ database, non-redundant storage, or a single web server are each points where one failure takes the whole system offline. Multi-AZ RDS, S3's built-in 11-nines durability, and multi-AZ web servers each remove a SPOF — making the overall system more resilient."
  },
  {
    id: 460,
    domain: "Cloud Concepts",
    question: "A company adopted AWS 2 years ago. Looking back, their CTO notes that AWS has released 200+ new services and features since then — many of which the company has adopted to improve their product. Which cloud benefit does this ongoing access to new technologies represent?",
    choices: [
      "Economies of scale reducing costs over time",
      "Ability to go global in minutes",
      "Access to a constantly expanding set of services that accelerate innovation",
      "Reduced compliance burden over time"
    ],
    correctAnswer: 2,
    explanation: "AWS continuously releases new services and features (AI/ML, IoT, quantum computing, etc.) that customers can adopt immediately without building infrastructure. This access to cutting-edge technology at launch — without waiting for hardware procurement cycles — is a significant innovation advantage of public cloud."
  },
  {
    id: 461,
    domain: "Cloud Concepts",
    question: "A company's security team is concerned about the sustainability and environmental impact of their data centers. They note that AWS data centers achieve significantly higher energy efficiency (PUE) than typical enterprise data centers. By moving to AWS, their carbon footprint for computing decreases. Which AWS Well-Architected pillar specifically addresses environmental impact?",
    choices: [
      "Cost Optimization",
      "Operational Excellence",
      "Performance Efficiency",
      "Sustainability"
    ],
    correctAnswer: 3,
    explanation: "The Sustainability pillar (added in 2021) focuses on minimizing environmental impact of running cloud workloads. It includes using managed services (which AWS operates more efficiently than individual customers), right-sizing to avoid waste, and taking advantage of AWS's renewable energy commitments and efficient data center design."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 462,
    domain: "Security and Compliance",
    question: "A financial company must ensure that all API activity in their AWS account is recorded and stored for 7 years for regulatory compliance. They need to ensure the CloudTrail logs themselves cannot be tampered with or deleted after creation. How should they configure this?",
    choices: [
      "Enable CloudTrail and store logs in an S3 bucket in the same account",
      "Enable CloudTrail with log file validation, store logs in a dedicated S3 bucket in a separate logging account with S3 Object Lock",
      "Enable CloudTrail and encrypt logs with KMS",
      "Enable CloudTrail and configure CloudWatch Logs integration"
    ],
    correctAnswer: 1,
    explanation: "Best practice for tamper-proof audit logs: enable CloudTrail log file validation (detects modifications using SHA-256 hashes), store logs in a separate dedicated logging account (isolates from the main account where an attacker might operate), and use S3 Object Lock with Compliance mode to prevent deletion for 7 years."
  },
  {
    id: 463,
    domain: "Security and Compliance",
    question: "A company is onboarding a new AWS account. Their security team wants to ensure that every IAM user in the account is required to use MFA when signing in to the AWS Console, and that users without MFA enabled cannot perform any actions. How should they enforce this?",
    choices: [
      "Send email reminders to users without MFA",
      "Attach an IAM policy to all users that denies all actions unless aws:MultiFactorAuthPresent is true",
      "Enable MFA on the root account only",
      "Use AWS Config to report on users without MFA"
    ],
    correctAnswer: 1,
    explanation: "An IAM policy with a Deny statement conditioned on 'aws:MultiFactorAuthPresent': false blocks all AWS actions for users who haven't authenticated with MFA. Users can still sign in with a password but cannot perform any API actions until they complete MFA — effectively forcing MFA enrollment before any work can be done."
  },
  {
    id: 464,
    domain: "Security and Compliance",
    question: "A company stores customer PII in a DynamoDB table. A new compliance requirement states that all PII must be encrypted with a customer-managed key that the company controls. The key must be rotatable, and all usage must be auditable. Which approach meets these requirements?",
    choices: [
      "Use DynamoDB's default encryption (AWS-owned key)",
      "Disable encryption to avoid key management complexity",
      "Enable DynamoDB encryption with a customer managed KMS key (CMK) and enable KMS key rotation",
      "Store PII in a separate unencrypted table with restricted access"
    ],
    correctAnswer: 2,
    explanation: "Encrypting DynamoDB with a customer managed KMS key (CMK) gives the company full control: they own the key, can rotate it on a schedule, can disable or delete it (immediately revoking all access), and every KMS operation is logged to CloudTrail for auditability. AWS-owned keys provide encryption but without customer control."
  },
  {
    id: 465,
    domain: "Security and Compliance",
    question: "A developer is building a mobile app that needs to allow users to sign in with Google, Facebook, or Apple, then access their personal files in S3. The app needs to exchange a social identity token for temporary AWS credentials scoped to that specific user's S3 prefix. Which service handles this identity federation?",
    choices: [
      "AWS IAM Identity Center",
      "Amazon Cognito with Identity Pools and role mapping",
      "AWS Directory Service",
      "AWS SSO with SAML"
    ],
    correctAnswer: 1,
    explanation: "Amazon Cognito Identity Pools accept tokens from social identity providers (Google, Facebook, Apple) and exchange them for temporary AWS credentials via STS. IAM role mapping can scope each user's credentials to their specific S3 prefix using policy variables like ${cognito-identity.amazonaws.com:sub} — providing user-specific AWS access."
  },
  {
    id: 466,
    domain: "Security and Compliance",
    question: "A company runs a multi-tier application: public internet → ALB → EC2 web servers → RDS database. They want to ensure that the RDS database is ONLY reachable from the EC2 web server tier — not from the internet and not from other EC2 instances in different tiers. How should they configure this?",
    choices: [
      "Use NACLs to block all RDS traffic",
      "Configure the RDS security group to only allow inbound on port 3306 from the web server security group ID",
      "Enable RDS Multi-AZ for isolation",
      "Use VPC peering to isolate the database tier"
    ],
    correctAnswer: 1,
    explanation: "Referencing a security group ID (rather than an IP range) in an inbound rule is the most precise and maintainable approach. The RDS security group allows port 3306 only from the web server security group — so even if new EC2 instances launch with different IPs, only instances in that specific security group can reach the database."
  },
  {
    id: 467,
    domain: "Security and Compliance",
    question: "A company wants to provide their on-premises Active Directory users with access to the AWS Management Console and CLI without creating separate IAM users for each AD user. Their AD is on-premises. Which AWS service federates on-premises AD identities with AWS?",
    choices: [
      "Amazon Cognito User Pools",
      "AWS IAM Identity Center connected to on-premises AD via AWS Directory Service AD Connector",
      "IAM users with LDAP integration",
      "Amazon Cognito Identity Pools"
    ],
    correctAnswer: 1,
    explanation: "AWS IAM Identity Center (SSO) integrates with on-premises Active Directory through AD Connector (which proxies authentication requests to on-premises AD without syncing data). AD users authenticate with their existing credentials and receive role-based access to AWS accounts — no separate IAM users required."
  },
  {
    id: 468,
    domain: "Security and Compliance",
    question: "An auditor asks a company to prove that their AWS environment meets PCI DSS requirements. They need to show: (1) which AWS services are PCI-compliant, (2) AWS's attestation of compliance reports, and (3) a shared responsibility matrix. Where should the company obtain these documents?",
    choices: [
      "AWS Trusted Advisor security dashboard",
      "AWS Artifact — the self-service compliance portal",
      "AWS Config compliance dashboard",
      "AWS Security Hub compliance standards"
    ],
    correctAnswer: 1,
    explanation: "AWS Artifact is the central repository for AWS compliance documents. It provides on-demand access to AWS's PCI DSS Attestation of Compliance (AoC), ISO certifications, SOC reports, and other third-party audit reports — along with agreements like BAAs for HIPAA. These are the official documents needed to satisfy auditor requirements."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 469,
    domain: "Cloud Technology and Services",
    question: "A company runs a fleet of EC2 instances and wants to understand which applications are installed, which ports are open, and whether any instances have drifted from their approved configuration baseline. They need this inventory automatically collected and queryable. Which AWS service provides this?",
    choices: [
      "Amazon Inspector",
      "AWS Systems Manager Inventory",
      "AWS Config",
      "Amazon GuardDuty"
    ],
    correctAnswer: 1,
    explanation: "AWS Systems Manager Inventory automatically collects metadata from EC2 instances: installed applications, running services, network configuration, Windows registry, and more. This data is stored in S3 and queryable via Systems Manager, helping teams audit what's installed fleet-wide and detect configuration drift."
  },
  {
    id: 470,
    domain: "Cloud Technology and Services",
    question: "A company's website is experiencing a DDoS attack that is generating millions of requests per second, overwhelming their EC2 instances. They want to absorb the attack at the edge before traffic reaches their servers, add rate limiting, and block suspicious IP addresses automatically. Which combination provides the strongest protection?",
    choices: [
      "Increase EC2 instance size and add more instances",
      "Amazon CloudFront with AWS WAF and AWS Shield Advanced",
      "Amazon Route 53 with latency-based routing",
      "Amazon VPC with NACLs blocking the attack IPs"
    ],
    correctAnswer: 1,
    explanation: "CloudFront absorbs volumetric DDoS traffic at edge locations before it reaches the origin. AWS WAF applies rate limiting and IP blocking rules at the edge. Shield Advanced provides DDoS protection with real-time attack visibility and 24/7 DDoS response team support. Together, they form a layered edge defense that protects origin infrastructure."
  },
  {
    id: 471,
    domain: "Cloud Technology and Services",
    question: "A company needs to migrate 500 TB of data from their on-premises data center to Amazon S3 within 2 weeks. Their internet connection is 1 Gbps and is fully utilized for production traffic — they cannot use additional bandwidth. Which AWS service enables this large-scale, offline migration?",
    choices: [
      "AWS DataSync over Direct Connect",
      "AWS Snowball Edge Storage Optimized (multiple devices)",
      "Amazon S3 Transfer Acceleration",
      "AWS Direct Connect 10 Gbps dedicated connection"
    ],
    correctAnswer: 1,
    explanation: "Multiple Snowball Edge Storage Optimized devices (each holding 80 TB usable) can migrate 500 TB physically in 2 weeks — bypassing the congested internet connection entirely. AWS ships the devices, you load data locally, ship them back, and AWS imports the data to S3. This is the standard approach for large offline migrations."
  },
  {
    id: 472,
    domain: "Cloud Technology and Services",
    question: "A company's on-premises servers need access to AWS storage services (S3, EBS snapshots) but also need to maintain a local cache of frequently accessed data for low-latency on-premises access. Which AWS service provides this hybrid storage with local caching?",
    choices: [
      "AWS DataSync",
      "AWS Snowball Edge",
      "AWS Storage Gateway",
      "Amazon S3 Outposts"
    ],
    correctAnswer: 2,
    explanation: "AWS Storage Gateway provides hybrid cloud storage, integrating on-premises environments with AWS storage. File Gateway presents S3 as NFS/SMB shares with local caching. Volume Gateway provides iSCSI block storage backed by S3/EBS. Tape Gateway replaces physical tape libraries. All maintain local caches for low-latency on-premises access."
  },
  {
    id: 473,
    domain: "Cloud Technology and Services",
    question: "A company needs to create and send 5 million personalized marketing emails per day. They want to handle bounces, complaints, and unsubscribes automatically, and need high deliverability with dedicated IPs. Which AWS service provides managed email sending at scale?",
    choices: [
      "Amazon SNS",
      "Amazon SES (Simple Email Service)",
      "Amazon Pinpoint",
      "Amazon WorkMail"
    ],
    correctAnswer: 1,
    explanation: "Amazon SES (Simple Email Service) is a cloud-based email sending service for transactional and marketing email at scale. It handles bounce and complaint processing, supports dedicated IPs for reputation management, provides sending statistics and deliverability dashboards, and integrates with other AWS services for event processing."
  },
  {
    id: 474,
    domain: "Cloud Technology and Services",
    question: "A company wants to set up a managed Kubernetes environment on AWS with minimal operational overhead. They don't want to manage the Kubernetes control plane, etcd, or master nodes. They still want to choose whether worker nodes run on EC2 or Fargate. Which service provides managed Kubernetes?",
    choices: [
      "Amazon ECS",
      "Amazon EKS (Elastic Kubernetes Service)",
      "AWS App Runner",
      "Amazon EC2 with kubeadm"
    ],
    correctAnswer: 1,
    explanation: "Amazon EKS is a fully managed Kubernetes service where AWS manages the control plane (API server, etcd, master nodes) and handles upgrades and patching. You manage worker nodes — choosing EC2 (for full control) or Fargate (for serverless, no node management). EKS is fully conformant Kubernetes, so existing tools and manifests work."
  },
  {
    id: 475,
    domain: "Cloud Technology and Services",
    question: "A company needs to provide SFTP access to external partners so they can upload files directly to Amazon S3. The partners use standard SFTP clients and cannot change their workflow to use S3 APIs or the AWS CLI. Which service provides managed SFTP endpoints backed by S3?",
    choices: [
      "Amazon S3 with a public endpoint",
      "AWS Transfer Family (SFTP)",
      "AWS DataSync with SFTP source",
      "An EC2 instance running an SFTP server"
    ],
    correctAnswer: 1,
    explanation: "AWS Transfer Family provides fully managed file transfer endpoints supporting SFTP, FTPS, and FTP protocols, backed by Amazon S3 or EFS. External partners connect using their standard SFTP clients with no changes, and files land directly in S3 — eliminating the need to manage SFTP server infrastructure."
  },
  {
    id: 476,
    domain: "Cloud Technology and Services",
    question: "A company wants to deploy a simple web API for an internal tool that processes 1,000 requests per day. The API calls are short-lived (under 100ms), and the team doesn't want to manage containers, servers, or pay for idle compute time. Which is the most cost-effective deployment option?",
    choices: [
      "A dedicated EC2 t3.micro instance",
      "Amazon ECS on Fargate with minimum task count of 1",
      "AWS Lambda with API Gateway",
      "Amazon Lightsail VPS"
    ],
    correctAnswer: 2,
    explanation: "For 1,000 short requests per day with no idle-time cost requirements, Lambda + API Gateway is the most cost-effective option. Lambda charges per invocation and millisecond of execution — 1,000 daily 100ms invocations costs fractions of a cent. EC2, Fargate, and Lightsail all charge for idle time even when no requests are being processed."
  },
  {
    id: 477,
    domain: "Cloud Technology and Services",
    question: "A company migrated their on-premises Oracle database to Amazon RDS for Oracle. Six months later, they want to evaluate migrating to Amazon Aurora PostgreSQL to reduce licensing costs. During evaluation, they need the Aurora database to stay synchronized with RDS Oracle while they test application compatibility. Which service handles ongoing replication between heterogeneous databases?",
    choices: [
      "AWS Schema Conversion Tool only",
      "AWS Database Migration Service (DMS) with CDC (Change Data Capture)",
      "Amazon S3 data transfer",
      "RDS read replica across engine types"
    ],
    correctAnswer: 1,
    explanation: "AWS DMS with Change Data Capture (CDC) continuously replicates ongoing changes from a source database to a target, even across different engine types (heterogeneous migration). This keeps Aurora PostgreSQL in sync with RDS Oracle during testing, allowing a near-zero-downtime cutover when the team is ready."
  },
  {
    id: 478,
    domain: "Cloud Technology and Services",
    question: "A company wants to quickly deploy containerized applications without managing infrastructure, clusters, or scaling policies. Developers push code to a repository, and the service should automatically build the container, deploy it, and scale it based on traffic — fully managed end-to-end. Which AWS service provides this?",
    choices: [
      "Amazon EKS",
      "Amazon ECS on Fargate",
      "AWS App Runner",
      "AWS Elastic Beanstalk"
    ],
    correctAnswer: 2,
    explanation: "AWS App Runner is a fully managed service that automatically builds and deploys containerized web applications and APIs from source code or container images. It handles all infrastructure, scaling, load balancing, and TLS certificates — developers just push code and App Runner handles everything else, making it the simplest container deployment option."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 479,
    domain: "Billing, Pricing and Support",
    question: "A company runs a mixed workload: 5 EC2 instances running 24/7 for a steady-state production database (predictable), and 20 instances that run only during business hours for batch processing (variable schedule). Which purchasing strategy optimizes cost for BOTH workload types?",
    choices: [
      "All Spot Instances for maximum savings",
      "All On-Demand Instances for maximum flexibility",
      "Reserved Instances for the 5 steady-state instances, On-Demand or Scheduled for the 20 batch instances",
      "All Reserved Instances with partial upfront payment"
    ],
    correctAnswer: 2,
    explanation: "Matching purchase type to workload pattern: steady-state 24/7 workloads benefit from Reserved Instances (up to 72% savings for predictable usage). Variable batch workloads that run on schedule don't run enough hours to justify RI commitments — On-Demand or Spot Instances (if interruption-tolerant) are more cost-effective."
  },
  {
    id: 480,
    domain: "Billing, Pricing and Support",
    question: "A company is new to AWS and wants real-time guidance while architecting their solution to avoid costly mistakes — like accidentally leaving development instances running 24/7, using oversized instance types, or missing free tier resources. Which AWS service provides real-time cost and usage recommendations?",
    choices: [
      "AWS Personal Health Dashboard",
      "AWS Trusted Advisor",
      "AWS Cost Explorer",
      "AWS Pricing Calculator"
    ],
    correctAnswer: 1,
    explanation: "AWS Trusted Advisor provides real-time guidance across cost optimization, security, fault tolerance, performance, and service limits. Its cost optimization checks identify underutilized EC2 instances, idle load balancers, unassociated Elastic IPs, and RDS instances — helping new AWS users avoid common costly mistakes."
  },
  {
    id: 481,
    domain: "Billing, Pricing and Support",
    question: "A large enterprise has a Technical Account Manager (TAM) from AWS. The TAM proactively reaches out each quarter with architectural recommendations, alerts them to relevant new service launches, and helps plan their cloud strategy. Which AWS Support plan provides a designated TAM?",
    choices: [
      "Business Support",
      "Developer Support",
      "Enterprise Support or Enterprise On-Ramp Support",
      "Basic Support with add-on TAM service"
    ],
    correctAnswer: 2,
    explanation: "A designated Technical Account Manager (TAM) is available only with Enterprise Support and Enterprise On-Ramp Support. The TAM provides proactive guidance, architectural reviews, advocacy within AWS, and ongoing strategic relationship management. Business Support provides access to Cloud Support Engineers but no dedicated TAM."
  }
];

questions.push(...newQuestions);

fs.writeFileSync(file, JSON.stringify(questions, null, 2));
console.log(`Done. Total questions: ${questions.length}`);
console.log(`New questions added: ${newQuestions.length} (IDs ${newQuestions[0].id}-${newQuestions[newQuestions.length-1].id})`);

const batchDist = [0,0,0,0];
newQuestions.forEach(q => batchDist[q.correctAnswer]++);
console.log('Batch answer distribution:', batchDist);

const dist = [0,0,0,0];
questions.forEach(q => dist[q.correctAnswer]++);
console.log('Overall answer distribution:', dist);

const dc = {};
questions.forEach(q => { dc[q.domain] = (dc[q.domain]||0) + 1; });
console.log('Domain counts:', dc);

const scenario = questions.filter(q => q.id >= 257).length;
console.log(`Scenario questions: ${scenario}/${questions.length} (${Math.round(scenario/questions.length*100)}%)`);
