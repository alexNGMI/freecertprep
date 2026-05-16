import { useState } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import { useCert } from '../../hooks/useCert'
import REQuestionCard from '../../components/REQuestionCard'

export default function REResults() {
  const cert = useCert()
  const location = useLocation()
  const { reCert } = useParams()
  const base = `/real-estate/study/${reCert}`
  const { answers, questions: examQuestions } = location.state || {}
  const [reviewMode, setReviewMode] = useState(false)
  const [reviewFilter, setReviewFilter] = useState('all')

  if (!answers) {
    return (
      <div className="text-center py-20 space-y-6 animate-fade-up">
        <p className="text-slate-500 text-lg">No session data found.</p>
        <Link
          to={base}
          className="inline-block px-8 py-3 rounded-lg text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-all"
        >
          Return to Dashboard
        </Link>
      </div>
    )
  }

  const correct = answers.filter((a) => a.correct).length
  const total = answers.length
  const pct = Math.round((correct / total) * 100)
  const passed = pct >= cert.passingScore

  const domainMap = {}
  answers.forEach((a) => {
    if (!domainMap[a.domain]) domainMap[a.domain] = { correct: 0, total: 0 }
    domainMap[a.domain].total++
    if (a.correct) domainMap[a.domain].correct++
  })

  const domainResults = Object.entries(domainMap)
    .map(([domain, stats]) => ({
      domain,
      ...stats,
      percentage: Math.round((stats.correct / stats.total) * 100),
    }))
    .sort((a, b) => a.percentage - b.percentage)

  return (
    <div className="space-y-10 animate-fade-up pt-2 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 text-center tracking-tight">Exam Results</h1>

      <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-lg mx-auto shadow-sm relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-1.5"
          style={{ backgroundColor: passed ? '#16a34a' : '#e11d48' }}
        />
        <p className="text-sm font-bold tracking-widest uppercase mb-3 text-slate-400">Final Score</p>
        <p className={`text-8xl font-black mb-5 tracking-tighter ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>
          {pct}%
        </p>
        <div
          className={`inline-block px-6 py-2 rounded-full border mb-6 ${
            passed ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'
          }`}
        >
          <p className={`text-lg font-bold uppercase tracking-wider ${passed ? 'text-emerald-700' : 'text-rose-700'}`}>
            {passed ? 'Passed' : 'Did not pass'}
          </p>
        </div>
        <p className="text-slate-500 font-medium">
          <span className="text-slate-900 font-bold">{correct}</span> / {total} correct — passing bar is{' '}
          <span className="text-slate-900">{cert.passingScore}%</span>
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-7 md:p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Domain Breakdown
          <span className="text-sm font-normal text-slate-400 ml-3">(Ranked weakest first)</span>
        </h2>
        <div className="space-y-5">
          {domainResults.map((d) => {
            const colors = cert.domainColors[d.domain]
            return (
              <div key={d.domain}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-700 font-medium text-sm md:text-base flex-1 pr-4">{d.domain}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400 text-sm font-medium hidden sm:inline">
                      {d.correct} / {d.total} correct
                    </span>
                    <span
                      className="font-bold text-base px-3 py-1 bg-slate-50 rounded-md border border-slate-200"
                      style={{ color: colors?.hex || '#94a3b8' }}
                    >
                      {d.percentage}%
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${d.percentage}%`, backgroundColor: colors?.hex || '#cbd5e1' }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to={base}
          className="px-6 py-4 rounded-xl font-bold text-center border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-all shadow-sm"
        >
          Dashboard
        </Link>
        <Link
          to={`${base}/quiz`}
          className="px-6 py-4 rounded-xl font-bold text-center bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-all"
        >
          Target Weak Areas
        </Link>
        <Link
          to={`${base}/exam`}
          className="px-6 py-4 rounded-xl font-bold text-center bg-rose-600 text-white hover:bg-rose-700 transition-all shadow-sm"
        >
          Retake Exam
        </Link>
      </div>

      {examQuestions && (
        <div className="space-y-6 pb-12">
          <button
            onClick={() => setReviewMode((prev) => !prev)}
            className="w-full px-6 py-4 rounded-xl font-bold text-center border border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {reviewMode ? 'Hide Question Review' : 'Review All Questions'}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${reviewMode ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {reviewMode && (
            <div className="space-y-6 animate-fade-up">
              <div className="flex gap-2 justify-center">
                {[
                  { key: 'all', label: `All (${answers.length})` },
                  { key: 'incorrect', label: `Incorrect (${answers.filter((a) => !a.correct).length})` },
                  { key: 'correct', label: `Correct (${answers.filter((a) => a.correct).length})` },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setReviewFilter(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                      reviewFilter === key
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {examQuestions.map((question, i) => {
                const answer = answers[i]
                if (reviewFilter === 'incorrect' && answer.correct) return null
                if (reviewFilter === 'correct' && !answer.correct) return null

                return (
                  <div key={question.id} className="space-y-2">
                    <div className="flex items-center gap-3 px-2">
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          answer.correct
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                            : 'bg-rose-100 text-rose-700 border border-rose-300'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                        {question.domain}
                      </span>
                      {answer.selected === -1 && (
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Unanswered</span>
                      )}
                    </div>
                    <REQuestionCard
                      question={question}
                      onAnswer={() => {}}
                      answered={true}
                      selectedChoice={answer.selected === -1 ? undefined : answer.selected}
                      reviewMode={true}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
