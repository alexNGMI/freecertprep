import { createElement, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  CheckCircle2,
  Cloud,
  Database,
  Download,
  KeyRound,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import BrandedName from '../components/BrandedName'
import { Button } from '../components/ui/button'
import { Surface } from '../components/ui/surface'
import { exportProgress, exportQuestionIssueReports, readQuestionIssueReports } from '../utils/storage'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const SUPABASE_READY = Boolean(
  import.meta.env.VITE_SUPABASE_URL
  && import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export default function Account() {
  const [email, setEmail] = useState('')
  const [notice, setNotice] = useState(null)
  const reports = useMemo(() => readQuestionIssueReports(), [])

  useDocumentMeta({
    title: 'Account and Sync',
    description: 'Optional freecertprep account, progress sync, and question issue reporting status.',
    path: '/account',
  })

  function handleSignIn(event) {
    event.preventDefault()
    if (!SUPABASE_READY) {
      setNotice({
        kind: 'info',
        message: 'Account sign-in is ready in the UI. Add the Supabase URL and anon key to enable magic links.',
      })
      return
    }
    setNotice({
      kind: 'success',
      message: `Magic-link sign-in will be sent to ${email} after the Supabase client is connected.`,
    })
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="hover:opacity-80">
            <BrandedName />
          </Link>
          <nav className="flex items-center gap-5 text-sm font-semibold text-zinc-400">
            <Link to="/catalog" className="hover:text-zinc-100">Catalog</Link>
            <Link to="/docs" className="hover:text-zinc-100">Docs</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <Surface className="overflow-hidden p-7 md:p-9">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Optional account layer</p>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-50 md:text-6xl">
                  Keep studying locally. Sync when you want.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
                  Accounts are for durability, cross-device progress, and issue-report follow-up. The practice engine stays usable without signing in.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                <StatusPill ready={SUPABASE_READY} />
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {SUPABASE_READY
                    ? 'Supabase env vars are present. The next code pass can connect the client.'
                    : 'Waiting on Supabase environment variables before live sign-in is enabled.'}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <ReadinessCard icon={ShieldCheck} title="Anonymous access" body="All study modes keep working without an account." ready />
              <ReadinessCard icon={Cloud} title="Progress sync" body="Prepared for signed-in study snapshots and question stats." ready={SUPABASE_READY} />
              <ReadinessCard icon={AlertCircle} title="Issue reports" body="Local reports already export as JSON and map to the backend table." ready />
            </div>
          </Surface>

          <Surface className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 text-sky-300">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-black text-zinc-50">Sign in with email</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Magic-link sign-in is the intended first auth flow. No password UX needed.
            </p>
            <form className="mt-5 space-y-3" onSubmit={handleSignIn}>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500" htmlFor="account-email">
                Email
              </label>
              <input
                id="account-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-sky-400/50"
              />
              <Button type="submit" variant="accent" accentColor="#38bdf8" className="w-full">
                <KeyRound className="h-4 w-4" />
                Send magic link
              </Button>
            </form>
            {notice && (
              <p className={`mt-4 rounded-xl border px-4 py-3 text-sm font-semibold ${
                notice.kind === 'success'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                  : 'border-sky-500/30 bg-sky-500/10 text-sky-200'
              }`}>
                {notice.message}
              </p>
            )}
          </Surface>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <Surface className="p-6">
            <Database className="h-6 w-6 text-emerald-300" />
            <h2 className="mt-4 text-xl font-black text-zinc-50">Local progress backup</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Until sync is live, export progress before clearing browser data or switching devices.
            </p>
            <Button className="mt-5" variant="secondary" onClick={() => exportProgress()}>
              <Download className="h-4 w-4" />
              Export progress
            </Button>
          </Surface>

          <Surface className="p-6">
            <AlertCircle className="h-6 w-6 text-amber-300" />
            <h2 className="mt-4 text-xl font-black text-zinc-50">Question reports</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {reports.length} local report{reports.length === 1 ? '' : 's'} ready for export or future backend submission.
            </p>
            <Button className="mt-5" variant="secondary" onClick={() => exportQuestionIssueReports()}>
              <Download className="h-4 w-4" />
              Export reports
            </Button>
          </Surface>

          <Surface className="p-6">
            <Cloud className="h-6 w-6 text-sky-300" />
            <h2 className="mt-4 text-xl font-black text-zinc-50">Next backend hook</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Once Supabase env vars are in Cloudflare and local `.env.local`, connect the client and replace this status-only sign-in with real auth.
            </p>
            <div className="mt-5 rounded-xl border border-white/10 bg-zinc-900/60 p-3 text-xs font-semibold text-zinc-500">
              Required: <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>
            </div>
          </Surface>
        </section>
      </main>
    </div>
  )
}

function StatusPill({ ready }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
      ready
        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
        : 'border-amber-500/30 bg-amber-500/10 text-amber-200'
    }`}>
      {ready ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
      {ready ? 'Backend config found' : 'Backend config needed'}
    </div>
  )
}

function ReadinessCard({ icon: Icon, title, body, ready }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/55 p-5">
      <div className="flex items-center justify-between gap-3">
        {createElement(Icon, { className: 'h-5 w-5 text-zinc-400' })}
        <StatusDot ready={ready} />
      </div>
      <h3 className="mt-4 font-black text-zinc-100">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">{body}</p>
    </div>
  )
}

function StatusDot({ ready }) {
  return (
    <span className={`h-2.5 w-2.5 rounded-full ${ready ? 'bg-emerald-400' : 'bg-amber-400'}`} />
  )
}
