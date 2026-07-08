# Part 107 Sister Site Content Architecture

Date: July 7, 2026

Purpose: establish the official source spine, exam model, companion-course policy, and content-generation gates for a dedicated FAA Part 107 / Remote Pilot sister site.

## Product Direction

This branch should become a single-purpose Part 107 readiness coach, not another broad certification catalog. The first public learner journey should be:

1. Confirm the learner needs the FAA Remote Pilot Certificate with small UAS rating.
2. Point them to the FAA source spine and the recommended short Udemy companion course.
3. Run a diagnostic across the FAA ACS areas.
4. Drive weak-topic practice with chart/weather/regulation evidence.
5. Finish with 60-question, two-hour UAG readiness simulations.
6. Debrief by ACS code family so the learner can repair exactly what the official test report would identify.

Positioning: use FAA materials and trusted instruction to learn, then use the sister site to diagnose, practice, repair gaps, and judge readiness. The app should not claim affiliation with the FAA, PSI, Udemy, or any course author.

## Freemium Product Model

This sister site is a freemium single-exam product. It reuses the current freecertprep study engine, but the product surface should be aggressively streamlined: one brand, one `Practice Now` landing action, then a simple free-question practice page.

## Monorepo App Boundary

The production layout keeps FreeCertPrep as the existing root app and isolates Practice107 as `apps/practice107`. The root Cloudflare config continues to deploy FreeCertPrep, while `apps/practice107/wrangler.jsonc` deploys the Part 107 site as its own Cloudflare app for `practice107.com`.

Practice107 owns its own Vite entry point, public FAA supplement images, UAG content bank, tests, local tracking hooks, and Cloudflare build output. Shared engine ideas can still be copied or promoted later, but Part 107 content and deployment state should not be routed through the FreeCertPrep frontend shell.

### Free Tier

Free access should prove quality quickly without requiring an account:

- A single `Practice Now` button starts free practice.
- The learner sees one question, answers, reviews the explanation, and moves to the next random question.
- No account is required for free practice.

Free tier constraints:

- No durable progress tracking.
- No Smart Study/adaptive weak-area queue.
- No full 60-question timed simulated exam.
- No cross-device sync, bookmarks, exam history, diagnostic history, or mastery map.

### Premium Account

Account/payment unlocks the existing engine's highest-retention features from the random-practice surface:

- Login saves misses, scores, and weak areas.
- Smart Study / adaptive weak-area practice uses saved question statistics.
- A small one-time micropayment unlocks full 60-question UAG simulated exams.
- Exam history, debriefs, ACS-code weak-area repair, and readiness trend.
- Diagnostic, mastery map, bookmarks, and due-review queues if retained from the current engine.
- Cross-device sync through the existing account snapshot/merge flow.

The account model should treat sign-in and payment entitlement separately. A signed-in learner can track practice; the full exam simulator requires an active exam entitlement.

Recommended entitlement states:

- `anonymous`: unlimited random free practice without durable tracking.
- `signed_in_free`: account exists, practice tracking and weak-area study are active, full exam is locked.
- `premium_active`: tracking, Smart Study, and simulated exams are active.
- `premium_inactive`: retain historical data, block new premium sessions, show recovery/export and renewal actions.

Question reports can remain signed-in-only or premium-only as a later product decision. Content-trust reporting has product value even from free learners, but moderation cost may justify limiting detailed reports to accounts.

## Engine Simplification

Reuse:

- `QuestionCard` answer rendering and evidence-artifact support.
- `weightedSelect` for stable 60-question forms.
- exam session, scoring, results, and debrief patterns.
- Smart Practice question-stat tracking.
- bookmarks, recent misses, due review, diagnostic, mastery map, and learning-plan utilities where they support Part 107 directly.
- Supabase auth, account snapshot, merge, backup/restore, privacy export/delete, and admin report foundations.

Streamline:

- Replace the catalog with one Part 107 dashboard.
- Remove career paths, A+ selector, Coming Soon modules, and unrelated provider language from the sister-site shell.
- Replace multi-cert navigation with: Practice Now, Sign In, Weak Areas, and Exam Sim unlock.
- Use one certification registry entry or one dedicated singleton config for UAG.
- Rename generic "certification" copy to "Part 107" / "Remote Pilot" where that is clearer.
- Keep the simulator honest: it is a UAG readiness simulation, not an FAA/PSI exam replica.

## Official Source Spine

Primary FAA sources:

- FAA Become a Certificated Remote Pilot: https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot
- FAA Knowledge Test Suggested Study Materials FAQ: https://www.faa.gov/faq/where-can-i-find-study-materials-part-107-aeronautical-knowledge-test
- Remote Pilot - Small Unmanned Aircraft Systems ACS, FAA-S-ACS-10B: https://www.faa.gov/training_testing/testing/acs/uas_acs.pdf
- FAA Airman Knowledge Testing Matrix: https://www.faa.gov/training_testing/testing/testing_matrix
- FAA Remote Pilot Study Guide, FAA-G-8082-22: https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/remote_pilot_study_guide.pdf
- FAA UAG sample questions: https://www.faa.gov/sites/faa.gov/files/training_testing/testing/test_questions/uag_questions.pdf
- UAG Applicant Information Bulletin, effective September 29, 2025: https://media.psiexams.com/faa/UAG_Information_Bulletin.pdf
- FAA Airman Knowledge Testing Supplement for Sport, Recreational, Remote, and Private Pilot, FAA-CT-8080-2H: https://www.faa.gov/training_testing/testing/supplements
- FAA Part 107 regulations summary: https://www.faa.gov/newsroom/small-unmanned-aircraft-systems-uas-regulations-part-107
- 14 CFR Part 107, current eCFR: https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107
- 14 CFR Part 89, Remote Identification of Unmanned Aircraft, current eCFR: https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-89
- 14 CFR Part 48, Registration and Marking Requirements for Small Unmanned Aircraft, current eCFR: https://www.ecfr.gov/current/title-14/chapter-I/subchapter-C/part-48
- FAA Certificated Remote Pilots / Commercial Operators overview: https://www.faa.gov/uas/commercial_operators
- FAA Part 107 Airspace Authorizations: https://www.faa.gov/uas/commercial_operators/part_107_airspace_authorizations
- FAA LAANC: https://www.faa.gov/uas/getting_started/laanc
- FAA UAS Facility Maps: https://www.faa.gov/uas/commercial_operators/uas_facility_maps
- FAA Part 107 Waivers: https://www.faa.gov/uas/commercial_operators/part_107_waivers
- FAA Remote ID: https://www.faa.gov/uas/getting_started/remote_id
- FAA drone registration: https://www.faa.gov/uas/getting_started/register_drone
- FAA B4UFLY: https://www.faa.gov/uas/getting_started/b4ufly
- FAA August 2025 Airman Testing Community Advisory: https://www.faa.gov/training_testing/testing/community_advisory_August_2025.pdf
- FAA June 2026 Airman Testing Community Advisory: https://www.faa.gov/training_testing/testing/June_2026_Edition.pdf

Secondary official references named by the ACS and study guide:

- AC 107-2, Small Unmanned Aircraft Systems
- Aeronautical Information Manual (AIM)
- Pilot's Handbook of Aeronautical Knowledge, FAA-H-8083-25
- Risk Management Handbook, FAA-H-8083-2
- Weight & Balance Handbook, FAA-H-8083-1
- AC 00-6, Aviation Weather
- AC 150/5200-32, Reporting Wildlife Aircraft Strikes
- SAFO 09013, 10015, 10017, and 15010 where relevant to battery/fire/wire/cargo risk.

## Exam Facts To Model

- Test code: UAG, Unmanned Aircraft General - Small.
- Official certificate path: first-time applicants must pass the initial aeronautical knowledge exam and complete IACRA/Form 8710-13.
- Certificate eligibility: at least 16 years old, able to read/speak/write/understand English, and physically/mentally fit to fly safely.
- FAA testing matrix: UAG has 60 questions, 2.0 hours, and 70 passing score.
- FAA matrix lists minimum test age as 14, but the certificate itself requires age 16. Product copy must keep those separate.
- ACS says the certification knowledge test uses objective multiple-choice questions with a single correct response.
- FAA August 2025 advisory says the UAG assessment made the ACS test blueprint obsolete effective September 29, 2025. Continue using the ACS for task codes and study resources, but use the UAG Applicant Information Bulletin for scored-form weighting.
- Current UAG Applicant Information Bulletin weighting:
  - Regulations: 48%
  - Airspace classification and operating requirements: 20%
  - Weather: 5%
  - Loading and performance: 2%
  - Operations: 25%
- Current 60-question scored-form allocation:
  - Regulations: 29
  - Airspace and requirements: 12
  - Weather: 3
  - Loading and performance: 1
  - Operations: 15
- PSI also lists 5 unscored validation questions on the UAG exam. The app can model readiness with 60 scored items, but paid full-sim UX should explain the real exam may include unscored validation questions.
- The official test can use figures from the FAA-CT-8080-2H supplement. Beginning October 27, 2026, FAA says UAG will also feature questions with embedded images not included in the test supplement. The sister site should support both supplement-reference and embedded-image-style practice before that date.

## ACS Content Map

Use ACS task codes as first-class metadata:

- I. Regulations
  - UA.I.A General
  - UA.I.B Operating Rules
  - UA.I.C Remote Pilot Certification with an sUAS Rating
  - UA.I.D Waivers
  - UA.I.E Operations Over People
  - UA.I.F Remote Identification
- II. Airspace Classification and Operating Requirements
  - UA.II.A Airspace Classification
  - UA.II.B Airspace Operational Requirements
- III. Weather
  - UA.III.A Sources of Weather
  - UA.III.B Effects of Weather on Performance
- IV. Loading and Performance
  - UA.IV.A Loading and Performance
- V. Operations
  - UA.V.A Radio Communications Procedures
  - UA.V.B Airport Operations
  - UA.V.C Emergency Procedures
  - UA.V.D Aeronautical Decision-Making
  - UA.V.E Physiology
  - UA.V.F Maintenance and Inspection Procedures

Every question should carry:

- `domain`: one of the five ACS areas.
- `acsTask`: e.g. `UA.I.B`.
- `acsCode`: the most specific knowledge element when practical, e.g. `UA.I.B.K10`.
- `sourceRefs`: one or more official source identifiers.
- `evidenceType`: regulation, sectional/chart, METAR/TAF, airport data, scenario, loading/performance, radio/airport, remote ID, LAANC/UASFM, or maintenance/preflight.

## Companion Course Policy

Recommended paid companion course:

- Udemy: `(Core) 4hr FAA Part 107 Knowledge Test Prep for Drone Pilots`
- URL: https://www.udemy.com/course/3-hour-faa-107-knowledge-test-prep-for-remote-pilots/
- Instructor: Britton Spader
- Public metadata checked July 7, 2026: 11 sections, 32 lectures, 4h 13m total length, last updated January 2026.

Allowed use:

- Recommend the course as an optional companion for learners who want a compact guided walkthrough.
- Align our study plan topics to public course section headings such as Regulations, Airspace, Weather, ADM/CRM, Loading and Performance, Aeromedical Factors, Emergency Procedures, Airport Operations, Radio Communications, Maintenance, and Preflight.
- Link to the course with clear third-party/non-affiliation language.

Not allowed unless the user supplies their own notes or licensed excerpts:

- Do not copy Udemy lecture scripts, quiz questions, downloadable materials, screenshots, or paid-course explanations.
- Do not imply Udemy is an official source.
- Do not make the app dependent on paid material; FAA materials remain the source of truth.

## Question Bank Strategy

Implemented live bank, July 8, 2026: six certified 60-question UAG forms, 360 source-reviewed questions total.

Rationale: the prior 720-question generated bank was too repetitive and too placeholder-heavy for a paid exam simulation product. The live Part 107 path now uses a 360-question certified pool built as six complete forms. The generated 720-question pool has been deleted completely and no longer remains as a code export, fallback source, or learner-facing option.

Certified live-pool allocation across all 360 questions:

- Regulations: 174
- Airspace and requirements: 72
- Weather: 18
- Loading and performance: 6
- Operations: 90

Each certified form preserves the current 60-question UAG allocation:

- Regulations: 29
- Airspace and requirements: 12
- Weather: 3
- Loading and performance: 1
- Operations: 15

Certification status:

- `premiumExamReady`: true
- Certified question count: 360
- Certified full-form count: 6
- Certified date: July 8, 2026
- Current scope: six paid 60-question simulation forms plus random free practice and Smart Study from the same certified pool.
- Real FAA figure assets rendered locally from FAA-CT-8080-2H: Figures 12, 20, 21, 26, and 59.
- Visual/stimulus coverage: 60 figure/METAR image questions total, 10 per certified form.

Question types:

- Official-style `single-choice`: all simulated exam forms. UAG practice should use three answer choices to match the FAA sample-question pattern.
- Evidence-led single-choice:
  - regulation excerpts and operating-limit scenarios
  - sectional/chart interpretation
  - METAR/TAF and weather-source interpretation
  - LAANC/UASFM authorization scenarios
  - Remote ID/registration scenarios
  - airport operations/radio monitoring scenarios
  - loading/performance/CG scenarios
  - maintenance/preflight/emergency scenarios
- Learning-only formats may be added later, but the formal UAG simulator should stay single-choice unless FAA format guidance changes.

Premium status:

- Live free practice, Smart Study, and full exam simulation all draw from the certified 360-question pool.
- The prior generated pool has been removed from the repository surface for Part 107.
- The micropayment can unlock six complete 60-question UAG exam simulations while product copy avoids implying FAA affiliation, PSI score prediction, or unlimited unique forms.
- The next premium upgrade should deepen the bank beyond six forms only by adding reviewed stems, new source-backed visual assets, and embedded-image-style items without lowering review standards.

## Quality Gates

Minimum gates before public release:

- Exact question count and domain allocation match the editorial blueprint.
- All simulated forms are 60 three-choice single-choice questions, two-hour mode, 70 readiness target, using the current 48/20/5/2/25 scored-content weighting.
- Each named certified form and randomized simulator draw preserve the current 29/12/3/1/15 allocation and avoid repeated exact stems.
- Premium full-exam simulation can use only `premiumEligible` items with `reviewStatus: source-reviewed`, source references, ACS task/code metadata, and the current FAA/PSI blueprint.
- The live certified pool must keep 360 exact unique stems and six exact 60-question form allocations.
- No generated filler artifacts in learner-facing content: fake town suffixes, obvious customer/client permission tells, or distractors that are impossible instead of merely wrong.
- Visible evidence must never reveal the correct answer. It may show the stimulus (METAR, TAF group, UASFM grid, scenario facts, raw finding), but answer-key fields such as meaning, risk, correct action, safer response, or approval status belong in the post-answer explanation.
- Do not show FAA-CT figure/area references unless an actual supplement figure image is rendered. The current rendered assets live under `public/part107/stimuli/`.
- Every question has `acsTask`, `acsCode` where possible, and official source metadata.
- No Udemy-only fact may appear without FAA/eCFR support.
- No question asks trivia about the source documents themselves.
- Every explanation should state the reasoning directly without canned labels such as "why this is right" or "why this is wrong."
- Each certified form includes 10 image-stimulus questions from actual FAA supplement figures or METAR figures.
- Weather and loading are intentionally light in each certified form because the current UAG blueprint weights them at 5% and 2%.
- Regulation coverage is intentionally dominant because the current UAG blueprint weights regulations at 48%.
- Gate for October 27, 2026 readiness: embedded-image-style UAG items must be represented before the FAA testing change becomes active.

## UI / Sister Site Implications

The Part 107 site should not look like the IT catalog. Recommended first screen:

- Brand signal: practice107.com.
- Primary content: a simple landing page with a `Practice Now` button.
- Practice destination: one question with answer choices, feedback, and next random.
- Support actions: Sign In, Weak Areas, Exam Sim micropayment can remain outside the simple practice card.
- Keep source links, Udemy recommendation, and detailed ACS/source status out of the first screen.
- Avoid a premium panel on the first screen; keep exam sim as a small action beside practice.
- No broad catalog, no career-path grid, no unrelated certifications.

## Open Decisions

- Final brand/domain name.
- Whether root `/` should become the Part 107 sister-site landing immediately on this branch.
- Payment provider and entitlement storage.
- Whether random free practice should remain unlimited or later receive abuse/rate limits.
- Whether free users can create accounts before purchase or account creation happens only during upgrade.
- Whether to store FAA chart/supplement figures locally as derivative practice artifacts or require external source links only.
