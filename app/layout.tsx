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

const SITE_URL = 'https://garu.zerry.co.kr';
const TITLE = '가루 (Garu) — 한국어 형태소 분석기 | Korean Morphological Analyzer';
const DESCRIPTION =
  '가루(Garu)는 브라우저에서 바로 실행되는 한국어 형태소 분석기입니다. 1.7MB 경량 모델, 93KB WASM, F1 95.3% 정확도. 서버 없이 100% 클라이언트에서 형태소 분석, 명사 추출, 토큰화를 수행합니다. npm install garu-ko';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | 가루 (Garu)',
  },
  description: DESCRIPTION,
  keywords: [
    '한국어 형태소 분석기',
    '형태소 분석',
    '한국어 형태소',
    '한글 형태소',
    '형태소 분석기',
    'Korean morphological analyzer',
    '한국어 NLP',
    '한국어 자연어처리',
    '한국어 토큰화',
    '명사 추출',
    '품사 태깅',
    'POS tagging',
    '세종 품사 태그',
    'garu',
    'garu-ko',
    '가루',
    'WASM',
    '형태소',
    '한국어 텍스트 분석',
    '브라우저 형태소 분석',
    'npm 한국어',
    '경량 형태소 분석기',
    'Korean tokenizer',
    'Korean NLP',
    'morpheme analysis',
  ],
  authors: [{ name: 'Yongjin Cho', url: 'https://zerry.co.kr' }],
  creator: 'Yongjin Cho',
  publisher: 'Yongjin Cho',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '가루 (Garu)',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '가루 (Garu) — 한국어 형태소 분석기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console 인증 후 여기에 추가
    // google: 'verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '가루 (Garu)',
    alternateName: 'garu-ko',
    description:
      '브라우저에서 바로 실행되는 한국어 형태소 분석기. 1.7MB 경량 모델, WASM 기반, F1 95.3% 정확도.',
    url: SITE_URL,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Yongjin Cho',
      url: 'https://zerry.co.kr',
    },
    softwareVersion: '0.3.4',
    programmingLanguage: ['TypeScript', 'Rust', 'WebAssembly'],
    keywords:
      '한국어 형태소 분석기, 형태소 분석, 한국어 형태소, 한글 형태소, Korean morphological analyzer, NLP, 자연어처리',
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${notoSansKR.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
