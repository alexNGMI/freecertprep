# Live-Bank Simulation Readiness Audit

Date: June 8, 2026

Scope:

- CompTIA A+ Core 1, 220-1201
- CompTIA A+ Core 2, 220-1202
- Splunk Core Certified User, SPLK-1001

This is the step-four audit after the language and evidence rewrites. It evaluates whether the banks behave like useful exam simulations, not merely whether their JSON is valid or every stem is unique.

## Official source spine

CompTIA:

- https://www.comptia.org/en/certifications/a/core-1-v15/
- https://partners.comptia.org/docs/default-source/resources/comptia-a-220-1201-exam-objectives-%282-0%29.pdf
- https://partners.comptia.org/docs/default-source/resources/comptia-a-220-1202-exam-objectives-%282-0%29.pdf

Splunk:

- https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-user.html
- https://www.splunk.com/content/dam/splunk2/en_us/pdfs/training/splunk-test-blueprint-user.pdf
- https://www.splunk.com/en_us/pdfs/training/splunk-certification-exams-study-guide.pdf

## Audit method

The audit used:

- exact domain and item-type counts;
- normalized stem uniqueness;
- unique correct-answer and explanation concepts by domain;
- 1,000 generated forms per certification for allocation and type behavior;
- systematic scans for generated ticket language and generic answer patterns;
- representative question review across every domain and item type;
- comparison with current official objective families and exam-format descriptions.

## Executive findings

1. Surface uniqueness is no longer the primary issue.
2. A+ blueprint breadth is the largest remaining content risk.
3. A+ distractors are frequently too easy because they come from unrelated technical domains.
4. Every generated A+ multiple-response item uses the same generic second correct answer: verify and document.
5. Splunk maps substantially better to its compact official blueprint, but its questions are verbose and its paired multiple-response items often feel like learning drills.
6. Domain allocation and simulator-form generation are stable for all three banks.

## Quantitative results

| Metric | A+ Core 1 | A+ Core 2 | Splunk |
| --- | ---: | ---: | ---: |
| Pool size | 760 | 760 | 750 |
| Exact unique stems | 760 | 760 | 750 |
| Normalized unique stems | 760 | 760 | 529 |
| Formal form size | 90 | 90 | 60 |
| Handcrafted PBQ-lite items | 10 | 10 | N/A |
| Guaranteed PBQ-lite per form | 6 | 6 | N/A |
| Single-choice items | 558 | 551 | 592 |
| Multiple-response items | 94 | 93 | 98 |
| Generic verification answer in MR items | 94 | 93 | 0 |
| Statement-block learning drills | 65 | 65 | 0 |
| Median stem length | 42 words | 41 words | 48 words |

### Generated form behavior

A+ Core 1 forms consistently allocate:

- Mobile Devices: 12
- Networking: 21
- Hardware: 22
- Virtualization and Cloud Computing: 10
- Hardware and Network Troubleshooting: 25

A+ Core 2 forms consistently allocate:

- Operating Systems: 25
- Security: 25
- Software Troubleshooting: 21
- Operational Procedures: 19

Splunk forms consistently allocate:

- Splunk Basics: 3
- Basic Searching: 13
- Using Fields in Searches: 12
- Search Language Fundamentals: 9
- Using Basic Transforming Commands: 9
- Creating Reports and Dashboards: 7
- Creating and Using Lookups: 4
- Creating Scheduled Reports and Alerts: 3

## A+ Core 1 findings

### What works

- Current 220-1201 domain weights and 90-minute form length are represented.
- Facts sampled in mobile hardware, DHCP/DNS, basic networking tools, CPU/RAM/storage, virtualization, printers, and troubleshooting were generally correct.
- Ten handcrafted PBQ-lite items provide useful troubleshooting, storage, wireless, printer, and virtualization practice.
- Formal forms guarantee practical coverage and exclude statement-block learning drills.
- Explanations identify the intended support principle and discourage unrelated replacement or configuration work.

### Main readiness gap: breadth

The 750 generated questions originate from 44 concept templates:

| Domain | Pool questions | Distinct single-choice answer concepts |
| --- | ---: | ---: |
| Mobile Devices | 100 | 8 |
| Networking | 175 | 10 |
| Hardware | 190 | 10 |
| Virtualization and Cloud Computing | 83 | 6 |
| Hardware and Network Troubleshooting | 212 | 10 |

This is too narrow for the official objective detail. Examples of thin or missing coverage include:

- mobile displays, cameras, microphones, wireless cards, USB variants, SIM/eSIM, synchronization, GPS, data caps, and broader accessory support;
- the wider port/protocol set, IPv4/IPv6 configuration, wireless standards and frequencies, network appliances, internet connection types, cable categories/connectors, and additional network tools;
- display technologies, cable/connector breadth, RAM channels and ECC, RAID levels, motherboard form factors, expansion cards, UEFI settings, power-supply selection, peripherals, and printer technologies;
- PaaS, cloud deployment models, elasticity, metering, shared resources, shared responsibility, and additional client virtualization constraints;
- broader drive/RAID, display/projector, mobile, printer, and wired/wireless troubleshooting symptoms.

### Distractor and difficulty risk

Many wrong answers are unrelated enough to be removed without understanding the tested concept. Examples include printer, CPU, DNS, and disk tools appearing as alternatives in unrelated domains. A heuristic scan flagged at least one conspicuously cross-domain distractor in 284 of 558 single-choice items.

Every generated multiple-response item combines the topical answer with the same generic correct answer:

`Verify the change after implementation and document the result`

That statement is often good support practice, but repeated use makes the item predictable and sometimes only loosely responsive to the question.

### Conclusion

Core 1 is useful for repetition of foundational concepts and PBQ-lite troubleshooting. It is not yet broad enough to support a strong claim that repeated 90-question forms comprehensively simulate 220-1201.

## A+ Core 2 findings

### What works

- Current 220-1202 domain weights and form length are represented.
- Sampled facts around Disk Management, Task Manager, domain join, package managers, macOS privacy settings, recovery, NTFS, `sudo`, PowerShell, System File Checker, encryption, MFA, least privilege, phishing, and support procedures were generally correct.
- Ten handcrafted PBQ-lite items provide useful OS, security, malware, authentication, change-control, and documentation practice.
- Formal forms guarantee practical coverage and exclude statement-block learning drills.

### Main readiness gap: breadth

The 750 generated questions originate from 36 concept templates:

| Domain | Pool questions | Distinct single-choice answer concepts |
| --- | ---: | ---: |
| Operating Systems | 212 | 10 |
| Security | 213 | 10 |
| Software Troubleshooting | 176 | 8 |
| Operational Procedures | 159 | 8 |

Thin or missing coverage includes:

- OS families and life cycles, installation and upgrade methods, partition styles, Windows edition differences, broad Windows tools and commands, application management, cloud productivity, remote access, and broader macOS/Linux administration;
- physical and logical security controls, account policies, browser security, SOHO network hardening, data-destruction methods, malware types, and the full current ten-step malware-removal process;
- the broader Windows, mobile application, mobile security, and PC security symptom lists;
- ticketing and knowledge systems, asset management, change categories, backup types and rotation, environmental controls, licensing and prohibited-content policy, scripting breadth, remote-support methods, and other current operational-procedure objectives.

The current malware explanation is directionally correct but does not teach the official 220-1202 ten-step sequence. That sequence explicitly includes investigation, quarantine, System Restore handling, remediation, anti-malware updates, scan/removal techniques, reimage/reinstall, scheduled scans and updates, restore-point creation, and user education.

### Distractor and difficulty risk

A heuristic scan flagged at least one conspicuously cross-domain distractor in 233 of 551 single-choice items. All 93 generated multiple-response questions use the same generic verification/documentation answer.

### Conclusion

Core 2 is a useful introductory support bank with good high-level facts and helpful PBQ-lite scenarios. Its objective breadth, distractor quality, and procedural depth are not yet strong enough for a high-confidence full-exam simulation claim.

## Splunk findings

### What works

- The eight domains and official weights map exactly to the current blueprint.
- The bank substantively covers the published blueprint bullets:
  - components, uses, apps, user settings, and navigation;
  - basic searches, time, results, refinement, timeline, events, jobs, and saved results;
  - fields and the fields sidebar;
  - pipeline behavior, indexes, `table`, `rename`, `fields`, `dedup`, and `sort`;
  - `top`, `rare`, and `stats`;
  - reports, visualizations, dashboards, and editing;
  - lookup files, definitions, keys, and enrichment;
  - scheduled reports, alerts, conditions, and actions.
- SPL and field examples are generally technically sound.
- Formal forms use only selected-response items and preserve the 60-question official structure.
- No synthetic ticket identifiers or generic verification-answer pattern remains.

### Remaining realism gaps

- The median question is 48 words, while official sample questions are generally much more direct.
- Many stems contain both a detailed evidence sentence and a second sentence restating the task.
- The 98 multiple-response questions combine two concepts. Some pairs test useful distinctions, but others feel like two study facts joined together rather than one coherent exam decision.
- Distractors are usually technically distinguishable but often too obvious for strong discrimination.
- Result tables, chart outputs, and lookup examples are described in text rather than shown as richer evidence.

### Conclusion

Splunk is the strongest of the three audited banks as an exam simulation because the real blueprint is compact and selected-response oriented. Its remaining work is editorial refinement and better evidence presentation, not a foundational content rebuild.

## Remediation order

### A+ priority 1: objective tagging and breadth

1. Add an official objective ID to every A+ question.
2. Build a coverage matrix that fails when an objective has no items.
3. Expand Core 1 from 44 concept templates to a meaningfully broader source-backed set.
4. Expand Core 2 from 36 concept templates to a meaningfully broader source-backed set.
5. Generate by objective allocation rather than repeating a small domain-level topic bank.

### A+ priority 2: item quality

1. Replace all 187 generic multiple-response verification answers with concept-specific second answers.
2. Replace cross-domain distractors with plausible same-domain mistakes.
3. Shorten stems and remove context that does not affect the answer.
4. Add richer device, settings, command, cable, storage, security, and troubleshooting artifacts.
5. Teach the full current malware-removal sequence in Core 2.

### Splunk priority

1. Add blueprint objective IDs.
2. Split weak paired multiple-response items into coherent single decisions.
3. Shorten repeated evidence/task phrasing.
4. Add compact SPL result tables, lookup rows, and alert/report outputs.
5. Replace easy distractors with valid commands or objects used incorrectly.

## Step-five input

The grade update should reflect the difference between:

- strong domain allocation and surface uniqueness; and
- actual objective breadth, distractor discrimination, and interaction realism.

No public availability decision was changed during this audit. Grade and catalog-position decisions belong to step five.

## Step-five decision

Completed June 8, 2026:

| Certification | Previous | Updated | Catalog decision |
| --- | ---: | ---: | --- |
| A+ Core 1 | B | C+ | Keep live as a disclosed foundational strategic exception. |
| A+ Core 2 | B | C+ | Keep live as a disclosed foundational strategic exception. |
| Splunk Core Certified User | B+ | B+ | Keep live; it meets the current readiness bar. |

Rationale:

- A+ remains useful and generally factually sound, but its limited underlying concept breadth, weak distractor discrimination, generic multiple-response construction, and simplified PBQ delivery make it a study bank more than a comprehensive simulator under the grading rubric.
- A+ remains strategically valuable as the optional starting point for learners without technical experience. Removing it would weaken the intended learning path, so the product must disclose its exception status and prioritize remediation.
- Splunk maps well to its compact selected-response blueprint and has no foundational architecture gap. Its remaining issues fit B+ targeted polish rather than a downgrade.

## A+ remediation regrade

Completed June 8, 2026 after the step-five decision:

| Certification | Step-five grade | Regraded | Evidence |
| --- | ---: | ---: | --- |
| A+ Core 1 | C+ | B+ | 84 concepts cover all 27 official objectives; objective/domain gates pass; 94 generated multiple-response items repaired; ten PBQ-lite scenarios explicitly mapped. |
| A+ Core 2 | C+ | B+ | 94 concepts cover all 36 official objectives; objective/domain gates pass; 93 generated multiple-response items repaired; ten PBQ-lite scenarios explicitly mapped. |

The regrade does not claim exact reproduction of CompTIA's proprietary PBQ interface or scaled scoring. It recognizes that the identified C+ deficiencies have been materially remediated: every question now carries an objective and concept ID, every objective has at least two concepts, cross-domain distractors were replaced with competing actions from the same exam domain, filler was removed from generated stems, and objective-specific second answers replaced the repeated generic verification choice.
