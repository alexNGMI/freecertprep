import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  classifyTerraformQuestion,
  TERRAFORM_OBJECTIVES,
} from './data/terraform-objectives.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = path.join(root, 'src/data/terraform-associate-questions.json')
const source = process.argv[2] ? path.resolve(process.argv[2]) : target
const questions = JSON.parse(fs.readFileSync(source, 'utf8').replace(/^\uFEFF/, ''))
const supplementalQuestions = [
  {
    id: 'tf-633',
    domain: 'Terraform fundamentals',
    objectiveId: '2c',
    conceptId: 'tf-2c-provider-mapping',
    question: 'A child module must use the aliased provider configuration `aws.west` from its parent. Which module argument maps that configuration correctly?',
    choices: [
      'providers = { aws = aws.west }',
      'provider_alias = "aws.west"',
      'required_providers = { west = aws }',
      'backend = { aws = aws.west }',
    ],
    correctAnswer: 0,
    explanation: 'The parent passes an aliased provider configuration through the module `providers` map. Provider requirements declare source addresses, while aliases are configured and explicitly mapped by the caller.',
  },
  {
    id: 'tf-634',
    domain: 'Terraform fundamentals',
    objectiveId: '2d',
    conceptId: 'tf-2d-state-purpose',
    question: 'Why does Terraform retain state between runs?',
    choices: [
      'To map configuration addresses to remote objects and retain metadata needed for planning',
      'To replace provider APIs with a local resource database',
      'To store the only valid copy of Terraform configuration',
      'To guarantee that infrastructure cannot drift',
    ],
    correctAnswer: 0,
    explanation: 'State binds Terraform resource instances to remote objects and stores metadata used to compare configuration with reality. Providers still query remote APIs, and state does not prevent out-of-band drift.',
  },
  {
    id: 'tf-635',
    domain: 'Terraform fundamentals',
    objectiveId: '2d',
    conceptId: 'tf-2d-state-mapping',
    question: 'A resource exists in configuration and in the cloud, but its binding was removed from state. How will Terraform initially interpret that configuration?',
    choices: [
      'As a resource that may need to be created unless the existing object is imported',
      'As already managed because Terraform searches the entire cloud account automatically',
      'As a data source',
      'As protected from all changes',
    ],
    correctAnswer: 0,
    explanation: 'Without the state binding, Terraform does not know that the configured address represents the existing object. Importing establishes that relationship before normal planning and management.',
  },
  {
    id: 'tf-636',
    domain: 'Core Terraform workflow',
    objectiveId: '3b',
    conceptId: 'tf-3b-init-effects',
    question: 'A repository already contains valid configuration, but the `.terraform` directory is absent after a fresh clone. What must `terraform init` restore before planning?',
    choices: [
      'The selected providers, referenced modules, and backend initialization',
      'All remote resources from state',
      'A saved execution plan',
      'Every input variable value',
    ],
    correctAnswer: 0,
    explanation: '`terraform init` prepares the working directory by installing providers and modules and initializing the configured backend. It does not create resources or invent required input values.',
  },
  {
    id: 'tf-637',
    domain: 'Core Terraform workflow',
    objectiveId: '3c',
    conceptId: 'tf-3c-validate-scope',
    question: 'What important limitation should a passing `terraform validate` result communicate?',
    choices: [
      'The configuration is internally valid, but remote credentials, quotas, and resource availability are not proven',
      'The next apply is guaranteed to succeed',
      'No infrastructure drift exists',
      'Every provider API accepted the proposed values',
    ],
    correctAnswer: 0,
    explanation: '`terraform validate` checks syntax and internal consistency in an initialized directory. Planning and provider API interaction are still required to discover remote constraints and operational failures.',
  },
  {
    id: 'tf-638',
    domain: 'Core Terraform workflow',
    objectiveId: '3g',
    conceptId: 'tf-3g-fmt-ci',
    question: 'Which command is best for a CI check that should fail when Terraform files are not canonically formatted without rewriting them?',
    choices: [
      'terraform fmt -check -recursive',
      'terraform validate -write',
      'terraform plan -format-only',
      'terraform init -check',
    ],
    correctAnswer: 0,
    explanation: '`terraform fmt -check -recursive` checks canonical formatting across the directory tree and returns a nonzero result when changes are needed. It does not rewrite files unless `-check` is omitted.',
  },
  {
    id: 'tf-639',
    domain: 'Terraform configuration',
    objectiveId: '4a',
    conceptId: 'tf-4a-resource-blocks',
    question: 'Which block declares an object that Terraform should create, update, and destroy through a provider?',
    choices: ['resource', 'data', 'output', 'locals'],
    correctAnswer: 0,
    explanation: 'A `resource` block declares a managed object. A `data` block reads existing information, while outputs and locals expose or calculate values without declaring remote infrastructure.',
  },
  {
    id: 'tf-640',
    domain: 'Terraform configuration',
    objectiveId: '4a',
    conceptId: 'tf-4a-data-sources',
    question: 'A configuration needs the ID of an existing network that another system owns. Which construct should read it without declaring lifecycle ownership?',
    choices: ['A data source', 'A managed resource with `prevent_destroy`', 'A local backend', 'An output-only module'],
    correctAnswer: 0,
    explanation: 'A data source queries existing information without telling Terraform to own the object lifecycle. Declaring it as a managed resource would create an incorrect ownership relationship.',
  },
  {
    id: 'tf-641',
    domain: 'Terraform configuration',
    objectiveId: '4c',
    conceptId: 'tf-4c-outputs',
    question: 'A root module must expose a load balancer hostname to a deployment pipeline. Which construct provides that value after apply?',
    choices: ['An output block', 'A provider alias', 'A backend block', 'A moved block'],
    correctAnswer: 0,
    explanation: 'An output block exposes a selected value from a module. Pipelines can read root outputs with `terraform output`, including machine-readable JSON when appropriate.',
  },
  {
    id: 'tf-642',
    domain: 'Terraform configuration',
    objectiveId: '4d',
    conceptId: 'tf-4d-collection-types',
    question: 'Which type constraint accepts string values keyed by unique names, such as environment names mapped to CIDR blocks?',
    choices: ['map(string)', 'list(number)', 'tuple([string])', 'object({ value = bool })'],
    correctAnswer: 0,
    explanation: '`map(string)` represents key/value pairs whose values are strings. Lists are index-based, while tuples and objects describe fixed structural shapes.',
  },
  {
    id: 'tf-643',
    domain: 'Maintain infrastructure with Terraform',
    objectiveId: '7c',
    conceptId: 'tf-7c-log-safety',
    question: 'After collecting detailed Terraform troubleshooting logs, what should the operator do before attaching them to a support case?',
    choices: [
      'Review and redact credentials, tokens, sensitive values, and environment details',
      'Assume Terraform always removes secrets from TRACE output',
      'Commit the logs to the public source repository',
      'Leave `TF_LOG=TRACE` enabled permanently',
    ],
    correctAnswer: 0,
    explanation: 'Verbose Terraform and provider logs can contain sensitive configuration and environment data. Logs should be collected only as needed, reviewed, redacted, and logging disabled afterward.',
  },
  {
    id: 'tf-644',
    domain: 'HCP Terraform',
    objectiveId: '8d',
    conceptId: 'tf-8d-cli-integration',
    question: 'Which command stores an HCP Terraform API token for Terraform CLI authentication on a workstation?',
    choices: ['terraform login', 'terraform init -auth', 'terraform cloud connect', 'terraform workspace login'],
    correctAnswer: 0,
    explanation: '`terraform login` obtains and stores an API token for the selected Terraform service host. Workspace execution and VCS settings are configured separately.',
  },
  {
    id: 'tf-645',
    domain: 'Terraform configuration',
    objectiveId: '4b',
    conceptId: 'tf-4b-resource-attributes',
    question: 'A configuration must use the ID exported by `aws_vpc.main`. Which expression references that managed resource attribute?',
    choices: [
      'aws_vpc.main.id',
      'resource.aws_vpc.main[id]',
      'var.aws_vpc.main.id',
      'data.aws_vpc.main.id',
    ],
    correctAnswer: 0,
    explanation: 'Managed resource attributes use the resource type, local name, and attribute: `aws_vpc.main.id`. The `var` and `data` namespaces refer to input variables and data sources instead.',
  },
  {
    id: 'tf-646',
    domain: 'Terraform configuration',
    objectiveId: '4b',
    conceptId: 'tf-4b-cross-resource-references',
    question: 'An EC2 instance argument uses `aws_subnet.app.id`. What additional behavior does this direct reference normally create?',
    choices: [
      'Terraform infers that the subnet must be handled before the instance',
      'Terraform copies the subnet into the instance state entry',
      'Terraform converts the subnet into a data source',
      'Terraform requires an additional `depends_on` for the same relationship',
    ],
    correctAnswer: 0,
    explanation: 'A reference to another managed resource creates an implicit dependency in Terraform’s graph. An explicit `depends_on` is unnecessary when the dependency is already expressed through a value reference.',
  },
  {
    id: 'tf-647',
    domain: 'Core Terraform workflow',
    objectiveId: '3a',
    conceptId: 'tf-3a-workflow-safety',
    question: 'A team wants an approval boundary between reviewing proposed infrastructure changes and executing them. Which workflow best preserves that boundary?',
    choices: [
      'Create and review a saved plan, then apply that saved plan after approval',
      'Run `terraform apply -auto-approve` and review the state afterward',
      'Run `terraform fmt` before every apply and treat formatting as approval',
      'Delete the state lock before applying so reviewers can inspect the state',
    ],
    correctAnswer: 0,
    explanation: 'A saved plan lets the team review the exact proposed actions and later apply that approved artifact. Auto-approval removes the boundary, formatting does not review infrastructure changes, and state locks should not be removed as an approval mechanism.',
  },
]

const migrated = [...questions.map(question => {
  const classification = classifyTerraformQuestion(question)
  const updated = {
    ...question,
    objectiveId: classification.objectiveId,
    conceptId: classification.conceptId,
    objectiveGroup: TERRAFORM_OBJECTIVES[classification.objectiveId].domain,
  }

  if (updated.id === 'tf-172') {
    updated.choices[2] = 'Remove its resource block and review the resulting plan before applying'
    updated.explanation = 'Removing the resource block and reviewing the resulting plan lets Terraform destroy the managed object while keeping configuration and state aligned. Routine use of -target is not part of this normal removal workflow.'
  }
  if (updated.id === 'tf-378') {
    updated.question = 'What does refresh-only planning update?'
    updated.choices[2] = 'State to reflect the real infrastructure without changing remote objects'
    updated.explanation = 'Refresh-only mode updates Terraform state and root outputs to reflect remote objects without proposing changes to those objects. The standalone terraform refresh command is deprecated.'
  }
  if (updated.id === 'tf-123') {
    updated.choices[1] = 'It requires an HCP Terraform workspace'
  }
  if (updated.id === 'tf-601') {
    updated.question = 'When should you use `depends_on` in Terraform configuration?'
  }
  if (updated.id === 'tf-623') {
    updated.question = 'A resource address changes during a refactor, but the remote object must remain in place. Which construct records the address change in configuration?'
    updated.choices = [
      'A `moved` block',
      'A `removed` block with `destroy = true`',
      'A new provider alias',
      'A `check` block',
    ]
    updated.correctAnswer = 0
    updated.explanation = 'A `moved` block tells Terraform that an existing object has a new resource address, preserving the object while updating its state binding during planning and apply.'
  }
  if (updated.id === 'tf-624') {
    updated.question = 'Which command displays the attributes stored in state for the resource address `aws_instance.web`?'
    updated.choices = [
      'terraform state show aws_instance.web',
      'terraform state list aws_instance.web',
      'terraform show -json aws_instance.web',
      'terraform import aws_instance.web',
    ]
    updated.correctAnswer = 0
    updated.explanation = '`terraform state show ADDRESS` displays the attributes of one resource instance in state. `state list` lists addresses, while `import` associates an existing remote object with an address.'
    updated.objectiveId = '7b'
    updated.conceptId = 'tf-7b-state-inspection'
    updated.objectiveGroup = TERRAFORM_OBJECTIVES['7b'].domain
  }
  if (updated.id === 'tf-626') {
    updated.question = 'What role does a Terraform provider perform during planning and apply?'
    updated.choices = [
      'It translates Terraform resource operations into calls to a target platform API',
      'It stores every backend state snapshot inside the provider binary',
      'It replaces the Terraform CLI workflow with vendor-specific commands',
      'It guarantees that remote objects cannot drift',
    ]
    updated.correctAnswer = 0
    updated.explanation = 'Providers are plugins that let Terraform communicate with cloud, SaaS, and other platform APIs. State and workflow remain Terraform concerns, and providers cannot prevent out-of-band changes.'
  }
  if (updated.id === 'tf-627') {
    updated.question = 'Which Terraform feature can verify an assumption after a resource or data source has been evaluated?'
    updated.choices = [
      'The dependency lock file',
      'A postcondition',
      'State locking',
      'A provider mirror',
    ]
    updated.correctAnswer = 1
    updated.explanation = 'A postcondition checks an assumption after Terraform evaluates a resource or data source. Variable validation checks inputs, while preconditions run before an object operation.'
  }

  return updated
}), ...supplementalQuestions.map(question => ({
  ...question,
  objectiveGroup: TERRAFORM_OBJECTIVES[question.objectiveId].domain,
}))]

fs.writeFileSync(target, `${JSON.stringify(migrated, null, 2)}\n`)
console.log(`Migrated ${migrated.length} Terraform questions to Associate 004 objective metadata.`)
