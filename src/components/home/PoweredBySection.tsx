"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { homepageCopy } from "@/config/homepage";
import { images } from "@/config/assets";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { useInViewport } from "@/hooks/useInViewport";

export function PoweredBySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const meshStageRef = useRef<HTMLDivElement>(null);
  const waveFlowRef = useRef<HTMLDivElement>(null);
  const waveTweenRef = useRef<gsap.core.Tween | null>(null);
  const reduced = usePrefersReducedMotion();
  const motionSafe = useMotionSafe();
  const inView = useInViewport(meshStageRef);
  const { poweredBy } = homepageCopy;

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      const els = sectionRef.current.querySelectorAll("[data-powered-enter]");
      gsap.from(els, {
        y: 36,
        opacity: 0,
        immediateRender: false,
        duration: 1.1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  useGSAP(
    () => {
      if (reduced || !motionSafe || !waveFlowRef.current) return;

      const mesh = waveFlowRef.current;
      gsap.set(mesh, {
        transformOrigin: "62% 48%",
        force3D: true,
        x: 0,
        y: 0,
        rotation: 0,
        skewY: 0,
        scaleY: 1,
      });

      waveTweenRef.current = gsap.to(
        {},
        {
          duration: 10,
          repeat: -1,
          ease: "none",
          paused: true,
          onUpdate() {
            const t = this.progress() * Math.PI * 2;
            const wave = Math.sin(t);
            const drift = Math.cos(t * 0.85);

            gsap.set(mesh, {
              x: drift * 14,
              y: wave * 28,
              rotation: wave * 1.4,
              skewY: wave * 2.8,
              scaleY: 1 + wave * 0.035,
              scaleX: 1 + drift * 0.015,
            });
          },
        },
      );

      return () => {
        waveTweenRef.current?.kill();
        waveTweenRef.current = null;
      };
    },
    { scope: sectionRef, dependencies: [reduced, motionSafe] },
  );

  useEffect(() => {
    const wave = waveTweenRef.current;
    if (!wave || reduced || !motionSafe) return;

    if (inView) wave.play();
    else wave.pause();
  }, [inView, reduced, motionSafe]);

  return (
    <section
      id="powered-by"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden border-t border-archon-navy/8 bg-archon-cream text-archon-navy"
    >
      <div
        ref={meshStageRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div className="absolute inset-0 origin-[62%_48%] rotate-[-6deg] scale-[1.12] md:rotate-[-8deg] md:scale-[1.2]">
          <div
            ref={waveFlowRef}
            className="absolute -inset-[12%] will-change-transform"
          >
            <Image
              src={images.poweredByMolecule}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[62%_48%] opacity-100 saturate-[0.65] contrast-[1.02] brightness-[1.01]"
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-archon-cream/8" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_68%_46%,rgba(69,89,128,0.22)_0%,transparent_54%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-archon-cream from-0% via-archon-cream/65 via-[28%] to-transparent to-[62%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-archon-cream/28 via-transparent via-20% to-archon-cream/18" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_80%_60%_at_18%_88%,rgba(11,31,58,0.07)_0%,transparent_55%),radial-gradient(ellipse_55%_45%_at_82%_18%,rgba(69,89,128,0.06)_0%,transparent_52%)]"
      />
      <GrainOverlay />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] items-center px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="flex max-w-[min(88vw,40rem)] flex-col justify-center gap-8 md:gap-10">
          <h2
            data-powered-enter
            className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-archon-navy"
          >
            {poweredBy.headline}
          </h2>

          <div data-powered-enter className="space-y-2">
            {poweredBy.body.map((line) => (
              <p
                key={line}
                className="font-display text-[clamp(1rem,2.4vw,1.35rem)] font-semibold uppercase leading-[1.15] tracking-[0.04em] text-archon-navy"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
