"""Real Estate National batch 9 — questions 401-450."""
import json, pathlib

Q = pathlib.Path("src/data/real-estate-national-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── Contracts (9) ───────────────────────────────────────────────────────
  {"id":"re-nat-401","domain":"Contracts","type":"single-choice",
   "question":"A quitclaim deed conveys whatever interest the grantor has 'AS IS.' Even when the grantor in fact has clear title, the grantee receives:",
   "choices":["Title with NO express warranties — they cannot sue the grantor for breach of warranty if a title defect later appears; they may, however, still receive good title in fact (and may rely on title insurance for protection)","All implied warranties","Better title than a warranty deed","Federal title insurance"],
   "correctAnswer":0,
   "explanation":"A quitclaim deed conveys whatever interest (if any) the grantor has — with NO express warranties of title. If the grantor in fact owns the property cleanly, the grantee receives good title — but if a defect later appears, the grantee has no recourse against the grantor. Title insurance can still protect the grantee against unknown defects. Quitclaim deeds are commonly used to clear title clouds (e.g., from former spouses, estranged heirs, or quiet-title parties) rather than as the primary deed in a purchase transaction."},

  {"id":"re-nat-402","domain":"Contracts","type":"single-choice",
   "question":"A purchase contract gives the seller a 'cure period' for any title defect identified by the buyer. The cure period generally means:",
   "choices":["The seller has unlimited time to fix defects","The seller has a STATED period (e.g., 30 days) to cure any title defect identified by the buyer; if cured within the period, the contract proceeds; if not cured, the buyer typically may terminate or proceed with the defect","The buyer must cure all defects","No defect can be cured"],
   "correctAnswer":1,
   "explanation":"A cure period gives the seller a stated time (typically 15-60 days) to resolve any title defect the buyer identifies in the title commitment. If cured within the period, the contract proceeds to closing. If NOT cured, the buyer typically has options: (1) terminate the contract and receive return of earnest money, (2) proceed and accept the defect (often with a price adjustment), or (3) extend the closing while the seller continues to attempt cure. The exact options depend on the contract language. Cure periods balance the seller's right to fix problems with the buyer's right to clean title."},

  {"id":"re-nat-403","domain":"Contracts","type":"single-choice",
   "question":"A buyer notices that the seller is several days late delivering required documents. The buyer continues with the transaction and even attends the inspection without objection. The buyer has likely:",
   "choices":["Lost no rights","Triggered an automatic extension","WAIVED the right to enforce the deadline by continuing with the transaction without timely objection — silent acceptance may estop the buyer from later claiming default based on the missed deadline","Earned damages"],
   "correctAnswer":2,
   "explanation":"WAIVER occurs when a party voluntarily relinquishes a known right — through express statement OR through conduct inconsistent with intent to enforce. Continuing with a transaction without timely objection to a counterparty's default can constitute waiver. The continuing party may be estopped from later asserting the breach as grounds for damages or termination. Best practice when a deadline is missed: deliver written notice promptly preserving rights, and document any agreement to extend or proceed. Don't proceed silently."},

  {"id":"re-nat-404","domain":"Contracts","type":"single-choice",
   "question":"A seller promises the buyer that they will repair a deck before closing. The buyer relies on this promise and signs the contract. The seller refuses to perform the repairs. The buyer's defense to the seller's later argument that the repair promise wasn't in the written contract is:",
   "choices":["Caveat emptor","Substantial performance","Mutual rescission","PROMISSORY ESTOPPEL — when (1) one party makes a clear promise, (2) the other party reasonably relies on it to their detriment, and (3) injustice can only be avoided by enforcement, courts may enforce the promise even without formal consideration"],
   "correctAnswer":3,
   "explanation":"Promissory estoppel is an equitable doctrine that enforces a promise made WITHOUT consideration when (1) the promisor makes a clear and definite promise, (2) the promisor should reasonably expect the promisee to rely on it, (3) the promisee actually relies on it to their detriment, and (4) injustice can only be avoided by enforcing the promise. It is sometimes called 'detrimental reliance.' The doctrine can be invoked as a defense (estopping the promisor from denying the promise) or as a sword (enforcing a non-contract promise)."},

  {"id":"re-nat-405","domain":"Contracts","type":"single-choice",
   "question":"At closing, the buyer is ready, willing, and able to perform — has funds, has the title insurance ready, has signed all documents. The seller is also there but refuses to sign the deed. Has the buyer 'tendered' performance?",
   "choices":["Yes — TENDER OF PERFORMANCE means readiness, ability, and offer to perform; tendering preserves the tendering party's contract rights and triggers the other party's obligation; the seller's refusal to perform is now an actionable breach","No — the buyer must perform first","Tender is not legally significant","Tender requires written notarization"],
   "correctAnswer":0,
   "explanation":"TENDER OF PERFORMANCE is the offer to perform one's contractual obligations — being ready, willing, and able to perform and demonstrating this to the counterparty. Tendering performance: (1) preserves the tendering party's right to enforce the contract, (2) triggers the counterparty's obligation to perform, (3) gives rise to a breach claim if the counterparty refuses. The buyer in this scenario has properly tendered (showing readiness, ability, and offer) — the seller's refusal is now an actionable breach with full remedies available (specific performance, damages, etc.)."},

  {"id":"re-nat-406","domain":"Contracts","type":"single-choice",
   "question":"A 'force majeure' clause in a real estate contract:",
   "choices":["Eliminates all contract obligations","Excuses performance when extraordinary, unforeseen events (Acts of God — hurricanes, earthquakes; pandemics, government action, etc.) make performance impossible or impracticable; carefully drafted clauses typically also include specific notice and mitigation requirements","Requires the buyer to perform regardless","Forbids force"],
   "correctAnswer":1,
   "explanation":"A force majeure clause excuses performance when extraordinary, unforeseen events (Acts of God: hurricanes, earthquakes, wildfires; pandemics; government action; war; civil disturbance) make performance impossible or impracticable. Real estate force majeure clauses have grown more important after COVID-19 (which prompted many courts to consider whether pandemic-related restrictions excused performance). Well-drafted clauses specify: (1) what events qualify, (2) what notice is required, (3) what mitigation duty applies, (4) consequences if the event continues for a stated period. Generic force majeure clauses can be hard to enforce — specificity helps."},

  {"id":"re-nat-407","domain":"Contracts","type":"single-choice",
   "question":"A liquidated damages clause sets the recovery for a buyer's breach at $50,000 — even though typical actual damages might be far less. The clause is most likely:",
   "choices":["Always enforceable","Always void","UNENFORCEABLE AS A PENALTY — courts will refuse to enforce liquidated damages clauses that are grossly disproportionate to anticipated harm. The party may then pursue actual damages instead. For enforceability: damages must be (1) difficult to calculate at contracting AND (2) a reasonable estimate","Required by federal law"],
   "correctAnswer":2,
   "explanation":"For liquidated damages to be enforceable, both elements of the two-part test must be met: (1) at the time of contracting, actual damages would have been difficult to calculate; AND (2) the agreed amount is a reasonable estimate of likely loss. If the agreed amount is grossly disproportionate to expected harm (a PENALTY), courts refuse to enforce — the aggrieved party may pursue actual damages instead. The reasonableness test prevents using LD clauses to coerce performance through fear of disproportionate consequences."},

  {"id":"re-nat-408","domain":"Contracts","type":"single-choice",
   "question":"Both buyer and seller are mistaken about whether the property includes a small adjacent strip of land. After signing, both discover the strip was always part of an adjoining parcel. The mistake is material to both. Available remedies typically include:",
   "choices":["Specific performance","Eviction","Lien stripping","RESCISSION (returning to pre-contract position), REFORMATION (rewriting the contract to reflect actual facts), or PROCEEDING with price adjustment — depending on the parties' wishes; mutual mistake about a material fact is grounds for any of these"],
   "correctAnswer":3,
   "explanation":"Mutual mistake of material fact gives the parties multiple options: (1) RESCISSION — cancel the contract, return to pre-contract position; (2) REFORMATION — rewrite the contract to reflect actual facts (less common for mistakes about subject matter); (3) PROCEEDING with the contract at a renegotiated price reflecting actual facts; (4) consent to one of these via mutual release. Courts will grant rescission as of right when both elements are met. The parties' preferred outcome depends on their relative bargaining position and the materiality of the mistake."},

  {"id":"re-nat-409","domain":"Contracts","type":"single-choice",
   "question":"A standardized lease offered by a large landlord on a 'take it or leave it' basis to consumer tenants — with no real opportunity for the tenant to negotiate terms — is best classified as:",
   "choices":["A contract of ADHESION — a standardized contract drafted by the stronger party and presented to the weaker party with little or no negotiation; courts apply heightened scrutiny and may refuse to enforce particularly oppressive terms","A fully negotiated bilateral contract","An option contract","A unilateral contract"],
   "correctAnswer":0,
   "explanation":"A contract of adhesion is a standardized contract drafted by the stronger party (often a corporation, landlord, or institutional party) and presented to the weaker party on a 'take it or leave it' basis with little opportunity to negotiate. Courts apply heightened scrutiny — they will: (1) construe ambiguities AGAINST the drafter (contra proferentem), (2) refuse to enforce particularly oppressive terms (unconscionability doctrine), and (3) require clear and conspicuous disclosure of significant terms. Many residential leases, insurance policies, and consumer service contracts are contracts of adhesion."},

  # ── General Principles of Agency (7) ────────────────────────────────────
  {"id":"re-nat-410","domain":"General Principles of Agency","type":"single-choice",
   "question":"At a real-estate conference happy hour, agents from two competing brokerages start discussing 'industry trends' that drift into specific commission percentages they each charge. This conversation is risky because:",
   "choices":["Conferences are exempt from antitrust law","Even seemingly informal discussions of commission rates among competitors can be evidence of price-fixing — a per se antitrust violation. Best practice is to AVOID any discussion of commission rates with competitors, regardless of context","Conferences require federal approval","The conversation is privileged"],
   "correctAnswer":1,
   "explanation":"Antitrust risk in commission discussions is real and significant. Even informal conversations between competing brokers about commission rates can be evidence of price-fixing agreements — a per se Sherman Antitrust Act violation. The classic antitrust advice for real estate professionals: AVOID any discussion of commission rates, fee structures, or pricing policies with competing brokerages — at conferences, social events, online, anywhere. Each brokerage must make independent pricing decisions. The 2024 settlements involving the National Association of Realtors arose precisely from concerns about coordinated commission practices."},

  {"id":"re-nat-411","domain":"General Principles of Agency","type":"single-choice",
   "question":"Following the 2024 NAR settlements, buyers wanting representation by a particular broker should:",
   "choices":["Have unlimited free representation","Wait until under contract to negotiate","Sign a written buyer-representation agreement BEFORE the broker shows them properties — specifying compensation terms; the buyer may want to negotiate whether the seller will pay the buyer's broker (via concessions in the purchase contract) or whether the buyer pays directly","Skip the agreement entirely"],
   "correctAnswer":2,
   "explanation":"The post-2024 buyer broker model is more transparent but also more buyer-pays-conscious. Buyers wanting representation by a specific broker must sign a WRITTEN buyer-representation agreement BEFORE the broker shows them properties. The agreement specifies compensation terms — typically negotiating whether (1) the seller will pay (via concession in the purchase contract — the most common modern approach), (2) the buyer will pay directly out of pocket, or (3) some combination. Buyers should understand they're now NEGOTIATING their broker's compensation, where historically it was assumed to flow from the seller's listing."},

  {"id":"re-nat-412","domain":"General Principles of Agency","type":"single-choice",
   "question":"A licensee previously represented a homeowner who is now selling that same property again — but with a different licensee. The licensee meets the new prospective buyers. Their disclosure obligation to the prior client:",
   "choices":["Disclose nothing","Disclose nothing if they have a new agency relationship","Wait 10 years before any disclosure","FIDUCIARY DUTIES — including confidentiality — generally CONTINUE EVEN AFTER the agency relationship ends, particularly with respect to non-public information learned during the prior relationship. The licensee should not use or disclose the prior client's confidential information without consent"],
   "correctAnswer":3,
   "explanation":"This is important: fiduciary duties — particularly confidentiality of non-public information learned during the agency relationship — generally CONTINUE EVEN AFTER the agency relationship ends. The licensee owes ongoing protection for confidential information (financial status, motivations, family situation, etc.) learned during representation. The licensee can represent new clients but cannot use the prior client's confidential information to the prior client's detriment. Some duties (like the duty of loyalty in the new transaction) flow only to the current client, but confidentiality and disclosure obligations from the prior relationship continue."},

  {"id":"re-nat-413","domain":"General Principles of Agency","type":"single-choice",
   "question":"Many state-approved purchase contracts include a MEDIATION CLAUSE requiring the parties to attempt mediation BEFORE pursuing litigation. The clause typically:",
   "choices":["Requires the parties to attempt resolution through a neutral mediator before filing suit; failure to mediate may bar attorney-fee recovery or other consequences as specified; mediation is non-binding (the parties can still litigate if mediation fails) but often leads to settlement","Eliminates the right to sue","Requires criminal prosecution","Is preempted by federal law"],
   "correctAnswer":0,
   "explanation":"Mediation clauses in real estate contracts require the parties to attempt mediation (with a neutral mediator) before pursuing litigation. Mediation is NON-BINDING — the parties can still litigate if mediation doesn't resolve the dispute — but it often leads to settlement and is much faster and cheaper than litigation. Clauses often specify consequences for refusing to mediate (e.g., losing the right to recover attorneys' fees if the dispute is later litigated). Most state-approved residential purchase contracts include mediation provisions."},

  {"id":"re-nat-414","domain":"General Principles of Agency","type":"single-choice",
   "question":"Some real estate contracts include MANDATORY ARBITRATION clauses. Arbitration differs from litigation in that:",
   "choices":["Arbitration is the same as litigation","Arbitration is illegal","Arbitration is a PRIVATE alternative to court — typically faster, less formal, and confidential; uses an arbitrator (or panel) instead of a judge/jury; arbitration awards are generally binding and have very limited grounds for court appeal","Arbitration is decided by a state judge"],
   "correctAnswer":2,
   "explanation":"Arbitration is a PRIVATE alternative to court — typically faster, less formal, and confidential. An arbitrator (or panel) decides the case instead of a judge/jury. Arbitration awards are generally BINDING with very limited grounds for court appeal (under the Federal Arbitration Act and similar state laws). Pros: faster, cheaper, confidential, no jury, often more flexible procedure. Cons: limited discovery, limited appeal, the arbitrator may have less expertise than a judge, NAR Code of Ethics requires REALTORS® to use arbitration for member-to-member disputes (Article 17). Arbitration clauses in consumer contracts have been controversial."},

  {"id":"re-nat-415","domain":"General Principles of Agency","type":"single-choice",
   "question":"After a salesperson is terminated from their brokerage, the licensee can typically:",
   "choices":["Continue practicing real estate independently","Sue the brokerage automatically","Find a NEW SPONSORING BROKER (with a new affiliation agreement) and continue practicing; alternatively, place the license on INACTIVE status; the licensee cannot perform licensed activities without an active sponsoring broker","Open their own brokerage immediately"],
   "correctAnswer":2,
   "explanation":"After termination, a salesperson must either: (1) FIND A NEW SPONSORING BROKER and complete the transfer process (typically including notification to the state real estate commission and any required documentation); (2) PLACE THE LICENSE ON INACTIVE STATUS (suspending licensed activities); or (3) UPGRADE TO A BROKER LICENSE (after meeting experience and education requirements) and open their own brokerage. Salespersons cannot operate independently — they must always have a sponsoring broker for licensed activities. The terminated brokerage typically retains existing client files and ongoing transaction commissions per the affiliation agreement."},

  {"id":"re-nat-416","domain":"General Principles of Agency","type":"single-choice",
   "question":"A new agent claims to be 'the area's #1 agent in luxury sales last year' in their marketing. The claim is exaggerated — the agent had only 3 luxury sales. The marketing is problematic because:",
   "choices":["Marketing is unregulated","Federal law prohibits all claims","FALSE OR MISLEADING MARKETING violates state real estate advertising rules and likely the NAR Code of Ethics (Article 12). Even subjective claims should have a reasonable basis. Such claims expose the licensee to state discipline, civil liability for damages, and damage to professional reputation","Marketing claims are always accepted as opinions"],
   "correctAnswer":3,
   "explanation":"State real estate advertising rules and the NAR Code of Ethics (Article 12) prohibit false or misleading marketing. Even subjective claims (like 'best,' 'top,' 'leading') should have a reasonable factual basis. A claim of '#1' that is unsupported by actual statistics is potentially false advertising — exposing the licensee to: (1) state real estate commission discipline (fines, education, suspension), (2) NAR ethics enforcement (for REALTORS®), (3) civil liability for damages to deceived consumers, (4) reputational damage. Marketing claims should be either factual and verifiable or clearly puffing."},

  # ── Practice of Real Estate (7) ─────────────────────────────────────────
  {"id":"re-nat-417","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The Federal Trade Commission's Mortgage Acts and Practices (MAP) rule prohibits deceptive practices in mortgage advertising. Examples of practices that may violate MAP include:",
   "choices":["Misrepresentations about loan rates, terms, costs, the borrower's ability to obtain favorable refinancing, the variability of rates/payments on adjustable loans, and association with government agencies (e.g., implying a government endorsement)","Stating the actual APR","Including the actual loan amount","Disclosing closing costs"],
   "correctAnswer":0,
   "explanation":"The FTC's Mortgage Acts and Practices (MAP) rule prohibits deceptive mortgage advertising. Common violations: (1) misrepresenting loan rates, terms, or costs; (2) misrepresenting the borrower's ability to obtain favorable refinancing or modify their loan; (3) misrepresenting the variability of rates/payments on ARMs; (4) misrepresenting any association with a government agency (e.g., implying government endorsement or affiliation when none exists); (5) misrepresenting the existence, terms, or rate of an offer; (6) misrepresenting prepayment penalties or fees. Penalties can be substantial — including civil money penalties and consumer restitution."},

  {"id":"re-nat-418","domain":"Practice of Real Estate","type":"single-choice",
   "question":"TRID (TILA-RESPA Integrated Disclosure) rules apply to most residential mortgage transactions. Transactions GENERALLY EXEMPT from TRID include:",
   "choices":["Most residential mortgages","Home equity lines of credit (HELOCs), reverse mortgages, mortgages secured by mobile homes or other non-real-property dwellings, and certain other specific transactions; commercial loans are entirely outside TRID's scope","All transactions","Only first-time buyer transactions"],
   "correctAnswer":1,
   "explanation":"TRID applies to most consumer-purpose closed-end credit transactions secured by real property — but NOT to all mortgage transactions. EXEMPTIONS include: (1) Home equity lines of credit (HELOCs); (2) Reverse mortgages (HECMs); (3) Mortgages secured by mobile homes or dwellings not attached to real property; (4) Loans made by a lender that makes 5 or fewer mortgages per year (small creditor exemption); (5) Commercial-purpose mortgages (e.g., for an investment property). Exempted transactions use older disclosure forms or have other applicable rules."},

  {"id":"re-nat-419","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Trade associations like the NAR can provide certain antitrust SAFE HARBORS for their members through:",
   "choices":["Member-only price-fixing","Eliminating competition","Member-only customer allocation","Industry best-practice guidance, educational programs, INDEPENDENT pricing decisions by each member, and avoiding any collective decisions on prices, customer allocation, or boycotts; trade associations themselves can be targets of antitrust enforcement if they facilitate anti-competitive behavior"],
   "correctAnswer":3,
   "explanation":"Trade associations can provide some antitrust protection through legitimate activities — but only when they: (1) avoid any agreements on prices, customer allocation, or boycotts among members; (2) provide industry educational programs and best-practice guidance; (3) ensure each member makes INDEPENDENT business decisions; (4) maintain antitrust compliance policies and counsel involvement in association activities. Trade associations themselves can be targets of antitrust enforcement if they facilitate anti-competitive behavior — as the 2024 NAR settlements demonstrated. Modern antitrust compliance requires careful association governance."},

  {"id":"re-nat-420","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Several brokerages collectively decide that they will not work with a particular discount real estate brokerage in their market — refusing to show its listings, refusing to accept its buyers, etc. This is:",
   "choices":["Free market competition","Permitted under NAR Code","Encouraged by state real estate commissions","A GROUP BOYCOTT — a per se violation of Section 1 of the Sherman Antitrust Act, illegal regardless of effect or reasonableness; potential remedies include civil damages (treble), injunctive relief, and possibly criminal sanctions"],
   "correctAnswer":3,
   "explanation":"A group boycott (concerted refusal to deal) is a per se violation of Section 1 of the Sherman Antitrust Act. It requires no proof of harmful effect — the agreement itself is illegal regardless of reasonableness. Remedies are severe: (1) civil treble damages plus attorneys' fees (3x the actual damages); (2) injunctive relief; (3) potential criminal sanctions for participants (Sherman Act violations are felonies). Individual brokerages may unilaterally decide whom to work with, but COORDINATED refusals are illegal. Real estate is a frequent target of antitrust enforcement because of historical industry practices."},

  {"id":"re-nat-421","domain":"Practice of Real Estate","type":"single-choice",
   "question":"In states with ANTI-DEFICIENCY statutes, the protection typically applies to:",
   "choices":["PURCHASE-MONEY MORTGAGES on owner-occupied residential property (one-to-four units in some states); other categories (refinance loans, second mortgages, commercial loans, investment property) are generally NOT protected — the lender can pursue the borrower for any deficiency after foreclosure","All loans equally","Only commercial loans","Only second mortgages"],
   "correctAnswer":0,
   "explanation":"Anti-deficiency statutes vary significantly by state. Common protected categories: (1) PURCHASE-MONEY MORTGAGES on owner-occupied residential property (loans used to buy the home); (2) often limited to 1-4 unit residential property; (3) in some states (California, Arizona) the protection is broader. Common UNPROTECTED categories: refinance loans (even if used for purchase), second mortgages and HELOCs, commercial loans, investment property loans. Where protected, after foreclosure the lender cannot pursue the borrower for any deficiency between the loan balance and foreclosure sale price."},

  {"id":"re-nat-422","domain":"Practice of Real Estate","type":"single-choice",
   "question":"In their HMDA (Home Mortgage Disclosure Act) examinations, federal regulators look for:",
   "choices":["All financial details","Regulator personal preferences","Lender-side data — patterns suggesting potential disparate-impact discrimination, redlining (geographic patterns), pricing disparities by protected class, denial rate disparities, and other indicators of potential fair-lending issues","Borrower social media"],
   "correctAnswer":2,
   "explanation":"HMDA data is analyzed by federal regulators (OCC, Fed, FDIC, CFPB, HUD) for patterns suggesting fair-lending violations. Common analyses: (1) DENIAL RATE DISPARITIES — comparing denial rates across racial/ethnic groups within similar underwriting profiles; (2) PRICING DISPARITIES — examining whether protected-class borrowers receive higher-cost loans; (3) REDLINING analysis — examining whether lenders avoid certain geographic areas based on race/ethnicity; (4) PATTERNS suggesting steering, pricing manipulation, or other discriminatory practices. Patterns alone don't prove discrimination but often trigger further investigation."},

  {"id":"re-nat-423","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The Federal Trade Commission (FTC) has broad authority over 'unfair or deceptive acts or practices' (UDAP) in commerce. In real estate:",
   "choices":["The FTC has no real estate authority","The FTC regulates only commercial property","The FTC enforces UDAP rules against deceptive marketing, kickbacks (RESPA coordination), advertising violations, and consumer harm — and shares enforcement of some specific rules (Do Not Call, MAP, Consumer Review Fairness Act) with other agencies. The CFPB has primary authority over mortgage-specific issues","Only state agencies regulate real estate"],
   "correctAnswer":2,
   "explanation":"The FTC has broad authority under Section 5 of the FTC Act over 'unfair or deceptive acts or practices' (UDAP). In real estate, the FTC enforces against: (1) deceptive marketing and advertising; (2) kickback and tie-in schemes (often coordinated with HUD/CFPB on RESPA matters); (3) violations of specific rules (Mortgage Acts and Practices/MAP, Do Not Call, Consumer Review Fairness Act); (4) anti-competitive practices among real estate professionals. The Consumer Financial Protection Bureau (CFPB) has primary authority over mortgage-specific consumer protection — TRID, RESPA, TILA, ECOA enforcement against mortgage actors."},

  # ── Financing (5) ───────────────────────────────────────────────────────
  {"id":"re-nat-424","domain":"Financing","type":"single-choice",
   "question":"In residential mortgage lending, ORIGINATION and SERVICING are distinct functions. They differ in that:",
   "choices":["They mean the same thing","Origination is government-only","Servicing is unregulated","ORIGINATION is the process of underwriting and funding a new loan; SERVICING is the ongoing administration after origination — collecting payments, managing escrow, handling delinquencies, providing statements, processing payoffs. Many loans are originated by one party and then sold/transferred to a different servicer (often multiple times over a loan's life)"],
   "correctAnswer":3,
   "explanation":"ORIGINATION is the front-end work: marketing, qualifying the borrower, underwriting, processing, and funding the new loan. SERVICING is everything that happens AFTER origination over the loan's life: collecting monthly payments, managing escrow for taxes and insurance, processing loan modifications, handling delinquencies and foreclosures, providing borrower statements, processing payoffs. Most loans are SOLD by the originator into the secondary market (Fannie/Freddie, MBS) but servicing may be retained by the originator or transferred to specialized servicers — often multiple times over a 30-year loan's life. Borrowers must adjust to receive payments from different servicers over time."},

  {"id":"re-nat-425","domain":"Financing","type":"single-choice",
   "question":"A MORTGAGE BROKER differs from a MORTGAGE BANKER in that:",
   "choices":["A mortgage BROKER acts as an intermediary, connecting borrowers with wholesale lenders but typically not funding loans with their own capital; a mortgage BANKER directly funds loans using their own capital or warehouse lines and then sells the loans into the secondary market","Both terms are identical","Bankers are unregulated","Brokers issue debit cards"],
   "correctAnswer":0,
   "explanation":"MORTGAGE BROKER: acts as an intermediary connecting borrowers with wholesale lenders. The broker takes applications, shops the loan to multiple lenders, and helps the borrower choose. The lender (not the broker) funds the loan. Brokers earn a fee or yield-spread compensation. MORTGAGE BANKER: directly originates and funds loans using own capital (or warehouse lines from larger banks) — then typically sells the loans into the secondary market while retaining (or selling separately) the servicing rights. The distinction matters for: (1) borrower options, (2) compensation transparency, (3) regulatory burden. Many lenders today combine both functions or have evolved into 'non-bank' direct lenders."},

  {"id":"re-nat-426","domain":"Financing","type":"single-choice",
   "question":"A 'correspondent lender' is:",
   "choices":["A type of insurance company","A MID-SIZED MORTGAGE LENDER that originates and funds loans with its own capital — and then sells the closed loans (often shortly after closing) to a larger 'investor' (such as Fannie Mae, Freddie Mac, or a bigger bank) under a pre-arranged purchase commitment","A federal agency","A type of commercial bank"],
   "correctAnswer":1,
   "explanation":"A correspondent lender is a mid-sized mortgage lender that occupies a middle position between mortgage broker and large bank: (1) originates loans like a banker, (2) funds with own capital (often warehouse lines), (3) sells the closed loan shortly after closing to a larger 'investor' (Fannie, Freddie, large bank) under a pre-arranged purchase commitment. Correspondent lenders may retain servicing or transfer it. Common features: faster underwriting decisions than direct bank channels, more loan options than mortgage brokers (because they can fund), more relationships than community banks. Many regional mortgage companies operate as correspondent lenders."},

  {"id":"re-nat-427","domain":"Financing","type":"single-choice",
   "question":"After a borrower applies for a mortgage and receives a rate quote, the lender offers a 'lock' on the rate for a stated period (often 30-60 days). The 'LOCK PERIOD':",
   "choices":["Eliminates the borrower's right to the rate","Allows unlimited time","Locks the QUOTED RATE for the stated period — protecting the borrower from rate increases. If the rate falls during the lock period, the borrower typically cannot benefit (the rate is locked, not floating); some lenders offer 'FLOAT-DOWN' options at extra cost","Has no real effect"],
   "correctAnswer":2,
   "explanation":"A rate lock locks the quoted interest rate for a stated period (typically 30, 45, 60, 90 days). The lock is intended to protect the borrower from rate increases during the time needed to close the loan. KEY POINTS: (1) once locked, the rate is FIXED — even if market rates fall, the borrower typically cannot benefit; (2) if rates rise, the borrower benefits; (3) if the loan doesn't close before the lock expires, the borrower must either accept the then-current rate or pay an extension fee; (4) some lenders offer 'FLOAT-DOWN' options at additional cost (typically as discount points) that let the borrower take the lower rate if market rates fall during the lock period."},

  {"id":"re-nat-428","domain":"Financing","type":"single-choice",
   "question":"A 'FLOAT-DOWN' option on a mortgage rate lock:",
   "choices":["Eliminates the lock","Lets the lender raise the rate","Is the same as a rate adjustment","Allows the borrower to take a LOWER rate if market rates DROP during the lock period — providing protection against rate increases (the original lock) while also providing benefit from rate decreases (the float-down feature); typically costs the borrower additional discount points or a fee"],
   "correctAnswer":3,
   "explanation":"A float-down option (sometimes called a 'one-time renegotiation') gives the borrower the BEST OF BOTH WORLDS — protection against rate increases (the original lock) AND benefit from rate decreases (the float-down) during the lock period. If market rates fall by a stated threshold (e.g., 0.25%), the borrower can 'float down' to the lower rate one time during the lock period. Float-downs typically cost the borrower extra (an additional fee or discount point at origination). The option is most valuable in volatile rate environments and for borrowers with longer lock periods (e.g., construction loans). Read the fine print carefully — terms vary."},

  # ── Real Estate Calculations (5) ────────────────────────────────────────
  {"id":"re-nat-429","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A property has a market value of $400,000. The annual property tax is $4,800. What is the EFFECTIVE TAX RATE (tax as a percentage of market value)?",
   "choices":["1.2% — Effective Tax Rate = Annual Tax ÷ Market Value = $4,800 ÷ $400,000 = 0.012 = 1.2%","12%","0.012%","8%"],
   "correctAnswer":0,
   "explanation":"Step 1 — Effective Tax Rate = Annual Tax ÷ Market Value.\nStep 2 — Apply: $4,800 ÷ $400,000 = 0.012 = 1.2%.\nThe effective tax rate is the actual percentage of market value paid in taxes — often DIFFERENT from the nominal mill rate (which is applied to ASSESSED value, which may be lower than market value, and after any exemptions). Effective tax rates are useful for comparing tax burdens across jurisdictions because they reflect the bottom-line tax cost. Effective rates in the US typically range from about 0.5% (low-tax states) to over 2.5% (high-tax states)."},

  {"id":"re-nat-430","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A borrower considering a 30-year mortgage compares two options: Option A — 7.0% interest with no points; Option B — 6.5% with 2 discount points ($4,000 on a $200,000 loan). Monthly P&I savings from the lower rate is approximately $70. The BREAK-EVEN POINT (in months) is approximately:",
   "choices":["10 months","Approximately 57 months (about 4.75 years) — $4,000 ÷ $70 ≈ 57 months. If the borrower plans to hold the mortgage longer than ~57 months, the buy-down pays off; shorter, the buy-down loses money","100 months","No break-even"],
   "correctAnswer":1,
   "explanation":"Step 1 — Up-front cost of buy-down: 2 points × 1% × $200,000 = $4,000.\nStep 2 — Monthly savings: $70.\nStep 3 — Break-even = Cost ÷ Monthly Savings = $4,000 ÷ $70 ≈ 57.1 months (about 4.75 years).\nIf the borrower plans to hold the mortgage LONGER than ~57 months, the buy-down pays off (interest savings exceed up-front cost). If SHORTER, the buy-down loses money. Break-even analysis is key for discount-point decisions — the borrower's intended holding period drives whether buying down makes sense."},

  {"id":"re-nat-431","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A property has the following pro forma: Effective Gross Income (EGI) $150,000; Operating Expenses $60,000. The investor's target cap rate is 8%. What is the maximum price the investor should pay (using the pro-forma NOI)?",
   "choices":["$1,000,000","$750,000","$1,125,000 — pro forma NOI = $150,000 − $60,000 = $90,000; Value = NOI ÷ Cap Rate = $90,000 ÷ 0.08 = $1,125,000","$80,000"],
   "correctAnswer":2,
   "explanation":"Step 1 — Calculate pro-forma NOI: EGI − Operating Expenses.\nStep 2 — Apply: $150,000 − $60,000 = $90,000 NOI.\nStep 3 — Apply cap rate formula: Value = NOI ÷ Cap Rate.\nStep 4 — Apply: $90,000 ÷ 0.08 = $1,125,000.\nThis is the investor's MAXIMUM price using their target cap rate. Higher cap rate = lower price (more conservative). Lower cap rate = higher price (more aggressive). The 'pro forma' qualifier reminds us this is a projection — actual results may vary. Buyers should also consider whether the seller's pro forma is realistic or aggressive."},

  {"id":"re-nat-432","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An investor will receive a single $50,000 payment 5 years from now. At a 6% annual discount rate, what is the approximate PRESENT VALUE of that future payment?",
   "choices":["$50,000","$45,000","$40,000","About $37,363 — PV = FV ÷ (1+r)^n = $50,000 ÷ (1.06)^5 = $50,000 ÷ 1.3382 ≈ $37,363"],
   "correctAnswer":3,
   "explanation":"Step 1 — Present Value formula: PV = FV ÷ (1 + r)^n where r = discount rate, n = number of periods.\nStep 2 — Apply: PV = $50,000 ÷ (1.06)^5 = $50,000 ÷ 1.3382 ≈ $37,363.\nThis is the foundation of time value of money in real estate analysis. The 'discount rate' represents the investor's required return / opportunity cost of capital. Higher discount rates yield LOWER present values (because the future cash flow is worth less today when the investor could otherwise earn more elsewhere). Discounted cash flow (DCF) valuation projects multiple years of cash flows and discounts each to present value."},

  {"id":"re-nat-433","domain":"Real Estate Calculations","type":"single-choice",
   "question":"An investor deposits $100,000 in a property earning 8% annually, compounded monthly. After ONE YEAR, the approximate value is:",
   "choices":["$108,000 — simple interest answer","Approximately $108,300 — compound interest at 8% annually compounded monthly produces an effective annual rate of about 8.3% due to monthly compounding effects","$8,000","$92,000"],
   "correctAnswer":1,
   "explanation":"Step 1 — Compound interest formula: A = P(1 + r/n)^(nt) where P = principal, r = annual rate, n = compounding periods per year, t = years.\nStep 2 — Apply: A = $100,000 × (1 + 0.08/12)^12 = $100,000 × (1.00667)^12 ≈ $100,000 × 1.0830 ≈ $108,300.\nStep 3 — Compare to simple interest ($108,000): the additional $300 reflects the compounding benefit.\nThe effective annual rate (EAR) with monthly compounding at 8% nominal is about 8.30%. This effect compounds dramatically over longer periods — the magic of compound returns."},

  # ── Property Ownership (4) ──────────────────────────────────────────────
  {"id":"re-nat-434","domain":"Property Ownership","type":"single-choice",
   "question":"In water-rights law, EASTERN US states typically follow:",
   "choices":["Prior appropriation doctrine — 'first in time, first in right' for beneficial use","No water rights at all","RIPARIAN DOCTRINE — owners of land adjacent to a watercourse have a 'reasonable use' right to the water, balanced with other riparian owners; rights are tied to land ownership and lost only by changes in land ownership patterns. Eastern states (humid climates) typically use this approach","Federal water rights only"],
   "correctAnswer":2,
   "explanation":"Eastern US states (where water is generally plentiful) typically follow the RIPARIAN DOCTRINE — owners of land adjacent to a watercourse have a 'reasonable use' right to the water, balanced with other riparian owners. Rights are tied to land ownership. Western US states (where water is scarce) typically follow PRIOR APPROPRIATION — 'first in time, first in right' — water rights belong to whoever first put the water to beneficial use, regardless of land ownership. The doctrines reflect different water availability: riparian works when water is plentiful; prior appropriation evolved when water is scarce and must be allocated to those who'll actually use it."},

  {"id":"re-nat-435","domain":"Property Ownership","type":"single-choice",
   "question":"A homeowner violates a recorded restrictive covenant by building a structure that violates a setback restriction. The HOA wants to enforce the covenant. Enforcement options typically include:",
   "choices":["The HOA must accept the violation","Only criminal prosecution","HOA-imposed fees only","INJUNCTIVE RELIEF (court order to remove the violating structure or stop the violation) — typically the primary remedy; sometimes damages or attorney fees if the violation caused harm or the covenant provides for them; HOAs can sometimes also impose self-help fines and assessments per their governing documents"],
   "correctAnswer":3,
   "explanation":"Enforcement of restrictive covenants typically involves: (1) INJUNCTIVE RELIEF (court order to stop the violation or remove the violating structure) — typically the primary remedy because monetary damages don't fix the violation; (2) DAMAGES — if the violation caused measurable harm to other property values; (3) ATTORNEY FEES — if the covenant or HOA documents provide for fee-shifting; (4) HOA self-help mechanisms (fines, lien for unpaid fines, restricted access to amenities) per the governing documents. Defenses include changed circumstances, abandonment, and waiver. Enforcement varies significantly by state and by the specific covenant language."},

  {"id":"re-nat-436","domain":"Property Ownership","type":"single-choice",
   "question":"A property owner discovers that the neighbor's fence has encroached 3 feet onto their property. Available remedies typically include:",
   "choices":["(1) negotiation and granting an easement (the neighbor pays for the easement and keeps the fence); (2) requiring removal of the encroachment (and recovery of any damages caused); (3) eventually adverse possession if the encroachment has continued openly, notoriously, and continuously for the statutory period (typically 5-20 years) — the encroacher could then acquire title to the encroached strip","Doing nothing","Selling the entire property","Filing criminal charges"],
   "correctAnswer":0,
   "explanation":"Encroachment remedies include: (1) NEGOTIATION — granting an easement (the encroaching neighbor pays for the easement and keeps the structure); (2) FORCED REMOVAL — requiring the neighbor to remove the encroaching structure and recover damages for harm caused; (3) TIME RISK — if the encroachment has continued openly, notoriously, and continuously for the statutory adverse possession period (typically 5-20 years), the encroacher could acquire title to the encroached strip. Property owners discovering encroachments should ACT PROMPTLY — long delay can result in losing the encroached strip to adverse possession. Survey-based discovery and documentation are essential."},

  {"id":"re-nat-437","domain":"Property Ownership","type":"single-choice",
   "question":"In a recorded subdivision plat, the developer typically DEDICATES certain areas (streets, alleys, sidewalks, common areas) to the public or to the HOA. 'Plat dedication':",
   "choices":["Privatizes streets","Transfers ownership of the dedicated areas from the developer to the public entity (typically the city or county) or the HOA — accepted by the public entity through the platting and approval process; once dedicated, the area cannot easily be 'undedicated' without specific legal procedures","Eliminates streets","Creates new taxes"],
   "correctAnswer":1,
   "explanation":"Plat dedication transfers ownership of specified areas in a subdivision from the developer to: (1) the PUBLIC ENTITY (typically the city or county) for streets, alleys, sidewalks, and certain public amenities; or (2) the HOMEOWNERS ASSOCIATION (HOA) for common areas, recreational facilities, drainage areas, etc. Dedication is accepted by the public entity through the platting and approval process — formalized when the plat is recorded. Once dedicated, the dedicated areas cannot easily be 'undedicated' or sold without specific legal procedures (often requiring public hearings and consideration of public benefit)."},

  # ── Transfer of Title (4) ───────────────────────────────────────────────
  {"id":"re-nat-438","domain":"Transfer of Title","type":"single-choice",
   "question":"A property's owner stops paying property taxes for several years. After statutory notice and a tax sale auction, the property is sold by the local taxing authority. The buyer at the tax sale receives a:",
   "choices":["General warranty deed","Special warranty deed","TAX DEED (or sometimes a 'tax sale certificate' first, followed by a tax deed after a redemption period expires); the deed conveys whatever interest the prior owner had, typically WITHOUT warranties — and may be subject to challenge if statutory tax-sale procedures weren't strictly followed","Quitclaim from the prior owner"],
   "correctAnswer":2,
   "explanation":"Tax sale deeds (sometimes called 'tax titles') are issued after a property has been sold for unpaid taxes through the statutory tax-sale process. The deed conveys whatever interest the prior owner had — typically WITHOUT warranties — and is subject to: (1) STATUTORY REDEMPTION PERIODS — many states give the prior owner a window (often 1-3 years) to pay the back taxes plus penalties and 'redeem' the property; (2) CHALLENGES to the validity of the tax sale (notice failures, procedural errors); (3) JUNIOR INTERESTS that may not have been properly noticed and could potentially survive. Tax sales can yield bargains but with significant title and procedural risk — title insurance is essential."},

  {"id":"re-nat-439","domain":"Transfer of Title","type":"single-choice",
   "question":"At a sheriff's sale conducted under judicial foreclosure, the property is sold to the highest bidder. Important characteristics include:",
   "choices":["Property is conveyed via general warranty deed","Bidder receives full title automatically","The bidder typically purchases on an 'AS IS' basis with no representations or warranties from the sheriff; the buyer may have only a limited period to inspect; junior liens may be wiped out (good for buyer) or may survive (depending on state procedure); and STATUTORY REDEMPTION RIGHTS may allow the foreclosed owner or other parties to redeem the property after the sale (typically by paying the bid amount plus costs and interest within a stated period)","The auction is unregulated"],
   "correctAnswer":2,
   "explanation":"Sheriff's sales (foreclosure auctions) carry significant procedural complexity. Important characteristics: (1) bidders purchase 'as is' with no warranties or representations from the sheriff; (2) the bidder typically has only a limited (or no) opportunity to inspect the property; (3) junior liens may be wiped out by the foreclosure (favorable to buyer) or may survive (depends on state); (4) statutory REDEMPTION RIGHTS — many states allow the foreclosed owner or other interested parties to redeem (pay off the auction price plus costs and interest) within a stated period after the sale (typically 6 months to 1 year); (5) physical possession may require eviction of the foreclosed owner. Sheriff's-sale investing is high-risk and requires substantial expertise."},

  {"id":"re-nat-440","domain":"Transfer of Title","type":"single-choice",
   "question":"After winning a quiet title action, the prevailing party may receive a COURT JUDGMENT that:",
   "choices":["Declares the prevailing party the rightful owner of the property — effectively quieting (resolving) all conflicting claims against them; the judgment is then typically RECORDED to establish clear title in the public records; subsequent purchasers may rely on the recorded judgment","Restores all prior owners","Eliminates property taxes","Has no real effect"],
   "correctAnswer":0,
   "explanation":"A quiet title action ends with a court judgment that declares the prevailing party the rightful owner. The judgment 'quiets' (resolves) all conflicting claims that were properly noticed in the action — extinguishing or limiting those claims. The judgment is then typically RECORDED in the county records to establish clear title for the world. Subsequent purchasers and lenders can rely on the recorded judgment when conducting title searches. Quiet title is a powerful tool for clearing complex title clouds — particularly when traditional title-clearing tools (releases, satisfactions) are unavailable."},

  {"id":"re-nat-441","domain":"Transfer of Title","type":"single-choice",
   "question":"A bargain and sale deed is most commonly used for:",
   "choices":["Inheritance only","TRANSFERS FROM TRUSTEES, EXECUTORS, OR SHERIFFS — situations where the grantor cannot personally warrant title because they're transferring on behalf of an estate, trust, or pursuant to a court order; the bargain and sale deed implies that the grantor has an interest to convey, but provides no warranties","All residential transactions","All commercial transactions"],
   "correctAnswer":1,
   "explanation":"Bargain and sale deeds are commonly used in transfers where the grantor cannot personally warrant title: (1) TRUSTEES selling estate property — the trustee may not have full knowledge of title history; (2) EXECUTORS handling a decedent's property; (3) SHERIFFS conveying foreclosure-sale property; (4) Tax-sale conveyances. The bargain and sale deed IMPLIES the grantor has SOME interest to convey (which a quitclaim does not even imply) but provides no warranties about the quality of that interest. Title insurance is particularly important for buyers receiving bargain and sale deeds."},

  # ── Valuation and Market Analysis (3) ───────────────────────────────────
  {"id":"re-nat-442","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"The appraisal principle of REGRESSION states that:",
   "choices":["Property values always decline over time","Older properties are worth less","A property's value is PULLED DOWN by the presence of substantially LOWER-VALUE neighboring properties — a $400,000 house in a neighborhood of $250,000 houses is typically appraised at less than $400,000 because of this 'regression' to neighborhood average","Lower-priced properties always sell faster"],
   "correctAnswer":2,
   "explanation":"REGRESSION: a property's value is PULLED DOWN by substantially lower-value surrounding properties. A high-end home in a modest neighborhood typically appraises BELOW its standalone construction cost. This is the 'over-improvement' problem from the owner's perspective. PROGRESSION (the inverse): a modest property's value is PULLED UP by substantially higher-value surrounding properties. A starter home in a luxury neighborhood may benefit from progression. Both principles are subsets of the broader Principle of Conformity — value is maximized in harmony with surrounding properties."},

  {"id":"re-nat-443","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"The appraisal principle of PROGRESSION states that:",
   "choices":["Property values always rise","All properties move together in markets","Newer properties displace older ones","A property's value is BOOSTED by the presence of substantially HIGHER-VALUE neighboring properties — a $250,000 house in a neighborhood of $400,000 houses may be appraised above its standalone cost because of this 'progression' toward neighborhood average"],
   "correctAnswer":3,
   "explanation":"PROGRESSION: a property's value is BOOSTED by substantially higher-value surrounding properties. A modest property in a high-end neighborhood may be appraised ABOVE its standalone construction cost because of this 'progression' toward neighborhood average. REGRESSION (the inverse): a high-end property is PULLED DOWN by lower-value surroundings. Practical implication: there's typically a market 'sweet spot' for property improvements — substantial upgrades may not be fully reflected in resale value (over-improvement loss to regression) while purchasing modest property in upscale neighborhoods may yield extra value (progression benefit)."},

  {"id":"re-nat-444","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"The FOUR CHARACTERISTICS OF VALUE (sometimes remembered by the acronym DUST) are:",
   "choices":["Demand, Utility, Scarcity, Transferability — for a property to have value, there must be demand (people who want it), utility (the property serves a useful purpose), scarcity (limited supply), and transferability (the right to transfer ownership)","Density, Use, Size, Type","Direct, Uniform, Specific, Targeted","Demand, Utility, Standardization, Tradition"],
   "correctAnswer":0,
   "explanation":"The four characteristics of VALUE (DUST):\n• DEMAND — there must be people who want and have the means to buy the property; without demand, value is theoretical.\n• UTILITY — the property must serve a useful purpose (residence, business, recreation, etc.).\n• SCARCITY — supply must be limited relative to demand; abundance reduces value.\n• TRANSFERABILITY — the right to transfer ownership must exist; non-transferable interests have severely limited value.\nThese differ from the economic CHARACTERISTICS of real estate (scarcity, improvements, permanence, area preference) and physical characteristics (immobility, indestructibility, uniqueness). All three frameworks are tested."},

  # ── Property Disclosures (3) ────────────────────────────────────────────
  {"id":"re-nat-445","domain":"Property Disclosures","type":"single-choice",
   "question":"In California (and several other states), the TOXIC MOLD PROTECTION ACT or similar state-level mold statutes:",
   "choices":["Require sellers to remediate all mold","Require sellers of residential property to disclose KNOWN material mold problems — the threshold and specific requirements vary, but failure to disclose known mold can result in misrepresentation liability and rescission rights for the buyer","Federal preemption","Apply only to commercial property"],
   "correctAnswer":1,
   "explanation":"State-level mold statutes (California's Toxic Mold Protection Act and similar laws in other states) typically require sellers to disclose KNOWN material mold problems in residential property. The specific requirements vary by state — some require active testing, others rely on the standard property condition disclosure. Common requirements: (1) disclosure of known mold or moisture issues; (2) disclosure of remediation efforts undertaken; (3) provision of EPA mold guidance pamphlets in some jurisdictions. Failure to disclose can result in: misrepresentation claims, rescission rights, and damages. Mold has been a major source of homebuyer litigation in recent decades."},

  {"id":"re-nat-446","domain":"Property Disclosures","type":"single-choice",
   "question":"Most state property-condition disclosure statutes require:",
   "choices":["No disclosure","Sellers to deliver a standardized disclosure form to the buyer BEFORE or AT EARLY STAGES of the transaction — usually before the buyer's offer is accepted; the timing varies but typically gives the buyer an opportunity to rescind if the disclosure reveals significant problems","Disclosure at closing only","Disclosure only to lenders"],
   "correctAnswer":1,
   "explanation":"Most state property-condition disclosure statutes require sellers to deliver a standardized state-specific disclosure form to the buyer BEFORE or AT EARLY STAGES of the transaction — typically before the buyer's offer is accepted. The form is comprehensive: structural, mechanical, electrical, plumbing systems; environmental hazards; pest issues; legal/title matters; HOA matters; etc. Many state statutes give the buyer a RESCISSION right (often 3-15 days) after receiving the disclosure — particularly if the disclosure reveals previously unknown material problems. Timing is important: late delivery may invalidate the disclosure or extend the rescission window."},

  {"id":"re-nat-447","domain":"Property Disclosures","type":"single-choice",
   "question":"A seller is required to disclose known material defects, but with respect to LATENT defects (those that aren't readily apparent):",
   "choices":["No disclosure required","Sellers can always claim ignorance","Sellers are excused from any duty","Sellers generally have a higher duty to disclose because the buyer can't reasonably discover them through inspection; sellers who 'should have known' through reasonable inquiry of facts known to them may be liable even if they claim ignorance"],
   "correctAnswer":3,
   "explanation":"LATENT defects (hidden defects not readily apparent through reasonable inspection) typically impose a HIGHER disclosure duty on the seller than patent (obvious) defects. The rationale: the buyer cannot reasonably discover latent defects through inspection — making seller candor essential. Courts may hold sellers liable for failing to disclose latent defects they 'should have known' through reasonable inquiry — even if they claim ignorance. Examples: improperly converted electrical work, hidden water damage behind walls, encroachments, easements not visible from inspection. The duty is rooted in equity and common-law fraud doctrine, in addition to specific state disclosure statutes."},

  # ── Land Use Controls and Regulations (2) ───────────────────────────────
  {"id":"re-nat-448","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"FLOOR AREA RATIO (FAR) is a zoning metric that:",
   "choices":["Limits the ratio of total building floor area to lot area — e.g., FAR of 0.5 on a 10,000 sq ft lot allows up to 5,000 sq ft of building; common in commercial and dense urban zoning to control bulk and density","Sets the rent rate","Determines property tax rate","Limits zoning enforcement"],
   "correctAnswer":0,
   "explanation":"Floor Area Ratio (FAR) is a zoning metric that limits the ratio of total building floor area to the underlying lot area. Example: an FAR of 0.5 on a 10,000 sq ft lot allows up to 5,000 sq ft of total building floor area. The metric controls bulk and density — particularly important in commercial and dense urban zoning where height alone wouldn't adequately regulate building size. FARs are typically set differently by zoning category (residential vs. commercial vs. industrial). Combined with setbacks, height limits, lot coverage limits, and other constraints, FARs shape what can be built on a given parcel."},

  {"id":"re-nat-449","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"TRANSFER OF DEVELOPMENT RIGHTS (TDR) programs:",
   "choices":["Eliminate development","Allow landowners to SELL their development rights to other landowners in 'receiving areas' (typically allowing increased density there) — preserving the 'sending area' (often agricultural, environmental, or historic land) while accommodating development pressure in designated receiving areas","Mandatory for all properties","Federal program only"],
   "correctAnswer":1,
   "explanation":"Transfer of Development Rights (TDR) programs are creative land-use tools that allow landowners to SELL their development rights to other landowners in designated 'receiving areas.' The 'sending area' (often agricultural, environmental, or historic land) is preserved — the owner agrees not to develop in exchange for selling rights. The 'receiving area' uses the purchased rights to develop at higher density than would otherwise be permitted by zoning. TDR programs are used by jurisdictions seeking to: (1) preserve farmland, open space, or historic resources, (2) channel development pressure into preferred locations, (3) provide compensation to property owners whose land is restricted. Examples: New York's Pine Barrens, Montgomery County (MD), New Jersey Pinelands."},

  # ── Leasing and Property Management (1) ─────────────────────────────────
  {"id":"re-nat-450","domain":"Leasing and Property Management","type":"single-choice",
   "question":"A tenant's lease expires, but the tenant remains in possession without the landlord's consent or a new lease. The tenant is now a:",
   "choices":["Holdover tenant","Lessor","TENANT AT SUFFERANCE (also called a 'holdover tenant') — a tenant who remains in possession after lease expiration without the landlord's consent; the landlord can typically begin eviction proceedings or, alternatively, elect to treat the tenant as a holdover (often charging additional rent — sometimes double rent — for the holdover period)","Owner"],
   "correctAnswer":2,
   "explanation":"A TENANT AT SUFFERANCE (or HOLDOVER TENANT) is a tenant who remains in possession after lease expiration without the landlord's consent. The landlord has two main options: (1) begin EVICTION proceedings immediately (treating the tenant as a trespasser); or (2) treat the tenant as a HOLDOVER (often imposing additional rent — many leases provide for 'double rent' or 1.5x rent for holdover periods, and many states allow such provisions). The choice depends on the landlord's situation — if a new tenant is ready, eviction is faster; if not, holdover rent may be more profitable than vacancy. Once the landlord ACCEPTS holdover rent, the tenancy may become an implied periodic tenancy (month-to-month) until properly terminated."},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
