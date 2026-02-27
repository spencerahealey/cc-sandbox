# Experiment 08: Hooks

## Goal
Learn to use Claude Code hooks — deterministic shell commands that fire at specific points in Claude's workflow. Hooks are the "must-do" rules vs CLAUDE.md's "should-do" suggestions.

## Prerequisites
- Complete Experiments 05-07
- Understanding of shell scripting basics

## Hook Events (8 total)

| Hook | When it fires | Use case |
|------|--------------|----------|
| `UserPromptSubmit` | After you hit enter, before Claude processes | Logging, context injection |
| `PreToolUse` | Before Claude runs any tool | Block dangerous commands, validate |
| `PostToolUse` | After a tool completes | Lint after edits, run tests |
| `Notification` | When Claude wants your attention | Desktop notifications, Slack alerts |
| `Stop` | When Claude finishes a response | Auto-commit, cleanup |
| `SubagentStop` | When a subagent finishes | Aggregate results |
| `TeammateIdle` | When a teammate is about to go idle | Keep them working |
| `TaskCompleted` | When a task is marked complete | Verify before accepting |

## Setup
Configure hooks via `/hooks` command in Claude Code (interactive menu) or manually in `.claude/settings.json`.

## Exercises

### Exercise 1: Logging hook
Log every prompt you submit with a timestamp.

```json
{
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{
        "type": "command",
        "command": "echo \"$(date '+%Y-%m-%d %H:%M:%S') | $CLAUDE_USER_PROMPT\" >> logs/prompt-log.txt"
      }]
    }]
  }
}
```

### Exercise 2: Auto-lint after edits
Run ESLint on any TypeScript file Claude modifies.

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "npx eslint --fix \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
      }]
    }]
  }
}
```

### Exercise 3: Block dangerous commands
Prevent Claude from running `rm -rf`, `git push --force`, or modifying `.env` files.

### Exercise 4: Desktop notifications
Get notified when Claude finishes a long task (macOS):

```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "osascript -e 'display notification \"Claude Code finished!\" with title \"CC Sandbox\"'"
      }]
    }]
  }
}
```

### Exercise 5: Pre-commit test gate (advanced)
Block `git commit` unless all tests pass. This is the most powerful hook pattern.

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash(git commit:*)",
      "hooks": [{
        "type": "command",
        "command": "test -f /tmp/tests-passed || (echo 'Tests must pass before committing. Run tests first.' && exit 2)"
      }]
    }]
  }
}
```

## Hook Exit Codes
- `0` — Continue normally
- `2` — Block the action and send feedback message to Claude
- Any other — Ignored (hook failure doesn't block Claude)

## Key Learnings
- [ ] Understand the 8 hook events and when they fire
- [ ] Can configure hooks via `/hooks` or settings.json
- [ ] Know exit code 0 (allow) vs 2 (block with feedback)
- [ ] Can build a pre-commit test gate
- [ ] Understand block-at-submit vs block-at-write patterns
- [ ] Know that blocking mid-edit confuses Claude — block at commit instead

## Pro Tips
- Use `PostToolUse` + `Edit` matcher for auto-formatting
- Use `PreToolUse` + `Bash(git commit)` for quality gates
- Don't block `Write` or `Edit` directly — let Claude finish, then validate at commit
- Hooks are deterministic. CLAUDE.md is suggestive. Use both.

## Resources
- [Hooks documentation](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [Shrivu's hook patterns](https://blog.sshh.io/p/how-i-use-every-claude-code-feature)
