import { CartDrawer } from "@/components/shop/CartDrawer";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideScrollRail } from "./SideScrollRail";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Header />
      <SideScrollRail />
      <main className="flex-1">{children}</main>
      <CartDrawer />
      <Footer />
    </>
  );
}
