'use client';

import { useMemo, useState } from 'react';
import type { SampleDoc, SampleDocGroup } from '@/lib/search/sampleDocs';

interface Props {
  docs: SampleDoc[];
  groups: SampleDocGroup[];
  onSelectQuery: (query: string) => void;
  open: boolean;
  onToggle: () => void;
}

export default function SearchSampleSidebar({
  docs,
  groups,
  onSelectQuery,
  open,
  onToggle,
}: Props) {
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? '');
  const docsById = useMemo(() => new Map(docs.map((doc) => [doc.id, doc])), [docs]);
  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];
  const activeDocs =
    activeGroup?.docIds
      .map((id) => docsById.get(id))
      .filter((doc): doc is SampleDoc => Boolean(doc)) ?? [];

  if (!activeGroup) return null;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className="fixed right-0 top-0 z-30 flex h-full w-[360px] flex-col border-l border-border bg-background"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <button
          type="button"
          onClick={onToggle}
          className="focus-ring absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 rounded-l-xl border border-r-0 border-border-strong bg-foreground px-2 py-4 text-background shadow-lg hover:opacity-80"
          title={open ? '테스트 문장 닫기' : '테스트 문장 열기'}
        >
          <svg
            className="h-4 w-4 transition-transform duration-300"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">테스트 문장</h2>
            <p className="mt-0.5 text-xs text-muted">검색어 버튼을 누르면 입력됩니다</p>
          </div>
          <button
            type="button"
            onClick={onToggle}
            className="focus-ring rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-1 border-b border-border px-4 py-3">
          {groups.map((group) => {
            const active = group.id === activeGroup.id;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveGroupId(group.id)}
                className={`focus-ring rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                  active
                    ? 'bg-[var(--accent-soft)] text-[var(--accent-text)]'
                    : 'text-muted hover:bg-surface-hover hover:text-foreground'
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        <div className="border-b border-border px-5 py-3">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs leading-relaxed text-muted">{activeGroup.description}</p>
            <button
              type="button"
              onClick={() => onSelectQuery(activeGroup.query)}
              className="shrink-0 rounded-full border border-[var(--accent)]/30 px-3 py-1 text-xs font-medium text-[var(--accent-text)] hover:bg-[var(--accent)]/10"
            >
              {activeGroup.query} 검색
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          <div className="space-y-2">
            {activeDocs.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => onSelectQuery(activeGroup.query)}
                className="focus-ring w-full rounded-lg border border-transparent px-3 py-2.5 text-left text-sm text-foreground transition-all duration-150 hover:border-border hover:bg-surface-hover active:scale-[0.99]"
              >
                <span className="block text-xs font-medium text-muted">{doc.title}</span>
                <span className="mt-1 block leading-relaxed">{doc.body}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-border px-5 py-3">
          <p className="text-center text-xs text-muted">{docs.length}개의 테스트 문서</p>
        </div>
      </aside>
    </>
  );
}
