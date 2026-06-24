import { createElement } from 'react'
import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-zinc-100 text-zinc-950 hover:bg-white shadow-[0_16px_40px_-24px_rgba(255,255,255,0.75)]',
  accent: 'text-zinc-950 hover:brightness-110 shadow-[0_18px_42px_-24px_var(--accent-shadow)]',
  secondary: 'border border-white/10 bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08] hover:border-white/20',
  ghost: 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06]',
  danger: 'border border-rose-500/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20 hover:border-rose-400/60',
}

const sizes = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
  icon: 'h-10 w-10 p-0',
}

export function Button({
  as = 'button',
  className,
  variant = 'secondary',
  size = 'md',
  accentColor,
  style,
  ...props
}) {
  const accentStyle = accentColor
    ? { '--accent-shadow': accentColor, backgroundColor: accentColor, ...style }
    : style

  return createElement(as, {
    className: cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300',
        'disabled:pointer-events-none disabled:opacity-45',
        'hover:-translate-y-0.5 active:translate-y-0',
        'motion-reduce:transform-none motion-reduce:transition-none',
        variants[variant],
        sizes[size],
        className,
      ),
    style: variant === 'accent' ? accentStyle : style,
    ...props,
  })
}
