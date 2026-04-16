import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import { useQuestionStats } from '../hooks/useQuestionStats'
import { useBookmarks } from '../hooks/useBookmarks'
import QuestionCard from '../components/QuestionCard'
import { weightedSample } from '../utils/shuffle'
import { isAnswerCorrect } from '../utils/scoring'

const DRILL_QUESTIONS = 10
const DRILL_TIME = 600 // 10 minutes in seconds

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function timerColor(seconds) {
  const pct = seconds / DRILL_TIME
  if (pct > 0.5) return '#34d399' // emerald
  if (pct > 0.25) return '#fbbf24' // amber
  return '#f43f5e' // rose
}

export default function Drill() {
  const cert = useCert()
  const questions = cert.questions
  const { toggle: toggleBookmark, isBookmarked } = useBookmarks(cert.id)
  const { addQuizResult } = useProgress(cert.id)
  const { getWeightedPool, recordSession } = useQuestionStats(cert.id)

  const [drillStarted, setDrillStarted] = useState(false)
  const [sessionKey, setSessionKey] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(DRILL_TIME)
  const [showResult, setShowResult] = useState(false)

  // Weighted 10-question block — same Smart Practice pool
  const drillQuestions = useMemo(() => {
    return weightedSample(getWeightedPool(questions), DRILL_QUESTIONS)
  }, [questions, sessionKey, getWeightedPool]) // eslint-disable-line react-hooks/exhaustive-deps

  const endDrill = useCallback((finalAnswers) => {
    addQuizResult({ domain: 'Timed Drill', answers: finalAnswers })
    recordSession(finalAnswers)
    setShowResult(true)
  }, [addQuizResult, recordSession])

  // Keep a ref to the latest answers so the hard-stop timeout can read them
  // without needing answers in the effect dependency array.
  const answersRef = useRef(answers)
  useEffect(() => { answersRef.current = answers }, [answers])

  // Countdown + hard stop — scheduled once per drill start, not every tick.
  // setInterval handles display; setTimeout fires endDrill asynchronously
  // after the full drill duration so setState is never called synchronously
  // in the effect body.
  useEffect(() => {
    if (!drillStarted || showResult) return

    const tickId = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1))
    }, 1000)

    const stopId = setTimeout(() => {
      endDrill(answersRef.current)
    }, DRILL_TIME * 1000)

    return () => {
      clearInterval(tickId)
      clearTimeout(stopId)
    }
  }, [drillStarted, showResult, endDrill])

  const startDrill = () => {
    setCurrentIndex(0)
    setAnswers([])
    setTimeLeft(DRILL_TIME)
    setShowResult(false)
    setDrillStarted(true)
    setSessionKey(k => k + 1)
  }

  const handleAnswer = (selectedChoice) => {
    const question = drillQuestions[currentIndex]
    const correct = isAnswerCorrect(selectedChoice, question)
    setAnswers(prev => [
      ...prev,
      { questionId: question.id, domain: question.domain, selected: selectedChoice, correct },
    ])
  }

  const handleNext = () => {
    const newAnswers = answers // already updated via handleAnswer
    if (currentIndex < drillQuestions.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      endDrill(newAnswers)
    }
  }

  // ─── Setup ───────────────────────────────────────────────────────────────────
  if (!drillStarted) {
    return (
      <div className="space-y-10 animate-fade-up pt-4 max-w-2xl mx-auto">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100">Timed Drill</h1>
          <p className="text-lg text-zinc-400">10 questions. 10 minutes. Beat the clock.</p>
        </div>

        <div className="glass-panel rounded-2xl p-8 space-y-6">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: DRILL_QUESTIONS, label: 'Questions' },
              { value: '10:00', label: 'Time limit' },
              { value: `${cert.passingScore}%`, label: 'Passing' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-zinc-900/60 rounded-xl p-4 border border-white/5">
                <p className="text-2xl font-black text-zinc-100">{value}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div className="space-y-2.5 pt-2">
            {[
              'Questions weighted by your weakest areas',
              'Immediate feedback after each answer',
              'Timer runs out — session ends automatically',
              'Stats saved to your Smart Practice history',
            ].map(rule => (
              <div key={rule} className="flex items-center gap-3 text-sm text-zinc-400">
                <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {rule}
              </div>
            ))}
          </div>

          <button
            onClick={startDrill}
            className="w-full font-bold py-4 rounded-xl text-white text-lg transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            style={{ backgroundColor: cert.color }}
          >
            Start Drill
          </button>
        </div>
      </div>
    )
  }

  // ─── Results ──────────────────────────────────────────────────────────────────
  if (showResult) {
    const correct = answers.filter(a => a.correct).length
    const total = answers.length
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0
    const passed = pct >= cert.passingScore
    const timedOut = timeLeft === 0
    const timeUsed = DRILL_TIME - timeLeft
    const m = Math.floor(timeUsed / 60)
    const s = timeUsed % 60

    return (
      <div className="space-y-10 animate-fade-up pt-4 max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-zinc-100 text-center">Drill Complete</h1>

        <div className="glass-panel rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: passed ? '#34d399' : '#f43f5e' }} />

          {timedOut && (
            <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-4">Time ran out</p>
          )}

          <p className={`text-7xl font-black tracking-tighter mb-4 ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
            {pct}%
          </p>
          <p className="text-zinc-400 text-lg mb-2">
            <span className="text-zinc-200 font-bold">{correct}</span> of <span className="text-zinc-200 font-bold">{total}</span> correct
          </p>
          {!timedOut && (
            <p className="text-zinc-600 text-xs mb-6">Finished in {m}:{s.toString().padStart(2, '0')}</p>
          )}

          <div className="flex flex-col gap-3 mt-8">
            <button
              onClick={startDrill}
              className="font-bold px-10 py-3.5 rounded-xl text-white hover:brightness-110 hover:scale-105 transition-all w-full"
              style={{ backgroundColor: cert.color }}
            >
              New Drill
            </button>
            <button
              onClick={() => setDrillStarted(false)}
              className="font-semibold px-10 py-3.5 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-white/5 w-full transition-all"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Active drill ─────────────────────────────────────────────────────────────
  const currentQuestion = drillQuestions[currentIndex]
  const currentAnswer = answers[currentIndex]
  const color = timerColor(timeLeft)
  const timePct = (timeLeft / DRILL_TIME) * 100
  const isLastQuestion = currentIndex === drillQuestions.length - 1

  return (
    <div className="space-y-6 animate-fade-up max-w-4xl mx-auto">
      {/* Timer + progress row */}
      <div className="flex items-center justify-between px-1">
        <span className="text-sm text-zinc-400 font-semibold">
          Question <span className="text-zinc-200">{currentIndex + 1}</span> of {drillQuestions.length}
        </span>
        <div
          className="flex items-center gap-2 text-sm font-black tabular-nums transition-colors duration-1000"
          style={{ color }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Dual progress bars */}
      <div className="space-y-1.5">
        {/* Question progress */}
        <div className="h-1.5 bg-zinc-900/80 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / drillQuestions.length) * 100}%`, backgroundColor: cert.color }}
          />
        </div>
        {/* Time progress */}
        <div className="h-1.5 bg-zinc-900/80 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${timePct}%`, backgroundColor: color }}
          />
        </div>
      </div>

      <div className="mb-4">
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={handleAnswer}
          answered={!!currentAnswer}
          selectedChoice={currentAnswer?.selected}
          isBookmarked={isBookmarked(currentQuestion.id)}
          onToggleBookmark={toggleBookmark}
        />
      </div>

      {currentAnswer && (
        <div className="flex justify-end pt-2 animate-fade-up">
          <button
            onClick={handleNext}
            className="font-bold px-10 py-3.5 rounded-xl text-white hover:scale-105 transition-all flex items-center gap-2 min-w-[200px] justify-center"
            style={{ backgroundColor: cert.color }}
          >
            {isLastQuestion ? 'See Results' : (
              <>
                Next
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
