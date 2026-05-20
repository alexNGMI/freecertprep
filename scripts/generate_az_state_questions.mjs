import { writeFile } from 'node:fs/promises'

const OUT = new URL('../src/data/real-estate-az-state-questions.json', import.meta.url)

const DOMAINS = [
  { name: 'Arizona Real Estate Regulatory Framework', target: 33 },
  { name: 'Arizona Consumer Protection Laws', target: 33 },
  { name: 'Advertising', target: 33 },
  { name: 'Arizona Agency', target: 40 },
  { name: 'Licensee Duties and Obligations', target: 40 },
  { name: 'Licensee Competencies and Duties', target: 40 },
  { name: 'Reasonable Skill and Care', target: 40 },
  { name: 'Contracts', target: 54 },
  { name: 'Critical Business Services for a Real Estate Transaction', target: 34 },
  { name: 'Ownership and Encumbrances', target: 33 },
  { name: 'Foreclosure / Short Sale / Deed-in-Lieu Process', target: 20 },
]

const SCENARIOS = [
  ['Phoenix', 'buyer', 'resale home'],
  ['Tucson', 'seller', 'single-family listing'],
  ['Mesa', 'broker', 'townhome transaction'],
  ['Scottsdale', 'salesperson', 'luxury listing'],
  ['Flagstaff', 'property manager', 'rental property'],
  ['Tempe', 'team lead', 'social media campaign'],
  ['Gilbert', 'designated broker', 'branch office'],
  ['Chandler', 'license applicant', 'pre-license file'],
  ['Prescott', 'developer', 'subdivision sale'],
  ['Yuma', 'buyer representative', 'land purchase'],
  ['Sedona', 'listing agent', 'vacant lot'],
  ['Glendale', 'associate broker', 'offer negotiation'],
]

const PHASES = [
  'initial client intake',
  'offer preparation',
  'inspection negotiations',
  'escrow review',
  'pre-closing file review',
  'broker compliance audit',
  'consumer complaint intake',
  'transaction follow-up',
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
  const correctAnswer = rotated.indexOf(spec.correct)
  return {
    id: `re-az-${seq}`,
    domain,
    type: 'single-choice',
    portion: 'state',
    question: stem,
    choices: rotated,
    correctAnswer,
    explanation: spec.explanation({ city, role, property }),
  }
}

const BANK = {
  'Arizona Real Estate Regulatory Framework': [
    {
      correct: 'Submit both passing Pearson score reports with the original license application',
      distractors: ['Submit only the national score report', 'Wait two years before filing the application', 'File the application before taking either exam section'],
      stem: ({ city, role }) => `A ${city} ${role} has passed both Arizona salesperson exam sections. What document pair must be included when applying for the original license?`,
      explanation: () => 'Arizona treats the salesperson exam as two sections: general/national and state-specific. ADRE expects the applicant to submit the score report received from Pearson for each passed section with the original license application.',
    },
    {
      correct: 'Complete a 90-hour salesperson prelicensing course',
      distractors: ['Complete a 24-hour continuing education course', 'Complete only a 6-hour contract-writing course', 'Complete a broker management clinic'],
      stem: ({ city }) => `A first-time ${city} applicant is checking education requirements before applying for an Arizona salesperson license. Which education item is required?`,
      explanation: () => 'Arizona salesperson applicants must complete a 90-hour salesperson prelicensing course. The 6-hour contract-writing course is also required, but it does not replace the 90-hour prelicensing course.',
    },
    {
      correct: 'Complete a 6-hour contract writing course',
      distractors: ['Complete a 6-hour appraisal course', 'Complete a 6-hour property management trust accounting course', 'Complete a 6-hour subdivision public report course'],
      stem: ({ role }) => `After finishing the 90-hour course, an Arizona ${role} applicant asks what additional course certificate must be submitted with the license application. What is required?`,
      explanation: () => 'Arizona requires a 6-hour contract writing course certificate for an original salesperson license. This requirement is separate from the 90-hour salesperson prelicensing course.',
    },
    {
      correct: 'A fingerprint clearance card issued by the Arizona Department of Public Safety',
      distractors: ['A notarized letter from the employing broker only', 'A municipal police background letter only', 'A federal tax clearance certificate'],
      stem: ({ city }) => `A ${city} license applicant is assembling the ADRE application packet. Which public-safety document is required?`,
      explanation: () => 'ADRE requires a fingerprint clearance card issued by the Arizona Department of Public Safety as part of the salesperson application packet. It is not replaced by a broker letter or local police note.',
    },
    {
      correct: 'Within one year after passing the exam',
      distractors: ['Within 30 days after completing prelicensing education', 'Within five years after passing the exam', 'Only during the next license renewal cycle'],
      stem: ({ role }) => `An Arizona ${role} passed both salesperson exam sections but delayed applying. How long does the applicant generally have to submit the license application after passing?`,
      explanation: () => 'ADRE states that salesperson applications must be submitted within one year of passing the required exam sections. Waiting longer risks having to requalify under current requirements.',
    },
    {
      correct: 'Disclose the issue and provide the applicable supporting documents',
      distractors: ['Omit the issue if it occurred outside Arizona', 'Wait to disclose until the first renewal', 'Ask the school to decide whether disclosure is required'],
      stem: ({ city }) => `A ${city} applicant answers yes to a disciplinary disclosure question on the ADRE application. What should the applicant do next?`,
      explanation: () => 'When an applicant answers yes to an ADRE disciplinary disclosure question, the applicant must disclose the matter and provide the required supporting documents from the disclosure checklist. The applicant should not decide unilaterally to omit it.',
    },
    {
      correct: 'A salesperson must be licensed through and supervised by an employing broker',
      distractors: ['A salesperson may operate independently immediately after licensure', 'A salesperson may supervise an employing broker', 'A salesperson may hold client funds personally if the client agrees'],
      stem: ({ city }) => `A newly licensed ${city} salesperson wants to open a solo brokerage immediately. Which statement best describes the Arizona licensing structure?`,
      explanation: () => 'An Arizona salesperson works under an employing broker and may not operate as an independent brokerage. Supervision and responsibility flow through the employing/designated broker structure.',
    },
    {
      correct: 'The Arizona Department of Real Estate',
      distractors: ['The county recorder', 'The Arizona Department of Revenue', 'The local association of REALTORS'],
      stem: ({ property }) => `A consumer complaint alleges unlicensed Arizona brokerage activity involving a ${property}. Which agency regulates real estate licensees and investigates license-law violations?`,
      explanation: () => 'The Arizona Department of Real Estate regulates Arizona real estate licensees, subdivision matters, and unlicensed real estate activity. Local associations and county offices do not replace ADRE enforcement authority.',
    },
  ],
  'Arizona Consumer Protection Laws': [
    {
      correct: 'A public report before the purchaser signs the purchase contract',
      distractors: ['A public report only after escrow closes', 'A property tax bill instead of a public report', 'A verbal disclosure at the final walk-through only'],
      stem: ({ city }) => `A ${city} developer is selling lots in a new subdivision. What must be provided to a prospective purchaser before the purchase contract is signed?`,
      explanation: () => 'For Arizona subdivision sales, the ADRE public report must be provided to the prospective purchaser before the buyer signs the purchase contract. The buyer acknowledges receipt, and the report contains key subdivision disclosures.',
    },
    {
      correct: 'Flooding, drainage, utilities, improvements, local services, taxes, and association information',
      distractors: ['Only the developer marketing brochure', 'Only comparable sales selected by the seller', 'Only the buyer agency agreement'],
      stem: ({ property }) => `A buyer reviewing an Arizona subdivision public report for a ${property} asks what types of issues it covers. Which answer is best?`,
      explanation: () => 'An Arizona public report is consumer-protection disclosure. It includes matters such as flooding and drainage, utility providers, assurances for improvements, local services, taxes, assessments, and property-owner association details.',
    },
    {
      correct: 'The subdivision may be illegal if more than five parcels are offered without a public report',
      distractors: ['The developer may sell unlimited parcels without ADRE involvement', 'The buyer must obtain the public report from the county assessor', 'The public report is required only for commercial towers'],
      stem: ({ city }) => `A ${city} buyer is offered one of six newly divided residential parcels, but the seller cannot produce an ADRE public report. What is the best exam answer?`,
      explanation: () => 'ADRE consumer guidance warns that if a property is smaller than 160 acres, has more than five parcels, and the developer cannot produce a public report, the subdivision is likely illegal.',
    },
    {
      correct: 'Known material facts affecting the property must be disclosed',
      distractors: ['Only facts asked about in writing must be disclosed', 'Only facts discovered by the buyer must be disclosed', 'No disclosure is required if the seller uses an as-is clause'],
      stem: ({ role, property }) => `A ${role} knows about a latent roof leak affecting a ${property}. What is the best Arizona consumer-protection principle?`,
      explanation: () => 'Arizona practice requires disclosure of known material facts affecting the property. A contractual as-is clause or a buyer inspection does not excuse a known material nondisclosure.',
    },
    {
      correct: 'The buyer should be urged to investigate matters important to the buyer',
      distractors: ['The buyer should rely only on the licensee opinion', 'The buyer should waive all inspections when the seller is licensed', 'The buyer should wait until after closing to ask questions'],
      stem: ({ city }) => `A ${city} buyer is concerned about schools, floodplain, utilities, and neighborhood conditions. What is the best licensee response?`,
      explanation: () => 'Arizona consumer guidance encourages buyers to investigate matters important to them, including physical, legal, and community conditions. A licensee should not substitute personal assurances for appropriate due diligence.',
    },
    {
      correct: 'The Department may investigate licensed and unlicensed real estate activity',
      distractors: ['Only the local MLS may investigate', 'Only a civil court can investigate before closing', 'ADRE has authority only over appraisers'],
      stem: ({ city }) => `A ${city} consumer reports that an unlicensed person is negotiating real estate sales for compensation. Which statement is most accurate?`,
      explanation: () => 'ADRE investigates violations of Arizona real estate law, Commissioner rules, and unlicensed real estate activity. A consumer may still have civil remedies, but ADRE has regulatory authority.',
    },
  ],
  'Advertising': [
    {
      correct: "The employing broker's legal name or licensed dba must be clear and prominent",
      distractors: ['Only the salesperson nickname is required', 'Only the team logo is required', 'No broker identification is needed on social media'],
      stem: ({ city }) => `A ${city} salesperson posts a social media ad for brokerage services. What must the ad clearly and prominently identify?`,
      explanation: () => 'Arizona advertising guidance emphasizes that all advertising, including social media and online content, must identify the employing broker by the legal name or licensed dba in a clear and prominent manner.',
    },
    {
      correct: 'Internet, email, text, and social media messages can be advertising',
      distractors: ['Only newspaper ads are advertising', 'Only yard signs are advertising', 'Only paid television commercials are advertising'],
      stem: ({ role }) => `A ${role} says an Instagram post and email blast are not advertising because they are electronic. Which Arizona rule principle applies?`,
      explanation: () => 'ADRE guidance treats electronic media that targets Arizona residents with real estate services or property offerings as advertising. The broker-identification rules apply to digital formats too.',
    },
    {
      correct: 'Use the employing broker name as licensed, not an abbreviation that obscures it',
      distractors: ['Use only the team initials if they are familiar locally', 'Use any shortened name if it fits the sign', 'Use only the franchise slogan'],
      stem: ({ city }) => `A ${city} team wants to shorten its employing broker's licensed name on a postcard. What is the safest Arizona compliance answer?`,
      explanation: () => 'Arizona guidance says the employing broker name must be clear and prominent and should match the legal or dba name on the license certificate. An abbreviation that obscures the licensed name is not sufficient.',
    },
    {
      correct: 'The employing broker remains responsible for supervision of the advertising',
      distractors: ['The vendor becomes the responsible broker', 'The team leader replaces the employing broker for ads', 'No one supervises ads once they are posted'],
      stem: ({ city }) => `A ${city} licensee hires a vendor to run paid search ads. Who remains responsible for broker-level supervision of the advertising?`,
      explanation: () => 'The advertising rule exists so the public can identify the employing broker responsible for supervision. Hiring a vendor or using a team brand does not remove the employing broker from responsibility.',
    },
    {
      correct: 'A branch sign must identify the employing broker clearly and prominently',
      distractors: ['A branch sign may show only the office manager name', 'A branch sign may omit broker identity if the address is correct', 'A branch sign needs only the MLS office number'],
      stem: ({ city }) => `A ${city} branch office installs exterior signage. Which advertising requirement is most directly tested?`,
      explanation: () => 'ADRE identifies branch signage that fails to identify the employing broker by the legal or licensed dba name as a common advertising violation. The broker identity must be clear and prominent.',
    },
    {
      correct: 'A licensee advertising the licensee-owned property should disclose the owner/agent status',
      distractors: ['A licensee may hide license status when acting as owner', 'The licensee should disclose only after receiving offers', 'The disclosure is needed only for commercial property'],
      stem: ({ city }) => `A ${city} salesperson advertises a personally owned rental property for sale. What disclosure best protects the public?`,
      explanation: () => 'Arizona advertising guidance and rule revisions emphasize disclosure when a licensee advertises property the licensee owns or has an interest in. The exam answer is to disclose the licensed owner/agent status rather than hide it.',
    },
  ],
  'Arizona Agency': [
    {
      correct: "The broker owes fiduciary duties to the client and must protect and promote the client's interests",
      distractors: ['The broker owes no duties once escrow opens', 'The broker owes fiduciary duties only to customers', 'The broker may put personal interests ahead of the client with no disclosure'],
      stem: ({ city, role }) => `A ${city} ${role} represents a buyer under an Arizona agency relationship. Which duty best describes the broker-client relationship?`,
      explanation: () => 'Arizona professional conduct rules state that a licensee owes a fiduciary duty to the client and must protect and promote the client’s interests, while still dealing fairly with other parties.',
    },
    {
      correct: 'Disclose the conflict in writing before the parties enter a binding agreement',
      distractors: ['Disclose the conflict only after closing', 'Disclose the conflict orally at the final walk-through', 'Make no disclosure if the price is fair'],
      stem: ({ role, property }) => `A ${role} has a present interest in a ${property} involved in a transaction. What must occur before the parties enter a binding agreement?`,
      explanation: () => 'Arizona rules require written disclosure of present or prospective interests and conflicts before the parties enter a binding agreement. Timing and written form matter on the exam.',
    },
    {
      correct: 'Recommend that the client seek appropriate legal, tax, accounting, or insurance advice',
      distractors: ['Give legal advice because real estate licensees draft contracts', 'Tell the client outside professionals are unnecessary', 'Decide the tax result for the client'],
      stem: ({ city }) => `A ${city} buyer asks whether pre-possession creates legal and insurance risk. What should the licensee do?`,
      explanation: () => 'Arizona rules instruct licensees to recommend appropriate counsel from legal, tax, accounting, or insurance professionals for risks such as pre-possession or post-possession. The licensee should not act as that professional.',
    },
    {
      correct: 'The broker must disclose material information known to the broker',
      distractors: ['The broker may ignore known material defects if the seller requests silence', 'The broker discloses only defects found by the buyer inspector', 'The broker owes no disclosure duties to any party'],
      stem: ({ role, property }) => `A ${role} knows of a hidden drainage problem affecting a ${property}. What is the best agency-law answer?`,
      explanation: () => 'Arizona licensees must disclose known material information. Loyalty to a client does not permit concealment of material facts that should be disclosed in the transaction.',
    },
    {
      correct: 'The broker should clarify and document who the broker represents',
      distractors: ['The broker should let both parties assume representation', 'The broker should avoid all agency disclosures', 'The broker automatically represents every visitor at an open house'],
      stem: ({ city }) => `At a ${city} open house, a buyer asks whether the listing broker represents the buyer. What is the best practice?`,
      explanation: () => 'Agency relationships should be explained and documented so parties understand whether they are clients or customers. Confusion about representation is a classic agency exam issue.',
    },
    {
      correct: 'A dual or limited-representation situation requires informed consent and careful conflict handling',
      distractors: ['Dual representation is always automatic when two agents share a broker', 'Dual representation eliminates fiduciary duties', 'Dual representation allows confidential information to be shared freely'],
      stem: ({ city }) => `A ${city} brokerage may represent both sides of a transaction. What is the safest Arizona agency answer?`,
      explanation: () => 'When one brokerage is involved with both sides, the exam focus is informed consent, clear disclosure, and careful protection of confidential information. Dual involvement does not erase duties to clients.',
    },
    {
      correct: 'The broker must keep client confidential information confidential unless disclosure is authorized or required',
      distractors: ['The broker must share all client motives with the other party', 'The broker may use confidential information for personal leverage', 'The broker may disclose confidential information after a verbal request from a competitor'],
      stem: ({ city }) => `A ${city} seller tells the listing broker privately that the seller will accept much less due to financial pressure. What duty applies?`,
      explanation: () => 'Confidential client information, such as bargaining position or motivation, must be protected unless the client authorizes disclosure or law requires it. Loyalty and confidentiality are core agency concepts.',
    },
  ],
  'Licensee Duties and Obligations': [
    {
      correct: 'Promptly submit all offers to the client unless a valid written instruction or contract provision changes that duty',
      distractors: ['Submit only the highest offer', 'Stop presenting offers once one offer is accepted in every case', 'Hold backup offers until after closing'],
      stem: ({ role, property }) => `A ${role} receives a backup offer on a listed ${property} before closing. What is the Arizona conveyance-document duty?`,
      explanation: () => 'Arizona rules require prompt submission of offers made before closing unless the client gives written instructions to stop or the listing agreement, lease, or purchase contract provides otherwise.',
    },
    {
      correct: 'Disclose in writing a present or prospective interest or conflict',
      distractors: ['Disclose only if the other party asks directly', 'Disclose orally after the inspection period', 'Disclose only to the title company'],
      stem: ({ city }) => `A ${city} licensee is buying through an entity partly owned by the licensee. What must be disclosed?`,
      explanation: () => 'A licensee must disclose present or prospective interests and conflicts in writing before parties enter a binding agreement. Ownership through an entity does not avoid the disclosure duty.',
    },
    {
      correct: 'Safeguard money or property entrusted to the broker',
      distractors: ['Deposit client funds in a personal account', 'Use client funds temporarily for brokerage expenses', 'Hold earnest money in cash at home'],
      stem: ({ city }) => `A ${city} buyer gives earnest money to the brokerage. Which duty is most directly implicated?`,
      explanation: () => 'Arizona licensees and brokers must properly safeguard money or property entrusted to them. Client money should be handled through appropriate brokerage and escrow procedures, not personal use.',
    },
    {
      correct: 'Report required disclosure issues to ADRE within the required time when applicable',
      distractors: ['Wait until renewal no matter what changed', 'Tell only the team leader', 'Ignore the issue if the court is outside Arizona'],
      stem: ({ role }) => `An Arizona ${role} has a new adverse professional-license event that triggers ADRE disclosure obligations. What is the best duty-focused answer?`,
      explanation: () => 'ADRE licensing guidance emphasizes disclosure of criminal convictions, adverse judgments, and professional discipline when required. The licensee should report as required rather than waiting for renewal or relying on informal notice.',
    },
    {
      correct: 'Perform only property management activity authorized and supervised by the broker',
      distractors: ['Perform property management independently as a salesperson', 'Open a personal trust account for managed rentals', 'Avoid broker supervision if the owner signs a waiver'],
      stem: ({ city }) => `A ${city} salesperson wants to manage rentals for compensation. What is the best Arizona answer?`,
      explanation: () => 'ADRE guidance states that a salesperson or associate broker may not conduct property management services unless the broker authorizes and supervises that activity. Brokerage supervision is central.',
    },
    {
      correct: 'Use transaction documents carefully and avoid changing legal rights without appropriate authority',
      distractors: ['Draft custom legal clauses for every dispute', 'Tell clients legal review is never needed', 'Alter signed documents without all required initials'],
      stem: ({ role }) => `A ${role} is asked to rewrite a complex legal contingency in an Arizona purchase contract. What is the safest licensee duty?`,
      explanation: () => 'Licensees may fill in standard transaction forms within their competence, but should avoid unauthorized practice of law and recommend legal counsel for complex legal drafting or rights changes.',
    },
  ],
  'Licensee Competencies and Duties': [
    {
      correct: 'Practice within the standards of competence for the real estate discipline involved',
      distractors: ['Accept any assignment regardless of knowledge', 'Rely on the client to catch all errors', 'Treat all specialties as identical'],
      stem: ({ city, property }) => `A residential ${city} agent is asked to handle a complex commercial ${property}. What competence standard applies?`,
      explanation: () => 'Arizona rules require services to conform to standards of practice and competence recognized in the professional community for the real estate discipline involved. A licensee should obtain help or decline work outside competence.',
    },
    {
      correct: 'Recommend qualified experts when a matter is outside the licensee’s expertise',
      distractors: ['Diagnose engineering defects personally', 'Give binding legal opinions', 'Guarantee the tax treatment of the deal'],
      stem: ({ role }) => `A ${role} notices possible structural movement during a showing. What is the most competent response?`,
      explanation: () => 'A competent licensee recognizes limits and recommends qualified inspection, engineering, legal, tax, or other professional advice when needed. The licensee should not pretend to be a specialist.',
    },
    {
      correct: 'Learn the relevant rules before offering a service or obtain competent supervision',
      distractors: ['Use another state’s forms without review', 'Copy a competitor’s process blindly', 'Avoid disclosure because the rules are unfamiliar'],
      stem: ({ city }) => `A ${city} licensee begins handling subdivision lots for the first time. What is the best competence-focused step?`,
      explanation: () => 'Arizona subdivision work has specific public-report and disclosure rules. A licensee should understand the applicable Arizona requirements or obtain competent broker/specialist supervision before practicing in that area.',
    },
    {
      correct: 'Document advice, disclosures, and client instructions in the transaction file',
      distractors: ['Rely only on memory', 'Keep no file after closing', 'Discard written instructions once escrow opens'],
      stem: ({ role }) => `A ${role} gives a client several recommendations about inspections and disclosures. What practice best supports competent performance?`,
      explanation: () => 'Good Arizona brokerage practice includes maintaining documentation of disclosures, advice, and client instructions. Documentation supports supervision, compliance, and later review if a dispute arises.',
    },
    {
      correct: 'Use current forms and current Arizona law, not outdated habits',
      distractors: ['Use old forms if they are familiar', 'Ignore law-book updates until renewal', 'Assume national practice always controls state practice'],
      stem: ({ city }) => `A ${city} agent relies on a form package last updated several years ago. What is the exam-quality concern?`,
      explanation: () => 'Competent Arizona practice requires current knowledge of forms, rules, and state-specific requirements. Outdated forms or habits can produce disclosure and contract problems.',
    },
    {
      correct: 'The designated or employing broker must maintain meaningful supervision systems',
      distractors: ['Supervision exists only after a complaint is filed', 'Salespersons supervise the designated broker', 'Broker supervision can be waived by team policy'],
      stem: ({ city }) => `A ${city} brokerage grows quickly and adds several new licensees. Which competence duty falls on broker leadership?`,
      explanation: () => 'Arizona’s broker structure depends on meaningful supervision by the employing/designated broker. Teams and branch offices do not eliminate the broker’s supervisory duty.',
    },
  ],
  'Reasonable Skill and Care': [
    {
      correct: 'Recommend inspections and due diligence rather than guaranteeing condition',
      distractors: ['Guarantee the roof has no defects', 'Tell the buyer inspections are unnecessary', 'Ignore visible red flags because the seller disclosed nothing'],
      stem: ({ city, property }) => `A buyer asks a ${city} licensee whether a ${property} has no drainage problems. What response best reflects reasonable skill and care?`,
      explanation: () => 'Reasonable skill and care means observing, disclosing known material issues, and recommending appropriate due diligence. A licensee should not guarantee technical conditions outside expertise.',
    },
    {
      correct: 'Review deadlines carefully and remind the client of contract time frames',
      distractors: ['Assume escrow will manage every deadline', 'Ignore inspection-period dates', 'Wait until after expiration to discuss cancellation rights'],
      stem: ({ role }) => `A ${role} is helping a buyer during the inspection period. Which action best reflects reasonable care?`,
      explanation: () => 'Arizona purchase contracts contain important deadlines. A reasonably careful licensee tracks dates, communicates them, and helps the client act before rights expire.',
    },
    {
      correct: 'Communicate material transaction information promptly',
      distractors: ['Hold important updates until weekly team meeting', 'Delay bad news until closing', 'Tell only the lender and not the client'],
      stem: ({ city }) => `A ${city} seller receives notice of a buyer loan problem that may affect closing. What should the listing licensee do?`,
      explanation: () => 'Reasonable skill and care includes timely communication of material transaction information to the client. Delays can harm the client’s bargaining and decision-making position.',
    },
    {
      correct: 'Ask clarifying questions and advise the client to obtain expert review',
      distractors: ['Ignore the ambiguity', 'Rewrite the title commitment as legal counsel', 'Tell the client encumbrances never matter'],
      stem: ({ role }) => `A ${role} sees an unfamiliar exception in a title commitment. What is the best reasonable-care answer?`,
      explanation: () => 'A licensee should recognize issues that may affect the client, ask clarifying questions, and recommend title, legal, or other expert review. The licensee should not give legal conclusions beyond competence.',
    },
    {
      correct: 'Treat both clients and customers honestly and fairly',
      distractors: ['Mislead customers if it benefits the client', 'Hide all known facts from nonclients', 'Use false pressure tactics because no agency exists'],
      stem: ({ city }) => `A ${city} listing agent represents the seller and speaks with an unrepresented buyer. What duty still applies to the buyer customer?`,
      explanation: () => 'Even when the buyer is not the listing broker’s client, Arizona licensees must deal honestly and fairly and disclose required material facts. Agency loyalty does not permit deception.',
    },
    {
      correct: 'Use care when estimating values and avoid presenting unsupported numbers as guarantees',
      distractors: ['Guarantee a future appraisal amount', 'Invent comparable sales', 'Ignore material property differences'],
      stem: ({ city }) => `A ${city} seller asks for a likely listing price. What is the best reasonable-skill answer?`,
      explanation: () => 'A licensee may provide market analysis within competence, but reasonable care requires support, context, and caution. A licensee should not guarantee appraisals or fabricate comparable data.',
    },
  ],
  'Contracts': [
    {
      correct: 'Use clear written terms and obtain required signatures or initials for changes',
      distractors: ['Rely on a verbal side agreement', 'Change the price after signing without initials', 'Let escrow infer missing terms'],
      stem: ({ city, property }) => `During a ${city} purchase of a ${property}, the parties agree to change the closing date. What contract practice is safest?`,
      explanation: () => 'Arizona contract practice depends on clear written terms. Material changes should be documented and signed or initialed as required rather than handled through informal oral side agreements.',
    },
    {
      correct: 'Earnest money instructions should be followed exactly and documented',
      distractors: ['The salesperson may keep the earnest money personally', 'The buyer may ignore the deposit deadline with no consequence', 'The listing agent may redirect the money without agreement'],
      stem: ({ role }) => `A ${role} receives a contract requiring earnest money delivery to escrow by a stated deadline. What is the best answer?`,
      explanation: () => 'Earnest money is a contractual and trust-sensitive item. Delivery, deadlines, and escrow instructions should be followed and documented carefully.',
    },
    {
      correct: 'The inspection period gives the buyer a time-limited opportunity to inspect and act under the contract',
      distractors: ['The inspection period automatically lasts until closing', 'The seller controls all buyer inspections', 'Inspection rights continue after closing'],
      stem: ({ city }) => `A ${city} buyer is under contract and wants to investigate property condition. What is the best contract concept?`,
      explanation: () => 'Arizona resale contracts commonly give buyers a defined inspection or due-diligence period. Rights must be exercised within the contract deadlines.',
    },
    {
      correct: 'A counteroffer rejects the prior offer unless the parties agree otherwise',
      distractors: ['A counteroffer automatically accepts the original offer', 'A counteroffer leaves the original offer fully open forever', 'A counteroffer is never binding when signed'],
      stem: ({ city }) => `A ${city} seller changes price and terms on a buyer offer and sends it back. What is the contract effect?`,
      explanation: () => 'A counteroffer is a rejection of the original offer and a new offer on changed terms. The parties must reach mutual assent on the same terms for a contract.',
    },
    {
      correct: 'Recommend legal counsel for custom legal drafting or unusual rights',
      distractors: ['Draft a complex easement from scratch', 'Tell the client legal advice is prohibited', 'Use a blank addendum to create any legal right without review'],
      stem: ({ role }) => `A ${role} is asked to create a custom long-term occupancy right after closing. What is the safest contract answer?`,
      explanation: () => 'Licensees should avoid unauthorized practice of law. For complex, unusual, or high-risk legal rights, the licensee should recommend appropriate legal counsel.',
    },
    {
      correct: 'The seller should disclose known material latent defects',
      distractors: ['The seller may hide known defects if the buyer waives inspection', 'Only patent defects must be disclosed', 'No disclosure is required after contract acceptance'],
      stem: ({ property }) => `A seller knows of a hidden foundation issue affecting a ${property}. What contract/disclosure concept is most tested?`,
      explanation: () => 'Arizona contract practice and disclosure law focus on known material latent defects. A seller should disclose known material facts even when the buyer has inspection rights.',
    },
    {
      correct: 'A licensee should not advise a client to breach the contract',
      distractors: ['Tell the seller to ignore a signed contract because prices rose', 'Tell the buyer deadlines never matter', 'Tell both parties escrow will decide all disputes'],
      stem: ({ city }) => `After signing, a ${city} seller wants out because a higher offer arrived. What is the safest licensee response?`,
      explanation: () => 'A licensee should not advise breach or give legal conclusions about remedies. The licensee should recommend legal counsel and follow lawful client instructions within the contract.',
    },
    {
      correct: 'Contingencies must be satisfied, waived, or enforced according to their written terms',
      distractors: ['All contingencies disappear after verbal acceptance', 'Only the lender may enforce contingencies', 'Contingencies are optional suggestions'],
      stem: ({ role }) => `A ${role} is tracking an appraisal contingency in an Arizona transaction. What is the correct contract principle?`,
      explanation: () => 'Contract contingencies create written conditions and rights. They must be handled according to the agreed contract language and deadlines.',
    },
  ],
  'Critical Business Services for a Real Estate Transaction': [
    {
      correct: 'Escrow coordinates closing instructions, funds, documents, and recording steps as a neutral settlement service',
      distractors: ['Escrow represents only the listing broker', 'Escrow decides whether a contract is legally enforceable', 'Escrow replaces the need for title review'],
      stem: ({ city }) => `A first-time ${city} buyer asks what escrow does in an Arizona transaction. Which answer is best?`,
      explanation: () => 'Escrow is a critical settlement service that follows written instructions, handles funds and documents, and coordinates closing and recording steps. It does not act as legal counsel for either party.',
    },
    {
      correct: 'Title insurance and title review help identify recorded interests, liens, and exceptions',
      distractors: ['Title insurance guarantees physical condition', 'Title review replaces inspections', 'Title insurance pays the mortgage'],
      stem: ({ property }) => `A buyer of a ${property} receives a title commitment with exceptions. What business service is being used?`,
      explanation: () => 'Title services investigate and insure against certain title risks, including recorded interests and liens subject to exceptions. Title work does not inspect the building condition.',
    },
    {
      correct: 'The lender evaluates the borrower and collateral for financing approval',
      distractors: ['The lender decides whether the seller must disclose defects', 'The lender issues the subdivision public report', 'The lender replaces the escrow company'],
      stem: ({ city }) => `A ${city} buyer’s transaction depends on loan approval. Which business service evaluates the borrower and collateral?`,
      explanation: () => 'The lender underwrites the borrower and loan collateral. Financing approval is separate from seller disclosure, public reports, and escrow settlement functions.',
    },
    {
      correct: 'A home inspector evaluates observable property condition and reports findings to the client',
      distractors: ['A home inspector guarantees future value', 'A home inspector issues title insurance', 'A home inspector decides whether ADRE disciplines a licensee'],
      stem: ({ property }) => `A buyer hires an inspector for a ${property}. What is the inspector’s role?`,
      explanation: () => 'A home inspector provides a condition inspection of observable components for the client. The inspection is not an appraisal, title policy, or regulatory decision.',
    },
    {
      correct: 'An appraiser develops an opinion of value for the lender or client',
      distractors: ['An appraiser guarantees repair quality', 'An appraiser prepares the deed', 'An appraiser supervises the salesperson'],
      stem: ({ city }) => `A ${city} lender orders an appraisal in a financed purchase. What is the appraiser’s role?`,
      explanation: () => 'An appraiser develops a value opinion using appraisal standards and market evidence. The appraisal supports lending decisions but does not replace inspections or broker supervision.',
    },
    {
      correct: 'HOA or association documents can affect use, assessments, and buyer obligations',
      distractors: ['HOA documents never affect resale buyers', 'Only oral HOA summaries matter', 'HOA rules replace state license law'],
      stem: ({ property }) => `A buyer is purchasing a ${property} in an Arizona planned community. Why are association documents important?`,
      explanation: () => 'Association documents may disclose covenants, use restrictions, assessments, transfer fees, and governance rules that affect ownership. Buyers should review them as part of due diligence.',
    },
  ],
  'Ownership and Encumbrances': [
    {
      correct: 'A recorded lien or easement can burden title even though ownership transfers',
      distractors: ['All encumbrances vanish at sale automatically', 'Only physical fences can encumber property', 'An encumbrance is always a property tax refund'],
      stem: ({ city, property }) => `A title report for a ${city} ${property} shows a recorded easement. What is the best ownership concept?`,
      explanation: () => 'An encumbrance is a right or interest that burdens property, such as a lien, easement, or restriction. It may remain after transfer unless released or otherwise resolved.',
    },
    {
      correct: 'Community property principles may affect how married owners hold and transfer title',
      distractors: ['Arizona never recognizes marital property interests', 'Only one spouse can ever sign a deed', 'Community property rules apply only to commercial leases'],
      stem: ({ city }) => `A married couple in ${city} is taking title to a home. Which Arizona ownership issue may be relevant?`,
      explanation: () => 'Arizona is a community property state, so marital property concepts can affect ownership and transfer. Licensees should avoid legal advice and recommend title or legal guidance for vesting decisions.',
    },
    {
      correct: 'A deed conveys title when properly executed and delivered according to law',
      distractors: ['A deed is the same as a lease', 'A deed only lists personal property', 'A deed is created by the lender appraisal'],
      stem: ({ property }) => `The parties are closing the sale of a ${property}. Which document type conveys real property title?`,
      explanation: () => 'A deed is the instrument used to convey real property title. Escrow and title professionals typically coordinate execution, delivery, and recording according to closing instructions.',
    },
    {
      correct: 'Restrictive covenants can limit property use even when the buyer owns the property',
      distractors: ['Ownership always eliminates private restrictions', 'Covenants apply only to renters', 'Covenants are the same as mortgage interest rates'],
      stem: ({ city }) => `A buyer in ${city} learns that CC&Rs restrict short-term rentals. What is the correct ownership principle?`,
      explanation: () => 'Covenants, conditions, and restrictions can limit property use and bind owners within a community. Ownership does not automatically eliminate private restrictions.',
    },
    {
      correct: 'Property taxes and special assessments may appear as title or closing issues',
      distractors: ['Taxes never affect closing', 'Only the buyer’s income tax return matters', 'Assessments are personal property only'],
      stem: ({ property }) => `A ${property} is subject to unpaid assessments. Why is this relevant in an Arizona transaction?`,
      explanation: () => 'Property taxes and assessments can affect title, prorations, and closing obligations. They should be reviewed through title, escrow, and applicable governing documents.',
    },
    {
      correct: 'Water rights, access, and utilities are especially important in land transactions',
      distractors: ['Raw land always has guaranteed water and legal access', 'Utilities are irrelevant if the buyer pays cash', 'Access is checked only after closing'],
      stem: ({ city }) => `A buyer is considering undeveloped land outside ${city}. Which due-diligence issue is especially important?`,
      explanation: () => 'Arizona land transactions often require careful review of water, legal access, utilities, zoning, floodplain, and development limitations. These matters can materially affect use and value.',
    },
  ],
  'Foreclosure / Short Sale / Deed-in-Lieu Process': [
    {
      correct: 'A short sale requires lender approval because the sale price is less than the debt owed',
      distractors: ['A short sale needs no lender involvement', 'A short sale is always a cash-only auction', 'A short sale automatically cancels all borrower liability'],
      stem: ({ city }) => `A ${city} seller owes more than the home is expected to sell for and wants to sell before foreclosure. What is the key short-sale concept?`,
      explanation: () => 'In a short sale, the lender must approve accepting less than the full debt payoff. Approval, timing, deficiency issues, tax consequences, and credit effects should be handled with appropriate professional advice.',
    },
    {
      correct: 'A deed-in-lieu transfers title to the lender as an alternative to foreclosure if the lender agrees',
      distractors: ['A deed-in-lieu is a buyer inspection notice', 'A deed-in-lieu is the same as a subdivision public report', 'A deed-in-lieu is forced on the lender without consent'],
      stem: ({ property }) => `A distressed owner offers to convey the ${property} directly to the lender to avoid a foreclosure sale. What is this called?`,
      explanation: () => 'A deed-in-lieu of foreclosure is a voluntary conveyance to the lender accepted as an alternative to foreclosure. The lender must agree, and parties should seek legal and tax advice.',
    },
    {
      correct: 'A trustee’s sale is commonly used for foreclosure under a deed of trust',
      distractors: ['A trustee’s sale is an ordinary open house', 'A trustee’s sale is issued by the homeowners association only', 'A trustee’s sale is the same as a buyer walkthrough'],
      stem: ({ city }) => `A ${city} property secured by a deed of trust is moving through nonjudicial foreclosure. What sale process is commonly involved?`,
      explanation: () => 'Arizona real estate financing commonly uses deeds of trust, and nonjudicial foreclosure is handled through a trustee’s sale process. Licensees should avoid legal advice and recommend counsel for distressed owners.',
    },
    {
      correct: 'Recommend legal, tax, credit, and housing-counseling advice before the seller chooses a distressed-sale path',
      distractors: ['Guarantee no deficiency or tax consequence', 'Tell the seller legal advice is unnecessary', 'Choose the foreclosure option for the seller'],
      stem: ({ role }) => `A ${role} is helping a homeowner compare short sale, deed-in-lieu, and foreclosure. What is the safest licensee response?`,
      explanation: () => 'Distressed-sale choices can affect credit, taxes, deficiency exposure, occupancy, and legal rights. A licensee should recommend appropriate legal, tax, credit, and housing-counseling advice instead of guaranteeing outcomes.',
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
    const spec = specs[i % specs.length]
    const variant = Math.floor(i / specs.length)
    questions.push(makeQuestion(name, spec, seq, variant))
    seq += 1
  }
}

const stems = new Set(questions.map((q) => q.question))
if (stems.size !== questions.length) {
  throw new Error(`Duplicate stems: ${questions.length - stems.size}`)
}

await writeFile(OUT, `${JSON.stringify(questions, null, 2)}\n`)
console.log(`Wrote ${questions.length} Arizona state-law questions to ${OUT.pathname}`)
