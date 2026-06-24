-- freecertprep backend phase 3
-- Purpose: authenticated account-data export and self-service account deletion.
-- Dependency: apply 20260624000100_admin_report_queue.sql first.

create or replace function public.export_my_account_data()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  result jsonb;
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  select jsonb_build_object(
    'schemaVersion', 1,
    'exportedAt', now(),
    'account', (
      select jsonb_build_object(
        'id', users.id,
        'email', users.email,
        'createdAt', users.created_at,
        'lastSignInAt', users.last_sign_in_at
      )
      from auth.users users
      where users.id = current_user_id
    ),
    'profile', (
      select to_jsonb(profiles)
      from public.profiles
      where user_id = current_user_id
    ),
    'emailSubscription', (
      select to_jsonb(email_subscriptions)
      from public.email_subscriptions
      where user_id = current_user_id
    ),
    'studySnapshots', coalesce((
      select jsonb_agg(to_jsonb(study_snapshots) order by created_at desc)
      from public.study_snapshots
      where user_id = current_user_id
    ), '[]'::jsonb),
    'questionStats', coalesce((
      select jsonb_agg(to_jsonb(question_stats) order by cert_id, question_id)
      from public.question_stats
      where user_id = current_user_id
    ), '[]'::jsonb),
    'bookmarks', coalesce((
      select jsonb_agg(to_jsonb(bookmarks) order by cert_id, question_id)
      from public.bookmarks
      where user_id = current_user_id
    ), '[]'::jsonb),
    'sessionResults', coalesce((
      select jsonb_agg(to_jsonb(session_results) order by completed_at desc)
      from public.session_results
      where user_id = current_user_id
    ), '[]'::jsonb),
    'issueReports', coalesce((
      select jsonb_agg(to_jsonb(question_issue_reports) order by created_at desc)
      from public.question_issue_reports
      where reporter_user_id = current_user_id
    ), '[]'::jsonb),
    'administrator', exists (
      select 1 from public.admin_users where user_id = current_user_id
    )
  ) into result;

  return result;
end;
$$;

revoke all on function public.export_my_account_data() from public;
grant execute on function public.export_my_account_data() to authenticated;

create or replace function public.delete_my_account()
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  delete from auth.users where id = current_user_id;
  return found;
end;
$$;

revoke all on function public.delete_my_account() from public;
grant execute on function public.delete_my_account() to authenticated;
