import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Reveal } from "@/components/site";
import { portfolio } from "@/data/site";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Harpall AI Solutions" },
      { name: "description", content: "Sample AI agent projects across e-commerce, agencies, healthcare, retail and SaaS." },
      { property: "og:title", content: "Portfolio — Harpall AI Solutions" },
      { property: "og:description", content: "Illustrative AI automation projects." },
    ],
  }),
  component: Portfolio,
});

const inds = ["All", ...portfolio.map((p) => p[1])];

function Portfolio() {
  const [f, setF] = useState("All");
  return (
    <>
      <PageHero eyebrow="Portfolio" title={<>What AI agents <span className="text-gradient">can solve</span></>} sub="Sample projects shown to illustrate our approach — not real client results." />
      <div className="flex flex-wrap justify-center gap-2 px-5">
        {inds.map((x) => <button key={x} onClick={() => setF(x)} aria-pressed={f === x} className={`rounded-full border px-4 py-1.5 text-sm ${f === x ? "border-primary bg-primary/15" : "text-muted-foreground"}`}>{x}</button>)}
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl gap-5 px-5 md:grid-cols-2">
        {portfolio.filter((p) => f === "All" || p[1] === f).map(([t, ind, prob, sol], i) => (
          <Reveal key={t} delay={(i % 2) * 80}>
            <article className="glass card-hover overflow-hidden rounded-2xl">
              <div className="relative h-36 bg-brand opacity-80"><div className="grid-bg absolute inset-0" /><span className="absolute bottom-3 left-4 rounded-full bg-background/70 px-3 py-1 text-xs">Sample · {ind}</span></div>
              <div className="p-6">
                <h2 className="text-xl font-semibold">{t}</h2>
                <p className="mt-3 text-sm"><span className="text-muted-foreground">Problem:</span> {prob}</p>
                <p className="mt-1 text-sm"><span className="text-muted-foreground">Solution:</span> {sol}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </>
  );
}
