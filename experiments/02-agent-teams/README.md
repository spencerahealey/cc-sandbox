# Experiment 02: Agent Teams

## Goal
Learn Claude Code's native Agent Teams feature for coordinating multiple Claude instances that communicate with each other. This is the official multi-agent pattern — one lead orchestrates multiple teammates.

## Prerequisites
- Complete Experiment 01 (headless mode)
- Agent Teams is experimental: enable `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` in settings or environment

## Setup
```bash
# Enable agent teams (add to your shell profile or run per-session)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

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

Use the experiments/02-agent-teams/ directory for all output.
```

### Exercise 4: Fan-out/fan-in
```
I need to analyze this entire sandbox repo. Create a team:
- Spawn 4 teammates, each responsible for one experiments/ subfolder
- Each teammate analyzes their folder and writes a summary
- Once all complete, synthesize their findings into a single report
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
- [ ] Understand task dependencies (DAG)
- [ ] Teammates self-claim tasks from queue
- [ ] Messages enable inter-agent communication
- [ ] Know when teams add value vs. single session overhead
- [ ] Understand the fan-out, pipeline, and debate patterns

## Gotchas
- Agent teams use significantly more tokens than single sessions
- Teammates don't inherit the lead's conversation history
- Teammates DO load CLAUDE.md, MCP servers, and skills automatically
- Use `cleanup` through the lead after shutting down teammates
- Don't use teams for sequential, same-file work — single session is better

## Resources
- [Agent Teams docs](https://code.claude.com/docs/en/agent-teams)
- [Tasks system](https://docs.anthropic.com/en/docs/claude-code/tasks)
