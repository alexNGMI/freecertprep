import { useState, useEffect, useRef } from 'react'
import questions from '../data/questions.json'
import { useProgress } from '../hooks/useProgress'
import { useNavigate } from 'react-router-dom'

const EXAM_TIME = 90 * 60 // 90 minutes in seconds
const EXAM_QUESTIONS = 65

export default function Exam() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME)
  const [finished, setFinished] = useState(false)
  const { addExamResult } = useProgress()
  const navigate = useNavigate()
  const timerRef = useRef(null)

  // Randomly select 65 unique questions from the pool
  const examQuestions = useState(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, EXAM_QUESTIONS)
  })[0]

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
  }, [started, finished])

  const finishExam = () => {
    setFinished(true)
    clearInterval(timerRef.current)
    const answers = examQuestions.map((q, i) => ({
      questionId: q.id,
      domain: q.domain,
      selected: selectedAnswers[i] ?? -1,
      correct: selectedAnswers[i] === q.correctAnswer,
    }))
    addExamResult({ answers })
    navigate('/results', { state: { answers, questions: examQuestions } })
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  if (!started) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-3 pt-4">
          <h1 className="text-4xl font-bold text-[#f5f6f7]">Exam Simulator</h1>
          <p className="text-lg text-[#d0d0d5]">Simulate the real AWS CLF-C02 exam experience</p>
        </div>
        <div className="bg-[#1b1b32] rounded-md p-8 space-y-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#2a2a40] rounded-md p-4 text-center">
              <p className="text-xs text-[#a5abc4] uppercase tracking-wider font-bold mb-1">Questions</p>
              <p className="text-[#f5f6f7] font-bold text-2xl">65</p>
            </div>
            <div className="bg-[#2a2a40] rounded-md p-4 text-center">
              <p className="text-xs text-[#a5abc4] uppercase tracking-wider font-bold mb-1">Time Limit</p>
              <p className="text-[#f5f6f7] font-bold text-2xl">90 min</p>
            </div>
            <div className="bg-[#2a2a40] rounded-md p-4 text-center">
              <p className="text-xs text-[#a5abc4] uppercase tracking-wider font-bold mb-1">Passing Score</p>
              <p className="text-[#f5f6f7] font-bold text-2xl">70%</p>
            </div>
          </div>
          <div className="text-center">
            <button
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

  return (
    <div className="space-y-4">
      {/* Timer bar */}
      <div className="flex items-center justify-between bg-[#1b1b32] rounded-md px-5 py-3">
        <span className="text-sm text-[#d0d0d5] font-bold">
          Question {currentIndex + 1} of {EXAM_QUESTIONS}
        </span>
        <span className={`font-mono font-bold text-lg ${timeLeft < 300 ? 'text-red-400' : 'text-[#f1be32]'}`}>
          {formatTime(timeLeft)}
        </span>
        <button
          onClick={finishExam}
          className="text-sm text-[#a5abc4] hover:text-[#f5f6f7] font-bold transition-colors border border-[#3b3b4f] px-3 py-1 rounded hover:border-[#f5f6f7]"
        >
          End Exam
        </button>
      </div>

      {/* Progress */}
      <div className="h-2 bg-[#2a2a40] rounded overflow-hidden">
        <div
          className="h-full bg-[#dbb8ff] rounded transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / EXAM_QUESTIONS) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-[#1b1b32] rounded-md p-6 space-y-5">
        <span className="inline-block text-xs font-bold px-3 py-1 rounded bg-[#2a2a40] text-[#a5abc4] uppercase tracking-wide">
          {q.domain}
        </span>
        <p className="text-[#f5f6f7] text-lg leading-relaxed">{q.question}</p>
        <div className="space-y-3">
          {q.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() =>
                setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: index }))
              }
              className={`w-full text-left px-5 py-3.5 rounded border transition-all duration-200 text-sm ${
                selectedAnswers[currentIndex] === index
                  ? 'border-[#f1be32] bg-[#f1be32]/10 text-[#f1be32]'
                  : 'border-[#3b3b4f] bg-[#2a2a40] text-[#d0d0d5] hover:border-[#99c9ff] hover:text-[#f5f6f7]'
              }`}
            >
              <span className="font-bold mr-3 text-[#a5abc4]">{String.fromCharCode(65 + index)}.</span>
              {choice}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-5 py-2 rounded text-sm font-bold text-[#f5f6f7] border border-[#f5f6f7] hover:bg-[#f5f6f7]/10 disabled:opacity-30 transition-all duration-200"
        >
          Previous
        </button>
        {currentIndex < EXAM_QUESTIONS - 1 ? (
          <button
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="px-5 py-2 rounded text-sm font-bold bg-[#f1be32] hover:opacity-90 text-[#0a0a23] transition-all duration-200"
          >
            Next
          </button>
        ) : (
          <button
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
