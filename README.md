# freecertprep

Free, open-source certification exam prep for the IT certifications that open doors. Realistic question banks, timed exam simulators, Smart Practice that targets your weaknesses, and full progress tracking — all in the browser, with no account required.

## Supported certifications

| Cert | Provider | Code | Difficulty | Questions | Exam Q's | Time | Pass |
|------|----------|------|------------|----------:|---------:|-----:|-----:|
| AWS Cloud Practitioner | AWS | CLF-C02 | Foundational | 731 | 65 | 90 min | 70% |
| Microsoft Azure Fundamentals | Microsoft Azure | AZ-900 | Foundational | 600 | 40 | 45 min | 70% |
| Google Cloud Digital Leader | Google Cloud | CDL | Foundational | 749 | 50 | 90 min | 70% |
| NVIDIA AI Infrastructure & Operations | NVIDIA | NCA-AIIO | Associate | 306 | 50 | 60 min | 70% |
| NVIDIA Generalist AI | NVIDIA | NCA-GENL | Associate | 300 | 50 | 60 min | 70% |
| CompTIA Network+ | CompTIA | N10-009 | Foundational | 750 | 90 | 90 min | 80% |
| CompTIA Security+ | CompTIA | SY0-701 | Foundational | 750 | 90 | 90 min | 83% |
| CompTIA Server+ | CompTIA | SK0-005 | Foundational | 750 | 90 | 90 min | 83% |

**4,936 questions across 8 certifications.**

### Sister site — Real Estate

A separate, light-themed surface (Redfin/Zillow visual language) lives at `/real-estate`, with a full study app under `/real-estate/study`. It covers the **National Real Estate Salesperson Exam** — the portable national/uniform portion tested in ~48 states — with a **750-question pool** built to the post-October-2023 PSI blueprint (11 weighted domains, 100% single-choice, 80-question / 120-minute / 75%-pass simulator). It is intentionally not in the IT catalog above; it reuses the exact same Smart Practice, scoring, and exam-selection engine, keyed to its own cert id. State-specific local-law modules (TX, FL first) are planned to layer on top.

## Features

- **Home** — Catalog grouped by provider with at-a-glance exam stats.
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

## Tech stack

- React 19 + Vite
- Tailwind CSS v4
- React Router v7
- Vitest (178 tests across 7 modules), GitHub Actions CI
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
