import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Load Inter font as a CSS variable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// SEO Metadata
export const metadata: Metadata = {
  title: "Ritwik Chakradhar | Product Portfolio",
  description: "Explore Ritwik's work in AI, product, and growth. Case studies, journey maps, and design stories.",
  metadataBase: new URL("https://ritwik-portfolio.vercel.app"), // optional
  openGraph: {
    title: "Ritwik Chakradhar | Product Portfolio",
    description: "Explore Ritwik's work in AI, product, and growth.",
    url: "https://ritwik-portfolio.vercel.app",
    siteName: "Ritwik Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritwik Chakradhar | Product Portfolio",
    description: "Explore Ritwik's work in AI, product, and growth.",
    creator: "@ritwikchak",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-white text-[#171717]">
        {children}
      </body>
    </html>
  );
}
