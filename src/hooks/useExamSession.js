import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { weightedSelect, selectLicensingExam } from '../utils/exam-selection'
import { isAnswerComplete, isAnswerCorrect } from '../utils/scoring'
import { useProgress } from './useProgress'

export function useExamSession({ cert, questions, resultsPath }) {
  const examTime = cert.examTime * 60
  const examQuestionCount = cert.examQuestions
  const { addExamResult } = useProgress(cert.id)
  const navigate = useNavigate()

  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(examTime)
  const [finished, setFinished] = useState(false)
  const timerRef = useRef(null)
  const selectedAnswersRef = useRef(selectedAnswers)

  const [examQuestions] = useState(() =>
    cert.composite
      ? selectLicensingExam(questions, cert.composite)
      : weightedSelect(questions, examQuestionCount, cert.domains)
  )

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers
  }, [selectedAnswers])

  const finishExam = useCallback(() => {
    setFinished(true)
    clearInterval(timerRef.current)
    const currentAnswers = selectedAnswersRef.current
    const answers = examQuestions.map((q, i) => {
      const selected = currentAnswers[i] ?? -1
      const correct = isAnswerCorrect(selected, q)
      return { questionId: q.id, domain: q.domain, selected, correct }
    })
    addExamResult({ answers })
    navigate(resultsPath, { state: { answers, questions: examQuestions } })
  }, [examQuestions, addExamResult, navigate, resultsPath])

  useEffect(() => {
    if (started && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            finishExam()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [started, finished, finishExam])

  const selectAnswer = (answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: answer }))
  }

  const goToQuestion = (index) => {
    setCurrentIndex(index)
  }

  const goPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(examQuestions.length - 1, prev + 1))
  }

  return {
    answeredCount: examQuestions.reduce((count, question, index) =>
      count + (isAnswerComplete(selectedAnswers[index], question) ? 1 : 0)
    , 0),
    currentIndex,
    currentQuestion: examQuestions[currentIndex],
    examQuestionCount,
    examQuestions,
    finishExam,
    goNext,
    goPrevious,
    goToQuestion,
    selectAnswer,
    selectedAnswers,
    setStarted,
    started,
    timeLeft,
  }
}
