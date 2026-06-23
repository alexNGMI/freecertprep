import { createElement, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion as Motion } from 'motion/react'
import {
  Activity,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Compass,
  Download,
  FileUp,
  Gauge,
  KeyRound,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  Trash2,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import { useQuestionStats } from '../hooks/useQuestionStats'
import { exportProgress, importProgressRaw } from '../utils/storage'
import { Button } from '../components/ui/button'
import { DomainBadge, Kicker, Surface } from '../components/ui/surface'
import TrustPanel from '../components/TrustPanel'
import { Tooltip as UiTooltip } from '../components/ui/tooltip'
import { cn } from '../utils/cn'
import { rankWeakObjectives, summarizeObjectiveProgress } from '../utils/objective-progress'
import { getLearningLoopConfig } from '../utils/learning-loop-config'

export default function Dashboard() {
  const cert = useCert()
  const { getDomainStats, getOverallStats, resetProgress } = useProgress(cert.id)
  const { certStats, trackedCount, resetStats } = useQuestionStats(cert.id)
  const domainStats = getDomainStats(cert.domains)
  const overall = getOverallStats
  const importRef = useRef(null)
  const [confirmReset, setConfirmReset] = useState(null)
  const [notice, setNotice] = useState(null)

  const readiness = overall.totalQuestions > 0 ? overall.percentage : 0
  const attemptsPerDomain = domainStats.filter((d) => d.total > 0)
  const weakest = attemptsPerDomain.length
    ? [...attemptsPerDomain].sort((a, b) => a.percentage - b.percentage || a.total - b.total)[0]
    : null
  const chartData = domainStats.map((stat) => ({
    domain: stat.domain,
    short: shortenDomain(stat.domain),
    score: stat.total > 0 ? stat.percentage : 0,
    attempts: stat.total,
    correct: stat.correct,
    weight: cert.domains.find((d) => d.name === stat.domain)?.weight || 0,
    color: cert.domainColors[stat.domain]?.hex || cert.color,
  }))
  const objectiveProgress = summarizeObjectiveProgress(cert.questions, certStats, cert.objectives)
  const weakObjectives = rankWeakObjectives(objectiveProgress).slice(0, 3)

  const action = weakest
    ? {
        label: `Focus ${shortenDomain(weakest.domain)}`,
        sub: `${weakest.percentage}% across ${weakest.total} answered`,
        to: 'quiz',
      }
    : {
        label: 'Start Smart Practice',
        sub: 'Build your first readiness signal',
        to: 'quiz',
      }

  const learningLoopConfig = getLearningLoopConfig(cert.id)
  const learningLoop = Boolean(learningLoopConfig)
  const learningTargetLabel = (learningLoopConfig?.objectiveLabel || 'objective').toLowerCase()
  const hasStarted = overall.totalQuestions > 0 || trackedCount > 0
  const primaryAction = learningLoop
    ? {
        label: hasStarted ? 'Open Study Plan' : 'Start Diagnostic',
        sub: hasStarted ? 'Use your current results to choose the next block.' : 'Answer a short baseline first.',
        to: hasStarted ? 'learning' : 'learning/diagnostic',
      }
    : action
  const nextStepTitle = learningLoop
    ? hasStarted ? 'Continue from your map.' : 'Take the diagnostic first.'
    : hasStarted ? 'Work the weakest signal.' : 'Start with Smart Practice.'
  const nextStepBody = learningLoop
    ? `${primaryAction.sub} The app will separate what you know, what needs work, and what has not been measured yet.`
    : `${primaryAction.sub}. Build a small signal first, then the dashboard will surface domains, objectives, and exam readiness.`

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
        setNotice({ kind: 'error', msg: 'Import failed because browser storage is full.' })
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Surface className="exam-shell overflow-hidden p-6 md:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <Kicker>
                Start here
                <span className="text-zinc-600">/</span>
                <span style={{ color: cert.color }}>{cert.code}</span>
              </Kicker>
              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight text-zinc-50 md:text-6xl">
                  {cert.title}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
                  {learningLoop
                    ? `New to ${cert.code}? Start with the diagnostic. If you already practiced, use the study plan to choose the next target, case set, or exam simulation.`
                    : 'Start with a short practice block. As you answer questions, this page turns into your readiness dashboard.'}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 px-5 py-4 text-sm text-zinc-400 lg:max-w-xs">
              {learningLoop
                ? 'Start with a baseline, then let the study plan choose the next useful block.'
                : 'One short block is enough to unlock useful progress signals.'}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard icon={BookOpenCheck} label="Answered" value={overall.totalQuestions} />
            <MetricCard icon={CheckCircle2} label="Correct" value={overall.correctAnswers} />
            <MetricCard icon={Gauge} label="Readiness" value={overall.totalQuestions ? `${readiness}%` : 'New'} accentColor={cert.color} />
            <MetricCard icon={Activity} label="Sessions" value={overall.quizzesTaken + overall.examsTaken} />
          </div>
        </Surface>

        <Surface className="p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Recommended next step</p>
          <h2 className="mt-2 text-2xl font-black text-zinc-50">
            {nextStepTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {nextStepBody}
          </p>
          <Button as={Link} to={primaryAction.to} variant="accent" size="lg" accentColor={cert.color} className="mt-5 w-full">
            <Sparkles className="h-5 w-5" />
            {primaryAction.label}
            <ArrowRight className="h-5 w-5" />
          </Button>
          {learningLoop && (
            <div className="mt-5 space-y-3">
              {[
                ['01', 'Measure', `A short diagnostic checks every ${learningTargetLabel}.`],
                ['02', 'Practice', 'The plan points you to the next useful block.'],
                ['03', 'Simulate', 'Exam results turn into a debrief and repair list.'],
              ].map(([number, label, body]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-zinc-900/55 p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black" style={{ color: cert.color }}>{number}</span>
                    <p className="font-black text-zinc-100">{label}</p>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500">{body}</p>
                </div>
              ))}
            </div>
          )}
        </Surface>
      </section>

      {cert.studyPlan && (
        <Surface className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border" style={{ color: cert.color, borderColor: `${cert.color}45`, backgroundColor: `${cert.color}12` }}>
                <Compass className="h-6 w-6" />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-wider text-zinc-500">Study architecture</p>
              <h2 className="mt-2 text-2xl font-black text-zinc-50">{cert.studyPlan.headline}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{cert.studyPlan.summary}</p>
            </div>
            <div className="grid gap-3 p-5 md:grid-cols-2 lg:p-7">
              {cert.studyPlan.checkpoints.map((checkpoint) => {
                const [label, body] = checkpoint.split(': ')
                return (
                  <div key={checkpoint} className="rounded-2xl border border-white/10 bg-zinc-900/55 p-4">
                    <p className="text-sm font-black text-zinc-100">{body ? label : checkpoint}</p>
                    {body && <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </Surface>
      )}

      {hasStarted && (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <Surface className="p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Domain mastery</p>
                <h2 className="mt-2 text-2xl font-black text-zinc-50">Weighted readiness map</h2>
              </div>
              <span className="text-sm text-zinc-500">{cert.domains.length} exam domains</span>
            </div>

            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid stroke="#27272a" />
                  <PolarAngleAxis dataKey="short" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                  <Radar dataKey="score" stroke={cert.color} fill={cert.color} fillOpacity={0.22} />
                  <Tooltip content={<ChartTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Surface>

          <Surface className="p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Attempts</p>
                <h2 className="mt-2 text-2xl font-black text-zinc-50">Coverage</h2>
              </div>
              <Target className="h-6 w-6" style={{ color: cert.color }} />
            </div>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 8, top: 4, bottom: 4 }}>
                  <CartesianGrid stroke="#27272a" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="short" width={92} tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="attempts" radius={[0, 8, 8, 0]}>
                    {chartData.map((entry) => <Cell key={entry.domain} fill={entry.color} fillOpacity={0.78} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Surface>
        </section>
      )}

      {cert.objectives?.length > 0 && hasStarted && (
        <Surface className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Objective learning loop</p>
              <h2 className="mt-2 text-2xl font-black text-zinc-50">
                {weakObjectives.length ? 'Your next three study targets' : 'Build an objective-level signal'}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                Accuracy shows performance on attempted questions. Coverage shows how much of that objective you have actually seen.
              </p>
            </div>
            <DomainBadge color={cert.color}>{cert.objectives.length} objectives</DomainBadge>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {(weakObjectives.length ? weakObjectives : objectiveProgress.slice(0, 3)).map(objective => (
              <Link
                key={objective.id}
                to={`quiz?objective=${objective.id}`}
                className="rounded-2xl border border-white/10 bg-zinc-900/55 p-5 transition hover:-translate-y-0.5 hover:border-white/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-wider" style={{ color: cert.color }}>
                    Objective {objective.id}
                  </p>
                  <ArrowRight className="h-4 w-4 text-zinc-600" />
                </div>
                <p className="mt-3 font-black text-zinc-100">{objective.title}</p>
                <p className="mt-1 text-xs text-zinc-500">{objective.domain}</p>
                <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
                  <Insight label="Accuracy" value={objective.accuracy === null ? 'New' : `${objective.accuracy}%`} />
                  <Insight label="Coverage" value={`${objective.coverage}%`} />
                </div>
              </Link>
            ))}
          </div>
        </Surface>
      )}

      <section className="grid gap-6 lg:grid-cols-3">
        <ActionCard
          icon={BookOpenCheck}
          title="Practice Quiz"
          body={cert.objectives?.length
            ? 'Smart Practice, objective focus, review queues, bookmarks, or one domain.'
            : 'Smart Practice, bookmarks, or one focused domain.'}
          to="quiz"
          cta="Start Quiz"
          color="#6366f1"
        />
        <ActionCard
          icon={Timer}
          title="Timed Drill"
          body="Ten questions under a ten-minute clock."
          to="drill"
          cta="Start Drill"
          color="#f43f5e"
        />
        <ActionCard
          icon={ShieldCheck}
          title="Exam Simulator"
          body={cert.domainWeightSource === 'editorial-practice'
            ? `${cert.examQuestions} questions across a stable objective-group practice allocation.`
            : `${cert.examQuestions} questions across weighted official domains.`}
          to="exam"
          cta="Begin Exam"
          color={cert.color}
        />
      </section>

      <TrustPanel cert={cert} />

      <Surface className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Data controls</p>
            <p className="mt-1 text-sm text-zinc-400">
              {trackedCount} Smart Practice question{trackedCount === 1 ? '' : 's'} tracked locally.
            </p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              Progress stays in this browser. Export a backup before clearing browser data or switching devices.
            </p>
            <Link
              to="/account"
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-sky-500/20 bg-sky-500/10 px-3 py-2 text-xs font-bold text-sky-200 transition hover:bg-sky-500/20"
            >
              <KeyRound className="h-3.5 w-3.5" />
              Optional account sync
            </Link>
          </div>

          {notice && (
            <div className={cn(
              'rounded-xl border px-4 py-2 text-sm font-semibold',
              notice.kind === 'error' ? 'border-rose-500/30 bg-rose-500/10 text-rose-200' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
            )}>
              {notice.msg}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <UiTooltip content="Download local progress as JSON">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  if (!exportProgress()) setNotice({ kind: 'error', msg: 'Export failed.' })
                }}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </UiTooltip>
            <UiTooltip content="Import a saved progress JSON file">
              <Button variant="secondary" size="sm" onClick={() => importRef.current?.click()}>
                <FileUp className="h-4 w-4" />
                Import
              </Button>
            </UiTooltip>
            <input ref={importRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
            {trackedCount > 0 && (
              <Button variant="danger" size="sm" onClick={() => setConfirmReset('smart')}>
                <RotateCcw className="h-4 w-4" />
                Smart Stats
              </Button>
            )}
            <Button variant="danger" size="sm" onClick={() => setConfirmReset('progress')}>
              <Trash2 className="h-4 w-4" />
              Progress
            </Button>
          </div>
        </div>

        {confirmReset && (
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-rose-100">
              {confirmReset === 'progress'
                ? 'Reset all quiz and exam history for this cert?'
                : 'Reset all Smart Practice stats for this cert?'}
            </p>
            <div className="flex gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  if (confirmReset === 'progress') resetProgress()
                  else resetStats()
                  setConfirmReset(null)
                }}
              >
                Reset
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmReset(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Surface>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, accentColor }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5"
    >
      <div className="flex items-center gap-2 text-zinc-500">
        {createElement(Icon, { className: 'h-4 w-4', style: accentColor ? { color: accentColor } : undefined })}
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-black text-zinc-50" style={accentColor ? { color: accentColor } : undefined}>
        {value}
      </p>
    </Motion.div>
  )
}

function Insight({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 truncate text-sm font-bold text-zinc-100">{value}</p>
    </div>
  )
}

function ActionCard({ icon: Icon, title, body, to, cta, color }) {
  return (
    <Surface as={Link} to={to} interactive className="group p-6">
      <div className="flex h-full min-h-56 flex-col justify-between">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border" style={{ color, borderColor: `${color}45`, backgroundColor: `${color}12` }}>
            {createElement(Icon, { className: 'h-6 w-6' })}
          </div>
          <h3 className="mt-6 text-2xl font-black text-zinc-50">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
        </div>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold" style={{ color }}>
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Surface>
  )
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 shadow-2xl">
      <p className="max-w-56 text-sm font-bold text-zinc-100">{data.domain}</p>
      <p className="mt-1 text-xs text-zinc-400">Score: {data.score}%</p>
      <p className="text-xs text-zinc-400">Attempts: {data.attempts}</p>
      <p className="text-xs text-zinc-500">Weight: {data.weight}%</p>
    </div>
  )
}

function shortenDomain(domain) {
  return domain
    .replace('Describe ', '')
    .replace('Google Cloud ', '')
    .replace('Infrastructure as Code (IaC) with Terraform', 'IaC with Terraform')
    .replace('Threats, Vulnerabilities, and Mitigations', 'Threats & Mitigations')
    .replace('Security Program Management and Oversight', 'Program Management')
    .replace('Server Hardware Installation and Management', 'Server Hardware')
    .replace('Data Analysis and Visualization', 'Data & Viz')
}
