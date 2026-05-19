import type { AnalyzeResult, Garu, POS, Token } from 'garu-ko';

export interface HighlightRange {
  start: number;
  end: number;
}

export interface SearchMatchedRanges {
  title?: HighlightRange[];
  body?: HighlightRange[];
}

const CONTENT_POS = new Set<POS>([
  'NNG',
  'NNP',
  'NR',
  'VV',
  'VA',
  'SL',
  'SH',
  'SN',
  'XR',
]);

const LEADING_PUNCT = /^[\s"'([{<]+/;
const TRAILING_PUNCT = /[\s"'.,!?;:)\]}>\u3002\uff0c\uff0e\uff01\uff1f]+$/;

function analyzeTokens(garu: Garu, text: string): Token[] {
  const result = garu.analyze(text) as AnalyzeResult | AnalyzeResult[];
  return Array.isArray(result) ? result[0]?.tokens ?? [] : result.tokens;
}

export function getGaruSearchTerms(garu: Garu, query: string): Set<string> {
  return new Set(
    analyzeTokens(garu, query)
      .filter((token) => CONTENT_POS.has(token.pos))
      .map((token) => token.text.toLowerCase()),
  );
}

function expandToEojeol(text: string, start: number, end: number): HighlightRange {
  let rangeStart = Math.max(0, Math.min(start, text.length));
  let rangeEnd = Math.max(rangeStart, Math.min(end, text.length));

  while (rangeStart > 0 && !/\s/.test(text[rangeStart - 1])) {
    rangeStart -= 1;
  }
  while (rangeEnd < text.length && !/\s/.test(text[rangeEnd])) {
    rangeEnd += 1;
  }

  const expanded = text.slice(rangeStart, rangeEnd);
  const leading = expanded.match(LEADING_PUNCT)?.[0].length ?? 0;
  const trailing = expanded.match(TRAILING_PUNCT)?.[0].length ?? 0;

  return {
    start: rangeStart + leading,
    end: Math.max(rangeStart + leading, rangeEnd - trailing),
  };
}

export function mergeHighlightRanges(ranges: HighlightRange[]): HighlightRange[] {
  const sorted = ranges
    .filter((range) => range.end > range.start)
    .sort((a, b) => a.start - b.start || a.end - b.end);
  const merged: HighlightRange[] = [];

  for (const range of sorted) {
    const previous = merged[merged.length - 1];
    if (previous && range.start <= previous.end) {
      previous.end = Math.max(previous.end, range.end);
    } else {
      merged.push({ ...range });
    }
  }

  return merged;
}

export function getGaruHighlightRanges(
  garu: Garu,
  text: string,
  queryTerms: Set<string>,
): HighlightRange[] {
  if (!text || queryTerms.size === 0) return [];

  return mergeHighlightRanges(
    analyzeTokens(garu, text)
      .filter((token) => CONTENT_POS.has(token.pos))
      .filter((token) => queryTerms.has(token.text.toLowerCase()))
      .map((token) =>
        expandToEojeol(
          text,
          token.start,
          Math.max(token.end, token.start + token.text.length),
        ),
      ),
  );
}
