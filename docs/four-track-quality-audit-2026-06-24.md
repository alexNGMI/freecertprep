# Four-Track Product Quality Audit

Date: June 24, 2026

## Scope

Four independent reviews examined the current product without expanding the catalog:

1. human teaching value across the nine live certification modules;
2. first-user comprehension across the full learning workflow;
3. accessibility across critical study and account interactions;
4. maintainability and source-of-truth drift.

The audits were followed by implementation, regression tests, and release-gate verification.

## Teaching Value

### Release-blocking findings

- CCST pre-answer evidence frequently contained the exact correct response.
- Security+ `secplus-539` mixed a 600-record scenario with the rule for breaches affecting fewer than 500 individuals.
- Terraform `tf-81`, `tf-161`, `tf-321`, and `tf-561` used evidence that did not support the question being asked.
- Several A+ scenarios combined the wrong device or installation context with the technical task.

### Implemented response

- removed CCST correct-response leakage and added a permanent evidence-leak gate;
- corrected the Security+ threshold scenario and added a regression assertion;
- repaired the four sampled Terraform artifacts and added evidence-context checks;
- repaired the sampled A+ context defects and added regression assertions;
- preserved every question ID, count, type, and blueprint allocation.

### Remaining editorial work

- reduce repeated interaction families in SAA-C03, CCST, and Splunk through one-for-one rewrites;
- replace stock explanation templates with misconception-specific coaching;
- improve distractor plausibility and reduce answer-length cues;
- deepen CLF-C02 contrast explanations on scenario questions;
- continue targeted Network+ and Security+ explanation enrichment rather than wholesale rewriting.

## First-User Comprehension

### Implemented response

- unanswered simulator items still affect the score but no longer create false weakness or debrief recommendations;
- incidental practice is labeled as an early snapshot until a diagnostic or exam establishes a baseline;
- “Study Plan” is now the consistent workflow name;
- “Confidence” is now “Evidence strength”;
- diagnostics show a time estimate and warn that unfinished answers are not saved;
- account copy explains first-link account creation and manual backup behavior;
- support copy states honestly when no inbox is monitored;
- homepage, catalog, and A+ copy use learner language instead of internal release terminology;
- the simulator labels its threshold as a freecertprep practice target, not a vendor passing score;
- signed-out question-report behavior is explained before submission.

## Accessibility

### Implemented response

- exam submission confirmation traps focus, closes with Escape, and restores focus to its trigger;
- answer controls expose grouping and selected state;
- matching controls have accessible names;
- answer feedback uses a polite live status;
- moving between questions moves focus to the new question region;
- bookmark, ordering, close, and navigator controls have explicit names and larger targets;
- question progress uses progress-bar semantics and the current question uses `aria-current`;
- SPA route changes move focus to the destination heading.

### Remaining accessibility work

- systematic semantic color tokens and automated contrast checks;
- timer milestone announcements;
- richer table captions/header associations for evidence artifacts;
- accessible alert-dialog treatment for destructive account confirmations;
- automated axe, forced-colors, and reduced-motion browser projects.

## Maintainability

### Implemented response

- administrator report status values, labels, colors, and actionability now have one shared definition;
- admin failures show user-safe operational messages instead of deployment instructions;
- catalog visibility now exposes derived counts and selectors with tests.

### Deferred refactors

- shared public header/footer components;
- a single career-path registry;
- lifecycle status migration into the certification registry;
- splitting the Docs release ledger and large certification registry;
- extracting specialized renderers from `QuestionCard`.

These remain worthwhile, but they should be completed as narrow refactors with behavior-preserving tests rather than combined with learner-facing changes.

## Product Judgment

The current offering remains broad enough. The highest-value work is improving how accurately the live banks teach, how clearly the workflow guides a first learner, and how reliably all users can operate the study tools. New certifications remain paused.
