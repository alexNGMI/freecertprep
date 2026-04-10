import { Link } from 'react-router-dom'
import { getAllCerts } from '../data/certs'
import BrandedName from '../components/BrandedName'

const certs = getAllCerts()

const providerStyles = {
  AWS: { bg: 'bg-orange-500/10 border-orange-500/20', text: 'text-orange-400' },
  'Google Cloud': { bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-400' },
  NVIDIA: { bg: 'bg-green-500/10 border-green-500/20', text: 'text-green-400' },
  'Microsoft Azure': { bg: 'bg-cyan-500/10 border-cyan-500/20', text: 'text-cyan-400' },
}

export default function Home() {
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
            <a href="https://github.com/alexNGMI/freecertprep" target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition-colors">GitHub</a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/50 text-zinc-300 text-sm font-medium animate-fade-up">
            ✨ Free, High-Quality Mock Exams
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 animate-fade-up text-zinc-100" style={{ animationDelay: '100ms' }}>
            Master your Cloud Career
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '200ms' }}>
            Practice for AWS, Google Cloud, Azure, and NVIDIA certifications with deeply realistic questions, timed visual simulations, and intelligent progress tracking.
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

        {/* Cert Catalog */}
        <section id="certs" className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-zinc-100">
              Available <span className="text-zinc-500">Certifications</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}

            <div className="glass-panel rounded-2xl p-8 flex flex-col min-h-[340px] border-dashed animate-fade-up" style={{ animationDelay: `${certs.length * 80 + 300}ms` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-zinc-600 flex items-center justify-center bg-zinc-900/50 shrink-0">
                  <span className="text-zinc-500 text-xl font-light">+</span>
                </div>
                <h3 className="text-zinc-300 font-semibold text-lg">Coming soon</h3>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Microsoft Azure</p>
                  <div className="space-y-1.5">
                    {['SC-900 · Security Fundamentals', 'MS-900 · Microsoft 365 Fundamentals', 'DP-900 · Data Fundamentals'].map(name => (
                      <div key={name} className="flex items-center gap-2 text-sm text-zinc-500">
                        <div className="w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                        {name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">CompTIA</p>
                  <div className="space-y-1.5">
                    {['A+ · Core Hardware & OS', 'Network+ · Networking Fundamentals', 'Security+ · Entry-Level Security'].map(name => (
                      <div key={name} className="flex items-center gap-2 text-sm text-zinc-500">
                        <div className="w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-zinc-950/50 py-10 mt-12 text-center text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <BrandedName size="text-lg" />
          </Link>
          <p className="text-sm">Built for the community. Free forever.</p>
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
