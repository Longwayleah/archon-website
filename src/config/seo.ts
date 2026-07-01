/** Central SEO constants — single source for metadata and structured data */
export const seo = {
  siteName: "Archon Peptide",
  legalName: "Archon Peptide",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://archonpeptide.com",
  title: "Archon Peptide | Premium Research Peptides",
  description:
    "Premium research peptides engineered with purpose, precision, and performance. Explore premium research compounds designed for scientific excellence.",
  tagline:
    "Premium research peptides engineered with purpose, precision, and performance.",
  keywords: [
    "research peptides",
    "premium peptides",
    "retatrutide",
    "tirzepatide",
    "MOTS-C",
    "Semax",
    "NAD+",
    "PT-141",
    "Oxytocin",
    "BPC-157",
    "TB-500",
    "GHK-Cu",
    "research compounds",
    "Archon Peptide",
  ],
  locale: "en_US",
  twitter: {
    card: "summary_large_image" as const,
    site: "@archonpeptides",
    creator: "@archonpeptides",
  },
  /** Placeholder social profiles — update when accounts are live */
  sameAs: [
    "https://instagram.com/archonpeptides",
    "https://www.linkedin.com/company/archon-peptide",
    "https://x.com/archonpeptides",
  ],
} as const;

export function getSiteUrl(path = "") {
  const base = seo.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
