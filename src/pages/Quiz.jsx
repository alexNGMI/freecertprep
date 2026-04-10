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

  const certDomains = cert.domains.map((d) => d.name)

  const [selectedDomain, setSelectedDomain] = useState(SMART_PRACTICE)
  const [setupStep, setSetupStep] = useState(1)      // 1 = mode picker, 2 = domain picker
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [sessionKey, setSessionKey] = useState(0)

  // Derived: which top-level mode is active
  const activeMode = selectedDomain === SMART_PRACTICE ? 'smart'
    : selectedDomain === 'Bookmarked' ? 'bookmarked'
    : 'domain'

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
    const accentColor = activeMode === 'smart' ? '#6366f1' : cert.color

    // ── Step 2: domain picker ─────────────────────────────────────────────────
    if (setupStep === 2) {
      const allDomains = ['All Domains', ...certDomains]
      return (
        <div className="space-y-10 animate-fade-up pt-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setSetupStep(1); setSelectedDomain(SMART_PRACTICE) }}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold text-zinc-100">Select a Domain</h1>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3">
            {allDomains.map((domain) => {
              const isSelected = selectedDomain === domain
              return (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`w-full px-6 py-4 rounded-xl text-left font-medium transition-all duration-200 border flex items-center justify-between group ${
                    isSelected
                      ? 'text-zinc-950 scale-[1.01]'
                      : 'border-white/5 bg-zinc-900/50 text-zinc-300 hover:border-white/20 hover:bg-zinc-800'
                  }`}
                  style={isSelected ? { backgroundColor: cert.color, borderColor: cert.color } : {}}
                >
                  <span>{domain}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'border-zinc-950' : 'border-zinc-600 group-hover:border-zinc-400'
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-zinc-950" />}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
            <p className="text-zinc-500 text-sm">
              {poolQuestions.length} questions available · 10 selected randomly each session
            </p>
            <button
              id="start-quiz-btn"
              onClick={startQuiz}
              disabled={poolQuestions.length === 0}
              className="w-full sm:w-auto font-semibold px-10 py-3.5 rounded-xl transition-all duration-300 text-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
              style={{ backgroundColor: cert.color }}
            >
              Start Practice Session
            </button>
          </div>
        </div>
      )
    }

    // ── Step 1: mode picker ───────────────────────────────────────────────────
    const modes = [
      {
        id: 'smart',
        label: 'Smart Practice',
        description: trackedCount > 0
          ? `Weighted by your ${trackedCount} tracked questions — wrong answers surface more`
          : 'Builds a weakness profile as you practice — wrong answers surface more',
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        accent: '#6366f1',
        action: () => setSelectedDomain(SMART_PRACTICE),
      },
      {
        id: 'bookmarked',
        label: 'Bookmarked',
        description: bookmarkedIds.length > 0
          ? `${bookmarkedIds.length} starred question${bookmarkedIds.length === 1 ? '' : 's'} — great for targeted review`
          : 'Star questions during a quiz to build your review list',
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        ),
        accent: cert.color,
        action: () => setSelectedDomain('Bookmarked'),
      },
      {
        id: 'domain',
        label: 'Specific Domain',
        description: 'Focus your session on one exam domain',
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        ),
        accent: cert.color,
        action: () => { setSetupStep(2); setSelectedDomain(certDomains[0]) },
      },
    ]

    return (
      <div className="space-y-10 animate-fade-up pt-4">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100">Practice Quiz</h1>
          <p className="text-lg text-zinc-400">Choose how you want to practice.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
          {modes.map(({ id, label, description, icon, accent, action }) => {
            const isSelected = activeMode === id
            return (
              <button
                key={id}
                onClick={action}
                className={`w-full text-left px-7 py-6 rounded-2xl border transition-all duration-200 flex items-center gap-5 group ${
                  isSelected
                    ? 'scale-[1.01]'
                    : 'border-white/5 bg-zinc-900/50 hover:border-white/15 hover:bg-zinc-800/60'
                }`}
                style={isSelected
                  ? { borderColor: `${accent}60`, backgroundColor: `${accent}15` }
                  : {}
                }
              >
                {/* Icon */}
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border transition-all"
                  style={isSelected
                    ? { color: accent, backgroundColor: `${accent}20`, borderColor: `${accent}40` }
                    : { color: '#52525b', backgroundColor: '#18181b', borderColor: '#27272a' }
                  }
                >
                  {icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-lg leading-tight ${isSelected ? 'text-zinc-100' : 'text-zinc-300'}`}>
                      {label}
                    </span>
                    {id === 'domain' && (
                      <svg className={`w-4 h-4 shrink-0 transition-colors ${isSelected ? 'text-zinc-400' : 'text-zinc-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                  <p className={`text-sm mt-0.5 leading-snug ${isSelected ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {description}
                  </p>
                </div>

                {/* Selection indicator (not for domain since it goes to step 2) */}
                {id !== 'domain' && (
                  <div
                    className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                    style={isSelected
                      ? { borderColor: accent }
                      : { borderColor: '#52525b' }
                    }
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Start button — only for smart/bookmarked (domain goes to step 2 on click) */}
        {activeMode !== 'domain' && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto px-1">
            <p className="text-zinc-500 text-sm">
              {activeMode === 'bookmarked' && poolQuestions.length === 0
                ? 'No bookmarks yet — star questions during a quiz to build your list'
                : activeMode === 'smart'
                  ? '10 questions per session · weighted by your weakest areas'
                  : `${poolQuestions.length} available · 10 randomly selected`}
            </p>
            <button
              id="start-quiz-btn"
              onClick={startQuiz}
              disabled={poolQuestions.length === 0}
              className="w-full sm:w-auto font-semibold px-10 py-3.5 rounded-xl transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
              style={{ backgroundColor: accentColor }}
            >
              Start Practice Session
            </button>
          </div>
        )}
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
              onClick={() => { setQuizStarted(false); setSetupStep(1); setSelectedDomain(SMART_PRACTICE) }}
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
