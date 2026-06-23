const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 482,
    domain: "Cloud Concepts",
    question: "A company's RTO (Recovery Time Objective) is 4 hours and RPO (Recovery Point Objective) is 1 hour. They want a disaster recovery strategy where AWS resources are pre-configured but minimally running — just enough to quickly scale up if the primary site fails. Which DR strategy fits this requirement at the lowest cost?",
    choices: [
      "Multi-site active/active",
      "Warm standby",
      "Pilot light",
      "Backup and restore"
    ],
    correctAnswer: 2,
    explanation: "Pilot light keeps a minimal version of your environment running in AWS — typically just the core database replicating from the primary site — with other resources configured but stopped. In a disaster, you start and scale the stopped resources. It's faster than backup/restore, cheaper than warm standby, and meets a 4-hour RTO."
  },
  {
    id: 483,
    domain: "Cloud Concepts",
    question: "A financial trading firm requires near-zero downtime and sub-minute failover. Their DR strategy runs a fully operational, scaled copy of production in a second AWS Region at all times. Traffic is routed to both Regions simultaneously, and if one fails, Route 53 shifts all traffic to the healthy Region in seconds. Which DR strategy does this describe?",
    choices: [
      "Pilot light",
      "Backup and restore",
      "Warm standby",
      "Multi-site active/active"
    ],
    correctAnswer: 3,
    explanation: "Multi-site active/active (or hot standby) runs full production capacity in two or more Regions simultaneously. Both sites serve live traffic, so failover is near-instantaneous — Route 53 health checks detect a Regional failure and shift traffic within seconds. This provides the lowest RTO/RPO but at the highest cost."
  },
  {
    id: 484,
    domain: "Cloud Concepts",
    question: "A startup is building a new SaaS product. Their CTO wants to follow the Well-Architected Framework from day one. They decide to use AWS managed services (RDS, SQS, Lambda) instead of self-managing databases and message brokers on EC2. Which sustainability and operational benefit does this choice provide?",
    choices: [
      "Managed services are always cheaper than self-managed EC2",
      "AWS managed services offload undifferentiated heavy lifting, letting the team focus on product differentiation",
      "Managed services automatically comply with all regulations",
      "Managed services eliminate all operational costs"
    ],
    correctAnswer: 1,
    explanation: "Using managed services means AWS handles patching, backups, scaling, and high availability for databases, queues, and compute — tasks that don't differentiate the product. The team's engineering effort focuses entirely on building the SaaS features customers pay for, accelerating development and reducing operational burden."
  },
  {
    id: 485,
    domain: "Cloud Concepts",
    question: "A company architect reads that AWS data centers achieve a Power Usage Effectiveness (PUE) of approximately 1.2, compared to the industry average of 1.5+. By migrating to AWS, the same compute workload uses significantly less energy. Which aspect of cloud computing does this represent?",
    choices: [
      "Economies of scale in purchasing power",
      "On-demand self-service provisioning",
      "Greater environmental efficiency through infrastructure sharing and AWS's data center optimization",
      "Reduced software licensing costs"
    ],
    correctAnswer: 2,
    explanation: "AWS achieves higher energy efficiency than most enterprise data centers through purpose-built hardware, advanced cooling, and optimized facility design. When thousands of companies share this efficient infrastructure rather than each running their own data center, the collective carbon footprint is significantly lower — a sustainability benefit of public cloud."
  },
  {
    id: 486,
    domain: "Cloud Concepts",
    question: "A company needs to deploy an application in a country where AWS does not have a Region, but latency requirements mean users cannot connect to the nearest Region. They need AWS infrastructure physically located in that country within an existing data center. Which AWS infrastructure option enables this?",
    choices: [
      "AWS Local Zones",
      "AWS Wavelength Zones",
      "AWS Outposts",
      "AWS Edge Locations"
    ],
    correctAnswer: 2,
    explanation: "AWS Outposts delivers AWS compute and storage hardware to any customer-specified location — including countries without an AWS Region. The company installs Outposts racks in their local data center, runs AWS services locally, and connects to the nearest Region for management. It's the only option for AWS infrastructure in arbitrary locations."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 487,
    domain: "Security and Compliance",
    question: "A company has a central network security team that wants to deploy and manage AWS WAF rules, Shield Advanced protections, and security groups centrally across all 30 AWS accounts in their organization — ensuring consistent policies without requiring each account team to configure security independently. Which service enables this centralized security management?",
    choices: [
      "AWS Security Hub",
      "Amazon GuardDuty",
      "AWS Firewall Manager",
      "AWS Control Tower"
    ],
    correctAnswer: 2,
    explanation: "AWS Firewall Manager allows a central security administrator to configure and deploy AWS WAF rules, Shield Advanced protections, security groups, and Network Firewall policies across all accounts in an AWS Organization from a single place. New accounts automatically inherit the security policies — ensuring consistent protection fleet-wide."
  },
  {
    id: 488,
    domain: "Security and Compliance",
    question: "A company wants to share a custom Amazon Machine Image (AMI) securely with a partner company's AWS account without making it publicly available. The partner needs to launch EC2 instances from this AMI in their own account. How should the company share the AMI?",
    choices: [
      "Upload the AMI to S3 and share the bucket with the partner",
      "Make the AMI public in the AWS Marketplace",
      "Modify the AMI permissions to add the partner account ID as an explicit allowed account",
      "Export the AMI and email it to the partner"
    ],
    correctAnswer: 2,
    explanation: "AMI sharing allows you to specify which AWS account IDs can use a private AMI to launch instances. The AMI remains private (not publicly visible) but the specified partner account can launch EC2 instances from it in their own account. If the AMI is encrypted, you must also share the KMS key with the partner account."
  },
  {
    id: 489,
    domain: "Security and Compliance",
    question: "A company's S3 bucket accidentally had public access enabled for 48 hours before being caught. The security team needs to determine exactly which files were accessed, by whom, and from which IP addresses during that window. Which AWS feature provides S3 object-level access logs?",
    choices: [
      "AWS CloudTrail data events for S3",
      "Amazon S3 server access logging",
      "Amazon GuardDuty S3 protection",
      "Both A and B provide this information"
    ],
    correctAnswer: 3,
    explanation: "Both CloudTrail data events (when enabled for S3) and S3 server access logging capture object-level access. CloudTrail provides structured JSON logs with requester identity, while S3 server access logs provide detailed web-server-style logs. CloudTrail is better for identifying who accessed objects via IAM identity; S3 server logs capture all HTTP-level requests including anonymous access."
  },
  {
    id: 490,
    domain: "Security and Compliance",
    question: "A company wants to allow a third-party security vendor to audit their AWS resources in a read-only capacity. The vendor has their own AWS account. The company wants to grant access without creating IAM users or sharing long-term credentials. What is the AWS-recommended approach?",
    choices: [
      "Create an IAM user with read-only access and share the credentials",
      "Make all resources public for the vendor to audit",
      "Create an IAM role with read-only permissions and a trust policy allowing the vendor's AWS account to assume it",
      "Export all resource configurations to S3 and share the bucket"
    ],
    correctAnswer: 2,
    explanation: "Cross-account IAM roles are the standard for third-party access. Create a role with read-only policies (like SecurityAudit managed policy) and a trust policy that allows the vendor's account ID to call sts:AssumeRole. The vendor assumes the role using their own credentials and receives temporary read-only access — no credentials to share or rotate."
  },
  {
    id: 491,
    domain: "Security and Compliance",
    question: "A healthcare company processes patient records on AWS. They must sign a Business Associate Agreement (BAA) with AWS before storing any PHI (Protected Health Information). They also need documentation confirming which AWS services are HIPAA-eligible. Where should they obtain the BAA and HIPAA documentation?",
    choices: [
      "AWS Trusted Advisor",
      "AWS Artifact",
      "AWS Security Hub",
      "AWS Config"
    ],
    correctAnswer: 1,
    explanation: "AWS Artifact provides both the HIPAA Business Associate Agreement (BAA) — which can be accepted directly in the console — and documentation about which AWS services are covered under the BAA (HIPAA-eligible services). Accepting the BAA in Artifact is the required step before processing PHI on AWS."
  },
  {
    id: 492,
    domain: "Security and Compliance",
    question: "A company's security scan identifies that several EC2 instances are running software with critical CVEs (Common Vulnerabilities and Exposures) that have public exploits available. The security team needs to prioritize remediation based on exploit availability and severity. Which service surfaces these findings with prioritization context?",
    choices: [
      "Amazon Macie",
      "Amazon GuardDuty",
      "Amazon Inspector",
      "AWS Trusted Advisor"
    ],
    correctAnswer: 2,
    explanation: "Amazon Inspector continuously scans EC2 instances and container images for software vulnerabilities. It correlates findings with the CVSS score, exploit availability (from threat intelligence feeds), and reachability to network — providing a risk score that helps teams prioritize the most dangerous vulnerabilities for immediate remediation."
  },
  {
    id: 493,
    domain: "Security and Compliance",
    question: "A company runs workloads in a VPC and wants to protect against network-layer threats like port scanning, protocol anomalies, and known malicious IP communication — at the VPC level, not just at individual instances. They need a stateful, managed network firewall with deep packet inspection. Which AWS service provides this?",
    choices: [
      "Security groups",
      "Network ACLs",
      "AWS Network Firewall",
      "AWS WAF"
    ],
    correctAnswer: 2,
    explanation: "AWS Network Firewall is a managed, stateful network firewall service deployed at the VPC level. It provides deep packet inspection, intrusion prevention (blocking known malicious patterns), protocol anomaly detection, and domain-based filtering — capabilities far beyond what security groups and NACLs (stateless packet filtering) offer."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 494,
    domain: "Cloud Technology and Services",
    question: "A company has separate AWS accounts for development, staging, and production. They have a shared VPC infrastructure account containing common networking resources. They want EC2 instances in the dev/staging/prod accounts to be able to launch into subnets owned by the central network account. Which AWS feature enables this?",
    choices: [
      "VPC peering between each account",
      "AWS Transit Gateway with multiple VPC attachments",
      "AWS Resource Access Manager (RAM) sharing subnets from the network account",
      "AWS PrivateLink from each account to the network account"
    ],
    correctAnswer: 2,
    explanation: "AWS Resource Access Manager (RAM) allows you to share AWS resources across accounts within an organization. Sharing VPC subnets from a central network account enables EC2 instances in other accounts to launch into those shared subnets — implementing a hub-and-spoke network model without complex VPC peering or duplicating networking infrastructure."
  },
  {
    id: 495,
    domain: "Cloud Technology and Services",
    question: "A media company ingests 500 GB of video metadata per day from 10,000 content partners. The data arrives in different formats (JSON, CSV, XML) and needs to be converted to Parquet format, compressed, and delivered to S3 for analytics. They need a fully managed, serverless pipeline with no ETL code to maintain. Which service handles this?",
    choices: [
      "Amazon Kinesis Data Firehose",
      "Amazon Kinesis Data Streams",
      "AWS Glue Studio",
      "Amazon EMR"
    ],
    correctAnswer: 0,
    explanation: "Amazon Kinesis Data Firehose is a fully managed service that captures, transforms, and delivers streaming data to S3, Redshift, OpenSearch, and other destinations. It can convert formats (JSON to Parquet/ORC), compress data, and buffer/batch delivery — all without writing any ETL code or managing infrastructure."
  },
  {
    id: 496,
    domain: "Cloud Technology and Services",
    question: "A company wants to provide their analysts with an interactive business intelligence dashboard to visualize sales trends, create charts, and share reports — all from data stored in Amazon Redshift and S3. They need a fully managed BI service that requires no servers to manage. Which AWS service provides this?",
    choices: [
      "Amazon Athena",
      "Amazon QuickSight",
      "AWS Glue",
      "Amazon EMR"
    ],
    correctAnswer: 1,
    explanation: "Amazon QuickSight is a fully managed, serverless business intelligence service. It connects to data sources like Redshift, S3, RDS, and Athena to create interactive dashboards, visualizations, and ML-powered insights (anomaly detection, forecasting). Analysts access it via browser with no infrastructure to manage."
  },
  {
    id: 497,
    domain: "Cloud Technology and Services",
    question: "A company needs an immutable ledger database to record the complete history of all changes to their supply chain data — who changed what, when, and in what sequence. The ledger must be cryptographically verifiable so that no record can be altered or deleted. Which AWS database service provides this?",
    choices: [
      "Amazon DynamoDB with DynamoDB Streams",
      "Amazon QLDB (Quantum Ledger Database)",
      "Amazon RDS with audit logging",
      "Amazon Timestream"
    ],
    correctAnswer: 1,
    explanation: "Amazon QLDB is a fully managed ledger database with a built-in, immutable journal. Every change is recorded sequentially and cryptographically chained using SHA-256 hashes — making it mathematically verifiable that no record has been altered or deleted after the fact. It's purpose-built for audit trails, supply chain, and financial transaction records."
  },
  {
    id: 498,
    domain: "Cloud Technology and Services",
    question: "A company stores backups, database snapshots, and EBS volumes across multiple AWS services. They need a centralized policy to automate backup scheduling, retention, and cross-Region copy for all these resource types from a single console. Which AWS service provides centralized backup management?",
    choices: [
      "AWS Storage Gateway",
      "Amazon S3 Lifecycle policies",
      "AWS Backup",
      "AWS DataSync"
    ],
    correctAnswer: 2,
    explanation: "AWS Backup provides a fully managed, centralized backup service that automates backup of EBS volumes, RDS databases, DynamoDB tables, EFS file systems, S3 buckets, EC2 instances, and more. You define backup plans with schedules and retention policies in one place, and AWS Backup handles execution, including cross-Region copies for DR."
  },
  {
    id: 499,
    domain: "Cloud Technology and Services",
    question: "A company needs to process IoT sensor data from 100,000 devices in real time. Each device sends readings every second. The data must be ingested, filtered for anomalies, and routed to different downstream systems (S3 for storage, Lambda for alerts, Kinesis for streaming). Which service handles IoT device connectivity and message routing at this scale?",
    choices: [
      "Amazon Kinesis Data Streams",
      "Amazon SQS",
      "AWS IoT Core",
      "Amazon EventBridge"
    ],
    correctAnswer: 2,
    explanation: "AWS IoT Core is a managed cloud platform that connects IoT devices at scale using MQTT, HTTPS, and other protocols. Its rules engine evaluates incoming messages and routes them to AWS services (S3, Lambda, Kinesis, DynamoDB) based on SQL-like filters — without provisioning or managing servers for device connectivity."
  },
  {
    id: 500,
    domain: "Cloud Technology and Services",
    question: "A company's call center handles 10,000 calls per day. Agents manually log call outcomes, causing delays and errors. The company wants to replace their on-premises PBX with a cloud-based contact center that integrates with AWS AI services for real-time transcription, sentiment analysis, and CRM integration. Which AWS service provides this?",
    choices: [
      "Amazon Chime",
      "Amazon Connect",
      "Amazon WorkSpaces",
      "Amazon Lex"
    ],
    correctAnswer: 1,
    explanation: "Amazon Connect is a cloud-based contact center service that enables customer service at scale. It integrates natively with AWS AI services (Transcribe for real-time transcription, Comprehend for sentiment analysis, Lex for chatbots) and connects to CRM systems — replacing on-premises PBX with a fully managed, pay-per-minute cloud contact center."
  },
  {
    id: 501,
    domain: "Cloud Technology and Services",
    question: "A financial services company needs a time-series database to store billions of IoT sensor readings — each with a timestamp and multiple measurements. Queries almost always filter by time range and specific sensor IDs. They need sub-second query performance on recent data and cost-effective storage for historical data. Which purpose-built AWS database serves this?",
    choices: [
      "Amazon DynamoDB",
      "Amazon RDS for PostgreSQL",
      "Amazon Timestream",
      "Amazon Redshift"
    ],
    correctAnswer: 2,
    explanation: "Amazon Timestream is a fully managed time-series database purpose-built for IoT and operational data. It automatically stores recent data in memory for fast queries and moves older data to a cost-optimized magnetic store — with time-series-specific functions built in. It handles trillions of time-stamped records with sub-second query performance."
  },
  {
    id: 502,
    domain: "Cloud Technology and Services",
    question: "A company has remote employees who need to access a Windows desktop environment with specific enterprise software, but their personal laptops don't meet the hardware requirements. The company wants to provide managed virtual desktops accessible from any device without managing VDI infrastructure. Which AWS service provides this?",
    choices: [
      "Amazon AppStream 2.0",
      "Amazon WorkSpaces",
      "AWS Client VPN",
      "Amazon EC2 Windows instances"
    ],
    correctAnswer: 1,
    explanation: "Amazon WorkSpaces is a fully managed, persistent cloud desktop service (DaaS). Users access their Windows or Linux virtual desktop from any device — laptop, tablet, or thin client — while the company manages the desktop fleet centrally without running VDI servers. Applications and data stay in AWS, not on the endpoint device."
  },
  {
    id: 503,
    domain: "Cloud Technology and Services",
    question: "A company needs to stream specific enterprise applications (like AutoCAD or a legacy trading platform) to users' web browsers without installing anything on their devices. The applications run in the cloud and only pixels are sent to the browser. Which AWS service provides this application streaming?",
    choices: [
      "Amazon WorkSpaces",
      "Amazon AppStream 2.0",
      "AWS Client VPN",
      "Amazon WorkDocs"
    ],
    correctAnswer: 1,
    explanation: "Amazon AppStream 2.0 streams desktop applications to a web browser without requiring installation on the end user's device. The application runs on AWS, and only the display (pixels) is streamed to the browser. Unlike WorkSpaces (which provides a full persistent desktop), AppStream 2.0 delivers specific applications to any HTML5 browser."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 504,
    domain: "Billing, Pricing and Support",
    question: "A company has been running AWS workloads for 18 months and wants to review their architecture for cost inefficiencies. They have EC2 instances running at 5% average CPU, RDS instances that are idle overnight, and S3 buckets with data that hasn't been accessed in over a year. Which AWS tool generates specific, prioritized recommendations to reduce spending on each of these issues?",
    choices: [
      "AWS Cost Explorer rightsizing recommendations",
      "AWS Trusted Advisor cost optimization checks",
      "AWS Compute Optimizer",
      "AWS Trusted Advisor and AWS Compute Optimizer combined"
    ],
    correctAnswer: 3,
    explanation: "Both tools are needed: AWS Trusted Advisor identifies idle RDS instances, underutilized EC2 instances, and S3 cost issues. AWS Compute Optimizer uses ML to recommend right-sized instance types based on actual utilization data. Together they provide comprehensive cost optimization recommendations — Trusted Advisor for broader resource checks, Compute Optimizer for detailed compute rightsizing."
  },
  {
    id: 505,
    domain: "Billing, Pricing and Support",
    question: "A company purchases software through AWS Marketplace and wants to understand how Marketplace charges appear on their bill. They also want to know if Marketplace purchases qualify for consolidated billing across their AWS Organization. Which statement accurately describes AWS Marketplace billing?",
    choices: [
      "AWS Marketplace charges appear on a separate bill from AWS service charges",
      "AWS Marketplace software charges appear on the AWS bill alongside other AWS charges and are included in consolidated billing across AWS Organizations",
      "AWS Marketplace software is always free — vendors charge separately outside AWS",
      "AWS Marketplace purchases cannot be used with Reserved Instances or Savings Plans"
    ],
    correctAnswer: 1,
    explanation: "AWS Marketplace charges are included directly on your AWS invoice alongside EC2, S3, and other service charges. When using AWS Organizations with consolidated billing, Marketplace charges from member accounts roll up to the management account's bill — simplifying procurement and payment for third-party software."
  },
  {
    id: 506,
    domain: "Billing, Pricing and Support",
    question: "A company is approaching AWS service limits (quotas) — they're near the default limit of 5 Elastic IPs per Region and 20 On-Demand instances per Region. Before launching a new product that requires more resources, they need to request limit increases. Which AWS service lets them view current quotas and request increases?",
    choices: [
      "AWS Trusted Advisor",
      "AWS Budgets",
      "AWS Service Quotas",
      "AWS Support Center ticket"
    ],
    correctAnswer: 2,
    explanation: "AWS Service Quotas provides a centralized view of all service limits (quotas) for your account across all AWS services and Regions. You can view current quota values, usage percentages, and request quota increases directly from the console or API — without navigating to each service individually or always opening a support ticket."
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
