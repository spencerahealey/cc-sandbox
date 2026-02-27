import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create the server
const server = new McpServer({
  name: "hello-mcp",
  version: "1.0.0",
});

// Register a simple tool
server.tool(
  "get_current_time",
  "Returns the current date and time",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: `Current time: ${new Date().toISOString()}`,
        },
      ],
    };
  }
);

// Register a tool with parameters
server.tool(
  "greet",
  "Greets someone by name",
  {
    name: z.string().describe("The name of the person to greet"),
  },
  async ({ name }) => {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${name}! Welcome to the MCP sandbox.`,
        },
      ],
    };
  }
);

// Register a tool that reads experiment status
server.tool(
  "list_experiments",
  "Lists all experiments in the sandbox with their status",
  {},
  async () => {
    const { readdirSync, existsSync } = await import("fs");
    const { join } = await import("path");

    const experimentsDir = join(process.cwd(), "experiments");
    if (!existsSync(experimentsDir)) {
      return {
        content: [{ type: "text", text: "No experiments directory found." }],
      };
    }

    const dirs = readdirSync(experimentsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => {
        const hasReadme = existsSync(join(experimentsDir, d.name, "README.md"));
        const hasCode =
          readdirSync(join(experimentsDir, d.name)).some((f) =>
            f.endsWith(".ts") || f.endsWith(".js")
          );
        return `${d.name} | README: ${hasReadme ? "✓" : "✗"} | Code: ${hasCode ? "✓" : "✗"}`;
      });

    return {
      content: [
        {
          type: "text",
          text: `Experiments:\n${dirs.join("\n")}`,
        },
      ],
    };
  }
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
