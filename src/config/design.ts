/**
 * Archon design system — single source of truth for tokens used in
 * CSS, GSAP, Three.js, and component styling.
 *
 * Stack:
 * - Next.js App Router (content, routing, SSR/SSG)
 * - GSAP + ScrollTrigger (scroll storytelling, timelines)
 * - Lenis (smooth scroll, synced to ScrollTrigger)
 * - React Three Fiber + drei (Blender GLB renders)
 * - Framer Motion (lightweight UI micro-interactions only)
 */

export const colors = {
  /** Deep brand navy — backgrounds, shadows */
  navy: "#0b1f3a",
  navyLight: "#152d4d",
  /** Hero / atmosphere base */
  heroBg: "#020408",
  heroBgToken: "#00050a",
  /** Vial label + mid-tone brand blue */
  royal: "#455980",
  royalDeep: "#2f4a6e",
  royalVivid: "#3a6aad",
  /** Glow accents — rings, terrain, CTAs */
  electric: "#00a2ff",
  electricSoft: "#1a8cff",
  /** Neutrals */
  black: "#000000",
  charcoal: "#111111",
  white: "#ffffff",
  cream: "#f5f5f5",
  sand: "#e5e5e5",
  silver: "#6e7a8a",
  silverMid: "#949faf",
  silverLight: "#bcc4ce",
  silverChrome: "#a8b4c4",
  silverHighlight: "#eef1f5",
} as const;

export const motion = {
  /** GSAP ease strings */
  ease: {
    outExpo: "expo.out",
    outQuart: "quart.out",
    inOutCubic: "cubic.inOut",
    cinematic: "power3.inOut",
  },
  duration: {
    fast: 0.4,
    base: 0.8,
    slow: 1.2,
    cinematic: 1.8,
    scrollScrub: 1,
  },
  /** Lenis smooth-scroll feel */
  scroll: {
    duration: 1.2,
    touchMultiplier: 1.5,
  },
  /** ScrollTrigger defaults for scrollytelling sections */
  scrollTrigger: {
    scrub: 0.8,
    pinSpacing: true,
  },
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/** Stacking order — keep WebGL, UI, and overlays predictable */
export const zIndex = {
  background: 0,
  webgl: 5,
  content: 10,
  watermark: 15,
  header: 50,
  overlay: 60,
  splash: 100,
} as const;

export const typography = {
  /** Display — Syne */
  displayTracking: "-0.01em",
  /** Body / UI — Inter */
  labelTracking: "0.22em",
  navTracking: "0.2em",
} as const;

export type ArchonColor = keyof typeof colors;
