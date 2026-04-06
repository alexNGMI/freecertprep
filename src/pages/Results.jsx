import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useCert } from '../hooks/useCert'
import QuestionCard from '../components/QuestionCard'

export default function Results() {
  const cert = useCert()
  const location = useLocation()
  const { answers, questions: examQuestions } = location.state || {}
  const [reviewMode, setReviewMode] = useState(false)
  const [reviewFilter, setReviewFilter] = useState('all') // 'all', 'incorrect', 'correct'

  if (!answers) {
    return (
      <div className="text-center py-20 space-y-6 animate-fade-up">
        <p className="text-zinc-400 text-lg">No session data found.</p>
        <Link 
          to={`/${cert.id}`} 
          className="inline-block px-8 py-3 rounded-lg text-sm font-semibold bg-zinc-900 border border-white/10 text-zinc-100 hover:bg-zinc-800 transition-all"
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

  const domainResults = Object.entries(domainMap).map(([domain, stats]) => ({
    domain,
    ...stats,
    percentage: Math.round((stats.correct / stats.total) * 100),
  }))

  domainResults.sort((a, b) => a.percentage - b.percentage)

  return (
    <div className="space-y-12 animate-fade-up pt-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 text-center tracking-tight">Official Exam Results</h1>

      <div className="glass-panel rounded-2xl p-10 text-center max-w-lg mx-auto relative overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 opacity-10 blur-3xl pointer-events-none" 
          style={{ backgroundColor: passed ? '#34d399' : '#f43f5e' }} 
        />
        
        <p className="text-sm font-bold tracking-widest uppercase mb-4 text-zinc-500">
          Final Score
        </p>
        <p 
          className="text-8xl font-black mb-6 tracking-tighter"
          style={{ 
            color: passed ? '#34d399' : '#fb7185',
            textShadow: `0 0 40px ${passed ? 'rgba(52,211,153,0.4)' : 'rgba(244,63,94,0.4)'}`
          }}
        >
          {pct}%
        </p>
        <div className="inline-block px-6 py-2 rounded-full border mb-8 bg-zinc-950/50 backdrop-blur-sm" style={{ borderColor: passed ? 'rgba(52,211,153,0.3)' : 'rgba(244,63,94,0.3)' }}>
          <p className="text-lg font-bold uppercase tracking-wider" style={{ color: passed ? '#34d399' : '#fb7185' }}>
            {passed ? 'Passed successfully' : 'Did not pass'}
          </p>
        </div>
        <p className="text-zinc-400 font-medium">
          <span className="text-zinc-100 font-bold">{correct}</span> / {total} correct answers &mdash; passing bar is <span className="text-zinc-200">{cert.passingScore}%</span>
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-8 space-y-8 relative overflow-hidden">
        <h2 className="text-2xl font-bold text-zinc-100">
          Domain Breakdown
          <span className="text-sm font-normal text-zinc-500 ml-3">(Ranked weakest first)</span>
        </h2>
        
        <div className="space-y-6 relative z-10">
          {domainResults.map((d) => {
            const colors = cert.domainColors[d.domain]
            return (
              <div key={d.domain} className="group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-zinc-300 font-medium text-sm md:text-base flex-1 pr-4">{d.domain}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-500 text-sm font-medium hidden sm:inline">{d.correct} / {d.total} correct</span>
                    <span
                      className="font-bold text-base px-3 py-1 bg-zinc-900/50 rounded-md border border-white/5"
                      style={{ color: colors?.hex || '#a1a1aa' }}
                    >
                      {d.percentage}%
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-zinc-900/80 rounded-full border border-white/5 overflow-hidden shadow-inner flex">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end"
                    style={{
                      width: `${d.percentage}%`,
                      backgroundColor: colors?.hex || '#3f3f46',
                      boxShadow: colors?.hex ? `0 0 10px ${colors.hex}60` : 'none',
                    }}
                  >
                    <div className="w-10 h-full bg-white/20 blur-sm" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <Link
          id="results-dashboard-btn"
          to={`/${cert.id}`}
          className="px-6 py-4 rounded-xl font-bold text-center border border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white transition-all shadow-sm"
        >
          Dashboard
        </Link>
        <Link
          id="results-practice-btn"
          to={`/${cert.id}/quiz`}
          className="px-6 py-4 rounded-xl font-bold text-center bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500 hover:text-white hover:shadow-[0_0_20px_-5px_#6366f1] transition-all"
        >
          Target Weak Areas
        </Link>
        <Link
          id="results-retake-btn"
          to={`/${cert.id}/exam`}
          className="px-6 py-4 rounded-xl font-bold text-center bg-zinc-100 text-zinc-900 border hover:bg-white hover:scale-105 shadow-[0_5px_15px_-3px_rgba(255,255,255,0.3)] transition-all"
        >
          Retake Exam
        </Link>
      </div>

      {/* Review Questions Section */}
      {examQuestions && (
        <div className="space-y-6 pb-12">
          <button
            onClick={() => setReviewMode(prev => !prev)}
            className="w-full px-6 py-4 rounded-xl font-bold text-center border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/50 transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {reviewMode ? 'Hide Question Review' : 'Review All Questions'}
            <svg className={`w-4 h-4 transition-transform duration-300 ${reviewMode ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {reviewMode && (
            <div className="space-y-6 animate-fade-up">
              {/* Filter tabs */}
              <div className="flex gap-2 justify-center">
                {[
                  { key: 'all', label: `All (${answers.length})` },
                  { key: 'incorrect', label: `Incorrect (${answers.filter(a => !a.correct).length})` },
                  { key: 'correct', label: `Correct (${answers.filter(a => a.correct).length})` },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setReviewFilter(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                      reviewFilter === key
                        ? 'bg-zinc-100 text-zinc-900 border-zinc-100'
                        : 'border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Question list */}
              {examQuestions.map((question, i) => {
                const answer = answers[i]
                if (reviewFilter === 'incorrect' && answer.correct) return null
                if (reviewFilter === 'correct' && !answer.correct) return null

                return (
                  <div key={question.id} className="space-y-2">
                    <div className="flex items-center gap-3 px-2">
                      <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        answer.correct
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {i + 1}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{question.domain}</span>
                      {answer.selected === -1 && (
                        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">Unanswered</span>
                      )}
                    </div>
                    <QuestionCard
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
