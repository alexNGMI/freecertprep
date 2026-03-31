import { useLocation, Link } from 'react-router-dom'
import { useCert } from '../hooks/useCert'

export default function Results() {
  const cert = useCert()
  const location = useLocation()
  const { answers } = location.state || {}

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 pb-12">
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
    </div>
  )
}
