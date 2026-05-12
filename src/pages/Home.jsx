import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllCerts } from '../data/certs'
import BrandedName from '../components/BrandedName'

function useVisitorCount() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    // Hit the counter once per page load — increments and returns total
    fetch('https://api.counterapi.dev/v1/freecertprep/homepage/up')
      .then(r => r.json())
      .then(data => { if (data?.count) setCount(data.count) })
      .catch(() => {}) // silent fail — counter just won't show
  }, [])

  return count
}

const certs = getAllCerts()

const providerStyles = {
  AWS: { bg: 'bg-orange-500/10 border-orange-500/20', text: 'text-orange-400' },
  'Google Cloud': { bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-400' },
  NVIDIA: { bg: 'bg-green-500/10 border-green-500/20', text: 'text-green-400' },
  'Microsoft Azure': { bg: 'bg-cyan-500/10 border-cyan-500/20', text: 'text-cyan-400' },
  CompTIA: { bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-400' },
}

export default function Home() {
  const visitorCount = useVisitorCount()

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Subdued structural background handled by index.css body grid */}

      <header className="border-b border-white/5 bg-zinc-950/60 backdrop-blur-xl sticky top-0 z-20 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <BrandedName />
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#certs" className="hover:text-zinc-100 transition-colors">Certifications</a>
            <Link to="/docs" className="hover:text-zinc-100 transition-colors">Docs</Link>
            <a href="https://github.com/alexNGMI/freecertprep" target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition-colors">GitHub</a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/50 text-zinc-300 text-sm font-medium animate-fade-up">
            Free Forever · No Signup · No Paywall
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 animate-fade-up text-zinc-100" style={{ animationDelay: '100ms' }}>
            Certs that change careers.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '200ms' }}>
            Whether you're breaking into tech or pivoting toward something better, the right certification opens the door. Deep practice for AWS, Google Cloud, Azure, NVIDIA, and CompTIA — free forever.
          </p>
          <div className="mt-12 flex items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <a
              href="#certs"
              id="hero-start-btn"
              className="group relative inline-flex items-center justify-center bg-zinc-100 text-zinc-950 font-semibold text-lg px-8 py-3.5 rounded-xl hover:bg-white transition-all duration-300 border border-transparent hover:border-zinc-300"
            >
              Explore Certs
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </section>

        {/* What makes it different */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-y border-white/5">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Why it works</p>
            <h2 className="text-3xl font-bold text-zinc-100">
              Built for the <span className="text-zinc-500">journey, not just the test</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Smart Practice',
                desc: 'The questions you keep missing come back more often. The ones you\'ve mastered fade. Your weak spots get the reps — automatically.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                ),
              },
              {
                title: 'Real Exam Formats',
                desc: 'Five native question types that match how the real exam actually tests you. You won\'t see your first drag-and-drop on test day.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
              },
              {
                title: '100% Free, No Signup',
                desc: 'Career change is expensive enough. No paywall, no email, no subscription. Every feature works the day you arrive.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4" />
                ),
              },
            ].map(({ title, desc, icon }, i) => (
              <div
                key={title}
                className="glass-panel rounded-2xl p-7 flex flex-col animate-fade-up"
                style={{ animationDelay: `${i * 80 + 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-800/60 border border-white/5 flex items-center justify-center mb-5 text-zinc-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {icon}
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-zinc-100 mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cert Catalog */}
        <section id="certs" className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100">
              Choose your next step
            </h2>
            <p className="text-sm text-zinc-500 mt-3">
              {certs.length} certifications across cloud, AI, networking, and security — each one a real credential that hiring managers know.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        </section>

        {/* How a session works */}
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">What a session looks like</p>
            <h2 className="text-3xl font-bold text-zinc-100">
              No surprises <span className="text-zinc-500">on exam day</span>
            </h2>
            <p className="text-sm text-zinc-500 max-w-xl mx-auto mt-4 leading-relaxed">
              Every question matches the real exam in depth, phrasing, and format. Train the way you'll be tested — then walk in ready.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {/* Sample question card — styled to mimic real QuestionCard */}
            <div className="lg:col-span-3 glass-panel rounded-2xl p-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400">
                  Cloud Technology and Services
                </span>
                <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>

              <p className="text-zinc-100 text-lg font-medium leading-relaxed mb-6">
                Which AWS service automatically distributes incoming application traffic across multiple targets such as EC2 instances and containers?
              </p>

              <div className="space-y-2.5 mb-6">
                {[
                  { text: 'Amazon Route 53', state: 'idle' },
                  { text: 'AWS Direct Connect', state: 'idle' },
                  { text: 'Elastic Load Balancing', state: 'correct' },
                  { text: 'Amazon CloudFront', state: 'idle' },
                ].map(({ text, state }) => {
                  const base = 'flex items-center gap-3 px-4 py-3 rounded-lg border text-sm transition-all'
                  const styles = state === 'correct'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-zinc-900/60 border-white/5 text-zinc-400'
                  return (
                    <div key={text} className={`${base} ${styles}`}>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${state === 'correct' ? 'border-emerald-400 bg-emerald-500/20' : 'border-zinc-700'}`}>
                        {state === 'correct' && (
                          <svg className="w-3 h-3 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      {text}
                    </div>
                  )
                })}
              </div>

              <div className="rounded-lg bg-zinc-900/60 border border-white/5 p-4">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Explanation</p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Elastic Load Balancing automatically distributes incoming traffic across multiple targets — EC2 instances, containers, IP addresses — in one or more Availability Zones, scaling capacity in response to demand.
                </p>
              </div>
            </div>

            {/* Sidebar — features list */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {[
                { label: 'Question 3 of 10', sub: 'Smart Practice block', delay: '180ms' },
                { label: 'Bookmarked for later', sub: 'Star anything to review on Dashboard', delay: '260ms' },
                { label: 'Stats recorded at session end', sub: 'Weakest questions float to the top of next block', delay: '340ms' },
                { label: 'Domain-weighted exam mode', sub: 'Matches the official exam blueprint exactly', delay: '420ms' },
              ].map(({ label, sub, delay }) => (
                <div
                  key={label}
                  className="glass-panel rounded-xl p-5 animate-fade-up"
                  style={{ animationDelay: delay }}
                >
                  <p className="text-sm font-semibold text-zinc-200 mb-1">{label}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-zinc-950/50 py-10 mt-12 text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <BrandedName size="text-lg" />
            </Link>

            {visitorCount !== null && (
              <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/60 border border-white/5 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                {visitorCount.toLocaleString()} visitors
              </div>
            )}

            <p className="text-sm">Built for the leap. Free forever.</p>
          </div>

          {/* Sister site teaser */}
          <div className="flex justify-center pt-2 border-t border-white/5">
            <span
              className="inline-flex items-center gap-2 text-xs text-zinc-500 bg-zinc-900/40 border border-white/5 px-3 py-1.5 rounded-full"
              title="Same approach, different career path. Coming soon."
            >
              <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Real Estate Exam Prep</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Coming soon</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CertCard({ cert, index }) {
  const ps = providerStyles[cert.provider] || { bg: 'bg-zinc-800 border-zinc-700', text: 'text-zinc-400' }

  return (
    <Link
      to={`/${cert.id}`}
      id={`cert-card-${cert.id}`}
      className="glass-panel glass-panel-hover rounded-2xl p-8 group flex flex-col min-h-[340px] animate-fade-up relative overflow-hidden"
      style={{ animationDelay: `${index * 80 + 300}ms` }}
    >
      {/* Clean top accent border */}
      <div 
        className="absolute top-0 left-0 w-full h-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: cert.color }}
      />
      
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${ps.bg} ${ps.text}`}>
            {cert.provider}
          </span>
          <span className="text-[11px] font-medium text-zinc-400 bg-zinc-800/50 border border-zinc-700/50 px-2.5 py-1 rounded-md">
            {cert.code}
          </span>
        </div>
        <span
          className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-zinc-900 border"
          style={{ borderColor: `${cert.color}40`, color: cert.color }}
        >
          {cert.difficulty}
        </span>
      </div>

      <h3 className="text-2xl font-bold mb-3 text-zinc-100 group-hover:text-white transition-colors duration-300">
        {cert.title}
      </h3>
      <p className="text-sm text-zinc-400 mb-8 flex-1 leading-relaxed">
        {cert.description}
      </p>

      <div className="grid grid-cols-3 gap-2 mb-8 border-y border-white/5 py-4">
        <div className="text-center">
          <p className="text-xl font-semibold text-zinc-200">{cert.examQuestions}</p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 font-medium">Questions</p>
        </div>
        <div className="text-center border-x border-white/5">
          <p className="text-xl font-semibold text-zinc-200">{cert.examTime}</p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 font-medium">Minutes</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-zinc-200">{cert.passingScore}%</p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 font-medium">Passing</p>
        </div>
      </div>

      <span
        className="text-sm font-semibold py-3 rounded-lg text-center transition-all duration-300 border bg-zinc-900 hover:bg-zinc-800"
        style={{ color: cert.color, borderColor: '#27272a' }}
      >
        View Detail &rarr;
      </span>
    </Link>
  )
}
