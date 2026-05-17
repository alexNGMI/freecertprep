// Shared timer helpers for the timed Drill and Exam screens, used by both
// the dark IT app and the light Real Estate sister site. Pure + unit-tested.

/** Seconds → "M:SS" (e.g. 65 → "1:05", 600 → "10:00"). */
export function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

// Same countdown thresholds, different hues per theme.
export const TIMER_PALETTE_DARK = { ok: '#34d399', warn: '#fbbf24', danger: '#f43f5e' }
export const TIMER_PALETTE_LIGHT = { ok: '#16a34a', warn: '#d97706', danger: '#e11d48' }

/**
 * Countdown color by fraction of time remaining:
 *   > 50% → ok, > 25% → warn, otherwise danger.
 * `total` is the full duration in seconds; `palette` selects the theme.
 */
export function timerColor(seconds, total, palette = TIMER_PALETTE_DARK) {
  const pct = total > 0 ? seconds / total : 0
  if (pct > 0.5) return palette.ok
  if (pct > 0.25) return palette.warn
  return palette.danger
}
