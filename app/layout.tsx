import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/providers/CartProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nexus Market — Premium Marketplace",
    template: "%s | Nexus Market",
  },
  description:
    "Discover thousands of premium products from top sellers worldwide. Shop electronics, fashion, home goods, and more with fast shipping and easy returns.",
  keywords: ["marketplace", "shopping", "premium", "e-commerce"],
  openGraph: {
    type: "website",
    siteName: "Nexus Market",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col relative">
        {/* Background ambient orbs */}
        <div className="bg-orb bg-orb-1" aria-hidden="true" />
        <div className="bg-orb bg-orb-2" aria-hidden="true" />
        <div className="bg-orb bg-orb-3" aria-hidden="true" />

        <CartProvider>
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
