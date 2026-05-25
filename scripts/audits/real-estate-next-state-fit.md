# Real Estate Next-State Fit Research

Date: 2026-05-19

## Purpose

Validate whether Arizona, North Carolina, and Indiana can use the current
real-estate state-module architecture:

- shared `real-estate-national` question bank
- one state-law JSON bank per state
- `loadCompositeQuestions(stateUrl)` to merge national + state pools
- `composite: { national: { count, domains }, state: { count, domains } }`
- `selectLicensingExam()` to select each portion independently, then shuffle

## Sources checked

- Arizona Department of Real Estate exam curriculum page:
  https://azre.gov/resources/exam-curriculum-real-estate-salesperson
- Arizona / Pearson VUE Candidate Handbook:
  https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/090300.pdf
- North Carolina regulation, 21 NCAC 58A .0402:
  https://www.law.cornell.edu/regulations/north-carolina/21-N-C-Admin-Code-58A-0402
- North Carolina / Pearson VUE Candidate Handbook, April 2026:
  https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/093400.pdf
- Indiana / Pearson VUE Candidate Handbook:
  https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/091500.pdf

## Fit summary

All three states fit the current layered architecture. None requires a
single integrated exam build like Florida, California, or New York.

| State | Target module | Composite simulator | Pass target | Fit |
|-------|---------------|--------------------|-------------|-----|
| Arizona | Salesperson | 80 national + 60 state | 75% | Clean fit |
| North Carolina | Broker | 80 national + 60 state | 75 each section | Clean fit |
| Indiana | Broker | 80 national + 50 state | Scaled 75 | Clean fit |

## Arizona

The Arizona Department of Real Estate states the salesperson exam curriculum
is tested effective 2026-01-01. The Pearson VUE handbook lists the
national/general salesperson portion as 80 scored items and the Arizona
state-specific salesperson portion as 60 scored items with 5 pretest items.

Recommended module:

```js
'real-estate-az': {
  id: 'real-estate-az',
  title: 'Arizona Real Estate Salesperson Exam',
  code: 'AZ ADRE',
  questionCount: 400,
  examQuestions: 140,
  examTime: 300,
  passingScore: 75,
  loadQuestions: () => loadCompositeQuestions(realEstateAzStateQuestionsUrl),
  composite: {
    national: { count: 80, domains: RE_NATIONAL_DOMAINS },
    state: { count: 60, domains: AZ_STATE_DOMAINS },
  },
}
```

State domain blueprint from the 60-item outline:

- Arizona Real Estate Regulatory Framework: 5
- Arizona Consumer Protection Laws: 5
- Advertising: 5
- Arizona Agency: 6
- Licensee Duties and Obligations: 6
- Licensee Competencies and Duties: 6
- Reasonable Skill and Care: 6
- Contracts: 8
- Critical Business Services for a Real Estate Transaction: 5
- Ownership and Encumbrances: 5
- Foreclosure / Short Sale / Deed-in-Lieu Process: 3

Implementation note: weights should be derived as `items / 60 * 100`.

## North Carolina

North Carolina law requires two sections: a national section on general real
estate law, principles, and practices, and a state section on North Carolina
law, principles, and practices. The April 2026 NCREC / Pearson VUE licensing
booklet gives an 80-item national section and a 60-item state section, plus
5 pretest items per section. The passing score is 75 for each section,
computed separately.

Recommended module:

```js
'real-estate-nc': {
  id: 'real-estate-nc',
  title: 'North Carolina Real Estate Broker Exam',
  code: 'NCREC',
  questionCount: 400,
  examQuestions: 140,
  examTime: 240,
  passingScore: 75,
  loadQuestions: () => loadCompositeQuestions(realEstateNcStateQuestionsUrl),
  composite: {
    national: { count: 80, domains: RE_NATIONAL_DOMAINS },
    state: { count: 60, domains: NC_STATE_DOMAINS },
  },
}
```

State domain blueprint from the 60-item April 2026 NCREC outline:

- Licensure: 3
- Agency: 16
- Supervision / Compensation: 4
- Brokerage Practice: 12
- Taxes / Insurance: 4
- Contracts / Closing: 7
- Landlord / Tenant: 3
- Other North Carolina Laws: 11

Implementation note: NC should be labeled as a Broker / Provisional Broker
module, not a salesperson module.

## Indiana

The Indiana Pearson VUE handbook lists broker exams as divided into national
and state parts, with the national/general broker portion at 80 scored items
and the Indiana state-specific broker portion at 50 scored items. The broker
exam has a 240-minute seat time, 145 total questions including pretest items,
and a scaled passing score of 75.

Recommended module:

```js
'real-estate-in': {
  id: 'real-estate-in',
  title: 'Indiana Real Estate Broker Exam',
  code: 'IN PLA',
  questionCount: 400,
  examQuestions: 130,
  examTime: 240,
  passingScore: 75,
  loadQuestions: () => loadCompositeQuestions(realEstateInStateQuestionsUrl),
  composite: {
    national: { count: 80, domains: RE_NATIONAL_DOMAINS },
    state: { count: 50, domains: IN_STATE_DOMAINS },
  },
}
```

State domain blueprint from the 50-item outline:

- Indiana Real Estate Commission: 5
- Licensing: 9
- Statutory and Regulatory Requirements: 12
- Statutes and Rules Governing Licensees: 17
- Real Estate Office Procedures: 7

Implementation note: weights should be derived as `items / 50 * 100`.

## Recommended build order

1. Arizona: completed as a 400-question state-law bank and wired at
   `/real-estate/study/az`.
2. North Carolina: completed as a 400-question state-law bank and wired at
   `/real-estate/study/nc`.
3. Indiana: completed as a 400-question state-law bank and wired at
   `/real-estate/study/in`.

## Arizona build notes

Implemented on 2026-05-20 as `real-estate-az`:

- State-law bank: `src/data/real-estate-az-state-questions.json`
- Generator: `scripts/generate_az_state_questions.mjs`
- Count: 400 state-law questions
- Domain distribution: 33 / 33 / 33 / 40 / 40 / 40 / 40 / 54 / 34 / 33 / 20
- Answer-position distribution: 100 each for A, B, C, D
- Exact duplicate stems: 0
- Minimum explanation length in the generated bank: 138 characters

## North Carolina build notes

Implemented on 2026-05-20 as `real-estate-nc`:

- State-law bank: `src/data/real-estate-nc-state-questions.json`
- Generator: `scripts/generate_nc_state_questions.mjs`
- Count: 400 state-law questions
- Domain distribution: 20 / 107 / 27 / 80 / 27 / 47 / 20 / 72
- Answer-position distribution: 100 each for A, B, C, D
- Exact duplicate stems: 0
- Minimum explanation length in the generated bank: 140 characters

## Indiana build notes

Implemented on 2026-05-20 as `real-estate-in`:

- State-law bank: `src/data/real-estate-in-state-questions.json`
- Generator: `scripts/generate_in_state_questions.mjs`
- Count: 400 state-law questions
- Domain distribution: 40 / 72 / 96 / 136 / 56
- Answer-position distribution: 100 each for A, B, C, D
- Exact duplicate stems: 0
- Minimum explanation length in the generated bank: 155 characters

## 2026-05-25 Handbook Recheck

Rechecked the state-module architecture against the currently reachable
official handbook / testing-provider sources before considering wider public
placement.

| State | Current source checked | Result | Follow-up |
|-------|------------------------|--------|-----------|
| Arizona | Pearson VUE content outline, effective 2026-01-01 | Still matches the implemented 80 national + 60 state split and 11 state-law sections. | No architecture change needed. |
| Maine | Pearson VUE handbook `#092005`, 04/2025, law outline revalidated 2024 | Still matches the implemented 40-item state-law portion and five Maine law sections. | No architecture change needed. |
| North Carolina | NCREC / Pearson VUE licensing booklet, April 2026 | Still matches the implemented 80 national + 60 state split, separately scored sections, and eight state categories. | No architecture change needed. |
| Indiana | Pearson VUE handbook `#091500`, effective 2025-03-01 | Still matches the implemented 80 national + 50 state split and five Indiana state categories. | No architecture change needed. |
| Texas | Pearson VUE handbook `#094400`, effective 2026-01-01 | Needs follow-up. The newly checked outline lists Licensing at 4 items, Agency/Brokerage at 10, Contracts at 8, Special Topics at 6, and a 10-item Case Studies category; the current module still reflects the earlier six-section 40-item state-law taxonomy. | Keep unpublished from broader placement until the TX state taxonomy and case-study handling are updated. |
| Georgia | PSI/GREC public materials | Needs follow-up. Public sources confirm the 100 national + 52 Georgia state structure, but the current official PSI salesperson bulletin was not cleanly retrievable from the same stable source pattern during this pass. | Keep unpublished from broader placement until the current PSI/GREC salesperson bulletin is pinned and section weights are revalidated. |

Verdict: the layered national + state architecture remains sound, but Texas
and Georgia should not be treated as publication-ready until their current
state-law outlines are reconciled in the registry and source pools.
