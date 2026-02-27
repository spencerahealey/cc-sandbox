---
description: Show the current status of all experiments in the sandbox
allowed-tools: Read, Grep, Glob, Bash
---

Scan all experiment directories under `experiments/` and generate a status report:

1. List each experiment folder with its name
2. Check if it has a README.md (started vs not started)
3. Check if there are any `.ts` or `.js` files (has code)
4. Check if there are test files and if tests pass (`npx jest --passWithNoTests` in each dir)
5. Look for "## Key Learnings" in each README and check if any items are checked off

Output a clean summary table showing:
- Experiment number and name
- Status: Not Started | In Progress | Complete
- Has tests: Yes/No
- Learnings documented: Yes/No
