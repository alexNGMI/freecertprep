import { useState, useEffect, useRef, useCallback } from 'react'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import { useNavigate } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'

function fisherYates(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Select questions proportional to domain weights (largest-remainder rounding).
// Falls back to uniform random if cert has no domain config.
function weightedSelect(questions, count, domains) {
  if (!domains?.length) {
    return fisherYates(questions).slice(0, count)
  }

  // Group questions by domain name
  const byDomain = {}
  for (const q of questions) {
    if (!byDomain[q.domain]) byDomain[q.domain] = []
    byDomain[q.domain].push(q)
  }

  // Largest-remainder allocation so totals always equal count
  const exact = domains.map(d => ({ name: d.name, exact: (d.weight / 100) * count }))
  const floors = exact.map(d => ({ ...d, alloc: Math.floor(d.exact), remainder: d.exact - Math.floor(d.exact) }))
  let remainder = count - floors.reduce((s, d) => s + d.alloc, 0)
  floors.sort((a, b) => b.remainder - a.remainder)
  for (let i = 0; i < remainder; i++) floors[i].alloc += 1

  // Pick allocated questions from each domain (shuffle pool first)
  const picked = []
  let leftover = 0
  for (const { name, alloc } of floors) {
    const pool = fisherYates(byDomain[name] || [])
    const take = Math.min(alloc, pool.length)
    picked.push(...pool.slice(0, take))
    leftover += alloc - take   // track shortfall if domain has fewer questions than allocated
  }

  // Fill any shortfall with random questions not already picked
  if (leftover > 0) {
    const pickedIds = new Set(picked.map(q => q.id))
    const extra = fisherYates(questions.filter(q => !pickedIds.has(q.id)))
    picked.push(...extra.slice(0, leftover))
  }

  // Final shuffle so domain blocks aren't visible in question order
  return fisherYates(picked)
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

  const [examQuestions] = useState(() => weightedSelect(questions, EXAM_QUESTIONS, cert.domains))

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
      <div className="space-y-12 animate-fade-up pt-4 max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100">Exam Simulator</h1>
          <p className="text-xl text-zinc-400">Simulate the real <span className="text-zinc-200 font-semibold">{cert.title}</span> experience</p>
        </div>
        
        <div className="glass-panel rounded-2xl p-8 md:p-12 space-y-10 shadow-xl" style={{ boxShadow: `0 20px 60px -15px ${cert.color}20` }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 text-center shadow-inner">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">Questions</p>
              <p className="text-zinc-100 font-bold text-4xl">{EXAM_QUESTIONS}</p>
            </div>
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 text-center shadow-inner">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">Time Limit</p>
              <div className="flex items-center justify-center gap-1 text-zinc-100 font-bold text-4xl">
                <span>{cert.examTime}</span>
                <span className="text-base text-zinc-500 font-medium">min</span>
              </div>
            </div>
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 text-center shadow-inner">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">Passing Score</p>
              <p className="text-zinc-100 font-bold text-4xl">{cert.passingScore}%</p>
            </div>
          </div>
          
          <div className="text-center pt-4">
            <button
              id="begin-exam-btn"
              onClick={() => setStarted(true)}
              className="font-bold px-12 py-4 rounded-xl transition-all duration-300 text-zinc-950 hover:scale-105 shadow-xl text-lg w-full sm:w-auto"
              style={{ backgroundColor: cert.color, boxShadow: `0 10px 30px -5px ${cert.color}` }}
            >
              Begin Certification Exam
            </button>
          </div>
        </div>
      </div>
    )
  }

  const q = examQuestions[currentIndex]
  const timerWarning = timeLeft < 300

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-up">
      {/* Top dashboard bar */}
      <div className="flex items-center justify-between glass-panel rounded-xl px-6 py-4 border-b-2" style={{ borderBottomColor: timerWarning ? '#f43f5e' : cert.color }}>
        <span className="text-sm text-zinc-400 font-semibold tracking-wide hidden sm:block">
          Question <span className="text-zinc-100">{currentIndex + 1}</span> of {EXAM_QUESTIONS}
        </span>
        <span
          className={`font-mono font-bold text-2xl tracking-tighter transition-all duration-300 ${
            timerWarning ? 'text-rose-400 animate-timer-pulse translate-scale-[1.05]' : 'text-zinc-100'
          }`}
          style={!timerWarning ? { textShadow: `0 0 20px ${cert.color}80` } : { textShadow: '0 0 20px rgba(244,63,94,0.6)' }}
          aria-label={`Time remaining: ${formatTime(timeLeft)}`}
        >
          {formatTime(timeLeft)}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-zinc-500 bg-zinc-900/50 px-3 py-1.5 rounded-md border border-white/5 hidden sm:inline-block">
            {answeredCount}/{EXAM_QUESTIONS} answered
          </span>
          <button
            id="end-exam-btn"
            onClick={finishExam}
            className="text-sm font-semibold transition-all px-4 py-1.5 rounded-md border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 hover:border-rose-400"
          >
            End Exam
          </button>
        </div>
      </div>

      <div className="h-1.5 bg-zinc-900/80 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / EXAM_QUESTIONS) * 100}%`, backgroundColor: cert.color, boxShadow: `0 0 10px ${cert.color}` }}
        />
      </div>

      {/* Question Navigator Grid */}
      <div className="glass-panel rounded-xl p-5 border-white/5">
        <div className="flex flex-wrap gap-2 justify-center">
          {examQuestions.map((_, i) => {
            const isAnswered = selectedAnswers[i] !== undefined
            const isCurrent = i === currentIndex
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to question ${i + 1}${isAnswered ? ' (answered)' : ''}`}
                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-200 ${
                  isCurrent
                    ? 'scale-110 shadow-[0_0_15px_-3px_currentColor] z-10 text-zinc-900'
                    : isAnswered
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-zinc-900/80 text-zinc-500 border border-zinc-700/50 hover:border-zinc-500 hover:text-zinc-300'
                }`}
                style={isCurrent ? { backgroundColor: cert.color } : {}}
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

      <div className="flex justify-between items-center pt-2">
        <button
          id="exam-prev-btn"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-lg text-sm font-semibold text-zinc-300 border border-zinc-700 hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          Previous
        </button>
        
        {currentIndex < EXAM_QUESTIONS - 1 ? (
          <button
            id="exam-next-btn"
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="px-8 py-3 rounded-lg text-sm font-bold transition-all duration-300 text-zinc-950 hover:scale-105"
            style={{ backgroundColor: cert.color, boxShadow: `0 10px 20px -5px ${cert.color}80` }}
          >
            Next Question
          </button>
        ) : (
          <button
            id="exam-submit-btn"
            onClick={finishExam}
            className="px-8 py-3 rounded-lg text-sm font-bold bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-300 shadow-[0_10px_20px_-5px_#6366f1]"
          >
            Submit Entire Exam
          </button>
        )}
      </div>
    </div>
  )
}
