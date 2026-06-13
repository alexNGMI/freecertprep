# CCNA 200-301 Simulation Architecture

Status: preserved Coming Soon preview for Cisco CCNA 200-301 v2.0. The 750-question bank includes `cli-output`, `topology-scenario`, `config-repair`, and `subnetting-drill` items alongside written single-choice and multiple-response questions, but it is not presented as current-exam practice.

## Official Scope

Cisco's active exam is **200-301 CCNA v1.1** through February 2, 2027. The first date to test for **v2.0** is February 3, 2027. This bank was authored against the announced v2.0 topic PDF, which defines five weighted domains:

| Domain | Weight | Pool Count |
| --- | ---: | ---: |
| Network Infrastructure and Connectivity | 25% | 188 |
| Switching and Network Access | 25% | 187 |
| IP Routing | 20% | 150 |
| Network Services and Security | 20% | 150 |
| AI, Network Operations, and Management | 10% | 75 |

Primary sources:

- Cisco exam page: https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html
- Cisco active v1.1 exam page: https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html
- Cisco release schedule: https://learningnetwork.cisco.com/s/ccna-exam-topics
- Cisco future v2.0 exam topics PDF: https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf

## Product Position

CCNA remains the intended advanced networking milestone. The v2.0 preview sits above Network+ and CCST Networking in the path, but remains Coming Soon:

- Network+ remains the broad vendor-neutral networking foundation.
- CCST Networking remains the Cisco-oriented entry foundation.
- CCNA is the associate-level Cisco networking target for NOC, junior network admin, infrastructure support, and data center technician learners.
- The preview is intentionally not linked as a live study module while v1.1 remains the active exam.

The pool is intentionally simulation-heavy because CCNA should not feel like another vocabulary bank. It asks learners to read command output, reason from topology evidence, repair configuration snippets, calculate subnets, and choose the least risky operational fix.

## Implemented Question Types

| Type | Count | Purpose |
| --- | ---: | --- |
| Single-choice | 250 | Written exam-style scenario decisions |
| Multiple-response | 60 | Multi-answer concept and troubleshooting checks |
| CLI output | 170 | Interpret router, switch, service, security, and operations output |
| Topology scenario | 120 | Use diagrams, links, and tables to answer topology questions |
| Config repair | 100 | Choose the safest IOS-style or operations repair |
| Subnetting drill | 50 | Calculate network, broadcast, usable range, and host count values |

## Renderer Support

The current `QuestionCard` contract supports the full CCNA surface:

- `cli-output` renders command-output panels with device and command labels.
- `topology-scenario` renders responsive SVG topologies with optional scenario tables.
- `config-repair` renders numbered configuration excerpts, notes, and device context.
- `subnetting-drill` renders typed subnetting fields and review-mode field feedback.

These types share the existing quiz, drill, exam, results, bookmark, and Smart Practice flows. Content sanity tests validate schema shape, domain distribution, type mix, unique stems, answer balance, and domain-appropriate simulation evidence.

## Production Gate

The preserved v2.0 preview gate is:

- 750 questions aligned to the announced v2.0 domain weights.
- Exact simulation mix locked by automated tests.
- No duplicate stems.
- Explanation coverage for every item, with short explanations rejected.
- Published registry entry and catalog/path visibility.
- Networking path: Network+ or CCST Networking, then CCNA.
- Data Center Technician path: Server+, Schneider DCCA, then CCNA.

Ongoing polish should focus on improving realism and variety rather than reopening catalog readiness:

- Add richer multi-command CLI bundles for OSPF, VLAN, NAT, ACL, and wireless troubleshooting.
- Add more diagram variants for redundant paths, FHRP, WLAN controller placement, and management architectures.
- Expand subnetting drills beyond /25-/30 while keeping review feedback readable.
- Recheck Cisco's transition schedule and final v2.0 source wording before public release.
- Decide whether a separate v1.1 practice form is worth building before February 2027; do not mix v1.1 and v2.0 claims.

## Decision

CCNA is a substantial simulation-backed v2.0 preview, not a normal MCQ-only bank. It returns to Live only after Cisco's v2.0 release is active and the bank passes a fresh source, content, form, and editorial audit.
