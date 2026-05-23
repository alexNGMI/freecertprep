import fs from 'node:fs'

const OUT = 'src/data/aws-saa-c03-questions.json'

const domains = [
  { name: 'Design Secure Architectures', count: 225 },
  { name: 'Design Resilient Architectures', count: 195 },
  { name: 'Design High-Performing Architectures', count: 180 },
  { name: 'Design Cost-Optimized Architectures', count: 150 },
]

const scenarios = [
  'a regional retailer modernizing an order-processing platform',
  'a healthcare analytics team handling sensitive patient-derived data',
  'a media company serving unpredictable global traffic',
  'a fintech startup preparing for a compliance review',
  'a SaaS provider onboarding several enterprise tenants',
  'a manufacturing company connecting factories to AWS',
  'a university research group storing large experiment datasets',
  'a travel company preparing for seasonal demand spikes',
  'a public-sector agency migrating a legacy application',
  'a gaming studio launching a multiplayer backend',
]

const topics = {
  'Design Secure Architectures': [
    {
      need: 'protect private application servers while allowing administrators controlled access for troubleshooting',
      correct: 'Use AWS Systems Manager Session Manager with IAM permissions and no inbound SSH from the internet',
      alt: 'Place the instances in private subnets and use VPC endpoints for management traffic where required',
      wrong: [
        'Open SSH from 0.0.0.0/0 and rely on rotating key pairs weekly',
        'Put the instances in public subnets and restrict only outbound traffic',
        'Store administrator passwords in user data so they are available during launch',
      ],
      why: 'Session Manager avoids public inbound management ports and lets access be controlled, logged, and audited through IAM.',
    },
    {
      need: 'store application secrets for a containerized workload without hard-coding credentials in images or environment files',
      correct: 'Store secrets in AWS Secrets Manager and grant the task role permission to retrieve only the required secrets',
      alt: 'Rotate the database password automatically when the target service supports rotation',
      wrong: [
        'Bake the password into the container image and rebuild the image on every password change',
        'Put secrets in a public S3 bucket protected by object names that are hard to guess',
        'Share one long-lived IAM user access key across all task definitions',
      ],
      why: 'Secrets Manager centralizes secret storage, access control, and rotation so credentials are not embedded in application artifacts.',
    },
    {
      need: 'encrypt data written to an Amazon S3 bucket and retain control over key policy decisions',
      correct: 'Enable server-side encryption with AWS KMS keys and configure a least-privilege key policy',
      alt: 'Use bucket policies to require encrypted PUT requests from approved principals',
      wrong: [
        'Use S3 Standard-IA because it automatically replaces access control',
        'Disable versioning so unauthorized object changes are easier to overwrite',
        'Make the bucket public and rely on object-level tags for encryption',
      ],
      why: 'SSE-KMS provides managed envelope encryption while allowing key policies, grants, and audit visibility through AWS services.',
    },
    {
      need: 'give an application running on Amazon EC2 permission to read one DynamoDB table',
      correct: 'Attach an IAM role to the EC2 instance with a policy scoped to the required DynamoDB table actions',
      alt: 'Use condition keys where possible to further restrict the allowed access pattern',
      wrong: [
        'Store an administrator access key in the application configuration file',
        'Assign the AWS managed AdministratorAccess policy because the instance is in a private subnet',
        'Create a shared IAM user for every EC2 workload in the account',
      ],
      why: 'Instance roles provide temporary credentials and avoid long-lived keys while least-privilege policies limit blast radius.',
    },
    {
      need: 'restrict access to an internal web application to users authenticated through the corporate identity provider',
      correct: 'Use an Application Load Balancer authentication action integrated with Amazon Cognito or an OIDC identity provider',
      alt: 'Place the application behind HTTPS and restrict backend security groups to the load balancer',
      wrong: [
        'Use a Network Load Balancer because it automatically authenticates web users',
        'Embed corporate passwords in the application AMI',
        'Allow anonymous access and review access logs after each incident',
      ],
      why: 'ALB authentication can offload user authentication before requests reach the application while preserving centralized identity controls.',
    },
    {
      need: 'detect and respond when public S3 access is accidentally introduced in production',
      correct: 'Enable S3 Block Public Access, monitor findings with AWS Security Hub or Amazon GuardDuty, and alert through EventBridge',
      alt: 'Use AWS Config rules to detect buckets that allow public reads or writes',
      wrong: [
        'Disable CloudTrail to reduce noisy security events',
        'Rely only on object naming conventions to hide sensitive data',
        'Permit public access temporarily because encrypted objects cannot be downloaded',
      ],
      why: 'Preventive controls plus detective services reduce the chance of public exposure and shorten response time when drift appears.',
    },
    {
      need: 'connect a VPC to an on-premises network using encrypted private connectivity over the internet',
      correct: 'Create an AWS Site-to-Site VPN connection with customer gateway and virtual private gateway or transit gateway attachments',
      alt: 'Use redundant VPN tunnels and dynamic routing when supported by the customer gateway',
      wrong: [
        'Use an internet gateway alone because it encrypts all VPC traffic by default',
        'Create an S3 gateway endpoint to route all on-premises traffic',
        'Peer the VPC with the corporate network without any customer gateway device',
      ],
      why: 'Site-to-Site VPN provides encrypted IPsec tunnels between AWS and the customer network over internet transport.',
    },
    {
      need: 'enforce centralized security controls across multiple AWS accounts owned by one organization',
      correct: 'Use AWS Organizations service control policies with account-level IAM and logging guardrails',
      alt: 'Use separate workload accounts and centralized security/audit accounts',
      wrong: [
        'Share the root user credentials so every team can configure the same controls',
        'Keep all workloads in one account and rely on resource names for separation',
        'Disable CloudTrail in sandbox accounts because they are not production',
      ],
      why: 'Organizations and SCPs help set maximum permissions across accounts while preserving account isolation and centralized governance.',
    },
  ],
  'Design Resilient Architectures': [
    {
      need: 'run a stateless web tier that survives an Availability Zone failure',
      correct: 'Deploy instances in an Auto Scaling group across multiple Availability Zones behind an Application Load Balancer',
      alt: 'Store session state outside the instances in a managed service such as DynamoDB or ElastiCache',
      wrong: [
        'Launch one large EC2 instance in the lowest-cost Availability Zone',
        'Use an Elastic IP address on each instance and ask users to retry manually',
        'Create nightly AMIs and restore the web tier only after an outage',
      ],
      why: 'Multi-AZ Auto Scaling with a load balancer removes single-instance and single-AZ failure points for stateless application tiers.',
    },
    {
      need: 'provide a highly available relational database for a production application',
      correct: 'Use Amazon RDS Multi-AZ deployment or an Aurora cluster with replicas across Availability Zones',
      alt: 'Enable automated backups and test restore procedures for recovery objectives',
      wrong: [
        'Run a database on one EC2 instance with an attached instance store volume',
        'Take manual screenshots of database settings before each release',
        'Use S3 Transfer Acceleration as the only database failover mechanism',
      ],
      why: 'Managed Multi-AZ database options provide synchronous or managed replication and automated failover behavior.',
    },
    {
      need: 'decouple order intake from payment processing during traffic spikes',
      correct: 'Place messages in Amazon SQS and let worker services process the queue asynchronously',
      alt: 'Configure a dead-letter queue for messages that repeatedly fail processing',
      wrong: [
        'Make the web tier wait synchronously until every downstream payment task completes',
        'Store pending orders in local instance memory',
        'Use Route 53 health checks as the primary work queue',
      ],
      why: 'SQS buffers work between producers and consumers, protecting downstream services from bursts and partial failures.',
    },
    {
      need: 'store objects so they remain available after the loss of an Availability Zone',
      correct: 'Use Amazon S3 Standard for durable, multi-AZ object storage',
      alt: 'Enable versioning when accidental overwrite or deletion is a recovery concern',
      wrong: [
        'Store all objects on a single EBS volume attached to one instance',
        'Use instance store because it is replicated across Regions automatically',
        'Use one NAT gateway as the object storage endpoint',
      ],
      why: 'S3 Standard stores objects redundantly across multiple Availability Zones in a Region and is designed for high durability.',
    },
    {
      need: 'route users away from an unhealthy regional endpoint',
      correct: 'Use Amazon Route 53 health checks with failover routing to a healthy endpoint',
      alt: 'Design the secondary endpoint to meet the required recovery time and recovery point objectives',
      wrong: [
        'Use one A record with a long TTL and update it manually during an outage',
        'Attach an internet gateway to both Regions and assume DNS changes automatically',
        'Rely on security group rules to change public DNS answers',
      ],
      why: 'Route 53 health checks and failover routing can automatically return a healthy alternate endpoint when the primary fails.',
    },
    {
      need: 'process uploaded images without losing work if a processing function fails temporarily',
      correct: 'Send S3 event notifications to SQS and invoke processing from the queue with retry and dead-letter handling',
      alt: 'Make the image processor idempotent so retries do not corrupt output',
      wrong: [
        'Process every image only in the browser after upload completes',
        'Disable retries so failures are visible immediately to customers',
        'Store failed image names in application logs only',
      ],
      why: 'Queue-based event processing improves resilience by buffering events, enabling retries, and isolating transient failures.',
    },
    {
      need: 'recover an application after accidental deletion of a critical DynamoDB item',
      correct: 'Enable point-in-time recovery on the DynamoDB table and restore to a point before the deletion',
      alt: 'Use backups and deletion protection practices for critical data stores',
      wrong: [
        'Use Auto Scaling because it keeps deleted items in warm capacity',
        'Rely on CloudWatch metrics to reconstruct the deleted item',
        'Enable VPC flow logs because they capture table item values',
      ],
      why: 'DynamoDB point-in-time recovery supports restoration to a selected second within the retention window.',
    },
    {
      need: 'make a microservice tolerate repeated downstream API failures without exhausting compute resources',
      correct: 'Use timeouts, retries with backoff, circuit breakers, and asynchronous buffering where appropriate',
      alt: 'Emit metrics and alarms for dependency error rates and queue age',
      wrong: [
        'Increase every timeout to one hour so calls eventually succeed',
        'Retry failed requests in a tight loop without limits',
        'Scale the database vertically before adding any failure controls',
      ],
      why: 'Resilient distributed systems use bounded retries, backoff, and isolation so failures do not cascade.',
    },
  ],
  'Design High-Performing Architectures': [
    {
      need: 'serve static images and videos to a global audience with low latency',
      correct: 'Store the content in Amazon S3 and deliver it through Amazon CloudFront edge locations',
      alt: 'Use appropriate cache-control headers to improve cache hit ratio',
      wrong: [
        'Serve all files from one EC2 instance in a single Region',
        'Attach more EBS volumes to the web server to reduce global latency',
        'Use AWS Config to cache static objects at edge locations',
      ],
      why: 'CloudFront caches content closer to viewers and S3 provides scalable origin storage for static assets.',
    },
    {
      need: 'improve read performance for a read-heavy relational workload without changing the write endpoint',
      correct: 'Add read replicas and direct read traffic to replica endpoints',
      alt: 'Cache frequently read query results when the data access pattern allows it',
      wrong: [
        'Send all read traffic to the primary writer and disable indexes',
        'Use S3 Glacier Instant Retrieval as a relational read replica',
        'Move the database to instance store so reads survive failover',
      ],
      why: 'Read replicas scale read capacity by offloading read queries from the primary database instance.',
    },
    {
      need: 'support millions of simple key-value lookups with single-digit millisecond latency',
      correct: 'Use Amazon DynamoDB with a partition key that distributes traffic evenly',
      alt: 'Use DynamoDB Accelerator or caching if the workload has very hot repeated reads',
      wrong: [
        'Use one small RDS instance with no read replicas for all lookups',
        'Store active keys in CloudTrail logs',
        'Use a NAT gateway as a low-latency key-value database',
      ],
      why: 'DynamoDB is built for high-scale key-value and document access when keys are modeled to avoid hot partitions.',
    },
    {
      need: 'reduce latency for repeated session lookups from an application tier',
      correct: 'Use Amazon ElastiCache for Redis or Memcached to cache frequently accessed session data',
      alt: 'Set appropriate TTLs and fallback behavior when the cache misses',
      wrong: [
        'Store sessions only in one EC2 instance local memory behind a load balancer',
        'Use Amazon Athena for every session lookup',
        'Compress the application logs and search them on every request',
      ],
      why: 'ElastiCache provides in-memory access for repeated low-latency reads and can reduce load on primary data stores.',
    },
    {
      need: 'ingest and analyze streaming click events with near real-time consumers',
      correct: 'Use Amazon Kinesis Data Streams with consumers sized for shard throughput',
      alt: 'Partition records to distribute load and monitor iterator age',
      wrong: [
        'Upload one CSV per day to a single EC2 instance and parse it manually',
        'Use AWS Backup as the streaming ingestion service',
        'Store all click events only in CloudWatch alarm descriptions',
      ],
      why: 'Kinesis Data Streams supports real-time ingestion and processing of ordered records at scale.',
    },
    {
      need: 'run a batch analytics job over data stored in S3 using standard SQL without managing servers',
      correct: 'Use Amazon Athena with data catalog metadata and optimized file formats such as Parquet',
      alt: 'Partition the dataset to reduce scanned data and improve query performance',
      wrong: [
        'Copy all data to a web server and query it with shell scripts',
        'Use Route 53 weighted routing to execute SQL queries',
        'Attach an Elastic IP address to the S3 bucket',
      ],
      why: 'Athena is serverless and queries data in S3 directly, with performance improved by partitioning and columnar formats.',
    },
    {
      need: 'improve performance for a Lambda function that frequently initializes SDK clients and database connections',
      correct: 'Initialize reusable clients outside the handler and consider provisioned concurrency for latency-sensitive workloads',
      alt: 'Right-size memory because CPU allocation scales with configured memory',
      wrong: [
        'Put all initialization inside the handler and reconnect on every invocation',
        'Run the function only from a public subnet to reduce cold starts',
        'Disable CloudWatch Logs because logging always causes cold starts',
      ],
      why: 'Reusing execution environment resources and right-sizing memory are common Lambda performance optimizations.',
    },
    {
      need: 'select storage for a shared Linux file system accessed by many EC2 instances at the same time',
      correct: 'Use Amazon EFS mounted by the instances across Availability Zones',
      alt: 'Choose the performance and throughput mode that matches the access pattern',
      wrong: [
        'Attach one EBS volume to all instances in read-write mode across Availability Zones',
        'Use instance store as the shared file system for all instances',
        'Use S3 object tags as POSIX file locks',
      ],
      why: 'EFS is a managed NFS file system designed for concurrent access from multiple instances.',
    },
  ],
  'Design Cost-Optimized Architectures': [
    {
      need: 'run interruptible stateless batch jobs at the lowest compute cost',
      correct: 'Use EC2 Spot Instances or Spot capacity in a diversified Auto Scaling group',
      alt: 'Checkpoint job progress so interrupted work can resume safely',
      wrong: [
        'Use On-Demand Instances only and disable scaling policies',
        'Use the most expensive instance family because it is always more reliable',
        'Store job state only on instance store without any checkpointing',
      ],
      why: 'Spot capacity can significantly reduce compute cost for fault-tolerant workloads that can handle interruption.',
    },
    {
      need: 'reduce storage cost for rarely accessed compliance records that must be retained for years',
      correct: 'Use S3 lifecycle policies to transition objects to an appropriate S3 Glacier storage class',
      alt: 'Choose the archival class based on retrieval time and access frequency requirements',
      wrong: [
        'Keep all records forever on gp3 EBS volumes attached to stopped instances',
        'Delete the data after 30 days because archival access is expensive',
        'Use NAT gateway metrics as the retention archive',
      ],
      why: 'S3 lifecycle transitions automate movement to lower-cost storage classes while preserving retention access requirements.',
    },
    {
      need: 'avoid paying for overprovisioned relational database capacity in a variable workload',
      correct: 'Use Aurora Serverless v2 or right-size RDS capacity based on measured utilization',
      alt: 'Use performance metrics and reserved capacity only when baseline usage is predictable',
      wrong: [
        'Provision for the annual peak all year without monitoring utilization',
        'Move the database to S3 Standard and run SQL through bucket policies',
        'Disable backups because storage is the only database cost driver',
      ],
      why: 'Variable or unpredictable database workloads can benefit from elastic capacity or careful right-sizing based on metrics.',
    },
    {
      need: 'reduce data transfer and request costs for static web assets repeatedly downloaded by users',
      correct: 'Cache assets with CloudFront and tune TTLs for content that changes predictably',
      alt: 'Compress assets and use efficient object naming/versioning for cache invalidation',
      wrong: [
        'Set every object TTL to zero so all requests hit the origin',
        'Serve every asset through one t3.micro instance without caching',
        'Replicate assets to every account manually for each release',
      ],
      why: 'Edge caching reduces origin requests and can improve both cost and latency for repeated static content delivery.',
    },
    {
      need: 'identify underused compute resources across several accounts',
      correct: 'Use AWS Cost Explorer, AWS Compute Optimizer, and tagging to find right-sizing opportunities',
      alt: 'Create budgets and cost allocation tags for workload owners',
      wrong: [
        'Estimate cost by reading only the application source code',
        'Disable all tags because they increase hourly compute charges',
        'Use security group descriptions as the only cost reporting tool',
      ],
      why: 'Cost Explorer, Compute Optimizer, and tags provide visibility into spend, utilization, and ownership.',
    },
    {
      need: 'choose a purchasing option for a steady production compute baseline',
      correct: 'Use Savings Plans or Reserved Instances for predictable baseline usage',
      alt: 'Keep burst or uncertain capacity on On-Demand or Spot depending on interruption tolerance',
      wrong: [
        'Use Spot Instances for every stateful production database regardless of interruption impact',
        'Buy reserved capacity before measuring whether the workload will remain steady',
        'Use S3 lifecycle rules to reserve EC2 compute capacity',
      ],
      why: 'Commitment-based pricing can reduce cost for predictable usage, while flexible capacity remains better for uncertain demand.',
    },
    {
      need: 'minimize NAT gateway data processing charges for private workloads that access AWS services frequently',
      correct: 'Use VPC endpoints for supported AWS services such as S3, DynamoDB, and interface endpoint services',
      alt: 'Place endpoints in the VPC route and security design where they reduce NAT traversal',
      wrong: [
        'Route all private service traffic through the internet gateway directly',
        'Increase NAT gateway count solely to reduce per-GB processing cost',
        'Move all private resources to public subnets with public IP addresses',
      ],
      why: 'VPC endpoints keep supported service traffic on private AWS connectivity and can reduce NAT gateway data processing costs.',
    },
    {
      need: 'reduce analytics query cost over large historical datasets in S3',
      correct: 'Partition data and store it in columnar formats such as Parquet before querying with Athena',
      alt: 'Use compression and query only the columns and partitions required',
      wrong: [
        'Store all data as uncompressed JSON in one prefix and always scan the full dataset',
        'Increase the number of IAM users so Athena queries finish cheaper',
        'Use CloudFront invalidations to reduce scanned bytes',
      ],
      why: 'Athena cost depends heavily on scanned data volume; partitioning, compression, and columnar formats reduce scanned bytes.',
    },
  ],
}

const promptOpeners = [
  'A solutions architect is designing a workload for',
  'A company asks a solutions architect to improve an architecture for',
  'A team is preparing an AWS design review for',
  'A migration plan is being reviewed for',
]

function rotateChoices(correct, distractors, offset) {
  const choices = [...distractors]
  const index = offset % 4
  choices.splice(index, 0, correct)
  return { choices, correctAnswer: index }
}

function idFor(domain, n) {
  return `saa-c03-${domain.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${String(n).padStart(3, '0')}`
}

function singleQuestion(domain, topic, domainIndex, globalIndex) {
  const scenario = scenarios[(domainIndex + globalIndex) % scenarios.length]
  const opener = promptOpeners[globalIndex % promptOpeners.length]
  const { choices, correctAnswer } = rotateChoices(topic.correct, topic.wrong, globalIndex)
  const caseId = `SAA-${String(globalIndex + 1).padStart(3, '0')}`
  return {
    id: idFor(domain, domainIndex + 1),
    domain,
    type: 'single-choice',
    question: `${opener} ${scenario} for case ${caseId}. The design must ${topic.need}. Which solution best meets the requirement?`,
    choices,
    correctAnswer,
    explanation: `${topic.why} The other options either add operational risk, weaken the design goal, or use a service for a purpose it does not provide.`,
  }
}

function multipleResponseQuestion(domain, topic, domainIndex, globalIndex) {
  const scenario = scenarios[(domainIndex + globalIndex + 3) % scenarios.length]
  const caseId = `SAA-${String(globalIndex + 1).padStart(3, '0')}`
  const choices = [
    topic.correct,
    topic.wrong[(domainIndex + 1) % topic.wrong.length],
    topic.alt,
    topic.wrong[(domainIndex + 2) % topic.wrong.length],
  ]
  return {
    id: idFor(domain, domainIndex + 1),
    domain,
    type: 'multiple-response',
    question: `A solutions architect is reviewing a design for ${scenario} in case ${caseId}. The workload must ${topic.need}. Which TWO recommendations should be included? (Select two.)`,
    choices,
    correctAnswers: [0, 2],
    explanation: `${topic.correct} and ${topic.alt} together address the requirement. ${topic.why}`,
  }
}

function generate() {
  const questions = []
  for (const domain of domains) {
    const bank = topics[domain.name]
    for (let i = 0; i < domain.count; i += 1) {
      const topic = bank[i % bank.length]
      const makeMr = (questions.length + i) % 5 === 0
      const q = makeMr
        ? multipleResponseQuestion(domain.name, topic, i, questions.length)
        : singleQuestion(domain.name, topic, i, questions.length)
      questions.push(q)
    }
  }
  return questions
}

const questions = generate()
fs.writeFileSync(OUT, `${JSON.stringify(questions, null, 2)}\n`)
console.log(`Wrote ${questions.length} questions to ${OUT}`)
