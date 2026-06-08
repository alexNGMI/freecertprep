import { createElement } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Gauge, ShieldCheck, Timer } from 'lucide-react'
import { useCert } from '../hooks/useCert'
import { useExamSession } from '../hooks/useExamSession'
import QuestionCard from '../components/QuestionCard'
import { QuestionNavigator, StudyWorkspace } from '../components/StudyWorkspace'
import { StudyHeader } from '../components/StudyHeader'
import { Button } from '../components/ui/button'
import { Surface } from '../components/ui/surface'
import { readinessTarget } from '../utils/readiness'
import { formatTime } from '../utils/time'

export default function Exam() {
  const cert = useCert()
  const questions = cert.questions
  const {
    answeredCount,
    currentIndex,
    currentQuestion,
    examQuestionCount: EXAM_QUESTIONS,
    examQuestions,
    finishExam,
    goNext,
    goPrevious,
    goToQuestion,
    selectAnswer,
    selectedAnswers,
    setStarted,
    started,
    timeLeft,
  } = useExamSession({ cert, questions, resultsPath: `/${cert.id}/results` })

  if (!started) {
    return (
      <div className="mx-auto max-w-5xl space-y-8 animate-fade-up">
        <StudyHeader
          eyebrow="Exam simulator"
          title="Run a readiness simulation"
          subtitle={`An exam-shaped ${cert.title} practice form with official domain weighting, a strict timer, and no answer feedback until the results screen.`}
          cert={cert}
          stats={[
            { label: 'Questions', value: EXAM_QUESTIONS, icon: ClipboardList },
            { label: 'Minutes', value: cert.examTime, icon: Timer },
            { label: 'Target', value: readinessTarget(cert), icon: ShieldCheck },
          ]}
        />

        <Surface className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-6 border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <ExamMetric icon={ClipboardList} label="Exam size" value={EXAM_QUESTIONS} />
                <ExamMetric icon={Timer} label="Time limit" value={`${cert.examTime}m`} />
                <ExamMetric icon={Gauge} label="Target" value={readinessTarget(cert)} />
              </div>
              <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Rules</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Navigate freely between questions.</li>
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Answers are scored only when you submit or time expires.</li>
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Your final report updates dashboard history.</li>
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Vendor exams may include unscored items, scaled scoring, or richer interaction types.</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-between p-6 lg:p-8">
              <div>
                <ShieldCheck className="h-12 w-12" style={{ color: cert.color }} />
                <h2 className="mt-5 text-3xl font-black text-zinc-50">Ready check</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Start only when you can finish in one sitting. The timer begins immediately.
                </p>
              </div>
              <Button
                id="begin-exam-btn"
                onClick={() => setStarted(true)}
                variant="accent"
                size="lg"
                accentColor={cert.color}
                className="mt-8 w-full"
              >
                Begin Readiness Simulation
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Surface>
      </div>
    )
  }

  const timerWarning = timeLeft < 300

  return (
    <StudyWorkspace
      cert={cert}
      title="Exam Simulator"
      subtitle={currentQuestion.domain}
      modeLabel="Live exam"
      currentIndex={currentIndex}
      total={EXAM_QUESTIONS}
      answeredCount={answeredCount}
      timer={formatTime(timeLeft)}
      timerColor={timerWarning ? '#fb7185' : cert.color}
      navigator={
        <div className="space-y-5">
          <QuestionNavigator
            items={examQuestions}
            currentIndex={currentIndex}
            selectedAnswers={selectedAnswers}
            onGoToQuestion={goToQuestion}
            accentColor={cert.color}
          />
          <Button id="end-exam-btn" onClick={finishExam} variant="danger" className="w-full">
            Submit Exam
          </Button>
        </div>
      }
      footer={
        <>
          <Button id="exam-prev-btn" onClick={goPrevious} disabled={currentIndex === 0} variant="secondary">
            <ArrowLeft className="h-5 w-5" />
            Previous
          </Button>
          {currentIndex < EXAM_QUESTIONS - 1 ? (
            <Button id="exam-next-btn" onClick={goNext} variant="accent" accentColor={cert.color}>
              Next Question
              <ArrowRight className="h-5 w-5" />
            </Button>
          ) : (
            <Button id="exam-submit-btn" onClick={finishExam} variant="accent" accentColor="#6366f1">
              Submit Entire Exam
            </Button>
          )}
        </>
      }
    >
      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={selectAnswer}
        answered={false}
        selectedChoice={selectedAnswers[currentIndex]}
        examMode={true}
      />
    </StudyWorkspace>
  )
}

function ExamMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
      <div className="flex items-center gap-2 text-zinc-500">
        {createElement(Icon, { className: 'h-4 w-4' })}
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-black text-zinc-50">{value}</p>
    </div>
  )
}
