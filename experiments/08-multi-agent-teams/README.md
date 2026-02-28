# Experiment 08: Multi-Agent Teams

## Goal

Orchestrate multiple Claude instances working together and learn to run Claude from scripts. You'll spawn agent teams, coordinate with task dependencies, and use headless mode to automate Claude from bash.

## Time Estimate

~1-2 hours

---

## Agent Teams vs Custom Agents

You built custom agents in [Experiment 05](../05-custom-agents/). Those are your daily workhorse — Claude delegates to specialists automatically. Agent Teams are different:

| | Custom Agents | Agent Teams |
|---|--------------|-------------|
| **What** | Single agents delegated to | Multiple agents working in parallel |
| **Communication** | Results flow back to you | Agents coordinate via shared tasks |
| **When to use** | Daily task delegation | Complex parallel problems |
| **Cost** | One agent's tokens | Multiple agents' tokens |

**Use custom agents for 90% of work.** Agent teams are for genuinely parallel problems.

---

## How Agent Teams Work

Agent Teams is experimental. Enable it:

```bash
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 claude
```

### The model

1. **Lead session** — your main Claude Code session. Creates the team and defines tasks.
2. **Teammates** — independent Claude instances with their own context windows.
3. **Tasks** — the coordination mechanism. A shared task list (DAG) that all teammates read and update.

### Spawning a team

```
Create a team of 2 agents:
- Researcher: reads and analyzes files, produces a summary
- Builder: takes the summary and creates something from it

The builder waits for the researcher to finish.
```

---

## Headless Mode: Scripting Claude

Run Claude non-interactively from scripts. Useful for automation, batch processing, and CI/CD.

### Basic usage

```bash
# Run a single prompt
claude -p "Analyze the CLAUDE.md and summarize the project structure"

# Structured output
claude -p "List all experiment folders and their topics" --output-format json

# Pipe input
cat README.md | claude -p "Summarize this document in 3 bullet points"
```

### Parallel agents from bash

```bash
#!/bin/bash
echo "Starting parallel analysis..."

claude -p "Read experiments 00-03 and list key concepts taught" > /tmp/part1.txt &
claude -p "Read experiments 04-06 and list key concepts taught" > /tmp/part2.txt &
claude -p "Read experiments 07-09 and list key concepts taught" > /tmp/part3.txt &

wait
echo "Done. Results in /tmp/part*.txt"
```

### Chaining calls

```bash
# First call analyzes
ANALYSIS=$(claude -p "Read the experiment READMEs and find gaps in coverage" --output-format text)

# Second call acts on the analysis
claude -p "Based on this analysis, suggest improvements: $ANALYSIS"
```

---

## Exercises

### Exercise 1: Simple 2-Agent Team

```bash
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 claude
```

```
Create a team of 2 agents:
1. Researcher: Read all experiment READMEs and produce a summary of what
   topics are covered and what hands-on projects get built
2. Writer: Take the researcher's findings and create a "What You'll Build"
   guide at experiments/08-multi-agent-teams/build-guide.md

The writer depends on the researcher finishing first.
```

### Exercise 2: Headless Parallel Analysis

Create and run a script:

```
Create a bash script at experiments/08-multi-agent-teams/parallel-analysis.sh
that runs 3 Claude instances in parallel:
1. One analyzes the first 3 experiments and summarizes them
2. One analyzes the middle 3 experiments
3. One analyzes the last 4 experiments

Each writes to a separate output file. The script waits for all to finish
then combines results into a single summary.
```

### Exercise 3: Build Something with a Team

```
Create a team to build a dashboard:

Agent 1 (Designer): Design the layout and color scheme for a project
  dashboard that shows experiment progress. Output a design spec as markdown.

Agent 2 (Builder): Take the design spec and build the dashboard as a
  single HTML file at experiments/08-multi-agent-teams/dashboard/index.html.

Agent 2 waits for Agent 1.
```

---

## Key Learnings

- [ ] Spawned a multi-agent team with task dependencies
- [ ] Used headless mode to run Claude from a bash script
- [ ] Ran multiple Claude instances in parallel
- [ ] Built a working project (dashboard) using agent coordination

## Resources

- [Agent Teams Documentation](https://docs.anthropic.com/en/docs/claude-code/agent-teams)
- [Headless Mode](https://docs.anthropic.com/en/docs/claude-code/cli-usage#non-interactive-mode)
- [Tasks and DAGs](https://docs.anthropic.com/en/docs/claude-code/tasks)
