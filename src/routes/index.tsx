import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, ShieldCheck, Globe2, Clock } from "lucide-react";
import { CTA, NetworkCanvas, Reveal, SectionHead, WorkflowViz } from "@/components/site";
import { agents, faqs, levels, money, services } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harpall AI Solutions — AI Agents & Automation" },
      { name: "description", content: "Build smarter, automate faster, scale further with AI agents, templates and custom automation from Harpall AI Solutions." },
      { property: "og:title", content: "Harpall AI Solutions — AI Agents & Automation" },
      { property: "og:description", content: "AI agent templates, custom agents, Agent-as-a-Service and AI SaaS for businesses in India and worldwide." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden px-5 pb-24 pt-24 md:pt-32">
        <NetworkCanvas />
        <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,var(--violet),transparent_60%)] opacity-25" />
        <div className="mx-auto max-w-5xl text-center">
          <p className="rise glass mx-auto mb-6 inline-flex rounded-full px-4 py-1.5 text-xs text-muted-foreground">Intelligent Automation. Real Business Impact.</p>
          <h1 className="text-5xl font-semibold leading-[1.05] md:text-7xl">
            <span className="rise block">Build Smarter.</span>
            <span className="rise block" style={{ animationDelay: "120ms" }}>Automate Faster.</span>
            <span className="rise block text-gradient" style={{ animationDelay: "240ms" }}>Scale Further.</span>
          </h1>
          <p className="rise mx-auto mt-7 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "360ms" }}>
            Harpall AI Solutions builds AI agents that answer customers, generate leads, research and analyse — so your team can focus on growth.
          </p>
          <div className="rise mt-9 flex flex-wrap justify-center gap-3" style={{ animationDelay: "480ms" }}>
            <CTA to="/marketplace">Explore AI Solutions <ArrowRight className="h-4 w-4" /></CTA>
            <CTA to="/contact" variant="ghost">Book a Consultation</CTA>
          </div>
        </div>
        <Reveal className="glass mx-auto mt-20 max-w-4xl rounded-3xl p-6 md:p-10" delay={200}>
          <WorkflowViz />
        </Reveal>
      </section>

      <section className="px-5 py-20">
        <SectionHead eyebrow="Our offer ladder" title={<>From a prompt to a <span className="text-gradient">full AI SaaS</span></>} sub="Seven levels of AI products. Start small, grow when you're ready." />
        <div className="mx-auto max-w-2xl space-y-3">
          {levels.map((l, i) => (
            <Reveal key={l.n} delay={i * 60}>
              <div className="glass card-hover flex items-center gap-5 rounded-2xl p-5" style={{ borderColor: `color-mix(in oklab, var(--${l.color}) 40%, transparent)` }}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display font-bold" style={{ background: `color-mix(in oklab, var(--${l.color}) 20%, transparent)`, color: `var(--${l.color})` }}>{l.n}</span>
                <div className="flex-1">
                  <p className="font-display font-semibold">{l.name}</p>
                  <p className="text-sm text-muted-foreground">{l.desc}</p>
                </div>
                <p className="text-right font-display font-semibold" style={{ color: `var(--${l.color})` }}>
                  {"recurring" in l ? "Recurring" : `${money(l.min, "INR")} – ${money(l.max, "INR")}${"plus" in l ? "+" : ""}${"monthly" in l ? "/mo" : ""}`}
                </p>
              </div>
            </Reveal>
          ))}
          <p className="pt-2 text-center text-xs text-muted-foreground">Indicative price ranges. Final pricing depends on scope.</p>
        </div>
      </section>

      <section className="px-5 py-20">
        <SectionHead eyebrow="Featured agents" title="Ready-to-deploy AI agents" sub="Sample marketplace entries shown for demonstration." />
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {agents.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 80}>
              <Link to="/marketplace/$slug" params={{ slug: a.slug }} className="glass card-hover block h-full rounded-2xl p-6">
                <p className="text-xs text-accent">{a.model} · {a.category}</p>
                <h3 className="mt-2 text-xl font-semibold">{a.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
                <p className="mt-5 font-display font-semibold">{money(a.price, "INR")} <span className="text-sm font-normal text-muted-foreground">{a.unit}</span></p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-20">
        <SectionHead eyebrow="Services" title="Everything you need to put AI to work" />
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map(([t, d], i) => (
            <Reveal key={t} delay={i * 50}><div className="glass card-hover h-full rounded-2xl p-6"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div></Reveal>
          ))}
        </div>
        <div className="mt-8 text-center"><CTA to="/services" variant="ghost">All 11 services <ArrowRight className="h-4 w-4" /></CTA></div>
      </section>

      <section className="px-5 py-20">
        <SectionHead eyebrow="How it works" title="A simple, transparent process" />
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
          {["Discovery call", "Solution design", "Build & integrate", "Launch & improve"].map((s, i) => (
            <Reveal key={s} delay={i * 80}><div className="glass rounded-2xl p-6"><p className="font-display text-4xl font-bold text-gradient">0{i + 1}</p><p className="mt-3 font-semibold">{s}</p></div></Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
          {[[Clock, "24/7", "Agents never sleep"], [Zap, "Faster", "Replies & reports in seconds"], [Globe2, "Global", "India & worldwide, INR/USD"], [ShieldCheck, "Secure", "Your data stays yours"]].map(([I, t, d]) => {
            const Icon = I as typeof Clock;
            return <Reveal key={t as string}><div className="text-center"><Icon className="mx-auto h-7 w-7 text-accent" /><p className="mt-3 font-display text-2xl font-semibold">{t as string}</p><p className="text-sm text-muted-foreground">{d as string}</p></div></Reveal>;
          })}
        </div>
      </section>

      <section className="px-5 py-20">
        <SectionHead eyebrow="FAQ" title="Common questions" />
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="glass group rounded-2xl p-5">
              <summary className="cursor-pointer font-semibold">{q}</summary>
              <p className="mt-3 text-sm text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-5 py-16">
        <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-brand p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-semibold md:text-5xl">Ready to automate?</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">Tell us what slows your team down. We'll show you which AI agent fixes it.</p>
          <Link to="/contact" className="mt-8 inline-flex rounded-full bg-background px-6 py-3 font-semibold text-foreground transition-transform hover:scale-105">Book a Consultation</Link>
        </Reveal>
      </section>
    </>
  );
}
