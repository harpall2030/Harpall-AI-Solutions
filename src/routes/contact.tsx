import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero } from "@/components/site";
import { services } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";
import { enquirySchema } from "@/lib/validations";

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
  const [busy, setBusy] = useState(false);
  const tz = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "";

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = enquirySchema.safeParse({
      name: d["name"], email: d["email"], company: d["company"], phone: d["phone"],
      message: d["message"], service_interest: d["service"], budget: d["budget"],
      preferred_contact: d["contact"], preferred_date: d["date"] ? `${d["date"]} (${tz})` : undefined,
    });
    if (!parsed.success) {
      const er: Record<string, string> = {};
      for (const i of parsed.error.issues) er[String(i.path[0])] ??= i.message;
      setErrors(er);
      return;
    }
    setErrors({});
    setBusy(true);
    const { error } = await supabase.from("enquiries").insert(parsed.data);
    setBusy(false);
    if (error) {
      setErrors({ form: "Sorry, we couldn't send your request. Please try again." });
      return;
    }
    setDone(true);
  }

  return (
    <>
      <PageHero eyebrow="Contact" title={<>Book a <span className="text-gradient">consultation</span></>} sub="Tell us what you want to automate. We'll recommend the right agent and model." />
      <div className="mx-auto max-w-3xl px-5">
        {done ? (
          <div className="glass rounded-3xl p-8 text-center rise" role="status">
            <h2 className="text-2xl font-semibold">Request received</h2>
            <p className="mt-3 text-muted-foreground">Thanks — your consultation request has been sent. We'll get back to you soon.</p>
            <button onClick={() => setDone(false)} className="mt-6 text-sm text-accent underline">Send another</button>
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
            {errors["form"] && <p role="alert" className="text-sm text-destructive md:col-span-2">{errors["form"]}</p>}
            <button disabled={busy} className="rounded-full bg-brand py-3 font-semibold text-primary-foreground shadow-glow transition active:scale-95 disabled:opacity-60 md:col-span-2">{busy ? "Sending…" : "Request consultation"}</button>
          </form>
        )}
      </div>
    </>
  );
}
