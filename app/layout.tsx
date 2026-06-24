import type { Metadata } from 'next';
import { Outfit, Noto_Sans_KR, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeScript } from '@/components/ThemeScript';
import { FAQ_ITEMS } from '@/lib/faq';

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
const SITE_NAME = '가루(Garu)';
const SOFTWARE_NAME = '한국어 형태소 분석기 가루(Garu)';
const TITLE =
  '한국어 형태소 분석기 가루(Garu) - 브라우저에서 바로 실행되는 WASM 분석기';
const DESCRIPTION =
  '한국어 형태소 분석기 가루(Garu)는 브라우저에서 바로 실행되는 WASM 기반 분석기입니다. 1.0MB 경량 모델, 155KB WASM(gzip), F1 93.7%(NIKL MP). 서버 없이 100% 클라이언트에서 형태소 분석, 명사 추출, 토큰화를 수행합니다. npm install garu-ko';
const SOFTWARE_VERSION = '0.9.5';
const SAME_AS = [
  'https://github.com/ongjin/garu',
  'https://www.npmjs.com/package/garu-ko',
  'https://news.hada.io/topic?id=28002',
];
const AUTHOR_ID = 'https://zerry.co.kr/#person';
const WEBSITE_ID = `${SITE_URL}/#website`;
const SOFTWARE_ID = `${SITE_URL}/#software`;
const FAQ_ID = `${SITE_URL}/#faq`;

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
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SOFTWARE_NAME,
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
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        alternateName: ['garu-ko', '한국어 형태소 분석기 가루'],
        url: SITE_URL,
        inLanguage: 'ko-KR',
        publisher: {
          '@id': AUTHOR_ID,
        },
      },
      {
        '@type': 'Person',
        '@id': AUTHOR_ID,
        name: 'Yongjin Cho',
        url: 'https://zerry.co.kr',
        sameAs: ['https://github.com/ongjin'],
      },
      {
        '@type': ['SoftwareApplication', 'WebApplication'],
        '@id': SOFTWARE_ID,
        name: SOFTWARE_NAME,
        alternateName: ['가루', 'Garu', 'garu-ko'],
        description: DESCRIPTION,
        url: SITE_URL,
        image: `${SITE_URL}/og-image.png`,
        mainEntityOfPage: {
          '@id': WEBSITE_ID,
        },
        isPartOf: {
          '@id': WEBSITE_ID,
        },
        inLanguage: 'ko-KR',
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'Korean NLP',
        operatingSystem: 'Web Browser',
        browserRequirements: 'Requires WebAssembly support',
        softwareRequirements: 'Modern web browser with WebAssembly support',
        memoryRequirements: '1.0MB model and 155KB WASM engine (gzip)',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: 0,
          priceCurrency: 'USD',
        },
        author: {
          '@id': AUTHOR_ID,
        },
        publisher: {
          '@id': AUTHOR_ID,
        },
        softwareVersion: SOFTWARE_VERSION,
        programmingLanguage: ['TypeScript', 'Rust', 'WebAssembly'],
        downloadUrl: 'https://www.npmjs.com/package/garu-ko',
        installUrl: 'https://www.npmjs.com/package/garu-ko',
        codeRepository: 'https://github.com/ongjin/garu',
        license: 'https://github.com/ongjin/garu/blob/main/LICENSE',
        releaseNotes: `https://github.com/ongjin/garu/releases/tag/v${SOFTWARE_VERSION}`,
        softwareHelp: 'https://github.com/ongjin/garu#readme',
        bugReport: 'https://github.com/ongjin/garu/issues',
        featureList: [
          '한국어 형태소 분석',
          '세종 품사 태깅',
          '명사 추출',
          '한국어 토큰화',
          '브라우저 WASM 실행',
        ],
        sameAs: SAME_AS,
        keywords:
          '한국어 형태소 분석기, 형태소 분석, 한국어 형태소, 한글 형태소, Korean morphological analyzer, NLP, 자연어처리',
      },
      {
        '@type': 'FAQPage',
        '@id': FAQ_ID,
        url: SITE_URL,
        inLanguage: 'ko-KR',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': SOFTWARE_ID },
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
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
