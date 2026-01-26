import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer/Footer";
import { WebsiteSchema } from "@/components/SEO/Schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://net-eibunpo.nanataro.app"),
  title: "ネット英文法 - ネットで使える英語の文法学習サイト",
  description: "教科書英語とネットで使う英語の違いを無料で学べる文法学習サイト。SNSや配信で使われるカジュアルな英語表現、ニュアンス、話し言葉の文法を体系的に学べます。",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "ネット英文法",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "ネット英文法",
      },
    ],
  },
  twitter: {
    card: "summary",
    images: ["/ogp.png"],
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Line+Seed+Sans+JP:wght@400;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <WebsiteSchema
          name="ネット英文法"
          description="教科書英語とネットで使う英語の違いを学べる文法学習サイト"
          url="https://net-eibunpo.nanataro.app"
        />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
