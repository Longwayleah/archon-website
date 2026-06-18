"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/config/products";
import { isProductPurchasable } from "@/config/products";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/commerce/format";
import { getCartItemCount, useCartStore } from "@/store/useCartStore";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const cartItems = useCartStore((state) => state.items);
  const hasCartItems = getCartItemCount(cartItems) > 0;
  const purchasable = isProductPurchasable(product);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? "",
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.id === selectedVariantId),
    [product.variants, selectedVariantId],
  );

  if (!purchasable || !selectedVariant) {
    return (
      <div className="mt-10 rounded-2xl border border-archon-black/10 bg-white/70 p-6">
        <p className="font-body text-sm text-archon-muted">
          Pricing and checkout for this protocol are coming soon.
        </p>
      </div>
    );
  }

  const lineTotal = selectedVariant.price * quantity;
  const hasCheckoutLink = Boolean(selectedVariant.squareCheckoutUrl);

  return (
    <div className="mt-10 rounded-2xl border border-archon-black/10 bg-white/70 p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-body text-[11px] uppercase tracking-[0.24em] text-archon-navy/50">
            Price
          </p>
          <p className="mt-2 font-display text-4xl font-extrabold tracking-[-0.03em] text-archon-navy">
            {formatPrice(selectedVariant.price)}
          </p>
        </div>

        {product.variants.length > 1 ? (
          <div className="min-w-[180px]">
            <label
              htmlFor={`variant-${product.id}`}
              className="font-body text-[11px] uppercase tracking-[0.24em] text-archon-navy/50"
            >
              Strength
            </label>
            <select
              id={`variant-${product.id}`}
              value={selectedVariantId}
              onChange={(event) => setSelectedVariantId(event.target.value)}
              className="mt-2 h-12 w-full rounded-full border border-archon-black/15 bg-white px-4 font-body text-sm text-archon-navy outline-none transition-colors focus:border-archon-navy/35"
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.dosage} — {formatPrice(variant.price)}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div>
          <p className="font-body text-[11px] uppercase tracking-[0.24em] text-archon-navy/50">
            Quantity
          </p>
          <div className="mt-2 inline-flex items-center rounded-full border border-archon-black/15 bg-white">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="flex h-12 w-12 items-center justify-center font-body text-lg text-archon-navy transition-colors hover:text-archon-black"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            >
              −
            </button>
            <span className="min-w-10 text-center font-body text-sm text-archon-navy">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="flex h-12 w-12 items-center justify-center font-body text-lg text-archon-navy transition-colors hover:text-archon-black"
              onClick={() => setQuantity((value) => value + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="ml-auto text-right">
          <p className="font-body text-[11px] uppercase tracking-[0.24em] text-archon-navy/50">
            Subtotal
          </p>
          <p className="mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] text-archon-navy">
            {formatPrice(lineTotal)}
          </p>
        </div>
      </div>

      <div
        className={
          hasCartItems
            ? "mt-8"
            : "mt-8 flex flex-col gap-3 sm:flex-row"
        }
      >
        <AddToCartButton
          product={product}
          variantId={selectedVariantId}
          quantity={quantity}
          size="lg"
          className={hasCartItems ? "w-full rounded-full" : "flex-1 rounded-full"}
        />
        {!hasCartItems ? (
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="flex-1 rounded-full"
            disabled={!hasCheckoutLink}
            onClick={() => {
              if (selectedVariant.squareCheckoutUrl) {
                window.location.href = selectedVariant.squareCheckoutUrl;
              }
            }}
          >
            {hasCheckoutLink ? "Buy now" : "Buy now — link coming soon"}
          </Button>
        ) : null}
      </div>

      {hasCartItems ? (
        <p className="mt-3 font-body text-xs leading-relaxed text-archon-muted">
          Checkout from your cart when you&apos;re ready.
        </p>
      ) : null}

      {!hasCheckoutLink ? (
        <p className="mt-4 font-body text-xs leading-relaxed text-archon-muted">
          Add to cart now. Square checkout links will be wired per strength as
          they are finalized.
        </p>
      ) : null}
    </div>
  );
}
