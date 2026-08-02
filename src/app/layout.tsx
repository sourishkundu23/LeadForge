import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeadForge — AI-Powered Lead Intelligence",
  description:
    "Scrape and enrich leads from Instagram, LinkedIn, and Twitter with AI-powered ICP scoring, intent signals, and personalized outreach messages. Clay-level intelligence at a fraction of the price.",
  keywords: [
    "lead generation",
    "AI lead scraper",
    "Instagram leads",
    "LinkedIn leads",
    "Twitter leads",
    "ICP scoring",
    "sales intelligence",
  ],
  openGraph: {
    title: "LeadForge — AI-Powered Lead Intelligence",
    description:
      "Scrape and enrich leads across social platforms with RAG-powered AI scoring and personalized outreach.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#0a0a0f] text-white font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
