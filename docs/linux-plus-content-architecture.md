# CompTIA Linux+ Content Architecture

CompTIA Linux+ (XK0-006 V8) is the NVIDIA path's systems foundation. It gives learners Linux administration, security, automation, container, and troubleshooting fluency before they move into AI infrastructure and GPU operations.

## Official Source Spine

- Official CompTIA Linux+ certification page: XK0-006 V8, launched July 15, 2025.
- Official exam details: maximum of 90 questions, multiple-choice and performance-based questions, 90 minutes, 720 passing score on a 100-900 scale.
- Official domain weights:
  - System Management: 23%
  - Services and User Management: 20%
  - Security: 18%
  - Automation, Orchestration, and Scripting: 17%
  - Troubleshooting: 22%

## Production Pool Targets

The shipped pool contains 750 questions so Smart Practice and the 90-question exam simulator can repeat without becoming stale.

| Domain | Blueprint Weight | Pool Count |
|---|---:|---:|
| System Management | 23% | 173 |
| Services and User Management | 20% | 150 |
| Security | 18% | 135 |
| Automation, Orchestration, and Scripting | 17% | 127 |
| Troubleshooting | 22% | 165 |

## Question-Type Strategy

Linux+ includes performance-based questions, so the pool uses more practical formats than a purely written exam.

- Single-choice: scenario-driven administration decisions.
- Multiple-response: paired administration and security choices.
- CLI output: command interpretation for storage, services, security, containers, and troubleshooting.
- Config repair: fstab, systemd, sshd, scripts, and resolver scenarios.
- Matching: command-to-purpose recognition.
- Ordering: safe operational workflows.

## Quality Gates

- `src/__tests__/content-sanity.test.js` locks the exact XK0-006 domain distribution.
- The generator rejects duplicate stems and short explanations.
- Linux+ is live in the full catalog and the NVIDIA path as the systems foundation step.
