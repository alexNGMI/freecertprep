const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 682,
    domain: "Cloud Concepts",
    question: "A company's database team manually creates backups every Sunday night. One week, the engineer forgets. The next day, a database corruption occurs and there is no recent backup. The architect recommends automating backups using RDS automated backups with a defined retention period. Which Well-Architected best practice does this implement?",
    choices: [
      "Automate recovery procedures and eliminate manual processes to improve reliability",
      "Reduce instance sizes for cost optimization",
      "Use serverless to improve performance",
      "Enable MFA on all accounts for security"
    ],
    correctAnswer: 0,
    explanation: "The Reliability pillar emphasizes automating recovery procedures — human-dependent processes like manual backups are error-prone and will eventually fail. RDS automated backups run on a defined schedule with configurable retention (up to 35 days) and enable point-in-time recovery — removing the human from the loop and eliminating missed-backup risk."
  },
  {
    id: 683,
    domain: "Cloud Concepts",
    question: "A company runs identical application stacks in us-east-1 and eu-west-1 behind Route 53 health checks. When Route 53 detects that us-east-1 is unhealthy, it automatically routes all traffic to eu-west-1. Users experience a brief DNS propagation delay but no outage. Which Route 53 routing policy implements this pattern?",
    choices: [
      "Simple routing",
      "Weighted routing",
      "Failover routing",
      "Latency-based routing"
    ],
    correctAnswer: 2,
    explanation: "Route 53 failover routing policy directs traffic to a primary resource (us-east-1) when healthy and automatically fails over to a secondary resource (eu-west-1) when health checks detect the primary is unhealthy. This is the standard active-passive multi-Region failover pattern — providing disaster recovery with automatic DNS-level traffic redirection."
  },
  {
    id: 684,
    domain: "Cloud Concepts",
    question: "A company wants to distribute traffic across two AWS Regions: 80% to us-east-1 (primary) and 20% to eu-west-1 (to serve European users from closer infrastructure). They want precise control over the traffic split. Which Route 53 routing policy provides this percentage-based distribution?",
    choices: [
      "Failover routing",
      "Geolocation routing",
      "Weighted routing",
      "Simple routing"
    ],
    correctAnswer: 2,
    explanation: "Route 53 weighted routing distributes traffic across resources based on assigned weights. Setting us-east-1 to weight 80 and eu-west-1 to weight 20 sends approximately 80% and 20% of DNS queries to each Region respectively. Weighted routing is commonly used for gradual traffic migration, blue/green deployments, and load distribution across Regions."
  },
  {
    id: 685,
    domain: "Cloud Concepts",
    question: "A company wants to serve users from the AWS Region that provides the lowest network latency for each user. US users should be routed to us-east-1, European users to eu-west-1, and Asian users to ap-southeast-1 — but based on measured latency, not geographic location. Which Route 53 routing policy does this?",
    choices: [
      "Geolocation routing",
      "Latency-based routing",
      "Weighted routing",
      "Multivalue answer routing"
    ],
    correctAnswer: 1,
    explanation: "Route 53 latency-based routing measures the latency between the user's DNS resolver and AWS Regions, then routes the query to the Region with the lowest latency. Unlike geolocation routing (which uses the user's geographic location), latency-based routing dynamically selects the fastest Region based on actual network performance — which may differ from geographic proximity."
  },
  {
    id: 686,
    domain: "Cloud Concepts",
    question: "A company's architect is designing their application to handle 'everything fails all the time' on AWS. She implements: (1) health checks to detect failures automatically, (2) Auto Scaling to replace unhealthy instances, (3) Multi-AZ for database failover, and (4) S3 for durable storage. She calls this 'designing for the expected unexpected.' Which AWS design philosophy is she following?",
    choices: [
      "Design for cost optimization",
      "Design for security by default",
      "Design for failure — assume components will fail and build automated recovery",
      "Design for simplicity — minimize the number of components"
    ],
    correctAnswer: 2,
    explanation: "Designing for failure is a foundational AWS architecture principle articulated by Werner Vogels: 'Everything fails, all the time.' This means accepting that hardware fails, networks partition, and services have outages — and proactively building systems that detect and recover from these failures automatically. Health checks, Auto Scaling, Multi-AZ, and durable storage all implement this philosophy."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 687,
    domain: "Security and Compliance",
    question: "A company just experienced a security incident where an EC2 instance was compromised. During the post-incident review, the security team wants to understand the full attack chain: how the attacker gained access, what lateral movement occurred, and which resources were affected. They have GuardDuty findings and CloudTrail logs but need help correlating them into a coherent investigation timeline. Which service helps?",
    choices: [
      "AWS Config",
      "Amazon Detective",
      "AWS Trusted Advisor",
      "Amazon Inspector"
    ],
    correctAnswer: 1,
    explanation: "Amazon Detective automatically processes data from GuardDuty, CloudTrail, and VPC Flow Logs to build a graph model of resource interactions over time. Security analysts can investigate findings by visualizing the attack chain: which IAM credential was used, what API calls were made, which instances were accessed, and the full timeline — correlating data that would take hours to piece together manually."
  },
  {
    id: 688,
    domain: "Security and Compliance",
    question: "A company wants to ensure that when a new AWS account is created in their Organization, it automatically has: CloudTrail enabled, GuardDuty activated, Config recording turned on, and a standard set of security guardrails applied. Manually configuring each new account is error-prone. Which service automates this secure account baseline?",
    choices: [
      "AWS Organizations SCPs alone",
      "AWS Control Tower with account factory and mandatory guardrails",
      "AWS CloudFormation manual deployment to each account",
      "AWS IAM Identity Center"
    ],
    correctAnswer: 1,
    explanation: "AWS Control Tower's Account Factory automates new account provisioning with a pre-configured security baseline. When a new account is created, Control Tower automatically enables CloudTrail, Config, and guardrails (preventive SCPs and detective Config rules). The landing zone architecture ensures every account starts with consistent security controls — eliminating manual configuration and human error."
  },
  {
    id: 689,
    domain: "Security and Compliance",
    question: "A company uses AWS Organizations with 100 accounts. They want to ensure a consistent security baseline but also allow individual account teams to customize their IAM policies for their specific workloads. How do SCPs and IAM policies work together in this model?",
    choices: [
      "SCPs replace IAM policies — account teams don't need to create IAM policies",
      "SCPs set the maximum allowed permissions (guardrails), and IAM policies within each account grant specific permissions up to that maximum — effective permissions are the intersection of both",
      "IAM policies override SCPs when there's a conflict",
      "SCPs and IAM policies are completely independent"
    ],
    correctAnswer: 1,
    explanation: "SCPs define the permission ceiling — the maximum actions allowed in an account. IAM policies within the account grant specific permissions. The effective permission is the intersection: if an SCP allows EC2 and S3 but denies IoT, no IAM policy in that account can grant IoT access. This model lets central security set guardrails while account teams customize within those boundaries."
  },
  {
    id: 690,
    domain: "Security and Compliance",
    question: "A company's application needs to validate that an incoming webhook request actually came from their payment provider (Stripe) and wasn't forged. The webhook payload includes a signature generated with a shared secret. Where should the application store this shared secret securely on AWS?",
    choices: [
      "Hardcoded in the Lambda function code",
      "In an environment variable without encryption",
      "In AWS Secrets Manager, retrieved by the Lambda function at runtime",
      "In a public S3 bucket accessible by the webhook handler"
    ],
    correctAnswer: 2,
    explanation: "Webhook signing secrets should be stored in AWS Secrets Manager — encrypted at rest, retrieved at runtime via API, with IAM-controlled access and audit logging. The Lambda function retrieves the secret, uses it to verify the webhook signature, and never exposes it in code, environment variables, or logs. Secrets Manager also supports automatic rotation if the provider allows it."
  },
  {
    id: 691,
    domain: "Security and Compliance",
    question: "A company wants to enforce that all EC2 instances launched in their production account MUST have specific tags: 'Environment=Production', 'Team', and 'CostCenter'. Instances without these required tags should be prevented from launching. Which mechanism enforces mandatory tagging at launch time?",
    choices: [
      "AWS Config rule to detect untagged instances after launch",
      "SCP or IAM policy with a condition requiring specific tags on ec2:RunInstances",
      "AWS Cost Explorer tag reports",
      "CloudWatch alarm for untagged resources"
    ],
    correctAnswer: 1,
    explanation: "An SCP or IAM policy can include a Condition element requiring specific tag keys/values on ec2:RunInstances. If the tags are missing, the API call is denied — the instance never launches. This is a preventive control (blocks the action) rather than a detective control (Config detects after launch). Tag enforcement at launch ensures 100% compliance from day one."
  },
  {
    id: 692,
    domain: "Security and Compliance",
    question: "A company's security team detects that someone is using the AWS CLI from an IP address in a country where the company has no employees. The API calls are using a legitimate IAM user's access keys. Which immediate actions should the security team take?",
    choices: [
      "Delete the IAM user entirely",
      "Deactivate the IAM user's access keys immediately, create a new key pair if the user still needs access, investigate the source of the compromise, and review CloudTrail for all actions taken with the compromised keys",
      "Change the user's console password",
      "Wait and monitor to gather more evidence"
    ],
    correctAnswer: 1,
    explanation: "Immediate response: (1) Deactivate (not delete) the compromised access keys to stop the attacker while preserving evidence. (2) Review CloudTrail to identify ALL actions taken with those keys during the compromise window. (3) Assess and remediate any changes the attacker made (new IAM users, modified policies, deployed resources). (4) Issue new keys only after the compromise vector is identified and closed."
  },
  {
    id: 693,
    domain: "Security and Compliance",
    question: "A company stores encrypted data in S3 using SSE-KMS. Their compliance team asks: 'Can we prove that a specific file was encrypted at rest, which KMS key was used, and who accessed the key to decrypt the file on March 15th?' Which combination of services provides this cryptographic audit trail?",
    choices: [
      "S3 server access logs only",
      "AWS KMS key metadata and AWS CloudTrail KMS API logs (showing GenerateDataKey and Decrypt calls with timestamps, principals, and key ARNs)",
      "Amazon Macie encryption analysis",
      "AWS Config encryption compliance checks"
    ],
    correctAnswer: 1,
    explanation: "KMS + CloudTrail provides the complete cryptographic audit trail: KMS key metadata shows which key encrypted the object. CloudTrail logs every KMS API call — GenerateDataKey (when the object was encrypted), Decrypt (who decrypted it, when, from which IP). This satisfies compliance requirements to prove encryption status and track all cryptographic operations with timestamps and identities."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 694,
    domain: "Cloud Technology and Services",
    question: "A company runs a web application where users upload profile photos. They want to automatically generate a thumbnail version when a photo is uploaded to S3, without running any servers. The processing takes 2-3 seconds per image. Which is the simplest architecture for this event-driven image processing?",
    choices: [
      "EC2 instance polling S3 for new uploads every minute",
      "S3 event notification triggering a Lambda function that creates the thumbnail and saves it back to S3",
      "ECS Fargate task launched per upload",
      "Step Functions workflow triggered by CloudWatch Events"
    ],
    correctAnswer: 1,
    explanation: "S3 event notifications + Lambda is the canonical serverless event-driven pattern. S3 sends a notification when an object is created, Lambda is invoked with the object details, processes the image (2-3 seconds is well within Lambda limits), and writes the thumbnail back to S3. No servers to manage, scales automatically, and costs fractions of a cent per invocation."
  },
  {
    id: 695,
    domain: "Cloud Technology and Services",
    question: "A company needs to run a complex multi-step data processing workflow: Step 1 validates input data, Step 2 enriches it with external API data, Step 3 splits it into parallel processing branches, Step 4 merges results, and Step 5 writes to a database. Each step is a Lambda function. They need error handling, retries, and workflow visualization. Which service orchestrates this?",
    choices: [
      "Amazon SQS chained queues",
      "Amazon EventBridge with rules",
      "AWS Step Functions",
      "AWS Batch"
    ],
    correctAnswer: 2,
    explanation: "AWS Step Functions orchestrates multi-step workflows with state machines. It provides: sequential and parallel execution, branching logic, error handling with retries and catch blocks, timeout management, and a visual workflow console showing the execution path. Each step invokes a Lambda function, and Step Functions handles the orchestration logic between them."
  },
  {
    id: 696,
    domain: "Cloud Technology and Services",
    question: "A company needs their application to handle 1 million WebSocket connections simultaneously for a real-time chat platform. Each connected user receives messages pushed from the server. They need a managed service that handles WebSocket connection management, routing, and scaling. Which service supports this?",
    choices: [
      "Amazon SQS",
      "Amazon API Gateway WebSocket APIs",
      "Amazon SNS",
      "Application Load Balancer"
    ],
    correctAnswer: 1,
    explanation: "Amazon API Gateway WebSocket APIs provide fully managed WebSocket connection handling at scale. API Gateway manages connection state, routes incoming messages to Lambda or HTTP backends based on route keys, and supports sending messages back to specific connected clients. It scales to millions of concurrent connections with no infrastructure management."
  },
  {
    id: 697,
    domain: "Cloud Technology and Services",
    question: "A company wants to create a serverless REST API that reads from DynamoDB. The expected traffic is 50 requests per day — very low volume. They want to minimize cost and don't want to pay for any idle resources. Which API Gateway API type is most cost-effective for this low-traffic use case?",
    choices: [
      "API Gateway REST API (v1)",
      "API Gateway HTTP API (v2)",
      "Application Load Balancer with Lambda target",
      "Amazon CloudFront with Lambda@Edge"
    ],
    correctAnswer: 1,
    explanation: "API Gateway HTTP APIs (v2) are up to 71% cheaper than REST APIs (v1) and designed for simple proxy use cases. At 50 requests/day, the cost is negligible (HTTP API: $1.00 per million requests). HTTP APIs support Lambda integration, JWT authorization, and CORS — sufficient for most REST API needs. For low-traffic APIs, the HTTP API type minimizes costs."
  },
  {
    id: 698,
    domain: "Cloud Technology and Services",
    question: "A company runs a data analytics platform that queries data stored across S3, RDS, and DynamoDB. Their analysts want to use a single SQL query that joins data from all three sources — without copying data between services. Which AWS service supports federated queries across multiple data sources?",
    choices: [
      "Amazon Athena Federated Query",
      "Amazon RDS",
      "AWS Glue",
      "Amazon QuickSight"
    ],
    correctAnswer: 0,
    explanation: "Amazon Athena Federated Query allows you to run SQL queries that join data across S3, RDS, DynamoDB, Redshift, CloudWatch Logs, and 25+ other data sources — from a single Athena query. Athena uses Lambda-based data source connectors to read from each source at query time, eliminating the need to copy or ETL data into a single location."
  },
  {
    id: 699,
    domain: "Cloud Technology and Services",
    question: "A company wants to implement caching at the network edge for their API responses. They want CloudFront to cache API Gateway responses for 60 seconds so that repeated identical API calls are served from the edge without reaching the backend. Which CloudFront feature enables this API-level caching?",
    choices: [
      "CloudFront origin failover",
      "CloudFront cache behavior with TTL settings for the API Gateway origin",
      "CloudFront Lambda@Edge",
      "CloudFront field-level encryption"
    ],
    correctAnswer: 1,
    explanation: "CloudFront cache behaviors define caching rules per URL path pattern. Setting a default TTL of 60 seconds for the API Gateway origin caches API responses at 400+ edge locations. Subsequent identical requests (same URL, query string, headers as defined in the cache key) are served from the edge cache — reducing API Gateway invocations, Lambda executions, and response latency."
  },
  {
    id: 700,
    domain: "Cloud Technology and Services",
    question: "A company needs to run custom code at CloudFront edge locations to customize content delivery — for example, rewriting URLs, adding security headers, or generating simple HTML responses at the edge without reaching the origin server. Which CloudFront feature allows running code at the edge?",
    choices: [
      "CloudFront cache policies",
      "CloudFront origin access identity",
      "CloudFront Functions (lightweight) or Lambda@Edge (full Lambda)",
      "CloudFront signed URLs"
    ],
    correctAnswer: 2,
    explanation: "CloudFront Functions (for lightweight operations like header manipulation, URL rewrites, redirects — sub-millisecond, JavaScript only) and Lambda@Edge (for complex logic like A/B testing, image optimization, authentication — Node.js/Python with access to request body) run code at CloudFront edge locations. Both intercept requests/responses without traffic reaching the origin."
  },
  {
    id: 701,
    domain: "Cloud Technology and Services",
    question: "A company stores their machine learning training data (10 TB of images) in S3. Their data scientists need to upload new training batches from on-premises at the fastest possible speed over the internet. Standard S3 uploads are slow because data travels over the public internet from their location to the S3 Region. Which feature accelerates these uploads?",
    choices: [
      "S3 Multipart Upload",
      "S3 Transfer Acceleration",
      "AWS Direct Connect",
      "S3 Batch Operations"
    ],
    correctAnswer: 1,
    explanation: "S3 Transfer Acceleration uses CloudFront's global edge locations to speed up S3 transfers. Data is uploaded to the nearest edge location over an optimized network path, then transferred to S3 over AWS's private backbone network — often 50-500% faster than standard internet uploads. It's designed for long-distance, high-throughput S3 transfers."
  },
  {
    id: 702,
    domain: "Cloud Technology and Services",
    question: "A company wants to run code in response to CloudFront viewer requests and origin requests — for example, implementing geo-based content customization and A/B testing. The code needs access to the full request body, can run for up to 30 seconds, and requires external network calls. Which edge compute option supports this?",
    choices: [
      "CloudFront Functions",
      "Lambda@Edge",
      "AWS IoT Greengrass",
      "AWS Wavelength"
    ],
    correctAnswer: 1,
    explanation: "Lambda@Edge runs Node.js or Python functions at CloudFront edge locations with up to 30 seconds execution time (origin-facing triggers), access to request/response bodies, and the ability to make external network calls. CloudFront Functions is lighter but limited to 1ms execution, no network calls, and no body access. Lambda@Edge handles the more complex edge compute scenarios described."
  },
  {
    id: 703,
    domain: "Cloud Technology and Services",
    question: "A company has 5 TB of data in an on-premises Hadoop cluster that they want to move to Amazon S3 for analysis with Athena and Redshift Spectrum. The transfer needs to happen over their existing internet connection as fast as possible, with data integrity validation and encryption in transit. Which service is optimized for this online data transfer?",
    choices: [
      "AWS Snowball Edge",
      "AWS DataSync",
      "S3 CLI sync command",
      "AWS Storage Gateway"
    ],
    correctAnswer: 1,
    explanation: "AWS DataSync is purpose-built for online data transfer between on-premises storage and AWS. It uses a purpose-built protocol that accelerates transfer (up to 10x faster than open-source tools), automatically validates data integrity at both source and destination, encrypts in transit, and handles scheduling and monitoring. For 5 TB over internet, DataSync is faster and more reliable than CLI sync."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 704,
    domain: "Billing, Pricing and Support",
    question: "A company runs a workload that requires exactly 4 EC2 instances of a specific type in us-east-1 at all times — they cannot tolerate even briefly having fewer than 4 instances, even during an AZ capacity event. They want to guarantee that EC2 capacity is always available for them. Which feature provides this capacity guarantee?",
    choices: [
      "Reserved Instances",
      "On-Demand Capacity Reservations",
      "Savings Plans",
      "Spot Instance persistent requests"
    ],
    correctAnswer: 1,
    explanation: "On-Demand Capacity Reservations guarantee that EC2 capacity is reserved for you in a specific AZ — ensuring instances can always be launched even during capacity constraints. Unlike RIs and Savings Plans (which are billing discounts but don't guarantee capacity), Capacity Reservations provide an actual capacity guarantee. They can be combined with Savings Plans for both capacity assurance and discounts."
  },
  {
    id: 705,
    domain: "Billing, Pricing and Support",
    question: "A company wants to understand which team is responsible for a $5,000 monthly charge for a set of EC2 instances. The instances weren't tagged when launched 6 months ago and no one remembers who created them. Which AWS tool can identify who launched these specific instances?",
    choices: [
      "AWS Cost Explorer tag analysis",
      "AWS CloudTrail — search for the RunInstances API call filtered by the instance IDs to find the IAM principal who launched them",
      "AWS Trusted Advisor",
      "AWS Budgets"
    ],
    correctAnswer: 1,
    explanation: "CloudTrail records every API call including RunInstances. Searching CloudTrail logs for the specific instance IDs reveals: which IAM user/role launched them, when, from which IP address, and with what parameters. This forensic capability is why CloudTrail should always be enabled — it provides accountability even when resources aren't properly tagged."
  },
  {
    id: 706,
    domain: "Billing, Pricing and Support",
    question: "A company has Enterprise Support and wants to optimize their Reserved Instance portfolio. They have some RIs expiring, some underutilized, and want to plan purchases for the coming year based on usage trends. Their TAM suggests a specific program where AWS RI experts analyze their account and provide purchase recommendations. What is this?",
    choices: [
      "AWS Trusted Advisor RI recommendations",
      "AWS Cost Explorer RI purchase recommendations",
      "Reserved Instance planning and optimization guidance from the TAM and AWS support team, including Concierge recommendations",
      "AWS Compute Optimizer"
    ],
    correctAnswer: 2,
    explanation: "Enterprise Support customers receive proactive RI planning guidance from their TAM and the AWS Concierge team. They analyze usage patterns, expiring RIs, and workload forecasts to recommend optimal RI purchases — including which instance families, terms (1 vs 3 year), and payment options maximize savings. This human-guided optimization complements automated tools like Cost Explorer recommendations."
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
