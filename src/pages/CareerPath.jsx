import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Cpu,
  LockKeyhole,
  Network,
  Server,
} from 'lucide-react'
import BrandedName from '../components/BrandedName'
import { getCert } from '../data/certs'
import { isCertLive } from '../data/catalogVisibility'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const PATHS = {
  networking: {
    eyebrow: 'Networking',
    title: 'Build a career in networking.',
    description:
      'Choose a vendor-neutral or Cisco-aligned foundation, then build toward the credential most associated with hands-on network administration.',
    icon: Network,
    color: '#f97316',
    roles: ['NOC Technician', 'Network Support Specialist', 'Junior Network Administrator'],
    availability: 'Practice Network+ or CCST Networking now. CCNA remains parked as the future Cisco career milestone.',
    highlights: [
      'Choose Network+ for broad vendor-neutral fluency or CCST for a Cisco-first foundation.',
      'CCNA is the career credential this direction builds toward.',
      'Each step builds toward real network troubleshooting and operations skill.',
    ],
    groups: [
      {
        label: 'Choose a foundation',
        type: 'choice',
        items: [
          certStep('Foundation', 'comptia-net-plus', 'Best fit if you want broad networking fundamentals across vendors, roles, and support environments.', 'Best default'),
          certStep('Foundation', 'ccst-networking', 'Best fit if your long-term goal is CCNA and you want a Cisco-aligned first networking step.', 'Cisco route'),
        ],
      },
      {
        label: 'Build toward the career credential',
        items: [
          certStep('Career Credential', 'ccna-200-301', 'Coming Soon for Cisco 200-301 v2.0, which begins testing February 3, 2027. The preserved preview covers routing, switching, services, security, CLI output, topology, config repair, and subnetting.'),
        ],
      },
    ],
  },
  'data-center-technician': {
    eyebrow: 'Data Center Technician',
    title: 'Build toward data center operations.',
    description:
      'Start with Server+ for hardware, troubleshooting, and administration; add Schneider DCCA for data center physical infrastructure; then build toward CCNA for the network layer technicians work around every day.',
    icon: Server,
    color: '#a78bfa',
    highlights: [
      'Server+ gives the IT hardware and systems support baseline.',
      'Schneider DCCA adds power, cooling, racks, cabling, physical security, and facility awareness.',
      'CCNA adds the network layer technicians troubleshoot around every day.',
    ],
    groups: [
      {
        label: 'Start with server operations',
        items: [
          certStep('Level 1', 'comptia-server-plus', 'Build the hardware, storage, troubleshooting, virtualization, and server administration base for data center technician work.'),
        ],
      },
      {
        label: 'Then add data center physical infrastructure',
        items: [
          certStep('Level 2', 'schneider-dcca', 'Practice Schneider DCCA physical infrastructure topics: cooling, power, racks, cabling, fire protection, management, and physical security.'),
        ],
      },
      {
        label: 'Then move toward the network layer',
        items: [
          certStep('Level 3', 'ccna-200-301', 'Build the routing, switching, subnetting, and Cisco troubleshooting layer for infrastructure technician roles.'),
        ],
      },
    ],
  },
  cybersecurity: {
    eyebrow: 'Cybersecurity',
    title: 'Turn security knowledge into SOC skill.',
    description:
      'Build on the networking stage with Security+ for the recognized baseline, then add Splunk for practical search, dashboard, and alerting skill.',
    icon: LockKeyhole,
    color: '#fb7185',
    roles: ['SOC Analyst', 'Security Support Specialist', 'Junior Security Analyst'],
    availability: 'Security+ and Splunk Core Certified User are available now.',
    highlights: [
      'The Networking path supplies the traffic and troubleshooting foundation.',
      'Security+ establishes the security baseline most entry roles recognize.',
      'Splunk Core Certified User adds the practical SIEM search and alerting layer.',
    ],
    groups: [
      {
        label: 'Establish the security baseline',
        items: [
          certStep('Career Credential', 'comptia-sec-plus', 'Practice the core security domains after building the networking fluency needed to reason through traffic, segmentation, and troubleshooting scenarios.'),
        ],
      },
      {
        label: 'Add an applied tool',
        items: [
          certStep('Applied Tool', 'splunk-core-certified-user', 'Practice Splunk searching, fields, SPL fundamentals, transforming commands, dashboards, lookups, scheduled reports, and alerts for SOC analyst readiness.'),
        ],
      },
    ],
  },
  cloud: {
    eyebrow: 'Cloud',
    title: 'From cloud concepts to deployable skill.',
    description:
      'Move from AWS fundamentals into architecture, then finish with Terraform so your path points toward real cloud support, junior cloud, and infrastructure roles.',
    highlights: [
      'New to cloud? Start with Cloud Practitioner.',
      'Already comfortable with cloud fundamentals? Begin with SAA.',
      'Terraform turns architecture knowledge into a deployable infrastructure skill.',
    ],
    icon: Cloud,
    color: '#38bdf8',
    roles: ['Cloud Support Associate', 'Junior Cloud Engineer', 'Infrastructure Engineer'],
    availability: 'Cloud Practitioner, SAA-C03, and Terraform Associate are all available now.',
    groups: [
      {
        label: 'Optional foundation — new to cloud?',
        items: [
          certStep('Optional Foundation', 'clf-c02', 'Start here for broad AWS service, billing, security, and cloud operating model fluency. Skip ahead if these concepts already feel familiar.'),
        ],
      },
      {
        label: 'Earn the career credential',
        items: [
          certStep('Career Credential', 'aws-saa-c03', 'Use SAA to practice secure, resilient, high-performing, and cost-optimized AWS design.'),
        ],
      },
      {
        label: 'Add an applied skill',
        items: [
          certStep('Applied Skill', 'terraform-associate', 'Use Terraform after AWS architecture so infrastructure concepts have realistic designs to attach to.'),
        ],
      },
    ],
  },
  nvidia: {
    eyebrow: 'NVIDIA',
    title: 'Build NVIDIA fluency.',
    description:
      'Start with Linux systems fluency, then move into NVIDIA AI infrastructure and generative AI foundations for accelerated computing and modern AI workloads.',
    icon: Cpu,
    color: '#34d399',
    steps: [
      certStep('Systems foundation', 'comptia-linux-plus', 'Practice Linux administration, security, automation, containers, scripting, and troubleshooting before moving into AI infrastructure.'),
      certStep('AI Infrastructure', 'nca-aiio', 'Practice GPU systems, deployment, operations, and infrastructure concepts.'),
      certStep('Generative AI', 'nca-genl', 'Practice LLM concepts, workflows, evaluation, and applied generative AI fundamentals.'),
    ],
  },
}

function certStep(label, certId, description, choiceCue = null) {
  const cert = getCert(certId)
  return {
    label,
    title: cert.title,
    code: cert.code,
    provider: cert.provider,
    difficulty: cert.difficulty,
    to: isCertLive(cert.id) ? `/${cert.id}` : null,
    status: isCertLive(cert.id) ? 'Live' : 'Coming soon',
    description,
    choiceCue,
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
  let stepCount = 0
  const numberedGroups = groups.map((group) => {
    if (group.type === 'choice') {
      stepCount += 1
      return {
        ...group,
        items: group.items.map((item, index) => ({
          ...item,
          stepNumber: stepCount,
          optionLabel: `Option ${String.fromCharCode(65 + index)}`,
        })),
      }
    }

    return {
      ...group,
      items: group.items.map((item) => ({
        ...item,
        stepNumber: ++stepCount,
      })),
    }
  })

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

            <div className="border border-white/10 bg-zinc-950/75 rounded-lg p-5 space-y-5">
              {path.roles?.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Target roles</p>
                  <div className="flex flex-wrap gap-2">
                    {path.roles.map((role) => (
                      <span key={role} className="rounded-md border border-white/10 bg-zinc-900/60 px-2.5 py-1.5 text-xs font-semibold text-zinc-300">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {path.availability && (
                <div className="border-t border-white/5 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Available practice</p>
                  <p className="text-sm leading-relaxed text-zinc-300">{path.availability}</p>
                </div>
              )}
              <div className={path.roles?.length > 0 || path.availability ? 'border-t border-white/5 pt-4' : ''}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Path logic</p>
                {path.highlights ? (
                  <ul className="space-y-3">
                    {path.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: path.color }} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    This page is a guided sequence, not a lock-in. Use it when you want a recommendation. Use the catalog when you already know the exact cert you want.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-14 border-y border-white/5">
          <div className="space-y-8">
            {numberedGroups.map((group) => (
              <div key={group.label}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8" style={{ backgroundColor: path.color }} />
                  <h2 className="text-xl font-bold text-zinc-100">{group.label}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {group.items.map((item) => (
                    <StepCard key={`${group.label}-${item.title}`} item={item} color={path.color} />
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

function StepCard({ item, color }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
            Step {String(item.stepNumber).padStart(2, '0')} / {item.optionLabel ? `${item.optionLabel} / ` : ''}{item.label}
          </p>
          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">{item.title}</h3>
        </div>
        {item.to ? (
          item.choiceCue ? (
            <span className="rounded-md border border-white/10 bg-zinc-900/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-300">
              {item.choiceCue}
            </span>
          ) : (
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0 mt-1" />
          )
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200 border border-amber-300/25 bg-amber-300/10 rounded-md px-2 py-1">
            {item.status}
          </span>
        )}
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
      {item.to && (
        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-sm font-bold text-zinc-200">
          <span>Open {item.title}</span>
          <ArrowRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-zinc-200" />
        </div>
      )}
    </>
  )

  if (!item.to) {
    return (
      <div className="border border-white/10 bg-zinc-950/60 rounded-lg p-5 opacity-90">
        {content}
      </div>
    )
  }

  return (
    <Link
      to={item.to}
      className="group border border-white/10 bg-zinc-950/75 hover:bg-zinc-900/70 rounded-lg p-5 transition-colors"
    >
      {content}
    </Link>
  )
}
