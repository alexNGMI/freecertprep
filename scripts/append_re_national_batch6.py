"""Real Estate National batch 6 — questions 251-300."""
import json, pathlib

Q = pathlib.Path("src/data/real-estate-national-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── Contracts (9) ───────────────────────────────────────────────────────
  {"id":"re-nat-251","domain":"Contracts","type":"single-choice",
   "question":"A purchase contract states: 'Closing is contingent on the buyer obtaining a 30-year fixed-rate mortgage at 7% or less within 45 days.' This is best described as:",
   "choices":["A liquidated damages provision","A severability clause","A condition precedent — a contingency that must be satisfied BEFORE the parties' performance obligations become enforceable","A condition subsequent"],
   "correctAnswer":2,
   "explanation":"A condition PRECEDENT is an event that must occur (or be waived) BEFORE the parties' performance obligations become enforceable. Financing, inspection, and appraisal contingencies are classic conditions precedent in real estate. A condition SUBSEQUENT is an event that, if it occurs, terminates a previously-existing obligation. If the financing contingency fails, the buyer's obligation to close never matures."},

  {"id":"re-nat-252","domain":"Contracts","type":"single-choice",
   "question":"After closing, a buyer discovers a contract provision in the purchase agreement that was NOT carried over into the deed (e.g., a representation about square footage). Under the DOCTRINE OF MERGER:",
   "choices":["The contract provision automatically becomes part of the deed","The buyer can sue under the contract for the next 30 days","The buyer can sue under the contract for the next 7 days","Contract provisions generally merge into the deed at delivery — meaning they are no longer separately enforceable AFTER closing (with exceptions for collateral promises, fraud, and provisions explicitly intended to survive)"],
   "correctAnswer":3,
   "explanation":"The doctrine of merger holds that the purchase contract MERGES INTO the deed upon delivery at closing — the deed becomes the controlling document, and contract provisions that relate to title (warranties, encumbrances, condition of title) are generally not separately enforceable after closing. Exceptions exist for: (1) collateral promises not relating to title (e.g., post-closing repairs), (2) fraud, and (3) explicit 'survives closing' provisions."},

  {"id":"re-nat-253","domain":"Contracts","type":"single-choice",
   "question":"A contract contains a provision that is later found by a court to be illegal or unenforceable. The remainder of the contract is unaffected if the contract contains:",
   "choices":["A severability clause — explicitly providing that if any provision is invalidated, the remaining provisions stay in full force and effect","An attorney fee clause","A force majeure clause","A liquidated damages clause"],
   "correctAnswer":0,
   "explanation":"A severability clause (also called 'blue pencil' or 'savings' clause) provides that if any provision is found unenforceable, the remaining provisions continue in full force. Without such a clause, courts must determine whether the unenforceable provision is so material that it makes the entire contract void — sometimes leading to surprising outcomes. Severability clauses are standard in modern real estate contracts."},

  {"id":"re-nat-254","domain":"Contracts","type":"single-choice",
   "question":"Two weeks before closing, the seller announces that they will not convey the property under any circumstances. This statement — made BEFORE the date of performance is due — is:",
   "choices":["Premature and has no legal effect","Anticipatory breach — the non-breaching party may immediately treat the contract as breached and pursue remedies, or wait until the date of performance","An ordinary acceptance","Frustration of purpose"],
   "correctAnswer":1,
   "explanation":"Anticipatory breach (or anticipatory repudiation) occurs when a party announces — before the date of performance — that they will not perform their contractual obligations. The non-breaching party may either: (1) treat the contract as immediately breached and pursue remedies (damages, specific performance, rescission), or (2) wait until the actual date of performance to see if the repudiating party changes their mind. Most modern courts allow the non-breaching party to act on the repudiation immediately."},

  {"id":"re-nat-255","domain":"Contracts","type":"single-choice",
   "question":"A buyer signs a contract to purchase a property specifically because of its zoning that allows a restaurant. Before closing, the zoning is changed by the city, making restaurant use illegal. The doctrine that may excuse the buyer from performing is:",
   "choices":["Impracticability","Estoppel","Frustration of purpose — when a supervening event substantially defeats the principal purpose for which the contract was made, even though performance is still possible","Mutual mistake"],
   "correctAnswer":2,
   "explanation":"Frustration of purpose applies when a supervening event substantially destroys the very purpose for which the contract was made — even though literal performance is still possible. Here the buyer could still take title to the property, but the principal purpose (restaurant use) has been frustrated by the zoning change. Courts require that the frustrated purpose was known to both parties, was the principal purpose, and was substantially defeated."},

  {"id":"re-nat-256","domain":"Contracts","type":"single-choice",
   "question":"A property is destroyed by an earthquake between contract signing and closing. The doctrine of IMPOSSIBILITY:",
   "choices":["Means the buyer must still close on the destroyed property","Means the buyer must rebuild before closing","Has been entirely abolished","May excuse performance when an unforeseen supervening event makes performance physically OR objectively impossible; under the Uniform Vendor and Purchaser Risk Act (in states that have adopted it), risk of loss before closing typically remains with the seller — the buyer may rescind"],
   "correctAnswer":3,
   "explanation":"Impossibility of performance may excuse contractual obligations when an unforeseen supervening event makes performance physically or objectively impossible — destruction of unique subject matter being a classic case. Under common law and the Uniform Vendor and Purchaser Risk Act (adopted in many states), risk of loss before closing typically remains with the seller, allowing the buyer to rescind. Some states still follow the older 'equitable conversion' rule (risk on buyer)."},

  {"id":"re-nat-257","domain":"Contracts","type":"single-choice",
   "question":"A contractor builds a home substantially according to specifications but with several minor deviations. The doctrine of SUBSTANTIAL PERFORMANCE:",
   "choices":["Allows the contractor to recover the contract price minus the cost to cure the deviations — provided the work has substantially complied with the contract's purpose and the deviations are not material","Voids the contract entirely","Requires the owner to accept any work however poorly done","Allows the contractor to recover only labor costs"],
   "correctAnswer":0,
   "explanation":"Substantial performance allows recovery of the contract price minus damages (cost to cure or diminution in value caused by the deviations) when: (1) the breaching party has substantially complied with the contract, (2) the deviations are minor and unintentional, and (3) the purpose of the contract has been substantially achieved. The doctrine prevents an aggrieved party from claiming total breach when the deviations are minor."},

  {"id":"re-nat-258","domain":"Contracts","type":"single-choice",
   "question":"A purchase contract that requires the SELLER to make repairs and the BUYER to pay closing costs is best described as a contract with:",
   "choices":["No real consideration","Reciprocal (mutual) obligations — each party has duties they must perform","An option","A pre-emption"],
   "correctAnswer":1,
   "explanation":"Reciprocal (or mutual) contracts impose duties on BOTH parties — each side agrees to do something. Most real estate purchase contracts are reciprocal: the seller agrees to convey, repair, disclose, etc.; the buyer agrees to pay, close, and so on. Each side's promise is consideration for the other side's promise. Compare to a unilateral contract (one promise, accepted by performance) such as an option contract."},

  {"id":"re-nat-259","domain":"Contracts","type":"single-choice",
   "question":"A seller fails to clean the property as required by the contract, leaving a few items behind. The buyer wants to rescind the entire contract over this. This breach is most likely:",
   "choices":["A material breach justifying rescission","An anticipatory breach","Fraud","A non-material (or minor) breach — allowing the buyer remedies for damages caused, but typically NOT rescission of the entire contract"],
   "correctAnswer":3,
   "explanation":"A non-material (or minor) breach gives the non-breaching party remedies for damages caused but does not justify rescission of the entire contract. A material breach is more severe — it goes to the essence of the agreement and substantially deprives the non-breaching party of the contract's benefit. Failure to clean is typically minor; failure to convey title at closing would be material. Courts assess factors like extent of deprivation, harm to the non-breaching party, and likelihood of cure."},

  # ── General Principles of Agency (7) ────────────────────────────────────
  {"id":"re-nat-260","domain":"General Principles of Agency","type":"single-choice",
   "question":"An agent's parent is the seller of a property the agent is also marketing. With respect to disclosure:",
   "choices":["The agent should disclose the personal/family relationship to all prospective buyers — most state real estate laws and commission rules require disclosure of personal interests in the property","Family transactions are exempt from disclosure rules","The agent must withdraw from the transaction","No special disclosure is required"],
   "correctAnswer":0,
   "explanation":"Most state real estate laws and commission rules require disclosure of any personal financial or family interest in the property being marketed. The licensee should disclose the relationship to all prospective buyers in writing, often using a state-specific 'consent to represent' or 'personal interest' disclosure form. Failing to disclose can result in license discipline, civil liability, and potential contract rescission."},

  {"id":"re-nat-261","domain":"General Principles of Agency","type":"single-choice",
   "question":"In most states, the AGENCY DISCLOSURE form (or 'consumer protection notice') must be presented to a prospective buyer or seller:",
   "choices":["Only after a contract is signed","BEFORE the licensee discusses confidential matters or substantive matters of the transaction — i.e., at first substantive contact","Anytime within 90 days of closing","Never"],
   "correctAnswer":1,
   "explanation":"Most state agency disclosure rules require that the licensee deliver an agency-relationship notice BEFORE the first substantive discussion of a specific property or before any confidential information is exchanged. The exact timing varies — 'first substantive contact' is the most common standard. The disclosure typically explains the available representation options (seller agent, buyer agent, dual agent, transactional broker) and is signed by the consumer."},

  {"id":"re-nat-262","domain":"General Principles of Agency","type":"single-choice",
   "question":"A broker takes money from a client trust account to pay personal expenses, with the intent to return it later. This is:",
   "choices":["Permitted as a short-term loan","Acceptable if the broker is reimbursed within 30 days","Conversion — the unauthorized appropriation of client funds for the broker's own use, generally a more serious offense than commingling and grounds for license revocation and potential criminal prosecution","Acceptable if disclosed"],
   "correctAnswer":2,
   "explanation":"Conversion is the unauthorized appropriation of client funds for the broker's own use — even with intent to return them later. It is a more serious offense than commingling (mixing client and operating funds in the same account without spending them). Conversion is grounds for license revocation, civil liability for damages, criminal prosecution (typically theft or embezzlement), and removal from the real estate recovery fund. The 'I planned to put it back' defense does NOT work."},

  {"id":"re-nat-263","domain":"General Principles of Agency","type":"single-choice",
   "question":"State real estate commissions (or boards) generally have the authority to:",
   "choices":["Charge no fees","Operate only as advisory bodies","Set property tax rates","Issue, suspend, and revoke real estate licenses; investigate complaints; impose fines and other sanctions; promulgate licensing regulations within the scope of state law"],
   "correctAnswer":3,
   "explanation":"State real estate commissions (sometimes called boards or divisions) are administrative agencies with broad authority over the real estate profession: licensing, examination, continuing education, regulation of licensed activities, investigation of complaints, formal hearings and disciplinary actions (including suspension, revocation, fines, education requirements), and oversight of trust accounts and recovery funds. They operate within the scope established by state real estate licensing statutes."},

  {"id":"re-nat-264","domain":"General Principles of Agency","type":"single-choice",
   "question":"Most states require licensed real estate professionals to complete CONTINUING EDUCATION (CE):",
   "choices":["A specified number of hours per renewal cycle (often 12-30 hours over 2-4 years), typically including specific topics (fair housing, ethics, legal updates) and varying for salesperson vs. broker tiers","Only when initially licensed","Only voluntary, never required","Up to 120 hours per year for every licensee"],
   "correctAnswer":0,
   "explanation":"Continuing education requirements vary by state but typically include: a specified number of CE hours per renewal cycle (often 12-30 hours over 2-4 years), mandatory topics (commonly fair housing, ethics, legal updates, escrow management), different requirements for salesperson vs. broker tiers, and a mix of classroom and approved-distance education formats. Failure to complete CE results in license expiration or non-renewal."},

  {"id":"re-nat-265","domain":"General Principles of Agency","type":"single-choice",
   "question":"In a typical residential transaction, the agency disclosure form must be SIGNED BY THE CONSUMER:",
   "choices":["At closing","BEFORE the consumer makes binding decisions (signing a listing or buyer-representation agreement, or making an offer) — to confirm informed consent to the representation type","After the inspection contingency expires","Within 30 days of moving in"],
   "correctAnswer":1,
   "explanation":"Agency disclosure forms should be presented and signed BEFORE the consumer makes binding decisions — typically before signing a representation agreement (listing or buyer-rep) or making an offer. The signature confirms the consumer was informed about and consented to the representation type. Some state forms require separate disclosure and signatures for each role the licensee may play in the transaction."},

  {"id":"re-nat-266","domain":"General Principles of Agency","type":"single-choice",
   "question":"A 'hold harmless' or 'indemnification' clause in a real estate contract typically:",
   "choices":["Forbids any liability for either party","Eliminates fiduciary duties","Allocates risk by having one party agree to defend or reimburse the other for certain types of claims by third parties or for breaches; carefully drafted and enforceable when not unconscionable","Acts as a substitute for insurance"],
   "correctAnswer":2,
   "explanation":"Hold harmless / indemnification clauses allocate risk by having one party agree to defend, reimburse, or hold harmless the other party for specified types of claims — typically claims arising from the indemnitor's own actions, breaches, or status. They're common in commercial real estate, listing agreements, property management contracts, and joint ventures. Enforceability depends on clear language, reasonable scope, and consistency with public policy."},

  # ── Practice of Real Estate (7) ─────────────────────────────────────────
  {"id":"re-nat-267","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The federal ESIGN Act (Electronic Signatures in Global and National Commerce Act) and most state UETAs (Uniform Electronic Transactions Act):",
   "choices":["Apply only to business-to-business transactions","Apply only to commercial real estate","Generally make ELECTRONIC SIGNATURES legally equivalent to handwritten signatures for most contract purposes — including real estate contracts in most jurisdictions","Forbid electronic signatures on real estate documents"],
   "correctAnswer":2,
   "explanation":"The federal ESIGN Act (2000) and the Uniform Electronic Transactions Act (adopted in most states) provide that electronic signatures and electronic records are legally equivalent to handwritten signatures and paper records for most contract purposes — including real estate contracts. Some specific documents are excluded (wills, court orders, certain notices). Recording offices may have different rules for the recording of deeds, but the underlying instruments can typically be e-signed."},

  {"id":"re-nat-268","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The Uniform Electronic Transactions Act (UETA) was adopted by most states. Its main effects in real estate include all of the following EXCEPT:",
   "choices":["Authorizing electronic records to satisfy writing requirements","Authorizing electronic signatures to satisfy signature requirements","Establishing rules for electronic notarization (eNotarization) in many states","Requiring all real estate transactions to be conducted electronically"],
   "correctAnswer":3,
   "explanation":"UETA enables — but does not require — electronic records and signatures. Parties may still choose paper. UETA establishes parity between paper and electronic methods, provides rules for the legal effect of electronic signatures, and creates a framework for electronic notarization (eNotarization), which has been expanded in many states. The act does not COMPEL electronic transactions, just permits them."},

  {"id":"re-nat-269","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The Gramm-Leach-Bliley Act (GLBA) regulates the privacy practices of:",
   "choices":["Financial institutions (including mortgage lenders, brokers, and many real estate companies that provide financial services) — requiring privacy notices and opt-out rights for consumers when nonpublic personal information is shared with non-affiliates","Schools only","Federal agencies only","Health care providers only"],
   "correctAnswer":0,
   "explanation":"The Gramm-Leach-Bliley Act (1999) regulates financial institutions' privacy practices. Covered entities include banks, mortgage lenders, mortgage brokers, securities firms, insurance companies, and many real estate-related businesses that provide 'financial products or services' (e.g., real estate appraisers, settlement agents, certain real estate brokerages). Requirements include: privacy notices, opt-out rights for information sharing with non-affiliates, and safeguards for nonpublic personal information."},

  {"id":"re-nat-270","domain":"Practice of Real Estate","type":"single-choice",
   "question":"State-level privacy laws like the California Consumer Privacy Act (CCPA) and similar laws in other states:",
   "choices":["Apply only to social media companies","Generally grant consumers expanded rights regarding personal information held by businesses (access, deletion, opt-out of sale) — and many real estate businesses must comply if they meet revenue or data thresholds","Apply only to federal agencies","Apply only to GDPR-protected EU residents"],
   "correctAnswer":1,
   "explanation":"State privacy laws like CCPA (California), CDPA (Virginia), CPA (Colorado), and similar laws expand consumer rights regarding personal information: access, deletion, opt-out of sale or sharing, correction, and limits on processing of sensitive data. Many real estate businesses fall within scope if they meet revenue or data-volume thresholds and collect or process personal information of state residents. Compliance involves privacy notices, opt-out mechanisms, data subject access procedures, and security obligations."},

  {"id":"re-nat-271","domain":"Practice of Real Estate","type":"single-choice",
   "question":"In some states, an 'anti-deficiency statute' provides that:",
   "choices":["A lender must accept any payment offered","After a foreclosure sale of certain types of mortgages (often purchase-money loans on owner-occupied residences), the lender may NOT pursue the borrower for any deficiency between the loan balance and the foreclosure sale price","Lenders may forgive any debt","Foreclosure is never permitted"],
   "correctAnswer":1,
   "explanation":"Anti-deficiency statutes (in states like California, Arizona, North Carolina, and several others) limit a lender's ability to pursue the borrower for a deficiency — the difference between the loan balance and the foreclosure sale price — after foreclosure of certain types of mortgages. Typically protected: purchase-money loans on owner-occupied residences. Not protected: refinance loans, second mortgages, commercial loans. The exact scope varies significantly by state."},

  {"id":"re-nat-272","domain":"Practice of Real Estate","type":"single-choice",
   "question":"A 'lis pendens' notice filed in the county records:",
   "choices":["Is a federal tax filing","Notifies the world that real estate litigation is pending that may affect title to a specified property — typically warning prospective buyers and lenders to investigate the dispute before closing","Confirms a pre-foreclosure status","Eliminates the lawsuit"],
   "correctAnswer":1,
   "explanation":"A 'lis pendens' (Latin for 'lawsuit pending') is a notice filed in the county records — typically required when a plaintiff sues in connection with title to or possession of real property. It puts the world on constructive notice that title may be affected by the outcome of the litigation. Anyone who buys, refinances, or otherwise deals with the property after the lis pendens is filed is bound by the eventual judgment. Lis pendens is removed when the underlying action concludes."},

  {"id":"re-nat-273","domain":"Practice of Real Estate","type":"single-choice",
   "question":"A 'quiet title action' is:",
   "choices":["A lawsuit to RESOLVE conflicting or uncertain claims to a property's title — establishing the rightful owner and clearing clouds on title for the prevailing party","A type of foreclosure","A challenge to a deed restriction","A federal tax matter"],
   "correctAnswer":0,
   "explanation":"A quiet title action is a lawsuit to resolve conflicting or uncertain claims to a property's title. The plaintiff asks the court to declare them the rightful owner and to extinguish or 'quiet' any adverse claims. Common scenarios: clearing clouds from old liens, resolving boundary disputes, perfecting title obtained through adverse possession, clearing fraudulent or void deeds. The court's judgment binds the parties served and (in many jurisdictions) the world."},

  # ── Financing (5) ───────────────────────────────────────────────────────
  {"id":"re-nat-274","domain":"Financing","type":"single-choice",
   "question":"An existing second mortgage holder agrees to remain in JUNIOR priority when the homeowner refinances the first mortgage — even though the new first would normally lose priority by being later in time. This is accomplished via:",
   "choices":["Acceleration","A subordination agreement — explicit written agreement of the existing junior lienholder to remain subordinate to the new senior lien","Defeasance","A novation"],
   "correctAnswer":1,
   "explanation":"A subordination agreement is an explicit written agreement by an existing lienholder to remain JUNIOR to a new lien — even though that new lien would normally rank below the existing one based on recording priority. Subordination agreements are commonly used when refinancing a first mortgage while a second mortgage is in place: the second-mortgage holder agrees to stay subordinate to the new first. Without subordination, the second mortgage would move up to senior priority when the original first is paid off."},

  {"id":"re-nat-275","domain":"Financing","type":"single-choice",
   "question":"A 'cash-out refinance' is a refinance in which:",
   "choices":["The lender pays the borrower no money","Only closing costs are financed","The new loan amount EXCEEDS the existing mortgage balance — the difference is paid to the borrower in cash (often used to pay off other debt or fund renovations)","All existing equity is removed"],
   "correctAnswer":2,
   "explanation":"A cash-out refinance is a refinance in which the new loan amount exceeds the existing mortgage balance — and the difference (the 'cash out') is paid to the borrower. This converts home equity into cash, often used to consolidate higher-rate debt, fund renovations, or for other purposes. Cash-out refinances typically have stricter underwriting and may carry higher interest rates than rate-and-term refinances. The combined LTV after the refinance is the limiting factor."},

  {"id":"re-nat-276","domain":"Financing","type":"single-choice",
   "question":"A 'rate-and-term refinance' (sometimes called a 'no cash-out refinance') is a refinance in which:",
   "choices":["The borrower receives a substantial cash payment","The borrower buys a new property","The borrower combines multiple debts","The new loan is used to PAY OFF the existing mortgage with no significant cash to the borrower (and limited closing costs financed) — usually to obtain a better rate or different loan term"],
   "correctAnswer":3,
   "explanation":"A rate-and-term refinance replaces an existing mortgage with a new loan that has different rate, term, or both — but pays off only the existing balance plus closing costs (no significant cash to the borrower). Common motivations: lower the interest rate, switch from ARM to fixed, shorten the loan term (e.g., 30-year to 15-year), or remove PMI. Rate-and-term refinances are typically easier to qualify for and have lower rates than cash-out refinances."},

  {"id":"re-nat-277","domain":"Financing","type":"single-choice",
   "question":"In a typical residential mortgage transaction, the LIEN PRIORITY between recorded loans is generally determined by:",
   "choices":["The 'first in time, first in right' rule — the loan recorded EARLIER in the public record generally has senior priority; later-recorded loans are junior unless a subordination agreement says otherwise","The largest loan amount","Random selection","Federal law mandating equal priority"],
   "correctAnswer":0,
   "explanation":"Lien priority in most U.S. jurisdictions follows the 'first in time, first in right' rule — the lien recorded EARLIER in the public record generally has senior priority. Later-recorded liens are junior. This priority determines who gets paid first from foreclosure proceeds. Exceptions include: subordination agreements (junior lienholder agrees to stay subordinate), some statutory super-priorities (mechanics' liens in some states, government tax liens, HOA liens for assessments, etc.), and certain federal liens."},

  {"id":"re-nat-278","domain":"Financing","type":"single-choice",
   "question":"For mortgage qualification and pricing purposes, occupancy is typically classified as:",
   "choices":["Owner-occupied (primary residence) — best terms; Second home — slightly worse terms; Investor/non-owner-occupied — worst terms (higher rates, higher down payment, stricter underwriting) due to elevated default risk","All loans receive identical terms regardless of occupancy","Owner-occupied receives the worst terms","Only investor loans receive favorable rates"],
   "correctAnswer":1,
   "explanation":"Lenders price mortgages based on occupancy because default risk varies. Owner-occupied (primary residence) loans receive the BEST terms — lower rates, higher allowed LTVs, lower required reserves — because borrowers are most motivated to protect their primary home. Second homes are slightly worse. Investor (non-owner-occupied) loans receive the WORST terms — higher rates (often 0.5-0.75% higher), higher down payment requirements (often 20-25% minimum), and tougher underwriting. Misrepresenting occupancy to obtain better terms is mortgage fraud."},

  # ── Real Estate Calculations (5) ────────────────────────────────────────
  {"id":"re-nat-279","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A triangular lot has a base of 80 feet and a height (perpendicular to the base) of 50 feet. What is the area?",
   "choices":["4,000 sq ft","8,000 sq ft","2,000 sq ft","6,500 sq ft"],
   "correctAnswer":2,
   "explanation":"Step 1 — triangle area formula: Area = ½ × base × height.\nStep 2 — Apply: ½ × 80 × 50 = 0.5 × 4,000 = 2,000 sq ft.\nDistractor 4,000 sq ft results from forgetting to multiply by ½ — a very common error. Triangle area is always HALF of base × height, regardless of triangle shape (as long as the height is measured perpendicular to the chosen base)."},

  {"id":"re-nat-280","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A property requires excavation of a basement measuring 30 ft long × 20 ft wide × 8 ft deep. How many cubic yards of soil must be removed? (1 cubic yard = 27 cubic feet)",
   "choices":["4,800 cubic yards","480 cubic yards","177.78 cubic yards","177.78 cubic yards (approximately 178 cubic yards)"],
   "correctAnswer":3,
   "explanation":"Step 1 — volume in cubic feet: 30 × 20 × 8 = 4,800 cu ft.\nStep 2 — convert to cubic yards: 4,800 ÷ 27 = 177.78 cu yds.\nStep 3 — round up for ordering: 178 cu yds.\nMemorize 27 cubic feet = 1 cubic yard. Cubic yards are the standard unit for ordering soil, gravel, concrete, and other bulk materials."},

  {"id":"re-nat-281","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An investor estimates the After-Repair Value (ARV) of a fix-and-flip property at $400,000. The investor's standard 'maximum allowable offer' is 70% of ARV minus repair costs. If repairs will cost $50,000, what is the maximum offer the investor should make?",
   "choices":["$230,000","$280,000","$200,000","$350,000"],
   "correctAnswer":0,
   "explanation":"Step 1 — 70% of ARV: $400,000 × 0.70 = $280,000.\nStep 2 — subtract repair costs: $280,000 − $50,000 = $230,000.\nThe '70% rule' is a common rule-of-thumb for fix-and-flip investors: pay at most 70% of expected after-repair value, minus the estimated repair budget. The 30% margin covers the investor's profit, transaction costs (buying and selling), holding costs, and risk buffer."},

  {"id":"re-nat-282","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A 30-year mortgage was originated 5 years ago at $300,000 principal. After 5 years of payments, the remaining balance is $278,000. How much PRINCIPAL has been paid down so far?",
   "choices":["$5,000","$22,000","$67,000","$278,000"],
   "correctAnswer":1,
   "explanation":"Step 1 — Principal paid down = Original Principal − Current Balance.\nStep 2 — Apply: $300,000 − $278,000 = $22,000.\nNote how SLOW principal paydown is in early years of a long-term mortgage. After 5 years (1/6 of the loan term), only about 7% of the original principal has been paid down. This is normal amortization: early payments are mostly interest; the principal portion grows over time."},

  {"id":"re-nat-283","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A vacant lot is valued at $80,000. The cost to build the home was $250,000, less $40,000 in depreciation. Using the COST APPROACH, what is the total property value?",
   "choices":["$330,000","$290,000","$290,000","$210,000"],
   "correctAnswer":2,
   "explanation":"Step 1 — Cost approach formula: Land Value + (Replacement Cost − Depreciation) = Property Value.\nStep 2 — Apply: $80,000 + ($250,000 − $40,000) = $80,000 + $210,000 = $290,000.\nThe cost approach starts with land value (estimated by sales comparison or other methods), adds the replacement cost of improvements, and SUBTRACTS depreciation from all sources (physical, functional, external). It's most useful for new construction and special-purpose properties."},

  # ── Property Ownership (4) ──────────────────────────────────────────────
  {"id":"re-nat-284","domain":"Property Ownership","type":"single-choice",
   "question":"A grantor conveys property 'to A and her heirs, but if alcohol is ever sold on the premises, then to B.' A's estate is best described as:",
   "choices":["Fee simple absolute","Life estate","Leasehold","Defeasible fee — specifically, a fee simple subject to executory limitation (estate may be lost if a stated condition occurs)"],
   "correctAnswer":3,
   "explanation":"A defeasible fee estate (also called fee simple defeasible) is a fee simple that may be lost if a stated condition occurs or fails to occur. Sub-types: (1) Fee simple determinable — automatically reverts to grantor on triggering event (often uses words 'so long as,' 'while,' 'during,' 'until'); (2) Fee simple subject to condition subsequent — grantor has right to re-enter on triggering event (uses 'but if,' 'provided that,' 'on condition that'); (3) Fee simple subject to executory limitation — vests in third party (B here) on triggering event."},

  {"id":"re-nat-285","domain":"Property Ownership","type":"single-choice",
   "question":"A joint tenant unilaterally sells their interest to a third party. What happens to the joint tenancy?",
   "choices":["The new owner takes as TENANT IN COMMON with the remaining joint tenant(s); the joint tenancy is severed as to that share, eliminating the right of survivorship for the conveyed share","The transfer is void","All joint tenants become tenants in common","Nothing changes"],
   "correctAnswer":0,
   "explanation":"A joint tenant has the unilateral power to sell or transfer their interest. The transfer SEVERS the joint tenancy as to the conveyed share — the new owner takes as a tenant in common with the remaining joint tenants. The remaining joint tenants (if 2+) continue as joint tenants between themselves with right of survivorship; the third-party transferee is a tenant in common without survivorship rights. This 'partial severance' rule is a fundamental feature of joint tenancy."},

  {"id":"re-nat-286","domain":"Property Ownership","type":"single-choice",
   "question":"Tenancy by the entirety differs from joint tenancy in that:",
   "choices":["Tenancy by the entirety provides no survivorship rights","Tenancy by the entirety is available to ANY co-owners, while joint tenancy requires marriage","Tenancy by the entirety is available ONLY to married couples (and in some states registered domestic partners), and many states make it impossible for one spouse to sever or unilaterally convey their interest","Tenancy by the entirety is the same as community property"],
   "correctAnswer":1,
   "explanation":"Tenancy by the entirety is available only to married couples (and in some states registered domestic partners) and adds significant protections beyond joint tenancy: (1) neither spouse can unilaterally sever or convey their interest, (2) creditors of one spouse alone often cannot reach the property (depends on state law), and (3) the survivorship right cannot be defeated unilaterally. Not all states recognize tenancy by the entirety. Some are community-property states with analogous (but distinct) rules."},

  {"id":"re-nat-287","domain":"Property Ownership","type":"single-choice",
   "question":"A grantor conveys 'to A for life, then to B's heirs.' Because B's heirs cannot be determined until B dies, this future interest in B's heirs is best described as:",
   "choices":["A vested remainder","A reversion","A contingent remainder — the remainder is conditioned on the existence of identifiable persons (or events) at the time the prior estate ends","A fee simple absolute"],
   "correctAnswer":2,
   "explanation":"A remainder is VESTED when the remainderman is identifiable and there is no condition precedent to taking possession beyond the natural termination of the prior estate. A remainder is CONTINGENT when the remainderman is unascertained (e.g., 'to B's heirs,' which can only be determined at B's death) or subject to a condition precedent. Here B's heirs are unascertained until B dies, making the remainder contingent. Once B dies, the heirs are determined and the remainder vests."},

  # ── Transfer of Title (4) ───────────────────────────────────────────────
  {"id":"re-nat-288","domain":"Transfer of Title","type":"single-choice",
   "question":"In a traditional deed, the section that defines the TYPE and DURATION of the estate granted (e.g., 'to have and to hold, in fee simple, forever') is called the:",
   "choices":["Granting clause","Recital clause","Reservation clause","Habendum clause"],
   "correctAnswer":3,
   "explanation":"The habendum clause (literally 'to have and to hold' from Latin habendum) defines the estate granted — its type (fee simple, life estate, etc.) and duration. It typically begins with the words 'to have and to hold.' Other key deed clauses include: (1) premises/granting clause (describes the property and identifies parties), (2) granting clause (uses words of conveyance), (3) habendum clause (defines estate), (4) reservations/exceptions, (5) covenants/warranties (in warranty deeds), and (6) execution (signatures, acknowledgment)."},

  {"id":"re-nat-289","domain":"Transfer of Title","type":"single-choice",
   "question":"The section of a deed containing the operative WORDS OF CONVEYANCE (e.g., 'does hereby grant, bargain, sell, and convey') is called the:",
   "choices":["Granting clause","Habendum clause","Reservation clause","Acknowledgment"],
   "correctAnswer":0,
   "explanation":"The granting clause contains the operative words of conveyance — phrases like 'grants,' 'bargains and sells,' 'remises, releases, and quitclaims,' or 'conveys and warrants.' The specific verb used can affect the type of deed (e.g., 'quitclaims' indicates a quitclaim deed; 'conveys and warrants' indicates a warranty deed). Without an operative granting clause, the document is not a valid deed."},

  {"id":"re-nat-290","domain":"Transfer of Title","type":"single-choice",
   "question":"A grantor conveys property to a buyer but retains a life estate in a 1-acre portion containing the family cemetery. This carve-out is properly accomplished via a:",
   "choices":["Quitclaim","Reservation — the grantor retains a new interest (e.g., an easement, life estate, mineral rights) that did not previously exist as a separate interest","Granting clause","Acknowledgment"],
   "correctAnswer":1,
   "explanation":"A reservation creates a NEW interest in favor of the grantor — an easement, life estate, mineral rights, or other right that did not exist as a separate interest before the conveyance. An EXCEPTION (different concept) excludes from the conveyance an existing interest already owned by someone else (e.g., 'except for the easement of record'). Both reservations and exceptions appear in deeds, but they have different legal effects."},

  {"id":"re-nat-291","domain":"Transfer of Title","type":"single-choice",
   "question":"In adverse possession analysis, 'color of title' refers to:",
   "choices":["A specific shade of paint on a document","A document that PURPORTS to convey title (e.g., a defective or improperly recorded deed) — even though it is legally insufficient. Possession 'under color of title' often shortens the statutory period for adverse possession and may extend possession to the entire described property even if only part is actually occupied","A government title certification","A type of patent"],
   "correctAnswer":1,
   "explanation":"Color of title refers to a document that purports to convey title but is legally defective — a deed with a defective acknowledgment, a tax deed of dubious validity, a deed from someone without authority. Possession 'under color of title' can: (1) shorten the statutory period for adverse possession (e.g., from 20 years to 7), (2) extend the area of constructive possession to the entire property described (rather than just the part actually occupied), and (3) help establish good faith if relevant. The doctrine varies by state."},

  # ── Valuation and Market Analysis (3) ───────────────────────────────────
  {"id":"re-nat-292","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"In the cost approach, depreciation is classified as CURABLE or INCURABLE. The test for 'curable' is:",
   "choices":["Whether the defect is physical","Whether the property is residential","Whether the building is more than 30 years old","Whether the cost of fixing the defect is LESS than or equal to the value added by the fix — if so, a typical buyer would 'cure' it, making the depreciation 'curable'"],
   "correctAnswer":3,
   "explanation":"In appraisal, depreciation is 'curable' if the cost to cure (repair) the defect is less than or equal to the value the cure adds. A typical buyer/owner would do the work because it pays for itself. 'Incurable' depreciation costs more to fix than it adds in value — a rational owner would not invest. Examples of typically curable: deferred maintenance, outdated fixtures. Typically incurable: significant functional layout problems, external obsolescence."},

  {"id":"re-nat-293","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"A 30-year-old building has been exceptionally well-maintained and updated and APPEARS to be 15 years old in current condition. The 15-year figure represents:",
   "choices":["Effective age — the building's apparent age based on its current physical condition and modernization, used by appraisers instead of chronological age in computing depreciation","Chronological age","Economic life","Useful life"],
   "correctAnswer":0,
   "explanation":"Effective age is the age the building APPEARS based on its current condition and modernization — which may be less than chronological age (for well-maintained or updated buildings) or more (for poorly-maintained or outdated buildings). Appraisers typically use effective age — not chronological age — when computing depreciation in the cost approach. A 30-year-old well-maintained building might have an effective age of 15, with depreciation calculated accordingly."},

  {"id":"re-nat-294","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"Methods for estimating LAND value (apart from buildings) include all of the following EXCEPT:",
   "choices":["Sales comparison of similar vacant lots","Land residual technique (extracting land value from income property)","Building cost approach for buildings only — not for vacant land","Allocation method (using a typical ratio of land to total value in similar developed properties)"],
   "correctAnswer":2,
   "explanation":"Common methods for valuing LAND specifically include: (1) Sales comparison of similar vacant lots — preferred when comparables exist; (2) Allocation — applying a typical land-to-total-value ratio from comparable developed properties; (3) Extraction — subtracting the depreciated cost of improvements from total value of a comparable improved property; (4) Land residual technique — isolating income attributable to land in an income-producing property; (5) Subdivision development — for large parcels. The cost approach values buildings, not land."},

  # ── Property Disclosures (3) ────────────────────────────────────────────
  {"id":"re-nat-295","domain":"Property Disclosures","type":"single-choice",
   "question":"In most planned communities and condominium developments, the seller is required to provide the buyer with an HOA (homeowners association) 'resale package' before closing. This typically includes:",
   "choices":["The seller's personal financial information","The seller's mortgage statement","HOA financials, reserve study, CC&Rs, rules and regulations, recent meeting minutes, and a statement of any current or planned special assessments — giving the buyer information about the financial and operational health of the association","Only the HOA contact information"],
   "correctAnswer":2,
   "explanation":"HOA resale packages (sometimes called resale certificates or HOA disclosure packages) typically include: HOA financials and budget, reserve study (capital improvement plan), CC&Rs, bylaws and rules, board meeting minutes, statement of current dues, status of any special assessments, and the HOA's status with respect to liens and litigation. Buyer review of this package is critical — financial mismanagement, deferred maintenance, or pending special assessments can substantially affect ownership costs. State laws specify timing and content requirements."},

  {"id":"re-nat-296","domain":"Property Disclosures","type":"single-choice",
   "question":"A new subdivision is being marketed by a developer. Many states require the developer to provide buyers with a:",
   "choices":["Personal credit reference","Color sample of any paint used","Vendor invoice","Public report (or property report or subdivision public offering statement) — a state-approved disclosure document containing detailed information about the subdivision, the developer, the development plan, available financing, lot characteristics, common areas, and other material information"],
   "correctAnswer":3,
   "explanation":"Many states (and the federal Interstate Land Sales Full Disclosure Act for certain subdivisions of 25+ lots crossing state lines) require developers to provide buyers a state-approved 'public report' or similar disclosure document before sale. The report includes detailed information about the subdivision, developer history, master plan, common areas, available financing, lot characteristics, HOA structure, and any material facts. Some states give buyers a rescission period after receiving the report."},

  {"id":"re-nat-297","domain":"Property Disclosures","type":"single-choice",
   "question":"A property is located in a region with known elevated NATURAL radon concentrations. EPA Action Level for radon is 4 pCi/L. The seller has no actual knowledge of radon levels in the home. With respect to disclosure:",
   "choices":["Most state laws require disclosure of KNOWN material facts; the seller generally cannot be held liable for not disclosing what they don't know about radon, but ethical practice (and many state forms) advises informing buyers of the regional risk and encouraging testing","All sellers must affirmatively certify their home is radon-free regardless of knowledge","Sellers must remediate radon before selling regardless of levels","Sellers are exempt from any radon-related disclosure"],
   "correctAnswer":0,
   "explanation":"Most state disclosure laws focus on KNOWN material facts — what the seller actually knows about the property. Without knowledge of specific radon levels, the seller has no general duty to test or disclose specific levels. However, in regions with known elevated risk, state-specific disclosure forms often direct sellers and buyers to consider radon, and best practice is to inform buyers of the regional risk and encourage independent testing. Some federal disclosure standards may apply for properties in known high-radon zones."},

  # ── Land Use Controls and Regulations (2) ───────────────────────────────
  {"id":"re-nat-298","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"A property is described as: 'Beginning at the northeast corner of Lot 7; thence S 45° W for 250 feet; thence N 45° W for 200 feet; thence N 45° E for 250 feet; thence S 45° E for 200 feet to the point of beginning.' This is an example of:",
   "choices":["Lot and block system","Metes and bounds — a description using compass bearings, distances, monuments, and a return to the point of beginning","Government rectangular survey system","Plat description"],
   "correctAnswer":1,
   "explanation":"Metes and bounds is the oldest land description system. 'Metes' refers to distances (e.g., 250 feet) and 'bounds' refers to directions or compass bearings (e.g., S 45° W). A valid metes and bounds description: (1) starts at an identifiable point of beginning (POB), (2) traces the perimeter using direction and distance for each segment, and (3) returns to the POB — closing the figure. Metes and bounds is most common in older eastern states; western states tend to use the rectangular survey system."},

  {"id":"re-nat-299","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"In the GOVERNMENT (RECTANGULAR) SURVEY SYSTEM used to describe much of the western US, the basic unit is a:",
   "choices":["Mile","Acre","Township — a 6-mile by 6-mile square, divided into 36 sections of 1 square mile (640 acres) each","Block"],
   "correctAnswer":2,
   "explanation":"The Public Land Survey System (PLSS) was established by the Land Ordinance of 1785 to survey and describe public lands. The system is based on principal meridians (north-south lines) and base lines (east-west lines). The basic unit is the TOWNSHIP — a 6-mile by 6-mile square (36 sq miles, or 23,040 acres). Each township is divided into 36 SECTIONS of 1 sq mile (640 acres) each, numbered in a zigzag pattern. Sections can be further subdivided into half-sections (320 acres), quarter-sections (160 acres), and smaller fractional descriptions."},

  # ── Leasing and Property Management (1) ─────────────────────────────────
  {"id":"re-nat-300","domain":"Leasing and Property Management","type":"single-choice",
   "question":"A retail tenant's lease requires monthly base rent of $5,000 PLUS 5% of monthly gross sales above $80,000. This is called:",
   "choices":["A gross lease","A triple net lease","A ground lease","A percentage lease — common in retail, with base rent plus a percentage of the tenant's sales above a stated 'breakpoint'"],
   "correctAnswer":3,
   "explanation":"A percentage lease is common in retail — the tenant pays a base rent (often relatively low) plus a percentage of sales above a stated breakpoint. The structure aligns the landlord's incentives with the tenant's success — the landlord benefits as the tenant's business grows. The breakpoint is typically calculated to equal the base rent divided by the percentage (the 'natural breakpoint'), so the percentage rent kicks in when sales would otherwise have generated rent equal to the base."},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
