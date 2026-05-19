'use client';

import { useEffect, useMemo, useState } from 'react';
import type { SampleDoc, SearchAdapter } from './adapters/types';
import type { ChipSet } from '@/lib/search/suggestionChips';
import SearchInput from './SearchInput';
import SuggestionChips from './SuggestionChips';
import SearchPanel from './SearchPanel';

interface Props {
  engineLabel: string;
  subtitle: string;
  makeLeft: () => SearchAdapter;
  makeRight: () => SearchAdapter;
  chips: ChipSet[];
  docs: SampleDoc[];
}

export default function SearchDemo({
  engineLabel,
  subtitle,
  makeLeft,
  makeRight,
  chips,
  docs,
}: Props) {
  const left = useMemo(() => makeLeft(), [makeLeft]);
  const right = useMemo(() => makeRight(), [makeRight]);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    Promise.all([left.init(docs), right.init(docs)]).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [left, right, docs]);

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-text)] bg-clip-text text-transparent">
            {engineLabel}
          </span>{' '}
          <span className="text-muted">×</span> 한국어
        </h1>
        <p className="text-sm text-muted">{subtitle}</p>
      </header>

      <div className="space-y-3">
        <SearchInput
          value={query}
          onChange={setQuery}
          disabled={!ready}
          placeholder={ready ? '검색어를 입력하세요' : '모델 로딩 중...'}
        />
        <SuggestionChips chips={chips} onSelect={setQuery} disabled={!ready} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SearchPanel adapter={left} query={query} variant="left" />
        <SearchPanel adapter={right} query={query} variant="right" />
      </div>
    </div>
  );
}
