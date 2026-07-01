import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
import { seo } from "@/config/seo";
import { Container } from "@/components/ui/Container";

export const metadata = createPageMetadata({
  title: "About Archon Peptide",
  description: `About ${seo.siteName} — premium research peptides engineered with purpose, precision, and performance.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-white pt-28 pb-24 md:pt-32 md:pb-32">
      <Container size="narrow">
        <p className="font-body text-[11px] uppercase tracking-[0.28em] text-archon-navy/50">
          About
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-[-0.03em] text-archon-navy">
          {seo.siteName}
        </h1>
        <p className="mt-6 font-body text-base leading-relaxed text-archon-muted">
          {seo.description} Archon sits at the intersection of luxury
          wellness, modern aesthetics, and performance culture — built for
          people who treat recovery and optimization as part of the lifestyle.
        </p>
        <Link
          href="/shop"
          className="mt-10 inline-block font-body text-xs uppercase tracking-[0.18em] text-archon-navy underline-offset-4 hover:underline"
        >
          Explore the collection
        </Link>
      </Container>
    </div>
  );
}
