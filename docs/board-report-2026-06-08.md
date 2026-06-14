# freecertprep Board Review

Date: June 8, 2026  
Scope: Product, catalog, content quality, technology, operations, roadmap, risk, and strategic options  
Repository reviewed: `alexNGMI/freecertprep`  
Prepared from the current workspace and Git history through commit `2a46a8e`

> **Historical snapshot:** This report records the repository as reviewed on June 8, 2026. It is retained for board-history context and is not the current product-status source. See `docs/current-state-and-next-steps-2026-06-13.md` for the maintained roadmap and current public offering.

## Executive Summary

freecertprep has moved beyond an early prototype. It is now a functioning, reusable exam-preparation platform with:

- 17 published IT certifications.
- 11,678 published IT practice questions.
- A separate Real Estate sister experience with a national exam bank and six state-law modules.
- 3,151 Real Estate questions.
- 14,829 authored questions across both product surfaces.
- Smart Practice, timed drills, full exam simulation, bookmarks, results review, progress tracking, import/export, and multiple advanced question types.
- 908 passing automated tests across 26 test files.
- Automated GitHub Actions checks for lint, tests, and production builds.

The product's strongest asset is not any single certification. It is the reusable exam engine and content architecture that can support multiple career-prep verticals without rebuilding the core product.

The central strategic issue has changed. The project no longer needs to prove that it can add certifications quickly. It now needs to prove that it can maintain quality, earn trust, measure usage, and operate a growing catalog responsibly.

The recommended next phase is therefore:

1. Resolve immediate release and security issues.
2. Establish a content trust and provenance system.
3. Rewrite the weakest live question banks before adding more large banks.
4. Add privacy-respecting product analytics and error monitoring.
5. Introduce optional account sync only after the trust and storage model is defined.
6. Defer CDL and NCLEX sister sites until expansion gates are met.

## Board-Level Status

| Area | Status | Assessment |
| --- | --- | --- |
| Product functionality | Green | Core study workflows are complete and tested. |
| Catalog breadth | Green | Broad enough to support meaningful user acquisition. |
| Technical architecture | Green/Amber | Clean reusable engine, but still a client-only SPA with limited operations tooling. |
| Content structure | Green | Strong schema, weighting, explanation, and answer-validation gates. |
| Editorial consistency | Amber/Red | Several recently generated banks remain visibly templated. |
| Trust and provenance | Red | No public issue reporting, review history, source ledger, or correction workflow. |
| Security maintenance | Red | Current dependency audit reports fixable high-severity React Router advisories. |
| Analytics | Red | No reliable funnel, retention, completion, or learning-outcome measurement. |
| Privacy/legal readiness | Amber/Red | Privacy wording, third-party requests, licensing, disclaimers, and trademarks need review. |
| Monetization | Unset | No current revenue model; this is acceptable during product validation. |
| Expansion readiness | Amber | Engine is ready, but governance and editorial capacity are not. |

## Current Product Offering

### IT Certification Catalog

| Certification | Provider | Questions | Simulator |
| --- | --- | ---: | --- |
| AWS Cloud Practitioner, CLF-C02 | AWS | 731 | 65 questions / 90 minutes |
| AWS Solutions Architect - Associate, SAA-C03 | AWS | 750 | 65 / 130 |
| Azure Fundamentals, AZ-900 | Microsoft | 600 | 40 / 45 |
| Cloud Digital Leader | Google Cloud | 749 | 50 / 90 |
| AI Infrastructure & Operations | NVIDIA | 336 | 50 / 60 |
| Generative AI LLMs | NVIDIA | 330 | 50 / 60 |
| CCST Networking, 100-150 | Cisco | 750 | 50 / 50 |
| CCNA, 200-301 | Cisco | 750 | 60 / 120 |
| A+ Core 1, 220-1201 | CompTIA | 760 | 90 / 90 |
| A+ Core 2, 220-1202 | CompTIA | 760 | 90 / 90 |
| Network+, N10-009 | CompTIA | 760 | 90 / 90 |
| Security+, SY0-701 | CompTIA | 760 | 90 / 90 |
| Server+, SK0-005 | CompTIA | 760 | 90 / 90 |
| Linux+, XK0-006 | CompTIA | 750 | 90 / 90 |
| Splunk Core Certified User | Splunk | 750 | 60 / 60 |
| Data Center Certified Associate | Schneider Electric | 750 | 100 / 120 |
| Terraform Associate 004 | HashiCorp | 647 | 57 / 60 |

### Guided Career Paths

The home experience is organized around career direction rather than a wall of vendor logos:

- IT Entry: A+ Core 1 and Core 2.
- Networking: Network+ or CCST Networking, then CCNA.
- Cybersecurity: Network+, Security+, then Splunk Core Certified User.
- Cloud: AWS Cloud Practitioner, SAA-C03, then Terraform Associate.
- NVIDIA: Linux+, NVIDIA AI Infrastructure, then NVIDIA Generative AI.
- Data Center Technician: Server+, Schneider DCCA, then CCNA.

This is strategically stronger than a flat catalog because it helps new learners understand sequence and job relevance.

### Catalog Page Change Under Review

The current workspace contains a reversible, local-only branch:

- Branch: `codex/catalog-page-clean-home`
- Commit: `2a46a8e Move catalog to dedicated page`
- Status: committed locally, not pushed to GitHub, not merged into `main`

At the time of this report, this change removed the certification grid and Real Estate bar from the homepage and placed them on `/catalog`. Automated tests and local browser verification passed. Production `main` was then at `4bbfa3a`; subsequent releases changed the catalog and hid Real Estate from public navigation.

Recommendation: approve the direction, push the branch for review, and merge after one mobile visual check. The separation gives the homepage a clearer job: help uncertain users choose a path. The catalog serves users who already know the exam they want.

## Real Estate Sister Product

The Real Estate product proves that the engine can support a different audience, visual system, taxonomy, and exam-composition model.

| Module | Question Bank | Full Simulator |
| --- | ---: | --- |
| National salesperson | 750 | 80 national |
| Texas | 401 state | 85 national + 50 state |
| Maine | 400 state | 80 national + 40 state |
| Georgia | 400 state | 100 national + 52 state |
| Arizona | 400 state | 80 national + 60 state |
| North Carolina | 400 state | 80 national + 60 state |
| Indiana | 400 state | 80 national + 50 state |

The layered national-plus-state architecture is a real platform advantage. It avoids duplicating the national bank for every state while preserving state-specific practice and full licensing simulations.

However, the product should not claim uniform source confidence across every module. The internal audit notes that Georgia still needs a current, stable official PSI/GREC bulletin pinned before it should be described as publication-ready with the same confidence as the best-audited modules.

The Real Estate landing page also contains a notify form that only acknowledges submission in the browser. It does not save or transmit the email or state. This should either be connected to a real consent-based list or removed, because the current interaction can create a false expectation.

## Recent Development Program

The repository shows unusually high implementation velocity:

- 181 commits since April 1, 2026.
- 194 commits attributed to the primary repository author across all history.
- Major growth from a small cloud-cert prototype into a multi-provider catalog and second product vertical.

### Major Milestones

#### April 2026: Product Foundation

- Expanded initial AWS, Azure, and Google Cloud pools.
- Added matching and ordering question types.
- Added answer shuffling and weighted exam selection.
- Added bookmarks, review, import/export, tests, Smart Practice, and timed drills.
- Added product documentation and initial frontend restructuring.

#### May 2026: Catalog and Platform Expansion

- Shipped Network+, Security+, Server+, A+ Core 1/Core 2, CCST, Terraform, SAA, Splunk, Linux+, DCCA, and CCNA.
- Built the Real Estate sister site, national pool, licensing composition engine, and six state-law modules.
- Added route-level lazy loading, JSON question assets, shared storage helpers, resilience handling, SEO metadata, and CI.
- Redesigned the study workspace and homepage around career paths.
- Added advanced question types for CLI output, topology scenarios, configuration repair, subnetting, and PBQ-style matching.
- Completed several blueprint and weighting audits.

### Assessment of Velocity

The velocity has created a broad product rapidly, but it also explains the present editorial and governance debt. Continued expansion at this pace would increase the amount of content requiring maintenance faster than the project can credibly review it.

## Product and Technical Architecture

### Strengths

- React 19, Vite 8, React Router 7, and Tailwind CSS 4.
- Shared certification registry drives domains, weights, colors, exam settings, and question loading.
- Question banks are lazy-loaded JSON assets, reducing initial page load.
- Shared hooks isolate progress, bookmarks, question statistics, exam sessions, and practice sessions.
- Smart Practice uses weighted reservoir sampling to prioritize weak questions.
- Storage is centralized and versioned, with guarded localStorage access and cross-tab synchronization.
- Import/export gives users a manual backup path.
- A root error boundary prevents blank-page failures.
- Failed question-bank imports surface recoverable errors.
- Real Estate reuses the engine without forking the core logic.
- CI runs lint, the complete test suite, and a production build on main and pull requests.

### Current Scale

- 102 files under `src`.
- Approximately 10,777 JavaScript/JSX source lines.
- 13.1 MB of authored JSON question data.
- 26 test files.
- 908 passing tests as of the latest verified local run.

### Build Profile

The build is healthy and question banks are emitted as separate assets. The largest raw question assets are:

- SAA-C03: approximately 1.70 MB raw, approximately 92 KB compressed.
- Real Estate National: approximately 1.02 MB raw, approximately 305 KB compressed.
- CCNA: approximately 0.82 MB raw, approximately 33 KB compressed.

The main application bundle is approximately 364 KB raw / 111 KB compressed. The dashboard bundle is approximately 448 KB raw / 131 KB compressed, largely reflecting charting and dashboard functionality.

This remains compatible with inexpensive static hosting. A backend is not required to operate the current product.

## Quality Review

### Automated Quality Strengths

The content test suite is a meaningful differentiator. It checks:

- Question-bank count against registry declarations.
- Unique IDs.
- Valid domains.
- Valid question types.
- Correct-answer bounds.
- Required fields for specialized question types.
- Explanation presence and minimum standards.
- Domain weighting.
- Answer-position balance in targeted banks.
- Advanced simulation schemas.
- Publication visibility.

This is far stronger than treating question JSON as unvalidated content.

### Stronger Content Areas

- SAA-C03 has exact official domain weighting, unique stems, balanced answers, five-option multiple-response questions, and structured review explanations.
- CCNA is aligned to the current 200-301 v2.0 five-domain blueprint and includes a strong simulation mix.
- Splunk has exact blueprint distribution and relatively low normalized duplication.
- Network+, Google CDL, NVIDIA AIIO, and AZ-900 received recent blueprint rebalancing.
- A+ Core 1/Core 2 and Server+ are close to official weighting targets.

### Content Areas Requiring Work

#### Linux+

The recent audit found that much of the 750-question pool uses repetitive single-choice framing and generic distractors. The CLI and configuration-repair items are useful, but the bank does not yet meet the strongest editorial standard of the product.

#### Schneider DCCA

The bank covers the expected vendor learning areas, but normalized duplicate analysis found heavy stem repetition. Many questions differ mainly by ticket or case identifiers. Distractors can be too obvious.

#### Splunk

Blueprint fit is strong. The remaining work is natural-language cleanup and stronger why-right/why-wrong explanations.

#### Real Estate

The national and state banks require a unified re-audit with pinned source versions and review dates. Internal audit notes are not fully consistent about which modules are considered complete.

### Recommended Editorial Rule

Do not add another 600-750 question bank until:

1. Linux+ receives a scenario and distractor rewrite.
2. DCCA normalized repetition is materially reduced.
3. Splunk synthetic ticket phrasing is removed.
4. Real Estate source status is reconciled.
5. Automated checks reject synthetic markers, normalized duplicate clusters, and repeated generic distractors.

## Key Risks

### 1. Dependency Security - Immediate

`npm audit --omit=dev` currently reports two high-severity production dependency findings affecting the installed React Router chain. Fixes are available.

The application is a client-rendered SPA, so some server-specific exploit paths may not apply directly. That does not justify carrying known vulnerable versions. React Router should be upgraded and the full test/build/browser suite rerun before the next production release.

### 2. Trust and Content Provenance - High

The site makes strong accuracy and exam-alignment claims, but there is no backend-supported system for:

- Reporting a questionable item.
- Recording the source used for a question or domain.
- Showing when a blueprint was last verified.
- Tracking editorial status.
- Recording corrections.
- Identifying the reviewer.

This is the most important platform gap because the catalog is now too large to manage through memory and ad hoc documents.

### 3. Editorial Consistency - High

Some live banks are technically valid but visibly generated. If learners encounter repeated stems or implausible distractors, the trust cost affects the entire brand, including stronger banks.

### 4. Documentation and Metadata Drift - High

Examples found during this review:

- `index.html` still advertises approximately 5,800 questions, while the IT catalog alone has 11,678.
- Static social descriptions omit many current providers and offerings.
- README and Docs test counts have lagged the current 908-test suite.
- The roadmap references a future `freecertprep.org` custom domain while canonical metadata uses `freecertprep.com`.
- Some Real Estate audit language conflicts with current registry configuration or later audits.

This should be solved with generated stats and a single operational source of truth rather than recurring manual edits.

### 5. Privacy Claim Precision - High

The product repeatedly says that no data leaves the device. Study progress does remain local, but the homepage makes a request to `counterapi.dev`, and Google Fonts are loaded from Google.

The claim should be narrowed to: "Your study progress and answers are stored locally and are not sent to freecertprep servers." A privacy page should disclose third-party network requests.

### 6. No Product Analytics - High

The visitor counter does not answer:

- Which certifications attract users.
- Whether users begin a quiz or exam.
- Completion rates.
- Return frequency.
- Weak points in the funnel.
- Whether path pages improve selection.
- Whether learners find explanations useful.

Without these signals, prioritization is based mainly on intuition.

### 7. SPA SEO Limitations - Medium/High

Route metadata is updated client-side. Static HTML still contains stale generic metadata, and many social crawlers do not execute the application before generating previews.

The catalog would benefit from prerendered route metadata, a sitemap, robots configuration, and refreshed static Open Graph content.

### 8. Legal and Brand Readiness - Medium/High

The repository calls itself open source but contains no visible `LICENSE` file. The product also lacks a visible privacy policy, terms, educational disclaimer, and certification-provider trademark/non-affiliation notice.

These are important before meaningful traffic, sponsorship, donations, or partnerships.

### 9. No Production Error Monitoring - Medium

Errors are logged to the browser console. There is no aggregated production error reporting, release monitoring, or uptime view.

### 10. Branch and Release Hygiene - Medium

Many historical feature branches remain locally and remotely. The current catalog-page branch is local-only. A simple pull-request and release-note discipline would make production state clearer.

## Competitive and Strategic Position

### Differentiators

- Free, no-account access.
- Very broad entry-to-associate IT catalog.
- Career-path guidance rather than vendor-only browsing.
- Adaptive Smart Practice.
- Exam-length simulations with domain weighting.
- Advanced simulation question types for CCNA and Linux+.
- Separate Real Estate product on the same engine.
- Open repository and strong automated validation.

### Defensible Asset

The most defensible asset is the combination of:

1. A reusable exam engine.
2. A structured content schema.
3. Automated content gates.
4. Career-path merchandising.
5. A growing source-aligned content library.

Question count alone is not defensible. Trust, correction speed, explanation quality, and learning outcomes are.

### Current Positioning

freecertprep should position itself as:

> A free, transparent practice platform for career-opening certification exams, with exam-shaped simulations, adaptive review, and visible content-quality standards.

This is stronger than positioning it as merely a free question bank.

## Monetization Options

There is no immediate need to monetize before usage and retention are understood. Static hosting keeps the current operating model inexpensive.

Recommended order:

1. Donations and voluntary support.
   - Lowest trust risk.
   - Fits the free-access mission.
   - Add only after a clear cost/transparency page exists.

2. Carefully disclosed affiliate links.
   - Official exam vouchers, books, or approved training.
   - Must not influence question recommendations or provider coverage.

3. Sponsorships.
   - Employer, workforce-development, community-college, or training-provider sponsorship.
   - Sponsors support access but do not control editorial content.

4. Optional paid account features.
   - Cross-device sync, advanced history, study reminders, team/classroom dashboards.
   - Core questions, explanations, and simulators remain free.

5. Institutional licenses.
   - Libraries, workforce programs, schools, and nonprofit career programs.
   - Later-stage option after accounts and reporting exist.

Not recommended:

- Paywalling core practice.
- Selling user study data.
- Intrusive advertising inside quizzes.
- Charging by certification before quality and trust are consistent.

## Future Ideas Review

### User Accounts and Supabase

Strategic value: High  
Complexity: Medium  
Recommendation: Proceed after the trust/data model is defined.

The storage hooks are already designed around a future adapter. Accounts would enable cross-device progress, retention measurement, issue reporting, moderation, and institutional features.

### Trust Layer

Strategic value: Critical  
Complexity: Medium/High  
Recommendation: Make this the next major platform milestone.

Minimum viable trust layer:

- Per-question "report an issue."
- Source URL and blueprint version by certification/domain.
- Review status and last-reviewed date.
- Internal moderation queue.
- Correction notes and change history.

### PWA and Offline Mode

Strategic value: Medium/High  
Complexity: Medium  
Recommendation: Build after source/version handling is defined, because offline question-bank caching complicates content updates and corrections.

### Streaks and Reminders

Strategic value: Medium  
Complexity: Low/Medium  
Recommendation: Test only after analytics can determine whether retention is the real constraint.

### Shared Result Cards

Strategic value: Medium  
Complexity: Low  
Recommendation: Good acquisition experiment after brand/legal polish.

### CDL Sister Site

Strategic value: Medium/High  
Architecture fit: Strong  
Content/governance burden: High  
Recommendation: Best next sister-site candidate, but only after the quality gates above.

The federal-plus-state manual structure resembles the Real Estate architecture and can reuse the exam engine.

### NCLEX Sister Site

Strategic value: Potentially high  
Architecture fit: Weak today  
Clinical and legal risk: Very high  
Recommendation: Defer.

NCLEX requires clinical-judgment cases, partial-credit scoring, matrix/grid, cloze, highlighting, drag/drop, chart/lab evidence, and substantially stronger expert review. It should not be approached as another multiple-choice content expansion.

## Recommended Roadmap

### Phase 0: Release Safety - Next 7 Days

1. Upgrade React Router dependencies and verify the full suite.
2. Decide whether to push and merge `codex/catalog-page-clean-home`.
3. Refresh static metadata, catalog counts, provider list, and canonical-domain roadmap language.
4. Add a real open-source license.
5. Add privacy, terms, non-affiliation, and educational-use disclaimers.
6. Remove or connect the non-persistent Real Estate notify form.

### Phase 1: Trust and Editorial Quality - Next 30 Days

1. Build a source registry with blueprint version, source URL, review date, and reviewer status for every certification.
2. Add automated synthetic-language and normalized-duplication gates.
3. Rewrite Linux+ single-choice clusters.
4. Rewrite DCCA repeated scenario clusters.
5. Clean Splunk ticket phrasing and expand distractor explanations.
6. Reconcile and republish Real Estate source audits.
7. Add a basic issue-reporting endpoint and moderation view.

### Phase 2: Measurement and Reliability - 30 to 60 Days

1. Add privacy-respecting analytics for page view, cert selection, quiz start, quiz completion, exam start, and exam completion.
2. Add production error monitoring.
3. Add sitemap and prerendered metadata.
4. Complete accessibility phase 2.
5. Add automated mobile browser smoke tests for homepage, catalog, paths, quiz, exam, and advanced simulations.

### Phase 3: User Continuity - 60 to 120 Days

1. Add optional accounts and cross-device sync.
2. Migrate local progress only with explicit user consent.
3. Add study reminders and streaks as optional features.
4. Add correction notifications for bookmarked or previously answered questions.
5. Pilot classroom/workforce-program reporting.

### Phase 4: Controlled Expansion - After Gates Are Met

Expansion gate:

- No unresolved high-severity dependency findings.
- Every live bank has a current source record.
- Linux+ and DCCA editorial rewrites complete.
- Issue reporting and correction workflow operational.
- Product analytics show meaningful use of current offerings.
- A named reviewer or review process exists for new content.

Then choose one:

- Expand Real Estate state coverage.
- Launch CDL as a new sister site.
- Add a smaller, source-rich IT specialty certification.

Do not begin NCLEX at this stage.

## Proposed Board Metrics

The board should receive a monthly dashboard covering:

### Reach

- Unique visitors.
- Organic search sessions.
- Catalog and career-path entry rates.
- Top certifications by visits.

### Engagement

- Quiz starts and completion rate.
- Exam starts and completion rate.
- Return users at 7 and 30 days.
- Average questions answered per active learner.
- Smart Practice repeat usage.

### Learning Signal

- Accuracy improvement over repeated sessions.
- Domain readiness improvement.
- Explanation-open/review behavior.
- Exam score trend by attempt.

### Content Health

- Percentage of live banks with current official source verification.
- Open question reports.
- Median report resolution time.
- Questions changed after reports.
- Normalized duplicate rate by bank.
- Editorial review completion by bank.

### Reliability

- Build and deployment success.
- Client error rate.
- Question-asset load failures.
- Performance by device class.
- Accessibility test status.

### Sustainability

- Hosting and backend cost.
- Donations or sponsorship revenue.
- Cost per active learner.
- Reviewer/editorial hours by certification.

## Decisions Requested From the Board

1. Approve a temporary pause on new 600-750 question banks.
2. Approve trust and editorial quality as the next primary milestone.
3. Approve optional accounts only after the data/privacy model is documented.
4. Approve the dedicated `/catalog` direction, subject to mobile review.
5. Approve a free-core monetization principle.
6. Select the official canonical domain and align all metadata.
7. Decide whether the project remains founder-reviewed or begins recruiting subject-matter reviewers.
8. Require expansion gates before CDL, additional states, or other sister sites.

## Final Assessment

freecertprep is at a strong product inflection point. The project has already demonstrated:

- Fast execution.
- A reusable platform.
- Large-scale content operations.
- Technical resilience.
- A credible free-access mission.

The next version of the company should be built around credibility rather than volume.

If the project invests in source transparency, editorial discipline, security maintenance, measurable user outcomes, and a lightweight backend trust layer, it can become a durable public learning platform rather than a large collection of practice questions.

The board should view the current catalog as sufficient for the next stage. The highest-return work is now to make the existing product demonstrably trustworthy, measurable, maintainable, and easy to recommend.

## Evidence Reviewed

- `README.md`
- `src/data/certs.js`
- `src/pages/Home.jsx`
- `src/pages/Catalog.jsx`
- `src/pages/CareerPath.jsx`
- `src/pages/Docs.jsx`
- `src/pages/RealEstate.jsx`
- `src/pages/realestate/reCerts.js`
- `src/hooks/useQuestionStats.js`
- `src/utils/storage.js`
- `src/utils/exam-selection.js`
- `.github/workflows/ci.yml`
- `docs/ccna-simulation-architecture.md`
- `docs/dcca-content-architecture.md`
- `scripts/audits/catalog-question-quality-audit.md`
- `scripts/audits/recent-cert-quality-audit.md`
- `scripts/audits/ccna-prod-readiness-audit.md`
- `scripts/audits/saa-c03-content-architecture.md`
- Git history and branch state
- Latest local lint, test, build, browser, content-count, and dependency-audit outputs
