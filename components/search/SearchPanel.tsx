'use client';

import { useEffect, useState } from 'react';
import type { SearchAdapter, SearchHit } from './adapters/types';
import ResultCard from './ResultCard';

interface Props {
  adapter: SearchAdapter;
  query: string;
  variant: 'left' | 'right';
}

export default function SearchPanel({ adapter, query, variant }: Props) {
  const [hits, setHits] = useState<SearchHit[]>([]);

  useEffect(() => {
    if (!adapter.ready) {
      setHits([]);
      return;
    }
    let cancelled = false;
    Promise.resolve(adapter.search(query)).then((result) => {
      if (!cancelled) setHits(result);
    });
    return () => {
      cancelled = true;
    };
  }, [adapter, adapter.ready, query]);

  const accent =
    variant === 'right'
      ? 'border-[var(--accent)]/40 bg-[var(--accent)]/5'
      : 'border-border';

  return (
    <section className={`rounded-xl border ${accent} p-4`}>
      <header className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">{adapter.name}</h2>
        <span className="text-xs text-muted">매치 {hits.length}건</span>
      </header>
      {hits.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted">
          {query.trim() ? '결과 없음' : '검색어를 입력하거나 추천 칩을 클릭하세요'}
        </p>
      ) : (
        <ul className="space-y-2">
          {hits.map((h) => (
            <li key={h.id}>
              <ResultCard hit={h} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
