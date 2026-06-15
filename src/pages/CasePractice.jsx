import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Network, Wrench } from 'lucide-react'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import { useQuestionStats } from '../hooks/useQuestionStats'
import { isAnswerCorrect } from '../utils/scoring'
import { selectCaseQuestions } from '../utils/learning-loop'
import QuestionCard from '../components/QuestionCard'
import { StudyHeader } from '../components/StudyHeader'
import { StudyWorkspace } from '../components/StudyWorkspace'
import { Button } from '../components/ui/button'
import { Surface } from '../components/ui/surface'

const CASE_SIZE = 10

export default function CasePractice() {
  const cert = useCert()
  const { addQuizResult } = useProgress(cert.id)
  const { recordSession } = useQuestionStats(cert.id)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  if (cert.id !== 'comptia-net-plus') return <Navigate to={`/${cert.id}`} replace />

  const start = () => {
    setQuestions(selectCaseQuestions(cert.questions, CASE_SIZE))
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
          title="Work the network, not the vocabulary."
          subtitle="Interpret command output, inspect topologies, repair configuration, and calculate subnet values in applied troubleshooting scenarios."
          cert={cert}
          stats={[
            { label: 'Cases', value: CASE_SIZE, icon: Wrench },
            { label: 'Feedback', value: 'Immediate', icon: Network },
          ]}
        />
        <Surface className="p-6">
          <div className="grid gap-5 md:grid-cols-4">
            {['CLI evidence', 'Topology reasoning', 'Configuration repair', 'Subnetting'].map(item => (
              <div key={item} className="rounded-2xl border border-white/10 bg-zinc-900/55 p-5">
                <p className="font-black text-zinc-100">{item}</p>
                <p className="mt-2 text-sm text-zinc-500">Explain the evidence, choose the action, and verify the result.</p>
              </div>
            ))}
          </div>
        </Surface>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button as={Link} to=".." variant="secondary" size="lg">
            <ArrowLeft className="h-5 w-5" />
            Learning plan
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
    return (
      <div className="mx-auto max-w-4xl space-y-8">
        <StudyHeader
          eyebrow="Case set complete"
          title={`${correct} of ${questions.length} resolved.`}
          subtitle="These results now contribute to the same objective mastery evidence as your other practice."
          cert={cert}
          stats={[{ label: 'Case accuracy', value: `${Math.round((correct / questions.length) * 100)}%`, icon: CheckCircle2 }]}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button onClick={start} variant="secondary" size="lg">New case set</Button>
          <Button as={Link} to=".." variant="accent" size="lg" accentColor={cert.color}>
            Review mastery map
            <ArrowRight className="h-5 w-5" />
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
      title="Network+ Case Practice"
      subtitle={currentQuestion.domain}
      modeLabel="Applied troubleshooting"
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
      />
    </StudyWorkspace>
  )
}
