const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));

const newQuestions = [
  // ===== CLOUD CONCEPTS (5) =====
  {
    id: 407,
    domain: "Cloud Concepts",
    question: "A company wants to test a radical new feature that might fail. In their on-premises world, the cost of provisioning test infrastructure and the risk of wasted capital investment discourages experimentation. On AWS, they can spin up an environment for a few hours and delete it if the experiment fails. Which cloud advantage encourages this kind of low-risk experimentation?",
    choices: [
      "High availability",
      "Fault tolerance",
      "Low cost of failure enables experimentation and agility",
      "Economies of scale"
    ],
    correctAnswer: 2,
    explanation: "Cloud computing dramatically lowers the cost of failure. Since resources are pay-as-you-go and can be provisioned/deprovisioned in minutes, failed experiments cost very little. This encourages rapid experimentation, innovation, and iterative development — a core agility advantage of the cloud."
  },
  {
    id: 408,
    domain: "Cloud Concepts",
    question: "A company runs a batch processing job every night that requires 100 servers for 2 hours, then zero servers for the remaining 22 hours. On-premises, they'd need 100 servers running 24/7. On AWS, they provision 100 instances at midnight and terminate them at 2 AM. How much compute time do they pay for on AWS versus on-premises?",
    choices: [
      "The same — 100 servers for 24 hours regardless of platform",
      "2 hours of 100 instances on AWS versus 24 hours of 100 servers on-premises",
      "AWS charges for the full day even if instances are terminated early",
      "On-premises is cheaper because there are no per-hour charges"
    ],
    correctAnswer: 1,
    explanation: "On AWS, you pay only for the compute time you consume. Running 100 instances for 2 hours means you pay for 200 instance-hours. On-premises, you own the servers 24/7 — paying for 2,400 server-hours of capacity even though you only use 200. This represents a 92% reduction in compute cost for this workload pattern."
  },
  {
    id: 409,
    domain: "Cloud Concepts",
    question: "A company operates in a heavily regulated industry where every change to their infrastructure must be documented, auditable, and reversible. They define all AWS resources using AWS CloudFormation templates stored in version control. If a change causes issues, they can roll back to a previous template version. Which cloud practice does this represent?",
    choices: [
      "Infrastructure as Code (IaC)",
      "Continuous integration",
      "Blue-green deployment",
      "Canary release"
    ],
    correctAnswer: 0,
    explanation: "Infrastructure as Code (IaC) means defining and managing infrastructure through machine-readable configuration files (like CloudFormation templates) rather than manual processes. Version-controlled IaC provides complete audit trails, repeatable deployments, and rollback capability — essential for regulated industries."
  },
  {
    id: 410,
    domain: "Cloud Concepts",
    question: "A startup has unpredictable traffic — some days they get 50 users, other days 50,000 due to viral content. They need their infrastructure to handle any traffic level without manual intervention or pre-planning. Which cloud characteristic automatically adjusts resources to match unpredictable demand?",
    choices: [
      "Global reach",
      "On-demand self-service",
      "Elasticity",
      "Resource pooling"
    ],
    correctAnswer: 2,
    explanation: "Elasticity is the cloud characteristic that enables automatic scaling of resources up and down to match demand in real-time. Unlike manual scaling (which requires pre-planning), elastic infrastructure handles unpredictable traffic spikes by automatically adding capacity and removing it when demand subsides."
  },
  {
    id: 411,
    domain: "Cloud Concepts",
    question: "An architect is reviewing their AWS bill and notices they're paying for five m5.4xlarge EC2 instances running at 15% CPU utilization. Following the Well-Architected Framework, they downsize to m5.xlarge instances and save 75% on compute costs while maintaining performance. Which Well-Architected pillar guided this decision?",
    choices: [
      "Reliability",
      "Performance Efficiency",
      "Cost Optimization",
      "Operational Excellence"
    ],
    correctAnswer: 2,
    explanation: "The Cost Optimization pillar of the Well-Architected Framework focuses on avoiding unnecessary costs. Right-sizing instances — matching resource capacity to actual demand — is a core cost optimization practice. Running m5.4xlarge at 15% utilization is waste; downsizing to m5.xlarge maintains performance at 75% less cost."
  },

  // ===== SECURITY AND COMPLIANCE (7) =====
  {
    id: 412,
    domain: "Security and Compliance",
    question: "A company's application needs to access an Amazon RDS database. Instead of hardcoding the database password in the application configuration, the security team requires that the password be stored securely, encrypted at rest, and rotated automatically every 30 days. Which AWS service should store this credential?",
    choices: [
      "AWS Systems Manager Parameter Store (standard tier)",
      "AWS Secrets Manager",
      "AWS KMS",
      "Environment variables on the EC2 instance"
    ],
    correctAnswer: 1,
    explanation: "AWS Secrets Manager is designed for storing and automatically rotating credentials like database passwords. It encrypts secrets at rest using KMS, supports native integration with RDS for automatic 30-day rotation, and provides API access for applications to retrieve the current credential — eliminating hardcoded passwords."
  },
  {
    id: 413,
    domain: "Security and Compliance",
    question: "A company has an S3 bucket that should never be publicly accessible under any circumstances. Despite having a bucket policy that blocks public access, a developer accidentally changed the policy to allow public reads. Which S3 feature provides an account-level override that blocks ALL public access regardless of individual bucket policies?",
    choices: [
      "S3 Object Lock",
      "S3 Block Public Access settings",
      "S3 versioning",
      "S3 encryption settings"
    ],
    correctAnswer: 1,
    explanation: "S3 Block Public Access provides account-level and bucket-level settings that override any bucket policy or ACL that would grant public access. When enabled at the account level, it prevents ANY bucket in the account from being made public — regardless of individual bucket policy changes. This is a critical safety guardrail."
  },
  {
    id: 414,
    domain: "Security and Compliance",
    question: "A company's VPC needs connectivity to AWS services like S3 and DynamoDB, but their security policy prohibits all traffic from leaving the VPC and traversing the public internet. How can they access these AWS services privately, without internet connectivity?",
    choices: [
      "Use a NAT gateway to route traffic to AWS services",
      "Use VPC endpoints (gateway endpoints for S3/DynamoDB, interface endpoints for other services)",
      "Peer the VPC with AWS's internal network",
      "Use AWS Direct Connect to access S3 from the VPC"
    ],
    correctAnswer: 1,
    explanation: "VPC endpoints provide private connectivity from your VPC to AWS services without requiring internet access. Gateway endpoints (free) route S3 and DynamoDB traffic privately through route tables. Interface endpoints (powered by PrivateLink) create ENIs in your subnet for private access to other services — all traffic stays on the AWS network."
  },
  {
    id: 415,
    domain: "Security and Compliance",
    question: "A company implemented the principle of least privilege for their IAM policies. A new developer joins the team and is given only the permissions needed for their specific project: read access to one S3 bucket and deploy access to one Lambda function. Two weeks later, they need access to a DynamoDB table for a new task. What should the process be?",
    choices: [
      "Give the developer full administrator access to avoid future access requests",
      "Create a new IAM user with the additional permission",
      "Grant only the specific DynamoDB permissions needed, keeping existing minimal permissions intact",
      "Add the developer to a group with broad database access"
    ],
    correctAnswer: 2,
    explanation: "The principle of least privilege means granting only the minimum permissions necessary for the task at hand. When new access is needed, you add only the specific permissions required (DynamoDB read/write on the specific table) rather than broadening access. This minimizes the blast radius if credentials are compromised."
  },
  {
    id: 416,
    domain: "Security and Compliance",
    question: "A company runs containers on Amazon ECS. During a routine scan, they discover that several container images in Amazon ECR contain known vulnerabilities with published CVEs. They want automated scanning of all images when pushed to the registry and before deployment. Which service provides this container image scanning?",
    choices: [
      "Amazon GuardDuty",
      "AWS Config",
      "Amazon Inspector (ECR scanning)",
      "Amazon Macie"
    ],
    correctAnswer: 2,
    explanation: "Amazon Inspector provides automated vulnerability scanning for container images stored in Amazon ECR. It scans images on push and continuously re-scans when new CVEs are published, identifying OS package and programming language vulnerabilities before compromised images are deployed to production."
  },
  {
    id: 417,
    domain: "Security and Compliance",
    question: "A company wants to implement defense in depth for their web application. They've configured security groups, NACLs, and AWS WAF. Now they want to add a layer that encrypts all data stored in their RDS database and S3 buckets. Which security concept does adding encryption at rest implement?",
    choices: [
      "Least privilege",
      "Defense in depth — adding encryption as another security layer",
      "Separation of duties",
      "Non-repudiation"
    ],
    correctAnswer: 1,
    explanation: "Defense in depth means implementing multiple layers of security controls so that if one layer is breached, additional layers provide protection. Network controls (security groups, NACLs), application-layer protection (WAF), and encryption at rest are complementary layers — each protecting against different threat vectors."
  },
  {
    id: 418,
    domain: "Security and Compliance",
    question: "A company needs to enforce a policy that all EC2 instances in their production account MUST be launched with encrypted EBS volumes. If someone tries to launch an instance with an unencrypted volume, the launch should be blocked. Which mechanism enforces this preventive control?",
    choices: [
      "AWS Config rule (detective control — reports but doesn't block)",
      "CloudWatch alarm triggered on unencrypted launches",
      "Service Control Policy (SCP) that denies ec2:RunInstances unless the volume is encrypted",
      "AWS Trusted Advisor recommendation"
    ],
    correctAnswer: 2,
    explanation: "An SCP can include a condition that denies ec2:RunInstances unless the encrypted flag is set to true on attached EBS volumes. This is a preventive control — it blocks the action before it happens, unlike detective controls (Config, Trusted Advisor) which only report non-compliance after the fact."
  },

  // ===== CLOUD TECHNOLOGY AND SERVICES (10) =====
  {
    id: 419,
    domain: "Cloud Technology and Services",
    question: "A company wants to add image and video analysis to their content moderation platform. They need to detect inappropriate content, identify objects and scenes, recognize celebrities, and extract text from images — all through API calls without training custom ML models. Which AWS service provides these pre-built vision capabilities?",
    choices: [
      "Amazon SageMaker",
      "Amazon Rekognition",
      "Amazon Textract",
      "Amazon Comprehend"
    ],
    correctAnswer: 1,
    explanation: "Amazon Rekognition provides pre-built computer vision capabilities through simple API calls. It detects objects, scenes, faces, celebrities, inappropriate content, and text in images and videos — without requiring any machine learning expertise or custom model training. It's designed for content moderation, media analysis, and visual search."
  },
  {
    id: 420,
    domain: "Cloud Technology and Services",
    question: "A company wants to convert their written product descriptions into natural-sounding speech in multiple languages for an audio catalog. They need a service that generates lifelike speech from text with support for multiple voices and languages. Which AWS service does this?",
    choices: [
      "Amazon Transcribe",
      "Amazon Lex",
      "Amazon Polly",
      "Amazon Translate"
    ],
    correctAnswer: 2,
    explanation: "Amazon Polly is a text-to-speech service that converts text into lifelike speech. It supports dozens of languages and voices, including Neural Text-to-Speech (NTTS) for the most natural-sounding output. Use cases include audio content generation, accessibility features, and voice-enabled applications."
  },
  {
    id: 421,
    domain: "Cloud Technology and Services",
    question: "A global e-commerce company needs to translate their product listings from English into 15 languages in real-time as sellers add new products. They need automated, high-quality translation without hiring translators for each language. Which AWS service provides neural machine translation?",
    choices: [
      "Amazon Comprehend",
      "Amazon Lex",
      "Amazon Transcribe",
      "Amazon Translate"
    ],
    correctAnswer: 3,
    explanation: "Amazon Translate is a neural machine translation service that delivers fast, high-quality, customizable language translation. It supports 75+ languages and can translate text in real-time or in batch — ideal for translating user-generated content like product listings at scale without manual translation."
  },
  {
    id: 422,
    domain: "Cloud Technology and Services",
    question: "A company is building a recommendation engine and needs a fully managed service to train and deploy personalization models based on user behavior data (clicks, purchases, ratings). They don't have a dedicated ML team. Which AWS service provides managed personalization and recommendations?",
    choices: [
      "Amazon SageMaker",
      "Amazon Personalize",
      "Amazon Comprehend",
      "Amazon Forecast"
    ],
    correctAnswer: 1,
    explanation: "Amazon Personalize is a fully managed ML service that generates real-time personalized recommendations — the same technology used by Amazon.com. You provide user interaction data, and Personalize trains and deploys custom recommendation models without requiring ML expertise. Use cases include product recommendations, content curation, and personalized search."
  },
  {
    id: 423,
    domain: "Cloud Technology and Services",
    question: "A retail company needs to forecast demand for 500,000 products across 2,000 stores for the next 3 months. They have 5 years of historical sales data. They want accurate, automated time-series forecasting without building custom ML models. Which AWS service is designed for this?",
    choices: [
      "Amazon SageMaker",
      "Amazon Personalize",
      "Amazon Forecast",
      "Amazon Comprehend"
    ],
    correctAnswer: 2,
    explanation: "Amazon Forecast uses machine learning to generate highly accurate time-series forecasts. You provide historical data (5 years of sales) and metadata (product categories, store locations), and Forecast automatically selects the best algorithms and trains models — ideal for demand planning, inventory optimization, and financial forecasting."
  },
  {
    id: 424,
    domain: "Cloud Technology and Services",
    question: "A company needs to deploy and manage edge computing workloads at remote locations with limited or no internet connectivity — such as factory floors, oil rigs, and field hospitals. They want to run a subset of AWS services locally at these sites. Which AWS service extends cloud capabilities to edge locations?",
    choices: [
      "Amazon CloudFront",
      "AWS Wavelength",
      "AWS Outposts",
      "AWS Local Zones"
    ],
    correctAnswer: 2,
    explanation: "AWS Outposts extends AWS infrastructure, services, and tools to virtually any on-premises or edge location. It delivers a fully managed rack of AWS compute and storage that runs locally, using the same APIs and tools as in the cloud — ideal for workloads requiring low-latency local processing or data residency at edge sites."
  },
  {
    id: 425,
    domain: "Cloud Technology and Services",
    question: "A mobile gaming company needs ultra-low latency (single-digit milliseconds) for players connecting from 5G mobile networks. They want to run their game servers at the edge of telecommunications provider networks, as close to players as possible. Which AWS service provides compute at the telecom edge?",
    choices: [
      "AWS Outposts",
      "AWS Local Zones",
      "AWS Wavelength",
      "Amazon CloudFront"
    ],
    correctAnswer: 2,
    explanation: "AWS Wavelength embeds AWS compute and storage within telecommunications providers' 5G networks. Application traffic from mobile devices reaches Wavelength Zones without leaving the telecom network, providing single-digit millisecond latency — ideal for real-time gaming, AR/VR, and other latency-sensitive mobile applications."
  },
  {
    id: 426,
    domain: "Cloud Technology and Services",
    question: "A company wants to run latency-sensitive applications closer to a large metro area that doesn't have a full AWS Region. They need access to services like EC2, EBS, and VPC in a location that provides single-digit millisecond latency to end users in that city. Which AWS infrastructure option addresses this?",
    choices: [
      "AWS Outposts",
      "AWS Local Zones",
      "Availability Zones",
      "AWS Wavelength"
    ],
    correctAnswer: 1,
    explanation: "AWS Local Zones are extensions of an AWS Region placed in large metro areas. They provide select AWS services (EC2, EBS, VPC, etc.) closer to end users for single-digit millisecond latency — ideal for real-time gaming, media content creation, and live video streaming in cities far from the nearest Region."
  },
  {
    id: 427,
    domain: "Cloud Technology and Services",
    question: "A company needs to store Windows file shares that are accessed by hundreds of Windows servers using the SMB protocol. They need a fully managed, highly available Windows file system with Active Directory integration. Which AWS service provides this?",
    choices: [
      "Amazon EFS",
      "Amazon FSx for Windows File Server",
      "Amazon S3",
      "Amazon EBS"
    ],
    correctAnswer: 1,
    explanation: "Amazon FSx for Windows File Server provides fully managed Windows file shares built on Windows Server. It supports the SMB protocol, NTFS, Active Directory integration, and Windows-native features like DFS. It's designed for Windows-based workloads that require shared file storage with AD authentication."
  },
  {
    id: 428,
    domain: "Cloud Technology and Services",
    question: "A company needs to run high-performance computing (HPC) workloads — computational fluid dynamics simulations that require tightly coupled communication between thousands of compute nodes with ultra-low latency. Which EC2 feature provides the highest-bandwidth, lowest-latency networking between instances?",
    choices: [
      "Enhanced networking",
      "Elastic Fabric Adapter (EFA)",
      "Placement groups (spread)",
      "Elastic Network Interface (ENI)"
    ],
    correctAnswer: 1,
    explanation: "Elastic Fabric Adapter (EFA) is a network interface for EC2 that enables applications to communicate with the low latency, high throughput, and OS-bypass capabilities required by HPC workloads. EFA supports MPI (Message Passing Interface) and NCCL for tightly coupled parallel computing across thousands of nodes."
  },

  // ===== BILLING, PRICING AND SUPPORT (3) =====
  {
    id: 429,
    domain: "Billing, Pricing and Support",
    question: "A company's finance team wants to set up alerts when their AWS spending is forecast to exceed $50,000 for the month, even if actual spending hasn't reached that threshold yet. They want to receive SNS notifications when the FORECAST crosses the budget. Which AWS service supports forecast-based budget alerts?",
    choices: [
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Cost Anomaly Detection",
      "CloudWatch billing alarms"
    ],
    correctAnswer: 1,
    explanation: "AWS Budgets supports both actual and forecast-based alerts. You can set a monthly budget of $50,000 and configure an alert when the FORECASTED cost is expected to exceed the threshold — giving the finance team advance warning before actual spending crosses the limit, enabling proactive cost management."
  },
  {
    id: 430,
    domain: "Billing, Pricing and Support",
    question: "A company notices an unexpected $3,000 charge on their AWS bill that they didn't anticipate. After investigation, they discover it was caused by a developer who accidentally left 20 large EC2 instances running over a holiday weekend. Which AWS service could have detected this unusual spending pattern automatically?",
    choices: [
      "AWS Budgets",
      "AWS Cost Anomaly Detection",
      "AWS Trusted Advisor",
      "AWS Config"
    ],
    correctAnswer: 1,
    explanation: "AWS Cost Anomaly Detection uses machine learning to continuously monitor spending patterns and identify unusual increases. It would have detected the sudden spike from 20 unintended EC2 instances running over the weekend and sent an alert — catching the anomaly before it accumulated to $3,000."
  },
  {
    id: 431,
    domain: "Billing, Pricing and Support",
    question: "A company is evaluating which AWS Support plan to purchase. Their requirements are: access to the full set of Trusted Advisor checks, 24/7 phone/chat support, and a response time under 1 hour for production systems that are down. What is the minimum Support plan that meets ALL three requirements?",
    choices: [
      "Developer Support",
      "Business Support",
      "Enterprise On-Ramp Support",
      "Enterprise Support"
    ],
    correctAnswer: 1,
    explanation: "Business Support is the minimum tier that provides all three: the full set of Trusted Advisor checks (Developer only gets core checks), 24/7 phone and chat access to Cloud Support Engineers, and a less-than-1-hour response time for production system down cases. Enterprise tiers offer more but Business is the minimum meeting all requirements."
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
