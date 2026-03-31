# FreeCertPrep

Free cloud certification exam prep — practice with realistic questions, timed simulations, and progress tracking.

## Supported Certifications

| Cert | Provider | Code | Difficulty | Questions | Exam Time |
|------|----------|------|------------|-----------|-----------|
| AWS Cloud Practitioner | AWS | CLF-C02 | Foundational | 150 | 90 min |
| Google Cloud Digital Leader | Google Cloud | CDL | Foundational | 150 | 90 min |
| NVIDIA AI Infrastructure & Operations | NVIDIA | NCA-AIIO | Associate | 150 | 60 min |
| NVIDIA Generalist AI | NVIDIA | NCA-GENL | Associate | 150 | 60 min |

## Features

- **Home** — Browse available certifications with at-a-glance stats
- **Dashboard** — Progress tracking by domain and overall stats
- **Practice Quiz** — Multiple choice with scoring, explanations, and domain filtering
- **Exam Simulator** — Timed simulation with question navigator, matching real exam format
- **Results** — Score breakdown highlighting weak domains

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

Create or edit a JSON file in `src/data/`. Each question follows this format:

```json
{
  "id": 1,
  "domain": "Domain Name",
  "question": "Your question here?",
  "choices": ["A", "B", "C", "D"],
  "correctAnswer": 0,
  "explanation": "Why this answer is correct."
}
```

Then register it in `src/data/certs.js` with a `loadQuestions` dynamic import.

## Deployment

Designed for static hosting (S3 + CloudFront, Vercel, Netlify, etc.):

```bash
npm run build
# Upload dist/ to your hosting provider
```
