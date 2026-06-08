# Terraform Associate question-bank audit

Audit date: 2026-05-17

Question file: `src/data/terraform-associate-questions.json`
Registry entry: `src/data/certs.js` (`terraform-associate`)

## Current status

The local bank is structurally valid and currently passes content sanity.

- Pool size: 632 questions after the 004 delta and format-fidelity passes
- Format mix: 576 single-choice, 24 true/false, and 32 multiple-answer
- Domains: 8 Terraform Associate 004 objective groups
- Answer index distribution: 0=141, 1=140, 2=150, 3=169
- Short explanations: 0 questions under 80 characters after explanation expansion
- Tests: content sanity, full Vitest suite, lint, and build were green before this audit

## Official target drift

HashiCorp's official current Terraform Associate prep material is now
**Terraform Associate 004**, testing **Terraform 1.12**.

Official references:

- HashiCorp Cloud Engineer Certification page:
  `https://developer.hashicorp.com/certifications/infrastructure-automation`
- Terraform Associate 004 learning path:
  `https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-study-004`
- Terraform Associate 004 exam content list:
  `https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-review-004`

At the start of this audit, the app labeled the cert as `TF Associate
003`, so the first product correction was to retarget this module to
Associate 004.

## Original local domains before migration

| Local domain | Count |
|---|--:|
| Understand infrastructure as code (IaC) concepts | 49 |
| Understand the purpose of Terraform (vs other IaC) | 49 |
| Understand Terraform basics | 74 |
| Use the core Terraform workflow | 93 |
| Implement and maintain state | 85 |
| Read, generate, and modify configuration | 82 |
| Interact with Terraform modules | 71 |
| Use Terraform outside the core workflow | 60 |
| Understand Terraform Cloud capabilities | 37 |

## Terraform Associate 004 objective shape

The 004 content list reorganizes the exam into 8 objective groups:

1. Infrastructure as Code (IaC) with Terraform
2. Terraform fundamentals
3. Core Terraform workflow
4. Terraform configuration
5. Terraform modules
6. Terraform state management
7. Maintain infrastructure with Terraform
8. HCP Terraform

## Question format fidelity

HashiCorp's official Associate 004 sample-question page states that the exam
uses true/false, multiple-choice, and multiple-answer questions and that the
questions are intended to test Terraform knowledge without trick wording.

The production pool now mirrors those formats:

- 24 true/false questions, three in every objective group
- 32 multiple-answer questions, four in every objective group
- 576 single-choice questions

Every 57-question simulated form guarantees at least three true/false and four
multiple-answer questions while preserving the configured objective allocation.
The selection behavior is covered by randomized automated tests.

Mapping from current local domains:

| Current local domain | 004 target |
|---|---|
| Understand infrastructure as code (IaC) concepts | 1. Infrastructure as Code (IaC) with Terraform |
| Understand the purpose of Terraform (vs other IaC) | 1. Infrastructure as Code (IaC) with Terraform |
| Understand Terraform basics | 2. Terraform fundamentals |
| Use the core Terraform workflow | 3. Core Terraform workflow |
| Read, generate, and modify configuration | 4. Terraform configuration |
| Interact with Terraform modules | 5. Terraform modules |
| Implement and maintain state | 6. Terraform state management |
| Use Terraform outside the core workflow | 7. Maintain infrastructure with Terraform |
| Understand Terraform Cloud capabilities | 8. HCP Terraform |

## Implementation notes

### Product metadata

Completed:

- Updated `src/data/certs.js` from the legacy Associate 003 code to current
  Terraform Associate 004 wording.
- Updated README/docs references from 003 to 004.
- Updated user-facing description language from "Terraform Cloud" to
  "HCP Terraform" where appropriate.
- Added a 32-question 004 delta batch, bringing the pool to 632.

### Domain taxonomy

The current 9-domain taxonomy is still mostly conceptually aligned, but
the public exam target is now 8 groups. For user clarity, migrate the
cert domains and question `domain` fields to the 004 objective names.

Recommended migration:

- Merge `Understand the purpose of Terraform (vs other IaC)` into
  `Infrastructure as Code (IaC) with Terraform`.
- Rename:
  - `Understand Terraform basics` -> `Terraform fundamentals`
  - `Use the core Terraform workflow` -> `Core Terraform workflow`
  - `Read, generate, and modify configuration` -> `Terraform configuration`
  - `Interact with Terraform modules` -> `Terraform modules`
  - `Implement and maintain state` -> `Terraform state management`
  - `Use Terraform outside the core workflow` -> `Maintain infrastructure with Terraform`
  - `Understand Terraform Cloud capabilities` -> `HCP Terraform`

### HCP Terraform coverage gaps

The local bank has good coverage of workspaces, remote operations, VCS
workflow, policy checks, private registry, variable sets, run triggers,
team access, audit logging, and run tasks.

Originally missing or thin 004 topics:

- HCP Terraform Explorer
- Change requests
- Workspace health / health assessments
- Dynamic provider credentials
- Projects as the canonical grouping model
- Terraform 1.12 as the tested product version

### Language updates

The bank already uses "HCP Terraform" in many places, but still contains
39 hits for "Terraform Cloud". Most are phrased as "HCP Terraform
(Terraform Cloud)" and can be kept briefly during transition, but the
004-facing app should prefer "HCP Terraform".

Review IDs:

`tf-48`, `tf-49`, `tf-50`, `tf-96`, `tf-97`, `tf-98`, `tf-99`, `tf-100`,
`tf-123`, `tf-149`, `tf-150`, `tf-198`, `tf-199`, `tf-200`, `tf-208`,
`tf-248`, `tf-249`, `tf-250`, `tf-298`, `tf-299`, `tf-300`, `tf-348`,
`tf-349`, `tf-350`, `tf-398`, `tf-399`, `tf-400`, `tf-448`, `tf-449`,
`tf-450`.

### Short explanations to expand

These explanations are correct-looking but too terse for exam-quality
prep. Expand them to include why distractors are wrong or what the
exam-taker should remember.

`tf-82`, `tf-195`, `tf-213`, `tf-218`, `tf-259`, `tf-264`, `tf-266`,
`tf-268`, `tf-311`, `tf-316`, `tf-367`, `tf-369`, `tf-380`, `tf-383`,
`tf-415`, `tf-418`, `tf-420`, `tf-436`, `tf-438`, `tf-443`, `tf-462`,
`tf-467`, `tf-474`, `tf-494`, `tf-496`, `tf-509`, `tf-512`, `tf-513`,
`tf-516`, `tf-517`, `tf-518`, `tf-520`, `tf-522`, `tf-524`, `tf-527`,
`tf-545`, `tf-549`, `tf-560`, `tf-564`, `tf-572`, `tf-575`, `tf-576`,
`tf-578`, `tf-580`, `tf-581`, `tf-582`, `tf-588`, `tf-594`, `tf-597`,
`tf-598`.

### Deprecated or nuance-sensitive items

These should be reviewed carefully, not necessarily deleted:

- `taint` references: `tf-29`, `tf-177`, `tf-219`, `tf-370`, `tf-426`,
  `tf-518`, `tf-578`
  - Keep only if the item teaches that `-replace` is preferred over
    deprecated `terraform taint`.
- CLI workspaces: `tf-228`, `tf-229`, `tf-323`, `tf-324`, `tf-325`,
  `tf-379`, `tf-428`
  - Keep, but ensure they are not framed as a best practice for all
    environment separation. 004 emphasizes HCP Terraform workspaces and
    projects too.
- `terraform refresh`: `tf-378`
  - Prefer refresh-only plan/apply language for modern workflows.
- Terraform Enterprise: `tf-223`
  - Still relevant, but make sure the wording distinguishes HCP Terraform
    from Terraform Enterprise correctly.

## Implementation completed

1. Retargeted metadata and docs from Associate 003 to Associate 004.
2. Renamed/merged Terraform question domains to the 004 objective taxonomy.
3. Expanded the 50 short explanations.
4. Added 32 new 004-specific questions (`tf-601` through `tf-632`) for
   lifecycle dependency rules, custom conditions, ephemeral/write-only
   sensitive handling, HCP Terraform Explorer, change requests, projects,
   health assessments, drift, dynamic credentials, and Terraform 1.12
   framing.
5. Expanded 147 additional explanations that were under the catalog-wide
   100-character quality floor and rebalanced single-choice answer positions
   to `{0: 158, 1: 158, 2: 158, 3: 158}`.

Final verification should run `npm run validate:content`, `npm test`,
`npm run lint`, and `npm run build`.
