# Network+ N10-009 Structured Quality Audit

Date: June 14, 2026  
Scope: all 760 Network+ questions, certification metadata, 500 randomized full-exam forms, practical-item behavior, objective learning metadata, review explanations, and learner-facing simulation claims.

## Executive Decision

Network+ remains **Live** with an overall **A- simulation-readiness grade**.

The module is now suitable for serious N10-009 preparation. It combines exact full-form domain allocation, a large pool, balanced answer positions, broad subnetting and troubleshooting coverage, zero repeated canonical scenario groups, reviewed objective metadata for every item, and guaranteed practical interaction variety. It stops at A- because the browser experience can only approximate CompTIA's proprietary PBQ delivery, partial-credit rules, multiple solution paths, and scaled scoring.

This audit did not expand the catalog or increase the question count. It corrected proven defects, replaced clearly misplaced questions in thin objectives, filled current N10-009 topic gaps, and added a repeatable Network+ quality gate.

## Official Baseline

Primary sources:

- [CompTIA Network+ certification page](https://www.comptia.org/en-us/certifications/network/)
- [CompTIA Network+ practice questions](https://www.comptia.org/en-us/certifications/network/practice-questions/)
- [CompTIA performance-based questions explained](https://www.comptia.org/en-us/resources/test-policies/exam-development/performance-based-questions-explained/)
- [CompTIA: What Is on the CompTIA Network+ Exam?](https://www.comptia.org/en-us/blog/what-is-on-the-comptia-network-exam/)

Verified N10-009 baseline:

| Attribute | Official model | Local model | Result |
| --- | --- | --- | --- |
| Active release | Network+ V9, N10-009 | N10-009 | Aligned |
| Launch date | June 20, 2024 | Recorded in source metadata | Aligned |
| Question count | Maximum 90 | 90 | Aligned |
| Time | 90 minutes | 90 minutes | Aligned |
| Official score | 720 on a 100-900 scale | 80% readiness target | Honest approximation; not an official score conversion |
| Item families | Multiple choice and performance-based | Selected response plus PBQ-style browser interactions | Useful approximation |
| Retirement | Estimated 2027 | Source record remains date-sensitive | Recheck during normal source review |

Official domain weights:

| Domain | Official weight | Questions in each 90-item form |
| --- | ---: | ---: |
| Networking Concepts | 23% | 21 |
| Network Implementation | 20% | 18 |
| Network Operations | 19% | 17 |
| Network Security | 14% | 13 |
| Network Troubleshooting | 24% | 21 |

The 90-question allocation uses deterministic rounding and totals exactly 90. Five hundred randomized forms reproduced this allocation without a failure.

## Bank Inventory

| Measure | Result |
| --- | ---: |
| Total questions | 760 |
| Exact normalized duplicate stems | 0 |
| Single-choice | 588 |
| Multiple-response | 45 |
| Matching | 20 |
| Ordering | 30 |
| Statement block | 45 |
| PBQ matching | 20 |
| Topology scenario | 5 |
| CLI output | 5 |
| Configuration repair | 2 |
| Practical-type questions | 52 |

Pool allocation:

| Domain | Pool count | Pool percentage | Official target |
| --- | ---: | ---: | ---: |
| Networking Concepts | 174 | 22.9% | 23% |
| Network Implementation | 152 | 20.0% | 20% |
| Network Operations | 145 | 19.1% | 19% |
| Network Security | 107 | 14.1% | 14% |
| Network Troubleshooting | 182 | 23.9% | 24% |

Single-choice answer positions are acceptably balanced: A 156, B 154, C 150, and D 140 after remediation. No answer-position pattern is strong enough to reward guessing.

## Objective Coverage

All 27 numbered N10-009 objectives are represented and remain mapped to the correct top-level domain.

| Objective | Count | Objective | Count | Objective | Count |
| --- | ---: | --- | ---: | --- | ---: |
| 1.1 | 30 | 2.1 | 19 | 4.1 | 12 |
| 1.2 | 28 | 2.2 | 41 | 4.2 | 23 |
| 1.3 | 4 | 2.3 | 54 | 4.3 | 24 |
| 1.4 | 30 | 2.4 | 38 | 4.4 | 26 |
| 1.5 | 6 | 3.1 | 23 | 4.5 | 22 |
| 1.6 | 26 | 3.2 | 66 | 5.1 | 98 |
| 1.7 | 40 | 3.3 | 29 | 5.2 | 31 |
| 1.8 | 10 | 3.4 | 18 | 5.3 | 32 |
|  |  | 3.5 | 9 | 5.4 | 12 |
|  |  |  |  | 5.5 | 9 |

Every question now has a recorded review decision in `netplus-objective-review-ledger-2026-06-14.csv`. Strict matches use only the stem, correct answer, and direct operational evidence; unmatched items retain their reviewed objective without random fallback classification. The bank now has zero fallback concept labels.

The greatest distribution concern is objective 5.1 at 98 items. Many troubleshooting scenarios inherit the methodology objective even when their strongest learning value belongs to a specific symptom, tool, or technology objective. This does not corrupt full exams because domain weighting is correct, but it can dilute objective-focused practice and recommendations.

## Current-Blueprint Topic Check

The audit specifically checked modern N10-009 concepts emphasized by CompTIA.

| Topic | Current evidence | Assessment |
| --- | ---: | --- |
| Subnetting, CIDR, or address scope | 106 questions | Strong |
| CLI or command evidence | 185 questions mentioning command/terminal concepts; 5 dedicated CLI interactions | Strong knowledge coverage; interaction depth can grow |
| Topology or diagram reasoning | 36 questions; 5 dedicated topology interactions | Useful approximation |
| SD-WAN | 7 | Adequate |
| VXLAN | 9 | Adequate |
| Infrastructure as code / drift | 4 | Gap repaired |
| Network function virtualization | 1 | Present but thin |
| Virtual private cloud | 2 | Present but thin |
| Zero trust | 4 | Adequate for this blueprint level |
| SASE | 3 | Adequate for this blueprint level |

The remediation replaced redundant or misclassified DNS, NAT, port, and classful-address items with infrastructure-as-code, configuration-drift, NFV, VPC, cloud-network-component, fiber, PoE, EMI, and copper-termination questions. This improved current-release fidelity without changing domain counts or total pool size.

## Practical Simulation

Every generated 90-question form is required to contain:

- at least eight practical-type questions;
- at least one multiple-response item;
- at least one matching item;
- at least one ordering item;
- at least one statement-block item;
- at least two CLI-output items;
- at least one topology scenario;
- at least one configuration-repair item;
- at least one interactive subnetting drill;
- cable-mapping evidence;
- routing-analysis evidence;
- wireless-survey evidence;
- multi-artifact troubleshooting evidence.

The ten enriched PBQ scenarios use two correlated artifacts each and provide component-level feedback. The full bank contains 52 practical-type items: 20 PBQ matching, 15 CLI output, 9 topology scenarios, 6 configuration repairs, and 2 interactive subnetting drills.

This is pedagogically stronger than a random form that happens to omit practical work. It is still an editorial practice model. CompTIA does not publish its live PBQ inventory, exact PBQ count per form, item weights, interface implementation, or scaled-score conversion. The product must continue describing these forms as readiness simulations rather than exact replicas.

## Content Realism

### Strong

- Zero exact normalized duplicate stems.
- Concise stems: the bank generally asks one operational question rather than burying the task in unnecessary prose.
- Explanations usually identify the correct mechanism and contrast it with the distractors.
- Subnetting, addressing, routing, switching, wireless, operations, and troubleshooting receive substantial coverage.
- Correct-answer positions are balanced.
- Only one question used "ticket" wording, so help-desk ticket framing was not a systemic Network+ problem.

### Needs Improvement

The initial audit found **19 repeated scenario families covering 91 questions**. The completed remediation converted those families into distinct diagnosis, root-cause, validation, prevention, and confirmation tasks. Selected variants now use CLI, topology, configuration, packet, or subnetting evidence.

- stale DNS server assignment;
- missing DHCP offers;
- stale DNS cache;
- DHCP scope exhaustion;
- exhausted PoE budget;
- wireless channel overlap;
- WAN latency at the provider handoff;
- duplex mismatch;
- incorrect default gateway;
- omitted VLAN on a trunk;
- duplicate IPv4 address;
- blocked application port;
- VPN MTU failure;
- reversed fiber polarity;
- incorrect route preference;
- blocked RTP;
- unreachable static next hop;
- Layer 2 loop or incorrect MAC learning.

These are valid N10-009 scenarios, but repeating each four or five times reduces perceived variety and lets learners memorize patterns. They should be diversified by changing the evidence, failure mechanism, requested action, and distractor logic, not merely the branch number.

Canonical and exact normalized duplicate groups are now both zero. The permanent gate fails on any regression above zero.

## Corrections Made

This audit:

1. repaired 175 visible encoding artifacts involving em dashes, arrows, and minus signs;
2. removed the only ticket-driven stem;
3. corrected the firewall change-management item from objective 3.2 to 3.1;
4. replaced ten clearly misplaced or redundant questions in thin objectives;
5. added infrastructure-as-code, configuration-drift, NFV, VPC, cloud networking, fiber, PoE, EMI, and cable-termination coverage;
6. expanded the only two explanations below the 20-word editorial floor;
7. preserved all 760 IDs, top-level domain counts, type counts, and practical counts;
8. diversified all 91 questions in the repeated families;
9. recorded an objective-review result for all 760 questions and eliminated fallback labels;
10. expanded the practical pool from 32 to 52 and raised the full-form minimum from six to eight;
11. added `npm run audit:netplus`.

## Automated Quality Gate

`npm run audit:netplus` now verifies:

- exactly 760 questions;
- no exact normalized duplicate stems;
- no visible mojibake;
- no ticket-driven stems;
- every numbered objective has at least three items;
- every explanation has at least 20 words;
- current-release IaC, drift, NFV, and VPC terms remain represented;
- repeated scenario-template coverage remains at zero;
- 500 randomized forms preserve exact domain allocation;
- every form has at least eight practicals;
- every form includes at least two CLI items plus topology, configuration-repair, and subnetting interactions;
- every form includes all four required practical categories;
- every form includes selected non-single-choice formats.

## Grade

| Dimension | Grade | Reason |
| --- | --- | --- |
| Source and release alignment | A- | Current N10-009 release, official format, and source links are correctly represented |
| Blueprint fidelity | A | Pool and full-form domain allocation align exactly |
| Selected-response realism | A- | Broad, plausible, and free of exact or canonical scenario repetition |
| Practical/PBQ fidelity | B+ | 52 varied interactions and eight-practical forms; proprietary CompTIA delivery still cannot be reproduced |
| Explanation and review value | A- | Explanations meet the editorial floor and diversified scenarios use evidence-specific reasoning |
| Objective learning metadata | A- | All 760 items have a recorded review decision and no fallback classification remains |
| Overall simulation readiness | **A-** | High-quality live simulation with only proprietary-delivery limitations |

## Ordered Follow-Up

1. **Maintain zero repeated groups.** Any new Network+ batch must pass exact and canonical uniqueness checks.
2. **Maintain the objective ledger.** Every changed item must update its recorded objective decision.
3. **Preserve practical composition.** Full forms must retain eight practicals and every required interaction and evidence category.
4. **Recheck the official release normally.** Revalidate source metadata when CompTIA publishes retirement or successor-exam details.
5. **Keep product claims bounded.** Continue describing the module as a readiness simulation rather than an exact vendor delivery engine.

Catalog expansion remains frozen. The next quality investment should reduce Network+ repetition and improve objective-learning precision, not add another certification.
