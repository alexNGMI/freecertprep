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
