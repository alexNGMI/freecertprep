import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCert } from '../../hooks/useCert'
import { useProgress } from '../../hooks/useProgress'
import { useQuestionStats } from '../../hooks/useQuestionStats'
import { exportProgress, importProgressRaw } from '../../utils/storage'
import TrustPanel from '../../components/TrustPanel'

export default function REDashboard() {
  const cert = useCert()
  const { getDomainStats, getOverallStats, resetProgress } = useProgress(cert.id)
  const { trackedCount, resetStats } = useQuestionStats(cert.id)
  const domainStats = getDomainStats(cert.domains)
  const overall = getOverallStats
  const importRef = useRef(null)
  const [confirmReset, setConfirmReset] = useState(null) // 'progress' | 'smart' | null
  const [notice, setNotice] = useState(null) // { kind: 'error'|'ok', msg }

  function handleImport(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const status = importProgressRaw(ev.target.result)
      if (status === 'ok') {
        window.location.reload()
      } else if (status === 'invalid') {
        setNotice({ kind: 'error', msg: "That file isn't valid progress JSON." })
      } else {
        setNotice({ kind: 'error', msg: 'Import failed — browser storage is full. Clear some history and retry.' })
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="space-y-12 animate-fade-up">
      <div className="text-center space-y-3 pt-2">
        <p className="text-[11px] font-bold text-rose-600 uppercase tracking-widest">{cert.title}</p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Your prep, <span className="text-rose-600">measured</span>.
        </h1>
        <p className="text-lg text-slate-500">
          {cert.composite
            ? `Full licensing prep — ${cert.composite.national.count} national + ${cert.composite.state.count} state questions · ${cert.domains.length} state domains.`
            : `The portable national portion — ${cert.questionCount.toLocaleString()} questions across ${cert.domains.length} domains.`}
        </p>
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

      {/* Domain Readiness */}
      <div className="bg-white border border-slate-200 rounded-2xl p-7 md:p-8 space-y-7 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Domain Readiness</h2>
        <div className="space-y-5">
          {domainStats.map((stat) => {
            const colors = cert.domainColors[stat.domain]
            const weight = cert.domains.find((d) => d.name === stat.domain)?.weight
            return (
              <div key={stat.domain}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-700 font-medium text-sm md:text-base flex-1 pr-4">{stat.domain}</span>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="text-slate-400 uppercase tracking-widest text-[10px] hidden sm:inline">
                      {weight}% of exam
                    </span>
                    <span
                      className="font-bold text-base px-3 py-1 bg-slate-50 rounded-md border border-slate-200"
                      style={{ color: stat.total > 0 && colors ? colors.hex : '#94a3b8' }}
                    >
                      {stat.total > 0 ? `${stat.percentage}%` : '—'}
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${stat.percentage}%`,
                      backgroundColor: stat.total > 0 && colors ? colors.hex : '#cbd5e1',
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <TrustPanel cert={cert} light />

      {/* Data & Resets */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Data &amp; Resets</h2>

        {notice && (
          <div
            role="status"
            className={`rounded-xl p-4 flex items-start justify-between gap-4 text-sm font-medium border ${
              notice.kind === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <span>{notice.msg}</span>
            <button
              onClick={() => setNotice(null)}
              className="shrink-0 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        )}

        {confirmReset && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-rose-700 font-medium">
              {confirmReset === 'progress'
                ? 'Reset all quiz & exam history? This cannot be undone.'
                : 'Reset all Smart Practice stats? Your weak-question history will be lost.'}
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => {
                  if (confirmReset === 'progress') resetProgress()
                  else resetStats()
                  setConfirmReset(null)
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-all"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setConfirmReset(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-500 hover:text-slate-900 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              if (!exportProgress('realestateprep')) setNotice({ kind: 'error', msg: 'Export failed — your browser blocked the download.' })
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Progress
          </button>
          <button
            onClick={() => importRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Import Progress
          </button>
          <input ref={importRef} type="file" accept=".json" className="hidden" onChange={handleImport} />

          <div className="flex-1" />

          {trackedCount > 0 && (
            <button
              onClick={() => setConfirmReset('smart')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-rose-200 text-rose-500 hover:text-rose-700 hover:border-rose-300 transition-all"
            >
              Reset Smart Practice
            </button>
          )}
          <button
            onClick={() => setConfirmReset('progress')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-rose-200 text-rose-500 hover:text-rose-700 hover:border-rose-300 transition-all"
          >
            Reset Progress
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        <ActionCard
          to="quiz"
          title="Practice Quiz"
          desc="Smart Practice or domain focus — 10 questions with instant feedback and worked explanations."
          cta="Start Quiz"
        />
        <ActionCard
          to="drill"
          title="Timed Drill"
          desc="10 questions, 10 minutes. Weighted by your weakest areas — beat the clock."
          cta="Start Drill"
        />
        <ActionCard
          to="exam"
          title="Exam Simulator"
          desc={`${cert.examQuestions} questions across all domains on a strict ${cert.examTime}-minute countdown.`}
          cta="Start Exam"
          primary
        />
      </div>
    </div>
  )
}

function StatCard({ label, value, highlight }) {
  return (
    <div
      className={`rounded-2xl p-6 text-center border shadow-sm flex flex-col justify-center ${
        highlight ? 'bg-rose-600 border-rose-600' : 'bg-white border-slate-200'
      }`}
    >
      <p
        className={`text-[11px] uppercase tracking-widest font-semibold mb-2 ${
          highlight ? 'text-rose-100' : 'text-slate-400'
        }`}
      >
        {label}
      </p>
      <p className={`text-4xl font-black tracking-tight ${highlight ? 'text-white' : 'text-slate-900'}`}>
        {value}
      </p>
    </div>
  )
}

function ActionCard({ to, title, desc, cta, primary }) {
  return (
    <Link
      to={to}
      className={`group rounded-2xl p-7 flex flex-col justify-between border shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
        primary
          ? 'bg-rose-600 border-rose-600 hover:shadow-rose-200'
          : 'bg-white border-slate-200 hover:border-rose-300 hover:shadow-rose-100/60'
      }`}
    >
      <div>
        <h3 className={`text-xl font-bold mb-2 ${primary ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${primary ? 'text-rose-50' : 'text-slate-500'}`}>{desc}</p>
      </div>
      <span
        className={`inline-block mt-6 font-bold px-6 py-3 rounded-xl text-sm text-center transition-all ${
          primary
            ? 'bg-white text-rose-600 group-hover:bg-rose-50'
            : 'bg-rose-600 text-white group-hover:bg-rose-700'
        }`}
      >
        {cta}
      </span>
    </Link>
  )
}
