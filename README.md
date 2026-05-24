# freecertprep

Free, open-source certification exam prep for the IT certifications that open doors. Realistic question banks, timed exam simulators, Smart Practice that targets your weaknesses, and full progress tracking — all in the browser, with no account required.

## Supported certifications

| Cert | Provider | Code | Difficulty | Questions | Exam Q's | Time | Pass |
|------|----------|------|------------|----------:|---------:|-----:|-----:|
| AWS Cloud Practitioner | AWS | CLF-C02 | Foundational | 731 | 65 | 90 min | 70% |
| AWS Solutions Architect - Associate | AWS | SAA-C03 | Associate | 750 | 65 | 130 min | 72% |
| Microsoft Azure Fundamentals | Microsoft Azure | AZ-900 | Foundational | 600 | 40 | 45 min | 70% |
| Google Cloud Digital Leader | Google Cloud | CDL | Foundational | 749 | 50 | 90 min | 70% |
| NVIDIA AI Infrastructure & Operations | NVIDIA | NCA-AIIO | Associate | 336 | 50 | 60 min | 70% |
| NVIDIA Generative AI LLMs | NVIDIA | NCA-GENL | Associate | 330 | 50 | 60 min | 70% |
| Cisco CCST Networking | Cisco | 100-150 | Foundational | 750 | 50 | 50 min | 70% practice |
| CompTIA A+ Core 1 | CompTIA | 220-1201 | Foundational | 750 | 90 | 90 min | 75% |
| CompTIA A+ Core 2 | CompTIA | 220-1202 | Foundational | 750 | 90 | 90 min | 78% |
| CompTIA Network+ | CompTIA | N10-009 | Foundational | 750 | 90 | 90 min | 80% |
| CompTIA Security+ | CompTIA | SY0-701 | Foundational | 750 | 90 | 90 min | 83% |
| CompTIA Server+ | CompTIA | SK0-005 | Foundational | 750 | 90 | 90 min | 83% |
| HashiCorp Terraform Associate | HashiCorp | TF Associate 004 | Associate | 632 | 57 | 60 min | ~70% |

**8,628 questions across 13 certifications.**

> **Multi-Cloud is live:** HashiCorp Terraform Associate (004) ships a 632-question pool across the 8 official exam objective groups for Terraform 1.12, launching the new "Multi-Cloud" provider group alongside the cloud providers. (HashiCorp does not publish an exact cut score; ~70% is the widely-cited working value.)

> **SAA-C03 is live:** AWS Solutions Architect - Associate has a 750-question production pool aligned to the official 30/26/24/20 domain weights. The Cloud path now runs AWS Cloud Practitioner -> SAA -> Terraform as the role-focused AWS lane, and SAA multiple-response items use five-option exam-style formatting.

> **A+ track is live:** `/comptia/a-plus` is a dedicated CompTIA A+ selector for choosing Core 1 (220-1201) or Core 2 (220-1202), and both cores also appear directly in the full catalog grid. Each core has a 750-question production pool and a 90-question / 90-minute simulator aligned to the official domain weights.

> **Guided paths are live:** The homepage now separates recommended learning lanes from the direct catalog. The A+ entry card opens `/comptia/a-plus` directly, while `/paths/networking`, `/paths/cybersecurity`, `/paths/cloud`, and `/paths/nvidia` help learners choose a sensible sequence; the Cloud path is AWS-centric: AWS Cloud Practitioner, SAA, then Terraform as the automation tier.

> **Cisco path preview is live:** Cisco CCST Networking (100-150) now has a 750-question production pool as a Cisco / CCNA-oriented alternative to Network+. It uses Cisco-style single-answer, multi-answer, matching, and ordering items to model the written-exam and drag/drop practice surface without adding CCNA-level labs.

> **CCNA simulation foundation is implemented:** `docs/ccna-simulation-architecture.md` maps the official 200-301 CCNA v1.1 domains to the simulation layer the app needs before CCNA can be exam-quality. CLI output interpretation, topology scenarios, config repair, and subnetting drills are now supported, with a 120-item unpublished preview pool registered for QA.

### Sister site — Real Estate

A separate, light-themed surface (Redfin/Zillow visual language) lives at `/real-estate`, with a full study app under `/real-estate/study`. It covers the **National Real Estate Salesperson Exam** — the portable national/uniform portion tested in ~48 states — with a **750-question pool** built to the post-October-2023 PSI blueprint (11 weighted domains, 100% single-choice, 80-question / 120-minute / 75%-pass simulator). It is intentionally not in the IT catalog above; it reuses the exact same Smart Practice, scoring, and exam-selection engine, keyed to its own cert id.

State-specific **state-law modules** layer on top of this national pool, modeled to each state's official exam blueprint, with a combined "Full Licensing Exam" mode that mirrors the real national + state split. A sister-site study picker (`/real-estate/study`) lets users choose which exam to prep:

- **Texas — live.** A 401-question Texas Sales Agent state-law pool modeled to the 6 official Pearson VUE / TREC sections, layered on the national pool; the Full Licensing Exam composes the real 85 national + 40 state, 70% each section. (`/real-estate/study/tx`)
- **Maine — live.** A 400-question Maine Sales Agent state-law pool modeled to the 5 official Pearson VUE sections, layered on the national pool; the Full Licensing Exam composes the real 80 national + 40 state, 75% each section. (`/real-estate/study/me`)
- **Georgia — live.** A 400-question Georgia Sales Agent state-law pool modeled to the 3 official PSI/AMP sections, layered on the national pool; the Full Licensing Exam composes the real 100 national + 52 state, 75% each section. (`/real-estate/study/ga`)
- **Arizona — live.** A 400-question Arizona Salesperson state-law pool modeled to the 11 official ADRE / Pearson VUE sections effective 2026-01-01; the Full Licensing Exam composes the real 80 national + 60 state, 75% pass target. (`/real-estate/study/az`)
- **North Carolina — live.** A 400-question North Carolina Broker state-law pool modeled to the 8 official NCREC / Pearson VUE April 2026 sections; the Full Licensing Exam composes the current 80 national + 60 state, 75 each section. (`/real-estate/study/nc`)
- **Indiana — live.** A 400-question Indiana Broker state-law pool modeled to the 5 official Pearson VUE sections effective 2025-03-01; the Full Licensing Exam composes the real 80 national + 50 state, scaled 75 pass score. (`/real-estate/study/in`)

Single-integrated-exam states (Florida, California, New York) are explicitly **out of scope** — their exams are not a national + state split, so the layered-module architecture does not apply. Real Estate always lives on the sister site and is intentionally kept out of the IT catalog (it fills a different need).

## Features

- **Home** - Guided learning paths up top, direct certification catalog below.
- **Path pages** - Dedicated lanes for Networking, Cybersecurity, Cloud, and NVIDIA, plus a direct A+ selector for brand-new learners. Networking offers Network+ or Cisco CCST before Server+; Cloud guides learners through AWS Cloud Practitioner, SAA, then Terraform. Azure Fundamentals and Google CDL remain in the full catalog for vendor-specific goals.
- **Advanced cert roadmap** - AWS Solutions Architect - Associate (SAA-C03) is live, and Cisco CCNA (200-301) is in unpublished preview. CLI-output, topology-scenario, config-repair, and subnetting-drill support are implemented; the CCNA pool stays hidden from the catalog while it goes through QA.
- **Dashboard** — Per-cert progress, domain-weighted readiness scores, history export/import.
- **Practice Quiz** — 10 questions per session. Choose Smart Practice (weakness-weighted), Bookmarked, or a single Domain.
- **Timed Drill** — 10 questions in 10 minutes, color-shifting countdown timer.
- **Exam Simulator** — Full-length timed simulation matching the official exam's question count, domain weights, and time limit.
- **Results** — Filterable review with explanations for every question.
- **Bookmarks** — Star any question and recall the set in any mode.

## Smart Practice

Per-question performance is tracked locally. The weighted pool surfaces the questions you keep getting wrong more often, while mastered questions fade (but never disappear entirely). Selection uses the Efraimidis–Spirakis weighted reservoir sampling algorithm, so every session is probabilistic — you won't see the same 10 questions twice, but your weakest ones are statistically far more likely to appear.

All stats are written to `localStorage` at session end. No data ever leaves your device.

## Question types

- **Single-choice** — One correct answer from four options.
- **Multiple-response** — Two or more correct answers, sorted-array scoring.
- **Statement-block** — Series of Yes/No statements, each scored independently.
- **Ordering** — Place items in the correct sequence.
- **Matching** — Match left-column items to right-column options.

CCNA simulation types implemented: CLI output interpretation, topology scenarios, config repair, and subnetting drills. A 120-item unpublished CCNA preview pool is registered at `ccna-200-301` for QA. See `docs/ccna-simulation-architecture.md`.

## Tech stack

- React 19 + Vite
- Tailwind CSS v4
- React Router v7
- Vitest (533 tests across 23 files), GitHub Actions CI
- `localStorage` for all progress; zero-backend by design
- JSON-based question banks, lazy-loaded per cert

## Getting started

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
# upload dist/ to Vercel, S3+CloudFront, Netlify, etc.
```

Run the tests:

```bash
npx vitest run
```

## Adding a new cert

1. Register the cert in `src/data/certs.js` with its `domains`, `domainColors`, exam config, and a dynamic `loadQuestions` import.
2. Create `src/data/<cert-id>-questions.json` as an array of question objects.
3. Add the new cert + JSON import to `src/__tests__/content-sanity.test.js` so its pool is validated.
4. Set `published: false` while authoring; remove the flag when the pool is ready to ship.

## Adding a real estate state module

State modules reuse the national real estate pool instead of duplicating it. Add a state-law JSON bank, import it in `src/data/certs.js`, load it with `loadCompositeQuestions(stateUrl)`, and set a `composite` exam split that mirrors the real licensing exam.

The next researched state modules fit the current architecture:

| State | License exam | Composite simulator | State blueprint |
|-------|--------------|--------------------|-----------------|
| Arizona | Salesperson | 80 national + 60 state | Live: 400-question bank, 11 state-law sections, effective 2026-01-01 |
| North Carolina | Broker | 80 national + 60 state | Live: 400-question bank, 8 state-law sections, April 2026 NCREC outline |
| Indiana | Broker | 80 national + 50 state | Live: 400-question bank, 5 state-law sections, effective 2025-03-01 |

Single-integrated-exam states such as Florida, California, and New York stay out of this layered flow unless we build them as separate long-form products.

## Adding questions

Questions live in plain JSON. One of five shapes per question:

```jsonc
// Single-choice (default if type is omitted)
{ "id": "cert-1", "domain": "Domain Name", "question": "...",
  "choices": ["A", "B", "C", "D"], "correctAnswer": 0, "explanation": "..." }

// Multiple-response
{ "id": "cert-2", "domain": "...", "type": "multiple-response",
  "question": "... (Select two)",
  "choices": ["A", "B", "C", "D"],
  "correctAnswers": [0, 2], "explanation": "..." }

// Statement-block
{ "id": "cert-3", "domain": "...", "type": "statement-block",
  "question": "...",
  "statements": ["Statement 1", "Statement 2"],
  "correctAnswers": [true, false], "explanation": "..." }

// Ordering
{ "id": "cert-4", "domain": "...", "type": "ordering",
  "question": "Place in correct order:",
  "items": ["Step A", "Step B", "Step C"],
  "correctOrder": [2, 0, 1], "explanation": "..." }

// Matching
{ "id": "cert-5", "domain": "...", "type": "matching",
  "question": "Match each item:",
  "itemsLeft": ["X", "Y"],
  "itemsRight": ["Cat A", "Cat B"],
  "correctMatches": [1, 0], "explanation": "..." }
```

The content-sanity tests enforce id uniqueness, domain validity, type recognition, range-checked answer indices, sorted MR arrays, non-identity ordering/matching permutations, and proper boolean arrays for statement-blocks. Add a question that violates the schema and CI will catch it.

## License

Open source — see repo for license details. Contributions, bug reports, and question corrections are welcome.
