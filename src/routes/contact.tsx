import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero } from "@/components/site";
import { services } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Harpall AI Solutions" },
      { name: "description", content: "Tell us about your project and get a recommendation for the right AI agent." },
      { property: "og:title", content: "Book a Consultation — Harpall AI Solutions" },
      { property: "og:description", content: "Contact Harpall AI Solutions about AI agents and automation." },
    ],
  }),
  component: Contact,
});

const field = "w-full rounded-xl border bg-input/30 px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const tz = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "";

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const er: Record<string, string> = {};
    if (!d["name"]?.trim()) er["name"] = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(d["email"] ?? "")) er["email"] = "Please enter a valid email.";
    if ((d["message"] ?? "").trim().length < 10) er["message"] = "Tell us a bit more (10+ characters).";
    setErrors(er);
    if (Object.keys(er).length === 0) setDone(true);
  }

  return (
    <>
      <PageHero eyebrow="Contact" title={<>Book a <span className="text-gradient">consultation</span></>} sub="Tell us what you want to automate. We'll recommend the right agent and model." />
      <div className="mx-auto max-w-3xl px-5">
        {done ? (
          <div className="glass rounded-3xl p-8 text-center rise" role="status">
            <h2 className="text-2xl font-semibold">Your details look good</h2>
            <p className="mt-3 text-muted-foreground">Online form delivery isn't connected yet, so this message has <strong>not</strong> been sent. Please reach us directly by email or WhatsApp in the meantime.</p>
            <button onClick={() => setDone(false)} className="mt-6 text-sm text-accent underline">Edit form</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="glass grid gap-5 rounded-3xl p-8 md:grid-cols-2">
            {([["name", "Full name", "text"], ["email", "Email", "email"], ["company", "Company (optional)", "text"], ["phone", "Phone / WhatsApp (optional)", "tel"]] as const).map(([n, l, t]) => (
              <label key={n} className="space-y-2 text-sm">
                <span>{l}</span>
                <input name={n} type={t} className={field} aria-invalid={!!errors[n]} />
                {errors[n] && <span className="text-destructive">{errors[n]}</span>}
              </label>
            ))}
            <label className="space-y-2 text-sm"><span>Service of interest</span>
              <select name="service" className={field}>{services.map(([s]) => <option key={s} className="bg-card">{s}</option>)}</select></label>
            <label className="space-y-2 text-sm"><span>Budget range</span>
              <select name="budget" className={field}>{["Under ₹5,000", "₹5,000 – ₹25,000", "₹25,000 – ₹1,00,000", "₹1,00,000+", "Not sure yet"].map((b) => <option key={b} className="bg-card">{b}</option>)}</select></label>
            <label className="space-y-2 text-sm"><span>Preferred contact</span>
              <select name="contact" className={field}>{["Email", "WhatsApp", "Phone call", "Video call"].map((b) => <option key={b} className="bg-card">{b}</option>)}</select></label>
            <label className="space-y-2 text-sm"><span>Preferred date (your timezone: {tz})</span>
              <input name="date" type="datetime-local" className={field} /></label>
            <label className="space-y-2 text-sm md:col-span-2"><span>Project requirements</span>
              <textarea name="message" rows={5} className={field} aria-invalid={!!errors["message"]} />
              {errors["message"] && <span className="text-destructive">{errors["message"]}</span>}</label>
            <button className="rounded-full bg-brand py-3 font-semibold text-primary-foreground shadow-glow transition active:scale-95 md:col-span-2">Request consultation</button>
          </form>
        )}
      </div>
    </>
  );
}
