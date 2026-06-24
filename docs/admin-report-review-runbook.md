# Admin Report Review Runbook

Date: June 24, 2026

## What Is Built

- private route: `/admin/reports`;
- administrator membership stored in `public.admin_users`;
- Supabase row-level security for report and correction-history access;
- filters for status, category, and certification;
- current question, choices, answer, and explanation shown beside the learner report;
- status actions for reviewing, fixed, rejected, and duplicate;
- internal editor notes;
- durable correction-history events;
- keyboard-safe report dialog and admin sign-in flow;
- no public navigation link to the admin route.

The browser cannot grant administrator access. Supabase checks membership for every protected read and update.

## One-Time Production Activation

### 1. Apply the migration

In Supabase:

1. Open **SQL Editor**.
2. Open `supabase/migrations/20260624000100_admin_report_queue.sql` from this repository.
3. Paste the full file into a new query.
4. Click **Run**.

The migration is safe to rerun. It creates the administrator table, policies, and transactional review function.

### 2. Sign in once

Sign in to freecertprep with the email that will own the administrator account. This ensures the account exists in `auth.users`.

### 3. Promote the first administrator

Run this in Supabase SQL Editor after replacing the email:

```sql
insert into public.admin_users (user_id)
select id
from auth.users
where email = 'your-admin-email@example.com'
on conflict (user_id) do nothing;
```

### 4. Open the queue

Visit:

```text
https://your-site.example/admin/reports
```

Sign in with the administrator email if needed. Non-admin accounts receive an access-denied screen and cannot read report rows through the Supabase API.

## Normal Review Workflow

1. Leave the default filter on **Open**.
2. Select a report.
3. Compare the learner message with the current question, answer, and explanation.
4. Add an internal note describing what was checked.
5. Choose:
   - **Reviewing** when investigation or an edit is still underway;
   - **Fixed** after the content or behavior has been corrected;
   - **Rejected** when the report is not valid;
   - **Duplicate** when another report already covers the issue.
6. Refresh or change filters to continue.

Every decision updates the report and writes a correction-history event in one database transaction.
Direct client updates are denied, so a status cannot change without a corresponding history record.

## Adding Another Administrator

The person must sign in once first. Then run:

```sql
insert into public.admin_users (user_id, added_by)
select new_user.id, current_admin.id
from auth.users new_user
cross join auth.users current_admin
where new_user.email = 'new-admin@example.com'
  and current_admin.email = 'current-admin@example.com'
on conflict (user_id) do nothing;
```

## Removing Administrator Access

```sql
delete from public.admin_users
where user_id = (
  select id from auth.users where email = 'former-admin@example.com'
);
```

Removal takes effect on the next protected request.
