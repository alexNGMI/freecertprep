# Cisco CCST Networking Research

Date: 2026-05-22

## Positioning

Cisco Certified Support Technician (CCST) Networking is a good fit for freecertprep as a Cisco-oriented alternative to CompTIA Network+. Cisco positions CCST Networking as an entry-level networking credential and a first step toward CCNA, while CCNA itself remains outside this site's scope because it is deeper, more advanced, and more simulation-heavy than the current catalog target.

## Official References

- Cisco CCST Networking exam page: `https://www.cisco.com/c/en/us/training-events/training-certifications/exams/current-list/ccst-networking-exam.html`
- Cisco CCST Networking training page: `https://www.cisco.com/site/us/en/learn/training-certifications/training/courses/ccst-networking.html`
- Cisco support technician exams and training: `https://www.cisco.com/site/us/en/learn/training-certifications/certifications/support-technician/exams-training.html`
- Cisco exam policies: `https://www.cisco.com/site/us/en/learn/training-certifications/exams/policies.html`

## Exam Model

- Exam: Cisco Certified Support Technician Networking
- Code: 100-150
- Level: Foundational
- Duration: 50 minutes
- Published scope: entry-level networking support skills and CCNA-oriented foundation
- Practice model in this repo: 270-question first-iteration pool, 50-question timed simulator, 50-minute timer, 70% practice pass threshold

Cisco reports certification results through its own scoring process. The local simulator uses a percentage pass threshold only as a practice benchmark and should not be represented as Cisco's official scaled score.

## Domain Model

The first implementation uses the public Cisco CCST Networking objective areas as domains:

| Domain | Weight |
| --- | ---: |
| Standards and Concepts | 15% |
| Addressing and Subnet Formats | 20% |
| Endpoints and Media Types | 20% |
| Infrastructure | 20% |
| Diagnosing Problems | 15% |
| Security | 10% |

## Question-Type Mapping

The app already supports the item formats needed for an exam-like CCST pool:

- Cisco-style single-answer items -> `single-choice`
- Cisco-style multi-answer items -> `multiple-response`
- Drag/drop categorization -> `matching`
- Drag/drop process ordering -> `ordering`
- True/false concept validation tables -> `statement-block`

No new renderer is required for CCST. The existing IT `QuestionCard`, scoring utility, and content-sanity checks cover the necessary schema.

## Catalog Integration

CCST Networking should appear as:

- Provider: Cisco
- Cert id: `ccst-networking`
- Networking path role: Cisco / CCNA-oriented alternative to Network+
- Direct catalog role: standalone foundational networking certification

The Networking guided path should offer:

1. CompTIA Network+ as the vendor-neutral route
2. Cisco CCST Networking as the Cisco/CCNA-oriented route
3. CompTIA Server+ as the systems follow-up

## Production Target

First iteration ships 270 questions. The production target should be 750 reviewed questions, matching the depth standard used by the mature CompTIA pools.
