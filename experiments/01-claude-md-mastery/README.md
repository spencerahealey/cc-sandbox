# Experiment 01: CLAUDE.md Mastery

## Goal
Learn how to write great CLAUDE.md files — the single most impactful thing you can do to improve Claude Code's performance on your projects. A well-written CLAUDE.md turns Claude from a generic assistant into a team member who knows your codebase.

## Why CLAUDE.md Matters
When you run `claude` in a directory, Claude Code automatically reads any CLAUDE.md file it finds. This file is your way of telling Claude:
- How your project is structured
- What conventions you follow
- What commands to run
- What to avoid
- How to test things

Without it, Claude guesses. With it, Claude knows.

## What to Include in a CLAUDE.md

### The Essential Sections
1. **Purpose** — One-liner about what this project is
2. **Project Structure** — Directory tree with annotations
3. **Conventions** — Language, formatting, naming patterns
4. **Key Commands** — How to build, test, lint, deploy
5. **Testing** — Framework, file patterns, how to run
6. **Architecture** — Key patterns, data flow, important abstractions
7. **Important Notes** — Gotchas, things Claude tends to get wrong

### What NOT to include
- Long prose explanations (keep it scannable)
- Information that changes constantly (use links instead)
- Secrets or credentials (use `.env` files)
- Obvious things (Claude already knows what TypeScript is)

## Scope Levels

### Project-level: `your-repo/CLAUDE.md`
Read automatically when you run `claude` in the repo. This is the most common and important one.

### User-level: `~/.claude/CLAUDE.md`
Applies to ALL your projects. Good for personal preferences:
```markdown
# Personal Preferences
- I prefer functional programming patterns over OOP
- Use early returns instead of nested if/else
- Always use TypeScript strict mode
- I'm on macOS — use macOS-specific commands when needed
```

### Subdirectory-level: `your-repo/src/api/CLAUDE.md`
Read when Claude works on files in that directory. Good for module-specific conventions:
```markdown
# API Module
- All endpoints follow REST conventions
- Use Zod for request validation
- Every endpoint needs a corresponding test in __tests__/
- Error responses use the ApiError class from shared/errors.ts
```

### Precedence
All levels are merged. Subdirectory CLAUDE.md files add to (don't replace) the root one. More specific files take priority when there's a conflict.

## When to Update Your CLAUDE.md
- When Claude makes the same mistake twice — add a note to prevent it
- When you add a new major feature or module
- When conventions change (new testing framework, new build tool)
- After onboarding a new team member — if they needed to know it, Claude does too
- When a session goes poorly — think about what context was missing

## Common Mistakes
1. **Too verbose** — Claude has a context window. A 500-line CLAUDE.md wastes space. Keep it under 100 lines.
2. **Too vague** — "Follow best practices" tells Claude nothing. Be specific: "Use Zod for all input validation."
3. **Outdated info** — A CLAUDE.md that says "we use Jest" when you've switched to Vitest causes confusion.
4. **Missing key commands** — If Claude doesn't know how to run tests, it can't verify its own work.
5. **No project structure** — Claude needs to know where things live to navigate your codebase.

## Example Templates

### Template 1: Small Project (CLI tool, library, script)
```markdown
# Project Name

## Purpose
A CLI tool that converts CSV files to JSON with validation.

## Structure
src/
  index.ts        — Entry point, CLI argument parsing
  converter.ts    — Core conversion logic
  validator.ts    — Schema validation with Zod
tests/
  converter.test.ts
  validator.test.ts

## Commands
- `npm run build` — compile TypeScript
- `npm test` — run Jest tests
- `npm run lint` — ESLint

## Conventions
- TypeScript strict mode
- Zod for all validation
- Tests mirror src/ structure

## Gotchas
- CSV parser is streaming — don't load entire file into memory
- Date fields expect ISO 8601 format only
```

### Template 2: Full-Stack App (Next.js + API)
```markdown
# MyApp

## Purpose
SaaS app for team retrospectives. Next.js frontend, tRPC API, Postgres via Prisma.

## Structure
src/
  app/             — Next.js app router pages
  components/      — React components (one per file, PascalCase)
  server/
    routers/       — tRPC routers (one per domain: user, retro, team)
    services/      — Business logic (routers call services, services call Prisma)
  lib/
    prisma.ts      — Prisma client singleton
    auth.ts        — Auth helpers (Clerk)

## Commands
- `npm run dev` — start dev server (port 3000)
- `npm test` — Vitest
- `npx prisma studio` — DB GUI
- `npx prisma migrate dev` — run migrations

## Conventions
- Server components by default, 'use client' only when needed
- All API mutations go through tRPC, not server actions
- Prisma models are PascalCase, DB tables are snake_case
- Every tRPC router needs input validation with Zod

## Auth
- Clerk handles auth. Use `auth()` in server components, `useAuth()` in client.
- Protected routes use middleware in `src/middleware.ts`

## Testing
- Vitest for unit tests, Playwright for E2E
- Unit tests: `*.test.ts` next to source
- E2E tests: `e2e/` folder
- Mock Prisma with `vitest-mock-extended`

## Gotchas
- Don't import server code in client components (breaks the build)
- Prisma client must be a singleton or you'll exhaust DB connections
- tRPC context is created per-request — don't cache user state in it
```

### Template 3: Monorepo (Turborepo)
```markdown
# Acme Monorepo

## Purpose
Monorepo for Acme's products. Turborepo + pnpm workspaces.

## Structure
apps/
  web/           — Customer-facing Next.js app
  admin/         — Internal admin dashboard (Next.js)
  api/           — Express REST API
packages/
  ui/            — Shared React component library
  db/            — Prisma schema + client (shared across apps)
  config/        — Shared ESLint, TypeScript, Tailwind configs
  utils/         — Shared utility functions

## Commands
- `pnpm dev` — start all apps in parallel
- `pnpm build` — build everything (Turborepo handles order)
- `pnpm test` — run all tests
- `pnpm --filter web dev` — start only the web app
- `pnpm --filter @acme/ui test` — test only the UI package

## Conventions
- Import shared packages with `@acme/` prefix
- Each package has its own `tsconfig.json` extending `packages/config`
- DB schema lives in `packages/db/prisma/schema.prisma` — single source of truth
- API types are generated from Prisma and shared via `packages/db`

## Adding a New Package
1. Create folder under `packages/` with `package.json` (name: `@acme/new-pkg`)
2. Add `tsconfig.json` extending `@acme/config`
3. Add to consuming app's dependencies
4. Run `pnpm install` from root

## Gotchas
- Always run `pnpm install` from repo root, never from a package
- Turborepo caches aggressively — run `pnpm clean` if builds seem stale
- Don't import between apps directly — extract shared code to a package
```

## Exercises

### Exercise 1: Analyze the existing CLAUDE.md
Open Claude Code in this repo and run:

```
Read the CLAUDE.md file and critique it. What's good? What's missing? What would you add if you were working on this project daily?
```

### Exercise 2: Write a CLAUDE.md from scratch
Pretend the CLAUDE.md doesn't exist. Write one from scratch based on what you observe in the repo:

```
Ignore the existing CLAUDE.md. Explore this entire repo — read key files, check the package.json, look at the directory structure — and write a CLAUDE.md from scratch. Put it in experiments/01-claude-md-mastery/my-claude-md.md
```

Then compare yours to the actual one:
```
Compare @experiments/01-claude-md-mastery/my-claude-md.md with @CLAUDE.md — what did I include that the original missed, and vice versa?
```

### Exercise 3: Write a user-level CLAUDE.md
Create a personal CLAUDE.md for your global preferences:

```
Help me create a ~/.claude/CLAUDE.md with my personal coding preferences. Ask me questions about my style, then generate the file.
```

### Exercise 4: Write a subdirectory CLAUDE.md
Create a module-specific CLAUDE.md for the shared utilities:

```
Read everything in shared/ and create a CLAUDE.md for that directory that explains the utilities, conventions, and how to add new ones. Save it to shared/CLAUDE.md
```

## Key Learnings
- [ ] Know what sections belong in a CLAUDE.md
- [ ] Understand project vs user-level vs subdirectory CLAUDE.md
- [ ] Can write a CLAUDE.md for any project size (small, full-stack, monorepo)
- [ ] Know when to update a CLAUDE.md
- [ ] Understand common mistakes (too verbose, too vague, outdated)
- [ ] Have written a CLAUDE.md from scratch and compared it

## Resources
- [CLAUDE.md documentation](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Best practices for CLAUDE.md](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code memory overview](https://docs.anthropic.com/en/docs/claude-code/memory)
