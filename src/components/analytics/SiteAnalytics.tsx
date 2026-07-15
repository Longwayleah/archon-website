import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";

/**
 * Site analytics:
 * - Vercel Analytics (always on when deployed to Vercel)
 * - Google Analytics 4 when NEXT_PUBLIC_GA_MEASUREMENT_ID is set (G-XXXXXXXX)
 *
 * In GA4 → Reports → Acquisition → Traffic acquisition you’ll see
 * Google / Instagram / Direct / etc.
 */
export function SiteAnalytics() {
  const gaId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-H995Z0N0CZ";

  return (
    <>
      <Analytics />
      <GoogleAnalytics gaId={gaId} />
    </>
  );
}
