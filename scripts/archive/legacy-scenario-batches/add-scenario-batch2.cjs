const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 307,
    domain: "Cloud Concepts",
    question: "A university research lab provisions powerful GPU instances for a machine learning experiment that runs for two weeks. Once the experiment ends, they terminate all instances and pay nothing further. Which cloud computing advantage does this demonstrate?",
    choices: [
      "Go global in minutes",
      "Benefit from massive economies of scale",
      "Stop spending money running and maintaining data centers",
      "Pay only for what you use"
    ],
    correctAnswer: 3,
    explanation: "The pay-as-you-go pricing model means you only pay for compute resources while they are running. The lab provisions GPU instances for exactly two weeks, then terminates them with no further cost — unlike owning hardware that depreciates whether it's being used or not."
  },
  {
    id: 308,
    domain: "Cloud Concepts",
    question: "A logistics company wants to build a mobile tracking app. They don't want to manage any infrastructure — not servers, not operating systems, not even container orchestration. They just want to write application code and have it run in response to API requests. Which cloud service model describes this?",
    choices: [
      "Infrastructure as a Service (IaaS)",
      "Platform as a Service (PaaS)",
      "Software as a Service (SaaS)",
      "Function as a Service (FaaS) / Serverless"
    ],
    correctAnswer: 3,
    explanation: "Function as a Service (FaaS), also called serverless computing, allows developers to write individual functions that execute in response to events (like API requests) without managing any infrastructure, OS, or containers. AWS Lambda is the primary AWS FaaS offering."
  },
  {
    id: 309,
    domain: "Cloud Concepts",
    question: "A government agency must keep all citizen data within the country's borders due to data residency laws. They're concerned that using cloud computing means losing control over where data is physically stored. How does AWS address this concern?",
    choices: [
      "AWS allows customers to choose specific Regions and guarantees data does not leave that Region unless the customer explicitly moves it",
      "AWS automatically replicates all data globally for redundancy",
      "Data residency is only possible with on-premises infrastructure",
      "AWS stores all data in the US by default but offers premium plans for other locations"
    ],
    correctAnswer: 0,
    explanation: "AWS provides Regions in many countries and guarantees that customer data stored in a Region does not move to another Region unless the customer explicitly configures replication or transfer. This allows government agencies to meet data residency requirements by selecting a Region within their country's borders."
  },
  {
    id: 310,
    domain: "Cloud Concepts",
    question: "A manufacturing company deployed their application in a single Availability Zone. When that AZ experienced a power failure, their application went offline for 4 hours. Their architect recommends deploying across multiple Availability Zones. Which cloud concept does this implement?",
    choices: [
      "Scalability",
      "High availability",
      "Cost optimization",
      "Performance efficiency"
    ],
    correctAnswer: 1,
    explanation: "High availability means designing systems to remain operational even when components fail. Deploying across multiple Availability Zones (which are physically separate data centers within a Region) ensures that if one AZ has a power failure, the application continues running in the other AZ(s) with minimal or no downtime."
  },
  {
    id: 311,
    domain: "Cloud Concepts",
    question: "A startup founder is comparing cloud deployment models. Their application processes non-sensitive public content, they want the lowest possible cost, and they have no regulatory restrictions on data location. Which deployment model is most appropriate?",
    choices: [
      "Private cloud",
      "Hybrid cloud",
      "Public cloud",
      "On-premises only"
    ],
    correctAnswer: 2,
    explanation: "A public cloud deployment (like AWS) is the most cost-effective option when there are no regulatory restrictions, no requirement for dedicated hardware, and no sensitive data concerns. Public cloud provides the full benefit of shared infrastructure, pay-as-you-go pricing, and economies of scale."
  },

  // ===== SECURITY AND COMPLIANCE (8) =====
  {
    id: 312,
    domain: "Security and Compliance",
    question: "A company's web application on ALB/EC2 is being targeted by SQL injection and cross-site scripting (XSS) attacks. They need a service that can inspect incoming HTTP requests and block malicious patterns before they reach the application. Which AWS service should they deploy?",
    choices: [
      "AWS Shield Advanced",
      "Amazon GuardDuty",
      "AWS WAF (Web Application Firewall)",
      "AWS Network Firewall"
    ],
    correctAnswer: 2,
    explanation: "AWS WAF inspects incoming HTTP/HTTPS requests at the application layer and can block SQL injection, XSS, and other common web exploits using managed rule sets or custom rules. It integrates directly with ALB, CloudFront, and API Gateway to filter malicious traffic before it reaches your application."
  },
  {
    id: 313,
    domain: "Security and Compliance",
    question: "After a security incident, a company needs to determine exactly who deleted an S3 bucket at 2:47 AM last Tuesday, from which IP address, and using which IAM credentials. Which AWS service provides this audit trail?",
    choices: [
      "Amazon CloudWatch Logs",
      "AWS CloudTrail",
      "AWS Config",
      "Amazon Detective"
    ],
    correctAnswer: 1,
    explanation: "AWS CloudTrail records all API calls made in your AWS account, including who made the call (IAM identity), when (timestamp), from where (source IP), and what was done (API action). It provides the definitive audit trail for investigating security incidents like unauthorized resource deletion."
  },
  {
    id: 314,
    domain: "Security and Compliance",
    question: "A company stores thousands of documents in S3 that may contain credit card numbers, social security numbers, and other personally identifiable information. They need an automated way to discover and classify this sensitive data across all their buckets. Which AWS service is designed for this?",
    choices: [
      "Amazon Macie",
      "AWS Config",
      "Amazon Inspector",
      "AWS Trusted Advisor"
    ],
    correctAnswer: 0,
    explanation: "Amazon Macie uses machine learning and pattern matching to automatically discover, classify, and protect sensitive data stored in Amazon S3. It can identify PII such as credit card numbers, SSNs, passport numbers, and other sensitive data types across your S3 buckets."
  },
  {
    id: 315,
    domain: "Security and Compliance",
    question: "A company encrypts all their S3 objects and EBS volumes. Their security policy requires that they maintain full control over the encryption keys, including the ability to rotate, disable, and audit key usage. Which AWS service should manage their encryption keys?",
    choices: [
      "AWS Certificate Manager",
      "AWS Secrets Manager",
      "AWS Key Management Service (KMS)",
      "AWS CloudHSM"
    ],
    correctAnswer: 2,
    explanation: "AWS KMS lets you create and manage encryption keys with full control over rotation schedules, key policies, and usage auditing via CloudTrail. It integrates natively with S3, EBS, RDS, and dozens of other AWS services, making it the standard choice for customer-managed encryption key management."
  },
  {
    id: 316,
    domain: "Security and Compliance",
    question: "A company wants to prevent EC2 instances in a private subnet from being directly accessible from the internet, while still allowing those instances to download software updates from the internet. Which networking configuration enables this?",
    choices: [
      "Attach an internet gateway directly to the private subnet",
      "Use a NAT gateway in the public subnet to route outbound traffic from the private subnet",
      "Assign public IP addresses to instances in the private subnet",
      "Disable all security groups on the private subnet"
    ],
    correctAnswer: 1,
    explanation: "A NAT (Network Address Translation) gateway in a public subnet allows instances in private subnets to initiate outbound connections to the internet (for software updates) while preventing unsolicited inbound connections from the internet. The private instances route outbound traffic through the NAT gateway without needing public IPs."
  },
  {
    id: 317,
    domain: "Security and Compliance",
    question: "A company's EC2 instance runs a web server on port 443 (HTTPS). The security team wants to ensure that only HTTPS traffic on port 443 is allowed inbound, and all other ports are blocked. Which AWS feature acts as a virtual firewall at the instance level to enforce this?",
    choices: [
      "Network ACL",
      "AWS WAF",
      "Security group",
      "Route table"
    ],
    correctAnswer: 2,
    explanation: "Security groups act as virtual firewalls at the instance level (ENI level). They are stateful — you can create an inbound rule allowing TCP port 443 and all other inbound traffic is denied by default. Unlike Network ACLs which operate at the subnet level, security groups provide instance-level granular control."
  },
  {
    id: 318,
    domain: "Security and Compliance",
    question: "A company has enabled AWS CloudTrail but wants to detect ongoing security threats by correlating data from multiple sources — VPC Flow Logs, DNS logs, and CloudTrail events — to identify compromised instances and unauthorized credential usage. Which service provides this intelligent threat detection?",
    choices: [
      "AWS Security Hub",
      "AWS Config",
      "Amazon GuardDuty",
      "Amazon Inspector"
    ],
    correctAnswer: 2,
    explanation: "Amazon GuardDuty is an intelligent threat detection service that continuously analyzes CloudTrail event logs, VPC Flow Logs, and DNS logs using machine learning, anomaly detection, and integrated threat intelligence to identify unexpected and potentially unauthorized activity in your AWS environment."
  },
  {
    id: 319,
    domain: "Security and Compliance",
    question: "A company's root user account has been used for daily administrative tasks by the IT team. A security consultant flags this as a critical risk. Which actions should the company take to secure the root user? (Select the best answer)",
    choices: [
      "Delete the root user entirely",
      "Enable MFA on the root user, stop using it for daily tasks, and create IAM users/roles for administration",
      "Change the root user password to something longer",
      "Remove the root user's access keys and disable console access completely"
    ],
    correctAnswer: 1,
    explanation: "AWS best practice: enable MFA on the root user, lock away root credentials, and never use the root account for everyday tasks. Create individual IAM users or roles for all administrative work. The root user cannot be deleted but should be protected with MFA and used only for the handful of tasks that specifically require root access."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (9) =====
  {
    id: 320,
    domain: "Cloud Technology and Services",
    question: "A social media app stores user profile photos that must be instantly accessible. They also archive old photos that users rarely access — perhaps once a year — and can tolerate a retrieval delay of several hours. Which S3 storage strategy minimizes cost while meeting both requirements?",
    choices: [
      "Store everything in S3 Standard",
      "Store active photos in S3 Standard and archive old photos to S3 Glacier Deep Archive",
      "Store everything in S3 One Zone-IA",
      "Store active photos in S3 Standard-IA and archive old photos to S3 Glacier Flexible Retrieval"
    ],
    correctAnswer: 1,
    explanation: "S3 Standard provides instant access for active profile photos. S3 Glacier Deep Archive is the lowest-cost storage class, designed for data accessed once or twice a year where retrieval times of 12-48 hours are acceptable. This combination minimizes cost while meeting the access patterns described."
  },
  {
    id: 321,
    domain: "Cloud Technology and Services",
    question: "A company wants to deploy a containerized microservices application. They don't want to manage the underlying EC2 instances, patch operating systems, or handle cluster capacity planning. They just want to define their containers and let AWS run them. Which service should they use?",
    choices: [
      "Amazon ECS on EC2 launch type",
      "Amazon EKS with self-managed nodes",
      "AWS Fargate",
      "Amazon EC2 with Docker installed"
    ],
    correctAnswer: 2,
    explanation: "AWS Fargate is a serverless compute engine for containers that eliminates the need to manage EC2 instances. You define your container specifications (CPU, memory, image) and Fargate handles provisioning, scaling, and patching the underlying infrastructure. It works with both ECS and EKS."
  },
  {
    id: 322,
    domain: "Cloud Technology and Services",
    question: "An e-commerce company needs a relational database for their product catalog. They want MySQL compatibility but need 5x the throughput of standard MySQL, automatic storage scaling up to 128 TB, and up to 15 read replicas. Which AWS database service should they choose?",
    choices: [
      "Amazon RDS for MySQL",
      "Amazon DynamoDB",
      "Amazon Aurora",
      "Amazon DocumentDB"
    ],
    correctAnswer: 2,
    explanation: "Amazon Aurora is a MySQL and PostgreSQL-compatible relational database built for the cloud. It delivers up to 5x the throughput of standard MySQL, automatically scales storage up to 128 TB, supports up to 15 low-latency read replicas, and provides built-in high availability with replication across 3 AZs."
  },
  {
    id: 323,
    domain: "Cloud Technology and Services",
    question: "A company has a hybrid architecture with on-premises servers that need private, consistent-bandwidth connectivity to their AWS VPC. They cannot rely on the public internet due to latency sensitivity and compliance requirements. Which AWS service provides a dedicated private network connection?",
    choices: [
      "AWS Site-to-Site VPN",
      "AWS Direct Connect",
      "Amazon CloudFront",
      "AWS Transit Gateway"
    ],
    correctAnswer: 1,
    explanation: "AWS Direct Connect establishes a dedicated private network connection from on-premises to AWS that does not traverse the public internet. It provides consistent bandwidth, lower latency, and a private link — meeting both the performance and compliance requirements for hybrid architectures."
  },
  {
    id: 324,
    domain: "Cloud Technology and Services",
    question: "A mobile gaming company needs a managed service to handle user authentication — sign-up, sign-in, password reset, and social identity federation (Google, Facebook, Apple). They don't want to build a custom auth system. Which AWS service provides this?",
    choices: [
      "Amazon Cognito",
      "AWS IAM",
      "AWS Single Sign-On (IAM Identity Center)",
      "AWS Directory Service"
    ],
    correctAnswer: 0,
    explanation: "Amazon Cognito provides user sign-up, sign-in, and access control for web and mobile apps. It supports social identity providers (Google, Facebook, Apple), SAML, and OpenID Connect federation. Cognito User Pools handle authentication while Cognito Identity Pools provide temporary AWS credentials for accessing AWS services."
  },
  {
    id: 325,
    domain: "Cloud Technology and Services",
    question: "A company's application needs to deliver websocket-based real-time notifications and RESTful API endpoints to mobile and web clients. They want a fully managed service that handles throttling, authentication, caching, and API versioning without managing servers. Which AWS service should they use?",
    choices: [
      "Application Load Balancer",
      "Amazon API Gateway",
      "Amazon CloudFront",
      "AWS AppSync"
    ],
    correctAnswer: 1,
    explanation: "Amazon API Gateway is a fully managed service for creating, publishing, and managing REST, HTTP, and WebSocket APIs at any scale. It handles throttling, authorization (IAM, Cognito, Lambda authorizers), response caching, and API versioning — all without any server management."
  },
  {
    id: 326,
    domain: "Cloud Technology and Services",
    question: "A company is migrating hundreds of on-premises VMware virtual machines to AWS. They need an automated tool that can discover their existing servers, track dependencies between them, and generate a migration plan. Which AWS service provides this discovery and planning capability?",
    choices: [
      "AWS Database Migration Service",
      "AWS Migration Hub",
      "AWS Application Discovery Service",
      "AWS Server Migration Service"
    ],
    correctAnswer: 2,
    explanation: "AWS Application Discovery Service helps plan migrations by automatically collecting configuration, usage, and dependency data from on-premises servers. It discovers server inventory, maps dependencies between applications, and feeds this data into AWS Migration Hub to build an informed migration plan."
  },
  {
    id: 327,
    domain: "Cloud Technology and Services",
    question: "A company runs a globally distributed application that requires routing users to the nearest healthy endpoint with the lowest latency. They also need health checks that automatically remove unhealthy endpoints from DNS responses. Which AWS service provides this intelligent DNS routing?",
    choices: [
      "Amazon CloudFront",
      "AWS Global Accelerator",
      "Amazon Route 53",
      "Elastic Load Balancing"
    ],
    correctAnswer: 2,
    explanation: "Amazon Route 53 is AWS's DNS service that supports latency-based routing (directing users to the lowest-latency endpoint), health checks (automatically removing unhealthy endpoints from responses), and other routing policies like geolocation, weighted, and failover — providing intelligent global traffic management."
  },
  {
    id: 328,
    domain: "Cloud Technology and Services",
    question: "A company wants to monitor the CPU utilization, memory usage, and disk I/O of their EC2 instances. When CPU exceeds 80% for 5 minutes, they want an automatic alert sent to the operations team. Which AWS service provides this monitoring and alerting?",
    choices: [
      "AWS CloudTrail",
      "AWS Config",
      "Amazon CloudWatch",
      "AWS X-Ray"
    ],
    correctAnswer: 2,
    explanation: "Amazon CloudWatch collects and monitors metrics (CPU, disk I/O, network) from AWS resources. CloudWatch Alarms evaluate metrics against thresholds and trigger actions — such as sending SNS notifications to an operations team when CPU exceeds 80% for a specified period. Custom metrics can monitor memory usage."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 329,
    domain: "Billing, Pricing and Support",
    question: "A company wants to identify underutilized EC2 instances, unassociated Elastic IP addresses, and idle RDS databases to reduce waste. They need automated recommendations for cost optimization across their account. Which AWS tool provides these specific recommendations?",
    choices: [
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Trusted Advisor",
      "AWS Compute Optimizer"
    ],
    correctAnswer: 2,
    explanation: "AWS Trusted Advisor provides automated recommendations across five categories, including cost optimization. It identifies underutilized EC2 instances, idle load balancers, unassociated Elastic IPs, and other resources you're paying for but not effectively using, with specific actionable recommendations."
  },
  {
    id: 330,
    domain: "Billing, Pricing and Support",
    question: "A company needs a detailed, machine-readable report of every AWS charge — broken down by service, usage type, operation, and resource ID — delivered daily to an S3 bucket for their finance team's custom analytics pipeline. Which AWS billing feature provides this granular data?",
    choices: [
      "AWS Cost Explorer",
      "AWS Cost and Usage Report (CUR)",
      "AWS Budgets",
      "Monthly billing statement"
    ],
    correctAnswer: 1,
    explanation: "The AWS Cost and Usage Report (CUR) is the most comprehensive and granular billing dataset available. It delivers CSV/Parquet files to an S3 bucket with line-item detail for every charge, including resource IDs, tags, and usage quantities — designed for programmatic analysis and custom reporting pipelines."
  },
  {
    id: 331,
    domain: "Billing, Pricing and Support",
    question: "A large enterprise with 200+ AWS accounts needs a dedicated Technical Account Manager (TAM), Infrastructure Event Management for product launches, and the fastest possible response time (under 15 minutes) for business-critical system outages. Which Support plan provides all of these?",
    choices: [
      "Business Support",
      "Developer Support",
      "Enterprise Support",
      "Enterprise On-Ramp Support"
    ],
    correctAnswer: 2,
    explanation: "Enterprise Support is the only tier that includes a designated Technical Account Manager (TAM), Infrastructure Event Management, and a 15-minute response time for business/mission-critical system outages. It's designed for large organizations running production workloads at scale."
  }
];

questions.push(...newQuestions);

fs.writeFileSync(file, JSON.stringify(questions, null, 2));
console.log(`Done. Total questions: ${questions.length}`);
console.log(`New questions added: ${newQuestions.length} (IDs ${newQuestions[0].id}-${newQuestions[newQuestions.length-1].id})`);

// Verify answer distribution for new batch
const batchDist = [0,0,0,0];
newQuestions.forEach(q => batchDist[q.correctAnswer]++);
console.log('Batch answer distribution:', batchDist);

// Verify overall
const dist = [0,0,0,0];
questions.forEach(q => dist[q.correctAnswer]++);
console.log('Overall answer distribution:', dist);

const dc = {};
questions.forEach(q => { dc[q.domain] = (dc[q.domain]||0) + 1; });
console.log('Domain counts:', dc);
