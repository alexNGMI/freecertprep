# Maine state-law pool: progress & resume guide

Goal: ~400 single-choice ME state-law questions in
`src/data/real-estate-me-state-questions.json`, every question
`portion:"state"`, domain ∈ the 5 official Pearson VUE Maine sections,
with worked explanations. Then a one-time correctAnswer rebalance,
add ME to reCerts.js + landing card, smoke-test, commit.

## Status: IN PROGRESS

| | |
|---|---|
| Pool size | **0 / ~400** |
| certs.js questionCount | 0 (sync after every batch) |
| Cert | `real-estate-me` scaffolded (published:false, composite 80 nat + 40 state, 75% pass) |

### Target distribution (≈400) and progress
| Maine section (domain string) | weight | target | done |
|---|--:|--:|--:|
| Maine Laws & Rules Governing Licensees | 37.5% | ~150 | 0 |
| Law of Agency/Brokerage | 25% | ~100 | 0 |
| Maine-Specific Principles & Practices | 20% | ~80 | 0 |
| Maine Land-Use Law | 12.5% | ~50 | 0 |
| Maine Real Estate Commission | 5% | ~20 | 0 |

Keep ~50/batch at roughly: Laws&Rules 19 / Agency 12 / Principles 10 /
Land-Use 6 / Commission 3. ~8 batches.

## How to resume (per batch)
1. Author exactly 50 NEW questions (no concept repeats — see covered
   list) into `scripts/_me_patch.json` (array; ids re-me-N…
   CONTIGUOUS, portion "state", exact domain strings, 4 choices,
   non-empty explanation).
2. `python scripts/append_me_state.py scripts/_me_patch.json`
   (validates + appends; rejects on any error).
3. Update `certs.js` real-estate-me `questionCount` to new pool length.
4. (periodically) `npx vitest run src/__tests__/content-sanity.test.js`.
5. Update this file's status + covered list; commit (published:false).

## Final steps (after ~400)
- One-time balance: `python scripts/rebalance_choices.py
  src/data/real-estate-me-state-questions.json` (evens 0–3 distribution;
  correctness preserved; user-invisible due to render-time shuffle).
- Add ME entry to `src/pages/realestate/reCerts.js` + landing card in
  `src/pages/RealEstate.jsx` (slug `me`). Keep `published:false`.
- `npx eslint . && npx vitest run && npx vite build` all green.
- Browser smoke test: `/real-estate/study/me` — Full Licensing Exam
  composes 80 national + 40 state.

## Maine state-law blueprint (authoritative, Pearson VUE handbook)
40 scored state items, 5 sections. The Maine exam = 80 national + 40
state, each section 75% to pass, national 2.5 h + state 1.5 h.

- **Maine Real Estate Commission** — composition, powers, rulemaking,
  disciplinary authority, investigations/hearings, the affiliation
  structure (designated/associate brokers, agencies).
- **Maine Laws & Rules Governing Licensees** — Title 32 Ch. 114 &
  Commission rules: license categories (sales agent / associate broker
  / broker / designated broker / agency), the 2-year sales-agent term
  (non-renewable), education/exam path, agency licensing, trust/escrow
  account handling, advertising, recordkeeping, continuing education,
  unlicensed activity, prohibited conduct, disciplinary grounds &
  sanctions, license status changes.
- **Law of Agency/Brokerage** — Maine brokerage relationships:
  appointed agent vs designated broker, the Maine agency disclosure
  form & timing ("first contact"/before personal info), transaction
  brokerage / no-agency relationship, disclosed dual agency (informed
  written consent), seller/buyer/tenant/landlord agency, company
  policy, sub-agency, duties to clients vs customers, post-closing
  duties, conflicts.
- **Maine-Specific Principles & Practices** — Maine disclosure & market
  practice: residential property disclosure statement, lead-based paint,
  arsenic in well water / private water-supply well disclosure,
  radon air & water testing disclosure, septic/subsurface waste
  disclosure, smoke/CO detector requirements, real estate transfer tax
  & declaration, Maine title/recording (deeds, Registry of Deeds),
  property tax & exemptions (homestead), fair housing (Maine Human
  Rights Act), foreclosure, condominium/time-share, megan's-law nuance.
- **Maine Land-Use Law** — shoreland zoning, Mandatory Shoreland Zoning
  Act, subdivision law (Title 30-A definition / municipal review),
  Site Location of Development Act, NRPA (Natural Resources Protection
  Act), DEP/municipal permitting, growth management, plumbing/septic
  (Subsurface Wastewater Disposal Rules), well/water, comprehensive
  plans & local ordinances.

## Covered concepts (do NOT repeat) — append per batch
(none yet — batch 1 pending)
