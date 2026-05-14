"""Real Estate National batch 7 — questions 301-350. Milestone batch."""
import json, pathlib

Q = pathlib.Path("src/data/real-estate-national-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── Contracts (9) ───────────────────────────────────────────────────────
  {"id":"re-nat-301","domain":"Contracts","type":"single-choice",
   "question":"A purchase contract requires the buyer to deliver notice of any objections to the title commitment within 7 days of receipt. Notice provisions like this:",
   "choices":["Are decorative and have no real effect","Should be carefully tracked and strictly observed — failure to deliver timely notice in the manner required typically waives the right and may end the protection the contract intended to provide","Can be waived by the lender","Apply only to commercial transactions"],
   "correctAnswer":1,
   "explanation":"Notice provisions are critical in real estate contracts. They typically specify (1) WHAT must be noticed, (2) WHEN it must be delivered (the deadline), (3) HOW it must be delivered (writing, certified mail, email), and (4) TO WHOM. Failure to deliver timely, proper notice typically waives the right and may end any protection. Many disputes turn on notice issues — careful tracking of deadlines and following the specified method are essential."},

  {"id":"re-nat-302","domain":"Contracts","type":"single-choice",
   "question":"A seller knows the property has had repeated basement flooding but does not mention it. The buyer does not ask. After closing, the buyer discovers the issue. The seller's silence may be actionable under the theory of:",
   "choices":["Caveat emptor — buyer beware applies, no liability","Affirmative warranty","Misrepresentation by omission (or concealment) — under most state laws, a seller has a duty to disclose KNOWN material defects, and silence in the face of that duty can constitute fraud or misrepresentation","Free speech protection"],
   "correctAnswer":2,
   "explanation":"Under most state laws and common-law principles, a seller has a duty to disclose KNOWN material defects. Silence in the face of that duty (concealment) can constitute fraud or misrepresentation — even if the seller never affirmatively lied. The duty to disclose is generally triggered by knowledge of a material defect that is not readily observable by a reasonable buyer. The buyer is not required to ASK; the seller is required to TELL."},

  {"id":"re-nat-303","domain":"Contracts","type":"single-choice",
   "question":"A seller actively conceals a damaged area of the foundation by hiding it behind a built-in storage cabinet. This is best classified as:",
   "choices":["Acceptable preparation for sale","Mere puffing","Negligent misrepresentation only","ACTIVE CONCEALMENT — affirmative steps to hide a known defect, generally treated as fraud and supporting all the typical fraud remedies (rescission, damages, sometimes punitives)"],
   "correctAnswer":3,
   "explanation":"Active concealment occurs when a party takes affirmative steps to HIDE a known defect or material fact — beyond mere silence. Examples: covering damaged areas with new paint, hiding moisture problems with paneling, building structures to obscure flaws. Active concealment is universally treated as fraudulent regardless of whether the seller actively lied with words. Remedies typically include rescission, damages, and sometimes punitives."},

  {"id":"re-nat-304","domain":"Contracts","type":"single-choice",
   "question":"A real estate contract distinguishes 'conditions' from 'warranties.' This matters because:",
   "choices":["A breach of CONDITION typically allows the non-breaching party to terminate the contract; a breach of WARRANTY typically only allows recovery of damages — not termination","Conditions are illegal but warranties are valid","Warranties are stricter than conditions","Both terms mean the same thing"],
   "correctAnswer":0,
   "explanation":"In contract law, conditions and warranties have different breach consequences. A CONDITION is a fundamental term — its breach goes to the heart of the contract and typically allows the non-breaching party to terminate (and seek damages). A WARRANTY is a less central term — its breach allows damages but typically does NOT support termination. Whether a particular contract provision is a condition or warranty depends on the parties' intent, the contract language, and the term's centrality to the agreement."},

  {"id":"re-nat-305","domain":"Contracts","type":"single-choice",
   "question":"Different states use different priority rules for recorded deeds. Under a RACE STATUTE:",
   "choices":["All deeds have equal priority regardless of recording","Whoever RECORDS FIRST wins — even if they had actual notice of an earlier unrecorded deed; rare in modern US practice","Whoever pays the highest price wins","Whoever has the largest deed wins"],
   "correctAnswer":1,
   "explanation":"States use three main priority rules for recorded conveyances: (1) RACE — whoever records first wins, regardless of actual notice (rare in US, e.g., North Carolina, Louisiana); (2) NOTICE — a later good-faith buyer who takes WITHOUT NOTICE of an earlier unrecorded deed prevails, even without recording; (3) RACE-NOTICE — a later good-faith buyer must take WITHOUT NOTICE AND RECORD FIRST to prevail (most common modern US rule). The applicable rule is crucial for resolving competing claims."},

  {"id":"re-nat-306","domain":"Contracts","type":"single-choice",
   "question":"In a commercial real estate transaction, a lender often requires existing tenants to sign an 'estoppel certificate' confirming key facts about their lease. The purpose is to:",
   "choices":["Cancel the existing lease","Reduce rent","Lock in the tenants' representations (no undisclosed lease terms, no defaults, rent amount, term, etc.) so the buyer or new lender can rely on them and the tenants are 'estopped' from contradicting them later","Convert the lease to month-to-month"],
   "correctAnswer":2,
   "explanation":"An estoppel certificate is a tenant-signed (or lender-signed) statement confirming key facts about an existing lease or loan: the parties, term, current rent, security deposit, any defaults, any pending claims, any side agreements, and any modifications. The signer is 'estopped' from later contradicting the statements. Buyers and lenders rely on estoppels when acquiring property or financing — they reduce the risk of post-closing surprises about lease terms or defaults."},

  {"id":"re-nat-307","domain":"Contracts","type":"single-choice",
   "question":"Before entering a binding purchase contract, parties may exchange a 'Letter of Intent' (LOI). An LOI is typically:",
   "choices":["Equivalent to a binding contract","Required by federal law","A pre-contract document outlining the basic terms the parties are considering — generally non-binding except for certain enumerated provisions (confidentiality, exclusivity, expense allocation, etc.)","Always binding once signed"],
   "correctAnswer":2,
   "explanation":"A Letter of Intent (LOI) outlines the basic terms of a contemplated transaction. Generally, the LOI is NON-BINDING with respect to the substantive deal terms — the parties intend to negotiate a definitive agreement. However, specific provisions are often expressly binding: confidentiality, exclusivity (the seller agrees not to market to others during negotiations), expense allocation, and good-faith negotiation. Always specify which provisions bind and which do not — courts have enforced LOI provisions as binding when language was ambiguous."},

  {"id":"re-nat-308","domain":"Contracts","type":"single-choice",
   "question":"In a buyer-representation agreement (BRA), the broker generally:",
   "choices":["Agrees to represent the buyer in finding and purchasing a property, with stated duties and a stated compensation structure (which may include a buyer-paid retainer or a seller-paid commission negotiated in the purchase contract)","Promises to pay the seller","Eliminates the buyer's right to negotiate","Cancels the listing agreement"],
   "correctAnswer":0,
   "explanation":"A buyer-representation agreement (BRA) creates the agency relationship between buyer and buyer's broker. It specifies: (1) the brokerage's duties to the buyer, (2) the duration of the engagement, (3) the geographic scope and property type, (4) compensation structure (buyer-paid, seller-paid, or some combination), and (5) any 'protection period' for properties shown. Following the 2024 NAR settlement, written BRAs are now required before showing properties — formalizing what was once an informal relationship."},

  {"id":"re-nat-309","domain":"Contracts","type":"single-choice",
   "question":"A seller knows the property is subject to a flooding hazard but says NOTHING about it. The buyer relies on the seller's general statement that 'everything is fine.' The seller's general statement combined with the omission is best classified as:",
   "choices":["Caveat emptor — no liability","Misrepresentation by 'half-truth' — making partial statements that are technically true but misleading because of omitted material facts; actionable as fraud","Free speech","Acceptable practice"],
   "correctAnswer":1,
   "explanation":"A 'half-truth' is a statement that is technically accurate as far as it goes but is misleading because of what was omitted. 'Everything is fine' combined with omitted knowledge of flooding misleads the buyer. Half-truths are actionable as misrepresentation or fraud — silence in the face of a duty to clarify can be as actionable as outright lying. The doctrine recognizes that affirmative statements create their own duty to provide enough context to avoid misleading the listener."},

  # ── General Principles of Agency (7) ────────────────────────────────────
  {"id":"re-nat-310","domain":"General Principles of Agency","type":"single-choice",
   "question":"A licensee discovers that they have a CONFLICT OF INTEREST in a transaction (e.g., personal financial interest, family relationship to a party). The professional and legal response is:",
   "choices":["Conceal the conflict to protect the transaction","Withdraw without explanation","Disclose the conflict to all affected parties in writing and obtain their informed consent in writing — and where the conflict cannot be cured by disclosure (e.g., undivided fiduciary duty cannot run to both sides without disclosure and consent), withdraw","Continue without disclosure if the conflict is small"],
   "correctAnswer":2,
   "explanation":"Conflict of interest management is core to professional ethics and fiduciary duty. Best practice: (1) DISCLOSE the conflict in writing to all affected parties, (2) obtain INFORMED WRITTEN CONSENT to continue, and (3) WITHDRAW if the conflict cannot be cured by disclosure and consent. Failing to disclose conflicts can result in license discipline, civil liability for breach of fiduciary duty, and contract rescission. Even small conflicts should be disclosed — the magnitude is for the client (not the licensee) to assess."},

  {"id":"re-nat-311","domain":"General Principles of Agency","type":"single-choice",
   "question":"A listing broker does not advertise a property to other brokers in the MLS, keeping it 'in house' or for select clients only — sometimes called a 'pocket listing' or 'office exclusive.' Current NAR rules (under the Clear Cooperation Policy) generally require:",
   "choices":["All listings to be hidden from the MLS","Listings to be advertised only by phone","No restrictions on listing marketing","Listings to be submitted to the MLS within ONE business day of public marketing — sharply limiting traditional 'pocket listing' practices except for narrow office-exclusive cases"],
   "correctAnswer":3,
   "explanation":"The NAR Clear Cooperation Policy (effective 2020 and revised since) requires that listings be submitted to the MLS within ONE BUSINESS DAY of any 'public marketing' — yard signs, social media posts, public events, websites, email blasts. The policy sharply limits traditional 'pocket listing' practices. Narrow office-exclusive listings (marketed only within the brokerage with no public marketing) remain permitted in many MLSs. The policy is controversial and has been the subject of legal challenges."},

  {"id":"re-nat-312","domain":"General Principles of Agency","type":"single-choice",
   "question":"A broker can typically terminate a salesperson's affiliation:",
   "choices":["For cause (misconduct, violation of brokerage policies, license discipline) or pursuant to the terms of the affiliation agreement — though most states require specific written documentation and reporting to the state real estate commission","Only after 5 years of affiliation","Never","Only with court permission"],
   "correctAnswer":0,
   "explanation":"A broker can typically terminate a salesperson affiliation for cause (misconduct, violation of brokerage policies, license discipline) or pursuant to the affiliation agreement's terms. Most states require: (1) written documentation of the termination, (2) notification to the state real estate commission, and (3) proper transfer of pending files and client funds. The salesperson must then either find another supervising broker or have their license placed in inactive status."},

  {"id":"re-nat-313","domain":"General Principles of Agency","type":"single-choice",
   "question":"A real estate licensee in State A refers a client to a licensee in State B (where the licensee in State A is not licensed). The referral can be compensated by:",
   "choices":["A flat unauthorized fee to the licensee","A LEGAL referral fee from one licensed broker to another LICENSED broker, typically governed by a written referral agreement and the broker (not salesperson) compensation rules","No compensation is permitted","Cash only"],
   "correctAnswer":1,
   "explanation":"Referrals from one LICENSED broker to another LICENSED broker (or licensed real estate referral network) are permitted and commonly compensated. The compensation must (1) flow between licensed BROKERS (not directly to salespersons or unlicensed parties), (2) be governed by a written referral agreement, and (3) comply with both states' real estate laws. RESPA Section 8 generally does NOT prohibit broker-to-broker real estate referral fees (the safe harbor applies)."},

  {"id":"re-nat-314","domain":"General Principles of Agency","type":"single-choice",
   "question":"A listing broker receives a written offer on a property. The broker MUST:",
   "choices":["Hide the offer from the seller if the broker thinks it's too low","Hold the offer for 7 days before showing it to the seller","Promptly present the offer to the seller (and present subsequent offers as they arrive) — this is a fundamental fiduciary duty and explicit requirement under most state laws","Negotiate the offer up before presenting"],
   "correctAnswer":2,
   "explanation":"Listing brokers have a fundamental fiduciary duty (and an explicit duty under most state real estate laws) to PROMPTLY PRESENT ALL OFFERS to the seller — and to continue presenting subsequent offers as they arrive, even after one offer has been accepted (which the seller may want to consider as a backup). Failure to present offers is a serious breach of duty and a common ground for license discipline. The seller decides which offers to accept or reject — not the broker."},

  {"id":"re-nat-315","domain":"General Principles of Agency","type":"single-choice",
   "question":"Following the 2024 NAR antitrust settlement, before showing a buyer any properties, the buyer's broker must now:",
   "choices":["Inspect each property in advance","Promise compensation","Be paid in advance","Have a WRITTEN buyer-representation agreement signed by the buyer — specifying the broker's compensation in clear, conspicuous terms"],
   "correctAnswer":3,
   "explanation":"Effective August 2024 as a result of the NAR settlement, buyer brokers must obtain a written buyer-representation agreement BEFORE showing the buyer any properties. The agreement must specify the broker's compensation in clear, conspicuous, and disclosed terms. The buyer cannot agree to compensate the broker MORE than the agreement specifies. This represents a major shift from prior practice where representation was often informal until an offer was prepared."},

  {"id":"re-nat-316","domain":"General Principles of Agency","type":"single-choice",
   "question":"Some states allow a consumer to CANCEL a recently-signed listing or buyer-representation agreement within a stated 'cooling-off' period (e.g., 3 days). Where these rules apply:",
   "choices":["Licensees must inform consumers of their right to cancel within the stated period and provide proper cancellation forms — failure to do so may extend the consumer's cancellation right indefinitely","Cancellation is forbidden","Only the broker can cancel","Federal law preempts all state cooling-off periods"],
   "correctAnswer":0,
   "explanation":"Some states impose 'cooling-off' rights for consumers signing real estate representation agreements (especially at in-home solicitation events) similar to the federal Cooling-Off Rule for door-to-door sales. Where these rules apply, licensees must provide written notice of the cancellation right and proper cancellation forms — failure to do so may extend the consumer's cancellation right indefinitely. The exact rules and durations vary by state and by the circumstances of the signing."},

  # ── Practice of Real Estate (7) ─────────────────────────────────────────
  {"id":"re-nat-317","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The FinCEN nationwide rule effective in 2024 expanded anti-money-laundering reporting in residential real estate. Reporting persons (typically title companies and closing agents) must report:",
   "choices":["Only cash sales of $10 million or more","Beneficial ownership information for certain non-financed (all-cash) residential transactions involving legal entities — identifying the natural persons behind LLCs, trusts, and other entities purchasing real estate","All purchases regardless of financing","No real estate transactions"],
   "correctAnswer":1,
   "explanation":"FinCEN's Geographic Targeting Orders, expanded into a nationwide rule effective in 2024, require reporting of beneficial ownership information for non-financed (all-cash) residential transactions involving legal entities (LLCs, partnerships, trusts). The reporting person (typically the title company or closing agent) must identify the natural persons who ultimately own or control the purchasing entity — addressing money-laundering concerns where shell entities have been used to acquire U.S. real estate."},

  {"id":"re-nat-318","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Under the federal Fair Credit Reporting Act (FCRA), when a landlord uses a consumer credit report for tenant screening:",
   "choices":["No notice or consent is required","Federal law preempts state tenant-screening law","The landlord must obtain the prospective tenant's WRITTEN consent before pulling the report; and if denied based on the report, must provide an 'adverse action' notice with specified information about the consumer's rights and the credit bureau used","Only commercial tenants have these protections"],
   "correctAnswer":2,
   "explanation":"FCRA requires that anyone using a consumer report (credit report, background check, eviction history) for a 'permissible purpose' (including tenant screening) must: (1) certify the permissible purpose to the credit bureau; (2) obtain WRITTEN CONSENT from the consumer for the report; and (3) if taking adverse action based on the report, provide a written 'adverse action' notice with specified information (the credit bureau used, consumer's rights, including the right to a free annual report and to dispute errors)."},

  {"id":"re-nat-319","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Antitrust analysis distinguishes between PER SE violations and RULE OF REASON violations. Examples of PER SE violations (automatically illegal, no inquiry into reasonableness) include:",
   "choices":["Standard pricing across the industry","Vertical resale price maintenance","Price fixing among competitors, market allocation, group boycotts, and tying arrangements among competitors","Voluntary licensing standards"],
   "correctAnswer":2,
   "explanation":"PER SE antitrust violations are illegal regardless of effect or reasonableness — courts do not inquire into whether the conduct actually harmed competition. The classic per se violations among competitors are: (1) PRICE FIXING (agreements to set, raise, or stabilize prices), (2) MARKET ALLOCATION (dividing customers, territories, or product lines), (3) GROUP BOYCOTTS (concerted refusals to deal), and (4) TYING ARRANGEMENTS (in some circumstances). RULE OF REASON analysis (examining actual competitive effects) applies to most other restraints, including vertical relationships."},

  {"id":"re-nat-320","domain":"Practice of Real Estate","type":"single-choice",
   "question":"A 'service animal' under federal disability law (ADA) is distinguished from an 'emotional support animal' (ESA) under the Fair Housing Act in that:",
   "choices":["A 'service animal' is specifically TRAINED to perform tasks related to a person's disability (e.g., guide dog, mobility assistance), typically a dog or in some cases a miniature horse — the ADA standard. An 'emotional support animal' provides emotional support but does not require specialized task training — the FHA recognizes ESAs as reasonable accommodations in housing","ESAs are not protected","Service animals must be small","ESAs are protected only in commercial settings"],
   "correctAnswer":0,
   "explanation":"This is an important distinction: (1) Service animals under the ADA are specifically TRAINED to perform tasks for a person with a disability (guide dogs, mobility assistance, alert dogs). The ADA recognizes only dogs (and limited miniature horses) as service animals. (2) Emotional support animals (ESAs) under the FHA provide emotional support without specialized task training. The FHA recognizes ESAs as reasonable accommodations in housing — the ADA does not. Verification can require a healthcare-provider letter; landlords may not charge pet fees for either."},

  {"id":"re-nat-321","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Section 504 of the Rehabilitation Act applies to housing that receives federal financial assistance. Compared with the Fair Housing Act's disability provisions, Section 504:",
   "choices":["Provides weaker protections","Imposes ADDITIONAL obligations on covered federally-funded housing — including a requirement that the HOUSING PROVIDER pay for reasonable modifications (rather than the tenant, as under FHA) — making it stricter for federally-assisted housing","Applies only to public housing","Has been repealed"],
   "correctAnswer":1,
   "explanation":"Section 504 imposes additional obligations on housing that receives federal financial assistance (public housing, Section 8 vouchers, HUD-financed projects). Key difference from the FHA: Section 504 generally requires the HOUSING PROVIDER to pay for reasonable structural modifications for tenants with disabilities — whereas under the FHA the tenant typically pays for modifications. Section 504 also has different new-construction accessibility standards. Federally-funded housing must comply with BOTH the FHA and Section 504."},

  {"id":"re-nat-322","domain":"Practice of Real Estate","type":"single-choice",
   "question":"'Inclusionary zoning' (or 'inclusionary housing') programs require:",
   "choices":["All housing developments to be affordable","Real estate developers to include a specified percentage of affordable housing units in new residential developments, or to pay an in-lieu fee, in exchange for development approvals — used by many municipalities to encourage affordable housing supply","Only commercial developers to contribute","Only government housing"],
   "correctAnswer":1,
   "explanation":"Inclusionary zoning programs require residential developers to include a percentage of affordable units (typically 10-20%) in new developments, or in some programs to pay an in-lieu fee that goes into an affordable-housing trust fund. The programs are typically mandatory for projects above a size threshold. Developers may receive incentives (density bonuses, fee waivers, expedited permitting). Inclusionary programs are common in jurisdictions with strong housing-affordability concerns."},

  {"id":"re-nat-323","domain":"Practice of Real Estate","type":"single-choice",
   "question":"For pre-1978 housing sales, federal Title X requires the seller to provide the buyer with an EPA-approved pamphlet titled:",
   "choices":["EPA Lead Hazard Guide","The Safe Buyer's Pamphlet","Lead-Based Paint in Your Home","'Protect Your Family from Lead in Your Home' — the EPA-approved pamphlet that must accompany the Title X disclosure form"],
   "correctAnswer":3,
   "explanation":"The federal Title X (Residential Lead-Based Paint Hazard Reduction Act) requires sellers of most pre-1978 housing to provide buyers with (1) a lead-based paint disclosure form, (2) the EPA-approved pamphlet 'Protect Your Family from Lead in Your Home,' and (3) (unless waived) a 10-day opportunity to conduct lead-based paint inspections or risk assessments. The pamphlet is available in multiple languages. Real estate licensees and sellers are jointly responsible for compliance."},

  # ── Financing (5) ───────────────────────────────────────────────────────
  {"id":"re-nat-324","domain":"Financing","type":"single-choice",
   "question":"VA-guaranteed loans for eligible veterans typically include a 'VA funding fee.' This fee:",
   "choices":["Compensates the VA for the loan guarantee — paid at closing (often financed into the loan), varies based on use of benefit, down payment, and military category, and may be WAIVED for veterans with service-connected disabilities","Replaces the interest rate","Is paid annually for the loan's term","Is exempt from disclosure"],
   "correctAnswer":0,
   "explanation":"The VA funding fee is a one-time fee paid at closing (typically financed into the loan amount) that compensates the VA for the loan guarantee program. Amount varies based on (1) first-time vs. subsequent use of VA benefit, (2) percentage of down payment, and (3) the veteran's military category. Fees range from about 1.4% to 3.6% of the loan amount. The fee is WAIVED for veterans receiving compensation for service-connected disability and certain other circumstances."},

  {"id":"re-nat-325","domain":"Financing","type":"single-choice",
   "question":"FHA loans require both an Upfront Mortgage Insurance Premium (UFMIP) AND an Annual Mortgage Insurance Premium (MIP). For most FHA borrowers:",
   "choices":["UFMIP is paid annually","UFMIP (typically 1.75% of the loan amount) is paid at closing or financed into the loan; ANNUAL MIP is paid monthly throughout most of the loan term — and for loans with less than 10% down, MIP is generally required for the LIFE OF THE LOAN","All FHA mortgage insurance can be removed at 80% LTV","FHA loans require no mortgage insurance"],
   "correctAnswer":1,
   "explanation":"FHA mortgage insurance rules differ from conventional PMI. UFMIP (Upfront Mortgage Insurance Premium) is typically 1.75% of the loan amount, paid at closing or financed in. Annual MIP is paid monthly throughout most or all of the loan's life. For FHA loans with less than 10% down (typical 3.5% down scenarios), MIP is generally required for the LIFE OF THE LOAN — you cannot remove it like conventional PMI. For 10%+ down FHA loans, MIP can be removed after 11 years."},

  {"id":"re-nat-326","domain":"Financing","type":"single-choice",
   "question":"For conventional loans, the federal Homeowners Protection Act (HPA) provides rules for PMI removal. Under HPA, the lender must AUTOMATICALLY terminate PMI when:",
   "choices":["LTV reaches 90%","LTV reaches 85%","The loan balance reaches 78% of the ORIGINAL value (based on the original amortization schedule), provided the borrower is current on payments — and the borrower may REQUEST cancellation at 80% LTV","LTV reaches 70%"],
   "correctAnswer":2,
   "explanation":"HPA mandates: (1) AUTOMATIC PMI termination when the loan balance reaches 78% of the original value based on the original amortization schedule, provided the borrower is current; (2) BORROWER-REQUESTED cancellation at 80% LTV based on original value (current LTV via amortization or based on appraisal showing current value), again provided current and no delinquency history. The 'midpoint of the amortization schedule' rule also requires termination by halfway through the term regardless of LTV."},

  {"id":"re-nat-327","domain":"Financing","type":"single-choice",
   "question":"The 'conforming loan limit' is set annually by the Federal Housing Finance Agency (FHFA) for loans purchased by Fannie Mae and Freddie Mac. For 2026:",
   "choices":["Has not been set yet","Is fixed at $300,000 nationally","Has been eliminated","Varies by county — with a baseline conforming limit (in 2025 around $806,500 for one-unit homes) and higher limits in designated 'high-cost' areas (up to about 150% of baseline)"],
   "correctAnswer":3,
   "explanation":"The conforming loan limit varies by county. The FHFA sets an annual BASELINE conforming limit applicable in most areas (was $806,500 for one-unit homes in 2025), and HIGHER limits in designated 'high-cost' areas (up to about 150% of the baseline, typically about $1.2 million in 2025). Counties like New York, San Francisco, Los Angeles, and certain Hawaii counties typically have the highest limits. Loans above the conforming limit are 'jumbo' and don't qualify for purchase by Fannie/Freddie."},

  {"id":"re-nat-328","domain":"Financing","type":"single-choice",
   "question":"In a 'seller financing' arrangement, the seller acts as the lender. Key documents typically include:",
   "choices":["A promissory note (evidencing the debt and the borrower's promise to pay) AND a mortgage or deed of trust (securing the loan with the property); often a warranty deed conveys title to the buyer subject to the security instrument","Only a deed","Only a promissory note","No documents are required"],
   "correctAnswer":0,
   "explanation":"In seller financing, the seller becomes the lender — financing all or part of the purchase price. Key documents: (1) a PROMISSORY NOTE (evidencing the debt and the borrower's promise to pay), (2) a MORTGAGE or DEED OF TRUST (securing the loan against the property — establishing the lender's lien priority), and (3) a WARRANTY DEED conveying title to the buyer, subject to the security instrument. The seller now holds a lien on the property. Seller financing is common when traditional financing isn't available or for tax-deferral via installment sale treatment."},

  # ── Real Estate Calculations (5) ────────────────────────────────────────
  {"id":"re-nat-329","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An income property has Net Operating Income (NOI) of $100,000. The annual debt service (principal + interest) on the mortgage is $80,000. What is the Debt Service Coverage Ratio (DSCR)?",
   "choices":["0.80","1.25","1.80","2.00"],
   "correctAnswer":1,
   "explanation":"Step 1 — DSCR formula: DSCR = NOI ÷ Annual Debt Service.\nStep 2 — Apply: $100,000 ÷ $80,000 = 1.25.\nA DSCR of 1.25 means the property's NOI is 1.25x its debt service — there's a 25% 'cushion' above what's needed to cover the loan. Lenders typically require minimum DSCRs of 1.20 to 1.25 for commercial loans. A DSCR below 1.00 means NOI is insufficient to cover debt service (the property doesn't 'pencil')."},

  {"id":"re-nat-330","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An apartment building has Potential Gross Income (PGI) of $200,000 (if 100% occupied), with a 5% vacancy and collection allowance. What is the Effective Gross Income (EGI)?",
   "choices":["$205,000","$200,000","$190,000","$210,000"],
   "correctAnswer":2,
   "explanation":"Step 1 — EGI formula: EGI = PGI − (Vacancy and Collection Loss).\nStep 2 — Apply: $200,000 × 5% = $10,000 vacancy loss; $200,000 − $10,000 = $190,000.\nEffective Gross Income reflects expected actual collections after accounting for normal vacancies, turnover periods, and bad debt. EGI is then reduced by operating expenses to arrive at NOI."},

  {"id":"re-nat-331","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An apartment building has 50 units. Over the past year, the average number of units rented was 47.5. What was the average vacancy rate?",
   "choices":["2.5%","47.5%","52.5%","5%"],
   "correctAnswer":3,
   "explanation":"Step 1 — Vacancy Rate = Vacant Units ÷ Total Units.\nStep 2 — Vacant units: 50 − 47.5 = 2.5 units.\nStep 3 — Apply: 2.5 ÷ 50 = 0.05 = 5%.\nThe occupancy rate is the complement: 47.5 ÷ 50 = 0.95 = 95%. Vacancy rate + Occupancy rate = 100%. Lenders and appraisers use vacancy rates from local markets to underwrite expected income; the actual figure may exceed market-average estimates during downturns or in high-turnover properties."},

  {"id":"re-nat-332","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A property has a market value of $400,000. The local assessor assesses it at $280,000. What is the ASSESSMENT RATIO?",
   "choices":["70%","30%","100%","43%"],
   "correctAnswer":0,
   "explanation":"Step 1 — Assessment Ratio = Assessed Value ÷ Market Value.\nStep 2 — Apply: $280,000 ÷ $400,000 = 0.70 = 70%.\nDifferent jurisdictions use different assessment ratios — some assess at 100% of market value, others use a lower percentage (e.g., 50%, 70%, etc.). The tax rate (mill rate) is then applied to the assessed value to compute the property tax bill. Lower assessment ratios paired with higher tax rates can produce similar tax bills as higher ratios with lower rates."},

  {"id":"re-nat-333","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An investor buys a $400,000 property with $100,000 cash down (rest financed). The property generates $36,000 annual cash flow after debt service. What is the cash-on-cash return?",
   "choices":["9%","36%","12%","25%"],
   "correctAnswer":1,
   "explanation":"Step 1 — Cash-on-Cash Return = Annual Cash Flow ÷ Cash Invested.\nStep 2 — Apply: $36,000 ÷ $100,000 = 0.36 = 36%.\nNote how leverage AMPLIFIES the cash-on-cash return compared to an all-cash purchase. An all-cash $400,000 purchase generating $36,000 NOI would produce only a 9% cap rate (36,000 ÷ 400,000). Using $100,000 cash with $300,000 of leverage produces a 36% cash-on-cash return — the trade-off is amplified downside risk if cash flow declines."},

  # ── Property Ownership (4) ──────────────────────────────────────────────
  {"id":"re-nat-334","domain":"Property Ownership","type":"single-choice",
   "question":"Liens are classified as VOLUNTARY or INVOLUNTARY. Which of the following is an INVOLUNTARY lien?",
   "choices":["Mortgage","Deed of trust","Mechanic's lien — placed on property by a contractor or supplier for unpaid construction work; created by operation of law without the owner's consent","Equipment lien"],
   "correctAnswer":2,
   "explanation":"VOLUNTARY liens are created with the owner's consent — mortgages, deeds of trust, equipment financing. INVOLUNTARY liens are created by operation of law without consent — mechanics' liens (contractors/suppliers for unpaid work), tax liens (federal, state, property), judgment liens (court awards), and lis pendens. The owner may not even know about some involuntary liens until they appear on a title report. State law governs when, how, and for how long involuntary liens attach."},

  {"id":"re-nat-335","domain":"Property Ownership","type":"single-choice",
   "question":"A contractor performs $50,000 of work on a home. The homeowner refuses to pay. State law allows the contractor to file a:",
   "choices":["Easement","Lis pendens only","Quitclaim","Mechanic's lien (also called a construction lien) — a statutory involuntary lien securing payment for work performed or materials supplied to improve the property; filed within statutory deadlines and effective to encumber the property until satisfied"],
   "correctAnswer":3,
   "explanation":"A mechanic's lien (or construction lien) is a statutory involuntary lien securing payment for labor or materials provided to improve real property. Filing requirements and deadlines vary by state — typically a few months from the last work performed. Properly filed mechanics' liens encumber the property and must be released or satisfied before the property can be sold with marketable title. They can take PRIORITY over recorded mortgages in some states (super-priority for the period of work)."},

  {"id":"re-nat-336","domain":"Property Ownership","type":"single-choice",
   "question":"A general judgment lien against a person attaches to ALL real property they own in the relevant jurisdiction. A specific lien attaches only to a SPECIFIC piece of real property. Which is correct?",
   "choices":["General lien — attaches to ALL of the debtor's property; specific lien — attaches only to a SPECIFIC piece of property identified in the lien","All liens are general","All liens are specific","The distinction doesn't matter"],
   "correctAnswer":0,
   "explanation":"This is an important property-rights distinction. GENERAL LIENS attach to ALL of the debtor's real property in the jurisdiction — examples include general judgment liens (after a court ruling) and federal tax liens. SPECIFIC LIENS attach only to a particular property — examples include mortgages, mechanics' liens (only the property where the work was done), property tax liens, and special assessment liens. The category affects how the lien is enforced and what property is available to satisfy it."},

  {"id":"re-nat-337","domain":"Property Ownership","type":"single-choice",
   "question":"In foreclosure, the order of distribution from sale proceeds generally follows lien priority. In most states (subject to state-specific super-priorities), the typical order is:",
   "choices":["By size of lien — largest first","Property taxes and certain government liens (often super-priority), THEN senior recorded liens in time-of-recording order, THEN junior recorded liens in time-of-recording order, until proceeds are exhausted; any surplus returns to the foreclosed owner","Random order","Whoever bid at the auction"],
   "correctAnswer":1,
   "explanation":"Foreclosure distribution generally follows lien priority. The typical order: (1) property tax liens and certain government super-priority liens (HOA assessment liens in some states), (2) senior recorded liens in time-of-recording order, (3) junior recorded liens in time-of-recording order, until proceeds are exhausted. Any SURPLUS after all liens are satisfied returns to the foreclosed owner — not the foreclosing lender. Junior lienholders 'wiped out' by senior foreclosure can still pursue the borrower personally for any deficiency (depending on state anti-deficiency laws)."},

  # ── Transfer of Title (4) ───────────────────────────────────────────────
  {"id":"re-nat-338","domain":"Transfer of Title","type":"single-choice",
   "question":"A grantor conveys property they don't actually own (via a warranty deed) to a grantee. Later, the grantor actually acquires title. Under the doctrine of AFTER-ACQUIRED TITLE (or estoppel by deed):",
   "choices":["The grantor still owns nothing","The grantee has no rights","Title that the grantor later acquires AUTOMATICALLY inures to the benefit of the prior grantee — the grantor is estopped from denying that title passed via the original deed","The grantee must pay again"],
   "correctAnswer":2,
   "explanation":"Under the after-acquired title doctrine (estoppel by deed), when a grantor conveys property they don't own via a warranty deed and later acquires the actual title, that subsequently-acquired title AUTOMATICALLY inures to the benefit of the prior grantee. The grantor is estopped (legally prevented) from later denying the conveyance. The doctrine applies to deeds that contain warranties (general warranty, special warranty, or grant deeds) — quitclaim deeds typically don't trigger it because they make no warranty of title."},

  {"id":"re-nat-339","domain":"Transfer of Title","type":"single-choice",
   "question":"A buyer's title search reveals an old recorded use restriction (e.g., 'no alcohol may be served on these premises') that has been in place for 50+ years. Under most circumstances:",
   "choices":["The buyer can ignore old restrictions","The buyer must pay to remove old restrictions","The restriction is automatically void","The recorded restriction runs with the land and binds subsequent owners — though the buyer should investigate enforceability (some old restrictions are unenforceable due to changed circumstances, public policy violations, abandonment, or specific limitations laws); state Marketable Record Title Acts may also extinguish very old encumbrances"],
   "correctAnswer":3,
   "explanation":"Properly recorded use restrictions generally run with the land and bind subsequent owners. However, enforceability can be limited by: (1) changed circumstances (where the restriction has lost its purpose), (2) public policy violations (e.g., racial restrictions, which are unenforceable as unconstitutional and violate fair housing law), (3) abandonment (consistent non-enforcement may waive enforcement rights), and (4) state Marketable Record Title Acts that extinguish encumbrances older than a stated period (often 30-50 years) unless re-recorded."},

  {"id":"re-nat-340","domain":"Transfer of Title","type":"single-choice",
   "question":"Many states have enacted MARKETABLE RECORD TITLE ACTS designed to:",
   "choices":["Clear titles by extinguishing old encumbrances and interests not specifically preserved or re-recorded within a stated period (often 30-50 years), reducing the title search burden and protecting purchasers from ancient claims","Make all titles unmarketable","Eliminate title insurance","Increase real estate taxes"],
   "correctAnswer":0,
   "explanation":"Marketable Record Title Acts (adopted by many states) extinguish old encumbrances, interests, and claims that are not specifically preserved or re-recorded within a stated 'root of title' period (typically 30-50 years). The acts reduce the title-search burden and clear ancient claims that might otherwise cloud title indefinitely. Certain interests are typically PRESERVED regardless of age — easements, mineral rights specifically recorded, government claims, recorded utility easements. The exact scope varies significantly by state."},

  {"id":"re-nat-341","domain":"Transfer of Title","type":"single-choice",
   "question":"Some states have 'statutory warranty deeds' that:",
   "choices":["Are deeds containing only a single warranty","Use language prescribed by state statute (often shorter than common-law warranty deeds) that, by statutory effect, conveys the same warranties as a general warranty deed — the statute defines what warranties are implied even though they're not spelled out in the deed itself","Are deeds without any warranties","Are exclusively for commercial property"],
   "correctAnswer":1,
   "explanation":"Statutory warranty deeds (recognized in many states) use language specifically prescribed by state statute — typically much shorter than common-law warranty deeds. The statute defines the warranties implied by the prescribed language: typically the full bundle of warranties (seisin, quiet enjoyment, against encumbrances, of further assurance, and of warranty). The advantage is brevity and standardization; the warranties are statutorily implied without needing to be spelled out in each deed. This is the most common warranty deed form in many states."},

  # ── Valuation and Market Analysis (3) ───────────────────────────────────
  {"id":"re-nat-342","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"The INCOME APPROACH to value includes two main techniques: DIRECT CAPITALIZATION (a single year's income capitalized at a market cap rate) and DISCOUNTED CASH FLOW (DCF — projecting multiple years of cash flows and discounting to present value). DCF is typically used for:",
   "choices":["Stabilized properties","Single-family residences","Properties expected to have UNSTABILIZED or fluctuating cash flows over a holding period (e.g., new properties leasing up, properties undergoing major renovations, properties with significant rent rollover) — where the simple single-year direct capitalization wouldn't fairly reflect value","Vacant land only"],
   "correctAnswer":2,
   "explanation":"Direct capitalization (Value = NOI ÷ Cap Rate) works well for stabilized properties with predictable cash flows. Discounted Cash Flow (DCF) projects multiple years of cash flows plus a terminal value at sale and discounts each to present value — capturing variability that direct cap can't. DCF is preferred for: properties leasing up (new construction), undergoing renovation, with significant near-term lease rollovers, in changing markets, or with development components. It's more flexible but also more sensitive to projection assumptions."},

  {"id":"re-nat-343","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"To DERIVE a capitalization rate, appraisers may use several methods. The BAND-OF-INVESTMENT method computes the cap rate as:",
   "choices":["The average of all comparables' cap rates","Property tax rate ÷ 2","Vacancy rate + management fee","The weighted average of (a) the mortgage constant for the debt portion and (b) the equity dividend rate for the equity portion — reflecting the cap rate the property must produce to satisfy both the lender's debt service and the equity investor's return requirement"],
   "correctAnswer":3,
   "explanation":"The band-of-investment method derives a cap rate as a weighted average of (1) the mortgage constant (annual debt service ÷ loan amount, reflecting the lender's required return) and (2) the equity dividend rate (the equity investor's required cash-on-cash return). The weights are the loan-to-value ratio and equity ratio respectively. Example: 75% LTV at 8% mortgage constant + 25% equity at 12% required return = (0.75 × 0.08) + (0.25 × 0.12) = 0.06 + 0.03 = 9% cap rate."},

  {"id":"re-nat-344","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"In appraisal, COST, PRICE, and VALUE are distinct concepts. The classic distinction is:",
   "choices":["Cost is what was paid to produce something; Price is what a buyer actually paid in a specific transaction; Value is what something is WORTH (typically market value — what a typical buyer would pay)","All three terms are synonymous","Cost and value are always equal","Price is always more than cost"],
   "correctAnswer":0,
   "explanation":"This important triad: COST is what was paid (or would be paid) to produce or replace something. PRICE is what a particular buyer actually paid in a specific transaction — it reflects the unique circumstances of that transaction. VALUE is what something is worth in an objective market sense — typically defined as 'most probable price' a typical buyer would pay (market value). The three are typically DIFFERENT: a property may have cost $300,000 to build, sell for $350,000 (the price), but have a market value of $370,000."},

  # ── Property Disclosures (3) ────────────────────────────────────────────
  {"id":"re-nat-345","domain":"Property Disclosures","type":"single-choice",
   "question":"Many states now require working carbon monoxide (CO) detectors in residential rental and sale properties because:",
   "choices":["CO has no health effects","Carbon monoxide is a colorless, odorless gas that is highly toxic — produced by gas appliances, fireplaces, attached garages, and other fuel-burning sources — and CO detectors are essential for early warning","CO detectors detect smoke","CO is detectable by smell"],
   "correctAnswer":1,
   "explanation":"Carbon monoxide is a colorless, odorless, highly toxic gas — undetectable by human senses. It is produced by incomplete combustion in gas appliances, fireplaces, wood stoves, attached garages, and other fuel-burning sources. Many states and most newer building codes now require working CO detectors in residential structures with fuel-burning appliances or attached garages. Real estate disclosures typically address whether detectors are installed and functional."},

  {"id":"re-nat-346","domain":"Property Disclosures","type":"single-choice",
   "question":"Most state laws and modern building codes require working smoke alarms in residential properties. In a real estate transaction:",
   "choices":["Smoke alarms are irrelevant","Smoke alarms are entirely the buyer's responsibility","Disclosure of smoke alarm presence/functionality is common in seller disclosure forms, and many states impose specific requirements (e.g., updating alarms before sale, installing in specific locations, hardwired with battery backup); the seller often must certify that working smoke alarms are present at closing","Sellers must remove smoke alarms before closing"],
   "correctAnswer":2,
   "explanation":"Smoke alarms have become a standard part of residential property disclosure and inspection. Modern building codes require alarms in each bedroom, outside sleeping areas, and on each floor — typically hardwired with battery backup. Many states impose specific requirements for smoke alarms in residential property transfers — requiring sellers to install or update alarms before closing. Property disclosure forms typically include smoke alarm questions, and inspectors verify installation and function."},

  {"id":"re-nat-347","domain":"Property Disclosures","type":"single-choice",
   "question":"A property is served by a private well as its primary water source. Most state disclosure laws and best practices would require or recommend:",
   "choices":["No disclosure","Disclosure only at the buyer's request","Disclosure of the water source itself only","Disclosure of the water source (well), the well's location and depth, age, recent water quality test results (commonly testing for bacteria, nitrates, lead, arsenic and other parameters as appropriate to the region), and any known issues — buyers commonly request additional water quality testing during the inspection period"],
   "correctAnswer":3,
   "explanation":"Private wells require comprehensive disclosure because they affect the property's value, ongoing maintenance, and buyer's understanding of water safety. Standard disclosures: water source (well, spring, cistern), location, depth, age, capacity (gallons per minute), and recent water quality test results. Standard testing covers bacteria, nitrates, lead, arsenic, and parameters specific to local risks (e.g., uranium in some areas, methane in others). Buyers commonly arrange independent testing during the inspection period."},

  # ── Land Use Controls and Regulations (2) ───────────────────────────────
  {"id":"re-nat-348","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"'SPOT ZONING' refers to:",
   "choices":["Rezoning a small specific parcel of land in a way that is INCONSISTENT with the surrounding zoning and the community's broader land-use plan — generally disfavored by courts and often subject to legal challenge","The required process for all zoning changes","A standard subdivision practice","A required zone for parking lots"],
   "correctAnswer":0,
   "explanation":"Spot zoning is the rezoning of a small parcel in a way INCONSISTENT with the surrounding zoning and the community's broader land-use plan — typically benefiting a single property owner or small group at the expense of the surrounding community's coherent planning. It is generally disfavored by courts and often subject to legal challenge as arbitrary or unconstitutional. Whether a specific rezoning is unconstitutional spot zoning depends on factors like the size of the area rezoned, the public benefits, the consistency with the master plan, and the impact on neighboring properties."},

  {"id":"re-nat-349","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"To formally change a zoning ordinance or boundary, the typical procedural steps are:",
   "choices":["No formal process required","Approval by the planning commission (recommendation), followed by public hearings, followed by approval by the local governing body (city council or county commission) — with mandatory notice to surrounding property owners and opportunity for public comment","Approval by one neighbor only","Approval by federal court"],
   "correctAnswer":1,
   "explanation":"Zoning amendments (including rezoning) typically require: (1) application to the planning department and review by the planning commission (which makes a recommendation), (2) public hearings with mandatory notice to surrounding property owners (often by mail to addresses within a stated radius and by published notice), (3) consideration of the comprehensive plan and consistency analysis, and (4) final approval by the local governing body (city council, county commission). The process is designed to give affected property owners a meaningful opportunity to be heard."},

  # ── Leasing and Property Management (1) ─────────────────────────────────
  {"id":"re-nat-350","domain":"Leasing and Property Management","type":"single-choice",
   "question":"A tenant's lease prohibits SUBLETTING without the landlord's consent. The tenant transfers their lease to another person under a separate agreement. The difference between an 'assignment' and a 'sublet' is:",
   "choices":["No legal difference","Subletting is illegal","ASSIGNMENT — the tenant transfers their ENTIRE remaining interest in the lease to the assignee (the assignee becomes the new tenant directly to the landlord); SUBLETTING — the original tenant retains some interest and the subtenant pays the original tenant (who remains responsible to the landlord)","Both terms mean the same thing"],
   "correctAnswer":2,
   "explanation":"This is a critical lease distinction. ASSIGNMENT: the tenant transfers their ENTIRE remaining interest in the lease — the assignee 'steps into the shoes' of the original tenant and becomes the new tenant directly liable to the landlord. SUBLETTING: the original tenant retains some interest (typically the right to resume possession at sublease end) — the subtenant pays the original tenant, who remains responsible to the landlord. Many leases restrict or require consent for both. Even where allowed, assignment ends the original tenant's liability only if the landlord releases (a novation); sublet does not."},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
