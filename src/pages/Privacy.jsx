import { Link } from 'react-router-dom'
import BrandedName from '../components/BrandedName'
import { PageEyebrow, PageLead, PageTitle } from '../components/ui/surface'
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
          <nav className="flex items-center gap-5 text-sm font-bold text-zinc-400">
            <Link to="/support" className="hover:text-zinc-100">Support</Link>
            <Link to="/account" className="hover:text-zinc-100">Account</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <PageEyebrow>Privacy and data controls</PageEyebrow>
        <PageTitle className="mt-3">Privacy at freecertprep.</PageTitle>
        <PageLead className="mt-5">
          freecertprep is built as a local-first study tool. You can practice without creating an account. When you choose to sign in, the account exists to help you sync progress, recover study data, and submit durable question reports.
        </PageLead>
        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-zinc-600">Effective June 24, 2026</p>

        <section className="mt-10 border-y border-white/10 py-8">
          <h2 className="text-2xl font-black text-zinc-50">Our position</h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-300">
            <p>
              We do not want a study product that requires people to hand over data before they can learn. Core studying on freecertprep works without an account, and account features are optional.
            </p>
            <p>
              Local quiz history, exam history, Smart Practice statistics, bookmarks, and local report backups stay in the browser you use. They are not uploaded to freecertprep unless you deliberately use an account feature that says it sends data.
            </p>
            <p>
              We do not sell personal information. We do not currently run advertising or third-party behavioral analytics. Certification providers do not receive your study history from freecertprep.
            </p>
          </div>
        </section>

        <section className="mt-10 space-y-10">
          <PolicySection title="What stays local">
            Anonymous study data is stored in your browser. This includes practice history, full exam attempts, Smart Practice statistics, bookmarks, and local backups of question reports. Local data remains there until you export it, clear browser storage, switch browsers/devices, or use an account sync feature.
          </PolicySection>

          <PolicySection title="What an optional account stores">
            The freecertprep account system stores your email address and sign-in metadata so passwordless sign-in can work. If you choose Sync now, local progress, question statistics, and bookmark changes are combined with the newest cloud snapshot. Recovery backup saves an explicit snapshot, and restore downloads the newest snapshot into the current browser.
          </PolicySection>

          <PolicySection title="Question reports">
            Signed-in question reports store the certification, question ID, category, message, report status, and your account identifier. If your account is deleted, a report may remain so we can preserve content integrity, but its reporter link is removed.
          </PolicySection>

          <PolicySection title="Service providers">
            freecertprep uses trusted hosting, security, authentication, and database providers to operate the website and optional account features. Those services may process ordinary request, sign-in, and storage information needed to deliver and protect the product. They are used to operate freecertprep, not to build an advertising profile.
          </PolicySection>

          <PolicySection title="Your controls">
            You can export local progress without signing in. Signed-in users can download a complete account-data export or permanently delete their account from the Account page. Account deletion removes account-owned profile, subscription, snapshot, statistics, bookmark, and session rows through database relationships.
          </PolicySection>

          <PolicySection title="Retention and security">
            Local data remains until browser storage is cleared. Cloud data remains until you delete the account or it is removed through normal service administration. Row-level security limits account data to the signed-in user, and administrator report access uses a separate database-enforced role.
          </PolicySection>
        </section>

        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-black text-zinc-50">Important limits</h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-300">
            Do not submit passwords, payment information, government identifiers, health information, or other sensitive personal details in question reports. freecertprep does not sell personal information and currently does not run advertising or third-party behavioral analytics.
          </p>
        </section>
      </main>
    </div>
  )
}

function PolicySection({ title, children }) {
  return (
    <section className="grid gap-3 border-t border-white/10 pt-6 md:grid-cols-[13rem,1fr]">
      <h2 className="text-lg font-black text-zinc-50">{title}</h2>
      <p className="text-base leading-relaxed text-zinc-300">{children}</p>
    </section>
  )
}
