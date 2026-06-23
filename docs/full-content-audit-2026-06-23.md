# Full Content Audit

Date: June 23, 2026

## Purpose

This audit checks whether the current freecertprep content is accurate, exam-like, useful as a course companion, and safe to keep live. It covers the nine public IT modules:

- CompTIA A+ Core 1
- CompTIA A+ Core 2
- CompTIA Network+
- Cisco CCST Networking
- CompTIA Security+
- AWS Cloud Practitioner
- AWS Solutions Architect - Associate
- Splunk Core Certified User
- HashiCorp Terraform Associate

The audit does not treat automated tests as proof of exam quality. Automated tests can prove schema validity, uniqueness, domain allocation, and form composition. Exam quality also requires editorial judgment: correct answers must be defensible, distractors must be plausible but wrong, stems must resemble the vendor's tested reasoning level, and explanations must teach the right lesson.

## Source Baseline

Official or primary sources checked for this audit:

- AWS CLF-C02 exam guide: https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html
- AWS SAA-C03 exam guide: https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html
- Splunk Core Certified User blueprint: https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-user.pdf
- HashiCorp Terraform Associate 004 certification page: https://developer.hashicorp.com/certifications/infrastructure-automation
- HashiCorp Terraform Associate 004 prep guide/objective review: https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-review-004
- Cisco CCST Networking exam page: https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccst-networking.html
- Cisco CCST exams and training page: https://www.cisco.com/site/us/en/learn/training-certifications/certifications/support-technician/exams-training.html
- CompTIA A+ Core 1 source page tracked in the app: https://www.comptia.org/en-us/certifications/a/core-1-v15/
- CompTIA A+ Core 2 source page tracked in the app: https://www.comptia.org/en-us/certifications/a/core-2-v15/
- CompTIA Network+ source page tracked in the app: https://www.comptia.org/en-us/certifications/network/
- CompTIA Security+ source page tracked in the app: https://www.comptia.org/en-us/certifications/security/

Important source notes:

- AWS states CLF-C02 uses multiple-choice and multiple-response questions, has 50 scored and 15 unscored questions, reports a 100-1000 scaled score, and has domain weights of 24/30/34/12.
- AWS states SAA-C03 uses multiple-choice and multiple-response questions, has 50 scored and 15 unscored questions, reports a 100-1000 scaled score, and has domain weights of 30/26/24/20.
- Splunk's blueprint states Core Certified User is a 60-question, entry-level, 60-minute seat-time exam, with blueprint weights of 5/22/20/15/15/12/6/5.
- HashiCorp's current certification page identifies Terraform Associate 004 and Terraform 1.12 as the tested product version.
- Cisco states CCST Networking 100-150 is a 50-minute entry-level networking exam and a first step toward CCNA.
- The CompTIA source pages are tracked in `src/data/certSources.js`; the repository source metadata currently reflects the correct public exam code, timing, max question count, scaled score, and PBQ caveat for the live CompTIA modules.

## Audit Method

Commands run:

```bash
npm run audit:aplus
npm run audit:netplus
npm run audit:secplus
npm run audit:terraform
npm run audit:comptia-objectives
npm run audit:clf-c02
npm run audit:saa-c03
npm run audit:splunk
npm run audit:ccst
```

All cert-specific gates passed.

Additional manual/heuristic review performed:

- deterministic sample review across all nine live banks;
- source metadata freshness review;
- question type distribution review;
- domain and objective thin-spot review;
- stale terminology and deprecated-service scan;
- distractor plausibility scan;
- repeated-template scan;
- explanation depth and learning-value review;
- exam-format fidelity review.

One high-confidence content defect was fixed during this audit:

- `aplus-core2-611` had a change-management distractor that was effectively also correct. The distractor was rewritten so only the intended answer remains defensible.

## Executive Summary

The live content is good enough to remain live. The current offering is strongest as a course companion and readiness coach, not as a claim that the app perfectly recreates vendor exam delivery.

The strongest banks are A+ Core 1, A+ Core 2, Network+, Security+, and SAA-C03. The most realistic practical simulation remains Network+. The strongest structured explanations are A+, SAA, Splunk, Terraform, and CCST. The weakest exam-likeness issues are not raw correctness; they are repetition, limited PBQ fidelity, and a few banks that still feel more like concept drills than vendor exam items.

The priority order should be:

1. Network+ explanation upgrade.
2. Security+ practical/evidence expansion.
3. CLF-C02 service freshness pass.
4. SAA-C03 template-diversity pass.
5. Terraform thin-objective and stem-depth pass.
6. CCST scenario realism pass.
7. Splunk UI/SPL evidence polish.
8. A+ distractor ambiguity sampling maintenance.

## Remediation Update

Completed later on June 23, 2026:

- Added `audit:distractors` to detect duplicate answer choices and ambiguous process-best-practice distractors across the live banks.
- Added `audit:aws-freshness` to block retired or no-longer-current AWS service references from CLF-C02 and SAA-C03 banks.
- Removed AWS OpsWorks and AWS Cloud9 from the live AWS Cloud Practitioner pool. CodeCommit was retained after current AWS documentation confirmed it is generally available again.
- Added an enforced SAA-C03 repeated-template ceiling of 175 groups; the current bank remains under it at 160.
- Added four Terraform Associate questions for the thinnest objectives: state purpose, state mapping, HCP Terraform CLI integration, and VCS speculative-plan integration. Terraform now has 651 questions and 536 evidence-led items.
- Reworded CCST clue-to-term prompts into first-response classification prompts and added an audit ceiling to prevent the old phrasing from returning.
- Added Splunk evidence-title minimums for event samples, SPL pipelines, statistical results, saved object review, lookups, and scheduled reports or alerts.
- Wired the new distractor and AWS freshness gates into `verify:quality`.

Remaining work is now maintenance-oriented rather than catalog-expansion oriented:

1. Keep `verify:quality` green before deploys.
2. Spot-check Network+ and Security+ explanation depth during normal editorial maintenance.
3. Reduce SAA template pressure opportunistically without changing domain allocation.
4. Re-run this audit before promoting any Coming Soon module.

## Grades

| Module | Accuracy | Exam-Likeness | Learning Value | Live Status |
| --- | --- | --- | --- | --- |
| A+ Core 1 | A | A- | A+ | Keep live |
| A+ Core 2 | A- | A- | A+ | Keep live; sample distractors periodically |
| Network+ | A- | A | B+ | Keep live; upgrade explanations |
| Security+ | A- | A- | B+ | Keep live; add more log/config/topology evidence |
| AWS CLF-C02 | B+ | B+ | B+ | Keep live; refresh service freshness |
| AWS SAA-C03 | A- | B+ | A | Keep live; diversify templates |
| Cisco CCST Networking | B+ | B | B+ | Keep live; make less flashcard-like |
| Splunk Core User | A- | B+ | A- | Keep live; add more UI/search-result evidence |
| Terraform Associate | B+ | B | A- | Keep live; deepen thin objectives |

## Module Findings

### CompTIA A+ Core 1

Automated status:

- 760 questions.
- 635 single-choice, 105 multiple-response, 20 PBQ-lite matching.
- Zero exact or canonical duplicate stems.
- 760 unique answer interactions.
- 27 official objectives covered.
- Every objective has at least 18 questions.
- 500 randomized forms validated.

Editorial assessment:

- Accuracy is strong. The sampled answers were technically correct and aligned to support-technician work.
- Explanations are high value and usually follow a clear why-right / why-wrong / verification structure.
- Exam-likeness is good, but many stems use a recurring generated support phrasing pattern: technician, affected device, documented method, verify under original conditions. This is useful for learning but can feel more templated than a real CompTIA form.
- PBQ-lite coverage is meaningful but not equivalent to CompTIA's real interactive PBQ delivery.

Risk:

- Low correctness risk.
- Moderate repetition/style risk.

Next action:

- Keep live.
- During normal maintenance, sample 25 questions per domain for distractor ambiguity and stem-template fatigue.

### CompTIA A+ Core 2

Automated status:

- 760 questions.
- 635 single-choice, 105 multiple-response, 20 PBQ-lite matching.
- Zero exact or canonical duplicate stems.
- 760 unique answer interactions.
- 36 official objectives covered.
- Every objective has at least 14 questions.
- 500 randomized forms validated.

Editorial assessment:

- Accuracy is broadly strong.
- The Core 2 sample surfaced one confirmed ambiguous distractor in `aplus-core2-611`; it has been fixed.
- Security and operational-procedure questions are generally useful, but generated distractor sets occasionally include choices that are valid in general and wrong only because the stem asks a narrower task.
- Explanations are strong, but when a distractor is broadly valid, the generic "unsafe, unrelated, or does not directly satisfy" phrasing can feel too blunt.

Risk:

- Low to moderate distractor ambiguity risk.
- Low objective coverage risk.

Next action:

- Keep live.
- Run a focused Core 2 distractor ambiguity review over Security and Operational Procedures before calling the bank fully settled.

### CompTIA Network+

Automated status:

- 760 questions.
- 52 practical questions.
- Types include topology, CLI output, config repair, PBQ matching, ordering, statement-block, matching, and subnetting drills.
- Zero duplicate stems.
- Zero repeated template groups.
- 27 official objectives covered.
- 500 randomized forms validated with at least eight practicals and required practical categories.

Editorial assessment:

- This is the most exam-like live CompTIA bank because it includes the richest technical evidence mix.
- CLI output, topology, config repair, and subnetting items are directionally correct for Network+ readiness.
- Objective coverage has thin spots: objectives 1.3, 1.5, and 5.1 each have only five to six questions.
- Explanations are accurate but often short. They explain the answer but do not consistently provide the deeper "why distractors fail" coaching now present in newer banks.

Risk:

- Low practical realism risk.
- Moderate explanation-depth risk.
- Moderate objective-depth risk in a few small objectives.

Next action:

- Keep live.
- Upgrade explanations to the A+/SAA style.
- Add or rewrite items in the thin objectives without increasing total count unless needed.

### CompTIA Security+

Automated status:

- 760 questions.
- 33 practical questions.
- Zero duplicate stems.
- Zero repeated template groups.
- Zero objective fallbacks.
- 28 official objectives covered.
- 500 randomized forms validated with the required interaction mix.

Editorial assessment:

- Accuracy is strong at the foundational Security+ level.
- The bank covers security governance, architecture, threats, operations, IAM, monitoring, and incident response well.
- Practical count is lower than Network+ and the evidence-led count is lower than the strongest simulation bank.
- Some explanations are concise rather than deeply diagnostic. They are usually correct but not always as instructive as the A+/SAA/Splunk/Terraform explanations.

Risk:

- Low correctness risk.
- Moderate simulation-depth risk.

Next action:

- Keep live.
- Add more log interpretation, IAM/policy review, firewall/rule review, alert triage, and incident-response evidence.
- Upgrade explanations to consistently include why-right, why-wrong, and operational takeaway.

### AWS Cloud Practitioner

Automated status:

- 731 questions.
- 687 official-style selected-response questions.
- 44 supplemental learning-format questions.
- 660 scenario/context-led questions.
- Zero duplicate stems.
- Zero repeated template groups.
- Domain allocation matches the official 24/30/34/12 weights.
- 500 randomized 65-question forms validated.

Editorial assessment:

- Domain weighting is strong.
- The bank correctly treats CLF-C02 as conceptual and service-identification focused.
- Some supplemental matching/ordering formats are useful for learning but should remain clearly excluded from official-style simulations.
- The bank should receive a service freshness pass. AWS service availability and branding changes can age quickly; CodeCommit and other older developer-tool references deserve review.
- Explanations are generally shorter than the newer flagship banks.

Risk:

- Moderate freshness risk due to AWS service churn.
- Low domain-alignment risk.

Next action:

- Keep live.
- Run a CLF-C02 freshness pass for retired, restricted, renamed, or de-emphasized AWS services.
- Upgrade explanations where they are short.

### AWS SAA-C03

Automated status:

- 750 questions.
- 600 single-choice and 150 multiple-response.
- Domain allocation exactly matches the official 30/26/24/20 weights.
- 750 structured architecture explanations.
- No short explanations.
- 500 randomized 65-question forms validated.
- 160 repeated architecture-template groups tracked.

Editorial assessment:

- Architecture reasoning is strong and aligned to SAA-C03's secure/resilient/high-performing/cost-optimized design posture.
- Explanations are among the best in the catalog.
- Multiple-response formatting is appropriately exam-like.
- The main weakness is template diversity. Many items are technically unique but share the same sentence skeleton with rotated industry/context details.
- This does not necessarily make answers wrong, but it can reduce perceived exam realism and memorization resistance.

Risk:

- Low accuracy risk.
- Moderate template-fatigue risk.

Next action:

- Keep live.
- Diversify 80-120 repeated-template items into more natural AWS scenario language.
- Preserve the existing domain allocation and structured explanation quality.

### Cisco CCST Networking

Automated status:

- 750 questions.
- 450 single-choice, 150 multiple-response, 75 matching, 75 ordering.
- 750 evidence-led questions.
- Zero duplicate stems.
- Domain allocation matches the six CCST topic areas used by the current gate.
- 500 randomized 50-question forms validated.

Editorial assessment:

- Good entry-level networking foundation.
- The bank is useful for CCST concept reinforcement and CCNA pathway preparation.
- Many questions are closer to clue-to-term concept checks than real troubleshooting scenarios.
- Distractors are sometimes obviously from other domains, which makes questions easier than a real exam item.
- The lack of CLI/topology/config/subnetting item types keeps it below Network+ in simulation realism.

Risk:

- Low concept accuracy risk.
- Moderate exam-likeness risk.

Next action:

- Keep live as a foundation module.
- Add more realistic first-response troubleshooting scenarios, basic topology reading, address/subnet interpretation, and device-role selection.

### Splunk Core Certified User

Automated status:

- 750 questions.
- 690 official-style selected-response questions.
- 60 supplemental learning drills.
- 690 evidence-led selected-response questions.
- Zero duplicate stems.
- Domain allocation matches Splunk's official 5/22/20/15/15/12/6/5 blueprint.
- 500 randomized 60-question selected-response forms validated.

Editorial assessment:

- Accuracy is strong.
- SPL basics, fields, pipeline behavior, transforming commands, reports, dashboards, lookups, scheduled reports, and alerts are all represented.
- Explanations are structured and useful.
- The bank would become more exam-like with more actual SPL result tables, UI state descriptions, dashboard/report settings, and alert configuration examples.
- Matching/ordering drills are useful learning formats but should remain outside official-style simulation forms.

Risk:

- Low accuracy risk.
- Moderate UI/context realism opportunity.

Next action:

- Keep live.
- Add richer SPL/result/dashboard evidence to selected-response items without changing official simulation format.

### HashiCorp Terraform Associate

Automated status:

- 651 questions.
- 595 single-choice, 32 multiple-response, 24 true/false.
- 37 implemented Associate 004 subobjectives covered.
- 651 structured explanations.
- 536 evidence-led questions.
- Zero duplicate stems.
- No legacy Terraform Cloud references.
- No blueprint-trivia prompts.

Editorial assessment:

- Good learning value and strong operational explanations.
- The bank correctly uses Terraform Associate 004 and Terraform 1.12 as the source baseline.
- Several objectives remain intentionally small, but the thinnest 2d and 8d objectives were raised from three to five questions during remediation.
- Stems are often short and direct. This fits some Terraform Associate question style, but the bank would benefit from more applied HCL, plan, state, provider, backend, variable, and HCP Terraform snippets.
- True/false items are acceptable for HashiCorp-style prep but should not dominate perceived readiness.

Risk:

- Low source alignment risk.
- Moderate depth/thin-objective risk.

Next action:

- Keep live.
- Continue deepening small objectives when it improves applied HCL, plan, state, backend, provider, variable, and HCP Terraform reasoning.
- Replace some short recall stems with HCL/plan/state evidence scenarios.

## Cross-Catalog Findings

### What Is Working

- The live catalog is source-aligned enough to remain public.
- The official domain allocations are generally well protected.
- The highest-value banks have diagnostics, mastery maps, study plans, exam debriefs, and case practice.
- No live bank showed duplicate-stem problems in the automated gates.
- The app correctly avoids claiming official vendor scaled scoring.
- The current local-first model remains appropriate for a free practice product.

### What Is Not Fully Solved

- PBQ fidelity is still an approximation, especially for CompTIA.
- Cisco CCST and Terraform need more scenario realism.
- SAA-C03 needs more natural variation in scenario templates.
- CLF-C02 needs service freshness review because AWS changes quickly.
- Network+ and Security+ explanations lag behind the newer structured-explanation standard.
- Distractor ambiguity can still appear in generated banks even when all structural gates pass.

## Recommended Remediation Plan

### Phase 1: Protect Live Trust

1. Add a distractor-ambiguity audit for A+ and other generated banks.
2. Add a stale-service scan for AWS banks.
3. Add a repeated-template pressure score for SAA and CCST.
4. Add explanation-structure gates for Network+ and Security+.

### Phase 2: Improve Exam-Likeness

1. Network+: upgrade explanations and deepen thin objectives 1.3, 1.5, and 5.1.
2. Security+: add more practical evidence and structured explanations.
3. CLF-C02: review CodeCommit and other aging AWS services against the current AWS service-reference list.
4. SAA-C03: rewrite the highest-repeat template groups into more natural scenario variants.
5. Terraform: expand thin objectives and add more HCL/plan/state examples.
6. CCST: add basic topology/addressing/troubleshooting scenarios.
7. Splunk: add more SPL result tables and UI-state evidence.

### Phase 3: Ongoing Editorial Quality

1. Recheck official sources monthly while the site is public.
2. For each live module, manually review 25 randomized questions per release.
3. Track all confirmed content corrections in a correction ledger.
4. Add user report persistence through Supabase before heavy public promotion.

## Final Decision

The live modules should stay live.

The current product is useful and honest when positioned as:

- free practice;
- local-first progress tracking;
- course companion;
- readiness signal;
- not an official score predictor;
- not a perfect recreation of confidential PBQ systems.

The next content work should not expand the catalog. It should tighten the live modules, starting with explanation quality, distractor ambiguity, service freshness, and scenario realism.
