import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";
import { ShopProvider } from "@/lib/shop";

const bebas = localFont({
  src: "../../public/fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas",
  display: "swap",
});

const oswald = localFont({
  src: "../../public/fonts/Oswald.ttf",
  variable: "--font-oswald",
  weight: "200 700",
  display: "swap",
});

const slab = localFont({
  src: "../../public/fonts/AlfaSlabOne-Regular.ttf",
  variable: "--font-slab",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.remixwardrobe.it"),
  title: "Remix Wardrobe · Abbigliamento originale di seconda mano",
  description:
    "Remix Wardrobe: capi originali di seconda mano, foto reali. Carhartt, Dickies, Ralph Lauren, Lacoste.",
  openGraph: {
    title: "Remix Wardrobe",
    description: "Capi originali di seconda mano, foto reali.",
    images: ["/img/logo-denim.jpg"],
  },
  icons: { icon: "/img/logo.jpg" },
};

export const viewport: Viewport = {
  themeColor: "#14161e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${bebas.variable} ${oswald.variable} ${slab.variable}`}>
      <body className="antialiased">
        <ShopProvider>
          <Header />
          {children}
          <Footer />
          <Overlays />
        </ShopProvider>
      </body>
    </html>
  );
}
