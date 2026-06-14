import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TERRAFORM_OBJECTIVES } from './data/terraform-objectives.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = path.join(root, 'src/data/terraform-associate-questions.json')
const questions = JSON.parse(fs.readFileSync(target, 'utf8'))

const SCENARIOS = {
  'Infrastructure as Code (IaC) with Terraform': [
    'A platform team is replacing undocumented console changes with a reviewed infrastructure workflow.',
    'An engineering group needs repeatable environments across development and production.',
    'A cloud team is comparing manual provisioning with declarative infrastructure as code.',
  ],
  'Terraform fundamentals': [
    'A repository is being prepared for consistent provider installation across developer workstations and CI.',
    'A root module must communicate with provider APIs using controlled versions and credentials.',
    'A multi-region configuration is being reviewed before its first plan.',
  ],
  'Core Terraform workflow': [
    'A delivery pipeline must prepare and review a Terraform change before it reaches production.',
    'An operator is diagnosing the next safe action in the init, plan, and apply workflow.',
    'A pull request contains an infrastructure change that must pass automated Terraform checks.',
  ],
  'Terraform configuration': [
    'A configuration review found that the HCL must express the desired relationship without manual sequencing.',
    'A reusable root module needs a clear, type-safe configuration.',
    'An engineer is correcting an HCL implementation before generating a new plan.',
  ],
  'Terraform modules': [
    'A platform team is turning repeated configuration into a versioned reusable module.',
    'A root module must pass only the required inputs and consume a child module output.',
    'A shared module is being prepared for controlled use by several application teams.',
  ],
  'Terraform state management': [
    'Two engineers share responsibility for infrastructure managed from the same Terraform state.',
    'A team is moving state from a workstation to a controlled collaborative backend.',
    'An operator must reconcile Terraform state with the current remote infrastructure.',
  ],
  'Maintain infrastructure with Terraform': [
    'An operator is inspecting an existing deployment without making an unreviewed infrastructure change.',
    'A troubleshooting session must gather enough Terraform evidence while protecting sensitive data.',
    'An existing remote object must be brought under Terraform management safely.',
  ],
  'HCP Terraform': [
    'A platform organization is standardizing remote runs, workspace access, and governance in HCP Terraform.',
    'A team needs a collaborative Terraform workflow with centrally managed state and run history.',
    'Several application teams need HCP Terraform workspaces organized with consistent controls.',
  ],
}

const DISTRACTOR_GUIDANCE = {
  'Infrastructure as Code (IaC) with Terraform': 'The distractors confuse declarative IaC with manual procedures, remove controls that IaC still requires, or promise outcomes such as zero cost that Terraform cannot guarantee.',
  'Terraform fundamentals': 'The distractors assign provider installation, authentication, version selection, or state responsibility to the wrong Terraform component.',
  'Core Terraform workflow': 'The distractors skip a required workflow boundary, use a command for the wrong lifecycle phase, or imply that validation and planning guarantee a successful apply.',
  'Terraform configuration': 'The distractors use an HCL construct with different scope or lifecycle behavior, or create a dependency that Terraform can already infer from references.',
  'Terraform modules': 'The distractors blur root and child module scope, omit explicit inputs or outputs, or use source and version controls in a way Terraform does not support.',
  'Terraform state management': 'The distractors treat state as configuration or a provider database, weaken locking and access controls, or change remote objects when only state reconciliation is intended.',
  'Maintain infrastructure with Terraform': 'The distractors use an inspection, import, state, or logging command for a different operational purpose and may create unnecessary risk.',
  'HCP Terraform': 'The distractors confuse workspace execution and organization with unrelated CLI, backend, registry, or policy responsibilities.',
}

const TAKEAWAYS = {
  'Infrastructure as Code (IaC) with Terraform': 'Connect the requested outcome to declarative, reviewable, repeatable infrastructure management without assuming that Terraform removes credentials, cost, or operational risk.',
  'Terraform fundamentals': 'Separate Terraform CLI behavior from provider behavior: providers translate resource operations to platform APIs, while Terraform controls configuration, dependency evaluation, and state.',
  'Core Terraform workflow': 'Identify the exact workflow boundary being tested: initialize dependencies, validate configuration, review a plan, and only then apply the approved change.',
  'Terraform configuration': 'Read the HCL for ownership, scope, value flow, and dependency clues before choosing a resource, data source, expression, lifecycle rule, or validation feature.',
  'Terraform modules': 'Treat a module as an explicit interface: callers supply inputs and provider mappings, while child modules expose only declared outputs.',
  'Terraform state management': 'Protect the state as sensitive coordination data, use locking where supported, and distinguish state-only reconciliation from changes to remote infrastructure.',
  'Maintain infrastructure with Terraform': 'Choose the narrowest command that inspects, imports, or diagnoses the requested object, then review evidence before making a state or infrastructure change.',
  'HCP Terraform': 'Map the requirement to the HCP Terraform object that owns it: organization, project, workspace, run, variable set, policy, registry, or team access.',
}

const DISTRACTOR_REWRITES = new Map([
  ['No need for provider credentials', 'Provider credentials can be omitted whenever configuration is stored in version control'],
  ['Guaranteed zero-cost infrastructure', 'Provider cost estimates become exact guarantees before a plan runs'],
  ['Automatic removal of every operational risk', 'Declarative configuration removes the need for review and recovery procedures'],
  ['Terraform supports public cloud only', 'Terraform can coordinate only public-cloud providers in a single configuration'],
  ['State is never required', 'Provider plugins preserve all resource bindings without Terraform state'],
  ['Resources are always recreated on every apply', 'Declarative tools converge by recreating every managed object on each apply'],
  ['It always changes infrastructure', 'It updates remote infrastructure while calculating the proposed actions'],
  ['Terraform always rolls back every resource', 'Terraform automatically reverses every completed action after any provider error'],
  ['No need for access controls', 'A remote backend makes state access controls unnecessary because state is centralized'],
  ['State never includes resource attributes', 'State stores addresses only and excludes attributes returned by providers'],
  ['A guarantee of zero cost', 'A binding guarantee that the proposed infrastructure has no provider cost'],
  ['No, it must always be gitignored', 'No; dependency selections should be recalculated independently on every workstation'],
  ['Never version modules', 'Track only a floating module source so every run automatically adopts the newest release'],
  ['Pipelines cannot run Terraform', 'Terraform requires an interactive workstation and cannot execute in a delivery pipeline'],
  ['Providers must be in separate state files always', 'Each provider configuration requires a separate state file even when resources depend on one another'],
  ['Providers cannot be versioned', 'Provider versions are selected only by the provider API and cannot be constrained in configuration'],
  ['Terraform never needs credentials', 'Terraform embeds universal provider credentials in the CLI binary'],
  ['It never parallelizes', 'Terraform serializes every resource operation even when the dependency graph shows no relationship'],
  ['It cannot', 'Alias mappings are inferred from matching resource names without a module providers map'],
  ['Modules cannot use providers', 'Child modules can declare resources but cannot interact with provider APIs'],
  ['It cannot detect drift', 'Declarative configuration prevents Terraform from comparing remote objects with state'],
  ['Each apply always recreates everything', 'Idempotency means replacing all managed objects to reproduce the same result'],
  ['Apply is never idempotent', 'Repeated applies must produce changes even when configuration and remote objects already agree'],
  ['Terraform cannot detect existing resources', 'Terraform ignores state bindings when determining whether an object is already managed'],
  ['Never pin versions', 'Use only unconstrained registry module versions so upgrades occur without review'],
  ['Plan always shows changes', 'A plan reports changes only when configuration files were edited locally'],
  ['Workspaces cannot interact', 'HCP Terraform workspaces cannot establish run dependencies or exchange outputs'],
  ['It cannot be tested', 'Infrastructure code can be parsed but cannot participate in automated validation or policy checks'],
  ['IaC always slows teams down', 'Reviewable automation necessarily makes every infrastructure delivery slower than console changes'],
  ['They cannot manage cloud resources', 'Vendor-native templates document resources but cannot create or update them'],
  ['They are always encrypted in the file', 'Marking a value sensitive encrypts every copy of it inside state automatically'],
  ['Secrets cannot appear in state', 'Terraform excludes all provider-returned secret values from state'],
  ['No need for testing', 'Version control makes validation, planning, and policy checks redundant'],
  ['Always use -target', 'Use `-target` for every production apply so Terraform evaluates only part of the dependency graph'],
  ['Guaranteed safety', 'Terraform automatically prevents all destructive actions when a plan was not reviewed'],
  ['They cannot be passed', 'Sensitive values cannot cross a module boundary even through declared input variables'],
  ['It always errors', '`terraform fmt -check` returns a nonzero status even when every file is already formatted'],
  ['Declarative cannot manage clouds', 'Declarative tools describe desired state but cannot call cloud provider APIs'],
  ['Terraform cannot create resources', 'Terraform can inspect infrastructure but requires shell scripts to create it'],
  ['Git cannot store JSON', 'State is unsuitable for Git because version control cannot represent JSON files'],
  ['They cannot have defaults', 'Module input variables must always be supplied by the caller and cannot declare defaults'],
  ['Modules never inherit providers', 'A child module must receive an explicit mapping for every default provider configuration'],
  ['It cannot recover', 'A failed apply invalidates the entire state and requires rebuilding all managed infrastructure'],
  ['It cannot parallelize', 'Terraform waits for each resource operation to finish even when the graph has independent branches'],
  ['It is always sequential', 'Terraform orders resource operations by file position rather than dependency relationships'],
  ['Never define outputs', 'Consumers should read child-module resources directly instead of using a declared output interface'],
  ['Never change', 'Immutable infrastructure prevents teams from replacing an object with a revised instance'],
  ['It never prompts', '`terraform destroy` skips confirmation unless the operator explicitly enables prompting'],
  ['Modules never need providers', 'Modules execute resource operations directly without declaring provider requirements'],
  ['Apply is never idempotent', 'Applying unchanged configuration must still modify at least one managed object'],
  ['It cannot destroy', 'Terraform can create ephemeral resources but cannot remove them from the provider'],
  ['Runs them sequentially always', 'Terraform schedules independent resources in source-file order and never concurrently'],
  ['It cannot lock', 'The S3 backend cannot participate in any supported state-locking configuration'],
  ['They cannot have inputs', 'A local module can read parent values directly without declared input variables'],
  ['It always replaces', 'Any attribute difference forces replacement even when the provider supports in-place updates'],
  ['Always -auto-approve', 'Use automatic approval for every environment so no reviewed plan artifact is required'],
  ['CI never needs locking', 'Separate CI jobs cannot overlap, so backend locking provides no protection'],
  ['That Terraform should always destroy all resources in the module', 'A removed block declares that every object in the surrounding module must be destroyed'],
  ['It guarantees that remote objects cannot drift', 'The provider continuously blocks changes made outside Terraform'],
  ['To store the only valid copy of Terraform configuration', 'State replaces configuration as the authoritative declaration of desired infrastructure'],
  ['To guarantee that infrastructure cannot drift', 'Persisted state prevents administrators from changing remote objects outside Terraform'],
  ['As already managed because Terraform searches the entire cloud account automatically', 'As already managed because providers automatically bind matching remote names to configuration addresses'],
  ['The next apply is guaranteed to succeed', 'Provider credentials, quotas, and remote API constraints are proven by validation'],
  ['Assume Terraform always removes secrets from TRACE output', 'TRACE output is safe to share because Terraform redacts every provider and environment value'],
])

const OBJECTIVE_CORRECTIONS = {
  'tf-16': ['2c', 'tf-2c-provider-mapping'],
  'tf-20': ['3d', 'tf-3d-plan-refresh'],
  'tf-22': ['3a', 'tf-3a-workflow-sequence'],
  'tf-35': ['4e', 'tf-4e-meta-arguments'],
  'tf-40': ['5c', 'tf-5c-module-design'],
  'tf-47': ['7b', 'tf-7b-state-inspection'],
}
const NO_EVIDENCE_IDS = new Set(['tf-9', 'tf-26', 'tf-50'])

function questionNumber(question) {
  return Number.parseInt(question.id.replace(/\D/g, ''), 10)
}

function addScenarioToCommandStem(question) {
  if (!/^(Which|What) command\b/i.test(question.question)) return question.question
  if (/^A |^An |^The /i.test(question.question)) return question.question
  const scenarios = SCENARIOS[question.domain]
  const scenario = scenarios[questionNumber(question) % scenarios.length]
  return `${scenario} ${question.question}`
}

function artifactFor(question) {
  if (!['single-choice', 'multiple-response', undefined].includes(question.type)) return undefined
  if (NO_EVIDENCE_IDS.has(question.id)) return undefined

  if (question.objectiveId === '7c') {
    return {
      type: 'console',
      title: 'Terraform diagnostic excerpt',
      lines: [
        '$ TF_LOG=TRACE terraform plan',
        '2026-06-13T14:22:08Z [TRACE] provider: starting plugin',
        '2026-06-13T14:22:09Z [ERROR] provider request failed; inspect the surrounding trace and protect sensitive values',
      ],
    }
  }

  if (question.objectiveId === '3d') {
    return {
      type: 'console',
      title: 'Plan review excerpt',
      lines: [
        '$ terraform plan -out=tfplan',
        'Terraform will perform the following actions after evaluating configuration, state, and provider data.',
        'Plan: 1 to add, 1 to change, 0 to destroy.',
      ],
    }
  }

  if (['2d', '6a', '6b', '6c', '6d', '7a', '7b'].includes(question.objectiveId)) {
    return {
      type: 'console',
      title: 'State inspection excerpt',
      lines: [
        '$ terraform state list',
        'module.network.aws_vpc.main',
        'module.network.aws_subnet.private[0]',
      ],
    }
  }

  if (question.objectiveId.startsWith('8')) {
    return {
      type: 'table',
      title: 'HCP Terraform run context',
      columns: ['Object', 'Observed state'],
      rows: [
        ['Workspace', 'network-production'],
        ['Run', 'Plan finished; confirmation required'],
        ['State', 'Managed remotely with workspace access controls'],
      ],
    }
  }

  const configurationEvidence = {
    '2a': ['terraform {', '  required_providers {', '    aws = { source = "hashicorp/aws", version = "~> 5.0" }', '  }', '}'],
    '2b': ['provider "aws" {', '  region = var.aws_region', '}'],
    '2c': ['provider "aws" { alias = "west" }', 'module "service" {', '  providers = { aws = aws.west }', '}'],
    '3a': ['$ terraform init', '$ terraform plan -out=tfplan', '$ terraform apply tfplan'],
    '3b': ['$ terraform init', 'Initializing the backend...', 'Initializing provider plugins...', 'Terraform has been successfully initialized!'],
    '3c': ['$ terraform validate', 'Success! The configuration is valid.', 'Remote credentials and provider quotas have not been tested.'],
    '3e': ['$ terraform apply tfplan', 'module.network.aws_subnet.private[0]: Modifying...', 'Apply complete! Resources: 0 added, 1 changed, 0 destroyed.'],
    '3f': ['$ terraform plan -destroy', 'Terraform will perform the following destroy actions:', 'Plan: 0 to add, 0 to change, 2 to destroy.'],
    '3g': ['$ terraform fmt -check -recursive', 'network/main.tf', 'Exit status: 3'],
    '4a': ['data "aws_vpc" "shared" {', '  id = var.shared_vpc_id', '}', 'resource "aws_subnet" "app" { vpc_id = data.aws_vpc.shared.id }'],
    '4b': ['resource "aws_subnet" "app" {', '  vpc_id = aws_vpc.main.id', '}'],
    '4c': ['variable "environment" { type = string }', 'output "endpoint" {', '  value = aws_lb.app.dns_name', '}'],
    '4d': ['variable "networks" {', '  type = map(object({ cidr = string, public = bool }))', '}'],
    '4e': ['locals {', '  active_names = [for item in var.items : item.name if item.enabled]', '}'],
    '4f': ['resource "aws_instance" "app" {', '  subnet_id = aws_subnet.app.id', '  depends_on = [aws_iam_role_policy.app]', '}'],
    '4g': ['validation {', '  condition = contains(["dev", "prod"], var.environment)', '  error_message = "environment must be dev or prod"', '}'],
    '4h': ['variable "api_token" {', '  type = string', '  sensitive = true', '}'],
    '5a': ['module "network" {', '  source = "app.terraform.io/acme/network/aws"', '}'],
    '5b': ['module "network" { cidr = var.network_cidr }', 'output "vpc_id" {', '  value = module.network.vpc_id', '}'],
    '5c': ['module "network" {', '  source = "./modules/network"', '  environment = var.environment', '}'],
    '5d': ['module "network" {', '  source = "app.terraform.io/acme/network/aws"', '  version = "~> 3.2"', '}'],
  }
  const lines = configurationEvidence[question.objectiveId]
  if (lines) {
    return {
      type: 'console',
      title: 'Configuration review excerpt',
      lines,
    }
  }

  return undefined
}

function enrichExplanation(question) {
  const baseExplanation = question.explanation
    .replace(/^Why this is right:\s*/, '')
    .replace(/\s+Why the alternatives are wrong:.*$/s, '')
  const objective = TERRAFORM_OBJECTIVES[question.objectiveId]
  return [
    `Why this is right: ${baseExplanation}`,
    `Why the alternatives are wrong: ${DISTRACTOR_GUIDANCE[question.domain]}`,
    `Operational takeaway: ${TAKEAWAYS[question.domain]} This item maps to objective ${question.objectiveId}: ${objective.title}.`,
  ].join(' ')
}

const enriched = questions.map(question => {
  const correction = OBJECTIVE_CORRECTIONS[question.id]
  const corrected = correction
    ? {
        ...question,
        objectiveId: correction[0],
        conceptId: correction[1],
        objectiveGroup: TERRAFORM_OBJECTIVES[correction[0]].domain,
        domain: TERRAFORM_OBJECTIVES[correction[0]].domain,
      }
    : question
  const updated = {
    ...corrected,
    question: addScenarioToCommandStem(corrected),
    explanation: enrichExplanation(corrected),
  }

  if (updated.choices) {
    updated.choices = updated.choices.map(choice => DISTRACTOR_REWRITES.get(choice) || choice)
  }

  const artifact = artifactFor(updated)
  if (artifact) {
    updated.evidenceArtifacts = [artifact]
  } else {
    delete updated.evidenceArtifacts
  }

  return updated
})

fs.writeFileSync(target, `${JSON.stringify(enriched, null, 2)}\n`)

const metrics = {
  questions: enriched.length,
  commandStemsRemaining: enriched.filter(question => /^(Which|What) command\b/i.test(question.question)).length,
  structuredExplanations: enriched.filter(question =>
    /^Why this is right:.*Why the alternatives are wrong:.*Operational takeaway:/.test(question.explanation)
  ).length,
  evidenceArtifacts: enriched.filter(question => question.evidenceArtifacts?.length === 1).length,
  strengthenedDistractors: enriched.reduce(
    (count, question) => count + (question.choices || []).filter(
      choice => [...DISTRACTOR_REWRITES.values()].includes(choice),
    ).length,
    0,
  ),
}

console.log(JSON.stringify(metrics, null, 2))
