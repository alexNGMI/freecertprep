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
import { SiteFooter, SiteHeader } from '../components/SiteChrome'
import { getCert } from '../data/certs'
import { isCertLive } from '../data/catalogVisibility'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Surface } from '../components/ui/surface'

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
    <div className="theme-page min-h-screen text-slate-950">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-6 md:pt-16">
          <Link to="/#paths" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-950">
            <ArrowLeft className="h-4 w-4" />
            Back to paths
          </Link>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border bg-white" style={{ color: path.color, borderColor: `${path.color}35` }}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="mb-4 text-xs font-black uppercase tracking-widest" style={{ color: path.color }}>
                {path.eyebrow} path
              </p>
              <h1 className="mb-6 text-5xl font-black leading-tight text-slate-950 md:text-6xl">
                {path.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-700">
                {path.description}
              </p>
            </div>

            <Surface className="space-y-5 border-slate-900/10 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.45)]">
              {path.roles?.length > 0 && (
                <div>
                  <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Target roles</p>
                  <div className="flex flex-wrap gap-2">
                    {path.roles.map((role) => (
                      <span key={role} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {path.availability && (
                <div className="border-t border-slate-900/10 pt-4">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Available practice</p>
                  <p className="text-sm leading-6 text-slate-700">{path.availability}</p>
                </div>
              )}
              <div className={path.roles?.length > 0 || path.availability ? 'border-t border-slate-900/10 pt-4' : ''}>
                <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Path logic</p>
                {path.highlights ? (
                  <ul className="space-y-3">
                    {path.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: path.color }} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-6 text-slate-600">
                    This page is a guided sequence, not a lock-in. Use it when you want a recommendation. Use the catalog when you already know the exact cert you want.
                  </p>
                )}
              </div>
            </Surface>
          </div>
        </section>

        <section className="border-y border-slate-900/10 bg-white/70">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
          <div className="space-y-8">
            {numberedGroups.map((group) => (
              <div key={group.label}>
                <h2 className="mb-4 text-2xl font-black text-slate-950">{group.label}</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((item) => (
                    <StepCard key={`${group.label}-${item.title}`} item={item} color={path.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function StepCard({ item, color }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
            Step {String(item.stepNumber).padStart(2, '0')} / {item.optionLabel ? `${item.optionLabel} / ` : ''}{item.label}
          </p>
          <h3 className="text-xl font-black text-slate-950 transition-colors group-hover:text-teal-800">{item.title}</h3>
        </div>
        {item.to ? (
          item.choiceCue ? (
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600">
              {item.choiceCue}
            </span>
          ) : (
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-teal-700" />
          )
        ) : (
          <span className="rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-amber-800">
            {item.status}
          </span>
        )}
      </div>
      {item.code && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
            {item.code}
          </span>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
            {item.difficulty}
          </span>
        </div>
      )}
      <p className="border-t pt-4 text-sm leading-6 text-slate-600" style={{ borderTopColor: `${color}30` }}>
        {item.description}
      </p>
      {item.to && (
        <div className="mt-5 flex items-center justify-between border-t border-slate-900/10 pt-4 text-sm font-black text-slate-800">
          <span>Open {item.title}</span>
          <ArrowRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-teal-700" />
        </div>
      )}
    </>
  )

  if (!item.to) {
    return (
      <Surface className="border-slate-900/10 bg-white p-5 opacity-90 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.45)]">
        {content}
      </Surface>
    )
  }

  return (
    <Surface
      as={Link}
      to={item.to}
      interactive
      className="group border-slate-900/10 bg-white p-5 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.45)] hover:border-slate-900/20 hover:bg-white"
    >
      {content}
    </Surface>
  )
}
