# Experiment 06: Agent Teams

## Goal
Learn Claude Code's native Agent Teams feature for coordinating multiple Claude instances that communicate with each other. This is the official multi-agent pattern — one lead orchestrates multiple teammates.

## Prerequisites
- Complete Experiment 05 (headless mode)
- Agent Teams is experimental: enable `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` in settings or environment

## Setup
```bash
# Enable agent teams (add to your shell profile or run per-session)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

## Important: Agent Teams vs Custom Agents
Agent Teams is **experimental** (requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) and **token-intensive**. For most daily multi-agent work, [Custom Agents (Experiment 04)](../04-custom-agents/) are more practical — they require no setup, use less tokens, and handle 90% of delegation use cases.

Use Agent Teams when you need:
- Multiple agents working **simultaneously** on **different parts** of a codebase
- Complex workflows with **task dependencies** (DAGs)
- **Inter-agent communication** (agents messaging each other)
- **Parallel execution** at scale (4+ agents)

## How Agent Teams Work

```
┌─────────────────────────────────────┐
│          LEAD (your session)        │
│  - Creates team & tasks             │
│  - Assigns work                     │
│  - Synthesizes results              │
├──────┬──────────┬───────────────────┤
│      │          │                   │
▼      ▼          ▼                   │
Teammate A  Teammate B  Teammate C    │
(own context) (own context) (own ctx) │
│      │          │                   │
└──────┴──────────┴───────────────────┘
       Results flow back to lead
```

**Key concepts:**
- **Lead**: Your interactive session. Creates the team, defines tasks, coordinates.
- **Teammates**: Independent Claude Code instances, each with their own context window.
- **Tasks**: Work items with dependencies (DAG). Teammates self-claim available tasks.
- **Messages**: Teammates can message each other and the lead directly.

## Exercises

### Exercise 1: Basic team spawn
In your Claude Code session:
```
Create a team called "sandbox-test" with two teammates:
- "researcher" who investigates the experiments/ directory structure
- "documenter" who checks if all experiments have complete READMEs

Have them report their findings back to you.
```

### Exercise 2: Competing hypotheses pattern
```
I want to understand the best way to structure MCP servers. 
Spawn 3 teammates:
- One advocates for a simple JSON file-based approach
- One advocates for SQLite
- One advocates for Supabase

Have them debate each other and report the consensus.
```

### Exercise 3: Pipeline pattern (sequential handoff)
```
Create a team with a pipeline workflow:
1. "architect" designs a simple REST API spec (3 endpoints)
2. "implementer" (blocked by architect) builds it
3. "tester" (blocked by implementer) writes and runs tests
4. "reviewer" (blocked by tester) does a final code review

Use the experiments/06-agent-teams/ directory for all output.
```

### Exercise 4: Fan-out/fan-in
```
I need to analyze this entire sandbox repo. Create a team:
- Spawn 4 teammates, each responsible for one experiments/ subfolder
- Each teammate analyzes their folder and writes a summary
- Once all complete, synthesize their findings into a single report
```

## Tasks: The Coordination Mechanism

Agent Teams coordinate through the **Tasks** system — persistent task lists with DAG dependencies.

### How it works
1. The **lead** creates a task list with dependencies
2. **Teammates** self-claim available (unblocked) tasks
3. When a task completes, dependent tasks **automatically unblock**
4. Teammates pick up newly unblocked tasks without being told

### Sharing a task list with `CLAUDE_CODE_TASK_LIST_ID`
All agents in a team point at the same task list via the `CLAUDE_CODE_TASK_LIST_ID` environment variable:

```bash
# All sessions share this task list
export CLAUDE_CODE_TASK_LIST_ID=my-team-tasks
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Session A (lead): creates tasks
claude

# Session B (teammate): picks up available tasks
claude

# Session C (teammate): picks up available tasks
claude
```

### Writer/Reviewer pattern
A powerful real-world pattern using tasks:

1. **Writer agent** picks up Task #1 ("Implement auth middleware"), marks complete
2. **Reviewer agent** sees Task #2 ("Review auth middleware") is now unblocked
3. Reviewer works in a **clean context** — no implementation details polluting its review
4. If review fails, a new task is created blocking the next phase

This separation of concerns is why tasks + teams beat single-session workflows for complex projects.

## Git Worktree Isolation

### `--worktree` flag
Start a session in an isolated git worktree:

```bash
# Teammate works in its own copy of the repo
claude --worktree
```

### `isolation: worktree` in agent definitions
Custom Agents used as teammates can specify worktree isolation:

```yaml
---
name: implementer
description: Implements code changes from plans
isolation: worktree
---
```

This prevents teammates from conflicting with each other's file changes. Each works on its own branch and merges when complete.

## Team-Specific Hook Events

Two hook events fire specifically for Agent Teams:

| Hook | When it fires | Use case |
|------|--------------|----------|
| `TeammateIdle` | When a teammate is about to go idle (no tasks left) | Assign more work, keep agents busy |
| `TaskCompleted` | When a task is marked complete | Verify quality before accepting, trigger next phase |

Example: Auto-verify before accepting a task:
```json
{
  "hooks": {
    "TaskCompleted": [{
      "hooks": [{
        "type": "command",
        "command": "npm test 2>&1 | tail -5 || (echo 'Tests failed — rejecting task completion' && exit 2)"
      }]
    }]
  }
}
```

## Architecture Patterns

| Pattern | Use When | Example |
|---------|----------|---------|
| **Fan-out** | Embarrassingly parallel work | Reviewing 5 different files |
| **Pipeline** | Sequential with handoffs | Design → Build → Test → Review |
| **Debate** | Need diverse perspectives | Architecture decisions |
| **Watchdog** | Critical operations needing safety | Production deployments |

## Key Learnings
- [ ] Can spawn and coordinate agent teams
- [ ] Understand task dependencies (DAG) and the Tasks system
- [ ] Know how to share tasks with `CLAUDE_CODE_TASK_LIST_ID`
- [ ] Teammates self-claim tasks from queue
- [ ] Messages enable inter-agent communication
- [ ] Understand `--worktree` and `isolation: worktree` for git isolation
- [ ] Know the `TeammateIdle` and `TaskCompleted` hook events
- [ ] Can implement the Writer/Reviewer pattern
- [ ] Know when teams add value vs. single session or Custom Agents
- [ ] Understand the fan-out, pipeline, and debate patterns

## Gotchas
- **Experimental**: Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- **Token-intensive**: Agent teams use significantly more tokens than single sessions — for most daily work, [Custom Agents](../04-custom-agents/) are more practical
- Teammates don't inherit the lead's conversation history
- Teammates DO load CLAUDE.md, MCP servers, and skills automatically
- Use `cleanup` through the lead after shutting down teammates
- Don't use teams for sequential, same-file work — single session is better
- Use `--worktree` to prevent file conflicts between teammates

## Resources
- [Agent Teams docs](https://code.claude.com/docs/en/agent-teams)
- [Tasks system](https://docs.anthropic.com/en/docs/claude-code/tasks)
