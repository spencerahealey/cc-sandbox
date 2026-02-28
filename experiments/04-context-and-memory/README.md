# Experiment 04: Context and Memory

## Goal

Understand how Claude Code thinks, remembers, and forgets — then use that knowledge to run longer, more productive build sessions. You'll practice context management, session resumption, and task persistence while building a real project across multiple sessions.

## Time Estimate

~1 hour

---

## How Context Windows Work

Claude Code has a context window — a fixed amount of text it can "see" at once. Everything in the conversation takes up space: your prompts, Claude's responses, file contents, tool outputs.

### What fills it up

| Source | Impact |
|--------|--------|
| Your prompts | Small |
| Claude's responses | Medium |
| File reads (@-references, code exploration) | Large |
| Tool outputs (test results, git diffs) | Large |
| CLAUDE.md and memory | Loaded every session |

### Why it matters

When the context fills up, Claude starts forgetting earlier context, responses degrade, and you'll need to start fresh. Watch the token count.

---

## /compact — Summarize and Free Space

```
/compact
```

Takes the entire conversation, creates a compressed summary, and replaces the full history. Frees up context window space.

### When to compact

- Token usage is above 50-60%
- Claude starts repeating itself or forgetting earlier context
- You're about to start a new phase of work
- You've been exploring code and are ready to implement

### What to know

- Key decisions and file changes are preserved
- Exact wording and nuance of earlier exchanges are lost
- If something is critical, state it explicitly before compacting: "Remember: we're using the repository pattern for data access"

---

## /clear — Start Fresh

Wipes everything. Use when:

- The session has gone off the rails and /rewind won't fix it
- You're switching to a completely different task
- Context is too polluted for compacting to help

Claude still has CLAUDE.md and auto-memory, so it's not truly starting from zero.

---

## Auto-Memory (/memory)

Claude automatically saves useful context across sessions:

| | CLAUDE.md | Auto-Memory |
|---|-----------|-------------|
| **Who writes it** | You (or Claude when asked) | Claude automatically |
| **Scope** | Project-level, intentional | Personal, automatic |
| **What it contains** | Project conventions, structure | Patterns Claude noticed, your preferences |

### Viewing and editing

```
/memory
```

You can tell Claude to remember or forget things:

```
Remember: always use tabs in this project, not spaces.
```

```
Forget the note about using yarn — we switched to pnpm.
```

---

## Session Management

### --continue

Pick up the most recent session:

```bash
claude --continue
```

### --resume

Pick from a list of recent sessions:

```bash
claude --resume
```

---

## Tasks — Persistent Work Tracking

Tasks are structured to-do lists with dependencies that persist across sessions.

### Creating tasks

```
Create a task list for building a weather dashboard:
1. Build the HTML layout with search bar and display areas
2. Add CSS styling with responsive grid
3. Add JavaScript to fetch weather from a free API
4. Add 5-day forecast display
5. Add localStorage for recent searches

Task 3 depends on 1. Task 4 depends on 3. Task 5 depends on 3.
```

### Tasks across sessions

Close Claude Code, reopen later:

```bash
claude --continue
```

```
What tasks do we have? What's next?
```

Claude picks up right where you left off.

---

## Exercises

### Exercise 1: Context Awareness During a Build

Start building something and watch context fill up:

```
Build a note-taking app at experiments/04-context-and-memory/notes-app/index.html.
Single HTML file. Features: create notes with title and body, delete notes,
search/filter, store in localStorage. Clean design.
```

After Claude builds it, check:

```
/context
```

Now ask for changes — add categories, export to JSON, dark mode toggle. Check `/context` after each. When it gets high:

```
/compact
```

See the difference. Continue building with the freed-up context.

### Exercise 2: Multi-Session Project

Start a project, then continue it across sessions:

```
Build a habit tracker at experiments/04-context-and-memory/habit-tracker/index.html.
Start with just the basic layout: a list of habits with checkboxes for each day
of the week. Store state in localStorage.
```

Close Claude Code. Reopen:

```bash
claude --continue
```

```
Continue building the habit tracker. Add streak counting —
show how many consecutive days each habit was completed.
```

Close and resume again. Add one more feature:

```
Add a simple chart showing completion percentage for each habit over the last 4 weeks.
Use inline SVG bars, no libraries.
```

### Exercise 3: Task-Driven Project

Create a task list and work through it:

```
I want to build a recipe book app at experiments/04-context-and-memory/recipes/.
Create a task list:
1. HTML structure with recipe list and detail view
2. CSS styling with card layout
3. JavaScript for adding and displaying recipes
4. Search and filter by ingredient
5. Import/export recipes as JSON

Set up dependencies: 3 depends on 1, 4 depends on 3, 5 depends on 3.
Start with task 1.
```

Work through tasks across multiple prompts. Check task status as you go.

### Exercise 4: Memory Check

After the exercises above:

```
/memory
```

See what Claude auto-saved. Is it accurate? Edit anything wrong:

```
Update memory: this project organizes experiments in numbered folders,
each containing standalone tools and exercises.
```

---

## Key Learnings

- [ ] Monitored context usage and managed it with /compact during a real build
- [ ] Built a project across multiple sessions using --continue
- [ ] Created a task list with dependencies and worked through it over multiple prompts
- [ ] Reviewed and edited auto-memory entries
- [ ] Built 2-3 working tools (notes app, habit tracker, recipe book) during exercises

## Resources

- [Context Management](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Session Management](https://docs.anthropic.com/en/docs/claude-code/cli-usage#session-management)
- [Tasks](https://docs.anthropic.com/en/docs/claude-code/tasks)
