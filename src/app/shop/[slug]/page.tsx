import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getProductDosageLabel,
  products,
} from "@/config/products";
import { ProductPurchasePanel } from "@/components/shop/ProductPurchasePanel";
import { Container } from "@/components/ui/Container";
import { ProductName, getProductLabel } from "@/components/ui/ProductName";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { productPageJsonLd } from "@/lib/seo/jsonld";
import { getProductImageAlt } from "@/lib/seo/product";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found", robots: { index: false, follow: false } };
  }

  const label = getProductLabel(product);

  return createPageMetadata({
    title: `${label} | Premium Research Peptide`,
    description: `${product.descriptor} Available from Archon Peptide — premium research compounds for scientific excellence.`,
    path: `/shop/${product.slug}`,
    keywords: [
      product.name,
      product.subtitle ?? product.name,
      "research peptide",
      "Archon Peptide",
    ],
    ogImage: product.image,
    ogType: "product",
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const dosageLabel = getProductDosageLabel(product);
  const imageAlt = getProductImageAlt(product);

  return (
    <>
      <JsonLd data={productPageJsonLd(product)} />
      <div className="bg-[#ebebeb] pt-28 pb-24 md:pt-32 md:pb-32">
        <Container size="wide">
          <Link
            href="/shop"
            className="font-body text-xs uppercase tracking-[0.18em] text-archon-navy/50 transition-colors hover:text-archon-navy"
          >
            ← Back to shop
          </Link>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative mx-auto aspect-square w-full max-w-md lg:sticky lg:top-32">
              <Image
                src={product.image}
                alt={imageAlt}
                fill
                priority
                className="object-contain drop-shadow-[0_32px_56px_rgba(11,31,58,0.12)]"
                sizes="(max-width: 1024px) 80vw, 480px"
              />
            </div>

            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
                Archon peptide
              </p>
              <ProductName
                name={product.name}
                subtitle={product.subtitle}
                as="h1"
                className="mt-3"
                nameClassName="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-[-0.03em] text-archon-navy"
                subtitleClassName="text-sm md:text-base"
              />
              {dosageLabel ? (
                <p className="mt-2 font-body text-sm uppercase tracking-[0.2em] text-archon-muted">
                  {dosageLabel}
                </p>
              ) : null}
              <p className="mt-8 max-w-md font-body text-base leading-relaxed text-archon-black/70">
                {product.descriptor}
              </p>

              <ProductPurchasePanel product={product} />

              <p className="mt-10 font-body text-xs leading-relaxed text-archon-muted">
                For research use only. These statements have not been evaluated by
                the FDA.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
