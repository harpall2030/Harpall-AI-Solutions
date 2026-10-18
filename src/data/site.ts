export type Currency = "INR" | "USD";
const USD_RATE = 1 / 83; // indicative exchange rate
// International markets are priced higher than the raw exchange conversion
// to match local market rates (US/EU/etc.).
const USD_MARKET_MULTIPLIER = 1.6;

export function money(inr: number, c: Currency) {
  if (c === "USD") {
    const usd = inr * USD_RATE * USD_MARKET_MULTIPLIER;
    const rounded = usd >= 100 ? Math.round(usd / 10) * 10 : Math.round(usd);
    return "$" + rounded.toLocaleString("en-US");
  }
  return "₹" + inr.toLocaleString("en-IN");
}

/** The 7-level offer ladder (indicative, editable prices). */
export const levels = [
  { n: 1, name: "Prompt", desc: "Expert-crafted prompt packs for one specific business task.", min: 99, max: 499, color: "l1" },
  { n: 2, name: "Template", desc: "Ready workflow + prompts + setup guide you deploy yourself.", min: 499, max: 4999, color: "l2" },
  { n: 3, name: "AI Agent", desc: "A configured agent connected to your tools and data.", min: 2000, max: 25000, color: "l3", plus: true },
  { n: 4, name: "Custom AI Agent", desc: "Built specifically for your business, process and brand.", min: 15000, max: 100000, color: "l4", plus: true },
  { n: 5, name: "AI Agent System", desc: "Multiple agents working together across departments.", min: 50000, max: 500000, color: "l5", plus: true },
  { n: 6, name: "Agent-as-a-Service", desc: "We host, monitor and improve your agent every month.", min: 5000, max: 50000, color: "l6", monthly: true },
  { n: 7, name: "AI Agent SaaS", desc: "Your agent turned into a subscription product for your users.", color: "l7", recurring: true },
] as const;

export const models = [
  {
    id: "templates", title: "AI Agent Templates", tag: "Model 1",
    pitch: "Build once, deploy many times. A complete, documented agent you can run today.",
    example: "AI Lead Generation Agent", price: 999,
    includes: ["n8n workflow", "Prompts", "System instructions", "Setup guide", "API configuration instructions", "Documentation"],
  },
  {
    id: "premium", title: "Premium Agent Templates", tag: "Model 2",
    pitch: "Not a basic workflow — a complete ready-to-deploy system that solves a bigger problem.",
    example: "AI Customer Support Agent", price: 4999,
    includes: ["RAG", "PDF knowledge base", "Memory", "Gmail integration", "WhatsApp integration", "Human escalation", "Analytics", "Documentation", "Setup video"],
  },
  {
    id: "custom", title: "Custom AI Agent Development", tag: "Model 3",
    pitch: "“We need an AI Sales Agent for our company.” We build it specifically for your business — furniture, software, retail or any industry.",
    tiers: [{ name: "Basic", price: 15000 }, { name: "Professional", price: 40000 }, { name: "Enterprise", price: 100000, plus: true }],
    note: "Exact price depends on complexity, integrations, usage and support.",
  },
  {
    id: "subscription", title: "Subscription-Based AI Agent", tag: "Model 4",
    pitch: "Use our hosted agents directly on our website. Example: AI Resume Agent.",
    tiers: [{ name: "Free", label: "5 resumes / month" }, { name: "Pro", price: 499, monthly: true }, { name: "Business", price: 2999, monthly: true }],
  },
  {
    id: "pay-per-use", title: "Pay-Per-Use AI Agents", tag: "Model 5",
    pitch: "No monthly fee. Pay only when the agent works for you.",
    usage: [{ label: "per research report", price: 50 }, { label: "per AI agent execution", price: 10 }],
  },
] as const;

export const services = [
  ["AI Agent Templates", "Documented, ready-to-run agents for common business tasks."],
  ["Premium AI Solutions", "Complete systems with knowledge bases, memory and integrations."],
  ["Custom AI Agent Development", "Agents designed around your exact process and data."],
  ["AI Agent-as-a-Service", "We host, monitor and continuously improve your agents."],
  ["AI SaaS Product Development", "Turn an agent into a subscription product."],
  ["Pay-Per-Use AI Services", "Research reports and agent runs billed by usage."],
  ["Business Process Automation", "Remove repetitive work across sales, ops and finance."],
  ["AI Chatbots & Customer Support", "24/7 answers from your PDFs, website and FAQs."],
  ["Lead Generation & Sales Automation", "Find, qualify and follow up with prospects automatically."],
  ["Research, Documents & Data Analysis", "Summaries, extraction and insights from your information."],
  ["Workflow Integration & Consulting", "Strategy and integration with the tools you already use."],
] as const;

export type Agent = {
  slug: string; name: string; category: string; model: "Template" | "Premium" | "Subscription" | "Pay-per-use";
  price: number; unit?: string; desc: string; caps: string[]; flow: string[]; reqs: string[];
};

export const agents: Agent[] = [
  { slug: "lead-generation", name: "AI Lead Generation Agent", category: "Sales", model: "Template", price: 999,
    desc: "Finds prospects that match your ideal customer, enriches their details and drafts first outreach.",
    caps: ["Prospect search", "Data enrichment", "Lead scoring", "Personalised first message"],
    flow: ["Define ideal customer", "Search & enrich", "Score leads", "Push to CRM / sheet"], reqs: ["n8n account", "OpenAI or similar API key", "Google Sheets or CRM"] },
  { slug: "customer-support", name: "AI Customer Support Agent", category: "Support", model: "Premium", price: 4999,
    desc: "Answers customer queries 24/7 from your company's PDFs, website and FAQs — with human escalation.",
    caps: ["RAG over your documents", "Conversation memory", "Gmail & WhatsApp", "Human escalation", "Analytics"],
    flow: ["Customer message", "Search knowledge base", "Draft answer", "Reply or escalate"], reqs: ["Your PDFs / FAQs", "WhatsApp Business or Gmail", "AI API key"] },
  { slug: "pdf-qa", name: "PDF Question-Answering Assistant", category: "Documents", model: "Template", price: 1499,
    desc: "Upload documents and ask questions in plain language with cited answers.",
    caps: ["Multi-PDF upload", "Cited answers", "Summaries"], flow: ["Upload PDF", "Index content", "Ask", "Cited answer"], reqs: ["AI API key", "Vector store"] },
  { slug: "research-report", name: "AI Research & Report Generator", category: "Research", model: "Pay-per-use", price: 50, unit: "per report",
    desc: "Researches a topic across the web and delivers a structured report.",
    caps: ["Web research", "Source list", "Structured report"], flow: ["Enter topic", "Gather sources", "Analyse", "Deliver report"], reqs: ["None — runs on our platform"] },
  { slug: "appointment", name: "AI Appointment Scheduling Agent", category: "Operations", model: "Template", price: 1999,
    desc: "Books, reschedules and reminds customers about appointments over chat.",
    caps: ["Calendar sync", "Reminders", "Rescheduling"], flow: ["Customer asks", "Check availability", "Book slot", "Send reminder"], reqs: ["Google Calendar", "WhatsApp or website chat"] },
  { slug: "social-media", name: "AI Social Media Assistant", category: "Marketing", model: "Subscription", price: 499, unit: "/month",
    desc: "Plans, writes and schedules on-brand posts each week.",
    caps: ["Content calendar", "Captions & hashtags", "Brand voice"], flow: ["Brand brief", "Generate ideas", "Write posts", "Schedule"], reqs: ["Social accounts"] },
  { slug: "sales-follow-up", name: "AI Sales Follow-up Agent", category: "Sales", model: "Premium", price: 3999,
    desc: "Never lose a deal to silence — timely, personalised follow-ups.",
    caps: ["Email sequences", "Reply detection", "CRM updates"], flow: ["New lead", "Wait & check", "Personalised follow-up", "Update CRM"], reqs: ["Gmail", "CRM or Sheets"] },
  { slug: "data-analysis", name: "AI Business Data Analysis Agent", category: "Research", model: "Pay-per-use", price: 10, unit: "per run",
    desc: "Ask questions about your spreadsheets and get charts and insights.",
    caps: ["Spreadsheet analysis", "Charts", "Plain-language insights"], flow: ["Upload data", "Ask question", "Analyse", "Insight + chart"], reqs: ["CSV / Excel file"] },
];

export const portfolio = [
  ["E-commerce Support Bot", "E-commerce", "Order-status and returns questions flooding inbox.", "RAG chatbot on WhatsApp with order lookup."],
  ["Agency Lead Engine", "Agencies", "Manual prospecting took 10+ hours a week.", "Lead generation + follow-up agent pair."],
  ["Clinic Booking Assistant", "Healthcare", "Missed calls meant missed appointments.", "24/7 scheduling agent with reminders."],
  ["Legal Document Reviewer", "Professional services", "Slow first-pass contract review.", "PDF Q&A with clause extraction."],
  ["Retail Sales Agent", "Retail", "Website visitors left without asking.", "Custom AI sales agent with product catalog."],
  ["Finance Report Automation", "Operations", "Monthly reports assembled by hand.", "Data analysis agent producing reports."],
  ["Resume Screening SaaS", "SaaS", "Recruiters overwhelmed with CVs.", "Subscription resume agent with tiers."],
  ["Market Research On-Demand", "Consulting", "Research briefs were slow and costly.", "Pay-per-report research agent."],
] as const;

export const faqs = [
  ["What exactly do I receive with a template?", "A working workflow, prompts, system instructions, setup guide, API configuration instructions and documentation."],
  ["Are the prices final?", "No. All prices shown are indicative and may change based on scope, integrations, usage and support. Taxes are not included."],
  ["Do you work with clients outside India?", "Yes. We work with businesses in India and worldwide, and prices can be shown in INR or USD."],
  ["Which tools do your agents connect to?", "Common integrations include Gmail, WhatsApp, Google Sheets, CRMs, calendars and your own documents."],
  ["Can you host and maintain the agent for me?", "Yes — that's our Agent-as-a-Service model, billed monthly."],
];
