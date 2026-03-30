# Garu Demo Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** garu-ko npm 패키지를 브라우저에서 체험할 수 있는 인터랙티브 데모 웹사이트를 Next.js 16으로 구현하고 Vercel에 배포한다.

**Architecture:** 단일 페이지 SPA. garu-ko WASM을 dynamic import로 브라우저에서 로드하고, useRef로 인스턴스를 관리한다. 서버 컴포넌트/API 없이 100% 클라이언트 사이드.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, garu-ko

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/cyj/workspace/personal/garu_web
npx create-next-app@latest . --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*" --use-npm
```

If prompted for options, select defaults. This creates the full project scaffold.

- [ ] **Step 2: Install garu-ko**

```bash
cd /Users/cyj/workspace/personal/garu_web
npm install garu-ko
```

- [ ] **Step 3: Configure next.config.ts for WASM**

Next.js needs webpack config to handle .wasm files. Replace `next.config.ts`:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    return config;
  },
};

export default nextConfig;
```

Note: `output: 'export'` enables static export for Vercel static deployment.

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Dev server starts at http://localhost:3000 without errors.

- [ ] **Step 5: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 16 project with garu-ko"
```

---

### Task 2: POS Tag Data Module

**Files:**
- Create: `lib/pos.ts`

- [ ] **Step 1: Create POS tag mapping module**

Create `lib/pos.ts` with color and description mappings for all 42 Sejong POS tags:

```typescript
export type PosCategory = 'noun' | 'verb' | 'particle' | 'ending' | 'adverb' | 'affix' | 'symbol';

export interface PosInfo {
  label: string;
  description: string;
  category: PosCategory;
}

export const POS_COLORS: Record<PosCategory, string> = {
  noun: 'bg-blue-100 text-blue-800',
  verb: 'bg-red-100 text-red-800',
  particle: 'bg-gray-100 text-gray-700',
  ending: 'bg-green-100 text-green-800',
  adverb: 'bg-purple-100 text-purple-800',
  affix: 'bg-orange-100 text-orange-800',
  symbol: 'bg-yellow-100 text-yellow-800',
};

export const POS_MAP: Record<string, PosInfo> = {
  NNG: { label: 'NNG', description: '일반명사', category: 'noun' },
  NNP: { label: 'NNP', description: '고유명사', category: 'noun' },
  NNB: { label: 'NNB', description: '의존명사', category: 'noun' },
  NR:  { label: 'NR',  description: '수사', category: 'noun' },
  NP:  { label: 'NP',  description: '대명사', category: 'noun' },
  VV:  { label: 'VV',  description: '동사', category: 'verb' },
  VA:  { label: 'VA',  description: '형용사', category: 'verb' },
  VX:  { label: 'VX',  description: '보조용언', category: 'verb' },
  VCP: { label: 'VCP', description: '긍정지정사', category: 'verb' },
  VCN: { label: 'VCN', description: '부정지정사', category: 'verb' },
  MAG: { label: 'MAG', description: '일반부사', category: 'adverb' },
  MAJ: { label: 'MAJ', description: '접속부사', category: 'adverb' },
  MM:  { label: 'MM',  description: '관형사', category: 'adverb' },
  IC:  { label: 'IC',  description: '감탄사', category: 'adverb' },
  JKS: { label: 'JKS', description: '주격조사', category: 'particle' },
  JKC: { label: 'JKC', description: '보격조사', category: 'particle' },
  JKG: { label: 'JKG', description: '관형격조사', category: 'particle' },
  JKO: { label: 'JKO', description: '목적격조사', category: 'particle' },
  JKB: { label: 'JKB', description: '부사격조사', category: 'particle' },
  JKV: { label: 'JKV', description: '호격조사', category: 'particle' },
  JKQ: { label: 'JKQ', description: '인용격조사', category: 'particle' },
  JX:  { label: 'JX',  description: '보조사', category: 'particle' },
  JC:  { label: 'JC',  description: '접속조사', category: 'particle' },
  EP:  { label: 'EP',  description: '선어말어미', category: 'ending' },
  EF:  { label: 'EF',  description: '종결어미', category: 'ending' },
  EC:  { label: 'EC',  description: '연결어미', category: 'ending' },
  ETN: { label: 'ETN', description: '명사형전성어미', category: 'ending' },
  ETM: { label: 'ETM', description: '관형형전성어미', category: 'ending' },
  XPN: { label: 'XPN', description: '접두사', category: 'affix' },
  XSN: { label: 'XSN', description: '명사파생접미사', category: 'affix' },
  XSV: { label: 'XSV', description: '동사파생접미사', category: 'affix' },
  XSA: { label: 'XSA', description: '형용사파생접미사', category: 'affix' },
  XR:  { label: 'XR',  description: '어근', category: 'affix' },
  SF:  { label: 'SF',  description: '마침표/물음표/느낌표', category: 'symbol' },
  SP:  { label: 'SP',  description: '쉼표/가운뎃점/콜론/빗금', category: 'symbol' },
  SS:  { label: 'SS',  description: '따옴표/괄호표', category: 'symbol' },
  SE:  { label: 'SE',  description: '줄임표', category: 'symbol' },
  SO:  { label: 'SO',  description: '붙임표', category: 'symbol' },
  SW:  { label: 'SW',  description: '기타기호', category: 'symbol' },
  SH:  { label: 'SH',  description: '한자', category: 'symbol' },
  SL:  { label: 'SL',  description: '외국어', category: 'symbol' },
  SN:  { label: 'SN',  description: '숫자', category: 'symbol' },
};

export function getPosInfo(pos: string): PosInfo {
  return POS_MAP[pos] ?? { label: pos, description: pos, category: 'symbol' };
}

export function getPosColor(pos: string): string {
  const info = getPosInfo(pos);
  return POS_COLORS[info.category];
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/pos.ts
git commit -m "feat: add POS tag color and description mappings"
```

---

### Task 3: Header Component

**Files:**
- Create: `components/Header.tsx`

- [ ] **Step 1: Create Header component**

Create `components/Header.tsx`:

```tsx
interface HeaderProps {
  loading: boolean;
  modelInfo?: { version: string; size: number; accuracy: number };
}

export default function Header({ loading, modelInfo }: HeaderProps) {
  return (
    <header className="text-center py-10">
      <h1 className="text-4xl font-bold tracking-tight">가루 (Garu)</h1>
      <p className="mt-2 text-lg text-gray-500">
        Browser-native Korean morphological analyzer
      </p>
      <div className="mt-4 flex justify-center gap-2">
        {loading ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
            <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading model...
          </span>
        ) : modelInfo ? (
          <>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              v{modelInfo.version}
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              {(modelInfo.size / 1024 / 1024).toFixed(1)}MB model
            </span>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
              F1 {(modelInfo.accuracy * 100).toFixed(1)}%
            </span>
          </>
        ) : null}
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: add Header component with model status badges"
```

---

### Task 4: InputSection Component

**Files:**
- Create: `components/InputSection.tsx`

- [ ] **Step 1: Create InputSection component**

Create `components/InputSection.tsx`:

```tsx
const EXAMPLES = [
  '배가 아파서 약을 먹었다',
  '나는 하늘을 나는 새를 보았다',
  'AI 기술이 b2b 시장에서 발전했다',
  '인공지능 기반 자연어처리 연구',
];

interface InputSectionProps {
  text: string;
  onTextChange: (text: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  elapsed: number | null;
}

export default function InputSection({
  text,
  onTextChange,
  onAnalyze,
  loading,
  elapsed,
}: InputSectionProps) {
  return (
    <section className="space-y-3">
      <textarea
        className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
        rows={4}
        placeholder="한국어 텍스트를 입력하세요..."
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            onAnalyze();
          }
        }}
      />
      <div className="flex flex-wrap items-center gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={() => {
              onTextChange(ex);
            }}
          >
            {ex}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3">
          {elapsed !== null && (
            <span className="text-sm text-gray-400">{elapsed.toFixed(2)}ms</span>
          )}
          <button
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            onClick={onAnalyze}
            disabled={loading || !text.trim()}
          >
            분석
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/InputSection.tsx
git commit -m "feat: add InputSection with textarea and example buttons"
```

---

### Task 5: Result Tab Components

**Files:**
- Create: `components/ResultTabs.tsx`
- Create: `components/AnalyzeTab.tsx`
- Create: `components/NounsTab.tsx`
- Create: `components/TokenizeTab.tsx`

- [ ] **Step 1: Create AnalyzeTab component**

Create `components/AnalyzeTab.tsx`:

```tsx
import { getPosInfo, getPosColor } from '@/lib/pos';

interface Token {
  text: string;
  pos: string;
  start: number;
  end: number;
}

interface AnalyzeTabProps {
  tokens: Token[];
}

export default function AnalyzeTab({ tokens }: AnalyzeTabProps) {
  if (tokens.length === 0) {
    return <p className="text-gray-400 text-sm py-6 text-center">분석 결과가 여기에 표시됩니다.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-500">
            <th className="py-2 pr-4 font-medium">형태소</th>
            <th className="py-2 pr-4 font-medium">품사</th>
            <th className="py-2 font-medium">설명</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => {
            const info = getPosInfo(token.pos);
            const color = getPosColor(token.pos);
            return (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono">{token.text}</td>
                <td className="py-1.5 pr-4">
                  <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${color}`}>
                    {info.label}
                  </span>
                </td>
                <td className="py-1.5 text-gray-600">{info.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: Create NounsTab component**

Create `components/NounsTab.tsx`:

```tsx
interface NounsTabProps {
  nouns: string[];
  includeSL: boolean;
  onToggleSL: (v: boolean) => void;
}

export default function NounsTab({ nouns, includeSL, onToggleSL }: NounsTabProps) {
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={includeSL}
          onChange={(e) => onToggleSL(e.target.checked)}
          className="rounded border-gray-300"
        />
        외국어(SL) 포함
      </label>
      {nouns.length === 0 ? (
        <p className="text-gray-400 text-sm py-6 text-center">분석 결과가 여기에 표시됩니다.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {nouns.map((noun, i) => (
            <span
              key={i}
              className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-sm text-blue-700"
            >
              {noun}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create TokenizeTab component**

Create `components/TokenizeTab.tsx`:

```tsx
interface TokenizeTabProps {
  tokens: string[];
}

export default function TokenizeTab({ tokens }: TokenizeTabProps) {
  if (tokens.length === 0) {
    return <p className="text-gray-400 text-sm py-6 text-center">분석 결과가 여기에 표시됩니다.</p>;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 py-4">
      {tokens.map((token, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="rounded bg-gray-100 px-2 py-1 text-sm font-mono">{token}</span>
          {i < tokens.length - 1 && (
            <span className="text-gray-300 text-xs">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create ResultTabs container**

Create `components/ResultTabs.tsx`:

```tsx
import { useState } from 'react';
import AnalyzeTab from './AnalyzeTab';
import NounsTab from './NounsTab';
import TokenizeTab from './TokenizeTab';

interface Token {
  text: string;
  pos: string;
  start: number;
  end: number;
}

interface ResultTabsProps {
  analyzeTokens: Token[];
  nouns: string[];
  tokenizeTokens: string[];
  includeSL: boolean;
  onToggleSL: (v: boolean) => void;
}

const TABS = ['형태소 분석', '명사 추출', '토큰화'] as const;

export default function ResultTabs({
  analyzeTokens,
  nouns,
  tokenizeTokens,
  includeSL,
  onToggleSL,
}: ResultTabsProps) {
  const [active, setActive] = useState<number>(0);

  return (
    <section className="mt-6">
      <div className="flex border-b border-gray-200">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              active === i
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActive(i)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="py-4">
        {active === 0 && <AnalyzeTab tokens={analyzeTokens} />}
        {active === 1 && <NounsTab nouns={nouns} includeSL={includeSL} onToggleSL={onToggleSL} />}
        {active === 2 && <TokenizeTab tokens={tokenizeTokens} />}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/AnalyzeTab.tsx components/NounsTab.tsx components/TokenizeTab.tsx components/ResultTabs.tsx
git commit -m "feat: add result tab components (analyze, nouns, tokenize)"
```

---

### Task 6: Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Footer component**

Create `components/Footer.tsx`:

```tsx
'use client';

import { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npm i garu-ko');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer className="mt-12 border-t border-gray-200 py-6 text-center text-sm text-gray-400 space-y-2">
      <div className="flex justify-center items-center gap-2">
        <code className="rounded bg-gray-100 px-2 py-1 text-gray-600">npm i garu-ko</code>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Copy"
        >
          {copied ? '✓' : '📋'}
        </button>
      </div>
      <div className="flex justify-center gap-4">
        <a
          href="https://github.com/ongjin/garu"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.npmjs.com/package/garu-ko"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
        >
          npm
        </a>
      </div>
      <p>100% client-side, no server required</p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer with npm copy and links"
```

---

### Task 7: Main Page Assembly

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update layout.tsx with metadata**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '가루 (Garu) — Korean Morphological Analyzer',
  description: 'Browser-native Korean morphological analyzer. 1.7MB model, 93KB WASM, F1 95.3%. No server required.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Write main page**

Replace `app/page.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Header from '@/components/Header';
import InputSection from '@/components/InputSection';
import ResultTabs from '@/components/ResultTabs';
import Footer from '@/components/Footer';

interface Token {
  text: string;
  pos: string;
  start: number;
  end: number;
}

interface ModelInfo {
  version: string;
  size: number;
  accuracy: number;
}

export default function Home() {
  const garuRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [modelInfo, setModelInfo] = useState<ModelInfo | undefined>();

  const [text, setText] = useState('');
  const [analyzeTokens, setAnalyzeTokens] = useState<Token[]>([]);
  const [nouns, setNouns] = useState<string[]>([]);
  const [tokenizeTokens, setTokenizeTokens] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [includeSL, setIncludeSL] = useState(false);

  useEffect(() => {
    (async () => {
      const { Garu } = await import('garu-ko');
      const instance = await Garu.load();
      garuRef.current = instance;
      setModelInfo(instance.modelInfo());
      setLoading(false);
    })();
    return () => {
      garuRef.current?.destroy();
    };
  }, []);

  const handleAnalyze = useCallback(() => {
    const garu = garuRef.current;
    if (!garu || !text.trim()) return;

    const result = garu.analyze(text) as { tokens: Token[]; elapsed: number };
    setAnalyzeTokens(result.tokens);
    setElapsed(result.elapsed);
    setNouns(garu.nouns(text, { includeSL }) as string[]);
    setTokenizeTokens(garu.tokenize(text) as string[]);
  }, [text, includeSL]);

  const handleToggleSL = useCallback(
    (v: boolean) => {
      setIncludeSL(v);
      const garu = garuRef.current;
      if (garu && text.trim()) {
        setNouns(garu.nouns(text, { includeSL: v }) as string[]);
      }
    },
    [text],
  );

  return (
    <main className="mx-auto max-w-2xl px-4 pb-8">
      <Header loading={loading} modelInfo={modelInfo} />
      <InputSection
        text={text}
        onTextChange={setText}
        onAnalyze={handleAnalyze}
        loading={loading}
        elapsed={elapsed}
      />
      <ResultTabs
        analyzeTokens={analyzeTokens}
        nouns={nouns}
        tokenizeTokens={tokenizeTokens}
        includeSL={includeSL}
        onToggleSL={handleToggleSL}
      />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Verify page renders**

```bash
npm run dev
```

Open http://localhost:3000. Verify:
- Header shows with loading spinner → badges appear
- Textarea and example buttons render
- Clicking an example fills the textarea
- Clicking "분석" shows results in all 3 tabs
- Tabs switch correctly
- Footer renders with copy button

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: assemble main page with all components"
```

---

### Task 8: Build and Deploy Verification

**Files:**
- None created (verification only)

- [ ] **Step 1: Static build**

```bash
npm run build
```

Expected: Build succeeds with `output: 'export'`, produces `out/` directory.

If WASM-related build errors occur, the `next.config.ts` webpack config may need adjustment. Common fix: ensure `asyncWebAssembly` is enabled and `.wasm` files are not excluded by default rules.

- [ ] **Step 2: Test static output locally**

```bash
npx serve out
```

Open the served URL. Verify all functionality works in the static build.

- [ ] **Step 3: Commit final state**

```bash
git add -A
git commit -m "chore: verify static build for Vercel deployment"
```

- [ ] **Step 4: Deploy to Vercel**

Connect the GitHub repo to Vercel, or use Vercel CLI:

```bash
npx vercel --prod
```

Verify the deployed URL works correctly.
