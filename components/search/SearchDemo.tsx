'use client';

import { useEffect, useState } from 'react';
import type { SampleDoc, SearchAdapter, SearchAdapterFactory } from './adapters/types';
import type { ChipSet } from '@/lib/search/suggestionChips';
import { SAMPLE_DOC_GROUPS } from '@/lib/search/sampleDocs';
import SearchInput from './SearchInput';
import SuggestionChips from './SuggestionChips';
import SearchPanel from './SearchPanel';
import SearchPageHeader from './SearchPageHeader';
import SearchSampleSidebar from './SearchSampleSidebar';

type LoadingPhase = 'default-index' | 'garu-model' | 'ready' | 'error';

function yieldToBrowser(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
}

interface Props {
  engineLabel: string;
  subtitle: string;
  makeLeft: SearchAdapterFactory;
  makeRight: SearchAdapterFactory;
  chips: ChipSet[];
  docs: SampleDoc[];
  showHeader?: boolean;
}

export default function SearchDemo({
  engineLabel,
  subtitle,
  makeLeft,
  makeRight,
  chips,
  docs,
  showHeader = true,
}: Props) {
  const [left, setLeft] = useState<SearchAdapter | null>(null);
  const [right, setRight] = useState<SearchAdapter | null>(null);
  const [phase, setPhase] = useState<LoadingPhase>('default-index');
  const [query, setQuery] = useState('');
  const [sampleSidebarOpen, setSampleSidebarOpen] = useState(false);
  const ready = phase === 'ready';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const leftAdapter = await Promise.resolve(makeLeft());
        if (!leftAdapter.ready) await leftAdapter.init(docs);
        if (cancelled) return;
        setLeft(leftAdapter);
        setPhase('garu-model');

        await yieldToBrowser();
        if (cancelled) return;

        const rightAdapter = await Promise.resolve(makeRight());
        if (!rightAdapter.ready) await rightAdapter.init(docs);
        if (cancelled) return;
        setRight(rightAdapter);
        setPhase('ready');
      } catch (error) {
        console.error(error);
        if (!cancelled) setPhase('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [makeLeft, makeRight, docs]);

  const loadingCopy =
    phase === 'default-index'
      ? {
          title: '기본 인덱스 준비 중',
          description: `${engineLabel} 기본 검색 패널을 구성하고 있어요.`,
        }
      : phase === 'garu-model'
        ? {
            title: 'Garu 모델 로딩 중',
            description: '한국어 형태소 모델과 토크나이저를 연결하고 있어요.',
          }
        : {
            title: '검색 데모를 준비하지 못했습니다',
            description: '페이지를 새로고침한 뒤 다시 시도해 주세요.',
          };

  return (
    <div className="space-y-6">
      {showHeader && <SearchPageHeader engineLabel={engineLabel} subtitle={subtitle} />}

      <div className="space-y-3">
        <SearchInput
          value={query}
          onChange={setQuery}
          disabled={!ready}
          placeholder={ready ? '검색어를 입력하세요' : '모델 로딩 중...'}
        />
        <SuggestionChips chips={chips} onSelect={setQuery} disabled={!ready} />

        {!ready && (
          <section
            aria-live="polite"
            className="overflow-hidden rounded-xl border border-[var(--accent)]/25 bg-surface shadow-[0_12px_32px_rgba(13,148,136,0.08)]"
          >
            <div className="h-1 bg-[var(--accent-soft)]">
              <div className="h-full w-1/3 animate-pulse bg-[var(--accent)]" />
            </div>
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10">
                  <span className="absolute h-10 w-10 rounded-full bg-[var(--accent)]/20 animate-ping" />
                  <span className="relative h-3 w-3 rounded-full bg-[var(--accent)]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{loadingCopy.title}</p>
                  <p className="mt-1 text-xs text-muted">{loadingCopy.description}</p>
                </div>
              </div>
              <div className="grid min-w-44 gap-2" aria-hidden="true">
                <span className="h-2 rounded-full bg-[var(--accent)]/20" />
                <span className="h-2 w-3/4 rounded-full bg-border" />
                <span className="h-2 w-1/2 rounded-full bg-border" />
              </div>
            </div>
          </section>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {left ? (
          <SearchPanel adapter={left} query={query} variant="left" />
        ) : (
          <SearchPanelSkeleton title={`${engineLabel} (기본 토크나이저)`} />
        )}
        {right ? (
          <SearchPanel adapter={right} query={query} variant="right" />
        ) : (
          <SearchPanelSkeleton title="Garu 토크나이저" variant="right" />
        )}
      </div>

      <SearchSampleSidebar
        docs={docs}
        groups={SAMPLE_DOC_GROUPS}
        onSelectQuery={setQuery}
        open={sampleSidebarOpen}
        onToggle={() => setSampleSidebarOpen((open) => !open)}
      />
    </div>
  );
}

function SearchPanelSkeleton({
  title,
  variant = 'left',
}: {
  title: string;
  variant?: 'left' | 'right';
}) {
  const accent =
    variant === 'right'
      ? 'border-[var(--accent)]/40 bg-[var(--accent)]/5'
      : 'border-border';

  return (
    <section className={`rounded-xl border ${accent} p-4`} aria-hidden="true">
      <header className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-muted">{title}</h2>
        <span className="text-xs text-muted">준비 중</span>
      </header>
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-border bg-surface p-3">
            <div className="h-3 w-1/2 rounded-full bg-border" />
            <div className="mt-3 h-2 rounded-full bg-border" />
            <div className="mt-2 h-2 w-3/4 rounded-full bg-border" />
          </div>
        ))}
      </div>
    </section>
  );
}
