import { ArrowLeft, Clock, Target } from 'lucide-react'
import { Button } from './ui/button'
import { Kicker } from './ui/surface'

export function StudyHeader({
  eyebrow,
  title,
  subtitle,
  cert,
  backLabel,
  onBack,
  stats = [],
  action,
}) {
  return (
    <section className="space-y-6">
      {onBack && (
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
          <ArrowLeft className="h-4 w-4" />
          {backLabel || 'Back'}
        </Button>
      )}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <Kicker>
            {eyebrow}
            {cert?.code && <span className="text-zinc-600">/</span>}
            {cert?.code && <span style={{ color: cert.color }}>{cert.code}</span>}
          </Kicker>
          <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-tight text-zinc-50 md:text-6xl">{title}</h1>
            {subtitle && <p className="max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">{subtitle}</p>}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {stats.map(({ label, value, icon: Icon }, index) => (
            <div key={`${label}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
              <div className="flex items-center gap-2 text-zinc-500">
                {Icon ? <Icon className="h-4 w-4" /> : index === 0 ? <Target className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
              </div>
              <p className="mt-1 text-xl font-black text-zinc-100">{value}</p>
            </div>
          ))}
          {action}
        </div>
      </div>
    </section>
  )
}
