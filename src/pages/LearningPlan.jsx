import { createElement, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowRight, CalendarDays, ClipboardCheck, Map, Network, Route, Wrench } from 'lucide-react'
import { useCert } from '../hooks/useCert'
import { useQuestionStats } from '../hooks/useQuestionStats'
import { buildMasteryMap, buildStudyPlan, MASTERY_LEVELS } from '../utils/learning-loop'
import { formatLearningTarget, getLearningLoopConfig, getLearningObjectives } from '../utils/learning-loop-config'
import { Button } from '../components/ui/button'
import { DomainBadge, Surface } from '../components/ui/surface'
import { StudyHeader } from '../components/StudyHeader'
import StudyLoopNav from '../components/StudyLoopNav'

export default function LearningPlan() {
  const cert = useCert()
  const config = getLearningLoopConfig(cert.id)
  const learningObjectives = useMemo(() => getLearningObjectives(cert), [cert])
  const { certStats } = useQuestionStats(cert.id)
  const [planDays, setPlanDays] = useState(14)
  const mastery = useMemo(
    () => buildMasteryMap(cert.questions, certStats, learningObjectives),
    [cert.questions, certStats, learningObjectives],
  )
  const plan = useMemo(() => buildStudyPlan(mastery, planDays), [mastery, planDays])
  const bestNextBlock = plan[0]
  const counts = mastery.reduce((result, item) => {
    result[item.level] += 1
    return result
  }, { strong: 0, developing: 0, weak: 0, unmeasured: 0 })
  const measured = mastery.length - counts.unmeasured

  if (!config) return <Navigate to={`/${cert.id}`} replace />

  if (!measured) {
    return (
      <div className="space-y-8 animate-fade-up">
        <StudyHeader
          eyebrow={config.eyebrow}
          title={config.title}
          subtitle={config.subtitle}
          cert={cert}
          stats={[
            { label: 'Measured', value: `0/${mastery.length}`, icon: Map },
            { label: 'Plan', value: 'Locked', icon: CalendarDays },
          ]}
        />
        <StudyLoopNav cert={cert} current="plan" />

        <Surface className="p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: cert.color }}>First useful step</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-50">Get one honest baseline.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                The study plan is intentionally quiet until you have evidence. Take the diagnostic cold, skip what you do not know, then this page turns into a ranked repair plan instead of a list of every possible topic.
              </p>
            </div>
            <Button as={Link} to="diagnostic" variant="accent" size="lg" accentColor={cert.color} className="w-full">
              Start diagnostic
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Surface>

        <section className="grid gap-4 md:grid-cols-3">
          <PrepCard number="01" title="Measure" body={`A ${config.diagnosticSize}-question diagnostic samples the ${config.measuredLabel}.`} color={cert.color} />
          <PrepCard number="02" title="Map" body="Your results separate strong, developing, weak, and unmeasured targets." color={cert.color} />
          <PrepCard number="03" title="Work" body="The plan will point to focused practice, applied cases, and a readiness checkpoint." color={cert.color} />
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <StudyHeader
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.subtitle}
        cert={cert}
        stats={[
          { label: 'Measured', value: `${measured}/${mastery.length}`, icon: Map },
          { label: 'Plan', value: `${planDays} days`, icon: CalendarDays },
        ]}
        action={(
          <Button as={Link} to="diagnostic" variant="accent" size="lg" accentColor={cert.color}>
            <ClipboardCheck className="h-5 w-5" />
            {measured ? 'Retake diagnostic' : 'Start diagnostic'}
          </Button>
        )}
      />
      <StudyLoopNav cert={cert} current="plan" />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(MASTERY_LEVELS).map(([level, meta]) => (
          <Surface key={level} className="p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{meta.label}</p>
            <p className="mt-3 text-4xl font-black" style={{ color: meta.color }}>{counts[level]}</p>
            <p className="mt-2 text-sm text-zinc-500">{config.measuredLabel}</p>
          </Surface>
        ))}
      </section>

      {bestNextBlock && (
        <Surface className="p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: cert.color }}>Best next block</p>
              <h2 className="mt-2 text-2xl font-black text-zinc-50">{bestNextBlock.activity}</h2>
              <p className="mt-2 text-sm text-zinc-500">{formatLearningTarget(config, bestNextBlock.objectiveId)} - {bestNextBlock.domain}</p>
              <p className="mt-1 font-bold text-zinc-100">{bestNextBlock.objectiveTitle}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">{bestNextBlock.reason}</p>
            </div>
            <Button
              as={Link}
              to={bestNextBlock.route.startsWith('quiz') ? `../${bestNextBlock.route}` : bestNextBlock.route}
              variant="accent"
              size="lg"
              accentColor={cert.color}
              className="w-full"
            >
              Start this block
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Surface>
      )}

      <Surface className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Evidence by target</p>
            <h2 className="mt-2 text-2xl font-black text-zinc-50">What your practice evidence says</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
              A target needs repeated coverage before it can become Strong. Untested material stays Not measured instead of being mislabeled as weak.
            </p>
          </div>
          <DomainBadge color={cert.color}>{learningObjectives.length} targets</DomainBadge>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {mastery.map(objective => {
            const meta = MASTERY_LEVELS[objective.level]
            return (
              <Link
                key={objective.id}
                to={`../quiz?objective=${objective.id}`}
                className="group rounded-2xl border border-white/10 bg-zinc-900/55 p-5 transition hover:border-white/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider" style={{ color: cert.color }}>
                      {formatLearningTarget(config, objective.id)} · {objective.domain}
                    </p>
                    <p className="mt-2 font-black text-zinc-100">{objective.title}</p>
                  </div>
                  <span className="shrink-0 rounded-lg border px-2.5 py-1 text-xs font-bold" style={{ color: meta.color, borderColor: `${meta.color}55`, backgroundColor: `${meta.color}12` }}>
                    {meta.label}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
                  <Metric label="Accuracy" value={objective.accuracy === null ? 'New' : `${objective.accuracy}%`} />
                  <Metric label="Coverage" value={`${objective.coverage}%`} />
                  <Metric label="Evidence strength" value={`${objective.evidenceStrength}%`} />
                </div>
              </Link>
            )
          })}
        </div>
      </Surface>

      <Surface className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Study Plan</p>
            <h2 className="mt-2 text-2xl font-black text-zinc-50">Your next work, in order</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
              These blocks are ordered by weakest evidence, low coverage, and unmeasured targets so the next session is obvious.
            </p>
          </div>
          <div className="inline-flex rounded-xl border border-white/10 bg-zinc-900/70 p-1">
            {[7, 14, 30].map(days => (
              <button
                key={days}
                type="button"
                onClick={() => setPlanDays(days)}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition ${planDays === days ? 'text-zinc-950' : 'text-zinc-400 hover:text-zinc-200'}`}
                style={planDays === days ? { backgroundColor: cert.color } : undefined}
              >
                {days} days
              </button>
            ))}
          </div>
        </div>

        {plan.length ? (
          <div className="mt-6 space-y-3">
            {plan.map((item, index) => (
              <Link
                key={`${item.day}-${item.objectiveId}-${index}`}
                to={item.route.startsWith('quiz') ? `../${item.route}` : item.route}
                className="grid gap-4 rounded-2xl border border-white/10 bg-zinc-900/55 p-5 transition hover:border-white/20 md:grid-cols-[80px_180px_minmax(0,1fr)_auto] md:items-center"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Day</p>
                  <p className="mt-1 text-2xl font-black text-zinc-100">{item.day}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: MASTERY_LEVELS[item.level].color }}>{item.activity}</p>
                  <p className="mt-1 text-sm text-zinc-500">{item.questionTarget} questions</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">{formatLearningTarget(config, item.objectiveId)} · {item.domain}</p>
                  <p className="mt-1 font-bold text-zinc-100">{item.objectiveTitle}</p>
                  <p className="mt-1 text-sm text-zinc-500">{item.reason}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-zinc-600" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
            <p className="font-bold text-emerald-200">Every measured target is currently strong.</p>
            <p className="mt-2 text-sm text-emerald-100/70">Use a diagnostic or full exam to refresh the evidence and expose any remaining gaps.</p>
          </div>
        )}
      </Surface>

      <section className="grid gap-4 md:grid-cols-3">
        <LoopCard icon={ClipboardCheck} title="Diagnostic" body={`A balanced assessment that touches ${learningObjectives.length} measured targets.`} to="diagnostic" />
        <LoopCard icon={Wrench} title="Case practice" body={config.caseCategories.join(', ')} to="cases" />
        <LoopCard icon={Network} title="Exam simulation" body="Test the full blueprint, then receive a debrief." to="../exam" />
      </section>
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950/55 p-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">{label}</p>
      <p className="mt-1 font-black text-zinc-200">{value}</p>
    </div>
  )
}

function PrepCard({ number, title, body, color }) {
  return (
    <Surface className="p-6">
      <p className="text-xs font-black uppercase tracking-wider" style={{ color }}>{number}</p>
      <h2 className="mt-3 text-xl font-black text-zinc-100">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
    </Surface>
  )
}

function LoopCard({ icon: Icon, title, body, to }) {
  return (
    <Surface as={Link} to={to} interactive className="group p-6">
      {createElement(Icon, { className: 'h-6 w-6 text-zinc-400' })}
      <h3 className="mt-5 text-xl font-black text-zinc-50">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-300">
        Open
        <Route className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Surface>
  )
}
