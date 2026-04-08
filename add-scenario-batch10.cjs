const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 507,
    domain: "Cloud Concepts",
    question: "A company is re-evaluating their cloud strategy. Their legal team argues that storing data in a third-party (AWS) data center means they lose control over it. Their cloud architect responds that customers retain full ownership of their data, can encrypt it with keys AWS never sees, and can delete it at any time. Which cloud principle supports the architect's position?",
    choices: [
      "AWS retains co-ownership of customer data for billing purposes",
      "Customers own their data — AWS provides infrastructure but has no rights to access customer content without permission",
      "AWS can access customer data for security scanning purposes",
      "Data ownership transfers to AWS under the shared responsibility model"
    ],
    correctAnswer: 1,
    explanation: "Under AWS's data ownership policy, customers own their content. AWS provides infrastructure and has contractual obligations not to access customer data without consent. Customers can encrypt data with keys AWS never accesses (using CloudHSM or client-side encryption), retaining full data sovereignty even in a third-party data center."
  },
  {
    id: 508,
    domain: "Cloud Concepts",
    question: "A company is choosing between deploying in a single large AWS Region with multiple AZs versus deploying across two Regions. The workload requires 99.99% availability. A single-Region multi-AZ deployment provides 99.99% availability. Multi-Region adds complexity and cost. When would multi-Region be necessary?",
    choices: [
      "Multi-Region is always required for 99.99% availability",
      "Multi-Region is necessary when the SLA requires surviving a complete Regional outage, not just AZ failures",
      "Multi-Region is only needed for global user bases",
      "Single AZ is sufficient for 99.99% availability"
    ],
    correctAnswer: 1,
    explanation: "Multi-AZ within a single Region protects against individual data center failures and provides 99.99%+ availability for most workloads. Multi-Region becomes necessary when the SLA must survive a complete Regional outage (extremely rare, but possible) or when regulations require geographic data separation. The added complexity/cost must be justified by the specific requirement."
  },
  {
    id: 509,
    domain: "Cloud Concepts",
    question: "A startup's founder says: 'With AWS, we can build and test a new product hypothesis in a week, measure results, and either scale it or kill it — something that would have taken 6 months and $500K with physical servers.' Which fundamental cloud advantage is the founder describing?",
    choices: [
      "Fault tolerance",
      "Economies of scale",
      "Agility — the ability to experiment, innovate, and iterate rapidly at low cost",
      "High availability"
    ],
    correctAnswer: 2,
    explanation: "Cloud agility means the time and cost to experiment has dropped from months/millions to days/dollars. Teams can provision entire environments, test hypotheses, and decommission failures without massive capital investment. This dramatically accelerates the innovation cycle and lowers the cost of being wrong — a transformational advantage over physical infrastructure."
  },
  {
    id: 510,
    domain: "Cloud Concepts",
    question: "A company architect diagrams their application: users → Route 53 → CloudFront → ALB → EC2 (multiple AZs) → RDS Multi-AZ → S3. Each layer has redundancy built in. The architect says 'even if we lose an entire AZ, users won't notice.' Which architectural concept describes this design?",
    choices: [
      "Vertical scaling",
      "Loosely coupled monolith",
      "Highly available, fault-tolerant, multi-AZ architecture",
      "Serverless architecture"
    ],
    correctAnswer: 2,
    explanation: "This architecture achieves high availability and fault tolerance through multi-AZ redundancy at every tier. Route 53 has health checks, CloudFront has multiple edge PoPs, ALB distributes across AZs, EC2 Auto Scaling replaces failed instances, RDS Multi-AZ provides synchronous standby, and S3 replicates across AZs automatically — no single AZ failure causes downtime."
  },
  {
    id: 511,
    domain: "Cloud Concepts",
    question: "A company migrating to AWS notices that they no longer need to negotiate hardware contracts 12-18 months in advance, purchase excess capacity 'just in case,' or maintain relationships with hardware vendors. Which cloud characteristic eliminates these procurement challenges?",
    choices: [
      "Broad network access",
      "Resource pooling",
      "On-demand self-service with measured service",
      "Rapid elasticity"
    ],
    correctAnswer: 2,
    explanation: "On-demand self-service means customers can provision computing resources (servers, storage, networking) as needed, automatically, without human interaction with the provider. Combined with measured (pay-per-use) service, this eliminates long procurement cycles, excess capacity purchasing, and vendor negotiations — resources are available instantly at known per-unit costs."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 512,
    domain: "Security and Compliance",
    question: "A company wants to restrict which AWS services their developers can use. The security team allows EC2, S3, and RDS but wants to prevent any use of AI/ML services or IoT services in the development account. Which mechanism enforces these service-level restrictions at the account level?",
    choices: [
      "IAM permission boundaries on each developer's user",
      "AWS Config rules for unsupported services",
      "Service Control Policies (SCPs) denying access to disallowed services",
      "CloudWatch alarms detecting unauthorized service usage"
    ],
    correctAnswer: 2,
    explanation: "SCPs in AWS Organizations are the correct tool for account-level service restrictions. A Deny SCP for services like SageMaker, Rekognition, or IoT Core prevents ANY principal in the account from using those services — regardless of what IAM policies allow. SCPs are preventive controls that apply organization-wide."
  },
  {
    id: 513,
    domain: "Security and Compliance",
    question: "A company's EC2 instances in a private subnet need to download OS patches from the internet, but must not be directly reachable from the internet. They've set up a NAT gateway. However, the security team also wants to inspect and log all outbound traffic from the private subnet before it reaches the NAT gateway. Which service provides this outbound traffic inspection?",
    choices: [
      "AWS WAF on the NAT gateway",
      "Security groups on the NAT gateway",
      "AWS Network Firewall deployed in the inspection path between private subnet and NAT gateway",
      "VPC Flow Logs on the private subnet"
    ],
    correctAnswer: 2,
    explanation: "AWS Network Firewall can be deployed in-line in the traffic flow between the private subnet and the NAT gateway. Traffic routes through the firewall for inspection, logging, and filtering before reaching the NAT gateway. VPC Flow Logs captures metadata but doesn't inspect or block traffic; WAF is for HTTP/S at Layer 7."
  },
  {
    id: 514,
    domain: "Security and Compliance",
    question: "A company's root account email address is the personal email of the original founder, who has since left the company. The security team needs to secure this critical account. Which actions are MOST important to take immediately?",
    choices: [
      "Create a new AWS account and migrate all resources",
      "Change the root account email to a corporate alias, enable MFA on root, and store root credentials in a secure vault",
      "Delete all IAM users and use only the root account going forward",
      "Contact AWS Support to have them reset the root credentials"
    ],
    correctAnswer: 1,
    explanation: "The most critical immediate steps: change root email to a corporate distribution list (not an individual's email), enable MFA with a hardware device stored in a secure vault, generate and immediately delete any root access keys, and document the secure storage location. Root credentials should never belong to an individual who might leave the company."
  },
  {
    id: 515,
    domain: "Security and Compliance",
    question: "A company uses a third-party identity provider (Okta) for all employee authentication. They want employees to access the AWS Management Console using their Okta credentials via SAML 2.0 federation — without AWS IAM users. How does this work in AWS?",
    choices: [
      "Okta replaces IAM entirely and manages all AWS permissions",
      "AWS creates temporary IAM users for each Okta login session",
      "SAML 2.0 federation: Okta authenticates the user, sends a SAML assertion to AWS, which exchanges it for temporary credentials tied to an IAM role",
      "AWS Directory Service syncs all Okta users as IAM users automatically"
    ],
    correctAnswer: 2,
    explanation: "SAML 2.0 federation allows existing identity providers like Okta to authenticate users for AWS access. The flow: user logs into Okta → Okta sends a signed SAML assertion to AWS → AWS STS exchanges it for temporary credentials mapped to a pre-configured IAM role → user accesses the console with those scoped temporary credentials. No permanent IAM users needed."
  },
  {
    id: 516,
    domain: "Security and Compliance",
    question: "A company's compliance team requires that all AWS API activity for their production account be stored in a centralized, read-only logging account. Even account administrators in the production account should not be able to delete or modify these logs. Which architecture achieves this?",
    choices: [
      "Enable CloudTrail in the production account with log file validation",
      "Enable CloudTrail in production, deliver logs to an S3 bucket in a separate logging account with a bucket policy that denies DeleteObject and PutObject from the production account",
      "Use CloudWatch Logs in the production account with a 7-year retention policy",
      "Configure AWS Config to snapshot all API activity to a separate account"
    ],
    correctAnswer: 1,
    explanation: "Sending CloudTrail logs to a dedicated logging account S3 bucket is the AWS best practice for immutable audit logs. The bucket policy denies production account principals (even admins) from modifying or deleting logs. The logging account is managed by the security team independently — providing true separation of the logs from the account being audited."
  },
  {
    id: 517,
    domain: "Security and Compliance",
    question: "An application generates sensitive reports stored in S3. Only specific IAM roles should be able to access these files. A developer noticed they can access the files despite having no S3 IAM policies. Investigation reveals the S3 bucket has a resource-based policy granting access. Which statement accurately describes how this access was granted?",
    choices: [
      "Resource-based policies (bucket policies) can grant access independently of IAM identity policies — access is allowed if either the identity policy OR the resource policy allows it (within same account)",
      "This is a bug — S3 bucket policies cannot override IAM denies",
      "The developer must have an implicit IAM policy inherited from their department",
      "S3 bucket policies only work for cross-account access, not within the same account"
    ],
    correctAnswer: 0,
    explanation: "AWS access evaluation: within the same account, access is granted if EITHER the identity-based policy OR the resource-based policy allows the action (and neither explicitly denies it). The S3 bucket policy granting the developer's role access is sufficient — even without an IAM identity policy. This is why bucket policies must be carefully reviewed."
  },
  {
    id: 518,
    domain: "Security and Compliance",
    question: "A company wants to detect if any EC2 instances in their account are communicating with known command-and-control (C2) servers, cryptocurrency mining pools, or Tor exit nodes. These would indicate a compromised instance. Which AWS service automatically detects these network-level threat indicators?",
    choices: [
      "Amazon Inspector",
      "AWS Config",
      "Amazon GuardDuty",
      "Amazon Macie"
    ],
    correctAnswer: 2,
    explanation: "Amazon GuardDuty analyzes VPC Flow Logs and DNS logs against AWS threat intelligence feeds containing known malicious IPs, domains, and patterns. It automatically generates findings for suspicious network activity like communication with C2 servers, cryptocurrency mining endpoints, or Tor exit nodes — indicating potentially compromised instances."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 519,
    domain: "Cloud Technology and Services",
    question: "A company has a legacy application that requires a Windows shared drive (CIFS/SMB) accessible from hundreds of Windows EC2 instances. The file system must be highly available, integrate with Active Directory for access control, and support billions of small files. Which AWS service is the best fit?",
    choices: [
      "Amazon EFS",
      "Amazon S3",
      "Amazon FSx for Windows File Server",
      "Amazon EBS Multi-Attach"
    ],
    correctAnswer: 2,
    explanation: "Amazon FSx for Windows File Server provides fully managed Windows file shares built on Windows Server. It supports SMB/CIFS protocol, NTFS, Active Directory integration, DFS Namespaces, and high availability with Multi-AZ deployment — designed specifically for Windows workloads requiring shared file storage with AD-based access control."
  },
  {
    id: 520,
    domain: "Cloud Technology and Services",
    question: "A genomics research company needs to process 10,000 parallel compute jobs, each analyzing a different patient's DNA sequencing data. Jobs are independent and can take 30 minutes to 4 hours each. They need fully managed job scheduling, queue management, and compute provisioning without building their own HPC infrastructure. Which service is purpose-built for this?",
    choices: [
      "AWS Lambda",
      "Amazon ECS",
      "AWS Batch",
      "Amazon EMR"
    ],
    correctAnswer: 2,
    explanation: "AWS Batch is a fully managed service for batch computing workloads. It dynamically provisions EC2 or Spot Instances, manages job queues, handles dependencies and retries, and scales compute to match queue depth — ideal for embarrassingly parallel workloads like genomics where thousands of independent jobs run concurrently."
  },
  {
    id: 521,
    domain: "Cloud Technology and Services",
    question: "A company wants to give their data scientists a managed environment to collaboratively develop and run Jupyter notebooks, share datasets, and track machine learning experiments — without managing EC2 instances or Jupyter server infrastructure. Which AWS service provides managed Jupyter notebooks for data science?",
    choices: [
      "Amazon EMR Notebooks",
      "Amazon SageMaker Studio",
      "AWS Glue Studio",
      "Amazon QuickSight"
    ],
    correctAnswer: 1,
    explanation: "Amazon SageMaker Studio is an integrated development environment (IDE) for machine learning. It provides managed Jupyter notebooks, collaborative data exploration, experiment tracking, model training visualization, and deployment tools — all in a fully managed environment without provisioning or managing any compute infrastructure."
  },
  {
    id: 522,
    domain: "Cloud Technology and Services",
    question: "A company runs a multi-tier application and wants to maintain strict separation between environments (dev, staging, production) while sharing some infrastructure. They want each environment in its own AWS account for billing and security isolation. Which AWS feature allows them to manage all accounts centrally while keeping workloads isolated?",
    choices: [
      "Multiple IAM users with environment-specific permissions in one account",
      "VPC peering between environment VPCs in one account",
      "AWS Organizations with separate accounts per environment",
      "AWS Config rules to tag resources by environment"
    ],
    correctAnswer: 2,
    explanation: "AWS Organizations with separate accounts per environment (dev, staging, prod) provides the strongest isolation: separate billing, independent IAM policies, distinct resource limits, and blast-radius containment. A mistake in dev cannot accidentally affect prod resources. SCPs provide centralized governance across all accounts simultaneously."
  },
  {
    id: 523,
    domain: "Cloud Technology and Services",
    question: "A company needs to analyze clickstream data from their e-commerce website in real time to show customers personalized product recommendations as they browse. Data arrives at 50,000 events per second and must be processed with under 500ms latency. Which AWS service is designed for real-time stream processing at this scale?",
    choices: [
      "Amazon S3 with Athena queries",
      "Amazon Kinesis Data Analytics",
      "AWS Glue ETL jobs",
      "Amazon Redshift scheduled queries"
    ],
    correctAnswer: 1,
    explanation: "Amazon Kinesis Data Analytics (for Apache Flink) processes streaming data in real time using SQL or Java/Python/Scala. It can analyze 50,000 events/second with millisecond latency — far faster than batch solutions like Athena, Glue ETL, or Redshift scheduled queries, which introduce minutes to hours of delay."
  },
  {
    id: 524,
    domain: "Cloud Technology and Services",
    question: "A company wants to deploy a containerized application and needs it running within 10 minutes with no infrastructure setup, automatic HTTPS, and built-in auto-scaling based on request volume. The team consists of developers with no DevOps experience. Which AWS service provides the fastest path from container image to production URL?",
    choices: [
      "Amazon EKS with managed node groups",
      "Amazon ECS on Fargate with ALB",
      "AWS App Runner",
      "AWS Elastic Beanstalk with Docker"
    ],
    correctAnswer: 2,
    explanation: "AWS App Runner is the fastest path from container image to production. You provide a container image (or source code), and App Runner automatically builds, deploys, scales, and provides a HTTPS URL — typically within minutes. No EKS clusters, ECS task definitions, ALBs, or auto-scaling configuration required. Ideal for developer teams without DevOps expertise."
  },
  {
    id: 525,
    domain: "Cloud Technology and Services",
    question: "A company stores clickstream events in Amazon S3 as JSON files. Their data team wants to run ad-hoc SQL queries like 'SELECT product_id, COUNT(*) FROM clicks WHERE date > 2024-01-01 GROUP BY product_id' without loading data into a database first. Which service executes this query directly against S3?",
    choices: [
      "Amazon Redshift",
      "Amazon RDS",
      "Amazon Athena",
      "AWS Glue"
    ],
    correctAnswer: 2,
    explanation: "Amazon Athena executes standard SQL queries directly against data stored in S3 — no data loading, no database setup. It uses a schema-on-read approach, inferring structure at query time. You pay only per TB of data scanned. For ad-hoc analysis of S3-resident data, Athena is the fastest and most cost-effective option."
  },
  {
    id: 526,
    domain: "Cloud Technology and Services",
    question: "A company's RDS database is experiencing performance issues due to a sudden spike in read traffic from a new reporting feature. They want to add read capacity without any downtime, changes to the primary database, or application rewrites. Which RDS feature provides additional read capacity?",
    choices: [
      "RDS Multi-AZ failover",
      "RDS Read Replicas",
      "RDS storage autoscaling",
      "RDS Proxy"
    ],
    correctAnswer: 1,
    explanation: "RDS Read Replicas create one or more read-only copies of the primary database using asynchronous replication. Read traffic can be directed to replicas, distributing the load. Read Replicas can be created with no downtime to the primary database, and up to 5 replicas are supported per RDS instance (15 for Aurora)."
  },
  {
    id: 527,
    domain: "Cloud Technology and Services",
    question: "A company has a Lambda function that makes thousands of short-lived database connections per minute, causing the RDS database to exhaust its connection limit. Each Lambda invocation opens and closes connections rapidly, overwhelming the database. Which AWS service resolves this connection management problem?",
    choices: [
      "RDS Multi-AZ deployment",
      "RDS Read Replicas",
      "Amazon RDS Proxy",
      "Amazon ElastiCache"
    ],
    correctAnswer: 2,
    explanation: "Amazon RDS Proxy is a fully managed database proxy that pools and shares established database connections. Lambda functions connect to RDS Proxy instead of directly to the database — Proxy maintains a pool of persistent connections to RDS, dramatically reducing connection overhead. This solves the Lambda connection storm problem without changing application code."
  },
  {
    id: 528,
    domain: "Cloud Technology and Services",
    question: "A company processes financial transactions and needs to ensure that each transaction is processed exactly once — even if the processing Lambda function is invoked multiple times due to retries. The message queue must guarantee exactly-once processing. Which SQS queue type provides this guarantee?",
    choices: [
      "SQS Standard Queue",
      "SQS FIFO Queue with content-based deduplication",
      "SQS Standard Queue with visibility timeout",
      "Amazon MQ with persistent delivery"
    ],
    correctAnswer: 1,
    explanation: "SQS FIFO (First-In-First-Out) queues provide exactly-once processing through message deduplication. With content-based deduplication enabled, SQS generates a hash of the message body and deduplicates identical messages within a 5-minute window — ensuring a transaction message is delivered and processed exactly once, even if sent multiple times."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 529,
    domain: "Billing, Pricing and Support",
    question: "A company's engineering team is experimenting with AWS services and accidentally left several large EC2 instances, NAT gateways, and Elastic Load Balancers running over a holiday weekend. The bill was $12,000 more than expected. Going forward, they want automatic notification when daily spending exceeds $500. How should they configure this?",
    choices: [
      "Enable AWS Cost Explorer and check it daily",
      "Create an AWS Budget with a daily budget of $500 and an alert at 100% of actual cost",
      "Set up CloudWatch billing alarm at $500",
      "Enable Trusted Advisor cost checks with email notifications"
    ],
    correctAnswer: 1,
    explanation: "AWS Budgets supports daily budget periods with configurable alert thresholds. Creating a daily budget of $500 with an actual cost alert at 100% sends an immediate notification (via email or SNS) when daily spending hits $500 — before costs spiral. CloudWatch billing alarms work at the monthly level, not daily."
  },
  {
    id: 530,
    domain: "Billing, Pricing and Support",
    question: "A company wants to purchase Reserved Instances but isn't sure which instance type they'll need in 6 months — they might need to change from m5 to r5 family as their workload evolves. They want RI discounts with the flexibility to change instance families. Which RI option provides this?",
    choices: [
      "Standard Reserved Instances",
      "Convertible Reserved Instances",
      "Scheduled Reserved Instances",
      "Compute Savings Plans"
    ],
    correctAnswer: 1,
    explanation: "Convertible Reserved Instances allow you to exchange them for a different RI with equal or greater value — including changing instance family (m5 to r5), OS, or tenancy. The discount is smaller than Standard RIs (up to 54% vs 72%) but the flexibility to adapt to changing workload requirements makes Convertible RIs appropriate when the future instance type is uncertain."
  },
  {
    id: 531,
    domain: "Billing, Pricing and Support",
    question: "A company receives their AWS invoice and wants to understand why their bill increased 40% last month. They need to drill down by service, see which specific resources contributed most to the increase, and compare to the previous month. Which AWS tool provides this investigative cost analysis capability?",
    choices: [
      "AWS Budgets",
      "AWS Cost Explorer",
      "AWS Pricing Calculator",
      "AWS Cost and Usage Report"
    ],
    correctAnswer: 1,
    explanation: "AWS Cost Explorer provides an interactive interface to visualize and analyze costs and usage over time. You can filter by service, account, tag, and Region; compare time periods (this month vs last month); drill into specific services to identify the resources driving cost increases; and view usage trends — making it the right tool for investigative cost analysis."
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
