import { Link } from 'react-router-dom'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'

export default function Dashboard() {
  const cert = useCert()
  const { getDomainStats, getOverallStats } = useProgress(cert.id)
  const domainStats = getDomainStats(cert.domains)
  const overall = getOverallStats

  return (
    <div className="space-y-12 animate-fade-up">
      <div className="text-center space-y-4 pt-6">
        <h1 className="text-5xl font-bold text-zinc-100 flex items-center justify-center gap-4">
          <span 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-zinc-900 border" 
            style={{ color: cert.color, borderColor: `${cert.color}40`, boxShadow: `0 0 20px -5px ${cert.color}60` }}
          >
            {cert.code.charAt(0)}
          </span>
          {cert.code}
        </h1>
        <p className="text-xl text-zinc-400">Track your <span className="text-zinc-200 font-semibold">{cert.title}</span> mastery</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <StatCard label="Questions" value={overall.totalQuestions} />
        <StatCard label="Correct" value={overall.correctAnswers} />
        <StatCard
          label="Score"
          value={overall.totalQuestions > 0 ? `${overall.percentage}%` : '—'}
          highlight
          glowColor={cert.color}
        />
        <StatCard label="Sessions" value={overall.quizzesTaken + overall.examsTaken} />
      </div>

      {/* Domain Progress */}
      <div className="glass-panel rounded-2xl p-8 space-y-8 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
        
        <h2 className="text-2xl font-bold text-zinc-100 relative z-10">Domain Readiness</h2>
        <div className="space-y-6 relative z-10">
          {domainStats.map((stat) => {
            const colors = cert.domainColors[stat.domain]
            const weight = cert.domains.find((d) => d.name === stat.domain)?.weight
            return (
              <div key={stat.domain} className="group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-zinc-300 font-medium tracking-wide flex-1 pr-4">{stat.domain}</span>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="text-zinc-500 uppercase tracking-widest text-[10px] hidden sm:inline">{weight}% of exam</span>
                    <span 
                      className="font-bold text-base px-3 py-1 bg-zinc-900/50 rounded-md border border-white/5"
                      style={{ color: stat.total > 0 && colors ? colors.text : '#a1a1aa' }}
                    >
                      {stat.total > 0 ? `${stat.percentage}%` : '—'}
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-zinc-900/80 rounded-full border border-white/5 overflow-hidden shadow-inner flex">
                  <div
                    className={`h-full rounded-full animate-bar-fill transition-all duration-700 ease-out`}
                    style={{ 
                      '--bar-width': `${stat.percentage}%`, 
                      background: colors ? (stat.percentage > 0 ? `linear-gradient(90deg, transparent, ${stat.percentage > 70 ? '#34d399' : '#38bdf8'})` : '') : '#52525b',
                      backgroundColor: colors && stat.percentage > 0 ? 'currentColor' : '#3f3f46'
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <Link
          to="quiz"
          id="dashboard-quiz-btn"
          className="glass-panel glass-panel-hover rounded-2xl p-8 text-center space-y-5 flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-zinc-100">Practice Quiz</h3>
            <p className="text-zinc-400 mt-2 leading-relaxed">
              Target specifically weak domains with instant feedback, interactive layouts, and detailed explanations.
            </p>
          </div>
          <span className="inline-block font-semibold px-8 py-3.5 rounded-lg transition-all border border-indigo-500/30 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white hover:shadow-[0_0_20px_-5px_#6366f1]">
            Start Learning
          </span>
        </Link>
        <Link
          to="exam"
          id="dashboard-exam-btn"
          className="glass-panel glass-panel-hover rounded-2xl p-8 text-center space-y-5 flex flex-col justify-between"
          style={{ borderColor: `${cert.color}40`, boxShadow: `0 10px 40px -10px ${cert.color}20` }}
        >
          <div>
            <div 
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 border"
              style={{ backgroundColor: `${cert.color}15`, borderColor: `${cert.color}30`, color: cert.color }}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-zinc-100">Live Simulator</h3>
            <p className="text-zinc-400 mt-2 leading-relaxed">
              {cert.examQuestions} unique questions mapped correctly across domains on a strict {cert.examTime}-minute countdown.
            </p>
          </div>
          <span
            className="inline-block bg-zinc-100 text-zinc-950 font-semibold px-8 py-3.5 rounded-lg hover:bg-white hover:scale-105 transition-all shadow-[0_0_15px_-3px_rgba(255,255,255,0.4)]"
            style={{ boxShadow: `0 0 20px -3px ${cert.color}80` }}
          >
            Start Exam
          </span>
        </Link>
      </div>
    </div>
  )
}

function StatCard({ label, value, highlight, glowColor }) {
  return (
    <div
      className={`glass-panel rounded-2xl p-6 text-center transition-all duration-300 flex flex-col justify-center ${
        highlight ? 'backdrop-blur-2xl' : ''
      }`}
      style={highlight ? { borderColor: `${glowColor}50`, background: `${glowColor}10`, boxShadow: `0 0 30px -5px ${glowColor}40` } : {}}
    >
      <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold mb-3">{label}</p>
      <p
        className={`text-4xl font-black tracking-tight ${highlight ? '' : 'text-zinc-100'}`}
        style={highlight ? { color: glowColor, textShadow: `0 0 20px ${glowColor}80` } : {}}
      >
        {value}
      </p>
    </div>
  )
}
