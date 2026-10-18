import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { agents } from "@/data/site";

export default defineTool({
  name: "get_agent",
  title: "Get agent details",
  description: "Get full details for one AI agent template by its slug, including capabilities, workflow and requirements.",
  inputSchema: {
    slug: z.string().min(1).describe("Agent slug, e.g. lead-generation. Use list_agents to find slugs."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const a = agents.find((x) => x.slug === slug);
    if (!a) throw new ToolError(`No agent found with slug "${slug}". Use list_agents to see available slugs.`);
    return {
      content: [{ type: "text", text: `${a.name} — ${a.desc}\nCapabilities: ${a.caps.join(", ")}\nWorkflow: ${a.flow.join(" → ")}\nRequires: ${a.reqs.join(", ")}` }],
      structuredContent: {
        agent: {
          slug: a.slug,
          name: a.name,
          category: a.category,
          model: a.model,
          priceInr: a.price,
          unit: a.unit ?? null,
          description: a.desc,
          capabilities: [...a.caps],
          workflow: [...a.flow],
          requirements: [...a.reqs],
        },
      },
    };
  },
});
