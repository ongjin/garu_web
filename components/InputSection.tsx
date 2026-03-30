const EXAMPLES = [
  '배가 아파서 약을 먹었다',
  '나는 하늘을 나는 새를 보았다',
  'AI 기술이 b2b 시장에서 발전했다',
  '인공지능 기반 자연어처리 연구',
];

interface InputSectionProps {
  text: string;
  onTextChange: (text: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  elapsed: number | null;
}

export default function InputSection({
  text,
  onTextChange,
  onAnalyze,
  loading,
  elapsed,
}: InputSectionProps) {
  return (
    <section className="animate-fade-in-up animate-stagger-2 opacity-0">
      <div className="card p-1">
        <textarea
          className="focus-ring w-full rounded-[12px] bg-transparent p-4 text-base text-foreground placeholder-muted outline-none resize-none"
          rows={4}
          placeholder="한국어 텍스트를 입력하세요..."
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              onAnalyze();
            }
          }}
        />

        <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-muted shrink-0">Try:</span>
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex}
                className={`focus-ring shrink-0 rounded-lg border border-border px-2.5 py-1 text-xs text-muted hover:text-foreground hover:bg-surface-hover transition-all duration-200 animate-fade-in-up opacity-0 animate-stagger-${i + 1}`}
                onClick={() => onTextChange(ex)}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-3">
        {elapsed !== null && (
          <span
            className="text-xs text-muted tabular-nums"
            style={{ fontFamily: 'var(--font-mono), monospace' }}
          >
            {elapsed.toFixed(2)}ms
          </span>
        )}
        <button
          className="focus-ring rounded-xl bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:hover:brightness-100 transition-all duration-200"
          onClick={onAnalyze}
          disabled={loading || !text.trim()}
        >
          분석하기
        </button>
      </div>
    </section>
  );
}
