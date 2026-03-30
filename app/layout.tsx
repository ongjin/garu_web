import type { Metadata } from 'next';
import { Outfit, Noto_Sans_KR, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeScript } from '@/components/ThemeScript';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto-kr',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '가루 (Garu) — Korean Morphological Analyzer',
  description:
    'Browser-native Korean morphological analyzer. 1.7MB model, 93KB WASM, F1 95.3%. No server required.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${outfit.variable} ${notoSansKR.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
