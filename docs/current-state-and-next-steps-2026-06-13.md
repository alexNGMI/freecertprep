# Current State and Next Steps

Last updated: June 14, 2026

## Executive Summary

freecertprep is in a consolidation phase. The repository contains 11,693 authored questions across 17 IT certifications, while the public catalog deliberately exposes eight modules and marks nine as Coming Soon. The current product is useful: its focused homepage, career directions, dashboard, objective learning loops, Smart Practice, drills, simulations, review, bookmarks, and local progress tracking form a coherent study workflow.

The next release should make that workflow more trustworthy and durable, not larger.

The June 14 full-codebase review found four priorities:

1. make privacy, licensing, and search/share claims match the implementation;
2. protect local learner data from silent write failure, unbounded history, and refresh-only result loss;
3. make cert-specific audits and browser smoke part of the release gate;
4. reduce duplicated status data and oversized modules before they become expensive to change.

Detailed review: `docs/codebase-review-and-action-plan-2026-06-14.md`.

The requested execution order began with content quality, then trust correctness. The A+ full-bank overhaul and trust/metadata pass are now complete. Local data durability is the next active phase.

## Current Public Offering

### Live

| Certification | Readiness | Current Direction |
| --- | --- | --- |
| CompTIA A+ Core 1 | A+ | Full-bank interaction rewrite, 20 practicals, and 500-form gate verified |
| CompTIA A+ Core 2 | A+ | Full-bank interaction rewrite, 20 practicals, and 500-form gate verified |
| CompTIA Network+ | A- | Preserve objective ledger and practical form gates |
| CompTIA Security+ | A- | Preserve objective ledger and mixed-interaction gates |
| Splunk Core Certified User | B+ | Maintain evidence, uniqueness, and explanation gates |
| HashiCorp Terraform Associate | B+ | Maintain objective and operational-review gates |
| AWS Cloud Practitioner | A- | Maintain source and release alignment |
| AWS Solutions Architect - Associate | A- | Maintain architecture-focused review |

### Coming Soon

AZ-900, Google Cloud Digital Leader, CCST Networking, CCNA, NVIDIA AI Infrastructure and Operations, NVIDIA Generative AI LLMs, Server+, Linux+, and Schneider DCCA remain authored and preserved. They stay out of the live catalog until a current source audit, cert-specific quality gate, and B+ readiness decision are complete.

### Hidden and Deferred

- Real Estate remains an internal review build.
- NVIDIA and Data Center Technician path routes remain implemented but hidden.
- CDL and NCLEX remain future sister-site concepts.
- CCNA remains parked until Cisco 200-301 v2.0 becomes active on February 3, 2027 and the bank is re-audited.

## Verified Baseline

- 1,237 tests pass across 36 files.
- Production dependency audit reports zero vulnerabilities.
- Homepage and catalog have no horizontal overflow at 1280px or 390px.
- The public offering contains eight live and nine Coming Soon modules.
- Question banks are lazy-loaded by certification.
- Both A+ cores grade A+; Network+ and Security+ grade A-; Splunk and Terraform grade B+.
- Catalog expansion remains frozen.

## Ordered Next Steps

### 1. A+ Structured Quality Overhaul - Completed June 14, 2026

- rebuilt all 1,520 questions around objective- and domain-correct decisions;
- eliminated repeated and cross-objective answer interactions in both 760-question banks;
- removed generic matching, ordering, and statement templates from the production pools;
- gave every selected-response item structured right-answer, distractor, and verification guidance;
- doubled each practical pool from 10 to 20 evidence-based PBQ-lite interactions;
- validated 500 domain-balanced, category-complete forms per core;
- reassessed both cores at A+ under the project readiness rubric.

Detailed record: `scripts/audits/aplus-structured-quality-audit-2026-06-14.md`.

### 2. Trust and Metadata Correctness - Completed June 14, 2026

- removed the third-party homepage visitor counter;
- replaced Google-hosted fonts with a local system font stack;
- corrected privacy language around locally stored study data;
- refreshed root search, Open Graph, Twitter, and sharing-image metadata;
- added an MIT license and restored accurate open-source language.

### 3. Local Data Durability

- cap or compact session history;
- show a warning when browser storage cannot save;
- persist the latest completed result across refresh;
- create a versioned full backup for progress, Smart Practice statistics, and bookmarks;
- add active-session resume only after completed-result recovery is reliable.

### 4. Release Automation

- create one `verify:quality` command;
- include all cert-specific audits in CI;
- add a small desktop/mobile browser smoke suite for the critical learner journey;
- eliminate the current Recharts sizing warnings;
- keep the manual first-user checklist as a final human gate.

### 5. Maintainability

- make catalog status derive from one certification registry;
- generate repeated counts and status summaries from registry data;
- split `QuestionCard.jsx` by interaction family;
- split the in-app Docs page into data-driven sections;
- archive completed one-off content generation scripts.

### 6. A+ Content Maintenance

- preserve the zero-repeated-interaction and 20-practical gates;
- recheck the official 220-1201 and 220-1202 source pages during release reviews;
- sample explanations and practical evidence during normal editorial maintenance;
- maintain Splunk and Terraform without increasing question counts;
- keep Coming Soon promotion paused.

## Completed Foundation

- live source and release audit;
- Terraform learning-value pass;
- first-user journey hardening;
- session completion and malformed-storage recovery fixes;
- Network+ structured full-bank audit and A- grade;
- Security+ structured full-bank audit and A- grade;
- focused A+/Networking/Cybersecurity/Cloud presentation;
- public catalog split into Live and Coming Soon.

## Decision Rule

Work is ready when it makes the current learner experience more accurate, recoverable, testable, or maintainable. New catalog entries remain out of scope until the remaining durability, release, maintainability, and A+ remediation phases are complete.
