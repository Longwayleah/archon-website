"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { featuredProducts } from "@/config/products";
import { images } from "@/config/assets";
import { Container } from "@/components/ui/Container";
import { ProductName, getProductLabel } from "@/components/ui/ProductName";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useAppStore } from "@/store/useAppStore";

const FEATURED_COUNT = 4;
const AUTO_ADVANCE_MS = 3200;
const CROSSFADE_DURATION = 1.15;
const COPY_DURATION = 0.85;

const featuredItems = featuredProducts.slice(0, FEATURED_COUNT);

export function FeaturedSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const splashComplete = useAppStore((s) => s.splashComplete);
  const { featured } = homepageCopy;
  const total = featuredItems.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);

  const activeProduct = featuredItems[activeIndex];

  useEffect(() => {
    if (reduced) return;

    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      setActiveIndex((current) => (current + 1) % total);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [reduced, total]);

  useGSAP(
    () => {
      if (reduced || !splashComplete || !sectionRef.current) return;

      const enterEls = sectionRef.current.querySelectorAll("[data-featured-enter]");
      if (!enterEls.length) return;

      gsap.set(enterEls, { autoAlpha: 0, y: 28 });

      const stage = sectionRef.current.querySelector("[data-featured-slides]");
      if (stage) {
        gsap.set(stage, { y: 44, scale: 0.97 });
      }

      const reveal = gsap.to(enterEls, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        reveal.scrollTrigger?.kill();
        reveal.kill();
      };
    },
    { scope: sectionRef, dependencies: [reduced, splashComplete] },
  );

  useGSAP(
    () => {
      if (!slidesRef.current || !splashComplete) return;

      const slides = slidesRef.current.querySelectorAll("[data-featured-slide]");

      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;

        gsap.to(slide, {
          autoAlpha: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.988,
          duration: reduced ? 0 : CROSSFADE_DURATION,
          ease: "power2.inOut",
          overwrite: true,
        });
      });
    },
    { scope: sectionRef, dependencies: [activeIndex, reduced, splashComplete] },
  );

  useGSAP(
    () => {
      if (!copyRef.current || reduced) return;

      gsap.fromTo(
        copyRef.current,
        { y: 10 },
        {
          y: 0,
          duration: COPY_DURATION,
          ease: "power2.inOut",
        },
      );
    },
    { dependencies: [activeIndex, reduced] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden border-t border-archon-navy/10 bg-white text-archon-navy"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={images.featuredProtocolBackground}
          alt=""
          fill
          quality={85}
          sizes="100vw"
          className="object-cover object-[50%_48%]"
        />
      </div>

      <Container className="relative z-10 grid h-full grid-rows-[auto_minmax(0,1fr)] py-5 md:py-6">
        <div
          data-featured-header
          className="flex shrink-0 flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p
              data-featured-enter
              className="font-body text-[11px] uppercase tracking-[0.32em] text-archon-navy/50"
            >
              {featured.eyebrow}
            </p>
            <h2
              data-featured-enter
              className="mt-2 max-w-[16ch] font-display text-[clamp(1.75rem,2.8vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.01em] text-archon-navy"
            >
              {featured.headline}
            </h2>
          </div>
          <Link
            data-featured-enter
            href={featured.viewAllHref}
            className="group inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.18em] text-archon-navy/70 transition-colors hover:text-archon-navy"
          >
            {featured.viewAllLabel}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>

        <div
          className="flex min-h-0 items-center justify-center"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onFocusCapture={() => {
            pausedRef.current = true;
          }}
          onBlurCapture={() => {
            pausedRef.current = false;
          }}
        >
          <div
            data-featured-content
            className="flex w-full max-w-4xl flex-col items-center max-md:-translate-y-2 md:-translate-y-1"
          >
            <div
              ref={slidesRef}
              data-featured-enter
              data-featured-slides
              className="relative mx-auto aspect-[4/5] h-[min(56svh,640px)] w-auto max-w-[min(94vw,640px)] max-md:-translate-y-1 md:h-[min(50svh,620px)] md:max-w-[680px] lg:h-[min(48svh,660px)] lg:max-w-[720px]"
              role="region"
              aria-roledescription="carousel"
              aria-label="Featured protocol vials"
            >
              {featuredItems.map((product, index) => (
                <Link
                  key={product.id}
                  href={featured.viewAllHref}
                  data-featured-slide
                  className="absolute inset-0 block origin-center"
                  aria-hidden={index !== activeIndex}
                  tabIndex={index === activeIndex ? 0 : -1}
                >
                  <div className="absolute inset-[0%_2%_1%] flex items-center justify-center">
                    <div className="relative h-full w-full max-w-full">
                      <Image
                        src={product.image}
                        alt={getProductLabel(product)}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 768px) 94vw, 820px"
                        priority={index === 0}
                        quality={82}
                        draggable={false}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div
              ref={copyRef}
              data-featured-enter
              className="-mt-20 w-full px-4 text-center md:mt-2 lg:mt-4"
              aria-live="polite"
            >
              <ProductName
                name={activeProduct.name}
                subtitle={activeProduct.subtitle}
                as="h3"
                nameClassName="font-display text-[clamp(1.5rem,2.6vw,2rem)] tracking-[-0.02em] text-archon-navy"
                subtitleClassName="text-xs text-archon-navy/65 md:text-sm"
              />
              <Link
                href={featured.viewAllHref}
                className="group mt-2 inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.18em] text-archon-navy/75 transition-colors hover:text-archon-navy"
              >
                {featured.exploreLabel}
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>

            <div
              data-featured-enter
              className="mt-2 flex items-center justify-center gap-2 md:mt-3"
            >
              {featuredItems.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  aria-label={`Show ${product.name}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
                    index === activeIndex
                      ? "w-8 bg-archon-navy/70"
                      : "w-1.5 bg-archon-navy/20 hover:bg-archon-navy/35"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
