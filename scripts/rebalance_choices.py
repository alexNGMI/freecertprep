"""Deterministically rebalance correctAnswer positions in a question pool.

Some banks were authored with the correct option clustered at one
position. Display order is already shuffled per render, but balanced
stored indices are good data hygiene. This deterministically permutes
each single-choice question's `choices` and remaps `correctAnswer` so
correctness is preserved and the 0-3 distribution is roughly uniform.

Deterministic and idempotent: choices are canonicalized by text before
ordering, and target correct-answer positions are assigned from a stable
hash ordering of question ids.

Usage: python scripts/rebalance_choices.py src/data/nca-genl-questions.json
"""
import collections
import hashlib
import json
import random
import sys

path = sys.argv[1]
data = json.load(open(path, encoding="utf-8"))

single_choice = [
    q for q in data
    if q.get("type", "single-choice") == "single-choice"
]

by_choice_count = collections.defaultdict(list)
for q in single_choice:
    by_choice_count[len(q["choices"])].append(q)


def stable_key(value):
    return hashlib.sha256(str(value).encode("utf-8")).hexdigest()


for choice_count, questions in by_choice_count.items():
    ordered = sorted(questions, key=lambda q: stable_key(q["id"]))
    for rank, q in enumerate(ordered):
        choices = q["choices"]
        correct = choices[q["correctAnswer"]]
        canonical = sorted(choices)
        distractors = [c for c in canonical if c != correct]
        random.Random(stable_key(q["id"])).shuffle(distractors)
        target_position = rank % choice_count
        new_choices = distractors[:]
        new_choices.insert(target_position, correct)
        q["choices"] = new_choices
        q["correctAnswer"] = target_position

with open(path, "w", encoding="utf-8") as f:
    f.write(json.dumps(data, indent=2))

dist = dict(sorted(collections.Counter(
    q["correctAnswer"] for q in data
    if q.get("type", "single-choice") == "single-choice"
).items()))
print(f"Rebalanced {len(data)} questions; correctAnswer distribution: {dist}")
