# Account Sync Runbook

Updated: June 24, 2026

## What Is Live

Signed-in learners can select **Sync now** on `/account`. The app reads the newest Supabase study snapshot, combines it with the browser's current local data, writes a new merged cloud snapshot, and saves that merged state locally.

Anonymous study remains local-first and fully available. Sync is manual; the app does not silently synchronize in the background.

## Merge Rules

| Data | Rule |
| --- | --- |
| Quiz and exam history | Union local and cloud sessions, deduplicate matching sessions, then order by timestamp. |
| Smart Practice statistics | Add independent local and remote attempt/correct deltas to the last common synchronized baseline. |
| Bookmarks | Use timestamped add/remove state per question; the newest change wins. |
| Recovery snapshots | Append-only rows in `study_snapshots`; restore explicitly replaces local study state with the newest snapshot. |

The locally stored sync baseline prevents a repeated sync from counting the same question attempts twice.

## First Production Verification

1. Sign in on device or browser A.
2. Complete a short practice session and bookmark a question.
3. Open `/account` and select **Sync now**.
4. Sign in to the same account on device or browser B.
5. Complete a different session, remove or add a bookmark, and select **Sync now**.
6. Return to device A and select **Sync now** again.
7. Confirm both session histories are present, question statistics reflect both devices, and the newest bookmark change wins.
8. Repeat **Sync now** without new study work and confirm the counts do not increase.

## Recovery Controls

- **Create recovery backup** appends the browser's current study state without merging.
- **Restore latest backup** explicitly replaces local progress, statistics, bookmarks, and the sync baseline.
- Local JSON export remains available independently of Supabase.
- Account deletion is the destructive cloud-data control. Normal sync is conservative and preserves study history.

## Automated Coverage

- `src/__tests__/account-sync-merge.test.js` covers deduplication, three-way statistics, idempotency, and bookmark removal.
- `src/__tests__/account-sync.test.js` covers Supabase snapshot operations, restore state, and the full sync service.
- `src/__tests__/account-auth.test.jsx` covers the signed-in Sync now interaction.
- `src/__tests__/storage.test.js` covers same-tab refresh notifications after sync.
