import { ExternalLink, ShieldCheck } from 'lucide-react'

export default function TrustPanel({ cert, light = false }) {
  const source = cert.source
  if (!source) return null

  const border = light ? 'border-slate-200 bg-white' : 'border-white/10 bg-zinc-900/55'
  const heading = light ? 'text-slate-900' : 'text-zinc-100'
  const body = light ? 'text-slate-500' : 'text-zinc-400'
  const muted = light ? 'text-slate-400' : 'text-zinc-500'

  return (
    <section className={`rounded-2xl border p-5 shadow-sm ${border}`}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <h2 className={`text-lg font-black ${heading}`}>Source and simulation status</h2>
          </div>
          <p className={`mt-3 text-sm leading-relaxed ${body}`}>{source.examFormat}</p>
          <p className={`mt-2 text-sm leading-relaxed ${body}`}>{source.scoreModel}</p>
          <div className={`mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold ${muted}`}>
            <span>{source.sourceLabel}</span>
            <span>Checked {source.checkedAt}</span>
            {source.readinessGrade && <span>Simulation readiness {source.readinessGrade}</span>}
            <span>{source.editorialStatus}</span>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={source.officialUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition-colors ${light ? 'border-slate-200 text-slate-700 hover:bg-slate-50' : 'border-white/10 text-zinc-200 hover:bg-white/5'}`}
          >
            Official source
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
