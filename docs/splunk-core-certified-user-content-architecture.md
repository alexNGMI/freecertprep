# Splunk Core Certified User Content Architecture

Splunk Core Certified User (SPLK-1001) is the Cybersecurity path's level-three practical tooling cert. It gives learners hands-on SIEM/search fluency after Network+ traffic fundamentals and Security+ security baseline knowledge.

## Official Source Spine

- Official Splunk Core Certified User blueprint PDF: 60 questions, entry-level, 60 minutes total seat time including 3 minutes for the exam agreement, no prerequisite certification.
- Official Splunk Certification Exam Study Guide: confirms the Core User scope as searching, fields, alerts, lookups, reports, dashboards, and basic statistical reporting.
- Official Splunk docs are the behavior source for SPL command semantics, fields, time ranges, reports, dashboards, lookups, scheduled reports, and alerts.

## Production Pool Targets

The first shipped pool is 750 questions so a 60-question simulator and Smart Practice review loop have enough depth for repeated sessions.

| Domain | Blueprint Weight | Pool Count |
|---|---:|---:|
| Splunk Basics | 5% | 38 |
| Basic Searching | 22% | 165 |
| Using Fields in Searches | 20% | 150 |
| Search Language Fundamentals | 15% | 113 |
| Using Basic Transforming Commands | 15% | 112 |
| Creating Reports and Dashboards | 12% | 90 |
| Creating and Using Lookups | 6% | 45 |
| Creating Scheduled Reports and Alerts | 5% | 37 |

## Question-Type Strategy

The real exam is primarily conventional selected-response knowledge and scenario testing, so the bank is mostly single-choice. Multiple-response, matching, and ordering items are used as review aids where they improve learning value without pretending the real exam is a lab exam.

- Single-choice: normal exam-like scenario and command-selection items.
- Multiple-response: two-correct review checks for paired concepts.
- Matching: concept-to-purpose drills for commands, UI elements, and knowledge objects.
- Ordering: workflow drills for search, reporting, dashboards, and alerts.

## Quality Gates

- `src/__tests__/content-sanity.test.js` locks exact blueprint-weighted counts.
- The generator rejects duplicate stems and short explanations.
- Every item uses a domain registered in `src/data/certs.js`.
- The Cybersecurity path points to the live Splunk route rather than a preview card.
