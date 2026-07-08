# Production Activation Checklist

Updated: July 8, 2026

This is the short owner checklist for turning the repository-complete backend MVP into a fully validated public service. The root FreeCertPrep IT app remains the primary production surface; Practice107 is now a separate workspace app with its own activation checks.

## 1. Supabase Administrator

- Run `supabase/migrations/20260624000100_admin_report_queue.sql`.
- Sign in once with the intended administrator email.
- Insert that user into `public.admin_users` using `docs/admin-report-review-runbook.md`.
- Open `/admin/reports` and confirm the queue loads.
- Confirm a normal signed-in account cannot access the queue.

## 2. Privacy Controls

- Run `supabase/migrations/20260624000200_account_privacy_controls.sql`.
- Create a disposable learner account.
- Add a little progress, sync it, and submit one question report.
- Download the complete account export.
- Delete the disposable account and confirm sign-in no longer succeeds for that account.

## 3. Security Hardening

- Run `supabase/migrations/20260626000100_security_hardening_constraints.sql`.
- Confirm an ordinary signed-in account can still sync, back up progress, and submit a question report.
- Confirm the live deployment serves the headers from `public/_headers`, especially `Content-Security-Policy`, `X-Frame-Options`, and `X-Content-Type-Options`.
- Confirm no service-role key, SMTP credential, private token, or admin password exists in Cloudflare public build variables.

## 4. Domain and Authentication

- Connect the final domain to the Cloudflare Worker.
- Confirm HTTPS and direct-route refreshes such as `/account`, `/support`, and `/comptia-net-plus`.
- Set the production domain as the Supabase Site URL.
- Add the production `/account` URL to the Supabase redirect allowlist.
- Request and complete a magic-link sign-in from the production domain.

## 5. Product Email

- Follow `docs/domain-email-setup-runbook.md`.
- Verify `support@`, `admin@`, and `no-reply@` behavior.
- Set `VITE_SUPPORT_EMAIL` in the Cloudflare production build.
- Redeploy and confirm `/support` shows the email action.

## 6. Two-Device Sync

- Follow `docs/account-sync-runbook.md`.
- Confirm independent sessions combine without duplication.
- Confirm question statistics do not increase on an unchanged repeated sync.
- Confirm the newest bookmark add/remove state wins.
- Confirm recovery backup and restore remain available.

## 7. Final Acceptance

- Run the live site as a signed-out learner.
- Run it as a signed-in learner.
- Run it on a narrow mobile viewport.
- Run the administrator report workflow.
- Confirm privacy, support, account export, account deletion, and question reporting.
- Record any production-only defects before inviting broader use.

## 8. Practice107 Sister Site

- Confirm `npm run test:practice107` and `npm run build:practice107` pass locally.
- Confirm `apps/practice107/wrangler.jsonc` points at the intended Cloudflare Worker name and production route.
- Connect the final Practice107 domain when selected.
- Confirm HTTPS and direct-route refresh behavior for the single-page app.
- Confirm the 360-question certified UAG pool is the only learner-facing Part 107 pool.
- Confirm all six 60-question forms preserve the 29/12/3/1/15 domain allocation.
- Confirm FAA figure assets render from `/part107/stimuli/`.
- Decide and document payment/entitlement behavior before advertising paid full-exam access.
- Confirm product copy avoids FAA, PSI, Udemy, or instructor affiliation claims.

The root product is ready for broader public testing when the first seven sections pass. Practice107 is ready for its own public launch only after section 8 passes. New IT catalog work remains paused until then.
