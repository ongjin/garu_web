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
    <main className="mx-auto max-w-[680px] px-5 pb-8">
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
