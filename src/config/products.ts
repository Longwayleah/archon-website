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
      "Metabolic momentum for body composition, energy, and everyday vitality.",
    image: "/products/accelerate.png",
    featured: true,
    variants: [
      {
        id: "20mg",
        dosage: "20 mg",
        price: 215,
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
      "Next-level metabolic support for composition, stamina, and sustained energy.",
    image: "/products/apex.png",
    featured: true,
    variants: [
      {
        id: "20mg",
        dosage: "20 mg",
        price: 260,
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
      "Clean energy and metabolic drive — built for performance from the inside out.",
    image: "/products/ascend.png",
    featured: true,
    variants: [
      {
        id: "20mg",
        dosage: "20 mg",
        price: 140,
        squareCheckoutUrl: "https://square.link/u/lWLq51YH",
      },
    ],
  },
  {
    id: "semax",
    name: "Focus",
    subtitle: "Semax",
    slug: "semax",
    descriptor: "Mental clarity and sharp focus for high-output days.",
    image: "/products/focus.png",
    featured: true,
    variants: [
      {
        id: "10mg",
        dosage: "10 mg",
        price: 100,
        squareCheckoutUrl: "https://square.link/u/DKz46ePA",
      },
    ],
  },
  {
    id: "glow",
    name: "Glow",
    subtitle: "Glow blend",
    slug: "glow",
    descriptor:
      "Radiance and recovery support for skin, vitality, and daily performance.",
    image: "/products/glow.png",
    featured: true,
    variants: [
      {
        id: "70mg",
        dosage: "70 mg",
        price: 140,
        squareCheckoutUrl: "https://square.link/u/EaOY5b9S",
      },
    ],
  },
  {
    id: "bpc-tb500",
    name: "Recover",
    subtitle: "Wolverine",
    slug: "bpc-tb500",
    descriptor: "Faster bounce-back for training, travel, and active living.",
    image: "/products/recover.png",
    featured: true,
    variants: [
      {
        id: "20mg",
        dosage: "20 mg",
        price: 150,
        squareCheckoutUrl: "https://square.link/u/f2m4noOj",
      },
    ],
  },
  {
    id: "nad-plus",
    name: "Revive",
    subtitle: "NAD+",
    slug: "nad-plus",
    descriptor: "Foundational energy and longevity support at the cellular level.",
    image: "/products/revive.png",
    featured: true,
    variants: [
      {
        id: "500mg",
        dosage: "500 mg",
        price: 110,
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
      "Refined contour support for stubborn areas — chin, waist, thighs, and arms.",
    image: "/products/sculpt.png",
    featured: true,
    hideDosage: true,
    variants: [
      {
        id: "default",
        dosage: "",
        price: 175,
        squareCheckoutUrl: "https://square.link/u/OMyISGxO",
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
