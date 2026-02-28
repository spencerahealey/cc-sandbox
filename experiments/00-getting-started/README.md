# Experiment 00: Getting Started

## Goal

Install Claude Code, build your first project with it, and learn the essential commands. In 20 minutes, you'll go from zero to having a working website you built entirely by prompting.

## Time Estimate

~20 minutes

---

## Step 1: Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Verify it's installed:

```bash
claude --version
```

### Authenticate

Run `claude` in any directory. On first launch, it walks you through authentication. You need one of:

- **Claude Pro/Max subscription** — authenticates via your Anthropic account
- **API key** — set `ANTHROPIC_API_KEY` in your environment

Once authenticated, you'll see the Claude Code prompt. You're in.

---

## Step 2: Build Something

Open Claude Code in this repo:

```bash
cd cc-sandbox
claude
```

Now tell Claude to build a project:

```
Create a personal landing page at experiments/00-getting-started/my-site/index.html.
Include my name (use a placeholder), a short bio section, 3 project cards with
placeholder content, and a contact section. Make it look polished with modern CSS.
Single HTML file with embedded styles. Dark theme.
```

Open the file in your browser. You just built a website by typing a sentence.

Now iterate on it:

```
Add smooth scrolling for navigation links, a gradient background,
and hover animations on the project cards.
```

**This is the core loop:** describe what you want → get it → refine it.

---

## Step 3: Learn the Essential Commands

Now that you've seen Claude Code in action, here are the commands you'll use regularly:

| Command | What it does |
|---------|-------------|
| `/help` | Show all available commands |
| `/compact` | Summarize the conversation to free up space (use when sessions get long) |
| `/clear` | Wipe the conversation and start fresh |
| `/rewind` | Undo Claude's last action (rolls back code changes too) |
| `/model` | Switch between models (Opus, Sonnet, Haiku) |
| `/memory` | View what Claude remembers across sessions |
| `/context` | Show how much of the context window is used |

You don't need to memorize these. Just know `/help` exists and you can find them anytime.

### @-File References

Load specific files into context without copy-pasting:

```
@README.md what does this project do?
```

You can reference multiple files:

```
@CLAUDE.md @README.md how are these different?
```

### Picking Up Where You Left Off

Close Claude Code and come back later:

```bash
claude --continue    # Resume the most recent session
claude --resume      # Pick from a list of recent sessions
```

---

## Step 4: Try the Commands

Now practice what you just learned:

1. **Check context usage:** `/context` — see how much space the conversation is using
2. **Compact:** `/compact` — watch the token count drop
3. **Use @-references:** `@experiments/00-getting-started/README.md how many exercises are in this experiment?`
4. **Check memory:** `/memory` — see what Claude auto-saved about your work
5. **Close and resume:** Exit with `Ctrl+C`, then run `claude --continue` — ask "what were we working on?"

---

## Key Learnings

- [ ] Installed Claude Code and authenticated
- [ ] Built a landing page entirely by prompting
- [ ] Iterated on the project with follow-up prompts
- [ ] Used `/compact` and `/context` to manage the conversation
- [ ] Closed and resumed a session with `--continue`

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code CLI Reference](https://docs.anthropic.com/en/docs/claude-code/cli-usage)
