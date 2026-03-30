import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

const domainWeights = {
  'Cloud Concepts': 24,
  'Security and Compliance': 30,
  'Cloud Technology and Services': 34,
  'Billing, Pricing and Support': 12,
}

const domainColors = {
  'Cloud Concepts': 'bg-sky-500',
  'Security and Compliance': 'bg-emerald-500',
  'Cloud Technology and Services': 'bg-violet-500',
  'Billing, Pricing and Support': 'bg-amber-500',
}

const domainBarColors = {
  'Cloud Concepts': 'bg-sky-400',
  'Security and Compliance': 'bg-emerald-400',
  'Cloud Technology and Services': 'bg-violet-400',
  'Billing, Pricing and Support': 'bg-amber-400',
}

export default function Dashboard() {
  const { getDomainStats, getOverallStats } = useProgress()
  const domainStats = getDomainStats()
  const overall = getOverallStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Track your AWS CLF-C02 exam preparation progress</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Questions Answered" value={overall.totalQuestions} />
        <StatCard label="Correct Answers" value={overall.correctAnswers} />
        <StatCard
          label="Overall Score"
          value={overall.totalQuestions > 0 ? `${overall.percentage}%` : '—'}
          highlight
        />
        <StatCard label="Sessions" value={overall.quizzesTaken + overall.examsTaken} />
      </div>

      {/* Domain Progress */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Domain Progress</h2>
        <div className="space-y-4">
          {domainStats.map((stat) => (
            <div key={stat.domain}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${domainColors[stat.domain]}`} />
                  <span className="text-sm text-gray-300">{stat.domain}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-500">{domainWeights[stat.domain]}% of exam</span>
                  <span className="text-gray-300 font-medium w-10 text-right">
                    {stat.total > 0 ? `${stat.percentage}%` : '—'}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${domainBarColors[stat.domain]}`}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/quiz"
          className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-sky-500/50 hover:bg-gray-900/80 transition-all group"
        >
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-sky-400 transition-colors">
            Practice Quiz
          </h3>
          <p className="text-sm text-gray-400">
            Study by domain with instant feedback and explanations
          </p>
        </Link>
        <Link
          to="/exam"
          className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-violet-500/50 hover:bg-gray-900/80 transition-all group"
        >
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-violet-400 transition-colors">
            Exam Simulator
          </h3>
          <p className="text-sm text-gray-400">
            65 questions, 90-minute timer — simulate the real exam
          </p>
        </Link>
      </div>
    </div>
  )
}

function StatCard({ label, value, highlight }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-sky-400' : 'text-white'}`}>
        {value}
      </p>
    </div>
  )
}
