import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientProviders } from "@/components/providers/ClientProviders";

export const viewport: Viewport = {
  themeColor: "#009886",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "SMC FABRICATIONS | UPVC Doors & Windows | Pollachi",
    template: "%s | SMC FABRICATIONS",
  },
  description:
    "SMC Fabrications: Manufacturers & Dealers in UPVC Doors & Windows. No. 1 Windows & Doors UPVC Profiles in India High Quality and Advanced Technology. D Wood Go Green. Pollachi, Tamil Nadu.",
  keywords: [
    "UPVC doors and windows",
    "manufacturers dealers UPVC doors windows",
    "Pollachi UPVC windows",
    "UPVC profiles India",
    "D Wood Go Green",
    "sliding UPVC doors",
    "casement UPVC windows",
    "SMC Fabrications Pollachi",
  ],
  authors: [{ name: "SMC FABRICATIONS" }],
  creator: "SMC FABRICATIONS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smcfabrication.com",
    siteName: "SMC FABRICATION",
    title: "SMC FABRICATION | Precision Crafted. Beautifully Built.",
    description:
      "Premium doors and window solutions engineered for modern living. Explore 3D previews and place products in your room with mobile camera AR.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "SMC Fabrication Architectural Entrances & Windows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMC FABRICATION | Luxury Architectural Doors & Windows",
    description:
      "Precision-crafted doors and high-performance window systems with 3D previews and mobile camera room visualization.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black min-h-screen flex flex-col font-sans">
        <ClientProviders>
          <Header />
          <main className="flex-1 bg-white">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
