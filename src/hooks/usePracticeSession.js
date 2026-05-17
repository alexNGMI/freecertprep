import { useMemo, useState } from 'react'
import { fisherYates, weightedSample } from '../utils/shuffle'
import { isAnswerCorrect } from '../utils/scoring'
import { useProgress } from './useProgress'
import { useQuestionStats } from './useQuestionStats'

export const SMART_PRACTICE = 'Smart Practice'
export const BOOKMARKED = 'Bookmarked'
export const ALL_DOMAINS = 'All Domains'

export function usePracticeSession({ cert, questions, bookmarkedIds, blockSize = 10 }) {
  const { addQuizResult } = useProgress(cert.id)
  const { getWeightedPool, recordSession, trackedCount } = useQuestionStats(cert.id)

  const certDomains = useMemo(() => cert.domains.map((d) => d.name), [cert.domains])
  const [selectedDomain, setSelectedDomain] = useState(SMART_PRACTICE)
  const [setupStep, setSetupStep] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [sessionKey, setSessionKey] = useState(0)

  const activeMode =
    selectedDomain === SMART_PRACTICE ? 'smart'
      : selectedDomain === BOOKMARKED ? 'bookmarked'
        : 'domain'

  const poolQuestions = useMemo(() => {
    if (selectedDomain === SMART_PRACTICE) return questions
    if (selectedDomain === ALL_DOMAINS) return questions
    if (selectedDomain === BOOKMARKED) return questions.filter((q) => bookmarkedIds.includes(q.id))
    return questions.filter((q) => q.domain === selectedDomain)
  }, [selectedDomain, questions, bookmarkedIds])

  const sessionQuestions = useMemo(() => {
    void sessionKey
    if (selectedDomain === SMART_PRACTICE) {
      return weightedSample(getWeightedPool(questions), blockSize)
    }
    return fisherYates(poolQuestions).slice(0, blockSize)
  }, [selectedDomain, poolQuestions, sessionKey, questions, getWeightedPool, blockSize])

  const startQuiz = () => {
    setCurrentIndex(0)
    setAnswers([])
    setShowResult(false)
    setQuizStarted(true)
    setSessionKey((k) => k + 1)
  }

  const changeMode = () => {
    setQuizStarted(false)
    setSetupStep(1)
    setSelectedDomain(SMART_PRACTICE)
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
