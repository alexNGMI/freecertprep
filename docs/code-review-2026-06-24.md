# Full Code Review

Date: June 24, 2026

## Scope

This review covered the recent learner-experience, account, synchronization,
privacy, administrator, content-quality, storage, testing, deployment, and
documentation changes. It included static review, focused regression tests,
the complete Vitest suite, cert-specific content gates, production build,
dependency audit, and browser smoke suite.

## Findings And Fixes

### P1: Cross-account sync baseline

The browser stored one shared synchronization baseline. If two people used
different accounts in the same browser profile, the second account could see
the first account's last-sync summary and use the wrong three-way merge base.

Fixed:

- every sync baseline now carries the Supabase user ID;
- baselines are ignored unless they belong to the current account;
- restore and successful sync both write account-scoped state;
- regression coverage proves another user's baseline is ignored.

### P1: Supabase migration order and function hardening

The two pending June 24 migrations used the same version prefix, while the
privacy migration depends on the administrator table. The activation
checklist also named a nonexistent `public.app_admins` table.

Fixed:

- migrations now use unique ordered timestamps:
  `20260624000100_admin_report_queue.sql` then
  `20260624000200_account_privacy_controls.sql`;
- the privacy migration declares its dependency;
- security-definer functions use an empty `search_path` and fully qualified
  relations;
- migration tests enforce unique versions and the hardened search path;
- every activation/runbook reference now uses `public.admin_users`.

This follows Supabase guidance on
[ordered unique migration timestamps](https://supabase.com/docs/guides/deployment/branching/troubleshooting)
and
[security-definer search paths](https://supabase.com/docs/guides/database/functions).

### P1: Local data durability

Quiz and exam history could grow without limit until browser storage failed.
The storage helper returned failure safely, but the learner received no
warning.

Fixed:

- each certification retains the latest 50 practice-family sessions and 20
  exam sessions;
- the newest diagnostic baseline is preserved even when it falls outside the
  recent practice window;
- cloud/local merge applies the same retention policy;
- existing oversized histories compact when loaded;
- rejected browser writes raise a visible, dismissible alert with an account
  and export-tools link.

### P1: CCST editorial regression

The newest CCST leakage cleanup passed its gate but introduced malformed
single-choice stems, over-generic prompts, and unrelated troubleshooting
evidence such as DNS output on a reachability-tool question.

Fixed:

- rewrote 233 generic single-choice stems with domain-specific prompts;
- rebuilt 68 diagnosing single-choice scenarios with answer-aligned evidence;
- replaced unrelated single-choice artifacts with evidence that supports the
  actual stem;
- added gates for malformed phrases, catch-all prompts, and unsupported
  single-choice evidence;
- protected the old scaffold generator from silently replacing the curated
  production bank.

The bank remains at 750 questions with unchanged domain and interaction-type
allocation. CCST remains graded B+ because repeated content families still
need one-for-one editorial diversification.

### P2: Accessibility and interaction correctness

The full answer explanation was inside a polite live region, which could cause
screen readers to announce a long block automatically. The report dialog also
allowed rapid duplicate submissions.

Fixed:

- answer submission now announces only `Correct answer` or `Incorrect answer`;
- the full visual explanation remains available without forced announcement;
- question-report submission has a pending state and rejects duplicate clicks;
- administrator review now returns a controlled service-unavailable error
  instead of risking a null-client exception.

## Verified Strengths

- nine live modules remain intentionally separated from eight Coming Soon
  modules;
- certification banks are still lazy-loaded;
- anonymous study remains fully usable;
- account, sync, backup, reporting, admin, privacy, and support surfaces are
  separated cleanly;
- CI runs the same `verify:quality` gate used locally and follows it with
  Playwright browser smoke;
- content gates protect all nine live modules, including form allocation and
  evidence/explanation requirements.

## Remaining Work

1. Apply and validate the two pending production Supabase migrations.
2. Complete the custom domain, support email, and production redirect setup.
3. Run the real two-device sync walkthrough with the account-scoped baseline.
4. Persist the latest completed results page so refresh recovery does not
   depend on router state.
5. Decide whether active quiz, drill, diagnostic, and exam resume is required
   before wider public testing.
6. Continue narrow maintainability work on `Docs.jsx`, `certs.js`,
   `QuestionCard.jsx`, and repeated navigation/path metadata.

Catalog expansion remains frozen. The next release target is operational
activation and first-user reliability, not another certification.

## Verification

- `npm run verify:quality`: passed;
- Vitest: 1,345 tests across 56 files passed;
- production dependency audit: zero vulnerabilities;
- production build: passed;
- all live-cert content gates: passed;
- Playwright: 27 passed and 3 intentionally skipped across desktop and mobile.
