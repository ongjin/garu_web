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
