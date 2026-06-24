import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Network, Wrench } from 'lucide-react'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import { useQuestionStats } from '../hooks/useQuestionStats'
import { isAnswerCorrect } from '../utils/scoring'
import { selectCaseQuestions, summarizeAppliedPerformance } from '../utils/learning-loop'
import { getLearningLoopConfig, getLearningObjectives } from '../utils/learning-loop-config'
import QuestionCard from '../components/QuestionCard'
import { StudyHeader } from '../components/StudyHeader'
import { StudyWorkspace } from '../components/StudyWorkspace'
import { Button } from '../components/ui/button'
import { Surface } from '../components/ui/surface'
import StudyLoopNav from '../components/StudyLoopNav'

const CASE_SIZE = 10

export default function CasePractice() {
  const cert = useCert()
  const config = getLearningLoopConfig(cert.id)
  const learningObjectives = getLearningObjectives(cert)
  const { addQuizResult } = useProgress(cert.id)
  const { recordSession } = useQuestionStats(cert.id)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!config) return <Navigate to={`/${cert.id}`} replace />

  const start = () => {
    setQuestions(selectCaseQuestions(cert.questions, CASE_SIZE, learningObjectives))
    setAnswers([])
    setCurrentIndex(0)
    setFinished(false)
    setStarted(true)
  }

  const answer = selected => {
    const question = questions[currentIndex]
    setAnswers(previous => [
      ...previous,
      { questionId: question.id, domain: question.domain, selected, correct: isAnswerCorrect(selected, question) },
    ])
  }

  const next = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(index => index + 1)
      return
    }
    addQuizResult({ domain: 'Case Practice', kind: 'case-practice', answers })
    recordSession(answers)
    setFinished(true)
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-5xl space-y-8">
        <StudyHeader
          eyebrow="Case-based practice"
          title={config.caseTitle}
          subtitle={config.caseSubtitle}
          cert={cert}
          stats={[
            { label: 'Cases', value: CASE_SIZE, icon: Wrench },
            { label: 'Feedback', value: 'Immediate', icon: Network },
          ]}
        />
        <StudyLoopNav cert={cert} current="cases" />
        <Surface className="p-6">
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-zinc-400">
            Case sets pull applied question formats first, then balance the set across troubleshooting evidence instead of repeating one style of prompt.
          </p>
          <div className="grid gap-5 md:grid-cols-4">
            {config.caseCategories.map(item => (
              <div key={item} className="rounded-2xl border border-white/10 bg-zinc-900/55 p-5">
                <p className="font-black text-zinc-100">{item}</p>
                <p className="mt-2 text-sm text-zinc-500">{config.caseBody}</p>
              </div>
            ))}
          </div>
        </Surface>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button as={Link} to={`/${cert.id}/learning`} variant="secondary" size="lg">
            <ArrowLeft className="h-5 w-5" />
            Study Plan
          </Button>
          <Button onClick={start} variant="accent" size="lg" accentColor={cert.color}>
            Start case set
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    )
  }

  if (finished) {
    const correct = answers.filter(item => item.correct).length
    const caseSummary = summarizeAppliedPerformance(answers, questions)
    return (
      <div className="mx-auto max-w-4xl space-y-8">
        <StudyHeader
          eyebrow="Case set complete"
          title={`${correct} of ${questions.length} resolved.`}
          subtitle="These results now contribute to the same objective mastery evidence as your other practice."
          cert={cert}
          stats={[{ label: 'Case accuracy', value: `${Math.round((correct / questions.length) * 100)}%`, icon: CheckCircle2 }]}
        />
        <StudyLoopNav cert={cert} current="cases" />
        {caseSummary.categories.length > 0 && (
          <Surface className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Applied skill breakdown</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {caseSummary.categories.map(item => (
                <div key={item.category} className="rounded-2xl border border-white/10 bg-zinc-900/55 p-4">
                  <p className="font-black text-zinc-100">{item.category}</p>
                  <p className="mt-2 text-sm text-zinc-500">
                    {item.correct}/{item.total} correct
                    {item.missed > 0 ? ` - ${item.missed} to repair` : ' - clean pass'}
                  </p>
                </div>
              ))}
            </div>
          </Surface>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button onClick={start} variant="secondary" size="lg">New case set</Button>
          <Button as={Link} to={`/${cert.id}/learning`} variant="accent" size="lg" accentColor={cert.color}>
            Review mastery map
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button as={Link} to={`/${cert.id}/exam`} variant="secondary" size="lg">
            Readiness simulation
          </Button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const currentAnswer = answers[currentIndex]
  return (
    <StudyWorkspace
      cert={cert}
      title={config.caseModeTitle}
      subtitle={currentQuestion.domain}
      modeLabel={config.caseModeLabel}
      currentIndex={currentIndex}
      total={questions.length}
      answeredCount={answers.length}
      footer={currentAnswer && (
        <div className="ml-auto">
          <Button onClick={next} variant="accent" size="lg" accentColor={cert.color}>
            {currentIndex < questions.length - 1 ? 'Next case' : 'Finish case set'}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    >
      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={answer}
        answered={!!currentAnswer}
        selectedChoice={currentAnswer?.selected}
        certId={cert.id}
      />
    </StudyWorkspace>
  )
}
