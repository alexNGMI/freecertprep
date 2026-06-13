# Live Certification Source and Release Audit

Audit date: June 13, 2026

Scope: the nine certifications marked `LIVE` in the FreeCertPrep catalog.

Method: current public pages and documents published by the certification vendors were checked for the active exam code or version, question-count and time model, scoring language, item-type disclosures, and canonical source URL. No third-party exam-prep sites, recollections of live exam content, or exam dumps were used.

## Executive Findings

- Eight of the nine local exam releases remain aligned with the currently active vendor release.
- CCNA is the material exception. `200-301 CCNA v1.1` remains the active exam through February 2, 2027. Cisco has published the v2.0 blueprint, but the first date to test is February 3, 2027. Local metadata previously called v2.0 current and has been corrected.
- The A+ source links were valid at the certification-family level but were not the most precise canonical pages. Core 1 and Core 2 now link directly to their V15 exam pages.
- AWS publishes exact scored and unscored counts: both live AWS exams contain 50 scored and 15 unidentified unscored questions.
- Splunk's detailed study guide distinguishes 57 minutes of assessment time from 3 minutes for the exam agreement.
- Cisco and HashiCorp do not publish fixed question counts for the audited CCNA and Terraform exams. The app should not imply one.
- Splunk, Cisco, and HashiCorp do not publish a fixed raw passing threshold suitable for conversion into a simulator percentage.

## Audit Matrix

| Local ID | Active release on audit date | Official count and time | Official item-type notes | Scoring language | Canonical source result |
| --- | --- | --- | --- | --- | --- |
| `clf-c02` | AWS Certified Cloud Practitioner `CLF-C02` | 65 questions, 90 minutes; 50 scored and 15 unscored | Multiple choice and multiple response | Scaled 100-1,000; minimum 700 | Existing AWS exam-guide URL is canonical |
| `aws-saa-c03` | AWS Certified Solutions Architect - Associate `SAA-C03` | 65 questions, 130 minutes; 50 scored and 15 unscored | Multiple choice and multiple response | Scaled 100-1,000; minimum 720 | Existing AWS exam-guide URL is canonical |
| `comptia-a-plus-core-1` | A+ V15 `220-1201` | Maximum 90 questions, 90 minutes | Single response, multiple response, drag-and-drop, and performance-based | 675 on a scale of 900 | Updated from the family page to the Core 1 V15 page |
| `comptia-a-plus-core-2` | A+ V15 `220-1202` | Maximum 90 questions, 90 minutes | Single response, multiple response, drag-and-drop, and performance-based | 700 on a scale of 900 | Updated from the family page to the Core 2 V15 page |
| `comptia-net-plus` | Network+ V9 `N10-009` | Maximum 90 questions, 90 minutes | Multiple-choice and performance-based | 720 on a 100-900 scale | Existing Network+ page is canonical |
| `comptia-sec-plus` | Security+ V7 `SY0-701` | Maximum 90 questions, 90 minutes | Multiple-choice and performance-based | 750 on a 100-900 scale | Existing Security+ page is canonical |
| `splunk-core-certified-user` | Splunk Core Certified User; current public vendor pages do not display an exam code | 60 questions; 57-minute assessment plus 3-minute agreement review | Multiple choice | Vendor reports pass/fail; no public raw threshold | Existing certification-track page is canonical |
| `ccna-200-301` | `200-301 CCNA v1.1`; v2.0 begins February 3, 2027 | 120 minutes; fixed count not published | Cisco exam guidance supports multiple-choice, drag-and-drop, and performance-based formats | No public universal raw passing percentage | Updated from a legacy URL to the current Cisco exam page |
| `terraform-associate` | Terraform Associate `004`, testing Terraform 1.12 | 1 hour; fixed count not published | True/false, single-answer, and multiple-answer | No public fixed raw threshold | Existing HashiCorp certification page is canonical |

## Certification Evidence

### AWS Certified Cloud Practitioner

- The [AWS certification page](https://aws.amazon.com/certification/certified-cloud-practitioner/) identifies a 90-minute, 65-question multiple-choice or multiple-response exam.
- The [official CLF-C02 exam guide](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html) identifies 50 scored questions, 15 unidentified unscored questions, scaled scoring from 100 to 1,000, and a minimum passing score of 700.
- Result: no release or URL correction required. Metadata wording was made more exact.

### AWS Certified Solutions Architect - Associate

- The [AWS certification page](https://aws.amazon.com/certification/certified-solutions-architect-associate/) identifies a 130-minute, 65-question multiple-choice or multiple-response exam.
- The [official SAA-C03 exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html) identifies 50 scored questions, 15 unidentified unscored questions, scaled scoring from 100 to 1,000, and a minimum passing score of 720.
- Result: no release or URL correction required. Metadata now records the exact scored/unscored split.

### CompTIA A+ Core 1 and Core 2

- The official [A+ Core 1 V15 page](https://www.comptia.org/en-us/certifications/a/core-1-v15/) identifies exam `220-1201`, launched March 25, 2025, with a maximum of 90 questions in 90 minutes and a passing score of 675 on a scale of 900.
- The official [A+ Core 2 V15 page](https://www.comptia.org/en-us/certifications/a/core-2-v15/) identifies exam `220-1202`, launched March 25, 2025, with a maximum of 90 questions in 90 minutes and a passing score of 700 on a scale of 900.
- Both pages list single-response, multiple-response, drag-and-drop, and performance-based formats and state that the two exams must be taken from the same version.
- Result: releases were correct. Both local URLs were changed from the broad A+ family route to their exact V15 core pages.

### CompTIA Network+

- The official [Network+ page](https://www.comptia.org/en-us/certifications/network/) identifies V9 exam `N10-009`, launched June 20, 2024.
- It specifies a maximum of 90 multiple-choice and performance-based questions, a 90-minute duration, and a passing score of 720 on a 100-900 scale.
- Result: release, format, scoring, and canonical URL were already correct.

### CompTIA Security+

- The official [Security+ page](https://www.comptia.org/en-us/certifications/security/) identifies V7 exam `SY0-701`, launched November 7, 2023.
- It specifies a maximum of 90 multiple-choice and performance-based questions, a 90-minute duration, and a passing score of 750 on a 100-900 scale.
- CompTIA currently labels retirement as usually three years after launch and estimates 2026, but the page still presents SY0-701 as the active exam on the audit date. This module needs continued release monitoring.
- Result: release, format, scoring, and canonical URL were correct.

### Splunk Core Certified User

- The official [Splunk Core Certified User page](https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-user.html) identifies an entry-level, 60-question multiple-choice exam with a 60-minute appointment.
- The official [Splunk Certification Exams Study Guide](https://www.splunk.com/en_us/pdfs/training/splunk-certification-exams-study-guide.pdf) provides the more precise timing: a 57-minute assessment plus 3 minutes to review the exam agreement.
- The official [Splunk Certification Candidate Handbook](https://www.splunk.com/en_us/pdfs/training/splunk-certification-candidate-handbook.pdf) states that results are displayed as pass or fail and does not publish a raw passing threshold.
- Splunk's current public certification page does not display an exam code. The local `SPLK-1001` identifier is retained, but future audits should verify the registration code in the vendor's registration flow if it changes.
- Result: URL and active certification were correct. Timing and scoring language were clarified.

### Cisco CCNA

- The current [Cisco CCNA exam page](https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html) identifies `200-301 CCNA v1.1` as a 120-minute exam.
- Cisco's [current exam list](https://www.cisco.com/site/us/en/learn/training-certifications/exams/list.html) lists `200-301 CCNA` as active.
- The official [CCNA exam topics page](https://learningnetwork.cisco.com/s/ccna-exam-topics) states that the last date to test for v1.1 is February 2, 2027 and that v2.0 first becomes testable on February 3, 2027.
- Cisco has already published the [v2.0 exam-topics PDF](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf), but publication of a future blueprint does not make it the current release.
- Cisco exam-topic guidance describes multiple-choice, drag-and-drop, and performance-based formats. Cisco does not publish a fixed CCNA question count or a universal raw passing percentage.
- Result: corrected the local active-version claim from v2.0 to v1.1 and replaced the legacy exam URL with the current canonical page. The local content bank should be checked separately for whether it targets v1.1, future v2.0, or a mixed scope.

### HashiCorp Terraform Associate

- The official [Infrastructure Automation Certifications page](https://developer.hashicorp.com/certifications/infrastructure-automation) identifies Terraform Associate `004`, tests Terraform 1.12, and describes a one-hour multiple-choice assessment.
- The official [Associate 004 sample questions](https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-questions-004) specify true/false, single-answer multiple choice, and multiple-answer formats.
- HashiCorp does not publish a fixed question count, raw passing threshold, or objective weighting for this exam.
- Result: release and URL were correct. Metadata now states the unpublished count limitation explicitly and uses the vendor's precise item-type terminology.

## Corrections Applied to Local Metadata

1. Refreshed `checkedAt` to `2026-06-13` for both AWS exams, CCNA, and Terraform.
2. Expanded both AWS format notes to state the 50 scored and 15 unidentified unscored split.
3. Replaced both A+ family URLs with exact Core 1 and Core 2 V15 pages.
4. Clarified A+ item types using CompTIA's single-response and multiple-response wording.
5. Corrected CCNA from current v2.0 to active v1.1 and recorded the February 3, 2027 v2.0 transition.
6. Replaced the legacy CCNA URL with Cisco's current canonical exam page.
7. Clarified that Cisco does not publish a fixed CCNA question count.
8. Corrected Splunk timing to 57 assessment minutes plus 3 agreement minutes and documented pass/fail-only public scoring.
9. Clarified Terraform's official item types and that its fixed question count is not published.

## Follow-Up Risks

1. **CCNA content scope:** resolved for public release safety by moving CCNA to Coming Soon. The preserved bank targets v2.0 and must be re-audited when v2.0 becomes active on February 3, 2027.
2. **Security+ release watch:** CompTIA still presents SY0-701 as active, but its page estimates retirement in 2026. Recheck monthly or when CompTIA announces a successor exam.
3. **Splunk exam code:** the active public vendor pages identify the certification by name rather than displaying `SPLK-1001`. Verify the registration code again if the Pearson registration catalog or Splunk track changes.
4. **Unpublished metrics:** do not invent fixed official question counts for CCNA or Terraform, or raw passing percentages for Cisco, Splunk, or HashiCorp.

## Post-Audit Release Decision

The source audit changed the public catalog from nine Live / eight Coming Soon modules to eight Live / nine Coming Soon modules. CCNA's route and 750-question v2.0 bank remain intact, but the module is no longer linked as current-exam practice while v1.1 is active.
