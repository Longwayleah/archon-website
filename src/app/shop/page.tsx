import type { Metadata } from "next";
import { products } from "@/config/products";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore the Archon peptide collection.",
};

export default function ShopPage() {
  return (
    <div className="product-grid-atmosphere pt-28 pb-24 md:pt-32 md:pb-32">
      <Container size="wide" className="relative z-[1]">
        <header className="mb-16 max-w-2xl">
          <p className="font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
            Shop
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-[-0.03em] text-archon-navy">
            Shop
          </h1>
          <p className="mt-4 font-body text-base leading-relaxed text-archon-muted">
            The full Archon protocol lineup — precision-formulated peptides for
            recovery, performance, and modern wellness.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      </Container>
    </div>
  );
}
