'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { AnalyzeResult, Garu, ModelInfo, Token } from 'garu-ko';
import PageNav from '@/components/PageNav';
import Header from '@/components/Header';
import InputSection from '@/components/InputSection';
import ResultTabs from '@/components/ResultTabs';
import Footer from '@/components/Footer';
import SeoContent from '@/components/SeoContent';
import ExampleSidebar from '@/components/ExampleSidebar';
import { loadGaru } from '@/lib/garu/loadGaru';

function buildReportUrl(
  version: string,
  input: string,
  tokens: Token[],
  elapsed: number,
) {
  const escape = (s: string) => s.replace(/\|/g, '\\|');
  const rows = tokens
    .map((t) => `| ${escape(t.text)} | \`${t.pos}\` |`)
    .join('\n');
  const title = `[분석 오류] ${input}`;
  const body = [
    `> ${input}`,
    ``,
    `#### 무엇이 잘못되었나요?`,
    `<!-- 어떤 형태소/품사가 어떻게 나와야 하는지 적어주세요 -->`,
    ``,
    ``,
    `#### 현재 분석 결과`,
    ``,
    `| 형태소 | 품사 |`,
    `| --- | --- |`,
    rows,
    ``,
    `---`,
    `<sub>garu-ko \`${version}\` · ${elapsed.toFixed(2)}ms</sub>`,
  ].join('\n');
  return `https://github.com/ongjin/garu/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

export default function Home() {
  const garuRef = useRef<Garu | null>(null);
  const [loading, setLoading] = useState(true);
  const [modelInfo, setModelInfo] = useState<ModelInfo | undefined>();

  const [text, setText] = useState('');
  const [analyzedText, setAnalyzedText] = useState('');
  const [analyzeTokens, setAnalyzeTokens] = useState<Token[]>([]);
  const [nouns, setNouns] = useState<string[]>([]);
  const [tokenizeTokens, setTokenizeTokens] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [includeSL, setIncludeSL] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [latestVersion, setLatestVersion] = useState<string | undefined>();
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const instance = await loadGaru();
      if (cancelled) return;
      garuRef.current = instance;
      setModelInfo(instance.modelInfo());
      setLoading(false);
    })();
    fetch('https://registry.npmjs.org/garu-ko/latest')
      .then((r) => r.json())
      .then((d) => setLatestVersion(d.version))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const runAnalysis = useCallback((input: string, sl: boolean) => {
    const garu = garuRef.current;
    if (!garu || !input.trim()) return;

    setAnalyzing(true);
    // Yield a frame so the UI can show loading state before WASM blocks main thread
    setTimeout(() => {
      try {
        const result = garu.analyze(input) as AnalyzeResult;
        setAnalyzeTokens(result.tokens);
        setElapsed(result.elapsed);
        setAnalyzedText(input);

        const nounTags = new Set(['NNG', 'NNP']);
        if (sl) nounTags.add('SL');
        setNouns(
          result.tokens
            .filter((t: Token) => nounTags.has(t.pos))
            .map((t: Token) => t.text),
        );
        setTokenizeTokens(result.tokens.map((t: Token) => t.text));
      } finally {
        setAnalyzing(false);
      }
    }, 0);
  }, []);

  const handleAnalyze = useCallback(() => {
    runAnalysis(text, includeSL);
  }, [text, includeSL, runAnalysis]);

  const handleExampleSelect = useCallback(
    (example: string) => {
      setText(example);
      runAnalysis(example, includeSL);
    },
    [includeSL, runAnalysis],
  );

  const handleToggleSL = useCallback(
    (v: boolean) => {
      setIncludeSL(v);
      // Re-extract nouns from existing tokens instead of re-analyzing
      const nounTags = new Set(['NNG', 'NNP']);
      if (v) nounTags.add('SL');
      setNouns(
        analyzeTokens
          .filter((t) => nounTags.has(t.pos))
          .map((t) => t.text),
      );
    },
    [analyzeTokens],
  );

  return (
    <>
      <main className="mx-auto max-w-[1100px] px-5 pb-8">
        <PageNav />
        <Header loading={loading} modelInfo={modelInfo} latestVersion={latestVersion} />
        <InputSection
          text={text}
          onTextChange={setText}
          onAnalyze={handleAnalyze}
          loading={loading}
          analyzing={analyzing}
          elapsed={elapsed}
          reportUrl={
            analyzeTokens.length > 0 && modelInfo && elapsed !== null
              ? buildReportUrl(
                  modelInfo.version,
                  analyzedText,
                  analyzeTokens,
                  elapsed,
                )
              : undefined
          }
        />
        <ResultTabs
          analyzeTokens={analyzeTokens}
          nouns={nouns}
          tokenizeTokens={tokenizeTokens}
          includeSL={includeSL}
          onToggleSL={handleToggleSL}
        />
        <SeoContent />
        <Footer />
      </main>

      <ExampleSidebar
        onSelect={handleExampleSelect}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
      />
    </>
  );
}
