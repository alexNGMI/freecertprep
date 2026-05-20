import { writeFile } from 'node:fs/promises'

const OUT = new URL('../src/data/real-estate-nc-state-questions.json', import.meta.url)

const DOMAINS = [
  { name: 'Licensure', target: 20 },
  { name: 'Agency', target: 107 },
  { name: 'Supervision / Compensation', target: 27 },
  { name: 'Brokerage Practice', target: 80 },
  { name: 'Taxes / Insurance', target: 27 },
  { name: 'Contracts / Closing', target: 47 },
  { name: 'Landlord / Tenant', target: 20 },
  { name: 'Other North Carolina Laws', target: 72 },
]

const SCENARIOS = [
  ['Charlotte', 'provisional broker', 'resale home'],
  ['Raleigh', 'broker-in-charge', 'townhome listing'],
  ['Durham', 'buyer agent', 'condominium purchase'],
  ['Asheville', 'listing agent', 'mountain cabin'],
  ['Wilmington', 'property manager', 'beach rental'],
  ['Greensboro', 'firm qualifying broker', 'commercial lease'],
  ['Cary', 'team lead', 'new-construction sale'],
  ['Chapel Hill', 'broker', 'duplex transaction'],
  ['Fayetteville', 'seller agent', 'vacant lot'],
  ['Winston-Salem', 'limited nonresident commercial broker', 'office building'],
  ['Boone', 'buyer representative', 'land purchase'],
  ['New Bern', 'affiliated broker', 'historic home'],
]

const CLIENTS = [
  'Avery Morgan', 'Jordan Ellis', 'Taylor Reyes', 'Morgan Shah', 'Riley Chen',
  'Cameron Brooks', 'Casey Alvarez', 'Quinn Patel', 'Skyler Bennett', 'Drew Lawson',
  'Emerson Reed', 'Harper Collins', 'Parker Singh', 'Rowan Kim', 'Finley Price',
  'Sage Turner', 'Reese Martin', 'Kendall Hayes', 'Devon Wallace', 'Blair Mitchell',
  'Hayden Rivera', 'Logan Foster', 'Micah Bell', 'Jamie Ortiz', 'Robin Carter',
  'Alex Grant', 'Bailey Hughes', 'Dakota Ward', 'Elliot Stone', 'Kris Bennett',
  'Marlowe Banks', 'Reagan Flores', 'Shawn Cooper', 'Terry Coleman', 'Noel Diaz',
  'Leslie Vaughn', 'Dana Russell', 'Arden Cruz', 'Milan Perry', 'Kasey Powell',
]

const PHASES = [
  'first substantial contact',
  'agency disclosure review',
  'offer preparation',
  'due diligence negotiation',
  'trust-account review',
  'closing coordination',
  'BIC file review',
  'post-closing complaint intake',
]

function cleanChoices(choices) {
  return [...new Set(choices)]
}

function makeQuestion(domain, spec, seq, variant) {
  const [city, role, property] = SCENARIOS[(seq + variant) % SCENARIOS.length]
  const client = CLIENTS[(seq + variant) % CLIENTS.length]
  const stem = `${spec.stem({ city, role, property, variant })} The issue is raised by ${client} during ${PHASES[(seq + variant) % PHASES.length]}.`
  const choices = cleanChoices([spec.correct, ...spec.distractors])
  if (choices.length !== 4) throw new Error(`Bad choices for ${domain}: ${stem}`)
  const rotation = seq % choices.length
  const rotated = choices.slice(rotation).concat(choices.slice(0, rotation))
  return {
    id: `re-nc-${seq}`,
    domain,
    type: 'single-choice',
    portion: 'state',
    question: stem,
    choices: rotated,
    correctAnswer: rotated.indexOf(spec.correct),
    explanation: spec.explanation({ city, role, property }),
  }
}

const BANK = {
  'Licensure': [
    {
      correct: 'North Carolina issues broker licenses; most new individual licensees start as provisional brokers',
      distractors: ['North Carolina issues salesperson licenses only', 'North Carolina issues appraiser licenses through NCREC', 'North Carolina allows unlicensed assistants to independently list property'],
      stem: ({ city }) => `A ${city} applicant asks what entry-level real estate license status North Carolina uses.`,
      explanation: () => 'North Carolina is a broker-only licensing state. Most new individual licensees receive an inactive broker license on provisional status and become active only when properly affiliated and supervised.',
    },
    {
      correct: 'Complete the 75-hour Broker Prelicensing Course unless the Commission grants an allowed education/experience qualification',
      distractors: ['Complete a 30-hour salesperson course', 'Complete only continuing education after passing the exam', 'Complete no education if sponsored by a firm'],
      stem: ({ role }) => `A ${role} wants to qualify for the North Carolina broker license examination through the standard education path.`,
      explanation: () => 'The standard education path is the North Carolina Broker Prelicensing Course containing at least 75 instructional hours. Other qualification options exist, but sponsorship by a firm does not erase the education requirement.',
    },
    {
      correct: 'Be at least 18, have a Social Security number, satisfy lawful-presence/work authorization rules, pass required exam sections, and satisfy character review',
      distractors: ['Be 21 and hold a college degree in any subject', 'Have only a firm endorsement and a local business license', 'Pass only the national section regardless of application basis'],
      stem: ({ city }) => `A ${city} candidate asks for the core individual license qualifications in North Carolina.`,
      explanation: () => 'NCREC lists age, Social Security number, lawful presence/work authorization, education qualification, application filing, required exam passage, and character fitness as core individual broker license qualifications.',
    },
    {
      correct: 'Current licensees from another jurisdiction may qualify to take only the NC state section or bypass the exam under the Commission rules',
      distractors: ['Every out-of-state licensee must retake both sections', 'Every out-of-state licensee is automatically active in NC', 'Only the national section is ever required for out-of-state applicants'],
      stem: ({ role }) => `A ${role} holds an active real estate license in another state and asks how North Carolina treats the examination requirement.`,
      explanation: () => 'Under the current licensure option, an applicant licensed in another jurisdiction may be allowed to take only the NC state section or bypass the exam, depending on the option used and Commission requirements.',
    },
    {
      correct: 'A criminal record report and character disclosure review may be required before license issuance',
      distractors: ['Character review occurs only after the first renewal', 'Only traffic citations are reviewed', 'A broker-in-charge can waive all character requirements'],
      stem: ({ city }) => `A ${city} applicant discloses a prior criminal matter on the license application.`,
      explanation: () => 'NCREC requires applicants to satisfy the Commission that they possess the requisite character for licensure. Criminal record reports and disclosure documents may be part of that review before issuance.',
    },
  ],
  'Agency': [
    {
      correct: 'Provide and review the Working With Real Estate Agents disclosure at first substantial contact',
      distractors: ['Wait until closing to explain agency relationships', 'Use only a verbal explanation after the offer is accepted', 'Provide the brochure only to sellers, never buyers'],
      stem: ({ role, property }) => `A ${role} begins discussing confidential needs with a prospective buyer for a ${property}.`,
      explanation: () => 'North Carolina brokers use the Working With Real Estate Agents disclosure to explain agency choices at first substantial contact, before the consumer shares confidential information.',
    },
    {
      correct: 'Reduce the buyer agency agreement to writing no later than submission of an offer',
      distractors: ['Buyer agency may remain oral through closing', 'A written agreement is required only after loan approval', 'A buyer agency agreement is never required in NC'],
      stem: ({ city }) => `A buyer working with a ${city} broker is ready to submit an offer under buyer agency.`,
      explanation: () => 'NC practice allows an oral buyer agency relationship for a limited time, but it must be put in writing no later than the time an offer is submitted on behalf of the buyer.',
    },
    {
      correct: 'A listing agreement must be written from the beginning of the seller agency relationship',
      distractors: ['A listing can stay oral until the property goes under contract', 'A listing agreement is optional if the MLS is not used', 'Only the buyer agency agreement must ever be written'],
      stem: ({ city, property }) => `A ${city} owner wants a broker to list a ${property} for sale.`,
      explanation: () => 'Seller agency through a listing agreement must be in writing. Unlike short-lived oral buyer agency, a listing is not properly created as an open-ended oral agreement.',
    },
    {
      correct: 'Dual agency requires informed written authority from the parties before the broker may act as a dual agent',
      distractors: ['Dual agency is automatic whenever two brokers share a firm', 'Dual agency eliminates all loyalty duties', 'Dual agency can be created secretly after closing'],
      stem: ({ city }) => `One ${city} firm may represent both the buyer and seller in the same transaction.`,
      explanation: () => 'North Carolina permits dual agency only with proper informed authorization. The firm must handle confidentiality carefully and cannot treat dual agency as automatic or undisclosed.',
    },
    {
      correct: 'Designated agency allows the firm to appoint different agents for each side when properly authorized',
      distractors: ['Designated agency means the agents work for separate firms', 'Designated agency is always prohibited in NC', 'Designated agency lets confidential information be shared freely across sides'],
      stem: ({ role }) => `A ${role} asks how one firm can represent both parties while assigning separate agents.`,
      explanation: () => 'Designated agency is a form of authorized dual agency in which the firm designates different agents to work with each party. It requires proper authorization and protection of confidential information.',
    },
    {
      correct: 'A seller subagent owes agency duties to the seller, not to the buyer',
      distractors: ['A seller subagent represents the buyer', 'A seller subagent has no duties to anyone', 'A seller subagent automatically becomes a dual agent'],
      stem: ({ city }) => `A ${city} broker helps a buyer but is acting as a seller subagent in the MLS offer of cooperation.`,
      explanation: () => 'A seller subagent works on behalf of the seller and owes agency duties to the seller, while still owing honesty and fairness to the buyer. This is why agency disclosure is tested heavily in NC.',
    },
    {
      correct: 'The broker must preserve confidential information such as motivation, bargaining limits, and personal financial pressure',
      distractors: ['The broker should disclose every client motive to speed negotiations', 'Confidential information expires when an offer is rejected', 'Confidential information can be shared with any buyer who asks'],
      stem: ({ role }) => `A seller tells a ${role} privately that the seller will accept much less because of job relocation.`,
      explanation: () => 'Agency duties include confidentiality. A broker must not disclose a client’s private motivation or bargaining position unless authorized or legally required.',
    },
    {
      correct: 'A broker must treat all parties honestly even when representing only one party',
      distractors: ['A broker may mislead customers if the client benefits', 'Honesty is owed only to clients', 'Nonclients have no protection under NC brokerage rules'],
      stem: ({ city }) => `A ${city} listing broker speaks with an unrepresented buyer at a showing.`,
      explanation: () => 'A broker owes loyalty to the client but must still deal honestly and fairly with customers. Agency status does not permit misrepresentation.',
    },
    {
      correct: 'Material facts known or reasonably discoverable by the broker must be disclosed',
      distractors: ['Only facts written on the seller disclosure form matter', 'Material facts may be hidden if the client instructs silence', 'Only facts discovered by the buyer inspector matter'],
      stem: ({ property }) => `A broker knows of a serious structural issue affecting a ${property}.`,
      explanation: () => 'North Carolina brokers must disclose material facts they know or should reasonably know. Client loyalty does not authorize concealment of material facts.',
    },
    {
      correct: 'The broker should clarify agency status before receiving confidential information',
      distractors: ['The broker should collect confidential details first and explain agency later', 'Agency status matters only after closing', 'Consumers must guess who the broker represents'],
      stem: ({ city }) => `At an open house in ${city}, a buyer starts discussing maximum price and urgency.`,
      explanation: () => 'Agency disclosure is meant to prevent consumers from unknowingly sharing confidential information with a broker who does not represent them. Clarification should occur at first substantial contact.',
    },
  ],
  'Supervision / Compensation': [
    {
      correct: 'A provisional broker must be supervised by a broker-in-charge to be on active status',
      distractors: ['A provisional broker may operate independently immediately', 'A provisional broker supervises the BIC', 'A provisional broker needs only a county privilege license'],
      stem: ({ city }) => `A newly licensed provisional broker in ${city} wants to start brokerage activity.`,
      explanation: () => 'A provisional broker must be affiliated with and supervised by a broker-in-charge to activate and lawfully provide brokerage services in North Carolina.',
    },
    {
      correct: 'A BIC is responsible for office supervision, trust accounts, records, advertising, and supervision of provisional brokers',
      distractors: ['A BIC only unlocks the office each day', 'A BIC is responsible only for personal sales files', 'A BIC has no role in advertising or trust accounts'],
      stem: ({ city }) => `A ${city} office asks what duties belong to the broker-in-charge.`,
      explanation: () => 'NCREC describes the BIC as responsible for key office-level duties including supervision, trust/escrow accounts, transaction records, advertising, and supervising affiliated provisional brokers.',
    },
    {
      correct: 'A broker generally receives compensation through the broker’s affiliated firm or broker-in-charge arrangement, not directly outside supervision',
      distractors: ['A provisional broker can collect commission directly from the public without firm oversight', 'An unlicensed assistant may receive a brokerage commission', 'A seller can bypass all firm policies by paying the agent personally'],
      stem: ({ role }) => `A ${role} wants a buyer to pay the commission directly to the individual agent outside the firm records.`,
      explanation: () => 'Compensation for brokerage activity must be handled through the proper licensed brokerage structure. Direct side payments that evade firm supervision create license-law and recordkeeping problems.',
    },
    {
      correct: 'A firm license and qualifying broker are required for a business entity conducting brokerage',
      distractors: ['Any LLC may broker real estate without a firm license', 'Only the trade name filing is required', 'A firm license is needed only for commercial property'],
      stem: ({ city }) => `A ${city} LLC wants to list property for others for compensation.`,
      explanation: () => 'A business entity that conducts brokerage in North Carolina must hold a firm license and have an appropriate qualifying broker. Entity formation alone is not a brokerage license.',
    },
    {
      correct: 'The BIC must notify the Commission when no longer serving as BIC of an office',
      distractors: ['No notice is needed if clients are not affected', 'Only the MLS must be notified', 'Notice can wait until the next license renewal'],
      stem: ({ city }) => `A ${city} broker-in-charge leaves the office assignment.`,
      explanation: () => 'NCREC materials identify BIC designation changes as reportable. The BIC is expected to notify the Commission when no longer serving as BIC of a particular office.',
    },
  ],
  'Brokerage Practice': [
    {
      correct: 'A person or entity must have an NC real estate license to conduct brokerage for others for compensation',
      distractors: ['Anyone may negotiate sales for others if paid after closing', 'Only residential sales require licensure', 'A license is unnecessary if the property is commercial'],
      stem: ({ city, property }) => `An unlicensed person in ${city} offers to negotiate a ${property} sale for a fee.`,
      explanation: () => 'North Carolina generally requires a real estate license for anyone who conducts brokerage activity for others for compensation, including sales, leasing, and negotiation activities.',
    },
    {
      correct: 'Trust money must be handled through proper trust or escrow procedures and records',
      distractors: ['Earnest money may be held in a broker’s personal account', 'Trust money may be used temporarily for firm expenses', 'Records are unnecessary if the parties trust the broker'],
      stem: ({ role }) => `A ${role} receives earnest money connected with a North Carolina offer.`,
      explanation: () => 'NC brokerage practice requires careful trust money handling, deposit, reconciliation, and recordkeeping. Client funds must not be mixed with personal or operating funds.',
    },
    {
      correct: 'Transaction records must be retained and available for Commission review',
      distractors: ['Records may be discarded as soon as closing occurs', 'Only rejected offers need to be retained', 'Records belong only to the closing attorney'],
      stem: ({ city }) => `A ${city} firm is reviewing old transaction files after a complaint.`,
      explanation: () => 'The BIC and firm must retain transaction records as required by Commission rules. Proper records support supervision and allow Commission review.',
    },
    {
      correct: 'Advertising must identify the broker or firm accurately and avoid misleading the public',
      distractors: ['A team may advertise without any firm identity', 'Advertising rules apply only to newspapers', 'A broker may advertise a listing without authority'],
      stem: ({ city }) => `A ${city} team prepares social media ads for listed property.`,
      explanation: () => 'NC brokerage advertising must not be false, misleading, or unauthorized. Firm identity, listing authority, and accurate property information are frequent exam concerns.',
    },
    {
      correct: 'A broker must disclose known material facts, including facts about the property, transaction, or a party’s ability to perform',
      distractors: ['Only physical defects are material facts', 'A broker may ignore financial inability to close', 'A broker discloses material facts only to clients'],
      stem: ({ property }) => `During a ${property} transaction, a broker learns the buyer likely cannot perform under the contract.`,
      explanation: () => 'NC material fact duties are broad. They can involve property condition, transaction facts, or a party’s ability to perform, and known material facts must be disclosed appropriately.',
    },
    {
      correct: 'Brokers should avoid unauthorized practice of law and recommend legal counsel for legal interpretation',
      distractors: ['Brokers may give binding title opinions', 'Brokers may draft custom legal rights without review', 'Brokers replace closing attorneys in NC'],
      stem: ({ role }) => `A ${role} is asked to interpret a complex easement and draft custom deed language.`,
      explanation: () => 'North Carolina uses attorney involvement in closings, and brokers must avoid unauthorized practice of law. Complex legal interpretation or drafting should be referred to legal counsel.',
    },
    {
      correct: 'Limited nonresident commercial brokers may engage only within the restricted commercial arrangement allowed by NC rules',
      distractors: ['An LNCL broker may sell NC residential homes freely', 'An LNCL broker becomes a full NC broker automatically', 'An LNCL broker needs no NC supervision or cooperation agreement'],
      stem: ({ role }) => `A ${role} wants to handle both commercial and residential NC deals under a limited nonresident commercial license.`,
      explanation: () => 'The limited nonresident commercial license is restricted to commercial real estate transactions and requires compliance with the specific NC affiliation and cooperation structure.',
    },
    {
      correct: 'A broker should use accurate, current forms and explain business terms without giving legal advice',
      distractors: ['A broker should use outdated forms if familiar', 'A broker should promise legal outcomes', 'A broker should leave all blanks for the closing attorney without client review'],
      stem: ({ city }) => `A ${city} buyer is preparing an offer using North Carolina transaction forms.`,
      explanation: () => 'Competent brokerage practice includes accurate form use and explanation of business terms within the broker’s role. Legal interpretation and custom legal drafting belong with attorneys.',
    },
  ],
  'Taxes / Insurance': [
    {
      correct: 'Property tax prorations and tax status can materially affect closing costs and ownership expense',
      distractors: ['Property taxes never affect residential closings', 'Tax prorations are handled only after recording', 'Brokers should ignore tax status because lenders handle everything'],
      stem: ({ property }) => `A buyer asks how county property taxes may affect a ${property} closing.`,
      explanation: () => 'North Carolina transactions commonly involve tax prorations, assessed value, exemptions, and closing adjustments. Brokers should identify the issue and recommend appropriate tax or closing review.',
    },
    {
      correct: 'A broker should recommend insurance review for flood, hazard, wind, and other property risks',
      distractors: ['A broker should guarantee coverage availability', 'Insurance review is unnecessary if the property is financed', 'Flood insurance matters only after closing'],
      stem: ({ city, property }) => `A ${city} buyer is purchasing a ${property} with possible flood or storm exposure.`,
      explanation: () => 'Insurance availability, cost, flood requirements, and coverage exclusions can materially affect a transaction. A broker should recommend timely review by insurance professionals.',
    },
    {
      correct: 'Transfer taxes, excise taxes, recording fees, and prorations should be handled according to the contract and closing statement',
      distractors: ['Closing costs are always paid by the buyer regardless of contract', 'Taxes are never shown on settlement statements', 'Brokers may secretly change prorations at closing'],
      stem: ({ role }) => `A ${role} reviews estimated closing costs in a North Carolina sale.`,
      explanation: () => 'NC closing practice includes contract-based allocation of costs, taxes, recording fees, and prorations. The closing statement and attorney/title process should reflect the parties’ agreement and law.',
    },
    {
      correct: 'Brokers should avoid giving tax advice and recommend tax professionals for tax consequences',
      distractors: ['Brokers should guarantee capital gains treatment', 'Brokers should prepare income tax returns for clients', 'Brokers should tell all sellers no tax consequences exist'],
      stem: ({ city }) => `A ${city} seller asks whether sale proceeds will create income tax liability.`,
      explanation: () => 'Brokers can identify that tax consequences may exist but should not give tax advice. Clients should be referred to qualified tax professionals for personal tax questions.',
    },
  ],
  'Contracts / Closing': [
    {
      correct: 'The due diligence fee is typically paid directly to the seller and is negotiated separately from earnest money',
      distractors: ['The due diligence fee is always refunded after inspections', 'The due diligence fee is always held by the broker until closing', 'The due diligence fee replaces the purchase price'],
      stem: ({ city }) => `A ${city} buyer asks how the North Carolina due diligence fee differs from earnest money.`,
      explanation: () => 'In the common NC residential contract, the due diligence fee is negotiated and paid to the seller for the buyer’s due diligence rights. Earnest money is a separate deposit typically handled through escrow.',
    },
    {
      correct: 'The buyer’s due diligence period is the negotiated time to inspect, investigate, and decide whether to terminate under the contract',
      distractors: ['The due diligence period automatically lasts until recording', 'Only the seller may inspect during due diligence', 'The due diligence period exists only for cash sales'],
      stem: ({ property }) => `A buyer under contract for a ${property} wants to investigate condition, title, loan, and neighborhood issues.`,
      explanation: () => 'The due diligence period is a central NC contract feature. It gives the buyer a negotiated window to investigate and decide whether to proceed or terminate according to the contract.',
    },
    {
      correct: 'North Carolina closings commonly involve a licensed attorney handling title, documents, and settlement functions',
      distractors: ['Brokers conduct all NC residential closings without attorneys', 'The lender’s appraiser prepares the deed', 'A broker may issue a legal title opinion'],
      stem: ({ city }) => `A ${city} buyer asks who handles legal closing work in a North Carolina residential transaction.`,
      explanation: () => 'NC closings involve attorney-performed legal work such as title examination, deed preparation, and settlement functions. Brokers coordinate but should not perform legal services.',
    },
    {
      correct: 'A counteroffer rejects the original offer and creates a new offer on changed terms',
      distractors: ['A counteroffer automatically accepts the original offer', 'A counteroffer leaves the original offer open forever', 'A counteroffer is never capable of acceptance'],
      stem: ({ role }) => `A ${role} receives a seller response changing price and closing date.`,
      explanation: () => 'General contract law applies: a counteroffer rejects the prior offer and proposes changed terms. Mutual assent to the same terms is required for contract formation.',
    },
    {
      correct: 'Brokers should track contract deadlines and communicate them promptly to clients',
      distractors: ['Only the closing attorney tracks all brokerage deadlines', 'Deadlines are suggestions until closing', 'Brokers should wait until after deadlines expire to discuss options'],
      stem: ({ city }) => `A ${city} buyer has inspection, loan, and repair-negotiation dates approaching.`,
      explanation: () => 'Competent brokerage practice includes tracking and communicating contract deadlines. Clients need timely information to exercise rights before they expire.',
    },
    {
      correct: 'Material contract changes should be documented in writing and properly signed or initialed',
      distractors: ['Verbal side agreements are safer than written amendments', 'A broker may change a signed contract without consent', 'Escrow may infer all changes from text messages'],
      stem: ({ property }) => `The parties agree to change the closing date for a ${property} transaction.`,
      explanation: () => 'Material changes should be documented through appropriate written amendments or addenda and authorized by the parties. Informal side agreements create avoidable disputes.',
    },
  ],
  'Landlord / Tenant': [
    {
      correct: 'Security deposits must be handled according to the North Carolina Tenant Security Deposit Act',
      distractors: ['A property manager may keep all deposits as personal funds', 'Security deposits are never regulated in NC', 'Security deposits belong automatically to the listing agent'],
      stem: ({ role }) => `A ${role} collects a residential tenant security deposit in North Carolina.`,
      explanation: () => 'North Carolina’s Tenant Security Deposit Act governs deposit handling, permitted uses, accounting, and timing. Property managers must treat deposits as regulated funds, not personal money.',
    },
    {
      correct: 'Property management for others for compensation is brokerage activity requiring proper licensure and supervision',
      distractors: ['Anyone may manage rentals for others for a fee', 'Only sales transactions require licensure', 'A provisional broker may manage independently without BIC supervision'],
      stem: ({ city }) => `A ${city} resident wants to manage rental homes for owners for a percentage fee.`,
      explanation: () => 'Property management for others for compensation is real estate brokerage activity in North Carolina. The person must be properly licensed and supervised if required.',
    },
    {
      correct: 'A property manager must account for rents, deposits, repairs, and owner funds through proper records and trust procedures',
      distractors: ['Rent receipts may be commingled with personal funds', 'Owner statements are optional if the manager is busy', 'Repairs may be paid from deposits without documentation'],
      stem: ({ property }) => `A broker manages a ${property} for a landlord.`,
      explanation: () => 'Property management involves trust money, owner funds, tenant deposits, repair disbursements, and accounting. Records and trust procedures are heavily tested NC brokerage-practice issues.',
    },
    {
      correct: 'The lease and applicable NC law control notice, possession, rent, repairs, and deposit issues',
      distractors: ['The broker may evict tenants personally without legal process', 'A verbal broker instruction overrides all lease terms', 'Tenant rights disappear when property is listed for sale'],
      stem: ({ city }) => `A ${city} landlord asks a broker how to remove a tenant immediately after a dispute.`,
      explanation: () => 'Landlord-tenant matters depend on the lease and North Carolina law. Brokers should avoid legal advice and recommend appropriate legal process when possession or eviction is involved.',
    },
  ],
  'Other North Carolina Laws': [
    {
      correct: 'The Residential Property and Owners’ Association Disclosure Statement is a seller disclosure tool, but brokers still have independent material fact duties',
      distractors: ['The disclosure form eliminates all broker disclosure duties', 'The form is required only for commercial leases', 'The form lets sellers hide known defects'],
      stem: ({ property }) => `A seller completes the NC residential property disclosure form for a ${property}.`,
      explanation: () => 'The seller disclosure form is important in NC residential sales, but it does not eliminate the broker’s independent duty to disclose known or reasonably discoverable material facts.',
    },
    {
      correct: 'Mineral, oil, and gas rights disclosure may be required in covered residential transactions',
      distractors: ['Mineral rights are never relevant in NC', 'Only the lender must disclose mineral rights', 'Mineral rights disclosure applies only after closing'],
      stem: ({ city }) => `A ${city} buyer asks whether severed mineral rights could affect a residential purchase.`,
      explanation: () => 'North Carolina has specific mineral, oil, and gas rights disclosure requirements in covered residential transactions. Brokers should recognize the issue and ensure proper forms are addressed.',
    },
    {
      correct: 'Owners’ association documents, assessments, and restrictions can materially affect the buyer’s use and costs',
      distractors: ['HOA documents never affect title or use', 'Assessments are always optional', 'Association restrictions apply only to tenants'],
      stem: ({ property }) => `A buyer is purchasing a ${property} in a planned community.`,
      explanation: () => 'Association documents can affect restrictions, assessments, transfer fees, maintenance duties, and buyer obligations. They are important due-diligence and disclosure topics in NC transactions.',
    },
    {
      correct: 'Lead-based paint disclosure rules apply to most housing built before 1978',
      distractors: ['Lead disclosures apply only to new construction', 'Lead disclosures are never federal law', 'Lead disclosures are optional if the buyer is paying cash'],
      stem: ({ property }) => `A ${property} built in 1965 is being sold in North Carolina.`,
      explanation: () => 'Federal lead-based paint disclosure requirements apply to most pre-1978 housing. NC brokers should recognize the disclosure timing and required pamphlet/records issues.',
    },
    {
      correct: 'A broker should identify possible zoning, permit, septic, well, or floodplain issues and recommend proper investigation',
      distractors: ['Brokers should guarantee zoning approvals', 'Permit issues are never material facts', 'Floodplain review is unnecessary in NC'],
      stem: ({ city, property }) => `A buyer considers a ${city} ${property} with possible septic and floodplain concerns.`,
      explanation: () => 'Other NC laws and local rules can affect land use, permits, wells, septic systems, flood hazards, and development. Brokers should disclose known material facts and recommend proper investigation.',
    },
    {
      correct: 'Fair housing laws prohibit discrimination in covered housing based on protected characteristics',
      distractors: ['Fair housing laws apply only to lenders', 'Brokers may steer buyers based on neighborhood demographics', 'Protected-class questions can be answered with discriminatory recommendations'],
      stem: ({ role }) => `A ${role} receives a buyer request to be shown only neighborhoods with a certain protected-class makeup.`,
      explanation: () => 'Federal and state fair housing principles prohibit discriminatory conduct such as steering. Brokers should focus on objective property criteria and avoid protected-class recommendations.',
    },
    {
      correct: 'An owner’s association or restrictive covenant issue can be a material fact if it affects the property or buyer’s intended use',
      distractors: ['Private restrictions are never material', 'Only public zoning can matter', 'Covenants disappear at each resale'],
      stem: ({ property }) => `A buyer wants to use a ${property} for short-term rentals, but private restrictions may prohibit it.`,
      explanation: () => 'Private restrictions and association rules can materially affect a buyer’s intended use. A broker should identify known issues and advise review of governing documents.',
    },
  ],
}

const expected = new Set(DOMAINS.map((d) => d.name))
for (const key of Object.keys(BANK)) {
  if (!expected.has(key)) throw new Error(`Unexpected domain in bank: ${key}`)
}

const questions = []
let seq = 1
for (const { name, target } of DOMAINS) {
  const specs = BANK[name]
  if (!specs?.length) throw new Error(`Missing specs for ${name}`)
  for (let i = 0; i < target; i += 1) {
    questions.push(makeQuestion(name, specs[i % specs.length], seq, Math.floor(i / specs.length)))
    seq += 1
  }
}

const stems = new Set(questions.map((q) => q.question))
if (stems.size !== questions.length) {
  throw new Error(`Duplicate stems: ${questions.length - stems.size}`)
}

await writeFile(OUT, `${JSON.stringify(questions, null, 2)}\n`)
console.log(`Wrote ${questions.length} North Carolina state-law questions to ${OUT.pathname}`)
