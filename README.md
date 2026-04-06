# FreeCertPrep

Free cloud certification exam prep — practice with realistic questions, timed simulations, and progress tracking.

## Supported Certifications

| Cert | Provider | Code | Difficulty | Questions | Exam Time |
|------|----------|------|------------|-----------|-----------|
| Microsoft Azure Fundamentals | Microsoft Azure | AZ-900 | Foundational | 300 | 45 min |
| AWS Cloud Practitioner | AWS | CLF-C02 | Foundational | 216 | 90 min |
| Google Cloud Digital Leader | Google Cloud | CDL | Foundational | 170 | 90 min |
| NVIDIA AI Infrastructure & Operations | NVIDIA | NCA-AIIO | Associate | 256 | 60 min |
| NVIDIA Generalist AI | NVIDIA | NCA-GENL | Associate | 170 | 60 min |

## Features

- **Home** — Browse available certifications with at-a-glance stats
- **Dashboard** — Progress tracking by domain with weighted readiness scores
- **Practice Quiz** — Domain-filtered practice with instant feedback, explanations, and per-session question shuffling
- **Exam Simulator** — Timed simulation with domain-weighted question selection, question navigator, and type coverage guarantees matching real exam format
- **Results** — Score breakdown highlighting weak domains

## Question Types

- **Single-choice** — Pick one correct answer from multiple options
- **Multiple-response** — Select all correct answers (e.g., "Select two")
- **Statement-block** — Evaluate a series of Yes/No statements
- **Ordering** — Arrange items in the correct sequence (AZ-900)
- **Matching** — Match left-column items to right-column categories (AZ-900)

## Tech Stack

- React 19 + Vite 8
- Tailwind CSS v4
- React Router v7
- LocalStorage for progress persistence
- JSON-based question banks (lazy-loaded)

## Getting Started

```bash
npm install
npm run dev
```

## Adding Questions

Create or edit a JSON file in `src/data/`. Questions use one of these formats:

```json
// Single-choice (default if type omitted)
{ "id": "cert-1", "domain": "Domain Name", "question": "...", "choices": ["A", "B", "C", "D"], "correctAnswer": 0, "explanation": "..." }

// Multiple-response
{ "id": "cert-2", "domain": "...", "type": "multiple-response", "question": "... (Select two)", "choices": ["A", "B", "C", "D"], "correctAnswers": [0, 2], "explanation": "..." }

// Statement-block
{ "id": "cert-3", "domain": "...", "type": "statement-block", "question": "...", "statements": ["Statement 1", "Statement 2"], "correctAnswers": [true, false], "explanation": "..." }

// Ordering
{ "id": "cert-4", "domain": "...", "type": "ordering", "question": "Place in correct order:", "items": ["Step A", "Step B", "Step C"], "correctOrder": [2, 0, 1], "explanation": "..." }

// Matching
{ "id": "cert-5", "domain": "...", "type": "matching", "question": "Match each item:", "itemsLeft": ["X", "Y"], "itemsRight": ["Cat A", "Cat B"], "correctMatches": [1, 0], "explanation": "..." }
```

Then register it in `src/data/certs.js` with a `loadQuestions` dynamic import.

## Deployment

Designed for static hosting (S3 + CloudFront, Vercel, Netlify, etc.):

```bash
npm run build
# Upload dist/ to your hosting provider
```
