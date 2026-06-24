-- freecertprep backend phase 2
-- Purpose: explicit admin authorization, protected report review, and correction history.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  added_by uuid references auth.users(id) on delete set null
);

alter table public.admin_users enable row level security;

create or replace function public.is_current_user_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_current_user_admin() from public;
grant execute on function public.is_current_user_admin() to authenticated;

drop policy if exists "Admins can read admin membership" on public.admin_users;
drop policy if exists "Admins can read issue reports" on public.question_issue_reports;
drop policy if exists "Admins can update issue reports" on public.question_issue_reports;
drop policy if exists "Admins can read correction events" on public.question_correction_events;

create policy "Admins can read admin membership"
  on public.admin_users for select
  using (public.is_current_user_admin());

create policy "Admins can read issue reports"
  on public.question_issue_reports for select
  using (public.is_current_user_admin());

create policy "Admins can read correction events"
  on public.question_correction_events for select
  using (public.is_current_user_admin());

create or replace function public.review_question_issue_report(
  report_id uuid,
  next_status text,
  editor_note text default null
)
returns public.question_issue_reports
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_report public.question_issue_reports;
  event_status text;
begin
  if not public.is_current_user_admin() then
    raise exception 'Administrator access required';
  end if;

  if next_status not in ('reviewing', 'fixed', 'rejected', 'duplicate') then
    raise exception 'Invalid report status';
  end if;

  if char_length(coalesce(editor_note, '')) > 4000 then
    raise exception 'Editor note is too long';
  end if;

  update public.question_issue_reports
  set
    status = next_status,
    updated_at = now()
  where id = report_id
  returning * into updated_report;

  if updated_report.id is null then
    raise exception 'Issue report not found';
  end if;

  event_status := case
    when next_status = 'reviewing' then 'reviewed'
    else next_status
  end;

  insert into public.question_correction_events (
    issue_report_id,
    cert_id,
    question_id,
    status,
    editor_note,
    created_by
  ) values (
    updated_report.id,
    updated_report.cert_id,
    updated_report.question_id,
    event_status,
    nullif(trim(editor_note), ''),
    auth.uid()
  );

  return updated_report;
end;
$$;

revoke all on function public.review_question_issue_report(uuid, text, text) from public;
grant execute on function public.review_question_issue_report(uuid, text, text) to authenticated;

-- Bootstrap the first admin after that person has signed in at least once:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'admin@your-domain.com';
