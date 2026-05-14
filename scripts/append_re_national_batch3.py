"""Real Estate National batch 3 — questions 101-150."""
import json, pathlib

Q = pathlib.Path("src/data/real-estate-national-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── Contracts (9) ───────────────────────────────────────────────────────
  {"id":"re-nat-101","domain":"Contracts","type":"single-choice",
   "question":"A buyer makes an offer and the seller responds: 'I accept your offer, but with the closing date moved to 60 days instead of 30.' This response is legally:",
   "choices":["A counteroffer — operates as a rejection of the original offer and a new offer to the buyer","An acceptance — binding on both parties","A unilateral modification of the contract","An invitation to negotiate, not legally significant"],
   "correctAnswer":0,
   "explanation":"Under the 'mirror image rule,' any material variation in the terms of a purported acceptance turns the response into a counteroffer. A counteroffer rejects the original offer (which then dies) and constitutes a new offer to the original offeror, who may now accept, reject, or counter in turn."},

  {"id":"re-nat-102","domain":"Contracts","type":"single-choice",
   "question":"A buyer breaches a purchase contract by failing to close without legal excuse. Absent a liquidated damages clause, the seller's typical remedies include all of the following EXCEPT:",
   "choices":["Suing for actual damages (e.g., difference between contract price and eventual resale price)","Forcing the buyer to take out a new loan and complete the purchase","Suing for specific performance to compel the buyer to perform","Retaining the earnest money deposit as agreed"],
   "correctAnswer":1,
   "explanation":"A seller cannot literally force a buyer to obtain new financing — courts will not order a borrower into a loan with a third-party lender. Available remedies include actual damages, specific performance (rare against a buyer because money damages are usually adequate), and retention of earnest money. Most modern residential contracts cap the seller's remedies via a liquidated damages clause."},

  {"id":"re-nat-103","domain":"Contracts","type":"single-choice",
   "question":"A buyer's earnest money is held in the listing broker's trust account. The buyer defaults under a contract that provides for the seller to retain earnest money as liquidated damages. The broker should:",
   "choices":["Apply the funds to the broker's commission immediately","Refund the funds to the buyer regardless of the contract","Release the funds only upon written agreement of both parties (or by court order if they disagree)","Keep the funds as compensation for time spent"],
   "correctAnswer":2,
   "explanation":"Disputed earnest money should never be unilaterally released by the broker. Most jurisdictions require written authorization from BOTH parties (or a court order) before earnest money is disbursed when there is any dispute. Brokers may also be permitted to interplead the funds — depositing them with the court so a judge can determine the rightful recipient — to avoid liability."},

  {"id":"re-nat-104","domain":"Contracts","type":"single-choice",
   "question":"A seller cannot attend the closing in person. To allow another person to sign the deed and closing documents on the seller's behalf, the seller must execute:",
   "choices":["A quitclaim deed","A general warranty deed","An assignment","A power of attorney (specifically, one authorizing real estate transactions)"],
   "correctAnswer":3,
   "explanation":"A power of attorney is a legal instrument by which a principal authorizes another person (the attorney-in-fact) to act on their behalf. Real estate transactions typically require a specific power of attorney (sometimes called a 'limited' or 'special' POA) that expressly authorizes the conveyance of the particular property. The POA must comply with state recording requirements and be in force at the time of execution."},

  {"id":"re-nat-105","domain":"Contracts","type":"single-choice",
   "question":"At the moment a valid purchase contract is signed by both parties, the buyer obtains an EQUITABLE interest in the property, even though legal title remains with the seller until closing. This doctrine is called:",
   "choices":["Equitable conversion","Adverse possession","Marketable title doctrine","Estoppel by deed"],
   "correctAnswer":0,
   "explanation":"Equitable conversion treats the buyer as the equitable owner of the property from the moment a valid contract is signed (legal title remains with the seller until closing). It has practical implications for risk of loss (in some states, the buyer bears the risk of loss between contract and closing) and for inheritance if a party dies before closing. The Uniform Vendor and Purchaser Risk Act shifts risk of loss in states that have adopted it."},

  {"id":"re-nat-106","domain":"Contracts","type":"single-choice",
   "question":"A typical residential purchase contract requires the seller to convey 'marketable title' at closing. Marketable title generally means:",
   "choices":["Title that is perfect and free of even minor technical defects","Title that is reasonably free of doubt — such that a reasonable buyer, informed and advised, would accept it; not necessarily perfect","Title insured by a specific company","Title that has never changed hands"],
   "correctAnswer":1,
   "explanation":"Marketable title is title that is reasonably free of substantial defects, encumbrances, or doubts — such that a reasonable, informed buyer would accept it without litigation risk. It need not be 'perfect.' Common defects that would render title unmarketable include undisclosed liens, breaks in the chain of title, encroachments, or unreleased prior mortgages."},

  {"id":"re-nat-107","domain":"Contracts","type":"single-choice",
   "question":"A residential purchase contract contains an 'as is' clause. The effect of this clause on the seller's disclosure obligations is:",
   "choices":["The seller is fully relieved of any disclosure duty regardless of state law","'As is' clauses are universally unenforceable","'As is' typically waives the seller's affirmative repair obligation but does NOT excuse fraud, intentional misrepresentation, or required statutory disclosures","'As is' applies only to commercial property"],
   "correctAnswer":2,
   "explanation":"'As is' clauses typically mean the seller will not be responsible for repairs and the buyer accepts the property in its current condition. However, 'as is' does NOT excuse the seller from disclosing known material defects, comply with required statutory disclosures (such as the federal Title X lead-based paint disclosure), or shield the seller from fraud or intentional misrepresentation."},

  {"id":"re-nat-108","domain":"Contracts","type":"single-choice",
   "question":"Both buyer and seller agree, in writing, that they no longer wish to proceed with their executed purchase contract. They sign a document terminating the contract. This is:",
   "choices":["A novation","Reformation","Specific performance","Mutual rescission (also called mutual release)"],
   "correctAnswer":3,
   "explanation":"Mutual rescission (or mutual release) is the voluntary cancellation of a contract by all parties, restoring them to their pre-contract positions. It requires consent of all parties and is generally documented in writing for real estate contracts. Earnest money disposition is typically addressed in the rescission document."},

  {"id":"re-nat-109","domain":"Contracts","type":"single-choice",
   "question":"For an acceptance to be effective in a real estate transaction, it generally must be:",
   "choices":["Communicated to the offeror, unconditional, in the manner specified by the offer (or otherwise reasonable), and within any specified time limit","Made within 24 hours of the offer","Witnessed by a third party","Notarized at the time of acceptance"],
   "correctAnswer":0,
   "explanation":"An effective acceptance must be: communicated to the offeror, unconditional (any variation makes it a counteroffer under the mirror image rule), in the manner specified by the offer or otherwise reasonable, and within the time specified (or otherwise reasonable). The 'mailbox rule' that exists in some contract contexts is generally NOT applied to real estate — acceptance is typically effective on receipt, not dispatch."},

  # ── General Principles of Agency (7) ────────────────────────────────────
  {"id":"re-nat-110","domain":"General Principles of Agency","type":"single-choice",
   "question":"A valid listing agreement must generally include all of the following EXCEPT:",
   "choices":["The agent's social security number","A description of the property","The listing price (or instructions for determining one)","A definite expiration date in most states"],
   "correctAnswer":0,
   "explanation":"State-required elements of a listing agreement typically include: identification of the parties, description of the property, listing price (or formula), commission rate or amount, definite term (most states prohibit indefinite listings), and the parties' signatures. The agent's social security number is not required. Many states also require a definite expiration date to prevent indefinite or 'forever' listings."},

  {"id":"re-nat-111","domain":"General Principles of Agency","type":"single-choice",
   "question":"Two agents both worked with a buyer who ultimately purchased a property. Each claims a commission. To determine which agent is entitled to the commission, the deciding doctrine is:",
   "choices":["The first agent to show the property always wins","Procuring cause — the agent whose efforts were the proximate, originating cause of the eventual purchase","Whoever signed the listing first","The agent who first received an earnest money check"],
   "correctAnswer":1,
   "explanation":"The procuring cause doctrine awards commission to the agent whose efforts were the originating, continuing, and proximate cause of the buyer's eventual purchase — not necessarily the first or last agent to show the property. Disputes are commonly resolved through arbitration under the National Association of Realtors' Code of Ethics."},

  {"id":"re-nat-112","domain":"General Principles of Agency","type":"single-choice",
   "question":"A listing agreement may be terminated by all of the following EXCEPT:",
   "choices":["Expiration of its definite term","Mutual agreement of the parties","Abandonment by the broker (with potential damages exposure to the broker)","An act of God that affects nearby properties but NOT the subject property"],
   "correctAnswer":3,
   "explanation":"A listing terminates by expiration, mutual agreement, performance (sale), destruction of the subject property, death or incapacity of either party, bankruptcy of the principal, or unilateral revocation (with potential damages for breach). An act of God affecting only neighboring properties does not directly terminate the listing on the subject property — unless it somehow renders the subject property unmarketable."},

  {"id":"re-nat-113","domain":"General Principles of Agency","type":"single-choice",
   "question":"A real estate salesperson is typically classified as which of the following with respect to their broker?",
   "choices":["An independent contractor in most states and for most tax purposes, despite the brokerage's right to supervise their licensed activities","A common-law employee with full payroll tax withholding","A partner in the brokerage","An unsupervised free agent"],
   "correctAnswer":0,
   "explanation":"Real estate salespersons are typically classified as independent contractors for federal tax purposes (subject to a 'statutory non-employee' safe harbor under IRC §3508 — if specified conditions are met). Despite the IC classification for tax purposes, state real estate law still requires the broker to supervise the salesperson's licensed activities and bear responsibility for the salesperson's conduct."},

  {"id":"re-nat-114","domain":"General Principles of Agency","type":"single-choice",
   "question":"Under a 'net listing,' a broker agrees with a seller to retain everything over a stated net amount as commission. In most states, this type of listing is:",
   "choices":["The most common form of listing","Illegal or heavily restricted because of obvious conflict-of-interest concerns","Required by federal law","Limited to commercial transactions only"],
   "correctAnswer":1,
   "explanation":"Net listings are illegal or heavily restricted in many states (and discouraged in the rest) because of the obvious conflict of interest: the broker has an incentive to obtain the highest price possible — not necessarily to fulfill fiduciary duties to the seller — and to misrepresent the property's value. Where allowed, they typically come with significant additional disclosure requirements."},

  {"id":"re-nat-115","domain":"General Principles of Agency","type":"single-choice",
   "question":"In states that recognize them, a 'transaction broker' (sometimes called a facilitator or non-agency intermediary):",
   "choices":["Always represents the seller","Always represents the buyer","Does not establish a fiduciary agency relationship with either party — instead facilitates the transaction with limited duties (honesty, fair dealing, disclosure of material facts)","Cannot collect compensation"],
   "correctAnswer":2,
   "explanation":"A transaction broker (where recognized by state law) does not enter a fiduciary agency relationship with either party. The broker facilitates the transaction with limited duties — typically honesty, fair dealing, accounting for funds, and disclosure of material facts known to them. The arrangement avoids the dual-agency conflict but provides less protection than full agency representation."},

  {"id":"re-nat-116","domain":"General Principles of Agency","type":"single-choice",
   "question":"A property under listing burns down completely in a fire one week before its scheduled closing. With respect to the listing agreement:",
   "choices":["The broker may sue to collect the full commission as if closing had occurred","The listing simply transfers to the rebuilt property","The seller must keep paying the broker until the listing expires","The listing is terminated by destruction of the subject property"],
   "correctAnswer":3,
   "explanation":"Destruction of the subject property terminates the agency relationship by operation of law — the agency had no continuing subject matter. The seller's broker generally cannot collect a commission for a sale that did not occur because of the destruction. The purchase contract itself may be subject to the doctrine of equitable conversion or the Uniform Vendor and Purchaser Risk Act, depending on the state."},

  # ── Practice of Real Estate (7) ─────────────────────────────────────────
  {"id":"re-nat-117","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Under the Americans with Disabilities Act (ADA), commercial real estate owners are generally required to:",
   "choices":["Make public accommodations and commercial facilities accessible to persons with disabilities (including reasonable barrier removal where readily achievable)","Provide free housing to disabled tenants","Pay for all medical expenses of disabled patrons","Use only disabled contractors"],
   "correctAnswer":0,
   "explanation":"Title III of the ADA prohibits discrimination on the basis of disability in places of public accommodation and commercial facilities — requiring barrier removal where 'readily achievable,' accessible new construction, and reasonable modifications to policies and practices. Residential housing is generally covered by the federal Fair Housing Act's disability provisions rather than the ADA, though common areas of multi-family buildings can be subject to both."},

  {"id":"re-nat-118","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The Fair Housing Act's protection of 'familial status' generally prohibits:",
   "choices":["Discrimination based on whether a family has any children at all","Discrimination against families with children under 18 in housing decisions, with limited exceptions for certain housing for older persons","Discrimination based on number of pets owned","Discrimination based on income source"],
   "correctAnswer":1,
   "explanation":"Familial status protections prohibit discrimination against families with children under 18 (and against pregnant women and persons in the process of securing custody of a minor). The principal exception is the 'housing for older persons' exemption (HOPA), which allows 55-and-older or 62-and-older communities meeting specific criteria. There is no federal protection based on source of income, though some state/local laws add it."},

  {"id":"re-nat-119","domain":"Practice of Real Estate","type":"single-choice",
   "question":"A tenant requests an exception to a 'no pets' policy for an emotional support animal supported by a verifiable note from a licensed professional. Under the federal Fair Housing Act, the landlord generally must:",
   "choices":["Refuse — pet policies override fair housing rules","Charge an extra pet deposit","Make a reasonable accommodation by waiving the no-pets policy for the verified assistance animal, without charging a pet deposit","Require veterinary records before considering the request"],
   "correctAnswer":2,
   "explanation":"Under the Fair Housing Act, persons with disabilities are entitled to reasonable accommodations — including waivers of 'no pets' policies for assistance animals (service animals and emotional support animals). Landlords generally cannot charge pet fees or deposits for these animals, though they may seek damages for actual harm caused. HUD guidance from 2020 lays out the verification process."},

  {"id":"re-nat-120","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The 'Mrs. Murphy' exemption to the federal Fair Housing Act generally exempts:",
   "choices":["All single-family rentals","Buildings with more than 20 units","Commercial property only","Owner-occupied dwellings with no more than FOUR units, when the owner rents directly without using a broker and without discriminatory advertising"],
   "correctAnswer":3,
   "explanation":"The 'Mrs. Murphy' exemption (named after a hypothetical landlady) exempts certain owner-occupied small rental properties from most provisions of the federal Fair Housing Act — specifically: owner-occupied buildings with 4 or fewer rental units, when the owner rents WITHOUT a broker AND WITHOUT publishing discriminatory advertising. The exemption does NOT apply to advertising or to racial discrimination claims under 42 U.S.C. §1982, which has no exemptions."},

  {"id":"re-nat-121","domain":"Practice of Real Estate","type":"single-choice",
   "question":"An individual who believes they have been a victim of housing discrimination under the federal Fair Housing Act may:",
   "choices":["File a complaint with HUD within one year of the discriminatory act, or file a private civil suit within two years","File only with the state real estate commission","File only in federal court within 90 days","Not pursue any remedy — only HUD may file suit"],
   "correctAnswer":0,
   "explanation":"Complainants may file with HUD within ONE year of the discriminatory act. HUD investigates, attempts conciliation, and may bring a formal charge. Separately, complainants may file a private civil lawsuit in federal or state court within TWO years of the act, regardless of whether they also filed with HUD. The Department of Justice may also bring 'pattern or practice' suits."},

  {"id":"re-nat-122","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Two competing brokerages agree to divide their service areas — Brokerage A will handle only the north side of town, Brokerage B will handle only the south side. This practice is:",
   "choices":["Permitted as a business efficiency","A per se violation of antitrust law (horizontal market allocation)","Required by NAR Code of Ethics","Permitted if both parties agree in writing"],
   "correctAnswer":1,
   "explanation":"Horizontal market allocation — competitors agreeing to divide markets by geography, customer type, or product — is a per se violation of the Sherman Antitrust Act. Like price fixing, it requires no inquiry into reasonableness or actual harm. Each brokerage must independently decide which areas to serve."},

  {"id":"re-nat-123","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Several brokerages collectively agree NOT to work with a particular competitor or to refuse cooperative compensation when that competitor is involved. This is:",
   "choices":["Free market competition","Permitted under the National Association of Realtors' Code","A group boycott — a per se violation of antitrust law","Required by ethical practice"],
   "correctAnswer":2,
   "explanation":"A group boycott — concerted refusal to deal — is a per se violation of the Sherman Antitrust Act. Real estate brokerages cannot collectively decide to refuse to work with a particular competitor (such as a discount broker, for example). Individual brokerages may unilaterally decide whom to work with, but coordinated refusals are illegal."},

  # ── Financing (5) ───────────────────────────────────────────────────────
  {"id":"re-nat-124","domain":"Financing","type":"single-choice",
   "question":"An Adjustable Rate Mortgage (ARM) typically features:",
   "choices":["A permanently fixed interest rate","Government insurance from the FHA","Payment of interest only with no amortization","An initial fixed-rate period followed by periodic adjustments to the interest rate based on an index plus a margin, with caps on adjustments and over the life of the loan"],
   "correctAnswer":3,
   "explanation":"ARMs typically include an initial fixed-rate period (e.g., the '5' in a 5/1 ARM means 5 years fixed), then periodic adjustments (the '1' means annual) based on an index (such as SOFR) plus a margin (the lender's spread). Adjustments are constrained by interest rate caps — typically a periodic cap (per adjustment), a lifetime cap (over the loan's life), and sometimes an initial cap (first adjustment)."},

  {"id":"re-nat-125","domain":"Financing","type":"single-choice",
   "question":"In a fully amortizing mortgage:",
   "choices":["Each periodic payment includes principal AND interest, and the loan balance reaches zero by the end of the term","Only interest is paid — no principal","The entire principal is due in a single balloon payment at the end","Payments increase steadily over the loan term"],
   "correctAnswer":0,
   "explanation":"Amortization is the systematic reduction of debt over time through scheduled payments that include both principal and interest. In a fully amortizing loan, the payment schedule is set so that the loan is fully paid off by the end of the term. Early payments are mostly interest; later payments are mostly principal — the balance steadily decreases."},

  {"id":"re-nat-126","domain":"Financing","type":"single-choice",
   "question":"A 'loan origination fee' charged by the lender is:",
   "choices":["Insurance premium charged to the borrower","A one-time fee, typically 0.5%-1% of the loan amount, charged by the lender for processing and underwriting a new loan","The lender's monthly profit","A penalty for early repayment"],
   "correctAnswer":1,
   "explanation":"A loan origination fee compensates the lender for processing, underwriting, and funding a new mortgage. It is typically expressed as a percentage of the loan amount (often 0.5%-1%) and is part of the APR calculation under TILA. It differs from discount points (which buy down the interest rate) and from other lender fees that may be itemized separately."},

  {"id":"re-nat-127","domain":"Financing","type":"single-choice",
   "question":"A 'discount point' on a mortgage:",
   "choices":["Reduces the borrower's credit score","Acts as the lender's profit margin and cannot be financed","Equals 1% of the loan amount, paid up front to the lender, in exchange for a reduced interest rate on the loan","Is the same as a loan origination fee"],
   "correctAnswer":2,
   "explanation":"A discount point equals 1% of the loan amount, paid at closing in exchange for a lower interest rate over the life of the loan. Buying down the rate can make sense for borrowers who plan to hold the loan long enough to recoup the up-front cost through interest savings (the 'break-even point'). Discount points differ from origination fees (which cover lender processing) and are deductible on a primary residence mortgage subject to IRS rules."},

  {"id":"re-nat-128","domain":"Financing","type":"single-choice",
   "question":"A seller offers a 'temporary buy-down' on a mortgage — for example, a 2-1 buy-down. This means:",
   "choices":["The buyer's down payment is reduced","The interest rate is permanently lowered by 3%","The mortgage is converted to an ARM","The interest rate is reduced by 2% in year one and 1% in year two, then returns to the note rate from year three forward — financed by an upfront seller credit held in escrow"],
   "correctAnswer":3,
   "explanation":"A 2-1 buy-down temporarily lowers the borrower's effective interest rate by 2 percentage points in year one and 1 percentage point in year two, then the rate returns to the original note rate in year three and beyond. The cost is typically funded by the seller via a closing credit held in escrow, and the borrower must qualify for the loan at the note rate — not the bought-down rate."},

  # ── Real Estate Calculations (5) ────────────────────────────────────────
  {"id":"re-nat-129","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A property has an assessed value of $200,000. The tax rate (mill rate) is 25 mills. What is the annual property tax? (1 mill = $1 per $1,000 of assessed value, i.e., 0.001)",
   "choices":["$5,000","$500","$2,000","$50,000"],
   "correctAnswer":0,
   "explanation":"Step 1 — convert mills to decimal: 25 mills = 25/1000 = 0.025 (or 25 ÷ 1000).\nStep 2 — Tax = Assessed Value × Tax Rate.\nStep 3 — Apply: $200,000 × 0.025 = $5,000.\nAlternative method: $200,000 ÷ 1,000 = 200 (thousands of dollars), × 25 (mills) = $5,000.\nMills are a unit of property tax — 1 mill is one-tenth of one cent per dollar, or $1 per $1,000."},

  {"id":"re-nat-130","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A property sells. The total commission of $15,000 represents 6% of the sale price. What was the sale price?",
   "choices":["$200,000","$250,000","$300,000","$2,500,000"],
   "correctAnswer":1,
   "explanation":"Step 1 — Commission = Sale Price × Commission Rate.\nStep 2 — Solve for Sale Price: Sale Price = Commission ÷ Commission Rate.\nStep 3 — Apply: $15,000 ÷ 0.06 = $250,000.\nQuick check: 6% of $250,000 = 0.06 × $250,000 = $15,000 ✓"},

  {"id":"re-nat-131","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A buyer takes out a $250,000 mortgage and pays 2 discount points at closing. How much do the discount points cost?",
   "choices":["$2,500","$3,750","$5,000","$25,000"],
   "correctAnswer":2,
   "explanation":"Step 1 — 1 discount point = 1% of the loan amount = $250,000 × 0.01 = $2,500.\nStep 2 — 2 points = 2 × $2,500 = $5,000.\nDiscount points are paid up front at closing in exchange for a reduced interest rate on the loan (typically about 0.25 percentage points off the rate per point, though it varies)."},

  {"id":"re-nat-132","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A seller wants to NET $300,000 from the sale of their property after paying a 6% commission. Ignoring other closing costs, what gross sale price must the property fetch?",
   "choices":["$306,000","$318,000","$315,000","$319,148.94 (approximately $319,149)"],
   "correctAnswer":3,
   "explanation":"Step 1 — Sale price (P) minus commission (6% × P) must equal $300,000.\nStep 2 — Set up: P − 0.06P = $300,000, or 0.94P = $300,000.\nStep 3 — Solve: P = $300,000 ÷ 0.94 = $319,148.94 (round to $319,149).\nVerify: 6% of $319,148.94 = $19,148.94. $319,148.94 − $19,148.94 = $300,000.00 ✓\nA common error is computing $300,000 × 1.06 = $318,000 — but that's wrong because 6% is taken from the GROSS price, not added to the net."},

  {"id":"re-nat-133","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An investor finds a property selling for $500,000. The investor's required capitalization rate is 8%. What is the minimum Net Operating Income (NOI) the property must generate to justify the price?",
   "choices":["$40,000","$5,000","$62,500","$80,000"],
   "correctAnswer":0,
   "explanation":"Step 1 — IRV formula rearranged: Income = Value × Rate (I = V × R).\nStep 2 — Apply: $500,000 × 0.08 = $40,000.\nVerify: at 8% cap rate, $40,000 NOI / 0.08 = $500,000 value ✓\nThis is the inverse of the cap-rate-to-value calculation — given the price and required cap rate, what NOI justifies the purchase."},

  # ── Property Ownership (4) ──────────────────────────────────────────────
  {"id":"re-nat-134","domain":"Property Ownership","type":"single-choice",
   "question":"A property abuts a non-navigable river. The owner's rights in the water are called:",
   "choices":["Littoral rights","Riparian rights — rights of an owner adjacent to a flowing watercourse (river or stream)","Air rights","Subjacent rights"],
   "correctAnswer":1,
   "explanation":"Riparian rights belong to owners of land adjacent to flowing watercourses (rivers and streams). Littoral rights belong to owners of land adjacent to standing water (oceans, large lakes). The scope of these rights varies by state — eastern states tend to use 'riparian doctrine' allowing reasonable use; western states often use 'prior appropriation' giving rights to whoever first put the water to beneficial use."},

  {"id":"re-nat-135","domain":"Property Ownership","type":"single-choice",
   "question":"A property abuts the Atlantic Ocean. The owner's rights in the adjoining water are called:",
   "choices":["Riparian rights","Air rights","Littoral rights — rights of an owner adjacent to standing water (oceans, large lakes)","Mineral rights"],
   "correctAnswer":2,
   "explanation":"Littoral rights belong to owners adjacent to standing or tidal water (oceans, large lakes). Riparian rights belong to owners adjacent to flowing watercourses (rivers and streams). Both types of water rights are subject to public trust doctrine — the government owns the water and the land below the navigable mark in trust for the public — and to state regulation."},

  {"id":"re-nat-136","domain":"Property Ownership","type":"single-choice",
   "question":"The traditional common-law concept of property ownership extending 'from the heavens to the depths of the earth' has been substantially modified by:",
   "choices":["Repeal of all property rights above ground","Federal eminent domain of all subsurface space","Modern aviation, telecommunications, mining, and energy regulations — owners retain rights only to the extent they can reasonably use the airspace and subsurface","Privatization of the atmosphere"],
   "correctAnswer":2,
   "explanation":"The classic 'cujus est solum, ejus est usque ad coelum et ad inferos' (he who owns the soil owns from the heavens to the depths) has been substantially modified by modern law. Owners retain rights to airspace and subsurface only to the extent they can reasonably USE them. Federal aviation regulations claim navigable airspace as a public highway; mineral rights can be severed and sold separately; some states reserve subsurface rights to the government."},

  {"id":"re-nat-137","domain":"Property Ownership","type":"single-choice",
   "question":"Lateral and subjacent support rights protect a property owner from:",
   "choices":["Adjacent or below-ground excavation by neighbors (or others) that causes the owner's land to subside or collapse","Trespass by visitors","Loss of solar access","Noise from neighbors"],
   "correctAnswer":0,
   "explanation":"Lateral support is the right to have one's land supported by adjacent land in its natural state. Subjacent support is the right to have one's land supported from below (relevant where subsurface rights have been severed, e.g., mining). A neighbor's excavation that causes the owner's land to subside is a violation of lateral support; below-ground mining that causes the surface to collapse violates subjacent support. Liability is often strict for natural-state harm and negligence-based for harm caused by structures."},

  # ── Transfer of Title (4) ───────────────────────────────────────────────
  {"id":"re-nat-138","domain":"Transfer of Title","type":"single-choice",
   "question":"A buyer obtains lender's title insurance (required by the lender) but is unsure whether to also buy an owner's policy. The key difference is:",
   "choices":["Lender's title insurance protects the lender only and exists for the duration of the loan; owner's title insurance protects the owner and remains in force for as long as the owner (or their heirs) own the property","Lender's title insurance and owner's title insurance cover identical parties","Owner's title insurance is required by law in every state","Lender's policies cover environmental contamination"],
   "correctAnswer":0,
   "explanation":"Lender's (or mortgagee's) title insurance protects ONLY the lender for the amount of the outstanding loan. It exists for the life of the loan and reduces as the loan is paid down. Owner's title insurance protects the BUYER for the purchase price (or sometimes more) and remains in force for as long as the owner or their heirs own the property — protecting against title defects that surface years after closing."},

  {"id":"re-nat-139","domain":"Transfer of Title","type":"single-choice",
   "question":"A person openly, notoriously, continuously, and exclusively occupies another's land for the full statutory period required by state law (often 5-20 years), without the owner's permission. The occupier may gain title through:",
   "choices":["Estoppel","Adverse possession","Eminent domain","Escheat"],
   "correctAnswer":1,
   "explanation":"Adverse possession allows a non-owner to gain legal title through long, open, notorious, continuous, exclusive, and hostile (without permission) possession of another's land for the statutory period. The exact elements and timeframe vary by state. Adverse possession is sometimes called 'squatters' rights,' though the doctrine requires meeting strict legal elements — mere occupation is not enough."},

  {"id":"re-nat-140","domain":"Transfer of Title","type":"single-choice",
   "question":"During the period between contract signing and closing, the title insurance company issues a document showing the current state of title and listing the exceptions (defects, encumbrances, requirements) that must be addressed before final policy issuance. This document is called:",
   "choices":["A deed","A purchase contract","Closing disclosure","A title commitment (also called a title binder or preliminary title report)"],
   "correctAnswer":3,
   "explanation":"A title commitment (or title binder or preliminary title report — naming varies by region) is the title company's promise to issue a title policy at closing, subject to the listed exceptions and requirements being addressed. Buyers and their attorneys review the commitment to identify defects (e.g., unreleased mortgages, easements, judgments) that need to be cleared before closing."},

  {"id":"re-nat-141","domain":"Transfer of Title","type":"single-choice",
   "question":"The unbroken sequence of recorded conveyances from the property's earliest legal owner to the current owner is called:",
   "choices":["The chain of title","The deed of trust","The abstract","The grantor index"],
   "correctAnswer":0,
   "explanation":"The chain of title is the unbroken sequence of recorded conveyances showing how title has passed from the property's earliest legal owner to the current owner. Gaps in the chain can render title unmarketable. The abstract of title is a summary document compiling the chain of title and other relevant records; the grantor/grantee indexes are public-record search tools."},

  # ── Valuation and Market Analysis (3) ───────────────────────────────────
  {"id":"re-nat-142","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"In the sales comparison approach, when a comparable property has a feature SUPERIOR to the subject (e.g., a finished basement that the subject lacks), the appraiser typically:",
   "choices":["Adjusts the subject upward to match the comparable","Adjusts the comparable DOWNWARD to reflect what the comparable would have sold for without the superior feature","Disregards the comparable","Adjusts both upward"],
   "correctAnswer":1,
   "explanation":"In comparable adjustments, ADJUSTMENTS ARE MADE TO THE COMPARABLE, not the subject. If a comp is SUPERIOR (has something the subject doesn't), the comp is adjusted DOWNWARD — the appraiser asks, 'what would this comp have sold for without that superior feature?' If a comp is INFERIOR, it is adjusted UPWARD. Remember: 'CIA' — Comp Inferior, Add (and the reverse for superior comps)."},

  {"id":"re-nat-143","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"After applying the three approaches to value (sales comparison, cost, income), an appraiser arrives at three different value indicators. The process of weighing these and arriving at a final value opinion is called:",
   "choices":["Reproduction","Averaging the three values","Reconciliation","Substitution"],
   "correctAnswer":2,
   "explanation":"Reconciliation is the appraiser's process of evaluating the relative reliability of each approach to value for the subject property, weighting the indicators accordingly, and arriving at a final value opinion. The appraiser does NOT simply average the three numbers — for a single-family home, the sales comparison approach would typically receive the most weight; for an investment property, the income approach; for a special-purpose building, the cost approach."},

  {"id":"re-nat-144","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"A real estate investor analyzing whether to buy a property for personal investment goals (specific cap-rate hurdle, tax situation, risk tolerance) may arrive at a value DIFFERENT from market value. This personal valuation is called:",
   "choices":["Assessed value","Liquidation value","Insurable value","Investment value — the value of a property to a specific investor based on their particular requirements"],
   "correctAnswer":3,
   "explanation":"Investment value (sometimes called 'value in use') is the value of a property to a specific investor based on their particular financial requirements, tax situation, and investment criteria. It can differ from market value (what a typical buyer would pay). Investment value is most often used when the investor has unique synergies (e.g., the buyer next door who can combine parcels) or specific underwriting requirements."},

  # ── Property Disclosures (3) ────────────────────────────────────────────
  {"id":"re-nat-145","domain":"Property Disclosures","type":"single-choice",
   "question":"A seller is aware that a previous water leak resulted in significant mold growth that was then remediated. Most state disclosure laws and case law would treat the seller's obligation as:",
   "choices":["The seller should disclose the prior mold issue and its remediation as a material fact known to the seller","The seller need not disclose any condition that has been remediated","The seller may only disclose mold if asked directly","Only commercial sellers must disclose mold"],
   "correctAnswer":0,
   "explanation":"Most state laws and the underlying common-law misrepresentation rules require a seller to disclose KNOWN material conditions affecting the property — including past mold issues and the steps taken to remediate them. Concealing prior remediation can support claims of fraud or misrepresentation if a buyer later discovers the issue. The fact that remediation occurred does NOT automatically erase the obligation to disclose."},

  {"id":"re-nat-146","domain":"Property Disclosures","type":"single-choice",
   "question":"A 'stigmatized property' is generally:",
   "choices":["A property in poor physical condition","A property whose desirability has been affected by events (deaths, crimes, hauntings, etc.) that are not related to the property's physical condition","A property in a flood zone","A property with environmental contamination"],
   "correctAnswer":1,
   "explanation":"A stigmatized property is one whose desirability has been affected by non-physical events — for example, a murder, suicide, alleged hauntings, or association with a notorious prior occupant. Whether a stigmatized property must be disclosed is governed by state-specific statutes, which vary widely: some states classify non-violent deaths as non-material facts requiring no disclosure; others impose disclosure duties only on request."},

  {"id":"re-nat-147","domain":"Property Disclosures","type":"single-choice",
   "question":"A property is located in a FEMA-designated Special Flood Hazard Area (SFHA). Federal law generally requires:",
   "choices":["No disclosure of flood risk","The seller to pay for the buyer's flood insurance","Lenders to require flood insurance for federally-related mortgages on properties in SFHAs; many states ALSO require sellers to disclose flood risk and prior flooding history","Mandatory federal subsidy of all flood damage repairs"],
   "correctAnswer":2,
   "explanation":"Federal law (under the National Flood Insurance Act) requires lenders on federally-related mortgages to mandate flood insurance for properties in SFHAs. Many states have additionally imposed seller disclosure obligations regarding flood zone status and prior flood history. The 2024 update to the federal flood disclosure rules (and many state laws) have expanded these requirements significantly."},

  # ── Land Use Controls and Regulations (2) ───────────────────────────────
  {"id":"re-nat-148","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"A zoning ordinance specifies the minimum distance between a structure and the property's edge. This requirement is called:",
   "choices":["A variance","A buffer zone","A conditional use","A setback requirement"],
   "correctAnswer":3,
   "explanation":"Setbacks are minimum distances required between a structure and the property line(s). Zoning codes typically specify separate front, side, and rear setbacks. Their purpose includes ensuring privacy, light, air circulation, and emergency vehicle access. A homeowner who wants to build closer to the property line than the setback allows must apply for a variance based on a property-specific hardship."},

  {"id":"re-nat-149","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"The U.S. Constitution's Fifth Amendment 'Takings Clause' requires the government to:",
   "choices":["Pay just compensation when private property is taken for public use","Refund all property taxes annually","Refrain from any regulation that affects property values","Sell government property at market value"],
   "correctAnswer":0,
   "explanation":"The Takings Clause of the Fifth Amendment provides that 'private property [shall not] be taken for public use without just compensation.' This applies both to direct takings (eminent domain) and to certain regulatory takings where regulation effectively deprives the owner of beneficial use. The Supreme Court has developed extensive doctrine on what constitutes a 'taking' versus a permissible regulation."},

  # ── Leasing and Property Management (1) ─────────────────────────────────
  {"id":"re-nat-150","domain":"Leasing and Property Management","type":"single-choice",
   "question":"A lease for a definite period (e.g., 'from January 1 to December 31') automatically terminates on the stated end date without notice. This is best described as:",
   "choices":["Periodic tenancy","Tenancy at will","Tenancy at sufferance","Estate for years (also called tenancy for years or term tenancy)"],
   "correctAnswer":3,
   "explanation":"An estate for years (also called tenancy for years or term tenancy) is a leasehold with a definite beginning AND ending date. It terminates automatically at the end of the stated term — no notice is required from either party. A periodic tenancy (e.g., month-to-month) continues indefinitely until terminated by proper notice. Tenancy at will continues until either party terminates. Tenancy at sufferance is when a tenant remains after lease expiration without the landlord's consent."},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
