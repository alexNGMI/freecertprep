import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Cpu,
  Home as HomeIcon,
  Network,
  Search,
  Server,
} from 'lucide-react'
import { SiteFooter, SiteHeader } from '../components/SiteChrome'
import { getAllCerts } from '../data/certs'
import { selectComingSoonCerts, selectLiveCerts } from '../data/catalogVisibility'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const certs = getAllCerts()
const hiddenCatalogCertIds = new Set(['comptia-server-plus', 'comptia-linux-plus'])
const liveCerts = selectLiveCerts(certs)
const comingSoonCerts = selectComingSoonCerts(certs).filter((cert) => !hiddenCatalogCertIds.has(cert.id))
const totalQuestions = liveCerts.reduce((sum, cert) => sum + cert.questionCount, 0)

const providerStyles = {
  AWS: { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700' },
  'Google Cloud': { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700' },
  NVIDIA: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700' },
  'Microsoft Azure': { bg: 'bg-cyan-50 border-cyan-200', text: 'text-cyan-700' },
  Cisco: { bg: 'bg-sky-50 border-sky-200', text: 'text-sky-700' },
  CompTIA: { bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700' },
  HashiCorp: { bg: 'bg-violet-50 border-violet-200', text: 'text-violet-700' },
  Splunk: { bg: 'bg-lime-50 border-lime-200', text: 'text-lime-700' },
}

export default function Catalog() {
  useDocumentMeta({
    title: 'Catalog | freecertprep',
    description:
      'Browse available freecertprep certification practice and see which exams are still being prepared.',
    path: '/catalog',
  })

  return (
    <div className="theme-page min-h-screen text-slate-950">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-6 md:pt-16">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-950">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-widest text-teal-700">Full catalog</p>
              <h1 className="text-5xl font-black leading-tight text-slate-950 md:text-6xl">
                Live certs first.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                Use this page when you already know the exam you want. Available exams are ready to practice now; coming-soon exams are listed but cannot be opened yet.
              </p>
            </div>
            <div className="rounded-lg border border-slate-900/10 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.4)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-950">Pick the exact exam.</p>
                  <p className="text-sm text-slate-500">Career paths are guidance. Catalog is direct access.</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <CatalogMetric value={liveCerts.length} label="Ready now" />
                <CatalogMetric value={`${Math.round(totalQuestions / 100) / 10}k+`} label="Questions" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-6">
          <SectionHead eyebrow="Ready now" title="Available practice" detail={`${liveCerts.length} exams`} />
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {liveCerts.map((cert) => (
              <CertRow key={cert.id} cert={cert} live />
            ))}
          </div>
        </section>

        <section className="border-t border-slate-900/10 bg-white/70">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16">
            <SectionHead eyebrow="Coming soon" title="Still being prepared" detail={`${comingSoonCerts.length} exams`} />
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {comingSoonCerts.map((cert) => (
                <CertRow key={cert.id} cert={cert} live={false} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function SectionHead({ eyebrow, title, detail }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-slate-500">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">{title}</h2>
      </div>
      <p className="text-sm font-bold text-slate-500">{detail}</p>
    </div>
  )
}

function CertRow({ cert, live }) {
  const ps = providerStyles[cert.provider] || { bg: 'bg-slate-100 border-slate-200', text: 'text-slate-600' }
  const Icon = cert.provider === 'CompTIA' || cert.provider === 'Cisco'
    ? Network
    : cert.provider === 'HashiCorp'
      ? Server
      : cert.provider === 'NVIDIA'
        ? Cpu
        : cert.provider === 'Splunk'
          ? HomeIcon
          : Cloud

  const cardClass = `group flex h-full flex-col rounded-lg border border-slate-900/10 bg-white p-5 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.55)] transition ${live ? 'hover:-translate-y-0.5 hover:border-slate-900/20 hover:shadow-[0_24px_60px_-40px_rgba(15,23,42,0.55)]' : 'opacity-75'}`
  const content = (
    <>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-slate-50" style={{ color: cert.color, borderColor: `${cert.color}35` }}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-black text-slate-950 transition-colors group-hover:text-teal-800">{cert.title}</h3>
            <p className="mt-1 text-xs font-semibold text-slate-500">{cert.code}</p>
          </div>
        </div>
        {live ? (
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-teal-700" />
        ) : null}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <span className={`rounded-md border px-2.5 py-1 text-[11px] font-bold ${ps.bg} ${ps.text}`}>
          {cert.provider}
        </span>
        <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
          {cert.difficulty}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 border-t border-slate-900/10 pt-4">
        <MiniStat value={cert.examQuestions} label="Questions per exam" />
        <MiniStat value={`${cert.examTime}m`} label="Time" />
      </div>
      {!live && (
        <div className="mt-auto flex justify-end pt-5">
          <span className="rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-amber-800">
            Coming soon
          </span>
        </div>
      )}
    </>
  )

  if (!live) {
    return (
      <div className={cardClass} aria-label={`${cert.title} coming soon`}>
        {content}
      </div>
    )
  }

  return (
    <Link to={`/${cert.id}`} className={cardClass}>
      {content}
    </Link>
  )
}

function MiniStat({ value, label }) {
  return (
    <div>
      <p className="text-sm font-black text-slate-800">{value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  )
}

function CatalogMetric({ value, label }) {
  return (
    <div className="rounded-lg border border-slate-900/10 bg-slate-50 p-3">
      <p className="text-xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
    </div>
  )
}
