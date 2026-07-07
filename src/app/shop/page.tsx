import { createPageMetadata } from "@/lib/seo/metadata";
import { products } from "@/config/products";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { ShopCollectionTabs } from "@/components/shop/ShopCollectionTabs";
import { getShopFilterDescriptor, getShopFilterTitle, parseShopFilter } from "@/lib/shop/filter";

export const metadata = createPageMetadata({
  title: "Shop Premium Research Peptides",
  description:
    "Explore the Archon Peptide collection — core protocols and the Intimacy collection including PT-141, Oxytocin, retatrutide, tirzepatide, and more.",
  path: "/shop",
  keywords: [
    "shop research peptides",
    "Archon Peptide shop",
    "buy research compounds",
    "intimacy peptides",
    "PT-141",
    "Oxytocin",
  ],
});

type ShopPageProps = {
  searchParams: Promise<{ collection?: string }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { collection: collectionParam } = await searchParams;
  const filter = parseShopFilter(collectionParam);
  const title = getShopFilterTitle(filter);
  const descriptor = getShopFilterDescriptor(filter);

  const visibleProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.collection === filter);

  const gridClassName =
    filter === "intimacy"
      ? "shop-product-grid shop-product-grid--desktop-2 shop-product-grid--narrow"
      : "shop-product-grid shop-product-grid--desktop-3";

  return (
    <div className="bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <Container size="wide">
        <header className="shop-collection-header">
          <div className="shop-collection-header__intro">
            <div className="min-w-0">
              <h1
                key={filter}
                className="shop-collection-header__title font-display text-[clamp(2.25rem,5vw,3.25rem)] font-extrabold tracking-[-0.03em] text-archon-navy"
              >
                {title}
              </h1>
            </div>
            <p
              key={filter}
              className="shop-collection-header__descriptor font-body text-base leading-relaxed text-archon-muted md:max-w-md md:text-right lg:max-w-lg"
            >
              {descriptor}
            </p>
          </div>

          <div className="shop-collection-header__tabs">
            <ShopCollectionTabs active={filter} />
          </div>
        </header>

        <div className={gridClassName}>
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={filter === "all" && index < 3}
              className="shop-product-card--mobile-grid"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
