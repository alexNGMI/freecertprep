const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 607,
    domain: "Cloud Concepts",
    question: "A company is migrating 200 applications to AWS. During discovery, the architect identifies 30 applications that no one has used in over 18 months. The business units confirm these are obsolete. Rather than spending effort migrating dead applications, the architect recommends decommissioning them. Which migration strategy is this?",
    choices: [
      "Rehost",
      "Refactor",
      "Retain",
      "Retire"
    ],
    correctAnswer: 3,
    explanation: "Retire means identifying applications that are no longer useful and turning them off. Migrating applications no one uses wastes time and money. The 7 Rs migration strategy explicitly includes Retire — a critical step that can reduce the migration scope by 10-20% and eliminate ongoing licensing, maintenance, and infrastructure costs for obsolete systems."
  },
  {
    id: 608,
    domain: "Cloud Concepts",
    question: "A company migrates their Oracle database to Amazon RDS for Oracle, but changes the instance type and enables Multi-AZ. They also migrate a .NET application to Elastic Beanstalk instead of managing IIS on EC2 themselves. These are optimizations that don't require application rewrites. Which migration strategy is this?",
    choices: [
      "Rehost (lift and shift)",
      "Replatform (lift, tinker, and shift)",
      "Refactor / Re-architect",
      "Repurchase"
    ],
    correctAnswer: 1,
    explanation: "Replatforming (lift, tinker, and shift) involves making targeted optimizations during migration without changing the core application architecture. Moving Oracle to managed RDS (gaining Multi-AZ and automated backups) and moving .NET to Elastic Beanstalk (gaining managed auto-scaling) are optimizations — not full rewrites — that deliver cloud benefits with moderate effort."
  },
  {
    id: 609,
    domain: "Cloud Concepts",
    question: "A company has 50 legacy applications that they plan to migrate to AWS over the next 3 years. However, 10 of these applications have regulatory constraints that prevent cloud migration until new regulations are finalized in 2 years. The architect recommends keeping these 10 on-premises for now. Which migration strategy applies to these applications?",
    choices: [
      "Retire",
      "Retain (keep on-premises for now)",
      "Rehost immediately",
      "Repurchase with SaaS"
    ],
    correctAnswer: 1,
    explanation: "Retain means keeping applications on-premises — at least temporarily — because they're not ready for migration due to regulatory constraints, unresolved dependencies, recent capital investments, or other blockers. Retain doesn't mean 'never migrate,' but rather 'not yet.' These applications can be revisited when the regulatory landscape changes."
  },
  {
    id: 610,
    domain: "Cloud Concepts",
    question: "A company architect is explaining AWS's global infrastructure to stakeholders. She describes Regions as geographically separate areas, each containing multiple data centers. She explains that within each Region, data centers are grouped into isolated locations with independent power and networking. What are these isolated groups called?",
    choices: [
      "Edge locations",
      "Local Zones",
      "Availability Zones",
      "Points of Presence"
    ],
    correctAnswer: 2,
    explanation: "Availability Zones (AZs) are one or more discrete data centers within an AWS Region, each with redundant power, networking, and connectivity. AZs are physically separated by a meaningful distance (many kilometers) to protect against correlated failures, but connected via high-bandwidth, low-latency networking to support synchronous replication across AZs."
  },
  {
    id: 611,
    domain: "Cloud Concepts",
    question: "A company's website serves mostly static content to users worldwide. They notice that 90% of requests come from users in 5 countries. To reduce latency for these users, the architect deploys content to CloudFront. CloudFront caches content at over 400 locations worldwide. What are these caching locations called in AWS terminology?",
    choices: [
      "Availability Zones",
      "AWS Regions",
      "Edge locations (Points of Presence)",
      "Local Zones"
    ],
    correctAnswer: 2,
    explanation: "Edge locations (also called Points of Presence or PoPs) are the network endpoints that CloudFront uses to cache and deliver content close to end users. With over 400 edge locations worldwide, CloudFront places copies of your static content physically near your users — delivering it with low latency without requests traveling all the way back to the origin Region."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 612,
    domain: "Security and Compliance",
    question: "A company's application on EC2 needs to call the AWS Translate API. The developer asks whether to use access keys or an IAM role. The security architect explains that one option provides automatically rotating, temporary credentials with no risk of key exposure, while the other requires manual key rotation and carries the risk of leaking long-term credentials. Which option should they choose and why?",
    choices: [
      "Access keys — they provide stronger encryption than roles",
      "IAM roles for EC2 — they provide automatically rotating temporary credentials via STS, eliminating the risk of long-term key exposure",
      "Both are equally secure",
      "Neither — the application should use the root account"
    ],
    correctAnswer: 1,
    explanation: "IAM roles are always preferred over access keys for EC2. When you attach a role to an EC2 instance, the AWS SDK automatically retrieves temporary credentials from the instance metadata service. These credentials rotate automatically (typically every 6 hours), are never stored on disk, and cannot be accidentally committed to source control — eliminating the entire class of credential exposure risk."
  },
  {
    id: 613,
    domain: "Security and Compliance",
    question: "A company wants to ensure that all their EBS volumes are encrypted. Rather than relying on developers to manually enable encryption on each volume, they want encryption to be the default for every new EBS volume created in every Region. Which setting accomplishes this?",
    choices: [
      "Create an SCP denying unencrypted EBS volume creation",
      "Enable 'EBS encryption by default' in the EC2 settings for each Region",
      "Use AWS Config to detect and remediate unencrypted volumes after creation",
      "Create a CloudFormation template that always specifies encryption"
    ],
    correctAnswer: 1,
    explanation: "The 'EBS encryption by default' setting in the EC2 console ensures that every new EBS volume and snapshot in that Region is automatically encrypted — without developers needing to remember to enable it. This is a preventive control that applies to all creation methods (console, CLI, API, CloudFormation). It must be enabled in each Region separately."
  },
  {
    id: 614,
    domain: "Security and Compliance",
    question: "A company needs to implement a security monitoring strategy that covers three levels: (1) detect configuration changes that violate policies, (2) detect active threats and suspicious behavior, and (3) detect software vulnerabilities on running instances. Which combination of services provides all three levels?",
    choices: [
      "CloudTrail, CloudWatch, and S3 access logs",
      "AWS Config (configuration compliance), Amazon GuardDuty (threat detection), and Amazon Inspector (vulnerability scanning)",
      "AWS WAF, AWS Shield, and AWS Firewall Manager",
      "AWS Trusted Advisor, AWS Health, and AWS Support"
    ],
    correctAnswer: 1,
    explanation: "Three layers of security monitoring: AWS Config continuously evaluates resource configurations against compliance rules (detect policy violations). Amazon GuardDuty uses ML and threat intelligence to detect active threats and suspicious behavior. Amazon Inspector scans instances for software vulnerabilities and unintended network exposure. Together they provide comprehensive security coverage."
  },
  {
    id: 615,
    domain: "Security and Compliance",
    question: "A company's web application receives traffic from legitimate users worldwide, but also receives malicious requests from botnets. They want to block requests from known bot networks, require CAPTCHA for suspicious traffic, and allow verified human traffic through — all without modifying their application. Which AWS service provides this bot management?",
    choices: [
      "Amazon CloudFront with origin access identity",
      "AWS WAF Bot Control",
      "Amazon GuardDuty",
      "AWS Shield Standard"
    ],
    correctAnswer: 1,
    explanation: "AWS WAF Bot Control is a managed rule group that detects and manages bot traffic. It categorizes bots (verified bots like Googlebot vs. scrapers and botnets), provides granular control (block, rate-limit, CAPTCHA, or allow by bot category), and works with CloudFront, ALB, and API Gateway. It handles bot management at the edge without application changes."
  },
  {
    id: 616,
    domain: "Security and Compliance",
    question: "A company stores application logs in CloudWatch Logs. Their security team wants to search across all log groups for specific patterns — failed login attempts, error codes, or IP addresses associated with an incident — and correlate events across multiple services within a specific time window. Which CloudWatch feature enables this cross-log-group analysis?",
    choices: [
      "CloudWatch Metrics",
      "CloudWatch Alarms",
      "CloudWatch Logs Insights",
      "CloudWatch Dashboards"
    ],
    correctAnswer: 2,
    explanation: "CloudWatch Logs Insights provides an interactive query language for searching and analyzing log data across multiple log groups simultaneously. You can filter by time range, extract fields, aggregate data, and correlate events across services — making it the primary tool for ad-hoc log investigation during security incidents."
  },
  {
    id: 617,
    domain: "Security and Compliance",
    question: "A company is building a serverless application using API Gateway and Lambda. They need to authenticate and authorize API callers. Some endpoints require a valid JWT token from their Cognito user pool, while other endpoints are public. How should they configure authentication?",
    choices: [
      "Use IAM authentication for all endpoints",
      "Configure a Cognito user pool authorizer on API Gateway for protected endpoints, and no authorizer on public endpoints",
      "Use API keys for authentication on all endpoints",
      "Implement custom authentication logic in each Lambda function"
    ],
    correctAnswer: 1,
    explanation: "API Gateway's Cognito user pool authorizer validates JWT tokens directly at the API layer — before the request ever reaches Lambda. Protected endpoints get the Cognito authorizer (rejecting requests without valid tokens), while public endpoints have no authorizer. This offloads authentication to managed infrastructure without custom code in every Lambda function."
  },
  {
    id: 618,
    domain: "Security and Compliance",
    question: "A company's security team reviews their IAM policies quarterly. They find that several IAM users and roles have permissions they haven't used in over 90 days — permissions that were granted during initial setup but are no longer needed. Which AWS tool helps identify these unused permissions so they can be removed?",
    choices: [
      "IAM Access Analyzer with unused access findings",
      "AWS Config IAM rules",
      "Amazon Inspector IAM scanning",
      "AWS CloudTrail manual log review"
    ],
    correctAnswer: 0,
    explanation: "IAM Access Analyzer generates findings for unused access — identifying IAM users, roles, and policies with permissions that haven't been used within a specified period. It provides specific, actionable recommendations to remove unused permissions, helping organizations implement least privilege by tightening permissions based on actual usage patterns."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 619,
    domain: "Cloud Technology and Services",
    question: "A company's data pipeline ingests JSON events from Kinesis, transforms them (flattening nested objects, filtering invalid records), and writes the results to S3 in Parquet format every 5 minutes. They want this to run fully managed with no servers or Spark clusters to maintain. Which service handles this streaming ETL natively?",
    choices: [
      "Amazon EMR with Spark Streaming",
      "Amazon Kinesis Data Firehose with data transformation",
      "AWS Glue Streaming ETL",
      "Amazon Athena scheduled queries"
    ],
    correctAnswer: 1,
    explanation: "Kinesis Data Firehose can consume from Kinesis Data Streams, invoke a Lambda function for transformation (flattening, filtering), convert to Parquet format, buffer records, and write to S3 on a configurable interval — all fully managed with no infrastructure. It's the simplest serverless option for streaming ETL from Kinesis to S3."
  },
  {
    id: 620,
    domain: "Cloud Technology and Services",
    question: "A company deploys their application to a fleet of EC2 instances and wants zero-downtime deployments. They want to gradually shift traffic from the old version to the new version — 10% at first, then 50%, then 100% — with automatic rollback if error rates spike. Which deployment strategy and AWS service support this?",
    choices: [
      "Blue/green deployment using Elastic Beanstalk swap URLs",
      "Rolling deployment using AWS CodeDeploy with linear or canary traffic shifting on ALB",
      "All-at-once deployment with Auto Scaling",
      "Manual DNS cutover using Route 53"
    ],
    correctAnswer: 1,
    explanation: "AWS CodeDeploy supports canary and linear traffic shifting deployment configurations on ALB target groups. Canary shifts a small percentage first (10%), monitors CloudWatch alarms for errors, then shifts more traffic gradually. If alarms trigger, CodeDeploy automatically rolls back to the previous version — providing zero-downtime deployments with safety guarantees."
  },
  {
    id: 621,
    domain: "Cloud Technology and Services",
    question: "A company has a web application that performs image thumbnailing. Currently, a Lambda function generates thumbnails on-demand. They want to move this to a model where the thumbnail is generated ONCE when the image is uploaded to S3, stored alongside the original, and served directly — avoiding repeated on-demand processing. Which architecture pattern is this?",
    choices: [
      "Request-response pattern with caching",
      "Event-driven processing: S3 upload event triggers Lambda to generate and store the thumbnail",
      "Polling pattern with SQS",
      "Batch processing with AWS Batch"
    ],
    correctAnswer: 1,
    explanation: "Event-driven architecture: S3 sends a notification event when an object is uploaded. This event triggers a Lambda function that reads the original image, generates the thumbnail, and writes it back to S3. Subsequent requests serve the pre-generated thumbnail directly from S3/CloudFront — eliminating redundant processing. This is the canonical S3-Lambda event-driven pattern."
  },
  {
    id: 622,
    domain: "Cloud Technology and Services",
    question: "A company wants to deploy a multi-container application defined in a Docker Compose file. They want managed orchestration but don't need the complexity of Kubernetes. They prefer AWS-native tooling with deep integration into IAM, CloudWatch, and ALB. Which container orchestration service is the best fit?",
    choices: [
      "Amazon EKS",
      "Amazon ECS",
      "Docker Swarm on EC2",
      "AWS App Runner"
    ],
    correctAnswer: 1,
    explanation: "Amazon ECS is AWS's native container orchestration service with deep integration into IAM (task roles), CloudWatch (container insights), ALB (dynamic port mapping), and other AWS services. ECS supports Docker Compose via 'ecs-cli compose' and provides managed orchestration without Kubernetes complexity — ideal for teams that want container management with AWS-native tooling."
  },
  {
    id: 623,
    domain: "Cloud Technology and Services",
    question: "A company needs to run a Windows-based batch job that processes Excel files nightly. The job takes 3 hours and requires a specific version of Microsoft Office installed. Lambda doesn't support Windows, and containers require Linux. Which compute option supports this Windows-specific workload?",
    choices: [
      "AWS Lambda with a custom Windows layer",
      "Amazon ECS on Fargate with Windows containers",
      "Amazon EC2 with a Windows Server AMI (scheduled via EventBridge + Systems Manager Run Command)",
      "AWS App Runner with Windows support"
    ],
    correctAnswer: 2,
    explanation: "For Windows-specific software (Microsoft Office) that requires OS-level installation, EC2 with a Windows Server AMI is the most appropriate option. EventBridge triggers the job on schedule, Systems Manager Run Command executes the processing script remotely, and the instance can be stopped after completion to save costs. This supports any Windows software dependency."
  },
  {
    id: 624,
    domain: "Cloud Technology and Services",
    question: "A company has an application that writes data to a primary RDS database. The database handles both transactional writes (from the app) and heavy analytical queries (from the BI team). The analytical queries are slowing down write performance. How should they separate these workloads?",
    choices: [
      "Upgrade to a larger RDS instance (vertical scaling)",
      "Direct analytical queries to an RDS read replica, keeping the primary for transactional writes",
      "Switch from RDS to DynamoDB",
      "Add ElastiCache between the BI tool and RDS"
    ],
    correctAnswer: 1,
    explanation: "RDS read replicas separate read-heavy analytical workloads from the transactional primary. The BI team connects to the read replica for heavy queries while the application writes exclusively to the primary. The replica handles its own query load independently, eliminating resource contention between OLTP writes and analytical reads."
  },
  {
    id: 625,
    domain: "Cloud Technology and Services",
    question: "A company stores petabytes of data in S3 and needs a data warehouse to run complex analytical queries joining data from S3, RDS, and DynamoDB. Queries run for minutes and generate executive dashboards. They need a columnar storage engine optimized for OLAP workloads. Which AWS service provides this?",
    choices: [
      "Amazon Athena",
      "Amazon Aurora",
      "Amazon Redshift",
      "Amazon EMR"
    ],
    correctAnswer: 2,
    explanation: "Amazon Redshift is a fully managed, petabyte-scale data warehouse with columnar storage optimized for complex analytical (OLAP) queries. Redshift Spectrum queries data directly in S3, and Redshift federated query accesses RDS and DynamoDB — joining data across all three sources. It's designed for the long-running, multi-source analytical queries that power executive dashboards."
  },
  {
    id: 626,
    domain: "Cloud Technology and Services",
    question: "A company wants to implement blue/green deployments for their application. The 'blue' environment runs the current version, and the 'green' environment runs the new version. They want to instantly switch all traffic from blue to green, and instantly roll back if problems occur. Which AWS service or feature provides this instant traffic switch?",
    choices: [
      "Route 53 weighted routing with 0%/100% weights",
      "ALB with two target groups — swap the listener rule from blue to green target group",
      "CloudFront with origin failover",
      "Auto Scaling group replacement"
    ],
    correctAnswer: 1,
    explanation: "ALB listener rules can point to different target groups. For blue/green: blue target group has current instances, green has new instances. Switching the listener's default action from the blue to green target group routes 100% of traffic instantly. Rolling back is equally instant — switch the listener back to blue. No DNS propagation delay like Route 53."
  },
  {
    id: 627,
    domain: "Cloud Technology and Services",
    question: "A company needs a fully managed Apache Kafka-compatible streaming platform. Their existing applications use the Kafka API and they don't want to rewrite their producers and consumers. However, they want AWS to manage the Kafka cluster — broker provisioning, patching, and scaling. Which AWS service provides this?",
    choices: [
      "Amazon Kinesis Data Streams",
      "Amazon MSK (Managed Streaming for Apache Kafka)",
      "Amazon MQ",
      "Amazon SQS"
    ],
    correctAnswer: 1,
    explanation: "Amazon MSK is a fully managed Apache Kafka service. AWS handles cluster provisioning, broker management, patching, and ZooKeeper operations. Existing Kafka producers and consumers connect to MSK using the same Kafka API — no code changes. MSK provides the operational simplicity of a managed service with full Kafka protocol compatibility."
  },
  {
    id: 628,
    domain: "Cloud Technology and Services",
    question: "A company's application generates millions of small log entries per second that need to be searched in near-real-time. Their operations team needs full-text search across these logs with sub-second query latency, plus dashboards for visualization. Which AWS service provides managed search and log analytics?",
    choices: [
      "Amazon Athena",
      "Amazon OpenSearch Service (successor to Amazon Elasticsearch Service)",
      "Amazon Redshift",
      "Amazon RDS"
    ],
    correctAnswer: 1,
    explanation: "Amazon OpenSearch Service is a fully managed search and analytics service (based on OpenSearch/Elasticsearch). It ingests millions of log entries per second, indexes them for full-text search with sub-second query latency, and includes OpenSearch Dashboards (Kibana successor) for log visualization. It's the standard AWS solution for log analytics and full-text search."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 629,
    domain: "Billing, Pricing and Support",
    question: "A company's AWS bill shows $2,000/month for NAT gateway charges — $500 for the gateway itself and $1,500 for data processing (per-GB charges for traffic passing through). They realize most of this traffic is between their EC2 instances and S3/DynamoDB. Which specific, no-cost change would eliminate most of the data processing charges?",
    choices: [
      "Replace the NAT gateway with a NAT instance",
      "Create VPC gateway endpoints for S3 and DynamoDB (free) so this traffic bypasses the NAT gateway entirely",
      "Move EC2 instances to a public subnet",
      "Enable VPC Flow Logs to identify the traffic"
    ],
    correctAnswer: 1,
    explanation: "VPC gateway endpoints for S3 and DynamoDB route traffic directly over the AWS network without passing through the NAT gateway — and gateway endpoints are completely free. If S3/DynamoDB traffic accounts for most of the NAT data processing, this change can eliminate $1,000+ in monthly NAT charges with no impact on application functionality."
  },
  {
    id: 630,
    domain: "Billing, Pricing and Support",
    question: "A company runs GPU-accelerated machine learning training jobs that take 8-12 hours each. The jobs can be checkpointed every 30 minutes and restarted from the last checkpoint if interrupted. The company currently uses On-Demand p3.2xlarge instances at $3.06/hour. Which purchasing option could reduce their costs by up to 90%?",
    choices: [
      "Reserved Instances for p3.2xlarge",
      "EC2 Spot Instances with checkpointing",
      "Savings Plans for ML workloads",
      "Dedicated Hosts for p3 instance family"
    ],
    correctAnswer: 1,
    explanation: "Spot Instances offer up to 90% discount over On-Demand. Since the ML training jobs checkpoint every 30 minutes and can restart from the last checkpoint, they are interruption-tolerant — the defining requirement for Spot. A 2-minute interruption notice allows the job to save state. At $0.30/hour instead of $3.06/hour, the savings are dramatic for GPU workloads."
  },
  {
    id: 631,
    domain: "Billing, Pricing and Support",
    question: "A company's Developer Support plan costs $29/month but only provides business-hours email support with a 12-24 hour response time. After a production outage on Saturday night that wasn't resolved until Monday, they realize they need 24/7 phone support with faster response times. What is the minimum Support plan upgrade they need?",
    choices: [
      "Enterprise Support",
      "Enterprise On-Ramp Support",
      "Business Support",
      "No upgrade needed — Developer Support includes phone support on weekends"
    ],
    correctAnswer: 2,
    explanation: "Business Support is the minimum tier providing 24/7 phone and chat access to Cloud Support Engineers. It offers a less-than-1-hour response time for production system down cases — a significant upgrade from Developer Support's email-only, business-hours support. For companies running production workloads, Business Support is the minimum recommended tier."
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
