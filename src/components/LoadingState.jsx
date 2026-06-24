import { LoaderCircle } from 'lucide-react'
import { cn } from '../utils/cn'

export default function LoadingState({
  label = 'Loading',
  detail,
  fullScreen = false,
  light = false,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center justify-center px-6',
        fullScreen ? 'min-h-screen' : 'min-h-48 py-16',
        light ? 'bg-white text-slate-900' : 'text-zinc-100',
      )}
    >
      <div className="max-w-sm text-center">
        <LoaderCircle
          className={cn(
            'mx-auto h-8 w-8 animate-spin motion-reduce:animate-none',
            light ? 'text-rose-600' : 'text-amber-300',
          )}
          aria-hidden="true"
        />
        <p className={cn('mt-4 text-sm font-bold', light ? 'text-slate-700' : 'text-zinc-200')}>
          {label}
        </p>
        {detail && (
          <p className={cn('mt-1 text-xs leading-relaxed', light ? 'text-slate-500' : 'text-zinc-500')}>
            {detail}
          </p>
        )}
      </div>
    </div>
  )
}
