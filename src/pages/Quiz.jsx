import { useState, useMemo } from 'react'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import { useBookmarks } from '../hooks/useBookmarks'
import { useQuestionStats } from '../hooks/useQuestionStats'
import QuestionCard from '../components/QuestionCard'
import { fisherYates, weightedSample } from '../utils/shuffle'
import { isAnswerCorrect } from '../utils/scoring'

const BLOCK_SIZE = 10
const SMART_PRACTICE = 'Smart Practice'

export default function Quiz() {
  const cert = useCert()
  const questions = cert.questions
  const { bookmarkedIds, toggle: toggleBookmark, isBookmarked } = useBookmarks(cert.id)
  const { addQuizResult } = useProgress(cert.id)
  const { getWeightedPool, recordSession, trackedCount } = useQuestionStats(cert.id)

  const domainNames = [SMART_PRACTICE, 'All Domains', 'Bookmarked', ...cert.domains.map((d) => d.name)]

  const [selectedDomain, setSelectedDomain] = useState(SMART_PRACTICE)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [sessionKey, setSessionKey] = useState(0)

  // Full unshuffled pool — used for count display on setup screen
  const poolQuestions = useMemo(() => {
    if (selectedDomain === SMART_PRACTICE) return questions
    if (selectedDomain === 'All Domains') return questions
    if (selectedDomain === 'Bookmarked') return questions.filter((q) => bookmarkedIds.includes(q.id))
    return questions.filter((q) => q.domain === selectedDomain)
  }, [selectedDomain, questions, bookmarkedIds])

  // Active 10-question block for the session.
  // Smart Practice: weighted sample across all questions (cross-domain).
  // Everything else: random slice from the domain pool.
  // getWeightedPool is stable during a session (certStats only changes at session end).
  const filteredQuestions = useMemo(() => {
    if (selectedDomain === SMART_PRACTICE) {
      return weightedSample(getWeightedPool(questions), BLOCK_SIZE)
    }
    return fisherYates(poolQuestions).slice(0, BLOCK_SIZE)
  }, [selectedDomain, poolQuestions, sessionKey, questions, getWeightedPool]) // eslint-disable-line react-hooks/exhaustive-deps

  const startQuiz = () => {
    setCurrentIndex(0)
    setAnswers([])
    setShowResult(false)
    setQuizStarted(true)
    setSessionKey(k => k + 1)
  }

  const handleAnswer = (selectedChoice) => {
    const question = filteredQuestions[currentIndex]
    const correct = isAnswerCorrect(selectedChoice, question)
    setAnswers((prev) => [
      ...prev,
      { questionId: question.id, domain: question.domain, selected: selectedChoice, correct },
    ])
  }

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      // Session complete — save to both history and per-question stats
      addQuizResult({ domain: selectedDomain, answers })
      recordSession(answers)
      setShowResult(true)
    }
  }

  // ─── Setup screen ────────────────────────────────────────────────────────────
  if (!quizStarted) {
    const isSmartPractice = selectedDomain === SMART_PRACTICE
    const blockSize = Math.min(BLOCK_SIZE, poolQuestions.length)

    return (
      <div className="space-y-12 animate-fade-up pt-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100">Practice Quiz</h1>
          <p className="text-xl text-zinc-400">Target a specific domain or let Smart Practice find your weak spots.</p>
        </div>

        <div className="glass-panel rounded-2xl p-8 md:p-12 space-y-8 max-w-3xl mx-auto">
          <div className="space-y-4">
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
              Select Mode
            </label>
            <div className="flex flex-col gap-3">
              {domainNames.map((domain) => {
                const isSelected = selectedDomain === domain
                const isSmart = domain === SMART_PRACTICE
                return (
                  <button
                    key={domain}
                    onClick={() => setSelectedDomain(domain)}
                    className={`px-6 py-4 rounded-xl text-left font-medium transition-all duration-300 border shadow-sm flex items-center justify-between group ${
                      isSelected
                        ? isSmart
                          ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-100 scale-[1.01]'
                          : 'bg-zinc-100 text-zinc-950 scale-[1.01]'
                        : 'border-white/5 bg-zinc-900/50 text-zinc-300 hover:border-white/20 hover:bg-zinc-800'
                    }`}
                    style={isSelected && !isSmart ? { borderColor: cert.color } : {}}
                  >
                    <div className="flex items-center gap-3">
                      {isSmart && (
                        <svg className={`w-4 h-4 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-zinc-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                      <div>
                        <span>{domain}</span>
                        {isSmart && (
                          <span className={`ml-2 text-xs font-normal ${isSelected ? 'text-indigo-300' : 'text-zinc-600'}`}>
                            {trackedCount > 0 ? `· ${trackedCount} questions tracked` : '· builds as you practice'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                      isSelected
                        ? isSmart ? 'border-indigo-400' : 'border-zinc-950'
                        : 'border-zinc-600 group-hover:border-zinc-400'
                    }`}>
                      {isSelected && (
                        <div className={`w-2.5 h-2.5 rounded-full ${isSmart ? 'bg-indigo-400' : 'bg-zinc-950'}`} />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
            <div className="space-y-1">
              {selectedDomain === 'Bookmarked' && poolQuestions.length === 0 ? (
                <p className="text-zinc-400 text-sm font-medium">No bookmarks yet — star questions during a quiz</p>
              ) : isSmartPractice ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20 text-sm">
                      {BLOCK_SIZE}
                    </span>
                    <span className="text-zinc-300 text-sm font-semibold">Questions per session</span>
                  </div>
                  <p className="text-zinc-500 text-xs pl-1">
                    {trackedCount > 0
                      ? `Prioritising your ${trackedCount} weakest questions across all domains`
                      : 'Randomly selected until you build a history — then weighted by weakness'}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 text-sm">
                      {blockSize}
                    </span>
                    <span className="text-zinc-300 text-sm font-semibold">Questions per session</span>
                  </div>
                  <p className="text-zinc-500 text-xs pl-1">{poolQuestions.length} total available · randomly selected each time</p>
                </>
              )}
            </div>

            <button
              id="start-quiz-btn"
              onClick={startQuiz}
              disabled={poolQuestions.length === 0}
              className="w-full md:w-auto font-semibold px-10 py-3.5 rounded-xl transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
              style={{ backgroundColor: isSmartPractice ? '#6366f1' : cert.color }}
            >
              Start Practice Session
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Result screen ────────────────────────────────────────────────────────────
  if (showResult) {
    const correct = answers.filter((a) => a.correct).length
    const total = answers.length
    const pct = Math.round((correct / total) * 100)
    const passed = pct >= cert.passingScore
    const isSmartPractice = selectedDomain === SMART_PRACTICE

    return (
      <div className="space-y-12 animate-fade-up pt-4">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 text-center">Session Complete</h1>

        <div className="glass-panel rounded-2xl p-10 md:p-14 text-center max-w-lg mx-auto relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-2 opacity-80"
            style={{ backgroundColor: passed ? '#34d399' : '#f43f5e' }}
          />

          <p className={`text-7xl font-black mb-6 tracking-tighter ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
            {pct}%
          </p>
          <p className="text-zinc-400 text-xl font-medium mb-2">
            You got <span className="text-zinc-200 font-bold">{correct}</span> out of <span className="text-zinc-200 font-bold">{total}</span> correct
          </p>
          {isSmartPractice && (
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-8">
              Smart Practice — stats updated
            </p>
          )}
          {!isSmartPractice && <div className="mb-8" />}

          <div className="flex flex-col gap-3">
            <button
              id="quiz-try-again-btn"
              onClick={startQuiz}
              className="font-bold px-10 py-3.5 rounded-xl transition-all duration-300 text-white hover:scale-105 w-full"
              style={{ backgroundColor: isSmartPractice ? '#6366f1' : cert.color }}
            >
              {isSmartPractice ? 'Next Smart Practice Block' : 'New 10-Question Block'}
            </button>
            <button
              onClick={() => setQuizStarted(false)}
              className="font-semibold px-10 py-3.5 rounded-xl transition-all duration-300 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-white/5 w-full"
            >
              Change Mode
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Active quiz ──────────────────────────────────────────────────────────────
  const currentQuestion = filteredQuestions[currentIndex]
  const currentAnswer = answers[currentIndex]
  const isSmartPractice = selectedDomain === SMART_PRACTICE

  return (
    <div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <div className="flex items-end justify-between px-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-zinc-100 hidden sm:block">Practice Quiz</h1>
          {isSmartPractice && (
            <span className="hidden sm:inline text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md uppercase tracking-widest">
              Smart Practice
            </span>
          )}
        </div>
        <span className="text-sm text-zinc-400 font-semibold tracking-wide">
          Progress <span className="text-zinc-200">{currentIndex + 1}</span> of {filteredQuestions.length}
        </span>
      </div>

      <div className="h-2.5 bg-zinc-900/80 rounded-full overflow-hidden border border-white/5 shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out flex justify-end"
          style={{
            width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%`,
            backgroundColor: isSmartPractice ? '#6366f1' : cert.color,
          }}
        >
          <div className="w-10 h-full bg-white/30" />
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
            id="quiz-next-btn"
            onClick={handleNext}
            className="font-bold px-10 py-3.5 rounded-xl transition-all duration-300 text-white hover:scale-105 flex items-center justify-center min-w-[200px]"
            style={{ backgroundColor: isSmartPractice ? '#6366f1' : cert.color }}
          >
            {currentIndex < filteredQuestions.length - 1 ? (
              <>
                Next Question
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            ) : (
              'See Results'
            )}
          </button>
        </div>
      )}
    </div>
  )
}
