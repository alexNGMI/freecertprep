const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 432,
    domain: "Cloud Concepts",
    question: "A company's operations team manually deploys application updates by SSHing into servers, running scripts, and hoping nothing breaks. Deployments take 4 hours and frequently cause outages. Their architect recommends automating deployments, infrastructure provisioning, and incident response using code and runbooks. Which Well-Architected pillar focuses on this operational automation?",
    choices: [
      "Operational Excellence",
      "Reliability",
      "Performance Efficiency",
      "Cost Optimization"
    ],
    correctAnswer: 0,
    explanation: "The Operational Excellence pillar focuses on running and monitoring systems to deliver business value and continually improving supporting processes and procedures. Key practices include automating deployments, defining runbooks and playbooks, treating operations as code, and learning from operational failures to continuously improve."
  },
  {
    id: 433,
    domain: "Cloud Concepts",
    question: "A company's monolithic application has a database component, a web tier, and a processing tier all tightly coupled. If the processing tier slows down, it causes the entire application to degrade. An architect recommends decoupling these components using queues so each tier can scale and fail independently. Which architecture design principle does this implement?",
    choices: [
      "Vertical scaling",
      "Loosely coupled architecture",
      "Single points of failure elimination",
      "Caching layer implementation"
    ],
    correctAnswer: 1,
    explanation: "Loosely coupled architecture means components interact through well-defined interfaces (like message queues) rather than direct dependencies. If the processing tier slows down, messages queue up without impacting the web tier. Each component can scale independently, fail without cascading, and be replaced without affecting others."
  },
  {
    id: 434,
    domain: "Cloud Concepts",
    question: "An architect is designing a system that automatically detects and replaces unhealthy EC2 instances, retries failed operations with exponential backoff, and uses multi-AZ deployments. The goal is that the system heals itself without human intervention. Which design principle does this represent?",
    choices: [
      "Design for cost optimization",
      "Design for performance",
      "Design for failure and self-healing",
      "Design for compliance"
    ],
    correctAnswer: 2,
    explanation: "Designing for failure means accepting that components WILL fail and building systems that detect failures, automatically recover, and minimize human intervention. Auto Scaling that replaces unhealthy instances, retries with exponential backoff, and multi-AZ deployments are all self-healing mechanisms — a core cloud architecture principle."
  },
  {
    id: 435,
    domain: "Cloud Concepts",
    question: "A media streaming company serves the same video content to millions of users globally. Instead of streaming directly from a single origin server for every request, they want to serve content from servers physically near each user. Which cloud technology pattern reduces latency and origin load for globally distributed content?",
    choices: [
      "Vertical scaling the origin server",
      "Deploying to multiple AWS Regions",
      "Content Delivery Network (CDN) caching at edge locations",
      "Using larger EC2 instances"
    ],
    correctAnswer: 2,
    explanation: "A CDN caches content at geographically distributed edge locations. When a user requests a video, it's served from the nearest edge location rather than the distant origin server — reducing latency, improving throughput, and offloading traffic from the origin. Amazon CloudFront is AWS's CDN service implementing this pattern."
  },
  {
    id: 436,
    domain: "Cloud Concepts",
    question: "A company wants to evaluate their cloud architecture against AWS best practices across five pillars: Operational Excellence, Security, Reliability, Performance Efficiency, and Cost Optimization. They want structured guidance and questions to identify areas for improvement. Which AWS tool facilitates this review?",
    choices: [
      "AWS Trusted Advisor",
      "AWS Well-Architected Tool",
      "AWS Config",
      "AWS Control Tower"
    ],
    correctAnswer: 1,
    explanation: "The AWS Well-Architected Tool provides a consistent process for reviewing architectures against the six pillars of the Well-Architected Framework (including Sustainability). It asks a series of questions about your workload, identifies high-risk issues, and provides improvement recommendations with prioritized guidance."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 437,
    domain: "Security and Compliance",
    question: "A company in Account A needs to allow an application in Account B to read objects from an S3 bucket in Account A. The connection must be secure and no long-term credentials should be shared between accounts. What is the AWS-recommended approach?",
    choices: [
      "Create an IAM user in Account A and share the access keys with Account B",
      "Make the S3 bucket public so Account B can access it",
      "Create an IAM role in Account A with a trust policy allowing Account B to assume it",
      "Copy the S3 objects to a bucket in Account B"
    ],
    correctAnswer: 2,
    explanation: "Cross-account access via IAM roles is the AWS best practice. Create a role in Account A with S3 read permissions and a trust policy that allows Account B's principal to assume it. Account B's application calls sts:AssumeRole to get temporary credentials scoped to that role — no long-term keys are shared between accounts."
  },
  {
    id: 438,
    domain: "Security and Compliance",
    question: "A company stores private documents in S3 that should never be publicly accessible. However, they need to allow authenticated customers to download their own documents temporarily via a link that expires after 15 minutes. Which S3 feature enables this without making the bucket public?",
    choices: [
      "S3 pre-signed URLs",
      "S3 static website hosting",
      "S3 bucket policy with IP restrictions",
      "S3 CORS configuration"
    ],
    correctAnswer: 0,
    explanation: "S3 pre-signed URLs grant time-limited access to a specific private S3 object. The URL is generated server-side using the application's credentials and includes an expiration time (e.g., 15 minutes). Anyone with the URL can access the object until it expires — without the bucket needing any public access permissions."
  },
  {
    id: 439,
    domain: "Security and Compliance",
    question: "A company is planning a major product launch on AWS that will involve 10x normal traffic for 3 days. They want AWS infrastructure and support engineers involved in advance to help ensure the event goes smoothly. Which AWS Support feature provides this proactive guidance for planned events?",
    choices: [
      "AWS Personal Health Dashboard",
      "Infrastructure Event Management (IEM)",
      "AWS Trusted Advisor",
      "AWS Concierge Support"
    ],
    correctAnswer: 1,
    explanation: "Infrastructure Event Management (IEM) is an AWS Support feature (included with Enterprise Support, available for a fee with Business Support) where AWS provides architectural and operational guidance for specific events like product launches, migrations, and marketing campaigns — helping ensure infrastructure scales successfully."
  },
  {
    id: 440,
    domain: "Security and Compliance",
    question: "A company needs to allow specific AWS services (like Lambda and EC2) to perform actions on their behalf — for example, Lambda needs to write logs to CloudWatch and read from DynamoDB. Creating IAM users for each service would be insecure. What should they use instead?",
    choices: [
      "Root account credentials passed as environment variables",
      "Shared IAM user credentials stored in Parameter Store",
      "IAM service roles with appropriate permissions attached to the services",
      "Public API keys generated per service"
    ],
    correctAnswer: 2,
    explanation: "IAM service roles define what AWS services are permitted to do on your behalf. A Lambda execution role with CloudWatch Logs write permissions and DynamoDB read permissions allows Lambda to perform exactly those actions using temporary, automatically rotated credentials — no shared credentials, no hardcoded keys."
  },
  {
    id: 441,
    domain: "Security and Compliance",
    question: "A company's EC2 instance needs access to an SSM Parameter Store value containing a database connection string. The parameter is encrypted with KMS. The instance has an IAM role. Which TWO permissions must the IAM role have to successfully retrieve this encrypted parameter?",
    choices: [
      "ssm:GetParameter permission AND kms:Decrypt permission for the KMS key",
      "s3:GetObject permission AND kms:GenerateDataKey permission",
      "ssm:PutParameter permission AND kms:Encrypt permission",
      "ec2:DescribeInstances permission AND ssm:StartSession permission"
    ],
    correctAnswer: 0,
    explanation: "To retrieve an encrypted SSM Parameter Store value, the IAM role needs: (1) ssm:GetParameter to retrieve the parameter value, and (2) kms:Decrypt permission on the specific KMS key used to encrypt it. Without both, the call fails — either the parameter can't be fetched or the encrypted value can't be decrypted."
  },
  {
    id: 442,
    domain: "Security and Compliance",
    question: "A company recently adopted AWS and wants to understand their overall security health across all AWS accounts. They want aggregated findings from GuardDuty, Inspector, and Macie, plus automated checks against CIS AWS Foundations Benchmark, displayed in a single pane of glass. Which service provides this unified view?",
    choices: [
      "AWS CloudTrail",
      "Amazon Detective",
      "AWS Security Hub",
      "Amazon GuardDuty"
    ],
    correctAnswer: 2,
    explanation: "AWS Security Hub aggregates and normalizes security findings from multiple AWS services (GuardDuty, Inspector, Macie, Firewall Manager) and runs automated compliance checks against security standards like CIS AWS Foundations Benchmark and PCI DSS — providing a unified security posture dashboard across accounts."
  },
  {
    id: 443,
    domain: "Security and Compliance",
    question: "A developer accidentally committed AWS access keys to a public GitHub repository. The keys were exposed for approximately 2 minutes before being revoked. Which service would have AUTOMATICALLY detected the unauthorized use of those keys the moment someone tried to use them from an unknown IP address?",
    choices: [
      "AWS Config",
      "AWS CloudTrail",
      "Amazon GuardDuty",
      "AWS Trusted Advisor"
    ],
    correctAnswer: 2,
    explanation: "Amazon GuardDuty continuously analyzes CloudTrail logs and detects anomalies like API calls from unusual IP addresses, TOR exit nodes, or known malicious IPs. Within seconds of a threat actor using the exposed credentials, GuardDuty would generate a finding like 'UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration' and trigger an alert."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 444,
    domain: "Cloud Technology and Services",
    question: "A company has microservices deployed across multiple AWS services. When a request fails, they can't determine which service in the chain caused it. They need to trace requests end-to-end across Lambda, API Gateway, and DynamoDB to identify bottlenecks and errors. Which AWS service provides this distributed tracing?",
    choices: [
      "Amazon CloudWatch",
      "AWS X-Ray",
      "AWS CloudTrail",
      "Amazon Inspector"
    ],
    correctAnswer: 1,
    explanation: "AWS X-Ray provides distributed tracing for applications. It tracks requests as they travel through all components of your application, visualizes the service map showing latency and errors at each hop, and helps identify bottlenecks in complex microservice architectures — showing exactly which service in the chain is failing or slow."
  },
  {
    id: 445,
    domain: "Cloud Technology and Services",
    question: "A company needs to connect multiple VPCs across different AWS accounts and Regions so they can communicate with each other and with their on-premises network. They have 20 VPCs and point-to-point VPC peering would require 190 individual peering connections. Which AWS service simplifies this hub-and-spoke connectivity?",
    choices: [
      "VPC peering",
      "AWS PrivateLink",
      "AWS Transit Gateway",
      "AWS Direct Connect"
    ],
    correctAnswer: 2,
    explanation: "AWS Transit Gateway acts as a cloud router — a central hub that connects VPCs across accounts and Regions, plus on-premises networks. Each VPC connects to the Transit Gateway once, and it handles routing between all connected networks. This replaces the 190 peering connections with 20 single attachments."
  },
  {
    id: 446,
    domain: "Cloud Technology and Services",
    question: "A company's DynamoDB table handles 10 million reads per day. 80% of reads are for the same 1,000 hot items that change infrequently. DynamoDB costs are increasing and response times vary. Which AWS service provides a purpose-built in-memory cache specifically for DynamoDB with microsecond latency?",
    choices: [
      "Amazon ElastiCache for Redis",
      "Amazon ElastiCache for Memcached",
      "Amazon DynamoDB Accelerator (DAX)",
      "Amazon MemoryDB for Redis"
    ],
    correctAnswer: 2,
    explanation: "DynamoDB Accelerator (DAX) is a fully managed, in-memory cache specifically designed for DynamoDB. It provides microsecond read latency for hot items, is API-compatible with DynamoDB (no application code changes needed), and handles the caching layer entirely — reducing DynamoDB read costs and response time variability."
  },
  {
    id: 447,
    domain: "Cloud Technology and Services",
    question: "A company wants to build a CI/CD pipeline where code commits automatically trigger: (1) build and unit tests, (2) container image creation, (3) deployment to a staging environment, and (4) manual approval before production deployment. Which combination of AWS services implements this pipeline?",
    choices: [
      "AWS CloudFormation and AWS Config",
      "AWS CodePipeline, AWS CodeBuild, and AWS CodeDeploy",
      "AWS Elastic Beanstalk and AWS Lambda",
      "Amazon EC2 and AWS Systems Manager"
    ],
    correctAnswer: 1,
    explanation: "AWS CodePipeline orchestrates the workflow (source → build → test → deploy stages with manual approval gates). CodeBuild compiles code, runs tests, and builds container images. CodeDeploy handles deployment to EC2, ECS, Lambda, or on-premises targets. Together they form a complete, automated CI/CD pipeline."
  },
  {
    id: 448,
    domain: "Cloud Technology and Services",
    question: "A company has a DynamoDB table accessed by users in the US and Japan. Users in Japan experience high latency reading data that originates in us-east-1. They need the table to be readable and writable in both Regions with automatic data replication. Which DynamoDB feature enables this?",
    choices: [
      "DynamoDB Streams",
      "DynamoDB Global Tables",
      "DynamoDB on-demand capacity",
      "DynamoDB read replicas"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB Global Tables replicate your DynamoDB table across multiple AWS Regions automatically. Each Region has a fully writable replica with sub-second replication. US users read/write from us-east-1 and Japanese users from ap-northeast-1 — both with low-latency local access and eventual global consistency."
  },
  {
    id: 449,
    domain: "Cloud Technology and Services",
    question: "A company stores frequently accessed files for the first 30 days after upload, but doesn't know the access patterns after that — some files may be accessed weekly, others may never be accessed again. They want automatic cost optimization without managing lifecycle rules manually. Which S3 storage class handles this automatically?",
    choices: [
      "S3 Standard-IA",
      "S3 One Zone-IA",
      "S3 Intelligent-Tiering",
      "S3 Glacier Instant Retrieval"
    ],
    correctAnswer: 2,
    explanation: "S3 Intelligent-Tiering automatically moves objects between access tiers based on changing access patterns — no manual lifecycle rules required. Objects not accessed for 30 days move to the infrequent access tier. Objects not accessed for 90 days move to the archive instant access tier. When accessed, objects move back immediately. No retrieval fees."
  },
  {
    id: 450,
    domain: "Cloud Technology and Services",
    question: "A company runs a web application where most database queries are identical SELECT statements that run thousands of times per minute against the same data. The RDS database is overwhelmed with read traffic. They want to offload repetitive read queries without changing the application's SQL. Which AWS service achieves this?",
    choices: [
      "Amazon DynamoDB",
      "Amazon Redshift",
      "Amazon ElastiCache (Memcached or Redis) as a query cache",
      "RDS read replicas pointed to by the application"
    ],
    correctAnswer: 2,
    explanation: "ElastiCache (Memcached or Redis) acts as a caching layer in front of RDS. The application first checks the cache for a query result; on a cache hit, the result is returned without touching the database. This dramatically reduces RDS read load for repetitive identical queries, improving performance and reducing database costs."
  },
  {
    id: 451,
    domain: "Cloud Technology and Services",
    question: "An e-commerce company needs to notify multiple downstream services when a new order is placed: inventory must be decremented, the shipping system must be triggered, and a notification email must be sent. Each consumer operates at its own pace. Which messaging pattern using AWS services best handles this?",
    choices: [
      "A single SQS queue that all three consumers poll simultaneously",
      "SNS topic with three SQS queues subscribed — fan-out pattern",
      "Direct Lambda invocations for each downstream service",
      "A single Lambda function that calls all three services synchronously"
    ],
    correctAnswer: 1,
    explanation: "The SNS-to-SQS fan-out pattern publishes one message to an SNS topic, which simultaneously delivers it to three separate SQS queues (one per consumer). Each consumer (inventory, shipping, email) processes messages from its own queue at its own pace, independently. This decouples services and ensures no message is missed if a consumer is temporarily unavailable."
  },
  {
    id: 452,
    domain: "Cloud Technology and Services",
    question: "A company wants to patch operating systems, manage software inventory, and run automation runbooks across a fleet of 500 EC2 instances without SSH-ing into each server individually. They need a single service for fleet-wide management. Which AWS service provides this?",
    choices: [
      "AWS OpsWorks",
      "AWS Systems Manager",
      "AWS Config",
      "Amazon EC2 Auto Scaling"
    ],
    correctAnswer: 1,
    explanation: "AWS Systems Manager provides operational management for EC2 instances and on-premises servers at scale. Patch Manager automates OS patching, Inventory collects software/configuration data, Run Command executes scripts fleet-wide without SSH, and Automation runs multi-step runbooks — all from a single console without direct server access."
  },
  {
    id: 453,
    domain: "Cloud Technology and Services",
    question: "A company is migrating file-based workloads from on-premises NAS storage to AWS. They need to synchronize data between on-premises storage and Amazon S3 or Amazon EFS during migration, and then keep them in sync until cutover. Which AWS service automates this data transfer and synchronization?",
    choices: [
      "AWS Snowball",
      "AWS DataSync",
      "AWS Storage Gateway",
      "AWS Transfer Family"
    ],
    correctAnswer: 1,
    explanation: "AWS DataSync is an online data transfer service that automates moving data between on-premises storage and AWS services (S3, EFS, FSx). It handles scheduling, monitoring, data integrity validation, and bandwidth throttling — designed for both one-time migrations and ongoing synchronization until cutover."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 454,
    domain: "Billing, Pricing and Support",
    question: "A company has a steady workload running on 10 EC2 instances continuously for the past year. They've been paying On-Demand pricing. Their cloud architect notes that Reserved Instances could save up to 72%. The workload runs on a fixed instance type in a fixed Region. Which Reserved Instance type provides the deepest discount with the lowest flexibility?",
    choices: [
      "Convertible Reserved Instances (1-year, no upfront)",
      "Standard Reserved Instances (3-year, all upfront)",
      "Scheduled Reserved Instances",
      "On-Demand Capacity Reservations"
    ],
    correctAnswer: 1,
    explanation: "Standard Reserved Instances with a 3-year, all-upfront payment provide the deepest discount (up to 72% off On-Demand). The trade-off is the least flexibility — you commit to a specific instance type, Region, and 3-year term. Convertible RIs offer more flexibility (can change instance family) but at a smaller discount."
  },
  {
    id: 455,
    domain: "Billing, Pricing and Support",
    question: "A company transfers data between their EC2 instances and S3 bucket within the same AWS Region. Their architect assumed this would be free, but they received unexpected data transfer charges. Under AWS pricing, when does data transfer incur costs?",
    choices: [
      "All data transfer within AWS is always free",
      "Data transfer between EC2 and S3 within the same Region is free; cross-Region or internet-bound transfer incurs charges",
      "Data transfer is always charged regardless of source and destination",
      "Only uploads to S3 are charged; downloads are free"
    ],
    correctAnswer: 1,
    explanation: "AWS data transfer pricing: IN to AWS is always free. EC2 to S3 within the same Region is free. Cross-Region data transfer (e.g., us-east-1 to eu-west-1) is charged. Data transfer OUT to the internet is charged per GB. Data transfer between AZs within a Region also incurs charges for EC2. Understanding these rules prevents billing surprises."
  },
  {
    id: 456,
    domain: "Billing, Pricing and Support",
    question: "A company wants to purchase compute capacity commitments that give them discounts regardless of instance family, size, OS, or Region. They want flexibility to change instance types without losing their discount. Which AWS pricing model provides this?",
    choices: [
      "Standard Reserved Instances",
      "Spot Instances",
      "Compute Savings Plans",
      "Dedicated Hosts"
    ],
    correctAnswer: 2,
    explanation: "Compute Savings Plans provide up to 66% discount over On-Demand in exchange for a commitment to a consistent amount of compute usage ($/hour) for 1 or 3 years. Unlike Standard RIs, Compute Savings Plans automatically apply to any EC2 instance family, size, OS, tenancy, and Region — and also cover Fargate and Lambda."
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
