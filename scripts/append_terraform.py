"""append_terraform.py — validate and append a batch of HashiCorp Terraform
Associate (003) questions to terraform-associate-questions.json.

Usage:
    python scripts/append_terraform.py scripts/tf_batch_XX.json

Rules enforced (lightweight per-batch gate; content-sanity.test.js does the
exhaustive per-type validation):
  - id matches ^tf-<N>$
  - id is unique across the entire pool (after append) and within the batch
  - type is one of the five recognized types (default 'single-choice')
  - domain in ALLOWED_DOMAINS (the 9 official 003 objectives)
  - question and explanation are non-empty strings
  - single-choice only: exactly 4 choices (non-empty strings), correctAnswer in {0,1,2,3}
"""

import json, sys, pathlib, re

POOL = pathlib.Path(__file__).parent.parent / 'src/data/terraform-associate-questions.json'

ALLOWED_DOMAINS = {
    'Understand infrastructure as code (IaC) concepts',
    'Understand the purpose of Terraform (vs other IaC)',
    'Understand Terraform basics',
    'Use Terraform outside the core workflow',
    'Interact with Terraform modules',
    'Use the core Terraform workflow',
    'Implement and maintain state',
    'Read, generate, and modify configuration',
    'Understand Terraform Cloud capabilities',
}

VALID_TYPES = {
    'single-choice',
    'multiple-response',
    'statement-block',
    'ordering',
    'matching',
}


def validate(batch: list, existing_ids: set) -> list[str]:
    errors = []
    seen = set()
    for i, q in enumerate(batch):
        loc = f"[{i}] id={q.get('id', '?')}"
        qid = q.get('id', '')
        if not re.match(r'^tf-\d+$', str(qid)):
            errors.append(f"{loc}: id must match tf-<N>")
        if qid in existing_ids:
            errors.append(f"{loc}: duplicate id (already in pool)")
        if qid in seen:
            errors.append(f"{loc}: duplicate id within batch")
        seen.add(qid)
        qtype = q.get('type', 'single-choice')
        if qtype not in VALID_TYPES:
            errors.append(f"{loc}: type '{qtype}' not recognized")
        if q.get('domain') not in ALLOWED_DOMAINS:
            errors.append(f"{loc}: domain '{q.get('domain')}' not in ALLOWED_DOMAINS")
        if not (isinstance(q.get('question'), str) and q['question'].strip()):
            errors.append(f"{loc}: question must be a non-empty string")
        if not (isinstance(q.get('explanation'), str) and q['explanation'].strip()):
            errors.append(f"{loc}: explanation must be a non-empty string")
        if qtype == 'single-choice':
            choices = q.get('choices', [])
            if len(choices) != 4:
                errors.append(f"{loc}: single-choice must have exactly 4 choices")
            elif not all(isinstance(c, str) and c.strip() for c in choices):
                errors.append(f"{loc}: all choices must be non-empty strings")
            if q.get('correctAnswer') not in (0, 1, 2, 3):
                errors.append(f"{loc}: correctAnswer must be 0-3")
    return errors


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/append_terraform.py <batch_file.json>")
        sys.exit(1)
    batch_path = pathlib.Path(sys.argv[1])
    batch = json.loads(batch_path.read_text(encoding='utf-8'))
    existing = json.loads(POOL.read_text(encoding='utf-8'))
    existing_ids = {q['id'] for q in existing}

    errors = validate(batch, existing_ids)
    if errors:
        print(f"VALIDATION FAILED ({len(errors)} error(s)):")
        for e in errors:
            print(" ", e)
        sys.exit(1)

    merged = existing + batch
    POOL.write_text(json.dumps(merged, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(f"OK — appended {len(batch)} questions; pool now has {len(merged)} questions.")


if __name__ == '__main__':
    main()
