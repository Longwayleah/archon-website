"use client";

import Link from "next/link";
import { useRef } from "react";
import { homepageCopy } from "@/config/homepage";
import { HeroCornerLogo } from "./HeroCornerLogo";
import { HeroTopWordmark } from "./HeroTopWordmark";
import { HeroLuxuryField } from "./HeroLuxuryField";
import { HeroVial } from "./HeroVial";
import { useHeroParallax } from "./HeroParallaxScroll";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

/** Award-level hero — vial focal center, typography frames the scene */
export function EditorialHero() {
  const { hero } = homepageCopy;
  const sectionRef = useRef<HTMLElement>(null);

  useHeroParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="editorial-hero relative min-h-[100svh] w-full overflow-hidden bg-white text-archon-navy"
    >
      <HeroLuxuryField />
      <HeroTopWordmark />

      {/* Right — precision peptides + body */}
      <div
        data-hero-splash-defer
        className="absolute right-[var(--hero-inset-x)] z-10 max-w-[min(42vw,11.5rem)] top-[31%] sm:top-[28%] md:top-1/2 md:max-w-[18.75rem] md:-translate-y-1/2 lg:right-[var(--hero-inset-x-lg)] lg:max-w-[20rem]"
      >
        <div data-hero-reveal="copy" data-hero-parallax="copy" className="will-change-transform">
        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-archon-navy/50 md:text-[11px]">
          {hero.subheadline}
        </p>

        <p className="mt-4 font-body text-[13px] leading-[1.65] text-archon-charcoal/80 md:text-sm md:leading-relaxed">
          Formulated to{" "}
          <span className="text-archon-navy">lift recovery</span>,{" "}
          <span className="text-archon-navy/85">sharpen performance</span>, and{" "}
          <span className="text-archon-navy">fit the routines</span> you run every day.
        </p>

        <Link
          href={hero.exploreHref}
          className="group mt-5 inline-flex items-center gap-2 font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-archon-navy transition-colors hover:text-archon-navy/60 md:mt-6 md:text-[11px]"
        >
          {hero.exploreLabel}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path
              d="M1 9L9 1M9 1H3M9 1V7"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        </div>
      </div>

      {/* Lower-left — headline */}
      <div
        data-hero-splash-defer
        className="absolute left-[var(--hero-inset-x)] z-10 max-w-[min(82vw,26.25rem)] bottom-[calc(var(--hero-headline-bottom)+env(safe-area-inset-bottom))] lg:left-[var(--hero-inset-x-lg)] lg:max-w-[28.75rem]"
      >
        <div data-hero-reveal="headline" data-hero-parallax="headline" className="will-change-transform">
        <h1 className="font-display font-semibold uppercase leading-[1.08] tracking-[0.04em] text-archon-navy/88">
          <span className="block text-[clamp(1.35rem,3.2vw,2.35rem)]">{hero.headline[0]}</span>
          <span className="hero-glow-word block text-[clamp(1.5rem,3.6vw,2.65rem)]">
            {hero.headline[1]}
          </span>
          <span className="block text-[clamp(1.35rem,3.2vw,2.35rem)]">{hero.headline[2]}</span>
        </h1>
        </div>
      </div>

      <div data-hero-splash-defer>
        <div data-hero-reveal="logo" data-hero-parallax="logo" className="will-change-transform">
          <HeroCornerLogo />
        </div>
      </div>

      {/* Center — vial as focal point */}
      <div
        data-hero-splash-defer
        className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center pt-[var(--hero-vial-offset-top)] -translate-y-[var(--hero-vial-shift)]"
      >
        <div
          data-hero-reveal="vial"
          data-hero-parallax="vial"
          className="flex h-full w-full items-center justify-center will-change-transform"
        >
        <div className="hero-product-stage relative aspect-[4/5] w-[var(--hero-vial-width)] max-w-[var(--hero-vial-max)]">
          <HeroVial
            alt={`${hero.modelLabel} — Archon precision peptide`}
            src={hero.heroImage}
            priority
            centered
            className="relative z-[1] h-full w-full"
          />
        </div>
        </div>
      </div>

      <div
        data-hero-splash-defer
        data-hero-parallax="scroll"
        className="absolute inset-x-0 bottom-[calc(var(--hero-scroll-bottom)+env(safe-area-inset-bottom))] z-10 flex justify-center will-change-transform"
      >
        <ScrollIndicator minimal label={hero.scrollLabel} />
      </div>

    </section>
  );
}
