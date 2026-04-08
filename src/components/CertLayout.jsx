import { NavLink, Outlet, Link, Navigate } from 'react-router-dom'
import { useCert } from '../hooks/useCert'
import BrandedName from './BrandedName'

const navItems = [
  { to: '', label: 'Dashboard', end: true },
  { to: 'quiz', label: 'Quiz' },
  { to: 'exam', label: 'Exam Simulator' },
]

export default function CertLayout() {
  const cert = useCert()

  if (!cert) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Clean top accent bar for the layout */}
      <div 
        className="absolute top-0 left-0 w-full h-1 opacity-80" 
        style={{ backgroundColor: cert.color }} 
      />

      <header className="border-b border-white/5 bg-zinc-950/60 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <BrandedName size="text-xl" />
            </Link>
            <span className="text-zinc-600 hidden sm:inline">/</span>
            <span 
              className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border bg-zinc-900/50" 
              style={{ color: cert.color, borderColor: `${cert.color}30` }}
            >
              {cert.code}
            </span>
          </div>
          <nav className="flex gap-2 p-1 rounded-lg bg-zinc-900/50 border border-white/5" aria-label="Cert navigation">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-md text-sm transition-all duration-300 ${
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
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12">
        <Outlet />
      </main>
      <footer className="border-t border-white/5 bg-zinc-950/50 py-8 mt-auto text-center text-sm text-zinc-500 backdrop-blur-md">
        <p>FreeCertPrep &mdash; {cert.title} Premium Exam Engine</p>
      </footer>
    </div>
  )
}
