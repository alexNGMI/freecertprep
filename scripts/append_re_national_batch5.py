"""Real Estate National batch 5 — questions 201-250."""
import json, pathlib

Q = pathlib.Path("src/data/real-estate-national-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── Contracts (9) ───────────────────────────────────────────────────────
  {"id":"re-nat-201","domain":"Contracts","type":"single-choice",
   "question":"A 16-year-old (a minor) signs a purchase contract for a $300,000 home. Generally, the contract is:",
   "choices":["Fully enforceable against the minor","Voidable at the option of the minor — the minor may either ratify the contract upon reaching majority or disaffirm it (with the right to recover consideration paid)","Void from the beginning regardless of the minor's desire","Enforceable only if the minor's parents sign as co-signers"],
   "correctAnswer":1,
   "explanation":"Contracts entered into by minors are generally VOIDABLE (not void) at the minor's option. The minor may either ratify the contract upon reaching the age of majority or disaffirm it during minority (or within a reasonable time after reaching majority). If the minor disaffirms, they typically must return what they received, but they may recover what they paid. Contracts for 'necessaries' (food, clothing, shelter) are a partial exception."},

  {"id":"re-nat-202","domain":"Contracts","type":"single-choice",
   "question":"A contract is BOTH 'void' AND 'voidable' — what is the difference?",
   "choices":["The terms are synonymous","Void means valid; voidable means invalid","Void contracts never had legal effect (e.g., for illegal purpose); voidable contracts are valid until rescinded by the affected party (e.g., for fraud, duress, undue influence, or capacity issues)","Voidable means enforceable against both parties; void means enforceable against only one"],
   "correctAnswer":2,
   "explanation":"A VOID contract never had legal effect — typically because of an illegal purpose or impossibility from the outset. The parties cannot enforce it, and it cannot be 'cured.' A VOIDABLE contract is valid until the affected party elects to rescind. Voidable contracts arise from fraud, duress, undue influence, mutual mistake, misrepresentation, or one party's lack of capacity (e.g., minor, mentally incapacitated)."},

  {"id":"re-nat-203","domain":"Contracts","type":"single-choice",
   "question":"A seller signs a deed at gunpoint, transferring the property to an aggressor. The contract is:",
   "choices":["Valid and enforceable","Voidable only","Void from the beginning under most state laws","Voidable by the duressing party"],
   "correctAnswer":2,
   "explanation":"Contracts induced by physical duress (e.g., threats of bodily harm, gunpoint) are generally VOID — there was no genuine assent. Contracts induced by lesser forms of duress (economic duress, threats of legal action) are typically VOIDABLE by the party under duress. The distinction matters because void contracts have no effect whatsoever — even subsequent good-faith purchasers may have no rights — while voidable contracts have full effect until rescinded."},

  {"id":"re-nat-204","domain":"Contracts","type":"single-choice",
   "question":"An elderly person with diminished capacity signs a real estate contract that grossly favors their adult child caregiver. The transaction can be challenged on grounds of:",
   "choices":["Undue influence — taking advantage of a confidential relationship to obtain an unfair benefit","Equal protection","Statute of frauds","Adverse possession"],
   "correctAnswer":0,
   "explanation":"Undue influence is the improper use of a confidential or dominant relationship to overcome another's free will and obtain an unfair benefit. It typically involves: (1) a confidential relationship (caregiver, family member, fiduciary), (2) susceptibility of the influenced party (age, infirmity, dependence), and (3) an outcome favoring the influencer. The result is typically that the affected contract becomes voidable."},

  {"id":"re-nat-205","domain":"Contracts","type":"single-choice",
   "question":"A seller makes a material misrepresentation to induce a buyer to enter a contract. Under traditional contract law, the contract becomes:",
   "choices":["Void from the beginning","Voidable at the option of the deceived party — who may rescind, sue for damages, or both","Subject to mandatory arbitration","Permanently enforceable"],
   "correctAnswer":1,
   "explanation":"Material misrepresentation makes a contract voidable at the option of the deceived party. The misled party may rescind the contract (returning to pre-contract position), sue for damages (typically expectation damages or out-of-pocket damages), or both depending on the jurisdiction. Fraudulent misrepresentation typically allows broader damages including punitives. Innocent misrepresentation usually only allows rescission."},

  {"id":"re-nat-206","domain":"Contracts","type":"single-choice",
   "question":"A buyer offers $200,000. The seller counters with $215,000. The buyer responds with $210,000. The seller's $215,000 counteroffer is now:",
   "choices":["Still open and accepted by the buyer","Rolled into the buyer's $210,000 response","Terminated — the buyer's $210,000 was itself a counter-counteroffer that rejects the seller's $215,000 counter; the seller may now accept, reject, or counter the $210,000","Automatically averaged with the buyer's $210,000"],
   "correctAnswer":2,
   "explanation":"Each counteroffer terminates the prior offer. The $200,000 offer died when the seller countered at $215,000. The $215,000 offer died when the buyer countered at $210,000. Now only the $210,000 counteroffer is alive, awaiting the seller's response. The seller cannot 'change their mind' and accept the buyer's earlier $200,000 or revive their own $215,000 counter."},

  {"id":"re-nat-207","domain":"Contracts","type":"single-choice",
   "question":"In real estate contracts, an acceptance is typically EFFECTIVE when:",
   "choices":["The offeree drafts the acceptance, regardless of communication","The acceptance is mailed, under the 'mailbox rule'","Negotiations begin","Communicated to (received by) the offeror — real estate typically uses the receipt rule, not the mailbox rule"],
   "correctAnswer":3,
   "explanation":"Real estate contracts generally use the RECEIPT RULE — acceptance is effective when the offeror receives it, not when the offeree sends it. This differs from the common-law 'mailbox rule' that applies to many other contract types (where acceptance is effective on dispatch). The receipt rule for real estate is justified by the high stakes and need for certainty about contract formation."},

  {"id":"re-nat-208","domain":"Contracts","type":"single-choice",
   "question":"A contract includes terms that the parties did not specifically negotiate but that the law nonetheless reads into the agreement (e.g., implied duty of good faith, implied warranty of habitability in new construction). These are:",
   "choices":["Implied terms","Express terms","Conditions precedent","Statute of limitations terms"],
   "correctAnswer":0,
   "explanation":"Implied terms are provisions read into a contract by law — even though the parties did not specifically negotiate them. Common implied terms include: the duty of good faith and fair dealing, the implied warranty of habitability (in new construction or residential leases), and reasonable time for performance when no time is specified. Express terms are those specifically stated by the parties."},

  {"id":"re-nat-209","domain":"Contracts","type":"single-choice",
   "question":"A residential purchase contract contains a 'kick-out' clause that allows the seller to continue marketing the property despite an existing contingent contract. If the seller receives a better offer, what happens?",
   "choices":["The seller may instantly terminate the existing contract","The seller notifies the existing buyer who typically has a stated number of hours (e.g., 48-72) to either remove their contingency and proceed, or release the contract — giving the seller the right to accept the better offer","The original buyer loses all rights immediately","The new offer is automatically rejected"],
   "correctAnswer":1,
   "explanation":"A 'kick-out' clause (also called a 'first right of refusal' clause in this context) allows the seller to continue marketing while a contingent buyer's contract is pending. If a better backup offer arrives, the seller notifies the first buyer who must either remove their contingency (typically a home-sale or financing contingency) within a stated period (often 48-72 hours) or release the seller from the contract. This protects the seller from being locked into a buyer who may never close."},

  # ── General Principles of Agency (7) ────────────────────────────────────
  {"id":"re-nat-210","domain":"General Principles of Agency","type":"single-choice",
   "question":"In most states, a listing agreement WITHOUT a definite expiration date is:",
   "choices":["Fully enforceable as an indefinite listing","Required by federal law","Generally unenforceable as a listing — many state statutes prohibit indefinite listings, requiring a definite expiration date","Renewable forever"],
   "correctAnswer":2,
   "explanation":"Most states prohibit listing agreements without definite expiration dates. The rationale is to protect sellers from indefinite or 'perpetual' broker entanglement. A listing without a stated termination date is generally unenforceable in those states. The broker must include a specific end date — typical residential listing terms range from 3-6 months."},

  {"id":"re-nat-211","domain":"General Principles of Agency","type":"single-choice",
   "question":"A real estate licensee has a personal financial interest in a buyer's mortgage company (owns 25% of the company). When recommending the lender to clients, the licensee must:",
   "choices":["Not disclose the interest — it is irrelevant","Conceal the interest","Use only that lender for all clients","DISCLOSE the personal financial interest to clients in writing under both fiduciary duty and most state real-estate-commission rules, AND comply with RESPA's Affiliated Business Disclosure requirements"],
   "correctAnswer":3,
   "explanation":"A personal financial interest in a referred settlement service provider creates a conflict of interest that must be disclosed to clients. This obligation arises from: (1) fiduciary duty of disclosure, (2) most state real estate commission rules, and (3) RESPA's Affiliated Business Arrangement (AfBA) Disclosure rules — which require written disclosure of the relationship, the estimated charges, and the option to use alternative providers."},

  {"id":"re-nat-212","domain":"General Principles of Agency","type":"single-choice",
   "question":"When clients face complex legal, tax, or financial questions about a transaction, a real estate licensee should typically:",
   "choices":["Recommend that the client consult their own independent attorney, accountant, or other professional — staying within the scope of real estate practice","Provide tax advice as a courtesy","Draft custom legal documents","Predict the IRS's position for the client"],
   "correctAnswer":0,
   "explanation":"Real estate licensees should not practice law, tax, or financial advisory work — both because of statutory unauthorized-practice-of-law restrictions and because of the licensee's lack of expertise outside real estate. The proper practice is to recommend that clients consult their own independent advisors for legal, tax, or complex financial questions, and to stay within the scope of real estate professional practice."},

  {"id":"re-nat-213","domain":"General Principles of Agency","type":"single-choice",
   "question":"Two licensees from the same brokerage are interested in representing two different buyers, both of whom want to make offers on the same listing held by the brokerage. What approach typically applies?",
   "choices":["The brokerage may not represent any of them","Designated agency — with proper disclosure and informed consent, the brokerage may designate one licensee to represent each buyer and a third (or none) to represent the seller — preserving fiduciary duties without creating dual agency at the licensee level","All licensees must withdraw","The buyers must hire outside counsel"],
   "correctAnswer":1,
   "explanation":"Designated agency (also called appointed or assigned agency) is the modern framework for handling this scenario. With written informed consent from all parties, the brokerage designates specific licensees to represent each party — preserving individual fiduciary duties without creating dual agency at the licensee level. The brokerage itself may be deemed a dual agent at the firm level (limited duties), but each individual licensee maintains undivided loyalty to their designated client."},

  {"id":"re-nat-214","domain":"General Principles of Agency","type":"single-choice",
   "question":"Many states require real estate brokers to maintain a surety bond or errors and omissions (E&O) insurance to:",
   "choices":["Pay for advertising expenses","Cover the broker's personal expenses","Protect the public from financial losses caused by the broker's misconduct, fraud, or negligence — providing a source of recovery if the broker is unable to satisfy a judgment","Pay state real estate commission salaries"],
   "correctAnswer":2,
   "explanation":"Surety bonds and E&O insurance protect consumers from financial losses caused by a broker's misconduct, fraud, or negligence in the course of licensed activity. The bond or insurance provides a financial backstop if a judgment cannot be collected from the broker directly. Bonding requirements vary by state — some maintain real estate recovery funds, others require individual bonds, others require E&O insurance. Many require both."},

  {"id":"re-nat-215","domain":"General Principles of Agency","type":"single-choice",
   "question":"A licensee wants to use drone photography to market a listing. Federal Aviation Administration (FAA) regulations generally require:",
   "choices":["No regulation — drones for marketing are exempt","The drone must be larger than 55 pounds","Anyone using a drone for commercial purposes (including real estate marketing) to be licensed under FAA Part 107 (Remote Pilot Certificate) and to follow flight rules including not flying over people, altitude limits, and avoidance of restricted airspace","Drones may be flown anywhere with no restrictions"],
   "correctAnswer":2,
   "explanation":"FAA Part 107 governs commercial drone (small UAS) operations — including for real estate marketing. Operators must obtain a Remote Pilot Certificate (Part 107 license), register their drones, follow flight rules (under 400 ft AGL, daylight or specific waiver, visual line-of-sight, no flying over people without waiver), and avoid restricted airspace (controlled airspace, near airports, military areas, sporting events, etc.). State and local rules may add restrictions."},

  {"id":"re-nat-216","domain":"General Principles of Agency","type":"single-choice",
   "question":"During the inspection contingency period, a buyer asks the agent to recommend a 'good' home inspector. The agent should:",
   "choices":["Provide multiple qualified inspectors and let the buyer choose, avoid kickback arrangements that would violate RESPA, and recommend the buyer carefully review any inspection report findings with appropriate professionals","Recommend only the inspector who has the lowest fee","Refuse to provide any guidance","Inspect the property personally"],
   "correctAnswer":0,
   "explanation":"Best practice is to provide multiple qualified options (typically 2-3 names), let the client choose, avoid kickback arrangements (RESPA Section 8 violation), and recommend follow-up consultations with appropriate professionals if the inspection reveals significant concerns. Personally inspecting the property exceeds the licensee's expertise and creates liability exposure."},

  # ── Practice of Real Estate (7) ─────────────────────────────────────────
  {"id":"re-nat-217","domain":"Practice of Real Estate","type":"single-choice",
   "question":"When a Fair Housing Act complaint is filed with HUD and conciliation fails, the case may proceed to:",
   "choices":["A criminal trial only","An administrative hearing before a HUD Administrative Law Judge OR a civil action in federal court (at the complainant's election); plus possible state-court remedies","Direct settlement with the alleged violator","Mandatory arbitration outside the courts"],
   "correctAnswer":1,
   "explanation":"After HUD investigates and conciliation fails, the complainant elects whether to proceed before a HUD Administrative Law Judge (ALJ) or in federal court via the Department of Justice. Both forums can impose civil penalties, injunctive relief, and damages. Plus, the complainant may always file a separate private civil suit in federal or state court within 2 years of the violation."},

  {"id":"re-nat-218","domain":"Practice of Real Estate","type":"single-choice",
   "question":"'Fair housing testers' (sometimes called 'mystery shoppers') used by HUD and fair-housing organizations:",
   "choices":["Are illegal under the Fourth Amendment","Are persons posing as ordinary prospective renters or buyers to detect discriminatory treatment — they have standing to sue under the Fair Housing Act even though they had no genuine intent to rent or purchase","Must disclose they are testers in advance","Are limited to law enforcement employees"],
   "correctAnswer":1,
   "explanation":"Fair housing testers are individuals (sometimes paid, often volunteer) who pose as ordinary prospective renters or buyers to detect discriminatory treatment. The Supreme Court has held they have STANDING to sue under the Fair Housing Act (Havens Realty Corp. v. Coleman, 1982) even though they had no genuine intent to rent or buy — the FHA's prohibition on discriminatory treatment is itself the actionable harm."},

  {"id":"re-nat-219","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The U.S. Department of Justice (DOJ) has authority to bring fair housing cases for:",
   "choices":["Only individual complaints","Only criminal cases","Only commercial property","'Pattern or practice' of housing discrimination — broader, systemic violations that affect many people — in addition to individual cases referred by HUD; can seek injunctive relief, damages, and civil penalties"],
   "correctAnswer":3,
   "explanation":"The DOJ can bring fair housing lawsuits in two main contexts: (1) individual cases referred by HUD where there is reasonable cause to believe a violation occurred; (2) 'pattern or practice' cases — systemic violations affecting many individuals, often discovered through investigation, testing, or referrals. DOJ pattern or practice cases can seek substantial damages, injunctive relief, and civil penalties."},

  {"id":"re-nat-220","domain":"Practice of Real Estate","type":"single-choice",
   "question":"HOEPA (Home Ownership and Equity Protection Act) regulates 'high-cost' mortgages by:",
   "choices":["Imposing additional disclosure requirements, restrictions on certain loan terms (balloon payments, prepayment penalties, mandatory arbitration), and 'ability to repay' standards on loans exceeding specified APR or fee thresholds","Prohibiting all high-cost mortgages","Setting maximum mortgage amounts at 30% of income","Insuring all high-cost mortgages"],
   "correctAnswer":0,
   "explanation":"HOEPA (enacted 1994, expanded by Dodd-Frank in 2010) imposes extra protections on 'high-cost' mortgages — loans whose APR exceeds the average prime offer rate by specified margins or whose points and fees exceed specified thresholds. Protections include: enhanced disclosures, restrictions on balloon payments, restrictions on prepayment penalties, ability-to-repay underwriting requirements, mandatory counseling for borrowers, and limits on financing of points and fees."},

  {"id":"re-nat-221","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Local fair housing laws may PROVIDE protections BEYOND federal law for:",
   "choices":["Federal preemption forbids any state additions","Source of income, sexual orientation, gender identity, military or veteran status, age, marital status, ancestry, and other categories — varying by jurisdiction","Only the seven federal protected classes","Only the categories that the federal law expressly mentions"],
   "correctAnswer":1,
   "explanation":"State and local fair-housing laws often expand protections beyond the federal Fair Housing Act. Common additional protected classes include: source of income, sexual orientation, gender identity, military or veteran status, age, marital status, ancestry, lawful occupation, immigration status, source of public assistance, criminal history (with some employment safeguards), and more. Licensees must comply with all applicable laws — local + state + federal."},

  {"id":"re-nat-222","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Some jurisdictions have enacted 'fair chance' housing laws limiting the consideration of:",
   "choices":["Income","Credit score","Criminal history in rental and sales decisions — restricting blanket bans and requiring individualized assessments","Education"],
   "correctAnswer":2,
   "explanation":"'Fair chance' (or 'ban the box') housing laws — adopted by many cities (e.g., Seattle, Oakland, New York City) and states — restrict landlord consideration of criminal history. Typical provisions: prohibit asking about criminal history early in the application process, prohibit blanket bans, require individualized assessments based on the nature/age of the offense, and limit how far back records can be considered. Federal HUD guidance also limits blanket criminal-history bans as potentially having disparate impact."},

  {"id":"re-nat-223","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Violations of the federal Title X lead-based paint disclosure requirements (for pre-1978 housing) can result in:",
   "choices":["Only a written warning","A small administrative fee","No penalty at all","Substantial civil penalties (up to ~$20,000 per violation, adjusted for inflation), treble damages in private suits, and potential criminal penalties for knowing violations"],
   "correctAnswer":3,
   "explanation":"Title X (the Residential Lead-Based Paint Hazard Reduction Act of 1992) imposes serious penalties. Civil penalties can run up to approximately $20,000 per violation (adjusted annually for inflation). Private parties can recover TREBLE damages plus costs and attorneys' fees. Knowing or willful violations can be criminal. Federal enforcement is shared between EPA and HUD. The disclosure includes a lead-based paint warning, an EPA pamphlet, and (unless waived) a 10-day buyer inspection period."},

  # ── Financing (5) ───────────────────────────────────────────────────────
  {"id":"re-nat-224","domain":"Financing","type":"single-choice",
   "question":"A 'reverse mortgage' (also called a Home Equity Conversion Mortgage, or HECM, when FHA-insured) allows:",
   "choices":["Eligible senior homeowners (typically age 62+) to convert home equity into cash without selling — receiving payments while remaining in the home; the loan is repaid from sale proceeds or estate when the homeowner moves out, sells, or dies","First-time buyers to obtain 100% financing","Sellers to refund part of the price","Lenders to repossess any property at will"],
   "correctAnswer":0,
   "explanation":"A reverse mortgage allows senior homeowners (typically age 62+ for HECMs, varying for proprietary products) to convert home equity into cash — receiving a lump sum, line of credit, or monthly payments while continuing to live in the home. The loan accrues interest over time and is repaid from sale proceeds or the borrower's estate when they move out, sell, or die. HECMs are FHA-insured. Reverse mortgages require counseling and have strict consumer-protection rules to prevent elder abuse."},

  {"id":"re-nat-225","domain":"Financing","type":"single-choice",
   "question":"A 'construction loan' for a custom home is typically:",
   "choices":["A 30-year amortizing mortgage from day one","A short-term loan disbursed in stages ('draws') as construction progresses, typically interest-only payments during the build period, then converted to a permanent mortgage at completion","A government grant","Free if the borrower is a veteran"],
   "correctAnswer":1,
   "explanation":"Construction loans are short-term financing (typically 6-18 months) disbursed in stages ('draws') keyed to construction milestones — foundation, framing, roof, etc. Interest accrues on disbursed amounts only. Borrowers typically make interest-only payments during the construction phase. At completion, the loan typically converts to a permanent mortgage (a 'construction-to-perm' loan) or is replaced by separate take-out financing."},

  {"id":"re-nat-226","domain":"Financing","type":"single-choice",
   "question":"A 'bridge loan' in real estate is:",
   "choices":["A government-insured first mortgage","A second mortgage permanently subordinate to a first","A short-term loan to 'bridge' the gap between purchase of a new property and sale of an existing one — typically secured by both properties or by the existing property's equity","An adjustable-rate refinance product"],
   "correctAnswer":2,
   "explanation":"Bridge loans (or 'swing loans') are short-term financing — typically 6-12 months — designed to bridge the gap between buying a new property and selling an existing one. Common scenarios: the buyer needs the equity from their current home for the down payment on a new home but cannot wait for it to sell. Bridge loans typically carry higher interest rates and fees but provide flexibility. They're paid off when the existing property sells."},

  {"id":"re-nat-227","domain":"Financing","type":"single-choice",
   "question":"A 'wraparound mortgage' is:",
   "choices":["A standard FHA loan","A loan secured by federal funds only","A primary residence mortgage only","A new mortgage 'wrapped' around an existing one — the buyer makes payments to the seller (who keeps the original loan in place) at a typically higher rate; the seller continues paying the underlying loan from those payments"],
   "correctAnswer":3,
   "explanation":"A wraparound mortgage is a junior loan from the seller to the buyer that 'wraps' around an existing senior loan. The seller doesn't pay off the original mortgage at closing — instead, the buyer makes payments to the seller on the wraparound (typically at a higher rate), and the seller continues paying the underlying loan from those payments. Wraparounds let buyers obtain financing at favorable terms but carry significant risks: triggering due-on-sale clauses in the underlying loan, and the buyer's payments funding the seller's continuing obligation."},

  {"id":"re-nat-228","domain":"Financing","type":"single-choice",
   "question":"A 'land contract' (also called a 'contract for deed' or 'installment land contract') is:",
   "choices":["A seller-financed arrangement in which the seller retains LEGAL title to the property and the buyer takes possession and makes installment payments; legal title transfers only when the buyer fulfills the contract — providing the seller security but raising potential consumer-protection concerns in some states","A federal grant for first-time homebuyers","A type of construction loan","An equity-shared purchase agreement"],
   "correctAnswer":0,
   "explanation":"In a land contract (contract for deed), the seller retains LEGAL title to the property while the buyer takes possession and makes installment payments — typically with the buyer's equitable interest growing over time. Legal title transfers (via deed) only upon final payment. While useful for sellers who want financing security without traditional foreclosure, these arrangements have raised consumer-protection concerns — particularly when buyers have substantial equity but default on a single payment. Some states have enacted statutory protections."},

  # ── Real Estate Calculations (5) ────────────────────────────────────────
  {"id":"re-nat-229","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A 30-year fixed-rate mortgage at 6.5% (note rate) has 2 discount points paid up front and various closing costs. The Annual Percentage Rate (APR) on this loan will most likely be:",
   "choices":["Lower than the note rate","Higher than the note rate, because the APR captures the additional cost of points and certain other finance charges over the life of the loan","Exactly equal to the note rate","Unrelated to the note rate"],
   "correctAnswer":1,
   "explanation":"The Annual Percentage Rate (APR) reflects the total cost of credit annualized — including the note interest rate plus discount points, origination fees, and certain other prepaid finance charges spread over the life of the loan. Because of these additions, the APR is HIGHER than the nominal note rate. Borrowers should compare APRs across loans to assess relative costs — particularly between loans with different point/fee structures."},

  {"id":"re-nat-230","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A house has measurements of 35.5 ft × 42.3 ft. What is its total square footage, rounded to the nearest whole square foot?",
   "choices":["1,479","1,502","1,502","1,501"],
   "correctAnswer":2,
   "explanation":"Step 1 — multiply length × width: 35.5 × 42.3 = 1,501.65 sq ft.\nStep 2 — round to nearest whole: 1,502 sq ft.\nExam math problems often include 'distractor' choices that come from common errors (e.g., 1,501 from truncating instead of rounding, or 1,479 from incorrectly subtracting 22). Always carry out the full multiplication and apply standard rounding rules at the end."},

  {"id":"re-nat-231","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A buyer wants to know how many linear feet of fencing are needed to fully enclose a rectangular lot measuring 50 ft × 120 ft.",
   "choices":["170 ft","6,000 ft","220 ft","340 ft"],
   "correctAnswer":3,
   "explanation":"Step 1 — perimeter formula for a rectangle: 2 × (length + width).\nStep 2 — Apply: 2 × (50 + 120) = 2 × 170 = 340 ft.\nDistractor 170 is just one length + width (half perimeter). Distractor 6,000 is the area in square feet (length × width). Linear feet measure perimeter (distance around); square feet measure area (inside)."},

  {"id":"re-nat-232","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An investor purchased a rental property for $150,000 in cash. The property generates $9,000 annually in net cash flow after all expenses. What is the simple (cash-on-cash) ROI in year 1?",
   "choices":["6%","16.6%","9%","Cannot be calculated without knowing financing"],
   "correctAnswer":0,
   "explanation":"Step 1 — Cash-on-Cash Return = Annual Cash Flow ÷ Cash Invested.\nStep 2 — Apply: $9,000 ÷ $150,000 = 0.06 = 6%.\nFor an all-cash purchase, total cash invested equals the purchase price. If the buyer used a mortgage, the formula would substitute the down payment + closing costs as the cash invested, typically producing a higher percentage return — illustrating the leverage effect of mortgage financing."},

  {"id":"re-nat-233","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A property is purchased for $200,000. The buyer makes $20,000 of capital improvements and incurs $4,000 of closing costs that are capitalized (added to basis). What is the property's adjusted cost basis for tax purposes?",
   "choices":["$200,000","$224,000","$220,000","$180,000"],
   "correctAnswer":1,
   "explanation":"Step 1 — Cost basis starts at purchase price plus capitalizable closing costs: $200,000 + $4,000 = $204,000.\nStep 2 — Add capital improvements: $204,000 + $20,000 = $224,000.\nAdjusted basis matters for calculating capital gain on sale (gain = sale price − adjusted basis). It can be increased by capital improvements and certain other costs, and decreased by depreciation taken (for rental property). Routine maintenance does NOT increase basis."},

  # ── Property Ownership (4) ──────────────────────────────────────────────
  {"id":"re-nat-234","domain":"Property Ownership","type":"single-choice",
   "question":"A commercial tenant installs custom shelving, display cases, and a custom bar countertop in their leased restaurant space. At the end of the lease, the tenant wishes to remove these items. Under the law of TRADE FIXTURES:",
   "choices":["The items belong to the landlord","The items must remain in place","Trade fixtures — items installed by a commercial tenant for the tenant's business — generally REMAIN the tenant's personal property and can typically be removed by the tenant before lease end, provided removal doesn't damage the premises (or the damage is repaired)","The tenant must pay the landlord for removal"],
   "correctAnswer":2,
   "explanation":"Trade fixtures are an important exception to the general rule that fixtures become part of real property. Items installed by a commercial tenant for use in the tenant's trade or business (e.g., restaurant equipment, store displays, dental chairs) generally remain the tenant's personal property and may be removed by the tenant before lease end. The tenant must repair any resulting damage. The trade fixtures exception does NOT apply to residential tenants."},

  {"id":"re-nat-235","domain":"Property Ownership","type":"single-choice",
   "question":"Courts use several tests to determine whether an item that was once personal property has become a fixture (part of the real estate). The classic test is often summarized by the acronym MARIA — standing for:",
   "choices":["Method, Architecture, Resilience, Inheritance, Acreage","Money, Acquisition, Recording, Income, Appraisal","Method, Adaptation, Removal, Intent, Annotation","Method of attachment, Adaptation to property, Relationship of the parties, Intent of the parties, Agreement of the parties"],
   "correctAnswer":3,
   "explanation":"MARIA stands for: Method of attachment (how attached), Adaptation (whether the item is adapted to the property's use), Relationship of the parties (e.g., landlord-tenant favors removal), Intent (objective intention at installation), and Agreement (any contractual provisions about the item). No single factor is decisive — courts weigh all five. Some states/sources use slightly different variants (MART or MATCH) but the conceptual framework is similar."},

  {"id":"re-nat-236","domain":"Property Ownership","type":"single-choice",
   "question":"A homeowner removes a chandelier from the dining room and takes it with them after closing. The legal action that converted a fixture back into personal property is called:",
   "choices":["Severance — separating an item from real property to convert it back to personal property","Annexation","Adverse possession","Reformation"],
   "correctAnswer":0,
   "explanation":"Severance is the legal action of separating something from real property to convert it back to personal property — the opposite of annexation. A chandelier hardwired into the ceiling is typically a fixture (real property) unless and until removed. Sellers who plan to take fixtures with them at closing should either (1) sever them before contracting or (2) clearly exclude them in the purchase contract."},

  {"id":"re-nat-237","domain":"Property Ownership","type":"single-choice",
   "question":"A homeowner buys a beautiful new chandelier and hardwires it into the dining room ceiling. The legal process by which this once-personal property becomes real property is called:",
   "choices":["Severance","Annexation — incorporating personal property into real estate so that it becomes part of the real property","Reservation","Eminent domain"],
   "correctAnswer":1,
   "explanation":"Annexation is the legal process of attaching personal property to real estate in a way that incorporates it into the real property — turning it into a fixture. Common indicators of annexation: physical attachment (screwed, glued, plumbed in), adaptation to the real estate, and intent that it remain permanently. Once annexed and treated as a fixture, the item is conveyed with the real estate unless specifically excluded."},

  # ── Transfer of Title (4) ───────────────────────────────────────────────
  {"id":"re-nat-238","domain":"Transfer of Title","type":"single-choice",
   "question":"Under the TRID rules, the lender must deliver the Closing Disclosure (CD) to the borrower:",
   "choices":["At closing","Within 30 days after closing","At least 3 business days BEFORE consummation (the loan closing), with rare exceptions and a new 3-day wait period triggered by specified types of changes","Within 5 days of loan application"],
   "correctAnswer":2,
   "explanation":"Under TRID (TILA-RESPA Integrated Disclosure rules) effective October 2015, the Closing Disclosure must be delivered to the borrower AT LEAST 3 BUSINESS DAYS BEFORE consummation of the loan. Changes to certain terms (APR increase beyond tolerance, addition of prepayment penalty, change in loan product) trigger a NEW 3-day waiting period. This rule was designed to give borrowers time to review and identify discrepancies before signing."},

  {"id":"re-nat-239","domain":"Transfer of Title","type":"single-choice",
   "question":"Before the TRID rules of 2015, residential closings used the HUD-1 Settlement Statement. Now, for most residential transactions involving a consumer mortgage:",
   "choices":["The HUD-1 has been retained","Nothing has changed","All transactions use the Loan Estimate alone","The HUD-1 has been replaced for most consumer mortgage transactions by the Closing Disclosure (CD); the HUD-1 is now used mainly for cash transactions, commercial loans, and certain other exceptions"],
   "correctAnswer":3,
   "explanation":"The Closing Disclosure (CD) replaced the HUD-1 Settlement Statement for most residential consumer mortgage transactions on or after October 3, 2015 — when the TRID rules took effect. The HUD-1 is still used for non-TRID transactions (cash deals, commercial loans, certain reverse mortgages, and loans on lots without dwellings). The CD merges TILA and RESPA disclosures and replaces both the former Truth-in-Lending and HUD-1 documents."},

  {"id":"re-nat-240","domain":"Transfer of Title","type":"single-choice",
   "question":"Under the Foreign Investment in Real Property Tax Act (FIRPTA), when a foreign person sells U.S. real property, the BUYER (or the closing agent) generally must:",
   "choices":["Withhold a percentage of the gross sale proceeds (typically 15% for residential transactions over $1 million, with lower rates and exemptions in some circumstances) and remit to the IRS","Pay nothing additional","Refuse to close the transaction","Verify the seller's immigration status"],
   "correctAnswer":0,
   "explanation":"FIRPTA requires the buyer (or closing agent) to withhold a specified percentage of the gross sale proceeds when the seller is a foreign person — 15% for most residential transactions, 10% for some lower-value residential transactions (under $1 million if the buyer will use as a residence), with exemptions for sales under $300,000 if the buyer will occupy as a residence. The withheld amount is remitted to the IRS as estimated tax. The seller may file for a reduced withholding or refund based on actual gain."},

  {"id":"re-nat-241","domain":"Transfer of Title","type":"single-choice",
   "question":"Under Internal Revenue Code Section 1031, a property owner can defer capital gains tax by exchanging:",
   "choices":["Any property for any other property","Investment or business real property for OTHER like-kind investment or business real property — provided strict timing rules (45-day identification, 180-day closing) are met","Personal residences only","Stocks for real estate"],
   "correctAnswer":1,
   "explanation":"Section 1031 'like-kind exchanges' allow deferral of capital gains tax when investment or business real property is exchanged for OTHER like-kind investment or business real property. Strict timing applies: replacement property must be identified within 45 days of selling the original; the exchange must close within 180 days. The Tax Cuts and Jobs Act of 2017 limited Section 1031 to REAL PROPERTY only — personal property exchanges no longer qualify. Personal residences cannot be exchanged under Section 1031."},

  # ── Valuation and Market Analysis (3) ───────────────────────────────────
  {"id":"re-nat-242","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"The appraisal principle holding that a property's value is maximized when it is in HARMONY with surrounding properties — a $2 million mansion in a neighborhood of $250,000 homes is worth less than its construction cost would suggest — is called:",
   "choices":["Substitution","Anticipation","Conformity — value is maximized when the property is in harmony with surrounding properties","Highest and best use"],
   "correctAnswer":2,
   "explanation":"The principle of Conformity holds that value is maximized when a property is in harmony with surrounding properties — similar in style, size, age, and quality. A property that is significantly larger, more valuable, or otherwise non-conforming is typically valued by the market BELOW its construction cost (the 'over-improvement' problem). A significantly smaller or older property in a high-value neighborhood may benefit from progression (rising tide lifts all boats); the opposite is regression."},

  {"id":"re-nat-243","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"The appraisal principle of CONTRIBUTION holds that:",
   "choices":["Every property feature contributes equally to total value","The lot's value is the same as the building's value","All home renovations recover 100% of their cost","The value contribution of any property feature is measured by what its presence (or absence) adds to (or subtracts from) the property's overall market value — NOT by what it cost to install"],
   "correctAnswer":3,
   "explanation":"The principle of Contribution measures the value impact of a property feature by what it ADDS to the property's overall market value — not by its installation cost. A $50,000 swimming pool may add only $20,000 (or even subtract value) in some markets. A $10,000 kitchen renovation might add $25,000. Appraisers use contribution analysis when adjusting comparables in the sales comparison approach — measuring market reaction to specific features."},

  {"id":"re-nat-244","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"USPAP (Uniform Standards of Professional Appraisal Practice) is:",
   "choices":["The professional and ethical standard for real estate appraisers, developed by The Appraisal Foundation and incorporated by reference into federal and state regulation; appraisers performing federally-related transactions must comply","A set of voluntary guidelines with no legal effect","Applicable only to commercial appraisals","Required only for FHA appraisals"],
   "correctAnswer":0,
   "explanation":"USPAP is the professional and ethical standards manual for real estate appraisers in the United States, developed by The Appraisal Foundation. Federal and state regulations incorporate USPAP by reference — appraisers performing federally-related transactions (which includes most mortgage-related appraisals) must comply with USPAP. It covers ethics, competency, scope of work, appraisal development, appraisal reporting, and review activities."},

  # ── Property Disclosures (3) ────────────────────────────────────────────
  {"id":"re-nat-245","domain":"Property Disclosures","type":"single-choice",
   "question":"Sex offender registry information is publicly available under Megan's Law. With respect to disclosure of a registered offender residing near a listed property:",
   "choices":["All states require affirmative disclosure by sellers and agents","State law varies — some states require affirmative disclosure, some require disclosure on request, and many provide that information about registered offenders is non-material requiring no automatic disclosure (with statutory notices directing inquiries to the public registry)","Federal law requires the listing broker to notify all prospective buyers","No state requires any disclosure"],
   "correctAnswer":1,
   "explanation":"Megan's Law itself requires the public registry, but the obligation of real estate sellers and agents to disclose registered offender residences VARIES SIGNIFICANTLY by state. Many states classify the information as non-material (no automatic disclosure required) and instead require contract notices directing buyers to consult the public registry. Some states impose disclosure-on-request duties. Licensees must know the rules in their jurisdiction."},

  {"id":"re-nat-246","domain":"Property Disclosures","type":"single-choice",
   "question":"A property was used as a methamphetamine production lab. With respect to disclosure:",
   "choices":["Many states require specific disclosure of former meth labs, given the residual contamination risks; some states require professional decontamination certification before re-sale; failure to disclose can be material misrepresentation","Federal law fully preempts state meth disclosure laws","No disclosure is ever required","Disclosure is required only for properties demolished and rebuilt"],
   "correctAnswer":2,
   "explanation":"Methamphetamine production leaves chemical residues throughout a property that can pose ongoing health risks to occupants. Many states have specific laws requiring disclosure of former meth production, decontamination procedures, and re-occupancy certification. Sellers may face material misrepresentation liability for non-disclosure of known meth contamination — and licensees often have parallel disclosure duties. Even where no specific statute exists, the common-law duty to disclose known material defects typically applies."},

  {"id":"re-nat-247","domain":"Property Disclosures","type":"single-choice",
   "question":"A property is served by a private water well rather than a municipal water supply. Most state disclosure laws would treat this as:",
   "choices":["Always exempt from disclosure","Disclosed only if asked","Disclosed only in commercial transactions","A material fact requiring disclosure — buyers should be informed of the water source, well location, age, capacity, and recent water quality testing"],
   "correctAnswer":3,
   "explanation":"Private water sources (wells) are material facts that should be disclosed because they affect the property's value, ongoing maintenance obligations, and buyer expectations. Buyers should be informed of the source (drilled, dug, spring), location, age, capacity (gallons per minute), and recent water quality test results. Federal law does not specifically mandate well disclosure, but most state disclosure statutes and the common-law duty to disclose material facts apply."},

  # ── Land Use Controls and Regulations (2) ───────────────────────────────
  {"id":"re-nat-248","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"A city's MASTER PLAN (or general plan or comprehensive plan):",
   "choices":["Is the long-range policy document establishing the community's vision for future development — guiding zoning decisions, infrastructure investment, and growth management — and is typically the legal foundation for the more specific zoning code","Is a list of approved buyer addresses","Sets individual property taxes","Is a private homeowner association document"],
   "correctAnswer":0,
   "explanation":"A master plan (also called a general plan or comprehensive plan, depending on the state) is the long-range policy document establishing a community's vision for future development — its goals, policies, and intended land uses. The plan guides zoning decisions, infrastructure investment, and growth management. Most states require zoning to be consistent with the adopted master plan. Plans typically cover 20-30 year time horizons and are periodically updated."},

  {"id":"re-nat-249","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"When zoning regulations (a public form of land-use control) conflict with deed restrictions (a private form), the general rule is that:",
   "choices":["Zoning automatically overrides deed restrictions","Each property owner must comply with BOTH the public zoning restrictions AND any applicable private restrictions; the more restrictive applies, but neither overrides the other","Deed restrictions override zoning","Federal law preempts both"],
   "correctAnswer":1,
   "explanation":"Public zoning laws and private deed restrictions operate INDEPENDENTLY — each property owner must comply with BOTH. When they conflict, the more restrictive applies (e.g., if zoning allows two-story homes but deed restrictions limit to one story, deed restrictions control because they're more restrictive; if deed restrictions allow business use but zoning prohibits it, zoning controls). Public zoning cannot override valid private restrictions, and private restrictions cannot exempt the property from zoning."},

  # ── Leasing and Property Management (1) ─────────────────────────────────
  {"id":"re-nat-250","domain":"Leasing and Property Management","type":"single-choice",
   "question":"Many state landlord-tenant laws require that residential security deposits be held in a SEPARATE TRUST ACCOUNT and returned to the tenant — minus permissible deductions — within a stated period (often 14-30 days) after lease end. Mishandling can result in:",
   "choices":["No penalty","A small administrative fee","Statutory damages (sometimes 2-3x the deposit), required return of the entire deposit regardless of damages, and potential liability for attorneys' fees","Criminal liability only"],
   "correctAnswer":2,
   "explanation":"State landlord-tenant laws impose strict rules on security deposit handling: separate trust account (not commingled with operating funds), itemized accounting of any deductions, and return within a stated period (typically 14-30 days, varies by state) after the tenant vacates. Statutory penalties for non-compliance can include 2-3x the deposit, forfeiture of the entire deposit regardless of legitimate damages, and recovery of the tenant's attorneys' fees. The exact rules vary significantly by state."},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
