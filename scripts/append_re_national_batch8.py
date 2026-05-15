"""Real Estate National batch 8 — questions 351-400."""
import json, pathlib

Q = pathlib.Path("src/data/real-estate-national-questions.json")
data = json.loads(Q.read_text(encoding="utf-8"))

new_qs = [
  # ── Contracts (9) ───────────────────────────────────────────────────────
  {"id":"re-nat-351","domain":"Contracts","type":"single-choice",
   "question":"A purchase contract is silent about the closing date. When does closing legally need to occur?",
   "choices":["Within 30 days of contract signing","Within a 'reasonable time' under the circumstances — courts apply this default rule when the parties have not specified a date","Whenever the buyer chooses","The parties must rewrite the contract"],
   "correctAnswer":1,
   "explanation":"When a contract is silent on time of performance, courts apply a 'reasonable time' standard based on industry custom, the nature of the transaction, and the parties' apparent expectations. In real estate, this default typically means closing should occur within the timeframe customarily needed to complete title work, financing, and inspections. Best practice is to specify dates expressly — courts dislike imposing default timing on parties."},

  {"id":"re-nat-352","domain":"Contracts","type":"single-choice",
   "question":"A buyer sues for specific performance after a seller refuses to convey. Specific performance is most likely DENIED if:",
   "choices":["The buyer is willing to close on time","The contract is fully executed","The remedy is impossible (e.g., the seller has already conveyed the property to a good-faith purchaser without notice) OR the contract terms are too uncertain for a court to enforce — money damages may be the only remaining remedy","The buyer has earnest money on deposit"],
   "correctAnswer":2,
   "explanation":"Specific performance is not always available, even in real estate. Courts will DENY it when: (1) performance is impossible (the property has already been sold to a bona fide purchaser without notice), (2) the contract terms are too uncertain or vague for the court to craft a meaningful order, (3) the plaintiff has not performed their own obligations, or (4) doing so would cause undue hardship (rare). In those cases, money damages may be the only available remedy."},

  {"id":"re-nat-353","domain":"Contracts","type":"single-choice",
   "question":"Financing contingencies in residential contracts come in two main forms — generally either a 'best efforts' contingency (the buyer must make reasonable efforts to obtain financing) or a 'specific terms' contingency (the contingency is satisfied only by financing meeting specified terms). The KEY practical difference:",
   "choices":["No real difference","Both apply only to FHA loans","Both must be signed by the lender","With a 'best efforts' contingency, the buyer can be obligated to take any reasonable financing offered (potentially at higher rates than expected); with a 'specific terms' contingency, the buyer can walk away if the specified terms (rate, type, points) aren't available — providing stronger buyer protection"],
   "correctAnswer":3,
   "explanation":"This is a critical distinction. 'Best efforts' contingencies require the buyer to make reasonable efforts to obtain financing — and can potentially commit the buyer to taking any reasonable offered terms, even higher rates than the buyer wanted. 'Specific terms' contingencies (specifying rate range, loan type, points, etc.) give the buyer the right to terminate if the SPECIFIC terms aren't available. Specific terms contingencies provide stronger buyer protection; best practice for buyers is to negotiate them when possible."},

  {"id":"re-nat-354","domain":"Contracts","type":"single-choice",
   "question":"A contract clause is ambiguous, and the buyer (whose attorney drafted the contract) and seller disagree on its meaning. The court applies the doctrine of 'contra proferentem,' which means:",
   "choices":["Ambiguous terms are generally construed AGAINST the drafter and IN FAVOR of the non-drafting party — typically the party who didn't have control over how the language was written","Ambiguous terms favor the lender","Ambiguous terms are voided automatically","Ambiguous terms favor the wealthier party"],
   "correctAnswer":0,
   "explanation":"'Contra proferentem' (Latin for 'against the offerer') is a contract interpretation principle that ambiguous terms are construed AGAINST the drafter and IN FAVOR of the non-drafting party. The rationale: the drafter had the power to write clearly and unambiguously; if they failed to do so, they shouldn't benefit from the resulting ambiguity. This is particularly applied to insurance policies, contracts of adhesion, and standardized form contracts."},

  {"id":"re-nat-355","domain":"Contracts","type":"single-choice",
   "question":"Earnest money is placed in a broker's trust account during the contract period. Any INTEREST earned on the deposit:",
   "choices":["Belongs entirely to the broker","Is generally allocated per state law and contract terms — typically to the depositor, the parties as agreed in the contract, or in many states to a state-designated fund (IOLTA-style) for affordable housing or legal services","Belongs to the lender","Is divided 50/50 with the listing broker"],
   "correctAnswer":1,
   "explanation":"Disposition of trust-account interest varies. Most states do not allow the broker to retain it as personal compensation (that would be conversion). Common arrangements: (1) interest follows the deposit to the depositor; (2) interest is allocated per the parties' contract; (3) some states require interest to be paid to a state-designated fund (like Iowa's IOLTA-style program). Brokers must understand their state's specific rules to avoid liability."},

  {"id":"re-nat-356","domain":"Contracts","type":"single-choice",
   "question":"A broker, knowing that a seller is under an exclusive right-to-sell listing with another broker, contacts the seller and persuades them to terminate the existing listing in order to list with the contacting broker. This may give rise to:",
   "choices":["No legal liability","A criminal prosecution for theft","A claim of TORTIOUS INTERFERENCE WITH CONTRACT — actionable by the original broker for damages, including potentially the lost commission","An automatic license revocation"],
   "correctAnswer":2,
   "explanation":"Tortious interference with contract occurs when a third party (here, the contacting broker) knowingly and intentionally induces or causes a contract breach without legal justification. Elements typically include: (1) existence of a valid contract, (2) defendant's knowledge of the contract, (3) intentional inducement of breach, and (4) damages. The injured broker can sue for the lost commission and other consequential damages. NAR Code of Ethics Article 16-13 specifically addresses this and provides for arbitration."},

  {"id":"re-nat-357","domain":"Contracts","type":"single-choice",
   "question":"A wraparound mortgage arrangement carries significant RISK because:",
   "choices":["Wraparounds are illegal under federal law","The buyer cannot make payments","The wraparound triggers the seller's existing first mortgage's DUE-ON-SALE clause — meaning the lender can call the existing loan immediately due upon discovering the wrap; and the buyer is exposed to risk if the seller fails to forward payments to the underlying lender","Wraparounds are limited to $50,000"],
   "correctAnswer":2,
   "explanation":"Wraparound mortgages carry multiple risks: (1) Most modern mortgages contain a 'due-on-sale' (alienation) clause that lets the lender accelerate the loan when ownership transfers — including via wraparound. If the lender discovers the wrap, they can call the entire loan due immediately. (2) The buyer pays the seller monthly, and the seller pays the underlying lender — but if the seller fails to forward payments, the buyer faces foreclosure even though they paid. (3) Title issues if the seller bankrupts or dies. Wraparounds are useful but should be carefully drafted."},

  {"id":"re-nat-358","domain":"Contracts","type":"single-choice",
   "question":"In a land contract (contract for deed), the BUYER takes possession and begins making installment payments. If the buyer DEFAULTS after substantial payments:",
   "choices":["The seller often has the right to retain the property (including any equity the buyer has built) AND the payments made — though many states have enacted consumer protections requiring foreclosure-like procedures or some return of equity for substantial breaches","The seller must immediately convey the property","Federal law forbids any default consequences","The buyer cannot lose the property"],
   "correctAnswer":0,
   "explanation":"Land contracts historically allowed sellers to terminate on default and keep both the property AND all payments — a harsh remedy that motivated many states to enact consumer-protection statutes. Modern protections may require: (1) foreclosure-like judicial procedures, (2) notice and opportunity to cure, (3) some return of equity when buyer has substantial payments invested, or (4) treatment of the contract as a mortgage requiring formal foreclosure. The specific protections vary by state and by the contract's duration and equity."},

  {"id":"re-nat-359","domain":"Contracts","type":"single-choice",
   "question":"A grantor uses a QUITCLAIM DEED to release any interest they MAY have in a property to clear a title cloud. The quitclaim's limitations include:",
   "choices":["It overstates the grantor's rights","It can pass title only if the grantor actually had title at the time of conveyance — and even then, conveys it WITHOUT warranties (the grantee cannot sue the grantor if the title turns out defective)","It is the strongest form of conveyance","It transfers more title than other deeds"],
   "correctAnswer":1,
   "explanation":"Quitclaim deeds have important limitations. They convey only whatever interest the grantor actually HAS at the time of conveyance — and with NO warranties. If the grantor has no title, the quitclaim conveys nothing. If title turns out defective, the grantee has no recourse against the grantor (unlike a warranty deed). Quitclaim deeds are useful for clearing clouds (e.g., from a former spouse, an heir, or a person who might claim title) — but should not be used when the buyer wants title-warranty protection."},

  # ── General Principles of Agency (7) ────────────────────────────────────
  {"id":"re-nat-360","domain":"General Principles of Agency","type":"single-choice",
   "question":"A real estate licensee carries Errors & Omissions (E&O) insurance. E&O coverage typically:",
   "choices":["Eliminates all liability","Covers fraud or intentional misconduct","Provides defense AND indemnification for claims arising from negligent acts, errors, or omissions in the course of licensed real estate activities — typically WITH EXCLUSIONS for intentional misconduct, criminal acts, fair-housing violations (some policies), known prior claims, and specified types of activities","Covers personal expenses"],
   "correctAnswer":2,
   "explanation":"E&O (Errors and Omissions) insurance — also called professional liability insurance — provides defense and indemnification for claims arising from negligence, errors, or omissions in licensed real estate activities. Typical EXCLUSIONS include: intentional misconduct (fraud, criminal acts), fair-housing violations (some policies), known prior claims, certain types of activities (developer activities, property management beyond brokerage), and acts outside the scope of licensed real estate practice. Coverage is critical because real estate professionals are frequently named in transaction disputes."},

  {"id":"re-nat-361","domain":"General Principles of Agency","type":"single-choice",
   "question":"To obtain a real estate license in most states, an applicant must:",
   "choices":["Be 18 years old","Pay a fee only","Be a U.S. citizen","Meet age, education (typically 60-180 hours of pre-licensing coursework), pass a state-approved licensing examination, undergo a background check, complete the application, and pay required fees — exact requirements vary by state"],
   "correctAnswer":3,
   "explanation":"State real estate licensing requirements typically include: (1) age (usually 18 or 19); (2) education (typically 60-180 hours of pre-licensing coursework from approved providers); (3) examination (state-approved licensing exam covering national and state-specific topics); (4) background check (criminal history review); (5) completed application; (6) license fees. Continuing education is required for renewal. Some states also require sponsorship by a supervising broker (for salesperson licenses)."},

  {"id":"re-nat-362","domain":"General Principles of Agency","type":"single-choice",
   "question":"A real estate licensee in State A wants to do business in State B. Most states allow some form of:",
   "choices":["License RECIPROCITY or 'recognition' agreements — under which a licensee in good standing in their home state may obtain a license in another state with reduced requirements (often skipping the national portion of the exam or coursework if substantially equivalent in the home state) — though terms vary widely and some states require full re-licensing","Full federal licensing","No interstate practice","Permanent national license"],
   "correctAnswer":0,
   "explanation":"Most states have some form of RECIPROCITY or RECOGNITION agreements with other states — allowing out-of-state licensees in good standing to obtain a license with reduced requirements (often skipping the national portion of the licensing exam or some coursework, provided the home state's requirements are substantially equivalent). However, terms vary widely. Some states are very open; others are restrictive. Licensees should consult both states' specific reciprocity rules before practicing across state lines. Practicing without a license in the new state is a serious violation."},

  {"id":"re-nat-363","domain":"General Principles of Agency","type":"single-choice",
   "question":"A real estate licensee can place their license on INACTIVE status (sometimes called 'parking' or 'in escrow'). An inactive license generally:",
   "choices":["Earns commission for the licensee","Allows the licensee to engage in licensed real estate activities — including listing, selling, or representing buyers/sellers — without being affiliated with a sponsoring broker, FOR a limited period","Cannot be reactivated","Avoids continuing education obligations while inactive in many states (with rules varying); the licensee cannot perform licensed activities while inactive, and must reactivate (often by completing a state-specific reactivation process and finding a sponsoring broker)"],
   "correctAnswer":3,
   "explanation":"Inactive license status allows a licensee to maintain their license without being affiliated with a sponsoring broker or performing licensed activities. While inactive, the licensee cannot list, sell, or represent buyers/sellers. CE requirements vary — some states waive them while inactive, others maintain them. To reactivate, the licensee typically must complete a state-specific reactivation process, find a sponsoring broker, and pay any required fees. Inactive status is useful for licensees taking career breaks, moving between brokerages, or temporarily switching to non-real-estate work."},

  {"id":"re-nat-364","domain":"General Principles of Agency","type":"single-choice",
   "question":"Some states grant continuing education WAIVERS to specific groups of licensees. Common waivers may apply to:",
   "choices":["All licensees","Anyone who pays a fee","Long-term licensees (e.g., 25+ years of active practice), educators (those who teach approved CE courses), licensees with documented disability or military deployment hardships — with specific state-by-state rules","Anyone over 65"],
   "correctAnswer":2,
   "explanation":"CE waivers are state-specific and limited. Common eligibility categories: (1) long-term licensees with 25+ years of active practice; (2) educators who teach approved CE courses (may earn equivalent credit through teaching); (3) licensees with documented disability, illness, or other hardship; (4) licensees on military deployment; (5) licensees in approved continuing legal education or specific other related professions. Waivers typically require formal application and approval — they don't apply automatically."},

  {"id":"re-nat-365","domain":"General Principles of Agency","type":"single-choice",
   "question":"License SURRENDER differs from license REVOCATION in that:",
   "choices":["They have the same legal effect","Surrender is the voluntary giving up of a license by the licensee (often used to settle pending disciplinary matters) — typically with no admission of misconduct, while REVOCATION is the involuntary termination of a license by the state real estate commission as a disciplinary sanction following findings of violation","Revocation is always voluntary","Surrender carries criminal penalties"],
   "correctAnswer":1,
   "explanation":"License SURRENDER is voluntary — the licensee gives up the license, often to settle pending disciplinary matters. Surrender typically does NOT include an admission of misconduct (in fact, settlement agreements often expressly disclaim admission). License REVOCATION is involuntary — the state real estate commission terminates the license as a disciplinary sanction following findings of substantial violation. Revocation creates a public record of misconduct and typically prevents re-licensing without lengthy waiting periods and additional requirements."},

  {"id":"re-nat-366","domain":"General Principles of Agency","type":"single-choice",
   "question":"State 'Real Estate Licensing Laws' (sometimes called Real Estate Acts or Real Estate Commission Rules) are:",
   "choices":["The legal foundation defining who can practice real estate brokerage in the state, what is required to obtain and maintain a license, prohibited acts (the 'grounds for discipline'), license categories, real estate commission powers, and consumer protections; failure to comply can result in license discipline ranging from fines to revocation, plus civil and criminal exposure","Federal rules only","Optional guidelines","Inactive in most states"],
   "correctAnswer":0,
   "explanation":"State real estate licensing laws establish the legal framework for the real estate profession within each state. Key components: licensing requirements (age, education, exam, background check); license categories (broker, salesperson, broker associate); supervised relationships; prohibited acts ('grounds for discipline' such as fraud, misrepresentation, commingling, violation of fiduciary duty); real estate commission powers (rule-making, enforcement, examination); fee structures; CE requirements; consumer protections; trust account rules. Violations can result in license discipline (warnings, education requirements, fines, suspension, revocation) plus civil and criminal exposure."},

  # ── Practice of Real Estate (7) ─────────────────────────────────────────
  {"id":"re-nat-367","domain":"Practice of Real Estate","type":"single-choice",
   "question":"State insurance departments regulate TITLE INSURANCE in most states. Regulation typically includes:",
   "choices":["No regulation — title insurance is unregulated","Rate filing and approval (rates may be filed by the insurer and approved by the state, or set by the state directly); regulation of the title insurer's reserves and solvency; regulation of agent compensation; restrictions on inducements/kickbacks (RESPA Section 8 also applies)","Federal regulation only","Optional regulation"],
   "correctAnswer":1,
   "explanation":"Title insurance is regulated by state insurance departments. Key regulatory areas: (1) rate filing — premiums must be filed (and often approved) by the state, or in some states are set by state regulation; (2) reserves and solvency requirements for title insurers; (3) regulation of agent compensation and splits; (4) restrictions on inducements, kickbacks, and rebates (RESPA Section 8 also applies to title insurance referrals); (5) consumer disclosure requirements. The market's complex agent-insurer structure has produced varying regulatory approaches across states."},

  {"id":"re-nat-368","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The federal Community Reinvestment Act (CRA) of 1977 requires:",
   "choices":["All neighborhoods to be developed equally","FDIC-insured depository institutions (banks and savings associations) to help meet the credit needs of the communities in which they are chartered to do business — including low- and moderate-income areas — consistent with safe and sound operations; bank regulators evaluate CRA performance during examinations, and CRA ratings affect bank merger and branch approvals","Banks to fund affordable housing exclusively","Federal grants for any neighborhood"],
   "correctAnswer":1,
   "explanation":"The Community Reinvestment Act (CRA) requires FDIC-insured depository institutions (banks and savings associations) to affirmatively help meet credit needs in the communities they serve — including LOW- AND MODERATE-INCOME areas — consistent with safe and sound operations. The original purpose was to combat redlining. Federal bank regulators (OCC, Fed, FDIC) evaluate CRA performance during regular examinations. CRA ratings (Outstanding, Satisfactory, Needs to Improve, Substantial Noncompliance) affect bank merger and branch approvals. CRA does NOT apply to non-bank lenders like mortgage brokers and online lenders — a frequent policy criticism."},

  {"id":"re-nat-369","domain":"Practice of Real Estate","type":"single-choice",
   "question":"The Home Mortgage Disclosure Act (HMDA) requires certain financial institutions to:",
   "choices":["Lend a specified percentage to each ethnic group","Hide loan application data","No reporting","Report data about mortgage applications (including approvals, denials, and demographic characteristics) — to allow regulators and the public to identify potential fair-lending issues, including discriminatory patterns; data is publicly available and is a key source for identifying redlining and disparate-impact concerns"],
   "correctAnswer":3,
   "explanation":"The Home Mortgage Disclosure Act (HMDA) requires certain financial institutions to report data about mortgage applications and originations — including the applicant's race, ethnicity, sex, age, income, loan amount, action taken (approved, denied, withdrawn), and reason for denial. The data is published publicly, allowing regulators and fair-housing advocates to identify potential discriminatory lending patterns — including geographic patterns suggesting redlining. HMDA is a critical enforcement tool for fair-lending laws."},

  {"id":"re-nat-370","domain":"Practice of Real Estate","type":"single-choice",
   "question":"When a mortgage SERVICING is transferred to a new servicer, federal RESPA rules generally require:",
   "choices":["Written notice to the borrower at least 15 days before the transfer date (from the current servicer) AND at least 15 days after the transfer (from the new servicer) — disclosing the new servicer's name, address, contact information, and effective date","No notice required","Notice only upon request","Federal notice via the IRS"],
   "correctAnswer":0,
   "explanation":"RESPA Section 6 (servicing transfer rules) requires notice to borrowers when mortgage servicing is transferred. The CURRENT (transferring) servicer must give notice at least 15 days BEFORE the transfer date. The NEW servicer must give notice within 15 days AFTER. Notices must include the new servicer's name, address, contact information, effective date, and a statement of the borrower's rights. The notice protects borrowers from confusion about where to send payments and prevents late fees during transitions."},

  {"id":"re-nat-371","domain":"Practice of Real Estate","type":"single-choice",
   "question":"NAR's Code of Ethics requires that REALTORS®:",
   "choices":["Avoid all marketing","Cooperate with other brokers (Article 3, with limited exceptions), present all written offers as soon as possible (Article 1), avoid disparaging other practitioners (Article 15), avoid making unsolicited public comments about competitors (Article 12), and submit disputes with other REALTORS® to arbitration rather than litigation when applicable","Set commission rates jointly with other brokers","Only work with REALTORS®"],
   "correctAnswer":1,
   "explanation":"The NAR Code of Ethics governs REALTORS® (members of the National Association of Realtors — a subset of all real estate licensees). Key provisions: present all written offers promptly (Article 1), cooperate with other brokers (Article 3, with limited exceptions), avoid false or misleading statements about competitors (Article 12), submit disputes to arbitration rather than litigation when applicable (Article 17). Violations are handled through grievance committees and professional standards hearings. The Code is enforceable through membership discipline (fines, training requirements, suspension, expulsion) — separate from state licensing discipline."},

  {"id":"re-nat-372","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Pre-licensing education requirements vary widely by state but commonly require:",
   "choices":["A few hours of online study","Several days of classroom instruction","Substantial coursework — typically 60-180+ hours of state-approved curriculum (combination of national real estate principles and state-specific law and practice) before sitting for the licensing exam; some states require additional 'post-licensing' education within the first year","No coursework"],
   "correctAnswer":2,
   "explanation":"Pre-licensing education ranges from 40-180+ hours depending on the state — typically split between national real estate principles, finance, valuation, contracts, and ethics, plus state-specific law and commission rules. Some states (e.g., California requires 135 hours, Texas 180 hours) have substantial requirements; others are lower. Some states also require 'post-licensing' coursework within the first year of practice — additional training during the early career. Pre-licensing education is provided by state-approved schools (in-person, online, or hybrid)."},

  {"id":"re-nat-373","domain":"Practice of Real Estate","type":"single-choice",
   "question":"Most states maintain a REAL ESTATE RECOVERY FUND (sometimes called Real Estate Education, Research, and Recovery Fund). The fund's purpose:",
   "choices":["Pays broker advertising costs","Funds state real estate commission salaries","Operates as a state-funded retirement plan","Provides COMPENSATION to consumers who win civil judgments against a licensee for fraud, misrepresentation, or other misconduct but cannot collect — funded by licensee fee surcharges; payment from the fund typically results in suspension or revocation of the licensee's license until repayment"],
   "correctAnswer":3,
   "explanation":"State real estate recovery funds (where they exist — not all states have them) provide compensation to consumers who win civil judgments against a licensee for fraud, misrepresentation, breach of fiduciary duty, or other licensing-law-violating conduct, but cannot collect from the licensee directly. The funds are typically capped per claim and per claimant. Funded by licensee fee surcharges at licensing or renewal. Payment from the fund typically results in suspension or revocation of the licensee's license until repayment — a strong incentive for compliance."},

  # ── Financing (5) ───────────────────────────────────────────────────────
  {"id":"re-nat-374","domain":"Financing","type":"single-choice",
   "question":"A buyer wishes to ASSUME the seller's existing mortgage. The process typically requires:",
   "choices":["Buyer credit qualification by the existing lender, the lender's written approval, payment of an assumption fee, and a new agreement obligating the buyer on the loan; the original borrower (seller) typically remains secondarily liable UNLESS the lender releases them via a novation","No lender involvement","Automatic assumption by signing a deed","Federal court approval"],
   "correctAnswer":0,
   "explanation":"Loan assumption requires lender approval (most modern mortgages have due-on-sale clauses giving the lender control over transfers). Standard process: (1) buyer applies and qualifies with the existing lender, (2) lender approves and charges an assumption fee, (3) buyer signs an assumption agreement, (4) closing transfers title. The original borrower (seller) typically remains SECONDARILY liable on the loan UNLESS the lender expressly releases them via a NOVATION. VA and FHA loans have specific assumption rules; most conventional loans are not freely assumable due to due-on-sale clauses."},

  {"id":"re-nat-375","domain":"Financing","type":"single-choice",
   "question":"PITI is shorthand for the components of a typical residential mortgage payment placed in an escrow account by the lender. PITI stands for:",
   "choices":["Property tax, Interest, Title insurance, Insurance","Principal, Interest, Taxes (property taxes), Insurance (homeowners insurance) — and sometimes 'A' added (HOA/CDD) — collected as part of the monthly payment and held in escrow for tax and insurance payments","Profit, Interest, Time, Insurance","Principal, Inflation, Time, Income"],
   "correctAnswer":1,
   "explanation":"PITI is shorthand for the four core components of a typical residential mortgage payment: PRINCIPAL (amount that pays down the loan balance), INTEREST (lender's cost of credit on the outstanding balance), TAXES (annual property taxes divided by 12, deposited into an escrow account), and INSURANCE (homeowners insurance, also escrowed). Some payments also include 'A' — Association fees (HOA or condo fees, when collected by the lender). The lender pays taxes and insurance from the escrow account as bills come due, preventing tax-sale risk."},

  {"id":"re-nat-376","domain":"Financing","type":"single-choice",
   "question":"A 'loan modification' is:",
   "choices":["A new loan","An informal arrangement","A formal change to the existing loan's terms — e.g., reducing the interest rate, extending the loan term, capitalizing missed payments, or in some cases reducing the principal balance — typically requested by a borrower facing financial hardship; modifications are subject to lender approval","Required by federal law"],
   "correctAnswer":2,
   "explanation":"A loan modification is a formal change to an existing loan's terms — typically requested by a borrower facing financial hardship (job loss, medical expenses, divorce, etc.) — designed to make the loan more affordable and prevent foreclosure. Common modifications: rate reduction, term extension (e.g., 30 years to 40), capitalization of missed payments (adding them to the balance), or in some cases principal forgiveness/forbearance. Modifications require lender approval (and sometimes investor approval). Government programs (HAMP, Flex Modification) have provided structured frameworks for loan modifications during housing crises."},

  {"id":"re-nat-377","domain":"Financing","type":"single-choice",
   "question":"When a homeowner refinances a first mortgage without a subordination agreement from the second-mortgage holder, the priority of the existing second mortgage:",
   "choices":["Stays the same","Becomes federally insured","Is forfeited","Could potentially move UP to senior priority (because the new first mortgage is recorded LATER than the existing second) — exposing the new lender to subordinate priority. Lenders typically require subordination agreements from existing junior lienholders BEFORE refinancing"],
   "correctAnswer":3,
   "explanation":"Without a subordination agreement, refinancing a first mortgage can have a surprising effect: the EXISTING second mortgage could potentially move UP to senior priority because the new first is recorded LATER. This exposes the new lender (who thinks they're getting a first mortgage) to subordinate priority. To prevent this, lenders typically require subordination agreements from existing junior lienholders BEFORE closing on the refinance — formally subordinating the existing junior lien to the new first mortgage. Junior lienholders sometimes refuse, complicating refinances."},

  {"id":"re-nat-378","domain":"Financing","type":"single-choice",
   "question":"VA-guaranteed loans are notable for being:",
   "choices":["FREELY ASSUMABLE by qualified buyers (subject to a VA approval process), making VA assumptions a useful tool when interest rates rise","Non-assumable","Available only to active service members","Limited to homes under $200,000"],
   "correctAnswer":0,
   "explanation":"VA loans are notable for being freely assumable by qualified buyers (subject to VA approval) — including by NON-veterans. This can be very valuable when interest rates rise — a buyer assuming an existing 4% VA loan in a 7% market can save significant money. The VA charges a small assumption fee. However, the original veteran's VA entitlement may remain tied up unless the new borrower is also VA-eligible and substitutes their entitlement. Veterans considering selling should understand how assumption affects their entitlement availability for future VA loans."},

  # ── Real Estate Calculations (5) ────────────────────────────────────────
  {"id":"re-nat-379","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A $400,000 property sells with a 6% commission split as follows: 50% to the listing brokerage, 50% to the cooperating brokerage. The listing brokerage further splits its share 70/30 with the listing agent. How much does the LISTING AGENT receive?",
   "choices":["$3,600","$8,400","$12,000","$24,000"],
   "correctAnswer":1,
   "explanation":"Step 1 — Total commission: $400,000 × 6% = $24,000.\nStep 2 — Listing brokerage share: $24,000 × 50% = $12,000.\nStep 3 — Listing agent's 70% of listing brokerage share: $12,000 × 70% = $8,400.\nThe listing agent receives $8,400; the listing brokerage retains $3,600. The cooperating brokerage similarly splits its $12,000 with the buyer's agent on whatever terms they have arranged. Commission splits are widely variable in practice — some agents are on 50/50, others are on 80/20, some are flat fee, etc."},

  {"id":"re-nat-380","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A 5/1 ARM has an initial rate of 5%, with a 2/2/5 cap structure (2% initial adjustment cap, 2% periodic adjustment cap, 5% lifetime cap). After the initial 5-year fixed period, what is the MAXIMUM rate at the first adjustment?",
   "choices":["6%","7% — limited by the 2% initial adjustment cap (5% + 2% = 7%)","8%","10%"],
   "correctAnswer":1,
   "explanation":"Step 1 — interpret 2/2/5 caps:\n• 2% initial adjustment cap (max change at first adjustment)\n• 2% periodic adjustment cap (max change at each subsequent adjustment)\n• 5% lifetime cap (max increase over the loan's life)\nStep 2 — initial rate is 5%.\nStep 3 — first adjustment cannot exceed initial rate + initial cap: 5% + 2% = 7%.\nThe lifetime cap (5%) limits total increases to 10% maximum (5% + 5%). Subsequent adjustments cannot exceed the prior rate by more than 2%."},

  {"id":"re-nat-381","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A seller offers a 2-1 buy-down on a $300,000 mortgage with a 7% note rate. The COST of the buy-down is generally calculated as the total interest savings the borrower receives in years 1 and 2 from the reduced rates. Approximately how much does this 2-1 buy-down cost?",
   "choices":["$6,000","$8,500","$10,000","Approximately $9,000 — interest at 5% for year 1 saves ~$6,000 vs. 7%; interest at 6% for year 2 saves ~$3,000 vs. 7%; total ~$9,000 funded by the seller and escrowed for payment subsidies"],
   "correctAnswer":3,
   "explanation":"Approximate calculation:\nStep 1 — Year 1 interest savings (5% effective vs. 7% note):\n$300,000 × 2% (savings) = $6,000 (approximate; exact varies with amortization).\nStep 2 — Year 2 interest savings (6% effective vs. 7% note):\n$300,000 × 1% (savings) = $3,000.\nStep 3 — Total cost: $6,000 + $3,000 = $9,000.\nThe seller pays this lump sum at closing, escrowed by the lender to subsidize the borrower's payments in years 1 and 2. The exact figures depend on amortization (declining balance reduces savings slightly each month) and may include a small spread for the lender."},

  {"id":"re-nat-382","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A home is assessed at $300,000 with a homestead exemption of $50,000. The mill rate is 22 mills. What is the annual property tax?",
   "choices":["$5,500 — taxes are computed on assessed value MINUS exemption × mill rate = ($300,000 − $50,000) × 0.022 = $250,000 × 0.022 = $5,500","$6,600","$7,000","$11,000"],
   "correctAnswer":0,
   "explanation":"Step 1 — Apply the homestead exemption: $300,000 − $50,000 = $250,000 (taxable value after exemption).\nStep 2 — Convert mills to decimal: 22 mills = 22 ÷ 1,000 = 0.022.\nStep 3 — Tax = Taxable Value × Tax Rate: $250,000 × 0.022 = $5,500.\nHomestead exemptions reduce taxable value for owner-occupied primary residences. The exemption amount and rules vary by state — Florida, for example, has a generous $50,000 exemption plus 'Save Our Homes' assessment growth limits."},

  {"id":"re-nat-383","domain":"Real Estate Calculations","type":"single-choice",
   "question":"A borrower has a 30-year, $200,000 mortgage at 6% (monthly P&I payment ≈ $1,199). If the borrower makes one extra payment per year (effectively 13 payments instead of 12), the loan term is shortened by approximately:",
   "choices":["1 year","About 5 years — accelerating principal repayment by making one extra annual payment can cut roughly 5 years off a 30-year mortgage at typical rates","10 years","No effect"],
   "correctAnswer":1,
   "explanation":"Step 1 — Adding one extra payment per year (13 instead of 12) accelerates principal repayment.\nStep 2 — At typical 30-year mortgage rates (6-7%), one extra annual payment reduces the loan term by approximately 5 years and saves substantial interest.\nStep 3 — The exact savings depend on the rate, loan term, and how the extra payment is applied (must be designated 'principal only' to maximize impact). Some borrowers achieve similar benefits by making bi-weekly payments (26 half-payments = 13 monthly equivalents per year)."},

  # ── Property Ownership (4) ──────────────────────────────────────────────
  {"id":"re-nat-384","domain":"Property Ownership","type":"single-choice",
   "question":"A tenant occupies a property under a lease that can be terminated AT ANY TIME by EITHER party with no notice (in some states, with statutory notice). This is best described as:",
   "choices":["Periodic tenancy","Estate for years","Tenancy at will — can be terminated by either party at any time (with statutory notice in many states), typically with no fixed term","Tenancy at sufferance"],
   "correctAnswer":2,
   "explanation":"A tenancy at will is a leasehold that continues until terminated by either party. Modern statutes typically require some notice (often 30 days) even at will. It can arise expressly or by implication (e.g., when a tenant holds over with the landlord's tacit consent). It differs from: (1) Estate for years (fixed term, automatic termination), (2) Periodic tenancy (continues until proper notice), and (3) Tenancy at sufferance (tenant holds over without consent). Tenancy at will is the most flexible but also the least stable for either party."},

  {"id":"re-nat-385","domain":"Property Ownership","type":"single-choice",
   "question":"Easements can be CREATED in several ways. Which of the following is NOT a common method of easement creation?",
   "choices":["Express grant or reservation in a deed","Implied easement (from prior use or by necessity)","Easement by prescription (similar to adverse possession — open, notorious, continuous use for the statutory period)","Easement by mere statement — declaring an easement exists, with no supporting facts or documents"],
   "correctAnswer":3,
   "explanation":"Common methods of easement CREATION: (1) Express grant or reservation in a deed; (2) IMPLIED easement (from prior use of property when divided, OR by necessity — when a parcel would be landlocked without access); (3) Easement by PRESCRIPTION (similar to adverse possession — open, notorious, continuous, hostile use for the statutory period); (4) Easement by ESTOPPEL (when the servient owner permits and the dominant owner relies). Mere statement without supporting facts or documents does NOT create an enforceable easement — easements require some form of legal foundation."},

  {"id":"re-nat-386","domain":"Property Ownership","type":"single-choice",
   "question":"Easements can be TERMINATED in several ways. The most common include all of the following EXCEPT:",
   "choices":["Random expiration after 10 years with no other action — easements typically RUN WITH THE LAND and do not automatically expire","Merger (when the same person comes to own both dominant and servient parcels)","Release (the easement holder formally releases their right)","Abandonment — non-use combined with clear intent to abandon"],
   "correctAnswer":0,
   "explanation":"Common methods of easement TERMINATION: (1) MERGER — when the same person acquires title to both dominant and servient parcels, the easement merges into the unified title and ceases; (2) RELEASE — easement holder formally releases the right by written instrument; (3) ABANDONMENT — non-use combined with clear intent to abandon (the elements vary by state); (4) PRESCRIPTION — the servient owner blocks use openly for the statutory period; (5) END OF NECESSITY — when an easement by necessity is no longer needed; (6) CONDEMNATION. Easements do NOT automatically expire by mere passage of time — they typically run with the land."},

  {"id":"re-nat-387","domain":"Property Ownership","type":"single-choice",
   "question":"A 'profit à prendre' (or 'profit') in real estate is:",
   "choices":["A type of partnership","The right to TAKE SOMETHING FROM ANOTHER'S LAND — such as minerals, timber, oil, gas, or game — distinct from an easement (which is the right to USE another's land without taking)","A profit-sharing arrangement","A type of fee simple"],
   "correctAnswer":1,
   "explanation":"A profit à prendre (literally 'right to take') is the right to take resources from another's land — minerals, timber, oil and gas, sand and gravel, water (in some jurisdictions), or game. It differs from an easement, which is the right to USE the land (e.g., for crossing) without taking anything. Profits are typically created by grant, reservation, or sometimes implication. They can be in gross (belonging to a person) or appurtenant (benefiting another parcel). Mineral rights are the most economically significant profit à prendre in modern practice."},

  # ── Transfer of Title (4) ───────────────────────────────────────────────
  {"id":"re-nat-388","domain":"Transfer of Title","type":"single-choice",
   "question":"A 'title abstract' is:",
   "choices":["A summary of just the current deed","A short legal opinion","A summary of the public records affecting the title to a specific property — including all deeds, mortgages, judgments, liens, easements, and other recorded documents in the chain of title — historically prepared by an 'abstractor' for use by title attorneys or title insurance companies","An unrelated tax document"],
   "correctAnswer":2,
   "explanation":"A title abstract is a chronological summary of all public records affecting the title to a specific property — including deeds, mortgages, judgments, liens, easements, restrictive covenants, releases, and any other recorded documents in the chain of title. Historically, abstracts were prepared by professional 'abstractors' and reviewed by title attorneys (who would issue title opinions). Today, title insurance companies typically conduct title searches directly. Abstracts remain important in some jurisdictions and for historical research."},

  {"id":"re-nat-389","domain":"Transfer of Title","type":"single-choice",
   "question":"The Torrens registration system (used in a few US jurisdictions and some other countries):",
   "choices":["Is the same as title abstracting","Eliminates all need for title searches","Replaces traditional recording with a centralized registration of title — under which the registered owner has an indefeasible (presumed conclusive) title backed by a government assurance fund, eliminating the need for traditional title searches and most title insurance","Is a private property database"],
   "correctAnswer":2,
   "explanation":"The Torrens system (named for Sir Robert Torrens of Australia) is a title registration system used in a few US jurisdictions (parts of Hawaii, Minnesota, Massachusetts, Ohio, and several others) and many other countries. Under Torrens, the GOVERNMENT registers title with conclusive effect — the registered owner has an INDEFEASIBLE title backed by a government assurance fund. This eliminates the need for traditional title searches, abstracts, and most title insurance. Despite its advantages, Torrens has not become widely adopted in the US, where the traditional recording-plus-title-insurance system predominates."},

  {"id":"re-nat-390","domain":"Transfer of Title","type":"single-choice",
   "question":"At closing, the closing agent prepares a CLOSING STATEMENT (or Closing Disclosure, where TRID applies) detailing all the financial movements between the parties. The 'RECONCILIATION' process:",
   "choices":["Verifies that ALL debits equal ALL credits on the closing statement and that funds flow correctly from buyer, seller, lender, and other parties to satisfy the transaction — the totals MUST balance, or the closing cannot occur","Eliminates closing costs","Adds new charges","Is performed only after closing"],
   "correctAnswer":0,
   "explanation":"At closing, the closing statement (or Closing Disclosure under TRID) must RECONCILE — total debits must equal total credits for each party (buyer side and seller side balance, and the closing agent's escrow account balances with funds in and funds out). The closing agent verifies that funds flow correctly: buyer's down payment plus loan proceeds plus seller's contributions equal the purchase price plus closing costs plus other adjustments. If totals don't reconcile, the closing cannot proceed until errors are corrected — a critical control."},

  {"id":"re-nat-391","domain":"Transfer of Title","type":"single-choice",
   "question":"When a foreign person (non-resident alien) sells US real property, the buyer must withhold a percentage under FIRPTA. The buyer (and closing agent) should also be aware that:",
   "choices":["Federal law preempts state foreign-buyer rules","Foreign sellers must obtain a US ITIN (Individual Taxpayer Identification Number) and may be required to make estimated tax payments; state-level laws may also impose ADDITIONAL withholding requirements (e.g., California, Hawaii, and several other states impose state-level withholding on foreign or out-of-state sellers)","All foreign transactions are exempt","FIRPTA applies only to commercial property"],
   "correctAnswer":1,
   "explanation":"FIRPTA federal withholding (typically 15% of gross sale proceeds for residential, 10% under certain residential thresholds) is just one layer. Foreign sellers must also: obtain a US ITIN for tax compliance; file US tax returns to report the sale and pay any actual tax (or claim a refund of over-withholding); be aware of state-level withholding requirements (California, Hawaii, several others impose additional state withholding on out-of-state or foreign sellers). Closing agents must navigate both federal FIRPTA and any applicable state withholding requirements."},

  # ── Valuation and Market Analysis (3) ───────────────────────────────────
  {"id":"re-nat-392","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"In appraisal, the LAND-TO-VALUE RATIO (sometimes called land-to-improvement ratio) describes:",
   "choices":["The ratio between the land's value and the total property value (or between land and improvements) — used by appraisers and tax assessors to allocate value between land and structures and to determine depreciation; varies by neighborhood and use","The amount of land owned","Tax rates","Crop yield"],
   "correctAnswer":2,
   "explanation":"Land-to-value (or land-to-improvement) ratio describes the proportion of a property's total value attributable to land versus improvements. Used for: (1) appraisal allocation (cost approach uses separate land and improvement values); (2) tax assessment (separately taxing land and improvements in some jurisdictions); (3) depreciation calculation (only improvements depreciate — land doesn't, in most accounting). Ratios vary widely — urban tear-downs may have 80%+ land value, while rural special-purpose buildings may have 20-30% land value. Knowing the typical ratio for a neighborhood helps appraisers ground their analyses."},

  {"id":"re-nat-393","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"In appraisal, EXTERNALITIES are factors OUTSIDE the property that affect its value. Examples include:",
   "choices":["The age of the property's foundation","The number of bedrooms","Only the property's own condition","POSITIVE externalities (nearby parks, good schools, transportation access, neighborhood prestige) and NEGATIVE externalities (nearby noise, pollution, hazards, undesirable land uses, declining surrounding neighborhoods) — both affect value without being part of the subject property itself"],
   "correctAnswer":3,
   "explanation":"Externalities are factors OUTSIDE a property that affect its value. POSITIVE externalities INCREASE value: parks, good schools, transportation access, neighborhood prestige, well-maintained surrounding properties. NEGATIVE externalities REDUCE value: nearby industrial noise/pollution, declining surrounding neighborhoods, undesirable land uses (waste facilities, prisons, certain commercial uses), traffic congestion, environmental hazards. External obsolescence (a form of depreciation in the cost approach) captures the loss caused by negative externalities — typically the hardest type of depreciation to cure because the cause is outside the owner's control."},

  {"id":"re-nat-394","domain":"Valuation and Market Analysis","type":"single-choice",
   "question":"A Comparative Market Analysis (CMA) prepared by a real estate agent for a seller:",
   "choices":["Is a formal appraisal","Is regulated by USPAP","Eliminates the need for an appraisal","Is an informal market analysis prepared by an agent for marketing purposes — comparing recent sales, current listings, and expired listings to suggest a probable selling price; CMAs are not formal appraisals, are not subject to USPAP, and should not be represented as such; agents should clearly disclose the nature and limits of CMAs"],
   "correctAnswer":3,
   "explanation":"CMAs are informal market analyses prepared by real estate agents for marketing purposes — typically to help sellers price a property or buyers make competitive offers. They compare recent SOLD properties (the best indicator), current LISTED properties (competition), and EXPIRED listings (overpriced misses) in the immediate area. CMAs are NOT formal appraisals, are NOT subject to USPAP, and should NOT be presented as such. Agents should clearly disclose that CMAs are agent-prepared market analyses, not appraisals — and recommend formal appraisal for legally significant valuations."},

  # ── Property Disclosures (3) ────────────────────────────────────────────
  {"id":"re-nat-395","domain":"Property Disclosures","type":"single-choice",
   "question":"Termite (wood-destroying insect) inspections in most residential transactions:",
   "choices":["Are federally mandatory","Are commonly required by lenders (especially for VA and FHA loans), often required by purchase contracts, and (in many states) the seller must disclose any known termite activity or treatment; buyers commonly arrange a 'WDO' (wood-destroying organism) inspection during the inspection period","Are illegal","Are required only in California"],
   "correctAnswer":1,
   "explanation":"Termite (or 'WDO' — wood-destroying organism) inspections are commonly part of residential closings. Required: by FHA and VA loans (mandatory), often by conventional lenders (especially in active termite areas), and frequently by purchase contracts. State disclosure laws often require the seller to disclose known termite activity, prior treatments, ongoing treatment contracts, and known damage. WDO inspectors check for active infestations, prior damage, and conditions conducive to infestation (moisture, wood-soil contact, etc.). Reports typically come in two parts: active infestation findings and recommendations."},

  {"id":"re-nat-396","domain":"Property Disclosures","type":"single-choice",
   "question":"A roof's age and condition are typically required to be disclosed in residential transactions because:",
   "choices":["Roofs are irrelevant","Roofs are federal property","Roof condition and remaining service life can substantially affect the property's value and require costly near-term replacement (typical roofs last 15-30 years depending on material); most state disclosure forms ask about roof age, recent leaks, and any repair or replacement history","Roof inspection is mandatory in all states"],
   "correctAnswer":2,
   "explanation":"Roof age and condition are routinely disclosed in residential transactions because of their substantial impact on near-term ownership costs. Typical roof lifespans: asphalt shingles (15-30 years depending on quality), metal (40-70 years), tile (50+ years), wood shake (20-25 years), concrete tile (50+ years). State disclosure forms typically ask about roof age, recent leaks or repairs, current condition, any current claims, and known issues. A new roof can add $10,000-30,000+ in value; one nearing replacement can subtract substantial value. Insurance also factors heavily — older roofs often require replacement to maintain coverage."},

  {"id":"re-nat-397","domain":"Property Disclosures","type":"single-choice",
   "question":"A property is served by an on-site SEPTIC SYSTEM rather than municipal sewer. Most state disclosure laws would require disclosure of:",
   "choices":["The septic system's existence only","Only the homeowner's preferred pumping schedule","No disclosure","Existence and type of system, location and age, pumping/maintenance history, any known issues or recent failures, and inspection results — septic systems are major property components subject to substantial repair costs and regulatory requirements"],
   "correctAnswer":3,
   "explanation":"Septic systems are major property components that affect value, ongoing costs, and regulatory compliance. Most state disclosure laws and industry practice require detailed disclosure: (1) system existence and type (conventional, mound, aerobic, etc.); (2) location and age; (3) pumping/maintenance history; (4) known issues or recent failures; (5) inspection results (where available); (6) compliance status with applicable health-department requirements. Many states require pre-sale septic inspections or compliance certifications. Failed systems can cost $15,000-40,000+ to replace and may require properly-sized building permits."},

  # ── Land Use Controls and Regulations (2) ───────────────────────────────
  {"id":"re-nat-398","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"The 'PUBLIC TRUST DOCTRINE' generally provides:",
   "choices":["That certain natural resources (especially navigable waterways and tidelands, including the beaches up to the mean high tide line) are held by the state in trust for the public — and cannot be conveyed in fee simple to private parties in ways that defeat the public's traditional rights of fishing, navigation, and (in many states) beach access","That private property cannot be sold","That all land belongs to the government","That mineral rights are public"],
   "correctAnswer":0,
   "explanation":"The public trust doctrine — rooted in Roman law and English common law, applied differently across US states — holds that certain natural resources are held by the state in TRUST for the public benefit. The most universal applications: navigable waterways and tidelands (typically up to the mean high tide line). Public trust rights traditionally include fishing, navigation, and (in many states) beach access. The state cannot convey trust resources to private parties in ways that defeat these public rights. The doctrine has been expanded by some state courts to apply to other ecologically significant resources."},

  {"id":"re-nat-399","domain":"Land Use Controls and Regulations","type":"single-choice",
   "question":"A CONSERVATION EASEMENT:",
   "choices":["Is a federal park designation","Is a private contract between landowners and a qualified land trust or government entity that PERMANENTLY restricts development on the property — preserving open space, ecological value, or historic character — in exchange for tax benefits to the landowner; runs with the land and binds all future owners","Is a temporary zoning restriction","Eliminates property tax"],
   "correctAnswer":1,
   "explanation":"A conservation easement is a voluntary, permanent restriction on a property's development potential — granted by the landowner to a qualified land trust or government entity. The restriction limits future development, subdivision, or use to preserve conservation values (ecological, agricultural, scenic, historic, open space). The landowner retains ownership but gives up development rights. In exchange, the landowner typically receives FEDERAL INCOME TAX DEDUCTIONS (for the donated value of development rights) and STATE/LOCAL PROPERTY TAX REDUCTIONS. Conservation easements run with the land and bind all future owners — preserving conservation value in perpetuity."},

  # ── Leasing and Property Management (1) ─────────────────────────────────
  {"id":"re-nat-400","domain":"Leasing and Property Management","type":"single-choice",
   "question":"In most states, a residential landlord seeking to evict a tenant for non-payment must follow a specific judicial process — typically:",
   "choices":["Self-help eviction — the landlord may simply remove the tenant","Lock-changing by the landlord","Service of a statutory NOTICE (e.g., 3-day to 10-day notice depending on state), filing an UNLAWFUL DETAINER or EVICTION ACTION in court, obtaining a JUDGMENT, and arranging for ENFORCEMENT by the sheriff or marshal — self-help eviction by the landlord is generally illegal","Federal court only"],
   "correctAnswer":2,
   "explanation":"Eviction is a judicial process. Self-help eviction (landlord changes locks, removes possessions, shuts off utilities) is GENERALLY ILLEGAL — exposing the landlord to civil liability for wrongful eviction and sometimes statutory penalties. The proper process: (1) STATUTORY NOTICE to the tenant (e.g., 3-day notice to pay or quit, or longer for non-monetary defaults — exact timing varies by state); (2) if the tenant doesn't cure, file an UNLAWFUL DETAINER (or summary process or eviction) action in court; (3) obtain a JUDGMENT for possession; (4) request a writ of possession; (5) the SHERIFF or MARSHAL physically removes the tenant. The process typically takes 30-60+ days in most states."},
]

data.extend(new_qs)
Q.write_text(json.dumps(data, indent=2), encoding="utf-8")
print(f"Written: {len(data)} questions")
