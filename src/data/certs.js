import clfQuestions from './questions.json'
import cdlQuestions from './cdl-questions.json'

const certs = {
  'clf-c02': {
    id: 'clf-c02',
    title: 'AWS Cloud Practitioner',
    code: 'CLF-C02',
    provider: 'AWS',
    description: 'Foundational understanding of AWS Cloud, services, and terminology',
    difficulty: 'Foundational',
    color: '#f1be32',
    examQuestions: 65,
    examTime: 90,
    passingScore: 70,
    questions: clfQuestions,
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
    examQuestions: 50,
    examTime: 90,
    passingScore: 70,
    questions: cdlQuestions,
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
}

export function getCert(certId) {
  return certs[certId] || null
}

export function getAllCerts() {
  return Object.values(certs)
}

export default certs
