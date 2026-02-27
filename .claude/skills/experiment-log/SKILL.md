---
name: experiment-log
description: Log experiment results and learnings. Use when finishing an experiment, documenting what worked/failed, or updating experiment status.
---

When logging experiment results:

1. Find the experiment's README.md in its folder under `experiments/`
2. Update the "## Key Learnings" section with checked items for what was learned
3. Add a new section "## Results" if it doesn't exist, with:
   - Date completed
   - What worked
   - What didn't work
   - Unexpected discoveries
   - Next steps or follow-up experiments
4. Create or append to `logs/experiment-log.md` with a one-liner summary:
   ```
   YYYY-MM-DD | Experiment XX: <name> | <one-line result summary>
   ```
5. If the experiment revealed something that should change the root CLAUDE.md, suggest the update
