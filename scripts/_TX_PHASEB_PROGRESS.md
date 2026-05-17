# Texas state-law pool: completion note

Goal: ~400 single-choice TX state-law questions in
`src/data/real-estate-tx-state-questions.json`, every question
`portion:"state"`, domain in the 6 official TREC / Pearson VUE sections,
with worked explanations. Then rebalance answer positions, wire Texas into
the Real Estate sister-site picker, smoke-test, and keep it out of the IT
catalog via `published:false`.

## Status: COMPLETE

| | |
|---|---|
| Pool size | **401 / ~400 - DONE** |
| certs.js questionCount | 401 (synced) |
| Route | `/real-estate/study/tx` |
| Picker | `src/pages/realestate/reCerts.js` includes slug `tx` |
| Landing card | `src/pages/RealEstate.jsx` includes Texas as available |
| Engine | `selectLicensingExam` composes 85 national + 40 state |
| Tests | Content sanity, full Vitest suite, lint, and build verified on 2026-05-17 |

### Final distribution

| TREC section (domain string) | exam weight | pool count |
|---|--:|--:|
| Agency & Brokerage | 27.5% | 110 |
| Standards of Conduct | 22.5% | 90 |
| Contracts (TREC Forms & Disclosures) | 22.5% | 90 |
| Special Topics (TX) | 12.5% | 51 |
| Commission Duties & Powers | 7.5% | 30 |
| Licensing | 7.5% | 30 |

`correctAnswer` distribution after rebalance: 0=102, 1=86, 2=107, 3=106.

## Source batches

The active Texas patch file remains `scripts/_tx_patch.json` for future
authoring patterns and reference. The completed pool is the canonical
source for shipped content.

## Covered concepts

- Agency: IABS timing/exceptions; intermediary consent, appointments, and
  impartiality; salesperson representation of broker; client vs customer;
  fiduciary duties; minimum services; license-holder-as-principal
  disclosure; multi-party consent; cooperating-broker compensation;
  listing types; protection period; agency termination; ministerial acts;
  confidentiality; escrow-agent neutrality; advertising another broker's
  listing; procuring cause.
- Standards: commingling; earnest-money handling; unauthorized practice of
  law; unlicensed/referral payments; rebate disclosure; misleading/blind
  ads; record retention; website Consumer Protection Notice and IABS;
  out-of-state broker cooperation; written complaints; negligent
  supervision; address/criminal notifications; false promises; signs
  without owner consent; conflicts; trust-money handling.
- Contracts: promulgated forms; Broker-Lawyer Committee; blank-filling
  limits; termination option and option-fee handling; earnest money;
  seller disclosure; financing addenda; temporary leases; termination
  notices; HOA addendum; backup addendum; amendments vs addenda; T-47 and
  surveys; title objections; default remedies; lead-based paint;
  property-condition language; square-footage misrepresentation; effective
  date.
- Special topics: community and separate property; intestacy; Transfer on
  Death Deed; homestead acreage/signature/exemption rules; MUD notice;
  security deposits; HOA resale certificates; DTPA; non-judicial
  foreclosure; mechanic's liens.
- Commission: 9-member structure; consumer-protection purpose; Recovery
  Trust Account; SOAH; rulemaking authority; inspector and right-of-way
  regulation; cease-and-desist for unlicensed activity.
- Licensing: license-required acts and exemptions; sponsorship; CE and SAE;
  renewal/inactive status; prelicensing; entity broker designated broker;
  nonresident consent to service.
