interface NounsTabProps {
  nouns: string[];
  includeSL: boolean;
  onToggleSL: (v: boolean) => void;
}

export default function NounsTab({ nouns, includeSL, onToggleSL }: NounsTabProps) {
  return (
    <div className="space-y-5">
      <label className="inline-flex items-center gap-2.5 cursor-pointer select-none group">
        <span className="relative">
          <input
            type="checkbox"
            checked={includeSL}
            onChange={(e) => onToggleSL(e.target.checked)}
            className="peer sr-only"
          />
          <span className="block h-5 w-9 rounded-full border border-border bg-surface-hover transition-colors duration-200 peer-checked:bg-[var(--accent)] peer-checked:border-[var(--accent)]" />
          <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-4" />
        </span>
        <span className="text-sm text-muted group-hover:text-foreground transition-colors">
          외국어(SL) 포함
        </span>
      </label>

      {nouns.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted">
          <svg className="h-8 w-8 mb-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm">텍스트를 입력하고 분석하기를 눌러보세요</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {nouns.map((noun, i) => (
            <span
              key={i}
              className="rounded-lg border border-border bg-[var(--accent-soft)] px-3 py-1.5 text-sm font-medium text-[var(--accent-text)] hover:brightness-110 transition-all duration-150"
            >
              {noun}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
