import type { ProductCollection } from "@/config/collections";

export type ShopFilter = "all" | ProductCollection;

export function parseShopFilter(value?: string): ShopFilter {
  if (value === "core" || value === "intimacy") return value;
  return "all";
}

export function getShopFilterTitle(filter: ShopFilter) {
  switch (filter) {
    case "core":
      return "Core Protocols";
    case "intimacy":
      return "Intimacy";
    default:
      return "Full Protocols";
  }
}

export function getShopFilterDescriptor(filter: ShopFilter) {
  switch (filter) {
    case "core":
      return "Recovery, performance, and metabolic support.";
    case "intimacy":
      return "Connection, confidence, and presence.";
    default:
      return "The full Archon lineup — precision-formulated peptides for recovery, performance, and the Intimacy collection.";
  }
}
