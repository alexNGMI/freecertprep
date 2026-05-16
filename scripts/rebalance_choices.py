"""One-time correctAnswer rebalance for the TX state-law pool.

Single-choice questions were authored with the correct option clustered
at one position. Display order is already Fisher-Yates shuffled per
render in REQuestionCard (so this is invisible to users), but balanced
stored indices are good data hygiene. This deterministically permutes
each question's `choices` and remaps `correctAnswer` so correctness is
preserved and the 0-3 distribution is roughly uniform.

Deterministic: the per-question RNG is seeded from the question id, so
re-running is idempotent and reviewable.

Usage: python scripts/rebalance_choices.py src/data/real-estate-tx-state-questions.json
"""
import json
import random
import sys
import collections

path = sys.argv[1]
data = json.load(open(path, encoding="utf-8"))

for q in data:
    if q.get("type", "single-choice") != "single-choice":
        continue
    choices = q["choices"]
    correct = choices[q["correctAnswer"]]
    order = list(range(len(choices)))
    random.Random(q["id"]).shuffle(order)
    new_choices = [choices[i] for i in order]
    q["choices"] = new_choices
    q["correctAnswer"] = new_choices.index(correct)

with open(path, "w", encoding="utf-8") as f:
    f.write(json.dumps(data, indent=2))

dist = dict(sorted(collections.Counter(
    q["correctAnswer"] for q in data
    if q.get("type", "single-choice") == "single-choice"
).items()))
print(f"Rebalanced {len(data)} questions; correctAnswer distribution: {dist}")
