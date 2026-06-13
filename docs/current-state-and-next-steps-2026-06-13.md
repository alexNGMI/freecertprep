# Current State and Next Steps

Date: June 13, 2026

## Executive Summary

freecertprep has moved past the catalog-building stage. The repository now contains 11,693 authored questions across 17 IT certifications, but the public product deliberately exposes only nine modules and marks eight as Coming Soon. That is the right strategy: the competitive advantage now comes from making the live experience trustworthy, useful, and repeatable rather than publishing more banks.

The June quality sprint materially improved the strongest learner-facing modules:

- A+ Core 1 and Core 2 now have complete objective coverage, objective-level learning loops, and 20 evidence-led PBQ-lite scenarios.
- Network+ and Security+ now have objective-level learning loops and richer practical forms with category guarantees.
- Splunk Core Certified User now has 750 exact and normalized-unique stems, concise evidence-led prompts, stronger distractors, and structured review explanations.
- Terraform Associate covers all 35 published Associate 004 objectives and guarantees a mixed-format practice form.
- The full automated suite passes: 1,219 tests across 30 files.

The product is in a strong consolidation phase. The next work should improve the nine live modules and the first-user study experience. CCNA should remain available but parked from active expansion. Coming Soon banks should not return to the public catalog until they independently clear the B+ readiness bar.

## Current Public Offering

### Live

| Certification | Readiness Position | Current Direction |
| --- | --- | --- |
| CompTIA A+ Core 1 | B+ | Maintain objective and PBQ gates |
| CompTIA A+ Core 2 | B+ | Maintain objective and PBQ gates |
| CompTIA Network+ | B+ | Maintain practical-category and objective gates |
| CompTIA Security+ | B+ | Maintain practical-category and objective gates |
| Splunk Core Certified User | B+ | Maintain evidence, uniqueness, and explanation gates |
| HashiCorp Terraform Associate | B+ | Next editorial and review-mode polish target |
| AWS Cloud Practitioner | A- | Source/version check, then maintain |
| AWS Solutions Architect - Associate | A- | Source/version check, then maintain architecture-focused review |
| Cisco CCNA | B+ | Keep live, but park new simulation expansion |

### Coming Soon

AZ-900, Google Cloud Digital Leader, CCST Networking, NVIDIA AI Infrastructure and Operations, NVIDIA Generative AI LLMs, Server+, Linux+, and Schneider DCCA remain authored and preserved. Their routes and banks are not deleted, but they should stay out of the live catalog until a focused remediation pass proves B+ readiness.

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

1. **Source freshness is uneven.** Several source records were last checked on June 8, while the recently remediated modules were checked June 9 or June 13. A live-module source sweep should precede more major content work.
2. **Terraform is structurally strong but less polished in review mode.** It has full objective coverage and correct format support, but it has not received the same evidence-and-explanation pass as Splunk or the same practical coaching pass as the CompTIA modules.
3. **The first-user journey has not been treated as a release gate.** The individual pieces work, but homepage-to-path-to-practice-to-results-to-next-session should be tested as one coherent experience on desktop and mobile.
4. **Documentation drifted behind the code.** Older roadmap text still described completed work as pending and sometimes called authored Coming Soon modules live.
5. **Trust workflow remains local and lightweight.** Source cards and report links exist, but durable reports, moderation, and correction history require a backend. This is useful later, not the immediate priority for a first user.
6. **CCNA can consume unlimited scope.** Its current simulator is useful, but reproducing deeper Cisco interaction behavior would be a large project. Parking it protects the current quality plan.

## Ordered Next Steps

### 1. Live Source and Release Audit

Verify the official exam guide, active exam code, question-count/time model, scoring language, and source date for all nine live modules. Update `certSources.js`, docs, and any stale simulator copy. Run the full content suite, lint, and build afterward.

Done when:

- Every live module has a current official source record and explicit approximation notes.
- Public copy matches the registry and catalog visibility.
- No live module is accidentally described as an exact vendor score conversion or delivery engine.

### 2. Terraform Learning-Value Pass

Keep the 647-question pool and objective allocation stable. Improve the weakest review experiences instead of increasing count:

- tighten repetitive command-choice stems;
- add concise configuration, plan, state, and diagnostic evidence where it helps;
- strengthen why-right and why-wrong explanations;
- verify plausible distractors around state, modules, providers, lifecycle, imports, and automation;
- add automated uniqueness, explanation, and form-composition gates comparable to the Splunk pass.

Done when:

- Terraform retains complete coverage of all 35 objectives.
- Review mode consistently teaches the operational reason behind the answer.
- No material repeated stem or generic explanation cluster remains.
- Mixed-format 57-question forms continue to pass.

### 3. First-User Journey and Release Hardening

Treat the product as something the owner will use every day:

- test homepage, path, catalog, dashboard, practice, timed drill, exam, results, bookmarks, recent misses, due review, and progress export/import;
- verify desktop and mobile layouts;
- fix confusing navigation, dead ends, stale labels, and inconsistent calls to action;
- add focused browser and component regressions for any corrected workflow;
- record a short manual release checklist.

Done when:

- A new learner can choose a goal, start the right module, finish a session, understand the review, and know what to study next without consulting docs.
- The core journey works at mobile and desktop widths.
- Lint, 1,219+ tests, and production build pass.

### 4. Choose One Coming Soon Promotion Candidate

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

