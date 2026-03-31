import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/exam', label: 'Exam Simulator' },
]

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a23]">
      <header className="border-b border-[#1b1b32] bg-[#0a0a23] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <NavLink to="/" className="text-[#f5f6f7] text-lg tracking-wide hover:opacity-80 transition-opacity" style={{ fontFamily: "'Lato', sans-serif" }}>
            <span className="font-normal">free</span>
            <span className="font-bold">CertPrep</span>
            <span className="text-fcc-yellow ml-0.5">(&#9650;)</span>
          </NavLink>
          <nav className="flex gap-2">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-1 rounded text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? 'bg-fcc-yellow border-fcc-yellow text-[#0a0a23] font-bold'
                      : 'border-[#f5f6f7] text-[#f5f6f7] hover:bg-[#f5f6f7]/10'
                  }`
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
        FreeCertPrep — AWS CLF-C02 Exam Prep
      </footer>
    </div>
  )
}
