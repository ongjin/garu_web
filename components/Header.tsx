import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  loading: boolean;
  modelInfo?: { version: string; size: number; accuracy: number };
}

export default function Header({ loading, modelInfo }: HeaderProps) {
  return (
    <header className="relative pt-12 pb-8 animate-fade-in-up">
      <div className="absolute top-4 right-0">
        <ThemeToggle />
      </div>

      <div className="text-center">
        <h1
          className="text-5xl font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
        >
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-text)] bg-clip-text text-transparent">
            가루
          </span>
          <span className="text-muted ml-2 text-3xl font-normal">Garu</span>
        </h1>

        <p className="mt-3 text-muted text-base tracking-wide">
          Browser-native Korean morphological analyzer
        </p>

        <div className="mt-5 flex justify-center gap-2 flex-wrap">
          {loading ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              Loading model...
            </span>
          ) : modelInfo ? (
            <>
              <span className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted animate-fade-in-up animate-stagger-1 opacity-0">
                <span className="text-[var(--accent-text)] font-medium">v{modelInfo.version}</span>
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted animate-fade-in-up animate-stagger-2 opacity-0">
                <span className="font-medium">{(modelInfo.size / 1024 / 1024).toFixed(1)}</span>MB
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted animate-fade-in-up animate-stagger-3 opacity-0">
                F1 <span className="text-[var(--accent-text)] font-medium">{(modelInfo.accuracy * 100).toFixed(1)}%</span>
              </span>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
