# Account Privacy Controls Runbook

Date: June 24, 2026

## What Is Built

- public privacy page at `/privacy`;
- complete signed-in account-data export as JSON;
- permanent self-service account deletion;
- typed `DELETE` confirmation before deletion;
- explicit separation between cloud-account deletion and local browser study data;
- footer and Account-page access to the privacy policy.

## Production Activation

Apply this migration in Supabase SQL Editor:

```text
supabase/migrations/20260624_account_privacy_controls.sql
```

The migration adds two authenticated functions:

- `export_my_account_data()` returns the user identity, profile, email preferences, study snapshots, question statistics, bookmarks, session results, issue reports, and administrator-membership flag;
- `delete_my_account()` deletes the current `auth.users` row.

Existing foreign keys provide the deletion behavior:

- profile, subscription, snapshot, statistics, bookmark, session, and administrator rows cascade away;
- question reports remain for content-integrity history but `reporter_user_id` becomes `null`;
- correction events created by the deleted account remain but `created_by` becomes `null`.

## Verification

1. Sign in to `/account`.
2. Select **Download account data** and inspect the downloaded JSON.
3. Use a disposable test account for deletion verification.
4. Select **Delete account**.
5. Confirm the final button stays disabled until `DELETE` is typed exactly.
6. Delete the test account.
7. Confirm the app returns to signed-out account state.
8. Confirm local study progress still exists in that browser.
9. In Supabase, confirm the test user no longer exists in Authentication.

Do not test deletion first with the sole administrator account.
