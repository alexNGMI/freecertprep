import { useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, Map } from 'lucide-react'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import { useQuestionStats } from '../hooks/useQuestionStats'
import { isAnswerComplete, isAnswerCorrect } from '../utils/scoring'
import { buildMasteryMap, MASTERY_LEVELS, selectDiagnosticQuestions } from '../utils/learning-loop'
import QuestionCard from '../components/QuestionCard'
import { QuestionNavigator, StudyWorkspace } from '../components/StudyWorkspace'
import { StudyHeader } from '../components/StudyHeader'
import { Button } from '../components/ui/button'
import { Surface } from '../components/ui/surface'

const DIAGNOSTIC_SIZE = 35

export default function Diagnostic() {
  const cert = useCert()
  const { addQuizResult } = useProgress(cert.id)
  const { certStats, recordSession } = useQuestionStats(cert.id)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [diagnosticQuestions, setDiagnosticQuestions] = useState([])
  const [completedAt, setCompletedAt] = useState(null)

  const begin = () => {
    setDiagnosticQuestions(selectDiagnosticQuestions(cert.questions, cert.objectives, DIAGNOSTIC_SIZE))
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
    return buildMasteryMap(cert.questions, mergedStats, cert.objectives, completedAt)
  }, [cert.questions, cert.objectives, certStats, completedAt, diagnosticQuestions, finished, selectedAnswers])

  if (cert.id !== 'comptia-net-plus') return <Navigate to={`/${cert.id}`} replace />

  if (!started) {
    return (
      <div className="mx-auto max-w-5xl space-y-8">
        <StudyHeader
          eyebrow="Diagnostic assessment"
          title="Find the gaps before you study."
          subtitle="This is a measurement tool, not a pass/fail exam. It samples every official Network+ objective and withholds feedback until the end."
          cert={cert}
          stats={[
            { label: 'Questions', value: DIAGNOSTIC_SIZE, icon: ClipboardCheck },
            { label: 'Objectives', value: cert.objectives.length, icon: Map },
          ]}
        />
        <Surface className="grid gap-6 p-6 md:grid-cols-3">
          <Rule number="01" title="Answer cold" body="Use what you know now. Looking everything up would make the study plan less useful." />
          <Rule number="02" title="Skip honestly" body="An unanswered question is evidence that the objective needs measurement, not a personal failure." />
          <Rule number="03" title="Study the map" body="The result feeds your mastery map and creates an ordered study plan." />
        </Surface>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button as={Link} to={`/${cert.id}/learning`} variant="secondary" size="lg">
            <ArrowLeft className="h-5 w-5" />
            Learning plan
          </Button>
          <Button onClick={begin} variant="accent" size="lg" accentColor={cert.color}>
            Start diagnostic
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    )
  }

  if (finished) {
    const counts = result.reduce((summary, objective) => {
      summary[objective.level] += 1
      return summary
    }, { strong: 0, developing: 0, weak: 0, unmeasured: 0 })
    return (
      <div className="mx-auto max-w-5xl space-y-8">
        <StudyHeader
          eyebrow="Diagnostic complete"
          title="Your baseline is ready."
          subtitle="The result is now part of your objective history. Repeated practice will increase confidence and can move objectives between levels."
          cert={cert}
          stats={[
            { label: 'Answered', value: `${answeredCount}/${diagnosticQuestions.length}`, icon: CheckCircle2 },
            { label: 'Measured', value: `${result.length - counts.unmeasured}/${result.length}`, icon: Map },
          ]}
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Object.entries(MASTERY_LEVELS).map(([level, meta]) => (
            <Surface key={level} className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{meta.label}</p>
              <p className="mt-3 text-4xl font-black" style={{ color: meta.color }}>{counts[level]}</p>
            </Surface>
          ))}
        </div>
        <Surface className="p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Priority objectives</p>
          <div className="mt-4 space-y-3">
            {result.filter(item => item.level === 'weak' || item.level === 'developing').slice(0, 5).map(item => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-zinc-900/55 p-4">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: MASTERY_LEVELS[item.level].color }}>
                  Objective {item.id} · {MASTERY_LEVELS[item.level].label}
                </p>
                <p className="mt-1 font-bold text-zinc-100">{item.title}</p>
              </div>
            ))}
          </div>
        </Surface>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button onClick={begin} variant="secondary" size="lg">Run another form</Button>
          <Button as={Link} to={`/${cert.id}/learning`} variant="accent" size="lg" accentColor={cert.color}>
            Open mastery map
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
      title="Network+ Diagnostic"
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
