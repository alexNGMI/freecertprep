# CCNA Preview Pool Audit

Audit date: 2026-05-24

Status: `ccna-200-301` remains unpublished. The current 300-item pool is structurally valid, exactly aligned to the official CCNA v1.1 domain weights, and ready for manual mobile/scoring/editorial QA, but it should not be published yet.

## Current Pool

| Domain | Current |
| --- | ---: |
| Network Fundamentals | 60 |
| Network Access | 60 |
| IP Connectivity | 75 |
| IP Services | 30 |
| Security Fundamentals | 45 |
| Automation and Programmability | 30 |

| Type | Current |
| --- | ---: |
| Single-choice | 113 |
| Multiple-response | 21 |
| CLI output | 64 |
| Topology scenario | 50 |
| Config repair | 34 |
| Subnetting drill | 18 |

## Quality Findings

- Domain allocation is exact for the 300-item milestone: 20/20/25/10/15/10.
- Schema coverage is strong: all CCNA simulation types validate through the content sanity gate.
- Explanation coverage is acceptable: no missing or very short explanations were found in the mechanical pass.
- The pool has no exact duplicate question stems, but several written and CLI families are still too template-like. These should be rewritten or diversified before public placement.
- CLI output items are the strongest differentiator from CCST/Network+. The expansion should keep growing command-output interpretation, especially around trunks, OSPF, routing tables, NAT, DHCP relay, ACLs, and wireless state.
- Subnetting now has 18 drills, meeting the first public-preview quantity bar.
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

## 300-Item Expansion Result

Added 140 items while preserving official domain weights:

Final type mix at 300:

| Type | Count |
| --- | ---: |
| Single-choice | 113 |
| Multiple-response | 21 |
| CLI output | 64 |
| Topology scenario | 50 |
| Config repair | 34 |
| Subnetting drill | 18 |

## Content Rules For The Next Batch

- Do not add CCST-level vocabulary checks unless the question includes a CCNA-level decision or troubleshooting clue.
- Prefer realistic command outputs over abstract descriptions for Network Access, IP Connectivity, IP Services, and Security Fundamentals.
- Every config-repair item should name the broken behavior and include enough surrounding config to make the answer defensible.
- Every topology scenario should ask about forwarding behavior, adjacency, segmentation, or failure isolation, not just device identification.
- Subnetting drills should include varied masks from /25 through /30 and at least a few route-selection or usable-range applications.
- Automation items should focus on API method behavior, JSON/YANG interpretation, controller-based management, and intent/controller tradeoffs.

## Decision

Do not publish yet. The next pass should be manual QA: mobile topology/terminal rendering, simulation scoring in exam and review modes, and editorial cleanup of repeated concept frames that remain visible in the learner experience.
