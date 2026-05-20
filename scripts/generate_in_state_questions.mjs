import { writeFile } from 'node:fs/promises'

const OUT = new URL('../src/data/real-estate-in-state-questions.json', import.meta.url)

const DOMAINS = [
  { name: 'Indiana Real Estate Commission', target: 40 },
  { name: 'Licensing', target: 72 },
  { name: 'Statutory and Regulatory Requirements', target: 96 },
  { name: 'Statutes and Rules Governing Licensees', target: 136 },
  { name: 'Real Estate Office Procedures', target: 56 },
]

const SCENARIOS = [
  ['Indianapolis', 'broker', 'resale home'],
  ['Fort Wayne', 'managing broker', 'townhome listing'],
  ['Evansville', 'buyer agent', 'condominium purchase'],
  ['South Bend', 'listing broker', 'single-family listing'],
  ['Bloomington', 'property manager', 'student rental'],
  ['Carmel', 'broker company owner', 'branch office'],
  ['Gary', 'affiliated broker', 'commercial lease'],
  ['Lafayette', 'team lead', 'new-construction sale'],
  ['Muncie', 'seller representative', 'vacant lot'],
  ['Terre Haute', 'referral broker', 'office file'],
  ['Fishers', 'buyer representative', 'purchase agreement'],
  ['Elkhart', 'unlicensed assistant', 'open house'],
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
  'license application review',
  'agency disclosure discussion',
  'listing appointment',
  'offer negotiation',
  'earnest money delivery',
  'management agreement review',
  'Commission complaint intake',
  'office file audit',
]

function cleanChoices(choices) {
  return [...new Set(choices)]
}

function makeQuestion(domain, spec, seq, variant) {
  const [city, role, property] = SCENARIOS[(seq + variant) % SCENARIOS.length]
  const client = CLIENTS[(seq + variant) % CLIENTS.length]
  const fileRef = `file ${String.fromCharCode(65 + (seq % 26))}-${1000 + seq}`
  const stem = `${spec.stem({ city, role, property, variant })} The issue is raised by ${client} during ${PHASES[(seq + variant) % PHASES.length]} in ${fileRef}.`
  const choices = cleanChoices([spec.correct, ...spec.distractors])
  if (choices.length !== 4) throw new Error(`Bad choices for ${domain}: ${stem}`)
  const rotation = seq % choices.length
  const rotated = choices.slice(rotation).concat(choices.slice(0, rotation))
  return {
    id: `re-in-${seq}`,
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
  'Indiana Real Estate Commission': [
    {
      correct: 'The Indiana Real Estate Commission may investigate, hold hearings, and impose discipline for license-law violations',
      distractors: ['Only a local association may discipline brokers', 'Only the county recorder may investigate brokerage conduct', 'The Commission regulates appraisers but not brokers'],
      stem: ({ city }) => `A consumer files a complaint alleging improper brokerage conduct in ${city}.`,
      explanation: () => 'The Indiana Real Estate Commission has authority over broker licensing and discipline, including investigations, hearings, appeals, sanctions, suspension, revocation, civil penalties, and related enforcement.',
    },
    {
      correct: 'The Commission may examine brokerage records relevant to compliance',
      distractors: ['Brokerage records are never subject to regulatory review', 'Only the closing company can review records', 'Records can be destroyed immediately after closing'],
      stem: ({ role }) => `A ${role} receives notice that transaction and trust-account records will be reviewed.`,
      explanation: () => 'The Indiana outline specifically tests Commission examination of records. Brokers and broker companies should maintain required records so compliance can be reviewed by the regulator.',
    },
    {
      correct: 'The Commission may issue cease and desist orders and other sanctions when authorized',
      distractors: ['The Commission can only send informal warnings', 'The Commission cannot stop unlicensed activity', 'The Commission may discipline only after a criminal conviction'],
      stem: ({ city }) => `An unlicensed person in ${city} continues offering brokerage services for compensation.`,
      explanation: () => 'Indiana disciplinary authority includes cease and desist orders and other sanctions. The exam tests that regulatory remedies can address both licensee misconduct and unauthorized activity.',
    },
    {
      correct: 'Consumer restitution or recovery fund issues may arise from qualifying licensee misconduct',
      distractors: ['The recovery fund pays every market loss', 'The recovery fund replaces title insurance', 'The recovery fund is controlled by the local MLS'],
      stem: ({ property }) => `A consumer suffers a loss connected to licensee misconduct in a ${property} transaction.`,
      explanation: () => 'The Indiana outline includes consumer restitution/recovery fund concepts. The fund is not a guarantee against normal investment loss, but can be implicated by qualifying licensee misconduct under the statute.',
    },
  ],
  'Licensing': [
    {
      correct: 'Brokerage activity for others for compensation generally requires an Indiana real estate broker license',
      distractors: ['Anyone may negotiate real estate for a fee if paid after closing', 'Only residential listings require licensure', 'Licensure is unnecessary if the client signs a waiver'],
      stem: ({ city, property }) => `An unlicensed person in ${city} offers to negotiate a ${property} sale for a fee.`,
      explanation: () => 'Indiana licensing rules require a real estate broker license for persons performing covered brokerage acts for others for compensation. Timing of payment does not avoid the license requirement.',
    },
    {
      correct: 'A broker company needs proper licensure and a responsible broker structure before conducting brokerage',
      distractors: ['Any LLC may broker real estate without a broker company license', 'Only individual brokers are ever licensed in Indiana', 'A trade name filing alone authorizes brokerage'],
      stem: ({ city }) => `A ${city} LLC wants to open a real estate brokerage office.`,
      explanation: () => 'The Indiana outline tests individual and organizational license types. A business entity conducting brokerage must use the proper broker company licensing and responsible broker structure.',
    },
    {
      correct: 'Resident and nonresident license status can affect application and compliance requirements',
      distractors: ['Nonresidents can always practice without Indiana authorization', 'Resident status is irrelevant to all licensing rules', 'Only Indiana residents may ever hold a broker license'],
      stem: ({ role }) => `A ${role} licensed in another state wants to perform Indiana brokerage activity.`,
      explanation: () => 'Indiana tests resident and nonresident license concepts. A nonresident broker may have a path to licensure or endorsement, but cannot simply ignore Indiana authorization requirements.',
    },
    {
      correct: 'License maintenance includes renewals, transfers or changes, continuing education, and status changes',
      distractors: ['A license never needs renewal once issued', 'Changing brokers has no licensing effect', 'Continuing education applies only to unlicensed assistants'],
      stem: ({ city }) => `A ${city} broker is changing firms and reviewing license status requirements.`,
      explanation: () => 'The Indiana licensing outline includes renewals, transfers and changes, continuing education, active/inactive status, assigned/unassigned status, and referral status.',
    },
    {
      correct: 'A broker changing broker companies must follow the required transfer/change process',
      distractors: ['The broker may work for both firms without any update', 'Only the old broker company needs to know informally', 'The change can wait until the next license renewal'],
      stem: ({ role }) => `A ${role} leaves one broker company and begins work with another.`,
      explanation: () => 'Indiana license maintenance includes agents changing brokers and broker termination of agents. Proper license-status and company-association changes must be handled through the required process.',
    },
    {
      correct: 'Referral status limits brokerage activity compared with active assigned status',
      distractors: ['Referral status allows full independent brokerage', 'Referral status is identical to managing broker status', 'Referral status eliminates all license-law duties'],
      stem: ({ city }) => `A ${city} broker asks whether referral status permits showing homes and writing offers.`,
      explanation: () => 'The Indiana outline includes active, inactive, assigned, unassigned, and referral status. Referral status is limited and does not function like ordinary active brokerage authority.',
    },
  ],
  'Statutory and Regulatory Requirements': [
    {
      correct: 'Advertising must be truthful and identify the broker or broker company as required',
      distractors: ['Team advertising may omit broker company identity entirely', 'Advertising rules apply only to newspaper ads', 'A broker may advertise listings without authority'],
      stem: ({ city }) => `A ${city} team prepares social media ads for a listed property.`,
      explanation: () => 'Indiana statutory and regulatory requirements include advertising. Ads should avoid false or misleading statements and include the appropriate broker or broker company identification required by law and rule.',
    },
    {
      correct: 'Commissions are earned and paid according to brokerage agreements and license-law requirements',
      distractors: ['An unlicensed assistant may receive a commission split for negotiations', 'A broker may secretly collect compensation from both sides without disclosure', 'Commission terms do not need any agreement'],
      stem: ({ role }) => `A ${role} discusses compensation from multiple parties in the same transaction.`,
      explanation: () => 'The Indiana outline tests commissions and other compensation. Compensation should be authorized, disclosed when required, and paid only to properly licensed persons through lawful brokerage arrangements.',
    },
    {
      correct: 'Listing agreements and buyer or tenant agency agreements should clearly authorize representation and compensation',
      distractors: ['A listing agreement is never needed for seller representation', 'Buyer agency agreements cannot be written in Indiana', 'Leasing brokerage agreements are exempt from all rules'],
      stem: ({ property }) => `A broker is preparing representation paperwork for a ${property}.`,
      explanation: () => 'Brokerage agreements are specifically listed in the Indiana outline, including listing agreements, exclusive buyer/tenant agency agreements, leasing, and property management agreements.',
    },
    {
      correct: 'Offers to purchase should be presented and handled promptly according to client instructions and law',
      distractors: ['A broker may discard low offers without client permission', 'Only cash offers must be presented', 'Offers may be held until the broker has time to improve commission terms'],
      stem: ({ city }) => `A ${city} listing broker receives a written offer below list price.`,
      explanation: () => 'Indiana statutory requirements include offers to purchase. Brokers should handle offers promptly and according to lawful client instructions, not based on personal preferences.',
    },
    {
      correct: 'Earnest money must be handled through proper trust-account procedures',
      distractors: ['Earnest money may be placed in the broker’s personal account', 'Trust-account rules apply only to commercial deals', 'Earnest money may be used temporarily for office expenses'],
      stem: ({ role }) => `A ${role} receives an earnest money check with an accepted offer.`,
      explanation: () => 'Earnest money and trust accounts are specifically tested in Indiana. Brokers must safeguard funds and follow trust-account deposit, accounting, and disbursement rules.',
    },
    {
      correct: 'A broker should not perform an appraisal unless properly licensed or authorized for appraisal work',
      distractors: ['Every broker may issue lender appraisals', 'A comparative market analysis is always the same as an appraisal', 'Appraisal rules never apply to brokers'],
      stem: ({ city }) => `A lender asks a ${city} broker for a formal appraisal report for loan underwriting.`,
      explanation: () => 'The Indiana outline includes appraisals. Brokers may discuss market value within brokerage practice, but formal appraisal work is separately regulated and should not be performed without proper authority.',
    },
    {
      correct: 'Seller residential real estate sales disclosure requirements can require disclosure of known property conditions',
      distractors: ['The seller disclosure form lets sellers hide known defects', 'Disclosure applies only after closing', 'Only buyers complete seller disclosure forms'],
      stem: ({ property }) => `A seller knows about recurring basement water intrusion in a ${property}.`,
      explanation: () => 'Indiana tests the seller’s residential real estate sales disclosure. Sellers and brokers should address known conditions honestly, and brokers still have duties regarding known material issues.',
    },
    {
      correct: 'A psychologically affected property issue is treated differently from a physical material defect',
      distractors: ['Psychological stigma is always a structural defect', 'A broker must disclose every rumor without regard to law', 'Psychological issues always void title'],
      stem: ({ city }) => `A buyer asks whether a prior event at a ${city} home must be treated like a roof defect.`,
      explanation: () => 'The Indiana outline specifically includes psychologically affected properties. These issues are treated differently from physical defects, and brokers should follow Indiana disclosure rules rather than guess.',
    },
  ],
  'Statutes and Rules Governing Licensees': [
    {
      correct: 'Indiana agency relationships and disclosures must be handled clearly before confidential information is exchanged',
      distractors: ['Consumers must guess who the broker represents', 'Agency disclosure is needed only after closing', 'Agency status has no effect on confidentiality'],
      stem: ({ city }) => `At a ${city} showing, a buyer begins sharing maximum price and motivation with the listing broker.`,
      explanation: () => 'Indiana tests real estate agency relationships, types of agency, definitions, and disclosures. Brokers should clarify representation before receiving confidential information.',
    },
    {
      correct: 'An agency office policy helps define how the broker company handles representation choices',
      distractors: ['Written office policies on agency are irrelevant', 'Only unlicensed assistants need agency policies', 'Agency policies override all statutory disclosure duties'],
      stem: ({ role }) => `A ${role} reviews how the firm handles buyer agency, seller agency, and limited agency.`,
      explanation: () => 'The Indiana outline lists written office policies on agency. Office policies help guide consistent disclosure and representation practices but do not eliminate statutory duties.',
    },
    {
      correct: 'A licensee must not use unfair inducements or misleading incentives to obtain business',
      distractors: ['Any inducement is allowed if it increases sales', 'Unfair inducements are regulated only by the MLS', 'A broker may conceal material conditions if offering a rebate'],
      stem: ({ city }) => `A ${city} broker advertises a promotion that could mislead consumers about costs and obligations.`,
      explanation: () => 'Indiana licensee-conduct rules include unfair inducements. Incentives must be lawful, truthful, and not misleading or used to conceal material information.',
    },
    {
      correct: 'Incompetent practices can be grounds for discipline even without intentional fraud',
      distractors: ['Only intentional theft can lead to discipline', 'Competence is never tested after licensure', 'A broker may accept work in any specialty without supervision or knowledge'],
      stem: ({ property }) => `A residential broker takes on a complex property-management assignment for a ${property} without knowledge or supervision.`,
      explanation: () => 'The Indiana outline includes incompetent practices and professional standards. Licensees must practice competently and obtain appropriate help or supervision when a matter is outside their skill.',
    },
    {
      correct: 'Professional standards require honesty, disclosure, and competent conduct in brokerage services',
      distractors: ['Professional standards apply only to association members', 'Honesty is owed only when a complaint is filed', 'Disclosure duties disappear if the client requests silence'],
      stem: ({ role }) => `A ${role} learns a fact that materially affects the buyer’s decision.`,
      explanation: () => 'Indiana statutes and rules governing licensees test professional standards, disclosures, and conduct. A broker cannot use client instructions as a reason to mislead or conceal required information.',
    },
    {
      correct: 'A licensee should disclose personal interests or conflicts as required before the other party relies on the transaction',
      distractors: ['A licensee may hide ownership interest through an LLC', 'Conflicts can wait until after closing', 'Disclosure is needed only for commercial property'],
      stem: ({ city }) => `A ${city} broker is buying property through an entity partly owned by the broker.`,
      explanation: () => 'Disclosure and other conduct issues are tested in Indiana. A licensee’s personal interest or conflict should be disclosed as required so parties can evaluate the transaction fairly.',
    },
    {
      correct: 'Limited or dual agency requires appropriate consent and careful protection of confidential information',
      distractors: ['Dual agency allows free sharing of all confidential information', 'Dual agency is automatic in every in-house sale', 'Dual agency eliminates all agency duties'],
      stem: ({ city }) => `One ${city} broker company may represent both the buyer and seller.`,
      explanation: () => 'Indiana agency questions often test limited or dual-agency concepts. Consent, disclosure, and confidentiality limits are central; dual involvement does not erase duties.',
    },
    {
      correct: 'A broker must deal honestly with customers even when the customer is not the broker’s client',
      distractors: ['A broker may mislead customers to benefit the client', 'Customers have no protection under license law', 'Honesty duties apply only to written clients'],
      stem: ({ property }) => `A listing broker speaks with an unrepresented buyer about a ${property}.`,
      explanation: () => 'Agency loyalty to a client does not permit dishonesty toward customers. Indiana professional conduct requires fair and honest dealings in brokerage practice.',
    },
    {
      correct: 'A licensee should recommend legal, tax, or other expert advice when a question is outside brokerage competence',
      distractors: ['A broker should give binding legal advice', 'A broker may draft complex legal rights without review', 'A broker should guarantee tax consequences'],
      stem: ({ role }) => `A ${role} is asked to interpret tax consequences and draft a custom easement clause.`,
      explanation: () => 'Professional standards include competence and avoiding unauthorized practice. A broker should refer legal, tax, and technical questions to qualified professionals.',
    },
  ],
  'Real Estate Office Procedures': [
    {
      correct: 'Transaction documents and records must be retained and organized according to office and Commission requirements',
      distractors: ['Files may be discarded immediately after closing', 'Only accepted offers need to be kept', 'Records belong only to the closing company'],
      stem: ({ city }) => `A ${city} office is preparing for a record review.`,
      explanation: () => 'Indiana office procedures include documents and records. Proper retention and organization support supervision, consumer protection, and Commission review.',
    },
    {
      correct: 'Brokerage money must be handled with proper accounting, trust procedures, and supervision',
      distractors: ['Client funds may be commingled with operating funds', 'Trust accounting is optional if the client agrees', 'Earnest money may be spent before closing'],
      stem: ({ role }) => `A ${role} supervises deposit of earnest money and rent proceeds.`,
      explanation: () => 'Handling of monies is a major office-procedure topic. Funds belonging to clients or others require proper accounting, trust handling, and broker supervision.',
    },
    {
      correct: 'A place of business and branch office must comply with Indiana office requirements',
      distractors: ['A branch office can operate invisibly with no broker-company connection', 'Only home offices are regulated', 'Branch-office rules apply only to commercial brokerage'],
      stem: ({ city }) => `A broker company opens an additional public office in ${city}.`,
      explanation: () => 'Indiana office procedures include place of business and branch offices. Broker companies and managing brokers must ensure office locations comply with licensing and supervision requirements.',
    },
    {
      correct: 'Unlicensed assistants may perform only tasks allowed by law and office policy, not independent brokerage services',
      distractors: ['An unlicensed assistant may negotiate offers independently', 'An unlicensed assistant may list property for commission', 'Unlicensed assistants are exempt from all supervision'],
      stem: ({ city }) => `An ${city} assistant wants to answer price-negotiation questions from buyers at an open house.`,
      explanation: () => 'Indiana office procedures include unlicensed assistants. They may help with administrative tasks allowed by law, but cannot perform licensed brokerage activities such as negotiation or representation.',
    },
    {
      correct: 'Managing brokers must provide general supervision and address employment and commission issues within the broker-company relationship',
      distractors: ['Managing brokers have no supervisory duty after affiliating agents', 'Commission disputes are always outside office procedures', 'Affiliated brokers supervise the managing broker'],
      stem: ({ role }) => `A ${role} reviews supervision, employment, and commission practices for affiliated brokers.`,
      explanation: () => 'The Indiana outline includes managing broker/broker relationships, general supervision, employment, and commission issues. Managing brokers are expected to maintain meaningful office oversight.',
    },
    {
      correct: 'Broker company to broker company relationships should be documented when cooperation, referrals, or compensation are involved',
      distractors: ['Cooperating firms need no documentation of compensation', 'Referral arrangements may be concealed from all parties', 'Broker companies cannot ever cooperate in transactions'],
      stem: ({ property }) => `Two broker companies cooperate on a ${property} transaction and discuss compensation.`,
      explanation: () => 'Indiana office procedures include broker company/broker company relationships. Cooperation, referrals, compensation, and responsibilities should be handled transparently and documented.',
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
console.log(`Wrote ${questions.length} Indiana state-law questions to ${OUT.pathname}`)
