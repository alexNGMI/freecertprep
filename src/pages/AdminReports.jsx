import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileSearch,
  KeyRound,
  RefreshCw,
  ShieldX,
} from 'lucide-react'
import BrandedName from '../components/BrandedName'
import LoadingState from '../components/LoadingState'
import { Button } from '../components/ui/button'
import { PageEyebrow, PageTitle, Surface } from '../components/ui/surface'
import {
  ACTIONABLE_ADMIN_REPORT_STATUSES,
  ADMIN_REPORT_STATUSES,
  getAdminReportStatus,
} from '../config/adminReportStatuses'
import { getCert } from '../data/certs'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import {
  getAdminAccess,
  listCorrectionEvents,
  listIssueReports,
  REPORT_CATEGORIES,
  reviewIssueReport,
} from '../lib/adminReports'
import { supabase } from '../lib/supabase'
import { cn } from '../utils/cn'

export default function AdminReports() {
  const [access, setAccess] = useState(null)
  const [reports, setReports] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [events, setEvents] = useState([])
  const [question, setQuestion] = useState(null)
  const [filters, setFilters] = useState({ status: 'open', category: 'all', certId: '' })
  const [certQuery, setCertQuery] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [pendingStatus, setPendingStatus] = useState(null)
  const [notice, setNotice] = useState(null)

  useDocumentMeta({
    title: 'Admin Report Review',
    description: 'Private freecertprep question-report review workspace.',
    path: '/admin/reports',
  })

  const selected = useMemo(
    () => reports.find(report => report.id === selectedId) || reports[0] || null,
    [reports, selectedId],
  )

  const refreshReports = useCallback(async () => {
    setLoading(true)
    setNotice(null)
    try {
      const nextReports = await listIssueReports(filters)
      setReports(nextReports)
      setSelectedId(current => (
        nextReports.some(report => report.id === current) ? current : nextReports[0]?.id || null
      ))
    } catch {
      setNotice({ kind: 'error', message: 'Reports could not be loaded. Try again.' })
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    let active = true

    async function checkAccess() {
      try {
        const result = await getAdminAccess()
        if (active) setAccess(result)
      } catch {
        if (active) {
          setAccess({ configured: true, signedIn: true, isAdmin: false, accessError: true })
          setNotice(null)
        }
      }
    }

    checkAccess()
    if (!supabase) return () => { active = false }

    const { data } = supabase.auth.onAuthStateChange(() => checkAccess())
    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (access?.isAdmin) refreshReports()
  }, [access?.isAdmin, refreshReports])

  useEffect(() => {
    if (!selected) {
      setEvents([])
      setQuestion(null)
      return
    }

    let active = true
    Promise.all([
      listCorrectionEvents(selected.id),
      loadQuestion(selected.cert_id, selected.question_id),
    ]).then(([nextEvents, nextQuestion]) => {
      if (!active) return
      setEvents(nextEvents)
      setQuestion(nextQuestion)
    }).catch(() => {
      if (active) setNotice({ kind: 'error', message: 'Report details could not be loaded. Try again.' })
    })

    return () => { active = false }
  }, [selected])

  async function handleSignIn(event) {
    event.preventDefault()
    setLoading(true)
    setNotice(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/reports`,
        shouldCreateUser: false,
      },
    })
    setLoading(false)
    setNotice(error
      ? { kind: 'error', message: error.message }
      : { kind: 'success', message: `Check ${email} for the administrator sign-in link.` })
  }

  async function handleReview(status) {
    if (!selected) return
    setPendingStatus(status)
    setNotice(null)
    try {
      await reviewIssueReport(selected.id, status, note)
      setNote('')
      await refreshReports()
      setNotice({ kind: 'success', message: `Report marked ${getAdminReportStatus(status).label.toLowerCase()}.` })
    } catch {
      setNotice({ kind: 'error', message: 'The report could not be updated. Try again.' })
    } finally {
      setPendingStatus(null)
    }
  }

  if (!access) return <LoadingState label="Checking administrator access" fullScreen />
  if (!access.configured) return <AccessMessage title="Admin service unavailable" body="Supabase is not configured in this build." />
  if (!access.signedIn) {
    return (
      <AccessShell>
        <Surface className="mx-auto max-w-md p-7">
          <KeyRound className="h-7 w-7 text-sky-300" />
          <h1 className="mt-5 text-2xl font-black text-zinc-50">Administrator sign in</h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Use the email attached to an approved administrator account.
          </p>
          <form className="mt-6 space-y-3" onSubmit={handleSignIn}>
            <label htmlFor="admin-email" className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-sky-400/50"
            />
            <Button type="submit" variant="accent" accentColor="#38bdf8" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send admin sign-in link'}
            </Button>
          </form>
          <Notice notice={notice} />
        </Surface>
      </AccessShell>
    )
  }
  if (!access.isAdmin) {
    if (access.accessError) {
      return (
        <AccessMessage
          title="Admin setup needs attention"
          body="The administrator access check is temporarily unavailable. Try again later or contact the site administrator."
        />
      )
    }
    return <AccessMessage title="Administrator access required" body="This signed-in account is not authorized to review learner reports." />
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-8">
          <Link to="/" className="hover:opacity-80"><BrandedName /></Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-bold uppercase tracking-wider text-emerald-300 sm:inline">Admin verified</span>
            <Button as={Link} to="/account" variant="ghost" size="sm">Account</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-5 py-8 md:px-8">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <PageEyebrow>Private operations</PageEyebrow>
            <PageTitle className="mt-2 text-4xl md:text-5xl">Question report review</PageTitle>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
              Review learner-submitted content concerns, inspect the reported question, and record every decision.
            </p>
          </div>
          <Button variant="secondary" onClick={refreshReports} disabled={loading}>
            <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
            Refresh queue
          </Button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-[180px_220px_minmax(220px,1fr)_auto]">
          <FilterSelect
            label="Status"
            value={filters.status}
            onChange={value => setFilters(current => ({ ...current, status: value }))}
            options={['all', ...ADMIN_REPORT_STATUSES]}
          />
          <FilterSelect
            label="Category"
            value={filters.category}
            onChange={value => setFilters(current => ({ ...current, category: value }))}
            options={['all', ...REPORT_CATEGORIES]}
          />
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Certification ID</span>
            <input
              value={certQuery}
              onChange={event => setCertQuery(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  setFilters(current => ({ ...current, certId: certQuery }))
                }
              }}
              placeholder="Filter by cert"
              className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none focus:border-sky-400/50"
            />
          </label>
          <Button
            className="self-end"
            variant="secondary"
            onClick={() => setFilters(current => ({ ...current, certId: certQuery }))}
          >
            Apply
          </Button>
        </div>

        <Notice notice={notice} />

        <div className="mt-6 grid min-h-[640px] gap-5 xl:grid-cols-[390px_minmax(0,1fr)]">
          <Surface className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Queue</p>
                <p className="mt-1 font-black text-zinc-100">{reports.length} report{reports.length === 1 ? '' : 's'}</p>
              </div>
              <FileSearch className="h-5 w-5 text-zinc-500" />
            </div>
            <div className="max-h-[720px] overflow-y-auto">
              {loading ? (
                <LoadingState label="Loading reports" />
              ) : reports.length ? reports.map(report => (
                <button
                  key={report.id}
                  type="button"
                  onClick={() => setSelectedId(report.id)}
                  className={cn(
                    'w-full border-b border-white/5 px-5 py-4 text-left transition hover:bg-white/[0.04]',
                    selected?.id === report.id && 'bg-white/[0.06]',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <StatusBadge status={report.status} />
                    <span className="text-xs text-zinc-600">{formatDate(report.created_at)}</span>
                  </div>
                  <p className="mt-3 truncate text-sm font-black text-zinc-100">{report.cert_id}</p>
                  <p className="mt-1 truncate text-xs text-zinc-500">{report.question_id}</p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">{report.message}</p>
                </button>
              )) : (
                <div className="p-8 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-300" />
                  <p className="mt-4 font-bold text-zinc-200">No reports match these filters.</p>
                </div>
              )}
            </div>
          </Surface>

          {selected ? (
            <ReportDetail
              report={selected}
              question={question}
              events={events}
              note={note}
              onNoteChange={setNote}
              pendingStatus={pendingStatus}
              onReview={handleReview}
            />
          ) : (
            <Surface className="flex items-center justify-center p-10 text-center">
              <div>
                <FileSearch className="mx-auto h-10 w-10 text-zinc-600" />
                <p className="mt-4 font-bold text-zinc-300">Select a report to begin review.</p>
              </div>
            </Surface>
          )}
        </div>
      </main>
    </div>
  )
}

function ReportDetail({ report, question, events, note, onNoteChange, pendingStatus, onReview }) {
  return (
    <Surface className="p-6 md:p-8">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={report.status} />
            <span className="rounded-lg border border-white/10 px-2.5 py-1 text-xs font-bold text-zinc-400">
              {formatCategory(report.category)}
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-black text-zinc-50">{report.cert_id}</h2>
          <p className="mt-1 font-mono text-xs text-zinc-500">{report.question_id}</p>
        </div>
        <p className="text-xs text-zinc-500">Submitted {formatDateTime(report.created_at)}</p>
      </div>

      <section className="py-6">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Learner report</p>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">{report.message}</p>
      </section>

      <section className="border-t border-white/10 py-6">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Reported question</p>
        {question ? (
          <div className="mt-4 space-y-4">
            <p className="text-base font-bold leading-relaxed text-zinc-100">{question.question}</p>
            <div className="grid gap-2">
              {question.choices?.map((choice, index) => (
                <div
                  key={`${choice}-${index}`}
                  className={cn(
                    'rounded-xl border px-4 py-3 text-sm',
                    isCorrectChoice(question, index)
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
                      : 'border-white/10 bg-zinc-900/60 text-zinc-400',
                  )}
                >
                  <span className="mr-2 font-black">{String.fromCharCode(65 + index)}.</span>
                  {choice}
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Current explanation</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">{question.explanation}</p>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">The question could not be found in the current local bank.</p>
        )}
      </section>

      <section className="border-t border-white/10 py-6">
        <label htmlFor="admin-note" className="text-xs font-bold uppercase tracking-wider text-zinc-500">Internal note</label>
        <textarea
          id="admin-note"
          rows={4}
          maxLength={4000}
          value={note}
          onChange={event => onNoteChange(event.target.value)}
          placeholder="What did you verify or change?"
          className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm leading-relaxed text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-sky-400/50"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {ACTIONABLE_ADMIN_REPORT_STATUSES.map(status => (
            <Button
              key={status}
              variant={status === 'fixed' ? 'accent' : status === 'rejected' ? 'danger' : 'secondary'}
              accentColor={status === 'fixed' ? '#34d399' : undefined}
              onClick={() => onReview(status)}
              disabled={Boolean(pendingStatus)}
            >
              {pendingStatus === status ? 'Saving...' : `Mark ${getAdminReportStatus(status).label}`}
            </Button>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 pt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Correction history</p>
        <div className="mt-4 space-y-3">
          {events.length ? events.map(event => (
            <div key={event.id} className="flex gap-3 rounded-xl border border-white/10 bg-zinc-900/50 p-4">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
              <div>
                <p className="text-sm font-bold text-zinc-200">{formatCategory(event.status)}</p>
                {event.editor_note && <p className="mt-1 text-sm leading-relaxed text-zinc-400">{event.editor_note}</p>}
                <p className="mt-2 text-xs text-zinc-600">{formatDateTime(event.created_at)}</p>
              </div>
            </div>
          )) : <p className="text-sm text-zinc-600">No review decisions recorded yet.</p>}
        </div>
      </section>
    </Surface>
  )
}

function AccessShell({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-200">
          <ArrowLeft className="h-4 w-4" />
          Return home
        </Link>
        <div className="mt-12">{children}</div>
      </div>
    </div>
  )
}

function AccessMessage({ title, body }) {
  return (
    <AccessShell>
      <Surface className="mx-auto max-w-lg p-8 text-center">
        <ShieldX className="mx-auto h-10 w-10 text-rose-300" />
        <h1 className="mt-5 text-2xl font-black text-zinc-50">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{body}</p>
        <Button as={Link} to="/account" variant="secondary" className="mt-6">Open account</Button>
      </Surface>
    </AccessShell>
  )
}

function Notice({ notice }) {
  if (!notice) return null
  return (
    <p
      role={notice.kind === 'error' ? 'alert' : 'status'}
      className={cn(
        'mt-5 rounded-xl border px-4 py-3 text-sm font-semibold',
        notice.kind === 'error'
          ? 'border-rose-500/30 bg-rose-500/10 text-rose-200'
          : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
      )}
    >
      {notice.message}
    </p>
  )
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</span>
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none focus:border-sky-400/50"
      >
        {options.map(option => <option key={option} value={option}>{formatCategory(option)}</option>)}
      </select>
    </label>
  )
}

function StatusBadge({ status }) {
  const meta = getAdminReportStatus(status)
  return <span className={cn('rounded-lg border px-2.5 py-1 text-xs font-bold', meta.color)}>{meta.label}</span>
}

async function loadQuestion(certId, questionId) {
  const cert = getCert(certId)
  if (!cert) return null
  const loaded = await cert.loadQuestions()
  const questions = loaded.default ?? loaded
  return questions.find(item => item.id === questionId) || null
}

function isCorrectChoice(question, index) {
  if (Array.isArray(question.correctAnswer)) return question.correctAnswer.includes(index)
  return question.correctAnswer === index
}

function formatCategory(value) {
  return String(value || '')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, character => character.toUpperCase())
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(value))
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}
