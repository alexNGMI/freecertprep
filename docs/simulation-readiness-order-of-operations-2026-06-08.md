# Simulation Readiness Order of Operations

Date: June 8, 2026  
Purpose: Convert the board report into a practical remediation plan and grade each current offering by how realistic and useful it is as an exam simulation.  
Basis: `docs/board-report-2026-06-08.md`, current cert registry, current question banks, automated content tests, existing audit files, and a June 8, 2026 source check against official/vendor exam information.

Step-four audit completed June 8, 2026:

- `scripts/audits/live-bank-simulation-readiness-audit-2026-06-08.md`
- Scope: A+ Core 1, A+ Core 2, and Splunk Core Certified User.
- The audit confirms stable form allocation and strong surface uniqueness.
- The initial audit found that A+ was materially thin at the official objective level: Core 1 used 44 concept templates and Core 2 used 36 across 750 generated questions each.
- A+ remediation completed June 8, 2026: Core 1 now uses 84 concepts across all 27 official objectives; Core 2 uses 94 across all 36. Both now grade B+.

## Executive Takeaway

freecertprep has enough catalog breadth. The next competitive advantage is not "more exams"; it is credible exam simulation.

The current product is strongest when the real exam is selected-response only or mostly selected-response: AWS CLF-C02, AWS SAA-C03, Google CDL, Splunk Core User, Real Estate national/state modules, and many foundational cloud exams. It is weaker when the real exam depends on rich interactive performance tasks: CompTIA PBQs, Cisco CCNA simulations, Microsoft interactive item types, and Linux+ command/task simulations.

## June 13 Consolidation Review

The original remediation plan has now completed its A+, Network+, Security+, Splunk, source-release, and Terraform quality sequence. The current repository passes 1,237 tests across 36 files. The active sequence is:

1. Completed June 13: verified source/version and public-copy freshness for the then-nine live modules; the audit moved future-v2.0 CCNA to Coming Soon.
2. Completed June 13: polished Terraform review quality without increasing its 647-question pool.
3. Completed June 13: hardened the complete first-user journey on desktop and mobile.
4. Active: keep promotion paused and continue runtime, persistence, recovery, and routing hardening.

CCNA is preserved as a Coming Soon v2.0 preview because Cisco v1.1 remains active through February 2, 2027. The trust-layer backend, account sync, Real Estate re-publication, and sister-site expansion remain deferred. See `docs/current-state-and-next-steps-2026-06-13.md` for the current decision record.

## Current Quality Sequence

Updated June 13, 2026:

1. Completed June 13, 2026: Network+ interaction depth added cable maps, routing-table evidence, wireless survey artifacts, multi-artifact troubleshooting, component coaching, and four-category form guarantees.
2. Completed June 13, 2026: Security+ interaction depth added log triage, ordered firewall-rule evaluation, incident correlation, control placement, component coaching, and four-category form guarantees.
3. Completed June 13, 2026: Splunk editorial polish shortened stems, strengthened distractors, added evidence artifacts to all selected-response items, and standardized review explanations.

CCNA remains parked during this sequence. The goal is to improve the realism and learning value of the current live CompTIA and Splunk offerings before returning to advanced Cisco work or catalog expansion.

## Public Catalog Decision

Implemented June 8, 2026:

- Live: A+ Core 1, A+ Core 2, CLF-C02, SAA-C03, Network+, Security+, Splunk Core User, and Terraform Associate.
- Coming Soon: AZ-900, Google CDL, CCST Networking, CCNA, NVIDIA AIIO, NVIDIA GENL, Server+, Linux+, and Schneider DCCA.
- Homepage lanes: A+, Networking, Cybersecurity, and Cloud only.
- NVIDIA and Data Center Technician lanes remain implemented but are removed from homepage discovery.
- Real Estate remains in the codebase and is reachable only from Docs for internal review.

The default rule is B+ simulation readiness or better plus alignment to the actively delivered exam release. A+ Core 1, A+ Core 2, and Terraform meet the readiness bar. CCNA is held because its bank targets future v2.0 rather than active v1.1.

The remediation program should therefore follow this order:

1. Fix product claims, scoring language, source metadata, and release safety.
2. Add a trust/source layer before rewriting large volumes of content.
3. Upgrade the simulator engine where real exams use richer interaction types.
4. Rewrite the weakest live banks.
5. Re-audit real estate source/version confidence.
6. Only then expand into new sister sites or additional advanced certifications.

## Grading Rubric

Grades are not a judgment of whether the questions are "valid." They answer a narrower board question: how well does the current offering simulate the real exam experience and produce useful readiness practice?

| Grade | Meaning | Product Interpretation |
| --- | --- | --- |
| A | Strong simulation | Blueprint, timing, item types, difficulty, explanations, and review value are close enough for public confidence. |
| B | Useful practice with known gaps | Good learner value, but one meaningful simulation gap remains. |
| C | Study bank more than simulator | Content is useful, but the exam experience is materially simplified or editorially inconsistent. |
| D | Not yet credible as a simulator | Significant interaction, source, or content-quality gap. Should be labeled preview or remediated quickly. |
| F | Should not be live | Major accuracy or architecture problems. No current offering is graded F. |

Scoring dimensions:

- Blueprint fidelity: domain weights, current exam version, and source confidence.
- Format fidelity: question count, time, selected-response vs interactive tasks, and scoring model.
- Content realism: plausible stems, distractors, difficulty, scenario authenticity, and repetition.
- Explanation value: whether review mode teaches why the answer is right and why alternatives are wrong.
- Operational trust: source ledger, review dates, issue reporting, and correction workflow.

## Current Offering Grades

### IT Certification Catalog

| Certification | Current Grade | Why | Main Gap | Immediate Action |
| --- | --- | --- | --- | --- |
| AWS Cloud Practitioner, CLF-C02 | A- | Strong fit for AWS selected-response format; 731 questions; exam count/time align to 65 / 90; no duplicate-stem issues in prior audit. | App does not distinguish scored vs unscored AWS items, and passing target is simplified. | Rename score to readiness target; add source/version card. |
| AWS Solutions Architect - Associate, SAA-C03 | A- | 750 questions, exact official domain weighting, strong scenario orientation, very strong explanations. | AWS uses scored + unscored items and scaled scoring; some normalized stems repeat structurally because scenarios share patterns. | Keep live; add architecture-case review polish and source ledger. |
| Microsoft Azure Fundamentals, AZ-900 | B | Blueprint ranges are current; 600 questions; supports statement, ordering, matching, and multiple-response practice. | Microsoft does not publish exact format per candidate and uses a score of 700/1000; app uses fixed 40-question simulation and limited hotspot/build-list style interaction. | Adjust simulator to 40-60 optional mode or label fixed 40 as practice form; add Microsoft-style yes/no and build-list polish. |
| Google Cloud Digital Leader | A- | Official exam is 50-60 multiple-choice questions over 90 minutes; current 749-question six-section pool aligns well. | App fixes 50 questions instead of 50-60; explanations can be more business-outcome oriented. | Keep live; add 50-60 variable form option later. |
| NVIDIA AI Infrastructure & Operations | B | Official page says 50 questions / 60 minutes; domain split is aligned after rebalance. | Only 336 questions, lower scenario realism, and some NVIDIA operational topics need more applied data-center context. | Expand to 500-750 after higher-priority rewrites; add GPU cluster/logistics scenarios. |
| NVIDIA Generative AI LLMs | B- | Good foundational selected-response fit; 330 questions; covers NVIDIA LLM associate topics. | Low scenario rate; needs stronger applied RAG, inference, evaluation, safety, and deployment tradeoff items. | Expand and scenario-ize only after Linux+/DCCA/Splunk polish. |
| CCST Networking, 100-150 | B | 750 questions and close blueprint alignment; good entry networking practice. | Real Cisco exam interface and item set are simplified; high normalized repetition means some items feel templated. | Rewrite repeated normalized clusters; add more packet/output evidence. |
| CCNA, 200-301 | Preview | Strong advanced simulation surface: CLI output, topology scenarios, config repair, subnetting drills, and 750 future-v2.0 questions. | Cisco v1.1 remains active through February 2, 2027; the bank targets v2.0 and cannot be labeled current-exam practice. | Keep Coming Soon; re-audit against the active v2.0 release on or after February 3, 2027. |
| A+ Core 1, 220-1201 | B+ | 760 unique stems, 84 concepts, all 27 official objectives covered, objective/domain gates, plausible domain-level distractors, repaired multiple-response items, and ten evidence-based PBQ-lite scenarios. | PBQ delivery remains an approximation of CompTIA's proprietary interactive environment; some objectives remain intentionally broader than individual bullet-level skills. | Maintain the automated objective matrix and expand practical artifacts during future PBQ-engine work. |
| A+ Core 2, 220-1202 | B+ | 760 unique stems, 94 concepts, all 36 official objectives covered, complete malware-response coverage, repaired distractors and multiple-response items, and ten evidence-based PBQ-lite scenarios. | PBQ delivery and confidential vendor scoring cannot be reproduced exactly. | Maintain objective coverage and add richer settings, command, and policy artifacts over time. |
| Network+, N10-009 | B+ | 760 questions, exact domain allocation, 32 practical items, complete metadata across all 27 numbered objectives, and ten enriched PBQs with cable, routing, wireless, and multi-artifact category guarantees. | Browser practice approximates rather than reproduces CompTIA's proprietary PBQ interface and scoring. | Maintain current objective, practical-category, and form-composition gates. |
| Security+, SY0-701 | B+ | 760 questions, exact domain allocation, 33 practical items, complete metadata across all 28 numbered objectives, and ten enriched PBQs with log, firewall, incident, and control-placement guarantees. | Browser practice approximates rather than reproduces CompTIA's proprietary PBQ interface and scoring. | Maintain current objective, practical-category, and form-composition gates. |
| Server+, SK0-005 | B | 760 questions, strong blueprint fit, PBQ-lite included. | Needs server hardware/config/storage troubleshooting simulations; exam has performance-based items. | Add rack/power/storage/RAID/boot troubleshooting PBQs. |
| Linux+, XK0-006 | C | Strong architecture direction and useful CLI/config item types. | Prior audit found 509 generic single-choice items and heavy normalized repetition; real exam includes performance-based items. | First major content rewrite: convert generic single-choice clusters into concrete command/output/task scenarios. |
| Splunk Core Certified User | B+ | Exact blueprint allocation, 750 exact and normalized-unique stems, concise selected-response forms, rendered search evidence, and structured review explanations. | Browser practice remains an independent approximation rather than Splunk's confidential delivery interface. | Keep live; maintain the generator gates and perform normal source/version review. |
| Schneider Data Center Certified Associate | C | Vendor-source topic architecture is useful; 750 questions across data-center physical infrastructure. | Heavy normalized duplication and obvious distractors; official exam-source details are less pinned than major vendors. | Rewrite repeated facility scenarios; pin current official exam guide/source package. |
| Terraform Associate 004 | B+ | The 647-question Terraform 1.12 pool covers all 37 implemented subobjectives with at least two concepts each, uses the official formats, has 647 normalized-unique stems, and provides structured operational review. | HashiCorp does not publish objective weights, live items, a fixed question count, or a raw passing percentage. | Keep live; maintain the new evidence, explanation, uniqueness, and 500-form gates. |

### Real Estate Sister Product

| Module | Current Grade | Why | Main Gap | Immediate Action |
| --- | --- | --- | --- | --- |
| Real Estate National | A- | 750 single-choice questions; real estate national exams are selected-response and vocabulary/scenario heavy; strong explanations. | Needs pinned current national outline/version record. | Add source ledger and review date. |
| Texas Sales Agent | B | National + state composition is useful and matches combined-exam practice structure in the app. | Texas 2026 state scoring/pretest language needs source reconciliation because handbook outline and scored/pretest counts can be confusing. | Reconcile TX source note and label scored/pretest assumptions clearly. |
| Maine Sales Agent | B+ | Clean state module and good national-plus-state architecture. | Needs pinned official handbook version and review date in public trust layer. | Source-ledger pass. |
| Georgia Salesperson | C+ | Useful state practice, but board report already flags source-confidence inconsistency. | Current stable PSI/GREC bulletin must be pinned before production-confidence claims. | Treat as highest-priority real-estate source audit. |
| Arizona Salesperson | B | The current official Pearson VUE handbook describes a 60-item state-specific salesperson section effective January 1, 2026, and the local state-domain map follows that outline. | Public web summaries conflict about the broader delivery structure, so the exact national/state scheduling model should be re-verified directly against Pearson VUE/ADRE before stronger claims. | Pin the current official handbook and document the simulator assumption; do not rely on third-party restructuring claims. |
| North Carolina Broker | B | Current registry models 80 national + 60 state, matching the intended state/national structure in local source notes. | Needs official source ledger and separately scored pass/readiness language. | Add source record and score-label cleanup. |
| Indiana Broker | B | 50-item state outline source is pinned in local notes; state bank exists and composition is useful. | Some normalized repetition appears in the state bank; source metadata is not exposed publicly. | Rewrite repeated state-law clusters; add source ledger. |

## Detailed Order of Operations

### Phase 0: Stop Trust Leakage

Status: completed in the app shell on June 8, 2026. The remaining item under this phase is continuing metadata/social-description refresh work rather than blocking setup.

Goal: remove avoidable credibility risk before content rewrites.

1. Completed: changed the main exam/results flow from pass/fail language to readiness-target language where appropriate.
2. Completed: added a short simulator disclaimer that vendor exams may include unscored items, scaled scoring, or richer interaction types.
3. Completed: added provider non-affiliation language to IT and Real Estate study footers.
4. Completed: added source/version fields in a companion source file:
   - exam code/version
   - official source URL
   - source checked date
   - item-count model
   - scoring model
   - question-type model
   - editorial status
5. Completed: added visible source-check, official-source, editorial-status, and report-an-issue affordances on IT and Real Estate dashboards.
6. Still useful: continue refreshing static metadata and social descriptions from the registry so homepage/docs/social descriptions do not drift.

Acceptance criteria:

- No cert page implies exact scaled-score equivalence.
- Every live cert has a source record, even if status is "needs review."
- Automated tests fail if a published cert lacks source metadata.

### Phase 1: Build the Trust Layer Skeleton

Goal: create the backend-ready quality system before more large edits.

1. Implement issue reporting locally first:
   - question ID
   - cert ID
   - issue type
   - user note
   - selected answer/result context if available
2. Add a simple backend endpoint or serverless form handler.
3. Create an internal moderation queue model:
   - open
   - investigating
   - corrected
   - rejected
   - source update needed
4. Store source metadata separately from question JSON so it can be updated without rewriting the whole pool.
5. Add correction history fields for future use.

Acceptance criteria:

- A learner can report a questionable item from review mode.
- Reports are persisted somewhere reliable.
- Internal review can identify cert, question, source, and current answer key.

### Phase 2: Fix Simulation Language and Scoring

Goal: make every simulator honest about what it is approximating.

1. Replace percentage "passingScore" display with certification-specific copy:
   - AWS: readiness target aligned to scaled 700/1000 or 720/1000, not a raw score guarantee.
   - CompTIA: readiness target aligned to scaled 675/700/720/750 out of 900 depending exam.
   - Microsoft: readiness target aligned to 700/1000.
   - Cisco CCNA: readiness target because Cisco does not publish a simple universal raw pass percentage.
   - Splunk/Real Estate/DCCA/Terraform: keep percentage only where vendor/exam materials support it.
2. Add "unscored item" notes for AWS and real estate where applicable.
3. Add variable-count simulator support for exams with official ranges:
   - Google CDL: 50-60.
   - Microsoft AZ-900: if exact current count remains unpublished, label current fixed form as a practice form.
   - NVIDIA GENL if current vendor wording remains 50-60.
4. Keep full-length practice stable by default, but let docs explain approximation boundaries.

Acceptance criteria:

- User-facing language is accurate without weakening confidence.
- The app no longer treats all passing thresholds as raw percentages.

### Phase 3: Add Missing Interaction Engines

Goal: close the biggest realism gaps before rewriting thousands of stems.

Status update, June 8, 2026:

- PBQ simulation v1 is production-ready for Network+ and Security+ using the tested interaction engine.
- Network+ has 32 practical items across PBQ matching, topology, command output, and configuration repair.
- Security+ has 33 practical items across PBQ matching, log triage, segmentation topology, and security-control repair.
- The 760-question pool size and official domain allocation for both certifications remain unchanged because weaker single-choice items were upgraded in place.
- Every generated 90-question form is tested to preserve exact domain allocation and include at least six practical items.
- Review mode displays component-level correctness for multi-part items while retaining honest binary readiness scoring.
- The next interaction milestone is richer cable-map, firewall-builder, and multi-artifact tasks rather than another large selected-response expansion.

Priority widgets:

1. CompTIA PBQ engine v1:
   - drag/drop category placement
   - topology/cabling map
   - command-output evidence
   - troubleshooting ticket with multiple artifacts
   - simple simulated settings panel
2. Security+ log triage widget:
   - firewall/auth/log snippets
   - choose incident type
   - choose immediate containment action
   - map control to finding
3. Network+ topology and subnet widget:
   - diagram with links/devices/VLANs
   - routing table or ARP evidence
   - choose failing segment or config repair
4. Linux+ terminal task widget:
   - read command output
   - choose next command
   - repair config snippet
5. Azure build-list / yes-no-set / hotspot-style approximation:
   - no need to clone Microsoft UI, but practice should map closer to common Microsoft item behavior.

Acceptance criteria:

- Question schema supports each widget cleanly.
- Existing single-choice/matching/ordering behavior remains stable.
- Results review can explain widget scoring.
- Tests cover correct and incorrect submissions for each widget.

### Phase 4: Rewrite Weakest Live Banks

Goal: improve live quality where learner trust is most vulnerable.

#### 4.1 Linux+

Why first: it has useful advanced item types, but prior audit and the latest scan show heavy normalized repetition.

Actions:

1. Rewrite generic single-choice items into concrete scenarios.
2. Increase CLI-output and config-repair coverage.
3. Replace repeated distractors with plausible Linux administrator mistakes.
4. Add service, storage, permissions, SELinux/AppArmor, container, network, and scripting tasks.
5. Expand explanations with command reasoning and why dangerous alternatives are wrong.

Acceptance criteria:

- Normalized duplicate item count drops materially.
- No repeated generic distractor appears across large clusters.
- At least 30% of Linux+ pool uses command/output/config/task evidence.

#### 4.2 Schneider DCCA

Why second: high value for the new Data Center Technician path, but repeated facility stems undermine realism.

Actions:

1. Pin official Schneider source package and exam details.
2. Rewrite repeated "candidate is evaluating" frames into facility-specific constraints.
3. Add data-center operations scenarios:
   - power path
   - cooling failure
   - humidity
   - fire suppression
   - rack/cabling
   - access control
   - monitoring alarms
4. Replace obvious distractors with realistic but flawed data-center decisions.

Acceptance criteria:

- Normalized duplicate clusters drop sharply.
- Every domain has facility-context scenarios.
- DCCA path copy can honestly claim role-relevant physical-infrastructure practice.

#### 4.3 Splunk

Why third: the blueprint fit is strong, so this is a polish pass with high ROI.

Actions:

1. Completed June 8, 2026: removed synthetic "ticket SPL-###" and "scenario includes" phrasing.
2. Completed June 8, 2026: rebuilt repeated clusters with concrete SPL, event, field, result-set, lookup, report, dashboard, and alert evidence.
3. Completed June 8, 2026: expanded explanations with applied guidance and distractor distinctions.
4. Completed June 8, 2026: limited the official-style 60-question / 60-minute simulator to selected-response items.
5. Completed June 13, 2026: removed repeated synthetic time-window and result-count filler, reducing median stem length from 290 to 221 characters and the 90th percentile from 417 to 257.
6. Completed June 13, 2026: added compact rendered search evidence to all 690 selected-response items and standardized every explanation into correct-choice rationale, distractor analysis, and review takeaway.
7. Completed June 13, 2026: retired weak distractor language and raised normalized structural uniqueness to 750.

The language cleanup exposed 156 normalized duplicate stem groups containing 609 questions. The first evidence rewrite raised exact uniqueness to 750 and structural uniqueness to 529. The June 13 pass now measures 750 exact and normalized-unique stems while keeping the official blueprint allocation unchanged.

Acceptance criteria:

- No synthetic ticket markers.
- Review mode teaches field/search/report/dashboard concepts clearly.
- Normalized structural uniqueness remains at 750.
- Median stem length remains at or below 230 characters and the 90th percentile at or below 270.
- Every selected-response item retains compact console or result-table evidence.

#### 4.5 A+ Core 1 and Core 2

Status update, June 8, 2026:

- Removed synthetic ticket identifiers from both 760-question live banks.
- Retained legitimate support-ticket wording inside handcrafted PBQ-lite scenarios where triage itself is being practiced.
- The cleanup exposed 114 duplicate stem groups covering 475 Core 1 questions and 108 groups covering 404 Core 2 questions.
- Completed the first evidence rewrite: both banks now contain 760 exact and normalized-unique stems, no generated ticket framing, and at least 120 characters of applied explanation for every generated item.
- Formal 90-question forms now guarantee at least six of the ten handcrafted PBQ-lite scenarios and exclude statement-block learning drills.

Next actions:

1. Completed June 8, 2026: replace repeated frames with device scope, observed behavior, prior checks, and operational constraints.
2. Completed June 8, 2026: preserve the current blueprint allocation, 760-question pool size, and ten handcrafted PBQ-lite items per core.
3. Completed June 8, 2026: require explanations to identify why the chosen action is safer or more diagnostic than alternatives.
4. Completed June 8, 2026: mapped and expanded the concept templates against every official Version 2.0 objective. Core 1 now uses 84 concepts and Core 2 uses 94.
5. Completed June 8, 2026: the readiness audit confirmed material objective-breadth gaps, generic multiple-response answers, and weak cross-domain distractors. See the step-four audit for the ordered remediation plan.

#### 4.4 CCST and CCNA

Why fourth: these anchor the Networking path and job-value positioning.

Actions:

1. CCST: rewrite repeated normalized clusters and add more practical evidence.
2. CCNA: improve advanced scenarios rather than increasing count:
   - more OSPF evidence
   - more VLAN/trunk symptoms
   - more NAT/PAT and ACL repair
   - more wireless and management operations
   - richer topologies
3. Add scoring notes that CCNA practice is simulation-backed but not Cisco's actual exam engine.

Status update, June 13, 2026: CCNA moved to Coming Soon after the source audit confirmed that its bank targets future v2.0 while v1.1 remains active through February 2, 2027.

Acceptance criteria:

- CCNA remains preserved and visible as a Coming Soon path milestone.
- CCST feels less templated.
- Network path copy can say: "Network+ or CCST for foundation, CCNA for Cisco associate readiness."

### Phase 5: Reconcile Real Estate

Goal: keep the sister site credible before adding more states.

Actions:

1. Create a real estate source ledger by jurisdiction.
2. Georgia: pin current official PSI/GREC source before strong publication-readiness language.
3. Arizona: pin and re-verify the current official Pearson VUE/ADRE delivery model. The official handbook currently supports the 60-item state outline used by the bank, while some third-party summaries conflict about how the broader exam is scheduled.
4. Texas: clarify scored/pretest and state-outline count assumptions.
5. Indiana and Texas: reduce state-bank duplicate clusters.
6. Add state-specific review date badges.

Acceptance criteria:

- Every real estate module has source version, checked date, and simulator assumption.
- Arizona simulator assumptions are tied to the current official handbook rather than third-party summaries.
- Georgia source status is no longer ambiguous.

### Phase 6: Content Gates and CI

Goal: prevent the same quality problems from returning.

Add automated checks for:

1. Missing source metadata.
2. Synthetic phrases:
   - "scenario includes"
   - "ticket XYZ-###"
   - "candidate is evaluating" overuse
   - repeated generic prompts
3. Normalized duplicate clusters above threshold.
4. Repeated distractor phrases above threshold.
5. Explanation depth thresholds by cert tier:
   - foundational: concise but specific
   - associate/simulation-backed: why-right and why-wrong required
6. Question-type minimums for exams with PBQs or advanced interactions.

Acceptance criteria:

- New 600-750 question banks cannot ship with hidden repetition.
- Advanced certs cannot publish without interaction-type coverage.

### Phase 7: Expansion Gate

Only resume major catalog expansion when:

1. No known high-severity dependency issue remains.
2. Every live cert has source metadata.
3. The live-source sweep remains current.
4. Terraform quality gates remain green.
5. The first-user journey passes the desktop/mobile release checklist.
6. The candidate module independently meets the B+ readiness bar and active-release alignment.

After that, the most rational expansion options are:

1. CCST Networking promotion, if networking-path depth is the priority.
2. Server+ promotion, if infrastructure support is the priority.
3. Linux+ only with a substantial command/output rewrite.
4. AZ-900 or Google CDL if a selected-response cloud module is the best low-risk promotion.
5. DCCA, NVIDIA, Real Estate, CDL, and NCLEX only when those product lanes become active priorities.

## Priority Backlog

### P0

- Completed June 13, 2026: audited the then-nine live modules and corrected CCNA's future-release mismatch.
- Keep catalog visibility, Docs, README, and source metadata synchronized.
- Run dependency, test, lint, and build release gates.

### P1

- Completed June 13, 2026: Terraform review-quality pass with 647 structured explanations, 532 supporting evidence artifacts, stronger distractors, uniqueness gates, and 500-form audits.
- Completed June 13, 2026: first-user journey audit stabilized Smart Practice result context, added direct Recent Misses handoffs, protected incomplete exam submission, raised mobile nav targets to 44px, and added a release checklist.
- Completed June 13, 2026: reliability pass froze timed-drill forms, made session completion idempotent, hardened progress imports, removed exam-timer state-updater side effects, and prevented stale cert content during route transitions.
- Maintain the completed A+, Network+, Security+, and Splunk quality gates.

### P2

- CompTIA PBQ engine v1.
- Completed June 13, 2026: Network+ enriched ten PBQ scenarios with two correlated artifacts each, component-level coaching, cable/routing/wireless/multi-artifact category metadata, and 500-form category audits.
- Completed June 13, 2026: Security+ enriched ten PBQ scenarios with two correlated artifacts each, component-level coaching, log/firewall/incident/control category metadata, and 500-form category audits.
- Completed June 13, 2026: Splunk stem, distractor, result-evidence, and review-explanation polish across the full 750-question pool.
- Parked: CCNA topology and multi-command troubleshooting polish.
- Completed June 9, 2026: Network+ and Security+ objective metadata, accuracy/coverage dashboard, objective practice, recent-miss queue, and spaced due-review queue.
- Completed June 9, 2026: A+ Core 1 and Core 2 joined the Objective Learning Loop with all 63 learner-facing objective labels, targeted practice, recent-miss and due-review queues, objective dashboard signals, support-oriented review cues, and post-session recommendations.
- Completed June 13, 2026: A+ PBQ-lite v2 enriched all 20 practicals with task briefs, console/table/checklist artifacts, per-component feedback, and category-balanced 90-question forms. Automated audits generate 500 forms per core and require at least six practicals while preserving domain allocation.
- Completed June 8, 2026: Terraform true/false and multiple-answer support with guaranteed mixed-format exam forms.

PBQ simulation v1 completed June 8, 2026: Network+ and Security+ forms guarantee at least six practical scenarios, preserve exact blueprint allocation, and provide component-level review for multi-part items. The Network+, Security+, A+, and Splunk interaction/editorial passes completed June 13.

### P3

- Re-grade Coming Soon candidates and promote only one at a time.
- CCST synthetic-ticket and normalized-cluster cleanup before publication.
- Linux+ command/output rewrite before publication.
- DCCA source and facility-scenario rewrite before publication.
- NVIDIA scenario expansion only if its hidden path becomes a product priority.
- Real Estate source reconciliation remains deferred while the sister product is hidden.

## Strategic Interpretation

The product should not claim to be an exact replica of vendor exam engines. That is unnecessary and risky. The stronger promise is:

> freecertprep provides exam-shaped practice: current blueprint weighting, realistic timing, scenario-based review, transparent source status, and specialized interaction practice where the real exam demands it.

That promise is achievable with the current architecture. The immediate missing layer is release discipline across source freshness, review quality, and the complete first-user journey. A backend trust workflow remains valuable later, but it is not required for the next quality milestone.

## Source Notes

Official/vendor sources checked for this plan include:

- Microsoft AZ-900 study guide and Microsoft exam sandbox / exam-experience guidance: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900 and https://learn.microsoft.com/en-us/credentials/support/exam-duration-exam-experience
- AWS CLF-C02 and SAA-C03 exam guides: https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html and https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html
- Google Cloud Digital Leader certification guide and exam page: https://cloud.google.com/learn/certification/guides/cloud-digital-leader and https://cloud.google.com/learn/certification/cloud-digital-leader
- NVIDIA AI Infrastructure & Operations certification page: https://www.nvidia.com/en-us/learn/certification/ai-infrastructure-operations-associate/
- NVIDIA Generative AI LLMs certification page: https://www.nvidia.com/ja-jp/learn/certification/generative-ai-llm-associate/
- Cisco CCNA active v1.1 page, release schedule, and future v2.0 topics: https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html , https://learningnetwork.cisco.com/s/ccna-exam-topics , and https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf
- Cisco CCST FAQ and CCST Networking material: https://www.cisco.com/site/us/en/learn/training-certifications/certifications/support-technician/faq.html
- CompTIA A+, Network+, Security+, Linux+, Server+, and PBQ guidance: https://www.comptia.org/certifications/a/ , https://www.comptia.org/en-us/certifications/network/ , https://www.comptia.org/en-eu/certifications/security/ , https://www.comptia.org/certifications/linux , https://www.comptia.org/en-us/certifications/server/ , and https://www.comptia.org/en/resources/test-policies/exam-development/performance-based-questions-explained/
- Splunk Core Certified User certification page and blueprint: https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-user.html and https://www.splunk.com/content/dam/splunk2/en_us/pdfs/training/splunk-test-blueprint-user.pdf
- HashiCorp Terraform Associate 004 prep and sample-question guidance: https://developer.hashicorp.com/certifications/infrastructure-automation and https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-questions-004
- Schneider Electric University DCCA overview: https://www.se.com/us/en/about-us/university/
- Pearson VUE real estate handbooks and pages for Texas, Arizona, and Indiana, plus local registry/audit notes for Maine, Georgia, North Carolina, and state composition assumptions.
