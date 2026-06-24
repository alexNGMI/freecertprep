import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const migration = readFileSync(
  new URL('../../supabase/migrations/20260624000100_admin_report_queue.sql', import.meta.url),
  'utf8',
)

describe('admin report migration', () => {
  it('requires explicit admin membership and funnels decisions through correction history', () => {
    expect(migration).toContain('create table if not exists public.admin_users')
    expect(migration).toContain('create or replace function public.is_current_user_admin()')
    expect(migration).toContain("set search_path = ''")
    expect(migration).toContain('create policy "Admins can read issue reports"')
    expect(migration).not.toContain('create policy "Admins can update issue reports"')
    expect(migration).toContain('create or replace function public.review_question_issue_report')
    expect(migration).toContain('insert into public.question_correction_events')
    expect(migration).toContain('grant execute on function public.review_question_issue_report')
  })

  it('keeps every migration version unique so Supabase can order dependencies', () => {
    const filenames = readdirSync(new URL('../../supabase/migrations/', import.meta.url))
    const versions = filenames.map(filename => filename.split('_')[0])
    expect(new Set(versions).size).toBe(versions.length)
  })
})
