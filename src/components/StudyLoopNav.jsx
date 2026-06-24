import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '../utils/cn'

const STEPS = [
  { id: 'diagnostic', label: 'Diagnostic', path: 'learning/diagnostic' },
  { id: 'plan', label: 'Study Plan', path: 'learning' },
  { id: 'practice', label: 'Practice', path: 'quiz' },
  { id: 'cases', label: 'Cases', path: 'learning/cases' },
  { id: 'exam', label: 'Simulate', path: 'exam' },
  { id: 'debrief', label: 'Debrief', path: null },
]

export default function StudyLoopNav({ cert, current }) {
  return (
    <nav aria-label="Study workflow" className="rounded-2xl border border-white/10 bg-zinc-950/70 p-3">
      <div className="grid grid-cols-3 gap-2 lg:grid-cols-6">
        {STEPS.map((step, index) => {
          const active = current === step.id
          const content = (
            <>
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[10px] font-black',
                  active ? 'text-zinc-950' : 'border-white/10 bg-zinc-900/70 text-zinc-500',
                )}
                style={active ? { backgroundColor: cert.color, borderColor: cert.color } : undefined}
              >
                {active ? <CheckCircle2 className="h-4 w-4" /> : String(index + 1).padStart(2, '0')}
              </span>
              <span className={cn('text-xs font-bold', active ? 'text-zinc-100' : 'text-zinc-400')}>
                {step.label}
              </span>
            </>
          )

          if (!step.path || active) {
            return (
              <div
                key={step.id}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex min-h-11 items-center gap-2 rounded-xl px-3 py-2',
                  active ? 'bg-white/[0.07]' : 'opacity-60',
                )}
              >
                {content}
              </div>
            )
          }

          return (
            <Link
              key={step.id}
              to={`/${cert.id}/${step.path}`}
              className="flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-white/[0.06]"
            >
              {content}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
