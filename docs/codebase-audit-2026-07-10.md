# Codebase Audit - July 10, 2026

## Scope

This audit covered the root FreeCertPrep app, the Practice107 workspace, recent A+/homepage/dashboard changes, account and local-data controls, Cloudflare configuration, Supabase client boundaries, CI, documentation, automated certification gates, and rendered desktop/mobile learner journeys.

## Release Baseline

- Root Vitest: 1,352 tests across 58 files.
- Practice107 Vitest: 13 tests across 2 files.
- Browser smoke: 29 passing scenarios and 3 intentional project skips across desktop and mobile.
- Root and Practice107 production builds: passing.
- Production dependency audit: zero known vulnerabilities.
- A+, Network+, Security+, Terraform, CompTIA objectives, CLF-C02, SAA-C03, Splunk, CCST, distractor ambiguity, and AWS freshness gates: passing.
- Nine live certification dashboards: no console errors or horizontal overflow in the browser sweep.

## Findings Remediated

### 1. Theme initialization disagreed with the visual shell

The HTML shell was dark while the React toggle treated day mode as the first-visit default. This could flash between palettes and made the intended default ambiguous. Night mode is now the first-visit default, saved day mode remains respected, and a same-origin bootstrap applies the preference before React paints without weakening the Content Security Policy.

### 2. Google Fonts conflicted with privacy and production policy

The recent visual refresh reintroduced Google Fonts links even though the product states that it uses the local system stack. The production Content Security Policy also does not allow those remote font/style origins. The external requests were removed and the typography tokens now use local system fonts.

### 3. Dashboard simplification orphaned progress import and reset

Removing the large dashboard data-controls panel also removed the learner's only IT-app import/reset surface, while browser tests and documentation still promised it. Export, validated JSON import, and confirmed local study-data clearing now live together on `/account`. Exam dashboards stay focused.

### 4. Browser smoke had stale and brittle assertions

One browser test still targeted the removed dashboard panel, the theme test erased its own saved preference before checking it, and the homepage anchor test required an unnecessarily exact pixel offset. The tests now assert the real learner outcomes and pass on desktop/mobile.

### 5. Practice107 could crash when browser storage was blocked

The new sister app guarded reads in some places but left flag and JSON writes unguarded. Shared fail-soft storage helpers now protect account flags, entitlement flags, progress, and question statistics. Tests cover both normal and blocked storage.

### 6. Practice107 promised a timed exam without a timer

The content architecture and learner copy promised a two-hour UAG simulation, but the session stored a zero start time and rendered no countdown. Full exams now begin with a real timestamp, display a two-hour countdown, and submit when time expires.

### 7. CI and production used different Node declarations

Cloudflare and `.node-version` pin Node 22.13.0, while GitHub Actions separately requested Node 20. CI now reads `.node-version`, keeping local, CI, and Cloudflare build assumptions aligned.

### 8. Documentation had drifted behind the UI and backend

The in-app Docs still referred to future accounts, dashboard data controls, dashboard trust panels, and old test counts. README, roadmap, release checklists, and in-app Docs now describe the current account layer, Account-page data controls, simplified dashboards, dark-mode default, Practice107 state, and verified counts.

## Residual Risks

1. Production operator validation is still required for the Supabase migrations, administrator promotion, two-device sync, live response headers, final domain redirects, and product email.
2. Practice107 authentication, payment processing, and server-verified entitlement are not implemented. Its current sign-in/unlock state is a local product prototype and must not be treated as a production payment boundary.
3. Practice107 is a large single-page module. Split it only when account/payment integration begins, with behavior tests protecting the existing learner flow.
4. `QuestionCard.jsx`, `Docs.jsx`, and `certs.js` remain large. Their size is maintainability debt, not a current release blocker.
5. Completed-result refresh recovery and interrupted active-session recovery remain separate product decisions for the root app.
6. This was an internal engineering and browser audit, not an external penetration test or third-party accessibility certification.

## Ordered Roadmap

1. Complete the owner-run production activation checklist against the live domain.
2. Validate root-app account sync, reporting, privacy export/deletion, and admin review with disposable real accounts.
3. Decide and implement the real Practice107 auth, payment, and entitlement boundary before public monetization.
4. Add completed-result refresh recovery; decide active-session resume only after that behavior is stable.
5. Continue targeted human sampling and one-for-one remediation in current live banks; keep catalog expansion frozen.
6. Split high-change oversized modules only alongside focused regression coverage.

## Decision

The root app is repository-ready for controlled public-beta validation. The remaining root risks are primarily operational. Practice107 has a strong certified content and simulation foundation, but its account/payment surface remains prototype-only until a real server-side entitlement path is built.
