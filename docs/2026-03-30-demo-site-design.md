# Garu Demo Website Design

## Overview

garu-ko npm 패키지의 데모 웹사이트. 브라우저에서 WASM으로 직접 한국어 형태소 분석을 수행하는 인터랙티브 데모. Vercel 정적 배포.

타겟: 개발자 + 비개발자 모두 접근 가능.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS**
- **garu-ko** npm 패키지 (브라우저 WASM)
- **Vercel** 정적 배포

## Architecture

- 단일 페이지 SPA (`app/page.tsx`, `'use client'`)
- 서버 컴포넌트/API 라우트 없음
- garu-ko는 `dynamic import`로 브라우저에서만 로드
- Garu 인스턴스는 `useRef`로 관리, 언마운트 시 `destroy()` 호출
- 모든 분석은 100% 클라이언트 사이드

## Page Layout

```
┌─────────────────────────────────────────────┐
│  Header                                     │
│  - 타이틀: "가루 (Garu)"                     │
│  - 설명: "Browser-native Korean morphological│
│    analyzer"                                │
│  - 모델 상태 뱃지: 로딩 스피너 → 준비됨       │
│    (version, model size, F1 95.3%)           │
├─────────────────────────────────────────────┤
│  Input Section                              │
│  - textarea (rows=4)                        │
│  - placeholder: "한국어 텍스트를 입력하세요..." │
│  - 예제 문장 버튼 4개 (아래 참조)             │
│  - "분석" 버튼 + elapsed ms 표시             │
├─────────────────────────────────────────────┤
│  Result Section (3 tabs)                    │
│  - [형태소 분석] [명사 추출] [토큰화]          │
│  - 선택된 탭의 결과 표시                      │
├─────────────────────────────────────────────┤
│  Footer                                     │
│  - npm install 명령어 + 복사 버튼             │
│  - GitHub 링크                               │
│  - "100% client-side, no server required"    │
└─────────────────────────────────────────────┘
```

## Tab Details

### 1. 형태소 분석 (Morphological Analysis)

`analyze()` 결과를 테이블로 표시.

| 컬럼 | 내용 |
|------|------|
| 형태소 | token.text |
| 품사 | POS 컬러 배지 |
| 설명 | POS 한국어 설명 |

POS 컬러 매핑:
- **명사** (NNG, NNP, NNB, NR, NP) → blue
- **동사/형용사** (VV, VA, VX, VCP, VCN) → red
- **조사** (JKS, JKC, JKG, JKO, JKB, JKV, JKQ, JX, JC) → gray
- **어미** (EP, EF, EC, ETN, ETM) → green
- **부사/관형사/감탄사** (MAG, MAJ, MM, IC) → purple
- **접사** (XPN, XSN, XSV, XSA, XR) → orange
- **기호/외국어/숫자** (SF, SP, SS, SE, SO, SW, SH, SL, SN) → yellow

42개 세종 태그 전부 한국어 설명 포함:
- NNG→일반명사, NNP→고유명사, NNB→의존명사, NR→수사, NP→대명사
- VV→동사, VA→형용사, VX→보조용언, VCP→긍정지정사, VCN→부정지정사
- MAG→일반부사, MAJ→접속부사, MM→관형사, IC→감탄사
- JKS→주격조사, JKC→보격조사, JKG→관형격조사, JKO→목적격조사, JKB→부사격조사, JKV→호격조사, JKQ→인용격조사, JX→보조사, JC→접속조사
- EP→선어말어미, EF→종결어미, EC→연결어미, ETN→명사형전성어미, ETM→관형형전성어미
- XPN→접두사, XSN→명사파생접미사, XSV→동사파생접미사, XSA→형용사파생접미사, XR→어근
- SF→마침표/물음표/느낌표, SP→쉼표/가운뎃점/콜론/빗금, SS→따옴표/괄호표, SE→줄임표, SO→붙임표, SW→기타기호, SH→한자, SL→외국어, SN→숫자

### 2. 명사 추출 (Noun Extraction)

`nouns()` 결과 표시.

- `includeSL` 체크박스: "외국어(SL) 포함" 토글
- 추출된 명사를 칩/태그 형태로 나열

### 3. 토큰화 (Tokenization)

`tokenize()` 결과 표시.

- 토큰을 `|` 구분자로 시각적 표시
- 예: `나 | 는 | 학교 | 에 | 간다`

## Example Sentences

1. "배가 아파서 약을 먹었다"
2. "나는 하늘을 나는 새를 보았다"
3. "AI 기술이 b2b 시장에서 발전했다"
4. "인공지능 기반 자연어처리 연구"

## WASM Loading Strategy

```typescript
// app/page.tsx ('use client')
const garuRef = useRef<Garu | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  (async () => {
    const { Garu } = await import('garu-ko');
    garuRef.current = await Garu.load();
    setLoading(false);
  })();
  return () => { garuRef.current?.destroy(); };
}, []);
```

## Design Principles

- 깔끔하고 미니멀. 과한 장식 없음.
- 여백 충분히, 가독성 우선.
- 결과 테이블은 compact하게.
- 모바일 반응형 지원.
- 라이트 모드만 (다크 모드 없음).

## Footer

- `npm i garu-ko` 복사 버튼
- GitHub 링크: https://github.com/ongjin/garu
- "100% client-side, no server required" 문구

## File Structure

```
garu_web/
├── app/
│   ├── layout.tsx        # 메타데이터, 폰트
│   ├── page.tsx          # 메인 페이지 (use client)
│   └── globals.css       # Tailwind
├── components/
│   ├── Header.tsx        # 타이틀 + 모델 상태
│   ├── InputSection.tsx  # textarea + 예제 + 분석 버튼
│   ├── ResultTabs.tsx    # 탭 전환 컨테이너
│   ├── AnalyzeTab.tsx    # 형태소 분석 테이블
│   ├── NounsTab.tsx      # 명사 추출 칩
│   ├── TokenizeTab.tsx   # 토큰화 표시
│   └── Footer.tsx        # 하단
├── lib/
│   └── pos.ts            # POS 태그 색상/설명 매핑
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```
