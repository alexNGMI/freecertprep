import { useCert } from '../../hooks/useCert'
import { useBookmarks } from '../../hooks/useBookmarks'
import { useTimedDrillSession } from '../../hooks/useTimedDrillSession'
import REQuestionCard from '../../components/REQuestionCard'
import { formatTime, timerColor, TIMER_PALETTE_LIGHT } from '../../utils/time'

const DRILL_QUESTIONS = 10
const DRILL_TIME = 600 // 10 minutes in seconds

export default function REDrill() {
  const cert = useCert()
  const questions = cert.questions
  const { toggle: toggleBookmark, isBookmarked } = useBookmarks(cert.id)
  const {
    answers,
    backToSetup,
    currentAnswer,
    currentIndex,
    currentQuestion,
    drillQuestions,
    drillStarted,
    handleAnswer,
    handleNext,
    isLastQuestion,
    showResult,
    startDrill,
    timeLeft,
  } = useTimedDrillSession({ cert, questions, questionCount: DRILL_QUESTIONS, duration: DRILL_TIME })

  // ─── Setup ──────────────────────────────────────────────────────────────────
  if (!drillStarted) {
    return (
      <div className="space-y-8 animate-fade-up pt-2 max-w-2xl mx-auto">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Timed Drill</h1>
          <p className="text-lg text-slate-500">10 questions. 10 minutes. Beat the clock.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: DRILL_QUESTIONS, label: 'Questions' },
              { value: '10:00', label: 'Time limit' },
              { value: `${cert.passingScore}%`, label: 'Passing' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-2xl font-black text-slate-900">{value}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 pt-2">
            {[
              'Questions weighted by your weakest areas',
              'Immediate feedback after each answer',
              'Timer runs out — session ends automatically',
              'Stats saved to your Smart Practice history',
            ].map((rule) => (
              <div key={rule} className="flex items-center gap-3 text-sm text-slate-500">
                <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {rule}
              </div>
            ))}
          </div>

          <button
            onClick={startDrill}
            className="w-full font-bold py-4 rounded-xl text-white text-lg bg-rose-600 hover:bg-rose-700 transition-all hover:-translate-y-0.5"
          >
            Start Drill
          </button>
        </div>
      </div>
    )
  }

  // ─── Results ────────────────────────────────────────────────────────────────
  if (showResult) {
    const correct = answers.filter((a) => a.correct).length
    const total = answers.length
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0
    const passed = pct >= cert.passingScore
    const timedOut = timeLeft === 0
    const timeUsed = DRILL_TIME - timeLeft

    return (
      <div className="space-y-8 animate-fade-up pt-2 max-w-lg mx-auto">
        <h1 className="text-4xl font-black text-slate-900 text-center tracking-tight">Drill Complete</h1>

        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1.5"
            style={{ backgroundColor: passed ? '#16a34a' : '#e11d48' }}
          />
          {timedOut && (
            <p className="text-rose-600 text-xs font-bold uppercase tracking-widest mb-4">Time ran out</p>
          )}
          <p className={`text-7xl font-black tracking-tighter mb-4 ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>
            {pct}%
          </p>
          <p className="text-slate-500 text-lg mb-2">
            <span className="text-slate-900 font-bold">{correct}</span> of{' '}
            <span className="text-slate-900 font-bold">{total}</span> correct
          </p>
          {!timedOut && (
            <p className="text-slate-400 text-xs mb-6">
              Finished in {formatTime(timeUsed)}
            </p>
          )}

          <div className="flex flex-col gap-3 mt-8">
            <button
              onClick={startDrill}
              className="font-bold px-9 py-3.5 rounded-xl text-white bg-rose-600 hover:bg-rose-700 transition-all w-full"
            >
              New Drill
            </button>
            <button
              onClick={backToSetup}
              className="font-semibold px-9 py-3.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 w-full transition-all"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Active drill ───────────────────────────────────────────────────────────
  const color = timerColor(timeLeft, DRILL_TIME, TIMER_PALETTE_LIGHT)
  const timePct = (timeLeft / DRILL_TIME) * 100

  return (
    <div className="space-y-6 animate-fade-up max-w-4xl mx-auto">
      <div className="flex items-center justify-between px-1">
        <span className="text-sm text-slate-500 font-semibold">
          Question <span className="text-slate-900">{currentIndex + 1}</span> of {drillQuestions.length}
        </span>
        <div className="flex items-center gap-2 text-sm font-black tabular-nums" style={{ color }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full rounded-full bg-rose-600 transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / drillQuestions.length) * 100}%` }}
          />
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${timePct}%`, backgroundColor: color }}
          />
        </div>
      </div>

      <REQuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={handleAnswer}
        answered={!!currentAnswer}
        selectedChoice={currentAnswer?.selected}
        isBookmarked={isBookmarked(currentQuestion.id)}
        onToggleBookmark={toggleBookmark}
      />

      {currentAnswer && (
        <div className="flex justify-end pt-1 animate-fade-up">
          <button
            onClick={handleNext}
            className="font-bold px-9 py-3.5 rounded-xl text-white bg-rose-600 hover:bg-rose-700 transition-all flex items-center gap-2 min-w-[200px] justify-center"
          >
            {isLastQuestion ? (
              'See Results'
            ) : (
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
