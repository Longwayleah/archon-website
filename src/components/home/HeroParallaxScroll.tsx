"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { refreshScroll } from "@/lib/gsap/scroll";
import { motion as motionTokens } from "@/config/design";
import { useMotionSafe } from "@/hooks/useMotionSafe";

type HeroParallaxLayer = {
  selector: string;
  to: gsap.TweenVars;
  scrub?: number | boolean;
};

/** Scroll-out parallax only — starts from the hero's natural layout at rest. */
const HERO_PARALLAX_LAYERS: HeroParallaxLayer[] = [
  {
    selector: '[data-hero-parallax="background"]',
    to: { y: "10%" },
    scrub: 0.55,
  },
  {
    selector: '[data-hero-parallax="vial"]',
    to: { y: 56, scale: 0.96 },
    scrub: 0.85,
  },
  {
    selector: '[data-hero-parallax="wordmark"]',
    to: { y: 96, opacity: 0.3 },
    scrub: 1,
  },
  {
    selector: '[data-hero-parallax="headline"]',
    to: { y: 72, opacity: 0 },
    scrub: 0.95,
  },
  {
    selector: '[data-hero-parallax="copy"]',
    to: { y: 44, opacity: 0.12 },
    scrub: 0.75,
  },
  {
    selector: '[data-hero-parallax="logo"]',
    to: { y: -40 },
    scrub: 1.1,
  },
  {
    selector: '[data-hero-parallax="scroll"]',
    to: { y: 16, opacity: 0 },
    scrub: 0.85,
  },
];

/** Layered scroll depth for the editorial hero — runs after splash completes. */
export function useHeroParallax(sectionRef: RefObject<HTMLElement | null>) {
  const motionSafe = useMotionSafe();

  useGSAP(
    () => {
      if (!motionSafe || !sectionRef.current) return;

      const section = sectionRef.current;

      const ctx = gsap.context(() => {
        for (const layer of HERO_PARALLAX_LAYERS) {
          const target = section.querySelector(layer.selector);

          if (!target) continue;

          gsap.to(target, {
            ...layer.to,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: layer.scrub ?? motionTokens.scrollTrigger.scrub,
            },
          });
        }
      }, section);

      refreshScroll();

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [motionSafe] },
  );
}
