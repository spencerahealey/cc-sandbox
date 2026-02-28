---
description: Show the current status of all experiments in the sandbox
allowed-tools: Read, Grep, Glob, Bash
---

Scan all experiment directories under `experiments/` and generate a status report:

1. List each experiment folder with its name
2. Check if it has a README.md
3. Look for "## Key Learnings" in each README and check if any items are checked off

The experiments are:
- 00-getting-started
- 01-steering-claude-code
- 02-debugging-and-fixing
- 03-claude-md-mastery
- 04-context-and-memory
- 05-custom-agents
- 06-skills-and-commands
- 07-connecting-external-tools
- 08-multi-agent-teams
- 09-putting-it-all-together

Output a clean summary table showing:
- Experiment number and name
- Status: Not Started | In Progress | Complete
- Learnings documented: Yes/No
