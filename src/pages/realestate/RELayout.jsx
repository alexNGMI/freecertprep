import { NavLink, Outlet, Link, Navigate, useParams } from 'react-router-dom'
import { CertProvider, useCert } from '../../hooks/useCert'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'
import { reCertBySlug } from './reCerts'

const navItems = [
  { to: '', label: 'Dashboard', end: true },
  { to: 'quiz', label: 'Quiz' },
  { to: 'drill', label: 'Timed Drill' },
  { to: 'exam', label: 'Exam Simulator' },
]

function RELayoutInner({ meta }) {
  const cert = useCert()

  useDocumentMeta({
    title: `${meta.name} — Practice`,
    description: `Free study app for the ${meta.name.toLowerCase()} — quiz, timed drill, and a full exam simulator with Smart Practice. No signup.`,
    path: `/real-estate/study/${meta.slug}`,
  })

  // getCert() resolves the cert even though it is published:false (the
  // sister site reaches it directly; Real Estate never joins the IT
  // catalog). If it somehow can't load, bail to the landing page.
  if (!cert) return <Navigate to="/real-estate" replace />

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/real-estate" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </span>
            <span className="font-black text-lg tracking-tight">RealEstatePrep</span>
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
              {meta.badge}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <nav className="flex gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200" aria-label="Study navigation">
              {navItems.map(({ to, label, end }) => (
                <NavLink
                  key={label}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <Link
              to="/real-estate/study"
              className="hidden sm:inline text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors whitespace-nowrap"
              title="Switch exam"
            >
              Switch exam
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 mt-auto text-center text-sm text-slate-500">
        <p>
          RealEstatePrep — free exam prep. A sister site of{' '}
          <Link to="/" className="text-rose-600 font-semibold hover:underline">
            freecertprep
          </Link>
          .
        </p>
      </footer>
    </div>
  )
}

// Mounts the shared cert engine on the Real Estate cert chosen by the
// :reCert slug, then renders the light study chrome. Unknown slugs fall
// back to the study picker.
export default function RELayout() {
  const { reCert } = useParams()
  const meta = reCertBySlug(reCert)
  if (!meta) return <Navigate to="/real-estate/study" replace />
  return (
    <CertProvider certId={meta.certId} light>
      <RELayoutInner meta={meta} />
    </CertProvider>
  )
}
