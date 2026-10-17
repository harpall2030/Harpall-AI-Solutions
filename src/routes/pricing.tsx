import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { CTA, PageHero, Reveal } from "@/components/site";
import { models, money, type Currency } from "@/data/site";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Harpall AI Solutions" },
      { name: "description", content: "Templates from ₹999, premium agents from ₹4,999, custom agents from ₹15,000, subscriptions and pay-per-use." },
      { property: "og:title", content: "Pricing — Harpall AI Solutions" },
      { property: "og:description", content: "Five ways to buy AI agents: templates, premium, custom, subscription and pay-per-use." },
    ],
  }),
  component: Pricing,
});

export function CurrencyToggle({ c, set }: { c: Currency; set: (c: Currency) => void }) {
  return (
    <div className="glass mx-auto flex w-fit rounded-full p-1 text-sm" role="group" aria-label="Currency">
      {(["INR", "USD"] as const).map((x) => (
        <button key={x} onClick={() => set(x)} aria-pressed={c === x} className={`rounded-full px-4 py-1.5 transition ${c === x ? "bg-brand text-primary-foreground" : "text-muted-foreground"}`}>{x}</button>
      ))}
    </div>
  );
}

function Pricing() {
  const [c, setC] = useState<Currency>("INR");
  return (
    <>
      <PageHero eyebrow="Pricing" title={<>Five ways to <span className="text-gradient">buy AI</span></>} sub="Pick the model that fits your stage. All prices are indicative draft prices, excluding taxes." />
      <CurrencyToggle c={c} set={setC} />
      <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 lg:grid-cols-2">
        {models.map((m, i) => (
          <Reveal key={m.id} delay={i * 60}>
            <article id={m.id} className="glass card-hover flex h-full flex-col rounded-3xl p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{m.tag}</p>
              <h2 className="mt-2 text-2xl font-semibold">{m.title}</h2>
              <p className="mt-3 text-muted-foreground">{m.pitch}</p>
              {"example" in m && (
                <div className="mt-6 rounded-2xl bg-muted p-5">
                  <p className="text-sm text-muted-foreground">Example</p>
                  <p className="font-display text-lg font-semibold">{m.example} — <span className="text-gradient">{money(m.price, c)}</span></p>
                  <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    {m.includes.map((x) => <li key={x} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-accent" />{x}</li>)}
                  </ul>
                </div>
              )}
              {"tiers" in m && (
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {m.tiers.map((t) => (
                    <div key={t.name} className="rounded-2xl bg-muted p-4 text-center">
                      <p className="text-sm text-muted-foreground">{t.name}</p>
                      <p className="mt-1 font-display font-semibold">
                        {"price" in t ? `${money(t.price, c)}${"plus" in t ? "+" : ""}` : t.label}
                        {"monthly" in t && <span className="text-xs font-normal text-muted-foreground">/mo</span>}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {"usage" in m && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {m.usage.map((u) => <div key={u.label} className="rounded-2xl bg-muted p-4"><p className="font-display text-2xl font-semibold text-gradient">{money(u.price, c)}</p><p className="text-sm text-muted-foreground">{u.label}</p></div>)}
                </div>
              )}
              {"note" in m && <p className="mt-4 text-xs text-muted-foreground">{m.note}</p>}
              <div className="mt-auto pt-6"><CTA to="/contact" variant="ghost">Enquire</CTA></div>
            </article>
          </Reveal>
        ))}
        <Reveal><article className="flex h-full flex-col justify-center rounded-3xl bg-brand p-8 text-primary-foreground">
          <h2 className="text-2xl font-semibold">Enterprise & Agent-as-a-Service</h2>
          <p className="mt-3 opacity-90">Hosted, monitored agents from {money(5000, c)}/month, or a custom quote for multi-agent systems.</p>
          <div className="mt-6"><CTA to="/contact" variant="ghost">Get a quote</CTA></div>
        </article></Reveal>
      </div>
      <p className="mt-10 text-center text-xs text-muted-foreground">USD shown at an approximate rate for reference only. Online payments are not yet enabled.</p>
    </>
  );
}
