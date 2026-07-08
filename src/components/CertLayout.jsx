import { createElement } from 'react'
import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { BarChart3, BookOpenCheck, ClipboardList, Route, Timer } from 'lucide-react'
import { useCert } from '../hooks/useCert'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { SiteFooter, SiteHeader } from './SiteChrome'
import { hasLearningLoop } from '../utils/learning-loop-config'

const navItems = [
  { to: '', label: 'Dashboard', end: true, icon: BarChart3 },
  { to: 'learning', label: 'Study Plan', icon: Route, learningLoop: true },
  { to: 'quiz', label: 'Quiz', icon: BookOpenCheck },
  { to: 'drill', label: 'Timed Drill', icon: Timer },
  { to: 'exam', label: 'Exam Simulator', icon: ClipboardList },
]

export default function CertLayout() {
  const cert = useCert()

  useDocumentMeta({
    title: cert ? `${cert.code} ${cert.title} Practice` : null,
    description: cert
      ? `Free ${cert.code} (${cert.title}) practice — ${cert.questionCount.toLocaleString()} questions, a ${cert.examQuestions}-question timed simulator, and Smart Practice that targets your weak domains. No signup.`
      : null,
    path: cert ? `/${cert.id}` : '/',
  })

  if (!cert) return <Navigate to="/" replace />

  return (
    <div className="study-shell min-h-screen flex flex-col relative overflow-hidden text-zinc-100">
      {/* Clean top accent bar for the layout */}
      <div 
        className="absolute top-0 left-0 w-full h-1 opacity-80" 
        style={{ backgroundColor: cert.color }} 
      />

      <SiteHeader />
      <div className="border-b border-white/10 bg-slate-950/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-center gap-3">
            <span
              className="rounded-md border bg-zinc-900/50 px-2.5 py-1 text-xs font-bold uppercase tracking-widest"
              style={{ color: cert.color, borderColor: `${cert.color}30` }}
            >
              {cert.code}
            </span>
            <span className="hidden text-sm font-semibold text-zinc-400 sm:inline">{cert.title}</span>
          </div>
          <nav className="flex max-w-full gap-1 overflow-x-auto rounded-lg border border-white/10 bg-zinc-900/70 p-1 shadow-inner" aria-label="Cert navigation">
            {navItems.filter(item => !item.learningLoop || hasLearningLoop(cert.id)).map(({ to, label, end, icon: Icon }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                aria-label={label}
                title={label}
                className={({ isActive }) =>
                  `inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-300 sm:px-4 ${
                    isActive
                      ? 'font-semibold text-zinc-950 shadow-md transform scale-[1.02]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: cert.color, boxShadow: `0 4px 15px -3px ${cert.color}60` }
                    : {}
                }
              >
                {createElement(Icon, { className: 'h-4 w-4', 'aria-hidden': true })}
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 md:py-12">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
