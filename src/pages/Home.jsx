import { Link } from 'react-router-dom'
import { getAllCerts } from '../data/certs'

const certs = getAllCerts()

function BrandedName({ size = 'text-lg' }) {
  return (
    <span className={size} style={{ fontFamily: "'Lato', sans-serif" }}>
      <span className="font-normal">free</span>
      <span className="font-bold">CertPrep</span>
      <span className="text-[#f1be32] ml-0.5">(&#9650;)</span>
    </span>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a23] flex flex-col">
      <header className="border-b border-[#1b1b32] bg-[#0a0a23] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center">
          <Link to="/" className="text-[#f5f6f7] hover:opacity-80 transition-opacity">
            <BrandedName />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="mb-6">
            <Link to="/" className="text-[#f5f6f7] inline-block">
              <BrandedName size="text-5xl md:text-6xl" />
            </Link>
          </div>
          <p className="text-xl text-[#d0d0d5] max-w-xl mx-auto leading-relaxed">
            Practice for your cloud certifications with realistic exam questions, timed simulations, and progress tracking.
          </p>
          <div className="mt-10">
            <a
              href="#certs"
              className="inline-block bg-[#f1be32] text-[#0a0a23] font-bold text-lg px-10 py-3.5 rounded hover:opacity-90 transition-opacity"
            >
              Start Learning
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="border-t border-[#1b1b32]" />
        </div>

        {/* Cert Catalog */}
        <section id="certs" className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-sm font-bold text-[#a5abc4] uppercase tracking-wider mb-8">
            Available Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}

            <div className="rounded-md p-6 border border-dashed border-[#3b3b4f] flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#3b3b4f] flex items-center justify-center mb-4">
                <span className="text-[#3b3b4f] text-xl">+</span>
              </div>
              <p className="text-[#a5abc4] font-bold text-sm">More certs coming soon</p>
              <p className="text-[#3b3b4f] text-xs mt-2 leading-relaxed">
                Solutions Architect, Developer,<br />SysOps, and more...
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1b1b32] py-6 text-center text-sm text-[#a5abc4]">
        <Link to="/" className="text-[#f5f6f7] hover:opacity-80 transition-opacity">
          <BrandedName size="text-sm" />
        </Link>
        <p className="mt-2 text-[#3b3b4f]">Free cloud certification practice for everyone.</p>
      </footer>
    </div>
  )
}

function CertCard({ cert }) {
  return (
    <Link
      to={`/${cert.id}`}
      className="bg-[#1b1b32] rounded-md p-6 hover:bg-[#2a2a40] transition-all duration-200 group flex flex-col min-h-[300px]"
    >
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-xs font-bold px-3 py-1 rounded"
          style={{ backgroundColor: cert.color + '20', color: cert.color }}
        >
          {cert.difficulty}
        </span>
        <span className="text-xs font-bold text-[#a5abc4] bg-[#2a2a40] px-2 py-0.5 rounded">{cert.code}</span>
      </div>

      <h3 className="text-xl font-bold text-[#f5f6f7] mb-2 group-hover:text-[#f1be32] transition-colors">
        {cert.title}
      </h3>
      <p className="text-sm text-[#d0d0d5] mb-6 flex-1 leading-relaxed">
        {cert.description}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6 bg-[#0a0a23] rounded-md p-3">
        <div className="text-center">
          <p className="text-lg font-bold text-[#f5f6f7]">{cert.questions.length}</p>
          <p className="text-[10px] text-[#a5abc4] uppercase tracking-wider font-bold">Questions</p>
        </div>
        <div className="text-center border-x border-[#1b1b32]">
          <p className="text-lg font-bold text-[#f5f6f7]">{cert.examTime} min</p>
          <p className="text-[10px] text-[#a5abc4] uppercase tracking-wider font-bold">Exam Time</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-[#f5f6f7]">{cert.passingScore}%</p>
          <p className="text-[10px] text-[#a5abc4] uppercase tracking-wider font-bold">Passing</p>
        </div>
      </div>

      <span className="bg-[#f1be32] text-[#0a0a23] font-bold text-sm py-2.5 rounded text-center group-hover:opacity-90 transition-opacity">
        Start Learning
      </span>
    </Link>
  )
}
