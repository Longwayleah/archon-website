import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { images } from "@/config/assets";
import { navigation, siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-archon-navy/10 bg-archon-navy text-archon-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={images.footerBackground}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-[right_bottom]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-archon-navy from-0% via-archon-navy/88 via-[38%] to-archon-navy/48 to-100%" />
        <div className="absolute inset-0 bg-archon-navy/22" />
      </div>

      <Container className="relative z-10 py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-4xl leading-tight tracking-[-0.02em] md:text-5xl">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-4 md:col-start-8">
            <div>
              <p className="mb-4 font-body text-xs uppercase tracking-[0.2em] text-archon-sand/60">
                Explore
              </p>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-sm text-archon-cream/80 transition-colors hover:text-archon-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-body text-xs uppercase tracking-[0.2em] text-archon-sand/60">
                Connect
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={siteConfig.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-archon-cream/80 transition-colors hover:text-archon-white"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-archon-white/10 pt-8">
          <p className="max-w-4xl font-body text-xs leading-relaxed text-archon-sand/55">
            For research and educational purposes only. These statements have not
            been evaluated by the FDA and are not intended to diagnose, treat,
            cure, or prevent any disease. Consult a qualified healthcare
            professional before use. By accessing this website or purchasing or
            using any products, you agree to release, indemnify, and hold
            harmless Archon, and their respective affiliates, officers, and agents
            from any and all claims, damages, losses, liabilities, and expenses
            arising from or related to such use.
          </p>

          <p className="mt-8 font-body text-xs text-archon-sand/50">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
