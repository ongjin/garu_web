interface HeaderProps {
  loading: boolean;
  modelInfo?: { version: string; size: number; accuracy: number };
}

export default function Header({ loading, modelInfo }: HeaderProps) {
  return (
    <header className="text-center py-10">
      <h1 className="text-4xl font-bold tracking-tight">가루 (Garu)</h1>
      <p className="mt-2 text-lg text-gray-500">
        Browser-native Korean morphological analyzer
      </p>
      <div className="mt-4 flex justify-center gap-2">
        {loading ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
            <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading model...
          </span>
        ) : modelInfo ? (
          <>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              v{modelInfo.version}
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              {(modelInfo.size / 1024 / 1024).toFixed(1)}MB model
            </span>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
              F1 {(modelInfo.accuracy * 100).toFixed(1)}%
            </span>
          </>
        ) : null}
      </div>
    </header>
  );
}
