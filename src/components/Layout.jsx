import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/exam', label: 'Exam Simulator' },
]

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="text-xl font-bold text-sky-400 hover:text-sky-300 transition-colors">
            CloudPrep
          </NavLink>
          <nav className="flex gap-1">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
        CloudPrep — AWS CLF-C02 Exam Prep
      </footer>
    </div>
  )
}
