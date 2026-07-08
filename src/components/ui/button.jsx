import { createElement } from 'react'
import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-slate-950 text-white hover:bg-slate-800 shadow-[0_18px_42px_-26px_rgba(15,23,42,0.75)]',
  accent: 'text-slate-950 hover:brightness-105 shadow-[0_18px_42px_-24px_var(--accent-shadow)]',
  secondary: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400',
  ghost: 'text-slate-500 hover:text-teal-700 hover:bg-teal-500/10',
  danger: 'border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-400',
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
        'inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-200',
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
