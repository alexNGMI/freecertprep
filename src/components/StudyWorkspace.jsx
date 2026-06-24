import { useEffect, useRef } from 'react'
import { CheckCircle2, Circle, Flag, Timer } from 'lucide-react'
import { motion as Motion } from 'motion/react'
import { Button } from './ui/button'
import { Surface } from './ui/surface'
import { cn } from '../utils/cn'
import { isAnswerComplete } from '../utils/scoring'

export function StudyWorkspace({
  cert,
  title,
  subtitle,
  currentIndex,
  total,
  answeredCount,
  timer,
  timerColor,
  modeLabel,
  navigator,
  children,
  footer,
}) {
  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0
  const answeredProgress = total > 0 ? ((answeredCount || 0) / total) * 100 : 0
  const questionRegionRef = useRef(null)
  const previousIndexRef = useRef(currentIndex)

  useEffect(() => {
    if (previousIndexRef.current !== currentIndex) {
      questionRegionRef.current?.focus()
      previousIndexRef.current = currentIndex
    }
  }, [currentIndex])

  return (
    <div className="space-y-6 animate-fade-up">
      <Surface className="overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r lg:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{modeLabel}</p>
                <h1 className="mt-1 text-2xl font-black text-zinc-50">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>}
              </div>
              <div className="flex items-center gap-3">
                {timer && (
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/80 px-4 py-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                      <Timer className="h-4 w-4" />
                      Time
                    </div>
                    <p className="mt-1 font-mono text-2xl font-black" style={{ color: timerColor || '#f4f4f5' }}>{timer}</p>
                  </div>
                )}
                <div className="rounded-2xl border border-white/10 bg-zinc-900/80 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                    <Flag className="h-4 w-4" />
                    Progress
                  </div>
                  <p className="mt-1 text-2xl font-black text-zinc-100" aria-live="polite">
                    <span className="sr-only">Current question </span>
                    {currentIndex + 1}<span className="text-sm text-zinc-500">/{total}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <div
                className="h-2 rounded-full bg-zinc-900"
                role="progressbar"
                aria-label="Questions viewed"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={currentIndex + 1}
                aria-valuetext={`Question ${currentIndex + 1} of ${total}`}
              >
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: cert.color }} />
              </div>
              {answeredCount !== undefined && (
                <div
                  className="h-1 rounded-full bg-zinc-900"
                  role="progressbar"
                  aria-label="Questions answered"
                  aria-valuemin={0}
                  aria-valuemax={total}
                  aria-valuenow={answeredCount || 0}
                >
                  <div className="h-full rounded-full bg-emerald-400/80 transition-all duration-300" style={{ width: `${answeredProgress}%` }} />
                </div>
              )}
            </div>
          </div>
          <aside className="p-5 lg:p-6">
            {navigator || (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Session</p>
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {answeredCount || 0} answered
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <Circle className="h-4 w-4 text-zinc-500" />
                  {Math.max(0, total - (answeredCount || 0))} remaining
                </div>
              </div>
            )}
          </aside>
        </div>
      </Surface>

      <Motion.div
        ref={questionRegionRef}
        key={currentIndex}
        tabIndex={-1}
        role="region"
        aria-label={`Question ${currentIndex + 1} of ${total}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        {children}
      </Motion.div>

      {footer && <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">{footer}</div>}
    </div>
  )
}

export function QuestionNavigator({ items, currentIndex, selectedAnswers = {}, onGoToQuestion, accentColor }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Question map</p>
      <div className="grid grid-cols-5 gap-2">
        {items.map((item, index) => {
          const isCurrent = index === currentIndex
          const isAnswered = item && typeof item === 'object'
            ? isAnswerComplete(selectedAnswers[index], item)
            : selectedAnswers[index] !== undefined
          return (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              onClick={() => onGoToQuestion(index)}
              aria-label={`Go to question ${index + 1}${isAnswered ? ' answered' : ''}`}
              aria-current={isCurrent ? 'step' : undefined}
              className={cn(
                'h-11 w-11 rounded-xl border text-xs',
                isCurrent && 'scale-105 text-zinc-950',
                !isCurrent && isAnswered && 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
                !isCurrent && !isAnswered && 'border-white/10 bg-zinc-900/70 text-zinc-500',
              )}
              style={isCurrent ? { backgroundColor: accentColor, borderColor: accentColor } : undefined}
            >
              {index + 1}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
