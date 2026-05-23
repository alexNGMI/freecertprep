# AWS Solutions Architect - Associate SAA-C03 Content Architecture

Date: 2026-05-22

## Official And High-Quality Sources

- AWS Certified Solutions Architect - Associate official page: `https://aws.amazon.com/certification/certified-solutions-architect-associate/`
- AWS SAA-C03 official exam guide PDF: `https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf`
- AWS SAA-C03 official sample questions PDF: `https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Sample-Questions.pdf`
- AWS Well-Architected Framework: `https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html`
- AWS Architecture Center: `https://aws.amazon.com/architecture/`
- AWS Prescriptive Guidance: `https://docs.aws.amazon.com/prescriptive-guidance/latest/`

## Exam Model

- Exam: AWS Certified Solutions Architect - Associate
- Code: SAA-C03
- Level: Associate
- Official question types: multiple choice and multiple response
- Official exam length: 65 questions
- Official time limit: 130 minutes
- Official passing score: 720 on AWS's 100-1000 scaled score
- Local practice pass benchmark: 72%
- First-batch pool target: 270 questions
- Production pool target: 750 questions, now generated
- Catalog status: registered as `published: false` for preview authoring, hidden from the main foundational catalog until the pool receives a deeper human review

## Domain Allocation

The production pool follows the official domain weights exactly.

| Domain | Official Weight | Production Questions |
| --- | ---: | ---: |
| Design Secure Architectures | 30% | 225 |
| Design Resilient Architectures | 26% | 195 |
| Design High-Performing Architectures | 24% | 180 |
| Design Cost-Optimized Architectures | 20% | 150 |

## Content Style

SAA-C03 does not need a new renderer for the first implementation. AWS's public exam guide defines multiple-choice and multiple-response items, so the existing `single-choice` and `multiple-response` item types are sufficient.

The content standard is higher than foundational cloud certs:

- scenario stems should describe a business/workload context and design goal
- distractors should be plausible but fail on one architecture constraint
- explanations should name the AWS service behavior and the tradeoff
- questions should emphasize secure access, resiliency patterns, data durability, performance design, and cost optimization
- no topology/CLI simulator is required for SAA; those requirements remain more appropriate for CCNA

## First Batch Quality Audit

Generated pool: `src/data/aws-saa-c03-questions.json`

| Check | Result |
| --- | ---: |
| Total questions | 750 |
| Duplicate IDs | 0 |
| Duplicate stems | 0 |
| Single-choice questions | 600 |
| Multiple-response questions | 150 |
| Single-choice answer balance | 150 / 150 / 150 / 150 |
| Domain weight alignment | 225 / 195 / 180 / 150 |

## Expansion Plan

1. Deepen each domain with more distinct service families and scenario styles.
2. Add stronger negative distractors around commonly confused SAA choices, such as NAT gateway vs VPC endpoint, Aurora replicas vs Multi-AZ, CloudFront vs Global Accelerator, SQS vs EventBridge, and Savings Plans vs Spot.
3. Add longer multi-constraint questions that combine two or more Well-Architected pillars.
4. Run a human editorial pass before publishing to the homepage catalog.
5. Keep SAA hidden from the public homepage catalog until the editorial review is complete.
