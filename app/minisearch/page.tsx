import type { Metadata } from 'next';
import PageNav from '@/components/PageNav';
import Footer from '@/components/Footer';
import CodeSnippet from '@/components/search/CodeSnippet';
import MiniSearchDemo from '@/components/search/MiniSearchDemo';
import SearchPageHeader from '@/components/search/SearchPageHeader';
import { MINISEARCH_SNIPPET } from '@/lib/search/snippets';

const PAGE_URL = 'https://garu.zerry.co.kr/minisearch';
const PAGE_TITLE = 'MiniSearch 한국어 검색 — garu-minisearch-tokenizer 통합 가이드';
const PAGE_DESCRIPTION =
  'MiniSearch 브라우저 풀텍스트 검색에 한국어 형태소 토크나이저를 적용하는 방법. garu-minisearch-tokenizer 한 줄 설치로 한국어 검색 품질을 끌어올리고 100% 클라이언트에서 동작시킵니다. 기본 토크나이저 vs garu-minisearch-tokenizer 실시간 비교 데모 제공.';

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
    'MiniSearch 한국어',
    'MiniSearch 한국어 토크나이저',
    'garu-minisearch-tokenizer',
    '브라우저 검색 한국어',
    '한국어 풀텍스트 검색',
    '클라이언트 검색 한국어',
    '한국어 검색 엔진',
    'MiniSearch tokenizer Korean',
    '한국어 형태소 토크나이저',
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'MiniSearch 검색에 한국어 형태소 토크나이저 적용하기',
  description: PAGE_DESCRIPTION,
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '패키지 설치',
      text: 'npm i minisearch garu-minisearch-tokenizer 로 MiniSearch와 한국어 토크나이저를 설치한다.',
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
      name: 'MiniSearch에 주입',
      text: 'new MiniSearch({ ... })의 tokenize 옵션에 생성한 토크나이저를 전달한다.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '색인 및 검색',
      text: 'addAll()로 문서를 색인하고 search()로 조사·어미가 달라도 매칭되는 한국어 검색을 수행한다.',
    },
  ],
};

export default function MiniSearchPage() {
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
          engineLabel="MiniSearch"
          subtitle="기본 토크나이저 vs garu-minisearch-tokenizer"
        />
        <MiniSearchDemo />
      </div>
      <div className="mt-12">
        <CodeSnippet install={MINISEARCH_SNIPPET.install} code={MINISEARCH_SNIPPET.code} />
      </div>
      <Footer />
    </main>
  );
}
