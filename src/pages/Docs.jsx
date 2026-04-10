import { useState } from 'react'
import { Link } from 'react-router-dom'
import BrandedName from '../components/BrandedName'

const NAV = [
  { id: 'overview',       label: 'Overview' },
  { id: 'certifications', label: 'Certifications' },
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

function Callout({ icon, color = '#a1a1aa', title, children }) {
  return (
    <div className="rounded-xl border p-5 space-y-2" style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}>
      <div className="flex items-center gap-2" style={{ color }}>
        <span>{icon}</span>
        <span className="text-sm font-bold uppercase tracking-widest">{title}</span>
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed">{children}</p>
    </div>
  )
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/5">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5 bg-zinc-900/60">
            {headers.map(h => (
              <th key={h} className="text-left px-4 py-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-zinc-900/40 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-zinc-300">{cell}</td>
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
    <pre className="bg-zinc-900/80 border border-white/5 rounded-xl p-5 text-sm text-zinc-300 overflow-x-auto font-mono leading-relaxed">
      {children}
    </pre>
  )
}

export default function Docs() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="min-h-screen bg-[#0a0a23] flex flex-col">
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
            <div className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-lg border border-white/10 bg-zinc-800/60 text-zinc-400 uppercase tracking-widest mb-4">
              Documentation
            </div>
            <h1 className="text-4xl font-bold text-zinc-100 mb-3">freecertprep</h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              A free, open-source cloud certification exam prep platform. Realistic questions, intelligent practice modes, and zero paywalls.
            </p>
          </div>

          {/* ── Overview ───────────────────────────────────────────────────── */}
          <Section id="overview" title="Overview">
            <P>
              freecertprep was built to address a real gap: entry-level cloud certifications are increasingly required by employers,
              but most high-quality practice tools sit behind $30–50/month subscriptions. The people who need them most — career changers,
              students, and self-funders — are exactly who can't afford them.
            </P>
            <P>
              The platform covers foundational-tier certifications across AWS, Microsoft Azure, Google Cloud, and NVIDIA. Every cert is
              chosen deliberately: these are exams where the person is typically paying out of pocket, studying independently, and has no
              employer tuition pipeline to rely on.
            </P>

            <Callout icon="⚡" color="#a1a1aa" title="Core principles">
              Free forever. No account required. No data leaves your device. Study progress lives in your browser's localStorage and
              stays fully under your control — exportable and importable at any time.
            </Callout>

            <H3>What's included</H3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { n: '2,656', label: 'Total questions across all certs' },
                { n: '5', label: 'Certifications available today' },
                { n: '3', label: 'Study modes: Quiz, Drill, Exam' },
                { n: '5', label: 'Question types including ordering & matching' },
              ].map(({ n, label }) => (
                <div key={label} className="bg-zinc-900/50 border border-white/5 rounded-xl p-5">
                  <p className="text-3xl font-black text-zinc-100 mb-1">{n}</p>
                  <p className="text-sm text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Certifications ─────────────────────────────────────────────── */}
          <Section id="certifications" title="Certifications">
            <P>
              Each certification has its own question bank, domain structure, exam configuration, and passing threshold — all sourced
              from the official exam guides published by the certification providers.
            </P>

            <Table
              headers={['Cert', 'Provider', 'Questions', 'Exam Q\'s', 'Time', 'Pass', 'Scenario %']}
              rows={[
                [<Badge color="#f1be32">CLF-C02</Badge>, 'AWS', '731', '65', '90 min', '70%', '65%'],
                [<Badge color="#0078d4">AZ-900</Badge>, 'Microsoft Azure', '600', '40', '45 min', '70%', '50%'],
                [<Badge color="#4285f4">CDL</Badge>, 'Google Cloud', '749', '50', '90 min', '70%', '60%'],
                [<Badge color="#76b900">NCA-AIIO</Badge>, 'NVIDIA', '276', '50', '60 min', '70%', '—'],
                [<Badge color="#76b900">NCA-GENL</Badge>, 'NVIDIA', '300', '50', '60 min', '70%', '—'],
              ]}
            />

            <H3>Scenario ratio</H3>
            <P>
              Real certification exams are heavily scenario-based — they present a business problem and ask you to choose the right
              solution, not just recall a definition. The scenario ratio reflects what percentage of our question bank uses that format.
              CLF-C02, AZ-900, and CDL have all been deliberately expanded to match or exceed the scenario density of the actual exams.
            </P>

            <H3>Domain weighting</H3>
            <P>
              Every cert's Exam Simulator allocates questions proportionally by domain, matching the official exam blueprint. For example,
              the AZ-900 exam assigns 40% of questions to "Azure architecture and services" — our simulator mirrors that exactly using
              a largest-remainder allocation algorithm so no rounding errors distort domain representation.
            </P>

            <H3>Coming soon</H3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { provider: 'Microsoft Azure', color: '#0078d4', certs: ['SC-900 · Security Fundamentals', 'MS-900 · Microsoft 365 Fundamentals', 'DP-900 · Data Fundamentals'] },
                { provider: 'CompTIA', color: '#c8202f', certs: ['A+ · Core Hardware & OS', 'Network+ · Networking Fundamentals', 'Security+ · Entry-Level Security'] },
              ].map(({ provider, color, certs }) => (
                <div key={provider} className="bg-zinc-900/50 border border-white/5 rounded-xl p-5 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{provider}</p>
                  {certs.map(c => (
                    <div key={c} className="flex items-center gap-2 text-sm text-zinc-500">
                      <div className="w-1 h-1 rounded-full bg-zinc-600" />
                      {c}
                    </div>
                  ))}
                </div>
              ))}
            </div>
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
                <li key={label} className="flex gap-4 bg-zinc-900/40 border border-white/5 rounded-xl p-4">
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
              Stored in localStorage under the key <code className="text-zinc-300 bg-zinc-800/60 px-1.5 py-0.5 rounded text-xs">freecertprep-question-stats-local</code>.
              The <code className="text-zinc-300 bg-zinc-800/60 px-1.5 py-0.5 rounded text-xs">-local</code> suffix is intentional — it reserves the migration path for when
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
              freecertprep supports five question types, matching the full range found on real certification exams. All types
              support bookmarking and appear in the Exam Simulator. The quiz and drill use single-choice and multiple-response
              questions by default, while ordering and matching are reserved for the full exam experience.
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
            ].map(({ type, tag, desc, example }) => (
              <div key={type} className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-zinc-100 text-base">{type}</h3>
                  <Tag>{tag}</Tag>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                <div className="bg-zinc-950/60 rounded-lg px-4 py-3 border border-white/5">
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
                <li key={label} className="flex gap-4 bg-zinc-900/40 border border-rose-500/10 rounded-xl p-4">
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
                ['Routing', 'React Router v6', 'File-based nested routes, lazy loading'],
                ['Testing', 'Vitest', 'Native ESM, co-located with Vite'],
                ['Storage', 'localStorage', 'Zero backend, instant reads, portable'],
                ['Deployment', 'Vercel', 'Git-connected, global CDN, free tier'],
              ]}
            />

            <H3>Project structure</H3>
            <CodeBlock>{`src/
├── pages/
│   ├── Home.jsx          — Landing page, cert catalog, visitor counter
│   ├── Dashboard.jsx     — Per-cert stats, domain readiness, resets
│   ├── Quiz.jsx          — Smart Practice / Bookmarked / Domain mode
│   ├── Drill.jsx         — Timed 10-question drill with countdown
│   ├── Exam.jsx          — Full exam simulator
│   ├── Results.jsx       — Post-exam review with correct/incorrect filter
│   └── Docs.jsx          — This page
├── components/
│   ├── QuestionCard.jsx  — Renders all 5 question types
│   ├── CertLayout.jsx    — Nav, header, footer for cert pages
│   └── BrandedName.jsx   — Logo with cert-color accent
├── hooks/
│   ├── useCert.jsx       — Cert context + lazy question loading
│   ├── useProgress.js    — Session history, domain stats
│   ├── useBookmarks.js   — Star/unstar, per-cert localStorage
│   └── useQuestionStats.js — Smart Practice tracking + weighted pool
├── utils/
│   ├── shuffle.js        — Fisher-Yates + weighted reservoir sampling
│   ├── exam-selection.js — Largest-remainder domain allocation
│   └── scoring.js        — isAnswerCorrect for all 5 question types
└── data/
    ├── certs.js          — Cert config: domains, weights, colors, exam specs
    └── *.json            — Question banks (lazy-loaded per cert)`}
            </CodeBlock>

            <H3>Key design decisions</H3>

            {[
              {
                title: 'Questions are lazy-loaded per cert',
                body: 'Each cert\'s JSON file is imported dynamically — the browser only downloads the question bank for the cert you\'re actually using. A 750-question JSON file is never loaded on the home page. This keeps initial load fast regardless of how many certs are added.',
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
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-zinc-700 pl-5 py-1 space-y-1">
                <p className="font-semibold text-zinc-200 text-sm">{title}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
              </div>
            ))}

            <H3>Testing</H3>
            <P>
              27 Vitest tests cover the three core utility modules — shuffle, scoring, and exam-selection. These are the functions
              where correctness matters most: a bug in domain allocation silently distorts every exam, and a bug in scoring
              silently marks right answers wrong. UI behaviour is verified manually given the component-level complexity.
            </P>
            <CodeBlock>{`src/__tests__/
├── shuffle.test.js        — Fisher-Yates distribution, weightedSample bias
├── scoring.test.js        — All 5 question types, edge cases
└── exam-selection.test.js — Domain allocation, largest-remainder correctness`}
            </CodeBlock>
          </Section>

          {/* ── Roadmap ─────────────────────────────────────────────────────── */}
          <Section id="roadmap" title="Roadmap">
            <P>
              The product is live and usable today. The roadmap focuses on depth before breadth — making the existing study
              experience better before adding more certifications.
            </P>

            {[
              {
                status: 'In progress',
                color: '#34d399',
                items: [
                  'Vercel deployment — public URL, auto-deploy on push to main',
                ],
              },
              {
                status: 'Next up',
                color: '#a1a1aa',
                items: [
                  'Microsoft Azure 900-series — SC-900, MS-900, DP-900 (same structure as AZ-900)',
                  'CompTIA — A+, Network+, Security+ (large self-funded audience)',
                ],
              },
              {
                status: 'Planned',
                color: '#fbbf24',
                items: [
                  'NVIDIA cert expansion — NCA-AIIO and NCA-GENL (paused pending NVIDIA webinar on cert direction)',
                  'User accounts + Supabase backend — cloud-synced progress, Smart Practice history across devices',
                  'Custom domain',
                  'Mobile PWA — offline support, installable',
                ],
              },
              {
                status: 'Considering',
                color: '#71717a',
                items: [
                  'Streak tracking and study reminders',
                  'Accessibility pass — ARIA, keyboard navigation',
                  'Shared result cards — shareable score screenshots',
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
