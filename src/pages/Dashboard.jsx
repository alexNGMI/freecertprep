import { Link } from 'react-router-dom'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'

export default function Dashboard() {
  const cert = useCert()
  const { getDomainStats, getOverallStats } = useProgress(cert.id)
  const domainStats = getDomainStats(cert.domains)
  const overall = getOverallStats()

  return (
    <div className="space-y-10">
      <div className="text-center space-y-3 pt-4">
        <h1 className="text-4xl font-bold text-[#f5f6f7]">{cert.code}</h1>
        <p className="text-lg text-[#d0d0d5]">Track your {cert.title} exam prep progress</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Questions" value={overall.totalQuestions} />
        <StatCard label="Correct" value={overall.correctAnswers} />
        <StatCard
          label="Score"
          value={overall.totalQuestions > 0 ? `${overall.percentage}%` : '—'}
          highlight
        />
        <StatCard label="Sessions" value={overall.quizzesTaken + overall.examsTaken} />
      </div>

      {/* Domain Progress */}
      <div className="bg-[#1b1b32] rounded-md p-6 space-y-5">
        <h2 className="text-lg font-bold text-[#f5f6f7]">Domain Progress</h2>
        <div className="space-y-5">
          {domainStats.map((stat) => {
            const colors = cert.domainColors[stat.domain]
            const weight = cert.domains.find((d) => d.name === stat.domain)?.weight
            return (
              <div key={stat.domain}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#d0d0d5] text-sm">{stat.domain}</span>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-[#a5abc4]">{weight}% of exam</span>
                    <span className="text-[#f5f6f7] font-bold w-10 text-right">
                      {stat.total > 0 ? `${stat.percentage}%` : '—'}
                    </span>
                  </div>
                </div>
                <div className="h-2.5 bg-[#2a2a40] rounded overflow-hidden">
                  <div
                    className={`h-full rounded transition-all duration-500 ${colors?.bar || 'bg-[#a5abc4]'}`}
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="quiz"
          className="bg-[#1b1b32] rounded-md p-8 hover:bg-[#2a2a40] transition-colors group text-center space-y-4"
        >
          <h3 className="text-xl font-bold text-[#f5f6f7]">Practice Quiz</h3>
          <p className="text-sm text-[#d0d0d5]">
            Study by domain with instant feedback and explanations
          </p>
          <span className="inline-block bg-[#f1be32] text-[#0a0a23] font-bold px-8 py-2.5 rounded text-sm group-hover:opacity-90 transition-opacity">
            Start Learning
          </span>
        </Link>
        <Link
          to="exam"
          className="bg-[#1b1b32] rounded-md p-8 hover:bg-[#2a2a40] transition-colors group text-center space-y-4"
        >
          <h3 className="text-xl font-bold text-[#f5f6f7]">Exam Simulator</h3>
          <p className="text-sm text-[#d0d0d5]">
            {cert.examQuestions} questions, {cert.examTime}-minute timer — simulate the real exam
          </p>
          <span className="inline-block bg-[#f1be32] text-[#0a0a23] font-bold px-8 py-2.5 rounded text-sm group-hover:opacity-90 transition-opacity">
            Start Exam
          </span>
        </Link>
      </div>
    </div>
  )
}

function StatCard({ label, value, highlight }) {
  return (
    <div className="bg-[#1b1b32] rounded-md p-4 text-center">
      <p className="text-xs text-[#a5abc4] uppercase tracking-wider font-bold mb-2">{label}</p>
      <p className={`text-3xl font-bold ${highlight ? 'text-[#f1be32]' : 'text-[#f5f6f7]'}`}>
        {value}
      </p>
    </div>
  )
}
