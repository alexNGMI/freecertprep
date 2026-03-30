import { useLocation, Link } from 'react-router-dom'

const domainColors = {
  'Cloud Concepts': 'text-sky-400',
  'Security and Compliance': 'text-emerald-400',
  'Cloud Technology and Services': 'text-violet-400',
  'Billing, Pricing and Support': 'text-amber-400',
}

const domainBarColors = {
  'Cloud Concepts': 'bg-sky-400',
  'Security and Compliance': 'bg-emerald-400',
  'Cloud Technology and Services': 'bg-violet-400',
  'Billing, Pricing and Support': 'bg-amber-400',
}

export default function Results() {
  const location = useLocation()
  const { answers, questions } = location.state || {}

  if (!answers) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-gray-400">No results to display.</p>
        <Link to="/" className="text-sky-400 hover:text-sky-300 transition-colors">
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const correct = answers.filter((a) => a.correct).length
  const total = answers.length
  const pct = Math.round((correct / total) * 100)
  const passed = pct >= 70

  // Domain breakdown
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

  // Sort weakest first
  domainResults.sort((a, b) => a.percentage - b.percentage)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Exam Results</h1>
      </div>

      {/* Score Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center space-y-3">
        <p className={`text-6xl font-bold ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
          {pct}%
        </p>
        <p className={`text-lg font-semibold ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
          {passed ? 'PASSED' : 'NOT PASSED'}
        </p>
        <p className="text-gray-400">
          {correct} of {total} questions correct — passing score is 70%
        </p>
      </div>

      {/* Domain Breakdown */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Domain Breakdown
          <span className="text-sm font-normal text-gray-500 ml-2">(weakest first)</span>
        </h2>
        <div className="space-y-4">
          {domainResults.map((d) => (
            <div key={d.domain}>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-sm font-medium ${domainColors[d.domain] || 'text-gray-300'}`}>
                  {d.domain}
                </span>
                <span className="text-sm text-gray-400">
                  {d.correct}/{d.total} ({d.percentage}%)
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    domainBarColors[d.domain] || 'bg-gray-500'
                  }`}
                  style={{ width: `${d.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <Link
          to="/"
          className="px-6 py-2 rounded font-medium text-sm bg-gray-800 text-gray-300 hover:text-white transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/quiz"
          className="px-6 py-2 rounded font-medium text-sm bg-sky-500 hover:bg-sky-600 text-white transition-colors"
        >
          Practice Weak Areas
        </Link>
        <Link
          to="/exam"
          className="px-6 py-2 rounded font-medium text-sm bg-violet-500 hover:bg-violet-600 text-white transition-colors"
        >
          Retake Exam
        </Link>
      </div>
    </div>
  )
}
