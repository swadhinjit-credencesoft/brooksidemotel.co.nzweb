import type { Metadata, Viewport } from "next";
import "./globals.scss";
import UtilityBar from "@/components/layout/UtilityBar";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import RevealObserver from "@/components/ui/RevealObserver";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Brookside Motel — Brand-New Luxury & Modern Comfort in Rolleston",
  description:
    "Brand-new luxury motel accommodation and private residences in Rolleston, Canterbury.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Brookside Motel — Brand-New Luxury & Modern Comfort in Rolleston",
    description:
      "Brand-new luxury motel accommodation and private residences in Rolleston, Canterbury.",
    url: SITE_URL,
    siteName: "Brookside Motel",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Brookside Motel",
      },
    ],
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brookside Motel",
    description:
      "Brand-new luxury motel accommodation and private residences in Rolleston, Canterbury.",
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#3A4E48",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <UtilityBar />
        <SiteHeader />
        {children}
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
