const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 532,
    domain: "Cloud Concepts",
    question: "A company architect is designing a data processing pipeline. Rather than building all components tightly together, she separates them: an ingestion layer, a processing layer, and a storage layer — each independently deployable and replaceable. This way, swapping the processing engine doesn't require touching the ingestion or storage layers. Which design principle does this exemplify?",
    choices: [
      "Vertical scaling",
      "Single point of failure elimination",
      "Separation of concerns through modular, decoupled design",
      "Active-active redundancy"
    ],
    correctAnswer: 2,
    explanation: "Separation of concerns means dividing a system into distinct components, each responsible for a specific function. Modular, decoupled design allows each layer to be developed, scaled, and replaced independently. This reduces complexity, improves maintainability, and is a foundational principle of both the Well-Architected Framework and cloud-native architecture."
  },
  {
    id: 533,
    domain: "Cloud Concepts",
    question: "A company is deciding how much infrastructure to provision for a new application launch. In the past, they over-provisioned by 40% to handle unexpected peaks, wasting money. On AWS, their architect says they can start small, monitor actual usage, and scale out in minutes if demand exceeds expectations. Which cloud advantage makes this possible?",
    choices: [
      "Reserved capacity guarantees",
      "The ability to stop guessing capacity and scale dynamically based on actual demand",
      "Fixed monthly pricing regardless of usage",
      "Geographic redundancy across Regions"
    ],
    correctAnswer: 1,
    explanation: "'Stop guessing capacity' means you provision only what you need now and scale programmatically as demand grows. Combined with elastic scaling (Auto Scaling, Lambda), you can grow from 2 to 200 instances in minutes. This eliminates the choice between over-provisioning (wasted money) and under-provisioning (performance issues)."
  },
  {
    id: 534,
    domain: "Cloud Concepts",
    question: "A company has a workload with variable CPU demand — sometimes 10%, sometimes 80%. They want to measure performance efficiency: are they using the right resource types and sizes to meet workload requirements at optimal cost? Which Well-Architected pillar guides this evaluation?",
    choices: [
      "Reliability",
      "Operational Excellence",
      "Security",
      "Performance Efficiency"
    ],
    correctAnswer: 3,
    explanation: "The Performance Efficiency pillar focuses on using computing resources efficiently to meet system requirements and maintaining that efficiency as demand changes and technologies evolve. Key practices include selecting the right resource types (compute, storage, database) and sizes for workloads, monitoring performance, and adapting as workloads evolve."
  },
  {
    id: 535,
    domain: "Cloud Concepts",
    question: "A company's developer accidentally deleted the production database. Post-incident analysis reveals there were no automated backups, no point-in-time recovery, and the same IAM credentials used for development had full production database access. Which two Well-Architected pillars were most violated?",
    choices: [
      "Cost Optimization and Sustainability",
      "Performance Efficiency and Operational Excellence",
      "Reliability (no backups/recovery) and Security (excessive IAM permissions)",
      "Operational Excellence and Performance Efficiency"
    ],
    correctAnswer: 2,
    explanation: "Two pillars failed: Reliability — no automated backups or point-in-time recovery means no way to recover from data loss, violating the 'plan for failure and recover from failure' principle. Security — developer credentials with production database access violates least privilege. Both failures contributed to an unrecoverable incident."
  },
  {
    id: 536,
    domain: "Cloud Concepts",
    question: "A non-profit organization with a limited IT budget wants to run a website and donor management system. They need compute, database, and networking — but can't afford upfront hardware investment. A volunteer suggests AWS. Which cloud pricing model makes AWS accessible to budget-constrained organizations?",
    choices: [
      "AWS requires a 1-year upfront contract minimum",
      "Pay-as-you-go with no upfront commitments — pay only for resources consumed",
      "AWS offers only enterprise pricing tiers above $10,000/month",
      "Non-profits receive AWS services for free under all plans"
    ],
    correctAnswer: 1,
    explanation: "AWS's pay-as-you-go model has no minimum spend and no upfront commitments for On-Demand resources. A small website might cost $20-50/month. The non-profit can start with minimal spend, scale up for donor campaigns, and scale back down after — making cloud accessible to organizations of any size without capital investment."
  },

  // ===== SECURITY AND COMPLIANCE (8) =====
  {
    id: 537,
    domain: "Security and Compliance",
    question: "A company's developer pushes an update that modifies an S3 bucket policy to allow public access. Within minutes, sensitive files are accessed by external parties. Which two services, if properly configured, would have both detected this change AND alerted the team before damage occurred?",
    choices: [
      "Amazon Inspector and Amazon Macie",
      "AWS Config (detecting the bucket policy change) and Amazon GuardDuty (detecting unusual S3 access patterns)",
      "AWS CloudTrail and Amazon Rekognition",
      "AWS Trusted Advisor and Amazon Comprehend"
    ],
    correctAnswer: 1,
    explanation: "AWS Config with the 's3-bucket-public-read-prohibited' rule would have immediately flagged the bucket policy change as non-compliant — triggering an SNS alert. Amazon GuardDuty would have detected the unusual pattern of external entities accessing S3 objects, generating a 'Policy:S3/BucketPublicAccessGranted' finding. Together they provide proactive and reactive coverage."
  },
  {
    id: 538,
    domain: "Security and Compliance",
    question: "A company needs to run security assessments on their EC2 instances that check for: unintended network accessibility (open ports reachable from the internet), CVEs in installed packages, and deviations from CIS benchmark hardening guidelines. Which AWS service performs all these checks automatically?",
    choices: [
      "Amazon GuardDuty",
      "AWS Trusted Advisor",
      "Amazon Inspector",
      "AWS Security Hub"
    ],
    correctAnswer: 2,
    explanation: "Amazon Inspector performs automated security assessments covering: network reachability analysis (ports accessible from the internet), CVE scanning of OS packages and application dependencies, and CIS benchmark compliance checks. It provides prioritized findings with remediation guidance, and continuously rescans when new CVEs are published."
  },
  {
    id: 539,
    domain: "Security and Compliance",
    question: "A company's IAM policy states: 'Allow s3:GetObject on arn:aws:s3:::company-data/*' AND there is an explicit 'Deny s3:GetObject on arn:aws:s3:::company-data/confidential/*'. A user with both policies tries to access a file at 'company-data/confidential/report.pdf'. What happens?",
    choices: [
      "Access is allowed because the Allow statement covers the confidential prefix",
      "Access is denied because explicit Deny always overrides Allow",
      "Access depends on which policy was created first",
      "Access is allowed if the user is an administrator"
    ],
    correctAnswer: 1,
    explanation: "In AWS IAM policy evaluation, an explicit Deny ALWAYS overrides any Allow — regardless of other policies, administrator status, or policy creation order. The confidential/ Deny takes precedence over the broader Allow. This is the most important IAM policy evaluation rule: when in doubt, explicit Deny wins."
  },
  {
    id: 540,
    domain: "Security and Compliance",
    question: "A company discovered that a former employee's IAM user account was used to exfiltrate data 3 weeks after their departure because IT forgot to disable the account. Which process failure does this represent, and what AWS feature should be implemented to prevent recurrence?",
    choices: [
      "A network security failure — fix with stricter security groups",
      "An IAM lifecycle management failure — implement automated deprovisioning via AWS IAM Identity Center integrated with HR systems, and enable GuardDuty to detect dormant credential usage",
      "A data classification failure — fix with Amazon Macie",
      "A compliance failure — fix with AWS Artifact"
    ],
    correctAnswer: 1,
    explanation: "This is an identity lifecycle management failure. Best practices: integrate IAM Identity Center with HR systems so account deactivation triggers automatically on employee departure; use AWS Config to detect IAM users inactive for 30+ days; enable GuardDuty to alert on unusual activity from dormant credentials. Never rely solely on manual deprovisioning processes."
  },
  {
    id: 541,
    domain: "Security and Compliance",
    question: "A company receives a notification that an AWS service they use has a security vulnerability being actively exploited in the wild. They need to know if their specific resources are affected and what AWS recommends they do. Which AWS service provides this personalized operational and security guidance?",
    choices: [
      "AWS Security Hub",
      "Amazon GuardDuty",
      "AWS Health Dashboard (Personal Health Dashboard)",
      "AWS Trusted Advisor"
    ],
    correctAnswer: 2,
    explanation: "AWS Health Dashboard (Personal Health Dashboard) provides personalized alerts and remediation guidance when AWS events affect your specific resources. Unlike the general Service Health Dashboard (which shows broad outages), the Personal Health Dashboard shows events relevant to your account — including security vulnerabilities affecting services you use."
  },
  {
    id: 542,
    domain: "Security and Compliance",
    question: "A company wants to implement zero-trust network architecture. Instead of allowing broad VPC-to-VPC connectivity, they want Service A to access only Service B's specific API endpoint privately — without exposing Service B's entire VPC or requiring VPC peering. Which AWS feature enables this private, service-specific connectivity?",
    choices: [
      "VPC peering",
      "AWS Transit Gateway",
      "AWS PrivateLink",
      "AWS Direct Connect"
    ],
    correctAnswer: 2,
    explanation: "AWS PrivateLink provides private connectivity to specific services (not entire VPCs) using interface endpoints. Service B exposes a specific endpoint via PrivateLink; Service A connects to it privately through an ENI in its own VPC. Traffic never traverses the internet, and Service A can only access the specific exposed service — not Service B's entire VPC."
  },
  {
    id: 543,
    domain: "Security and Compliance",
    question: "A financial company must ensure encryption in transit for all communications between their application servers and their RDS database. They also need to verify the server certificate to prevent man-in-the-middle attacks. Which approach enforces encrypted connections to RDS?",
    choices: [
      "Enable VPC Flow Logs to monitor unencrypted traffic",
      "Deploy RDS in a private subnet",
      "Configure the application to use SSL/TLS connections to RDS and enforce SSL using a parameter group setting or IAM authentication",
      "Enable RDS Multi-AZ deployment"
    ],
    correctAnswer: 2,
    explanation: "RDS supports SSL/TLS encrypted connections for all database engines. To enforce encryption: download the RDS SSL certificate bundle, configure the application connection string to require SSL, and use an RDS parameter group to force SSL (e.g., 'require_secure_transport=ON' for MySQL). This ensures all traffic between app and database is encrypted in transit."
  },
  {
    id: 544,
    domain: "Security and Compliance",
    question: "A company uses AWS across 50 accounts. The security team wants a single dashboard showing: which accounts have GuardDuty findings, which fail CIS benchmark checks, which have unresolved Inspector vulnerabilities, and an overall security score. Which service aggregates this multi-account security posture?",
    choices: [
      "Amazon Detective",
      "AWS CloudTrail Lake",
      "AWS Security Hub with multi-account aggregation",
      "AWS Organizations compliance dashboard"
    ],
    correctAnswer: 2,
    explanation: "AWS Security Hub with multi-account aggregation (using an aggregation Region) collects security findings from GuardDuty, Inspector, Macie, and Firewall Manager across all 50 accounts. It calculates a security score against standards like CIS AWS Foundations and provides a unified multi-account security posture dashboard."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (9) =====
  {
    id: 545,
    domain: "Cloud Technology and Services",
    question: "A company needs to run a Lustre high-performance file system for their computational fluid dynamics simulations. The HPC workload requires sub-millisecond latency, hundreds of GB/s throughput, and POSIX-compliant file access. Which AWS service provides managed Lustre?",
    choices: [
      "Amazon EFS",
      "Amazon FSx for Lustre",
      "Amazon EBS with Provisioned IOPS",
      "Amazon S3 with Transfer Acceleration"
    ],
    correctAnswer: 1,
    explanation: "Amazon FSx for Lustre is a fully managed, high-performance parallel file system built on Lustre — the world's most popular HPC file system. It delivers sub-millisecond latencies and hundreds of GB/s throughput, is POSIX-compliant, and integrates natively with S3 for data import/export. It's purpose-built for HPC, ML training, and video rendering workloads."
  },
  {
    id: 546,
    domain: "Cloud Technology and Services",
    question: "A company processes satellite imagery stored in Amazon S3. Each image is 2 GB and processing takes 45 minutes. They have 10,000 images to process this week. Running this on Lambda is impossible (15-minute limit) and EC2 Auto Scaling would require complex job orchestration. Which AWS service is designed for this type of long-running batch compute job?",
    choices: [
      "AWS Lambda with increased timeout",
      "Amazon ECS on Fargate for individual jobs",
      "AWS Batch with EC2 or Spot compute environments",
      "Amazon SageMaker Processing jobs"
    ],
    correctAnswer: 2,
    explanation: "AWS Batch is designed for exactly this use case: long-running batch jobs (45 minutes, well beyond Lambda's 15-minute limit) at scale (10,000 jobs). It manages job queues, provisions EC2 or Spot Instances based on queue depth, handles retries, and scales down when complete — without you managing the compute infrastructure or job scheduling logic."
  },
  {
    id: 547,
    domain: "Cloud Technology and Services",
    question: "A company wants to send targeted push notifications to mobile users based on their behavior — users who abandoned shopping carts get a discount notification, users who haven't opened the app in 30 days get a re-engagement message. They need a managed service for user segmentation and multi-channel messaging. Which AWS service provides this?",
    choices: [
      "Amazon SNS",
      "Amazon SES",
      "Amazon Pinpoint",
      "Amazon Connect"
    ],
    correctAnswer: 2,
    explanation: "Amazon Pinpoint is a customer engagement service for targeted, multi-channel communications. It supports user segmentation based on attributes and behavior, A/B testing, campaign scheduling, and delivery across email, SMS, push notifications, and voice. Unlike SNS (infrastructure messaging) or SES (bulk email), Pinpoint is built for marketing engagement."
  },
  {
    id: 548,
    domain: "Cloud Technology and Services",
    question: "A company's microservices architecture has 15 services that each need to call several other services. Managing individual service endpoints and load balancing configurations in each service is complex and error-prone. They want a dedicated infrastructure layer that handles service discovery, load balancing, retries, circuit breaking, and observability between services. Which pattern does this describe?",
    choices: [
      "API Gateway for all inter-service communication",
      "Service mesh using AWS App Mesh",
      "Direct VPC peering between each service",
      "Amazon Route 53 for inter-service DNS"
    ],
    correctAnswer: 1,
    explanation: "AWS App Mesh is a service mesh that provides application-level networking for microservices. It manages traffic routing, retries, circuit breaking, and end-to-end visibility between services — implemented as sidecar proxies (Envoy) without changing service code. This standardizes inter-service communication across the 15 services without embedding networking logic in each."
  },
  {
    id: 549,
    domain: "Cloud Technology and Services",
    question: "A company needs a managed GraphQL API that automatically provisions the backend data sources (DynamoDB, Lambda, RDS), handles real-time subscriptions for live data updates, and provides offline data synchronization for their mobile app. Which AWS service provides managed GraphQL?",
    choices: [
      "Amazon API Gateway with REST APIs",
      "AWS AppSync",
      "Amazon Cognito",
      "Amazon EventBridge"
    ],
    correctAnswer: 1,
    explanation: "AWS AppSync is a fully managed GraphQL service that automatically connects to data sources (DynamoDB, Lambda, RDS, HTTP APIs). It natively supports real-time data subscriptions via WebSockets and offline synchronization for mobile/web clients. It's the AWS-native choice for applications requiring GraphQL APIs with real-time and offline capabilities."
  },
  {
    id: 550,
    domain: "Cloud Technology and Services",
    question: "A company's e-commerce application frequently runs the same database queries: 'Get top 100 products by category' and 'Get user's cart contents.' These queries hit the RDS database millions of times per day, consuming significant read capacity. The company wants a caching layer that stores results in memory with a TTL and requires minimal application code changes. Which approach is best?",
    choices: [
      "Add more RDS Read Replicas",
      "Migrate to DynamoDB",
      "Implement Amazon ElastiCache (Redis) as an application-level cache with TTL-based invalidation",
      "Enable RDS Performance Insights"
    ],
    correctAnswer: 2,
    explanation: "ElastiCache Redis is the standard application-level cache for RDS. The application checks Redis first; on a cache hit, the result is returned from memory (sub-millisecond). On a miss, it queries RDS and stores the result in Redis with a TTL. Setting TTLs on 'top products' and 'cart contents' queries can eliminate 90%+ of repetitive RDS reads."
  },
  {
    id: 551,
    domain: "Cloud Technology and Services",
    question: "A retail company needs real-time inventory visibility across 500 stores. Each store's POS system sends inventory updates throughout the day. The central system needs to process these updates in order — each store's updates must be processed sequentially, but updates from different stores can be processed in parallel. Which Kinesis feature enables ordered, per-store processing?",
    choices: [
      "Kinesis Data Streams with one shard per store using store ID as the partition key",
      "Kinesis Data Firehose delivering to S3",
      "Amazon SQS Standard Queue with one queue per store",
      "Amazon SNS with store-specific topics"
    ],
    correctAnswer: 0,
    explanation: "Kinesis Data Streams guarantees ordering within a shard. Using store ID as the partition key ensures all records for a given store land on the same shard — maintaining per-store order. Different stores hash to different shards and are processed in parallel. This is the standard pattern for ordered, partitioned stream processing."
  },
  {
    id: 552,
    domain: "Cloud Technology and Services",
    question: "A company stores sensitive documents in Amazon S3 and needs to allow their legal team to access specific files temporarily via a web application — without permanently granting S3 access to their IAM accounts. The access URL should expire after 1 hour. Which S3 feature enables this?",
    choices: [
      "S3 bucket policy with IP address restrictions",
      "S3 Cross-Origin Resource Sharing (CORS)",
      "S3 pre-signed URLs with 1-hour expiration",
      "S3 Access Points"
    ],
    correctAnswer: 2,
    explanation: "S3 pre-signed URLs embed temporary credentials and expiration time directly in the URL. The web application generates a pre-signed URL (valid 1 hour) using its IAM credentials and provides it to the legal team. They can download the specific file directly from S3 without needing any AWS credentials — and the link becomes invalid after 1 hour."
  },
  {
    id: 553,
    domain: "Cloud Technology and Services",
    question: "A company has hundreds of S3 buckets across 20 accounts. Different teams need different levels of access — some teams should access only specific prefixes within a bucket. Managing this with bucket policies is becoming unwieldy. Which S3 feature provides dedicated endpoints with simplified, per-team access policies?",
    choices: [
      "S3 pre-signed URLs for each team",
      "S3 Access Points",
      "S3 Replication rules",
      "S3 Object Lambda"
    ],
    correctAnswer: 1,
    explanation: "S3 Access Points provide named network endpoints attached to a bucket, each with its own access policy. Each team gets a dedicated Access Point with a policy scoped to their specific prefixes — simplifying permission management. Instead of one complex bucket policy, you have simple, focused policies per team or application."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 554,
    domain: "Billing, Pricing and Support",
    question: "A company's development team spins up EC2 instances for testing and forgets to terminate them over weekends, running up unnecessary costs. The team lead wants an automated solution that stops all development instances every Friday at 6 PM and starts them every Monday at 8 AM. Which AWS approach automates this schedule?",
    choices: [
      "Create an AWS Budget with weekend alerts",
      "AWS Instance Scheduler (solution using Lambda + EventBridge + DynamoDB) or EventBridge Scheduled Rules triggering Lambda to stop/start instances",
      "Configure Reserved Instances for weekday-only usage",
      "Enable AWS Trusted Advisor weekend monitoring"
    ],
    correctAnswer: 1,
    explanation: "EventBridge Scheduled Rules can trigger Lambda functions on a cron schedule. Two rules: one triggering a Lambda to stop tagged dev instances every Friday at 6 PM, another to start them every Monday at 8 AM. AWS also provides the Instance Scheduler solution that does exactly this. For development environments, this can reduce EC2 costs by ~60% (5 days vs 7)."
  },
  {
    id: 555,
    domain: "Billing, Pricing and Support",
    question: "A company is migrating to AWS and their CFO asks: 'What AWS charges will we pay for data that we upload to S3 from our data center, and what will we pay when our EC2 instances in the same Region read that data from S3?' Which statement correctly describes these data transfer costs?",
    choices: [
      "Both inbound and same-Region reads are free",
      "Inbound data transfer to AWS (upload to S3) is free; data transfer from S3 to EC2 within the same Region is also free",
      "Both directions are charged at $0.09/GB",
      "Uploads are free but same-Region EC2-to-S3 reads cost $0.01/GB"
    ],
    correctAnswer: 1,
    explanation: "AWS data transfer pricing: data transfer IN to AWS from the internet is always free (upload to S3 is free). Data transfer between S3 and EC2 within the same AWS Region is also free. Charges apply for: data transfer OUT to the internet, cross-Region transfers, and some cross-AZ transfers. Understanding this helps CFOs accurately model cloud networking costs."
  },
  {
    id: 556,
    domain: "Billing, Pricing and Support",
    question: "A company's cloud bill shows they are being charged for 730 hours of an m5.large EC2 instance even though the instance only ran for 100 hours this month. They are confused why they are being charged for the full month. What is the most likely explanation?",
    choices: [
      "AWS always charges for the full month regardless of usage",
      "The instance is a Reserved Instance — RI charges apply whether or not the instance runs",
      "The instance has a Dedicated Host reservation",
      "CloudWatch metrics were misconfigured showing incorrect runtime"
    ],
    correctAnswer: 1,
    explanation: "Reserved Instances are a billing construct — you commit to paying for a certain amount of compute for 1 or 3 years, whether or not you actually run an instance. If the RI isn't applied to a running instance, the charge still applies. Unused RIs represent wasted commitment — companies should match RI purchases to workloads that run continuously."
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
