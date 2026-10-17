import { createFileRoute } from "@tanstack/react-router";
import { CTA, PageHero, Reveal } from "@/components/site";
import { faqs } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Harpall AI Solutions" },
      { name: "description", content: "Our mission: practical AI automation that creates real business impact." },
      { property: "og:title", content: "About — Harpall AI Solutions" },
      { property: "og:description", content: "Mission, approach and values of Harpall AI Solutions." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About" title={<>Practical AI, <span className="text-gradient">real impact</span></>} sub="We help businesses automate repetitive work, deploy AI agents and build AI-powered software." />
      <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-3">
        {[["Mission", "Make AI automation accessible and useful for every growing business."], ["Approach", "Start with a business problem, not a tool. Ship small, measure, improve."], ["Values", "Honesty about what AI can do, security by default, and long-term support."]].map(([t, d], i) => (
          <Reveal key={t} delay={i * 80}><div className="glass h-full rounded-2xl p-7"><h2 className="text-xl font-semibold">{t}</h2><p className="mt-3 text-muted-foreground">{d}</p></div></Reveal>
        ))}
      </div>
      <Reveal className="glass mx-auto mt-10 max-w-6xl rounded-2xl p-7 mx-5 md:mx-auto">
        <p className="text-sm text-muted-foreground">Team, certifications and client stories — <em>placeholder, to be added once provided.</em></p>
      </Reveal>
      <section className="mx-auto mt-20 max-w-3xl space-y-3 px-5">
        <h2 className="mb-6 text-center text-3xl font-semibold">FAQ</h2>
        {faqs.map(([q, a]) => <details key={q} className="glass rounded-2xl p-5"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-3 text-sm text-muted-foreground">{a}</p></details>)}
        <div className="pt-6 text-center"><CTA to="/contact">Talk to us</CTA></div>
      </section>
    </>
  );
}
