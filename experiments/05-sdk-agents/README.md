# Experiment 05: Claude Code SDK — Building Real Agents

## Goal
Use the Claude Code SDK (Python or TypeScript) to build programmatic agents that leverage Claude Code's full toolset — file I/O, bash, web fetch — without reimplementing everything yourself.

## Prerequisites
- Complete Experiments 01-04
- Python 3.10+ or Node.js 18+

## What is the Claude Code SDK?
The SDK exposes the same agentic harness that powers Claude Code as a library. Instead of running `claude -p` from bash, you call it programmatically with full control over tools, permissions, and multi-turn conversations.

```
Your Code → Claude Code SDK → Claude API + Tools (Bash, Read, Write, etc.)
```

Think of it as headless mode on steroids — you get structured responses, tool control, session management, and can build multi-agent orchestration in real code instead of bash scripts.

## Setup

### Python
```bash
pip install claude-code-sdk
```

### TypeScript
```bash
npm install @anthropic-ai/claude-code
```

## Exercises

### Exercise 1: Basic SDK query (Python)
```python
import anyio
from claude_code_sdk import query

async def main():
    async for message in query(prompt="List all experiments in this repo"):
        if hasattr(message, 'content'):
            print(message.content)

anyio.run(main)
```

### Exercise 2: Restricted tool agent
Build an agent that can only read files — no writes, no bash.

```python
import anyio
from claude_code_sdk import query, ClaudeCodeOptions

async def main():
    options = ClaudeCodeOptions(
        allowed_tools=["Read", "Grep", "Glob"],
        model="claude-sonnet-4-5-20250929",
    )
    async for message in query(
        prompt="Analyze the CLAUDE.md file and suggest improvements",
        options=options,
    ):
        print(message)

anyio.run(main)
```

### Exercise 3: Multi-agent pipeline in code
Build a 3-agent pipeline entirely in Python/TypeScript:
1. **Planner**: Reads the codebase, proposes a small feature
2. **Builder**: Implements the feature (has Write + Bash access)
3. **Reviewer**: Reviews the changes (Read-only access)

Each agent gets the previous agent's output as input.

### Exercise 4: Cron job agent
Build an agent that runs on a schedule (or manually) to:
- Check if any experiments have uncommitted changes
- Run all tests
- Generate a daily status report in `logs/`

### Exercise 5: MCP + SDK combo
Connect your MCP server from Experiment 03 to an SDK-powered agent. The agent uses your custom MCP tools to read/write project state.

## Architecture: When to Use What

| Approach | Best For |
|----------|----------|
| Interactive Claude Code | Daily development, exploring |
| `claude -p` (headless) | Simple scripts, CI/CD steps |
| Agent Teams | Parallel work needing communication |
| SDK | Custom agents, complex orchestration, production pipelines |

## Key Learnings
- [ ] Can run Claude Code programmatically via SDK
- [ ] Understand tool restriction with `allowed_tools`
- [ ] Can chain SDK agents into pipelines
- [ ] Know when SDK vs headless vs teams is appropriate
- [ ] Can integrate MCP servers with SDK agents

## Resources
- [Claude Code SDK docs](https://docs.anthropic.com/en/docs/claude-code/sdk)
- [SDK Python reference](https://pypi.org/project/claude-code-sdk/)
- [Building agents blog post](https://blog.promptlayer.com/building-agents-with-claude-codes-sdk/)
