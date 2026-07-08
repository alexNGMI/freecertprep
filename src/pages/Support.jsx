import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { BookOpenCheck, CircleHelp, FileWarning, LockKeyhole, Mail } from 'lucide-react'
import { SiteFooter, SiteHeader } from '../components/SiteChrome'
import { Button } from '../components/ui/button'
import { PageEyebrow, PageLead, PageTitle, Surface } from '../components/ui/surface'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { supportEmail, supportMailto } from '../config/contact'

export default function Support() {
  useDocumentMeta({
    title: 'Support',
    description: 'Get help with freecertprep accounts, study progress, question content, and privacy controls.',
    path: '/support',
  })

  return (
    <div className="theme-page min-h-screen text-slate-950">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <PageEyebrow className="text-teal-700">Help and contact</PageEyebrow>
        <PageTitle className="mt-3 text-slate-950">Get unstuck without sending sensitive information.</PageTitle>
        <PageLead className="mt-5 text-slate-700">
          Use the path that matches the problem. Question-content reports stay attached to the exact question; account and technical issues can go to support.
        </PageLead>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <Surface className="border-slate-900/10 bg-white p-6 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.45)] md:p-7">
            <Mail className="h-6 w-6 text-sky-600" />
            <h2 className="mt-4 text-2xl font-black text-slate-950">Account or technical help</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Include the page you were using, what you expected, what happened, and the browser or device type. Never send passwords, magic-link codes, or payment information.
            </p>
            {supportMailto ? (
              <Button as="a" href={supportMailto} variant="accent" accentColor="#38bdf8" className="mt-6">
                <Mail className="h-4 w-4" />
                Email {supportEmail}
              </Button>
            ) : (
              <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3">
                <p className="text-sm font-bold text-amber-900">Direct email support is not available right now.</p>
                <p className="mt-1 text-xs leading-relaxed text-amber-800">
                  No support inbox is being monitored. Use Report issue for question problems, and use the account page for sign-in, export, restore, or deletion controls.
                </p>
              </div>
            )}
          </Surface>

          <Surface className="border-slate-900/10 bg-white p-6 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.45)] md:p-7">
            <FileWarning className="h-6 w-6 text-amber-600" />
            <h2 className="mt-4 text-2xl font-black text-slate-950">Question looks wrong</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Open that question in practice or review mode and select <strong className="text-slate-900">Report issue</strong>. Signed-in reports enter the review queue; signed-out reports stay on that device for export.
            </p>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">
              Best for wrong answers, outdated facts, unclear explanations, and wording problems
            </p>
          </Surface>

          <SupportLink
            icon={BookOpenCheck}
            title="How the study tools work"
            body="Read the learner guide for diagnostics, study plans, practice modes, results, sync, and recovery."
            to="/docs"
            label="Open learner docs"
          />
          <SupportLink
            icon={LockKeyhole}
            title="Account and data controls"
            body="Sign in, sync progress, export account data, restore a recovery snapshot, or delete the account."
            to="/account"
            label="Open account controls"
          />
        </section>

        <Surface className="mt-6 border-slate-900/10 bg-white p-6 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.45)] md:p-7">
          <div className="flex gap-4">
            <CircleHelp className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
            <div>
              <h2 className="text-xl font-black text-slate-950">What support cannot do</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                freecertprep cannot access certification-provider accounts, schedule exams, issue refunds for third-party courses, or guarantee an exam result. It can help with this site and review reported content.
              </p>
            </div>
          </div>
        </Surface>
      </main>
      <SiteFooter />
    </div>
  )
}

function SupportLink({ icon: Icon, title, body, to, label }) {
  return (
    <Surface className="border-slate-900/10 bg-white p-6 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.45)] md:p-7">
      {createElement(Icon, { className: 'h-6 w-6 text-emerald-600' })}
      <h2 className="mt-4 text-xl font-black text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
      <Button as={Link} to={to} variant="secondary" className="mt-5">
        {label}
      </Button>
    </Surface>
  )
}
