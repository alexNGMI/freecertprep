// @vitest-environment jsdom
//
// Characterization tests pinning the current public behavior of
// useQuestionStats ahead of the Phase B3 session-hook extraction.

import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useQuestionStats } from '../hooks/useQuestionStats.js'
import { KEYS } from '../utils/storage.js'

beforeEach(() => {
  localStorage.clear()
})

describe('useQuestionStats — recording', () => {
  it('starts empty', () => {
    const { result } = renderHook(() => useQuestionStats('cert-a'))
    expect(result.current.certStats).toEqual({})
    expect(result.current.trackedCount).toBe(0)
  })

  it('recordSession accumulates attempts and correct counts', () => {
    const { result } = renderHook(() => useQuestionStats('cert-a'))
    act(() => result.current.recordSession([
      { questionId: 'q1', correct: true },
      { questionId: 'q2', correct: false },
    ]))
    act(() => result.current.recordSession([
      { questionId: 'q1', correct: false },
    ]))

    expect(result.current.certStats.q1).toMatchObject({ attempts: 2, correct: 1 })
    expect(result.current.certStats.q2).toMatchObject({ attempts: 1, correct: 0 })
    expect(result.current.trackedCount).toBe(2)
  })

  it('resetStats clears only the active cert', () => {
    const { result } = renderHook(() => useQuestionStats('cert-a'))
    act(() => result.current.recordSession([{ questionId: 'q1', correct: true }]))
    act(() => result.current.resetStats())

    expect(result.current.certStats).toEqual({})
    expect(result.current.trackedCount).toBe(0)
  })

  it('getWeightedPool returns one weighted item per question', () => {
    const { result } = renderHook(() => useQuestionStats('cert-a'))
    const questions = [
      { id: 'q1', domain: 'Alpha' },
      { id: 'q2', domain: 'Beta' },
    ]
    const pool = result.current.getWeightedPool(questions)
    expect(Array.isArray(pool)).toBe(true)
    expect(pool).toHaveLength(2)
  })
})

describe('useQuestionStats — persistence & isolation', () => {
  it('persists to the canonical key and reloads', () => {
    const first = renderHook(() => useQuestionStats('cert-a'))
    act(() => first.result.current.recordSession([{ questionId: 'q1', correct: true }]))

    expect(localStorage.getItem(KEYS.questionStats)).toBeTruthy()

    const second = renderHook(() => useQuestionStats('cert-a'))
    expect(second.result.current.trackedCount).toBe(1)
    expect(second.result.current.certStats.q1).toMatchObject({ attempts: 1, correct: 1 })
  })

  it('keeps separate certs independent', () => {
    const { result } = renderHook(() => useQuestionStats('cert-a'))
    act(() => result.current.recordSession([{ questionId: 'q1', correct: true }]))

    const other = renderHook(() => useQuestionStats('cert-b'))
    expect(other.result.current.certStats).toEqual({})
    expect(other.result.current.trackedCount).toBe(0)
  })
})
