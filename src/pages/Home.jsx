import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  GraduationCap,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import BrandedName from '../components/BrandedName'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Button } from '../components/ui/button'
import { PageEyebrow, PageLead, PageTitle, SectionHeading, Surface } from '../components/ui/surface'

const paths = [
  {
    id: 'it-entry',
    eyebrow: '01 · IT foundation',
    title: 'Build your foundation with A+.',
    description:
      'Learn the hardware, operating system, networking, security, and troubleshooting basics that support every career direction below.',
    icon: GraduationCap,
    color: '#ef4444',
    featured: true,
    to: '/comptia/a-plus',
    available: ['A+ Core 1', 'A+ Core 2'],
    certIds: [],
  },
  {
    id: 'networking',
    eyebrow: '02 · Networking',
    title: 'Build and troubleshoot networks.',
    description:
      'Develop the vendor-neutral or Cisco-aligned foundation used in network support, operations, and infrastructure roles.',
    icon: Network,
    color: '#f97316',
    to: '/paths/networking',
    roles: ['NOC Technician', 'Network Support', 'Junior Network Administrator'],
    available: ['Network+', 'CCST Networking'],
    upcoming: ['CCNA'],
    certIds: ['comptia-net-plus', 'ccst-networking', 'ccna-200-301'],
  },
  {
    id: 'cybersecurity',
    eyebrow: '03 · Cybersecurity',
    title: 'Protect systems and investigate threats.',
    description:
      'Build on your networking foundation with a recognized security baseline and practical SIEM search skills for entry-level security work.',
    icon: LockKeyhole,
    color: '#fb7185',
    to: '/paths/cybersecurity',
    roles: ['SOC Analyst', 'Security Support', 'Junior Security Analyst'],
    available: ['Security+', 'Splunk'],
    certIds: ['comptia-sec-plus', 'splunk-core-certified-user'],
  },
  {
    id: 'cloud',
    eyebrow: '04 · Cloud',
    title: 'Design and automate cloud infrastructure.',
    description:
      'Move from cloud concepts into AWS architecture and infrastructure as code for practical cloud and platform roles.',
    icon: Cloud,
    color: '#38bdf8',
    to: '/paths/cloud',
    roles: ['Cloud Support', 'Junior Cloud Engineer', 'Infrastructure Engineer'],
    available: ['Cloud Practitioner', 'SAA', 'Terraform'],
    certIds: ['clf-c02', 'aws-saa-c03', 'terraform-associate'],
  },
]

const featureItems = [
  {
    title: 'Smart Practice',
    desc: 'Weak questions return more often while mastered ones fade into maintenance review.',
    icon: BrainCircuit,
  },
  {
    title: 'Exam-shaped flow',
    desc: 'Timed readiness forms use official domain weighting and the closest supported exam structure.',
    icon: ShieldCheck,
  },
  {
    title: 'No account wall',
    desc: 'Every feature works immediately. Optional accounts are for sync, backup, and report follow-up.',
    icon: CheckCircle2,
  },
]

export default function Home() {
  useDocumentMeta({
    description:
      'Free, open-source certification exam prep organized by career path: A+, networking, cybersecurity, and cloud. Timed simulators, Smart Practice, and no signup.',
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
            <Link to="/catalog" className="hover:text-zinc-100 transition-colors">Catalog</Link>
            <Link to="/docs" className="hover:text-zinc-100 transition-colors">Docs</Link>
            <Link to="/account" className="hover:text-zinc-100 transition-colors">Account</Link>
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
              <PageTitle className="mb-6 leading-tight">
                Choose a direction. Build confidence.
              </PageTitle>
              <PageLead>
                FreeCertPrep organizes certifications around career momentum, not vendor logos. Start at the level that fits, practice with exam-shaped sessions, and let Smart Practice keep the right questions in rotation.
              </PageLead>
              <p className="mt-5 text-sm font-semibold text-zinc-300">
                Brand new to IT? Begin with A+. Already know your goal? Choose a career path.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button
                  as={Link}
                  to="/comptia/a-plus"
                  variant="primary"
                  size="lg"
                >
                  I&apos;m new to IT
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  as="a"
                  href="#career-paths"
                  variant="secondary"
                  size="lg"
                >
                  Choose a career path
                </Button>
              </div>
              <Link to="/catalog" aria-label="Browse All Certs" className="mt-4 inline-flex text-sm font-semibold text-zinc-500 hover:text-zinc-200">
                Already know the exact certification? Browse all certs.
              </Link>
            </div>

            <div aria-hidden="true" className="hidden lg:block" />
          </div>
        </section>

        <section id="paths" className="max-w-7xl mx-auto px-6 py-16 border-y border-white/5">
          <div className="mb-10">
            <PageEyebrow className="mb-3">Recommended progression</PageEyebrow>
            <PathCard path={paths[0]} variant="wide" />
          </div>

          <SectionHeading
            id="career-paths"
            eyebrow="Build forward"
            title="Foundation. Networks. Security. Cloud."
            detail="Move through the sequence when it serves your goal, or enter at the stage that matches what you already know."
            className="mb-8 border-t border-white/5 pt-10 scroll-mt-24"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Surface key={title} className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/70 border border-white/10 flex items-center justify-center mb-4 text-zinc-300">
                    <FeatureIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2">{title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                </Surface>
              )
            })}
          </div>
        </section>

      </main>

      <footer className="border-t border-white/5 bg-zinc-950/50 py-10 mt-12 text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <BrandedName size="text-lg" />
          </Link>
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
              <StatusLine label="Available now" items={path.available} color={path.color} className="mt-4" />
            </div>
          </div>
          <PathCta to={path.to} label="Start with A+" accentColor={path.color} compact />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden border rounded-lg bg-zinc-950/75 ${wide ? 'p-5' : 'p-4 flex flex-col'} ${className}`}
      style={{ borderColor: `${path.color}45` }}
    >
      <div className="absolute top-0 left-0 h-1 w-full" style={{ backgroundColor: path.color }} />
      <div className={wide ? 'grid grid-cols-1 sm:grid-cols-[1.15fr_0.85fr] gap-4 sm:items-center' : 'flex flex-col flex-1'}>
        <div>
          <div className={`flex items-start justify-between gap-4 ${wide ? 'mb-3' : 'mb-6'}`}>
            <div className="w-11 h-11 rounded-lg border border-white/10 bg-zinc-900/80 flex items-center justify-center" style={{ color: path.color }}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{path.eyebrow}</span>
          </div>
          <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-lg'} font-bold text-zinc-100 tracking-tight mb-3`}>
            {path.title}
          </h3>
          <p className={`text-sm text-zinc-400 leading-relaxed ${wide ? 'max-w-2xl' : ''}`}>{path.description}</p>
          <div className="mt-5 border-t border-white/5 pt-4 space-y-3">
            <StatusLine label="Target roles" items={path.roles} color={path.color} />
            <StatusLine label="Available now" items={path.available} color={path.color} />
            {path.upcoming?.length > 0 && (
              <StatusLine label="Coming next" items={path.upcoming} color="#fbbf24" muted />
            )}
          </div>
        </div>

        <div className={wide ? '' : 'mt-auto pt-6'}>
          <PathCta to={path.to} label={`Explore ${path.id === 'networking' ? 'Networking' : path.id === 'cybersecurity' ? 'Cybersecurity' : 'Cloud'}`} accentColor={path.color} />
        </div>
      </div>
    </div>
  )
}

function StatusLine({ label, items = [], color, className = '', muted = false }) {
  return (
    <div className={className}>
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-md border px-2 py-1 text-[11px] font-semibold ${muted ? 'bg-amber-300/5 text-amber-100/70' : 'bg-zinc-900/70 text-zinc-300'}`}
            style={{ borderColor: `${color}35` }}
          >
            {item}
          </span>
        ))}
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

