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

  // For MVP, repeat questions to fill 65 slots
  const examQuestions = useState(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    const repeated = []
    while (repeated.length < EXAM_QUESTIONS) {
      repeated.push(...shuffled)
    }
    return repeated.slice(0, EXAM_QUESTIONS)
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Exam Simulator</h1>
          <p className="text-gray-400">Simulate the real AWS CLF-C02 exam experience</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-800 rounded p-3">
              <p className="text-gray-500">Questions</p>
              <p className="text-white font-bold text-lg">65</p>
            </div>
            <div className="bg-gray-800 rounded p-3">
              <p className="text-gray-500">Time Limit</p>
              <p className="text-white font-bold text-lg">90 min</p>
            </div>
            <div className="bg-gray-800 rounded p-3">
              <p className="text-gray-500">Passing Score</p>
              <p className="text-white font-bold text-lg">70%</p>
            </div>
            <div className="bg-gray-800 rounded p-3">
              <p className="text-gray-500">Available Questions</p>
              <p className="text-white font-bold text-lg">{questions.length}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Note: MVP uses {questions.length} sample questions repeated to fill 65 slots. Add more questions to questions.json for variety.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-violet-500 hover:bg-violet-600 text-white font-medium px-6 py-2 rounded transition-colors"
          >
            Begin Exam
          </button>
        </div>
      </div>
    )
  }

  const q = examQuestions[currentIndex]
  const answered = selectedAnswers[currentIndex] !== undefined

  return (
    <div className="space-y-4">
      {/* Timer bar */}
      <div className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
        <span className="text-sm text-gray-400">
          Question {currentIndex + 1} of {EXAM_QUESTIONS}
        </span>
        <span className={`font-mono font-bold ${timeLeft < 300 ? 'text-red-400' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </span>
        <button
          onClick={finishExam}
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          End Exam
        </button>
      </div>

      {/* Progress */}
      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / EXAM_QUESTIONS) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-4">
        <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-gray-800 text-gray-400">
          {q.domain}
        </span>
        <p className="text-white text-lg leading-relaxed">{q.question}</p>
        <div className="space-y-2">
          {q.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() =>
                setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: index }))
              }
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                selectedAnswers[currentIndex] === index
                  ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                  : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
              }`}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
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
          className="px-4 py-2 rounded text-sm font-medium bg-gray-800 text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
        >
          Previous
        </button>
        {currentIndex < EXAM_QUESTIONS - 1 ? (
          <button
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="px-4 py-2 rounded text-sm font-medium bg-violet-500 hover:bg-violet-600 text-white transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={finishExam}
            className="px-4 py-2 rounded text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
          >
            Submit Exam
          </button>
        )}
      </div>
    </div>
  )
}
