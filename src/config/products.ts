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
      "Accelerate contains tirzepatide, a dual GIP and GLP-1 receptor agonist studied for metabolic signaling.",
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
      "Apex contains retatrutide, a triple receptor agonist investigated for its unique three-pathway mechanism.",
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
      "Ascend contains MOTS-c, a mitochondrial-derived peptide studied for metabolic adaptation and cellular energy regulation.",
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
      "Drift contains DSIP, a neuropeptide studied for sleep physiology and circadian biology.",
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
    descriptor:
      "Focus contains Semax, a synthetic peptide studied for neuronal signaling and central nervous system research.",
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
      "Glow combines BPC-157, TB-500, and GHK-Cu into a regenerative research blend for complementary biological pathways.",
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
      "Recover combines regenerative peptides to investigate connective tissue biology, structural integrity, and tissue remodeling.",
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
      "Revive contains NAD+, a coenzyme central to cellular energy production and metabolic function.",
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
      "Sculpt combines riboflavin, lecithin, and bromelain into a metabolic research blend for energy regulation and body composition.",
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
      "Connect contains oxytocin, a neuropeptide involved in neuroendocrine communication and behavioral research.",
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
      "Desire contains PT-141 (Bremelanotide), a melanocortin receptor agonist studied for neuroendocrine research.",
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

/** 1-based position in catalog (alphabetical by display name) */
export function getProductCatalogIndex(slug: string) {
  const index = products.findIndex((product) => product.slug === slug);
  return index >= 0 ? index + 1 : null;
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
