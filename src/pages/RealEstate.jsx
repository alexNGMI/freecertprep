import { Link } from 'react-router-dom'
import { useState } from 'react'

// Sister-site landing for the upcoming Real Estate Exam Prep project.
// Intentionally styled completely differently from freecertprep's
// dark technical theme — Redfin/Zillow-inspired: white background,
// warm red accent (#dc2626 family), bold serif-adjacent display type,
// pill search/CTA, and card-based state tiles.

const STATES = [
  { code: 'CA', name: 'California',     blurb: 'Salesperson + broker' },
  { code: 'TX', name: 'Texas',          blurb: 'Salesperson + broker' },
  { code: 'FL', name: 'Florida',        blurb: 'Sales associate + broker' },
  { code: 'NY', name: 'New York',       blurb: 'Salesperson + broker' },
  { code: 'AZ', name: 'Arizona',        blurb: 'Salesperson + broker' },
  { code: 'GA', name: 'Georgia',        blurb: 'Salesperson + broker' },
  { code: 'WA', name: 'Washington',     blurb: 'Broker (salesperson tier retired)' },
  { code: 'NC', name: 'North Carolina', blurb: 'Provisional broker + broker' },
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
    title: 'State-specific question banks',
    desc: 'Salesperson and broker exams have a national portion AND a state-specific portion. Both are covered, separately, for every state we support.',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
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
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest text-slate-400">Pre-launch</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#states" className="hidden sm:inline hover:text-slate-900 transition-colors">States</a>
            <a href="#how" className="hidden sm:inline hover:text-slate-900 transition-colors">How it works</a>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors"
            >
              freecertprep <span aria-hidden>↗</span>
            </Link>
          </nav>
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
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              Launching 2026 · Be first in line
            </div>

            <h1 className="font-black tracking-tight text-slate-900 text-5xl md:text-7xl leading-[1.05] mb-7">
              Your real estate <span className="text-rose-600">license</span>,
              <br className="hidden md:block" /> closer than you think.
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12">
              Free, state-specific salesperson and broker exam prep — built the
              same way we helped career changers pass cloud, networking, and
              security certifications on our sister site.
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
                <>Pre-launch list only. We&apos;ll use your state to prioritize launch markets. No spam, ever.</>
              )}
            </p>
          </div>
        </section>

        {/* States */}
        <section id="states" className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-rose-600 uppercase tracking-widest mb-3">Launching markets</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Starting with the busiest markets
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              State requirements vary — so the prep does too. Each state gets
              its own question bank built to its real-estate licensing exam
              blueprint, salesperson and broker tiers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATES.map((s) => (
              <article
                key={s.code}
                className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black tracking-tight text-slate-900">{s.code}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-rose-600 transition-colors">
                    Soon
                  </span>
                </div>
                <p className="text-lg font-bold text-slate-900 mb-1">{s.name}</p>
                <p className="text-xs text-slate-500 leading-snug">{s.blurb}</p>
              </article>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500 mt-10">
            More states will roll out after launch. Don&apos;t see yours?{' '}
            <a href="#hero" className="text-rose-600 font-semibold hover:underline">
              Get on the list and tell us where to go next.
            </a>
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
          <p className="text-slate-500">
            A sister site of{' '}
            <Link to="/" className="text-rose-600 font-semibold hover:underline">
              freecertprep
            </Link>
            . Launching 2026.
          </p>
        </div>
      </footer>
    </div>
  )
}
