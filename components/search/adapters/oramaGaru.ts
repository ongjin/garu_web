import type { Garu } from 'garu-ko';
import { create, insert, search, type AnyOrama, type Results } from '@orama/orama';
import { createTokenizer } from 'garu-orama-tokenizer';
import type { SearchAdapter, SearchHit, SampleDoc } from './types';
import { loadGaru } from '@/lib/garu/loadGaru';
import { getGaruHighlightRanges, getGaruSearchTerms } from '@/lib/search/highlight';

type Doc = { id: string; title: string; body: string };

export class OramaGaruAdapter implements SearchAdapter {
  name = 'garu-orama-tokenizer';
  ready = false;
  private db: AnyOrama | null = null;
  private garu: Garu | null = null;

  async init(docs: SampleDoc[]): Promise<void> {
    this.ready = false;
    const garu = await loadGaru();
    this.garu = garu;
    const tokenizer = await createTokenizer({ garu });
    const db = await create({
      schema: { id: 'string', title: 'string', body: 'string' } as const,
      components: { tokenizer },
    });
    for (const doc of docs) {
      await insert(db, doc);
    }
    this.db = db;
    this.ready = true;
  }

  async search(query: string): Promise<SearchHit[]> {
    if (!this.db || !query.trim()) return [];
    const queryTerms = this.garu ? getGaruSearchTerms(this.garu, query) : new Set<string>();
    const res = (await search(this.db, { term: query })) as Results<Doc>;
    return res.hits.map((h) => ({
      id: h.document.id,
      title: h.document.title,
      body: h.document.body,
      score: h.score,
      matchedTerms: [query],
      matchedRanges: this.garu
        ? {
            title: getGaruHighlightRanges(this.garu, h.document.title, queryTerms),
            body: getGaruHighlightRanges(this.garu, h.document.body, queryTerms),
          }
        : undefined,
    }));
  }
}
