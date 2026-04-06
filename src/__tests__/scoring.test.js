import { describe, it, expect } from 'vitest'
import { isAnswerCorrect } from '../utils/scoring.js'

describe('isAnswerCorrect', () => {
  describe('single-choice', () => {
    const question = { correctAnswer: 2, choices: ['A', 'B', 'C', 'D'] }

    it('returns true for correct answer', () => {
      expect(isAnswerCorrect(2, question)).toBe(true)
    })

    it('returns false for wrong answer', () => {
      expect(isAnswerCorrect(0, question)).toBe(false)
    })

    it('returns false for -1 (unanswered)', () => {
      expect(isAnswerCorrect(-1, question)).toBe(false)
    })
  })

  describe('multiple-response', () => {
    const question = {
      type: 'multiple-response',
      correctAnswers: [0, 2],
      choices: ['A', 'B', 'C', 'D'],
    }

    it('returns true for correct sorted array', () => {
      expect(isAnswerCorrect([0, 2], question)).toBe(true)
    })

    it('returns false for wrong selection', () => {
      expect(isAnswerCorrect([0, 1], question)).toBe(false)
    })

    it('returns false for subset', () => {
      expect(isAnswerCorrect([0], question)).toBe(false)
    })

    it('returns false for superset', () => {
      expect(isAnswerCorrect([0, 1, 2], question)).toBe(false)
    })
  })

  describe('statement-block', () => {
    const question = {
      type: 'statement-block',
      correctAnswers: [true, false, true],
      statements: ['S1', 'S2', 'S3'],
    }

    it('returns true for exact boolean match', () => {
      expect(isAnswerCorrect([true, false, true], question)).toBe(true)
    })

    it('returns false for one wrong statement', () => {
      expect(isAnswerCorrect([true, true, true], question)).toBe(false)
    })
  })

  describe('ordering', () => {
    const question = {
      type: 'ordering',
      correctOrder: [2, 0, 1],
      items: ['Step A', 'Step B', 'Step C'],
    }

    it('returns true for correct order', () => {
      expect(isAnswerCorrect([2, 0, 1], question)).toBe(true)
    })

    it('returns false for wrong order', () => {
      expect(isAnswerCorrect([0, 1, 2], question)).toBe(false)
    })
  })

  describe('matching', () => {
    const question = {
      type: 'matching',
      correctMatches: [1, 0, 2],
      itemsLeft: ['X', 'Y', 'Z'],
      itemsRight: ['A', 'B', 'C'],
    }

    it('returns true for correct matches', () => {
      expect(isAnswerCorrect([1, 0, 2], question)).toBe(true)
    })

    it('returns false for one wrong match', () => {
      expect(isAnswerCorrect([1, 2, 0], question)).toBe(false)
    })
  })
})
