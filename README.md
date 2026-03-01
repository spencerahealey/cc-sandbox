# The Complete Guide to Claude Code

From first install to multi-agent workflows — 10 hands-on experiments that teach you Claude Code by building real projects.

## What is Claude Code?

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) is an AI assistant that lives in your terminal. You describe what you want in plain English and it builds it — reading files, writing code, running commands, and iterating until things work. Think of it as a developer that works for you, right from the command line.

## Who is this for?

**Everyone — from first-time users to power users.** You don't need to be a software engineer. You just need a terminal and curiosity.

- **Just getting started?** Experiment 00 walks you through installation and has you building a website in 10 minutes.
- **Already using Claude Code?** Skip to the experiment you need — each one is self-contained.
- **Want the full path?** Go in order. By experiment 09, you'll be orchestrating teams of AI agents.

## The Experiments

**10 experiments**, ordered from beginner to advanced. Every experiment ends with something working — a real project, tool, or workflow you built by prompting.

### Foundations (start here)

| # | Experiment | What You'll Build | Time |
|---|-----------|-------------------|------|
| 00 | [Getting Started](experiments/00-getting-started/) | A landing page — your first project built entirely by prompting | 20 min |
| 01 | [Steering Claude Code](experiments/01-steering-claude-code/) | A calculator, bookmark manager, and portfolio — learning to control what Claude does | 45 min |
| 02 | [Debugging & Fixing](experiments/02-debugging-and-fixing/) | Fix broken projects by pasting errors and iterating | 45 min |
| 03 | [CLAUDE.md Mastery](experiments/03-claude-md-mastery/) | Project config files that keep Claude informed and up to date | 45 min |
| 04 | [Context & Memory](experiments/04-context-and-memory/) | A notes app, habit tracker, and recipe book — built across multiple sessions | 1 hr |

### Power Features

| # | Experiment | What You'll Build | Time |
|---|-----------|-------------------|------|
| 05 | [Custom Agents](experiments/05-custom-agents/) | Specialist AI agents that review, audit, and plan — then auto-run when needed | 1-2 hrs |
| 06 | [Skills & Commands](experiments/06-skills-and-commands/) | Reusable workflows — a project scaffolder, landing page generator | 1-1.5 hrs |
| 07 | [Connecting External Tools](experiments/07-connecting-external-tools/) | Give Claude access to GitHub, databases, and other services | 45 min |
| 08 | [Multi-Agent Teams](experiments/08-multi-agent-teams/) | Multiple AI agents working together on a single project | 1-2 hrs |
| 09 | [Putting It All Together](experiments/09-putting-it-all-together/) | A capstone combining agents, skills, and tools into one workflow | 3-5 hrs |

**Total: ~12-17 hours** from first install to multi-agent systems.

| # | Experiment | What You'll Build | Time |
|---|-----------|-------------------|------|
| 00 | [Getting Started](experiments/00-getting-started/) | A landing page — your first project built entirely by prompting | 20 min |
| 01 | [Steering Claude Code](experiments/01-steering-claude-code/) | A calculator, bookmark manager, and portfolio — learning to control what Claude does | 45 min |
| 02 | [Debugging & Fixing](experiments/02-debugging-and-fixing/) | Fix broken projects by pasting errors and iterating | 45 min |
| 03 | [CLAUDE.md Mastery](experiments/03-claude-md-mastery/) | Project config files that keep Claude informed and up to date | 45 min |
| 04 | [Context & Memory](experiments/04-context-and-memory/) | A notes app, habit tracker, and recipe book — built across multiple sessions | 1 hr |
| 05 | [Custom Agents](experiments/05-custom-agents/) | Specialist AI agents that review, audit, and plan — then auto-run when needed | 1-2 hrs |
| 06 | [Skills & Commands](experiments/06-skills-and-commands/) | Reusable workflows — a project scaffolder, landing page generator | 1-1.5 hrs |
| 07 | [Connecting External Tools](experiments/07-connecting-external-tools/) | Give Claude access to GitHub, databases, and other services | 45 min |
| 08 | [Multi-Agent Teams](experiments/08-multi-agent-teams/) | Multiple AI agents working together on a single project | 1-2 hrs |
| 09 | [Putting It All Together](experiments/09-putting-it-all-together/) | A capstone combining agents, skills, and tools into one workflow | 3-5 hrs |

**Total: ~12-17 hours** from first install to multi-agent systems.

## Quick Start

### 1. Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

You need a [Claude Pro/Max subscription](https://claude.ai) or an [Anthropic API key](https://console.anthropic.com).

### 2. Clone this repo and open it

```bash
git clone https://github.com/spencerahealey/cc-sandbox.git
cd cc-sandbox
claude
```

Claude automatically reads the project config and knows what this is.

### 3. Start Experiment 00

```
Open experiments/00-getting-started/README.md and walk me through it.
```

That's it. You're learning Claude Code with Claude Code.

## How to use this repo

**Follow the experiments in order** — each builds on the last. Or jump to what you need. Each experiment is self-contained.

Every experiment has a "Key Learnings" checklist. Check items off as you go. Run `/status` inside Claude Code to see where you stand.

## Extras

**3 built-in commands** you can use from day one:
- `/status` — see your progress across all experiments
- `/learn <feature>` — get a hands-on tutorial on any Claude Code feature
- `/new-experiment <name>` — scaffold a new experiment folder

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Add experiments, improve explanations, fix mistakes. PRs welcome.

## License

MIT — see [LICENSE](LICENSE).

---

Built by [Spencer Healey](https://x.com/SpencerHea70687) · [Healey AI](https://healeyai.com)
