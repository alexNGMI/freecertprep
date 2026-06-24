import { describe, expect, it } from 'vitest'
import {
  ACTIONABLE_ADMIN_REPORT_STATUSES,
  ADMIN_REPORT_STATUSES,
  ADMIN_REPORT_STATUS_CONFIG,
  getAdminReportStatus,
  isActionableAdminReportStatus,
} from '../config/adminReportStatuses'

describe('admin report statuses', () => {
  it('derives the ordered values and review actions from one config', () => {
    expect(ADMIN_REPORT_STATUSES).toEqual(['open', 'reviewing', 'fixed', 'rejected', 'duplicate'])
    expect(ACTIONABLE_ADMIN_REPORT_STATUSES).toEqual(['reviewing', 'fixed', 'rejected', 'duplicate'])
    expect(isActionableAdminReportStatus('open')).toBe(false)
    expect(isActionableAdminReportStatus('fixed')).toBe(true)
  })

  it('provides display metadata and a safe fallback', () => {
    for (const status of ADMIN_REPORT_STATUSES) {
      expect(ADMIN_REPORT_STATUS_CONFIG[status].label).toBeTruthy()
      expect(ADMIN_REPORT_STATUS_CONFIG[status].color).toContain('border-')
    }

    expect(getAdminReportStatus('unknown')).toBe(ADMIN_REPORT_STATUS_CONFIG.open)
  })
})
