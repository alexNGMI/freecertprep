import { Link } from 'react-router-dom'
import BrandedName from '../components/BrandedName'
import { PageEyebrow, PageTitle } from '../components/ui/surface'
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
        <PageTitle className="mt-3">Lets talk about Privacy</PageTitle>
        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-zinc-600">Effective June 24, 2026</p>

        <article className="mt-10 max-w-3xl space-y-6 text-base leading-8 text-zinc-300 md:text-lg md:leading-9">
          <p>
            We do not want a study product that requires people to hand over data before they can learn. Core studying on freecertprep works without an account, and account features are optional.
          </p>
          <p>
            When you study anonymously, your quiz history, exam history, Smart Practice statistics, bookmarks, and local report backups stay in the browser you use. They are not uploaded to freecertprep unless you deliberately use an account feature that says it sends data. Local data remains in that browser until you export it, clear browser storage, switch browsers or devices, or use an account sync feature.
          </p>
          <p>
            If you create an account, the freecertprep account system stores your email address and sign-in metadata so passwordless sign-in can work. If you choose Sync now, your local progress, question statistics, and bookmark changes are combined with the newest cloud snapshot. Recovery backup saves an explicit snapshot, and restore downloads the newest snapshot into the current browser.
          </p>
          <p>
            Signed-in question reports store the certification, question ID, category, message, report status, and your account identifier. If your account is deleted, a report may remain so we can preserve content integrity, but its reporter link is removed.
          </p>
          <p>
            freecertprep uses trusted hosting, security, authentication, and database providers to operate the website and optional account features. Those services may process ordinary request, sign-in, and storage information needed to deliver and protect the product. They are used to operate freecertprep, not to build an advertising profile.
          </p>
          <p>
            You can export local progress without signing in. Signed-in users can download a complete account-data export or permanently delete their account from the Account page. Account deletion removes account-owned profile, subscription, snapshot, statistics, bookmark, and session rows through database relationships. Cloud data remains until you delete the account or it is removed through normal service administration. Row-level security limits account data to the signed-in user, and administrator report access uses a separate database-enforced role.
          </p>
          <p>
            freecertprep does not sell personal information and currently does not run advertising or third-party behavioral analytics. Certification providers do not receive your study history from freecertprep.
          </p>
        </article>
      </main>
    </div>
  )
}
