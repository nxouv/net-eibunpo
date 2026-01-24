import type { Metadata } from "next";
import { Noto_Sans_JP, Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer/Footer";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-ja",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-en",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://net-eibunpo.nanataro.app"),
  title: "ネット英文法 - ネットで使える英語の文法学習サイト",
  description: "教科書英語とネットで使う英語の違いを学べる文法学習サイト。SNSや配信で使われるカジュアルな英語表現、ニュアンス、話し言葉の文法を体系的に学べます。",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "ネット英文法",
    description: "教科書英語とネットで使う英語の違いを学べる文法学習サイト。SNSや配信で使われるカジュアルな英語表現、ニュアンス、話し言葉の文法を体系的に学べます。",
    type: "website",
    locale: "ja_JP",
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
    title: "ネット英文法",
    description: "教科書英語とネットで使う英語の違いを学べる文法学習サイト。",
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
      <body className={`${notoSansJP.variable} ${nunito.variable}`}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
