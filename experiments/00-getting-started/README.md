# Experiment 00: Getting Started with Claude Code

## Goal
Install Claude Code, authenticate, run your first prompts, and learn the essential commands you'll use every day. By the end, you'll be comfortable navigating Claude Code and ready for the deeper experiments.

## What is Claude Code?
Claude Code is Anthropic's official CLI tool that puts Claude directly in your terminal. Unlike the web chat, it can read your files, run commands, edit code, and work with your entire codebase. Think of it as a senior developer pair-programming with you — one that understands your project context.

## Installation

### Step 1: Install Claude Code
```bash
# Using npm (recommended)
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

### Step 2: Authenticate
```bash
# Start Claude Code — it will prompt you to authenticate
claude

# You'll need one of:
# - Claude Pro or Max subscription (uses claude.ai OAuth)
# - Anthropic API key (set ANTHROPIC_API_KEY env var)
```

### Step 3: Verify it works
```bash
# In this repo, run:
claude -p "What files are in this repo?"
```

If you see a list of files, you're good to go.

## Exercises

### Exercise 1: Your first interactive session
Start Claude Code in this repo and try some basic prompts:

```bash
# Start interactive mode
claude

# Try these prompts (paste them one at a time):
```

```
What is this repo about? Read the CLAUDE.md and summarize it.
```

```
How many experiments are in the experiments/ folder? List them.
```

```
Read shared/utils.ts and explain what it does.
```

Type `/clear` when you're done to reset the conversation.

### Exercise 2: Essential commands
These commands work inside an interactive Claude Code session:

| Command | What it does |
|---------|-------------|
| `/help` | Show all available commands |
| `/model` | Switch between Claude models (Opus, Sonnet, Haiku) |
| `/clear` | Clear conversation and start fresh |
| `/compact` | Compress context to free up the context window |
| `/status` | Show current session info (model, tokens used, etc.) |
| `/cost` | Show API usage costs for the session |
| `/rewind` | Undo code changes by rewinding conversation — essential escape hatch |
| `/memory` | View and manage auto-memory — Claude automatically saves useful context across sessions |
| `/copy` | Interactive picker for code blocks in Claude's responses |
| `/context` | See what's loaded in context and token usage breakdown |
| `/agents` | List and create custom agents |

Try each one now inside an active session:
```
/help
```
```
/model
```
```
/status
```
```
/memory
```
```
/context
```

### Exercise 3: @-file references
You can reference files directly in your prompts using `@`:

```
Explain the code in @shared/utils.ts
```

```
Compare @experiments/05-headless-mode/README.md with @experiments/08-hooks/README.md — what's the difficulty difference?
```

```
What dependencies does @package.json list?
```

### Exercise 4: Headless mode (one-shot prompts)
Run Claude without the interactive session using `-p`:

```bash
# One-shot prompt
claude -p "Count the lines of code in this repo"

# Pipe content to Claude
cat README.md | claude -p "Summarize this in 3 bullet points"

# Save output to a file
claude -p "Generate a TypeScript hello world function" > /tmp/hello.ts
```

### Exercise 5: Up-arrow history and session resume
```bash
# Start a session
claude

# Type a prompt, get a response, then press up-arrow to recall your last prompt
# Up-arrow also navigates past session history — try it to see previous prompts

# Exit with Ctrl+C or type /exit

# Resume the LAST session (picks up where you left off):
claude --continue

# Resume a SPECIFIC session by ID:
claude --resume SESSION_ID

# Tip: --continue is "give me the last one", --resume is "give me this specific one"

# Or start fresh:
claude
```

### Exercise 6: Multi-turn conversation
Have a back-and-forth conversation to see how Claude retains context:

```
Create a simple TypeScript function called greet that takes a name and returns a greeting string.
```

```
Now add a parameter for the language (english, spanish, french) with english as default.
```

```
Write a test for this function using Jest.
```

Notice how Claude remembers the function from the first prompt and builds on it.

## Key Learnings
- [ ] Installed Claude Code and authenticated
- [ ] Can start interactive sessions with `claude`
- [ ] Know the essential commands: `/help`, `/model`, `/clear`, `/compact`, `/status`, `/rewind`, `/memory`, `/copy`, `/context`, `/agents`
- [ ] Can reference files with `@filename` in prompts
- [ ] Can run one-shot prompts with `claude -p`
- [ ] Understand `--continue` (last session) vs `--resume` (specific session) for session management
- [ ] Know up-arrow navigates prompt history across sessions
- [ ] Comfortable with multi-turn conversations

## Resources
- [Claude Code overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code quickstart](https://docs.anthropic.com/en/docs/claude-code/quickstart)
- [CLI reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference)
