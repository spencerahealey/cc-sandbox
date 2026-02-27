# Experiment 07: Build Your Own MCP Server

## Goal
Build a custom MCP (Model Context Protocol) server from scratch and connect it to Claude Code. This is directly applicable to your Healey AI work — MCP is how you'll bridge context between tools.

## Prerequisites
- Complete Experiments 05-06
- Node.js 18+
- `@modelcontextprotocol/sdk` package

## What is MCP?
MCP is a protocol that lets AI tools (Claude Code, Claude Desktop, etc.) connect to external data sources and tools. You build a server that exposes "tools" and "resources" — Claude Code discovers and uses them automatically.

```
┌──────────────┐     MCP Protocol     ┌──────────────┐
│  Claude Code  │◄──────────────────►│  Your Server  │
│  (client)     │  tools + resources  │  (Node.js)    │
└──────────────┘                      └──────┬───────┘
                                             │
                                      ┌──────▼───────┐
                                      │  Your Data    │
                                      │  (DB, files,  │
                                      │   APIs, etc.) │
                                      └──────────────┘
```

## Setup
```bash
cd experiments/07-mcp-servers
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node tsx
```

## Exercises

### Exercise 1: Minimal MCP server (stdio)
Build the simplest possible MCP server — one tool that returns the current time.

See `servers/hello-mcp/` for the starter code.

```bash
# Test it
npx tsx servers/hello-mcp/index.ts

# Connect to Claude Code (add to .claude/settings.local.json):
# "mcpServers": {
#   "hello-mcp": {
#     "command": "npx",
#     "args": ["tsx", "experiments/07-mcp-servers/servers/hello-mcp/index.ts"]
#   }
# }
```

### Exercise 2: Project state MCP server
Build the project state server you designed in our earlier conversation. This is the PM bridge.

Tools to implement:
- `get_project_state` — returns current state of a project
- `update_project_state` — updates state with a natural language description
- `log_session` — records what happened in a coding session
- `get_overview` — cross-project summary

Start with JSON files for storage. You can upgrade to Supabase later.

### Exercise 3: MCP server with resources
Expose experiment logs as MCP resources so Claude Code can read them without you pasting.

### Exercise 4: Remote MCP server (HTTP/SSE)
Convert your stdio server to HTTP+SSE so it can work with Claude.ai web (not just local Claude Code).

## Key Learnings
- [ ] Can build a basic MCP server with stdio transport
- [ ] Understand tools vs resources in MCP
- [ ] Can connect a custom MCP server to Claude Code
- [ ] Know how to test MCP servers
- [ ] Understand stdio vs HTTP/SSE transport tradeoffs
- [ ] Can expose project state as MCP tools

## Resources
- [MCP specification](https://modelcontextprotocol.io)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Claude Code MCP integration](https://docs.anthropic.com/en/docs/claude-code/mcp)
