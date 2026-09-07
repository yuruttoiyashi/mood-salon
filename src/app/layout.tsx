import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import { SiteHeader } from "@/components/site-header/SiteHeader";
import "./globals.css";
import { DemoNotice } from "@/components/demo-notice/DemoNotice";
import { SiteFooter } from "@/components/site-footer/SiteFooter";

const sans = Noto_Sans_JP({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MOOD.",
  description: "Fictional Tokyo hair salon portfolio project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${sans.variable} ${serif.variable}`}>
        <a className="skip-link" href="#main-content">
          本文へ移動
        </a>

        <SiteHeader />

        <main id="main-content">{children}</main>

<DemoNotice context="site" />
<SiteFooter />
      </body>
    </html>
  );
}