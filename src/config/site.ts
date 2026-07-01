export const siteConfig = {
  name: "Archon",
  brandName: "Archon Peptide",
  tagline: "Elevated wellness. Refined performance.",
  description:
    "Premium research peptides engineered with purpose, precision, and performance.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://archonpeptide.com",
  ogImage: "/opengraph-image",
  links: {
    instagram: "https://instagram.com/archonpeptides",
    email: "peptidesarchon@gmail.com",
    shop: "/shop",
  },
} as const;

export const navigation = [
  { label: "Shop", href: "/shop" },
  { label: "FAQ", href: "/faq" },
  { label: "COA Library", href: "/coa" },
] as const;
