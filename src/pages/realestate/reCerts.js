// Sister-site cert registry. The Real Estate offering always lives on the
// sister site (it fills a different need than the cloud/IT main catalog),
// so these certs stay published:false and are reached here by slug rather
// than through getAllCerts(). Add a state module by adding an entry.
export const RE_STUDY_CERTS = [
  {
    slug: 'national',
    certId: 'real-estate-national',
    name: 'National Salesperson Exam',
    badge: 'National',
    tagline: 'The portable national/uniform portion tested in ~48 states.',
    examLine: '750 questions · 80-question PSI-style simulator · 75% to pass',
  },
  {
    slug: 'tx',
    certId: 'real-estate-tx',
    name: 'Texas Sales Agent — Full Licensing',
    badge: 'Texas',
    tagline: 'National prep + the Texas state-law portion (TREC blueprint).',
    examLine: 'Full Licensing Exam: 85 national + 40 state · 70% each section',
  },
  {
    slug: 'me',
    certId: 'real-estate-me',
    name: 'Maine Sales Agent — Full Licensing',
    badge: 'Maine',
    tagline: 'National prep + the Maine state-law portion (Pearson VUE blueprint).',
    examLine: 'Full Licensing Exam: 80 national + 40 state · 75% each section',
  },
  {
    slug: 'ga',
    certId: 'real-estate-ga',
    name: 'Georgia Sales Agent — Full Licensing',
    badge: 'Georgia',
    tagline: 'National prep + the Georgia state-law portion (PSI/AMP blueprint).',
    examLine: 'Full Licensing Exam: 100 national + 52 state · 75% each section',
  },
]

export const reCertBySlug = (slug) =>
  RE_STUDY_CERTS.find((c) => c.slug === slug) || null
