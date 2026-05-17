"""append_ga_state.py — validate and append a batch of Georgia state-law
questions to real-estate-ga-state-questions.json.

Usage:
    python scripts/append_ga_state.py scripts/ga_batch_XX.json

Rules enforced:
  - type == 'single-choice' (or absent, treated as single-choice)
  - portion == 'state'
  - id starts with 're-ga-'
  - id is unique across the entire pool (after append)
  - domain in ALLOWED_DOMAINS
  - exactly 4 choices, each a non-empty string
  - correctAnswer in {0, 1, 2, 3}
  - question and explanation are non-empty strings
"""

import json, sys, pathlib, re

POOL = pathlib.Path(__file__).parent.parent / 'src/data/real-estate-ga-state-questions.json'

ALLOWED_DOMAINS = {
    'Georgia State Laws and Rules',
    'Real Estate Practice in Georgia',
    'Finance and Closing in Georgia',
}


def validate(batch: list, existing_ids: set) -> list[str]:
    errors = []
    seen = set()
    for i, q in enumerate(batch):
        loc = f"[{i}] id={q.get('id', '?')}"
        qid = q.get('id', '')
        if not re.match(r'^re-ga-\d+$', str(qid)):
            errors.append(f"{loc}: id must match re-ga-<N>")
        if qid in existing_ids:
            errors.append(f"{loc}: duplicate id (already in pool)")
        if qid in seen:
            errors.append(f"{loc}: duplicate id within batch")
        seen.add(qid)
        if q.get('type', 'single-choice') != 'single-choice':
            errors.append(f"{loc}: type must be 'single-choice'")
        if q.get('portion') != 'state':
            errors.append(f"{loc}: portion must be 'state'")
        if q.get('domain') not in ALLOWED_DOMAINS:
            errors.append(f"{loc}: domain '{q.get('domain')}' not in ALLOWED_DOMAINS")
        choices = q.get('choices', [])
        if len(choices) != 4:
            errors.append(f"{loc}: must have exactly 4 choices")
        elif not all(isinstance(c, str) and c.strip() for c in choices):
            errors.append(f"{loc}: all choices must be non-empty strings")
        ca = q.get('correctAnswer')
        if ca not in (0, 1, 2, 3):
            errors.append(f"{loc}: correctAnswer must be 0-3")
        if not (isinstance(q.get('question'), str) and q['question'].strip()):
            errors.append(f"{loc}: question must be a non-empty string")
        if not (isinstance(q.get('explanation'), str) and q['explanation'].strip()):
            errors.append(f"{loc}: explanation must be a non-empty string")
    return errors


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/append_ga_state.py <batch_file.json>")
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
