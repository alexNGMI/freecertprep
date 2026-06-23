const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 557,
    domain: "Cloud Concepts",
    question: "A company's CTO is presenting a cloud migration business case to the board. She argues that moving to AWS means the company can redirect IT staff from managing physical servers toward building product features. She also notes that AWS handles physical security, hardware replacement, and data center operations. Which cloud concept captures both of these benefits?",
    choices: [
      "Elasticity and high availability",
      "Trading capital for operational expense and eliminating undifferentiated heavy lifting",
      "Economies of scale and Reserved Instance pricing",
      "Multi-Region deployment and fault tolerance"
    ],
    correctAnswer: 1,
    explanation: "Two complementary benefits: trading CapEx (hardware purchases) for OpEx (pay-as-you-go), and eliminating undifferentiated heavy lifting (AWS handles physical infrastructure so engineers focus on product value). Together they represent the core financial and productivity case for cloud migration — lower capital requirements AND higher engineering leverage."
  },
  {
    id: 558,
    domain: "Cloud Concepts",
    question: "A company architect reviews their system and identifies: their web tier runs on EC2 with Auto Scaling, their database is RDS Multi-AZ, their static assets are served from CloudFront, and their application code deploys via CodePipeline. She describes this as a 'well-architected system.' Under the Performance Efficiency pillar, what ongoing practice should she recommend?",
    choices: [
      "Lock in the current architecture and avoid changes",
      "Continuously evaluate new AWS services and instance types as they're released, and benchmark workloads to ensure resource choices remain optimal",
      "Increase all instance sizes by 50% as a buffer",
      "Move everything to Reserved Instances immediately"
    ],
    correctAnswer: 1,
    explanation: "Performance Efficiency requires democratizing advanced technologies and keeping pace with innovation. AWS releases new instance types, database engines, and services regularly. Continuously benchmarking workloads and adopting newer, more efficient options (e.g., moving from m5 to m6i, or evaluating Aurora Serverless) keeps the architecture optimal as technology evolves."
  },
  {
    id: 559,
    domain: "Cloud Concepts",
    question: "A healthcare company runs workloads on AWS and is concerned about compliance. Their compliance officer wants to know which AWS services have been assessed and authorized under FedRAMP, HIPAA, PCI DSS, and SOC. They also need to understand exactly which security controls AWS handles versus which ones the company must implement themselves. Which framework describes this division?",
    choices: [
      "The AWS Well-Architected Framework",
      "The AWS Shared Responsibility Model",
      "The AWS Cloud Adoption Framework",
      "The AWS Security Reference Architecture"
    ],
    correctAnswer: 1,
    explanation: "The Shared Responsibility Model defines exactly which security controls AWS handles (physical security, hypervisor, managed service patching) versus customer responsibilities (OS patching on EC2, data encryption, IAM configuration, network controls). For compliance frameworks like HIPAA and PCI DSS, customers must understand this division to know what they must implement themselves."
  },
  {
    id: 560,
    domain: "Cloud Concepts",
    question: "A company is planning their cloud journey. They want structured guidance on how to align cloud adoption to their business strategy, identify organizational capability gaps, and create a migration roadmap. Which AWS framework provides this structured approach to cloud adoption?",
    choices: [
      "AWS Well-Architected Framework",
      "AWS Cloud Adoption Framework (CAF)",
      "AWS Migration Hub",
      "AWS Control Tower"
    ],
    correctAnswer: 1,
    explanation: "The AWS Cloud Adoption Framework (CAF) provides structured guidance for planning and executing cloud adoption. It organizes guidance across six perspectives: Business, People, Governance, Platform, Security, and Operations — helping organizations identify capability gaps, align stakeholders, and build a migration roadmap that addresses both technical and organizational dimensions."
  },
  {
    id: 561,
    domain: "Cloud Concepts",
    question: "A company architect is designing a new system and applies the principle 'assume everything fails.' She adds health checks, automatic failover, retry logic, and circuit breakers throughout the system. Her team questions why she's over-engineering it. How should she explain this design philosophy?",
    choices: [
      "Over-engineering ensures better performance",
      "Designing for failure means building resilience so that when — not if — components fail, the system recovers automatically without user impact or manual intervention",
      "AWS guarantees 100% uptime so failure handling is unnecessary",
      "Circuit breakers are only needed for legacy on-premises systems"
    ],
    correctAnswer: 1,
    explanation: "In distributed systems, failures are inevitable — hardware fails, networks partition, services become unavailable. Designing for failure means accepting this reality and building automated recovery: health checks detect failures, circuit breakers prevent cascading failures, retries handle transient issues, and failover mechanisms restore service. The goal is automatic recovery, not failure prevention."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 562,
    domain: "Security and Compliance",
    question: "A company's application on Lambda needs to access a third-party API using an API key that must be rotated every 90 days. The API key must not appear in source code, environment variables, or deployment artifacts. The rotation process should trigger automatically. Which approach securely manages this credential?",
    choices: [
      "Store the API key in an S3 bucket with server-side encryption",
      "Hardcode the key in Lambda environment variables with encryption at rest enabled",
      "Store in AWS Secrets Manager with a custom Lambda rotation function that updates the key every 90 days",
      "Store in Systems Manager Parameter Store standard tier as a plain string"
    ],
    correctAnswer: 2,
    explanation: "AWS Secrets Manager stores the API key encrypted at rest, provides an API for Lambda to retrieve it at runtime (not at deploy time), and supports custom rotation Lambda functions. A rotation function can call the third-party API to generate a new key, store it in Secrets Manager, and update any dependent resources — all automated on a 90-day schedule."
  },
  {
    id: 563,
    domain: "Security and Compliance",
    question: "A company is implementing a zero-trust security model. For every access request to their internal microservices, they want the requesting service to prove its identity using a short-lived certificate that is automatically rotated. Which AWS service provides managed private certificate authority for this use case?",
    choices: [
      "AWS Certificate Manager (ACM) public certificates",
      "AWS Certificate Manager Private CA (ACM PCA)",
      "AWS KMS asymmetric keys",
      "AWS Secrets Manager certificate storage"
    ],
    correctAnswer: 1,
    explanation: "AWS Certificate Manager Private CA (ACM PCA) creates and manages a private certificate authority for issuing private X.509 certificates. These certificates authenticate internal services to each other — issued automatically, short-lived, and rotated without manual intervention. This is the foundation for mutual TLS (mTLS) authentication in zero-trust microservice architectures."
  },
  {
    id: 564,
    domain: "Security and Compliance",
    question: "A company runs a public-facing web application. Their penetration testing team wants to perform authorized security testing — port scanning, vulnerability assessment, and simulated attacks — against their own AWS resources. What is required before conducting penetration testing on AWS?",
    choices: [
      "AWS prohibits all penetration testing by customers",
      "Customers may test their own resources for a defined set of services without prior AWS approval; some activities still require requesting permission",
      "Customers must purchase Enterprise Support before any security testing is allowed",
      "Only AWS-certified security firms may conduct penetration tests"
    ],
    correctAnswer: 1,
    explanation: "AWS permits customers to perform security testing on their own resources without prior approval for a defined set of services (EC2, RDS, CloudFront, API Gateway, Lambda, Lightsail, Elastic Beanstalk). Some activities (DDoS simulation, DNS zone walking, port flooding) still require AWS approval via a penetration testing request form. Testing against AWS infrastructure itself is prohibited."
  },
  {
    id: 565,
    domain: "Security and Compliance",
    question: "A company stores customer records in DynamoDB. Their legal team receives a subpoena for all records belonging to a specific customer. They need to find and export all records for that customer across multiple DynamoDB tables — some tables have been identified as potentially containing PII that was never formally cataloged. Which service helps discover which tables contain PII?",
    choices: [
      "Amazon GuardDuty",
      "Amazon Macie (for S3) combined with manual DynamoDB scan review",
      "AWS Config resource inventory",
      "Amazon Inspector database scanning"
    ],
    correctAnswer: 1,
    explanation: "Amazon Macie uses ML to automatically discover and classify PII in Amazon S3 — if DynamoDB data is exported to S3 (via Data Export or DynamoDB Streams to S3), Macie can scan it for PII. For DynamoDB directly, manual review or custom tooling is needed since Macie is S3-specific. This is why data classification at ingestion time is a security best practice."
  },
  {
    id: 566,
    domain: "Security and Compliance",
    question: "A company's security policy requires that no IAM access keys older than 90 days remain active. They have 200 IAM users and manually checking key age is not scalable. Which approach automates the detection and notification of expired keys?",
    choices: [
      "AWS Config rule 'access-keys-rotated' with an SNS notification action",
      "GuardDuty credential scanning",
      "Amazon Inspector IAM assessment",
      "AWS Trusted Advisor manual review"
    ],
    correctAnswer: 0,
    explanation: "AWS Config has a managed rule 'access-keys-rotated' that checks whether active IAM access keys are rotated within the specified number of days. When a key exceeds 90 days, Config marks it non-compliant and can trigger an SNS notification or auto-remediation action (like disabling the key). This automates policy enforcement across all 200 users continuously."
  },
  {
    id: 567,
    domain: "Security and Compliance",
    question: "A multinational company has a strict policy that customer data for EU citizens must never leave AWS European Regions. They use AWS Organizations with accounts across us-east-1, eu-west-1, and ap-southeast-1. How can they technically enforce that EU account resources cannot replicate data to non-EU Regions?",
    choices: [
      "Trust the development team to follow the policy manually",
      "Use AWS Config rules to detect cross-Region replication after the fact",
      "Apply SCPs to EU accounts that deny actions enabling cross-Region data transfer (e.g., s3:PutBucketReplication to non-EU destinations, rds:CreateDBInstanceReadReplica in non-EU Regions)",
      "Enable CloudTrail and audit cross-Region activities monthly"
    ],
    correctAnswer: 2,
    explanation: "SCPs are preventive controls — they block actions before they happen. Deny SCPs on EU accounts can prohibit creating S3 cross-Region replication to non-EU buckets, creating RDS read replicas in non-EU Regions, or enabling cross-Region backup copies to non-EU destinations. This technically enforces data residency at the API level, making violations impossible rather than just detectable."
  },
  {
    id: 568,
    domain: "Security and Compliance",
    question: "A company needs to protect their API Gateway endpoints from common web exploits and also wants to limit each client to 1,000 API calls per day to prevent abuse. Which combination of AWS services enforces both application-layer protection and rate limiting?",
    choices: [
      "AWS Shield Standard and Amazon CloudFront",
      "AWS WAF (for web exploit rules) with rate-based rules, attached to API Gateway",
      "Amazon GuardDuty and AWS Config",
      "Network ACLs on the API Gateway subnet"
    ],
    correctAnswer: 1,
    explanation: "AWS WAF integrates directly with API Gateway and supports both managed rule groups (blocking SQLi, XSS, and other exploits) and rate-based rules that count requests per IP or per client key and block those exceeding the threshold. A rate-based rule set to 1,000 requests/day automatically blocks clients that exceed the limit."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 569,
    domain: "Cloud Technology and Services",
    question: "A company needs to provide developers with on-demand access to pre-configured development environments — complete IDEs, toolchains, and cloud-connected workspaces — that they can launch in seconds from a browser without installing anything locally. Which AWS service provides cloud-based development environments?",
    choices: [
      "Amazon WorkSpaces",
      "AWS Cloud9",
      "Amazon AppStream 2.0",
      "AWS CodeStar"
    ],
    correctAnswer: 1,
    explanation: "AWS Cloud9 is a cloud-based integrated development environment (IDE) that runs entirely in a browser. It provides a pre-configured development environment with common runtimes, AWS CLI pre-authenticated with IAM credentials, and direct access to AWS services. Teams can collaborate in real-time in the same IDE without any local installation."
  },
  {
    id: 570,
    domain: "Cloud Technology and Services",
    question: "A company's DevOps team manages hundreds of microservices across multiple AWS accounts and Regions. They need a central catalog of all running services, their health status, deployment versions, and relationships. They also want to enforce service-level runbooks and automated operational tasks. Which AWS service provides this operational management capability?",
    choices: [
      "AWS CloudFormation StackSets",
      "Amazon CloudWatch dashboards",
      "AWS Systems Manager (OpsCenter and Explorer)",
      "AWS Service Catalog"
    ],
    correctAnswer: 2,
    explanation: "AWS Systems Manager OpsCenter provides a central location for investigating and resolving operational issues (OpsItems) with runbook automation. Systems Manager Explorer gives a unified view of operational data — resource compliance, patch status, configuration changes — across accounts and Regions, enabling centralized operational visibility and response."
  },
  {
    id: 571,
    domain: "Cloud Technology and Services",
    question: "A company wants to enforce that developers can only provision pre-approved, compliant AWS resources — specific EC2 instance types, approved AMIs, and tagged resources — rather than having free reign with full IAM permissions. Which AWS service allows administrators to create a curated catalog of approved infrastructure templates for self-service provisioning?",
    choices: [
      "AWS Config",
      "AWS Service Catalog",
      "AWS Control Tower",
      "AWS CloudFormation"
    ],
    correctAnswer: 1,
    explanation: "AWS Service Catalog lets administrators create a portfolio of approved CloudFormation-based products (e.g., approved EC2 types, pre-configured RDS instances with encryption). Developers can self-service provision only from this catalog — getting exactly what they need while admins maintain guardrails on instance types, AMIs, tagging, and configuration standards."
  },
  {
    id: 572,
    domain: "Cloud Technology and Services",
    question: "A company needs to migrate a 10 TB PostgreSQL database from on-premises to Amazon Aurora PostgreSQL with less than 1 hour of downtime. They want to perform the bulk migration first, then use change data capture to sync ongoing changes until they cut over. Which AWS service orchestrates this migration with minimal downtime?",
    choices: [
      "AWS Snowball Edge",
      "AWS DataSync",
      "AWS Database Migration Service (DMS)",
      "AWS Schema Conversion Tool"
    ],
    correctAnswer: 2,
    explanation: "AWS DMS handles both the full load (initial bulk migration of 10 TB) and ongoing CDC (Change Data Capture) replication to keep Aurora in sync during the cutover window. Once the teams validates data integrity, they stop writes to the source, wait for CDC to catch up (minutes), and redirect application connections to Aurora — achieving sub-1-hour downtime."
  },
  {
    id: 573,
    domain: "Cloud Technology and Services",
    question: "A company's production EC2 instances experience memory pressure every day between 2-4 PM. They want CloudWatch to alert the on-call engineer when available memory drops below 500 MB. However, they notice CloudWatch doesn't show memory metrics by default for EC2. How do they get memory metrics into CloudWatch?",
    choices: [
      "Memory metrics are available by default — check the EC2 console",
      "Upgrade to a larger EC2 instance type",
      "Install the CloudWatch agent on the EC2 instances to collect and publish custom memory metrics",
      "Enable AWS X-Ray on the instance for memory tracing"
    ],
    correctAnswer: 2,
    explanation: "CloudWatch collects EC2 hypervisor-level metrics (CPU, disk I/O, network) by default, but memory and disk usage metrics require the CloudWatch agent installed inside the OS. The agent collects OS-level metrics (memory, swap, disk space) and publishes them to CloudWatch as custom metrics — then you can create alarms on available memory thresholds."
  },
  {
    id: 574,
    domain: "Cloud Technology and Services",
    question: "A company wants to detect equipment failures in their manufacturing plant in real time. Sensors send telemetry data to AWS every 100ms. When sensor readings indicate an anomaly (e.g., temperature > 200°C), the system must trigger an alert within 1 second. Which architecture handles this real-time anomaly detection at the edge?",
    choices: [
      "Sensors → S3 → Athena nightly batch query",
      "Sensors → AWS IoT Core → IoT Rules Engine → Lambda (anomaly detection) → SNS alert",
      "Sensors → SQS → EC2 polling worker → SNS",
      "Sensors → Kinesis Firehose → S3 → hourly Lambda"
    ],
    correctAnswer: 1,
    explanation: "AWS IoT Core ingests the sensor telemetry via MQTT. The IoT Rules Engine evaluates SQL-like conditions against each message in real time (temp > 200). When triggered, it invokes Lambda for anomaly processing and SNS for immediate alerts — end-to-end latency well under 1 second. Batch approaches (S3+Athena, Firehose) introduce minutes to hours of delay."
  },
  {
    id: 575,
    domain: "Cloud Technology and Services",
    question: "A company wants to build a knowledge base chatbot that answers questions based on their internal documentation stored in S3 and their product databases. The chatbot should retrieve relevant context, generate accurate answers using a large language model, and cite the source documents. Which AWS service provides this managed RAG (Retrieval Augmented Generation) capability?",
    choices: [
      "Amazon Lex",
      "Amazon SageMaker JumpStart",
      "Amazon Bedrock with Knowledge Bases",
      "Amazon Comprehend"
    ],
    correctAnswer: 2,
    explanation: "Amazon Bedrock Knowledge Bases provides fully managed RAG — it automatically ingests documents from S3 into a vector store, retrieves relevant context for each user query, and passes it to a foundation model (Claude, Llama, etc.) to generate accurate, grounded answers with source citations. No custom ML infrastructure or embedding pipeline needed."
  },
  {
    id: 576,
    domain: "Cloud Technology and Services",
    question: "A company wants to use a large language model API to generate product descriptions at scale — thousands of descriptions per day. They don't want to manage ML infrastructure, train their own models, or handle model updates. They want to call a managed API with their prompts and receive generated text. Which AWS service provides access to managed foundation models via API?",
    choices: [
      "Amazon SageMaker",
      "Amazon Rekognition",
      "Amazon Bedrock",
      "AWS DeepRacer"
    ],
    correctAnswer: 2,
    explanation: "Amazon Bedrock provides access to high-performing foundation models (FMs) from Anthropic (Claude), Meta (Llama), Amazon (Titan), Mistral, and others via a single managed API. No infrastructure to manage, no model training — call the API with your prompt and receive generated text. Usage is pay-per-token with no upfront commitments."
  },
  {
    id: 577,
    domain: "Cloud Technology and Services",
    question: "A software company wants to provide their customers with a centralized portal where they can view, manage, and pay for multiple AWS Marketplace software subscriptions, get consolidated support, and access curated solutions relevant to their industry. Which AWS program enables vendors to build this experience for customers?",
    choices: [
      "AWS Partner Network",
      "AWS Marketplace with private offers",
      "AWS Service Catalog",
      "AWS Organizations"
    ],
    correctAnswer: 1,
    explanation: "AWS Marketplace enables software vendors to list and sell software products directly to AWS customers. Private offers allow vendors to negotiate custom pricing and terms with specific customers. Customers can purchase, manage, and pay for third-party software directly through the AWS billing console — with charges consolidated on their AWS invoice."
  },
  {
    id: 578,
    domain: "Cloud Technology and Services",
    question: "A company needs to process incoming customer support emails: extract key information (customer ID, issue type, urgency), route to the right department, and generate a draft response — all automatically before a human reviews it. Which combination of AWS AI services handles this workflow?",
    choices: [
      "Amazon Rekognition for text extraction and Amazon Polly for response generation",
      "Amazon Textract to extract email text, Amazon Comprehend for classification and entity extraction, and Amazon Bedrock for draft response generation",
      "Amazon Translate for language detection and Amazon Lex for intent classification",
      "Amazon Transcribe for voice emails and Amazon SageMaker for classification"
    ],
    correctAnswer: 1,
    explanation: "A pipeline of AWS AI services: Comprehend classifies intent (issue type), extracts entities (customer ID), and detects sentiment/urgency from the email text. Bedrock's LLM generates a contextually appropriate draft response. This multi-service AI pipeline automates email triage and response drafting without custom ML model training."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 579,
    domain: "Billing, Pricing and Support",
    question: "A company's AWS bill has grown from $50K to $200K per month over 12 months as they scaled. Their finance team wants to create a showback/chargeback model where each business unit is billed for their actual AWS consumption. Which combination of AWS features enables this cost allocation by business unit?",
    choices: [
      "Separate AWS accounts per business unit with consolidated billing in AWS Organizations",
      "Resource tagging by business unit and AWS Cost Explorer filtering by tags, or separate accounts per unit with consolidated billing",
      "AWS Budgets with per-unit spending limits",
      "CloudWatch custom metrics for cost tracking"
    ],
    correctAnswer: 1,
    explanation: "Two approaches work: (1) Tag all resources with a 'BusinessUnit' tag — Cost Explorer and Cost Allocation Tags enable per-unit cost reporting within a single account. (2) Separate AWS accounts per business unit with Organizations consolidated billing provides the strongest isolation. Large enterprises often combine both: separate accounts AND tagging for granular within-account visibility."
  },
  {
    id: 580,
    domain: "Billing, Pricing and Support",
    question: "A company runs 20 EC2 instances of the same type 24/7 and purchased 20 Standard Reserved Instances for that type. Six months later, they upgrade all instances to the next size up in the same family. Their RI discounts stop applying. What should they have purchased instead to maintain discounts after the instance type change?",
    choices: [
      "More Standard Reserved Instances for the new size",
      "Spot Instances for flexibility",
      "Compute Savings Plans, which apply regardless of instance size within the same family",
      "On-Demand Capacity Reservations"
    ],
    correctAnswer: 2,
    explanation: "Compute Savings Plans apply a discount to any EC2 usage (any instance family, size, OS, Region, or tenancy) up to the committed $/hour amount. When the company upsized their instances, Compute Savings Plans would have automatically applied the discount to the new size — unlike Standard RIs which are locked to a specific instance type and don't automatically apply to a different size."
  },
  {
    id: 581,
    domain: "Billing, Pricing and Support",
    question: "A startup is building on AWS and wants to minimize costs during development. They're using t3.micro EC2 instances, 5 GB of S3 storage, and a single-AZ RDS db.t3.micro. They've been running for 8 months and haven't been charged for these specific resources. Which AWS program is providing this free usage?",
    choices: [
      "AWS Startup Credits program",
      "AWS Free Tier — 12-month free tier includes 750 hours/month EC2 t2/t3.micro, 5 GB S3, and 750 hours/month RDS single-AZ db.t3.micro",
      "AWS Developer Support includes free resource usage",
      "T3 instances are always free for startups"
    ],
    correctAnswer: 1,
    explanation: "The AWS Free Tier 12-month offers include: 750 hours/month of EC2 t2.micro or t3.micro (Linux), 5 GB of S3 Standard storage, and 750 hours/month of RDS Single-AZ db.t2.micro or db.t3.micro. A startup using exactly these resources stays within the free tier for the first 12 months — a common pattern for early-stage development."
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
