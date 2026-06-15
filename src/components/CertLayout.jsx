import { createElement } from 'react'
import { NavLink, Outlet, Link, Navigate } from 'react-router-dom'
import { BarChart3, BookOpenCheck, ClipboardList, Route, Timer } from 'lucide-react'
import { useCert } from '../hooks/useCert'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import BrandedName from './BrandedName'

const navItems = [
  { to: '', label: 'Dashboard', end: true, icon: BarChart3 },
  { to: 'learning', label: 'Study Plan', icon: Route, certId: 'comptia-net-plus' },
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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Clean top accent bar for the layout */}
      <div 
        className="absolute top-0 left-0 w-full h-1 opacity-80" 
        style={{ backgroundColor: cert.color }} 
      />

      <header className="border-b border-white/10 bg-zinc-950/75 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <BrandedName size="text-xl" accentColor={cert.color} />
            </Link>
            <span className="text-zinc-600 hidden sm:inline">/</span>
            <span 
              className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border bg-zinc-900/50" 
              style={{ color: cert.color, borderColor: `${cert.color}30` }}
            >
              {cert.code}
            </span>
          </div>
          <nav className="flex gap-1 p-1 rounded-2xl bg-zinc-900/70 border border-white/10 shadow-inner" aria-label="Cert navigation">
            {navItems.filter(item => !item.certId || item.certId === cert.id).map(({ to, label, end, icon: Icon }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                aria-label={label}
                title={label}
                className={({ isActive }) =>
                  `inline-flex min-h-11 min-w-11 items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
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
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 md:py-12">
        <Outlet />
      </main>
      <footer className="border-t border-white/5 bg-zinc-950/50 py-8 mt-auto text-center text-sm text-zinc-500 backdrop-blur-md">
        <p>freecertprep &mdash; {cert.title} practice engine</p>
        <p className="mt-2 text-xs text-zinc-600">
          Independent practice platform. Not affiliated with or endorsed by certification providers.
        </p>
      </footer>
    </div>
  )
}
