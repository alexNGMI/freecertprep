import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteFooter, SiteHeader } from '../components/SiteChrome'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Button } from '../components/ui/button'

const CORE_BLUEPRINTS = {
  core1: {
    label: 'Core 1',
    code: '220-1201',
    route: '/comptia-a-plus-core-1',
    title: 'Hardware, networking, mobile, cloud',
    passingScore: '675 / 900',
    liveQuestions: 760,
    status: 'Available now',
    plainFocus: 'Practice the things a help desk tech sees first: computers, phones, printers, Wi-Fi, cables, and basic troubleshooting.',
    focus: 'Best first stop for device support, network basics, printers, virtualization, and hardware troubleshooting.',
    examples: ['Fix a slow laptop', 'Identify network basics', 'Troubleshoot printers and devices'],
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
    status: 'Available now',
    plainFocus: 'Practice the software side of support: operating systems, security basics, malware cleanup, and professional support habits.',
    focus: 'Best second stop for Windows, macOS, Linux, malware response, software troubleshooting, and support process.',
    examples: ['Use Windows tools', 'Handle basic security issues', 'Follow support procedures'],
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

  useDocumentMeta({
    title: 'CompTIA A+ Core 1 and Core 2 | freecertprep',
    description:
      'Dedicated CompTIA A+ track for choosing Core 1 220-1201 or Core 2 220-1202 without changing the main certification catalog.',
    path: '/comptia/a-plus',
  })

  return (
    <div className="theme-page min-h-screen text-slate-950">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-6 md:pt-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-black uppercase tracking-widest text-rose-700">
                Beginner-friendly A+ track
              </p>
              <h1 className="mb-6 text-5xl font-black leading-tight text-slate-950 md:text-6xl">
                Start here if IT feels new.
              </h1>
              <p className="text-lg leading-8 text-slate-700">
                CompTIA A+ certification is the industry standard to start your IT career and appears in more tech support job listings than any other IT credential. You'll need to pass two exams: Core 1 (hardware and networking) and Core 2 (operating systems and security), which you can take in any order.
              </p>
              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button as={Link} to="/comptia-a-plus-core-1" variant="primary">
                  Start Core 1
                </Button>
                <a href="#choose-core" className="text-sm font-black text-slate-600 transition hover:text-slate-950">
                  Compare both cores
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                src="/comptia-a-plus-certification.png"
                alt="CompTIA A+ Certification Plus Series badge"
                className="w-full max-w-[17rem] object-contain drop-shadow-[0_28px_50px_rgba(15,23,42,0.18)] sm:max-w-[19rem] lg:max-w-[21rem]"
              />
            </div>
          </div>
        </section>

        <section id="choose-core" className="border-y border-slate-900/10 bg-white/70">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">Choose where to start</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">Most beginners should choose Core 1.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Think of the two cores as two halves of the same entry-level IT skill set. Core 1 is more about equipment and connectivity. Core 2 is more about software, security, and day-to-day support work.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {Object.entries(CORE_BLUEPRINTS).map(([key, item]) => {
                const active = key === selectedCore
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setSelectedCore(key)}
                    aria-pressed={active}
                    className={`min-h-[230px] rounded-lg border bg-white p-7 text-left shadow-[0_20px_50px_-42px_rgba(15,23,42,0.5)] transition hover:-translate-y-0.5 hover:border-slate-900/20 ${active ? 'border-rose-500/55 ring-4 ring-rose-500/10' : 'border-slate-900/10'}`}
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-rose-700">
                          {item.label}
                        </p>
                        <h2 className="text-2xl font-black text-slate-950">{item.code}</h2>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {key === 'core1' && (
                          <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                            Start here
                          </span>
                        )}
                        <span className={`rounded-md border px-2.5 py-1 text-[11px] font-black ${active ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
                          {active ? 'Selected' : 'Select'}
                        </span>
                      </div>
                    </div>
                    <h3 className="mb-3 text-lg font-black text-slate-800">{item.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{item.plainFocus}</p>
                    <ul className="mt-5 space-y-2">
                      {item.examples.map((example) => (
                        <li key={example} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </button>
                )
              })}
            </div>
            <div className="mt-6 flex flex-col gap-3 rounded-lg border border-slate-900/10 bg-white p-5 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.45)] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Your selection</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">{core.label} - {core.code} - {core.title}</p>
              </div>
              <Button as={Link} to={core.route} variant="primary">
                {`Open ${core.label} practice`}
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <div className="mb-8 rounded-lg border border-rose-200 bg-rose-50 p-5">
            <p className="text-sm font-black text-rose-800">What to do next</p>
            <p className="mt-2 text-sm leading-6 text-rose-950">
              If you are brand new, do not start by memorizing percentages. Open Core 1, answer a short practice set, read the explanations, and let the weak areas tell you what to study next.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-500">
                Exam details
              </p>
              <h2 className="mb-4 text-3xl font-black text-slate-950">
                {core.label} {core.code}
              </h2>
              <p className="mb-6 text-sm leading-6 text-slate-600">
                {core.label} includes {core.liveQuestions.toLocaleString()} practice questions and twenty interactive scenarios. Each question is tied to an exam topic and includes an explanation to help you review the answer.
              </p>
              <div className="rounded-lg border border-slate-900/10 bg-white p-5 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.45)]">
                <div className="mb-4 flex items-center justify-between border-b border-slate-900/10 pb-4">
                  <span className="text-sm text-slate-500">Passing score</span>
                  <span className="text-sm font-black text-slate-950">{core.passingScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Status</span>
                  <span className="text-sm font-black text-emerald-700">{core.status}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-900/10 bg-white p-6 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.45)]">
              <div className="space-y-5">
                {core.domains.map(([domain, weight]) => (
                  <div key={domain}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <p className="text-sm font-black text-slate-800">{domain}</p>
                      <p className="text-sm font-bold text-slate-500">{weight}%</p>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full border border-slate-900/10 bg-slate-100">
                      <div
                        className="h-full rounded-full bg-rose-600"
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
      <SiteFooter />
    </div>
  )
}
