import type { ReactNode } from 'react';
import type { SearchHit } from './adapters/types';

interface Props {
  hit: SearchHit;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text: string, terms: string[]): ReactNode {
  if (terms.length === 0) return text;
  const unique = Array.from(new Set(terms.filter((t) => t.length > 0)));
  if (unique.length === 0) return text;
  const escaped = unique.map(escapeRegex);
  const splitPattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const testPattern = new RegExp(`^(?:${escaped.join('|')})$`, 'i');
  const parts = text.split(splitPattern);
  return parts.map((part, i) =>
    testPattern.test(part) ? (
      <mark
        key={i}
        className="rounded bg-[var(--accent)]/15 px-0.5 text-[var(--accent-text)]"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default function ResultCard({ hit }: Props) {
  return (
    <article className="rounded-lg border border-border bg-surface p-3">
      <header className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold">{highlight(hit.title, hit.matchedTerms)}</h3>
        {typeof hit.score === 'number' && (
          <span className="shrink-0 text-xs text-muted">
            {hit.score.toFixed(2)}
          </span>
        )}
      </header>
      <p className="mt-1 text-sm text-muted line-clamp-2">
        {highlight(hit.body, hit.matchedTerms)}
      </p>
    </article>
  );
}
