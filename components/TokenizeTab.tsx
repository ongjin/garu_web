interface TokenizeTabProps {
  tokens: string[];
}

export default function TokenizeTab({ tokens }: TokenizeTabProps) {
  if (tokens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted">
        <svg className="h-8 w-8 mb-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-sm">텍스트를 입력하고 분석하기를 눌러보세요</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 py-4">
      {tokens.map((token, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span
            className="rounded-lg border border-border bg-surface-hover px-3 py-1.5 text-sm font-medium"
            style={{ fontFamily: 'var(--font-mono), monospace' }}
          >
            {token}
          </span>
          {i < tokens.length - 1 && (
            <span className="text-border-strong text-xs select-none">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
