const certs = {
  'clf-c02': {
    id: 'clf-c02',
    title: 'AWS Cloud Practitioner',
    code: 'CLF-C02',
    provider: 'AWS',
    description: 'Foundational understanding of AWS Cloud, services, and terminology',
    difficulty: 'Foundational',
    color: '#f1be32',
    questionCount: 150,
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
      'Cloud Concepts': { dot: 'bg-[#99c9ff]', bar: 'bg-[#99c9ff]', text: 'text-[#99c9ff]' },
      'Security and Compliance': { dot: 'bg-[#acd157]', bar: 'bg-[#acd157]', text: 'text-[#acd157]' },
      'Cloud Technology and Services': { dot: 'bg-[#dbb8ff]', bar: 'bg-[#dbb8ff]', text: 'text-[#dbb8ff]' },
      'Billing, Pricing and Support': { dot: 'bg-[#f1be32]', bar: 'bg-[#f1be32]', text: 'text-[#f1be32]' },
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
    questionCount: 150,
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
      'Digital Transformation with Google Cloud': { dot: 'bg-[#4285f4]', bar: 'bg-[#4285f4]', text: 'text-[#4285f4]' },
      'Innovating with Data and Google Cloud': { dot: 'bg-[#34a853]', bar: 'bg-[#34a853]', text: 'text-[#34a853]' },
      'Infrastructure and Application Modernization': { dot: 'bg-[#fbbc05]', bar: 'bg-[#fbbc05]', text: 'text-[#fbbc05]' },
      'Google Cloud Security and Operations': { dot: 'bg-[#ea4335]', bar: 'bg-[#ea4335]', text: 'text-[#ea4335]' },
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
    questionCount: 150,
    examQuestions: 50,
    examTime: 60,
    passingScore: 70,
    loadQuestions: () => import('./nca-aiio-questions.json'),
    domains: [
      { name: 'AI Infrastructure Fundamentals', weight: 25 },
      { name: 'AI Workload Management', weight: 25 },
      { name: 'Networking and Storage for AI', weight: 25 },
      { name: 'AI Software and Frameworks', weight: 15 },
      { name: 'Deployment and Operations', weight: 10 },
    ],
    domainColors: {
      'AI Infrastructure Fundamentals': { dot: 'bg-[#76b900]', bar: 'bg-[#76b900]', text: 'text-[#76b900]' },
      'AI Workload Management': { dot: 'bg-[#1a9641]', bar: 'bg-[#1a9641]', text: 'text-[#1a9641]' },
      'Networking and Storage for AI': { dot: 'bg-[#00bcd4]', bar: 'bg-[#00bcd4]', text: 'text-[#00bcd4]' },
      'AI Software and Frameworks': { dot: 'bg-[#ff9800]', bar: 'bg-[#ff9800]', text: 'text-[#ff9800]' },
      'Deployment and Operations': { dot: 'bg-[#e91e63]', bar: 'bg-[#e91e63]', text: 'text-[#e91e63]' },
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
    questionCount: 150,
    examQuestions: 50,
    examTime: 60,
    passingScore: 70,
    loadQuestions: () => import('./nca-genl-questions.json'),
    domains: [
      { name: 'LLM Fundamentals', weight: 25 },
      { name: 'Training and Fine-tuning LLMs', weight: 25 },
      { name: 'GPU Infrastructure for LLMs', weight: 25 },
      { name: 'Deploying and Managing LLMs', weight: 15 },
      { name: 'AI Safety and Best Practices', weight: 10 },
    ],
    domainColors: {
      'LLM Fundamentals': { dot: 'bg-[#76b900]', bar: 'bg-[#76b900]', text: 'text-[#76b900]' },
      'Training and Fine-tuning LLMs': { dot: 'bg-[#1a9641]', bar: 'bg-[#1a9641]', text: 'text-[#1a9641]' },
      'GPU Infrastructure for LLMs': { dot: 'bg-[#00bcd4]', bar: 'bg-[#00bcd4]', text: 'text-[#00bcd4]' },
      'Deploying and Managing LLMs': { dot: 'bg-[#ff9800]', bar: 'bg-[#ff9800]', text: 'text-[#ff9800]' },
      'AI Safety and Best Practices': { dot: 'bg-[#e91e63]', bar: 'bg-[#e91e63]', text: 'text-[#e91e63]' },
    },
  },
}

export function getCert(certId) {
  return certs[certId] || null
}

export function getAllCerts() {
  return Object.values(certs)
}

export default certs
