# Experiment 04: Custom Agents

## Goal
Learn to build Custom Agents — markdown files in `.claude/agents/` that define specialized Claude instances Claude can automatically delegate to. Custom Agents are the most practical daily multi-agent pattern: no infrastructure, no experimental flags, just a markdown file that makes Claude smarter.

## What Are Custom Agents?
Custom Agents are markdown files with YAML frontmatter that live in `.claude/agents/`. Each one defines a specialist that Claude can delegate to when a task matches the agent's description. They're different from:

- **Subagents** (Experiment 02): Built-in agents Claude spawns automatically (Explore, Plan). You don't define these.
- **Agent Teams** (Experiment 06): Full multi-agent orchestration with leads, teammates, and shared task lists. Experimental and token-intensive.
- **Custom Agents** (this experiment): Lightweight, file-based specialists you define. Claude auto-delegates based on description matching. Zero setup.

Custom Agents are the sweet spot for daily use — they give you multi-agent benefits without the complexity of Agent Teams.

## How Custom Agents Work

```
┌──────────────────────────────────┐
│         Your Session             │
│  "Review this PR for security"   │
│                                  │
│  Claude reads agent descriptions │
│  → security-auditor matches!     │
│  → Auto-delegates to agent       │
├──────────────────────────────────┤
          │
          ▼
┌──────────────────────────────────┐
│   security-auditor agent         │
│   (own context window)           │
│   - Follows agent instructions   │
│   - Uses only allowed tools      │
│   - Reports back summary         │
└──────────────────────────────────┘
```

Each Custom Agent:
- Gets its **own context window** (doesn't pollute your main session)
- Follows its **own instructions** (the markdown body)
- Can be restricted to **specific tools** (least-privilege)
- **Reports back a summary** to your main session

## Agent File Format

### Location
- **Project-level**: `.claude/agents/my-agent.md` — available to everyone in the repo
- **User-level**: `~/.claude/agents/my-agent.md` — available in all your projects

Project agents override user agents with the same name.

### Full Format

```markdown
---
name: agent-name
description: When to delegate to this agent. Claude matches your prompts against this.
model: sonnet          # sonnet | opus | haiku | inherit (default: inherit)
tools:                 # Allowlist: ONLY these tools available
  - Read
  - Grep
  - Glob
disallowedTools:       # Denylist: all tools EXCEPT these (use tools OR disallowedTools, not both)
  - Bash
  - Write
permissionMode: default  # default | bypassPermissions | permissive
hooks:                 # Agent-specific hooks
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: "npx eslint --fix $CLAUDE_FILE_PATH"
skills:                # Skills available to this agent
  - experiment-log
memory: true           # Whether the agent can access/create memories
color: blue            # Terminal color for the agent's output
isolation: worktree    # worktree: agent works in isolated git worktree
---

Instructions for the agent go here in the markdown body.

You are a [specialist type]. When given a task, you should:
1. Step one
2. Step two
3. Step three

Rules:
- Rule A
- Rule B
```

### Frontmatter Fields Reference

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Identifier for the agent |
| `description` | Yes | Triggers auto-delegation. Write it like a search query. |
| `model` | No | Which Claude model to use. `inherit` uses the session's model. |
| `tools` | No | Allowlist of tools the agent can use |
| `disallowedTools` | No | Denylist of tools (mutually exclusive with `tools`) |
| `permissionMode` | No | Permission handling strategy |
| `hooks` | No | Agent-specific hook configuration |
| `skills` | No | Skills the agent has access to |
| `memory` | No | Whether the agent can read/write auto-memories |
| `color` | No | Terminal output color |
| `isolation` | No | `worktree` for git worktree isolation |

## Auto-Delegation
The magic of Custom Agents is that you don't have to invoke them manually. Claude reads the `description` field of every agent and matches it against your prompt. If there's a match, Claude delegates automatically.

**Good descriptions** (specific, trigger-worthy):
- `"Reviews code changes for security vulnerabilities, OWASP issues, and auth bugs"`
- `"Writes and runs unit tests for TypeScript functions"`
- `"Generates and validates database migration files"`

**Bad descriptions** (too vague, will trigger too often or never):
- `"Helps with code"`
- `"Does testing stuff"`
- `"General purpose helper"`

You can also invoke any agent explicitly:
```
@agent-name Do this specific task
```

## The `/agents` Command
Manage agents interactively:

```
/agents
```

This lets you:
- **List** all available agents (project + user level)
- **Create** new agents via guided prompts
- **View** agent details and configuration

## Tool Scoping: Least Privilege
Restrict what agents can do using `tools` (allowlist) or `disallowedTools` (denylist):

```yaml
# Allowlist: agent can ONLY read files, never write or execute
tools:
  - Read
  - Grep
  - Glob
```

```yaml
# Denylist: agent can do everything EXCEPT run commands
disallowedTools:
  - Bash
```

Use `tools` (allowlist) for security-sensitive agents. Use `disallowedTools` for agents that need most tools but should be blocked from specific dangerous ones.

## Worktree Isolation
For agents that modify files, `isolation: worktree` gives them their own git worktree:

```yaml
isolation: worktree
```

The agent works in an isolated copy of the repo. Changes don't affect your working directory until you explicitly merge them. This is essential for:
- Agents that make speculative changes
- Parallel agents that might conflict
- Review workflows where you want to inspect changes before accepting

## Exercises

### Exercise 1: Create a code-reviewer agent via /agents
Use the interactive command:

```
/agents
```

Select "Create new agent" and configure:
- **Name**: `code-reviewer`
- **Description**: "Reviews code for bugs, edge cases, error handling, and maintainability"
- **Model**: sonnet
- **Tools**: Read, Grep, Glob (read-only — reviewers shouldn't edit)

Then test it:
```
@code-reviewer Review the code in shared/utils.ts
```

### Exercise 2: Create a security-auditor agent manually
Create the file directly:

```bash
mkdir -p .claude/agents
```

Create `.claude/agents/security-auditor.md`:
```
Create a file at .claude/agents/security-auditor.md with this content:

---
name: security-auditor
description: Audits code for security vulnerabilities including injection attacks, auth bypasses, data exposure, OWASP top 10 issues
model: opus
tools:
  - Read
  - Grep
  - Glob
  - WebSearch
---

You are a security auditor. When reviewing code:

1. Check for injection vulnerabilities (SQL, command, XSS)
2. Verify authentication and authorization checks
3. Look for sensitive data exposure (API keys, tokens, PII in logs)
4. Check dependency versions for known CVEs
5. Assess error handling (does it leak internal details?)
6. Review file permissions and access controls

Report findings as:
- CRITICAL: Must fix before deploy
- WARNING: Should fix soon
- INFO: Best practice suggestion

Be specific — include file paths, line numbers, and fix suggestions.
```

### Exercise 3: Test auto-delegation
After creating both agents, start a fresh session and give tasks that should trigger auto-delegation:

```
/clear
```

```
Check shared/utils.ts for any security issues.
```

Did Claude delegate to the security-auditor agent automatically? You should see it spinning up a separate agent.

Now try:
```
Review experiments/05-headless-mode/run.sh for code quality and potential bugs.
```

This should trigger the code-reviewer agent.

### Exercise 4: Create an agent with restricted tools
Create a documentation-only agent that can read but never modify code:

```
Create a custom agent at .claude/agents/doc-writer.md that:
- Can only use Read, Grep, Glob, and Write tools
- Is specialized for writing and updating documentation
- Cannot run Bash commands or edit existing code files
- Has Write access only for .md files

Test it by asking: "Document the project structure of this repo in a new file"
```

### Exercise 5: Create a planner + implementer agent pair
Create two agents that handle different phases:

```
Create two agents:

1. .claude/agents/planner.md
   - Read-only tools (Read, Grep, Glob)
   - Analyzes codebases and creates implementation plans
   - Outputs structured plans with file changes needed
   - Model: opus (for deeper reasoning)

2. .claude/agents/implementer.md
   - Full tool access (Read, Write, Edit, Bash)
   - Takes a plan and executes it
   - Runs tests after making changes
   - Model: sonnet (faster for execution)
```

Then test the workflow:
```
@planner Analyze how to add a "last modified" timestamp to each experiment README

@implementer Implement the plan the planner just created
```

## Gotchas
- **Each agent has its own context window** — they can't see your conversation history
- **Agents don't inherit conversation history** — they start fresh with only their instructions + CLAUDE.md
- **Project agents override user agents** with the same name
- **Auto-delegation isn't perfect** — if Claude delegates to the wrong agent, invoke the right one explicitly with `@agent-name`
- **Tool restrictions are enforced** — an agent with only `Read` tools literally cannot write files
- **`isolation: worktree` requires a git repo** — won't work outside of git-tracked directories
- **Don't over-specialize** — 2-3 focused agents beat 10 narrow ones. Start broad, split later.

## Key Learnings
- [ ] Understand what Custom Agents are and how they differ from subagents and Agent Teams
- [ ] Know the agent file format (YAML frontmatter + markdown body)
- [ ] Can create agents via `/agents` command and manually
- [ ] Understand project-level vs user-level agent scope
- [ ] Know all frontmatter fields: name, description, model, tools, disallowedTools, permissionMode, hooks, skills, memory, color, isolation
- [ ] Understand auto-delegation based on description matching
- [ ] Can scope tools using allowlist (`tools`) or denylist (`disallowedTools`)
- [ ] Understand `isolation: worktree` for safe parallel work
- [ ] Can create complementary agent pairs (planner + implementer)
- [ ] Know the gotchas (own context, no history inheritance, project overrides user)

## Resources
- [Custom Agents documentation](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Agent configuration reference](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Git worktree isolation](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
