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
- CDL: 17 / 23 / 23 / 37.
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

## Next recommended quality pass

After the NVIDIA/cloud/CompTIA sweep, the remaining content modules to audit with the same rubric are:

1. Real Estate National.
2. Texas state law.
3. Maine state law.
4. Georgia state law.
