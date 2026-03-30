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
    return <p className="text-gray-400 text-sm py-6 text-center">분석 결과가 여기에 표시됩니다.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-500">
            <th className="py-2 pr-4 font-medium">형태소</th>
            <th className="py-2 pr-4 font-medium">품사</th>
            <th className="py-2 font-medium">설명</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => {
            const info = getPosInfo(token.pos);
            const color = getPosColor(token.pos);
            return (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-1.5 pr-4 font-mono">{token.text}</td>
                <td className="py-1.5 pr-4">
                  <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${color}`}>
                    {info.label}
                  </span>
                </td>
                <td className="py-1.5 text-gray-600">{info.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
