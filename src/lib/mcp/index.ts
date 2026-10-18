import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listAgentsTool from "./tools/list-agents";
import getAgentTool from "./tools/get-agent";
import listServicesTool from "./tools/list-services";

// Vite inlines the stable ref; the published SUPABASE_URL may be a proxy.
const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "my-website-showcase",
  title: "My Website Showcase",
  version: "0.1.0",
  instructions:
    "Tools for Harpall AI Solutions. Use list_agents to browse the AI agent marketplace, get_agent for full details on one agent, and list_services for services and pricing levels.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
    requireOAuthClientClaim: true,
  }),
  tools: [listAgentsTool, getAgentTool, listServicesTool],
});
