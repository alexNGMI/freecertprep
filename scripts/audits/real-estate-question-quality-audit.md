# Real Estate Question Quality Audit

Date: 2026-05-17

## Sources checked

- Georgia Department of Revenue real estate transfer tax: https://dor.georgia.gov/real-estate-transfer-tax

Existing blueprint alignment for the real-estate modules is documented in the state progress files and registry comments. This pass focused on question-bank quality checks: duplicate stems, terse explanations, answer-position skew, and a spot correction found during that scan.

## Results

- National pool:
  - 750 questions.
  - No exact duplicate stems.
  - No explanations under 100 characters.
  - Single-choice answer positions were already acceptable: `{0: 186, 1: 191, 2: 183, 3: 190}`.
- Texas state-law pool:
  - 401 questions.
  - No exact duplicate stems.
  - No explanations under 100 characters.
  - Rebalanced answer positions to `{0: 101, 1: 100, 2: 100, 3: 100}`.
  - Reconciled on 2026-05-25 to the listed 2026 Pearson VUE / TREC state-law outline: Commission Duties & Powers 24, Licensing 32, Standards of Conduct 72, Agency & Brokerage 80, Contracts 64, Special Topics 48, Case Studies 81.
- Maine state-law pool:
  - 400 questions.
  - No exact duplicate stems.
  - No explanations under 100 characters.
  - Rebalanced answer positions to `{0: 100, 1: 100, 2: 100, 3: 100}`.
- Georgia state-law pool:
  - 400 questions.
  - No exact duplicate stems.
  - Expanded one terse explanation for `re-ga-289`.
  - Corrected `re-ga-289` to use Georgia's transfer-tax rate from the Department of Revenue: $1 for the first $1,000 or fractional part, plus $0.10 for each additional $100 or fractional part. A $375,000 sale produces a $375.00 transfer tax.
  - Rebalanced answer positions to `{0: 100, 1: 100, 2: 100, 3: 100}`.

## Current scan result

All real-estate banks now have:

- No exact duplicate question stems.
- No explanations under 100 characters.
- Valid domain assignments against the registry.
- Balanced or already acceptable single-choice answer positions.
