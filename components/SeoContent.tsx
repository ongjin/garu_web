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
          수행합니다. 1.7MB의 경량 모델과 93KB WASM 엔진만으로 F1 95.3%의 높은 정확도를 달성합니다.
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

      {/* 다른 분석기와 비교 */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          다른 한국어 형태소 분석기와 비교
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted">
                <th className="py-2 pr-4 font-medium">분석기</th>
                <th className="py-2 pr-4 font-medium">모델 크기</th>
                <th className="py-2 pr-4 font-medium">npm 패키지</th>
                <th className="py-2 pr-4 font-medium">브라우저</th>
                <th className="py-2 font-medium">F1 (NIKL)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-medium text-foreground">가루 (Garu)</td>
                <td className="py-2 pr-4">1.7MB</td>
                <td className="py-2 pr-4">O</td>
                <td className="py-2 pr-4">O</td>
                <td className="py-2 font-medium text-[var(--accent-text)]">95.3%</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 text-foreground">Kiwi</td>
                <td className="py-2 pr-4">~40MB</td>
                <td className="py-2 pr-4">X</td>
                <td className="py-2 pr-4">X</td>
                <td className="py-2">87.9%</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 text-foreground">MeCab-ko</td>
                <td className="py-2 pr-4">~50MB</td>
                <td className="py-2 pr-4">X</td>
                <td className="py-2 pr-4">X</td>
                <td className="py-2">~85%</td>
              </tr>
            </tbody>
          </table>
        </div>
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
    </article>
  );
}
