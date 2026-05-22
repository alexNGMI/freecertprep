# CompTIA A+ First Iteration Audit

Date: 2026-05-22

## Scope

- Core 1: `comptia-a-plus-core-1` / `220-1201`
- Core 2: `comptia-a-plus-core-2` / `220-1202`
- First iteration size: 270 questions per core
- Production target: 750 questions per core
- Catalog behavior: registered as `published: false`, routable from `/comptia/a-plus`, hidden from the main 3x3 homepage catalog

## Blueprint Alignment

Core 1 domain allocation:

| Domain | Weight | Questions |
| --- | ---: | ---: |
| Mobile Devices | 13% | 35 |
| Networking | 23% | 62 |
| Hardware | 25% | 68 |
| Virtualization and Cloud Computing | 11% | 30 |
| Hardware and Network Troubleshooting | 28% | 75 |

Core 2 domain allocation:

| Domain | Weight | Questions |
| --- | ---: | ---: |
| Operating Systems | 28% | 76 |
| Security | 28% | 76 |
| Software Troubleshooting | 23% | 62 |
| Operational Procedures | 21% | 56 |

## Quality Checks

| Check | Core 1 | Core 2 |
| --- | ---: | ---: |
| Total questions | 270 | 270 |
| Duplicate stems | 0 | 0 |
| Single-choice answer balance | 49 / 52 / 52 / 50 | 49 / 52 / 50 / 49 |
| Single-choice | 203 | 200 |
| Multiple-response | 33 | 33 |
| Statement-block | 23 | 23 |
| Matching | 7 | 8 |
| Ordering | 4 | 6 |

Automated gates passed:

- `npm run validate:content`
- `npm test`
- `npm run lint`
- `npm run build`

## Verdict

The first A+ iteration is usable for Core 1 and Core 2 practice while staying separate from the main catalog grid. The next content milestone is expanding each core from 270 to 750 questions with deeper scenario coverage and additional PBQ-style matching/ordering items.
