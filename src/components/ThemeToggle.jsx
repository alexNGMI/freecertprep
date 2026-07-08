import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '../utils/cn'

const STORAGE_KEY = 'freecertprep-theme'

function readInitialTheme() {
  if (typeof window === 'undefined') return 'day'

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'night' ? 'night' : 'day'
  } catch {
    return 'day'
  }
}

function applyTheme(theme) {
  if (typeof document === 'undefined') return

  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme === 'night' ? 'dark' : 'light'
}

export default function ThemeToggle({ className }) {
  const [theme, setTheme] = useState(readInitialTheme)
  const isNight = theme === 'night'

  useEffect(() => {
    applyTheme(theme)
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Theme is purely cosmetic, so storage failures should not block use.
    }
  }, [theme])

  return (
    <button
      type="button"
      className={cn('theme-toggle inline-flex', className)}
      onClick={() => setTheme(isNight ? 'day' : 'night')}
      aria-label={isNight ? 'Switch to day mode' : 'Switch to night mode'}
      title={isNight ? 'Switch to day mode' : 'Switch to night mode'}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isNight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
    </button>
  )
}
