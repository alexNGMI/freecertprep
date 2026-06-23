import { createElement, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  CheckCircle2,
  Cloud,
  Database,
  Download,
  KeyRound,
  Mail,
  RefreshCw,
  ShieldCheck,
  Upload,
} from 'lucide-react'
import BrandedName from '../components/BrandedName'
import { Button } from '../components/ui/button'
import { PageEyebrow, PageLead, PageTitle, Surface } from '../components/ui/surface'
import { exportProgress, exportQuestionIssueReports, readQuestionIssueReports } from '../utils/storage'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { backupStudyData, restoreLatestStudyData } from '../lib/accountSync'

export default function Account() {
  const [email, setEmail] = useState('')
  const [notice, setNotice] = useState(null)
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured)
  const [submitting, setSubmitting] = useState(false)
  const reports = useMemo(() => readQuestionIssueReports(), [])

  useDocumentMeta({
    title: 'Account and Sync',
    description: 'Optional freecertprep account, progress sync, and question issue reporting status.',
    path: '/account',
  })

  useEffect(() => {
    if (!supabase) {
      return undefined
    }

    let active = true

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return
      if (error) {
        setNotice({ kind: 'error', message: error.message })
      } else {
        setSession(data.session)
      }
      setAuthLoading(false)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!active) return
      setSession(nextSession)
      setAuthLoading(false)
      if (event === 'SIGNED_IN' && nextSession) {
        setNotice({ kind: 'success', message: 'You are signed in. Your account is ready for progress sync.' })
      }
    })

    return () => {
      active = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  async function handleSignIn(event) {
    event.preventDefault()
    if (!supabase) {
      setNotice({
        kind: 'info',
        message: 'Account sign-in needs the Supabase project URL and publishable key.',
      })
      return
    }

    setSubmitting(true)
    setNotice(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/account`,
        shouldCreateUser: true,
      },
    })
    setSubmitting(false)

    if (error) {
      setNotice({ kind: 'error', message: error.message })
      return
    }

    setNotice({ kind: 'success', message: `Check ${email} for your secure sign-in link.` })
  }

  async function handleSignOut() {
    if (!supabase) return
    setSubmitting(true)
    const { error } = await supabase.auth.signOut()
    setSubmitting(false)

    if (error) {
      setNotice({ kind: 'error', message: error.message })
      return
    }

    setSession(null)
    setNotice({ kind: 'info', message: 'You are signed out. Local study progress remains on this device.' })
  }

  async function handleBackup() {
    setSubmitting(true)
    try {
      await backupStudyData()
      setNotice({ kind: 'success', message: 'Your current progress is backed up to your account.' })
    } catch (error) {
      setNotice({ kind: 'error', message: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleRestore() {
    setSubmitting(true)
    try {
      const createdAt = await restoreLatestStudyData()
      setNotice({
        kind: createdAt ? 'success' : 'info',
        message: createdAt
          ? 'Your latest account backup was restored. Refresh study pages to see it.'
          : 'No account backup exists yet.',
      })
    } catch (error) {
      setNotice({ kind: 'error', message: error.message })
    } finally {
      setSubmitting(false)
    }
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
                <PageEyebrow>Optional account layer</PageEyebrow>
                <PageTitle className="mt-3">
                  Keep studying locally. Sync when you want.
                </PageTitle>
                <PageLead className="mt-5">
                  Accounts are for durability, cross-device progress, and issue-report follow-up. The practice engine stays usable without signing in.
                </PageLead>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                <StatusPill ready={isSupabaseConfigured} />
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {isSupabaseConfigured
                    ? 'Supabase is connected. Email sign-in is available.'
                    : 'Waiting on Supabase environment variables before live sign-in is enabled.'}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <ReadinessCard icon={ShieldCheck} title="Anonymous access" body="All study modes keep working without an account." ready />
              <ReadinessCard icon={Cloud} title="Progress sync" body="Prepared for signed-in study snapshots and question stats." ready={isSupabaseConfigured} />
              <ReadinessCard icon={AlertCircle} title="Issue reports" body="Local reports already export as JSON and map to the backend table." ready />
            </div>
          </Surface>

          <Surface className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 text-sky-300">
              <Mail className="h-6 w-6" />
            </div>
            {authLoading ? (
              <>
                <h2 className="mt-5 text-2xl font-black text-zinc-50">Checking your account</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">Confirming whether this browser is already signed in.</p>
              </>
            ) : session ? (
              <>
                <h2 className="mt-5 text-2xl font-black text-zinc-50">You are signed in</h2>
                <p className="mt-2 break-all text-sm leading-relaxed text-zinc-400">{session.user.email}</p>
                <div className="mt-5 grid gap-3">
                  <Button variant="accent" accentColor="#38bdf8" onClick={handleBackup} disabled={submitting}>
                    <Upload className="h-4 w-4" />
                    Back up progress
                  </Button>
                  <Button variant="secondary" onClick={handleRestore} disabled={submitting}>
                    <RefreshCw className="h-4 w-4" />
                    Restore latest backup
                  </Button>
                </div>
                <Button className="mt-5 w-full" variant="secondary" onClick={handleSignOut} disabled={submitting}>
                  <KeyRound className="h-4 w-4" />
                  {submitting ? 'Signing out...' : 'Sign out'}
                </Button>
              </>
            ) : (
              <>
                <h2 className="mt-5 text-2xl font-black text-zinc-50">Sign in with email</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  We will email you a secure link. No password needed.
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
                  <Button type="submit" variant="accent" accentColor="#38bdf8" className="w-full" disabled={submitting}>
                    <KeyRound className="h-4 w-4" />
                    {submitting ? 'Sending...' : 'Send magic link'}
                  </Button>
                </form>
              </>
            )}
            {notice && (
              <p className={`mt-4 rounded-xl border px-4 py-3 text-sm font-semibold ${
                notice.kind === 'success'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                  : notice.kind === 'error'
                    ? 'border-red-500/30 bg-red-500/10 text-red-200'
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
            <h2 className="mt-4 text-xl font-black text-zinc-50">Authentication status</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Email sign-in is connected for local and production builds. Approved return URLs are managed in Supabase Authentication settings.
            </p>
            <div className="mt-5 rounded-xl border border-white/10 bg-zinc-900/60 p-3 text-xs font-semibold text-zinc-500">
              Required: <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_PUBLISHABLE_KEY</code>
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
