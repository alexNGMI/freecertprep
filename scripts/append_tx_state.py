"""Append validated Texas state-law questions to the TX state pool.

Usage:
    python scripts/append_tx_state.py scripts/_tx_patch.json

_tx_patch.json is an array of question objects. Each is validated before
write: unique id (vs existing + within batch), recognized domain (the 6
official TREC state-law sections), exactly 4 non-empty string choices,
in-range integer correctAnswer, non-empty explanation, and portion=='state'.
The pool is rewritten with json.dumps(data, indent=2) (ASCII-escaped, no
trailing newline) to match the rest of the question banks.
"""
import json
import sys

POOL = "src/data/real-estate-tx-state-questions.json"

ALLOWED_DOMAINS = {
    "Commission Duties & Powers",
    "Licensing",
    "Standards of Conduct",
    "Agency & Brokerage",
    "Contracts (TREC Forms & Disclosures)",
    "Special Topics (TX)",
}

if len(sys.argv) != 2:
    print("Usage: python scripts/append_tx_state.py <patch.json>")
    sys.exit(1)

with open(POOL, "r", encoding="utf-8") as f:
    data = json.load(f)
with open(sys.argv[1], "r", encoding="utf-8") as f:
    new_qs = json.load(f)

ids = {q["id"] for q in data}
errors = []
for i, q in enumerate(new_qs):
    tag = q.get("id", f"<index {i}>")
    if q.get("id") in ids:
        errors.append(f"{tag}: duplicate id")
    ids.add(q.get("id"))
    if q.get("domain") not in ALLOWED_DOMAINS:
        errors.append(f"{tag}: bad domain {q.get('domain')!r}")
    if q.get("type") != "single-choice":
        errors.append(f"{tag}: type must be single-choice")
    if q.get("portion") != "state":
        errors.append(f"{tag}: portion must be 'state'")
    ch = q.get("choices")
    if not isinstance(ch, list) or len(ch) != 4 or not all(
        isinstance(c, str) and c.strip() for c in ch
    ):
        errors.append(f"{tag}: choices must be 4 non-empty strings")
    ca = q.get("correctAnswer")
    if not isinstance(ca, int) or isinstance(ca, bool) or not (0 <= ca < 4):
        errors.append(f"{tag}: correctAnswer out of range")
    if not (isinstance(q.get("question"), str) and q["question"].strip()):
        errors.append(f"{tag}: empty question")
    if not (isinstance(q.get("explanation"), str) and q["explanation"].strip()):
        errors.append(f"{tag}: empty explanation")

if errors:
    print("REJECTED — no changes written:")
    for e in errors:
        print("  " + e)
    sys.exit(1)

data.extend(new_qs)
with open(POOL, "w", encoding="utf-8") as f:
    f.write(json.dumps(data, indent=2))
print(f"Appended {len(new_qs)} — pool now {len(data)} questions")
