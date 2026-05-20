# AZ / NC / IN State Module Quality Audit

Date: 2026-05-20

## Scope

Audited the three newly added real-estate state-law modules:

- Arizona: `src/data/real-estate-az-state-questions.json`
- North Carolina: `src/data/real-estate-nc-state-questions.json`
- Indiana: `src/data/real-estate-in-state-questions.json`

The goal was to verify that each module is wired into the same product
surface as the earlier Texas, Maine, and Georgia modules, and that the
generated state-law pools meet the same baseline quality bar.

## Source alignment

| State | Source | Exam split implemented | State outline implemented |
|-------|--------|------------------------|---------------------------|
| Arizona | ADRE / Pearson VUE, effective 2026-01-01 | 80 national + 60 state | 11 state-law sections |
| North Carolina | NCREC / Pearson VUE, April 2026 | 80 national + 60 state | 8 state-law sections |
| Indiana | Pearson VUE, effective 2025-03-01 | 80 national + 50 state | 5 state-law sections |

Primary source links are recorded in `scripts/audits/real-estate-next-state-fit.md`.

## Content audit results

| State | Questions | Unique IDs | Duplicate stems | Answer balance | Min explanation | Avg explanation |
|-------|----------:|-----------:|----------------:|----------------|----------------:|----------------:|
| Arizona | 400 | 400 | 0 | 100 / 100 / 100 / 100 | 138 chars | 191 chars |
| North Carolina | 400 | 400 | 0 | 100 / 100 / 100 / 100 | 140 chars | 179 chars |
| Indiana | 400 | 400 | 0 | 100 / 100 / 100 / 100 | 155 chars | 183 chars |

Additional checks:

- Every question is `single-choice`, matching the real-estate state-law format used by the sister site.
- Every question has `portion: "state"` so `selectLicensingExam()` can compose the national/state simulator correctly.
- Every question domain matches the registered state-domain taxonomy in `src/data/certs.js`.
- Content sanity suite passes with all three modules included.

## Frontend audit results

All three modules are wired into:

- `src/data/certs.js`
- `src/pages/realestate/reCerts.js`
- `src/pages/realestate/REStudyPicker.jsx`
- `src/pages/RealEstate.jsx`
- `src/__tests__/content-sanity.test.js`

Route smoke checks confirmed the study dashboards render locally:

- `/real-estate/study/az`
- `/real-estate/study/nc`
- `/real-estate/study/in`

A new registry regression test now asserts that every real-estate state cert
is reachable from the front-end picker and has a composite national/state exam
spec.

## Verdict

Arizona, North Carolina, and Indiana meet the current baseline quality standard
for generated state-law modules and are correctly available through the
front-end study experience.
