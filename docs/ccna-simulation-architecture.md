# CCNA 200-301 Simulation Architecture

Status: simulation foundation implemented; `cli-output`, `topology-scenario`, `config-repair`, and `subnetting-drill` renderers plus schema validation are implemented. A 120-item unpublished CCNA preview pool is registered at `ccna-200-301` for QA and is intentionally hidden from the public catalog.

## Official Scope

Cisco lists **200-301 CCNA v1.1** as a 120-minute exam tied to the CCNA certification. The official exam topic PDF defines six weighted domains:

| Domain | Weight |
| --- | ---: |
| Network Fundamentals | 20% |
| Network Access | 20% |
| IP Connectivity | 25% |
| IP Services | 10% |
| Security Fundamentals | 15% |
| Automation and Programmability | 10% |

Primary sources:

- Cisco exam page: https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html
- Cisco official exam topics PDF: https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf

## Product Position

CCNA should not enter the main catalog as a normal question bank. It should launch as an advanced simulation track only after the app can represent the parts of the exam that make CCNA different from entry-level certification prep:

- Reading network diagrams and identifying behavior from topology.
- Interpreting router, switch, VLAN, trunk, STP, EtherChannel, OSPF, DHCP, NAT, ACL, and wireless controller state.
- Choosing or repairing IOS-style configuration snippets.
- Troubleshooting from command output rather than recognizing definitions.
- Practicing subnetting and route-selection speed under time pressure.

CCST Networking already covers the Cisco-oriented pre-CCNA foundation. CCNA should sit above it as a separate advanced track.

## Existing App Support

The current `QuestionCard` contract supports:

- `single-choice`
- `multiple-response`
- `statement-block`
- `ordering`
- `matching`
- `cli-output`
- `topology-scenario`
- `config-repair`
- `subnetting-drill`

These cover the simulation primitives needed for a first CCNA preview pool: written items, command-output interpretation, topology-reading scenarios, IOS-style configuration repair, and typed subnetting calculations.

## Required New Simulation Types

### 1. Topology Scenario

Purpose: Present a network diagram plus one or more interpretation questions.

Implementation status: complete for the first pass. `QuestionCard` renders responsive SVG topologies from node/link JSON, supports optional scenario tables, content sanity validates the topology schema, and answers use the existing choice-based scoring flow.

Suggested JSON shape:

```json
{
  "type": "topology-scenario",
  "domain": "IP Connectivity",
  "topology": {
    "nodes": [
      { "id": "R1", "label": "R1", "kind": "router", "x": 120, "y": 120 },
      { "id": "SW1", "label": "SW1", "kind": "switch", "x": 320, "y": 120 }
    ],
    "links": [
      { "from": "R1", "to": "SW1", "label": "G0/0 - G0/1" }
    ]
  },
  "question": "Traffic from VLAN 10 cannot reach the default gateway. Based on the topology and interface table, what is the most likely issue?",
  "choices": [],
  "correctAnswer": 0,
  "explanation": ""
}
```

Renderer needs:

- Responsive SVG topology rendering.
- Simple network symbols with device labels.
- Link labels and interface labels.
- Optional tables for VLANs, routing, addressing, or wireless state.
- Same scoring path as single-choice or multiple-response.

### 2. CLI Output Interpretation

Purpose: Show command output and ask the learner to infer the state.

Implementation status: complete for the first pass. `QuestionCard` renders command-output panels, content sanity validates the `commands` schema, and the answer uses the existing single-choice scoring flow.

Suggested JSON shape:

```json
{
  "type": "cli-output",
  "domain": "Network Access",
  "prompt": "Review the command output.",
  "commands": [
    {
      "device": "SW1",
      "command": "show interfaces trunk",
      "output": "..."
    }
  ],
  "question": "Why is VLAN 20 traffic not crossing the trunk?",
  "choices": [],
  "correctAnswer": 2,
  "explanation": ""
}
```

Renderer needs:

- Monospace terminal panel.
- Device and command labels.
- Syntax-friendly line wrapping on mobile.
- Optional highlighted lines after answer reveal.
- Same scoring path as single-choice or multiple-response.

### 3. Config Repair

Purpose: Ask learners to select the missing or incorrect command from a small configuration.

Implementation status: complete for the first pass. `QuestionCard` renders numbered configuration excerpts, device/config labels, optional notes, content sanity validates the config schema, and answers use the existing choice-based scoring flow.

Suggested JSON shape:

```json
{
  "type": "config-repair",
  "domain": "IP Services",
  "scenario": "PAT is configured for inside hosts, but outbound traffic is failing.",
  "config": [
    "interface g0/0",
    " ip address 192.0.2.1 255.255.255.0",
    " ip nat inside",
    "interface g0/1",
    " ip address 203.0.113.2 255.255.255.252"
  ],
  "question": "Which command is missing?",
  "choices": [],
  "correctAnswer": 1,
  "explanation": ""
}
```

Renderer needs:

- Config block display.
- Line numbers.
- Optional scenario, device, title, and note fields.
- Single-choice, multiple-response, or ordering scoring depending on the item.

### 4. Subnetting Drill

Purpose: Timed, repeatable subnet calculations.

Implementation status: complete for the first pass. `QuestionCard` renders typed subnetting fields, `isAnswerCorrect` scores keyed answer objects, content sanity validates requested fields and correct values, and review mode shows field-level feedback.

Suggested JSON shape:

```json
{
  "type": "subnetting-drill",
  "domain": "Network Fundamentals",
  "given": "192.168.10.64/27",
  "asks": ["network", "broadcast", "firstUsable", "lastUsable", "hostCount"],
  "correct": {
    "network": "192.168.10.64",
    "broadcast": "192.168.10.95",
    "firstUsable": "192.168.10.65",
    "lastUsable": "192.168.10.94",
    "hostCount": 30
  },
  "explanation": ""
}
```

Renderer needs:

- Short text inputs.
- Normalized IP validation.
- Partial feedback for each field.
- Separate scoring helper rather than array equality.

## Phased Build

### Phase 1: Simulation Foundation

Build the renderer framework before adding a large CCNA pool.

- `cli-output`, `topology-scenario`, `config-repair`, and `subnetting-drill` are already recognized and rendered.
- Keep each type compatible with existing quiz, drill, exam, results, and bookmark flows.
- Add content-sanity validation for each new schema.
- Add focused renderer tests for each type.
- Create a small internal fixture set of 12-18 CCNA simulation items.

### Phase 2: CCNA Preview Track

Add an unpublished or preview CCNA track with a small, high-quality set.

First preview pool status: implemented as an unpublished 120-item pool.

- 120 total items.
- 60 standard written items using existing types.
- 25 CLI output items.
- 20 topology scenario items.
- 10 config repair items.
- 5 subnetting drill items.

Domain distribution should follow Cisco weights:

- Network Fundamentals: 24
- Network Access: 24
- IP Connectivity: 30
- IP Services: 12
- Security Fundamentals: 18
- Automation and Programmability: 12

### Phase 3: Public Advanced Track

Only publish CCNA once simulation quality is strong enough.

Minimum bar:

- At least 300 high-quality questions/simulations.
- All six domains represented by official weights.
- CLI/topology/config items heavily represented in Network Access, IP Connectivity, and IP Services.
- Mobile layout verified for topology and terminal panels.
- Exam mode can mix standard and simulation questions without broken scoring or review.

### Phase 4: Full Production Pool

Long-term target:

- 750 total items.
- At least 200 simulation-style items.
- Timed 120-minute exam mode.
- Separate subnetting speed drill.
- Optional CCST-to-CCNA transition path page.

## Suggested Implementation Order

1. Audit the 120-item unpublished CCNA preview pool against official domain expectations and remove any templated, vague, or overly easy items.
2. Use the preview pool to harden mobile layout, review state, exam-mode behavior, and content validation for all simulation types.
3. Expand only after the simulation UX and editorial quality bar are stable.

## Decision

Do not build CCNA as a normal MCQ-only cert. Build the simulation layer first, then use CCNA as the first advanced cert to prove that layer.
