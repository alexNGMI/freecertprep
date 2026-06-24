import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { Cloud, Database, FileWarning, HardDrive, Mail, ShieldCheck } from 'lucide-react'
import BrandedName from '../components/BrandedName'
import { PageEyebrow, PageLead, PageTitle, Surface } from '../components/ui/surface'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Privacy() {
  useDocumentMeta({
    title: 'Privacy',
    description: 'How freecertprep stores local study data and optional account information.',
    path: '/privacy',
  })

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-white/5 bg-zinc-950/85">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/"><BrandedName /></Link>
          <Link to="/account" className="text-sm font-bold text-zinc-400 hover:text-zinc-100">Account</Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <PageEyebrow>Privacy and data controls</PageEyebrow>
        <PageTitle className="mt-3">Study without an account. Control your account data.</PageTitle>
        <PageLead className="mt-5">
          freecertprep is local-first. An optional email account adds manual cloud backup and durable question reporting, but it is not required for studying.
        </PageLead>
        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-zinc-600">Effective June 24, 2026</p>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <PrivacyCard icon={HardDrive} title="Anonymous study">
            Quiz history, exam history, Smart Practice statistics, bookmarks, and local report backups are stored in your browser. They are not uploaded unless you explicitly use an account feature that says it sends data.
          </PrivacyCard>
          <PrivacyCard icon={Mail} title="Optional account">
            Supabase Auth stores your email address and sign-in metadata so passwordless sign-in works. Signing in is not consent to product or marketing email.
          </PrivacyCard>
          <PrivacyCard icon={Cloud} title="Manual cloud backup">
            When you choose Back up this device, progress, question statistics, and bookmarks are saved as a cloud snapshot associated with your account. Restore downloads the newest snapshot into the current browser.
          </PrivacyCard>
          <PrivacyCard icon={FileWarning} title="Question reports">
            Signed-in reports store the certification, question ID, category, message, status, and your account identifier. If the account is deleted, the report may remain for content integrity but its reporter link is removed.
          </PrivacyCard>
        </section>

        <section className="mt-8 space-y-5">
          <PolicySection title="Service providers" icon={Database}>
            Cloudflare serves the website and may process ordinary request information needed to deliver and protect it. Supabase provides authentication and database storage for optional accounts. Certification providers do not receive your study history from freecertprep.
          </PolicySection>
          <PolicySection title="Your controls" icon={ShieldCheck}>
            You can export local progress without signing in. Signed-in users can download a complete account-data export or permanently delete their account from the Account page. Deleting an account removes account-owned profile, subscription, snapshot, statistics, bookmark, and session rows through database relationships.
          </PolicySection>
          <PolicySection title="Retention and security" icon={Cloud}>
            Local data remains until you clear browser storage. Cloud data remains until you delete the account or it is removed through normal service administration. Row-level security limits account data to the signed-in user, and administrator report access uses a separate database-enforced role.
          </PolicySection>
        </section>

        <Surface className="mt-8 p-6">
          <h2 className="text-xl font-black text-zinc-50">Important limits</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Do not submit passwords, payment information, government identifiers, health information, or other sensitive personal details in question reports. freecertprep does not sell personal information and currently does not run advertising or third-party behavioral analytics.
          </p>
        </Surface>
      </main>
    </div>
  )
}

function PrivacyCard({ icon: Icon, title, children }) {
  return (
    <Surface className="p-6">
      {createElement(Icon, { className: 'h-6 w-6 text-sky-300' })}
      <h2 className="mt-4 text-xl font-black text-zinc-50">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{children}</p>
    </Surface>
  )
}

function PolicySection({ icon: Icon, title, children }) {
  return (
    <Surface className="p-6 md:p-7">
      <div className="flex gap-4">
        {createElement(Icon, { className: 'mt-1 h-5 w-5 shrink-0 text-zinc-500' })}
        <div>
          <h2 className="text-xl font-black text-zinc-50">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{children}</p>
        </div>
      </div>
    </Surface>
  )
}
