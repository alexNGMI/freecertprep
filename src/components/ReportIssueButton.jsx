import { useState } from 'react'
import { AlertCircle, Download, X } from 'lucide-react'
import { addQuestionIssueReport, exportQuestionIssueReports } from '../utils/storage'
import { Button } from './ui/button'

const ISSUE_TYPES = [
  'Answer seems wrong',
  'Explanation is unclear',
  'Typo or wording issue',
  'Not exam-like',
  'Outdated content',
]

export default function ReportIssueButton({ certId, question, context = 'question' }) {
  const [open, setOpen] = useState(false)
  const [issueType, setIssueType] = useState(ISSUE_TYPES[0])
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState(null)

  function handleSubmit() {
    const saved = addQuestionIssueReport({
      certId: certId || 'unknown-cert',
      questionId: question.id,
      domain: question.domain,
      objectiveId: question.objectiveId || null,
      questionType: question.type || 'single-choice',
      issueType,
      notes: notes.trim(),
      context,
    })

    setStatus(saved ? 'saved' : 'error')
    if (saved) setNotes('')
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setStatus(null)
          setOpen(true)
        }}
        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-950/40 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 transition hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-200"
      >
        <AlertCircle className="h-3.5 w-3.5" />
        Report issue
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby={`report-${question.id}`}>
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Local report</p>
                <h2 id={`report-${question.id}`} className="mt-2 text-2xl font-black text-zinc-50">Flag this question</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  This saves a local report in your browser for now. Later this same flow can send reports to the review queue.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close report issue"
                className="rounded-lg border border-white/10 p-2 text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500" htmlFor={`issue-type-${question.id}`}>
                  Issue type
                </label>
                <select
                  id={`issue-type-${question.id}`}
                  value={issueType}
                  onChange={(event) => setIssueType(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400/50"
                >
                  {ISSUE_TYPES.map((type) => <option key={type}>{type}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500" htmlFor={`issue-notes-${question.id}`}>
                  Notes
                </label>
                <textarea
                  id={`issue-notes-${question.id}`}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={4}
                  placeholder="What should be reviewed?"
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm leading-relaxed text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-400/50"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-3 text-xs leading-relaxed text-zinc-500">
                Saved with cert, question ID, domain, objective, type, issue category, notes, and timestamp.
              </div>

              {status && (
                <p className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                  status === 'saved'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                    : 'border-rose-500/30 bg-rose-500/10 text-rose-200'
                }`}>
                  {status === 'saved' ? 'Report saved locally.' : 'Could not save this report in browser storage.'}
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variant="secondary" onClick={() => exportQuestionIssueReports()}>
                  <Download className="h-4 w-4" />
                  Export reports
                </Button>
                <Button type="button" variant="accent" accentColor="#f59e0b" onClick={handleSubmit}>
                  Save report
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
