import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { SiteFooter, SiteHeader } from '../components/SiteChrome'
import { getAllCerts } from '../data/certs'
import { selectLiveCerts } from '../data/catalogVisibility'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Button } from '../components/ui/button'

const liveCerts = selectLiveCerts(getAllCerts())

const pathTiles = [
  {
    id: 'a-plus',
    eyebrow: 'Start here',
    title: 'A+ foundation',
    image: '/home-a-plus.jpg',
    to: '/comptia/a-plus',
    cta: 'Start A+',
    accent: '#ef4444',
  },
  {
    id: 'networking',
    eyebrow: 'Build networks',
    title: 'Networking',
    image: '/home-networking.jpg',
    to: '/paths/networking',
    cta: 'Open path',
    accent: '#0f766e',
  },
  {
    id: 'cybersecurity',
    eyebrow: 'Protect systems',
    title: 'Cybersecurity',
    image: '/home-cybersecurity.jpg',
    to: '/paths/cybersecurity',
    cta: 'Open path',
    accent: '#e11d48',
  },
  {
    id: 'cloud',
    eyebrow: 'Ship infrastructure',
    title: 'Cloud',
    image: '/home-cloud.jpg',
    to: '/paths/cloud',
    cta: 'Open path',
    accent: '#2563eb',
  },
]

export default function Home() {
  useDocumentMeta({
    description:
      'Free, open-source certification exam prep organized by career path: A+, networking, cybersecurity, and cloud. Timed simulators, Smart Practice, and no signup.',
    path: '/',
  })

  return (
    <div className="theme-page min-h-screen text-slate-950">
      <SiteHeader />

      <main>
        <section className="relative min-h-[clamp(34rem,calc(100svh-12rem),46rem)] overflow-hidden">
          <img
            src="/hero-network-engineer.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[66%_center]"
          />
          <div className="hero-scrim absolute inset-0" />
          <div className="relative mx-auto flex min-h-[clamp(34rem,calc(100svh-12rem),46rem)] max-w-7xl flex-col justify-center px-5 py-12 sm:px-6 sm:py-16">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/75 px-3 py-1.5 text-sm font-bold text-slate-700 shadow-sm">
                <Sparkles className="h-4 w-4 text-teal-600" />
                Free prep. No signup wall.
              </div>
              <h1
                className="text-4xl font-black leading-[0.98] text-slate-950 sm:text-6xl lg:text-7xl"
                aria-label="Choose a direction. Build confidence."
              >
                <span className="block">Choose a direction.</span>
                <span className="block">Build confidence.</span>
              </h1>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button as="a" href="#paths" variant="accent" size="lg" accentColor="#14b8a6">
                  Find your next step.
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-black text-slate-700">
                <Link to="/catalog" className="text-teal-700 transition-colors hover:text-slate-950">
                  Full Catalog
                </Link>
                <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1.5">
                  {liveCerts.length} live exams
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="paths" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-12 sm:px-6 sm:py-16">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Pick a path.</h2>
            <Link to="/catalog" className="inline-flex items-center gap-2 text-sm font-black text-teal-700 transition-colors hover:text-slate-950">
              See every exam
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pathTiles.map((path) => (
              <PathTile key={path.id} path={path} />
            ))}
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}

function PathTile({ path }) {
  return (
    <Link
      to={path.to}
      className="group relative min-h-[21rem] overflow-hidden rounded-lg border border-slate-900/10 bg-slate-950 shadow-[0_26px_70px_-46px_rgba(15,23,42,0.6)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_-44px_rgba(15,23,42,0.72)]"
    >
      <img
        src={path.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/28 to-slate-950/8" />
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: path.accent }} />
      <div className="relative flex min-h-[21rem] flex-col justify-end p-5 text-white">
        <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-white/72">{path.eyebrow}</p>
        <h3 className="text-3xl font-black leading-tight">{path.title}</h3>
        <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-black text-slate-950 shadow-sm transition group-hover:gap-3">
          {path.cta}
          <ArrowRight className="h-4 w-4" style={{ color: path.accent }} />
        </span>
      </div>
    </Link>
  )
}
