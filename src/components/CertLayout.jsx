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
    <div className="min-h-screen flex flex-col bg-[#0a0a23]">
      <header className="border-b border-[#1b1b32] bg-[#0a0a23]/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-[#f5f6f7] text-lg tracking-wide hover:opacity-80 transition-opacity">
              <BrandedName />
            </Link>
            <span className="text-[#3b3b4f]">/</span>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cert.color }}>
              {cert.code}
            </span>
          </div>
          <nav className="flex gap-2" aria-label="Cert navigation">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `px-4 py-1 rounded text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? 'border-transparent font-bold text-[#0a0a23]'
                      : 'border-[#f5f6f7] text-[#f5f6f7] hover:bg-[#f5f6f7]/10'
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: cert.color, borderColor: cert.color } : {}
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        <Outlet />
      </main>
      <footer className="border-t border-[#1b1b32] py-5 text-center text-sm text-[#d0d0d5]">
        FreeCertPrep — {cert.title} Exam Prep
      </footer>
    </div>
  )
}
