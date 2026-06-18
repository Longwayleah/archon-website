import { StandardsWallStage } from "./StandardsWallStage";
import { homepageCopy } from "@/config/homepage";

export function TrustSection() {
  const { trustSection } = homepageCopy;

  return (
    <section className="standards-wall-section relative bg-white px-6 py-20 text-archon-navy md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-[1024px]">
        <div className="max-w-2xl">
          <p className="font-body text-[11px] uppercase tracking-[0.32em] text-archon-muted">
            {trustSection.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-archon-navy">
            {trustSection.headline}
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-archon-muted md:text-base">
            {trustSection.body}
          </p>
        </div>

        <div className="mt-12">
          <StandardsWallStage />
        </div>
      </div>
    </section>
  );
}
