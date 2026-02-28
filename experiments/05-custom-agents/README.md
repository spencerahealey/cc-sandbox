# Experiment 05: Custom Agents

## Goal

Build specialist agents that Claude automatically delegates tasks to. You'll create agents for code review, planning, and implementation — then watch Claude route work to them without manual invocation. By the end, you'll have a working team of agents you can reuse across projects.

## Time Estimate

~1-2 hours

---

## What Custom Agents Are

Custom agents are markdown files in `.claude/agents/` that define specialists. Each has a name, description, model preference, and tool permissions. When you give Claude a task, it reads agent descriptions and decides whether to delegate — no manual invocation needed.

**You define specialists, Claude figures out when to use them.**

---

## Agent File Format

```markdown
---
name: Code Reviewer
description: Reviews code for quality, readability, and potential bugs. Use for pull request reviews and code audits.
model: sonnet
tools:
  - Read
  - Glob
  - Grep
  - Bash
---

You are a code reviewer. When asked to review code:

1. Read the files thoroughly
2. Check for logic errors, edge cases, style consistency, and missing error handling
3. Provide specific, actionable feedback with line references
4. Rate: Approve, Request Changes, or Needs Discussion

Be direct. Cite specific lines.
```

### Key frontmatter fields

| Field | What it does | Values |
|-------|-------------|--------|
| `name` | Display name | Any string |
| `description` | How Claude decides when to delegate — be specific | Drives auto-delegation |
| `model` | Which model the agent uses | `sonnet`, `opus`, `haiku`, `inherit` |
| `tools` | Allowlist of tools | `Read`, `Write`, `Edit`, `Bash`, `Glob`, `Grep`, etc. |
| `disallowedTools` | Tools the agent cannot use | Same tool names |

### Project vs user level

| Location | Scope |
|----------|-------|
| `.claude/agents/` (in repo) | This project only |
| `~/.claude/agents/` (home dir) | All your projects |

---

## Auto-Delegation

You don't invoke agents by name. Claude reads descriptions and routes automatically:

1. You: "Review the calculator code I just built"
2. Claude sees the Code Reviewer agent's description mentions reviewing code
3. Claude delegates to the Code Reviewer
4. The agent works in its own context window
5. Results come back to your session

### Making auto-delegation reliable

The `description` field is everything:

```yaml
# Good — clear trigger conditions
description: Reviews code for quality, readability, and potential bugs. Use for pull request reviews and code audits.

# Bad — too vague
description: Helps with code.
```

---

## Tool Scoping for Safety

Control what agents can do:

### Read-only reviewer
```yaml
tools: [Read, Glob, Grep]
```
Can look at code but can't modify anything.

### Implementer with guardrails
```yaml
tools: [Read, Write, Edit, Bash, Glob, Grep]
disallowedTools: [WebFetch]
```
Can write code but can't access the internet.

---

## Self-Improving Agents

After an agent finishes, improve its prompt:

```
The code reviewer missed the edge case around empty arrays. Update its
prompt to specifically check for empty collection handling.
```

Over time, your agents get better at your specific codebase and patterns.

---

## Exercises

### Exercise 1: Create a Code Reviewer

Use `/agents` to create one interactively:

```
/agents
```

Create a code reviewer with:
- Model: sonnet
- Tools: Read, Glob, Grep only (read-only)
- Description focused on code quality, bugs, and edge cases

Then build something for it to review:

```
Build a temperature converter at experiments/05-custom-agents/converter/index.html.
Celsius, Fahrenheit, Kelvin. Converts between all three in real time as you type.
```

Now test the agent:

```
Review the temperature converter code I just built. Check for edge cases and bugs.
```

Watch Claude auto-delegate to your reviewer.

### Exercise 2: Create a Security Auditor

Create `.claude/agents/security-auditor.md` manually:

```
Create a security auditor agent at .claude/agents/security-auditor.md.
It should scan code for XSS, injection risks, exposed secrets, and unsafe patterns.
Read-only tools only. Model: sonnet.
```

Test it:

```
Run a security audit on all the HTML files we've built in the experiments so far.
```

### Exercise 3: Planner + Implementer Pair

Create two complementary agents:

```
Create two agents:

1. .claude/agents/planner.md — a planner that analyzes requirements and produces
   step-by-step implementation plans. Read-only tools. Uses opus for deeper thinking.
   Never writes code, only plans.

2. .claude/agents/implementer.md — an implementer that builds according to plans.
   Has write access. Uses sonnet for speed. Follows plans step by step and runs
   tests after each change.
```

Test the pair with a real build:

```
Plan and build a pomodoro timer at experiments/05-custom-agents/pomodoro/index.html.
25-minute work sessions, 5-minute breaks. Start, pause, reset buttons. Audio
notification when timer ends. Track completed sessions.
```

### Exercise 4: Test Auto-Delegation

Give ambiguous tasks and see which agent Claude picks:

```
Is the temperature converter code safe from XSS attacks?
```

```
I want to add dark mode to the pomodoro timer — figure out the approach first.
```

```
Check if the converter handles negative numbers correctly.
```

Does Claude pick the right agent each time?

### Exercise 5: Self-Improve an Agent

After using the code reviewer:

```
The code reviewer's feedback was too generic. Update its prompt to be
more specific about the patterns in our HTML/CSS/JS projects — checking
for accessibility, responsive design issues, and localStorage edge cases.
```

---

## Key Learnings

- [ ] Created a custom agent that Claude auto-delegates to
- [ ] Built a read-only agent with scoped tool permissions
- [ ] Created a planner + implementer agent pair
- [ ] Tested auto-delegation with ambiguous tasks
- [ ] Improved an agent's prompt based on real usage
- [ ] Built 2+ working tools (converter, pomodoro) during exercises

## Resources

- [Custom Agents Documentation](https://docs.anthropic.com/en/docs/claude-code/agents)
- [Tool Permissions](https://docs.anthropic.com/en/docs/claude-code/settings#tool-permissions)
