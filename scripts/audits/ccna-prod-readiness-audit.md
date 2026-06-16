# CCNA Production Readiness Audit

Status: `ccna-200-301` is preserved as Coming Soon.

Source basis: Cisco's announced 200-301 v2.0 exam topics PDF. The pool follows the future five-domain blueprint and keeps the advanced simulation types needed for CCNA-style practice. Cisco v1.1 remains active through February 2, 2027; v2.0 first tests February 3, 2027.

Latest audit: June 16, 2026. The preview bank was rebuilt to the same quality bar used for Network+: clean scenario stems, objective metadata, explanation depth, simulation evidence, and automated regression gates.

## Domain Distribution

| Domain | Count |
| --- | ---: |
| Network Infrastructure and Connectivity | 188 |
| Switching and Network Access | 187 |
| IP Routing | 150 |
| Network Services and Security | 150 |
| AI, Network Operations, and Management | 75 |

## Type Mix

| Type | Count |
| --- | ---: |
| Single-choice | 250 |
| Multiple-response | 60 |
| CLI output | 170 |
| Topology scenario | 120 |
| Config repair | 100 |
| Subnetting drill | 50 |

## Production Gate

- 750 total questions.
- Domain counts match the closest whole-question split for Cisco 200-301 v2.0.
- Simulation types cover CLI output, topology interpretation, configuration repair, and subnetting drills.
- Stems are duplicate-free by exact and normalized comparison.
- Explanations use the structured review pattern: why the answer is right, why distractors are wrong, and the CCNA takeaway.
- Every item carries objective metadata (`objectiveId`, `objectiveTitle`, and `conceptId`) across 25 objective families.
- 440 items are practical simulation items with explicit practical categories.
- CLI items include two-command evidence.
- Topology items include diagrams plus evidence tables.
- Config-repair items include device context, configuration excerpts, and operational notes.
- Subnetting drills require network, broadcast, first usable, last usable, host count, mask, and wildcard values.
- Legacy templated phrasing such as "case 001" and "CCNA candidate is asked" is blocked by tests.
- Registry publishes `ccna-200-301` and exposes it in the full catalog.
- Networking path routes Network+ or CCST Networking into CCNA.
- Data Center Technician path routes Server+ to Schneider DCCA to CCNA.

## Ongoing Quality Notes

CCNA should keep receiving deeper manual audits because it is the first advanced simulation-backed cert and because Cisco v2.0 is not testable until February 3, 2027. Before public release, recheck Cisco's final v2.0 wording, confirm the active exam transition, and run a fresh manual review of OSPF, VLAN, NAT/PAT, ACL, wireless, AI operations, management, and subnetting scenarios.
