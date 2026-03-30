interface NounsTabProps {
  nouns: string[];
  includeSL: boolean;
  onToggleSL: (v: boolean) => void;
}

export default function NounsTab({ nouns, includeSL, onToggleSL }: NounsTabProps) {
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={includeSL}
          onChange={(e) => onToggleSL(e.target.checked)}
          className="rounded border-gray-300"
        />
        외국어(SL) 포함
      </label>
      {nouns.length === 0 ? (
        <p className="text-gray-400 text-sm py-6 text-center">분석 결과가 여기에 표시됩니다.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {nouns.map((noun, i) => (
            <span
              key={i}
              className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-sm text-blue-700"
            >
              {noun}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
