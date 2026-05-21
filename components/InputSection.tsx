interface InputSectionProps {
  text: string;
  onTextChange: (text: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  analyzing: boolean;
  elapsed: number | null;
  reportUrl?: string;
}

export default function InputSection({
  text,
  onTextChange,
  onAnalyze,
  loading,
  analyzing,
  elapsed,
  reportUrl,
}: InputSectionProps) {
  const disabled = loading || analyzing || !text.trim();

  return (
    <section className="animate-fade-in-up animate-stagger-2 opacity-0">
      <div className="card p-1">
        <textarea
          className="focus-ring w-full rounded-[12px] bg-transparent p-4 text-base text-foreground placeholder-muted outline-none resize-none"
          rows={4}
          placeholder="한국어 텍스트를 입력하세요..."
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          disabled={analyzing}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              if (!disabled) onAnalyze();
            }
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-end gap-3">
        {elapsed !== null && !analyzing && (
          <div className="flex items-center gap-2">
            {reportUrl && (
              <>
                <a
                  href={reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center gap-1.5 rounded-md text-xs text-muted hover:text-[var(--accent-text)] transition-colors"
                  title="GitHub에서 분석 오류 제보하기"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.13c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.38.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.81 1.19 1.83 1.19 3.09 0 4.43-2.69 5.39-5.26 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                  오류 제보
                </a>
                <span aria-hidden className="text-xs text-muted/50">·</span>
              </>
            )}
            <span
              className="text-xs text-muted tabular-nums"
              style={{ fontFamily: 'var(--font-mono), monospace' }}
            >
              {elapsed.toFixed(2)}ms
            </span>
          </div>
        )}
        <button
          className="focus-ring rounded-xl bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:hover:brightness-100 disabled:cursor-wait transition-all duration-200 flex items-center gap-2"
          onClick={onAnalyze}
          disabled={disabled}
        >
          {analyzing ? (
            <>
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              분석 중...
            </>
          ) : (
            '분석하기'
          )}
        </button>
      </div>
    </section>
  );
}
