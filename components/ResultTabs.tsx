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

const TABS = [
  { label: '형태소 분석', icon: 'M' },
  { label: '명사 추출', icon: 'N' },
  { label: '토큰화', icon: 'T' },
] as const;

export default function ResultTabs({
  analyzeTokens,
  nouns,
  tokenizeTokens,
  includeSL,
  onToggleSL,
}: ResultTabsProps) {
  const [active, setActive] = useState<number>(0);

  return (
    <section className="mt-8 animate-fade-in-up animate-stagger-3 opacity-0">
      <div className="card overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-border">
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              className={`focus-ring relative flex-1 px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                active === i
                  ? 'text-[var(--accent-text)]'
                  : 'text-muted hover:text-foreground'
              }`}
              onClick={() => setActive(i)}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold transition-all duration-200 ${
                    active === i
                      ? 'bg-[var(--accent-soft)] text-[var(--accent-text)]'
                      : 'bg-surface-hover text-muted'
                  }`}
                  style={{ fontFamily: 'var(--font-mono), monospace' }}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </span>
              {active === i && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-5">
          {active === 0 && <AnalyzeTab tokens={analyzeTokens} />}
          {active === 1 && (
            <NounsTab nouns={nouns} includeSL={includeSL} onToggleSL={onToggleSL} />
          )}
          {active === 2 && <TokenizeTab tokens={tokenizeTokens} />}
        </div>
      </div>
    </section>
  );
}
