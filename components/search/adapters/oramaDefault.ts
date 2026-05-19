import {
  create,
  insert,
  search,
  type AnyOrama,
  type Results,
  type Tokenizer,
} from '@orama/orama';
import type { SearchAdapter, SearchHit, SampleDoc } from './types';

type Doc = { id: string; title: string; body: string };

const BASIC_SPLITTER = /[^\p{L}\p{N}_'-]+/gu;

// Orama v3's built-in English tokenizer drops Hangul, so the baseline keeps
// surface-form whitespace/punctuation splitting while preserving Korean text.
function basicTokenize(raw: string): string[] {
  if (!raw) return [];
  return Array.from(new Set(raw.toLowerCase().split(BASIC_SPLITTER).filter(Boolean)));
}

function createBasicTokenizer(): Tokenizer {
  return {
    language: 'korean-basic',
    normalizationCache: new Map(),
    tokenize(raw: string): string[] {
      return basicTokenize(raw);
    },
  };
}

export class OramaDefaultAdapter implements SearchAdapter {
  name = 'Orama (기본 토크나이저)';
  ready = false;
  private db: AnyOrama | null = null;

  async init(docs: SampleDoc[]): Promise<void> {
    this.ready = false;
    const db = await create({
      schema: { id: 'string', title: 'string', body: 'string' } as const,
      components: { tokenizer: createBasicTokenizer() },
    });
    for (const doc of docs) {
      await insert(db, doc);
    }
    this.db = db;
    this.ready = true;
  }

  async search(query: string): Promise<SearchHit[]> {
    if (!this.db || !query.trim()) return [];
    const queryTokens = basicTokenize(query);
    const res = (await search(this.db, { term: query })) as Results<Doc>;
    return res.hits
      .filter((h) => {
        const docTokens = new Set([
          ...basicTokenize(h.document.title),
          ...basicTokenize(h.document.body),
        ]);
        return queryTokens.some((token) => docTokens.has(token));
      })
      .map((h) => ({
        id: h.document.id,
        title: h.document.title,
        body: h.document.body,
        score: h.score,
        matchedTerms: queryTokens,
      }));
  }
}
