import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXUSGEAR | Premium Tech Dropshipping",
  description: "Curated cutting-edge technology shipped directly from Spain. From AI auto-tracking tripods to immersive bone conduction audio.",
  keywords: ["tech", "dropshipping", "gadgets", "Spain", "24h delivery"],
  authors: [{ name: "NexusGear" }],
  openGraph: {
    title: "NEXUSGEAR | Premium Tech",
    description: "Upgrade your reality with next-gen tech.",
    url: "https://nexusgear.store",
    siteName: "NexusGear",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f5f7] text-[#1d1d1f]">
        {children}
      </body>
    </html>
  );
}
