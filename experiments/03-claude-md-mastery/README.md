# Experiment 03: CLAUDE.md Mastery

## Goal

Write effective CLAUDE.md files that steer Claude Code's behavior on every interaction — and build the habit of keeping them updated as your project evolves. You'll create CLAUDE.md files from scratch and practice the self-updating pattern that keeps them accurate over time.

## Time Estimate

~45 minutes

---

## What CLAUDE.md Does

CLAUDE.md is the first thing Claude reads when it enters a project. It's your persistent instruction set — project structure, conventions, key commands, things to avoid. Every session starts with this context loaded automatically.

Without a CLAUDE.md, Claude guesses. With a good one, Claude acts like a teammate who's read the onboarding docs.

---

## What Belongs in CLAUDE.md

| Section | Purpose | Example |
|---------|---------|---------|
| **Project structure** | What's where | Directory tree with annotations |
| **Conventions** | How things are done | "Use TypeScript, tabs not spaces" |
| **Key commands** | How to build, test, run | `npm test`, `npm run dev` |
| **Architecture decisions** | Why things are this way | "REST not GraphQL because..." |
| **Known gotchas** | Things that trip people up | "Auth module uses custom tokens, not JWT" |
| **What NOT to do** | Guardrails | "Don't modify the database schema" |

### What doesn't belong

- **Session-specific tasks** — that's what prompts are for
- **Obvious things** — Claude knows how JavaScript works
- **Novels** — keep it under 200 lines. Claude reads the whole thing every session.

---

## Scoping Levels

CLAUDE.md files cascade. Claude reads all of them, from broadest to most specific:

| Level | Location | Scope |
|-------|----------|-------|
| **User** | `~/.claude/CLAUDE.md` | All your projects (personal preferences) |
| **Project** | `CLAUDE.md` (repo root) | This project (conventions, structure) |
| **Subdirectory** | `src/api/CLAUDE.md` | Specific module (local patterns) |

---

## Bootstrapping with /init

Don't write CLAUDE.md from scratch for existing projects:

```
/init
```

Claude scans the project — package.json, directory structure, config files, README — and generates a CLAUDE.md. It's a solid starting point you can edit.

---

## Self-Updating CLAUDE.md

This is the most important pattern. **Treat CLAUDE.md as a living document that Claude helps maintain.**

After completing significant work, tell Claude:

```
Update CLAUDE.md with any architectural decisions we just made.
```

```
We just added a new module. Update the project structure in CLAUDE.md.
```

### Make it automatic

Add a reminder to your CLAUDE.md:

```markdown
## Self-Maintenance
After completing work that changes project structure or conventions,
update this CLAUDE.md to reflect the changes.
```

Now Claude will sometimes update it proactively.

---

## Templates

### Small Project

```markdown
# Project Name

## Structure
- src/ — source code
- tests/ — test files

## Conventions
- TypeScript, strict mode
- Tests: Jest, co-located as *.test.ts

## Commands
- `npm run dev` — start dev server
- `npm test` — run tests

## Notes
- Env vars in .env (gitignored)
- Don't commit to main directly
```

### Full-Stack App

```markdown
# App Name

## Architecture
- Frontend: React + Vite (src/client/)
- Backend: Express (src/server/)
- Database: PostgreSQL via Prisma

## Commands
- `npm run dev` — starts client (3000) and server (3001)
- `npm test` — Jest tests
- `npx prisma migrate dev` — run migrations

## Conventions
- API routes: /api/v1/<resource>
- All DB queries through src/server/services/
- Errors use AppError class from src/errors.ts

## Gotchas
- Auth middleware reads from both cookies AND Authorization header
- Prisma schema is source of truth for DB types
```

---

## Common Mistakes

| Mistake | Why it hurts |
|---------|-------------|
| CLAUDE.md is 500+ lines | Claude spends context reading instructions instead of doing work |
| Never updated after initial write | Claude follows stale conventions |
| Too vague ("follow best practices") | Claude interprets this differently every time |
| No "what not to do" section | Claude modifies things it shouldn't |

---

## Exercises

### Exercise 1: Generate from Scratch

Delete the existing CLAUDE.md in this repo (you'll restore it) and have Claude generate one:

```
Delete the CLAUDE.md in this repo root, then use /init to generate
a new one from scratch by analyzing the project.
```

Compare the generated version to the original. What did Claude catch? What did it miss?

Then restore the original:

```
/rewind
```

### Exercise 2: CLAUDE.md for a Real Project

Open Claude Code in one of your own projects (or create a new one):

```bash
mkdir ~/my-project && cd ~/my-project
claude
```

```
Analyze this project and generate a CLAUDE.md. Include project structure,
conventions, key commands, architecture decisions, and known gotchas.
Keep it under 150 lines.
```

If this is an empty directory, try:

```
I'm starting a new web app project here. It'll be a recipe manager
using vanilla HTML/CSS/JS. Generate a CLAUDE.md that establishes
conventions before we start building.
```

### Exercise 3: Self-Updating in Action

Build something in this repo, then have Claude update the CLAUDE.md:

```
Create a small utility at experiments/03-claude-md-mastery/color-picker/index.html —
a color picker tool that shows hex, RGB, and HSL values. Single HTML file.
```

Then:

```
We just added a new tool to the project. Update CLAUDE.md to note that
experiments may contain small standalone tools, and update any relevant sections.
```

Check what Claude changed. Would future sessions benefit from the update?

### Exercise 4: Subdirectory Scoping

Create a subdirectory CLAUDE.md for an experiment:

```
Create a CLAUDE.md inside experiments/03-claude-md-mastery/ that describes
this specific experiment's conventions: what files are here, what the
exercises produce, and any local conventions that differ from the root project.
```

---

## Key Learnings

- [ ] Generated a CLAUDE.md from scratch using /init
- [ ] Wrote a CLAUDE.md for a real project (or started a new one with conventions)
- [ ] Practiced the self-updating pattern — had Claude update CLAUDE.md after making changes
- [ ] Created a subdirectory-scoped CLAUDE.md
- [ ] Built a working tool (color picker) during the exercises

## Resources

- [CLAUDE.md Documentation](https://docs.anthropic.com/en/docs/claude-code/memory#claudemd)
- [CLAUDE.md Best Practices](https://docs.anthropic.com/en/docs/claude-code/memory#best-practices)
