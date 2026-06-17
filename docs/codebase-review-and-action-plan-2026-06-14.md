# Codebase Review and Action Plan

Review date: June 14, 2026

Execution update: Phase 5 was performed first at the owner's request, followed by Phase 1. The A+ full-bank overhaul and public trust/metadata cleanup are complete. A Network+ personal learning loop was added June 15 without changing the catalog, then extended to the live modules and the preserved CCNA v2.0 preview. The June 16 offering audit confirmed the current catalog should remain frozen and pointed the next work at local data durability, release automation, and maintainability. Phase 2, local data durability, remains next.

## Executive Assessment

freecertprep is a credible local-first study product, not a prototype held together by placeholder screens. The core learner flow is implemented, the public catalog has been narrowed to nine defensible modules, content is lazy-loaded, and the automated suite covers the scoring and selection logic that would cause the most learner harm if it failed.

The next release should not add certifications. It should close the gap between the quality of the question banks and the reliability, privacy, release automation, and maintainability of the application around them.

Current overall position:

- **Content:** strong for the focused live catalog, with two A+ modules, four A- modules, and three B+ modules.
- **Study experience:** useful and coherent across dashboard, practice, drill, exam, results, bookmarks, objective review, diagnostic, mastery map, study plan, debrief, and case practice.
- **Frontend:** polished and responsive on the reviewed homepage and catalog routes.
- **Reliability:** good automated coverage, with several recoverability and long-term storage gaps still open.
- **Trust:** source metadata and honest readiness language are strong; privacy and licensing claims need correction.
- **Operations:** static hosting remains appropriate, but CI does not yet run every cert-specific quality gate.
- **Maintainability:** acceptable today, but several large files and duplicated status definitions will make future changes riskier.

## Review Scope

The review covered:

- application routing and public/hidden product surfaces;
- homepage, catalog, path pages, Docs, dashboards, study modes, and results;
- certification registry, catalog visibility, lazy loading, and question-bank organization;
- progress, question statistics, bookmarks, import/export, timers, and session completion;
- tests, cert-specific audit scripts, GitHub Actions, dependency status, and production metadata;
- maintained project documents and historical planning reports;
- desktop and 390px mobile browser checks of the homepage and catalog.

Baseline at review time:

- 17 authored IT certification modules;
- 11,693 authored IT questions;
- 9 live modules and 8 Coming Soon modules;
- 1,283 passing tests across 38 files;
- zero production dependency vulnerabilities reported by `npm audit --omit=dev`;
- clean `main` branch at commit `cb6caeb` before this documentation update.

## Product Inventory

### Live

| Module | Readiness | Position |
| --- | --- | --- |
| CompTIA A+ Core 1 | A+ | 760 unique answer interactions, 20 practicals, and 500 validated forms |
| CompTIA A+ Core 2 | A+ | 760 unique answer interactions, 20 practicals, and 500 validated forms |
| CompTIA Network+ | A- | Flagship simulation; preserve existing gates |
| Cisco CCST Networking | B+ | Cisco-first networking foundation with evidence-led six-domain practice |
| CompTIA Security+ | A- | Preserve structured ledger and form guarantees |
| Splunk Core Certified User | B+ | Maintain evidence and explanation gates |
| HashiCorp Terraform Associate | B+ | Maintain objective and operational-review gates |
| AWS Cloud Practitioner | A- | Maintain source and release alignment |
| AWS Solutions Architect - Associate | A- | Maintain architecture-focused review quality |

### Preserved as Coming Soon

AZ-900, Google Cloud Digital Leader, CCNA, NVIDIA AI Infrastructure and Operations, NVIDIA Generative AI LLMs, Server+, Linux+, and Schneider DCCA remain in the repository. They should not return to the live catalog without a current source audit, a cert-specific quality gate, and a B+ simulation-readiness decision.

### Hidden or Deferred

- Real Estate remains an internal review build with public navigation removed.
- NVIDIA and Data Center Technician path routes remain implemented but hidden.
- CDL and NCLEX remain future sister-site concepts.
- CCNA remains parked until Cisco 200-301 v2.0 becomes active on February 3, 2027 and the preserved bank is re-audited. The preview now has the shared diagnostic, mastery map, study plan, exam debrief, and case-practice workflow, but that does not change its public release posture.

## What Is Working Well

1. **The public offering is focused.** The homepage presents A+ → Networking → Cybersecurity → Cloud as a recommended progression while allowing experienced learners to enter later; Network+ belongs only to Networking.
2. **The study engine has real depth.** It supports weighted forms, ten interaction types, objective-level review, Smart Practice, bookmarks, recent misses, due review, timed drills, and full simulations.
3. **Question banks do not inflate the initial bundle.** Certification JSON is loaded only when its route is opened.
4. **Core correctness has meaningful tests.** Scoring, allocation, weighted sampling, storage recovery, session idempotency, UI behavior, and full-bank content structure are covered.
5. **The strongest certs have cert-specific gates.** A+, Network+, Security+, Terraform, and CompTIA objective coverage have dedicated audit scripts.
6. **The product is honest about simulation limits.** Readiness scores are not presented as vendor score conversions, and proprietary PBQ delivery is not claimed.
7. **The static, local-first architecture still fits.** No account or backend is required for the current single-device use case.

## Findings

### P0 - Trust and Release Correctness

1. **Privacy copy is broader than the implementation.** The site says that no data leaves the device, but the homepage calls CounterAPI and the document loads Google Fonts. Study answers and progress remain local, but the absolute claim is false.
2. **Root search and sharing metadata is stale.** `index.html` describes an older AWS/Azure/Google/NVIDIA/CompTIA catalog and approximately 5,800 questions. The current inventory is 11,693 questions with a deliberately narrower live catalog.
3. **The repository has no visible license.** Public source code is not legally open source until a license grants reuse rights. The project should either add an intentional license or describe itself as source-available.
4. **Cert-specific audits are not enforced by CI.** GitHub Actions runs lint, the Vitest suite, and the build, but not the dedicated A+, Network+, Security+, Terraform, or CompTIA objective audits.

### P1 - Learner Data and Recovery

1. **Session history has no retention policy.** Quiz and exam history can grow until browser storage reaches its quota.
2. **Storage write failures are silent.** The storage helper can fail safely, but the learner is not told that progress was not saved.
3. **Results are navigation-state dependent.** Refreshing or directly opening the results route loses the completed session context.
4. **Active sessions are not resumable.** A reload or accidental navigation discards an in-progress quiz, drill, or exam.
5. **Backup scope is fragmented.** Session history can be exported, while question-level Smart Practice statistics and bookmarks are managed separately. A versioned full backup would better match the local-first promise.

### P1 - Release Confidence

1. **There is no automated browser smoke suite.** Browser QA is manual even though the core route journey is stable enough for a small repeatable end-to-end gate.
2. **Chart components emit transient sizing warnings.** Route transitions can render Recharts containers at negative dimensions before layout settles.
3. **Mobile navigation is incomplete.** At 390px the homepage has no visible Paths, Catalog, Docs, or GitHub header navigation. The main calls to action still work, but secondary navigation depends on page content and the footer.

### P2 - Maintainability

1. **Catalog status has more than one source of truth.** Registry configuration and `catalogVisibility.js` can drift.
2. **Several files own too many responsibilities.** `QuestionCard.jsx`, `Docs.jsx`, `certs.js`, `Dashboard.jsx`, and `Quiz.jsx` are large enough that routine changes carry unnecessary regression risk.
3. **Docs repeat dynamic facts by hand.** Counts, live status, and quality claims appear in multiple files and can fall behind the registry.
4. **Content tooling is cluttered.** Numerous one-off generation and append scripts remain in the repository root and scripts directory after their migrations completed.
5. **The results and session contracts are implicit.** Shared session/result schemas would reduce route-state and format-specific branching.

### P3 - Deferred Product Work

- accounts and cross-device synchronization;
- backend-backed issue reports, moderation, and correction history;
- PWA/offline installation;
- Real Estate republication;
- CDL and NCLEX sister sites;
- Coming Soon certification promotion;
- CCNA v2.0 release work before the active exam changes.

## Ordered Action Plan

### Phase 1 - Make Public Claims True - Completed June 14, 2026

1. Remove the third-party visitor counter; it adds little learner value and creates an avoidable outbound request.
2. Replace Google-hosted fonts with system or self-hosted fonts, or disclose the request explicitly.
3. Rewrite privacy copy to distinguish local study data from ordinary static asset requests.
4. Refresh root description, Open Graph, Twitter, and canonical metadata around the current focused catalog.
5. Choose and add a repository license. Until then, use "source available" rather than "open source."

Done when:

- no study page sends learner progress or answers off-device;
- public privacy language matches observed network behavior;
- shared/search metadata names the current product and offering;
- repository reuse rights are explicit.

### Phase 2 - Protect the First User's Work

1. Add a bounded retention policy for session history.
2. Surface localStorage write failures with a clear, non-blocking warning.
3. Persist the latest completed result so refresh and direct recovery work.
4. Add versioned full backup/restore for progress, Smart Practice stats, and bookmarks.
5. Decide whether active-session resume is required for the first public release; implement it after the completed-result recovery path.

Done when:

- long-term use cannot silently exhaust storage;
- failed saves are visible;
- a completed result survives refresh;
- one export can restore the learner's complete local study state.

### Phase 3 - Turn the Existing Quality Work into a Release Gate

1. Add a `verify:quality` script that runs lint, tests, cert-specific audits, and the production build.
2. Run `verify:quality` in GitHub Actions.
3. Add a small browser smoke suite for home, catalog, one live dashboard, practice completion, exam start/submit, and results recovery at desktop and mobile widths.
4. Remove the Recharts sizing warnings and add a focused regression where practical.
5. Add dependency and metadata checks to the release checklist.

Done when:

- one local command matches the required CI release gate;
- a pull request cannot bypass cert-specific audits;
- the core learner journey has repeatable browser coverage;
- browser smoke completes without console errors or warnings owned by the app.

### Phase 4 - Reduce Drift and Change Risk

1. Make publication/readiness status part of one certification registry contract.
2. Derive catalog groups and documentation counts from that registry.
3. Split `QuestionCard` by interaction family behind one stable scoring contract.
4. Split the in-app Docs content into smaller data-driven sections.
5. Extract shared session/result types and persistence helpers.
6. Move completed one-off content scripts into a dated archive with a short manifest.

Done when:

- changing a cert's status requires one edit;
- public counts and status cannot disagree with the registry;
- question-format changes do not require editing one 800-line renderer;
- active tooling is clearly separated from historical migration scripts.

### Phase 5 - Resume Content Improvement, Not Expansion - Overhaul Completed June 14, 2026

1. Full 760-row structured objective and interaction ledgers were generated for both A+ cores.
2. All repeated and cross-objective answer interactions were eliminated.
3. Generic drill types were replaced with exam-appropriate selected response and evidence-based PBQ-lite work.
4. Every selected-response explanation now teaches the correct choice, rejected choices, and verification.
5. Each practical pool doubled from 10 to 20 while the total bank remained 760.
6. Both cores were reassessed at A+ under the project readiness rubric.
7. Maintain Splunk and Terraform rather than increasing their counts.
8. Keep all remaining Coming Soon modules parked until the platform phases above are complete.

Done when:

- every A+ item has a durable objective-review decision;
- repeated scenario families and weak distractor patterns are measured and remediated;
- randomized forms retain domain and practical-category guarantees;
- the readiness grade is evidence-based and documented.

## Explicitly Not Next

The following work would consume time without addressing the current product's strongest risks:

- adding another certification;
- publishing a Coming Soon bank because its raw count is large;
- building accounts before local data recovery is dependable;
- relaunching Real Estate;
- promoting CCNA before its targeted exam release is active;
- adding engagement features such as streaks before release confidence and storage durability are complete.

## Recommended Next Sprint

Execute Phase 2 next. The trust-and-metadata cleanup is complete, and the highest remaining product risk is silent or incomplete recovery of the first user's locally stored study work.

Reference: `docs/offering-audit-2026-06-16.md`.
