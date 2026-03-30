import { getPosInfo, getPosColor } from '@/lib/pos';

interface Token {
  text: string;
  pos: string;
  start: number;
  end: number;
}

interface AnalyzeTabProps {
  tokens: Token[];
}

export default function AnalyzeTab({ tokens }: AnalyzeTabProps) {
  if (tokens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted">
        <svg className="h-8 w-8 mb-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-sm">텍스트를 입력하고 분석하기를 눌러보세요</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-muted">
            <th className="pb-3 pr-4 font-medium">형태소</th>
            <th className="pb-3 pr-4 font-medium">품사</th>
            <th className="pb-3 font-medium">설명</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => {
            const info = getPosInfo(token.pos);
            const color = getPosColor(token.pos);
            return (
              <tr
                key={i}
                className="border-t border-border hover:bg-surface-hover transition-colors duration-150"
              >
                <td
                  className="py-2.5 pr-4 font-medium"
                  style={{ fontFamily: 'var(--font-mono), monospace' }}
                >
                  {token.text}
                </td>
                <td className="py-2.5 pr-4">
                  <span
                    className="inline-block rounded-md px-2 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: color.bg, color: color.fg }}
                  >
                    {info.label}
                  </span>
                </td>
                <td className="py-2.5 text-muted">{info.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
