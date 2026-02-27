# Contributing to cc-sandbox

Thanks for wanting to make this better. Here's how.

## Adding an experiment

1. Use `/new-experiment <n>` inside Claude Code, or manually create a folder under `experiments/` with the next number
2. Every experiment needs a `README.md` with: Goal, Setup, Exercises (copy-paste runnable), Key Learnings checklist, and Resources
3. Include working code — not pseudo-code. People should be able to run every example.
4. Update the root `README.md` experiments table

## Improving existing experiments

- Fix mistakes or outdated information
- Add exercises you found useful
- Add "Gotchas" you discovered the hard way
- Improve explanations — shorter is better

## Adding slash commands or skills

- Commands go in `.claude/commands/`
- Skills go in `.claude/skills/<skill-name>/SKILL.md`
- Include frontmatter with `description` so Claude knows when to use them

## Standards

- TypeScript by default unless the experiment requires something else
- Every exercise should be runnable as-is (no "fill in the blanks")
- Keep READMEs practical — code over theory
- Test your changes by actually running them in Claude Code

## Pull requests

1. Fork the repo
2. Create a branch
3. Make your changes
4. Test in Claude Code
5. Open a PR with a clear description of what you added/changed

No issue required for small fixes. For new experiments, open an issue first to discuss scope.
