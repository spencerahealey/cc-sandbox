# cc-sandbox 🧪

A hands-on playground for learning Claude Code's most powerful features — multi-agent orchestration, custom MCP servers, hooks, skills, and the SDK.

Most people use Claude Code like a chatbot in their terminal. This repo teaches you to use it like a platform.

## Who is this for?

You use Claude Code (or want to) and you've hit the ceiling on basic prompting. You want to learn headless mode, agent teams, hooks, MCP servers, and the SDK — but the docs are scattered and there's no structured path. This is that path.

## What's inside

**10 experiments**, ordered from foundational to advanced. Each has a README with explanation, copy-paste exercises, and a checklist so you know when you've actually learned the thing.

| # | Experiment | What You'll Learn | Time |
|---|-----------|-------------------|------|
| 00 | [Getting Started](experiments/00-getting-started/) | Install, authenticate, first prompts, essential commands | 20 min |
| 01 | [CLAUDE.md Mastery](experiments/01-claude-md-mastery/) | Write great CLAUDE.md files — project, user, and subdirectory level | 45 min |
| 02 | [Context & Subagents](experiments/02-context-and-subagents/) | Context management, /compact, /clear, auto-memory, Tasks, custom agents | 1 hr |
| 03 | [Skills](experiments/03-skills/) | Build custom skills — SKILL.md format, auto-discovery, supporting files | 1 hr |
| 04 | [Custom Agents](experiments/04-custom-agents/) | Build agents in .claude/agents/ — auto-delegation, tool scoping, worktrees | 1-2 hrs |
| 05 | [Headless Mode](experiments/05-headless-mode/) | Run Claude Code programmatically, chain agents, parallelize work | 30 min |
| 06 | [Agent Teams](experiments/06-agent-teams/) | Coordinate multiple Claude instances with shared Tasks and messaging | 1-2 hrs |
| 07 | [MCP Servers](experiments/07-mcp-servers/) | Build custom tool servers that Claude Code can discover and use | 2-3 hrs |
| 08 | [Hooks](experiments/08-hooks/) | Deterministic automation — auto-lint, test gates, notifications | 1 hr |
| 09 | [SDK Agents](experiments/09-sdk-agents/) | Build production agents with the Claude Code SDK | 2-3 hrs |

**3 custom slash commands** you can use immediately:
- `/new-experiment <name>` — scaffold a new experiment folder
- `/status` — see your progress across all experiments
- `/learn <feature>` — get a hands-on tutorial on any Claude Code feature

**1 working MCP server** — a starter server with 3 tools you can connect to Claude Code in minutes.

**1 custom skill** — auto-logs your experiment results and learnings.

## Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed and authenticated
- Claude Pro or Max subscription (or API key)
- Node.js 18+
- Basic terminal comfort

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/cc-sandbox.git
cd cc-sandbox
npm install
```

Open Claude Code in the repo:

```bash
claude
```

Claude automatically reads the CLAUDE.md and knows the project. Start with Experiment 00:

```bash
cd experiments/00-getting-started
cat README.md
```

Or use the built-in learning command inside Claude Code:

```
/learn getting started
```

## How to use this repo

**Option A: Follow the experiments in order.** Each builds on the last. Recommended path.

**Option B: Jump to what you need.** Each experiment is self-contained. Already know headless mode? Skip to Agent Teams.

**Option C: Use it as a reference.** The READMEs contain patterns, architecture diagrams, and gotchas you can come back to.

### Track your progress

Every experiment has a "Key Learnings" checklist. Check items off as you go. Run `/status` inside Claude Code anytime to see where you stand.

## Add your own experiments

```
# Inside Claude Code
/new-experiment websocket-mcp-server
```

Scaffolds a new numbered folder with README, starter code, and test file.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). The short version: add experiments, improve explanations, fix mistakes. PRs welcome.

## License

MIT — see [LICENSE](LICENSE).

---

Built by [Spencer Healey](https://x.com/SpencerHea70687) · [Healey AI](https://healeyai.com)
