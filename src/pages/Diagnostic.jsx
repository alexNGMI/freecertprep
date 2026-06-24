import { useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, Map, Timer, Wrench } from 'lucide-react'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import { useQuestionStats } from '../hooks/useQuestionStats'
import { isAnswerComplete, isAnswerCorrect } from '../utils/scoring'
import { buildMasteryMap, MASTERY_LEVELS, selectDiagnosticQuestions, summarizeAppliedPerformance } from '../utils/learning-loop'
import { formatLearningTarget, getLearningLoopConfig, getLearningObjectives } from '../utils/learning-loop-config'
import QuestionCard from '../components/QuestionCard'
import { QuestionNavigator, StudyWorkspace } from '../components/StudyWorkspace'
import { StudyHeader } from '../components/StudyHeader'
import { Button } from '../components/ui/button'
import { Surface } from '../components/ui/surface'
import StudyLoopNav from '../components/StudyLoopNav'

export default function Diagnostic() {
  const cert = useCert()
  const config = getLearningLoopConfig(cert.id)
  const learningObjectives = useMemo(() => getLearningObjectives(cert), [cert])
  const { addQuizResult } = useProgress(cert.id)
  const { certStats, recordSession } = useQuestionStats(cert.id)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [diagnosticQuestions, setDiagnosticQuestions] = useState([])
  const [completedAt, setCompletedAt] = useState(null)

  const begin = () => {
    setDiagnosticQuestions(selectDiagnosticQuestions(cert.questions, learningObjectives, config.diagnosticSize))
    setSelectedAnswers({})
    setCurrentIndex(0)
    setFinished(false)
    setStarted(true)
  }

  const submit = () => {
    const answers = diagnosticQuestions.map((question, index) => ({
      questionId: question.id,
      domain: question.domain,
      selected: selectedAnswers[index] ?? -1,
      correct: isAnswerCorrect(selectedAnswers[index], question),
      complete: isAnswerComplete(selectedAnswers[index], question),
    }))
    const completedAnswers = answers.filter(answer => answer.complete)
    addQuizResult({ domain: 'Diagnostic', kind: 'diagnostic', answers: completedAnswers })
    recordSession(completedAnswers)
    setCompletedAt(Date.now())
    setFinished(true)
  }

  const answeredCount = diagnosticQuestions.reduce(
    (count, question, index) => count + (isAnswerComplete(selectedAnswers[index], question) ? 1 : 0),
    0,
  )

  const result = useMemo(() => {
    if (!finished) return null
    const mergedStats = { ...certStats }
    diagnosticQuestions.forEach((question, index) => {
      if (!isAnswerComplete(selectedAnswers[index], question)) return
      const current = mergedStats[question.id] || { attempts: 0, correct: 0 }
      const correct = isAnswerCorrect(selectedAnswers[index], question)
      mergedStats[question.id] = {
        ...current,
        attempts: current.attempts + 1,
        correct: current.correct + (correct ? 1 : 0),
        lastSeen: completedAt,
      }
    })
    return buildMasteryMap(cert.questions, mergedStats, learningObjectives, completedAt)
  }, [cert.questions, certStats, completedAt, diagnosticQuestions, finished, learningObjectives, selectedAnswers])

  if (!config) return <Navigate to={`/${cert.id}`} replace />

  if (!started) {
    return (
      <div className="mx-auto max-w-5xl space-y-8">
        <StudyHeader
          eyebrow="Diagnostic assessment"
          title={config.diagnosticTitle}
          subtitle={config.diagnosticSubtitle}
          cert={cert}
          stats={[
            { label: 'Questions', value: config.diagnosticSize, icon: ClipboardCheck },
            { label: 'Targets', value: learningObjectives.length, icon: Map },
            { label: 'Time', value: `About ${config.diagnosticSize} min`, icon: Timer },
          ]}
          action={(
            <Button onClick={begin} variant="accent" size="lg" accentColor={cert.color}>
              Start diagnostic
              <ArrowRight className="h-5 w-5" />
            </Button>
          )}
        />
        <StudyLoopNav cert={cert} current="diagnostic" />
        <Surface className="grid gap-6 p-6 md:grid-cols-3">
          <Rule number="01" title="Answer cold" body="Use what you know now. Looking everything up would make the study plan less useful." />
          <Rule number="02" title="Skip honestly" body="An unanswered question is evidence that the target needs measurement, not a personal failure." />
          <Rule number="03" title="Use the Study Plan" body="The result creates an ordered study plan from the evidence you collected." />
        </Surface>
        <Surface className="flex gap-4 border-amber-500/25 bg-amber-500/10 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
          <div>
            <p className="font-bold text-amber-100">Finish in this tab.</p>
            <p className="mt-1 text-sm leading-relaxed text-amber-100/75">
              Diagnostic answers are not saved until you submit. Closing or reloading this page will discard the session.
            </p>
          </div>
        </Surface>
        <div className="flex justify-start">
          <Button as={Link} to={`/${cert.id}/learning`} variant="secondary" size="lg">
            <ArrowLeft className="h-5 w-5" />
            Study Plan
          </Button>
        </div>
      </div>
    )
  }

  if (finished) {
    const completedAnswers = diagnosticQuestions
      .map((question, index) => ({
        questionId: question.id,
        domain: question.domain,
        selected: selectedAnswers[index] ?? -1,
        correct: isAnswerCorrect(selectedAnswers[index], question),
        complete: isAnswerComplete(selectedAnswers[index], question),
      }))
      .filter(answer => answer.complete)
    const appliedSummary = summarizeAppliedPerformance(completedAnswers, diagnosticQuestions)
    const priorityTargets = result
      .filter(item => item.level === 'weak' || item.level === 'developing')
      .concat(result.filter(item => item.level === 'unmeasured'))
      .slice(0, 5)
    const bestTarget = priorityTargets[0]
    const counts = result.reduce((summary, objective) => {
      summary[objective.level] += 1
      return summary
    }, { strong: 0, developing: 0, weak: 0, unmeasured: 0 })
    return (
      <div className="mx-auto max-w-5xl space-y-8">
        <StudyHeader
          eyebrow="Diagnostic complete"
          title="Your baseline is ready."
          subtitle="The result is now part of your study history. Repeated practice strengthens the evidence and can move targets between levels."
          cert={cert}
          stats={[
            { label: 'Answered', value: `${answeredCount}/${diagnosticQuestions.length}`, icon: CheckCircle2 },
            { label: 'Measured', value: `${result.length - counts.unmeasured}/${result.length}`, icon: Map },
          ]}
        />
        <StudyLoopNav cert={cert} current="diagnostic" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Object.entries(MASTERY_LEVELS).map(([level, meta]) => (
            <Surface key={level} className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{meta.label}</p>
              <p className="mt-3 text-4xl font-black" style={{ color: meta.color }}>{counts[level]}</p>
            </Surface>
          ))}
        </div>
        <Surface className="p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: cert.color }}>Best next move</p>
              <h2 className="mt-2 text-2xl font-black text-zinc-50">
                {bestTarget ? `Work ${formatLearningTarget(config, bestTarget.id)} before retaking this.` : 'Move into a mixed readiness check.'}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                {bestTarget
                  ? `${bestTarget.title} is the highest-value next block from this baseline. Do one focused set, then use the Study Plan to decide whether to add cases or retest.`
                  : 'No measured target produced an obvious repair block. Use the Study Plan or an exam simulation to look for a wider readiness signal.'}
              </p>
              {appliedSummary.total > 0 && (
                <p className="mt-3 text-sm font-semibold text-amber-200">
                  Applied items: {appliedSummary.missed} missed out of {appliedSummary.total}. Case practice is worth doing after the focused block.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              {bestTarget && (
                <Button as={Link} to={`/${cert.id}/quiz?objective=${bestTarget.id}`} variant="accent" size="lg" accentColor={cert.color} className="w-full">
                  Practice this target
                  <ArrowRight className="h-5 w-5" />
                </Button>
              )}
              <Button as={Link} to={`/${cert.id}/learning/cases`} variant="secondary" size="lg" className="w-full">
                <Wrench className="h-5 w-5" />
                Applied cases
              </Button>
            </div>
          </div>
        </Surface>
        <Surface className="p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Why this is next</p>
          <div className="mt-4 space-y-3">
            {priorityTargets.map(item => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-zinc-900/55 p-4">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: MASTERY_LEVELS[item.level].color }}>
                  {formatLearningTarget(config, item.id)} · {MASTERY_LEVELS[item.level].label}
                </p>
                <p className="mt-1 font-bold text-zinc-100">{item.title}</p>
              </div>
            ))}
          </div>
        </Surface>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button onClick={begin} variant="secondary" size="lg">Retake later</Button>
          <Button as={Link} to={`/${cert.id}/learning`} variant="accent" size="lg" accentColor={cert.color}>
            Open Study Plan
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    )
  }

  const currentQuestion = diagnosticQuestions[currentIndex]
  return (
    <StudyWorkspace
      cert={cert}
      title={config.diagnosticModeTitle}
      subtitle={currentQuestion.domain}
      modeLabel="No feedback until submission"
      currentIndex={currentIndex}
      total={diagnosticQuestions.length}
      answeredCount={answeredCount}
      navigator={(
        <QuestionNavigator
          items={diagnosticQuestions}
          currentIndex={currentIndex}
          selectedAnswers={selectedAnswers}
          onGoToQuestion={setCurrentIndex}
          accentColor={cert.color}
        />
      )}
      footer={(
        <>
          <Button variant="secondary" onClick={() => setCurrentIndex(index => Math.max(0, index - 1))} disabled={currentIndex === 0}>
            Previous
          </Button>
          {currentIndex < diagnosticQuestions.length - 1 ? (
            <Button variant="accent" accentColor={cert.color} onClick={() => setCurrentIndex(index => index + 1)}>
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="accent" accentColor={cert.color} onClick={submit}>
              Submit diagnostic
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </>
      )}
    >
      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={answer => setSelectedAnswers(previous => ({ ...previous, [currentIndex]: answer }))}
        answered={false}
        selectedChoice={selectedAnswers[currentIndex]}
        examMode
        certId={cert.id}
      />
    </StudyWorkspace>
  )
}

function Rule({ number, title, body }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wider text-zinc-600">{number}</p>
      <h2 className="mt-3 text-xl font-black text-zinc-100">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
    </div>
  )
}
