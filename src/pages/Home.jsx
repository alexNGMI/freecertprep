import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Cpu,
  GraduationCap,
  LockKeyhole,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { getAllCerts } from '../data/certs'
import BrandedName from '../components/BrandedName'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

function useVisitorCount() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    fetch('https://api.counterapi.dev/v1/freecertprep/homepage/up')
      .then(r => r.json())
      .then(data => { if (data?.count) setCount(data.count) })
      .catch(() => {})
  }, [])

  return count
}

const certs = getAllCerts()

const paths = [
  {
    id: 'it-entry',
    eyebrow: 'IT Entry',
    title: 'Start with A+ if you are brand new',
    description:
      'A+ is the stepping stone for learners with no technical background before networking, security, cloud, or AI paths.',
    icon: GraduationCap,
    color: '#ef4444',
    featured: true,
    to: '/comptia/a-plus',
    meta: 'A+ foundation',
    certIds: [],
  },
  {
    id: 'networking',
    eyebrow: 'Networking',
    title: 'Networking Career Path',
    description:
      'Start with Network+ or CCST Networking, then build toward CCNA for NOC, junior network admin, and infrastructure support careers.',
    icon: Network,
    color: '#f97316',
    to: '/paths/networking',
    meta: 'Network+ or CCST to CCNA',
    certIds: ['comptia-net-plus', 'ccst-networking'],
  },
  {
    id: 'cybersecurity',
    eyebrow: 'Cybersecurity',
    title: 'Cybersecurity with tooling',
    description:
      'Network+ and Security+ give the theory and baseline; Splunk adds the practical SOC tooling layer that helps entry-level candidates look closer to job-ready.',
    icon: LockKeyhole,
    color: '#fb7185',
    to: '/paths/cybersecurity',
    meta: 'Network+ to Security+ to Splunk',
    certIds: ['comptia-net-plus', 'comptia-sec-plus'],
  },
  {
    id: 'cloud',
    eyebrow: 'Cloud',
    title: 'Deployable cloud skill',
    description:
      'Move from AWS fundamentals into architecture, then finish with Terraform so your path points toward real cloud support, junior cloud, and infrastructure roles.',
    icon: Cloud,
    color: '#38bdf8',
    to: '/paths/cloud',
    meta: 'AWS foundation to Terraform automation',
    certIds: ['clf-c02', 'az-900', 'cdl', 'terraform-associate'],
  },
  {
    id: 'nvidia',
    eyebrow: 'NVIDIA',
    title: 'NVIDIA fluency',
    description:
      'Prepare for NVIDIA AI infrastructure and generative AI exams with focused practice for the accelerated computing stack.',
    icon: Cpu,
    color: '#34d399',
    to: '/paths/nvidia',
    meta: 'NVIDIA AI credentials',
    certIds: ['nca-aiio', 'nca-genl'],
  },
]

const featureItems = [
  {
    title: 'Smart Practice',
    desc: 'Weak questions return more often while mastered ones fade into maintenance review.',
    icon: BrainCircuit,
  },
  {
    title: 'Real exam flow',
    desc: 'Timed simulators match question count, time limit, and domain weighting for each exam.',
    icon: ShieldCheck,
  },
  {
    title: 'No account wall',
    desc: 'Progress stays local, every feature works immediately, and the project stays open source.',
    icon: CheckCircle2,
  },
]

const providerStyles = {
  AWS: { bg: 'bg-orange-500/10 border-orange-500/20', text: 'text-orange-300' },
  'Google Cloud': { bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-300' },
  NVIDIA: { bg: 'bg-green-500/10 border-green-500/20', text: 'text-green-300' },
  'Microsoft Azure': { bg: 'bg-cyan-500/10 border-cyan-500/20', text: 'text-cyan-300' },
  Cisco: { bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-300' },
  CompTIA: { bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-300' },
  HashiCorp: { bg: 'bg-violet-500/10 border-violet-500/20', text: 'text-violet-300' },
}

export default function Home() {
  const visitorCount = useVisitorCount()

  useDocumentMeta({
    description:
      'Free, open-source certification exam prep organized by career path: A+, CompTIA, cloud, NVIDIA, and infrastructure. Timed simulators, Smart Practice, and no signup.',
    path: '/',
  })

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <header className="border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-20 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <BrandedName />
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#paths" className="hover:text-zinc-100 transition-colors">Paths</a>
            <a href="#catalog" className="hover:text-zinc-100 transition-colors">Catalog</a>
            <Link to="/docs" className="hover:text-zinc-100 transition-colors">Docs</Link>
            <a href="https://github.com/alexNGMI/freecertprep" target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition-colors">GitHub</a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-end">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/10 bg-zinc-900/60 text-zinc-300 text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-zinc-500" />
                Free practice for modern IT certifications
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-100 leading-none mb-7">
                Choose a direction. Build confidence.
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                FreeCertPrep organizes certifications around career momentum, not vendor logos. Start at the level that fits, practice with exam-shaped sessions, and let Smart Practice keep the right questions in rotation.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href="#paths"
                  className="inline-flex items-center justify-center gap-2 bg-zinc-100 text-zinc-950 font-semibold text-base px-6 py-3 rounded-lg hover:bg-white transition-colors"
                >
                  Find Your Path
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#catalog"
                  className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-zinc-100 border border-white/10 font-semibold text-base px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Browse All Certs
                </a>
              </div>
            </div>

            <div aria-hidden="true" className="hidden lg:block" />
          </div>
        </section>

        <section id="paths" className="max-w-7xl mx-auto px-6 py-16 border-y border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Career paths</p>
              <h2 className="text-3xl font-bold text-zinc-100">Find the lane that fits next.</h2>
            </div>
            <p className="text-sm text-zinc-500 max-w-xl leading-relaxed">
              Each lane keeps related certifications together without forcing every learner through the same starting point.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <PathCard path={paths[0]} variant="wide" className="md:col-span-2 xl:col-span-4" />
            {paths.slice(1).map((path) => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featureItems.map(({ title, desc, icon }) => {
              const FeatureIcon = icon
              return (
                <div key={title} className="border border-white/10 bg-zinc-950/70 rounded-lg p-6">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/70 border border-white/10 flex items-center justify-center mb-4 text-zinc-300">
                    <FeatureIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2">{title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section id="catalog" className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Full catalog</p>
              <h2 className="text-3xl font-bold text-zinc-100">Every active certification.</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {certs.map((cert) => (
              <CertRow key={cert.id} cert={cert} />
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="border border-white/10 bg-zinc-950/75 rounded-lg px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-zinc-400">
              Real estate exam prep lives in its own sister experience.
            </p>
            <Link
              to="/real-estate"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-zinc-900 text-zinc-100 text-sm font-semibold px-4 py-2.5 hover:bg-zinc-800 transition-colors"
            >
              Looking for something completely different?
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-zinc-950/50 py-10 mt-12 text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
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
      </footer>
    </div>
  )
}

function PathCard({ path, className = '', variant = 'default' }) {
  const Icon = path.icon
  const featured = path.featured
  const wide = variant === 'wide'

  if (wide) {
    return (
      <div
        className={`relative overflow-hidden border rounded-lg bg-zinc-950/75 p-5 ${className}`}
        style={{ borderColor: `${path.color}45` }}
      >
        <div className="absolute top-0 left-0 h-1 w-full" style={{ backgroundColor: path.color }} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg border border-white/10 bg-zinc-900/80 flex items-center justify-center shrink-0" style={{ color: path.color }}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{path.eyebrow}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight mb-2">{path.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">{path.description}</p>
            </div>
          </div>
          <PathCta to={path.to} label="View A+ path" accentColor={path.color} compact />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden border rounded-lg bg-zinc-950/75 ${wide ? 'p-5' : 'p-6'} ${className}`}
      style={{ borderColor: `${path.color}45` }}
    >
      <div className="absolute top-0 left-0 h-1 w-full" style={{ backgroundColor: path.color }} />
      <div className={wide ? 'grid grid-cols-1 sm:grid-cols-[1.15fr_0.85fr] gap-4 sm:items-center' : ''}>
        <div>
          <div className={`flex items-start justify-between gap-4 ${wide ? 'mb-3' : 'mb-6'}`}>
            <div className="w-11 h-11 rounded-lg border border-white/10 bg-zinc-900/80 flex items-center justify-center" style={{ color: path.color }}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{path.eyebrow}</span>
          </div>
          <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold text-zinc-100 tracking-tight mb-3`}>
            {path.title}
          </h3>
          <p className={`text-sm text-zinc-400 leading-relaxed ${wide ? 'max-w-2xl' : 'mb-6'}`}>{path.description}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-zinc-500 mb-4">{path.meta}</p>
          <PathCta to={path.to} label="Open path" accentColor={path.color} />
        </div>
      </div>
    </div>
  )
}

function PathCta({ to, label, accentColor, compact = false }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-between gap-3 rounded-md border border-white/10 bg-zinc-900/55 px-3 py-2.5 text-sm font-semibold text-zinc-100 hover:bg-zinc-900 transition-colors ${compact ? 'w-auto self-start' : 'w-full'}`}
      style={{ borderColor: `${accentColor}35` }}
    >
      {label}
      <ArrowRight className="w-4 h-4 text-zinc-600 shrink-0" />
    </Link>
  )
}

function CertRow({ cert }) {
  const ps = providerStyles[cert.provider] || { bg: 'bg-zinc-800 border-zinc-700', text: 'text-zinc-400' }
  const Icon = cert.provider === 'CompTIA' || cert.provider === 'Cisco'
    ? Network
    : cert.provider === 'HashiCorp'
      ? Server
      : cert.provider === 'NVIDIA'
        ? Cpu
        : Cloud

  return (
    <Link
      to={`/${cert.id}`}
      className="group border border-white/10 bg-zinc-950/75 hover:bg-zinc-900/70 rounded-lg p-5 transition-colors"
    >
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
        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0 mt-1" />
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
        <MiniStat value={cert.examQuestions} label="Exam" />
        <MiniStat value={`${cert.examTime}m`} label="Time" />
      </div>
    </Link>
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
