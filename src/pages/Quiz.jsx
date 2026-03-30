import { useState, useMemo } from 'react'
import questions from '../data/questions.json'
import { useProgress } from '../hooks/useProgress'
import QuestionCard from '../components/QuestionCard'

const domains = [
  'All Domains',
  'Cloud Concepts',
  'Security and Compliance',
  'Cloud Technology and Services',
  'Billing, Pricing and Support',
]

export default function Quiz() {
  const [selectedDomain, setSelectedDomain] = useState('All Domains')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const { addQuizResult } = useProgress()

  const filteredQuestions = useMemo(() => {
    if (selectedDomain === 'All Domains') return questions
    return questions.filter((q) => q.domain === selectedDomain)
  }, [selectedDomain])

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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Practice Quiz</h1>
          <p className="text-gray-400">Select a domain and start practicing</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-4">
          <label className="block text-sm font-medium text-gray-300">Filter by Domain</label>
          <div className="flex flex-wrap gap-2">
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  selectedDomain === domain
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50'
                    : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} available
          </p>
          <button
            onClick={startQuiz}
            disabled={filteredQuestions.length === 0}
            className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-2 rounded transition-colors"
          >
            Start Quiz
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
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Quiz Complete</h1>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center space-y-4">
          <p className={`text-5xl font-bold ${pct >= 70 ? 'text-emerald-400' : 'text-red-400'}`}>
            {pct}%
          </p>
          <p className="text-gray-400">
            {correct} of {total} correct
          </p>
          <button
            onClick={() => setQuizStarted(false)}
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-2 rounded transition-colors"
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
        <h1 className="text-xl font-bold text-white">Practice Quiz</h1>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {filteredQuestions.length}
        </span>
      </div>
      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
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
            onClick={handleNext}
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-2 rounded transition-colors"
          >
            {currentIndex < filteredQuestions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  )
}
