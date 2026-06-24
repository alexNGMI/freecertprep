export const ADMIN_REPORT_STATUS_CONFIG = Object.freeze({
  open: Object.freeze({
    label: 'Open',
    color: 'text-amber-200 border-amber-500/30 bg-amber-500/10',
    actionable: false,
  }),
  reviewing: Object.freeze({
    label: 'Reviewing',
    color: 'text-sky-200 border-sky-500/30 bg-sky-500/10',
    actionable: true,
  }),
  fixed: Object.freeze({
    label: 'Fixed',
    color: 'text-emerald-200 border-emerald-500/30 bg-emerald-500/10',
    actionable: true,
  }),
  rejected: Object.freeze({
    label: 'Rejected',
    color: 'text-rose-200 border-rose-500/30 bg-rose-500/10',
    actionable: true,
  }),
  duplicate: Object.freeze({
    label: 'Duplicate',
    color: 'text-violet-200 border-violet-500/30 bg-violet-500/10',
    actionable: true,
  }),
})

export const ADMIN_REPORT_STATUSES = Object.freeze(Object.keys(ADMIN_REPORT_STATUS_CONFIG))

export const ACTIONABLE_ADMIN_REPORT_STATUSES = Object.freeze(
  ADMIN_REPORT_STATUSES.filter(status => ADMIN_REPORT_STATUS_CONFIG[status].actionable),
)

export function getAdminReportStatus(status) {
  return ADMIN_REPORT_STATUS_CONFIG[status] || ADMIN_REPORT_STATUS_CONFIG.open
}

export function isActionableAdminReportStatus(status) {
  return Boolean(ADMIN_REPORT_STATUS_CONFIG[status]?.actionable)
}
