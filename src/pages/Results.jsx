import { useLocation, Link } from 'react-router-dom'
import { useCert } from '../hooks/useCert'

export default function Results() {
  const cert = useCert()
  const location = useLocation()
  const { answers } = location.state || {}

  if (!answers) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-[#d0d0d5]">No results to display.</p>
        <Link to={`/${cert.id}`} className="text-[#99c9ff] hover:opacity-80 transition-opacity font-bold">
          Back to Dashboard
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
    <div className="space-y-8 animate-fade-up">
      <h1 className="text-4xl font-bold text-[#f5f6f7] text-center pt-4">Exam Results</h1>

      <div className="bg-[#1b1b32] rounded-md p-10 text-center space-y-4 max-w-md mx-auto">
        <p className={`text-7xl font-black ${passed ? 'text-[#acd157]' : 'text-red-400'}`}>
          {pct}%
        </p>
        <p className={`text-xl font-bold ${passed ? 'text-[#acd157]' : 'text-red-400'}`}>
          {passed ? 'PASSED' : 'NOT PASSED'}
        </p>
        <p className="text-[#d0d0d5]">
          {correct} of {total} questions correct — passing score is {cert.passingScore}%
        </p>
      </div>

      <div className="bg-[#1b1b32] rounded-md p-6 space-y-5">
        <h2 className="text-lg font-bold text-[#f5f6f7]">
          Domain Breakdown
          <span className="text-sm font-normal text-[#a5abc4] ml-2">(weakest first)</span>
        </h2>
        <div className="space-y-5">
          {domainResults.map((d) => {
            const colors = cert.domainColors[d.domain]
            return (
              <div key={d.domain}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-bold ${colors?.text || 'text-[#d0d0d5]'}`}>
                    {d.domain}
                  </span>
                  <span className="text-sm text-[#a5abc4] font-bold">
                    {d.correct}/{d.total} ({d.percentage}%)
                  </span>
                </div>
                <div className="h-2.5 bg-[#2a2a40] rounded overflow-hidden">
                  <div
                    className={`h-full rounded animate-bar-fill ${colors?.bar || 'bg-[#a5abc4]'}`}
                    style={{ '--bar-width': `${d.percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Link
          id="results-dashboard-btn"
          to={`/${cert.id}`}
          className="px-6 py-2.5 rounded font-bold text-sm border border-[#f5f6f7] text-[#f5f6f7] hover:bg-[#f5f6f7]/10 transition-all duration-200"
        >
          Dashboard
        </Link>
        <Link
          id="results-practice-btn"
          to={`/${cert.id}/quiz`}
          className="px-6 py-2.5 rounded font-bold text-sm bg-[#f1be32] hover:opacity-90 text-[#0a0a23] transition-all duration-200"
        >
          Practice Weak Areas
        </Link>
        <Link
          id="results-retake-btn"
          to={`/${cert.id}/exam`}
          className="px-6 py-2.5 rounded font-bold text-sm bg-[#dbb8ff] hover:opacity-90 text-[#0a0a23] transition-all duration-200"
        >
          Retake Exam
        </Link>
      </div>
    </div>
  )
}
