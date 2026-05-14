"""Real Estate National batch 2 — questions 51-100."""
import json, pathlib

Q = pathlib.Path("src/data/real-estate-national-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── Contracts (9) ───────────────────────────────────────────────────────
  {"id":"re-nat-51","domain":"Contracts","type":"single-choice",
   "question":"A homeowner signs a listing agreement. The homeowner promises to pay a commission upon procurement of a ready, willing, and able buyer. The broker promises to use diligent efforts to market the property. This is an example of:",
   "choices":["A bilateral contract — both parties exchange mutual promises","A unilateral contract — only one party makes a promise","A void contract — listing agreements cannot be enforceable","An option contract"],
   "correctAnswer":0,
   "explanation":"A bilateral contract involves mutual promises by both parties — each side both makes and receives a promise. Listing agreements are bilateral because the homeowner promises to pay commission AND the broker promises to perform marketing services. A unilateral contract involves a promise that is accepted only by performance (e.g., an option to purchase, where the seller is bound to keep the offer open but the buyer is not bound to buy)."},

  {"id":"re-nat-52","domain":"Contracts","type":"single-choice",
   "question":"An offeror generally may revoke an offer at any time BEFORE acceptance UNLESS:",
   "choices":["The offer has been pending for more than 24 hours","The offer is supported by consideration (an option contract) or another doctrine prevents revocation","The offer was made in writing","The offeree has begun preliminary negotiations"],
   "correctAnswer":1,
   "explanation":"An offer is generally revocable at any time before acceptance — even if the offeror promised to keep it open — UNLESS something separately makes it irrevocable. An option contract (offeree gives consideration to keep the offer open) makes it irrevocable for the option period. Promissory estoppel and certain merchant firm offers (UCC) can also prevent revocation. Passage of time alone does not."},

  {"id":"re-nat-53","domain":"Contracts","type":"single-choice",
   "question":"A seller refuses to convey title at closing despite a valid purchase contract. The buyer wants the actual property, not just damages. Which remedy fits?",
   "choices":["Liquidated damages","Mitigation","Specific performance","Promissory estoppel"],
   "correctAnswer":2,
   "explanation":"Specific performance is the court-ordered remedy compelling a party to perform a contractual obligation. It is particularly favored in real estate because each parcel of land is considered legally unique — money damages would not adequately substitute for the specific property. Liquidated damages caps damages contractually; mitigation is the duty to reduce damages; promissory estoppel enforces a promise without consideration in limited cases."},

  {"id":"re-nat-54","domain":"Contracts","type":"single-choice",
   "question":"A buyer signs a purchase contract and later wishes to transfer their contractual rights and obligations to another buyer. The contract is silent on assignment. Generally:",
   "choices":["Assignment is forbidden absent express permission in the contract","Only the seller may consent to assignment","Assignment requires court approval","Assignment is permitted unless the contract prohibits it or performance is personal to the original party"],
   "correctAnswer":3,
   "explanation":"As a general rule, contracts are assignable unless the contract expressly prohibits it, the duties involved are personal in nature, or a statute restricts assignment. Most residential real estate purchase contracts contain explicit anti-assignment clauses precisely because the default rule allows assignment. The original buyer typically remains secondarily liable after assignment unless the seller agrees to a novation."},

  {"id":"re-nat-55","domain":"Contracts","type":"single-choice",
   "question":"A buyer assigns a purchase contract to a new buyer, AND the seller agrees to release the original buyer from all obligations while substituting the new buyer. This is best described as:",
   "choices":["Novation","Assignment","Subordination","Reformation"],
   "correctAnswer":0,
   "explanation":"Novation is the substitution of a new party (or contract) for an existing one, with the express release of the original party. It differs from simple assignment — in assignment, the original obligor typically remains secondarily liable; in novation, the original party is completely released. All parties (original obligor, new obligor, and the other side) must consent to a novation."},

  {"id":"re-nat-56","domain":"Contracts","type":"single-choice",
   "question":"After a fully integrated written purchase contract is signed, a buyer attempts to introduce evidence of a prior oral promise by the seller to repaint the house. The seller objects. Under the parol evidence rule:",
   "choices":["The oral promise is automatically incorporated into the contract","The oral promise is generally inadmissible to contradict or vary the terms of a fully integrated written contract","Only oral promises made on the day of signing are admissible","Parol evidence can be introduced only after the closing date"],
   "correctAnswer":1,
   "explanation":"The parol evidence rule bars introduction of prior or contemporaneous oral or written statements that would contradict or vary the terms of a fully integrated written contract. Exceptions exist for fraud, mistake, ambiguity, or to show that the contract was never validly formed. Post-contract modifications are governed separately (and typically require their own written amendment for real estate)."},

  {"id":"re-nat-57","domain":"Contracts","type":"single-choice",
   "question":"Both buyer and seller mistakenly believe a property contains 5 acres when it actually contains only 2 acres — a fact material to both parties' agreement. This is an example of:",
   "choices":["Unilateral mistake — only one party was mistaken","Fraud — intentional deception by one party","Mutual mistake — both parties were mistaken about a material fact, generally allowing rescission","Innocent misrepresentation — the seller did not know"],
   "correctAnswer":2,
   "explanation":"When both parties are mistaken about a material fact at the time of contracting (mutual mistake), the contract may be voidable by the adversely affected party, typically allowing rescission. Unilateral mistake (only one party mistaken) is generally not grounds for rescission unless the other party knew or should have known of the mistake. Fraud requires intentional misrepresentation."},

  {"id":"re-nat-58","domain":"Contracts","type":"single-choice",
   "question":"After both parties sign a residential purchase contract, they agree to extend the closing date by 14 days. The proper instrument to document this change is:",
   "choices":["A new contract — the original is void","A novation","An addendum","An amendment"],
   "correctAnswer":3,
   "explanation":"An amendment modifies an existing executed contract. An addendum is a separate document attached to a contract to add new terms (typically during the offer phase before final acceptance). Real estate professionals must use the correct instrument: changing a term in an executed contract uses an amendment, signed by both parties. The original contract remains in force as modified."},

  {"id":"re-nat-59","domain":"Contracts","type":"single-choice",
   "question":"A buyer signs a contract under fraud or material misrepresentation by the seller. The buyer wishes to undo the contract and be restored to their pre-contract position. The remedy is:",
   "choices":["Rescission","Reformation","Specific performance","Acceleration"],
   "correctAnswer":0,
   "explanation":"Rescission cancels the contract and restores the parties to their pre-contract positions. Common grounds include fraud, material misrepresentation, mutual mistake, undue influence, and duress. Reformation rewrites a contract to reflect the parties' true intent when the written instrument contains a mistake (it does not cancel — it corrects). Specific performance compels performance; acceleration applies to loan defaults."},

  # ── General Principles of Agency (7) ────────────────────────────────────
  {"id":"re-nat-60","domain":"General Principles of Agency","type":"single-choice",
   "question":"A real estate agent who has signed a written buyer-representation agreement with a buyer owes that buyer fiduciary duties. The seller in the same transaction (who is unrepresented) is best described as:",
   "choices":["The agent's client","A customer to whom the agent owes honesty and fair dealing","A subagent of the agent","An employee of the brokerage"],
   "correctAnswer":1,
   "explanation":"A client is the party to whom the agent owes fiduciary duties. A customer is the unrepresented party in the transaction. Agents owe customers honesty, fair dealing, and disclosure of material facts they know — but NOT the full fiduciary duties (loyalty, obedience, confidentiality, undivided care) reserved for clients."},

  {"id":"re-nat-61","domain":"General Principles of Agency","type":"single-choice",
   "question":"A broker represents both buyer and seller in a transaction WITHOUT properly disclosing the dual representation and obtaining written informed consent from both. This is:",
   "choices":["Designated agency — acceptable when disclosed","Subagency — common in cooperative MLS sales","Undisclosed dual agency — generally illegal in nearly all states","Single agency — perfectly proper"],
   "correctAnswer":2,
   "explanation":"Dual agency (representing both sides) is permitted only with full disclosure and informed written consent from BOTH parties. Undisclosed dual agency violates the agent's fiduciary duties and is generally illegal in nearly every state — exposing the licensee to discipline (including revocation), civil liability, and potentially giving the parties grounds to rescind the contract."},

  {"id":"re-nat-62","domain":"General Principles of Agency","type":"single-choice",
   "question":"An agent enters into a contract on behalf of a principal without prior authority. The principal later learns of the contract, takes the benefits, and otherwise affirms the agent's actions. This creates agency by:",
   "choices":["Apparent authority","Implied authority","Express authority","Ratification"],
   "correctAnswer":3,
   "explanation":"Ratification occurs when a principal — after the fact — accepts and affirms an agent's previously unauthorized actions. Ratification binds the principal as if the agent had had original authority. Apparent (ostensible) authority arises when the principal's conduct causes a third party to reasonably believe the agent has authority. Implied authority is incidental to express authority. Express authority is the actual scope explicitly granted."},

  {"id":"re-nat-63","domain":"General Principles of Agency","type":"single-choice",
   "question":"A property owner stands by while another person represents themselves as the owner's agent and signs documents on the owner's behalf. The owner says nothing, and a third party reasonably relies on the apparent relationship. The owner may now be:",
   "choices":["Estopped from denying the agency — bound as if the agent had authority","Free to disclaim the agency without any consequences","Subject to criminal prosecution","Required to ratify all of the agent's actions"],
   "correctAnswer":0,
   "explanation":"Agency by estoppel arises when a principal's words, conduct, or even inaction causes a third party to reasonably believe an agency relationship exists. The principal is then 'estopped' (legally prevented) from denying the agency to that third party. The doctrine protects innocent third parties who reasonably rely on the apparent relationship."},

  {"id":"re-nat-64","domain":"General Principles of Agency","type":"single-choice",
   "question":"An agent has a written listing agreement that authorizes marketing the property and presenting offers. Without explicit authorization, the agent orders a $50 lockbox replacement after the previous one breaks. This act is best classified as exercising:",
   "choices":["Express authority","Implied authority — incidental to the agent's express duties","Apparent authority","Authority by ratification"],
   "correctAnswer":1,
   "explanation":"Implied authority includes acts not specifically authorized but reasonably necessary to carry out express duties. Replacing a broken lockbox during an active listing falls within implied authority because it's essential to the express duty of facilitating showings. Express authority is the actual scope given in writing or orally. Apparent authority is what third parties reasonably believe."},

  {"id":"re-nat-65","domain":"General Principles of Agency","type":"single-choice",
   "question":"In response to the 2023-2024 antitrust settlements (Sitzer/Burnett and related cases), Multiple Listing Services in the U.S. have generally been required to:",
   "choices":["Mandate uniform buyer-broker commissions","Prohibit any buyer-broker compensation","No longer carry blanket unilateral offers of compensation from listing brokers to buyer brokers; buyer brokers must negotiate compensation through written buyer-representation agreements","Have all commissions set by federal regulation"],
   "correctAnswer":2,
   "explanation":"Following the 2023-2024 antitrust settlements involving the National Association of Realtors and major brokerages, MLS systems may no longer broadcast blanket unilateral offers of compensation from listing brokers to cooperating buyer brokers. Buyer brokers must now negotiate compensation directly through written buyer-representation agreements signed BEFORE showing properties. The reform aims to make compensation more transparent and negotiable."},

  {"id":"re-nat-66","domain":"General Principles of Agency","type":"single-choice",
   "question":"A listing agreement is terminated by all of the following EXCEPT:",
   "choices":["Death of the principal (seller)","Mutual agreement","Performance — closing of the sale","Death of an unrelated third party not involved in the transaction"],
   "correctAnswer":3,
   "explanation":"An agency is terminated by: death or incapacity of either principal or agent; mutual agreement; performance of the agency's purpose; expiration of its term; destruction of the subject property; bankruptcy of the principal; and unilateral revocation (though potentially with damages for breach). Death of an unrelated third party has no effect on the agency."},

  # ── Practice of Real Estate (7) ─────────────────────────────────────────
  {"id":"re-nat-67","domain":"Practice of Real Estate","type":"single-choice",
   "question":"An agent calls residents in a neighborhood and tells them, 'Members of [a protected class] are moving into your area — property values will drop. You should sell now while you still can.' This practice is:",
   "choices":["Blockbusting — illegal under the federal Fair Housing Act","Standard market commentary","Steering","Redlining"],
   "correctAnswer":0,
   "explanation":"Blockbusting (also called 'panic peddling') is the practice of inducing owners to sell — typically at below-market prices — by suggesting that members of a protected class are moving into the neighborhood and will drive down values. It is illegal under the federal Fair Housing Act. Steering directs buyers based on protected characteristics; redlining is denial of credit/services by geography tied to protected class."},

  {"id":"re-nat-68","domain":"Practice of Real Estate","type":"single-choice",
   "question":"A lender denies mortgage applications for properties in certain neighborhoods based on the racial composition of those neighborhoods rather than on the creditworthiness of individual borrowers. This is:",
   "choices":["Steering","Redlining — illegal under fair-lending laws and the Fair Housing Act","Blockbusting","Geographic underwriting — permitted if disclosed"],
   "correctAnswer":1,
   "explanation":"Redlining is the practice of denying or pricing credit unfavorably for entire geographic areas based on the racial or ethnic composition of those areas, regardless of individual creditworthiness. It violates the federal Fair Housing Act, the Equal Credit Opportunity Act, and the Community Reinvestment Act. The term comes from literally drawing red lines on maps to mark 'risky' neighborhoods."},

  {"id":"re-nat-69","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The Equal Credit Opportunity Act (ECOA) prohibits discrimination in credit transactions based on all of the following EXCEPT:",
   "choices":["Race or color","Marital status","Geographic location alone (when not used as a proxy for a prohibited basis)","Sex"],
   "correctAnswer":2,
   "explanation":"ECOA prohibits credit discrimination based on race, color, religion, national origin, sex, marital status, age (so long as the applicant is of legal age), or because all or part of the applicant's income derives from public assistance. Geographic considerations are permitted as long as they are not used as a proxy for a prohibited basis (which would be redlining). Note that the Community Reinvestment Act and Fair Housing Act still impose duties around lending across geographies."},

  {"id":"re-nat-70","domain":"Practice of Real Estate","type":"single-choice",
   "question":"A brokerage informs sellers that they will only list the seller's property if the seller also agrees to use the brokerage's in-house mortgage and title services. This practice is most likely a violation of:",
   "choices":["RESPA Section 9 alone","ECOA — sex discrimination","The Fair Housing Act","Antitrust law — specifically, a tying arrangement under the Sherman Antitrust Act"],
   "correctAnswer":3,
   "explanation":"A tying arrangement conditions the sale of one product on the buyer's purchase of a separate, tied product — and can violate the Sherman Antitrust Act when it has anti-competitive effect. Requiring a seller to use in-house settlement services as a condition of listing can also violate RESPA Section 9 (which specifically prohibits sellers from requiring buyers to use specified title insurance companies), but the broader category at issue is antitrust tying."},

  {"id":"re-nat-71","domain":"Practice of Real Estate","type":"single-choice",
   "question":"An agent obtains a list of homeowners in an area and begins cold-calling for solicitation. Several homeowners are on the National Do Not Call Registry. Under the Telephone Consumer Protection Act and the Telemarketing Sales Rule:",
   "choices":["Calling numbers on the Do Not Call Registry for solicitation generally subjects the caller to fines, unless an exception applies (e.g., established business relationship)","Cold-calling is exempt from Do Not Call rules","Real estate agents are categorically exempt because they are not telemarketers","The rules apply only to robocalls, not human-dialed calls"],
   "correctAnswer":0,
   "explanation":"The National Do Not Call Registry prohibits unsolicited sales calls (including by real estate agents) to registered numbers. Limited exceptions include calls to persons with whom the caller has an established business relationship (typically 18 months from the last transaction or 3 months from an inquiry) and calls with prior express written consent. Penalties can exceed $40,000 per violation."},

  {"id":"re-nat-72","domain":"Practice of Real Estate","type":"single-choice",
   "question":"A broker holds an earnest money deposit in a trust account. Interest accrues on the funds while held. Under most state rules:",
   "choices":["The broker may keep the interest as additional compensation","The disposition of interest is governed by state law — often paid to a state-designated housing or legal-aid fund (IOLTA-style), or to the depositor, depending on the state","Interest must be split 50/50 between buyer and seller automatically","Interest must be transferred to the broker's operating account"],
   "correctAnswer":1,
   "explanation":"State law varies, but most jurisdictions require that interest earned on trust account funds be paid either to the depositor or to a state-designated program (similar to IOLTA accounts for attorneys) that funds affordable housing or legal aid. Brokers are generally prohibited from keeping the interest as personal compensation — doing so would constitute conversion of client funds."},

  {"id":"re-nat-73","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Under RESPA Section 8, which of the following payments is GENERALLY PROHIBITED?",
   "choices":["A title company charging an itemized title insurance premium","A real estate agent providing a referral list of multiple lenders to a buyer","A lender paying a real estate agent a 'referral bonus' for each loan closed by a buyer the agent referred","A brokerage charging a clearly disclosed administrative fee for services actually performed"],
   "correctAnswer":2,
   "explanation":"RESPA Section 8 prohibits giving or receiving any fee, kickback, or thing of value pursuant to an agreement for the referral of settlement service business. Paying a real estate agent a per-loan referral bonus is exactly the kind of kickback Section 8 targets. Fees for services actually performed (and reasonable in relation to the work) are not prohibited, and providing a non-exclusive list of lenders is permitted."},

  # ── Financing (5) ───────────────────────────────────────────────────────
  {"id":"re-nat-74","domain":"Financing","type":"single-choice",
   "question":"An eligible buyer is using an FHA-insured loan. What is the typical MINIMUM down payment for an FHA purchase loan when the borrower's credit score qualifies for the standard program?",
   "choices":["0% (zero down)","10%","20%","3.5% (with a credit score of 580 or higher)"],
   "correctAnswer":3,
   "explanation":"FHA loans typically require a minimum 3.5% down payment for borrowers with a credit score of 580 or higher. Borrowers with credit scores between 500-579 may qualify with a 10% down payment. FHA loans also carry an Upfront Mortgage Insurance Premium (UFMIP) financed into the loan, plus an ongoing annual Mortgage Insurance Premium (MIP) paid monthly — regardless of LTV."},

  {"id":"re-nat-75","domain":"Financing","type":"single-choice",
   "question":"Under Regulation Z (which implements the Truth in Lending Act), lenders making consumer mortgage loans must disclose to borrowers:",
   "choices":["The Annual Percentage Rate (APR), finance charge, amount financed, and total of payments","Only the nominal interest rate","The lender's profit margin on the loan","The borrower's individual credit score"],
   "correctAnswer":0,
   "explanation":"Regulation Z requires lenders to disclose key cost-of-credit terms including the APR (the true annual cost including interest, points, and certain fees), the finance charge (total dollar cost of credit over the loan's life), the amount financed, and the total of payments. These standardized disclosures let borrowers compare loans on an apples-to-apples basis."},

  {"id":"re-nat-76","domain":"Financing","type":"single-choice",
   "question":"A 'conforming' conventional loan is best defined as one that:",
   "choices":["Has a fixed interest rate","Meets the loan-limit and underwriting standards required for purchase by Fannie Mae or Freddie Mac","Is insured by the FHA","Is guaranteed by the VA"],
   "correctAnswer":1,
   "explanation":"A conforming loan meets the underwriting and loan-limit requirements set by Fannie Mae and Freddie Mac, allowing it to be sold to those secondary-market entities. Loans exceeding the conforming loan limit are 'jumbo' loans. FHA and VA loans are separate government-backed programs that are not 'conforming conventional' loans."},

  {"id":"re-nat-77","domain":"Financing","type":"single-choice",
   "question":"A deed of trust differs from a mortgage primarily in that:",
   "choices":["A deed of trust always carries a higher interest rate","A deed of trust is exempt from foreclosure","A deed of trust involves THREE parties (borrower/trustor, lender/beneficiary, neutral trustee) and typically allows non-judicial foreclosure via a power-of-sale clause","A deed of trust transfers full ownership to the lender at closing"],
   "correctAnswer":2,
   "explanation":"A deed of trust involves three parties — the borrower (trustor), the lender (beneficiary), and a neutral trustee who holds bare legal title (or a power of sale) until the loan is paid off. The power-of-sale clause typically allows non-judicial foreclosure (faster and less expensive than judicial foreclosure). A traditional mortgage involves only two parties and generally requires judicial foreclosure with court supervision."},

  {"id":"re-nat-78","domain":"Financing","type":"single-choice",
   "question":"Most states' usury laws:",
   "choices":["Prohibit any interest on consumer loans","Apply uniformly to all loan types regardless of category","Set a single 18% national interest cap","Set a maximum legal interest rate above which lenders may face penalties — with broad exemptions for residential mortgages, business loans, and certain licensed lenders"],
   "correctAnswer":3,
   "explanation":"Usury laws set maximum legal interest rates, but they typically include broad exemptions — most notably for residential mortgages (federal preemption under DIDMCA of 1980), business loans, and licensed consumer finance lenders. State usury caps vary widely. Charging above the legal rate can result in forfeiture of interest, civil penalties, and criminal liability in extreme cases."},

  # ── Real Estate Calculations (5) ────────────────────────────────────────
  {"id":"re-nat-79","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An investor finds a duplex selling for $300,000 that generates $30,000 per year in gross rental income. What is the annual Gross Rent Multiplier (GRM)?",
   "choices":["10","0.10","30","100"],
   "correctAnswer":0,
   "explanation":"Step 1 — GRM formula: GRM = Sale Price ÷ Gross Annual Rent.\nStep 2 — Apply: $300,000 ÷ $30,000 = 10.\nA GRM of 10 means the property's price equals 10 times its annual gross rental income. GRM is a quick screening tool for comparing similar income properties. (Some markets quote monthly GRM = price ÷ monthly rent, which would be 100 here.)"},

  {"id":"re-nat-80","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A loan has a principal balance of $200,000 at a 6% annual interest rate. Using simple-interest computation, what is the interest portion of the FIRST monthly payment?",
   "choices":["$500","$1,000","$1,200","$12,000"],
   "correctAnswer":1,
   "explanation":"Step 1 — annual interest: $200,000 × 6% = $12,000.\nStep 2 — monthly interest: $12,000 ÷ 12 = $1,000.\nThe principal portion of the first payment is the remainder of the total P&I payment. In subsequent months, the interest portion declines as the outstanding balance is paid down."},

  {"id":"re-nat-81","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An investor purchased a property for $250,000 and sold it five years later for $325,000. Ignoring transaction costs, what was the investor's TOTAL percentage profit (not annualized) on the original investment?",
   "choices":["23%","25%","30%","75%"],
   "correctAnswer":2,
   "explanation":"Step 1 — profit in dollars: $325,000 − $250,000 = $75,000.\nStep 2 — profit % of original cost: $75,000 ÷ $250,000 = 0.30 = 30%.\nThis is the cumulative profit %, not annualized. Annualized simple return: 30% ÷ 5 = 6% per year."},

  {"id":"re-nat-82","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An L-shaped lot can be divided into two rectangles: one measuring 80 ft × 100 ft and the other measuring 50 ft × 60 ft. What is the total area?",
   "choices":["8,000 sq ft","8,500 sq ft","10,800 sq ft","11,000 sq ft"],
   "correctAnswer":3,
   "explanation":"Step 1 — rectangle 1: 80 × 100 = 8,000 sq ft.\nStep 2 — rectangle 2: 50 × 60 = 3,000 sq ft.\nStep 3 — total: 8,000 + 3,000 = 11,000 sq ft.\nGeneral approach for irregular shapes: divide into regular shapes (rectangles, triangles), compute each area, then sum."},

  {"id":"re-nat-83","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A buyer purchases a property appraised at $360,000 with an 80% LTV loan. What is the maximum LOAN amount?",
   "choices":["$288,000","$72,000","$300,000","$320,000"],
   "correctAnswer":0,
   "explanation":"Step 1 — LTV formula: Loan = Property Value × LTV.\nStep 2 — Apply: $360,000 × 80% = $288,000.\nLenders generally use the LOWER of appraised value or contract price as the basis. Down payment would be $360,000 − $288,000 = $72,000 (the remaining 20%)."},

  # ── Property Ownership (4) ──────────────────────────────────────────────
  {"id":"re-nat-84","domain":"Property Ownership","type":"single-choice",
   "question":"Joint tenancy with right of survivorship traditionally requires four 'unities' to be valid. They are:",
   "choices":["Possession, Interest, Title, Time — but each is satisfied automatically when co-owners take title","Possession, Interest, Title, Time (PITT) — each joint tenant must take possession at the same time, with equal interest, by the same title, and via one conveyance","Possession, Income, Title, Tenants","Personhood, Intent, Title, Time"],
   "correctAnswer":1,
   "explanation":"Joint tenancy requires the four unities (PITT): Possession (equal right to the whole), Interest (equal share), Title (same deed/conveyance), and Time (interests vesting at the same moment). If any unity is broken (e.g., one joint tenant sells their share), the joint tenancy converts to tenancy in common for that share — and the right of survivorship is destroyed as to that share."},

  {"id":"re-nat-85","domain":"Property Ownership","type":"single-choice",
   "question":"A grantor conveys property 'to my daughter for the life of her grandmother.' The daughter's interest is best described as:",
   "choices":["Fee simple absolute","Tenancy at will","A life estate pur autre vie — measured by another person's life","Fee simple defeasible"],
   "correctAnswer":2,
   "explanation":"A pur autre vie ('for another life') life estate is measured by the life of a person OTHER than the life tenant. Here the daughter's interest lasts as long as her grandmother is alive. When the grandmother dies, the property passes to the named remainderman or reverts to the grantor if no remainder was specified."},

  {"id":"re-nat-86","domain":"Property Ownership","type":"single-choice",
   "question":"A grantor conveys 'to A for life, then to B and B's heirs.' At the moment of conveyance, A has a life estate and B has:",
   "choices":["A reversion in fee simple","A leasehold estate","An easement","A remainder in fee simple"],
   "correctAnswer":3,
   "explanation":"When a future interest is created in someone OTHER than the grantor, it is a remainder. When the future interest stays with (or returns to) the grantor, it is a reversion. Here the future interest after A's life estate goes to a third party (B), so B has a remainder. If the grant had been 'to A for life' without specifying a remainderman, the grantor would retain a reversion."},

  {"id":"re-nat-87","domain":"Property Ownership","type":"single-choice",
   "question":"The key legal difference between a condominium and a cooperative form of ownership is:",
   "choices":["In a condominium, each owner holds fee simple title to their unit plus a share of common areas; in a cooperative, owners hold shares of a corporation that owns the entire building plus a proprietary lease to occupy a specific unit","Condominiums are residential only; cooperatives are commercial only","There is no legal difference","Cooperatives are larger than condominiums"],
   "correctAnswer":0,
   "explanation":"In a condominium, each unit owner holds a deed (fee simple title) to their individual unit plus an undivided fractional interest in common elements (hallways, roof, grounds). In a cooperative (co-op), the building is owned by a corporation; residents own shares of that corporation and receive a proprietary lease entitling them to occupy a specific unit. Co-op transfers typically require board approval; condominium transfers generally do not."},

  # ── Transfer of Title (4) ───────────────────────────────────────────────
  {"id":"re-nat-88","domain":"Transfer of Title","type":"single-choice",
   "question":"A bargain and sale deed:",
   "choices":["Conveys property with full warranties similar to a general warranty deed","Implies that the grantor has a present interest in the property, but contains no express warranties of title","Conveys no interest whatsoever","Is used only for gifts between family members"],
   "correctAnswer":1,
   "explanation":"A bargain and sale deed implies (by use of words like 'grant' or 'bargain and sell') that the grantor has some interest in the property — but it does not contain express covenants warranting against defects in title. It's sometimes used in foreclosure sales, tax sales, or other situations where the grantor (often a sheriff or trustee) cannot or will not warrant title."},

  {"id":"re-nat-89","domain":"Transfer of Title","type":"single-choice",
   "question":"A special warranty deed differs from a general warranty deed in that:",
   "choices":["It contains no warranties at all","It warrants against all prior title defects","It warrants only against defects that arose DURING the grantor's period of ownership — not against defects predating the grantor's title","It can only be used for commercial property"],
   "correctAnswer":2,
   "explanation":"A special warranty deed limits the grantor's warranties to defects arising during the grantor's ownership. The grantor does NOT warrant against defects that existed before they took title. This is common in commercial transactions and in transfers from REO (bank-owned) properties or trustees. A general warranty deed warrants against ALL defects, even those predating the grantor's ownership."},

  {"id":"re-nat-90","domain":"Transfer of Title","type":"single-choice",
   "question":"For a deed to effectively transfer title, the grantor must:",
   "choices":["Have the deed notarized at the moment of signing only","Pay all property taxes in advance","Record the deed in the county recorder's office","Deliver the deed to the grantee with present intent to convey title (and the grantee must accept)"],
   "correctAnswer":3,
   "explanation":"A deed transfers title at the moment of DELIVERY and acceptance — not at signing, notarization, or recording. Delivery requires the grantor's present intent to convey title (relinquishing dominion over the deed) plus the grantee's acceptance (typically presumed if the transfer is beneficial). Without delivery, even a signed and notarized deed conveys nothing."},

  {"id":"re-nat-91","domain":"Transfer of Title","type":"single-choice",
   "question":"A property owner dies without a valid will, leaving a surviving spouse and adult children from a prior marriage. The property will pass:",
   "choices":["By the state's intestate succession statute, which typically divides the property among the surviving spouse and children in specified proportions","Entirely to the state by escheat","Automatically to the surviving spouse only","To the closest living relative not in the immediate family"],
   "correctAnswer":0,
   "explanation":"When a person dies intestate (without a valid will), the state's intestate succession statute controls who inherits. Exact division varies by state — most allocate the estate among the surviving spouse and descendants in specified shares, often with different rules when the descendants are NOT also descendants of the surviving spouse. Escheat (property reverting to the state) applies only when no heirs at all can be located."},

  # ── Valuation and Market Analysis (3) ───────────────────────────────────
  {"id":"re-nat-92","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"The most likely price a property would sell for between a willing buyer and willing seller, both reasonably informed, neither under compulsion to buy or sell, on the open market, and over a reasonable exposure period, is the definition of:",
   "choices":["Assessed value","Market value","Insurable value","Book value"],
   "correctAnswer":1,
   "explanation":"This is the classic textbook definition of market value — an arm's-length transaction between informed and unforced parties under typical market conditions. Assessed value is set by a taxing authority and may differ from market value. Insurable value is the cost to replace structures. Book value is an accounting figure (typically cost less depreciation)."},

  {"id":"re-nat-93","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"The Gross Rent Multiplier (GRM) is most useful for:",
   "choices":["Owner-occupied single-family homes","Vacant residential lots","Small income-producing residential property (1-4 unit rentals) as a rough screening tool","Special-purpose properties such as churches"],
   "correctAnswer":2,
   "explanation":"GRM (price ÷ gross annual rent) is a quick screening tool for comparing small income-producing residential properties. It ignores operating expenses, vacancy, and financing — so it's a rough indicator, not a substitute for the income (cap rate) approach. It's most useful when comparing similar properties in the same submarket."},

  {"id":"re-nat-94","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"A 50-year-old well-maintained building still has 30 years of physical life left, but surrounding market conditions suggest its remaining income-producing useful life is only 15 years. The 15-year figure represents the property's:",
   "choices":["Effective age","Chronological age","Physical life","Remaining economic life"],
   "correctAnswer":3,
   "explanation":"Economic life is the period during which a property remains useful for its income-producing purpose. It is typically shorter than physical life (how long the structure could endure) because of external obsolescence, neighborhood decline, or market changes. Appraisers use economic life in the cost approach to compute depreciation."},

  # ── Property Disclosures (3) ────────────────────────────────────────────
  {"id":"re-nat-95","domain":"Property Disclosures","type":"single-choice",
   "question":"Megan's Law generally:",
   "choices":["Requires public availability of sex offender registry information; the obligation of real estate licensees to disclose offender residence near a listed property varies by state","Requires every seller of residential property to disclose all registered sex offenders within a 5-mile radius","Requires the buyer's agent to provide a list of all sex offenders in the neighborhood","Prohibits any disclosure of sex offender locations to buyers"],
   "correctAnswer":0,
   "explanation":"Megan's Law (and related state statutes) requires public sex offender registries. The disclosure obligation for real estate licensees varies significantly by state — some states impose affirmative disclosure duties, others require disclosure only on request, and others rely on buyer self-research. Many state contracts contain a notice directing buyers to the state registry."},

  {"id":"re-nat-96","domain":"Property Disclosures","type":"single-choice",
   "question":"Under CERCLA (the Comprehensive Environmental Response, Compensation, and Liability Act, or 'Superfund'), a current owner of contaminated property:",
   "choices":["Has no liability if they did not cause the contamination","Can be held STRICTLY LIABLE for cleanup costs of historical contamination — even if they did not cause it — though defenses (innocent landowner, bona fide prospective purchaser) may apply","Is liable only if they intentionally caused the contamination","Is fully exempt from cleanup obligations"],
   "correctAnswer":1,
   "explanation":"CERCLA imposes strict, joint and several, and retroactive liability for cleanup costs on a broad class of 'potentially responsible parties' — including current owners — regardless of who caused the contamination. Defenses include innocent landowner (purchased without knowledge despite due diligence), bona fide prospective purchaser (post-2002), and contiguous property owner. Performing All Appropriate Inquiry (typically a Phase I Environmental Site Assessment) is essential to preserve these defenses."},

  {"id":"re-nat-97","domain":"Property Disclosures","type":"single-choice",
   "question":"Radon is:",
   "choices":["A federally regulated household chemical that sellers must remove before closing","A pesticide commonly used near foundations","A naturally occurring radioactive gas that can accumulate in homes; the EPA recommends testing and disclosure of known elevated levels","A type of asbestos requiring abatement"],
   "correctAnswer":2,
   "explanation":"Radon is a naturally occurring colorless, odorless radioactive gas formed from the decay of uranium in soil and rock. It can accumulate in homes (especially basements) and is a leading cause of lung cancer after smoking. The EPA recommends testing and mitigation if levels exceed 4 pCi/L. Many states require disclosure of known elevated radon levels; the federal Radon Disclosure Form is provided in many transactions."},

  # ── Land Use Controls and Regulations (2) ───────────────────────────────
  {"id":"re-nat-98","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"A homeowner has operated a small auto repair shop in a residential zone for 20 years. The zoning was changed five years ago to prohibit such uses, but the existing operation continues under 'grandfather' rights. This is an example of:",
   "choices":["A variance","A conditional use permit","Spot zoning","A legal nonconforming use (grandfathered use)"],
   "correctAnswer":3,
   "explanation":"A legal nonconforming use (or 'grandfathered use') exists when a property's existing use predates a zoning change that would now prohibit it. The use is generally allowed to continue but typically cannot be expanded, rebuilt after destruction, or resumed after abandonment. Many zoning ordinances seek to phase out nonconforming uses over time through amortization or natural attrition."},

  {"id":"re-nat-99","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"A church wishes to open in a residential zone where churches are not permitted by right but are listed as a 'conditional use' subject to approval. The proper application is for:",
   "choices":["A conditional use permit (sometimes called a special use permit) — to allow a use specifically contemplated by the zoning code as conditional","A variance — to deviate from a numeric zoning standard","A rezoning — to change the underlying zone classification","A nonconforming use designation"],
   "correctAnswer":0,
   "explanation":"A conditional use permit (also called a special use permit) is appropriate when the zoning code specifically lists the proposed use as 'conditional' or 'special' within a zone. The applicant must demonstrate compliance with the code's specific conditions. A variance, by contrast, allows deviation from a specific numeric standard (like a setback or height limit) based on property-specific hardship — not a use-based change."},

  # ── Leasing and Property Management (1) ─────────────────────────────────
  {"id":"re-nat-100","domain":"Leasing and Property Management","type":"single-choice",
   "question":"A commercial lease requires the tenant to pay base rent PLUS property taxes, insurance, AND maintenance costs in addition to the base rent. This is best described as:",
   "choices":["A gross (full-service) lease","A single net lease — tenant pays taxes only","A double net lease — tenant pays taxes and insurance","A triple net (NNN) lease"],
   "correctAnswer":3,
   "explanation":"Net leases shift operating costs to the tenant. A single net (N) lease adds property taxes to the tenant's obligations. A double net (NN) lease adds insurance. A triple net (NNN) lease adds maintenance. NNN leases are common in retail and industrial leasing because they shift risk of cost increases to the tenant while providing the landlord predictable income."},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
