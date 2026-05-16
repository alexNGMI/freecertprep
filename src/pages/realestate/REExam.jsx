import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCert } from '../../hooks/useCert'
import { useProgress } from '../../hooks/useProgress'
import REQuestionCard from '../../components/REQuestionCard'
import { weightedSelect, selectLicensingExam } from '../../utils/exam-selection'
import { isAnswerCorrect } from '../../utils/scoring'

export default function REExam() {
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
  const { reCert } = useParams()
  const timerRef = useRef(null)
  const selectedAnswersRef = useRef(selectedAnswers)

  // State-licensing certs (e.g. real-estate-tx) carry a `composite` config
  // and compose the exam as national + state portions to mirror the real
  // two-section structure. Plain certs use straight domain-weighted select.
  const [examQuestions] = useState(() =>
    cert.composite
      ? selectLicensingExam(questions, cert.composite)
      : weightedSelect(questions, EXAM_QUESTIONS, cert.domains)
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
    navigate(`/real-estate/study/${reCert}/results`, { state: { answers, questions: examQuestions } })
  }, [examQuestions, addExamResult, navigate, reCert])

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
      <div className="space-y-10 animate-fade-up pt-2 max-w-3xl mx-auto">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Exam Simulator</h1>
          <p className="text-lg text-slate-500">
            Simulate the real <span className="text-slate-900 font-semibold">PSI National</span> salesperson exam.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 space-y-10 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: 'Questions', value: EXAM_QUESTIONS },
              { label: 'Time Limit', value: `${cert.examTime} min` },
              { label: 'Passing Score', value: `${cert.passingScore}%` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">{label}</p>
                <p className="text-slate-900 font-black text-3xl">{value}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setStarted(true)}
              className="font-bold px-12 py-4 rounded-xl transition-all bg-rose-600 text-white hover:bg-rose-700 hover:-translate-y-0.5 text-lg w-full sm:w-auto"
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
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-up">
      <div
        className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-6 py-4 border-b-2 shadow-sm"
        style={{ borderBottomColor: timerWarning ? '#e11d48' : '#dc2626' }}
      >
        <span className="text-sm text-slate-500 font-semibold tracking-wide hidden sm:block">
          Question <span className="text-slate-900">{currentIndex + 1}</span> of {EXAM_QUESTIONS}
        </span>
        <span
          className={`font-mono font-bold text-2xl tracking-tighter ${
            timerWarning ? 'text-rose-600 animate-timer-pulse' : 'text-slate-900'
          }`}
          aria-label={`Time remaining: ${formatTime(timeLeft)}`}
        >
          {formatTime(timeLeft)}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 hidden sm:inline-block">
            {answeredCount}/{EXAM_QUESTIONS} answered
          </span>
          <button
            onClick={finishExam}
            className="text-sm font-semibold transition-all px-4 py-1.5 rounded-md border border-rose-300 text-rose-600 hover:bg-rose-50"
          >
            End Exam
          </button>
        </div>
      </div>

      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-rose-600 transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / EXAM_QUESTIONS) * 100}%` }}
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex flex-wrap gap-2 justify-center">
          {examQuestions.map((_, i) => {
            const isAnswered = selectedAnswers[i] !== undefined
            const isCurrent = i === currentIndex
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to question ${i + 1}${isAnswered ? ' (answered)' : ''}`}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-all duration-200 ${
                  isCurrent
                    ? 'bg-rose-600 text-white scale-110'
                    : isAnswered
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                      : 'bg-slate-50 text-slate-400 border border-slate-200 hover:border-slate-400 hover:text-slate-600'
                }`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>
      </div>

      <REQuestionCard
        key={q.id}
        question={q}
        onAnswer={(ans) => setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: ans }))}
        answered={false}
        selectedChoice={selectedAnswers[currentIndex]}
        examMode={true}
      />

      <div className="flex justify-between items-center pt-1">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-lg text-sm font-semibold text-slate-600 border border-slate-300 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          Previous
        </button>

        {currentIndex < EXAM_QUESTIONS - 1 ? (
          <button
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="px-8 py-3 rounded-lg text-sm font-bold transition-all bg-rose-600 text-white hover:bg-rose-700"
          >
            Next Question
          </button>
        ) : (
          <button
            onClick={finishExam}
            className="px-8 py-3 rounded-lg text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all"
          >
            Submit Entire Exam
          </button>
        )}
      </div>
    </div>
  )
}
