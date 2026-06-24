# Backend MVP Execution Plan

Date: June 17, 2026
Branch: merged to `main`
Status updated: June 24, 2026

## Current Implementation Status

| Step | Status | Current reality |
| --- | --- | --- |
| 1. Cloudflare hosting | Complete | Live at `https://freecertprep.a-gilbert2093.workers.dev`; Git pushes to `main` trigger deployment. |
| 2. Domain email | Not started | Support/admin addresses still need a custom domain and mail routing/provider. |
| 3. Supabase Auth | Complete foundation | Magic-link sign-in, persistent sessions, sign-out, local and production redirect URLs, and anonymous fallback are live. |
| 4. Progress sync | Manual sync complete | `Sync now` merges session history, question-stat deltas, and timestamped bookmark changes across devices. Recovery backup/restore remains available. Automatic background sync is not claimed. |
| 5. Report incorrect info | Complete foundation | Signed-in reports persist to Supabase; every report also keeps a local fallback copy. |
| 6. Admin report queue | Implementation complete; activation pending | `/admin/reports`, explicit admin membership, RLS policies, transactional status updates, internal notes, question inspection, and correction history are built. Apply the June 24 migration and promote the first admin account in Supabase. |
| Privacy and account controls | Implementation complete; activation pending | `/privacy`, complete account export, and typed-confirmation account deletion are built. Apply the June 24 privacy-controls migration in Supabase. |

## Goal

Make freecertprep feel like a real public product without bloating the scope.

The backend MVP is exactly this:

1. Host the app on a live domain.
2. Set up domain email for support/admin.
3. Let users sign in with email.
4. Save user progress across devices.
5. Let users report incorrect or outdated question content.
6. Give the admin a simple queue to review those reports.

Nothing else belongs in this phase.

Out of scope for this backend MVP:

- job board;
- career profiles;
- resumes;
- employer matching;
- paid accounts;
- community/social features;
- complex analytics;
- marketing automation beyond basic email capture.

The future job board can be a smart direction later, especially for community colleges and workforce-development partners, but it should not shape the first backend build.

## Current Pricing Snapshot

Verified June 17, 2026 from official pricing pages.

| Service | Low-cost start | Likely first production tier | Notes |
| --- | ---: | ---: | --- |
| Cloudflare Workers Static Assets | Free static asset requests; Workers Paid starts at $5/month if dynamic Worker usage grows | $5/month Workers Paid if server-side Worker/API usage is needed | Current production target for the Vite SPA. Static assets are served from `dist/` through `wrangler.jsonc`; SPA fallback is configured in Workers, not `_redirects`. |
| Cloudflare Pages | Free | Pro at $20/month billed annually or $25/month monthly | Still a viable static-site fallback, but the repo is currently configured for Workers Static Assets. |
| Supabase | Free | Pro at $25/month | Good default for auth, Postgres, row-level security, and progress/report persistence. |

Practical expectation:

- Prototype: $0/month if using Cloudflare static hosting + Supabase Free.
- Serious public beta: about $25-$30/month baseline if Supabase Pro is needed and Cloudflare remains mostly static.
- Early real usage: likely $25-$75/month unless server-side Worker invocations, storage, email, or usage overages grow.

Official references:

- Supabase pricing: https://supabase.com/pricing
- Supabase billing docs: https://supabase.com/docs/guides/platform/billing-on-supabase
- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare Workers Static Assets billing and limits: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
- Cloudflare Workers Static Assets SPA routing: https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/
- Cloudflare Pages pricing: https://pages.cloudflare.com/

## Product Rules

1. Anonymous study still works.
   A visitor can use the app without an account.

2. Accounts are for saving progress.
   Login should mean "save and sync my work," not "unlock the app."

3. Email capture is explicit.
   A user signing in is not the same as opting into product emails.

4. Progress sync must not destroy local progress.
   First sync must merge local and cloud data safely.

5. Reports are about content trust.
   The report flow should help fix bad questions, outdated info, typos, confusing explanations, and broken UI.

6. Admin tools start simple.
   A plain report queue is enough for MVP.

## Step 1: Live Domain and Cloudflare Hosting

Goal: make the app publicly reachable from a real domain.

Tasks:

- choose or confirm the domain;
- create/import the Cloudflare Workers application from GitHub;
- set build command: `npm run build`;
- set deploy command: `npm run deploy:cloudflare`;
- use `npm run deploy:cloudflare:preview` for preview/static-assets upload checks if non-production builds need an explicit command;
- connect the custom domain;
- verify HTTPS;
- confirm production deployment from `main`;
- run `npm run verify:quality` and `npm run smoke:browser` before each release.

Done when:

- the live domain loads the app;
- Cloudflare deploys from GitHub;
- the live app routes work on refresh;
- there is a rollback path through Cloudflare deployments.

Current repo deployment architecture:

- `.node-version` pins the Cloudflare build runtime to Node `22.13.0`.
- `wrangler` is pinned as a dev dependency.
- `wrangler.jsonc` points Workers Static Assets at `./dist/`.
- `assets.not_found_handling = "single-page-application"` handles client-side React Router refreshes.
- `public/_redirects` must stay removed because Workers validates it and the old catch-all SPA rule caused an infinite redirect loop.
- Supabase is now the optional application backend for authentication, study snapshots, and question issue reports. Anonymous study remains local-first.

## Step 2: Domain Email

Goal: create real product contact addresses.

Recommended addresses:

- `support@<domain>` for user help and bad-question follow-up;
- `admin@<domain>` for platform/admin accounts;
- optional `hello@<domain>` for general contact.

Tasks:

- choose email provider;
- configure MX records;
- configure SPF, DKIM, and DMARC;
- forward support/admin mail to the real inbox initially;
- later connect support email to a simple helpdesk only if volume requires it.

Provider options:

- Google Workspace: polished, common, higher monthly cost.
- Zoho Mail: cheaper and good enough for early product email.
- Cloudflare Email Routing: good forwarding option, not a full mailbox.
- ImprovMX: simple forwarding option.

Done when:

- support/admin email can send and receive;
- DNS checks pass;
- Supabase auth emails can use an approved sender/domain when ready.

## Step 3: Supabase Auth

Goal: let users sign in with email.

Recommended first version:

- Supabase Auth magic-link email sign-in;
- no passwords at first;
- no OAuth at first unless sign-in friction becomes a problem;
- account menu in the header;
- signed-out users keep full anonymous access.

Implementation tasks:

- create Supabase project; **complete**
- apply the initial SQL migration; **complete**
- install `@supabase/supabase-js`; **complete**
- add `src/lib/supabase.js`; **complete**
- add sign-in/sign-out UI and persistent-session detection; **complete**
- create profile row on first login;
- add explicit product email opt-in.

Done when:

- user can request a magic link;
- user can sign in and sign out;
- app still works with no Supabase env vars in local development;
- app still works when signed out;
- email opt-in is stored separately from auth identity.

## Step 4: Progress Sync

Goal: logged-in users can save study progress across devices.

Data to sync:

- question stats;
- bookmarks;
- completed session summaries;
- exam/practice/drill results;
- latest completed result/debrief if needed for recovery.

Do not sync:

- full question text;
- full raw UI history forever;
- unrelated browser/device data.

Implementation tasks:

- create a storage adapter under the existing hooks;
- keep `localStorage` as the source for anonymous users;
- on login, offer "Back up progress"; **complete**
- restore the latest account snapshot; **complete**
- merge local and remote progress by cert/question/session timestamp; **complete**
- show last sync status on the Account page; **complete**
- add manual "sync now" before automatic sync; **complete**
- add conflict tests; **complete**

Done when:

- progress on device A appears on device B after login;
- bookmarks sync;
- session history syncs without duplicating;
- local progress is not wiped by signing in;
- app still works offline/local when signed out.

Current merge behavior:

- session histories are unioned and deduplicated by stable session fingerprints;
- question statistics use a three-way merge against the last common synchronized snapshot;
- bookmark additions and removals use per-question last-write timestamps;
- the merged snapshot becomes the next local baseline and is appended to `study_snapshots`;
- same-tab storage notifications refresh open study views after synchronization;
- explicit reset/deletion propagation is intentionally conservative: sync preserves study history, while full account deletion remains the cloud-data deletion control.

See `docs/account-sync-runbook.md` for verification and operating details.

## Step 5: Report Incorrect Info

Goal: make question/content trust durable.

User-facing report categories:

- wrong answer;
- outdated source;
- typo;
- unclear explanation;
- broken UI;
- other.

Implementation tasks:

- add "Report issue" action to question review/results surfaces; **complete**
- require signed-in user for durable reports while retaining a local fallback; **complete**
- store report in Supabase; **complete**
- include cert id, question id, category, and message; **complete**
- show report-submitted confirmation; **complete**
- do not expose reporter email publicly.

Done when:

- a signed-in user can submit a report from a question;
- the report appears in the admin queue;
- report creation is protected by row-level security;
- reports survive deploys and refreshes.

## Step 6: Admin Report Queue

Goal: let the site owner review and resolve reports.

MVP admin functions:

- view open reports;
- filter by cert/status/category;
- open report detail;
- mark as reviewing/fixed/rejected/duplicate;
- add internal admin note;
- record correction event.

Implementation options:

- first version can be an internal `/admin/reports` route protected by admin allowlist;
- admin role can be managed by an `admin_users` table or Supabase Auth metadata;
- no fancy dashboard needed.

Done when:

- non-admin users cannot view reports;
- admin can update report status;
- correction events are recorded;
- support workflow can say "fixed" with a durable trail.

Implementation completed June 24, 2026:

- added `public.admin_users` and an RLS-safe administrator check;
- added admin-only report and correction-event read access;
- added a transactional review function that updates status and writes history together;
- added `/admin/reports` with status/category/cert filters, current-question inspection, internal notes, and decision history;
- kept the route out of public navigation;
- documented production activation in `docs/admin-report-review-runbook.md`.

## System Order

Do not build all six at once.

Build order:

1. Cloudflare live domain.
2. Domain email.
3. Supabase Auth shell.
4. Progress sync.
5. Report issue form.
6. Admin report queue.

Each step should be independently shippable.

## Initial Data Model

MVP tables:

- `profiles`
- `email_subscriptions`
- `study_snapshots`
- `question_stats`
- `bookmarks`
- `session_results`
- `question_issue_reports`
- `question_correction_events`

Design notes:

- `auth.users` remains owned by Supabase Auth.
- app tables use `user_id uuid references auth.users(id)`;
- row-level security is enabled on user-owned tables;
- users can read/write only their own study data;
- admin report access requires a separate admin policy before launch.

## Local-First Sync Contract

The current hooks are the migration boundary:

- `useProgress`
- `useQuestionStats`
- `useBookmarks`

Target shape:

```text
Page components
  -> hooks
    -> storage adapter
      -> localStorage
      -> optional Supabase sync
```

This lets the current app remain stable while account sync is added underneath.

## Immediate Next Actions

1. Apply the June 24 admin migration and promote the first administrator account.
2. Activate and validate the June 24 admin/privacy migrations in production.
3. Set up domain support/admin email and complete a real two-device sync walkthrough.
4. Set up custom-domain support/admin email.
5. Apply and verify the account privacy-controls migration before broader promotion.
