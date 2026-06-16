import { useMemo, useRef, useState } from 'react'
import { fisherYates, weightedSample } from '../utils/shuffle'
import { isAnswerCorrect } from '../utils/scoring'
import { useProgress } from './useProgress'
import { useQuestionStats } from './useQuestionStats'
import { getDueReviewQuestions, getRecentMissQuestions } from '../utils/objective-progress'
import { getQuestionObjectiveId } from '../utils/learning-loop'
import { getLearningObjectives } from '../utils/learning-loop-config'

export const SMART_PRACTICE = 'Smart Practice'
export const BOOKMARKED = 'Bookmarked'
export const ALL_DOMAINS = 'All Domains'
export const RECENT_MISSES = 'Recent Misses'
export const DUE_REVIEW = 'Due Review'
export const OBJECTIVE_PREFIX = 'Objective:'

export function usePracticeSession({ cert, questions, bookmarkedIds, blockSize = 10, initialSelection = SMART_PRACTICE }) {
  const { addQuizResult } = useProgress(cert.id)
  const { certStats, getWeightedPool, recordSession, trackedCount } = useQuestionStats(cert.id)
  const learningObjectives = useMemo(() => getLearningObjectives(cert), [cert])

  const certDomains = useMemo(() => cert.domains.map((d) => d.name), [cert.domains])
  const [selectedDomain, setSelectedDomain] = useState(initialSelection)
  const [setupStep, setSetupStep] = useState(
    initialSelection.startsWith(OBJECTIVE_PREFIX) ? 3 : 1,
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [sessionQuestions, setSessionQuestions] = useState([])
  const completedRef = useRef(false)

  const activeMode =
    selectedDomain === SMART_PRACTICE ? 'smart'
      : selectedDomain === BOOKMARKED ? 'bookmarked'
        : selectedDomain === RECENT_MISSES ? 'missed'
          : selectedDomain === DUE_REVIEW ? 'due'
            : selectedDomain.startsWith(OBJECTIVE_PREFIX) ? 'objective'
        : 'domain'

  const poolQuestions = useMemo(() => {
    if (selectedDomain === SMART_PRACTICE) return questions
    if (selectedDomain === ALL_DOMAINS) return questions
    if (selectedDomain === BOOKMARKED) return questions.filter((q) => bookmarkedIds.includes(q.id))
    if (selectedDomain === RECENT_MISSES) return getRecentMissQuestions(questions, certStats)
    if (selectedDomain === DUE_REVIEW) return getDueReviewQuestions(questions, certStats)
    if (selectedDomain.startsWith(OBJECTIVE_PREFIX)) {
      const objectiveId = selectedDomain.slice(OBJECTIVE_PREFIX.length)
      return questions.filter((q) => getQuestionObjectiveId(q, learningObjectives) === objectiveId)
    }
    return questions.filter((q) => q.domain === selectedDomain)
  }, [selectedDomain, questions, bookmarkedIds, certStats, learningObjectives])

  const startQuiz = () => {
    const nextQuestions = selectedDomain === SMART_PRACTICE
      ? weightedSample(getWeightedPool(questions), blockSize)
      : fisherYates(poolQuestions).slice(0, blockSize)

    completedRef.current = false
    setCurrentIndex(0)
    setAnswers([])
    setShowResult(false)
    setSessionQuestions(nextQuestions)
    setQuizStarted(true)
  }

  const changeMode = (selection = SMART_PRACTICE) => {
    setQuizStarted(false)
    setSetupStep(1)
    setSelectedDomain(selection)
    setSessionQuestions([])
  }

  const handleAnswer = (selectedChoice) => {
    const question = sessionQuestions[currentIndex]
    const correct = isAnswerCorrect(selectedChoice, question)
    setAnswers((prev) => [
      ...prev,
      { questionId: question.id, domain: question.domain, selected: selectedChoice, correct },
    ])
  }

  const handleNext = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      return
    }
    if (completedRef.current) return
    completedRef.current = true
    addQuizResult({ domain: selectedDomain, answers })
    recordSession(answers)
    setShowResult(true)
  }

  return {
    activeMode,
    answers,
    certDomains,
    changeMode,
    currentAnswer: answers[currentIndex],
    currentIndex,
    currentQuestion: sessionQuestions[currentIndex],
    handleAnswer,
    handleNext,
    certStats,
    isSmartPractice: selectedDomain === SMART_PRACTICE,
    poolQuestions,
    quizStarted,
    selectedDomain,
    sessionQuestions,
    setSelectedDomain,
    setSetupStep,
    setupStep,
    showResult,
    startQuiz,
    trackedCount,
  }
}
