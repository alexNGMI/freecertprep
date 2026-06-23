import { ArrowLeft, ArrowRight, CheckCircle2, Flame, ListChecks, Timer, Zap } from 'lucide-react'
import { useCert } from '../hooks/useCert'
import { useBookmarks } from '../hooks/useBookmarks'
import { useTimedDrillSession } from '../hooks/useTimedDrillSession'
import QuestionCard from '../components/QuestionCard'
import { StudyHeader } from '../components/StudyHeader'
import { StudyWorkspace } from '../components/StudyWorkspace'
import { Button } from '../components/ui/button'
import { Surface } from '../components/ui/surface'
import { formatTime, timerColor, TIMER_PALETTE_DARK } from '../utils/time'
import { cn } from '../utils/cn'

const DRILL_QUESTIONS = 10
const DRILL_TIME = 600

export default function Drill() {
  const cert = useCert()
  const questions = cert.questions
  const { toggle: toggleBookmark, isBookmarked } = useBookmarks(cert.id)
  const {
    answers,
    backToSetup,
    currentAnswer,
    currentIndex,
    currentQuestion,
    drillQuestions,
    drillStarted,
    handleAnswer,
    handleNext,
    isLastQuestion,
    showResult,
    startDrill,
    timeLeft,
  } = useTimedDrillSession({ cert, questions, questionCount: DRILL_QUESTIONS, duration: DRILL_TIME })

  if (!drillStarted) {
    return (
      <div className="mx-auto max-w-5xl space-y-8 animate-fade-up">
        <StudyHeader
          eyebrow="Timed drill"
          title="Practice under pressure"
          subtitle="A short sprint that weights questions by your weak areas and saves the result to Smart Practice."
          cert={cert}
          stats={[
            { label: 'Questions', value: DRILL_QUESTIONS, icon: ListChecks },
            { label: 'Clock', value: '10:00', icon: Timer },
            { label: 'Pass', value: `${cert.passingScore}%`, icon: CheckCircle2 },
          ]}
        />

        <Surface className="grid gap-6 p-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            {[
              ['Weak areas are sampled first', 'Smart Practice stats influence the pool.'],
              ['Feedback is immediate', 'Every question still teaches after you answer.'],
              ['The clock is real', 'If time expires, the drill closes automatically.'],
              ['History is saved', 'The dashboard updates after each drill.'],
            ].map(([title, body]) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-300">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-zinc-100">{title}</p>
                  <p className="text-sm text-zinc-500">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between rounded-3xl border border-rose-500/20 bg-rose-500/10 p-6">
            <div>
              <Flame className="h-10 w-10 text-rose-300" />
              <h2 className="mt-5 text-3xl font-black text-zinc-50">10 minute sprint</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">Best for warming up before a full simulator attempt.</p>
            </div>
            <Button onClick={startDrill} variant="accent" size="lg" accentColor={cert.color} className="mt-8 w-full">
              Start Drill
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Surface>
      </div>
    )
  }

  if (showResult) {
    const correct = answers.filter(a => a.correct).length
    const total = answers.length
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0
    const passed = pct >= cert.passingScore
    const timedOut = timeLeft === 0
    const timeUsed = DRILL_TIME - timeLeft

    return (
      <div className="mx-auto max-w-3xl space-y-8 animate-fade-up">
        <StudyHeader
          eyebrow="Drill complete"
          title={timedOut ? 'Clock caught you.' : 'Sprint finished.'}
          subtitle={timedOut ? 'The unfinished questions still count as a useful pacing signal.' : `Finished in ${formatTime(timeUsed)}.`}
          cert={cert}
          stats={[
            { label: 'Score', value: `${pct}%`, icon: CheckCircle2 },
            { label: 'Correct', value: `${correct}/${total}`, icon: ListChecks },
          ]}
        />
        <Surface className="p-8 text-center md:p-12">
          <p className={cn('text-7xl font-black tracking-tight', passed ? 'text-emerald-400' : 'text-rose-400')}>{pct}%</p>
          <p className="mt-4 text-zinc-400">{correct} of {total} correct.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={startDrill} variant="accent" size="lg" accentColor={cert.color}>New Drill</Button>
            <Button onClick={backToSetup} variant="secondary" size="lg">
              <ArrowLeft className="h-5 w-5" />
              Back
            </Button>
          </div>
        </Surface>
      </div>
    )
  }

  const color = timerColor(timeLeft, DRILL_TIME, TIMER_PALETTE_DARK)

  return (
    <StudyWorkspace
      cert={cert}
      title="Timed Drill"
      subtitle={currentQuestion.domain}
      modeLabel="Sprint mode"
      currentIndex={currentIndex}
      total={drillQuestions.length}
      answeredCount={answers.length}
      timer={formatTime(timeLeft)}
      timerColor={color}
      footer={currentAnswer && (
        <div className="ml-auto">
          <Button onClick={handleNext} variant="accent" size="lg" accentColor={cert.color}>
            {isLastQuestion ? 'See Results' : 'Next'}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    >
      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={handleAnswer}
        answered={!!currentAnswer}
        selectedChoice={currentAnswer?.selected}
        isBookmarked={isBookmarked(currentQuestion.id)}
        onToggleBookmark={toggleBookmark}
        certId={cert.id}
      />
    </StudyWorkspace>
  )
}
