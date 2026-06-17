-- freecertprep backend phase 1 draft
-- Purpose: optional accounts, email opt-in, study sync, trust reports, and admin correction history.
-- Apply in a staging Supabase project before production.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.email_subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  product_updates boolean not null default false,
  study_reminders boolean not null default false,
  subscribed_at timestamptz,
  unsubscribed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.study_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  schema_version integer not null default 1,
  snapshot jsonb not null,
  source_device_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.question_stats (
  user_id uuid not null references auth.users(id) on delete cascade,
  cert_id text not null,
  question_id text not null,
  attempts integer not null default 0 check (attempts >= 0),
  correct integer not null default 0 check (correct >= 0),
  last_seen_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, cert_id, question_id)
);

create table if not exists public.bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  cert_id text not null,
  question_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, cert_id, question_id)
);

create table if not exists public.session_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cert_id text not null,
  session_type text not null check (session_type in ('diagnostic', 'practice', 'drill', 'exam', 'case')),
  score_percent integer check (score_percent >= 0 and score_percent <= 100),
  correct_count integer not null default 0 check (correct_count >= 0),
  question_count integer not null check (question_count > 0),
  duration_seconds integer check (duration_seconds >= 0),
  domain_breakdown jsonb,
  objective_breakdown jsonb,
  practical_breakdown jsonb,
  completed_at timestamptz not null default now(),
  source_device_id text
);

create table if not exists public.question_issue_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id uuid references auth.users(id) on delete set null,
  cert_id text not null,
  question_id text not null,
  category text not null check (category in ('wrong_answer', 'outdated_source', 'typo', 'unclear_explanation', 'broken_ui', 'other')),
  message text not null check (char_length(message) between 5 and 4000),
  status text not null default 'open' check (status in ('open', 'reviewing', 'fixed', 'rejected', 'duplicate')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.question_correction_events (
  id uuid primary key default gen_random_uuid(),
  issue_report_id uuid references public.question_issue_reports(id) on delete set null,
  cert_id text not null,
  question_id text not null,
  status text not null check (status in ('reviewed', 'fixed', 'rejected', 'duplicate')),
  editor_note text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_study_snapshots_user_created
  on public.study_snapshots (user_id, created_at desc);

create index if not exists idx_session_results_user_cert_completed
  on public.session_results (user_id, cert_id, completed_at desc);

create index if not exists idx_question_issue_reports_cert_status
  on public.question_issue_reports (cert_id, status, created_at desc);

alter table public.profiles enable row level security;
alter table public.email_subscriptions enable row level security;
alter table public.study_snapshots enable row level security;
alter table public.question_stats enable row level security;
alter table public.bookmarks enable row level security;
alter table public.session_results enable row level security;
alter table public.question_issue_reports enable row level security;
alter table public.question_correction_events enable row level security;

create policy "Users can read their profile"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "Users can upsert their profile"
  on public.profiles for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their email subscription"
  on public.email_subscriptions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their study snapshots"
  on public.study_snapshots for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their question stats"
  on public.question_stats for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their bookmarks"
  on public.bookmarks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their session results"
  on public.session_results for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Signed-in users can create issue reports"
  on public.question_issue_reports for insert
  with check (auth.uid() = reporter_user_id);

create policy "Users can read their own issue reports"
  on public.question_issue_reports for select
  using (auth.uid() = reporter_user_id);

-- Admin/editor read and update policies should be added after an explicit roles model exists.
-- Until then, correction events are service-role/admin-only by default because no user RLS policy is defined.
