import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Bot, MessageCircle, Send } from "lucide-react";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/pricing", label: "Pricing" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-display font-semibold">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <defs><linearGradient id="lg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="var(--primary)" /><stop offset="1" stopColor="var(--cyan)" /></linearGradient></defs>
        <path d="M8 6v20M24 6v20M8 16h16" stroke="url(#lg)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="8" cy="6" r="2.5" fill="var(--violet)" /><circle cx="24" cy="26" r="2.5" fill="var(--cyan)" /><circle cx="16" cy="16" r="3" fill="var(--primary)" />
      </svg>
      <span>Harpall <span className="text-muted-foreground font-normal">AI Solutions</span></span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 glass border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="hidden md:block"><CTA to="/contact">Book a Consultation</CTA></div>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t px-5 py-5 md:hidden">
          {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>)}
          <Link to="/contact" onClick={() => setOpen(false)} className="text-primary">Book a Consultation</Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2 space-y-3">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">Intelligent Automation. Real Business Impact. AI agents and automation for businesses in India and worldwide.</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-display font-semibold">Explore</p>
          {nav.map((n) => <Link key={n.to} to={n.to} className="block text-muted-foreground hover:text-foreground">{n.label}</Link>)}
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-display font-semibold">Company</p>
          <Link to="/contact" className="block text-muted-foreground hover:text-foreground">Contact</Link>
          <Link to="/about" className="block text-muted-foreground hover:text-foreground">FAQ</Link>
          <p className="text-xs text-muted-foreground pt-2">Privacy & Terms: drafts pending review</p>
        </div>
      </div>
      <p className="border-t py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Harpall AI Solutions. All prices indicative.</p>
    </footer>
  );
}

export function CTA({ to, children, variant = "primary" }: { to: string; children: ReactNode; variant?: "primary" | "ghost" }) {
  const cls = variant === "primary"
    ? "bg-brand text-primary-foreground shadow-glow hover:brightness-110"
    : "glass text-foreground hover:border-primary/60";
  return (
    <Link to={to} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 ${cls}`}>{children}</Link>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="text-3xl font-semibold md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub: string }) {
  return (
    <section className="relative overflow-hidden px-5 pb-12 pt-20 text-center">
      <div className="grid-bg absolute inset-0 -z-10" />
      <p className="rise mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h1 className="rise mx-auto max-w-3xl text-4xl font-semibold md:text-6xl" style={{ animationDelay: "80ms" }}>{title}</h1>
      <p className="rise mx-auto mt-5 max-w-2xl text-muted-foreground" style={{ animationDelay: "160ms" }}>{sub}</p>
    </section>
  );
}

export function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const pts = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0006, vy: (Math.random() - .5) * .0006 }));
    const css = getComputedStyle(document.documentElement);
    const col = css.getPropertyValue("--primary").trim(); const cy = css.getPropertyValue("--cyan").trim();
    const resize = () => { w = c.width = c.offsetWidth * devicePixelRatio; h = c.height = c.offsetHeight * devicePixelRatio; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < 0 || p.y > 1) p.vy *= -1; }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i]!, b = pts[j]!; const d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
        if (d < 160 * devicePixelRatio) { ctx.globalAlpha = 1 - d / (160 * devicePixelRatio); ctx.strokeStyle = col; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.stroke(); }
      }
      ctx.globalAlpha = 1;
      for (const [i, p] of pts.entries()) { ctx.fillStyle = i % 3 ? col : cy; ctx.beginPath(); ctx.arc(p.x * w, p.y * h, 1.8 * devicePixelRatio, 0, 7); ctx.fill(); }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 -z-10 h-full w-full opacity-50" aria-hidden />;
}

export function Assistant() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="glass mb-3 w-80 rounded-2xl p-4 shadow-glow rise">
          <div className="mb-3 flex items-center gap-2"><Bot className="h-5 w-5 text-accent" /><p className="font-display font-semibold">Harpall Assistant</p></div>
          <p className="rounded-xl bg-muted p-3 text-sm text-muted-foreground">Hi! I'm a preview of our AI assistant. Live chat isn't connected yet — for now, the fastest way to reach us is the consultation form.</p>
          <div className="mt-3 flex gap-2">
            <input disabled aria-label="Message" placeholder="Coming soon…" className="flex-1 rounded-full border bg-transparent px-3 py-2 text-sm" />
            <Link to="/contact" onClick={() => setOpen(false)} aria-label="Go to contact" className="rounded-full bg-brand p-2.5 text-primary-foreground"><Send className="h-4 w-4" /></Link>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} aria-label="Open AI assistant" className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-glow transition-transform hover:scale-105 active:scale-95">
        {open ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}

export function WorkflowViz() {
  const nodes = [
    { x: 60, y: 60, l: "WhatsApp" }, { x: 60, y: 160, l: "Gmail" }, { x: 60, y: 260, l: "Website" },
    { x: 300, y: 160, l: "AI Agent" },
    { x: 540, y: 60, l: "CRM" }, { x: 540, y: 160, l: "Knowledge base" }, { x: 540, y: 260, l: "Analytics" },
  ];
  const hub = nodes[3]!;
  return (
    <svg viewBox="0 0 600 320" className="w-full" role="img" aria-label="Workflow: channels flow into an AI agent which updates business systems">
      {nodes.filter((n) => n !== hub).map((n, i) => (
        <path key={i} d={`M${n.x} ${n.y} C ${(n.x + hub.x) / 2} ${n.y}, ${(n.x + hub.x) / 2} ${hub.y}, ${hub.x} ${hub.y}`} stroke="var(--primary)" strokeOpacity=".7" fill="none" className="dash-flow" />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n === hub ? 34 : 8} fill={n === hub ? "var(--violet)" : "var(--cyan)"} opacity={n === hub ? .9 : 1} />
          {n === hub && <circle cx={n.x} cy={n.y} r="46" fill="none" stroke="var(--violet)" strokeOpacity=".4"><animate attributeName="r" values="40;56;40" dur="3s" repeatCount="indefinite" /></circle>}
          <text x={n.x} y={n === hub ? n.y + 5 : n.y + 26} textAnchor="middle" fill="var(--foreground)" fontSize="13" fontFamily="Manrope">{n.l}</text>
        </g>
      ))}
    </svg>
  );
}
