"""Backfill `explanation` onto questions by id.

Usage:
    python scripts/apply_explanations.py <questions.json> <patch.json>

patch.json is a flat object: { "<questionId>": "<explanation>", ... }.
Only ids present in the patch are written; `explanation` is set as the
last key on the object (after correctAnswer), matching the rest of the
pool. The file is rewritten with `json.dumps(data, indent=2)` (ASCII-
escaped, no trailing newline) to exactly match the existing pool format,
so the diff is limited to the changed objects.
"""
import json
import sys

if len(sys.argv) != 3:
    print("Usage: python scripts/apply_explanations.py <questions.json> <patch.json>")
    sys.exit(1)

questions_path, patch_path = sys.argv[1], sys.argv[2]

with open(questions_path, "r", encoding="utf-8") as f:
    data = json.load(f)
with open(patch_path, "r", encoding="utf-8") as f:
    patch = json.load(f)

by_id = {q["id"]: q for q in data}

applied = 0
missing = []
for qid, explanation in patch.items():
    q = by_id.get(qid)
    if q is None:
        missing.append(qid)
        continue
    if not isinstance(explanation, str) or not explanation.strip():
        print(f"Refusing empty explanation for {qid}")
        sys.exit(1)
    q["explanation"] = explanation
    applied += 1

if missing:
    print(f"Unknown ids (not written): {', '.join(missing)}")
    sys.exit(1)

with open(questions_path, "w", encoding="utf-8") as f:
    f.write(json.dumps(data, indent=2))

print(f"Applied {applied} explanations to {questions_path}")
