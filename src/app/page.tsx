import { createPageMetadata } from "@/lib/seo/metadata";
import { seo } from "@/config/seo";
import {
  EditorialHero,
  FeaturedSpotlight,
  PoweredBySection,
  TrustSection,
  FinalCta,
} from "@/components/home";

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <EditorialHero />
      <FeaturedSpotlight />
      <PoweredBySection />
      <TrustSection />
      <FinalCta />
    </>
  );
}
