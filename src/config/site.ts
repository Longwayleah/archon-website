export const siteConfig = {
  name: "Archon",
  tagline: "Elevated wellness. Refined performance.",
  description:
    "Premium peptide supplements for vitality, confidence, and modern wellness.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://archon.com",
  ogImage: "/og.jpg",
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
