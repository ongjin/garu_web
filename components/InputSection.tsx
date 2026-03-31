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
