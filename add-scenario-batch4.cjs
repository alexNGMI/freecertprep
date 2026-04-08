const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 357,
    domain: "Cloud Concepts",
    question: "A fintech company needs to deploy an application that can survive the failure of an entire data center without downtime. AWS Regions contain multiple Availability Zones, each in separate physical facilities with independent power and networking. What does deploying across multiple AZs provide?",
    choices: [
      "Lower latency for all global users",
      "Reduced monthly costs",
      "Fault tolerance against data center-level failures",
      "Automatic compliance with financial regulations"
    ],
    correctAnswer: 2,
    explanation: "Availability Zones are physically isolated data centers within a Region. Deploying across multiple AZs means that if one facility loses power, connectivity, or experiences any localized failure, your application continues running in the unaffected AZ(s) — providing fault tolerance against data center-level failures."
  },
  {
    id: 358,
    domain: "Cloud Concepts",
    question: "A CTO is explaining the cloud to their board of directors. They say: 'Instead of buying 20 servers that sit at 10% utilization most of the year, we can provision exactly what we need and adjust daily.' Which cloud concept captures this advantage?",
    choices: [
      "Stop guessing capacity",
      "Go global in minutes",
      "Benefit from economies of scale",
      "Trade fixed expense for variable expense"
    ],
    correctAnswer: 0,
    explanation: "'Stop guessing capacity' means you no longer need to predict infrastructure needs months in advance. In the cloud, you can scale up or down based on actual demand, eliminating both the waste of over-provisioning (servers at 10% utilization) and the risk of under-provisioning (insufficient capacity during peaks)."
  },
  {
    id: 359,
    domain: "Cloud Concepts",
    question: "A company runs workloads on AWS but also uses Azure for specific AI services and Google Cloud for BigQuery analytics. Their architecture intentionally spans multiple cloud providers. What is this deployment strategy called?",
    choices: [
      "Hybrid cloud",
      "Multi-cloud",
      "Private cloud",
      "Distributed cloud"
    ],
    correctAnswer: 1,
    explanation: "Multi-cloud is a strategy that uses services from two or more cloud providers (e.g., AWS, Azure, Google Cloud) simultaneously. Companies adopt multi-cloud to leverage best-of-breed services from each provider, avoid vendor lock-in, or meet specific technical requirements that one provider handles better than others."
  },
  {
    id: 360,
    domain: "Cloud Concepts",
    question: "A company wants to use a managed email service (Amazon SES) without managing email servers, and a managed database (Amazon RDS) without patching the database engine. But they still want full control over their VPC networking and firewall rules. Under the shared responsibility model, who is responsible for what in this scenario?",
    choices: [
      "AWS is responsible for everything including networking and firewall rules",
      "The customer is responsible for everything including patching the database engine",
      "AWS manages the underlying infrastructure and engine patching; the customer manages their VPC configuration, security groups, and network ACLs",
      "Responsibility is split based on the monthly cost of each service"
    ],
    correctAnswer: 2,
    explanation: "Under the shared responsibility model for managed services like RDS and SES: AWS handles the underlying infrastructure, OS patching, and database engine patching. The customer retains responsibility for network-level controls (VPC configuration, security groups, NACLs), data encryption choices, and IAM access management."
  },
  {
    id: 361,
    domain: "Cloud Concepts",
    question: "A development team wants to test a new feature in production-like conditions. In their on-premises world, creating a copy of the production environment takes 3 months and costs $500K. On AWS, they can spin up an identical environment with CloudFormation in 20 minutes and tear it down after testing. Which cloud advantage does this exemplify?",
    choices: [
      "High availability",
      "Elasticity",
      "Increase speed and agility",
      "Fault tolerance"
    ],
    correctAnswer: 2,
    explanation: "Speed and agility in the cloud means IT resources are available in minutes instead of months. The ability to rapidly create and destroy entire environments enables faster experimentation, testing, and innovation cycles — transforming a 3-month, $500K process into a 20-minute, low-cost operation."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 362,
    domain: "Security and Compliance",
    question: "A company's security policy requires that all data stored in Amazon EBS volumes, Amazon S3, and Amazon RDS must be encrypted at rest. They want to use a single service to create and manage the encryption keys for all three services with centralized key rotation policies. Which service should they use?",
    choices: [
      "AWS CloudHSM",
      "AWS Certificate Manager",
      "AWS KMS (Key Management Service)",
      "AWS Secrets Manager"
    ],
    correctAnswer: 2,
    explanation: "AWS KMS integrates natively with EBS, S3, RDS, and over 100 other AWS services to provide centralized encryption key management. You can create customer managed keys (CMKs), define rotation policies, and audit all key usage through CloudTrail — managing encryption across multiple services from one place."
  },
  {
    id: 363,
    domain: "Security and Compliance",
    question: "A company wants to allow their mobile app users to upload photos directly to a specific S3 bucket, but only to their own user folder, and only for 1 hour after login. They don't want to create permanent IAM users for each mobile app user. Which AWS service provides temporary, scoped credentials for this use case?",
    choices: [
      "IAM users with time-limited policies",
      "Amazon Cognito Identity Pools (federated identities)",
      "IAM access keys with expiration",
      "S3 bucket policies with IP restrictions"
    ],
    correctAnswer: 1,
    explanation: "Amazon Cognito Identity Pools provide temporary, scoped AWS credentials to authenticated (or guest) users. After login, Cognito issues temporary credentials tied to an IAM role that can be scoped to allow S3 access only to the user's specific folder. Credentials expire automatically, eliminating permanent credential management."
  },
  {
    id: 364,
    domain: "Security and Compliance",
    question: "A company recently moved to AWS and wants to verify their overall security posture against industry best practices. They want automated checks for things like: 'Is MFA enabled on the root account?', 'Are there security groups allowing unrestricted access?', and 'Is CloudTrail enabled?' Which tool provides these automated best-practice checks?",
    choices: [
      "AWS Trusted Advisor",
      "AWS Config",
      "Amazon Inspector",
      "AWS Audit Manager"
    ],
    correctAnswer: 0,
    explanation: "AWS Trusted Advisor provides automated checks across five categories including security. Its security checks include root account MFA, unrestricted security group access, CloudTrail status, IAM usage, and more — giving you a quick assessment of your security posture against AWS best practices."
  },
  {
    id: 365,
    domain: "Security and Compliance",
    question: "A company needs to establish a secure, encrypted tunnel between their on-premises corporate network and their AWS VPC over the public internet. They need the connection operational within hours, not the weeks required for a physical connection. Which AWS service provides this?",
    choices: [
      "AWS Direct Connect",
      "AWS Site-to-Site VPN",
      "AWS PrivateLink",
      "Amazon CloudFront"
    ],
    correctAnswer: 1,
    explanation: "AWS Site-to-Site VPN creates an encrypted IPsec tunnel between your on-premises network and your AWS VPC over the public internet. It can be set up in minutes/hours — much faster than Direct Connect (which requires physical cross-connection setup). VPN provides encryption in transit at the cost of some latency variability."
  },
  {
    id: 366,
    domain: "Security and Compliance",
    question: "A company has an IAM policy that allows a developer to launch EC2 instances. However, the developer reports getting 'Access Denied' when trying to launch instances. Upon investigation, the security team finds a Service Control Policy (SCP) in AWS Organizations that denies EC2 launches in all Regions except eu-west-1. What is happening?",
    choices: [
      "The IAM policy overrides the SCP",
      "The SCP acts as a guardrail — even though IAM allows the action, the SCP's deny takes precedence",
      "SCPs only apply to the management account, not member accounts",
      "The developer needs to be added to the SCP's allow list"
    ],
    correctAnswer: 1,
    explanation: "SCPs set the maximum permissions boundary for an account. Even if an IAM policy explicitly allows an action, the SCP can deny it. SCPs act as guardrails — the effective permissions are the intersection of what the SCP allows and what the IAM policy grants. If the SCP denies EC2 in us-east-1, no IAM policy can override that."
  },
  {
    id: 367,
    domain: "Security and Compliance",
    question: "A company wants to ensure that IAM users can only perform actions if they are connecting from the corporate office IP range (203.0.113.0/24). If someone steals a developer's credentials and tries to use them from another location, access should be denied. How should they implement this?",
    choices: [
      "Configure security groups to allow traffic only from 203.0.113.0/24",
      "Use VPC endpoint policies to restrict access",
      "Add an IAM policy condition using aws:SourceIp to restrict API calls to 203.0.113.0/24",
      "Enable AWS Shield to block non-corporate IP addresses"
    ],
    correctAnswer: 2,
    explanation: "IAM policy conditions with the aws:SourceIp key restrict API calls to specific IP address ranges. By adding a Deny statement with a condition that blocks requests NOT from 203.0.113.0/24, stolen credentials become useless outside the corporate network — a defense-in-depth measure alongside MFA."
  },
  {
    id: 368,
    domain: "Security and Compliance",
    question: "A healthcare company needs to generate audit-ready evidence that their AWS environment complies with HIPAA. They want automated collection of evidence such as CloudTrail logs, Config snapshots, and security findings, mapped to specific HIPAA control requirements. Which AWS service automates this compliance evidence collection?",
    choices: [
      "AWS Artifact",
      "AWS Audit Manager",
      "AWS Config",
      "AWS Security Hub"
    ],
    correctAnswer: 1,
    explanation: "AWS Audit Manager continuously collects evidence from AWS services (CloudTrail, Config, Security Hub, etc.) and maps it to compliance framework controls like HIPAA, PCI DSS, and SOC 2. It automates the evidence gathering process that would otherwise require manual collection for audits."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 369,
    domain: "Cloud Technology and Services",
    question: "A company has a legacy application that uses a message broker with JMS and AMQP protocols. They want to migrate to AWS without rewriting the messaging layer. Which AWS service provides managed message broker compatibility with these standard protocols?",
    choices: [
      "Amazon SQS",
      "Amazon SNS",
      "Amazon MQ",
      "Amazon Kinesis"
    ],
    correctAnswer: 2,
    explanation: "Amazon MQ is a managed message broker service compatible with Apache ActiveMQ and RabbitMQ. It supports industry-standard messaging protocols like JMS, AMQP, MQTT, and STOMP — allowing companies to migrate existing messaging-dependent applications to AWS without rewriting the messaging layer."
  },
  {
    id: 370,
    domain: "Cloud Technology and Services",
    question: "A company needs to extract text from scanned documents (PDFs and images of forms), identify key-value pairs like 'Name: John Smith' and table data, without building a custom OCR solution. Which AWS AI service provides this document analysis capability?",
    choices: [
      "Amazon Rekognition",
      "Amazon Textract",
      "Amazon Comprehend",
      "Amazon Translate"
    ],
    correctAnswer: 1,
    explanation: "Amazon Textract uses machine learning to automatically extract text, handwriting, forms (key-value pairs), and table data from scanned documents and images. Unlike simple OCR, Textract understands document structure — identifying form fields, table rows/columns, and the relationships between them."
  },
  {
    id: 371,
    domain: "Cloud Technology and Services",
    question: "A multinational company wants to deploy their application in AWS Regions in the US, Europe, and Asia. They need a DNS solution that routes users to the closest Region based on geographic location — European users to eu-west-1, Asian users to ap-southeast-1, and US users to us-east-1. Which Route 53 routing policy accomplishes this?",
    choices: [
      "Simple routing",
      "Weighted routing",
      "Geolocation routing",
      "Failover routing"
    ],
    correctAnswer: 2,
    explanation: "Route 53 geolocation routing directs traffic based on the geographic location of the user's DNS query. You can map continents, countries, or US states to specific endpoints — routing European users to eu-west-1, Asian users to ap-southeast-1, etc. This provides locale-specific content delivery and compliance."
  },
  {
    id: 372,
    domain: "Cloud Technology and Services",
    question: "A company runs a popular web application on EC2 instances behind an Application Load Balancer. Traffic is growing 30% monthly, and they want the EC2 fleet to automatically add instances when average CPU exceeds 70% and remove instances when it drops below 30%. Which feature should they configure?",
    choices: [
      "EC2 Auto Scaling with target tracking scaling policy",
      "AWS Lambda with provisioned concurrency",
      "Manual scaling on a weekly schedule",
      "Vertical scaling by upgrading to larger instance types"
    ],
    correctAnswer: 0,
    explanation: "EC2 Auto Scaling with a target tracking policy automatically adjusts the number of instances to maintain a target metric value (e.g., average CPU at 70%). It scales out when the metric exceeds the target and scales in when it drops — providing automatic, metric-driven horizontal scaling without manual intervention."
  },
  {
    id: 373,
    domain: "Cloud Technology and Services",
    question: "A company needs to build a data lake on AWS. They want to catalog all their data sources, discover schemas automatically, run ETL (extract, transform, load) jobs to prepare data, and make data queryable by Athena and Redshift Spectrum. Which fully managed service provides this data integration platform?",
    choices: [
      "Amazon EMR",
      "AWS Glue",
      "Amazon Kinesis Data Firehose",
      "AWS Data Pipeline"
    ],
    correctAnswer: 1,
    explanation: "AWS Glue is a fully managed ETL and data catalog service. The Glue Data Catalog stores metadata and schemas, Glue Crawlers automatically discover data formats, and Glue ETL jobs transform and prepare data. The catalog integrates with Athena and Redshift Spectrum for seamless querying of cataloged data."
  },
  {
    id: 374,
    domain: "Cloud Technology and Services",
    question: "A company wants to add natural language processing to their customer support application. They need to automatically analyze support tickets to detect sentiment (positive, negative, neutral), extract key phrases, and identify the language of each ticket. Which AWS service provides these NLP capabilities without requiring ML expertise?",
    choices: [
      "Amazon Lex",
      "Amazon Polly",
      "Amazon Comprehend",
      "Amazon SageMaker"
    ],
    correctAnswer: 2,
    explanation: "Amazon Comprehend is a natural language processing (NLP) service that uses machine learning to extract insights from text. It detects sentiment, extracts key phrases, identifies entities (people, places, organizations), determines language, and classifies documents — all through simple API calls without requiring ML expertise."
  },
  {
    id: 375,
    domain: "Cloud Technology and Services",
    question: "A company needs a shared file system that can be mounted concurrently by hundreds of EC2 instances across multiple Availability Zones. The file system must support NFS protocol and automatically scale storage capacity as files are added. Which AWS service provides this?",
    choices: [
      "Amazon EBS",
      "Amazon S3",
      "Amazon EFS",
      "Amazon FSx for Windows"
    ],
    correctAnswer: 2,
    explanation: "Amazon EFS (Elastic File System) is a fully managed NFS file system that can be mounted concurrently by thousands of EC2 instances across multiple AZs. It automatically scales storage capacity up and down as you add and remove files — no provisioning required. EBS volumes, by contrast, can only attach to one instance at a time."
  },
  {
    id: 376,
    domain: "Cloud Technology and Services",
    question: "A company wants to build a chatbot for their customer service website that understands natural language, handles multi-turn conversations, and integrates with their backend order lookup system via AWS Lambda. Which AWS service provides this conversational AI capability?",
    choices: [
      "Amazon Comprehend",
      "Amazon Polly",
      "Amazon Lex",
      "Amazon Transcribe"
    ],
    correctAnswer: 2,
    explanation: "Amazon Lex provides the deep learning technologies for building conversational chatbots and voice assistants. It handles speech recognition, natural language understanding, intent detection, and multi-turn dialogue management. Lambda integration enables fulfillment logic — like looking up orders — when the bot identifies the user's intent."
  },
  {
    id: 377,
    domain: "Cloud Technology and Services",
    question: "A company wants to deploy a WordPress blog for a small team. They want a simple, low-cost virtual private server with a fixed monthly price that includes compute, storage, DNS, and a static IP. They don't need the full complexity of EC2 with VPCs and Auto Scaling. Which AWS service is the best fit?",
    choices: [
      "Amazon EC2",
      "AWS Fargate",
      "Amazon Lightsail",
      "AWS Elastic Beanstalk"
    ],
    correctAnswer: 2,
    explanation: "Amazon Lightsail provides simple virtual private servers with fixed monthly pricing that bundles compute, storage, data transfer, DNS, and a static IP. It offers pre-configured application blueprints (including WordPress) and is designed for small-scale workloads that don't need the full power and complexity of EC2."
  },
  {
    id: 378,
    domain: "Cloud Technology and Services",
    question: "A video streaming platform needs to convert uploaded videos into multiple formats and resolutions (480p, 720p, 1080p, 4K) for playback on different devices. They need a managed service that handles the transcoding pipeline. Which AWS service provides this media processing capability?",
    choices: [
      "Amazon Kinesis Video Streams",
      "AWS Elemental MediaConvert",
      "Amazon CloudFront",
      "AWS Batch"
    ],
    correctAnswer: 1,
    explanation: "AWS Elemental MediaConvert is a file-based video transcoding service that converts media files into multiple output formats and resolutions for multi-device playback. It supports broadcast-quality features like HDR, closed captioning, and multi-channel audio — purpose-built for media processing pipelines."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 379,
    domain: "Billing, Pricing and Support",
    question: "A company has 8 different AWS accounts — one for each team. They want centralized governance: a single bill, the ability to share Reserved Instance discounts across accounts, and the ability to create new accounts programmatically. Which AWS service provides this multi-account management?",
    choices: [
      "AWS IAM",
      "AWS Control Tower",
      "AWS Organizations",
      "AWS Single Sign-On"
    ],
    correctAnswer: 2,
    explanation: "AWS Organizations provides centralized multi-account management with consolidated billing (single payer), Reserved Instance and Savings Plans sharing across accounts, Service Control Policies for governance, and programmatic account creation via APIs. It's the foundation for multi-account strategies."
  },
  {
    id: 380,
    domain: "Billing, Pricing and Support",
    question: "A company's AWS bill shows charges for 'Data Transfer OUT From Region'. Their architecture has EC2 instances serving 500 GB of data per month to end users across the internet. They want to reduce these data transfer costs. Which approach would be most effective?",
    choices: [
      "Move to larger EC2 instance types",
      "Place Amazon CloudFront in front of the application to serve cached content from edge locations",
      "Switch from On-Demand to Reserved Instances",
      "Enable S3 Transfer Acceleration"
    ],
    correctAnswer: 1,
    explanation: "CloudFront caches content at 400+ edge locations globally. When users request content, CloudFront serves it from the nearest edge instead of pulling from the origin each time. CloudFront's data transfer pricing is significantly lower than EC2 direct data transfer, and caching reduces the amount of data transferred from the origin."
  },
  {
    id: 381,
    domain: "Billing, Pricing and Support",
    question: "A company is comparing the cost of running a workload on-premises versus on AWS. They need to account for hidden on-premises costs like power, cooling, rack space, networking equipment, and IT staff salaries — not just server hardware. What is this comprehensive cost comparison called?",
    choices: [
      "Return on investment (ROI) analysis",
      "Total Cost of Ownership (TCO) analysis",
      "Break-even analysis",
      "Capital expenditure forecast"
    ],
    correctAnswer: 1,
    explanation: "Total Cost of Ownership (TCO) analysis compares the full cost of running workloads on-premises (hardware, power, cooling, rack space, networking, staff, maintenance, real estate) versus the cloud. TCO reveals that on-premises costs are often 3-4x higher than they appear when you account for all operational expenses."
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
