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
    loadQuestions: () => import('./az-900-questions.json'),
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
    loadQuestions: () => import('./questions.json'),
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
    loadQuestions: () => import('./cdl-questions.json'),
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
    questionCount: 306,
    examQuestions: 50,
    examTime: 60,
    passingScore: 70,
    loadQuestions: () => import('./nca-aiio-questions.json'),
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
    title: 'NVIDIA Generalist AI',
    code: 'NCA-GENL',
    provider: 'NVIDIA',
    description: 'LLM fundamentals, training and fine-tuning, GPU infrastructure, and deploying AI solutions',
    difficulty: 'Associate',
    color: '#76b900',
    questionCount: 300,
    examQuestions: 50,
    examTime: 60,
    passingScore: 70,
    loadQuestions: () => import('./nca-genl-questions.json'),
    domains: [
      { name: 'LLM Fundamentals', weight: 25 },
      { name: 'Training and Fine-tuning LLMs', weight: 20 },
      { name: 'LLM Deployment and Inference', weight: 20 },
      { name: 'RAG and LLM Applications', weight: 15 },
      { name: 'GPU Infrastructure for LLMs', weight: 20 },
    ],
    domainColors: {
      'LLM Fundamentals': { dot: 'bg-[#76b900]', bar: 'bg-[#76b900]', text: 'text-[#76b900]', hex: '#76b900' },
      'Training and Fine-tuning LLMs': { dot: 'bg-[#1a9641]', bar: 'bg-[#1a9641]', text: 'text-[#1a9641]', hex: '#1a9641' },
      'LLM Deployment and Inference': { dot: 'bg-[#00bcd4]', bar: 'bg-[#00bcd4]', text: 'text-[#00bcd4]', hex: '#00bcd4' },
      'RAG and LLM Applications': { dot: 'bg-[#ff9800]', bar: 'bg-[#ff9800]', text: 'text-[#ff9800]', hex: '#ff9800' },
      'GPU Infrastructure for LLMs': { dot: 'bg-[#e91e63]', bar: 'bg-[#e91e63]', text: 'text-[#e91e63]', hex: '#e91e63' },
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
    loadQuestions: () => import('./comptia-net-plus-questions.json'),
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
    loadQuestions: () => import('./comptia-sec-plus-questions.json'),
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
    loadQuestions: () => import('./comptia-server-plus-questions.json'),
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
