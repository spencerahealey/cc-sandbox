# Claude Code Sandbox

## Purpose
Workflow-focused Claude Code learning for agentic engineers and vibe coders. Every experiment ends with something working — a real project, tool, or workflow you built by prompting. Self-updating and self-improving patterns are recurring themes throughout.

## Project Structure
```
cc-sandbox/
├── CLAUDE.md                    # You're reading it
├── experiments/                 # Individual experiments (each has its own README)
│   ├── 00-getting-started/      # Install, authenticate, build your first project
│   ├── 01-steering-claude-code/ # Plan mode, constraints, course-correction
│   ├── 02-debugging-and-fixing/ # Fix broken code, iterate on errors
│   ├── 03-claude-md-mastery/    # Writing and self-updating CLAUDE.md files
│   ├── 04-context-and-memory/   # Context windows, memory, sessions, tasks
│   ├── 05-custom-agents/        # Specialist agents with auto-delegation
│   ├── 06-skills-and-commands/  # Custom skills, auto-discovery, hooks intro
│   ├── 07-connecting-external-tools/ # Connecting existing MCP servers
│   ├── 08-multi-agent-teams/    # Agent teams, orchestration, headless mode
│   └── 09-putting-it-all-together/   # Capstone: combine everything into a real workflow
├── .claude/
│   ├── settings.local.json      # Permissive settings for sandbox (gitignored)
│   ├── skills/                  # Custom skills (auto-discovered)
│   │   └── experiment-log/      # Skill: log experiment results
│   └── commands/                # Custom slash commands
│       ├── new-experiment.md    # /new-experiment - scaffold a new experiment
│       ├── status.md            # /status - show experiment progress
│       └── learn.md             # /learn - explain a Claude Code feature
└── logs/                        # Experiment logs and notes
    └── experiment-log.md
```

## Conventions
- Every experiment gets its own folder under `experiments/`
- Each experiment folder has a `README.md` with goal, exercises, key learnings checklist, and resources
- Exercises should produce working outputs — real projects, tools, and files
- Log results and learnings — this repo is a knowledge base, not throwaway code
- Experiments are numbered by learning order, not dependency

## Important Notes
- This repo has permissive Claude Code settings
- Don't store secrets here — use `.env` files (gitignored)

## Self-Maintenance
After completing any work that changes project structure, conventions, or architecture, update this CLAUDE.md to reflect the changes.
