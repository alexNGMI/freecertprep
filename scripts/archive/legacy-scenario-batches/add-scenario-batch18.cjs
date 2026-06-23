const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 707,
    domain: "Cloud Concepts",
    question: "A company is evaluating whether to build a custom authentication system from scratch or use Amazon Cognito. Building custom auth would take 3 months of engineering time and ongoing maintenance. Cognito provides the same functionality as a managed service. Their CTO says: 'Don't build what you can buy.' Which cloud principle does this reflect?",
    choices: [
      "Cost optimization through Reserved Instances",
      "Focus on business differentiators — use managed services for undifferentiated capabilities",
      "High availability through Multi-AZ deployment",
      "Security through defense in depth"
    ],
    correctAnswer: 1,
    explanation: "Authentication is necessary but doesn't differentiate the company's product. Building custom auth diverts engineering effort from features that create competitive advantage. Using managed services (Cognito) for undifferentiated capabilities lets the team focus 100% on business-differentiating features — a core cloud adoption principle."
  },
  {
    id: 708,
    domain: "Cloud Concepts",
    question: "A company wants to evaluate how well their current AWS architecture follows best practices. They use the AWS Well-Architected Tool to conduct a review. The tool identifies 5 high-risk issues and 12 medium-risk issues across the 6 pillars. What should the company do with these findings?",
    choices: [
      "Ignore them — the tool is only advisory",
      "Address all 17 issues simultaneously before any new development",
      "Prioritize high-risk issues for immediate remediation, create a backlog for medium-risk issues, and schedule regular re-reviews",
      "Rebuild the entire architecture from scratch"
    ],
    correctAnswer: 2,
    explanation: "The Well-Architected Review produces prioritized findings — not a mandate to fix everything immediately. Best practice: remediate high-risk issues first (they represent the greatest threat to the workload), plan medium-risk improvements in the backlog, and schedule periodic re-reviews (quarterly or after major changes) to continuously improve the architecture over time."
  },
  {
    id: 709,
    domain: "Cloud Concepts",
    question: "A company is migrating to AWS and wants to understand the total effort involved. Their migration program has three phases: Assess (discover and plan), Mobilize (build the foundation), and Migrate & Modernize (execute the migration). Which AWS framework defines these migration phases?",
    choices: [
      "AWS Well-Architected Framework",
      "AWS Cloud Adoption Framework (CAF) migration phases",
      "AWS Shared Responsibility Model",
      "The 7 Rs migration strategies"
    ],
    correctAnswer: 1,
    explanation: "The AWS Cloud Adoption Framework (CAF) defines the cloud migration journey in three phases: Assess (evaluate readiness, identify gaps, build the business case), Mobilize (set up the landing zone, build the migration team, pilot initial workloads), and Migrate & Modernize (execute at scale using the 7 Rs, optimize, and innovate). This provides the overall migration program structure."
  },
  {
    id: 710,
    domain: "Cloud Concepts",
    question: "A company runs a critical financial application. They need a design where, even if an entire Availability Zone goes offline, the application continues serving requests with NO interruption and NO data loss — true zero-downtime fault tolerance. Which architecture achieves this?",
    choices: [
      "Single EC2 instance with a large EBS volume",
      "EC2 instances across 2+ AZs behind an ALB, with RDS Multi-AZ (synchronous replication) and S3 for object storage",
      "Single-AZ deployment with automated backups to S3",
      "Lambda functions in a single AZ with DynamoDB local"
    ],
    correctAnswer: 1,
    explanation: "True fault tolerance against AZ failure requires every tier to be multi-AZ: ALB distributes traffic across AZs (unhealthy AZ targets are removed), EC2 Auto Scaling maintains instances in multiple AZs, RDS Multi-AZ synchronously replicates data to a standby in another AZ (zero data loss on failover), and S3 automatically replicates across 3+ AZs. No single AZ failure causes downtime or data loss."
  },
  {
    id: 711,
    domain: "Cloud Concepts",
    question: "A company has successfully migrated 80% of their workloads to AWS. They now want to maximize the business value of cloud by innovating: using AI/ML services to gain insights from their data, implementing serverless architectures to accelerate development, and adopting DevOps practices. Which phase of the cloud journey are they in?",
    choices: [
      "The Assess phase — evaluating cloud readiness",
      "The Mobilize phase — building the foundation",
      "The Migrate phase — moving workloads",
      "The Modernize and Innovate phase — optimizing and building new cloud-native capabilities"
    ],
    correctAnswer: 3,
    explanation: "After migration, the Modernize and Innovate phase focuses on maximizing cloud value: adopting AI/ML and analytics for business insights, re-architecting monoliths into serverless microservices, implementing CI/CD and DevOps practices, and leveraging cloud-native services that weren't possible on-premises. This is where cloud investment generates the greatest business return."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 712,
    domain: "Security and Compliance",
    question: "A company's Lambda function processes customer orders and needs to write to DynamoDB and send notifications via SNS. Following least privilege, the function's execution role should have which permissions?",
    choices: [
      "AdministratorAccess to ensure nothing fails",
      "Only dynamodb:PutItem on the specific orders table and sns:Publish on the specific notifications topic — nothing more",
      "Full DynamoDB and SNS access across all tables and topics",
      "PowerUserAccess minus IAM permissions"
    ],
    correctAnswer: 1,
    explanation: "Least privilege means granting ONLY the specific actions (PutItem, not full DynamoDB access) on the specific resources (the orders table ARN, not all tables; the notifications topic ARN, not all topics). This minimizes blast radius — if the function is compromised, the attacker can only write to one table and publish to one topic, not access the entire account's DynamoDB and SNS resources."
  },
  {
    id: 713,
    domain: "Security and Compliance",
    question: "A company wants to ensure that all their AWS accounts have a consistent set of detective and preventive security controls. Detective controls should alert when configurations drift. Preventive controls should block prohibited actions. Which AWS service provides both types of controls as pre-packaged guardrails across an organization?",
    choices: [
      "AWS Organizations with SCPs only",
      "AWS Config rules only",
      "AWS Control Tower guardrails — preventive (SCPs) and detective (Config rules) applied automatically across all accounts",
      "AWS Security Hub compliance standards only"
    ],
    correctAnswer: 2,
    explanation: "AWS Control Tower provides both guardrail types: preventive guardrails are SCPs that block prohibited actions (e.g., disabling CloudTrail, creating public S3 buckets). Detective guardrails are AWS Config rules that detect configuration drift (e.g., unencrypted EBS volumes, unrestricted SSH). Control Tower applies both types automatically to all accounts in the landing zone."
  },
  {
    id: 714,
    domain: "Security and Compliance",
    question: "A company's security architecture uses multiple layers: CloudFront with WAF at the edge, ALB with security groups at the load balancer, EC2 instances in private subnets with NACLs, and encryption at rest on RDS and S3. An attacker who bypasses one layer faces another. Which security principle does this layered approach implement?",
    choices: [
      "Least privilege",
      "Defense in depth — multiple independent security layers so no single control failure is catastrophic",
      "Separation of duties",
      "Non-repudiation"
    ],
    correctAnswer: 1,
    explanation: "Defense in depth uses multiple independent security layers: edge protection (WAF/CloudFront), network perimeter (security groups/NACLs), compute isolation (private subnets), and data protection (encryption at rest). Each layer is independent — if an attacker bypasses WAF, security groups still block unauthorized access. If security groups are misconfigured, encryption still protects data. No single failure compromises the entire system."
  },
  {
    id: 715,
    domain: "Security and Compliance",
    question: "A company needs to grant a contractor temporary access to their AWS account for a 2-week consulting engagement. After 2 weeks, access should automatically expire without manual intervention. Which approach provides time-limited access that expires automatically?",
    choices: [
      "Create an IAM user and set a calendar reminder to delete it in 2 weeks",
      "Create an IAM role with a session duration limit and use IAM Identity Center with a time-bound permission set that automatically expires after the engagement period",
      "Share the root account credentials for 2 weeks",
      "Create an IAM user with an access key that self-destructs"
    ],
    correctAnswer: 1,
    explanation: "IAM Identity Center permission sets support time-bound assignments — you can grant the contractor access that automatically expires on a specific date. The contractor authenticates via SSO, receives temporary credentials per session, and after the expiration date, access is revoked automatically. No manual cleanup, no forgotten accounts, no credential exposure risk."
  },
  {
    id: 716,
    domain: "Security and Compliance",
    question: "A company's web application stores user passwords. Their security team requires that passwords be hashed with bcrypt before storage, never stored in plaintext, and that the hashing happens within the application — not delegated to a third party. Under the shared responsibility model, is password hashing AWS's or the customer's responsibility?",
    choices: [
      "AWS handles password security for all applications on AWS",
      "The customer is responsible for application-level security including password hashing — AWS secures the infrastructure, not the application code",
      "Password security is shared equally between AWS and the customer",
      "AWS provides automatic password hashing for all databases"
    ],
    correctAnswer: 1,
    explanation: "Application-level security (password hashing, input validation, business logic security) is entirely the customer's responsibility. AWS secures the infrastructure: physical security, hypervisor, network, and managed service internals. But how you write your application code, including how you hash and store passwords, is 100% your responsibility — AWS doesn't inspect or modify your application logic."
  },
  {
    id: 717,
    domain: "Security and Compliance",
    question: "A company wants to detect when any of their S3 buckets contain data that matches credit card number patterns (16-digit numbers matching Luhn algorithm validation). They want automated, continuous scanning of all S3 buckets with alerts for newly detected sensitive data. Which service provides this automated sensitive data discovery?",
    choices: [
      "Amazon GuardDuty",
      "Amazon Inspector",
      "Amazon Macie",
      "AWS Config"
    ],
    correctAnswer: 2,
    explanation: "Amazon Macie uses machine learning and pattern matching to automatically discover sensitive data in S3 buckets — including credit card numbers (using Luhn validation), SSNs, passport numbers, API keys, and other PII/financial data types. It continuously scans new and modified objects and generates findings when sensitive data is detected, enabling proactive data protection."
  },
  {
    id: 718,
    domain: "Security and Compliance",
    question: "A company wants to ensure that their CloudFormation stacks can only deploy resources that meet security requirements — for example, all EC2 instances must use approved AMIs, all RDS instances must have encryption enabled, and no security groups can allow 0.0.0.0/0. They want this validation to happen BEFORE deployment, not after. Which tool provides this pre-deployment policy enforcement?",
    choices: [
      "AWS Config rules (post-deployment detection)",
      "AWS CloudFormation Guard (cfn-guard) — validates templates against policy rules before deployment",
      "AWS Trusted Advisor (checks running resources)",
      "Amazon Inspector (scans running instances)"
    ],
    correctAnswer: 1,
    explanation: "CloudFormation Guard (cfn-guard) is a policy-as-code tool that validates CloudFormation templates against custom rules BEFORE they are deployed. Rules like 'all RDS instances must have StorageEncrypted: true' are evaluated against the template — non-compliant templates are rejected before any resources are created. This shifts security left into the CI/CD pipeline."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 719,
    domain: "Cloud Technology and Services",
    question: "A company wants to deploy a web application using containers but wants the absolute simplest AWS experience — no ECS task definitions, no cluster configuration, no ALB setup. They just want to point to a container image and get a running, auto-scaling HTTPS endpoint. Which service provides this?",
    choices: [
      "Amazon ECS on Fargate",
      "Amazon EKS",
      "AWS App Runner",
      "AWS Elastic Beanstalk"
    ],
    correctAnswer: 2,
    explanation: "AWS App Runner is the simplest container deployment on AWS. You provide a container image (from ECR) or source code (from GitHub), and App Runner handles everything: builds the image (if source code), deploys it, provisions compute, configures auto-scaling, sets up a load balancer, and provides an HTTPS endpoint — all automatically with zero infrastructure configuration."
  },
  {
    id: 720,
    domain: "Cloud Technology and Services",
    question: "A company needs a managed NoSQL database for their mobile app's user profiles. Requirements: millisecond reads at any scale, automatic scaling, global replication across 3 Regions, and zero database administration. The data model is key-value with some document-style nested attributes. Which database is the best fit?",
    choices: [
      "Amazon RDS for PostgreSQL with JSONB columns",
      "Amazon DynamoDB with Global Tables",
      "Amazon DocumentDB",
      "Amazon Neptune"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB with Global Tables matches every requirement: millisecond latency at any scale (key-value + document model), automatic capacity scaling (on-demand mode), multi-Region active-active replication (Global Tables across 3 Regions), and zero administration (fully managed, no servers, no patching). It's the go-to AWS NoSQL database for this profile."
  },
  {
    id: 721,
    domain: "Cloud Technology and Services",
    question: "A company processes large CSV files (each 500 MB) uploaded to S3. They want to extract only specific columns and rows matching a filter condition — without downloading the entire file. For example: 'SELECT customer_id, amount FROM s3object WHERE amount > 1000'. Which S3 feature enables this server-side filtering?",
    choices: [
      "S3 Object Lambda",
      "S3 Select",
      "Amazon Athena",
      "S3 Batch Operations"
    ],
    correctAnswer: 1,
    explanation: "S3 Select allows you to use SQL expressions to retrieve a subset of data from an S3 object (CSV, JSON, or Parquet). Instead of downloading the entire 500 MB file and filtering client-side, S3 Select processes the query server-side and returns only the matching rows and columns — reducing data transfer by up to 400% and speeding up queries significantly."
  },
  {
    id: 722,
    domain: "Cloud Technology and Services",
    question: "A company needs to set up a secure, private connection between two VPCs in the same Region so that instances in VPC-A can communicate with instances in VPC-B using private IP addresses. The VPCs have non-overlapping CIDR ranges. What is the simplest way to connect them?",
    choices: [
      "Deploy a VPN between the two VPCs",
      "VPC peering connection",
      "AWS Transit Gateway",
      "AWS Direct Connect"
    ],
    correctAnswer: 1,
    explanation: "VPC peering is the simplest method for connecting two VPCs in the same Region (or across Regions). It creates a private network route between the VPCs using AWS's infrastructure — no VPN, no gateways, no additional hardware. Instances communicate using private IPs as if they were on the same network. Transit Gateway is better when connecting many VPCs, but peering is simplest for two."
  },
  {
    id: 723,
    domain: "Cloud Technology and Services",
    question: "A company runs a high-traffic web application and wants to protect it from common exploits. They deploy AWS WAF with managed rule groups. After deployment, they notice legitimate users from certain countries are being blocked. They need to analyze WAF logs to understand which rules are triggering false positives. Where are WAF logs stored for analysis?",
    choices: [
      "WAF logs are not available — only block/allow counts",
      "WAF logs can be sent to S3, CloudWatch Logs, or Kinesis Data Firehose for detailed per-request analysis including which rules matched",
      "WAF logs are only in the WAF console dashboard",
      "WAF logs are stored in CloudTrail"
    ],
    correctAnswer: 1,
    explanation: "AWS WAF logging sends detailed per-request logs to S3 (for archival/Athena analysis), CloudWatch Logs (for real-time monitoring/Logs Insights queries), or Kinesis Data Firehose (for streaming analysis). Each log entry shows which rules were evaluated, which triggered, the action taken, and request details — enabling investigation of false positives and rule tuning."
  },
  {
    id: 724,
    domain: "Cloud Technology and Services",
    question: "A company wants to build a serverless application that reacts to changes in a DynamoDB table — every time a new order is inserted, a Lambda function should process the order and update an analytics dashboard. Which DynamoDB feature captures table changes as a stream of events?",
    choices: [
      "DynamoDB on-demand capacity",
      "DynamoDB Global Tables",
      "DynamoDB Streams",
      "DynamoDB Accelerator (DAX)"
    ],
    correctAnswer: 2,
    explanation: "DynamoDB Streams captures a time-ordered sequence of item-level modifications (inserts, updates, deletes) in a DynamoDB table. Lambda can be configured to poll the stream and invoke a function for each batch of changes. This enables event-driven architectures where downstream systems react to database changes in near-real-time — without polling the table."
  },
  {
    id: 725,
    domain: "Cloud Technology and Services",
    question: "A company needs to run a MySQL-compatible database for a development/test workload that runs for 4 hours per day and sits idle the rest of the time. They want to pay only for the compute time when queries are running and have the database automatically pause when idle. Which service provides this?",
    choices: [
      "Amazon RDS for MySQL",
      "Amazon Aurora Serverless v2",
      "Amazon DynamoDB",
      "Amazon Lightsail database"
    ],
    correctAnswer: 1,
    explanation: "Aurora Serverless v2 automatically scales compute capacity based on application demand — scaling down to a minimum ACU when idle and scaling up when queries arrive. For a dev/test workload running 4 hours/day, you pay for compute only during active use. Aurora Serverless v2 is MySQL and PostgreSQL compatible, making it ideal for intermittent workloads."
  },
  {
    id: 726,
    domain: "Cloud Technology and Services",
    question: "A company stores application configuration as JSON documents that are frequently read but rarely updated. They need a managed, serverless document store that scales automatically, provides single-digit millisecond reads, and doesn't require capacity planning. Documents are accessed by a unique key. Which database fits this simple document retrieval pattern?",
    choices: [
      "Amazon RDS",
      "Amazon DynamoDB",
      "Amazon Redshift",
      "Amazon Neptune"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB handles this pattern perfectly: it stores JSON documents with a primary key, delivers single-digit millisecond reads, scales automatically with on-demand capacity, and requires zero capacity planning or server management. For simple key-based document retrieval with rare writes, DynamoDB is the most operationally simple and cost-effective choice."
  },
  {
    id: 727,
    domain: "Cloud Technology and Services",
    question: "A company wants to implement a CI/CD pipeline where every code push to their GitHub repository automatically triggers: linting, unit tests, integration tests, a Docker image build, and deployment to ECS. They want the BUILD stage (compiling code, running tests, building images) to run in a fully managed environment with no build servers to maintain. Which service handles the build stage?",
    choices: [
      "AWS CodePipeline",
      "AWS CodeDeploy",
      "AWS CodeBuild",
      "AWS CodeCommit"
    ],
    correctAnswer: 2,
    explanation: "AWS CodeBuild is a fully managed build service that compiles source code, runs tests, and produces artifacts (like Docker images). It provisions build environments on demand from pre-built or custom Docker images, scales automatically, and charges per build-minute — no build servers to manage. CodePipeline orchestrates the overall pipeline; CodeBuild handles the build/test stage."
  },
  {
    id: 728,
    domain: "Cloud Technology and Services",
    question: "A company wants to deploy their application to AWS but retain the ability to move to another cloud provider in the future if needed. They want to avoid deep vendor-specific dependencies. Which deployment approach maximizes portability across cloud providers?",
    choices: [
      "Use only AWS-specific services like DynamoDB, Lambda, and SQS",
      "Containerize applications with Kubernetes (EKS) and use open-source tools (PostgreSQL on RDS, Kafka on MSK, Terraform for IaC) to minimize vendor lock-in",
      "Use AWS Outposts for all workloads",
      "Use only EC2 instances with manual configuration"
    ],
    correctAnswer: 1,
    explanation: "Maximizing portability: Kubernetes (available on AWS/Azure/GCP), open-source databases (PostgreSQL, MySQL, Kafka — available managed on all clouds), Terraform (multi-cloud IaC), and containerized applications (run anywhere). These choices trade some AWS-specific optimization for portability. The trade-off: AWS-native services (DynamoDB, Lambda) provide deeper integration but increase switching costs."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 729,
    domain: "Billing, Pricing and Support",
    question: "A company receives their monthly AWS bill and sees a $500 charge for 'Elastic IP addresses'. They only use 3 Elastic IPs attached to running EC2 instances. Investigation reveals they have 10 additional Elastic IPs that are allocated but NOT attached to any running instance. Why are they being charged?",
    choices: [
      "All Elastic IPs are charged regardless of attachment",
      "Elastic IPs are free when attached to a running instance, but AWS charges for allocated EIPs that are NOT associated with a running instance — to discourage waste of the limited IPv4 address pool",
      "Elastic IPs are always free — this is a billing error",
      "Only the first 3 Elastic IPs are free per account"
    ],
    correctAnswer: 1,
    explanation: "AWS charges for Elastic IPs that are allocated but not associated with a running instance. This policy discourages hoarding of the limited IPv4 address pool. The fix: release the 10 unattached EIPs immediately. EIPs attached to running instances have a small hourly charge as well (since February 2024), but unattached EIPs cost more — they represent wasted public IPv4 addresses."
  },
  {
    id: 730,
    domain: "Billing, Pricing and Support",
    question: "A company wants to compare AWS pricing across different configurations before committing — for example, comparing the monthly cost of a t3.large vs m5.large with different EBS volumes and data transfer patterns. They need a tool that lets them model 'what-if' scenarios without creating any AWS resources. Which tool does this?",
    choices: [
      "AWS Cost Explorer (analyzes past spending)",
      "AWS Budgets (sets spending alerts)",
      "AWS Pricing Calculator (models estimated costs for proposed architectures)",
      "AWS Cost and Usage Report (raw billing data)"
    ],
    correctAnswer: 2,
    explanation: "AWS Pricing Calculator lets you model the estimated monthly cost of any AWS architecture before provisioning. You configure services (instance types, storage, data transfer, etc.) and the calculator provides a detailed cost estimate. It's the pre-deployment planning tool — compare configurations, model scenarios, and build cost proposals without touching AWS resources."
  },
  {
    id: 731,
    domain: "Billing, Pricing and Support",
    question: "A company has been running on AWS for 3 years. Their monthly bill is $150,000 and they want expert help optimizing costs, planning Reserved Instance purchases, and negotiating custom pricing agreements. They also want a dedicated billing concierge who understands their account history. Which AWS Support feature provides this personalized billing and account assistance?",
    choices: [
      "AWS Trusted Advisor automated cost checks",
      "AWS Cost Explorer recommendations",
      "AWS Support Concierge (available with Enterprise Support) — a dedicated billing and account expert",
      "AWS Budgets with automated actions"
    ],
    correctAnswer: 2,
    explanation: "The AWS Concierge team (included with Enterprise Support) provides personalized billing and account assistance. They help with: understanding and optimizing complex bills, planning RI/Savings Plan purchases, navigating custom pricing agreements (like Enterprise Discount Programs), and resolving billing issues. For $150K/month accounts, the Concierge's guidance often saves multiples of the support plan cost."
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
