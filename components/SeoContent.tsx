import { FAQ_ITEMS } from '@/lib/faq';

export default function SeoContent() {
  return (
    <article className="mt-16 space-y-12 text-sm text-muted leading-relaxed">
      {/* 한국어 형태소 분석기 소개 */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          한국어 형태소 분석기 가루(Garu)란?
        </h2>
        <p>
          가루(Garu)는 브라우저에서 바로 실행되는 <strong>한국어 형태소 분석기</strong>입니다.
          별도의 서버 없이 WebAssembly(WASM) 기반으로 클라이언트에서 직접{' '}
          <strong>형태소 분석</strong>, <strong>명사 추출</strong>, <strong>토큰화</strong>를
          수행합니다. 1.0MB의 경량 모델과 155KB(gzip) WASM 엔진만으로 NIKL MP 벤치마크 기준
          F1 93.9%의 정확도를 달성합니다.
        </p>
      </section>

      {/* 형태소 분석이란 */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          형태소 분석이란?
        </h2>
        <p>
          <strong>형태소 분석</strong>(morphological analysis)은 자연어 처리(NLP)의 기초 단계로,
          문장을 의미를 가진 최소 단위인 <strong>형태소</strong>로 분리하고 각 형태소의{' '}
          <strong>품사(POS)</strong>를 태깅하는 과정입니다. 예를 들어 &ldquo;배가 아파서 약을
          먹었다&rdquo;를 분석하면 &lsquo;배/NNG&rsquo;, &lsquo;가/JKS&rsquo;, &lsquo;아프/VA&rsquo;,
          &lsquo;어서/EC&rsquo;, &lsquo;약/NNG&rsquo;, &lsquo;을/JKO&rsquo;, &lsquo;먹/VV&rsquo;,
          &lsquo;었/EP&rsquo;, &lsquo;다/EF&rsquo;로 분리됩니다.
        </p>
        <p className="mt-2">
          한국어는 교착어로, 어근에 조사와 어미가 결합하여 단어를 이루기 때문에{' '}
          <strong>한국어 형태소 분석</strong>은 영어와 달리 단순 공백 분리로는 불가능하며
          전문적인 분석기가 필요합니다.
        </p>
      </section>

      {/* 주요 기능 */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">주요 기능</h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">형태소 분석 (Morphological Analysis)</dt>
            <dd>입력 텍스트를 형태소 단위로 분리하고 세종 품사 태그셋(42종)으로 품사를 태깅합니다.</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">명사 추출 (Noun Extraction)</dt>
            <dd>텍스트에서 일반명사(NNG), 고유명사(NNP)를 추출합니다. 외국어(SL) 포함 옵션도 지원합니다.</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">토큰화 (Tokenization)</dt>
            <dd>텍스트를 의미 있는 토큰 단위로 분리하여 후속 NLP 파이프라인에 활용할 수 있습니다.</dd>
          </div>
        </dl>
      </section>

      {/* 왜 가루(Garu)인가 */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          왜 가루(Garu)인가?
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">서버 없이 브라우저에서 직접 실행</dt>
            <dd>
              WebAssembly 기반으로 100% 클라이언트에서 동작합니다. 별도의 분석 서버를 띄울
              필요가 없고, 사용자 텍스트가 외부로 전송되지 않아 개인정보 보호에 강합니다.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">초경량 1MB 모델 + 155KB 엔진</dt>
            <dd>
              brotli 압축된 1.0MB 코드북 모델과 155KB(gzip) WASM 엔진. 모바일 웹에서도
              부담 없이 로드할 수 있는 한국어 NLP 자원입니다.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">npm 한 줄 설치, 0-config</dt>
            <dd>
              <code className="rounded bg-surface px-1.5 py-0.5 text-xs">npm install garu-ko</code>{' '}
              한 줄이면 끝. 별도의 모델 다운로드, 네이티브 바인딩, Python 런타임이 필요 없습니다.
              Next.js / Vite / 순수 브라우저 어디서나 동작합니다.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">NIKL MP F1 93.9% 정확도</dt>
            <dd>
              국립국어원 NIKL Modu Corpus 형태분석 말뭉치 기준 F1 93.9%, 9,000문장 v15k
              골드 테스트셋 기준 F1 95.3%. 코드북 + Trigram Viterbi + 어절 캐시 + 문맥 후처리
              규칙 조합으로 경량 환경에서 높은 정확도를 유지합니다.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">오프라인 동작</dt>
            <dd>
              초기 로드 이후 네트워크 없이 동작합니다. 브라우저 확장, 오프라인 PWA, 임베디드
              에디터 등 인터넷에 의존할 수 없는 환경에 적합합니다.
            </dd>
          </div>
        </dl>
      </section>

      {/* 사용법 */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">사용법</h2>
        <p>npm 패키지로 설치하여 프로젝트에서 바로 사용할 수 있습니다.</p>
        <pre
          className="mt-3 rounded-lg border border-border bg-surface p-4 overflow-x-auto"
          style={{ fontFamily: 'var(--font-mono), monospace' }}
        >
          <code>{`npm install garu-ko

import { Garu } from 'garu-ko';

const garu = await Garu.load();
const result = garu.analyze('한국어 형태소 분석기');
console.log(result.tokens);`}</code>
        </pre>
      </section>

      {/* 활용 분야 */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">활용 분야</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>한국어 검색 엔진 — 형태소 기반 인덱싱으로 검색 품질 향상</li>
          <li>텍스트 마이닝 — 뉴스, 리뷰, SNS 텍스트에서 키워드 추출</li>
          <li>챗봇 및 대화 시스템 — 사용자 입력 전처리</li>
          <li>감성 분석 — 형태소 단위 감정 분류</li>
          <li>교육 도구 — 한국어 문법 학습 및 품사 분석 실습</li>
          <li>브라우저 확장 프로그램 — 서버 없이 실시간 텍스트 분석</li>
        </ul>
      </section>

      {/* 자주 묻는 질문 */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          자주 묻는 질문 (FAQ)
        </h2>
        <dl className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-foreground">{item.question}</dt>
              <dd className="mt-1">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
