import { useState } from 'react'
import { Link } from 'react-router-dom'
import BrandedName from '../components/BrandedName'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const CORE_BLUEPRINTS = {
  core1: {
    label: 'Core 1',
    code: '220-1201',
    route: '/comptia-a-plus-core-1',
    title: 'Hardware, networking, mobile, cloud',
    passingScore: '675 / 900',
    liveQuestions: 760,
    status: 'Live · A+ readiness · full quality gate passed',
    focus: 'Best first stop for device support, network basics, printers, virtualization, and hardware troubleshooting.',
    domains: [
      ['Mobile Devices', 13],
      ['Networking', 23],
      ['Hardware', 25],
      ['Virtualization and Cloud Computing', 11],
      ['Hardware and Network Troubleshooting', 28],
    ],
  },
  core2: {
    label: 'Core 2',
    code: '220-1202',
    route: '/comptia-a-plus-core-2',
    title: 'Operating systems, security, procedures',
    passingScore: '700 / 900',
    liveQuestions: 760,
    status: 'Live · A+ readiness · full quality gate passed',
    focus: 'Best second stop for Windows, macOS, Linux, malware response, software troubleshooting, and support process.',
    domains: [
      ['Operating Systems', 28],
      ['Security', 28],
      ['Software Troubleshooting', 23],
      ['Operational Procedures', 21],
    ],
  },
}

export default function APlus() {
  const [selectedCore, setSelectedCore] = useState('core1')
  const core = CORE_BLUEPRINTS[selectedCore]
  const contentTargets = [
    [String(core.liveQuestions), `${core.label} live questions`],
    ['20', 'PBQ-lite scenarios'],
    ['90', 'exam questions'],
    ['90', 'minutes per exam'],
  ]

  useDocumentMeta({
    title: 'CompTIA A+ Core 1 and Core 2 | freecertprep',
    description:
      'Dedicated CompTIA A+ track for choosing Core 1 220-1201 or Core 2 220-1202 without changing the main certification catalog.',
    path: '/comptia/a-plus',
  })

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <header className="border-b border-white/5 bg-zinc-950/60 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <BrandedName />
          </Link>
          <div className="flex items-center gap-5 text-sm font-medium text-zinc-400">
            <Link to="/" className="hover:text-zinc-100 transition-colors">Home</Link>
            <Link to="/docs" className="hidden sm:inline hover:text-zinc-100 transition-colors">Docs</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <p className="text-[10px] font-bold text-red-300 uppercase tracking-widest mb-5">
                CompTIA A+ V15
              </p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-100 mb-7">
                Pick your A+ core.
              </h1>
              <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
                A+ is a two-exam credential. This track keeps Core 1 and Core 2 separate, uses the official domain weights, and clearly distinguishes practice readiness from CompTIA&apos;s scaled scoring and richer PBQ delivery.
              </p>
              <div className="mt-7 flex flex-col items-start gap-3">
                <p className="text-sm font-semibold text-zinc-300">
                  New to IT? Start with Core 1, then move to Core 2.
                </p>
                <Link
                  to="/comptia-a-plus-core-1"
                  className="inline-flex items-center justify-center rounded-lg bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
                >
                  Begin Core 1
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {contentTargets.map(([value, label]) => (
                <div key={label} className="glass-panel rounded-2xl p-5">
                  <p className="text-3xl font-bold text-zinc-100">{value}</p>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12 border-y border-white/5">
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Choose your current exam</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-100">Core 1 comes first for most new learners.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(CORE_BLUEPRINTS).map(([key, item]) => {
              const active = key === selectedCore
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setSelectedCore(key)}
                  aria-pressed={active}
                  className={`glass-panel glass-panel-hover rounded-2xl p-7 text-left min-h-[230px] border transition-all ${active ? 'border-red-500/50' : 'border-white/10'}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <p className="text-[10px] font-bold text-red-300 uppercase tracking-widest mb-2">
                        {item.label}
                      </p>
                      <h2 className="text-2xl font-bold text-zinc-100">{item.code}</h2>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {key === 'core1' && (
                        <span className="rounded-md border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                          Start here
                        </span>
                      )}
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${active ? 'text-red-200 border-red-500/40 bg-red-500/10' : 'text-zinc-500 border-white/10 bg-zinc-900/60'}`}>
                        {active ? 'Selected' : 'Select'}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-200 mb-3">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.focus}</p>
                </button>
              )
            })}
          </div>
          <div className="mt-6 flex flex-col gap-3 rounded-lg border border-white/10 bg-zinc-950/75 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Your selection</p>
              <p className="mt-1 text-sm text-zinc-300">{core.label} · {core.code} · {core.title}</p>
            </div>
            <Link
              to={core.route}
              className="inline-flex items-center justify-center rounded-lg bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
            >
              Start {core.label}
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
            <div>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">
                Blueprint
              </p>
              <h2 className="text-3xl font-bold text-zinc-100 mb-4">
                {core.label} {core.code}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                {core.label} has {core.liveQuestions.toLocaleString()} questions and twenty evidence-based PBQ-lite scenarios. Every item is mapped to the official objective hierarchy, uses a unique answer interaction, and includes structured review guidance for the correct answer, distractors, and verification step.
              </p>
              <div className="glass-panel rounded-2xl p-5">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <span className="text-sm text-zinc-500">Passing score</span>
                  <span className="text-sm font-semibold text-zinc-100">{core.passingScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">Status</span>
                  <span className="text-sm font-semibold text-emerald-300">{core.status}</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6">
              <div className="space-y-5">
                {core.domains.map(([domain, weight]) => (
                  <div key={domain}>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <p className="text-sm font-semibold text-zinc-200">{domain}</p>
                      <p className="text-sm text-zinc-500">{weight}%</p>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-red-500"
                        style={{ width: `${weight}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
