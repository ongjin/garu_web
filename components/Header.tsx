import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

interface HeaderProps {
  loading: boolean;
  modelInfo?: { version: string; size: number; accuracy: number };
  latestVersion?: string;
}

function versionsBehind(current: string, latest: string): number {
  const parse = (v: string) => v.split('.').map(Number);
  const [cMaj, cMin, cPat] = parse(current);
  const [lMaj, lMin, lPat] = parse(latest);
  if (cMaj !== lMaj) return (lMaj - cMaj) * 100;
  if (cMin !== lMin) return (lMin - cMin) * 10 + (lPat - cPat);
  return lPat - cPat;
}

export default function Header({ loading, modelInfo, latestVersion }: HeaderProps) {
  const behind =
    modelInfo && latestVersion && modelInfo.version !== latestVersion
      ? versionsBehind(modelInfo.version, latestVersion)
      : 0;

  return (
    <header className="relative pt-12 pb-8 animate-fade-in-up">
      <div className="absolute top-4 right-0">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center">
        <Logo size={64} />

        <h1
          className="mt-4 text-4xl font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
        >
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-text)] bg-clip-text text-transparent">
            가루
          </span>
          <span className="text-muted ml-2 text-2xl font-normal">Garu</span>
        </h1>

        <p className="mt-2 text-muted text-sm tracking-wide">
          Browser-native Korean morphological analyzer
        </p>

        <div className="mt-4 flex justify-center gap-2 flex-wrap">
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

        {behind > 0 && latestVersion && (
          <a
            href="https://www.npmjs.com/package/garu-ko"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs hover:brightness-95 transition-all animate-fade-in-up opacity-0"
            style={{
              backgroundColor: 'var(--warn-bg)',
              borderColor: 'var(--warn-border)',
              color: 'var(--warn-text)',
              animationDelay: '0.25s',
            }}
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            최신 버전 v{latestVersion} 사용 가능 ({behind}버전 뒤처짐)
          </a>
        )}
      </div>
    </header>
  );
}
