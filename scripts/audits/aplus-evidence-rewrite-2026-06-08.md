# CompTIA A+ Evidence Rewrite

Date: June 8, 2026

## Official source spine

- CompTIA A+ Core 1, 220-1201, Exam Objectives Version 2.0
- CompTIA A+ Core 2, 220-1202, Exam Objectives Version 2.0
- CompTIA A+ certification pages for current delivery details

Official details checked:

- Maximum 90 questions per core
- 90 minutes per core
- Single-response, multiple-response, drag-and-drop, and performance-based questions
- Core 1 passing score: 675 on a 100-900 scale
- Core 2 passing score: 700 on a 100-900 scale
- Core 1 domains: 13%, 23%, 25%, 11%, and 28%
- Core 2 domains: 28%, 28%, 23%, and 21%

Sources:

- https://www.comptia.org/en/certifications/a/core-1-v15/
- https://partners.comptia.org/docs/default-source/resources/comptia-a-220-1201-exam-objectives-%282-0%29.pdf
- https://partners.comptia.org/docs/default-source/resources/comptia-a-220-1202-exam-objectives-%282-0%29.pdf

## Before

| Bank | Exact unique stems | Duplicate groups | Questions in duplicate groups |
| --- | ---: | ---: | ---: |
| Core 1 | 399 | 114 | 475 |
| Core 2 | 464 | 108 | 404 |

The repeated stems came from a small topic set cycling through generic support contexts. Synthetic ticket identifiers had already been removed, which made the underlying repetition visible.

## After

| Bank | Questions | Exact unique | Normalized unique | PBQ-lite |
| --- | ---: | ---: | ---: | ---: |
| Core 1 | 760 | 760 | 760 | 10 |
| Core 2 | 760 | 760 | 760 | 10 |

The rewrite now varies:

- affected device or environment;
- observed scope and comparison evidence;
- recent-change and configuration evidence;
- support, safety, security, and data-preservation constraints;
- the direct troubleshooting or implementation decision;
- explanation guidance about why unrelated or premature actions are weaker.

Generated questions contain no ticket framing. The handcrafted PBQ-lite scenarios remain intact because support-ticket evidence is legitimate when triage itself is being tested.

## Simulator fidelity

Formal forms:

- contain 90 questions;
- preserve configured domain weighting;
- guarantee at least six `pbq-matching` scenarios;
- allow single-choice, multiple-response, matching, ordering, and PBQ-lite items;
- exclude statement-block learning drills.

Two hundred randomized forms per core passed these checks during the rewrite.

## Remaining risk for the readiness audit

This pass fixes repeated stems and weak contextual framing. It does not by itself prove complete coverage of every Version 2.0 subobjective. The generator currently starts from 44 Core 1 and 36 Core 2 concept templates. The next readiness audit must map those concepts and the handcrafted PBQs to every official subobjective, identify thin or missing areas, and prevent the improved wording from being mistaken for complete blueprint breadth.
