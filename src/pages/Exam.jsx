import { useCert } from '../hooks/useCert'
import { useExamSession } from '../hooks/useExamSession'
import QuestionCard from '../components/QuestionCard'
import { formatTime } from '../utils/time'

export default function Exam() {
  const cert = useCert()
  const questions = cert.questions
  const {
    answeredCount,
    currentIndex,
    currentQuestion,
    examQuestionCount: EXAM_QUESTIONS,
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
  } = useExamSession({ cert, questions, resultsPath: `/${cert.id}/results` })

  if (!started) {
    return (
      <div className="space-y-12 animate-fade-up pt-4 max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100">Exam Simulator</h1>
          <p className="text-xl text-zinc-400">Simulate the real <span className="text-zinc-200 font-semibold">{cert.title}</span> experience</p>
        </div>
        
        <div className="glass-panel rounded-2xl p-8 md:p-12 space-y-10">
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
              className="font-bold px-12 py-4 rounded-xl transition-all duration-300 text-zinc-950 hover:scale-105 text-lg w-full sm:w-auto"
              style={{ backgroundColor: cert.color }}
            >
              Begin Certification Exam
            </button>
          </div>
        </div>
      </div>
    )
  }

  const q = currentQuestion
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
            timerWarning ? 'text-rose-400 animate-timer-pulse scale-105' : 'text-zinc-100'
          }`}
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
          style={{ width: `${((currentIndex + 1) / EXAM_QUESTIONS) * 100}%`, backgroundColor: cert.color }}
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
                onClick={() => goToQuestion(i)}
                aria-label={`Go to question ${i + 1}${isAnswered ? ' (answered)' : ''}`}
                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-200 ${
                  isCurrent
                    ? 'scale-110 ring-2 ring-offset-2 ring-offset-[#09090b] z-10 text-zinc-900 border-transparent'
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
        onAnswer={selectAnswer}
        answered={false}
        selectedChoice={selectedAnswers[currentIndex]}
        examMode={true}
      />

      <div className="flex justify-between items-center pt-2">
        <button
          id="exam-prev-btn"
          onClick={goPrevious}
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-lg text-sm font-semibold text-zinc-300 border border-zinc-700 hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          Previous
        </button>
        
        {currentIndex < EXAM_QUESTIONS - 1 ? (
          <button
            id="exam-next-btn"
            onClick={goNext}
            className="px-8 py-3 rounded-lg text-sm font-bold transition-all duration-300 text-zinc-950 hover:scale-105"
            style={{ backgroundColor: cert.color }}
          >
            Next Question
          </button>
        ) : (
          <button
            id="exam-submit-btn"
            onClick={finishExam}
            className="px-8 py-3 rounded-lg text-sm font-bold bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-300"
          >
            Submit Entire Exam
          </button>
        )}
      </div>
    </div>
  )
}
