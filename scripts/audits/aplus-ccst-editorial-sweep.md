# A+ and CCST Editorial Sweep

Date: 2026-05-22

## Scope

- CompTIA A+ Core 1: `src/data/comptia-a-plus-core-1-questions.json`
- CompTIA A+ Core 2: `src/data/comptia-a-plus-core-2-questions.json`
- Cisco CCST Networking: `src/data/ccst-networking-questions.json`

## Checks Performed

The sweep sampled each module by domain and item type, then ran lightweight diagnostics for systemic editorial issues:

- awkward generated grammar in troubleshooting stems
- visible placeholder scenario labels
- exact duplicate question stems
- matching questions where the answer order was identical to display order
- domain and item-type balance after regeneration

## Fixes Applied

- A+ troubleshooting and software-troubleshooting prompts now use issue-oriented stems instead of forcing every topic into "needs to..." phrasing.
- A+ and CCST matching items now shuffle right-side choices and calculate the correct match indexes against the shuffled order.
- CCST questions no longer expose bracketed scenario labels.
- CCST prompts now include case-style context, improving uniqueness while keeping a support-ticket feel.
- CCST ordering items now use domain-specific workflows for addressing, endpoints/media, infrastructure, diagnostics, standards/concepts, and security.

## Current Diagnostics

| Module | Questions | Duplicate stems | Awkward "needs to..." stems | Placeholder scenario tags | Identity-order matching |
| --- | ---: | ---: | ---: | ---: | ---: |
| A+ Core 1 | 750 | 0 | 0 | 0 | 0 |
| A+ Core 2 | 750 | 0 | 0 | 0 | 0 |
| CCST Networking | 750 | 0 | 0 | 0 | 0 |

CCST item mix remains production-shaped after the editorial pass:

| Type | Questions |
| --- | ---: |
| Single-choice | 450 |
| Multiple-response | 150 |
| Matching | 75 |
| Ordering | 75 |

## Verdict

The pools pass the automated schema gates and the highest-impact template issues found in the editorial sample have been fixed at the generator level. A future human review pass should still read deeper random samples for factual nuance, but the generated production pools are no longer carrying obvious template artifacts.
