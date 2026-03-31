# FreeCertPrep

AWS CLF-C02 (Cloud Practitioner) exam prep platform.

## Features

- **Dashboard** — Progress tracking by domain and overall stats
- **Practice Quiz** — Multiple choice with scoring, explanations, and domain filtering
- **Exam Simulator** — 65 questions, 90-minute timer, simulates the real exam
- **Results** — Score breakdown highlighting weak domains

## Exam Domains

| Domain | Weight |
|--------|--------|
| Cloud Concepts | 24% |
| Security and Compliance | 30% |
| Cloud Technology and Services | 34% |
| Billing, Pricing and Support | 12% |

## Tech Stack

- React + Vite
- Tailwind CSS v4
- React Router
- LocalStorage for progress persistence
- JSON-based question bank

## Getting Started

```bash
npm install
npm run dev
```

## Adding Questions

Edit `src/data/questions.json`. Each question follows this format:

```json
{
  "id": 1,
  "domain": "Cloud Concepts",
  "question": "Your question here?",
  "choices": ["A", "B", "C", "D"],
  "correctAnswer": 0,
  "explanation": "Why this answer is correct."
}
```

## Deployment

Designed for static hosting on AWS S3 + CloudFront:

```bash
npm run build
# Upload dist/ to S3 bucket
```
