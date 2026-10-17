import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ArrowLeft } from "lucide-react";
import { CTA } from "@/components/site";
import { agents, money } from "@/data/site";

export const Route = createFileRoute("/marketplace/$slug")({
  loader: ({ params }) => {
    const a = agents.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Harpall AI Solutions` },
          { name: "description", content: loaderData.desc },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: loaderData.desc },
        ]
      : [{ title: "Agent not found" }, { name: "robots", content: "noindex" }],
  }),
  component: Detail,
});

function Detail() {
  const a = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Marketplace</Link>
      <p className="rise mt-8 text-xs text-accent">{a.category} · {a.model} · Demonstration</p>
      <h1 className="rise mt-2 text-4xl font-semibold md:text-5xl">{a.name}</h1>
      <p className="rise mt-4 max-w-2xl text-lg text-muted-foreground">{a.desc}</p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="glass rounded-2xl p-6 md:col-span-2">
          <h2 className="text-xl font-semibold">Workflow</h2>
          <ol className="mt-5 flex flex-wrap items-center gap-3">
            {a.flow.map((s, i) => <li key={s} className="flex items-center gap-3"><span className="rounded-xl bg-muted px-4 py-2 text-sm">{s}</span>{i < a.flow.length - 1 && <span className="text-accent">→</span>}</li>)}
          </ol>
          <h2 className="mt-8 text-xl font-semibold">Capabilities</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">{a.caps.map((x) => <li key={x} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-accent" />{x}</li>)}</ul>
          <h2 className="mt-8 text-xl font-semibold">Requirements</h2>
          <ul className="mt-4 space-y-1 text-sm text-muted-foreground">{a.reqs.map((x) => <li key={x}>• {x}</li>)}</ul>
        </div>
        <aside className="glass h-fit rounded-2xl p-6">
          <p className="text-sm text-muted-foreground">Indicative price</p>
          <p className="font-display text-3xl font-semibold text-gradient">{money(a.price, "INR")}</p>
          <p className="text-sm text-muted-foreground">{a.unit ?? "one-time"} · ≈ {money(a.price, "USD")}</p>
          <div className="mt-6"><CTA to="/contact">Request this agent</CTA></div>
        </aside>
      </div>
    </div>
  );
}
