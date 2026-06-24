import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const migration = readFileSync(
  new URL('../../supabase/migrations/20260624_account_privacy_controls.sql', import.meta.url),
  'utf8',
)

describe('account privacy migration', () => {
  it('exports all account-owned data and deletes through the authenticated auth user', () => {
    expect(migration).toContain('create or replace function public.export_my_account_data()')
    expect(migration).toContain("'studySnapshots'")
    expect(migration).toContain("'questionStats'")
    expect(migration).toContain("'bookmarks'")
    expect(migration).toContain("'sessionResults'")
    expect(migration).toContain("'issueReports'")
    expect(migration).toContain('create or replace function public.delete_my_account()')
    expect(migration).toContain('delete from auth.users where id = current_user_id')
    expect(migration).toContain('grant execute on function public.delete_my_account() to authenticated')
  })
})
