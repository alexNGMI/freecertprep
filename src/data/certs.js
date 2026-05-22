import az900QuestionsUrl from './az-900-questions.json?url'
import awsCloudPractitionerQuestionsUrl from './questions.json?url'
import cdlQuestionsUrl from './cdl-questions.json?url'
import ncaAiioQuestionsUrl from './nca-aiio-questions.json?url'
import ncaGenlQuestionsUrl from './nca-genl-questions.json?url'
import ccstNetworkingQuestionsUrl from './ccst-networking-questions.json?url'
import comptiaNetPlusQuestionsUrl from './comptia-net-plus-questions.json?url'
import comptiaSecPlusQuestionsUrl from './comptia-sec-plus-questions.json?url'
import comptiaServerPlusQuestionsUrl from './comptia-server-plus-questions.json?url'
import comptiaAPlusCore1QuestionsUrl from './comptia-a-plus-core-1-questions.json?url'
import comptiaAPlusCore2QuestionsUrl from './comptia-a-plus-core-2-questions.json?url'
import terraformAssociateQuestionsUrl from './terraform-associate-questions.json?url'
import realEstateNationalQuestionsUrl from './real-estate-national-questions.json?url'
import realEstateTxStateQuestionsUrl from './real-estate-tx-state-questions.json?url'
import realEstateMeStateQuestionsUrl from './real-estate-me-state-questions.json?url'
import realEstateGaStateQuestionsUrl from './real-estate-ga-state-questions.json?url'
import realEstateAzStateQuestionsUrl from './real-estate-az-state-questions.json?url'
import realEstateNcStateQuestionsUrl from './real-estate-nc-state-questions.json?url'
import realEstateInStateQuestionsUrl from './real-estate-in-state-questions.json?url'

async function loadQuestionAsset(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load question bank ${url}: ${response.status}`)
  }
  return response.json()
}

async function loadCompositeQuestions(stateUrl) {
  const [national, state] = await Promise.all([
    loadQuestionAsset(realEstateNationalQuestionsUrl),
    loadQuestionAsset(stateUrl),
  ])

  return [
    ...national.map((q) => ({ ...q, portion: 'national' })),
    ...state.map((q) => ({ ...q, portion: 'state' })),
  ]
}

// Shared so state-licensing certs (real-estate-tx, future real-estate-me)
// reuse the exact national blueprint for the national half of the exam
// without duplicating it.
const RE_NATIONAL_DOMAINS = [
  { name: 'Contracts', weight: 17 },
  { name: 'General Principles of Agency', weight: 13 },
  { name: 'Practice of Real Estate', weight: 13 },
  { name: 'Financing', weight: 10 },
  { name: 'Real Estate Calculations', weight: 10 },
  { name: 'Property Ownership', weight: 8 },
  { name: 'Transfer of Title', weight: 8 },
  { name: 'Valuation and Market Analysis', weight: 7 },
  { name: 'Property Disclosures', weight: 6 },
  { name: 'Land Use Controls and Regulations', weight: 5 },
  { name: 'Leasing and Property Management', weight: 3 },
]

// Texas Sales Agent STATE-LAW portion — 40 scored items across 6 sections
// per the official Pearson VUE/TREC content outline (effective 2026-01-01).
// Weights are the exact per-section item proportions (n/40 * 100).
const TX_STATE_DOMAINS = [
  { name: 'Commission Duties & Powers', weight: 7.5 },   // 3 items
  { name: 'Licensing', weight: 7.5 },                     // 3 items
  { name: 'Standards of Conduct', weight: 22.5 },         // 9 items
  { name: 'Agency & Brokerage', weight: 27.5 },           // 11 items
  { name: 'Contracts (TREC Forms & Disclosures)', weight: 22.5 }, // 9 items
  { name: 'Special Topics (TX)', weight: 12.5 },          // 5 items
]

// Maine Sales Agent STATE-LAW portion — 40 scored items across 5 sections
// per the official Pearson VUE Maine Real Estate handbook content outline
// (Maine exam revalidated 2024). Weights are the exact per-section item
// proportions (n/40 * 100).
const ME_STATE_DOMAINS = [
  { name: 'Maine Real Estate Commission', weight: 5 },               // 2 items
  { name: 'Maine Laws & Rules Governing Licensees', weight: 37.5 },  // 15 items
  { name: 'Law of Agency/Brokerage', weight: 25 },                   // 10 items
  { name: 'Maine-Specific Principles & Practices', weight: 20 },     // 8 items
  { name: 'Maine Land-Use Law', weight: 12.5 },                      // 5 items
]

// Georgia state-law sections — PSI/AMP content outline, 52 scored state items.
// State Laws and Rules 16Q, Real Estate Practice in Georgia 21Q,
// Finance and Closing 15Q. Weights = n/52 * 100, rounded to sum to 100.
const GA_STATE_DOMAINS = [
  { name: 'Georgia State Laws and Rules', weight: 31 },              // 16 items
  { name: 'Real Estate Practice in Georgia', weight: 40 },           // 21 items
  { name: 'Finance and Closing in Georgia', weight: 29 },            // 15 items
]

// Arizona Salesperson STATE-LAW portion — 60 scored items across 11
// sections per the ADRE / Pearson VUE outline effective 2026-01-01.
// Integer weights preserve the 60-item allocation under largest-remainder
// selection while avoiding floating-point drift in the registry tests.
const AZ_STATE_DOMAINS = [
  { name: 'Arizona Real Estate Regulatory Framework', weight: 8 },          // 5 items
  { name: 'Arizona Consumer Protection Laws', weight: 8 },                  // 5 items
  { name: 'Advertising', weight: 8 },                                       // 5 items
  { name: 'Arizona Agency', weight: 10 },                                   // 6 items
  { name: 'Licensee Duties and Obligations', weight: 10 },                  // 6 items
  { name: 'Licensee Competencies and Duties', weight: 10 },                 // 6 items
  { name: 'Reasonable Skill and Care', weight: 10 },                        // 6 items
  { name: 'Contracts', weight: 14 },                                        // 8 items
  { name: 'Critical Business Services for a Real Estate Transaction', weight: 8 }, // 5 items
  { name: 'Ownership and Encumbrances', weight: 9 },                        // 5 items
  { name: 'Foreclosure / Short Sale / Deed-in-Lieu Process', weight: 5 },   // 3 items
]

// North Carolina Broker STATE-LAW portion — 60 scored items across 8
// sections per the NCREC / Pearson VUE April 2026 licensing booklet.
// Integer weights preserve the 60-item allocation under largest-remainder
// selection while avoiding floating-point drift in the registry tests.
const NC_STATE_DOMAINS = [
  { name: 'Licensure', weight: 5 },                    // 3 items
  { name: 'Agency', weight: 27 },                      // 16 items
  { name: 'Supervision / Compensation', weight: 7 },   // 4 items
  { name: 'Brokerage Practice', weight: 20 },          // 12 items
  { name: 'Taxes / Insurance', weight: 7 },            // 4 items
  { name: 'Contracts / Closing', weight: 12 },         // 7 items
  { name: 'Landlord / Tenant', weight: 5 },            // 3 items
  { name: 'Other North Carolina Laws', weight: 17 },   // 11 items
]

// Indiana Broker STATE-LAW portion — 50 scored items across 5 sections
// per the Pearson VUE outline effective 2025-03-01.
// Weights are exact item proportions (n/50 * 100).
const IN_STATE_DOMAINS = [
  { name: 'Indiana Real Estate Commission', weight: 10 },       // 5 items
  { name: 'Licensing', weight: 18 },                            // 9 items
  { name: 'Statutory and Regulatory Requirements', weight: 24 }, // 12 items
  { name: 'Statutes and Rules Governing Licensees', weight: 34 }, // 17 items
  { name: 'Real Estate Office Procedures', weight: 14 },        // 7 items
]

const APLUS_CORE_1_DOMAINS = [
  { name: 'Mobile Devices', weight: 13 },
  { name: 'Networking', weight: 23 },
  { name: 'Hardware', weight: 25 },
  { name: 'Virtualization and Cloud Computing', weight: 11 },
  { name: 'Hardware and Network Troubleshooting', weight: 28 },
]

const CCST_NETWORKING_DOMAINS = [
  { name: 'Standards and Concepts', weight: 15 },
  { name: 'Addressing and Subnet Formats', weight: 20 },
  { name: 'Endpoints and Media Types', weight: 20 },
  { name: 'Infrastructure', weight: 20 },
  { name: 'Diagnosing Problems', weight: 15 },
  { name: 'Security', weight: 10 },
]

const CCST_NETWORKING_COLORS = {
  'Standards and Concepts': { dot: 'bg-[#1d4ed8]', bar: 'bg-[#1d4ed8]', text: 'text-[#1d4ed8]', hex: '#1d4ed8' },
  'Addressing and Subnet Formats': { dot: 'bg-[#0284c7]', bar: 'bg-[#0284c7]', text: 'text-[#0284c7]', hex: '#0284c7' },
  'Endpoints and Media Types': { dot: 'bg-[#0891b2]', bar: 'bg-[#0891b2]', text: 'text-[#0891b2]', hex: '#0891b2' },
  Infrastructure: { dot: 'bg-[#0f766e]', bar: 'bg-[#0f766e]', text: 'text-[#0f766e]', hex: '#0f766e' },
  'Diagnosing Problems': { dot: 'bg-[#4f46e5]', bar: 'bg-[#4f46e5]', text: 'text-[#4f46e5]', hex: '#4f46e5' },
  Security: { dot: 'bg-[#7c3aed]', bar: 'bg-[#7c3aed]', text: 'text-[#7c3aed]', hex: '#7c3aed' },
}

const APLUS_CORE_2_DOMAINS = [
  { name: 'Operating Systems', weight: 28 },
  { name: 'Security', weight: 28 },
  { name: 'Software Troubleshooting', weight: 23 },
  { name: 'Operational Procedures', weight: 21 },
]

const APLUS_CORE_COLORS = {
  'Mobile Devices': { dot: 'bg-[#c8202f]', bar: 'bg-[#c8202f]', text: 'text-[#c8202f]', hex: '#c8202f' },
  'Networking': { dot: 'bg-[#e74c3c]', bar: 'bg-[#e74c3c]', text: 'text-[#e74c3c]', hex: '#e74c3c' },
  'Hardware': { dot: 'bg-[#f39c12]', bar: 'bg-[#f39c12]', text: 'text-[#f39c12]', hex: '#f39c12' },
  'Virtualization and Cloud Computing': { dot: 'bg-[#9b59b6]', bar: 'bg-[#9b59b6]', text: 'text-[#9b59b6]', hex: '#9b59b6' },
  'Hardware and Network Troubleshooting': { dot: 'bg-[#3498db]', bar: 'bg-[#3498db]', text: 'text-[#3498db]', hex: '#3498db' },
  'Operating Systems': { dot: 'bg-[#c8202f]', bar: 'bg-[#c8202f]', text: 'text-[#c8202f]', hex: '#c8202f' },
  'Security': { dot: 'bg-[#e74c3c]', bar: 'bg-[#e74c3c]', text: 'text-[#e74c3c]', hex: '#e74c3c' },
  'Software Troubleshooting': { dot: 'bg-[#9b59b6]', bar: 'bg-[#9b59b6]', text: 'text-[#9b59b6]', hex: '#9b59b6' },
  'Operational Procedures': { dot: 'bg-[#3498db]', bar: 'bg-[#3498db]', text: 'text-[#3498db]', hex: '#3498db' },
}

const certs = {
  'az-900': {
    id: 'az-900',
    title: 'Microsoft Azure Fundamentals',
    code: 'AZ-900',
    provider: 'Microsoft Azure',
    description: 'Foundational level knowledge of cloud services and how those services are provided with Microsoft Azure.',
    difficulty: 'Foundational',
    color: '#0078d4',
    questionCount: 600,
    examQuestions: 40,
    examTime: 45,
    passingScore: 70,
    loadQuestions: () => loadQuestionAsset(az900QuestionsUrl),
    domains: [
      { name: 'Describe cloud concepts', weight: 25 },
      { name: 'Describe Azure architecture and services', weight: 40 },
      { name: 'Describe Azure management and governance', weight: 35 },
    ],
    domainColors: {
      'Describe cloud concepts': { dot: 'bg-[#0078d4]', bar: 'bg-[#0078d4]', text: 'text-[#0078d4]', hex: '#0078d4' },
      'Describe Azure architecture and services': { dot: 'bg-[#5c2d91]', bar: 'bg-[#5c2d91]', text: 'text-[#5c2d91]', hex: '#5c2d91' },
      'Describe Azure management and governance': { dot: 'bg-[#008272]', bar: 'bg-[#008272]', text: 'text-[#008272]', hex: '#008272' },
    },
  },
  'clf-c02': {
    id: 'clf-c02',
    title: 'AWS Cloud Practitioner',
    code: 'CLF-C02',
    provider: 'AWS',
    description: 'Foundational understanding of AWS Cloud, services, and terminology',
    difficulty: 'Foundational',
    color: '#f1be32',
    questionCount: 731,
    examQuestions: 65,
    examTime: 90,
    passingScore: 70,
    loadQuestions: () => loadQuestionAsset(awsCloudPractitionerQuestionsUrl),
    domains: [
      { name: 'Cloud Concepts', weight: 24 },
      { name: 'Security and Compliance', weight: 30 },
      { name: 'Cloud Technology and Services', weight: 34 },
      { name: 'Billing, Pricing and Support', weight: 12 },
    ],
    domainColors: {
      'Cloud Concepts': { dot: 'bg-[#99c9ff]', bar: 'bg-[#99c9ff]', text: 'text-[#99c9ff]', hex: '#99c9ff' },
      'Security and Compliance': { dot: 'bg-[#acd157]', bar: 'bg-[#acd157]', text: 'text-[#acd157]', hex: '#acd157' },
      'Cloud Technology and Services': { dot: 'bg-[#dbb8ff]', bar: 'bg-[#dbb8ff]', text: 'text-[#dbb8ff]', hex: '#dbb8ff' },
      'Billing, Pricing and Support': { dot: 'bg-[#f1be32]', bar: 'bg-[#f1be32]', text: 'text-[#f1be32]', hex: '#f1be32' },
    },
  },
  'cdl': {
    id: 'cdl',
    title: 'Google Cloud Digital Leader',
    code: 'CDL',
    provider: 'Google Cloud',
    description: 'Foundational knowledge of cloud concepts and Google Cloud products and services',
    difficulty: 'Foundational',
    color: '#4285f4',
    questionCount: 749,
    examQuestions: 50,
    examTime: 90,
    passingScore: 70,
    loadQuestions: () => loadQuestionAsset(cdlQuestionsUrl),
    domains: [
      { name: 'Digital Transformation with Google Cloud', weight: 17 },
      { name: 'Innovating with Data and Google Cloud', weight: 23 },
      { name: 'Infrastructure and Application Modernization', weight: 23 },
      { name: 'Google Cloud Security and Operations', weight: 37 },
    ],
    domainColors: {
      'Digital Transformation with Google Cloud': { dot: 'bg-[#4285f4]', bar: 'bg-[#4285f4]', text: 'text-[#4285f4]', hex: '#4285f4' },
      'Innovating with Data and Google Cloud': { dot: 'bg-[#34a853]', bar: 'bg-[#34a853]', text: 'text-[#34a853]', hex: '#34a853' },
      'Infrastructure and Application Modernization': { dot: 'bg-[#fbbc05]', bar: 'bg-[#fbbc05]', text: 'text-[#fbbc05]', hex: '#fbbc05' },
      'Google Cloud Security and Operations': { dot: 'bg-[#ea4335]', bar: 'bg-[#ea4335]', text: 'text-[#ea4335]', hex: '#ea4335' },
    },
  },
  'nca-aiio': {
    id: 'nca-aiio',
    title: 'NVIDIA AI Infrastructure & Operations',
    code: 'NCA-AIIO',
    provider: 'NVIDIA',
    description: 'AI infrastructure, GPU workload management, networking, storage, and AI software frameworks',
    difficulty: 'Associate',
    color: '#76b900',
    questionCount: 336,
    examQuestions: 50,
    examTime: 60,
    passingScore: 70,
    loadQuestions: () => loadQuestionAsset(ncaAiioQuestionsUrl),
    domains: [
      { name: 'AI Infrastructure', weight: 40 },
      { name: 'Essential AI Knowledge', weight: 38 },
      { name: 'AI Operations', weight: 22 },
    ],
    domainColors: {
      'AI Infrastructure': { dot: 'bg-[#76b900]', bar: 'bg-[#76b900]', text: 'text-[#76b900]', hex: '#76b900' },
      'Essential AI Knowledge': { dot: 'bg-[#00bcd4]', bar: 'bg-[#00bcd4]', text: 'text-[#00bcd4]', hex: '#00bcd4' },
      'AI Operations': { dot: 'bg-[#ff9800]', bar: 'bg-[#ff9800]', text: 'text-[#ff9800]', hex: '#ff9800' },
    },
  },
  'nca-genl': {
    id: 'nca-genl',
    title: 'NVIDIA Generative AI LLMs',
    code: 'NCA-GENL',
    provider: 'NVIDIA',
    description: 'Foundational generative AI and large language model concepts for developing, integrating, and maintaining AI-driven applications with NVIDIA solutions.',
    difficulty: 'Associate',
    color: '#76b900',
    questionCount: 330,
    examQuestions: 50,
    examTime: 60,
    passingScore: 70,
    loadQuestions: () => loadQuestionAsset(ncaGenlQuestionsUrl),
    domains: [
      { name: 'Core Machine Learning and AI Knowledge', weight: 30 },
      { name: 'Software Development', weight: 24 },
      { name: 'Experimentation', weight: 22 },
      { name: 'Data Analysis and Visualization', weight: 14 },
      { name: 'Trustworthy AI', weight: 10 },
    ],
    domainColors: {
      'Core Machine Learning and AI Knowledge': { dot: 'bg-[#76b900]', bar: 'bg-[#76b900]', text: 'text-[#76b900]', hex: '#76b900' },
      'Software Development': { dot: 'bg-[#00bcd4]', bar: 'bg-[#00bcd4]', text: 'text-[#00bcd4]', hex: '#00bcd4' },
      'Experimentation': { dot: 'bg-[#1a9641]', bar: 'bg-[#1a9641]', text: 'text-[#1a9641]', hex: '#1a9641' },
      'Data Analysis and Visualization': { dot: 'bg-[#ff9800]', bar: 'bg-[#ff9800]', text: 'text-[#ff9800]', hex: '#ff9800' },
      'Trustworthy AI': { dot: 'bg-[#e91e63]', bar: 'bg-[#e91e63]', text: 'text-[#e91e63]', hex: '#e91e63' },
    },
  },
  'comptia-net-plus': {
    id: 'comptia-net-plus',
    title: 'CompTIA Network+',
    code: 'N10-009',
    provider: 'CompTIA',
    description: 'Establishes foundational networking knowledge — protocols, topologies, troubleshooting, and security — for entry-level network roles.',
    difficulty: 'Foundational',
    color: '#c8202f',
    questionCount: 750,
    examQuestions: 90,
    examTime: 90,
    passingScore: 80,
    loadQuestions: () => loadQuestionAsset(comptiaNetPlusQuestionsUrl),
    domains: [
      { name: 'Networking Concepts', weight: 23 },
      { name: 'Network Implementation', weight: 20 },
      { name: 'Network Operations', weight: 19 },
      { name: 'Network Security', weight: 14 },
      { name: 'Network Troubleshooting', weight: 24 },
    ],
    domainColors: {
      'Networking Concepts': { dot: 'bg-[#c8202f]', bar: 'bg-[#c8202f]', text: 'text-[#c8202f]', hex: '#c8202f' },
      'Network Implementation': { dot: 'bg-[#e74c3c]', bar: 'bg-[#e74c3c]', text: 'text-[#e74c3c]', hex: '#e74c3c' },
      'Network Operations': { dot: 'bg-[#f39c12]', bar: 'bg-[#f39c12]', text: 'text-[#f39c12]', hex: '#f39c12' },
      'Network Security': { dot: 'bg-[#9b59b6]', bar: 'bg-[#9b59b6]', text: 'text-[#9b59b6]', hex: '#9b59b6' },
      'Network Troubleshooting': { dot: 'bg-[#3498db]', bar: 'bg-[#3498db]', text: 'text-[#3498db]', hex: '#3498db' },
    },
  },
  'ccst-networking': {
    id: 'ccst-networking',
    title: 'Cisco CCST Networking',
    code: '100-150',
    provider: 'Cisco',
    description: 'Cisco-oriented foundational networking support credential for learners who want a CCNA-aligned starting point before deeper Cisco study.',
    difficulty: 'Foundational',
    color: '#1d4ed8',
    questionCount: 270,
    examQuestions: 50,
    examTime: 50,
    passingScore: 70,
    loadQuestions: () => loadQuestionAsset(ccstNetworkingQuestionsUrl),
    domains: CCST_NETWORKING_DOMAINS,
    domainColors: CCST_NETWORKING_COLORS,
  },
  'comptia-sec-plus': {
    id: 'comptia-sec-plus',
    title: 'CompTIA Security+',
    code: 'SY0-701',
    provider: 'CompTIA',
    description: 'Validates baseline cybersecurity skills — threats, architecture, operations, and governance — for entry-level security roles.',
    difficulty: 'Foundational',
    color: '#c8202f',
    questionCount: 750,
    examQuestions: 90,
    examTime: 90,
    passingScore: 83,
    loadQuestions: () => loadQuestionAsset(comptiaSecPlusQuestionsUrl),
    domains: [
      { name: 'General Security Concepts', weight: 12 },
      { name: 'Threats, Vulnerabilities, and Mitigations', weight: 22 },
      { name: 'Security Architecture', weight: 18 },
      { name: 'Security Operations', weight: 28 },
      { name: 'Security Program Management and Oversight', weight: 20 },
    ],
    domainColors: {
      'General Security Concepts': { dot: 'bg-[#c8202f]', bar: 'bg-[#c8202f]', text: 'text-[#c8202f]', hex: '#c8202f' },
      'Threats, Vulnerabilities, and Mitigations': { dot: 'bg-[#e74c3c]', bar: 'bg-[#e74c3c]', text: 'text-[#e74c3c]', hex: '#e74c3c' },
      'Security Architecture': { dot: 'bg-[#9b59b6]', bar: 'bg-[#9b59b6]', text: 'text-[#9b59b6]', hex: '#9b59b6' },
      'Security Operations': { dot: 'bg-[#3498db]', bar: 'bg-[#3498db]', text: 'text-[#3498db]', hex: '#3498db' },
      'Security Program Management and Oversight': { dot: 'bg-[#f39c12]', bar: 'bg-[#f39c12]', text: 'text-[#f39c12]', hex: '#f39c12' },
    },
  },
  'comptia-server-plus': {
    id: 'comptia-server-plus',
    title: 'CompTIA Server+',
    code: 'SK0-005',
    provider: 'CompTIA',
    description: 'Validates server hardware and software technologies, including virtualization, storage, and server administration for data center roles.',
    difficulty: 'Foundational',
    color: '#c8202f',
    questionCount: 750,
    examQuestions: 90,
    examTime: 90,
    passingScore: 83,
    loadQuestions: () => loadQuestionAsset(comptiaServerPlusQuestionsUrl),
    domains: [
      { name: 'Server Hardware Installation and Management', weight: 18 },
      { name: 'Server Administration', weight: 30 },
      { name: 'Security and Disaster Recovery', weight: 24 },
      { name: 'Troubleshooting', weight: 28 },
    ],
    domainColors: {
      'Server Hardware Installation and Management': { dot: 'bg-[#c8202f]', bar: 'bg-[#c8202f]', text: 'text-[#c8202f]', hex: '#c8202f' },
      'Server Administration': { dot: 'bg-[#e74c3c]', bar: 'bg-[#e74c3c]', text: 'text-[#e74c3c]', hex: '#e74c3c' },
      'Security and Disaster Recovery': { dot: 'bg-[#9b59b6]', bar: 'bg-[#9b59b6]', text: 'text-[#9b59b6]', hex: '#9b59b6' },
      'Troubleshooting': { dot: 'bg-[#3498db]', bar: 'bg-[#3498db]', text: 'text-[#3498db]', hex: '#3498db' },
    },
  },
  'comptia-a-plus-core-1': {
    id: 'comptia-a-plus-core-1',
    title: 'CompTIA A+ Core 1',
    code: '220-1201',
    provider: 'CompTIA',
    description: 'First half of the CompTIA A+ V15 certification: mobile devices, networking, hardware, virtualization, cloud computing, and hardware/network troubleshooting.',
    difficulty: 'Foundational',
    color: '#c8202f',
    questionCount: 270,
    examQuestions: 90,
    examTime: 90,
    passingScore: 75,
    published: false,
    loadQuestions: () => loadQuestionAsset(comptiaAPlusCore1QuestionsUrl),
    domains: APLUS_CORE_1_DOMAINS,
    domainColors: APLUS_CORE_COLORS,
  },
  'comptia-a-plus-core-2': {
    id: 'comptia-a-plus-core-2',
    title: 'CompTIA A+ Core 2',
    code: '220-1202',
    provider: 'CompTIA',
    description: 'Second half of the CompTIA A+ V15 certification: operating systems, security, software troubleshooting, and operational procedures.',
    difficulty: 'Foundational',
    color: '#c8202f',
    questionCount: 270,
    examQuestions: 90,
    examTime: 90,
    passingScore: 78,
    published: false,
    loadQuestions: () => loadQuestionAsset(comptiaAPlusCore2QuestionsUrl),
    domains: APLUS_CORE_2_DOMAINS,
    domainColors: APLUS_CORE_COLORS,
  },
  'terraform-associate': {
    id: 'terraform-associate',
    title: 'HashiCorp Terraform Associate',
    code: 'TF Associate 004',
    provider: 'HashiCorp',
    description: 'Infrastructure-as-Code fundamentals for Terraform 1.12: providers, workflow, configuration, modules, state, CLI maintenance, and HCP Terraform.',
    difficulty: 'Associate',
    color: '#7c3aed',
    questionCount: 632,
    examQuestions: 57,
    examTime: 60,
    passingScore: 70,
    loadQuestions: () => loadQuestionAsset(terraformAssociateQuestionsUrl),
    domains: [
      { name: 'Infrastructure as Code (IaC) with Terraform', weight: 16 },
      { name: 'Terraform fundamentals', weight: 12 },
      { name: 'Core Terraform workflow', weight: 16 },
      { name: 'Terraform configuration', weight: 14 },
      { name: 'Terraform modules', weight: 12 },
      { name: 'Terraform state management', weight: 14 },
      { name: 'Maintain infrastructure with Terraform', weight: 10 },
      { name: 'HCP Terraform', weight: 6 },
    ],
    domainColors: {
      'Infrastructure as Code (IaC) with Terraform': { dot: 'bg-[#7c3aed]', bar: 'bg-[#7c3aed]', text: 'text-[#7c3aed]', hex: '#7c3aed' },
      'Terraform fundamentals': { dot: 'bg-[#8b5cf6]', bar: 'bg-[#8b5cf6]', text: 'text-[#8b5cf6]', hex: '#8b5cf6' },
      'Core Terraform workflow': { dot: 'bg-[#7e22ce]', bar: 'bg-[#7e22ce]', text: 'text-[#7e22ce]', hex: '#7e22ce' },
      'Terraform configuration': { dot: 'bg-[#6366f1]', bar: 'bg-[#6366f1]', text: 'text-[#6366f1]', hex: '#6366f1' },
      'Terraform modules': { dot: 'bg-[#5b21b6]', bar: 'bg-[#5b21b6]', text: 'text-[#5b21b6]', hex: '#5b21b6' },
      'Terraform state management': { dot: 'bg-[#9333ea]', bar: 'bg-[#9333ea]', text: 'text-[#9333ea]', hex: '#9333ea' },
      'Maintain infrastructure with Terraform': { dot: 'bg-[#a78bfa]', bar: 'bg-[#a78bfa]', text: 'text-[#a78bfa]', hex: '#a78bfa' },
      'HCP Terraform': { dot: 'bg-[#4f46e5]', bar: 'bg-[#4f46e5]', text: 'text-[#4f46e5]', hex: '#4f46e5' },
    },
  },
  'real-estate-national': {
    id: 'real-estate-national',
    title: 'National Real Estate Salesperson Exam',
    code: 'PSI National',
    provider: 'Real Estate',
    description: 'The portable national / uniform portion of the US real estate salesperson licensing exam — tested in ~48 states. Domains follow the post-October-2023 PSI content outline.',
    difficulty: 'Foundational',
    color: '#dc2626',
    questionCount: 750,
    examQuestions: 80,
    examTime: 120,
    passingScore: 75,
    published: false,
    loadQuestions: () => loadQuestionAsset(realEstateNationalQuestionsUrl),
    domains: RE_NATIONAL_DOMAINS,
    domainColors: {
      'Contracts':                         { dot: 'bg-[#dc2626]', bar: 'bg-[#dc2626]', text: 'text-[#dc2626]', hex: '#dc2626' },
      'General Principles of Agency':      { dot: 'bg-[#ea580c]', bar: 'bg-[#ea580c]', text: 'text-[#ea580c]', hex: '#ea580c' },
      'Practice of Real Estate':           { dot: 'bg-[#d97706]', bar: 'bg-[#d97706]', text: 'text-[#d97706]', hex: '#d97706' },
      'Financing':                         { dot: 'bg-[#16a34a]', bar: 'bg-[#16a34a]', text: 'text-[#16a34a]', hex: '#16a34a' },
      'Real Estate Calculations':          { dot: 'bg-[#0891b2]', bar: 'bg-[#0891b2]', text: 'text-[#0891b2]', hex: '#0891b2' },
      'Property Ownership':                { dot: 'bg-[#7c3aed]', bar: 'bg-[#7c3aed]', text: 'text-[#7c3aed]', hex: '#7c3aed' },
      'Transfer of Title':                 { dot: 'bg-[#9333ea]', bar: 'bg-[#9333ea]', text: 'text-[#9333ea]', hex: '#9333ea' },
      'Valuation and Market Analysis':     { dot: 'bg-[#db2777]', bar: 'bg-[#db2777]', text: 'text-[#db2777]', hex: '#db2777' },
      'Property Disclosures':              { dot: 'bg-[#ca8a04]', bar: 'bg-[#ca8a04]', text: 'text-[#ca8a04]', hex: '#ca8a04' },
      'Land Use Controls and Regulations': { dot: 'bg-[#65a30d]', bar: 'bg-[#65a30d]', text: 'text-[#65a30d]', hex: '#65a30d' },
      'Leasing and Property Management':   { dot: 'bg-[#4f46e5]', bar: 'bg-[#4f46e5]', text: 'text-[#4f46e5]', hex: '#4f46e5' },
    },
  },
  // ── State-licensing module (Phase A scaffold) ──────────────────────────
  // The national half is the shared real-estate-national pool (tagged
  // portion:'national' at load); the state half is authored in
  // real-estate-tx-state-questions.json (empty until Phase B) and its
  // questions carry portion:'state'. `composite` drives the combined
  // "Full Licensing Exam" via selectLicensingExam(). questionCount is the
  // STATE pool size (0 now); national is merged at load time and is not
  // double-counted in the catalog.
  'real-estate-tx': {
    id: 'real-estate-tx',
    title: 'Texas Real Estate Sales Agent Exam',
    code: 'TX TREC',
    provider: 'Real Estate',
    description: 'Texas Sales Agent licensing exam: the portable national portion plus the Texas state-law portion. State-law content is modeled to the official 6-section TREC / Pearson VUE outline; the Full Licensing Exam mirrors the real 85 national + 40 state split.',
    difficulty: 'Foundational',
    color: '#dc2626',
    questionCount: 401,
    examQuestions: 125,
    examTime: 240,
    passingScore: 70,
    published: false,
    loadQuestions: () => loadCompositeQuestions(realEstateTxStateQuestionsUrl),
    // Real exam: 85 national + 40 state; each section passed independently.
    composite: {
      national: { count: 85, domains: RE_NATIONAL_DOMAINS },
      state: { count: 40, domains: TX_STATE_DOMAINS },
    },
    // Dashboard / state-practice taxonomy is the TX state-law sections.
    domains: TX_STATE_DOMAINS,
    domainColors: {
      'Commission Duties & Powers':            { dot: 'bg-[#dc2626]', bar: 'bg-[#dc2626]', text: 'text-[#dc2626]', hex: '#dc2626' },
      'Licensing':                             { dot: 'bg-[#ea580c]', bar: 'bg-[#ea580c]', text: 'text-[#ea580c]', hex: '#ea580c' },
      'Standards of Conduct':                  { dot: 'bg-[#d97706]', bar: 'bg-[#d97706]', text: 'text-[#d97706]', hex: '#d97706' },
      'Agency & Brokerage':                    { dot: 'bg-[#16a34a]', bar: 'bg-[#16a34a]', text: 'text-[#16a34a]', hex: '#16a34a' },
      'Contracts (TREC Forms & Disclosures)':  { dot: 'bg-[#0891b2]', bar: 'bg-[#0891b2]', text: 'text-[#0891b2]', hex: '#0891b2' },
      'Special Topics (TX)':                   { dot: 'bg-[#7c3aed]', bar: 'bg-[#7c3aed]', text: 'text-[#7c3aed]', hex: '#7c3aed' },
    },
  },
  // Maine Sales Agent module — same layered architecture as real-estate-tx.
  // National half = shared real-estate-national pool (portion:'national');
  // state half authored in real-estate-me-state-questions.json
  // (portion:'state'). Full Licensing Exam mirrors the real Maine split:
  // 80 national + 40 state, 75% pass each section. questionCount is the
  // STATE pool size (0 until the ME pool is authored).
  'real-estate-me': {
    id: 'real-estate-me',
    title: 'Maine Real Estate Sales Agent Exam',
    code: 'ME PSI',
    provider: 'Real Estate',
    description: 'Maine Sales Agent licensing exam: the portable national portion plus the Maine state-law portion. State-law content is modeled to the official 5-section Pearson VUE Maine content outline; the Full Licensing Exam mirrors the real 80 national + 40 state split.',
    difficulty: 'Foundational',
    color: '#dc2626',
    questionCount: 400,
    examQuestions: 120,
    examTime: 240,
    passingScore: 75,
    published: false,
    loadQuestions: () => loadCompositeQuestions(realEstateMeStateQuestionsUrl),
    // Real exam: 80 national + 40 state; each section passed independently.
    composite: {
      national: { count: 80, domains: RE_NATIONAL_DOMAINS },
      state: { count: 40, domains: ME_STATE_DOMAINS },
    },
    // Dashboard / state-practice taxonomy is the Maine state-law sections.
    domains: ME_STATE_DOMAINS,
    domainColors: {
      'Maine Real Estate Commission':            { dot: 'bg-[#dc2626]', bar: 'bg-[#dc2626]', text: 'text-[#dc2626]', hex: '#dc2626' },
      'Maine Laws & Rules Governing Licensees':  { dot: 'bg-[#ea580c]', bar: 'bg-[#ea580c]', text: 'text-[#ea580c]', hex: '#ea580c' },
      'Law of Agency/Brokerage':                 { dot: 'bg-[#d97706]', bar: 'bg-[#d97706]', text: 'text-[#d97706]', hex: '#d97706' },
      'Maine-Specific Principles & Practices':   { dot: 'bg-[#16a34a]', bar: 'bg-[#16a34a]', text: 'text-[#16a34a]', hex: '#16a34a' },
      'Maine Land-Use Law':                      { dot: 'bg-[#0891b2]', bar: 'bg-[#0891b2]', text: 'text-[#0891b2]', hex: '#0891b2' },
    },
  },
  // Georgia Sales Agent module — layered national + state architecture.
  // National half = shared real-estate-national pool (portion:'national');
  // state half authored in real-estate-ga-state-questions.json
  // (portion:'state'). Full Licensing Exam mirrors the real Georgia split:
  // 100 national + 52 state, 75% pass each section. questionCount is the
  // STATE pool size (0 until the GA pool is authored).
  'real-estate-ga': {
    id: 'real-estate-ga',
    title: 'Georgia Real Estate Sales Agent Exam',
    code: 'GA PSI',
    provider: 'Real Estate',
    description: 'Georgia Sales Agent licensing exam: the portable national portion plus the Georgia state-law portion. State-law content is modeled to the official 3-section PSI/AMP Georgia content outline; the Full Licensing Exam mirrors the real 100 national + 52 state split.',
    difficulty: 'Foundational',
    color: '#dc2626',
    questionCount: 400,
    examQuestions: 152,
    examTime: 240,
    passingScore: 75,
    published: false,
    loadQuestions: () => loadCompositeQuestions(realEstateGaStateQuestionsUrl),
    // Real exam: 100 national + 52 state; each section passed independently.
    composite: {
      national: { count: 100, domains: RE_NATIONAL_DOMAINS },
      state: { count: 52, domains: GA_STATE_DOMAINS },
    },
    // Dashboard / state-practice taxonomy is the GA state-law sections.
    domains: GA_STATE_DOMAINS,
    domainColors: {
      'Georgia State Laws and Rules':      { dot: 'bg-[#dc2626]', bar: 'bg-[#dc2626]', text: 'text-[#dc2626]', hex: '#dc2626' },
      'Real Estate Practice in Georgia':   { dot: 'bg-[#ea580c]', bar: 'bg-[#ea580c]', text: 'text-[#ea580c]', hex: '#ea580c' },
      'Finance and Closing in Georgia':    { dot: 'bg-[#d97706]', bar: 'bg-[#d97706]', text: 'text-[#d97706]', hex: '#d97706' },
    },
  },
  // Arizona Salesperson module — layered national + state architecture.
  // National half = shared real-estate-national pool (portion:'national');
  // state half authored in real-estate-az-state-questions.json
  // (portion:'state'). Full Licensing Exam mirrors the real Arizona split:
  // 80 national + 60 state, 75% pass target.
  'real-estate-az': {
    id: 'real-estate-az',
    title: 'Arizona Real Estate Salesperson Exam',
    code: 'AZ ADRE',
    provider: 'Real Estate',
    description: 'Arizona Salesperson licensing exam: the portable national portion plus the Arizona state-law portion. State-law content is modeled to the official 11-section ADRE / Pearson VUE outline effective 2026-01-01; the Full Licensing Exam mirrors the real 80 national + 60 state split.',
    difficulty: 'Foundational',
    color: '#dc2626',
    questionCount: 400,
    examQuestions: 140,
    examTime: 300,
    passingScore: 75,
    published: false,
    loadQuestions: () => loadCompositeQuestions(realEstateAzStateQuestionsUrl),
    // Real exam: 80 national + 60 state; Arizona uses a 75% pass target.
    composite: {
      national: { count: 80, domains: RE_NATIONAL_DOMAINS },
      state: { count: 60, domains: AZ_STATE_DOMAINS },
    },
    // Dashboard / state-practice taxonomy is the Arizona state-law sections.
    domains: AZ_STATE_DOMAINS,
    domainColors: {
      'Arizona Real Estate Regulatory Framework':              { dot: 'bg-[#dc2626]', bar: 'bg-[#dc2626]', text: 'text-[#dc2626]', hex: '#dc2626' },
      'Arizona Consumer Protection Laws':                      { dot: 'bg-[#ea580c]', bar: 'bg-[#ea580c]', text: 'text-[#ea580c]', hex: '#ea580c' },
      'Advertising':                                           { dot: 'bg-[#d97706]', bar: 'bg-[#d97706]', text: 'text-[#d97706]', hex: '#d97706' },
      'Arizona Agency':                                        { dot: 'bg-[#16a34a]', bar: 'bg-[#16a34a]', text: 'text-[#16a34a]', hex: '#16a34a' },
      'Licensee Duties and Obligations':                       { dot: 'bg-[#0891b2]', bar: 'bg-[#0891b2]', text: 'text-[#0891b2]', hex: '#0891b2' },
      'Licensee Competencies and Duties':                      { dot: 'bg-[#2563eb]', bar: 'bg-[#2563eb]', text: 'text-[#2563eb]', hex: '#2563eb' },
      'Reasonable Skill and Care':                             { dot: 'bg-[#7c3aed]', bar: 'bg-[#7c3aed]', text: 'text-[#7c3aed]', hex: '#7c3aed' },
      'Contracts':                                             { dot: 'bg-[#db2777]', bar: 'bg-[#db2777]', text: 'text-[#db2777]', hex: '#db2777' },
      'Critical Business Services for a Real Estate Transaction': { dot: 'bg-[#ca8a04]', bar: 'bg-[#ca8a04]', text: 'text-[#ca8a04]', hex: '#ca8a04' },
      'Ownership and Encumbrances':                            { dot: 'bg-[#65a30d]', bar: 'bg-[#65a30d]', text: 'text-[#65a30d]', hex: '#65a30d' },
      'Foreclosure / Short Sale / Deed-in-Lieu Process':       { dot: 'bg-[#4f46e5]', bar: 'bg-[#4f46e5]', text: 'text-[#4f46e5]', hex: '#4f46e5' },
    },
  },
  // North Carolina Broker module — layered national + state architecture.
  // National half = shared real-estate-national pool (portion:'national');
  // state half authored in real-estate-nc-state-questions.json
  // (portion:'state'). Full Licensing Exam mirrors the current NCREC split:
  // 80 national + 60 state, 75 passing score computed separately by section.
  'real-estate-nc': {
    id: 'real-estate-nc',
    title: 'North Carolina Real Estate Broker Exam',
    code: 'NCREC',
    provider: 'Real Estate',
    description: 'North Carolina Broker licensing exam: the portable national portion plus the North Carolina state-law portion. State-law content is modeled to the official 8-section NCREC / Pearson VUE April 2026 outline; the Full Licensing Exam mirrors the real 80 national + 60 state split.',
    difficulty: 'Foundational',
    color: '#dc2626',
    questionCount: 400,
    examQuestions: 140,
    examTime: 240,
    passingScore: 75,
    published: false,
    loadQuestions: () => loadCompositeQuestions(realEstateNcStateQuestionsUrl),
    // Real exam: 80 national + 60 state; sections are timed/scored separately.
    composite: {
      national: { count: 80, domains: RE_NATIONAL_DOMAINS },
      state: { count: 60, domains: NC_STATE_DOMAINS },
    },
    // Dashboard / state-practice taxonomy is the NC state-law sections.
    domains: NC_STATE_DOMAINS,
    domainColors: {
      'Licensure':                    { dot: 'bg-[#dc2626]', bar: 'bg-[#dc2626]', text: 'text-[#dc2626]', hex: '#dc2626' },
      'Agency':                       { dot: 'bg-[#ea580c]', bar: 'bg-[#ea580c]', text: 'text-[#ea580c]', hex: '#ea580c' },
      'Supervision / Compensation':   { dot: 'bg-[#d97706]', bar: 'bg-[#d97706]', text: 'text-[#d97706]', hex: '#d97706' },
      'Brokerage Practice':           { dot: 'bg-[#16a34a]', bar: 'bg-[#16a34a]', text: 'text-[#16a34a]', hex: '#16a34a' },
      'Taxes / Insurance':            { dot: 'bg-[#0891b2]', bar: 'bg-[#0891b2]', text: 'text-[#0891b2]', hex: '#0891b2' },
      'Contracts / Closing':          { dot: 'bg-[#2563eb]', bar: 'bg-[#2563eb]', text: 'text-[#2563eb]', hex: '#2563eb' },
      'Landlord / Tenant':            { dot: 'bg-[#7c3aed]', bar: 'bg-[#7c3aed]', text: 'text-[#7c3aed]', hex: '#7c3aed' },
      'Other North Carolina Laws':    { dot: 'bg-[#db2777]', bar: 'bg-[#db2777]', text: 'text-[#db2777]', hex: '#db2777' },
    },
  },
  // Indiana Broker module — layered national + state architecture.
  // National half = shared real-estate-national pool (portion:'national');
  // state half authored in real-estate-in-state-questions.json
  // (portion:'state'). Full Licensing Exam mirrors the current Pearson VUE
  // split: 80 national + 50 state, scaled passing score of 75.
  'real-estate-in': {
    id: 'real-estate-in',
    title: 'Indiana Real Estate Broker Exam',
    code: 'IN PLA',
    provider: 'Real Estate',
    description: 'Indiana Broker licensing exam: the portable national portion plus the Indiana state-law portion. State-law content is modeled to the official 5-section Pearson VUE outline effective 2025-03-01; the Full Licensing Exam mirrors the real 80 national + 50 state split.',
    difficulty: 'Foundational',
    color: '#dc2626',
    questionCount: 400,
    examQuestions: 130,
    examTime: 240,
    passingScore: 75,
    published: false,
    loadQuestions: () => loadCompositeQuestions(realEstateInStateQuestionsUrl),
    // Real exam: 80 national + 50 state; Indiana reports a scaled pass score of 75.
    composite: {
      national: { count: 80, domains: RE_NATIONAL_DOMAINS },
      state: { count: 50, domains: IN_STATE_DOMAINS },
    },
    // Dashboard / state-practice taxonomy is the Indiana state-law sections.
    domains: IN_STATE_DOMAINS,
    domainColors: {
      'Indiana Real Estate Commission':           { dot: 'bg-[#dc2626]', bar: 'bg-[#dc2626]', text: 'text-[#dc2626]', hex: '#dc2626' },
      'Licensing':                                { dot: 'bg-[#ea580c]', bar: 'bg-[#ea580c]', text: 'text-[#ea580c]', hex: '#ea580c' },
      'Statutory and Regulatory Requirements':    { dot: 'bg-[#d97706]', bar: 'bg-[#d97706]', text: 'text-[#d97706]', hex: '#d97706' },
      'Statutes and Rules Governing Licensees':   { dot: 'bg-[#16a34a]', bar: 'bg-[#16a34a]', text: 'text-[#16a34a]', hex: '#16a34a' },
      'Real Estate Office Procedures':            { dot: 'bg-[#0891b2]', bar: 'bg-[#0891b2]', text: 'text-[#0891b2]', hex: '#0891b2' },
    },
  },
}

export function getCert(certId) {
  return certs[certId] || null
}

/**
 * Returns only certs with content ready for users. Certs with
 * `published: false` are registered for content authoring but hidden
 * from the home catalog, navigation, and Smart Practice pools until
 * their question pool is ready to ship.
 */
export function getAllCerts() {
  return Object.values(certs).filter(c => c.published !== false)
}

/**
 * Returns every cert including unpublished — useful for content tooling
 * and tests that need to validate work-in-progress certs.
 */
export function getAllCertsIncludingUnpublished() {
  return Object.values(certs)
}

export default certs
