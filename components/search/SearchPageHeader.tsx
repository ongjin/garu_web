interface Props {
  engineLabel: string;
  subtitle: string;
}

export default function SearchPageHeader({ engineLabel, subtitle }: Props) {
  return (
    <header className="space-y-2 text-center">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-text)] bg-clip-text text-transparent">
          {engineLabel}
        </span>{' '}
        <span className="text-muted">×</span> 한국어
      </h1>
      <p className="text-sm text-muted">{subtitle}</p>
    </header>
  );
}
