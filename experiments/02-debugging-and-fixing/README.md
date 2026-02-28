# Experiment 02: Debugging and Fixing Code

## Goal

Learn the most common Claude Code workflow: something's broken, and you need to fix it. You'll practice giving Claude error messages, iterating when the first fix doesn't work, debugging unfamiliar code, and building the fix-test-iterate loop that makes AI-assisted development fast.

## Time Estimate

~45 minutes

---

## The Core Loop

Debugging with Claude Code follows a simple pattern:

1. **Show Claude the error** — paste the error message, stack trace, or describe the behavior
2. **Give context** — which file, what you were doing, what you expected
3. **Let Claude fix it** — review the change, test it
4. **Iterate if needed** — if the fix doesn't work, share the new error and go again

This loop is fast. Most bugs go from "broken" to "fixed" in 1-3 iterations.

---

## Sharing Errors Effectively

### Paste the full error

Don't paraphrase. Copy the exact error message:

```
I'm getting this error when I open index.html in the browser:

Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at script.js:15:23
```

The stack trace tells Claude exactly where the problem is.

### Include what you expected

```
The form should submit and show a success message, but instead I get a blank
page and this console error: [paste error]
```

### Use @-references for context

```
@src/app.js This file throws "ReferenceError: fetch is not defined" when
I run it with Node. Line 42.
```

---

## When the First Fix Doesn't Work

This happens often. Don't start over — iterate:

```
That fix didn't work. Now I'm getting a different error:

TypeError: response.json is not a function
    at processData (app.js:45:28)
```

Claude sees the full conversation history. It knows what it already tried and adjusts.

### When to redirect vs start fresh

- **Keep going** if you're making progress (each fix gets closer)
- **/rewind** if the fix made things worse
- **/clear** if you've been going in circles for 5+ attempts

---

## Debugging Code You Didn't Write

This is one of Claude Code's superpowers. You can drop into a project you've never seen and fix bugs:

```
I cloned this repo and the app won't start. Here's the error:

Error: Cannot find module './config/database'

I don't know this codebase at all. Find the problem and fix it.
```

Claude will:
1. Explore the project structure
2. Find where the missing module should be
3. Either create it or fix the import path

### The "explore first" pattern for debugging

For complex bugs in unfamiliar code:

```
Before fixing anything, read through the files involved in this error and
explain what the code is trying to do. Then propose a fix.
```

This prevents Claude from making a surface-level fix that breaks something else.

---

## Common Debugging Scenarios

### "It works locally but not in production"

```
This works fine when I run it with `node server.js` but fails in production
with this error: [paste error]. Here's my deployment config: @deploy.yml
```

### Dependency issues

```
I ran npm install and got this error:

npm ERR! Could not resolve dependency:
npm ERR! peer react@"^17.0.0" from react-router-dom@5.3.4

How do I fix this? I want to keep my current React version.
```

### CSS/layout bugs

```
@styles.css @index.html The sidebar should be fixed on the left with the
main content scrolling next to it, but instead the sidebar overlaps the
content on mobile. Fix the responsive layout.
```

### Logic bugs

```
@calculator.js The multiply function returns the wrong result for decimal
numbers. For example, 0.1 * 0.2 gives 0.020000000000000004 instead of 0.02.
Fix this without changing the function signatures.
```

---

## Exercises

### Exercise 1: Fix a Broken Web Page

Create a deliberately broken HTML file:

```
Create a file at experiments/02-debugging-and-fixing/broken-site/index.html
with a webpage that has these intentional bugs:
1. A JavaScript error that prevents the page from loading
2. A CSS issue where content overflows its container
3. A button click handler that references a non-existent element
4. A form that submits but doesn't prevent default (causes page reload)

Make the page look like a real project - a task manager with add/delete functionality.
Don't tell me where the bugs are.
```

Now close that conversation and start fresh:

```
/clear
```

```
@experiments/02-debugging-and-fixing/broken-site/index.html
This page is broken. Open it in a browser mindset - check for JavaScript errors,
CSS issues, and broken functionality. Find and fix all the bugs.
```

Verify all fixes by checking the page works correctly.

### Exercise 2: The Iterate Loop

Build something that intentionally has a subtle bug:

```
Create a countdown timer at experiments/02-debugging-and-fixing/timer/index.html.
Set it to count down from 10 minutes. Include start, pause, and reset buttons.
But make the pause button not actually pause the internal timer - it should only
hide the display update, so when you unpause the timer has jumped ahead.
```

Now fix it:

```
@experiments/02-debugging-and-fixing/timer/index.html
The pause button is broken - when I pause and unpause, the timer jumps ahead
instead of resuming where it left off. Fix it.
```

If the first fix doesn't fully work, keep iterating with the new behavior you observe.

### Exercise 3: Debug Unfamiliar Code

Grab a small open-source project you've never seen (or create a simulated one):

```
Create a small expense tracker app at experiments/02-debugging-and-fixing/expenses/
with 3 files: index.html, app.js, and styles.css. Make it functional but include
2-3 subtle bugs: maybe a currency formatting issue, a sorting bug, or a filter
that doesn't reset properly. Don't tell me what the bugs are.
```

Then pretend you're a new developer looking at this code for the first time:

```
@experiments/02-debugging-and-fixing/expenses/index.html
@experiments/02-debugging-and-fixing/expenses/app.js
@experiments/02-debugging-and-fixing/expenses/styles.css

I inherited this expense tracker and users are reporting bugs. I haven't
seen this code before. Explore it, find any issues, and fix them. Explain
what each bug was and why the fix works.
```

### Exercise 4: Fix a Real Bug

If you have a real project with a real bug, this is the exercise:

```bash
cd ~/your-project
claude
```

```
I'm getting this error: [paste your actual error]

[any additional context about what you were doing]
```

Work through the fix-test-iterate loop on something real. This is the most valuable exercise.

---

## Key Learnings

- [ ] Fixed a broken project by pasting error messages and iterating
- [ ] Used the fix-test-iterate loop across multiple attempts
- [ ] Debugged code you didn't write using the "explore first" pattern
- [ ] Used /rewind to roll back a fix that made things worse
- [ ] Applied debugging skills to a real project (or realistic simulation)

## Resources

- [Claude Code Best Practices](https://docs.anthropic.com/en/docs/claude-code/best-practices)
- [Debugging with AI — Tips](https://docs.anthropic.com/en/docs/claude-code/best-practices#provide-feedback-for-course-correction)
