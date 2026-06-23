# Human-Centered Codebase Audit

Date: June 23, 2026

## Purpose

This audit redesigns the earlier content-first review into a human-like product and codebase audit. Automated gates answer whether the app builds, tests, and satisfies known structural rules. This review asks a different question:

Would a real learner, maintainer, skeptical reviewer, and future operator trust this product after using and reading it?

The answer is mostly yes. The app is no longer in the fragile prototype stage. The main remaining risks are not basic correctness; they are durability, scope clarity, repo organization, and continuing to protect content realism as the product grows.

## Human Audit Rubric

The audit uses seven lenses.

1. **First-user clarity** - Can a new learner understand where to start without being overwhelmed?
2. **Learner value** - Does the product help a motivated learner diagnose gaps, practice, repair, and judge readiness?
3. **Exam realism** - Does the content feel close enough to the exam format without pretending to clone confidential vendor delivery?
4. **Trust and honesty** - Are readiness claims, source claims, affiliate/provider claims, and coming-soon claims honest?
5. **Resilience** - Does local progress, quiz/exam flow, import/export, and dynamic loading fail softly?
6. **Maintainability** - Can future content and UI work happen without the codebase becoming confusing or fragile?
7. **Release confidence** - Would a push to GitHub and Cloudflare be reasonably safe?

## Evidence Run

Commands run:

```bash
npm run verify:quality
npm run smoke:browser
```

Results:

- `npm run verify:quality` passed.
- 38 test files passed.
- 1,285 tests passed.
- Production build passed.
- `npm audit --omit=dev` found 0 vulnerabilities.
- A+, Network+, Security+, Terraform, CompTIA objective, CLF-C02, SAA-C03, Splunk, CCST, distractor ambiguity, and AWS freshness gates passed.
- Browser smoke passed on desktop and mobile: home, catalog, docs, Network+ dashboard, CLF-C02 practice, CLF-C02 exam submit, and results route.

Repo shape:

- 320 tracked files.
- 24 question JSON files.
- 38 unit/integration test files.
- 1 browser smoke test file covering 6 browser runs.
- 9 live IT modules and 8 Coming Soon modules in the public catalog.
- 66 tracked audit/archive/generation support files under `scripts/audits`, `scripts/archive`, or root scenario-batch scripts.

## Executive Read

The product is in a strong consolidation state. The homepage is focused, the catalog is honest, the live modules are protected by meaningful gates, and the learning loop is now the product's biggest advantage. The strongest current experience is:

1. choose a career direction;
2. take a diagnostic;
3. use the mastery map and study plan;
4. practice targeted blocks;
5. simulate the exam;
6. review the debrief and misses.

The codebase is also much healthier than the amount of authored content might suggest. Question banks are lazy-loaded, core study logic is centralized, browser storage is wrapped, and CI now runs the full quality gate plus Playwright smoke.

The biggest remaining gap is durability. A real first user can study locally today, but if this is becoming a live hosted product with sign-in and report-incorrect-info workflows, progress sync and issue reporting are now the logical next platform layer.

## Grades

| Area | Grade | Why |
| --- | --- | --- |
| First-user clarity | A- | Homepage now explains A+ foundation, Networking, Cybersecurity, and Cloud without catalog clutter. |
| Learner value | A- | Diagnostic, mastery map, study plan, debrief, Smart Practice, and cases create a real learning loop. |
| Live content quality | A- | Gates are strong; manual realism still matters, especially Security+ practical depth and SAA template variety. |
| Trust posture | B+ | Readiness language is honest; README/docs still blur "authored" vs "ready" in places. |
| Local resilience | B | Storage is centralized and guarded, but progress is still local-only and write failures are silent to the user. |
| Maintainability | B | Core architecture is good; repo root has legacy generation clutter and docs overlap heavily. |
| Release confidence | A- | CI runs `verify:quality` and browser smoke; smoke should expand across more live certs and flows. |

## Findings

### P1 - Local Progress Is Still The Main Product Risk

The app now handles corrupt storage and unavailable storage safely, and import/export exists. That is good. But from a human product perspective, local-only progress is still fragile:

- browser storage can be cleared;
- storage quota failures return `false` but do not surface a persistent user-facing warning;
- exam/quiz history can grow without an obvious retention cap;
- a hosted product with real learners should not rely only on one browser profile.

Relevant files:

- `src/utils/storage.js`
- `src/hooks/useProgress.js`
- `src/hooks/useQuestionStats.js`
- `docs/backend-accounts-architecture-2026-06-17.md`

Recommendation:

Build the backend MVP that saves progress and accepts report-incorrect-info submissions. Keep the product local-first, but make account sync available for serious users.

### P1 - The Live Product Is Strong Enough; Expansion Should Stay Frozen

The live catalog has enough breadth:

- A+ Core 1
- A+ Core 2
- Network+
- CCST Networking
- Security+
- CLF-C02
- SAA-C03
- Splunk Core User
- Terraform Associate

Adding more certs now would reduce quality focus. The next value comes from improving the active learner loop and durability, not growing the catalog.

Recommendation:

Do not promote AZ-900, Google CDL, Linux+, Server+, DCCA, NVIDIA, CCNA, or Real Estate until each has a current source audit, cert-specific quality gate, and human readiness review.

### P2 - README Scope Still Reads Broader Than The Product

The README starts with a "Supported certifications" table containing all authored modules, including Coming Soon and hidden/prototype material. It later explains live vs Coming Soon, but the first impression still risks implying everything is equally supported.

There is also a small visible artifact:

- `README.md`: `Texas ? live.`

Recommendation:

Change the README section title from "Supported certifications" to "Authored certification banks", then split the table into Live, Coming Soon, and Sister-site/Prototype. Fix the Texas bullet while doing that.

### P2 - Browser Smoke Is Good But Too Narrow

Current Playwright smoke proves:

- home renders;
- catalog renders;
- docs render;
- Network+ dashboard renders;
- CLF-C02 practice can start and answer;
- CLF-C02 exam can submit and show results.

That is a useful safety net, but it does not yet exercise:

- A+ PBQ-lite;
- Network+ CLI/topology/config/subnetting interactions;
- Security+ practical interactions;
- Splunk evidence rendering;
- Terraform true/false and HCL evidence;
- import/export progress;
- mobile path pages;
- the docs sidebar scroll-spy behavior;
- real-estate routes, if preserved.

Recommendation:

Add one browser smoke per interaction family rather than per cert. That gives broad confidence without making CI painfully slow.

### P2 - Repo Root Has Legacy Generation Clutter

There are 18 `add-scenario-batch*.cjs` files in the repository root. They are not part of the live app path and make the codebase look less polished than it is.

Recommendation:

Move root generation batches into `scripts/archive/legacy-scenarios/` or remove them if the generated content is already captured in JSON and history.

### P2 - Docs Are Valuable But Overlapping

The documentation is rich, but there are many overlapping state reports:

- board report;
- current state;
- codebase review;
- offering audit;
- course companion audit;
- full content audit;
- simulation readiness order;
- backend architecture;
- cert-specific audit docs.

This is useful history, but it makes "what is true now?" harder to answer.

Recommendation:

Keep `docs/current-state-and-next-steps-2026-06-13.md` as the current truth, and add a short "Superseded by current-state" note to older planning docs over time.

### P2 - SAA Template Pressure Is Measured But Still Present

The SAA-C03 gate tracks 160 repeated architecture-template groups under a ceiling of 175. That is acceptable and protected, but a human reader can still feel the pattern in a longer study session.

Recommendation:

When content work resumes, rewrite SAA in small passes: 25 to 50 questions at a time, preserving domain allocation and explanation structure.

### P2 - Network+ And Security+ Are Strong But Uneven In Different Ways

Network+ is the most realistic practical simulation. Its risk is objective thinness in a few smaller objectives and explanations that are accurate but less structured than the newest banks.

Security+ has strong objective coverage and form composition. Its risk is practical density: it has fewer evidence-led interactions than Network+.

Recommendation:

Do not rewrite both wholesale. Add targeted human passes:

- Network+: improve explanation coaching for thin objectives and high-miss scenarios.
- Security+: add more log, IAM/policy, firewall, alert, and incident evidence items.

### P3 - Vite Chunk Output Is Expected, Not A User-Facing Bug

The build produces large lazy-loaded JSON assets because the product contains many large question banks. This is not the same as a bloated initial JavaScript bundle. The main app chunks are reasonable, and question banks load on demand.

Recommendation:

Do not chase this warning unless users report slow cert-load times. If needed later, split the largest banks into domain-level chunks.

### P3 - Real Estate Remains Product-Confusing If Surfaced Too Early

Real Estate is hidden from the main homepage/catalog and linked through docs only. That is the right call. The code still exists and works as a sister-site prototype, but it belongs outside the current IT product story until source quality and positioning are reworked.

Recommendation:

Keep it out of the main product until it has its own current-state report and quality gates.

## What The Audit Did Not Find

- No broken build.
- No failing tests.
- No dependency audit issues.
- No live cert registry mismatch.
- No current live/coming-soon catalog overlap.
- No visible GitHub link problem in the main navigation.
- No stale AWS OpsWorks or Cloud9 references in the live AWS banks.
- No duplicate answer-choice failures in live banks.
- No CCST clue-to-term phrasing under the new audit pattern.
- No evidence-title regression in Splunk.

## Recommended Order Of Operations

1. **Backend MVP for real use**  
   Supabase email sign-in, progress sync, report-incorrect-info, simple admin queue.

2. **Browser smoke expansion**  
   Add interaction-family smoke tests: PBQ-lite, CLI output, topology, config repair, subnetting, Splunk evidence, Terraform evidence, import/export.

3. **README and docs truth pass**  
   Split Live vs Coming Soon vs Prototype earlier in README. Fix the Texas typo. Add superseded notes to older roadmap docs.

4. **Repo hygiene pass**  
   Move root batch scripts and old generation artifacts into a clearly named archive folder.

5. **Targeted content polish**  
   Security+ evidence depth first, Network+ explanation coaching second, SAA template diversity third.

## Bottom Line

The app is usable and credible now. The next serious work should make it durable for a real hosted learner: accounts, sync, issue reporting, and admin review. After that, the best quality gain is not a bigger catalog; it is tighter evidence-led practice and broader browser smoke coverage for the interaction types that make freecertprep feel more useful than a static question bank.
