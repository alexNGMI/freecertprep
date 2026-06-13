# CompTIA Practical Simulation Architecture

Date: June 13, 2026
Status: production-ready v3 for Network+ N10-009; production-ready v2 for Security+ SY0-701

## Purpose

Network+ and Security+ include multiple-choice and performance-based questions. CompTIA describes simulation PBQs as restricted approximations of environments such as network diagrams, firewalls, terminal windows, and operating systems. CompTIA also states that some PBQs may award partial credit, while exact scoring and item values remain confidential.

freecertprep therefore provides exam-shaped practical practice without claiming to reproduce CompTIA's interface or score calculation.

Official references:

- Network+ N10-009: https://www.comptia.org/en-us/certifications/network/
- Security+ SY0-701: https://www.comptia.org/en-us/certifications/security/
- CompTIA PBQ overview: https://www.comptia.org/en/resources/test-policies/exam-development/performance-based-questions-explained/
- Network+ N10-009 exam objectives: https://partners.comptia.org/docs/default-source/resources/comptia-network-n10-009-exam-objectives-%284-0%29
- Security+ SY0-701 exam objectives: https://partners.comptia.org/docs/default-source/resources/comptia-security-sy0-701-exam-objectives-%285-0%29

## Production Contract

Each 90-question Network+ and Security+ readiness simulation:

- preserves the official domain-weight allocation;
- includes at least six practical scenario questions;
- includes every supported question type represented in that certification's pool;
- presents no answer feedback until submission;
- reports component-level correctness for multi-part items during review;
- keeps the overall readiness score binary per item because CompTIA does not publish PBQ scoring weights.

## Current Practical Pools

### Network+ N10-009

- 760 total questions.
- 32 practical questions.
- 20 PBQ matching scenarios.
- 5 command-output investigations.
- 5 topology scenarios.
- 2 configuration-repair scenarios.
- 10 enriched PBQ scenarios with two correlated artifacts and component-level review guidance.
- Four guaranteed form categories: cable mapping, routing analysis, wireless survey, and multi-artifact troubleshooting.

Coverage includes VLANs and trunks, switching loops, wireless density, reachability, path isolation, time synchronization, SNMP evidence, stateful firewall behavior, PAT, WAN fault isolation, gateway configuration, duplex mismatch, ports, monitoring tools, Layer 2 protections, cable testing, and diagnostic-tool selection.

The June 13 interaction-depth pass upgraded the ten dedicated `netplus-pbq-*` scenarios without increasing the 760-question pool. Each now includes an operational task brief, two different evidence artifacts, and corrective feedback for every matched decision. The cable-validation scenario is classified under objective 2.4, Physical Installation, and generated 90-question forms are audited across 500 runs to include every required practical category while retaining exact domain allocation.

### Security+ SY0-701

- 760 total questions.
- 33 practical questions.
- 20 PBQ matching scenarios.
- 7 log or command-output investigations.
- 3 security-architecture topology scenarios.
- 3 security-control configuration repairs.

Coverage includes threat attribution, insider-risk evidence, shadow IT, DMZ and zero-trust architecture, microsegmentation, EDR containment, host versus network visibility, vulnerability prioritization, SIEM correlation, log retention, flow analysis, IPS response, cryptography, attack mitigation, ATT&CK tactics, security tools, incident response, and governance artifacts.

## Review and Scoring

The readiness score continues to count each question as correct or incorrect. Multi-part questions additionally display a component check such as `3/4 correct`. This gives the learner useful diagnostic feedback without presenting an invented approximation of CompTIA's confidential partial-credit model.

## Automated Gates

Tests fail if:

- either bank changes from 760 questions;
- official domain allocation drifts;
- practical coverage drops below 32 Network+ or 33 Security+ items;
- PBQ matching drops below 20 items per certification;
- a generated full form contains fewer than six practical questions;
- a generated full form changes the expected 90-question domain allocation;
- PBQ evidence, topology, command, or configuration data is malformed.
- any official objective has fewer than three questions or lacks a classified concept family;
- objective metadata is missing or mapped outside its official domain;
- more than 20% of a bank requires conservative domain-level fallback classification;
- any practical scenario explanation falls below the review-quality threshold.

## Objective Learning Loop

Every A+, Network+, and Security+ question now carries:

- `objectiveId` for the current numbered CompTIA objective;
- `objectiveTitle` for learner-facing review;
- `conceptId` for editorial breadth measurement.

The learner experience uses that metadata to provide:

- objective-level accuracy and coverage on the dashboard;
- ten-question objective focus sessions;
- recent-miss and spaced due-review queues;
- objective badges in questions and review mode;
- up to three objective recommendations after each practice block.

Accuracy and coverage are intentionally separate. A learner who answers one question correctly has high accuracy but low coverage and should not be shown as having mastered the full objective.

A+ adds a support-oriented review cue to each explanation. Core 1 asks the learner to connect the symptom to the least invasive likely fix and confirming evidence. Core 2 emphasizes the safest next action, protection of user data and security, and verification through the relevant setting, command, log, or policy.

## A+ PBQ-lite v2

The A+ practical layer remains an honest browser approximation of CompTIA simulations, not a reproduction of the confidential exam engine. CompTIA describes PBQs as real-world problem solving delivered through simulations or virtual environments, and the current A+ exams can include multiple-choice, drag-and-drop, and performance-based questions.

Each of the 20 A+ practicals now includes:

- a clear technician task rather than only a narrative;
- structured evidence plus a console, status table, or workflow checklist;
- three matched decisions based on the supplied artifact;
- component-level corrective actions and rationale during review.

Every 90-question A+ form still preserves exact domain allocation and at least six practical items. Core 1 additionally guarantees hardware diagnostics, network connectivity, mobile/peripheral support, storage configuration, and virtualization/cloud practice. Core 2 guarantees OS tools, security response, software/mobile troubleshooting, and operational workflow practice. The audit generates 500 forms per core and fails if any category or practical minimum is missing.

## Next Iteration

The next opportunity is interaction depth, not more ordinary questions. Work proceeds through Network+ first and Security+ second, followed by the planned Splunk editorial pass:

1. Completed June 13, 2026: Network+ cable-map, routing-table, wireless-survey, endpoint-to-port, and multi-artifact practical enrichment.
2. Security+: add an ordered firewall-rule builder and multi-artifact incident cases combining logs, topology, and policy evidence.
3. Both: continue strengthening per-component explanations for multi-part responses.
4. Continue reducing conservative fallback mappings as practical items and weak objective families receive future editorial replacement.
5. After the Security+ pass, polish Splunk stems, distractors, result evidence, and review explanations.
