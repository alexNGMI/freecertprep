# Network+ Personal Learning Loop

Implemented: June 15, 2026

## Purpose

The Network+ learning loop turns the existing question bank, objective metadata, and local performance history into an ordered study workflow:

1. diagnostic assessment;
2. objective mastery map;
3. personal study plan;
4. full-exam debrief;
5. case-based practice.

The first version remains local-first. It does not require an account, backend, AI service, or vendor-score conversion.

## Diagnostic

- Route: `/comptia-net-plus/learning/diagnostic`
- Form size: 35 questions.
- Coverage rule: at least one question from every available N10-009 objective, with remaining positions sampled from the wider pool.
- Delivery: no correctness feedback or explanations before submission.
- Storage: saved as a diagnostic quiz session and merged into the existing per-question statistics.

The diagnostic is a baseline measurement, not a shortened pass/fail exam. Unanswered or untouched objectives remain `Not measured`.

## Mastery Model

The mastery map uses the existing question-level attempt history and reports accuracy, pool coverage, evidence confidence, recency, and one of `Strong`, `Developing`, `Weak`, or `Not measured`.

An objective cannot become Strong from one correct answer. Strong requires at least three distinct attempted questions, at least 80% accuracy, and reasonably current evidence. Evidence older than 30 days receives a small recency penalty.

These labels are study guidance, not psychometric certification scores.

## Personal Plan

The learner can generate a 7-, 14-, or 30-day plan. The deterministic priority order is weak objectives, developing objectives, and then unmeasured objectives. Strong objectives are omitted until the remaining work is addressed.

Plan blocks link directly to objective practice, applied cases, or a final diagnostic checkpoint. The plan is regenerated from current evidence, so completed work changes the next recommendation.

## Exam Debrief

Network+ full-exam results now identify how many objectives the form measured, the three objectives responsible for the most misses, applied-format misses, and direct repair actions.

The existing readiness percentage remains explicitly separate from CompTIA's confidential scaled scoring.

## Case Practice

- Route: `/comptia-net-plus/learning/cases`
- Block size: 10.
- Eligible formats: CLI output, topology scenarios, configuration repair, subnetting drills, matching, PBQ matching, and questions carrying a practical category.
- Feedback: immediate, using the existing structured explanations and component-level scoring.

Case results feed the same question statistics and objective mastery evidence as other practice modes.

## Future Improvements

- Persist a dated diagnostic history separate from general quiz history.
- Add plan completion checkmarks after active-session persistence is introduced.
- Build multi-stage cases that reuse one topology across several linked decisions.
- Add optional external study-resource links at the objective level.
- Validate mastery thresholds against real learner outcomes once enough voluntary data exists.
- Sync plans across devices only after local data durability and account architecture are ready.
