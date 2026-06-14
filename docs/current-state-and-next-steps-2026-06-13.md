# Current State and Next Steps

Last updated: June 14, 2026

## Executive Summary

freecertprep has moved past the catalog-building stage. The repository now contains 11,693 authored questions across 17 IT certifications, but the public product deliberately exposes only eight modules and marks nine as Coming Soon. That is the right strategy: the competitive advantage now comes from making the live experience trustworthy, useful, and repeatable rather than publishing more banks.

The June quality sprint materially improved the strongest learner-facing modules:

- A+ Core 1 and Core 2 now have complete objective coverage, objective-level learning loops, and 20 evidence-led PBQ-lite scenarios.
- Network+ and Security+ now have objective-level learning loops and richer practical forms with category guarantees.
- Splunk Core Certified User now has 750 exact and normalized-unique stems, concise evidence-led prompts, stronger distractors, and structured review explanations.
- Terraform Associate covers all 37 implemented Associate 004 subobjectives, guarantees a mixed-format practice form, and now includes structured operational review across the full bank.
- The full automated suite passes: 1,237 tests across 36 files.

The product is in a strong consolidation phase. The live source audit, Terraform learning-value pass, first-user journey hardening, session/persistence reliability pass, and detailed Network+ structured audit are complete. Catalog promotion is paused while the strongest live module is improved rather than the catalog expanded. The preserved CCNA bank targets the future v2.0 release and remains Coming Soon until Cisco begins v2.0 testing and the bank is re-audited.

The public presentation now matches that narrower strategy. A+ is an optional starting point above three role-oriented career directions: Networking, Cybersecurity, and Cloud. Each direction names target roles, distinguishes available practice from upcoming milestones, and labels certifications as optional foundations, career credentials, or applied skills instead of implying one mandatory sequence.

## Current Public Offering

### Live

| Certification | Readiness Position | Current Direction |
| --- | --- | --- |
| CompTIA A+ Core 1 | B+ | Maintain objective and PBQ gates |
| CompTIA A+ Core 2 | B+ | Maintain objective and PBQ gates |
| CompTIA Network+ | A- | Maintain the full-bank objective ledger and eight-practical form gate |
| CompTIA Security+ | A- | Maintain the full-bank objective ledger and mixed-interaction form gate |
| Splunk Core Certified User | B+ | Maintain evidence, uniqueness, and explanation gates |
| HashiCorp Terraform Associate | B+ | Learning-value pass complete; maintain quality gates |
| AWS Cloud Practitioner | A- | Source/version audit complete; maintain |
| AWS Solutions Architect - Associate | A- | Source/version audit complete; maintain architecture-focused review |

### Coming Soon

AZ-900, Google Cloud Digital Leader, CCST Networking, CCNA, NVIDIA AI Infrastructure and Operations, NVIDIA Generative AI LLMs, Server+, Linux+, and Schneider DCCA remain authored and preserved. Their routes and banks are not deleted, but they should stay out of the live catalog until a focused remediation or release-alignment pass proves B+ readiness.

### Hidden Adjacent Products

- Real Estate remains a prototype accessible only from documentation. It needs a source-ledger and editorial re-audit before public discovery.
- CDL and NCLEX remain future sister-site concepts, not current implementation priorities.
- NVIDIA and Data Center Technician path pages remain implemented but hidden.

## What Is Working

1. **Content scale is no longer the constraint.** The repository has enough depth to generate varied forms without immediately repeating a small pool.
2. **The architecture supports exam-shaped practice.** Domain-weighted forms, mixed question types, practical artifacts, objective metadata, targeted review, and local progress tracking are all in place.
3. **Quality gates are becoming cert-specific.** A+, Network+, Security+, Splunk, and Terraform now have meaningful automated checks beyond basic JSON validity.
4. **The public catalog is intentionally narrower than the authored catalog.** This protects learner trust while weaker modules are revised.
5. **The application remains operationally simple.** Progress is local, question banks are lazy-loaded, and the full product can run as a static deployment.
6. **The offering is easier to understand.** The homepage and path pages now explain who each direction serves, what is usable today, and where Coming Soon work belongs.

## Current Constraints and Guardrails

1. **Network+ quality must be preserved.** All 760 items have a recorded objective review, repeated scenario families are at zero, and full forms guarantee eight practical interactions while retaining exact domain allocation. Future edits must keep those gates green.
2. **CCNA release alignment needs discipline.** The preserved bank targets v2.0, but Cisco v1.1 remains active through February 2, 2027. The preview must remain Coming Soon until the active release matches and a fresh audit passes.
3. **Documentation can drift behind code.** Source status, catalog visibility, and readiness claims now need to remain synchronized through release checks.
4. **Trust workflow remains local and lightweight.** Source cards and report links exist, but durable reports, moderation, and correction history require a backend. This is useful later, not the immediate priority for a first user.

## Ordered Next Steps

### 1. Live Source and Release Audit - Completed June 13, 2026

The audit verified the official exam guide, active exam code, question-count/time model, scoring language, and source date for the nine modules that were live at the start of the audit. It corrected metadata and moved future-v2.0 CCNA to Coming Soon.

Done when:

- Every live module has a current official source record and explicit approximation notes.
- Public copy matches the registry and catalog visibility.
- No live module is accidentally described as an exact vendor score conversion or delivery engine.

### 2. Terraform Learning-Value Pass - Completed June 13, 2026

Keep the 647-question pool and objective allocation stable. Improve the weakest review experiences instead of increasing count:

- Generic command openings were reduced from 60 to zero.
- All 647 explanations now use why-right, why-wrong, and operational-takeaway coaching.
- 532 questions include supporting configuration, plan, state, diagnostic, or HCP Terraform evidence.
- Weak distractors were replaced with plausible Terraform misconceptions.
- Automated gates now cover uniqueness, explanation structure, evidence validity, allocation, and 500 randomized forms.

Done when:

- Terraform retains complete coverage of all 37 implemented subobjectives.
- Review mode consistently teaches the operational reason behind the answer.
- No material repeated stem or generic explanation cluster remains.
- Mixed-format 57-question forms continue to pass.

### 3. First-User Journey and Release Hardening - Completed

Treat the product as something the owner will use every day:

- test homepage, path, catalog, dashboard, practice, timed drill, exam, results, bookmarks, recent misses, due review, and progress export/import;
- verify desktop and mobile layouts;
- fix confusing navigation, dead ends, stale labels, and inconsistent calls to action;
- add focused browser and component regressions for any corrected workflow;
- record a short manual release checklist.

Completed improvements:

- Smart Practice now preserves the exact question block through session results, so missed-objective recommendations cannot drift after stats are saved.
- Practice completion provides a direct Recent Misses action and shows the objectives behind the learner's misses.
- Exam results route directly into Recent Misses.
- Incomplete exams require confirmation and display the unanswered count before submission.
- Mobile certification navigation uses 44px minimum touch targets.
- Desktop and 390px mobile browser checks found no horizontal overflow or console errors.
- `docs/first-user-release-checklist.md` now defines the repeatable release gate.

Done when:

- A new learner can choose a goal, start the right module, finish a session, understand the review, and know what to study next without consulting docs.
- The core journey works at mobile and desktop widths.
- Lint, 1,237 tests, production build, browser smoke, and dependency audit pass.

### 4. Runtime Reliability and Recovery - Completed June 13, 2026

Keep the catalog frozen while the current application is treated as the release candidate:

- continue targeted review of timers, navigation state, persistence, resets, imports, and recovery paths;
- add a regression for every confirmed defect;
- run the complete suite, lint, production build, dependency audit, and browser smoke before publication;
- keep Coming Soon modules unchanged until the owner explicitly reopens promotion work.

Completed June 13:

- timed drills now preserve their selected form after stats update;
- practice, drill, and exam completion are idempotent against rapid duplicate actions and timer races;
- exam timer completion no longer performs side effects inside a React state updater;
- progress imports reject structurally unsafe JSON, and existing malformed storage falls back safely;
- certification-provider transitions show loading instead of stale content from the previous module.

### 5. Network+ Structured Quality Program - Completed June 14, 2026

The June 14 audit now grades Network+ **A-** and verifies all 760 questions, 27 objectives, 52 practical items, and 500 randomized forms. It repaired visible encoding, removed ticket framing, eliminated all 19 repeated scenario families, recorded an objective-review decision for every question, deepened CLI/topology/configuration/subnetting practice, and strengthened `npm run audit:netplus`.

Next:

- preserve zero normalized and canonical duplicate groups;
- preserve the 760-row objective review ledger and zero fallback classifications;
- preserve eight practicals, required interaction types, and all evidence categories in every full form;
- keep the catalog frozen and treat future Network+ work as maintenance.

Detailed record: `scripts/audits/netplus-structured-quality-audit-2026-06-14.md`.

### 6. Career-Direction Presentation - Completed June 14, 2026

- A+ is separated from the career directions and presented as an optional starting point.
- Networking shows Network+ as available, with CCST Networking and CCNA as upcoming Cisco-focused milestones.
- Cybersecurity treats Network+ as an optional foundation, Security+ as the career credential, and Splunk as the applied tool.
- Cloud asks "New to cloud?" before the optional Cloud Practitioner foundation, then frames SAA as the career credential and Terraform as the applied skill.
- Homepage cards identify target roles and clearly separate available practice from Coming Soon work.
- Desktop and 390px mobile checks found no horizontal overflow; the complete 1,237-test suite, lint, and production build pass.

### 7. Security+ Structured Quality Program - Completed June 14, 2026

- Reviewed all 760 SY0-701 questions and recorded every item in a durable objective-review ledger.
- Corrected all 101 fallback labels plus four additional legacy misclassifications.
- Removed synthetic workflow-ticket framing while preserving legitimate Kerberos terminology.
- Preserved zero normalized and canonical duplicate groups.
- Expanded thin objective labels into at least two meaningful concept families for every objective.
- Added `npm run audit:secplus` and validated 500 randomized forms with exact domain allocation, six practicals, all four practical categories, and a required interaction mix.
- Regraded Security+ from B+ to **A-**; proprietary CompTIA PBQ delivery, partial credit, and scaled scoring remain the limiting factors.

Detailed record: `scripts/audits/secplus-structured-quality-audit-2026-06-14.md`.

### 8. Deferred Platform Work

Keep these visible in the roadmap but outside the immediate sprint:

- durable trust reports, moderation, and correction history;
- synced accounts and cross-device progress;
- PWA/offline support;
- custom domain work;
- deeper CCNA simulation work;
- Real Estate re-publication;
- CDL and NCLEX sister sites.

## Decision Rule

The next release should make the current product more useful, not larger. New or hidden modules move to Live only after they:

1. have current official-source metadata;
2. meet the B+ simulation-readiness bar;
3. pass cert-specific content and form audits;
4. provide useful review explanations;
5. fit a visible learner path without cluttering the product.
