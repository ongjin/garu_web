'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Header from '@/components/Header';
import InputSection from '@/components/InputSection';
import ResultTabs from '@/components/ResultTabs';
import Footer from '@/components/Footer';
import SeoContent from '@/components/SeoContent';
import ExampleSidebar from '@/components/ExampleSidebar';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [latestVersion, setLatestVersion] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const { Garu } = await import('garu-ko');
      const instance = await Garu.load();
      garuRef.current = instance;
      setModelInfo(instance.modelInfo());
      setLoading(false);
    })();
    fetch('https://registry.npmjs.org/garu-ko/latest')
      .then((r) => r.json())
      .then((d) => setLatestVersion(d.version))
      .catch(() => {});
    return () => {
      garuRef.current?.destroy();
    };
  }, []);

  const runAnalysis = useCallback((input: string, sl: boolean) => {
    const garu = garuRef.current;
    if (!garu || !input.trim()) return;

    const result = garu.analyze(input) as { tokens: Token[]; elapsed: number };
    setAnalyzeTokens(result.tokens);
    setElapsed(result.elapsed);
    setNouns(garu.nouns(input, { includeSL: sl }) as string[]);
    setTokenizeTokens(garu.tokenize(input) as string[]);
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
      const garu = garuRef.current;
      if (garu && text.trim()) {
        setNouns(garu.nouns(text, { includeSL: v }) as string[]);
      }
    },
    [text],
  );

  return (
    <>
      <main className="mx-auto max-w-[680px] px-5 pb-8">
        <Header loading={loading} modelInfo={modelInfo} latestVersion={latestVersion} />
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
