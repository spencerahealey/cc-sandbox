# Experiment 05: Headless Mode

## Goal
Learn to run Claude Code programmatically via `claude -p` (headless mode). This is the foundation for all multi-agent patterns — you can't orchestrate agents if you can't run them non-interactively.

## What is Headless Mode?
Claude Code's `-p` flag runs a single prompt without the interactive REPL. It reads from stdin or a string, does its work, and exits. This lets you:
- Script Claude Code into bash pipelines
- Run it from CI/CD
- Chain multiple Claude instances together
- Build automation workflows

## Exercises

### Exercise 1: Basic headless execution
```bash
# Simple one-shot prompt
claude -p "List all TypeScript files in this repo"

# With specific model
claude -p --model sonnet "Explain what CLAUDE.md does in 2 sentences"

# Pipe input
echo "What does this function do?" | claude -p

# Output to file
claude -p "Generate a utility function that formats dates" > shared/date-utils.ts
```

### Exercise 2: Chaining headless calls
```bash
# Agent 1: Generate code → Agent 2: Review it
claude -p "Write a function that validates email addresses" > temp_code.ts
claude -p "Review this code for bugs and edge cases: $(cat temp_code.ts)"
```

### Exercise 3: Parallel execution
```bash
# Run 3 agents simultaneously
claude -p "Analyze experiments/05-headless-mode/ for code quality" &
claude -p "Check if all experiments have README files" &
claude -p "List any TODO comments in the codebase" &
wait
echo "All agents complete"
```

### Exercise 4: Headless with JSON output
```bash
# Structured output for programmatic use
claude -p --output-format json "List all files in experiments/ with their sizes"
```

### Exercise 5: Headless with allowed tools
```bash
# Restrict what the agent can do
claude -p --allowedTools "Read,Grep,Glob" "Find all TODO comments in this repo"
```

## Key Learnings
- [ ] Can run Claude Code non-interactively with `-p`
- [ ] Can chain headless calls for multi-step workflows
- [ ] Can run parallel agents with `&` and `wait`
- [ ] Understand `--output-format json` for structured output
- [ ] Understand `--allowedTools` for least-privilege execution

## Resources
- [Claude Code CLI reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference)
- [Headless mode docs](https://docs.anthropic.com/en/docs/claude-code/headless-mode)
