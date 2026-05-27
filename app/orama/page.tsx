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

export default function OramaPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-12">
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
