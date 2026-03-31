import { useState, useEffect, useRef, useCallback } from 'react'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import { useNavigate } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'

function shuffleAndSlice(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default function Exam() {
  const cert = useCert()
  const questions = cert.questions
  const EXAM_TIME = cert.examTime * 60
  const EXAM_QUESTIONS = cert.examQuestions

  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME)
  const [finished, setFinished] = useState(false)
  const { addExamResult } = useProgress(cert.id)
  const navigate = useNavigate()
  const timerRef = useRef(null)
  const selectedAnswersRef = useRef(selectedAnswers)

  const [examQuestions] = useState(() => shuffleAndSlice(questions, EXAM_QUESTIONS))

  // Keep ref in sync so finishExam always has current answers
  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers
  }, [selectedAnswers])

  const finishExam = useCallback(() => {
    setFinished(true)
    clearInterval(timerRef.current)
    const currentAnswers = selectedAnswersRef.current
    const answers = examQuestions.map((q, i) => {
      const selected = currentAnswers[i] ?? -1
      const correct = Array.isArray(selected)
        ? JSON.stringify(selected) === JSON.stringify(q.correctAnswers)
        : selected === q.correctAnswer
        
      return {
        questionId: q.id,
        domain: q.domain,
        selected,
        correct,
      }
    })
    addExamResult({ answers })
    navigate(`/${cert.id}/results`, { state: { answers, questions: examQuestions } })
  }, [examQuestions, addExamResult, navigate, cert.id])

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

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const answeredCount = Object.keys(selectedAnswers).length

  if (!started) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-3 pt-4">
          <h1 className="text-4xl font-bold text-[#f5f6f7]">Exam Simulator</h1>
          <p className="text-lg text-[#d0d0d5]">Simulate the real {cert.title} exam experience</p>
        </div>
        <div className="bg-[#1b1b32] rounded-md p-8 space-y-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#2a2a40] rounded-md p-4 text-center">
              <p className="text-xs text-[#a5abc4] uppercase tracking-wider font-bold mb-1">Questions</p>
              <p className="text-[#f5f6f7] font-bold text-2xl">{EXAM_QUESTIONS}</p>
            </div>
            <div className="bg-[#2a2a40] rounded-md p-4 text-center">
              <p className="text-xs text-[#a5abc4] uppercase tracking-wider font-bold mb-1">Time Limit</p>
              <p className="text-[#f5f6f7] font-bold text-2xl">{cert.examTime} min</p>
            </div>
            <div className="bg-[#2a2a40] rounded-md p-4 text-center">
              <p className="text-xs text-[#a5abc4] uppercase tracking-wider font-bold mb-1">Passing Score</p>
              <p className="text-[#f5f6f7] font-bold text-2xl">{cert.passingScore}%</p>
            </div>
          </div>
          <div className="text-center">
            <button
              id="begin-exam-btn"
              onClick={() => setStarted(true)}
              className="bg-[#f1be32] hover:opacity-90 text-[#0a0a23] font-bold px-8 py-2.5 rounded transition-all duration-200"
            >
              Begin Exam
            </button>
          </div>
        </div>
      </div>
    )
  }

  const q = examQuestions[currentIndex]
  const timerWarning = timeLeft < 300

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-[#1b1b32] rounded-md px-5 py-3">
        <span className="text-sm text-[#d0d0d5] font-bold">
          Question {currentIndex + 1} of {EXAM_QUESTIONS}
        </span>
        <span
          className={`font-mono font-bold text-lg transition-all duration-300 ${
            timerWarning ? 'text-red-400 animate-timer-pulse' : 'text-[#f1be32]'
          }`}
          aria-label={`Time remaining: ${formatTime(timeLeft)}`}
        >
          {formatTime(timeLeft)}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#a5abc4]">
            {answeredCount}/{EXAM_QUESTIONS} answered
          </span>
          <button
            id="end-exam-btn"
            onClick={finishExam}
            className="text-sm text-[#a5abc4] hover:text-[#f5f6f7] font-bold transition-colors border border-[#3b3b4f] px-3 py-1 rounded hover:border-[#f5f6f7]"
          >
            End Exam
          </button>
        </div>
      </div>

      <div className="h-2 bg-[#2a2a40] rounded overflow-hidden">
        <div
          className="h-full bg-[#dbb8ff] rounded transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / EXAM_QUESTIONS) * 100}%` }}
        />
      </div>

      {/* Question Navigator Grid */}
      <div className="bg-[#1b1b32] rounded-md p-4">
        <div className="flex flex-wrap gap-1.5">
          {examQuestions.map((_, i) => {
            const isAnswered = selectedAnswers[i] !== undefined
            const isCurrent = i === currentIndex
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to question ${i + 1}${isAnswered ? ' (answered)' : ''}`}
                className={`w-8 h-8 rounded text-xs font-bold transition-all duration-150 ${
                  isCurrent
                    ? 'bg-[#f1be32] text-[#0a0a23] scale-110'
                    : isAnswered
                      ? 'bg-[#dbb8ff]/20 text-[#dbb8ff] border border-[#dbb8ff]/40'
                      : 'bg-[#2a2a40] text-[#a5abc4] border border-[#3b3b4f] hover:border-[#a5abc4]'
                }`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>
      </div>

      <QuestionCard
        key={q.id}
        question={q}
        onAnswer={(ans) => setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: ans }))}
        answered={false}
        selectedChoice={selectedAnswers[currentIndex]}
        examMode={true}
      />

      <div className="flex justify-between">
        <button
          id="exam-prev-btn"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-5 py-2 rounded text-sm font-bold text-[#f5f6f7] border border-[#f5f6f7] hover:bg-[#f5f6f7]/10 disabled:opacity-30 transition-all duration-200"
        >
          Previous
        </button>
        {currentIndex < EXAM_QUESTIONS - 1 ? (
          <button
            id="exam-next-btn"
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="px-5 py-2 rounded text-sm font-bold bg-[#f1be32] hover:opacity-90 text-[#0a0a23] transition-all duration-200"
          >
            Next
          </button>
        ) : (
          <button
            id="exam-submit-btn"
            onClick={finishExam}
            className="px-5 py-2 rounded text-sm font-bold bg-[#acd157] hover:opacity-90 text-[#0a0a23] transition-all duration-200"
          >
            Submit Exam
          </button>
        )}
      </div>
    </div>
  )
}
