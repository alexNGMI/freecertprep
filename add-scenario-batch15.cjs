const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 632,
    domain: "Cloud Concepts",
    question: "A company's architect compares two designs for their web application: Design A uses a single t3.2xlarge instance with 8 vCPUs. Design B uses four t3.medium instances (2 vCPUs each) behind a load balancer. Both have the same total compute. The architect recommends Design B because if one instance fails, the app stays up. Which scaling approach does Design B use?",
    choices: [
      "Vertical scaling (scaling up)",
      "Horizontal scaling (scaling out)",
      "Diagonal scaling",
      "Elastic scaling"
    ],
    correctAnswer: 1,
    explanation: "Horizontal scaling (scaling out) distributes workload across multiple smaller instances rather than relying on one large instance. Design B uses four t3.medium instances — if one fails, three remain (75% capacity). Horizontal scaling is a cloud best practice because it provides fault tolerance, enables auto-scaling, and avoids the single-instance ceiling of vertical scaling."
  },
  {
    id: 633,
    domain: "Cloud Concepts",
    question: "A company processes sensitive health data on AWS. During a compliance audit, the auditor asks: 'Who is responsible for patching the operating system on your EC2 instances?' The company says AWS handles it. The auditor flags this as incorrect. Under the shared responsibility model, who patches the OS on EC2?",
    choices: [
      "AWS patches the OS on all EC2 instances automatically",
      "The customer is responsible for patching the guest OS on EC2 instances",
      "OS patching is shared equally between AWS and the customer",
      "Neither — EC2 instances don't require patching"
    ],
    correctAnswer: 1,
    explanation: "Under the shared responsibility model, the customer is responsible for patching the guest OS on EC2 instances. AWS manages the underlying infrastructure (hypervisor, physical host) but the customer manages everything from the OS upward — including security patches, application updates, and security group configuration. For managed services like RDS, AWS handles DB engine patching."
  },
  {
    id: 634,
    domain: "Cloud Concepts",
    question: "A company runs a containerized application on Amazon ECS with Fargate. During a compliance audit, the auditor asks who is responsible for patching the underlying operating system that runs the containers. Under the shared responsibility model for Fargate, who handles this?",
    choices: [
      "The customer patches the Fargate host OS",
      "AWS patches the underlying infrastructure including the host OS for Fargate — the customer manages their container images and application code",
      "Container OS patching is shared equally",
      "Fargate containers don't run on an operating system"
    ],
    correctAnswer: 1,
    explanation: "With Fargate (serverless containers), AWS manages the underlying host OS, infrastructure patching, and cluster capacity. The customer's responsibility shifts upward: they manage their container images (ensuring base images are free of vulnerabilities), application code, IAM task roles, and network configuration. This is why the shared responsibility model shifts depending on the service type."
  },
  {
    id: 635,
    domain: "Cloud Concepts",
    question: "A company's workload runs in us-east-1. Their architect notices that AWS has recently launched a new Region in their country. She recommends evaluating whether to migrate to the closer Region for lower latency and data residency compliance. She also notes that not all AWS services are available in new Regions immediately. What is a key consideration when choosing an AWS Region?",
    choices: [
      "All Regions have identical service availability, pricing, and features",
      "Key factors include: latency to users, data residency/compliance requirements, service availability in the Region, and pricing differences",
      "AWS Regions are identical — the only difference is geographic location",
      "New Regions always have more services than established Regions"
    ],
    correctAnswer: 1,
    explanation: "Region selection depends on multiple factors: proximity to users (latency), data residency laws (some countries require data to stay within borders), service availability (new Regions may not have all services on day one), and pricing (some Regions cost more than others). A thorough evaluation of all four factors is essential before selecting or migrating to a Region."
  },
  {
    id: 636,
    domain: "Cloud Concepts",
    question: "A company built a monolithic application that handles user authentication, payment processing, order management, and email notifications in a single codebase. A bug in the email notification module causes the entire application to crash, taking down payments and order management. Their architect recommends decomposing this into independent services. What is the primary architectural benefit?",
    choices: [
      "Reduced total lines of code",
      "Fault isolation — a failure in email notifications doesn't cascade to payments and orders when services are independent",
      "Lower cloud costs",
      "Faster database queries"
    ],
    correctAnswer: 1,
    explanation: "Fault isolation is the primary benefit of decomposition. In a monolith, a crash anywhere takes down everything. In a decomposed architecture, each service (auth, payments, orders, email) runs independently — an email service failure is isolated and doesn't affect payments or orders. This dramatically improves overall system reliability and simplifies debugging."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 637,
    domain: "Security and Compliance",
    question: "A company wants to implement the principle of least privilege but is unsure what permissions each application actually needs. They plan to start with broad permissions, monitor actual API usage for 90 days, then tighten permissions based on what was actually used. Which AWS tool generates least-privilege IAM policies based on observed access activity?",
    choices: [
      "AWS CloudTrail Insights",
      "IAM Access Analyzer policy generation based on CloudTrail activity",
      "AWS Trusted Advisor IAM checks",
      "AWS Config IAM rules"
    ],
    correctAnswer: 1,
    explanation: "IAM Access Analyzer can generate IAM policies based on actual CloudTrail activity. After monitoring an IAM role's API calls for a specified period, Access Analyzer generates a policy that grants only the permissions that were actually used — providing a data-driven path from broad permissions to true least privilege."
  },
  {
    id: 638,
    domain: "Security and Compliance",
    question: "A company's security incident response plan requires that when GuardDuty detects a compromised EC2 instance (e.g., communication with a C2 server), the instance should be automatically isolated by changing its security group to block all traffic, and the security team should be notified via PagerDuty. Which architecture automates this response?",
    choices: [
      "GuardDuty → manual security team review → manual security group change",
      "GuardDuty finding → EventBridge rule → Lambda function (isolate instance + notify PagerDuty)",
      "GuardDuty → CloudWatch alarm → Auto Scaling terminate instance",
      "GuardDuty → AWS Config → remediation"
    ],
    correctAnswer: 1,
    explanation: "GuardDuty findings are published to EventBridge as events. An EventBridge rule matches specific finding types (e.g., Trojan:EC2/C&CActivity) and triggers a Lambda function. The Lambda function modifies the instance's security group to an isolation group (deny all ingress/egress), takes a forensic snapshot of the EBS volume, and calls PagerDuty's API — all within seconds, automatically."
  },
  {
    id: 639,
    domain: "Security and Compliance",
    question: "A company uses multiple AWS accounts and wants to share specific resources — a Transit Gateway, a subnet, and a License Manager configuration — with other accounts in their organization without creating duplicate resources. Which AWS service enables resource sharing across accounts?",
    choices: [
      "AWS Organizations consolidated billing",
      "IAM cross-account roles",
      "AWS Resource Access Manager (RAM)",
      "VPC peering"
    ],
    correctAnswer: 2,
    explanation: "AWS Resource Access Manager (RAM) enables secure sharing of specific AWS resources across accounts within an AWS Organization. Supported resources include Transit Gateways, VPC subnets, Route 53 Resolver rules, License Manager configurations, and more. RAM eliminates resource duplication while maintaining centralized ownership and access control."
  },
  {
    id: 640,
    domain: "Security and Compliance",
    question: "A company deploys a new Lambda function that processes customer PII. Six months later, a security audit asks: 'What code changes were made to this function, by whom, and when?' The audit also asks for a log of every invocation of the function and what event triggered it. Which two services provide this complete audit trail?",
    choices: [
      "CloudWatch Logs for code changes and X-Ray for invocations",
      "AWS CloudTrail for API calls (function updates, invocations, configuration changes) and Lambda version/alias history with code signing for code integrity",
      "Amazon Inspector for code analysis and GuardDuty for invocation tracking",
      "AWS Config for configuration history and S3 access logs for code storage"
    ],
    correctAnswer: 1,
    explanation: "CloudTrail records all Lambda API calls: UpdateFunctionCode (who changed code, when), Invoke (every invocation, with event source), and UpdateFunctionConfiguration (settings changes). Lambda versioning preserves immutable snapshots of each code version, and Lambda code signing ensures only trusted code from approved publishers can be deployed. Together they provide complete auditability."
  },
  {
    id: 641,
    domain: "Security and Compliance",
    question: "A company is designing their VPC and needs to decide between security groups and Network ACLs. Their architect explains that security groups are stateful (return traffic is automatically allowed) while NACLs are stateless (return traffic must be explicitly allowed). For which scenario would NACLs be more appropriate than security groups?",
    choices: [
      "When you need to allow specific inbound ports for a web server",
      "When you need to explicitly DENY traffic from specific IP ranges at the subnet level — security groups can only allow, not deny",
      "When you need to track connection state for TCP traffic",
      "When you need to apply rules to a specific EC2 instance"
    ],
    correctAnswer: 1,
    explanation: "NACLs support explicit DENY rules, while security groups only support ALLOW rules (everything else is implicitly denied). If you need to block specific IP ranges (known malicious IPs, banned countries), NACLs are the right tool — they operate at the subnet level and can deny traffic before it reaches any instance. Security groups are better for instance-level allow-list rules."
  },
  {
    id: 642,
    domain: "Security and Compliance",
    question: "A company migrated to AWS and their security team wants to set up an automated compliance framework. They need continuous monitoring against CIS Benchmarks, automated evidence collection for SOC 2 audits, and centralized security findings from all their detection services. Which three services compose this compliance monitoring stack?",
    choices: [
      "CloudTrail, CloudWatch, and S3",
      "Security Hub (CIS compliance checks + centralized findings), AWS Audit Manager (automated evidence for SOC 2), and AWS Config (continuous resource compliance)",
      "GuardDuty, Inspector, and Macie",
      "Trusted Advisor, Health Dashboard, and Support"
    ],
    correctAnswer: 1,
    explanation: "Three-service compliance stack: Security Hub runs CIS Benchmark checks and aggregates findings from GuardDuty/Inspector/Macie into one dashboard. Audit Manager automatically collects evidence from CloudTrail/Config/Security Hub and maps it to SOC 2 controls. Config provides continuous resource configuration evaluation against custom and managed compliance rules."
  },
  {
    id: 643,
    domain: "Security and Compliance",
    question: "A company's developers use IAM users with access keys for CI/CD pipelines running in GitHub Actions. The security team is concerned about long-lived credentials being stored as GitHub secrets. They want the CI/CD pipeline to authenticate to AWS without any stored credentials. Which approach eliminates stored AWS credentials in GitHub?",
    choices: [
      "Rotate the access keys more frequently",
      "Use IAM roles with GitHub Actions OIDC federation — GitHub authenticates to AWS via OpenID Connect and receives temporary credentials",
      "Store the keys in AWS Secrets Manager and retrieve them at runtime",
      "Use the AWS root account credentials in GitHub Actions"
    ],
    correctAnswer: 1,
    explanation: "GitHub Actions supports OIDC (OpenID Connect) federation with AWS. Instead of storing access keys as GitHub secrets, the pipeline assumes an IAM role via OIDC: GitHub sends a signed JWT to AWS STS, which verifies it against the configured OIDC identity provider and returns temporary credentials. Zero stored credentials, automatic expiration, and no keys to rotate."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 644,
    domain: "Cloud Technology and Services",
    question: "A company needs to replicate their S3 bucket in us-east-1 to a bucket in eu-west-1 for disaster recovery and to serve European users from a closer Region. Objects should be replicated automatically within 15 minutes of being written. Which S3 feature provides this?",
    choices: [
      "S3 Transfer Acceleration",
      "S3 Cross-Region Replication (CRR)",
      "CloudFront with S3 origin",
      "S3 Multi-Region Access Points"
    ],
    correctAnswer: 1,
    explanation: "S3 Cross-Region Replication (CRR) automatically replicates objects from a source bucket to a destination bucket in a different Region. Most objects replicate within 15 minutes. CRR requires versioning on both buckets and can replicate entire buckets or specific prefixes/tags. It provides a DR copy in another Region and reduces access latency for users near the destination Region."
  },
  {
    id: 645,
    domain: "Cloud Technology and Services",
    question: "A company has S3 buckets in 5 AWS Regions and wants their application to automatically route S3 requests to the nearest bucket with the lowest latency — without the application needing to know which Region contains the data. Which S3 feature provides this single global endpoint with intelligent routing?",
    choices: [
      "S3 Cross-Region Replication",
      "S3 Transfer Acceleration",
      "S3 Multi-Region Access Points",
      "CloudFront with multiple S3 origins"
    ],
    correctAnswer: 2,
    explanation: "S3 Multi-Region Access Points provide a single global endpoint that dynamically routes S3 requests to the closest bucket based on network latency. The application uses one endpoint (e.g., mrap.mrap.s3-global.amazonaws.com) and AWS automatically routes to the lowest-latency bucket — abstracting multi-Region complexity from the application."
  },
  {
    id: 646,
    domain: "Cloud Technology and Services",
    question: "A company is building a real-time multiplayer game that requires ultra-low latency communication between game clients and game servers running on EC2. They want to use AWS's global network to accelerate player traffic from anywhere in the world to the optimal game server, with static IP addresses for DNS-free connection. Which service provides this?",
    choices: [
      "Amazon CloudFront",
      "Amazon Route 53 latency-based routing",
      "AWS Global Accelerator",
      "AWS Direct Connect"
    ],
    correctAnswer: 2,
    explanation: "AWS Global Accelerator provides static anycast IP addresses and routes player traffic over the AWS global network (instead of the public internet) to the optimal game server endpoint. It improves latency by up to 60% by entering the AWS network at the closest edge location and traveling over AWS's private backbone — ideal for real-time gaming where every millisecond matters."
  },
  {
    id: 647,
    domain: "Cloud Technology and Services",
    question: "A company migrating to AWS needs to understand dependencies between their on-premises servers before migration. They discover that Server A communicates with Server B on port 3306 (MySQL) and Server C on port 443 (HTTPS). Without understanding these dependencies, migrating Server A alone would break the application. Which AWS service maps these server dependencies?",
    choices: [
      "AWS Migration Hub",
      "AWS Application Discovery Service",
      "AWS Database Migration Service",
      "AWS Server Migration Service"
    ],
    correctAnswer: 1,
    explanation: "AWS Application Discovery Service collects detailed information about on-premises servers including network connections, communication patterns, and port dependencies. It maps which servers communicate with which others, on what ports, and how much data flows between them — critical for grouping dependent servers into migration waves and avoiding broken dependencies."
  },
  {
    id: 648,
    domain: "Cloud Technology and Services",
    question: "A company has completed application discovery and is now executing their migration. They have 200 servers being migrated in 10 waves over 6 months. They need a single dashboard to track migration status across all servers — which are in progress, which are complete, and which have issues. Which AWS service provides this migration tracking?",
    choices: [
      "AWS Application Discovery Service",
      "AWS Migration Hub",
      "AWS CloudFormation",
      "AWS Systems Manager"
    ],
    correctAnswer: 1,
    explanation: "AWS Migration Hub provides a single dashboard to track migration progress across multiple AWS tools (DMS, SMS, Application Migration Service). It shows the status of each server/application: not started, in progress, or complete — giving stakeholders a unified view of the entire migration program across all 200 servers and 10 waves."
  },
  {
    id: 649,
    domain: "Cloud Technology and Services",
    question: "A company wants to lift and shift their VMware vSphere virtual machines from on-premises to EC2. They need an automated tool that replicates VMs to AWS, keeps them synchronized during migration, allows testing before cutover, and performs the final cutover with minimal downtime. Which AWS service automates this server migration?",
    choices: [
      "AWS Snowball Edge",
      "AWS Application Migration Service (MGN)",
      "AWS Database Migration Service",
      "AWS DataSync"
    ],
    correctAnswer: 1,
    explanation: "AWS Application Migration Service (MGN) — formerly CloudEndure Migration — automates lift-and-shift migration of physical, virtual, and cloud servers to EC2. It continuously replicates server volumes to AWS, allows non-disruptive test launches, and performs cutover with minimal downtime. It supports VMware, Hyper-V, and physical servers."
  },
  {
    id: 650,
    domain: "Cloud Technology and Services",
    question: "A company's data lake in S3 contains data from hundreds of sources in different formats (CSV, JSON, Parquet, ORC). Before analysts can query this data with Athena, they need a searchable catalog that describes each dataset's schema, location, and format. Which service automatically crawls S3 and builds this metadata catalog?",
    choices: [
      "Amazon Redshift Spectrum",
      "AWS Glue Data Catalog with Glue Crawlers",
      "Amazon Athena",
      "AWS Lake Formation"
    ],
    correctAnswer: 1,
    explanation: "AWS Glue Crawlers automatically scan data in S3, infer schemas (column names, data types), and populate the Glue Data Catalog with table definitions. The Data Catalog becomes the central metadata repository — Athena, Redshift Spectrum, and EMR all query it to understand where data lives and what schema it has, enabling SQL queries across the data lake."
  },
  {
    id: 651,
    domain: "Cloud Technology and Services",
    question: "A company wants to build a data lake with fine-grained access control — different analysts should see different columns and rows based on their role. They need centralized governance over data access, including column-level and row-level security. Which AWS service provides data lake governance with fine-grained permissions?",
    choices: [
      "Amazon S3 bucket policies",
      "AWS Glue Data Catalog",
      "AWS Lake Formation",
      "Amazon Athena workgroups"
    ],
    correctAnswer: 2,
    explanation: "AWS Lake Formation provides centralized data lake governance with fine-grained access control at the database, table, column, and row level. Instead of managing complex S3 bucket policies and IAM permissions separately, Lake Formation provides a single permission model — granting analyst A access to columns 1-5 while analyst B sees all columns including PII."
  },
  {
    id: 652,
    domain: "Cloud Technology and Services",
    question: "A company runs a high-traffic API that handles 50,000 requests per second. Their backend is a fleet of EC2 instances behind a Network Load Balancer. During peak traffic, some EC2 instances run out of available database connections. They need a service that pools database connections across all instances to reduce the total connections to RDS. Which service helps?",
    choices: [
      "RDS Read Replicas",
      "Amazon ElastiCache",
      "Amazon RDS Proxy",
      "RDS Multi-AZ"
    ],
    correctAnswer: 2,
    explanation: "Amazon RDS Proxy sits between the application fleet and RDS, pooling and multiplexing database connections. Instead of 50,000 direct connections from EC2 to RDS, RDS Proxy maintains a smaller pool of persistent connections, sharing them across requests. This dramatically reduces database connection exhaustion, improves failover times, and is essential for high-connection workloads."
  },
  {
    id: 653,
    domain: "Cloud Technology and Services",
    question: "A company wants to transform data stored in S3 on the fly — when an application reads an object, the data should be automatically filtered, redacted, or transformed before being returned. Different applications should see different views of the same underlying data. Which S3 feature enables this?",
    choices: [
      "S3 Select",
      "S3 Object Lambda",
      "S3 Access Points",
      "S3 Batch Operations"
    ],
    correctAnswer: 1,
    explanation: "S3 Object Lambda allows you to add custom code (via Lambda) that transforms data as it's retrieved from S3. Each S3 Object Lambda Access Point can apply different transformations — one application gets PII redacted, another gets data converted to a different format — all from the same underlying S3 object. No need to store multiple copies of the data."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 654,
    domain: "Billing, Pricing and Support",
    question: "A company runs production workloads on AWS and experiences an issue where an RDS instance in a Multi-AZ deployment fails to automatically failover. They need to open a critical support case and get a response within 15 minutes. Which is the ONLY AWS Support plan that guarantees a 15-minute response time for business-critical system outages?",
    choices: [
      "Business Support (1-hour response for production system down)",
      "Enterprise On-Ramp Support (30-minute response for business-critical)",
      "Enterprise Support (15-minute response for business/mission-critical system down)",
      "Developer Support (12-hour response for general guidance)"
    ],
    correctAnswer: 2,
    explanation: "Enterprise Support is the only tier with a 15-minute response time for business-critical system down cases. Enterprise On-Ramp offers 30 minutes, Business offers 1 hour, and Developer only provides general guidance responses within 12 hours. For mission-critical workloads requiring the fastest response, Enterprise Support is the only option."
  },
  {
    id: 655,
    domain: "Billing, Pricing and Support",
    question: "A company runs a development environment that's used Monday through Friday, 9 AM to 6 PM (9 hours/day, 5 days/week = 45 hours/week). They currently pay On-Demand rates for 168 hours/week (24/7). By scheduling instances to only run during business hours, what percentage of their current EC2 compute costs can they save?",
    choices: [
      "About 25%",
      "About 50%",
      "About 73% — they only need 45 of 168 hours, saving 123 hours/week",
      "About 90%"
    ],
    correctAnswer: 2,
    explanation: "45 hours used / 168 hours in a week = 27% utilization. Stopping instances during off-hours saves 73% of compute costs (123 unused hours × instance cost). For non-production environments, scheduling instance start/stop is one of the highest-impact, lowest-effort cost optimizations available — often saving tens of thousands of dollars per month across a fleet."
  },
  {
    id: 656,
    domain: "Billing, Pricing and Support",
    question: "A company's finance team wants to understand the pricing model for Amazon S3. They know storage is charged per GB-month, but they're confused about what other S3 costs exist. Which statement correctly describes the COMPLETE S3 pricing model?",
    choices: [
      "S3 charges only for storage per GB-month — everything else is free",
      "S3 charges for: (1) storage per GB-month, (2) requests (PUT, GET, LIST, etc. per 1,000 requests), (3) data transfer OUT to the internet per GB, (4) optional features like replication, analytics, and Object Lock",
      "S3 charges a flat monthly fee regardless of usage",
      "S3 charges only for data transfer — storage itself is free"
    ],
    correctAnswer: 1,
    explanation: "S3 pricing has multiple components: storage cost varies by storage class (Standard, IA, Glacier). Request charges apply per 1,000 PUT/GET/LIST operations. Data transfer OUT to the internet is charged per GB (IN is free). Additional charges apply for S3 Replication, S3 Analytics, S3 Inventory, and Object Lock. Understanding all components prevents billing surprises."
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
