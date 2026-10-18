import { defineTool } from "@lovable.dev/mcp-js";
import { levels, services } from "@/data/site";

export default defineTool({
  name: "list_services",
  title: "List services and pricing levels",
  description: "List Harpall AI Solutions' services and the 7-level product ladder with indicative INR price ranges.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text:
          "Services:\n" +
          services.map(([name, desc]) => `- ${name}: ${desc}`).join("\n") +
          "\n\nProduct ladder (indicative INR prices):\n" +
          levels.map((l) => `${l.n}. ${l.name} — ${l.desc}`).join("\n"),
      },
    ],
    structuredContent: {
      services: services.map(([name, description]) => ({ name, description })),
      levels: levels.map((l) => ({
        level: l.n,
        name: l.name,
        description: l.desc,
        minInr: "min" in l ? l.min : null,
        maxInr: "max" in l ? l.max : null,
        monthly: "monthly" in l ? l.monthly === true : false,
      })),
    },
  }),
});
