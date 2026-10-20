import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, ShieldCheck, Globe2, Clock } from "lucide-react";
import { CTA, NetworkCanvas, Reveal, SectionHead, WorkflowViz } from "@/components/site";
import { CinematicHero } from "@/components/CinematicHero";
import { VideoOptimized } from "@/components/VideoOptimized";
import networkVid from "@/assets/videos/intelligent-network.mp4.asset.json";
import networkPoster from "@/assets/videos/intelligent-network-poster.jpg.asset.json";
import workflowVid from "@/assets/videos/automation-workflow.mp4.asset.json";
import workflowPoster from "@/assets/videos/automation-workflow-poster.jpg.asset.json";
import convergenceVid from "@/assets/videos/convergence.mp4.asset.json";
import convergencePoster from "@/assets/videos/convergence-poster.jpg.asset.json";
import { agents, faqs, levels, money, services } from "@/data/site";
import { useCurrency } from "@/lib/currency";

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
  const { currency } = useCurrency();
  return (
    <>
      <CinematicHero />
      <section className="relative overflow-hidden px-5 pb-12 pt-4">
        <NetworkCanvas />
        <Reveal className="glass mx-auto max-w-4xl rounded-3xl p-6 md:p-10" delay={200}>
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
                  {"recurring" in l ? "Recurring" : `${money(l.min, currency)} – ${money(l.max, currency)}${"plus" in l ? "+" : ""}${"monthly" in l ? "/mo" : ""}`}
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
                <p className="mt-5 font-display font-semibold">{money(a.price, currency)} <span className="text-sm font-normal text-muted-foreground">{a.unit}</span></p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <VideoOptimized mp4Src={networkVid.url} poster={networkPoster.url} alt="Connected AI network animation" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>
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
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <figure className="glass overflow-hidden rounded-3xl">
              <div className="aspect-video">
                <VideoOptimized mp4Src={workflowVid.url} poster={workflowPoster.url} alt="Illustration of business operations connected by automation" />
              </div>
              <figcaption className="px-5 py-3 text-xs text-muted-foreground">Illustrative animation — not a live system.</figcaption>
            </figure>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Discovery call", "Solution design", "Build & integrate", "Launch & improve"].map((s, i) => (
              <Reveal key={s} delay={i * 80}><div className="glass h-full rounded-2xl p-6"><p className="font-display text-4xl font-bold text-gradient">0{i + 1}</p><p className="mt-3 font-semibold">{s}</p></div></Reveal>
            ))}
          </div>
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
        <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-primary/30 p-12 text-center md:p-16">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <VideoOptimized mp4Src={convergenceVid.url} poster={convergencePoster.url} alt="Systems converging through AI" className="h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-background/65" />
          </div>
          <h2 className="text-3xl font-semibold md:text-5xl">Ready to <span className="text-gradient">automate?</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Tell us what slows your team down. We'll show you which AI agent fixes it.</p>
          <div className="mt-8"><CTA to="/contact">Book a Consultation <ArrowRight className="h-4 w-4" /></CTA></div>
        </Reveal>
      </section>
    </>
  );
}
