---
description: Scaffold a new experiment folder with README, starter code, and test file
allowed-tools: Read, Write, Bash
---

Create a new experiment in the `experiments/` directory. The experiment name is: $ARGUMENTS

Follow these steps:
1. Determine the next experiment number by checking existing folders in `experiments/`
2. Create the folder: `experiments/XX-<name>/`
3. Create a `README.md` with this template:

```markdown
# Experiment XX: <Name>

## Goal
What are we testing?

## Setup
How to run this experiment.

## Key Learnings
- [ ] Document what worked
- [ ] Document what didn't
- [ ] Note any gotchas

## Resources
- Links to relevant docs
```

4. Create a starter `index.ts` file with a basic scaffold relevant to the experiment type
5. Create a `*.test.ts` file with a placeholder test
6. Update the root CLAUDE.md project structure if needed
