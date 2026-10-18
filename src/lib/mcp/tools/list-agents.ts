import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { agents } from "@/data/site";

const toAgentJson = (a: (typeof agents)[number]) => ({
  slug: a.slug,
  name: a.name,
  category: a.category,
  model: a.model,
  priceInr: a.price,
  unit: a.unit ?? null,
  description: a.desc,
});

export default defineTool({
  name: "list_agents",
  title: "List AI agents",
  description: "List the AI agent templates offered in the Harpall AI Solutions marketplace, optionally filtered by category or pricing model.",
  inputSchema: {
    category: z.string().optional().describe("Filter by category, e.g. Sales, Support, Research, Documents, Marketing, Operations."),
    model: z.enum(["Template", "Premium", "Subscription", "Pay-per-use"]).optional().describe("Filter by pricing model."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, model }) => {
    const list = agents.filter(
      (a) =>
        (!category || a.category.toLowerCase() === category.toLowerCase()) &&
        (!model || a.model === model),
    );
    return {
      content: [
        {
          type: "text",
          text: list.length
            ? list.map((a) => `${a.name} (${a.category}, ${a.model}) — ₹${a.price}${a.unit ? " " + a.unit : ""}`).join("\n")
            : "No agents match those filters.",
        },
      ],
      structuredContent: { agents: list.map(toAgentJson) },
    };
  },
});
