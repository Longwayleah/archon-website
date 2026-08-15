/** Site-wide promo (must match Square discount code) */
export const sitePromo = {
  code: "archon50",
  codeLabel: "ARCHON50",
  discountPercent: 50,
  eyebrow: "Sitewide offer",
  headline: "50% off",
  subheadline: "Use code ARCHON50 at checkout — valid on your entire order.",
  note: "Apply at checkout.",
  dismissLabel: "Not now",
  copyLabel: "Copy ARCHON50",
  copiedLabel: "Copied",
} as const;

export const sitePromoSnoozeKey = "archon-archon50-snooze";

/** How long dismissing hides the promo */
export const SITE_PROMO_SNOOZE_MS = 1000 * 60 * 60 * 24 * 14; // 14 days

export function isSitePromoSnoozed(): boolean {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(sitePromoSnoozeKey);
  if (!raw) return false;
  const until = Number(raw);
  if (!Number.isFinite(until)) return false;
  if (Date.now() >= until) {
    localStorage.removeItem(sitePromoSnoozeKey);
    return false;
  }
  return true;
}

export function snoozeSitePromo(durationMs = SITE_PROMO_SNOOZE_MS) {
  localStorage.setItem(sitePromoSnoozeKey, String(Date.now() + durationMs));
}
