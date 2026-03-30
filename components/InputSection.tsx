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
    <section className="space-y-3">
      <textarea
        className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
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
      <div className="flex flex-wrap items-center gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={() => {
              onTextChange(ex);
            }}
          >
            {ex}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3">
          {elapsed !== null && (
            <span className="text-sm text-gray-400">{elapsed.toFixed(2)}ms</span>
          )}
          <button
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            onClick={onAnalyze}
            disabled={loading || !text.trim()}
          >
            분석
          </button>
        </div>
      </div>
    </section>
  );
}
