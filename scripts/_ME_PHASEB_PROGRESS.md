# Maine state-law pool: completion note

Goal: ~400 single-choice ME state-law questions in
`src/data/real-estate-me-state-questions.json`, every question
`portion:"state"`, domain in the 5 official Pearson VUE Maine sections,
with worked explanations. Then rebalance answer positions, wire Maine into
the Real Estate sister-site picker, smoke-test, and keep it out of the IT
catalog via `published:false`.

## Status: COMPLETE

| | |
|---|---|
| Pool size | **400 / 400 - DONE** |
| certs.js questionCount | 400 (synced) |
| Route | `/real-estate/study/me` |
| Picker | `src/pages/realestate/reCerts.js` includes slug `me` |
| Landing card | `src/pages/RealEstate.jsx` includes Maine as available |
| Engine | `selectLicensingExam` composes 80 national + 40 state |
| Tests | Content sanity, full Vitest suite, lint, and build verified on 2026-05-17 |

### Final distribution

| Maine section (domain string) | exam weight | pool count |
|---|--:|--:|
| Maine Laws & Rules Governing Licensees | 37.5% | 156 |
| Law of Agency/Brokerage | 25% | 80 |
| Maine-Specific Principles & Practices | 20% | 74 |
| Maine Land-Use Law | 12.5% | 50 |
| Maine Real Estate Commission | 5% | 40 |

`correctAnswer` distribution after rebalance: 0=96, 1=112, 2=95, 3=97.

## Source batches

The final applied patch batch (`re-me-351` through `re-me-400`) is archived
at `scripts/archive/_me_patch.json`. Earlier Maine batches were already
incorporated into the canonical question file before this archive cleanup.

## Maine state-law blueprint

40 scored state items, 5 sections. The Maine exam = 80 national + 40
state, each section 75% to pass, national 2.5 h + state 1.5 h.

- **Maine Real Estate Commission** - composition, powers, rulemaking,
  disciplinary authority, investigations/hearings, and the affiliation
  structure.
- **Maine Laws & Rules Governing Licensees** - Title 32 Ch. 114 and
  Commission rules: license categories, education/exam path, agency
  licensing, trust/escrow handling, advertising, recordkeeping,
  continuing education, unlicensed activity, prohibited conduct,
  discipline, and license status changes.
- **Law of Agency/Brokerage** - brokerage relationships, appointed
  agents, designated brokers, agency disclosure timing, transaction
  brokerage, disclosed dual agency, client/customer duties, company
  policy, sub-agency, post-closing duties, and conflicts.
- **Maine-Specific Principles & Practices** - residential disclosures,
  lead-based paint, arsenic/well water, radon, septic/subsurface waste,
  smoke/CO detectors, transfer tax, recording, property tax, fair
  housing, foreclosure, condominium/time-share, and related practice.
- **Maine Land-Use Law** - shoreland zoning, subdivision law, Site
  Location of Development Act, NRPA, DEP/municipal permitting, growth
  management, plumbing/septic, wells/water, comprehensive plans, and
  local ordinances.
