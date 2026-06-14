import { useCallback, useEffect, useRef, useState } from 'react'
import { weightedSample } from '../utils/shuffle'
import { isAnswerCorrect } from '../utils/scoring'
import { useProgress } from './useProgress'
import { useQuestionStats } from './useQuestionStats'

export function useTimedDrillSession({ cert, questions, questionCount = 10, duration = 600 }) {
  const { addQuizResult } = useProgress(cert.id)
  const { getWeightedPool, recordSession } = useQuestionStats(cert.id)

  const [drillStarted, setDrillStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(duration)
  const [showResult, setShowResult] = useState(false)
  const [drillQuestions, setDrillQuestions] = useState([])
  const completedRef = useRef(false)

  const endDrill = useCallback((finalAnswers) => {
    if (completedRef.current) return
    completedRef.current = true
    addQuizResult({ domain: 'Timed Drill', answers: finalAnswers })
    recordSession(finalAnswers)
    setShowResult(true)
  }, [addQuizResult, recordSession])

  const answersRef = useRef(answers)
  useEffect(() => {
    answersRef.current = answers
  }, [answers])

  useEffect(() => {
    if (!drillStarted || showResult) return

    const tickId = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1))
    }, 1000)

    const stopId = setTimeout(() => {
      setTimeLeft(0)
      endDrill(answersRef.current)
    }, duration * 1000)

    return () => {
      clearInterval(tickId)
      clearTimeout(stopId)
    }
  }, [drillStarted, showResult, endDrill, duration])

  const startDrill = () => {
    completedRef.current = false
    setCurrentIndex(0)
    setAnswers([])
    setTimeLeft(duration)
    setShowResult(false)
    setDrillQuestions(weightedSample(getWeightedPool(questions), questionCount))
    setDrillStarted(true)
  }

  const backToSetup = () => {
    setDrillStarted(false)
  }

  const handleAnswer = (selectedChoice) => {
    const question = drillQuestions[currentIndex]
    const correct = isAnswerCorrect(selectedChoice, question)
    setAnswers((prev) => [
      ...prev,
      { questionId: question.id, domain: question.domain, selected: selectedChoice, correct },
    ])
  }

  const handleNext = () => {
    if (currentIndex < drillQuestions.length - 1) {
      setCurrentIndex((i) => i + 1)
      return
    }
    endDrill(answers)
  }

  return {
    answers,
    backToSetup,
    currentAnswer: answers[currentIndex],
    currentIndex,
    currentQuestion: drillQuestions[currentIndex],
    drillQuestions,
    drillStarted,
    handleAnswer,
    handleNext,
    isLastQuestion: currentIndex === drillQuestions.length - 1,
    showResult,
    startDrill,
    timeLeft,
  }
}
