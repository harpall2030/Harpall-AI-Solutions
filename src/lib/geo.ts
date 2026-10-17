import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

/**
 * Detects the visitor's country from the edge runtime headers
 * (Cloudflare sets cf-ipcountry / x-vercel-ip-country etc.).
 * Returns null in local dev where no geo header exists.
 */
export const detectCountry = createServerFn({ method: "GET" }).handler(async () => {
  const h = getRequestHeaders();
  const country =
    h.get("cf-ipcountry") ||
    h.get("x-vercel-ip-country") ||
    h.get("x-country-code") ||
    null;
  return { country: country && country.length === 2 ? country.toUpperCase() : null };
});
