# CompTIA A+ Objective Remediation

Date: June 8, 2026

## Result

Both A+ banks now meet the project's B+ simulation-readiness threshold.

| Bank | Questions | Official objectives | Concepts before | Concepts after | PBQ-lite |
| --- | ---: | ---: | ---: | ---: | ---: |
| Core 1, 220-1201 | 760 | 27 | 44 | 84 | 10 |
| Core 2, 220-1202 | 760 | 36 | 36 | 94 | 10 |

## Completed remediation

- Added `objectiveId` and `conceptId` to every question, including practical scenarios.
- Added a versioned objective catalog based on the current 220-1201 and 220-1202 V15 objectives.
- Added a failing coverage matrix: every objective must have questions from at least two distinct concepts, and objective/domain mismatches fail.
- Expanded thin and missing objective families with source-backed concepts.
- Replaced all 187 generated generic multiple-response verification answers with objective-specific second actions and shuffled answer positions.
- Replaced cross-domain distractors in the legacy concepts with plausible competing actions from another objective in the same exam domain.
- Shortened generated stems by removing generic evidence and constraint filler.
- Explicitly mapped all twenty PBQ-lite scenarios to the objective hierarchy.
- Added coverage tests and the `npm run audit:aplus` reporting command.

## Remaining fidelity boundary

CompTIA does not publish its live items, PBQ implementation, item weights, or scaled-score conversion. The app therefore provides a blueprint-aligned readiness simulation, not a replica of the vendor exam. Future improvements should focus on richer interactive artifacts rather than inflating the question count.
