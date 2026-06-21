# Backend MVP Execution Plan

Date: June 17, 2026
Branch: `codex/backend-accounts-planning`

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
| Vercel | Free Hobby | Pro at $20/month | Good default for GitHub-connected hosting, previews, CDN, and custom domain. |
| Supabase | Free | Pro at $25/month | Good default for auth, Postgres, row-level security, and progress/report persistence. |

Practical expectation:

- Prototype: $0/month if using Vercel Hobby + Supabase Free.
- Serious public beta: about $45/month baseline with Vercel Pro + Supabase Pro.
- Early real usage: likely $45-$100/month unless traffic, storage, email, or usage overages grow.

Official references:

- Supabase pricing: https://supabase.com/pricing
- Supabase billing docs: https://supabase.com/docs/guides/platform/billing-on-supabase
- Vercel pricing: https://vercel.com/pricing
- Vercel pricing docs: https://vercel.com/docs/pricing

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

## Step 1: Live Domain and Vercel Hosting

Goal: make the app publicly reachable from a real domain.

Tasks:

- choose or confirm the domain;
- create/import the Vercel project from GitHub;
- set build command: `npm run build`;
- set output directory: `dist`;
- connect the custom domain;
- verify HTTPS;
- confirm production deployment from `main`;
- run `npm run verify:quality` and `npm run smoke:browser` before each release.

Done when:

- the live domain loads the app;
- Vercel deploys from GitHub;
- the live app routes work on refresh;
- there is a rollback path through Vercel deployments.

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

- create staging Supabase project;
- apply the initial SQL migration;
- add `.env.example`;
- add Vercel environment variables later;
- install `@supabase/supabase-js`;
- add `src/lib/supabase.js`;
- add `AuthProvider`;
- add sign-in/sign-out UI;
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
- on login, offer "Back up this device";
- merge local and remote progress by cert/question/session timestamp;
- show last sync status on dashboard;
- add manual "sync now" before automatic sync;
- add conflict tests.

Done when:

- progress on device A appears on device B after login;
- bookmarks sync;
- session history syncs without duplicating;
- local progress is not wiped by signing in;
- app still works offline/local when signed out.

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

- add "Report issue" action to question review/results surfaces;
- require signed-in user for durable reports, or allow anonymous report-to-email later;
- store report in Supabase;
- include cert id, question id, category, message, and route/context;
- show "Thanks, report received" confirmation;
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

## System Order

Do not build all six at once.

Build order:

1. Vercel live domain.
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

## Immediate Next Action

Step 1 should be handled first:

Confirm the domain and deploy the current app to Vercel.

Do not build progress sync until:

- the live deployment works;
- domain email works;
- Supabase auth works in staging;
- local data durability is safe enough to merge into cloud sync.
