# Experiment 06: Skills and Commands

## Goal

Build reusable workflows that Claude can trigger automatically or on command. You'll create skills from scratch, test auto-discovery, and learn how hooks and plugins extend Claude Code further. Every skill you build here is something you can take to your real projects.

## Time Estimate

~1-1.5 hours

---

## What Skills Are

Skills are SKILL.md files that extend what Claude can do. They live in `.claude/skills/` and Claude discovers them automatically when relevant — or you invoke them directly.

Think of skills as reusable recipes: "here's how to do X, with these tools, in this format."

---

## SKILL.md Format

```markdown
---
name: readme-generator
description: Generates a README.md for any project directory by analyzing its structure and code.
allowed-tools: Read, Glob, Grep, Write
model: sonnet
user-invocable: true
argument-hint: <directory-path>
---

Generate a README.md for the specified directory. Analyze:
1. Directory structure and file organization
2. Entry points and main modules
3. Build/run/test commands
4. Key architecture patterns

Output a practical README someone can use to understand the project in 5 minutes.
```

### Key frontmatter fields

| Field | What it does |
|-------|-------------|
| `name` | Skill identifier |
| `description` | How Claude decides when to load it (drives auto-discovery) |
| `allowed-tools` | Tools the skill can use |
| `model` | Model to use |
| `user-invocable` | Can users trigger this directly |
| `disable-model-invocation` | Prevent auto-discovery, manual only |
| `argument-hint` | Usage hint shown when invoked |

---

## Auto-Discovery

Claude reads skill descriptions and loads them when relevant:

1. You: "Generate a README for this project"
2. Claude scans skill descriptions
3. Finds `readme-generator`: "Generates a README.md..."
4. Loads and follows the skill's instructions

The `description` field drives discovery — make it specific.

---

## Supporting Files

Skills can include templates and reference docs in their directory:

```
.claude/skills/api-generator/
├── SKILL.md
├── route-template.ts      # Template the skill references
└── conventions.md          # Standards to follow
```

Reference them in the skill: "Use the template at .claude/skills/api-generator/route-template.ts"

---

## Hooks: A Brief Introduction

Hooks are shell commands that fire at specific lifecycle points. Configured in `.claude/settings.local.json`.

### Most useful hooks

| Hook | When it fires | Use case |
|------|--------------|----------|
| `PreToolUse` | Before any tool runs | Auto-format, block dangerous commands |
| `PostToolUse` | After any tool runs | Auto-lint after edits |
| `Stop` | When Claude finishes | Desktop notification ("Claude's done!") |

### Example: Notification when done

```json
{
  "hooks": {
    "Stop": [
      {
        "command": "osascript -e 'display notification \"Claude finished\" with title \"Done\"'"
      }
    ]
  }
}
```

Hooks are powerful but can get complex. See the [Hooks docs](https://docs.anthropic.com/en/docs/claude-code/hooks) for more.

---

## Plugins

Plugins bundle skills, agents, and hooks into installable packages:

```
/plugins discover
```

Browse and install community-made extensions. You don't need to build plugins to use Claude Code — just know they exist for when you want pre-built solutions.

---

## Self-Improving Skills

After a skill runs, improve it:

```
The README generator missed the testing section and didn't detect the
monorepo structure. Update the skill's instructions to handle these cases.
```

Skills should get better over time based on real usage.

---

## Exercises

### Exercise 1: Read the Existing Skill

This repo has a working skill:

```
@.claude/skills/experiment-log/SKILL.md Explain this skill: what triggers
it, what it does, and what tools it uses.
```

### Exercise 2: Build a Project Scaffolder

Create a skill that generates a starter project:

```
Create a skill at .claude/skills/quick-project/SKILL.md that scaffolds a new
single-page web app. It should:
- Create an index.html with a basic structure
- Include embedded CSS with a clean, modern design
- Include embedded JS with a starter template
- Accept a project name as argument
- Be user-invocable

The skill should create the project in whatever directory the user specifies.
```

Test it by building something:

```
Use the quick-project skill to create a countdown timer at
experiments/06-skills-and-commands/countdown/
```

### Exercise 3: Build a Skill with Supporting Files

Create a skill that uses a template:

```
Create a skill at .claude/skills/landing-page/ that generates landing pages.
Include:
- SKILL.md with instructions for generating a landing page
- template.html with a starter HTML template the skill references
- sections.md documenting standard sections (hero, features, testimonials, CTA)

The skill should read the template and sections doc, then generate a customized
landing page based on the user's description.
```

Test it:

```
Generate a landing page for a fictional AI writing tool called "Wordsmith"
at experiments/06-skills-and-commands/wordsmith/index.html
```

### Exercise 4: Test Auto-Discovery

After creating the landing-page skill, test if Claude discovers it without explicit invocation:

```
I need a marketing page for a new product. It's a smart coffee maker
called BrewBot. Create it at experiments/06-skills-and-commands/brewbot/
```

Did Claude load the landing-page skill automatically? If not, adjust the description.

### Exercise 5: Self-Improve a Skill

After testing the landing-page skill:

```
The landing page skill didn't include a mobile-responsive design or
social proof section. Update the skill and its template to handle
responsive layouts and include a testimonials section by default.
```

---

## Key Learnings

- [ ] Read and understood an existing skill's SKILL.md format
- [ ] Built a skill from scratch that generates useful output
- [ ] Created a skill with supporting files (templates, reference docs)
- [ ] Tested auto-discovery — Claude loaded a skill without explicit invocation
- [ ] Improved a skill based on real usage
- [ ] Built 2+ working projects (countdown, landing pages) during exercises

## Resources

- [Skills Documentation](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Hooks Documentation](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [Plugins](https://docs.anthropic.com/en/docs/claude-code/plugins)
