import type { ReactNode } from 'react';
import type { SearchHit } from './adapters/types';
import type { HighlightRange } from '@/lib/search/highlight';

interface Props {
  hit: SearchHit;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const markClass = 'rounded bg-[var(--accent)]/25 px-0.5 font-medium text-[var(--accent-text)]';

function highlightRanges(text: string, ranges: HighlightRange[] | undefined): ReactNode | null {
  if (!ranges || ranges.length === 0) return null;
  const parts: ReactNode[] = [];
  let cursor = 0;

  ranges.forEach((range, index) => {
    const start = Math.max(0, Math.min(range.start, text.length));
    const end = Math.max(start, Math.min(range.end, text.length));
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <mark key={`range-${index}`} className={markClass}>
        {text.slice(start, end)}
      </mark>,
    );
    cursor = end;
  });

  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

function highlightTerms(text: string, terms: string[]): ReactNode {
  if (terms.length === 0) return text;
  const unique = Array.from(new Set(terms.filter((t) => t.length > 0)));
  if (unique.length === 0) return text;
  const escaped = unique.map(escapeRegex);
  const splitPattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const testPattern = new RegExp(`^(?:${escaped.join('|')})$`, 'i');
  const parts = text.split(splitPattern);
  return parts.map((part, i) =>
    testPattern.test(part) ? (
      <mark key={i} className={markClass}>
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function highlight(
  text: string,
  terms: string[],
  ranges: HighlightRange[] | undefined,
): ReactNode {
  return highlightRanges(text, ranges) ?? highlightTerms(text, terms);
}

export default function ResultCard({ hit }: Props) {
  return (
    <article className="rounded-lg border border-border bg-surface p-3">
      <header className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold">
          {highlight(hit.title, hit.matchedTerms, hit.matchedRanges?.title)}
        </h3>
        {typeof hit.score === 'number' && (
          <span className="shrink-0 text-xs text-muted">
            {hit.score.toFixed(2)}
          </span>
        )}
      </header>
      <p className="mt-1 text-sm text-muted line-clamp-2">
        {highlight(hit.body, hit.matchedTerms, hit.matchedRanges?.body)}
      </p>
    </article>
  );
}
