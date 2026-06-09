# freecertprep

Free, open-source certification exam prep for the IT certifications that open doors. Realistic question banks, timed exam simulators, Smart Practice that targets your weaknesses, and full progress tracking — all in the browser, with no account required.

## Supported certifications

| Cert | Provider | Code | Difficulty | Questions | Exam Q's | Time | Target |
|------|----------|------|------------|----------:|---------:|-----:|-----:|
| AWS Cloud Practitioner | AWS | CLF-C02 | Foundational | 731 | 65 | 90 min | 70% |
| AWS Solutions Architect - Associate | AWS | SAA-C03 | Associate | 750 | 65 | 130 min | 72% |
| Microsoft Azure Fundamentals | Microsoft Azure | AZ-900 | Foundational | 600 | 40 | 45 min | 70% |
| Google Cloud Digital Leader | Google Cloud | CDL | Foundational | 749 | 50 | 90 min | 70% |
| NVIDIA AI Infrastructure & Operations | NVIDIA | NCA-AIIO | Associate | 336 | 50 | 60 min | 70% |
| NVIDIA Generative AI LLMs | NVIDIA | NCA-GENL | Associate | 330 | 50 | 60 min | 70% |
| Cisco CCST Networking | Cisco | 100-150 | Foundational | 750 | 50 | 50 min | 70% practice |
| Cisco CCNA | Cisco | 200-301 | Associate | 750 | 60 | 120 min | 70% practice |
| CompTIA A+ Core 1 | CompTIA | 220-1201 | Foundational | 760 | 90 | 90 min | 75% |
| CompTIA A+ Core 2 | CompTIA | 220-1202 | Foundational | 760 | 90 | 90 min | 78% |
| CompTIA Network+ | CompTIA | N10-009 | Foundational | 760 | 90 | 90 min | 80% |
| CompTIA Security+ | CompTIA | SY0-701 | Foundational | 760 | 90 | 90 min | 83% |
| Splunk Core Certified User | Splunk | SPLK-1001 | Entry-Level | 750 | 60 | 60 min | 70% practice |
| CompTIA Server+ | CompTIA | SK0-005 | Foundational | 760 | 90 | 90 min | 83% |
| CompTIA Linux+ | CompTIA | XK0-006 | Foundational | 750 | 90 | 90 min | 80% |
| Schneider Data Center Certified Associate | Schneider Electric | DCCA | Associate | 750 | 100 | 120 min | 70% practice |
| HashiCorp Terraform Associate | HashiCorp | TF Associate 004 | Associate | 632 | 57 | 60 min | ~70% |

**11,678 authored questions across 17 IT certifications.** The public catalog currently exposes 9 live modules and holds 8 as Coming Soon. Practice thresholds are readiness targets unless the vendor publishes a directly comparable raw percentage.

Live now: A+ Core 1, A+ Core 2, CLF-C02, SAA-C03, Network+, Security+, Splunk Core User, CCNA, and Terraform Associate.

Coming Soon while simulations are revised: AZ-900, Google CDL, CCST Networking, NVIDIA AIIO, NVIDIA GENL, Server+, Linux+, and Schneider DCCA. No question banks or routes were deleted.

> **Multi-Cloud is live:** HashiCorp Terraform Associate (004) ships a 632-question pool across the 8 official exam objective groups for Terraform 1.12, launching the new "Multi-Cloud" provider group alongside the cloud providers.

> **Terraform format fidelity is live:** the Associate 004 bank now includes 24 true/false and 32 multiple-answer questions across all eight objectives. Every 57-question simulation guarantees at least three true/false and four multiple-answer items while preserving the objective allocation.

> **Live-bank language cleanup is active:** synthetic ticket identifiers and generated "scenario includes" filler have been removed from A+ Core 1, A+ Core 2, and Splunk Core User. Automated gates prevent that phrasing from returning. The cleanup exposed repeated stem clusters that are now measured directly and queued for evidence-based rewrites rather than hidden behind artificial IDs.

> **Splunk evidence rewrite is live:** all 750 Core Certified User stems are exact-unique and now use concrete SPL, event, field, result-set, lookup, report, dashboard, or alert evidence. Structural stem diversity increased from 297 to 529 after normalizing numbers and code literals. Official-style 60-question simulations exclude the matching and ordering learning drills.

> **A+ evidence rewrite is live:** both 760-question Core banks now have 760 exact and normalized-unique stems, retain ten handcrafted PBQ-lite scenarios, and avoid generated ticket framing. Formal simulations guarantee at least six PBQ-lite items and exclude statement-block learning drills.

> **Readiness grades updated:** Splunk Core User remains B+ and meets the live-catalog bar. A+ Core 1 and Core 2 are C+ foundational strategic exceptions: useful entry practice that remains live while official-objective breadth, distractors, and PBQ realism are expanded.

> **Trust layer phase 0 is live:** every registered cert now carries source metadata with official source links, source-check date, exam-format notes, score-model notes, and editorial status. Dashboards expose official-source and report-an-issue links, and exam/results copy now labels scores as readiness signals instead of official vendor score reports.

> **CompTIA practical simulation v1 is live:** every 90-question Network+ and Security+ form now guarantees at least six practical scenarios while preserving exact blueprint allocation. Network+ has 32 practical items across PBQ matching, topology, command output, and config repair; Security+ has 33 across PBQ matching, log triage, segmented architecture, and control repair. Multi-part review shows component-level correctness without claiming CompTIA's confidential partial-credit model.

> **SAA-C03 is live:** AWS Solutions Architect - Associate has a 750-question production pool aligned to the official 30/26/24/20 domain weights. The Cloud path now runs AWS Cloud Practitioner -> SAA -> Terraform as the role-focused AWS lane, SAA multiple-response items use five-option exam-style formatting, and the SAA dashboard/Smart Practice setup now frames the pool around architecture tradeoff review.

> **A+ track is live:** `/comptia/a-plus` is a dedicated CompTIA A+ selector for choosing Core 1 (220-1201) or Core 2 (220-1202), and both cores also appear directly in the full catalog grid. Each core has a 760-question production pool, including PBQ-lite troubleshooting scenarios, and a 90-question / 90-minute simulator aligned to the official domain weights.

> **Guided paths are live:** The homepage focuses on A+, Networking, Cybersecurity, and Cloud. NVIDIA and Data Center Technician paths remain implemented but are hidden from homepage discovery while their component certifications are revised. The Networking path keeps Network+ and CCNA live while showing CCST as Coming Soon; Cybersecurity runs Network+ to Security+ to Splunk; Cloud runs AWS Cloud Practitioner to SAA to Terraform.

> **Role-specialty path copy is live:** Cloud now frames Terraform as the deployable infrastructure skill after AWS fundamentals and architecture. Cybersecurity now frames Splunk as the practical SOC tooling layer after Network+ and Security+.

> **Splunk is live:** Splunk Core Certified User (SPLK-1001) ships a 750-question production pool aligned to the official 5/22/20/15/15/12/6/5 blueprint weights. It is now the Cybersecurity path's live level-three SOC tooling layer.

> **AI infrastructure revision:** Linux+, NVIDIA AI Infrastructure & Operations, and NVIDIA Generative AI remain authored but are Coming Soon while their simulation realism is improved.

> **Data center revision:** Server+ and Schneider DCCA remain authored but are Coming Soon. CCNA remains live. The Data Center Technician route is retained for future iteration but removed from homepage discovery.

> **Cisco foundation revision:** Cisco CCST Networking (100-150) retains its 750-question pool but is marked Coming Soon until repeated content patterns and simulation fidelity are improved.

> **CCNA is live:** Cisco CCNA (200-301) now ships a 750-question production pool aligned to the current Cisco 200-301 v2.0 blueprint. CLI output interpretation, topology scenarios, config repair, subnetting drills, and written exam-style items are published in the catalog and connected to the Networking and Data Center Technician paths.

### Sister site — Real Estate

A separate Real Estate prototype remains in the codebase with its national and state-law pools intact. It is hidden from public homepage/catalog navigation and linked only from `/docs` while its source and simulation quality are reworked.

State-specific **state-law modules** layer on top of this national pool, modeled to each state's official exam blueprint, with a combined "Full Licensing Exam" mode that mirrors the real national + state split. A sister-site study picker (`/real-estate/study`) lets users choose which exam to prep:

- **Texas ? live.** A 401-question Texas Sales Agent state-law pool modeled to the 2026 Pearson VUE / TREC state-law outline, including the Case Studies category, layered on the national pool; the Full Licensing Exam composes 85 national + 50 state, 70% each section. (`/real-estate/study/tx`)
- **Maine — live.** A 400-question Maine Sales Agent state-law pool modeled to the 5 official Pearson VUE sections, layered on the national pool; the Full Licensing Exam composes the real 80 national + 40 state, 75% each section. (`/real-estate/study/me`)
- **Georgia — live.** A 400-question Georgia Sales Agent state-law pool modeled to the 3 official PSI/AMP sections, layered on the national pool; the Full Licensing Exam composes the real 100 national + 52 state, 75% each section. (`/real-estate/study/ga`)
- **Arizona — live.** A 400-question Arizona Salesperson state-law pool modeled to the 11 official ADRE / Pearson VUE sections effective 2026-01-01; the Full Licensing Exam composes 80 national + 60 state with a readiness target. (`/real-estate/study/az`)
- **North Carolina — live.** A 400-question North Carolina Broker state-law pool modeled to the 8 official NCREC / Pearson VUE April 2026 sections; the Full Licensing Exam composes the current 80 national + 60 state, 75 each section. (`/real-estate/study/nc`)
- **Indiana — live.** A 400-question Indiana Broker state-law pool modeled to the 5 official Pearson VUE sections effective 2025-03-01; the Full Licensing Exam composes 80 national + 50 state with a practice readiness target. (`/real-estate/study/in`)

Single-integrated-exam states (Florida, California, New York) are explicitly **out of scope** — their exams are not a national + state split, so the layered-module architecture does not apply. Real Estate always lives on the sister site and is intentionally kept out of the IT catalog (it fills a different need).

## Features

- **Home** - Guided learning paths and study workflow highlights.
- **Catalog** - Dedicated `/catalog` page for the full certification grid plus the Real Estate sister-site entry.
- **Path pages** - Public homepage lanes cover A+ entry, Networking, Cybersecurity, and Cloud. NVIDIA and Data Center Technician pages remain implemented but are hidden during content revision.
- **Recommended playlists** - Docs now link optional Professor Messer YouTube playlists for CompTIA A+ Core 1 (220-1201), A+ Core 2 (220-1202), Network+ (N10-009), and Security+ (SY0-701) as video companions to the practice banks.
- **Advanced cert roadmap** - AWS Solutions Architect - Associate (SAA-C03) is live with premium study-plan guidance, and Cisco CCNA (200-301) is live as the first advanced simulation-backed networking cert. CLI-output, topology-scenario, config-repair, and subnetting-drill support are implemented for ongoing advanced-cert polish.
- **Content accuracy roadmap** - Latest full-bank blueprint audit completed the Network+ N10-009 troubleshooting rebalance, refreshed Google CDL to the current six-section guide, rebalanced NVIDIA AIIO to its official 40/38/22 split, moved AZ-900 inside Microsoft's current ranged weights, reconciled Texas to the 2026 state-law outline, and shipped the Georgia, Arizona, North Carolina, and Indiana state-law modules.
- **Future sister-site roadmap** - CDL written-test prep is the strongest near-term adjacent lane because it can reuse the current national/state-module pattern around FMCSA standards and state CDL manuals. NCLEX nursing prep is a higher-complexity future lane because exam-quality support would need a clinical-judgment case-study engine for matrix/grid, cloze, highlighting, drag/drop, chart/lab evidence, and partial-credit scoring.
- **Trust layer roadmap** - Phase 0 source/status cards and report-an-issue links are live. Phase 1 is durable report persistence, moderation state, editorial review workflow, and correction history.
- **Dashboard** — Per-cert progress, domain-weighted readiness scores, history export/import.
- **Practice Quiz** — 10 questions per session. Choose Smart Practice (weakness-weighted), Bookmarked, or a single Domain.
- **Timed Drill** — 10 questions in 10 minutes, color-shifting countdown timer.
- **Exam Simulator** — Full-length timed readiness simulation using official domain weights and the closest supported question count/time model.
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

Additional advanced formats are also supported where the exam surface needs them:

- **PBQ matching** - Match items from a scenario evidence block.
- **CLI output** - Interpret command output before selecting the answer.
- **Topology scenario** - Use a network diagram, links, and tables to answer.
- **Config repair** - Review a broken configuration and choose the safest fix.
- **Subnetting drill** - Calculate requested network values from a subnet prompt.

CCNA simulation types implemented: CLI output interpretation, topology scenarios, config repair, and subnetting drills. Linux+ also uses CLI output and config-repair items for PBQ-style practice. A 750-item production CCNA pool is registered at `ccna-200-301` and aligned to Cisco 200-301 v2.0. See `docs/ccna-simulation-architecture.md`.

## Tech stack

- React 19 + Vite
- Tailwind CSS v4
- React Router v7
- Vitest (910 tests across 27 files), GitHub Actions CI
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

Questions live in plain JSON. Common shapes include:

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

// CLI output
{ "id": "cert-6", "domain": "...", "type": "cli-output",
  "question": "What is the best next step?",
  "commands": [{ "command": "systemctl status nginx", "output": "..." }],
  "choices": ["A", "B", "C", "D"], "correctAnswer": 0, "explanation": "..." }

// Config repair
{ "id": "cert-7", "domain": "...", "type": "config-repair",
  "question": "Which repair is best?",
  "configTitle": "/etc/fstab",
  "config": ["UUID=... /data ext4 defaults 0 2"],
  "choices": ["A", "B", "C", "D"], "correctAnswer": 0, "explanation": "..." }
```

The content-sanity tests enforce id uniqueness, domain validity, type recognition, range-checked answer indices, sorted MR arrays, valid ordering/matching permutations, PBQ evidence, CLI command blocks, config blocks, subnet fields, and proper boolean arrays for statement-blocks. Add a question that violates the schema and CI will catch it.

## License

Open source — see repo for license details. Contributions, bug reports, and question corrections are welcome.
