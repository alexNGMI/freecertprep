"""Dump questions missing an explanation, in id order, for authoring.

Usage:
    python scripts/dump_missing.py <questions.json> <start> <count>

Prints a compact, type-aware view (id, domain, type, question, choices/
items with the correct answer marked) for the Nth..N+count slice of
questions that currently lack a non-empty explanation.
"""
import json
import sys

path, start, count = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
data = json.load(open(path, encoding="utf-8"))

missing = [
    q for q in data
    if not (isinstance(q.get("explanation"), str) and q["explanation"].strip())
]
chunk = missing[start:start + count]
print(f"# missing total={len(missing)} showing [{start}:{start+len(chunk)}]")
for q in chunk:
    t = q.get("type", "single-choice")
    print(f"\n{q['id']} [{q['domain']}] <{t}>")
    print(f"Q: {q['question']}")
    if t == "single-choice":
        for i, c in enumerate(q["choices"]):
            print(f"  {'*' if i == q['correctAnswer'] else ' '}{chr(65+i)}) {c}")
    elif t == "multiple-response":
        for i, c in enumerate(q["choices"]):
            print(f"  {'*' if i in q['correctAnswers'] else ' '}{chr(65+i)}) {c}")
    elif t == "statement-block":
        for i, s in enumerate(q["statements"]):
            print(f"  [{ 'T' if q['correctAnswers'][i] else 'F' }] {s}")
    elif t == "ordering":
        order = q["correctOrder"]
        for pos, idx in enumerate(order):
            print(f"  {pos+1}. {q['items'][idx]}")
    elif t == "matching":
        for li, l in enumerate(q["itemsLeft"]):
            r = q["correctMatches"][li]
            print(f"  {l}  ->  {q['itemsRight'][r]}")
