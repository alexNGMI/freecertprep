import { createElement } from 'react'
import { cn } from '../../utils/cn'

export function Surface({ as = 'div', className, interactive = false, ...props }) {
  return createElement(as, {
    className: cn(
        'rounded-2xl border border-white/10 bg-zinc-950/80 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)]',
        'bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))]',
        interactive && 'transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-zinc-900/80',
        className,
      ),
    ...props,
  })
}

export function Kicker({ className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400',
        className,
      )}
      {...props}
    />
  )
}

export function DomainBadge({ children, color = '#a1a1aa', className }) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider', className)}
      style={{ color, borderColor: `${color}45`, backgroundColor: `${color}12` }}
    >
      {children}
    </span>
  )
}

export function PageEyebrow({ className, ...props }) {
  return (
    <p
      className={cn('text-[11px] font-bold uppercase tracking-widest text-zinc-500', className)}
      {...props}
    />
  )
}

export function PageTitle({ as = 'h1', className, ...props }) {
  return createElement(as, {
    className: cn('text-4xl font-black tracking-tight text-zinc-50 md:text-6xl', className),
    ...props,
  })
}

export function PageLead({ className, ...props }) {
  return (
    <p
      className={cn('max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg', className)}
      {...props}
    />
  )
}

export function SectionHeading({ eyebrow, title, detail, className, ...props }) {
  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between', className)} {...props}>
      <div>
        {eyebrow && <PageEyebrow>{eyebrow}</PageEyebrow>}
        <h2 className="mt-2 text-2xl font-black text-zinc-50 md:text-3xl">{title}</h2>
      </div>
      {detail && <p className="max-w-xl text-sm leading-relaxed text-zinc-500">{detail}</p>}
    </div>
  )
}
