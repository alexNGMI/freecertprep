const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 657,
    domain: "Cloud Concepts",
    question: "A company runs a stateless web application on EC2. During a hardware failure, the instance terminates and Auto Scaling launches a replacement in another AZ within 2 minutes. Users experience a brief interruption but the application recovers automatically. Which reliability characteristic does this demonstrate?",
    choices: [
      "High availability — the system is always accessible with zero interruption",
      "Fault tolerance — the system continues operating despite the failure with zero interruption",
      "Resiliency — the system recovers quickly from failure, minimizing impact",
      "Durability — the system's data survives hardware failure"
    ],
    correctAnswer: 2,
    explanation: "Resiliency is the ability to recover from disruptions and return to a functional state quickly. The 2-minute recovery isn't zero-downtime (which would be fault tolerance) or always-on (high availability) — it's a resilient system that detects failure and self-heals rapidly. Resilient architectures minimize the blast radius and recovery time of failures."
  },
  {
    id: 658,
    domain: "Cloud Concepts",
    question: "A company stores critical data in Amazon S3 Standard. S3 is designed for 99.999999999% (11 nines) durability, meaning the probability of losing a single object in a year is astronomically low. S3 achieves this by automatically replicating data across a minimum of 3 AZs. Which characteristic does this describe?",
    choices: [
      "Availability — the data is always accessible",
      "Durability — the data is protected against loss",
      "Performance — the data is retrieved quickly",
      "Elasticity — the storage scales automatically"
    ],
    correctAnswer: 1,
    explanation: "Durability measures the likelihood that stored data will not be lost. S3's 99.999999999% durability means if you store 10 million objects, you can expect to lose one object every 10,000 years. This is achieved by redundantly storing data across at least 3 AZs. Durability (data not lost) is different from availability (data accessible when requested)."
  },
  {
    id: 659,
    domain: "Cloud Concepts",
    question: "An architect is reviewing an application that stores session state locally on EC2 instances. When Auto Scaling terminates an instance, all session data is lost and users must re-login. The architect recommends externalizing session state to ElastiCache Redis so instances become interchangeable. What design principle is being applied?",
    choices: [
      "Design for vertical scaling",
      "Design stateless components so any instance can handle any request",
      "Design for single-AZ deployment",
      "Design for maximum instance size"
    ],
    correctAnswer: 1,
    explanation: "Stateless design means no single instance holds unique data that would be lost if that instance fails. By externalizing session state to ElastiCache, any EC2 instance can serve any user request — instances become interchangeable, disposable, and horizontally scalable. This is a foundational cloud architecture principle that enables Auto Scaling and fault tolerance."
  },
  {
    id: 660,
    domain: "Cloud Concepts",
    question: "A company's architect explains the AWS global infrastructure hierarchy to new team members: 'AWS has geographic areas (________), each containing isolated data center groups (________), connected to caching locations worldwide (________) for content delivery.' Fill in the blanks in order.",
    choices: [
      "Availability Zones, Regions, Local Zones",
      "Regions, Availability Zones, Edge locations",
      "Edge locations, Regions, Availability Zones",
      "Data centers, Regions, Wavelength Zones"
    ],
    correctAnswer: 1,
    explanation: "AWS's global infrastructure hierarchy: Regions are geographic areas (e.g., us-east-1, eu-west-1). Each Region contains multiple Availability Zones (isolated data center groups with independent power/networking). Edge locations (400+) are caching endpoints worldwide used by CloudFront and Route 53 for low-latency content delivery."
  },
  {
    id: 661,
    domain: "Cloud Concepts",
    question: "A company currently over-provisions their infrastructure by 50% to handle unpredictable spikes. Their CFO complains this wastes money 90% of the time. On AWS, they can use Auto Scaling to maintain exactly the capacity needed at any moment. Which economic benefit does right-sizing through Auto Scaling provide?",
    choices: [
      "Eliminates all infrastructure costs",
      "Converts variable demand into fixed costs",
      "Matches infrastructure spend precisely to actual demand, eliminating the cost of idle over-provisioned capacity",
      "Guarantees the lowest possible per-unit pricing"
    ],
    correctAnswer: 2,
    explanation: "Auto Scaling continuously adjusts capacity to match actual demand — no more paying for 50% idle capacity during normal periods. When demand spikes, capacity scales out automatically. When it drops, capacity scales in. The result: infrastructure cost tracks closely with actual utilization, eliminating the waste inherent in static over-provisioning."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 662,
    domain: "Security and Compliance",
    question: "A company's application on EC2 needs to read configuration parameters at startup — feature flags, endpoint URLs, and non-sensitive settings. These are NOT secrets (not passwords or API keys), just plain configuration values. Which AWS service is the most cost-effective choice for storing non-sensitive configuration parameters?",
    choices: [
      "AWS Secrets Manager ($0.40 per secret per month)",
      "AWS Systems Manager Parameter Store Standard tier (free for standard parameters)",
      "Amazon S3 configuration file",
      "Hardcoded in application code"
    ],
    correctAnswer: 1,
    explanation: "Systems Manager Parameter Store Standard tier stores configuration parameters for free (up to 10,000 parameters, 4 KB max per parameter). It supports versioning, IAM access control, and integrates with EC2, Lambda, and ECS. For non-sensitive config values (feature flags, URLs), Parameter Store Standard is the right choice — Secrets Manager's rotation features and cost are unnecessary."
  },
  {
    id: 663,
    domain: "Security and Compliance",
    question: "A company's security team wants to enforce that all S3 buckets created in their organization must have server-side encryption enabled, versioning turned on, and Block Public Access configured. They want non-compliant buckets detected within 1 hour and automatically remediated. Which service provides this continuous compliance with auto-remediation?",
    choices: [
      "AWS Trusted Advisor with email alerts",
      "Amazon GuardDuty S3 protection",
      "AWS Config rules with automatic remediation actions via Systems Manager Automation",
      "AWS CloudTrail with Lambda triggers"
    ],
    correctAnswer: 2,
    explanation: "AWS Config evaluates resources against rules continuously (typically within 1 hour of a configuration change). When an S3 bucket is detected without encryption, versioning, or Block Public Access, Config marks it non-compliant and triggers a remediation action — a Systems Manager Automation document that automatically enables the missing settings."
  },
  {
    id: 664,
    domain: "Security and Compliance",
    question: "A company runs a public-facing API on API Gateway. They want to allow only requests that include a valid API key in the header — rejecting requests without a key. This isn't for authentication (identifying who the caller is) but for controlling access and enabling usage tracking per client. Which API Gateway feature provides this?",
    choices: [
      "IAM authorization",
      "Cognito user pool authorizer",
      "API Gateway API keys with usage plans",
      "Lambda authorizer"
    ],
    correctAnswer: 2,
    explanation: "API Gateway API keys with usage plans control access and track usage per client. You create an API key for each client, associate it with a usage plan (defining throttling limits and quota), and require the key in the x-api-key header. This enables per-client rate limiting and usage analytics — but note: API keys are for access control and tracking, not authentication."
  },
  {
    id: 665,
    domain: "Security and Compliance",
    question: "A company wants to ensure that their AWS account cannot be used to launch resources in certain AWS Regions — specifically, they want to deny all actions in ap-east-1, me-south-1, and af-south-1 (Regions they don't use) to reduce their attack surface. Which control prevents any resource creation in those Regions?",
    choices: [
      "IAM policy on each user denying those Regions",
      "Service Control Policy (SCP) denying all actions in the specified Regions",
      "AWS Config rule detecting resources in unused Regions",
      "VPC configuration limiting Region access"
    ],
    correctAnswer: 1,
    explanation: "An SCP with a Deny statement conditioned on aws:RequestedRegion for ap-east-1, me-south-1, and af-south-1 prevents any principal in the account from creating resources in those Regions — regardless of their IAM permissions. This is a common security hardening practice: reduce the attack surface by restricting activity to only the Regions you actually use."
  },
  {
    id: 666,
    domain: "Security and Compliance",
    question: "A company's EC2 instances run in private subnets and access the internet through a NAT gateway for software updates. The security team wants to restrict outbound internet access to only approved domains (e.g., *.amazonaws.com, *.ubuntu.com for updates) and block all other outbound traffic. Which service provides domain-based outbound filtering?",
    choices: [
      "Security groups with domain-based rules",
      "Network ACLs with domain filtering",
      "AWS Network Firewall with domain-based stateful rules",
      "Route 53 Resolver DNS Firewall"
    ],
    correctAnswer: 2,
    explanation: "AWS Network Firewall supports stateful rules with domain-based filtering — allowing traffic only to approved FQDNs (*.amazonaws.com, *.ubuntu.com) and blocking everything else. Security groups and NACLs only filter by IP address, not domain name. Network Firewall deployed in the inspection path between private subnets and the NAT gateway enforces this domain-level policy."
  },
  {
    id: 667,
    domain: "Security and Compliance",
    question: "A company wants to block DNS queries from their VPC to known malicious domains — preventing malware on EC2 instances from resolving C2 server addresses. They want to use DNS-level filtering without deploying additional infrastructure. Which AWS service provides managed DNS-layer threat protection?",
    choices: [
      "Amazon GuardDuty",
      "AWS Network Firewall",
      "Amazon Route 53 Resolver DNS Firewall",
      "AWS WAF"
    ],
    correctAnswer: 2,
    explanation: "Route 53 Resolver DNS Firewall filters DNS queries from your VPC, blocking resolution of known malicious domains. It uses managed domain lists (from AWS threat intelligence) and custom allow/deny lists. When malware attempts to resolve a C2 domain, DNS Firewall blocks the query — preventing the connection at the DNS layer before any network traffic occurs."
  },
  {
    id: 668,
    domain: "Security and Compliance",
    question: "A company wants to run automated penetration tests against their web application's security. They want to test for the OWASP Top 10 vulnerabilities (SQL injection, XSS, broken authentication, etc.) on a regular schedule without hiring external pentesters. Which approach provides automated web application security testing on AWS?",
    choices: [
      "Amazon Inspector scans web application code",
      "AWS WAF in detection-only mode",
      "Third-party DAST (Dynamic Application Security Testing) tools from AWS Marketplace, or Amazon Inspector for network reachability",
      "AWS Shield Advanced vulnerability scanning"
    ],
    correctAnswer: 2,
    explanation: "For automated web application penetration testing (OWASP Top 10), third-party DAST tools from AWS Marketplace (like Burp Suite, OWASP ZAP, Qualys) perform dynamic security testing against running applications. Amazon Inspector handles infrastructure-level scanning (CVEs, network reachability) but doesn't test application logic for OWASP vulnerabilities."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 669,
    domain: "Cloud Technology and Services",
    question: "A company has a legacy application that uses a Microsoft SQL Server database with features specific to SQL Server (linked servers, SQL Agent jobs, SSIS packages). They want to move to AWS but cannot change database engines due to these dependencies. Which AWS service supports running SQL Server with full feature compatibility?",
    choices: [
      "Amazon Aurora",
      "Amazon RDS for SQL Server",
      "Amazon DynamoDB",
      "Amazon Redshift"
    ],
    correctAnswer: 1,
    explanation: "Amazon RDS for SQL Server is a fully managed relational database running Microsoft SQL Server. It supports SQL Server features including SQL Agent jobs, linked servers, native backups, and many SSIS packages. AWS handles patching, backups, and Multi-AZ failover while maintaining SQL Server compatibility — the managed path for SQL Server workloads that can't change engines."
  },
  {
    id: 670,
    domain: "Cloud Technology and Services",
    question: "A company's application generates 100 GB of log data per day. They need to retain logs for 90 days and search them within that window. After 90 days, logs should be archived for 7 years at the lowest possible cost. Which S3 lifecycle strategy implements this tiered retention?",
    choices: [
      "Store everything in S3 Standard forever",
      "S3 Standard for 90 days → S3 Lifecycle rule transitions to Glacier Deep Archive after 90 days → expiration after 7 years",
      "S3 One Zone-IA for 90 days → delete after 90 days",
      "S3 Intelligent-Tiering for the full 7 years"
    ],
    correctAnswer: 1,
    explanation: "S3 Lifecycle rules automate this tiered storage: objects start in S3 Standard (or Standard-IA) for the 90-day active window where they're searchable. After 90 days, a lifecycle rule transitions them to Glacier Deep Archive (lowest-cost class at ~$1/TB/month). After 7 years from creation, an expiration rule permanently deletes them. This optimizes cost at each stage."
  },
  {
    id: 671,
    domain: "Cloud Technology and Services",
    question: "A company wants to process S3 operations in bulk — copying 50 million objects to another bucket, changing the storage class of all objects older than 1 year, and restoring 10,000 objects from Glacier. Doing this object-by-object via the API would take weeks. Which S3 feature handles these large-scale batch operations?",
    choices: [
      "S3 Replication",
      "S3 Batch Operations",
      "S3 Lifecycle policies",
      "AWS DataSync"
    ],
    correctAnswer: 1,
    explanation: "S3 Batch Operations performs large-scale batch actions across billions of objects with a single request. It supports copying objects, changing storage class, invoking Lambda per object, restoring from Glacier, applying Object Lock settings, and more. You provide a manifest (from S3 Inventory) and Batch Operations processes all objects — handling retries, tracking, and reporting."
  },
  {
    id: 672,
    domain: "Cloud Technology and Services",
    question: "A company runs an application that needs to read and write to a file system concurrently from both their on-premises servers and EC2 instances in AWS. The file system must be accessible via NFS from both environments simultaneously. Which AWS service provides this hybrid-accessible file system?",
    choices: [
      "Amazon EBS",
      "Amazon S3",
      "Amazon EFS with AWS Direct Connect or VPN connectivity",
      "Amazon FSx for Windows"
    ],
    correctAnswer: 2,
    explanation: "Amazon EFS supports NFS access from both EC2 instances and on-premises servers (via Direct Connect or VPN). On-premises servers mount the EFS file system using standard NFS clients over the hybrid connection, and EC2 instances mount it normally. This provides a single shared file system accessible concurrently from both environments."
  },
  {
    id: 673,
    domain: "Cloud Technology and Services",
    question: "A company needs to convert speech from their recorded customer service calls (stored as audio files in S3) into text transcripts. They need speaker separation (identifying which speaker said what), custom vocabulary for industry-specific terms, and automatic punctuation. Which AWS service provides this batch audio transcription?",
    choices: [
      "Amazon Polly",
      "Amazon Comprehend",
      "Amazon Transcribe",
      "Amazon Lex"
    ],
    correctAnswer: 2,
    explanation: "Amazon Transcribe converts speech to text with support for batch transcription (processing audio files from S3), speaker diarization (identifying different speakers), custom vocabulary (industry-specific terms and acronyms), and automatic punctuation. It's designed for call analytics, meeting transcription, and media captioning use cases."
  },
  {
    id: 674,
    domain: "Cloud Technology and Services",
    question: "A company wants to implement a dead letter queue pattern. When their main SQS queue's consumers fail to process a message after 3 attempts, the message should automatically move to a separate queue for investigation rather than being retried indefinitely or lost. Which SQS feature handles this?",
    choices: [
      "SQS long polling",
      "SQS dead-letter queue (DLQ) with a redrive policy setting maxReceiveCount to 3",
      "SQS FIFO queue ordering",
      "SQS visibility timeout extension"
    ],
    correctAnswer: 1,
    explanation: "An SQS dead-letter queue (DLQ) with a redrive policy automatically moves messages that fail processing after a specified number of attempts (maxReceiveCount = 3) to a separate DLQ. This prevents poison messages from blocking the main queue while preserving them for investigation. SQS also supports redrive to source — moving investigated messages back to the original queue."
  },
  {
    id: 675,
    domain: "Cloud Technology and Services",
    question: "A company wants to deploy a fully managed relational database that is compatible with both MySQL and PostgreSQL, provides up to 5x throughput of standard MySQL, automatically scales storage, and replicates data 6 ways across 3 AZs. Which service provides this?",
    choices: [
      "Amazon RDS for MySQL",
      "Amazon RDS for PostgreSQL",
      "Amazon Aurora",
      "Amazon Redshift"
    ],
    correctAnswer: 2,
    explanation: "Amazon Aurora is AWS's cloud-native relational database compatible with MySQL and PostgreSQL. It delivers up to 5x MySQL throughput and 3x PostgreSQL throughput, automatically scales storage up to 128 TB, replicates data 6 ways across 3 AZs for high availability, and supports up to 15 low-latency read replicas. It combines open-source compatibility with enterprise-grade performance."
  },
  {
    id: 676,
    domain: "Cloud Technology and Services",
    question: "A company's application uses DynamoDB and experiences sudden, unpredictable traffic spikes — 10x normal read/write capacity for 5-minute bursts. They don't want to over-provision capacity for peaks or manually adjust capacity. Which DynamoDB capacity mode handles this automatically?",
    choices: [
      "DynamoDB provisioned capacity with auto scaling",
      "DynamoDB on-demand capacity mode",
      "DynamoDB reserved capacity",
      "DynamoDB global tables"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB on-demand capacity mode instantly accommodates workload traffic as it ramps up or down — handling 10x spikes without pre-provisioning. You pay per read/write request with no capacity planning. On-demand is ideal for unpredictable, spiky workloads. Provisioned mode with auto-scaling works too but adjusts more slowly and may not handle instantaneous 10x bursts."
  },
  {
    id: 677,
    domain: "Cloud Technology and Services",
    question: "A company wants to automate the creation of EC2 AMIs with specific software pre-installed and security hardening applied. They need a pipeline that: starts with a base Amazon Linux AMI, installs packages, applies CIS hardening scripts, runs security validation tests, and outputs a golden AMI. Which AWS service automates this image pipeline?",
    choices: [
      "AWS Systems Manager Patch Manager",
      "EC2 Image Builder",
      "AWS CloudFormation",
      "Amazon Inspector"
    ],
    correctAnswer: 1,
    explanation: "EC2 Image Builder automates the creation, testing, and distribution of AMIs (and container images). You define a pipeline: source base image → install components (packages, agents) → apply hardening (CIS benchmarks) → run tests (validate configuration) → output and distribute the golden AMI to specified Regions/accounts. Pipelines run on a schedule or on-demand."
  },
  {
    id: 678,
    domain: "Cloud Technology and Services",
    question: "A company needs to process a high volume of ETL jobs transforming data between different formats and loading it into their data warehouse. Some jobs run hourly, others daily. They want a fully managed, serverless ETL service that generates Python/Scala code automatically based on visual data flow definitions. Which service provides this?",
    choices: [
      "Amazon EMR",
      "Amazon Athena",
      "AWS Glue Studio with visual ETL",
      "Amazon Kinesis Data Firehose"
    ],
    correctAnswer: 2,
    explanation: "AWS Glue Studio provides a visual interface for creating ETL jobs — you define data sources, transformations, and targets visually, and Glue automatically generates the underlying PySpark or Scala code. Jobs run serverlessly on Glue's managed Spark infrastructure with scheduling, monitoring, and retry capabilities built in."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 679,
    domain: "Billing, Pricing and Support",
    question: "A company has 3 AWS accounts in an Organization with consolidated billing. Account A has a 1-year Reserved Instance for m5.large that runs 24/7. Account A terminates that instance. Account B is running an identical m5.large On-Demand instance. What happens to the RI discount?",
    choices: [
      "The RI discount is lost — it only applies to Account A",
      "The RI discount automatically applies to Account B's matching instance through consolidated billing RI sharing",
      "The RI discount refunds the remaining term",
      "Account B must manually request the RI transfer"
    ],
    correctAnswer: 1,
    explanation: "With consolidated billing in AWS Organizations, Reserved Instance discounts are shared across all member accounts by default. When Account A's matching instance is terminated, the RI discount automatically floats to Account B's identical m5.large instance — no manual action needed. This RI sharing maximizes discount utilization across the organization."
  },
  {
    id: 680,
    domain: "Billing, Pricing and Support",
    question: "A company is evaluating the total cost of an EC2-based workload. Beyond the EC2 instance cost itself, which additional AWS charges should they account for in their cost estimate?",
    choices: [
      "Only the EC2 instance hourly rate — everything else is included",
      "EC2 instance cost + EBS storage + data transfer out + Elastic IP (if allocated but unattached) + CloudWatch detailed monitoring (if enabled)",
      "EC2 cost + a mandatory support fee",
      "EC2 cost + VPC charges per subnet"
    ],
    correctAnswer: 1,
    explanation: "A complete EC2 cost estimate includes: instance compute charges (hourly/second), EBS volume storage and IOPS, data transfer out to internet (per GB), Elastic IPs (free when attached to a running instance, charged when unattached), and CloudWatch detailed monitoring ($3.50/instance/month if enabled). VPCs and subnets themselves are free; the resources inside them are not."
  },
  {
    id: 681,
    domain: "Billing, Pricing and Support",
    question: "A startup is bootstrapping on AWS with a small team. They need basic cloud support — the ability to open support cases for billing questions and account issues — but don't need technical support for production workloads. Which AWS Support plan meets this need at no additional cost?",
    choices: [
      "Developer Support ($29/month minimum)",
      "Business Support ($100/month minimum)",
      "Basic Support (free — included with all AWS accounts)",
      "Enterprise On-Ramp Support"
    ],
    correctAnswer: 2,
    explanation: "Basic Support is free and included with every AWS account. It provides 24/7 access to customer service for billing and account questions, AWS documentation and whitepapers, limited Trusted Advisor checks, and the AWS Health Dashboard. For startups not yet running production workloads, Basic Support covers essential account and billing support at zero cost."
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
