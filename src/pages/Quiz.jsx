import { useState, useMemo } from 'react'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import QuestionCard from '../components/QuestionCard'

export default function Quiz() {
  const cert = useCert()
  const questions = cert.questions
  const domainNames = ['All Domains', ...cert.domains.map((d) => d.name)]

  const [selectedDomain, setSelectedDomain] = useState('All Domains')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const { addQuizResult } = useProgress(cert.id)

  const filteredQuestions = useMemo(() => {
    if (selectedDomain === 'All Domains') return questions
    return questions.filter((q) => q.domain === selectedDomain)
  }, [selectedDomain, questions])

  const startQuiz = () => {
    setCurrentIndex(0)
    setAnswers([])
    setShowResult(false)
    setQuizStarted(true)
  }

  const handleAnswer = (selectedChoice) => {
    const question = filteredQuestions[currentIndex]
    const correct = selectedChoice === question.correctAnswer
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
      <div className="space-y-8 animate-fade-up">
        <div className="text-center space-y-3 pt-4">
          <h1 className="text-4xl font-bold text-[#f5f6f7]">Practice Quiz</h1>
          <p className="text-lg text-[#d0d0d5]">Select a domain and start practicing</p>
        </div>
        <div className="bg-[#1b1b32] rounded-md p-8 space-y-6 max-w-2xl mx-auto">
          <label className="block text-sm font-bold text-[#a5abc4] uppercase tracking-wider">Filter by Domain</label>
          <div className="flex flex-wrap gap-2">
            {domainNames.map((domain) => (
              <button
                key={domain}
                id={`domain-filter-${domain.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedDomain(domain)}
                className={`px-4 py-1.5 rounded text-sm font-bold transition-all duration-200 border ${
                  selectedDomain === domain
                    ? 'border-transparent text-[#0a0a23]'
                    : 'border-[#f5f6f7] text-[#f5f6f7] hover:bg-[#f5f6f7]/10'
                }`}
                style={selectedDomain === domain ? { backgroundColor: cert.color, borderColor: cert.color } : {}}
              >
                {domain}
              </button>
            ))}
          </div>
          <p className="text-sm text-[#a5abc4]">
            {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} available
          </p>
          <button
            id="start-quiz-btn"
            onClick={startQuiz}
            disabled={filteredQuestions.length === 0}
            className="font-bold px-8 py-2.5 rounded transition-all duration-200 text-[#0a0a23] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: cert.color }}
          >
            Start Learning
          </button>
        </div>
      </div>
    )
  }

  if (showResult) {
    const correct = answers.filter((a) => a.correct).length
    const total = answers.length
    const pct = Math.round((correct / total) * 100)
    return (
      <div className="space-y-8 animate-fade-up">
        <h1 className="text-4xl font-bold text-[#f5f6f7] text-center pt-4">Quiz Complete</h1>
        <div className="bg-[#1b1b32] rounded-md p-10 text-center space-y-5 max-w-md mx-auto">
          <p className={`text-6xl font-black ${pct >= cert.passingScore ? 'text-[#acd157]' : 'text-red-400'}`}>
            {pct}%
          </p>
          <p className="text-[#d0d0d5] text-lg">
            {correct} of {total} correct
          </p>
          <button
            id="quiz-try-again-btn"
            onClick={() => setQuizStarted(false)}
            className="font-bold px-8 py-2.5 rounded transition-all duration-200 text-[#0a0a23] hover:opacity-90"
            style={{ backgroundColor: cert.color }}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = filteredQuestions[currentIndex]
  const currentAnswer = answers[currentIndex]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#f5f6f7]">Practice Quiz</h1>
        <span className="text-sm text-[#a5abc4] font-bold">
          {currentIndex + 1} / {filteredQuestions.length}
        </span>
      </div>
      <div className="h-2 bg-[#2a2a40] rounded overflow-hidden">
        <div
          className="h-full rounded transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%`,
            backgroundColor: cert.color,
          }}
        />
      </div>
      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        answered={!!currentAnswer}
        selectedChoice={currentAnswer?.selected}
      />
      {currentAnswer && (
        <div className="flex justify-end">
          <button
            id="quiz-next-btn"
            onClick={handleNext}
            className="font-bold px-8 py-2.5 rounded transition-all duration-200 text-[#0a0a23] hover:opacity-90"
            style={{ backgroundColor: cert.color }}
          >
            {currentIndex < filteredQuestions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  )
}
