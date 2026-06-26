# Security Review - June 26, 2026

## Scope

This review covered the public Vite app, Cloudflare Workers Static Assets deployment configuration, Supabase client usage, account sync, signed-in question reports, admin report review, account export/deletion, local browser storage, dependency advisories, and pending database migrations.

## Summary

The codebase has a reasonable security posture for a public learning app:

- no custom password handling;
- no payment, government ID, or health-data workflow;
- no service-role key in the client code;
- no raw HTML rendering or `eval` patterns in application code;
- Supabase row-level security is the control boundary for account data and reports;
- administrator access is checked in the database, not trusted from the browser;
- dependency audit currently reports zero production vulnerabilities.

This is not the same as a formal penetration test. The remaining highest-risk work is operational: applying the migrations in production, confirming Supabase Auth settings, validating RLS with disposable accounts, and checking deployed headers on the live domain.

## Findings And Changes

### 1. Browser-writable database rows needed tighter abuse bounds

Signed-in learners could only write rows scoped to their own account, but the browser-facing tables still accepted very large identifiers or snapshots if someone bypassed the UI and called the Supabase API directly.

Added:

```text
supabase/migrations/20260626000100_security_hardening_constraints.sql
```

This adds bounded `check` constraints for profile display names, email length, study snapshot shape/size, source device IDs, cert/question identifiers, session result size, issue-report messages, and correction-event notes.

The constraints are `not valid` so they do not scan historical rows during activation, but they still protect new writes.

### 2. Static security headers were missing from the deployed app

Added:

```text
public/_headers
```

The headers include `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and a restrictive `Permissions-Policy`.

The CSP allows the app itself plus Supabase HTTPS/WebSocket connections. It intentionally keeps inline styles allowed because the current React/Tailwind UI uses style attributes for dynamic colors.

### 3. Question-report notes now have a client-side cap

The report UI now caps notes before local or cloud submission. This matches the database-side report-message bound and avoids turning normal user input into a backend error.

### 4. Account sync tolerates blocked browser storage during device-ID creation

The sync/backup device identifier now catches storage-access errors. This prevents privacy-mode or locked-down browsers from throwing before the backup request can proceed.

## Verification

Ran:

```text
npm audit --omit=dev
npm run lint
npm test -- account-sync security-hardening question-report-ui
```

Results:

- production dependency audit: 0 vulnerabilities;
- lint: passing;
- focused security tests: passing.

## Remaining Operator Checklist

These steps require service dashboards or the live deployment:

1. Apply migrations in order:
   - `20260617_initial_accounts_sync.sql`;
   - `20260624000100_admin_report_queue.sql`;
   - `20260624000200_account_privacy_controls.sql`;
   - `20260626000100_security_hardening_constraints.sql`.
2. Promote the first admin account in `public.admin_users`.
3. Confirm a normal signed-in account cannot open `/admin/reports`.
4. Submit a report as a normal signed-in account and verify the admin queue can review it.
5. Export and delete a disposable account.
6. Confirm the live deployment sends the expected security headers.
7. Confirm Supabase redirect allowlists contain only expected local and production URLs.
8. Keep service-role keys and SMTP credentials out of the Vite repo and Cloudflare public build variables.

## Residual Risk

- A public browser app necessarily exposes its publishable Supabase key. RLS and database constraints must remain the trust boundary.
- localStorage is acceptable for this product's current sensitivity level, but any future sensitive profile, payment, or institutional data should not be stored there.
- The app does not yet have production monitoring, abuse-rate limiting, or alerting beyond provider defaults.
- This pass did not include an external penetration test, authenticated traffic replay, or full live-domain header validation.
