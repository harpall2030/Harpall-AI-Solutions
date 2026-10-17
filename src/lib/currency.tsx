import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { detectCountry } from "./geo";
import type { Currency } from "@/data/site";

type CurrencyCtx = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** True once automatic detection has run. */
  detected: boolean;
};

const Ctx = createContext<CurrencyCtx>({ currency: "INR", setCurrency: () => {}, detected: false });

/** Countries whose visitors see USD market pricing by default. */
const USD_REGIONS = new Set([
  "US", "CA", "GB", "AU", "NZ", "IE", "DE", "FR", "NL", "BE", "CH", "AT", "SE", "NO", "DK", "FI", "SG", "AE", "SA", "QA", "JP", "KR", "IL", "ES", "IT", "PT", "PL",
]);

function currencyForCountry(country: string | null): Currency {
  if (!country) return "INR";
  if (country === "IN") return "INR";
  return USD_REGIONS.has(country) ? "USD" : "USD";
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");
  const [detected, setDetected] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual) return;
    let cancelled = false;
    (async () => {
      let country: string | null = null;
      try {
        const res = await detectCountry();
        country = res.country;
      } catch {
        country = null;
      }
      // Local dev has no geo header — fall back to the browser locale.
      if (!country && typeof navigator !== "undefined") {
        const m = /-([A-Z]{2})\b/i.exec(navigator.language);
        country = m?.[1]?.toUpperCase() ?? null;
      }
      if (!cancelled) {
        setCurrencyState(currencyForCountry(country));
        setDetected(true);
      }
    })();
    return () => { cancelled = true; };
  }, [manual]);

  const setCurrency = (c: Currency) => {
    setManual(true);
    setCurrencyState(c);
  };

  return <Ctx.Provider value={{ currency, setCurrency, detected }}>{children}</Ctx.Provider>;
}

export function useCurrency() {
  return useContext(Ctx);
}
