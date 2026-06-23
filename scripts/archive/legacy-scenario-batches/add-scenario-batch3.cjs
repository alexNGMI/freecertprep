const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 332,
    domain: "Cloud Concepts",
    question: "A software company currently takes 6 weeks to provision new development environments because they must order hardware, rack servers, install operating systems, and configure networking. After moving to AWS, they want to reduce this to minutes. Which cloud benefit enables this dramatic improvement?",
    choices: [
      "Massive economies of scale",
      "Increase speed and agility",
      "Go global in minutes",
      "High availability"
    ],
    correctAnswer: 1,
    explanation: "Increase speed and agility is a core cloud advantage — AWS provides on-demand access to a broad range of technologies so teams can provision resources in minutes instead of weeks. This accelerates experimentation and reduces the time from idea to implementation."
  },
  {
    id: 333,
    domain: "Cloud Concepts",
    question: "A media company is evaluating whether to run their video processing workload on AWS. Their CTO estimates they would need 200 servers to handle peak load. AWS can offer those servers at a much lower per-unit cost than the company could achieve by buying 200 servers themselves. Which cloud advantage explains this pricing difference?",
    choices: [
      "Trade capital expense for variable expense",
      "Stop guessing capacity",
      "Benefit from massive economies of scale",
      "Increase speed and agility"
    ],
    correctAnswer: 2,
    explanation: "Because AWS aggregates usage from hundreds of thousands of customers, they achieve higher economies of scale than any single company could on their own. These savings are passed on as lower per-unit pricing — a fundamental economic advantage of the cloud model."
  },
  {
    id: 334,
    domain: "Cloud Concepts",
    question: "A bank is migrating to AWS but must keep their core transaction processing system on-premises for regulatory reasons. They want their on-premises system to communicate securely with analytics workloads running in AWS. Which cloud deployment model describes this architecture?",
    choices: [
      "Public cloud",
      "Private cloud",
      "Multi-cloud",
      "Hybrid cloud"
    ],
    correctAnswer: 3,
    explanation: "A hybrid cloud deployment combines on-premises infrastructure (or a private cloud) with public cloud resources. The bank keeps regulated workloads on-premises while running analytics in AWS, with secure connectivity between the two environments — a common pattern for regulated industries."
  },
  {
    id: 335,
    domain: "Cloud Concepts",
    question: "A company deployed a web application expecting 1,000 daily users, but a viral social media post brought 500,000 users overnight. Their Auto Scaling group added EC2 instances automatically to handle the load, then scaled back down three days later when traffic normalized. Which TWO cloud concepts are demonstrated here?",
    choices: [
      "Fault tolerance and disaster recovery",
      "Elasticity and stop guessing capacity",
      "Data sovereignty and compliance",
      "Agility and go global in minutes"
    ],
    correctAnswer: 1,
    explanation: "Elasticity is the ability to automatically acquire and release resources to match demand — scaling out for the viral traffic and back in after. 'Stop guessing capacity' means you don't need to predict traffic in advance; cloud infrastructure adapts dynamically. Together, they prevented both downtime and over-provisioning."
  },
  {
    id: 336,
    domain: "Cloud Concepts",
    question: "A company uses Salesforce for CRM, Slack for communication, and Google Workspace for documents. Employees access these through a web browser without installing or maintaining any software locally. Which cloud service model do all three of these products represent?",
    choices: [
      "Infrastructure as a Service (IaaS)",
      "Platform as a Service (PaaS)",
      "Software as a Service (SaaS)",
      "Function as a Service (FaaS)"
    ],
    correctAnswer: 2,
    explanation: "SaaS provides complete, ready-to-use software applications delivered over the internet. The provider manages everything — infrastructure, platform, and application. Users simply access the software via a browser. Salesforce, Slack, and Google Workspace are all SaaS products."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 337,
    domain: "Security and Compliance",
    question: "A company's VPC has a public subnet with web servers and a private subnet with database servers. They want to control traffic at the subnet level — specifically blocking all inbound traffic from a known range of malicious IP addresses across the entire subnet. Which AWS feature provides subnet-level traffic filtering?",
    choices: [
      "Security groups",
      "Network Access Control Lists (NACLs)",
      "AWS WAF",
      "Route tables"
    ],
    correctAnswer: 1,
    explanation: "Network ACLs operate at the subnet level and can explicitly allow or deny traffic based on IP address ranges and port numbers. Unlike security groups (which are instance-level and only allow 'allow' rules), NACLs support both allow and deny rules — making them effective for blocking known malicious IP ranges across an entire subnet."
  },
  {
    id: 338,
    domain: "Security and Compliance",
    question: "A company needs to run vulnerability assessments on their EC2 instances to identify unpatched operating systems, exposed ports, and software with known CVEs. Which AWS service automates these security assessments?",
    choices: [
      "Amazon GuardDuty",
      "Amazon Inspector",
      "AWS Config",
      "AWS Trusted Advisor"
    ],
    correctAnswer: 1,
    explanation: "Amazon Inspector automatically assesses EC2 instances and container images for software vulnerabilities (CVEs), unintended network exposure, and deviations from security best practices. It continuously scans workloads and prioritizes findings by severity, helping teams remediate vulnerabilities quickly."
  },
  {
    id: 339,
    domain: "Security and Compliance",
    question: "A developer needs to make API calls to AWS services from code running on their laptop. They need programmatic credentials that can be used in the AWS CLI and SDKs. What should they configure?",
    choices: [
      "An IAM user with access keys (access key ID and secret access key)",
      "An IAM role attached to their laptop",
      "The root user credentials",
      "An Amazon Cognito user pool"
    ],
    correctAnswer: 0,
    explanation: "IAM access keys (an access key ID and secret access key) provide programmatic credentials for CLI and SDK access from external environments like a developer's laptop. Best practice: use IAM Identity Center with temporary credentials instead, but access keys are the traditional approach for programmatic access."
  },
  {
    id: 340,
    domain: "Security and Compliance",
    question: "A company with strict regulatory requirements needs to encrypt data at rest using hardware security modules (HSMs) that they fully control. They must manage their own encryption keys in FIPS 140-2 Level 3 validated hardware within their own dedicated CloudHSM cluster. Which AWS service meets this requirement?",
    choices: [
      "AWS KMS with customer managed keys",
      "AWS KMS with AWS managed keys",
      "AWS CloudHSM",
      "Server-side encryption with S3-managed keys (SSE-S3)"
    ],
    correctAnswer: 2,
    explanation: "AWS CloudHSM provides dedicated FIPS 140-2 Level 3 validated hardware security modules in the AWS Cloud. Unlike KMS (where AWS manages the HSM infrastructure), CloudHSM gives you exclusive single-tenant access to HSMs that you fully control — meeting the strictest regulatory requirements for key management."
  },
  {
    id: 341,
    domain: "Security and Compliance",
    question: "A company has aggregated findings from GuardDuty, Inspector, Macie, and Firewall Manager across 50 AWS accounts. Their security team is overwhelmed managing alerts from multiple dashboards. Which AWS service provides a centralized view of security findings across services and accounts?",
    choices: [
      "Amazon Detective",
      "AWS Security Hub",
      "AWS CloudTrail",
      "AWS Organizations"
    ],
    correctAnswer: 1,
    explanation: "AWS Security Hub aggregates, organizes, and prioritizes security findings from multiple AWS services (GuardDuty, Inspector, Macie, Firewall Manager) and third-party tools across multiple accounts. It provides a unified security dashboard with automated compliance checks against frameworks like CIS AWS Foundations Benchmark."
  },
  {
    id: 342,
    domain: "Security and Compliance",
    question: "A company's application on EC2 instances needs to call DynamoDB and S3, but the security team forbids storing any long-term credentials on the instances. The credentials must be temporary and automatically rotated. How should the application authenticate to these AWS services?",
    choices: [
      "Embed IAM user access keys in environment variables",
      "Store access keys in AWS Secrets Manager and retrieve them at startup",
      "Assign an IAM role to the EC2 instances so they receive temporary credentials automatically",
      "Use the root account credentials"
    ],
    correctAnswer: 2,
    explanation: "IAM roles for EC2 provide temporary security credentials that are automatically rotated via the instance metadata service. The application uses the AWS SDK, which automatically retrieves these short-lived credentials — no long-term keys are stored anywhere on the instance."
  },
  {
    id: 343,
    domain: "Security and Compliance",
    question: "A company wants to enforce that all new S3 buckets across their organization have versioning enabled and block public access turned on. If anyone creates a non-compliant bucket, it should be automatically remediated. Which AWS service can detect the violation AND trigger automatic remediation?",
    choices: [
      "AWS CloudTrail",
      "Amazon GuardDuty",
      "AWS Config with remediation actions",
      "AWS Trusted Advisor"
    ],
    correctAnswer: 2,
    explanation: "AWS Config rules continuously evaluate resource configurations. When a non-compliant S3 bucket is detected (versioning disabled or public access not blocked), Config can trigger automatic remediation via Systems Manager Automation documents — for example, automatically enabling versioning or applying the block public access setting."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 344,
    domain: "Cloud Technology and Services",
    question: "A company needs a managed graph database to store and query highly connected data — social network relationships, fraud detection patterns, and recommendation engines. Each entity has complex many-to-many relationships with other entities. Which AWS database service is optimized for this?",
    choices: [
      "Amazon DynamoDB",
      "Amazon Neptune",
      "Amazon RDS",
      "Amazon Redshift"
    ],
    correctAnswer: 1,
    explanation: "Amazon Neptune is a fully managed graph database service optimized for storing and querying highly connected datasets. It supports Apache TinkerPop Gremlin and SPARQL query languages, making it ideal for social networks, knowledge graphs, fraud detection, and recommendation engines where relationship traversal is the primary access pattern."
  },
  {
    id: 345,
    domain: "Cloud Technology and Services",
    question: "A company operates an on-premises Oracle database that they want to migrate to Amazon Aurora PostgreSQL. The migration involves converting the database schema, stored procedures, and application SQL from Oracle syntax to PostgreSQL syntax. Which AWS tool assists with this schema conversion?",
    choices: [
      "AWS Database Migration Service (DMS)",
      "AWS Schema Conversion Tool (SCT)",
      "AWS Application Discovery Service",
      "AWS DataSync"
    ],
    correctAnswer: 1,
    explanation: "The AWS Schema Conversion Tool (SCT) automatically converts database schemas, stored procedures, functions, and application SQL from one database engine to another (e.g., Oracle to PostgreSQL). It works alongside DMS — SCT converts the schema/code while DMS handles the actual data migration."
  },
  {
    id: 346,
    domain: "Cloud Technology and Services",
    question: "A company has a REST API that currently handles 100 requests per second. During flash sales, traffic spikes to 10,000 requests per second for 15-minute bursts. Each request involves a simple database lookup and response. They want zero server management and automatic scaling. Which architecture is most appropriate?",
    choices: [
      "EC2 instances behind an Application Load Balancer with Auto Scaling",
      "Amazon API Gateway with AWS Lambda and DynamoDB",
      "Amazon ECS on EC2 with target tracking scaling",
      "A single large EC2 instance with vertical scaling"
    ],
    correctAnswer: 1,
    explanation: "API Gateway + Lambda + DynamoDB is a fully serverless architecture that scales automatically from 100 to 10,000+ requests per second with zero server management. Lambda handles the compute burst, DynamoDB scales reads/writes on demand, and API Gateway manages throttling — ideal for spiky, event-driven workloads."
  },
  {
    id: 347,
    domain: "Cloud Technology and Services",
    question: "A company's data science team needs to build, train, and deploy machine learning models. They want a fully managed environment that provides Jupyter notebooks, built-in algorithms, one-click training on managed infrastructure, and model hosting endpoints. Which AWS service provides this end-to-end ML platform?",
    choices: [
      "Amazon Comprehend",
      "Amazon SageMaker",
      "Amazon Rekognition",
      "AWS Deep Learning AMIs"
    ],
    correctAnswer: 1,
    explanation: "Amazon SageMaker is a fully managed end-to-end machine learning platform. It provides Jupyter notebooks for development, built-in and custom algorithms, managed training infrastructure with spot instance support, automatic model tuning, and one-click deployment to production endpoints — covering the entire ML lifecycle."
  },
  {
    id: 348,
    domain: "Cloud Technology and Services",
    question: "A company operates a web application across two Availability Zones. They need to distribute incoming HTTPS traffic across EC2 instances in both AZs, terminate SSL/TLS at the load balancer, and route requests based on URL paths (/api/* to one target group, /static/* to another). Which load balancer type should they use?",
    choices: [
      "Classic Load Balancer",
      "Network Load Balancer",
      "Application Load Balancer",
      "Gateway Load Balancer"
    ],
    correctAnswer: 2,
    explanation: "Application Load Balancer (ALB) operates at Layer 7 (HTTP/HTTPS) and supports SSL termination, path-based routing (/api/*, /static/*), host-based routing, and distributes traffic across targets in multiple AZs. It's the right choice for HTTP/HTTPS workloads requiring content-based routing decisions."
  },
  {
    id: 349,
    domain: "Cloud Technology and Services",
    question: "A company needs to process 500 GB of server logs nightly to generate usage reports. The processing involves filtering, aggregating, and joining data from multiple log sources. They want a serverless option that lets them run standard SQL queries against data stored in S3 without loading it into a database. Which service should they use?",
    choices: [
      "Amazon Redshift",
      "Amazon RDS",
      "Amazon Athena",
      "Amazon EMR"
    ],
    correctAnswer: 2,
    explanation: "Amazon Athena is a serverless interactive query service that lets you run standard SQL queries directly against data in S3. There's no infrastructure to manage, no data loading required, and you pay only per query based on data scanned. It's ideal for ad-hoc and scheduled analytics on S3-stored log data."
  },
  {
    id: 350,
    domain: "Cloud Technology and Services",
    question: "A company needs their application to send email notifications, SMS messages, and push notifications to mobile devices. When a new order is placed, multiple downstream systems (inventory, shipping, billing) all need to be notified simultaneously. Which AWS service enables this fan-out messaging pattern?",
    choices: [
      "Amazon SQS",
      "Amazon SNS",
      "Amazon MQ",
      "Amazon Kinesis"
    ],
    correctAnswer: 1,
    explanation: "Amazon SNS (Simple Notification Service) is a fully managed pub/sub messaging service that supports fan-out — publishing a single message to a topic that is delivered simultaneously to multiple subscribers. Subscribers can be SQS queues, Lambda functions, HTTP endpoints, email, SMS, or mobile push notifications."
  },
  {
    id: 351,
    domain: "Cloud Technology and Services",
    question: "A company needs to cache frequently accessed database query results to reduce load on their RDS MySQL instance. The cache should be an in-memory store with sub-millisecond response times that is compatible with Redis. Which AWS service provides this managed caching layer?",
    choices: [
      "Amazon DynamoDB Accelerator (DAX)",
      "Amazon ElastiCache for Redis",
      "Amazon CloudFront",
      "Amazon MemoryDB for Redis"
    ],
    correctAnswer: 1,
    explanation: "Amazon ElastiCache for Redis is a fully managed in-memory caching service that delivers sub-millisecond response times. It's commonly deployed as a caching layer in front of relational databases like RDS to reduce database load and improve application response times. It's fully Redis-compatible."
  },
  {
    id: 352,
    domain: "Cloud Technology and Services",
    question: "A company is migrating an on-premises MySQL database to Amazon RDS for MySQL with minimal downtime. They need to continuously replicate changes from the source database to the target during migration, then cut over when ready. Which AWS service handles this continuous data replication?",
    choices: [
      "AWS Schema Conversion Tool",
      "AWS Snowball",
      "AWS Database Migration Service (DMS)",
      "AWS DataSync"
    ],
    correctAnswer: 2,
    explanation: "AWS Database Migration Service (DMS) supports continuous data replication (change data capture) from source to target databases during migration. It keeps the target database synchronized with ongoing changes, enabling a near-zero-downtime cutover when the migration is ready."
  },
  {
    id: 353,
    domain: "Cloud Technology and Services",
    question: "A mobile app needs to store user-generated images and videos with high durability. The files range from 1 MB to 5 GB, are accessed frequently for the first 30 days, then rarely afterward. The company wants 99.999999999% (11 nines) durability. Which AWS storage service meets this requirement?",
    choices: [
      "Amazon EBS",
      "Amazon S3",
      "Amazon EFS",
      "EC2 instance store"
    ],
    correctAnswer: 1,
    explanation: "Amazon S3 provides 99.999999999% (11 nines) durability, supports objects up to 5 TB, and offers lifecycle policies that can automatically transition objects to cheaper storage classes after 30 days. It's the standard AWS service for storing unstructured data like images and videos with extreme durability."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 354,
    domain: "Billing, Pricing and Support",
    question: "A startup wants to experiment with AWS services at no cost to evaluate if cloud is right for them. They want to run a small EC2 instance, store a few GB in S3, and try a managed database — all without incurring charges for the first 12 months. Which AWS program makes this possible?",
    choices: [
      "AWS Credits program",
      "AWS Free Tier",
      "AWS Activate program",
      "AWS Marketplace trial"
    ],
    correctAnswer: 1,
    explanation: "The AWS Free Tier offers three types of free offers: 12-month free (e.g., 750 hours/month of t2.micro EC2, 5 GB S3, 750 hours of RDS single-AZ), always free (e.g., Lambda 1M requests/month), and short-term trials. It allows new customers to explore core services without cost for up to 12 months."
  },
  {
    id: 355,
    domain: "Billing, Pricing and Support",
    question: "A company is tagging all their AWS resources by department (Engineering, Marketing, Finance) and project. They want to see exactly how much each department and project is costing them per month, broken down by service. Which AWS feature enables this cost allocation by organizational unit?",
    choices: [
      "AWS Budgets",
      "Cost allocation tags in AWS Cost Explorer",
      "AWS Pricing Calculator",
      "AWS Organizations"
    ],
    correctAnswer: 1,
    explanation: "Cost allocation tags let you categorize AWS resources by department, project, or any custom dimension. Once activated in the billing console, these tags appear in AWS Cost Explorer, enabling you to filter, group, and analyze costs by tag — showing exactly what each department or project spends per service per month."
  },
  {
    id: 356,
    domain: "Billing, Pricing and Support",
    question: "A company notices their S3 costs increased significantly last month. They discover that data transfer OUT from S3 to the internet was the largest cost component, not storage itself. Which S3 pricing dimension is responsible for this charge?",
    choices: [
      "S3 PUT request charges",
      "S3 storage per GB-month",
      "S3 data transfer out to the internet",
      "S3 lifecycle transition charges"
    ],
    correctAnswer: 2,
    explanation: "S3 pricing has multiple dimensions: storage (per GB-month), requests (PUT, GET, etc.), and data transfer. Data transfer OUT from S3 to the internet is often the most significant cost for content-heavy applications. Data transfer IN to S3 is free, but outbound transfer is charged per GB and can exceed storage costs for frequently accessed data."
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
