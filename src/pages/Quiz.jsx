import { useState, useMemo } from 'react'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import { useBookmarks } from '../hooks/useBookmarks'
import QuestionCard from '../components/QuestionCard'
import { fisherYates } from '../utils/shuffle'
import { isAnswerCorrect } from '../utils/scoring'

export default function Quiz() {
  const cert = useCert()
  const questions = cert.questions
  const { bookmarkedIds, toggle: toggleBookmark, isBookmarked } = useBookmarks(cert.id)
  const domainNames = ['All Domains', 'Bookmarked', ...cert.domains.map((d) => d.name)]

  const [selectedDomain, setSelectedDomain] = useState('All Domains')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [sessionKey, setSessionKey] = useState(0)
  const { addQuizResult } = useProgress(cert.id)

  const filteredQuestions = useMemo(() => {
    let pool
    if (selectedDomain === 'All Domains') {
      pool = questions
    } else if (selectedDomain === 'Bookmarked') {
      pool = questions.filter((q) => bookmarkedIds.includes(q.id))
    } else {
      pool = questions.filter((q) => q.domain === selectedDomain)
    }
    return fisherYates(pool)
  }, [selectedDomain, questions, sessionKey, bookmarkedIds])

  const startQuiz = () => {
    setCurrentIndex(0)
    setAnswers([])
    setShowResult(false)
    setQuizStarted(true)
    setSessionKey(k => k + 1)  // triggers fresh shuffle of filteredQuestions
  }

  const handleAnswer = (selectedChoice) => {
    const question = filteredQuestions[currentIndex]
    
    const correct = isAnswerCorrect(selectedChoice, question)

    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        domain: question.domain,
        selected: selectedChoice,
        correct,
      },
    ])
  }

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      addQuizResult({ domain: selectedDomain, answers })
      setShowResult(true)
    }
  }

  if (!quizStarted) {
    return (
      <div className="space-y-12 animate-fade-up pt-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100">Practice Quiz</h1>
          <p className="text-xl text-zinc-400">Target a specific domain or practice them all.</p>
        </div>
        
        <div className="glass-panel rounded-2xl p-8 md:p-12 space-y-8 max-w-3xl mx-auto">
          <div className="space-y-4">
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
              Select Focus Area
            </label>
            <div className="flex flex-col gap-3">
              {domainNames.map((domain) => (
                <button
                  key={domain}
                  id={`domain-filter-${domain.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-6 py-4 rounded-xl text-left font-medium transition-all duration-300 border shadow-sm flex items-center justify-between group ${
                    selectedDomain === domain
                      ? 'bg-zinc-100 text-zinc-950 scale-[1.01]'
                      : 'border-white/5 bg-zinc-900/50 text-zinc-300 hover:border-white/20 hover:bg-zinc-800'
                  }`}
                  style={selectedDomain === domain ? { borderColor: cert.color } : {}}
                >
                  <span>{domain}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedDomain === domain ? 'border-zinc-950' : 'border-zinc-600 group-hover:border-zinc-400'}`}>
                    {selectedDomain === domain && <div className="w-2.5 h-2.5 rounded-full bg-zinc-950" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                {filteredQuestions.length}
              </span>
              <span className="text-zinc-400 text-sm font-medium">
                {selectedDomain === 'Bookmarked' && filteredQuestions.length === 0
                  ? 'No bookmarks yet — star questions during a quiz'
                  : 'Questions available'}
              </span>
            </div>
            
            <button
              id="start-quiz-btn"
              onClick={startQuiz}
              disabled={filteredQuestions.length === 0}
              className="w-full md:w-auto font-semibold px-10 py-3.5 rounded-xl transition-all duration-300 text-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
              style={{ backgroundColor: cert.color }}
            >
              Start Practice Session
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showResult) {
    const correct = answers.filter((a) => a.correct).length
    const total = answers.length
    const pct = Math.round((correct / total) * 100)
    const passed = pct >= cert.passingScore
    
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
          <p className="text-zinc-400 text-xl font-medium mb-10">
            You got <span className="text-zinc-200 font-bold">{correct}</span> out of <span className="text-zinc-200 font-bold">{total}</span> correct
          </p>
          
          <button
            id="quiz-try-again-btn"
            onClick={() => setQuizStarted(false)}
            className="font-bold px-10 py-3.5 rounded-xl transition-all duration-300 bg-zinc-100 text-zinc-950 hover:bg-white hover:scale-105 border border-zinc-200 w-full"
          >
            Practice Again
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = filteredQuestions[currentIndex]
  const currentAnswer = answers[currentIndex]

  return (
    <div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <div className="flex items-end justify-between px-2">
        <h1 className="text-2xl font-bold text-zinc-100 hidden sm:block">Practice Quiz</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-400 font-semibold tracking-wide">
            Progress <span className="text-zinc-200">{currentIndex + 1}</span> of {filteredQuestions.length}
          </span>
        </div>
      </div>
      
      <div className="h-2.5 bg-zinc-900/80 rounded-full overflow-hidden border border-white/5 shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out flex justify-end"
          style={{
            width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%`,
            backgroundColor: cert.color
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
            className="font-bold px-10 py-3.5 rounded-xl transition-all duration-300 text-zinc-950 hover:scale-105 flex items-center justify-center min-w-[200px]"
            style={{ backgroundColor: cert.color }}
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
