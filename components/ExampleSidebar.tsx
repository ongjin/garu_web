'use client';

import { useState } from 'react';
import { EXAMPLE_CATEGORIES } from '@/lib/examples';

interface ExampleSidebarProps {
  onSelect: (text: string) => void;
  open: boolean;
  onToggle: () => void;
}

export default function ExampleSidebar({ onSelect, open, onToggle }: ExampleSidebarProps) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar panel + toggle as one unit */}
      <aside
        className="fixed right-0 top-0 z-30 h-full w-[340px] border-l border-border bg-background flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Toggle button - attached to the left edge of the sidebar */}
        <button
          onClick={onToggle}
          className="focus-ring absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 rounded-l-xl border border-r-0 border-border-strong bg-foreground text-background hover:opacity-80 px-2 py-4 shadow-lg"
          title={open ? '예시 닫기' : '예시 열기'}
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
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">예시 문장</h2>
            <p className="text-xs text-muted mt-0.5">클릭하면 자동으로 입력됩니다</p>
          </div>
          <button
            onClick={onToggle}
            className="focus-ring rounded-lg p-1.5 text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Category tabs - wrapping grid */}
        <div className="flex flex-wrap gap-1 border-b border-border px-4 py-3">
          {EXAMPLE_CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`focus-ring rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                activeCategory === i
                  ? 'bg-[var(--accent-soft)] text-[var(--accent-text)]'
                  : 'text-muted hover:text-foreground hover:bg-surface-hover'
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Example list */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <div className="space-y-1.5">
            {EXAMPLE_CATEGORIES[activeCategory].examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => onSelect(ex)}
                className="focus-ring w-full text-left rounded-lg border border-transparent px-3 py-2.5 text-sm text-foreground hover:bg-surface-hover hover:border-border active:scale-[0.99] transition-all duration-150 leading-relaxed"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Footer count */}
        <div className="border-t border-border px-5 py-3">
          <p className="text-xs text-muted text-center">
            {EXAMPLE_CATEGORIES.reduce((sum, cat) => sum + cat.examples.length, 0)}개의 예시 문장
          </p>
        </div>
      </aside>
    </>
  );
}
