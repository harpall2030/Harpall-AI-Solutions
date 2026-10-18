import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Reveal } from "@/components/site";
import { agents, money } from "@/data/site";
import { useCurrency } from "@/lib/currency";
import { useWebMCP } from "use-webmcp-tool";
import { runWebMCPTool } from "@/lib/webmcp-telemetry";
import { CurrencyToggle } from "./pricing";

export const Route = createFileRoute("/marketplace/")({
  head: () => ({
    meta: [
      { title: "AI Agent Marketplace — Harpall AI Solutions" },
      { name: "description", content: "Browse AI agent templates for sales, support, research, documents and marketing." },
      { property: "og:title", content: "AI Agent Marketplace — Harpall AI Solutions" },
      { property: "og:description", content: "Filter AI agents by category and pricing model." },
    ],
  }),
  component: Market,
});

const cats = ["All", ...Array.from(new Set(agents.map((a) => a.category)))];
const mods = ["All", "Template", "Premium", "Subscription", "Pay-per-use"];

function Chips({ list, v, set }: { list: string[]; v: string; set: (s: string) => void }) {
  return <div className="flex flex-wrap justify-center gap-2">{list.map((x) => <button key={x} onClick={() => set(x)} aria-pressed={v === x} className={`rounded-full border px-4 py-1.5 text-sm transition ${v === x ? "border-primary bg-primary/15 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{x}</button>)}</div>;
}

function Market() {
  const [cat, setCat] = useState("All"); const [mod, setMod] = useState("All");
  const { currency: c, setCurrency: setC } = useCurrency();
  const list = agents.filter((a) => (cat === "All" || a.category === cat) && (mod === "All" || a.model === mod));
  return (
    <>
      <PageHero eyebrow="Marketplace" title={<>AI agents, <span className="text-gradient">ready to work</span></>} sub="Demonstration entries — each can be set up for your business. Ask us about availability." />
      <div className="mx-auto max-w-6xl space-y-4 px-5">
        <Chips list={cats} v={cat} set={setCat} /><Chips list={mods} v={mod} set={setMod} /><CurrencyToggle c={c} set={setC} />
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((a, i) => (
          <Reveal key={a.slug} delay={i * 50}>
            <Link to="/marketplace/$slug" params={{ slug: a.slug }} className="glass card-hover flex h-full flex-col rounded-2xl p-6">
              <div className="flex justify-between text-xs"><span className="text-accent">{a.category}</span><span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">Demo · {a.model}</span></div>
              <h3 className="mt-3 text-xl font-semibold">{a.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.desc}</p>
              <p className="mt-5 font-display font-semibold">{money(a.price, c)} <span className="text-sm font-normal text-muted-foreground">{a.unit}</span></p>
            </Link>
          </Reveal>
        ))}
        {list.length === 0 && <p className="col-span-full py-16 text-center text-muted-foreground">No agents match these filters yet.</p>}
      </div>
    </>
  );
}
