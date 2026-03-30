import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '가루 (Garu) — Korean Morphological Analyzer',
  description: 'Browser-native Korean morphological analyzer. 1.7MB model, 93KB WASM, F1 95.3%. No server required.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
