# Production Activation Checklist

Updated: June 24, 2026

This is the short owner checklist for turning the repository-complete backend MVP into a fully validated public service.

## 1. Supabase Administrator

- Run `supabase/migrations/20260624_admin_report_queue.sql`.
- Sign in once with the intended administrator email.
- Insert that user into `public.app_admins` using `docs/admin-report-review-runbook.md`.
- Open `/admin/reports` and confirm the queue loads.
- Confirm a normal signed-in account cannot access the queue.

## 2. Privacy Controls

- Run `supabase/migrations/20260624_account_privacy_controls.sql`.
- Create a disposable learner account.
- Add a little progress, sync it, and submit one question report.
- Download the complete account export.
- Delete the disposable account and confirm sign-in no longer succeeds for that account.

## 3. Domain and Authentication

- Connect the final domain to the Cloudflare Worker.
- Confirm HTTPS and direct-route refreshes such as `/account`, `/support`, and `/comptia-net-plus`.
- Set the production domain as the Supabase Site URL.
- Add the production `/account` URL to the Supabase redirect allowlist.
- Request and complete a magic-link sign-in from the production domain.

## 4. Product Email

- Follow `docs/domain-email-setup-runbook.md`.
- Verify `support@`, `admin@`, and `no-reply@` behavior.
- Set `VITE_SUPPORT_EMAIL` in the Cloudflare production build.
- Redeploy and confirm `/support` shows the email action.

## 5. Two-Device Sync

- Follow `docs/account-sync-runbook.md`.
- Confirm independent sessions combine without duplication.
- Confirm question statistics do not increase on an unchanged repeated sync.
- Confirm the newest bookmark add/remove state wins.
- Confirm recovery backup and restore remain available.

## 6. Final Acceptance

- Run the live site as a signed-out learner.
- Run it as a signed-in learner.
- Run it on a narrow mobile viewport.
- Run the administrator report workflow.
- Confirm privacy, support, account export, account deletion, and question reporting.
- Record any production-only defects before inviting broader use.

The product is ready for broader public testing when all six sections pass. New catalog work remains paused until then.
