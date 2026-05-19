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

export default function Home() {
  const garuRef = useRef<Garu | null>(null);
  const [loading, setLoading] = useState(true);
  const [modelInfo, setModelInfo] = useState<ModelInfo | undefined>();

  const [text, setText] = useState('');
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
