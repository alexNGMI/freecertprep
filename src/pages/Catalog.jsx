import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Cpu,
  Home as HomeIcon,
  Network,
  Server,
} from 'lucide-react'
import BrandedName from '../components/BrandedName'
import { getAllCerts } from '../data/certs'
import { isCertComingSoon, isCertLive } from '../data/catalogVisibility'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { PageEyebrow, PageLead, PageTitle, SectionHeading, Surface } from '../components/ui/surface'

const certs = getAllCerts()
const hiddenCatalogCertIds = new Set(['comptia-server-plus', 'comptia-linux-plus'])
const liveCerts = certs.filter((cert) => isCertLive(cert.id))
const comingSoonCerts = certs.filter((cert) => isCertComingSoon(cert.id) && !hiddenCatalogCertIds.has(cert.id))

const providerStyles = {
  AWS: { bg: 'bg-orange-500/10 border-orange-500/20', text: 'text-orange-300' },
  'Google Cloud': { bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-300' },
  NVIDIA: { bg: 'bg-green-500/10 border-green-500/20', text: 'text-green-300' },
  'Microsoft Azure': { bg: 'bg-cyan-500/10 border-cyan-500/20', text: 'text-cyan-300' },
  Cisco: { bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-300' },
  CompTIA: { bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-300' },
  HashiCorp: { bg: 'bg-violet-500/10 border-violet-500/20', text: 'text-violet-300' },
  Splunk: { bg: 'bg-green-500/10 border-green-500/20', text: 'text-green-300' },
}

export default function Catalog() {
  useDocumentMeta({
    title: 'Catalog | freecertprep',
    description:
      'Browse available freecertprep certification practice and see which exams are still being prepared.',
    path: '/catalog',
  })

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <header className="border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <BrandedName />
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link to="/#paths" className="hover:text-zinc-100 transition-colors">Paths</Link>
            <Link to="/catalog" className="text-zinc-100 transition-colors">Catalog</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-200 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back home
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.75fr] gap-8 items-end">
            <div>
              <PageEyebrow className="mb-3">Full catalog</PageEyebrow>
              <PageTitle className="mb-5">
                Live certs first.
              </PageTitle>
              <PageLead>
                Use this page when you already know the exam you want. Available exams are ready to practice now; coming-soon exams are listed but cannot be opened yet.
              </PageLead>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-10">
          <SectionHeading eyebrow="Ready now" title="Available practice" detail={`${liveCerts.length} exams`} className="mb-5" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {liveCerts.map((cert) => (
              <CertRow key={cert.id} cert={cert} live />
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-16">
          <SectionHeading eyebrow="Coming soon" title="Still being prepared" detail={`${comingSoonCerts.length} exams`} className="mb-5" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {comingSoonCerts.map((cert) => (
              <CertRow key={cert.id} cert={cert} live={false} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function CertRow({ cert, live }) {
  const ps = providerStyles[cert.provider] || { bg: 'bg-zinc-800 border-zinc-700', text: 'text-zinc-400' }
  const Icon = cert.provider === 'CompTIA' || cert.provider === 'Cisco'
    ? Network
    : cert.provider === 'HashiCorp'
      ? Server
      : cert.provider === 'NVIDIA'
        ? Cpu
        : cert.provider === 'Splunk'
          ? HomeIcon
          : Cloud

  const cardClass = `group flex h-full flex-col p-5 ${live ? 'hover:bg-zinc-900/70' : 'opacity-75'}`
  const content = (
    <>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg border border-white/10 bg-zinc-900/80 flex items-center justify-center shrink-0" style={{ color: cert.color }}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-zinc-100 truncate group-hover:text-white transition-colors">{cert.title}</h3>
            <p className="text-xs text-zinc-500 mt-1">{cert.code}</p>
          </div>
        </div>
        {live ? (
          <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0 mt-1" />
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${ps.bg} ${ps.text}`}>
          {cert.provider}
        </span>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/10 bg-zinc-900/60 text-zinc-400">
          {cert.difficulty}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-4">
        <MiniStat value={cert.examQuestions} label="Questions per exam" />
        <MiniStat value={`${cert.examTime}m`} label="Time" />
      </div>
      {!live && (
        <div className="mt-auto flex justify-end pt-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200 border border-amber-300/25 bg-amber-300/10 rounded-md px-2 py-1">
            Coming soon
          </span>
        </div>
      )}
    </>
  )

  if (!live) {
    return (
      <Surface className={cardClass} aria-label={`${cert.title} coming soon`}>
        {content}
      </Surface>
    )
  }

  return (
    <Surface
      as={Link}
      to={`/${cert.id}`}
      interactive
      className={cardClass}
    >
      {content}
    </Surface>
  )
}

function MiniStat({ value, label }) {
  return (
    <div>
      <p className="text-sm font-bold text-zinc-200">{value}</p>
      <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold mt-1">{label}</p>
    </div>
  )
}
