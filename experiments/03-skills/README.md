# Experiment 03: Building Custom Skills

## Goal
Learn to build custom skills for Claude Code — reusable, auto-discoverable prompt templates that extend what Claude can do in your project. Skills are how you teach Claude Code new tricks specific to your workflow.

## What Are Skills?
Skills are markdown files with a special format that Claude Code discovers and can invoke automatically. They live in `.claude/skills/` and each one teaches Claude a specific capability:

- **experiment-log** — knows how to log experiment results in a consistent format
- **code-review** — knows your team's review checklist and standards
- **deploy** — knows the steps to deploy your specific project

Think of skills as "expert instructions on demand." Claude loads them only when relevant, keeping context clean.

## Skills vs Slash Commands

Slash commands (which previously lived in `.claude/commands/`) have been merged into the skills system. The key differences:

| Feature | Skills (`.claude/skills/`) | Legacy Commands (`.claude/commands/`) |
|---------|---------------------------|--------------------------------------|
| Discovery | Auto-discovered by Claude when relevant | Must be invoked explicitly with `/` |
| Format | SKILL.md with YAML frontmatter | Plain markdown |
| Triggering | Claude decides when they're relevant OR invoked manually | Manual only |
| Supporting files | Can include helper files alongside SKILL.md | Single file only |

New projects should use skills. Existing slash commands still work but the skills system is the future.

## SKILL.md Format

Every skill lives in its own folder under `.claude/skills/` and has a `SKILL.md` file:

```
.claude/skills/
├── my-skill/
│   ├── SKILL.md          # Required: skill definition
│   ├── template.ts       # Optional: supporting files
│   └── checklist.md      # Optional: supporting files
```

### The SKILL.md structure

```markdown
---
name: my-skill-name
description: One-line description of what this skill does. Claude uses this to decide when to invoke it.
---

Instructions for Claude when this skill is activated.

You can reference supporting files with relative paths.
Use the template in ./template.ts as a starting point.
Follow the checklist in ./checklist.md.
```

### YAML Frontmatter Fields
- **`name`** (required): Identifier for the skill. Used for manual invocation.
- **`description`** (required): Claude reads this to decide if the skill is relevant to the current task. Write it like a search query — be specific about when this skill should activate.
- **`context: fork`** (optional): Runs the skill in a forked (isolated) context, so it doesn't pollute your main session's context window. Use for skills that read many files or produce verbose output.
- **`agent`** (optional): Delegates skill execution to a specific Custom Agent (from `.claude/agents/`). The agent handles the skill's instructions with its own tools and permissions.
- **`user-invocable`** (optional): When `true`, the skill appears in the `/` command menu for manual invocation. Default behavior is auto-discovery only.
- **`disable-model-invocation`** (optional): When `true`, prevents Claude from auto-invoking this skill — it can only be triggered manually. Useful for destructive or expensive operations you want explicit control over.
- **`argument-hint`** (optional): Hint text shown in the command menu describing what argument the skill expects (e.g., `"<filename>"`, `"<component-name>"`).

### The Body
Plain markdown instructions that Claude follows when the skill is active. This is where you put:
- Step-by-step procedures
- Templates and patterns to follow
- Rules and constraints
- References to supporting files

## Auto-Discovery: How It Works
When you give Claude a prompt, it checks all skill descriptions against your request. If a skill's description matches, Claude loads that skill's instructions. You don't have to ask for it.

Example: If you have a skill with description "Log experiment results and learnings", and you say "I finished the hooks experiment, let me log what I learned" — Claude will automatically activate the experiment-log skill.

## Real Example: experiment-log Skill
This repo already has a working skill. Look at it:

```
.claude/skills/experiment-log/SKILL.md
```

```yaml
---
name: experiment-log
description: Log experiment results and learnings. Use when finishing an experiment, documenting what worked/failed, or updating experiment status.
---

When logging experiment results:

1. Find the experiment's README.md in its folder under `experiments/`
2. Update the "## Key Learnings" section with checked items
3. Add a new section "## Results" if it doesn't exist, with:
   - Date completed
   - What worked
   - What didn't work
   - Unexpected discoveries
   - Next steps or follow-up experiments
4. Create or append to `logs/experiment-log.md` with a one-liner summary
5. If the experiment revealed something useful, suggest updating CLAUDE.md
```

Note how the description is written like a trigger phrase — it tells Claude exactly when this skill is relevant.

## Exercises

### Exercise 1: Explore the existing skill
Read and understand the experiment-log skill:

```
Read @.claude/skills/experiment-log/SKILL.md and explain how it works. When would Claude automatically invoke this skill?
```

Then trigger it intentionally:
```
I just finished the getting-started experiment. Log my results: everything worked, I learned the basic commands, and I discovered that /compact is more useful than I expected.
```

Watch Claude follow the skill's instructions automatically.

### Exercise 2: Build a skill from scratch
Create a "new-file" skill that helps scaffold new TypeScript files with consistent boilerplate:

```bash
mkdir -p .claude/skills/new-file
```

```
Create a skill at .claude/skills/new-file/SKILL.md that activates when I ask to create a new TypeScript file. It should:
1. Ask what type of file (utility, test, script, module)
2. Use consistent headers (author comment, imports style)
3. Add the file to the appropriate directory based on type
4. Create a corresponding test file if it's not already a test

Use this SKILL.md format:
---
name: new-file
description: <write a good description>
---
<instructions>
```

### Exercise 3: Test auto-discovery
After creating the skill in Exercise 2, test that Claude discovers it automatically:

```
/clear
```

```
I need to create a new utility function for formatting dates. Create the TypeScript file for me.
```

Did Claude activate the new-file skill without you asking? Check by looking at whether it followed the skill's specific steps.

### Exercise 4: Build a skill with supporting files
Create a more complex skill that uses supporting files:

```bash
mkdir -p .claude/skills/api-endpoint
```

Create a skill that scaffolds API endpoints using a template:

```
Create a skill at .claude/skills/api-endpoint/ with:
1. SKILL.md — activates when creating API endpoints, references the template
2. template.ts — a starter template for a tRPC or Express endpoint
3. checklist.md — validation checklist (input validation, error handling, auth, tests)

The SKILL.md should tell Claude to use the template and checklist when creating any new API endpoint.
```

Then test it:
```
/clear
```

```
I need to create a new API endpoint for fetching user profiles.
```

### Exercise 5: Write good skill descriptions
The description field is critical for auto-discovery. Practice writing descriptions:

```
For each of these skills, write a description that would trigger at the right time:
1. A skill that generates database migration files
2. A skill that writes PR descriptions
3. A skill that creates React components following your team's patterns
4. A skill that generates test fixtures from API responses

For each one, also list 3 prompts that SHOULD trigger it and 2 that SHOULD NOT.
```

## Plugins Ecosystem
Skills are part of a larger ecosystem. The **Plugins** system bundles skills, agents, and hooks into shareable packages:

- **`/plugins discover`** — browse the plugin marketplace for community-contributed bundles
- **Plugins** = skills + agents + hooks packaged together (e.g., a "React development" plugin might include a component-scaffolding skill, a component-reviewer agent, and a post-edit lint hook)
- Plugins are installed per-project or per-user

This is still evolving — for now, focus on building individual skills. But know that plugins exist when you're ready to share or consume bundles.

## Agent Skills Open Standard
The **Agent Skills Open Standard** ([agentskills.io](https://agentskills.io)) defines a cross-agent-compatible format for skills. If you write skills following this standard, they can work not just in Claude Code but in any agent that supports the standard.

This is worth knowing about if you're building skills that might be shared beyond your team or used with multiple AI tools.

## Key Learnings
- [ ] Understand the SKILL.md format (YAML frontmatter + markdown body)
- [ ] Know the `name` and `description` fields and why description matters
- [ ] Understand auto-discovery — Claude matches descriptions to your prompts
- [ ] Know the difference between skills and legacy slash commands
- [ ] Know the advanced frontmatter fields: `context: fork`, `agent`, `user-invocable`, `disable-model-invocation`, `argument-hint`
- [ ] Can build a basic skill from scratch
- [ ] Can build a skill with supporting files (templates, checklists)
- [ ] Can write effective skill descriptions for reliable auto-discovery
- [ ] Understand the `.claude/skills/` directory structure
- [ ] Aware of the Plugins ecosystem and Agent Skills Open Standard

## Resources
- [Claude Code skills documentation](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Custom slash commands (legacy)](https://docs.anthropic.com/en/docs/claude-code/slash-commands)
- [Skills directory structure](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Agent Skills Open Standard](https://agentskills.io)
