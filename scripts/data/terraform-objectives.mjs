export const TERRAFORM_OBJECTIVES = {
  '1a': { domain: 'Infrastructure as Code (IaC) with Terraform', title: 'Explain what IaC is' },
  '1b': { domain: 'Infrastructure as Code (IaC) with Terraform', title: 'Describe the advantages of IaC patterns' },
  '1c': { domain: 'Infrastructure as Code (IaC) with Terraform', title: 'Explain multi-cloud, hybrid-cloud, and service-agnostic workflows' },
  '2a': { domain: 'Terraform fundamentals', title: 'Install and version Terraform providers' },
  '2b': { domain: 'Terraform fundamentals', title: 'Describe how Terraform uses providers' },
  '2c': { domain: 'Terraform fundamentals', title: 'Write configuration using multiple providers' },
  '2d': { domain: 'Terraform fundamentals', title: 'Explain how Terraform uses and manages state' },
  '3a': { domain: 'Core Terraform workflow', title: 'Describe the Terraform workflow' },
  '3b': { domain: 'Core Terraform workflow', title: 'Initialize a Terraform working directory' },
  '3c': { domain: 'Core Terraform workflow', title: 'Validate a Terraform configuration' },
  '3d': { domain: 'Core Terraform workflow', title: 'Generate and review an execution plan' },
  '3e': { domain: 'Core Terraform workflow', title: 'Apply infrastructure changes' },
  '3f': { domain: 'Core Terraform workflow', title: 'Destroy Terraform-managed infrastructure' },
  '3g': { domain: 'Core Terraform workflow', title: 'Apply formatting and style adjustments' },
  '4a': { domain: 'Terraform configuration', title: 'Differentiate resource and data blocks' },
  '4b': { domain: 'Terraform configuration', title: 'Use resource attributes and cross-resource references' },
  '4c': { domain: 'Terraform configuration', title: 'Use variables and outputs' },
  '4d': { domain: 'Terraform configuration', title: 'Understand and use complex types' },
  '4e': { domain: 'Terraform configuration', title: 'Use expressions and functions' },
  '4f': { domain: 'Terraform configuration', title: 'Define resource dependencies' },
  '4g': { domain: 'Terraform configuration', title: 'Validate configuration with custom conditions' },
  '4h': { domain: 'Terraform configuration', title: 'Manage sensitive data and secrets' },
  '5a': { domain: 'Terraform modules', title: 'Explain how Terraform sources modules' },
  '5b': { domain: 'Terraform modules', title: 'Describe variable scope within modules' },
  '5c': { domain: 'Terraform modules', title: 'Use modules in configuration' },
  '5d': { domain: 'Terraform modules', title: 'Manage module versions' },
  '6a': { domain: 'Terraform state management', title: 'Describe the local backend' },
  '6b': { domain: 'Terraform state management', title: 'Describe state locking' },
  '6c': { domain: 'Terraform state management', title: 'Configure remote state using the backend block' },
  '6d': { domain: 'Terraform state management', title: 'Manage resource drift and Terraform state' },
  '7a': { domain: 'Maintain infrastructure with Terraform', title: 'Import existing infrastructure' },
  '7b': { domain: 'Maintain infrastructure with Terraform', title: 'Use the CLI to inspect state' },
  '7c': { domain: 'Maintain infrastructure with Terraform', title: 'Use verbose logging' },
  '8a': { domain: 'HCP Terraform', title: 'Use HCP Terraform to create infrastructure' },
  '8b': { domain: 'HCP Terraform', title: 'Describe collaboration and governance features' },
  '8c': { domain: 'HCP Terraform', title: 'Organize workspaces and projects' },
  '8d': { domain: 'HCP Terraform', title: 'Configure and use HCP Terraform integration' },
}

const rules = [
  ['8c', 'projects', /\bprojects?\b/i],
  ['8c', 'run-triggers', /\brun triggers?\b|\bchain workspaces?\b/i],
  ['8c', 'workspace-organization', /\bworkspace(s)?\b.*\b(project|organize|group|variable set|access)\b|\bvariable sets?\b/i],
  ['8d', 'cli-integration', /\bterraform login\b|\bcloud block\b|\bmigrat(e|ing).*(state|workspace).*(HCP|remote)\b/i],
  ['8d', 'vcs-integration', /\bVCS\b|\bpull request\b|\bversion control.*HCP\b/i],
  ['8a', 'remote-runs', /\bremote (run|operation)|\bHCP Terraform.*\b(run|apply|plan)\b/i],
  ['8a', 'managed-state', /\bHCP Terraform.*\b(state|infrastructure)\b|\bmanaged state\b/i],
  ['8b', 'policy-governance', /\bSentinel\b|\bOPA\b|\bpolicy as code\b|\bpolicy (check|enforcement)\b/i],
  ['8b', 'registry', /\bprivate registry\b|\borganization.*modules?\b/i],
  ['8b', 'health-drift', /\bExplorer\b|\bhealth assessment\b|\bdrift detection\b|\bchange requests?\b/i],
  ['8b', 'dynamic-credentials', /\bdynamic provider credentials?\b/i],
  ['8b', 'teams-audit', /\bteam access\b|\baudit log\b|\bcost estimation\b|\brun tasks?\b|\bgovernance\b|\bcollaboration\b/i],

  ['7c', 'tf-log-levels', /\bTF_LOG\b|\bTRACE\b|\bverbose log/i],
  ['7c', 'log-safety', /\bdebug log|\blog file\b|\bTF_LOG_PATH\b|\bdisable.*logging\b/i],
  ['7a', 'import-block', /\bimport block\b|\bgenerated configuration\b/i],
  ['7a', 'cli-import', /\bterraform import\b|\bimport existing\b|\bbring.*under Terraform management\b/i],
  ['7b', 'state-list-show', /\bterraform state (list|show|pull)\b|\bterraform show\b.*\bstate\b/i],
  ['7b', 'state-inspection-json', /\bstate.*JSON\b|\bterraform output\b|\bterraform providers\b|\bterraform graph\b|\bterraform console\b/i],

  ['6b', 'lock-behavior', /\bstate lock(ing|ed)?\b|\bconcurrent.*state\b|\bsecond apply\b/i],
  ['6b', 'force-unlock', /\bforce-unlock\b|\bstale lock\b/i],
  ['6c', 'backend-block', /\bbackend block\b|\bbackend configuration\b|\bpartial backend\b/i],
  ['6c', 'remote-backend', /\bremote backend\b|\bstate storage bucket\b|\bcentralize state\b/i],
  ['6c', 'state-migration', /\bmigrat(e|ing).*(local|remote|backend|state)\b|\bversioned remote state\b/i],
  ['6a', 'local-storage', /\blocal backend\b|\blocal filesystem\b|\bterraform\.tfstate\b/i],
  ['6a', 'local-risk', /\blocal state\b.*\b(risk|team|engineer|loss)\b|\bmultiple engineers using local state\b/i],
  ['6d', 'drift-refresh', /\bdrift\b|\brefresh-only\b|\bterraform refresh\b|\bremote objects?.*state\b/i],
  ['6d', 'state-move-remove', /\bstate (mv|rm|push|replace-provider)\b|\bmoved block\b|\bremoved block\b|\bresource address.*state\b/i],
  ['6d', 'state-security', /\bstate.*(sensitive|secret|encrypt|version|backup|loss|security)\b/i],
  ['6d', 'workspaces', /\bCLI workspace\b|\bterraform workspace\b/i],

  ['5d', 'module-constraints', /\bmodule.*version\b|\bversion argument.*module\b|\bpin.*module\b/i],
  ['5d', 'module-upgrades', /\bsemantic versioning\b|\bmodule upgrade\b|\bchange.*module.*version\b/i],
  ['5a', 'local-git-sources', /\bmodule source\b.*\b(local|Git)\b|\bsource\s*=\s*["']?(\.\/|git)/i],
  ['5a', 'registry-sources', /\bregistry modules?\b|\bmodule registry\b|\bHashiCorp-verified modules\b/i],
  ['5b', 'module-inputs', /\b(parent|child) module\b.*\b(input|variable|pass|receive)\b|\bmodule boundaries\b/i],
  ['5b', 'module-outputs', /\bchild module\b.*\b(output|expose|access|local)\b|\bmodule output\b/i],
  ['5c', 'module-composition', /\bmodule block\b|\bmodule composition\b|\broot module\b/i],
  ['5c', 'module-instances', /\bmodule\.<|\bmodule instances?\b|\bcount meta-argument on a module\b|\bfor_each.*module\b/i],

  ['4h', 'ephemeral-write-only', /\bwrite-only\b|\bephemeral\b/i],
  ['4h', 'sensitive-values', /\bsensitive\b|\bsecret(s)?\b|\bVault\b/i],
  ['4g', 'pre-postconditions', /\bprecondition\b|\bpostcondition\b|\bcustom condition\b/i],
  ['4g', 'validation-checks', /\bvalidation block\b|\bcheck block\b/i],
  ['4f', 'dependency-graph', /\bdepends_on\b|\bdependency graph\b|\bimplicit dependenc/i],
  ['4f', 'lifecycle-dependencies', /\bcreate_before_destroy\b|\breplace_triggered_by\b|\bprevent_destroy\b|\bignore_changes\b/i],
  ['4a', 'resource-blocks', /\bresource block\b|\bresource declar/i],
  ['4a', 'data-sources', /\bdata source\b|\bdata block\b/i],
  ['4b', 'attribute-references', /\bresource attribute\b|\bcross-resource\b|\breference.*resource\b|\bself\./i],
  ['4b', 'resource-addresses', /\bresource address\b|\bcount\.index\b|\beach\.(key|value)\b/i],
  ['4c', 'variables', /\binput variable\b|\bvar\.|\bterraform\.tfvars\b|\bTF_VAR_\b|\b-var-file\b|\bvariable precedence\b/i],
  ['4c', 'outputs', /\boutput (block|value)|\bterraform output\b/i],
  ['4d', 'collection-types', /\b(list|set|map)\(.*\)|\bcollection type\b/i],
  ['4d', 'structural-types', /\b(tuple|object)\(.*\)|\bcomplex type\b|\btype constraint\b|\boptional\(\)/i],
  ['4e', 'functions', /\bfunction\b|\b[a-z]+encode\(|\b[a-z]+decode\(|\blookup\(|\bmerge\(|\bcoalesce\(|\btry\(|\bcan\(|\bcidrsubnet\(|\btemplatefile\(/i],
  ['4e', 'expressions', /\bfor expression\b|\bconditional expression\b|\bternary\b|\bdynamic block\b|\binterpolation\b/i],

  ['3g', 'fmt-command', /\bterraform fmt\b|\bcanonical (style|format)\b/i],
  ['3g', 'fmt-ci', /\bunformatted\b|\bformatting.*CI\b|\bfmt -check\b/i],
  ['3c', 'validate-command', /\bterraform validate\b/i],
  ['3c', 'validate-scope', /\bsyntactically valid\b|\binternally consistent\b|\bconfiguration validity\b/i],
  ['3b', 'init-directory', /\bterraform init\b|\binitialize.*working directory\b|\bnew directory\b.*\bfirst\b/i],
  ['3b', 'init-effects', /\b\.terraform directory\b|\bdownload.*provider\b|\binitialize.*backend\b/i],
  ['3f', 'destroy-command', /\bterraform destroy\b|\bdestroy infrastructure\b/i],
  ['3f', 'destroy-plan', /\bplan -destroy\b|\bpreview.*destroy\b|\bremove.*resource block.*apply\b|\bplan symbol means ['"]?destroy/i],
  ['3d', 'saved-plans', /\bsaved plan\b|\bplan -out\b|\bplan file\b/i],
  ['3d', 'plan-review', /\bterraform plan\b|\bexecution plan\b|\bplan symbol\b|\bto add\b.*\bto change\b/i],
  ['3e', 'apply-options', /\bauto-approve\b|\binput=false\b|\bapply -replace\b/i],
  ['3e', 'apply-behavior', /\bterraform apply\b|\bpartial apply\b|\bapply fails\b/i],
  ['3a', 'workflow-sequence', /\bworkflow\b|\binit.*plan.*apply\b/i],
  ['3a', 'workflow-safety', /\bplan\/apply separation\b|\biterative development\b|\bautomation pipeline\b/i],

  ['2c', 'provider-aliases', /\bprovider alias\b|\baliased provider\b/i],
  ['2c', 'provider-mapping', /\bmultiple providers\b|\bproviders\s*=\s*\{|\bpass providers explicitly\b/i],
  ['2a', 'provider-requirements', /\brequired_providers\b|\bprovider source address\b/i],
  ['2a', 'provider-locking', /\bprovider version\b|\bdependency lock\b|\b\.terraform\.lock\.hcl\b|\binit -upgrade\b/i],
  ['2b', 'provider-plugins', /\bprovider(s)?\b.*\b(API|plugin|platform)\b|\bplugin-based architecture\b/i],
  ['2b', 'provider-auth', /\bprovider authentication\b|\bprovider credentials\b|\bprovider block.*configure\b/i],
  ['2d', 'state-mapping', /\bstate maps\b|\bstate.*remote object\b/i],
  ['2d', 'state-purpose', /\bwhy Terraform uses state\b|\bpurpose of.*state\b|\bstate enable\b/i],

  ['1c', 'multi-hybrid-cloud', /\bmulti-cloud\b|\bhybrid cloud\b|\bmultiple providers\b/i],
  ['1c', 'service-agnostic', /\bcloud-agnostic\b|\bservice-agnostic\b|\bprovider ecosystem\b|\bvendor-native IaC\b|\bCloudFormation\b/i],
  ['1b', 'version-control', /\bversion control\b|\bpull requests?\b|\baudit(able|s)?\b|\bpeer review\b/i],
  ['1b', 'repeatability', /\brepeatab|\breproduc|\benvironment parity\b|\bdisaster recovery\b|\bconfiguration drift\b|\bidempot/i],
  ['1b', 'automation-benefits', /\bbenefit\b|\badvantage\b|\bconsisten|\bspeed\b|\bself-documenting\b/i],
  ['1a', 'declarative', /\bdeclarative\b|\bdesired (state|end state|outcome)\b|\bimperative\b/i],
  ['1a', 'iac-definition', /\binfrastructure as code\b|\bIaC\b|\bprovisioning\b|\bsnowflake server\b/i],
]

const domainFallbacks = {
  'Infrastructure as Code (IaC) with Terraform': ['1a', 'iac-definition'],
  'Terraform fundamentals': ['2b', 'provider-plugins'],
  'Core Terraform workflow': ['3a', 'workflow-sequence'],
  'Terraform configuration': ['4e', 'expressions'],
  'Terraform modules': ['5c', 'module-composition'],
  'Terraform state management': ['6d', 'state-management'],
  'Maintain infrastructure with Terraform': ['7b', 'cli-maintenance'],
  'HCP Terraform': ['8b', 'collaboration'],
}

const crossDomainRules = [
  ['7c', 'verbose-logging', /\bTF_LOG\b|\bTF_LOG_PATH\b|\bverbose logging\b/i],
  ['7a', 'import-workflow', /\bterraform import\b|\bimport block\b|\bimport (an )?existing\b|\bbring an unmanaged\b/i],
  ['7b', 'state-inspection', /\bterraform state (list|show|mv|rm|pull|replace-provider)\b|\bterraform providers\b|\bterraform graph\b/i],
  ['6b', 'state-locking', /\bstate lock(ing)?\b|\bforce-unlock\b|\bconcurrent.*state\b/i],
  ['6c', 'remote-backends', /\bremote backend\b|\bbackend block\b|\bbackend configuration\b|\bstate storage bucket\b/i],
  ['6a', 'local-backend', /\blocal\W+backend\b|\blocal filesystem.*state\b/i],
  ['6d', 'drift-management', /\bconfiguration drift\b|\bresource drift\b|\brefresh-only\b|\bmoved block\b|\bremoved block\b/i],
  ['4h', 'sensitive-values', /\bsensitive value\b|\bsensitive\s*=\s*true\b|\bsecret(s)?\b.*\b(state|configuration|output)\b/i],
  ['4g', 'custom-validation', /\bvalidation block\b|\bprecondition\b|\bpostcondition\b|\bcheck blocks?\b|\bvalidat(e|ing) assumptions\b/i],
  ['4f', 'resource-dependencies', /\bdepends_on\b|\bcreate_before_destroy\b|\bprevent_destroy\b|\bignore_changes\b|\breplace_triggered_by\b|\blifecycle (block|setting|rule)\b/i],
  ['4d', 'complex-types', /\bmap\((string|number|bool)\)\b|\blist\((string|number|bool)\)\b|\bset\((string|number|bool)\)\b|\btuple\(\[|\bobject\(\{|\boptional\(\)|\btype constraint\b/i],
  ['4c', 'variables-outputs', /\bTF_VAR_\w+\b|\bvar\.\w+\b|\binput variable\b|\bvariable block\b|\boutput block\b|\bmodule output\b/i],
  ['4a', 'resources-data', /\bdata source\b|\bdata block\b|\bmanaged resource\b|\bresource block\b/i],
  ['4e', 'expressions-functions', /\bfor_each\b|\bfor expression\b|\bconditional expression\b|\bdynamic block\b|\bterraform function\b|\bcidrsubnet\(|\btemplatefile\(/i],
  ['5d', 'module-versions', /\bmodule version\b|\bversion argument.*module\b|\bmodule.*version constraint\b/i],
  ['5a', 'module-sources', /\bmodule source\b|\bprivate module registry\b|\bregistry module\b|\blocal module source\b/i],
  ['5b', 'module-scope', /\bchild module\b.*\b(input|output|variable|local)\b|\bparent module\b.*\b(input|output|variable|local)\b/i],
  ['5c', 'module-composition', /\broot module\b|\bmodule block\b|\bmodule call\b/i],
  ['3g', 'fmt-command', /\bterraform fmt\b|\bfmt -check\b|\bcanonical formatting\b/i],
  ['3c', 'validate-command', /\bterraform validate\b|\binternally consistent\b|\bpre-commit validation\b/i],
  ['3b', 'init-command', /\bterraform init\b|\binitialize.*working directory\b|\b\.terraform directory\b/i],
  ['3f', 'destroy-command', /\bterraform destroy\b|\bplan -destroy\b/i],
  ['3d', 'plan-command', /\bterraform plan\b|\bsaved plan\b|\bexecution plan\b|\bplan -out\b|\brefresh during plan\b/i],
  ['3e', 'apply-command', /\bterraform apply\b|\bauto-approve\b|\bpartial apply\b|\bcommand applies configuration\b/i],
  ['2c', 'provider-aliases', /\bprovider alias\b|\baliased provider\b|\bproviders\s*=\s*\{/i],
  ['2a', 'provider-requirements', /\brequired_providers\b|\bprovider source address\b|\bdependency lock file\b|\b\.terraform\.lock\.hcl\b/i],
  ['2b', 'provider-plugins', /\bprovider plugin\b|\bprovider authentication\b|\bprovider credentials\b|\bplugin-based architecture\b/i],
  ['8c', 'workspace-organization', /\bHCP Terraform\b.*\b(project|organization|workspace organization)\b/i],
  ['8b', 'health-governance', /\bHCP Terraform\b.*\b(health assessment|drift detection|governance|policy|run task)\b/i],
  ['8a', 'remote-runs', /\bHCP Terraform\b.*\b(speculative plan|remote run|remote operation)\b/i],
  ['1c', 'multi-cloud', /\bmulti-cloud\b|\bhybrid cloud\b|\bcloud-agnostic\b|\bservice-agnostic\b/i],
  ['1a', 'declarative-iac', /\binfrastructure as code\b|\bdeclarative model\b|\bdesired end state\b/i],
]

export function classifyTerraformQuestion(question) {
  const questionText = question.question
  const supportingText = [
    question.question,
    ...(question.choices || []),
    question.explanation,
  ].join(' ')

  // Only unmistakable Terraform constructs can override a legacy broad domain.
  for (const [objectiveId, concept, pattern] of crossDomainRules) {
    if (pattern.test(questionText)) {
      return {
        objectiveId,
        conceptId: `tf-${objectiveId}-${concept}`,
        domain: TERRAFORM_OBJECTIVES[objectiveId].domain,
        classifiedBy: concept,
      }
    }
  }

  const domainRules = rules.filter(([objectiveId]) =>
    TERRAFORM_OBJECTIVES[objectiveId].domain === question.domain
  )

  for (const [objectiveId, concept, pattern] of domainRules) {
    if (pattern.test(supportingText)) {
      return {
        objectiveId,
        conceptId: `tf-${objectiveId}-${concept}`,
        domain: question.domain,
        classifiedBy: `${concept}-supporting`,
      }
    }
  }

  const [objectiveId, concept] = domainFallbacks[question.domain]
  return {
    objectiveId,
    conceptId: `tf-${objectiveId}-${concept}`,
    domain: question.domain,
    classifiedBy: 'fallback',
  }
}
