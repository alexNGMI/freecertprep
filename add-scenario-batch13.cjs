const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 582,
    domain: "Cloud Concepts",
    question: "A company's new VP of Engineering comes from a traditional IT background and is skeptical of cloud. She asks: 'Why should we trust AWS with our infrastructure when we've managed our own for 20 years?' The cloud architect lists several advantages: AWS invests more in security than any single company, employs thousands of engineers focused solely on availability, and operates at a scale that drives down costs. Which cloud value proposition is the architect describing?",
    choices: [
      "Vendor lock-in mitigation",
      "The benefits of leveraging a hyperscale cloud provider's investment in security, availability, and economies of scale",
      "Guaranteed zero downtime",
      "Free migration assistance from AWS"
    ],
    correctAnswer: 1,
    explanation: "Hyperscale cloud providers like AWS make massive investments in physical security, network redundancy, hardware innovation, and operational excellence that no individual company could match. By leveraging AWS, the company benefits from billions in annual security investment, purpose-built data centers, and pricing efficiencies that come from operating at global scale."
  },
  {
    id: 583,
    domain: "Cloud Concepts",
    question: "A company is evaluating their migration strategy. They have 200 on-premises applications. Some can move to AWS as-is (lift and shift), some need minor modifications for cloud optimization, and some should be completely re-architected as cloud-native. Which AWS framework categorizes migration strategies into these patterns?",
    choices: [
      "The AWS Well-Architected Framework 6 pillars",
      "The 7 Rs of cloud migration (Rehost, Replatform, Repurchase, Refactor, Retire, Retain, Relocate)",
      "The AWS Shared Responsibility Model",
      "The AWS Cloud Adoption Framework perspectives"
    ],
    correctAnswer: 1,
    explanation: "The 7 Rs categorize migration strategies: Rehost (lift and shift as-is), Replatform (minor optimization like moving to managed database), Refactor/Re-architect (redesign as cloud-native), Repurchase (switch to SaaS), Retire (decommission), Retain (keep on-premises), and Relocate (move to VMware Cloud on AWS). Each application maps to one or more strategies."
  },
  {
    id: 584,
    domain: "Cloud Concepts",
    question: "A company runs a legacy application on-premises. Rather than refactoring it for cloud-native services, they want to move it to AWS EC2 instances with minimal changes — same OS, same configuration, just running on AWS infrastructure. Which migration strategy does this describe?",
    choices: [
      "Refactor / Re-architect",
      "Replatform",
      "Rehost (lift and shift)",
      "Repurchase"
    ],
    correctAnswer: 2,
    explanation: "Rehosting (lift and shift) moves an application to AWS with minimal or no modifications — typically from on-premises VMs to EC2 instances. The application runs the same OS and configuration, just on AWS infrastructure. This is the fastest migration path, often used as a first step before later optimization."
  },
  {
    id: 585,
    domain: "Cloud Concepts",
    question: "A company decides to replace their on-premises email system with Microsoft 365 instead of migrating the email server to EC2. Instead of managing email infrastructure, they switch to a fully managed SaaS product. Which migration strategy does this represent?",
    choices: [
      "Rehost",
      "Replatform",
      "Repurchase (drop and shop)",
      "Refactor"
    ],
    correctAnswer: 2,
    explanation: "Repurchase (also called 'drop and shop') means replacing an existing application with a different product — typically a SaaS offering. Instead of moving the email server to EC2, the company abandons self-managed email entirely and subscribes to Microsoft 365. This eliminates infrastructure management but may require data migration and user retraining."
  },
  {
    id: 586,
    domain: "Cloud Concepts",
    question: "A company's monolithic on-premises application has a component that processes millions of events per hour. During migration planning, the architect recommends extracting this component and rebuilding it using Lambda, SQS, and DynamoDB — fully cloud-native and serverless. Which migration strategy does this extraction and rebuild represent?",
    choices: [
      "Rehost",
      "Replatform",
      "Retire",
      "Refactor / Re-architect"
    ],
    correctAnswer: 3,
    explanation: "Refactoring (re-architecting) means fundamentally redesigning the application to take full advantage of cloud-native features. Extracting a monolithic component into Lambda + SQS + DynamoDB is a complete redesign — serverless, event-driven, and auto-scaling. This provides the most cloud benefits but requires the most effort."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 587,
    domain: "Security and Compliance",
    question: "A company uses Amazon S3 to store sensitive financial reports. They want to implement a 'belt and suspenders' approach: encrypt data at rest AND restrict who can access it. Which combination provides both encryption and access control for S3?",
    choices: [
      "S3 server-side encryption with KMS (SSE-KMS) for encryption at rest, combined with bucket policies and IAM policies for access control",
      "Enable versioning for encryption and use CORS for access control",
      "Use S3 Transfer Acceleration for encryption and public access for sharing",
      "Enable S3 static website hosting with password protection"
    ],
    correctAnswer: 0,
    explanation: "SSE-KMS encrypts every object at rest using keys managed in KMS — with auditable key usage via CloudTrail. Bucket policies define who can access the bucket (by account, IAM principal, IP range), and IAM policies further scope what specific users/roles can do. Together, they provide defense in depth: even if access controls are misconfigured, data remains encrypted."
  },
  {
    id: 588,
    domain: "Security and Compliance",
    question: "A company's compliance team wants to continuously monitor whether their AWS environment meets a set of baseline security standards — root MFA enabled, CloudTrail active in all Regions, no unrestricted SSH access, EBS encryption default enabled. They want a compliance dashboard with a percentage score. Which service provides this continuous compliance posture assessment?",
    choices: [
      "AWS Trusted Advisor",
      "Amazon Inspector",
      "AWS Security Hub with CIS AWS Foundations Benchmark enabled",
      "AWS Config dashboard"
    ],
    correctAnswer: 2,
    explanation: "AWS Security Hub runs automated compliance checks against industry standards like the CIS AWS Foundations Benchmark, AWS Foundational Security Best Practices, and PCI DSS. It evaluates dozens of controls (root MFA, CloudTrail, SSH restrictions, EBS encryption), calculates a compliance percentage score, and provides a dashboard showing pass/fail per check."
  },
  {
    id: 589,
    domain: "Security and Compliance",
    question: "A company manages 50 AWS accounts. The CISO wants to ensure GuardDuty is enabled in every account and every Region, and that all findings are aggregated to a central security account. Manually configuring GuardDuty in each account-Region combination is impractical. Which approach automates this across the organization?",
    choices: [
      "Enable GuardDuty manually in each account",
      "Use AWS CloudFormation StackSets to deploy GuardDuty, or designate a delegated GuardDuty administrator account in AWS Organizations for automatic enrollment",
      "Use AWS Config to monitor GuardDuty status",
      "Enable GuardDuty only in the management account"
    ],
    correctAnswer: 1,
    explanation: "GuardDuty integrates with AWS Organizations — you designate a delegated administrator account, which automatically enables GuardDuty across all member accounts and Regions and aggregates findings centrally. Alternatively, CloudFormation StackSets can deploy GuardDuty configuration across all accounts. Both approaches scale to any number of accounts without manual configuration."
  },
  {
    id: 590,
    domain: "Security and Compliance",
    question: "A company's application processes credit card payments and must comply with PCI DSS. Their compliance team needs to determine which PCI DSS controls are AWS's responsibility versus the company's responsibility. For example, who is responsible for physical security of servers, and who is responsible for application-level firewall rules?",
    choices: [
      "AWS handles all PCI DSS controls when the company uses AWS services",
      "The company handles all PCI DSS controls even for AWS-managed infrastructure",
      "AWS handles physical security and infrastructure controls; the company handles application-level controls, firewall rules, access management, and data protection per the shared responsibility model",
      "PCI DSS compliance is not possible on AWS"
    ],
    correctAnswer: 2,
    explanation: "PCI DSS responsibility splits per the shared responsibility model: AWS handles controls for physical security, hypervisor hardening, network infrastructure, and managed service patching. The company handles application firewalls (WAF/security groups), data encryption, access management (IAM), log monitoring, and application security testing. AWS Artifact provides the PCI AoC documenting AWS's controls."
  },
  {
    id: 591,
    domain: "Security and Compliance",
    question: "A company's Lambda functions make calls to several internal microservices. During a security incident investigation, the team needs to determine which Lambda function called which service, when, and what data was exchanged — tracing a request through the entire call chain. Which service combination provides this investigation capability?",
    choices: [
      "CloudTrail for Lambda invocations and X-Ray for distributed tracing across the call chain",
      "VPC Flow Logs for Lambda networking",
      "CloudWatch Logs for Lambda output only",
      "Amazon Inspector for Lambda code analysis"
    ],
    correctAnswer: 0,
    explanation: "CloudTrail records every Lambda invocation (who called it, when, the event source). AWS X-Ray traces the entire request path across Lambda, API Gateway, DynamoDB, and other services — showing latency, errors, and data flow at each hop. Together they provide both the audit trail (CloudTrail) and the distributed trace visualization (X-Ray) for incident investigation."
  },
  {
    id: 592,
    domain: "Security and Compliance",
    question: "A company stores backup archives in S3 Glacier Deep Archive with a 7-year retention requirement. Regulators require proof that these backups cannot be deleted before the retention period expires — not by developers, not by administrators, and not even by the root account. Which S3 feature provides this guarantee?",
    choices: [
      "S3 versioning with MFA Delete",
      "S3 bucket policy denying DeleteObject",
      "S3 Object Lock in Compliance mode with a 7-year retention period",
      "S3 lifecycle policies preventing deletion"
    ],
    correctAnswer: 2,
    explanation: "S3 Object Lock in Compliance mode is the ONLY mechanism that prevents deletion by ALL principals — including the root account — for the specified retention period. Governance mode can be overridden by users with special permissions, and bucket policies can be changed by administrators. Compliance mode is immutable once set, meeting the strictest regulatory requirements."
  },
  {
    id: 593,
    domain: "Security and Compliance",
    question: "A developer accidentally runs 'aws s3 rm --recursive' on a production S3 bucket, deleting thousands of objects. The bucket has versioning enabled. Are the objects permanently lost?",
    choices: [
      "Yes — once deleted, objects cannot be recovered",
      "No — with versioning enabled, 'delete' adds a delete marker but previous versions are preserved. Objects can be recovered by removing the delete marker or restoring previous versions",
      "Only objects uploaded in the last 24 hours can be recovered",
      "Objects can only be recovered if S3 Cross-Region Replication was enabled"
    ],
    correctAnswer: 1,
    explanation: "With S3 versioning enabled, a DELETE operation doesn't permanently remove data — it inserts a delete marker as the current version. All previous versions remain intact. To recover, you either remove the delete marker (restoring the latest version) or copy a specific prior version. This is why versioning is a critical data protection mechanism — it protects against accidental deletion."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 594,
    domain: "Cloud Technology and Services",
    question: "A company wants to manage their infrastructure using familiar programming languages (TypeScript, Python, Java) instead of YAML/JSON templates. They want to use loops, conditionals, and IDE auto-completion when defining AWS resources. Which tool allows infrastructure as code using general-purpose programming languages?",
    choices: [
      "AWS CloudFormation with YAML",
      "AWS CDK (Cloud Development Kit)",
      "AWS CLI scripts",
      "AWS Systems Manager documents"
    ],
    correctAnswer: 1,
    explanation: "AWS CDK lets you define cloud infrastructure using TypeScript, Python, Java, C#, or Go. You write code with loops, conditions, and abstractions — CDK synthesizes it into CloudFormation templates. CDK constructs provide high-level, opinionated defaults while allowing full customization, making IaC more accessible to developers who prefer programming languages over YAML."
  },
  {
    id: 595,
    domain: "Cloud Technology and Services",
    question: "A company needs to store their Terraform state files in a shared, durable location that supports locking to prevent concurrent modifications. They want an AWS-native solution. Which combination of AWS services provides remote state storage and state locking for Terraform?",
    choices: [
      "Amazon EBS volume mounted to an EC2 instance",
      "Amazon S3 for state storage and Amazon DynamoDB for state locking",
      "Amazon EFS shared file system",
      "AWS CodeCommit Git repository"
    ],
    correctAnswer: 1,
    explanation: "The standard AWS backend for Terraform uses S3 to store state files (with versioning and encryption for durability and security) and DynamoDB for state locking (preventing concurrent terraform apply commands from corrupting state). This is well-documented, battle-tested, and the recommended approach for team-based Terraform on AWS."
  },
  {
    id: 596,
    domain: "Cloud Technology and Services",
    question: "A company runs a web application where some API endpoints are computationally expensive (image processing) and others are lightweight (returning cached data). They want the expensive endpoints to scale independently from the lightweight ones. Which architecture enables this independent scaling?",
    choices: [
      "Deploy everything on a single large EC2 instance",
      "Microservices architecture: each API endpoint as a separate service (Lambda or container) behind API Gateway, scaling independently",
      "Vertical scaling — upgrade to a more powerful instance when heavy endpoints slow down",
      "Use a single Auto Scaling group for all endpoints"
    ],
    correctAnswer: 1,
    explanation: "Microservices architecture allows each endpoint to be a separate service that scales independently. The image processing endpoint can scale to 100 concurrent Lambda invocations during heavy load while the cached data endpoint runs at minimal capacity. API Gateway routes /image to one service and /data to another — each right-sized for its specific demand pattern."
  },
  {
    id: 597,
    domain: "Cloud Technology and Services",
    question: "A company wants to automate their infrastructure deployment workflow: when code is pushed to a Git repository, it should automatically trigger a build, run tests, and deploy the CloudFormation stack to AWS — continuous integration and continuous delivery. Which AWS service orchestrates this multi-stage pipeline?",
    choices: [
      "AWS CodeBuild",
      "AWS CodeDeploy",
      "AWS CodePipeline",
      "AWS CodeCommit"
    ],
    correctAnswer: 2,
    explanation: "AWS CodePipeline is the orchestration service that connects the stages: Source (CodeCommit/GitHub trigger on push), Build (CodeBuild runs tests and produces artifacts), and Deploy (CloudFormation/CodeDeploy deploys to AWS). CodePipeline manages the flow between stages, handles approvals, and provides visibility into the pipeline status."
  },
  {
    id: 598,
    domain: "Cloud Technology and Services",
    question: "A company stores application source code and wants a fully managed Git repository hosted on AWS that integrates natively with CodePipeline, CodeBuild, and IAM for access control. Which service provides private Git hosting within AWS?",
    choices: [
      "GitHub",
      "Amazon S3 with versioning",
      "AWS CodeCommit",
      "AWS CodeArtifact"
    ],
    correctAnswer: 2,
    explanation: "AWS CodeCommit is a fully managed, private Git repository service hosted on AWS. It integrates natively with CodePipeline (as a source provider), IAM (for repository access control), CloudTrail (for audit logs), and encryption at rest via KMS. It's the AWS-native option for teams wanting Git repositories within their AWS ecosystem."
  },
  {
    id: 599,
    domain: "Cloud Technology and Services",
    question: "A company needs to store and manage versioned software packages — npm packages, Python pip packages, Maven artifacts, and Docker images — in a private registry within AWS. Developers should be able to pull packages from both their private registry and public registries like npmjs.com through a single endpoint. Which service provides this?",
    choices: [
      "AWS CodeCommit",
      "Amazon ECR (Elastic Container Registry)",
      "AWS CodeArtifact",
      "Amazon S3"
    ],
    correctAnswer: 2,
    explanation: "AWS CodeArtifact is a fully managed artifact repository that supports npm, pip, Maven, NuGet, and other package formats. It acts as an upstream proxy — developers configure one endpoint and CodeArtifact fetches from both private packages and public registries (npmjs.com, PyPI), caching public packages and serving private ones from the same location."
  },
  {
    id: 600,
    domain: "Cloud Technology and Services",
    question: "A company has a VPC with public and private subnets. Instances in the private subnet need to access Amazon S3 frequently to read large datasets. Currently, this traffic routes through a NAT gateway which charges per GB. The architect wants to eliminate NAT gateway data processing charges for S3 traffic. Which solution reduces costs while keeping instances private?",
    choices: [
      "Move instances to the public subnet with public IPs",
      "Use an S3 gateway endpoint (free) attached to the VPC route table, routing S3 traffic directly without the NAT gateway",
      "Use AWS Direct Connect for S3 access",
      "Enable S3 Transfer Acceleration"
    ],
    correctAnswer: 1,
    explanation: "S3 gateway endpoints are free — they add a route in the VPC route table that sends S3 traffic directly to S3 over the AWS network, bypassing the NAT gateway entirely. Since NAT gateways charge $0.045/GB for data processing, rerouting S3 traffic through a free gateway endpoint can save significant costs for data-intensive workloads."
  },
  {
    id: 601,
    domain: "Cloud Technology and Services",
    question: "A company needs to run thousands of short-lived containers (each running for 2-5 minutes) to process incoming files. The containers should start within seconds when a file lands in S3, scale to zero when idle, and they don't want to manage any ECS cluster capacity. Which compute option is best?",
    choices: [
      "EC2 Auto Scaling group with containers",
      "ECS on EC2 with capacity providers",
      "ECS on Fargate triggered by S3 events via EventBridge",
      "Lambda with container image support"
    ],
    correctAnswer: 3,
    explanation: "Lambda supports container images up to 10 GB and handles the exact pattern described: event-driven (triggered by S3), short-lived (2-5 minutes within Lambda's 15-minute limit), scales to thousands of concurrent executions, and bills to zero when idle. Fargate works but has slower cold-start times. Lambda container support gives the best of both worlds."
  },
  {
    id: 602,
    domain: "Cloud Technology and Services",
    question: "A company runs a PostgreSQL database on Amazon RDS. The application has unpredictable traffic — sometimes 5 queries per second, sometimes 5,000. They're paying for a large RDS instance that's idle most of the time. They want the database to automatically scale compute capacity based on demand and pause when inactive. Which service provides this?",
    choices: [
      "RDS Multi-AZ",
      "Aurora Serverless",
      "DynamoDB on-demand",
      "RDS Read Replicas"
    ],
    correctAnswer: 1,
    explanation: "Aurora Serverless automatically scales database compute capacity up and down based on application demand. It can scale to zero (pausing the database) when there's no activity, and scales back up within seconds when queries arrive. You pay per Aurora Capacity Unit (ACU)-second, making it ideal for unpredictable or intermittent workloads."
  },
  {
    id: 603,
    domain: "Cloud Technology and Services",
    question: "A company wants to automate compliance checking of their CloudFormation templates BEFORE deployment — ensuring templates don't create unencrypted S3 buckets, public security groups, or over-permissive IAM policies. Which tool validates CloudFormation templates against security rules before they reach AWS?",
    choices: [
      "AWS Config (checks after deployment)",
      "cfn-lint and cfn-guard (pre-deployment template validation)",
      "AWS Trusted Advisor (checks running resources)",
      "Amazon Inspector (checks running instances)"
    ],
    correctAnswer: 1,
    explanation: "cfn-guard is AWS's open-source policy-as-code tool that validates CloudFormation templates against custom rules BEFORE deployment. Rules like 'all S3 buckets must have encryption enabled' or 'no security group may allow 0.0.0.0/0 on port 22' are checked in the CI/CD pipeline, preventing non-compliant resources from ever being created — a shift-left security practice."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 604,
    domain: "Billing, Pricing and Support",
    question: "A company's Enterprise Support TAM identifies that the company is paying $8,000/month for NAT gateway data processing charges. The TAM recommends implementing S3 and DynamoDB gateway endpoints (free) to eliminate NAT charges for those services. This single recommendation saves $5,000/month. Which AWS Support value does this demonstrate?",
    choices: [
      "AWS Support only provides break-fix assistance",
      "Proactive cost optimization guidance from a TAM can generate ROI that exceeds the Support plan cost",
      "AWS Support automatically reduces your bill",
      "TAMs only provide security guidance, not cost optimization"
    ],
    correctAnswer: 1,
    explanation: "A TAM's proactive cost optimization guidance often pays for the Enterprise Support plan many times over. In this case, a single recommendation saves $60,000/year — likely more than the support cost itself. TAMs provide ongoing architectural reviews, identify waste, recommend Reserved Instance strategies, and flag cost-saving opportunities specific to your usage patterns."
  },
  {
    id: 605,
    domain: "Billing, Pricing and Support",
    question: "A company's Lambda function processes 10 million invocations per month, each running for 500ms with 512 MB memory. They want to understand how Lambda pricing works to estimate their bill. Which factors determine Lambda costs?",
    choices: [
      "Lambda charges a flat monthly fee regardless of usage",
      "Lambda charges per invocation AND per GB-second of compute (memory allocated × execution duration), plus any data transfer",
      "Lambda charges only for the number of invocations, not execution time",
      "Lambda charges based on the size of the deployment package"
    ],
    correctAnswer: 1,
    explanation: "Lambda pricing has two main components: (1) Per-request charge ($0.20 per 1M invocations), and (2) Per-GB-second of compute — memory allocated × execution time. For 10M invocations at 512MB for 500ms: request cost = $2.00; compute = 10M × 0.5GB × 0.5s = 2.5M GB-seconds × $0.0000166667 ≈ $41.67/month. Data transfer out is charged separately."
  },
  {
    id: 606,
    domain: "Billing, Pricing and Support",
    question: "A company wants an AWS expert to review their architecture before migrating a critical workload to production. They need a detailed analysis of reliability risks, performance bottlenecks, and cost optimization opportunities specific to their architecture. Which AWS Support feature provides this dedicated architecture review?",
    choices: [
      "AWS Trusted Advisor automated checks",
      "AWS Well-Architected Framework Review conducted with a Solutions Architect or TAM",
      "AWS re:Post community forums",
      "AWS documentation and whitepapers"
    ],
    correctAnswer: 1,
    explanation: "An AWS Well-Architected Framework Review is a structured process where an AWS Solutions Architect or TAM evaluates your specific architecture against the 6 pillars. It identifies high-risk issues, provides prioritized remediation recommendations, and delivers a detailed report — far more specific and actionable than automated Trusted Advisor checks."
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
