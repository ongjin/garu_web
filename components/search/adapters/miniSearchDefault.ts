import MiniSearch from 'minisearch';
import type { SearchAdapter, SearchHit, SampleDoc } from './types';

export class MiniSearchDefaultAdapter implements SearchAdapter {
  name = 'MiniSearch (기본 토크나이저)';
  ready = false;
  private ms: MiniSearch | null = null;

  async init(docs: SampleDoc[]): Promise<void> {
    this.ms = new MiniSearch({
      fields: ['title', 'body'],
      storeFields: ['title', 'body'],
    });
    this.ms.addAll(docs);
    this.ready = true;
  }

  search(query: string): SearchHit[] {
    if (!this.ms || !query.trim()) return [];
    return this.ms.search(query).map((r) => ({
      id: String(r.id),
      title: r.title as string,
      body: r.body as string,
      matchedTerms: (r.terms as string[] | undefined) ?? [],
    }));
  }
}
