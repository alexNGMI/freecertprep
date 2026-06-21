# Current State and Next Steps

Last updated: June 17, 2026

## Executive Summary

freecertprep is in a consolidation phase. The repository contains 11,693 authored questions across 17 IT certifications, while the public catalog deliberately exposes nine modules and marks eight as Coming Soon. The current product is useful: its focused homepage, career directions, dashboard, objective learning loops, Smart Practice, drills, simulations, review, bookmarks, and local progress tracking form a coherent study workflow.

The next release should make that workflow more trustworthy and durable, not larger.

The June 14 full-codebase review found four priorities:

1. make privacy, licensing, and search/share claims match the implementation;
2. protect local learner data from silent write failure, unbounded history, and refresh-only result loss;
3. make cert-specific audits and browser smoke part of the release gate;
4. reduce duplicated status data and oversized modules before they become expensive to change.

Detailed review: `docs/codebase-review-and-action-plan-2026-06-14.md`.

The requested execution order began with content quality, then trust correctness. The A+ full-bank overhaul and trust/metadata pass are now complete. Local data durability is the next active phase.

Network+ also established a complete personal learning loop: a balanced diagnostic, objective mastery map, deterministic personal study plan, exam debrief, and practical case mode. A+ Core 1, A+ Core 2, CCST Networking, Security+, AWS Cloud Practitioner, SAA-C03, Splunk, and Terraform now use the same learning-loop architecture for the live product. CCNA also uses the loop as a Coming Soon v2.0 preview, driven by its 25 objective families and CLI/topology/config/subnetting case practice. This improves the offering while keeping catalog promotion disciplined.

The June 16 offering audit confirms the same strategic direction: the current catalog is broad enough. The June 17 course-companion usefulness audit adds the sharper positioning: freecertprep is strongest as a course companion and readiness coach, not as a standalone lecture course or hands-on lab replacement. The next advantage comes from protecting local learner work, making release checks repeatable, reducing registry/documentation drift, and preparing a practical backend MVP for Cloudflare hosting, account sync, support email, report-incorrect-info workflow, and admin review. See `docs/offering-audit-2026-06-16.md`, `docs/course-companion-usefulness-audit-2026-06-17.md`, and `docs/backend-accounts-architecture-2026-06-17.md`.

## Current Public Offering

### Live

| Certification | Readiness | Current Direction |
| --- | --- | --- |
| CompTIA A+ Core 1 | A+ | Full-bank interaction rewrite, 20 practicals, 500-form gate, diagnostic, mastery map, study plan, debrief, and case practice verified |
| CompTIA A+ Core 2 | A+ | Full-bank interaction rewrite, 20 practicals, 500-form gate, diagnostic, mastery map, study plan, debrief, and case practice verified |
| CompTIA Network+ | A- | Preserve objective ledger, practical form gates, diagnostic, mastery map, study plan, exam debrief, and case practice |
| Cisco CCST Networking | B+ | Preserve six-domain source alignment, 750 unique evidence-led stems, diagnostic, mastery map, study plan, debrief, and case practice |
| CompTIA Security+ | A- | Preserve objective ledger, mixed-interaction gates, diagnostic, mastery map, study plan, exam debrief, and security case practice |
| Splunk Core Certified User | B+ | Maintain evidence, uniqueness, explanation gates, domain diagnostic, mastery map, study plan, debrief, and search case practice |
| HashiCorp Terraform Associate | B+ | Maintain objective and operational-review gates plus subobjective diagnostic, mastery map, study plan, debrief, and infrastructure case practice |
| AWS Cloud Practitioner | A- | Maintain source alignment plus domain-backed diagnostic, mastery map, study plan, exam debrief, and cloud scenario practice |
| AWS Solutions Architect - Associate | A- | Maintain architecture-focused review plus domain-backed diagnostic, mastery map, study plan, debrief, and case practice |

## Course-Companion Usefulness

The June 17 audit judged the live modules by whether a learner could combine them with a free playlist, vendor learning path, or low-cost course and realistically progress toward the intended goal.

| Module | Course Companion | Standalone | Exam Readiness | Career Usefulness |
| --- | --- | --- | --- | --- |
| A+ Core 1 | A+ | B+ | A | A |
| A+ Core 2 | A+ | B+ | A | A |
| Network+ | A | B+ | A- | A |
| Security+ | A | B+ | A- | A- |
| CCST Networking | B+ | B | B+ | B+ |
| AWS Cloud Practitioner | A- | B+ | A- | B+ |
| AWS SAA-C03 | A- | A- | A- | A |
| Splunk Core Certified User | A- | B | B+ | A- |
| Terraform Associate 004 | A- | A- | B+ | A- |

Positioning rule: use a course to learn concepts, then use freecertprep to diagnose, practice, repair gaps, and judge readiness. Do not market the app as a full teaching course, hands-on lab platform, vendor PBQ clone, or official score predictor.

### Coming Soon

AZ-900, Google Cloud Digital Leader, CCNA, NVIDIA AI Infrastructure and Operations, NVIDIA Generative AI LLMs, Server+, Linux+, and Schneider DCCA remain authored and preserved. They stay out of the live catalog until a current source audit, cert-specific quality gate, and B+ readiness decision are complete.

### Hidden and Deferred

- Real Estate remains an internal review build.
- NVIDIA and Data Center Technician path routes remain implemented but hidden.
- CDL and NCLEX remain future sister-site concepts.
- CCNA remains parked until Cisco 200-301 v2.0 becomes active on February 3, 2027 and the bank is re-audited. June 16 update: the preserved bank now meets the internal Network+ quality bar for content structure, simulation evidence, unique stems, explanation depth, and the diagnostic/mastery/study-plan/debrief/case-practice loop, but it still cannot be presented as current-exam practice before the active Cisco release changes.
- AZ-900, Google CDL, Linux+, Server+, DCCA, and NVIDIA should not be promoted because raw question count alone is not enough; each needs a current source audit and cert-specific release gate.

## Verified Baseline

- 1,285 tests pass across 38 files.
- 1,049 content sanity tests pass.
- `npm audit --omit=dev` reports zero vulnerabilities.
- A+, Network+, Security+, Terraform, and CompTIA objective audit scripts pass locally.
- Homepage and catalog have no horizontal overflow at 1280px or 390px.
- The public offering contains nine live and eight Coming Soon modules.
- Question banks are lazy-loaded by certification.
- Both A+ cores grade A+; Network+ and Security+ grade A-; Splunk and Terraform grade B+.
- Catalog expansion remains frozen.
- Fresh dashboards now show one clear recommended next step across certs: A+ Core 1, A+ Core 2, Network+, CCST Networking, Security+, CLF-C02, SAA-C03, Splunk, Terraform, and the CCNA preview point to a diagnostic, while other certs point to Smart Practice; mastery and objective panels stay hidden until progress exists.

## Ordered Next Steps

### Network+ Personal Learning Loop - Completed June 15, 2026

- added a 35-question diagnostic that samples every official objective;
- added Strong, Developing, Weak, and Not measured mastery states;
- added evidence-driven 7-, 14-, and 30-day plans;
- upgraded full exam results with objective priorities and practical-miss context;
- added ten-question case practice using the existing applied interaction pool;
- retained local-first persistence with no account or backend requirement.

Detailed architecture: `docs/network-plus-learning-loop.md`.

### Foundation Learning Loop Parity - Completed June 16, 2026

- extended the learning-loop routes from Network+ to Security+, AWS Cloud Practitioner, SAA-C03, Splunk, and Terraform;
- extended the same loop to A+ Core 1 and A+ Core 2, using their 63 official objectives and 40 PBQ-lite practical scenarios;
- added Security+ diagnostic, mastery map, personal plan, exam debrief, and security case practice across the official SY0-701 objectives;
- added CLF-C02 diagnostic, mastery map, personal plan, exam debrief, and cloud scenario practice using the four official exam domains as measurable targets;
- added SAA-C03 diagnostic, mastery map, personal plan, exam debrief, and architecture case practice using the four official SAA-C03 domains as measurable targets;
- added Splunk diagnostic, mastery map, personal plan, exam debrief, and search evidence case practice using the eight blueprint domains as measurable targets;
- added Terraform diagnostic, mastery map, personal plan, exam debrief, and infrastructure case practice using all 37 implemented Terraform subobjectives as measurable targets;
- added CCST Networking diagnostic, mastery map, personal plan, exam debrief, and Cisco foundation case practice using the six official 100-150 domains as measurable targets;
- added CCNA preview diagnostic, mastery map, personal plan, exam debrief, and Cisco troubleshooting case practice using the 25 objective families in the preserved v2.0 bank;
- kept the implementation local-first and reused the existing Smart Practice, stats, and result-review engine.

### Course-Companion Usefulness Audit - Completed June 17, 2026

- audited all nine live IT modules against course-companion value, standalone usefulness, exam-readiness support, career usefulness, and blockers;
- verified current external companion fit for Professor Messer, Cisco/NetAcad, AWS Skill Builder, HashiCorp Developer, and Splunk free training;
- confirmed the product should be positioned as a readiness coach paired with a course, not a standalone course or lab environment;
- kept AZ-900, Google CDL, CCNA, NVIDIA, Server+, Linux+, DCCA, and Real Estate excluded from live usefulness scoring;
- added exact docs-only companion source links for the recommended CompTIA playlists and vendor learning paths;
- added a roadmap implication to keep SAA/Terraform/Splunk quality in maintenance without expanding catalog surface.

### Release Quality Gate v1 - Completed June 17, 2026

- added `verify:quality` as the one local command for lint, tests, production build, dependency audit, and current cert-specific audits;
- added `audit:clf-c02` to protect the AWS Cloud Practitioner pool with CLF-C02-specific bank, domain, format, answer, explanation, duplicate, distractor, and randomized-form checks;
- added browser smoke coverage for home, catalog, docs, one live dashboard, practice answer feedback, exam submission, and results on desktop and mobile;
- added `audit:saa-c03`, `audit:splunk`, and `audit:ccst` to protect the remaining flagship live modules with domain/form allocation, format, explanation, evidence, answer-shape, and uniqueness checks;
- kept companion-course links in documentation only, not homepage, catalog, or dashboard surfaces.

### Backend MVP Planning - Started June 17, 2026

- opened a dedicated backend planning branch for live domain hosting, domain email, optional accounts, progress sync, report-incorrect-info workflow, and admin report review;
- documented the Cloudflare + Supabase architecture, six-step implementation order, privacy posture, and cost model;
- drafted the first Supabase schema migration for profiles, email subscriptions, study snapshots, question stats, bookmarks, session results, question issue reports, and correction events;
- preserved the product decision that anonymous local-first study remains fully usable.

### Cloudflare Hosting Architecture - Completed June 21, 2026

- configured production hosting through Cloudflare Workers Static Assets;
- pinned Cloudflare's build runtime with `.node-version` at Node `22.13.0`;
- pinned Wrangler in `devDependencies` and added `npm run deploy:cloudflare` plus `npm run deploy:cloudflare:preview`;
- configured `wrangler.jsonc` to publish `./dist/` and use `single-page-application` fallback for React Router refreshes;
- removed `public/_redirects` because Workers Static Assets validates that file and the old SPA catch-all caused an infinite redirect loop;
- verified `npm run build` and `npm run deploy:cloudflare -- --dry-run` locally.

### 1. A+ Structured Quality Overhaul - Completed June 14, 2026

- rebuilt all 1,520 questions around objective- and domain-correct decisions;
- eliminated repeated and cross-objective answer interactions in both 760-question banks;
- removed generic matching, ordering, and statement templates from the production pools;
- gave every selected-response item structured right-answer, distractor, and verification guidance;
- doubled each practical pool from 10 to 20 evidence-based PBQ-lite interactions;
- validated 500 domain-balanced, category-complete forms per core;
- reassessed both cores at A+ under the project readiness rubric.

Detailed record: `scripts/audits/aplus-structured-quality-audit-2026-06-14.md`.

### 2. Trust and Metadata Correctness - Completed June 14, 2026

- removed the third-party homepage visitor counter;
- replaced Google-hosted fonts with a local system font stack;
- corrected privacy language around locally stored study data;
- refreshed root search, Open Graph, Twitter, and sharing-image metadata;
- added an MIT license and restored accurate open-source language.

### 3. Local Data Durability

- cap or compact session history;
- show a warning when browser storage cannot save;
- persist the latest completed result across refresh;
- create a versioned full backup for progress, Smart Practice statistics, and bookmarks;
- add active-session resume only after completed-result recovery is reliable.

This is the next active product phase because it directly protects the first user's work.

This now pairs with the backend plan: local durability should still land before cloud sync, so a first login can safely merge local data instead of replacing it.

### 4. Release Automation

- keep `verify:quality` green locally as the release baseline;
- keep GitHub Actions aligned to `verify:quality`;
- keep the desktop/mobile browser smoke suite green for the critical learner journey;
- eliminate the current Recharts sizing warnings;
- keep the manual first-user checklist as a final human gate.

### 5. Maintainability

- make catalog status derive from one certification registry;
- generate repeated counts and status summaries from registry data;
- split `QuestionCard.jsx` by interaction family;
- split the in-app Docs page into data-driven sections;
- archive completed one-off content generation scripts.

### 6. Backend MVP

- deploy the current app to Cloudflare on a live domain;
- set up domain email for support/admin;
- create a staging Supabase project;
- apply the initial accounts/sync schema in staging;
- add a Supabase client wrapper behind environment variables;
- add auth context and optional magic-link sign-in;
- add explicit email opt-in;
- build local-to-cloud sync only after local data durability is reliable;
- add report-incorrect-info persistence and a simple admin report queue after account basics are stable.

### 7. A+ Content Maintenance

- preserve the zero-repeated-interaction and 20-practical gates;
- recheck the official 220-1201 and 220-1202 source pages during release reviews;
- sample explanations and practical evidence during normal editorial maintenance;
- maintain Splunk and Terraform without increasing question counts;
- keep Coming Soon promotion paused.

## Completed Foundation

- live source and release audit;
- Terraform learning-value pass;
- first-user journey hardening;
- session completion and malformed-storage recovery fixes;
- Network+ structured full-bank audit and A- grade;
- Security+ structured full-bank audit and A- grade;
- shared diagnostic/mastery/study-plan/debrief/case loops for A+, Network+, CCST, Security+, CLF-C02, SAA-C03, Splunk, Terraform, and the CCNA preview;
- explicit A+ → Networking → Cybersecurity → Cloud progression, with Network+ owned by Networking;
- public catalog split into Live and Coming Soon.

## Decision Rule

Work is ready when it makes the current learner experience more accurate, recoverable, testable, or maintainable. New catalog entries remain out of scope until local data durability, release automation, and maintainability are in better shape.
