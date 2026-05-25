# AWS Solutions Architect - Associate SAA-C03 Content Architecture

Date: 2026-05-24

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
- Catalog status: live in the public catalog and Cloud path

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

## Premium Study Surface

The SAA cert now carries optional `studyPlan` and `practiceGuidance` metadata in `src/data/certs.js`.

- Dashboard: shows an architecture-first study plan that frames the pool as secure, resilient, high-performing, and cost-optimized design practice.
- Smart Practice setup: shows a three-step SAA review loop so learners use adaptive sessions, domain drills, and explanation review intentionally.
- Scope: these are registry-driven optional surfaces, so other certifications keep their existing dashboard and practice setup behavior unless they add the same metadata.
- Content principle: no new questions are needed for this polish pass; the improvement is about making the existing 750-question pool feel organized around SAA decision-making.

## Review-Mode Polish

The first SAA review-quality pass keeps the existing 750 questions and answer keys intact while improving the explanation shape shown after practice and exam review.

Every SAA explanation now uses three teaching anchors:

- `Why this is right:` names the selected service pattern and restates why it satisfies the scenario.
- `Why distractors fail:` explains how the non-selected options miss an architecture constraint, add risk, add operational burden, or solve a different problem.
- `Architecture takeaway:` gives the learner a domain-specific rule of thumb tied to secure, resilient, high-performing, or cost-optimized AWS architecture.

The content sanity suite now enforces these anchors for every SAA item so future edits cannot silently regress review-mode learning value.

## Scenario Variety Polish

The second SAA review-quality pass rewrote the 750 visible stems while preserving domains, choices, correct answers, and explanations.

- Exact duplicate SAA stems were reduced from 160 repeated-stem groups to zero.
- Stems now vary organization type, workload, design pressure, architecture issue, and service hint so review sessions feel less template-driven.
- The content sanity suite now enforces unique SAA stems to prevent repeated scenario frames from returning.

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
4. Continue the human editorial pass by sampling explanations for named tradeoffs and service behavior clarity.
5. Consider lightweight architecture diagrams only if they can be authored consistently and validated in review mode without turning SAA into a topology simulator.
