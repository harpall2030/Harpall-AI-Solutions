import { useEffect } from "react";

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    let cleanup = () => {};
    let cancelled = false;
    void (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const ticker = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => { gsap.ticker.remove(ticker); lenis.destroy(); };
    })();
    return () => { cancelled = true; cleanup(); };
  }, [enabled]);
}
