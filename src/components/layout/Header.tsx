"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { CartButton } from "@/components/shop/CartButton";
import { images } from "@/config/assets";
import { navigation, siteConfig } from "@/config/site";
import { useAppStore } from "@/store/useAppStore";
import { useScrollStore } from "@/store/useScrollStore";

export function Header() {
  const isMenuOpen = useAppStore((s) => s.isMenuOpen);
  const toggleMenu = useAppStore((s) => s.toggleMenu);
  const setMenuOpen = useAppStore((s) => s.setMenuOpen);
  const scrollY = useScrollStore((s) => s.scrollY);
  const scrolled = scrollY > 50;
  const onHero = scrollY <= 50;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        onHero && !isMenuOpen && !scrolled
          ? "bg-transparent"
          : scrolled
            ? "border-b border-black/5 bg-white/90 backdrop-blur-sm"
            : "bg-transparent",
      )}
    >
      <div className="relative mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10 lg:px-16">
        <Link
          href="/"
          className={cn(
            "justify-self-start font-display text-[13px] font-extrabold uppercase tracking-[0.24em] text-archon-black",
          )}
          onClick={() => setMenuOpen(false)}
        >
          {siteConfig.name}
        </Link>

        <nav className="relative z-10 hidden items-center justify-self-center md:flex md:gap-5 lg:gap-7 xl:gap-9">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap font-body text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-archon-navy md:text-[9px] lg:text-[10px]",
                "text-archon-black/70 hover:text-archon-black",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 justify-self-end md:flex">
          <CartButton />
          <Link
            href={siteConfig.links.shop}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-5 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.16em]",
              "border-archon-black/20 text-archon-black",
            )}
          >
            Shop
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
              <path
                d="M1 8L8 1M8 1H2.5M8 1V6.5"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="relative z-50 col-start-3 flex items-center gap-2 justify-self-end md:hidden">
          <CartButton />
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            onClick={toggleMenu}
          >
            <span
              className={cn(
                "h-px w-5 bg-archon-black transition-transform duration-300 ease-out",
                isMenuOpen && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-archon-black transition-transform duration-300 ease-out",
                isMenuOpen && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      <div
        data-open={isMenuOpen ? "true" : "false"}
        className={cn(
          "mobile-menu-overlay fixed inset-0 z-40 flex flex-col overflow-hidden md:hidden",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src={images.menuBackground}
            alt=""
            fill
            priority
            quality={85}
            sizes="100vw"
            className="mobile-menu-overlay__media object-cover object-[68%_44%]"
          />
          <div className="mobile-menu-overlay__veil absolute inset-0" />
        </div>

        <nav className="relative z-[1] flex flex-1 flex-col justify-center gap-6 px-10 pt-16">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-menu-overlay__link font-display text-[clamp(1.75rem,7vw,2.25rem)] font-semibold uppercase tracking-[-0.02em] text-archon-navy/88 transition-colors hover:text-archon-navy"
              style={{
                transitionDelay: isMenuOpen ? `${140 + index * 70}ms` : "0ms",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
