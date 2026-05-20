import { Link } from 'react-router-dom'
import { RE_STUDY_CERTS } from './reCerts'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

// Sister-site study chooser: pick the National prep or a state-licensing
// module. Each links into the shared light-theme study app mounted on
// that cert.
export default function REStudyPicker() {
  useDocumentMeta({
    title: 'Choose your real estate exam',
    description:
      'Free real estate exam prep: national salesperson exam, Texas, Maine, Georgia, and Arizona full licensing (national + state law). No signup.',
    path: '/real-estate/study',
  })

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/real-estate" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </span>
            <span className="font-black text-lg tracking-tight">RealEstatePrep</span>
          </Link>
          <Link to="/real-estate" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            ← Back
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold text-rose-600 uppercase tracking-widest mb-3">Free · No signup</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Choose your exam.</h1>
          <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
            Start with the portable national prep, or go all the way with a
            state-licensing module that layers local law on top.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RE_STUDY_CERTS.map((c) => (
            <Link
              key={c.slug}
              to={`/real-estate/study/${c.slug}`}
              className="group bg-white border border-slate-200 rounded-2xl p-7 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100/50 transition-all flex flex-col"
            >
              <span className="self-start text-[10px] font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded mb-4">
                {c.badge}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{c.name}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{c.tagline}</p>
              <p className="text-xs text-slate-500 mb-5">{c.examLine}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-rose-600 group-hover:gap-2.5 transition-all">
                Start studying <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-10">
          More states coming. Single-integrated-exam states (FL, CA, NY)
          aren&apos;t a national + state split, so they&apos;re handled
          separately.
        </p>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        <p>
          A sister site of{' '}
          <Link to="/" className="text-rose-600 font-semibold hover:underline">
            freecertprep
          </Link>
          .
        </p>
      </footer>
    </div>
  )
}
