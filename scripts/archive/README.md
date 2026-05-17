# Applied content batches

This folder holds JSON batch files that were already applied to canonical
question banks.

- `ga_batch_01.json` through `ga_batch_08.json` -> `src/data/real-estate-ga-state-questions.json`
- `tf_batch_01.json` through `tf_batch_12.json` -> `src/data/terraform-associate-questions.json`
- `_me_patch.json` -> final Maine batch (`re-me-351` through `re-me-400`) in `src/data/real-estate-me-state-questions.json`

Keep these as provenance and recovery material. The app reads from the
question files in `src/data`, not from this archive.
