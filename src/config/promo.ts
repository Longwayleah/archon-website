/** Site promo (must match Square discount code) */
export const sitePromo = {
  code: "archon15",
  codeLabel: "ARCHON15",
  discountPercent: 15,
  eyebrow: "Limited offer",
  headline: "15% off Apex",
  subheadline:
    "Use code ARCHON15 at checkout — valid on Apex (Retatrutide) only.",
  note: "Apply at checkout.",
  dismissLabel: "Not now",
  copyLabel: "Copy ARCHON15",
  copiedLabel: "Copied",
} as const;

/** New key so prior ARCHON50 dismissals don't hide this offer */
export const sitePromoSnoozeKey = "archon-archon15-snooze";

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
