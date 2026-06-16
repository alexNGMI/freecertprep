# Offering Audit and Roadmap Refresh

Review date: June 16, 2026

## Executive Summary

freecertprep is meeting its stated goal for the focused IT offering: free, no-account certification prep for career-changing IT paths, with realistic practice, local-first progress, and honest readiness language.

The strongest strategic decision remains catalog discipline. The repository contains 11,693 authored IT questions across 17 certifications, but the public product exposes only the nine modules that meet the current bar. The remaining eight IT modules are preserved as Coming Soon, not deleted, so future work is recoverable without weakening the current product.

The next phase should improve reliability and repeatability, not breadth. The highest-value work is local data durability, a single release-quality command, browser smoke coverage, and registry/docs deduplication.

## Stated Goals Reviewed

1. **Help learners break into IT roles.**
   The homepage now presents a coherent progression: A+ foundation, Networking, Cybersecurity, and Cloud. It supports the first user without turning the app into a vendor-logo catalog.

2. **Keep the product free, open, and low-friction.**
   The app remains local-first, no-account, static-hostable, and MIT licensed. Study records stay in browser storage.

3. **Provide exam-shaped practice without pretending to be the vendor exam.**
   The app uses official domains, closest-supported timing/count models, and explicit readiness language. It does not claim to reproduce confidential scaled scoring or proprietary PBQ delivery.

4. **Prioritize quality over catalog size.**
   The live set is intentionally smaller than the authored set. A+, Network+, CCST Networking, Security+, Splunk, Terraform, CLF-C02, and SAA-C03 are the live product. AZ-900, Google CDL, CCNA, NVIDIA, Server+, Linux+, and DCCA stay parked.

5. **Make the product useful to the owner as the first user.**
   Network+ established the end-to-end learner loop: diagnostic, mastery map, study plan, exam debrief, and case practice. A+ Core 1, A+ Core 2, CCST Networking, Security+, AWS Cloud Practitioner, SAA-C03, Splunk, and Terraform now use the same loop, adapted to A+ support objectives, Cisco foundation domains, security objectives, cloud foundation domains, AWS architecture domains, Splunk blueprint domains, and Terraform subobjectives. A+ also has the strongest content quality gates. The dashboard starting point is now consistent across certs.

## Current Offering Snapshot

| Area | Status | Assessment |
| --- | --- | --- |
| Live IT modules | 9 modules, 6,668 questions | Focused and defensible |
| Coming Soon IT modules | 8 modules, 5,025 questions | Correctly parked |
| Real Estate | Hidden sister-site prototype | Preserve, but do not relaunch yet |
| Future sister sites | CDL and NCLEX documented | Defer until core product is harder to break |
| Local-first storage | Functional | Needs durability and recovery work |
| Release checks | Good tests, partial content gates | Needs one command and CI parity |
| Frontend | Polished and simplified | Current dashboard consistency pass is positive |
| Trust layer | Phase 0 live | Backend-backed reports remain future work |

## Live Module Grades

| Module | Current Grade | Product Role | Audit Judgment |
| --- | --- | --- | --- |
| CompTIA A+ Core 1 | A+ | Entry IT foundation | Strongest beginner module; now combines A+ content gates with diagnostic, mastery map, study plan, debrief, and Core 1 case practice |
| CompTIA A+ Core 2 | A+ | Entry IT foundation | Strongest beginner module; now combines A+ content gates with diagnostic, mastery map, study plan, debrief, and Core 2 case practice |
| CompTIA Network+ | A- | Flagship networking cert | Full diagnostic, mastery map, study plan, exam debrief, and case-practice workflow |
| CompTIA Security+ | A- | Cybersecurity baseline | Now has Network+-style diagnostic, mastery map, study plan, debrief, and security case practice |
| Cisco CCST Networking | B+ | Cisco-first networking foundation | Promoted after source check, 750 unique evidence-led stems, six-domain diagnostic, mastery map, study plan, debrief, and case practice |
| AWS Cloud Practitioner | A- | Optional cloud foundation | Now has domain-backed diagnostic, mastery map, study plan, debrief, and cloud scenario practice |
| AWS SAA-C03 | A- | Cloud architecture tier | Valuable role-facing module; now has domain-backed diagnostic, mastery map, study plan, exam debrief, and architecture case practice |
| Splunk Core Certified User | B+ | Applied SOC tooling | Meets bar; now has domain-backed diagnostic, mastery map, study plan, debrief, and search evidence case practice |
| Terraform Associate | B+ | Infrastructure automation skill | Meets bar; now has subobjective diagnostic, mastery map, study plan, debrief, and HCL/plan/state/HCP case practice |

## Parked Module Judgments

| Module | Current Status | Reason to Keep Parked |
| --- | --- | --- |
| AZ-900 | Coming Soon | Useful only for specific Azure goals; not core to the current career path |
| Google Cloud Digital Leader | Coming Soon | Slightly off-strategy for the AWS-centric cloud path |
| CCNA | Coming Soon | Preserved bank targets future 200-301 v2.0; current public exam remains v1.1 until February 2, 2027 |
| NVIDIA AIIO / GENL | Coming Soon | Authored but not enough role-fit or simulation maturity for homepage priority |
| Server+ | Coming Soon | Potential data-center value, but practical troubleshooting needs revision |
| Linux+ | Coming Soon | Useful future AI/infrastructure foundation, but needs command/output/config rewrite |
| Schneider DCCA | Coming Soon | Source hardening and facility-scenario work needed before public fit |

## Verification Performed

- `npm audit --omit=dev`: zero vulnerabilities.
- `npm test -- --run src/__tests__/content-sanity.test.js`: 1,049 content sanity tests passed.
- `npm run audit:aplus`: Core 1 and Core 2 each have 760 unique answer interactions, 20 PBQ-lite items, zero duplicate/canonical duplicate stem groups, and 500 validated randomized forms.
- `npm run audit:netplus`: 760 questions, zero duplicate/template groups, 52 practical questions, and 500 validated forms.
- `npm run audit:secplus`: 760 objective-ledger rows, zero duplicate/template groups, zero operational-ticket stems, zero objective fallbacks, 33 practical questions, and 500 validated forms.
- `npm run audit:terraform`: 647 normalized-unique stems, 647 structured explanations, 532 evidence-led questions, zero invalid objectives, and zero legacy Terraform Cloud references.
- `npm run audit:comptia-objectives`: Network+ and Security+ have zero invalid objectives, zero missing metadata, and zero domain fallbacks.

## Competitive Position

The product is strongest where most free prep tools are weakest:

- no signup wall;
- transparent local-first progress;
- objective-level tracking instead of only raw quiz scores;
- practical scenario formats for CompTIA-style learning;
- honest source/status metadata;
- high-volume banks without forcing everything into the public catalog.

The competitive gap is not another cert. The gap is confidence infrastructure: recovery, export/import completeness, browser-smoke release checks, and a clean path from content audit to CI gate.

## Risks

1. **Local learner work can still be fragile.**
   Export/import exists, but completed results, full-study backup, storage quota warnings, and history retention need hardening.

2. **Quality gates are not yet one release command.**
   Cert-specific audits exist, but a maintainer must remember which ones to run.

3. **Registry and docs can drift.**
   Counts, live status, and readiness statements are repeated across files.

4. **Large UI/data files increase change risk.**
   `QuestionCard.jsx`, `Docs.jsx`, `certs.js`, and related route files are carrying too much responsibility.

5. **Parked modules can tempt premature expansion.**
   Their raw counts are high, but the live product should not absorb them until each passes the same readiness decision used for the current catalog.

## Recommended Order of Operations

### 1. Local Data Durability

- Bound or compact session history.
- Surface browser-storage write failures.
- Persist the latest completed result so refresh/direct return does not lose the debrief.
- Add a versioned full-study backup that includes progress, Smart Practice stats, bookmarks, and current schema version.
- Defer active-session resume until completed-result recovery works.

### 2. Release Quality Gate

- Add `verify:quality` to run lint, tests, build, dependency audit, and cert-specific audits.
- Wire the same command into GitHub Actions.
- Add a minimal browser smoke suite for home, catalog, one dashboard, practice submit, exam submit, and results recovery.
- Remove or suppress app-owned Recharts sizing warnings.

### 3. Registry and Docs Deduplication

- Move live/coming-soon/readiness status into one certification registry contract.
- Derive catalog groups from that registry.
- Generate repeated docs inventory tables from registry/question metadata.
- Keep hand-written docs for strategy and judgment, not repeated counts.

### 4. Maintainability Cleanup

- Split `QuestionCard.jsx` by interaction family behind a stable scoring/rendering contract.
- Split in-app Docs into smaller data sections.
- Archive completed one-off generation scripts with a manifest.
- Extract session/result persistence contracts.

### 5. Content Maintenance, Not Expansion

- Maintain A+ A+ grade gates.
- Preserve the foundation learning-loop model now shared by A+ Core 1, A+ Core 2, Network+, Security+, CLF-C02, SAA-C03, Splunk, and Terraform.
- Improve Splunk, Terraform, and SAA review quality through sampling and targeted rewrites.
- Keep CCNA, Linux+, Server+, DCCA, NVIDIA, AZ-900, and Google CDL parked.

## Board-Level Recommendation

Hold the catalog where it is. Spend the next sprint making the product harder to lose data in, harder to ship accidentally, and easier to maintain. The offering is already broad enough; the next advantage comes from trust, recovery, and repeatable quality.
