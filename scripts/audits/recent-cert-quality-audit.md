# Recent Cert Quality Audit - DCCA, Splunk, Linux+

Date: 2026-05-25

Scope:

- Schneider Data Center Certified Associate (`schneider-dcca`)
- Splunk Core Certified User (`splunk-core-certified-user`)
- CompTIA Linux+ (`comptia-linux-plus`)

This audit checks whether the three newest production-style pools are structurally valid, blueprint-aligned, and editorially strong enough to keep expanding on without another quality pass.

## Summary

All three banks pass the app's schema and domain-weighting gates. They are wired into the frontend correctly and are usable for practice. The main weakness is editorial polish: DCCA, Splunk, and Linux+ all show generator fingerprints in repeated stem frames, synthetic ticket/case phrasing, or generic distractors. They should not block the app, but they should be the next content-hardening target before more new certs are added.

Recommendation: treat the three banks as live but needing a focused editorial polish pass, starting with Linux+ and DCCA.

## Quantitative Findings

| Cert | Questions | Domains | Type mix | Normalized duplicate groups | Normalized duplicate items | Notes |
|---|---:|---:|---|---:|---:|---|
| Schneider DCCA | 750 | 14 | 582 single, 84 MR, 42 matching, 42 ordering | 111 | 620 | Very repetitive stems once ticket numbers are ignored. |
| Splunk Core Certified User | 750 | 8 | 592 single, 98 MR, 41 matching, 19 ordering | 2 | 4 | Strong blueprint fit, but many stems include synthetic context/ticket phrasing. |
| CompTIA Linux+ | 750 | 5 | 509 single, 82 MR, 55 CLI, 41 config repair, 37 matching, 26 ordering | 45 | 724 | Practical item types are useful, but single-choice stems and distractors are too templated. |

Normalization removed ticket/case IDs and common generator markers before counting duplicate stem patterns.

## Schneider DCCA

Strengths:

- Domain map follows the Schneider Electric University DCCA development-path areas.
- Coverage is broad across availability, fire protection, cabling, cooling, humidity, security, power, generators, racks, and infrastructure management.
- Core answers generally align with data center physical-infrastructure principles.
- Matching and ordering items give useful review variety.

Issues:

- 620 questions fall into repeated normalized stem patterns. Many items are technically unique only because of ticket numbers.
- Several domains use generic phrasing such as "A DCCA candidate is evaluating..." and "Which statement is most accurate?"
- Multiple-response distractors sometimes use obvious nonsense such as "Choose equipment based only on bezel color," which lowers exam realism.
- A small capitalization issue was corrected in the JSON for repeated "a mixed-density production room..." stems.

Verdict: Structurally good, topic coverage acceptable, editorial realism below the stronger pools. Needs a rewrite pass that turns repeated concept checks into richer facility scenarios.

## Splunk Core Certified User

Strengths:

- Exact official blueprint distribution is locked in content sanity tests.
- Topics stay inside Core User scope: basics, searching, fields, SPL fundamentals, transforming commands, reports/dashboards, lookups, scheduled reports, and alerts.
- Distractors are usually plausible enough for entry-level Splunk practice.
- Normalized duplicate count is low compared with DCCA/Linux+.

Issues:

- Many stems include "The scenario includes..." and "under ticket SPL-###," which reads synthetic.
- A matching-question generator phrase produced "during during"; the generated JSON and generator have been patched.
- Explanations are correct but often concise. Review mode would be stronger with more "why not" distractor feedback.

Verdict: Best of the three for blueprint accuracy and direct usefulness. Needs natural-language cleanup more than content correction.

## CompTIA Linux+

Strengths:

- Exact XK0-006 domain distribution is locked in content sanity tests.
- Includes practical CLI output and config-repair items, which better reflects Linux+ performance-based expectations.
- Command choices cover realistic administration areas: systemd, journalctl, storage, SSH, SELinux, containers, scripts, DNS, routing, and filesystem checks.

Issues:

- 509 single-choice items use the broad frame "Which action best fits the Linux+ objective?" This is too generic for exam-quality scenario practice.
- Generic distractors repeat heavily: "Disable logging first...", "Make every affected file world-writable...", and "Reinstall the operating system..." appear across much of the bank.
- 724 questions fall into repeated normalized stem patterns, mainly because the single-choice template is reused.
- Some correct answers are long action statements rather than concise answer choices, which can make the item feel like a study card instead of an exam question.

Verdict: Strong architecture and good PBQ-style direction, but it needs the most editorial work before being considered high-quality. Prioritize converting templated single-choice items into concrete command/output or task scenarios.

## Safe Fixes Applied

- Removed the Splunk "during during" phrase from generated JSON and fixed the generator wording.
- Capitalized DCCA stems that began with "a mixed-density production room..."

These are small cleanup changes only. They do not change answer keys, domain counts, or question IDs.

## Recommended Remediation Order

1. **Linux+ single-choice rewrite**
   Replace the generic single-choice template with specific mini-scenarios and more plausible distractors. Keep the existing domain counts and PBQ-style items.

2. **DCCA scenario expansion**
   Reduce duplicate normalized stems by adding facility-specific scenarios, realistic constraints, and less-obvious distractors.

3. **Splunk natural-language cleanup**
   Remove synthetic ticket/context filler and expand explanations with clearer why-right / why-wrong guidance.

4. **Add editorial gates**
   Add automated checks for obvious synthetic markers, repeated normalized stems, and repeated generic distractors so future generated banks fail earlier.

## Current Status

Do not add another large cert bank until at least Linux+ and DCCA receive a polish pass. The app is in a good technical state, but the content library will benefit more from quality hardening than from additional catalog size right now.
