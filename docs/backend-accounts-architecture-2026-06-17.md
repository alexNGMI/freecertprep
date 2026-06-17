# Backend, Accounts, and Career Data Architecture

Date: June 17, 2026
Branch: `codex/backend-accounts-planning`

## Purpose

freecertprep can stay useful without accounts, but accounts become important once the product needs:

- cross-device progress sync;
- email capture for product updates and study reminders;
- durable question issue reports and correction history;
- optional user profiles for future job/career matching;
- a trust layer that proves content is maintained instead of just published.

The product should remain local-first. Anonymous users should still be able to study immediately. Accounts should add portability, recovery, and future career features, not create an account wall.

## Recommended Stack

### Frontend hosting

Primary recommendation: Vercel.

Why:

- best fit for the current Vite/React deployment model;
- GitHub-connected previews and production deploys;
- low operational burden;
- easy later path to serverless functions if needed.

AWS alternative:

- S3 + CloudFront is cheaper at scale, but adds more deployment and infrastructure work;
- Amplify is viable, but less necessary unless the project goes deeply into AWS-native auth/data.

### Backend

Primary recommendation: Supabase.

Why:

- Postgres data model is a strong fit for progress, attempts, reports, and future job profiles;
- Supabase Auth supports magic links and OAuth without building password infrastructure;
- Row Level Security maps cleanly to "users can only read/write their own study data";
- the app can keep localStorage for anonymous users and sync only when a user opts in.

## Current Pricing Snapshot

Verified June 17, 2026 from official pricing pages.

| Service | Low-cost start | Likely first production tier | Notes |
| --- | ---: | ---: | --- |
| Vercel | Free Hobby | Pro at $20/month | Pro is billed by active developer seats plus usage. Good default for public launch and previews. |
| Supabase | Free | Pro at $25/month | Pro includes 100,000 monthly active users, then usage-based overages. Good default once account sync matters. |

Practical expectation:

- Prototype: $0/month if using Vercel Hobby + Supabase Free.
- Serious public beta: about $45/month baseline with Vercel Pro + Supabase Pro.
- Early real usage: likely $45-$100/month unless traffic, storage, email, or serverless usage grows quickly.
- Job board phase: budget should be revisited because profile search, email, analytics, and moderation can change the cost shape.

Cost controls:

- keep anonymous local-first use available;
- sync compact progress summaries, not full raw UI history forever;
- avoid storing question text per attempt because question banks already live in versioned JSON;
- set spend limits and usage alerts before public launch;
- keep email sending separate from auth email until there is a real newsletter/reminder strategy.

Official references:

- Supabase pricing: https://supabase.com/pricing
- Supabase billing docs: https://supabase.com/docs/guides/platform/billing-on-supabase
- Vercel pricing: https://vercel.com/pricing
- Vercel pricing docs: https://vercel.com/docs/pricing

## Product Principles

1. No account wall.
   Anonymous study remains fully usable.

2. Optional sync.
   Login should offer "sync this device" rather than forcing a new workflow.

3. Privacy by design.
   Store only what is needed to improve study continuity, trust, and career matching.

4. User-controlled data.
   Users should be able to export, disconnect local data, and later delete cloud data.

5. Career data is separate from study data.
   Job-board profile fields should be optional and consent-driven.

6. Trust data is durable.
   Question reports and correction status should survive deployments and be reviewable.

## Phased Build Plan

### Phase 0: Architecture and Schema

Status: started on this branch.

Deliverables:

- backend architecture doc;
- initial Supabase schema draft;
- cost model;
- implementation order;
- privacy and data-retention assumptions.

### Phase 1: Auth and Email Capture

Goal: let a user create an optional account without changing the anonymous learner flow.

Recommended features:

- Supabase Auth with magic link first;
- optional OAuth later;
- `profiles` row created on first login;
- email subscription preference separate from auth identity;
- small account menu in the app header;
- no progress sync yet except a clear "coming next" message.

Done when:

- user can sign in/out;
- app still works when signed out;
- email collection has explicit opt-in;
- privacy copy is updated.

### Phase 2: Local-to-Cloud Sync

Goal: protect progress and make multi-device use possible.

Recommended features:

- upload compact local study state after login;
- download remote state on new device;
- conflict strategy: merge by cert/question/session timestamp, never blindly overwrite local progress;
- manual "sync now" button at first;
- cloud backup timestamp shown in dashboard.

Data to sync:

- question stats;
- bookmarks;
- completed session summaries;
- latest completed result/debrief;
- diagnostic/mastery state derived from attempts rather than manually stored when possible.

Do not sync:

- raw browser event history;
- full question text;
- local UI-only flags unless needed.

### Phase 3: Trust Layer Backend

Goal: make content quality defensible.

Recommended features:

- report an issue on a question;
- report categories: wrong answer, outdated source, typo, unclear explanation, broken UI, other;
- editorial queue table;
- status: open, reviewing, fixed, rejected, duplicate;
- correction events with reviewer notes;
- public-facing "last reviewed" and "known issue fixed" history later.

### Phase 4: Career Profile Foundation

Goal: prepare for a future job-board/career-matching site without turning the study app into a resume platform too early.

Recommended optional fields:

- target role;
- target cert path;
- current study stage;
- location/remote preference;
- work authorization region if needed later;
- preferred job types;
- self-reported completed certs;
- opt-in to career matching.

Do not collect yet:

- resume files;
- sensitive demographic data;
- full employment history;
- exact street address;
- employer-facing profile visibility.

### Phase 5: Job Board / Matching

Goal: connect learners to beginner-friendly roles after accounts, sync, and trust are stable.

Possible features:

- job saved searches;
- entry-level role feed;
- "prepared for" role tags based on cert path;
- employer/job-source ingestion;
- user opt-in profile visibility;
- job application tracking.

This should be a sister-site or clearly separated product surface, not cluttering the exam prep workflow.

## Initial Data Model

Core tables:

- `profiles`
- `email_subscriptions`
- `study_snapshots`
- `question_stats`
- `bookmarks`
- `session_results`
- `question_issue_reports`
- `question_correction_events`
- `career_profiles`

Design notes:

- `auth.users` remains owned by Supabase Auth.
- App tables use `user_id uuid references auth.users(id)`.
- RLS should be enabled on every user-owned table.
- Users can read/write their own study/profile data.
- Issue reports are insertable by signed-in users; editorial/admin reads are future policy work.

## Local-First Sync Contract

The existing hooks already create a good migration path:

- `useProgress`
- `useQuestionStats`
- `useBookmarks`

The backend implementation should add a storage adapter layer beneath these hooks:

```text
Page components
  -> hooks
    -> storage adapter
      -> localStorage
      -> optional Supabase sync
```

This avoids rewriting dashboards, quiz, exam, and learning-loop pages.

## Privacy and Compliance Notes

This is not HIPAA, financial, or government data, but it still needs careful handling.

Minimum policy requirements before launch:

- say what is stored locally vs in the cloud;
- explain that account sync is optional;
- explain email subscription and unsubscribe behavior;
- explain deletion/export options;
- avoid selling or sharing study data;
- keep career/job matching opt-in separate from basic accounts.

## First Implementation Order

1. Keep this branch as planning/schema branch.
2. Create Supabase project manually when ready.
3. Apply the initial SQL migration in a staging Supabase project.
4. Add env variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Add Supabase client wrapper.
6. Add auth provider/context.
7. Add sign-in/sign-out UI.
8. Add email subscription opt-in.
9. Add local-to-cloud sync adapter.
10. Add trust report persistence.

## Decision

Proceed with backend planning now, but keep the first build small:

Auth + email capture first, progress sync second, trust reports third, career/job-board profile fourth.

That sequence supports the long-term job-board idea without sacrificing the current free, no-account study experience.
