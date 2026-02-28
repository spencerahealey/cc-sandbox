# Experiment 09: Putting It All Together

## Goal

Build a complete, working project that combines agents, skills, and everything you've learned. This is the capstone — no new concepts, just real integration. You'll pick a project, build it end to end, and make it self-improving.

## Time Estimate

~3-5 hours

---

## Pick Your Project

Choose one of the options below, or bring your own. The requirement: **use at least 3 features from previous experiments** (agents, skills, tasks, MCP, etc).

---

## Option A: Automated Code Review Pipeline

Build a system that reviews any project's code automatically.

### What you'll build

1. **Custom agents** (Experiment 05): Code quality reviewer, security auditor, documentation checker — each with scoped tools
2. **A skill** (Experiment 06): `code-review` skill that orchestrates all three agents and produces a unified report
3. **Connected MCP tools** (Experiment 07): Connect a GitHub or filesystem MCP server for enhanced file access

### What "done" looks like

```
Review the code in experiments/05-custom-agents/converter/
```

Claude triggers the skill, runs all three agents, and produces a structured review report — from a single prompt.

### Self-improving

After each review: "Update the review agents based on what they caught and missed."

---

## Option B: Project Kickstart System

Build a system that bootstraps new projects with best practices baked in.

### What you'll build

1. **A skill** (Experiment 06): `kickstart` skill that takes a project type (web app, CLI tool, API) and sets everything up
2. **Custom agents** (Experiment 05): Generated per-project agents (reviewer, implementer) tailored to the project type
3. **CLAUDE.md generation** (Experiment 03): Auto-generates a CLAUDE.md with conventions for the new project
4. **Task lists** (Experiment 04): Creates an initial task list with the first sprint of work

### What "done" looks like

```
Kickstart a new web app project at experiments/09-putting-it-all-together/my-app/
```

Claude generates CLAUDE.md, creates custom agents, builds a task list, and scaffolds the project — ready to start building.

### Self-improving

After kickstarting: "The generated CLAUDE.md was missing database conventions. Update the kickstart skill."

---

## Option C: Build Your Own

Take a real problem from your work and solve it.

### Requirements

- Use at least 3 features from experiments 00-08
- Build something you'll actually use
- Include a self-improving mechanism

### Ideas

- **Research assistant**: Agents for different source types, a skill for formatting findings, MCP tools for search
- **Content pipeline**: Agents for research, writing, and editing. Skills for different content types. Tasks for progress.
- **Deployment helper**: Skills orchestrate the deploy, agents handle stages, tasks track state
- **Code migration tool**: Agents for analysis, transformation, and validation. Skills for different migration types.

---

## The Build Process

### Step 1: Plan

```
I want to build [Option A/B/C]. Use plan mode to design the implementation.
What features do I need? What's the build order?
```

### Step 2: Build incrementally

One component at a time. Test after each:

```
Build the first component. Test it standalone before moving on.
```

### Step 3: Integrate

Connect all pieces:

```
Run the full workflow end to end. Use real inputs.
```

### Step 4: Self-improve

```
Based on how the workflow just performed, what should we improve?
Update the agents, skills, or config. Run it again.
```

### Step 5: Document

```
Create a BUILD-LOG.md documenting what we built, what worked,
what didn't, and what we improved.
```

---

## Build Log Template

Create `experiments/09-putting-it-all-together/BUILD-LOG.md`:

```markdown
# Build Log: [Project Name]

## What I Built
[2-3 sentence description]

## Features Used
- [ ] Custom agents — [how]
- [ ] Skills — [how]
- [ ] Connected MCP tools — [how]
- [ ] Agent teams — [how]
- [ ] Tasks — [how]
- [ ] CLAUDE.md patterns — [how]
- [ ] Headless mode — [how]

## What Worked
[What went smoothly]

## What Didn't Work
[What was harder than expected]

## Self-Improvement
[What changed after the first run]

## What I'd Do Differently
[Lessons for next time]
```

---

## Key Learnings

- [ ] Combined 3+ Claude Code features into a working workflow
- [ ] Built a real project end to end from planning through implementation
- [ ] Ran a self-improvement cycle — updated components based on real usage
- [ ] Documented the build with a structured build log
- [ ] Have a working system you can use (or adapt) for real work

## Resources

- All previous experiment READMEs in this repo
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code Best Practices](https://docs.anthropic.com/en/docs/claude-code/best-practices)
