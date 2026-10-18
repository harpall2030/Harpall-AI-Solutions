import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { oauthReturnPath } from "@/lib/oauth-return-path";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Harpall AI Solutions" },
      { name: "description", content: "Sign in to your Harpall AI Solutions account." },
      { property: "og:title", content: "Sign in — Harpall AI Solutions" },
      { property: "og:description", content: "Sign in to your Harpall AI Solutions account." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    next: oauthReturnPath(s["next"]),
  }),
  component: Login,
});

function Login() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    navigate({ to: next });
  }

  return (
    <main className="mx-auto max-w-md px-5 py-24">
      <form onSubmit={signIn} className="glass rounded-2xl p-8">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Use your Harpall AI Solutions account.</p>
        <label className="mt-6 block text-sm">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </label>
        <label className="mt-4 block text-sm">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </label>
        {error && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
