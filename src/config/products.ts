import type { ProductCollection } from "@/config/collections";

export interface ProductVariant {
  id: string;
  dosage: string;
  price: number;
  /** Square payment link — add when available */
  squareCheckoutUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  /** Compound or blend on the vial label */
  subtitle?: string;
  slug: string;
  descriptor: string;
  image: string;
  featured?: boolean;
  collection: ProductCollection;
  /** Hide strength/mg labeling — e.g. proprietary blends */
  hideDosage?: boolean;
  variants: ProductVariant[];
}

/** Archon product catalog — alphabetical by display name */
export const products: Product[] = [
  {
    id: "tirzepatide",
    name: "Accelerate",
    subtitle: "Tirzepatide",
    slug: "tirzepatide",
    descriptor:
      "Tirzepatide — metabolic momentum for body composition, energy, and everyday vitality.",
    image: "/products/accelerate.png",
    featured: true,
    collection: "core",
    variants: [
      {
        id: "20mg",
        dosage: "20 mg",
        price: 199.99,
        squareCheckoutUrl: "https://square.link/u/qE05McHD",
      },
    ],
  },
  {
    id: "retatrutide",
    name: "Apex",
    subtitle: "Retatrutide",
    slug: "retatrutide",
    descriptor:
      "Retatrutide — next-level metabolic support for composition, stamina, and sustained energy.",
    image: "/products/apex.png",
    featured: true,
    collection: "core",
    variants: [
      {
        id: "20mg",
        dosage: "20 mg",
        price: 249.99,
        squareCheckoutUrl: "https://square.link/u/alNFWySM",
      },
    ],
  },
  {
    id: "mots-c",
    name: "Ascend",
    subtitle: "MOTS-c",
    slug: "mots-c",
    descriptor:
      "MOTS-c — clean energy and metabolic drive, built for performance from the inside out.",
    image: "/products/ascend.png",
    featured: true,
    collection: "core",
    variants: [
      {
        id: "20mg",
        dosage: "20 mg",
        price: 75.99,
        squareCheckoutUrl: "https://square.link/u/lWLq51YH",
      },
    ],
  },
  {
    id: "dsip",
    name: "Drift",
    subtitle: "DSIP",
    slug: "dsip",
    descriptor:
      "DSIP — restful sleep and overnight recovery support for deep rest and circadian balance.",
    image: "/products/drift.png",
    featured: true,
    collection: "core",
    variants: [
      {
        id: "10mg",
        dosage: "10 mg",
        price: 54.99,
        squareCheckoutUrl: "https://square.link/u/TLISwPif",
      },
    ],
  },
  {
    id: "semax",
    name: "Focus",
    subtitle: "Semax",
    slug: "semax",
    descriptor: "Semax — mental clarity and sharp focus for high-output days.",
    image: "/products/focus.png",
    featured: true,
    collection: "core",
    variants: [
      {
        id: "10mg",
        dosage: "10 mg",
        price: 75.99,
        squareCheckoutUrl: "https://square.link/u/DKz46ePA",
      },
    ],
  },
  {
    id: "glow",
    name: "Glow",
    subtitle: "TB-500 + BPC-157 + GHK-Cu",
    slug: "glow",
    descriptor:
      "Glow blend — TB-500, BPC-157, and GHK-Cu for radiance, recovery, skin vitality, and daily performance.",
    image: "/products/glow.png",
    featured: true,
    collection: "core",
    variants: [
      {
        id: "70mg",
        dosage: "70 mg",
        price: 124.99,
        squareCheckoutUrl: "https://square.link/u/EaOY5b9S",
      },
    ],
  },
  {
    id: "bpc-tb500",
    name: "Recover",
    subtitle: "BPC-157 + TB-500",
    slug: "bpc-tb500",
    descriptor:
      "Wolverine — BPC-157 and TB-500 for faster bounce-back from training, travel, and active living.",
    image: "/products/recover.png",
    featured: true,
    collection: "core",
    variants: [
      {
        id: "20mg",
        dosage: "20 mg",
        price: 134.99,
        squareCheckoutUrl: "https://square.link/u/f2m4noOj",
      },
    ],
  },
  {
    id: "nad-plus",
    name: "Revive",
    subtitle: "NAD+",
    slug: "nad-plus",
    descriptor:
      "NAD+ — foundational energy and longevity support at the cellular level.",
    image: "/products/revive.png",
    featured: true,
    collection: "core",
    variants: [
      {
        id: "500mg",
        dosage: "500 mg",
        price: 109.99,
        squareCheckoutUrl: "https://square.link/u/yOaKjQCw",
      },
    ],
  },
  {
    id: "lemon-x",
    name: "Sculpt",
    subtitle: "Lemon X",
    slug: "lemon-x",
    descriptor:
      "Lemon X — refined contour support for stubborn areas, including chin, waist, thighs, and arms.",
    image: "/products/sculpt.png",
    featured: true,
    hideDosage: true,
    collection: "core",
    variants: [
      {
        id: "default",
        dosage: "",
        price: 129.99,
        squareCheckoutUrl: "https://square.link/u/OMyISGxO",
      },
    ],
  },
  {
    id: "oxytocin",
    name: "Connect",
    subtitle: "Oxytocin",
    slug: "oxytocin",
    descriptor:
      "Oxytocin — bonding and emotional connection for intimacy, trust, and closeness.",
    image: "/products/connect.png",
    collection: "intimacy",
    variants: [
      {
        id: "10mg",
        dosage: "10 mg",
        price: 71.99,
        squareCheckoutUrl: "https://square.link/u/JyAIJ2g4",
      },
    ],
  },
  {
    id: "pt-141",
    name: "Desire",
    subtitle: "PT-141",
    slug: "pt-141",
    descriptor:
      "PT-141 — confidence and presence for connection, arousal, and intimate vitality.",
    image: "/products/desire.png",
    collection: "intimacy",
    variants: [
      {
        id: "10mg",
        dosage: "10 mg",
        price: 79.99,
        squareCheckoutUrl: "https://square.link/u/ZVbtK3uv",
      },
    ],
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductVariant(product: Product, variantId: string) {
  return product.variants.find((variant) => variant.id === variantId);
}

export function isProductPurchasable(product: Product) {
  return product.variants.length > 0;
}

export function getStartingPrice(product: Product) {
  if (!product.variants.length) return null;
  return Math.min(...product.variants.map((variant) => variant.price));
}

export function getDefaultVariant(product: Product) {
  return product.variants[0] ?? null;
}

/** Dosage badge for cards — single strength or range across variants */
export function getProductDosageLabel(product: Product) {
  if (product.hideDosage) return "";
  if (!product.variants.length) return "—";
  if (product.variants.length === 1) return product.variants[0].dosage;

  const first = product.variants[0].dosage;
  const last = product.variants[product.variants.length - 1].dosage;
  return `${first} – ${last}`;
}
