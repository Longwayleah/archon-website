"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  isSitePromoSnoozed,
  sitePromo,
  snoozeSitePromo,
} from "@/config/promo";
import { isProtocolClearanceBypassed } from "@/config/welcome";
import { useAppStore } from "@/store/useAppStore";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const OPEN_DELAY_MS = 9000;
const RETRY_MS = 2500;

export function SitePromoModal() {
  const splashComplete = useAppStore((state) => state.splashComplete);
  const welcomeForCheckout = useAppStore((state) => state.welcomeForCheckout);
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !splashComplete) return;
    if (isSitePromoSnoozed()) return;

    let cancelled = false;
    let retryTimer = 0;

    const tryOpen = () => {
      if (cancelled || isSitePromoSnoozed()) return;
      if (
        !isProtocolClearanceBypassed() &&
        (welcomeForCheckout ||
          document.querySelector(".protocol-clearance-root"))
      ) {
        retryTimer = window.setTimeout(tryOpen, RETRY_MS);
        return;
      }
      setIsOpen(true);
    };

    const openTimer = window.setTimeout(tryOpen, OPEN_DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(openTimer);
      window.clearTimeout(retryTimer);
    };
  }, [mounted, splashComplete, welcomeForCheckout]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const dismiss = () => {
    snoozeSitePromo();
    setIsOpen(false);
    setCopied(false);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(sitePromo.codeLabel);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="site-promo-root" role="presentation">
      <button
        type="button"
        aria-label="Dismiss offer"
        className="site-promo-root__backdrop"
        onClick={dismiss}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-promo-title"
        className={cn(
          "site-promo-root__panel",
          !reducedMotion && "site-promo-root__panel--reveal",
        )}
      >
        <p className="font-body text-[10px] uppercase tracking-[0.28em] text-archon-navy/45">
          {sitePromo.eyebrow}
        </p>
        <h2
          id="site-promo-title"
          className="mt-2 font-display text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold tracking-[-0.03em] text-archon-navy"
        >
          {sitePromo.headline}
        </h2>
        <p className="mt-2 font-body text-sm leading-relaxed text-archon-muted">
          {sitePromo.subheadline}
        </p>

        <div className="site-promo-root__code mt-6">
          <p className="font-body text-[10px] uppercase tracking-[0.22em] text-archon-navy/40">
            Code
          </p>
          <p className="mt-2 font-display text-2xl font-extrabold tracking-[0.08em] text-archon-navy [text-shadow:0_0_18px_rgba(11,31,58,0.22)]">
            {sitePromo.codeLabel}
          </p>
          <p className="mt-2 font-body text-xs text-archon-muted">
            {sitePromo.note}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Button
            type="button"
            className="w-full rounded-full bg-archon-navy text-white hover:bg-archon-navy-light"
            onClick={copyCode}
          >
            {copied ? sitePromo.copiedLabel : sitePromo.copyLabel}
          </Button>
          <button
            type="button"
            className="w-full min-h-11 py-2 font-body text-xs uppercase tracking-[0.18em] text-archon-navy/45 transition-colors hover:text-archon-navy"
            onClick={dismiss}
          >
            {sitePromo.dismissLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
