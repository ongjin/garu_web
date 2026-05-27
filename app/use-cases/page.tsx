import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import PageNav from '@/components/PageNav';
import Footer from '@/components/Footer';

type UseCase = {
  id: string;
  title: string;
  summary: string;
  code: string;
  extra?: ReactNode;
};

const PAGE_URL = 'https://garu.zerry.co.kr/use-cases';
const PAGE_TITLE = '한국어 형태소 분석기 활용 사례 — 검색, 키워드, 챗봇, 오프라인';
const PAGE_DESCRIPTION =
  '브라우저에서 동작하는 한국어 형태소 분석기 가루(Garu)의 활용 사례 모음. 한국어 풀텍스트 검색 인덱싱, 명사·키워드 추출, 텍스트 마이닝, 챗봇 전처리, 오프라인 PWA·브라우저 확장 등 실전 시나리오를 짧은 코드 예제와 함께 정리합니다.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'article',
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
    '한국어 형태소 분석기 활용',
    '한국어 형태소 분석기 예제',
    '한국어 형태소 분석기 사용법',
    '브라우저 한국어 검색',
    '한국어 키워드 추출',
    '한국어 명사 추출',
    '한국어 텍스트 마이닝',
    '한국어 챗봇 전처리',
    '오프라인 한국어 NLP',
    'WASM 한국어 분석',
    'PWA 한국어 검색',
  ],
};

const CASES: UseCase[] = [
  {
    id: 'search',
    title: '한국어 풀텍스트 검색 인덱싱',
    summary:
      '한국어는 교착어라 공백 토큰화만으로는 검색 품질이 무너집니다. 가루로 형태소 단위 토큰을 만들어 색인하면 "분석기를"·"분석기는" 같은 표면형이 모두 "분석기"로 매칭되어 재현율(recall)이 크게 올라갑니다.',
    code: `import { Garu } from 'garu-ko';

const garu = await Garu.load();
const documents = posts.map((post) => ({
  id: post.id,
  title: post.title,
  // 검색용 색인 텍스트: 형태소 단위로 토큰화한 결과를 합쳐 넣음
  indexed: garu.tokenize(post.title + ' ' + post.body).join(' '),
}));`,
    extra: (
      <p className="mt-3">
        Orama / MiniSearch와의 통합은 별도 어댑터 패키지로 제공합니다:{' '}
        <Link href="/orama" className="underline">
          Orama 데모
        </Link>
        ,{' '}
        <Link href="/minisearch" className="underline">
          MiniSearch 데모
        </Link>
        .
      </p>
    ),
  },
  {
    id: 'keywords',
    title: '명사·키워드 추출과 태그 클라우드',
    summary:
      '블로그, 뉴스, 리뷰 텍스트에서 일반명사(NNG)·고유명사(NNP)만 골라내면 자동 태깅, 관련 글 추천, 워드 클라우드 데이터를 손쉽게 만들 수 있습니다. 외래어(SL) 포함 옵션도 켤 수 있습니다.',
    code: `const { tokens } = garu.analyze(article);

const nouns = tokens
  .filter((t) => t.pos === 'NNG' || t.pos === 'NNP')
  .map((t) => t.text);

const counts = nouns.reduce<Record<string, number>>((acc, w) => {
  acc[w] = (acc[w] ?? 0) + 1;
  return acc;
}, {});`,
  },
  {
    id: 'text-mining',
    title: '텍스트 마이닝 · 감성 분석 전처리',
    summary:
      '한국어 감성 분석, 토픽 모델링, 분류기 학습 전 단계에서 형태소 단위 토큰화가 필수입니다. 가루는 세종 42종 품사 태그를 그대로 제공하므로 동사(VV)·형용사(VA)·부사(MAG)만 골라 감성 자질로 쓰는 식의 파이프라인을 브라우저에서 그대로 돌릴 수 있습니다.',
    code: `function sentimentFeatures(text: string) {
  const { tokens } = garu.analyze(text);
  return tokens
    .filter((t) => ['VV', 'VA', 'MAG'].includes(t.pos))
    .map((t) => \`\${t.text}/\${t.pos}\`);
}`,
  },
  {
    id: 'chatbot',
    title: '챗봇 · 검색 UI 입력 전처리',
    summary:
      '사용자 입력을 형태소 단위로 정규화하면 동의어/이형태(예: "아파요"·"아픕니다"·"아프다") 매칭이 훨씬 쉬워집니다. 가루는 1MB 모델이라 챗봇 위젯 번들에 함께 실어도 부담이 적습니다.',
    code: `function normalizeIntent(utterance: string) {
  const lemma = garu
    .analyze(utterance)
    .tokens
    .filter((t) => t.pos.startsWith('V') || t.pos.startsWith('N'))
    .map((t) => t.text);
  return lemma.join(' ');
}`,
  },
  {
    id: 'offline',
    title: '오프라인 PWA · 브라우저 확장',
    summary:
      '서비스 워커로 모델·WASM을 캐시해 두면 네트워크 없이도 한국어 분석이 가능합니다. 인트라넷, 의료/금융 같이 외부 전송이 제한된 환경, 브라우저 확장 프로그램, Electron 데스크톱 앱에서 그대로 동작합니다.',
    code: `// service-worker.ts
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('garu-v1').then((cache) =>
      cache.addAll(['/garu/base.gmdl', '/garu/garu_wasm_bg.wasm'])
    )
  );
});`,
  },
];

export default function UseCasesPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-12">
      <PageNav />
      <header className="mt-6 space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          한국어 형태소 분석기 활용 사례
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          {PAGE_DESCRIPTION}
        </p>
      </header>

      <article className="mt-10 space-y-12 text-sm text-muted leading-relaxed">
        {CASES.map((c) => (
          <section key={c.id} id={c.id}>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              {c.title}
            </h2>
            <p>{c.summary}</p>
            <pre
              className="mt-3 rounded-lg border border-border bg-surface p-4 overflow-x-auto"
              style={{ fontFamily: 'var(--font-mono), monospace' }}
            >
              <code>{c.code}</code>
            </pre>
            {c.extra}
          </section>
        ))}

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">시작하기</h2>
          <p>
            npm에서 가루(garu-ko)를 설치하면 위 시나리오를 모두 같은 한 줄 API로
            사용할 수 있습니다.
          </p>
          <pre
            className="mt-3 rounded-lg border border-border bg-surface p-4 overflow-x-auto"
            style={{ fontFamily: 'var(--font-mono), monospace' }}
          >
            <code>{`npm install garu-ko`}</code>
          </pre>
        </section>
      </article>

      <Footer />
    </main>
  );
}
