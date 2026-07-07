export type ProductCollection = "core" | "intimacy";

export const collections: Record<
  ProductCollection,
  {
    id: ProductCollection;
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  core: {
    id: "core",
    eyebrow: "The protocol lineup",
    title: "Core protocols",
    description:
      "Recovery, performance, and metabolic support — precision-formulated peptides for the routines you run every day.",
  },
  intimacy: {
    id: "intimacy",
    eyebrow: "Intimacy collection",
    title: "Intimacy",
    description:
      "Connection, confidence, and presence — formulated with the same precision as every Archon protocol.",
  },
};

export const collectionOrder: ProductCollection[] = ["core", "intimacy"];
