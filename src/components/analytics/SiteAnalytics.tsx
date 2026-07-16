import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Site analytics:
 * - Vercel Web Analytics (traffic — enable in Vercel project → Analytics)
 * - Vercel Speed Insights (Core Web Vitals — enable in Vercel project → Speed Insights)
 * - Google Analytics 4 when NEXT_PUBLIC_GA_MEASUREMENT_ID is set (G-XXXXXXXX)
 */
export function SiteAnalytics() {
  const gaId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-H995Z0N0CZ";

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics gaId={gaId} />
    </>
  );
}
