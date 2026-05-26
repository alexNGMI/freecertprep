# CCNA 200-301 Simulation Architecture

Status: production-ready for the current CCNA 200-301 v2.0 scope. The app now publishes `ccna-200-301` as a 750-question Cisco associate-level pool with `cli-output`, `topology-scenario`, `config-repair`, and `subnetting-drill` items alongside written single-choice and multiple-response questions.

## Official Scope

Cisco lists **200-301 CCNA v2.0** as a 120-minute exam tied to the CCNA certification. The official exam topic PDF defines five weighted domains:

| Domain | Weight | Pool Count |
| --- | ---: | ---: |
| Network Infrastructure and Connectivity | 25% | 188 |
| Switching and Network Access | 25% | 187 |
| IP Routing | 20% | 150 |
| Network Services and Security | 20% | 150 |
| AI, Network Operations, and Management | 10% | 75 |

Primary sources:

- Cisco exam page: https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html
- Cisco official exam topics PDF: https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf

## Product Position

CCNA is now the first advanced networking track in the catalog. It sits above Network+ and CCST Networking:

- Network+ remains the broad vendor-neutral networking foundation.
- CCST Networking remains the Cisco-oriented entry foundation.
- CCNA is the associate-level Cisco networking target for NOC, junior network admin, infrastructure support, and data center technician learners.

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

The production gate for CCNA is now:

- 750 questions aligned to the official v2.0 domain weights.
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
- Continue editorial audits against Cisco 200-301 v2.0 source wording whenever Cisco updates the blueprint.

## Decision

CCNA is production-ready as an advanced simulation-backed cert, not a normal MCQ-only bank. Future work should harden the simulation experience and content realism while keeping the current v2.0 blueprint as the source of truth.
