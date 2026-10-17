import { createFileRoute } from "@tanstack/react-router";
import { CTA, PageHero, Reveal } from "@/components/site";
import { services } from "@/data/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "AI Services — Harpall AI Solutions" },
      { name: "description", content: "AI agent templates, custom agents, chatbots, lead generation, automation, SaaS development and consulting." },
      { property: "og:title", content: "AI Services — Harpall AI Solutions" },
      { property: "og:description", content: "Eleven AI services for startups, SMBs, agencies and enterprises." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title={<>AI that <span className="text-gradient">does the work</span></>} sub="We sell outcomes, not workflows: an agent that answers customers 24/7 from your PDFs, website and FAQs." />
      <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(([t, d], i) => (
          <Reveal key={t} delay={(i % 3) * 70}>
            <article className="glass card-hover flex h-full flex-col rounded-2xl p-7">
              <p className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-xl font-semibold">{t}</h2>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{d}</p>
              <div className="mt-6"><CTA to="/contact" variant="ghost">Discuss this</CTA></div>
            </article>
          </Reveal>
        ))}
      </div>
    </>
  );
}
