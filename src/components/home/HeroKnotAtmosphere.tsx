"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { heroLayout } from "@/config/heroLayout";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function KnotFilaments({ paths, className }: { paths: readonly string[]; className?: string }) {
  return (
    <g className={className}>
      {paths.map((d, index) => (
        <path
          key={d}
          data-knot-filament
          d={d}
          stroke={index === 1 ? "url(#knot-filament-secondary)" : "url(#knot-filament-primary)"}
          strokeWidth={index === 0 ? 0.55 : index === 1 ? 0.42 : 0.32}
          strokeLinecap="round"
          filter="url(#knot-filament-glow)"
          opacity={index === 2 ? 0.75 : 1}
        />
      ))}
    </g>
  );
}

/**
 * Silver–royal light woven into the knot — lives inside the background plate,
 * masked to the sculpture, revealed one ember and filament at a time.
 */
export function HeroKnotAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const motionSafe = useMotionSafe();
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!rootRef.current) return;

      const embers = rootRef.current.querySelectorAll("[data-knot-ember]");
      const visibleFilamentSelector = window.matchMedia("(min-width: 768px)").matches
        ? ".hero-knot-filaments--desktop [data-knot-filament]"
        : ".hero-knot-filaments--mobile [data-knot-filament]";
      const filaments = rootRef.current.querySelectorAll<SVGPathElement>(
        visibleFilamentSelector,
      );

      const revealEndState = () => {
        gsap.set(embers, { opacity: 1, scale: 1 });
        rootRef.current
          ?.querySelectorAll<SVGPathElement>(visibleFilamentSelector)
          .forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0, opacity: 1 });
          });
      };

      if (reduced) {
        revealEndState();
        return;
      }

      if (!motionSafe) return;

      gsap.set(embers, { opacity: 0, scale: 0.35, transformOrigin: "50% 50%" });
      filaments.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        });
      });

      const tl = gsap.timeline({ delay: 0.55 });

      embers.forEach((ember, index) => {
        tl.to(
          ember,
          {
            opacity: 1,
            scale: 1,
            duration: 1.15,
            ease: "power2.out",
          },
          index * 0.48,
        );
      });

      filaments.forEach((path, index) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        tl.to(
          path,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.65,
            ease: "power2.inOut",
          },
          0.35 + index * 0.55,
        );
      });
    },
    { scope: rootRef, dependencies: [motionSafe, reduced] },
  );

  return (
    <div
      ref={rootRef}
      className="hero-knot-atmosphere pointer-events-none absolute inset-0 z-[1]"
      aria-hidden
    >
      {heroLayout.knot.embers.mobile.map((ember, index) => (
        <div
          key={`ember-${index}`}
          data-knot-ember
          className={`hero-knot-ember hero-knot-ember--${index} absolute -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform`}
          style={{
            background: `radial-gradient(circle, rgb(238 241 245 / ${0.48 * ember.intensity}) 0%, rgb(188 196 206 / ${0.26 * ember.intensity}) 32%, rgb(69 89 128 / ${0.18 * ember.intensity}) 58%, transparent 76%)`,
            filter: "blur(14px)",
          }}
        />
      ))}

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="knot-filament-primary" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#eef1f5" stopOpacity="0.2" />
            <stop offset="38%" stopColor="#bcc4ce" stopOpacity="0.65" />
            <stop offset="72%" stopColor="#455980" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#3a6aad" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="knot-filament-secondary" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#eef1f5" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#949faf" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#455980" stopOpacity="0.55" />
          </linearGradient>
          <filter id="knot-filament-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.45" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <KnotFilaments
          paths={heroLayout.knot.filaments.mobile}
          className="hero-knot-filaments hero-knot-filaments--mobile"
        />
        <KnotFilaments
          paths={heroLayout.knot.filaments.desktop}
          className="hero-knot-filaments hero-knot-filaments--desktop"
        />
      </svg>
    </div>
  );
}
