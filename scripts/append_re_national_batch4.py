"""Real Estate National batch 4 — questions 151-200."""
import json, pathlib

Q = pathlib.Path("src/data/real-estate-national-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── Contracts (9) ───────────────────────────────────────────────────────
  {"id":"re-nat-151","domain":"Contracts","type":"single-choice",
   "question":"A buyer wants to authorize their attorney to sign the deed and closing documents on their behalf at a closing the buyer cannot attend. Under the 'equal dignity' rule:",
   "choices":["The buyer must be present at closing in person; powers of attorney are not allowed in real estate","The power of attorney must itself be in writing and notarized (and recorded in many states), because the contract it authorizes (a real estate transfer) must be in writing","Powers of attorney for real estate are valid only if oral","The attorney does not need any written authority"],
   "correctAnswer":1,
   "explanation":"The equal dignity rule states that when an agent's authority is to execute a contract that itself must be in writing (such as a real estate transfer under the Statute of Frauds), the authorization itself must be in writing. Real estate powers of attorney must typically be in writing, notarized, and (in many states) recorded in the county where the property is located to be effective."},

  {"id":"re-nat-152","domain":"Contracts","type":"single-choice",
   "question":"A seller mistakenly states the house has central air conditioning when in fact only one window unit cools the house. The seller honestly believed the claim. The buyer reasonably relied on the statement and purchased. This is best classified as:",
   "choices":["Fraud — intentional misrepresentation","Puffing — non-actionable opinion","Innocent misrepresentation — a false statement of material fact made without fraudulent intent, which may still give rise to rescission","No legal claim available"],
   "correctAnswer":2,
   "explanation":"Innocent misrepresentation is a false statement of material fact made without fraudulent intent — the speaker honestly believed it true. Despite the lack of intent, the misrepresentation can still entitle the buyer to rescission (and sometimes restitution) in many states. Fraud requires either knowledge of falsity or reckless disregard for the truth. Puffing involves opinions and exaggerations that a reasonable buyer would not rely on."},

  {"id":"re-nat-153","domain":"Contracts","type":"single-choice",
   "question":"A residential purchase contract contains a 10-day inspection contingency. After inspecting on day 7, the buyer discovers significant issues and wants to terminate. The buyer must:",
   "choices":["Wait until the contingency expires to act","Continue with the purchase and address issues later","Sue for fraud","Deliver written notice of termination within the inspection period as required by the contract — typically also returning the property to its pre-inspection condition"],
   "correctAnswer":3,
   "explanation":"Inspection contingencies must be exercised within the stated period and according to the contract's notice procedures. If the buyer fails to deliver proper written notice within the contingency period, the right to terminate based on inspection findings is typically waived. The buyer may then face the choice of completing the purchase or defaulting (with potential forfeiture of earnest money)."},

  {"id":"re-nat-154","domain":"Contracts","type":"single-choice",
   "question":"A seller refuses to close on a fully executed purchase contract. The buyer's typical remedies include:",
   "choices":["Specific performance (compelling the conveyance), money damages, OR rescission with return of earnest money — depending on what the buyer prefers and what the contract allows","Only return of earnest money","Only specific performance","Only criminal complaint against the seller"],
   "correctAnswer":0,
   "explanation":"A buyer's remedies for seller default typically include: specific performance (because each parcel is unique, courts often grant this), monetary damages for actual losses (e.g., higher prices for comparable replacement homes), or rescission with return of earnest money plus damages. Most modern residential contracts may also offer the buyer a 'remedy of choice' provision."},

  {"id":"re-nat-155","domain":"Contracts","type":"single-choice",
   "question":"A buyer purchases a newly-constructed home from the builder-seller. Several months later, defects emerge. In most states, the buyer may have claims under:",
   "choices":["No theory — 'caveat emptor' applies fully to new construction","An implied warranty of habitability (or similar implied warranty of new construction) by the builder, which typically cannot be disclaimed entirely without clear and conspicuous language","Express warranty only — never implied warranty","Tort claims only — never contract claims"],
   "correctAnswer":1,
   "explanation":"Most states recognize an implied warranty of habitability (sometimes called the implied warranty of workmanship or quality construction) imposed on builders selling new construction. These warranties cover defects rendering the home unfit for habitation (or below industry standards) and typically cannot be fully disclaimed without clear, conspicuous, and bargained-for language. The buyer's remedies include damages and, in some states, rescission."},

  {"id":"re-nat-156","domain":"Contracts","type":"single-choice",
   "question":"A liquidated damages clause is enforceable when:",
   "choices":["It is at least 25% of the contract price","It is signed at closing","It (1) addresses damages that would have been difficult to calculate at the time of contracting AND (2) sets a reasonable amount in light of expected harm — and is not a penalty","It uses the words 'liquidated damages' regardless of amount"],
   "correctAnswer":2,
   "explanation":"Courts enforce liquidated damages clauses when (1) at the time of contracting actual damages would have been difficult to calculate AND (2) the agreed amount is a reasonable estimate of likely loss. If the amount is grossly disproportionate to expected harm — functioning as a penalty rather than damages — courts will refuse to enforce the clause. Most residential earnest money provisions easily meet the test."},

  {"id":"re-nat-157","domain":"Contracts","type":"single-choice",
   "question":"A seller mails a purchase contract to a buyer with the words 'If I don't hear from you in 7 days, I'll assume you accepted.' The buyer does not respond. Is there a binding contract?",
   "choices":["Yes — silence is acceptance","Yes — if 7 days have passed","No — acceptance generally requires an affirmative act of communication; silence is generally not acceptance except in narrow circumstances","Yes — only if the buyer mailed the contract back"],
   "correctAnswer":2,
   "explanation":"As a general rule, silence is NOT acceptance. The offeror cannot impose a duty to respond on the offeree. There are limited exceptions — for example, when prior dealings make it reasonable for silence to indicate acceptance, when the offeree takes the benefit of services with opportunity to reject, or where the offeree expressly informs the offeror that silence will be acceptance. None of these apply to a typical first-time real estate offer."},

  {"id":"re-nat-158","domain":"Contracts","type":"single-choice",
   "question":"A buyer wants to take over the seller's existing mortgage rather than obtain new financing. The lender must approve this assumption. After assumption:",
   "choices":["The buyer becomes the primary borrower; the original seller-borrower may remain SECONDARILY liable unless the lender releases them via novation","The seller has no further liability whatsoever, automatically","The buyer is automatically released from liability","The assumption avoids any need for lender approval"],
   "correctAnswer":0,
   "explanation":"After assumption, the buyer becomes the primary obligor on the loan. The seller-borrower typically remains secondarily liable UNLESS the lender expressly releases them (a novation). Most modern mortgages contain due-on-sale clauses that allow the lender to call the loan due upon any transfer — making formal lender-approved assumptions rare in residential lending. VA and FHA loans have specific assumption rules."},

  {"id":"re-nat-159","domain":"Contracts","type":"single-choice",
   "question":"In most states, the statute of limitations for breach-of-contract claims in real estate transactions begins to run when:",
   "choices":["The contract is signed","The breach occurs (or is reasonably discovered, under some 'discovery rule' state law); typically 3-10 years depending on state","The lawsuit is filed","Never — there is no statute of limitations on real estate"],
   "correctAnswer":1,
   "explanation":"The statute of limitations for breach of contract typically begins to run when the breach occurs OR (under some states' 'discovery rule') when the breach is reasonably discovered or should have been discovered. Typical statutes range from 3-10 years depending on the state, with written contracts often having longer periods than oral. The exact period and triggering rule are state-specific."},

  # ── General Principles of Agency (7) ────────────────────────────────────
  {"id":"re-nat-160","domain":"General Principles of Agency","type":"single-choice",
   "question":"A salesperson commits a fair-housing violation while showing a property. Under principles of agency law, the supervising broker:",
   "choices":["Bears no responsibility","May avoid responsibility by claiming ignorance","Can be VICARIOUSLY liable for the salesperson's conduct in the scope of the agency, in addition to the salesperson's individual liability","Is responsible only if also present at the showing"],
   "correctAnswer":2,
   "explanation":"Under the doctrine of respondeat superior and principles of broker-licensee agency, a supervising broker is generally vicariously liable for acts committed by salespersons within the scope of their licensed activities — even without the broker's direct knowledge or participation. The salesperson remains personally liable as well. This is why brokers have extensive supervisory and training duties under state real estate laws."},

  {"id":"re-nat-161","domain":"General Principles of Agency","type":"single-choice",
   "question":"A broker intentionally contacts a seller already under an exclusive right-to-sell listing with another broker and induces the seller to break the existing contract and list with the contacting broker. This conduct is:",
   "choices":["Permitted as ordinary competition","A National Association of Realtors Code of Ethics requirement","Encouraged by state real estate commissions","Tortious interference with contract — potentially actionable by the original broker for damages"],
   "correctAnswer":3,
   "explanation":"Tortious interference with contract (sometimes called intentional interference) occurs when a third party knowingly and intentionally induces a contract breach without legal justification. A broker who actively encourages a seller to break an existing listing — knowing of the listing — can face liability for damages caused. NAR Code of Ethics Articles 16-13 specifically address this and provide arbitration mechanisms."},

  {"id":"re-nat-162","domain":"General Principles of Agency","type":"single-choice",
   "question":"In a traditional cooperative-MLS sale, the listing broker historically agreed to a commission of 6% of the sale price, with the listing broker retaining 3% and offering 3% to the cooperating (buyer's) broker. After the 2024 settlement reforms, this arrangement:",
   "choices":["Is no longer broadcast on the MLS; buyer's commissions must now be negotiated directly between buyer and buyer's broker (typically via written buyer-representation agreements)","Is required by federal law","Has been declared unconstitutional","Has not changed at all"],
   "correctAnswer":0,
   "explanation":"Following the 2024 NAR antitrust settlement (Sitzer/Burnett and related cases), the historical practice of listing brokers broadcasting buyer-broker compensation offers through the MLS has ended. Buyer broker compensation must now be negotiated through written buyer-representation agreements signed before showing properties. Seller-paid concessions toward buyer broker compensation can still occur, but must be negotiated outside the MLS."},

  {"id":"re-nat-163","domain":"General Principles of Agency","type":"single-choice",
   "question":"A buyer asks an agent for advice on selecting a home inspector. The agent should:",
   "choices":["Personally inspect the home and certify it","Provide a list of qualified inspectors (or a non-exclusive recommendation list) and let the buyer choose, avoiding any kickback or referral fee arrangement that would violate RESPA","Refuse to provide any information","Demand the buyer use the agent's preferred inspector"],
   "correctAnswer":1,
   "explanation":"Agents may provide non-exclusive lists of qualified service providers (inspectors, lenders, attorneys), but cannot accept kickbacks or referral fees for the referral of business in violation of RESPA Section 8. Best practice is to provide multiple options and let the client choose, document the disclosure if any business relationship exists, and never pressure a client toward any specific provider."},

  {"id":"re-nat-164","domain":"General Principles of Agency","type":"single-choice",
   "question":"A real estate licensee's 'standard of care' to clients is generally:",
   "choices":["Strict liability for any defect","Higher than that owed to non-clients","The level of care, skill, and diligence reasonably expected of a competent licensee in similar circumstances","Identical to that of an unlicensed seller"],
   "correctAnswer":2,
   "explanation":"Licensed real estate professionals must exercise the level of care, skill, and diligence reasonably expected of a competent licensee in similar circumstances. This standard rises above that of an unlicensed seller and grounds in the licensee's professional expertise and fiduciary obligations. Failure to meet this standard can give rise to claims of professional negligence."},

  {"id":"re-nat-165","domain":"General Principles of Agency","type":"single-choice",
   "question":"Under an OPEN listing, a seller:",
   "choices":["Is exclusively bound to one broker for commission purposes","Has agreed in writing to a fixed commission","Owes a commission only to the broker who actually procures the buyer; the seller may engage multiple brokers AND sell directly without owing any broker a commission","Cannot list with more than one broker"],
   "correctAnswer":2,
   "explanation":"In an open listing, the seller may engage multiple brokers simultaneously. Only the broker who actually procures the eventual buyer is entitled to commission. Importantly, the seller may also sell directly to a buyer the seller found independently without owing any broker a commission. Open listings are uncommon in residential transactions but are more common in commercial."},

  {"id":"re-nat-166","domain":"General Principles of Agency","type":"single-choice",
   "question":"A broker procures a buyer who is 'ready, willing, and able' to purchase at the listing price and terms. The seller then refuses to sell. Generally, the broker:",
   "choices":["Is entitled to the commission, because the broker fulfilled their part of the agreement","Cannot collect because no sale closed","Must wait until the next sale","Cannot pursue any remedy"],
   "correctAnswer":0,
   "explanation":"Under traditional rules, when a broker produces a ready, willing, and able buyer at the seller's listed price and terms — and the seller refuses to proceed without legal excuse — the broker has fulfilled their part of the listing agreement and is generally entitled to the commission. Modern listing agreements often modify this rule (e.g., by tying commission to actual closing), so the specific language of the listing controls."},

  # ── Practice of Real Estate (7) ─────────────────────────────────────────
  {"id":"re-nat-167","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Following the Bostock v. Clayton County decision and HUD's 2021 interpretation, the federal Fair Housing Act's prohibition on sex discrimination is generally understood to also prohibit discrimination based on:",
   "choices":["Wealth or income alone","Sexual orientation and gender identity","Education level","Citizenship status (separate categories)"],
   "correctAnswer":1,
   "explanation":"Following Bostock v. Clayton County (2020), where the Supreme Court held that Title VII's sex discrimination prohibition extends to discrimination based on sexual orientation and gender identity, HUD issued guidance in 2021 interpreting the Fair Housing Act's sex provisions the same way. So discrimination based on sexual orientation or gender identity is now generally treated as a form of prohibited sex discrimination under federal fair housing law. Source of income is NOT federally protected but is added in many state and local laws."},

  {"id":"re-nat-168","domain":"Practice of Real Estate","type":"single-choice",
   "question":"A landlord's policy facially neutral on its face (e.g., minimum credit score) has a disproportionate negative effect on members of a protected class. Even without intent to discriminate, the policy may be challenged under:",
   "choices":["Strict liability","The criminal laws","Disparate impact theory under fair housing law","Antitrust laws"],
   "correctAnswer":2,
   "explanation":"Disparate impact theory allows fair housing challenges to facially neutral policies that have a disproportionate negative effect on members of a protected class — even without proof of discriminatory intent. The 2015 Supreme Court case Texas Department of Housing v. Inclusive Communities Project affirmed disparate impact under the Fair Housing Act. Defendants can rebut by showing a legitimate, non-discriminatory business necessity and that no less-discriminatory alternative exists."},

  {"id":"re-nat-169","domain":"Practice of Real Estate","type":"single-choice",
   "question":"A wheelchair-using tenant in a rental unit requests permission to install a permanent ramp at their own expense to access the front entrance. Under fair housing law, this request is best classified as a request for:",
   "choices":["Reasonable accommodation — a change to rules or policies","Special privilege","Subletting","Reasonable modification — a physical change to the premises, generally at the tenant's expense, that the landlord must permit (subject to restoring the premises at lease end in many situations)"],
   "correctAnswer":3,
   "explanation":"Fair housing law distinguishes two duties: (1) Reasonable ACCOMMODATIONS are changes to rules, policies, or services (e.g., waiving a no-pets rule for an assistance animal); (2) Reasonable MODIFICATIONS are physical changes to the premises (ramps, grab bars, lowered cabinets). Under the federal Fair Housing Act, the tenant typically pays for the modification and may be required to restore the premises at lease end, though some federally-funded properties (Section 504) require the landlord to bear costs."},

  {"id":"re-nat-170","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Source of income (e.g., Section 8 housing choice vouchers) as a protected basis for fair housing purposes is generally:",
   "choices":["NOT a federal protected class, but is protected by many state and local laws","Federally protected under the Fair Housing Act","Required to be considered identically to wage income by every state","Prohibited from being considered in any housing decision"],
   "correctAnswer":0,
   "explanation":"Source of income is NOT a federally protected class under the Fair Housing Act. However, many states (e.g., California, New York, New Jersey, Massachusetts, Colorado, Connecticut) and many local jurisdictions have added source of income — typically including Section 8 voucher recipients — as protected classes. Where protected, landlords cannot refuse to rent because the tenant uses a housing voucher."},

  {"id":"re-nat-171","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Effective in 2024, the U.S. Treasury's Financial Crimes Enforcement Network (FinCEN) expanded anti-money-laundering reporting requirements in real estate. These rules generally require:",
   "choices":["Cash deals over $10,000 to be reported by the seller","Reporting on certain non-financed (all-cash) residential transactions involving legal entities, in covered jurisdictions and expanding nationally — to identify the beneficial owners of the purchasing entity","All real estate transactions to be reported to FinCEN regardless of payment method","Only foreign buyers to be reported"],
   "correctAnswer":1,
   "explanation":"FinCEN's Geographic Targeting Orders (GTOs), expanded into a nationwide rule finalized in 2024, require reporting of beneficial ownership information for certain non-financed (all-cash) residential transactions involving legal entities. The intent is to detect money laundering through real estate. Real estate professionals, title companies, and closing agents are increasingly required to gather and report this information."},

  {"id":"re-nat-172","domain":"Practice of Real Estate","type":"single-choice",
   "question":"HUD's advertising rules for real estate include all of the following EXCEPT:",
   "choices":["Selective use of human models in advertising can violate fair housing if it conveys discriminatory preferences","Code words and phrases (e.g., 'exclusive,' 'restricted,' 'no children') can violate the FHA","Discriminatory advertising violates the FHA only if intentional — accidentally discriminatory ads are exempt","Use of the 'Equal Housing Opportunity' logo is encouraged in advertising"],
   "correctAnswer":2,
   "explanation":"Discriminatory advertising violates the federal Fair Housing Act regardless of intent — the test is whether an ordinary reader would interpret the ad as suggesting a preference based on a protected class. Selective use of models, code words, and discriminatory phrasing are all problematic. The 'Equal Housing Opportunity' logo and HUD-approved fair-housing statement are encouraged in advertising and required in some contexts."},

  {"id":"re-nat-173","domain":"Practice of Real Estate","type":"single-choice",
   "question":"An agent directs prospective buyers from a particular protected class toward certain neighborhoods and away from others, even when the buyer has expressed no preference. This practice is:",
   "choices":["Affirmative marketing — required by HUD","Customary practice","Personalized service","Steering — illegal under the federal Fair Housing Act regardless of the agent's stated motivation"],
   "correctAnswer":3,
   "explanation":"Steering is illegal under the federal Fair Housing Act. It violates the FHA regardless of whether the agent claims to be helping the buyer 'feel comfortable' or otherwise rationalizes the conduct. The proper practice is to let the buyer decide which neighborhoods to consider based on their own criteria — and to show comparable properties across all neighborhoods that meet the buyer's stated criteria."},

  # ── Financing (5) ───────────────────────────────────────────────────────
  {"id":"re-nat-174","domain":"Financing","type":"single-choice",
   "question":"A 'prepayment penalty' in a mortgage is:",
   "choices":["A fee charged by the lender if the borrower pays off the loan before a specified date — common in some commercial loans, restricted in residential lending after the 2010 Dodd-Frank Act","A reward for paying off the loan early","Permitted on all loans with no restrictions","Mandatory under federal law"],
   "correctAnswer":0,
   "explanation":"A prepayment penalty is a fee charged when the borrower pays off the loan before a specified date — designed to compensate the lender for lost interest. Following the Dodd-Frank Act of 2010, prepayment penalties on residential mortgages are heavily restricted (especially for 'qualified mortgages'), capped in amount, and generally not allowed beyond 3 years from origination. Commercial loans typically have more flexibility."},

  {"id":"re-nat-175","domain":"Financing","type":"single-choice",
   "question":"A 'subprime' mortgage is best characterized by:",
   "choices":["Borrower credit and/or documentation below conventional 'prime' standards, typically carrying higher interest rates and fees to compensate for elevated default risk","Government insurance from the FHA","A balloon payment at the end of the loan term","Mandatory non-amortization"],
   "correctAnswer":1,
   "explanation":"Subprime loans are made to borrowers who don't meet conventional 'prime' credit or documentation standards. They typically carry higher interest rates and fees to compensate the lender for elevated default risk. Subprime lending was central to the 2008 financial crisis. Post-crisis regulation (especially the Dodd-Frank Act and CFPB rules) has tightened underwriting and disclosure requirements substantially."},

  {"id":"re-nat-176","domain":"Financing","type":"single-choice",
   "question":"A 'mortgage-backed security' (MBS) is:",
   "choices":["A type of life insurance","A specialized FHA loan","A securitized instrument representing fractional ownership of a pool of mortgages — created by Fannie Mae, Freddie Mac, Ginnie Mae, or private issuers — and sold to investors as a tradable security","A federal insurance policy"],
   "correctAnswer":2,
   "explanation":"Mortgage-backed securities pool many mortgages together; investors purchase securities backed by the cash flows from those mortgages. Agency MBSs are issued by Fannie Mae, Freddie Mac, and Ginnie Mae (the last with full faith and credit of the U.S.). Private-label MBSs are issued by investment banks. MBSs let lenders sell loans into the secondary market, freeing capital to make more loans — a major mechanism by which U.S. mortgage lending is funded."},

  {"id":"re-nat-177","domain":"Financing","type":"single-choice",
   "question":"Under TRID (TILA-RESPA Integrated Disclosure) rules, the Loan Estimate must be provided to the borrower:",
   "choices":["At closing","Within 30 days of application","Anytime before signing","Within 3 business days of the lender receiving the borrower's loan application"],
   "correctAnswer":3,
   "explanation":"TRID rules (the integrated TILA and RESPA disclosures, implemented in 2015 by the CFPB) require the lender to deliver the Loan Estimate within 3 business days of receiving a complete loan application. The Loan Estimate replaced the former Good Faith Estimate and Truth-in-Lending disclosures. A Closing Disclosure must be delivered at least 3 business days before consummation."},

  {"id":"re-nat-178","domain":"Financing","type":"single-choice",
   "question":"A second mortgage (sometimes called a 'subordinate' loan) on a property:",
   "choices":["Has a lien priority that is junior to the first mortgage — meaning the first mortgage is paid first from foreclosure proceeds, then the second mortgage from any remaining funds","Always has the same priority as the first mortgage","Is paid before the first mortgage in foreclosure","Cannot be foreclosed"],
   "correctAnswer":0,
   "explanation":"A second mortgage is subordinate to the first mortgage. In foreclosure, the first mortgagee is paid first from sale proceeds; only the remaining proceeds (if any) flow to the second mortgagee. Because of this elevated risk, second mortgages typically carry higher interest rates. Home equity lines of credit (HELOCs) and home equity loans are common forms of second-lien financing."},

  # ── Real Estate Calculations (5) ────────────────────────────────────────
  {"id":"re-nat-179","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A buyer is purchasing a property for $480,000 and taking out a $384,000 mortgage. What is the loan-to-value (LTV) ratio?",
   "choices":["75%","80%","90%","20%"],
   "correctAnswer":1,
   "explanation":"Step 1 — LTV formula: LTV = Loan Amount ÷ Property Value.\nStep 2 — Apply: $384,000 ÷ $480,000 = 0.80 = 80%.\nThe down payment percentage is 100% − LTV% = 100% − 80% = 20%, or $96,000.\nNote that PMI is typically required when LTV exceeds 80% — so this loan would NOT require PMI."},

  {"id":"re-nat-180","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A title insurance company quotes its rate as $3 per $1,000 of coverage for an owner's title policy. What is the premium for a $325,000 owner's policy?",
   "choices":["$325","$975","$3,250","$3.25"],
   "correctAnswer":1,
   "explanation":"Step 1 — express the coverage in thousands: $325,000 ÷ $1,000 = 325 (thousands).\nStep 2 — multiply by the rate: 325 × $3 = $975.\nAlternative method: $325,000 × ($3 ÷ $1,000) = $325,000 × 0.003 = $975.\nTitle insurance rates are commonly quoted per $1,000 of coverage."},

  {"id":"re-nat-181","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An income property has Effective Gross Income (EGI) of $120,000 and Operating Expenses of $45,000. What is the operating expense ratio?",
   "choices":["27%","38%","75%","37.5%"],
   "correctAnswer":3,
   "explanation":"Step 1 — Operating Expense Ratio = Operating Expenses ÷ Effective Gross Income.\nStep 2 — Apply: $45,000 ÷ $120,000 = 0.375 = 37.5%.\nThe NOI in this case would be EGI − OpEx = $120,000 − $45,000 = $75,000. The OER is a quick measure of a property's operational efficiency."},

  {"id":"re-nat-182","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A property sells for $420,000. The buyer makes a $63,000 down payment and finances the rest. What is the down payment as a PERCENTAGE of the sale price?",
   "choices":["15%","18%","20%","12%"],
   "correctAnswer":0,
   "explanation":"Step 1 — Down Payment % = Down Payment ÷ Sale Price.\nStep 2 — Apply: $63,000 ÷ $420,000 = 0.15 = 15%.\nThis would result in an 85% LTV loan, which typically requires PMI (since LTV exceeds 80%)."},

  {"id":"re-nat-183","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A commercial tenant signs a 5-year lease at $24,000/year with the first 6 months free (rent abatement). What is the tenant's TOTAL effective rent over the 5-year term?",
   "choices":["$120,000","$108,000","$132,000","$60,000"],
   "correctAnswer":1,
   "explanation":"Step 1 — total annual rent for 5 years if no abatement: $24,000 × 5 = $120,000.\nStep 2 — value of 6-month abatement: ($24,000 ÷ 12) × 6 = $2,000 × 6 = $12,000.\nStep 3 — effective rent: $120,000 − $12,000 = $108,000.\nLandlords often grant rent abatement as a concession to attract tenants in soft markets — the equivalent of giving back rent on the front end."},

  # ── Property Ownership (4) ──────────────────────────────────────────────
  {"id":"re-nat-184","domain":"Property Ownership","type":"single-choice",
   "question":"An easement that benefits a specific neighboring parcel of land — running with the dominant land regardless of who owns it — is best described as:",
   "choices":["Easement in gross — attached to a specific person, not to land","Mineral easement","Easement appurtenant — attached to and running with the dominant parcel of land","Profit à prendre"],
   "correctAnswer":2,
   "explanation":"An easement APPURTENANT benefits a specific parcel of land (the dominant tenement) and is binding on the servient parcel — both run with the land, regardless of who owns either. An easement IN GROSS benefits a specific person or entity (e.g., a utility company's right to run lines across many properties) and may not be transferable. The dominant/servient distinction is fundamental to easement appurtenant analysis."},

  {"id":"re-nat-185","domain":"Property Ownership","type":"single-choice",
   "question":"A neighbor's garage extends 2 feet onto the adjoining property. This is best described as:",
   "choices":["An easement","A license","A nuisance","An encroachment — an unauthorized intrusion of a structure onto another's land"],
   "correctAnswer":3,
   "explanation":"An encroachment is an unauthorized intrusion of a structure (fence, building, garage, eaves, etc.) onto another's land. Encroachments are typically discovered through surveys. Remedies include negotiated easements, removal of the encroaching structure, or in some cases adverse possession or prescriptive easement if the encroachment has continued for the statutory period."},

  {"id":"re-nat-186","domain":"Property Ownership","type":"single-choice",
   "question":"Real estate has three traditional PHYSICAL characteristics. They are:",
   "choices":["Immobility, indestructibility, and uniqueness (heterogeneity)","Scarcity, improvement, and area preference","Demand, utility, and transferability","Liens, easements, and restrictions"],
   "correctAnswer":0,
   "explanation":"The three physical characteristics of real estate are Immobility (land cannot be moved), Indestructibility (land in physical form is permanent), and Uniqueness (every parcel of land has a unique location — no two parcels are identical). These characteristics underpin many legal doctrines (e.g., specific performance because each parcel is legally unique)."},

  {"id":"re-nat-187","domain":"Property Ownership","type":"single-choice",
   "question":"The four traditional ECONOMIC characteristics of real estate are:",
   "choices":["Demand, utility, scarcity, transferability","Scarcity, improvements, permanence of investment, and area preference (situs/location)","Possession, interest, title, time","Land, labor, capital, entrepreneurship"],
   "correctAnswer":1,
   "explanation":"The four economic characteristics of real estate are: Scarcity (relatively limited supply), Improvements (modifications that increase utility/value), Permanence of investment (capital investment that endures), and Area preference / situs (location-driven value — 'location, location, location'). These differ from the four characteristics of VALUE — Demand, Utility, Scarcity, Transferability (DUST)."},

  # ── Transfer of Title (4) ───────────────────────────────────────────────
  {"id":"re-nat-188","domain":"Transfer of Title","type":"single-choice",
   "question":"The original conveyance of public land from the government (federal or state) to a private party is called:",
   "choices":["A general warranty deed","An adverse possession deed","A patent — a government's original grant of public land to a private grantee","A trust deed"],
   "correctAnswer":2,
   "explanation":"A patent (also called a land patent or letters patent) is the original conveyance from a sovereign (federal or state government) granting public land to a private party. It establishes the original root of title for many parcels in the western United States — particularly land granted under the Homestead Act, mining patents, or railroad land grants."},

  {"id":"re-nat-189","domain":"Transfer of Title","type":"single-choice",
   "question":"In an eminent domain proceeding, 'just compensation' to the property owner means:",
   "choices":["The price the government wishes to pay","The owner's purchase price for the property","Nominal compensation","The fair market value of the property at the time of taking — typically determined by appraisal and, if disputed, by a jury or court"],
   "correctAnswer":3,
   "explanation":"The Fifth Amendment's 'just compensation' requirement is generally interpreted as fair market value at the time of taking — what a willing buyer would pay a willing seller in an arm's-length transaction. The owner is entitled to challenge the government's valuation in court. In some cases (e.g., partial takings or business losses), additional damages may also be available."},

  {"id":"re-nat-190","domain":"Transfer of Title","type":"single-choice",
   "question":"A borrower in default voluntarily conveys the property to the lender to avoid a formal foreclosure. This is:",
   "choices":["A deed in lieu of foreclosure — a conveyance from borrower to lender to satisfy the debt and avoid the foreclosure process","A quitclaim deed","Adverse possession","Specific performance"],
   "correctAnswer":0,
   "explanation":"A deed in lieu of foreclosure (sometimes 'DIL') is a voluntary conveyance from a defaulting borrower to the lender, given in satisfaction of the debt. It avoids the cost, time, and public record of formal foreclosure. The lender typically requires that the title be free of junior liens (since accepting the deed extinguishes them via merger only as to the lender, but junior liens remain attached)."},

  {"id":"re-nat-191","domain":"Transfer of Title","type":"single-choice",
   "question":"After a foreclosure sale conducted under judicial supervision, the official who sold the property executes a deed conveying title to the highest bidder. This is called:",
   "choices":["A general warranty deed","A sheriff's deed (or referee's deed, marshall's deed, or commissioner's deed depending on jurisdiction)","A bargain and sale deed","A patent"],
   "correctAnswer":1,
   "explanation":"A sheriff's deed (or referee's deed, depending on the state) is the instrument used to convey title following a judicial foreclosure sale. It typically conveys whatever title the foreclosed borrower had at the time of the foreclosing lien, free of junior liens that were properly noticed in the foreclosure. The deed carries no warranties — buyers at foreclosure auction take property 'as is' with limited recourse."},

  # ── Valuation and Market Analysis (3) ───────────────────────────────────
  {"id":"re-nat-192","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"A buyer is willing to pay $400,000 for a property today because they anticipate it will be worth $600,000 in five years after planned highway improvements. This valuation reflects the appraisal principle of:",
   "choices":["Substitution","Conformity","Anticipation — value is partly a function of expected future benefits","Highest and best use"],
   "correctAnswer":2,
   "explanation":"The principle of Anticipation holds that value is influenced by expected future benefits — present value reflects the buyer's expectation of future cash flows and appreciation. The income approach to value is directly based on Anticipation — present value of future income. The buyer's willingness to pay $400,000 today reflects their anticipation of $600,000 in future value."},

  {"id":"re-nat-193","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"In the cost approach, the cost to construct an EXACT DUPLICATE of the subject building (using the same materials, design, etc.) is called:",
   "choices":["Reproduction cost","Replacement cost","Market value","Reproduction cost — exact duplicate using same materials and methods (modernized counterpart of 'replacement cost')"],
   "correctAnswer":3,
   "explanation":"Reproduction cost is the cost to construct an EXACT DUPLICATE of the subject building, using the same materials, design, layout, and quality. Replacement cost is the cost to construct a building of EQUIVALENT UTILITY but using current materials and methods. Reproduction cost is more relevant for historic buildings; replacement cost is more practical for typical residential and commercial appraisals."},

  {"id":"re-nat-194","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"A property's value is reduced because a sewage treatment plant has been built nearby. This loss in value is best classified as:",
   "choices":["External (or economic) obsolescence — loss in value caused by factors OUTSIDE the property","Physical deterioration","Functional obsolescence — outdated or poor design","Reproductive obsolescence"],
   "correctAnswer":0,
   "explanation":"Three forms of depreciation in the cost approach are: (1) Physical deterioration — wear and tear; (2) Functional obsolescence — outdated design, poor layout, missing features (e.g., one-car garage in a two-car neighborhood); (3) External (or economic) obsolescence — loss caused by factors OUTSIDE the property (nearby nuisance, neighborhood decline, market shifts). External obsolescence is typically the hardest to cure because it's beyond the owner's control."},

  # ── Property Disclosures (3) ────────────────────────────────────────────
  {"id":"re-nat-195","domain":"Property Disclosures","type":"single-choice",
   "question":"Asbestos in a property is generally:",
   "choices":["Required to be removed by the seller before any sale","A known carcinogen that is heavily regulated; sellers must disclose known asbestos in many states, and renovation/demolition may trigger federal NESHAP rules requiring licensed abatement","Permitted in all forms with no regulation","A type of mold"],
   "correctAnswer":1,
   "explanation":"Asbestos is a regulated carcinogen. Sellers must disclose known asbestos under many state disclosure statutes. Renovation, demolition, and significant disturbance of asbestos-containing materials trigger the federal Clean Air Act's NESHAP (National Emission Standards for Hazardous Air Pollutants) rules — including notification, licensed abatement, and proper disposal requirements. OSHA also regulates worker exposure."},

  {"id":"re-nat-196","domain":"Property Disclosures","type":"single-choice",
   "question":"Underground storage tanks (USTs) on a property:",
   "choices":["Are not a regulatory concern","Should be disclosed when known and present, because leaking USTs are a major source of soil and groundwater contamination subject to EPA regulation (40 CFR Part 280) and state cleanup liability","Are exempt from environmental regulation","Only matter if commercial"],
   "correctAnswer":1,
   "explanation":"Underground storage tanks — particularly those storing petroleum or hazardous substances — are a major source of soil and groundwater contamination. They are heavily regulated under EPA rules (40 CFR Part 280) and state laws. Sellers must disclose known USTs in many states, and contamination from leaking USTs can trigger CERCLA-style cleanup liability for current owners regardless of who caused the contamination."},

  {"id":"re-nat-197","domain":"Property Disclosures","type":"single-choice",
   "question":"PCBs (polychlorinated biphenyls) found in older electrical equipment, fluorescent light ballasts, and some building materials are:",
   "choices":["Modern fluorescent bulbs only","A type of paint","An asbestos substitute that is now standard","Federally regulated under the Toxic Substances Control Act (TSCA) — known hazardous substances that may require specialized handling and disposal when encountered in older buildings"],
   "correctAnswer":3,
   "explanation":"PCBs are toxic synthetic organic chemicals banned for new manufacture in 1979 and regulated under the Toxic Substances Control Act (TSCA). They were widely used in transformers, capacitors, fluorescent light ballasts, some caulking compounds, and other older building materials. Discovery during renovation or demolition triggers special handling and disposal requirements, and PCBs are a recognized environmental contaminant that may need disclosure."},

  # ── Land Use Controls and Regulations (2) ───────────────────────────────
  {"id":"re-nat-198","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"A homeowner in a planned community wants to paint their house bright purple, but the community's recorded Covenants, Conditions & Restrictions (CC&Rs) limit exterior colors to neutral tones. The CC&Rs:",
   "choices":["Generally run with the land and bind the current owner (and successors), enforceable by the HOA and/or other property owners in the community","Apply only to the original developer's deed","Are unenforceable because they restrict property use","Apply only for the first 5 years after recording"],
   "correctAnswer":0,
   "explanation":"CC&Rs (also called restrictive covenants or deed restrictions) are private contractual restrictions that, when properly recorded and meeting certain legal requirements, run with the land and bind successors in title. They are typically enforceable by the HOA, the original developer, or other property owners in the community (depending on the document). Some restrictions (e.g., racial covenants) are unenforceable as unconstitutional or as violating public policy or fair housing law."},

  {"id":"re-nat-199","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"A developer wants to divide a large parcel of land into multiple lots for sale. State and local subdivision regulations typically require:",
   "choices":["Submission of a plat or subdivision map for approval, with infrastructure (streets, utilities, drainage) and lot dimensions meeting code; followed by recording","No regulation — anyone can subdivide land","Federal Department of Agriculture approval","Approval only from neighboring landowners"],
   "correctAnswer":1,
   "explanation":"Subdividing land typically requires submission of a plat (subdivision map) to local government for approval. The plat must comply with subdivision regulations covering lot dimensions, road widths, utilities, stormwater management, easements, open space requirements, and other infrastructure. Once approved, the plat is recorded in the county records and becomes the legal description for the new lots."},

  # ── Leasing and Property Management (1) ─────────────────────────────────
  {"id":"re-nat-200","domain":"Leasing and Property Management","type":"single-choice",
   "question":"A landlord fails to provide heat for two weeks in winter. The premises become uninhabitable, and the tenant moves out and stops paying rent. The tenant's legal theory is:",
   "choices":["Tenancy at sufferance","Holdover tenancy","Constructive eviction — the landlord's failure to provide essential services rendered the premises uninhabitable, justifying the tenant's vacating and rent abatement","Adverse possession"],
   "correctAnswer":2,
   "explanation":"Constructive eviction occurs when a landlord's actions (or inactions) substantially interfere with the tenant's quiet enjoyment of the premises — rendering them uninhabitable or unfit for the leased purpose. The tenant must typically vacate within a reasonable time and may stop paying rent. Common triggers: failure to provide essential services (heat, water, security), failure to repair major systems, persistent leaks, infestation, etc."},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
