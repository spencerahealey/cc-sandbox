# Experiment 01: Steering Claude Code

## Goal

Master the most important skill for building with AI: controlling what Claude does and doesn't do. You'll practice plan mode, constraint-based prompting, scoping, and course-correction — all while building a real project.

## Time Estimate

~45 minutes

---

## Plan Mode vs Act Mode

Claude Code has two modes, toggled with **Shift+Tab**:

- **Act mode** (default) — Claude reads, writes, and executes. It makes changes.
- **Plan mode** — Claude researches and plans but doesn't modify anything. It proposes changes for your approval.

### When to use Plan Mode

- You're working on something complex and want to see the approach first
- You're in an unfamiliar codebase and want Claude to explore first
- The task has multiple valid approaches and you want to pick one
- You want Claude to think through edge cases before writing code

You can also request it in natural language:

```
Plan how you'd build a URL shortener. Don't write any code yet.
```

After reviewing, tell Claude to execute:

```
That plan looks good. Go ahead and implement it.
```

---

## Giving Constraints, Not Just Tasks

The single biggest improvement to your prompts: **tell Claude what NOT to do.**

### Vague prompt

```
Build me a to-do app.
```

Claude picks a framework, a storage strategy, file structure — you spend 20 minutes reviewing choices you didn't want.

### Constrained prompt

```
Build a to-do app in a single HTML file at experiments/01-steering-claude-code/todo/index.html.
Use vanilla JavaScript, no frameworks. Store todos in localStorage. Include add, complete,
and delete functionality. Keep it under 200 lines. Clean, minimal design.
```

### Constraint patterns that work

| Constraint | Example |
|-----------|---------|
| **File scope** | "Put everything in a single file" or "Only touch files in /src/api/" |
| **Off-limits** | "Don't modify the database schema" |
| **Verification** | "Test it after every change" |
| **Technology choice** | "Use vanilla JS, no frameworks" |
| **Style** | "Match the patterns in the existing codebase" |
| **Size** | "Keep it under 100 lines" |

---

## Scoping Work with @-References

Don't make Claude search the whole codebase. Tell it where to look:

```
@src/api/routes.ts @src/api/middleware.ts Add rate limiting to these routes.
```

This saves context window space and prevents Claude from wandering into unrelated code.

---

## One Big Prompt vs Multiple Small Ones

### One prompt works when:
- The task is well-defined and self-contained
- You can describe it fully in a few sentences
- The scope is narrow (1-3 files)

### Break it up when:
- The task has distinct phases (research → plan → implement)
- Each step depends on what you learn from the previous one
- You want to review intermediate results

---

## Course-Correcting

### /rewind — undo and redirect

```
/rewind
```

Undoes Claude's last turn, including code changes. Then give better instructions:

```
That approach was too complex. Just use a simple Map for caching.
```

### When to rewind vs redirect vs clear

- **/rewind** — Claude wrote code you don't want. Roll it back.
- **Redirect** (just type) — Claude's on the right track but needs adjustment.
- **/clear** — The session is too far gone. Start fresh.

---

## The "Explore First, Then Act" Pattern

The most important pattern for working in unfamiliar codebases:

```
# Step 1: Explore
Read through the src/ directory. Summarize the architecture.

# Step 2: Understand conventions
What patterns does this codebase follow? How are errors handled?

# Step 3: Then act
Now add error logging to the payment module, following the same patterns.
```

Without steps 1-2, Claude imposes its own conventions instead of matching yours.

---

## Exercises

### Exercise 1: Vague vs Constrained

Give Claude a vague prompt:

```
Build me a calculator.
```

See what you get. Then `/clear` and try:

```
Build a calculator at experiments/01-steering-claude-code/calculator/index.html.
Single HTML file, vanilla JS, no frameworks. Support +, -, *, / and a clear button.
Keyboard input should work. Clean grid layout. Under 150 lines.
```

Compare the results. Notice how constraints produce exactly what you want.

### Exercise 2: Plan Mode Architecture

Toggle to plan mode (Shift+Tab) and design before building:

```
Plan a simple bookmark manager app. Single HTML file, stores bookmarks in
localStorage. Features: add bookmark (URL + title + tags), delete, search by
tag, import/export as JSON. Show me the plan before writing any code.
```

Review the plan. Give feedback. Then switch back to act mode and let Claude build it.

### Exercise 3: Rewind Recovery

Intentionally let Claude go in the wrong direction:

```
Build a multi-page website with React for a portfolio.
```

Wait for it to start scaffolding, then:

```
/rewind
```

Now redirect:

```
Actually, build a single-page portfolio at experiments/01-steering-claude-code/portfolio/index.html.
Single HTML file, no build tools. Include sections for about, projects, and contact.
```

Notice how `/rewind` cleanly rolls back the React scaffolding.

### Exercise 4: Explore an Unfamiliar Codebase

Pretend you just cloned this repo:

```
I just cloned this repo and I've never seen it. Read through the project structure,
CLAUDE.md, and 2-3 experiment READMEs. Give me a 1-paragraph summary of what this
is, who it's for, and what's the best way to use it.
```

Then act on what Claude learned:

```
Based on your understanding of this project, create a cheat sheet at
experiments/01-steering-claude-code/cheatsheet.md that lists every Claude Code
command and technique mentioned across the experiments. Group by category.
```

---

## Key Learnings

- [ ] Used plan mode (Shift+Tab) to design before building
- [ ] Built a project with a constrained prompt that produced exactly what you wanted
- [ ] Used @-references to scope Claude's attention
- [ ] Recovered from a wrong direction using /rewind
- [ ] Applied the "explore first, then act" pattern

## Resources

- [Claude Code Best Practices](https://docs.anthropic.com/en/docs/claude-code/best-practices)
- [Prompt Engineering for Claude Code](https://docs.anthropic.com/en/docs/claude-code/best-practices#give-claude-the-right-amount-of-context)
