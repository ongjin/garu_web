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

export default function MiniSearchPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-12">
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
