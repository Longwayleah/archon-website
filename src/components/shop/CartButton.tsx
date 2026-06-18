"use client";

import { getCartItemCount, useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils/cn";

type CartButtonProps = {
  className?: string;
};

export function CartButton({ className }: CartButtonProps) {
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const itemCount = getCartItemCount(items);

  return (
    <button
      type="button"
      aria-label={`Open cart${itemCount ? `, ${itemCount} items` : ""}`}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-archon-black/15 text-archon-black transition-colors hover:border-archon-black/30",
        className,
      )}
      onClick={openCart}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path
          d="M4.25 4.5H15.25L14 12.25H6.25L4.25 4.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M4.25 4.5L3.5 2.5H2"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="7.25" cy="14.75" r="1" fill="currentColor" />
        <circle cx="13.25" cy="14.75" r="1" fill="currentColor" />
      </svg>

      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-archon-navy px-1 font-body text-[10px] font-semibold text-white">
          {itemCount}
        </span>
      ) : null}
    </button>
  );
}
