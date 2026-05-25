# Catalog Question Quality Audit

Date: 2026-05-17

## Sources checked

- Microsoft AZ-900 study guide: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900
- AWS CLF-C02 exam guide: https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html
- Google Cloud Digital Leader exam guide: https://cloud.google.com/learn/certification/guides/cloud-digital-leader
- CompTIA Network+ N10-009 objectives: https://partners.comptia.org/docs/default-source/resources/comptia-network-n10-009-exam-objectives-%284-0%29
- CompTIA Security+ SY0-701 objectives: https://partners.comptia.org/docs/default-source/resources/comptia-security-sy0-701-exam-objectives-%285-0%29
- CompTIA Server+ SK0-005 objectives: https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-server-sk0-005-exam-objectives-%285-0%29.pdf

## Registry alignment

The cloud and CompTIA registry domain names and weights are aligned with the official/current exam guides:

- AZ-900: Microsoft now publishes ranged weights. The registry uses 25/40/35, which sits inside the official 25-30 / 35-40 / 30-35 ranges.
- CLF-C02: 24 / 30 / 34 / 12.
- CDL: 17 / 16 / 16 / 17 / 17 / 17.
- N10-009: 23 / 20 / 19 / 14 / 24.
- SY0-701: 12 / 22 / 18 / 28 / 20.
- SK0-005: 18 / 30 / 24 / 28.

## Fixes applied

- AZ-900:
  - Expanded two terse explanations.
  - Renamed one duplicate cost-optimization statement-block stem.
  - Rebalanced single-choice answers to `{0: 120, 1: 120, 2: 120, 3: 120}`.
- AWS CLF-C02:
  - Replaced two duplicate stems with adjacent exam-quality questions for Performance Efficiency design practice and Always Free tier behavior.
  - Rebalanced single-choice answers to `{0: 165, 1: 164, 2: 164, 3: 164}`.
- Google CDL:
  - Replaced one duplicate SLO/SLA stem with a stricter-SLO/error-budget question.
  - Rebalanced single-choice answers to `{0: 174, 1: 174, 2: 173, 3: 173}`.
- CompTIA Network+:
  - Expanded four terse explanations covering NTP, DHCP DORA, /28 usable hosts, and T3 bandwidth.
  - Existing single-choice answer positions were already reasonably balanced.
- CompTIA Security+:
  - Renamed three duplicate statement/matching stems so each interaction has a distinct purpose.
  - Rebalanced single-choice answers to `{0: 149, 1: 149, 2: 149, 3: 149}`.
- CompTIA Server+:
  - Renamed one duplicate statement-block stem.
  - Existing single-choice answer positions were already balanced.

## Current scan result

All six audited banks now have:

- No exact duplicate question stems.
- No explanations under 100 characters.
- Valid domain assignments against the registry.
- Balanced or already acceptable single-choice answer positions.

## 2026-05-24 full-bank blueprint comparison

The broader catalog comparison against current official/vendor exam guides found that the mature banks are structurally strong, but the next quality standard should move beyond schema validity and duplicate cleanup into blueprint-weight accuracy.

Highest-confidence aligned banks:

1. AWS Solutions Architect - Associate (SAA-C03): exact 30 / 26 / 24 / 20 split.
2. Cisco CCST Networking: within 0.5 questions of the 15 / 20 / 20 / 20 / 15 / 10 target.
3. Cisco CCNA preview: within 0.5 questions of the 20 / 20 / 25 / 10 / 15 / 10 target, still unpublished pending simulation QA.
4. CompTIA A+ Core 1 and Core 2: within 1 question of the official V15 domain weights.
5. CompTIA Server+: within 1 question of the SK0-005 domain weights.
6. NVIDIA Generative AI LLMs and Indiana / North Carolina / Arizona real-estate state modules: close enough for the current authored-pool standard.

Priority hardening sequence:

1. CompTIA Network+ N10-009: completed 2026-05-25. The 751-question pool now matches the rounded N10-009 target counts: Networking Concepts 173, Network Implementation 150, Network Operations 143, Network Security 105, Network Troubleshooting 180. The rebalance converted overrepresented concept / implementation / security items into scenario-forward troubleshooting and operations questions with evidence-based stems.
2. Google Cloud Digital Leader: completed 2026-05-25. The registry and 749-question pool now use the current six-section guide: Digital Transformation 128, Data Transformation 120, Artificial Intelligence 120, Infrastructure and Application Modernization 127, Trust and Security 127, Operations 127.
3. NVIDIA AI Infrastructure & Operations: completed 2026-05-25. The 336-question source pool now follows the official 40 / 38 / 22 split as AI Infrastructure 134, Essential AI Knowledge 128, and AI Operations 74. Software-stack fundamentals moved out of Operations, while production monitoring, scheduling, lifecycle, and management topics remain there.
4. AZ-900: completed 2026-05-25. The 600-question pool now sits inside Microsoft's current ranged weights with Cloud Concepts 162, Azure Architecture and Services 228, and Azure Management and Governance 210. The cleanup converted overrepresented architecture/service items into cloud-concept and governance scenarios.
5. Real-estate state modules: completed 2026-05-25 as a publication-readiness recheck. Arizona, Maine, North Carolina, and Indiana still match current handbook structures. Texas now needs a follow-up taxonomy update for the 2026 Pearson VUE outline, including case-study handling. Georgia needs the current PSI/GREC salesperson bulletin pinned from a stable official source before publication readiness.

## Next recommended quality pass

After the NVIDIA/cloud/CompTIA sweep, the remaining content modules to audit with the same rubric are:

1. Real Estate National.
2. Texas state law.
3. Maine state law.
4. Georgia state law.
