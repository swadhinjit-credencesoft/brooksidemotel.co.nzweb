"use client";

import { usePathname } from "next/navigation";
import UtilityBar from "./UtilityBar";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import RevealObserver from "@/components/ui/RevealObserver";

const HIDE_CHROME_PATHS = ["/book"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDE_CHROME_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  return (
    <>
      {!hideChrome && <UtilityBar />}
      {!hideChrome && <SiteHeader />}
      {children}
      {!hideChrome && <SiteFooter />}
      <RevealObserver />
    </>
  );
}
