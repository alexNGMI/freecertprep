import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Cpu,
  GraduationCap,
  LockKeyhole,
  Network,
} from 'lucide-react'
import BrandedName from '../components/BrandedName'
import { getCert } from '../data/certs'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const PATHS = {
  'it-entry': {
    eyebrow: 'IT Entry',
    title: 'Start with practical IT support.',
    description:
      'Use A+ as the broad foundation before deciding whether networking, systems, cloud, or security should come next.',
    icon: GraduationCap,
    color: '#ef4444',
    steps: [
      {
        label: 'Foundation',
        title: 'CompTIA A+',
        description: 'Choose the A+ core that matches your current study plan.',
        to: '/comptia/a-plus',
      },
    ],
  },
  networking: {
    eyebrow: 'Networking',
    title: 'Build the network and systems layer.',
    description:
      'Choose a vendor-neutral or Cisco-oriented networking foundation, then add server operations so the infrastructure underneath every modern stack feels concrete.',
    icon: Network,
    color: '#f97316',
    groups: [
      {
        label: 'Choose your networking foundation',
        items: [
          certStep('Vendor-neutral', 'comptia-net-plus', 'Best fit if you want broad networking fundamentals across vendors, roles, and environments.'),
          certStep('Cisco-oriented', 'ccst-networking', 'Best fit if your long-term goal is CCNA and you want a Cisco-aligned first networking step.'),
        ],
      },
      {
        label: 'Then add systems context',
        items: [
          certStep('Server Layer', 'comptia-server-plus', 'Move into server hardware, administration, disaster recovery, and systems troubleshooting.'),
        ],
      },
    ],
  },
  cybersecurity: {
    eyebrow: 'Cybersecurity',
    title: 'Move into security with the right base.',
    description:
      'Network+ gives the technical footing; Security+ builds the controls, incident response, threats, and governance layer.',
    icon: LockKeyhole,
    color: '#fb7185',
    steps: [
      certStep('Prerequisite Skill', 'comptia-net-plus', 'Build the network fluency that makes security scenarios easier to reason through.'),
      certStep('Security Core', 'comptia-sec-plus', 'Practice the core security exam domains once the network layer feels steady.'),
    ],
  },
  cloud: {
    eyebrow: 'Cloud',
    title: 'Pick a cloud vendor, then automate the stack.',
    description:
      'Start with one provider foundation. Once the cloud model is clear, Terraform becomes the portable infrastructure skill that ties the lane together.',
    icon: Cloud,
    color: '#38bdf8',
    groups: [
      {
        label: 'Choose one vendor foundation',
        items: [
          certStep('AWS', 'clf-c02', 'Best fit if you want the largest cloud ecosystem and a broad practitioner-level entry point.'),
          certStep('Azure', 'az-900', 'Best fit if your target workplace leans Microsoft, identity, hybrid, or enterprise cloud.'),
          certStep('Google Cloud', 'cdl', 'Best fit if you want product, data, collaboration, and digital transformation fluency.'),
        ],
      },
      {
        label: 'Then add infrastructure as code',
        items: [
          certStep('Automation Layer', 'terraform-associate', 'Use Terraform after one cloud foundation so infrastructure concepts have something concrete to attach to.'),
        ],
      },
    ],
  },
  nvidia: {
    eyebrow: 'NVIDIA',
    title: 'Build NVIDIA fluency.',
    description:
      'Focus on NVIDIA AI infrastructure and generative AI foundations for accelerated computing and modern AI workloads.',
    icon: Cpu,
    color: '#34d399',
    steps: [
      certStep('Infrastructure', 'nca-aiio', 'Practice GPU systems, deployment, operations, and infrastructure concepts.'),
      certStep('Generative AI', 'nca-genl', 'Practice LLM concepts, workflows, evaluation, and applied generative AI fundamentals.'),
    ],
  },
}

function certStep(label, certId, description) {
  const cert = getCert(certId)
  return {
    label,
    title: cert.title,
    code: cert.code,
    provider: cert.provider,
    difficulty: cert.difficulty,
    to: `/${cert.id}`,
    description,
  }
}

export default function CareerPath() {
  const { pathId } = useParams()
  const path = PATHS[pathId]

  useDocumentMeta({
    title: path ? `${path.eyebrow} Path | freecertprep` : 'Path not found | freecertprep',
    description: path?.description || 'Guided certification path for freecertprep.',
    path: path ? `/paths/${pathId}` : '/',
  })

  if (!path) return <Navigate to="/" replace />

  const Icon = path.icon
  const groups = path.groups || [{ label: 'Recommended sequence', items: path.steps }]

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <header className="border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <BrandedName />
          </Link>
          <div className="flex items-center gap-5 text-sm font-medium text-zinc-400">
            <Link to="/" className="hover:text-zinc-100 transition-colors">Home</Link>
            <Link to="/docs" className="hidden sm:inline hover:text-zinc-100 transition-colors">Docs</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <Link to="/#paths" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-200 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to paths
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 items-end">
            <div>
              <div className="w-12 h-12 rounded-lg border border-white/10 bg-zinc-900/80 flex items-center justify-center mb-6" style={{ color: path.color }}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: path.color }}>
                {path.eyebrow} path
              </p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-100 leading-tight mb-6">
                {path.title}
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
                {path.description}
              </p>
            </div>

            <div className="border border-white/10 bg-zinc-950/75 rounded-lg p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">How to use this path</p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                This page is a guided sequence, not a lock-in. Use it when you want a recommendation. Use the homepage catalog when you already know the exact cert you want.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-14 border-y border-white/5">
          <div className="space-y-8">
            {groups.map((group) => (
              <div key={group.label}>
                <h2 className="text-xl font-bold text-zinc-100 mb-4">{group.label}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {group.items.map((item, index) => (
                    <StepCard key={`${group.label}-${item.title}`} item={item} index={index} color={path.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function StepCard({ item, index, color }) {
  return (
    <Link
      to={item.to}
      className="group border border-white/10 bg-zinc-950/75 hover:bg-zinc-900/70 rounded-lg p-5 transition-colors"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
            {String(index + 1).padStart(2, '0')} · {item.label}
          </p>
          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">{item.title}</h3>
        </div>
        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0 mt-1" />
      </div>
      {item.code && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/10 bg-zinc-900/60 text-zinc-400">
            {item.code}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/10 bg-zinc-900/60 text-zinc-400">
            {item.difficulty}
          </span>
        </div>
      )}
      <p className="text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-4" style={{ borderTopColor: `${color}30` }}>
        {item.description}
      </p>
    </Link>
  )
}
