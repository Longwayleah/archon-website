import Image from "next/image";
import Link from "next/link";
import { homepageCopy } from "@/config/homepage";
import { images } from "@/config/assets";
import { Container } from "@/components/ui/Container";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-archon-navy/8 bg-archon-cream py-32 text-archon-navy md:py-48">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={images.elevateRoutineBackground}
          alt=""
          fill
          priority={false}
          quality={90}
          sizes="100vw"
          className="object-fill object-center"
        />
        <div className="absolute inset-0 bg-archon-cream/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,rgba(255,255,255,0.35)_0%,transparent_70%)]" />
      </div>

      <Container className="relative z-[1]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-tight tracking-[-0.03em] text-archon-navy">
            {homepageCopy.cta.headline}
          </h2>
          <Link
            href={homepageCopy.cta.href}
            className="group mt-10 inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.18em] text-archon-navy/75 transition-colors hover:text-archon-navy"
          >
            {homepageCopy.cta.button}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
