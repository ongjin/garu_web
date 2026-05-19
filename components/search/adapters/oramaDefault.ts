import { create, insert, search, type AnyOrama, type Results } from '@orama/orama';
import type { SearchAdapter, SearchHit, SampleDoc } from './types';

type Doc = { id: string; title: string; body: string };

export class OramaDefaultAdapter implements SearchAdapter {
  name = 'Orama (기본 토크나이저)';
  ready = false;
  private db: AnyOrama | null = null;

  async init(docs: SampleDoc[]): Promise<void> {
    this.db = await create({
      schema: { id: 'string', title: 'string', body: 'string' } as const,
    });
    for (const doc of docs) {
      await insert(this.db, doc);
    }
    this.ready = true;
  }

  async search(query: string): Promise<SearchHit[]> {
    if (!this.db || !query.trim()) return [];
    const res = (await search(this.db, { term: query })) as Results<Doc>;
    return res.hits.map((h) => ({
      id: h.document.id,
      title: h.document.title,
      body: h.document.body,
      score: h.score,
      matchedTerms: [query],
    }));
  }
}
