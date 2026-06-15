# CompTIA A+ Full-Bank Quality Audit

Date: June 14, 2026

## Decision

CompTIA A+ Core 1 and Core 2 now grade **A+** under the freecertprep simulation-readiness rubric.

This is an evidence-based project grade, not a claim that a browser reproduces CompTIA's confidential item bank, PBQ interface, partial-credit rules, psychometrics, or scaled scoring. The production banks now provide exceptional blueprint-aligned practice within that boundary.

## Results

| Measure | Core 1 | Core 2 |
| --- | ---: | ---: |
| Questions | 760 | 760 |
| Official objectives represented | 27 | 36 |
| Exact duplicate stem groups | 0 | 0 |
| Canonical duplicate stem groups | 0 | 0 |
| Unique answer interactions | 760 | 760 |
| Questions in repeated answer interactions | 0 | 0 |
| Cross-objective repeated interactions | 0 | 0 |
| Evidence-based PBQ-lite interactions | 20 | 20 |
| Randomized forms validated | 500 | 500 |

## Overhaul Completed

- Rebuilt generated questions around objective- and domain-correct technical decisions.
- Replaced static repeated distractor sets with unique, plausible interaction sets.
- Removed generic matching, ordering, and statement-block templates from the production pools.
- Kept single-response, multiple-response, and evidence-based PBQ-lite formats aligned to the public CompTIA format description.
- Added structured review guidance to every selected-response item:
  - why the correct choice is right;
  - why each distractor is wrong;
  - what evidence verifies the result.
- Corrected verification guidance so same-numbered objectives in Core 1 and Core 2 cannot inherit guidance from the wrong domain.
- Doubled each practical pool from 10 to 20 while preserving the 760-question bank size.
- Added mobile, networking, cabling, memory, printing, storage, display, operating-system, Linux, security, software, backup, and change-control evidence scenarios.

## Quality Gates

`npm run audit:aplus` now fails if either bank:

- does not contain exactly 760 questions;
- contains an exact or canonical duplicate stem;
- contains a repeated answer interaction;
- maps an item to the wrong objective or domain;
- leaves an official objective uncovered;
- restores generic drill-only interaction types;
- omits the complete explanation structure;
- has fewer than 20 complete PBQ-lite interactions;
- produces a 90-question form with incorrect official domain allocation;
- produces a form with fewer than six practicals or a missing practical category.

The audit generates 500 randomized forms per core. Review ledgers can be regenerated with `npm run audit:aplus:ledger`.

## Production Composition

| Type | Core 1 | Core 2 |
| --- | ---: | ---: |
| Single choice | 635 | 635 |
| Multiple response | 105 | 105 |
| PBQ-lite matching | 20 | 20 |

Correct-answer positions remain evenly distributed across selected-response items.

## Fidelity Boundary

Official CompTIA materials identify 220-1201 and 220-1202 as maximum-90-question, 90-minute exams that can include single response, multiple response, drag-and-drop, and performance-based questions. CompTIA does not publish live items, exact per-form PBQ counts, item weights, partial-credit rules, or the conversion from raw performance to scaled score.

freecertprep therefore claims high-quality, blueprint-aligned readiness practice. It does not claim vendor equivalence or access to confidential exam content.
