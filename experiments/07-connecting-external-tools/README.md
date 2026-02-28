# Experiment 07: Connecting External Tools

## Goal

Connect Claude Code to external services via MCP (Model Context Protocol) so it can use tools beyond its built-in set. You'll find existing MCP servers, connect them, and use them in a real workflow.

## Time Estimate

~45 minutes

---

## What MCP Is

MCP lets Claude Code talk to external services. You connect a server, Claude gets new tools — just like its built-in Read, Write, and Bash tools, but for anything: files, databases, APIs, GitHub, Slack, Notion.

You don't need to build anything. Hundreds of MCP servers already exist for popular services. You just connect them.

---

## Finding MCP Servers

| Source | What's there |
|--------|-------------|
| [mcp.so](https://mcp.so) | Curated directory with categories and install instructions |
| [GitHub: MCP Servers](https://github.com/modelcontextprotocol/servers) | Official and community servers |
| npm | Search for `mcp-server-*` or `@modelcontextprotocol/server-*` |

### Popular servers

| Server | What it does |
|--------|-------------|
| `@modelcontextprotocol/server-filesystem` | Read/write/search files in specified directories |
| `@modelcontextprotocol/server-github` | Issues, PRs, repos, code search |
| `@modelcontextprotocol/server-memory` | Persistent knowledge graph |
| `@modelcontextprotocol/server-brave-search` | Web search |

---

## Connecting a Server

### Via CLI

```bash
claude mcp add <name> -- <command> [args...]
```

Example — filesystem server:

```bash
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem $(pwd)
```

### Via config file

Edit `.claude/settings.local.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"],
      "env": {}
    }
  }
}
```

### Servers that need API keys

Pass keys via `env`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token"
      }
    }
  }
}
```

**Don't commit API keys.** Use `.claude/settings.local.json` (gitignored).

### Managing servers

```bash
claude mcp list      # List connected servers
claude mcp remove <name>  # Remove a server
```

---

## Using MCP Tools

Once connected, Claude uses MCP tools naturally. No special syntax:

```
Search my files for anything related to authentication.
```

Claude sees the filesystem server's `search_files` tool and uses it.

```
What MCP tools do you have available?
```

Lists all tools from connected servers.

---

## Exercises

### Exercise 1: Connect the Filesystem Server

```bash
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem $(pwd)
```

Start a new session, then:

```
What MCP tools do you have? Use the filesystem tools to find all README files
in this project and tell me which experiment has the longest README.
```

### Exercise 2: Add a Server via Config

```
Add the memory MCP server (@modelcontextprotocol/server-memory) to
.claude/settings.local.json manually.
```

Restart Claude Code and test:

```
Use the memory tools to store a note: "Currently working on experiment 07,
learning MCP." Then retrieve it.
```

### Exercise 3: Connect Something You Actually Use

Browse [mcp.so](https://mcp.so) and find a server for a tool you use — GitHub, a database, a note-taking app, or anything relevant to your work.

Connect it and use it in a real task. The goal is to find something you'll keep using after this experiment.

---

## Key Learnings

- [ ] Connected an MCP server using `claude mcp add`
- [ ] Added an MCP server to config manually
- [ ] Verified Claude discovers and uses MCP tools automatically
- [ ] Connected a server relevant to your actual workflow

## Resources

- [MCP Documentation](https://docs.anthropic.com/en/docs/claude-code/mcp-servers)
- [MCP Server Directory](https://mcp.so)
- [Official MCP Servers](https://github.com/modelcontextprotocol/servers)
