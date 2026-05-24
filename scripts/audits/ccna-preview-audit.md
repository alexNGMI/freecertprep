# CCNA Preview Pool Audit

Audit date: 2026-05-24

Status: `ccna-200-301` remains unpublished. The current 160-item pool is structurally valid, exactly aligned to the official CCNA v1.1 domain weights, and ready for controlled expansion work, but it should not be published yet.

## Current Pool

| Domain | Current | 300-item target | Delta |
| --- | ---: | ---: | ---: |
| Network Fundamentals | 32 | 60 | +28 |
| Network Access | 32 | 60 | +28 |
| IP Connectivity | 40 | 75 | +35 |
| IP Services | 16 | 30 | +14 |
| Security Fundamentals | 24 | 45 | +21 |
| Automation and Programmability | 16 | 30 | +14 |

| Type | Current |
| --- | ---: |
| Single-choice | 65 |
| Multiple-response | 9 |
| CLI output | 34 |
| Topology scenario | 28 |
| Config repair | 16 |
| Subnetting drill | 8 |

## Quality Findings

- Domain allocation is exact for the 160-item milestone: 20/20/25/10/15/10.
- Schema coverage is strong: all CCNA simulation types validate through the content sanity gate.
- Explanation coverage is acceptable: no missing or very short explanations were found in the mechanical pass.
- The pool has no exact duplicate question stems, but several written and CLI families are too template-like. These should be rewritten or diversified during the 300-item expansion rather than preserved as-is.
- CLI output items are the strongest differentiator from CCST/Network+. The expansion should keep growing command-output interpretation, especially around trunks, OSPF, routing tables, NAT, DHCP relay, ACLs, and wireless state.
- Subnetting is still light at 8 drills. It should grow to at least 15-20 before public preview.
- Automation and Programmability has enough schema coverage for preview QA, but the next expansion needs more applied JSON/REST/controller reasoning instead of definition-only items.

## Rewrite Targets Before Public Preview

The following concept clusters need more variation before launch:

- MAC learning and switching fundamentals.
- Fiber/copper media selection.
- TCP vs UDP behavior.
- Access-port versus trunk-port selection.
- Wireless roaming design.
- Trunk output interpretation.
- Administrative distance and longest-prefix-match written items.
- Basic NAT/PAT recognition.
- SSH/ACL management-access controls.
- REST API method and JSON interpretation.

These are not necessarily incorrect. The issue is editorial quality: repeated scenario frames make the pool feel generated if a learner sees several in the same study session.

## 300-Item Expansion Blueprint

Add 140 items while preserving official domain weights:

| Domain | Add |
| --- | ---: |
| Network Fundamentals | 28 |
| Network Access | 28 |
| IP Connectivity | 35 |
| IP Services | 14 |
| Security Fundamentals | 21 |
| Automation and Programmability | 14 |

Recommended final type mix at 300:

| Type | Target range |
| --- | ---: |
| Standard written single-choice | 115-125 |
| Multiple-response / applied written | 15-25 |
| CLI output | 60-65 |
| Topology scenario | 45-50 |
| Config repair | 30-35 |
| Subnetting drill | 15-20 |

## Content Rules For The Next Batch

- Do not add CCST-level vocabulary checks unless the question includes a CCNA-level decision or troubleshooting clue.
- Prefer realistic command outputs over abstract descriptions for Network Access, IP Connectivity, IP Services, and Security Fundamentals.
- Every config-repair item should name the broken behavior and include enough surrounding config to make the answer defensible.
- Every topology scenario should ask about forwarding behavior, adjacency, segmentation, or failure isolation, not just device identification.
- Subnetting drills should include varied masks from /25 through /30 and at least a few route-selection or usable-range applications.
- Automation items should focus on API method behavior, JSON/YANG interpretation, controller-based management, and intent/controller tradeoffs.

## Decision

Proceed to the 300-item expansion only after using this audit as the editorial checklist. The next heavy content pass should both add new items and replace or diversify template-like clusters if they remain visible in the learner experience.
