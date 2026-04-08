const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (6) =====
  {
    id: 282,
    domain: "Cloud Concepts",
    question: "A retail company experiences a massive spike in web traffic every Black Friday, but minimal traffic for the rest of the year. Their on-premises servers sit idle 11 months out of 12. Which cloud computing benefit directly addresses this inefficiency?",
    choices: [
      "Elasticity",
      "Fault tolerance",
      "Geographic redundancy",
      "Data sovereignty"
    ],
    correctAnswer: 0,
    explanation: "Elasticity allows you to automatically scale resources up during peak demand (Black Friday) and scale down when demand drops, so you only pay for what you use. This directly eliminates the waste of idle on-premises capacity during low-traffic months."
  },
  {
    id: 283,
    domain: "Cloud Concepts",
    question: "A healthcare startup is deciding between building an on-premises data center or using AWS. Their CTO argues that cloud would let the team focus on building their patient portal instead of managing hardware, networking, and cooling systems. Which cloud advantage is the CTO describing?",
    choices: [
      "High availability",
      "Economy of scale",
      "Ability to trade capital expense for variable expense",
      "Shifting focus from undifferentiated heavy lifting to business value"
    ],
    correctAnswer: 3,
    explanation: "AWS's Well-Architected Framework identifies 'stop spending money on undifferentiated heavy lifting' as a key cloud advantage. By letting AWS manage infrastructure (hardware, networking, cooling), the team can focus engineering effort on their actual product — the patient portal."
  },
  {
    id: 284,
    domain: "Cloud Concepts",
    question: "A company currently pays $2 million upfront for servers every 3 years, regardless of actual usage. Their CFO wants to switch to a model where infrastructure costs scale with revenue. Which financial benefit of cloud computing aligns with this goal?",
    choices: [
      "Benefit from massive economies of scale",
      "Increase speed and agility",
      "Trade fixed expense for variable expense",
      "Go global in minutes"
    ],
    correctAnswer: 2,
    explanation: "Trading capital expense (fixed upfront server purchases) for operational/variable expense (pay-as-you-go cloud pricing) means costs directly correlate with usage and revenue. Instead of a $2M upfront commitment, the company pays monthly based on actual consumption."
  },
  {
    id: 285,
    domain: "Cloud Concepts",
    question: "A gaming studio needs to deploy their new multiplayer game in Tokyo, São Paulo, and Frankfurt simultaneously on launch day. Building physical data centers in each location would take 18+ months. Which cloud advantage makes same-day global deployment possible?",
    choices: [
      "Stop guessing capacity",
      "Increase speed and agility",
      "Go global in minutes",
      "Benefit from economies of scale"
    ],
    correctAnswer: 2,
    explanation: "AWS enables you to 'go global in minutes' by deploying applications across multiple Regions worldwide with just a few clicks. The gaming studio can launch in Tokyo (ap-northeast-1), São Paulo (sa-east-1), and Frankfurt (eu-central-1) on the same day without building any physical infrastructure."
  },
  {
    id: 286,
    domain: "Cloud Concepts",
    question: "A SaaS company wants to deploy a new microservices application. They want full control over the operating system and runtime environment but don't want to manage physical servers. Which cloud service model should they use?",
    choices: [
      "Software as a Service (SaaS)",
      "Platform as a Service (PaaS)",
      "Infrastructure as a Service (IaaS)",
      "Function as a Service (FaaS)"
    ],
    correctAnswer: 2,
    explanation: "IaaS provides virtualized computing resources (virtual machines, storage, networking) where you control the OS, runtime, and middleware but AWS manages the physical infrastructure. This gives the company full OS-level control without managing physical hardware."
  },
  {
    id: 287,
    domain: "Cloud Concepts",
    question: "A financial services firm is evaluating cloud adoption. Their compliance team requires that they retain full responsibility for encrypting customer data and managing access policies, while AWS handles the physical security of data centers. Which cloud principle describes this division?",
    choices: [
      "The shared responsibility model",
      "The principle of least privilege",
      "Defense in depth",
      "The Well-Architected Framework"
    ],
    correctAnswer: 0,
    explanation: "The AWS Shared Responsibility Model defines this exact division: AWS is responsible for security 'of' the cloud (physical infrastructure, hardware, networking), while the customer is responsible for security 'in' the cloud (data encryption, access management, security configurations)."
  },

  // ===== SECURITY AND COMPLIANCE (8) =====
  {
    id: 288,
    domain: "Security and Compliance",
    question: "A company's security audit reveals that several developers have been sharing a single IAM user account with full admin access. The security team wants to ensure each developer has individual credentials and only the permissions needed for their specific role. Which TWO actions should they take first?",
    choices: [
      "Create individual IAM users and assign role-based IAM policies with least privilege",
      "Enable AWS Shield Advanced on all accounts",
      "Create a single IAM role with PowerUser access for all developers",
      "Delete the shared account, create individual IAM users, and enable MFA for each"
    ],
    correctAnswer: 3,
    explanation: "The most critical first steps are: eliminating the shared account (creating individual IAM users so actions are traceable to specific people), and enabling MFA for each user to prevent unauthorized access. Role-based least privilege policies should follow, but individual accountability and MFA are the immediate security priorities."
  },
  {
    id: 289,
    domain: "Security and Compliance",
    question: "A company stores sensitive customer PII in Amazon S3. An auditor asks them to prove that their S3 buckets are not publicly accessible and that encryption is enabled on all objects. Which AWS service can continuously evaluate these compliance rules and flag violations?",
    choices: [
      "Amazon Inspector",
      "AWS CloudTrail",
      "AWS Config",
      "Amazon GuardDuty"
    ],
    correctAnswer: 2,
    explanation: "AWS Config continuously evaluates resource configurations against rules you define (such as 's3-bucket-public-read-prohibited' and 's3-bucket-server-side-encryption-enabled'). It flags non-compliant resources and can provide compliance history for auditors."
  },
  {
    id: 290,
    domain: "Security and Compliance",
    question: "A DevOps engineer notices unusual API calls in their AWS account at 3 AM — someone listed all S3 buckets, attempted to create new IAM users, and tried to launch EC2 instances in an unused Region. Which service would have detected this suspicious activity automatically?",
    choices: [
      "AWS CloudTrail",
      "Amazon GuardDuty",
      "AWS Trusted Advisor",
      "Amazon Macie"
    ],
    correctAnswer: 1,
    explanation: "Amazon GuardDuty uses machine learning and threat intelligence to continuously monitor for suspicious activity. It analyzes CloudTrail logs, VPC Flow Logs, and DNS logs to detect threats like unusual API calls, unauthorized access attempts, and reconnaissance patterns — exactly the behavior described."
  },
  {
    id: 291,
    domain: "Security and Compliance",
    question: "A company needs to store database credentials, API keys, and OAuth tokens that their applications reference at runtime. They want automatic rotation of these secrets on a schedule without application downtime. Which AWS service is purpose-built for this?",
    choices: [
      "AWS Systems Manager Parameter Store",
      "AWS Key Management Service (KMS)",
      "AWS Secrets Manager",
      "AWS Certificate Manager"
    ],
    correctAnswer: 2,
    explanation: "AWS Secrets Manager is specifically designed to store, retrieve, and automatically rotate secrets such as database credentials, API keys, and tokens. It integrates with RDS, Redshift, and DocumentDB for native credential rotation without requiring application changes or downtime."
  },
  {
    id: 292,
    domain: "Security and Compliance",
    question: "A web application hosted on AWS is experiencing a distributed denial-of-service (DDoS) attack with volumetric UDP floods and SYN floods targeting their infrastructure. Which AWS service provides automatic protection against these common network-layer DDoS attacks at no additional cost?",
    choices: [
      "AWS Shield Standard",
      "AWS WAF",
      "Amazon GuardDuty",
      "AWS Firewall Manager"
    ],
    correctAnswer: 0,
    explanation: "AWS Shield Standard is automatically enabled for all AWS customers at no additional cost. It protects against the most common network and transport layer DDoS attacks, including SYN/UDP floods and reflection attacks. Shield Advanced (paid) provides additional protection and 24/7 DDoS response team access."
  },
  {
    id: 293,
    domain: "Security and Compliance",
    question: "A company's application running on EC2 instances needs to read objects from an S3 bucket. A junior developer suggests creating an IAM user and embedding the access keys in the application code. The senior engineer says this is a security anti-pattern. What is the recommended approach?",
    choices: [
      "Store the access keys in AWS Secrets Manager instead of the code",
      "Use environment variables on the EC2 instance",
      "Create an IAM role with S3 read permissions and attach it to the EC2 instance",
      "Enable S3 public access so no credentials are needed"
    ],
    correctAnswer: 2,
    explanation: "The AWS best practice is to use IAM roles for EC2 instances rather than embedding or storing access keys. When you attach an IAM role to an EC2 instance, the instance automatically receives temporary, rotating credentials via the instance metadata service. This eliminates the risk of key exposure entirely."
  },
  {
    id: 294,
    domain: "Security and Compliance",
    question: "An enterprise is migrating to AWS and must comply with HIPAA, PCI DSS, and SOC 2 regulations. Before proceeding, the compliance team needs official documentation that AWS infrastructure meets these standards. Where should they obtain these compliance reports?",
    choices: [
      "AWS Trusted Advisor dashboard",
      "AWS Management Console billing section",
      "AWS Artifact",
      "AWS CloudTrail logs"
    ],
    correctAnswer: 2,
    explanation: "AWS Artifact is the central portal for accessing AWS compliance reports and agreements. It provides on-demand access to AWS security and compliance documents such as SOC reports, PCI DSS attestations, HIPAA compliance documentation, and ISO certifications."
  },
  {
    id: 295,
    domain: "Security and Compliance",
    question: "A company has 15 AWS accounts across multiple business units. The security team wants to enforce a policy that prevents anyone in any account from disabling CloudTrail logging or creating public S3 buckets. Which AWS service allows them to apply these guardrails centrally?",
    choices: [
      "IAM permission boundaries",
      "AWS Organizations with Service Control Policies (SCPs)",
      "AWS Config rules",
      "AWS Security Hub"
    ],
    correctAnswer: 1,
    explanation: "Service Control Policies (SCPs) in AWS Organizations set maximum permission guardrails that apply to all accounts in the organization. SCPs can deny specific actions (like disabling CloudTrail or setting public S3 policies) and no IAM policy within the member accounts can override them."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (8) =====
  {
    id: 296,
    domain: "Cloud Technology and Services",
    question: "A media company needs to transcode millions of short video clips uploaded by users. Each clip takes 2-5 minutes to process, and upload volume is unpredictable — sometimes 100 clips per hour, sometimes 50,000. They want zero server management. Which compute service is the best fit?",
    choices: [
      "Amazon EC2 Auto Scaling group",
      "Amazon ECS on Fargate",
      "AWS Lambda",
      "AWS Batch"
    ],
    correctAnswer: 2,
    explanation: "AWS Lambda is ideal here: each video transcode is a short-lived (2-5 minutes, within Lambda's 15-minute limit), event-driven task with highly variable volume. Lambda automatically scales from zero to thousands of concurrent executions with no server management. You pay only per invocation."
  },
  {
    id: 297,
    domain: "Cloud Technology and Services",
    question: "A company runs a mission-critical relational database on Amazon RDS in us-east-1. Their disaster recovery plan requires the database to be recoverable in a different AWS Region if us-east-1 becomes completely unavailable. Which RDS feature provides cross-Region disaster recovery?",
    choices: [
      "RDS Multi-AZ deployment",
      "RDS Read Replicas in another Region",
      "RDS automated backups",
      "RDS cross-Region read replica promoted to standalone in DR scenario"
    ],
    correctAnswer: 3,
    explanation: "A cross-Region read replica can be promoted to a standalone database instance if the primary Region fails. Multi-AZ only protects within a single Region. While automated backups can be copied cross-Region, promoting a read replica provides the fastest recovery time for cross-Region disaster recovery."
  },
  {
    id: 298,
    domain: "Cloud Technology and Services",
    question: "An IoT company collects temperature readings from 100,000 sensors every second. They need to store billions of key-value records with single-digit millisecond read latency. The data model is simple: sensor ID as key, latest readings as values. Which database service fits this workload?",
    choices: [
      "Amazon Aurora",
      "Amazon RDS for PostgreSQL",
      "Amazon DynamoDB",
      "Amazon Neptune"
    ],
    correctAnswer: 2,
    explanation: "Amazon DynamoDB is a fully managed NoSQL key-value database that delivers consistent single-digit millisecond performance at any scale. It's designed for exactly this pattern: massive volumes of simple key-value lookups with predictable low latency, handling millions of requests per second."
  },
  {
    id: 299,
    domain: "Cloud Technology and Services",
    question: "A company has a monolithic application running on a single large EC2 instance. When any component fails, the entire application goes down. Their architect recommends breaking it into loosely coupled microservices that communicate asynchronously. Which combination of AWS services supports this architecture?",
    choices: [
      "Amazon SQS for message queuing and Amazon SNS for event notifications",
      "Amazon RDS and Amazon ElastiCache",
      "AWS Direct Connect and Amazon VPC",
      "Amazon CloudFront and Amazon Route 53"
    ],
    correctAnswer: 0,
    explanation: "Amazon SQS (message queuing) and Amazon SNS (pub/sub notifications) are the core AWS services for building loosely coupled, asynchronous microservices. SQS decouples services by buffering messages between them, while SNS broadcasts events to multiple subscribers, enabling independent scaling and fault isolation."
  },
  {
    id: 300,
    domain: "Cloud Technology and Services",
    question: "A company needs to run a legacy Windows Server application that requires specific OS-level configurations, custom drivers, and persistent local storage. The application cannot be containerized or refactored. Which AWS compute service should they use?",
    choices: [
      "AWS Lambda",
      "AWS Fargate",
      "Amazon Lightsail",
      "Amazon EC2"
    ],
    correctAnswer: 3,
    explanation: "Amazon EC2 provides full control over the operating system, including Windows Server support, custom driver installation, and persistent local storage (instance store or EBS). When an application requires specific OS-level configurations and cannot be containerized, EC2 is the appropriate choice."
  },
  {
    id: 301,
    domain: "Cloud Technology and Services",
    question: "A company wants to define their entire AWS infrastructure — VPCs, EC2 instances, RDS databases, and IAM roles — as code in version-controlled templates. When they update the template, only the changed resources should be modified. Which AWS service provides this infrastructure-as-code capability?",
    choices: [
      "AWS CloudFormation",
      "AWS Systems Manager",
      "AWS OpsWorks",
      "AWS CodeDeploy"
    ],
    correctAnswer: 0,
    explanation: "AWS CloudFormation allows you to model and provision AWS resources using JSON or YAML templates. It manages resource dependencies, performs change set analysis to show what will be modified, and only updates changed resources — enabling true infrastructure as code with version control and repeatable deployments."
  },
  {
    id: 302,
    domain: "Cloud Technology and Services",
    question: "A news website experiences predictable traffic patterns: low overnight, ramping up at 6 AM, peaking at noon, and declining by 8 PM. They want their EC2 fleet to scale out before the morning ramp and scale in after evening decline to minimize costs. Which scaling approach is most efficient?",
    choices: [
      "Manual scaling by an operations engineer each morning",
      "Target tracking scaling based on CPU utilization",
      "Scheduled scaling with pre-defined scale-out and scale-in times",
      "Simple scaling with CloudWatch alarms"
    ],
    correctAnswer: 2,
    explanation: "Scheduled scaling is ideal for predictable, time-based traffic patterns. You configure the Auto Scaling group to add capacity before the 6 AM ramp and remove it after 8 PM — proactively matching supply to known demand patterns. Reactive approaches (target tracking, simple scaling) would lag behind the predictable morning surge."
  },
  {
    id: 303,
    domain: "Cloud Technology and Services",
    question: "A pharmaceutical company needs to run genomics analysis pipelines that require 96-vCPU instances with 768 GB of RAM. Each job runs for 6-12 hours and is submitted by researchers on demand. They need the jobs to run reliably without interruption. Which EC2 purchasing option is most cost-effective?",
    choices: [
      "Spot Instances",
      "On-Demand Instances",
      "Dedicated Hosts",
      "Reserved Instances (1-year term)"
    ],
    correctAnswer: 1,
    explanation: "On-Demand Instances are the best fit here. The jobs cannot tolerate interruption (ruling out Spot), run on demand rather than continuously (ruling out Reserved Instances for cost savings), and don't need hardware isolation (ruling out Dedicated Hosts). On-Demand provides reliable, pay-per-use compute without commitment."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 304,
    domain: "Billing, Pricing and Support",
    question: "A company runs a steady-state production workload on three m5.xlarge EC2 instances 24/7 for the foreseeable future. They've been paying On-Demand rates for a year. Which purchasing option would reduce their EC2 costs the most for this type of predictable, long-running workload?",
    choices: [
      "Spot Instances",
      "AWS Free Tier",
      "Compute Savings Plans (1 or 3 year)",
      "Dedicated Hosts"
    ],
    correctAnswer: 2,
    explanation: "Compute Savings Plans offer up to 66% savings over On-Demand in exchange for a commitment to a consistent amount of compute usage (measured in $/hour) for 1 or 3 years. For steady-state, predictable workloads running 24/7, this provides the best balance of savings and flexibility compared to other options."
  },
  {
    id: 305,
    domain: "Billing, Pricing and Support",
    question: "A company's production system went down at 2 AM due to an AWS service issue. Their business loses $10,000 per hour of downtime and they need direct phone access to senior cloud support engineers with a response time under 15 minutes for critical issues. Which AWS Support plan do they need at minimum?",
    choices: [
      "Basic Support",
      "Developer Support",
      "Business Support",
      "Enterprise Support"
    ],
    correctAnswer: 2,
    explanation: "Business Support is the minimum tier that provides 24/7 phone access to Cloud Support Engineers and a less than 1-hour response time for production system down cases. Enterprise Support offers faster response (15 minutes for business-critical) and a TAM, but Business Support is the minimum that meets the phone access and urgent response requirements."
  },
  {
    id: 306,
    domain: "Billing, Pricing and Support",
    question: "A startup is estimating the monthly cost of running their architecture on AWS before committing to migration. They need to model costs for specific EC2 instance types, RDS databases, S3 storage, and data transfer. Which AWS tool lets them build this cost estimate?",
    choices: [
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Pricing Calculator",
      "AWS Cost and Usage Report"
    ],
    correctAnswer: 2,
    explanation: "AWS Pricing Calculator (formerly Simple Monthly Calculator) lets you model and estimate costs for AWS services before you use them. You configure specific instance types, storage amounts, and data transfer to generate a detailed monthly cost estimate — ideal for pre-migration planning."
  }
];

questions.push(...newQuestions);

fs.writeFileSync(file, JSON.stringify(questions, null, 2));
console.log(`Done. Total questions: ${questions.length}`);
console.log(`New questions added: ${newQuestions.length} (IDs ${newQuestions[0].id}-${newQuestions[newQuestions.length-1].id})`);

// Verify answer distribution
const dist = [0,0,0,0];
questions.forEach(q => dist[q.correctAnswer]++);
console.log('Answer distribution:', dist);

// Verify domain counts
const dc = {};
questions.forEach(q => { dc[q.domain] = (dc[q.domain]||0) + 1; });
console.log('Domain counts:', dc);
