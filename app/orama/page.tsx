import type { Metadata } from 'next';
import PageNav from '@/components/PageNav';
import Footer from '@/components/Footer';
import CodeSnippet from '@/components/search/CodeSnippet';
import OramaDemo from '@/components/search/OramaDemo';
import SearchPageHeader from '@/components/search/SearchPageHeader';
import { ORAMA_SNIPPET } from '@/lib/search/snippets';

const PAGE_URL = 'https://garu.zerry.co.kr/orama';
const PAGE_TITLE = 'Orama 한국어 검색 — garu-orama-tokenizer 통합 가이드';
const PAGE_DESCRIPTION =
  'Orama 검색 엔진에 한국어 형태소 토크나이저를 적용하는 방법. garu-orama-tokenizer 한 줄 설치로 한국어 풀텍스트 검색 품질을 끌어올리고 브라우저에서 0서버로 동작시킵니다. 기본 토크나이저 vs garu-orama-tokenizer 실시간 비교 데모 제공.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: PAGE_URL,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  keywords: [
    'Orama 한국어',
    'Orama 한국어 토크나이저',
    'garu-orama-tokenizer',
    '한국어 검색 엔진',
    '한국어 풀텍스트 검색',
    '브라우저 검색 한국어',
    '클라이언트 검색 한국어',
    'Orama tokenizer Korean',
    '한국어 형태소 토크나이저',
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Orama 검색에 한국어 형태소 토크나이저 적용하기',
  description: PAGE_DESCRIPTION,
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '패키지 설치',
      text: 'npm i @orama/orama garu-orama-tokenizer 로 Orama와 한국어 토크나이저를 설치한다.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '토크나이저 생성',
      text: 'createTokenizer()를 호출해 한국어 형태소 토크나이저를 비동기로 생성한다.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Orama DB에 주입',
      text: 'create()의 components.tokenizer 옵션에 생성한 토크나이저를 전달한다.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '색인 및 검색',
      text: 'insert()로 문서를 색인하고 search()로 조사·어미가 달라도 매칭되는 한국어 검색을 수행한다.',
    },
  ],
};

export default function OramaPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <PageNav />
      <div className="space-y-6">
        <SearchPageHeader
          engineLabel="Orama"
          subtitle="기본 토크나이저 vs garu-orama-tokenizer"
        />
        <OramaDemo />
      </div>
      <div className="mt-12">
        <CodeSnippet install={ORAMA_SNIPPET.install} code={ORAMA_SNIPPET.code} />
      </div>
      <Footer />
    </main>
  );
}
