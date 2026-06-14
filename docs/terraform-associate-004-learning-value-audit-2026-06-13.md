# Terraform Associate 004 Learning-Value Audit

Date: June 13, 2026

## Scope

This pass improves the existing Terraform Associate 004 bank as a learning and
review product without expanding or rebalancing it. The source spine remains
HashiCorp's official Terraform Associate 004 certification page, study path,
exam content list, and sample-question guidance.

Official references:

- `https://developer.hashicorp.com/certifications/infrastructure-automation`
- `https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-study-004`
- `https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-review-004`
- `https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-questions-004`

HashiCorp currently identifies Terraform 1.12 as the tested product version and
describes the Associate exam as a one-hour, multiple-choice assessment. Its
sample material includes true/false, single-answer, and multiple-answer items.

## Preserved Guarantees

| Measure | Result |
| --- | ---: |
| Questions | 647 |
| Objective groups | 8 |
| Implemented subobjectives | 37 |
| Single-choice | 591 |
| True/false | 24 |
| Multiple-answer | 32 |
| Simulated form size | 57 |
| Minimum true/false per form | 3 |
| Minimum multiple-answer per form | 4 |

The local objective map contains 37 subobjectives across the eight published
groups. Earlier project notes called this 35; the automated source-of-truth map
and bank currently cover 37 distinct IDs (`1a` through `8d`) with at least two
editorial concepts per objective.

## Learning-Value Improvements

- Reframed all generic `Which command` and `What command` openings with concise
  operational context while preserving the tested decision and correct answer.
- Replaced weak distractors based on impossible absolutes with plausible
  misconceptions about provider, state, workflow, module, and HCP Terraform
  responsibilities.
- Reworked every explanation into three review anchors:
  `Why this is right`, `Why the alternatives are wrong`, and
  `Operational takeaway`.
- Added rendered evidence to operational questions where plan output, state
  inspection, HCL configuration, diagnostic logs, or HCP Terraform run context
  helps the learner reason from evidence.
- Preserved exact and normalized stem uniqueness across all 647 items.

## Automated Gates

`scripts/audit_terraform_objective_coverage.mjs` now rejects:

- pool, domain, or format allocation drift;
- missing or mismatched objective metadata;
- thin objective/concept coverage;
- duplicate exact or normalized stems;
- unstructured or short review explanations;
- generic command-choice openings;
- malformed evidence artifacts;
- legacy Terraform Cloud branding;
- unsafe deprecated `terraform refresh` or `terraform taint` guidance; and
- blueprint-meta questions.

`src/__tests__/terraform-learning-value.test.js` independently verifies bank
allocation, explanation quality, evidence structure, uniqueness, and 500
randomized 57-question forms.

## Readiness Assessment

The bank remains a B+ simulation. This pass materially improves review mode and
operational reasoning, but it does not claim HashiCorp psychometric equivalence
or access to undisclosed live exam items. The strongest next improvement would
be a manual editorial sample across every objective, focused on subtle
Terraform 1.12 behavior and distractor accuracy.
