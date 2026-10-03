import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0070bc",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "SMC FABRICATION | Luxury Architectural Doors & Windows",
    template: "%s | SMC FABRICATION",
  },
  description:
    "Precision-crafted luxury doors, ultra-slim sliding glass walls, and high-efficiency architectural window systems with 3D product previews and mobile camera room visualization.",
  keywords: [
    "architectural doors",
    "minimalist sliding windows",
    "pivot entrance doors",
    "thermal break aluminium windows",
    "bespoke teak doors",
    "UPVC casement windows",
    "camera room visualizer doors",
    "SMC Fabrication",
  ],
  authors: [{ name: "SMC FABRICATION" }],
  creator: "SMC FABRICATION",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
