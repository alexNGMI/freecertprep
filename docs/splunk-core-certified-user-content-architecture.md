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

The official certification page describes a 60-question multiple-choice exam. Simulated exam forms therefore draw only single-choice and multiple-response items. Matching and ordering items remain available as learning drills outside the formal exam selection.

- Single-choice: normal exam-like scenario and command-selection items.
- Multiple-response: two-correct review checks for paired concepts.
- Matching: concept-to-purpose learning drills for commands, UI elements, and knowledge objects; excluded from simulated exams.
- Ordering: workflow learning drills for search, reporting, dashboards, and alerts; excluded from simulated exams.

## Quality Gates

- `src/__tests__/content-sanity.test.js` locks exact blueprint-weighted counts.
- The generator rejects duplicate stems and short explanations.
- Structural diversity tests normalize numbers and code literals and require at least 500 distinct stem structures.
- Current measured diversity is 750 exact-unique stems and 750 normalized structures.
- Median stem length is at most 230 characters, the 90th percentile is at most 270, and no stem may exceed 420.
- Every explanation contains a correct-choice rationale, distractor analysis, and review takeaway.
- Every selected-response item includes one compact console or result-table evidence artifact.
- Retired weak distractors are blocked by automated tests.
- Exam selection permits only `single-choice` and `multiple-response` items for this certification.
- Every item uses a domain registered in `src/data/certs.js`.
- The Cybersecurity path points to the live Splunk route rather than a preview card.

## June 13 Editorial Pass

The production pool remains 750 questions with the exact blueprint allocation and original exam-format strategy. The pass removed repeated synthetic search-window and result-count filler, reduced the median stem from 290 to 221 characters and the 90th percentile from 417 to 257, rewrote weak distractors into plausible same-scope misconceptions, and added rendered evidence to all 690 selected-response items. Matching and ordering remain learning drills outside simulated exams.
