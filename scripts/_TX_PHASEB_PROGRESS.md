# Phase B — Texas state-law pool: progress & resume guide

Goal: ~400 single-choice TX state-law questions in
`src/data/real-estate-tx-state-questions.json`, every question
`portion:"state"`, domain ∈ the 6 official TREC sections, with worked
explanations. Then a one-time correctAnswer rebalance, flip
`real-estate-tx` published, smoke-test, commit.

## Status

| | |
|---|---|
| Pool size | **101 / ~400** (batches 1–2 done) |
| Next id | `re-tx-102` (ids unique, not required contiguous; 1–101 used incl. 101) |
| certs.js questionCount | kept in sync (currently 101) — **must update every batch** or content-sanity fails |

### Target distribution (≈400) and progress
| TREC section (domain string) | weight | target | done |
|---|--:|--:|--:|
| Agency & Brokerage | 27.5% | ~110 | 28 |
| Standards of Conduct | 22.5% | ~90 | 23 |
| Contracts (TREC Forms & Disclosures) | 22.5% | ~90 | 22 |
| Special Topics (TX) | 12.5% | ~50 | 12 |
| Commission Duties & Powers | 7.5% | ~30 | 8 |
| Licensing | 7.5% | ~30 | 8 |

Keep ~50/batch at roughly: Agency 14 / Standards 11 / Contracts 11 /
Special 6 / Commission 4 / Licensing 4. ~6 batches remain.

## How to resume (per batch)
1. Author ~50 NEW questions (no concept repeats — see covered list) into
   `scripts/_tx_patch.json` (array; ids re-tx-102…, portion "state",
   exact domain strings, 4 choices, non-empty explanation).
2. `python scripts/append_tx_state.py scripts/_tx_patch.json` (validates
   + appends; rejects on any error).
3. Update `certs.js` real-estate-tx `questionCount` to the new pool length.
4. `npx vitest run src/__tests__/content-sanity.test.js` → green.
5. Update this file's status; commit (`published:false`, safe WIP).

## Final steps (after ~400)
- One-time balance: script that, per question, randomly permutes
  `choices` and remaps `correctAnswer` (preserves correctness, evens the
  0–3 distribution; the current pool skews heavily to index 1, which is
  cosmetically poor but user-invisible due to render-time shuffle).
- Flip `real-estate-tx` `published: true`; add a catalog/landing entry
  if desired (currently unlinked).
- `npx eslint . && npx vitest run && npx vite build` all green.
- Browser smoke test: `/real-estate/study` on the TX cert — confirm the
  Full Licensing Exam composes 85 national + 40 state.

## Covered concepts (do NOT repeat)
- Agency: IABS timing/exceptions; intermediary (written consent, pays-whom,
  appointments, impartial, no dual agency); SA represents broker;
  client vs customer; fiduciary duties (buyer-rep); minimum services;
  license-holder-as-principal disclosure; multi-party consent;
  cooperating-broker comp ≠ agency; net listing limits; broker liability
  for SAs; advertising broker name/team/blind; listing types (excl.
  right-to-sell / excl. agency / open); protection/override period;
  agency termination; ministerial acts; confidentiality survives;
  escrow-agent neutrality; advertising another broker's listing;
  procuring cause.
- Standards: commingling; earnest-money deposit/handling; UPL (drafting,
  legal advice); paying unlicensed/referral; rebate disclosure;
  misleading/blind ads; record retention (4 yrs); website Consumer
  Protection Notice + IABS; out-of-state broker cooperation; complaints
  in writing; negligent supervision; notify TREC of address/criminal;
  false promise; signs without owner consent; conflict disclosure;
  mishandling trust money.
- Contracts: must use promulgated; Broker-Lawyer Committee; fill blanks
  only; termination option + option-fee handling; earnest money to
  escrow agent; §5.008 seller disclosure scope; 3rd-Party Financing /
  Loan Assumption / Seller Financing addenda; Buyer's/Seller's Temporary
  Lease; Notice of Buyer's Termination; HOA addendum; Back-Up addendum;
  Amendment vs addendum; T-47/existing survey; title objection; default
  remedies; lead-based paint (pre-1978); property-condition (as-is vs
  repairs); square-footage misrep; effective date.
- Special: community vs separate property; intestacy; Transfer on Death
  Deed; urban/rural homestead acreage; both spouses sign homestead;
  homestead exemption (ad valorem); MUD statutory notice; security
  deposit 30-day; HOA resale certificate; DTPA; non-judicial
  foreclosure (1st Tuesday); mechanic's lien on homestead.
- Commission: 9 members (6+3, Governor); purpose/consumer protection;
  Recovery Trust Account (caps, suspension until repaid); SOAH;
  rulemaking authority; also regulates inspectors/ROW agents;
  cease-and-desist for unlicensed activity.
- Licensing: license-required acts + exemptions; SA must be sponsored;
  18-hr CE incl. Legal Update; 2-yr renewal/inactive; 180-hr
  prelicensing; 90-hr SAE before 1st renewal; entity broker designated
  broker; nonresident consent to service.

## Still to mine (suggested upcoming batches)
TRELA fee/commission enforceability (writing requirement); earnest-money
dispute/interpleader & TREC release form; advertising specifics (.com,
expired-license, inducements/lotteries); fair housing under TX; Texas
agency disclosure timing nuances; TREC Inspector SOP basics (light);
landlord-tenant (repairs, lockouts, retaliation, late fees, notice to
vacate); fair housing/ADA TX nuance; appraisal/CMA vs BPO rules in TX;
ad valorem appraisal protest/ARB; deed types in TX (general/special
warranty, deed without warranty); property tax lien priority;
condominium/PUD §5.012/§5.014 notices; coastal/seaward & annexation
notices; water districts/MUD bonds; agricultural/wildlife valuation;
foreclosure timeline & notices (20-day, posting); deceptive practices
remedies; trust account reconciliation; advertising of price/terms;
e-signature/UETA; survey MUD; broker price opinion limitations;
unlicensed assistant permitted/prohibited acts; sponsorship
change/termination procedure; license expiration/late renewal/CE
deferral; criminal history/fitness determination; moral character;
TREC SOAH penalty ranges; advisory committees.
