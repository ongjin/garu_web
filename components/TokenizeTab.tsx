interface TokenizeTabProps {
  tokens: string[];
}

export default function TokenizeTab({ tokens }: TokenizeTabProps) {
  if (tokens.length === 0) {
    return <p className="text-gray-400 text-sm py-6 text-center">분석 결과가 여기에 표시됩니다.</p>;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 py-4">
      {tokens.map((token, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="rounded bg-gray-100 px-2 py-1 text-sm font-mono">{token}</span>
          {i < tokens.length - 1 && (
            <span className="text-gray-300 text-xs">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
