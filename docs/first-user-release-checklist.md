# First-User Release Checklist

Run this checklist before merging a learner-facing release.

## Discovery

- Homepage has no horizontal overflow at desktop or 390px mobile width.
- A new learner can reach A+, Networking, Cybersecurity, Cloud, and the full catalog without reading Docs.
- A+ is presented as an optional starting point rather than a mandatory first step.
- Networking, Cybersecurity, and Cloud identify target roles and distinguish available practice from upcoming milestones.
- Live and Coming Soon modules are visually and functionally distinct.
- Coming Soon cards do not link to study routes.

## Certification Entry

- Dashboard clearly identifies the certification, active exam code, source status, and readiness target.
- Dashboard provides direct actions for Practice, Timed Drill, and Exam Simulator.
- Mobile cert navigation exposes all four study views with at least 44px targets.
- Invalid cert routes return the learner to a safe page.

## Practice

- Smart Practice starts a stable ten-question block.
- Single-choice, multiple-response, matching, ordering, statement, and practical formats can be completed.
- Feedback explains the answer after submission.
- Bookmark controls work and Bookmarked mode reflects saved questions.
- Session completion shows the score and direct access to Recent Misses.
- Objective recommendations refer to the questions actually answered in that session.

## Timed Drill

- The timer begins only after Start Drill.
- The drill records answers and closes at ten questions or time expiry.
- Completion provides score, retry, and setup actions.

## Exam Simulator

- The timer begins only after the readiness confirmation.
- Question map navigation and Previous/Next controls work.
- Incomplete submission displays the unanswered count and requires confirmation.
- Time expiry still submits automatically.
- Results show readiness language, domain breakdown, review filters, dashboard, Recent Misses, and retake actions.

## Progress Portability

- Export downloads valid progress JSON.
- Import accepts a valid export and rejects malformed or structurally unsafe JSON with visible feedback.
- Smart Practice reset and progress reset require confirmation.

## Release Gates

- Browser console has no errors during the core journey.
- Desktop and 390px mobile layouts have no horizontal overflow or overlapping controls.
- Terraform and certification-specific audits pass.
- Full Vitest suite, lint, and production build pass.
