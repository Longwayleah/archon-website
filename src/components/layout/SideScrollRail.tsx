"use client";

import { useCallback, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type SectionState = {
  activeIndex: number;
  total: number;
  progress: number;
  hidden: boolean;
};

function getSectionState(): SectionState {
  const sections = Array.from(document.querySelectorAll("main section"));

  if (!sections.length) {
    const doc = document.documentElement;
    const range = doc.scrollHeight - doc.clientHeight;
    const scrollProgress = range <= 0 ? 0 : Math.min(1, Math.max(0, doc.scrollTop / range));

    return {
      activeIndex: 1,
      total: 1,
      progress: scrollProgress,
      hidden: scrollProgress >= 0.985,
    };
  }

  const marker = window.scrollY + window.innerHeight * 0.38;
  let activeIndex = 1;

  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i] as HTMLElement;
    if (marker >= section.offsetTop) {
      activeIndex = i + 1;
    }
  }

  const total = sections.length;
  const progress = total <= 1 ? 0 : (activeIndex - 1) / (total - 1);
  const hidden =
    activeIndex >= total &&
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12;

  return { activeIndex, total, progress, hidden };
}

export function SideScrollRail() {
  const [state, setState] = useState<SectionState>({
    activeIndex: 1,
    total: 1,
    progress: 0,
    hidden: false,
  });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let rafId = 0;
    let pending = false;

    const update = () => {
      pending = false;
      setState(getSectionState());
    };

    const schedule = () => {
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollStep = useCallback(() => {
    const sections = Array.from(document.querySelectorAll("main section"));

    if (!sections.length) {
      window.scrollTo({
        top: window.scrollY + window.innerHeight * 0.85,
        behavior: reduced ? "auto" : "smooth",
      });
      return;
    }

    const marker = window.scrollY + window.innerHeight * 0.2;
    const nextSection = sections.find((section) => {
      const el = section as HTMLElement;
      return el.offsetTop > marker + 8;
    });

    window.scrollTo({
      top: nextSection
        ? (nextSection as HTMLElement).offsetTop
        : (sections[sections.length - 1] as HTMLElement).offsetTop,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [reduced]);

  const indexLabel = String(state.activeIndex).padStart(2, "0");
  const totalLabel = String(state.total).padStart(2, "0");

  return (
    <aside
      className="side-scroll-rail"
      data-hidden={state.hidden ? "true" : "false"}
      aria-label={`Section ${state.activeIndex} of ${state.total}`}
    >
      <button
        type="button"
        className="side-scroll-rail__control"
        onClick={scrollStep}
        aria-label={`Continue to section ${Math.min(state.activeIndex + 1, state.total)} of ${state.total}`}
      >
        <span className="side-scroll-rail__word" aria-hidden>
          Continue
        </span>

        <span className="side-scroll-rail__index" aria-hidden>
          {indexLabel}
        </span>

        <span className="side-scroll-rail__track" aria-hidden>
          <span className="side-scroll-rail__ticks" />
          <span
            className="side-scroll-rail__thumb"
            style={{ top: `${state.progress * 100}%` }}
          >
            <span className="side-scroll-rail__tick-mark" />
            <span className="side-scroll-rail__diamond" />
          </span>
        </span>

        <span className="side-scroll-rail__unit" aria-hidden>
          / {totalLabel}
        </span>
      </button>
    </aside>
  );
}
