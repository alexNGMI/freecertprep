import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { motion as Motion } from 'motion/react'
import {
  Activity,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Gauge,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
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
import { Button } from '../components/ui/button'
import { DomainBadge, Kicker, Surface } from '../components/ui/surface'
import { rankWeakObjectives, summarizeObjectiveProgress } from '../utils/objective-progress'
import { getLearningLoopConfig } from '../utils/learning-loop-config'
import { hasStudyBaseline } from '../utils/learning-loop'

export default function Dashboard() {
  const cert = useCert()
  const { progress, getDomainStats, getOverallStats } = useProgress(cert.id)
  const { certStats, trackedCount } = useQuestionStats(cert.id)
  const domainStats = getDomainStats(cert.domains)
  const overall = getOverallStats

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
  const hasStarted = overall.totalQuestions > 0 || trackedCount > 0
  const hasBaseline = hasStudyBaseline(progress)
  const primaryAction = learningLoop
    ? {
        label: hasBaseline ? 'Open Study Plan' : 'Start Diagnostic',
        sub: hasBaseline ? 'Use your current results to choose the next block.' : 'Complete a baseline before treating the map as a study guide.',
        to: hasBaseline ? 'learning' : 'learning/diagnostic',
      }
    : action

  return (
    <div className="space-y-8 animate-fade-up">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Surface className="exam-shell overflow-hidden p-6 md:p-8 xl:col-span-2">
          <div className="max-w-3xl space-y-4">
            <Kicker>
              Start here
              <span className="text-zinc-600">/</span>
              <span style={{ color: cert.color }}>{cert.code}</span>
            </Kicker>
            <h1 className="text-4xl font-black tracking-tight text-zinc-50 md:text-6xl">
              {cert.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
              {learningLoop
                ? `New to ${cert.code}? Take the diagnostic first. If you already know where you stand, jump straight into practice or a timed exam.`
                : 'Start with a short practice block. Once you answer questions, this page will show simple progress signals.'}
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button as={Link} to={primaryAction.to} variant="accent" size="lg" accentColor={cert.color}>
              <Sparkles className="h-5 w-5" />
              {primaryAction.label}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button as={Link} to="quiz" variant="secondary" size="lg">
              Practice
            </Button>
            <Button as={Link} to="exam" variant="secondary" size="lg">
              Exam simulator
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard icon={BookOpenCheck} label="Answered" value={overall.totalQuestions} />
            <MetricCard icon={CheckCircle2} label="Correct" value={overall.correctAnswers} />
            <MetricCard icon={Gauge} label="Readiness" value={overall.totalQuestions ? `${readiness}%` : 'New'} accentColor={cert.color} />
            <MetricCard icon={Activity} label="Sessions" value={overall.quizzesTaken + overall.examsTaken} />
          </div>
        </Surface>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ActionCard
          icon={BookOpenCheck}
          title="Practice"
          body={cert.objectives?.length
            ? 'Answer questions, review explanations, or focus one objective.'
            : 'Answer questions, review explanations, or focus one domain.'}
          to="quiz"
          cta="Start practice"
          color="#6366f1"
        />
        <ActionCard
          icon={Timer}
          title="Timed drill"
          body="Ten questions under a ten-minute clock when you want a quick rep."
          to="drill"
          cta="Start drill"
          color="#f43f5e"
        />
        <ActionCard
          icon={ShieldCheck}
          title="Exam simulator"
          body={`${cert.examQuestions} questions with timing and scoring closer to the real exam experience.`}
          to="exam"
          cta="Begin exam"
          color={cert.color}
        />
      </section>

      {hasStarted && (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <Surface className="p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{hasBaseline ? 'Domain evidence' : 'Early practice snapshot'}</p>
                <h2 className="mt-2 text-2xl font-black text-zinc-50">{hasBaseline ? 'Readiness by exam domain' : 'Not a readiness map yet'}</h2>
                {!hasBaseline && (
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
                    These results come from limited practice. Complete the diagnostic or an exam simulation before using them to judge strengths and weaknesses.
                  </p>
                )}
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
                {!hasBaseline
                  ? 'Early objective snapshot'
                  : weakObjectives.length
                    ? 'Your next three study targets'
                    : 'Build an objective-level signal'}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                {hasBaseline
                  ? 'Accuracy shows performance on attempted questions. Coverage shows how much of that objective you have actually seen.'
                  : 'A few practice answers can show what you have seen, but they are not enough to rank strengths and weaknesses. Complete the diagnostic first.'}
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
      <div className="flex h-full min-h-44 flex-col justify-between">
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ color, borderColor: `${color}45`, backgroundColor: `${color}12` }}>
            {createElement(Icon, { className: 'h-5 w-5' })}
          </div>
          <h3 className="mt-5 text-xl font-black text-zinc-50">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold" style={{ color }}>
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
