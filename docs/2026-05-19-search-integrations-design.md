# Search Integrations Demo Design

`garu-minisearch-tokenizer` · `garu-orama-tokenizer` 두 npm 패키지의 한국어 검색 효과를 비교하는 데모 페이지 2개를 기존 `garu_web` 사이트에 라우트로 추가한다.

핵심 메시지: **기본 토크나이저로는 한국어 활용형/조사 매칭이 깨진다. 가루 토크나이저를 끼우면 한 줄로 해결된다.**

## Scope

- `/minisearch` — MiniSearch 기본 토크나이저 vs `garu-minisearch-tokenizer` 좌우 비교
- `/orama` — Orama 기본 토크나이저 vs `garu-orama-tokenizer` 좌우 비교
- 홈(`/`)은 손대지 않음 (기존 형태소 분석기 그대로)

### Out of scope

- 새 사이트/저장소 분리
- 서버사이드 검색 API
- 인덱스 직렬화·캐싱
- 다국어 (한국어 한정)

## Tech stack & constraints

기존 `garu_web` 셋업을 그대로 재사용한다:

- Next.js 16 App Router, `output: 'export'`, Vercel 정적 배포
- `'use client'` SPA, 서버 컴포넌트/API 없음
- `asyncWebAssembly: true` (이미 `next.config.ts`에 설정됨)
- Tailwind v4, `globals.css`의 CSS 변수 + 다크모드
- `garu-ko`는 `garu-minisearch-tokenizer` · `garu-orama-tokenizer`의 transitive dependency

추가 의존성:

```
npm i minisearch garu-minisearch-tokenizer
npm i @orama/orama garu-orama-tokenizer
```

## File structure

```
app/
├── page.tsx                                (그대로)
├── layout.tsx                              (그대로 — metadata만 보강)
├── minisearch/page.tsx                     (신규)
└── orama/page.tsx                          (신규)

components/
├── (기존 컴포넌트들 그대로)
├── PageNav.tsx                             (신규 — /minisearch, /orama에서만 노출)
└── search/
    ├── SearchDemo.tsx                      # 페이지 컨테이너 (좌우 비교 + 공유 검색 state)
    ├── SearchPanel.tsx                     # 단일 패널 (제목 + 카운트 + 결과 리스트)
    ├── SearchInput.tsx                     # debounce 100ms
    ├── SuggestionChips.tsx                 # 추천 검색어 칩
    ├── ResultCard.tsx                      # 결과 1건 + 하이라이트
    ├── CodeSnippet.tsx                     # 복사 가능한 코드 스니펫
    └── adapters/
        ├── types.ts
        ├── garuShared.ts                   # Garu WASM 인스턴스 공유
        ├── miniSearchDefault.ts
        ├── miniSearchGaru.ts
        ├── oramaDefault.ts
        └── oramaGaru.ts

lib/search/
├── sampleDocs.ts                           # 35~40개 한국어 샘플 문서
└── suggestionChips.ts                      # 페이지별 추천 칩
```

## Routes & navigation

홈 헤더(`components/Header.tsx`)는 손대지 않는다. 신규 라우트 두 개에만 `PageNav` 컴포넌트로 작은 nav를 둔다.

```
PageNav: [형태소]  [MiniSearch]  [Orama]                       [🌗 dark]
```

`/minisearch`, `/orama` 페이지는 각자 `<SearchDemo />`를 렌더링한다.

```tsx
// app/minisearch/page.tsx
'use client'
export default function Page() {
  return (
    <SearchDemo
      engineLabel="MiniSearch"
      githubPath="ongjin/garu"
      makeLeft={() => new MiniSearchDefaultAdapter()}
      makeRight={() => new MiniSearchGaruAdapter()}
      chips={MINISEARCH_CHIPS}
      docs={SAMPLE_DOCS}
      snippet={MINISEARCH_SNIPPET}
    />
  )
}
```

## Adapter interface

좌우 패널은 시각적으로 100% 동일한 `SearchPanel` 컴포넌트. 차이는 어댑터 객체 하나로 캡슐화한다.

```ts
// components/search/adapters/types.ts
export interface SampleDoc {
  id: string
  title: string
  body: string
}

export interface SearchHit {
  id: string
  title: string
  body: string
  score?: number          // Orama만 채움. MiniSearch는 undefined.
  matchedTerms: string[]  // 하이라이트용 — 검색어와 매치된 인덱스 토큰
}

export interface SearchAdapter {
  name: string
  ready: boolean
  init(docs: SampleDoc[]): Promise<void>
  search(query: string): SearchHit[]
}
```

엔진별 특이 출력(Orama score)은 `SearchHit.score`로 노출하고, `ResultCard`가 `score`가 있을 때만 표시한다.

## WASM loading

```ts
// adapters/garuShared.ts
import type { Garu } from 'garu-ko'
let garuPromise: Promise<Garu> | null = null
export function loadGaru(): Promise<Garu> {
  garuPromise ??= import('garu-ko').then(({ Garu }) => Garu.load())
  return garuPromise
}
```

- MiniSearch/Orama 가루 어댑터 모두 `loadGaru()`를 호출 → 1.9MB WASM 인스턴스 1회 로딩
- 사용자가 `/minisearch` → `/orama` 라우트 이동해도 재다운로드 없음
- 페이지 언마운트 시에도 `destroy()` 호출하지 않음 (다른 라우트가 재사용 가능). 누수 방지가 필요해지면 `useEffect` cleanup에서 ref count 추가.

## Search flow

```
사용자 인풋
  ↓ (debounce 100ms)
SearchDemo.setQuery(q)
  ↓
SearchPanel(L)  ←─ adapter.search(q)
SearchPanel(R)  ←─ adapter.search(q)
  ↓
ResultCard 렌더 (matchedTerms로 <mark> 하이라이트)
```

- 검색 인풋은 **양쪽이 공유** (인풋 1개)
- 두 어댑터 모두 `ready === true` 될 때까지 인풋·칩 disabled
- 칩 클릭은 debounce 우회, 즉시 `setQuery(chip)`
- 결과 카운트는 패널 상단에 뱃지로 (`매치 0건` vs `매치 12건`)

## Sample data strategy

합성 35개 + 위키 발췌 5개를 섞는다. 추천 칩 단어(먹다·학교·좋다·AI·한국어)가 각 5~10개 문서에 **다양한 활용형**으로 분포하도록 의도적으로 작성한다.

```ts
// lib/search/sampleDocs.ts
export const SAMPLE_DOCS: SampleDoc[] = [
  {
    id: '1',
    title: '아침 식사의 중요성',
    body: '나는 매일 아침에 밥을 먹는다. 어제는 빵을 먹었고, 오늘은 김치찌개를 먹었다. ...',
  },
  // ...
]
```

각 칩의 데모 효과 보장 조건:

| 칩 | 좌측(기본) 기대 결과 | 우측(가루) 기대 결과 |
|---|---|---|
| 먹다 | 0건 | 활용형 포함 5건 이상 |
| 학교 | 1~2건 ("학교"만) | 학교에·학교를·학교가 포함 다수 |
| 좋다 | 0~1건 | 좋은·좋아·좋았다 포함 다수 |
| AI | 양쪽 동일 (외래어/SL) | 양쪽 동일 |
| 한국어 | 양쪽 다수 | 양쪽 다수 |

## UI/style

- 컨테이너 폭: `max-w-[1100px]` (홈의 680px보다 넓힘 — 좌우 비교 패널 가독성)
- 모바일(`< 768px`): 좌우 → 상하 스택, 패널 사이 구분선
- 색·폰트·다크모드는 기존 시스템 그대로
- 하이라이트: `<mark className="bg-[var(--accent)]/15 text-[var(--accent-text)] rounded px-0.5">`
- 결과 카드: 제목(굵게) · 본문 발췌 2~3줄 · (Orama 한정) 점수 작게
- Footer: 기존 `Footer.tsx` 재사용 + 각 페이지 하단에 `CodeSnippet` (설치 명령 + 5~10줄 사용 예시)

### Hero copy

- `/minisearch` — "MiniSearch × 한국어" / "기본 토크나이저 vs garu-minisearch-tokenizer"
- `/orama` — "Orama × 한국어" / "기본 토크나이저 vs garu-orama-tokenizer"

## Completion criteria

- `/minisearch`에서 "먹다" 검색 시 좌측 0건, 우측 5건 이상
- `/orama`에서 "먹다" 검색 시 동일
- "학교" 검색 시 좌측 1~2건, 우측 다수 (조사 변형 매치)
- 라우트 이동 시 WASM 재로딩 없음 (네트워크 탭에서 확인)
- 모바일 반응형 (≤ 360px도 깨지지 않음)
- 빌드 결과물 페이지당 3~5MB 이내 (WASM 1.9MB 포함)
- 콘솔 에러 없음
- 다크모드 정상 작동

## Open questions

- WASM 로딩 진행률 표시 — 현재는 단순 "Loading model..." 텍스트. 진행 % 필요하면 추가 작업.
- 인덱스 빌드 시간 표시 — 메시지에 도움될 수도 (양쪽이 다른지 보여주는 추가 신호). 현재는 out of scope, 필요시 후속.
