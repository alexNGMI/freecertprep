# CompTIA A+ Production Pool Audit

Date: 2026-05-22

## Scope

- Core 1: `comptia-a-plus-core-1` / `220-1201`
- Core 2: `comptia-a-plus-core-2` / `220-1202`
- Core 1 production pool: 750 questions
- Core 2 production pool: 750 questions
- Production target: met for both cores
- Catalog behavior: registered as `published: false`, routable from `/comptia/a-plus`, hidden from the main 3x3 homepage catalog

## Blueprint Alignment

Core 1 domain allocation:

| Domain | Weight | Questions |
| --- | ---: | ---: |
| Mobile Devices | 13% | 98 |
| Networking | 23% | 173 |
| Hardware | 25% | 188 |
| Virtualization and Cloud Computing | 11% | 82 |
| Hardware and Network Troubleshooting | 28% | 209 |

Core 2 domain allocation:

| Domain | Weight | Questions |
| --- | ---: | ---: |
| Operating Systems | 28% | 210 |
| Security | 28% | 210 |
| Software Troubleshooting | 23% | 173 |
| Operational Procedures | 21% | 157 |

## Quality Checks

| Check | Core 1 | Core 2 |
| --- | ---: | ---: |
| Total questions | 750 | 750 |
| Duplicate stems | 0 | 0 |
| Single-choice answer balance | 139 / 141 / 139 / 139 | 137 / 138 / 138 / 138 |
| Single-choice | 558 | 551 |
| Multiple-response | 94 | 93 |
| Statement-block | 65 | 65 |
| Matching | 22 | 24 |
| Ordering | 11 | 17 |

Automated gates passed:

- `npm run validate:content`
- `npm test`
- `npm run lint`
- `npm run build`

## Verdict

Core 1 and Core 2 now both meet the 750-question production target while staying separate from the main catalog grid. Each core keeps its own route, passing score, official domain weighting, 90-question simulator, and mixed item-type coverage for single-choice, multiple-response, statement-block, matching, and ordering practice.
