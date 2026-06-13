import { useState } from 'react'
import { Link } from 'react-router-dom'
import BrandedName from '../components/BrandedName'
import { getAllCerts } from '../data/certs'
import { isCertLive } from '../data/catalogVisibility'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

// Single source of truth for catalog-wide stats shown in the docs.
// Re-reads at import time so these stay in sync with certs.js without manual edits.
const PUBLISHED_CERTS = getAllCerts()
const LIVE_CERTS = PUBLISHED_CERTS.filter((cert) => isCertLive(cert.id))
const TOTAL_QUESTIONS = PUBLISHED_CERTS.reduce((s, c) => s + c.questionCount, 0)

const NAV = [
  { id: 'overview',       label: 'Overview' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'video-playlists', label: 'Video Playlists' },
  { id: 'study-modes',    label: 'Study Modes' },
  { id: 'smart-practice', label: 'Smart Practice' },
  { id: 'question-types', label: 'Question Types' },
  { id: 'progress',       label: 'Progress & Bookmarks' },
  { id: 'architecture',   label: 'Architecture' },
  { id: 'roadmap',        label: 'Roadmap' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-6 pb-16 border-b border-white/5 last:border-0">
      <h2 className="text-2xl font-bold text-zinc-100">{title}</h2>
      <div className="space-y-5 text-zinc-400 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

function H3({ children }) {
  return <h3 className="text-lg font-semibold text-zinc-200 mt-8 mb-3">{children}</h3>
}

function P({ children }) {
  return <p className="text-zinc-400 leading-relaxed">{children}</p>
}

function Badge({ color, children }) {
  return (
    <span
      className="inline-block text-[11px] font-bold px-2 py-0.5 rounded border"
      style={{ color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
    >
      {children}
    </span>
  )
}

function Tag({ children }) {
  return (
    <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded bg-zinc-800 border border-white/5 text-zinc-400">
      {children}
    </span>
  )
}

function Callout({ icon, title, children }) {
  return (
    <div className="glass-panel rounded-xl p-5 space-y-2">
      <div className="flex items-center gap-2 text-zinc-300">
        <span>{icon}</span>
        <span className="text-sm font-bold uppercase tracking-widest">{title}</span>
      </div>
      <p className="text-sm text-zinc-500 leading-relaxed">{children}</p>
    </div>
  )
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto glass-panel rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            {headers.map(h => (
              <th key={h} className="text-left px-4 py-3 text-[11px] font-bold text-zinc-600 uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-zinc-400">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CodeBlock({ children }) {
  return (
    <pre className="glass-panel rounded-xl p-5 text-sm text-zinc-400 overflow-x-auto font-mono leading-relaxed">
      {children}
    </pre>
  )
}

export default function Docs() {
  const [activeSection, setActiveSection] = useState('overview')
  useDocumentMeta({
    title: 'Documentation',
    description:
      'How freecertprep works: study modes, the Smart Practice weighted-sampling engine, question types, local-first progress storage, and architecture.',
    path: '/docs',
  })

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-zinc-950/60 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <BrandedName />
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link to="/" className="hover:text-zinc-100 transition-colors">Home</Link>
            <a href="https://github.com/alexNGMI/freecertprep" target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition-colors">GitHub</a>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex gap-12">

        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-28 space-y-1">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4 pl-3">Contents</p>
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => { scrollTo(id); setActiveSection(id) }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  activeSection === id
                    ? 'text-zinc-100 bg-zinc-800/60 font-semibold'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 space-y-0">

          {/* Page title */}
          <div className="mb-14">
            <div className="inline-block text-sm font-medium px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/50 text-zinc-300 mb-4">
              Documentation
            </div>
            <h1 className="text-4xl font-bold text-zinc-100 mb-3">freecertprep</h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Open-source exam prep built for the career changer. The public catalog now leads with the modules that meet the current simulation-readiness bar, while the rest remain visible as Coming Soon during revision.
            </p>
          </div>

          {/* ── Overview ───────────────────────────────────────────────────── */}
          <Section id="overview" title="Overview">
            <P>
              freecertprep was built to address a real gap: entry-level IT certifications — cloud, AI, networking, security — are
              increasingly required by employers, but most high-quality practice tools sit behind $30–50/month subscriptions. The people
              who need them most — career changers, students, and self-funders studying after work — are exactly the ones who can't
              afford them.
            </P>
            <P>
              The live platform currently centers AWS, CompTIA, Splunk, and Terraform. Azure, Google Cloud, CCST, CCNA,
              NVIDIA, Linux+, Server+, and DCCA remain authored but are marked Coming Soon until their simulations and active-release alignment meet the current bar. Every cert is chosen deliberately:
              these are exams where the test-taker is typically paying out of pocket, studying independently, with no employer
              tuition pipeline to lean on. The homepage now focuses on guided career paths so beginners can follow a sequence,
              while experienced learners can use the dedicated catalog page to jump straight to the cert they need.
            </P>
            <P>
              Real Estate is temporarily hidden from public navigation while its source and simulation quality are reworked. The
              existing build remains available for internal review through this documentation only:{' '}
              <Link to="/real-estate" className="text-amber-300 underline underline-offset-4 hover:text-amber-200">
                open the Real Estate review build
              </Link>.
            </P>

            <Callout icon="⚡" color="#a1a1aa" title="Core principles">
              Free forever. No account required. No data leaves your device. Study progress lives in your browser's localStorage and
              stays fully under your control — exportable and importable at any time.
            </Callout>

            <H3>What's included</H3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { n: TOTAL_QUESTIONS.toLocaleString(), label: 'Authored questions across the IT inventory' },
                { n: String(LIVE_CERTS.length), label: 'Certification modules available today' },
                { n: '3', label: 'Study modes: Quiz, Drill, Exam' },
                { n: '10', label: 'Question formats including PBQ-style scenarios' },
              ].map(({ n, label }) => (
                <div key={label} className="glass-panel rounded-xl p-5">
                  <p className="text-3xl font-black text-zinc-100 mb-1">{n}</p>
                  <p className="text-sm text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Certifications ─────────────────────────────────────────────── */}
          <Section id="certifications" title="Certifications">
            <P>
              Each certification has its own question bank, domain structure, exam configuration, and readiness target — all sourced
              from the official exam guides published by the certification providers.
            </P>
            <P>
              The catalog currently exposes 8 live modules. Nine additional IT modules remain in the repository and appear as
              Coming Soon without links. CCNA's preserved bank targets Cisco's future v2.0 release, so it remains Coming Soon
              while v1.1 is the active exam.
            </P>

            <Table
              headers={['Cert', 'Provider', 'Questions', 'Exam Q\'s', 'Time', 'Target']}
              rows={[
                [<Badge color="#f1be32">CLF-C02</Badge>, 'AWS', '731', '65', '90 min', '70%'],
                [<Badge color="#ff9900">SAA-C03</Badge>, 'AWS', '750', '65', '130 min', '72%'],
                [<Badge color="#0078d4">AZ-900</Badge>, 'Microsoft Azure', '600', '40', '45 min', '70%'],
                [<Badge color="#4285f4">CDL</Badge>, 'Google Cloud', '749', '50', '90 min', '70%'],
                [<Badge color="#76b900">NCA-AIIO</Badge>, 'NVIDIA', '336', '50', '60 min', '70%'],
                [<Badge color="#76b900">NCA-GENL</Badge>, 'NVIDIA', '330', '50', '60 min', '70%'],
                [<Badge color="#1d4ed8">100-150</Badge>, 'Cisco', '750', '50', '50 min', '70% practice'],
                [<Badge color="#1d4ed8">200-301</Badge>, 'Cisco', '750', '60', '120 min', '70% practice'],
                [<Badge color="#c8202f">220-1201</Badge>, 'CompTIA', '760', '90', '90 min', '75%'],
                [<Badge color="#c8202f">220-1202</Badge>, 'CompTIA', '760', '90', '90 min', '78%'],
                [<Badge color="#c8202f">N10-009</Badge>, 'CompTIA', '760', '90', '90 min', '80%'],
                [<Badge color="#c8202f">SY0-701</Badge>, 'CompTIA', '760', '90', '90 min', '83%'],
                [<Badge color="#22c55e">SPLK-1001</Badge>, 'Splunk', '750', '60', '60 min', '70% practice'],
                [<Badge color="#c8202f">SK0-005</Badge>, 'CompTIA', '760', '90', '90 min', '83%'],
                [<Badge color="#c8202f">XK0-006</Badge>, 'CompTIA', '750', '90', '90 min', '80%'],
                [<Badge color="#a78bfa">DCCA</Badge>, 'Schneider Electric', '750', '100', '120 min', '70% practice'],
                [<Badge color="#7c3aed">TF 004</Badge>, 'HashiCorp', '647', '57', '60 min', '70% readiness'],
              ]}
            />

            <H3>Scenario-based phrasing</H3>
            <P>
              Real certification exams are heavily scenario-based — they present a business or operational problem and ask you
              to choose the right solution, not just recall a definition. Question banks across the catalog are written to match
              that style, so practice mirrors how the actual exam tests you.
            </P>

            <H3>Domain weighting</H3>
            <P>
              Every cert's Exam Simulator allocates questions proportionally by domain, matching the official exam blueprint. For example,
              the AZ-900 exam assigns 40% of questions to "Azure architecture and services" — our simulator mirrors that exactly using
              a largest-remainder allocation algorithm so no rounding errors distort domain representation.
            </P>
          </Section>

          {/* ── Recommended Video Playlists ───────────────────────────────── */}
          <Section id="video-playlists" title="Recommended Video Playlists">
            <P>
              These playlists are optional study companions for learners who want a structured video course beside the practice
              bank. Use the videos to build the concepts, then use freecertprep to pressure-test recall, troubleshooting, and
              exam-style reasoning.
            </P>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  cert: 'CompTIA A+ Core 1',
                  code: '220-1201',
                  label: 'Professor Messer A+ Core 1 playlist',
                  href: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnnes8ZGI-OBlKEukHCX46N8',
                },
                {
                  cert: 'CompTIA A+ Core 2',
                  code: '220-1202',
                  label: 'Professor Messer A+ Core 2 playlist',
                  href: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnn7PDGQ17m5AYbDRhnW7vOb',
                },
                {
                  cert: 'CompTIA Network+',
                  code: 'N10-009',
                  label: 'Professor Messer Network+ playlist',
                  href: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnl_tQe3kvnmeMid0mjF8Le8',
                },
                {
                  cert: 'CompTIA Security+',
                  code: 'SY0-701',
                  label: 'Professor Messer Security+ playlist',
                  href: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv',
                },
              ].map(({ cert, code, label, href }) => (
                <a
                  key={code}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group glass-panel rounded-xl p-5 block hover:border-zinc-600 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 mb-2">{code}</p>
                      <h3 className="font-bold text-zinc-100 group-hover:text-white transition-colors">{cert}</h3>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-zinc-800 border border-white/5 text-zinc-400">
                      YouTube
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{label}</p>
                </a>
              ))}
            </div>

            <Callout icon="Video" title="How to use these">
              Watch the relevant objective area, then run Smart Practice or a domain-specific quiz for that same exam section.
              The goal is closing the loop with exam-style practice.
            </Callout>
          </Section>

          {/* ── Study Modes ────────────────────────────────────────────────── */}
          <Section id="study-modes" title="Study Modes">
            <P>
              Three modes cover the full study spectrum — from low-pressure topic exploration through targeted timed practice to
              full exam simulation. All three feed the same Smart Practice engine so every session improves the system's model of
              your strengths and weaknesses.
            </P>

            <H3>Practice Quiz</H3>
            <P>
              The default starting point. Each session draws 10 questions from the pool you choose, randomly selected and freshly
              shuffled every time. Three selection modes:
            </P>
            <ul className="space-y-3 mt-4">
              {[
                { label: 'Smart Practice', desc: 'Cross-domain weighted selection — wrong answers surface more frequently. Starts random and becomes more targeted as your history builds. Recommended default.' },
                { label: 'Bookmarked', desc: 'Only questions you have starred during previous sessions. Ideal for targeted review before an exam.' },
                { label: 'Specific Domain', desc: 'Pick a single exam domain to focus on. Useful when the dashboard shows a weak area that needs dedicated work.' },
              ].map(({ label, desc }) => (
                <li key={label} className="flex gap-4 glass-panel rounded-xl p-4">
                  <span className="w-2 h-2 rounded-full bg-zinc-500 mt-2 shrink-0" />
                  <div>
                    <p className="font-semibold text-zinc-200 mb-1">{label}</p>
                    <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <H3>Timed Drill</H3>
            <P>
              10 questions, 10-minute countdown. The drill uses the same Smart Practice weighted pool as the quiz, so it targets
              your weakest areas automatically. The timer is visible at all times and color-shifts from green → amber → rose
              as time runs low. If the timer reaches zero, the session ends automatically and results are recorded. Finishing
              early shows you your exact time.
            </P>
            <P>
              Drills are designed for the day-before-the-exam scenario: pressure-test your knowledge under real time constraints
              without committing to a full simulator run.
            </P>

            <H3>Exam Simulator</H3>
            <P>
              A full-length simulation built to match the structure of the real exam. Question count, time limit, and domain
              distribution are all sourced from the official exam blueprint. Unlike the quiz and drill, the simulator surfaces
              all question types — including ordering and matching — and does not show feedback until you complete the full exam
              and enter review mode.
            </P>
            <P>
              After submission, Review Mode lets you filter by correct and incorrect answers, see the full explanation for every
              question, and understand exactly where you went wrong.
            </P>

            <Callout icon="📊" color="#34d399" title="All modes feed Smart Practice">
              Whether you finish a quiz, a drill, or an exam — every answered question updates your per-question performance history.
              Smart Practice gets more accurate with every session regardless of which mode you use.
            </Callout>
          </Section>

          {/* ── Smart Practice ─────────────────────────────────────────────── */}
          <Section id="smart-practice" title="Smart Practice">
            <P>
              Smart Practice is the intelligence layer that separates freecertprep from a simple flashcard tool. It tracks your
              performance on every individual question and uses that history to prioritise the questions you need to see most.
            </P>

            <H3>How the algorithm works</H3>
            <P>
              Each question is assigned a weight based on your history with it:
            </P>
            <CodeBlock>{`// Weight formula
weight = never seen            → 1.0   (treat as unknown)
weight = 1 - (correct/attempts) → 0.0 to 1.0
         clamped to min 0.05   → mastered questions still appear occasionally

// Examples
answered 5x, correct 0x  → weight 1.0  (always wrong — surfaces most)
answered 5x, correct 3x  → weight 0.4  (improving — surfaces sometimes)
answered 5x, correct 5x  → weight 0.05 (mastered — rarely surfaces)`}
            </CodeBlock>
            <P>
              Selection uses the Efraimidis-Spirakis weighted reservoir sampling algorithm. Each question receives a random key
              scaled by its weight. The 10 questions with the highest keys are selected. This means the selection is always
              probabilistic — you won't see the exact same 10 questions every time — but higher-weight (weaker) questions
              are statistically far more likely to appear.
            </P>
            <CodeBlock>{`// Efraimidis-Spirakis (simplified)
key = random() ** (1 / weight)
// Higher weight → higher expected key → more likely to be selected
// Select top-N by key`}
            </CodeBlock>

            <H3>What gets tracked</H3>
            <P>Per question, per cert, the system stores:</P>
            <CodeBlock>{`{
  "az-900": {
    "az900-142": {
      "attempts": 5,
      "correct":  3,
      "lastSeen": 1712345678   // Unix timestamp
    }
  }
}`}
            </CodeBlock>
            <P>
              Stored in localStorage under the key <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">freecertprep-question-stats-local</code>.
              The <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">-local</code> suffix is intentional — it reserves the migration path for when
              user accounts are added. On first login, local stats can be merged into the user's account without data loss.
            </P>

            <H3>When stats are saved</H3>
            <P>
              Stats are recorded at session end, not per-answer. This avoids mid-session state churn where answering question 3
              reshuffles the pool before you reach question 4. The full session's answers are written to localStorage in a
              single operation when you click "See Results."
            </P>

            <Callout icon="🔒" color="#a1a1aa" title="Privacy">
              No data ever leaves your device. Smart Practice history is local-only. Nothing is sent to any server.
              You can inspect, export, or delete it at any time from the Dashboard.
            </Callout>
          </Section>

          {/* ── Question Types ──────────────────────────────────────────────── */}
          <Section id="question-types" title="Question Types">
            <P>
              freecertprep supports selected-response, ordering, matching, and PBQ-style scenario formats. All types support
              bookmarking and appear in the Exam Simulator when a cert uses them. The advanced simulation formats are used where
              they fit the real exam surface, such as CCNA command/topology/subnetting practice and Linux+ command/config repair.
            </P>

            {[
              {
                type: 'Single Choice',
                tag: 'Most common',
                desc: 'One correct answer from four options. Answer choices are shuffled on every render using Fisher-Yates to eliminate position bias — the correct answer is never reliably in position B.',
                example: 'Which AWS service provides object storage? → A) EBS  B) S3  C) EFS  D) RDS',
              },
              {
                type: 'Multiple Response',
                tag: 'Select N',
                desc: 'Two or more correct answers must be selected. The question header shows how many to select. Answers are submitted as a sorted array and must match the full correct set exactly.',
                example: 'Which two services are compute? (Select 2) → ✓ EC2  ✓ Lambda  ✗ S3  ✗ RDS',
              },
              {
                type: 'Statement Block',
                tag: 'Yes / No',
                desc: 'A series of statements where each must be answered Yes or No independently. Common in Azure exams for testing nuanced understanding of feature capabilities.',
                example: 'Azure Blob Storage supports geo-redundancy → Yes / No',
              },
              {
                type: 'Ordering',
                tag: 'Sequence',
                desc: 'Items must be placed in the correct order. Users click items in sequence to build their answer. Correct positions are shown individually after submission.',
                example: 'Order the steps to deploy a VM: 1. Create resource group  2. Choose image  3. Configure networking  4. Review and create',
              },
              {
                type: 'Matching',
                tag: 'Match pairs',
                desc: 'Left-column items must be matched to right-column options via dropdown selects. Each left item is scored independently, so partial credit is visible in review.',
                example: 'Match: S3 → Object storage  EC2 → Virtual compute  RDS → Managed database',
              },
              {
                type: 'PBQ Matching',
                tag: 'Scenario evidence',
                desc: 'A scenario block provides evidence, then learners match the correct item, action, or category. Used when the practice item needs more context than a plain matching prompt.',
                example: 'Match each observed symptom to the most likely network or service cause.',
              },
              {
                type: 'CLI Output',
                tag: 'Command evidence',
                desc: 'Learners interpret command output before choosing the answer. This supports practical Linux+, CCNA, and infrastructure troubleshooting review.',
                example: 'systemctl status nginx -> identify failed pre-start validation and choose the safest next step',
              },
              {
                type: 'Topology Scenario',
                tag: 'Diagram',
                desc: 'A network diagram, links, and optional tables provide the evidence for the question. This keeps CCNA-style practice closer to operational troubleshooting.',
                example: 'Use VLAN, gateway, and link-state details to identify the broken path.',
              },
              {
                type: 'Config Repair',
                tag: 'Fix safely',
                desc: 'A broken config block is shown and the learner chooses the least risky correction. Used for Linux+ and CCNA-style repair decisions.',
                example: '/etc/fstab uses ext4 for an XFS volume -> change the filesystem type to match evidence',
              },
              {
                type: 'Subnetting Drill',
                tag: 'Calculation',
                desc: 'The prompt asks for specific subnet values such as usable range, broadcast, mask, or network address, then scores each requested field.',
                example: 'Given 192.168.10.64/27, calculate network, broadcast, and usable host range.',
              },
            ].map(({ type, tag, desc, example }) => (
              <div key={type} className="glass-panel rounded-xl p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-zinc-100 text-base">{type}</h3>
                  <Tag>{tag}</Tag>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                <div className="glass-panel rounded-lg px-4 py-3">
                  <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold mb-1">Example</p>
                  <p className="text-xs text-zinc-400 font-mono leading-relaxed">{example}</p>
                </div>
              </div>
            ))}
          </Section>

          {/* ── Progress & Bookmarks ────────────────────────────────────────── */}
          <Section id="progress" title="Progress & Bookmarks">
            <H3>What's stored</H3>
            <P>Three independent localStorage keys manage all user data:</P>
            <Table
              headers={['Key', 'Contains', 'Scoped to']}
              rows={[
                ['freecertprep-progress', 'Quiz and exam session history — scores, answers, timestamps', 'Per cert'],
                ['freecertprep-question-stats-local', 'Per-question attempts, correct count, last seen timestamp', 'Per cert'],
                ['freecertprep-bookmarks', 'Starred question IDs', 'Per cert'],
              ]}
            />

            <H3>Bookmarks</H3>
            <P>
              Any question in any mode can be bookmarked using the star icon on the question card. Bookmarks persist across
              sessions and can be used as a quiz filter — useful for flagging questions you want to revisit or that cover
              concepts you haven't fully understood yet.
            </P>

            <H3>Export & Import</H3>
            <P>
              The Dashboard provides one-click JSON export of your session history. This lets you back up progress before
              clearing storage, transfer data between devices, or inspect your raw history. Importing overwrites the current
              progress for that cert — a confirmation warning is shown.
            </P>

            <H3>Resets</H3>
            <P>Two independent resets are available from the Dashboard, each behind a confirm step:</P>
            <ul className="space-y-3">
              {[
                { label: 'Reset Progress', desc: 'Clears quiz and exam session history. Domain readiness bars and overall stats reset to zero. Smart Practice history is unaffected.' },
                { label: 'Reset Smart Practice', desc: 'Clears per-question performance data. The weighted pool reverts to treating all questions as equally unknown. Only visible when you have tracked questions.' },
              ].map(({ label, desc }) => (
                <li key={label} className="flex gap-4 glass-panel rounded-xl p-4">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <div>
                    <p className="font-semibold text-zinc-200 mb-1">{label}</p>
                    <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          {/* ── Architecture ────────────────────────────────────────────────── */}
          <Section id="architecture" title="Architecture">
            <P>
              freecertprep is intentionally a zero-backend frontend application. Every architectural decision was made to
              maximise simplicity, performance, and privacy while keeping the door open for a backend layer when the time is right.
            </P>

            <H3>Tech stack</H3>
            <Table
              headers={['Layer', 'Technology', 'Why']}
              rows={[
                ['Framework', 'React 19', 'Concurrent features, stable hooks model'],
                ['Build', 'Vite', 'Fast HMR, native ESM, minimal config'],
                ['Styling', 'Tailwind CSS v4', 'Utility-first, no CSS bundle bloat'],
                ['Routing', 'React Router v7', 'Nested routes, lazy loading'],
                ['Testing', 'Vitest', 'Native ESM, co-located with Vite'],
                ['Storage', 'localStorage', 'Zero backend, instant reads, portable'],
                ['Deployment', 'Vercel', 'Git-connected, global CDN, free tier'],
              ]}
            />

            <H3>Project structure</H3>
            <CodeBlock>{`src/
├── pages/
│   ├── Home.jsx          — Landing page, guided paths, visitor counter
│   ├── Catalog.jsx       — Full cert catalog and Real Estate sister-site entry
│   ├── CareerPath.jsx    - Guided Networking / Cyber / Cloud / NVIDIA path pages
│   ├── Dashboard.jsx     — Per-cert stats, domain readiness, resets
│   ├── Quiz.jsx          — Smart Practice / Bookmarked / Domain mode
│   ├── Drill.jsx         — Timed 10-question drill with countdown
│   ├── Exam.jsx          — Full exam simulator
│   ├── Results.jsx       — Post-exam review with correct/incorrect filter
│   ├── Docs.jsx          — This page
│   ├── RealEstate.jsx    — Sister-site landing (light Redfin/Zillow theme)
│   └── realestate/       — Sister-site study app (light theme):
│       ├── RELayout.jsx  — Pins the cert engine to real-estate-national
│       ├── REDashboard / REQuiz / REDrill / REExam / REResults
├── components/
│   ├── QuestionCard.jsx  - Renders selected-response and PBQ-style IT formats
│   ├── REQuestionCard.jsx — Light single-choice card for the sister site
│   ├── CertLayout.jsx    — Nav, header, footer for cert pages
│   ├── ErrorBoundary.jsx — Root crash fallback (no blank page)
│   └── BrandedName.jsx   — Logo with cert-color accent
├── hooks/
│   ├── useCert.jsx       — Cert context + lazy question loading
│   ├── useProgress.js    — Session history, domain stats
│   ├── useBookmarks.js   — Star/unstar, per-cert localStorage
│   ├── useDocumentMeta.js — Per-route title / OG / canonical
│   └── useQuestionStats.js — Smart Practice tracking + weighted pool
├── utils/
│   ├── shuffle.js        — Fisher-Yates + weighted reservoir sampling
│   ├── exam-selection.js — Largest-remainder domain allocation
│   ├── smart-practice.js — Per-question weight formula
│   ├── progress-stats.js — Domain / overall rollups
│   ├── markdown.js       — Minimal explanation tokenizer
│   └── scoring.js        - isAnswerCorrect for all supported question formats
└── data/
    ├── certs.js          — Cert config: domains, weights, colors, exam specs
    └── *.json            — Question banks (lazy-loaded per cert)`}
            </CodeBlock>

            <H3>Key design decisions</H3>

            {[
              {
                title: 'Questions are lazy-loaded per cert',
                body: 'Each cert\'s JSON file is emitted as a standalone asset and fetched only when that cert is opened. A 750-question JSON file is never loaded on the home page, and the banks do not inflate JavaScript chunks.',
              },
              {
                title: 'Hooks own all storage — pages own none',
                body: 'No page component touches localStorage directly. useProgress, useBookmarks, and useQuestionStats each own their storage key. This is what makes the backend migration clean: swap the storage implementation inside the hook, and no page code changes.',
              },
              {
                title: 'Answer shuffling is per-render, not per-data',
                body: 'Question data is stored with original answer indices (correctAnswer: 2). At render time, Fisher-Yates shuffles the display order. The user sees A/B/C/D labels but the underlying index is tracked. This eliminates position bias without modifying any source data.',
              },
              {
                title: 'Smart Practice data shape mirrors a future DB schema',
                body: 'The localStorage object uses certId, questionId, attempts, correct, and lastSeen — fields that map directly to a Supabase table row. When accounts are added, the hook\'s internals change but the interface (recordSession, getWeightedPool) stays identical.',
              },
              {
                title: 'Exam domain allocation uses largest-remainder',
                body: 'Rounding percentages to whole numbers always introduces error. Largest-remainder ensures that if CLF-C02 needs 34% of 65 questions = 22.1, the allocation rounds correctly across all domains so the total is always exactly 65 — never 64 or 66.',
              },
              {
                title: 'The sister site reuses the engine, not the UI',
                body: 'The Real Estate study app lives under /real-estate/study with its own light-themed pages (REDashboard, REQuiz, REDrill, REExam, REResults) and a single-choice REQuestionCard. It imports the exact same useProgress, useQuestionStats, useBookmarks, scoring, shuffle, and exam-selection modules — the cert engine is theme-agnostic and keyed by certId, so CertProvider can take an explicit certId prop from the sister-site slug. New audiences get a different visual language with zero logic forks.',
              },
              {
                title: 'State licensing exams are composed, not duplicated',
                body: 'Real estate state modules merge the shared national pool with one state-law bank, tag each side as national or state, then select each portion independently through selectLicensingExam(). Texas, Maine, Georgia, Arizona, North Carolina, and Indiana all use this pattern; each module changes only the state count and state-domain weights, and Texas now includes the 2026 case-study category.',
              },
              {
                title: 'Content integrity is enforced, not assumed',
                body: 'With thousands of questions across many certs, a missing explanation or an out-of-range answer index is invisible until a learner hits it. The content-sanity suite asserts — for every question in every cert — unique ids, valid domains/types, in-range answer indices, and non-empty question, choice, and explanation text. It runs in GitHub Actions CI alongside lint and a production build on every push and pull request, so bad content fails the build instead of shipping silently. (This check caught and forced the backfill of 1,198 questions that had no explanation.)',
              },
              {
                title: 'Resilience and discoverability are first-class',
                body: 'A root error boundary keeps a thrown render error from blanking the whole app, and a failed question-bank import surfaces a real retry message instead of an infinite spinner. Because the app is a client-rendered SPA, a small useDocumentMeta hook sets per-route title, description, Open Graph, and canonical tags so each cert and the sister site are correctly represented when shared or indexed — no SSR framework required.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-zinc-700 pl-5 py-1 space-y-1">
                <p className="font-semibold text-zinc-200 text-sm">{title}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
              </div>
            ))}

            <H3>Testing</H3>
            <P>
              1,237 Vitest tests across 36 files cover the math, the scoring, the Smart Practice weights, objective-level learning, the progress rollups,
              the shared study UI, the markdown rendering, and a content sanity sweep over every question across every cert — including a check that
              every question, choice, and explanation is a non-empty string. These are the functions
              where correctness matters most: a bug in domain allocation silently distorts every exam, a bug in scoring silently
              marks right answers wrong, and a bad question slips past hundreds of thousands of silent reads. The full suite,
              lint, and a production build run in GitHub Actions CI on every push and pull request. The redesigned study
              UI now has focused regression coverage for navigation accessibility, workspace progress, and the question map,
              with browser QA still used for full rendered flows.
            </P>
            <CodeBlock>{`src/__tests__/
├── shuffle.test.js         — Fisher-Yates distribution, weightedSample bias
├── scoring.test.js         — Core scoring formats and edge cases
├── exam-selection.test.js  — Domain allocation, largest-remainder correctness
├── smart-practice.test.js  — Weight formula, mastered-question clamping
├── progress-stats.test.js  — Domain and overall rollups, percentage rounding
├── markdown.test.js        — Explanation-text rendering and escaping
├── study-ui.test.jsx      — Cert nav labels, StudyWorkspace, question map
├── home-career-path.test.jsx — Career-path homepage routing and catalog visibility
├── career-path-page.test.jsx - Guided path pages, Cloud vendor choice, and fallback routing
├── realestate-registry.test.js — Sister-site picker / cert registry wiring
├── aplus-page.test.jsx     — Dedicated A+ Core 1/Core 2 selector behavior
├── results-simulation-review.test.jsx — CCNA simulation items in results review
└── content-sanity.test.js  — Every question across every cert: ids unique,
                              domains valid, types recognized, correctAnswer
                              indices in range, MR sorted, ordering is a
                              permutation, matching indices valid, SB booleans`}
            </CodeBlock>
          </Section>

          {/* ── Roadmap ─────────────────────────────────────────────────────── */}
          <Section id="roadmap" title="Roadmap">
            <P>
              The product is live and usable today with 8 public IT certification modules, 9 Coming Soon IT modules, and a
              Real Estate build hidden from public navigation for rework. The current phase is consolidation: keep the live
              catalog accurate and make the complete first-user study journey feel coherent. The live-source and Terraform
              learning-value passes are complete. CCNA is preserved as a future-v2.0 preview rather than current-exam practice. Authored Coming Soon banks remain preserved without being
              presented as production-ready.
            </P>

            {[
              {
                status: 'Done',
                color: '#34d399',
                items: [
                  'Vercel deployment — public URL, auto-deploy on push to main',
                  'Trust layer phase 0 - every cert now has source metadata, official source links, source-check dates, exam-format notes, score-model notes, editorial status, dashboard source cards, report-an-issue links, and readiness-language cleanup for exam starts/results.',
                  'CompTIA PBQ-lite expansion - A+ Core 1, A+ Core 2, Network+, Security+, and Server+ now each include 10 scenario-based pbq-matching troubleshooting items.',
                  'Network+ and Security+ Objective Learning Loop - every N10-009 and SY0-701 question now carries objective and concept metadata; dashboards separate accuracy from coverage; practice supports objective focus, recent misses, and spaced due review; session results recommend the objectives behind each miss.',
                  'A+ Objective Learning Loop - both 220-1201 and 220-1202 now expose all 63 objectives through accuracy and coverage cards, focused drills, recent misses, spaced due review, support-oriented explanation cues, and post-session recommendations.',
                  'A+ PBQ-lite v2 - all 20 practical scenarios now include task briefs, console/table/checklist artifacts, component-level corrective feedback, and category-balanced exam forms with at least six practicals.',
                  'CompTIA Network+ (N10-009) — 760-question pool with scenario-forward PBQ-lite troubleshooting coverage',
                  'Cisco CCST Networking (100-150) - authored 750-question pool retained as Coming Soon while repetition and simulation fidelity are revised.',
                  'CompTIA Security+ (SY0-701) — 760-question pool with PBQ-lite security operations and architecture scenarios',
                  'CompTIA Server+ (SK0-005) - authored 760-question pool retained as Coming Soon while practical server troubleshooting is revised.',
                  'Splunk Core Certified User (SPLK-1001) - live 750-question pool aligned to the official 60-question / 60-minute blueprint: Splunk basics, basic searching, fields, SPL fundamentals, transforming commands, reports/dashboards, lookups, scheduled reports, and alerts. It is now the Cybersecurity path level-three SOC tooling layer.',
                  'CompTIA Linux+ (XK0-006) - authored 750-question pool retained as Coming Soon pending a major command, output, and configuration rewrite.',
                  'Schneider Data Center Certified Associate (DCCA) - authored 750-question pool retained as Coming Soon pending source hardening and facility-scenario rewrites.',
                  'Public-offering simplification - the homepage now shows only A+, Networking, Cybersecurity, and Cloud. NVIDIA and Data Center Technician lanes are hidden; their routes and content remain intact. The catalog separates 8 live modules from 9 Coming Soon modules, and Real Estate is reachable only through this documentation while it is reworked.',
                  'Cloud path flow - /paths/cloud is now AWS-centric: AWS Cloud Practitioner, then SAA-C03 as the architecture tier, then Terraform Associate as the deployable infrastructure skill. Azure Fundamentals and Google CDL remain in the full catalog for vendor-specific goals.',
                  'Real Estate sister-site prototype — retained as a hidden review build that reuses the same Smart Practice, scoring, and exam-selection engine; removed from public navigation until its source and simulation quality are ready.',
                  'GitHub Actions CI — lint, full test suite, and production build gated on every push and pull request',
                  'Per-route SEO — dynamic page titles, Open Graph, and canonical URLs; root error boundary and graceful question-load failure handling',
                  'Complete explanation coverage — every question in every cert now ships a worked explanation, enforced by an automated content gate (included a 1,198-question Network+/Server+ backfill)',
                  'Texas state-law module — live: 401 questions, 6 TREC sections, Full Licensing Exam mirrors 85 national + 40 state (70% each section).',
                  'Maine state-law module — live: 400 questions, 5 Pearson VUE sections, Full Licensing Exam mirrors 80 national + 40 state (75% each section). Sister-site study picker now covers National, Texas, and Maine.',
                  'Georgia state-law module — live: 400 questions, 3 PSI/AMP sections, Full Licensing Exam mirrors 100 national + 52 state (75% each section). Study picker now covers National, Texas, Maine, and Georgia.',
                  'Arizona state-law module — live: 400 questions, 11 ADRE / Pearson VUE sections, Full Licensing Exam mirrors 80 national + 60 state (75% pass target).',
                  'North Carolina state-law module — live: 400 questions, 8 NCREC / Pearson VUE sections, Full Licensing Exam mirrors 80 national + 60 state (75 each section).',
                  'Indiana state-law module — live: 400 questions, 5 Pearson VUE sections, Full Licensing Exam mirrors 80 national + 50 state (scaled 75 pass score).',
                  'AZ / NC / IN quality audit — all three new state modules verified for source-aligned exam splits, domain balance, unique IDs, duplicate-free stems, balanced answer positions, and frontend picker coverage.',
                  'CompTIA A+ guided track - live at /comptia/a-plus with separate Core 1 (220-1201) and Core 2 (220-1202) routes, each backed by a 760-question production pool with PBQ-lite troubleshooting scenarios and a 90-question simulator; both cores now also appear in the full catalog grid.',
                  'AWS Solutions Architect - Associate (SAA-C03) - live 750-question production pool aligned to the official 30/26/24/20 domain weights, now listed in the full catalog and Cloud path.',
                  'SAA-C03 editorial pass - removed generated case-label phrasing, expanded generic explanations into architecture tradeoff feedback, and updated all SAA multiple-response questions to five-option exam-style formatting.',
                  'SAA-C03 premium polish - dashboard study-plan guidance and Smart Practice review-loop copy now organize the existing pool around architecture tradeoffs without adding question volume.',
                  'Cisco CCNA (200-301) - preserved 750-question v2.0 preview with CLI output, topology, config repair, subnetting, and written practice. It is Coming Soon because Cisco v1.1 remains active through February 2, 2027.',
                  'HashiCorp Terraform Associate (004) — live: 647 questions covering all 37 implemented Terraform 1.12 subobjectives, with official direct-response formats and a disclosed editorial practice allocation for the 57-question / 60-minute simulator.',
                  'Live source and release audit - all then-live modules checked against official vendor sources; AWS, A+, Splunk, Cisco, and Terraform metadata corrected or tightened, and CCNA moved to Coming Soon because its bank targets future v2.0.',
                  'Terraform learning-value pass - 647 normalized-unique stems, structured operational explanations, 532 supporting evidence artifacts, stronger distractors, and automated allocation, evidence, uniqueness, and 500-form gates.',
                  'First-user journey hardening - Smart Practice result context is stable, Recent Misses is a direct next action, incomplete exams require confirmation, mobile cert navigation meets 44px touch targets, and a repeatable release checklist covers desktop and mobile flows.',
                  'Runtime reliability hardening - timed forms stay stable, session completion is idempotent, malformed progress data fails safely, exam expiry avoids state-updater side effects, and cert transitions cannot display stale module content.',
                  'A+, Network+, Security+, and Splunk quality sprint - objective learning, evidence-led practicals, form-composition guarantees, full-bank uniqueness checks, and structured review explanations completed by June 13, 2026.',
                  'Frontend refresh — shared study workspace, modern dashboard charts, icon navigation, guided path pages, route-level lazy loading, JSON question-bank assets, and 1,237-test regression suite.',
                ],
              },
              {
                status: 'Next up',
                color: '#a1a1aa',
                items: [
                  '1. Continue codebase bug review and hardening while catalog promotion remains paused.',
                ],
              },
              {
                status: 'Considering',
                color: '#fbbf24',
                items: [
                  'Streak tracking and study reminders',
                  'Accessibility pass phase 2 — deeper keyboard navigation, screen-reader flow, contrast, reduced-motion checks',
                  'Shared result cards — privacy-respecting shareable score screenshots',
                  'CCNA simulation expansion - parked until Cisco v2.0 becomes active and the preserved preview passes a fresh release audit.',
                  'User accounts and synced progress - useful after the local-first product journey is fully hardened.',
                  'Trust layer phase 1 - durable reports, moderation, audit trails, and correction history when a backend becomes an active priority.',
                  'Custom domain and installable PWA support.',
                  'CDL sister site - future written-test prep lane for General Knowledge, Air Brakes, Combination Vehicles, and endorsements. Architecture fit is strong because FMCSA sets federal minimum standards while state manuals can be layered like real-estate state modules.',
                  'NCLEX sister site - future nursing prep lane for RN/PN licensure. Defer content buildout until the app has a clinical-judgment case-study engine for matrix/grid, cloze, highlighting, drag/drop, chart/lab evidence, and partial-credit scoring.',
                  'More sister sites for adjacent non-IT career paths (e.g., fiber technician credentials)',
                ],
              },
            ].map(({ status, color, items }) => (
              <div key={status} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{status}</p>
                </div>
                <ul className="space-y-2 pl-4">
                  {items.map(item => (
                    <li key={item} className="text-sm text-zinc-400 flex gap-3">
                      <span className="text-zinc-700 mt-0.5">–</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <Callout icon="🔓" color="#34d399" title="Open source">
              freecertprep is fully open source. The question banks, scoring logic, weighted sampling algorithm, and all UI
              code are available on GitHub. Contributions, bug reports, and question corrections are welcome.
            </Callout>
          </Section>

        </main>
      </div>

      <footer className="border-t border-white/5 bg-zinc-950/50 py-8 text-center text-sm text-zinc-600">
        <p>freecertprep — built for the community</p>
      </footer>
    </div>
  )
}
