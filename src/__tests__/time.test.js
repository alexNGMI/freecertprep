import { describe, it, expect } from 'vitest'
import {
  formatTime,
  timerColor,
  TIMER_PALETTE_DARK,
  TIMER_PALETTE_LIGHT,
} from '../utils/time.js'

describe('time: formatTime', () => {
  it('zero-pads the seconds', () => {
    expect(formatTime(65)).toBe('1:05')
    expect(formatTime(9)).toBe('0:09')
  })

  it('handles exact minutes and larger durations', () => {
    expect(formatTime(0)).toBe('0:00')
    expect(formatTime(60)).toBe('1:00')
    expect(formatTime(600)).toBe('10:00')
    expect(formatTime(3599)).toBe('59:59')
  })
})

describe('time: timerColor', () => {
  const total = 600

  it('returns ok above 50% remaining', () => {
    expect(timerColor(301, total, TIMER_PALETTE_DARK)).toBe(TIMER_PALETTE_DARK.ok)
    expect(timerColor(600, total, TIMER_PALETTE_LIGHT)).toBe(TIMER_PALETTE_LIGHT.ok)
  })

  it('returns warn between 25% and 50% remaining', () => {
    expect(timerColor(300, total, TIMER_PALETTE_DARK)).toBe(TIMER_PALETTE_DARK.warn)
    expect(timerColor(151, total, TIMER_PALETTE_LIGHT)).toBe(TIMER_PALETTE_LIGHT.warn)
  })

  it('returns danger at or below 25% remaining', () => {
    expect(timerColor(150, total, TIMER_PALETTE_DARK)).toBe(TIMER_PALETTE_DARK.danger)
    expect(timerColor(0, total, TIMER_PALETTE_LIGHT)).toBe(TIMER_PALETTE_LIGHT.danger)
  })

  it('defaults to the dark palette', () => {
    expect(timerColor(600, total)).toBe(TIMER_PALETTE_DARK.ok)
  })

  it('does not divide by zero when total is 0', () => {
    expect(timerColor(0, 0, TIMER_PALETTE_DARK)).toBe(TIMER_PALETTE_DARK.danger)
  })
})
