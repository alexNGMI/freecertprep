import { useState, useMemo } from 'react'
import { useCert } from '../../hooks/useCert'
import { useProgress } from '../../hooks/useProgress'
import { useBookmarks } from '../../hooks/useBookmarks'
import { useQuestionStats } from '../../hooks/useQuestionStats'
import REQuestionCard from '../../components/REQuestionCard'
import { fisherYates, weightedSample } from '../../utils/shuffle'
import { isAnswerCorrect } from '../../utils/scoring'

const BLOCK_SIZE = 10
const SMART_PRACTICE = 'Smart Practice'

export default function REQuiz() {
  const cert = useCert()
  const questions = cert.questions
  const { bookmarkedIds, toggle: toggleBookmark, isBookmarked } = useBookmarks(cert.id)
  const { addQuizResult } = useProgress(cert.id)
  const { getWeightedPool, recordSession, trackedCount } = useQuestionStats(cert.id)

  const certDomains = cert.domains.map((d) => d.name)

  const [selectedDomain, setSelectedDomain] = useState(SMART_PRACTICE)
  const [setupStep, setSetupStep] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [sessionKey, setSessionKey] = useState(0)

  const activeMode =
    selectedDomain === SMART_PRACTICE ? 'smart' : selectedDomain === 'Bookmarked' ? 'bookmarked' : 'domain'

  const poolQuestions = useMemo(() => {
    if (selectedDomain === SMART_PRACTICE) return questions
    if (selectedDomain === 'All Domains') return questions
    if (selectedDomain === 'Bookmarked') return questions.filter((q) => bookmarkedIds.includes(q.id))
    return questions.filter((q) => q.domain === selectedDomain)
  }, [selectedDomain, questions, bookmarkedIds])

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
    setSessionKey((k) => k + 1)
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
      addQuizResult({ domain: selectedDomain, answers })
      recordSession(answers)
      setShowResult(true)
    }
  }

  // ─── Setup ──────────────────────────────────────────────────────────────────
  if (!quizStarted) {
    if (setupStep === 2) {
      const allDomains = ['All Domains', ...certDomains]
      return (
        <div className="space-y-8 animate-fade-up pt-2 max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSetupStep(1)
                setSelectedDomain(SMART_PRACTICE)
              }}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold text-slate-900">Select a Domain</h1>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2.5 shadow-sm">
            {allDomains.map((domain) => {
              const isSelected = selectedDomain === domain
              return (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`w-full px-5 py-3.5 rounded-xl text-left font-medium transition-all duration-200 border flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-600 border-rose-600 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-rose-300 hover:bg-rose-50/40'
                  }`}
                >
                  <span>{domain}</span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
            <p className="text-slate-500 text-sm">
              {poolQuestions.length} questions available · 10 selected randomly each session
            </p>
            <button
              onClick={startQuiz}
              disabled={poolQuestions.length === 0}
              className="w-full sm:w-auto font-bold px-9 py-3.5 rounded-xl transition-all bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Start Practice Session
            </button>
          </div>
        </div>
      )
    }

    const modes = [
      {
        id: 'smart',
        label: 'Smart Practice',
        description:
          trackedCount > 0
            ? `Weighted by your ${trackedCount} tracked questions — wrong answers surface more`
            : 'Builds a weakness profile as you practice — wrong answers surface more',
        action: () => setSelectedDomain(SMART_PRACTICE),
      },
      {
        id: 'bookmarked',
        label: 'Bookmarked',
        description:
          bookmarkedIds.length > 0
            ? `${bookmarkedIds.length} starred question${bookmarkedIds.length === 1 ? '' : 's'} — great for targeted review`
            : 'Star questions during a quiz to build your review list',
        action: () => setSelectedDomain('Bookmarked'),
      },
      {
        id: 'domain',
        label: 'Specific Domain',
        description: 'Focus your session on one exam domain',
        action: () => {
          setSetupStep(2)
          setSelectedDomain(certDomains[0])
        },
      },
    ]

    return (
      <div className="space-y-8 animate-fade-up pt-2">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Practice Quiz</h1>
          <p className="text-lg text-slate-500">Choose how you want to practice.</p>
        </div>

        <div className="grid grid-cols-1 gap-3 max-w-3xl mx-auto">
          {modes.map(({ id, label, description, action }) => {
            const isSelected = activeMode === id
            return (
              <button
                key={id}
                onClick={action}
                className={`w-full text-left px-6 py-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 shadow-sm ${
                  isSelected
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/40'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-slate-900">{label}</span>
                    {id === 'domain' && (
                      <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm mt-0.5 text-slate-500 leading-snug">{description}</p>
                </div>
                {id !== 'domain' && (
                  <div
                    className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-rose-600' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-rose-600" />}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {activeMode !== 'domain' && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto px-1">
            <p className="text-slate-500 text-sm">
              {activeMode === 'bookmarked' && poolQuestions.length === 0
                ? 'No bookmarks yet — star questions during a quiz to build your list'
                : activeMode === 'smart'
                  ? '10 questions per session · weighted by your weakest areas'
                  : `${poolQuestions.length} available · 10 randomly selected`}
            </p>
            <button
              onClick={startQuiz}
              disabled={poolQuestions.length === 0}
              className="w-full sm:w-auto font-bold px-9 py-3.5 rounded-xl transition-all bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Start Practice Session
            </button>
          </div>
        )}
      </div>
    )
  }

  // ─── Result ─────────────────────────────────────────────────────────────────
  if (showResult) {
    const correct = answers.filter((a) => a.correct).length
    const total = answers.length
    const pct = Math.round((correct / total) * 100)
    const passed = pct >= cert.passingScore
    const isSmartPractice = selectedDomain === SMART_PRACTICE

    return (
      <div className="space-y-10 animate-fade-up pt-2">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 text-center tracking-tight">Session Complete</h1>

        <div className="bg-white border border-slate-200 rounded-2xl p-10 md:p-14 text-center max-w-lg mx-auto shadow-sm relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1.5"
            style={{ backgroundColor: passed ? '#16a34a' : '#e11d48' }}
          />
          <p className={`text-7xl font-black mb-5 tracking-tighter ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>
            {pct}%
          </p>
          <p className="text-slate-500 text-xl font-medium mb-2">
            You got <span className="text-slate-900 font-bold">{correct}</span> out of{' '}
            <span className="text-slate-900 font-bold">{total}</span> correct
          </p>
          {isSmartPractice && (
            <p className="text-rose-600 text-xs font-semibold uppercase tracking-widest mb-8">
              Smart Practice — stats updated
            </p>
          )}
          {!isSmartPractice && <div className="mb-8" />}

          <div className="flex flex-col gap-3">
            <button
              onClick={startQuiz}
              className="font-bold px-9 py-3.5 rounded-xl transition-all bg-rose-600 text-white hover:bg-rose-700 w-full"
            >
              {isSmartPractice ? 'Next Smart Practice Block' : 'New 10-Question Block'}
            </button>
            <button
              onClick={() => {
                setQuizStarted(false)
                setSetupStep(1)
                setSelectedDomain(SMART_PRACTICE)
              }}
              className="font-semibold px-9 py-3.5 rounded-xl transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 w-full"
            >
              Change Mode
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Active quiz ────────────────────────────────────────────────────────────
  const currentQuestion = filteredQuestions[currentIndex]
  const currentAnswer = answers[currentIndex]
  const isSmartPractice = selectedDomain === SMART_PRACTICE

  return (
    <div className="space-y-7 animate-fade-up max-w-4xl mx-auto">
      <div className="flex items-end justify-between px-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900 hidden sm:block">Practice Quiz</h1>
          {isSmartPractice && (
            <span className="hidden sm:inline text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md uppercase tracking-widest">
              Smart Practice
            </span>
          )}
        </div>
        <span className="text-sm text-slate-500 font-semibold tracking-wide">
          Progress <span className="text-slate-900">{currentIndex + 1}</span> of {filteredQuestions.length}
        </span>
      </div>

      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
        <div
          className="h-full rounded-full bg-rose-600 transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
        />
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
            className="font-bold px-9 py-3.5 rounded-xl transition-all bg-rose-600 text-white hover:bg-rose-700 flex items-center justify-center min-w-[200px]"
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
