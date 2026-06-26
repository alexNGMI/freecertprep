import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hardeningMigration = readFileSync(
  new URL('../../supabase/migrations/20260626000100_security_hardening_constraints.sql', import.meta.url),
  'utf8',
)

const headers = readFileSync(
  new URL('../../public/_headers', import.meta.url),
  'utf8',
)

describe('security hardening', () => {
  it('bounds browser-writable Supabase rows', () => {
    expect(hardeningMigration).toContain('study_snapshots_snapshot_size')
    expect(hardeningMigration).toContain('pg_column_size(snapshot) <= 1048576')
    expect(hardeningMigration).toContain('question_issue_reports_content_bounds')
    expect(hardeningMigration).toContain('char_length(btrim(message)) between 5 and 4000')
    expect(hardeningMigration).toContain('question_stats_id_lengths')
    expect(hardeningMigration).toContain('session_results_bounds')
  })

  it('ships defensive static security headers', () => {
    expect(headers).toContain('Content-Security-Policy:')
    expect(headers).toContain("default-src 'self'")
    expect(headers).toContain("connect-src 'self' https://*.supabase.co wss://*.supabase.co")
    expect(headers).toContain("frame-ancestors 'none'")
    expect(headers).toContain('X-Content-Type-Options: nosniff')
    expect(headers).toContain('X-Frame-Options: DENY')
    expect(headers).toContain('Permissions-Policy:')
  })
})
