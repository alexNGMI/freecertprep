-- freecertprep backend phase 4
-- Purpose: add abuse-resistant bounds for browser-writable account tables.
-- These constraints protect quota and admin-review surfaces when a signed-in
-- user bypasses the UI and writes directly through the public client.

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_display_name_length'
  ) then
    alter table public.profiles
      add constraint profiles_display_name_length
      check (display_name is null or char_length(display_name) <= 120)
      not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'email_subscriptions_email_length'
  ) then
    alter table public.email_subscriptions
      add constraint email_subscriptions_email_length
      check (char_length(email) between 3 and 320)
      not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'study_snapshots_schema_version_range'
  ) then
    alter table public.study_snapshots
      add constraint study_snapshots_schema_version_range
      check (schema_version between 1 and 10)
      not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'study_snapshots_snapshot_object'
  ) then
    alter table public.study_snapshots
      add constraint study_snapshots_snapshot_object
      check (jsonb_typeof(snapshot) = 'object')
      not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'study_snapshots_snapshot_size'
  ) then
    alter table public.study_snapshots
      add constraint study_snapshots_snapshot_size
      check (pg_column_size(snapshot) <= 1048576)
      not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'study_snapshots_source_device_id_length'
  ) then
    alter table public.study_snapshots
      add constraint study_snapshots_source_device_id_length
      check (source_device_id is null or char_length(source_device_id) <= 128)
      not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'question_stats_id_lengths'
  ) then
    alter table public.question_stats
      add constraint question_stats_id_lengths
      check (char_length(cert_id) between 1 and 120 and char_length(question_id) between 1 and 200)
      not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'bookmarks_id_lengths'
  ) then
    alter table public.bookmarks
      add constraint bookmarks_id_lengths
      check (char_length(cert_id) between 1 and 120 and char_length(question_id) between 1 and 200)
      not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'session_results_bounds'
  ) then
    alter table public.session_results
      add constraint session_results_bounds
      check (
        char_length(cert_id) between 1 and 120
        and question_count <= 300
        and (duration_seconds is null or duration_seconds <= 86400)
      )
      not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'question_issue_reports_content_bounds'
  ) then
    alter table public.question_issue_reports
      add constraint question_issue_reports_content_bounds
      check (
        char_length(cert_id) between 1 and 120
        and char_length(question_id) between 1 and 200
        and char_length(btrim(message)) between 5 and 4000
      )
      not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'question_correction_events_content_bounds'
  ) then
    alter table public.question_correction_events
      add constraint question_correction_events_content_bounds
      check (
        char_length(cert_id) between 1 and 120
        and char_length(question_id) between 1 and 200
        and (editor_note is null or char_length(editor_note) <= 4000)
      )
      not valid;
  end if;
end $$;
