"""Real Estate National batch 1 — questions 1-50.

Quality contract for this cert (per the deep dive):
- 100% single-choice. The real PSI national exam is 4-option SC, period.
- Every question carries an `explanation` (the user explicitly opted-in
  to step-by-step explanations as the differentiator vs. free competition).
- Math problems show the worked calculation in the explanation so a
  candidate who got it wrong can see exactly where their arithmetic went.
- Phrasing is scenario-based when natural, not rote definition recall.
- correctAnswer distribution across A/B/C/D is balanced ~13/13/12/12.
"""
import json, pathlib

Q = pathlib.Path("src/data/real-estate-national-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── Contracts (9 questions) ─────────────────────────────────────────────
  # 1 Contracts ca:0
  {"id":"re-nat-1","domain":"Contracts","type":"single-choice",
   "question":"Which of the following is NOT one of the essential elements of a valid real estate contract?",
   "choices":[
     "Earnest money deposit",
     "Offer and acceptance (mutual assent)",
     "Consideration",
     "Legal capacity of the parties"
   ],"correctAnswer":0,
   "explanation":"The essential elements of a valid contract are: offer and acceptance (mutual assent), consideration, legal capacity of the parties, legal purpose, and — for contracts within the Statute of Frauds — being in writing. An earnest money deposit is customary in real estate transactions but is NOT an essential element. A contract with $1 (or even no) earnest money can still be valid if the other elements are met."},

  # 2 Contracts ca:1
  {"id":"re-nat-2","domain":"Contracts","type":"single-choice",
   "question":"A property owner signs an exclusive right to sell listing with Broker A. During the listing period, the owner finds a buyer through their own personal network and sells the property without involving Broker A. Is Broker A entitled to a commission?",
   "choices":[
     "No, because the owner found the buyer independently",
     "Yes, because an exclusive right to sell listing entitles the broker to commission regardless of who finds the buyer",
     "Only if the buyer was previously registered with Broker A",
     "No, because the broker performed no services"
   ],"correctAnswer":1,
   "explanation":"Under an exclusive right to sell listing, the broker is entitled to a commission if the property sells during the listing period regardless of who procures the buyer — including the owner themselves. This is the defining feature that distinguishes it from an exclusive agency listing (where the seller may sell to their own buyer commission-free) and an open listing (where any broker who produces a buyer earns the commission, and the owner may also sell directly without owing one)."},

  # 3 Contracts ca:2
  {"id":"re-nat-3","domain":"Contracts","type":"single-choice",
   "question":"Under the Statute of Frauds, which of the following real-estate-related contracts MUST be in writing to be enforceable?",
   "choices":[
     "An oral month-to-month residential lease",
     "An oral agreement to share office space for six months",
     "A purchase agreement for the sale of real estate",
     "An oral promise to refer a friend to a particular lender"
   ],"correctAnswer":2,
   "explanation":"The Statute of Frauds requires that contracts for the sale of real estate ALWAYS be in writing to be enforceable. Short-term residential leases (typically one year or less) are generally enforceable orally. Whether brokerage commission agreements must be in writing depends on the state, but most states do require it for the commission to be legally collectible — that is not, however, the universal rule the Statute of Frauds imposes nationally on the sale of real estate itself."},

  # 4 Contracts ca:3
  {"id":"re-nat-4","domain":"Contracts","type":"single-choice",
   "question":"A buyer offers $300,000 with a 30-day closing. The seller responds with $315,000 and a 45-day closing. The buyer's original offer is now:",
   "choices":[
     "Still open and may be accepted by the seller at any time",
     "Automatically extended to match the seller's counter",
     "Modified to reflect the new terms",
     "Terminated by the seller's counteroffer"
   ],"correctAnswer":3,
   "explanation":"A counteroffer operates as a rejection of the original offer. Once the seller counters, the buyer's original offer is dead — the seller cannot later 'change their mind' and accept the buyer's original terms. The counteroffer becomes a new offer that the original offeror (the buyer) may now accept, reject, or counter in turn."},

  # 5 Contracts ca:0
  {"id":"re-nat-5","domain":"Contracts","type":"single-choice",
   "question":"A buyer signs a purchase agreement contingent on obtaining financing within 30 days. After 35 days, the buyer has neither obtained financing nor delivered any notice to the seller. What is the most likely status of the contract?",
   "choices":[
     "The contingency has expired by its own terms — the seller may demand performance or treat any failure to close as a default",
     "The contingency automatically extends until financing is obtained",
     "The contract is void from the beginning",
     "The buyer's earnest money is automatically refunded"
   ],"correctAnswer":0,
   "explanation":"Most contingency periods expire by their own terms. If the buyer does not deliver notice of waiver, exercise, or termination within the contingency period, the contingency is typically deemed waived. The buyer remains obligated to perform under the contract, and the seller may treat the buyer's later failure to close as a default — including potentially retaining earnest money or pursuing other contractual remedies."},

  # 6 Contracts ca:1
  {"id":"re-nat-6","domain":"Contracts","type":"single-choice",
   "question":"Under which type of listing agreement is exactly ONE broker authorized to market the property, but the seller retains the right to sell the property themselves without owing a commission?",
   "choices":[
     "Exclusive right to sell",
     "Exclusive agency",
     "Open listing",
     "Net listing"
   ],"correctAnswer":1,
   "explanation":"Exclusive agency designates a single broker but reserves to the seller the right to sell directly (commission-free). Exclusive right to sell pays the broker regardless of who procures the buyer. Open listing allows multiple brokers and the seller (whoever procures gets paid or, for the seller, no commission). Net listings (where the broker keeps everything over a set 'net' to the seller) are prohibited or heavily restricted in many states because of obvious conflict-of-interest concerns."},

  # 7 Contracts ca:2
  {"id":"re-nat-7","domain":"Contracts","type":"single-choice",
   "question":"A residential purchase contract contains the clause 'time is of the essence.' What is the practical legal effect?",
   "choices":[
     "The clause is decorative and has no legal effect",
     "The parties may close at any reasonable time",
     "Strict adherence to the stated deadlines is required; missing them constitutes a default",
     "It allows either party to extend the contract deadlines indefinitely"
   ],"correctAnswer":2,
   "explanation":"A 'time is of the essence' clause makes the stated deadlines material to the contract. Missing a deadline (e.g., closing date, contingency expiration) is treated as a default that may give rise to contractual remedies, rather than the 'reasonable time' standard that would otherwise apply in its absence."},

  # 8 Contracts ca:3
  {"id":"re-nat-8","domain":"Contracts","type":"single-choice",
   "question":"Which of the following describes a UNILATERAL contract in real estate?",
   "choices":[
     "An exclusive right to sell listing where both broker and seller have obligations",
     "A typical purchase agreement where buyer and seller both have obligations",
     "A residential lease in which both landlord and tenant have ongoing duties",
     "An option to purchase, where the seller is bound to hold the offer open but the buyer is not obligated to buy"
   ],"correctAnswer":3,
   "explanation":"A unilateral contract is one in which only one party makes a promise; the other accepts by performance. An option to purchase fits exactly: the seller (optionor) is bound to keep the offer open for the option period, but the buyer (optionee) is under no obligation to exercise. Most other real estate contracts (listings, purchase agreements, leases) are bilateral — both sides exchange promises."},

  # 9 Contracts ca:0
  {"id":"re-nat-9","domain":"Contracts","type":"single-choice",
   "question":"A buyer breaches a purchase agreement. The contract contains a liquidated damages clause limiting the seller's recovery to retention of the earnest money deposit. The seller wishes to sue for additional damages. Most likely outcome:",
   "choices":[
     "The seller's recovery is limited to the earnest money — the seller cannot pursue additional damages",
     "The seller may sue for the full difference between the contract price and the eventual resale price",
     "The buyer is automatically required to perform under specific performance",
     "Liquidated damages clauses are unenforceable in residential real estate"
   ],"correctAnswer":0,
   "explanation":"A liquidated damages clause, when enforceable, fixes the damages available for a breach in advance. If the clause caps the seller's recovery at the earnest money, the seller generally cannot pursue actual damages beyond that. Courts uphold these clauses when (1) actual damages would be difficult to calculate at the time of contracting and (2) the agreed amount is a reasonable estimate of likely loss — not a penalty."},

  # ── General Principles of Agency (7 questions) ──────────────────────────
  # 10 Agency ca:1
  {"id":"re-nat-10","domain":"General Principles of Agency","type":"single-choice",
   "question":"A broker representing the seller learns that the seller is in financial distress and would accept significantly less than the listed price. To whom does the broker owe a duty of confidentiality regarding this information?",
   "choices":[
     "The buyer — so the buyer can make a fair offer",
     "The seller — as their fiduciary, the broker must keep this information confidential",
     "Both parties equally",
     "No one — price negotiations are inherently public"
   ],"correctAnswer":1,
   "explanation":"The seller is the broker's principal. Among the fiduciary duties (often remembered as OLD CAR: Obedience, Loyalty, Disclosure to the principal, Confidentiality, Accounting, Reasonable care), confidentiality requires the broker to protect non-public information that could harm the principal — including the seller's bottom-line price or motivation to sell. Disclosing it to the buyer would be a clear breach."},

  # 11 Agency ca:2
  {"id":"re-nat-11","domain":"General Principles of Agency","type":"single-choice",
   "question":"A buyer's agent shows their client a property where the seller is represented by a different broker within the same brokerage firm. With both parties' informed written consent, what type of agency relationship is most likely created?",
   "choices":[
     "Single agency for both",
     "Subagency (the buyer's agent now also represents the seller)",
     "Designated agency within the same firm",
     "No agency exists in this scenario"
   ],"correctAnswer":2,
   "explanation":"Designated agency (sometimes called appointed or assigned agency) is the structure most modern firms use when both buyer and seller are represented within one brokerage. The firm 'designates' a specific agent to each side. With informed written consent, each designated agent owes full fiduciary duties to their respective client without creating a dual-agency scenario at the agent level."},

  # 12 Agency ca:3
  {"id":"re-nat-12","domain":"General Principles of Agency","type":"single-choice",
   "question":"A homeowner verbally tells a friend who is a licensed agent, 'Sell my house for me — I trust you.' The agent begins marketing the property. The agency was created through:",
   "choices":[
     "Ratification",
     "Estoppel",
     "An express written agreement",
     "An express oral agreement"
   ],"correctAnswer":3,
   "explanation":"An express agency can be created either in writing or orally. Here the principal expressly authorized the agent in spoken words, so it is express oral. Whether the broker can later enforce a commission depends on the state — most states require listing agreements to be in writing for commission enforceability under their Statute of Frauds — but the creation method itself is express oral."},

  # 13 Agency ca:0
  {"id":"re-nat-13","domain":"General Principles of Agency","type":"single-choice",
   "question":"Which of the following is NOT one of the traditional fiduciary duties an agent owes to their principal?",
   "choices":[
     "Caveat emptor (let the buyer beware)",
     "Loyalty",
     "Reasonable care and skill",
     "Accounting for funds"
   ],"correctAnswer":0,
   "explanation":"'Caveat emptor' is a doctrine about how buyers should treat purchases — it is NOT a duty an agent owes a principal. The classic fiduciary duties owed to a principal are commonly remembered as OLD CAR: Obedience, Loyalty, Disclosure (to principal), Confidentiality, Accounting, and Reasonable care."},

  # 14 Agency ca:1
  {"id":"re-nat-14","domain":"General Principles of Agency","type":"single-choice",
   "question":"An agent represents a buyer who is interested in a property listed by a different brokerage. What does the buyer's agent owe to the seller (a third party / customer)?",
   "choices":[
     "Full fiduciary duties as if the agent represented the seller",
     "Honest and fair dealing, including disclosure of material facts that would affect the seller's decision",
     "No duties whatsoever — the seller is a stranger",
     "Absolute confidentiality regarding the buyer's offer position"
   ],"correctAnswer":1,
   "explanation":"Even when there is no agency relationship, an agent still owes 'customers' (the non-represented party) duties of honesty and fair dealing, plus disclosure of material facts known to the agent that would meaningfully affect the other party's decision. The agent does not owe the seller fiduciary duties — those flow only to the principal (here, the buyer)."},

  # 15 Agency ca:2
  {"id":"re-nat-15","domain":"General Principles of Agency","type":"single-choice",
   "question":"An agency relationship can be terminated by all of the following EXCEPT:",
   "choices":[
     "Mutual agreement of the parties",
     "Completion of the agency's purpose (e.g., the closing of the sale)",
     "Unilateral revocation by either party with no possibility of damages, regardless of contract terms",
     "Death or incapacity of either party"
   ],"correctAnswer":2,
   "explanation":"Either party generally has the legal power to terminate an agency, BUT doing so in breach of the agency contract may still expose the breaching party to damages. The agency itself ends, but the contractual obligations don't simply evaporate. The correct statement of the law includes the possibility of damages for wrongful termination."},

  # 16 Agency ca:3
  {"id":"re-nat-16","domain":"General Principles of Agency","type":"single-choice",
   "question":"A broker is acting as a dual agent in a transaction with informed written consent from both parties. Which of the following is the broker MOST LIKELY PROHIBITED from disclosing?",
   "choices":[
     "The physical condition of the property",
     "Material defects known to the broker",
     "Required disclosures under federal law (e.g., lead-based paint)",
     "The seller's stated bottom-line price"
   ],"correctAnswer":3,
   "explanation":"A dual agent owes limited (or modified) fiduciary duties to both parties and cannot favor one over the other. Disclosing the seller's bottom-line price to the buyer would clearly disadvantage the seller and violate confidentiality. Material defects and federally required disclosures must still be communicated; those are duties owed irrespective of the agency relationship."},

  # ── Practice of Real Estate (7 questions) ──────────────────────────────
  # 17 Practice ca:0
  {"id":"re-nat-17","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The federal Fair Housing Act (as amended) prohibits discrimination in the sale or rental of housing based on all of the following protected classes EXCEPT:",
   "choices":[
     "Source of income (e.g., Section 8 housing choice vouchers)",
     "Race",
     "Religion",
     "Familial status"
   ],"correctAnswer":0,
   "explanation":"Federally protected classes are: race, color, religion, sex (including gender identity and sexual orientation per HUD's 2021 interpretation of Bostock), national origin, familial status, and disability. 'Source of income' is NOT a federal protected class, though many state and local jurisdictions have added it. Always check state and local fair housing law in addition to federal."},

  # 18 Practice ca:1
  {"id":"re-nat-18","domain":"Practice of Real Estate","type":"single-choice",
   "question":"A real estate agent suggests to a Black buyer that they would 'feel more comfortable' in a neighborhood with a higher concentration of Black residents, redirecting them away from properties in other neighborhoods. This practice is called:",
   "choices":[
     "Blockbusting",
     "Steering",
     "Redlining",
     "Puffing"
   ],"correctAnswer":1,
   "explanation":"Steering is the practice of directing prospective buyers toward or away from particular neighborhoods based on protected class characteristics. Blockbusting is inducing owners to sell by suggesting that members of a protected class are moving into the neighborhood. Redlining is a lender practice of denying credit (or charging more) in particular geographic areas based on protected class. All three are illegal under federal fair housing law."},

  # 19 Practice ca:2
  {"id":"re-nat-19","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Under the Real Estate Settlement Procedures Act (RESPA), which of the following practices is generally PROHIBITED?",
   "choices":[
     "Providing the borrower a Loan Estimate within 3 business days of application",
     "Charging an itemized documentation fee disclosed on the Closing Disclosure",
     "Paying a referral fee to a settlement service provider for the referral of business",
     "Requiring the borrower to use a specific title insurance company chosen by the lender"
   ],"correctAnswer":2,
   "explanation":"RESPA Section 8 prohibits kickbacks and unearned referral fees among settlement service providers (lenders, title companies, appraisers, etc.). Loan Estimates and proper itemized fees are required. Lenders generally may not force the use of a specific title insurance company; the practice has long been illegal under RESPA and Reg X."},

  # 20 Practice ca:3
  {"id":"re-nat-20","domain":"Practice of Real Estate","type":"single-choice",
   "question":"An agent tells a buyer, 'This is the best home in the neighborhood — you'll love living here.' This statement is best classified as:",
   "choices":[
     "Material misrepresentation that could trigger rescission of the contract",
     "Fraud",
     "An express warranty about the property",
     "Puffing — an expression of opinion that generally does not give rise to liability"
   ],"correctAnswer":3,
   "explanation":"Puffing is a statement of opinion or general praise (e.g., 'best,' 'spectacular,' 'amazing') that a reasonable buyer would not rely on as a statement of fact. Statements of objective material fact (e.g., 'the roof is new,' 'the basement does not leak') CAN form the basis for misrepresentation claims if false. The distinction matters: puffing is allowed; affirmative misstatements of fact are not."},

  # 21 Practice ca:0
  {"id":"re-nat-21","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Two competing brokerages in the same town agree to set a minimum commission rate of 6% on all residential listings going forward. This agreement is:",
   "choices":[
     "A per se violation of the Sherman Antitrust Act (price fixing)",
     "Permitted because each brokerage independently chose to follow the rate",
     "Permitted because commission rates are set by industry standard",
     "Illegal only if both brokerages belong to the same trade association"
   ],"correctAnswer":0,
   "explanation":"Horizontal price fixing among competitors is a per se violation of the Sherman Antitrust Act — the agreement is illegal regardless of effect or reasonableness. Other per se antitrust violations include market allocation, group boycotts, and tying arrangements. Brokerages must set commission rates independently."},

  # 22 Practice ca:1
  {"id":"re-nat-22","domain":"Practice of Real Estate","type":"single-choice",
   "question":"A broker holds earnest money deposits from buyers in the same operating account that the brokerage uses for payroll and bills. This practice is:",
   "choices":[
     "Permitted as long as the broker keeps detailed records",
     "Commingling — a violation of trust account requirements that can result in license discipline up to revocation",
     "Conversion only if the broker actually spends client funds",
     "Acceptable as long as the broker reconciles the account monthly"
   ],"correctAnswer":1,
   "explanation":"Mixing client funds with the brokerage's operating funds is commingling — a fundamental violation of every state's trust account rules. Conversion is a related but distinct (and typically more serious) offense involving actually using client funds for the broker's benefit. Either can result in license revocation; commingling alone is enough."},

  # 23 Practice ca:2
  {"id":"re-nat-23","domain":"Practice of Real Estate","type":"single-choice",
   "question":"An agent prepares a print advertisement that does NOT include the brokerage's name. Under typical advertising regulations, this advertisement is:",
   "choices":[
     "Acceptable as long as the agent's name appears",
     "Required only to include the agent's license number",
     "Generally a violation — advertisements must identify the supervising broker or brokerage",
     "Permitted on social media but not in print"
   ],"correctAnswer":2,
   "explanation":"Nearly all state advertising regulations require that any advertisement of real estate services by a licensee identify the supervising broker or brokerage — agents cannot advertise as if they were independent. The exact format varies (some states require the brokerage to be 'prominently displayed' or in equal-size font), but the requirement itself is essentially universal."},

  # ── Financing (5 questions) ────────────────────────────────────────────
  # 24 Financing ca:3
  {"id":"re-nat-24","domain":"Financing","type":"single-choice",
   "question":"A buyer purchases a $400,000 home with a $40,000 down payment. The lender requires Private Mortgage Insurance (PMI) because the loan-to-value (LTV) ratio exceeds:",
   "choices":["50%", "70%", "75%", "80%"],"correctAnswer":3,
   "explanation":"The conventional industry rule is that PMI is required whenever the LTV exceeds 80%. Here the loan is $360,000 on a $400,000 property, an LTV of 90%, so PMI applies. PMI generally must be removed (by federal Homeowners Protection Act rules) when the loan reaches 78% LTV based on the original amortization schedule, and the borrower can typically request removal at 80%."},

  # 25 Financing ca:0
  {"id":"re-nat-25","domain":"Financing","type":"single-choice",
   "question":"In a residential mortgage transaction, the NOTE is the document that:",
   "choices":[
     "Establishes the borrower's promise to repay the debt",
     "Pledges the property as collateral",
     "Conveys ownership of the property at closing",
     "Records the lender's interest in the public record"
   ],"correctAnswer":0,
   "explanation":"The note is the borrower's promise to pay — it evidences the debt itself. The mortgage (or deed of trust, in title-theory states) is the security instrument that pledges the property as collateral. The deed is the instrument that conveys ownership. Recording in the public record is a separate step that provides constructive notice and protects the lender's priority."},

  # 26 Financing ca:1
  {"id":"re-nat-26","domain":"Financing","type":"single-choice",
   "question":"Which loan program typically allows eligible service members and veterans to purchase a primary residence with NO down payment?",
   "choices":[
     "FHA loan",
     "VA loan",
     "Conventional loan with PMI",
     "USDA Rural Development loan"
   ],"correctAnswer":1,
   "explanation":"VA loans (guaranteed by the Department of Veterans Affairs) allow eligible veterans and service members to finance up to 100% of the purchase price with no down payment and no PMI. USDA Rural Development loans can also offer 100% financing but are restricted to eligible rural areas and income limits. FHA loans require a minimum 3.5% down."},

  # 27 Financing ca:2
  {"id":"re-nat-27","domain":"Financing","type":"single-choice",
   "question":"A clause in a mortgage that allows the lender to declare the entire unpaid balance immediately due upon a specified event of default is called the:",
   "choices":[
     "Defeasance clause",
     "Subordination clause",
     "Acceleration clause",
     "Alienation (due-on-sale) clause"
   ],"correctAnswer":2,
   "explanation":"The acceleration clause is what allows a lender to accelerate the entire balance to immediately due upon default. The defeasance clause releases the lien when the loan is paid in full. Subordination clauses change lien priority. The alienation (due-on-sale) clause lets the lender call the loan when ownership transfers — related to but distinct from acceleration on default."},

  # 28 Financing ca:3
  {"id":"re-nat-28","domain":"Financing","type":"single-choice",
   "question":"Under judicial foreclosure, the lender must:",
   "choices":[
     "Issue a notice of default and proceed without any court involvement",
     "Rely on the power-of-sale clause in the deed of trust",
     "Conduct an informal courthouse-step auction without notice",
     "File a lawsuit and obtain a court order before the property can be sold"
   ],"correctAnswer":3,
   "explanation":"Judicial foreclosure requires the lender to file suit, obtain a judgment from a court, and have the sale conducted under court supervision (typically by the sheriff). Non-judicial (power-of-sale) foreclosure uses the power-of-sale clause in a deed of trust and avoids the court process. Whether a state allows non-judicial foreclosure varies — many western states do; many eastern states are strictly judicial."},

  # ── Real Estate Calculations (5 questions — MATH) ──────────────────────
  # 29 Calculations ca:0
  {"id":"re-nat-29","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A property sells for $350,000. The listing brokerage earns a 6% commission, which is split 50/50 with the cooperating (buyer-side) brokerage. The cooperating brokerage retains 40% of its share, paying the remainder to the buyer's agent. How much does the buyer's agent receive?",
   "choices":["$6,300","$8,400","$10,500","$12,000"],"correctAnswer":0,
   "explanation":"Step 1 — total commission: $350,000 × 6% = $21,000.\nStep 2 — cooperating brokerage's share: $21,000 × 50% = $10,500.\nStep 3 — buyer's agent receives the part NOT kept by the brokerage: $10,500 × (100% − 40%) = $10,500 × 60% = $6,300."},

  # 30 Calculations ca:1
  {"id":"re-nat-30","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A rectangular lot measures 120 feet by 150 feet. How many acres is this lot, rounded to two decimal places? (1 acre = 43,560 square feet)",
   "choices":["0.27 acres","0.41 acres","0.45 acres","1.20 acres"],"correctAnswer":1,
   "explanation":"Step 1 — area in square feet: 120 ft × 150 ft = 18,000 sq ft.\nStep 2 — convert to acres: 18,000 ÷ 43,560 = 0.4132…\nStep 3 — round to two decimals: 0.41 acres.\nMemorize 43,560 sq ft / acre — it appears constantly on the math portion of the exam."},

  # 31 Calculations ca:2
  {"id":"re-nat-31","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A buyer is purchasing a $275,000 home and qualifies for a 90% loan-to-value (LTV) loan. What is the required down payment?",
   "choices":["$13,750","$24,750","$27,500","$30,250"],"correctAnswer":2,
   "explanation":"Step 1 — loan amount at 90% LTV: $275,000 × 90% = $247,500.\nStep 2 — down payment is the remaining 10%: $275,000 − $247,500 = $27,500.\nQuicker path: down payment % = 100% − LTV% = 10%, so $275,000 × 10% = $27,500."},

  # 32 Calculations ca:3
  {"id":"re-nat-32","domain":"Real Estate Calculations","type":"single-choice",
   "question":"Annual property taxes of $2,400 have been paid IN ADVANCE by the seller on January 1. Closing occurs on May 1 (assume 120 days have passed). Using a 360-day year (banker's year), what proration credit is due to the seller from the buyer at closing?",
   "choices":["$800","$1,200","$1,600","$2,000"],"correctAnswer":2,
   "explanation":"Step 1 — daily tax rate: $2,400 ÷ 360 = $6.67/day.\nStep 2 — days the seller has paid for but will not own: 360 − 120 = 240 days (the rest of the year after closing).\nStep 3 — credit to seller: 240 × $6.67 = $1,600.\nThe buyer assumes responsibility from the day of closing forward, so the seller is reimbursed for the prepaid days that benefit the buyer."},

  # 33 Calculations ca:0
  {"id":"re-nat-33","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An investor is analyzing a property that produces $30,000 in annual Net Operating Income (NOI). The investor's required capitalization rate is 7.5%. What is the maximum price the investor should pay?",
   "choices":["$400,000","$300,000","$250,000","$2,250,000"],"correctAnswer":0,
   "explanation":"Step 1 — IRV formula: Value = Income ÷ Rate (I ÷ R = V).\nStep 2 — apply: $30,000 ÷ 0.075 = $400,000.\nIntuition check: a 7.5% cap on $400,000 returns $30,000 a year — matches NOI. The IRV triangle (Income, Rate, Value) is one of the most tested math relationships on the national exam."},

  # ── Property Ownership (4 questions) ───────────────────────────────────
  # 34 Property Ownership ca:1
  {"id":"re-nat-34","domain":"Property Ownership","type":"single-choice",
   "question":"A widow inherits a property as the sole owner. She has the right to possess, use, sell, lease, mortgage, and exclude others. This bundle of rights is most consistent with which estate?",
   "choices":[
     "Leasehold estate",
     "Fee simple absolute",
     "Life estate",
     "Fee simple defeasible"
   ],"correctAnswer":1,
   "explanation":"Fee simple absolute is the most complete form of ownership recognized by law — perpetual, fully inheritable, with no conditions or limitations. Life estates last only for someone's life; fee simple defeasible can be lost on a triggering event; leasehold is a tenant's possessory right, not ownership."},

  # 35 Property Ownership ca:2
  {"id":"re-nat-35","domain":"Property Ownership","type":"single-choice",
   "question":"Two unmarried business partners purchase an investment property and take title 'as tenants in common in equal shares.' If one partner dies, what happens to that partner's interest?",
   "choices":[
     "The surviving partner automatically receives the deceased's share by right of survivorship",
     "The deceased's share is forfeited to the state",
     "The deceased's share passes to the deceased's heirs by will or intestate succession",
     "The property must be sold and the proceeds divided"
   ],"correctAnswer":2,
   "explanation":"Tenancy in common does NOT carry the right of survivorship. Each tenant's interest passes through the deceased's estate — by will if one exists, otherwise by the state's intestate succession laws. Joint tenancy carries the right of survivorship. Tenancy by the entirety (married couples) and community property with right of survivorship also carry survivorship rights, but ordinary tenancy in common does not."},

  # 36 Property Ownership ca:3
  {"id":"re-nat-36","domain":"Property Ownership","type":"single-choice",
   "question":"Which form of co-ownership is reserved for married couples and, in many states, includes the right of survivorship plus additional protections against unilateral transfer or creditor claims of one spouse?",
   "choices":[
     "Tenancy in common",
     "Joint tenancy",
     "Community property (without survivorship)",
     "Tenancy by the entirety"
   ],"correctAnswer":3,
   "explanation":"Tenancy by the entirety is available only to married couples (and, in some states, registered domestic partners). It carries the right of survivorship and, importantly, neither spouse can unilaterally convey or encumber the property — and in many states the property is shielded from creditors of one spouse only. Not all states recognize tenancy by the entirety; community property states have analogous but distinct rules."},

  # 37 Property Ownership ca:0
  {"id":"re-nat-37","domain":"Property Ownership","type":"single-choice",
   "question":"An owner grants 'to A for the life of A, then to B' — granting A the right to possess and use the property during A's lifetime, with the property passing to B at A's death. This estate is:",
   "choices":[
     "A life estate",
     "A leasehold estate",
     "Fee simple defeasible",
     "Tenancy at will"
   ],"correctAnswer":0,
   "explanation":"A life estate is a possessory interest measured by the life of a person (typically the holder, sometimes another person — pur autre vie). When the measuring life ends, the property passes to the remainderman (B, here) or reverts to the grantor if no remainder is specified. The life tenant has full use and possession but cannot commit waste that harms the future interest."},

  # ── Transfer of Title (4 questions) ────────────────────────────────────
  # 38 Transfer ca:1
  {"id":"re-nat-38","domain":"Transfer of Title","type":"single-choice",
   "question":"A seller wants to convey title to a buyer with the strongest possible warranties, including against title defects that arose BEFORE the seller owned the property. Which deed is appropriate?",
   "choices":[
     "Quitclaim deed",
     "General warranty deed",
     "Special warranty deed",
     "Bargain and sale deed"
   ],"correctAnswer":1,
   "explanation":"A general warranty deed gives the grantee the broadest title protections, including covenants of seisin, against encumbrances, of quiet enjoyment, of further assurance, and of warranty — extending back through the entire chain of title, not just the grantor's ownership period. A special warranty deed only warrants against defects arising during the grantor's ownership. A quitclaim deed offers no warranties at all."},

  # 39 Transfer ca:2
  {"id":"re-nat-39","domain":"Transfer of Title","type":"single-choice",
   "question":"A quitclaim deed:",
   "choices":[
     "Guarantees the grantor has good and marketable title",
     "Includes covenants of warranty against all prior claims",
     "Conveys whatever interest the grantor has, if any, without any warranties",
     "Is the strongest form of conveyance available"
   ],"correctAnswer":2,
   "explanation":"A quitclaim deed conveys only whatever interest (if any) the grantor happens to have, with NO warranties of title. It is commonly used to clear clouds on title, transfer between family members, or settle boundary disputes — situations where warranty is not needed or available. If the grantor has no interest, the quitclaim conveys nothing."},

  # 40 Transfer ca:3
  {"id":"re-nat-40","domain":"Transfer of Title","type":"single-choice",
   "question":"Recording a deed in the county recorder's office:",
   "choices":[
     "Is required for the deed to be valid between grantor and grantee",
     "Itself transfers ownership of the property",
     "Eliminates the need for title insurance",
     "Provides constructive notice to the world of the grantee's interest"
   ],"correctAnswer":3,
   "explanation":"Recording is NOT required to make a deed valid between the parties — a properly executed and delivered deed transfers ownership the moment of delivery. However, recording provides constructive notice to the world, establishes priority against later claims, and is essential for protecting the buyer's interest against subsequent purchasers or lienholders. Title insurance is still useful because recording cannot protect against fraud, undisclosed heirs, or hidden defects."},

  # 41 Transfer ca:0
  {"id":"re-nat-41","domain":"Transfer of Title","type":"single-choice",
   "question":"Which of the following is NOT a required element of a valid deed?",
   "choices":[
     "Recording at the county recorder's office",
     "Identification of the grantor and grantee",
     "Words of conveyance (granting clause)",
     "An adequate legal description of the property"
   ],"correctAnswer":0,
   "explanation":"Recording is for notice and priority, not validity. The classic essentials of a valid deed are: competent grantor, identifiable grantee, words of conveyance (granting clause), adequate property description, consideration (often nominal — 'love and affection' suffices), signature of the grantor, and proper delivery and acceptance. Notarization and recording are required for recording but are not validity requirements."},

  # ── Valuation and Market Analysis (3 questions) ────────────────────────
  # 42 Valuation ca:1
  {"id":"re-nat-42","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"An appraiser is valuing a single-family residence in a stable suburban neighborhood with many recent sales of similar homes. Which approach to value is typically given the most weight?",
   "choices":[
     "Cost approach",
     "Sales comparison (market data) approach",
     "Income approach",
     "Gross rent multiplier approach"
   ],"correctAnswer":1,
   "explanation":"The sales comparison approach is the primary approach for owner-occupied residential property when comparable sales exist. The cost approach is most useful for new construction or special-purpose buildings; the income approach is the primary method for income-producing investment property. For a typical single-family home in an active market, sales comparison gets the most weight in the appraiser's final reconciliation."},

  # 43 Valuation ca:2
  {"id":"re-nat-43","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"The cost approach to valuation is most useful for:",
   "choices":[
     "Income-producing apartment buildings",
     "Vacant residential lots",
     "Special-purpose properties such as schools, churches, and government buildings where comparable sales are rare",
     "Single-family homes in active resale markets"
   ],"correctAnswer":2,
   "explanation":"The cost approach (land + replacement cost − depreciation) is most useful when there are few comparable sales — special-purpose properties (schools, churches, libraries, government buildings) and new construction. The income approach dominates for investment property, and sales comparison dominates for typical residential resale."},

  # 44 Valuation ca:3
  {"id":"re-nat-44","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"Which economic principle holds that a property's value is maximized when it is used in its most productive legal and physically possible way?",
   "choices":[
     "Substitution",
     "Conformity",
     "Anticipation",
     "Highest and best use"
   ],"correctAnswer":3,
   "explanation":"Highest and best use is the use that is legally permissible, physically possible, financially feasible, and maximally productive. Appraisals begin with a highest-and-best-use analysis because a property's value depends on its potential, not just current use. Substitution underlies the sales comparison approach; conformity addresses neighborhood compatibility; anticipation reflects the present worth of expected future benefits."},

  # ── Property Disclosures (3 questions) ─────────────────────────────────
  # 45 Disclosures ca:0
  {"id":"re-nat-45","domain":"Property Disclosures","type":"single-choice",
   "question":"Under the federal Residential Lead-Based Paint Hazard Reduction Act (Title X), sellers of residential property built BEFORE 1978 must:",
   "choices":[
     "Provide the buyer with a lead-based paint disclosure, an EPA-approved pamphlet, and (unless waived) a 10-day inspection period",
     "Remove all lead-based paint at the seller's expense before closing",
     "Install lead-safe coatings on all painted surfaces in the home",
     "Pay for the buyer's lead-exposure medical testing"
   ],"correctAnswer":0,
   "explanation":"Title X imposes disclosure (not abatement) obligations. The seller must disclose known lead-based paint and hazards, provide the EPA pamphlet 'Protect Your Family from Lead in Your Home,' and offer a 10-day period for the buyer to conduct a lead inspection (the buyer may waive). The act applies to most pre-1978 residential housing. There is no federal obligation to abate or remove the lead."},

  # 46 Disclosures ca:1
  {"id":"re-nat-46","domain":"Property Disclosures","type":"single-choice",
   "question":"A buyer asks an agent whether anyone has ever died in a house. The state has a statute classifying a non-violent death (unrelated to a property condition) as a NON-material fact that need not be voluntarily disclosed. The agent's best response is:",
   "choices":[
     "Affirmatively state that no one has died there (regardless of the facts)",
     "Decline to disclose, citing the state's non-material-fact statute",
     "Disclose every detail of any prior occupant's death",
     "Refuse to represent the buyer further"
   ],"correctAnswer":1,
   "explanation":"Where the state classifies a fact as non-material (and therefore not subject to disclosure), the agent need not volunteer it. The agent should never lie — affirmatively misstating a fact opens the agent to misrepresentation liability even if the fact is non-material. The correct approach is to politely decline to disclose, often citing the controlling statute or recommending the buyer consult their own resources."},

  # 47 Disclosures ca:2
  {"id":"re-nat-47","domain":"Property Disclosures","type":"single-choice",
   "question":"A 'material defect' that a seller is generally required to disclose is best described as:",
   "choices":[
     "Any cosmetic imperfection on the property",
     "An issue the seller suspects but has not confirmed",
     "A condition known to the seller that substantially affects the value or desirability of the property",
     "Any item not mentioned in the multiple listing service"
   ],"correctAnswer":2,
   "explanation":"A material defect is typically defined as a known condition that would substantially affect the value or desirability of the property — for example, an active roof leak, a structural problem, or a hazardous environmental condition. Cosmetic issues, unverified suspicions, and MLS omissions do not by themselves meet this standard."},

  # ── Land Use Controls and Regulations (2 questions) ────────────────────
  # 48 Land Use ca:3
  {"id":"re-nat-48","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"A homeowner wants to build a detached garage that would be 2 feet closer to the side property line than the zoning ordinance permits. The owner should typically request:",
   "choices":[
     "A conditional use permit",
     "A non-conforming use designation",
     "A rezoning of the entire lot",
     "A variance"
   ],"correctAnswer":3,
   "explanation":"A variance is the proper relief for a property owner who needs to deviate from a specific zoning requirement (e.g., setback, height, lot coverage) due to a hardship unique to the property. A conditional use permit allows a specific use within a zone where it isn't permitted by right (e.g., a church in a residential zone). A non-conforming use is grandfathered existing use that doesn't comply with current zoning. Rezoning changes the underlying zone classification entirely — a much heavier process."},

  # 49 Land Use ca:0
  {"id":"re-nat-49","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"The government's power to take private property for public use, upon payment of just compensation, is called:",
   "choices":[
     "Eminent domain",
     "Escheat",
     "Police power",
     "Taxation"
   ],"correctAnswer":0,
   "explanation":"The four government powers over real estate are often remembered as PETE: Police power (regulate for health/safety/welfare — e.g., zoning), Eminent domain (take for public use with compensation), Taxation, and Escheat (property reverts to the state when an owner dies without heirs or a will). Eminent domain is the only one of the four that requires just compensation by the constitution."},

  # ── Leasing and Property Management (1 question) ───────────────────────
  # 50 Leasing ca:1
  {"id":"re-nat-50","domain":"Leasing and Property Management","type":"single-choice",
   "question":"Which lease type generally REQUIRES the LANDLORD to pay all of the property's operating expenses — taxes, insurance, and maintenance — out of the rent collected?",
   "choices":[
     "Net lease",
     "Gross lease (sometimes called a full-service lease)",
     "Percentage lease",
     "Triple net (NNN) lease"
   ],"correctAnswer":1,
   "explanation":"Under a gross (or full-service) lease, the tenant pays a flat rent and the landlord covers operating expenses. Net leases push some expenses to the tenant (single net = property tax, double net = + insurance, triple net = + maintenance). Percentage leases — common in retail — charge a base rent plus a percentage of the tenant's gross sales."},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
