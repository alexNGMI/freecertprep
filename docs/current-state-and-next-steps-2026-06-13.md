# Current State and Next Steps

Date: June 13, 2026

## Executive Summary

freecertprep has moved past the catalog-building stage. The repository now contains 11,693 authored questions across 17 IT certifications, but the public product deliberately exposes only eight modules and marks nine as Coming Soon. That is the right strategy: the competitive advantage now comes from making the live experience trustworthy, useful, and repeatable rather than publishing more banks.

The June quality sprint materially improved the strongest learner-facing modules:

- A+ Core 1 and Core 2 now have complete objective coverage, objective-level learning loops, and 20 evidence-led PBQ-lite scenarios.
- Network+ and Security+ now have objective-level learning loops and richer practical forms with category guarantees.
- Splunk Core Certified User now has 750 exact and normalized-unique stems, concise evidence-led prompts, stronger distractors, and structured review explanations.
- Terraform Associate covers all 37 implemented Associate 004 subobjectives, guarantees a mixed-format practice form, and now includes structured operational review across the full bank.
- The full automated suite passes: 1,225 tests across 33 files.

The product is in a strong consolidation phase. The live source audit, Terraform learning-value pass, and first-user journey hardening are complete. The next decision is which single Coming Soon module should earn promotion. The preserved CCNA bank targets the future v2.0 release and remains Coming Soon until Cisco begins v2.0 testing and the bank is re-audited.

## Current Public Offering

### Live

| Certification | Readiness Position | Current Direction |
| --- | --- | --- |
| CompTIA A+ Core 1 | B+ | Maintain objective and PBQ gates |
| CompTIA A+ Core 2 | B+ | Maintain objective and PBQ gates |
| CompTIA Network+ | B+ | Maintain practical-category and objective gates |
| CompTIA Security+ | B+ | Maintain practical-category and objective gates |
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

## Main Risks and Gaps

1. **Coming Soon promotion needs discipline.** Only one module should be remediated at a time, and it must clear active-release, content, review, and simulation gates before becoming public.
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
- Lint, 1,225 tests, and production build pass.

### 4. Choose One Coming Soon Promotion Candidate - Next

Do not reopen several banks at once. Re-grade the candidates after the live-product pass and select one module based on learner value, architecture fit, and remediation cost.

Recommended evaluation order:

1. CCST Networking, if the goal is strengthening the networking entry path.
2. Server+, if the goal is adding practical infrastructure support.
3. Linux+, only when prepared for a substantial command/output rewrite.
4. AZ-900 or Google CDL, if a selected-response cloud module offers the quickest credible promotion.
5. DCCA and NVIDIA only after their hidden paths become strategic priorities again.

### 5. Deferred Platform Work

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
