import { PART107_CERTIFIED_QUESTIONS } from './part107-certified.js'

export const PART107_CERT_ID = 'part107-uag'

export const PART107_DOMAINS = [
  { name: 'Regulations', weight: 48 },
  { name: 'Airspace and requirements', weight: 20 },
  { name: 'Weather', weight: 5 },
  { name: 'Loading and performance', weight: 2 },
  { name: 'Operations', weight: 25 },
]

export const PART107_BANK_BLUEPRINT = {
  totalQuestions: 360,
  examQuestions: 60,
  passingPercent: 70,
  allottedHours: 2,
  domainAllocation: {
    Regulations: 174,
    'Airspace and requirements': 72,
    Weather: 18,
    'Loading and performance': 6,
    Operations: 90,
  },
  examAllocation: {
    Regulations: 29,
    'Airspace and requirements': 12,
    Weather: 3,
    'Loading and performance': 1,
    Operations: 15,
  },
  itemStyleMinimums: {
    'direct-knowledge': 160,
    'supplement-reference': 48,
    'weather-decoding': 12,
    'performance-application': 6,
    'operations-judgment': 70,
  },
  certifiedForms: 6,
  scenarioApplicationMaximum: 120,
}

export const PART107_CONTENT_CERTIFICATION = {
  premiumExamReady: true,
  blocker: null,
  certifiedQuestionCount: 360,
  certifiedFormCount: 6,
  certificationDate: '2026-07-08',
  requiredStandard: [
    'Use the September 29, 2025 UAG Applicant Information Bulletin weighting: Regulations 48%, Airspace 20%, Weather 5%, Loading and Performance 2%, Operations 25%.',
    'Every paid-form item must be source-reviewed against FAA/eCFR material and current UAG test style.',
    'Chart/image questions must render actual FAA supplement figures or be excluded from the paid simulator.',
    'Six complete 60-question forms must each preserve the exact 29/12/3/1/15 UAG exam allocation.',
    'Legacy generated template families have been removed from the Part 107 data module.',
  ],
}

export const PART107_SOURCE_LINKS = [
  {
    label: 'FAA Remote Pilot ACS',
    href: 'https://www.faa.gov/training_testing/testing/acs/uas_acs.pdf',
  },
  {
    label: 'FAA Remote Pilot Study Guide',
    href: 'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/remote_pilot_study_guide.pdf',
  },
  {
    label: 'FAA UAG sample questions',
    href: 'https://www.faa.gov/sites/faa.gov/files/training_testing/testing/test_questions/uag_questions.pdf',
  },
  {
    label: 'FAA Airman Knowledge Testing Supplement',
    href: 'https://www.faa.gov/sites/faa.gov/files/training_testing/testing/supplements/sport_rec_private_akts.pdf',
  },
  {
    label: 'FAA Airman Knowledge Testing Matrix',
    href: 'https://www.faa.gov/training_testing/testing/testing_matrix',
  },
  {
    label: 'UAG Applicant Information Bulletin',
    href: 'https://media.psiexams.com/faa/UAG_Information_Bulletin.pdf',
  },
  {
    label: '14 CFR Part 107',
    href: 'https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107',
  },
  {
    label: 'FAA LAANC',
    href: 'https://www.faa.gov/uas/getting_started/laanc',
  },
  {
    label: 'Recommended Udemy companion course',
    href: 'https://www.udemy.com/course/3-hour-faa-107-knowledge-test-prep-for-remote-pilots/',
  },
]

export const PART107_QUESTIONS = PART107_CERTIFIED_QUESTIONS

export const PART107_FREE_QUIZ_SIZE = 8
export const PART107_SMART_STUDY_SIZE = 10
export const PART107_EXAM_SIZE = 60
export const PART107_PASSING_PERCENT = 70
