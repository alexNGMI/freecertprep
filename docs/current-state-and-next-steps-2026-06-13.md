# Current State and Next Steps

Last updated: June 23, 2026

## Executive Summary

freecertprep is in a consolidation and public-beta foundation phase. The repository contains 11,697 authored questions across 17 IT certifications, while the public catalog deliberately exposes nine modules and marks eight as Coming Soon. The current product now combines its study workflow with live Cloudflare hosting, optional Supabase email accounts, manual cloud backup/restore, and durable signed-in question reporting.

The next release should complete the operational trust loop, not make the catalog larger.

The June 14 full-codebase review found four priorities:

1. make privacy, licensing, and search/share claims match the implementation;
2. protect local learner data from silent write failure, unbounded history, and refresh-only result loss;
3. make cert-specific audits and browser smoke part of the release gate;
4. reduce duplicated status data and oversized modules before they become expensive to change.

Detailed review: `docs/codebase-review-and-action-plan-2026-06-14.md`.

The requested execution order began with content quality, then trust correctness. The A+ full-bank overhaul, trust/metadata pass, hosted deployment, authentication, and first account-data layer are now complete. Merge-aware synchronization and admin review are the next active platform phases.

Network+ also established a complete personal learning loop: a balanced diagnostic, objective mastery map, deterministic personal study plan, exam debrief, and practical case mode. A+ Core 1, A+ Core 2, CCST Networking, Security+, AWS Cloud Practitioner, SAA-C03, Splunk, and Terraform now use the same learning-loop architecture for the live product. CCNA also uses the loop as a Coming Soon v2.0 preview, driven by its 25 objective families and CLI/topology/config/subnetting case practice. This improves the offering while keeping catalog promotion disciplined.

The June 16 offering audit confirms the same strategic direction: the current catalog is broad enough. The June 17 course-companion usefulness audit adds the sharper positioning: freecertprep is strongest as a course companion and readiness coach, not as a standalone lecture course or hands-on lab replacement. The June 23 full content audit confirmed the live modules should stay live. The June 23 remediation pass then added repeatable gates for distractor ambiguity, AWS service freshness, SAA template pressure, CCST clue-to-term wording, and Splunk evidence categories while removing retired AWS service references and deepening Terraform's thinnest objectives. The June 23 human-centered codebase audit reframed the review around what a real learner, maintainer, skeptical reviewer, and future operator would notice after the gates pass. The next advantage comes from protecting local learner work, making release checks repeatable, reducing registry/documentation drift, and preparing a practical backend MVP for Cloudflare hosting, account sync, support email, report-incorrect-info workflow, and admin review. See `docs/offering-audit-2026-06-16.md`, `docs/course-companion-usefulness-audit-2026-06-17.md`, `docs/full-content-audit-2026-06-23.md`, `docs/human-centered-codebase-audit-2026-06-23.md`, and `docs/backend-accounts-architecture-2026-06-17.md`.

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
| HashiCorp Terraform Associate | B+ | Maintain 651-question objective and operational-review gates plus subobjective diagnostic, mastery map, study plan, debrief, and infrastructure case practice |
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

## June 23 Full Content Audit

The June 23 audit rechecked the nine live modules against official sources, automated cert gates, deterministic manual samples, stale-term scans, distractor plausibility, repeated-template pressure, explanation depth, and exam-format fidelity. All current cert-specific gates passed. One confirmed A+ Core 2 distractor defect was fixed during the audit.

The follow-up remediation pass completed the highest-leverage fixes from that audit:

- added `audit:distractors` and wired it into `verify:quality`;
- added `audit:aws-freshness` and wired it into `verify:quality`;
- removed AWS OpsWorks and AWS Cloud9 from the live AWS Cloud Practitioner bank;
- preserved CodeCommit after current AWS documentation confirmed it is generally available again;
- added an enforced SAA-C03 repeated-template ceiling;
- added four Terraform thin-objective items for state purpose, state mapping, HCP Terraform CLI integration, and VCS speculative-plan integration;
- changed CCST clue-to-term wording into first-response classification wording and added a gate so the old phrasing does not return;
- added Splunk evidence-title minimums for event, SPL, transforming-result, dashboard/report, lookup, and scheduled-report/alert evidence.

Current editorial priorities after remediation:

1. Keep `verify:quality` green before every Cloudflare deployment.
2. Do manual spot checks on Network+ and Security+ explanations during normal content maintenance.
3. Continue SAA template-diversity rewrites only when they preserve domain allocation and structured explanations.
4. Leave catalog expansion frozen until local data durability and backend/reporting workflows are settled.
5. Re-run the full live-module audit before promoting any Coming Soon module.

Detailed record: `docs/full-content-audit-2026-06-23.md`.

### Coming Soon

AZ-900, Google Cloud Digital Leader, CCNA, NVIDIA AI Infrastructure and Operations, NVIDIA Generative AI LLMs, Server+, Linux+, and Schneider DCCA remain authored and preserved. They stay out of the live catalog until a current source audit, cert-specific quality gate, and B+ readiness decision are complete.

### Hidden and Deferred

- Real Estate remains an internal review build.
- NVIDIA and Data Center Technician path routes remain implemented but hidden.
- CDL and NCLEX remain future sister-site concepts.
- CCNA remains parked until Cisco 200-301 v2.0 becomes active on February 3, 2027 and the bank is re-audited. June 16 update: the preserved bank now meets the internal Network+ quality bar for content structure, simulation evidence, unique stems, explanation depth, and the diagnostic/mastery/study-plan/debrief/case-practice loop, but it still cannot be presented as current-exam practice before the active Cisco release changes.
- AZ-900, Google CDL, Linux+, Server+, DCCA, and NVIDIA should not be promoted because raw question count alone is not enough; each needs a current source audit and cert-specific release gate.

## Verified Baseline

- 1,298 tests pass across 43 files.
- 1,049 content sanity tests pass.
- `npm audit --omit=dev` reports zero vulnerabilities.
- A+, Network+, Security+, Terraform, CompTIA objective, distractor ambiguity, and AWS freshness audit scripts pass locally.
- Homepage and catalog have no horizontal overflow at 1280px or 390px.
- The public offering contains nine live and eight Coming Soon modules.
- Question banks are lazy-loaded by certification.
- Both A+ cores grade A+; Network+ and Security+ grade A-; Splunk and Terraform grade B+ with stronger post-audit quality gates.
- Catalog expansion remains frozen.
- Fresh dashboards now show one clear recommended next step across certs: A+ Core 1, A+ Core 2, Network+, CCST Networking, Security+, CLF-C02, SAA-C03, Splunk, Terraform, and the CCNA preview point to a diagnostic, while other certs point to Smart Practice; mastery and objective panels stay hidden until progress exists.
- Production is live at `https://freecertprep.a-gilbert2093.workers.dev`.
- Supabase magic-link sign-in and sign-out work in production.
- Signed-in learners can manually back up progress, Smart Practice statistics, and bookmarks, then restore their latest snapshot.
- Signed-in question reports persist to Supabase under row-level security; local fallback copies remain exportable.

## Ordered Next Steps

### Product Polish Program - Completed June 24, 2026

Work through these stages in order, verifying desktop and mobile before moving forward:

1. First-use experience: make homepage to path to certification to diagnostic immediately understandable.
2. Visual consistency: standardize spacing, typography, buttons, cards, status labels, and responsive layouts.
3. Account experience: clarify signed-in state, backup/restore status, timestamps, errors, and confirmations.
4. Study workflow: smooth diagnostic, mastery map, study plan, practice, simulation, and debrief transitions.
5. Micro-polish: improve loading, empty, focus, motion, tooltip, wording, and responsive states.
6. Full browser walkthrough: test every critical learner journey on desktop and mobile and repair remaining friction.

Stage 1 is complete:

- the homepage now separates brand-new learners, career-path learners, and visitors who already know their certification;
- A+ now states that Core 1 comes first for most new learners and exposes an immediate Core 1 action;
- the A+ selector keeps the selected-core action beside the choice instead of below the full blueprint;
- live career-path cards now show explicit open actions;
- Networking labels Network+ as the broad default and CCST as the Cisco route;
- the two first-use routes were verified without horizontal overflow on mobile and desktop.

Stage 2 is complete:

- Home, Catalog, Career Paths, A+, and Account now share one title, lead, eyebrow, section-heading, surface, and button system;
- public-page desktop titles use one 60px scale and mobile titles use one 36px scale;
- cards and primary commands now use the shared `Surface` and `Button` primitives instead of page-specific imitations;
- A+ no longer uses an oversized marketing-only type scale;
- Catalog and Career Path cards now match the study dashboard's panel treatment and interaction motion;
- the remaining 24px-radius study-mode outliers were normalized to the shared 16px panel radius;
- Home, Catalog, Networking, A+, and Account were verified at 390px with zero horizontal overflow.

Stage 3 is complete:

- the account page now clearly describes manual backup and restore instead of implying continuous synchronization;
- signed-in learners see their active email identity and latest cloud-backup timestamp;
- cloud and local snapshots show counts for certifications, sessions, tracked questions, and bookmarks;
- backup, restore, sign-in, and sign-out use separate loading labels instead of one ambiguous busy state;
- restore requires an explicit confirmation and explains that local progress, Smart Practice statistics, and bookmarks will be replaced;
- restore now detects browser-storage write failure instead of reporting a false success;
- implementation jargon was removed from learner-facing status cards;
- the dashboard account link now says `Account & backup`;
- signed-out and mobile account layouts were verified without horizontal overflow.

Stage 4 is complete:

- Diagnostic, Mastery Plan, Practice, Cases, Simulation, and Debrief now share one visible workflow navigator;
- the navigator marks the current stage and links directly to every available adjacent checkpoint;
- practice completion now offers the mastery plan alongside review, another block, and mode selection;
- case completion now offers both mastery review and the readiness simulation;
- exam setup shows its place in the wider study loop;
- exam results use one authoritative next-action group and no longer repeat Dashboard, Recent Misses, and Retake commands below the debrief;
- result actions now use the shared button hierarchy so focused repair is primary and retake is deliberately secondary;
- the workflow navigator uses two compact rows on mobile and was verified without horizontal overflow.

Stage 5 is complete:

- route and certification loading now use one accessible status component with useful context instead of silent spinners;
- loading, button, and page motion now respect the learner's reduced-motion preference;
- empty saved-practice modes offer a direct route back to Smart Practice instead of ending at a disabled button;
- empty results now explain what is missing and return the learner to the dashboard through the shared surface and button system;
- account, dashboard, and question-report feedback now announces success and error states to assistive technology;
- tooltips now stay inside the viewport and wrap longer guidance cleanly;
- focused regression coverage protects the loading announcement and question-report status behavior.

Stage 6 is complete:

- all nine live certification dashboards render without horizontal overflow or console errors on desktop and mobile;
- the homepage, catalog, A+ selector, career paths, account, docs, diagnostic, mastery plan, practice, exam, and results journeys were walked in the rendered app;
- cross-page `Paths` links now land on the intended homepage section instead of returning learners to the top;
- a fresh mastery plan now exposes one diagnostic action instead of two competing copies;
- the diagnostic start action now appears in the header and remains visible without requiring a mobile learner to pass the full instruction block first;
- empty review queues and empty results both provide tested recovery actions;
- question-report dialogs now move focus inside, contain keyboard focus, close with Escape, and restore focus to the trigger;
- the documentation sidebar continues to follow the active section on desktop;
- 12 Playwright browser scenarios now protect the critical journeys across desktop and mobile.

The six-stage product polish program is complete. Catalog expansion remains frozen; the next work should come from real learner use, production feedback, and the existing operational backlog rather than another broad visual pass.

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

### Priority Three Content Polish - Completed June 23, 2026

- added richer Security+ practical evidence across log triage, IAM correlation, firewall/IPS policy, alert review, flow analysis, retention, and incident-response items;
- extended `audit:secplus` so all 33 Security+ practical questions must carry evidence or an interactive artifact, with explicit IAM/firewall/alert/incident/flow/retention coverage terms;
- deepened 20 Network+ troubleshooting explanations around gateway validity, duplex mismatch, runts, RF/SNR, DHCP/APIPA, traceroute interpretation, OSPF EXSTART, VoIP RTP, provider-path escalation, and wireless association flow;
- rewrote 50 SAA-C03 cost-optimization stems while preserving the 750-question count, 600/150 format split, official 30/26/24/20 domain allocation, and structured explanations;
- reduced SAA-C03 repeated architecture-template groups from 160 to 139 under the existing audit.

### Backend MVP Foundation - Active June 23, 2026

- opened a dedicated backend planning branch for live domain hosting, domain email, optional accounts, progress sync, report-incorrect-info workflow, and admin report review;
- documented the Cloudflare + Supabase architecture, six-step implementation order, privacy posture, and cost model;
- drafted the first Supabase schema migration for profiles, email subscriptions, study snapshots, question stats, bookmarks, session results, question issue reports, and correction events;
- applied the schema in Supabase with row-level security;
- connected the production React app using Supabase's publishable key;
- shipped passwordless magic-link sign-in and persistent sessions;
- shipped manual full-study snapshot backup and latest-snapshot restore;
- shipped signed-in question-report persistence with local fallback;
- preserved the product decision that anonymous local-first study remains fully usable.

### Account and Sync Foundation - Completed June 23, 2026

- added `/account` as the frontend home for optional email sign-in, sign-out, local export, cloud backup, and restore;
- added account access from the homepage and cert navigation, plus an optional sync nudge on dashboards;
- connected `@supabase/supabase-js` through `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`;
- configured production and local authentication redirect URLs;
- kept account code lazy-loaded so the authentication dependency does not inflate the main application chunk.

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

### 3. Local Data Durability and Sync

- cap or compact session history;
- show a warning when browser storage cannot save;
- persist the latest completed result across refresh;
- preserve the completed versioned full-study snapshot backup for progress, Smart Practice statistics, and bookmarks;
- add active-session resume only after completed-result recovery is reliable.
- replace latest-snapshot-only restore with merge-aware synchronization by cert, question, and session timestamp;
- add last-backup/last-sync status and conflict tests;
- retain explicit manual controls until automatic sync is proven safe.

Manual full-study snapshot backup and restore are complete. Automatic background sync is intentionally not yet claimed.

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

Completed:

- Cloudflare Workers Static Assets production deployment from `main`;
- Supabase project and initial schema with row-level security;
- optional magic-link authentication and persistent sessions;
- explicit manual account backup and restore;
- durable signed-in report-incorrect-info submissions.

Next:

- set up domain email for support/admin;
- add explicit product-email opt-in separate from authentication;
- build merge-aware cross-device sync and last-sync status;
- build a protected admin report queue with review statuses and correction events;
- add account data export/deletion and publish a concise privacy policy before promotion.

### 7. A+ Content Maintenance

- preserve the zero-repeated-interaction and 20-practical gates;
- recheck the official 220-1201 and 220-1202 source pages during release reviews;
- sample explanations and practical evidence during normal editorial maintenance;
- maintain Splunk and Terraform without increasing question counts;
- keep Coming Soon promotion paused.

### 8. Live Content Audit Follow-Up

- upgrade Network+ and Security+ explanations to the newer why-right, why-wrong, and operational-takeaway standard;
- add a distractor-ambiguity audit for generated banks;
- run an AWS service freshness pass on CLF-C02 and SAA-C03;
- reduce SAA-C03 repeated-template pressure without changing its official domain allocation;
- deepen Terraform thin objectives with HCL, plan, state, backend, provider, variable, and HCP Terraform examples;
- make CCST questions less clue-to-term and more first-response troubleshooting oriented;
- add more Splunk SPL result, dashboard, lookup, scheduled-report, and alert evidence.

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

Work is ready when it makes the current learner experience more accurate, recoverable, testable, or maintainable. New catalog entries remain out of scope while automatic sync, admin review, domain email, and privacy/data controls are unfinished.
