# NVIDIA Associate Content Audit

Date: 2026-05-17

## Sources checked

- NVIDIA AI Infrastructure and Operations Associate: https://www.nvidia.com/en-us/learn/certification/ai-infrastructure-operations-associate/
- NVIDIA Generative AI LLMs Associate: https://www.nvidia.com/en-us/learn/certification/generative-ai-llm-associate/

## NCA-AIIO

Official exam details:

- Title/code: NVIDIA-Certified Associate: AI Infrastructure and Operations (NCA-AIIO)
- Duration/questions: 1 hour, 50 questions
- Official blueprint weights:
  - Essential AI Knowledge: 38%
  - AI Infrastructure: 40%
  - AI Operations: 22%

Local registry:

- Title/code, exam length, and official domain weights are aligned.
- Source pool contains 336 questions.
- Source pool domain counts:
  - AI Infrastructure: 134
  - Essential AI Knowledge: 128
  - AI Operations: 74

Audit notes:

- The source pool now follows the official 40 / 38 / 22 blueprint closely enough for the current 336-question size.
- Added 30 Essential AI Knowledge questions covering model lifecycle, training vs. inference, metrics, data quality, model monitoring, drift, embeddings, prompt engineering, RAG, CUDA/framework context, batch vs. online inference, and model registries.
- Reclassified software-stack fundamentals from AI Operations into Essential AI Knowledge, and moved hardware/data-center fundamentals into AI Infrastructure. AI Operations is now reserved for production monitoring, scheduling, lifecycle, troubleshooting, and management topics.
- Replaced three duplicate stems with new questions covering scheduler preemption, lossless/congestion-controlled fabrics, and high-throughput shared storage.
- Single-choice `correctAnswer` positions were rebalanced from a heavily clustered source distribution to `{0: 63, 1: 63, 2: 63, 3: 62}` while preserving correctness.

## NCA-GENL

Official exam details:

- Title/code: NVIDIA-Certified Associate: Generative AI LLMs (NCA-GENL)
- Duration/questions: 1 hour, 50-60 multiple-choice questions
- Subject: Generative AI and large language models
- Official blueprint weights:
  - Core Machine Learning and AI Knowledge: 30%
  - Software Development: 24%
  - Experimentation: 22%
  - Data Analysis and Visualization: 14%
  - Trustworthy AI: 10%

Local registry/content:

- Renamed from `NVIDIA Generalist AI` to `NVIDIA Generative AI LLMs` to match NVIDIA's current certification name.
- Source pool contains 330 questions.
- Current source pool domains now match NVIDIA's official blueprint:
  - Core Machine Learning and AI Knowledge: 99
  - Software Development: 79
  - Experimentation: 73
  - Data Analysis and Visualization: 46
  - Trustworthy AI: 33

Audit notes:

- The pool is directionally aligned with the current NCA-GENL subject and includes transformer fundamentals, prompt engineering, RAG, deployment, NVIDIA inference tools, GPU infrastructure, and model adaptation.
- The registry domains now use NVIDIA's five official blueprint categories and weights.
- Added a 30-question batch for Trustworthy AI, data analysis/visualization, experimentation, and software-development workflows.
- Replaced four duplicate stems with adjacent questions covering DPO experiment tradeoffs, chunk overlap, hybrid search, and RAG answer faithfulness.
- Single-choice `correctAnswer` positions were rebalanced from a clustered source distribution to `{0: 65, 1: 65, 2: 65, 3: 65}` while preserving correctness.

## Recommended Next Batch

1. Perform a second-pass editorial read of the new NCA-GENL official-domain pool for duplicate stems and overly broad infrastructure questions.
2. Add more NCA-GENL Python/data-science workflow questions if the pool feels too LLM-infrastructure heavy after the editorial read.
3. Revisit NCA-AIIO only if NVIDIA changes the associate blueprint or publishes more granular subobjective weights.
