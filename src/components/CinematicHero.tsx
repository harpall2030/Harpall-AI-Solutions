import { lazy, Suspense, useEffect, useRef } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLenis } from "@/hooks/useLenis";

const CinematicScene = lazy(() => import("@/components/canvas/CinematicScene"));

const Fallback = () => (
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_25%,transparent),transparent_65%)]" />
);

export function CinematicHero() {
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useLenis(!reduced);

  useEffect(() => {
    if (reduced || !heroRef.current || !contentRef.current) return;
    let revert = () => {};
    let cancelled = false;
    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.from(contentRef.current, { y: 80, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.2 });
        gsap.to(contentRef.current, { y: -100, opacity: 0.3, scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 } });
      }, heroRef);
      revert = () => ctx.revert();
    })();
    return () => { cancelled = true; revert(); };
  }, [reduced]);

  return (
    <section ref={heroRef} className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        <ClientOnly fallback={<Fallback />}>
          {reduced ? <Fallback /> : (
            <Suspense fallback={<Fallback />}><CinematicScene /></Suspense>
          )}
        </ClientOnly>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>
      <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="glass mx-auto mb-6 inline-flex rounded-full px-4 py-1.5 text-xs text-muted-foreground">Intelligent Automation. Real Business Impact.</p>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          Premium AI Agents & <span className="text-gradient">Workflow Automation</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Harpall AI Solutions builds high-performance AI agents that answer customers, generate leads, research and analyse — for businesses in India and worldwide.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <CTA to="/contact">Start a Project <ArrowRight className="h-4 w-4" /></CTA>
          <CTA to="/services" variant="ghost">Our Services</CTA>
        </div>
      </div>
    </section>
  );
}
// To use a background video later, swap <Fallback /> / scene for:
// <VideoOptimized webmSrc="/videos/hero.webm" mp4Src="/videos/hero.mp4" poster="/videos/hero-poster.webp" alt="Harpall AI cinematic background" />
