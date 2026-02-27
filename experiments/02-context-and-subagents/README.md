# Experiment 02: Context Window Management & Subagents

## Goal
Understand how Claude Code's context window works, learn to manage it effectively, and master subagents — isolated Claude instances that handle focused tasks without bloating your main session.

## Why Context Management Matters
Claude Code has a finite context window (the amount of text it can "see" at once). Every file it reads, every command it runs, every response it gives — all of it fills up the window. When it fills up:
- Claude starts forgetting earlier parts of the conversation
- Responses get less accurate
- Claude may "hallucinate" things from earlier context

Managing context is the difference between a productive 2-hour session and one that degrades after 20 minutes.

## How Context Fills Up

### What consumes context
| Action | Context cost |
|--------|-------------|
| Reading a large file | High — entire file content enters context |
| Running a command with verbose output | High — all stdout enters context |
| Multi-turn conversation | Medium — each turn accumulates |
| Claude's own responses | Medium — its reasoning takes space too |
| CLAUDE.md + system prompts | Low-medium — loaded once at start |

### Reading the token counter
In an interactive session, the token usage shows at the bottom of the screen. Watch it grow as you work. Key thresholds:
- **< 50%**: Plenty of room. Work freely.
- **50-80%**: Getting full. Consider `/compact` soon.
- **> 80%**: Context pressure. Claude may start losing track. `/compact` or `/clear`.

## Context Management Commands

### `/compact` — Compress without losing continuity
```
/compact
```
What it does:
- Summarizes the entire conversation into a condensed form
- Claude retains the key facts, decisions, and current task
- Frees up significant context space
- You continue working as if nothing changed

When to use it:
- Token counter is above 50-60%
- You've been reading many files
- Claude starts repeating itself or forgetting earlier decisions
- Before starting a new phase of work in the same session

You can also provide a focus hint:
```
/compact focus on the auth refactoring we discussed
```

### `/clear` — Full reset
```
/clear
```
What it does:
- Wipes the entire conversation
- Claude starts with zero context (except CLAUDE.md)
- Like opening a fresh terminal tab

When to use it:
- Switching to a completely different task
- Session has gone off the rails
- You want a clean start with no accumulated confusion

### `/rewind` — Undo code changes
```
/rewind
```
What it does:
- Rolls back code changes Claude made by rewinding the conversation
- Undoes file edits, new files, and command side effects
- Essential escape hatch when Claude goes down the wrong path

When to use it:
- Claude made changes you don't want
- An approach isn't working and you want to try a different one
- You want to undo the last few steps without losing the entire conversation

This is different from `/clear` — `/rewind` undoes *code changes* while keeping conversation context. `/clear` wipes the conversation but doesn't touch files.

### Session Management: `--continue` and `--resume`
You don't have to lose context when you close your terminal:

```bash
# Pick up the LAST session exactly where you left off
claude --continue

# Resume a SPECIFIC session by its ID
claude --resume SESSION_ID
```

`--continue` is for "I just closed my terminal and want to keep going." `--resume` is for "I want to go back to that specific session from yesterday."

Sessions persist automatically — you don't need to save them.

### Automatic compaction
Claude Code automatically compacts when context gets critically full. You'll see a message when this happens. It's better to compact proactively than to let auto-compaction happen — you get to choose what's preserved.

## Auto-Memory

### What is auto-memory?
Claude Code automatically records and recalls useful context across sessions. When Claude learns something important about your project — a convention, a gotcha, a preference — it can save that as a memory and recall it in future sessions.

This means Claude gets smarter about your project the more you use it. No manual setup required.

### Managing memories with `/memory`
```
/memory
```

This shows all auto-memories Claude has saved. You can:
- **View** what Claude has remembered
- **Edit** memories that are wrong or outdated
- **Delete** memories you don't want persisted

Memories are stored in `~/.claude/` and loaded automatically at the start of each session (in addition to CLAUDE.md).

### How auto-memory differs from CLAUDE.md
| | Auto-Memory | CLAUDE.md |
|---|------------|-----------|
| **Who writes it** | Claude (automatically) | You (manually) |
| **What it stores** | Session learnings, corrections, preferences | Project structure, conventions, commands |
| **Scope** | Per-user (follows you across projects) | Per-project (checked into the repo) |
| **When it loads** | Every session start | When Claude enters a directory with CLAUDE.md |

Use both: CLAUDE.md for project facts, auto-memory for personal workflow learnings.

## Tasks

### What are Tasks?
Tasks are persistent task lists with DAG (directed acyclic graph) dependencies. They survive across sessions and are the coordination mechanism for multi-agent workflows.

Tasks replaced the old todo system. Key differences:
- Tasks have **dependencies** — Task B can be blocked by Task A
- Tasks have **status** — `pending`, `in_progress`, `completed`
- Tasks **persist** across sessions — resume where you left off
- Tasks can be **shared** between agents via `CLAUDE_CODE_TASK_LIST_ID`

### Creating and managing tasks
```
Create a task list for refactoring the auth module:
1. Audit current auth code
2. Design new auth flow (blocked by: audit)
3. Implement new flow (blocked by: design)
4. Write tests (blocked by: implement)
5. Update docs (blocked by: tests)
```

Claude will create a proper task DAG. Tasks auto-unblock as their dependencies complete.

### Sharing tasks between agents
The `CLAUDE_CODE_TASK_LIST_ID` environment variable points multiple Claude sessions at the same task list:

```bash
# Session A and Session B share the same task list
export CLAUDE_CODE_TASK_LIST_ID=my-shared-task-list

# Session A picks up Task #1, marks complete
# Session B sees Task #2 unblocked, begins work
```

This is how Agent Teams (Experiment 06) coordinate — but you can use tasks in any multi-session workflow.

## Subagents and Custom Agents

### What are subagents?
Subagents are isolated Claude instances that Claude spins up to handle focused tasks. They:
- Get their own separate context window
- Can't see your main conversation
- Do their work and report back a summary
- Don't pollute your main context with intermediate steps

Think of it like delegating to a colleague: "Go figure out X and come back with the answer" — rather than doing all the research in your current conversation.

### When Claude uses subagents automatically
Claude Code creates subagents for tasks like:
- Searching across many files (the Explore agent)
- Planning complex implementations (the Plan agent)
- Running parallel investigations

You'll see messages like "Launching explore agent..." in your session.

### When to encourage subagent use
Prompt Claude to use subagents for:
- **Research tasks**: "Search the codebase for all API endpoints" (uses Explore agent)
- **Planning**: "Plan how to refactor the auth module" (uses Plan agent)
- **Parallel work**: "Investigate these 3 bugs simultaneously"

### Custom Agents with `.claude/agents/`
You can define reusable agent configurations as markdown files. Create a file in `.claude/agents/`:

```markdown
<!-- .claude/agents/code-reviewer.md -->
---
name: code-reviewer
description: Reviews code for bugs, security issues, and maintainability
model: sonnet
---

You are a code review specialist. When given code to review, you:
1. Check for bugs and edge cases
2. Evaluate error handling
3. Look for security issues (OWASP top 10)
4. Assess readability and maintainability
5. Suggest specific improvements with code examples

Be concise. Focus on issues that matter, not style nitpicks.
```

Claude auto-delegates to custom agents based on their description — or you can invoke them explicitly:
```
@code-reviewer Review the changes I just made to shared/utils.ts
```

Custom Agents are covered in depth in [Experiment 04](../04-custom-agents/).

### The explore-in-plan-mode pattern
A powerful pattern for complex tasks:

1. **Enter plan mode**: Ask Claude to plan before implementing
2. **Claude spawns explore agents**: These search the codebase in parallel
3. **Agents report back**: Claude gets summaries, not raw file contents
4. **Plan is built from summaries**: Your main context stays clean
5. **Implementation starts**: With a solid plan and a clean context

```
Plan how to add authentication to this project. Explore the codebase first to understand the current architecture, then propose an approach.
```

This naturally triggers subagent use and keeps your main context lean.

## Exercises

### Exercise 1: Watch context fill up
Start a session and deliberately fill context to see the effects:

```bash
claude
```

```
Read every README.md in the experiments/ folder and summarize each one.
```

Watch the token counter grow. Then:
```
/status
```

Note the token usage. Now:
```
What was the first thing I asked you in this session?
```

Can Claude still recall it accurately?

### Exercise 2: Practice /compact
Continue from Exercise 1 (or start fresh and fill context a bit):

```
/compact focus on the experiment summaries
```

```
/status
```

Compare the token count before and after. Then verify Claude still knows the key info:
```
What experiments does this repo contain?
```

### Exercise 3: Compare /compact vs /clear
Start a session and establish some context:

```
Read the CLAUDE.md and remember: my name is Alex, I'm working on the hooks experiment, and my favorite color is blue.
```

Now try `/compact`:
```
/compact
```

```
What's my name and what am I working on?
```

Now try `/clear`:
```
/clear
```

```
What's my name and what am I working on?
```

See the difference? `/compact` retains key facts. `/clear` forgets everything.

### Exercise 4: Trigger subagent usage
Ask Claude to do something that naturally spawns subagents:

```
Search the entire codebase and create a report of: (1) all file types present, (2) total lines of code by type, (3) any TODOs or FIXMEs, (4) all external dependencies.
```

Watch for "Launching explore agent..." messages. The explore agent searches in a separate context and reports back.

### Exercise 5: Try /rewind
Make some changes, then undo them:

```
Add a comment at the top of shared/utils.ts that says "// Modified by experiment 02"
```

Now undo it:
```
/rewind
```

Check the file — the comment should be gone, but Claude still remembers the conversation.

### Exercise 6: Explore auto-memory
```
/memory
```

See what Claude has remembered so far. Then teach it something:
```
Remember that I prefer detailed explanations over terse ones in this repo.
```

Start a new session and check if it persists:
```bash
claude --continue
```

```
/memory
```

### Exercise 7: Create a custom agent
Create a custom agent definition:

```bash
mkdir -p .claude/agents
```

```
Create a file at .claude/agents/experiment-reviewer.md that defines an agent specialized in reviewing experiment READMEs. It should check for: clear goal, runnable exercises, complete key learnings checklist, and working resource links.
```

Then test it:
```
@experiment-reviewer Review experiments/05-headless-mode/README.md
```

### Exercise 8: Work with Tasks
Create a task list with dependencies:

```
Create a task list for improving this repo:
1. Audit all experiment READMEs for completeness
2. Fix any issues found in the audit (blocked by: task 1)
3. Add missing exercises to incomplete experiments (blocked by: task 2)
4. Run all exercises to verify they work (blocked by: task 3)
```

Watch how tasks unblock as you complete them. Try resuming the session later — the tasks persist.

### Exercise 9: The explore-in-plan-mode pattern
Try the pattern on a real task:

```
Plan how you would add a new experiment about Claude Code's vision capabilities. Explore the existing experiments to understand the format, then create a detailed plan. Don't implement yet — just plan.
```

Notice how Claude explores first (subagents), then synthesizes a plan in your main context.

## Key Learnings
- [ ] Understand what fills context and how to read the token counter
- [ ] Know when to use `/compact` vs `/clear` vs `/rewind`
- [ ] Can use `/compact` with a focus hint
- [ ] Understand `--continue` (last session) vs `--resume` (specific session)
- [ ] Know how auto-memory works and can manage it with `/memory`
- [ ] Understand Tasks — persistent task lists with DAG dependencies
- [ ] Know how to share tasks between agents with `CLAUDE_CODE_TASK_LIST_ID`
- [ ] Understand what subagents are and why they help
- [ ] Know when Claude spawns subagents automatically
- [ ] Can create Custom Agents in `.claude/agents/`
- [ ] Understand the explore-in-plan-mode pattern
- [ ] Can manage long sessions without context degradation

## Resources
- [Claude Code context management](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Multi-agent patterns](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Best practices for long sessions](https://www.anthropic.com/engineering/claude-code-best-practices)
