import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

// Sister-site landing for the upcoming Real Estate Exam Prep project.
// Intentionally styled completely differently from freecertprep's
// dark technical theme — Redfin/Zillow-inspired: white background,
// warm red accent (#dc2626 family), bold serif-adjacent display type,
// pill search/CTA, and card-based state tiles.

// State-specific modules that will layer on top of the national bank.
// The launch product is national prep — these are the next wave. Order
// matters here: TX/FL ship first because TX has a notoriously hard state
// portion and FL has the highest candidate volume; GA/NC/CO follow.
// CA (single integrated exam) and NY (state-law-heavy throughout) need
// their own long-form builds and are intentionally NOT in this grid.
// CA/NY visitors can still register interest via the US_STATES dropdown.
const STATE_MODULES = [
  { code: 'TX', name: 'Texas',          blurb: 'Full licensing: national + TREC state law', badge: 'Available now', to: '/real-estate/study/tx' },
  { code: 'ME', name: 'Maine',          blurb: 'Salesperson (national + state)',  badge: 'Up next' },
  { code: 'GA', name: 'Georgia',        blurb: 'Salesperson + broker',           badge: 'Planned' },
  { code: 'NC', name: 'North Carolina', blurb: 'Provisional broker + broker',    badge: 'Planned' },
  { code: 'CO', name: 'Colorado',       blurb: 'Broker (two-tier)',              badge: 'Planned' },
]

// All 50 states + DC for the notify-me state selector. The launched-soon
// set above is for the visual market grid; this list lets early sign-ups
// register intent for ANY state so we can prioritize the wait-list signal.
const US_STATES = [
  ['AL','Alabama'], ['AK','Alaska'], ['AZ','Arizona'], ['AR','Arkansas'],
  ['CA','California'], ['CO','Colorado'], ['CT','Connecticut'], ['DE','Delaware'],
  ['DC','District of Columbia'], ['FL','Florida'], ['GA','Georgia'], ['HI','Hawaii'],
  ['ID','Idaho'], ['IL','Illinois'], ['IN','Indiana'], ['IA','Iowa'],
  ['KS','Kansas'], ['KY','Kentucky'], ['LA','Louisiana'], ['ME','Maine'],
  ['MD','Maryland'], ['MA','Massachusetts'], ['MI','Michigan'], ['MN','Minnesota'],
  ['MS','Mississippi'], ['MO','Missouri'], ['MT','Montana'], ['NE','Nebraska'],
  ['NV','Nevada'], ['NH','New Hampshire'], ['NJ','New Jersey'], ['NM','New Mexico'],
  ['NY','New York'], ['NC','North Carolina'], ['ND','North Dakota'], ['OH','Ohio'],
  ['OK','Oklahoma'], ['OR','Oregon'], ['PA','Pennsylvania'], ['RI','Rhode Island'],
  ['SC','South Carolina'], ['SD','South Dakota'], ['TN','Tennessee'], ['TX','Texas'],
  ['UT','Utah'], ['VT','Vermont'], ['VA','Virginia'], ['WA','Washington'],
  ['WV','West Virginia'], ['WI','Wisconsin'], ['WY','Wyoming'],
]

const FEATURES = [
  {
    title: 'Built around the national portion',
    desc: "The national/uniform portion is the same in ~48 states — and it's roughly half of your exam. We drill it deep at launch so you walk in already halfway prepared, regardless of where you sit. State modules add the local law layer as we ship them.",
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Smart practice that adapts',
    desc: 'The questions you keep missing surface more often. The ones you\'ve mastered fade. Your weak spots get the reps — automatically, every session.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Free, no signup',
    desc: 'No paywall, no email gate, no subscription. Same model as our sister site freecertprep — and for the same reason: licensing is expensive enough already.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]

export default function RealEstate() {
  const [email, setEmail] = useState('')
  const [stateCode, setStateCode] = useState('')
  const [submitted, setSubmitted] = useState(false)
  useDocumentMeta({
    title: 'Free National Real Estate Exam Prep',
    description:
      'Free prep for the national/uniform portion of the US real estate salesperson exam (PSI blueprint) — 750 questions, smart practice, full exam simulator. No signup. State-specific modules coming next.',
    path: '/real-estate',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend yet — this just acknowledges intent client-side.
    // When we wire a real mailing list, swap this for a fetch() that
    // posts { email, state: stateCode } to whatever endpoint we use.
    if (email.trim() && stateCode) setSubmitted(true)
  }

  // Pretty-print the chosen state for the success message.
  const stateName = US_STATES.find(([c]) => c === stateCode)?.[1] ?? ''

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/real-estate" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </span>
            <span className="font-black text-lg tracking-tight">RealEstatePrep</span>
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest text-emerald-600">National live</span>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 via-rose-50/50 to-white">
          {/* Soft repeating background tone */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgb(220 38 38) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-20 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-rose-200 bg-white text-rose-700 text-[11px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              National prep is live · Free, no signup
            </div>

            <h1 className="font-black tracking-tight text-slate-900 text-5xl md:text-7xl leading-[1.05] mb-7">
              Your real estate <span className="text-rose-600">license</span>,
              <br className="hidden md:block" /> closer than you think.
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Free national real estate exam prep — the portable half of every
              state&apos;s exam, drilled deep. 750 questions, smart practice, a
              full exam simulator. State-specific modules layer on top as we
              roll them out.
            </p>

            {/* Primary CTA — the national pool is live and playable now.
                The notify form below is for the state-specific modules. */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
              <Link
                to="/real-estate/study"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-rose-600 text-white font-bold text-base hover:bg-rose-700 transition-all shadow-lg shadow-rose-200/50 hover:-translate-y-0.5"
              >
                Start practicing — free
                <span aria-hidden>→</span>
              </Link>
              <a
                href="#how"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-base hover:border-slate-400 hover:bg-slate-50 transition-all"
              >
                How it works
              </a>
            </div>

            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Want your state&apos;s local-law module? Join the wait-list
            </p>

            {/* Notify-me bar styled to evoke Zillow/Redfin search: email +
                state of licensure + CTA. On mobile the three controls stack;
                on desktop they sit in one row with subtle dividers. */}
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0 items-stretch bg-white rounded-2xl shadow-xl shadow-rose-200/40 p-2 border border-slate-200"
            >
              {/* Email */}
              <div className="flex-[1.4] flex items-center gap-3 px-4 sm:border-r sm:border-slate-200">
                <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 w-full py-3 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-base"
                  disabled={submitted}
                />
              </div>

              {/* State of licensure */}
              <div className="flex-1 flex items-center gap-3 px-4">
                <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <select
                  required
                  aria-label="State you plan to be licensed in"
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  disabled={submitted}
                  className={`flex-1 w-full py-3 pr-2 bg-transparent text-base focus:outline-none appearance-none cursor-pointer ${
                    stateCode ? 'text-slate-900' : 'text-slate-400'
                  } disabled:cursor-default`}
                >
                  <option value="" disabled>Your state</option>
                  {US_STATES.map(([code, name]) => (
                    <option key={code} value={code} className="text-slate-900">
                      {name}
                    </option>
                  ))}
                </select>
                <svg className="w-4 h-4 text-slate-400 shrink-0 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitted}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-rose-700 transition-colors disabled:bg-emerald-600 disabled:cursor-default"
              >
                {submitted ? '✓ On the list' : 'Notify me'}
              </button>
            </form>
            <p className="text-xs text-slate-500 mt-4">
              {submitted && stateName ? (
                <>We&apos;ll email you the moment <span className="font-semibold text-slate-700">{stateName}</span> is ready. No spam — unsubscribe anytime.</>
              ) : (
                <>State-module wait-list. The national prep above is already free to use. We&apos;ll use your state to prioritize which local-law module we build next. No spam, ever.</>
              )}
            </p>
          </div>
        </section>

        {/* States — framed as 'state modules that ship after the national bank',
            not as 'these states ship at launch'. National prep IS the product. */}
        <section id="states" className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-rose-600 uppercase tracking-widest mb-3">State modules</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Your state, layered on top.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The national portion is the same coast to coast — property
              ownership, agency, contracts, financing, appraisal, transfer,
              disclosures, fair housing, math, practice of real estate. We
              drill it deep. Your state-specific module is the second
              layer, covering local law and commission rules. Texas is
              live now — more states are on the way.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {STATE_MODULES.map((s) => {
              const live = Boolean(s.to)
              const cardClass = `group relative rounded-2xl p-6 transition-all border ${
                live
                  ? 'bg-white border-rose-300 shadow-lg shadow-rose-100/50 hover:-translate-y-0.5'
                  : 'bg-white border-slate-200 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100/50'
              }`
              const inner = (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black tracking-tight text-slate-900">{s.code}</span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                        live ? 'text-rose-600' : 'text-slate-400 group-hover:text-rose-600'
                      }`}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-slate-900 mb-1">{s.name}</p>
                  <p className="text-xs text-slate-500 leading-snug">{s.blurb}</p>
                </>
              )
              return live ? (
                <Link key={s.code} to={s.to} className={cardClass}>
                  {inner}
                </Link>
              ) : (
                <article key={s.code} className={cardClass}>
                  {inner}
                </article>
              )
            })}
          </div>

          <p className="text-center text-sm text-slate-500 mt-10">
            Don&apos;t see your state? Pick it in the form above — your state
            tells us where to prioritize next, including CA, NY, and others
            not listed here.
          </p>
        </section>

        {/* How it works */}
        <section id="how" className="bg-slate-50 border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold text-rose-600 uppercase tracking-widest mb-3">How it works</p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                The same proven approach
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURES.map(({ title, desc, icon }) => (
                <div key={title} className="bg-white rounded-2xl p-7 border border-slate-200 hover:shadow-md hover:shadow-rose-100/40 transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-5">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-md bg-rose-600 text-white flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </span>
            <span className="font-bold text-slate-700">RealEstatePrep</span>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50/40 transition-all"
          >
            freecertprep <span aria-hidden>↗</span>
          </Link>
        </div>
      </footer>
    </div>
  )
}
