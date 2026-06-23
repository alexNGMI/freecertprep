const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 382,
    domain: "Cloud Concepts",
    question: "A company's disaster recovery plan requires that if their primary Region (us-east-1) becomes unavailable, their application must failover to a standby environment in eu-west-1 within 30 minutes. Which AWS design principle are they implementing?",
    choices: [
      "Elasticity",
      "Agility",
      "Reliability through multi-Region disaster recovery",
      "Cost optimization"
    ],
    correctAnswer: 2,
    explanation: "Multi-Region disaster recovery is a reliability design principle. By maintaining a standby environment in a separate Region, the company can recover from a complete Regional failure within their 30-minute RTO (Recovery Time Objective). This goes beyond high availability (multi-AZ) to protect against Region-level outages."
  },
  {
    id: 383,
    domain: "Cloud Concepts",
    question: "An architect is designing a system on AWS and follows the Well-Architected Framework. They design each component to fail independently without cascading to other components — using circuit breakers, retries with exponential backoff, and graceful degradation. Which Well-Architected pillar does this represent?",
    choices: [
      "Operational Excellence",
      "Security",
      "Reliability",
      "Performance Efficiency"
    ],
    correctAnswer: 2,
    explanation: "The Reliability pillar of the AWS Well-Architected Framework focuses on ensuring workloads perform their intended function correctly and consistently. It includes designing for failure isolation, implementing circuit breakers, retries with backoff, and graceful degradation — ensuring the system recovers from failures automatically."
  },
  {
    id: 384,
    domain: "Cloud Concepts",
    question: "A company is evaluating PaaS offerings. Their developers want to write Python code and deploy it without configuring servers, load balancers, or auto-scaling policies. The platform should handle capacity provisioning, patching, and monitoring automatically. Which AWS service fits this PaaS model?",
    choices: [
      "Amazon EC2",
      "AWS Lambda",
      "AWS Elastic Beanstalk",
      "Amazon ECS"
    ],
    correctAnswer: 2,
    explanation: "AWS Elastic Beanstalk is a PaaS that handles deployment, capacity provisioning, load balancing, auto-scaling, and health monitoring automatically. Developers upload their Python (or Java, .NET, Node.js, etc.) application code, and Beanstalk manages the rest. You retain full control of the underlying resources if needed."
  },
  {
    id: 385,
    domain: "Cloud Concepts",
    question: "A company currently buys software licenses, installs them on servers, and manages version upgrades themselves. They're considering switching to a model where the vendor hosts the software, manages all updates, and they simply access it through a browser. What transition in cloud service models does this describe?",
    choices: [
      "Moving from IaaS to PaaS",
      "Moving from on-premises to SaaS",
      "Moving from PaaS to FaaS",
      "Moving from SaaS to IaaS"
    ],
    correctAnswer: 1,
    explanation: "Moving from self-managed licensed software (on-premises) to vendor-hosted browser-accessible software is a transition to SaaS. With SaaS, the vendor manages everything — infrastructure, platform, application code, and updates. The customer simply uses the software through a web browser."
  },
  {
    id: 386,
    domain: "Cloud Concepts",
    question: "A CIO needs to justify cloud migration to their board. The board is concerned about security, since the company's data will be 'on someone else's computers.' The CIO explains that AWS invests billions annually in security, employs thousands of security engineers, and holds more security certifications than any single company could achieve. Which cloud advantage addresses the board's concern?",
    choices: [
      "Trade capital expense for variable expense",
      "Benefit from massive economies of scale — including security investment",
      "Stop guessing capacity",
      "Go global in minutes"
    ],
    correctAnswer: 1,
    explanation: "Economies of scale extend beyond pricing to security investment. AWS's massive scale allows them to invest billions in security infrastructure, employ dedicated security teams, and maintain certifications (SOC, ISO, FedRAMP, etc.) at a level no individual company could match — making cloud security potentially stronger than most on-premises environments."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 387,
    domain: "Security and Compliance",
    question: "A company's developers frequently create EC2 instances with overly permissive security groups that allow SSH (port 22) from 0.0.0.0/0 (anywhere). The security team wants to automatically detect and remediate this — closing port 22 to the world whenever it's detected. Which combination of services enables this automated detection and remediation?",
    choices: [
      "CloudTrail and SNS",
      "GuardDuty and Lambda",
      "AWS Config rule with auto-remediation via Systems Manager",
      "Trusted Advisor and CloudWatch"
    ],
    correctAnswer: 2,
    explanation: "AWS Config can evaluate security group rules against a managed rule (like 'restricted-ssh') that flags groups allowing SSH from 0.0.0.0/0. When non-compliance is detected, Config triggers an automatic remediation action via AWS Systems Manager Automation to modify the security group — closing the overly permissive rule without manual intervention."
  },
  {
    id: 388,
    domain: "Security and Compliance",
    question: "A company is setting up a new AWS account. The security team provides a checklist: (1) Enable MFA on the root account, (2) Create an admin IAM user instead of using root, (3) Enable CloudTrail in all Regions, (4) Configure a strong password policy. Under the shared responsibility model, are these the customer's or AWS's responsibility?",
    choices: [
      "AWS's responsibility — they should configure these by default",
      "The customer's responsibility — these are 'security in the cloud' tasks",
      "Shared equally between AWS and the customer",
      "It depends on the AWS Support plan purchased"
    ],
    correctAnswer: 1,
    explanation: "All four items are the customer's responsibility under the shared responsibility model. AWS provides the tools (IAM, MFA, CloudTrail, password policies) but the customer must configure and enable them. These are 'security in the cloud' tasks — AWS secures the underlying infrastructure ('security of the cloud') but account-level configuration is on the customer."
  },
  {
    id: 389,
    domain: "Security and Compliance",
    question: "A company processes credit card payments and must comply with PCI DSS. They need to isolate their payment processing environment from their general-purpose workloads in AWS. Which AWS networking feature allows them to create a logically isolated section of the AWS Cloud for the payment system?",
    choices: [
      "AWS Direct Connect",
      "Amazon VPC (Virtual Private Cloud)",
      "Amazon CloudFront",
      "AWS Global Accelerator"
    ],
    correctAnswer: 1,
    explanation: "Amazon VPC lets you create a logically isolated network within AWS where you control IP addressing, subnets, routing, and security. The company can create a dedicated VPC for payment processing with strict network ACLs and security groups, completely isolated from their general-purpose workloads — a common PCI DSS compliance pattern."
  },
  {
    id: 390,
    domain: "Security and Compliance",
    question: "A company allows employees to use their corporate Active Directory credentials to sign into multiple AWS accounts and third-party SaaS applications without separate passwords for each. Which AWS service provides this single sign-on capability?",
    choices: [
      "Amazon Cognito",
      "AWS IAM Identity Center (formerly AWS SSO)",
      "AWS Directory Service",
      "IAM users with federated access"
    ],
    correctAnswer: 1,
    explanation: "AWS IAM Identity Center (formerly AWS SSO) provides single sign-on access to multiple AWS accounts and business applications using existing corporate credentials from Active Directory or other identity providers. Employees sign in once and can access all their assigned AWS accounts and applications without additional passwords."
  },
  {
    id: 391,
    domain: "Security and Compliance",
    question: "A company wants to ensure that all data in transit between their users and their Application Load Balancer is encrypted. They need to obtain and manage SSL/TLS certificates for their domain. Which AWS service provides free SSL/TLS certificates that automatically renew?",
    choices: [
      "AWS KMS",
      "AWS CloudHSM",
      "AWS Certificate Manager (ACM)",
      "AWS Secrets Manager"
    ],
    correctAnswer: 2,
    explanation: "AWS Certificate Manager (ACM) provisions, manages, and deploys free public SSL/TLS certificates for use with AWS services like ALB, CloudFront, and API Gateway. ACM handles automatic renewal, eliminating the operational overhead of manual certificate management and the risk of expired certificates causing outages."
  },
  {
    id: 392,
    domain: "Security and Compliance",
    question: "A company grants their junior developer an IAM policy that allows full S3 access. They also attach a permissions boundary that only permits actions on buckets prefixed with 'dev-'. When the developer tries to access a production bucket named 'prod-data', access is denied. Why?",
    choices: [
      "The S3 bucket policy is blocking access",
      "The permissions boundary limits the maximum permissions — the effective permission is the intersection of the IAM policy and the boundary",
      "The developer's MFA token has expired",
      "S3 requires a separate resource-based policy for cross-account access"
    ],
    correctAnswer: 1,
    explanation: "IAM permissions boundaries set the maximum permissions an IAM entity can have. The effective permissions are the intersection of the identity-based policy (full S3 access) and the permissions boundary (only 'dev-*' buckets). Since 'prod-data' falls outside the boundary, the action is denied — even though the IAM policy allows it."
  },
  {
    id: 393,
    domain: "Security and Compliance",
    question: "After a security breach investigation, a company wants to understand the full scope of the attack — which resources were affected, how the attacker moved laterally between services, and the timeline of all related events. Which AWS service helps security teams investigate and visualize these complex security findings?",
    choices: [
      "Amazon GuardDuty",
      "AWS CloudTrail",
      "Amazon Detective",
      "AWS Security Hub"
    ],
    correctAnswer: 2,
    explanation: "Amazon Detective automatically collects log data from AWS resources and uses machine learning, statistical analysis, and graph theory to build interactive visualizations. It helps security teams investigate the root cause, scope, and timeline of security findings — tracing how an attacker moved across resources and services."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 394,
    domain: "Cloud Technology and Services",
    question: "A company wants to deliver their single-page React application to users globally with low latency. The app consists entirely of static files (HTML, CSS, JavaScript) with no server-side rendering. Which is the most cost-effective and performant hosting solution?",
    choices: [
      "EC2 instances in multiple Regions behind Route 53",
      "Amazon S3 static website hosting with CloudFront distribution",
      "AWS Elastic Beanstalk with multi-Region deployment",
      "Amazon ECS with Fargate in each Region"
    ],
    correctAnswer: 1,
    explanation: "Hosting static files in S3 with CloudFront as the CDN is the standard, most cost-effective approach for single-page applications. S3 stores the files durably at low cost, CloudFront caches them at 400+ global edge locations for low-latency delivery, and there are no servers to manage or scale."
  },
  {
    id: 395,
    domain: "Cloud Technology and Services",
    question: "A company has an application that processes customer orders. Each order goes through 5 sequential steps: validate payment, check inventory, reserve stock, generate invoice, and send confirmation email. If any step fails, the entire process must be rolled back. Which AWS service orchestrates these steps as a serverless workflow?",
    choices: [
      "Amazon SQS",
      "AWS Step Functions",
      "Amazon EventBridge",
      "AWS Batch"
    ],
    correctAnswer: 1,
    explanation: "AWS Step Functions is a serverless orchestration service that coordinates multiple AWS services into workflows with defined steps, branching logic, error handling, and retries. It's ideal for sequential processes like order processing where each step depends on the previous one and failures require rollback logic."
  },
  {
    id: 396,
    domain: "Cloud Technology and Services",
    question: "A company needs to stream live video of their annual conference to 50,000 concurrent viewers worldwide with adaptive bitrate streaming. Which combination of AWS services handles live video ingestion and global delivery?",
    choices: [
      "Amazon S3 and CloudFront",
      "AWS Elemental MediaLive for live encoding and CloudFront for global delivery",
      "Amazon Kinesis Video Streams and API Gateway",
      "EC2 instances running FFmpeg behind an ALB"
    ],
    correctAnswer: 1,
    explanation: "AWS Elemental MediaLive is a broadcast-grade live video encoding service that ingests live video feeds and produces adaptive bitrate streams. Combined with CloudFront for global content delivery, it can reliably stream to tens of thousands of concurrent viewers with low latency and multiple quality levels."
  },
  {
    id: 397,
    domain: "Cloud Technology and Services",
    question: "A financial services company must retain 7 years of transaction records in a format that cannot be modified or deleted by anyone — including administrators. The data is rarely accessed but must be available within 12 hours when needed for regulatory audits. Which S3 configuration meets these requirements?",
    choices: [
      "S3 Standard with versioning enabled",
      "S3 Glacier Deep Archive with S3 Object Lock in Compliance mode",
      "S3 Standard-IA with lifecycle policies",
      "S3 One Zone-IA with MFA Delete"
    ],
    correctAnswer: 1,
    explanation: "S3 Object Lock in Compliance mode prevents objects from being deleted or overwritten by anyone, including the root account, for a specified retention period. Combined with Glacier Deep Archive (lowest cost, 12-48 hour retrieval), this provides immutable, tamper-proof storage for regulatory compliance at minimal cost."
  },
  {
    id: 398,
    domain: "Cloud Technology and Services",
    question: "A company wants to run Apache Spark jobs to process 10 TB of data for their weekly analytics pipeline. They need a managed Hadoop/Spark cluster that can be launched, run the job, and then terminated to save costs. Which AWS service provides managed big data clusters?",
    choices: [
      "Amazon Athena",
      "Amazon Redshift",
      "Amazon EMR",
      "AWS Glue"
    ],
    correctAnswer: 2,
    explanation: "Amazon EMR (Elastic MapReduce) provides managed Hadoop and Spark clusters. You can launch a cluster, run your Spark job against the 10 TB dataset, and terminate the cluster when done — paying only for the time the cluster runs. EMR supports transient clusters optimized for batch processing use cases."
  },
  {
    id: 399,
    domain: "Cloud Technology and Services",
    question: "A company wants their application to respond to events from multiple AWS services — such as EC2 state changes, S3 uploads, and scheduled cron jobs — and route those events to Lambda functions, SQS queues, or Step Functions workflows. Which service provides this centralized event routing?",
    choices: [
      "Amazon SNS",
      "Amazon EventBridge",
      "Amazon SQS",
      "AWS CloudTrail"
    ],
    correctAnswer: 1,
    explanation: "Amazon EventBridge (formerly CloudWatch Events) is a serverless event bus that receives events from AWS services, SaaS apps, and custom applications, then routes them to targets based on rules. It supports scheduled rules (cron), pattern matching, and over 20 target types including Lambda, SQS, and Step Functions."
  },
  {
    id: 400,
    domain: "Cloud Technology and Services",
    question: "A company's application requires ultra-low latency TCP connections — their trading platform needs sub-millisecond static IP-based routing and handles millions of connections per second. They need a load balancer that operates at Layer 4 (TCP/UDP). Which load balancer should they use?",
    choices: [
      "Application Load Balancer",
      "Classic Load Balancer",
      "Gateway Load Balancer",
      "Network Load Balancer"
    ],
    correctAnswer: 3,
    explanation: "Network Load Balancer (NLB) operates at Layer 4 (TCP/UDP/TLS) and is designed for ultra-high performance — handling millions of requests per second with ultra-low latency. It provides static IP addresses per AZ and is optimized for TCP traffic patterns like trading platforms, gaming, and IoT."
  },
  {
    id: 401,
    domain: "Cloud Technology and Services",
    question: "A company wants to add speech-to-text capability to their call center application, automatically transcribing customer phone calls in real-time for compliance recording and sentiment analysis. Which AWS service converts speech to text?",
    choices: [
      "Amazon Polly",
      "Amazon Translate",
      "Amazon Transcribe",
      "Amazon Comprehend"
    ],
    correctAnswer: 2,
    explanation: "Amazon Transcribe is an automatic speech recognition (ASR) service that converts speech to text. It supports real-time transcription and batch processing, with features like custom vocabulary, speaker identification, and automatic punctuation — ideal for call center transcription and compliance recording."
  },
  {
    id: 402,
    domain: "Cloud Technology and Services",
    question: "A company wants to deploy third-party firewall and intrusion detection appliances that inspect all traffic entering and leaving their VPC. They need a load balancer that transparently inserts these virtual appliances into the traffic flow. Which load balancer is designed for this?",
    choices: [
      "Application Load Balancer",
      "Network Load Balancer",
      "Gateway Load Balancer",
      "Classic Load Balancer"
    ],
    correctAnswer: 2,
    explanation: "Gateway Load Balancer (GWLB) is specifically designed to deploy, scale, and manage third-party virtual network appliances (firewalls, IDS/IPS, deep packet inspection). It transparently inserts appliances into the network path using GENEVE encapsulation, so all VPC traffic flows through inspection appliances."
  },
  {
    id: 403,
    domain: "Cloud Technology and Services",
    question: "A company needs a fully managed document database that is compatible with MongoDB workloads. Their existing application uses the MongoDB API and drivers, and they don't want to change their application code. Which AWS database service provides this MongoDB compatibility?",
    choices: [
      "Amazon DynamoDB",
      "Amazon Aurora",
      "Amazon DocumentDB",
      "Amazon Neptune"
    ],
    correctAnswer: 2,
    explanation: "Amazon DocumentDB (with MongoDB compatibility) is a fully managed document database that is compatible with the MongoDB API and drivers. Existing MongoDB applications can connect to DocumentDB with minimal code changes, while benefiting from managed scaling, backups, and high availability."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 404,
    domain: "Billing, Pricing and Support",
    question: "A company wants to rightsize their EC2 instances — some instances are over-provisioned (paying for more CPU/memory than needed) and some are under-provisioned (causing performance issues). Which AWS service analyzes historical utilization and recommends optimal instance types?",
    choices: [
      "AWS Trusted Advisor",
      "AWS Compute Optimizer",
      "AWS Cost Explorer",
      "Amazon CloudWatch"
    ],
    correctAnswer: 1,
    explanation: "AWS Compute Optimizer uses machine learning to analyze historical utilization metrics and recommend optimal AWS compute resources. It identifies over-provisioned and under-provisioned EC2 instances, Auto Scaling groups, EBS volumes, and Lambda functions — recommending the right instance type and size to balance cost and performance."
  },
  {
    id: 405,
    domain: "Billing, Pricing and Support",
    question: "A company is setting up a multi-account AWS environment with best-practice guardrails. They want pre-configured organizational units, mandatory security controls, centralized logging, and a landing zone — all set up automatically following AWS best practices. Which service provides this automated multi-account setup?",
    choices: [
      "AWS Organizations",
      "AWS Control Tower",
      "AWS CloudFormation StackSets",
      "AWS Service Catalog"
    ],
    correctAnswer: 1,
    explanation: "AWS Control Tower automates the setup of a secure, well-architected multi-account AWS environment (landing zone). It configures AWS Organizations, creates organizational units, enables mandatory guardrails (preventive and detective), sets up centralized logging in a dedicated account, and provides a dashboard to monitor compliance."
  },
  {
    id: 406,
    domain: "Billing, Pricing and Support",
    question: "A company wants to estimate the cost savings of migrating their on-premises workloads to AWS. They need a tool that models their current infrastructure costs (servers, storage, networking, labor) and compares them against equivalent AWS services. Which tool helps build this business case?",
    choices: [
      "AWS Pricing Calculator",
      "AWS Migration Evaluator (formerly TSO Logic)",
      "AWS Cost Explorer",
      "AWS Budgets"
    ],
    correctAnswer: 1,
    explanation: "AWS Migration Evaluator (formerly TSO Logic) analyzes on-premises workloads, builds an inventory of your current infrastructure, and projects what those workloads would cost on AWS. It generates a business case with TCO comparisons, helping organizations understand the financial impact of migration before committing."
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
