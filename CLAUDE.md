# Claude Code Sandbox

## Purpose
A hands-on experimentation workspace for learning and testing Claude Code features. Nothing here is production — break things freely.

## Project Structure
```
cc-sandbox/
├── CLAUDE.md                    # You're reading it
├── experiments/                 # Individual experiments (each has its own README)
│   ├── 00-getting-started/      # Install, authenticate, first prompts
│   ├── 01-claude-md-mastery/    # Writing great CLAUDE.md files
│   ├── 02-context-and-subagents/ # Context management and subagents
│   ├── 03-skills/               # Building custom skills
│   ├── 04-custom-agents/        # Custom Agents (.claude/agents/)
│   ├── 05-headless-mode/        # Running Claude Code programmatically
│   ├── 06-agent-teams/          # Multi-agent orchestration
│   ├── 07-mcp-servers/          # Building custom MCP servers
│   ├── 08-hooks/                # Pre/post tool hooks
│   └── 09-sdk-agents/           # Claude Code SDK for building agents
├── .claude/
│   ├── settings.local.json      # Permissive settings for sandbox
│   ├── skills/                  # Custom skills (auto-discovered)
│   │   ├── experiment-log/      # Skill: log experiment results
│   │   └── code-review/         # Skill: review code in this repo
│   └── commands/                # Custom slash commands
│       ├── new-experiment.md    # /new-experiment - scaffold a new experiment
│       ├── status.md            # /status - show experiment progress
│       └── learn.md             # /learn - explain a Claude Code feature
├── logs/                        # Experiment logs and notes
│   └── .gitkeep
└── shared/                      # Reusable utilities across experiments
    └── utils.ts
```

## Conventions
- Every experiment gets its own folder under `experiments/`
- Each experiment folder has a `README.md` explaining what it tests and what was learned
- Log results and learnings — this repo is a knowledge base, not throwaway code
- Use TypeScript by default unless the experiment requires something else
- Node.js for MCP servers and SDK work

## Key Commands
- `npm test` — run tests (Jest)
- `npm run lint` — ESLint
- `npx tsx <file>` — run TypeScript files directly

## Testing
- Jest for unit tests
- Files: `*.test.ts` alongside source

## Important Notes
- This repo has permissive Claude Code settings (`--dangerously-skip-permissions` equivalent)
- Don't store secrets here — use `.env` files (gitignored)
- Experiments are numbered by priority, not dependency
